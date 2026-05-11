import LandingNav from '@/components/landing/LandingNav';

export default function TermsPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white relative">
      <LandingNav />
      
      <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold-500 font-bold mb-4">Engagement Guidelines</p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-12">Terms of Service</h1>
        
        <div className="space-y-10 text-white/60 leading-relaxed font-light">
          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-tight uppercase text-[12px]">01. Identity Creation</h2>
            <p>
              By establishing an identity on ArtifactOS, you agree to provide accurate information and maintain the security of your access keys. You are responsible for all artifacts deployed under your identity.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-tight uppercase text-[12px]">02. Artifact Standards</h2>
            <p>
              Users must hold the rights to all content archived and displayed. ArtifactOS reserves the right to terminate identities that archive illegal, harmful, or copyright-infringing content.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-4 tracking-tight uppercase text-[12px]">03. System Integrity</h2>
            <p>
              You agree not to bypass, damage, or compromise the ArtifactOS core engine or its multi-tenant architecture.
            </p>
          </section>

          <div className="pt-10 border-t border-white/5 text-[10px] tracking-widest uppercase">
            Agreement Version: 1.0.0 // Effective: May 2026
          </div>
        </div>
      </div>
    </main>
  );
}
