"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { StickyPhoneCta } from "./StickyPhoneCta";

/**
 * Routes sur lesquelles le sticky phone CTA ne doit pas s'afficher.
 * Typiquement les pages légales où l'appel n'est pas pertinent.
 */
const EXCLUDED_ROUTES = ["/mentions-legales", "/politique-confidentialite"];

/**
 * Hauteur estimée du footer en pixels.
 * Utilisée pour masquer le sticky avant que le footer ne soit visible,
 * afin d'éviter le chevauchement. À affiner lors de la QA visuelle.
 */
const FOOTER_ESTIMATED_HEIGHT_PX = 400;

/**
 * Marge de sécurité supplémentaire avant l'apparition du footer (en pixels).
 * Le sticky disparaît quand le bas du viewport est à moins de
 * FOOTER_ESTIMATED_HEIGHT_PX + FOOTER_MARGIN_PX du bas du document.
 */
const FOOTER_MARGIN_PX = 100;

export function StickyPhoneCtaController() {
  const pathname = usePathname();
  const isExcluded = EXCLUDED_ROUTES.includes(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Ne rien faire sur les routes exclues
    if (isExcluded) return;

    /*
     * Approche scroll + rAF retenue vs IntersectionObserver.
     *
     * Raisons :
     * - Évite d'injecter des sentinels DOM dans un layout RSC (app/layout.tsx)
     *   qui ne doit pas devenir client component.
     * - Plus simple à raisonner : pas de refs à propager, pas de portals.
     * - Performance équivalente grâce au passive listener + rAF throttle :
     *   le callback scroll ne fait rien tant que le frame précédent n'est
     *   pas traité, ce qui est identique au débit d'IO callbacks.
     * - Migration vers IntersectionObserver possible à tout moment si besoin
     *   de précision sub-pixel ou de support SSR strict.
     */
    let raf = 0;

    const onScroll = () => {
      // Throttle via rAF : une seule lecture de layout par frame
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // Le sticky devient visible une fois qu'on a dépassé 85% de la hauteur
        // initiale du viewport (approximation de "fin du hero")
        const heroPassed = scrollY > viewportHeight * 0.85;

        // Le sticky disparaît quand on approche du footer
        const nearFooter =
          scrollY + viewportHeight >=
          docHeight - FOOTER_ESTIMATED_HEIGHT_PX - FOOTER_MARGIN_PX;

        setVisible(heroPassed && !nearFooter);
        raf = 0;
      });
    };

    // Calcul initial (au cas où la page est chargée déjà scrollée)
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isExcluded]);

  // Ne rien rendre sur les routes exclues
  if (isExcluded) return null;

  return <StickyPhoneCta visible={visible} />;
}
