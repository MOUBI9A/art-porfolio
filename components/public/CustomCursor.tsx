'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = target.closest('a, button, [data-cursor]');
      
      if (isSelectable) {
        setIsHovering(true);
        const text = (isSelectable as HTMLElement).getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-0 sm:opacity-100">
      <motion.div
        className="flex items-center justify-center rounded-full bg-white transition-colors duration-300"
        style={{
          width: isHovering ? 80 : 12,
          height: isHovering ? 80 : 12,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: isHovering ? 'difference' : 'normal',
          backgroundColor: isHovering ? '#fff' : 'var(--color-gold)',
        }}
      >
        {isHovering && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-[0.2em] text-black uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
