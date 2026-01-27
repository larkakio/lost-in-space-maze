'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { GameState, GameAction, Maze } from '@/types/game.types';
import { getMazeByDifficulty } from '@/lib/mazeGenerator';

const initialState: GameState = {
  status: 'menu',
  level: 1,
  difficulty: 'easy',
  player: {
    position: { x: 0, y: 0 },
    direction: 'right',
    speed: 5,
    isMoving: false,
  },
  maze: null,
  score: 0,
  time: 0,
  movesCount: 0,
  highScore: 0,
  soundEnabled: true,
  musicEnabled: true,
};

function createGameReducer(isMobile: boolean) {
  return (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
      case 'START_GAME':
        const maze = getMazeByDifficulty(state.difficulty, isMobile);
        return {
          ...state,
          status: 'playing',
          maze,
          player: {
            ...state.player,
            position: { ...maze.startCell },
          },
          time: 0,
          movesCount: 0,
        };

      case 'PAUSE_GAME':
        return { ...state, status: 'paused' };

      case 'RESUME_GAME':
        return { ...state, status: 'playing' };

      case 'END_GAME':
        return {
          ...state,
          status: action.payload.victory ? 'victory' : 'gameOver',
          highScore: Math.max(state.score, state.highScore),
        };

      case 'MOVE_PLAYER':
        return {
          ...state,
          player: {
            ...state.player,
            ...action.payload,
          },
          movesCount: state.movesCount + 1,
        };

      case 'LEVEL_UP':
        const nextLevel = state.level + 1;
        const nextMaze = getMazeByDifficulty(state.difficulty, isMobile);
        const levelBonus = 100 * nextLevel;
        
        return {
          ...state,
          level: nextLevel,
          maze: nextMaze,
          score: state.score + levelBonus,
          player: {
            ...state.player,
            position: { ...nextMaze.startCell },
          },
          time: 0,
          movesCount: 0,
        };

      case 'RESET_GAME':
        return {
          ...initialState,
          highScore: state.highScore,
          difficulty: state.difficulty,
        };

      case 'UPDATE_SETTINGS':
        return {
          ...state,
          ...action.payload,
        };

      default:
        return state;
    }
  };
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: (victory: boolean) => void;
  levelUp: () => void;
  resetGame: () => void;
  updateSettings: (settings: Partial<GameState>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gameReducer = React.useMemo(() => createGameReducer(isMobile), [isMobile]);
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load high score from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHighScore = localStorage.getItem('lostInSpaceMaze_highScore');
      if (savedHighScore) {
        dispatch({
          type: 'UPDATE_SETTINGS',
          payload: { highScore: parseInt(savedHighScore, 10) },
        });
      }
    }
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lostInSpaceMaze_highScore', state.highScore.toString());
    }
  }, [state.highScore]);

  // Timer
  useEffect(() => {
    if (state.status !== 'playing') return;

    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_SETTINGS',
        payload: { time: state.time + 1 },
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, state.time]);

  const startGame = () => dispatch({ type: 'START_GAME' });
  const pauseGame = () => dispatch({ type: 'PAUSE_GAME' });
  const resumeGame = () => dispatch({ type: 'RESUME_GAME' });
  const endGame = (victory: boolean) => dispatch({ type: 'END_GAME', payload: { victory } });
  const levelUp = () => dispatch({ type: 'LEVEL_UP' });
  const resetGame = () => dispatch({ type: 'RESET_GAME' });
  const updateSettings = (settings: Partial<GameState>) => 
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      startGame,
      pauseGame,
      resumeGame,
      endGame,
      levelUp,
      resetGame,
      updateSettings,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
