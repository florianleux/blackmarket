# BlackMarket

Application Nuxt 3 de boutique pirate avec **31 branches Git** (baseline + 30 optimisées).

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
- [`../specs/01_Specs_BlackMarket.md`](../specs/01_Specs_BlackMarket.md) - Spécifications détaillées
- [`../specs/Liste_Anti-Patterns.md`](../specs/Liste_Anti-Patterns.md) - Liste des anti-patterns
- [`../CLAUDE.md`](../CLAUDE.md) - Documentation complète

## Commandes

```bash
pnpm install
pnpm dev
pnpm build
```

## Branches (31)

```
baseline                    # Tous les anti-patterns
├── a                       # Vote 1 → Performance A
│   ├── aa                  # + Vote 2 → Accessibility A
│   │   └── ...
│   └── ab
│       └── ...
└── b                       # Vote 1 → Performance B
    └── ...
```

**Nomenclature :**
- Position 1 : `a` = Performance A, `b` = Performance B
- Position 2 : `a` = Accessibility A, `b` = Accessibility B
- Position 3 : `a` = Best Practices A, `b` = Best Practices B
- Position 4 : `a` = SEO A, `b` = SEO B

## Déploiement

Netlify avec branch deploys :
- `baseline.blackmarket.com`
- `a.blackmarket.com`
- `aaaa.blackmarket.com`
- ... (31 sous-domaines)

## Lien avec Presentation

Aucune communication directe.
Affiché en **iframe** dans lighthouse-presentation.
