'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LightRays } from '@/components/LightRays';

const STORAGE_NOTE_KEY = 'dameer-surprise-note';
const DEFAULT_NOTE = `Savera, this year taught me how magical life feels with you. Every moment with you is my favorite place to be. I want to keep choosing you, every single day. I love you. — Dameer`;

export default function SurprisePage() {
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [note, setNote] = useState(DEFAULT_NOTE);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_NOTE_KEY);
      if (saved) setNote(saved);
    }
  }, []);

  const saveNote = () => {
    setIsEditing(false);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_NOTE_KEY, note);
  };

  const handleYesClick = () => {
    setShowMessage(true);
    setHearts((prev) => [
      ...prev,
      ...Array.from({ length: 10 }, (_, i) => ({
        id: prev.length + i,
        x: Math.random() * 160 - 80,
        y: Math.random() * 120 - 60,
      })),
    ]);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-surprise-dark relative overflow-hidden">
      <LightRays />
      {/* Spotlight glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-96 bg-romantic-pink/10 rounded-full blur-3xl pointer-events-none"
        style={{ filter: 'blur(80px)' }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-5xl font-semibold text-romantic-cream mb-8 tracking-heading"
        >
          One more question...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-romantic text-3xl md:text-5xl text-romantic-pink mb-12 drop-shadow-lg"
          style={{ textShadow: '0 0 40px rgba(251, 207, 232, 0.5)' }}
        >
          Will you be my Valentine, Savera?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.button
            type="button"
            onClick={handleYesClick}
            className="btn-romantic-primary text-xl"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            Yes! 💖
          </motion.button>
          <motion.button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="btn-romantic-secondary text-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Maybe later 😊
          </motion.button>
        </motion.div>

        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-4xl md:text-5xl pointer-events-none"
            style={{
              left: `calc(50% + ${h.x}px)`,
              top: `calc(35% + ${h.y}px)`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 2, 1.3],
              opacity: [1, 1, 0],
              y: [0, -40],
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            ❤️
          </motion.span>
        ))}

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-14 p-6 md:p-8 rounded-3xl glass-card border-2 border-romantic-pink-soft/40 text-left"
          >
            <p className="font-romantic text-2xl md:text-3xl text-romantic-pink font-bold mb-6 text-center">
              I knew it! 💕
            </p>
            <div className="relative">
              {isEditing ? (
                <>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="input-romantic w-full min-h-[140px] p-4 rounded-xl bg-white/10 border-2 border-romantic-lavender/50 text-romantic-cream placeholder-romantic-lavender/60 outline-none resize-y"
                    placeholder="Ending note from Dameer..."
                  />
                  <button
                    type="button"
                    onClick={saveNote}
                    className="mt-3 text-romantic-pink hover:underline font-medium"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="font-romantic text-lg text-romantic-cream/95 whitespace-pre-wrap leading-relaxed">
                    {note}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="mt-3 text-romantic-pink hover:underline font-medium"
                  >
                    Edit note
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
