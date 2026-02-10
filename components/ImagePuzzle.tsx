'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';

const COLS = 3;
const ROWS = 2;
const TOTAL = COLS * ROWS;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface ImagePuzzleProps {
  imageUrl: string;
  onComplete?: () => void;
}

export function ImagePuzzle({ imageUrl, onComplete }: ImagePuzzleProps) {
  const [order, setOrder] = useState<number[]>(() =>
    shuffle(Array.from({ length: TOTAL }, (_, i) => i))
  );
  const [selected, setSelected] = useState<number | null>(null);

  const solved = useMemo(() => {
    return order.every((val, i) => val === i);
  }, [order]);

  useEffect(() => {
    if (solved && onComplete) onComplete();
  }, [solved, onComplete]);

  if (solved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <p className="font-display text-xl text-romantic-gold-light mb-2">Puzzle complete!</p>
        <p className="text-romantic-lavender/90 text-sm">Ab neeche questions answer karo 💕</p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mt-4 rounded-2xl overflow-hidden border-2 border-romantic-gold/40 max-w-xs mx-auto"
        >
          <img
            src={imageUrl}
            alt="Solved"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </motion.div>
    );
  }

  const handleClick = (index: number) => {
    if (selected === null) {
      setSelected(index);
      return;
    }
    if (selected === index) {
      setSelected(null);
      return;
    }
    setOrder((prev) => {
      const next = [...prev];
      [next[selected], next[index]] = [next[index], next[selected]];
      return next;
    });
    setSelected(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 md:p-6 border border-white/20"
    >
      <p className="text-center text-romantic-gold-light/90 mb-4 text-sm">
        Do tiles pe click karke swap karo — sahi order banao 🧩
      </p>
      <div
        className="grid gap-1 mx-auto rounded-xl overflow-hidden border-2 border-white/20"
        style={{
          width: 'min(280px, 90vw)',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
      >
        {order.map((pieceIndex, slotIndex) => {
          const row = Math.floor(pieceIndex / COLS);
          const col = pieceIndex % COLS;
          const isSelected = selected === slotIndex;
          return (
            <motion.button
              key={slotIndex}
              type="button"
              onClick={() => handleClick(slotIndex)}
              className={`relative overflow-hidden bg-romantic-dusk/50 ${isSelected ? 'ring-2 ring-romantic-gold ring-offset-2 ring-offset-romantic-night' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="absolute inset-0 bg-no-repeat bg-[length:300%_200%]"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundPosition: `${col * -100}% ${row * -100}%`,
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
