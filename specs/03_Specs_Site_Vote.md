# Spécifications - Site de Vote

## Vue d'Ensemble

Application web mobile permettant aux participants de créer leur avatar pirate, rejoindre l'équipage et voter lors des phases de décision. Interface simple et rapide, optimisée pour smartphones.

---

## Technologies

- HTML/CSS/JavaScript (TypeScript optionnel)
- Possiblement Nuxt 3 en mode static/SSG pour faciliter le développement
- Ably SDK pour WebSockets
- Framework CSS : Tailwind recommandé
- Hébergement : Netlify
- Base directory : `apps/vote`

---

## Accès à l'Application

**Méthodes de connexion :**
- Scan de QR code affiché sur la présentation (principal)
- URL directe (backup)

**URL :** TBD (ex: `vote.lighthouse-pirates.com`)

---

## Fonctionnalités Principales

### 1. Création d'Avatar

#### Première Visite

Système de génération d'avatar pirate avec composants combinables.

**Catégories d'avatars :**

**Bases (mutuellement exclusives) :**
- **Masculin** : 3 couleurs de peau (blanc, noir, mat)
- **Féminin** : 3 couleurs de peau (blanc, noir, mat)
- **Neutre** : 3 options
  - Squelette
  - Poulpe (style Davy Jones)
  - Créature à définir (voir [`Points_Non_Resolus.md`](./Points_Non_Resolus.md))

= **9 bases possibles**

**Personnalisations (combinables) :**
- Chapeau : 3 options
- Yeux : 3 options
- Bouche : 3 options
- Accessoire : 3 options

**Calcul total :** 9 bases × 3⁴ = 729 combinaisons possibles

#### Process de Création

1. **Génération aléatoire** d'un avatar complet
   - Utilise `generateRandomAvatar()` depuis `shared/avatars`
2. **Affichage preview**
   - Utilise `renderAvatar(avatarCode)` depuis `shared/avatars`
3. **Possibilité de relancer** pour générer un nouveau (optionnel)
4. **Saisie du pseudo**
   - Obligatoire
   - Max 20 caractères
   - Validation basique (pas vide, pas de caractères spéciaux si souhaité)
5. **Validation et enregistrement**
   - Génération d'un `userId` unique (UUID)
   - Sauvegarde LocalStorage
   - Envoi message `avatar-created` via Ably
6. **Redirection** vers interface de vote/attente

#### avatarCode Généré

Format : `"m-white-hat2-eyes1-mouth3-acc2"` ou `"mw2132"` (compact)

Exemple décodé :
- `m` = masculin
- `white` / `w` = couleur de peau blanche
- `hat2` / `2` = chapeau option 2
- `eyes1` / `1` = yeux option 1
- `mouth3` / `3` = bouche option 3
- `acc2` / `2` = accessoire option 2

---

### 2. Persistence Locale (LocalStorage)

**Données stockées :**
```javascript
{
  userId: "uuid-abc123",
  pseudo: "Barbe-Noire",
  avatarCode: "m-white-hat2-eyes1-mouth3-acc2"
}
```

**Comportement :**
- Création d'avatar → sauvegarde automatique
- Refresh de page → reconnexion automatique avec même identité
- Aucune ré-création nécessaire
- Redirection directe vers interface de vote

**Sécurité :**
- Pas de système anti-triche
- Confiance dans l'audience

**Gestion du LocalStorage :**
- Vérifier présence au chargement de l'app
- Si présent et valide → skip création avatar
- Si absent ou invalide → afficher écran de création

---

### 3. États de l'Interface

Le site de vote écoute l'état de session envoyé par la présentation et adapte son interface.

#### État : `waiting`

**Affichage :**
- Message : "Attendez la prochaine question..."
- Avatar affiché avec pseudo
- Indication de connexion active (icône WiFi, dot vert, etc.)
- Nombre de pirates connectés (optionnel)

**Boutons :**
- Désactivés ou masqués

#### État : `voting`

**Affichage :**
- Titre de la question/dilemme (optionnel - peut être juste "Votez !")
- **2 boutons** : Option A et Option B
- Description courte de chaque option (optionnel)
- Timer décomptant de 45 secondes
- Indication du choix effectué une fois voté

**Interaction :**
- Clic sur bouton A ou B
- Envoi immédiat du vote via Ably
- Désactivation des boutons après vote
- Feedback visuel :
  - Bouton choisi surligné
  - Checkmark
  - Animation de confirmation

**Timer :**
- Barre de progression visuelle
- Compte à rebours en secondes (ex: "42s")

#### État : `closed`

**Affichage :**
- Message : "Vote terminé !"
- Affichage du résultat global :
  - "Option A a gagné !" ou "Option B a gagné !"
  - Pourcentage du vote (ex: "65% ont choisi A")
- Indication du choix personnel de l'utilisateur :
  - "Vous avez voté A" avec icône appropriée

**Boutons :**
- Désactivés

---

### 4. Communication WebSocket (Ably)

#### Messages Envoyés

**Création d'avatar :**
```javascript
{
  type: 'avatar-created',
  userId: "uuid-abc123",
  pseudo: "Barbe-Noire",
  avatarCode: "m-white-hat2-eyes1-mouth3-acc2"
}
```

**Vote :**
```javascript
{
  type: 'vote-cast',
  userId: "uuid-abc123",
  voteId: "choice-1",
  choice: "A" // ou "B"
}
```

**Heartbeat (réponse) :**
```javascript
{
  type: 'heartbeat-response',
  userId: "uuid-abc123"
}
```

#### Messages Reçus

**Changement d'état de session :**
```javascript
{
  type: 'session-state',
  state: 'waiting' | 'voting' | 'closed',
  voteId: 'choice-1' | 'choice-2' | 'choice-3'
}
```

**Requête heartbeat :**
```javascript
{
  type: 'heartbeat-request'
}
```

**Action :** Répondre immédiatement avec `heartbeat-response`

#### Gestion de la Connexion

- **Connexion** dès l'arrivée sur l'app (après création avatar)
- **Reconnexion automatique** si déconnexion
  - Retry avec backoff exponentiel
- **Indicateur de statut** : connecté/déconnecté
  - Dot vert/rouge
  - Icône WiFi
  - Message "Connexion perdue, reconnexion..."

---

### 5. Rendu des Avatars

**Technologie :**
- Utilise `renderAvatar(avatarCode)` depuis `shared/avatars`
- SVG composable (recommandé - voir Points_Non_Resolus.md)
- Canvas (alternative)

**Affichage :**
- Taille adaptée mobile (~100-150px)
- Qualité vectorielle pour netteté
- Animation subtile optionnelle (ex: léger balancement)

**Emplacement :**
- En haut de l'interface (header)
- À côté du pseudo
- Toujours visible

---

## Design et UX

**Thème :**
- Cohérent avec le site de présentation (pirate/maritime)
- Couleurs vives pour mobile (lisibilité)
- Boutons larges et tactiles (min 44px de hauteur)

**Responsive :**
- **Optimisé pour smartphones** (portrait)
- Support tablettes (bonus)
- Pas de version desktop nécessaire (mais fonctionnelle)

**Performance :**
- Chargement rapide (<2 secondes)
- Interface réactive
- Animations fluides (60fps)

**Accessibilité :**
- Touch targets suffisamment grands (44px minimum)
- Contrastes suffisants
- Labels clairs sur les boutons

---

## Flow Utilisateur

### Première Visite

1. Arrivée sur le site (via QR code ou URL)
2. Écran de création d'avatar
3. Génération aléatoire d'un avatar
4. Saisie du pseudo
5. Validation → Sauvegarde LocalStorage + envoi via Ably
6. Redirection vers écran d'attente (`waiting`)

### Retour après Refresh

1. Arrivée sur le site
2. Détection du LocalStorage existant
3. Reconnexion automatique avec userId/pseudo/avatarCode
4. Affichage de l'état actuel (`waiting`, `voting`, ou `closed`)

### Pendant un Vote

1. Réception de l'état `voting` via Ably
2. Affichage de l'interface de vote (2 boutons A/B, timer)
3. Utilisateur clique sur A ou B
4. Envoi du vote via Ably
5. Désactivation des boutons
6. Feedback visuel (bouton surligné, checkmark)
7. Attente de l'état `closed`
8. Affichage du résultat global

---

## Gestion d'Erreurs

### Perte de Connexion

- Indicateur visuel de déconnexion (dot rouge, icône WiFi barrée)
- Tentative de reconnexion automatique
- Message : "Connexion perdue, reconnexion en cours..."
- Retry avec backoff exponentiel

### LocalStorage Non Disponible

- Fallback : stockage en mémoire (perdu au refresh)
- Message d'avertissement (optionnel)
- Mode dégradé fonctionnel

### Votes Multiples (Même Utilisateur)

- Accepté (pas de système anti-triche)
- Seul le dernier vote compte (écrasement côté présentation)

---

## Fichiers et Assets Requis

- Composants SVG pour avatars (dans `shared/avatars`)
  - 9 bases
  - 3 chapeaux
  - 3 yeux
  - 3 bouches
  - 3 accessoires
- Configuration Ably (API key en variable d'environnement)
- Assets graphiques thématiques (backgrounds, décorations - optionnel)

---

## Points d'Attention

- **Interface simple et intuitive** (accessible à tous)
- **Temps de chargement minimal**
- **Feedback immédiat** après chaque action
- **Gestion propre des états** de session
- **Reconnexion robuste** après perte de connexion
- **Responsive mobile-first** (l'essentiel de l'usage)
