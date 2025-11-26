# Déploiement sur GitHub Pages

Ce guide vous explique comment déployer votre Magic Quadrant sur GitHub Pages.

## Prérequis

- Un compte GitHub
- Git installé sur votre machine
- Node.js et pnpm installés

## Étape 1 : Télécharger le projet

1. Cliquez sur le bouton **"Code"** dans l'interface de gestion du projet
2. Téléchargez tous les fichiers du projet
3. Extrayez l'archive sur votre machine locale

## Étape 2 : Créer un dépôt GitHub

1. Allez sur [GitHub](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"New repository"** (ou **"+"** en haut à droite → **"New repository"**)
3. Donnez un nom à votre dépôt (par exemple : `agentic-squads-quadrant`)
4. Choisissez **Public** (obligatoire pour GitHub Pages gratuit)
5. **Ne cochez pas** "Initialize this repository with a README"
6. Cliquez sur **"Create repository"**

## Étape 3 : Configurer le projet pour GitHub Pages

### 3.1. Modifier le fichier `vite.config.ts`

Ouvrez le fichier `vite.config.ts` et ajoutez la ligne `base` avec le nom de votre dépôt :

```typescript
export default defineConfig({
  base: '/agentic-squads-quadrant/', // Remplacez par le nom de votre dépôt
  plugins: [
    // ... reste de la configuration
  ],
});
```

### 3.2. Créer le workflow GitHub Actions

Créez le fichier `.github/workflows/deploy.yml` avec ce contenu :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./client/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Étape 4 : Pousser le code sur GitHub

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Agentic Squads Magic Quadrant"

# Ajouter le dépôt distant (remplacez USERNAME et REPO par vos valeurs)
git remote add origin https://github.com/USERNAME/REPO.git

# Renommer la branche en main
git branch -M main

# Pousser le code
git push -u origin main
```

## Étape 5 : Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **"Settings"** (Paramètres)
3. Dans le menu latéral, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez **"GitHub Actions"**
5. Le déploiement se lancera automatiquement

## Étape 6 : Accéder à votre site

Après quelques minutes, votre site sera disponible à l'adresse :

```
https://USERNAME.github.io/REPO/
```

Par exemple : `https://johndoe.github.io/agentic-squads-quadrant/`

## Mises à jour futures

Pour mettre à jour votre site, il suffit de :

1. Modifier les fichiers localement
2. Commit et push :
   ```bash
   git add .
   git commit -m "Description des changements"
   git push
   ```
3. GitHub Actions redéploiera automatiquement

## Personnalisation

### Modifier les données des squads

Éditez le fichier `client/src/data/squads.ts` pour ajouter, modifier ou supprimer des squads.

### Modifier les couleurs des catégories

Dans `client/src/data/squads.ts`, modifiez l'objet `categoryColors`.

### Modifier le titre

Dans `client/src/const.ts`, modifiez la constante `APP_TITLE`.

## Dépannage

### Le site ne s'affiche pas correctement

- Vérifiez que le `base` dans `vite.config.ts` correspond au nom de votre dépôt
- Assurez-vous que GitHub Pages est activé avec "GitHub Actions" comme source

### Le workflow échoue

- Vérifiez les logs dans l'onglet "Actions" de votre dépôt
- Assurez-vous que les permissions sont correctement configurées dans Settings → Actions → General → Workflow permissions

## Support

Pour toute question ou problème, ouvrez une issue sur le dépôt GitHub.
