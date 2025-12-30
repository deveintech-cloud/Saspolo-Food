
import React, { useState, useRef } from 'react';
import { 
  Layout, Settings, FileText, ImageIcon, Search, ChevronRight, Save, Trash2, Plus, 
  Eye, EyeOff, ArrowUp, ArrowDown, Undo2, Menu as MenuIcon, Palette, Newspaper, 
  Link as LinkIcon, X, PlusCircle, Upload, Info, BarChart3, Share2, Type, Square,
  CircleDot, Layers, Quote as QuoteIcon, Activity
} from 'lucide-react';
import { useSite } from '../SiteContext.tsx';
import { MenuCategory, MenuItem, Post, NavItem, SiteConfig } from '../types.ts';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-10">
    <h3 className="text-2xl font-bold font-jakarta text-white">{title}</h3>
    <p className="text-xs text-zinc-500 font-medium mt-1">{subtitle}</p>
    <div className="h-1 w-12 bg-orange-600 mt-4 rounded-full"></div>
  </div>
);

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { config, menuItems, posts, updateConfig, updateMenuItems, updatePosts, resetToDefaults } = useSite();
  const [activeTab, setActiveTab] = useState<'content' | 'about' | 'stats' | 'menu' | 'posts' | 'navigation' | 'design' | 'footer' | 'seo'>('content');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingMenuItemId, setEditingMenuItemId] = useState<string | null>(null);

  const updateNavItem = (id: string, updates: Partial<NavItem>) => {
    updateConfig({ navigation: config.navigation.map(n => n.id === id ? { ...n, ...updates } : n) });
  };

  const deleteNavItem = (id: string) => {
    updateConfig({ navigation: config.navigation.filter(n => n.id !== id) });
  };

  const moveAboutSection = (idx: number, direction: 'up' | 'down') => {
    const newSections = [...config.about.sections];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;
    
    [newSections[idx], newSections[targetIdx]] = [newSections[targetIdx], newSections[idx]];
    updateConfig({ about: { ...config.about, sections: newSections } });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex animate-in fade-in duration-300 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 bg-zinc-900 flex flex-col shrink-0 shadow-2xl overflow-y-auto">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase font-jakarta text-orange-500">System Control</span>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all text-zinc-500 hover:text-white"><Undo2 size={16} /></button>
          </div>
          <h1 className="text-lg font-bold text-white font-jakarta">Elengi Admin</h1>
        </div>
        
        <nav className="p-4 space-y-1">
          {[
            { id: 'content', label: 'Home Page', icon: <FileText size={16} /> },
            { id: 'about', label: 'About Story', icon: <Info size={16} /> },
            { id: 'stats', label: 'Statistics', icon: <BarChart3 size={16} /> },
            { id: 'posts', label: 'News Feed', icon: <Newspaper size={16} /> },
            { id: 'menu', label: 'Products', icon: <MenuIcon size={16} /> },
            { id: 'navigation', label: 'Navigation', icon: <LinkIcon size={16} /> },
            { id: 'footer', label: 'Footer & Links', icon: <Share2 size={16} /> },
            { id: 'design', label: 'Theme Design', icon: <Palette size={16} /> },
            { id: 'seo', label: 'SEO Config', icon: <Search size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id ? 'bg-orange-600 text-white shadow-xl' : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button onClick={resetToDefaults} className="w-full text-[9px] font-black uppercase text-rose-500 hover:bg-rose-500/10 p-3 rounded-xl">Hard Reset Application</button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto bg-zinc-950/40">
        <div className="max-w-4xl mx-auto p-12 pb-32">
          
          {activeTab === 'about' && (
            <div className="space-y-16">
              <SectionHeader title="About Us Master" subtitle="Manage your heritage narrative and philosophical statements." />
              
              {/* Header Controls */}
              <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Header Configuration</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase">Main Title</label>
                    <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm font-bold" value={config.about.title} onChange={e => updateConfig({ about: { ...config.about, title: e.target.value } })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase">Subtitle Description</label>
                    <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm resize-none" rows={2} value={config.about.subtitle} onChange={e => updateConfig({ about: { ...config.about, subtitle: e.target.value } })} />
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 space-y-8">
                <div className="flex items-center gap-3">
                  <QuoteIcon className="text-orange-500" size={20} />
                  <h4 className="font-bold text-white">Chef's Signature Quote</h4>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase">Quote Text</label>
                    <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm italic" rows={3} value={config.about.quote?.text} onChange={e => updateConfig({ about: { ...config.about, quote: { ...config.about.quote!, text: e.target.value } } })} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-600 uppercase">Author Name</label>
                      <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm font-bold" value={config.about.quote?.author} onChange={e => updateConfig({ about: { ...config.about, quote: { ...config.about.quote!, author: e.target.value } } })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-600 uppercase">Role/Title</label>
                      <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-xs" value={config.about.quote?.role} onChange={e => updateConfig({ about: { ...config.about, quote: { ...config.about.quote!, role: e.target.value } } })} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative Blocks */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Narrative Story Blocks</h4>
                  <button onClick={() => {
                    const newSec = { id: Date.now().toString(), title: 'New Story Chapter', text: 'Share a piece of your history...', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd' };
                    updateConfig({ about: { ...config.about, sections: [...config.about.sections, newSec] } });
                  }} className="p-2 text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all"><PlusCircle size={24} /></button>
                </div>
                
                {config.about.sections.map((sec, idx) => (
                  <div key={sec.id} className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 space-y-6 group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Section #{idx + 1}</span>
                        <div className="flex gap-1">
                          <button onClick={() => moveAboutSection(idx, 'up')} className="p-1 hover:bg-white/5 text-zinc-600 rounded"><ArrowUp size={12} /></button>
                          <button onClick={() => moveAboutSection(idx, 'down')} className="p-1 hover:bg-white/5 text-zinc-600 rounded"><ArrowDown size={12} /></button>
                        </div>
                      </div>
                      <button onClick={() => {
                        const newSecs = config.about.sections.filter(s => s.id !== sec.id);
                        updateConfig({ about: { ...config.about, sections: newSecs } });
                      }} className="text-rose-500 hover:bg-rose-500/10 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-4">
                        <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm font-bold" value={sec.title} onChange={e => {
                          const newSecs = [...config.about.sections];
                          newSecs[idx].title = e.target.value;
                          updateConfig({ about: { ...config.about, sections: newSecs } });
                        }} placeholder="Block Title" />
                        <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm resize-none" rows={4} value={sec.text} onChange={e => {
                          const newSecs = [...config.about.sections];
                          newSecs[idx].text = e.target.value;
                          updateConfig({ about: { ...config.about, sections: newSecs } });
                        }} placeholder="Block Description Text" />
                      </div>
                      <div className="space-y-4">
                        <div className="aspect-[4/5] bg-zinc-950 rounded-2xl overflow-hidden border border-white/5">
                          <img src={sec.image} className="w-full h-full object-cover" />
                        </div>
                        <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-[9px] font-mono" value={sec.image} onChange={e => {
                          const newSecs = [...config.about.sections];
                          newSecs[idx].image = e.target.value;
                          updateConfig({ about: { ...config.about, sections: newSecs } });
                        }} placeholder="Image URL" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <SectionHeader title="Journal Manager" subtitle="Control your stories, news and recipes." />
                <button 
                  onClick={() => {
                    const newPost: Post = {
                      id: Date.now().toString(),
                      title: 'New Story Title',
                      slug: 'new-story-' + Date.now(),
                      excerpt: 'Brief summary of the story...',
                      content: 'Write the full content here...',
                      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757',
                      status: 'draft',
                      category: 'Heritage',
                      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    };
                    updatePosts([newPost, ...posts]);
                    setEditingPostId(newPost.id);
                  }}
                  className="px-6 py-3 bg-orange-600 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-orange-500"
                >
                  Create Post
                </button>
              </div>

              <div className="grid gap-6">
                {posts.map(post => (
                  <div key={post.id} className={`p-6 bg-zinc-900 border ${editingPostId === post.id ? 'border-orange-500' : 'border-white/5'} rounded-[2rem] transition-all`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img src={post.image} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{post.title}</h4>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${post.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800 text-zinc-500'}`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setEditingPostId(editingPostId === post.id ? null : post.id)}
                          className="p-2 hover:bg-white/5 rounded-lg text-zinc-400"
                        >
                          <Settings size={18} />
                        </button>
                        <button 
                          onClick={() => updatePosts(posts.filter(p => p.id !== post.id))}
                          className="p-2 hover:bg-rose-500/10 rounded-lg text-rose-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {editingPostId === post.id && (
                      <div className="space-y-6 pt-6 border-t border-white/5 animate-in slide-in-from-top-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Title</label>
                            <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm" value={post.title} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, title: e.target.value } : p))} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Slug</label>
                            <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm" value={post.slug} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, slug: e.target.value } : p))} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Category</label>
                            <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-sm" value={post.category} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, category: e.target.value } : p))} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Status</label>
                            <select className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-[10px] uppercase font-bold" value={post.status} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, status: e.target.value as any } : p))}>
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Excerpt (Summary)</label>
                          <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs" rows={2} value={post.excerpt} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, excerpt: e.target.value } : p))} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Main Story Content</label>
                          <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs h-40" value={post.content} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, content: e.target.value } : p))} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Feature Image URL</label>
                          <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-[10px]" value={post.image} onChange={e => updatePosts(posts.map(p => p.id === post.id ? { ...p, image: e.target.value } : p))} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-12">
              <SectionHeader title="Theme Master" subtitle="Orchestrate the visual identity of Elengi Ya Malewa." />
              
              <div className="grid gap-10">
                {/* Color System */}
                <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-8">
                  <div className="flex items-center gap-3">
                    <Palette className="text-orange-500" size={20} />
                    <h5 className="font-bold text-white">Color Alchemy</h5>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Primary Identity (Neon)</label>
                      <div className="flex gap-4 items-center">
                        <input type="color" className="w-12 h-12 rounded-xl bg-transparent" value={config.design.primaryColor} onChange={e => updateConfig({ design: { ...config.design, primaryColor: e.target.value } })} />
                        <input className="flex-grow bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs font-mono" value={config.design.primaryColor} onChange={e => updateConfig({ design: { ...config.design, primaryColor: e.target.value } })} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Accent Secondary</label>
                      <div className="flex gap-4 items-center">
                        <input type="color" className="w-12 h-12 rounded-xl bg-transparent" value={config.design.accentColor} onChange={e => updateConfig({ design: { ...config.design, accentColor: e.target.value } })} />
                        <input className="flex-grow bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs font-mono" value={config.design.accentColor} onChange={e => updateConfig({ design: { ...config.design, accentColor: e.target.value } })} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography & Shape */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-8">
                    <div className="flex items-center gap-3">
                      <Type className="text-orange-500" size={20} />
                      <h5 className="font-bold text-white">Typography</h5>
                    </div>
                    <select 
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm font-medium"
                      value={config.design.fontFamily}
                      onChange={e => updateConfig({ design: { ...config.design, fontFamily: e.target.value as any } })}
                    >
                      <option value="Plus Jakarta Sans">Modern: Plus Jakarta Sans</option>
                      <option value="Inter">Classic: Inter</option>
                      <option value="Playfair Display">Elegant: Playfair Display</option>
                      <option value="Montserrat">Bold: Montserrat</option>
                    </select>
                  </div>

                  <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-8">
                    <div className="flex items-center gap-3">
                      <Square className="text-orange-500" size={20} />
                      <h5 className="font-bold text-white">Corners</h5>
                    </div>
                    <div className="space-y-4">
                       <input 
                        type="range" min="0" max="40" step="2"
                        className="w-full accent-orange-600"
                        value={parseInt(config.design.borderRadius)}
                        onChange={e => updateConfig({ design: { ...config.design, borderRadius: `${e.target.value}px` } })}
                      />
                      <div className="flex justify-between text-[9px] font-black text-zinc-600 uppercase">
                        <span>Sharp (0px)</span>
                        <span>Current: {config.design.borderRadius}</span>
                        <span>Soft (40px)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Depth */}
                <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-8">
                  <div className="flex items-center gap-3">
                    <Layers className="text-orange-500" size={20} />
                    <h5 className="font-bold text-white">Glassmorphism & Transparency</h5>
                  </div>
                  <div className="space-y-4">
                     <input 
                      type="range" min="0.1" max="1" step="0.05"
                      className="w-full accent-orange-600"
                      value={parseFloat(config.design.glassOpacity)}
                      onChange={e => updateConfig({ design: { ...config.design, glassOpacity: e.target.value } })}
                    />
                    <div className="flex justify-between text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                      <span>Crystal (10%)</span>
                      <span>Card Opacity: {Math.round(parseFloat(config.design.glassOpacity) * 100)}%</span>
                      <span>Solid (100%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-12">
              <SectionHeader title="Hero Experience" subtitle="Manage the first thing users see on landing." />
              <div className="grid gap-6 p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5">
                <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm" value={config.hero.title} onChange={e => updateConfig({ hero: { ...config.hero, title: e.target.value } })} placeholder="Title" />
                <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm text-orange-500 font-bold" value={config.hero.accentWord} onChange={e => updateConfig({ hero: { ...config.hero, accentWord: e.target.value } })} placeholder="Accent Word" />
                <textarea className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm resize-none" rows={3} value={config.hero.description} onChange={e => updateConfig({ hero: { ...config.hero, description: e.target.value } })} />
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-600">Background URL</label>
                  <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-5 py-3 text-sm" value={config.hero.image} onChange={e => updateConfig({ hero: { ...config.hero, image: e.target.value } })} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-12">
               <div className="flex justify-between items-center">
                 <SectionHeader title="Product Catalog" subtitle="Edit dishes, prices, ingredients and nutrition." />
                 <button onClick={() => updateMenuItems([...menuItems, { id: Date.now().toString(), name: 'New Item', price: 0, description: '', category: MenuCategory.MAIN, image: '', tags: [] }])} className="px-6 py-3 bg-orange-600 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-orange-500 shadow-xl">New Product</button>
               </div>
               <div className="grid gap-6">
                 {menuItems.map(item => (
                   <div key={item.id} className={`p-8 bg-zinc-900 border ${editingMenuItemId === item.id ? 'border-orange-500' : 'border-white/5'} rounded-[2.5rem] flex flex-col gap-8 group transition-all`}>
                      <div className="flex gap-8">
                        <div className="w-32 h-32 bg-zinc-950 rounded-3xl overflow-hidden shrink-0">
                           <img src={item.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow space-y-4">
                          <div className="flex justify-between">
                            <input className="bg-transparent border-b border-white/5 text-lg font-bold w-full mr-4 text-white" value={item.name} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))} />
                            <div className="flex items-center gap-2">
                              <button onClick={() => setEditingMenuItemId(editingMenuItemId === item.id ? null : item.id)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                <Settings size={18} />
                              </button>
                              <button onClick={() => updateMenuItems(menuItems.filter(i => i.id !== item.id))} className="text-rose-500 hover:bg-rose-500/10 p-2 rounded-lg transition-colors">
                                <Trash2 size={18}/>
                              </button>
                            </div>
                          </div>
                          <textarea className="w-full bg-zinc-950/50 border border-white/5 rounded-xl p-3 text-xs text-zinc-400" rows={2} value={item.description} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, description: e.target.value } : i))} />
                          <div className="flex items-center gap-4">
                             <input type="number" className="w-24 bg-zinc-950 border border-white/5 rounded-xl px-3 py-1 text-sm font-bold" value={item.price} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, price: Number(e.target.value) } : i))} />
                             <select className="bg-zinc-950 border border-white/5 rounded-xl px-3 py-1 text-[10px] uppercase font-bold" value={item.category} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, category: e.target.value as MenuCategory } : i))}>
                               {Object.values(MenuCategory).map(c => <option key={c} value={c}>{c}</option>)}
                             </select>
                          </div>
                        </div>
                      </div>

                      {editingMenuItemId === item.id && (
                        <div className="pt-8 border-t border-white/5 space-y-8 animate-in slide-in-from-top duration-300">
                          <div className="space-y-6">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                              <Activity size={12} />
                              Nutritional Data
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase">Calories</label>
                                <input 
                                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs" 
                                  value={item.nutrition?.calories || ''} 
                                  onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...i.nutrition, calories: e.target.value } } : i))}
                                  placeholder="e.g. 500 kcal"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase">Protein</label>
                                <input 
                                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs" 
                                  value={item.nutrition?.protein || ''} 
                                  onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...i.nutrition, protein: e.target.value } } : i))}
                                  placeholder="e.g. 20g"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase">Total Fat</label>
                                <input 
                                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs" 
                                  value={item.nutrition?.fat || ''} 
                                  onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...i.nutrition, fat: e.target.value } } : i))}
                                  placeholder="e.g. 15g"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase">Carbs</label>
                                <input 
                                  className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-xs" 
                                  value={item.nutrition?.carbs || ''} 
                                  onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, nutrition: { ...i.nutrition, carbs: e.target.value } } : i))}
                                  placeholder="e.g. 45g"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Image Source URL</label>
                             <input className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-mono" value={item.image} onChange={e => updateMenuItems(menuItems.map(i => i.id === item.id ? { ...i, image: e.target.value } : i))} />
                          </div>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-72 p-8 bg-zinc-900/80 backdrop-blur-xl border-t border-white/5 flex justify-end">
         <button onClick={onClose} className="px-10 py-4 bg-white text-zinc-950 rounded-2xl font-bold shadow-2xl hover:bg-orange-600 hover:text-white transition-all">Save & Publish All Changes</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
