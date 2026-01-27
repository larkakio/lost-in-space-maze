'use client';

import { useGame } from '@/context/GameContext';

export function HUD() {
  const { state } = useGame();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 glass-panel">
      <div className="flex justify-between items-center text-sm font-display">
        <div className="flex items-center gap-4">
          <div className="text-neon-cyan">
            <span className="text-glow">⏱</span> {formatTime(state.time)}
          </div>
          <div className="text-neon-yellow">
            <span className="text-glow">🏆</span> Level {state.level}
          </div>
          <div className="text-neon-green">
            <span className="text-glow">⭐</span> {state.score}
          </div>
        </div>
        <div className="text-neon-pink">
          <span className="text-glow">📊</span> Moves: {state.movesCount}
        </div>
      </div>
    </div>
  );
}
