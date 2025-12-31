
import React from 'react';
import { useSite } from '../SiteContext.tsx';

const Stats: React.FC = () => {
  const { config } = useSite();

  return (
    <section className="border-y border-white/5 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {config.stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center gap-2 group cursor-default text-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-jakarta group-hover:text-orange-500 transition-colors duration-500">
              {stat.value}
            </span>
            <span className="text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
