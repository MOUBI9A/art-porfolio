import LandingNav from '@/components/landing/LandingNav';
import { Check, Info } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Basic',
      slug: 'free',
      price: '0',
      desc: 'Essential tools for emerging artifacts.',
      features: [
        'Cinematic OS Interface',
        'Modern Minimal Template',
        'Up to 10 Project Artifacts',
        'Standard Analytics',
        'Artifact.os/u/username Subdomain',
      ],
      cta: 'Initialize Now',
      highlight: false,
    },
    {
      name: 'Pro',
      slug: 'pro',
      price: '19',
      desc: 'Maximum visibility for elite creative entities.',
      features: [
        'Unlimited Project Artifacts',
        'All Premium Templates (Brutalist+)',
        'Custom Domain Support',
        'Advanced Analytics Dashboard',
        'Priority Grid Placement',
        'High-Resolution Transcoding',
      ],
      cta: 'Coming Soon',
      highlight: true,
    },
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white relative selection:bg-white selection:text-black">
      <LandingNav />

      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-bold">Scaling Infrastructure</p>
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight">Investment Model</h1>
          <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed">
            Choose your level of integration. ArtifactOS scales with your creative legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.slug}
              className={`relative rounded-3xl p-8 md:p-12 border transition-all duration-500 flex flex-col ${
                tier.highlight 
                  ? 'bg-white/5 border-gold-500/30 shadow-2xl shadow-gold-500/5' 
                  : 'bg-transparent border-white/10 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Recommended Sequence
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-serif mb-2">{tier.name}</h2>
                <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-6">{tier.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter">${tier.price}</span>
                  <span className="text-sm text-white/20 uppercase tracking-widest">/ Month</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${tier.highlight ? 'border-gold-500/20 bg-gold-500/10' : 'border-white/10 bg-white/5'}`}>
                       <Check size={10} className={tier.highlight ? 'text-gold-500' : 'text-white/40'} />
                    </div>
                    <span className="text-sm text-white/70 font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={tier.slug === 'free' ? '/auth/signup' : '#'}
                className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all text-center ${
                  tier.slug === 'free'
                    ? 'bg-white text-black hover:bg-gold-500 hover:text-white'
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Notice */}
        <div className="mt-20 glass rounded-2xl p-6 border border-white/5 max-w-2xl mx-auto flex items-center gap-4 text-white/40">
           <Info size={20} className="flex-shrink-0" />
           <p className="text-[10px] uppercase tracking-widest leading-relaxed">
             Enterprise inquiry? For custom deployments, white-labeling, or private agency grids, 
             <span className="text-gold-500 cursor-pointer ml-1 hover:underline">contact system command</span>.
           </p>
        </div>
      </div>
    </main>
  );
}
