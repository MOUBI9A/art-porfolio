'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSent] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8">
          <Link href="/auth/login" className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors">
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          {!submitted ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tighter mb-2">Recover Identity</h1>
                <p className="text-sm text-gray-500">Enter your email to receive a recovery link.</p>
              </div>

              <form onSubmit={handleReset} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold mb-2 text-gray-500 tracking-widest uppercase">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-xs font-bold transition-all duration-300 bg-white text-black hover:bg-gold-500 hover:text-white disabled:opacity-50 tracking-widest uppercase"
                >
                  {loading ? 'Processing...' : 'Send Recovery Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-500">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tighter mb-2">Check your mail</h2>
              <p className="text-sm text-gray-500 mb-8">
                If an account exists for <span className="text-white">{email}</span>, we&apos;ve sent a recovery link.
              </p>
              <Link 
                href="/auth/login"
                className="inline-block px-8 py-3 border border-white/10 rounded-full text-xs font-bold text-white hover:bg-white/5 transition-all uppercase tracking-widest"
              >
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
