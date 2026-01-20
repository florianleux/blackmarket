# Liste des Anti-Patterns - BlackMarket Baseline

Cette liste rÃ©pertorie tous les anti-patterns Ã  implÃ©menter **volontairement** dans la branche baseline de BlackMarket pour obtenir un score Lighthouse trÃ¨s bas. Ces anti-patterns sont ensuite corrigÃ©s progressivement Ã  travers les diffÃ©rentes Ã©tapes d'optimisation.

## HTML & Structure
**RÃ©solus par : Foundation**

- âŒ Divs partout au lieu de HTML sÃ©mantique
  - Pas de `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`
  - Tout en `<div>` et `<span>`

- âŒ Structure de headings incohÃ©rente
  - h1, h3, h2 mÃ©langÃ©s sans logique
  - Plusieurs h1 sur la mÃªme page
  - Sauts de niveaux (h1 â†’ h3 directement)

- âŒ Attributs `alt` manquants sur les images
  - Toutes les images sans texte alternatif
  - Mauvais pour l'accessibilitÃ© et le SEO

- âŒ Pas d'attribut `lang` sur `<html>`
  - `<html>` sans spÃ©cification de langue
  - Impact nÃ©gatif sur l'accessibilitÃ©

---

## SEO & MÃ©tadonnÃ©es
**RÃ©solus par : Foundation**

- âŒ Balise `<title>` absente ou gÃ©nÃ©rique
  - Soit pas de title, soit juste "BlackMarket"
  - Pas de title spÃ©cifique par page

- âŒ Meta description absente
  - Aucune balise `<meta name="description">`

- âŒ Pas de favicon
  - Aucun fichier `favicon.ico` ou `<link rel="icon">`

- âŒ Pas de mÃ©tadonnÃ©es Open Graph
  - Pas de `og:title`, `og:description`, `og:image`
  - Mauvais partage sur rÃ©seaux sociaux

---

## Core Web Vitals - LCP (Largest Contentful Paint)
**RÃ©solus par : Choix 1 - Option A**

- âŒ Images non optimisÃ©es
  - Formats lourds (PNG, JPG non compressÃ©s)
  - Pas de formats modernes (WebP, AVIF)
  - Tailles de fichier importantes (>500KB pour hero image)

- âŒ Images sans attributs `width` et `height`
  - Pas de dimensions spÃ©cifiÃ©es
  - Cause des layout shifts pendant le chargement

- âŒ Pas de `preload` pour ressources critiques
  - Hero image non prÃ©chargÃ©e
  - Fonts critiques non prÃ©chargÃ©es
  - Impact sur le temps de premier rendu

- âŒ Fonts sans `font-display: swap`
  - Fonts chargÃ©es avec comportement par dÃ©faut
  - Texte invisible pendant le chargement (FOIT)

---

## Core Web Vitals - CLS (Cumulative Layout Shift)
**RÃ©solus par : Choix 1 - Option B**

- âŒ Images sans dimensions
  - Pas d'attributs `width`/`height`
  - Layout shift quand les images chargent

- âŒ Fonts non optimisÃ©es
  - Pas de `font-display` configurÃ©
  - Flash of Invisible Text (FOIT) ou Flash of Unstyled Text (FOUT)
  - Changement de layout lors du chargement des fonts

- âŒ Contenu injectÃ© sans espace rÃ©servÃ©
  - Contenu dynamique (Vue) qui apparaÃ®t sans espace rÃ©servÃ©
  - Ã‰lÃ©ments qui poussent le contenu existant vers le bas

- âŒ Embeds sans dimensions fixes
  - Iframes, vidÃ©os, publicitÃ©s sans dimensions
  - Causent des shifts lors du chargement

---

## JavaScript
**RÃ©solus par : Choix 2 - Option A**

- âŒ Bundle complet non tree-shaked
  - Toutes les dÃ©pendances importÃ©es mÃªme si non utilisÃ©es
  - Vue et autres libs complÃ¨tes dans le bundle

- âŒ Pas de code splitting
  - Un seul gros fichier JavaScript
  - Tout chargÃ© mÃªme pour la page d'accueil

- âŒ Composants non lazy-loadÃ©s
  - Tous les composants chargÃ©s au dÃ©marrage
  - Pas d'imports dynamiques

- âŒ Scripts bloquants
  - JavaScript dans `<head>` sans `defer` ou `async`
  - Bloque le parsing HTML
  - Ralentit le First Contentful Paint

---

## Resources & Caching
**RÃ©solus par : Choix 2 - Option B**

- âŒ CSS et JavaScript non minifiÃ©s
  - Fichiers avec espaces, commentaires, noms de variables longs
  - Taille de fichiers inutilement grande

- âŒ Pas de compression
  - Pas de gzip ou brotli activÃ© cÃ´tÃ© serveur
  - Assets servis non compressÃ©s

- âŒ Pas de headers de cache
  - Pas de `Cache-Control` configurÃ©
  - Pas d'ETag
  - Ressources rechargÃ©es Ã  chaque visite

- âŒ Pas de lazy loading pour images
  - Toutes les images chargÃ©es immÃ©diatement
  - MÃªme celles "below the fold" (hors Ã©cran initial)
  - Gaspillage de bande passante

---

## Accessibility
**RÃ©solus par : Choix 3 - Option A**

- âŒ Contraste insuffisant
  - Ratio texte/background < 4.5:1
  - Texte gris clair sur fond blanc
  - DifficultÃ© de lecture pour malvoyants

- âŒ Labels manquants sur formulaires
  - Champs sans `<label>` associÃ©
  - Pas d'attributs `aria-label`
  - Impossible pour lecteurs d'Ã©cran de comprendre les champs

- âŒ Pas de focus visible
  - `outline: none` sur les Ã©lÃ©ments interactifs
  - Navigation au clavier impossible Ã  suivre visuellement

- âŒ Liens non descriptifs
  - Textes gÃ©nÃ©riques : "cliquez ici", "en savoir plus", "lire la suite"
  - Pas de contexte pour lecteurs d'Ã©cran

- âŒ RÃ´les ARIA manquants ou incorrects
  - Pas de `role` sur les Ã©lÃ©ments custom
  - Navigation, boutons, formulaires non identifiables

---

## Responsive
**RÃ©solus par : Choix 3 - Option B**

- âŒ Viewport meta manquant ou mal configurÃ©
  - Pas de `<meta name="viewport">`
  - Ou configuration incorrecte (user-scalable=no)

- âŒ Pas d'images responsive
  - Pas d'attributs `srcset` ou `sizes`
  - MÃªme image lourde servie sur mobile et desktop

- âŒ Touch targets trop petits
  - Boutons et liens < 44px
  - Difficile de cliquer sur mobile

- âŒ DÃ©bordements horizontaux
  - Contenu qui dÃ©passe sur mobile
  - Scroll horizontal nÃ©cessaire

- âŒ Texte trop petit sur mobile
  - Font-size < 16px
  - Zoom nÃ©cessaire pour lire

---

## Nuxt SpÃ©cifique (Baseline)

- âŒ SSR actif mais mal configurÃ©
  - Hydration non optimisÃ©e
  - Waterfalls de requÃªtes

- âŒ Pas de payload extraction
  - `experimental.payloadExtraction` non activÃ©
  - DonnÃ©es dupliquÃ©es client/serveur

- âŒ Pas de route pre-rendering
  - Toutes les routes en mode SSR dynamique
  - Pas de pages statiques gÃ©nÃ©rÃ©es

- âŒ Composants lourds chargÃ©s SSR
  - Tout rendu cÃ´tÃ© serveur mÃªme si non critique
  - Impact sur le Time to First Byte (TTFB)

---

## RÃ©sumÃ© par CatÃ©gorie

| CatÃ©gorie | Nombre d'anti-patterns | RÃ©solu par |
|-----------|------------------------|------------|
| HTML & Structure | 4 | Foundation |
| SEO & MÃ©tadonnÃ©es | 4 | Foundation |
| LCP | 4 | Choix 1A |
| CLS | 4 | Choix 1B |
| JavaScript | 4 | Choix 2A |
| Resources & Caching | 4 | Choix 2B |
| Accessibility | 5 | Choix 3A |
| Responsive | 5 | Choix 3B |
| **Total** | **34** | - |

---

## Notes d'ImplÃ©mentation

- Tous ces anti-patterns doivent Ãªtre **volontaires et Ã©vidents** dans le code
- Ajouter des commentaires `// ANTI-PATTERN:` pour faciliter l'identification
- S'assurer que chaque anti-pattern a un **impact mesurable** sur le score Lighthouse
- VÃ©rifier que la correction de chaque anti-pattern amÃ©liore effectivement le score correspondant
