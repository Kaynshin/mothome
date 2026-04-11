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
  checkRateLimit: vi
    .fn()
    .mockReturnValue({ success: true, remaining: 2, resetAt: Date.now() + 3600_000 }),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_PAYLOAD = {
  name: "Jean Dupont",
  email: "jean@example.com",
  phone: "0612345678",
  marque: "Kawasaki",
  modele: "Z650",
  typeIntervention: "Révision & entretien",
  message: "Besoin d'une révision complète après 10 000 km.",
};

function makeRequest(body: unknown, ip = "1.2.3.4"): NextRequest {
  return new NextRequest("http://localhost/api/devis", {
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
  // Both notification and confirmation emails succeed by default
  mockSend.mockResolvedValue({ data: { id: "email-id" }, error: null });
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("POST /api/devis", () => {
  it("retourne 200 avec des données valides", async () => {
    const { POST } = await import("../route");

    const res = await POST(makeRequest(VALID_PAYLOAD));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({
      success: true,
      message: "Demande de devis envoyée avec succès.",
    });
  });

  it("envoie 2 emails : notification garage + confirmation client", async () => {
    const { POST } = await import("../route");

    await POST(makeRequest(VALID_PAYLOAD));

    expect(mockSend).toHaveBeenCalledTimes(2);

    const [notif, confirm] = mockSend.mock.calls;

    // Notification au garage
    expect(notif[0].to).toBe("hello@mothome.fr");
    expect(notif[0].replyTo).toBe("jean@example.com");
    expect(notif[0].subject).toContain("Devis Mothome");
    expect(notif[0].subject).toContain("Kawasaki");

    // Confirmation au client
    expect(confirm[0].to).toBe("jean@example.com");
    expect(confirm[0].subject).toContain("devis Mothome");
  });

  it("inclut marque et modèle dans l'email de notification", async () => {
    const { POST } = await import("../route");

    await POST(makeRequest(VALID_PAYLOAD));

    const notifHtml = mockSend.mock.calls[0][0].html as string;
    expect(notifHtml).toContain("Kawasaki");
    expect(notifHtml).toContain("Z650");
    expect(notifHtml).toContain("Révision & entretien");
    expect(notifHtml).toContain("0612345678");
  });

  it("fonctionne sans téléphone ni modèle (champs optionnels)", async () => {
    const { POST } = await import("../route");

    const payload = {
      name: "Marie Martin",
      email: "marie@example.com",
      marque: "Honda",
      typeIntervention: "Contrôle technique",
      message: "Besoin d'un contrôle technique urgent.",
    };

    const res = await POST(makeRequest(payload));
    expect(res.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("retourne 422 avec un email invalide", async () => {
    const { POST } = await import("../route");

    const res = await POST(
      makeRequest({ ...VALID_PAYLOAD, email: "pas-un-email" }),
    );
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.success).toBe(false);
    expect(body.fieldErrors?.email).toBeDefined();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 422 avec un typeIntervention invalide", async () => {
    const { POST } = await import("../route");

    const res = await POST(
      makeRequest({ ...VALID_PAYLOAD, typeIntervention: "Inconnu" }),
    );
    const body = await res.json();

    expect(res.status).toBe(422);
    expect(body.fieldErrors?.typeIntervention).toBeDefined();
  });

  it("retourne 422 si marque est manquante", async () => {
    const { POST } = await import("../route");

    const { marque: _, ...withoutMarque } = VALID_PAYLOAD;
    const res = await POST(makeRequest(withoutMarque));

    expect(res.status).toBe(422);
    expect((await res.json()).fieldErrors?.marque).toBeDefined();
  });

  it("retourne 400 si le body n'est pas du JSON valide", async () => {
    const { POST } = await import("../route");

    const req = new NextRequest("http://localhost/api/devis", {
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

    const res = await POST(makeRequest(VALID_PAYLOAD));

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 500 si RESEND_API_KEY est manquante", async () => {
    delete process.env.RESEND_API_KEY;

    const { POST } = await import("../route");

    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(500);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 500 si CONTACT_EMAIL_TO est manquante", async () => {
    delete process.env.CONTACT_EMAIL_TO;

    const { POST } = await import("../route");

    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(500);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 502 si l'envoi de notification échoue", async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: "Resend API error" },
    });

    const { POST } = await import("../route");

    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(502);
  });

  it("retourne 200 même si l'email de confirmation échoue (best-effort)", async () => {
    // First call (notification) succeeds, second (confirmation) fails
    mockSend
      .mockResolvedValueOnce({ data: { id: "ok" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "fail" } });

    const { POST } = await import("../route");

    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });
});
