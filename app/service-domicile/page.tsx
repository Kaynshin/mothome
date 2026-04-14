import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, MapPin, Clock, ShieldCheck, Phone, ChevronRight } from "lucide-react";
import ReservationForm from "./ReservationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceDomicileSchema, buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service à Domicile — Entretien & Dépannage Moto Thonon, Chablais",
  description:
    "Entretien et dépannage moto à domicile dans le Chablais et en Haute-Savoie. Mael se déplace chez vous — Thonon, Évian, Annemasse et environs. Devis gratuit.",
  keywords: [
    "dépannage moto à domicile Thonon",
    "entretien moto domicile Chablais",
    "mécanicien moto domicile Haute-Savoie",
    "service moto domicile 74",
  ],
  alternates: { canonical: "/service-domicile" },
  openGraph: {
    title: "Service à Domicile — Entretien & Dépannage Moto Thonon, Chablais",
    description:
      "Entretien et dépannage moto à domicile dans le Chablais et en Haute-Savoie. Mael se déplace chez vous.",
    url: "/service-domicile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service à Domicile — Entretien & Dépannage Moto Thonon, Chablais",
    description:
      "Entretien et dépannage moto à domicile dans le Chablais et en Haute-Savoie. Devis gratuit.",
  },
};

const ZONES = [
  { ville: "Thonon-les-Bains", distance: "Zone principale", highlight: true },
  { ville: "Évian-les-Bains", distance: "~15 km", highlight: true },
  { ville: "Annemasse", distance: "~35 km", highlight: false },
  { ville: "Morzine / Les Gets", distance: "~35 km", highlight: false },
  { ville: "Cluses", distance: "~40 km", highlight: false },
  { ville: "Bonneville", distance: "~40 km", highlight: false },
  { ville: "Annecy", distance: "~60 km", highlight: false },
  { ville: "Genève (CH)", distance: "~30 km", highlight: false },
] as const;

const INTERVENTIONS = [
  {
    icon: Wrench,
    titre: "Révision & entretien",
    description:
      "Vidange, filtres, bougies, chaîne, réglages — l'entretien courant réalisé dans votre garage ou sur votre parking.",
  },
  {
    icon: ShieldCheck,
    titre: "Dépannage",
    description:
      "Panne électrique, crevaison, problème de démarrage — diagnostic rapide et réparation sur place quand c'est possible.",
  },
  {
    icon: Clock,
    titre: "Préparation saison",
    description:
      "Remise en route après hivernage, vérification freins, pneus, éclairage — prêt à rouler en 2h.",
  },
  {
    icon: MapPin,
    titre: "Récupération & convoyage",
    description:
      "Votre moto est immobilisée ? Mael peut la récupérer, l'amener à l'atelier et vous la ramener.",
  },
] as const;

const AVANTAGES = [
  "Pas de frais de transport caché — devis transparent",
  "Intervention dans votre garage, parking ou box",
  "Toutes marques : japonaises, européennes, américaines",
  "Outillage professionnel embarqué",
  "Pièces commandées à l'avance sur devis accepté",
  "Disponibilité week-end sur demande",
] as const;

export default function ServiceDomicilePage() {
  return (
    <>
      <JsonLd data={buildServiceDomicileSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Accueil", url: "https://www.mothome.fr" },
          { name: "Service à domicile", url: "https://www.mothome.fr/service-domicile" },
        ])}
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="py-20 md:py-28 bg-[var(--color-noir-mat)] border-b border-[var(--color-border)]"
        aria-labelledby="domicile-hero-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-[var(--color-gris-moyen)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-blanc-casse)] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--color-gris-clair)]" aria-current="page">
                Service à domicile
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-4">
              Garage Mothome · À domicile
            </p>
            <h1
              id="domicile-hero-title"
              className="font-heading text-5xl md:text-7xl text-[var(--color-blanc-casse)] uppercase mb-6 leading-none"
            >
              Service
              <br />
              <span className="text-[var(--color-bleu-logo)]">à domicile</span>
            </h1>
            <p className="font-sans text-lg text-[var(--color-gris-clair)] leading-relaxed max-w-xl">
              Mael se déplace avec son outillage professionnel pour entretenir ou
              dépanner votre moto là où elle se trouve — dans le Chablais et en
              Haute-Savoie.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#reservation"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Réserver une intervention
                <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a
                href="tel:+33XXXXXXXXX"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-bleu-logo)] text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                <Phone size={16} aria-hidden="true" />
                Appeler Mael
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PRÉSENTATION + AVANTAGES
          ================================================================ */}
      <section className="py-[var(--spacing-section)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-blanc-casse)] uppercase mb-6">
                La mécanique qui
                <br />
                <span className="text-[var(--color-bleu-logo)]">vient à vous</span>
              </h2>
              <p className="font-sans text-[var(--color-gris-clair)] leading-relaxed mb-4">
                Plus besoin d&apos;amener votre moto au garage. Mael se déplace avec
                un fourgon équipé — outillage professionnel, huiles, filtres et
                consommables courants embarqués. L&apos;essentiel de l&apos;entretien
                courant se fait sur place, en 1 à 3h.
              </p>
              <p className="font-sans text-[var(--color-gris-clair)] leading-relaxed">
                Pour les réparations nécessitant l&apos;atelier, Mael récupère la
                moto, effectue le travail à Thonon et vous la rapporte. Un seul
                interlocuteur, du début à la fin.
              </p>
            </div>

            <ul className="space-y-3" aria-label="Avantages du service à domicile">
              {AVANTAGES.map((avantage) => (
                <li key={avantage} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-[var(--color-bleu-logo)]/15 text-[var(--color-bleu-logo)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4l2.5 2.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-sans text-sm text-[var(--color-gris-clair)]">
                    {avantage}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================
          TYPES D'INTERVENTIONS
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="interventions-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Ce qu&apos;on peut faire
            </p>
            <h2
              id="interventions-title"
              className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase"
            >
              Types d&apos;interventions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {INTERVENTIONS.map(({ icon: Icon, titre, description }) => (
              <div
                key={titre}
                className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-bleu-logo)]/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-md bg-[var(--color-bleu-logo)]/10 text-[var(--color-bleu-logo)] shrink-0">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-2">
                      {titre}
                    </h3>
                    <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ZONES COUVERTES
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="zones-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
                Zone de couverture
              </p>
              <h2
                id="zones-title"
                className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase mb-4"
              >
                Zones couvertes
              </h2>
              <p className="font-sans text-[var(--color-gris-moyen)] leading-relaxed mb-8">
                Basé à Thonon-les-Bains, Mael couvre l&apos;ensemble du Chablais et la
                Haute-Savoie jusqu&apos;à environ 60 km. Pour les distances supérieures,
                contactez-nous — on s&apos;adapte.
              </p>

              <ul
                className="divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-lg overflow-hidden"
                aria-label="Villes desservies"
              >
                {ZONES.map(({ ville, distance, highlight }) => (
                  <li
                    key={ville}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin
                        size={14}
                        className={
                          highlight
                            ? "text-[var(--color-bleu-logo)]"
                            : "text-[var(--color-gris-moyen)]"
                        }
                        aria-hidden="true"
                      />
                      <span
                        className={`font-sans text-sm ${
                          highlight
                            ? "text-[var(--color-blanc-casse)] font-medium"
                            : "text-[var(--color-gris-clair)]"
                        }`}
                      >
                        {ville}
                      </span>
                    </div>
                    <span className="font-heading text-xs text-[var(--color-gris-moyen)] uppercase tracking-wide">
                      {distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info complementary */}
            <div className="space-y-6">
              <div className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg">
                <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-3">
                  Tarif déplacement
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                  Les frais de déplacement sont inclus dans le devis — pas de
                  mauvaise surprise. Pour les zones &gt; 40 km, un forfait kilométrique
                  peut s&apos;appliquer, précisé avant toute intervention.
                </p>
              </div>

              <div className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg">
                <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-3">
                  Disponibilités
                </h3>
                <ul className="space-y-2">
                  {[
                    { jours: "Lundi – Vendredi", heures: "8h00 – 18h00" },
                    { jours: "Samedi", heures: "9h00 – 16h00" },
                    { jours: "Week-end / urgence", heures: "Sur demande" },
                  ].map(({ jours, heures }) => (
                    <li key={jours} className="flex justify-between">
                      <span className="font-sans text-sm text-[var(--color-gris-clair)]">{jours}</span>
                      <span className="font-heading text-sm text-[var(--color-bleu-logo)]">{heures}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-[var(--color-bleu-logo)]/5 border border-[var(--color-bleu-logo)]/20 rounded-lg">
                <p className="font-sans text-sm text-[var(--color-gris-clair)] leading-relaxed">
                  <strong className="font-heading text-[var(--color-blanc-casse)]">Hors zone ?</strong>{" "}
                  Appelez directement Mael — pour les cas particuliers ou les longues
                  distances, on trouve toujours une solution.
                </p>
                <a
                  href="tel:+33XXXXXXXXX"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-heading font-semibold text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
                >
                  <Phone size={14} aria-hidden="true" />
                  Appeler Mael →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FORMULAIRE DE RÉSERVATION
          ================================================================ */}
      <section
        id="reservation"
        className="py-[var(--spacing-section)]"
        aria-labelledby="reservation-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
                Intervention à domicile
              </p>
              <h2
                id="reservation-title"
                className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase mb-4"
              >
                Réserver une
                <br />intervention
              </h2>
              <p className="font-sans text-[var(--color-gris-moyen)] leading-relaxed mb-8">
                Remplis le formulaire avec tes disponibilités et une description du
                besoin. Mael te rappelle sous 24h pour confirmer la date et établir
                un devis gratuit.
              </p>

              <div className="space-y-4">
                {[
                  { num: "01", text: "Remplis le formulaire" },
                  { num: "02", text: "Mael confirme la date et le devis sous 24h" },
                  { num: "03", text: "Intervention sur place à l'heure convenue" },
                ].map(({ num, text }) => (
                  <div key={num} className="flex items-center gap-4">
                    <span className="font-heading text-2xl text-[var(--color-bleu-logo)]/40 w-8 shrink-0">
                      {num}
                    </span>
                    <span className="font-sans text-sm text-[var(--color-gris-clair)]">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg p-6 md:p-8">
              <ReservationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
