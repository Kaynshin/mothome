import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Heart, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "À Propos — Maël & Mothome, le garage moto de Thonon",
  description:
    "L'histoire de Mothome : Maël, mécanicien passionné installé à Thonon-les-Bains. Un atelier artisanal, un bar pour les riders, et une vision : la moto sans compromis.",
  keywords: [
    "mécanicien moto Thonon",
    "garage artisanal moto Haute-Savoie",
    "histoire Mothome",
    "Maël mécanicien Chablais",
  ],
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À Propos — Maël & Mothome, le garage moto de Thonon",
    description:
      "L'histoire de Mothome : Maël, mécanicien passionné installé à Thonon-les-Bains. Atelier artisanal et bar pour les riders.",
    url: "/a-propos",
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos — Maël & Mothome, le garage moto de Thonon",
    description:
      "L'histoire de Mothome : Maël, mécanicien passionné installé à Thonon-les-Bains.",
  },
};

const VALEURS = [
  {
    icon: Wrench,
    titre: "L'artisanat avant tout",
    description:
      "Chaque moto est traitée comme si c'était la sienne. Pas de travail bâclé, pas de pièce montée de travers — Maël prend le temps qu'il faut.",
  },
  {
    icon: Heart,
    titre: "La passion, pas le commerce",
    description:
      "Mothome n'est pas une franchise. C'est un projet de vie, construit autour de la moto et des gens qui l'aiment vraiment.",
  },
  {
    icon: Wrench,
    titre: "Transparence & honnêteté",
    description:
      "Les devis sont clairs, les explications franches. Si quelque chose peut attendre, Maël le dit. Il ne vend pas ce dont vous n'avez pas besoin.",
  },
] as const;

const TIMELINE = [
  {
    annee: "2010",
    titre: "Les premières motos",
    description:
      "Maël commence à démonter et remonter des motos dans le garage familial à 16 ans. Premier carbu nettoyé, première vidange, premières brûlures.",
  },
  {
    annee: "2014",
    titre: "CAP Mécanique Moto",
    description:
      "Formation en alternance, 3 ans de garage, toutes marques. Du 50cc au 1200 — Maël apprend la rigueur et les bons réflexes.",
  },
  {
    annee: "2018",
    titre: "Expérience compétition",
    description:
      "Participation au support technique d'une équipe régionale de circuit. Comprendre la moto sous contrainte, travailler vite et bien.",
  },
  {
    annee: "2022",
    titre: "Mothome ouvre ses portes",
    description:
      "Installation à Thonon-les-Bains. L'atelier d'abord, le bar quelques mois après. Un lieu pensé pour les passionnés, par un passionné.",
  },
  {
    annee: "2023",
    titre: "Service à domicile & eFlexMoto",
    description:
      "Extension avec le service à domicile dans le Chablais et la certification eFlexMoto pour les kits éthanol. L'offre se complète.",
  },
] as const;

const EQUIPE = [
  {
    nom: "Maël",
    role: "Fondateur & mécanicien",
    description:
      "La tête et les mains de Mothome. Maël gère l'atelier, les déplacements, les devis et le bar. Passionné de Superbike et de trails alpins.",
    marques: ["Honda", "KTM", "Ducati"],
  },
] as const;

function buildAProposSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos — Mothome",
    url: "https://www.mothome.fr/a-propos",
    description:
      "L'histoire de Mothome : Maël, mécanicien passionné installé à Thonon-les-Bains.",
    mainEntity: { "@id": "https://www.mothome.fr/#organization" },
  };
}

export default function AProposPage() {
  return (
    <>
      <JsonLd data={buildAProposSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Accueil", url: "https://www.mothome.fr" },
          { name: "À propos", url: "https://www.mothome.fr/a-propos" },
        ])}
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="py-20 md:py-28 bg-[var(--color-card)] border-b border-[var(--color-border)]"
        aria-labelledby="apropos-hero-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--color-muted-foreground)]" aria-current="page">
                À propos
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-4">
              Garage Mothome · Thonon-les-Bains
            </p>
            <h1
              id="apropos-hero-title"
              className="font-heading text-5xl md:text-7xl text-[var(--color-foreground)] uppercase mb-6 leading-none"
            >
              À{" "}
              <span className="text-[var(--color-bleu-logo)]">propos</span>
            </h1>
            <p className="font-sans text-lg text-[var(--color-muted-foreground)] leading-relaxed max-w-xl">
              Mothome, c&apos;est l&apos;histoire d&apos;un mécanicien passionné qui a décidé
              de créer le garage qu&apos;il aurait voulu trouver quand il cherchait
              quelqu&apos;un à qui confier sa moto.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          HISTOIRE DE MAËL
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="histoire-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
                L&apos;histoire
              </p>
              <h2
                id="histoire-title"
                className="font-heading text-4xl text-[var(--color-foreground)] uppercase mb-6"
              >
                Maël &
                <br />
                <span className="text-[var(--color-bleu-logo)]">Mothome</span>
              </h2>
              <div className="space-y-4 font-sans text-[var(--color-muted-foreground)] leading-relaxed">
                <p>
                  Tout a commencé dans un garage de campagne, avec une moto qui ne
                  démarrait plus et un gamin de 16 ans décidé à comprendre pourquoi.
                  Maël a démonté, lu, raté, recommencé — et finalement, ça a démarré.
                </p>
                <p>
                  Après une formation en alternance et quelques années passées dans
                  différents garages de la région, dont une expérience en compétition,
                  Maël décide de s&apos;installer à son compte à Thonon-les-Bains en 2022.
                </p>
                <p>
                  L&apos;idée ? Un atelier artisanal où chaque client peut parler directement
                  au mécanicien. Pas d&apos;intermédiaire, pas de devis gonflé, pas de
                  pièces inutiles. Juste du bon travail, à un prix honnête.
                </p>
                <p>
                  Le bar est arrivé naturellement — parce que les clients restaient
                  pour parler, parce que les copains passaient regarder bosser, et
                  parce que les GP du dimanche méritaient un endroit pour les voir
                  ensemble.
                </p>
              </div>
            </div>

            {/* Équipe */}
            <div className="space-y-6">
              {EQUIPE.map(({ nom, role, description, marques }) => (
                <div
                  key={nom}
                  className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg"
                >
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 rounded-full bg-[var(--color-bleu-logo)]/15 flex items-center justify-center mb-4">
                    <span className="font-heading text-2xl text-[var(--color-bleu-logo)] uppercase">
                      {nom.charAt(0)}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl text-[var(--color-foreground)] uppercase mb-1">
                    {nom}
                  </h3>
                  <p className="font-sans text-xs text-[var(--color-bleu-logo)] uppercase tracking-widest mb-3">
                    {role}
                  </p>
                  <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                    {description}
                  </p>

                  <div>
                    <p className="font-sans text-xs text-[var(--color-muted-foreground)] mb-2">
                      Marques de cœur :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {marques.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 bg-[var(--color-bleu-logo)]/10 rounded text-xs font-heading font-semibold text-[var(--color-bleu-logo)] uppercase tracking-wide"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-5 bg-[var(--color-bleu-logo)]/5 border border-[var(--color-bleu-logo)]/20 rounded-lg">
                <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  Mothome grandit. Si tu es mécanicien passionné et que le projet
                  te parle, contacte Maël directement.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-heading font-semibold text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
                >
                  Rejoindre l&apos;aventure →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TIMELINE
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="timeline-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Le parcours
            </p>
            <h2
              id="timeline-title"
              className="font-heading text-4xl text-[var(--color-foreground)] uppercase"
            >
              La route jusqu&apos;ici
            </h2>
          </div>

          <ol className="relative border-l border-[var(--color-border)] space-y-10 pl-8 ml-4">
            {TIMELINE.map(({ annee, titre, description }) => (
              <li key={annee} className="relative">
                <div className="absolute -left-[2.15rem] top-1 w-4 h-4 rounded-full bg-[var(--color-card)] border-2 border-[var(--color-bleu-logo)]" aria-hidden="true" />
                <span className="block font-heading text-xs text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-1">
                  {annee}
                </span>
                <h3 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-2">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed max-w-xl">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================
          VALEURS
          ================================================================ */}
      <section
        className="py-[var(--spacing-section)] border-b border-[var(--color-border)]"
        aria-labelledby="valeurs-title"
      >
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="mb-12">
            <p className="font-heading text-sm text-[var(--color-bleu-logo)] uppercase tracking-[0.3em] mb-3">
              Ce qui guide le travail
            </p>
            <h2
              id="valeurs-title"
              className="font-heading text-4xl text-[var(--color-foreground)] uppercase"
            >
              Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALEURS.map(({ icon: Icon, titre, description }) => (
              <div
                key={titre}
                className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-bleu-logo)]/10 text-[var(--color-bleu-logo)] mb-4">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg text-[var(--color-foreground)] uppercase mb-2">
                  {titre}
                </h3>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA FINAL
          ================================================================ */}
      <section className="py-[var(--spacing-section)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-container)]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-foreground)] uppercase mb-4">
              Venez nous{" "}
              <span className="text-[var(--color-bleu-logo)]">rendre visite</span>
            </h2>
            <p className="font-sans text-[var(--color-muted-foreground)] mb-8 leading-relaxed">
              L&apos;atelier est ouvert du lundi au samedi. Passez sans rendez-vous pour
              poser une question, voir le lieu ou juste boire un café avec Maël.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] text-[var(--color-primary-foreground)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Prendre contact
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/atelier"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-bleu-logo)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors"
              >
                Voir l&apos;atelier
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
