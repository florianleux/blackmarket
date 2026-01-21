# Spécifications - Application BlackMarket

## Vue d'Ensemble

Boutique en ligne d'accessoires de pirates reconditionnés (crochets, cache-œil, jambes de bois, perroquets, etc.), développée avec Nuxt 3 + Vue 3. Sert de base pour démontrer les optimisations frontend et les améliorations des **4 scores Lighthouse**.

**Jeu de mots :** BlackMarket = BackMarket (pirate/reconditionnés)

---

## Les 4 Catégories Lighthouse

> **4 Votes = 4 Catégories Lighthouse**
> Chaque vote améliore une catégorie différente.

| Vote | Catégorie | Option A | Option B |
|------|-----------|----------|----------|
| **Vote 1** | Performance | Images & Transfer (LCP/CLS) | Fonts & JavaScript (FCP/TBT) |
| **Vote 2** | Accessibility | Visual (contrast, focus, labels) | Semantic (buttons, landmarks, headings) |
| **Vote 3** | Best Practices | Console & Security | Modern Web Standards |
| **Vote 4** | SEO | Meta & Structure | Content & Links |

---

## Technologies

- **Framework :** Nuxt 3
- **Frontend :** Vue 3 + TypeScript
- **Styling :** Tailwind CSS
- **SSR :** Activé (mal configuré dans la baseline)
- **Hébergement :** Netlify avec sous-domaines

---

## Structure des Branches Git (31 branches)

Les branches représentent la **progression cumulative** des fixes à chaque étape.

### Arbre des branches

```
baseline                    # Tous les anti-patterns (~52)
│
├── a                       # Vote 1 → Performance A
│   ├── aa                  # + Vote 2 → Accessibility A
│   │   ├── aaa             # + Vote 3 → Best Practices A
│   │   │   ├── aaaa        # + Vote 4 → SEO A
│   │   │   └── aaab        # + Vote 4 → SEO B
│   │   └── aab             # + Vote 3 → Best Practices B
│   │       ├── aaba
│   │       └── aabb
│   └── ab                  # + Vote 2 → Accessibility B
│       ├── aba
│       │   ├── abaa
│       │   └── abab
│       └── abb
│           ├── abba
│           └── abbb
│
└── b                       # Vote 1 → Performance B
    ├── ba
    │   ├── baa
    │   │   ├── baaa
    │   │   └── baab
    │   └── bab
    │       ├── baba
    │       └── babb
    └── bb
        ├── bba
        │   ├── bbaa
        │   └── bbab
        └── bbb
            ├── bbba
            └── bbbb
```

### Liste complète des branches

| Niveau | Branches | Votes appliqués |
|--------|----------|-----------------|
| 0 | `baseline` | Aucun fix |
| 1 | `a`, `b` | Performance |
| 2 | `aa`, `ab`, `ba`, `bb` | + Accessibility |
| 3 | `aaa` ... `bbb` (8) | + Best Practices |
| 4 | `aaaa` ... `bbbb` (16) | + SEO |

**Total : 31 branches** (1 + 2 + 4 + 8 + 16)

### Nomenclature

- Position 1 : `a` = Performance A, `b` = Performance B
- Position 2 : `a` = Accessibility A, `b` = Accessibility B
- Position 3 : `a` = Best Practices A, `b` = Best Practices B
- Position 4 : `a` = SEO A, `b` = SEO B

### Sous-domaines Netlify

Chaque branche a son sous-domaine :
- `baseline.blackmarket.com`
- `a.blackmarket.com`
- `aa.blackmarket.com`
- `aaaa.blackmarket.com`
- ... etc.

---

## Anti-Patterns Baseline

Voir [`Liste_Anti-Patterns.md`](./Liste_Anti-Patterns.md) pour la liste complète.

### Résumé par Catégorie

| Vote | Catégorie | Anti-patterns |
|------|-----------|---------------|
| Vote 1 | Performance | 12 |
| Vote 2 | Accessibility | 20 |
| Vote 3 | Best Practices | 14 |
| Vote 4 | SEO | 6 |
| **Total** | - | **~52** |

---

## Optimisations par Vote

### Vote 1A : Performance - Images & Transfer

**Fixes appliqués :**
- Conversion images en WebP
- Ajout attributs `width` et `height`
- `loading="lazy"` pour images below-fold
- Suppression CSS render-blocking
- Activation compression (gzip/brotli)

### Vote 1B : Performance - Fonts & JavaScript

**Fixes appliqués :**
- `font-display: swap` sur toutes les fonts
- Suppression fonts render-blocking
- Suppression librairies inutiles (lodash, moment)
- Suppression third-party scripts bloquants
- Ajout `preconnect` pour domaines externes

### Vote 2A : Accessibility - Visual

**Fixes appliqués :**
- Amélioration des contrastes (ratio 4.5:1)
- Ajout focus indicators visibles
- Labels sur tous les inputs
- Noms accessibles sur liens/boutons
- Contrôles sur médias auto-play

### Vote 2B : Accessibility - Semantic

**Fixes appliqués :**
- Remplacement div cliquables par buttons
- Ajout attribut `lang` sur html
- Ajout skip link
- Correction keyboard traps
- Correction hiérarchie des headings

### Vote 3A : Best Practices - Console & Security

**Fixes appliqués :**
- Suppression console.log en production
- Ajout `rel="noopener"` sur liens externes
- Suppression `document.write()`
- Correction erreurs console
- Mise à jour librairies vulnérables

### Vote 3B : Best Practices - Modern Standards

**Fixes appliqués :**
- Correction tailles d'affichage images
- Vérification doctype
- Suppression demandes permissions agressives
- Ajout passive listeners
- Masquage source maps en production

### Vote 4A : SEO - Meta & Structure

**Fixes appliqués :**
- Ajout `<title>` unique
- Ajout `<meta name="description">`
- Un seul `<h1>` par page
- Vérification viewport meta
- Ajout canonical URL

### Vote 4B : SEO - Content & Links

**Fixes appliqués :**
- Texte de liens descriptif (pas de "click here")
- Attributs `alt` sur toutes les images
- Suppression meta noindex
- Navigation crawlable (vrais liens)
- Suppression chaînes de redirections

---

## Contenu de la Boutique

**Catégories de produits :**
- Hooks (crochets)
- Eye Patches (cache-œil)
- Peg Legs (jambes de bois)
- Parrots (perroquets)
- Hats (chapeaux)
- Swords (sabres)
- Maps (cartes au trésor)

**Pages :**
- Homepage (grille de produits)

**Données :**
- 20 produits mockés en JSON
- Devises pirates (Doubloons, Diamonds, Pearls, etc.)

---

## Points d'Attention

1. **Anti-patterns volontaires**
   - Commenter avec `// ANTI-PATTERN:`
   - Documenter l'impact attendu

2. **Mesure des scores**
   - Utiliser Lighthouse en mode mobile
   - Faire plusieurs runs pour moyenner

3. **Cohérence des branches**
   - Le contenu reste identique entre branches
   - Seules les optimisations changent

4. **Images produits**
   - PNG lourds (~200KB+) dans baseline
   - WebP optimisés (~30KB) dans branches fixées
