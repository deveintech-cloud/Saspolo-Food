
import { MenuCategory, MenuItem } from './types.ts';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Poulet à la Moambé Heritage',
    description: 'moambe_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1000&auto=format&fit=crop', // Rich stew representation
    tags: ['National Dish', 'Hearty'],
    spicy: false,
    nutrition: { calories: '840 kcal', protein: '42g', fat: '58g', carbs: '28g' }
  },
  {
    id: '13',
    name: 'Fumbwa aux Poissons Salés',
    description: 'fumbwa_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop', // Dark green leafy dish
    tags: ['Signature', 'Superfood', 'Kongo Central'],
    healthy: true,
    nutrition: { calories: '410 kcal', protein: '28g', fat: '18g', carbs: '12g' }
  },
  {
    id: '2',
    name: 'Liboke ya Mpunda',
    description: 'liboke_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop', // Wrapped grilled food
    tags: ['Leaf-Steamed', 'Fragrant'],
    spicy: true,
    nutrition: { calories: '420 kcal', protein: '48g', fat: '12g', carbs: '5g' }
  },
  {
    id: '3',
    name: 'Kamundele (Beef Skewers)',
    description: 'kamundele_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop', // Skewers
    tags: ['Street Style', 'Protein'],
    spicy: false,
    healthy: true,
    nutrition: { calories: '380 kcal', protein: '35g', fat: '22g', carbs: '4g' }
  },
  {
    id: '4',
    name: 'Authentic Pondu & Fufu',
    description: 'pondu_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop', // Green vegetable mash
    tags: ['Vegan', 'Superfood'],
    healthy: true,
    nutrition: { calories: '560 kcal', protein: '12g', fat: '18g', carbs: '92g' }
  },
  {
    id: '5',
    name: 'Mikate & Peanut Butter',
    description: 'mikate_desc',
    category: MenuCategory.BREAKFAST,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1000&auto=format&fit=crop', // Fried dough/puff puff style
    tags: ['Vegetarian', 'Classic'],
    nutrition: { calories: '480 kcal', protein: '8g', fat: '24g', carbs: '56g' }
  },
  {
    id: '6',
    name: 'Grilled Ntaba Plate',
    description: 'ntaba_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1000&auto=format&fit=crop', // Grilled meat chunks
    tags: ['Smoky', 'Traditional'],
    spicy: true,
    nutrition: { calories: '620 kcal', protein: '45g', fat: '38g', carbs: '2g' }
  },
  {
    id: '7',
    name: 'Fried Makemba (Plantains)',
    description: 'makemba_desc',
    category: MenuCategory.DESSERTS,
    image: 'https://images.unsplash.com/photo-1626202133282-f8502c99516e?q=80&w=1000&auto=format&fit=crop', // Fried plantains
    tags: ['Sweet', 'Tropical'],
    nutrition: { calories: '320 kcal', protein: '2g', fat: '10g', carbs: '58g' }
  },
  {
    id: '8',
    name: 'Chikwangue Heritage',
    description: 'chikwangue_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1589113103503-49ef83d95ecd?q=80&w=1000&auto=format&fit=crop', // Steamed dough style
    tags: ['Traditional', 'Cassava Side'],
    healthy: true,
    nutrition: { calories: '340 kcal', protein: '3g', fat: '1g', carbs: '80g' }
  },
  {
    id: '9',
    name: 'Madesu ya Nyama',
    description: 'madesu_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop', // Bean stew
    tags: ['Protein Rich', 'Comfort'],
    healthy: true,
    nutrition: { calories: '540 kcal', protein: '32g', fat: '14g', carbs: '68g' }
  },
  {
    id: '10',
    name: 'Soso ya Kotika',
    description: 'soso_kotika_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1626700051175-656a433b112a?q=80&w=1000&auto=format&fit=crop', // Grilled whole/half chicken
    tags: ['Smoked', 'Chef Signature'],
    spicy: true,
    nutrition: { calories: '510 kcal', protein: '48g', fat: '28g', carbs: '0g' }
  },
  {
    id: '11',
    name: 'Makayabu with Onions',
    description: 'makayabu_desc',
    category: MenuCategory.MAIN,
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1000&auto=format&fit=crop', // Sautéed fish
    tags: ['Salted Fish', 'Heritage'],
    spicy: true,
    nutrition: { calories: '440 kcal', protein: '38g', fat: '16g', carbs: '32g' }
  },
  {
    id: '12',
    name: 'Mikate Pili-Pili Combo',
    description: 'mikate_pili_desc',
    category: MenuCategory.BREAKFAST,
    image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?q=80&w=1000&auto=format&fit=crop', // Fried dough with dip
    tags: ['Spicy-Sweet', 'Morning Kick'],
    spicy: true,
    nutrition: { calories: '380 kcal', protein: '6g', fat: '12g', carbs: '62g' }
  }
];
