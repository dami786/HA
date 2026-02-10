'use client';

import { useMemo } from 'react';

const COUNT = 25;
const SYMBOLS = ['✨', '💕', '🌸', '💫', '🩷', '✨', '💗', '🌸'];

export function ParticlesBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 7 + 3) % 100}%`,
        delay: `${(i * 0.8) % 15}s`,
        duration: 18 + (i % 5),
        symbol: SYMBOLS[i % SYMBOLS.length],
        size: 12 + (i % 3) * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute opacity-40 animate-particle-float"
          style={{
            left: p.left,
            bottom: '-20px',
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
