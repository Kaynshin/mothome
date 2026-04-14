import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Mothome",
  description:
    "Politique de confidentialité du site Mothome, garage moto à Thonon-les-Bains.",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-[var(--spacing-container)]">
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-[var(--color-gris-moyen)]">
            <li>
              <Link
                href="/"
                className="hover:text-[var(--color-blanc-casse)] transition-colors"
              >
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--color-gris-clair)]" aria-current="page">
              Politique de confidentialité
            </li>
          </ol>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-blanc-casse)] uppercase mb-10">
          Politique de confidentialité
        </h1>

        <div className="space-y-8 font-sans text-sm text-[var(--color-gris-clair)] leading-relaxed">
          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Données collectées
            </h2>
            <p>
              Les informations personnelles collectées via les formulaires de
              contact, de devis et de rendez-vous (nom, email, téléphone,
              message) sont utilisées exclusivement pour répondre à vos demandes
              et ne sont jamais transmises à des tiers.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Finalité du traitement
            </h2>
            <p>Vos données sont collectées pour :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Répondre à vos demandes de contact et de devis</li>
              <li>Gérer vos prises de rendez-vous</li>
              <li>Améliorer la qualité de nos services</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Durée de conservation
            </h2>
            <p>
              Vos données personnelles sont conservées pour la durée nécessaire
              au traitement de votre demande, et au maximum 3 ans après le
              dernier contact.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
              de rectification, de suppression et de portabilité de vos données.
              Pour exercer ces droits, contactez-nous à{" "}
              <a
                href="mailto:contact@mothome.fr"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] transition-colors"
              >
                contact@mothome.fr
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Cookies
            </h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son
              fonctionnement et des outils d&apos;analyse (Vercel Analytics) pour
              mesurer l&apos;audience de manière anonyme. Aucun cookie
              publicitaire n&apos;est utilisé.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Contact
            </h2>
            <p>
              Pour toute question relative à la protection de vos données
              personnelles, contactez-nous à{" "}
              <a
                href="mailto:contact@mothome.fr"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] transition-colors"
              >
                contact@mothome.fr
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
