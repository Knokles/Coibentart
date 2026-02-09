
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Screen, Message } from '../types';

const Assistant: React.FC<{ onNavigate: (s: Screen) => void }> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Ciao! Sono Artie, il tuo assistente Coibentart. Come posso aiutarti oggi con le tue timbrature, ferie o informazioni sui cantieri?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: "Sei Artie, l'assistente ufficiale dell'azienda Coibentart. Parla in modo professionale ma amichevole. Coibentart si occupa di coibentazioni industriali e civili. Aiuta i dipendenti con domande su: timbratura GPS (deve essere fatta in cantiere), richieste ferie (tramite l'app), consultazione buste paga (area documenti). Se ti chiedono di sicurezza, ricorda sempre di indossare i DPI (casco, scarpe antinfortunistiche, guanti). Sii conciso.",
          temperature: 0.7
        }
      });

      const reply = response.text || "Scusa, non ho capito. Puoi ripetere?";
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Si è verificato un errore di connessione. Riprova più tardi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
      <header className="p-4 border-b flex items-center gap-4 bg-slate-900 text-white">
        <button onClick={() => onNavigate(Screen.HOME)} className="material-symbols-outlined">close</button>
        <div>
          <h2 className="font-bold text-sm">Artie Assistant</h2>
          <p className="text-[10px] text-green-400 font-medium flex items-center gap-1">
            <span className="size-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
          </p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' ? 'bg-[#4CAF50] text-white rounded-tr-none' : 'bg-white text-slate-800 border border-gray-100 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1 items-center">
              <span className="size-1.5 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="size-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="size-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white pb-safe">
        <div className="flex gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Chiedi qualcosa ad Artie..."
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="size-10 bg-[#4CAF50] text-white rounded-xl flex items-center justify-center disabled:opacity-50 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <p className="text-center text-[8px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Powered by Coibentart AI</p>
      </div>
    </div>
  );
};

export default Assistant;
