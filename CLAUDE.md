# Claude.md - Documentation Lighthouse Pirates

Point d'entrée pour comprendre le projet **Lighthouse Pirates** - Une présentation interactive où l'audience vote pour optimiser les **4 scores Lighthouse** d'une application Vue.js/Nuxt.

> **4 Votes = 4 Catégories Lighthouse**
> - Performance, Accessibility, Best Practices, SEO
> - 4 votes binaires = 31 branches progressives
> - 40 anti-patterns HIGH impact (10 par catégorie)

---

## Architecture - 2 Repositories

```
~/code/lighthouse/                    # Dossier parent (ouvrir dans Cursor)
│
├── specs/                            # Documentation partagée
│
├── lighthouse-presentation/          # Repo 1 - Mono-repo pnpm
│   ├── apps/presentation/            # Site projeté en salle
│   ├── apps/vote/                    # App mobile participants
│   └── shared/                       # Code partagé (types, avatars)
│
└── blackmarket/                      # Repo 2 - App Nuxt standalone
    └── ...                           # 31 branches Git
```

**Pourquoi 2 repos ?**
- BlackMarket a **31 branches** (baseline + 30 optimisées)
- Presentation/Vote n'ont qu'une **branche main**
- Les specs sont dans le dossier parent, partagées entre les deux repos

---

## Documentation - Ordre de Lecture

### 1. Comprendre le Concept
**[`specs/Concept_et_Vision.md`](./specs/Concept_et_Vision.md)**
- Le pitch : présentation interactive avec vote en temps réel
- Métaphore du phare et thème pirate

**[`specs/Structure_Presentation.md`](./specs/Structure_Presentation.md)**
- Flow global des slides (32 slides)
- 4 boucles de choix

**[`specs/Conducteur_Tableaux.md`](./specs/Conducteur_Tableaux.md)**
- Tableau détaillé slide par slide
- Options A/B pour chaque vote

### 2. Architecture Technique
**[`specs/00_Specs_Techniques_Generales.md`](./specs/00_Specs_Techniques_Generales.md)**
- Architecture 2 repos
- Communication Ably
- Persistence LocalStorage

### 3. Spécifications par Application
**[`specs/01_Specs_BlackMarket.md`](./specs/01_Specs_BlackMarket.md)**
- App Nuxt 3 standalone
- 31 branches Git
- Anti-patterns par vote

**[`specs/02_Specs_Site_Presentation.md`](./specs/02_Specs_Site_Presentation.md)**
- Navigation slides
- Système de vote
- Panel admin

**[`specs/03_Specs_Site_Vote.md`](./specs/03_Specs_Site_Vote.md)**
- Création d'avatar
- Interface de vote mobile

### 4. Détails Techniques
**[`specs/Liste_Anti-Patterns.md`](./specs/Liste_Anti-Patterns.md)**
- 40 anti-patterns (10 par catégorie)
- Organisés par vote et option A/B

---

## Structure des 4 Votes

| Vote | Catégorie | Option A | Option B |
|------|-----------|----------|----------|
| **1** | Performance | Images & Transfer | Fonts & JavaScript |
| **2** | Accessibility | Visual | Semantic |
| **3** | Best Practices | Console & Security | Modern Standards |
| **4** | SEO | Meta & Structure | Content & Links |

---

## Commandes par Repo

### lighthouse-presentation
```bash
cd lighthouse-presentation
pnpm install
pnpm dev:presentation
pnpm dev:vote
```

### blackmarket
```bash
cd blackmarket
pnpm install
pnpm dev
```

---

## Lien entre les repos

- **Aucun lien Git** (pas de submodule)
- BlackMarket est affiché en **iframe** dans la présentation
- URL : `https://{branch}.blackmarket.com`
