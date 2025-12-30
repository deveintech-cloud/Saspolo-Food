
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, MenuItem, MenuCategory, Post, NavItem, Language } from './types.ts';
import { MENU_ITEMS as INITIAL_MENU } from './constants.tsx';

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // UI Labels
    reserve: "Reserve Table",
    cuisine: "Cuisine",
    heritage: "Heritage",
    journal: "Journal",
    visit: "Visit",
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
    guests: "Guests",
    fullName: "Full Name",
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
    yearsExp: "Years Experience",
    happyCust: "Happy Customers",
    organicSrc: "Organic Sourced",
    avgRating: "Average Rating",
    
    // Experience Content
    exp_title: "Heritage Reimagined",
    item_1_title: "Ancestral Fire",
    item_1_desc: "Experience the deep, earth-bound flavors of traditional clay pot cooking and open-flame grilling.",
    item_2_title: "Spice Alchemy",
    item_2_desc: "Our chefs balance heat and aroma using hand-blended spices sourced directly from local cooperatives.",
    item_3_title: "Modern Vision",
    item_3_desc: "Traditional Congolese recipes presented with contemporary flair, honoring the past while embracing the future.",
    
    // Menu Category
    cat_all: "All",
    cat_breakfast: "Breakfast",
    cat_main: "Main",
    cat_desserts: "Desserts",

    // Menu Item Translations
    "Poulet à la Moambé Heritage": "Poulet à la Moambé Heritage",
    "moambe_desc": "The soul of the Congo. Succulent chicken slow-braised in a rich, velvety palm nut cream, enriched with local spices. Served with a side of white rice and fresh batonnets de manioc.",
    "Liboke ya Mpunda": "Liboke ya Mpunda",
    "liboke_desc": "Fresh tilapia fillets marinated in 'Pili-Pili' peppers, lemon, and wild herbs, wrapped in authentic banana leaves and steamed over charcoal.",
    "Kamundele (Beef Skewers)": "Kamundele (Beef Skewers)",
    "kamundele_desc": "Traditional market-style beef skewers, marinated in a blend of ginger, garlic, and Congolese spice mixes, charcoal-grilled to a smoky finish.",
    "Authentic Pondu & Fufu": "Authentic Pondu & Fufu",
    "pondu_desc": "Slow-cooked cassava leaves (Saka-Saka) pounded with palm oil, garlic, and leeks. A vegetarian staple that defines the Congolese diet.",
    "Mikate & Peanut Butter": "Mikate & Peanut Butter",
    "mikate_desc": "A classic breakfast delight. Warm, fluffy fried dough balls served with a side of authentic roasted peanut butter and organic honey.",
    "Grilled Ntaba Plate": "Grilled Ntaba Plate",
    "ntaba_desc": "Tender chunks of goat meat, flame-grilled and seasoned with coarse salt and hot Pili-Pili. Served with Chikwangue.",
    "Fried Makemba (Plantains)": "Fried Makemba (Plantains)",
    "makemba_desc": "Perfectly ripened yellow plantains, sliced and caramelized to a golden brown. The quintessential Congolese side dish.",

    // Blog Post Translations
    "The Ritual of Pondu": "The Ritual of Pondu",
    "pondu_post_exc": "Explore the labor of love behind pounding cassava leaves, a tradition passed down through generations of Congolese mothers.",
    "From the River to the Plate": "From the River to the Plate",
    "river_post_exc": "How the Congo River shapes our seasonal fish menus and the ancient art of Liboke leaf-wrapping."
  },
  fr: {
    // UI Labels
    reserve: "Réserver une table",
    cuisine: "Cuisine",
    heritage: "Héritage",
    journal: "Journal",
    visit: "Visite",
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
    guests: "Convives",
    fullName: "Nom complet",
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
    yearsExp: "Années d'expérience",
    happyCust: "Clients Heureux",
    organicSrc: "Source Biologique",
    avgRating: "Note Moyenne",

    // Experience Content
    exp_title: "L'Héritage Réinventé",
    item_1_title: "Le Feu Ancestral",
    item_1_desc: "Découvrez les saveurs profondes et terrestres de la cuisine traditionnelle en pot d'argile et des grillades à la flamme.",
    item_2_title: "Alchimie des Épices",
    item_2_desc: "Nos chefs équilibrent chaleur et arôme en utilisant des épices mélangées à la main provenant directement de coopératives locales.",
    item_3_title: "Vision Moderne",
    item_3_desc: "Recettes traditionnelles congolaises présentées avec une touche contemporaine, honorant le passé tout en embrassant l'avenir.",
    
    // Menu Category
    cat_all: "Tous",
    cat_breakfast: "Petit-déjeuner",
    cat_main: "Plats",
    cat_desserts: "Desserts",

    // Menu Item Translations
    "Poulet à la Moambé Heritage": "Poulet à la Moambé Héritage",
    "moambe_desc": "L'âme du Congo. Poulet succulent mijoté dans une crème de noix de palme riche et veloutée. Servi avec riz blanc et bâtonnets de manioc.",
    "Liboke ya Mpunda": "Liboke ya Mpunda (Poisson en papillote)",
    "liboke_desc": "Filets de tilapia frais marinés au piment 'Pili-Pili', citron et herbes sauvages, enveloppés dans des feuilles de bananier et cuits à la vapeur.",
    "Kamundele (Beef Skewers)": "Kamundele (Brochettes de bœuf)",
    "kamundele_desc": "Brochettes de bœuf traditionnelles style marché, marinées dans un mélange de gingembre et d'ail, grillées au charbon de bois.",
    "Authentic Pondu & Fufu": "Pondu Authentique & Fufu",
    "pondu_desc": "Feuilles de manioc (Saka-Saka) pilées avec de l'huile de palme, de l'ail et des poireaux. Un classique végétarien congolais.",
    "Mikate & Peanut Butter": "Mikate & Beurre de Cacahuète",
    "mikate_desc": "Un délice classique pour le petit-déjeuner. Boules de pâte frites chaudes et moelleuses servies avec du beurre de cacahuète grillé.",
    "Grilled Ntaba Plate": "Ntaba Grillé (Chèvre)",
    "ntaba_desc": "Morceaux tendres de viande de chèvre, grillés à la flamme et assaisonnés au sel marin et Pili-Pili fort. Servi avec Chikwangue.",
    "Fried Makemba (Plantains)": "Makemba Frits (Bananes Plantains)",
    "makemba_desc": "Bananes plantains jaunes parfaitement mûres, tranchées et caramélisées. L'accompagnement congolais par excellence.",

    // Blog Post Translations
    "The Ritual of Pondu": "Le Rituel du Pondu",
    "pondu_post_exc": "Découvrez le travail passionné derrière le pilage des feuilles de manioc, une tradition transmise de mère en fille.",
    "From the River to the Plate": "Du Fleuve à l'Assiette",
    "river_post_exc": "Comment le fleuve Congo façonne nos menus de poissons de saison et l'art ancien du Liboke."
  }
};

const DEFAULT_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'The Ritual of Pondu',
    slug: 'ritual-of-pondu',
    excerpt: 'pondu_post_exc',
    content: 'Full story about the preparation of Pondu and its cultural significance...',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1000&auto=format&fit=crop',
    status: 'published',
    category: 'Heritage',
    date: 'May 10, 2024'
  },
  {
    id: 'p2',
    title: 'From the River to the Plate',
    slug: 'river-gastronomy',
    excerpt: 'river_post_exc',
    content: 'Detailed look at river-based sourcing and traditional steaming methods...',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop',
    status: 'published',
    category: 'Sourcing',
    date: 'May 22, 2024'
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
  experience: {
    title: "exp_title",
    items: [
      { id: '1', title: 'item_1_title', description: 'item_1_desc', icon: 'Sparkles', color: 'orange' },
      { id: '2', title: 'item_2_title', description: 'item_2_desc', icon: 'Utensils', color: 'rose' },
      { id: '3', title: 'item_3_title', description: 'item_3_desc', icon: 'Camera', color: 'purple' }
    ]
  },
  design: {
    primaryColor: '#f97316',
    fontFamily: 'Plus Jakarta Sans',
    theme: 'dark'
  },
  seo: {
    title: "Elengi Ya Malewa | Modern Congolese Gastronomy",
    description: "A luxury culinary journey featuring curated Congolese seasonal menus and fine dining techniques.",
    keywords: "Congolese restaurant, fine dining, Moambe, Liboke, modern African food"
  },
  sections: [
    { id: 'hero', name: 'Hero', visible: true, order: 0 },
    { id: 'experience', name: 'Experience', visible: true, order: 1 },
    { id: 'stats', name: 'Statistics', visible: true, order: 2 },
    { id: 'menu', name: 'Menu', visible: true, order: 3 },
    { id: 'blog', name: 'Latest News', visible: true, order: 4 },
    { id: 'reserve', name: 'Reservations', visible: true, order: 5 }
  ],
  navigation: [
    { id: 'n1', label: 'cuisine', target: 'menu' },
    { id: 'n2', label: 'heritage', target: 'experience' },
    { id: 'n3', label: 'journal', target: 'blog' },
    { id: 'n4', label: 'visit', target: 'location' }
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
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('saspolo_lang');
    return (saved as Language) || 'en';
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('saspolo_config_v6');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('saspolo_menu_v6');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('saspolo_posts_v6');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('saspolo_config_v6', JSON.stringify(config));
    document.title = config.seo.title;
  }, [config]);

  useEffect(() => {
    localStorage.setItem('saspolo_menu_v6', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('saspolo_posts_v6', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('saspolo_lang', language);
  }, [language]);

  const t = (key: string) => {
    if (!key) return '';
    return TRANSLATIONS[language][key] || key;
  };

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
  };

  const updatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG);
    setMenuItems(INITIAL_MENU);
    setPosts(DEFAULT_POSTS);
    localStorage.removeItem('saspolo_config_v6');
    localStorage.removeItem('saspolo_menu_v6');
    localStorage.removeItem('saspolo_posts_v6');
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
