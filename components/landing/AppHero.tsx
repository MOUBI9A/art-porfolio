'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AppHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gold-500 mb-8">
            The Creative Operating System
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-white mb-8 max-w-4xl mx-auto leading-[1.1]">
            Your legacy deserves <br/>
            <span className="text-white/40">a world-class interface.</span>
          </h1>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-12 font-light">
            Archive artifacts, link your network, and deploy a cinematic portfolio in minutes. Built for the modern creator.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link 
            href="/auth/signup"
            className="px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-xl shadow-white/5"
          >
            Start Your Archive
          </Link>
          <Link 
            href="#features"
            className="px-8 py-3.5 border border-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
          >
            View Features
          </Link>
        </motion.div>

        {/* Clean App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#111] aspect-video shadow-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 to-transparent pointer-events-none" />
          <div className="h-8 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="p-8 flex items-center justify-center h-full">
             <span className="text-white/10 text-9xl font-serif italic select-none">OS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
