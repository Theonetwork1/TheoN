# 🔒 Fix : Configuration RLS pour la table theo_email

## Problème
L'erreur "Problème de politique de sécurité (RLS). Configurez les politiques d'accès pour la table theo_email dans Supabase." apparaît car Supabase bloque les insertions par défaut.

## Solution : Configurer les politiques RLS

### Méthode 1 : Via l'interface Supabase (Recommandé)

1. **Ouvrez votre projet Supabase**
   - Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Sélectionnez votre projet

2. **Accédez à la table theo_email**
   - Cliquez sur **Table Editor** dans le menu de gauche
   - Cliquez sur la table `theo_email`

3. **Activez et configurez RLS**
   - En haut de la page, vous verrez un indicateur RLS
   - Si RLS est désactivé, cliquez sur **Enable RLS**
   - Cliquez sur l'onglet **Policies** (à côté de "Columns")

4. **Créer une politique d'insertion**
   - Cliquez sur **New Policy**
   - Choisissez **Create a policy from scratch**
   - Configurez :
     - **Policy name**: `Allow public email inserts`
     - **Allowed operation**: Sélectionnez **INSERT**
     - **Target roles**: Sélectionnez `public` (ou laissez vide)
     - **USING expression**: Laissez vide
     - **WITH CHECK expression**: Tapez `true`
   - Cliquez sur **Review** puis **Save Policy**

### Méthode 2 : Via SQL Editor (Alternative)

1. **Ouvrez SQL Editor** dans Supabase
2. **Exécutez cette requête SQL** :

```sql
-- Activer RLS sur la table (si pas déjà fait)
ALTER TABLE theo_email ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre l'insertion publique
CREATE POLICY "Allow public email inserts"
ON theo_email
FOR INSERT
TO public
WITH CHECK (true);
```

3. Cliquez sur **Run** pour exécuter la requête

### Méthode 3 : Désactiver RLS temporairement (Développement uniquement)

⚠️ **ATTENTION** : Ne faites cela que pour le développement/test, jamais en production !

1. Dans **Table Editor** > `theo_email`
2. Cliquez sur l'icône de verrouillage 🔒 à côté du nom de la table
3. Désactivez **Enable Row Level Security**
4. ⚠️ Cela permet à n'importe qui d'insérer/modifier/supprimer des données

## Vérification

Après avoir configuré RLS :

1. Testez le popup email sur votre site
2. Entrez un email de test
3. Si tout fonctionne, vous verrez le message "Merci !"
4. Vérifiez dans Supabase que l'email est bien enregistré dans la table `theo_email`

## Structure de la table theo_email

Assurez-vous que votre table a ces colonnes :
- `id` (uuid, Primary Key, Default: `gen_random_uuid()`)
- `email` (text, Not null)
- `source` (text, Default: `'homepage-form'`)
- `created_at` (timestamp, Default: `now()`)

## Dépannage

### Erreur : "policy already exists"
Si vous obtenez cette erreur, la politique existe déjà. Vérifiez-la :

1. **Vérifier la politique existante** :
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'theo_email';
   ```

2. **Supprimer et recréer la politique** (si nécessaire) :
   ```sql
   -- Supprimer la politique existante
   DROP POLICY IF EXISTS "Allow public email inserts" ON theo_email;
   
   -- Recréer la politique
   CREATE POLICY "Allow public email inserts"
   ON theo_email
   FOR INSERT
   TO public
   WITH CHECK (true);
   ```

3. **Ou vérifier via l'interface** :
   - Allez dans **Table Editor** > `theo_email` > **Policies**
   - Vérifiez que la politique "Allow public email inserts" existe
   - Vérifiez qu'elle est bien configurée pour **INSERT** avec **WITH CHECK (true)**

### Autres problèmes

- **Erreur persiste** : Vérifiez que la politique est bien créée et active
- **Erreur "relation does not exist"** : Vérifiez que la table s'appelle exactement `theo_email` (minuscules)
- **Erreur de permissions** : Vérifiez que vous utilisez la clé `anon` (publique) et non la clé `service_role` (privée)

## Support

Si le problème persiste, vérifiez :
1. Que les variables d'environnement sont bien configurées
2. Que la table existe et a le bon nom
3. Que les politiques RLS sont bien créées et actives

