'use client';

import { motion } from 'framer-motion';

interface PuzzleHeartTimerProps {
  secondsLeft: number;
  totalSeconds: number;
  isExpired: boolean;
}

export function PuzzleHeartTimer({ secondsLeft, totalSeconds, isExpired }: PuzzleHeartTimerProps) {
  const progress = Math.max(0, (secondsLeft / totalSeconds) * 100);
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const circumference = 2 * Math.PI * 15.916;
  const offset = circumference * (1 - progress / 100);
  const isLow = secondsLeft <= 30 && !isExpired;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        className="relative w-24 h-24"
        animate={isLow ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            fill="none"
            stroke="rgba(249, 168, 212, 0.2)"
            strokeWidth="3"
            d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832"
          />
          <motion.path
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-sm font-display font-bold tabular-nums ${
            isExpired ? 'text-romantic-rose' : isLow ? 'text-romantic-rose-soft' : 'text-romantic-purple'
          }`}
        >
          {mins}:{String(secs).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="text-xs text-romantic-purple/70 font-body font-medium">Time left</span>
    </motion.div>
  );
}
