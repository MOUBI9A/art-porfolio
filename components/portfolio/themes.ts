'use client';

export const NicheThemes = {
  filmmaker: {
    bgGradient: "from-blue-900/20 via-black to-purple-900/20",
    accent: "blue",
    font: "font-sans",
    icons: {
      projects: "🎬",
      about: "📄",
      ai: "🤖",
      contact: "🔗"
    },
    labels: {
      projects: "Showreels.mov",
      about: "Director_Bio.pdf"
    }
  },
  programmer: {
    bgGradient: "from-green-900/20 via-black to-emerald-900/20",
    accent: "green",
    font: "font-mono",
    icons: {
      projects: "⌨️",
      about: "terminal",
      ai: "🧠",
      contact: "ssh"
    },
    labels: {
      projects: "Repositories.git",
      about: "system_info.sh"
    }
  },
  photographer: {
    bgGradient: "from-gray-200 via-white to-gray-100",
    accent: "gray",
    font: "font-serif",
    isLight: true,
    icons: {
      projects: "📷",
      about: "🖼️",
      ai: "✨",
      contact: "✉️"
    },
    labels: {
      projects: "Gallery.raw",
      about: "Artist_Statement.txt"
    }
  },
  musician: {
    bgGradient: "from-fuchsia-900/20 via-black to-pink-900/20",
    accent: "pink",
    font: "font-sans",
    icons: {
      projects: "🎹",
      about: "🔊",
      ai: "🎙️",
      contact: "📻"
    },
    labels: {
      projects: "Discography.mp3",
      about: "Studio_Notes.log"
    }
  }
};
