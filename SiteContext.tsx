
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, MenuItem, MenuCategory, Post, NavItem } from './types';
import { MENU_ITEMS as INITIAL_MENU } from './constants';

const DEFAULT_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'The Secret of Our Truffle Harvest',
    slug: 'secret-truffle-harvest',
    excerpt: 'Discover the traditional techniques we use to source the finest black truffles from the heart of the valley.',
    content: 'Full story about truffle hunting and quality assurance...',
    image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?q=80&w=1000&auto=format&fit=crop',
    status: 'published',
    category: 'Sourcing',
    date: 'March 15, 2024'
  },
  {
    id: 'p2',
    title: 'A New Era of Mixology',
    slug: 'new-era-mixology',
    excerpt: 'Our head bartender reveals the inspiration behind the Spring cocktail collection.',
    content: 'Deep dive into chemical gastronomy and flavor layering...',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
    status: 'published',
    category: 'Events',
    date: 'April 2, 2024'
  }
];

const DEFAULT_CONFIG: SiteConfig = {
  siteName: "SASPOLO",
  hero: {
    title: "Flavor that",
    accentWord: "ignites",
    description: "Experience a culinary journey where vibrant aesthetics meet traditional techniques. Saspolo defines modern gastronomy.",
    buttonText: "Order Now",
    secondaryButtonText: "View Full Menu",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
  },
  experience: {
    title: "The Saspolo Experience",
    items: [
      { id: '1', title: 'Atmosphere', description: 'Immerse yourself in a meticulously designed space where lighting and acoustics create a symphony.', icon: 'Sparkles', color: 'orange' },
      { id: '2', title: 'Craftsmanship', description: 'Our open kitchen allows you to witness the rhythmic precision of world-class chefs.', icon: 'Utensils', color: 'rose' },
      { id: '3', title: 'Visual Art', description: 'Every dish is a canvas. We believe that presentation is as vital to the experience as the flavor profile.', icon: 'Camera', color: 'purple' }
    ]
  },
  design: {
    primaryColor: '#f97316',
    fontFamily: 'Inter',
    theme: 'dark'
  },
  seo: {
    title: "Saspolo Food | Modern Gastronomy",
    description: "Luxury culinary experience featuring curated seasonal menus.",
    keywords: "restaurant, fine dining, gastronomy, modern food"
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
    { id: 'n1', label: 'Menu', target: 'menu' },
    { id: 'n2', label: 'Experience', target: 'experience' },
    { id: 'n3', label: 'News', target: 'blog' },
    { id: 'n4', label: 'Location', target: 'location' }
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
    const saved = localStorage.getItem('saspolo_config_v3');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('saspolo_menu_v3');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('saspolo_posts_v3');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('saspolo_config_v3', JSON.stringify(config));
    document.title = config.seo.title;
  }, [config]);

  useEffect(() => {
    localStorage.setItem('saspolo_menu_v3', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('saspolo_posts_v3', JSON.stringify(posts));
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
