
import React from 'react';

const ClockConfirmation: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Dati mockati per la precisione e timestamp
  const gpsDetails = {
    precision: '± 2.4 metri',
    timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    coords: '45.4642° N, 9.1900° E',
    provider: 'Galileo + GLONASS'
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      <div className="flex flex-col items-center gap-6 mt-8 mb-8 text-center">
        <div className="bg-[#4CAF50]/10 p-5 rounded-full">
          <span className="material-symbols-outlined text-[#4CAF50] !text-5xl">verified_user</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold">Timbratura Certificata</h1>
          <p className="text-gray-500 text-sm max-w-[280px]">
            La tua presenza è stata registrata e validata con crittografia GPS.
          </p>
        </div>
      </div>

      {/* Map Section with Enhanced Badge */}
      <div className="w-full mb-6">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-md border border-gray-100 bg-slate-200">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPmtd98T8gNT_v9IEnne1p8P5DpHXyEOoB8WqJb7g_J0w7QZCn0lO5aNTgXFgGdF0fTN4AWtBVog1fr0v-BF-oEx5ZeL51RwRw-SMDyyX_A4lQLN7GAqz8qyY3AxcenVFYQnmIaKJ028k4WOFLHoRMYp4CygmZPNcrOZkCUa8F4QKCXXpc9J1BV9y-a1IGHBNq3uI3bkEvAM6uKv2I7Nyci-V8diVPDzXKDe4tPitja0t24XU2yWtX3cQxIdR7-KL7AS5P2yz50FI" 
            className="w-full h-full object-cover grayscale-[10%]"
            alt="GPS Map"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 bg-[#4CAF50]/20 rounded-full animate-ping"></div>
              <span className="material-symbols-outlined text-[#4CAF50] !text-4xl drop-shadow-lg">my_location</span>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            GPS Certificato
          </div>
        </div>
      </div>

      {/* GPS Technical Details Card */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Specifiche Tecniche GPS</h3>
          <span className="material-symbols-outlined text-gray-400 text-sm">sensors</span>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-gray-400 uppercase">Precisione</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#4CAF50]">biotech</span>
              <p className="text-xs font-bold text-slate-700">{gpsDetails.precision}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[9px] font-bold text-gray-400 uppercase">Ora Verifica</span>
            <div className="flex items-center gap-1.5 justify-end">
              <p className="text-xs font-bold text-slate-700">{gpsDetails.timestamp}</p>
              <span className="material-symbols-outlined text-sm text-[#4CAF50]">timer</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-gray-400 uppercase">Coordinate</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-blue-500">explore</span>
              <p className="text-[10px] font-mono font-bold text-slate-600">{gpsDetails.coords}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[9px] font-bold text-gray-400 uppercase">Sorgente</span>
            <div className="flex items-center gap-1.5 justify-end">
              <p className="text-xs font-bold text-slate-700">{gpsDetails.provider}</p>
              <span className="material-symbols-outlined text-sm text-blue-500">public</span>
            </div>
          </div>
        </div>
      </div>

      {/* General Registration Info */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-auto">
        <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-5">Dati di Turno</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
             <div className="flex items-center gap-3 text-slate-400">
               <span className="material-symbols-outlined text-xl">event_available</span>
               <p className="text-xs font-semibold">Data</p>
             </div>
             <p className="text-xs font-bold text-slate-800">Lunedì, 24 Ottobre 2023</p>
          </div>
          <div className="flex justify-between items-start gap-4">
             <div className="flex items-center gap-3 text-slate-400 mt-1">
               <span className="material-symbols-outlined text-xl">home_work</span>
               <p className="text-xs font-semibold">Cantiere</p>
             </div>
             <div className="text-right">
                <p className="text-xs font-bold text-slate-800 uppercase">Milano Hub</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Via Dante 14, Milano (MI)</p>
             </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={onBack}
        className="w-full h-16 bg-slate-900 text-white rounded-2xl font-bold shadow-xl mt-8 mb-4 active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        <span className="text-sm">Torna alla Dashboard</span>
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>

      <p className="text-center text-[8px] text-gray-300 font-black uppercase tracking-[0.4em] pb-6">
        ID Transazione: #B77-992-X1
      </p>
    </div>
  );
};

export default ClockConfirmation;
