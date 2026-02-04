# BlackMarket

Application Nuxt 3 de boutique pirate servant de **baseline** pour la présentation Lighthouse Pirates.

## Structure

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

## Documentation

Les specs sont dans le dossier parent `../specs/`.

Voir :
- [`../specs/01_Specs_BlackMarket.md`](../specs/01_Specs_BlackMarket.md) - Spécifications
- [`../CLAUDE.md`](../CLAUDE.md) - Documentation complète

## Commandes

```bash
pnpm install
pnpm dev
pnpm build
```

## Branche unique

Seule la branche `main` existe (baseline).

Les optimisations présentées sont des **exercices de pensée** traitant BlackMarket comme une vraie application avec DB, APIs, services, etc.

## Déploiement

Netlify : `https://blackmarket.com`

## Lien avec Presentation

Aucune communication directe.
Affiché en **iframe** dans lighthouse-presentation.
