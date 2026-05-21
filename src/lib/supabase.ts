import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    const url = 'https://weksrhlhpbctlcapssyx.supabase.co';
    const key = 'sb_publishable_CGm7qGRG-9hCukhcixBQLA_tIG63Wbt';

    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}
