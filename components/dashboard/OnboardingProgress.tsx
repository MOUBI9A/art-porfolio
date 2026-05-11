'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface OnboardingProgressProps {
  checks: {
    hasIdentity: boolean;
    hasArtifact: boolean;
    hasInterface: boolean;
  };
}

export default function OnboardingProgress({ checks }: OnboardingProgressProps) {
  const tasks = [
    {
      id: 'identity',
      label: 'Establish Identity',
      desc: 'Add profile photo and bio',
      completed: checks.hasIdentity,
      href: '/dashboard/settings',
    },
    {
      id: 'artifact',
      label: 'Archive First Artifact',
      desc: 'Upload your first project',
      completed: checks.hasArtifact,
      href: '/dashboard/projects/new',
    },
    {
      id: 'interface',
      label: 'Select Interface',
      desc: 'Choose your site template',
      completed: checks.hasInterface,
      href: '/dashboard/settings',
    },
  ];

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  if (completedCount === tasks.length) return null;

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="glass-strong rounded-2xl p-6 border border-gold-500/20 shadow-2xl shadow-gold-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
               <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold-500">System Initialization</span>
               <span className="text-[10px] font-mono text-white/20">{completedCount}/{tasks.length} COMPLETE</span>
            </div>
            <h2 className="text-xl font-medium text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Initialize your creative operating system.
            </h2>
            
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
                transition={{ duration: 1, ease: "circOut" }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <Link 
                  key={task.id}
                  href={task.href}
                  className={`group p-4 rounded-xl border transition-all duration-300 ${
                    task.completed 
                      ? 'bg-gold-500/5 border-gold-500/20 opacity-60' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    {task.completed ? (
                      <CheckCircle2 size={16} className="text-gold-500" />
                    ) : (
                      <Circle size={16} className="text-white/20" />
                    )}
                    {!task.completed && <ArrowRight size={14} className="text-white/0 group-hover:text-white/40 transition-all -translate-x-2 group-hover:translate-x-0" />}
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${task.completed ? 'text-gold-500/70' : 'text-white'}`}>
                    {task.label}
                  </p>
                  <p className="text-[10px] text-white/30 leading-tight">
                    {task.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
