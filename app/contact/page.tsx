import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Mail, Clock, Calendar } from "lucide-react";
import { PhoneCta } from "@/components/ui/phone-cta";
import { FormsDisabledCTA } from "@/components/contact/FormsDisabledCTA";
import ContactForm from "./ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildContactPageSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { FadeIn } from "@/components/motion/FadeIn";
import { formsEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: "Contact & Rendez-vous — Garage Moto Mothome à Thonon-les-Bains",
  description:
    "Prenez rendez-vous en ligne, appelez-nous ou passez au garage. Mothome, 74200 Thonon-les-Bains. Horaires, plan d'accès et formulaire de contact.",
  keywords: [
    "rendez-vous garage moto Thonon",
    "horaires garage moto Thonon",
    "contact Mothome",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Rendez-vous — Garage Moto Mothome à Thonon-les-Bains",
    description:
      "Prenez rendez-vous en ligne, appelez-nous ou passez au garage. Mothome, 74200 Thonon-les-Bains.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Rendez-vous — Garage Moto Mothome à Thonon-les-Bains",
    description:
      "Prenez rendez-vous en ligne, appelez-nous ou passez au garage. Mothome, 74200 Thonon-les-Bains.",
  },
};

const CONTACT = {
  address: "Thonon-les-Bains, Haute-Savoie (74)",
  phone: "04 50 73 38 08",
  email: "contact@mothome.fr",
  mapsUrl: "https://maps.google.com/?q=Mothome+Thonon-les-Bains",
} as const;

const HORAIRES = [
  { jours: "Lundi – Vendredi", heures: "8h00 – 18h00", ouvert: true },
  { jours: "Samedi", heures: "9h00 – 16h00", ouvert: true },
  { jours: "Dimanche", heures: "Fermé", ouvert: false },
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildContactPageSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Accueil", url: "https://www.mothome.fr" },
          { name: "Contact", url: "https://www.mothome.fr/contact" },
        ])}
      />
      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="py-20 md:py-28 bg-[var(--color-card)] border-b border-[var(--color-border)]"
        aria-labelledby="contact-hero-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <nav
            aria-label="Fil d'Ariane"
            className="mh-fade-up-mount mb-8"
            style={{ animationDelay: "0ms" }}
          >
            <ol className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--color-muted-foreground)]" aria-current="page">
                Contact
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <p
              className="mh-fade-up-mount font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-4"
              style={{ animationDelay: "80ms" }}
            >
              Garage Mothome · Thonon-les-Bains
            </p>
            <h1
              id="contact-hero-title"
              className="mh-fade-up-mount font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--color-foreground)] uppercase mb-6 leading-none whitespace-nowrap"
              style={{ animationDelay: "160ms" }}
            >
              Nous{" "}
              <span className="text-[var(--color-bleu-logo)]">contacter</span>
            </h1>
            <p
              className="mh-fade-up-mount font-sans text-lg text-[var(--color-muted-foreground)] leading-relaxed"
              style={{ animationDelay: "280ms" }}
            >
              Rendez-vous, devis, question — le plus rapide reste un coup
              de fil. On décroche pendant les horaires d&apos;ouverture.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          MAIN CONTENT — Form + Info
          ================================================================ */}
      <section className="py-[var(--spacing-section)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ---- Form (ou fallback si formsEnabled=false) ---- */}
            <FadeIn direction="right">
              <h2
                id="rdv"
                className="font-heading text-3xl text-[var(--color-foreground)] uppercase mb-8"
              >
                {formsEnabled ? "Prendre rendez-vous" : "Joindre l'atelier"}
              </h2>
              {formsEnabled ? (
                <ContactForm />
              ) : (
                <FormsDisabledCTA
                  title="Un coup de fil, et on s'organise"
                  intro="Rendez-vous, devis, question technique — décrochez votre téléphone. C'est le canal le plus direct pour joindre Mot'Home."
                />
              )}
            </FadeIn>

            {/* ---- Info ---- */}
            <FadeIn direction="left" delay={150} className="space-y-8">
              {/* Infos pratiques */}
              <div>
                <h2 className="font-heading text-3xl text-[var(--color-foreground)] uppercase mb-6">
                  Infos pratiques
                </h2>

                <address className="not-italic space-y-5">
                  {/* Address */}
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                    aria-label="Voir l'adresse sur Google Maps"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-bleu-logo)]/10 text-[var(--color-bleu-logo)] shrink-0 group-hover:bg-[var(--color-bleu-logo)]/20 transition-colors">
                      <MapPin size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-heading text-sm font-semibold text-[var(--color-bleu-livery)] uppercase tracking-widest mb-1">
                        Adresse
                      </span>
                      <span className="font-sans text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors">
                        {CONTACT.address}
                      </span>
                      <span className="block font-sans text-xs text-[var(--color-bleu-logo)] mt-1">
                        Voir sur Google Maps →
                      </span>
                    </div>
                  </a>

                  {/* Phone — variant ghost car le primary est porté par
                      le form (bouton submit) ou le fallback FormsDisabledCTA */}
                  <div className="flex items-center gap-4">
                    <PhoneCta variant="ghost" label="Appeler l'atelier" />
                  </div>

                  {/* Email */}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-bleu-logo)]/10 text-[var(--color-bleu-logo)] shrink-0 group-hover:bg-[var(--color-bleu-logo)]/20 transition-colors">
                      <Mail size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-heading text-sm font-semibold text-[var(--color-bleu-livery)] uppercase tracking-widest mb-1">
                        Email
                      </span>
                      <span className="font-sans text-sm text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors">
                        {CONTACT.email}
                      </span>
                    </div>
                  </a>
                </address>
              </div>

              {/* Horaires */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-[var(--color-bleu-logo)]" aria-hidden="true" />
                  <h3 className="font-heading text-sm font-semibold text-[var(--color-bleu-livery)] uppercase tracking-widest">
                    Horaires d&apos;ouverture
                  </h3>
                </div>
                <ul className="space-y-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg overflow-hidden" aria-label="Horaires d'ouverture">
                  {HORAIRES.map(({ jours, heures, ouvert }) => (
                    <li
                      key={jours}
                      className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] last:border-0"
                    >
                      <span className="font-sans text-sm text-[var(--color-foreground)]">
                        {jours}
                      </span>
                      <span
                        className={`font-heading text-sm font-semibold ${
                          ouvert
                            ? "text-[var(--color-bleu-logo)]"
                            : "text-[var(--color-muted-foreground)]"
                        }`}
                      >
                        {heures}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RDV en ligne — uniquement quand le formulaire est actif */}
              {formsEnabled && (
                <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={18} className="text-[var(--color-bleu-livery)]" aria-hidden="true" />
                    <h3 className="font-heading text-sm font-semibold text-[var(--color-bleu-livery)] uppercase tracking-widest">
                      RDV en ligne
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-[var(--color-muted-foreground)] mb-4 leading-relaxed">
                    Remplis le formulaire ci-contre avec tes disponibilités et le
                    type d&apos;intervention souhaitée.
                  </p>
                  <a
                    href="#rdv"
                    className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
                  >
                    Accéder au formulaire →
                  </a>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================================================================
          CARTE — Google Maps embed
          ================================================================ */}
      <section
        className="pb-[var(--spacing-section)] border-t border-[var(--color-border)] pt-[var(--spacing-section)]"
        aria-labelledby="map-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <FadeIn direction="up">
            <h2
              id="map-title"
              className="font-heading text-3xl text-[var(--color-foreground)] uppercase mb-8"
            >
              Nous trouver
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={120} className="relative rounded-lg overflow-hidden border border-[var(--color-border)] aspect-video max-h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44000!2d6.4798!3d46.3714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c3e3e3e3e3e3e%3A0x0!2sThonon-les-Bains%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation de Mothome à Thonon-les-Bains"
              className="grayscale opacity-80"
            />
          </FadeIn>

          <div className="mt-4 flex justify-end">
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
            >
              <MapPin size={14} aria-hidden="true" />
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
