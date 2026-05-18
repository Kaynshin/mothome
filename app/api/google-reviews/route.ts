import { type NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { fetchGooglePlaceData } from "@/lib/google-places";

const RATE_LIMIT_CONFIG = {
  limit: 30,
  windowMs: 60 * 60 * 1000, // 30 requêtes par heure par IP
} as const;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`google-reviews:${ip}`, RATE_LIMIT_CONFIG);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Trop de requêtes. Veuillez réessayer plus tard.",
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

  const data = await fetchGooglePlaceData();

  return NextResponse.json(
    {
      success: true,
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      reviews: data.reviews,
      source: data.source,
    },
    { status: 200 },
  );
}
