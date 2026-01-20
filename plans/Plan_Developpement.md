# Plan de Développement - Lighthouse Pirates

## Vue d'ensemble

Présentation interactive (45 min) où l'audience vote sur des optimisations frontend d'une app e-commerce pirate. 3 apps coordonnées via Ably WebSockets.

> **FOCUS : Score Lighthouse Performance uniquement**

## Principes de Développement

- **Commits atomiques** : Un commit par micro-étape validée
- **Validation systématique** : Test/vérification avant chaque commit
- **Messages de commit** : Descriptifs et préfixés par la phase

---

## Décisions Validées

| Aspect | Décision |
|--------|----------|
| **Focus** | Score Performance uniquement (pas A11y/SEO/Best Practices) |
| **Branches** | 15 total : baseline + fa/fb + faa/fab/fba/fbb + 8 finales |
| **Votes** | Vote 1: Images/Fonts, Vote 2: JS/Splitting, Vote 3: Compression/Caching |
| **Phare** | PNG illustrés, 3 étages (1 par vote) |
| **Avatars** | Assets externes (SVG/PNG) |
| **BlackMarket** | Style BackMarket : landing + cards produits + banner + header nav |

## Structure des Votes (Performance)

| Vote | Thème | Option A | Option B |
|------|-------|----------|----------|
| **Vote 1** | LCP | 🖼️ Images | 🔤 Fonts |
| **Vote 2** | TBT | ⚡ JavaScript | 📦 Code Splitting |
| **Vote 3** | Network | 🗜️ Compression | 💾 Caching |

## Structure des Branches (15 branches)

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

---

## État d'Avancement

### ✅ Phase 1 : Setup Mono-repo - TERMINÉE

- [x] 1.1 Initialisation package.json racine
- [x] 1.2 Configuration pnpm workspace
- [x] 1.3 Configuration TypeScript
- [x] 1.4 Configuration environnement
- [x] 1.5 Structure des dossiers

### ✅ Phase 2 : BlackMarket Baseline - TERMINÉE

- [x] 2.1 Initialisation Nuxt
- [x] 2.2 Structure de base app
- [x] 2.3 Header component
- [x] 2.4 Footer component
- [x] 2.5 Données produits (20 produits, devises pirates)
- [x] 2.6 ProductCard component
- [x] 2.7 ProductGrid component
- [x] 2.8 PageHero component
- [x] 2.9 Page d'accueil (index.vue)
- [x] 2.10 Styles baseline (Tailwind + custom fonts)
- [x] 2.11 Anti-patterns implémentés (23/24)

**Composants créés :**
- TheHeader.vue, TheFooter.vue
- ProductCard.vue, ProductGrid.vue
- BreadcrumbNav.vue, TrustBadges.vue
- PageHero.vue, FilterBar.vue
- PromoBanner.vue, TradeInCard.vue

**Anti-patterns Performance implémentés :**
- Images: PNG, no lazy loading, no dimensions, no srcset
- Fonts: no font-display:swap, no preload, multiple fonts
- JavaScript: blocking script, unused lodash+moment.js (~360KB)
- Code Splitting: no payload extraction, no async components
- Compression: no gzip, no minification
- Caching: no preconnect, no prefetch, no cache headers

### 🔄 Phase 3 : Code Partagé - À FAIRE

- [ ] 3.1 Initialisation package shared
- [ ] 3.2 Types Ably messages
- [ ] 3.3 Constantes
- [ ] 3.4-3.9 Système d'avatars

### 🔄 Phase 4 : Site de Vote - À FAIRE

- [ ] 4.1-4.16 Tous les composants du site de vote

### 🔄 Phase 5 : Site de Présentation - À FAIRE

- [ ] 5.1-5.26 Tous les composants et slides

### 🔄 Phase 6 : Intégration Ably - À FAIRE

- [ ] 6.1-6.7 Tests d'intégration

### 🔄 Phase 7 : Branches Optimisées - À FAIRE

- [ ] 7.1 Créer branche baseline (actuel = main)
- [ ] 7.2 Créer branche fa (Images)
- [ ] 7.3 Créer branche fb (Fonts)
- [ ] 7.4-7.9 Créer branches combinées
- [ ] 7.10 Script mesure Lighthouse

### 🔄 Phase 8 : Déploiement Netlify - À FAIRE

- [ ] 8.1-8.6 Configuration et déploiement

---

## Prochaines Étapes Recommandées

1. **Créer la branche `baseline`** depuis main (état actuel)
2. **Phase 3** : Code partagé (types, constantes)
3. **Phase 4** : Site de vote mobile
4. **Phase 5** : Site de présentation
5. **Phase 7** : Branches optimisées (après validation baseline)

---

## Vérification Finale

**Tests manuels** :
1. Ouvrir Presentation + 3 instances Vote
2. Créer avatars → vérifier apparition dans Presentation
3. Déclencher vote → vérifier boutons actifs dans Vote
4. Voter → vérifier comptage temps réel
5. Timer expire → vérifier résultat et mise à jour phare
6. Vérifier scores Lighthouse pour chaque branche
7. Tester panel admin (touche K)
8. Tester refresh/reconnexion

**Lighthouse** :
- Mesurer les 15 branches avec `pnpm measure:lighthouse`
- Vérifier progression logique des scores
