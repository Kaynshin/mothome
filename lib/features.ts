/**
 * Feature flags Mothome.
 *
 * NEXT_PUBLIC_FORMS_ENABLED : contrôle l'affichage des formulaires
 * (contact, devis, RDV). Quand "false" ou non défini, les pages affichent
 * un bloc de fallback FormsDisabledCTA pointant vers le téléphone.
 * Le code des formulaires + endpoints API reste en place pour un retour
 * rapide via flip du flag.
 *
 * NEXT_PUBLIC_COOKIE_BANNER_ENABLED : contrôle l'affichage de la bannière
 * de consentement cookies. Flag dormant tant que le site n'utilise que
 * Vercel Analytics (cookieless by design, hash de requête). À activer si
 * un tracker non-exempté est ajouté (GA4, Meta Pixel, Hotjar, etc.).
 */
export const formsEnabled =
  process.env.NEXT_PUBLIC_FORMS_ENABLED === "true";

export const cookieBannerEnabled =
  process.env.NEXT_PUBLIC_COOKIE_BANNER_ENABLED === "true";
