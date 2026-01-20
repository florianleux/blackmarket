# Liste des Anti-Patterns - BlackMarket Baseline

> **4 Catégories Lighthouse - 40 Anti-Patterns Total**
>
> Cette liste répertorie tous les anti-patterns à implémenter **volontairement** dans la branche baseline de BlackMarket. Ces anti-patterns sont corrigés progressivement à travers les 4 votes de l'audience.

---

## Vue d'Ensemble des 4 Votes

| Vote | Catégorie | Option A (5 fixes) | Option B (5 fixes) |
|------|-----------|--------------------|--------------------|
| **Vote 1** | Performance | Images & Transfer (LCP/CLS) | Fonts & JavaScript (FCP/TBT) |
| **Vote 2** | Accessibility | Visual (contrast, focus, labels) | Semantic (buttons, landmarks, headings) |
| **Vote 3** | Best Practices | Console & Security | Modern Web Standards |
| **Vote 4** | SEO | Meta & Structure (title, desc, h1) | Content & Links (link text, alt, crawlable) |

---

## 1. PERFORMANCE (10 HIGH items)

### Option A - Images & Transfer
**Corrigés par : Vote 1 - Option A**

- [x] **Heavy PNG images (1-2MB, 4K uncompressed)**
  - Formats lourds (PNG non compressés)
  - Pas de formats modernes (WebP, AVIF)
  - 📍 `public/images/products/*.png`
  - Impact: HIGH - LCP

- [x] **No lazy loading (`loading="eager"`)**
  - Images below-the-fold chargées immédiatement
  - 📍 `ProductCard.vue` - `loading="eager"`
  - Impact: HIGH - LCP

- [x] **No `width`/`height` on images**
  - Pas de dimensions spécifiées
  - Cause des layout shifts
  - 📍 `ProductCard.vue` - `<img>` sans dimensions
  - Impact: HIGH - CLS

- [x] **Render-blocking CSS in `<head>`**
  - CSS externe bloque le rendu
  - 📍 `nuxt.config.ts` - Google Fonts avec `display=block`
  - Impact: HIGH - FCP

- [x] **No compression (gzip/brotli disabled)**
  - `nitro.compressPublicAssets: false`
  - 📍 `nuxt.config.ts:15`
  - Impact: HIGH - Transfer

### Option B - Fonts & JavaScript
**Corrigés par : Vote 1 - Option B**

- [x] **No `font-display: swap` (FOIT)**
  - Texte invisible pendant le chargement
  - 📍 `main.css` - @font-face sans font-display
  - Impact: HIGH - FCP

- [x] **Render-blocking font requests**
  - Fonts bloquent le rendu
  - 📍 `nuxt.config.ts` - Google Fonts sans preload
  - Impact: HIGH - FCP

- [x] **Unused heavy libraries (lodash+moment ~360KB)**
  - Bundle bloat avec code inutilisé
  - 📍 `app.vue` - imports lodash + moment
  - Impact: HIGH - TBT

- [x] **Third-party scripts (analytics, widgets)**
  - Scripts externes bloquent le main thread
  - 📍 À implémenter si nécessaire
  - Impact: HIGH - TTI/TBT

- [x] **No `preconnect` for external origins**
  - Connexions tardives aux domaines externes
  - 📍 `nuxt.config.ts` - pas de preconnect
  - Impact: HIGH - TTFB

---

## 2. ACCESSIBILITY (10 HIGH items)

### Option A - Visual Accessibility
**Corrigés par : Vote 2 - Option A**

- [ ] **Low contrast text (< 4.5:1 ratio)**
  - Texte difficile à lire
  - 📍 À implémenter dans CSS
  - Impact: HIGH - color-contrast

- [ ] **No focus indicators (`outline: none`)**
  - Navigation clavier impossible à suivre
  - 📍 À implémenter dans CSS
  - Impact: HIGH - focus-visible

- [ ] **Inputs without associated `<label>`**
  - Champs de formulaire sans label
  - 📍 À implémenter dans FilterBar.vue
  - Impact: HIGH - label

- [ ] **Empty links/buttons (no accessible name)**
  - Boutons/liens sans texte accessible
  - 📍 À implémenter
  - Impact: HIGH - link-name

- [ ] **Auto-playing media without controls**
  - Médias sans contrôles
  - 📍 À implémenter si média ajouté
  - Impact: HIGH - audio-caption

### Option B - Semantic Accessibility
**Corrigés par : Vote 2 - Option B**

- [x] **`<div>` with click handler instead of `<button>`**
  - Éléments cliquables non accessibles
  - 📍 TheHeader.vue, TradeInCard.vue
  - Impact: HIGH - button-name

- [x] **Missing `lang` attribute on `<html>`**
  - Langue non déclarée
  - 📍 `app.vue` - pas de lang sur root
  - Impact: HIGH - html-has-lang

- [ ] **No skip link for keyboard users**
  - Pas de lien "skip to content"
  - 📍 À ajouter en début de page
  - Impact: HIGH - bypass

- [ ] **Keyboard trap (can't escape modal)**
  - Focus bloqué dans un élément
  - 📍 À implémenter si modal ajouté
  - Impact: HIGH - no-keyboard-trap

- [ ] **Skipped heading levels (h1 → h3)**
  - Hiérarchie des titres cassée
  - 📍 À vérifier dans composants
  - Impact: HIGH - heading-order

---

## 3. BEST PRACTICES (10 HIGH items)

### Option A - Console & Security
**Corrigés par : Vote 3 - Option A**

- [x] **`console.log()` statements in production**
  - Logs visibles dans la console
  - 📍 `app.vue` - console.log
  - Impact: HIGH - no-console

- [ ] **Links to cross-origin without `rel="noopener"`**
  - Liens externes sans protection
  - 📍 À implémenter dans TheFooter.vue
  - Impact: HIGH - external-anchors

- [ ] **Using deprecated `document.write()`**
  - API obsolète
  - 📍 À implémenter si nécessaire
  - Impact: HIGH - no-document-write

- [ ] **Browser errors logged to console**
  - Erreurs JS dans la console
  - 📍 À vérifier
  - Impact: HIGH - errors-in-console

- [ ] **Vulnerable JavaScript libraries**
  - Dépendances avec CVE
  - 📍 moment.js a des vulnérabilités connues
  - Impact: HIGH - vulnerable-libs

### Option B - Modern Web Standards
**Corrigés par : Vote 3 - Option B**

- [ ] **Incorrect image display size**
  - Images affichées à mauvaise taille
  - 📍 ProductCard.vue - images sans dimensions
  - Impact: HIGH - image-size

- [ ] **Missing `<!DOCTYPE html>`**
  - Doctype manquant
  - 📍 Nuxt gère automatiquement
  - Impact: HIGH - doctype

- [ ] **Geolocation/notification on page load**
  - Permissions demandées sans geste utilisateur
  - 📍 À implémenter si nécessaire
  - Impact: HIGH - permission-requests

- [ ] **No passive listeners on scroll/touch**
  - Event listeners bloquants
  - 📍 À implémenter dans JS
  - Impact: HIGH - passive-listeners

- [ ] **Source maps exposed in production**
  - Source maps accessibles en prod
  - 📍 À vérifier config build
  - Impact: HIGH - source-maps

---

## 4. SEO (10 HIGH items)

### Option A - Meta & Structure
**Corrigés par : Vote 4 - Option A**

- [x] **Missing `<title>` element**
  - Pas de titre de page
  - 📍 `app.vue` - pas de useHead
  - Impact: HIGH - document-title

- [x] **Missing `<meta name="description">`**
  - Pas de meta description
  - 📍 `app.vue` - pas de useSeoMeta
  - Impact: HIGH - meta-description

- [ ] **No `<h1>` or multiple `<h1>` tags**
  - Structure de titres incorrecte
  - 📍 À vérifier dans PageHero.vue
  - Impact: HIGH - heading-order

- [ ] **Missing `<meta name="viewport">`**
  - Viewport non défini
  - 📍 Nuxt gère automatiquement
  - Impact: HIGH - viewport

- [ ] **Missing canonical URL / duplicate content**
  - Pas de canonical
  - 📍 À ajouter dans head
  - Impact: HIGH - canonical

### Option B - Content & Links
**Corrigés par : Vote 4 - Option B**

- [ ] **Links with generic text ("click here")**
  - Liens avec texte non descriptif
  - 📍 À implémenter dans TheFooter.vue
  - Impact: HIGH - link-text

- [x] **Images missing `alt` attribute**
  - Images sans alt descriptif
  - 📍 `ProductCard.vue:7` - `alt="product"`
  - Impact: HIGH - image-alt

- [ ] **robots.txt blocking CSS/JS resources**
  - Robots bloquant ressources
  - 📍 À créer fichier robots.txt
  - Impact: HIGH - is-crawlable

- [ ] **JS-only navigation (no crawlable hrefs)**
  - Navigation non crawlable
  - 📍 À vérifier dans TheHeader.vue
  - Impact: HIGH - crawlable-anchors

- [ ] **Redirect chains (>3 hops)**
  - Chaînes de redirections
  - 📍 Configuration serveur
  - Impact: HIGH - redirects

---

## Résumé par Vote

| Vote | Catégorie | Option A | Option B | Total |
|------|-----------|----------|----------|-------|
| Vote 1 | Performance | 5 | 5 | 10 |
| Vote 2 | Accessibility | 5 | 5 | 10 |
| Vote 3 | Best Practices | 5 | 5 | 10 |
| Vote 4 | SEO | 5 | 5 | 10 |
| **Total** | - | **20** | **20** | **40** |

---

## Structure des Branches (31 total)

```
baseline (tous anti-patterns)
├── a (Vote 1: Performance A)
│   ├── aa (Vote 2: A11y A)
│   │   ├── aaa (Vote 3: BP A)
│   │   │   ├── aaaa (Vote 4: SEO A)
│   │   │   └── aaab (Vote 4: SEO B)
│   │   └── aab (Vote 3: BP B)
│   │       ├── aaba
│   │       └── aabb
│   └── ab (Vote 2: A11y B)
│       └── ...
└── b (Vote 1: Performance B)
    └── ...
```

Total: 1 baseline + 2 + 4 + 8 + 16 = **31 branches**

---

## Statut d'Implémentation

| Catégorie | Implémentés | Restants |
|-----------|-------------|----------|
| Performance | 10/10 ✅ | 0 |
| Accessibility | 2/10 | 8 |
| Best Practices | 1/10 | 9 |
| SEO | 3/10 | 7 |
| **Total** | **16/40** | **24** |

> Les anti-patterns Performance sont prioritaires pour la baseline.
> Les autres catégories seront complétées progressivement.
