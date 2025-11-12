# API Recettes – Node.js & Express

## Description  
L'objectif est de créer une API Restful qui permettra de réaaliser des opérations CRUD (Create, Read, Update, Delete) sur des recettes de cuisine.
La base de données n'aura pas de relations. Une table utilisateurs permettra de gérer la sécurisation de notre API. Et une table recette permettra de stocker les recettes.
---

## Fonctionnalités actuelles  
- Initialisation automatique de la base SQLite au démarrage.  
- Création des tables :
  - `users` (nom, email, mot de passe)
  - `recettes` (titre, temps de préparation, difficulté, budget, description)
- Route de test (`GET /`).
---

## Installation
### 1. Cloner le projet
```bash
git clone https://github.com/2025-10-CDA-ECO-P6/mona-node-recettes.git
cd mona-node-recettes
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur
En mode développement :   
```bash
npm run dev
```

## Routes
- GET /recettes  
- GET /recettes/:id  
- POST /recettes  
- PUT /recettes/:id  
- DELETE /recettes/:id  

## Mise à jour BDD  
Le script db/migrate.js gère les évolutions du schéma SQLite.  
Il permet d’ajouter automatiquement les nouvelles colonnes ou ajustements nécessaires sans perte de données existantes.  