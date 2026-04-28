import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectFormClient from '@/components/dashboard/ProjectFormClient';

interface Props {
  params: { id: string };
}

export const metadata: Metadata = { title: 'Edit Project | Dashboard' };

export default async function EditProjectPage({ params }: Props) {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!project) notFound();

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
          Edit Project
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          {project.title}
        </p>
      </div>

      <ProjectFormClient mode="edit" project={project} />
    </div>
  );
}
