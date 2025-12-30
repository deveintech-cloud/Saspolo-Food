
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, MenuItem, MenuCategory, Post, NavItem } from './types.ts';
import { MENU_ITEMS as INITIAL_MENU } from './constants.tsx';

const DEFAULT_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'The Ritual of Pondu',
    slug: 'ritual-of-pondu',
    excerpt: 'Explore the labor of love behind pounding cassava leaves, a tradition passed down through generations of Congolese mothers.',
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
    excerpt: 'How the Congo River shapes our seasonal fish menus and the ancient art of Liboke leaf-wrapping.',
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
    title: "Heritage Reimagined",
    items: [
      { id: '1', title: 'Ancestral Fire', description: 'Experience the deep, earth-bound flavors of traditional clay pot cooking and open-flame grilling.', icon: 'Sparkles', color: 'orange' },
      { id: '2', title: 'Spice Alchemy', description: 'Our chefs balance heat and aroma using hand-blended spices sourced directly from local cooperatives.', icon: 'Utensils', color: 'rose' },
      { id: '3', title: 'Modern Vision', description: 'Traditional Congolese recipes presented with contemporary flair, honoring the past while embracing the future.', icon: 'Camera', color: 'purple' }
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
    { id: 'n1', label: 'Cuisine', target: 'menu' },
    { id: 'n2', label: 'Heritage', target: 'experience' },
    { id: 'n3', label: 'Journal', target: 'blog' },
    { id: 'n4', label: 'Visit', target: 'location' }
  ]
};

interface SiteContextType {
  config: SiteConfig;
  menuItems: MenuItem[];
  posts: Post[];
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  updateMenuItems: (newItems: MenuItem[]) => void;
  updatePosts: (newPosts: Post[]) => void;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <SiteContext.Provider value={{ config, menuItems, posts, updateConfig, updateMenuItems, updatePosts, resetToDefaults }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
