import { createClient, SupabaseClient } from '@supabase/supabase-js'

// You must create a .env.local file with these variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.'
  )
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
})

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any): string => {
  if (error?.message) {
    return error.message
  }
  return 'An unexpected error occurred. Please try again.'
}

// Type-safe database helpers
export const supabaseFrom = (table: string) => {
  return supabase.from(table)
}

