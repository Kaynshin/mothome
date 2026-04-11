import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Tag, Truck, Star, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Accessoires Moto — Casques, Équipements & Pièces — Mothome Thonon",
  description:
    "Casques, équipements de protection, pièces détachées et accessoires moto. Grandes marques au meilleur prix à Thonon-les-Bains. Conseil expert, garantie constructeur.",
  keywords: [
    "accessoires moto Thonon",
    "casque moto Thonon-les-Bains",
    "équipement moto Haute-Savoie",
    "pièces moto Chablais",
  ],
  alternates: { canonical: "/accessoires" },
  openGraph: {
    title: "Accessoires Moto — Casques, Équipements & Pièces — Mothome Thonon",
    description:
      "Casques, équipements de protection, pièces détachées et accessoires moto à Thonon-les-Bains. Conseil expert, garantie constructeur.",
    url: "/accessoires",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessoires Moto — Casques, Équipements & Pièces — Mothome Thonon",
    description:
      "Casques, équipements de protection, pièces détachées et accessoires moto à Thonon-les-Bains.",
  },
};

const CATEGORIES = [
  {
    slug: "casques",
    titre: "Casques",
    description:
      "Intégraux, jet, modulables, motocross — toutes les grandes marques en stock ou sur commande. Conseil personnalisé pour trouver le casque qui correspond à votre morphologie et votre pratique.",
    marques: ["AGV", "Shoei", "Arai", "Bell", "HJC", "LS2"],
    items: [
      "Casques intégraux route & piste",
      "Casques jet & open face",
      "Casques modulables",
      "Casques off-road & enduro",
      "Casques enfant",
    ],
  },
  {
    slug: "equipements",
    titre: "Équipements & Protection",
    description:
      "Blouson, pantalon, gants, bottes — l'équipement complet pour rouler en sécurité. Sélection orientée qualité/prix avec des pièces homologuées CE niveau 2.",
    marques: ["Alpinestars", "Dainese", "Rev'It", "Furygan", "Icon"],
    items: [
      "Blousons cuir & textile",
      "Pantalons moto",
      "Gants été / hiver / pluie",
      "Bottes & chaussures moto",
      "Protections dorsales & airbag",
    ],
  },
  {
    slug: "pieces",
    titre: "Pièces & Consommables",
    description:
      "Pièces d'usure, filtres, huiles, chaînes, pneus — tout ce qu'il faut pour entretenir votre moto. Commande rapide, délai 24-48h pour les références courantes.",
    marques: ["Michelin", "Pirelli", "DID", "K&N", "Castrol", "Motul"],
    items: [
      "Pneus route, sport & off-road",
      "Chaînes, pignons & couronnes",
      "Filtres à huile & à air",
      "Bougies & consommables",
      "Huiles moteur & entretien",
    ],
  },
  {
    slug: "accessoires-moto",
    titre: "Accessoires & Préparation",
    description:
      "Sacoches, GPS, interphones, guidons, échappements et tous les accessoires pour personnaliser et équiper votre moto selon votre pratique.",
    marques: ["Akrapovic", "Arrow", "SW-Motech", "Hepco & Becker", "Sena"],
    items: [
      "Sacoches & systèmes de transport",
      "Interphones & GPS",
      "Échappements sport",
      "Guidons & commandes",
      "Protections & habillage",
    ],
  },
] as const;

const GARANTIES = [
  {
    icon: ShieldCheck,
    titre: "Garantie constructeur",
    description:
      "Tous les produits sont vendus avec la garantie officielle du fabricant — 1 à 5 ans selon la marque et la catégorie.",
  },
  {
    icon: Tag,
    titre: "Meilleur prix garanti",
    description:
      "Vous trouvez moins cher ailleurs sur un produit identique ? On s'aligne. Signalez-nous l'offre concurrente.",
  },
  {
    icon: Truck,
    titre: "Commande rapide",
    description:
      "Les références courantes sont disponibles en 24-48h. Commandez au garage ou par téléphone — livraison ou retrait sur place.",
  },
  {
    icon: Star,
    titre: "Conseil expert",
    description:
      "Mael connaît le matériel qu'il vend. Pas de blabla marketing — des conseils honnêtes adaptés à votre moto et votre budget.",
  },
] as const;

function buildAccessoiresSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Mothome — Accessoires Moto",
    description:
      "Vente de casques, équipements, pièces et accessoires moto à Thonon-les-Bains. Grandes marques, conseil expert, garantie constructeur.",
    url: "https://www.mothome.fr/accessoires",
    telephone: "+33450000000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Thonon-les-Bains",
      postalCode: "74200",
      addressRegion: "Haute-Savoie",
      addressCountry: "FR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Accessoires Moto Mothome",
      itemListElement: CATEGORIES.map((cat) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: cat.titre,
          description: cat.description,
        },
      })),
    },
  };
}

export default function AccessoiresPage() {
  return (
    <>
      <JsonLd data={buildAccessoiresSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Accueil", url: "https://www.mothome.fr" },
          { name: "Accessoires", url: "https://www.mothome.fr/accessoires" },
        ])}
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="py-20 md:py-28 bg-[var(--color-noir-mat)] border-b border-[var(--color-border)]"
        aria-labelledby="accessoires-hero-title"
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
                Accessoires
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-4">
              Garage Mothome · Équipement
            </p>
            <h1
              id="accessoires-hero-title"
              className="font-heading text-5xl md:text-7xl text-[var(--color-blanc-casse)] uppercase mb-6 leading-none"
            >
              Acces-
              <br />
              <span className="text-[var(--color-orange-brule)]">soires</span>
            </h1>
            <p className="font-sans text-lg text-[var(--color-gris-clair)] leading-relaxed max-w-xl">
              Casques, équipements, pièces et accessoires — les grandes marques
              au juste prix, avec le conseil d'un passionné. Sur commande ou en
              stock selon les références.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Demander un produit
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          GARANTIES
          ================================================================ */}
      <section className="py-16 border-b border-[var(--color-border)]" aria-label="Nos engagements">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GARANTIES.map(({ icon: Icon, titre, description }) => (
              <div key={titre} className="flex flex-col gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-orange-brule)]/10 text-[var(--color-orange-brule)]">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-[var(--color-blanc-casse)] uppercase tracking-wide">
                  {titre}
                </h3>
                <p className="font-sans text-xs text-[var(--color-gris-moyen)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CATÉGORIES
          ================================================================ */}
      <section className="py-[var(--spacing-section)]" aria-labelledby="categories-title">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
              Notre sélection
            </p>
            <h2
              id="categories-title"
              className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase"
            >
              Catégories
            </h2>
          </div>

          <div className="space-y-px border border-[var(--color-border)] rounded-lg overflow-hidden">
            {CATEGORIES.map((cat, idx) => (
              <article
                key={cat.slug}
                id={cat.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                  idx % 2 === 0
                    ? "bg-[var(--color-noir-mat)]"
                    : "bg-[var(--color-noir-doux)]"
                }`}
              >
                {/* Content */}
                <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
                  <h3 className="font-heading text-2xl text-[var(--color-blanc-casse)] uppercase mb-4">
                    {cat.titre}
                  </h3>
                  <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Marques */}
                  <div className="flex flex-wrap gap-2">
                    {cat.marques.map((marque) => (
                      <span
                        key={marque}
                        className="px-3 py-1 bg-[var(--color-orange-brule)]/10 border border-[var(--color-orange-brule)]/20 rounded text-xs font-heading font-semibold text-[var(--color-orange-brule)] uppercase tracking-wide"
                      >
                        {marque}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div className="p-8 md:p-10">
                  <ul className="space-y-3" aria-label={`Produits — ${cat.titre}`}>
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="w-4 h-4 flex items-center justify-center rounded-full bg-[var(--color-orange-brule)]/15 text-[var(--color-orange-brule)] shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                            <path
                              d="M1 3.5l1.5 1.5L7 1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="font-sans text-sm text-[var(--color-gris-clair)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA COMMANDE
          ================================================================ */}
      <section className="py-16 bg-[var(--color-noir-mat)] border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-blanc-casse)] uppercase mb-4">
              Vous ne trouvez pas ce
              <br />
              <span className="text-[var(--color-orange-brule)]">que vous cherchez ?</span>
            </h2>
            <p className="font-sans text-[var(--color-gris-moyen)] mb-8 leading-relaxed">
              Le catalogue affiché n'est pas exhaustif. Contactez Mael directement
              avec la référence ou la description du produit — il vous trouve le
              meilleur prix et le délai le plus court.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Contacter Mael
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/atelier"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-orange-brule)] text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Voir l'atelier
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
