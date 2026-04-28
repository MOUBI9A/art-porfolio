import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import ProjectsTableClient from '@/components/dashboard/ProjectsTableClient';

export const metadata: Metadata = { title: 'Projects | Dashboard' };

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-5xl w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-1"
            style={{ color: 'var(--color-gold)' }}
          >
            Content
          </p>
          <h1
            className="text-3xl font-medium"
            style={{ fontFamily: 'var(--font-playfair)', color: '#fff' }}
          >
            Projects
          </h1>
        </div>
        <Link
          href="/dashboard/projects/new"
          id="new-project-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #c9a84c, #b8962e)',
            color: '#0a0a0a',
          }}
        >
          + New Project
        </Link>
      </div>

      <ProjectsTableClient initialProjects={projects ?? []} />
    </div>
  );
}
