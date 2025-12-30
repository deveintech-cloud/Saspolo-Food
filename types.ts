
export enum MenuCategory {
  ALL = 'All',
  BREAKFAST = 'Breakfast',
  MAIN = 'Main',
  DESSERTS = 'Desserts'
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
  tags: string[];
  spicy?: boolean;
  healthy?: boolean;
  glutenFree?: boolean;
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
  hero: {
    title: string;
    accentWord: string;
    description: string;
    buttonText: string;
    secondaryButtonText: string;
    image: string;
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
    fontFamily: string;
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
