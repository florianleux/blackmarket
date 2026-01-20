# Spécifications - Site de Présentation

## Vue d'Ensemble

Site web HTML/CSS/JavaScript projeté en salle de conférence, servant d'interface principale pour la présentation interactive. Contrôle l'état global de la session et affiche les résultats de vote en temps réel.

> **Focus : Score Performance uniquement**

---

## Technologies

- HTML/CSS/JavaScript (TypeScript optionnel)
- Ably SDK pour WebSockets
- Framework CSS au choix (Tailwind recommandé)
- Hébergement : Netlify
- Base directory : `apps/presentation`

---

## Fonctionnalités Principales

### 1. Navigation de Slides

**Caractéristiques :**
- 23-27 slides au total (voir [`Structure_Presentation.md`](./Structure_Presentation.md))
- Navigation au clavier (flèches gauche/droite, espace)
- Navigation tactile possible (swipe - optionnel)
- Indicateur de progression (ex: "Slide 12/25")

**Types de slides :**
- Slides de contenu standard
- Slides de dilemme (2 options face à face)
- Slides de détail d'option
- Slides de vote (interface spéciale)
- Slides de résultat avec phare

**Mode de navigation :**
- Décision à prendre dans [`Points_Non_Resolus.md`](./Points_Non_Resolus.md)
- Options : Manuel uniquement, auto-avancement, ou hybride

---

### 2. Système de Vote

#### Slide de Vote

**Caractéristiques :**
- Durée : 45 secondes
- Timer visuel décomptant
- Affichage en temps réel des votes

**Visualisation des votes :**
- **Avatars des votants** se déplacent vers leur choix (gauche = A, droite = B)
- **Jauge de progression** se remplit proportionnellement (% pour A vs % pour B)
- Affichage uniquement des participants **actifs** (session WebSocket ouverte)
- Mise à jour en temps réel via Ably

**Détails d'affichage des avatars :**
- Capacité max, animation, disposition : voir [`Points_Non_Resolus.md`](./Points_Non_Resolus.md)

#### États de Vote

**États possibles :**
- `voting` : Vote en cours, timer actif
- `closed` : Vote terminé, résultats finaux affichés

**Déclenchement :**
- Manuel via navigation de slide (recommandé)
- Automatique à l'affichage ? (voir Points_Non_Resolus.md)

#### Logique de Vote

**Publication de l'état :**
Quand le présentateur arrive sur une slide de vote :
```javascript
{
  type: 'session-state',
  state: 'voting',
  voteId: 'vote-1' | 'vote-2' | 'vote-3'
}
```

**Heartbeat pour identifier les actifs :**
```javascript
{
  type: 'heartbeat-request'
}
```

**Réception des votes :**
```javascript
{
  type: 'vote-cast',
  userId: string,
  voteId: string,
  choice: 'A' | 'B'
}
```

**Calcul du résultat :**
- Compter les votes A vs B
- Déterminer le gagnant
- Enregistrer dans l'état (LocalStorage)

**Fin de vote :**
- Automatique après 45 secondes
- Manuelle via panel admin (touche K)

**Publication de la fin :**
```javascript
{
  type: 'session-state',
  state: 'closed',
  voteId: 'vote-1'
}
```

---

### 3. Visualisation du Phare

**Affichage :**
- Présent au **premier plan** de chaque slide
- Position fixe (à définir dans Points_Non_Resolus.md)
- Animation de construction lors de l'ajout d'un étage

**États du phare :**
- **Initial** : Vide (ou échafaudage symbolique) - Score baseline affiché (~20-25)
- **Après Vote 1** : 1 étage (~40-50)
- **Après Vote 2** : 2 étages (~60-70)
- **Après Vote 3** : 3 étages (complet, ~85-95)

**Technologie de rendu :**
- À définir dans Points_Non_Resolus.md
- Options : SVG animé, Canvas, ou frames pré-générées

---

### 4. Affichage des Avatars

#### En Dehors des Votes

- Affichage de l'**équipage enregistré** (tous les participants inscrits)
- Possibilité d'animations décoratives
- Statistiques : "X pirates à bord !"

#### Pendant les Votes

- Affichage uniquement de l'**équipage actif** (sessions WebSocket actives)
- Avatars animés se déplaçant vers leur choix (A ou B)
- Voir Points_Non_Resolus.md pour capacité max, animation, disposition

---

### 5. Affichage des Scores Lighthouse

#### Moments d'Affichage

- Score baseline (initial) : ~20-25
- Score après Vote 1 : ~40-50
- Score après Vote 2 : ~60-70
- Score après Vote 3 (final) : ~85-95

#### Format d'Affichage

**Score Performance :**
- Note 0-100 (ex: "72/100")
- Amélioration en points (ex: "+50 depuis baseline")

**Optionnel - Métriques détaillées :**
- LCP (Largest Contentful Paint)
- TBT (Total Blocking Time)
- Speed Index

**Visualisation :**
- Graphique/jauge visuelle
- Amélioration en points
- Avant/après

#### Source des Scores

- JSON pré-calculé : `apps/presentation/src/data/lighthouse-scores.js`
- Sélection du bon score selon le chemin de choix pris (path)

**Exemple :**
```javascript
// Path actuel : ["images", "js", "compression"]
// Code correspondant : "v1a-v2a-v3a"
const score = lighthouseScores["v1a-v2a-v3a"];
```

---

### 6. Code Diffs

**Affichage :**
- Vue d'ensemble des changements apportés par l'optimisation choisie
- Syntax highlighting
- Pas trop de détails techniques (lisibilité pour audience non-tech)

**Format et niveau de détail :**
- Voir Points_Non_Resolus.md
- Options : Screenshots, syntax highlighting live, ou blocs simples

---

### 7. Communication WebSocket (Ably)

#### Messages Envoyés

**Changement d'état de session :**
```javascript
{
  type: 'session-state',
  state: 'waiting' | 'voting' | 'closed',
  voteId: 'vote-1' | 'vote-2' | 'vote-3'
}
```

**Requête heartbeat :**
```javascript
{
  type: 'heartbeat-request'
}
```

#### Messages Reçus

**Création d'avatars :**
```javascript
{
  type: 'avatar-created',
  userId: string,
  pseudo: string,
  avatarCode: string
}
```

**Votes :**
```javascript
{
  type: 'vote-cast',
  userId: string,
  voteId: string,
  choice: 'A' | 'B'
}
```

**Réponses heartbeat :**
```javascript
{
  type: 'heartbeat-response',
  userId: string
}
```

#### Gestion de la Connexion

- Reconnexion automatique si déconnexion
- Affichage d'un indicateur de statut de connexion (optionnel)

---

### 8. Panel Admin Caché

**Accès :**
- Touche clavier : `K`

**Affichage :**
- **Heure de début de session** (ex: "Démarrée à 14h30")
- **Slide actuelle** (ex: "12/25")
- **Choix effectués** (ex: "Images → JS → ?")
- **Statistiques équipage** :
  - X pirates enregistrés
  - Y pirates connectés (actifs)
- **Résultats des votes** :
  - Vote-1 : A gagne (12 vs 8)
  - Vote-2 : B gagne (15 vs 5)
  - Vote-3 : Pas encore voté

**Actions :**
- **Bouton "Nouvelle session"** (avec confirmation obligatoire)
  - Vide le LocalStorage
  - Reset complet de l'état
- **Forcer fin de vote** : Terminer le vote immédiatement
- **Override du vote** : Choisir manuellement A ou B (ignorer les vrais votes)
- **Navigation manuelle** : Aller directement à slide X

**Interface :**
- Overlay discret
- Fermeture rapide (même touche ou Échap)

---

## Structure des Données

### Équipage (Crew)

```javascript
{
  registered: [
    {
      userId: "uuid-1",
      pseudo: "Barbe-Noire",
      avatarCode: "m-white-hat2-eyes1-mouth3-acc2",
      timestamp: "2026-01-19T14:30:00Z"
    }
  ],
  active: ["uuid-1", "uuid-3"] // IDs des participants actuellement connectés
}
```

**`registered` :**
- Tous les participants qui se sont inscrits
- Persiste dans LocalStorage
- Ne diminue jamais (sauf reset session)

**`active` :**
- Participants avec session WebSocket active
- Reconstruit via heartbeat après chaque refresh
- Utilisé pour afficher les avatars pendant les votes

### Votes

```javascript
{
  "vote-1": {
    A: ["uuid-1", "uuid-5"],
    B: ["uuid-3", "uuid-8"],
    winner: "A"
  },
  "vote-2": {
    A: [],
    B: [],
    winner: null
  },
  "vote-3": {
    A: [],
    B: [],
    winner: null
  }
}
```

### État Global de Session

```javascript
{
  currentSlide: 12,
  currentVote: null | "vote-1" | "vote-2" | "vote-3",
  voteState: "waiting" | "voting" | "closed",
  path: ["images", "js", null], // Choix effectués (null = pas encore)
  sessionId: "uuid-session",
  startedAt: "2026-01-20T14:00:00Z"
}
```

---

## Persistence avec LocalStorage

### État Complet Persisté

Voir structure dans [`00_Specs_Techniques_Generales.md`](./00_Specs_Techniques_Generales.md#persistence-locale)

### Sauvegarde Automatique

**Triggers :**
- Après chaque changement de slide
- Après chaque vote enregistré
- Après chaque ajout de membre d'équipage

### Restauration au Chargement

```javascript
// Au démarrage de la présentation
const savedState = JSON.parse(localStorage.getItem('presentation-state'));
if (savedState) {
  // Restaurer la navigation
  goToSlide(savedState.currentSlide);

  // Restaurer l'équipage registered
  crew.registered = savedState.crew.registered;

  // Restaurer les votes
  votes = savedState.votes;

  // Reconstruire la liste active via heartbeat
  sendHeartbeatRequest();
}
```

**But :**
- Résister au refresh accidentel de la page
- Éviter de perdre toute la progression en cas de mauvaise manipulation

---

## Navigation et Flow

### Déclencheurs d'État

**Affichage slide de vote :**
1. Changer état de session vers `voting`
2. Démarrer timer de 45 secondes
3. Publier changement d'état via Ably
4. Demander heartbeat pour identifier participants actifs
5. Écouter les votes entrants

**Fin de vote (automatique ou manuelle) :**
1. Changer état vers `closed`
2. Calculer résultats (A gagne ou B gagne)
3. Enregistrer le choix effectué dans `path`
4. Publier changement d'état via Ably
5. Préparer la slide de résultat

**Navigation vers slide suivante :**
1. Revenir à état `waiting`
2. Publier changement d'état via Ably
3. Sauvegarder état dans LocalStorage

---

## Design et UX

**Thème :**
- Pirate/maritime
- Couleurs : bleus, bruns, or
- Typographie thématique mais lisible

**Responsive :**
- Optimisé pour projection (ratio 16:9 ou 16:10)
- Pas de version mobile nécessaire (sauf pour debug)

**Animations :**
- Construction du phare : fluide et satisfaisante
- Déplacement des avatars : smooth, pas trop rapide
- Transitions entre slides : subtiles (voir Points_Non_Resolus.md)

---

## Points d'Attention

- **Performance** : Tout doit être fluide en projection
- **Fallbacks visuels** si WebSocket échoue (voir panel admin)
- **Indicateurs clairs** de l'état actuel (vote en cours, attente, etc.)
- **Accessibilité** : Contrastes suffisants pour projection

---

## Fichiers et Assets Requis

- JSON des scores Lighthouse pré-calculés (`lighthouse-scores.js`)
- Assets du phare (SVG ou PNG par étape - voir Points_Non_Resolus.md)
- Assets des avatars (composants SVG - dans `shared/avatars`)
- Slides de contenu (texte, images, code diffs)
- Configuration Ably (API key en variable d'environnement)
