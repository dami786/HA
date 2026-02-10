# Dameer ❤️ Savera — 1st Anniversary Website

A romantic, animated anniversary website built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**. Mobile-first, fully responsive.

## Features

- **Hero** — Animated cake, countdown to 11 Feb 2026 12:00 AM, floating hearts
- **Puzzles** — 5 sequential puzzles (multiple choice + text), 3-minute timer, answer collection
- **Gallery** — Image grid with full-screen modal and slider (swipe/keyboard)
- **Surprise** — “Will you be my Valentine?” with heart animation and editable note from Dameer

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Pages

| Route      | Description                    |
|-----------|---------------------------------|
| `/`       | Hero + countdown + cake         |
| `/puzzles`| 5 puzzles, timer, confirmation |
| `/gallery`| Romantic image gallery + modal  |
| `/surprise` | Valentine question + note    |

## Answer storage

Puzzle answers are stored in **localStorage** (key: `dameer-savera-anniversary-answers`) and in React context. No backend required. You can later plug an API to send answers to Dameer.

## Customization

- **Note from Dameer**: Edit on the Surprise page; it’s saved in localStorage.
- **Gallery images**: Update `data/gallery.ts`.
- **Puzzle questions**: Update `data/puzzles.ts`.

---

Made with 💕 for Dameer & Savera’s first anniversary.
