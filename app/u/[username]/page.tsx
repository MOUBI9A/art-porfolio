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
        .select('*')
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

export default async function UserPortfolioPage({ params }: { params: { username: string } }) {
  const { username } = params;
  const { profile, settings, projects, experience } = await getPortfolioData(username);

  if (!profile) {
    notFound();
  }

  return (
    <OSDesktop 
      profile={profile} 
      settings={settings} 
      projects={projects} 
      experience={experience} 
    />
  );
}
