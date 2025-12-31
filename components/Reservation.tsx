
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
    <section id="reserve" className="py-20 md:py-32 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-zinc-900 border border-white/5 shadow-2xl flex flex-col lg:flex-row" style={{ borderRadius: config.design.borderRadius }}>
          
          {/* Left Side: Form */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 lg:p-24 space-y-10 md:space-y-12">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 text-orange-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border border-orange-500/20">
                <Sparkles size={12} />
                Concierge Service
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-jakarta text-white">{t('bookATable')}</h2>
              <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0">{t('securePerfect')}</p>
            </div>

            {success ? (
              <div className="bg-green-500/5 border border-green-500/20 text-green-500 p-8 rounded-[1.5rem] md:p-10 md:rounded-[2rem] animate-in zoom-in duration-500 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={24} className="md:size-[32px]" />
                </div>
                <p className="font-bold text-xl md:text-2xl mb-2">{language === 'fr' ? 'Félicitations!' : 'Confirmed!'}</p>
                <p className="text-zinc-400 text-sm md:text-base">
                  {language === 'fr' 
                    ? 'Votre table a été sécurisée. Nous vous contacterons sous peu.' 
                    : 'Your journey begins soon. Our team will contact you shortly.'}
                </p>
              </div>
            ) : (
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10" onSubmit={handleSubmit}>
                
                {/* Full Name */}
                <div className="space-y-3 group sm:col-span-2">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <User size={14} />
                    {t('fullName')}
                  </div>
                  <input 
                    name="full_name"
                    type="text" 
                    placeholder="Marcus Aurelius" 
                    required
                    className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-all placeholder-zinc-800"
                  />
                </div>

                {/* Date */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <CalendarIcon size={14} />
                    {t('date')}
                  </div>
                  <input 
                    name="date"
                    type="date" 
                    required
                    className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-all color-scheme-dark"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <Clock size={14} />
                    {t('time')}
                  </div>
                  <div className="relative">
                    <select 
                      name="time"
                      required
                      className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
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
                    <ChevronDown className="absolute right-0 top-3 text-zinc-500 pointer-events-none group-hover:text-white transition-colors" size={14} />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <User size={14} />
                    {t('guests')}
                  </div>
                  <div className="relative">
                    <select 
                      name="guests"
                      required
                      className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, '6+'].map(val => (
                        <option key={val} className="bg-zinc-900" value={val}>{val} {language === 'fr' ? 'Personnes' : 'People'}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-3 text-zinc-500 pointer-events-none group-hover:text-white transition-colors" size={14} />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-3 group">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <Phone size={14} />
                    {t('phone') || 'Phone'}
                  </div>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="+27 00 000 0000" 
                    required
                    className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-all placeholder-zinc-800"
                  />
                </div>

                {/* Special Requests */}
                <div className="space-y-3 group sm:col-span-2">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] group-focus-within:text-orange-500 transition-colors">
                    <MessageSquare size={14} />
                    {t('special_requests') || 'Requests'}
                  </div>
                  <textarea 
                    name="special_requests"
                    rows={2}
                    placeholder="Any allergies or special occasions..." 
                    className="w-full bg-zinc-800/10 border border-zinc-800/50 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-orange-500 transition-all placeholder-zinc-800 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:col-span-2 w-full h-14 md:h-16 bg-white text-zinc-950 rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all disabled:opacity-50 shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  ) : (
                    <>
                      {t('confirmReserve')}
                      <ChevronDown size={18} className="rotate-[-90deg]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Right Side: Visual Context */}
          <div id="location" className="relative min-h-[350px] lg:w-[40%] bg-zinc-800 overflow-hidden" style={{ borderBottomRightRadius: config.design.borderRadius, borderTopRightRadius: window.innerWidth >= 1024 ? config.design.borderRadius : 0, borderBottomLeftRadius: window.innerWidth < 1024 ? config.design.borderRadius : 0 }}>
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-40 mix-blend-luminosity" 
              alt="Restaurant ambiance"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div 
                className="bg-zinc-900/60 backdrop-blur-2xl border border-white/5 p-6 md:p-8 shadow-2xl space-y-4 md:space-y-6"
                style={{ borderRadius: `calc(${config.design.borderRadius} / 1.5)` }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-orange-500 mb-2 md:mb-4">
                    <MapPin size={22} strokeWidth={2.5} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Address</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white font-jakarta leading-tight">15 Hunter Street, Yeoville</h4>
                  <p className="text-zinc-400 text-xs font-medium tracking-wide">Johannesburg, 2198</p>
                </div>
                
                <div className="pt-4 md:pt-6 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest">Lunch</span>
                    <span className="text-zinc-300">12:00 – 15:30</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest">Dinner</span>
                    <span className="text-zinc-300">18:00 – 23:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
