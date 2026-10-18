import { createClient } from '@supabase/supabase-js';
import { Profile } from '@/lib/types';
import LandingNav from '@/components/landing/LandingNav';
import AppHero from '@/components/landing/AppHero';
import BentoFeatures from '@/components/landing/BentoFeatures';
import TemplateGrid from '@/components/landing/TemplateGrid';
import NetworkGrid from '@/components/landing/NetworkGrid';
import FooterCTA from '@/components/landing/FooterCTA';

export const revalidate = 60;

async function getFeaturedPortfolios(): Promise<{ profiles: Profile[] }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return { profiles: [] };

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            signal: AbortSignal.timeout(2_000),
          }),
      },
    });

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .limit(8)
      .order('created_at', { ascending: false });

    return { profiles: profiles ?? [] };
  } catch {
    // Featured profiles are progressive enhancement. The marketing page should
    // stay available even if the portfolio data service is unavailable.
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
