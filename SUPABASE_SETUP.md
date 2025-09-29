# Configuration Supabase pour le Popup Email

## 🚀 Configuration Rapide

### 1. Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "New Project"
3. Choisissez votre organisation
4. Nom du projet : `theonetwork` (ou votre choix)
5. Mot de passe : Créez un mot de passe fort
6. Région : Choisissez la plus proche
7. Cliquez sur "Create new project"

### 2. Récupérer les clés
1. Dans votre projet Supabase, allez dans **Settings** > **API**
2. Copiez :
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public** key (commence par `eyJ...`)

### 3. Créer la table Theo_email
Dans l'éditeur SQL de Supabase, exécutez :

```sql
-- Créer la table
CREATE TABLE Theo_email (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les index pour de meilleures performances
CREATE INDEX idx_theo_email_email ON Theo_email(email);
CREATE INDEX idx_theo_email_source ON Theo_email(source);
CREATE INDEX idx_theo_email_created_at ON Theo_email(created_at);
```

### 4. Configurer les politiques RLS
```sql
-- Activer RLS
ALTER TABLE Theo_email ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion d'emails
CREATE POLICY "Allow email insertions" ON Theo_email
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture (pour l'admin)
CREATE POLICY "Allow admin read access" ON Theo_email
  FOR SELECT USING (true);
```

### 5. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet :

```env
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 6. Redémarrer le serveur
```bash
npm run dev
```

## ✅ Test de fonctionnement

1. Ouvrez votre site sur `http://localhost:5173`
2. Attendez 10 secondes
3. Le popup apparaît
4. Entrez un email de test
5. Cliquez sur "Obtenir ma réduction"
6. Vérifiez dans Supabase > Table Editor > Theo_email

## 🔧 Dépannage

### Erreur "relation Theo_email does not exist"
- Vérifiez que la table a été créée dans Supabase
- Exécutez le script SQL de création de table

### Erreur "Failed to fetch"
- Vérifiez votre URL Supabase dans `.env`
- Vérifiez votre clé anonyme
- Redémarrez le serveur après modification du `.env`

### Erreur "duplicate key"
- L'email existe déjà (c'est normal)
- Le popup affichera un message approprié

## 📊 Structure de la table

| Colonne | Type | Description |
|---------|------|-------------|
| id | SERIAL | Clé primaire auto-incrémentée |
| email | VARCHAR(255) | Adresse email (unique) |
| source | VARCHAR(100) | Source ("homepage-form") |
| created_at | TIMESTAMP | Date de création automatique |

## 🎯 Fonctionnalités

- ✅ **Popup automatique** : Apparaît après 10 secondes
- ✅ **Validation email** : Format vérifié côté client
- ✅ **Sauvegarde réelle** : Emails stockés dans Supabase
- ✅ **Message de succès** : "Merci ! Vous recevrez votre réduction par email."
- ✅ **Gestion d'erreurs** : Messages clairs pour l'utilisateur
- ✅ **Design responsive** : Fonctionne sur mobile et desktop
- ✅ **Animation** : Effet d'apparition fluide

## 📈 Analytics

Vous pouvez voir les emails collectés dans :
- **Supabase Dashboard** > Table Editor > Theo_email
- **Supabase Dashboard** > Analytics pour les statistiques
