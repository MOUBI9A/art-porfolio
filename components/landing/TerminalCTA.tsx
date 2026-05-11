'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TerminalCTA() {
  return (
    <section className="py-[30vh] bg-black relative flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-luxury text-[10px] text-gold-500 mb-12 block tracking-[0.5em]">Final Command</span>
          <h2 className="text-5xl md:text-8xl font-serif font-light text-white mb-16 leading-tight">
            Ready to <br/>Deploy?
          </h2>
          
          <Link 
            href="/auth/signup"
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Initialize Identity</span>
            <span className="relative z-10 text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
          
          <div className="mt-16 text-white/20 font-mono text-xs tracking-widest uppercase">
            artifact-os version 1.0.4 // connected
          </div>
        </motion.div>
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
