
import React, { useState } from 'react';
import { 
  Layout, 
  Settings, 
  FileText, 
  Image as ImageIcon, 
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
  PlusCircle
} from 'lucide-react';
import { useSite } from '../SiteContext';
import { MenuCategory, MenuItem, Post, NavItem } from '../types';

const AddDishModal: React.FC<{ onSave: (dish: MenuItem) => void, onClose: () => void }> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState<MenuItem>({
    id: Math.random().toString(36).substr(2, 9),
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

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/90 p-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-2xl font-bold font-jakarta">Add New Dish</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500">Dish Name</label>
              <input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500">Price ($)</label>
              <input 
                type="number"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-zinc-500">Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as MenuCategory})}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm"
              >
                {Object.values(MenuCategory).filter(c => c !== MenuCategory.ALL).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500">Image URL</label>
              <input 
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-zinc-950">
            {[
              { label: 'Spicy', key: 'spicy' },
              { label: 'Healthy', key: 'healthy' },
              { label: 'Gluten Free', key: 'glutenFree' }
            ].map(attr => (
              <label key={attr.key} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={(formData as any)[attr.key]}
                  onChange={e => setFormData({...formData, [attr.key]: e.target.checked})}
                  className="w-4 h-4 rounded border-zinc-800 text-orange-600 focus:ring-orange-500 bg-zinc-900"
                />
                <span className="text-xs font-bold text-zinc-400">{attr.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-zinc-900/50 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-grow py-4 rounded-2xl border border-white/5 text-sm font-bold hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (formData.name && formData.price > 0) onSave(formData);
              else alert("Please fill in the name and price.");
            }}
            className="flex-grow py-4 rounded-2xl bg-orange-600 text-white text-sm font-bold hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20"
          >
            Create Dish
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
      id: Math.random().toString(36).substr(2, 9),
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
      <div className="w-64 border-r border-white/10 bg-zinc-900 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tighter uppercase font-jakarta">{config.siteName} CMS</span>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-md transition-colors text-zinc-500">
            <Undo2 size={16} />
          </button>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: 'content', label: 'Pages & Blocks', icon: <FileText size={18} /> },
            { id: 'posts', label: 'News Stories', icon: <Newspaper size={18} /> },
            { id: 'menu', label: 'Menu Editor', icon: <MenuIcon size={18} /> },
            { id: 'navigation', label: 'Navigation', icon: <LinkIcon size={18} /> },
            { id: 'design', label: 'Appearance', icon: <Palette size={18} /> },
            { id: 'seo', label: 'SEO Settings', icon: <Search size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 space-y-2">
          <button 
            onClick={resetToDefaults}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
          >
            Reset All Content
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-grow overflow-y-auto bg-zinc-950/50">
        <header className="sticky top-0 z-10 p-8 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between">
          <h2 className="text-2xl font-bold font-jakarta capitalize">{activeTab} Management</h2>
          <button onClick={onClose} className="px-6 py-2 bg-white text-zinc-950 rounded-full text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-2">
            <Save size={14} />
            Publish Updates
          </button>
        </header>

        <div className="max-w-4xl mx-auto p-12">
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

          {activeTab === 'menu' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-jakarta">Dishes & Pricing</h3>
                <button 
                  onClick={() => setShowAddDishModal(true)} 
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 rounded-2xl text-xs font-bold hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20"
                >
                  <PlusCircle size={16}/> Add New Dish
                </button>
              </div>
              <div className="grid gap-6">
                {menuItems.map(item => (
                  <div key={item.id} className="p-6 rounded-[2.5rem] bg-zinc-900 border border-white/5 flex flex-col gap-6 group hover:border-white/10 transition-all">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input 
                            value={item.name} 
                            onChange={(e) => updateMenuItem(item.id, { name: e.target.value })}
                            className="bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-bold" 
                            placeholder="Dish Name"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-600 font-bold">$</span>
                            <input 
                              type="number" 
                              value={item.price} 
                              onChange={(e) => updateMenuItem(item.id, { price: Number(e.target.value) })}
                              className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-orange-500 font-bold" 
                            />
                          </div>
                        </div>
                        <textarea 
                          value={item.description} 
                          onChange={(e) => updateMenuItem(item.id, { description: e.target.value })}
                          className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-zinc-500 resize-none" 
                          rows={2}
                          placeholder="Description..."
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex gap-3">
                        <select 
                          value={item.category}
                          onChange={(e) => updateMenuItem(item.id, { category: e.target.value as MenuCategory })}
                          className="bg-zinc-950 text-[10px] font-bold uppercase rounded-lg px-3 py-1 border border-white/5"
                        >
                          {Object.values(MenuCategory).filter(c => c !== MenuCategory.ALL).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          {[
                            { label: 'Spicy', key: 'spicy' },
                            { label: 'Healthy', key: 'healthy' },
                            { label: 'Gluten Free', key: 'glutenFree' }
                          ].map(attr => (
                            <button 
                              key={attr.key}
                              onClick={() => updateMenuItem(item.id, { [attr.key]: !(item as any)[attr.key] })}
                              className={`text-[10px] font-bold uppercase rounded-lg px-2 py-1 border transition-all ${
                                (item as any)[attr.key] ? 'border-orange-500 text-orange-500 bg-orange-500/10' : 'border-white/5 text-zinc-600'
                              }`}
                            >
                              {attr.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => updateMenuItems(menuItems.filter(i => i.id !== item.id))} className="text-zinc-600 hover:text-rose-500 p-2">
                        <Trash2 size={18}/>
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
