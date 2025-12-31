
export type Language = 'en' | 'fr';

export enum MenuCategory {
  ALL = 'All',
  BREAKFAST = 'Breakfast',
  MAIN = 'Main',
  DESSERTS = 'Desserts'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  image: string;
  tags: string[];
  spicy?: boolean;
  healthy?: boolean;
  glutenFree?: boolean;
  nutrition?: {
    calories?: string;
    protein?: string;
    fat?: string;
    carbs?: string;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  status: 'draft' | 'published';
  category: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SectionConfig {
  id: string;
  name: string;
  visible: boolean;
  order: number;
}

export interface NavItem {
  id: string;
  label: string;
  target: string;
}

export interface SiteConfig {
  siteName: string;
  siteLogo?: string;
  hero: {
    title: string;
    accentWord: string;
    description: string;
    buttonText: string;
    secondaryButtonText: string;
    image: string;
  };
  about: {
    title: string;
    subtitle?: string;
    quote?: {
      text: string;
      author: string;
      role: string;
    };
    sections: {
      id: string;
      title: string;
      text: string;
      image: string;
    }[];
  };
  stats: {
    id: string;
    label: string;
    value: string;
  }[];
  footer: {
    whatsapp: string;
    socials: {
      instagram: string;
      twitter: string;
      facebook: string;
    };
  };
  experience: {
    title: string;
    items: {
      id: string;
      title: string;
      description: string;
      icon: string;
      color: string;
    }[];
  };
  design: {
    primaryColor: string;
    accentColor: string;
    borderRadius: string;
    fontFamily: 'Plus Jakarta Sans' | 'Inter' | 'Playfair Display' | 'Montserrat';
    glassOpacity: string;
    theme: 'dark' | 'light';
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  sections: SectionConfig[];
  navigation: NavItem[];
}
