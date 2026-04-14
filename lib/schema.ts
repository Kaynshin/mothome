/**
 * Schema.org JSON-LD builders pour Mothome.
 * Tous les schémas utilisent le format JSON-LD recommandé par Google.
 */

const SITE_URL = "https://www.mothome.fr";

export const BUSINESS = {
  name: "Mothome",
  url: SITE_URL,
  telephone: "+33450000000",
  email: "contact@mothome.fr",
  address: {
    streetAddress: "Thonon-les-Bains",
    addressLocality: "Thonon-les-Bains",
    postalCode: "74200",
    addressRegion: "Haute-Savoie",
    addressCountry: "FR",
  },
  image: `${SITE_URL}/images/og-mothome.jpg`,
  logo: `${SITE_URL}/images/logo-mothome.png`,
  priceRange: "$$",
  openingHours: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "16:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/mothome",
    "https://www.facebook.com/mothome",
  ],
} as const;

/** Schema principal MotorcycleRepair — présent sur toutes les pages. */
export function buildMotorcycleRepairSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MotorcycleRepair",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    description:
      "Garage moto artisanal et bar à Thonon-les-Bains. Réparation, entretien, accessoires, dépôt-vente et espace convivial pour les passionnés de moto.",
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    image: BUSINESS.image,
    logo: {
      "@type": "ImageObject",
      url: BUSINESS.logo,
    },
    priceRange: BUSINESS.priceRange,
    openingHoursSpecification: BUSINESS.openingHours,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Haute-Savoie",
    },
    sameAs: BUSINESS.sameAs,
  };
}

/** Schema Service pour L'Atelier. */
export function buildAtelierSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Révision & Réparation Moto",
    description:
      "Révision complète, entretien, contrôle technique et kit éthanol eFlexMoto. Toutes marques, travail artisanal à Thonon-les-Bains.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Haute-Savoie",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Atelier Mothome",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Révision moto toutes marques",
            description:
              "Vidange, filtres, bougies, chaîne, freins — révision complète selon le carnet constructeur.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Contrôle technique moto",
            description: "Contrôle technique officiel pour motos et scooters.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kit éthanol eFlexMoto",
            description:
              "Installation du kit éthanol eFlexMoto pour rouler au SP95-E10, E85 ou super.",
          },
        },
      ],
    },
  };
}

/** Schema Service pour le service à domicile. */
export function buildServiceDomicileSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Entretien & Dépannage Moto à Domicile",
    description:
      "Entretien et dépannage moto à domicile dans le Chablais et en Haute-Savoie. Intervention rapide, devis gratuit.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 46.3703,
        longitude: 6.4784,
      },
      geoRadius: "30000",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceType: "À domicile",
      availableLanguage: "fr",
    },
  };
}

/** Schema ContactPage pour la page Contact. */
export function buildContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Mothome",
    url: `${SITE_URL}/contact`,
    description:
      "Prenez rendez-vous en ligne, appelez-nous ou passez au garage. Mothome, Thonon-les-Bains 74200.",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Schema BarOrPub pour Le Bar. */
export function buildBarSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Le Bar Mothome",
    description:
      "Bar bikers avec billard, PS5, cuisine maison et retransmission MotoGP à Thonon-les-Bains.",
    url: `${SITE_URL}/bar`,
    telephone: BUSINESS.telephone,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    servesCuisine: "Cuisine maison",
    openingHoursSpecification: BUSINESS.openingHours,
  };
}

/** Schema BreadcrumbList. */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
