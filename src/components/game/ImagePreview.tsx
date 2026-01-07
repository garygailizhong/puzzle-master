import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
  imageUrl: string;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "relative w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-card",
          "hover:scale-105 transition-transform active:scale-95",
          className
        )}
      >
        <img src={imageUrl} alt="原图预览" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
          <Eye className="w-5 h-5 text-primary-foreground drop-shadow" />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 rounded-2xl">
          <DialogClose className="absolute right-2 top-2 z-10 w-8 h-8 rounded-full bg-card flex items-center justify-center shadow-lg">
            <X className="w-4 h-4" />
          </DialogClose>
          <img
            src={imageUrl}
            alt="原图"
            className="w-full h-full object-contain rounded-xl"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImagePreview;