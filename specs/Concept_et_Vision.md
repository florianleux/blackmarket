# Concept et Vision

## Le Pitch

Une présentation interactive de 45 minutes où l'audience devient actrice de l'optimisation d'une application Vue.js/Nuxt.

La présentation utilise un thème pirate où l'amélioration du **score Lighthouse Performance** est visualisée comme la construction d'un phare pour guider un capitaine en sécurité vers le rivage.

À chaque étape, l'audience vote entre deux options d'optimisation. L'option choisie est implémentée et améliore le score Performance, représenté visuellement par la construction d'un nouvel étage du phare.

L'application optimisée est **BlackMarket** – une boutique d'accessoires de pirates reconditionnés (crochets, cache-œil, jambes de bois, perroquets, etc.), qui est un jeu de mots sur BackMarket.

## Pourquoi C'est Important

L'optimisation frontend peut être abstraite et difficile à relier à un impact concret. Cette présentation la rend tangible grâce à :

- **Participation active** - L'audience vote sur les optimisations à implémenter
- **Feedback visuel** - Le score Lighthouse Performance montre des améliorations mesurables
- **Connexion thématique** - La métaphore pirate/phare crée un cadre mémorable
- **Personnalisation** - Chaque participant crée son avatar de pirate et vote en temps réel

Quand les membres de l'audience votent entre différentes options d'optimisation, ils vivent les décisions de priorisation que les développeurs affrontent quotidiennement. Le feedback immédiat du score amélioré renforce la valeur de chaque optimisation.

## Focus : Score Performance Uniquement

> **Important** : Cette présentation se concentre **exclusivement** sur le score Performance de Lighthouse.
> Les autres scores (Accessibility, Best Practices, SEO) ne sont pas traités.

## La Structure

La présentation consiste en **3 votes** impactant tous le score Performance :

1. **Vote 1 : LCP (Largest Contentful Paint)** - Choix entre :
   - **Option A - Images** : Optimisation des images (formats, lazy loading, srcset)
   - **Option B - Fonts** : Optimisation des fonts (preload, font-display, subsetting)

2. **Vote 2 : TBT (Total Blocking Time)** - Choix entre :
   - **Option A - JavaScript** : Optimisation du JS (defer, tree-shaking, librairies)
   - **Option B - Code Splitting** : Découpage du code (lazy loading, imports dynamiques)

3. **Vote 3 : Network** - Choix entre :
   - **Option A - Compression** : Compression serveur (gzip, brotli, minification)
   - **Option B - Caching** : Stratégie de cache (headers, preconnect, prefetch)

Chaque vote construit un nouvel étage du phare, visualisant la progression.

## La Technologie

Le système combine trois applications synchronisées :

1. **Site de présentation** - Affiche les slides, les différences de code, les résultats de vote et la construction du phare
2. **Site de vote** - Interface mobile où les participants créent leur avatar pirate et votent
3. **Application BlackMarket** - La boutique Vue.js/Nuxt qui sert de base aux optimisations (avec 9 branches pré-configurées)

Les membres de l'audience votent via leurs smartphones en scannant un QR code. Le système comptabilise les votes en temps réel via WebSockets (Ably), et affiche les résultats et les scores Lighthouse correspondants.

## Approche Pédagogique

La présentation est conçue autour de principes éducatifs clés :

- **Apprentissage par la conséquence** - Voir l'impact direct des choix
- **Progression visible** - Suivre l'amélioration via le score Performance et la construction du phare
- **Pertinence technique** - Appliquer des solutions à des problèmes spécifiques
- **Enseignement inclusif** - Expliquer des concepts complexes de manière accessible

La présentation reconnaît plusieurs chemins d'optimisation valides plutôt que de prescrire une seule approche, reflétant la réalité des compromis de développement.

## Scores Lighthouse

La présentation affiche 4 mesures du score Performance :

1. **Score initial (baseline)** - Application BlackMarket non optimisée (~20-25)
2. **Après Vote 1** - Première amélioration (~40-50)
3. **Après Vote 2** - Amélioration supplémentaire (~60-70)
4. **Après Vote 3** - Score final (~85-95)

Les scores sont **pré-calculés** pour les 8 combinaisons possibles (2³ = 8 branches optimisées).

## Visualisation du Phare

- **État initial** : Rien (ou petit échafaudage symbolique) - Score baseline affiché
- **Après Vote 1** : 1er étage construit
- **Après Vote 2** : 2e étage construit
- **Après Vote 3** : 3e étage construit (phare complet)

Le phare apparaît au premier plan de chaque slide, montrant visuellement la progression tout au long de la présentation.
