# Claude.md - Documentation Lighthouse Pirates

Point d'entrée pour comprendre le projet **Lighthouse Pirates** - Une présentation interactive où l'audience vote pour optimiser les **4 scores Lighthouse** d'une application Vue.js/Nuxt.

> **4 Votes = 4 Catégories Lighthouse**
> - Performance, Accessibility, Best Practices, SEO
> - 4 votes binaires = 31 branches progressives
> - 40 anti-patterns HIGH impact (10 par catégorie)

---

## 📚 Documentation - Ordre de Lecture

### 1. Comprendre le Concept
**[`specs/Concept_et_Vision.md`](./specs/Concept_et_Vision.md)**
- Le pitch : présentation interactive avec vote en temps réel
- Métaphore du phare et thème pirate
- Structure en 4 votes
- Approche pédagogique

**[`specs/Structure_Presentation.md`](./specs/Structure_Presentation.md)**
- Flow global des slides
- 4 boucles de choix (dilemme → détails → vote → résultat)
- Visualisation du phare (progression par étages)

### 2. Architecture Technique

**[`specs/00_Specs_Techniques_Generales.md`](./specs/00_Specs_Techniques_Generales.md)** ⭐ **COMMENCER ICI**
- Architecture mono-repo pnpm
- Technologies (Nuxt 3, Ably, Netlify)
- Communication Ably (channels, messages)
- Persistence LocalStorage

### 3. Spécifications par Application

**[`specs/01_Specs_BlackMarket.md`](./specs/01_Specs_BlackMarket.md)** ⭐ **IMPORTANT**
- 4 catégories Lighthouse
- 31 branches Git progressives
- Anti-patterns (40 au total - détails dans Liste_Anti-Patterns.md)
- Structure des 4 votes et options

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
- 40 anti-patterns HIGH impact (10 par catégorie)
- Organisés par vote et option A/B
- Quelle option fixe quel anti-pattern

---

## 🏗️ Structure du Projet

```
lighthouse/
├── apps/
│   ├── blackmarket/          # Nuxt 3 (31 branches Git)
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

### Structure des 4 Votes

| Vote | Catégorie | Option A (5 fixes) | Option B (5 fixes) |
|------|-----------|--------------------|--------------------|
| **Vote 1** | Performance | Images & Transfer (LCP/CLS) | Fonts & JavaScript (FCP/TBT) |
| **Vote 2** | Accessibility | Visual (contrast, focus, labels) | Semantic (buttons, landmarks, headings) |
| **Vote 3** | Best Practices | Console & Security | Modern Web Standards |
| **Vote 4** | SEO | Meta & Structure | Content & Links |

### Structure des Branches (31 branches)

Les branches représentent la **progression cumulative** à chaque vote.

```
baseline                    # Tous les anti-patterns
├── a                       # Vote 1 → Performance A (Images)
│   ├── aa                  # + Vote 2 → Accessibility A (Visual)
│   │   ├── aaa             # + Vote 3 → Best Practices A (Console)
│   │   │   ├── aaaa        # + Vote 4 → SEO A (Meta)
│   │   │   └── aaab        # + Vote 4 → SEO B (Links)
│   │   └── aab             # + Vote 3 → Best Practices B (Standards)
│   │       ├── aaba
│   │       └── aabb
│   └── ab                  # + Vote 2 → Accessibility B (Semantic)
│       ├── aba
│       │   ├── abaa
│       │   └── abab
│       └── abb
│           ├── abba
│           └── abbb
└── b                       # Vote 1 → Performance B (Fonts)
    └── ... (same structure)
```

**Nomenclature :**
- Position 1 : `a` = Performance A, `b` = Performance B
- Position 2 : `a` = Accessibility A, `b` = Accessibility B
- Position 3 : `a` = Best Practices A, `b` = Best Practices B
- Position 4 : `a` = SEO A, `b` = SEO B

**Total : 1 baseline + 2 + 4 + 8 + 16 = 31 branches**

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

## 📊 Anti-Patterns par Vote (40 total)

| Vote | Catégorie | Option A | Option B |
|------|-----------|----------|----------|
| 1 | Performance | Heavy images, no lazy, no dimensions, blocking CSS, no compression | No font-display, blocking fonts, unused libs, third-party scripts, no preconnect |
| 2 | Accessibility | Low contrast, no focus, no labels, empty buttons, auto-play | Div as button, no lang, no skip link, keyboard trap, heading levels |
| 3 | Best Practices | console.log, no noopener, document.write, errors, vulnerable libs | Wrong image size, no doctype, permission abuse, no passive, source maps |
| 4 | SEO | No title, no description, no h1, no viewport, no canonical | Generic link text, no alt, noindex, JS navigation, redirect chains |

---

## 💡 Workflow de Développement

1. **Lire** [`specs/01_Specs_BlackMarket.md`](./specs/01_Specs_BlackMarket.md) pour comprendre la structure des votes
2. **Référencer** [`specs/Liste_Anti-Patterns.md`](./specs/Liste_Anti-Patterns.md) pour les anti-patterns à implémenter
3. **Vérifier** les scores Lighthouse après chaque modification
4. **Commiter** sur la branche appropriée

---

**Note :** Les 4 votes couvrent les 4 catégories Lighthouse : Performance, Accessibility, Best Practices, SEO.
