import type { Metadata } from 'next';
import './globals.css';
import { GameProvider } from '@/context/GameContext';
import { Providers } from './providers';

// Farcaster Mini App metadata
function getRootUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_ROOT_URL) {
    return process.env.NEXT_PUBLIC_ROOT_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://lost-in-space-maze.vercel.app';
}

const ROOT_URL = getRootUrl();

export const metadata: Metadata = {
  title: 'Lost in Space Maze',
  description: 'Navigate through cosmic mazes in this futuristic space adventure',
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#0a0e1a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'base:app_id': '6978dc2488e3bac59cf3db9f',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <GameProvider>
          {children}
        </GameProvider>
        </Providers>
      </body>
    </html>
  );
}
