# Concept et Vision

## Le Pitch

Une présentation interactive de 45 minutes où l'audience devient actrice de l'optimisation d'une application Vue.js/Nuxt.

La présentation utilise un thème pirate où l'amélioration des scores Lighthouse est visualisée comme la construction d'un phare pour guider un capitaine en sécurité vers le rivage.

À chaque étape, l'audience vote entre deux options d'optimisation. L'option choisie est implémentée et améliore les scores Lighthouse, représentés visuellement par la construction d'un nouvel étage du phare.

L'application optimisée est **BlackMarket** – une boutique d'accessoires de pirates reconditionnés (crochets, cache-œil, jambes de bois, perroquets, etc.), qui est un jeu de mots sur BackMarket.

## Pourquoi C'est Important

L'optimisation frontend peut être abstraite et difficile à relier à un impact concret. Cette présentation la rend tangible grâce à :

- **Participation active** - L'audience vote sur les optimisations à implémenter
- **Feedback visuel** - Les scores Lighthouse montrent des améliorations mesurables
- **Connexion thématique** - La métaphore pirate/phare crée un cadre mémorable
- **Personnalisation** - Chaque participant crée son avatar de pirate et vote en temps réel

Quand les membres de l'audience votent entre différentes options d'optimisation, ils vivent les décisions de priorisation que les développeurs affrontent quotidiennement. Le feedback immédiat des scores améliorés renforce la valeur de chaque optimisation.

## La Structure

La présentation consiste en 4 étapes :

1. **Foundation (Fondations)** - Améliorations HTML et SEO de base (étape fixe, pas de vote)
2. **Core Web Vitals** - Choix entre :
   - Optimisation du Largest Contentful Paint (LCP)
   - Améliorations du Cumulative Layout Shift (CLS)
3. **Performance Technique** - Choix entre :
   - Optimisation JavaScript
   - Gestion des ressources et caching
4. **Expérience Utilisateur** - Choix entre :
   - Améliorations d'accessibilité
   - Améliorations du responsive design

Chaque étape construit un nouvel étage du phare, visualisant la progression.

## La Technologie

Le système combine trois applications synchronisées :

1. **Site de présentation** - Affiche les slides, les différences de code, les résultats de vote et la construction du phare
2. **Site de vote** - Interface mobile où les participants créent leur avatar pirate et votent
3. **Application BlackMarket** - La boutique Vue.js/Nuxt qui sert de base pour les optimisations (avec 16 branches pré-configurées)

Les membres de l'audience votent via leurs smartphones en scannant un QR code. Le système comptabilise les votes en temps réel via WebSockets (Ably), et affiche les résultats et les scores Lighthouse correspondants.

## Approche Pédagogique

La présentation est conçue autour de principes éducatifs clés :

- **Apprentissage par la conséquence** - Voir l'impact direct des choix
- **Progression visible** - Suivre l'amélioration via les scores Lighthouse et la construction du phare
- **Pertinence technique** - Appliquer des solutions à des problèmes spécifiques
- **Enseignement inclusif** - Expliquer des concepts complexes de manière accessible

La présentation reconnaît plusieurs chemins d'optimisation valides plutôt que de prescrire une seule approche, reflétant la réalité des compromis de développement.

## Scores Lighthouse

La présentation affiche 5 mesures Lighthouse :

1. **Score initial (baseline)** - Application BlackMarket non optimisée (score très faible)
2. **Après Foundation** - Première amélioration
3. **Après choix 1** - Amélioration supplémentaire
4. **Après choix 2** - Amélioration supplémentaire
5. **Après choix 3** - Score final

Les scores sont **pré-calculés** pour les 16 combinaisons possibles (2×2×2×2 avec Foundation appliquée à toutes les branches).

## Visualisation du Phare

- **État initial** : Rien (ou petit échafaudage symbolique) - Score baseline affiché
- **Après Foundation** : 1er étage construit
- **Après choix 1** : 2e étage construit
- **Après choix 2** : 3e étage construit
- **Après choix 3** : 4e étage construit (phare complet)

Le phare apparaît au premier plan de chaque slide, montrant visuellement la progression tout au long de la présentation.
