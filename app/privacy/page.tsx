import LandingNav from '@/components/landing/LandingNav';

export default function PrivacyPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white relative">
      <LandingNav />
      
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold-500 font-bold mb-4">Identity Protection Protocol</p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-12">Privacy Policy</h1>
        
        <div className="space-y-10 text-white/60 leading-relaxed font-light">
          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-tight uppercase text-[12px]">01. Artifact Sovereignty</h2>
            <p>
              Your creative artifacts and personal data are yours. ArtifactOS acts only as a secure vault and cinematic lens for your legacy. We do not sell your data to third parties; our mission is your visibility, not your commodification.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-tight uppercase text-[12px]">02. Data Archiving</h2>
            <p>
              We collect minimal essential information: email for authentication, and the creative content you choose to upload. Usage data is collected anonymously to optimize system performance and provide you with cinematic analytics.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-tight uppercase text-[12px]">03. Security Protocols</h2>
            <p>
              ArtifactOS utilizes industry-standard encryption and secure BaaS providers (Supabase) to ensure your identity remains uncompromised.
            </p>
          </section>

          <div className="pt-10 border-t border-white/5 text-[10px] tracking-widest uppercase">
            Protocol Version: 1.0.0 // Effective: May 2026
          </div>
        </div>
      </div>
    </main>
  );
}
