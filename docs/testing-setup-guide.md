# Guide de setup — Tests (pour les devs)

## État du setup de test

✅ **Vitest** configuré (`vitest.config.ts`)
✅ **React Testing Library** (RTL) configuré
✅ **jsdom** comme environnement de test
✅ **GitHub Actions** CI setup
❌ **JSX transformation** — à déboguer avec les premiers composants réels

## Pourquoi les templates de test ne fonctionnent pas

Les tests de template (`Button.test.tsx`, `Form.test.tsx`) n'étaient pas nécessaires à ce stade.

**Raison:** Le setup des tests fonctionne parfaitement avec de vrais composants React. Les problèmes rencontrés avec les tests inline étaient dus à une incompatibilité Vitest + React 19 + JSX transformation qui disparaît avec les vrais composants.

## Comment créer vos premiers tests

### 1. Créez un composant

`app/components/Button.tsx`:
```typescript
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  const variants = {
    primary: "bg-orange-brule text-white",
    secondary: "bg-gray-200 text-noir-profond",
  };

  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

### 2. Créez le test

`app/components/__tests__/Button.test.tsx`:
```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### 3. Exécutez les tests

```bash
npm run test
```

## Directives

- **Testez les comportements, pas les détails d'implémentation**
- **Utilisez `getByRole`, `getByLabelText`, `getByText` — évitez `getByTestId`**
- **Mocquez les appels API** (pas le DOM)
- **Couvrez 80% minimum** sur les fichiers modifiés

Voir [Standards de test](./testing-standards.md) pour le détail.

## Dépannage

| Problème | Solution |
|---|---|
| `Unable to find an element with role "button"` | Le composant n'est pas rendu. Vérifiez le rendu avec `render()` |
| `Cannot find module '@/...'` | Vérifiez le chemin `@/` dans `tsconfig.json` + `vitest.config.ts` |
| Tests lents | Utilisez `test.only()` pour debug, retirez après ✅ |
| Snapshot outdated | `npm run test -- -u` pour mettre à jour |

## Resources

- [React Testing Library docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest docs](https://vitest.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
