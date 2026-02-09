
import React from 'react';
import { Screen } from '../types';

const Requests: React.FC<{ onNavigate: (s: Screen) => void }> = ({ onNavigate }) => {
  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in duration-500 overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => onNavigate(Screen.HOME)} className="text-gray-400">
           <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-xl font-bold">Richiesta Ferie e Permessi</h2>
      </div>

      {/* Simplified Calendar View */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <button className="material-symbols-outlined text-gray-400">chevron_left</button>
          <span className="font-bold text-sm">Ottobre 2023</span>
          <button className="material-symbols-outlined text-gray-400">chevron_right</button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-4">
          {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(d => (
            <span key={d} className="text-[10px] font-bold text-gray-300 uppercase">{d}</span>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: 31 }).map((_, i) => {
            const isSelected = i + 1 >= 5 && i + 1 <= 8;
            const isStart = i + 1 === 5;
            const isEnd = i + 1 === 8;
            return (
              <div 
                key={i} 
                className={`h-10 flex items-center justify-center text-sm rounded-lg transition-all ${
                  isSelected ? 'bg-[#4CAF50]/20 text-[#4CAF50] font-bold' : ''
                } ${isStart || isEnd ? 'bg-[#4CAF50] !text-white' : ''}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tipo Richiesta</label>
          <select className="w-full h-14 px-4 bg-white border border-gray-100 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none">
            <option>Ferie</option>
            <option>Permesso (ROL)</option>
            <option>Malattia</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Note</label>
          <textarea 
            placeholder="Aggiungi una nota (opzionale)..."
            className="w-full p-4 bg-white border border-gray-100 rounded-xl text-sm min-h-[100px] focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none resize-none"
          />
        </div>

        <button className="w-full h-14 bg-[#4CAF50] text-white rounded-xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all">
          Invia Richiesta
        </button>
      </div>

      {/* Recent Requests */}
      <section className="pb-10">
        <h3 className="text-base font-bold mb-4">Richieste Recenti</h3>
        <div className="space-y-3">
          {[
            { type: 'Ferie', date: '12 Ott - 15 Ott (4gg)', status: 'IN ATTESA', statusColor: 'bg-amber-100 text-amber-600' },
            { type: 'Permesso', date: '28 Set (4h)', status: 'APPROVATO', statusColor: 'bg-green-100 text-green-600' }
          ].map((req, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">{req.type}</p>
                <p className="text-xs text-gray-400">{req.date}</p>
              </div>
              <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${req.statusColor}`}>{req.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Requests;
