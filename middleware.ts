import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Define your main domain (production)
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'artifact.os';
  
  // Extract subdomain
  const subdomain = hostname.split('.')[0];

  // If there is a subdomain and it's not 'www', not the main domain, and not a vercel preview
  if (
    subdomain && 
    subdomain !== 'www' && 
    !hostname.includes('localhost') &&
    !hostname.includes(mainDomain) &&
    !hostname.includes('vercel.app')
  ) {
    // Rewrite [username].domain.com to /u/[username]
    url.pathname = `/u/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

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
