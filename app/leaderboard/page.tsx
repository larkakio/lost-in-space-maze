'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/UI/Button';
import { ParticleBackground } from '@/components/UI/ParticleBackground';

export default function LeaderboardPage() {
  const { state } = useGame();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="text-4xl font-display text-neon-cyan text-glow mb-8 text-center">
            LEADERBOARD
          </h1>

          <div className="glass-panel rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-space-dark rounded-lg">
                <div>
                  <div className="text-neon-yellow font-bold">High Score</div>
                  <div className="text-gray-400 text-sm">Your best performance</div>
                </div>
                <div className="text-2xl font-display text-neon-green">
                  {state.highScore}
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-space-dark rounded-lg">
                <div>
                  <div className="text-neon-cyan font-bold">Current Level</div>
                  <div className="text-gray-400 text-sm">Progress</div>
                </div>
                <div className="text-2xl font-display text-neon-cyan">
                  {state.level}
                </div>
              </div>
            </div>
          </div>

          <Link href="/" className="block">
            <Button variant="primary" className="w-full">
              ← Back to Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
