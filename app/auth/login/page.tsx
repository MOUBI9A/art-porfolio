'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import toast, { Toaster } from 'react-hot-toast';

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

    toast.success('Welcome back.');
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

      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        {/* Background grain */}
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
          {/* Logo / Brand */}
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--color-gold)' }}
            >
              DirectorOS
            </p>
            <h1
              className="text-3xl"
              style={{ fontFamily: 'var(--font-playfair)', color: '#fff' }}
            >
              Admin Access
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Form card */}
          <div className="glass-strong rounded-2xl p-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium mb-2"
                  style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium mb-2"
                  style={{ color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}
                >
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold mt-2 transition-all duration-300"
                style={{
                  background: loading
                    ? 'rgba(201,168,76,0.4)'
                    : 'linear-gradient(135deg, #c9a84c, #b8962e)',
                  color: '#0a0a0a',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>

          <p
            className="text-center text-xs mt-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            DirectorOS © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </>
  );
}
