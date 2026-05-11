import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Define your main domain (development and production)
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000';
  
  // Extract subdomain
  const subdomain = hostname.split('.')[0];

  // If there is a subdomain and it's not 'www' or the main domain itself
  if (
    subdomain && 
    subdomain !== 'www' && 
    hostname !== mainDomain &&
    !hostname.includes('vercel.app') // Optional: skip for vercel previews if needed
  ) {
    // Rewrite [username].domain.com to /u/[username]
    // This happens internally, the URL in the browser remains [username].domain.com
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
