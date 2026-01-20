# Structure de la Présentation

## Flow Global

La présentation suit un flux structuré qui combine contenu éducatif et points de décision interactifs. Le thème visuel incorpore systématiquement la métaphore de construction du phare, avec le score Lighthouse Performance représenté par la hauteur croissante du phare.

> **Focus : Score Performance uniquement**

## Sections Principales

### Introduction

- Introduction au concept et au thème pirate
- Explication du mécanisme de vote interactif
- **Slide "Rejoignez l'équipage"** - Invitation à scanner le QR code et créer son avatar pirate
- Slides de légende racontant la construction du phare et le parallèle avec Lighthouse
- Introduction à BlackMarket (boutique d'accessoires de pirates)
- Affichage du score Lighthouse Performance initial très bas (baseline ~20-25, aucun étage du phare)

### Vote 1 : LCP (Largest Contentful Paint)

**Structure de la boucle de choix :**

1. **Slide de dilemme** - Les deux options présentées face à face
2. **Slide Option A** - Détail de l'optimisation Images (formats, lazy loading, srcset)
3. **Slide Option B** - Détail de l'optimisation Fonts (preload, font-display, subsetting)
4. **Slide de vote (45 secondes)** - Phase de vote interactive
   - Les avatars des votants se placent de chaque côté de l'écran (gauche/droite)
   - Jauge de vote qui se remplit en temps réel
   - Compte à rebours de 45 secondes
   - Affichage uniquement des participants actifs (session WebSocket ouverte)
5. **Slide de résultat** - Détail approfondi de l'option choisie
   - Affichage du score Performance amélioré (~40-50)
   - Construction du **1er étage du phare**

### Vote 2 : TBT (Total Blocking Time)

**Structure de la boucle de choix :**

1. **Slide de dilemme** - Les deux options présentées face à face
2. **Slide Option A** - Détail de l'optimisation JavaScript (defer, tree-shaking, librairies)
3. **Slide Option B** - Détail du Code Splitting (lazy loading, imports dynamiques)
4. **Slide de vote (45 secondes)** - Phase de vote interactive
5. **Slide de résultat** - Détail approfondi de l'option choisie
   - Affichage du score Performance encore amélioré (~60-70)
   - Construction du **2e étage du phare**

### Vote 3 : Network

**Structure de la boucle de choix :**

1. **Slide de dilemme** - Les deux options présentées face à face
2. **Slide Option A** - Détail de la Compression (gzip, brotli, minification)
3. **Slide Option B** - Détail du Caching (headers, preconnect, prefetch)
4. **Slide de vote (45 secondes)** - Phase de vote interactive
5. **Slide de résultat** - Détail approfondi de l'option choisie
   - Mesure finale Lighthouse Performance (~85-95)
   - Construction du **3e étage du phare** (phare complet)

### Conclusion

- Revue du chemin d'optimisation pris
- Comparaison avant/après du score Performance et de l'expérience utilisateur
- Récapitulatif avec les 3 choix effectués
- Résumé des principes clés d'optimisation Performance
- Ressources pour aller plus loin
- Visualisation finale du phare complété

## Éléments de Visualisation Clés

### Visualisation du Phare
- Le phare grandit d'un étage à chaque amélioration
- Présent au premier plan de chaque slide
- État initial : vide (ou échafaudage symbolique)
- État final : 3 étages complets

### Code Diffs
- Affichage des corrections implémentées entre deux étapes
- Sans trop de détails techniques (vue d'ensemble)

### Métriques de Performance
- Représentation visuelle du score Performance (0-100)
- Focus sur les métriques clés : LCP, TBT, Speed Index

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
- 3 boucles × 5 slides = 15 slides
- Conclusion : ~3-5 slides

**Total approximatif : 23-27 slides**

La structure maintient un équilibre entre contenu technique et éléments thématiques, assurant à la fois valeur éducative et engagement.
