
import { MenuCategory, MenuItem } from './types.ts';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Spicy Angus Supreme',
    price: 24,
    description: 'Aged cheddar, caramelized onions, spicy relish, and our signature Saspolo sauce.',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    tags: ['Spicy'],
    spicy: true
  },
  {
    id: '2',
    name: 'Truffle Carbonara',
    price: 32,
    description: 'Fresh handmade pasta, guanciale, pecorino romano, and shaved black truffles.',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop',
    tags: ['Gluten opt.'],
    glutenFree: true
  },
  {
    id: '3',
    name: 'Zen Poke Bowl',
    price: 18,
    description: 'Sashimi grade salmon, avocado, edamame, mango salsa, and sesame dressing.',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
    tags: ['Healthy'],
    healthy: true
  },
  {
    id: '4',
    name: 'Belgian Cloud Waffles',
    price: 16,
    description: 'Fluffy waffles topped with seasonal berries, organic maple syrup, and whipped mascarpone.',
    category: MenuCategory.BREAKFAST,
    image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=1000&auto=format&fit=crop',
    tags: ['Sweet']
  },
  {
    id: '5',
    name: 'Midnight Lava Cake',
    price: 14,
    description: '70% dark chocolate fondant served with Madagascar vanilla bean gelato.',
    category: MenuCategory.DESSERTS,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000&auto=format&fit=crop',
    tags: ['Classic']
  },
  {
    id: '6',
    name: 'Shakshuka Fusion',
    price: 19,
    description: 'Slow-cooked tomatoes, bell peppers, poached organic eggs, and feta with sourdough.',
    category: MenuCategory.BREAKFAST,
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=1000&auto=format&fit=crop',
    tags: ['Spicy'],
    spicy: true
  }
];
