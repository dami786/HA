'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { PuzzleData } from '@/data/puzzles';

interface QuestionsSectionProps {
  questions: PuzzleData[];
  onAnswer: (puzzleId: number, question: string, answer: string) => void;
  answeredIds: Set<number>;
  disabled?: boolean;
}

export function QuestionsSection({
  questions,
  onAnswer,
  answeredIds,
  disabled,
}: QuestionsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});

  const current = questions[currentIndex];
  const isUnlocked = (id: number) => id === 1 || answeredIds.has(id - 1);

  const handleTextSubmit = (q: PuzzleData) => {
    const text = textAnswers[q.id]?.trim();
    if (!text || disabled) return;
    onAnswer(q.id, q.question, text);
    setTextAnswers((prev) => ({ ...prev, [q.id]: '' }));
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-white text-center mb-2 tracking-heading">
        💌 Tell me about you
      </h2>
      <p className="text-center text-white/90 text-sm mb-6 max-w-md mx-auto font-display">
        Answer at your own pace, from your heart. There are no wrong answers here, only us.
      </p>

      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border ${
              answeredIds.has(q.id)
                ? 'bg-romantic-pink-soft/60 text-romantic-rose border-romantic-pink-soft'
                : isUnlocked(q.id)
                  ? 'glass-card text-romantic-purple border-white/40'
                  : ' text-romantic-purple/40 border-romantic-lavender/50'
            }`}
          >
            {answeredIds.has(q.id) ? '✓' : q.id}
          </div>
        ))}
      </div>

      {current && isUnlocked(current.id) && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl p-6 md:p-8 max-w-lg mx-auto shadow-card-float border border-white/30 bg-gradient-to-br from-[#2b133f]/95 via-[#4c1d95]/95 to-[#7e22ce]/90"
        >
          <p className="font-romantic text-lg md:text-xl text-romantic-rose mb-6 text-center">
            {current.question}
          </p>

          {current.type === 'text' && (
            <div className="space-y-3">
              <textarea
                value={textAnswers[current.id] ?? ''}
                onChange={(e) =>
                  setTextAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))
                }
                placeholder="Write anything you feel here... 💕"
                disabled={disabled}
                rows={4}
                className="input-romantic w-full min-h-[100px] py-4  bg-white/40 border-2 border-romantic-lavender/50 text-black placeholder-romantic-purple/50 outline-none resize-none transition-all duration-200"
              />
              <motion.button
                type="button"
                onClick={() => handleTextSubmit(current)}
                disabled={disabled || !(textAnswers[current.id]?.trim())}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-full btn-romantic-primary disabled:opacity-50 transition-all duration-200"
              >
                Save this memory ❤️
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
