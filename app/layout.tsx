import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GameProvider } from '@/context/GameContext';
import { FarcasterReady } from '@/components/FarcasterReady';

const inter = Inter({ subsets: ['latin'] });

// Farcaster Mini App metadata
const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || 'https://yourdomain.com';

const FC_EMBED = {
  version: '1',
  imageUrl: `${ROOT_URL}/hero-image.png`,
  button: {
    title: 'Play Lost in Space',
    action: {
      type: 'launch_frame',
      name: 'Lost in Space Maze',
      url: ROOT_URL,
      splashImageUrl: `${ROOT_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0e1a',
    },
  },
};

export const metadata: Metadata = {
  title: 'Lost in Space Maze',
  description: 'Navigate through cosmic mazes in this futuristic space adventure',
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#0a0e1a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FarcasterReady />
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
