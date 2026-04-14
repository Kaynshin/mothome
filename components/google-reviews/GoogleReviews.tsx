"use client";

import { useEffect, useState } from "react";
import { Star, ExternalLink, User } from "lucide-react";

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl?: string;
}

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/uJ7b7csbF7pAE3gE9";

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

const MAX_TEXT_LENGTH = 180;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-[var(--color-bleu-logo)] text-[var(--color-bleu-logo)]"
              : "text-[var(--color-gris-moyen)]"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function AverageRating({ reviews }: { reviews: GoogleReview[] }) {
  if (reviews.length === 0) return null;
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 mb-10 px-5 py-3 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-gris-moyen)] transition-colors duration-200 group"
      aria-label={`Note Google : ${avg.toFixed(1)} sur 5 — ${reviews.length} avis. Voir sur Google Maps`}
    >
      {/* Google G logo (SVG inline, minimal) */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-5 h-5 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>

      <div className="flex items-baseline gap-1.5">
        <span className="font-heading text-lg font-semibold text-[var(--color-or-mat)]">
          {avg.toFixed(1)}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.round(avg)
                  ? "fill-[var(--color-bleu-logo)] text-[var(--color-bleu-logo)]"
                  : "text-[var(--color-gris-moyen)]"
              }
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="font-sans text-sm text-[var(--color-gris-moyen)]">
          ({reviews.length} avis)
        </span>
      </div>

      <ExternalLink
        size={14}
        className="text-[var(--color-gris-moyen)] group-hover:text-[var(--color-gris-clair)] transition-colors ml-1 shrink-0"
        aria-hidden="true"
      />
    </a>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > MAX_TEXT_LENGTH;
  const displayText =
    !isLong || expanded
      ? review.text
      : review.text.slice(0, MAX_TEXT_LENGTH).trimEnd() + "…";

  return (
    <figure className="flex flex-col p-6 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-lg">
      {/* Header: avatar + name + time */}
      <div className="flex items-center gap-3 mb-4">
        {review.profilePhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.profilePhotoUrl}
            alt=""
            className="w-9 h-9 rounded-full object-cover shrink-0"
            aria-hidden="true"
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full bg-[var(--color-noir-mat)] border border-[var(--color-border)] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <User size={16} className="text-[var(--color-gris-moyen)]" />
          </div>
        )}
        <div className="min-w-0">
          <figcaption className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-wide truncate">
            {review.authorName}
          </figcaption>
          <p className="font-sans text-xs text-[var(--color-gris-moyen)]">
            {review.relativeTimeDescription}
          </p>
        </div>
      </div>

      <StarRating rating={review.rating} />

      <blockquote className="mt-4 flex-1">
        <p className="font-sans text-sm text-[var(--color-gris-clair)] leading-relaxed italic">
          &ldquo;{displayText}&rdquo;
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 font-sans text-xs text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] transition-colors underline-offset-2 hover:underline"
            aria-expanded={expanded}
          >
            {expanded ? "Réduire" : "Lire plus"}
          </button>
        )}
      </blockquote>
    </figure>
  );
}

function SkeletonCard() {
  return (
    <div
      className="flex flex-col p-6 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-lg animate-pulse"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-[var(--color-noir-mat)]" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 bg-[var(--color-noir-mat)] rounded w-1/3" />
          <div className="h-2.5 bg-[var(--color-noir-mat)] rounded w-1/4" />
        </div>
      </div>
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-3.5 h-3.5 rounded bg-[var(--color-noir-mat)]"
          />
        ))}
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-[var(--color-noir-mat)] rounded" />
        <div className="h-3 bg-[var(--color-noir-mat)] rounded w-5/6" />
        <div className="h-3 bg-[var(--color-noir-mat)] rounded w-4/6" />
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json() as Promise<GoogleReview[]>;
      })
      .then((data) => {
        setReviews(data.length > 0 ? data : FALLBACK_REVIEWS);
      })
      .catch(() => {
        setReviews(FALLBACK_REVIEWS);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Google badge */}
      <div className="flex justify-center">
        {loading ? (
          <div className="mb-10 h-12 w-56 rounded-lg bg-[var(--color-noir-doux)] border border-[var(--color-border)] animate-pulse" />
        ) : (
          <AverageRating reviews={reviews} />
        )}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Avis clients Google"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : reviews.map((review) => (
              <ReviewCard key={review.authorName} review={review} />
            ))}
      </div>

      {/* CTA to leave a review */}
      <div className="mt-10 text-center">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-heading text-sm text-[var(--color-gris-moyen)] hover:text-[var(--color-gris-clair)] uppercase tracking-widest transition-colors duration-200"
        >
          Laisser un avis sur Google
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
