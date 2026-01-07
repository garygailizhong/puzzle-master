export interface GameImage {
  id: string;
  name: string;
  url: string;
  emoji: string;
}

// 使用高质量的 Unsplash 图片
export const defaultImages: GameImage[] = [
  {
    id: 'sunset',
    name: '夕阳',
    url: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600&h=600&fit=crop',
    emoji: '🌅',
  },
  {
    id: 'cat',
    name: '小猫',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop',
    emoji: '🐱',
  },
  {
    id: 'flower',
    name: '花朵',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop',
    emoji: '🌸',
  },
  {
    id: 'mountain',
    name: '山峰',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop',
    emoji: '🏔️',
  },
  {
    id: 'food',
    name: '美食',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
    emoji: '🍕',
  },
];