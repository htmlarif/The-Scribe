import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    const url = import.meta.env.VITE_SUPABASE_URL || 'https://weksrhlhpbctlcapssyx.supabase.co';
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_CGm7qGRG-9hCukhcixBQLA_tIG63Wbt';

    if (!url || !key) {
      throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in environment variables.');
    }

    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}
