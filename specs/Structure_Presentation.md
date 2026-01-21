# Structure de la Présentation

## Flow Global

La présentation suit un flux structuré qui combine contenu éducatif et points de décision interactifs. Le thème visuel incorpore systématiquement la métaphore de construction du phare, avec les scores Lighthouse représentés par la hauteur croissante du phare (4 étages = 4 catégories).

> **4 Votes = 4 Catégories Lighthouse**
> Performance, Accessibility, Best Practices, SEO

---

## Sections Principales

### Introduction

- Introduction au concept et au thème pirate
- Explication du mécanisme de vote interactif
- **Slide "Rejoignez l'équipage"** - Invitation à scanner le QR code et créer son avatar pirate
- Slides de légende racontant la construction du phare et le parallèle avec Lighthouse
- Introduction à BlackMarket (boutique d'accessoires de pirates)
- Affichage des scores Lighthouse initiaux (baseline - tous les scores bas)

---

### Vote 1 : Performance (Day 1)

**Structure de la boucle de choix :**

1. **Slide Catégorie** - Présentation critères Performance + score actuel
2. **Slide Comparaison** - Option A vs Option B (vue globale côte à côte)
   - Option A : Images & Transfer (WebP, lazy loading, dimensions, compression)
   - Option B : Fonts & JavaScript (font-display, preconnect, librairies inutiles)
3. **Slide de vote (20 secondes)** - Phase de vote interactive
   - Les avatars des votants se placent de chaque côté de l'écran (gauche/droite)
   - Jauge de vote qui se remplit en temps réel
   - Compte à rebours de 20 secondes
   - Affichage uniquement des participants actifs (session WebSocket ouverte)
4. **Slide Détail option gagnante** - Fixes détaillés de l'option choisie
5. **Slide Application** - Iframe site + recalcul score
   - Affichage du score Performance amélioré (~70-85)
   - Construction du **1er étage du phare**

---

### Vote 2 : Accessibility (Day 2)

**Structure de la boucle de choix :**

1. **Slide Catégorie** - Présentation critères Accessibility + score actuel
2. **Slide Comparaison** - Option A vs Option B (vue globale côte à côte)
   - Option A : Visual (contraste, focus visible, labels, boutons accessibles)
   - Option B : Semantic (boutons sémantiques, lang, skip link, headings)
3. **Slide de vote (20 secondes)** - Phase de vote interactive
4. **Slide Détail option gagnante** - Fixes détaillés de l'option choisie
5. **Slide Application** - Iframe site + recalcul score
   - Affichage du score Accessibility amélioré (~85-95)
   - Construction du **2e étage du phare**

---

### Vote 3 : Best Practices (Day 3)

**Structure de la boucle de choix :**

1. **Slide Catégorie** - Présentation critères Best Practices + score actuel
2. **Slide Comparaison** - Option A vs Option B (vue globale côte à côte)
   - Option A : Console & Security (console.log, noopener, document.write, erreurs)
   - Option B : Modern Standards (dimensions images, doctype, passive listeners)
3. **Slide de vote (20 secondes)** - Phase de vote interactive
4. **Slide Détail option gagnante** - Fixes détaillés de l'option choisie
5. **Slide Application** - Iframe site + recalcul score
   - Affichage du score Best Practices amélioré (~90-100)
   - Construction du **3e étage du phare**

---

### Vote 4 : SEO (Day 4)

**Structure de la boucle de choix :**

1. **Slide Catégorie** - Présentation critères SEO + score actuel
2. **Slide Comparaison** - Option A vs Option B (vue globale côte à côte)
   - Option A : Meta & Structure (title, description, h1, viewport, canonical)
   - Option B : Content & Links (link text, alt images, crawlable navigation)
3. **Slide de vote (20 secondes)** - Phase de vote interactive
4. **Slide Détail option gagnante** - Fixes détaillés de l'option choisie
5. **Slide Application** - Iframe site + recalcul score
   - Affichage du score SEO amélioré (~90-100)
   - Construction du **4e étage du phare + lanterne allumée**

---

### Conclusion

- Revue du chemin d'optimisation pris
- Comparaison avant/après des 4 scores Lighthouse
- Récapitulatif avec les 4 choix effectués
- Résumé des principes clés d'optimisation
- Ressources pour aller plus loin
- Visualisation finale du phare complété avec lumière animée

---

## Éléments de Visualisation Clés

### Visualisation du Phare

- Le phare grandit d'un étage à chaque amélioration
- Présent au premier plan de chaque slide
- État initial : fondations (ou échafaudage symbolique)
- État final : 4 étages complets + lanterne allumée

| Étape | État du Phare |
|-------|---------------|
| Baseline | Fondations seules |
| Après Vote 1 | 1er étage (Performance) |
| Après Vote 2 | 2e étage (Accessibility) |
| Après Vote 3 | 3e étage (Best Practices) |
| Après Vote 4 | 4e étage + lanterne (SEO) |

### Code Diffs

- Affichage des corrections implémentées entre deux étapes
- Sans trop de détails techniques (vue d'ensemble)

### Métriques Lighthouse

- Représentation visuelle des 4 scores (0-100)
- Mise en avant de la catégorie du vote en cours
- Affichage du gain après chaque vote

### Interface de Vote

- Affichage en temps réel des avatars votants
- Jauge de progression du vote
- Timer de 20 secondes
- Séparation visuelle gauche/droite pour les deux options

### Avatars des Participants

- **Équipage enregistré** : Tous les participants qui se sont connectés (affichables sur toutes les slides)
- **Équipage actif** : Uniquement les participants avec session active (affiché pendant les votes)
- Possibilité d'animations avec les avatars entre les phases de vote

---

## États de Session

Le site de présentation contrôle l'état du site de vote :

- **'waiting'** - Attente de la prochaine question (interface de vote désactivée)
- **'voting'** - Vote en cours (boutons A/B actifs, timer décompte)
- **'closed'** - Vote terminé (résultat affiché, boutons désactivés)

---

## Nombre Total de Slides

- Introduction : 8 slides (attente, présentation, question audience, aventure pirate ×2, BlackMarket, scores baseline, mission)
- 4 boucles × 5 slides = 20 slides (catégorie, comparaison, vote, détail, application)
- Conclusion : 4 slides (récapitulation, meilleure solution, conclusion, Q&A)

**Total : 32 slides**

Voir [`Conducteur_Tableaux.md`](./Conducteur_Tableaux.md) pour le détail slide par slide.

---

## Correspondance Vote / Catégorie

| Vote | Catégorie Lighthouse | Étage du Phare |
|------|---------------------|----------------|
| Vote 1 | Performance | 1er étage |
| Vote 2 | Accessibility | 2e étage |
| Vote 3 | Best Practices | 3e étage |
| Vote 4 | SEO | 4e étage + lanterne |

La structure maintient un équilibre entre contenu technique et éléments thématiques, assurant à la fois valeur éducative et engagement.
