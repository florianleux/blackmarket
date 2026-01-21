# Spécifications Techniques Générales

> **4 Votes = 4 Catégories Lighthouse**
> Performance, Accessibility, Best Practices, SEO

## Architecture Globale

### 2 Repositories Séparés

Le projet est divisé en **2 repositories distincts** pour éviter les conflits de branches :

```
~/code/lighthouse/                    # Dossier parent (PAS un repo git)
│
├── specs/                            # Documentation partagée (hors Git)
│   ├── 00_Specs_Techniques_Generales.md
│   ├── 01_Specs_BlackMarket.md
│   ├── 02_Specs_Site_Presentation.md
│   ├── 03_Specs_Site_Vote.md
│   └── ...
│
├── lighthouse-presentation/          # Repo 1 - Mono-repo pnpm
│   ├── apps/
│   │   ├── presentation/             # Site projeté en salle
│   │   └── vote/                     # App mobile participants
│   ├── shared/
│   │   ├── types.ts                  # Types TypeScript partagés
│   │   ├── constants.ts              # Constantes (channels, états)
│   │   └── avatars/                  # Système d'avatars
│   ├── pnpm-workspace.yaml
│   └── CLAUDE.md
│
└── blackmarket/                      # Repo 2 - App Nuxt standalone
    ├── app.vue
    ├── components/
    ├── nuxt.config.ts
    ├── CLAUDE.md
    └── ...                           # 31 branches Git
```

**Note :** Le dossier `specs/` est dans le dossier parent, partagé entre les deux repos mais hors de tout repo Git.

**Pourquoi 2 repos ?**
- BlackMarket a **31 branches** (baseline + 30 optimisées)
- Presentation/Vote n'ont qu'une **branche main**
- Travailler en parallèle sur les 3 apps serait complexe avec des branches multiples

### Lien entre les repos

- **Aucun lien Git** (pas de submodule, pas de dépendance npm)
- BlackMarket est affiché en **iframe** dans la présentation
- Référence par **URL uniquement** : `https://{branch}.blackmarket.com`

---

## Repository 1 : lighthouse-presentation

### Structure Mono-repo pnpm

```
lighthouse-presentation/
├── apps/
│   ├── presentation/         # Site de présentation (HTML/CSS/JS)
│   └── vote/                 # Site de vote mobile (HTML/CSS/JS)
├── shared/
│   ├── types.ts              # Types Ably, avatars
│   ├── constants.ts          # Channels, états de session
│   └── avatars/              # Génération et rendu d'avatars
├── pnpm-workspace.yaml
├── package.json
└── CLAUDE.md
```

### Applications

1. **Site de Présentation** (`apps/presentation/`)
   - Interface projetée en salle de conférence
   - Contrôle l'état global de la session
   - Affiche les résultats de vote en temps réel
   - Iframe vers BlackMarket

2. **Site de Vote** (`apps/vote/`)
   - Application mobile pour les participants
   - Création d'avatar pirate
   - Interface de vote (boutons A/B)

### Technologies

- HTML/CSS/JavaScript (TypeScript optionnel)
- Tailwind CSS
- Ably SDK pour WebSockets
- pnpm workspaces

---

## Repository 2 : blackmarket

### App Nuxt 3 Standalone

```
blackmarket/
├── app.vue
├── components/
├── composables/
├── pages/
├── data/
├── assets/
├── public/
├── nuxt.config.ts
├── package.json
└── tailwind.config.js
```

### Caractéristiques

- **Framework** : Nuxt 3 + Vue 3 + TypeScript
- **Styling** : Tailwind CSS
- **31 branches Git** : baseline + 30 optimisées
- **Aucune communication WebSocket** (pas d'Ably)
- **Affiché en iframe** dans la présentation

---

## Hébergement Netlify

### 3 Sites au Total

| Site | Repo | Branches | URL |
|------|------|----------|-----|
| **BlackMarket** | blackmarket | 31 (branch deploys) | `{branch}.blackmarket.com` |
| **Présentation** | lighthouse-presentation | main | `presentation.lighthouse-pirates.com` |
| **Vote** | lighthouse-presentation | main | `vote.lighthouse-pirates.com` |

### BlackMarket - Branch Deploys

Chaque branche est déployée sur un sous-domaine dédié :
- `baseline.blackmarket.com` → branche `baseline`
- `a.blackmarket.com` → branche `a`
- `aaaa.blackmarket.com` → branche `aaaa`

**31 sous-domaines au total**

---

## Communication entre Applications

### Ably (WebSocket)

**Channel principal :** `lighthouse-presentation`

Communication **uniquement** entre :
- `apps/presentation/` ↔ `apps/vote/`

**BlackMarket n'a aucune communication WebSocket.**

### Messages Publiés

**Présentation → Vote (changement d'état) :**
```javascript
{
  type: 'session-state',
  state: 'waiting' | 'voting' | 'closed',
  voteId: 'vote-1' | 'vote-2' | 'vote-3' | 'vote-4'
}
```

**Présentation → Vote (heartbeat) :**
```javascript
{
  type: 'heartbeat-request'
}
```

**Vote → Présentation (création avatar) :**
```javascript
{
  type: 'avatar-created',
  userId: string,
  pseudo: string,
  avatarCode: string
}
```

**Vote → Présentation (vote) :**
```javascript
{
  type: 'vote-cast',
  userId: string,
  voteId: string,
  choice: 'A' | 'B'
}
```

**Vote → Présentation (heartbeat response) :**
```javascript
{
  type: 'heartbeat-response',
  userId: string
}
```

---

## Gestion des États

### États de Session

Contrôlés par le site de présentation :

- **waiting** : Attente entre les votes, interface de vote désactivée
- **voting** : Vote actif, timer de 20 secondes, boutons A/B actifs
- **closed** : Vote terminé, résultats affichés, boutons désactivés

### États des Participants

**Côté Présentation (en mémoire + LocalStorage) :**

```javascript
{
  crew: {
    registered: [
      // Tous les participants inscrits (persistent pendant la session)
      { userId, pseudo, avatarCode, timestamp }
    ],
    active: [
      // Participants actuellement connectés (WebSocket actif)
      // Reconstruit via heartbeat
      "userId1", "userId3"
    ]
  }
}
```

---

## Persistence Locale

### Site de Présentation (LocalStorage)

**État complet persisté :**
```javascript
{
  // Navigation
  currentSlide: 12,

  // Progression des choix (4 votes)
  path: ["a", "a", "b", null], // null = pas encore choisi

  // Équipage
  crew: {
    registered: [
      { userId, pseudo, avatarCode, timestamp }
    ]
    // active sera reconstruit via heartbeat au reload
  },

  // Historique des votes
  votes: {
    "vote-1": {
      A: ["userId1", "userId5"],
      B: ["userId3", "userId8"],
      winner: "A"
    },
    "vote-2": { A: [], B: [], winner: null },
    "vote-3": { A: [], B: [], winner: null },
    "vote-4": { A: [], B: [], winner: null }
  },

  // Métadonnées
  sessionId: "uuid-session",
  startedAt: "2026-01-20T14:00:00Z"
}
```

**Sauvegarde automatique après :**
- Changement de slide
- Vote enregistré
- Avatar créé (nouveau membre d'équipage)

**Restauration au chargement :**
- Charger l'état depuis LocalStorage
- Reconstruire `crew.active` avec un heartbeat

**But :** Résister au refresh accidentel de la page pendant la présentation

### Site de Vote (LocalStorage)

**Données stockées :**
```javascript
{
  userId: "uuid-abc123",
  pseudo: "Barbe-Noire",
  avatarCode: "m-white-hat2-eyes1-mouth3-acc2"
}
```

**Comportement :**
- Sauvegarde après création d'avatar
- Reconnexion automatique au refresh
- Pas besoin de recréer l'avatar

---

## Système d'Avatars

### Génération

**Localisation :** `shared/avatars/`

**Combinaisons possibles :** 729 au total
- 9 bases (3 genres × 3 couleurs de peau)
  - Masculin : blanc, noir, mat
  - Féminin : blanc, noir, mat
  - Neutre : squelette, poulpe, créature TBD
- 3 chapeaux
- 3 yeux
- 3 bouches
- 3 accessoires

**Format avatarCode :**
- Compact : `"mw2132"`
- Descriptif : `"m-white-hat2-eyes1-mouth3-acc2"`

**Parsing :**
- `m` = masculin
- `w` / `white` = couleur de peau blanche
- `2` / `hat2` = chapeau option 2
- `1` / `eyes1` = yeux option 1
- `3` / `mouth3` = bouche option 3
- `2` / `acc2` = accessoire option 2

### Technologie de Rendu

SVG composable recommandé

---

## Fallbacks et Robustesse

### Panel Admin Caché (Présentation)

**Accès :** Touche clavier `K`

**Affichage :**
- Heure de début de session
- Slide actuelle (ex: "Slide 12/30")
- Choix effectués (ex: "a → a → b → ?")
- X pirates enregistrés
- Y pirates connectés (actifs)
- Résultats des votes (Vote-1: A gagne 12 vs 8, etc.)

**Actions :**
- **Nouvelle session** : Vide le LocalStorage, reset complet (avec confirmation)
- **Forcer fin de vote** : Terminer le vote immédiatement
- **Override vote** : Choisir manuellement A ou B (ignorer les votes)
- **Navigation manuelle** : Aller directement à slide X

### Modes Dégradés

1. **Ably/WebSocket tombe** :
   - Utiliser le panel admin pour override les votes
   - Bouton manuel "Vote A gagne" / "Vote B gagne"
   - Vote à main levée + saisie manuelle

2. **Site de vote inaccessible** :
   - Afficher URL de secours
   - Vote à main levée en salle

3. **Présentation freeze** :
   - Version PDF backup des slides
   - Document texte avec scores pré-calculés
   - Présentation ouverte sur device de secours

4. **Timer bloqué** :
   - Bouton "Terminer le vote maintenant" dans panel admin
   - Chronomètre manuel (téléphone)

---

## Audience Cible

- **Maximum** : 100 utilisateurs simultanés
- **Probable** : 50 utilisateurs
- **WiFi** : Solide et fiable (vérifié en amont)

---

## Contraintes Techniques

- Pas de système anti-triche (confiance dans l'audience)
- Pas de persistence après la session (tout en mémoire pendant la présentation)
- Durée totale : 45 minutes maximum
- Timer de vote : 20 secondes par vote
- 4 phases de vote au total

---

## Variables d'Environnement

**lighthouse-presentation (apps/presentation et apps/vote) :**
```
ABLY_API_KEY=your-api-key-here
```

**blackmarket :**
Aucune variable d'environnement requise.

**Configuration Netlify :**
- Ajouter `ABLY_API_KEY` dans les settings des sites presentation et vote
- Même clé API pour les 2 sites
