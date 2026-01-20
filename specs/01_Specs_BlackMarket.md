# Spécifications - Application BlackMarket

## Vue d'Ensemble

Boutique en ligne d'accessoires de pirates reconditionnés (crochets, cache-œil, jambes de bois, perroquets, etc.), développée avec Nuxt 3 + Vue 3. Sert de base pour démontrer les optimisations frontend et les améliorations du score **Lighthouse Performance**.

**Jeu de mots :** BlackMarket = BackMarket (pirate/reconditionnés)

---

## Focus : Score Performance

> **Décision** : On se concentre uniquement sur le score **Performance** de Lighthouse.
>
> - Baseline cible : ~20-25
> - Objectif final : ~85-95
> - Les autres scores (Accessibility, Best Practices, SEO) ne sont pas l'objet des votes

---

## Technologies

- **Framework :** Nuxt 3
- **Frontend :** Vue 3 + TypeScript
- **Styling :** Tailwind CSS
- **SSR :** Activé (mais mal configuré dans la baseline)
- **Hébergement :** Netlify avec sous-domaines

---

## Structure des Votes

### 3 Votes = 6 Options

| Vote | Thème | Option A | Option B |
|------|-------|----------|----------|
| **Vote 1** | LCP | 🖼️ Images | 🔤 Fonts |
| **Vote 2** | TBT | ⚡ JavaScript | 📦 Code Splitting |
| **Vote 3** | Network | 🗜️ Compression | 💾 Caching |

---

## Structure de Branches Git (15 branches)

Les branches représentent la **progression cumulative** des fixes à chaque étape.

### Arbre des branches

```
baseline                    # Tous les anti-patterns (~20-25)
│
├── fa                      # Vote 1 → Images (~35-40)
│   ├── faa                 # + Vote 2 → JavaScript (~55-60)
│   │   ├── faaa            # + Vote 3 → Compression (~85-95)
│   │   └── faab            # + Vote 3 → Caching (~85-95)
│   └── fab                 # + Vote 2 → Code Splitting (~55-60)
│       ├── faba            # + Vote 3 → Compression (~85-95)
│       └── fabb            # + Vote 3 → Caching (~85-95)
│
└── fb                      # Vote 1 → Fonts (~35-40)
    ├── fba                 # + Vote 2 → JavaScript (~55-60)
    │   ├── fbaa            # + Vote 3 → Compression (~85-95)
    │   └── fbab            # + Vote 3 → Caching (~85-95)
    └── fbb                 # + Vote 2 → Code Splitting (~55-60)
        ├── fbba            # + Vote 3 → Compression (~85-95)
        └── fbbb            # + Vote 3 → Caching (~85-95)
```

### Liste complète des branches

| Branche | Fixes appliqués | Score estimé |
|---------|-----------------|--------------|
| `baseline` | Aucun (tous anti-patterns) | ~20-25 |
| `fa` | Images | ~35-40 |
| `fb` | Fonts | ~35-40 |
| `faa` | Images + JavaScript | ~55-60 |
| `fab` | Images + Code Splitting | ~55-60 |
| `fba` | Fonts + JavaScript | ~55-60 |
| `fbb` | Fonts + Code Splitting | ~55-60 |
| `faaa` | Images + JavaScript + Compression | ~85-95 |
| `faab` | Images + JavaScript + Caching | ~85-95 |
| `faba` | Images + Code Splitting + Compression | ~85-95 |
| `fabb` | Images + Code Splitting + Caching | ~85-95 |
| `fbaa` | Fonts + JavaScript + Compression | ~85-95 |
| `fbab` | Fonts + JavaScript + Caching | ~85-95 |
| `fbba` | Fonts + Code Splitting + Compression | ~85-95 |
| `fbbb` | Fonts + Code Splitting + Caching | ~85-95 |

**Total : 15 branches** (1 baseline + 2 + 4 + 8)

### Sous-domaines Netlify

Chaque branche a son sous-domaine :
- `baseline.blackmarket.com`
- `fa.blackmarket.com`
- `fb.blackmarket.com`
- `faa.blackmarket.com`
- ... etc.

---

## Anti-Patterns Baseline

Voir [`Liste_Anti-Patterns.md`](./Liste_Anti-Patterns.md) pour la liste complète.

### Résumé par Catégorie

| Catégorie | Anti-Patterns | Corrigé par |
|-----------|---------------|-------------|
| Images | 4 | Vote 1A |
| Fonts | 4 | Vote 1B |
| JavaScript | 4 | Vote 2A |
| Code Splitting | 4 | Vote 2B |
| Compression | 4 | Vote 3A |
| Caching | 4 | Vote 3B |
| **Total** | **24** | - |

---

## Optimisations par Vote

### Vote 1A : Images (LCP)

**Fixes appliqués :**
- Conversion images en WebP
- Ajout attributs `width` et `height`
- `loading="lazy"` pour images below-fold
- Ajout `srcset` pour images responsive

**Impact attendu :** +15-20 points Performance

### Vote 1B : Fonts (LCP)

**Fixes appliqués :**
- `font-display: swap` sur toutes les fonts
- `preload` pour fonts critiques
- Réduction des variantes Google Fonts
- Font subsetting (caractères utilisés uniquement)

**Impact attendu :** +10-15 points Performance

### Vote 2A : JavaScript (TBT)

**Fixes appliqués :**
- `defer` sur tous les scripts
- Tree-shaking activé
- Suppression librairies inutiles
- `treeshakeClientOnly: true`

**Impact attendu :** +15-20 points Performance

### Vote 2B : Code Splitting (TBT)

**Fixes appliqués :**
- Code splitting par route
- `defineAsyncComponent` pour composants lourds
- `payloadExtraction: true`
- Pré-rendu des routes statiques

**Impact attendu :** +10-15 points Performance

### Vote 3A : Compression

**Fixes appliqués :**
- `compressPublicAssets: true`
- Minification CSS/JS activée
- Purge CSS (Tailwind)
- Minification HTML

**Impact attendu :** +10-15 points Performance

### Vote 3B : Caching

**Fixes appliqués :**
- Headers `Cache-Control` configurés
- `preconnect` pour domaines externes
- `preload` ressources critiques
- Service worker basique

**Impact attendu :** +10-15 points Performance

---

## Objectifs de Score

| Étape | Performance | Gain |
|-------|-------------|------|
| Baseline | ~20-25 | - |
| Après Vote 1 | ~35-40 | +15-20 |
| Après Vote 2 | ~55-60 | +15-20 |
| Après Vote 3 | ~85-95 | +25-35 |

---

## Configuration Nuxt

### Baseline (Anti-Patterns)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,

  // ANTI-PATTERN: Pas de compression
  nitro: {
    compressPublicAssets: false,
    minify: false,
  },

  // ANTI-PATTERN: Pas d'optimisation
  experimental: {
    payloadExtraction: false,
    treeshakeClientOnly: false,
  },

  // ANTI-PATTERN: Pas de preconnect, pas de preload
  app: {
    head: {
      // Intentionnellement vide
    },
  },
})
```

### Optimisé (Exemple avec tous les fixes)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  experimental: {
    payloadExtraction: true,
    treeshakeClientOnly: true,
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preload', as: 'font', href: '/fonts/main.woff2', crossorigin: '' },
      ],
    },
  },

  // Image optimization
  image: {
    format: ['webp'],
    quality: 80,
  },
})
```

---

## Contenu de la Boutique

**Catégories de produits :**
- Hooks (crochets)
- Eye Patches (cache-œil)
- Peg Legs (jambes de bois)
- Parrots (perroquets)
- Hats (chapeaux)
- Swords (sabres)
- Maps (cartes au trésor)

**Pages :**
- Homepage (grille de produits)

**Données :**
- 20 produits mockés en JSON
- Devises pirates (Doubloons, Diamonds, Pearls, etc.)

---

## Points d'Attention

1. **Anti-patterns volontaires**
   - Commenter avec `// ANTI-PATTERN:`
   - Documenter l'impact attendu

2. **Mesure des scores**
   - Utiliser Lighthouse en mode mobile
   - Faire plusieurs runs pour moyenner

3. **Cohérence des branches**
   - Le contenu reste identique entre branches
   - Seules les optimisations changent

4. **Images produits**
   - PNG lourds (~200KB+) dans baseline
   - WebP optimisés (~30KB) dans branches fixées
