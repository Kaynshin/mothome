import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales — Mothome",
  description:
    "Mentions légales du site Mothome, garage moto à Thonon-les-Bains.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-[var(--spacing-container)]">
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
            <li>
              <Link
                href="/"
                className="hover:text-[var(--color-foreground)] transition-colors"
              >
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--color-muted-foreground)]" aria-current="page">
              Mentions légales
            </li>
          </ol>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-foreground)] uppercase mb-10">
          Mentions légales
        </h1>

        <div className="space-y-8 font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed">
          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Éditeur du site
            </h2>
            <p>
              SARL MOT&apos;HOME
              <br />
              Garage Moto & Bar
              <br />
              6 Chemin de Marclaz Dessus, 74200 Thonon-les-Bains
              <br />
              Téléphone :{" "}
              <a
                href="tel:+33450733808"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] transition-colors"
              >
                04.50.73.38.08
              </a>
              <br />
              Email :{" "}
              <a
                href="mailto:contact@mothome.fr"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] transition-colors"
              >
                contact@mothome.fr
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Immatriculation
            </h2>
            <p>
              RCS Thonon-les-Bains : 888 246 212
              <br />
              SIREN : 888 246 212
              <br />
              SIRET (siège) : 888 246 212 00029
              <br />
              Code APE : 45.40Z (Commerce, entretien et réparation de motocycles)
              <br />
              {/* TODO LCEN art. R123-237: capital social SARL — valeur exacte à fournir (inaccessible via APIs publiques) */}
              Capital social : <em>[à compléter — capital social SARL]</em>
              <br />
              N° TVA intracommunautaire : FR44 888 246 212
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Directeur de la publication
            </h2>
            <p>Maël Quéré, en qualité de Gérant de la SARL MOT&apos;HOME.</p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Hébergement
            </h2>
            {/* TODO LCEN: confirmer hébergeur final (France ou autre). Mettre à jour dénomination + adresse + téléphone. */}
            <p>
              <em>[à confirmer — hébergeur du site]</em>
              <br />
              Dénomination, adresse complète et téléphone de l&apos;hébergeur seront
              renseignés ici dès la finalisation du déploiement.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, logos,
              illustrations) est la propriété exclusive de Mothome, sauf mention
              contraire. Toute reproduction, même partielle, est interdite sans
              autorisation préalable.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Responsabilité
            </h2>
            <p>
              Mothome s&apos;efforce de fournir des informations exactes et à
              jour sur ce site. Toutefois, Mothome ne peut garantir
              l&apos;exactitude, la complétude ou l&apos;actualité des
              informations diffusées. L&apos;utilisation des informations
              fournies se fait sous la seule responsabilité de l&apos;utilisateur.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Données personnelles
            </h2>
            <p>
              Les modalités de collecte, de traitement et de conservation des
              données personnelles sont détaillées dans notre{" "}
              <Link
                href="/politique-confidentialite"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] transition-colors"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
