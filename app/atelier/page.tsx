import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, CheckCircle, ArrowRight, Home } from "lucide-react";
import DevisForm from "./DevisForm";

export const metadata: Metadata = {
  title: "L'Atelier — Révision & Entretien Moto | Mothome Thonon",
  description:
    "Révision, entretien, contrôle technique, kit éthanol eFlexMoto à Thonon-les-Bains. Tarifs transparents affichés en clair. Demandez un devis gratuit.",
  keywords: [
    "réparation moto Haute-Savoie",
    "entretien moto Thonon",
    "contrôle technique moto Thonon",
    "révision moto 74",
    "kit éthanol moto eFlexMoto",
  ],
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    id: "revision",
    title: "Révision & Entretien",
    description:
      "Vidange, filtres, bougies, chaîne, freins — une révision complète selon le carnet constructeur. Toutes marques, du scooter à la sportive. On ne fait pas du volume : chaque moto est traitée avec soin.",
    features: [
      "Vidange moteur + filtre à huile",
      "Remplacement bougie(s)",
      "Contrôle et réglage chaîne",
      "Vérification freins et liquide",
      "Contrôle pression et état pneus",
      "Rapport d'état complet",
    ],
    tarifs: [
      { label: "Révision simple (scooter / 125)", prix: "À partir de 60 €" },
      { label: "Révision complète (moto 2 temps)", prix: "À partir de 80 €" },
      { label: "Révision complète (moto 4 temps)", prix: "À partir de 100 €" },
      { label: "Vidange seule", prix: "À partir de 35 €" },
    ],
  },
  {
    id: "reparation",
    title: "Réparation & Diagnostic",
    description:
      "Panne électrique, moteur qui claque, transmission qui grince — Mael diagnostique rapidement et répare juste ce qu'il faut. Pas de pièces inutiles, pas de surfacturation.",
    features: [
      "Diagnostic électronique et mécanique",
      "Réparation moteur (distribution, embrayage…)",
      "Réparation électrique et faisceau",
      "Remplacement câbles et commandes",
      "Remise en état après chute",
      "Devis gratuit avant intervention",
    ],
    tarifs: [
      { label: "Diagnostic (30 min)", prix: "25 €" },
      { label: "Main d'œuvre / heure", prix: "55 € / heure" },
      { label: "Remplacement plaquettes freins", prix: "À partir de 40 €" },
      { label: "Remplacement chaîne + pignons", prix: "À partir de 80 €" },
    ],
  },
  {
    id: "controle-technique",
    title: "Contrôle Technique",
    description:
      "Préparation et accompagnement au contrôle technique moto. On vérifie votre machine avant le passage pour éviter les contre-visites et vous conseiller sur les points à corriger.",
    features: [
      "Pré-inspection complète avant CT",
      "Vérification des niveaux et fuites",
      "Contrôle éclairage et signalisation",
      "Vérification freins et pneus",
      "Correction des défauts mineurs",
      "Accompagnement si nécessaire",
    ],
    tarifs: [
      { label: "Préparation contrôle technique", prix: "40 €" },
      { label: "Correction défauts mineurs (forfait)", prix: "Sur devis" },
    ],
  },
  {
    id: "kit-ethanol",
    title: "Kit Éthanol eFlexMoto",
    description:
      "Passez à l'E85 et divisez votre budget carburant par 2 ou 3. Mothome est installateur certifié eFlexMoto — le kit s'adapte à la plupart des motos injection. Installation propre, homologation incluse.",
    features: [
      "Kit eFlexMoto certifié et homologué",
      "Compatible avec la plupart des motos injection",
      "Installation complète en atelier",
      "Réglage carte moteur inclus",
      "Gain : E85 à ~0.75 € vs SP98 à ~1.80 €",
      "Garantie 2 ans sur le kit",
    ],
    tarifs: [
      { label: "Kit + installation (mono-injecteur)", prix: "À partir de 490 €" },
      { label: "Kit + installation (bi-injecteur)", prix: "À partir de 590 €" },
      { label: "Kit + installation (multi-injecteur)", prix: "Sur devis" },
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AtelierPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="py-20 md:py-28 bg-[var(--color-noir-mat)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-[var(--color-gris-moyen)]">
                <li>
                  <Link href="/" className="hover:text-[var(--color-blanc-casse)] transition-colors">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[var(--color-gris-clair)]" aria-current="page">
                  L'Atelier
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-orange-brule)]/10 text-[var(--color-orange-brule)]">
                <Wrench size={20} aria-hidden="true" />
              </div>
              <span className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-widest">
                Révision · Réparation · Entretien
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl text-[var(--color-blanc-casse)] uppercase mb-6">
              L'Atelier
            </h1>
            <p className="font-sans text-lg text-[var(--color-gris-clair)] leading-relaxed mb-8 max-w-2xl">
              Mécanique artisanale à Thonon-les-Bains. Toutes marques, du scooter à
              la sportive. Tarifs transparents affichés en clair — fini le PDF
              introuvable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#devis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
              >
                Demander un devis
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <Link
                href="/service-domicile"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-gris-moyen)] text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
              >
                <Home size={15} aria-hidden="true" />
                Aussi à domicile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICES — tarifs en HTML
          ================================================================ */}
      <section className="py-[var(--spacing-section)]" aria-label="Nos services et tarifs">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)] space-y-20">
          {SERVICES.map(({ id, title, description, features, tarifs }, index) => (
            <article
              key={id}
              id={id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-blanc-casse)] uppercase mb-4">
                  {title}
                </h2>
                <p className="font-sans text-base text-[var(--color-gris-clair)] leading-relaxed mb-6">
                  {description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-8" aria-label={`Inclus dans ${title}`}>
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[var(--color-gris-clair)]">
                      <CheckCircle
                        size={16}
                        className="text-[var(--color-orange-brule)] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#devis"
                  className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] uppercase tracking-wide transition-colors duration-200"
                >
                  Demander un devis {title.toLowerCase()}
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </div>

              {/* Tarifs table */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-noir-doux)]">
                    <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest">
                      Tarifs indicatifs
                    </h3>
                  </div>
                  <table className="w-full" aria-label={`Tarifs ${title}`}>
                    <caption className="sr-only">Tarifs pour {title}</caption>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      {tarifs.map(({ label, prix }) => (
                        <tr key={label} className="group">
                          <td className="px-6 py-4 text-sm text-[var(--color-gris-clair)] font-sans">
                            {label}
                          </td>
                          <td className="px-6 py-4 text-sm font-heading font-semibold text-[var(--color-orange-brule)] text-right whitespace-nowrap">
                            {prix}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-gris-moyen)]">
                      * Tarifs indicatifs, pièces non incluses. Devis gratuit avant toute intervention.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          DEVIS FORM
          ================================================================ */}
      <section
        id="devis"
        className="py-[var(--spacing-section)] bg-[var(--color-noir-mat)] border-t border-[var(--color-border)]"
        aria-labelledby="devis-title"
      >
        <div className="max-w-3xl mx-auto px-[var(--spacing-container)]">
          <div className="text-center mb-12">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
              Gratuit & sans engagement
            </p>
            <h2
              id="devis-title"
              className="font-heading text-4xl md:text-5xl text-[var(--color-blanc-casse)] uppercase mb-4"
            >
              Demander un devis
            </h2>
            <p className="font-sans text-base text-[var(--color-gris-moyen)]">
              Décris ton problème ou ton projet — Mael te répond sous 24h.
            </p>
          </div>

          <DevisForm />
        </div>
      </section>

      {/* ================================================================
          CTA DOMICILE
          ================================================================ */}
      <section className="py-16 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg">
            <div>
              <h3 className="font-heading text-2xl text-[var(--color-blanc-casse)] uppercase mb-2">
                Ta moto ne peut pas se déplacer ?
              </h3>
              <p className="font-sans text-sm text-[var(--color-gris-moyen)]">
                Mael se déplace chez toi dans tout le Chablais. Dépannage ou entretien à domicile.
              </p>
            </div>
            <Link
              href="/service-domicile"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-orange-brule)]/40 hover:border-[var(--color-orange-brule)] text-[var(--color-orange-brule)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200 whitespace-nowrap"
            >
              <Home size={15} aria-hidden="true" />
              Service à domicile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
