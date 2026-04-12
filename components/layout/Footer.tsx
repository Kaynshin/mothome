import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { NAV_LINKS, CTA } from "./nav-config";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const CONTACT = {
  address: "Thonon-les-Bains, Haute-Savoie (74200)",
  phone: "+33 4 50 00 00 00",
  email: "contact@mothome.fr",
} as const;

const HORAIRES = [
  { jours: "Lundi – Vendredi", heures: "8h00 – 18h00" },
  { jours: "Samedi", heures: "9h00 – 16h00" },
  { jours: "Dimanche", heures: "Fermé" },
] as const;

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/mothome",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/mothome",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@mothome",
    Icon: YoutubeIcon,
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-noir-mat)] border-t border-[var(--color-border)] mt-auto"
      role="contentinfo"
      aria-label="Pied de page"
    >
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-[var(--spacing-container)] py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label="Mothome — Accueil"
              className="inline-block mb-4"
            >
              <Image
                src="/mothome-logo.png"
                alt="Mot'Home"
                width={180}
                height={50}
                className="h-11 w-auto"
              />
            </Link>
            <p className="text-sm text-[var(--color-gris-moyen)] leading-relaxed mb-6">
              Votre garage moto premium. Préparation, entretien et customisation
              sur mesure par des passionnés.
            </p>
            {/* Social */}
            <div className="flex gap-3" aria-label="Réseaux sociaux">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-md text-[var(--color-gris-moyen)] hover:text-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-logo)]/10 transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation secondaire">
            <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-gris-moyen)] hover:text-[var(--color-blanc-casse)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Horaires */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-4">
              Horaires
            </h3>
            <ul className="space-y-3" aria-label="Horaires d'ouverture">
              {HORAIRES.map(({ jours, heures }) => (
                <li key={jours} className="flex items-start gap-2">
                  <Clock
                    size={14}
                    className="text-[var(--color-bleu-logo)] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="text-sm text-[var(--color-blanc-casse)] block">
                      {jours}
                    </span>
                    <span className="text-xs text-[var(--color-gris-moyen)]">
                      {heures}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-[var(--color-gris-moyen)] hover:text-[var(--color-blanc-casse)] transition-colors duration-200"
              >
                <MapPin
                  size={14}
                  className="text-[var(--color-bleu-logo)] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                {CONTACT.address}
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-[var(--color-gris-moyen)] hover:text-[var(--color-blanc-casse)] transition-colors duration-200"
              >
                <Phone
                  size={14}
                  className="text-[var(--color-bleu-logo)] shrink-0"
                  aria-hidden="true"
                />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sm text-[var(--color-gris-moyen)] hover:text-[var(--color-blanc-casse)] transition-colors duration-200"
              >
                <Mail
                  size={14}
                  className="text-[var(--color-bleu-logo)] shrink-0"
                  aria-hidden="true"
                />
                {CONTACT.email}
              </a>
            </address>

            {/* CTA RDV */}
            <Link
              href={CTA.href}
              className="inline-flex mt-6 items-center gap-2 px-5 py-2.5 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
            >
              {CTA.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)] py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-gris-moyen)]">
            © {currentYear} Mothome. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link
              href="/mentions-legales"
              className="text-xs text-[var(--color-gris-moyen)] hover:text-[var(--color-blanc-casse)] transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-xs text-[var(--color-gris-moyen)] hover:text-[var(--color-blanc-casse)] transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
