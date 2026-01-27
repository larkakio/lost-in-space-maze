import { Cell, Maze, Position } from '@/types/game.types';

export const DIFFICULTY_SETTINGS = {
  easy: { gridSize: 8, cellSize: 60 },
  medium: { gridSize: 12, cellSize: 50 },
  hard: { gridSize: 16, cellSize: 40 },
  expert: { gridSize: 20, cellSize: 35 },
};

// Mobile-optimized settings (larger cell sizes for better visibility)
export const MOBILE_DIFFICULTY_SETTINGS = {
  easy: { gridSize: 8, cellSize: 42 },
  medium: { gridSize: 12, cellSize: 35 },
  hard: { gridSize: 16, cellSize: 28 },
  expert: { gridSize: 20, cellSize: 22 },
};

function createCell(x: number, y: number): Cell {
  return {
    x,
    y,
    walls: { top: true, right: true, bottom: true, left: true },
    visited: false,
  };
}

function getNeighbors(cell: Cell, grid: Cell[][]): Cell[] {
  const { x, y } = cell;
  const neighbors: Cell[] = [];
  const height = grid.length;
  const width = grid[0].length;

  if (y > 0) neighbors.push(grid[y - 1][x]); // Top
  if (x < width - 1) neighbors.push(grid[y][x + 1]); // Right
  if (y < height - 1) neighbors.push(grid[y + 1][x]); // Bottom
  if (x > 0) neighbors.push(grid[y][x - 1]); // Left

  return neighbors.filter(n => !n.visited);
}

function removeWallBetween(current: Cell, next: Cell): void {
  const dx = next.x - current.x;
  const dy = next.y - current.y;

  if (dx === 1) {
    current.walls.right = false;
    next.walls.left = false;
  } else if (dx === -1) {
    current.walls.left = false;
    next.walls.right = false;
  } else if (dy === 1) {
    current.walls.bottom = false;
    next.walls.top = false;
  } else if (dy === -1) {
    current.walls.top = false;
    next.walls.bottom = false;
  }
}

export function generateMaze(
  gridSize: number = 10,
  cellSize: number = 50
): Maze {
  // Initialize grid
  const grid: Cell[][] = [];
  for (let y = 0; y < gridSize; y++) {
    grid[y] = [];
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = createCell(x, y);
    }
  }

  // Recursive backtracking algorithm
  const stack: Cell[] = [];
  const startCell = grid[0][0];
  startCell.visited = true;
  stack.push(startCell);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getNeighbors(current, grid);

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWallBetween(current, next);
      next.visited = true;
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  // Reset visited flags for gameplay
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x].visited = false;
    }
  }

  return {
    grid,
    width: gridSize,
    height: gridSize,
    cellSize,
    startCell: { x: 0, y: 0 },
    endCell: { x: gridSize - 1, y: gridSize - 1 },
  };
}

export function getMazeByDifficulty(difficulty: string, isMobile: boolean = false): Maze {
  const settingsMap = isMobile ? MOBILE_DIFFICULTY_SETTINGS : DIFFICULTY_SETTINGS;
  const settings = settingsMap[difficulty as keyof typeof DIFFICULTY_SETTINGS] 
    || settingsMap.easy;
  return generateMaze(settings.gridSize, settings.cellSize);
}
