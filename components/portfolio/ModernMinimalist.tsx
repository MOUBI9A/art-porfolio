'use client';

import React from 'react';
import { Profile, Settings, Project, Experience } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react';

interface Props {
  profile: Profile;
  settings: Settings | null;
  projects: Project[];
  experience: Experience[];
}

const ModernMinimalist: React.FC<Props> = ({ profile, settings, projects, experience }) => {
  const accentColor = settings?.accent_color || '#c9a84c';
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-10 py-8 flex justify-between items-center mix-blend-difference">
        <span className="text-xl font-medium tracking-tighter">{profile.full_name}</span>
        <div className="flex gap-8 text-xs uppercase tracking-widest font-medium opacity-60">
          <a href="#work" className="hover:opacity-100 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center px-10 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <p className="text-xs uppercase tracking-[0.5em] mb-6 opacity-40 font-medium">Available for Projects — 2026</p>
          <h1 className="text-[12vw] leading-[0.85] font-medium tracking-tighter uppercase mb-10">
            {profile.niche.replace('_', ' ')}
          </h1>
          <div className="flex flex-wrap gap-20 items-end">
            <p className="max-w-md text-lg opacity-60 leading-relaxed">
              {settings?.hero_text || 'Creating visual narratives and digital experiences with a focus on cinematic aesthetics and technical precision.'}
            </p>
            <div className="flex flex-col gap-4">
               <div className="flex gap-4">
                  {settings?.instagram && (
                    <a href={`https://instagram.com/${settings.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Instagram size={20} />
                    </a>
                  )}
                  {settings?.email && (
                    <a href={`mailto:${settings.email}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <Mail size={20} />
                    </a>
                  )}
               </div>
            </div>
          </div>
        </motion.div>

        {/* Background Grain/Noise */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 contrast-150" />
        
        {/* Subtle Gradient */}
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] blur-[150px] opacity-20 rounded-full"
          style={{ background: accentColor }}
        />
      </section>

      {/* Projects Grid */}
      <section id="work" className="px-10 py-32">
        <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-10">
          <h2 className="text-5xl font-medium tracking-tighter uppercase">Selected Work</h2>
          <span className="text-xs opacity-40 uppercase tracking-widest font-bold">({projects.length}) Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-32">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white/5 mb-8 rounded-sm">
                {project.thumbnail_url && (
                  <Image 
                    src={project.thumbnail_url} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <ArrowUpRight size={48} className="text-white" strokeWidth={1} />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-medium uppercase tracking-tight mb-2">{project.title}</h3>
                  <p className="text-xs uppercase tracking-widest opacity-40 font-bold">{project.role || profile.niche}</p>
                  {project.project_collaborators && project.project_collaborators.length > 0 && (
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-[9px] uppercase tracking-widest opacity-30">Crew</span>
                      <div className="flex -space-x-1">
                        {project.project_collaborators.map(collab => (
                          <div 
                            key={collab.id} 
                            className="w-5 h-5 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[8px] overflow-hidden text-white relative"
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
                    </div>
                  )}
                </div>
                <span className="text-[10px] opacity-20 font-mono">0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About & Experience */}
      <section id="about" className="px-10 py-32 bg-white text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-medium tracking-tighter uppercase mb-10">The Artist</h2>
            <p className="text-2xl leading-relaxed max-w-xl">
              {settings?.bio || 'Passionate creative focused on delivering high-impact visual experiences.'}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold opacity-40 mb-10 border-b border-black/10 pb-4">Chronology</h3>
            <div className="space-y-12">
              {experience.map((exp) => (
                <div key={exp.id} className="flex justify-between items-start group">
                  <div>
                    <h4 className="text-xl font-medium uppercase">{exp.role}</h4>
                    <p className="opacity-60">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono opacity-40">
                    {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="px-10 py-32 bg-black text-white">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.5em] mb-10 opacity-40 font-medium">Ready to start?</p>
          <h2 className="text-[10vw] leading-none font-medium tracking-tighter uppercase mb-20 hover:text-white/60 transition-colors cursor-pointer">
            Let&apos;s Collaborate
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl pt-20 border-t border-white/10">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Contact</p>
              <p className="text-lg">{settings?.email}</p>
              <p className="text-lg">{settings?.phone}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Social</p>
              <p className="text-lg hover:underline cursor-pointer">Instagram</p>
              <p className="text-lg hover:underline cursor-pointer">LinkedIn</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Location</p>
              <p className="text-lg">Based in NYC</p>
              <p className="text-lg">Remote Worldwide</p>
            </div>
          </div>
          
          <div className="mt-32 w-full flex justify-between items-center text-[10px] uppercase tracking-[0.3em] opacity-20 font-bold">
            <span>© 2026 {profile.full_name}</span>
            <span>Built with ArtifactOS</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernMinimalist;
