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
import { PhoneCta } from "@/components/ui/phone-cta";

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
    eyebrow: "Atelier",
    title: "L'Atelier",
    description:
      "Révision, entretien, réparation et contrôle technique par des passionnés. Tarifs affichés, pas de surprise.",
    href: "/atelier",
    cta: "Découvrir l'atelier",
    featured: true,
  },
  {
    icon: Home,
    eyebrow: "À domicile",
    title: "Service à domicile",
    description:
      "Dépannage et entretien directement chez vous dans tout le Chablais et la Haute-Savoie.",
    href: "/service-domicile",
    cta: "Réserver une intervention",
    featured: false,
  },
  {
    icon: ShoppingBag,
    eyebrow: "Accessoires",
    title: "Équipement",
    description:
      "HJC, Shark, Furygan et bien d'autres. Garantie d'alignement prix — on s'aligne sur le moins cher.",
    href: "/accessoires",
    cta: "Voir les accessoires",
    featured: false,
  },
  {
    icon: RefreshCw,
    eyebrow: "Dépôt-Vente",
    title: "Dépôt-Vente",
    description:
      "Achetez ou vendez votre moto en toute confiance. Sélection vérifiée, process transparent.",
    href: "/depot-vente",
    cta: "Voir les motos dispo",
    featured: false,
  },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO — Racing
          ================================================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)]"
        aria-label="Hero — Mothome"
      >
        {/* Background glow bleu livery */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(0,80,160,0.18),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-[var(--spacing-container)] text-center">
          <p className="font-accent text-sm md:text-base text-[var(--color-bleu-livery)] uppercase tracking-[0.3em] mb-6">
            Garage moto artisanal · Thonon-les-Bains
          </p>
          <h1
            className="font-heading font-black uppercase text-[var(--color-foreground)] leading-none mb-4"
            style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.92, letterSpacing: "0.01em" }}
          >
            Mothome
          </h1>
          <p className="font-heading text-xl md:text-3xl text-[var(--color-muted-foreground)] uppercase tracking-widest mb-8">
            La Mécanique comme{" "}
            <span className="text-[var(--color-bleu-livery)]">Passion</span>
          </p>
          <p className="font-sans text-base md:text-lg text-[var(--color-muted-foreground)] max-w-xl mx-auto mb-10 leading-relaxed">
            Atelier, service à domicile, accessoires, dépôt-vente — et un bar
            où les passionnés se retrouvent. Un concept unique dans le Chablais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact#rdv"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-livery)] hover:bg-[var(--color-bleu-rapide)] hover:-translate-y-px text-white font-accent uppercase tracking-[0.12em] text-sm rounded transition-[colors,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[var(--shadow-bleu)]"
            >
              Prendre rendez-vous
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/atelier"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-bleu-livery)] text-[var(--color-muted-foreground)] hover:text-[var(--color-bleu-livery)] font-accent uppercase tracking-[0.12em] text-sm rounded transition-[colors,border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              Découvrir l&apos;atelier
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-muted-foreground)] motion-safe:animate-bounce"
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ================================================================
          SERVICES — Bento grid asymétrique (anti iso-grid)
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] bg-[var(--color-card)]"
        aria-labelledby="services-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          {/* Section header */}
          <div className="mb-12">
            <p className="font-accent text-sm text-[var(--color-bleu-livery)] uppercase tracking-[0.3em] mb-2">
              Ce qu&apos;on fait
            </p>
            <h2
              id="services-title"
              className="font-heading font-bold text-4xl md:text-5xl text-[var(--color-foreground)] uppercase"
              style={{ letterSpacing: "0.02em" }}
            >
              Nos Services
            </h2>
          </div>

          {/*
            Bento grid :
            Desktop (3 cols, 2 rows) :
              col 1-2 / row 1-2 → Atelier (featured)
              col 3   / row 1   → Service à domicile
              col 3   / row 2   → Accessoires
              col 1-3 / row 3   → Dépôt-Vente full width
            Mobile : stack simple
          */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Atelier — featured 2×2 */}
            <article
              className="lg:col-span-2 lg:row-span-2 flex flex-col p-10 bg-[var(--color-muted)] border border-[var(--color-border)] rounded transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[var(--color-card)] hover:border-[var(--color-bleu-livery)]/30 group"
            >
              <p className="font-accent text-xs text-[var(--color-bleu-livery)] uppercase tracking-[0.18em] mb-3">
                Atelier
              </p>
              <h3
                className="font-heading font-bold text-[var(--color-foreground)] uppercase mb-4"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.05, letterSpacing: "0.02em" }}
              >
                L&apos;Atelier
              </h3>
              <p className="font-sans text-base text-[var(--color-muted-foreground)] leading-relaxed flex-1 mb-6 max-w-md">
                Révision, entretien, réparation et contrôle technique par des
                passionnés. Tarifs affichés, pas de surprise.
              </p>
              <Link
                href="/atelier"
                className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-[var(--color-bleu-livery)] hover:text-[var(--color-bleu-rapide)] uppercase tracking-wide transition-colors duration-150 w-fit"
                aria-label="Découvrir l'atelier"
              >
                Découvrir l&apos;atelier
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                  aria-hidden="true"
                />
              </Link>
            </article>

            {/* Service à domicile */}
            <article
              className="flex flex-col p-8 bg-[var(--color-muted)] border border-[var(--color-border)] rounded transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[var(--color-card)] hover:border-[var(--color-bleu-livery)]/30 group"
            >
              <p className="font-accent text-xs text-[var(--color-bleu-livery)] uppercase tracking-[0.18em] mb-3">
                À domicile
              </p>
              <h3
                className="font-heading font-semibold text-[var(--color-foreground)] uppercase mb-3"
                style={{ fontSize: "1.25rem", lineHeight: 1.1, letterSpacing: "0.02em" }}
              >
                Service à domicile
              </h3>
              <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed flex-1 mb-4">
                Dépannage et entretien directement chez vous dans tout le
                Chablais et la Haute-Savoie.
              </p>
              <Link
                href="/service-domicile"
                className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-[var(--color-bleu-livery)] hover:text-[var(--color-bleu-rapide)] uppercase tracking-wide transition-colors duration-150 w-fit"
                aria-label="Réserver une intervention à domicile"
              >
                Réserver
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                  aria-hidden="true"
                />
              </Link>
            </article>

            {/* Accessoires */}
            <article
              className="flex flex-col p-8 bg-[var(--color-muted)] border border-[var(--color-border)] rounded transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[var(--color-card)] hover:border-[var(--color-bleu-livery)]/30 group"
            >
              <p className="font-accent text-xs text-[var(--color-bleu-livery)] uppercase tracking-[0.18em] mb-3">
                Accessoires
              </p>
              <h3
                className="font-heading font-semibold text-[var(--color-foreground)] uppercase mb-3"
                style={{ fontSize: "1.25rem", lineHeight: 1.1, letterSpacing: "0.02em" }}
              >
                Équipement
              </h3>
              <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed flex-1 mb-4">
                HJC, Shark, Furygan. Garantie d&apos;alignement prix.
              </p>
              <Link
                href="/accessoires"
                className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-[var(--color-bleu-livery)] hover:text-[var(--color-bleu-rapide)] uppercase tracking-wide transition-colors duration-150 w-fit"
                aria-label="Voir les accessoires moto"
              >
                Voir les accessoires
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                  aria-hidden="true"
                />
              </Link>
            </article>

            {/* Dépôt-Vente — full width */}
            <article
              className="lg:col-span-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-8 bg-[var(--color-muted)] border border-[var(--color-border)] rounded transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[var(--color-card)] hover:border-[var(--color-bleu-livery)]/30 group"
            >
              <div className="flex-1">
                <p className="font-accent text-xs text-[var(--color-bleu-livery)] uppercase tracking-[0.18em] mb-2">
                  Dépôt-Vente
                </p>
                <h3
                  className="font-heading font-semibold text-[var(--color-foreground)] uppercase mb-2"
                  style={{ fontSize: "1.25rem", lineHeight: 1.1, letterSpacing: "0.02em" }}
                >
                  Achetez ou vendez votre moto
                </h3>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed max-w-lg">
                  Sélection vérifiée, process transparent. Pas de mauvaise
                  surprise.
                </p>
              </div>
              <Link
                href="/depot-vente"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-bleu-livery)]/40 hover:border-[var(--color-bleu-livery)] text-[var(--color-bleu-livery)] font-accent uppercase tracking-[0.12em] text-sm rounded transition-[colors,border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] shrink-0"
                aria-label="Voir les motos disponibles en dépôt-vente"
              >
                Voir les motos
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-150"
                  aria-hidden="true"
                />
              </Link>
            </article>
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
        {/* Background glow bleu livery */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,80,160,0.08),transparent)]"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <p className="font-accent text-sm text-[var(--color-bleu-livery)] uppercase tracking-[0.3em] mb-4">
                Le concept unique
              </p>
              <h2
                id="bar-title"
                className="font-heading font-bold text-4xl md:text-5xl text-[var(--color-foreground)] uppercase mb-6"
                style={{ letterSpacing: "0.02em" }}
              >
                Garage <span className="text-[var(--color-bleu-livery)]">&amp;</span> Bar
              </h2>
              <p className="font-sans text-base text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                Chez Mothome, pendant que Mael s&apos;occupe de ta moto, toi tu
                t&apos;installes. Billard, PS5, écrans GP — et une vraie cuisine
                maison pour patienter sans s&apos;ennuyer.
              </p>
              <p className="font-sans text-base text-[var(--color-muted-foreground)] leading-relaxed mb-8">
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
                    className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[var(--color-bleu-livery)] shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/bar"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-bleu-livery)]/40 hover:border-[var(--color-bleu-livery)] text-[var(--color-bleu-livery)] hover:text-[var(--color-bleu-rapide)] font-accent uppercase tracking-[0.12em] text-sm rounded transition-[colors,border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                <Coffee size={15} aria-hidden="true" />
                Passer au bar
              </Link>
            </div>

            {/* Visual placeholder */}
            <div
              className="relative aspect-[4/3] rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,80,160,0.10),transparent)]" />
              <div className="text-center space-y-3 relative z-10">
                <Coffee
                  size={48}
                  className="text-[var(--color-bleu-livery)]/30 mx-auto"
                />
                <p className="font-heading font-bold text-2xl text-[var(--color-bleu-livery)]/30 tracking-widest uppercase">
                  Le Bar
                </p>
                <p className="font-sans text-xs text-[var(--color-muted-foreground)]/60">
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
        className="py-[var(--spacing-section)] bg-[var(--color-card)]"
        aria-labelledby="testimonials-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          {/* Section header */}
          <div className="mb-14">
            <p className="font-accent text-sm text-[var(--color-bleu-livery)] uppercase tracking-[0.3em] mb-2">
              Ils nous font confiance
            </p>
            <h2
              id="testimonials-title"
              className="font-heading font-bold text-4xl md:text-5xl text-[var(--color-foreground)] uppercase"
              style={{ letterSpacing: "0.02em" }}
            >
              Avis Clients
            </h2>
            <p className="mt-3 font-sans text-sm text-[var(--color-muted-foreground)]">
              Avis vérifiés sur Google
            </p>
          </div>

          <GoogleReviews />
        </div>
      </section>

      {/* ================================================================
          CTA FINAL — Téléphone d'abord (PRODUCT.md Design Principle #1)
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
          <p className="font-accent text-sm text-[var(--color-bleu-livery)] uppercase tracking-[0.3em] mb-4">
            Prêt à passer à l&apos;action ?
          </p>
          <h2
            id="cta-title"
            className="font-heading font-bold text-4xl md:text-6xl text-[var(--color-foreground)] uppercase mb-6"
            style={{ letterSpacing: "0.02em" }}
          >
            Prends rendez-vous
          </h2>
          <p className="font-sans text-base text-[var(--color-muted-foreground)] mb-10 leading-relaxed">
            Révision, dépannage, devis — appelle Mael directement. Réponse
            rapide, tarif transparent.
          </p>

          <div className="flex flex-col items-center gap-4">
            <PhoneCta variant="primary" />
            <Link
              href="/contact#rdv"
              className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--color-border)] hover:border-[var(--color-bleu-livery)]/50 text-[var(--color-muted-foreground)] hover:text-[var(--color-bleu-livery)] font-accent uppercase tracking-[0.12em] text-sm rounded transition-[colors,border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              Envoyer un message
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
