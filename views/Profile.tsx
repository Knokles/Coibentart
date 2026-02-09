
import React, { useState } from 'react';
import { Screen, User } from '../types';

interface ProfileProps {
  user: User;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onNavigate: (s: Screen) => void;
  showInstallButton?: boolean;
  onInstall?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, isAdmin, onToggleAdmin, onNavigate, showInstallButton, onInstall }) => {
  const [permissions, setPermissions] = useState({
    location: true,
    camera: true,
    mic: false
  });
  const [showMacGuide, setShowMacGuide] = useState(false);

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CoibentArt Pro',
          text: 'Ciao! Usa questo link per installare l\'app CoibentArt sul tuo telefono.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiato! Incollalo su WhatsApp per condividerlo.');
    }
  };

  return (
    <div className="p-6 flex flex-col gap-8 animate-in fade-in duration-300 overflow-y-auto no-scrollbar pb-12">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="relative">
          <img src={user.avatar} className="size-28 rounded-full border-4 border-white shadow-xl object-cover" alt="Profile" />
          <div className="absolute bottom-0 right-0 size-8 bg-[#4CAF50] text-white rounded-full flex items-center justify-center border-2 border-white shadow-md">
            <span className="material-symbols-outlined text-sm">edit</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
          <p className="text-gray-400 text-sm font-medium">{user.email}</p>
        </div>
      </div>

      {/* Corporate Info Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider">Matricola</span>
          <span className="font-bold text-slate-700">{user.matricola}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider">Ruolo Aziendale</span>
          <span className="font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] border border-green-100">{user.role}</span>
        </div>
      </div>

      {/* SHARE SECTION */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Condividi con il Team</h3>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-4">
          <div className="p-3 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
            {/* Simulazione QR Code */}
            <div className="size-32 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={handleShare}>
              <span className="material-symbols-outlined text-4xl text-slate-300">qr_code_2</span>
              <div className="absolute inset-0 bg-[#4CAF50]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] text-[#4CAF50] uppercase">Condividi</div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-700">Passa l'app ai colleghi</p>
            <p className="text-[10px] text-gray-400 mt-1">Mostra il QR code o invia il link diretto</p>
          </div>
          <button 
            onClick={handleShare}
            className="w-full h-12 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">send</span>
            Invia Link via WhatsApp
          </button>
        </div>
      </div>

      {/* Mac Installation Guide Section */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Utilizzo su Mac</h3>
        <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-blue-400">desktop_mac</span>
              <p className="text-xs font-bold">Lavora comodamente da scrivania</p>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
              Installa CoibentArt sul Mac per gestire documenti con finestra dedicata.
            </p>
            <button 
              onClick={() => setShowMacGuide(!showMacGuide)}
              className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              {showMacGuide ? 'Chiudi Guida' : 'Guida Installazione'}
              <span className="material-symbols-outlined text-sm">{showMacGuide ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
            </button>
            
            {showMacGuide && (
              <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-300">
                <div className="flex gap-3">
                  <div className="size-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                  <p className="text-[10px] text-gray-300"><span className="text-white font-bold">Safari:</span> File > Aggiungi al Dock.</p>
                </div>
                <div className="flex gap-3">
                  <div className="size-6 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                  <p className="text-[10px] text-gray-300"><span className="text-white font-bold">Chrome:</span> Clicca "Installa" nella barra URL.</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute -right-4 -bottom-4 size-24 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* App Settings Section */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Impostazioni App</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          
          <button 
            onClick={() => onNavigate(Screen.SETTINGS)}
            className="w-full p-4 flex items-center justify-between active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-xl">settings</span>
              </div>
              <span className="text-sm font-bold text-slate-700">Impostazioni App</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>

          {showInstallButton && (
            <div onClick={onInstall} className="p-4 flex items-center justify-between active:bg-green-50 transition-colors cursor-pointer bg-green-50/30">
              <div className="flex items-center gap-3">
                <div className="size-9 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xl">download_for_offline</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700">Installa Applicazione</span>
                  <p className="text-[9px] text-[#4CAF50] font-bold">Consigliato per accesso rapido</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#4CAF50]">add_circle</span>
            </div>
          )}

          <div className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
              </div>
              <span className="text-sm font-bold text-slate-700">Modalità Amministratore</span>
            </div>
            <button onClick={onToggleAdmin} className={`w-12 h-6 rounded-full transition-all relative ${isAdmin ? 'bg-[#4CAF50]' : 'bg-gray-200'}`}>
              <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${isAdmin ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </div>

      <button className="w-full h-14 bg-rose-50 text-rose-600 rounded-2xl font-bold flex items-center justify-center gap-3 active:bg-rose-100 transition-colors shadow-sm border border-rose-100 mt-2 mb-6">
        <span className="material-symbols-outlined">logout</span>
        Disconnetti Dispositivo
      </button>

      <p className="text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em] pb-4">
        Versione 2.4.0 (Build 992)
      </p>
    </div>
  );
};

export default Profile;
