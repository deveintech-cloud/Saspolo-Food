
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

  const handleWhatsAppOrder = (itemName: string) => {
    const phoneNumber = "27658456336";
    const msgTemplate = language === 'fr' 
      ? `Bonjour Elengi Ya Malewa, j'aimerais commander le plat ${t(itemName)}.` 
      : `Hello Elengi Ya Malewa, I would like to order the ${t(itemName)}.`;
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
    <section id="menu" className="py-20 md:py-24 px-4 md:px-6 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="space-y-3 md:space-y-4 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-jakarta">{t('curated')}</h2>
            <p className="text-zinc-400 max-w-sm mx-auto md:mx-0 text-base md:text-lg font-light">{t('handPicked')}</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-1.5 bg-zinc-900/50 border border-zinc-800 p-1 rounded-2xl">
            {Object.values(MenuCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-6 py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-900 transition-all duration-500 flex flex-col"
              style={{ 
                borderRadius: config.design.borderRadius,
                borderColor: activeCategory !== MenuCategory.ALL ? `${config.design.primaryColor}30` : 'rgba(255,255,255,0.05)' 
              }}
            >
              <div className="aspect-[4/3] overflow-hidden relative" style={{ borderTopLeftRadius: config.design.borderRadius, borderTopRightRadius: config.design.borderRadius }}>
                <img 
                  src={item.image} 
                  alt={t(item.name)} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {item.nutrition && (
                   <button 
                    onClick={() => toggleNutrition(item.id)}
                    className="absolute top-4 right-4 h-9 w-9 md:h-10 md:w-10 bg-zinc-950/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-orange-600 transition-all z-10"
                   >
                     {expandedNutrition[item.id] ? <ChevronUp size={18} /> : <Activity size={16} />}
                   </button>
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-white font-jakarta leading-tight pr-4">{t(item.name)}</h3>
                </div>
                
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed flex-grow font-light">{t(item.description)}</p>

                {/* Nutrition Expandable Section */}
                {item.nutrition && expandedNutrition[item.id] && (
                  <div className="mb-6 p-4 bg-zinc-950/50 rounded-2xl border border-white/5 animate-in slide-in-from-top duration-300">
                    <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <Activity size={12} className="text-orange-500" />
                      Nutrition
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                      {item.nutrition.calories && (
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-600 uppercase font-black">Calories</span>
                          <span className="text-xs font-bold text-white">{item.nutrition.calories}</span>
                        </div>
                      )}
                      {item.nutrition.protein && (
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-600 uppercase font-black">Protein</span>
                          <span className="text-xs font-bold text-white">{item.nutrition.protein}</span>
                        </div>
                      )}
                      {item.nutrition.fat && (
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-600 uppercase font-black">Fat</span>
                          <span className="text-xs font-bold text-white">{item.nutrition.fat}</span>
                        </div>
                      )}
                      {item.nutrition.carbs && (
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-600 uppercase font-black">Carbs</span>
                          <span className="text-xs font-bold text-white">{item.nutrition.carbs}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex gap-3">
                    {item.spicy && <Flame size={14} className="text-orange-500" />}
                    {item.healthy && <Leaf size={14} className="text-green-500" />}
                    {item.glutenFree && <Wheat size={14} className="text-yellow-500" />}
                  </div>
                  <button 
                    onClick={() => handleWhatsAppOrder(item.name)}
                    className="h-10 md:h-12 px-4 rounded-xl text-white flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg font-bold text-[10px] md:text-xs uppercase tracking-widest active:scale-95"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle size={16} />
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
