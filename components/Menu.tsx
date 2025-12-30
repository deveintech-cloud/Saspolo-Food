
import React, { useState, useMemo } from 'react';
import { Flame, Leaf, Wheat, MessageCircle, ArrowRight, Info, ChevronDown, ChevronUp, Activity } from 'lucide-react';
import { useSite } from '../SiteContext.tsx';
import { MenuCategory, MenuItem } from '../types.ts';

const Menu: React.FC = () => {
  const { menuItems, config, t, language } = useSite();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.ALL);
  const [expandedNutrition, setExpandedNutrition] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    if (activeCategory === MenuCategory.ALL) return menuItems;
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const handleWhatsAppOrder = (itemName: string, price: number) => {
    const phoneNumber = "27658456336";
    const msgTemplate = language === 'fr' 
      ? `Bonjour Elengi Ya Malewa, j'aimerais commander le plat ${t(itemName)} pour R${price}.` 
      : `Hello Elengi Ya Malewa, I would like to order the ${t(itemName)} for R${price}.`;
    const message = encodeURIComponent(msgTemplate);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const toggleNutrition = (id: string) => {
    setExpandedNutrition(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'All': return t('cat_all');
      case 'Breakfast': return t('cat_breakfast');
      case 'Main': return t('cat_main');
      case 'Desserts': return t('cat_desserts');
      default: return cat;
    }
  };

  return (
    <section id="menu" className="py-24 px-6 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white font-jakarta">{t('curated')}</h2>
            <p className="text-zinc-400 max-w-sm text-lg">{t('handPicked')}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl shadow-inner">
            {Object.values(MenuCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-zinc-800 text-white shadow-lg' 
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-zinc-900/50 border border-zinc-800/50 rounded-3xl overflow-hidden hover:bg-zinc-900 transition-all duration-500 flex flex-col"
              style={{ borderColor: activeCategory !== MenuCategory.ALL ? `${config.design.primaryColor}20` : 'rgba(255,255,255,0.05)' }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={t(item.name)} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {item.nutrition && (
                   <button 
                    onClick={() => toggleNutrition(item.id)}
                    className="absolute top-4 right-4 h-10 w-10 bg-zinc-950/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-orange-600 transition-all z-10"
                    title="Nutrition Info"
                   >
                     {expandedNutrition[item.id] ? <ChevronUp size={20} /> : <Activity size={18} />}
                   </button>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white font-jakarta">{t(item.name)}</h3>
                  <span className="font-bold text-lg" style={{ color: config.design.primaryColor }}>R{item.price}</span>
                </div>
                
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed flex-grow">{t(item.description)}</p>

                {/* Nutrition Expandable Section */}
                {item.nutrition && expandedNutrition[item.id] && (
                  <div className="mb-6 p-4 bg-zinc-950/50 rounded-2xl border border-white/5 animate-in slide-in-from-top duration-300">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Activity size={12} className="text-orange-500" />
                      Nutritional Value (Per Serving)
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {item.nutrition.calories && (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 uppercase font-black">Calories</span>
                          <span className="text-sm font-bold text-white">{item.nutrition.calories}</span>
                        </div>
                      )}
                      {item.nutrition.protein && (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 uppercase font-black">Protein</span>
                          <span className="text-sm font-bold text-white">{item.nutrition.protein}</span>
                        </div>
                      )}
                      {item.nutrition.fat && (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 uppercase font-black">Total Fat</span>
                          <span className="text-sm font-bold text-white">{item.nutrition.fat}</span>
                        </div>
                      )}
                      {item.nutrition.carbs && (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 uppercase font-black">Carbs</span>
                          <span className="text-sm font-bold text-white">{item.nutrition.carbs}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-4">
                    {item.spicy && (
                      <div className="flex items-center gap-1.5" title="Spicy">
                        <Flame size={14} className="text-orange-500" />
                      </div>
                    )}
                    {item.healthy && (
                      <div className="flex items-center gap-1.5" title="Healthy Choice">
                        <Leaf size={14} className="text-green-500" />
                      </div>
                    )}
                    {item.glutenFree && (
                      <div className="flex items-center gap-1.5" title="Gluten Optional">
                        <Wheat size={14} className="text-yellow-500" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => handleWhatsAppOrder(item.name, item.price)}
                    className="h-12 px-4 rounded-xl text-white flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg font-bold text-xs uppercase tracking-wider"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle size={18} />
                    {t('orderNow')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
