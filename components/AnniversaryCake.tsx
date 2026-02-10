'use client';

import { motion } from 'framer-motion';

export function AnniversaryCake() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.25, duration: 1.2 }}
      className="relative flex justify-center py-6"
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Plate */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-52 md:w-64 h-2.5 rounded-full bg-gradient-to-b from-romantic-rose-gold-light to-amber-200/80 shadow-lg border border-white/60" />

        {/* Bottom tier */}
        <div className="relative w-44 md:w-56 h-20 md:h-24 rounded-t-[2rem] bg-gradient-to-b from-romantic-blush via-romantic-pink to-romantic-pink-soft shadow-inner border-t-4 border-x-4 border-romantic-cream/80" />

        {/* Middle tier */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-32 md:w-40 h-14 md:h-18 rounded-t-2xl bg-gradient-to-b from-romantic-cream via-romantic-misty to-romantic-blush shadow-inner border-t-4 border-x-4 border-white/70" />

        {/* Top tier */}
        <div className="absolute bottom-28 md:bottom-36 left-1/2 -translate-x-1/2 w-20 md:w-28 h-10 md:h-12 rounded-t-xl bg-gradient-to-b from-white via-romantic-cream to-romantic-blush shadow-inner border-t-4 border-x-4 border-white/80" />

        {/* Candles with animated flames */}
        {[-1, 0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 bottom-[11.5rem] md:bottom-[13.5rem]"
            style={{ transform: `translate(calc(-50% + ${i * 22}px), 0)` }}
          >
            <div className="w-1.5 h-5 md:h-6 bg-amber-50/90 rounded-full mx-auto shadow-inner border border-amber-200/50" />
            <motion.div
              className="w-2.5 h-3 md:w-3 md:h-3.5 mx-auto rounded-full bg-gradient-to-t from-amber-600 via-yellow-300 to-amber-100"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [1, 0.9, 1],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}

        {/* "1" topper */}
        <motion.div
          className="absolute bottom-28 md:bottom-36 left-1/2 -translate-x-1/2 -translate-y-0.5 text-2xl md:text-3xl font-romantic font-bold text-romantic-rose"
          style={{ textShadow: '0 0 16px rgba(249, 168, 212, 0.6)' }}
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          1
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
