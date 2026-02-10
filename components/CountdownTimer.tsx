'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET = new Date('2026-02-11T00:00:00');

function getTimeLeft() {
  const now = new Date();
  if (now >= TARGET) return null;
  const diff = TARGET.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return null;

  if (timeLeft === null) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-6"
      >
        <p className="font-romantic text-2xl md:text-4xl font-bold text-romantic-rose">
          🎉 It&apos;s our anniversary! 🎉
        </p>
        <p className="text-romantic-purple/80 mt-2 font-body">Celebrating our first year together!</p>
      </motion.div>
    );
  }

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center gap-2 md:gap-3 flex-wrap py-6"
    >
      {units.map(({ value, label }, i) => (
        <motion.div
          key={label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.06, type: 'spring', bounce: 0.4 }}
          className="rounded-2xl px-4 py-3 md:px-5 md:py-3.5 min-w-[60px] md:min-w-[72px] text-center border border-white/25 bg-white/8 backdrop-blur-xl shadow-glass-soft"
        >
          <div className="text-xl md:text-3xl font-display font-bold text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/75 font-medium uppercase tracking-wider">
            {label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
