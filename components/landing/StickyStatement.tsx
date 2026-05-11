'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const statements = [
  "Not just a portfolio.",
  "A living digital archive.",
  "A networked operating system.",
  "Your artifact. Host it."
];

export default function StickyStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {statements.map((text, i) => {
          const start = i / statements.length;
          const end = (i + 1) / statements.length;
          
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 1.1]);
          
          return (
            <motion.h2
              key={i}
              style={{ opacity, scale }}
              className="absolute text-4xl md:text-7xl font-serif font-light text-center px-6 text-white max-w-4xl"
            >
              {text}
            </motion.h2>
          );
        })}
      </div>
    </section>
  );
}
