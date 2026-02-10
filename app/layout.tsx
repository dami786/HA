import type { Metadata } from 'next';
import { Playfair_Display, Dancing_Script, Poppins } from 'next/font/google';
import './globals.css';
import { AnswersProvider } from '@/context/AnswersContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dameer ❤️ Savera | 1st Anniversary',
  description: 'A digital love letter — Happy 1st Anniversary',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dancingScript.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen font-body antialiased bg-dreamy-base bg-grain">
        <AnswersProvider>
          <main className="min-h-screen">{children}</main>
        </AnswersProvider>
      </body>
    </html>
  );
}
