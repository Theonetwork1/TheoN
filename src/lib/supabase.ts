import { createClient } from '@supabase/supabase-js'

// Configuration Supabase - Utilisez vos vraies valeurs depuis les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Créer le client Supabase seulement si les variables sont définies
// Sinon, créer un client vide qui générera des erreurs claires
export const supabase = (supabaseUrl && supabaseKey && 
                         !supabaseUrl.includes('votre-projet-id') && 
                         !supabaseKey.includes('demo-key') &&
                         supabaseKey.length > 100)
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')
