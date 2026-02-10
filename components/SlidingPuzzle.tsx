'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const SIZE = 3; // 3x3 grid
const TOTAL = SIZE * SIZE;
const EMPTY = TOTAL - 1; // last index is empty

function shuffleSolvable(board: number[]): number[] {
  const out = [...board];
  let empty = out.indexOf(EMPTY);
  const moves = 50 + Math.floor(Math.random() * 50);
  const dirs = [-1, 1, -SIZE, SIZE]; // left, right, up, down
  for (let i = 0; i < moves; i++) {
    const row = Math.floor(empty / SIZE);
    const col = empty % SIZE;
    const valid: number[] = [];
    if (col > 0) valid.push(-1);
    if (col < SIZE - 1) valid.push(1);
    if (row > 0) valid.push(-SIZE);
    if (row < SIZE - 1) valid.push(SIZE);
    const d = valid[Math.floor(Math.random() * valid.length)];
    const next = empty + d;
    [out[empty], out[next]] = [out[next], out[empty]];
    empty = next;
  }
  return out;
}

interface SlidingPuzzleProps {
  imageUrl: string;
  onComplete?: () => void;
}

export function SlidingPuzzle({ imageUrl, onComplete }: SlidingPuzzleProps) {
  const [board, setBoard] = useState<number[]>(() =>
    shuffleSolvable(Array.from({ length: TOTAL }, (_, i) => i))
  );
  const [showPreview, setShowPreview] = useState(true);
  const [moves, setMoves] = useState(0);

  const emptyIndex = board.indexOf(EMPTY);
  const solved = board.every((val, i) => val === i);

  const move = useCallback(
    (slotIndex: number) => {
      const emptyRow = Math.floor(emptyIndex / SIZE);
      const emptyCol = emptyIndex % SIZE;
      const slotRow = Math.floor(slotIndex / SIZE);
      const slotCol = slotIndex % SIZE;
      const rowDiff = Math.abs(emptyRow - slotRow);
      const colDiff = Math.abs(emptyCol - slotCol);
      if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        setBoard((prev) => {
          const next = [...prev];
          [next[emptyIndex], next[slotIndex]] = [next[slotIndex], next[emptyIndex]];
          return next;
        });
        setMoves((m) => m + 1);
      }
    },
    [emptyIndex]
  );

  useEffect(() => {
    if (solved && onComplete) onComplete();
  }, [solved, onComplete]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (solved) return;
      let newEmpty = emptyIndex;
      if (e.key === 'ArrowLeft' && emptyIndex % SIZE < SIZE - 1) newEmpty = emptyIndex + 1;
      if (e.key === 'ArrowRight' && emptyIndex % SIZE > 0) newEmpty = emptyIndex - 1;
      if (e.key === 'ArrowUp' && emptyIndex + SIZE < TOTAL) newEmpty = emptyIndex + SIZE;
      if (e.key === 'ArrowDown' && emptyIndex - SIZE >= 0) newEmpty = emptyIndex - SIZE;
      if (newEmpty !== emptyIndex) {
        setBoard((prev) => {
          const next = [...prev];
          [next[emptyIndex], next[newEmpty]] = [next[newEmpty], next[emptyIndex]];
          return next;
        });
        setMoves((m) => m + 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [emptyIndex, solved]);

  if (solved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center glass-card rounded-2xl p-6 border border-white/50"
      >
        <p className="font-script text-xl text-romantic-rose mb-1">Puzzle complete! 💕</p>
        <p className="text-romantic-purple/70 text-sm mb-4">Moves: {moves}</p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="rounded-2xl overflow-hidden border-2 border-romantic-pink-soft/50 shadow-card-soft max-w-xs mx-auto"
        >
          <img src={imageUrl} alt="Solved" className="w-full h-auto object-cover" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 md:p-6 glass-card border border-white/50 shadow-glass-soft"
    >
      <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/40"
        >
          {showPreview ? 'Hide tiny preview' : 'Show tiny preview'}
        </button>
        {showPreview && (
          <div className="rounded-xl overflow-hidden border-2 border-romantic-pink-soft/50 w-24 h-24 flex-shrink-0 shadow-card-soft">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <p className="text-center text-white/80 text-sm mb-3">
        Use the arrow buttons or tap a tile next to the empty space to slide pieces into place.
      </p>

      <div
        className="grid gap-1.5 mx-auto rounded-2xl overflow-hidden border-2 border-romantic-lavender/40 bg-romantic-cream/40 p-1.5 shadow-card-soft"
        style={{
          width: 'min(320px, 92vw)',
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          aspectRatio: '1',
        }}
      >
        {board.map((pieceIndex, slotIndex) => {
          if (pieceIndex === EMPTY) {
            return (
              <motion.div
                key="empty"
                layoutId="empty-tile"
                className="rounded-xl bg-romantic-lavender/25 border-2 border-dashed border-romantic-pink/30 flex items-center justify-center min-h-[80px]"
              />
            );
          }
          const row = Math.floor(pieceIndex / SIZE);
          const col = pieceIndex % SIZE;
          return (
            <motion.button
              key={`piece-${pieceIndex}`}
              layout
              type="button"
              onClick={() => move(slotIndex)}
              className="relative overflow-hidden rounded-xl bg-white/50 border border-romantic-pink/20 min-h-[80px] p-0 shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'ease-in-out', duration: 0.2 }}
            >
              <div
                className="absolute inset-0 bg-no-repeat rounded-xl"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                  backgroundPosition: `${col * -100}% ${row * -100}%`,
                }}
              />
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          type="button"
          aria-label="Up"
          onClick={() => { const up = emptyIndex + SIZE; if (up < TOTAL) move(up); }}
          className="w-12 h-12 rounded-xl bg-white/10 text-white text-xl border border-white/40"
        >
          ↑
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-1">
        <button
          type="button"
          aria-label="Left"
          onClick={() => { if (emptyIndex % SIZE < SIZE - 1) move(emptyIndex + 1); }}
          className="w-12 h-12 rounded-xl bg-white/10 text-white text-xl border border-white/40"
        >
          ←
        </button>
        <span className="w-12 h-12 flex items-center justify-center text-white/75 text-sm font-medium">
          {moves}
        </span>
        <button
          type="button"
          aria-label="Right"
          onClick={() => { if (emptyIndex % SIZE > 0) move(emptyIndex - 1); }}
          className="w-12 h-12 rounded-xl bg-white/10 text-white text-xl border border-white/40"
        >
          →
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-1">
        <button
          type="button"
          aria-label="Down"
          onClick={() => { const down = emptyIndex - SIZE; if (down >= 0) move(down); }}
          className="w-12 h-12 rounded-xl bg-white/10 text-white text-xl border border-white/40"
        >
          ↓
        </button>
      </div>
    </motion.div>
  );
}
