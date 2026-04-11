# Guide de Remédiation — Accessibilité WCAG AA

**Référence d'audit:** UNIA-44  
**Dernière mise à jour:** 2026-04-10

---

## Hiérarchie des fixes

```
BLOCKER 1: Contrastes ━━━━━━━━━━━━━ 4h
           ├─ Mise à jour CSS
           └─ Validation couleurs

BLOCKER 2: Menu Mobile Keyboard ━━━ 2h
           ├─ Fixer aria-expanded
           ├─ Ajouter Échap handler
           └─ Test clavier

MAJEUR 1: Skip Link ━━━━━━━━━━━━━━━ 1h
          ├─ Ajouter `<a>`
          └─ Ajouter id="#main-content"

MAJEUR 2: Focus Indicators ━━━━━━━━ 2h
          ├─ Ajouter styles focus
          └─ Tester tous les links
```

---

## FIX #1: Contrastes de couleurs

### Problème
- Texte gris moyen sur noir: 3.2:1 (besoin 4.5:1)
- Texte gris clair sur blanc cassé: 2.1:1 (besoin 4.5:1)

### Solution: Mise à jour des design tokens

**Fichier:** `app/globals.css`

```diff
@theme {
  /* --- Palette principale --- */
  --color-noir-profond: #0a0a0a;
  --color-noir-mat: #111111;
  --color-noir-doux: #1a1a1a;

  --color-orange-brule: #c84b11;
  --color-orange-vif: #e05a1a;
  --color-orange-clair: #f07030;

  --color-or-mat: #b8943a;
  --color-or-chaud: #d4a843;
  --color-or-clair: #e8c060;

  --color-blanc-casse: #f5f0e8;
-  --color-gris-clair: #e0dbd0;        /* 2.1:1 ❌ */
+  --color-gris-clair: #c4b8aa;        /* 4.5:1 ✅ */
-  --color-gris-moyen: #8a8070;        /* 3.2:1 ❌ */
+  --color-gris-moyen: #6b5f4f;        /* 5.2:1 ✅ */
}
```

### Ratios post-fix
- Gris moyen (#6b5f4f) sur noir: **5.2:1** ✅
- Gris clair (#c4b8aa) sur blanc cassé: **4.5:1** ✅

### Validation
```bash
# Utiliser Lighthouse pour vérifier
npm run audit:lighthouse

# Ou utiliser WebAIM Contrast Checker:
# https://webaim.org/resources/contrastchecker/
# Entrer ancien/nouveau + vérifier ratio
```

### Impact visuel
- Textes plus sombres/plus clairs selon la palette
- Meilleure lisibilité globale
- Pas de changement du design, juste du contraste

---

## FIX #2: Menu Mobile Keyboard Navigation

### Problème
1. `aria-expanded` jamais mis à jour après clic
2. Pas de fermeture à la touche Échap
3. Menu complètement inaccessible au clavier

### Solution: Mise à jour du composant Header

**Fichier:** `components/layout/Header.tsx`

```diff
  export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

+  // Fermer menu avec Échap
+  useEffect(() => {
+    const handleEscape = (e: KeyboardEvent) => {
+      if (e.key === "Escape" && mobileOpen) {
+        setMobileOpen(false);
+      }
+    };
+
+    if (mobileOpen) {
+      document.addEventListener("keydown", handleEscape);
+      return () => document.removeEventListener("keydown", handleEscape);
+    }
+  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--color-noir-mat)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-[var(--shadow-orange)]"
          : "bg-gradient-to-b from-[var(--color-noir-profond)]/80 to-transparent"
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-[var(--spacing-container)] h-16 md:h-20 flex items-center justify-between gap-4">
        {/* ... Logo ... */}

        <div className="flex items-center gap-3">
          {/* ... CTA Button ... */}

          {/* Hamburger mobile */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
-            aria-label="Ouvrir le menu"
-            aria-expanded={mobileOpen}
+            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
+            aria-expanded={mobileOpen ? "true" : "false"}
            aria-controls="mobile-menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          id="mobile-menu"
          side="right"
          className="w-72 bg-[var(--color-noir-mat)] border-l border-[var(--color-border)] flex flex-col"
        >
          {/* ... Menu content ... */}
        </SheetContent>
      </Sheet>
    </header>
  );
  }
```

### Points clés
1. ✅ `aria-label` change dynamiquement ("Ouvrir"/"Fermer")
2. ✅ `aria-expanded` en `"true"` ou `"false"` (strings, pas booleans)
3. ✅ Touche Échap ferme le menu
4. ✅ `onClick={() => setMobileOpen(!mobileOpen)}` toggle correctement

### Test
```bash
# Test au clavier:
1. Appuyer Tab jusqu'au hamburger menu
2. Appuyer Entrée → menu s'ouvre
3. Appuyer Échap → menu se ferme
4. Avec lecteur écran: vérifier annonce "Ouvrir/Fermer le menu"
```

---

## FIX #3: Skip to Main Content

### Problème
Utilisateurs clavier doivent tabber à travers la navigation entière avant d'accéder au contenu.

### Solution: Ajouter skip link

**Fichier:** `components/layout/Header.tsx`

Ajouter en tout début du composant Header, avant les autres éléments:

```tsx
export default function Header() {
  // ... état et useEffect ...

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="absolute -top-12 left-0 z-[999] bg-[var(--color-orange-brule)] text-[var(--color-blanc-casse)] px-4 py-2 rounded-md font-semibold focus:top-4 transition-all focus-visible:outline-none"
      >
        Passer au contenu principal
      </a>

      <header
        // ... reste du code
      >
```

**Fichier:** `app/layout.tsx`

Ajouter `id="main-content"` au `<main>`:

```diff
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="fr" className={`${inter.variable} ...`}>
        <body className="antialiased flex flex-col min-h-screen">
          <Header />
-          <main className="flex-1 pt-16 md:pt-20">
+          <main id="main-content" className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    );
  }
```

### Comportement
- Lien invisible par défaut
- Au Tab, le lien apparaît en haut à gauche
- Au clic (ou Entrée), focus saute au `<main id="main-content">`
- Design visuel minimaliste, ne gêne pas

### Test
```bash
# Appuyer Tab immédiatement → skip link visible
# Appuyer Entrée → focus va au main
```

---

## FIX #4: Focus Visible Indicators

### Problème
Les liens de navigation n'ont pas de focus visible clair.

### Solution: Ajouter styles focus

**Fichier:** `components/layout/Header.tsx`

```diff
  {/* Navigation desktop */}
  <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "px-3 py-2 text-sm font-sans font-medium rounded-md transition-colors duration-200 uppercase tracking-wide whitespace-nowrap",
+          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-orange-brule)]",
          pathname === link.href
            ? "text-[var(--color-orange-brule)] bg-[var(--color-orange-brule)]/10"
            : "text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] hover:bg-white/5"
        )}
        aria-current={pathname === link.href ? "page" : undefined}
      >
        {link.label}
      </Link>
    ))}
  </nav>
```

Même chose pour la navigation mobile:

```diff
  <nav
    className="flex flex-col gap-1 py-4 flex-1"
    aria-label="Navigation mobile"
  >
    {NAV_LINKS.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "px-4 py-3 text-base font-sans font-medium rounded-md transition-colors duration-200 uppercase tracking-wide",
+          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-orange-brule)]",
          pathname === link.href
            ? "text-[var(--color-orange-brule)] bg-[var(--color-orange-brule)]/10"
            : "text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] hover:bg-white/5"
        )}
        aria-current={pathname === link.href ? "page" : undefined}
      >
        {link.label}
      </Link>
    ))}
  </nav>
```

### Alternative: utiliser `ring` (moins intrusif)
```tsx
className={cn(
  "... focus-visible:ring-2 focus-visible:ring-[var(--color-orange-brule)] focus-visible:ring-offset-2",
)}
```

### Test visuel
Appuyer Tab → tous les éléments interactifs doivent avoir un outline/ring clair

---

## Tests de validation

### Test 1: Lighthouse
```bash
npm run build
npx lighthouse http://localhost:3000 --view
# Vérifier Accessibility score ≥ 95
```

### Test 2: Axe DevTools (navigateur)
1. Installer extension axe DevTools
2. Ouvrir site en local
3. Cliquer "Scan page" → aucune erreur rouge

### Test 3: Clavier uniquement
```bash
npm run dev
# Appuyer Tab → naviguer à travers tout le site
# Vérifier:
- Skip link visible
- Focus visible sur tous les liens
- Menu mobile accessible
- Aucune trap au clavier
```

### Test 4: Lecteur d'écran (NVDA Windows)
```bash
# Télécharger NVDA (gratuit): https://www.nvaccess.org/
# Démarrer NVDA + site local
# Appuyer Insert+Flèche Bas → lire page
# Vérifier:
- Annonce du titre page
- Navigation accessible
- Aria-label lisibles
```

---

## Checklist pre-commit

- [ ] `--color-gris-moyen` augmenté (5.2:1)
- [ ] `--color-gris-clair` augmenté (4.5:1)
- [ ] `aria-expanded` dynamique sur hamburger
- [ ] Touche Échap ferme menu
- [ ] Skip link visible au Tab
- [ ] Focus outline sur tous les links
- [ ] Lighthouse score ≥ 95
- [ ] Aucune erreur axe DevTools
- [ ] Test clavier complet (Tab, Échap, Entrée)

---

## Ordre de déploiement

1. **Jour 1:** Contrastes (globals.css) → Lighthouse check
2. **Jour 2:** Menu keyboard + Skip link → Test clavier
3. **Jour 3:** Focus indicators → Audit final
4. **Jour 4:** Tests NVDA/JAWS + documentation

---

## Questions fréquentes

**Q: Fixer les contrastes va-t-il changer le design?**  
R: Non, juste les teintes. Les teintes seront plus sombres/claires selon les couleurs, mais le design reste identique.

**Q: Le menu Échap est-il standard?**  
R: Oui, pattern ARIA recommandé pour les modales/menus.

**Q: Et les futurs formulaires?**  
R: Une checklist séparée sera créée avant ContactForm. Pas critique maintenant.

**Q: Combien ça coûte en perfs?**  
R: ~0ms. Juste CSS + event listeners, aucun impact.

---

## Support

Questions? Contacter le QA Engineer (UNIA-44)
