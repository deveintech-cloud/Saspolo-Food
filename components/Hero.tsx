
import React from 'react';
import { ShoppingBag, Star, ChevronRight } from 'lucide-react';
import { useSite } from '../SiteContext.tsx';

const Hero: React.FC = () => {
  const { config } = useSite();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ backgroundColor: config.design.primaryColor }}></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-700 opacity-50" style={{ backgroundColor: config.design.primaryColor }}></div>
      </div>

      <div className="z-10 grid md:grid-cols-2 gap-16 max-w-7xl mx-auto relative items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: config.design.primaryColor }}></span>
            <span className="text-[10px] md:text-xs font-semibold text-zinc-300 tracking-wider uppercase">New Seasonal Menu Available</span>
          </div>

          <h1 className="text-5xl md:text-8xl leading-[1.05] font-medium tracking-tight font-jakarta">
            {config.hero.title} 
            <span className="block text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${config.design.primaryColor}, #f43f5e, #a855f7)` }}>
              {config.hero.accentWord}
            </span>
            the senses.
          </h1>

          <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
            {config.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('menu')}
              style={{ backgroundColor: config.design.primaryColor }}
              className="group h-14 px-8 rounded-full text-white font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_-5px_rgba(0,0,0,0.5)]"
            >
              {config.hero.buttonText}
              <ShoppingBag size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="group h-14 px-8 rounded-full border border-zinc-800 text-zinc-300 font-bold text-sm hover:border-zinc-700 hover:text-white transition-all bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              {config.hero.secondaryButtonText}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-20" style={{ backgroundColor: config.design.primaryColor }}></div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img 
              src={config.hero.image} 
              alt="Artfully plated dish" 
              className="w-full h-[500px] object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 bg-zinc-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ color: config.design.primaryColor, backgroundColor: `${config.design.primaryColor}10` }}>
              <Star size={24} fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Top Rated</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Michelin Guide '24</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
