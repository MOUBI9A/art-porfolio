'use client';

import React, { useState, useEffect } from 'react';
import { Profile, Settings, Project, Experience } from '@/lib/types';
import OSWindow from './OSWindow';
import DesktopIcon from './DesktopIcon';
import OSTaskbar from './OSTaskbar';

interface OSDesktopProps {
  profile: Profile;
  settings: Settings | null;
  projects: Project[];
  experience: Experience[];
}

const OSDesktop: React.FC<OSDesktopProps> = ({ profile, settings, projects, experience }) => {
  const [openWindows, setOpenWindows] = useState<string[]>(['about']);
  const [focusedWindow, setFocusedWindow] = useState<string>('about');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWindow = (id: string) => {
    if (openWindows.includes(id)) {
      setOpenWindows(openWindows.filter(w => w !== id));
    } else {
      setOpenWindows([...openWindows, id]);
      setFocusedWindow(id);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans selection:bg-white/20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
        {/* Pulsing Glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-10 grid grid-cols-1 gap-8 w-fit h-fit max-h-[80vh]">
        <DesktopIcon 
          id="projects" 
          label="Projects.exe" 
          icon="📁" 
          onClick={() => toggleWindow('projects')} 
          isActive={openWindows.includes('projects')}
        />
        <DesktopIcon 
          id="about" 
          label="Bio.txt" 
          icon="📄" 
          onClick={() => toggleWindow('about')} 
          isActive={openWindows.includes('about')}
        />
        <DesktopIcon 
          id="ai" 
          label="Resident_AI" 
          icon="🤖" 
          onClick={() => toggleWindow('ai')} 
          isActive={openWindows.includes('ai')}
        />
        <DesktopIcon 
          id="contact" 
          label="Connect.link" 
          icon="🔗" 
          onClick={() => toggleWindow('contact')} 
          isActive={openWindows.includes('contact')}
        />
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {openWindows.includes('about') && (
          <OSWindow 
            id="about" 
            title="Bio.txt — Notepad" 
            onClose={() => toggleWindow('about')}
            onFocus={() => setFocusedWindow('about')}
            isFocused={focusedWindow === 'about'}
          >
            <div className="p-8 font-mono text-sm leading-relaxed max-w-2xl">
               <h1 className="text-2xl font-bold mb-4 border-b border-white/10 pb-4">{profile.full_name}</h1>
               <p className="text-blue-400 mb-6">// {profile.niche.toUpperCase()} ENTRY</p>
               <p className="mb-4">{settings?.bio || 'System identity loading...'}</p>
               <div className="mt-8 pt-8 border-t border-white/10">
                 <h2 className="text-lg font-bold mb-4">Experience Log:</h2>
                 {experience.map(exp => (
                   <div key={exp.id} className="mb-4">
                     <p className="text-gray-400">[{exp.start_date} - {exp.end_date || 'PRESENT'}]</p>
                     <p className="font-bold text-white">{exp.role} @ {exp.company}</p>
                   </div>
                 ))}
               </div>
            </div>
          </OSWindow>
        )}

        {openWindows.includes('projects') && (
          <OSWindow 
            id="projects" 
            title="Projects Explorer" 
            onClose={() => toggleWindow('projects')}
            onFocus={() => setFocusedWindow('projects')}
            isFocused={focusedWindow === 'projects'}
            className="w-[800px] h-[500px]"
          >
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
               {projects.map(project => (
                 <div key={project.id} className="group cursor-pointer">
                    <div className="aspect-video bg-white/5 rounded-lg border border-white/10 overflow-hidden mb-2 relative">
                      {project.thumbnail_url && (
                        <img src={project.thumbnail_url} alt={project.title} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="text-xs font-bold tracking-widest px-3 py-1 bg-white text-black rounded-full">OPEN</span>
                      </div>
                    </div>
                    <p className="text-xs font-bold truncate text-center">{project.title}</p>
                 </div>
               ))}
            </div>
          </OSWindow>
        )}
      </div>

      {/* Taskbar */}
      <OSTaskbar 
        profile={profile}
        currentTime={currentTime}
        openWindows={openWindows}
        focusedWindow={focusedWindow}
        onToggleWindow={toggleWindow}
      />
    </div>
  );
};

export default OSDesktop;
