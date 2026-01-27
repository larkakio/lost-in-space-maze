'use client';

import { useGame } from '@/context/GameContext';
import { useCollision } from '@/hooks/useCollision';
import { useControls } from '@/hooks/useControls';
import { Direction } from '@/types/game.types';
import { MazeRenderer } from './MazeRenderer';
import { HUD } from './HUD';

export function GameCanvas() {
  const { state, dispatch, endGame, levelUp } = useGame();
  const { canMove, getNextPosition, isGoalReached } = useCollision();

  const handleMove = (direction: Direction) => {
    if (!state.maze || state.status !== 'playing') return;

    // Validate current position is within bounds
    const { x, y } = state.player.position;
    if (x < 0 || x >= state.maze.width || y < 0 || y >= state.maze.height) {
      // Reset to start if somehow out of bounds
      dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          position: { ...state.maze.startCell },
          direction: 'right',
          isMoving: false,
        },
      });
      return;
    }

    const canMoveInDirection = canMove(state.player.position, direction, state.maze);
    
    if (canMoveInDirection) {
      const nextPosition = getNextPosition(state.player.position, direction);
      
      // Double-check next position is within bounds
      if (nextPosition.x < 0 || nextPosition.x >= state.maze.width || 
          nextPosition.y < 0 || nextPosition.y >= state.maze.height) {
        return; // Don't move if out of bounds
      }
      
      dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          position: nextPosition,
          direction,
          isMoving: true,
        },
      });

      // Check if goal reached
      if (isGoalReached(nextPosition, state.maze.endCell)) {
        // Update score based on time and moves
        const timeBonus = Math.max(0, 1000 - state.time * 10);
        const moveBonus = Math.max(0, 500 - state.movesCount * 5);
        const levelBonus = state.level * 100;
        const newScore = state.score + timeBonus + moveBonus + levelBonus;
        
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { score: newScore },
        });
        
        setTimeout(() => {
          levelUp();
        }, 800);
      }
    }
  };

  useControls({
    onMove: handleMove,
    enabled: state.status === 'playing',
  });

  if (!state.maze) return null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <HUD />
      <div className="flex-1 w-full flex items-center justify-center px-2 sm:px-4 pt-32 sm:pt-8 pb-4 overflow-auto">
        <div className="w-full max-w-full flex justify-center">
          <MazeRenderer
            maze={state.maze}
            playerPosition={state.player.position}
            goalPosition={state.maze.endCell}
          />
        </div>
      </div>
      {state.status === 'paused' && (
        <div className="absolute inset-0 flex items-center justify-center glass-panel">
          <div className="text-center">
            <h2 className="text-3xl font-display text-neon-cyan text-glow mb-4">PAUSED</h2>
            <p className="text-neon-green">Tap to resume</p>
          </div>
        </div>
      )}
    </div>
  );
}
