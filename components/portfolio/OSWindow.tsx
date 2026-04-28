'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OSWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
  className?: string;
}

const OSWindow: React.FC<OSWindowProps> = ({ 
  title, 
  children, 
  onClose, 
  onFocus, 
  isFocused,
  className = "w-[600px] h-[400px]"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      drag
      dragMomentum={false}
      onPointerDown={onFocus}
      className={`absolute top-20 left-1/3 pointer-events-auto flex flex-col rounded-xl border overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        isFocused 
          ? 'border-white/30 bg-black/80 z-50 ring-1 ring-white/10' 
          : 'border-white/10 bg-black/40 z-30 opacity-60'
      } ${className}`}
    >
      {/* Title Bar */}
      <div className={`flex items-center justify-between px-4 py-3 select-none ${isFocused ? 'bg-white/10' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
           <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
           <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300">
             {title}
           </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="hover:bg-red-500/80 w-6 h-6 flex items-center justify-center rounded-lg transition-colors group"
        >
          <span className="text-xs group-hover:text-white text-gray-500">×</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};

export default OSWindow;
