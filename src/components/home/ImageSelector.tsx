import React, { useRef } from 'react';
import { Upload, Check } from 'lucide-react';
import { GameImage } from '@/data/defaultImages';
import { cn } from '@/lib/utils';

interface ImageSelectorProps {
  images: GameImage[];
  selectedId: string;
  customImage: string | null;
  onSelect: (id: string) => void;
  onCustomUpload: (dataUrl: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  images,
  selectedId,
  customImage,
  onSelect,
  onCustomUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onCustomUpload(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-center text-foreground">
        🖼️ 选择图片
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => onSelect(image.id)}
            className={cn(
              "relative aspect-square rounded-2xl overflow-hidden",
              "border-4 transition-all shadow-lg",
              "hover:scale-105 active:scale-95",
              selectedId === image.id && !customImage
                ? "border-primary ring-4 ring-primary/30"
                : "border-card hover:border-primary/50"
            )}
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-2">
              <span className="text-primary-foreground text-sm font-medium drop-shadow">
                {image.emoji} {image.name}
              </span>
            </div>
            {selectedId === image.id && !customImage && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}

        {/* 上传自定义图片 */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative aspect-square rounded-2xl overflow-hidden",
            "border-4 border-dashed transition-all",
            "hover:scale-105 active:scale-95",
            customImage
              ? "border-primary ring-4 ring-primary/30"
              : "border-muted-foreground/50 hover:border-primary/50"
          )}
        >
          {customImage ? (
            <>
              <img
                src={customImage}
                alt="自定义图片"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-xs font-medium">上传图片</span>
            </div>
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageSelector;