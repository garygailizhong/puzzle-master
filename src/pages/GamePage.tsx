import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PuzzleBoard from '@/components/game/PuzzleBoard';
import GameStats from '@/components/game/GameStats';
import VictoryModal from '@/components/game/VictoryModal';
import ImagePreview from '@/components/game/ImagePreview';
import usePuzzleGame from '@/hooks/usePuzzleGame';
import { defaultImages } from '@/data/defaultImages';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const size = (parseInt(searchParams.get('size') || '3') as 3 | 4) || 3;
  const imageId = searchParams.get('image') || 'sunset';
  const customImage = searchParams.get('custom');
  
  const imageUrl = customImage 
    ? decodeURIComponent(customImage)
    : defaultImages.find(img => img.id === imageId)?.url || defaultImages[0].url;

  const {
    tiles,
    moves,
    time,
    isComplete,
    moveTile,
    restart,
    getBestScore,
    canMove,
  } = usePuzzleGame(size, customImage ? 'custom' : imageId);

  const bestScore = getBestScore();

  const handleHome = () => {
    navigate('/');
  };

  // 预加载图片
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部导航栏 */}
      <header className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHome}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <h1 className="text-xl font-bold text-gradient-cute">
          {size}×{size} 拼图
        </h1>

        <ImagePreview imageUrl={imageUrl} />
      </header>

      {/* 游戏统计 */}
      <GameStats time={time} moves={moves} bestScore={bestScore} />

      {/* 拼图区域 */}
      <main className="flex-1 flex items-center justify-center px-4 pb-4">
        <PuzzleBoard
          tiles={tiles}
          size={size}
          imageUrl={imageUrl}
          onTileClick={moveTile}
          canMove={canMove}
          isComplete={isComplete}
        />
      </main>

      {/* 底部按钮 */}
      <footer className="p-4 flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={restart}
          className="rounded-xl px-6 h-12 font-bold"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          重新开始
        </Button>
        <Button
          variant="outline"
          onClick={handleHome}
          className="rounded-xl px-6 h-12 font-bold"
        >
          换张图片
        </Button>
      </footer>

      {/* 胜利弹窗 */}
      <VictoryModal
        isOpen={isComplete}
        time={time}
        moves={moves}
        bestScore={bestScore}
        onRestart={restart}
        onHome={handleHome}
      />
    </div>
  );
};

export default GamePage;