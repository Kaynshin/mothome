import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const contactSchema = z.object({
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
  subject: z
    .string()
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .max(150, "Le sujet ne peut pas dépasser 150 caractères")
    .trim(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000, "Le message ne peut pas dépasser 5000 caractères")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const RATE_LIMIT_CONFIG = {
  limit: 5,
  windowMs: 60 * 60 * 1000, // 5 requêtes par heure par IP
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

function buildEmailHtml(data: ContactFormData): string {
  const phone = data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : "";
  return `
    <h2>Nouveau message de contact — Mothome</h2>
    <p><strong>Nom :</strong> ${data.name}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    ${phone}
    <p><strong>Sujet :</strong> ${data.subject}</p>
    <hr />
    <p><strong>Message :</strong></p>
    <p style="white-space: pre-wrap;">${data.message}</p>
  `;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Rate limiting
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`contact:${ip}`, RATE_LIMIT_CONFIG);

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
  const parseResult = contactSchema.safeParse(rawBody);
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
    console.error("[contact] CONTACT_EMAIL_TO env var is not set");
    return NextResponse.json(
      {
        success: false,
        error: "Erreur de configuration serveur. Veuillez nous contacter directement.",
      },
      { status: 500 },
    );
  }

  // 5. Envoi email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY env var is not set");
    return NextResponse.json(
      {
        success: false,
        error: "Erreur de configuration serveur. Veuillez nous contacter directement.",
      },
      { status: 500 },
    );
  }

  const senderEmail =
    process.env.CONTACT_EMAIL_FROM ?? "noreply@example.com";
  const resend = new Resend(apiKey);

  const { error: resendError } = await resend.emails.send({
    from: senderEmail,
    to: recipientEmail,
    replyTo: data.email,
    subject: `[Contact Mothome] ${data.subject}`,
    html: buildEmailHtml(data),
  });

  if (resendError) {
    console.error("[contact] Resend error:", resendError);
    return NextResponse.json(
      {
        success: false,
        error: "L'envoi du message a échoué. Veuillez réessayer plus tard.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { success: true, message: "Message envoyé avec succès." },
    { status: 200 },
  );
}
