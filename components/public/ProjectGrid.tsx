'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
}

export default function ProjectGrid({ projects }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 sm:py-32 px-6 sm:px-12 xl:px-20"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="mb-16"
      >
        <p
          className="text-[10px] text-luxury mb-4"
          style={{ color: 'var(--color-gold)' }}
        >
          Selected Work
        </p>
        <h2
          className="text-5xl sm:text-7xl font-medium text-white"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Projects
        </h2>
      </motion.div>

      {/* Grid */}
      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center py-20"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <p className="text-lg">No projects yet.</p>
          <p className="text-sm mt-2">Add projects from the dashboard.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.1 + index * 0.1,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
