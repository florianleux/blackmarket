# Plan: BlackMarket Homepage - BackMarket Style (Pirate Theme)

## Overview
Implement a BackMarket-style e-commerce homepage for the BlackMarket app selling reconditioned pirate accessories. All labels in English, with intentional anti-patterns for Lighthouse baseline.

---

## Reference Structure (from BackMarket screenshot)

```
┌─────────────────────────────────────────────────────────┐
│ HEADER: Logo | Search Bar | Sell | Help | Account | Cart│
├─────────────────────────────────────────────────────────┤
│ CATEGORY NAV: Hooks | Eye Patches | Peg Legs | Parrots..│
├─────────────────────────────────────────────────────────┤
│ BREADCRUMB: Home > Pirate Gear > All Products           │
├─────────────────────────────────────────────────────────┤
│ TRUST BADGES: [Warranty] [Free Ship] [Returns] [Support]│
├─────────────────────────────────────────────────────────┤
│ PAGE HERO: "Reconditioned Pirate Gear" + description    │
├─────────────────────────────────────────────────────────┤
│ FILTER BAR: Category | Price | Condition | Rating | Sort│
├────────────┬────────────────────────────────────────────┤
│ PROMO      │  PRODUCT GRID (3 columns)                  │
│ SIDEBAR    │  [Card] [Card] [Card]                      │
│            │  [Card] [Card] [Card]                      │
│ "Trade     ├────────────────────────────────────────────┤
│  Your      │  PROMO BANNER (full width)                 │
│  Loot!"    │  "Summer Sale - 50% off parrots!"          │
│            ├────────────────────────────────────────────┤
│            │  [Card] [Card] [Card]                      │
│            │  [Card] [Card] [Card]                      │
└────────────┴────────────────────────────────────────────┘
│ FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Phase 1: Update Existing Components

#### 1.1 Update TheHeader.vue
**File:** [TheHeader.vue](apps/blackmarket/components/TheHeader.vue)

Add:
- Search bar input (styled, non-functional)
- "Sell Your Loot" button
- "Help" button
- Category navigation bar below header

```
Structure:
<div class="header">
  <div class="header-top">
    <logo> | <search-bar> | <sell-btn> <help-btn> <account-btn> <cart-btn>
  </div>
  <div class="category-nav">
    Hooks | Eye Patches | Peg Legs | Parrots | Hats | Swords | Maps
  </div>
</div>
```

#### 1.2 Update ProductCard.vue
**File:** [ProductCard.vue](apps/blackmarket/components/ProductCard.vue)

Add:
- Color variant dots (e.g., gold/silver/bronze for hooks)
- Condition badge ("Like New", "Good", "Fair")
- Change French labels to English

#### 1.3 Update ProductGrid.vue
**File:** [ProductGrid.vue](apps/blackmarket/components/ProductGrid.vue)

- Change "Voir tout" to "View all"
- Support 3-column layout (instead of 4)

---

### Phase 2: Create New Components

#### 2.1 BreadcrumbNav.vue (NEW)
**File:** `apps/blackmarket/components/BreadcrumbNav.vue`

Props: `items: Array<{label: string}>`
Display: `Home > Pirate Gear > All Products`

#### 2.2 TrustBadges.vue (NEW)
**File:** `apps/blackmarket/components/TrustBadges.vue`

4 badges:
- "12-Month Captain's Guarantee"
- "Free Shipping to All Seven Seas"
- "30-Day No Questions Return"
- "Crew Support 24/7"

#### 2.3 PageHero.vue (NEW)
**File:** `apps/blackmarket/components/PageHero.vue`

Title: "Reconditioned Pirate Gear"
Description: Marketing text about premium pirate accessories

#### 2.4 FilterBar.vue (NEW)
**File:** `apps/blackmarket/components/FilterBar.vue`

Filters (visual only, non-functional):
- Category dropdown
- Price dropdown
- Condition dropdown
- Rating dropdown
- Sort by: "Best Match"

#### 2.5 PromoSidebar.vue (NEW)
**File:** `apps/blackmarket/components/PromoSidebar.vue`

Trade-in promotion card:
- Title: "Trade Your Old Gear!"
- Text: "Got rusty hooks? Trade them for doubloons!"
- CTA: "Get a Quote"

#### 2.6 PromoBanner.vue (NEW)
**File:** `apps/blackmarket/components/PromoBanner.vue`

Full-width promotional banner:
- Large background image (intentionally unoptimized - LCP anti-pattern)
- Title: "Summer Sale!"
- Subtitle: "Up to 50% off on selected parrots"
- CTA: "Shop Now"

---

### Phase 3: Create Homepage

#### 3.1 Create pages/index.vue (NEW)
**File:** `apps/blackmarket/pages/index.vue`

Assembles all components:
```vue
<template>
  <div class="homepage">
    <TheHeader />
    <BreadcrumbNav :items="breadcrumbs" />
    <TrustBadges />
    <PageHero />
    <FilterBar />
    <div class="product-section">
      <PromoSidebar />
      <div class="grid-area">
        <ProductGrid :products="firstProducts" />
        <PromoBanner />
        <ProductGrid :products="remainingProducts" />
      </div>
    </div>
    <TheFooter />
  </div>
</template>
```

---

### Phase 4: Update Data

#### 4.1 Update products.json
**File:** [products.json](apps/blackmarket/data/products.json)

Changes:
- Translate all product names/descriptions to English
- Add `condition` field ("Like New", "Good", "Fair")
- Add `variants` array for color options
- Update category IDs to English (hooks, eyepatches, peglegs, etc.)

Example product:
```json
{
  "id": "hook-gold-1",
  "name": "Premium Golden Hook",
  "category": "hooks",
  "price": 149.99,
  "originalPrice": 199.99,
  "description": "18-karat gold hook, perfect for impressing during boarding parties.",
  "image": "/images/products/hook-gold.png",
  "rating": 4.8,
  "reviews": 127,
  "badge": "Bestseller",
  "condition": "Like New",
  "variants": ["gold", "silver", "bronze"]
}
```

Categories:
```json
[
  { "id": "hooks", "name": "Hooks", "icon": "🪝" },
  { "id": "eyepatches", "name": "Eye Patches", "icon": "🏴‍☠️" },
  { "id": "peglegs", "name": "Peg Legs", "icon": "🦿" },
  { "id": "parrots", "name": "Parrots", "icon": "🦜" },
  { "id": "hats", "name": "Hats", "icon": "🎩" },
  { "id": "swords", "name": "Swords", "icon": "⚔️" },
  { "id": "maps", "name": "Maps", "icon": "🗺️" }
]
```

#### 4.2 Update useProducts.ts
**File:** [useProducts.ts](apps/blackmarket/composables/useProducts.ts)

Add new fields to Product interface:
- `condition?: string`
- `variants?: string[]`

---

### Phase 5: Styling

#### 5.1 Update main.css
**File:** [main.css](apps/blackmarket/assets/css/main.css)

Add global styles with anti-patterns:
- Dark pirate theme (#0f0f1a background)
- Low contrast text (#666)
- Removed focus outlines
- No font-display optimization

---

## File Summary

| File | Action | Priority |
|------|--------|----------|
| `components/TheHeader.vue` | UPDATE | High |
| `components/ProductCard.vue` | UPDATE | High |
| `components/ProductGrid.vue` | UPDATE | Medium |
| `components/BreadcrumbNav.vue` | CREATE | Medium |
| `components/TrustBadges.vue` | CREATE | Medium |
| `components/PageHero.vue` | CREATE | High |
| `components/FilterBar.vue` | CREATE | Medium |
| `components/PromoSidebar.vue` | CREATE | Medium |
| `components/PromoBanner.vue` | CREATE | High |
| `pages/index.vue` | CREATE | High |
| `data/products.json` | UPDATE | High |
| `composables/useProducts.ts` | UPDATE | Low |
| `assets/css/main.css` | UPDATE | Medium |

---

## Anti-Patterns to Maintain

All components must include documented anti-patterns:

| Category | Anti-patterns |
|----------|---------------|
| HTML | `<div>` instead of semantic elements (header, nav, main, article, section) |
| Images | No width/height, missing alt text, eager loading, unoptimized formats |
| Accessibility | Low contrast (#666-#aaa on dark bg), small touch targets (<44px), no focus outlines |
| Forms | No `<form>`, `<label>`, aria attributes on inputs |
| Performance | Large images, no lazy loading, all JS loaded upfront |

---

## Verification

After implementation:
1. Run `pnpm dev:blackmarket` - page should display correctly
2. Run Lighthouse audit - expect score <40 for Performance & Accessibility
3. Verify all structural elements match BackMarket layout
4. Confirm all labels are in English
