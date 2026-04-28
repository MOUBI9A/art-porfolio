'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LandingHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          ArtifactOS
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          The unified operating system for your creative legacy. 
          Built for filmmakers, devs, musicians, and visionaries.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/auth/signup"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </Link>
          <Link 
            href="#featured"
            className="px-8 py-4 bg-white/5 text-white border border-white/10 font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Explore Artifacts
          </Link>
        </div>
      </div>

      {/* Futuristic Visual */}
      <div className="mt-20 relative w-full max-w-5xl aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
        <Image 
          src="/hero-visual.png" 
          alt="ArtifactOS Visual Identity"
          fill
          className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Scrolling Text Ribbon */}
      <div className="absolute bottom-10 w-full overflow-hidden whitespace-nowrap opacity-20 pointer-events-none">
        <div className="inline-block animate-marquee">
          <span className="text-4xl font-bold mx-8">FILMMAKERS</span>
          <span className="text-4xl font-bold mx-8">PROGRAMMERS</span>
          <span className="text-4xl font-bold mx-8">PHOTOGRAPHERS</span>
          <span className="text-4xl font-bold mx-8">MUSICIANS</span>
          <span className="text-4xl font-bold mx-8">DESIGNERS</span>
          <span className="text-4xl font-bold mx-8">SOUND EDITORS</span>
        </div>
        <div className="inline-block animate-marquee">
          <span className="text-4xl font-bold mx-8">FILMMAKERS</span>
          <span className="text-4xl font-bold mx-8">PROGRAMMERS</span>
          <span className="text-4xl font-bold mx-8">PHOTOGRAPHERS</span>
          <span className="text-4xl font-bold mx-8">MUSICIANS</span>
          <span className="text-4xl font-bold mx-8">DESIGNERS</span>
          <span className="text-4xl font-bold mx-8">SOUND EDITORS</span>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
