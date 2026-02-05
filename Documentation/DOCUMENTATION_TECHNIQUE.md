# Documentation Technique - Projet Dreams

**Version:** 1.3.0

**Date:** 05 Février 2026


---

## Sommaire
1.  [Introduction](#1-introduction)
2.  [Architecture du Système](#2-architecture-du-système)
3.  [Modélisation des Données](#3-modélisation-des-données)
4.  [Spécifications Techniques](#4-spécifications-techniques)
5.  [Documentation API](#5-documentation-api)
6.  [Sécurité](#6-sécurité)
7.  [Guide d'Installation](#7-guide-dinstallation)


---

## 1. Introduction

### 1.1 Contexte
Le projet **Dreams** est une plateforme web intégrée destinée à la gestion opérationnelle et à la promotion de l'association Dreams. Elle centralise les processus administratifs via un tableau de bord et assure la visibilité publique via un site vitrine.

### 1.2 Périmètre
Le système couvre les domaines fonctionnels suivants :
-   **Gestion des Adhérents** : Création, suivi, et administration des membres (Admins, Super-Admins).
-   **Gestion des Pays** : Administration des antennes locales, informations pratiques et actualités liées.
-   **Gestion des Bénéficiaires** : Suivi des personnes aidées par l'association.
-   **Gestion Événementielle** : Planification et affichage des événements.
-   **Communication** : Diffusion d'actualités globales et locales.

### 1.3 Glossaire
*   **SPA (Single Page Application)** : Application web qui charge une seule page HTML et met à jour dynamiquement le contenu.
*   **JWT (JSON Web Token)** : Standard pour la création de jetons d'accès sécurisés.
*   **MVC (Modèle-Vue-Contrôleur)** : Motif d'architecture logicielle séparant les données, l'interface et la logique de contrôle.
*   **ODM (Object Data Modeling)** : Technique de mapping entre une base de données orientée objet et des données relationnelles ou NoSQL.

---

## 2. Architecture du Système

### 2.1 Vue d'ensemble
Le projet repose sur une architecture **MVC**, séparant strictement la logique métier (Backend) des interfaces utilisateurs (Frontends).

```mermaid
graph TD
    subgraph Clients
        A[Navigateur Public] -->|HTTPS| C(Site Vitrine - React)
        B[Navigateur Admin]  -->|HTTPS| D(Dashboard - React)
    end

    subgraph Serveur Applicatif
        C -->|REST API / JSON| E[API Backend - Node.js/Express]
        D -->|REST API / JSON| E
    end

    subgraph Stockage
        E -->|Mongoose| F[(Base de Données - MongoDB)]
        E -->|Multer| G[Système de Fichiers /uploads]
    end
```

### 2.2 Composants
*   **Backend (API Server)** : Node.js avec Express. Il expose une API RESTful sécurisée.
*   **Dashboard** : Single Page Application (SPA) React pour l'administration.
*   **Site Vitrine** : Site React pour le grand public.
*   **Base de Données** : MongoDB, choisie pour sa flexibilité de schéma (NoSQL).

### 2.3 Architecture Frontend Détaillée

#### A. Site Vitrine (`site_dreams`)
Le site grand public est structuré pour maximiser le SEO et la performance.
*   **Stack** : React 19 + Vite.
*   **Structure** :
    *   `src/pages` : Composants de haut niveau correspondant aux routes (Accueil, Contact, etc.).
    *   `src/pages_dynamiques` : Templates pour le contenu généré dynamiquement (Articles, Profils).
    *   `src/components` : Bibliothèques de composants réutilisables (Boutons, Cards, Footer).

#### B. Dashboard (`dashboard`)
L'interface d'administration est sécurisée et modulaire.
*   **Stack** : React 19 + Vite.
*   **Structure** :
    *   `src/services` : Couche d'abstraction API (Axios) pour centraliser les appels Backend.
    *   `src/components` : Vues administratives (Tableaux CRUD, Formulaires d'édition).
    *   `src/context` : Gestion d'état global (AuthContext) pour la persistance de session.

---

## 3. Modélisation des Données

Le schéma de données est géré via l'ODM Mongoose. Voici le diagramme Entité-Association simplifié :

```mermaid
erDiagram
    ACCOUNT ||--o{ PAYS : "gère (Admin)"
    PAYS ||--o{ BENEFICIAIRE : "héberge"
    PAYS ||--o{ NEWS_PAYS : "publie"
    PAYS ||--|{ ANTENNE : "possède"
    ANTENNE ||--o{ EVENT : "organise"
    NEWS ||--|| ACCOUNT : "crée par"

    ACCOUNT {
        string _id PK
        string email UK
        string password "Hashé"
        string role "O/X/S"
        string pays "Rattachement"
    }

    PAYS {
        string _id PK
        string nom
        string image "Path"
    }

    BENEFICIAIRE {
        string _id PK
        string nom
        string prenom
        string pays FK
    }

    NEWS_PAYS {
        string _id PK
        string titre
        string pays FK
    }
```

---

## 4. Spécifications Techniques

| Composant | Technologie | Version | Rôle |
| :--- | :--- | :--- | :--- |
| **Backend** | Node.js | 16+ | Runtime JS |
| | Express | 5.x | Framework Web |
| | Mongoose | 8.x | ODM MongoDB |
| **Database** | MongoDB | 5.0+ | Persistance des données |
| **Frontend** | React | 19 | Bibliothèque UI |
| | Vite | 7.x | Bundler & Dev Server |
| | TailwindCSS | 4.x | Framework CSS |
| | TypeScript | 5.x | Typage statique |

---


## 5. Documentation API

L'API Backend RESTful expose les ressources suivantes. Une documentation interactive Swagger est également disponible à l'URL `/api-docs` lorsque le serveur est lancé (ex: `http://localhost:5000/api-docs`).

### 5.1 Ressources Principales

| Ressource | Méthode | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/api/auth/login` | Connexion utilisateur (Retourne JWT) |
| | POST | `/api/auth/refresh` | Rafraîchissement du token (nécessite cookie) |
| | POST | `/api/auth/logout` | Déconnexion |
| **Accounts** | GET | `/api/accounts/` | Récupérer tous les comptes |
| | POST | `/api/accounts/` | Créer un compte |
| | PUT | `/api/accounts/:id` | Modifier un compte |
| | DELETE | `/api/accounts/:id` | Supprimer un compte |
| **Beneficiaires** | GET | `/api/beneficiaire/get` | Lister les bénéficiaires |
| | GET | `/api/beneficiaire/get/:id` | Détail d'un bénéficiaire |
| | POST | `/api/beneficiaire/save` | Créer un bénéficiaire |
| | PUT | `/api/beneficiaire/update/:id` | Modifier un bénéficiaire |
| | DELETE | `/api/beneficiaire/delete/:id` | Supprimer un bénéficiaire |
| **News** | GET | `/api/news/get` | Lister les actualités globales |
| | GET | `/api/news/get/:id` | Détail d'une actualité |
| | POST | `/api/news/save` | Créer une actualité |
| | PUT | `/api/news/update/:id` | Modifier une actualité |
| | DELETE | `/api/news/delete/:id` | Supprimer une actualité |
| **PAYS** | GET | `/api/pays/get` | Lister les pays |
| | POST | `/api/pays/save` | Ajouter un pays |
| | PUT | `/api/pays/update/:id` | Modifier un pays |
| | DELETE | `/api/pays/delete/:id` | Supprimer un pays |
| **NewsPays** | GET | `/api/newspays/get` | Lister les actualités locales |
| | GET | `/api/newspays/get/:id` | Détail d'une actualité locale |
| | POST | `/api/newspays/save` | Créer une actualité locale |
| | PUT | `/api/newspays/update/:id` | Modifier une actualité locale |
| | DELETE | `/api/newspays/delete/:id` | Supprimer une actualité locale |
| **Antennes** | GET | `/api/antenne/get` | Lister les antennes |
| | POST | `/api/antenne/save` | Créer une antenne |
| | PUT | `/api/antenne/update/:id` | Modifier une antenne |
| | DELETE | `/api/antenne/delete/:id` | Supprimer une antenne |
| **Events** | GET | `/api/event/get` | Lister les événements |
| | POST | `/api/event/save` | Créer un événement |
| | PUT | `/api/event/update/:id` | Modifier un événement |
| | DELETE | `/api/event/delete/:id` | Supprimer un événement |
| **Projects** | GET | `/api/project/get` | Lister les projets |
| | GET | `/api/project/get/:id` | Détail d'un projet |
| | POST | `/api/project/save` | Créer un projet |
| | PUT | `/api/project/update/:id` | Modifier un projet |
| | DELETE | `/api/project/delete/:id` | Supprimer un projet |

---

## 6. Sécurité

### 6.1 Authentification
L'authentification repose sur le standard **JWT (JSON Web Token)**.
1.  L'utilisateur s'identifie via `/api/auth/login`.
2.  Le serveur valide les identifiants hashés (`bcrypt`).
3.  Un token JWT signé est renvoyé.
4.  Ce token doit être inclus dans le header `Authorization: Bearer <token>` de chaque requête protégée.

### 6.2 Contrôle d'Accès
Trois niveaux de privilèges sont définis :
*   **"S" (Super Admin)** : Accès total système, création de pays, gestion des admins.
*   **"X" (Admin Pays)** : Gestion limitée à son pays de rattachement (utilisateurs, actus locales).
*   **"O" (Bénévoles)** : Accès limité à l'administration des bénéficiaires.

### 6.3 Protection CSRF
Nous avons implémenté le pattern **Double-Submit Cookie** pour protéger le point critique de rafraîchissement des tokens (`/refresh`).
-   Un cookie non-HttpOnly `XSRF-TOKEN` est généré aléatoirement lors du login.
-   Pour chaque requête de refresh, le client doit lire ce cookie et l'envoyer dans le header `X-XSRF-TOKEN`.
-   Le serveur vérifie la correspondance entre le cookie et le header, bloquant ainsi les attaques CSRF cross-origin.


---

## 7. Guide d'Installation

### 7.1 Prérequis
Assurez-vous que votre environnement dispose de :
*   Node.js (v16 ou supérieur)
*   npm (v8 ou supérieur)
*   Git
*   Une instance MongoDB active (locale ou Atlas)

### 7.2 Déploiement Local
1.  **Clonage du dépôt**
    ```bash
    git clone https://github.com/34lks66/IUT-Blagnac-sae-5-01-devapp-dreams-2025-2g1a.git
    cd dev
    ```

2.  **Installation des dépendances**
    Nous utilisons un script script unifié pour installer les dépendances du monorepo :
    ```bash
    npm run install-all
    ```

3.  **Configuration Environnement**
    Créez un fichier `.env` dans `dev/backend` :
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/dreams
    JWT_SECRET=votre_cle_secrete_complexe
    ```

    Créez également un fichier `.env` dans les dossiers `site_dreams` et `dashboard` :
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

4.  **Démarrage**
    Lancez l'écosystème complet en mode développement :
    ```bash
    npm start
    ```
    *   API : `http://localhost:5000`
    *   Dashboard : `http://localhost:5173`
    *   Site : `http://localhost:5174`

---

## 8. Préconisations de Déploiement

Pour un environnement de production fiable et sécurisé, l'architecture suivante est recommandée :

### 8.1 Architecture Cible
```mermaid
graph LR
    User[Clients HTTPS] --> Nginx[Reverse Proxy Nginx]
    Nginx -->|443 -> 5173| Front[Dashboard]
    Nginx -->|443 -> 5174| Site[Site Vitrine]
    Nginx -->|443 -> 5000| API[API Backend (PM2)]
    API --> Mongo[MongoDB (Port 27017)]
```
### 8.2 Variables d'Environnement (Production)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://user:password@mongo_host:27017/dreams
JWT_SECRET=[SECRET_LONG_ALEATOIRE]
CORS_ORIGIN=https://dreams-asso.fr
```

---

## 9. Maintenance

*   **Mises à jour** :
    *   Backend : `npm audit` régulier pour les failles de sécurité.
    *   Frontend : Rebuild nécessaire à chaque modification (`npm run build`).

---
