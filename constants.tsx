
import { MenuCategory, MenuItem } from './types.ts';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Poulet à la Moambé Heritage',
    price: 185,
    description: 'The soul of the Congo. Succulent chicken slow-braised in a rich, velvety palm nut cream, enriched with local spices. Served with a side of white rice and fresh batonnets de manioc.',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
    tags: ['National Dish', 'Hearty'],
    spicy: false
  },
  {
    id: '2',
    name: 'Liboke ya Mpunda',
    price: 210,
    description: 'Fresh tilapia fillets marinated in "Pili-Pili" peppers, lemon, and wild herbs, wrapped in authentic banana leaves and steamed over charcoal. Captures the fragrance of the river.',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop',
    tags: ['Leaf-Steamed', 'Fragrant'],
    spicy: true
  },
  {
    id: '3',
    name: 'Kamundele (Beef Skewers)',
    price: 145,
    description: 'Traditional market-style beef skewers, marinated in a blend of ginger, garlic, and Congolese spice mixes, charcoal-grilled to a smoky finish.',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    tags: ['Street Style', 'Protein'],
    spicy: false,
    healthy: true
  },
  {
    id: '4',
    name: 'Authentic Pondu & Fufu',
    price: 125,
    description: 'Slow-cooked cassava leaves (Saka-Saka) pounded with palm oil, garlic, and leeks. A vegetarian staple that defines the Congolese diet. Served with smooth, handmade Fufu.',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    tags: ['Vegan', 'Superfood'],
    healthy: true
  },
  {
    id: '5',
    name: 'Mikate & Peanut Butter',
    price: 65,
    description: 'A classic breakfast delight. Warm, fluffy fried dough balls served with a side of authentic roasted peanut butter and organic honey.',
    category: MenuCategory.BREAKFAST,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop',
    tags: ['Vegetarian', 'Classic']
  },
  {
    id: '6',
    name: 'Grilled Ntaba Plate',
    price: 195,
    description: 'Tender chunks of goat meat, flame-grilled and seasoned with coarse salt and hot Pili-Pili. Served with Chikwangue (fermented cassava bread).',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1000&auto=format&fit=crop',
    tags: ['Smoky', 'Traditional'],
    spicy: true
  },
  {
    id: '7',
    name: 'Fried Makemba (Plantains)',
    price: 55,
    description: 'Perfectly ripened yellow plantains, sliced and caramelized to a golden brown. The quintessential Congolese side dish or dessert.',
    category: MenuCategory.DESSERTS,
    image: 'https://images.unsplash.com/photo-1626202133282-f8502c99516e?q=80&w=1000&auto=format&fit=crop',
    tags: ['Sweet', 'Tropical']
  }
];
