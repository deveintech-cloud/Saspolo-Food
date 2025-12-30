
import { MenuCategory, MenuItem } from './types.ts';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Poulet à la Moambé Heritage',
    price: 185,
    description: 'moambe_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
    tags: ['National Dish', 'Hearty'],
    spicy: false,
    nutrition: { calories: '840 kcal', protein: '42g', fat: '58g', carbs: '28g' }
  },
  {
    id: '2',
    name: 'Liboke ya Mpunda',
    price: 210,
    description: 'liboke_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop',
    tags: ['Leaf-Steamed', 'Fragrant'],
    spicy: true,
    nutrition: { calories: '420 kcal', protein: '48g', fat: '12g', carbs: '5g' }
  },
  {
    id: '3',
    name: 'Kamundele (Beef Skewers)',
    price: 145,
    description: 'kamundele_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    tags: ['Street Style', 'Protein'],
    spicy: false,
    healthy: true,
    nutrition: { calories: '380 kcal', protein: '35g', fat: '22g', carbs: '4g' }
  },
  {
    id: '4',
    name: 'Authentic Pondu & Fufu',
    price: 125,
    description: 'pondu_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    tags: ['Vegan', 'Superfood'],
    healthy: true,
    nutrition: { calories: '560 kcal', protein: '12g', fat: '18g', carbs: '92g' }
  },
  {
    id: '5',
    name: 'Mikate & Peanut Butter',
    price: 65,
    description: 'mikate_desc',
    category: MenuCategory.BREAKFAST,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=1000&auto=format&fit=crop',
    tags: ['Vegetarian', 'Classic'],
    nutrition: { calories: '480 kcal', protein: '8g', fat: '24g', carbs: '56g' }
  },
  {
    id: '6',
    name: 'Grilled Ntaba Plate',
    price: 195,
    description: 'ntaba_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1000&auto=format&fit=crop',
    tags: ['Smoky', 'Traditional'],
    spicy: true,
    nutrition: { calories: '620 kcal', protein: '45g', fat: '38g', carbs: '2g' }
  },
  {
    id: '7',
    name: 'Fried Makemba (Plantains)',
    price: 55,
    description: 'makemba_desc',
    category: MenuCategory.DESSERTS,
    image: 'https://images.unsplash.com/photo-1626202133282-f8502c99516e?q=80&w=1000&auto=format&fit=crop',
    tags: ['Sweet', 'Tropical'],
    nutrition: { calories: '320 kcal', protein: '2g', fat: '10g', carbs: '58g' }
  },
  {
    id: '8',
    name: 'Chikwangue Heritage',
    price: 45,
    description: 'chikwangue_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1589113103503-49ef83d95ecd?q=80&w=1000&auto=format&fit=crop',
    tags: ['Traditional', 'Cassava Side'],
    healthy: true,
    nutrition: { calories: '340 kcal', protein: '3g', fat: '1g', carbs: '80g' }
  },
  {
    id: '9',
    name: 'Madesu ya Nyama',
    price: 135,
    description: 'madesu_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1594911773659-35c7244302d3?q=80&w=1000&auto=format&fit=crop',
    tags: ['Protein Rich', 'Comfort'],
    healthy: true,
    nutrition: { calories: '540 kcal', protein: '32g', fat: '14g', carbs: '68g' }
  },
  {
    id: '10',
    name: 'Soso ya Kotika',
    price: 175,
    description: 'soso_kotika_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1626700051175-656a433b112a?q=80&w=1000&auto=format&fit=crop',
    tags: ['Smoked', 'Chef Signature'],
    spicy: true,
    nutrition: { calories: '510 kcal', protein: '48g', fat: '28g', carbs: '0g' }
  },
  {
    id: '11',
    name: 'Makayabu with Onions',
    price: 155,
    description: 'makayabu_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1000&auto=format&fit=crop',
    tags: ['Salted Fish', 'Heritage'],
    spicy: true,
    nutrition: { calories: '440 kcal', protein: '38g', fat: '16g', carbs: '32g' }
  },
  {
    id: '12',
    name: 'Mikate Pili-Pili Combo',
    price: 75,
    description: 'mikate_pili_desc',
    category: MenuCategory.BREAKFAST,
    image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?q=80&w=1000&auto=format&fit=crop',
    tags: ['Spicy-Sweet', 'Morning Kick'],
    spicy: true,
    nutrition: { calories: '380 kcal', protein: '6g', fat: '12g', carbs: '62g' }
  }
];
