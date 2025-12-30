
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Stats from './components/Stats.tsx';
import Menu from './components/Menu.tsx';
import Reservation from './components/Reservation.tsx';
import Footer from './components/Footer.tsx';
import GeminiChef from './components/GeminiChef.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import AboutUs from './components/AboutUs.tsx';
import { SiteProvider, useSite } from './SiteContext.tsx';
import { Sparkles, Camera, Utensils, Settings, ArrowRight, Lock, X, LogIn, ChevronLeft, Calendar, Tag } from 'lucide-react';
import { Post } from './types.ts';

const _AUTH_SECRET = "RGFuaWVsMSQ=";

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; onBack?: () => void }> = ({ title, onClose, children, onBack }) => {
  const { config } = useSite();
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/95 backdrop-blur-2xl animate-in fade-in duration-300 p-4">
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-zinc-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        style={{ borderRadius: config.design.borderRadius }}
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-all">
                <ChevronLeft size={24} />
              </button>
            )}
            <h2 className="text-2xl font-bold font-jakarta">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminLogin: React.FC<{ onAuthenticated: () => void; onClose: () => void }> = ({ onAuthenticated, onClose }) => {
  const { config } = useSite();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === atob(_AUTH_SECRET)) { onAuthenticated(); setError(false); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl p-4">
      <div 
        className="relative w-full max-w-md p-8 bg-zinc-900 border border-white/10 shadow-2xl text-center"
        style={{ borderRadius: config.design.borderRadius }}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500"><X size={20} /></button>
        <Lock size={40} className="mx-auto text-orange-500 mb-6" />
        <h2 className="text-xl font-bold mb-6">Restricted Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-5 py-3 text-center" placeholder="Password" autoFocus style={{ borderRadius: `calc(${config.design.borderRadius} / 2)` }} />
          <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded-xl" style={{ borderRadius: `calc(${config.design.borderRadius} / 2)` }}>Unlock System</button>
        </form>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { config, posts, t } = useSite();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<'stories' | 'privacy' | 'terms' | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Global style updates based on admin config
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', config.design.primaryColor);
    document.documentElement.style.setProperty('--accent-color', config.design.accentColor);
    document.documentElement.style.setProperty('--border-radius', config.design.borderRadius);
    document.body.style.fontFamily = `'${config.design.fontFamily}', sans-serif`;
  }, [config.design]);

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <Hero />,
    about: <AboutUs />,
    experience: (
      <section id="experience" className="py-24 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-jakarta mb-20">{config.experience.title}</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {config.experience.items.map(item => {
              const Icon = item.icon === 'Sparkles' ? Sparkles : Utensils;
              return (
                <div key={item.id} className="space-y-6">
                  <div className="h-14 w-14 flex items-center justify-center mx-auto shadow-xl" style={{ backgroundColor: `${config.design.primaryColor}15`, color: config.design.primaryColor, borderRadius: `calc(${config.design.borderRadius} / 2)` }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    ),
    stats: <Stats />,
    menu: <Menu />,
    blog: (
      <section id="blog" className="py-24 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-jakarta">{t('stories')}</h2>
            <button onClick={() => setActiveOverlay('stories')} className="text-sm font-bold text-zinc-500 hover:text-white uppercase flex items-center gap-2">{t('viewAll')} <ArrowRight size={16}/></button>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {posts.filter(p => p.status === 'published').slice(0, 2).map(post => (
              <div key={post.id} onClick={() => { setSelectedPost(post); setActiveOverlay('stories'); }} className="group cursor-pointer">
                <div className="aspect-video overflow-hidden mb-8 shadow-2xl" style={{ borderRadius: config.design.borderRadius }}>
                  <img src={post.image} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700" alt={post.title} />
                </div>
                <h3 className="text-2xl font-bold group-hover:text-orange-500 transition-colors mb-4">{post.title}</h3>
                <p className="text-zinc-400 line-clamp-2">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    reserve: <Reservation />
  };

  const sortedVisibleSections = [...config.sections].sort((a, b) => a.order - b.order).filter(s => s.visible);

  return (
    <div className="min-h-screen bg-zinc-950" style={{ fontFamily: `'${config.design.fontFamily}', sans-serif` }}>
      <Navbar />
      <main>
        {sortedVisibleSections.map(s => <React.Fragment key={s.id}>{sectionMap[s.id]}</React.Fragment>)}
      </main>
      <Footer onOpenPrivacy={() => setActiveOverlay('privacy')} onOpenTerms={() => setActiveOverlay('terms')} />
      <GeminiChef />
      <button 
        onClick={() => isAuthenticated ? setIsAdminOpen(true) : setIsLoginOpen(true)} 
        className="fixed bottom-32 right-8 h-12 w-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 z-50 shadow-2xl transition-all"
        style={{ backgroundColor: isAuthenticated ? `${config.design.primaryColor}20` : undefined }}
      >
        <Settings size={20} />
      </button>
      
      {activeOverlay === 'stories' && (
        <Modal title={selectedPost ? t("storyDetails") : t("ourStories")} onClose={() => { setActiveOverlay(null); setSelectedPost(null); }} onBack={selectedPost ? () => setSelectedPost(null) : undefined}>
          {selectedPost ? (
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="aspect-[21/9] overflow-hidden" style={{ borderRadius: config.design.borderRadius }}><img src={selectedPost.image} className="w-full h-full object-cover" /></div>
              <h1 className="text-4xl md:text-6xl font-bold">{selectedPost.title}</h1>
              <p className="text-xl text-zinc-400 italic">{selectedPost.excerpt}</p>
              <div className="text-zinc-300 leading-relaxed text-lg whitespace-pre-line">{selectedPost.content}</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.filter(p => p.status === 'published').map(post => (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedPost(post)} 
                  className="group cursor-pointer p-4 border border-white/5 hover:bg-white/5 transition-all"
                  style={{ borderRadius: config.design.borderRadius }}
                >
                  <div className="aspect-video overflow-hidden mb-6" style={{ borderRadius: `calc(${config.design.borderRadius} / 1.5)` }}><img src={post.image} className="w-full h-full object-cover" /></div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500">{post.title}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-3">{post.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {isLoginOpen && <AdminLogin onAuthenticated={() => { setIsLoginOpen(false); setIsAuthenticated(true); setIsAdminOpen(true); }} onClose={() => setIsLoginOpen(false)} />}
      {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
};

const App: React.FC = () => <SiteProvider><MainContent /></SiteProvider>;
export default App;
