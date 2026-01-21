# BlackMarket

Pirate shop Nuxt 3 app with **31 Git branches** for Lighthouse optimization demo.

## Overview

BlackMarket is a fictional pirate accessories e-commerce site intentionally built with anti-patterns. It serves as the demo app for an interactive presentation where the audience votes to fix Lighthouse issues.

## Branches (31)

```
baseline                    # All anti-patterns (~52)
├── a                       # Vote 1 → Performance A (Images)
│   ├── aa                  # + Vote 2 → Accessibility A (Visual)
│   │   ├── aaa             # + Vote 3 → Best Practices A (Console)
│   │   │   ├── aaaa        # + Vote 4 → SEO A (Meta)
│   │   │   └── aaab        # + Vote 4 → SEO B (Links)
│   │   └── aab
│   └── ab
└── b                       # Vote 1 → Performance B (Fonts)
    └── ...
```

**Total: 1 baseline + 2 + 4 + 8 + 16 = 31 branches**

## Tech Stack

- **Framework**: Nuxt 3 + Vue 3 + TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Netlify with branch deploys

## Development

```bash
pnpm install
pnpm dev
```

## Deployment

Each branch deploys to its own subdomain:
- `baseline.blackmarket.com`
- `a.blackmarket.com`
- `aaaa.blackmarket.com`
- ... (31 subdomains)

## Related

This app is displayed in an iframe within [lighthouse-presentation](https://github.com/florianleux/lighthouse-presentation).

See `../specs/` for full documentation.
