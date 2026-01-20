# Claude.md - Documentation Lighthouse Pirates

Point d'entrée pour comprendre le projet **Lighthouse Pirates** - Une présentation interactive où l'audience vote pour optimiser le score **Performance** d'une application Vue.js/Nuxt.

> **FOCUS : Score Lighthouse Performance uniquement**
> - Baseline : ~20-25
> - Objectif : ~85-95
> - 3 votes binaires = 15 branches progressives

---

## 📚 Documentation - Ordre de Lecture

### 1. Comprendre le Concept
**[`specs/Concept_et_Vision.md`](./specs/Concept_et_Vision.md)**
- Le pitch : présentation interactive avec vote en temps réel
- Métaphore du phare et thème pirate
- Structure en 3 votes
- Approche pédagogique

**[`specs/Structure_Presentation.md`](./specs/Structure_Presentation.md)**
- Flow global des slides
- 3 boucles de choix (dilemme → détails → vote → résultat)
- Visualisation du phare (progression par étages)

### 2. Architecture Technique

**[`specs/00_Specs_Techniques_Generales.md`](./specs/00_Specs_Techniques_Generales.md)** ⭐ **COMMENCER ICI**
- Architecture mono-repo pnpm
- Technologies (Nuxt 3, Ably, Netlify)
- Communication Ably (channels, messages)
- Persistence LocalStorage

### 3. Spécifications par Application

**[`specs/01_Specs_BlackMarket.md`](./specs/01_Specs_BlackMarket.md)** ⭐ **IMPORTANT**
- Focus Performance uniquement
- 15 branches Git progressives
- Anti-patterns (24 au total - détails dans Liste_Anti-Patterns.md)
- Structure des 3 votes et options
- Configuration Nuxt baseline vs optimisée

**[`specs/02_Specs_Site_Presentation.md`](./specs/02_Specs_Site_Presentation.md)**
- Navigation de slides
- Système de vote (timer, affichage temps réel)
- Scores Lighthouse (affichage selon branche)

**[`specs/03_Specs_Site_Vote.md`](./specs/03_Specs_Site_Vote.md)**
- Création d'avatar
- Interface de vote (2 boutons A/B, timer)
- Communication Ably

### 4. Détails Techniques

**[`specs/Liste_Anti-Patterns.md`](./specs/Liste_Anti-Patterns.md)** ⭐ **IMPORTANT**
- 24 anti-patterns Performance à implémenter dans la baseline
- Organisés par vote (Images, Fonts, JS, Splitting, Compression, Caching)
- Quelle option fixe quel anti-pattern

---

## 🏗️ Structure du Projet

```
lighthouse/
├── apps/
│   ├── blackmarket/          # Nuxt 3 (15 branches Git)
│   ├── presentation/         # Site de présentation
│   └── vote/                 # Site de vote mobile
├── specs/                    # Documentation
├── shared/
│   ├── types.ts              # Types partagés
│   └── constants.ts          # Constantes
├── pnpm-workspace.yaml
└── CLAUDE.md                 # ← Ce fichier
```

---

## 🔑 Points Clés

### Structure des Votes (Performance)

| Vote | Thème | Option A | Option B |
|------|-------|----------|----------|
| **Vote 1** | LCP | 🖼️ Images | 🔤 Fonts |
| **Vote 2** | TBT | ⚡ JavaScript | 📦 Code Splitting |
| **Vote 3** | Network | 🗜️ Compression | 💾 Caching |

### Structure des Branches (15 branches)

Les branches représentent la **progression cumulative** à chaque vote.

```
baseline                    # Tous les anti-patterns (~20-25)
├── fa                      # Vote 1 → Images (~35-40)
│   ├── faa                 # + Vote 2 → JavaScript (~55-60)
│   │   ├── faaa            # + Vote 3 → Compression (~85-95)
│   │   └── faab            # + Vote 3 → Caching (~85-95)
│   └── fab                 # + Vote 2 → Code Splitting (~55-60)
│       ├── faba            # + Vote 3 → Compression (~85-95)
│       └── fabb            # + Vote 3 → Caching (~85-95)
└── fb                      # Vote 1 → Fonts (~35-40)
    ├── fba                 # + Vote 2 → JavaScript (~55-60)
    │   ├── fbaa            # + Vote 3 → Compression (~85-95)
    │   └── fbab            # + Vote 3 → Caching (~85-95)
    └── fbb                 # + Vote 2 → Code Splitting (~55-60)
        ├── fbba            # + Vote 3 → Compression (~85-95)
        └── fbbb            # + Vote 3 → Caching (~85-95)
```

**Nomenclature :**
- `f` = préfixe (fixes)
- Position 1 : `a` = Images, `b` = Fonts
- Position 2 : `a` = JavaScript, `b` = Code Splitting
- Position 3 : `a` = Compression, `b` = Caching

### Objectifs de Score Performance

| Étape | Score |
|-------|-------|
| Baseline | ~20-25 |
| Après Vote 1 | ~35-40 |
| Après Vote 2 | ~55-60 |
| Après Vote 3 | ~85-95 |

---

## 🎯 Commandes Essentielles

```bash
# Installation
pnpm install

# Développement
pnpm dev:blackmarket
pnpm dev:presentation
pnpm dev:vote

# Build
pnpm build:all

# Mesure Lighthouse
pnpm measure:lighthouse
```

---

## 📊 Anti-Patterns par Vote

| Vote | Option | Anti-Patterns | Fixes |
|------|--------|---------------|-------|
| 1 | A - Images | 4 | WebP, dimensions, lazy, srcset |
| 1 | B - Fonts | 4 | swap, preload, subset |
| 2 | A - JavaScript | 4 | defer, tree-shake, clean deps |
| 2 | B - Splitting | 4 | code split, async components |
| 3 | A - Compression | 4 | gzip, minify CSS/JS/HTML |
| 3 | B - Caching | 4 | Cache-Control, preconnect |
| **Total** | - | **24** | - |

---

## 💡 Workflow de Développement

1. **Lire** [`specs/01_Specs_BlackMarket.md`](./specs/01_Specs_BlackMarket.md) pour comprendre la structure des votes
2. **Référencer** [`specs/Liste_Anti-Patterns.md`](./specs/Liste_Anti-Patterns.md) pour les anti-patterns à implémenter
3. **Vérifier** le score Lighthouse après chaque modification
4. **Commiter** sur la branche appropriée

---

**Note :** Le focus est uniquement sur le score **Performance** de Lighthouse. Les autres scores (Accessibility, Best Practices, SEO) ne sont pas l'objet des votes.
