'use client';

import Link from 'next/link';
import { Project } from '@/lib/types';

interface Props {
  project: Project;
}

const ROLE_COLORS: Record<string, string> = {
  director: '#c9a84c',
  dop: '#7eb8d4',
  editor: '#b87eb8',
  cinematographer: '#7eb8d4',
  producer: '#7ed4a0',
};

function getRoleColor(role: string | null) {
  if (!role) return 'rgba(255,255,255,0.5)';
  const key = role.toLowerCase().split(' ')[0];
  return ROLE_COLORS[key] ?? 'var(--color-gold)';
}

export default function ProjectCard({ project }: Props) {
  const thumbnailSrc =
    project.thumbnail_url ??
    `https://placehold.co/800x450/111111/333333?text=${encodeURIComponent(project.title)}`;

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="PLAY"
      className="project-card group block relative rounded-2xl overflow-hidden aspect-[16/9]"
      style={{ background: '#000' }}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailSrc}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      {/* Info Container */}
      <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        {project.role && (
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-3 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"
            style={{ color: 'var(--color-gold)' }}
          >
            {project.role}
          </p>
        )}
        <h3
          className="text-2xl sm:text-3xl font-medium text-white leading-tight mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {project.title}
        </h3>
        {project.description && (
          <p
            className="text-sm line-clamp-2 max-w-[90%] text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"
          >
            {project.description}
          </p>
        )}
      </div>

      {/* Border Highlight */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </Link>
  );
}
