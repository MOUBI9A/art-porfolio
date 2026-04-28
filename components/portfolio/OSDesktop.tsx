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

import { NicheThemes } from './themes';

const OSDesktop: React.FC<OSDesktopProps> = ({ profile, settings, projects, experience }) => {
  const theme = NicheThemes[profile.niche as keyof typeof NicheThemes] || NicheThemes.filmmaker;
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
    <div className={`relative h-screen w-full overflow-hidden ${theme.isLight ? 'bg-white text-black' : 'bg-black text-white'} ${theme.font} selection:bg-white/20`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient}`} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-10 grid grid-cols-1 gap-8 w-fit h-fit max-h-[80vh]">
        <DesktopIcon 
          id="projects" 
          label={theme.labels.projects} 
          icon={theme.icons.projects} 
          onClick={() => toggleWindow('projects')} 
          isActive={openWindows.includes('projects')}
          isLight={theme.isLight}
        />
        <DesktopIcon 
          id="about" 
          label={theme.labels.about} 
          icon={theme.icons.about} 
          onClick={() => toggleWindow('about')} 
          isActive={openWindows.includes('about')}
          isLight={theme.isLight}
        />
        <DesktopIcon 
          id="ai" 
          label="Resident_AI" 
          icon={theme.icons.ai} 
          onClick={() => toggleWindow('ai')} 
          isActive={openWindows.includes('ai')}
          isLight={theme.isLight}
        />
        <DesktopIcon 
          id="contact" 
          label="Connect.link" 
          icon={theme.icons.contact} 
          onClick={() => toggleWindow('contact')} 
          isActive={openWindows.includes('contact')}
          isLight={theme.isLight}
        />
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {openWindows.includes('about') && (
          <OSWindow 
            id="about" 
            title={`${theme.labels.about} — Notepad`}
            onClose={() => toggleWindow('about')}
            onFocus={() => setFocusedWindow('about')}
            isFocused={focusedWindow === 'about'}
            isLight={theme.isLight}
          >
            <div className={`p-8 ${theme.font} text-sm leading-relaxed max-w-2xl`}>
               <h1 className="text-2xl font-bold mb-4 border-b border-black/10 dark:border-white/10 pb-4">{profile.full_name}</h1>
               <p className={`${theme.isLight ? 'text-blue-600' : 'text-blue-400'} mb-6 uppercase`}>// {profile.niche} Entry</p>
               <p className="mb-4 whitespace-pre-wrap">{settings?.bio || 'System identity loading...'}</p>
               <div className={`mt-8 pt-8 border-t ${theme.isLight ? 'border-black/10' : 'border-white/10'}`}>
                 <h2 className="text-lg font-bold mb-4">Chronology:</h2>
                 {experience.map(exp => (
                   <div key={exp.id} className="mb-4">
                     <p className="opacity-60">[{exp.start_date} - {exp.end_date || 'PRESENT'}]</p>
                     <p className="font-bold">{exp.role} @ {exp.company}</p>
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
        isLight={theme.isLight}
      />
    </div>
  );
};

export default OSDesktop;
