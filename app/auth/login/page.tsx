'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import toast, { Toaster } from 'react-hot-toast';

import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('System access granted.');
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
          },
        }}
      />

      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md px-6"
        >
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-3 text-red-500 font-bold">
              ArtifactOS // Authenticate
            </p>
            <h1 className="text-4xl font-bold text-white tracking-tighter">
              Admin Access
            </h1>
            <p className="text-sm mt-2 text-gray-500">
              Sign in to manage your creative legacy
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-[10px] font-bold mb-2 text-gray-500 tracking-widest uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-xs font-bold mt-2 transition-all duration-300 bg-white text-black hover:bg-gray-200 disabled:opacity-50 tracking-widest uppercase"
              >
                {loading ? 'Authenticating…' : 'Access System'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                New to the platform? {' '}
                <Link href="/auth/signup" className="text-white hover:underline underline-offset-4">
                  Initialize Identity
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-[10px] mt-8 text-gray-600 tracking-widest uppercase">
            ArtifactOS Core v1.0.4 // Pulse Engine
          </p>
        </motion.div>
      </div>
    </>
  );
}
