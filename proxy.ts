import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';
  const { pathname } = url;

  // Public/system routes must never wait on the auth provider. This keeps the
  // marketing site, public portfolios and static assets available even when
  // Supabase is degraded or temporarily unreachable.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/u/') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'artifact.os';
  const subdomain = host.endsWith(`.${mainDomain}`)
    ? host.replace(`.${mainDomain}`, '')
    : null;

  // Public creator subdomains are rewrites, not authenticated dashboard routes.
  if (subdomain && subdomain !== 'www') {
    url.pathname = `/u/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // ArtifactOS's previous Supabase project is retired. Account-dependent routes
  // stay honest and usable by landing on a static status page until a dedicated
  // backend is restored and NEXT_PUBLIC_AUTH_ENABLED=true is configured.
  const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';
  const isAccountRoute =
    pathname.startsWith('/dashboard') ||
    (pathname.startsWith('/auth/') && pathname !== '/auth/unavailable');

  if (!authEnabled && isAccountRoute) {
    const unavailableUrl = request.nextUrl.clone();
    unavailableUrl.pathname = '/auth/unavailable';
    unavailableUrl.search = '';
    return NextResponse.redirect(unavailableUrl);
  }

  // Only routes whose behavior actually depends on authentication should pay
  // the cost of refreshing/verifying a Supabase session.
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/auth/login')) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
