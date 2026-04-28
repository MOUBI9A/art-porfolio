'use client';

import React from 'react';
import { Profile } from '@/lib/types';

interface OSTaskbarProps {
  profile: Profile;
  currentTime: Date;
  openWindows: string[];
  focusedWindow: string;
  onToggleWindow: (id: string) => void;
}

const OSTaskbar: React.FC<OSTaskbarProps> = ({ profile, currentTime, openWindows, focusedWindow, onToggleWindow }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/60 backdrop-blur-2xl border-t border-white/10 z-[100] flex items-center justify-between px-6">
      {/* Start Button */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
            <span className="text-sm">⚡️</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              {profile.username}
            </span>
            <span className="text-[8px] text-gray-500 uppercase tracking-tighter">
              Level 01 Entity
            </span>
          </div>
        </button>

        <div className="h-8 w-px bg-white/10 mx-2" />

        {/* Window Tabs */}
        <div className="flex items-center gap-2">
           {openWindows.map(id => (
             <button
               key={id}
               onClick={() => onToggleWindow(id)}
               className={`h-9 px-4 rounded-lg flex items-center gap-2 transition-all border ${
                 focusedWindow === id 
                   ? 'bg-white/10 border-white/20 text-white' 
                   : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5'
               }`}
             >
               <span className="text-xs font-bold uppercase tracking-widest">{id}</span>
             </button>
           ))}
        </div>
      </div>

      {/* Clock & Status */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold tracking-widest">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[8px] text-gray-500 font-mono tracking-widest uppercase">
            {currentTime.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] font-bold text-green-500 tracking-widest uppercase">LIVE_LINK</span>
        </div>
      </div>
    </div>
  );
};

export default OSTaskbar;
