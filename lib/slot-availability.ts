/** Jours ouvrables : 0=Dim, 1=Lun, ..., 6=Sam. Fermé le dimanche. */
const CLOSED_DAYS = new Set([0]); // Dimanche

/**
 * Vérifie la disponibilité simplifiée du créneau (V1).
 * - La date doit être dans le futur
 * - Le garage doit être ouvert ce jour-là (pas le dimanche)
 */
export function checkSlotAvailability(dateStr: string): {
  available: boolean;
  reason?: string;
} {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { available: false, reason: "Date invalide." };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today) {
    return { available: false, reason: "La date choisie est dans le passé." };
  }

  const dayOfWeek = date.getDay();
  if (CLOSED_DAYS.has(dayOfWeek)) {
    return {
      available: false,
      reason: "Le garage est fermé ce jour. Veuillez choisir un jour du lundi au samedi.",
    };
  }

  return { available: true };
}
