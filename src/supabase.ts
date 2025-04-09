import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jswvjirqislhfbqczhpw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzd3ZqaXJxaXNsaGZicWN6aHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTE0NTMsImV4cCI6MjA1OTcyNzQ1M30.tJWEgbNv6gZTtgrMM2V_hAO2LdHICXX-JdBj_qn0N_Q' // safe for frontend

export const supabase = createClient(supabaseUrl, supabaseKey)
