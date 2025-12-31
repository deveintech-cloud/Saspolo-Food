
import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, Settings, FileText, ImageIcon, Search, ChevronRight, Save, Trash2, Plus, 
  Eye, EyeOff, ArrowUp, ArrowDown, Undo2, Menu as MenuIcon, Palette, Newspaper, 
  Link as LinkIcon, X, PlusCircle, Upload, Info, BarChart3, Share2, Type, Square,
  CircleDot, Layers, Quote as QuoteIcon, Activity, CheckCircle2, AlertTriangle, RefreshCcw,
  Flame, Leaf, Wheat, Copy, ChevronDown, Sparkles, Utensils
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
  const [editingMenuItemId, setEditingMenuItemId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  
  const addMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setShowAddMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateMenuItems(menuItems.map(item => 
          item.id === id ? { ...item, image: base64String } : item
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewProduct = (category: MenuCategory) => {
    const newItemId = "item_" + Date.now();
    const newItem: MenuItem = {
      id: newItemId,
      name: `New ${category} Specialty`,
      description: 'Handcrafted with ancestral knowledge...',
      category: category,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
      tags: ['New Arrival'],
      nutrition: { calories: '0 kcal', protein: '0g', fat: '0g', carbs: '0g' }
    };
    
    // Explicitly create new array to ensure state update detection
    const updatedList = [...menuItems, newItem];
    updateMenuItems(updatedList);
    
    // Auto-open for editing
    setEditingMenuItemId(newItemId);
    setShowAddMenu(false);
  };

  const duplicateProduct = (item: MenuItem) => {
    const newItemId = "item_copy_" + Date.now();
    const duplicatedItem = { ...item, id: newItemId, name: `${item.name} (Copy)` };
    updateMenuItems([...menuItems, duplicatedItem]);
    setEditingMenuItemId(newItemId);
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
            <span className="text-[9px] font-black tracking-[0.2em] uppercase font-jakarta text-orange-500">System Core v2.6</span>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-500 hover:text-white active:scale-90">
              <Undo2 size={16} />
            </button>
          </div>
          <h1 className="text-xl font-bold text-white font-jakarta flex items-center gap-2">
            Elengi <span className="text-zinc-600 font-light">Admin</span>
          </h1>
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
                 
                 {/* Fixed & Improved Add Button with Options */}
                 <div className="relative" ref={addMenuRef}>
                    <button 
                      onClick={() => setShowAddMenu(!showAddMenu)}
                      className="flex items-center gap-3 px-6 py-3 bg-orange-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-orange-950/20 hover:translate-y-[-1px] hover:bg-orange-500 transition-all active:scale-95 group"
                    >
                      <PlusCircle size={14} className={`transition-transform duration-300 ${showAddMenu ? 'rotate-45' : ''}`} />
                      Add New Product
                      <ChevronDown size={14} className={`ml-2 transition-transform ${showAddMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showAddMenu && (
                      <div className="absolute right-0 top-full mt-3 w-64 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-3 border-b border-white/5 bg-zinc-950/50">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">Categorical Creation</span>
                        </div>
                        <button onClick={() => addNewProduct(MenuCategory.BREAKFAST)} className="w-full flex items-center justify-between px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-left">
                          <div className="flex items-center gap-3"><Sparkles size={14} className="text-orange-500" /> Breakfast</div>
                          <ChevronRight size={12} className="opacity-30" />
                        </button>
                        <button onClick={() => addNewProduct(MenuCategory.MAIN)} className="w-full flex items-center justify-between px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-left">
                          <div className="flex items-center gap-3"><Utensils size={14} className="text-orange-500" /> Main Entrée</div>
                          <ChevronRight size={12} className="opacity-30" />
                        </button>
                        <button onClick={() => addNewProduct(MenuCategory.DESSERTS)} className="w-full flex items-center justify-between px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-left">
                          <div className="flex items-center gap-3"><Flame size={14} className="text-orange-500" /> Sweet Finale</div>
                          <ChevronRight size={12} className="opacity-30" />
                        </button>
                      </div>
                    )}
                 </div>
               </div>

               <div className="grid gap-8">
                 {menuItems.length === 0 ? (
                   <div className="p-12 border-2 border-dashed border-white/5 rounded-[2rem] text-center space-y-4">
                     <Plus className="mx-auto text-zinc-800" size={48} />
                     <p className="text-zinc-600 font-medium">No products found. Start by adding one above.</p>
                   </div>
                 ) : menuItems.map(item => (
                   <div key={item.id} className={`p-6 md:p-8 bg-zinc-900 border transition-all duration-300 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col gap-8 group shadow-lg ${editingMenuItemId === item.id ? 'border-orange-500/50 ring-1 ring-orange-500/20' : 'border-white/5'}`}>
                      <div className="flex flex-col md:flex-row gap-8 w-full">
                        {/* Image Upload Area */}
                        <div className="w-full md:w-48 h-48 relative shrink-0">
                           <input 
                             type="file" 
                             className="hidden" 
                             accept="image/*"
                             id={`upload-${item.id}`}
                             onChange={(e) => handleImageUpload(item.id, e)}
                           />
                           <label 
                             htmlFor={`upload-${item.id}`}
                             className="block w-full h-full cursor-pointer relative overflow-hidden rounded-2xl md:rounded-3xl group/img"
                           >
                             <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <Upload size={24} className="text-white" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change Image</span>
                             </div>
                           </label>
                        </div>

                        <div className="flex-grow space-y-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow mr-4 space-y-4">
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Dish Name</label>
                                <input className="bg-zinc-950 border border-white/5 rounded-xl text-lg md:text-xl font-bold w-full px-4 py-2 text-white focus:border-orange-500 outline-none transition-colors" value={item.name} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))} />
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0 pt-6">
                               <button 
                                onClick={() => duplicateProduct(item)} 
                                className="p-2.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all active:scale-90"
                                title="Duplicate"
                               >
                                 <Copy size={18}/>
                               </button>
                               <button 
                                onClick={() => setEditingMenuItemId(editingMenuItemId === item.id ? null : item.id)} 
                                className={`p-2.5 rounded-xl transition-all active:scale-90 ${editingMenuItemId === item.id ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                                title="Edit Nutrition & Flags"
                               >
                                 <Settings size={18}/>
                               </button>
                               <button 
                                onClick={() => updateMenuItems(menuItems.filter(i => i.id !== item.id))} 
                                className="p-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white rounded-xl transition-all active:scale-90"
                                title="Delete"
                               >
                                 <Trash2 size={18}/>
                               </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Description</label>
                            <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl p-4 text-xs text-zinc-400 focus:text-white transition-colors outline-none resize-none" rows={2} value={item.description} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                          </div>

                          <div className="flex flex-wrap items-center gap-6">
                             <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Category</label>
                                <select className="bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-[10px] uppercase font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none block" value={item.category} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, category: e.target.value as MenuCategory } : i))}>
                                  {Object.values(MenuCategory).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                             </div>
                             
                             <div className="flex-grow space-y-1">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Tags (Comma separated)</label>
                                <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-bold text-zinc-400 focus:text-orange-500 outline-none transition-colors" value={item.tags.join(', ')} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, tags: e.target.value.split(',').map(t => t.trim()) } : i))} placeholder="Vegan, Spicy, Popular..." />
                             </div>
                          </div>
                        </div>
                      </div>

                      {/* Advanced Editor (Nutrition & Flags) */}
                      {editingMenuItemId === item.id && (
                        <div className="pt-8 border-t border-white/5 grid md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-top-4 duration-300">
                           <div className="space-y-6">
                              <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Activity size={14} />
                                Nutrition Profile
                              </h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Calories</label>
                                  <input className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-bold text-white outline-none" value={item.nutrition?.calories || ''} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...(i.nutrition || {}), calories: e.target.value } } : i))} placeholder="e.g. 450 kcal" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Protein</label>
                                  <input className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-bold text-white outline-none" value={item.nutrition?.protein || ''} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...(i.nutrition || {}), protein: e.target.value } } : i))} placeholder="e.g. 25g" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Fats</label>
                                  <input className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-bold text-white outline-none" value={item.nutrition?.fat || ''} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...(i.nutrition || {}), fat: e.target.value } } : i))} placeholder="e.g. 15g" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Carbs</label>
                                  <input className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-bold text-white outline-none" value={item.nutrition?.carbs || ''} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...(i.nutrition || {}), carbs: e.target.value } } : i))} placeholder="e.g. 60g" />
                                </div>
                              </div>
                           </div>

                           <div className="space-y-6">
                              <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Layers size={14} />
                                Product Flags
                              </h4>
                              <div className="grid grid-cols-1 gap-3">
                                <button 
                                  onClick={() => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, spicy: !i.spicy } : i))}
                                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${item.spicy ? 'bg-orange-500/10 border-orange-500/40 text-orange-500' : 'bg-zinc-950 border-white/5 text-zinc-500'}`}
                                >
                                  <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Flame size={14} />
                                    Spicy Level
                                  </span>
                                  <span className="text-[8px] font-black uppercase">{item.spicy ? 'Enabled' : 'Disabled'}</span>
                                </button>
                                <button 
                                  onClick={() => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, healthy: !i.healthy } : i))}
                                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${item.healthy ? 'bg-green-500/10 border-green-500/40 text-green-500' : 'bg-zinc-950 border-white/5 text-zinc-500'}`}
                                >
                                  <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Leaf size={14} />
                                    Healthy/Green
                                  </span>
                                  <span className="text-[8px] font-black uppercase">{item.healthy ? 'Enabled' : 'Disabled'}</span>
                                </button>
                                <button 
                                  onClick={() => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, glutenFree: !i.glutenFree } : i))}
                                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${item.glutenFree ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-500' : 'bg-zinc-950 border-white/5 text-zinc-500'}`}
                                >
                                  <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Wheat size={14} />
                                    Gluten Free
                                  </span>
                                  <span className="text-[8px] font-black uppercase">{item.glutenFree ? 'Enabled' : 'Disabled'}</span>
                                </button>
                              </div>
                           </div>
                        </div>
                      )}
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
                               <button className={`p-2 rounded-lg transition-all bg-zinc-800 text-zinc-500`}><Settings size={16} /></button>
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
