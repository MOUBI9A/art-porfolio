'use client';

import React from 'react';
import Link from 'next/link';

export default function FooterCTA() {
  return (
    <footer className="py-40 bg-[#050505]">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto py-20 rounded-[40px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">Ready to Initialize?</h2>
          <Link 
            href="/auth/signup"
            className="inline-block px-12 py-5 bg-white text-black font-semibold rounded-full hover:bg-gold-500 hover:text-white transition-all duration-300"
          >
            Create Your Identity
          </Link>
          <div className="mt-12 text-white/20 text-[10px] tracking-[0.4em] uppercase">
            ArtifactOS // v1.0.4
          </div>
        </div>
      </div>
    </footer>
  );
}
