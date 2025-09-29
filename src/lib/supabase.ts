import { createClient } from '@supabase/supabase-js'

// Configuration Supabase - Utilisez vos vraies valeurs
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://theonetwork.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZW9uZXR3b3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NzI4MDAsImV4cCI6MjA1MTA0ODgwMH0.demo-key'

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)
