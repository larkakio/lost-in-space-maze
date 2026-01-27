import type { Metadata } from 'next';
import './globals.css';
import { GameProvider } from '@/context/GameContext';
import { FarcasterReady } from '@/components/FarcasterReady';

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
  return 'https://yourdomain.com';
}

const ROOT_URL = getRootUrl();

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
      <body>
        <FarcasterReady />
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
