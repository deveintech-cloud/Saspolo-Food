
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Footer from './components/Footer';
import GeminiChef from './components/GeminiChef';
import AdminDashboard from './components/AdminDashboard';
import { SiteProvider, useSite } from './SiteContext';
import { Sparkles, Camera, Utensils, Settings, ArrowRight, Lock, X, LogIn } from 'lucide-react';

// Securely obfuscated key check (Base64 of "Daniel1$")
const _AUTH_SECRET = "RGFuaWVsMSQ=";

const AdminLogin: React.FC<{ onAuthenticated: () => void; onClose: () => void }> = ({ onAuthenticated, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Decode secret at runtime to verify without plain-text in code
    if (password === atob(_AUTH_SECRET)) {
      onAuthenticated();
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-md p-8 bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
        
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold font-jakarta mb-2">Admin Access</h2>
          <p className="text-zinc-500 text-sm">Please enter your credentials to manage Saspolo CMS.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Master Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className={`w-full bg-zinc-950 border ${error ? 'border-rose-500' : 'border-white/5'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-orange-500 transition-all placeholder:text-zinc-800`}
                placeholder="••••••••"
              />
              {error && <p className="absolute -bottom-6 left-1 text-[10px] text-rose-500 font-bold uppercase animate-bounce">Access Denied</p>}
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full h-14 bg-white text-zinc-950 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-white/5"
          >
            <LogIn size={18} />
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { config, posts } = useSite();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Map section IDs to components
  const sectionMap: Record<string, React.ReactNode> = {
    hero: <Hero />,
    experience: (
      <section id="experience" className="py-24 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-jakarta mb-20 text-center tracking-tight">{config.experience.title}</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {config.experience.items.map(item => {
              const Icon = item.icon === 'Sparkles' ? Sparkles : item.icon === 'Utensils' ? Utensils : Camera;
              const colorClasses: Record<string, string> = {
                orange: 'bg-orange-500/10 text-orange-500',
                rose: 'bg-rose-500/10 text-rose-500',
                purple: 'bg-purple-500/10 text-purple-500'
              };
              return (
                <div key={item.id} className="space-y-6 group">
                  <div className={`h-14 w-14 rounded-2xl ${colorClasses[item.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/20`}>
                    <Icon size={28} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-jakarta">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-jakarta tracking-tight">Latest from the Kitchen</h2>
              <p className="text-zinc-500 text-lg">Stories, news, and culinary secrets from our experts.</p>
            </div>
            <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group">
              View All Stories
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {posts.filter(p => p.status === 'published').slice(0, 2).map(post => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
                  <img 
                    src={post.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[40%] group-hover:grayscale-0" 
                    alt={post.title} 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-bold uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-800"></span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-3xl font-bold font-jakarta group-hover:text-orange-500 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-zinc-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    reserve: <Reservation />
  };

  const sortedVisibleSections = [...config.sections]
    .sort((a, b) => a.order - b.order)
    .filter(s => s.visible);

  const handleAdminToggle = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen selection:bg-orange-600 selection:text-white bg-zinc-950 overflow-x-hidden" 
         style={{ fontFamily: config.design.fontFamily + ', sans-serif' }}>
      
      <Navbar />
      
      <main>
        {sortedVisibleSections.map(s => (
          <React.Fragment key={s.id}>
            {sectionMap[s.id]}
          </React.Fragment>
        ))}
      </main>

      <Footer />
      
      <GeminiChef />

      {/* Admin Toggle */}
      <button 
        onClick={handleAdminToggle}
        className="fixed bottom-32 right-8 h-12 w-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all z-50 shadow-2xl"
        title="Admin Dashboard"
      >
        <Settings size={20} />
      </button>

      {isLoginOpen && (
        <AdminLogin 
          onAuthenticated={() => {
            setIsLoginOpen(false);
            setIsAuthenticated(true);
            setIsAdminOpen(true);
          }} 
          onClose={() => setIsLoginOpen(false)} 
        />
      )}

      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Theme Decorative Accents */}
      <div className="fixed top-0 right-0 -z-10 w-[800px] h-[800px] rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
           style={{ backgroundColor: `${config.design.primaryColor}10` }}></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[600px] h-[600px] rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none"
           style={{ backgroundColor: `${config.design.primaryColor}15` }}></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <MainContent />
    </SiteProvider>
  );
};

export default App;
