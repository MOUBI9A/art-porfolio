'use client';

import React from 'react';
import { motion } from 'framer-motion';

const templates = [
  { id: 'classic', name: 'Classic OS', icon: '🎬', description: 'Retro-futurist interface.' },
  { id: 'modern', name: 'Modern Minimal', icon: '✨', description: 'Cinematic elegance.' },
  { id: 'brutalist', name: 'Brutalist Grid', icon: '🧱', description: 'Raw and impactful.' }
];

export default function TemplateGrid() {
  return (
    <section className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-serif text-white mb-4">Choose Your Interface</h2>
          <p className="text-white/40 font-light text-sm">One data source. Multiple perspectives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-[4/5] glass rounded-3xl p-10 flex flex-col items-center justify-center border-white/5 group-hover:border-gold-500/20 transition-all text-center">
                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">{t.icon}</div>
                <h3 className="text-xl font-medium text-white mb-2">{t.name}</h3>
                <p className="text-white/40 text-sm font-light">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
