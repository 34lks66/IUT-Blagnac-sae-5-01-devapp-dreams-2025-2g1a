# HACKING

## Prérequis

Le projet est compatible avec Linux, Windows et macOS.

- Node.js (version LTS recommandée)
- npm (installé avec Node.js)

**Installation** :
```sh
git clone git@github.com:34lks66/IUT-Blagnac-sae-5-01-devapp-dreams-2025-2g1a.git

cd IUT-Blagnac-sae-5-01-devapp-dreams-2025-2g1a/dev/

npm run install-all
```
## Lancement du Projet 

Pour démarrer le site en mode développement :

```sh
npm start
```

- Le site sera disponible sur http://localhost:5173
- Le dashboard sera disponible sur http://localhost:5174
- Le backend sera disponible sur http://localhost:5000

Pour lancer chaque sous projet individuellement:
```sh
cd backend && npm install && npm run start
cd dashboard && npm install && npm run dev
cd site_dreams && npm install && npm run dev
``` 

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

```sh
dev/
├── package.json                    # scripts racine pour lancer les sous-projets
├── backend/                        # API Node/Express
│   ├── package.json
│   ├── Server.js                   # point d'entrée du serveur
│   ├── controllers/                # Controllers (Antenne, Event, News, Member, Pays, Auth...)
│   ├── models/                     # schémas de données BD
│   ├── routes/                     # définition des routes Express
│   ├── docs/
│   │   └── swagger.js              # configuration doc API
│   └── seed/                       
│   └── .env.example                # variables d'environnement 
│
├── dashboard/                      # Dashboard (React + TypeScript)
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── Dashboard.tsx
│       ├── components/             # Sidebar, Header, ProtectedRoute, pages, etc.
│       └── Loadings/               # composants de chargement
│
└── site_dreams/                    # Site public (React + TypeScript)
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── components/             # Header, Footer, NavBar, Agenda, Home sections
        ├── pages/                  # pages statiques (donations, hébergement, etc.)
        ├── pages_dynamiques/       # pages peuplées depuis l'API (pays, villes)
        ├── data/                   # types / données partagées (ex: type.ts)
        └── styles/                 # CSS 
````
