# Liste des Anti-Patterns - BlackMarket Baseline

> **~52 Anti-Patterns implémentés**
> Liste basée sur les commits réels du projet.

---

## Résumé par Catégorie

| Vote | Catégorie | Anti-patterns |
|------|-----------|---------------|
| Vote 1 | Performance | 12 |
| Vote 2 | Accessibility | 20 |
| Vote 3 | Best Practices | 14 |
| Vote 4 | SEO | 6 |
| **Total** | - | **~52** |

---

## 1. PERFORMANCE (12 anti-patterns)

*Source : commit f61fb5d, c5e4b3d*

### Images (LCP Impact)
1. **Heavy PNG images** (~6.4MB each, 1500x1500 uncompressed)
2. **No lazy loading** (`loading="eager"` on all images)
3. **No width/height attributes** on images (CLS risk)

### Render-Blocking Resources (FCP Impact)
4. **5 Google Fonts with display=block** (FOIT) - Pirata One, Roboto, Open Sans, Lato, Montserrat
5. **External CSS in head** (animate.css, bootstrap.css)
6. **No preconnect hints** for external origins

### JavaScript (TBT Impact)
7. **500ms inline blocking script** in head
8. **6 heavy third-party libraries** loaded synchronously - jQuery, Lodash, Moment.js, Three.js, D3.js, Chart.js
9. **Unused lodash + moment** in app.vue (bundle bloat)
10. **Tree-shaking disabled** (treeshakeClientOnly: false)

### Server Config
11. **No compression** (compressPublicAssets: false)
12. **No minification** (minify: false)

---

## 2. ACCESSIBILITY (20 anti-patterns)

*Source : commits 453fe98, 9df51a5, 1b9c910*

### Visual Accessibility
1. **Low contrast text** (~2.5:1 ratio)
2. **No focus indicators** (`outline: none` on all focusable elements)
3. **Input without associated label** (search input in TheHeader)

### Semantic Accessibility
4. **Empty links/buttons** (icon-only elements without accessible names)
5. **Auto-playing audio** (hidden audio element with autoplay)
6. **Divs with click handlers** (using `role="button"` on divs instead of `<button>`)
7. **Missing `lang` attribute** (no lang on `<html>` element)
8. **No skip link** (no "skip to content" link for keyboard users)
9. **Keyboard trap** (modal that prevents Escape key)
10. **Skipped heading levels** (h4 after h1, skipping h2/h3)

### Additional Accessibility Issues
11. **user-scalable=no** in viewport meta (prevents zoom)
12. **Invalid role values** (role="pirate-button")
13. **Roles missing required aria attributes** (checkbox without aria-checked)
14. **tabindex > 0** (disrupts natural tab order)
15. **Images without alt attributes**
16. **List with non-li children** (`<ul>` containing `<div>`, `<span>`)
17. **Orphan `<li>` elements** outside of lists
18. **Deprecated ARIA role** (role="directory")
19. **Empty buttons** without accessible names
20. **Tiny touch targets**

---

## 3. BEST PRACTICES (14 anti-patterns)

*Source : commit c839c27*

### Console & Security
1. **External links without rel="noopener"** (social media links with target="_blank")
2. **document.write()** during page load
3. **Console errors** (intentional console.error calls, calling undefined function)
4. **Unhandled promise rejection** (Promise.reject() without catch handler)

### Permissions
5. **Geolocation request without user gesture** (navigator.geolocation on page load)
6. **Notification permission without user gesture** (Notification.requestPermission() on page load)

### Modern Standards
7. **Non-passive event listeners** (scroll and touchstart with { passive: false })
8. **Deprecated APIs** (document.all, document.charset, document.inputEncoding)
9. **Mixed content warning** (HTTP image loaded on HTTPS page)
10. **Third-party iframe for cookies** (YouTube embed iframe)
11. **Source maps exposed in production** (sourcemap: { client: true, server: true })
12. **Distorted image aspect ratio** (width="200" height="400" on square images)
13. **Paste blocking on inputs** (onpaste="return false;")
14. **Insecure cookie** (document.cookie without SameSite attribute)

---

## 4. SEO (6 anti-patterns)

*Source : commit 31c8507*

### Meta & Structure
1. **Multiple h1 tags** on page (PageHero, PromoBanner, TheFooter)
2. **No meta title/description** (no useHead() with title or description)

### Content & Links
3. **robots.txt blocking all crawlers** (Disallow: /)
4. **Generic link text** ("Click here", "Read more", "Learn more")
5. **Generic/unhelpful alt text** on images (alt="image")
6. **JS-only navigation** (not crawlable - @click handlers instead of `<a href>`)

---

## Fichiers Impactés

| Fichier | Catégories |
|---------|------------|
| `app.vue` | Performance, Accessibility, Best Practices |
| `nuxt.config.ts` | Performance, Best Practices |
| `components/ProductCard.vue` | Performance, Accessibility, Best Practices, SEO |
| `components/TheHeader.vue` | Accessibility, SEO |
| `components/TheFooter.vue` | Accessibility, Best Practices, SEO |
| `components/PromoBanner.vue` | SEO |
| `assets/css/custom.css` | Accessibility |
| `public/robots.txt` | SEO |
| `public/images/products/*.png` | Performance |

---

## Notes

- Les anti-patterns sont commentés avec `// ANTI-PATTERN:` dans le code
- La répartition entre Option A et Option B pour chaque vote sera définie lors de la création des branches fixes
