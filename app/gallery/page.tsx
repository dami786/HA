'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GalleryModal } from '@/components/GalleryModal';
import { GALLERY_IMAGES } from '@/data/gallery';
import { DreamyBackground } from '@/components/DreamyBackground';

/* Masonry-style: mixed sizes via aspect ratio classes */
const aspectClasses = [
  'aspect-[4/5]',   // tall
  'aspect-square',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[5/4]',  // wide
  'aspect-[4/3]',
];

export default function GalleryPage() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-section-gallery relative overflow-hidden">
      <DreamyBackground />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-story mx-auto text-center mb-14"
      >
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-romantic-rose mb-2 tracking-heading">
          Memory Wall
        </h1>
        <p className="font-body text-romantic-purple/80">
          Click any image — swipe or use hearts to navigate 💕
        </p>
      </motion.div>

      <div className="relative z-10 max-w-story mx-auto columns-2 md:columns-3 gap-4 space-y-4">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, ease: 'easeOut' }}
            onClick={() => setModalIndex(i)}
            className={`relative w-full overflow-hidden rounded-2xl glass-card border border-white/60 shadow-card-soft break-inside-avoid ${aspectClasses[i % aspectClasses.length]}`}
            whileHover={{ scale: 1.02, boxShadow: '0 16px 48px rgba(251, 113, 133, 0.18)' }}
          
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <GalleryModal
            images={GALLERY_IMAGES}
            initialIndex={modalIndex}
            onClose={() => setModalIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
