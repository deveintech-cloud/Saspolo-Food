
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, MenuItem, MenuCategory, Post, NavItem, Language } from './types.ts';
import { MENU_ITEMS as INITIAL_MENU } from './constants.tsx';

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    reserve: "Secure a Table",
    cuisine: "The Menu",
    heritage: "The Legacy",
    journal: "Chronicles",
    visit: "The Destination",
    about: "Our Soul",
    seeMenu: "Explore the Menu",
    bookTable: "Reserve Now",
    newMenu: "Summer Harvest Menu Available",
    topRated: "Exceptional",
    michelin: "World Class Standards",
    curated: "Signature Gastronomy",
    handPicked: "Rare ingredients prepared with ancestral passion and modern Congolese precision.",
    orderNow: "Bespoke Order",
    bookATable: "Bespoke Reservations",
    securePerfect: "An intimate setting where the spirit of Kinshasa meets world-class hospitality.",
    date: "Preferred Date",
    time: "Dining Time",
    guests: "Intimate Group",
    occasion: "Celebration",
    fullName: "Guest Name",
    phone: "Contact Details",
    special_requests: "Personal Requests",
    requestWindow: "Preferred Seating",
    confirmReserve: "Finalize Reservation",
    joinClub: "The Elengi Inner Circle",
    stayUpdated: "Access private events, seasonal harvest news, and culinary secrets from the heart of Africa.",
    subscribe: "Join Now",
    orderWhatsapp: "Direct Concierge",
    privacy: "Confidentiality",
    terms: "Protocols",
    stories: "From the Archive",
    viewAll: "View All Chronicles",
    storyDetails: "Chronicle Details",
    ourStories: "The Archives",
    backToStories: "Return to Library",
    cat_all: "Collection",
    cat_breakfast: "Dawn",
    cat_main: "Mains",
    cat_desserts: "Finale",
    none: "General Dining",
    birthday: "Anniversary of Birth",
    anniversary: "Union Celebration",
    business: "Executive Meeting",
    date_night: "Private Encounter",
    proposal: "Life Milestone",
    graduation: "Academic Merit",
    other: "Custom Celebration",
    
    // Hero
    hero_title: "Congo",
    hero_accent: "au Cœur de l'Afrique",
    hero_desc: "A sensory odyssey into the refined spirit of Congolese Gastronomy. A journey of earth, river, and fire.",
    
    // About
    about_subtitle: "The evolution of a family Malewa into a global beacon of modern African excellence.",
    about_quote: "Gastronomy is the only art form that enters the soul through all senses. At Elengi, we honor the vibration of our land.",
    about_chef_role: "Culinary Visionary",
    about_sec1_title: "The Genesis",
    about_sec1_text: "Born in the electric streets of Kinshasa and refined in the cosmopolitan pulse of Johannesburg, Elengi is the bridge between traditional street Malewas and high-performance gastronomy. We honor the 'Malewa' spirit—unpretentious, soulful, and deeply community-oriented—while elevating it with contemporary techniques.",
    about_sec2_title: "The Ethos",
    about_sec2_text: "Our mission is to decolonize the fine dining experience, proving that Congolese flavors are as sophisticated, complex, and profound as any on the global stage. We source exclusively from small-holder farmers across the Congo Basin, ensuring every bite supports the hands that tilled the soil.",
    about_sec3_title: "The Vision",
    about_sec3_text: "We envision a world where African culinary heritage is celebrated not as an exotic novelty, but as a pillar of global high-culture. Elengi is more than a restaurant; it is a cultural institute dedicated to the preservation of flavor.",

    // Roots
    roots_tag: "Our Roots",
    roots_title_pre: "Ancestral Heritage in",
    roots_desc: "We are the children of the Congo Basin. Our kitchen is a sanctuary for the flavors born from the world's second-largest rainforest and the life-giving currents of the mighty river.",
    roots_geo_title: "Terroir",
    roots_geo_desc: "Our ingredients are defined by the fertile silt and volcanic soils unique to the heart of the continent.",
    roots_inf_title: "Synthesis",
    roots_inf_desc: "A masterful blend of Pre-colonial preservation and contemporary French-Congolese culinary techniques.",

    // Heritage
    heritage_tag: "THE ANCESTRAL CODE",
    heritage_odyssey: "A Masterful",
    heritage_culinary: "Symphony",
    heritage_main_desc: "We guard the sacred pillars of Congolese cuisine, breathing new life into techniques that have echoed across the river for centuries.",
    heritage_pillar1_title: "Sacred Smoke",
    heritage_pillar1_tag: "ELEMENTAL",
    heritage_pillar1_desc: "We utilize ancient charcoal-smoking rituals and artisanal clay pots (Nungu) to infuse every dish with the earthy resonance of the African hearth.",
    heritage_pillar2_title: "River Life",
    heritage_pillar2_tag: "MAI-NDOMBE",
    heritage_pillar2_desc: "The Congo River is our primary source. We respect the water's seasonality, sourcing wild-caught Tilapia and rare aquatic botanicals.",
    heritage_pillar3_title: "Botanical Alchemy",
    heritage_pillar3_tag: "FOREST FLOOR",
    heritage_pillar3_desc: "From Fumbwa to Saka-Saka, we transform the forest floor into a high-nutrition masterpiece using labor-intensive pounding and reduction techniques.",
    heritage_craftsmanship: "Artisan Precision",
    heritage_pantry_title: "The Curator's Pantry",
    heritage_pantry_desc: "The raw elements that form our distinctive flavor architecture.",

    // Stats
    stat_years_label: "Generations of Legacy",
    stat_customers_label: "Global Guests",
    stat_organic_label: "Direct-to-Farm",
    stat_rating_label: "Guest Excellence",

    // Dish Names & Descs
    "Chikwangue Heritage": "Chikwangue Heritage",
    "Madesu ya Nyama": "Madesu ya Nyama",
    "Soso ya Kotika": "Soso ya Kotika",
    "Makayabu with Onions": "Makayabu with Onions",
    "Mikate Pili-Pili Combo": "Mikate Pili-Pili Combo",
    "Fumbwa aux Poissons Salés": "Fumbwa with Salted Fish"
  },
  fr: {
    // Nav & General
    reserve: "Réserver une Table",
    cuisine: "La Carte",
    heritage: "L’Héritage",
    journal: "Les Chroniques",
    visit: "La Destination",
    about: "Notre Âme",
    seeMenu: "Découvrir la Carte",
    bookTable: "Réserver",
    newMenu: "Menu Récolte d'Été disponible",
    topRated: "Exceptionnel",
    michelin: "Standards Mondiaux",
    curated: "Gastronomie Signature",
    handPicked: "Ingrédients rares préparés avec passion ancestrale et précision congolaise moderne.",
    orderNow: "Commande sur Mesure",
    bookATable: "Réservations Privées",
    securePerfect: "Un cadre intimiste où l'esprit de Kinshasa rencontre l'hospitalité de classe mondiale.",
    date: "Date Souhaitée",
    time: "Heure du Repas",
    guests: "Groupe Intimiste",
    occasion: "Célébration",
    fullName: "Nom de l'Invité",
    phone: "Coordonnées",
    special_requests: "Demandes Personnelles",
    requestWindow: "Préférence de Placement",
    confirmReserve: "Finaliser la Réservation",
    joinClub: "Le Cercle Elengi",
    stayUpdated: "Accédez à des événements privés, aux nouvelles des récoltes et aux secrets culinaires du cœur de l'Afrique.",
    subscribe: "S'inscrire",
    orderWhatsapp: "Conciergerie Directe",
    privacy: "Confidentialité",
    terms: "Protocoles",
    stories: "Depuis les Archives",
    viewAll: "Toutes les Chroniques",
    storyDetails: "Détails de la Chronique",
    ourStories: "Les Archives",
    backToStories: "Retour à la Bibliothèque",
    cat_all: "Collection",
    cat_breakfast: "L'Aube",
    cat_main: "Plats",
    cat_desserts: "Finale",
    none: "Repas Général",
    birthday: "Anniversaire de Naissance",
    anniversary: "Célébration d'Union",
    business: "Réunion Exécutive",
    date_night: "Rencontre Privée",
    proposal: "Étape de Vie",
    graduation: "Mérite Académique",
    other: "Célébration Personnalisée",
    
    // Hero
    hero_title: "Congo",
    hero_accent: "au Cœur de l'Afrique",
    hero_desc: "Une odyssée sensorielle dans l'esprit raffiné de la gastronomie congolaise. Un voyage de terre, de fleuve et de feu.",
    
    // About
    about_subtitle: "L'évolution d'une Malewa familiale en un phare mondial de l'excellence africaine moderne.",
    about_quote: "La gastronomie est la seule forme d'art qui pénètre l'âme par tous les sens. Chez Elengi, nous honorons la vibration de notre terre.",
    about_chef_role: "Visionnaire Culinaire",
    about_sec1_title: "La Genèse",
    about_sec1_text: "Né dans les rues électriques de Kinshasa et affiné dans le pouls cosmopolite de Johannesburg, Elengi est le pont entre les Malewas traditionnelles et la gastronomie de haute performance. Nous honorons l'esprit 'Malewa'—simple, profond et communautaire—tout en l'élevant avec des techniques contemporaines.",
    about_sec2_title: "L'Ethos",
    about_sec2_text: "Notre mission est de décoloniser l'expérience gastronomique, prouvant que les saveurs congolaises sont aussi sophistiquées, complexes et profondes que n'importe quelle autre sur la scène mondiale. Nous nous approvisionnons exclusivement auprès de petits exploitants du bassin du Congo.",
    about_sec3_title: "La Vision",
    about_sec3_text: "Nous envisageons un monde où l'héritage culinaire africain est célébré non pas comme une nouveauté exotique, mais comme un pilier de la haute culture mondiale. Elengi est plus qu'un restaurant; c'est un institut culturel dédié à la préservation des saveurs.",

    // Roots
    roots_tag: "Nos Racines",
    roots_title_pre: "Héritage Ancestral au",
    roots_desc: "Nous sommes les enfants du bassin du Congo. Notre cuisine est un sanctuaire pour les saveurs nées de la deuxième plus grande forêt tropicale du monde et des courants du fleuve majestueux.",
    roots_geo_title: "Terroir",
    roots_geo_desc: "Nos ingrédients sont définis par le limon fertile et les sols volcaniques uniques au cœur du continent.",
    roots_inf_title: "Synthèse",
    roots_inf_desc: "Un mélange magistral de préservation précoloniale et de techniques culinaires franco-congolaises contemporaines.",

    // Heritage
    heritage_tag: "LE CODE ANCESTRAL",
    heritage_odyssey: "Une Symphonie",
    heritage_culinary: "Magistrale",
    heritage_main_desc: "Nous gardons les piliers sacrés de la cuisine congolaise, redonnant vie à des techniques qui résonnent à travers le fleuve depuis des siècles.",
    heritage_pillar1_title: "Fumée Sacrée",
    heritage_pillar1_tag: "ÉLÉMENTAIRE",
    heritage_pillar1_desc: "Nous utilisons d'anciens rituels de fumage au charbon de bois et des pots d'argile artisanaux (Nungu) pour infuser chaque plat de la résonance terreuse du foyer africain.",
    heritage_pillar2_title: "Vie du Fleuve",
    heritage_pillar2_tag: "MAI-NDOMBE",
    heritage_pillar2_desc: "Le fleuve Congo est notre source principale. Nous respectons la saisonnalité de l'eau, en nous approvisionnant en tilapia sauvage et en plantes aquatiques rares.",
    heritage_pillar3_title: "Alchimie Botanique",
    heritage_pillar3_tag: "SOUS-BOIS",
    heritage_pillar3_desc: "Du fumbwa au saka-saka, nous transformons le sous-bois en chefs-d'œuvre nutritifs grâce à des techniques intensives de pilonnage et de réduction.",
    heritage_craftsmanship: "Précision Artisanale",
    heritage_pantry_title: "Le Garde-manger du Curateur",
    heritage_pantry_desc: "Les éléments bruts qui forment l'architecture distinctive de nos saveurs.",

    // Stats
    stat_years_label: "Générations d'Héritage",
    stat_customers_label: "Invités Internationaux",
    stat_organic_label: "Direct Producteur",
    stat_rating_label: "Excellence Client",

    // Dish Names & Descs
    "Chikwangue Heritage": "Chikwangue Héritage",
    "Madesu ya Nyama": "Madesu ya Nyama",
    "Soso ya Kotika": "Soso ya Kotika (Poulet Grillé)",
    "Makayabu with Onions": "Makayabu aux Oignons",
    "Mikate Pili-Pili Combo": "Combo Mikate & Pili-Pili",
    "Fumbwa aux Poissons Salés": "Fumbwa aux Poissons Salés"
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
    title: "hero_title",
    accentWord: "hero_accent",
    description: "hero_desc",
    buttonText: "seeMenu",
    secondaryButtonText: "bookTable",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2070&auto=format&fit=crop"
  },
  about: {
    title: "about",
    subtitle: "about_subtitle",
    quote: {
      text: "about_quote",
      author: "Chef Mukuna",
      role: "about_chef_role"
    },
    sections: [
      { id: '1', title: 'about_sec1_title', text: 'about_sec1_text', image: 'https://images.unsplash.com/photo-1528605248644-14dd04cb21c7?q=80&w=1000&auto=format&fit=crop' },
      { id: '2', title: 'about_sec2_title', text: 'about_sec2_text', image: 'https://images.unsplash.com/photo-1550966842-28c456303271?q=80&w=1000&auto=format&fit=crop' },
      { id: '3', title: 'about_sec3_title', text: 'about_sec3_text', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop' }
    ]
  },
  stats: [
    { id: '1', label: 'stat_years_label', value: '3' },
    { id: '2', label: 'stat_customers_label', value: '45k+' },
    { id: '3', label: 'stat_organic_label', value: '100%' },
    { id: '4', label: 'stat_rating_label', value: '4.9' }
  ],
  footer: {
    whatsapp: "+27 65 845 6336",
    socials: {
      instagram: "https://instagram.com/elengi_malewa",
      twitter: "https://twitter.com/elengi_malewa",
      facebook: "https://facebook.com/elengi_malewa"
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
    title: "Elengi Ya Malewa | Modern Congolese Fine Dining & Heritage Gastronomy",
    description: "Immerse yourself in a luxury culinary odyssey at Elengi Ya Malewa. Discover refined Congolese techniques, ancestral heritage, and world-class fine dining.",
    keywords: "Congolese fine dining, African luxury restaurant, Elengi Ya Malewa, Moambe Heritage, modern African gastronomy, Johannesburg Congolese food, Kinshasa inspired dining"
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
