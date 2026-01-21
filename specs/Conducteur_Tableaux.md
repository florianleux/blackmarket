# Conducteur Présentation - Tableaux

---

## Tableau des Slides

| # | Section | Slide | Contenu | Phare |
|---|---------|-------|---------|-------|
| 1 | Intro | Attente | "Join the crew!" - QR code + création avatar | — |
| 2 | Intro | Présentation personnelle | Qui tu es | — |
| 3 | Intro | Question audience | Niveau de connaissance Lighthouse | — |
| 4 | Intro | Aventure pirate (1/2-3) | "Let's build a lighthouse" - contexte narratif (TBD) | Fondations |
| 5 | Intro | Aventure pirate (2/2-3) | Suite contexte (TBD) | Fondations |
| 6 | Intro | BlackMarket | Présentation de la boutique pirate | Fondations |
| 7 | Intro | Scores baseline | Affichage des 4 scores initiaux | Fondations |
| 8 | Intro | Mission | "4 days to build the best lighthouse possible" | Fondations |
| | | | | |
| 9 | Day 1 | Catégorie Performance | Présentation critères + score actuel | Fondations |
| 10 | Day 1 | Comparaison options | Option A vs Option B (global) | Fondations |
| 11 | Day 1 | Vote | Vote 20s | Fondations |
| 12 | Day 1 | Détail option gagnante | Fixes détaillés de l'option choisie | Fondations |
| 13 | Day 1 | Application | Iframe site + recalcul score + 1er étage | Étage 1 (choix 1) |
| | | | | |
| 14 | Day 2 | Catégorie Accessibility | Présentation critères + score actuel | Étage 1 |
| 15 | Day 2 | Comparaison options | Option A vs Option B (global) | Étage 1 |
| 16 | Day 2 | Vote | Vote 20s | Étage 1 |
| 17 | Day 2 | Détail option gagnante | Fixes détaillés de l'option choisie | Étage 1 |
| 18 | Day 2 | Application | Iframe site + recalcul score + 2e étage | Étage 2 (choix 1-2) |
| | | | | |
| 19 | Day 3 | Catégorie Best Practices | Présentation critères + score actuel | Étage 2 |
| 20 | Day 3 | Comparaison options | Option A vs Option B (global) | Étage 2 |
| 21 | Day 3 | Vote | Vote 20s | Étage 2 |
| 22 | Day 3 | Détail option gagnante | Fixes détaillés de l'option choisie | Étage 2 |
| 23 | Day 3 | Application | Iframe site + recalcul score + 3e étage | Étage 3 (choix 1-2-3) |
| | | | | |
| 24 | Day 4 | Catégorie SEO | Présentation critères + score actuel | Étage 3 |
| 25 | Day 4 | Comparaison options | Option A vs Option B (global) | Étage 3 |
| 26 | Day 4 | Vote | Vote 20s | Étage 3 |
| 27 | Day 4 | Détail option gagnante | Fixes détaillés de l'option choisie | Étage 3 |
| 28 | Day 4 | Application | Iframe site + recalcul score + 4e étage + lanterne | Complet (choix 1-2-3-4) |
| | | | | |
| 29 | Fin | Récapitulation | Phare fini + 4 scores finaux | Complet |
| 30 | Fin | Meilleure solution | Combinaison optimale + comparaison | Complet |
| 31 | Fin | Conclusion | (TBD) | Complet |
| 32 | Fin | Questions | Q&A | Complet |

**Notes :**
- Vote : 20 secondes
- Iframe : pointe vers le sous-domaine correspondant au path (ex: `ab.blackmarket.com`)
- Phare : chaque étage affiche la lettre du choix (A/B)
- Slide 30 : combinaison optimale précalculée (max somme des 4 scores)

---

## Tableau des Choix (Global)

| Vote | Option A | Option B |
|------|----------|----------|
| **1. Performance** | **Images & Transfer** : WebP, lazy loading, width/height, compression | **Fonts & JS** : font-display swap, preconnect, suppression lodash/moment/jQuery |
| **2. Accessibility** | **Visual** : contrastes 4.5:1, focus visible, labels inputs, noms accessibles | **Semantic** : `<button>` au lieu de div, attribut lang, skip link, hiérarchie headings |
| **3. Best Practices** | **Console & Security** : suppression console.log, rel="noopener", pas de document.write | **Modern Standards** : dimensions images correctes, passive listeners, source maps masquées |
| **4. SEO** | **Meta & Structure** : title, description, h1 unique, viewport, canonical | **Content & Links** : liens descriptifs, alt images, navigation crawlable |

---

## Tableaux des Choix Détaillés

### Vote 1 : Performance

| Option A - Images & Transfer | Option B - Fonts & JS |
|------------------------------|----------------------|
| Conversion images en WebP | `font-display: swap` sur toutes les fonts |
| Ajout `loading="lazy"` below-fold | Suppression fonts render-blocking |
| Ajout attributs `width` et `height` | Ajout `preconnect` pour domaines externes |
| Suppression CSS render-blocking | Suppression librairies inutiles (lodash, moment, jQuery) |
| Activation compression gzip/brotli | Suppression third-party scripts bloquants |
| | Suppression script inline 500ms |

---

### Vote 2 : Accessibility

| Option A - Visual | Option B - Semantic |
|-------------------|---------------------|
| Amélioration contrastes (ratio 4.5:1) | Remplacement div cliquables par `<button>` |
| Ajout focus indicators visibles | Ajout attribut `lang` sur `<html>` |
| Labels sur tous les inputs | Ajout skip link |
| Noms accessibles sur liens/boutons | Correction keyboard traps |
| Contrôles sur médias auto-play | Correction hiérarchie headings (h1→h2→h3) |

---

### Vote 3 : Best Practices

| Option A - Console & Security | Option B - Modern Standards |
|-------------------------------|----------------------------|
| Suppression console.log en production | Correction dimensions d'affichage images |
| Ajout `rel="noopener"` sur liens externes | Vérification doctype |
| Suppression `document.write()` | Suppression demandes permissions agressives |
| Correction erreurs console | Ajout passive listeners (scroll, touch) |
| Mise à jour librairies vulnérables | Masquage source maps en production |

---

### Vote 4 : SEO

| Option A - Meta & Structure | Option B - Content & Links |
|-----------------------------|---------------------------|
| Ajout `<title>` unique | Texte de liens descriptif (pas de "click here") |
| Ajout `<meta name="description">` | Attributs `alt` sur toutes les images |
| Un seul `<h1>` par page | Suppression meta noindex |
| Vérification viewport meta | Navigation crawlable (vrais `<a href>`) |
| Ajout canonical URL | Suppression chaînes de redirections |
