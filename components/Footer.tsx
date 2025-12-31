
import React, { useState } from 'react';
import { Instagram, Twitter, Facebook, Send, MessageCircle } from 'lucide-react';
import { useSite } from '../SiteContext.tsx';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const { config, t, language } = useSite();
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
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="py-16 md:py-20 px-4 md:px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold font-jakarta tracking-tight">{t('joinClub')}</h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto lg:mx-0 leading-relaxed">{t('stayUpdated')}</p>
          </div>
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-2xl text-center animate-in zoom-in duration-300">
                <p className="font-bold text-sm">{language === 'fr' ? 'Merci!' : 'Thank you!'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email" 
                  required 
                  className="flex-grow bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-orange-500" 
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  style={{ backgroundColor: config.design.primaryColor }} 
                  className="px-8 h-12 sm:h-auto rounded-2xl text-white font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {t('subscribe')} <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-lg md:text-xl font-bold tracking-tighter text-white uppercase font-jakarta">{config.siteName}</span>
              <span className="text-zinc-800">|</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">EST. 2023</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900/50 rounded-full border border-zinc-800">
              <MessageCircle size={16} className="text-[#25D366]" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{config.footer.whatsapp}</span>
            </div>
          </div>

          <div className="flex gap-8">
            <a href={config.footer.socials.instagram} target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href={config.footer.socials.twitter} target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href={config.footer.socials.facebook} target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Facebook size={20} /></a>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-[10px] text-zinc-600 font-medium">© 2024 {config.siteName}. All Rights Reserved.</p>
            <div className="flex gap-6 text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
              <button onClick={onOpenPrivacy} className="hover:text-zinc-400 transition-colors">{t('privacy')}</button>
              <button onClick={onOpenTerms} className="hover:text-zinc-400 transition-colors">{t('terms')}</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
