import { createClient } from '@/lib/supabase/server';
import { Settings, Project, Profile } from '@/lib/types';
import LandingHero from '@/components/landing/LandingHero';
import Link from 'next/link';
import Image from 'next/image';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

async function getFeaturedPortfolios(): Promise<{ profiles: Profile[] }> {
  try {
    const supabase = await createClient();
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .limit(6)
      .order('created_at', { ascending: false });

    return { profiles: profiles ?? [] };
  } catch {
    return { profiles: [] };
  }
}

export default async function LandingPage() {
  const { profiles } = await getFeaturedPortfolios();

  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <LandingHero />
      
      {/* Featured Section */}
      <section id="featured" className="py-32 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Featured Artifacts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Link 
                  key={profile.id}
                  href={`/u/${profile.username}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-8 text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-3 tracking-widest uppercase text-gray-300">
                      {profile.niche}
                    </span>
                    <h3 className="text-2xl font-bold mb-1">{profile.full_name}</h3>
                    <p className="text-gray-400 font-light">View Remote Brain →</p>
                  </div>
                </Link>
              ))
            ) : (
              // Empty State
              <div className="col-span-full py-20 border border-dashed border-white/10 rounded-3xl text-gray-500">
                The creative network is initializing... Be the first to join.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Super Admin / Footer CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto p-12 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent border border-white/10">
             <h2 className="text-3xl font-bold mb-6">Ready to host your creative soul?</h2>
             <Link 
                href="/auth/signup"
                className="inline-block px-10 py-5 bg-white text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
              >
                Create Your OS Identity
              </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
