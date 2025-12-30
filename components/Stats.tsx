
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '15+' },
    { label: 'Happy Customers', value: '24k' },
    { label: 'Organic Sourced', value: '100%' },
    { label: 'Average Rating', value: '4.9' },
  ];

  return (
    <section className="border-y border-white/5 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center md:items-start gap-2 group cursor-default">
            <span className="text-4xl md:text-5xl font-bold tracking-tight text-white font-jakarta group-hover:text-orange-500 transition-colors duration-500">
              {stat.value}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
