
import React, { useState, useRef } from 'react';
import { 
  Layout, Settings, FileText, ImageIcon, Search, ChevronRight, Save, Trash2, Plus, 
  Eye, EyeOff, ArrowUp, ArrowDown, Undo2, Menu as MenuIcon, Palette, Newspaper, 
  Link as LinkIcon, X, PlusCircle, Upload, Info, BarChart3, Share2, Type, Square,
  CircleDot, Layers, Quote as QuoteIcon, Activity, CheckCircle2, AlertTriangle, RefreshCcw
} from 'lucide-react';
import { useSite } from '../SiteContext.tsx';
import { MenuCategory, MenuItem, Post, NavItem, SiteConfig } from '../types.ts';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 md:mb-10">
    <h3 className="text-xl md:text-2xl font-bold font-jakarta text-white">{title}</h3>
    <p className="text-[10px] text-zinc-500 font-medium mt-1 uppercase tracking-wider">{subtitle}</p>
    <div className="h-1 w-10 md:w-12 bg-orange-600 mt-4 rounded-full shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
  </div>
);

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { config, menuItems, posts, updateConfig, updateMenuItems, updatePosts, resetToDefaults } = useSite();
  const [activeTab, setActiveTab] = useState<'content' | 'about' | 'stats' | 'menu' | 'posts' | 'navigation' | 'design' | 'footer' | 'seo'>('content');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingMenuItemId, setEditingMenuItemId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'content', label: 'Home Page', icon: <FileText size={16} /> },
    { id: 'about', label: 'About Story', icon: <Info size={16} /> },
    { id: 'stats', label: 'Statistics', icon: <BarChart3 size={16} /> },
    { id: 'posts', label: 'News Feed', icon: <Newspaper size={16} /> },
    { id: 'menu', label: 'Products', icon: <MenuIcon size={16} /> },
    { id: 'navigation', label: 'Navigation', icon: <LinkIcon size={16} /> },
    { id: 'footer', label: 'Footer & Links', icon: <Share2 size={16} /> },
    { id: 'design', label: 'Theme Design', icon: <Palette size={16} /> },
    { id: 'seo', label: 'SEO Config', icon: <Search size={16} /> },
  ];

  const moveAboutSection = (idx: number, direction: 'up' | 'down') => {
    const newSections = [...config.about.sections];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;
    [newSections[idx], newSections[targetIdx]] = [newSections[targetIdx], newSections[idx]];
    updateConfig({ about: { ...config.about, sections: newSections } });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col md:flex-row animate-in fade-in duration-300 overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden h-16 border-b border-white/10 bg-zinc-900 flex items-center justify-between px-6 shrink-0">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-zinc-400 hover:text-white transition-colors">
          <MenuIcon size={20} />
        </button>
        <span className="font-bold text-xs tracking-widest uppercase text-zinc-300">Admin Control</span>
        <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors"><X size={20} /></button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-0 md:relative md:flex md:w-72 border-r border-white/10 bg-zinc-900 flex-col shrink-0 shadow-2xl overflow-y-auto z-50 transition-transform md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 border-b border-white/5 hidden md:block">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-black tracking-[0.2em] uppercase font-jakarta text-orange-500">System Core v2.4</span>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-500 hover:text-white active:scale-90">
              <Undo2 size={16} />
            </button>
          </div>
          <h1 className="text-xl font-bold text-white font-jakarta flex items-center gap-2">
            Elengi <span className="text-zinc-600 font-light">Admin</span>
          </h1>
        </div>
        
        <div className="md:hidden p-8 flex justify-between items-center border-b border-white/5">
           <h1 className="text-xl font-bold text-white font-jakarta">Dashboard</h1>
           <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-zinc-500 hover:text-white"><X size={20} /></button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all relative group ${
                activeTab === tab.id 
                  ? 'bg-orange-600 text-white shadow-[0_4px_12px_rgba(234,88,12,0.3)]' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === tab.id && <div className="absolute left-0 w-1 h-4 bg-white rounded-full ml-1" />}
              <span className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:translate-x-1'}`}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button 
            onClick={resetToDefaults} 
            className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 py-3 rounded-xl transition-all active:scale-95 group"
          >
            <AlertTriangle size={14} className="group-hover:animate-pulse" />
            Hard Reset
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto bg-zinc-950/40 relative">
        <div className="max-w-4xl mx-auto p-6 md:p-12 pb-32">
          
          {activeTab === 'content' && (
            <div className="space-y-12">
              <SectionHeader title="Hero Experience" subtitle="Hero Section & Global Branding" />
              <div className="grid gap-6 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900 border border-white/5 shadow-xl">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest ml-1">Title</label>
                      <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm focus:border-orange-500 outline-none transition-colors" value={config.hero.title} onChange={e => updateConfig({ hero: { ...config.hero, title: e.target.value } })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest ml-1">Accent Word</label>
                      <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm text-orange-500 font-bold focus:border-orange-500 outline-none transition-colors" value={config.hero.accentWord} onChange={e => updateConfig({ hero: { ...config.hero, accentWord: e.target.value } })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest ml-1">Description</label>
                    <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm resize-none focus:border-orange-500 outline-none transition-colors" rows={3} value={config.hero.description} onChange={e => updateConfig({ hero: { ...config.hero, description: e.target.value } })} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-12">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <SectionHeader title="Product Catalog" subtitle="Dishes & Curated Selection" />
                 <button 
                  onClick={() => updateMenuItems([...menuItems, { id: Date.now().toString(), name: 'New Seasonal Dish', description: '', category: MenuCategory.MAIN, image: 'https://images.unsplash.com/photo-1544025162-d76694265947', tags: [] }])} 
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-orange-950/20 hover:translate-y-[-1px] hover:bg-orange-500 transition-all active:scale-95 group"
                 >
                   <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                   Add New Product
                 </button>
               </div>
               <div className="grid gap-6">
                 {menuItems.map(item => (
                   <div key={item.id} className="p-6 md:p-8 bg-zinc-900 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col md:row gap-6 md:gap-8 group shadow-lg">
                      <div className="flex flex-col md:flex-row gap-8 w-full">
                        <div className="w-full md:w-32 h-48 md:h-32 relative shrink-0">
                           <img src={item.image} className="w-full h-full object-cover rounded-2xl md:rounded-3xl border border-white/10" />
                        </div>
                        <div className="flex-grow space-y-4">
                          <div className="flex justify-between items-start">
                            <input className="bg-transparent border-b border-white/10 text-lg md:text-xl font-bold w-full mr-4 text-white focus:border-orange-500 outline-none transition-colors" value={item.name} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))} />
                            <div className="flex gap-2 shrink-0">
                               <button 
                                onClick={() => setEditingMenuItemId(editingMenuItemId === item.id ? null : item.id)} 
                                className={`p-2 rounded-xl transition-all active:scale-90 ${editingMenuItemId === item.id ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                               >
                                 <Settings size={16}/>
                               </button>
                               <button 
                                onClick={() => updateMenuItems(menuItems.filter(i => i.id !== item.id))} 
                                className="p-2 bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white rounded-xl transition-all active:scale-90"
                               >
                                 <Trash2 size={16}/>
                               </button>
                            </div>
                          </div>
                          <textarea className="w-full bg-zinc-950/50 border border-white/5 rounded-xl p-3 text-xs text-zinc-400 focus:text-white transition-colors outline-none" rows={2} value={item.description} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                          <div className="flex flex-wrap items-center gap-4">
                             <select className="bg-zinc-950 border border-white/5 rounded-xl px-4 py-1.5 text-[10px] uppercase font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none" value={item.category} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, category: e.target.value as MenuCategory } : i))}>
                                {Object.values(MenuCategory).map(c => <option key={c} value={c}>{c}</option>)}
                             </select>
                          </div>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-12">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <SectionHeader title="News & Stories" subtitle="Journal Management" />
                 <button 
                  onClick={() => {
                    const newPost: Post = {
                      id: Date.now().toString(),
                      title: 'New Article Title',
                      slug: 'new-article-' + Date.now(),
                      excerpt: 'Summary for the feed...',
                      content: 'Main article body...',
                      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757',
                      status: 'draft',
                      category: 'Heritage',
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    };
                    updatePosts([newPost, ...posts]);
                  }} 
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:translate-y-[-1px] transition-all active:scale-95 group"
                 >
                   <Newspaper size={14} />
                   Create Journal Post
                 </button>
               </div>
               <div className="grid gap-6">
                 {posts.map(post => (
                    <div key={post.id} className="p-6 md:p-8 bg-zinc-900 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col gap-6 shadow-lg group">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <img src={post.image} className="w-full sm:w-24 h-24 object-cover rounded-2xl border border-white/10" />
                        <div className="flex-grow space-y-2">
                           <div className="flex justify-between items-start">
                             <input className="bg-transparent border-b border-white/10 text-lg font-bold w-full mr-4 text-white focus:border-orange-500 outline-none" value={post.title} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, title: e.target.value } : p))} />
                             <div className="flex gap-2">
                               <button onClick={() => setEditingPostId(editingPostId === post.id ? null : post.id)} className={`p-2 rounded-lg transition-all ${editingPostId === post.id ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}><Settings size={16} /></button>
                               <button onClick={() => updatePosts(posts.filter(p => p.id !== post.id))} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 size={16} /></button>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-12">
              <SectionHeader title="Visual Branding" subtitle="Theme Engine" />
              <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2rem] space-y-10 shadow-xl">
                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Primary Color</label>
                    <input type="color" className="w-full h-12 rounded-xl bg-transparent border-none cursor-pointer" value={config.design.primaryColor} onChange={e => updateConfig({ design: { ...config.design, primaryColor: e.target.value } })} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Border Radius</label>
                    <input type="range" min="0" max="40" step="2" className="w-full accent-orange-600" value={parseInt(config.design.borderRadius)} onChange={e => updateConfig({ design: { ...config.design, borderRadius: `${e.target.value}px` } })} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-0 md:left-72 p-6 md:p-8 bg-zinc-900/90 backdrop-blur-2xl border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center z-40">
         <div className="flex gap-4 w-full sm:w-auto ml-auto">
            <button onClick={onClose} className="px-10 py-4 bg-white text-zinc-950 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-2xl hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-3">
              <CheckCircle2 size={16} />
              Apply & Publish Changes
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
