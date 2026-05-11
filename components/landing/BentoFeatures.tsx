'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Perspective Engine',
    description: 'Switch between OS, Modern, or Brutalist skins instantly. Your data, multiple interfaces.',
    icon: '🎨',
    grid: 'col-span-2 row-span-1'
  },
  {
    title: 'Cinematic Analytics',
    description: 'Privacy-first insights with high-fidelity visualizations.',
    icon: '📊',
    grid: 'col-span-1 row-span-2'
  },
  {
    title: 'Collaborative Core',
    description: 'Link projects to profiles. Build a shared talent web.',
    icon: '🕸️',
    grid: 'col-span-1 row-span-1'
  },
  {
    title: 'Global Delivery',
    description: 'Lightning fast edge delivery for your media.',
    icon: '⚡',
    grid: 'col-span-1 row-span-1'
  }
];

export default function BentoFeatures() {
  return (
    <section id="features" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-white mb-4">The OS Engine</h2>
          <p className="text-white/40 max-w-md font-light text-sm">Every component is engineered for creative sovereignty.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`glass-strong p-8 rounded-2xl border-white/5 hover:border-gold-500/20 transition-all ${f.grid} flex flex-col justify-between group`}
            >
              <div>
                <div className="text-2xl mb-6 grayscale group-hover:grayscale-0 transition-all">{f.icon}</div>
                <h3 className="text-lg font-medium text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
