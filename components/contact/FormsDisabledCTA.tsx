import { MapPin, Clock } from "lucide-react";
import { PhoneCta } from "@/components/ui/phone-cta";

/**
 * Bloc de remplacement affiché à la place des formulaires (contact, devis,
 * RDV) quand `formsEnabled === false`. Centré sur le téléphone, complété
 * d'un récap horaires + adresse Maps cliquable.
 *
 * Le PhoneCta est volontairement en `variant="primary"` : ce bloc est le
 * CTA principal de la page quand les formulaires sont masqués — il prend
 * la place visuelle du form. Si une page a déjà un autre PhoneCta primary,
 * il doit être passé en `ghost` pour respecter la règle 1 primary par page.
 */
interface FormsDisabledCTAProps {
  /** Titre principal du bloc. Défaut : "Appelez-nous directement". */
  title?: string;
  /** Phrase d'intro courte. Défaut : message générique. */
  intro?: string;
  /** Label du PhoneCta. Défaut : "Appeler l'atelier". */
  ctaLabel?: string;
}

const HORAIRES = [
  { jours: "Lundi – Vendredi", heures: "8h00 – 18h00", ouvert: true },
  { jours: "Samedi", heures: "9h00 – 16h00", ouvert: true },
  { jours: "Dimanche", heures: "Fermé", ouvert: false },
] as const;

const MAPS_URL =
  "https://maps.google.com/?q=6+Chemin+de+Marclaz+Dessus,+74200+Thonon-les-Bains";
const ADDRESS = "6 Chemin de Marclaz Dessus, 74200 Thonon-les-Bains";

export function FormsDisabledCTA({
  title = "Appelez-nous directement",
  intro = "Le plus rapide pour nous joindre : un coup de fil pendant les horaires d'ouverture. On décroche.",
  ctaLabel = "Appeler l'atelier",
}: FormsDisabledCTAProps) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 md:p-8 space-y-6">
      <div>
        <h3 className="font-heading text-2xl text-[var(--color-foreground)] uppercase mb-3">
          {title}
        </h3>
        <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed">
          {intro}
        </p>
      </div>

      {/* CTA principal — primary */}
      <div className="flex justify-center sm:justify-start">
        <PhoneCta variant="primary" label={ctaLabel} />
      </div>

      {/* Horaires */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock
            size={16}
            className="text-[var(--color-bleu-logo)]"
            aria-hidden="true"
          />
          <h4 className="font-heading text-xs font-semibold text-[var(--color-bleu-livery)] uppercase tracking-widest">
            Horaires d&apos;ouverture
          </h4>
        </div>
        <ul
          className="space-y-2 text-sm"
          aria-label="Horaires d'ouverture"
        >
          {HORAIRES.map(({ jours, heures, ouvert }) => (
            <li
              key={jours}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-sans text-[var(--color-muted-foreground)]">
                {jours}
              </span>
              <span
                className={`font-heading text-sm font-semibold ${
                  ouvert
                    ? "text-[var(--color-foreground)]"
                    : "text-[var(--color-muted-foreground)]"
                }`}
              >
                {heures}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Adresse */}
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 group"
        aria-label="Voir l'adresse sur Google Maps"
      >
        <MapPin
          size={16}
          className="text-[var(--color-bleu-logo)] shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <span className="block font-heading text-xs font-semibold text-[var(--color-bleu-livery)] uppercase tracking-widest mb-1">
            Adresse
          </span>
          <span className="font-sans text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors">
            {ADDRESS}
          </span>
          <span className="block font-sans text-xs text-[var(--color-bleu-logo)] mt-1">
            Voir sur Google Maps →
          </span>
        </div>
      </a>
    </div>
  );
}
