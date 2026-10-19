import Link from 'next/link';

/**
 * Public marketing navigation must stay request-independent so the landing
 * pages can be prerendered and cached at the edge.
 *
 * Authentication is currently disabled for the public product surface, so
 * reading a Supabase session here only makes every page that renders this nav
 * dynamic. Restore session-aware navigation inside an authenticated route
 * group when auth is re-enabled.
 */
export default function LandingNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black" style={{ background: 'var(--color-gold)' }}>
          A
        </div>
        <span className="text-xl font-medium tracking-tight text-white font-serif">
          ArtifactOS
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/pricing"
          className="text-sm font-medium text-white/60 hover:text-white transition-colors hidden sm:block"
        >
          Pricing
        </Link>
        <Link
          href="/auth/login"
          className="text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gold-500 hover:text-white transition-all duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
