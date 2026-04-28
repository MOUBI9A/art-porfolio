import { createClient } from '@/lib/supabase/server';
import { Settings, Project, Experience } from '@/lib/types';
import Hero from '@/components/public/Hero';
import ProjectGrid from '@/components/public/ProjectGrid';
import AboutSection from '@/components/public/AboutSection';
import ContactSection from '@/components/public/ContactSection';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

async function getPageData(): Promise<{ 
  settings: Settings | null; 
  projects: Project[]; 
  experience: Experience[] 
}> {
  try {
    const supabase = await createClient();

    const [settingsRes, projectsRes, experienceRes] = await Promise.all([
      supabase.from('settings').select('*').single(),
      supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false }),
      supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true })
        .order('start_date', { ascending: false }),
    ]);

    return {
      settings: settingsRes.data ?? null,
      projects: projectsRes.data ?? [],
      experience: experienceRes.data ?? [],
    };
  } catch {
    // Return graceful fallbacks during build/dev without Supabase
    return {
      settings: {
        id: 'placeholder',
        name: 'Yassir Mattous',
        bio: 'Also known as "Zombie". Cinematic filmmaker and visual storyteller specializing in high-energy atmospheric content.',
        email: 'mattousyasser@gmail.com',
        phone: '0650862005',
        instagram: '@therealzombie_officiel',
        hero_text: 'The Zombie Vision.\nCapturing the raw energy of life.',
        hero_video_url: null,
        profile_url: null,
        accent_color: '#c9a84c',
        bg_color: '#0a0a0a',
        font_family: 'playfair',
        grain_opacity: 0.05,
      },
      projects: [],
      experience: [],
    };
  }
}

export default async function HomePage() {
  const { settings, projects, experience } = await getPageData();

  return (
    <main>
      <Hero settings={settings} />
      <ProjectGrid projects={projects} />
      <AboutSection settings={settings} experience={experience} />
      <ContactSection settings={settings} />
    </main>
  );
}
