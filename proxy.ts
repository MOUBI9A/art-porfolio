import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  // 1. Skip system/internal paths immediately
  if (
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/u/') || 
    url.pathname === '/favicon.ico'
  ) {
    return await updateSession(request);
  }

  // 2. Define main domain
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'artifact.os';
  
  // 3. Extract subdomain (e.g., username.artifact.os)
  const subdomain = host.endsWith(`.${mainDomain}`) 
    ? host.replace(`.${mainDomain}`, '') 
    : null;

  // 4. If we have a valid user subdomain (not www), rewrite to /u/[username]
  if (subdomain && subdomain !== 'www') {
    url.pathname = `/u/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 5. Otherwise, proceed with session update (Dashboard protection etc)
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
