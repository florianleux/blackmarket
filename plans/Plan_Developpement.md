# Plan de Développement - Lighthouse Pirates

## Vue d'ensemble

Présentation interactive (45 min) où l'audience vote sur des optimisations frontend d'une app e-commerce pirate. 3 apps coordonnées via Ably WebSockets.

## Principes de Développement

- **Commits atomiques** : Un commit par micro-étape validée
- **Validation systématique** : Test/vérification avant chaque commit
- **Messages de commit** : Descriptifs et préfixés par la phase

---

## Décisions Validées

| Aspect | Décision |
|--------|----------|
| **Branches** | 16 total : baseline + f + fa/fb + faa/fab/fba/fbb + 8 finales |
| **Phare** | PNG illustrés (placeholders initiaux) |
| **Avatars** | Assets externes (SVG/PNG) |
| **BlackMarket** | Style BackMarket : landing + cards produits + banner + header nav |

## Structure des Branches

```
baseline (34 anti-patterns)
└── f (Foundation : HTML/SEO)
    ├── fa (+LCP)
    │   ├── faa (+JS)
    │   │   ├── faaa (+Accessibility)
    │   │   └── faab (+Responsive)
    │   └── fab (+Caching)
    │       ├── faba (+Accessibility)
    │       └── fabb (+Responsive)
    └── fb (+CLS)
        ├── fba (+JS)
        │   ├── fbaa (+Accessibility)
        │   └── fbab (+Responsive)
        └── fbb (+Caching)
            ├── fbba (+Accessibility)
            └── fbbb (+Responsive)
```

---

## Phase 1 : Setup Mono-repo

### 1.1 Initialisation package.json racine
- Créer `package.json` avec config pnpm workspaces
- **Commit** : `chore(setup): init root package.json with pnpm workspaces`

### 1.2 Configuration pnpm workspace
- Créer `pnpm-workspace.yaml`
- **Commit** : `chore(setup): add pnpm-workspace.yaml`

### 1.3 Configuration TypeScript
- Créer `tsconfig.base.json`
- **Commit** : `chore(setup): add base TypeScript config`

### 1.4 Configuration environnement
- Créer `.env.example` avec ABLY_API_KEY
- Mettre à jour `.gitignore`
- **Commit** : `chore(setup): add environment config`

### 1.5 Structure des dossiers
- Créer `apps/blackmarket/.gitkeep`
- Créer `apps/presentation/.gitkeep`
- Créer `apps/vote/.gitkeep`
- Créer `shared/.gitkeep`
- Créer `scripts/.gitkeep`
- **Commit** : `chore(setup): create directory structure`

---

## Phase 2 : BlackMarket Baseline

### 2.1 Initialisation Nuxt
- Créer `apps/blackmarket/package.json`
- Créer `apps/blackmarket/nuxt.config.ts` (config baseline avec anti-patterns)
- Créer `apps/blackmarket/tsconfig.json`
- **Validation** : `pnpm install` réussit
- **Commit** : `feat(blackmarket): init Nuxt 3 project with baseline config`

### 2.2 Structure de base app
- Créer `apps/blackmarket/app.vue`
- **Validation** : `pnpm dev:blackmarket` démarre
- **Commit** : `feat(blackmarket): add app.vue entry point`

### 2.3 Header component (anti-pattern HTML)
- Créer `apps/blackmarket/components/TheHeader.vue` (div au lieu de header/nav)
- **Commit** : `feat(blackmarket): add TheHeader with HTML anti-patterns`

### 2.4 Footer component
- Créer `apps/blackmarket/components/TheFooter.vue` (div au lieu de footer)
- **Commit** : `feat(blackmarket): add TheFooter with HTML anti-patterns`

### 2.5 Données produits
- Créer `apps/blackmarket/data/products.json` (~20 produits pirates)
- Créer `apps/blackmarket/composables/useProducts.ts`
- **Commit** : `feat(blackmarket): add products data and composable`

### 2.6 ProductCard component
- Créer `apps/blackmarket/components/ProductCard.vue`
- **Commit** : `feat(blackmarket): add ProductCard component`

### 2.7 ProductGrid component
- Créer `apps/blackmarket/components/ProductGrid.vue`
- **Commit** : `feat(blackmarket): add ProductGrid component`

### 2.8 HeroBanner component (anti-pattern LCP)
- Créer `apps/blackmarket/components/HeroBanner.vue` (image lourde >500KB)
- Ajouter image placeholder dans `apps/blackmarket/assets/images/`
- **Commit** : `feat(blackmarket): add HeroBanner with LCP anti-patterns`

### 2.9 Page d'accueil
- Créer `apps/blackmarket/pages/index.vue`
- Intégrer Header, HeroBanner, ProductGrid, Footer
- **Validation** : Page s'affiche correctement
- **Commit** : `feat(blackmarket): add landing page`

### 2.10 Styles baseline (anti-patterns CSS)
- Créer `apps/blackmarket/assets/css/main.css` (contrastes faibles, outline:none)
- Importer dans `nuxt.config.ts`
- **Commit** : `feat(blackmarket): add baseline styles with a11y anti-patterns`

### 2.11 Vérification anti-patterns
- **Validation** : Lancer Lighthouse, vérifier score bas (<40 performance)
- **Commit** : `docs(blackmarket): verify baseline anti-patterns implemented`

---

## Phase 3 : Code Partagé

### 3.1 Initialisation package shared
- Créer `shared/package.json`
- Créer `shared/tsconfig.json`
- Créer `shared/index.ts`
- **Commit** : `feat(shared): init shared package`

### 3.2 Types Ably messages
- Créer `shared/types.ts` (SessionState, AblyMessage, etc.)
- **Commit** : `feat(shared): add Ably message types`

### 3.3 Constantes
- Créer `shared/constants.ts` (ABLY_CHANNEL, VOTE_DURATION, PATH_OPTIONS)
- **Commit** : `feat(shared): add constants`

### 3.4 Types avatars
- Créer `shared/avatars/types.ts`
- **Commit** : `feat(shared): add avatar types`

### 3.5 Parser avatars
- Créer `shared/avatars/parser.ts` (parseAvatarCode)
- **Commit** : `feat(shared): add avatar code parser`

### 3.6 Générateur avatars
- Créer `shared/avatars/generator.ts` (generateRandomAvatar)
- **Commit** : `feat(shared): add avatar generator`

### 3.7 Renderer avatars
- Créer `shared/avatars/renderer.ts` (renderAvatar → SVG)
- **Commit** : `feat(shared): add avatar renderer`

### 3.8 Assets avatars (placeholders)
- Créer `shared/avatars/assets/bases/` (9 fichiers placeholder)
- Créer `shared/avatars/assets/hats/` (3 fichiers)
- Créer `shared/avatars/assets/eyes/` (3 fichiers)
- Créer `shared/avatars/assets/mouths/` (3 fichiers)
- Créer `shared/avatars/assets/accessories/` (3 fichiers)
- **Commit** : `feat(shared): add avatar placeholder assets`

### 3.9 Export public avatars
- Créer `shared/avatars/index.ts`
- Mettre à jour `shared/index.ts`
- **Validation** : Import depuis shared fonctionne
- **Commit** : `feat(shared): export avatar API`

### 3.10 Utilitaires
- Créer `shared/utils/uuid.ts`
- Créer `shared/utils/storage.ts`
- **Commit** : `feat(shared): add utility functions`

---

## Phase 4 : Site de Vote (Mobile)

### 4.1 Initialisation Nuxt
- Créer `apps/vote/package.json`
- Créer `apps/vote/nuxt.config.ts`
- Créer `apps/vote/tsconfig.json`
- Créer `apps/vote/app.vue`
- **Validation** : `pnpm dev:vote` démarre
- **Commit** : `feat(vote): init Nuxt 3 project`

### 4.2 Composable Ably
- Créer `apps/vote/composables/useAbly.ts`
- **Commit** : `feat(vote): add Ably composable`

### 4.3 Composable LocalStorage
- Créer `apps/vote/composables/useLocalStorage.ts`
- **Commit** : `feat(vote): add LocalStorage composable`

### 4.4 Composable Session
- Créer `apps/vote/composables/useSession.ts`
- **Commit** : `feat(vote): add session state composable`

### 4.5 Component AvatarPreview
- Créer `apps/vote/components/AvatarPreview.vue`
- **Commit** : `feat(vote): add AvatarPreview component`

### 4.6 Component AvatarCreator
- Créer `apps/vote/components/AvatarCreator.vue`
- **Commit** : `feat(vote): add AvatarCreator component`

### 4.7 Component PseudoInput
- Créer `apps/vote/components/PseudoInput.vue`
- **Commit** : `feat(vote): add PseudoInput component`

### 4.8 Page création avatar
- Créer `apps/vote/pages/create-avatar.vue`
- **Validation** : Création avatar fonctionne
- **Commit** : `feat(vote): add create-avatar page`

### 4.9 Component VoteTimer
- Créer `apps/vote/components/VoteTimer.vue`
- **Commit** : `feat(vote): add VoteTimer component`

### 4.10 Component VoteButton
- Créer `apps/vote/components/VoteButton.vue`
- **Commit** : `feat(vote): add VoteButton component`

### 4.11 Component WaitingScreen
- Créer `apps/vote/components/WaitingScreen.vue`
- **Commit** : `feat(vote): add WaitingScreen component`

### 4.12 Component VotingScreen
- Créer `apps/vote/components/VotingScreen.vue`
- **Commit** : `feat(vote): add VotingScreen component`

### 4.13 Component ClosedScreen
- Créer `apps/vote/components/ClosedScreen.vue`
- **Commit** : `feat(vote): add ClosedScreen component`

### 4.14 Page session
- Créer `apps/vote/pages/session.vue`
- **Validation** : États waiting/voting/closed fonctionnent
- **Commit** : `feat(vote): add session page`

### 4.15 Page index (redirection)
- Créer `apps/vote/pages/index.vue`
- **Commit** : `feat(vote): add index redirect page`

### 4.16 Styles mobile
- Créer `apps/vote/assets/css/main.css`
- **Validation** : Interface mobile-friendly
- **Commit** : `feat(vote): add mobile-first styles`

---

## Phase 5 : Site de Présentation

### 5.1 Initialisation projet
- Créer `apps/presentation/package.json`
- Créer `apps/presentation/tsconfig.json`
- Créer `apps/presentation/index.html`
- Créer `apps/presentation/src/main.ts`
- **Validation** : `pnpm dev:presentation` démarre
- **Commit** : `feat(presentation): init project`

### 5.2 Service Ably
- Créer `apps/presentation/src/services/ably.ts`
- **Commit** : `feat(presentation): add Ably service`

### 5.3 Service State
- Créer `apps/presentation/src/services/state.ts`
- **Commit** : `feat(presentation): add state management service`

### 5.4 Service Storage
- Créer `apps/presentation/src/services/storage.ts`
- **Commit** : `feat(presentation): add storage service`

### 5.5 Service Navigation
- Créer `apps/presentation/src/services/navigation.ts`
- **Commit** : `feat(presentation): add navigation service`

### 5.6 Données Lighthouse scores
- Créer `apps/presentation/src/data/lighthouse-scores.ts`
- **Commit** : `feat(presentation): add lighthouse scores data`

### 5.7 Configuration slides
- Créer `apps/presentation/src/data/slides.ts`
- **Commit** : `feat(presentation): add slides configuration`

### 5.8 Component Lighthouse (phare)
- Créer `apps/presentation/src/components/Lighthouse.ts`
- Ajouter assets PNG placeholder dans `public/assets/lighthouse/`
- **Commit** : `feat(presentation): add Lighthouse component`

### 5.9 Component ScoreDisplay
- Créer `apps/presentation/src/components/ScoreDisplay.ts`
- **Commit** : `feat(presentation): add ScoreDisplay component`

### 5.10 Component AvatarGrid
- Créer `apps/presentation/src/components/AvatarGrid.ts`
- **Commit** : `feat(presentation): add AvatarGrid component`

### 5.11 Component VoteDisplay
- Créer `apps/presentation/src/components/VoteDisplay.ts`
- **Commit** : `feat(presentation): add VoteDisplay component`

### 5.12 Component Timer
- Créer `apps/presentation/src/components/Timer.ts`
- **Commit** : `feat(presentation): add Timer component`

### 5.13 Component QRCode
- Créer `apps/presentation/src/components/QRCode.ts`
- **Commit** : `feat(presentation): add QRCode component`

### 5.14 Component AdminPanel
- Créer `apps/presentation/src/components/AdminPanel.ts`
- **Commit** : `feat(presentation): add AdminPanel component`

### 5.15 Component ProgressBar
- Créer `apps/presentation/src/components/ProgressBar.ts`
- **Commit** : `feat(presentation): add ProgressBar component`

### 5.16 SlideRenderer
- Créer `apps/presentation/src/slides/SlideRenderer.ts`
- **Commit** : `feat(presentation): add SlideRenderer`

### 5.17 Slides Intro (6 slides)
- Créer `apps/presentation/src/slides/intro/Slide01_Welcome.ts`
- Créer `apps/presentation/src/slides/intro/Slide02_HowItWorks.ts`
- Créer `apps/presentation/src/slides/intro/Slide03_JoinCrew.ts`
- Créer `apps/presentation/src/slides/intro/Slide04_Legend.ts`
- Créer `apps/presentation/src/slides/intro/Slide05_BlackMarket.ts`
- Créer `apps/presentation/src/slides/intro/Slide06_Baseline.ts`
- **Commit** : `feat(presentation): add intro slides`

### 5.18 Slides Foundation (2 slides)
- Créer `apps/presentation/src/slides/foundation/Slide07_Foundation.ts`
- Créer `apps/presentation/src/slides/foundation/Slide08_FoundationResult.ts`
- **Commit** : `feat(presentation): add foundation slides`

### 5.19 Slides Choix 1 (5 slides)
- Créer `apps/presentation/src/slides/choice1/Slide09_Dilemma1.ts`
- Créer `apps/presentation/src/slides/choice1/Slide10_OptionA_LCP.ts`
- Créer `apps/presentation/src/slides/choice1/Slide11_OptionB_CLS.ts`
- Créer `apps/presentation/src/slides/choice1/Slide12_Vote1.ts`
- Créer `apps/presentation/src/slides/choice1/Slide13_Result1.ts`
- **Commit** : `feat(presentation): add choice 1 slides`

### 5.20 Slides Choix 2 (5 slides)
- Créer `apps/presentation/src/slides/choice2/Slide14_Dilemma2.ts`
- Créer `apps/presentation/src/slides/choice2/Slide15_OptionA_JS.ts`
- Créer `apps/presentation/src/slides/choice2/Slide16_OptionB_Caching.ts`
- Créer `apps/presentation/src/slides/choice2/Slide17_Vote2.ts`
- Créer `apps/presentation/src/slides/choice2/Slide18_Result2.ts`
- **Commit** : `feat(presentation): add choice 2 slides`

### 5.21 Slides Choix 3 (5 slides)
- Créer `apps/presentation/src/slides/choice3/Slide19_Dilemma3.ts`
- Créer `apps/presentation/src/slides/choice3/Slide20_OptionA_A11y.ts`
- Créer `apps/presentation/src/slides/choice3/Slide21_OptionB_Responsive.ts`
- Créer `apps/presentation/src/slides/choice3/Slide22_Vote3.ts`
- Créer `apps/presentation/src/slides/choice3/Slide23_Result3.ts`
- **Commit** : `feat(presentation): add choice 3 slides`

### 5.22 Slides Conclusion (3 slides)
- Créer `apps/presentation/src/slides/conclusion/Slide24_Recap.ts`
- Créer `apps/presentation/src/slides/conclusion/Slide25_Resources.ts`
- Créer `apps/presentation/src/slides/conclusion/Slide26_Final.ts`
- **Commit** : `feat(presentation): add conclusion slides`

### 5.23 Export slides
- Créer `apps/presentation/src/slides/index.ts`
- **Commit** : `feat(presentation): export all slides`

### 5.24 Gestion clavier
- Créer `apps/presentation/src/utils/keyboard.ts` (flèches, K pour admin)
- **Commit** : `feat(presentation): add keyboard navigation`

### 5.25 Application principale
- Mettre à jour `apps/presentation/src/app.ts`
- **Validation** : Navigation slides fonctionne
- **Commit** : `feat(presentation): wire up main app`

### 5.26 Styles
- Créer `apps/presentation/src/styles/main.css`
- **Commit** : `feat(presentation): add styles`

---

## Phase 6 : Intégration Ably

### 6.1 Configuration Ably
- Créer compte Ably (si nécessaire)
- Ajouter ABLY_API_KEY dans `.env`
- **Commit** : `chore(integration): add Ably API key`

### 6.2 Test avatar-created
- Tester envoi/réception message avatar-created entre Vote et Presentation
- **Validation** : Avatar apparaît dans Presentation
- **Commit** : `test(integration): verify avatar-created flow`

### 6.3 Test session-state
- Tester envoi/réception session-state
- **Validation** : Vote change d'état correctement
- **Commit** : `test(integration): verify session-state flow`

### 6.4 Test vote-cast
- Tester envoi/réception vote-cast
- **Validation** : Vote comptabilisé dans Presentation
- **Commit** : `test(integration): verify vote-cast flow`

### 6.5 Test heartbeat
- Tester heartbeat-request/response
- **Validation** : Liste actifs mise à jour
- **Commit** : `test(integration): verify heartbeat flow`

### 6.6 Test reconnexion
- Simuler déconnexion WiFi
- **Validation** : Reconnexion automatique fonctionne
- **Commit** : `test(integration): verify reconnection`

### 6.7 Test flow complet
- Tester scénario complet : création avatar → 3 votes → résultat final
- **Validation** : Tout le flow fonctionne
- **Commit** : `test(integration): verify complete flow`

---

## Phase 7 : Branches Optimisées

### 7.1 Créer branche baseline
- `git checkout -b baseline`
- `git push -u origin baseline`
- **Commit** : déjà fait (contenu Phase 2)

### 7.2 Créer branche f (Foundation)
- `git checkout baseline && git checkout -b f`
- Appliquer optimisations Foundation (HTML sémantique, SEO)
- **Validation** : Lighthouse score améliore
- **Commit** : `feat(blackmarket): apply Foundation optimizations`
- `git push -u origin f`

### 7.3 Créer branche fa (+LCP)
- `git checkout f && git checkout -b fa`
- Appliquer optimisations LCP (images WebP, preload, dimensions)
- **Validation** : LCP score améliore
- **Commit** : `feat(blackmarket): apply LCP optimizations`
- `git push -u origin fa`

### 7.4 Créer branche fb (+CLS)
- `git checkout f && git checkout -b fb`
- Appliquer optimisations CLS (dimensions, font-display, espaces réservés)
- **Validation** : CLS score améliore
- **Commit** : `feat(blackmarket): apply CLS optimizations`
- `git push -u origin fb`

### 7.5 Créer branche faa (+JS)
- `git checkout fa && git checkout -b faa`
- Appliquer optimisations JS (tree shaking, dynamic imports)
- **Commit** : `feat(blackmarket): apply JS optimizations`
- `git push -u origin faa`

### 7.6 Créer branche fab (+Caching)
- `git checkout fa && git checkout -b fab`
- Appliquer optimisations Caching (cache-control, compression)
- **Commit** : `feat(blackmarket): apply Caching optimizations`
- `git push -u origin fab`

### 7.7 Créer branche fba (+JS)
- `git checkout fb && git checkout -b fba`
- Appliquer optimisations JS
- **Commit** : `feat(blackmarket): apply JS optimizations`
- `git push -u origin fba`

### 7.8 Créer branche fbb (+Caching)
- `git checkout fb && git checkout -b fbb`
- Appliquer optimisations Caching
- **Commit** : `feat(blackmarket): apply Caching optimizations`
- `git push -u origin fbb`

### 7.9 Créer branches finales (8 branches)
Pour chaque parent (faa, fab, fba, fbb), créer 2 branches :
- `faaa` (+Accessibility), `faab` (+Responsive)
- `faba` (+Accessibility), `fabb` (+Responsive)
- `fbaa` (+Accessibility), `fbab` (+Responsive)
- `fbba` (+Accessibility), `fbbb` (+Responsive)
- **Commit par branche** : `feat(blackmarket): apply [A11y|Responsive] optimizations`

### 7.10 Script mesure Lighthouse
- Créer `scripts/measure-lighthouse.sh`
- Créer `scripts/consolidate-scores.js`
- **Validation** : Scores mesurés pour les 16 branches
- **Commit** : `feat(scripts): add lighthouse measurement scripts`

### 7.11 Mettre à jour scores
- Mettre à jour `apps/presentation/src/data/lighthouse-scores.ts` avec vrais scores
- **Commit** : `feat(presentation): update lighthouse scores with real measurements`

---

## Phase 8 : Déploiement Netlify

### 8.1 Configuration BlackMarket
- Créer `apps/blackmarket/netlify.toml`
- Activer branch deploys
- **Commit** : `chore(blackmarket): add Netlify config`

### 8.2 Configuration Presentation
- Créer `apps/presentation/netlify.toml`
- **Commit** : `chore(presentation): add Netlify config`

### 8.3 Configuration Vote
- Créer `apps/vote/netlify.toml`
- **Commit** : `chore(vote): add Netlify config`

### 8.4 Créer sites Netlify
- Créer site BlackMarket avec branch deploys
- Créer site Presentation
- Créer site Vote
- Ajouter ABLY_API_KEY sur chaque site
- **Validation** : Builds réussissent

### 8.5 Configurer domaines
- Configurer sous-domaines BlackMarket
- Configurer domaine Presentation
- Configurer domaine Vote
- **Validation** : Tous les domaines accessibles en HTTPS

### 8.6 Test production
- Tester les 16 sous-domaines BlackMarket
- Tester communication Ably en production
- Tester flow complet sur domaines finaux
- **Commit** : `docs: deployment verified`

---

## Ordre d'Exécution

```
Phase 1 (Setup)
    │
    ├──► Phase 2 (BlackMarket) ──────────────► Phase 7 (Branches)
    │                                                 │
    └──► Phase 3 (Shared)                             │
              │                                       │
              ├──► Phase 4 (Vote) ────┐               │
              │                       ├──► Phase 6 (Integration)
              └──► Phase 5 (Pres) ────┘               │
                                                      │
                                           Phase 8 (Deploy) ◄──┘
```

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
- Mesurer les 16 branches avec `pnpm measure:lighthouse`
- Vérifier progression logique des scores
