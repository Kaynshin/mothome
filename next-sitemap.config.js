/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.mothome.fr",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    additionalSitemaps: [],
  },
  exclude: [
    "/api/*",
    "/service-domicile",
    "/accessoires",
    "/depot-vente",
    "/bar",
    "/a-propos",
    "/mentions-legales",
    "/politique-confidentialite",
  ],
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
};
