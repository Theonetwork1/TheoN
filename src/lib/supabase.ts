import { createClient } from '@supabase/supabase-js'

// Configuration Supabase - Remplacez par vos vraies valeurs
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Créer le client Supabase seulement si les vraies valeurs sont fournies
let supabase: any = null

if (supabaseUrl && supabaseKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseUrl !== 'https://demo.supabase.co') {
  supabase = createClient(supabaseUrl, supabaseKey)
} else {
  // Mode démo - créer un client factice
  supabase = {
    from: () => ({
      insert: () => Promise.resolve({ error: new Error('Demo mode - Supabase not configured') })
    })
  }
}

export { supabase }
