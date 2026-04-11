import { type NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl?: string;
}

interface PlacesApiReview {
  relativePublishTimeDescription: string;
  rating: number;
  text?: { text: string; languageCode: string };
  authorAttribution?: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
}

interface PlacesApiResponse {
  reviews?: PlacesApiReview[];
}

// ---------------------------------------------------------------------------
// Fallback data (source: /app/page.tsx TESTIMONIALS array)
// ---------------------------------------------------------------------------

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    authorName: "Thomas R.",
    rating: 5,
    text: "Mael a diagnostiqué en 20 minutes ce que 2 autres garages n'avaient pas trouvé en 3 semaines. Sérieux, compétent et honnête. Je n'irai plus nulle part ailleurs.",
    relativeTimeDescription: "il y a 2 mois",
  },
  {
    authorName: "Julien M.",
    rating: 5,
    text: "Super ambiance, Mael est passionné et ça se voit dans son travail. Le bar en plus c'est un concept vraiment unique. On passe un bon moment pendant que la moto est révisée.",
    relativeTimeDescription: "il y a 3 mois",
  },
  {
    authorName: "Sarah L.",
    rating: 5,
    text: "Première expérience dans un garage moto et franchement c'était top. Mael a tout expliqué clairement, sans jargon inutile. Tarifs transparents et travail soigné.",
    relativeTimeDescription: "il y a 1 mois",
  },
  {
    authorName: "Romain B.",
    rating: 5,
    text: "Service à domicile impeccable — Mael est venu changer ma courroie directement dans ma résidence. Rapide, propre et au prix annoncé. Très recommandé.",
    relativeTimeDescription: "il y a 4 mois",
  },
  {
    authorName: "Cédric V.",
    rating: 5,
    text: "J'ai acheté ma moto en dépôt-vente chez Mothome. Mael l'avait vérifiée de fond en comble et m'a été totalement transparent sur l'état de la machine. Confiance totale.",
    relativeTimeDescription: "il y a 5 mois",
  },
  {
    authorName: "Marine D.",
    rating: 5,
    text: "Le concept garage + bar c'est génial. On attend que notre moto soit prête en regardant le GP sur grand écran, en mangeant un truc fait maison. Bravo Mael pour l'idée !",
    relativeTimeDescription: "il y a 2 mois",
  },
];

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const RATE_LIMIT_CONFIG = {
  limit: 30,
  windowMs: 60 * 60 * 1000, // 30 requêtes par heure par IP
} as const;

const PLACES_API_BASE_URL = "https://places.googleapis.com/v1/places";
const CACHE_REVALIDATE_SECONDS = 3600; // 1 heure

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

function mapPlacesReviewToGoogleReview(review: PlacesApiReview): GoogleReview {
  return {
    authorName: review.authorAttribution?.displayName ?? "Anonyme",
    rating: review.rating,
    text: review.text?.text ?? "",
    relativeTimeDescription: review.relativePublishTimeDescription,
    profilePhotoUrl: review.authorAttribution?.photoUri,
  };
}

async function fetchGoogleReviews(
  placeId: string,
  apiKey: string,
): Promise<GoogleReview[]> {
  const url = `${PLACES_API_BASE_URL}/${placeId}?languageCode=fr`;

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews",
    },
    next: { revalidate: CACHE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "unknown error");
    throw new Error(`Places API responded ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as PlacesApiResponse;

  if (!data.reviews || data.reviews.length === 0) {
    console.warn("[google-reviews] Places API returned no reviews");
    return FALLBACK_REVIEWS;
  }

  return data.reviews.map(mapPlacesReviewToGoogleReview);
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest): Promise<NextResponse> {
  // 1. Rate limiting
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

  // 2. Check config — graceful fallback if not configured
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn(
      "[google-reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — returning fallback reviews",
    );
    return NextResponse.json(
      { success: true, reviews: FALLBACK_REVIEWS, source: "fallback" },
      { status: 200 },
    );
  }

  // 3. Fetch from Places API (New) with graceful degradation
  try {
    const reviews = await fetchGoogleReviews(placeId, apiKey);
    return NextResponse.json(
      { success: true, reviews, source: "google" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[google-reviews] Failed to fetch from Places API:", error);
    return NextResponse.json(
      { success: true, reviews: FALLBACK_REVIEWS, source: "fallback" },
      { status: 200 },
    );
  }
}
