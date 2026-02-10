'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface PuzzleAnswer {
  puzzleId: number;
  question: string;
  answer: string;
  answeredAt: string;
}

interface AnswersContextType {
  answers: PuzzleAnswer[];
  addAnswer: (puzzleId: number, question: string, answer: string) => void;
  clearAnswers: () => void;
  getAnswersForDameer: () => PuzzleAnswer[];
  isSubmitted: boolean;
  setSubmitted: (v: boolean) => void;
}

const STORAGE_KEY = 'dameer-savera-anniversary-answers';

const AnswersContext = createContext<AnswersContextType | undefined>(undefined);

export function AnswersProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<PuzzleAnswer[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isSubmitted, setSubmittedState] = useState(false);

  const persist = useCallback((newAnswers: PuzzleAnswer[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
    }
  }, []);

  const addAnswer = useCallback(
    (puzzleId: number, question: string, answer: string) => {
      setAnswers((prev) => {
        const filtered = prev.filter((a) => a.puzzleId !== puzzleId);
        const updated = [
          ...filtered,
          { puzzleId, question, answer, answeredAt: new Date().toISOString() },
        ].sort((a, b) => a.puzzleId - b.puzzleId);
        persist(updated);
        return updated;
      });
    },
    [persist]
  );

  const clearAnswers = useCallback(() => {
    setAnswers([]);
    setSubmittedState(false);
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getAnswersForDameer = useCallback(() => [...answers], [answers]);

  const setSubmitted = useCallback((v: boolean) => {
    setSubmittedState(v);
  }, []);

  return (
    <AnswersContext.Provider
      value={{
        answers,
        addAnswer,
        clearAnswers,
        getAnswersForDameer,
        isSubmitted,
        setSubmitted,
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
}

export function useAnswers() {
  const ctx = useContext(AnswersContext);
  if (!ctx) throw new Error('useAnswers must be used within AnswersProvider');
  return ctx;
}
