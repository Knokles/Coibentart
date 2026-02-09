
import React, { useState } from 'react';
import { Screen, User } from '../types';

interface HomeProps {
  user: User;
  isClockedIn: boolean;
  onClock: () => void;
  onNavigate: (s: Screen) => void;
  showInstallButton?: boolean;
  onInstall?: () => void;
}

const Home: React.FC<HomeProps> = ({ user, isClockedIn, onClock, onNavigate, showInstallButton, onInstall }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClockAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onClock();
    }, 1500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CoibentArt Pro',
          text: 'Scarica l\'app ufficiale Coibentart!',
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiato!');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      {/* PWA Install Banner */}
      {showInstallButton && (
        <div className="bg-gradient-to-r from-[#4CAF50] to-green-600 p-4 rounded-3xl shadow-lg shadow-green-500/20 flex items-center justify-between text-white animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <span className="material-symbols-outlined">download_for_offline</span>
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">CoibentArt Pro</p>
              <p className="text-[10px] opacity-90">Installala sulla home screen</p>
            </div>
          </div>
          <button 
            onClick={onInstall}
            className="bg-white text-[#4CAF50] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider active:scale-90 transition-transform"
          >
            Scarica App
          </button>
        </div>
      )}

      {/* Clocking Section */}
      <section className="relative">
        <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-gray-100">
          <div className="w-full h-40 relative overflow-hidden bg-slate-900">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&fit=crop" className="w-full h-full object-cover opacity-60" alt="Map" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="size-16 rounded-full bg-[#4CAF50]/20 flex items-center justify-center animate-ping"></div>
                <div className="absolute inset-0 size-16 rounded-full border-2 border-[#4CAF50] bg-[#4CAF50]/10 flex items-center justify-center backdrop-blur-sm">
                   <span className="material-symbols-outlined text-[#4CAF50] !text-3xl">my_location</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Posizione Attuale</p>
                <h4 className="text-white font-bold text-sm">Cantiere Torre Unicredit</h4>
              </div>
              <span className="text-[10px] text-gray-300 font-medium">GPS Attivo</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Turno Odierno</span>
                <span className="text-xl font-bold text-slate-800">08:00 - 17:00</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                <span className={`block text-xs font-bold ${isClockedIn ? 'text-orange-500' : 'text-slate-400'}`}>
                  {isClockedIn ? 'IN CORSO' : 'IN ATTESA'}
                </span>
              </div>
            </div>
            
            <button onClick={handleClockAction} disabled={isProcessing} className={`w-full flex items-center justify-center rounded-2xl h-16 text-white gap-3 text-lg font-bold shadow-2xl transition-all active:scale-[0.95] ${isClockedIn ? 'bg-orange-500' : 'bg-[#4CAF50]'}`}>
              {isProcessing ? (
                <div className="flex items-center gap-3">
                   <span className="size-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                   <span>Verifica...</span>
                </div>
              ) : (
                <>
                  <span className="material-symbols-outlined !text-3xl">{isClockedIn ? 'logout' : 'login'}</span>
                  <span>{isClockedIn ? 'Fine Turno' : 'Inizia Turno'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* INVITE CARD */}
      <section className="bg-blue-600 rounded-3xl p-5 text-white shadow-lg flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all" onClick={handleShare}>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-black uppercase tracking-widest opacity-80">Novità</p>
          <h4 className="text-sm font-bold">L'app è condivisa?</h4>
          <p className="text-[10px] opacity-70">Passala ai tuoi colleghi di squadra</p>
        </div>
        <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 group-active:rotate-12 transition-transform">
          <span className="material-symbols-outlined text-white">send</span>
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <h3 className="text-base font-bold text-slate-900 mb-4 ml-1">Strumenti</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Buste Paga', icon: 'receipt_long', color: 'bg-blue-50 text-blue-600', screen: Screen.DOCUMENTS },
            { label: 'Ferie', icon: 'holiday_village', color: 'bg-orange-50 text-orange-600', screen: Screen.REQUESTS },
            { label: 'Sicurezza', icon: 'safety_check', color: 'bg-red-50 text-red-600', screen: Screen.HOME },
            { label: 'Corsi', icon: 'school', color: 'bg-indigo-50 text-indigo-600', screen: Screen.HOME }
          ].map((item, idx) => (
            <div key={idx} onClick={() => onNavigate(item.screen)} className="group flex flex-col gap-4 rounded-3xl p-5 bg-white shadow-sm border border-gray-100 active:bg-gray-50 transition-all cursor-pointer">
              <div className={`size-12 flex items-center justify-center rounded-2xl ${item.color} group-active:scale-90 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <p className="font-bold text-sm text-slate-800">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-10">
         <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
               <span className="bg-[#4CAF50] text-white text-[8px] font-black px-2 py-0.5 rounded uppercase mb-2 inline-block">Novità Aziendali</span>
               <h4 className="font-bold text-lg mb-2 leading-tight">Nuovi Kit DPI in magazzino</h4>
               <p className="text-xs text-gray-400 mb-4">Passa in sede a ritirare i nuovi guanti rinforzati.</p>
               <button className="text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                 Leggi <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            </div>
            <div className="absolute -right-10 -bottom-10 size-40 bg-[#4CAF50]/10 rounded-full blur-3xl"></div>
         </div>
      </section>
    </div>
  );
};

export default Home;
