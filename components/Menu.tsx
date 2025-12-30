
import React, { useState, useMemo } from 'react';
import { Flame, Leaf, Wheat, Plus, ArrowRight } from 'lucide-react';
import { useSite } from '../SiteContext';
import { MenuCategory } from '../types';

const Menu: React.FC = () => {
  const { menuItems, config } = useSite();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.ALL);

  const filteredItems = useMemo(() => {
    if (activeCategory === MenuCategory.ALL) return menuItems;
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  return (
    <section id="menu" className="py-24 px-6 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white font-jakarta">Curated Delicacies</h2>
            <p className="text-zinc-400 max-w-sm text-lg">Hand-picked ingredients prepared with passion and technical precision.</p>
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
                {cat}
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
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white font-jakarta">{item.name}</h3>
                  <span className="font-bold text-lg" style={{ color: config.design.primaryColor }}>${item.price}</span>
                </div>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed flex-grow">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-4">
                    {item.spicy && (
                      <div className="flex items-center gap-1.5">
                        <Flame size={14} className="text-orange-500" />
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Spicy</span>
                      </div>
                    )}
                    {item.healthy && (
                      <div className="flex items-center gap-1.5">
                        <Leaf size={14} className="text-green-500" />
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Healthy</span>
                      </div>
                    )}
                    {item.glutenFree && (
                      <div className="flex items-center gap-1.5">
                        <Wheat size={14} className="text-yellow-500" />
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Gluten Opt</span>
                      </div>
                    )}
                  </div>
                  <button 
                    className="h-10 w-10 rounded-full bg-zinc-800 text-white flex items-center justify-center transition-all transform hover:rotate-90 hover:opacity-90"
                    style={{ backgroundColor: config.design.primaryColor }}
                  >
                    <Plus size={20} />
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
