'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidingPuzzle } from '@/components/SlidingPuzzle';
import { PuzzleHeartTimer } from '@/components/PuzzleHeartTimer';
import { DreamyBackground } from '@/components/DreamyBackground';
import { PUZZLE_IMAGE, PUZZLE_TIME_LIMIT_SEC } from '@/data/puzzles';

export default function PuzzlesPage() {
  const [solved, setSolved] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(PUZZLE_TIME_LIMIT_SEC);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsExpired(true);
      return;
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-section-puzzle relative overflow-hidden">
      <DreamyBackground />
      <div className="max-w-story mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-semibold text-center text-romantic-rose mb-8 tracking-heading"
        >
          Interactive Love Game
        </motion.h1>

        {/* Desktop: Left = Board + Timer, Right = Preview + Teaser */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Puzzle board */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-2 md:order-1"
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <PuzzleHeartTimer
                secondsLeft={secondsLeft}
                totalSeconds={PUZZLE_TIME_LIMIT_SEC}
                isExpired={isExpired}
              />
            </div>
            <SlidingPuzzle imageUrl={PUZZLE_IMAGE} onComplete={() => setSolved(true)} />
            {solved && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-8"
              >
                <Link href="/questions">
                  <motion.span
                    className="btn-romantic-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Tell me about you 💕
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Preview card (desktop) / collapsible (mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-1 md:order-2"
          >
            <div className="rounded-3xl glass-card p-6 border border-white/60 shadow-card-float md:sticky md:top-24">
              <p className="font-display text-lg font-semibold text-romantic-rose mb-3 tracking-heading">
                Preview of the puzzle 💞
              </p>
              <div className="rounded-full overflow-hidden border-2 border-romantic-pink-soft/60 shadow-card-soft w-40 h-40 md:w-48 md:h-48 mx-auto bg-romantic-misty/40">
                <img
                  src={PUZZLE_IMAGE}
                  alt="Cartoon couple preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-display text-romantic-cream/90 text-sm mt-4 text-center">
                These tiles will shuffle into little squares. Bring them back together until the picture
                looks just like this.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
