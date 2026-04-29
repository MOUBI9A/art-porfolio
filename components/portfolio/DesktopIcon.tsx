'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  isActive: boolean;
  isLight?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick, isActive, isLight = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 w-24 border ${
        isActive 
          ? (isLight ? 'bg-black/10 border-black/20 text-black' : 'bg-white/10 border-white/20 text-white')
          : (isLight ? 'bg-transparent border-transparent hover:bg-black/5 hover:border-black/10 text-black/80' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 text-white/80')
      }`}
    >
      <div className="text-3xl filter drop-shadow-lg mb-1">{icon}</div>
      <span className="text-[10px] font-bold text-center leading-tight tracking-tight text-gray-300">
        {label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
