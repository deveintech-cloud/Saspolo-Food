
import React from 'react';
import { useSite } from '../SiteContext.tsx';
import { History, Target, Sparkles, BookOpen, Quote } from 'lucide-react';

const AboutUs: React.FC = () => {
  const { t, config } = useSite();

  const iconMap: Record<string, any> = {
    '0': <History size={32} />,
    '1': <Target size={32} />,
    '2': <Sparkles size={32} />,
    'default': <BookOpen size={32} />
  };

  return (
    <section id="about" className="py-32 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-2">
            Our Heritage
          </div>
          <h2 className="text-4xl md:text-7xl font-bold font-jakarta text-white tracking-tight leading-tight">
            {config.about.title || t('about')}
          </h2>
          {config.about.subtitle && (
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-500 font-light leading-relaxed">
              {config.about.subtitle}
            </p>
          )}
          <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full mt-8"></div>
        </div>

        {/* Narrative Sections */}
        <div className="space-y-40">
          {config.about.sections.map((section, idx) => (
            <div 
              key={section.id} 
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
            >
              <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-orange-600/10 text-orange-500 shadow-xl shadow-orange-950/20">
                  {iconMap[idx.toString()] || iconMap['default']}
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl md:text-5xl font-bold font-jakarta text-white leading-tight">{section.title}</h3>
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
                    {section.text}
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full relative group">
                <div 
                  className="aspect-[4/5] overflow-hidden shadow-2xl border border-white/5 transition-all duration-700"
                  style={{ borderRadius: config.design.borderRadius }}
                >
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                </div>
                {/* Decorative frames */}
                <div 
                  className="absolute -z-10 -bottom-8 -right-8 w-full h-full border border-orange-600/10 pointer-events-none transition-transform duration-700 group-hover:translate-x-4 group-hover:translate-y-4"
                  style={{ borderRadius: config.design.borderRadius }}
                ></div>
                <div 
                  className="absolute -z-20 -top-8 -left-8 w-full h-full border border-white/5 pointer-events-none transition-transform duration-700 group-hover:-translate-x-4 group-hover:-translate-y-4"
                  style={{ borderRadius: config.design.borderRadius }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Chef's Quote Section */}
        {config.about.quote && (
          <div className="mt-40 relative">
            <div className="absolute inset-0 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div 
              className="relative p-12 md:p-24 bg-zinc-900/50 border border-white/5 backdrop-blur-xl overflow-hidden"
              style={{ borderRadius: config.design.borderRadius }}
            >
              <Quote className="absolute top-10 left-10 text-orange-600/20" size={120} />
              
              <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                <p className="text-2xl md:text-4xl font-jakarta italic text-zinc-100 leading-snug">
                  "{config.about.quote.text}"
                </p>
                <div className="space-y-2">
                  <p className="text-2xl font-jakarta font-bold text-white">{config.about.quote.author}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.4em] text-orange-500">{config.about.quote.role}</p>
                </div>
                {/* Visual signature mockup */}
                <div className="pt-8 opacity-30 select-none pointer-events-none">
                  <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 50C40 45 60 30 80 40C100 50 120 60 140 30C160 0 180 20 190 60" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M40 30C50 35 60 40 70 38" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutUs;
