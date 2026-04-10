# Standards de test — Mothome

## Vue d'ensemble

Tous les composants critiques doivent avoir une couverture de tests **minimum 80%** (lignes, fonctions, branches, déclarations).

Tests automatisés = **Vitest + React Testing Library**
Tests E2E = **Playwright**

---

## Composants critiques

Priorité 1 (MVP — Phase 1):

- `Button` — tous les CTA du site
- `ContactForm` — formulaire contact + devis
- `BookingForm` — formulaire de réservation RDV
- `Navigation` — menu principal, accessibilité
- `Hero` — section hero avec parallax (Phase 2)

Priorité 2 (Phase 2+):

- `ProductCard` — affichage motos dépôt-vente
- `ServiceCard` — affichage services
- `HeroParallax` — intégration Three.js
- `Modal` — modales (RDV, photos, etc.)

---

## Directives de test

### 1. Structure des tests

```
app/
  components/
    Button.tsx
    __tests__/
      Button.test.tsx
      Button.integration.test.tsx  (optionnel, tests croisés)
```

### 2. Template minimal

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Component from "../Component";

describe("Component", () => {
  it("renders", () => {
    render(<Component />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### 3. Ce que tester

- **Rendu** : Le composant s'affiche avec les props attendues
- **Interactions** : Clics, inputs, soumissions
- **États** : Loading, erreur, succès, disabled
- **Accessibilité** : Labels, ARIA, navigation clavier
- **Edge cases** : Données manquantes, longs textes, etc.

### 4. Ce que NE PAS tester

- ❌ Détails d'implémentation (useState, useEffect)
- ❌ Styles CSS (sauf classes critiques pour accessibilité)
- ❌ Appels API directs (mocker avec `vi.mock()`)
- ❌ Logique Next.js (routing, images) — déjà testée par Next.js

### 5. Assertions courantes

```typescript
// Affichage
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveTextContent('text')

// Interaction
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith(arg)

// Attributs
expect(button).toBeDisabled()
expect(input).toHaveValue('value')
expect(element).toHaveClass('className')

// Accessibilité
expect(label).toHaveAttribute('for', 'inputId')
expect(element).toHaveAttribute('aria-label')
```

---

## Commandes

```bash
# Run tous les tests
npm run test

# Watch mode
npm run test -- --watch

# UI interactif
npm run test:ui

# Coverage report
npm run test -- --coverage
```

---

## Checklist avant merge

- ✅ Tests écrits pour les nouvelles fonctionnalités
- ✅ Tests passent (`npm run test`)
- ✅ Coverage ≥ 80% sur les fichiers modifiés
- ✅ Pas de `skip()` ou `only()` dans les tests
- ✅ Accessibilité testée (`getByRole`, `getByLabelText`)
- ✅ Erreurs et edge cases couverts

---

## Ressources

- [React Testing Library](https://testing-library.com/react)
- [Vitest](https://vitest.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
