# Choix Technologiques Validés

Ce document liste tous les choix technologiques validés pour le projet.

---

## Architecture

**Mono-repo pnpm**
- Workspaces pour partager code entre apps
- Structure : `apps/` (3 apps) + `shared/` (code commun)

---

## Frontend

### BlackMarket (Application à Optimiser)
- **Framework :** Nuxt 3
- **UI :** Vue 3
- **Language :** TypeScript
- **SSR :** Activé (mal configuré dans baseline, optimisé dans branches)

### Site de Présentation
- **Tech :** HTML/CSS/JavaScript
- **TypeScript :** Optionnel
- **Framework CSS :** Tailwind recommandé

### Site de Vote
- **Tech :** HTML/CSS/JavaScript ou Nuxt 3 static
- **TypeScript :** Optionnel
- **Framework CSS :** Tailwind recommandé
- **Optimisation :** Mobile-first

---

## Communication Temps Réel

**Service :** Ably
- WebSocket managé (pas de serveur à gérer)
- Gratuit jusqu'à 6M messages/mois
- SDK JavaScript simple
- Reconnexion automatique

**Alternative non retenue :** Socket.io (nécessite serveur)

---

## Hébergement

**Plateforme :** Netlify
- 4 sites au total
- Branch deploys pour BlackMarket (17 sous-domaines)
- Variables d'environnement pour ABLY_API_KEY
- Build automatique depuis Git

**Domaines :**
- `blackmarket.com` (à acheter) - 17 sous-domaines
- TBD pour présentation et vote

**Alternative non retenue :** Vercel (moins adapté pour les branch deploys multiples)

---

## Package Manager

**pnpm**
- Plus rapide que npm
- Gestion efficace des workspaces
- Hard links pour économiser l'espace disque

**Alternative non retenue :** npm workspaces (plus lent), yarn (moins optimisé pour mono-repos)

---

## Persistence

### Côté Présentation
**LocalStorage**
- État complet de la session
- Sauvegarde automatique après chaque action
- Restauration au refresh

**Alternative non retenue :** Base de données (overkill pour session éphémère)

### Côté Vote
**LocalStorage**
- Avatar de l'utilisateur (userId, pseudo, avatarCode)
- Reconnexion automatique

---

## Mesure Performance

**Outil :** Lighthouse CLI
- Script bash simple
- Mesure locale des 17 sous-domaines
- Scores consolidés en JSON

**Alternative non retenue :** Lighthouse CI avec GitHub Actions (trop complexe pour 17 mesures one-shot)

---

## Déploiement BlackMarket

**Stratégie :** 17 branches Git → 17 sous-domaines
- 1 baseline : `baseline.blackmarket.com`
- 16 optimisées : `faaa.blackmarket.com`, `faab.blackmarket.com`, etc.

**Alternative non retenue :** Routing dynamique (impossible de vraiment tester les optimisations de build)

---

## Système d'Avatars

**Format :** SVG composable (recommandé)
- 9 bases + 4 types de variations (3 options chacun)
- Code compact : `"mw2132"` ou descriptif : `"m-white-hat2-eyes1-mouth3-acc2"`
- Rendu via `shared/avatars`

**Alternative non retenue :** Canvas (moins flexible), PNG (pas scalable)

---

## Nomenclature

### Branches Git
**Format :** `foundation-<choix1>-<choix2>-<choix3>`
- Exemple : `foundation-lcp-js-accessibility`

### Sous-domaines
**Format :** `f` + `a/b` + `a/b` + `a/b`
- `f` = foundation
- Position 1 : `a` = LCP, `b` = CLS
- Position 2 : `a` = JS, `b` = Caching
- Position 3 : `a` = Accessibility, `b` = Responsive
- Exemple : `faaa.blackmarket.com`

---

## Sécurité

**Anti-triche :** Aucun
- Confiance dans l'audience
- Pas de vérification d'identité
- Pas de limitation de votes

**Justification :** Présentation interne, pas de risque de fraude

---

## Décisions en Attente

Voir [`Points_Non_Resolus.md`](./Points_Non_Resolus.md) pour :
- Technologie de rendu du phare (SVG vs Canvas vs Frames)
- Capacité max d'affichage des avatars pendant vote
- Format d'affichage des code diffs
- Création des assets SVG (designer vs achat vs génération)
- Choix de la 3ème créature neutre
- Mode de navigation des slides
- Design général et nombre exact de produits BlackMarket
