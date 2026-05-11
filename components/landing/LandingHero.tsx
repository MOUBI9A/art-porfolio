'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LandingHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#050505]">
      {/* Background Cinematic Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-luxury text-[10px] md:text-xs text-gold-500 mb-6 block">
            The Creative Operating System
          </span>
          <h1 className="text-6xl md:text-[12vw] lg:text-9xl font-serif font-light tracking-tighter mb-8 leading-[0.85] text-white">
            Artifact<span className="text-gold-500">OS</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Archive your legacy. Connect your network. 
          The unified interface for filmmakers, developers, and visionaries.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="/auth/signup"
            className="group relative px-10 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">Initialize Identity</span>
            <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          <Link 
            href="#featured"
            className="px-10 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 border-white/10"
          >
            Explore Network
          </Link>
        </motion.div>
      </div>

      {/* Futuristic Visual / App Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-24 relative w-full max-w-6xl px-6 group"
      >
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
          <Image 
            src="/hero-visual.png" 
            alt="ArtifactOS Visual Identity"
            fill
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          
          {/* Floating UI Elements for SaaS feel */}
          <div className="absolute top-8 left-8 glass-strong p-4 rounded-xl border-white/20 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/70">System Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Infinite Marquee of Roles */}
      <div className="mt-20 w-full overflow-hidden whitespace-nowrap opacity-20 border-y border-white/5 py-8">
        <div className="inline-block animate-marquee">
          {['FILMMAKERS', 'DEVELOPERS', 'ARCHITECTS', 'COMPOSERS', 'VISIONARIES', 'PRODUCERS'].map(role => (
            <span key={role} className="text-4xl md:text-6xl font-serif italic mx-12 text-white">{role}</span>
          ))}
        </div>
        <div className="inline-block animate-marquee" aria-hidden="true">
          {['FILMMAKERS', 'DEVELOPERS', 'ARCHITECTS', 'COMPOSERS', 'VISIONARIES', 'PRODUCERS'].map(role => (
            <span key={role} className="text-4xl md:text-6xl font-serif italic mx-12 text-white">{role}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
