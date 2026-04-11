# Guide de Test — Accessibilité WCAG AA

**Référence:** UNIA-44  
**Rôle:** QA Engineer  
**Fréquence:** À chaque merge, avant release

---

## 1. Tests Automatisés

### 1.1 Lighthouse Accessibility

```bash
# Locally
npm run dev

# In another terminal
npx lighthouse http://localhost:3000 --output-path=/tmp/lighthouse.html --view

# Expected: Accessibility ≥ 95/100
```

**Checklist:**
- [ ] Accessibility score ≥ 95
- [ ] No red "Errors"
- [ ] Document color and background colors check

**Interprétation:**
```
90-100  ✅ OK, release ready
80-89   🟡 Fix issues before release
< 80    🔴 BLOCKER
```

### 1.2 axe-core (DevTools)

**Chrome/Firefox:**
1. Installer **axe DevTools** (gratuit)
2. Ouvrir site: `http://localhost:3000`
3. Cliquer icône axe → "Scan ALL of my page"
4. Vérifier aucune erreur rouge

**Issues:**
```
🔴 Red: Critical violations → FIX IMMEDIATELY
🟡 Yellow: Warnings → Document & review
🟢 Green: Passed checks
```

**Checklist:**
- [ ] Zéro erreur critique
- [ ] Tous les warnings documentés
- [ ] Passed checks ≥ 50

### 1.3 W3C Markup Validator

```bash
# En ligne: https://validator.w3.org/nu/
# Ou local:
npm install -D html-validate

# Vérifier:
- Pas d'erreur HTML
- ARIA attributes valides
```

---

## 2. Tests Manuels — Contraste

### 2.1 Lighthouse Internal Check
Lighthouse inclut une vérification de contraste.

### 2.2 WebAIM Contrast Checker

**Outil:** https://webaim.org/resources/contrastchecker/

**Pour chaque paire de couleurs:**

```
Texte gris moyen (#6b5f4f) sur noir (#0a0a0a)
→ https://webaim.org/resources/contrastchecker/?fcolor=6B5F4F&bcolor=0a0a0a
Expected: Ratio ≥ 4.5:1

✅ "PASS" pour AA niveau
```

**Checklist:**
- [ ] Gris moyen: ✅ PASS AA
- [ ] Gris clair: ✅ PASS AA  
- [ ] Orange sur noir: ✅ PASS AA
- [ ] Tous les textes: ✅ PASS AA

### 2.3 Manual Visual Check (Desktop)

1. Ouvrir site: `http://localhost:3000`
2. Vue normale → vérifier lisibilité
3. Zoom à 200% → toujours lisible?
4. Impression en noir/blanc → contrastes visibles?

**Checklist:**
- [ ] Texte lisible zoom normal
- [ ] Texte lisible zoom 200%
- [ ] Texte lisible en B&W

---

## 3. Tests Clavier

### 3.1 Navigation Tab basique

```
Équipement: Clavier uniquement, pas de souris

1. Appuyer Tab
   Expected: Skip link visible en haut-gauche
   
2. Appuyer Tab
   Expected: Focus saute au premier link/button
   
3. Appuyer Tab → Tab → Tab → ...
   Expected: Parcourir toute la page en ordre logique
   
4. Appuyer Shift+Tab (inverse)
   Expected: Retourner en arrière
```

**Éléments à vérifier:**
- [ ] Skip link au Tab 1
- [ ] Menu links accessibles
- [ ] CTA button accessible
- [ ] Footer links accessibles
- [ ] Aucune trap (Tab infini)

### 3.2 Menu Mobile

```bash
npm run dev
# Redimensionner browser à 375px (mobile)

1. Tab jusqu'au hamburger
   Expected: Focus visible
   
2. Appuyer Entrée
   Expected: Menu s'ouvre
   
3. Tab dans le menu
   Expected: Tous les links navigables
   
4. Appuyer Échap
   Expected: Menu se ferme
   
5. Tab
   Expected: Focus retour au hamburger ou au main
```

**Checklist:**
- [ ] Hamburger accessible Tab
- [ ] Menu s'ouvre/ferme Entrée
- [ ] Links dans menu Tab-ables
- [ ] Échap ferme le menu
- [ ] Aucune trap au clavier

### 3.3 Focus Visible

```
Pour chaque élément Tab-able:

1. Element a FOCUS?
   Expected: Outline ou ring clair visible
   
2. Contraste outline vs background?
   Expected: Outline se voit clairement
   
3. Offset suffisant?
   Expected: Pas coché par le texte
```

**Acceptable:**
- Outline de 2px minimum
- Ring (ombra) visible
- Contraste 3:1 minimum

**À vérifier:**
- [ ] Links: outline visible
- [ ] Buttons: outline visible
- [ ] Menu hamburger: outline visible
- [ ] Logo: outline visible (si clickable)

### 3.4 Tab Order Visual Test

```bash
# Ouvrir inspector (F12)
# Ajouter ce snippet dans console:

(() => {
  let index = 0;
  document.addEventListener('focusin', () => {
    document.title = `[${++index}] ` + document.title;
  });
})();

# Puis appuyer Tab plusieurs fois
# Title changera: [1], [2], [3], ...
# Vérifier l'ordre est logique
```

**Logique attendue:**
```
[1] Logo → [2] Nav Link 1 → [3] Nav Link 2 → ... 
→ [N] Menu Hamburger → [N+1] Main content → [N+2] Footer
```

**Checklist:**
- [ ] Ordre logique LTR
- [ ] Pas de sauts bizarres
- [ ] Mobile diffère du desktop (OK)

---

## 4. Tests Lecteur d'écran

### 4.1 NVDA Setup (Windows gratuit)

```bash
# Télécharger: https://www.nvaccess.org/
# Installer
# Démarrer NVDA (Ctrl+Alt+N)
```

### 4.2 Test basique NVDA

```
Avec NVDA actif:

1. Alt+Tab → browser
   Expected: "Google Chrome" announce

2. Insert+H
   Expected: Annonce la page et ses headings
   Résultat: "Mothome — Garage Moto Premium"
   
3. Insert+Flèche Bas (lire page)
   Expected: "main landmark" → "navigation principale" → "logo" → ...
   
4. Appuyer Tab
   Expected: "Hamburger menu button, collapsed" (ou "expanded" si ouvert)
   
5. Appuyer D (jump to landmark)
   Expected: Saute à la région repérée
```

**Vérifications:**
- [ ] Titre page annoncé
- [ ] Landmarks détectés
- [ ] Navigation identifiée
- [ ] aria-label lisible
- [ ] aria-expanded annoncé

### 4.3 Test NVDA complet

```bash
# Parcours utilisateur complet:

1. Atterrir sur homepage
   → Vérifier: Titre page, description
   
2. Tab vers hamburger
   → Vérifier: "Hamburger menu, collapsed"
   
3. Activer menu (Entrée)
   → Vérifier: "Menu opened", "Navigation mobile"
   
4. Tab dans menu
   → Vérifier: Chaque link lisible
   
5. Échap ferme menu
   → Vérifier: "Menu closed"
   
6. Insert+F (formulaires) - Pour futurs tests
   → Vérifier: Champs avec labels
```

**Checklist NVDA:**
- [ ] Page title annoncé
- [ ] Landmarks: main, header, nav, footer
- [ ] Button labels: "Hamburger menu"
- [ ] aria-expanded: "collapsed/expanded"
- [ ] Links: tous avec description
- [ ] Aucune: "unlabeled button", "image with no alt"

### 4.4 JAWS (optionnel, Windows, payant)

Si JAWS est disponible, mêmes tests que NVDA. JAWS est plus strict.

---

## 5. Tests Cross-Browser

### 5.1 Desktop

```bash
npm run dev

# Tester dans chaque navigateur:
# 1. Chrome (dernière version)
# 2. Firefox (dernière version)  
# 3. Safari (Mac si possible)
# 4. Edge (Windows si possible)

# Pour chaque:
- Lighthouse score
- axe DevTools (aucune erreur)
- Tab navigation
- Focus visible
```

**Checklist:**
- [ ] Chrome: ✅ OK
- [ ] Firefox: ✅ OK
- [ ] Safari: ✅ OK (si accessible)
- [ ] Edge: ✅ OK (si accessible)

### 5.2 Mobile

```bash
# Options:
1. DevTools mode mobile (Chrome)
2. Vrai téléphone (iPhone, Android)

npm run dev

# Tester:
- Zoom à 200%: contrastes OK?
- Tap targets: ≥ 44x44px?
- Scroll horizontal: aucun?
- Menu mobile: accessible?
```

**Checklist:**
- [ ] Zoom 200%: lisible
- [ ] Tap targets: ≥ 44px
- [ ] Aucun scroll horizontal
- [ ] Menu fonctionne au tap

### 5.3 Orientation Change

```bash
# Tester rotation device:

1. iPhone portrait → landscape
2. Android portrait → landscape

Expected: Layout s'adapte, contrastes restent OK

Checklist:
- [ ] Layout passe portrait ↔ landscape
- [ ] Contrastes maintenus
- [ ] Aucun overflow
- [ ] Fonctionnalité intact
```

---

## 6. Vérification des Fixes

### 6.1 Post-Contraste Fix

```bash
# Après merge UNIA-44-1:

npm run dev
npx lighthouse http://localhost:3000 --view

# Vérifier:
- [x] Lighthouse Accessibility ≥ 95
- [x] axe DevTools: aucune erreur contraste
- [x] WebAIM Contrast Checker: tous ≥ 4.5:1
```

**Test détaillé:**
```bash
# Ouvrir: https://webaim.org/resources/contrastchecker/

# Texte gris moyen (#6b5f4f) sur noir (#0a0a0a)
→ Vérifier: Ratio ≥ 4.5:1 PASS AA

# Texte gris clair (#c4b8aa) sur blanc (#f5f0e8)
→ Vérifier: Ratio ≥ 4.5:1 PASS AA
```

**Sign-off:**
```
✅ Contrastes WCAG AA conformes
Date: [DATE]
QA: [NOM]
```

### 6.2 Post-Keyboard Fix

```bash
# Après merge UNIA-44-2:

# Test clavier menu:
1. Tab → hamburger visible
2. Entrée → menu s'ouvre
3. Échap → menu se ferme
4. Tab dans menu → tous les links OK

# Test avec NVDA:
1. aria-expanded annoncé "expanded"
2. Fermer menu → aria-expanded "collapsed"

Checklist:
- [x] Hamburger Tab-accessible
- [x] Menu Entrée opens
- [x] Échap closes menu
- [x] NVDA annonce état
```

### 6.3 Post-Skip Link Fix

```bash
# Après merge UNIA-44-5:

1. Tab immédiatement
   Expected: Skip link visible en haut-gauche
   
2. Entrée
   Expected: Focus saute au <main id="main-content">

Checklist:
- [x] Skip link visible au Tab 1
- [x] Skip link clickable (Entrée)
- [x] Focus saute au main
```

### 6.4 Post-Focus Indicators

```bash
# Après merge UNIA-44-6:

Tab partout:
- [ ] Logo: outline visible
- [ ] Nav links: outline visible
- [ ] Hamburger: outline visible
- [ ] Footer links: outline visible
- [ ] Tous: outline 2px+ clair
```

---

## 7. Checklist Pré-Release

Avant de merger dans main:

```
CONTRASTE:
- [ ] Lighthouse Accessibility ≥ 95
- [ ] axe DevTools: aucune erreur
- [ ] WebAIM Contrast Checker: tous ≥ 4.5:1 AA
- [ ] Visual check: lisible zoom 200%

CLAVIER:
- [ ] Tab: parcours complet possible
- [ ] Skip link: visible et fonctionnel
- [ ] Menu: Entrée ouvre, Échap ferme
- [ ] Focus: visible sur tous éléments interactifs
- [ ] NVDA: aucun "unlabeled" elements

CROSS-BROWSER:
- [ ] Chrome: Lighthouse ≥ 95
- [ ] Firefox: Lighthouse ≥ 95
- [ ] Safari: visual check OK
- [ ] Mobile (375px): zoom 200% OK

FINAL:
- [ ] Aucun regression sur E2E tests
- [ ] Performance: pas de slowdown
- [ ] Design: pas de changement visible
```

---

## 8. Outils Recommandés

### Gratuit
- **axe DevTools** → https://www.deque.com/axe/devtools/
- **WAVE** → https://wave.webaim.org/
- **Lighthouse** → Built-in Chrome DevTools
- **NVDA** → https://www.nvaccess.org/
- **WebAIM Contrast Checker** → https://webaim.org/resources/contrastchecker/

### Payant (optionnel)
- **JAWS** → $90 one-time (Windows screen reader)
- **BrowserStack** → Cross-browser testing
- **Level Access AMP** → Enterprise tool

---

## 9. Bugs Reporting Template

Si un issue d'accessibilité est trouvé:

```markdown
## Accessibility Issue

**WCAG Criterion:** 1.4.3 Contrast Minimum (AA)
**Severity:** 🔴 CRITICAL / 🟡 MAJOR / 🟠 MINOR

### Description
[Quoi: élément affecté]
[Où: page/composant]
[Impact: qui/combien de users]

### Reproduction
1. Ouvrir [page]
2. [action]
3. [résultat observé] ❌
4. Utiliser axe DevTools → [erreur spécifique]

### Expected
[comportement attendu] ✅

### Evidence
- Screenshot: [lien]
- axe result: [code d'erreur]
- Ratio contraste: [actuel vs requis]

### Fix Recommendation
[suggestion technique ou lien doc]

---
**Tested:** Chrome/Firefox/Safari ✅
**Date:** YYYY-MM-DD
**QA:** [name]
```

---

## 10. Test Schedule

```
AVANT CHAQUE MERGE:
- [ ] npm run test (unit tests)
- [ ] npm run build (type check)
- [ ] Lighthouse quick check
- [ ] 2 min keyboard test

AVANT RELEASE:
- [ ] Full Lighthouse audit
- [ ] axe DevTools scan
- [ ] Complète keyboard test
- [ ] NVDA scan (ou JAWS)
- [ ] Cross-browser check

MENSUEL:
- [ ] Full WCAG AA audit
- [ ] Real device testing (iPhone/Android)
- [ ] Perf regression check
```

---

**Questions?** Contact QA Engineer (UNIA-44)  
**Last updated:** 2026-04-10
