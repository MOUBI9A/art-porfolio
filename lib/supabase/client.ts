import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/lib/types';

/**
 * Supabase client for use in Client Components (browser context).
 * Uses the public anon key — safe for frontend.
 */
export function createClient() {
  return createBrowserClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
