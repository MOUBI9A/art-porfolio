import { createClient } from '@supabase/supabase-js';
import { Profile } from '@/lib/types';
import HeroSequence from '@/components/landing/HeroSequence';
import StickyStatement from '@/components/landing/StickyStatement';
import EngineFeatures from '@/components/landing/EngineFeatures';
import PerspectiveShowcase from '@/components/landing/PerspectiveShowcase';
import NetworkMatrix from '@/components/landing/NetworkMatrix';
import TerminalCTA from '@/components/landing/TerminalCTA';

// Revalidate every 60 seconds (ISR)
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
      {/* 1. Hero Boot Sequence */}
      <HeroSequence />

      {/* 2. Sticky Manifest Statements */}
      <StickyStatement />

      {/* 3. The Engine Room (Features) */}
      <EngineFeatures />

      {/* 4. Perspective Engine (Templates) */}
      <PerspectiveShowcase />

      {/* 5. The Creative Network (Social Proof) */}
      <NetworkMatrix profiles={profiles} />

      {/* 6. Terminal Call to Action */}
      <TerminalCTA />
    </main>
  );
}
