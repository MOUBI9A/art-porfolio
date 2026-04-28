'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/lib/types';
import VideoPlayer from './VideoPlayer';

interface Props {
  project: Project;
}

export default function ProjectPageClient({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Back navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/#projects"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ← Back
        </Link>
      </div>

      {/* Full-width thumbnail banner */}
      <div className="relative w-full overflow-hidden" style={{ height: '50vh', minHeight: 300 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            project.thumbnail_url ??
            `https://placehold.co/1600x800/0a0a0a/1a1a1a?text=${encodeURIComponent(project.title)}`
          }
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.05)' }}
        />
        <div className="absolute inset-0 cinematic-overlay" />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Role */}
          {project.role && (
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              {project.role}
            </p>
          )}

          {/* Title */}
          <h1
            className="text-4xl sm:text-6xl font-medium text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {project.title}
          </h1>

          {/* Gold divider */}
          <div className="gold-divider mb-8 max-w-xs" />

          {/* Description */}
          {project.description && (
            <p
              className="text-base sm:text-lg leading-relaxed mb-12"
              style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '620px' }}
            >
              {project.description}
            </p>
          )}

          {/* Video Player */}
          {project.video_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-16"
            >
              <VideoPlayer
                videoUrl={project.video_url}
                thumbnailUrl={project.thumbnail_url}
                title={project.title}
              />
            </motion.div>
          )}

          {/* Meta info */}
          <div
            className="glass rounded-xl p-6 grid grid-cols-2 sm:grid-cols-3 gap-6"
          >
            {project.role && (
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Role
                </p>
                <p className="text-sm font-medium text-white">{project.role}</p>
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                Year
              </p>
              <p className="text-sm font-medium text-white">
                {new Date(project.created_at).getFullYear()}
              </p>
            </div>
            {project.video_type && (
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Platform
                </p>
                <p
                  className="text-sm font-medium capitalize"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {project.video_type.replace('_', ' ')}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
