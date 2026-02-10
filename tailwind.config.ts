import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        story: '1200px',
      },
      colors: {
        romantic: {
          blush: '#fce7f3',
          pink: '#fbcfe8',
          'pink-soft': '#f9a8d4',
          rose: '#e11d48',
          'rose-soft': '#fb7185',
          lavender: '#e9d5ff',
          'lavender-deep': '#c4b5fd',
          purple: '#a78bfa',
          cream: '#fffbfc',
          misty: '#fdf2f8',
          'rose-gold': '#b76e79',
          'rose-gold-light': '#fef3c7',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        display: ['var(--font-playfair)', 'serif'],
        romantic: ['var(--font-dancing)', 'cursive'],
        body: ['var(--font-poppins)', 'sans-serif'],
      },
      letterSpacing: {
        heading: '0.02em',
        wide: '0.08em',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        heartbeat: 'heartbeat 1.2s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite alternate',
        'timer-pulse': 'timer-pulse 1s ease-in-out infinite',
        'gradient-drift': 'gradient-drift 25s ease-in-out infinite alternate',
        'float-slow': 'float-slow 18s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) translateX(6px) rotate(2deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-8px) translateX(4px)' },
          '66%': { transform: 'translateY(-4px) translateX(-3px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.15)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%, 28%': { transform: 'scale(1.15)' },
          '21%, 35%': { transform: 'scale(1)' },
        },
        glow: {
          '0%': { opacity: '0.9', filter: 'brightness(0.98)' },
          '100%': { opacity: '1', filter: 'brightness(1.05)' },
        },
        'timer-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        'gradient-drift': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      backgroundImage: {
        'dreamy-gradient':
          'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 20%, #fbcfe8 40%, #e9d5ff 60%, #fce7f3 80%, #fffbfc 100%)',
        'hero-glow':
          'radial-gradient(ellipse 100% 80% at 50% 30%, rgba(251, 207, 232, 0.5) 0%, rgba(233, 213, 255, 0.25) 40%, transparent 70%)',
        'surprise-dark':
          'linear-gradient(180deg, #581c87 0%, #6b21a8 30%, #7e22ce 60%, #4c1d95 100%)',
        'timer-gradient': 'linear-gradient(180deg, #f9a8d4 0%, #e11d48 100%)',
        glass: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 100%)',
      },
      boxShadow: {
        'glass-soft': '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
        'glass-glow': '0 0 48px rgba(251, 207, 232, 0.25)',
        'card-soft': '0 4px 24px rgba(0,0,0,0.06)',
        'card-float': '0 24px 48px rgba(0,0,0,0.08)',
        'card-hover': '0 16px 48px rgba(251, 113, 133, 0.18)',
        romantic: '0 10px 40px -10px rgba(225, 29, 72, 0.2)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
