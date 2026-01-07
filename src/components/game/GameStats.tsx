import React from 'react';
import { Clock, Footprints, Trophy } from 'lucide-react';
import { BestScore } from '@/hooks/usePuzzleGame';

interface GameStatsProps {
  time: number;
  moves: number;
  bestScore: BestScore | null;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const GameStats: React.FC<GameStatsProps> = ({ time, moves, bestScore }) => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
      {/* 计时器 */}
      <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-lg border border-border">
        <Clock className="w-5 h-5 text-game-pink" />
        <span className="font-bold text-lg tabular-nums">{formatTime(time)}</span>
      </div>

      {/* 步数 */}
      <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-lg border border-border">
        <Footprints className="w-5 h-5 text-game-purple" />
        <span className="font-bold text-lg tabular-nums">{moves}</span>
      </div>

      {/* 最佳成绩 */}
      {bestScore && (
        <div className="flex items-center gap-2 bg-accent rounded-full px-4 py-2 shadow-lg border border-border">
          <Trophy className="w-5 h-5 text-game-yellow" />
          <span className="font-medium text-sm text-accent-foreground">
            {formatTime(bestScore.time)}
          </span>
        </div>
      )}
    </div>
  );
};

export default GameStats;