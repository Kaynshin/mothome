import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LiveryStripes } from "@/components/motion/LiveryStripes";

export const metadata: Metadata = {
  title: "Lab — Hero Livery Stripes · Mothome",
  description: "Page de test — Hero avec couche de stripes diagonales bleu livery.",
  robots: { index: false, follow: false },
};

export default function HeroParticlesLabPage() {
  return (
    /* ================================================================
       HERO — Racing (copie fidèle de app/page.tsx:108-183)
       + couche LiveryStripes (z-1, derrière le contenu)
       ================================================================ */
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-background)]"
      aria-label="Hero — Mothome (lab livery stripes)"
    >
      {/* Background glow bleu livery — z-0 */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(0,80,160,0.18),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
      </div>

      {/* Livery stripes — z-1, devant le gradient, derrière le contenu */}
      <LiveryStripes />

      {/* Contenu hero — z-10 */}
      <div className="relative z-10 max-w-5xl mx-auto px-[var(--spacing-container)] text-center">
        <p
          className="mh-fade-up-mount font-accent text-sm md:text-base text-[var(--color-bleu-livery)] uppercase tracking-[0.3em] mb-6"
          style={{ animationDelay: "0ms" }}
        >
          Garage moto artisanal · Thonon-les-Bains
        </p>
        <h1
          className="mh-fade-up-mount font-heading font-black uppercase text-[var(--color-foreground)] leading-none mb-4"
          style={{
            fontSize: "clamp(4rem, 15vw, 12rem)",
            lineHeight: 0.92,
            letterSpacing: "0.01em",
            animationDelay: "100ms",
          }}
        >
          Mothome
        </h1>
        <p
          className="mh-fade-up-mount font-heading text-xl md:text-3xl text-[var(--color-muted-foreground)] uppercase tracking-widest mb-8"
          style={{ animationDelay: "220ms" }}
        >
          La Mécanique comme{" "}
          <span className="text-[var(--color-bleu-livery)]">Passion</span>
        </p>
        <p
          className="mh-fade-up-mount font-sans text-base md:text-lg text-[var(--color-muted-foreground)] max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: "340ms" }}
        >
          Atelier, service à domicile, accessoires, dépôt-vente — et un bar
          où les passionnés se retrouvent. Un concept unique dans le Chablais.
        </p>
        <div
          className="mh-fade-up-mount flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "460ms" }}
        >
          <Link
            href="/contact#rdv"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-livery)] hover:bg-[var(--color-bleu-rapide)] hover:-translate-y-px text-white font-accent uppercase tracking-[0.12em] text-sm rounded transition-[colors,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[var(--shadow-bleu)]"
          >
            Joindre l&apos;atelier
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
        className="mh-fade-in-mount absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animationDelay: "800ms" }}
        aria-hidden="true"
      >
        <div className="text-[var(--color-muted-foreground)] motion-safe:animate-bounce">
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}
