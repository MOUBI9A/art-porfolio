import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import SettingsFormClient from '@/components/dashboard/SettingsFormClient';

export const metadata: Metadata = { title: 'Settings | Dashboard' };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const [settingsRes, profileRes] = await Promise.all([
    supabase.from('settings').select('*').single(),
    supabase.from('profiles').select('*').eq('id', user?.id).single()
  ]);

  return (
    <div className="p-8 max-w-3xl w-full">
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--color-gold)' }}
        >
          Configuration
        </p>
        <h1
          className="text-3xl font-medium"
          style={{ fontFamily: 'var(--font-playfair)', color: '#fff' }}
        >
          Site Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Edit your profile, bio, profession, and OS template.
        </p>
      </div>

      <SettingsFormClient 
        settings={settingsRes.data ?? null} 
        profile={profileRes.data ?? null}
      />
    </div>
  );
}
