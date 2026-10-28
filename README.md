# Web Books Client

Web Books Client est une application web permettant de consulter et de gérer un catalogue de livres à travers une API REST. L'interface permet de naviguer entre les auteurs et les livres, de consulter leurs détails et de gérer les associations entre les entités.

## Fonctionnalités

### Gestion des auteurs

- Affichage de la liste des auteurs.
- Recherche d'auteurs par nom de famille.
- Pagination de la liste, avec navigation entre les pages.
- Ajout et suppression d'auteurs.
- Consultation de la fiche détaillée d'un auteur.
- Modification du nom d'un auteur.

### Gestion des livres

- Affichage de la liste des livres avec pagination.
- Filtrage des livres par titre.
- Navigation vers la fiche détaillée d'un livre.
- Consultation des informations d'un livre et accès à la fiche de son auteur.
- Ajout, suppression et modification des livres, selon les opérations exposées par l'API.

### Gestion des relations et des tags

- Affichage des livres associés à un auteur.
- Ajout et suppression de livres associés à un auteur.
- Affichage des tags associés à un livre.
- Association d'un tag existant à un livre et suppression d'une association.

### Interface et retours utilisateur

- Navigation entre les sections Auteurs et Livres, ainsi qu'entre les fiches détaillées.
- Indication du chargement des données pendant les requêtes à l'API.
- Affichage des erreurs retournées par l'API lors des opérations prises en charge.
- Édition de texte directement depuis l'interface, avec les états d'affichage, d'édition et d'enregistrement.

## Technologies

- **React** et **TypeScript** pour construire l'interface.
- **Vite** pour le serveur de développement et la construction du client.
- **React Router** pour les routes et la navigation.
- **Fetch API** pour communiquer avec l'API HTTP.
- **Lucide React** pour les icônes de l'interface.

## Organisation générale

Le code sépare les responsabilités principales :

- `src/api.ts` regroupe les fonctions d'accès à l'API.
- `src/types.ts` définit les types utilisés par le client.
- `src/routes/` contient les composants associés aux pages et aux routes.
- `src/utils/pagination.tsx` contient le composant de pagination.
- `src/utils/editableText.tsx` contient le composant de texte éditable.

## Prérequis

- [Bun](https://bun.sh/) installé.
- L'API de gestion de livres disponible et démarrée séparément.
- Une configuration CORS côté API autorisant les requêtes du client. L'API doit également exposer l'en-tête `X-Total-Count` si le client utilise cette information pour la pagination.

## Installation et lancement

Installez les dépendances du projet :

```sh
bun install
```

Configurez l'adresse de l'API dans `src/api.ts` (variable `apiBasename`) afin qu'elle corresponde à l'adresse à laquelle le serveur API est accessible.

Démarrez ensuite le serveur de développement avec le script prévu par le projet, généralement :

```sh
bun run dev
```

Vite affiche l'adresse locale à ouvrir dans le navigateur.
