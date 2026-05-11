'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OSWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
  isLight?: boolean;
  className?: string;
}

const OSWindow: React.FC<OSWindowProps> = ({ 
  title, 
  children, 
  onClose, 
  onFocus, 
  isFocused,
  isLight,
  className = "w-[600px] h-[400px]"
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileStyles = isMobile 
    ? "top-4 left-4 right-4 bottom-20 !w-auto !h-auto" 
    : `top-20 left-1/3 ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      drag={!isMobile}
      dragMomentum={false}
      onPointerDown={onFocus}
      className={`absolute pointer-events-auto flex flex-col rounded-xl border overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        isFocused 
          ? (isLight ? 'border-black/30 bg-white/90 z-50 ring-1 ring-black/10' : 'border-white/30 bg-black/80 z-50 ring-1 ring-white/10')
          : (isLight ? 'border-black/10 bg-white/40 z-30 opacity-60' : 'border-white/10 bg-black/40 z-30 opacity-60')
      } ${mobileStyles}`}
    >
      {/* Title Bar */}
      <div className={`flex items-center justify-between px-4 py-3 select-none ${isFocused ? 'bg-white/10' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
           <div className={`w-2.5 h-2.5 rounded-full ${isLight ? 'bg-black/20' : 'bg-white/20'}`} />
           <span className={`text-[10px] font-bold tracking-widest uppercase truncate max-w-[150px] sm:max-w-none ${isLight ? 'text-black/40' : 'text-white/40'}`}>
             {title}
           </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`hover:bg-red-500/80 w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center rounded-lg transition-colors group ${isLight ? 'bg-black/5' : 'bg-white/5'}`}
        >
          <span className={`text-sm sm:text-xs group-hover:text-white ${isLight ? 'text-black/50' : 'text-white/50'}`}>×</span>
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
