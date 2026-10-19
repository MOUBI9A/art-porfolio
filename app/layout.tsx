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
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Keep the shared root layout request-independent.
 *
 * Account-backed theming is intentionally disabled with the rest of the auth
 * surface. Reintroduce user settings inside an authenticated route-group
 * layout when auth returns; importing the cookie-aware Supabase server client
 * here makes every public route dynamic and defeats ISR.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ThemeProvider settings={null} />
        <div className="noise-grain" />
        <CustomCursor />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
