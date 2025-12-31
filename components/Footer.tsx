
import React, { useState } from 'react';
import { Instagram, Twitter, Facebook, Send, MessageCircle, MapPin, Clock } from 'lucide-react';
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
    <footer className="py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Newsletter Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold font-jakarta tracking-tight text-white">{t('joinClub')}</h3>
            <p className="text-zinc-500 text-sm md:text-base max-w-sm mx-auto lg:mx-0 leading-relaxed">{t('stayUpdated')}</p>
          </div>
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-6 rounded-2xl text-center animate-in zoom-in duration-300">
                <p className="font-bold text-sm md:text-base">{language === 'fr' ? 'Bienvenue au Cercle.' : 'Welcome to the Inner Circle.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@exclusive.com" 
                  required 
                  className="flex-grow bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-orange-500 text-white" 
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  style={{ backgroundColor: config.design.primaryColor }} 
                  className="px-8 h-12 sm:h-auto rounded-2xl text-white font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-orange-950/20"
                >
                  {t('subscribe')} <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 pt-12 border-t border-white/5">
           <div className="space-y-6">
              <span className="text-lg md:text-xl font-bold tracking-tighter text-white uppercase font-jakarta">{config.siteName}</span>
              <p className="text-zinc-500 text-xs leading-relaxed font-light">
                {language === 'fr' 
                  ? "Une expérience culinaire immersive célébrant l'âme, le sol et les saveurs ancestrales du Congo."
                  : "An immersive culinary experience celebrating the soul, soil, and ancestral flavors of the Congo."}
              </p>
           </div>

           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 flex items-center gap-2">
                <MapPin size={14} /> {t('visit')}
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                15 Hunter Street, Yeoville<br />
                Johannesburg, 2198<br />
                South Africa
              </p>
           </div>

           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 flex items-center gap-2">
                <Clock size={14} /> {language === 'fr' ? 'HORAIRES' : 'HOURS'}
              </h4>
              <div className="space-y-2 text-zinc-400 text-[11px] font-medium">
                <div className="flex justify-between border-b border-white/5 pb-1"><span>{language === 'fr' ? 'Déjeuner' : 'Lunch'}</span> <span>12:00 – 15:30</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span>{language === 'fr' ? 'Dîner' : 'Dinner'}</span> <span>18:00 – 23:00</span></div>
                <div className="flex justify-between"><span>{language === 'fr' ? 'Lundi' : 'Monday'}</span> <span className="text-zinc-600">{language === 'fr' ? 'Fermé' : 'Closed'}</span></div>
              </div>
           </div>

           <div className="space-y-6 text-center sm:text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">{language === 'fr' ? 'SUIVEZ-NOUS' : 'CONNECT'}</h4>
              <div className="flex gap-6 justify-center sm:justify-start">
                <a href={config.footer.socials.instagram} target="_blank" className="text-zinc-500 hover:text-white transition-all transform hover:scale-110"><Instagram size={20} /></a>
                <a href={config.footer.socials.twitter} target="_blank" className="text-zinc-500 hover:text-white transition-all transform hover:scale-110"><Twitter size={20} /></a>
                <a href={config.footer.socials.facebook} target="_blank" className="text-zinc-500 hover:text-white transition-all transform hover:scale-110"><Facebook size={20} /></a>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full inline-flex">
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{config.footer.whatsapp}</span>
                </div>
              </div>
           </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
          <p className="text-[10px] text-zinc-600 font-medium">© 2024 {config.siteName}. {language === 'fr' ? 'Tous droits réservés.' : 'All Rights Reserved.'}</p>
          <div className="flex gap-8 text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
            <button onClick={onOpenPrivacy} className="hover:text-zinc-400 transition-colors underline-offset-4 hover:underline">{t('privacy')}</button>
            <button onClick={onOpenTerms} className="hover:text-zinc-400 transition-colors underline-offset-4 hover:underline">{t('terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
