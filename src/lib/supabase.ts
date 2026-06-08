import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase no configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env')
}

// Cuando tengas el proyecto real en Supabase, ejecuta:
//   npx supabase gen types typescript --project-id <id> > src/lib/database.types.ts
// y reemplaza createClient() por createClient<Database>()
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
