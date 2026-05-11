import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import ExperienceManagerClient from '@/components/dashboard/ExperienceManagerClient';

export const metadata: Metadata = { title: 'Experience | Dashboard' };

export default async function ExperiencePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .eq('user_id', user.id)
    .order('display_order', { ascending: true });

  return (
    <div className="p-8 max-w-5xl w-full">
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--color-gold)' }}
        >
          Resume
        </p>
        <h1
          className="text-3xl font-medium"
          style={{ fontFamily: 'var(--font-playfair)', color: '#fff' }}
        >
          Experience & Career
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Manage your professional history and work experience.
        </p>
      </div>

      <ExperienceManagerClient initialExperience={experience || []} userId={user.id} />
    </div>
  );
}
