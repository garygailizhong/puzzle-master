import React from 'react';
import { cn } from '@/lib/utils';

interface PuzzleBoardProps {
  tiles: number[];
  size: number;
  imageUrl: string;
  onTileClick: (index: number) => void;
  canMove: (index: number) => boolean;
  isComplete: boolean;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  tiles,
  size,
  imageUrl,
  onTileClick,
  canMove,
  isComplete,
}) => {
  const tileSize = 100 / size;
  const totalTiles = size * size;

  return (
    <div 
      className="relative aspect-square w-full max-w-[min(90vw,400px)] rounded-2xl overflow-hidden shadow-2xl border-4 border-card"
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gap: '2px',
        backgroundColor: 'hsl(var(--muted))',
      }}
    >
      {tiles.map((tile, index) => {
        const isEmptyTile = tile === totalTiles - 1;
        const originalRow = Math.floor(tile / size);
        const originalCol = tile % size;
        const isMovable = canMove(index);

        return (
          <div
            key={index}
            onClick={() => onTileClick(index)}
            className={cn(
              "relative transition-all duration-150 ease-out",
              isEmptyTile && !isComplete && "opacity-0",
              isMovable && "cursor-pointer hover:scale-[0.97] active:scale-95",
              !isMovable && !isEmptyTile && "cursor-default",
              isComplete && "animate-pop"
            )}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: `${size * 100}% ${size * 100}%`,
              backgroundPosition: `${originalCol * tileSize}% ${originalRow * tileSize}%`,
              aspectRatio: '1',
            }}
          >
            {isMovable && !isComplete && (
              <div className="absolute inset-0 bg-primary/10 rounded-sm animate-pulse" />
            )}
          </div>
        );
      })}

      {/* 完成时的庆祝效果 */}
      {isComplete && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: [
                  'hsl(var(--game-pink))',
                  'hsl(var(--game-purple))',
                  'hsl(var(--game-mint))',
                  'hsl(var(--game-yellow))',
                ][Math.floor(Math.random() * 4)],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PuzzleBoard;