'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const themes = [
  { id: 'classic', name: 'Classic OS', icon: '🎬' },
  { id: 'modern', name: 'Modern Minimal', icon: '✨' },
  { id: 'brutalist', name: 'Brutalist Grid', icon: '🧱' }
];

export default function PerspectiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={containerRef} className="py-40 bg-black overflow-hidden">
      <div className="container mx-auto px-6 mb-20 text-center">
        <span className="text-luxury text-[10px] text-gold-500 mb-4 block">Perspective Engine</span>
        <h2 className="text-4xl md:text-6xl font-serif font-light text-white">One Artifact. <br/>Infinite Skins.</h2>
      </div>

      <motion.div style={{ x }} className="flex gap-8 px-6">
        {themes.map((theme) => (
          <div 
            key={theme.id}
            className="flex-shrink-0 w-[80vw] md:w-[40vw] aspect-[3/4] glass-strong rounded-[60px] border-white/5 flex flex-col items-center justify-center p-12 group hover:border-gold-500/20 transition-all duration-700"
          >
            <span className="text-[15vw] md:text-[8vw] mb-12 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">
              {theme.icon}
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-light text-white mb-2">{theme.name}</h3>
            <span className="text-luxury text-[8px] text-white/30 tracking-[0.5em]">{theme.id.toUpperCase()} CONFIG</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
