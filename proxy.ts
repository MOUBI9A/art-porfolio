import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  // Static/internal/public API paths do not need an auth refresh. Avoiding a
  // Supabase network round-trip here keeps asset delivery and public pages fast
  // and prevents an unavailable auth backend from breaking unrelated traffic.
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/u/') ||
    url.pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'artifact.os';
  const subdomain = host.endsWith(`.${mainDomain}`)
    ? host.replace(`.${mainDomain}`, '')
    : null;

  if (subdomain && subdomain !== 'www') {
    url.pathname = `/u/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Only routes that actually depend on authentication should contact
  // Supabase from middleware. Public marketing pages can render independently.
  if (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/auth')
  ) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
