-- Script SQL pour créer la politique RLS permettant l'insertion publique
-- Exécutez ce script dans le SQL Editor de Supabase

-- Activer RLS sur la table (si pas déjà fait)
ALTER TABLE theo_email ENABLE ROW LEVEL SECURITY;

-- Créer la politique pour permettre l'insertion publique
CREATE POLICY "Allow public email inserts"
ON theo_email
FOR INSERT
TO public
WITH CHECK (true);

-- Vérifier que la politique a été créée
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'theo_email';

