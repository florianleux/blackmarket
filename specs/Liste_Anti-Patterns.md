# Liste des Anti-Patterns - BlackMarket Baseline

> **FOCUS : Score Performance uniquement**
>
> Cette liste répertorie tous les anti-patterns à implémenter **volontairement** dans la branche baseline de BlackMarket pour obtenir un score Lighthouse Performance très bas (~20-25). Ces anti-patterns sont ensuite corrigés progressivement à travers les 3 votes de l'audience.

---

## Vue d'Ensemble des Votes

| Vote | Option A | Option B |
|------|----------|----------|
| **Vote 1** | Images (LCP) | Fonts (LCP) |
| **Vote 2** | JavaScript (TBT) | Code Splitting (TBT) |
| **Vote 3** | Compression | Caching |

---

## Anti-Patterns Images
**Corrigés par : Vote 1 - Option A**

- [x] **Images non optimisées**
  - Formats lourds (PNG non compressés)
  - Pas de formats modernes (WebP, AVIF)
  - Tailles de fichier importantes (>200KB par image produit)
  - 📍 `products.json` - toutes les images en `.png`

- [x] **Images sans attributs `width` et `height`**
  - Pas de dimensions spécifiées dans le HTML
  - Cause des layout shifts pendant le chargement
  - 📍 `ProductCard.vue:4-9` - `<img>` sans dimensions

- [x] **Pas de lazy loading**
  - `loading="eager"` sur toutes les images
  - Images below-the-fold chargées immédiatement
  - 📍 `ProductCard.vue:8` - `loading="eager"`

- [x] **Pas de `srcset` / images responsive**
  - Même image lourde servie sur mobile et desktop
  - Pas d'optimisation selon la taille d'écran
  - 📍 `ProductCard.vue` - une seule source d'image

---

## Anti-Patterns Fonts
**Corrigés par : Vote 1 - Option B**

- [x] **Fonts sans `font-display: swap`**
  - Fonts chargées avec comportement par défaut
  - Texte invisible pendant le chargement (FOIT)
  - 📍 `main.css:6-11` - @font-face sans font-display

- [x] **Pas de `preload` pour fonts critiques**
  - Fonts découvertes tardivement par le navigateur
  - Délai avant affichage du texte
  - 📍 `nuxt.config.ts` - pas de preload pour Pokoljaro

- [x] **Multiple fichiers de fonts**
  - Chargement de plusieurs weights/styles non utilisés
  - Google Fonts avec trop de variantes
  - 📍 Google Fonts (Pirata One) + local (Pokoljaro)

- [x] **Pas de font subsetting**
  - Fichiers fonts complets avec tous les glyphes
  - Taille inutilement grande
  - 📍 `Pokoljaro.otf` (43KB complet) + `main.css` sans unicode-range

---

## Anti-Patterns JavaScript
**Corrigés par : Vote 2 - Option A**

- [x] **Scripts bloquants dans `<head>`**
  - JavaScript sans `defer` ou `async`
  - Bloque le parsing HTML
  - Ralentit le First Contentful Paint
  - 📍 `nuxt.config.ts` - script synchrone avec délai 100ms

- [x] **Bundle non tree-shaked**
  - Toutes les dépendances importées même si non utilisées
  - Code mort inclus dans le bundle
  - 📍 `nuxt.config.ts:27` - `treeshakeClientOnly: false`

- [x] **Librairies inutiles**
  - Import de librairies lourdes pour des fonctions simples
  - Lodash complet au lieu de fonctions natives
  - 📍 `app.vue` - lodash (~70KB) + moment.js (~290KB) importés mais non utilisés

- [x] **Pas d'optimisation Nuxt**
  - `treeshakeClientOnly: false`
  - Hydration non optimisée
  - 📍 `nuxt.config.ts:26-27`

---

## Anti-Patterns Code Splitting
**Corrigés par : Vote 2 - Option B**

- [x] **Pas de code splitting**
  - Un seul gros fichier JavaScript
  - Tout chargé même pour la page d'accueil
  - 📍 Configuration Nuxt par défaut (baseline)

- [x] **Composants non lazy-loadés**
  - Tous les composants chargés au démarrage
  - Pas d'imports dynamiques (`defineAsyncComponent`)
  - 📍 `index.vue` - imports directs

- [x] **Pas de payload extraction**
  - `experimental.payloadExtraction: false`
  - Données dupliquées client/serveur
  - 📍 `nuxt.config.ts:26`

- [x] **Routes non pré-rendues**
  - Toutes les routes en SSR dynamique
  - Pas de génération statique
  - 📍 Configuration Nuxt (pas de prerender)

---

## Anti-Patterns Compression
**Corrigés par : Vote 3 - Option A**

- [x] **Pas de compression serveur**
  - `nitro.compressPublicAssets: false`
  - Pas de gzip ou brotli activé
  - 📍 `nuxt.config.ts:15`

- [x] **CSS et JavaScript non minifiés**
  - `nitro.minify: false`
  - Fichiers avec espaces, commentaires
  - 📍 `nuxt.config.ts:16`

- [x] **Assets non optimisés**
  - CSS avec code mort
  - Pas de purge Tailwind (si applicable)
  - 📍 Configuration Tailwind par défaut

- [x] **HTML non minifié**
  - Espaces et retours à la ligne conservés
  - Commentaires HTML présents
  - 📍 Conséquence de `minify: false`

---

## Anti-Patterns Caching
**Corrigés par : Vote 3 - Option B**

- [x] **Pas de headers de cache**
  - Pas de `Cache-Control` configuré
  - Pas d'ETag
  - Ressources rechargées à chaque visite
  - 📍 Pas de configuration Nitro pour cache

- [x] **Pas de `preconnect`**
  - Connexions aux domaines externes non anticipées
  - Google Fonts, CDN, etc.
  - 📍 `nuxt.config.ts` - preconnect retiré, Google Fonts chargé sans optimisation

- [x] **Pas de `prefetch` / `preload`**
  - Ressources critiques non priorisées
  - Découverte tardive des assets
  - 📍 Pas de preload configuré

- [x] **Pas de service worker**
  - Pas de mise en cache côté client
  - Pas de stratégie offline
  - 📍 Non implémenté (correct pour baseline)

---

## Résumé par Vote

| Vote | Option | Anti-Patterns | Implémentés | Impact Performance |
|------|--------|---------------|-------------|-------------------|
| Vote 1 | A - Images | 4 | 4/4 ✅ | LCP +15-20 pts |
| Vote 1 | B - Fonts | 4 | 4/4 ✅ | LCP +10-15 pts |
| Vote 2 | A - JavaScript | 4 | 4/4 ✅ | TBT +15-20 pts |
| Vote 2 | B - Code Splitting | 4 | 4/4 ✅ | TBT +10-15 pts |
| Vote 3 | A - Compression | 4 | 4/4 ✅ | Transfert +10-15 pts |
| Vote 3 | B - Caching | 4 | 4/4 ✅ | TTFB +10-15 pts |
| **Total** | - | **24** | **24/24** ✅ | **~60-70 pts** |

---

## Actions Restantes

✅ **Tous les anti-patterns sont implémentés (24/24)**

Baseline prêt pour mesure Lighthouse.

---

## Objectifs de Score

| Étape | Score Performance |
|-------|-------------------|
| Baseline (tous anti-patterns) | ~20-25 |
| Après Vote 1 | ~35-40 |
| Après Vote 2 | ~55-60 |
| Après Vote 3 | ~85-95 |

---

## Notes d'Implémentation

1. **Commentaires dans le code**
   - Ajouter `// ANTI-PATTERN:` pour faciliter l'identification
   - Documenter l'impact attendu de chaque anti-pattern

2. **Vérification**
   - Chaque anti-pattern doit avoir un impact mesurable sur Lighthouse
   - Tester avant/après pour valider les gains

3. **Branches Git (15 total)**
   - `baseline` : Tous les anti-patterns actifs
   - `fa`, `fb` : Après Vote 1
   - `faa`, `fab`, `fba`, `fbb` : Après Vote 2
   - `faaa`, `faab`, `faba`, `fabb`, `fbaa`, `fbab`, `fbba`, `fbbb` : Après Vote 3
