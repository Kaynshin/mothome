import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Wrench, FileText, ChevronRight, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dépôt-Vente Moto — Vendre ou Acheter à Thonon — Mothome",
  description:
    "Confiez votre moto en dépôt-vente à Mothome, Thonon-les-Bains. Estimation gratuite, prise en charge complète, vente rapide. Achetez des motos d'occasion vérifiées par un mécanicien.",
  keywords: [
    "dépôt-vente moto Thonon",
    "vendre moto occasion Haute-Savoie",
    "acheter moto occasion Chablais",
    "moto occasion Thonon-les-Bains",
  ],
  alternates: { canonical: "/depot-vente" },
  openGraph: {
    title: "Dépôt-Vente Moto — Vendre ou Acheter à Thonon — Mothome",
    description:
      "Confiez votre moto en dépôt-vente à Mothome. Estimation gratuite, vente rapide, motos d'occasion vérifiées.",
    url: "/depot-vente",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dépôt-Vente Moto — Vendre ou Acheter à Thonon — Mothome",
    description:
      "Confiez votre moto en dépôt-vente à Mothome. Estimation gratuite, vente rapide, motos d'occasion vérifiées.",
  },
};

const ETAPES_VENDEUR = [
  {
    num: "01",
    titre: "Estimation gratuite",
    description:
      "Amenez votre moto au garage (ou envoyez des photos) — Mael l'estime au prix du marché et vous propose un prix de vente réaliste.",
  },
  {
    num: "02",
    titre: "Contrat de dépôt",
    description:
      "Signature d'un contrat clair : prix de vente convenu, durée, commission. Vous restez propriétaire jusqu'à la vente.",
  },
  {
    num: "03",
    titre: "Mise en vente",
    description:
      "La moto est exposée au garage et publiée sur les principales plateformes. Mael gère les appels et les visites à votre place.",
  },
  {
    num: "04",
    titre: "Vente & règlement",
    description:
      "Dès la vente conclue, vous recevez votre argent. La commission Mothome ne s'applique qu'en cas de vente réussie.",
  },
] as const;

const AVANTAGES_ACHETEUR = [
  {
    icon: Wrench,
    titre: "Contrôle mécanique inclus",
    description:
      "Chaque moto en dépôt est vérifiée par Mael avant mise en vente. Les points de contrôle sont communiqués à l'acheteur.",
  },
  {
    icon: FileText,
    titre: "Dossier complet",
    description:
      "Carnet d'entretien, historique d'accidents, kilométrage vérifié — transparence totale sur chaque véhicule.",
  },
  {
    icon: ShieldCheck,
    titre: "Transaction sécurisée",
    description:
      "Paiement sécurisé au garage, transfert de carte grise géré avec vous. Pas de risque d'arnaque.",
  },
] as const;

const MOTOS_EXEMPLE = [
  {
    marque: "Honda",
    modele: "CB650R",
    annee: 2021,
    km: "12 400 km",
    prix: "7 500 €",
    etat: "Excellent état",
    disponible: true,
  },
  {
    marque: "Yamaha",
    modele: "MT-07",
    annee: 2019,
    km: "28 000 km",
    prix: "5 800 €",
    etat: "Bon état",
    disponible: true,
  },
  {
    marque: "KTM",
    modele: "Duke 390",
    annee: 2022,
    km: "6 200 km",
    prix: "4 900 €",
    etat: "Très bon état",
    disponible: false,
  },
] as const;

function buildDepotVenteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dépôt-Vente Moto Mothome",
    description:
      "Service de dépôt-vente de motos d'occasion à Thonon-les-Bains. Estimation gratuite, commission à la vente, motos vérifiées.",
    provider: { "@id": "https://www.mothome.fr/#organization" },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Haute-Savoie",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceType: "Dépôt-vente",
      availableLanguage: "fr",
    },
  };
}

export default function DepotVentePage() {
  return (
    <>
      <JsonLd data={buildDepotVenteSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Accueil", url: "https://www.mothome.fr" },
          { name: "Dépôt-Vente", url: "https://www.mothome.fr/depot-vente" },
        ])}
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="py-20 md:py-28 bg-[var(--color-noir-mat)] border-b border-[var(--color-border)]"
        aria-labelledby="depot-hero-title"
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
                Dépôt-Vente
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-4">
              Garage Mothome · Occasion
            </p>
            <h1
              id="depot-hero-title"
              className="font-heading text-5xl md:text-7xl text-[var(--color-blanc-casse)] uppercase mb-6 leading-none"
            >
              Dépôt-
              <br />
              <span className="text-[var(--color-orange-brule)]">Vente</span>
            </h1>
            <p className="font-sans text-lg text-[var(--color-gris-clair)] leading-relaxed max-w-xl">
              Vous vendez votre moto ou vous cherchez une occasion fiable ?
              Mothome gère la vente de A à Z et certifie chaque moto mécaniquement.
              Commission seulement si vente réussie.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#deposer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Déposer ma moto
                <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#motos"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-orange-brule)] text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Voir les motos dispo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MOTOS DISPONIBLES
          ================================================================ */}
      <section
        id="motos"
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="motos-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
              Stock actuel
            </p>
            <h2
              id="motos-title"
              className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase"
            >
              Motos disponibles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {MOTOS_EXEMPLE.map((moto) => (
              <article
                key={`${moto.marque}-${moto.modele}-${moto.annee}`}
                className={`relative p-6 bg-[var(--color-noir-mat)] border rounded-lg ${
                  moto.disponible
                    ? "border-[var(--color-border)]"
                    : "border-[var(--color-border)] opacity-50"
                }`}
              >
                {!moto.disponible && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[var(--color-gris-moyen)]/20 rounded text-xs font-heading font-semibold text-[var(--color-gris-moyen)] uppercase tracking-wide">
                    Vendue
                  </div>
                )}
                {moto.disponible && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[var(--color-orange-brule)]/15 rounded text-xs font-heading font-semibold text-[var(--color-orange-brule)] uppercase tracking-wide">
                    Disponible
                  </div>
                )}

                <div className="mb-4 pt-2">
                  <h3 className="font-heading text-xl text-[var(--color-blanc-casse)] uppercase">
                    {moto.marque} {moto.modele}
                  </h3>
                  <p className="font-sans text-sm text-[var(--color-gris-moyen)]">
                    {moto.annee} · {moto.km}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="block font-sans text-xs text-[var(--color-gris-moyen)] mb-1">
                      {moto.etat}
                    </span>
                    <span className="font-heading text-2xl text-[var(--color-orange-brule)]">
                      {moto.prix}
                    </span>
                  </div>
                  {moto.disponible && (
                    <Link
                      href="/contact"
                      className="text-xs font-heading font-semibold text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] uppercase tracking-wide transition-colors"
                    >
                      Me renseigner →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className="font-sans text-sm text-[var(--color-gris-moyen)] text-center">
            Stock mis à jour régulièrement.{" "}
            <Link
              href="/contact"
              className="text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] transition-colors"
            >
              Contactez-nous
            </Link>{" "}
            pour la liste complète ou pour une demande spécifique.
          </p>
        </div>
      </section>

      {/* ================================================================
          PROCESSUS VENDEUR
          ================================================================ */}
      <section
        id="deposer"
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="vendeur-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
              Vous vendez ?
            </p>
            <h2
              id="vendeur-title"
              className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase"
            >
              Comment ça marche
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {ETAPES_VENDEUR.map(({ num, titre, description }) => (
              <div key={num} className="relative">
                <span className="block font-heading text-5xl text-[var(--color-orange-brule)]/15 mb-4 leading-none">
                  {num}
                </span>
                <h3 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-2">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Commission info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg">
              <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-3">
                Commission & conditions
              </h3>
              <ul className="space-y-2 font-sans text-sm text-[var(--color-gris-moyen)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-orange-brule)] shrink-0 mt-0.5">·</span>
                  Commission uniquement en cas de vente réussie (tarif communiqué lors de l'estimation)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-orange-brule)] shrink-0 mt-0.5">·</span>
                  Durée de dépôt : 1 à 3 mois renouvelables
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-orange-brule)] shrink-0 mt-0.5">·</span>
                  Vous gardez votre moto jusqu'au dépôt effectif au garage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-orange-brule)] shrink-0 mt-0.5">·</span>
                  Toutes marques acceptées — deux-roues de 50cc à 1200cc
                </li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--color-orange-brule)]/5 border border-[var(--color-orange-brule)]/20 rounded-lg flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-heading text-sm font-semibold text-[var(--color-blanc-casse)] uppercase tracking-widest mb-2">
                  Estimation gratuite
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)]">
                  Appelez Mael ou passez au garage avec votre moto pour une estimation sans engagement.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+33XXXXXXXXX"
                  className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] uppercase tracking-wide transition-colors"
                >
                  <Phone size={14} aria-hidden="true" />
                  Appeler Mael →
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] uppercase tracking-wide transition-colors"
                >
                  Formulaire de contact →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          AVANTAGES ACHETEUR
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)]"
        aria-labelledby="acheteur-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
              Vous achetez ?
            </p>
            <h2
              id="acheteur-title"
              className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase"
            >
              L'occasion certifiée
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AVANTAGES_ACHETEUR.map(({ icon: Icon, titre, description }) => (
              <div
                key={titre}
                className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-md bg-[var(--color-orange-brule)]/10 text-[var(--color-orange-brule)] mb-4">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-2">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
            >
              Me renseigner sur une moto
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
