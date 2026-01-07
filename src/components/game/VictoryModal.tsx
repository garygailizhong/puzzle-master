import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home, Sparkles } from 'lucide-react';
import { BestScore } from '@/hooks/usePuzzleGame';

interface VictoryModalProps {
  isOpen: boolean;
  time: number;
  moves: number;
  bestScore: BestScore | null;
  onRestart: () => void;
  onHome: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  time,
  moves,
  bestScore,
  onRestart,
  onHome,
}) => {
  const isNewRecord = bestScore && time <= bestScore.time;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-sm rounded-3xl border-4 border-primary/30">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full gradient-cute flex items-center justify-center animate-bounce-soft">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <DialogTitle className="text-3xl font-bold text-gradient-cute">
            🎉 恭喜完成！
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            你太棒了！拼图已成功还原
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 成绩卡片 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-2xl p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">⏱️ 用时</div>
              <div className="text-2xl font-bold text-secondary-foreground">
                {formatTime(time)}
              </div>
            </div>
            <div className="bg-secondary rounded-2xl p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">👣 步数</div>
              <div className="text-2xl font-bold text-secondary-foreground">
                {moves}
              </div>
            </div>
          </div>

          {/* 新纪录提示 */}
          {isNewRecord && (
            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-accent rounded-full">
              <Sparkles className="w-5 h-5 text-game-yellow animate-wiggle" />
              <span className="font-bold text-accent-foreground">
                🏆 新纪录！
              </span>
              <Sparkles className="w-5 h-5 text-game-yellow animate-wiggle" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={onRestart}
            className="w-full h-12 text-lg font-bold gradient-cute text-primary-foreground hover:opacity-90 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            再玩一次
          </Button>
          <Button
            onClick={onHome}
            variant="outline"
            className="w-full h-12 text-lg font-bold rounded-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            换张图片
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VictoryModal;