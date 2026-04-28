'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Settings } from '@/lib/types';
import { processVideoUrl } from '@/lib/video';

interface HeroProps {
  settings: Settings | null;
}

const FALLBACK_VIDEO =
  'https://www.youtube.com/embed/RHYWTzQXB6Y?autoplay=1&mute=1&loop=1&playlist=RHYWTzQXB6Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080';

export default function Hero({ settings }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroText = settings?.hero_text ?? 'Crafting stories\nthat move the world.';
  const lines = heroText.split('\n').filter(Boolean);

  // Determine the hero video embed URL
  let videoSrc = FALLBACK_VIDEO;
  let videoType: string = 'youtube';

  if (settings?.hero_video_url) {
    const { embedUrl, type } = processVideoUrl(settings.hero_video_url);
    videoType = type;
    if (type === 'youtube') {
      videoSrc = embedUrl.includes('autoplay')
        ? embedUrl
        : embedUrl + '&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080';
    } else if (type === 'vimeo') {
      videoSrc = embedUrl.includes('autoplay') 
        ? embedUrl 
        : embedUrl + '&autoplay=1&muted=1&loop=1&background=1&quality=1080p';
    } else if (type === 'google_drive') {
      videoSrc = embedUrl;
    } else {
      // Direct file fallback
      videoSrc = settings.hero_video_url;
      videoType = 'direct';
    }
  }

  // Detect if it's a direct video file (MP4, WebM, etc.)
  const isDirectVideo = videoType === 'direct' || videoSrc.match(/\.(mp4|webm|ogg)$ /i);

  const parallaxTranslate = scrollY * 0.4;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-end overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Background Video */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translateY(${parallaxTranslate}px)`, willChange: 'transform' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          {isDirectVideo ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setIsLoaded(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
              style={{
                scale: 1.1 + scrollY * 0.0005,
              }}
            />
          ) : (
            <iframe
              src={videoSrc}
              onLoad={() => setIsLoaded(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '130vw',
                height: '130vh',
                minWidth: '100%',
                border: 'none',
                pointerEvents: 'none',
                scale: 1.1 + scrollY * 0.0005,
              }}
              allow="autoplay; fullscreen"
              title="Hero background video"
            />
          )}
        </motion.div>
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 cinematic-overlay" />

      {/* Letterbox bars */}
      <div
        className="absolute top-0 left-0 right-0 h-24" // Deeper letterbox
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-20" // Bottom letterbox
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-8 sm:px-16 pb-24 sm:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <motion.p
            variants={charVariants}
            className="text-[10px] tracking-[0.5em] uppercase mb-8 font-medium"
            style={{ color: 'var(--color-gold)' }}
          >
            {settings?.name ?? 'DirectorOS'} — Portfolio
          </motion.p>

          {/* Hero text */}
          <h1
            className="text-6xl sm:text-8xl xl:text-9xl font-medium leading-[1.05] text-white mb-12"
            style={{ fontFamily: 'var(--font-playfair)', maxWidth: '900px' }}
          >
            {lines.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden pb-2">
                {line.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${lineIndex}-${charIndex}`}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* CTA buttons */}
          <motion.div
            variants={charVariants}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="#projects"
              data-cursor="VIEW"
              className="px-10 py-4 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #b8962e)',
                color: '#0a0a0a',
                letterSpacing: '0.1em',
              }}
            >
              PROJECTS
            </a>
            <a
              href="#contact"
              data-cursor="HELLO"
              className="px-10 py-4 rounded-full text-xs font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                letterSpacing: '0.1em',
              }}
            >
              CONTACT
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-8 sm:right-16 flex flex-col items-center gap-4 z-30"
      >
        <span
          className="text-[10px] tracking-[0.4em] uppercase font-bold"
          style={{ color: 'rgba(255,255,255,0.4)', writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-16"
          style={{ background: 'linear-gradient(to bottom, var(--color-gold), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
