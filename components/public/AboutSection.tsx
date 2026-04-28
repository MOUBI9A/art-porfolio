'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Experience } from '@/lib/types';
import Image from 'next/image';

interface Props {
  settings: Settings | null;
  experience?: Experience[];
}

export default function AboutSection({ settings, experience = [] }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const name = settings?.name ?? 'Your Name';
  const bio =
    settings?.bio ??
    'A storyteller with a camera. Turning vision into cinematic experiences that resonate, inspire, and endure.';

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 sm:py-36 px-6 sm:px-12 xl:px-20"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — label + heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              About
            </p>
            <h2
              className="text-4xl sm:text-5xl font-medium text-white leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {name}
            </h2>

            {/* Gold divider */}
            <div className="gold-divider my-8 max-w-xs" />

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              {bio}
            </p>
          </motion.div>

          {/* Right — decorative frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer gold border frame */}
              <div
                className="absolute -inset-3 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.4), rgba(201,168,76,0.05))',
                }}
              />
              <div
                className="relative rounded-xl overflow-hidden flex items-center justify-center"
                style={{
                  width: 280,
                  height: 340,
                  background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                {/* Decorative pattern or Profile Image */}
                {settings?.profile_url ? (
                  <Image 
                    src={settings.profile_url} 
                    alt={name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          rgba(201,168,76,0.3) 0px,
                          rgba(201,168,76,0.3) 1px,
                          transparent 1px,
                          transparent 12px
                        )`,
                      }}
                    />
                    <div className="relative text-center p-8">
                      <div
                        className="text-6xl font-serif mb-4 italic"
                        style={{ color: 'var(--color-gold)' }}
                      >
                        {name.charAt(0)}
                      </div>
                      <p
                        className="text-xs tracking-[0.3em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        Director
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-32 border-t border-white/5 pt-24"
          >
            <div className="flex items-center gap-6 mb-16">
              <h3 
                className="text-3xl font-medium text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Experience
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-[#c9a84c]/30 to-transparent" />
            </div>

            <div className="space-y-16">
              {experience.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-16"
                >
                  <div className="flex flex-col">
                    <span 
                      className="text-xs tracking-[0.3em] uppercase font-semibold mb-2"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {item.start_date ? new Date(item.start_date).getFullYear() : ''}
                      {item.is_current ? ' — Present' : item.end_date ? ` — ${new Date(item.end_date).getFullYear()}` : ''}
                    </span>
                    <span className="text-white/30 text-[10px] tracking-widest uppercase">
                      {item.location}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl text-white font-medium mb-1 group-hover:text-[#c9a84c] transition-colors">
                      {item.company}
                    </h4>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                      {item.role}
                    </p>
                    <p className="text-white/60 text-base max-w-3xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
