
import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const Reservation: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
    <section id="reserve" className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-20 flex flex-col justify-center">
              <h2 className="text-4xl font-medium tracking-tight mb-3 font-jakarta text-white">Book a Table</h2>
              <p className="text-zinc-400 text-base mb-10">Secure the perfect setting for an unforgettable dining experience.</p>
              
              {success ? (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-8 rounded-2xl animate-in zoom-in duration-300">
                  <p className="font-bold text-lg mb-1">Reservation Confirmed!</p>
                  <p className="text-sm opacity-80">Thank you. Your details have been sent to our concierge. We will contact you shortly.</p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Date</label>
                      <input 
                        name="date"
                        type="date" 
                        required
                        className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Guests</label>
                      <div className="relative">
                        <select 
                          name="guests"
                          required
                          className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                        >
                          <option className="bg-zinc-900" value="2">2 People</option>
                          <option className="bg-zinc-900" value="4">4 People</option>
                          <option className="bg-zinc-900" value="6+">6+ People</option>
                        </select>
                        <ChevronDown className="absolute right-0 top-3 text-zinc-500 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Full Name</label>
                    <input 
                      name="full_name"
                      type="text" 
                      placeholder="e.g. Marcus Aurelius" 
                      required
                      className="w-full bg-transparent border-b border-zinc-800 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors placeholder-zinc-700"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-zinc-400 font-medium">Request Window Seat</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input name="request_window_seat" type="checkbox" value="yes" className="sr-only peer" />
                      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-zinc-950 py-4 rounded-2xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 shadow-xl shadow-white/5 active:scale-95"
                  >
                    {isSubmitting ? 'Sending...' : 'Confirm Reservation'}
                  </button>
                </form>
              )}
            </div>
            
            <div id="location" className="relative h-[400px] md:h-auto bg-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" 
                alt="Restaurant interior ambiance"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
              
              <div className="absolute bottom-12 left-12 right-12">
                <div className="bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl group cursor-pointer hover:bg-zinc-950/60 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-500 shadow-lg group-hover:scale-110 transition-transform">
                      <MapPin size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white font-jakarta">128 Culinary Ave.</p>
                      <p className="text-sm text-zinc-400 font-medium tracking-wide">Downtown District, New York</p>
                    </div>
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
