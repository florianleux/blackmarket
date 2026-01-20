# Structure de la Documentation

## 📋 Fichiers de Documentation

### Point d'Entrée
- **`claude.md`** - Index principal avec ordre de lecture recommandé ⭐ **START HERE**
- **`README.md`** - Vue d'ensemble rapide du projet

### Concept et Vision (Lire en premier)
- **`Concept_et_Vision.md`** - Pitch, métaphore du phare, structure de la présentation
- **`Structure_Presentation.md`** - Flow des slides, timing, visualisations

### Spécifications Techniques (Architecture)
- **`00_Specs_Techniques_Generales.md`** - Architecture mono-repo, Ably, déploiement, persistence ⭐
- **`Choix_Technologiques.md`** - Résumé de tous les choix tech validés

### Spécifications par Application
- **`01_Specs_BlackMarket.md`** - 17 branches, anti-patterns, optimisations
- **`02_Specs_Site_Presentation.md`** - Navigation, votes, phare, panel admin
- **`03_Specs_Site_Vote.md`** - Création avatars, états, interface mobile

### Détails Techniques
- **`Liste_Anti-Patterns.md`** - 34 anti-patterns à implémenter (baseline)
- **`Points_Non_Resolus.md`** - Questions techniques restant à décider

### Configuration Projet
- **`package.json`** - Scripts pnpm, dépendances
- **`pnpm-workspace.yaml`** - Configuration workspaces
- **`.gitignore`** - Fichiers à ignorer

---

## 🎯 Ordre de Lecture Recommandé

1. **`claude.md`** - Point d'entrée, vue d'ensemble
2. **`Concept_et_Vision.md`** - Comprendre le projet
3. **`00_Specs_Techniques_Generales.md`** - Architecture et décisions
4. Specs de l'app concernée (`01_`, `02_`, ou `03_`)
5. **`Liste_Anti-Patterns.md`** (si BlackMarket)
6. **`Points_Non_Resolus.md`** (si besoin de clarification)

---

## 📊 Organisation Logique

```
Documentation/
│
├─ Entrée et Concepts
│  ├─ claude.md (index)
│  ├─ README.md (quick start)
│  ├─ Concept_et_Vision.md
│  └─ Structure_Presentation.md
│
├─ Architecture Technique
│  ├─ 00_Specs_Techniques_Generales.md (⭐ priorité)
│  └─ Choix_Technologiques.md (résumé)
│
├─ Spécifications Applications
│  ├─ 01_Specs_BlackMarket.md
│  ├─ 02_Specs_Site_Presentation.md
│  └─ 03_Specs_Site_Vote.md
│
├─ Détails & Références
│  ├─ Liste_Anti-Patterns.md
│  └─ Points_Non_Resolus.md
│
└─ Configuration
   ├─ package.json
   ├─ pnpm-workspace.yaml
   └─ .gitignore
```

---

## 💡 Guide d'Utilisation

### Pour commencer le projet
1. Lire `claude.md`
2. Lire `00_Specs_Techniques_Generales.md`
3. Lire `Choix_Technologiques.md`

### Pour travailler sur une app spécifique
1. Consulter la spec de l'app (01_, 02_, ou 03_)
2. Vérifier `Points_Non_Resolus.md` si question
3. Référencer `Liste_Anti-Patterns.md` si BlackMarket

### Pour comprendre le concept
1. `Concept_et_Vision.md`
2. `Structure_Presentation.md`

### En cas de doute
1. Chercher dans `claude.md` (index)
2. Vérifier `Points_Non_Resolus.md`
3. Relire la spec technique générale

---

## ✅ Complétude de la Documentation

**Décisions validées :**
- ✅ Mono-repo pnpm
- ✅ 17 sous-domaines BlackMarket
- ✅ Communication Ably
- ✅ Persistence LocalStorage
- ✅ Système d'avatars (729 combos)
- ✅ Panel admin
- ✅ Nomenclature branches/sous-domaines

**Décisions en attente :**
- ⏳ Technologie rendu phare
- ⏳ Capacité affichage avatars
- ⏳ Format code diffs
- ⏳ Assets SVG avatars
- ⏳ Design général
- ⏳ Contenu exact BlackMarket

Voir `Points_Non_Resolus.md` pour détails.
