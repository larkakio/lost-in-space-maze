'use client';

import { useState, useEffect } from 'react';
import { FarcasterUser } from '@/types/farcaster.types';

export function useFarcasterSDK() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then(async ({ sdk }) => {
        try {
          const context = await sdk.context;
          setUser(context.user);
        } catch (error) {
          console.error('Farcaster SDK error:', error);
        } finally {
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  }, []);
  
  const openUrl = async (url: string) => {
    try {
      const { sdk } = await import('@farcaster/miniapp-sdk');
      await sdk.actions.openUrl(url);
    } catch {
      window.open(url, '_blank');
    }
  };
  
  const close = async () => {
    try {
      const { sdk } = await import('@farcaster/miniapp-sdk');
      await sdk.actions.close();
    } catch {
      window.close();
    }
  };
  
  return { user, isLoading, openUrl, close };
}
