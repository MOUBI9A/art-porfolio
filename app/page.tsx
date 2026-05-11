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
      <section id="featured" className="py-32 relative overflow-hidden">
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
              Explore the digital legacies of our most prolific creators. 
              Each artifact is a unique system configuration.
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

      {/* Network Ecosystem Section (New) */}
      <section className="py-32 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-luxury text-[10px] text-gold-500 mb-6 block">Connectivity</span>
              <h2 className="text-4xl md:text-6xl font-serif font-light mb-8 leading-tight">
                An Architecture <br/>of Connection
              </h2>
              <p className="text-white/50 text-lg font-light mb-10 leading-relaxed">
                ArtifactOS isn't just a portfolio; it's a node in a creative network. 
                Tag your crew, discover collaborators, and link your artifacts to build a shared legacy.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-gold-500 font-serif text-2xl mb-2">Networked</h4>
                  <p className="text-white/30 text-sm">Every project links to a profile, creating a global web of talent.</p>
                </div>
                <div>
                  <h4 className="text-gold-500 font-serif text-2xl mb-2">Cinematic</h4>
                  <p className="text-white/30 text-sm">High-fidelity media hosting designed for visual storytellers.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square glass-strong rounded-[60px] flex items-center justify-center p-12 overflow-hidden border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-50" />
                <div className="relative z-10 grid grid-cols-3 gap-4 w-full">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="aspect-square glass rounded-2xl border-white/10 group-hover:border-gold-500/30 transition-all duration-500 transform group-hover:scale-105" 
                         style={{ transitionDelay: `${i * 50}ms` }}/>
                  ))}
                </div>
                {/* Connecting Lines Overlay (Concept) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <line x1="100" y1="100" x2="300" y2="300" stroke="#c9a84c" strokeWidth="1" />
                    <line x1="300" y1="100" x2="100" y2="300" stroke="#c9a84c" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
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
