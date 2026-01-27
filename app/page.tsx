'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/UI/Button';
import { Modal } from '@/components/UI/Modal';
import { ParticleBackground } from '@/components/UI/ParticleBackground';
import Link from 'next/link';

export default function Home() {
  const { state, startGame, updateSettings } = useGame();
  const router = useRouter();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Redirect to game page when game starts
  useEffect(() => {
    if (state.status === 'playing') {
      router.push('/game');
    }
  }, [state.status, router]);

  const handleStartGame = () => {
    startGame();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-display text-neon-cyan text-glow mb-4">
            LOST IN SPACE
          </h1>
          <h2 className="text-3xl md:text-5xl font-display text-neon-green text-glow mb-2">
            MAZE
          </h2>
          <p className="text-xl text-neon-yellow mt-4">
            Navigate the cosmic labyrinth
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <Button onClick={handleStartGame} variant="primary" className="w-full">
            ▶ START MISSION
          </Button>
          
          <Link href="/leaderboard">
            <Button variant="secondary" className="w-full">
              📊 LEADERBOARD
            </Button>
          </Link>
          
          <Button 
            onClick={() => setShowHowToPlay(true)} 
            variant="secondary" 
            className="w-full"
          >
            ℹ HOW TO PLAY
          </Button>
          
          <Button 
            onClick={() => setShowSettings(true)} 
            variant="secondary" 
            className="w-full"
          >
            ⚙ SETTINGS
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 glass-panel rounded-lg p-4 text-center"
        >
          <div className="flex gap-6 justify-center text-sm">
            <div className="text-neon-cyan">
              🪐 Level: {state.level}
            </div>
            <div className="text-neon-yellow">
              ⭐ High Score: {state.highScore}
            </div>
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        title="How to Play"
      >
        <div className="space-y-4 text-sm">
          <p className="text-neon-cyan">Navigate through the neon maze to reach the golden planet!</p>
          <div>
            <h3 className="font-bold text-neon-green mb-2">Controls:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li><strong>Mobile:</strong> Swipe in any direction to move</li>
              <li><strong>Desktop:</strong> Use arrow keys or WASD</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-neon-yellow mb-2">Objective:</h3>
            <p className="text-gray-300">
              Reach the yellow planet at the end of each maze to advance to the next level.
              Complete levels faster with fewer moves for a higher score!
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={() => setShowHowToPlay(false)} variant="primary" className="w-full">
            Got it!
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-neon-cyan mb-2">
              Difficulty
            </label>
            <select
              value={state.difficulty}
              onChange={(e) => updateSettings({ difficulty: e.target.value as any })}
              className="w-full bg-space-medium border border-neon-green rounded-lg p-2 text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-neon-cyan">
              Sound Effects
            </label>
            <input
              type="checkbox"
              checked={state.soundEnabled}
              onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-neon-cyan">
              Music
            </label>
            <input
              type="checkbox"
              checked={state.musicEnabled}
              onChange={(e) => updateSettings({ musicEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={() => setShowSettings(false)} variant="primary" className="w-full">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}
