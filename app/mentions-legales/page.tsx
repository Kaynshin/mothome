import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales — Mothome",
  description:
    "Mentions légales du site Mothome, garage moto à Thonon-les-Bains.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
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
              Mentions légales
            </li>
          </ol>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-blanc-casse)] uppercase mb-10">
          Mentions légales
        </h1>

        <div className="space-y-8 font-sans text-sm text-[var(--color-gris-clair)] leading-relaxed">
          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Éditeur du site
            </h2>
            <p>
              Mothome — Garage Moto & Bar
              <br />
              Thonon-les-Bains, Haute-Savoie (74200)
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
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
              Hébergement
            </h2>
            <p>
              Vercel Inc.
              <br />
              440 N Bashaw St, Crozet, VA 22932, États-Unis
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
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
            <h2 className="font-heading text-lg text-[var(--color-blanc-casse)] uppercase mb-3">
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
        </div>
      </div>
    </section>
  );
}
