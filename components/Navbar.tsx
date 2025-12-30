
import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Menu, X } from 'lucide-react';
import { useSite } from '../SiteContext';

const Navbar: React.FC = () => {
  const { config } = useSite();
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-white/5 bg-zinc-950/80 backdrop-blur-md h-16' 
        : 'border-transparent bg-transparent h-20'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity uppercase font-jakarta">
          {config.siteName}
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {config.navigation.map(nav => (
            <button key={nav.target} onClick={() => scrollToSection(nav.target)} className="hover:text-white transition-colors">{nav.label}</button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 transition-all">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => scrollToSection('reserve')} 
            style={{ backgroundColor: isScrolled ? 'white' : 'transparent', color: isScrolled ? 'black' : 'white', border: isScrolled ? 'none' : '1px solid rgba(255,255,255,0.2)' }}
            className="px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:opacity-80 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/5"
          >
            Reserve Table
            <ArrowRight size={14} strokeWidth={2} />
          </button>
          
          <button 
            className="md:hidden text-zinc-400 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-zinc-950/95 backdrop-blur-xl z-40 p-8 flex flex-col gap-8 animate-in slide-in-from-top duration-300 border-t border-white/5">
          {config.navigation.map(nav => (
            <button key={nav.target} onClick={() => scrollToSection(nav.target)} className="text-3xl font-bold font-jakarta text-left">{nav.label}</button>
          ))}
          <button 
            onClick={() => scrollToSection('reserve')} 
            className="mt-4 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl"
            style={{ backgroundColor: config.design.primaryColor }}
          >
            Reserve Table
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
