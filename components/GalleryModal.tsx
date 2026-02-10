'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface GalleryModalProps {
  images: ImageItem[];
  initialIndex: number;
  onClose: () => void;
}

export function GalleryModal({ images, initialIndex, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const current = images[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  const getThumbnailIndices = () => {
    const result: number[] = [];
    let offset = 1;
    while (result.length < 4 && offset < images.length) {
      const nextIndex = (index + offset) % images.length;
      result.push(nextIndex);
      offset += 1;
    }
    return result;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-romantic-purple/20 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full glass-card text-romantic-rose flex items-center justify-center text-xl border border-white/50 hover:scale-110 transition-transform"
        aria-label="Close"
      >
        ❤️
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card text-romantic-rose flex items-center justify-center text-xl border border-white/50 hover:scale-110 transition-transform"
        aria-label="Previous"
      >
        <span className="flex items-center gap-0.5">❤️ ‹</span>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card text-romantic-rose flex items-center justify-center text-xl border border-white/50 hover:scale-110 transition-transform"
        aria-label="Next"
      >
        <span className="flex items-center gap-0.5">› ❤️</span>
      </button>

      <div className="px-16 md:px-24 py-8 max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current?.id}
            src={current?.src}
            alt={current?.alt}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full h-auto max-h-[80vh] object-contain rounded-2xl border border-white/30 shadow-glass-soft"
            draggable={false}
          />
        </AnimatePresence>
        <p className="text-romantic-purple/80 text-center mt-3 text-sm font-medium">
          {index + 1} / {images.length}
        </p>

        {/* Thumbnails: show 4 different images around the current one */}
        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 md:gap-3">
            {getThumbnailIndices().map((thumbIndex) => {
              const thumb = images[thumbIndex];
              if (!thumb) return null;
              const isActive = thumbIndex === index;
              return (
                <motion.button
                  key={thumb.id}
                  type="button"
                  onClick={() => setIndex(thumbIndex)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border ${
                    isActive
                      ? 'border-romantic-rose-soft ring-2 ring-romantic-rose-soft/70'
                      : 'border-white/40'
                  } bg-black/40 shadow-card-soft`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
