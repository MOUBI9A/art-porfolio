'use client';

import React from 'react';
import { Profile } from '@/lib/types';

interface OSTaskbarProps {
  profile: Profile;
  currentTime: Date;
  openWindows: string[];
  focusedWindow: string;
  onToggleWindow: (id: string) => void;
  isLight?: boolean;
}

const OSTaskbar: React.FC<OSTaskbarProps> = ({ profile, currentTime, openWindows, focusedWindow, onToggleWindow, isLight }) => {
  return (
    <div className={`absolute bottom-0 left-0 right-0 h-14 backdrop-blur-2xl border-t z-[100] flex items-center justify-between px-6 ${
      isLight ? 'bg-white/60 border-black/10' : 'bg-black/60 border-white/10'
    }`}>
      {/* Start Button */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 group text-left">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all border ${
            isLight ? 'bg-black/5 border-black/10 group-hover:bg-black/10' : 'bg-white/10 border-white/10 group-hover:bg-white/20'
          }`}>
            <span className="text-sm">⚡️</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold tracking-widest uppercase ${isLight ? 'text-black' : 'text-white'}`}>
              {profile.username}
            </span>
            <span className="text-[8px] opacity-50 uppercase tracking-tighter">
              Level 01 Entity
            </span>
          </div>
        </button>

        <div className={`h-8 w-px mx-2 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />

        {/* Window Tabs */}
        <div className="flex items-center gap-2">
           {openWindows.map(id => (
             <button
               key={id}
               onClick={() => onToggleWindow(id)}
               className={`h-9 px-4 rounded-lg flex items-center gap-2 transition-all border ${
                 focusedWindow === id 
                   ? (isLight ? 'bg-black/10 border-black/20 text-black' : 'bg-white/10 border-white/20 text-white')
                   : (isLight ? 'bg-transparent border-transparent text-black/50 hover:bg-black/5' : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5')
               }`}
             >
               <span className="text-xs font-bold uppercase tracking-widest">{id}</span>
             </button>
           ))}
        </div>
      </div>

      {/* Clock & Status */}
      <div className={`flex items-center gap-6 ${isLight ? 'text-black' : 'text-white'}`}>
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold tracking-widest">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[8px] opacity-50 font-mono tracking-widest uppercase">
            {currentTime.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
          isLight ? 'bg-green-500/5 border-green-500/10' : 'bg-green-500/10 border-green-500/20'
        }`}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] font-bold text-green-500 tracking-widest uppercase">LIVE_LINK</span>
        </div>
      </div>
    </div>
  );
};

export default OSTaskbar;
