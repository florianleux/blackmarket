# BlackMarket

[Voir le site / See the site](https://blackmarket.florianleux.fr) · [La conférence / The talk](https://github.com/florianleux/lighthouse-presentation)

## 🇫🇷 En français

Une fausse boutique pirate, volontairement mal construite. Elle sert de terrain de jeu à ma conférence [Let's build a Lighthouse](https://github.com/florianleux/lighthouse-presentation).

Le site part d'un score Lighthouse catastrophique, avec une cinquantaine d'erreurs courantes : images trop lourdes, polices mal chargées, contrastes illisibles, erreurs dans la console, balises SEO manquantes…

Pendant la conférence, le public vote 4 fois pour choisir quoi corriger. Chaque combinaison de votes correspond à une branche git déjà prête, déployée à sa propre adresse. Ça fait 31 branches au total : 1 de départ, puis 2, 4, 8 et 16.

## 🇬🇧 In English

A fake pirate shop, built badly on purpose. It's the playground for my talk [Let's build a Lighthouse](https://github.com/florianleux/lighthouse-presentation).

The site starts with a terrible Lighthouse score and about fifty common mistakes: heavy images, badly loaded fonts, unreadable contrast, console errors, missing SEO tags…

During the talk, the audience votes 4 times to pick what to fix. Every combination of votes matches a ready-made git branch, deployed at its own address. That's 31 branches in total: 1 starting point, then 2, 4, 8 and 16.

```
baseline              tout est cassé / everything is broken
├── a                 vote 1 : Performance A (images)
│   ├── aa            vote 2 : Accessibilité A
│   │   ├── aaa       vote 3 : Bonnes pratiques A
│   │   │   ├── aaaa  vote 4 : SEO A
│   │   │   └── aaab  vote 4 : SEO B
│   │   └── aab
│   └── ab
└── b                 vote 1 : Performance B (polices / fonts)
    └── …
```

## Stack

Nuxt 3 · Vue 3 · TypeScript · Tailwind CSS · Netlify (un déploiement par branche / one deploy per branch)

## Lancer en local / Run locally

```bash
pnpm install
pnpm dev
```
