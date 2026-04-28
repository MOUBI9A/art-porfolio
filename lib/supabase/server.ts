import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/lib/types';

/**
 * Supabase client for Server Components, Server Actions, and Route Handlers.
 * Reads session cookies automatically via next/headers.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component — cookie mutation is only meaningful in middleware/route handlers
          }
        },
      },
    },
  );
}
