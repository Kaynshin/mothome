import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const TYPES_INTERVENTION = [
  "Révision & entretien",
  "Réparation & diagnostic",
  "Contrôle technique",
  "Kit éthanol eFlexMoto",
  "Autre",
] as const;

const devisSchema = z.object({
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
    )
    .optional()
    .or(z.literal("")),
  marque: z
    .string()
    .min(2, "La marque doit contenir au moins 2 caractères")
    .max(100, "La marque ne peut pas dépasser 100 caractères")
    .trim(),
  modele: z
    .string()
    .max(100, "Le modèle ne peut pas dépasser 100 caractères")
    .trim()
    .optional()
    .or(z.literal("")),
  typeIntervention: z.enum(TYPES_INTERVENTION, {
    error: "Type d'intervention invalide",
  }),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000, "Le message ne peut pas dépasser 5000 caractères")
    .trim(),
});

export type DevisFormData = z.infer<typeof devisSchema>;

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

function buildNotificationEmail(data: DevisFormData): string {
  const phone = data.phone
    ? `<p><strong>Téléphone :</strong> ${data.phone}</p>`
    : "";
  const modele = data.modele
    ? `<p><strong>Modèle :</strong> ${data.modele}</p>`
    : "";

  return `
    <h2>Nouvelle demande de devis — Mothome</h2>
    <h3>Coordonnées</h3>
    <p><strong>Nom :</strong> ${data.name}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    ${phone}
    <h3>Informations moto</h3>
    <p><strong>Marque :</strong> ${data.marque}</p>
    ${modele}
    <p><strong>Type d'intervention :</strong> ${data.typeIntervention}</p>
    <hr />
    <p><strong>Description :</strong></p>
    <p style="white-space: pre-wrap;">${data.message}</p>
  `;
}

function buildConfirmationEmail(data: DevisFormData): string {
  const modele = data.modele ? ` ${data.modele}` : "";
  return `
    <h2>Votre demande de devis a bien été reçue</h2>
    <p>Bonjour ${data.name},</p>
    <p>Nous avons bien reçu votre demande de devis pour votre <strong>${data.marque}${modele}</strong> (${data.typeIntervention}).</p>
    <p>Notre équipe vous répondra dans les meilleurs délais, généralement sous 24h ouvrées.</p>
    <p>Si votre demande est urgente, n'hésitez pas à nous appeler directement.</p>
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
  const rateLimit = checkRateLimit(`devis:${ip}`, RATE_LIMIT_CONFIG);

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
  const parseResult = devisSchema.safeParse(rawBody);
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

  // 4. Vérification config email
  const recipientEmail = process.env.CONTACT_EMAIL_TO ?? "";
  if (!recipientEmail) {
    console.error("[devis] CONTACT_EMAIL_TO env var is not set");
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
    console.error("[devis] RESEND_API_KEY env var is not set");
    return NextResponse.json(
      {
        success: false,
        error:
          "Erreur de configuration serveur. Veuillez nous contacter directement.",
      },
      { status: 500 },
    );
  }

  const senderEmail =
    process.env.CONTACT_EMAIL_FROM ?? "noreply@example.com";
  const resend = new Resend(apiKey);

  // 5. Envoi email de notification au garage
  const { error: notifError } = await resend.emails.send({
    from: senderEmail,
    to: recipientEmail,
    replyTo: data.email,
    subject: `[Devis Mothome] ${data.typeIntervention} — ${data.marque}${data.modele ? ` ${data.modele}` : ""}`,
    html: buildNotificationEmail(data),
  });

  if (notifError) {
    console.error("[devis] Resend notification error:", notifError);
    return NextResponse.json(
      {
        success: false,
        error: "L'envoi de la demande a échoué. Veuillez réessayer plus tard.",
      },
      { status: 502 },
    );
  }

  // 6. Envoi email de confirmation au client (best-effort, pas bloquant)
  const { error: confirmError } = await resend.emails.send({
    from: senderEmail,
    to: data.email,
    subject: "Votre demande de devis Mothome a bien été reçue",
    html: buildConfirmationEmail(data),
  });

  if (confirmError) {
    console.error("[devis] Resend confirmation error (non-blocking):", confirmError);
  }

  return NextResponse.json(
    { success: true, message: "Demande de devis envoyée avec succès." },
    { status: 200 },
  );
}
