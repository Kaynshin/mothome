"use client";

import { Phone } from "lucide-react";

interface StickyPhoneCtaProps {
  visible: boolean;
}

export function StickyPhoneCta({ visible }: StickyPhoneCtaProps) {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-hidden={!visible}
    >
      <a
        href="tel:+33450733808"
        aria-label="Appeler Mot'Home au 04 50 73 38 08"
        data-cta="phone-sticky"
        data-cta-location="sticky"
        data-cta-type="phone"
        className={[
          // Layout
          "flex items-center justify-center w-full h-14",
          // Couleurs
          "bg-[var(--color-bleu-livery)] text-[var(--color-blanc-sec)]",
          "hover:bg-[var(--color-bleu-rapide)]",
          "active:bg-[var(--color-bleu-piste)] active:scale-[0.98]",
          // Border top
          "border-t border-[rgba(0,80,160,0.4)]",
          // Typographie & espacement
          "px-5 rounded-none",
          // Focus visible — outline intérieur (bord d'écran)
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-blanc-sec)] focus-visible:outline-offset-[-4px]",
          // Touch
          "touch-action-manipulation",
          // Animation mount/unmount
          "transition-[transform,opacity] will-change-[transform,opacity]",
          visible
            ? "translate-y-0 opacity-100 duration-300 ease-[var(--ease-out-quart)] pointer-events-auto"
            : "translate-y-full opacity-0 duration-150 ease-[var(--ease-out-quart)] pointer-events-none",
          // prefers-reduced-motion : fade seulement, sans translate
          "motion-reduce:translate-y-0 motion-reduce:duration-150 motion-reduce:ease-linear",
        ].join(" ")}
        style={{ touchAction: "manipulation" }}
      >
        {/* Icône */}
        <Phone
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className="shrink-0 mr-3"
        />

        {/* "APPELER ·" — caché sur très petit écran (<360px), visible à partir de 360px */}
        <span
          className="hidden min-[360px]:flex items-baseline gap-2 mr-2"
          aria-hidden="true"
        >
          <span
            className="font-accent text-sm uppercase tracking-[0.12em] font-normal leading-none"
          >
            APPELER
          </span>
          <span
            className="font-accent text-sm uppercase tracking-[0.12em] font-normal leading-none"
          >
            ·
          </span>
        </span>

        {/* Numéro — toujours visible */}
        <span
          className="font-heading text-lg font-bold tracking-[0.02em] leading-none"
        >
          04 50 73 38 08
        </span>
      </a>
    </div>
  );
}
