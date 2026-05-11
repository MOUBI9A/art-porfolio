'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Perspective Engine',
    description: 'Switch between OS, Modern, or Brutalist skins instantly. Your data, multiple interfaces.',
    icon: '🎨',
    align: 'left'
  },
  {
    title: 'Collaborative Core',
    description: 'Every project links to a network of profiles. Build a shared web of creative artifacts.',
    icon: '🕸️',
    align: 'right'
  },
  {
    title: 'Cinematic Analytics',
    description: 'Track your legacy with privacy-first insights. High-fidelity visualizations of your growth.',
    icon: '📊',
    align: 'left'
  }
];

export default function EngineFeatures() {
  return (
    <section className="py-40 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32">
          <span className="text-luxury text-[10px] text-gold-500 mb-4 block">System Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight">
            The Engine of <br/>Creative Sovereignty
          </h2>
        </div>

        <div className="space-y-40">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: feature.align === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${feature.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              <div className="flex-1">
                <div className="glass-strong aspect-video rounded-[40px] border-white/5 flex items-center justify-center text-7xl grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-700">
                    {feature.icon}
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-serif font-light text-white mb-6">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0">
                  {feature.description}
                </p>
                <div className={`h-px w-24 bg-gold-500/30 mt-8 mx-auto ${feature.align === 'left' ? 'md:ml-0' : 'md:mr-0'}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
