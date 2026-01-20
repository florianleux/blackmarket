# Lighthouse Pirates

Présentation interactive de 45 minutes où l'audience vote pour optimiser une application Vue.js/Nuxt. Les améliorations sont mesurées via Lighthouse et visualisées par la construction d'un phare.

## 🚀 Quick Start

```bash
# Installation
pnpm install

# Développement
pnpm dev:blackmarket    # Lance BlackMarket (Nuxt 3)
pnpm dev:presentation   # Lance le site de présentation
pnpm dev:vote          # Lance le site de vote mobile

# Build
pnpm build:all
```

## 📚 Documentation

**Point d'entrée :** [`claude.md`](./claude.md)

Ce fichier indexe toute la documentation du projet dans l'ordre de lecture recommandé.

## 🏗️ Structure

```
lighthouse-pirates/
├── apps/
│   ├── blackmarket/     # Application à optimiser (17 branches)
│   ├── presentation/    # Site de présentation projeté
│   └── vote/           # Application mobile de vote
├── shared/             # Code partagé (types, avatars, constantes)
├── scripts/            # Scripts utilitaires
└── docs/              # Documentation (voir claude.md)
```

## 🔑 Technologies

- **Frontend :** Nuxt 3, Vue 3, TypeScript
- **Package Manager :** pnpm (workspaces)
- **WebSockets :** Ably
- **Hosting :** Netlify
- **Monitoring :** Lighthouse CI

## ⚙️ Configuration

Variables d'environnement requises :
```
ABLY_API_KEY=your-api-key-here
```

## 📖 Lire la Documentation

Voir [`claude.md`](./claude.md) pour l'index complet de la documentation.

**Fichiers clés :**
- [`00_Specs_Techniques_Generales.md`](./00_Specs_Techniques_Generales.md) - Architecture et décisions techniques
- [`01_Specs_BlackMarket.md`](./01_Specs_BlackMarket.md) - Application BlackMarket (17 branches)
- [`02_Specs_Site_Presentation.md`](./02_Specs_Site_Presentation.md) - Site de présentation
- [`03_Specs_Site_Vote.md`](./03_Specs_Site_Vote.md) - Site de vote mobile
