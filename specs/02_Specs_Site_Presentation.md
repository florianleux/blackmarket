# Spécifications - Site de Présentation

## Vue d'Ensemble

Site web HTML/CSS/JavaScript projeté en salle de conférence, servant d'interface principale pour la présentation interactive. Contrôle l'état global de la session et affiche les résultats de vote en temps réel.

> **4 Votes = 4 Catégories Lighthouse**
> Performance, Accessibility, Best Practices, SEO

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
- 32 slides au total (voir [`Conducteur_Tableaux.md`](./Conducteur_Tableaux.md))
- Navigation au clavier (flèches gauche/droite, espace)
- Navigation tactile possible (swipe - optionnel)
- Indicateur de progression (ex: "Slide 12/30")

**Types de slides :**
- Slides de contenu standard
- Slides de dilemme (2 options face à face)
- Slides de détail d'option
- Slides de vote (interface spéciale)
- Slides de résultat avec phare

---

### 2. Système de Vote

#### Slide de Vote

**Caractéristiques :**
- Durée : 20 secondes
- Timer visuel décomptant
- Affichage en temps réel des votes

**Visualisation des votes :**
- **Avatars des votants** se déplacent vers leur choix (gauche = A, droite = B)
- **Jauge de progression** se remplit proportionnellement (% pour A vs % pour B)
- Affichage uniquement des participants **actifs** (session WebSocket ouverte)
- Mise à jour en temps réel via Ably

#### États de Vote

**États possibles :**
- `voting` : Vote en cours, timer actif
- `closed` : Vote terminé, résultats finaux affichés

#### Logique de Vote

**Publication de l'état :**
Quand le présentateur arrive sur une slide de vote :
```javascript
{
  type: 'session-state',
  state: 'voting',
  voteId: 'vote-1' | 'vote-2' | 'vote-3' | 'vote-4'
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
- Automatique après 20 secondes
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
- Position fixe
- Animation de construction lors de l'ajout d'un étage

**États du phare :**

| Étape | État du Phare | Catégorie |
|-------|---------------|-----------|
| Baseline | Fondations seules | - |
| Après Vote 1 | 1er étage | Performance |
| Après Vote 2 | 2e étage | Accessibility |
| Après Vote 3 | 3e étage | Best Practices |
| Après Vote 4 | 4e étage + lanterne | SEO |

---

### 4. Affichage des Avatars

#### En Dehors des Votes

- Affichage de l'**équipage enregistré** (tous les participants inscrits)
- Possibilité d'animations décoratives
- Statistiques : "X pirates à bord !"

#### Pendant les Votes

- Affichage uniquement de l'**équipage actif** (sessions WebSocket actives)
- Avatars animés se déplaçant vers leur choix (A ou B)

---

### 5. Affichage des Scores Lighthouse

#### Moments d'Affichage

- Score baseline (initial) : tous les scores bas
- Score après Vote 1 : Performance amélioré
- Score après Vote 2 : Accessibility amélioré
- Score après Vote 3 : Best Practices amélioré
- Score après Vote 4 (final) : SEO amélioré

#### Format d'Affichage

**Scores (4 catégories) :**
- Performance : 0-100
- Accessibility : 0-100
- Best Practices : 0-100
- SEO : 0-100

**Visualisation :**
- Graphique/jauge visuelle pour chaque catégorie
- Mise en avant de la catégorie du vote en cours
- Amélioration en points après chaque vote

#### Source des Scores

- JSON pré-calculé : `apps/presentation/src/data/lighthouse-scores.js`
- Sélection du bon score selon le chemin de choix pris (path)

**Exemple :**
```javascript
// Path actuel : ["a", "b", "a", null]
// Branche correspondante : "aba"
const score = lighthouseScores["aba"];
// { performance: 78, accessibility: 85, bestPractices: 92, seo: 52 }
```

---

### 6. Code Diffs

**Affichage :**
- Vue d'ensemble des changements apportés par l'optimisation choisie
- Syntax highlighting
- Pas trop de détails techniques (lisibilité pour audience non-tech)

---

### 7. Communication WebSocket (Ably)

#### Messages Envoyés

**Changement d'état de session :**
```javascript
{
  type: 'session-state',
  state: 'waiting' | 'voting' | 'closed',
  voteId: 'vote-1' | 'vote-2' | 'vote-3' | 'vote-4'
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
- **Slide actuelle** (ex: "12/30")
- **Choix effectués** (ex: "a → b → a → ?")
- **Statistiques équipage** :
  - X pirates enregistrés
  - Y pirates connectés (actifs)
- **Résultats des votes** :
  - Vote-1 : A gagne (12 vs 8)
  - Vote-2 : B gagne (15 vs 5)
  - Vote-3 : A gagne (10 vs 10, départagé)
  - Vote-4 : Pas encore voté

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
  },
  "vote-4": {
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
  currentVote: null | "vote-1" | "vote-2" | "vote-3" | "vote-4",
  voteState: "waiting" | "voting" | "closed",
  path: ["a", "b", null, null], // Choix effectués (null = pas encore)
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
2. Démarrer timer de 20 secondes
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
- Transitions entre slides : subtiles

---

## Points d'Attention

- **Performance** : Tout doit être fluide en projection
- **Fallbacks visuels** si WebSocket échoue (voir panel admin)
- **Indicateurs clairs** de l'état actuel (vote en cours, attente, etc.)
- **Accessibilité** : Contrastes suffisants pour projection

---

## Fichiers et Assets Requis

- JSON des scores Lighthouse pré-calculés (`lighthouse-scores.js`)
- Assets du phare (SVG ou PNG par étape - 5 états)
- Assets des avatars (composants SVG - dans `shared/avatars`)
- Slides de contenu (texte, images, code diffs)
- Configuration Ably (API key en variable d'environnement)
