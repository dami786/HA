// Puzzle data: questions and types for the 5 puzzles

export type PuzzleType = 'multiple-choice' | 'drag-drop' | 'memory' | 'text';

export interface PuzzleData {
  id: number;
  question: string;
  type: PuzzleType;
  imagePreview?: string; // placeholder / dummy URL
  choices?: string[];
  correctChoice?: number; // index for multiple choice (any answer accepted for romantic flow)
  memoryPairs?: string[]; // emoji or text pairs for memory game
}

export const PUZZLES: PuzzleData[] = [
  {
    id: 1,
    question: 'How did our first year together feel to you?',
    type: 'text',
  },
  {
    id: 2,
    question: 'What changed in your life this year because of us?',
    type: 'text',
  },
  {
    id: 3,
    question: 'Which moment with me lives in your heart the most?',
    type: 'text',
  },
  {
    id: 4,
    question: 'What do you think we learned together this year?',
    type: 'text',
  },
  {
    id: 5,
    question: 'What promise would you like to make for our future?',
    type: 'text',
  },
];

export const PUZZLE_TIME_LIMIT_SEC = 3 * 60; // 3 minutes

// Image for the puzzle game (3x3 grid) — romantic couple illustration
export const PUZZLE_IMAGE =
  'https://plus.unsplash.com/premium_vector-1682299417339-72e618198187?fm=jpg&q=80&w=900&auto=format&fit=crop';
