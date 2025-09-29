# Configuration Supabase pour le Popup Email

## Étapes de configuration

### 1. Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL de projet et votre clé anonyme

### 2. Créer la table Theo_email
Exécutez cette requête SQL dans l'éditeur SQL de Supabase :

```sql
CREATE TABLE Theo_email (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  source VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index sur l'email pour de meilleures performances
CREATE INDEX idx_theo_email_email ON Theo_email(email);

-- Créer un index sur la source
CREATE INDEX idx_theo_email_source ON Theo_email(source);
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet avec :

```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
```

### 4. Configurer les politiques RLS (Row Level Security)
Dans l'éditeur SQL de Supabase, exécutez :

```sql
-- Activer RLS sur la table
ALTER TABLE Theo_email ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion d'emails
CREATE POLICY "Allow email insertions" ON Theo_email
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture (optionnel, pour l'admin)
CREATE POLICY "Allow admin read access" ON Theo_email
  FOR SELECT USING (true);
```

## Fonctionnalités du popup

- ✅ Apparaît après 10 secondes sur la page d'accueil
- ✅ Formulaire avec validation email
- ✅ Sauvegarde dans la table `Theo_email` avec `source: "homepage-form"`
- ✅ Message de confirmation : "Merci ! Vous recevrez votre réduction par email."
- ✅ Design responsive et moderne
- ✅ Animation d'apparition
- ✅ Gestion des erreurs

## Structure de la table

| Colonne | Type | Description |
|---------|------|-------------|
| id | SERIAL | Clé primaire auto-incrémentée |
| email | VARCHAR(255) | Adresse email de l'utilisateur |
| source | VARCHAR(100) | Source de l'email ("homepage-form") |
| created_at | TIMESTAMP | Date de création automatique |
