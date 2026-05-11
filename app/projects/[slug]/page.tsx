import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectPageClient from '@/components/public/ProjectPageClient';
import AnalyticsTracker from '@/components/public/AnalyticsTracker';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('title, description')
    .eq('slug', slug)
    .single();

  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description ?? undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) notFound();

  return (
    <>
      <AnalyticsTracker profileId={project.user_id} projectId={project.id} />
      <ProjectPageClient project={project} />
    </>
  );
}
