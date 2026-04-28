'use client';

import { Settings } from '@/lib/types';

interface Props {
  settings: Settings | null;
}

export default function ThemeProvider({ settings }: Props) {
  if (!settings) return null;

  const accentColor = settings.accent_color || '#c9a84c';
  const bgColor = settings.bg_color || '#0a0a0a';
  const fontFamily = settings.font_family === 'inter' ? 'var(--font-inter)' : 'var(--font-playfair)';
  const grainOpacity = settings.grain_opacity ?? 0.05;

  return (
    <style jsx global>{`
      :root {
        --color-gold: ${accentColor};
        --color-bg: ${bgColor};
        --main-font: ${fontFamily};
      }

      body {
        background-color: var(--color-bg);
      }

      h1, h2, h3, .font-serif {
        font-family: var(--main-font) !important;
      }

      .noise-grain {
        opacity: ${grainOpacity} !important;
      }

      /* Custom selection color based on accent */
      ::selection {
        background: ${accentColor};
        color: #000;
      }

      /* Modern scrollbar themed to accent */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: var(--color-bg);
      }
      ::-webkit-scrollbar-thumb {
        background: ${accentColor}44;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${accentColor}88;
      }
    `}</style>
  );
}
