import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Refresh Supabase auth only on routes that need it. If Supabase is temporarily
 * unavailable, public/auth pages still render and protected routes fail closed.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const redirectProtectedRoute = () => {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    loginUrl.search = '';
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  };

  if (!supabaseUrl || !supabaseKey) {
    return pathname.startsWith('/dashboard')
      ? redirectProtectedRoute()
      : supabaseResponse;
  }

  try {
    const supabase = createServerClient<any>(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (pathname.startsWith('/dashboard') && !user) {
      return redirectProtectedRoute();
    }

    if (pathname.startsWith('/auth/login') && user) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = '/dashboard';
      dashboardUrl.search = '';
      return NextResponse.redirect(dashboardUrl);
    }

    return supabaseResponse;
  } catch {
    // Do not turn a third-party DNS/network outage into a runtime error storm.
    // Protected routes fail closed; login/signup remain available to explain or
    // retry once the backend returns.
    return pathname.startsWith('/dashboard')
      ? redirectProtectedRoute()
      : supabaseResponse;
  }
}
