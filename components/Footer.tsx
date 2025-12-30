
import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tighter text-white uppercase font-jakarta">SASPOLO</span>
            <span className="text-zinc-800">|</span>
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">EST. 2023</span>
          </div>
          <p className="text-zinc-600 text-xs text-center md:text-left">Elevating culinary art through innovation and tradition.</p>
        </div>

        <div className="flex gap-10">
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">
            <Twitter size={20} strokeWidth={1.5} />
          </a>
          <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">
            <Facebook size={20} strokeWidth={1.5} />
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs text-zinc-600 font-medium">© 2024 Saspolo Food Group. All rights reserved.</p>
          <div className="flex gap-4 text-[10px] text-zinc-700 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-zinc-400">Privacy</a>
            <a href="#" className="hover:text-zinc-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
