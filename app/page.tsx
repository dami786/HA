'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { DreamyBackground } from '@/components/DreamyBackground';
import { LightRays } from '@/components/LightRays';
import { CountdownTimer } from '@/components/CountdownTimer';
import { GALLERY_IMAGES } from '@/data/gallery';
import { GALLERY_VIDEOS } from '@/data/videos';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const FEATURED_COUNT = 8;
const FEATURED_VIDEOS = 3;

export default function StoryPage() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [typedName, setTypedName] = useState('');
  const fullName = 'Dameer ❤️ Savera';

  useEffect(() => {
    // Typing effect for the names under "Happy 1st Anniversary"
    let charIndex = 0;
    setTypedName('');

    const typingInterval = setInterval(() => {
      charIndex += 1;
      setTypedName(fullName.slice(0, charIndex));
      if (charIndex >= fullName.length) {
        clearInterval(typingInterval);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, [fullName]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 40; // pixels per second

    const tick = (now: number) => {
      const slider = sliderRef.current;
      if (!slider) return;

      const deltaSeconds = (now - lastTime) / 1000;
      lastTime = now;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (maxScrollLeft <= 0) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      let nextLeft = slider.scrollLeft + speed * deltaSeconds;

      if (nextLeft >= maxScrollLeft) {
        nextLeft = 0;
      }

      slider.scrollLeft = nextLeft;
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden snap-y-mandatory">
      <DreamyBackground />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1. HERO — Love Begins */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative z-10 min-h-screen pt-24 pb-16 px-4 flex flex-col justify-center snap-start bg-gradient-to-b from-white/10 via-transparent to-transparent"
      >
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative z-10 max-w-story mx-auto w-full text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl mx-auto"
          >
            <motion.p
              variants={item}
              className="font-romantic italic text-2xl md:text-3xl text-white/90 mb-3 tracking-wide"
            >
              Our first chapter
            </motion.p>
            <motion.h1
              variants={item}
              className="font-romantic text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-heading"
            >
              Happy 1st Anniversary
            </motion.h1>
            <motion.p
              variants={item}
              className="font-romantic italic text-3xl md:text-5xl text-white/95 mb-2"
            >
              <span className="border-r-2 border-white/80 pr-1 animate-[typingCaret_0.9s_steps(1,end)_infinite]">
                {typedName}
              </span>
            </motion.p>
            <motion.p variants={item} className="text-white/80 text-sm md:text-base mb-8">
              11 Feb 2025 → 11 Feb 2026
            </motion.p>
            <motion.p
              variants={item}
              className="mt-2 font-romantic italic text-lg md:text-xl text-white/90 max-w-xl mx-auto"
            >
              Thank you for being my safe place, my softness, my home. I&apos;m so proud to do life with
              you, one little memory at a time.
            </motion.p>
            <motion.div variants={item} className="mt-10">
              <CountdownTimer />
            </motion.div>
            <motion.div variants={item} className="mt-12">
              <Link href="/puzzles">
                <motion.span
                  className="btn-romantic-primary"
                  whileHover={{ scale: 1.02, boxShadow: '0 16px 48px rgba(251, 113, 133, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'ease-in-out' }}
                >
                  Begin Our Love Journey 💕
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 2. PUZZLE PLAY — link to full page */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="puzzle-play"
        className="relative z-10 min-h-[80vh] py-16 px-4 flex flex-col justify-center snap-start bg-gradient-to-b from-[#1b0c30]/80 via-transparent to-transparent"
      >
        <div className="max-w-story mx-auto w-full text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-romantic text-3xl md:text-4xl font-semibold text-white mb-4 tracking-heading"
          >
            Interactive Love Game
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/85 font-display text-lg mb-10 max-w-xl mx-auto"
          >
            Just tap the button below and I&apos;ll ask you a few soft questions, one by one — each with a space to write from your heart and save your answers.
          </motion.p>
          <Link href="/questions">
            <motion.span
              className="btn-romantic-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start the love questions →
            </motion.span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 3. GALLERY — Memory Wall */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="gallery"
        className="relative z-10 min-h-[80vh] py-16 px-4 flex flex-col justify-center snap-start"
      >
        <div className="max-w-story mx-auto w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full border border-white/20 rounded-3xl px-6 md:px-10 py-10 shadow-card-float bg-black/10"
          >
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-romantic text-3xl md:text-4xl font-semibold text-center text-white mb-3 tracking-heading"
            >
              Our little memory wall
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-white/85 font-display text-sm md:text-base mb-8 max-w-xl mx-auto"
            >
              Just a few peeks from our story — tiny frozen frames of laughs, quiet moments, and everything
              in between.
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              {GALLERY_IMAGES.slice(0, FEATURED_COUNT).map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden glass-card border border-white/40 shadow-card-soft"
                >
                  <Link href="/gallery">
                    <div
                      className="relative bg-romantic-lavender/20 aspect-[4/3]"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {GALLERY_IMAGES.length > FEATURED_COUNT && (
              <div className="mt-4">
                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-romantic text-2xl text-center text-white mb-3"
                >
                  And a little slider of more moments
                </motion.h3>
                <div className="relative">
                  <div
                    ref={sliderRef}
                    className="flex gap-3 overflow-x-auto pb-2 auto-slider"
                  >
                    {GALLERY_IMAGES.slice(FEATURED_COUNT).map((img) => (
                      <Link key={img.id} href="/gallery">
                        <div className="min-w-[160px] md:min-w-[200px] rounded-2xl overflow-hidden glass-card border border-white/40 shadow-card-soft flex-shrink-0">
                          <div className="relative aspect-[4/3] bg-romantic-lavender/20">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                              sizes="160px"
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="text-center">
              <Link href="/gallery">
                <motion.span
                  className="btn-romantic-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Open full gallery of us →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 4. VIDEO SECTION — Your own videos */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="video"
        className="relative z-10 min-h-[70vh] py-16 px-4 flex flex-col justify-center snap-start bg-gradient-to-b from-[#140720]/85 via-[#1c0c30]/80 to-transparent"
      >
        <div className="max-w-story mx-auto w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full border border-white/20 rounded-3xl px-6 md:px-10 py-10 shadow-card-float bg-black/20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-romantic text-3xl md:text-4xl font-semibold text-center text-white mb-3 tracking-heading"
            >
              Tiny video memories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-white/85 font-display text-sm md:text-base mb-8 max-w-xl mx-auto"
            >
              Straight from your own gallery — little clips that feel like us.
            </motion.p>

            <div className="grid gap-4 md:gap-6 md:grid-cols-3 mb-8">
              {GALLERY_VIDEOS.slice(0, FEATURED_VIDEOS).map((video, index) => (
                <div
                  key={video.id}
                  className="rounded-2xl overflow-hidden glass-card border border-white/30 shadow-card-soft bg-black/60"
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
                </div>
              ))}
            </div>

            <div className="text-center mt-2">
              <Link href="/videos">
                <motion.span
                  className="btn-romantic-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore all videos →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 5. BEAUTIFUL MESSAGES — Little love notes */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="messages"
        className="relative z-10 min-h-[80vh] py-16 px-4 flex flex-col justify-center snap-start bg-gradient-to-b from-[#13071f]/85 via-transparent to-transparent"
      >
        <div className="max-w-story mx-auto w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full border border-white/20 rounded-3xl px-6 md:px-10 py-10 shadow-card-float bg-black/10"
          >
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-romantic text-3xl md:text-4xl font-semibold text-center text-white mb-3 tracking-heading"
            >
              Little love notes for you
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-white/85 font-display text-sm md:text-base mb-8 max-w-xl mx-auto"
            >
              Just a handful of tiny sentences my heart keeps whispering about you, over and over again.
            </motion.p>

            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/35 px-4 py-4 shadow-card-soft text-left"
              >
                <p className="font-romantic italic text-xl md:text-2xl text-white mb-1 tracking-wide">
                  You are my favorite place.
                </p>
                <p className="text-white/85 text-xs md:text-sm font-display italic">
                  No matter where we are, if it&apos;s with you, it feels like home.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/35 px-4 py-4 shadow-card-soft text-left"
              >
                <p className="font-romantic italic text-xl md:text-2xl text-white mb-1 tracking-wide">
                  My jaan, my baby, my little munna.
                </p>
                <p className="text-white/85 text-xs md:text-sm font-display italic">
                  You are my tiny piece of heart and somehow still my whole universe.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/35 px-4 py-4 shadow-card-soft text-left"
              >
                <p className="font-romantic italic text-xl md:text-2xl text-white mb-1 tracking-wide">
                  Madam G, my forever soft corner.
                </p>
                <p className="text-white/85 text-xs md:text-sm font-display italic">
                  Just the thought of you makes even the heaviest day feel a little lighter.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/35 px-4 py-4 shadow-card-soft text-left"
              >
                <p className="font-romantic italic text-xl md:text-2xl text-white mb-1 tracking-wide">
                  You are my calm and my chaos.
                </p>
                <p className="text-white/85 text-xs md:text-sm font-display italic">
                  The person I want to overthink with, laugh with, cry with, and grow old with.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/35 px-4 py-4 shadow-card-soft text-left"
              >
                <p className="font-romantic italic text-xl md:text-2xl text-white mb-1 tracking-wide">
                  Every version of you is my favorite.
                </p>
                <p className="text-white/85 text-xs md:text-sm font-display italic">
                  Happy, sleepy, annoyed, overthinking, excited — I want them all, with me, always.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/35 px-4 py-4 shadow-card-soft text-left"
              >
                <p className="font-romantic italic text-xl md:text-2xl text-white mb-1 tracking-wide">
                  You are my safest “goodnight”.
                </p>
                <p className="text-white/85 text-xs md:text-sm font-display italic">
                  And my cutest “good morning”, even on days we can&apos;t say it out loud.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/35 px-4 py-4 shadow-card-soft text-left md:col-span-2"
              >
                <p className="font-romantic italic text-xl md:text-2xl text-white mb-1 tracking-wide">
                  Umaaah, meri jaan — thank you for choosing me.
                </p>
                <p className="text-white/85 text-xs md:text-sm font-display italic">
                  I don&apos;t know what the future looks like, but I know I want every soft, silly, beautiful
                  chapter to keep starting with you.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 6. SONGS — Romantic playlist */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="songs"
        className="relative z-10 min-h-[80vh] py-16 px-4 flex flex-col justify-center snap-start bg-gradient-to-b from-[#090312]/90 via-[#120825]/85 to-[#05020a]"
      >
        <div className="max-w-story mx-auto w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full border border-white/20 rounded-3xl px-6 md:px-10 py-10 shadow-card-float bg-black/20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-romantic text-3xl md:text-4xl font-semibold text-center text-white mb-3 tracking-heading"
            >
              Songs that feel like us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-white/85 font-display text-sm md:text-base mb-8 max-w-xl mx-auto"
            >
              A tiny playlist for you — some Hindi, some English, all a little bit like how my heart
              sounds when I think of you.
            </motion.p>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/30 p-4 shadow-card-soft flex flex-col gap-3"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/20 pb-[45%] md:pb-[40%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/lIEsrnKnjxk"
                    title="Chalo Door Kahin - Samar Jafri"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-romantic text-lg md:text-xl text-white">Chalo Door Kahin</p>
                  <p className="text-white/80 text-xs md:text-sm font-display">Samar Jafri</p>
                  <p className="text-white/65 text-[11px] md:text-xs font-display">
                    For the days we just want to run away together, somewhere soft and quiet.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/30 p-4 shadow-card-soft flex flex-col gap-3"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/20 pb-[45%] md:pb-[40%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/g6fnFALEseI"
                    title="Kesariya"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-romantic text-lg md:text-xl text-white">Kesariya</p>
                  <p className="text-white/80 text-xs md:text-sm font-display">Arijit Singh</p>
                  <p className="text-white/65 text-[11px] md:text-xs font-display">
                    The classic filmy kind of love — dramatic, glowing, completely you.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/30 p-4 shadow-card-soft flex flex-col gap-3"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/20 pb-[45%] md:pb-[40%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/CsNS3jaC338"
                    title="Tujhe Kitna Chahne Lage"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-romantic text-lg md:text-xl text-white">Tujhe Kitna Chahne Lage</p>
                  <p className="text-white/80 text-xs md:text-sm font-display">Arijit Singh</p>
                  <p className="text-white/65 text-[11px] md:text-xs font-display">
                    For the overthinking, missing-you days — the &ldquo;I love you more than I can say&rdquo;
                    song.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/30 p-4 shadow-card-soft flex flex-col gap-3"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/20 pb-[45%] md:pb-[40%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/an4ySOlsUMY"
                    title="How Long Will I Love You"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-romantic text-lg md:text-xl text-white">How Long Will I Love You</p>
                  <p className="text-white/80 text-xs md:text-sm font-display">Ellie Goulding</p>
                  <p className="text-white/65 text-[11px] md:text-xs font-display">
                    A soft promise in English — as long as the stars are above you, that&apos;s how long.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/6 border border-white/30 p-4 shadow-card-soft flex flex-col gap-3 md:col-span-2"
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/20 pb-[45%] md:pb-[40%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/myXqGeknJOk"
                    title="English Rose"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-romantic text-lg md:text-xl text-white">English Rose</p>
                  <p className="text-white/80 text-xs md:text-sm font-display">Ed Sheeran</p>
                  <p className="text-white/65 text-[11px] md:text-xs font-display">
                    For my little princess — soft, simple, and exactly the kind of gentle love you deserve.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
