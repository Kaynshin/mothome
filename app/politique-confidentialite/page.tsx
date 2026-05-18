import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Mothome",
  description:
    "Politique de confidentialité du site Mothome, garage moto à Thonon-les-Bains.",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
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
              Politique de confidentialité
            </li>
          </ol>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-foreground)] uppercase mb-10">
          Politique de confidentialité
        </h1>

        <div className="space-y-8 font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed">
          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
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
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
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
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Durée de conservation
            </h2>
            <p>
              Vos données personnelles sont conservées pour la durée nécessaire
              au traitement de votre demande, et au maximum 3 ans après le
              dernier contact.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Vos droits
            </h2>
            <p>
              Conformément au RGPD (articles 15 à 22), vous disposez d&apos;un
              droit d&apos;accès, de rectification, de suppression, de
              limitation, d&apos;opposition et de portabilité de vos données,
              ainsi que du droit de définir des directives relatives au sort de
              vos données après votre décès. Pour exercer ces droits,
              contactez-nous à{" "}
              <a
                href="mailto:contact@mothome.fr"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] underline underline-offset-2 transition-colors"
              >
                contact@mothome.fr
              </a>
              .
            </p>
            <p className="mt-3">
              Vous disposez également du droit d&apos;introduire une
              réclamation auprès de la CNIL (Commission Nationale de
              l&apos;Informatique et des Libertés) si vous estimez que le
              traitement de vos données ne respecte pas la réglementation :{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] underline underline-offset-2 transition-colors"
              >
                cnil.fr/fr/plaintes
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Cookies et mesure d&apos;audience
            </h2>
            <p>
              Ce site n&apos;utilise <strong>aucun cookie de traçage publicitaire
              ni de profilage</strong>. Aucune bannière de consentement n&apos;est
              affichée car aucun traceur soumis à consentement n&apos;est déposé
              sur votre terminal.
            </p>
            <p className="mt-3">
              Pour mesurer l&apos;audience du site de manière anonyme, nous
              utilisons <strong>Vercel Analytics</strong>. Cet outil n&apos;utilise
              pas de cookie : il identifie les visiteurs de manière éphémère via
              un hachage anonyme combinant l&apos;adresse IP, l&apos;agent
              utilisateur et un sel quotidien (technique conforme aux
              exigences d&apos;anonymisation de la CNIL).
            </p>
            <p className="mt-3">
              <strong>Base légale :</strong> intérêt légitime (mesure d&apos;audience
              anonyme nécessaire au bon fonctionnement et à l&apos;amélioration du
              site).
              <br />
              <strong>Destinataire :</strong> Vercel Inc. (États-Unis), prestataire
              technique. Le transfert hors Union Européenne est encadré par
              la certification de Vercel Inc. au{" "}
              <a
                href="https://www.dataprivacyframework.gov/list"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] underline underline-offset-2 transition-colors"
              >
                Data Privacy Framework (DPF)
              </a>{" "}
              UE-USA, mécanisme reconnu par la Commission européenne (décision
              d&apos;adéquation du 10 juillet 2023).
              <br />
              <strong>Durée de conservation :</strong> agrégats anonymes
              uniquement, aucune donnée individuelle conservée.
            </p>
            <p className="mt-3">
              Le site peut par ailleurs déposer des cookies strictement
              nécessaires à son fonctionnement (préférences d&apos;affichage,
              session de formulaire). Ces cookies sont exemptés de consentement
              selon l&apos;article 82 de la loi Informatique et Libertés.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-3">
              Contact
            </h2>
            <p>
              Pour toute question relative à la protection de vos données
              personnelles, contactez-nous à{" "}
              <a
                href="mailto:contact@mothome.fr"
                className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] underline underline-offset-2 transition-colors"
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
