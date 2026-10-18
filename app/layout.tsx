import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import CustomCursor from '@/components/public/CustomCursor';
import ThemeProvider from '@/components/public/ThemeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'ArtifactOS — Cinematic Portfolio SaaS',
    template: '%s | ArtifactOS',
  },
  description:
    'A premium cinematic portfolio platform for filmmakers, directors, programmers, and creatives.',
  keywords: ['filmmaker', 'director', 'portfolio', 'showreel', 'saas'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'ArtifactOS — Cinematic Portfolio SaaS',
    description:
      'A premium cinematic portfolio platform for filmmakers, directors, programmers, and creatives.',
  },
};

async function getPublicSettings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const supabase = createSupabaseClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            signal: AbortSignal.timeout(2_000),
          }),
      },
    });
    const { data } = await supabase.from('settings').select('*').single();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Theme settings are public configuration. Fetch them without reading auth
  // cookies so public routes remain cacheable, and cap backend wait time so a
  // Supabase outage cannot hold up the entire page shell.
  const settings = await getPublicSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body>
        <ThemeProvider settings={settings} />
        <div className="noise-grain" />
        <CustomCursor />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
