
import React from 'react';
import { ShoppingBag, Star, ChevronRight } from 'lucide-react';
import { useSite } from '../SiteContext.tsx';

const Hero: React.FC = () => {
  const { config, t } = useSite();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="relative pt-24 pb-16 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
        <div className="absolute top-10 md:top-20 left-10 w-64 md:w-96 h-64 md:h-96 rounded-full mix-blend-screen filter blur-[80px] md:blur-[100px] animate-pulse" style={{ backgroundColor: config.design.primaryColor }}></div>
        <div className="absolute top-32 md:top-40 right-10 w-48 md:w-72 h-48 md:h-72 rounded-full mix-blend-screen filter blur-[80px] md:blur-[100px] animate-pulse delay-700 opacity-50" style={{ backgroundColor: config.design.primaryColor }}></div>
      </div>

      <div className="z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto relative items-center">
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.design.primaryColor }}></span>
            <span className="text-[9px] md:text-xs font-bold text-zinc-300 tracking-[0.2em] uppercase">{t('newMenu')}</span>
          </div>

          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl leading-[1.05] font-bold tracking-tight font-jakarta text-white">
            {t(config.hero.title)} 
            <span className="block text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${config.design.primaryColor}, #f43f5e, #a855f7)` }}>
              {t(config.hero.accentWord)}
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
            {t(config.hero.description)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <button 
              onClick={() => scrollToSection('menu')}
              style={{ backgroundColor: config.design.primaryColor }}
              className="group h-14 px-8 rounded-full text-white font-bold text-xs md:text-sm uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]"
            >
              {t('seeMenu')}
              <ShoppingBag size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('reserve')}
              className="group h-14 px-8 rounded-full border border-zinc-800 text-zinc-300 font-bold text-xs md:text-sm uppercase tracking-widest hover:border-zinc-700 hover:text-white transition-all bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {t('bookTable')}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative group mt-8 lg:mt-0 max-w-2xl mx-auto w-full">
          <div className="absolute inset-0 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-20" style={{ backgroundColor: config.design.primaryColor }}></div>
          <div className="relative overflow-hidden shadow-2xl" style={{ borderRadius: config.design.borderRadius }}>
            <img 
              src={config.hero.image} 
              alt="Artfully plated dish" 
              className="w-full h-[350px] sm:h-[450px] md:h-[550px] object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-zinc-900/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center" style={{ color: config.design.primaryColor, backgroundColor: `${config.design.primaryColor}10` }}>
              <Star size={20} className="sm:size-[24px]" fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{t('topRated')}</div>
              <div className="text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-widest font-black">{t('michelin')}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
