import { createClient } from '@/lib/supabase/server';
import { Settings, Project, Profile } from '@/lib/types';
import LandingHero from '@/components/landing/LandingHero';
import SaaSShowcase from '@/components/landing/SaaSShowcase';
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
      
      <SaaSShowcase />
      
      {/* Featured Section */}
      <section id="featured" className="py-32 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-luxury text-[10px] text-gold-500 mb-4 block">Archive</span>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-none">
                Featured Artifacts
              </h2>
            </div>
            <p className="text-white/40 max-w-sm font-light leading-relaxed">
              The creative network is live. 
              Explore the digital legacies of our first adopters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Link 
                  key={profile.id}
                  href={`/u/${profile.username}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl glass hover:border-gold-500/30 transition-all duration-700"
                >
                  {profile.avatar_url ? (
                    <Image 
                      src={profile.avatar_url}
                      alt={profile.full_name || 'Profile'}
                      fill
                      className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                      <span className="text-6xl opacity-10">OS</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 p-10 text-left">
                    <span className="inline-block px-4 py-1.5 rounded-full glass text-[9px] font-semibold mb-4 tracking-[0.3em] uppercase text-gold-500 border-gold-500/20">
                      {profile.niche.replace('_', ' ')}
                    </span>
                    <h3 className="text-3xl font-serif font-light mb-2">{profile.full_name}</h3>
                    <div className="h-px w-0 group-hover:w-full bg-gold-500/50 transition-all duration-700" />
                    <p className="text-white/30 text-xs mt-4 tracking-widest uppercase group-hover:text-white transition-colors">Initialize Link →</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 glass rounded-[40px] text-center">
                <p className="text-luxury text-xs text-white/20">System Waiting for Data...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto py-24 px-12 rounded-[60px] glass-strong border-gold-500/10">
             <span className="text-luxury text-[10px] text-gold-500 mb-8 block">Legacy Deployment</span>
             <h2 className="text-4xl md:text-6xl font-serif font-light mb-10 leading-tight">
               Ready to host your <br/>creative soul?
             </h2>
             <Link 
                href="/auth/signup"
                className="group relative inline-block px-12 py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-white/20"
              >
                <span className="relative z-10">Initialize Your OS Identity</span>
                <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
