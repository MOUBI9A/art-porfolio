'use client';

import React from 'react';
import { Profile, Settings, Project, Experience } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Video, Globe, Mail, Phone } from 'lucide-react';

interface Props {
  profile: Profile;
  settings: Settings | null;
  projects: Project[];
  experience: Experience[];
}

const BrutalistGrid: React.FC<Props> = ({ profile, settings, projects, experience }) => {
  const accentColor = settings?.accent_color || '#c9a84c';
  
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-mono selection:bg-black selection:text-white">
      {/* Header */}
      <header className="border-b-4 border-black p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sticky top-0 bg-[#f0f0f0] z-50">
        <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
          {profile.full_name} <br/>
          <span className="text-xl bg-black text-white px-2 py-1">{profile.niche.replace('_', ' ')}</span>
        </h1>
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors font-bold uppercase text-sm">Projects</a>
          <a href="#about" className="border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors font-bold uppercase text-sm">About</a>
          <a href={`mailto:${settings?.email || 'contact@artifact.os'}`} className="bg-black text-white px-6 py-2 hover:bg-transparent hover:text-black border-2 border-black transition-colors font-bold uppercase text-sm">Hire Me</a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="p-8 border-b-4 border-black grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              CREATING <br/>
              DYNAMIC <br/>
              ARTIFACTS.
            </h2>
            <div className="max-w-md border-l-8 border-black pl-6 py-4">
              <p className="text-xl font-bold uppercase leading-tight">
                {settings?.hero_text || 'Breaking conventional boundaries through aggressive visual systems and architectural precision.'}
              </p>
            </div>
          </div>
          <div className="relative aspect-square border-4 border-black overflow-hidden bg-black group">
             {settings?.profile_url && (
               <Image 
                src={settings.profile_url} 
                alt={profile.full_name || profile.username || 'Portfolio Avatar'}
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
               />
             )}
             <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
             <div className="absolute bottom-6 left-6 right-6 p-4 bg-white border-2 border-black">
                <p className="text-xs font-black uppercase tracking-widest">Resident_OS // Profile_Detected</p>
             </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b-4 border-black">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              whileHover={{ scale: 1.02 }}
              className={`p-8 border-black ${idx % 3 !== 2 ? 'lg:border-r-4' : ''} border-b-4 md:border-b-4 lg:border-b-0 group cursor-pointer relative overflow-hidden`}
            >
              <div className="relative aspect-video border-2 border-black overflow-hidden mb-6">
                {project.thumbnail_url && (
                  <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover grayscale contrast-125" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="bg-white text-black font-black px-4 py-2 border-2 border-black transform -rotate-12 group-hover:rotate-0 transition-transform">VIEW_DATA</span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-black uppercase leading-none">{project.title}</h3>
                <span className="text-xs font-bold bg-black text-white px-2">ID_{idx + 1}</span>
              </div>
              {project.project_collaborators && project.project_collaborators.length > 0 && (
                <div className="mt-3 flex items-center gap-2 border-t-2 border-black pt-2">
                  <span className="text-[10px] font-black uppercase">CREW_</span>
                  <div className="flex -space-x-2">
                    {project.project_collaborators.map(collab => (
                      <div 
                        key={collab.id} 
                        className="w-6 h-6 rounded-full border-2 border-black bg-white text-black flex items-center justify-center text-[10px] font-black overflow-hidden relative z-10 hover:z-20 hover:-translate-y-1 transition-transform"
                        title={`${collab.profile?.full_name || collab.profile?.username} - ${collab.role_title}`}
                      >
                        {collab.profile?.avatar_url ? (
                          <Image src={collab.profile.avatar_url} alt="avatar" fill className="object-cover grayscale contrast-125" />
                        ) : (
                          <span>{(collab.profile?.full_name || collab.profile?.username || '?').charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-4 text-xs font-bold uppercase opacity-60 leading-tight line-clamp-2">{project.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Bio & Experience Section */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-3">
          <div className="p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-black text-white">
            <h2 className="text-4xl font-black uppercase mb-8">Manifesto</h2>
            <p className="text-lg font-bold uppercase leading-snug">
              {settings?.bio || 'The system is the message. Every pixel is a calculated decision in the pursuit of visual dominance.'}
            </p>
          </div>
          <div className="col-span-2 p-8 bg-[#ffff00]">
            <h2 className="text-4xl font-black uppercase mb-8">Timeline_Log</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="border-b-2 border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <h4 className="text-xl font-black uppercase">{exp.role} @ {exp.company}</h4>
                    <p className="text-xs font-bold uppercase opacity-70">{exp.location}</p>
                  </div>
                  <div className="bg-black text-white px-3 py-1 font-black text-xs uppercase">
                    {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 bg-black text-white text-center">
        <p className="text-6xl md:text-[15vw] font-black uppercase tracking-tighter leading-none mb-12">CONTACT</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-20 text-xl font-black uppercase">
          {settings?.email && <a href={`mailto:${settings.email}`} className="hover:text-[#ffff00] transition-colors">{settings.email}</a>}
          {settings?.phone && <a href={`tel:${settings.phone}`} className="hover:text-[#ffff00] transition-colors">{settings.phone}</a>}
          {settings?.instagram && <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffff00] transition-colors">Instagram</a>}
          {settings?.social_linkedin && <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffff00] transition-colors">LinkedIn</a>}
          {settings?.social_x && <a href={settings.social_x} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffff00] transition-colors">X_Identity</a>}
          {settings?.social_vimeo && <a href={settings.social_vimeo} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffff00] transition-colors">Vimeo</a>}
          {settings?.social_website && <a href={settings.social_website} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffff00] transition-colors">Web_Portal</a>}
        </div>
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest pt-8 border-t border-white/20">
          <span>{profile.full_name} © 2026</span>
          <span>Status: SYSTEM_ONLINE</span>
          <span>Template: Brutalist_v1.0</span>
        </div>
      </footer>
    </div>
  );
};

export default BrutalistGrid;
