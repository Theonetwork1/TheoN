# Configuration Supabase pour le Popup Email

## 🚨 Problème Actuel
Le popup email affiche "Une erreur est survenue. Veuillez réessayer." car Supabase n'est pas configuré.

## ✅ Solution Rapide (Fallback WhatsApp)
Le popup redirige maintenant automatiquement vers WhatsApp si Supabase n'est pas configuré.

## 🔧 Configuration Complète Supabase

### 1. Créer un projet Supabase
1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Choisissez votre organisation
5. Nommez votre projet (ex: "theonetwork")
6. Créez un mot de passe fort
7. Choisissez une région proche
8. Cliquez sur "Create new project"

### 2. Récupérer les clés API
1. Dans votre projet Supabase, allez dans **Settings** > **API**
2. Copiez :
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public** key (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Créer la table Theo_email
1. Allez dans **Table Editor**
2. Cliquez sur **New Table**
3. Nom de la table : `Theo_email`
4. Ajoutez ces colonnes :
   - `id` (int8, Primary Key, Auto-increment)
   - `email` (text, Not null)
   - `source` (text, Default: 'homepage-form')
   - `created_at` (timestamptz, Default: now())
5. Cliquez sur **Save**

### 4. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet :

```env
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.votre-vraie-cle-ici
```

### 5. Configurer les politiques RLS (Row Level Security)
1. Allez dans **Authentication** > **Policies**
2. Pour la table `Theo_email`, créez une politique :
   - **Policy Name**: `Allow public inserts`
   - **Target Roles**: `public`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`

### 6. Tester la configuration
1. Redémarrez le serveur de développement : `npm run dev`
2. Testez le popup email
3. Vérifiez dans Supabase que l'email est bien enregistré

## 🎯 Résultat Attendu
- ✅ Popup email fonctionne sans erreur
- ✅ Emails sauvegardés dans Supabase
- ✅ Messages de succès appropriés
- ✅ Fallback WhatsApp si problème

## 🔍 Dépannage
- **Erreur "Invalid API key"** : Vérifiez la clé anon
- **Erreur "relation does not exist"** : Créez la table Theo_email
- **Erreur "Failed to fetch"** : Vérifiez l'URL du projet
- **Erreur de permissions** : Configurez les politiques RLS

## 📞 Support
Si vous avez des questions, contactez-nous via WhatsApp : +1 (774) 506-9615