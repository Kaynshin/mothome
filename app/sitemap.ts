import type { MetadataRoute } from "next";

const SITE_URL = "https://www.mothome.fr";

/**
 * Routes publiques indexables. Les pages légales (mentions-legales,
 * politique-confidentialite) sont volontairement absentes : elles sont
 * marquées noindex via leur metadata.
 */
const ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/atelier", priority: 0.9, changeFrequency: "weekly" },
  { path: "/service-domicile", priority: 0.9, changeFrequency: "weekly" },
  { path: "/accessoires", priority: 0.8, changeFrequency: "weekly" },
  { path: "/depot-vente", priority: 0.8, changeFrequency: "weekly" },
  { path: "/bar", priority: 0.8, changeFrequency: "weekly" },
  { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
