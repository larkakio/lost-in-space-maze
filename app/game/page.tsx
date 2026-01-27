'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { GameCanvas } from '@/components/Game/GameCanvas';
import { ParticleBackground } from '@/components/UI/ParticleBackground';

export default function GamePage() {
  const { state, pauseGame, resumeGame, resetGame, endGame } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 'menu') {
      router.push('/');
    }
  }, [state.status, router]);

  const handlePause = () => {
    if (state.status === 'playing') {
      pauseGame();
    } else if (state.status === 'paused') {
      resumeGame();
    }
  };

  const handleQuit = () => {
    resetGame();
    router.push('/');
  };

  if (state.status === 'menu') {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-space-dark">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen">
        <GameCanvas />
        
        {/* Pause button */}
        <button
          onClick={handlePause}
          className="absolute top-16 right-4 z-20 glass-panel rounded-lg p-3 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          {state.status === 'playing' ? '⏸' : '▶'}
        </button>

        {/* Quit button */}
        <button
          onClick={handleQuit}
          className="absolute top-16 left-4 z-20 glass-panel rounded-lg p-3 text-warning-red hover:bg-warning-red/20 transition-colors"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          ✕
        </button>
      </div>

      {/* Victory celebration - brief flash */}
      {state.status === 'victory' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="text-center"
          >
            <h2 className="text-6xl font-display text-neon-green text-glow mb-4">
              🎉 LEVEL COMPLETE! 🎉
            </h2>
            <p className="text-2xl text-neon-cyan">Loading next level...</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
