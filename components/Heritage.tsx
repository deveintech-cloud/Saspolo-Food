
import React from 'react';
import { useSite } from '../SiteContext.tsx';
import { Flame, Waves, Leaf, ArrowRight, Sparkles, Award } from 'lucide-react';

const Heritage: React.FC = () => {
  const { config, t } = useSite();

  const pillars = [
    {
      title: t('heritage_pillar1_title'),
      tag: t('heritage_pillar1_tag'),
      description: t('heritage_pillar1_desc'),
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop',
      icon: <Flame className="text-orange-500" size={32} />
    },
    {
      title: t('heritage_pillar2_title'),
      tag: t('heritage_pillar2_tag'),
      description: t('heritage_pillar2_desc'),
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
      icon: <Waves className="text-blue-400" size={32} />
    },
    {
      title: t('heritage_pillar3_title'),
      tag: t('heritage_pillar3_tag'),
      description: t('heritage_pillar3_desc'),
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2070&auto=format&fit=crop',
      icon: <Leaf className="text-green-500" size={32} />
    }
  ];

  return (
    <section id="experience" className="bg-zinc-950 text-white overflow-hidden">
      {/* Introduction Header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center space-y-8">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <Award size={14} className="text-orange-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
            {t('heritage_tag')}
          </span>
        </div>
        <h2 className="text-4xl md:text-7xl font-bold font-jakarta tracking-tighter leading-none max-w-4xl mx-auto">
          {t('heritage_odyssey')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">
            {t('heritage_culinary')}
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-500 text-lg font-light leading-relaxed">
          {t('heritage_main_desc')}
        </p>
      </div>

      {/* Main Pillars - Immersive Alternating Blocks */}
      <div className="space-y-0">
        {pillars.map((pillar, idx) => (
          <div 
            key={pillar.tag} 
            className={`relative min-h-screen flex items-center overflow-hidden border-t border-white/5`}
          >
            {/* Background Image with Parallax-like fixed behavior */}
            <div className="absolute inset-0 z-0">
              <img 
                src={pillar.image} 
                className="w-full h-full object-cover opacity-40 grayscale-[40%]" 
                alt={pillar.title}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${idx % 2 === 0 ? 'from-zinc-950 via-zinc-950/80' : 'from-transparent via-zinc-950/80 to-zinc-950'}`}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex lg:flex-row-reverse' : ''}`}>
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  <div className="inline-flex items-center gap-4">
                    <div className="p-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl">
                      {pillar.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-orange-500 tracking-[0.3em] mb-1">{pillar.tag}</p>
                      <h3 className="text-3xl md:text-5xl font-bold font-jakarta leading-none">{pillar.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
                    {pillar.description}
                  </p>

                  <div className="flex items-center gap-6 pt-4">
                    <div className="h-px w-12 bg-zinc-800"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                      {t('heritage_craftsmanship')}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block">
                  {/* Decorative Frame for content balance */}
                  <div className="aspect-square relative flex items-center justify-center">
                    <div className="absolute w-[80%] h-[80%] border-2 border-white/5 rounded-full animate-spin-slow"></div>
                    <div className="absolute w-[60%] h-[60%] border border-orange-500/20 rounded-full animate-reverse-spin"></div>
                    <div className="relative z-10 text-center space-y-4">
                      <Sparkles className="mx-auto text-orange-500/30" size={48} />
                      <p className="text-[10px] font-black tracking-[0.5em] text-zinc-800 uppercase">Est. 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ingredient Spotlight Slider-ish Grid */}
      <div className="py-32 bg-zinc-900/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold font-jakarta">{t('heritage_pantry_title')}</h2>
              <p className="text-zinc-500 max-w-md mx-auto md:mx-0">{t('heritage_pantry_desc')}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <button className="h-12 w-12 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all"><ArrowRight size={20} className="rotate-180" /></button>
              <button className="h-12 w-12 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all"><ArrowRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Moambé', type: 'Nut', desc: 'Creamy Palm Pulp', img: 'https://images.unsplash.com/photo-1596567100027-414d90433d07?q=80&w=600' },
              { name: 'Pili-Pili', type: 'Spice', desc: 'Volcanic Red Chili', img: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?q=80&w=600' },
              { name: 'Fumbwa', type: 'Leaf', desc: 'Wild Gnetum Greens', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600' },
              { name: 'Chikwangue', type: 'Starch', desc: 'Fermented Cassava', img: 'https://images.unsplash.com/photo-1589113103503-49ef83d95ecd?q=80&w=600' }
            ].map((item, i) => (
              <div key={item.name} className="group cursor-default">
                <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/5 mb-6 relative">
                  <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={item.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[8px] font-black text-orange-500 tracking-[0.3em] uppercase mb-1">{item.type}</p>
                    <h4 className="text-xl font-bold font-jakarta">{item.name}</h4>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed px-2 line-clamp-2 font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heritage;
