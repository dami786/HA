'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { QuestionsSection } from '@/components/QuestionsSection';
import { useAnswers } from '@/context/AnswersContext';
import { PUZZLES } from '@/data/puzzles';
import Confetti from '@/components/Confetti';
import { DreamyBackground } from '@/components/DreamyBackground';

export default function QuestionsPage() {
  const router = useRouter();
  const { addAnswer, setSubmitted } = useAnswers();
  const [answeredIds, setAnsweredIds] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = useCallback(
    (puzzleId: number, question: string, answer: string) => {
      addAnswer(puzzleId, question, answer);
      setAnsweredIds((prev) => new Set(prev).add(puzzleId));
    },
    [addAnswer]
  );

  const allAnswered = answeredIds.size === PUZZLES.length;

  useEffect(() => {
    if (allAnswered) {
      setShowConfetti(true);
      setSubmitted(true);
    }
  }, [allAnswered, setSubmitted]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-section-puzzle relative overflow-hidden">
      <DreamyBackground />
      <div className="relative z-10 max-w-story mx-auto px-4">
        {allAnswered ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'ease-in-out', duration: 0.4 }}
            className="text-center rounded-3xl glass-card border border-white/50 p-8 shadow-card-float max-w-lg mx-auto"
          >
            {showConfetti && <Confetti />}
            <p className="font-display text-3xl font-semibold text-romantic-rose mb-4 tracking-heading">
              🎉 All your answers are saved! 🎉
            </p>
            <p className="text-romantic-purple/90 mb-6 font-body">
              Every word you wrote is now safely kept for <strong className="text-romantic-rose">Dameer</strong> ❤️
            </p>
            <motion.button
              onClick={() => router.push('/surprise')}
              className="btn-romantic-primary"
              whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(251, 207, 232, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Go to your surprise 💕
            </motion.button>
          </motion.div>
        ) : (
          <QuestionsSection
            questions={PUZZLES}
            onAnswer={handleAnswer}
            answeredIds={answeredIds}
          />
        )}
      </div>
    </div>
  );
}
