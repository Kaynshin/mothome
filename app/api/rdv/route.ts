import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";
import { checkSlotAvailability } from "@/lib/slot-availability";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const TYPES_INTERVENTION = [
  "Révision & entretien",
  "Réparation & diagnostic",
  "Contrôle technique",
  "Kit éthanol eFlexMoto",
  "Service à domicile",
  "Autre",
] as const;

const rdvSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .trim(),
  email: z.string().email("Adresse email invalide").max(254),
  phone: z
    .string()
    .regex(
      /^(\+33|0)[1-9](\d{8})$/,
      "Numéro de téléphone invalide (format FR attendu)",
    ),
  dateSouhaitee: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD attendu)"),
  typeIntervention: z.enum(TYPES_INTERVENTION, {
    error: "Type d'intervention invalide",
  }),
  message: z
    .string()
    .max(2000, "Le message ne peut pas dépasser 2000 caractères")
    .trim()
    .optional()
    .or(z.literal("")),
});

export type RdvFormData = z.infer<typeof rdvSchema>;

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const RATE_LIMIT_CONFIG = {
  limit: 3,
  windowMs: 60 * 60 * 1000, // 3 demandes par heure par IP
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}


function buildNotificationEmail(data: RdvFormData): string {
  const message = data.message
    ? `<p><strong>Message :</strong></p><p style="white-space: pre-wrap;">${data.message}</p>`
    : "";

  return `
    <h2>Nouvelle demande de rendez-vous — Mothome</h2>
    <p><strong>Nom :</strong> ${data.name}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    <p><strong>Téléphone :</strong> ${data.phone}</p>
    <p><strong>Date souhaitée :</strong> ${new Date(data.dateSouhaitee).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
    <p><strong>Type d'intervention :</strong> ${data.typeIntervention}</p>
    ${message}
  `;
}

function buildConfirmationEmail(data: RdvFormData): string {
  const dateFormatted = new Date(data.dateSouhaitee).toLocaleDateString(
    "fr-FR",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" },
  );

  return `
    <h2>Votre demande de rendez-vous a bien été reçue</h2>
    <p>Bonjour ${data.name},</p>
    <p>Nous avons bien reçu votre demande de rendez-vous pour :</p>
    <ul>
      <li><strong>Date souhaitée :</strong> ${dateFormatted}</li>
      <li><strong>Type d'intervention :</strong> ${data.typeIntervention}</li>
    </ul>
    <p>Notre équipe va confirmer votre rendez-vous dans les plus brefs délais. Si vous ne recevez pas de confirmation sous 24h ouvrées, n'hésitez pas à nous appeler directement.</p>
    <br />
    <p>À bientôt,</p>
    <p><strong>L'équipe Mothome</strong><br/>Garage Moto — Thonon-les-Bains (74)</p>
  `;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Rate limiting
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`rdv:${ip}`, RATE_LIMIT_CONFIG);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Trop de tentatives. Veuillez réessayer dans une heure.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
          ),
          "X-RateLimit-Limit": String(RATE_LIMIT_CONFIG.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      },
    );
  }

  // 2. Parse body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Corps de requête invalide (JSON attendu)." },
      { status: 400 },
    );
  }

  // 3. Validate with Zod
  const parseResult = rdvSchema.safeParse(rawBody);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Données invalides.",
        fieldErrors: parseResult.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parseResult.data;

  // 4. Vérification de disponibilité du créneau (V1 simplifié)
  const slotCheck = checkSlotAvailability(data.dateSouhaitee);
  if (!slotCheck.available) {
    return NextResponse.json(
      {
        success: false,
        error: slotCheck.reason ?? "Ce créneau n'est pas disponible.",
        field: "dateSouhaitee",
      },
      { status: 409 },
    );
  }

  // 5. Vérification config email
  const recipientEmail = process.env.CONTACT_EMAIL_TO ?? "";
  if (!recipientEmail) {
    console.error("[rdv] CONTACT_EMAIL_TO env var is not set");
    return NextResponse.json(
      {
        success: false,
        error:
          "Erreur de configuration serveur. Veuillez nous contacter directement.",
      },
      { status: 500 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[rdv] RESEND_API_KEY env var is not set");
    return NextResponse.json(
      {
        success: false,
        error:
          "Erreur de configuration serveur. Veuillez nous contacter directement.",
      },
      { status: 500 },
    );
  }

  const senderEmail = process.env.CONTACT_EMAIL_FROM ?? "noreply@example.com";
  const resend = new Resend(apiKey);

  // 6. Envoi email de notification au garage
  const { error: notifError } = await resend.emails.send({
    from: senderEmail,
    to: recipientEmail,
    replyTo: data.email,
    subject: `[RDV Mothome] ${data.typeIntervention} — ${new Date(data.dateSouhaitee).toLocaleDateString("fr-FR")}`,
    html: buildNotificationEmail(data),
  });

  if (notifError) {
    console.error("[rdv] Resend notification error:", notifError);
    return NextResponse.json(
      {
        success: false,
        error: "L'envoi de la demande a échoué. Veuillez réessayer plus tard.",
      },
      { status: 502 },
    );
  }

  // 7. Envoi email de confirmation au client (best-effort)
  const { error: confirmError } = await resend.emails.send({
    from: senderEmail,
    to: data.email,
    subject: "Votre demande de RDV Mothome a bien été reçue",
    html: buildConfirmationEmail(data),
  });

  if (confirmError) {
    console.error(
      "[rdv] Resend confirmation error (non-blocking):",
      confirmError,
    );
  }

  return NextResponse.json(
    {
      success: true,
      message:
        "Votre demande de rendez-vous a bien été envoyée. Nous vous confirmons votre RDV sous 24h.",
    },
    { status: 200 },
  );
}

