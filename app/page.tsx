import { createClient } from '@supabase/supabase-js';
import { Profile } from '@/lib/types';
import AppHero from '@/components/landing/AppHero';
import BentoFeatures from '@/components/landing/BentoFeatures';
import TemplateGrid from '@/components/landing/TemplateGrid';
import NetworkGrid from '@/components/landing/NetworkGrid';
import FooterCTA from '@/components/landing/FooterCTA';

export const revalidate = 60;

async function getFeaturedPortfolios(): Promise<{ profiles: Profile[] }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .limit(8)
      .order('created_at', { ascending: false });

    return { profiles: profiles ?? [] };
  } catch (error) {
    console.error('Error fetching featured portfolios:', error);
    return { profiles: [] };
  }
}

export default async function LandingPage() {
  const { profiles } = await getFeaturedPortfolios();

  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-white selection:text-black">
      <AppHero />
      <BentoFeatures />
      <TemplateGrid />
      <NetworkGrid profiles={profiles} />
      <FooterCTA />
    </main>
  );
}
