import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

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

import CustomCursor from '@/components/public/CustomCursor';
import ThemeProvider from '@/components/public/ThemeProvider';
import { createClient } from '@/lib/supabase/server';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').single();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
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
