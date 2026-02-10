'use client';

import { motion } from 'framer-motion';

interface PuzzleTimerProps {
  secondsLeft: number;
  totalSeconds: number;
  isExpired: boolean;
}

export function PuzzleTimer({ secondsLeft, totalSeconds, isExpired }: PuzzleTimerProps) {
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress = (secondsLeft / totalSeconds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-14 z-40 glass-card border-b border-white/10 backdrop-blur-xl px-4 py-3"
    >
      <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
        <span className="font-romantic text-lg text-romantic-gold-light font-bold">
          ⏱️ Time left
        </span>
        <span
          className={`tabular-nums font-display font-bold text-xl ${
            isExpired ? 'text-red-400' : secondsLeft <= 30 ? 'text-amber-300' : 'text-romantic-gold-light'
          }`}
        >
          {mins}:{String(secs).padStart(2, '0')}
        </span>
      </div>
      <div className="max-w-lg mx-auto mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isExpired ? 'bg-red-400' : 'bg-gradient-to-r from-romantic-rose to-romantic-gold'}`}
          initial={{ width: '100%' }}
          animate={{ width: `${Math.max(0, progress)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
