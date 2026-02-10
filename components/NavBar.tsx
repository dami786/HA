'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/puzzles', label: 'Puzzle' },
  { href: '/questions', label: 'Questions' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/surprise', label: 'Surprise' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/50 backdrop-blur-glass"
    >
      <div className="max-w-story mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-romantic text-xl md:text-2xl font-bold text-romantic-rose hover:text-romantic-rose-soft transition-colors"
        >
          Dameer ❤️ Savera
        </Link>
        <ul className="flex gap-1 md:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-colors font-body ${
                    isActive ? 'text-romantic-rose' : 'text-romantic-purple/80 hover:text-romantic-rose'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-romantic-pink/25 border border-romantic-pink-soft/40 -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
