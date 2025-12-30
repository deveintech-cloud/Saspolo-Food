
import React, { useState } from 'react';
import { MapPin, ChevronDown, Clock, Sparkles, User, Phone, MessageSquare, Calendar as CalendarIcon, Utensils } from 'lucide-react';
import { useSite } from '../SiteContext.tsx';

const Reservation: React.FC = () => {
  const { t, language, config } = useSite();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const timeOptions = [
    { label: "Lunch", times: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"] },
    { label: "Dinner", times: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mbdjekvl", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        e.currentTarget.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          alert(data.errors.map((error: any) => error.message).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reserve" className="py-32 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-900 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Left Side: Form */}
          <div className="flex-1 p-8 md:p-16 lg:p-24 space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 text-orange-500 text-[10px] font-bold uppercase tracking-widest border border-orange-500/20">
                <Sparkles size={12} />
                Concierge Service
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-jakarta text-white">{t('bookATable')}</h2>
              <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md">{t('securePerfect')}</p>
            </div>

            {success ? (
              <div className="bg-green-500/5 border border-green-500/20 text-green-500 p-10 rounded-[2rem] animate-in zoom-in duration-500 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={32} />
                </div>
                <p className="font-bold text-2xl mb-2">{language === 'fr' ? 'Félicitations!' : 'Reservation Confirmed!'}</p>
                <p className="text-zinc-400">
                  {language === 'fr' 
                    ? 'Votre table a été sécurisée. Un membre de notre équipe vous contactera sous peu.' 
                    : 'Your journey begins soon. A team member will reach out to confirm your selection shortly.'}
                </p>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" onSubmit={handleSubmit}>
                
                {/* Full Name */}
                <div className="space-y-3 group md:col-span-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <User size={14} />
                    {t('fullName')}
                  </div>
                  <input 
                    name="full_name"
                    type="text" 
                    placeholder="Marcus Aurelius" 
                    required
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-all placeholder-zinc-800"
                  />
                </div>

                {/* Date */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <CalendarIcon size={14} />
                    {t('date')}
                  </div>
                  <input 
                    name="date"
                    type="date" 
                    required
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-all color-scheme-dark"
                  />
                </div>

                {/* Time Selection Dropdown */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <Clock size={14} />
                    {t('time')}
                  </div>
                  <div className="relative">
                    <select 
                      name="time"
                      required
                      className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-zinc-950 text-zinc-600">Select Time</option>
                      {timeOptions.map(group => (
                        <optgroup key={group.label} label={group.label} className="bg-zinc-950 font-bold text-orange-500">
                          {group.times.map(time => (
                            <option key={time} value={time} className="bg-zinc-900 text-white py-2">{time}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-3.5 text-zinc-500 pointer-events-none group-hover:text-white transition-colors" size={16} />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <User size={14} />
                    {t('guests')}
                  </div>
                  <div className="relative">
                    <select 
                      name="guests"
                      required
                      className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-zinc-900" value="1">1 {language === 'fr' ? 'Personne' : 'Person'}</option>
                      <option className="bg-zinc-900" value="2">2 {language === 'fr' ? 'Personnes' : 'People'}</option>
                      <option className="bg-zinc-900" value="3">3 {language === 'fr' ? 'Personnes' : 'People'}</option>
                      <option className="bg-zinc-900" value="4">4 {language === 'fr' ? 'Personnes' : 'People'}</option>
                      <option className="bg-zinc-900" value="5">5 {language === 'fr' ? 'Personnes' : 'People'}</option>
                      <option className="bg-zinc-900" value="6+">6+ {language === 'fr' ? 'Personnes' : 'People'}</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-3.5 text-zinc-500 pointer-events-none group-hover:text-white transition-colors" size={16} />
                  </div>
                </div>

                {/* Occasion Option */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <Utensils size={14} />
                    {t('occasion')}
                  </div>
                  <div className="relative">
                    <select 
                      name="occasion"
                      className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-zinc-900" value="none">{t('none')}</option>
                      <option className="bg-zinc-900" value="birthday">{t('birthday')}</option>
                      <option className="bg-zinc-900" value="anniversary">{t('anniversary')}</option>
                      <option className="bg-zinc-900" value="date_night">{t('date_night')}</option>
                      <option className="bg-zinc-900" value="proposal">{t('proposal') || 'Marriage Proposal'}</option>
                      <option className="bg-zinc-900" value="business">{t('business')}</option>
                      <option className="bg-zinc-900" value="graduation">{t('graduation') || 'Graduation'}</option>
                      <option className="bg-zinc-900" value="other">{t('other')}</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-3.5 text-zinc-500 pointer-events-none group-hover:text-white transition-colors" size={16} />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <Phone size={14} />
                    {t('phone') || 'Phone Number'}
                  </div>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="+27 (000) 000-0000" 
                    required
                    className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-all placeholder-zinc-800"
                  />
                </div>

                {/* Window Seat Request Toggle */}
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t('requestWindow')}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input name="request_window_seat" type="checkbox" value="yes" className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                {/* Special Requests */}
                <div className="space-y-3 group md:col-span-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <MessageSquare size={14} />
                    {t('special_requests') || 'Special Instructions / Allergies'}
                  </div>
                  <textarea 
                    name="special_requests"
                    rows={2}
                    placeholder="Tell us about allergies, preferred wine, or surprise elements..." 
                    className="w-full bg-zinc-800/20 border border-zinc-800/50 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-orange-500 transition-all placeholder-zinc-800 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="md:col-span-2 w-full h-16 bg-white text-zinc-950 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all disabled:opacity-50 shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden group"
                >
                  {isSubmitting ? (
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  ) : (
                    <>
                      {t('confirmReserve')}
                      <ChevronDown size={18} className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Right Side: Map/Visual */}
          <div id="location" className="relative min-h-[400px] md:w-[40%] bg-zinc-800">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-40 mix-blend-luminosity" 
              alt="Restaurant interior ambiance"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-12">
              <div 
                className="bg-zinc-900/60 backdrop-blur-2xl border border-white/5 p-8 shadow-2xl space-y-6"
                style={{ borderRadius: config.design.borderRadius }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-orange-500 mb-4">
                    <MapPin size={24} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Our Location</span>
                  </div>
                  <h4 className="text-3xl font-bold text-white font-jakarta">15 Hunter Street</h4>
                  <p className="text-zinc-400 text-sm font-medium tracking-wide">Yeoville, Johannesburg, 2198</p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest">Lunch</span>
                    <span className="text-zinc-300">12:00 PM – 3:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest">Dinner</span>
                    <span className="text-zinc-300">6:00 PM – 11:00 PM</span>
                  </div>
                </div>

                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest hover:text-white transition-colors group"
                >
                  Get Directions
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Internal small helper since ArrowRight was used but maybe not imported
const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default Reservation;
