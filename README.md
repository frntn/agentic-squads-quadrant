# Agentic Squads Magic Quadrant

Visualisation interactive des squads d'agents selon leur niveau d'autonomie et leur continuité opérationnelle.

![Magic Quadrant](https://img.shields.io/badge/Magic-Quadrant-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

## 🎯 Fonctionnalités

- **Magic Quadrant 2x2** avec axes Autonomie (Augmented ↔ Autonomous) et Continuité (Ponctuel ↔ Continue)
- **Dispersion automatique** des points superposés pour une visibilité optimale
- **Tailles variables** selon la valeur business (échelle exponentielle)
- **Filtres par catégorie** : Audit & Assessment, Développement, Cyber, Business, Support, Data & Content
- **Tooltips interactifs** avec détails complets au survol
- **Légende complète** avec description des quadrants et des tailles
- **Design dark moderne** et responsive

## 🚀 Démarrage rapide

### Prérequis

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Ouvrir http://localhost:3000
```

### Build de production

```bash
# Créer le build optimisé
pnpm build

# Prévisualiser le build
pnpm preview
```

## 📦 Déploiement sur GitHub Pages

Consultez le guide détaillé : [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md)

**Résumé rapide :**

1. Créer un dépôt GitHub public
2. Modifier `base` dans `vite.config.ts` avec le nom de votre dépôt
3. Pousser le code sur GitHub
4. Activer GitHub Pages avec "GitHub Actions" comme source
5. Votre site sera disponible à `https://USERNAME.github.io/REPO/`

## 🎨 Personnalisation

### Modifier les squads

Éditez `client/src/data/squads.ts` :

```typescript
export const squads: Squad[] = [
  {
    name: 'Ma Squad',
    category: 'Audit & Assessment',
    autonomy: 3, // 1-4 : Assistant, Supervisory, Collaborative, Autonomous
    continuity: 2, // 1-4 : Ponctuel, Récurrent, Régulier, Continue
    autonomyLabel: 'Collaborative',
    continuityLabel: 'Récurrent',
    valeur: 'Élevée', // Critique, Élevée, Moyenne, Faible
    risque: 'Moyen',
    complexite: 'Moyenne',
    hitl: 'Modéré',
  },
  // ... autres squads
];
```

### Modifier les couleurs

Dans `client/src/data/squads.ts`, modifiez `categoryColors` :

```typescript
export const categoryColors: Record<Squad['category'], string> = {
  'Audit & Assessment': '#3b82f6', // Bleu
  'Développement': '#8b5cf6', // Violet
  // ... autres catégories
};
```

### Modifier le titre

Dans `client/src/const.ts` :

```typescript
export const APP_TITLE = 'Mon Magic Quadrant';
```

## 📊 Structure du projet

```
agentic-squads-quadrant/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── MagicQuadrant.tsx    # Composant principal du quadrant
│   │   ├── data/
│   │   │   └── squads.ts            # Données des squads
│   │   ├── pages/
│   │   │   └── Home.tsx             # Page d'accueil
│   │   ├── const.ts                 # Constantes (titre, logo)
│   │   └── index.css                # Styles globaux
│   └── public/                      # Assets statiques
├── .github/
│   └── workflows/
│       └── deploy.yml               # Workflow GitHub Actions
└── vite.config.ts                   # Configuration Vite
```

## 🧪 Tests

```bash
# Lancer les tests unitaires
pnpm test

# Tests en mode watch
pnpm test:watch
```

## 🛠️ Technologies

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Chart.js** - Visualisation de données
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Vitest** - Testing framework

## 📝 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Créé avec ❤️ pour l'analyse des cas d'usage d'agentic squads dans les cabinets de conseil tech & data**
