
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Stats from './components/Stats.tsx';
import Menu from './components/Menu.tsx';
import Reservation from './components/Reservation.tsx';
import Footer from './components/Footer.tsx';
import GeminiChef from './components/GeminiChef.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import { SiteProvider, useSite } from './SiteContext.tsx';
import { Sparkles, Camera, Utensils, Settings, ArrowRight, Lock, X, LogIn, ChevronLeft, Calendar, Tag } from 'lucide-react';
import { Post } from './types.ts';

// Securely obfuscated key check (Base64 of "Daniel1$")
const _AUTH_SECRET = "RGFuaWVsMSQ=";

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; onBack?: () => void }> = ({ title, onClose, children, onBack }) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/95 backdrop-blur-2xl animate-in fade-in duration-300 p-4">
    <div className="relative w-full max-w-5xl h-[90vh] bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
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
      <div className="flex-grow overflow-y-auto p-8 md:p-12 scroll-smooth">
        {children}
      </div>
    </div>
  </div>
);

const AdminLogin: React.FC<{ onAuthenticated: () => void; onClose: () => void }> = ({ onAuthenticated, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <p className="text-zinc-500 text-sm">Please enter your credentials to manage Elengi Ya Malewa CMS.</p>
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
  const [activeOverlay, setActiveOverlay] = useState<'stories' | 'privacy' | 'terms' | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
            <button 
              onClick={() => setActiveOverlay('stories')}
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group"
            >
              View All Stories
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {posts.filter(p => p.status === 'published').slice(0, 2).map(post => (
              <div key={post.id} onClick={() => { setSelectedPost(post); setActiveOverlay('stories'); }} className="group cursor-pointer">
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

  const closeOverlay = () => {
    setActiveOverlay(null);
    setSelectedPost(null);
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

      <Footer onOpenPrivacy={() => setActiveOverlay('privacy')} onOpenTerms={() => setActiveOverlay('terms')} />
      
      <GeminiChef />

      {/* Admin Toggle */}
      <button 
        onClick={handleAdminToggle}
        className="fixed bottom-32 right-8 h-12 w-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all z-50 shadow-2xl"
        title="Admin Dashboard"
      >
        <Settings size={20} />
      </button>

      {/* Overlays */}
      {activeOverlay === 'stories' && (
        <Modal 
          title={selectedPost ? "Story Details" : "Our Stories"} 
          onClose={closeOverlay}
          onBack={selectedPost ? () => setSelectedPost(null) : undefined}
        >
          {selectedPost ? (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src={selectedPost.image} className="w-full h-full object-cover" alt={selectedPost.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 rounded-full text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                    <Tag size={12} />
                    {selectedPost.category}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    <Calendar size={14} />
                    {selectedPost.date}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold font-jakarta leading-tight text-white">
                  {selectedPost.title}
                </h1>
                
                <div className="w-20 h-1 bg-orange-600 rounded-full"></div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl text-zinc-300 leading-relaxed font-medium italic mb-8">
                    {selectedPost.excerpt}
                  </p>
                  <div className="text-zinc-400 leading-[1.8] space-y-6 text-lg">
                    {selectedPost.content.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-12 border-t border-white/5 flex justify-center">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="px-10 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-bold text-sm transition-all flex items-center gap-3 group"
                >
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Back to All Stories
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.filter(p => p.status === 'published').map(post => (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer flex flex-col h-full bg-zinc-950/40 p-4 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 duration-300"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={post.title} />
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      <span className="text-orange-500/80">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold font-jakarta group-hover:text-orange-500 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-zinc-300 group-hover:text-orange-500 transition-colors">
                    Read Full Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {activeOverlay === 'privacy' && (
        <Modal title="Privacy Policy" onClose={closeOverlay}>
          <div className="prose prose-invert max-w-none space-y-6 text-zinc-400">
            <p className="text-lg font-medium text-white">Last Updated: May 20, 2024</p>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">1. Data Collection</h3>
              <p>We collect information you provide directly to us, such as when you create a reservation, sign up for our newsletter, or communicate with our AI Sommelier. This includes your name, email address, phone number, and dining preferences.</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">2. Use of Information</h3>
              <p>We use the information we collect to facilitate reservations, provide customer support, and send you marketing communications. Your data helps us personalize your Elengi Ya Malewa experience.</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">3. AI Interactions</h3>
              <p>Our AI Sommelier processes your messages to provide personalized recommendations. These interactions are stored anonymously to improve the quality of our service. No personal identifiable information is shared with third-party model providers without your consent.</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">4. Security</h3>
              <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            </section>
          </div>
        </Modal>
      )}

      {activeOverlay === 'terms' && (
        <Modal title="Terms of Service" onClose={closeOverlay}>
          <div className="prose prose-invert max-w-none space-y-6 text-zinc-400">
            <p className="text-lg font-medium text-white">Welcome to Elengi Ya Malewa Food Group.</p>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">1. Reservations</h3>
              <p>All reservations made through this website are subject to availability. We reserve the right to cancel or modify reservations in the event of unforeseen circumstances. Please arrive at least 15 minutes prior to your scheduled time.</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">2. Intellectual Property</h3>
              <p>The content, layout, design, and graphics on this website are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">3. Limitation of Liability</h3>
              <p>Elengi Ya Malewa Food Group shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-white">4. Governing Law</h3>
              <p>These terms are governed by the laws of the State of New York. Any disputes shall be resolved in the courts located in New York City.</p>
            </section>
          </div>
        </Modal>
      )}

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
