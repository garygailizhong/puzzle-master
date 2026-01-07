import React from 'react';
import { cn } from '@/lib/utils';

interface DifficultySelectorProps {
  value: 3 | 4;
  onChange: (size: 3 | 4) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={() => onChange(3)}
        className={cn(
          "px-6 py-3 rounded-2xl font-bold text-lg transition-all",
          "border-2 shadow-lg",
          value === 3
            ? "gradient-cute text-primary-foreground border-transparent scale-105"
            : "bg-card text-card-foreground border-border hover:border-primary/50 hover:scale-102"
        )}
      >
        <span className="block text-2xl mb-1">😊</span>
        3×3 简单
      </button>
      <button
        onClick={() => onChange(4)}
        className={cn(
          "px-6 py-3 rounded-2xl font-bold text-lg transition-all",
          "border-2 shadow-lg",
          value === 4
            ? "gradient-cute text-primary-foreground border-transparent scale-105"
            : "bg-card text-card-foreground border-border hover:border-primary/50 hover:scale-102"
        )}
      >
        <span className="block text-2xl mb-1">💪</span>
        4×4 困难
      </button>
    </div>
  );
};

export default DifficultySelector;