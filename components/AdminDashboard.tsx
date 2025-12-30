
import React, { useState, useRef } from 'react';
import { 
  Layout, 
  Settings, 
  FileText, 
  ImageIcon, 
  Search, 
  ChevronRight, 
  Save, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Undo2,
  Menu as MenuIcon,
  Palette,
  Newspaper,
  Link as LinkIcon,
  X,
  PlusCircle,
  Upload,
  Image as ImageIconAlt
} from 'lucide-react';
import { useSite } from '../SiteContext.tsx';
import { MenuCategory, MenuItem, Post, NavItem } from '../types.ts';

const AddDishModal: React.FC<{ onSave: (dish: MenuItem) => void, onClose: () => void }> = ({ onSave, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<MenuItem>({
    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
    name: '',
    price: 0,
    description: '',
    category: MenuCategory.MAIN,
    image: '',
    tags: [],
    spicy: false,
    healthy: false,
    glutenFree: false
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/90 p-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h3 className="text-2xl font-bold font-jakarta text-white">Upload New Product</h3>
            <p className="text-xs text-zinc-500 font-medium">Add a unique dish to your Congolese menu</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-400 transition-colors"><X size={20} /></button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8">
          {/* Image Preview & Upload */}
          <div className="relative group aspect-video rounded-3xl bg-zinc-950 border-2 border-dashed border-white/5 overflow-hidden flex flex-col items-center justify-center transition-all hover:border-orange-500/50">
            {formData.image ? (
              <>
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button onClick={() => fileInputRef.current?.click()} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"><Upload size={20} /></button>
                  <button onClick={() => setFormData({...formData, image: ''})} className="p-3 bg-rose-600 text-white rounded-full hover:scale-110 transition-transform"><Trash2 size={20} /></button>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="mx-auto w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-500 mb-4">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-white mb-1">Click to upload dish photo</p>
                <p className="text-xs text-zinc-500">Supports JPG, PNG or WebP</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-4 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Select File
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Dish Name</label>
              <input 
                placeholder="e.g. Liboke ya Mpunda"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-orange-500 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Price (ZAR)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold">R</span>
                <input 
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full bg-zinc-950 border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Product Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              rows={3}
              placeholder="Describe the flavors and preparation..."
              className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm resize-none focus:border-orange-500 transition-all outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Menu Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as MenuCategory})}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none"
              >
                {Object.values(MenuCategory).filter(c => c !== MenuCategory.ALL).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Manual Image Link (Optional)</label>
              <input 
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-5 rounded-3xl bg-zinc-950 border border-white/5">
            {[
              { label: 'Spicy', key: 'spicy' },
              { label: 'Healthy', key: 'healthy' },
              { label: 'Gluten Free', key: 'glutenFree' }
            ].map(attr => (
              <label key={attr.key} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={(formData as any)[attr.key]}
                  onChange={e => setFormData({...formData, [attr.key]: e.target.checked})}
                  className="w-5 h-5 rounded-lg border-zinc-800 text-orange-600 focus:ring-orange-500 bg-zinc-900 transition-all"
                />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">{attr.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-zinc-900/50 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-grow py-4 rounded-2xl border border-white/10 text-sm font-bold text-zinc-400 hover:bg-white/5 transition-all"
          >
            Discard
          </button>
          <button 
            onClick={() => {
              if (formData.name && formData.price > 0 && formData.image) onSave(formData);
              else alert("Please fill in the name, price, and upload an image.");
            }}
            className="flex-grow py-4 rounded-2xl bg-orange-600 text-white text-sm font-bold hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} />
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { config, menuItems, posts, updateConfig, updateMenuItems, updatePosts, resetToDefaults } = useSite();
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'menu' | 'posts' | 'navigation' | 'seo'>('content');
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleDishImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateMenuItem(id, { image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionToggle = (id: string) => {
    const newSections = config.sections.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    );
    updateConfig({ sections: newSections });
  };

  const handleSectionMove = (index: number, direction: 'up' | 'down') => {
    const newSections = [...config.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    updateConfig({ sections: newSections.map((s, i) => ({ ...s, order: i })) });
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const newItems = menuItems.map(item => item.id === id ? { ...item, ...updates } : item);
    updateMenuItems(newItems);
  };

  const addPost = () => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      title: 'New Story',
      slug: 'new-story-' + Date.now(),
      excerpt: 'Brief summary of your news story...',
      content: 'Write your story here...',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
      status: 'draft',
      category: 'General',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    updatePosts([...posts, newPost]);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    updatePosts(posts.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateNavItem = (id: string, updates: Partial<NavItem>) => {
    updateConfig({
      navigation: config.navigation.map(n => n.id === id ? { ...n, ...updates } : n)
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex animate-in fade-in duration-300">
      {showAddDishModal && (
        <AddDishModal 
          onSave={(dish) => {
            updateMenuItems([...menuItems, dish]);
            setShowAddDishModal(false);
          }}
          onClose={() => setShowAddDishModal(false)}
        />
      )}

      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 bg-zinc-900 flex flex-col shrink-0 shadow-2xl">
        <div className="p-8 border-b border-white/5 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-black tracking-[0.2em] uppercase font-jakarta text-orange-500">Dashboard</span>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-500 hover:text-white">
              <Undo2 size={18} />
            </button>
          </div>
          <h1 className="text-xl font-bold text-white font-jakarta">{config.siteName} CMS</h1>
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Version 2.4.0 High-End</p>
        </div>
        
        <nav className="flex-grow p-6 space-y-3">
          {[
            { id: 'content', label: 'Pages & Blocks', icon: <FileText size={18} /> },
            { id: 'posts', label: 'News Stories', icon: <Newspaper size={18} /> },
            { id: 'menu', label: 'Product Manager', icon: <MenuIcon size={18} /> },
            { id: 'navigation', label: 'Navigation', icon: <LinkIcon size={18} /> },
            { id: 'design', label: 'Brand Identity', icon: <Palette size={18} /> },
            { id: 'seo', label: 'SEO Settings', icon: <Search size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-zinc-950 shadow-xl shadow-white/10' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={activeTab === tab.id ? 'text-zinc-950' : 'text-zinc-600'}>
                {tab.icon}
              </div>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button 
            onClick={resetToDefaults}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
          >
            Wipe All Data
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-grow overflow-y-auto bg-zinc-950/30">
        <header className="sticky top-0 z-10 px-12 py-8 border-b border-white/5 bg-zinc-950/80 backdrop-blur-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-jakarta text-white capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
            <p className="text-xs text-zinc-500 font-medium">Manage your website's {activeTab} data</p>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={onClose} className="px-6 py-3 bg-white text-zinc-950 rounded-2xl text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl shadow-white/10">
              <Save size={16} />
              Commit Changes
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-12">
          {activeTab === 'menu' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="text-3xl font-bold font-jakarta text-white">Culinary Inventory</h3>
                  <p className="text-sm text-zinc-500 mt-1">Change, edit and upload your high-end Congolese product catalog.</p>
                </div>
                <button 
                  onClick={() => setShowAddDishModal(true)} 
                  className="group flex items-center gap-3 px-8 py-4 bg-orange-600 rounded-[1.5rem] text-xs font-bold uppercase tracking-widest text-white hover:bg-orange-500 transition-all shadow-2xl shadow-orange-600/30 active:scale-95"
                >
                  <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                  New Product
                </button>
              </div>

              <div className="grid gap-6">
                {menuItems.map(item => (
                  <div key={item.id} className="relative p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 flex flex-col gap-8 group hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                       <button onClick={() => updateMenuItems(menuItems.filter(i => i.id !== item.id))} className="h-10 w-10 bg-rose-600/10 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                        <Trash2 size={18}/>
                      </button>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start gap-10">
                      {/* Product Image Section */}
                      <div className="w-full lg:w-48 space-y-4 shrink-0">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden group/img bg-zinc-950 border border-white/5">
                          <img src={item.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" alt={item.name} />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => fileInputRefs.current[item.id]?.click()}
                              className="p-3 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform"
                            >
                              <Upload size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-center">ID: {item.id}</p>
                        {/* Fix: Ref callback must return void. Braces used to avoid implicit return of assignment. */}
                        <input 
                          type="file" 
                          ref={el => { fileInputRefs.current[item.id] = el; }}
                          onChange={(e) => handleDishImageUpload(item.id, e)}
                          className="hidden" 
                          accept="image/*" 
                        />
                      </div>

                      {/* Product Details Section */}
                      <div className="flex-grow space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Product Name</label>
                            <input 
                              value={item.name} 
                              onChange={(e) => updateMenuItem(item.id, { name: e.target.value })}
                              className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-5 py-3 text-sm font-bold text-white focus:border-orange-500 transition-all" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Price (ZAR)</label>
                            <div className="relative">
                              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 font-black">R</span>
                              <input 
                                type="number" 
                                value={item.price} 
                                onChange={(e) => updateMenuItem(item.id, { price: Number(e.target.value) })}
                                className="w-full bg-zinc-950 border border-white/5 rounded-2xl pl-10 pr-5 py-3 text-sm font-black text-white focus:border-orange-500 transition-all" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Gastronomic Description</label>
                          <textarea 
                            value={item.description} 
                            onChange={(e) => updateMenuItem(item.id, { description: e.target.value })}
                            className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-5 py-3 text-xs text-zinc-400 resize-none leading-relaxed focus:border-orange-500 transition-all" 
                            rows={3}
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
                           <div className="space-y-2 min-w-[150px]">
                              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Category</label>
                              <select 
                                value={item.category}
                                onChange={(e) => updateMenuItem(item.id, { category: e.target.value as MenuCategory })}
                                className="w-full bg-zinc-950 text-xs font-bold uppercase rounded-xl px-4 py-2 border border-white/10 text-white outline-none"
                              >
                                {Object.values(MenuCategory).filter(c => c !== MenuCategory.ALL).map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                           </div>

                           <div className="flex gap-3 mt-4 md:mt-0">
                              {[
                                { label: 'Spicy', key: 'spicy' },
                                { label: 'Healthy', key: 'healthy' },
                                { label: 'Gluten Free', key: 'glutenFree' }
                              ].map(attr => (
                                <button 
                                  key={attr.key}
                                  onClick={() => updateMenuItem(item.id, { [attr.key]: !(item as any)[attr.key] })}
                                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    (item as any)[attr.key] 
                                      ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20' 
                                      : 'bg-zinc-800 border-white/5 text-zinc-600 hover:text-zinc-400'
                                  }`}
                                >
                                  {attr.label}
                                </button>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
              <section className="space-y-6">
                <h3 className="text-lg font-bold font-jakarta border-l-2 border-orange-500 pl-4">General Settings</h3>
                <div className="grid gap-6 p-6 rounded-3xl bg-zinc-900 border border-white/5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500">Website Name (Logo Text)</label>
                    <input 
                      value={config.siteName}
                      onChange={(e) => updateConfig({ siteName: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-orange-500"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-bold font-jakarta border-l-2 border-orange-500 pl-4">Hero Content</h3>
                <div className="grid gap-6 p-6 rounded-3xl bg-zinc-900 border border-white/5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-500">Title Prefix</label>
                      <input 
                        value={config.hero.title}
                        onChange={(e) => updateConfig({ hero: { ...config.hero, title: e.target.value } })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-500">Accent Word</label>
                      <input 
                        value={config.hero.accentWord}
                        onChange={(e) => updateConfig({ hero: { ...config.hero, accentWord: e.target.value } })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500">Description</label>
                    <textarea 
                      value={config.hero.description}
                      onChange={(e) => updateConfig({ hero: { ...config.hero, description: e.target.value } })}
                      rows={3}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500">Hero Image URL</label>
                    <input 
                      value={config.hero.image}
                      onChange={(e) => updateConfig({ hero: { ...config.hero, image: e.target.value } })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-bold font-jakarta border-l-2 border-orange-500 pl-4">Experience Blocks</h3>
                <div className="grid gap-6">
                  {config.experience.items.map((item, idx) => (
                    <div key={item.id} className="p-6 rounded-3xl bg-zinc-900 border border-white/5 space-y-4">
                      <input 
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...config.experience.items];
                          newItems[idx].title = e.target.value;
                          updateConfig({ experience: { ...config.experience, items: newItems } });
                        }}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold"
                      />
                      <textarea 
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...config.experience.items];
                          newItems[idx].description = e.target.value;
                          updateConfig({ experience: { ...config.experience, items: newItems } });
                        }}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-zinc-400 resize-none"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-jakarta">Latest News & Blog Posts</h3>
                <button onClick={addPost} className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-full text-xs font-bold hover:bg-orange-500">
                  <Plus size={14}/> Create New Post
                </button>
              </div>
              <div className="grid gap-6">
                {posts.map(post => (
                  <div key={post.id} className="p-6 rounded-3xl bg-zinc-900 border border-white/5 flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="flex-grow space-y-4">
                        <input 
                          value={post.title}
                          onChange={(e) => updatePost(post.id, { title: e.target.value })}
                          className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold"
                          placeholder="Post Title"
                        />
                        <textarea 
                          value={post.excerpt}
                          onChange={(e) => updatePost(post.id, { excerpt: e.target.value })}
                          className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-zinc-400 resize-none"
                          placeholder="Excerpt..."
                          rows={2}
                        />
                      </div>
                      <img src={post.image} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                    </div>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex gap-2">
                        <select 
                          value={post.status}
                          onChange={(e) => updatePost(post.id, { status: e.target.value as any })}
                          className="bg-zinc-950 text-[10px] font-bold uppercase rounded-lg px-3 py-1 border border-white/5"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                        <input 
                          value={post.category}
                          onChange={(e) => updatePost(post.id, { category: e.target.value })}
                          className="bg-zinc-950 text-[10px] font-bold uppercase rounded-lg px-3 py-1 border border-white/5 w-24"
                          placeholder="Category"
                        />
                      </div>
                      <button 
                        onClick={() => updatePosts(posts.filter(p => p.id !== post.id))}
                        className="text-rose-500 hover:text-rose-400 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'navigation' && (
            <div className="space-y-8">
              <h3 className="text-lg font-bold font-jakarta">Main Menu Editor</h3>
              <div className="grid gap-4">
                {config.navigation.map(item => (
                  <div key={item.id} className="p-4 rounded-3xl bg-zinc-900 border border-white/5 flex items-center gap-4">
                    <div className="flex-grow grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Label</label>
                        <input 
                          value={item.label}
                          onChange={(e) => updateNavItem(item.id, { label: e.target.value })}
                          className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Target Section ID</label>
                        <input 
                          value={item.target}
                          onChange={(e) => updateNavItem(item.id, { target: e.target.value })}
                          className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => updateConfig({ 
                    navigation: [...config.navigation, { id: Math.random().toString(), label: 'New Link', target: 'hero' }] 
                  })}
                  className="w-full p-4 border-2 border-dashed border-white/5 rounded-3xl text-zinc-600 hover:text-zinc-400 hover:border-white/10 transition-all text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Custom Link
                </button>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-12">
              <section className="space-y-6">
                <h3 className="text-lg font-bold font-jakarta">Homepage Layout Management</h3>
                <div className="rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden">
                  {config.sections.map((section, idx) => (
                    <div key={section.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-1">
                          <button onClick={() => handleSectionMove(idx, 'up')} className="p-1 hover:text-white text-zinc-600"><ArrowUp size={14}/></button>
                          <button onClick={() => handleSectionMove(idx, 'down')} className="p-1 hover:text-white text-zinc-600"><ArrowDown size={14}/></button>
                        </div>
                        <span className="text-sm font-bold">{section.name}</span>
                      </div>
                      <button 
                        onClick={() => handleSectionToggle(section.id)}
                        className={`p-2 rounded-lg transition-all ${section.visible ? 'text-green-500 bg-green-500/10' : 'text-zinc-600 bg-zinc-800'}`}
                      >
                        {section.visible ? <Eye size={18}/> : <EyeOff size={18}/>}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-lg font-bold font-jakarta">Global Styles</h3>
                <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-zinc-900 border border-white/5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500">Brand Color</label>
                    <div className="flex gap-2">
                      {['#f97316', '#e11d48', '#9333ea', '#2563eb', '#16a34a'].map(color => (
                        <button 
                          key={color}
                          onClick={() => updateConfig({ design: { ...config.design, primaryColor: color } })}
                          className={`h-8 w-8 rounded-full border-2 ${config.design.primaryColor === color ? 'border-white' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500">Typography</label>
                    <select 
                      value={config.design.fontFamily}
                      onChange={(e) => updateConfig({ design: { ...config.design, fontFamily: e.target.value } })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm"
                    >
                      <option value="Inter">Inter (Default)</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta (Modern)</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8">
              <h3 className="text-lg font-bold font-jakarta">SEO & Metadata</h3>
              <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Meta Page Title</label>
                  <input 
                    value={config.seo.title}
                    onChange={(e) => updateConfig({ seo: { ...config.seo, title: e.target.value } })}
                    className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Meta Description</label>
                  <textarea 
                    value={config.seo.description}
                    onChange={(e) => updateConfig({ seo: { ...config.seo, description: e.target.value } })}
                    rows={4}
                    className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
