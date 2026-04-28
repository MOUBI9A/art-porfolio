import type { Metadata } from 'next';
import ProjectFormClient from '@/components/dashboard/ProjectFormClient';

export const metadata: Metadata = { title: 'New Project | Dashboard' };

export default function NewProjectPage() {
  return (
    <div className="p-8 max-w-3xl w-full">
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--color-gold)' }}
        >
          Projects
        </p>
        <h1
          className="text-3xl font-medium"
          style={{ fontFamily: 'var(--font-playfair)', color: '#fff' }}
        >
          New Project
        </h1>
      </div>

      <ProjectFormClient mode="create" />
    </div>
  );
}
