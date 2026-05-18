# Mothome — Site officiel

Site vitrine de **Mot'Home** — garage moto artisanal & bar à Thonon-les-Bains (Haute-Savoie, 74).

🌐 [mothome.fr](https://www.mothome.fr/) · ☎ [04 50 73 38 08](tel:+33450733808) · ✉ contact@mothome.fr

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-black?logo=vercel)](https://vercel.com)

---

## Aperçu

Mot'Home propose un concept unique dans le Chablais : atelier moto, service à domicile, accessoires, dépôt-vente, et un bar où les passionnés se retrouvent. Le site est une vitrine éditoriale racing avec parcours qualifié vers l'appel téléphonique (CTA primaire).

Hero d'accueil : **LiveryStripes** — bandes diagonales bleu livery sur typographie XXL Barlow Condensed. Composition pro, mobile-first, conforme WCAG 2.1 AA.

## Stack

| Couche | Tech |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, TypeScript 5, Tailwind CSS v4 (CSS-first via `@theme`) |
| Forms | Zod (validation) + Resend (email) |
| Data | Google Places API (avis + KPI dynamiques) |
| Anim | CSS keyframes + Framer-less (GSAP/Three.js installés pour usages avancés) |
| Tests | Vitest + Testing Library (unit), Playwright + axe-core (E2E + a11y) |
| Hosting | Vercel (Analytics + Speed Insights branchés) |
| Qualité | Husky + lint-staged + commitlint (conventional commits) |
| AI-assist | [gstack](https://github.com/garrytan/gstack) (workflows /office-hours, /plan-design-review, /plan-eng-review, /ship, /qa, /investigate) |

## Design system

Direction artistique : **"La Livery"** — racing minimaliste, bleu unique chromatiquement souverain, typographie condensée.

Spec complète : [DESIGN.md](./DESIGN.md)

Tokens principaux (dans `app/globals.css` via `@theme`) :

| Token | Valeur | Rôle |
|---|---|---|
| `--color-bleu-livery` | `#0050a0` | Seule couleur saturée — règle "Le Bleu Porte Tout" |
| `--color-bleu-rapide` | `#1060b0` | État hover bleu livery |
| `--color-chassis-noir` | `#0a0a0a` | Fond global dark mode (future, non activé) |
| `--color-piste-claire` | `#f8f7f5` | Fond global light mode (actuel) |
| `--color-blanc-sec` | `#f5f0e8` | Texte sur fonds sombres (jamais `#fff` pur) |
| `--font-heading` | Barlow Condensed | Display & titres (UPPERCASE) |
| `--font-accent` | Bebas Neue | Labels & eyebrows (UPPERCASE, letter-spacing 0.12em) |
| `--font-sans` | Inter | Corps de texte (casse normale) |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Easing racing standard |

Règles clés (voir DESIGN.md pour le détail) :

- **Flat by default** — pas de shadow au repos, profondeur par layering tonal
- **Pas de gradient text** — emphase par poids de graisse (700-800)
- **Glow `--shadow-bleu`** réservé aux états (scroll, focus, hover), jamais décoratif
- **Motion <500ms** — racing direct, cut sec, pas de bounce
- **`prefers-reduced-motion`** respecté partout

## Pages livrées

| Route | Description |
|---|---|
| `/` | Homepage — Hero LiveryStripes + bento services + KPI Google + Reviews + CTA |
| `/atelier` | Service atelier (entretien, révision, réparation, customisation) |
| `/service-domicile` | Service à domicile sur Thonon et alentours |
| `/accessoires` | Vente accessoires moto |
| `/depot-vente` | Dépôt-vente motos d'occasion |
| `/bar` | Bar des passionnés (concept signature) |
| `/a-propos` | Présentation équipe & atelier |
| `/contact` | Formulaire (Zod + Resend) + RDV + infos pratiques |
| `/mentions-legales` `/politique-confidentialite` | Pages légales |

Composants signature :

- `components/motion/LiveryStripes.tsx` — Fond hero, 5 stripes diagonales SVG (2 mobile)
- `components/google-reviews/GoogleReviews.tsx` — 3 cards + badge note moyenne + lien Maps
- `components/ui/phone-cta.tsx` — Sticky phone CTA (mobile, scroll-aware)
- `components/seo/*` — Schemas JSON-LD, sitemap, robots

## Workflow Git

**Branche de développement active : `dev`.** `main` est la branche de production (auto-deploy Vercel sur mothome.fr).

```
feat/<slug> ──merge──▶ dev ──release──▶ main ──auto-deploy──▶ mothome.fr
```

Règles dures (voir [CLAUDE.md](./CLAUDE.md)) :

- Jamais de commit direct sur `dev` ni `main`. Toujours créer une feature branch : `feat/<slug>`, `fix/<slug>`, `chore/<slug>`.
- Toute PR de feature cible `dev` : `gh pr create --base dev`.
- Releases en prod : PR `dev` → `main` quand un lot de features est prêt à être déployé publiquement.
- Intégration via **Rebase and merge** uniquement (historique linéaire).
- Commits : [Conventional Commits](https://www.conventionalcommits.org/) (vérifié par commitlint).

## Setup

### Prérequis

- Node.js 20 LTS+
- npm 10+

### Installation

```bash
git clone git@github.com:Kaynshin/mothome.git
cd mothome
npm install
```

### Variables d'environnement

Créer `.env.local` à la racine :

```env
# Google Places API (avis + KPIs live)
GOOGLE_PLACES_API_KEY=your_places_api_key
GOOGLE_PLACE_ID=your_place_id

# Resend (formulaire contact)
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL_FROM=noreply@mothome.fr
CONTACT_EMAIL_TO=contact@mothome.fr
```

En cas d'absence : fallback automatique (reviews codés en dur, KPI statique).

## Développement

```bash
npm run dev               # http://localhost:3000 (Turbopack)
npm run type-check        # tsc --noEmit
npm run lint              # ESLint
npm run lint:fix          # ESLint + autofix
npm run format            # Prettier write
npm run format:check      # Prettier check
```

## Tests

Couverture cible **≥ 80%** (lines, functions, branches, statements).

```bash
# Unit (Vitest + Testing Library)
npm run test
npm run test:ui              # interface interactive
npm run test -- --coverage   # rapport coverage

# E2E (Playwright + axe-core WCAG 2.1 AA)
npm run test:e2e
npx playwright test --project=chromium       # un seul browser
npx playwright test hero-livery.spec.ts      # un seul fichier
npx playwright install                       # installer browsers (~150 MB, première fois)
```

Suites E2E disponibles : `homepage`, `navigation`, `contact-form`, `404`, `error`, `accessibility`, `theme-and-contrast`, `performance`, `sticky-phone-cta`, `hero-livery`.

## Build production

```bash
npm run build
npm run start             # localhost:3000
```

⚠️ Ne jamais lancer `npm run build` pendant qu'un `npm run dev` tourne — le dossier `.next` peut se corrompre.

## Checklist qualité (avant merge)

- ✅ `npm run test` — tests passent
- ✅ `npm run test:e2e` — suite E2E green (au minimum sur Chromium)
- ✅ `npm run lint` — 0 error
- ✅ `npm run format:check` — propre
- ✅ `npm run type-check` — 0 error TS
- ✅ Coverage ≥ 80% (composants critiques)
- ✅ WCAG 2.1 AA (axe-core scan, 0 violation)
- ✅ Responsive : mobile 375 / tablet 768 / desktop 1280+
- ✅ Lighthouse ≥ 90 (perf, a11y, SEO, best-practices)
- ✅ Pour features signifiantes : pipeline gstack (`/plan-design-review` + `/plan-eng-review`)

Voir [docs/testing-standards.md](./docs/testing-standards.md) pour les directives détaillées.

## Déploiement

| Env | Branche | URL |
|---|---|---|
| Production | `main` | https://www.mothome.fr (auto-deploy Vercel) |
| Staging | `dev` | URL preview Vercel automatique sur chaque push |
| Feature previews | `*` | URL preview Vercel sur chaque PR |

## Documentation

- [DESIGN.md](./DESIGN.md) — Design system complet
- [CLAUDE.md](./CLAUDE.md) — Instructions IA-assisted (gstack)
- [docs/](./docs/) — Documentation projet (architecture, SEO, tests, plan d'exécution)

---

**Client :** Mot'Home — Thonon-les-Bains (74200)  
**Repo :** https://github.com/Kaynshin/mothome  
**License :** Privé
