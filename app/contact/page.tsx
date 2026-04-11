import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & RDV — Mothome Garage Moto Thonon-les-Bains",
  description:
    "Contactez Mothome pour prendre rendez-vous, demander un devis ou poser une question. Garage moto à Thonon-les-Bains — réponse sous 24h.",
  keywords: [
    "rendez-vous garage moto Thonon",
    "horaires garage moto Thonon",
    "contact Mothome",
  ],
};

const CONTACT = {
  address: "Thonon-les-Bains, Haute-Savoie (74)",
  phone: "+33 X XX XX XX XX",
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
      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="py-20 md:py-28 bg-[var(--color-noir-mat)] border-b border-[var(--color-border)]"
        aria-labelledby="contact-hero-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-[var(--color-gris-moyen)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-blanc-casse)] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--color-gris-clair)]" aria-current="page">
                Contact
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-4">
              Garage Mothome · Thonon-les-Bains
            </p>
            <h1
              id="contact-hero-title"
              className="font-heading text-5xl md:text-7xl text-[var(--color-blanc-casse)] uppercase mb-6"
            >
              Contact
            </h1>
            <p className="font-sans text-lg text-[var(--color-gris-clair)] leading-relaxed">
              Rendez-vous, devis, question — plusieurs façons de joindre Mael.
              Réponse sous 24h garantie.
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

            {/* ---- Form ---- */}
            <div>
              <h2
                id="rdv"
                className="font-heading text-3xl text-[var(--color-blanc-casse)] uppercase mb-8"
              >
                Prendre rendez-vous
              </h2>
              <ContactForm />
            </div>

            {/* ---- Info ---- */}
            <div className="space-y-8">
              {/* Infos pratiques */}
              <div>
                <h2 className="font-heading text-3xl text-[var(--color-blanc-casse)] uppercase mb-6">
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
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-orange-brule)]/10 text-[var(--color-orange-brule)] shrink-0 group-hover:bg-[var(--color-orange-brule)]/20 transition-colors">
                      <MapPin size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-1">
                        Adresse
                      </span>
                      <span className="font-sans text-sm text-[var(--color-gris-clair)] group-hover:text-[var(--color-blanc-casse)] transition-colors">
                        {CONTACT.address}
                      </span>
                      <span className="block font-sans text-xs text-[var(--color-orange-brule)] mt-1">
                        Voir sur Google Maps →
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-orange-brule)]/10 text-[var(--color-orange-brule)] shrink-0 group-hover:bg-[var(--color-orange-brule)]/20 transition-colors">
                      <Phone size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-1">
                        Téléphone
                      </span>
                      <span className="font-sans text-sm text-[var(--color-gris-clair)] group-hover:text-[var(--color-blanc-casse)] transition-colors">
                        {CONTACT.phone}
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-orange-brule)]/10 text-[var(--color-orange-brule)] shrink-0 group-hover:bg-[var(--color-orange-brule)]/20 transition-colors">
                      <Mail size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-1">
                        Email
                      </span>
                      <span className="font-sans text-sm text-[var(--color-gris-clair)] group-hover:text-[var(--color-blanc-casse)] transition-colors">
                        {CONTACT.email}
                      </span>
                    </div>
                  </a>
                </address>
              </div>

              {/* Horaires */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-[var(--color-orange-brule)]" aria-hidden="true" />
                  <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest">
                    Horaires d'ouverture
                  </h3>
                </div>
                <ul className="space-y-3 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg overflow-hidden" aria-label="Horaires d'ouverture">
                  {HORAIRES.map(({ jours, heures, ouvert }) => (
                    <li
                      key={jours}
                      className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] last:border-0"
                    >
                      <span className="font-sans text-sm text-[var(--color-blanc-casse)]">
                        {jours}
                      </span>
                      <span
                        className={`font-heading text-sm font-semibold ${
                          ouvert
                            ? "text-[var(--color-orange-brule)]"
                            : "text-[var(--color-gris-moyen)]"
                        }`}
                      >
                        {heures}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RDV en ligne */}
              <div className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={18} className="text-[var(--color-or-mat)]" aria-hidden="true" />
                  <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest">
                    RDV en ligne
                  </h3>
                </div>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] mb-4 leading-relaxed">
                  Remplis le formulaire ci-contre avec tes disponibilités et le
                  type d'intervention souhaitée. Mael confirme sous 24h.
                </p>
                <a
                  href="#rdv"
                  className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] uppercase tracking-wide transition-colors"
                >
                  Accéder au formulaire →
                </a>
              </div>
            </div>
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
          <h2
            id="map-title"
            className="font-heading text-3xl text-[var(--color-blanc-casse)] uppercase mb-8"
          >
            Nous trouver
          </h2>

          <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] aspect-video max-h-96">
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
          </div>

          <div className="mt-4 flex justify-end">
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] uppercase tracking-wide transition-colors"
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
