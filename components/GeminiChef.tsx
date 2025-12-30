
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService.ts';
import { MENU_ITEMS } from '../constants.tsx';
import { ChatMessage } from '../types.ts';
import { useSite } from '../SiteContext.tsx';

const GeminiChef: React.FC = () => {
  const { language } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greeting = language === 'fr' 
      ? 'Bienvenue à Elengi Ya Malewa. Je suis votre Sommelier IA. Comment puis-je vous aider dans votre voyage culinaire aujourd\'hui?'
      : 'Welcome to Elengi Ya Malewa. I am your AI Sommelier. How can I assist your culinary journey today?';
    setMessages([{ role: 'model', text: greeting }]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const menuContext = MENU_ITEMS.map(i => `${i.name}: ${i.description} (R${i.price})`).join('\n');
    const response = await getGeminiResponse(userMsg, menuContext);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="p-4 bg-zinc-800/50 border-b border-zinc-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center shadow-lg">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Elengi Ya Malewa Sommelier</p>
                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">AI Expert</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-3 rounded-2xl flex gap-1">
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-zinc-800 bg-zinc-950/30">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'fr' ? "Posez une question..." : "Ask about pairings..."}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1.5 h-9 w-9 bg-orange-600 text-white rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 bg-white text-zinc-950 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
        >
          <div className="absolute -top-1 -right-1 bg-orange-500 p-1 rounded-full animate-pulse border-2 border-zinc-950">
            <Sparkles size={12} className="text-white" />
          </div>
          <MessageSquare size={28} />
          <div className="absolute right-full mr-4 bg-zinc-900 border border-zinc-800 text-white text-xs py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold shadow-xl">
            {language === 'fr' ? 'Parlez à notre Sommelier' : 'Ask our Sommelier'}
          </div>
        </button>
      )}
    </div>
  );
};

export default GeminiChef;
