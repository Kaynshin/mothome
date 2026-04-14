"use client";

import dynamic from "next/dynamic";

/**
 * Server-safe wrapper that loads HeroParallax3D client-side only.
 * Three.js and GSAP require browser APIs (WebGL, window, requestAnimationFrame).
 */
const HeroParallax3DWrapper = dynamic(
  () => import("./HeroParallax3D"),
  {
    ssr: false,
    loading: () => (
      <div
        className="relative min-h-screen bg-[var(--color-background)] flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="text-center">
          <div className="font-accent text-[clamp(4rem,15vw,12rem)] leading-none text-[var(--color-foreground)]/10 uppercase tracking-wider select-none">
            Mothome
          </div>
        </div>
      </div>
    ),
  }
);

export default HeroParallax3DWrapper;
