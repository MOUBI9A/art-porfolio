import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Account access paused · ArtifactOS',
  description:
    'ArtifactOS public showcase is online while account access is temporarily paused for backend maintenance.',
};

export default function AuthUnavailablePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-16 selection:bg-white selection:text-black">
      <section className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 sm:p-12 shadow-2xl shadow-black/40">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <ShieldCheck className="h-5 w-5 text-gold-500" aria-hidden="true" />
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
          ArtifactOS · account status
        </p>
        <h1 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
          Public showcase online. Account access is temporarily paused.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
          The public ArtifactOS experience remains available while the account backend is being restored.
          Login, signup and dashboard actions are paused rather than sending you into an unreliable flow.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-6 text-white/55">
          <div className="mb-2 flex items-center gap-2 font-medium text-white/80">
            <Sparkles className="h-4 w-4 text-gold-500" aria-hidden="true" />
            What still works
          </div>
          <p>Explore the public product story and published creator surfaces. Account features will return after the dedicated backend passes auth, data-isolation and security verification.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gold-500 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to ArtifactOS
          </Link>
          <a
            href="https://github.com/MOUBI9A/art-porfolio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition hover:border-white/25 hover:text-white"
          >
            View public repository
          </a>
        </div>
      </section>
    </main>
  );
}
