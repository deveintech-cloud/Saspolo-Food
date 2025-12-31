
import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Menu, X, Globe } from 'lucide-react';
import { useSite } from '../SiteContext.tsx';

const Navbar: React.FC = () => {
  const { config, language, setLanguage, t } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
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
    <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-white/5 bg-zinc-950/90 backdrop-blur-md h-16' 
        : 'border-transparent bg-transparent h-20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-lg md:text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity uppercase font-jakarta"
        >
          {config.siteName}
        </button>
        
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          {config.navigation.map(nav => (
            <button 
              key={nav.target} 
              onClick={() => scrollToSection(nav.target)} 
              className="hover:text-white transition-colors"
            >
              {t(nav.label)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex bg-zinc-900 border border-white/5 rounded-full p-1 mr-2">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-[9px] font-bold rounded-full transition-all ${language === 'en' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-500'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 text-[9px] font-bold rounded-full transition-all ${language === 'fr' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-500'}`}
            >
              FR
            </button>
          </div>

          <button 
            onClick={() => scrollToSection('reserve')} 
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg ${
              isScrolled ? 'bg-white text-black' : 'bg-transparent text-white border border-white/20'
            }`}
          >
            <span className="hidden xs:inline">{t('reserve')}</span>
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
          
          <button 
            className="lg:hidden text-zinc-400 p-2 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-zinc-950 transition-all duration-500 z-40 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`} style={{ top: '64px' }}>
        <div className="flex flex-col h-full p-8 md:p-12 overflow-y-auto">
          <div className="space-y-6 md:space-y-8 mb-12">
            {config.navigation.map((nav, idx) => (
              <button 
                key={nav.target} 
                onClick={() => scrollToSection(nav.target)} 
                className="text-4xl md:text-5xl font-bold font-jakarta text-left capitalize block animate-in slide-in-from-left duration-500 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {t(nav.label)}
              </button>
            ))}
          </div>
          
          <div className="mt-auto space-y-8 pt-8 border-t border-white/5">
            <div className="flex items-center gap-6">
               <button onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }} className={`text-sm font-bold tracking-widest uppercase ${language === 'en' ? 'text-orange-500' : 'text-zinc-500'}`}>English</button>
               <span className="text-zinc-800">/</span>
               <button onClick={() => { setLanguage('fr'); setIsMobileMenuOpen(false); }} className={`text-sm font-bold tracking-widest uppercase ${language === 'fr' ? 'text-orange-500' : 'text-zinc-500'}`}>Français</button>
            </div>
            
            <div className="flex gap-6">
              {/* Social placeholders for mobile menu */}
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500"><Globe size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500"><Search size={18} /></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
