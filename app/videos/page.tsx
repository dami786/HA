'use client';

import { motion } from 'framer-motion';
import { GALLERY_VIDEOS } from '@/data/videos';
import { DreamyBackground } from '@/components/DreamyBackground';

export default function VideosPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-section-gallery relative overflow-hidden">
      <DreamyBackground />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-story mx-auto text-center mb-10"
      >
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-romantic-rose mb-2 tracking-heading">
          Our Little Video World
        </h1>
        <p className="font-body text-romantic-purple/80">
          All the tiny moving moments — tap any clip, they&apos;re already playing just for you.
        </p>
      </motion.div>

      <div className="relative z-10 max-w-story mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {GALLERY_VIDEOS.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: video.id * 0.04, ease: 'easeOut' }}
            className="rounded-2xl overflow-hidden glass-card border border-white/50 shadow-card-soft bg-black/60"
          >
            <div className="relative w-full pb-[56.25%]">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

