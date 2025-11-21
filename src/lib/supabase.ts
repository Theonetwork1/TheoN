import { createClient } from '@supabase/supabase-js'

// Configuration Supabase - Utilisez vos vraies valeurs depuis les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Créer le client Supabase avec les variables d'environnement
// Si les variables ne sont pas définies, le client sera créé mais générera des erreurs lors de l'utilisation
export const supabase = createClient(supabaseUrl, supabaseKey)
