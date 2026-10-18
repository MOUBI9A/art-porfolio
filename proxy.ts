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
