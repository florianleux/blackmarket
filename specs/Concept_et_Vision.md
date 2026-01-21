# Concept et Vision

## Le Pitch

Une présentation interactive de 45 minutes où l'audience devient actrice de l'optimisation d'une application Vue.js/Nuxt.

La présentation utilise un thème pirate où l'amélioration des **4 scores Lighthouse** est visualisée comme la construction d'un phare pour guider un capitaine en sécurité vers le rivage.

À chaque étape, l'audience vote entre deux options d'optimisation. L'option choisie corrige des anti-patterns et améliore le score de la catégorie correspondante, représenté visuellement par la construction d'un nouvel étage du phare.

L'application optimisée est **BlackMarket** – une boutique d'accessoires de pirates reconditionnés (crochets, cache-œil, jambes de bois, perroquets, etc.), qui est un jeu de mots sur BackMarket.

---

## Pourquoi C'est Important

L'optimisation frontend peut être abstraite et difficile à relier à un impact concret. Cette présentation la rend tangible grâce à :

- **Participation active** - L'audience vote sur les optimisations à implémenter
- **Feedback visuel** - Les scores Lighthouse montrent des améliorations mesurables
- **Connexion thématique** - La métaphore pirate/phare crée un cadre mémorable
- **Personnalisation** - Chaque participant crée son avatar de pirate et vote en temps réel

Quand les membres de l'audience votent entre différentes options d'optimisation, ils vivent les décisions de priorisation que les développeurs affrontent quotidiennement. Le feedback immédiat du score amélioré renforce la valeur de chaque optimisation.

---

## Les 4 Catégories Lighthouse

> **4 Votes = 4 Catégories Lighthouse**
> Chaque vote couvre une catégorie différente.

| Vote | Catégorie | Option A | Option B |
|------|-----------|----------|----------|
| **Vote 1** | Performance | Images & Transfer (LCP/CLS) | Fonts & JavaScript (FCP/TBT) |
| **Vote 2** | Accessibility | Visual (contrast, focus, labels) | Semantic (buttons, landmarks, headings) |
| **Vote 3** | Best Practices | Console & Security | Modern Web Standards |
| **Vote 4** | SEO | Meta & Structure | Content & Links |

---

## La Structure

La présentation consiste en **4 votes** couvrant les **4 catégories Lighthouse** :

### Vote 1 : Performance
- **Option A - Images & Transfer** : Images optimisées (WebP, lazy loading, dimensions), compression activée
- **Option B - Fonts & JavaScript** : font-display swap, preconnect, suppression libraries inutiles

### Vote 2 : Accessibility
- **Option A - Visual** : Contraste amélioré, focus visible, labels sur inputs
- **Option B - Semantic** : Boutons sémantiques, attribut lang, skip link, hiérarchie headings

### Vote 3 : Best Practices
- **Option A - Console & Security** : Suppression console.log, rel="noopener", corrections erreurs
- **Option B - Modern Standards** : Dimensions images correctes, passive listeners, source maps

### Vote 4 : SEO
- **Option A - Meta & Structure** : Title, description, h1 unique, viewport, canonical
- **Option B - Content & Links** : Texte de liens descriptif, alt images, navigation crawlable

Chaque vote construit un nouvel étage du phare, visualisant la progression.

---

## La Technologie

Le système combine trois applications synchronisées :

1. **Site de présentation** - Affiche les slides, les différences de code, les résultats de vote et la construction du phare
2. **Site de vote** - Interface mobile où les participants créent leur avatar pirate et votent
3. **Application BlackMarket** - La boutique Nuxt qui sert de base aux optimisations (31 branches pré-configurées)

Les membres de l'audience votent via leurs smartphones en scannant un QR code. Le système comptabilise les votes en temps réel via WebSockets (Ably), et affiche les résultats et les scores Lighthouse correspondants.

---

## Approche Pédagogique

La présentation est conçue autour de principes éducatifs clés :

- **Apprentissage par la conséquence** - Voir l'impact direct des choix
- **Progression visible** - Suivre l'amélioration via les scores Lighthouse et la construction du phare
- **Pertinence technique** - Appliquer des solutions à des problèmes spécifiques
- **Enseignement inclusif** - Expliquer des concepts complexes de manière accessible

La présentation reconnaît plusieurs chemins d'optimisation valides plutôt que de prescrire une seule approche, reflétant la réalité des compromis de développement.

---

## Visualisation du Phare

Le phare se construit progressivement :

- **État initial** : Fondations seules (ou échafaudage symbolique)
- **Après Vote 1** : 1er étage construit (Performance)
- **Après Vote 2** : 2e étage construit (Accessibility)
- **Après Vote 3** : 3e étage construit (Best Practices)
- **Après Vote 4** : 4e étage + lanterne allumée (SEO) - Phare complet

Le phare apparaît au premier plan de chaque slide, montrant visuellement la progression tout au long de la présentation.

---

## Les 31 Branches Git

Les branches représentent la progression cumulative des fixes :

```
baseline (~52 anti-patterns)
├── a (Performance A)
│   ├── aa (+ Accessibility A)
│   │   ├── aaa (+ Best Practices A)
│   │   │   ├── aaaa (+ SEO A)
│   │   │   └── aaab (+ SEO B)
│   │   └── aab (+ Best Practices B)
│   │       ├── aaba
│   │       └── aabb
│   └── ab (+ Accessibility B)
│       └── ...
└── b (Performance B)
    └── ...
```

**Total : 1 baseline + 2 + 4 + 8 + 16 = 31 branches**
