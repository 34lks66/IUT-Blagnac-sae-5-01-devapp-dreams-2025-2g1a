# HACKING

## Prérequis

Le projet est compatible avec Linux, Windows et macOS.

- Node.js (version LTS recommandée)
- npm (installé avec Node.js)

**Installation** :
```sh
git clone git@github.com:34lks66/IUT-Blagnac-sae-5-01-devapp-dreams-2025-2g1a.git

cd IUT-Blagnac-sae-5-01-devapp-dreams-2025-2g1a/dev/site_dreams/

npm install
```
## Lancement du Projet 

Pour démarrer le site en mode développement :

```sh
npm run dev
```
Le site sera disponible sur http://localhost:5173

Pour construire une version build :
```sh
npm run build
npm run preview
```

## Tests
Les tests utilisent Vitest et Testing Library.
Pour lancer les tests :
```sh
npm test
```

## Structure du projet

- `src/` : Code source principal (composants React, hooks, utilitaires…)

- `public/` : Fichiers statiques

- `tests/` : Tests unitaires et d’intégration

- `vite.config.ts` : Configuration de Vite

- `tsconfig.json` : Configuration TypeScript
