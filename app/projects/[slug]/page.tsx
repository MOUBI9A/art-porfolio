import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectPageClient from '@/components/public/ProjectPageClient';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('title, description')
    .eq('slug', params.slug)
    .single();

  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description ?? undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!project) notFound();

  return <ProjectPageClient project={project} />;
}
