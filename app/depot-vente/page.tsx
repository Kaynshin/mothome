import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Wrench, FileText, ChevronRight, ExternalLink } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { PhoneCta } from "@/components/ui/phone-cta";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";

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
      "Amenez votre moto au garage (ou envoyez des photos) — l'atelier l'estime au prix du marché et vous propose un prix de vente réaliste.",
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
      "La moto est exposée au garage et publiée sur les principales plateformes. L'équipe Mothome gère les appels et les visites à votre place.",
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
      "Chaque moto en dépôt est vérifiée par l'atelier avant mise en vente. Les points de contrôle sont communiqués à l'acheteur.",
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

// Stock actuel — 3 dernières annonces publiées sur le compte Leboncoin
// MOT'HOME (Haute-Savoie, catégorie motos). Mises à jour manuellement à
// chaque rotation de stock. Le profil Leboncoin du vendeur n'est pas
// scrapable automatiquement (captcha Datadome), d'où la mise à jour
// éditoriale via la recherche Leboncoin "Mot'Home" + Haute-Savoie.
const MOTOS_EXEMPLE = [
  {
    marque: "Aprilia",
    modele: "Caponord 1200 Travel",
    annee: 2018,
    km: "35 000 km",
    prix: "7 500 €",
    cylindree: "1200 cc",
    disponible: true,
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/88/9e/99/889e993be3ba1add4625bf9938a5780767e9e2a2.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3191396957",
  },
  {
    marque: "Piaggio",
    modele: "MP3 530 HPE Exclusive",
    annee: 2023,
    km: "7 000 km",
    prix: "8 500 €",
    cylindree: "530 cc",
    disponible: true,
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/59/b4/7d/59b47d289bd3d9313ec7653ef4bc9beff877bc29.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3188337073",
  },
  {
    marque: "Yamaha",
    modele: "MT-09",
    annee: 2013,
    km: "32 665 km",
    prix: "5 000 €",
    cylindree: "850 cc",
    disponible: true,
    photo:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/3d/b5/2d/3db52db32cd8e1167006305cdd0b67d20229ee16.jpg?rule=ad-large",
    lbcUrl: "https://www.leboncoin.fr/ad/motos/3188246799",
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
        className="py-20 md:py-28 bg-[var(--color-card)] border-b border-[var(--color-border)]"
        aria-labelledby="depot-hero-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <nav
            aria-label="Fil d'Ariane"
            className="mh-fade-up-mount mb-8"
            style={{ animationDelay: "0ms" }}
          >
            <ol className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--color-muted-foreground)]" aria-current="page">
                Dépôt-Vente
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p
              className="mh-fade-up-mount font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-4"
              style={{ animationDelay: "80ms" }}
            >
              Garage Mothome · Occasion
            </p>
            <h1
              id="depot-hero-title"
              className="mh-fade-up-mount font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--color-foreground)] uppercase mb-6 leading-none whitespace-nowrap"
              style={{ animationDelay: "160ms" }}
            >
              Dépôt-<span className="text-[var(--color-bleu-logo)]">Vente</span>
            </h1>
            <p
              className="mh-fade-up-mount font-sans text-lg text-[var(--color-muted-foreground)] leading-relaxed max-w-xl"
              style={{ animationDelay: "280ms" }}
            >
              Vous vendez votre moto ou vous cherchez une occasion fiable ?
              Mothome gère la vente de A à Z et certifie chaque moto mécaniquement.
              Commission seulement si vente réussie.
            </p>
            <div
              className="mh-fade-up-mount flex flex-wrap gap-4 mt-8"
              style={{ animationDelay: "400ms" }}
            >
              <a
                href="#deposer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-white font-heading font-semibold uppercase tracking-widest text-sm rounded transition-colors"
              >
                Déposer ma moto
                <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#motos"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-bleu-logo)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] font-heading font-semibold uppercase tracking-widest text-sm rounded transition-colors"
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
          <FadeIn direction="up" className="mb-12">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Stock actuel
            </p>
            <h2
              id="motos-title"
              className="font-heading text-4xl text-[var(--color-foreground)] uppercase"
            >
              Motos disponibles
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10" stagger={90}>
            {MOTOS_EXEMPLE.map((moto) => (
              <article
                key={`${moto.marque}-${moto.modele}-${moto.annee}`}
                className={`relative bg-[var(--color-card)] border rounded-lg overflow-hidden flex flex-col ${
                  moto.disponible
                    ? "border-[var(--color-border)]"
                    : "border-[var(--color-border)] opacity-50"
                }`}
              >
                <div className="relative aspect-[4/3] bg-[var(--color-muted)]">
                  <Image
                    src={moto.photo}
                    alt={`${moto.marque} ${moto.modele} ${moto.annee} — annonce dépôt-vente Mothome`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {!moto.disponible && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-[var(--color-chassis-noir)]/80 rounded text-xs font-heading font-semibold text-[var(--color-blanc-sec)] uppercase tracking-wide">
                      Vendue
                    </div>
                  )}
                  {moto.disponible && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-[var(--color-bleu-logo)] rounded text-xs font-heading font-semibold text-white uppercase tracking-wide">
                      Disponible
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="font-heading text-xl text-[var(--color-foreground)] uppercase">
                      {moto.marque} {moto.modele}
                    </h3>
                    <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                      {moto.annee} · {moto.km}
                    </p>
                  </div>

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="block font-sans text-xs text-[var(--color-muted-foreground)] mb-1">
                        {moto.cylindree}
                      </span>
                      <span className="font-heading text-2xl text-[var(--color-bleu-logo)]">
                        {moto.prix}
                      </span>
                    </div>
                    {moto.disponible && (
                      <div className="flex flex-col items-end gap-2">
                        <a
                          href={moto.lbcUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-[var(--color-muted-foreground)] hover:text-[var(--color-bleu-logo)] uppercase tracking-wide transition-colors"
                          aria-label={`Voir l'annonce ${moto.marque} ${moto.modele} sur Leboncoin (ouvre un nouvel onglet)`}
                        >
                          Voir l&apos;annonce
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                        <Link
                          href="/contact"
                          className="text-xs font-heading font-semibold text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
                        >
                          Me renseigner →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </Stagger>

          <p className="font-sans text-sm text-[var(--color-muted-foreground)] text-center">
            Stock mis à jour régulièrement.{" "}
            <Link
              href="/contact"
              className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] transition-colors"
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
          <FadeIn direction="up" className="mb-12">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Vous vendez ?
            </p>
            <h2
              id="vendeur-title"
              className="font-heading text-4xl text-[var(--color-foreground)] uppercase"
            >
              Comment ça marche
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" stagger={80}>
            {ETAPES_VENDEUR.map(({ num, titre, description }) => (
              <div key={num} className="relative">
                <span className="block font-heading text-5xl text-[var(--color-bleu-logo)]/15 mb-4 leading-none">
                  {num}
                </span>
                <h3 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-2">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </Stagger>

          {/* Commission info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg">
              <h3 className="font-heading text-sm font-semibold text-[var(--color-bleu-livery)] uppercase tracking-widest mb-3">
                Commission & conditions
              </h3>
              <ul className="space-y-2 font-sans text-sm text-[var(--color-muted-foreground)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-bleu-logo)] shrink-0 mt-0.5">·</span>
                  Commission uniquement en cas de vente réussie (tarif communiqué lors de l&apos;estimation)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-bleu-logo)] shrink-0 mt-0.5">·</span>
                  Durée de dépôt : 1 à 3 mois renouvelables
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-bleu-logo)] shrink-0 mt-0.5">·</span>
                  Vous gardez votre moto jusqu&apos;au dépôt effectif au garage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-bleu-logo)] shrink-0 mt-0.5">·</span>
                  Toutes marques acceptées — deux-roues de 50cc à 1200cc
                </li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--color-bleu-logo)]/5 border border-[var(--color-bleu-logo)]/20 rounded-lg flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-heading text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-widest mb-2">
                  Estimation gratuite
                </h3>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                  Appelez l&apos;atelier ou passez au garage avec votre moto pour une estimation sans engagement.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <PhoneCta variant="ghost" label="Appeler pour une moto" />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] uppercase tracking-wide transition-colors"
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
          <FadeIn direction="up" className="mb-12">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Vous achetez ?
            </p>
            <h2
              id="acheteur-title"
              className="font-heading text-4xl text-[var(--color-foreground)] uppercase"
            >
              L&apos;occasion certifiée
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={90}>
            {AVANTAGES_ACHETEUR.map(({ icon: Icon, titre, description }) => (
              <div
                key={titre}
                className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-md bg-[var(--color-bleu-logo)]/10 text-[var(--color-bleu-logo)] mb-4">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-2">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </Stagger>

          <FadeIn direction="up" delay={100} className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-white font-heading font-semibold uppercase tracking-widest text-sm rounded transition-colors"
            >
              Me renseigner sur une moto
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
