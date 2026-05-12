'use client';

import React, { useState, useEffect } from 'react';
import { Profile, Settings, Project, Experience } from '@/lib/types';
import OSWindow from './OSWindow';
import DesktopIcon from './DesktopIcon';
import OSTaskbar from './OSTaskbar';
import Image from 'next/image';
import { Instagram, Linkedin, Twitter, Video, Globe, Mail, Phone, User } from 'lucide-react';

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
      <div className="relative z-10 p-6 sm:p-10 grid grid-cols-2 sm:grid-cols-1 gap-6 sm:gap-8 w-fit h-fit max-h-[80vh]">
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
               <p className={`${theme.isLight ? 'text-blue-600' : 'text-blue-400'} mb-6 uppercase`}>{"//"} {profile.niche} Entry</p>
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
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {projects.map(project => (
                 <div key={project.id} className="group cursor-pointer">
                    <div className="aspect-video bg-white/5 rounded-lg border border-white/10 overflow-hidden mb-2 relative">
                      {project.thumbnail_url && (
                        <Image 
                          src={project.thumbnail_url} 
                          alt={project.title} 
                          fill 
                          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="text-xs font-bold tracking-widest px-3 py-1 bg-white text-black rounded-full">OPEN</span>
                      </div>
                    </div>
                    <p className="text-xs font-bold truncate text-center">{project.title}</p>
                    {project.project_collaborators && project.project_collaborators.length > 0 && (
                      <div className="flex justify-center -space-x-1 mt-1">
                        {project.project_collaborators.map(collab => (
                          <div 
                            key={collab.id} 
                            className="w-4 h-4 rounded-full border border-[#222] bg-white/20 flex items-center justify-center text-[7px] overflow-hidden relative z-10 hover:z-20 transition-transform hover:scale-125" 
                            title={`${collab.profile?.full_name || collab.profile?.username} - ${collab.role_title}`}
                          >
                            {collab.profile?.avatar_url ? (
                              <Image src={collab.profile.avatar_url} alt="avatar" fill className="object-cover" />
                            ) : (
                              <span>{(collab.profile?.full_name || collab.profile?.username || '?').charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </OSWindow>
        )}

        {openWindows.includes('contact') && (
          <OSWindow 
            id="contact" 
            title="Connect.link — Contact"
            onClose={() => toggleWindow('contact')}
            onFocus={() => setFocusedWindow('contact')}
            isFocused={focusedWindow === 'contact'}
            isLight={theme.isLight}
            className="w-[400px] h-[450px]"
          >
            <div className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full border-2 border-gold-500 overflow-hidden relative">
                {settings?.profile_url ? (
                  <Image src={settings.profile_url} alt="profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <User size={32} className="text-white/20" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase">{profile.full_name}</h3>
                <p className="text-[10px] text-gold-500 uppercase tracking-widest">{profile.niche}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                {settings?.email && (
                  <a href={`mailto:${settings.email}`} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                    <Mail size={18} className="text-gold-500" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">Email</span>
                  </a>
                )}
                {settings?.instagram && (
                  <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                    <Instagram size={18} className="text-gold-500" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">Instagram</span>
                  </a>
                )}
                {settings?.social_linkedin && (
                  <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                    <Linkedin size={18} className="text-gold-500" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">LinkedIn</span>
                  </a>
                )}
                {settings?.social_x && (
                  <a href={settings.social_x} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                    <Twitter size={18} className="text-gold-500" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">X_Identity</span>
                  </a>
                )}
                {settings?.social_vimeo && (
                  <a href={settings.social_vimeo} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                    <Video size={18} className="text-gold-500" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">Vimeo</span>
                  </a>
                )}
                {settings?.social_website && (
                  <a href={settings.social_website} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                    <Globe size={18} className="text-gold-500" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter">Web_Portal</span>
                  </a>
                )}
              </div>
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
