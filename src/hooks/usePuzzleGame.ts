import { useState, useCallback, useEffect, useRef } from 'react';

export interface PuzzleState {
  tiles: number[];
  emptyIndex: number;
  size: number;
  moves: number;
  time: number;
  isComplete: boolean;
  isPlaying: boolean;
}

export interface BestScore {
  time: number;
  moves: number;
}

const STORAGE_KEY = 'puzzle-best-scores';

// 获取相邻的可移动位置
const getNeighbors = (index: number, size: number): number[] => {
  const neighbors: number[] = [];
  const row = Math.floor(index / size);
  const col = index % size;

  if (row > 0) neighbors.push(index - size); // 上
  if (row < size - 1) neighbors.push(index + size); // 下
  if (col > 0) neighbors.push(index - 1); // 左
  if (col < size - 1) neighbors.push(index + 1); // 右

  return neighbors;
};

// 逆向打乱法：从完成状态随机移动空格
const shufflePuzzle = (size: number): number[] => {
  const total = size * size;
  const tiles = Array.from({ length: total }, (_, i) => i);
  let emptyIndex = total - 1;

  // 3x3 移动 30 步，4x4 移动 80 步
  const shuffleMoves = size === 3 ? 30 : 80;

  for (let i = 0; i < shuffleMoves; i++) {
    const neighbors = getNeighbors(emptyIndex, size);
    const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
    [tiles[emptyIndex], tiles[randomNeighbor]] = [tiles[randomNeighbor], tiles[emptyIndex]];
    emptyIndex = randomNeighbor;
  }

  return tiles;
};

// 检查是否完成
const checkComplete = (tiles: number[]): boolean => {
  return tiles.every((tile, index) => tile === index);
};

// 获取保存的最佳成绩
const getBestScores = (): Record<string, BestScore> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

// 保存最佳成绩
const saveBestScore = (key: string, score: BestScore) => {
  const scores = getBestScores();
  const existing = scores[key];

  if (!existing || score.time < existing.time) {
    scores[key] = score;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return true;
  }
  return false;
};

export const usePuzzleGame = (size: number, imageId: string) => {
  const [state, setState] = useState<PuzzleState>(() => ({
    tiles: shufflePuzzle(size),
    emptyIndex: -1,
    size,
    moves: 0,
    time: 0,
    isComplete: false,
    isPlaying: false,
  }));

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreKey = `${size}x${size}-${imageId}`;

  // 更新空格位置
  useEffect(() => {
    const emptyIndex = state.tiles.indexOf(size * size - 1);
    if (emptyIndex !== state.emptyIndex) {
      setState(prev => ({ ...prev, emptyIndex }));
    }
  }, [state.tiles, size, state.emptyIndex]);

  // 计时器
  useEffect(() => {
    if (state.isPlaying && !state.isComplete) {
      timerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isPlaying, state.isComplete]);

  // 移动图块
  const moveTile = useCallback((index: number) => {
    setState(prev => {
      if (prev.isComplete) return prev;

      const neighbors = getNeighbors(prev.emptyIndex, prev.size);
      if (!neighbors.includes(index)) return prev;

      const newTiles = [...prev.tiles];
      [newTiles[prev.emptyIndex], newTiles[index]] = [newTiles[index], newTiles[prev.emptyIndex]];

      const isComplete = checkComplete(newTiles);
      const newMoves = prev.moves + 1;

      if (isComplete && timerRef.current) {
        clearInterval(timerRef.current);
        saveBestScore(scoreKey, { time: prev.time, moves: newMoves });
      }

      return {
        ...prev,
        tiles: newTiles,
        emptyIndex: index,
        moves: newMoves,
        isPlaying: true,
        isComplete,
      };
    });
  }, [scoreKey]);

  // 重新开始
  const restart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setState({
      tiles: shufflePuzzle(size),
      emptyIndex: -1,
      size,
      moves: 0,
      time: 0,
      isComplete: false,
      isPlaying: false,
    });
  }, [size]);

  // 获取最佳成绩
  const getBestScore = useCallback((): BestScore | null => {
    const scores = getBestScores();
    return scores[scoreKey] || null;
  }, [scoreKey]);

  // 检查是否可以移动
  const canMove = useCallback((index: number): boolean => {
    if (state.isComplete) return false;
    const neighbors = getNeighbors(state.emptyIndex, state.size);
    return neighbors.includes(index);
  }, [state.emptyIndex, state.size, state.isComplete]);

  return {
    ...state,
    moveTile,
    restart,
    getBestScore,
    canMove,
  };
};

export default usePuzzleGame;