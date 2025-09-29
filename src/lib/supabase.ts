import { createClient } from '@supabase/supabase-js'

// Configuration Supabase - Remplacez par vos vraies valeurs
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// Créer le client Supabase seulement si les vraies valeurs sont fournies
export const supabase = createClient(supabaseUrl, supabaseKey)
