# Points Techniques Non Résolus

Ce document liste uniquement les questions techniques qui restent à décider.

---

## 1. Visualisation du Phare

### Questions

**Technologie de rendu :**
- SVG animé avec CSS/JavaScript ?
- Canvas ?
- Frames PNG/SVG pré-générées ?

**Animation de construction :**
- Comment l'étage "se construit" visuellement ?
  - Fade in ?
  - Montée depuis le bas ?
  - Construction brique par brique ?
- Durée de l'animation ?

**Position et intégration :**
- Coin de l'écran (fixe) ?
- Bas de page (footer) ?
- Intégré au design de chaque slide ?
- Taille approximative ?

**Responsabilité de création :**
- Designer crée les assets du phare ?
- Développeur génère le SVG programmatiquement ?
- Compromise : structure générée, style designé ?

---

## 2. Affichage des Avatars Pendant les Votes

### Questions

**Capacité d'affichage :**
- Combien d'avatars maximum affichables simultanément à l'écran ?
- Que faire si 100 personnes votent en même temps ?
  - Afficher les 100 (risque de surcharge visuelle) ?
  - Afficher un échantillon (ex: 20 avatars + compteur) ?
  - Afficher uniquement les derniers votants ?

**Animation de déplacement :**
- Les avatars se déplacent vers A ou B avec animation ?
- Transition instantanée ?
- Durée de l'animation si applicable ?

**Disposition à l'écran :**
- Grille statique (places pré-définies) ?
- Placement dynamique/aléatoire ?
- File d'attente visuelle ?

---

## 3. Affichage des Code Diffs

### Questions

**Format d'affichage :**
- Screenshots d'IDE pré-générés ?
- Syntax highlighting en live (bibliothèque comme Prism.js) ?
- Bloc de texte simple avec coloration basique ?

**Niveau de détail :**
- Afficher le fichier complet ?
- Extraits pertinents uniquement ?
- Vue "avant/après" côte à côte ?

**Slides concernées :**
- Code diff sur chaque slide de résultat ?
- Uniquement pour certaines optimisations ?
- Optionnel selon le temps disponible ?

---

## 4. Génération et Rendu des Avatars

### Questions

**Création des assets SVG :**
- Designer crée les 9 bases + variations (chapeaux, yeux, etc.) ?
- Assets trouvés/achetés en ligne ?
- Générés programmatiquement ?

**Troisième créature neutre :**
- Quelle créature choisir ?
  - Fantôme de pirate ?
  - Sirène ?
  - Kraken miniature ?
  - Robot pirate ?
  - Autre idée ?

**Style visuel :**
- Style cartoon/illustratif ?
- Pixel art ?
- Minimaliste/plat ?
- Cohérence avec le thème général ?

---

## 5. Navigation et Timing des Slides

### Questions

**Mode de navigation :**
- Navigation manuelle uniquement (clavier/souris) ?
- Auto-avancement avec timers ?
- Hybride (auto pour votes, manuel pour contenu) ?

**Synchronisation état de vote :**
- Changement d'état automatique à l'affichage de la slide de vote ?
- Bouton manuel pour démarrer le vote ?
- Timer visible pour le présentateur ?

**Transitions entre slides :**
- Transition immédiate ?
- Fade, slide, zoom ?
- Durée de transition ?

---

## 6. Contenu et Design de BlackMarket

### Questions

**Nombre et type de produits :**
- Combien de produits au total ? (~20-30 suggéré)
- Répartition par catégorie ?
- Produits réels mockés ou totalement fictifs ?

**Pages nécessaires :**
- Accueil + Liste produits + Produit individuel (minimum) ?
- Ajouter panier/checkout (pour réalisme) ?
- Page "À propos" (pour tester contenu texte) ?

**Design visuel :**
- Designer professionnel engagé ?
- Templates/thèmes existants adaptés ?
- Design minimaliste suffisant ?

---

## 7. Accessibilité et Inclusivité

### Questions

**Navigation au clavier :**
- Site de présentation navigable au clavier ?
  - Important si contrôle à distance
- Site de vote accessible ?

**Lecteurs d'écran :**
- Optimiser pour lecteurs d'écran ?
  - Probablement non prioritaire pour présentation projetée
  - Important pour site de vote ?

**Contraste et lisibilité :**
- Vérifier les contrastes pour projection ?
- Tester dans différentes conditions d'éclairage ?

---

## Priorités de Clarification

### Haute Priorité (impacter développement)
1. Assets des avatars (source et création)
2. Technologie de rendu du phare
3. Contenu de BlackMarket (nombre de produits, pages)

### Moyenne Priorité (impacter UX)
4. Affichage des avatars pendant votes (capacité max)
5. Navigation et timing des slides

### Basse Priorité (améliorations)
6. Code diffs (format et niveau de détail)
7. Transitions et animations
8. Accessibilité avancée
