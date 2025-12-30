
import React, { useState } from 'react';
import { Instagram, Twitter, Facebook, Send, MessageCircle } from 'lucide-react';
import { useSite } from '../SiteContext.tsx';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const { config } = useSite();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mbdjekvl", {
        method: "POST",
        body: JSON.stringify({ email, type: 'Newsletter Subscription' }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Top Section with Newsletter */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-jakarta">Join the Elengi Club</h3>
            <p className="text-zinc-500 text-sm max-w-sm">Stay updated with our latest seasonal menus, exclusive events, and culinary insights.</p>
          </div>
          <div className="relative">
            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-2xl text-center animate-in zoom-in duration-300">
                <p className="font-bold text-sm">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-orange-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: config.design.primaryColor }}
                  className="px-8 rounded-2xl text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? '...' : 'Subscribe'}
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section with Branding and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold tracking-tighter text-white uppercase font-jakarta">{config.siteName}</span>
              <span className="text-zinc-800">|</span>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">EST. 2023</span>
            </div>
            <p className="text-zinc-600 text-xs text-center md:text-left">Elevating culinary art through innovation and tradition.</p>
            <div className="flex items-center gap-2 mt-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800">
              <MessageCircle size={16} className="text-[#25D366]" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Order WhatsApp: +27 65 845 6336</span>
            </div>
          </div>

          <div className="flex gap-10">
            <button className="text-zinc-500 hover:text-orange-500 transition-colors">
              <Instagram size={20} strokeWidth={1.5} />
            </button>
            <button className="text-zinc-500 hover:text-orange-500 transition-colors">
              <Twitter size={20} strokeWidth={1.5} />
            </button>
            <button className="text-zinc-500 hover:text-orange-500 transition-colors">
              <Facebook size={20} strokeWidth={1.5} />
            </button>
            <a href="https://wa.me/27658456336" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#25D366] transition-colors">
              <MessageCircle size={20} strokeWidth={1.5} />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-zinc-600 font-medium">© 2024 {config.siteName} Food Group. All rights reserved.</p>
            <div className="flex gap-4 text-[10px] text-zinc-700 font-bold uppercase tracking-widest">
              <button onClick={onOpenPrivacy} className="hover:text-zinc-400">Privacy</button>
              <button onClick={onOpenTerms} className="hover:text-zinc-400">Terms</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
