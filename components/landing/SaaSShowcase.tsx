'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SaaSFeatures = () => {
  const features = [
    {
      title: 'Cinematic Analytics',
      description: 'Track your legacy with privacy-first insights. Understand your audience through high-fidelity visualizations.',
      icon: '📊'
    },
    {
      title: 'Collaborative Network',
      description: 'Link your projects to crew members. Build a shared web of talent that grows with every artifact.',
      icon: '🕸️'
    },
    {
      title: 'Interface Presets',
      description: 'Switch between OS, Minimalist, or Brutalist skins instantly. Your data, multiple perspectives.',
      icon: '🎨'
    },
    {
      title: 'Global Delivery',
      description: 'Lightning-fast edge delivery for your high-res showreels and archives. No compromise on quality.',
      icon: '⚡'
    }
  ];

  return (
    <section className="py-24 bg-black/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-luxury text-[10px] text-gold-500 mb-4 block">Engine Components</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white">Built for the <br/>New Creator Economy</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-strong p-8 rounded-3xl border-white/5 hover:border-gold-500/20 transition-all group"
            >
              <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{feature.icon}</div>
              <h3 className="text-xl font-serif text-white mb-4">{feature.title}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TemplateShowcase = () => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic OS',
      tag: 'Retro-Futurism',
      description: 'A desktop-inspired interface for those who view their work as a digital operating system.',
      preview: '🎬'
    },
    {
      id: 'modern',
      name: 'Modern Minimal',
      tag: 'Cinematic Elegance',
      description: 'Ultra-clean layout that lets your high-fidelity visuals speak for themselves.',
      preview: '✨'
    },
    {
      id: 'brutalist',
      name: 'Brutalist Grid',
      tag: 'Raw & Bold',
      description: 'High-impact grid architecture for creators who want to make a statement.',
      preview: '🧱'
    }
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-luxury text-[10px] text-gold-500 mb-4 block">Interfaces</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-none">
              Choose Your <br/>Perspective
            </h2>
          </div>
          <p className="text-white/40 max-w-sm font-light leading-relaxed">
            Switch between templates instantly. Your content is detached from presentation, giving you total creative control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, i) => (
            <motion.div 
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-[3/4] rounded-[40px] glass border-white/10 overflow-hidden flex flex-col p-10 group-hover:border-gold-500/30 transition-all duration-700">
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-8xl opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0">
                    {template.preview}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold-500 mb-2 block">{template.tag}</span>
                  <h3 className="text-3xl font-serif font-light text-white mb-4">{template.name}</h3>
                  <p className="text-white/40 text-sm font-light mb-8 group-hover:text-white/60 transition-colors">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-white/20 group-hover:text-gold-500 transition-colors">
                    <span>Live Preview Available</span>
                    <span className="w-1 h-1 rounded-full bg-gold-500" />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <div className="w-12 h-12 border-t border-r border-white/20 rounded-tr-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function SaaSShowcase() {
  return (
    <>
      <SaaSFeatures />
      <TemplateShowcase />
    </>
  );
}
