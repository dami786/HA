'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingHearts } from '@/components/FloatingHearts';

const SPARKLE = '✨';

/* Bokeh circles - soft, blurred, very low opacity */
function BokehLayer({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 6 : 14;
  const bokeh = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 13 + 5) % 92}%`,
        top: `${(i * 17 + 8) % 88}%`,
        size: (isMobile ? 60 : 80) + (i % 4) * 40,
        duration: 20 + (i % 5) * 2,
        delay: i * 0.8,
        opacity: 0.04 + (i % 3) * 0.025,
      })),
    [count, isMobile]
  );

  return (
    <>
      {bokeh.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -15, -5, 0],
            x: [0, 8, -6, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

/* Sparkles - small, gentle twinkle */
function SparklesLayer({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 5 : 10;
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 15 + 7) % 90}%`,
        top: `${(i * 23 + 11) % 85}%`,
        duration: 4 + (i % 3),
        delay: i * 0.5,
      })),
    [count]
  );

  return (
    <>
      {items.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-sm md:text-base pointer-events-none"
          style={{ left: s.left, top: s.top }}
          animate={{
            opacity: [0.08, 0.22, 0.08],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          {SPARKLE}
        </motion.span>
      ))}
    </>
  );
}

export function DreamyBackground() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden
    >
      <BokehLayer isMobile={mobile} />
      <SparklesLayer isMobile={mobile} />
      <FloatingHearts />
    </div>
  );
}
