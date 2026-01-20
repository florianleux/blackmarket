# Structure de la Présentation

## Flow Global

La présentation suit un flux structuré qui combine contenu éducatif et points de décision interactifs. Le thème visuel incorpore systématiquement la métaphore de construction du phare, avec les scores Lighthouse représentés par la hauteur croissante du phare.

## Sections Principales

### Introduction

- Introduction au concept et au thème pirate
- Explication du mécanisme de vote interactif
- **Slide "Rejoignez l'équipage"** - Invitation à scanner le QR code et créer son avatar pirate
- Slides de légende racontant la construction du phare et le parallèle avec Lighthouse
- Introduction à BlackMarket (boutique d'accessoires de pirates)
- Affichage des scores Lighthouse initiaux très bas (baseline, aucun étage du phare)

### Étape 1 : Foundation (Étape Fixe - Pas de Vote)

- 1-2 slides de présentation détaillée des problèmes HTML et SEO de base
- Implémentation du HTML sémantique et des métadonnées
- Re-mesure Lighthouse montrant les premières améliorations
- Construction du **1er étage du phare**

### Étape 2 : Core Web Vitals (Premier Choix)

**Structure de la boucle de choix :**

1. **Slide de dilemme** - Les deux options présentées face à face
2. **Slide Option A** - Détail de l'optimisation Largest Contentful Paint (LCP)
3. **Slide Option B** - Détail des corrections Cumulative Layout Shift (CLS)
4. **Slide de vote (45 secondes)** - Phase de vote interactive
   - Les avatars des votants se placent de chaque côté de l'écran (gauche/droite)
   - Jauge de vote qui se remplit en temps réel
   - Compte à rebours de 45 secondes
   - Affichage uniquement des participants actifs (session WebSocket ouverte)
5. **Slide de résultat** - Détail approfondi de l'option choisie
   - Affichage des scores améliorés
   - Construction du **2e étage du phare**

### Étape 3 : Performance Technique (Deuxième Choix)

**Structure de la boucle de choix :**

1. **Slide de dilemme** - Les deux options présentées face à face
2. **Slide Option A** - Détail de l'optimisation JavaScript
3. **Slide Option B** - Détail de la gestion des ressources et du caching
4. **Slide de vote (45 secondes)** - Phase de vote interactive
5. **Slide de résultat** - Détail approfondi de l'option choisie
   - Affichage des scores encore améliorés
   - Construction du **3e étage du phare**

### Étape 4 : Expérience Utilisateur (Troisième Choix)

**Structure de la boucle de choix :**

1. **Slide de dilemme** - Les deux options présentées face à face
2. **Slide Option A** - Détail des améliorations d'accessibilité
3. **Slide Option B** - Détail des améliorations du responsive design
4. **Slide de vote (45 secondes)** - Phase de vote interactive
5. **Slide de résultat** - Détail approfondi de l'option choisie
   - Mesure finale Lighthouse
   - Construction du **4e étage du phare** (phare complet)

### Conclusion

- Revue du chemin d'optimisation pris
- Comparaison avant/après des scores et de l'expérience utilisateur
- Récapitulatif avec les 4 étapes choisies
- Résumé des principes clés d'optimisation
- Ressources pour aller plus loin
- Visualisation finale du phare complété

## Éléments de Visualisation Clés

### Visualisation du Phare
- Le phare grandit d'un étage à chaque amélioration
- Présent au premier plan de chaque slide
- État initial : vide (ou échafaudage symbolique)
- État final : 4 étages complets

### Code Diffs
- Affichage des corrections implémentées entre deux étapes
- Sans trop de détails techniques (vue d'ensemble)

### Métriques de Performance
- Représentation visuelle des pourcentages d'amélioration
- Scores Lighthouse détaillés ou score global selon le contexte

### Interface de Vote
- Affichage en temps réel des avatars votants
- Jauge de progression du vote
- Timer de 45 secondes
- Séparation visuelle gauche/droite pour les deux options

### Avatars des Participants
- **Équipage enregistré** : Tous les participants qui se sont connectés (affichables sur toutes les slides)
- **Équipage actif** : Uniquement les participants avec session active (affiché pendant les votes)
- Possibilité d'animations avec les avatars entre les phases de vote

## États de Session

Le site de présentation contrôle l'état du site de vote :

- **'waiting'** - Attente de la prochaine question (interface de vote désactivée)
- **'voting'** - Vote en cours (boutons A/B actifs, timer décompte)
- **'closed'** - Vote terminé (résultat affiché, boutons désactivés)

## Nombre Total de Slides

- Introduction : ~5-7 slides (concept, légende, rejoindre l'équipage, BlackMarket, scores initiaux)
- Foundation : ~2-3 slides
- 3 boucles × 5 slides = 15 slides
- Conclusion : ~3-5 slides

**Total approximatif : 25-30 slides**

La structure maintient un équilibre entre contenu technique et éléments thématiques, assurant à la fois valeur éducative et engagement.
