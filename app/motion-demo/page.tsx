import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Wrench, Truck, Tag, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Motion Demo — Mothome (interne)",
  description: "Page de démonstration des primitives motion. Non indexée.",
  robots: { index: false, follow: false },
};

const PRIMITIVES = [
  {
    icon: Wrench,
    titre: "Atelier",
    description: "Réparation, entretien, diagnostic.",
  },
  {
    icon: Truck,
    titre: "À domicile",
    description: "Mécanicien qui vient sur place.",
  },
  {
    icon: Tag,
    titre: "Accessoires",
    description: "Casques, équipement, pièces.",
  },
  {
    icon: Sparkles,
    titre: "Bar",
    description: "Lieu de vie motards.",
  },
] as const;

export default function MotionDemoPage() {
  return (
    <main className="min-h-screen pb-32">
      {/* En-tête */}
      <section className="py-16 border-b border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="max-w-5xl mx-auto px-[var(--spacing-container)]">
          <div className="mh-fade-up-mount">
            <p className="font-heading text-xs text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Page interne · Non indexée
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-foreground)] uppercase leading-none mb-4">
              Motion Demo
            </h1>
            <p className="font-sans text-base text-[var(--color-muted-foreground)] max-w-2xl mh-fade-up-mount" style={{ animationDelay: "120ms" }}>
              Démonstration isolée des primitives micro-interactions (PR A foundation).
              Scrolle pour voir les FadeIn / Stagger en action.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — FadeIn directions */}
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-[var(--spacing-container)]">
          <FadeIn direction="up">
            <p className="font-heading text-xs text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-2">
              1 — FadeIn directions
            </p>
            <h2 className="font-heading text-2xl text-[var(--color-foreground)] uppercase mb-8">
              4 entrées au scroll
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn direction="up" delay={0}>
              <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded">
                <p className="font-heading text-sm font-semibold text-[var(--color-bleu-logo)] uppercase tracking-wide mb-2">
                  Up
                </p>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                  Apparition depuis le bas. Défaut, utilisé partout sur le site.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="down" delay={80}>
              <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded">
                <p className="font-heading text-sm font-semibold text-[var(--color-bleu-logo)] uppercase tracking-wide mb-2">
                  Down
                </p>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                  Apparition depuis le haut. Pour les éléments suspendus.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={160}>
              <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded">
                <p className="font-heading text-sm font-semibold text-[var(--color-bleu-logo)] uppercase tracking-wide mb-2">
                  Left
                </p>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                  Apparition depuis la droite. Pour les colonnes latérales.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={240}>
              <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded">
                <p className="font-heading text-sm font-semibold text-[var(--color-bleu-logo)] uppercase tracking-wide mb-2">
                  Right
                </p>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                  Apparition depuis la gauche. Pour les blocs texte d&apos;intro.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 2 — Stagger */}
      <section className="py-20 border-b border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="max-w-5xl mx-auto px-[var(--spacing-container)]">
          <FadeIn direction="up">
            <p className="font-heading text-xs text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-2">
              2 — Stagger (cascade)
            </p>
            <h2 className="font-heading text-2xl text-[var(--color-foreground)] uppercase mb-8">
              Liste qui apparaît en cascade
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={80}>
            {PRIMITIVES.map(({ icon: Icon, titre, description }) => (
              <div
                key={titre}
                className="p-6 bg-[var(--color-background)] border border-[var(--color-border)] rounded flex flex-col gap-3"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded bg-[var(--color-bleu-logo)]/10 text-[var(--color-bleu-logo)]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wide">
                  {titre}
                </h3>
                <p className="font-sans text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section 3 — Pulse glow + Link underline */}
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-[var(--spacing-container)]">
          <FadeIn direction="up">
            <p className="font-heading text-xs text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-2">
              3 — Pulse glow & Underline animé
            </p>
            <h2 className="font-heading text-2xl text-[var(--color-foreground)] uppercase mb-8">
              Effets ponctuels
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={120}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 flex-wrap">
              {/* Pulse glow */}
              <div className="flex flex-col gap-3">
                <p className="font-heading text-xs text-[var(--color-muted-foreground)] uppercase tracking-wide">
                  Pulse glow (CTA emphasis)
                </p>
                <button
                  type="button"
                  className="mh-pulse-glow inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bleu-logo)] text-white font-heading font-semibold uppercase tracking-widest text-sm rounded"
                >
                  <Phone size={16} aria-hidden="true" />
                  Appeler l&apos;atelier
                </button>
              </div>

              {/* Link underline */}
              <div className="flex flex-col gap-3">
                <p className="font-heading text-xs text-[var(--color-muted-foreground)] uppercase tracking-wide">
                  Underline animé (hover/focus)
                </p>
                <div className="flex gap-6 text-sm font-heading uppercase tracking-wide text-[var(--color-foreground)]">
                  <a href="#atelier" className="mh-link-underline">Atelier</a>
                  <a href="#domicile" className="mh-link-underline">À domicile</a>
                  <a href="#accessoires" className="mh-link-underline">Accessoires</a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 4 — Stagger left + delay */}
      <section className="py-20 border-b border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="max-w-5xl mx-auto px-[var(--spacing-container)]">
          <FadeIn direction="up">
            <p className="font-heading text-xs text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-2">
              4 — Stagger directionnel
            </p>
            <h2 className="font-heading text-2xl text-[var(--color-foreground)] uppercase mb-8">
              Cascade depuis la droite (timeline)
            </h2>
          </FadeIn>

          <Stagger className="space-y-4" stagger={120} direction="left">
            {[
              { time: "2020", event: "Ouverture de l'atelier Mothome à Thonon" },
              { time: "2021", event: "Lancement du service à domicile Chablais" },
              { time: "2022", event: "Ouverture du bar motards & MotoGP" },
              { time: "2023", event: "Extension au dépôt-vente de motos d'occasion" },
              { time: "2024", event: "Partenariat avec HJC, Shark, Furygan" },
            ].map(({ time, event }) => (
              <div
                key={time}
                className="flex items-center gap-6 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded"
              >
                <span className="font-accent text-3xl text-[var(--color-bleu-logo)] shrink-0 min-w-[5rem]">
                  {time}
                </span>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                  {event}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section 5 — Long scroll spacer + final fade */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-[var(--spacing-container)]">
          <FadeIn direction="up" duration={700} distance={32}>
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-heading text-xs text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
                Fin de la démo
              </p>
              <h2 className="font-heading text-3xl text-[var(--color-foreground)] uppercase mb-6">
                Foundation validée ?
              </h2>
              <p className="font-sans text-[var(--color-muted-foreground)] mb-8 leading-relaxed">
                Si l&apos;effet visuel te convient, on enchaîne sur la PR B
                (application sur la Home). Sinon, dis ce qu&apos;il faut ajuster
                (durée, distance, easing, stagger spacing).
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-white font-heading font-semibold uppercase tracking-widest text-sm rounded transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
