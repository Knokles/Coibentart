
import React from 'react';
import { Screen, User } from '../types';

interface HeaderProps {
  user: User;
  isAdmin: boolean;
  currentScreen: Screen;
  onNavigate: (s: Screen) => void;
}

const Header: React.FC<HeaderProps> = ({ user, isAdmin, currentScreen, onNavigate }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CoibentArt Pro',
          text: 'Scarica l\'app ufficiale Coibentart per la gestione dei cantieri e delle timbrature.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: Copia negli appunti
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiato negli appunti! Invialo ai tuoi colleghi.');
    }
  };

  return (
    <header className="bg-white px-4 pt-8 pb-4 border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => onNavigate(Screen.HOME)}>
          <span className="text-2xl font-bold text-gray-500 tracking-tight">Coibent</span>
          <div className="ml-1 px-1.5 py-0.5 bg-[#4CAF50] rounded shadow-sm transform -rotate-3">
            <span className="text-white text-lg font-black italic">Art</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleShare}
            className="flex size-9 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-blue-600 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
          <button className="flex size-9 items-center justify-center rounded-full bg-gray-50 border border-gray-200">
            <span className="material-symbols-outlined text-slate-600 text-xl">notifications</span>
          </button>
          <button 
            onClick={() => onNavigate(Screen.PROFILE)}
            className="flex size-9 items-center justify-center rounded-full bg-gray-50 border border-gray-200 overflow-hidden"
          >
            <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
      
      {currentScreen === Screen.HOME && (
        <div className="flex items-end justify-between animate-in fade-in slide-in-from-left duration-300">
          <div>
            <p className="text-xs text-slate-500 font-medium">{isAdmin ? 'Admin Panel,' : 'Bentornato,'}</p>
            <h2 className="text-lg font-bold">{user.name}</h2>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
            <span className="size-2 bg-[#4CAF50] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">In Servizio</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
