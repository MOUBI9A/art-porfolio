import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Settings, Project, Experience, Profile } from '@/lib/types';
import Hero from '@/components/public/Hero';
import ProjectGrid from '@/components/public/ProjectGrid';
import AboutSection from '@/components/public/AboutSection';
import ContactSection from '@/components/public/ContactSection';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

async function getPortfolioData(username: string): Promise<{ 
  profile: Profile | null;
  settings: Settings | null; 
  projects: Project[]; 
  experience: Experience[] 
}> {
  try {
    const supabase = await createClient();

    // 1. Get Profile by username
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (!profile) return { profile: null, settings: null, projects: [], experience: [] };

    // 2. Get Data for this specific user
    const [settingsRes, projectsRes, experienceRes] = await Promise.all([
      supabase.from('settings').select('*').eq('user_id', profile.id).single(),
      supabase
        .from('projects')
        .select('*, project_collaborators(*, profile:profiles(*))')
        .eq('user_id', profile.id)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false }),
      supabase
        .from('experience')
        .select('*')
        .eq('user_id', profile.id)
        .order('display_order', { ascending: true })
        .order('start_date', { ascending: false }),
    ]);

    return {
      profile,
      settings: settingsRes.data ?? null,
      projects: projectsRes.data ?? [],
      experience: experienceRes.data ?? [],
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return { profile: null, settings: null, projects: [], experience: [] };
  }
}

import OSDesktop from '@/components/portfolio/OSDesktop';
import ModernMinimalist from '@/components/portfolio/ModernMinimalist';
import BrutalistGrid from '@/components/portfolio/BrutalistGrid';
import AnalyticsTracker from '@/components/public/AnalyticsTracker';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const { profile, settings } = await getPortfolioData(username);

  if (!profile) {
    return {
      title: 'User Not Found',
    };
  }

  const name = profile.full_name || profile.username;
  const description = settings?.bio || `Explore the professional portfolio of ${name}. Built with ArtifactOS.`;

  return {
    title: `${name} | ArtifactOS`,
    description: description,
    openGraph: {
      title: `${name} | ArtifactOS`,
      description: description,
      type: 'website',
      images: profile.avatar_url ? [{ url: profile.avatar_url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | ArtifactOS`,
      description: description,
      images: profile.avatar_url ? [profile.avatar_url] : [],
    },
  };
}

export default async function UserPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { profile, settings, projects, experience } = await getPortfolioData(username);

  if (!profile) {
    notFound();
  }

  // Determine which template to use
  const templateId = settings?.template_id || 'classic';

  let content;
  if (templateId === 'modern') {
    content = (
      <ModernMinimalist
        profile={profile}
        settings={settings}
        projects={projects}
        experience={experience}
      />
    );
  } else if (templateId === 'brutalist') {
    content = (
      <BrutalistGrid
        profile={profile}
        settings={settings}
        projects={projects}
        experience={experience}
      />
    );
  } else {
    // Default to OSDesktop
    content = (
      <OSDesktop 
        profile={profile} 
        settings={settings} 
        projects={projects} 
        experience={experience} 
      />
    );
  }

  return (
    <>
      <AnalyticsTracker profileId={profile.id} />
      {content}
    </>
  );
}
