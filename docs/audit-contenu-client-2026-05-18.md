# Audit contenu pages — préparation point client

Audit effectué le 2026-05-18 sur la branche `refonte`. Objectif : lister ce qui est placeholder / inventé / générique / à confirmer sur chaque page publique pour que le client fournisse les vrais contenus, prix, zones, horaires, etc. Une passe SEO sera refaite une fois les contenus définitifs reçus.

**Confirmations cross-pages préalables** :

- Téléphone réel `04 50 73 38 08` / `tel:+33450733808` — cohérent partout sauf 1 anomalie déjà corrigée (`app/accessoires/page.tsx:133` était `+33450000000`).
- Email `contact@mothome.fr` — cohérent partout.
- Mentions « Maël » présentes uniquement sur `/a-propos`. 0 mention sur les 6 autres pages.

---

## /atelier

### À valider avec le client

- Révision simple scooter/125 « À partir de 60 € » — à confirmer
- Révision 2 temps « À partir de 80 € » — à confirmer
- Révision 4 temps « À partir de 100 € » — à confirmer
- Vidange seule « À partir de 35 € » — à confirmer
- Diagnostic 30 min « 25 € » — Mothome fait-il payer le diagnostic ? Politique à clarifier
- Main d'œuvre « 55 € / heure » — taux horaire atelier réel ?
- Plaquettes « À partir de 40 € » — à confirmer
- Chaîne + pignons « À partir de 80 € » — à confirmer
- Préparation CT « 40 € » — confirmer + vérifier que Mothome est agréé ou partenaire d'un centre CT (pas affirmé clairement)
- Kit éthanol mono-injecteur « À partir de 490 € », bi-injecteur « À partir de 590 € » — Mothome est-il vraiment installateur certifié eFlexMoto ?
- « Gain : E85 à ~0.75 € vs SP98 à ~1.80 € » — prix carburants évolutifs, à dater ou sourcer
- Garantie 2 ans sur le kit éthanol — à confirmer

### Probablement réel

- Liste features techniques par service (descriptifs métier crédibles)

### Copy générique à muscler

- « On ne fait pas du volume : chaque moto est traitée avec soin » — phrase passe-partout
- « Pas de pièces inutiles, pas de surfacturation » — déclaratif, à appuyer par exemple concret
- « Tarifs transparents affichés en clair — fini le PDF introuvable » — bon angle, à reformuler avec un fait

---

## /service-domicile

### À valider avec le client

- Zones d'intervention entières à valider :
  - Évian-les-Bains ~15 km
  - Annemasse ~35 km
  - Morzine / Les Gets ~35 km
  - Cluses ~40 km
  - Bonneville ~40 km
  - Annecy ~60 km — Mothome dessert-il vraiment Annecy ?
  - Genève ~30 km — Suisse, fiscalité / douane à clarifier
- « Outillage professionnel embarqué » + « fourgon équipé » — Mothome a-t-il réellement un véhicule atelier mobile ?
- « Disponibilité week-end sur demande » + Samedi 9-16h, Dimanche « Sur demande » — à confirmer
- « L'essentiel de l'entretien courant se fait sur place, en 1 à 3h » — réaliste ?
- « Pour les zones > 40 km, un forfait kilométrique peut s'appliquer » — montant à préciser ou retirer si flou
- « Préparation saison : prêt à rouler en 2h » — chiffre indicatif à valider
- Service de récupération & convoyage — Mothome a-t-il une remorque ou un plateau ?

### Copy générique à muscler

- « La mécanique qui vient à vous » — slogan OK mais générique
- « Un seul interlocuteur, du début à la fin » — phrase classique
- « Toutes marques : japonaises, européennes, américaines » — à confirmer (cohérent avec Honda / KTM / Ducati mentionnés en `/a-propos`)

---

## /accessoires

### À valider avec le client

- Marques listées :
  - Casques : AGV, Shoei, Arai, Bell, HJC, LS2 (et Shark dans le meta title mais pas dans la liste)
  - Équipements : Alpinestars, Dainese, Rev'It, Furygan, Icon
  - Pièces : Michelin, Pirelli, DID, K&N, Castrol, Motul
  - Accessoires : Akrapovic, Arrow, SW-Motech, Hepco & Becker, Sena
  - Mothome a-t-il réellement accès à toutes ces marques ? Liste cosmétique ou réseau de distribution réel ?
- « Délai 24-48 h pour les références courantes » — engagement à valider
- « Meilleur prix garanti » + alignement prix — politique commerciale officielle ou marketing ?
- « Pièces homologuées CE niveau 2 » — affirmation factuelle à confirmer
- Incohérence : le meta title cite « Shark » mais la liste casques ne contient pas Shark
- Disclaimer « Le catalogue affiché n'est pas exhaustif » présent — couvre le flou

### Copy générique à muscler

- « Conseil expert : L'atelier connaît le matériel qu'il vend. Pas de blabla marketing » — méta-blabla, à remplacer par exemple concret
- « Les grandes marques au juste prix, avec le conseil d'un passionné » — passe-partout

---

## /depot-vente

### À valider avec le client

- **Motos affichées entièrement fictives** :
  - Honda CB650R 2021 — 7 500 €
  - Yamaha MT-07 2019 — 5 800 €
  - KTM Duke 390 2022 — 4 900 €
  - **À brancher sur un vrai stock ou à cacher la section tant que vide.**
- « Stock mis à jour régulièrement » — mensonger si la liste reste figée
- « Commission uniquement en cas de vente réussie » — % commission à expliciter ou assumer le flou
- « Durée de dépôt : 1 à 3 mois renouvelables » — à confirmer
- « Toutes marques acceptées — deux-roues de 50 cc à 1200 cc » — confirmer le plafond et le plancher
- « Publiée sur les principales plateformes » — Mothome poste-t-il vraiment sur LeBonCoin / Moto-Station / etc. ?
- « Carnet d'entretien, historique d'accidents, kilométrage vérifié » — engagement fort à confirmer
- « Paiement sécurisé au garage, transfert de carte grise géré avec vous » — confirmer le process

### Copy générique à muscler

- « Pas de risque d'arnaque » — formulation négative défensive
- « L'occasion certifiée » — terme marketing, à appuyer sur fait concret (ex : « checklist 30 points avant mise en vente »)

---

## /bar

### À valider avec le client

- **Carte entière à valider** :
  - Planche charcuterie & fromage — 12 €
  - Frites maison — 4 €
  - Rillettes du chef — 6 €
  - Mothome Burger — 13 €
  - Burger double — 16 €
  - Veggie Burger — 12 €
  - Bières pression — 3,5 €
  - Soft & jus — 2,5 €
  - Café / expresso — 2 €
- Horaires bar : Mardi-Vendredi 17h-23h, Samedi 12h-00h, Dimanche « selon GP », Lundi fermé.
  - **Divergent des horaires garage** (Lun-Ven 8-18h). À valider que c'est intentionnel (garage et bar = créneaux différents).
- « PS5 — MotoGP 24/25 ou Ride 5 » — jeux réellement disponibles ?
- « Tous les GP retransmis sur grand écran — MotoGP, Superbike, Moto2, Moto3 » — abonnement Canal+/Eurosport à confirmer (droits de diffusion)
- « Rando du mois — premier dimanche du mois » — rituel réel actuel ?
- « Bières pression (sélection locale) » — quelles brasseries ? À expliciter
- « Cuisine maison » affirmé en JSON-LD — confirmer
- « Swap Meet & expos » — événement réellement programmé ?

### Copy générique à muscler

- « Plus qu'un bar » — slogan plat
- « Le QG des motards du Chablais » — bon angle mais répété 3 fois dans la page

---

## /a-propos

### À valider avec le client

- **Timeline entière** :
  - 2010 « Maël commence à 16 ans » → implique année de naissance ~1994
  - 2014 « CAP Mécanique Moto, 3 ans d'alternance »
  - 2018 « Support technique équipe régionale circuit » — quelle équipe ?
  - 2022 « Mothome ouvre » — confirmer date exacte
  - 2023 « Service à domicile + certification eFlexMoto » — confirmer
- « Marques de cœur : Honda, KTM, Ducati » — à confirmer
- « Passionné de Superbike et de trails alpins » — détail bio à confirmer
- « Mothome grandit. Si tu es mécanicien passionné... » — Mothome recrute-t-il vraiment ?

### Placeholders évidents

- **Avatar = initiale « M » dans un cercle** — à remplacer par photo de Maël

### Copy générique à muscler

- 3 valeurs très convenues pour un artisan : « L'artisanat avant tout », « La passion, pas le commerce », « Transparence & honnêteté » — bénéficieraient d'anecdotes concrètes
- « Mothome n'est pas une franchise » — défensif, à reformuler en positif
- « Premier carbu nettoyé, première vidange, premières brûlures » — bon détail concret, à garder

---

## /contact

### À valider avec le client

- **Adresse** : actuellement « Thonon-les-Bains, Haute-Savoie (74) » — **pas de rue / numéro / code postal précis affiché**. Volontaire (confidentialité) ou à compléter ?
- Map Google : URL d'embed avec coordonnées génériques de Thonon-ville, pas du garage. À remplacer quand adresse fournie.
- Recherche Google Maps par nom (`https://maps.google.com/?q=Mothome+Thonon-les-Bains`) peut tomber sur la mauvaise fiche si plusieurs résultats existent. À remplacer par lien direct vers la fiche Google My Business du garage.
- Horaires Lun-Ven 8-18h, Sam 9-16h, Dim fermé — confirmer
- « Réponse sous 24h garantie » — engagement opérationnel à valider

---

## Synthèse cross-pages

### Divergences horaires et contact

- **Téléphone** : 1 anomalie corrigée — `app/accessoires/page.tsx:133` contenait `+33450000000` (placeholder JSON-LD). Remplacé par `+33450733808` dans le PR associé à cet audit.
- **Horaires garage** : cohérents sur Footer, `/contact`, `/service-domicile` → Lun-Ven 8-18h + Sam 9-16h + Dim fermé.
- **Horaires bar volontairement décalés** : Mar-Ven 17-23h, Sam 12-00h, Dim selon GP, Lun fermé — à confirmer intentionnel.
- **Bug technique JSON-LD** : `buildBarSchema` (`lib/schema.ts:189`) réutilise les horaires garage et non les horaires bar. À corriger avant la prochaine passe SEO.
- **Adresse** : aucune adresse précise (rue + n°) sur le site. Footer = « Thonon-les-Bains, Haute-Savoie (74200) », Contact = idem. À compléter ou confirmer délibéré.
- **Schema principal** (`lib/schema.ts:14-19`) : `streetAddress: "Thonon-les-Bains"` — pas une vraie rue, à corriger pour le SEO local (Google My Business).

### Patterns de copy à harmoniser

- Le mot « passionné(s) » apparaît 6+ fois (atelier, accessoires, bar, a-propos) — à saturer à 2-3 occurrences max
- « Toutes marques » répété 4 fois — OK mais à diversifier
- « Honnête / honnêteté / juste prix » : présent atelier, a-propos, accessoires — angle fort mais devient cliché
- Structure des pages très répétée : Hero + tagline → bento/grid → CTA → bloc info → form. Voulu pour la cohérence, attention à la fatigue de lecture.
- **2 tons coexistent** : tutoiement (« décris ton problème » atelier, « remplis le formulaire » service-domicile, contact) vs vouvoiement (le reste). **À trancher avec le client : tu ou vous ?**

### Top-5 questions prioritaires à poser au client

1. **Tarifs atelier** : valider ou corriger les 14 prix affichés sur `/atelier` (révisions, diagnostic, MO horaire, plaquettes, chaîne, CT, kits éthanol). Surtout : Mothome est-il certifié eFlexMoto et agréé / partenaire CT ?
2. **Carte du bar** : valider ou remplacer les 9 lignes de menu (plats + boissons + prix) et confirmer les horaires bar décalés du garage.
3. **Stock dépôt-vente** : décider — soit fournir 3 à 6 vraies fiches motos (modèle / année / km / prix / photo) soit cacher la section « Motos disponibles » jusqu'à mise en place d'une vraie source. Préciser aussi le % de commission.
4. **Zones service à domicile** : valider la liste des 8 villes (Annecy ~60 km, Genève CH ~30 km en particulier) + l'existence réelle d'un fourgon équipé + politique forfait km au-delà de 40 km.
5. **Adresse précise du garage** : fournir l'adresse complète (rue + numéro + code postal) pour le Footer, `/contact`, le schema JSON-LD, l'embed Google Maps et la fiche Google My Business. Fournir également une photo de Maël pour `/a-propos`.

### Bugs techniques à traiter avant la prochaine passe SEO (post-contenu)

- `buildBarSchema` (`lib/schema.ts:189`) → utiliser les horaires bar réels et non `BUSINESS.openingHours` (garage).
- `BUSINESS.streetAddress: "Thonon-les-Bains"` (`lib/schema.ts:14`) → remplacer par la vraie rue + numéro.
- `mapsUrl` `/contact` → remplacer la recherche par nom par un lien direct vers la fiche Google My Business.
- Avatar « M » placeholder sur `/a-propos` → remplacer par photo de Maël.
