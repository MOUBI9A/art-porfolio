'use client';

import { useEffect, useRef } from 'react';

/**
 * Desktop-only cinematic cursor without pulling Framer Motion into the shared
 * root client graph. Pointer events are coalesced through requestAnimationFrame
 * and touch/coarse-pointer devices never attach mouse listeners.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    cursor.style.opacity = '1';

    let frame: number | null = null;
    let x = -100;
    let y = -100;

    const paint = () => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = null;
    };

    const moveCursor = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame === null) frame = window.requestAnimationFrame(paint);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const selectable = target?.closest('a, button, [data-cursor]') as HTMLElement | null;
      const cursorText = selectable?.getAttribute('data-cursor') ?? '';
      const isHovering = Boolean(selectable);

      cursor.style.width = isHovering ? '80px' : '12px';
      cursor.style.height = isHovering ? '80px' : '12px';
      cursor.style.mixBlendMode = isHovering ? 'difference' : 'normal';
      cursor.style.backgroundColor = isHovering ? '#fff' : 'var(--color-gold)';

      label.textContent = cursorText;
      label.style.opacity = isHovering && cursorText ? '1' : '0';
      label.style.transform = isHovering && cursorText ? 'scale(1)' : 'scale(0.75)';
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed left-0 top-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
      style={{
        width: 12,
        height: 12,
        opacity: 0,
        backgroundColor: 'var(--color-gold)',
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        transition:
          'width 180ms ease, height 180ms ease, background-color 180ms ease, opacity 120ms ease',
        willChange: 'transform, width, height',
      }}
    >
      <span
        ref={labelRef}
        className="text-[10px] font-bold tracking-[0.2em] text-black uppercase"
        style={{
          opacity: 0,
          transform: 'scale(0.75)',
          transition: 'opacity 140ms ease, transform 140ms ease',
        }}
      />
    </div>
  );
}
