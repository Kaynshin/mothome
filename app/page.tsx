import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Home,
  ShoppingBag,
  RefreshCw,
  Coffee,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import GoogleReviews from "@/components/google-reviews/GoogleReviews";

export const metadata: Metadata = {
  title: "Mothome — Garage Moto & Bar à Thonon-les-Bains (74)",
  description:
    "Garage moto artisanal à Thonon-les-Bains. Réparation, entretien, accessoires, dépôt-vente et bar convivial. Prenez rendez-vous avec Maël et son équipe.",
  keywords: [
    "garage moto Thonon-les-Bains",
    "mécanicien moto Thonon",
    "garage moto Chablais",
    "entretien moto 74",
    "moto Thonon bar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mothome — Garage Moto & Bar à Thonon-les-Bains (74)",
    description:
      "Garage moto artisanal à Thonon-les-Bains. Réparation, entretien, accessoires, dépôt-vente et bar convivial.",
    url: "/",
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    icon: Wrench,
    title: "L'Atelier",
    description:
      "Révision, entretien, réparation et contrôle technique par des passionnés. Tarifs affichés, pas de PDF.",
    href: "/atelier",
    cta: "Découvrir l'atelier",
  },
  {
    icon: Home,
    title: "Service à domicile",
    description:
      "Dépannage et entretien directement chez vous. On se déplace dans tout le Chablais et la Haute-Savoie.",
    href: "/service-domicile",
    cta: "Réserver une intervention",
  },
  {
    icon: ShoppingBag,
    title: "Accessoires",
    description:
      "HJC, Shark, Furigan et bien d'autres marques. Garantie d'alignement prix — on s'aligne sur le moins cher.",
    href: "/accessoires",
    cta: "Voir les accessoires",
  },
  {
    icon: RefreshCw,
    title: "Dépôt-Vente",
    description:
      "Achetez ou vendez votre moto en toute confiance. Sélection vérifiée, process transparent.",
    href: "/depot-vente",
    cta: "Voir les motos dispo",
  },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO — Static (parallax 3D désactivé temporairement — UNIA-57)
          ================================================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-noir-profond)]"
        aria-label="Hero — Mothome"
      >
        {/* Static cinematic background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(200,75,17,0.15),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-noir-profond)] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-[var(--spacing-container)] text-center">
          <p className="font-heading text-sm md:text-base text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-6">
            Garage moto artisanal · Thonon-les-Bains
          </p>
          <h1
            className="font-accent uppercase tracking-wider text-[var(--color-blanc-casse)] leading-none mb-4"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
          >
            Mothome
          </h1>
          <p className="font-heading text-xl md:text-3xl text-[var(--color-gris-clair)] uppercase tracking-widest mb-8">
            La Mécanique comme{" "}
            <span className="text-[var(--color-bleu-logo)]">Passion</span>
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--color-gris-moyen)] max-w-xl mx-auto mb-10 leading-relaxed">
            Atelier, service à domicile, accessoires, dépôt-vente — et un bar
            où les passionnés se retrouvent. Un concept unique dans le Chablais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact#rdv"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200 shadow-[var(--shadow-bleu)]"
            >
              Prendre rendez-vous
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/atelier"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-gris-moyen)] text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
            >
              Découvrir l'atelier
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-gris-moyen)] animate-bounce"
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ================================================================
          SERVICES — 4 cards
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] bg-[var(--color-noir-mat)]"
        aria-labelledby="services-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Ce qu'on fait
            </p>
            <h2
              id="services-title"
              className="font-heading text-4xl md:text-5xl text-[var(--color-blanc-casse)] uppercase"
            >
              Nos Services
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon: Icon, title, description, href, cta }) => (
              <article
                key={title}
                className="group relative flex flex-col p-6 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-bleu-logo)]/40 transition-all duration-300 hover:shadow-[var(--shadow-bleu)]"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[var(--color-bleu-logo)]/10 text-[var(--color-bleu-logo)] mb-5 group-hover:bg-[var(--color-bleu-logo)]/20 transition-colors duration-300">
                  <Icon size={22} aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl text-[var(--color-blanc-casse)] uppercase mb-3">
                  {title}
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed flex-1 mb-5">
                  {description}
                </p>

                {/* CTA */}
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors duration-200"
                  aria-label={`${cta} — ${title}`}
                >
                  {cta}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          BAR TEASER — Le concept hybride
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] relative overflow-hidden"
        aria-labelledby="bar-title"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(184,148,58,0.08),transparent)]"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <p className="font-heading text-sm text-[var(--color-or-mat)] uppercase tracking-[0.3em] mb-4">
                Le concept unique
              </p>
              <h2
                id="bar-title"
                className="font-heading text-4xl md:text-5xl text-[var(--color-blanc-casse)] uppercase mb-6"
              >
                Garage <span className="text-[var(--color-or-mat)]">&</span> Bar
              </h2>
              <p className="font-sans text-base text-[var(--color-gris-clair)] leading-relaxed mb-4">
                Chez Mothome, pendant que Mael s'occupe de ta moto, toi tu
                t'installes. Billard, PS5, écrans GP — et une vraie cuisine
                maison pour patienter sans s'ennuyer.
              </p>
              <p className="font-sans text-base text-[var(--color-gris-moyen)] leading-relaxed mb-8">
                Un endroit où les passionnés de moto se retrouvent. Pas juste un
                garage — une expérience.
              </p>

              {/* Bar features */}
              <ul className="space-y-3 mb-8" aria-label="Équipements du bar">
                {[
                  "Retransmissions MotoGP sur grand écran",
                  "Table de billard & PS5",
                  "Cuisine maison — vrai café, vrais sandwichs",
                  "Ambiance mécano, esprit communauté",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[var(--color-gris-clair)]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[var(--color-or-mat)] shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/bar"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-or-mat)]/40 hover:border-[var(--color-or-mat)] text-[var(--color-or-mat)] hover:text-[var(--color-or-chaud)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
              >
                <Coffee size={15} aria-hidden="true" />
                Passer au bar
              </Link>
            </div>

            {/* Visual placeholder */}
            <div
              className="relative aspect-[4/3] rounded-lg bg-[var(--color-noir-mat)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(184,148,58,0.12),transparent)]" />
              <div className="text-center space-y-3 relative z-10">
                <Coffee
                  size={48}
                  className="text-[var(--color-or-mat)]/40 mx-auto"
                />
                <p className="font-accent text-2xl text-[var(--color-or-mat)]/40 tracking-widest uppercase">
                  Le Bar
                </p>
                <p className="font-sans text-xs text-[var(--color-gris-moyen)]/60">
                  Photos bientôt disponibles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS — Google Reviews
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] bg-[var(--color-noir-mat)]"
        aria-labelledby="testimonials-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Ils nous font confiance
            </p>
            <h2
              id="testimonials-title"
              className="font-heading text-4xl md:text-5xl text-[var(--color-blanc-casse)] uppercase"
            >
              Avis Clients
            </h2>
            <p className="mt-3 font-sans text-sm text-[var(--color-gris-moyen)]">
              Avis vérifiés sur Google
            </p>
          </div>

          <GoogleReviews />
        </div>
      </section>

      {/* ================================================================
          CTA FINAL — Prendre RDV
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] relative overflow-hidden"
        aria-labelledby="cta-title"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,80,160,0.12),transparent)]"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto px-[var(--spacing-container)] text-center">
          <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-4">
            Prêt à passer à l'action ?
          </p>
          <h2
            id="cta-title"
            className="font-heading text-4xl md:text-6xl text-[var(--color-blanc-casse)] uppercase mb-6"
          >
            Prends rendez-vous
          </h2>
          <p className="font-sans text-base text-[var(--color-gris-moyen)] mb-10 leading-relaxed">
            Révision, dépannage, devis — contacte Mael directement. Réponse
            rapide, tarif transparent.
          </p>
          <Link
            href="/contact#rdv"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-[var(--color-blanc-casse)] font-heading font-bold uppercase tracking-widest text-base rounded-md transition-colors duration-200 shadow-[var(--shadow-bleu)]"
          >
            Prendre rendez-vous
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
