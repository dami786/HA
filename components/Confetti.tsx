'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#e11d48', '#f9a8d4', '#a78bfa', '#fce7f3', '#e9d5ff'];
const COUNT = 100;

export default function Confetti() {
  const [pieces, setPieces] = useState<
    Array<{ id: number; x: number; color: string; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.6,
        duration: 2.2 + Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-0 w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: '100vh',
            x: p.x * 25,
            rotate: 720,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
