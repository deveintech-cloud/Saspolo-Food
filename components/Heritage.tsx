
import React from 'react';
import { useSite } from '../SiteContext.tsx';
import { Flame, Waves, Leaf, Wind, Sparkles, Utensils, Award } from 'lucide-react';

const Heritage: React.FC = () => {
  const { config, t, language } = useSite();

  const pillars = [
    {
      title: language === 'fr' ? 'Le Foyer Ancestral' : 'The Ancestral Hearth',
      tag: 'BOKOKO',
      description: language === 'fr' 
        ? "Au cœur de chaque 'Malewa' se trouve le feu. Nos techniques de fumage au charbon de bois et de mijotage lent en pots d'argile sont transmises de génération en génération, préservant l'âme fumée de la cuisine congolaise."
        : "At the heart of every 'Malewa' lies the fire. Our charcoal-smoking and slow-simmering clay pot techniques are passed down through generations, preserving the smoky soul of Congolese cuisine.",
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop',
      icon: <Flame className="text-orange-500" size={32} />
    },
    {
      title: language === 'fr' ? "L'Étreinte du Fleuve" : "The River's Embrace",
      tag: 'CONGO BASIN',
      description: language === 'fr'
        ? "Le fleuve Congo n'est pas seulement une voie navigable ; c'est notre garde-manger. Du Liboke de Tilapia frais aux herbes sauvages cueillies sur ses rives, nous honorons le rythme de l'eau dans chaque plat."
        : "The Congo River is not just a waterway; it is our pantry. From fresh Tilapia Liboke to wild herbs foraged from its banks, we honor the rhythm of the water in every dish we serve.",
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
      icon: <Waves className="text-blue-400" size={32} />
    },
    {
      title: language === 'fr' ? "L'Art du Liboke" : "The Art of Liboke",
      tag: 'TECHNIQUE',
      description: language === 'fr'
        ? "Envelopper les ingrédients dans des feuilles de bananier n'est pas qu'une présentation ; c'est une alchimie. La vapeur emprisonne les nutriments et infuse la viande d'un parfum terreux inimitable."
        : "Wrapping ingredients in banana leaves isn't just presentation; it's alchemy. The steam locks in nutrients and infuses the meat with an unmistakable, earthy fragrance that defines our heritage.",
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
            {language === 'fr' ? 'HÉRITAGE ET TRADITION' : 'HERITAGE & TRADITION'}
          </span>
        </div>
        <h2 className="text-4xl md:text-7xl font-bold font-jakarta tracking-tighter leading-none max-w-4xl mx-auto">
          {language === 'fr' ? 'Une Odyssée' : 'A Culinary'}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">
            {language === 'fr' ? 'Culinaire' : 'Odyssey'}
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-zinc-500 text-lg font-light leading-relaxed">
          {language === 'fr' 
            ? "Découvrez les piliers qui soutiennent Elengi Ya Malewa. Plus qu'un restaurant, nous sommes les gardiens d'un héritage gastronomique millénaire."
            : "Discover the pillars that uphold Elengi Ya Malewa. More than a restaurant, we are the custodians of a thousand-year-old gastronomic legacy."}
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
                      {language === 'fr' ? 'Artisanat Authentique' : 'Authentic Craftsmanship'}
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
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold font-jakarta">{t('The Alchemist\'s Pantry' || 'The Pantry')}</h2>
              <p className="text-zinc-500 max-w-md">{language === 'fr' ? 'Découvrez les ingrédients bruts qui définissent notre goût.' : 'Meet the raw ingredients that define our flavor profile.'}</p>
            </div>
            <div className="flex gap-2">
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

const ArrowRight: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);

export default Heritage;
