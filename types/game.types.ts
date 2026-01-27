export type Direction = 'up' | 'down' | 'left' | 'right';
export type GameStatus = 'menu' | 'playing' | 'paused' | 'victory' | 'gameOver';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Cell {
  x: number;
  y: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

export interface Maze {
  grid: Cell[][];
  width: number;
  height: number;
  cellSize: number;
  startCell: Position;
  endCell: Position;
}

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  position: Position;
  direction: Direction;
  speed: number;
  isMoving: boolean;
}

export interface GameState {
  status: GameStatus;
  level: number;
  difficulty: Difficulty;
  player: Player;
  maze: Maze | null;
  score: number;
  time: number;
  movesCount: number;
  highScore: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface GameAction {
  type: 'START_GAME' | 'PAUSE_GAME' | 'RESUME_GAME' | 'END_GAME' | 
        'MOVE_PLAYER' | 'LEVEL_UP' | 'RESET_GAME' | 'UPDATE_SETTINGS';
  payload?: any;
}
