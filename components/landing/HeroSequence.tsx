'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-[#050505] flex flex-col items-center pt-[20vh]">
      <motion.div 
        style={{ opacity, scale, y }}
        className="sticky top-[20vh] text-center px-6"
      >
        <span className="text-luxury text-[10px] md:text-xs text-gold-500 mb-8 block tracking-[1em]">
          Initialization Sequence
        </span>
        <h1 className="text-7xl md:text-[15vw] font-serif font-light tracking-tighter leading-none text-white mb-12">
          Your Creative <br/>
          <span className="text-gold-500">Legacy.</span>
        </h1>
        <div className="w-px h-24 bg-gradient-to-b from-gold-500 to-transparent mx-auto mt-12 animate-bounce" />
      </motion.div>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gold-500/[0.03] blur-[180px] rounded-full" />
      </div>
    </section>
  );
}
