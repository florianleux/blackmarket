# Spécifications Techniques Générales

## Architecture Globale

### Structure Mono-repo

Le projet utilise un **mono-repo pnpm** avec workspaces :

```
lighthouse-pirates/
├── apps/
│   ├── blackmarket/          # Nuxt 3 (17 branches Git)
│   ├── presentation/         # Site de présentation
│   └── vote/                 # Site de vote
├── shared/
│   ├── types.ts              # Types TypeScript partagés (messages Ably, avatars)
│   ├── constants.ts          # Constantes (channels, états de session)
│   └── avatars/              # Système de génération et rendu d'avatars
├── scripts/
│   └── measure-lighthouse.sh # Script de mesure des scores
├── pnpm-workspace.yaml
├── package.json
└── claude.md                 # Index de la documentation
```

**Avantages :**
- Code partagé entre applications (types, constantes, avatars)
- Gestion des dépendances centralisée
- Un seul projet pour Claude Code

### Applications

1. **Site de Présentation** - Interface de présentation projetée
2. **Site de Vote** - Application mobile pour les participants
3. **Application BlackMarket** - Boutique Nuxt servant de base aux optimisations

---

## Technologies Principales

### Frontend

**BlackMarket :**
- Nuxt 3 + Vue 3 + TypeScript
- SSR activé (mal configuré dans baseline, optimisé dans les branches)

**Site de Présentation :**
- HTML/CSS/JavaScript (TypeScript optionnel)
- Framework CSS au choix (Tailwind recommandé)

**Site de Vote :**
- HTML/CSS/JavaScript (TypeScript optionnel)
- Possiblement Nuxt 3 en mode static/SSG
- Optimisé mobile

### Communication Temps Réel

**Ably** - Service WebSocket managé
- Gratuit jusqu'à 6M messages/mois
- SDK JavaScript simple
- Robuste et sans maintenance de serveur
- Reconnexion automatique

### Package Manager

**pnpm** - Gestion des workspaces
- Plus rapide que npm
- Moins d'espace disque (hard links)
- Meilleur pour mono-repos

### Hébergement

**Netlify** - 4 sites au total :

1. **BlackMarket** : 
   - Domaine : `blackmarket.com`
   - 17 branches déployées sur 17 sous-domaines
   - Base directory : `apps/blackmarket`

2. **Présentation** :
   - URL : TBD (ex: `presentation.lighthouse-pirates.com`)
   - Base directory : `apps/presentation`
   - Branche : `main`

3. **Vote** :
   - URL : TBD (ex: `vote.lighthouse-pirates.com`)
   - Base directory : `apps/vote`
   - Branche : `main`

**Compte Netlify existant disponible**

---

## BlackMarket - Déploiement et Scores

### Structure des Branches

**17 branches Git totales :**
- 1 baseline (aucune optimisation)
- 16 branches optimisées (toutes les combinaisons)

**Nomenclature des branches :**
- Baseline : `baseline`
- Optimisées : `foundation-<choix1>-<choix2>-<choix3>`

Exemples :
- `foundation-lcp-js-accessibility`
- `foundation-cls-caching-responsive`

### Sous-domaines

Chaque branche est déployée sur un sous-domaine dédié de `blackmarket.com` :

**Nomenclature des sous-domaines :**
- Format compact : `f` + choix1 (`a`/`b`) + choix2 (`a`/`b`) + choix3 (`a`/`b`)
- `f` = foundation (toujours présent)
- Position 1 : `a` = LCP, `b` = CLS
- Position 2 : `a` = JS, `b` = Caching
- Position 3 : `a` = Accessibility, `b` = Responsive

**Exemples :**
- `baseline.blackmarket.com` → branche `baseline`
- `faaa.blackmarket.com` → branche `foundation-lcp-js-accessibility`
- `fbbb.blackmarket.com` → branche `foundation-cls-caching-responsive`

**17 sous-domaines au total**

### Mesure des Scores Lighthouse

**Méthode :**
- Script bash simple (`scripts/measure-lighthouse.sh`)
- Lighthouse CLI en local
- Itération sur les 17 sous-domaines
- Pas de GitHub Actions (overkill pour 17 mesures one-shot)

**Indépendance des scores :**
Chaque sous-domaine a son propre score Lighthouse indépendant car chaque branche contient un build différent avec des optimisations différentes.

**Format de stockage :**
- Scores consolidés dans `apps/presentation/src/data/lighthouse-scores.js`
- JSON hardcodé (pas d'API, pas de fichier séparé)
- Chargé au démarrage de l'application de présentation

**Structure des scores :**
```javascript
{
  "baseline": {
    "performance": 15,
    "accessibility": 65,
    "best-practices": 70,
    "seo": 60,
    "overall": 52
  },
  "faaa": {
    "performance": 85,
    "accessibility": 98,
    "best-practices": 90,
    "seo": 95,
    "overall": 92
  }
  // ... 15 autres combinaisons
}
```

**Niveau de détail disponible :**
- Score global (0-100) pour affichage principal
- Scores par catégorie (Performance, Accessibility, SEO, Best Practices)
- Métriques détaillées (LCP, CLS, etc.) optionnelles selon slides

---

## Communication entre Applications

### Channel Ably

**Channel principal :** `lighthouse-presentation`

### Messages Publiés

**Présentation → Vote (changement d'état) :**
```javascript
{
  type: 'session-state',
  state: 'waiting' | 'voting' | 'closed',
  voteId: 'choice-1' | 'choice-2' | 'choice-3'
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
- **voting** : Vote actif, timer de 45 secondes, boutons A/B actifs
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
  
  // Progression des choix
  path: ["foundation", "lcp", "js", null], // null = pas encore choisi
  
  // Équipage
  crew: {
    registered: [
      { userId, pseudo, avatarCode, timestamp }
    ]
    // active sera reconstruit via heartbeat au reload
  },
  
  // Historique des votes
  votes: {
    "choice-1": { 
      A: ["userId1", "userId5"], 
      B: ["userId3", "userId8"], 
      winner: "A" 
    },
    "choice-2": { A: [], B: [], winner: null },
    "choice-3": { A: [], B: [], winner: null }
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

SVG composable recommandé (décision finale à prendre dans Points_Non_Resolus.md)

---

## Fallbacks et Robustesse

### Panel Admin Caché (Présentation)

**Accès :** Touche clavier `K`

**Affichage :**
- Heure de début de session
- Slide actuelle (ex: "Slide 12/28")
- Choix effectués (ex: "Foundation → LCP → JS → ?")
- X pirates enregistrés
- Y pirates connectés (actifs)
- Résultats des votes (Choice-1: A gagne 12 vs 8, etc.)

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
- Timer de vote : 45 secondes par vote
- 3 phases de vote au total

---

## Variables d'Environnement

**Toutes les applications nécessitent :**
```
ABLY_API_KEY=your-api-key-here
```

**Configuration Netlify :**
- Ajouter la variable dans les settings de chaque site Netlify
- Même clé API pour les 3 sites
