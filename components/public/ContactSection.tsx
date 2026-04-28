'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings } from '@/lib/types';

interface Props {
  settings: Settings | null;
}

export default function ContactSection({ settings }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const email = settings?.email ?? 'contact@example.com';
  const instagram = settings?.instagram;
  const phone = settings?.phone;

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 sm:py-36 px-6 sm:px-12 xl:px-20"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: 'var(--color-gold)' }}
          >
            Contact
          </p>
          <h2
            className="text-4xl sm:text-5xl font-medium text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Let&apos;s Work Together
          </h2>
          <p
            className="text-base max-w-lg mx-auto mb-12"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Available for commercial projects, feature films, music videos,
            documentaries, and creative collaborations.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <a
              href={`mailto:${email}`}
              id="contact-email-link"
              className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #b8962e)',
                color: '#0a0a0a',
                letterSpacing: '0.02em',
              }}
            >
              {email}
            </a>

            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                id="contact-phone-link"
                className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {phone}
              </a>
            )}

            {instagram && (
              <a
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-instagram-link"
                className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                @{instagram.replace('@', '')}
              </a>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} {settings?.name ?? 'DirectorOS'}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
