# Mothome — Redesign du site

Refonte du site [mothome.fr](https://www.mothome.fr/) — Garage moto + bar, Thonon-les-Bains (74).

Stack: **Next.js 15 + Tailwind CSS 4 + TypeScript**

## Documentation

- 📖 [Vue d'ensemble du projet](./docs/README.md)
- 🎨 [Direction artistique](./docs/direction-artistique.md)
- 🏗️ [Architecture des pages](./docs/architecture-pages.md)
- 🔧 [Stack technique](./docs/stack-technique.md)
- 🔍 [Stratégie SEO](./docs/seo-strategy.md)
- 📅 [Plan d'exécution](./docs/plan-execution.md)
- ✅ [Standards de test](./docs/testing-standards.md)

## Setup

### Stack initialisée ✅

| Composant | Version | Statut |
|---|---|---|
| Next.js (App Router) | 15.x | ✅ |
| React | 19.x | ✅ |
| TypeScript (strict) | 5.x | ✅ |
| Tailwind CSS | v4.x | ✅ |
| shadcn/ui | latest | ✅ |
| Vitest | 3.x | ✅ |

### Design tokens (Tailwind v4 CSS-first)

Définis dans `app/globals.css` via `@theme` :

| Token | Valeur |
|---|---|
| `--color-orange-brule` | `#c84b11` (accent principal) |
| `--color-noir-profond` | `#0a0a0a` (fond) |
| `--color-or-mat` | `#b8943a` (accents secondaires) |
| `--color-bleu-logo` | `#0050a0` (bleu extrait du logo Mot'Home) |
| `--color-bleu-vif` | `#1060b0` (variante plus lumineuse) |
| `--color-bleu-clair` | `#2070b0` (variante claire) |
| `--font-heading` | Barlow Condensed |
| `--font-sans` | Inter |
| `--font-accent` | Bebas Neue |

### Structure des dossiers

```
app/          # Routes Next.js (App Router)
components/   # Composants React
  ui/         # Composants shadcn/ui
lib/          # Utilitaires (cn, etc.)
public/       # Assets statiques
docs/         # Documentation projet
```

## Dev

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

### Tests

```bash
# Unit tests (Vitest)
npm run test

# Watch mode
npm run test -- --watch

# UI interactif
npm run test:ui

# Coverage
npm run test -- --coverage

# E2E tests (Playwright)
npm run test:e2e
```

### Lint & Format

```bash
npm run lint          # Check
npm run lint:fix      # Fix
npm run format        # Format all files
npm run format:check  # Check formatting
npm run type-check    # TypeScript check
```

### Build

```bash
npm run build
npm run start  # Start production server
```

## Checklist de qualité

Avant chaque merge sur `main`:

- ✅ Tests passent (`npm run test`)
- ✅ Aucun lint error (`npm run lint`)
- ✅ Format OK (`npm run format:check`)
- ✅ TypeScript OK (`npm run type-check`)
- ✅ Composants testés (80% min coverage)
- ✅ Accessible (WCAG AA)
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Lighthouse > 90

Voir [Standards de test](./docs/testing-standards.md) pour les directives détaillées.

## Déploiement

Hebergement: **Vercel**

Auto-deploy depuis la branche `main`.

---

**Agence:** Unicorn Agency  
**Client:** Mothome  
**Repo:** https://github.com/Kaynshin/mothome
