import type { CSSProperties } from "react";

/**
 * LiveryStripes — Couche de fond du hero Mothome.
 *
 * Bandes diagonales bleu livery (20°), épaisseurs et opacités variées,
 * inspirées d'une livery moto racing. Couche statique en composition,
 * animée via stripe-drift (30s linear infinite) pour une signature
 * atmosphère speed sans cut sec (dérogation consciente DESIGN.md
 * "speed signature livery").
 *
 * Mobile : seules les stripes 1 (fine) et 4 (accent) restent visibles
 * via `data-mobile-hide` + CSS @media (max-width: 767px).
 *
 * Respect prefers-reduced-motion via .moto-stripe override CSS
 * (animation: none + opacity ÷2). Wrapper aria-hidden, hors tab order.
 */

interface Stripe {
  /** Position verticale (y) en coordonnées viewBox 100×100 */
  y: number;
  /** Épaisseur (height) en coordonnées viewBox */
  h: number;
  /** Variant CSS variable --stripe-op-N (1 = plus subtile, 5 = accent) */
  opVar: 1 | 2 | 3 | 4 | 5;
  /** Si true, la stripe est cachée sous 768px (densité mobile réduite) */
  mobileHide: boolean;
}

const STRIPES: Stripe[] = [
  { y: 12, h: 0.4, opVar: 1, mobileHide: false }, // fine — visible mobile
  { y: 28, h: 0.8, opVar: 2, mobileHide: true },
  { y: 48, h: 2.4, opVar: 3, mobileHide: true },
  { y: 70, h: 4.0, opVar: 4, mobileHide: false }, // accent — visible mobile
  { y: 92, h: 6.0, opVar: 5, mobileHide: true },
];

export function LiveryStripes() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 100 100"
      style={{ zIndex: 1 }}
    >
      <g transform="rotate(20 50 50)">
        {STRIPES.map((s, i) => (
          <rect
            key={i}
            data-mobile-hide={s.mobileHide ? "true" : "false"}
            className="moto-stripe"
            x={-50}
            y={s.y}
            width={200}
            height={s.h}
            fill="var(--color-bleu-livery)"
            style={
              {
                opacity: `var(--stripe-op-${s.opVar})`,
                "--stripe-op": `var(--stripe-op-${s.opVar})`,
              } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}
