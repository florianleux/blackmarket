# Claude.md - Documentation Lighthouse Pirates

Point d'entrée pour comprendre le projet **Lighthouse Pirates** - Une présentation interactive où l'audience vote pour optimiser une application Vue.js/Nuxt.

---

## 📚 Documentation - Ordre de Lecture

### 1. Comprendre le Concept
**[`Concept_et_Vision.md`](./Concept_et_Vision.md)**
- Le pitch : présentation interactive avec vote en temps réel
- Métaphore du phare et thème pirate
- Structure en 4 étapes (Foundation + 3 choix)
- Approche pédagogique

**[`Structure_Presentation.md`](./Structure_Presentation.md)**
- Flow global des 25-30 slides
- 3 boucles de choix (dilemme → détails → vote → résultat)
- Visualisation du phare (progression par étages)
- États de session et timing

### 2. Architecture Technique

**[`00_Specs_Techniques_Generales.md`](./00_Specs_Techniques_Generales.md)** ⭐ **COMMENCER ICI**
- Architecture mono-repo pnpm
- Technologies (Nuxt 3, Ably, Netlify)
- Déploiement BlackMarket (17 sous-domaines)
- Mesure des scores Lighthouse
- Communication Ably (channels, messages)
- Persistence LocalStorage
- Système d'avatars
- Panel admin et fallbacks

### 3. Spécifications par Application

**[`01_Specs_BlackMarket.md`](./01_Specs_BlackMarket.md)**
- 17 branches Git (1 baseline + 16 optimisées)
- Nomenclature branches et sous-domaines
- Anti-patterns par catégorie (34 au total - détails dans Liste_Anti-Patterns.md)
- Optimisations par étape (Foundation, LCP/CLS, JS/Caching, A11y/Responsive)
- Configuration Nuxt baseline vs optimisée

**[`02_Specs_Site_Presentation.md`](./02_Specs_Site_Presentation.md)**
- Navigation de slides (25-30 slides)
- Système de vote (timer 45s, affichage temps réel)
- Visualisation du phare (4 étages)
- Affichage des avatars (équipage registered vs active)
- Scores Lighthouse (affichage et sélection selon path)
- Communication Ably (envoi/réception messages)
- Panel admin (touche K)
- Persistence LocalStorage

**[`03_Specs_Site_Vote.md`](./03_Specs_Site_Vote.md)**
- Création d'avatar (729 combinaisons)
- 3 états : waiting, voting, closed
- Interface de vote (2 boutons A/B, timer)
- Communication Ably (vote-cast, heartbeat-response)
- Persistence LocalStorage (reconnexion automatique)

### 4. Détails Techniques

**[`Liste_Anti-Patterns.md`](./Liste_Anti-Patterns.md)**
- 34 anti-patterns à implémenter volontairement dans la baseline
- Organisés par catégorie (HTML, SEO, LCP, CLS, JS, Caching, A11y, Responsive, Nuxt)
- Quelle étape résout quel anti-pattern

**[`Points_Non_Resolus.md`](./Points_Non_Resolus.md)**
- Questions techniques restant à décider
- Priorités : Haute (assets avatars, techno phare), Moyenne (navigation, UX), Basse (design, animations)

---

## 🏗️ Structure du Projet

```
lighthouse-pirates/
├── apps/
│   ├── blackmarket/          # Nuxt 3 (17 branches Git)
│   ├── presentation/         # Site de présentation
│   └── vote/                 # Site de vote mobile
├── shared/
│   ├── types.ts              # Types partagés (messages Ably, avatars)
│   ├── constants.ts          # Constantes (channels, états)
│   └── avatars/              # Génération et rendu d'avatars
├── scripts/
│   └── measure-lighthouse.sh # Mesure des 17 sous-domaines
├── pnpm-workspace.yaml
├── package.json
└── claude.md                 # ← Ce fichier
```

---

## 🔑 Points Clés

### Architecture
- **Mono-repo pnpm** : 3 apps + code partagé
- **17 branches Git** dans BlackMarket (1 baseline + 16 combinaisons)
- **17 sous-domaines** sur `blackmarket.com`

### Nomenclature
**Branches :** `foundation-<choix1>-<choix2>-<choix3>`
- Exemple : `foundation-lcp-js-accessibility`

**Sous-domaines :** `f` + `a/b` + `a/b` + `a/b`
- `f` = foundation
- Position 1 : `a` = LCP, `b` = CLS
- Position 2 : `a` = JS, `b` = Caching
- Position 3 : `a` = Accessibility, `b` = Responsive
- Exemple : `faaa.blackmarket.com` = Foundation + LCP + JS + Accessibility

### Communication (Ably)
**Channel :** `lighthouse-presentation`

**Messages clés :**
- Présentation → Vote : `session-state` (waiting/voting/closed), `heartbeat-request`
- Vote → Présentation : `avatar-created`, `vote-cast`, `heartbeat-response`

### Persistence
**Présentation :** LocalStorage complet (slides, votes, équipage, choix) - résiste au refresh
**Vote :** LocalStorage minimal (userId, pseudo, avatarCode) - reconnexion auto

### Avatars
- **729 combinaisons** : 9 bases × 3 chapeaux × 3 yeux × 3 bouches × 3 accessoires
- **Format code :** `"mw2132"` ou `"m-white-hat2-eyes1-mouth3-acc2"`
- **Localisation :** `shared/avatars/`

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

## 📊 Tableau de Correspondance

| Code | Choix 1 | Choix 2 | Choix 3 | Branche | Sous-domaine |
|------|---------|---------|---------|---------|--------------|
| baseline | - | - | - | `baseline` | `baseline.blackmarket.com` |
| faaa | LCP | JS | A11y | `foundation-lcp-js-accessibility` | `faaa.blackmarket.com` |
| faab | LCP | JS | Responsive | `foundation-lcp-js-responsive` | `faab.blackmarket.com` |
| faba | LCP | Caching | A11y | `foundation-lcp-caching-accessibility` | `faba.blackmarket.com` |
| fabb | LCP | Caching | Responsive | `foundation-lcp-caching-responsive` | `fabb.blackmarket.com` |
| fbaa | CLS | JS | A11y | `foundation-cls-js-accessibility` | `fbaa.blackmarket.com` |
| fbab | CLS | JS | Responsive | `foundation-cls-js-responsive` | `fbab.blackmarket.com` |
| fbba | CLS | Caching | A11y | `foundation-cls-caching-accessibility` | `fbba.blackmarket.com` |
| fbbb | CLS | Caching | Responsive | `foundation-cls-caching-responsive` | `fbbb.blackmarket.com` |

(8 combinaisons au total - vérifier si 16 dans specs originales)

---

## ⚙️ Variables d'Environnement

Toutes les apps nécessitent :
```
ABLY_API_KEY=your-api-key-here
```

---

## 💡 Workflow de Développement

1. **Lire** [`00_Specs_Techniques_Generales.md`](./00_Specs_Techniques_Generales.md) pour comprendre l'architecture
2. **Consulter** la spec spécifique de l'app concernée
3. **Vérifier** [`Points_Non_Resolus.md`](./Points_Non_Resolus.md) si question non documentée
4. **Référencer** [`Liste_Anti-Patterns.md`](./Liste_Anti-Patterns.md) pour BlackMarket baseline

---

**Note :** Commencer par [`00_Specs_Techniques_Generales.md`](./00_Specs_Techniques_Generales.md) pour avoir le contexte complet des décisions techniques validées.
