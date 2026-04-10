import type { Metadata } from "next";
import { Barlow_Condensed, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Mothome — Garage Moto Premium",
    template: "%s | Mothome",
  },
  description:
    "Mothome, votre garage moto premium. Préparation, entretien, customisation sur mesure.",
  keywords: ["garage moto", "préparation moto", "customisation", "entretien moto"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Mothome",
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
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
