'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { PuzzleData } from '@/data/puzzles';

const COUPLE_IMAGE = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop';

interface PuzzleCardProps {
  puzzle: PuzzleData;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export function PuzzleCard({ puzzle, onAnswer, disabled }: PuzzleCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');

  const handleChoice = (choice: string) => {
    if (disabled) return;
    onAnswer(choice);
  };

  const handleTextSubmit = () => {
    const trimmed = textAnswer.trim();
    if (trimmed && !disabled) onAnswer(trimmed);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl overflow-hidden max-w-lg mx-auto border border-white/20 shadow-glass"
    >
      <div className="relative h-44 md:h-52 bg-gradient-to-br from-romantic-twilight/80 to-romantic-plum/60 flex items-center justify-center overflow-hidden">
        <img
          src={COUPLE_IMAGE}
          alt="Couple"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-romantic-night/80 to-transparent" />
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl glass-card text-romantic-gold-light text-sm font-medium border border-romantic-gold/30"
        >
          {showPreview ? 'Hide' : 'Preview'} 🖼️
        </button>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <img
              src={COUPLE_IMAGE}
              alt="Preview"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border-2 border-romantic-gold/30"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-romantic-rose/90 text-white text-xs font-bold border border-white/20">
          Puzzle {puzzle.id}
        </span>
      </div>

      <div className="p-6">
        <p className="font-display text-xl md:text-2xl text-romantic-gold-light mb-5 text-center">
          {puzzle.question}
        </p>

        {puzzle.type === 'multiple-choice' && puzzle.choices && (
          <ul className="space-y-2">
            {puzzle.choices.map((choice, i) => (
              <motion.li
                key={i}
                whileHover={!disabled ? { scale: 1.02, x: 4 } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
              >
                <button
                  type="button"
                  onClick={() => handleChoice(choice)}
                  disabled={disabled}
                  className="w-full text-left px-4 py-3 rounded-xl glass-card border border-white/15 hover:border-romantic-gold/40 text-romantic-cream font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {choice}
                </button>
              </motion.li>
            ))}
          </ul>
        )}

        {puzzle.type === 'text' && (
          <div className="space-y-3">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Apna jawab yahan likho..."
              disabled={disabled}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 focus:border-romantic-gold/50 text-romantic-cream placeholder-romantic-lavender/50 outline-none resize-none"
            />
            <motion.button
              type="button"
              onClick={handleTextSubmit}
              disabled={disabled || !textAnswer.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-romantic-rose to-romantic-plum text-white font-semibold border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer 💌
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
