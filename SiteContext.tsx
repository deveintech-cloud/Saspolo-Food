
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, MenuItem, MenuCategory, Post, NavItem, Language } from './types.ts';
import { MENU_ITEMS as INITIAL_MENU } from './constants.tsx';

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    reserve: "Reserve Table",
    cuisine: "Cuisine",
    heritage: "Heritage",
    journal: "Journal",
    visit: "Visit",
    about: "About Us",
    seeMenu: "See the Menu",
    bookTable: "Book Your Table",
    newMenu: "New Seasonal Menu Available",
    topRated: "Top Rated",
    michelin: "Michelin Guide '24",
    curated: "Curated Delicacies",
    handPicked: "Hand-picked ingredients prepared with passion and Congolese technical precision.",
    orderNow: "Order Now",
    bookATable: "Book a Table",
    securePerfect: "Secure the perfect setting for an unforgettable dining experience.",
    date: "Date",
    time: "Time",
    guests: "Guests",
    occasion: "Occasion",
    fullName: "Full Name",
    phone: "Phone Number",
    special_requests: "Special Instructions",
    requestWindow: "Request Window Seat",
    confirmReserve: "Confirm Reservation",
    joinClub: "Join the Elengi Club",
    stayUpdated: "Stay updated with our latest seasonal menus, exclusive events, and culinary insights.",
    subscribe: "Subscribe",
    orderWhatsapp: "Order WhatsApp",
    privacy: "Privacy",
    terms: "Terms",
    stories: "Latest from the Kitchen",
    viewAll: "View All Stories",
    storyDetails: "Story Details",
    ourStories: "Our Stories",
    backToStories: "Back to All Stories",
    cat_all: "All",
    cat_breakfast: "Breakfast",
    cat_main: "Main",
    cat_desserts: "Desserts",
    none: "General Dining",
    birthday: "Birthday",
    anniversary: "Anniversary",
    business: "Business Meeting",
    date_night: "Date Night",
    proposal: "Marriage Proposal",
    graduation: "Graduation Celebration",
    other: "Other Special Occasion",
    // Dish Names
    "Chikwangue Heritage": "Chikwangue Heritage",
    "Madesu ya Nyama": "Madesu ya Nyama",
    "Soso ya Kotika": "Soso ya Kotika",
    "Makayabu with Onions": "Makayabu with Onions",
    "Mikate Pili-Pili Combo": "Mikate Pili-Pili Combo",
    "Fumbwa aux Poissons Salés": "Fumbwa with Salted Fish",
    // Dish Descriptions
    moambe_desc: "The soul of the Congo. Succulent chicken slow-braised in a rich, velvety palm nut cream, enriched with local spices. Served with a side of white rice and fresh batonnets de manioc.",
    liboke_desc: "Fresh tilapia fillets marinated in 'Pili-Pili' peppers, lemon, and wild herbs, wrapped in authentic banana leaves and steamed over charcoal.",
    kamundele_desc: "Traditional market-style beef skewers, marinated in a blend of ginger, garlic, and Congolese spice mixes, charcoal-grilled to a smoky finish.",
    pondu_desc: "Slow-cooked cassava leaves (Saka-Saka) pounded with palm oil, garlic, and leeks. A vegetarian staple that defines the Congolese diet.",
    mikate_desc: "A classic breakfast delight. Warm, fluffy fried dough balls served with a side of authentic roasted peanut butter and organic honey.",
    ntaba_desc: "Tender chunks of goat meat, flame-grilled and seasoned with coarse salt and hot Pili-Pili. Served with Chikwangue.",
    makemba_desc: "Perfectly ripened yellow plantains, sliced and caramelized to a golden brown. The quintessential Congolese side dish.",
    chikwangue_desc: "Authentic fermented cassava bread, wrapped in banana leaves. Dense, slightly tangy, and the perfect companion for Moambé or Pondu.",
    madesu_desc: "White beans slow-cooked in a rich tomato and onion base with tender pieces of beef and a hint of Congolese nutmeg.",
    soso_kotika_desc: "Traditional Congolese grilled chicken, marinated in a secret blend of wild herbs and lime, then smoked over open coals for an earthy finish.",
    makayabu_desc: "Premium salted cod (Makayabu) sautéed with plenty of onions, garlic, and fresh bell peppers. A savory delicacy with a deep maritime soul.",
    mikate_pili_desc: "Fluffy golden fried dough balls served with our house-made 'Pili-Pili' volcanic hot sauce. A daring start to your morning.",
    fumbwa_desc: "Wild Gnetum leaves shredded and simmered in a creamy peanut butter sauce with sun-dried salted fish. A nutrient-dense masterpiece of the Kongo region."
  },
  fr: {
    reserve: "Réserver une table",
    cuisine: "Cuisine",
    heritage: "Héritage",
    journal: "Journal",
    visit: "Visite",
    about: "À Propos",
    seeMenu: "Voir le menu",
    bookTable: "Réserver",
    newMenu: "Nouveau menu de saison disponible",
    topRated: "Mieux noté",
    michelin: "Guide Michelin '24",
    curated: "Délices Sélectionnés",
    handPicked: "Ingrédients cueillis à la main, préparés avec passion et précision technique congolaise.",
    orderNow: "Commander",
    bookATable: "Réserver une table",
    securePerfect: "Réservez le cadre idéal pour une expérience culinaire inoubliable.",
    date: "Date",
    time: "Heure",
    guests: "Convives",
    occasion: "Occasion",
    fullName: "Nom complet",
    phone: "Numéro de téléphone",
    special_requests: "Instructions Spéciales",
    requestWindow: "Siège côté fenêtre",
    confirmReserve: "Confirmer la réservation",
    joinClub: "Rejoindre le Club Elengi",
    stayUpdated: "Restez informé de nos derniers menus, événements exclusifs et secrets culinaires.",
    subscribe: "S'abonner",
    orderWhatsapp: "Commande WhatsApp",
    privacy: "Confidentialité",
    terms: "Conditions",
    stories: "Dernières nouvelles",
    viewAll: "Toutes les histoires",
    storyDetails: "Détails de l'histoire",
    ourStories: "Nos histoires",
    backToStories: "Retour aux histoires",
    cat_all: "Tous",
    cat_breakfast: "Petit-déjeuner",
    cat_main: "Plats",
    cat_desserts: "Desserts",
    none: "Repas Général",
    birthday: "Anniversaire",
    anniversary: "Anniversaire de Mariage",
    business: "Réunion d'Affaires",
    date_night: "Rendez-vous Galant",
    proposal: "Demande en Mariage",
    graduation: "Célébration de Remise de Diplôme",
    other: "Autre Occasion Spéciale",
    // Dish Names
    "Chikwangue Heritage": "Chikwangue Héritage",
    "Madesu ya Nyama": "Madesu ya Nyama",
    "Soso ya Kotika": "Soso ya Kotika (Poulet Grillé)",
    "Makayabu with Onions": "Makayabu aux Oignons",
    "Mikate Pili-Pili Combo": "Combo Mikate & Pili-Pili",
    "Fumbwa aux Poissons Salés": "Fumbwa aux Poissons Salés",
    // Dish Descriptions
    moambe_desc: "L'âme du Congo. Poulet succulent mijoté dans une crème de noix de palme riche et veloutée. Servi avec riz blanc et bâtonnets de manioc.",
    liboke_desc: "Filets de tilapia frais marinés au piment 'Pili-Pili', citron et herbes sauvages, enveloppés dans des feuilles de bananier et cuits à la vapeur.",
    kamundele_desc: "Brochettes de bœuf traditionnelles style marché, marinées dans un mélange de gingembre et d'ail, grillées au charbon de bois.",
    pondu_desc: "Feuilles de manioc (Saka-Saka) pilées avec de l'huile de palme, de l'ail et des poireaux. Un classique végétarien congolais.",
    mikate_desc: "Un délice classique pour le petit-déjeuner. Boules de pâte frites chaudes et moelleuses servies avec du beurre de cacahuète grillé.",
    ntaba_desc: "Morceaux tendres de viande de chèvre, grillés à la flamme et assaisonnés au sel marin et Pili-Pili fort. Servi avec Chikwangue.",
    makemba_desc: "Bananes plantains jaunes parfaitement mûres, tranchées et caramélisées. L'accompagnement congolais par excellence.",
    chikwangue_desc: "Pain de manioc fermenté authentique, enveloppé dans des feuilles de bananier. Dense, légèrement acidulé, le compagnon idéal de la Moambé ou du Pondu.",
    madesu_desc: "Haricots blancs mijotés dans une base de tomate et d'oignons avec des morceaux de bœuf tendres et une touche de noix de muscade congolaise.",
    soso_kotika_desc: "Poulet grillé traditionnel congolais, mariné dans un mélange secret d'herbes sauvages et de citron vert, puis fumé au charbon de bois.",
    makayabu_desc: "Morue salée de première qualité (Makayabu) sautée avec des oignons, de l'ail et des poivrons frais. Un délice savoureux au caractère marin.",
    mikate_pili_desc: "Boules de pâte frites dorées servies avec notre sauce piquante volcanique 'Pili-Pili' maison. Un début de matinée audacieux.",
    fumbwa_desc: "Feuilles de Gnetum sauvage émincées et mijotées dans une sauce crémeuse à l'arachide avec du poisson salé séché au soleil. Un chef-d'œuvre nutritif."
  }
};

const DEFAULT_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'The Ritual of Pondu',
    slug: 'ritual-of-pondu',
    excerpt: 'Explore the labor of love behind pounding cassava leaves...',
    content: 'Full story about the preparation of Pondu and its cultural significance in modern Congo...',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1000&auto=format&fit=crop',
    status: 'published',
    category: 'Heritage',
    date: 'May 10, 2024'
  }
];

const DEFAULT_CONFIG: SiteConfig = {
  siteName: "ELENGI YA MALEWA",
  hero: {
    title: "The Heart of",
    accentWord: "Congo",
    description: "Experience the vibrant spirit of Congolese Gastronomy. From the banks of the mighty river to your plate, a journey of spice and soul.",
    buttonText: "See the Menu",
    secondaryButtonText: "Book Your Table",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2070&auto=format&fit=crop"
  },
  about: {
    title: "About Us",
    subtitle: "A journey through three generations of Congolese culinary excellence and modern innovation.",
    quote: {
      text: "Cuisine is the only art that satisfies all senses simultaneously. In Elengi, we find the soul of our ancestors.",
      author: "Chef Mukuna",
      role: "Executive Culinary Director"
    },
    sections: [
      { id: '1', title: 'Our Story', text: 'Founded in the heart of Kinshasa and reborn in Johannesburg, Elengi Ya Malewa is the culmination of three generations of culinary excellence. What started as a small family malewa has evolved into a beacon of modern African gastronomy.', image: 'https://images.unsplash.com/photo-1528605248644-14dd04cb21c7?q=80&w=1000&auto=format&fit=crop' },
      { id: '2', title: 'Our Mission', text: 'To bridge cultures through the universal language of food, bringing the vibrant, bold, and sophisticated flavors of the Congo to the world stage with uncompromised authenticity.', image: 'https://images.unsplash.com/photo-1550966842-28c456303271?q=80&w=1000&auto=format&fit=crop' }
    ]
  },
  stats: [
    { id: '1', label: 'Years Experience', value: '15+' },
    { id: '2', label: 'Happy Customers', value: '24k' },
    { id: '3', label: 'Organic Sourced', value: '100%' },
    { id: '4', label: 'Average Rating', value: '4.9' }
  ],
  footer: {
    whatsapp: "+27 65 845 6336",
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      facebook: "https://facebook.com"
    }
  },
  experience: {
    title: "Heritage Reimagined",
    items: [
      { id: '1', title: 'Ancestral Fire', description: 'Experience clay pot cooking...', icon: 'Sparkles', color: 'orange' },
      { id: '2', title: 'Spice Alchemy', description: 'Hand-blended spices...', icon: 'Utensils', color: 'rose' }
    ]
  },
  design: {
    primaryColor: '#f97316',
    accentColor: '#f43f5e',
    borderRadius: '24px',
    fontFamily: 'Plus Jakarta Sans',
    glassOpacity: '0.8',
    theme: 'dark'
  },
  seo: {
    title: "Elengi Ya Malewa | Modern Congolese Gastronomy",
    description: "Luxury culinary journey...",
    keywords: "Congolese, fine dining"
  },
  sections: [
    { id: 'hero', name: 'Hero', visible: true, order: 0 },
    { id: 'about', name: 'About Us', visible: true, order: 1 },
    { id: 'roots', name: 'Our Roots', visible: true, order: 2 },
    { id: 'experience', name: 'Experience', visible: true, order: 3 },
    { id: 'stats', name: 'Statistics', visible: true, order: 4 },
    { id: 'menu', name: 'Menu', visible: true, order: 5 },
    { id: 'blog', name: 'Latest News', visible: true, order: 6 },
    { id: 'reserve', name: 'Reservations', visible: true, order: 7 }
  ],
  navigation: [
    { id: 'n1', label: 'cuisine', target: 'menu' },
    { id: 'n2', label: 'heritage', target: 'experience' },
    { id: 'n3', label: 'about', target: 'about' },
    { id: 'n4', label: 'journal', target: 'blog' },
    { id: 'n5', label: 'visit', target: 'location' }
  ]
};

interface SiteContextType {
  config: SiteConfig;
  menuItems: MenuItem[];
  posts: Post[];
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  updateMenuItems: (newItems: MenuItem[]) => void;
  updatePosts: (newPosts: Post[]) => void;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('saspolo_lang') as Language || 'en');
  const [config, setConfig] = useState<SiteConfig>(() => JSON.parse(localStorage.getItem('saspolo_config_v11') || JSON.stringify(DEFAULT_CONFIG)));
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => JSON.parse(localStorage.getItem('saspolo_menu_v11') || JSON.stringify(INITIAL_MENU)));
  const [posts, setPosts] = useState<Post[]>(() => JSON.parse(localStorage.getItem('saspolo_posts_v11') || JSON.stringify(DEFAULT_POSTS)));

  useEffect(() => localStorage.setItem('saspolo_config_v11', JSON.stringify(config)), [config]);
  useEffect(() => localStorage.setItem('saspolo_menu_v11', JSON.stringify(menuItems)), [menuItems]);
  useEffect(() => localStorage.setItem('saspolo_posts_v11', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('saspolo_lang', language), [language]);

  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const updateConfig = (newConfig: Partial<SiteConfig>) => setConfig(prev => ({ ...prev, ...newConfig }));
  const updateMenuItems = (newItems: MenuItem[]) => setMenuItems(newItems);
  const updatePosts = (newPosts: Post[]) => setPosts(newPosts);
  const resetToDefaults = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <SiteContext.Provider value={{ config, menuItems, posts, language, setLanguage, t, updateConfig, updateMenuItems, updatePosts, resetToDefaults }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
