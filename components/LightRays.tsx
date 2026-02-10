'use client';

import { motion } from 'framer-motion';

const RAY_COUNT = 9;
const RAY_OPACITY = 0.04;

/**
 * Subtle animated light rays overlay — emotional, cinematic.
 * Very low opacity; slow, calm animation.
 */
export function LightRays() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: RAY_COUNT }).map((_, i) => {
        const deg = (i / RAY_COUNT) * 360;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 bottom-1/2 w-[1px] origin-bottom"
            style={{
              height: '80%',
              background: `linear-gradient(to top, transparent 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.08) 55%, transparent 100%)`,
              transform: `translateX(-50%) rotate(${deg}deg)`,
              opacity: RAY_OPACITY,
            }}
            animate={{ opacity: [RAY_OPACITY, RAY_OPACITY * 1.6, RAY_OPACITY] }}
            transition={{
              duration: 8 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
