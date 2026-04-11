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

/** Date future (lundi prochain, jamais un dimanche) */
function nextMonday(): string {
  const d = new Date();
  d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7));
  return d.toISOString().split("T")[0];
}

const VALID_PAYLOAD = {
  name: "Jean Dupont",
  email: "jean@example.com",
  phone: "0612345678",
  dateSouhaitee: nextMonday(),
  typeIntervention: "Révision & entretien",
  message: "Révision après hivernage.",
};

function makeRequest(body: unknown, ip = "1.2.3.4"): NextRequest {
  return new NextRequest("http://localhost/api/rdv", {
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
// checkSlotAvailability unit tests
// ---------------------------------------------------------------------------

describe("checkSlotAvailability", () => {
  it("accepte une date future en semaine", async () => {
    const { checkSlotAvailability } = await import("../route");
    const result = checkSlotAvailability(nextMonday());
    expect(result.available).toBe(true);
  });

  it("refuse une date dans le passé", async () => {
    const { checkSlotAvailability } = await import("../route");
    const result = checkSlotAvailability("2020-01-01");
    expect(result.available).toBe(false);
    expect(result.reason).toContain("passé");
  });

  it("refuse un dimanche", async () => {
    const { checkSlotAvailability } = await import("../route");
    // Trouver le prochain dimanche
    const d = new Date();
    d.setDate(d.getDate() + ((0 + 7 - d.getDay()) % 7 || 7));
    const sunday = d.toISOString().split("T")[0];
    const result = checkSlotAvailability(sunday);
    expect(result.available).toBe(false);
    expect(result.reason).toContain("fermé");
  });

  it("refuse une date invalide", async () => {
    const { checkSlotAvailability } = await import("../route");
    const result = checkSlotAvailability("not-a-date");
    expect(result.available).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// POST /api/rdv
// ---------------------------------------------------------------------------

describe("POST /api/rdv", () => {
  it("retourne 200 avec des données valides", async () => {
    const { POST } = await import("../route");

    const res = await POST(makeRequest(VALID_PAYLOAD));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toContain("rendez-vous");
  });

  it("envoie 2 emails : notification garage + confirmation client", async () => {
    const { POST } = await import("../route");

    await POST(makeRequest(VALID_PAYLOAD));

    expect(mockSend).toHaveBeenCalledTimes(2);

    const [notif, confirm] = mockSend.mock.calls;

    expect(notif[0].to).toBe("hello@mothome.fr");
    expect(notif[0].replyTo).toBe("jean@example.com");
    expect(notif[0].subject).toContain("RDV Mothome");

    expect(confirm[0].to).toBe("jean@example.com");
    expect(confirm[0].subject).toContain("RDV Mothome");
  });

  it("inclut les détails RDV dans l'email de notification", async () => {
    const { POST } = await import("../route");

    await POST(makeRequest(VALID_PAYLOAD));

    const html = mockSend.mock.calls[0][0].html as string;
    expect(html).toContain("Jean Dupont");
    expect(html).toContain("0612345678");
    expect(html).toContain("Révision & entretien");
  });

  it("retourne 409 si la date est dans le passé", async () => {
    const { POST } = await import("../route");

    const res = await POST(
      makeRequest({ ...VALID_PAYLOAD, dateSouhaitee: "2020-01-01" }),
    );
    const body = await res.json();

    expect(res.status).toBe(409);
    expect(body.success).toBe(false);
    expect(body.field).toBe("dateSouhaitee");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 409 si la date est un dimanche", async () => {
    const { POST } = await import("../route");

    // Prochain dimanche
    const d = new Date();
    d.setDate(d.getDate() + ((0 + 7 - d.getDay()) % 7 || 7));
    const sunday = d.toISOString().split("T")[0];

    const res = await POST(
      makeRequest({ ...VALID_PAYLOAD, dateSouhaitee: sunday }),
    );
    expect(res.status).toBe(409);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 422 si le téléphone est manquant", async () => {
    const { POST } = await import("../route");

    const { phone: _, ...withoutPhone } = VALID_PAYLOAD;
    const res = await POST(makeRequest(withoutPhone));

    expect(res.status).toBe(422);
    expect((await res.json()).fieldErrors?.phone).toBeDefined();
  });

  it("retourne 422 si le format de date est invalide", async () => {
    const { POST } = await import("../route");

    const res = await POST(
      makeRequest({ ...VALID_PAYLOAD, dateSouhaitee: "01/01/2027" }),
    );

    expect(res.status).toBe(422);
    expect((await res.json()).fieldErrors?.dateSouhaitee).toBeDefined();
  });

  it("accepte un message vide (optionnel)", async () => {
    const { POST } = await import("../route");

    const { message: _, ...withoutMessage } = VALID_PAYLOAD;
    const res = await POST(makeRequest(withoutMessage));

    expect(res.status).toBe(200);
  });

  it("retourne 400 si le body n'est pas du JSON valide", async () => {
    const { POST } = await import("../route");

    const req = new NextRequest("http://localhost/api/rdv", {
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
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("retourne 500 si RESEND_API_KEY est manquante", async () => {
    delete process.env.RESEND_API_KEY;

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
    mockSend
      .mockResolvedValueOnce({ data: { id: "ok" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "fail" } });

    const { POST } = await import("../route");
    const res = await POST(makeRequest(VALID_PAYLOAD));

    expect(res.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });
});
