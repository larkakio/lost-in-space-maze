'use client';

import { useEffect, useState, useCallback } from 'react';
import { Direction } from '@/types/game.types';

interface UseControlsOptions {
  onMove: (direction: Direction) => void;
  enabled: boolean;
}

export function useControls({ onMove, enabled }: UseControlsOptions) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const minSwipeDistance = 50;

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;
    
    const keyMap: Record<string, Direction> = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
      'w': 'up',
      'W': 'up',
      's': 'down',
      'S': 'down',
      'a': 'left',
      'A': 'left',
      'd': 'right',
      'D': 'right',
    };

    const direction = keyMap[e.key];
    if (direction) {
      e.preventDefault();
      onMove(direction);
    }
  }, [enabled, onMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch/swipe controls
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  }, [enabled]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enabled || !touchStart) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const diffX = touchEnd.x - touchStart.x;
    const diffY = touchEnd.y - touchStart.y;

    // Determine dominant axis
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (Math.abs(diffX) > minSwipeDistance) {
        onMove(diffX > 0 ? 'right' : 'left');
      }
    } else {
      // Vertical swipe
      if (Math.abs(diffY) > minSwipeDistance) {
        onMove(diffY > 0 ? 'down' : 'up');
      }
    }

    setTouchStart(null);
  }, [enabled, touchStart, onMove]);

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return null;
}
