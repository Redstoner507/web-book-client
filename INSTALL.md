# Installer Projet WBC - Web Books Client

## 1. Mise en place de l'API

Aller dans le dossier API-W41

```bash
cd API-W41
```

### 1.1 Installation des dépendances

Installer les dépendances avec bun.

```bash
bun install
```

### 1.2 Mise en place de la BDD

Copier le et renommer le .env

```bash
cp .env.example .env
```

Création du client prisma & de la base.

```bash
bunx prisma generate # Crée le client
bunx prisma db push # Synchronise le modèle
```

### 1.3 Seeding de la BDD

```bash
bunx prisma migrate reset # Pour vider entièrement la base (optionnel)
bunx prisma db seed # Pour ajouter des valeurs par défaut à la base
```

Pensez à vider la base avant de la seeder à nouveau.

### 1.4 Lancement de l'API

Lance l'API sur le port 3000.

```bash
bun run start
bun run dev # Pour le mode développement
```

## 2. Lancer lancer l'application
