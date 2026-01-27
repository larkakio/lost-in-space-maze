'use client';

import { useEffect, useRef } from 'react';
import { Maze } from '@/types/game.types';

interface MazeRendererProps {
  maze: Maze;
  playerPosition: { x: number; y: number };
  goalPosition: { x: number; y: number };
}

export function MazeRenderer({ maze, playerPosition, goalPosition }: MazeRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = maze.cellSize;
    const width = maze.width * cellSize;
    const height = maze.height * cellSize;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw outer border (game field boundary)
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.stroke();

    // Draw inner border for better visibility
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.rect(2, 2, width - 4, height - 4);
    ctx.stroke();

    // Draw maze walls
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff88';

    for (let y = 0; y < maze.height; y++) {
      for (let x = 0; x < maze.width; x++) {
        const cell = maze.grid[y][x];
        const px = x * cellSize;
        const py = y * cellSize;

        // Draw walls
        if (cell.walls.top) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + cellSize, py);
          ctx.stroke();
        }
        if (cell.walls.right) {
          ctx.beginPath();
          ctx.moveTo(px + cellSize, py);
          ctx.lineTo(px + cellSize, py + cellSize);
          ctx.stroke();
        }
        if (cell.walls.bottom) {
          ctx.beginPath();
          ctx.moveTo(px, py + cellSize);
          ctx.lineTo(px + cellSize, py + cellSize);
          ctx.stroke();
        }
        if (cell.walls.left) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py + cellSize);
          ctx.stroke();
        }
      }
    }

    // Draw goal (planet)
    const goalX = goalPosition.x * cellSize + cellSize / 2;
    const goalY = goalPosition.y * cellSize + cellSize / 2;
    const goalRadius = cellSize * 0.3;

    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ffff00';
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(goalX, goalY, goalRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw inner glow
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.arc(goalX, goalY, goalRadius * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Draw player (astronaut/spaceship)
    const playerX = playerPosition.x * cellSize + cellSize / 2;
    const playerY = playerPosition.y * cellSize + cellSize / 2;
    const playerSize = cellSize * 0.25;

    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff5500';
    ctx.fillStyle = '#ff5500';
    ctx.beginPath();
    ctx.arc(playerX, playerY, playerSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw player direction indicator
    ctx.fillStyle = '#ff8800';
    ctx.beginPath();
    ctx.arc(playerX, playerY, playerSize * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }, [maze, playerPosition, goalPosition]);

  return (
    <div className="flex items-center justify-center p-2 sm:p-4">
      <div className="relative inline-block max-w-full" style={{ 
        border: '3px solid #00ffff',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.2)',
        padding: '4px',
        background: 'rgba(0, 255, 255, 0.05)',
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        <canvas
          ref={canvasRef}
          className="block max-w-full h-auto"
          style={{ imageRendering: 'pixelated', display: 'block', maxWidth: '100%' }}
        />
      </div>
    </div>
  );
}
