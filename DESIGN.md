---
name: Mot'Home
description: Garage moto & bar à Thonon-les-Bains — vitrine racing/sport
colors:
  bleu-livery: "#0050a0"
  bleu-rapide: "#1060b0"
  bleu-piste: "#2070b0"
  chassis-noir: "#0a0a0a"
  chassis-mat: "#111111"
  chassis-doux: "#1a1a1a"
  asphalte: "#2a2520"
  blanc-sec: "#f5f0e8"
  piste-claire: "#f8f7f5"
  gris-piste: "#e0dbd0"
  ardoise: "#6b6055"
  fumee: "#8a8070"
typography:
  display:
    fontFamily: "Barlow Condensed, ui-sans-serif, sans-serif"
    fontSize: "clamp(3rem, 8vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Barlow Condensed, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.02em"
  title:
    fontFamily: "Barlow Condensed, ui-sans-serif, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Bebas Neue, ui-sans-serif, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sharp: "4px"
  card: "8px"
spacing:
  tight: "8px"
  base: "16px"
  loose: "24px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.bleu-livery}"
    textColor: "{colors.blanc-sec}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.bleu-rapide}"
    textColor: "{colors.blanc-sec}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bleu-livery}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "12px 32px"
  card-service:
    backgroundColor: "{colors.chassis-mat}"
    textColor: "{colors.blanc-sec}"
    rounded: "{rounded.sharp}"
    padding: "32px"
  card-service-hover:
    backgroundColor: "{colors.chassis-doux}"
    textColor: "{colors.blanc-sec}"
  input-field:
    backgroundColor: "{colors.chassis-mat}"
    textColor: "{colors.blanc-sec}"
    rounded: "{rounded.sharp}"
    padding: "12px 16px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ardoise}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "8px 12px"
  nav-link-active:
    backgroundColor: "{colors.bleu-livery}"
    textColor: "{colors.blanc-sec}"
---

# Design System: Mot'Home

## 1. Overview

**Creative North Star: "La Livery"**

Une combinaison de course. Chaque zone de couleur compte, l'identité est instantanément lisible à 300m, le bleu Mot'Home porte tout. Pas de second mot, pas d'ornement. Le système design n'imite pas Ducati ou Red Bull — il s'inspire de l'idée derrière toute livery réussie : maximum d'identité avec le minimum de bruit.

Mot'Home est un atelier moto local à Thonon, pas un constructeur international. La livery est donc humble dans son matériau (pas de glossy luxe, pas de glassmorphism, pas d'effets verre) mais entière dans son engagement chromatique : le bleu Mot'Home (#0050a0) porte 30 à 60% des surfaces en mode sombre. C'est une stratégie Committed, pas Restrained. Le dark mode est la signature racing nuit ; le light mode est la vitrine atelier de jour.

Le système rejette explicitement : tout aspect SaaS-cream, lifestyle motard contemplatif (couchers de soleil sépia), garage rustique "vieux bois", or mat décoratif, hero-metric template (gros chiffre + label), card grids identiques sans rythme.

**Key Characteristics:**
- Bleu unique, chromatiquement souverain ; neutres tintés brand (chroma ~0.005) pour cohérence atmosphérique
- Typographie tout-majuscule pour titres (Barlow Condensed 800/700) ; Inter casse normale pour le corps
- Profondeur par layering tonal, jamais par shadow décorative
- Motion vif et coupé : ease-out exponentiel, pas de bounce, cut sec plutôt que fondu lent
- Radius minimal 4px (boutons, inputs, service cards) ; 8px réservé aux containers larges
- Mobile-first : la majorité du trafic local arrive sur téléphone en repérage avant appel

## 2. Colors: The Bleu Livery Palette

Palette Committed : un seul ton saturé (bleu Mot'Home) porte l'identité. Les neutres sont légèrement tintés vers le bleu brand (chroma ~0.005) pour cohérence atmosphérique. Aucun second accent saturé ne concurrence le bleu.

### Primary
- **Bleu Livery** (#0050a0 / oklch(43% 0.19 263)) : la couleur signature de Mot'Home, extraite du logo. CTA primaires, liens actifs, labels de section, bordures de focus. C'est la seule couleur saturée du système.
- **Bleu Rapide** (#1060b0 / oklch(48% 0.18 263)) : état hover du bleu livery. S'utilise uniquement comme transition d'état, jamais au repos.
- **Bleu Piste** (#2070b0 / oklch(53% 0.17 263)) : variant éclairci. Glow de focus et accents dark mode quand le bleu livery manque de contraste sur fond noir profond.

### Neutral — Châssis (surfaces sombres)
- **Chassis Noir** (#0a0a0a / oklch(7% 0.005 263)) : fond global en dark mode. Le niveau le plus profond — jamais utilisé pour une card.
- **Chassis Mat** (#111111 / oklch(9% 0.005 263)) : surface des cards en dark mode. Une nuance au-dessus du fond.
- **Chassis Doux** (#1a1a1a / oklch(12% 0.005 263)) : surface élevée — card hover, input focus background, modal. Deux nuances au-dessus du fond.
- **Asphalte** (#2a2520 / oklch(18% 0.008 70)) : bordures et dividers en dark mode.

### Neutral — Piste (surfaces claires et texte)
- **Blanc Sec** (#f5f0e8 / oklch(95% 0.01 80)) : texte principal sur fonds sombres. Jamais #ffffff pur.
- **Piste Claire** (#f8f7f5 / oklch(97% 0.005 80)) : fond global en light mode.
- **Gris Piste** (#e0dbd0 / oklch(88% 0.012 80)) : bordures et dividers en light mode.
- **Ardoise** (#6b6055 / oklch(48% 0.012 70)) : texte muted — nav inactif, labels secondaires en light mode.
- **Fumée** (#8a8070 / oklch(58% 0.012 70)) : texte muted en dark mode.

**The Bleu Porte Tout Rule.** Le bleu Livery est la seule couleur saturée. Aucun second accent (rouge, vert, jaune, orange, or). Pour les états success/error, texte + icône suffisent — pas de couleur token dédiée. La rareté chromatique est le point.

**The No-Or Rule.** L'or mat #b8943a de la palette historique est banni. Il suggère un luxe ornemental qui dilue le register racing.

## 3. Typography: La Triade Moto

**Display Font:** Barlow Condensed (fallback ui-sans-serif, sans-serif) — la voix dominante. Condensé, racing, lisible en grand format, toujours en majuscules.
**Body Font:** Inter (fallback system-ui, sans-serif) — le corps de texte. Neutre, lisible, en casse normale.
**Label Font:** Bebas Neue (fallback ui-sans-serif, sans-serif) — eyebrows, labels, méta-info. Petite taille uniquement, letter-spacing étendu.

**Character:** la triade construit un contraste fort entre titre (vertical, condensé, racing) et corps (horizontal, humaniste, calme). Barlow Condensed est toujours en majuscules. Inter est toujours en casse normale. Les deux ne se mélangent jamais à un même niveau de hiérarchie.

### Hierarchy
- **Display** (Barlow Condensed 800, clamp(3rem, 8vw, 7rem), line-height 0.95, letter-spacing 0.01em, UPPERCASE) : hero headlines uniquement — une seule occurrence par page.
- **Headline** (Barlow Condensed 700, clamp(2rem, 5vw, 4rem), line-height 1.05, letter-spacing 0.02em, UPPERCASE) : titres de section principale.
- **Title** (Barlow Condensed 600, 1.5rem, line-height 1.1, letter-spacing 0.02em, UPPERCASE) : titres de card, sous-sections.
- **Body** (Inter 400, 1rem/16px, line-height 1.6, casse normale) : paragraphes. Longueur de ligne cap à 70ch.
- **Label** (Bebas Neue 400, 0.875rem, line-height 1.2, letter-spacing 0.12em, UPPERCASE) : eyebrows, labels de formulaire, méta-info, badges de section.

**The Uppercase Rule.** Titres (Barlow Condensed) et labels (Bebas Neue) sont toujours en majuscules. Inter corps de texte est toujours en casse normale. Jamais de minuscules sur Barlow Condensed.

**The Pas-De-Gradient-Text Rule.** background-clip: text combiné à un linear-gradient est interdit partout. L'emphase passe par le poids de graisse (700 à 800), pas par la couleur dégradée.

## 4. Elevation: Flat by Default

Pas de shadow au repos. La profondeur se construit par **layering tonal** : en dark mode, les surfaces s'éclaircissent au lieu de porter une ombre. Chassis Noir (fond global) à Chassis Mat (card) à Chassis Doux (hover/elevated). En light mode, les cards passent en #ffffff sur fond Piste Claire avec une bordure 1px Gris Piste — toujours sans shadow.

La signature lumineuse `0 0 30px rgba(0, 80, 160, 0.3)` apparaît exclusivement sur **état** : header au scroll (>20px), focus d'input, hover de CTA primaire. Elle marque la tension, pas le relief décoratif.

**The Flat-By-Default Rule.** Les surfaces sont plates au repos. Une shadow n'apparaît qu'en réponse à un état (hover, focus, scroll). Si une card doit ressortir, elle monte d'un cran tonal — elle ne reçoit pas de shadow.

**The Pas-De-Blur Rule.** Backdrop-blur est autorisé uniquement sur le header au scroll, où il sépare le nav du contenu défilant. Aucune autre utilisation. Pas de cards en verre, pas de modals translucides.

## 5. Components

### Buttons
- **Shape:** 4px radius (rounded.sharp). Pas d'angles droits brutaux, pas d'arrondis ronds qui adoucissent.
- **Primary:** fond Bleu Livery (#0050a0), texte Blanc Sec (#f5f0e8), Bebas Neue UPPERCASE letter-spacing 0.12em, padding 12px 32px.
- **Hover:** fond Bleu Rapide (#1060b0), translateY(-1px) sur 150ms ease-out-quart.
- **Focus-visible:** outline 2px Bleu Livery, outline-offset 2px.
- **Ghost:** fond transparent, texte Bleu Livery, bordure 1px Bleu Livery, mêmes dimensions. Hover : fond rgba(0, 80, 160, 0.1).

### Cards / Containers
- **Corner Style:** 4px (rounded.sharp) pour les service cards. 8px (rounded.card) uniquement pour les containers très larges (modal, panel).
- **Dark mode:** Chassis Mat (#111111) sur Chassis Noir (#0a0a0a), pas de bordure, pas de shadow.
- **Light mode:** #ffffff sur Piste Claire (#f8f7f5), bordure 1px Gris Piste (#e0dbd0).
- **Hover:** monte d'un cran tonal — Chassis Doux (#1a1a1a) en dark, #fafaf8 en light. Transition 200ms ease-out.
- **Internal Padding:** 32px. Généreux pour respirer sans être flou.

### Inputs / Fields
- **Style:** fond Chassis Mat (dark) / #ffffff (light), bordure 1px Asphalte (dark) / Gris Piste (light), radius 4px, padding 12px 16px.
- **Label:** Bebas Neue UPPERCASE, 0.75rem, letter-spacing 0.12em, Fumée (dark) / Ardoise (light).
- **Focus:** bordure Bleu Livery, box-shadow 0 0 0 3px rgba(0, 80, 160, 0.2).
- **Error:** icône SVG + texte inline — pas de couleur token dédiée.
- **Disabled:** opacity 0.5, cursor not-allowed.

### Navigation
- **Style:** header fixe, 64px mobile / 80px desktop.
- **Au repos:** fond transparent / gradient top-to-transparent.
- **Au scroll (>20px):** fond Chassis Mat / 95% + backdrop-blur 12px + glow bleu.
- **Links:** Inter 0.875rem 500, UPPERCASE, letter-spacing 0.05em, padding 8px 12px, radius 4px.
- **Default:** Ardoise / Fumée. **Hover:** Foreground, fond Foreground/5%. **Active:** Bleu Livery, fond Bleu Livery/10%.
- **Mobile:** burger à droite, Sheet Radix, slide-in 288px.

### Service Card (signature)
Structure verticale à quatre niveaux :
1. **Eyebrow** (Bebas Neue 0.75rem UPPERCASE, Bleu Livery) : "Atelier", "Service à domicile", etc.
2. **Title** (Barlow Condensed 700 1.5rem UPPERCASE) : le nom du service.
3. **Body** (Inter 0.9375rem, Fumée/Ardoise, max 3 lignes).
4. **CTA inline** (Barlow Condensed 600 0.875rem UPPERCASE, Bleu Livery + flèche) : texte-lien, pas un bouton.

Les 4 service cards ne sont pas identiques en hauteur ni en position — rythme asymétrique voulu (pas de grid iso).

### Phone CTA (composant signature critique)
Le numéro de téléphone est le CTA primaire du site. Format :
```
[icône téléphone SVG, Bleu Livery] 04 XX XX XX XX
APPELER L'ATELIER
```
Numéro : Barlow Condensed 700 UPPERCASE 1.5rem. Sous-label "APPELER L'ATELIER" : Bebas Neue 0.75rem letter-spacing 0.12em. Fond Chassis Mat (dark) / Blanc (light). Cliquable en `tel:` link, transition couleur 150ms ease-out sur hover.

## 6. Do's and Don'ts

### Do:
- **Do** utiliser #0050a0 (Bleu Livery) pour chaque affordance interactive : CTA, lien actif, focus ring, label de section.
- **Do** mettre le numéro de téléphone en CTA primaire visible sur toutes les pages. Un appel passé est le succès — pas un formulaire soumis.
- **Do** construire la profondeur par layering tonal (Chassis Noir → Chassis Mat → Chassis Doux). Jamais par shadow au repos.
- **Do** garder le logo `mothome-logo.png` et `mothome-ecusson.jpg` intacts. Aucune retouche, aucun re-coloring.
- **Do** respecter prefers-reduced-motion : toutes les animations (whip pan, speed lines, counter, parallax) dégradent vers opacity ou aucun mouvement.
- **Do** préférer une photo réelle d'atelier à un paragraphe "notre savoir-faire". Le métier se montre, ne se décrit pas.
- **Do** utiliser ease-out exponentiel (cubic-bezier(0.25, 1, 0.5, 1)) sur toutes les transitions. Rapide à démarrer, smooth à finir.
- **Do** appliquer une bordure 1px Gris Piste sur les cards en light mode (la profondeur ne vient pas de shadow).

### Don't:
- **Don't** utiliser #b8943a (or mat) comme accent. Il dilue le register racing. (PRODUCT.md anti-référence.)
- **Don't** appliquer backdrop-blur ailleurs que le header au scroll. Pas de glassmorphism, pas de cards en verre. (PRODUCT.md anti-référence "glossy luxe".)
- **Don't** utiliser gradient text (background-clip: text + linear-gradient). Emphase par poids de graisse, pas par dégradé.
- **Don't** ajouter border-left > 1px coloré sur cards, alerts, callouts.
- **Don't** reproduire le template hero-metric SaaS : gros chiffre + label + stats secondaires. (PRODUCT.md anti-référence.)
- **Don't** afficher les 4 cards services en grid iso identique. Casser le rythme en taille ou position.
- **Don't** utiliser bounce, élastique, spring sur les motions. Ease-out exponentiel uniquement.
- **Don't** ralentir au-delà de 500ms. Le racing est direct. Cut sec avant fondu lent.
- **Don't** utiliser tons sépia, photos lifestyle au coucher de soleil, mood contemplatif. (PRODUCT.md anti-référence.)
- **Don't** utiliser #000 pur ou #fff pur. Les neutres sont tintés (chroma 0.005–0.01) pour cohésion atmosphérique.
- **Don't** introduire un second accent saturé. Le Bleu Livery porte tout. (The Bleu Porte Tout Rule.)
- **Don't** modifier le logo. Jamais. (PRODUCT.md Design Principle #2.)
