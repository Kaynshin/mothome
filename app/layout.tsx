import type { Metadata } from "next";
import { Barlow_Condensed, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMotorcycleRepairSchema } from "@/lib/schema";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const SITE_URL = "https://www.mothome.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mothome — Garage Moto & Bar à Thonon-les-Bains (74)",
    template: "%s | Mothome",
  },
  description:
    "Garage moto artisanal à Thonon-les-Bains. Réparation, entretien, accessoires, dépôt-vente et bar convivial. Prenez rendez-vous avec Maël et son équipe.",
  keywords: [
    "garage moto Thonon-les-Bains",
    "mécanicien moto Thonon",
    "garage moto Chablais",
    "entretien moto 74",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/mothome-ecusson.jpg",
    shortcut: "/mothome-ecusson.jpg",
    apple: "/mothome-ecusson.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Mothome",
    title: "Mothome — Garage Moto & Bar à Thonon-les-Bains (74)",
    description:
      "Garage moto artisanal à Thonon-les-Bains. Réparation, entretien, accessoires, dépôt-vente et bar convivial. Prenez rendez-vous avec Maël et son équipe.",
    images: [
      {
        url: "/images/og-mothome.jpg",
        width: 1200,
        height: 630,
        alt: "Mothome — Garage Moto & Bar à Thonon-les-Bains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mothome — Garage Moto & Bar à Thonon-les-Bains (74)",
    description:
      "Garage moto artisanal à Thonon-les-Bains. Réparation, entretien, accessoires, dépôt-vente et bar convivial.",
    images: ["/images/og-mothome.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${barlowCondensed.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <JsonLd data={buildMotorcycleRepairSchema()} />
          <Header />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
