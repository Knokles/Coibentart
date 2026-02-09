
import React, { useState } from 'react';
import { Screen } from '../types';

interface SettingsProps {
  onBack: () => void;
  onNavigate: (s: Screen) => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, onNavigate }) => {
  const [notifs, setNotifs] = useState({
    clock: true,
    docs: true,
    ai: true,
    safety: true
  });

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-right duration-300 overflow-y-auto no-scrollbar pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 active:scale-90 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold">Impostazioni</h2>
      </div>

      {/* Notifications Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Notifiche Push</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {[
            { id: 'clock', label: 'Promemoria Timbratura', icon: 'alarm', color: 'text-orange-500' },
            { id: 'docs', label: 'Nuovi Documenti / Buste Paga', icon: 'description', color: 'text-blue-500' },
            { id: 'ai', label: 'Risposte Assistente AI', icon: 'smart_toy', color: 'text-[#4CAF50]' },
            { id: 'safety', label: 'Avvisi Sicurezza Cantiere', icon: 'warning', color: 'text-red-500' }
          ].map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`size-9 rounded-xl flex items-center justify-center bg-gray-50 ${item.color}`}>
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              </div>
              <button 
                onClick={() => toggleNotif(item.id as keyof typeof notifs)}
                className={`w-12 h-6 rounded-full transition-all relative ${notifs[item.id as keyof typeof notifs] ? 'bg-[#4CAF50]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${notifs[item.id as keyof typeof notifs] ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Sicurezza Account</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl flex items-center justify-center bg-gray-50 text-slate-500">
                <span className="material-symbols-outlined text-xl">lock</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">Cambia Password</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl flex items-center justify-center bg-gray-50 text-slate-500">
                <span className="material-symbols-outlined text-xl">fingerprint</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">Accesso Biometrico (FaceID/TouchID)</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>
        </div>
      </div>

      {/* App Info Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Informazioni App</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl flex items-center justify-center bg-gray-50 text-slate-500">
                <span className="material-symbols-outlined text-xl">help</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">Centro Assistenza</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl flex items-center justify-center bg-gray-50 text-slate-500">
                <span className="material-symbols-outlined text-xl">delete_forever</span>
              </div>
              <span className="text-sm font-semibold text-rose-600">Svuota Cache Applicazione</span>
            </div>
          </button>
        </div>
      </div>

      <div className="text-center space-y-2 mt-auto">
        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em]">
          Copyright © 2024 CoibentArt SRL
        </p>
        <p className="text-[9px] text-gray-400 font-medium">
          Tutti i diritti riservati. Made with ❤️ in Italy.
        </p>
      </div>
    </div>
  );
};

export default Settings;
