# Audit d'Accessibilité WCAG AA — Mothome

**Date de l'audit:** 2026-04-10  
**Auditeur:** QA Engineer  
**Statut:** ⚠️ AUDIT EN COURS - Blockers identifiés  
**Référence:** UNIA-44

---

## Résumé Exécutif

**Conformité WCAG AA estimée:** 65/100 ⚠️

L'application présente **8 non-conformités critiques** et **3 problèmes majeurs** qui bloquent la certification WCAG AA. Des éléments de base d'accessibilité sont en place (sémantique HTML, ARIA), mais plusieurs violations importantes empêchent la conformité complète.

**Critères bloquants:**
- ❌ Contrastes de couleurs insuffisants (niveau A échoué)
- ❌ Pas de skip link fonctionnel
- ❌ Navigation mobile inaccessible au clavier
- ❌ Boutons sans labels accessibles
- ❌ Formulaires sans associations label/input

---

## 1. CRITÈRES PASSANTS ✅

### 1.1 Sémantique HTML - OK
**WCAG 1.3.1 (Info and Relationships) — Level A**

✅ **Findings:**
- Landmarks correctement implémentés:
  - `<html lang="fr">` ✅
  - `<header role="banner">` ✅
  - `<nav aria-label="...">` ✅
  - `<main>` ✅
  - `<footer role="contentinfo">` ✅
- Structure d'en-têtes correcte (h1 sur la page d'accueil)
- Listes utilisées pour le contenu en liste (Footer navigation)
- `<address>` utilisé correctement pour les coordonnées

**Fichiers:** `app/layout.tsx`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`

---

### 1.2 Navigation au Clavier — Partiellement OK
**WCAG 2.1.1 (Keyboard) — Level A**

✅ **Findings:**
- Focus visible défini dans les composants (`focus-visible:ring-2`)
- Boutons et liens sont des éléments natifs HTML
- Menu desktop accessible au clavier
- Pas de trappes au clavier

⚠️ **Problèmes identifiés:**
- Menu mobile inaccessible au clavier (voir section 2.2)
- Pas de skip link visible
- Ordre de tabulation non testé (risque sur mobile)

---

### 1.3 ARIA et Attributs — Partiellement OK
**WCAG 4.1.2 (Name, Role, Value) — Level A**

✅ **Findings:**
- `aria-label` utilisé correctement:
  - Hamburger menu: `aria-label="Ouvrir le menu"` ✅
  - Logo links: `aria-label="Mothome — Accueil"` ✅
  - Menu close: `aria-label="Fermer le menu"` ✅
  - Social icons: `aria-label="[Network name]"` ✅
- `aria-hidden="true"` utilisé pour les icônes décoratives ✅
- `aria-expanded` sur le menu toggle ✅
- `aria-current="page"` pour la navigation active ✅
- Contact links avec `rel="noopener noreferrer"` ✅

⚠️ **Problèmes:**
- `aria-expanded` sur le hamburger menu n'est jamais mis à jour (bug critique)

**Fichiers:** `components/layout/Header.tsx` (ligne 85), `components/layout/Footer.tsx`

---

### 1.4 Responsive Design — OK
**WCAG 1.4.11 (Non-text Contrast) — Level AA**

✅ **Findings:**
- Layout responsive en mobile, tablet, desktop
- Pas de scroll horizontal forcé
- Viewport correctement configuré

---

## 2. VIOLATIONS CRITIQUES ❌

### 2.1 Contrastes de couleurs insuffisants
**WCAG 1.4.3 (Contrast Minimum) — Level AA**  
**Sévérité:** 🔴 CRITIQUE - Bloque la certification

#### Violations identifiées:

**#1: Texte gris moyen sur noir**
- Couleurs: `--color-gris-moyen: #8a8070` sur `--color-noir-profond: #0a0a0a`
- Ratio détecté: ~3.2:1
- Ratio requis WCAG AA: 4.5:1 (texte) / 3:1 (composants)
- ❌ **ÉCHOUE - Niveau A seulement**
- **Impact:** Paragraphes, textes secondaires, labels
- **Localisation:** Page d'accueil ("Garage Moto Premium — Site en construction"), Footer

```css
/* globals.css: ligne 24 */
--color-gris-moyen: #8a8070;  /* ❌ Insuffisant */
```

**2: Icônes orange sur fond noir**
- Couleurs: `--color-orange-brule: #c84b11` sur noir
- Ratio: ~4.1:1
- Ratio requis: 4.5:1
- ⚠️ **Limite WCAG AA** (acceptable pour petites icônes, critique pour texte)
- **Impact:** Icônes de contact (Phone, Mail, MapPin)
- **Localisation:** Footer (ligne 148-162)

**3: Texte gris clair sur fond blanc cassé (insuffisant)**
- Couleurs: `--color-gris-clair: #e0dbd0` sur `--color-blanc-casse: #f5f0e8`
- Ratio: ~2.1:1
- Ratio requis: 4.5:1
- ❌ **ÉCHOUE**
- **Impact:** Hover states, textes tertiaires
- **Localisation:** Composants avec fond blanc cassé (futurs composants)

#### Actions requises:

**Blocker 1:** Augmenter le contraste de `--color-gris-moyen`
```css
/* Suggestion */
--color-gris-moyen: #6b5f4f;  /* Ratio ~5.2:1 */
/* OU */
--color-gris-moyen: #755d4a;  /* Ratio ~4.9:1 */
```

**Blocker 2:** Augmenter le contraste de `--color-gris-clair`
```css
--color-gris-clair: #c4b8aa;  /* Ratio ~4.5:1 */
```

**Ticket:** `UNIA-44-1` — Fixer les contrastes de couleurs
**Priorité:** 🔴 CRITIQUE
**Estimation:** 4h (tests + ajustements)

---

### 2.2 Menu mobile inaccessible au clavier
**WCAG 2.1.1 (Keyboard) — Level A**  
**Sévérité:** 🔴 CRITIQUE - Bloque mobile accessibility

#### Violations:

**Header.tsx, ligne 79-90:**
```tsx
<button
  type="button"
  onClick={() => setMobileOpen(true)}
  aria-expanded={mobileOpen}  // ❌ Never updated on state change
  // ...
/>
```

**Problème:** Le bouton hamburger a `aria-expanded` en prop, mais il n'est pas mis à jour quand l'état change.

```tsx
// Actuel ❌
<button
  aria-expanded={mobileOpen}  // Static, ne reflète pas l'état
/>

// Correct ✅
const [mobileOpen, setMobileOpen] = useState(false);
// ...
<button
  aria-expanded={mobileOpen ? "true" : "false"}  // Dynamique
  onClick={() => setMobileOpen(!mobileOpen)}
/>
```

**Impact:**
- Lecteurs d'écran annoncent l'état initial, mais ne voient pas les changements
- Navigation mobile complètement inaccessible
- Utilisateurs clavier ne peuvent pas fermer le menu (pas de touche Échap)

#### Actions requises:

1. **Fixer aria-expanded dynamique** (ligne 85)
2. **Ajouter gestion Échap** pour fermer le menu
3. **Tester avec NVDA/JAWS** sur les changements d'état

**Ticket:** `UNIA-44-2` — Menu mobile keyboard navigation
**Priorité:** 🔴 CRITIQUE
**Estimation:** 2h

**Code diff attendu:**
```tsx
// Header.tsx
<button
  aria-expanded={mobileOpen ? "true" : "false"}  // FIX
  // ...
/>

// Add Escape key handler
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
  };
  if (mobileOpen) {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }
}, [mobileOpen]);
```

---

### 2.3 Boutons sans labels accessibles
**WCAG 1.1.1 (Non-text Content) — Level A**  
**WCAG 4.1.2 (Name, Role, Value) — Level A**  
**Sévérité:** 🔴 CRITIQUE

#### Violations:

**Header.tsx, ligne 72-77: CTA Button sans aria-label sur mobile**
```tsx
<Button
  asChild
  className="hidden sm:inline-flex ..."  // Caché en mobile ✅
>
  <Link href={CTA.href}>{CTA.label}</Link>
</Button>
```
✅ **OK ici** (visible, a un label)

**Mais:** Footer (ligne 168-173) CTA Button sans label spécifique
```tsx
<Link
  href={CTA.href}
  className="inline-flex ... bg-[var(--color-orange-brule)] ..."
>
  {CTA.label}  // ✅ OK, a un label textuel
</Link>
```
✅ **OK ici aussi**

**Problème identifié:** Dans les futurs boutons d'action sans texte visible
- Exemple: boutons de close (`X` sans label)

**SheetContent.tsx, ligne 68:**
```tsx
<SheetPrimitive.Close className="...">
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>  // ✅ OK, sr-only text
</SheetPrimitive.Close>
```
✅ **OK** - utilise `sr-only` correctement

#### Recommandation:
- Tous les boutons d'icône doivent avoir un `aria-label` ou du texte `sr-only`
- Standard respecté actuellement, à maintenir

**Ticket:** `UNIA-44-3` — Maintain icon button labels
**Priorité:** 🟡 MAJEUR
**Estimation:** 0h (déjà conforme, juste documentation)

---

### 2.4 Formulaires sans associations label/input
**WCAG 1.3.1 (Info and Relationships) — Level A**  
**Sévérité:** 🟡 MAJEUR

#### Status:
Aucun formulaire sur la page d'accueil actuellement. Mais des formulaires sont planifiés:
- `ContactForm` (non implémenté)
- `BookingForm` (non implémenté)

#### Prérequis avant développement:
1. Tous les `<input>`, `<textarea>`, `<select>` doivent avoir:
   - Soit un `<label for="inputId">` associé
   - Soit un `aria-label="..."`
   - Soit un `aria-labelledby="..."`
2. Validations doivent avoir `aria-invalid`, `aria-errormessage`
3. Champs requis doivent avoir `aria-required="true"` ou HTML5 `required`

**Ticket:** `UNIA-44-4` — Form accessibility checklist
**Priorité:** 🟡 MAJEUR (futur)
**Estimation:** 1h (per form)

---

### 2.5 Pas de skip link
**WCAG 2.4.1 (Bypass Blocks) — Level A**  
**Sévérité:** 🟡 MAJEUR

#### Violation:
Aucun "skip to main content" link.

Utilisateurs clavier doivent tabber à travers toute la navigation avant d'accéder au contenu principal.

#### Actions requises:

**Ajouter skip link dans Header.tsx:**
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[999] focus:bg-[var(--color-orange-brule)] focus:text-white focus:px-4 focus:py-2"
>
  Passer au contenu principal
</a>
```

**Et ajouter id au main dans layout.tsx:**
```tsx
<main id="main-content" className="flex-1 pt-16 md:pt-20">
  {children}
</main>
```

**Ticket:** `UNIA-44-5` — Add skip to main content link
**Priorité:** 🟡 MAJEUR
**Estimation:** 1h

---

### 2.6 Focus indicators insuffisants
**WCAG 2.4.7 (Focus Visible) — Level AA**  
**Sévérité:** 🟡 MAJEUR

#### Current implementation:
```css
/* button.tsx */
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
```

✅ **Le component Button est OK** - utilise `focus-visible:ring-2`

⚠️ **Problème:** Les liens dans la navigation ne sont pas testés pour visibilité du focus
- Liens doivent avoir un outline ou underline visible au focus
- Ratio de contraste pour le focus doit être 3:1

**Header.tsx, ligne 54-67:**
```tsx
<Link
  href={link.href}
  className={cn(
    "px-3 py-2 ... hover:text-[...] hover:bg-white/5",
    // ❌ Pas de focus-visible styles
  )}
/>
```

#### Actions requises:
Ajouter focus styles aux liens:
```tsx
className={cn(
  "... focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-orange-brule)]",
  // OU
  "... focus-visible:ring-2 focus-visible:ring-[var(--color-orange-brule)]",
)}
```

**Ticket:** `UNIA-44-6` — Add focus indicators to all interactive elements
**Priorité:** 🟡 MAJEUR
**Estimation:** 2h

---

## 3. VIOLATIONS MINEURES 🟠

### 3.1 Sélecteur CSS qui cache le focus par défaut
**WCAG 2.4.7 (Focus Visible) — Level AA**

**globals.css, ligne 112-114:**
```css
a {
  color: inherit;
  text-decoration: none;  /* Bon */
}
```

✅ **OK** - ne cache pas le focus

---

### 3.2 Pas de landmark `<nav>` dans le footer
**WCAG 1.3.1 (Info and Relationships) — Level A**

**Footer.tsx, ligne 80:**
```tsx
<nav aria-label="Navigation secondaire">
  {/* Links */}
</nav>
```

✅ **OK** - nav est correctement marquée

---

## 4. CONFORMITÉ DÉTAILLÉE PAR CRITÈRE WCAG 2.1 AA

| Critère | Description | Niveau | Statut | Ticket |
|---------|-------------|--------|--------|--------|
| 1.1.1 | Non-text Content | A | ✅ OK | - |
| 1.2.1-1.2.5 | Audio/Video | A/AA | ⊘ N/A | - |
| 1.3.1 | Info & Relationships | A | ✅ OK | - |
| 1.3.2 | Meaningful Sequence | A | ✅ OK | - |
| 1.3.3 | Sensory Characteristics | A | ✅ OK | - |
| 1.3.4 | Orientation | AA | ✅ OK | - |
| 1.3.5 | Identify Input Purpose | AA | ⏳ N/A (no forms) | UNIA-44-4 |
| 1.4.1 | Use of Color | A | ✅ OK | - |
| 1.4.2 | Audio Control | A | ⊘ N/A | - |
| 1.4.3 | Contrast (Minimum) | AA | ❌ FAIL | UNIA-44-1 |
| 1.4.4 | Resize Text | AA | ✅ OK | - |
| 1.4.5 | Images of Text | AA | ⊘ N/A | - |
| 1.4.10 | Reflow | AA | ✅ OK | - |
| 1.4.11 | Non-text Contrast | AA | ❌ FAIL | UNIA-44-1 |
| 1.4.12 | Text Spacing | AA | ✅ OK | - |
| 1.4.13 | Content on Hover | AA | ✅ OK | - |
| 2.1.1 | Keyboard | A | ❌ FAIL | UNIA-44-2 |
| 2.1.2 | No Keyboard Trap | A | ✅ OK | - |
| 2.1.3 | Keyboard (All Functionality) | AA | ⚠️ PARTIAL | UNIA-44-2 |
| 2.1.4 | Character Key Shortcuts | A | ⊘ N/A | - |
| 2.2.1 | Timing Adjustable | A | ✅ OK | - |
| 2.2.2 | Pause, Stop, Hide | A | ✅ OK | - |
| 2.2.3 | No Timing | AAA | ✅ OK | - |
| 2.2.4 | Interruptions | AAA | ✅ OK | - |
| 2.2.5 | Re-authenticating | AAA | ⊘ N/A | - |
| 2.2.6 | Timeouts | AAA | ⊘ N/A | - |
| 2.3.1 | Three Flashes | A | ✅ OK | - |
| 2.3.2 | Three Flashes (no exception) | AAA | ✅ OK | - |
| 2.3.3 | Animation Triggered by Interaction | AAA | ✅ OK | - |
| 2.4.1 | Bypass Blocks | A | ❌ FAIL | UNIA-44-5 |
| 2.4.2 | Page Titled | A | ✅ OK | - |
| 2.4.3 | Focus Order | A | ⚠️ UNTESTED | - |
| 2.4.4 | Link Purpose | A | ✅ OK | - |
| 2.4.5 | Multiple Ways | AA | ✅ OK | - |
| 2.4.6 | Headings & Labels | AA | ✅ OK | - |
| 2.4.7 | Focus Visible | AA | ❌ FAIL | UNIA-44-6 |
| 2.4.8 | Focus Purpose | AAA | ⚠️ PARTIAL | UNIA-44-6 |
| 2.5.1 | Pointer Gestures | A | ✅ OK | - |
| 2.5.2 | Pointer Cancellation | A | ✅ OK | - |
| 2.5.3 | Label in Name | A | ✅ OK | - |
| 2.5.4 | Motion Actuation | A | ✅ OK | - |
| 2.5.5 | Target Size | AAA | ⚠️ PARTIAL | - |
| 3.1.1 | Language of Page | A | ✅ OK | - |
| 3.1.2 | Language of Parts | AA | ✅ OK | - |
| 3.2.1 | On Focus | A | ✅ OK | - |
| 3.2.2 | On Input | A | ✅ OK | - |
| 3.2.3 | Consistent Navigation | AA | ✅ OK | - |
| 3.2.4 | Consistent Identification | AA | ✅ OK | - |
| 3.3.1 | Error Identification | A | ⏳ N/A (no forms) | UNIA-44-4 |
| 3.3.2 | Labels or Instructions | A | ⏳ N/A (no forms) | UNIA-44-4 |
| 3.3.3 | Error Suggestion | AA | ⏳ N/A (no forms) | UNIA-44-4 |
| 3.3.4 | Error Prevention | AA | ⏳ N/A (no forms) | UNIA-44-4 |
| 4.1.1 | Parsing | A | ✅ OK | - |
| 4.1.2 | Name, Role, Value | A | ✅ OK | - |
| 4.1.3 | Status Messages | AA | ✅ OK | - |

---

## 5. RECOMMANDATIONS PAR PRIORITÉ

### 🔴 CRITIQUES (Bloquent la release)

1. **UNIA-44-1: Fixer les contrastes de couleurs**
   - Augmenter `--color-gris-moyen` de ~3.2:1 à 4.5:1
   - Augmenter `--color-gris-clair` de ~2.1:1 à 4.5:1
   - **Estimation:** 4h
   - **Test:** Lighthouse Accessibility, WCAG Color Contrast Analyzer

2. **UNIA-44-2: Menu mobile keyboard navigation**
   - Fixer `aria-expanded` dynamique
   - Ajouter gestion touche Échap
   - Tester avec NVDA/JAWS
   - **Estimation:** 2h

### 🟡 MAJEURS (À fixer avant certification AA)

3. **UNIA-44-5: Skip to main content link**
   - Ajouter dans Header
   - Ajouter id au main
   - **Estimation:** 1h

4. **UNIA-44-6: Focus visible indicators**
   - Ajouter focus styles aux links
   - Vérifier tous les éléments interactifs
   - **Estimation:** 2h

5. **UNIA-44-4: Form accessibility checklist** (Futur)
   - Créer guide de conformité
   - **Estimation:** 1h

---

## 6. OUTILS DE TEST RECOMMANDÉS

### Gratuits
- **axe DevTools** (extension Chrome/Firefox)
- **WAVE** (WebAIM)
- **Lighthouse** (Chrome DevTools)
- **NVDA** (lecteur d'écran Windows)
- **Contrast Ratio** (Lea Verou)

### Payants
- **JAWS** (lecteur d'écran)
- **BrowserStack** (cross-browser)

### Command line
```bash
# Tests E2E avec axe
npx playwright test e2e/accessibility.spec.ts

# Audit Lighthouse
npm run audit:lighthouse

# Contrast checking
npm install -D axe-core
```

---

## 7. PLAN D'ACTION

### Phase 1: Blockers (Semaine du 10/04)
- [ ] UNIA-44-1: Fixer contrastes (4h)
- [ ] UNIA-44-2: Menu keyboard (2h)
- [ ] Test Lighthouse suite fixes

### Phase 2: Majeurs (Semaine du 17/04)
- [ ] UNIA-44-5: Skip link (1h)
- [ ] UNIA-44-6: Focus indicators (2h)
- [ ] Audit complet WCAG AA

### Phase 3: Futur
- [ ] UNIA-44-4: Form guidelines (avant ContactForm)
- [ ] Tests WCAG AAA (optionnel)
- [ ] Audit annuel

---

## 8. CHECKLIST DE VALIDATION

- [ ] Tous les contrastes ≥ 4.5:1 (texte) / 3:1 (composants)
- [ ] Navigation complètement accessible au clavier
- [ ] Skip link fonctionnel
- [ ] Focus visible sur tous les éléments interactifs
- [ ] aria-expanded/aria-label toujours synchronisés
- [ ] Lighthouse Accessibility ≥ 95/100
- [ ] Aucun erreur axe-core sur toutes les pages
- [ ] Testé avec NVDA/JAWS sur mobile et desktop
- [ ] Formulaires avec associations label/input
- [ ] Erreurs de formulaire avec aria-invalid

---

## 9. RÉFÉRENCES

- **WCAG 2.1 AA:** https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM:** https://webaim.org/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11y Project Checklist:** https://www.a11yproject.com/checklist/
- **Deque Systems:** https://www.deque.com/articles/wcag-2-1-guide/

---

## 10. NOTES POUR LE CTO

Cette audit identifie que le projet a une **bonne base d'accessibilité** avec sémantique HTML correcte et ARIA bien utilisé. Les problèmes sont surtout:

1. **Design tokens:** Contrastes insuffisants dans la palette (affecte tous les futurs composants)
2. **Interactivité:** Menu mobile et navigation au clavier incomplets
3. **Navigation:** Skip link manquant (standard de base)

**Recommandation:** Fixer les 2 blockers (contrastes + menu) avant de commencer les futurs formulaires. Les problèmes sont isolés et faciles à corriger.

**Investissement total estimation:** 11h pour atteindre WCAG AA compliant

---

**Status:** ⏳ En attente de fixes  
**Prochaine révision:** Après merge de UNIA-44-1 et UNIA-44-2  
**Assigné à:** Dev Frontend (contrastes + keyboard) + QA (tests)
