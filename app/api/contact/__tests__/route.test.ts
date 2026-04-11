import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockSend = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 3600_000 }),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRequest(body: unknown, ip = "1.2.3.4"): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
  });
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.CONTACT_EMAIL_TO = "hello@mothome.fr";
  process.env.CONTACT_EMAIL_FROM = "noreply@mothome.fr";
  mockSend.mockResolvedValue({ data: { id: "email-id" }, error: null });
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("POST /api/contact", () => {
  it("retourne 200 avec des données valides", async () => {
    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean Dupont",
      email: "jean@example.com",
      subject: "Demande de devis",
      message: "Bonjour, je souhaiterais obtenir un devis pour mon projet.",
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ success: true, message: "Message envoyé avec succès." });
    expect(mockSend).toHaveBeenCalledOnce();
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "hello@mothome.fr",
        replyTo: "jean@example.com",
        subject: "[Contact Mothome] Demande de devis",
      }),
    );
  });

  it("inclut le téléphone dans l'email quand fourni", async () => {
    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean Dupont",
      email: "jean@example.com",
      phone: "0612345678",
      subject: "Demande info",
      message: "Message de test suffisamment long.",
    });

    await POST(req);

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain("0612345678");
  });

  it("retourne 422 avec un email invalide", async () => {
    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean",
      email: "pas-un-email",
      subject: "Test",
      message: "Message suffisamment long.",
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.success).toBe(false);
    expect(body.fieldErrors).toBeDefined();
    expect(body.fieldErrors.email).toBeDefined();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 422 si le nom est trop court", async () => {
    const { POST } = await import("../route");

    const req = makeRequest({
      name: "J",
      email: "jean@example.com",
      subject: "Test",
      message: "Message suffisamment long.",
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.fieldErrors?.name).toBeDefined();
  });

  it("retourne 422 si le message est trop court", async () => {
    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean Dupont",
      email: "jean@example.com",
      subject: "Sujet valide",
      message: "Court",
    });

    const res = await POST(req);
    expect(res.status).toBe(422);
  });

  it("retourne 400 si le body n'est pas du JSON valide", async () => {
    const { POST } = await import("../route");

    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("retourne 429 quand le rate limit est dépassé", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit");
    vi.mocked(checkRateLimit).mockReturnValueOnce({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 3600_000,
    });

    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean Dupont",
      email: "jean@example.com",
      subject: "Test rate limit",
      message: "Message suffisamment long.",
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 500 si RESEND_API_KEY est manquante", async () => {
    delete process.env.RESEND_API_KEY;

    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean Dupont",
      email: "jean@example.com",
      subject: "Test config",
      message: "Message suffisamment long pour passer la validation.",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 500 si CONTACT_EMAIL_TO est manquante", async () => {
    delete process.env.CONTACT_EMAIL_TO;

    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean Dupont",
      email: "jean@example.com",
      subject: "Test config",
      message: "Message suffisamment long pour passer la validation.",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 502 si Resend renvoie une erreur", async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: "Resend API error" } });

    const { POST } = await import("../route");

    const req = makeRequest({
      name: "Jean Dupont",
      email: "jean@example.com",
      subject: "Test erreur envoi",
      message: "Message suffisamment long pour passer la validation.",
    });

    const res = await POST(req);
    expect(res.status).toBe(502);
  });
});
