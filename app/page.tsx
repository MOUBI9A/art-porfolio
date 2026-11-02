import type { Profile } from '@/lib/types';
import LandingNav from '@/components/landing/LandingNav';
import AppHero from '@/components/landing/AppHero';
import BentoFeatures from '@/components/landing/BentoFeatures';
import TemplateGrid from '@/components/landing/TemplateGrid';
import NetworkGrid from '@/components/landing/NetworkGrid';
import FooterCTA from '@/components/landing/FooterCTA';

export const revalidate = 60;

const FEATURED_PORTFOLIO_TIMEOUT_MS = 750;

async function getFeaturedPortfolios(): Promise<{ profiles: Profile[] }> {
  // While account features are intentionally paused, the public marketing page
  // must not contact or eagerly load the retired backend client at all. This
  // keeps the public ISR route independent from Supabase until auth returns.
  if (process.env.NEXT_PUBLIC_AUTH_ENABLED !== 'true') {
    return { profiles: [] };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // The landing page is public marketing content. Optional community data must
  // never become a hard dependency for rendering it.
  if (!supabaseUrl || !supabaseKey) {
    return { profiles: [] };
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .limit(8)
      .order('created_at', { ascending: false })
      .abortSignal(AbortSignal.timeout(FEATURED_PORTFOLIO_TIMEOUT_MS));

    return { profiles: profiles ?? [] };
  } catch (error) {
    console.warn('Featured portfolios unavailable; rendering landing fallback.', error);
    return { profiles: [] };
  }
}

export default async function LandingPage() {
  const { profiles } = await getFeaturedPortfolios();

  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-white selection:text-black relative">
      <LandingNav />
      <AppHero />
      <BentoFeatures />
      <TemplateGrid />
      <NetworkGrid profiles={profiles} />
      <FooterCTA />
    </main>
  );
}
