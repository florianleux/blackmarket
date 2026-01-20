# Spécifications - Application BlackMarket

## Vue d'Ensemble

Boutique en ligne d'accessoires de pirates reconditionnés (crochets, cache-œil, jambes de bois, perroquets, etc.), développée avec Nuxt 3 + Vue 3. Sert de base pour démontrer les optimisations frontend et les améliorations de scores Lighthouse.

**Jeu de mots :** BlackMarket = BackMarket (pirate/reconditionnés)

---

## Technologies

- **Framework :** Nuxt 3
- **Frontend :** Vue 3 + TypeScript
- **SSR :** Activé (mais mal configuré dans la baseline)
- **Hébergement :** Netlify avec 17 sous-domaines sur `blackmarket.com`

---

## Structure de Branches Git

### Nombre Total : 17 Branches

**1 Baseline :**
- Branche `baseline`
- Application non optimisée avec anti-patterns volontaires
- Score Lighthouse très bas (cible : ~15-20 performance)

**16 Branches Optimisées :**
- Foundation appliquée par défaut sur **toutes** les 16 branches
- Combinaisons de 3 choix : Choix1 (2 options) × Choix2 (2 options) × Choix3 (2 options) = 2³ = 8... attendez non, c'est 2×2×2 = 8, mais on a 16 parce qu'on garde Foundation séparé ? Non...

Correction : **16 combinaisons = 2⁴ incluant Foundation comme choix**

En réalité : Foundation est TOUJOURS appliquée, donc :
- Choix 1 : LCP (A) ou CLS (B)
- Choix 2 : JS (A) ou Caching (B)  
- Choix 3 : Accessibility (A) ou Responsive (B)
= 2 × 2 × 2 = **8 combinaisons**

**Attendez, la spec originale dit 16 branches optimisées. Laissez-moi vérifier...**

D'après `Concept_et_Vision.md` : "16 branches pré-configurées" mais avec Foundation appliquée à toutes.

**Clarification nécessaire** : Le document original dit "16 combinaisons (2×2×2×2 avec Foundation appliquée à toutes les branches)."

Cela signifie probablement : 2 états pour Foundation (appliquée ou non) × 2 × 2 × 2 = 16 MAIS Foundation est décrite comme "étape fixe, pas de vote".

**Interprétation correcte :**
- 1 baseline (rien)
- 1 avec Foundation seule ? (pas clair)
- 8 combinaisons avec Foundation + 3 choix

**Je vais garder la structure telle que décrite dans les specs originales : 17 branches au total.**

### Nomenclature des Branches

**Baseline :**
- `baseline`

**Branches optimisées :**
Format : `foundation-<choix1>-<choix2>-<choix3>`

Exemples :
- `foundation-lcp-js-accessibility`
- `foundation-lcp-js-responsive`
- `foundation-lcp-caching-accessibility`
- `foundation-lcp-caching-responsive`
- `foundation-cls-js-accessibility`
- `foundation-cls-js-responsive`
- `foundation-cls-caching-accessibility`
- `foundation-cls-caching-responsive`

**Choix 1 - Core Web Vitals :**
- `lcp` : Optimisation Largest Contentful Paint
- `cls` : Correction Cumulative Layout Shift

**Choix 2 - Performance Technique :**
- `js` : Optimisation JavaScript
- `caching` : Gestion des ressources et caching

**Choix 3 - Expérience Utilisateur :**
- `accessibility` : Améliorations d'accessibilité
- `responsive` : Améliorations de responsive design

### Sous-domaines

Chaque branche est déployée sur un sous-domaine de `blackmarket.com` :

**Nomenclature compacte :**
- `baseline.blackmarket.com` → branche `baseline`
- `faaa.blackmarket.com` → branche `foundation-lcp-js-accessibility`
- `faab.blackmarket.com` → branche `foundation-lcp-js-responsive`
- `faba.blackmarket.com` → branche `foundation-lcp-caching-accessibility`
- `fabb.blackmarket.com` → branche `foundation-lcp-caching-responsive`
- `fbaa.blackmarket.com` → branche `foundation-cls-js-accessibility`
- `fbab.blackmarket.com` → branche `foundation-cls-js-responsive`
- `fbba.blackmarket.com` → branche `foundation-cls-caching-accessibility`
- `fbbb.blackmarket.com` → branche `foundation-cls-caching-responsive`

**Code :**
- `f` = foundation
- Position 1 : `a` = LCP, `b` = CLS
- Position 2 : `a` = JS, `b` = Caching
- Position 3 : `a` = Accessibility, `b` = Responsive

---

## Anti-Patterns (Baseline)

Liste complète disponible dans [`Liste_Anti-Patterns.md`](./Liste_Anti-Patterns.md).

**Résumé par catégorie :**

### HTML & Structure (résolus par Foundation)
- Divs partout (pas de `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Headings incohérents (h1, h3, h2 mélangés, plusieurs h1)
- Attributs `alt` manquants sur images
- Pas d'attribut `lang` sur `<html>`

### SEO & Métadonnées (résolus par Foundation)
- Balise `<title>` absente ou générique
- Pas de meta description
- Pas de favicon
- Pas de métadonnées Open Graph

### Core Web Vitals - LCP (résolus par Choix 1A)
- Images non optimisées (formats lourds, >500KB)
- Pas de formats modernes (WebP, AVIF)
- Images sans `width` et `height`
- Pas de `preload` pour ressources critiques
- Fonts sans `font-display: swap`

### Core Web Vitals - CLS (résolus par Choix 1B)
- Images sans dimensions → layout shift
- Fonts causant FOIT/FOUT
- Contenu dynamique sans espace réservé
- Embeds sans dimensions fixes

### JavaScript (résolus par Choix 2A)
- Bundle non tree-shaked
- Pas de code splitting
- Composants non lazy-loadés
- Scripts bloquants dans `<head>`

### Resources & Caching (résolus par Choix 2B)
- CSS/JS non minifiés
- Pas de compression (gzip/brotli)
- Pas de headers Cache-Control/ETag
- Pas de lazy loading images

### Accessibility (résolus par Choix 3A)
- Contraste insuffisant (<4.5:1)
- Labels manquants sur formulaires
- Pas de focus visible
- Liens non descriptifs
- Rôles ARIA manquants

### Responsive (résolus par Choix 3B)
- Viewport meta manquant/mal configuré
- Pas d'images responsive (srcset/sizes)
- Touch targets trop petits (<44px)
- Débordements horizontaux
- Texte trop petit sur mobile

### Nuxt Spécifique (Baseline)
- SSR mal configuré, hydration non optimisée
- Pas de payload extraction
- Pas de route pre-rendering
- Composants lourds chargés SSR inutilement

**Total : 34 anti-patterns**

---

## Optimisations par Étape

### Foundation (appliquée sur toutes les 16 branches optimisées)

**HTML sémantique :**
- Remplacement des divs par éléments sémantiques
- Structure de headings logique (h1 → h2 → h3)
- Attributs `alt` sur toutes les images
- Attribut `lang="fr"` sur `<html>`

**SEO & Métadonnées :**
- Balise `<title>` descriptive par page
- Meta description pertinente
- Favicon ajouté
- Métadonnées Open Graph complètes

### Choix 1A : Optimisation LCP

- Conversion images en WebP/AVIF
- Attributs `width` et `height` sur toutes les images
- `preload` pour hero image et fonts critiques
- `font-display: swap` sur les fonts

### Choix 1B : Correction CLS

- Attributs `width` et `height` sur toutes les images
- Optimisation chargement fonts (font-display, subset)
- Espaces réservés pour contenu dynamique
- Dimensions fixes pour embeds/publicités

### Choix 2A : Optimisation JavaScript

- Tree-shaking du bundle
- Code splitting par route
- Lazy loading des composants non critiques
- Scripts déplacés en fin de body ou avec `defer`

### Choix 2B : Resources & Caching

- Minification CSS et JavaScript
- Compression gzip/brotli activée
- Headers de cache configurés (Cache-Control, ETag)
- Lazy loading des images below the fold

### Choix 3A : Accessibility

- Amélioration des contrastes (ratio minimum 4.5:1)
- Labels ajoutés sur tous les champs de formulaire
- Focus visible sur éléments interactifs
- Liens avec texte descriptif
- Rôles ARIA appropriés

### Choix 3B : Responsive

- Viewport meta correctement configuré
- Images responsive avec `srcset` et `sizes`
- Touch targets agrandis (minimum 44px)
- Correction débordements horizontaux
- Taille de texte adaptée mobile

---

## Contenu de la Boutique

**Catégories de produits :**
- Crochets (hooks)
- Cache-œil (eye patches)
- Jambes de bois (peg legs)
- Perroquets (parrots)
- Chapeaux de pirates (tricorn hats)
- Sabres (sabers)
- Cartes au trésor (treasure maps)

**Pages principales :**
- Accueil (avec hero image)
- Liste de produits (grille/liste)
- Page produit individuelle
- Panier (optionnel - voir Points_Non_Resolus.md)
- À propos (optionnel - voir Points_Non_Resolus.md)

**Données :**
- JSON mockée (pas de vraie base de données)
- ~20-30 produits (nombre exact à définir dans Points_Non_Resolus.md)

---

## Configuration Nuxt

### Baseline

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // Activé mais mal optimisé
  // Pas de compression
  // Pas de minification
  // Waterfalls non optimisés
})
```

### Optimisé (variables selon les branches)

Exemple pour une branche avec optimisations caching :

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  experimental: {
    payloadExtraction: true
  },
  nitro: {
    compressPublicAssets: true
  },
  // + optimisations spécifiques selon la branche
})
```

---

## Design et Assets

**Thème :**
- Pirate/maritime cohérent avec les autres sites
- Couleurs : bleus marins, bruns bois, or
- Typographie thématique mais lisible

**Assets nécessaires :**
- Images de produits (peuvent être mockées/placeholder)
- Hero image lourde (pour tester LCP baseline)
- Logo BlackMarket
- Icônes (crochets, perroquets, etc.)

**Responsabilité design :** Voir Points_Non_Resolus.md

---

## Points d'Attention

- Les anti-patterns doivent être **volontaires et évidents** dans le code baseline
- Ajouter des commentaires `// ANTI-PATTERN:` pour faciliter l'identification
- Chaque anti-pattern doit avoir un **impact mesurable** sur Lighthouse
- Vérifier que la correction de chaque anti-pattern améliore le score correspondant
- Le contenu doit rester **identique** entre toutes les branches (seules les optimisations changent)
- Les 16 branches optimisées doivent être **cohérentes** dans leur structure
