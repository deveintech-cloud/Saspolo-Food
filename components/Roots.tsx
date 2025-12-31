
import React from 'react';
import { useSite } from '../SiteContext.tsx';
import { Landmark, Map, Globe } from 'lucide-react';

const Roots: React.FC = () => {
  const { config, t, language } = useSite();

  return (
    <section id="roots" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div 
              className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative z-10"
              style={{ borderRadius: config.design.borderRadius }}
            >
              <img 
                src="https://images.unsplash.com/photo-1489743342057-3448cc7c3bb9?q=80&w=2070&auto=format&fit=crop" 
                alt="Traditional African Market" 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-600/20 rounded-full blur-2xl -z-10 animate-pulse"></div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5">
              <Landmark size={16} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                {language === 'fr' ? 'Nos Racines' : 'Our Roots'}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold font-jakarta tracking-tight leading-[1.1]">
              {language === 'fr' ? 'Un Héritage au Cœur du' : 'A Legacy in the Heart of'}{' '}
              <span className="text-orange-500">Congo</span>
            </h2>

            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
              {language === 'fr' 
                ? "La cuisine congolaise est un carrefour de traditions millénaires et de ressources naturelles uniques. Du puissant fleuve Congo aux forêts luxuriantes, chaque ingrédient raconte l'histoire d'un peuple résilient et joyeux."
                : "Congolese cuisine is a crossroads of ancient traditions and unique natural resources. From the mighty Congo River to the lush forests, every ingredient tells the story of a resilient and joyful people."}
            </p>

            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest">
                  <Map size={18} className="text-orange-500" />
                  {language === 'fr' ? 'Géographie' : 'Geography'}
                </div>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">
                  {language === 'fr'
                    ? "Des plats influencés par la biodiversité du bassin du Congo, la deuxième plus grande forêt tropicale au monde."
                    : "Dishes influenced by the biodiversity of the Congo Basin, the second largest rainforest in the world."}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest">
                  <Globe size={18} className="text-orange-500" />
                  {language === 'fr' ? 'Influence' : 'Influence'}
                </div>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">
                  {language === 'fr'
                    ? "Un mélange unique de saveurs locales authentiques et de techniques héritées de l'histoire coloniale et commerciale."
                    : "A unique blend of authentic local flavors and techniques inherited from colonial and trade history."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roots;
