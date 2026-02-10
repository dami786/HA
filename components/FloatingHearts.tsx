'use client';

import React, { useMemo } from 'react';

type HeartSpec = {
  id: number;
  left: string;
  fontSize: number;
  duration: number;
  delay: number;
  alt: boolean;
};

const HEART_CHARS = ['❤', '❤', '❤', '❤', '💗', '💖'];
const HEART_COUNT = 22;

/**
 * Soft rain of hearts floating upward behind content.
 * Uses CSS keyframes: .heart-float / .heart-float-delayed
 */
export function FloatingHearts() {
  const hearts = useMemo<HeartSpec[]>(
    () =>
      Array.from({ length: HEART_COUNT }, (_, i) => {
        const duration = 12 + Math.random() * 12; // 12–24s
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          fontSize: 12 + Math.random() * 24, // 12–36px
          duration,
          delay: -Math.random() * duration, // start at random point in animation
          alt: i % 2 === 0,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className={`absolute text-[${h.fontSize}px] ${
            h.alt ? 'heart-float' : 'heart-float-delayed'
          }`}
          style={{
            left: h.left,
            bottom: '-10vh',
            fontSize: h.fontSize,
            opacity: 0.65,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {HEART_CHARS[h.id % HEART_CHARS.length]}
        </span>
      ))}
    </div>
  );
}
