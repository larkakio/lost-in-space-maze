import { Position, Cell, Maze, Direction } from '@/types/game.types';

export function useCollision() {
  const canMove = (
    from: Position,
    direction: Direction,
    maze: Maze
  ): boolean => {
    const { x, y } = from;
    
    // First check if current position is valid
    if (x < 0 || x >= maze.width || y < 0 || y >= maze.height) {
      return false;
    }
    
    const cell = maze.grid[y]?.[x];
    if (!cell) return false;

    // Check boundaries and walls
    switch (direction) {
      case 'up':
        if (y <= 0) return false; // Can't move up from top row
        return !cell.walls.top;
      case 'down':
        if (y >= maze.height - 1) return false; // Can't move down from bottom row
        return !cell.walls.bottom;
      case 'left':
        if (x <= 0) return false; // Can't move left from leftmost column
        return !cell.walls.left;
      case 'right':
        if (x >= maze.width - 1) return false; // Can't move right from rightmost column
        return !cell.walls.right;
      default:
        return false;
    }
  };

  const getNextPosition = (
    from: Position,
    direction: Direction
  ): Position => {
    const { x, y } = from;
    
    switch (direction) {
      case 'up':
        return { x, y: y - 1 };
      case 'down':
        return { x, y: y + 1 };
      case 'left':
        return { x: x - 1, y };
      case 'right':
        return { x: x + 1, y };
      default:
        return { x, y };
    }
  };

  const isGoalReached = (
    position: Position,
    goalPosition: Position
  ): boolean => {
    return position.x === goalPosition.x && position.y === goalPosition.y;
  };

  return {
    canMove,
    getNextPosition,
    isGoalReached,
  };
}
