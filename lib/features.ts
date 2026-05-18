/**
 * Feature flags Mothome.
 *
 * NEXT_PUBLIC_FORMS_ENABLED : contrôle l'affichage des formulaires
 * (contact, devis, RDV). Quand "false" ou non défini, les pages affichent
 * un bloc de fallback FormsDisabledCTA pointant vers le téléphone.
 * Le code des formulaires + endpoints API reste en place pour un retour
 * rapide via flip du flag.
 */
export const formsEnabled =
  process.env.NEXT_PUBLIC_FORMS_ENABLED === "true";
