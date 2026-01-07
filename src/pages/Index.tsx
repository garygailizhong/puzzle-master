import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DifficultySelector from '@/components/home/DifficultySelector';
import ImageSelector from '@/components/home/ImageSelector';
import { defaultImages } from '@/data/defaultImages';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState<3 | 4>(3);
  const [selectedImage, setSelectedImage] = useState(defaultImages[0].id);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleStart = () => {
    const params = new URLSearchParams({
      size: size.toString(),
      image: selectedImage,
    });
    
    if (customImage) {
      params.set('custom', encodeURIComponent(customImage));
    }
    
    navigate(`/game?${params.toString()}`);
  };

  const handleCustomUpload = (dataUrl: string) => {
    setCustomImage(dataUrl);
  };

  const handleImageSelect = (id: string) => {
    setSelectedImage(id);
    setCustomImage(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* 标题区域 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-cute mb-4 animate-bounce-soft shadow-xl">
          <Puzzle className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-gradient-cute mb-2">
          🧩 拼图挑战
        </h1>
        <p className="text-muted-foreground">
          滑动图块，还原完整图片！
        </p>
      </div>

      {/* 难度选择 */}
      <section className="w-full max-w-md mb-8">
        <h3 className="text-lg font-bold text-center text-foreground mb-4">
          🎯 选择难度
        </h3>
        <DifficultySelector value={size} onChange={setSize} />
      </section>

      {/* 图片选择 */}
      <section className="w-full max-w-md mb-8">
        <ImageSelector
          images={defaultImages}
          selectedId={selectedImage}
          customImage={customImage}
          onSelect={handleImageSelect}
          onCustomUpload={handleCustomUpload}
        />
      </section>

      {/* 开始按钮 */}
      <Button
        onClick={handleStart}
        size="lg"
        className="w-full max-w-md h-14 text-xl font-bold gradient-cute text-primary-foreground rounded-2xl shadow-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <Play className="w-6 h-6 mr-2" />
        开始游戏
      </Button>

      {/* 游戏提示 */}
      <p className="mt-6 text-sm text-muted-foreground text-center max-w-xs">
        💡 点击与空格相邻的图块即可滑动
      </p>
    </div>
  );
};

export default Index;