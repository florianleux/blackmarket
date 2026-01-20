# Plan: BlackMarket Homepage - BackMarket Style (Pirate Theme)

## Overview
Implement a BackMarket-style e-commerce homepage for the BlackMarket app selling reconditioned pirate accessories. All labels in English, with intentional anti-patterns for Lighthouse Performance baseline.

> **FOCUS : Score Lighthouse Performance uniquement**
> Baseline cible : ~20-25

---

## ✅ STATUT : TERMINÉ

Tous les composants de la homepage ont été implémentés avec les anti-patterns Performance requis.

---

## Reference Structure (from BackMarket screenshot)

```
┌─────────────────────────────────────────────────────────┐
│ HEADER: Logo | Search Bar | Sell | Help | Account | Cart│
├─────────────────────────────────────────────────────────┤
│ CATEGORY NAV: Hooks | Eye Patches | Peg Legs | Parrots..│
├─────────────────────────────────────────────────────────┤
│ BREADCRUMB: Home > Pirate Gear > All Products           │
├─────────────────────────────────────────────────────────┤
│ TRUST BADGES: [Warranty] [Free Ship] [Returns] [Support]│
├─────────────────────────────────────────────────────────┤
│ PAGE HERO: "Reconditioned Pirate Gear" + description    │
├─────────────────────────────────────────────────────────┤
│ FILTER BAR: Category | Price | Condition | Rating | Sort│
├─────────────────────────────────────────────────────────┤
│ TRADE-IN   │  PRODUCT GRID (responsive)                 │
│ CARD       │  [Card] [Card] [Card]                      │
│            │  [Card] [Card] [Card]                      │
│            ├────────────────────────────────────────────┤
│            │  PROMO BANNER (full width)                 │
│            │  "Arrr-conditioned Goods"                  │
│            ├────────────────────────────────────────────┤
│            │  [Card] [Card] [Card] ...                  │
└────────────┴────────────────────────────────────────────┘
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

---

## Composants Implémentés

### ✅ Phase 1: Update Existing Components - TERMINÉ

| Composant | Fichier | Statut |
|-----------|---------|--------|
| TheHeader | `components/TheHeader.vue` | ✅ Logo, search, nav, categories |
| TheFooter | `components/TheFooter.vue` | ✅ Avec HTML anti-patterns |
| ProductCard | `components/ProductCard.vue` | ✅ Variants, badges, devises pirates |
| ProductGrid | `components/ProductGrid.vue` | ✅ Grid responsive avec slot |

### ✅ Phase 2: Create New Components - TERMINÉ

| Composant | Fichier | Statut |
|-----------|---------|--------|
| BreadcrumbNav | `components/BreadcrumbNav.vue` | ✅ Home > Pirate Gear > All |
| TrustBadges | `components/TrustBadges.vue` | ✅ 4 badges (guarantee, shipping, returns, support) |
| PageHero | `components/PageHero.vue` | ✅ "Reconditioned Pirate Gear" |
| FilterBar | `components/FilterBar.vue` | ✅ Category, Price, Condition, Sort |
| TradeInCard | `components/TradeInCard.vue` | ✅ "Trade Your Old Gear" promo |
| PromoBanner | `components/PromoBanner.vue` | ✅ "Arrr-conditioned Goods" |

### ✅ Phase 3: Homepage Assembly - TERMINÉ

| Page | Fichier | Statut |
|------|---------|--------|
| index.vue | `pages/index.vue` | ✅ Tous composants assemblés |

### ✅ Phase 4: Data - TERMINÉ

| Fichier | Statut |
|---------|--------|
| products.json | ✅ 20 produits, 7 catégories, devises pirates |
| useProducts.ts | ✅ Interface Product avec variants/condition |

### ✅ Phase 5: Styling - TERMINÉ

| Fichier | Statut |
|---------|--------|
| main.css | ✅ Fonts Pirata One + Pokoljaro, curseurs custom |
| tailwind.config.js | ✅ Couleurs BackMarket style |

---

## Anti-Patterns Performance Implémentés

### Images (Vote 1A)
- [x] Format PNG non optimisé (>200KB par image)
- [x] Pas de `width`/`height` sur les `<img>`
- [x] `loading="eager"` sur toutes les images
- [x] Pas de `srcset` / images responsive

### Fonts (Vote 1B)
- [x] Pas de `font-display: swap` sur @font-face
- [x] Pas de `preload` pour fonts critiques
- [x] Multiple fonts chargées (Google Fonts + local)
- [x] Pas de font subsetting (Pokoljaro.otf 43KB complet, pas de unicode-range)

### JavaScript (Vote 2A)
- [x] Script bloquant dans `<head>` (100ms delay)
- [x] `treeshakeClientOnly: false`
- [x] Librairies inutiles (lodash ~70KB + moment.js ~290KB)
- [x] Pas d'optimisation Nuxt

### Code Splitting (Vote 2B)
- [x] `payloadExtraction: false`
- [x] Composants non lazy-loadés
- [x] Pas de pré-rendu routes

### Compression (Vote 3A)
- [x] `compressPublicAssets: false`
- [x] `minify: false`

### Caching (Vote 3B)
- [x] Pas de `preconnect` (retiré)
- [x] Pas de `prefetch` / `preload`
- [x] Pas de headers cache
- [x] Pas de service worker

---

## Fichiers Créés/Modifiés

```
apps/blackmarket/
├── app.vue                           # ✅ + lodash/moment imports
├── nuxt.config.ts                    # ✅ Anti-patterns config
├── tailwind.config.js                # ✅ Couleurs custom
├── assets/
│   └── css/main.css                  # ✅ Fonts + curseurs
├── components/
│   ├── TheHeader.vue                 # ✅
│   ├── TheFooter.vue                 # ✅
│   ├── ProductCard.vue               # ✅
│   ├── ProductGrid.vue               # ✅
│   ├── BreadcrumbNav.vue             # ✅ NEW
│   ├── TrustBadges.vue               # ✅ NEW
│   ├── PageHero.vue                  # ✅ NEW
│   ├── FilterBar.vue                 # ✅ NEW
│   ├── TradeInCard.vue               # ✅ NEW
│   └── PromoBanner.vue               # ✅ NEW
├── composables/
│   └── useProducts.ts                # ✅
├── data/
│   └── products.json                 # ✅ 20 produits
├── pages/
│   └── index.vue                     # ✅ NEW
└── public/
    ├── fonts/Pokoljaro.otf           # ✅
    ├── images/
    │   ├── logo.png                  # ✅
    │   ├── cursors/                  # ✅ sword + hook
    │   └── products/                 # ✅ 20 PNG
    └── ...
```

---

## Vérification

- [x] `pnpm dev:blackmarket` - page s'affiche correctement
- [x] Structure correspond au layout BackMarket
- [x] Labels en anglais
- [x] Devises pirates (Doubloons, Diamonds, Pearls, etc.)
- [x] Fonts custom (Pirata One + Pokoljaro)
- [x] Curseurs custom (sword + hook)
- [ ] Score Lighthouse Performance <40 (à mesurer)

---

## Prochaine Étape

1. **Mesurer le score Lighthouse baseline**
2. **Créer la branche `baseline`** depuis main
3. **Créer les branches optimisées** (fa, fb, faa, etc.)
