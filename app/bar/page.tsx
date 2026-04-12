import type { Metadata } from "next";
import Link from "next/link";
import { Tv, Users, Coffee, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBarSchema, buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Le Bar Mothome — Bikers Bar, MotoGP & Billard à Thonon",
  description:
    "Le Bar Mothome : le QG des motards à Thonon-les-Bains. Billard, PS5, cuisine maison, retransmission MotoGP & WSBK en direct. Ambiance passionnés, bonne bouffe.",
  keywords: [
    "bar moto Thonon",
    "bar bikers Thonon-les-Bains",
    "MotoGP bar Haute-Savoie",
    "bar motards Chablais",
  ],
  alternates: { canonical: "/bar" },
  openGraph: {
    title: "Le Bar Mothome — Bikers Bar, MotoGP & Billard à Thonon",
    description:
      "Le QG des motards à Thonon-les-Bains. Billard, PS5, cuisine maison, MotoGP en direct.",
    url: "/bar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Bar Mothome — Bikers Bar, MotoGP & Billard à Thonon",
    description:
      "Le QG des motards à Thonon-les-Bains. Billard, PS5, cuisine maison, MotoGP en direct.",
  },
};

const AMBIANCES = [
  {
    icon: Tv,
    titre: "MotoGP & WSBK en direct",
    description:
      "Tous les GP retransmis sur grand écran — MotoGP, Superbike, Moto2, Moto3. Venez vibrer avec les autres passionnés autour d'une bière.",
  },
  {
    icon: Users,
    titre: "Billard & PS5",
    description:
      "Table de billard disponible entre deux courses. Défiez vos potes sur MotoGP 24/25 ou Ride 5 sur PS5 — classement maison en permanence.",
  },
  {
    icon: Coffee,
    titre: "Cuisine maison",
    description:
      "Burgers, planches, soupes maison — une cuisine simple, généreuse et faite sur place. Menu change selon les arrivages et l'humeur.",
  },
] as const;

const MENU = [
  {
    categorie: "À grignoter",
    items: [
      { nom: "Planche charcuterie & fromage", prix: "12 €" },
      { nom: "Frites maison", prix: "4 €" },
      { nom: "Rillettes du chef", prix: "6 €" },
    ],
  },
  {
    categorie: "Burgers",
    items: [
      { nom: "Mothome Burger (bœuf, cheddar, sauce maison)", prix: "13 €" },
      { nom: "Burger double (double steak, double cheddar)", prix: "16 €" },
      { nom: "Veggie Burger (steak végétal, avocat, houmous)", prix: "12 €" },
    ],
  },
  {
    categorie: "Boissons",
    items: [
      { nom: "Bières pression (sélection locale)", prix: "3,5 €" },
      { nom: "Soft & jus", prix: "2,5 €" },
      { nom: "Café / expresso", prix: "2 €" },
    ],
  },
] as const;

const EVENEMENTS = [
  {
    type: "Régulier",
    titre: "Soirée GP",
    description:
      "À chaque grand-prix MotoGP, le bar ouvre tôt (ou tard) selon le fuseau horaire. Ambiance garantie, bière fraîche, commentaires passionnés.",
  },
  {
    type: "Mensuel",
    titre: "Rando du mois",
    description:
      "Une rando organisée par Mothome le premier dimanche du mois. Départ du garage, itinéraire varié, pot de retour au bar. Ouvert à tous.",
  },
  {
    type: "Ponctuel",
    titre: "Swap Meet & expos",
    description:
      "Brocante moto, exposition de customs, soirées à thème — programme publié sur Instagram. Les dates sont annoncées 2 semaines à l'avance.",
  },
] as const;

const HORAIRES_BAR = [
  { jours: "Mardi – Vendredi", heures: "17h00 – 23h00" },
  { jours: "Samedi", heures: "12h00 – 00h00" },
  { jours: "Dimanche (GP)", heures: "Selon programme" },
  { jours: "Lundi", heures: "Fermé" },
] as const;

export default function BarPage() {
  return (
    <>
      <JsonLd data={buildBarSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Accueil", url: "https://www.mothome.fr" },
          { name: "Le Bar", url: "https://www.mothome.fr/bar" },
        ])}
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="py-20 md:py-28 bg-[var(--color-noir-mat)] border-b border-[var(--color-border)]"
        aria-labelledby="bar-hero-title"
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
                Le Bar
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-4">
              Garage Mothome · Bar & Communauté
            </p>
            <h1
              id="bar-hero-title"
              className="font-heading text-5xl md:text-7xl text-[var(--color-blanc-casse)] uppercase mb-6 leading-none"
            >
              Le{" "}
              <span className="text-[var(--color-orange-brule)]">Bar</span>
            </h1>
            <p className="font-sans text-lg text-[var(--color-gris-clair)] leading-relaxed max-w-xl">
              Derrière l&apos;atelier, il y a le bar. Le QG des motards du Chablais —
              billard, retransmissions GP, cuisine maison et une bonne ambiance
              garantie pour parler moto entre passionnés.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#programme"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Voir le programme
                <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-orange-brule)] text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                La carte
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          AMBIANCES / CONCEPT
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="concept-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
              Le concept
            </p>
            <h2
              id="concept-title"
              className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase"
            >
              Plus qu&apos;un bar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AMBIANCES.map(({ icon: Icon, titre, description }) => (
              <div
                key={titre}
                className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-orange-brule)]/40 transition-colors"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-md bg-[var(--color-orange-brule)]/10 text-[var(--color-orange-brule)] mb-4">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl text-[var(--color-blanc-casse)] uppercase mb-3">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          MENU
          ================================================================ */}
      <section
        id="menu"
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="menu-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
                À manger & à boire
              </p>
              <h2
                id="menu-title"
                className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase mb-4"
              >
                La carte
              </h2>
              <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                Menu simple, fait maison. Pas de fioriture — de la bonne bouffe
                pour accompagner la soirée. Prix indicatifs, susceptibles d&apos;évoluer.
              </p>
            </div>

            <div className="space-y-8">
              {MENU.map(({ categorie, items }) => (
                <div key={categorie}>
                  <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-3">
                    {categorie}
                  </h3>
                  <ul
                    className="divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-lg overflow-hidden"
                    aria-label={categorie}
                  >
                    {items.map(({ nom, prix }) => (
                      <li
                        key={nom}
                        className="flex items-center justify-between px-5 py-3"
                      >
                        <span className="font-sans text-sm text-[var(--color-gris-clair)]">
                          {nom}
                        </span>
                        <span className="font-heading text-sm font-semibold text-[var(--color-orange-brule)] shrink-0 ml-4">
                          {prix}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROGRAMME & ÉVÉNEMENTS
          ================================================================ */}
      <section
        id="programme"
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="events-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
              Au programme
            </p>
            <h2
              id="events-title"
              className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase"
            >
              Événements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {EVENEMENTS.map(({ type, titre, description }) => (
              <article
                key={titre}
                className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg"
              >
                <span className="inline-block px-2 py-0.5 bg-[var(--color-orange-brule)]/10 rounded text-xs font-heading font-semibold text-[var(--color-orange-brule)] uppercase tracking-wide mb-3">
                  {type}
                </span>
                <h3 className="font-heading text-xl text-[var(--color-blanc-casse)] uppercase mb-2">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="p-5 bg-[var(--color-orange-brule)]/5 border border-[var(--color-orange-brule)]/20 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <p className="font-sans text-sm text-[var(--color-gris-clair)]">
              Programme complet et dates des prochains événements sur Instagram.
            </p>
            <a
              href="https://instagram.com/mothome"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] uppercase tracking-wide transition-colors shrink-0"
            >
              @mothome sur Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          HORAIRES
          ================================================================ */}
      <section className="py-[var(--spacing-section)]" aria-labelledby="horaires-bar-title">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-heading text-sm text-[var(--color-orange-brule)] uppercase tracking-[0.3em] mb-3">
                Quand venir ?
              </p>
              <h2
                id="horaires-bar-title"
                className="font-heading text-4xl text-[var(--color-blanc-casse)] uppercase mb-4"
              >
                Horaires du bar
              </h2>
              <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed mb-6">
                Les horaires peuvent varier lors des soirées GP ou des événements
                spéciaux — vérifiez sur Instagram avant de venir.
              </p>
              <ul
                className="divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-lg overflow-hidden"
                aria-label="Horaires du bar"
              >
                {HORAIRES_BAR.map(({ jours, heures }) => (
                  <li
                    key={jours}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <span className="font-sans text-sm text-[var(--color-blanc-casse)]">
                      {jours}
                    </span>
                    <span className="font-heading text-sm font-semibold text-[var(--color-orange-brule)]">
                      {heures}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg">
                <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-3">
                  Accès
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed">
                  Le bar est dans l&apos;espace attenant à l&apos;atelier. Entrée accessible
                  directement depuis le parking — cherchez la lumière et les motos.
                </p>
              </div>

              <div className="p-6 bg-[var(--color-noir-mat)] border border-[var(--color-border)] rounded-lg">
                <h3 className="font-heading text-sm font-semibold text-[var(--color-or-mat)] uppercase tracking-widest mb-3">
                  Réservation groupe
                </h3>
                <p className="font-sans text-sm text-[var(--color-gris-moyen)] leading-relaxed mb-4">
                  Vous venez en club ou en groupe &gt; 10 personnes ? Contactez-nous
                  à l&apos;avance pour s&apos;assurer d&apos;avoir la place — et parfois une bière
                  offerte à l&apos;arrivée.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[var(--color-orange-brule)] hover:text-[var(--color-orange-vif)] uppercase tracking-wide transition-colors"
                >
                  Contacter le bar →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
