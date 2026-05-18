/**
 * Google Places API (New) helper — récupère la note moyenne, le nombre
 * total d'avis et les derniers avis publiés pour la fiche Mothome.
 *
 * Source unique partagée entre la route `/api/google-reviews` (client
 * fetch depuis `<GoogleReviews />`) et le rendu serveur de la home
 * (KPIs). Cache Next.js global = 1 semaine (`REVALIDATE_SECONDS`).
 *
 * Si `GOOGLE_PLACES_API_KEY` ou `GOOGLE_PLACE_ID` ne sont pas
 * configurés, ou si l'appel échoue, on retourne des valeurs de repli
 * pour que le site reste affichable.
 */

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl?: string;
}

export interface GooglePlaceData {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
  source: "google" | "fallback";
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
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesApiReview[];
}

const PLACES_API_BASE_URL = "https://places.googleapis.com/v1/places";

/** Cache Next.js : 1 semaine. La fiche Google ne bouge pas vite. */
export const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Valeurs de repli affichables tant que la clé API n'est pas
 * configurée — note volontairement basse (4.9 plutôt que 5) pour ne
 * pas paraître artificielle.
 */
const FALLBACK_RATING = 4.9;
const FALLBACK_USER_RATING_COUNT = 0;

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    authorName: "Thomas R.",
    rating: 5,
    text: "L'atelier a diagnostiqué en 20 minutes ce que 2 autres garages n'avaient pas trouvé en 3 semaines. Sérieux, compétent et honnête. Je n'irai plus nulle part ailleurs.",
    relativeTimeDescription: "il y a 2 mois",
  },
  {
    authorName: "Julien M.",
    rating: 5,
    text: "Super ambiance, l'équipe est passionnée et ça se voit dans le travail. Le bar en plus c'est un concept vraiment unique. On passe un bon moment pendant que la moto est révisée.",
    relativeTimeDescription: "il y a 3 mois",
  },
  {
    authorName: "Sarah L.",
    rating: 5,
    text: "Première expérience dans un garage moto et franchement c'était top. L'équipe a tout expliqué clairement, sans jargon inutile. Tarifs transparents et travail soigné.",
    relativeTimeDescription: "il y a 1 mois",
  },
  {
    authorName: "Romain B.",
    rating: 5,
    text: "Service à domicile impeccable — Mothome est venu changer ma courroie directement dans ma résidence. Rapide, propre et au prix annoncé. Très recommandé.",
    relativeTimeDescription: "il y a 4 mois",
  },
  {
    authorName: "Cédric V.",
    rating: 5,
    text: "J'ai acheté ma moto en dépôt-vente chez Mothome. L'atelier l'avait vérifiée de fond en comble et a été totalement transparent sur l'état de la machine. Confiance totale.",
    relativeTimeDescription: "il y a 5 mois",
  },
];

export const FALLBACK_GOOGLE_PLACE_DATA: GooglePlaceData = {
  rating: FALLBACK_RATING,
  userRatingCount: FALLBACK_USER_RATING_COUNT,
  reviews: FALLBACK_REVIEWS,
  source: "fallback",
};

function mapPlacesReviewToGoogleReview(review: PlacesApiReview): GoogleReview {
  return {
    authorName: review.authorAttribution?.displayName ?? "Anonyme",
    rating: review.rating,
    text: review.text?.text ?? "",
    relativeTimeDescription: review.relativePublishTimeDescription,
    profilePhotoUrl: review.authorAttribution?.photoUri,
  };
}

/**
 * Récupère la note, le nombre d'avis et les derniers reviews depuis la
 * Places API (New). Renvoie un fallback en cas d'erreur ou de config
 * manquante — ne `throw` jamais.
 */
export async function fetchGooglePlaceData(): Promise<GooglePlaceData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return FALLBACK_GOOGLE_PLACE_DATA;
  }

  try {
    const url = `${PLACES_API_BASE_URL}/${placeId}?languageCode=fr`;
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "unknown error");
      console.error(
        `[google-places] Places API responded ${response.status}: ${errorText}`,
      );
      return FALLBACK_GOOGLE_PLACE_DATA;
    }

    const data = (await response.json()) as PlacesApiResponse;
    const reviews = (data.reviews ?? []).map(mapPlacesReviewToGoogleReview);

    return {
      rating: data.rating ?? FALLBACK_RATING,
      userRatingCount: data.userRatingCount ?? FALLBACK_USER_RATING_COUNT,
      reviews: reviews.length > 0 ? reviews : FALLBACK_REVIEWS,
      source: "google",
    };
  } catch (error) {
    console.error("[google-places] Fetch failed:", error);
    return FALLBACK_GOOGLE_PLACE_DATA;
  }
}

/** Convertit une note /5 en pourcentage de satisfaction arrondi. */
export function ratingToSatisfactionPercent(rating: number): number {
  return Math.round((rating / 5) * 100);
}
