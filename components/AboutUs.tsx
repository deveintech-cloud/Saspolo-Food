
import React from 'react';
import { useSite } from '../SiteContext.tsx';
import { History, Target, Sparkles, BookOpen, Quote, Shield } from 'lucide-react';

const AboutUs: React.FC = () => {
  const { t, config } = useSite();

  const iconMap: Record<string, any> = {
    '0': <History size={28} />,
    '1': <Shield size={28} />,
    '2': <Sparkles size={28} />,
    'default': <BookOpen size={28} />
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-2">
            {t('heritage')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold font-jakarta text-white tracking-tight leading-tight">
            {t(config.about.title)}
          </h2>
          {config.about.subtitle && (
            <p className="max-w-2xl mx-auto text-base md:text-xl text-zinc-500 font-light leading-relaxed px-4">
              {t(config.about.subtitle)}
            </p>
          )}
          <div className="w-16 md:w-24 h-1 bg-orange-600 mx-auto rounded-full mt-6 md:mt-8"></div>
        </div>

        {/* Narrative Sections */}
        <div className="space-y-24 md:space-y-40">
          {config.about.sections.map((section, idx) => (
            <div 
              key={section.id} 
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 md:gap-16 lg:gap-32`}
            >
              <div className="w-full lg:flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-orange-600/10 text-orange-500 shadow-xl shadow-orange-950/20 mx-auto lg:mx-0">
                  {iconMap[idx.toString()] || iconMap['default']}
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold font-jakarta text-white leading-tight">{t(section.title)}</h3>
                  <p className="text-zinc-400 text-sm sm:text-base md:text-xl leading-relaxed font-light">
                    {t(section.text)}
                  </p>
                </div>
              </div>
              <div className="w-full lg:flex-1 relative group max-w-xl mx-auto">
                <div 
                  className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden shadow-2xl border border-white/5 transition-all duration-700"
                  style={{ borderRadius: config.design.borderRadius }}
                >
                  <img 
                    src={section.image} 
                    alt={t(section.title)} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                </div>
                <div 
                  className="hidden sm:block absolute -z-10 -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-full h-full border border-orange-600/10 pointer-events-none transition-transform duration-700 group-hover:translate-x-2 md:group-hover:translate-x-4 group-hover:translate-y-2 md:group-hover:translate-y-4"
                  style={{ borderRadius: config.design.borderRadius }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Chef's Quote Section */}
        {config.about.quote && (
          <div className="mt-24 md:mt-40 relative px-4 md:px-0">
            <div className="absolute inset-0 bg-orange-600/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
            <div 
              className="relative p-8 md:p-24 bg-zinc-900/50 border border-white/5 backdrop-blur-xl overflow-hidden text-center"
              style={{ borderRadius: config.design.borderRadius }}
            >
              <Quote className="absolute top-4 left-4 md:top-10 md:left-10 text-orange-600/10" size={60} />
              
              <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 relative z-10">
                <p className="text-lg sm:text-xl md:text-4xl font-jakarta italic text-zinc-100 leading-snug">
                  "{t(config.about.quote.text)}"
                </p>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-xl md:text-2xl font-jakarta font-bold text-white">{config.about.quote.author}</p>
                  <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.4em] text-orange-500">{t(config.about.quote.role)}</p>
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
