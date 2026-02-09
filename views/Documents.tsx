
import React, { useState } from 'react';
import { Screen } from '../types';

const Documents: React.FC<{ onNavigate: (s: Screen) => void }> = ({ onNavigate }) => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (docTitle: string) => {
    setDownloading(docTitle);
    // Simulo un ritardo di download
    setTimeout(() => {
      setDownloading(null);
      alert(`Documento "${docTitle}" scaricato con successo.`);
    }, 1500);
  };

  const docs2023 = [
    { title: 'Busta Paga Settembre', amount: '€ 1.840,00', icon: 'description', color: 'text-[#4CAF50] bg-green-50' },
    { title: 'Busta Paga Agosto', amount: '€ 1.750,00', icon: 'description', color: 'text-[#4CAF50] bg-green-50' },
    { title: 'Certificazione Unica 2023', amount: 'RIF. 2022', icon: 'article', color: 'text-orange-500 bg-orange-50' }
  ];

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in duration-500 overflow-y-auto no-scrollbar pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate(Screen.HOME)} className="flex size-10 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 active:scale-90 transition-transform">
             <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-xl font-bold">Documenti</h2>
        </div>
        <button className="flex size-10 items-center justify-center rounded-xl bg-white border border-gray-100 text-slate-600 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4CAF50] transition-colors">search</span>
        <input 
          className="w-full h-14 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl text-sm shadow-sm focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] outline-none transition-all"
          placeholder="Cerca mese, importo o tipo documento..."
        />
      </div>

      {/* Stats/Quick Access */}
      <div className="bg-slate-900 rounded-3xl p-5 text-white flex items-center justify-between shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Archivio Personale</p>
          <p className="text-xl font-bold">12 Documenti</p>
          <p className="text-[10px] text-green-400 mt-1 font-medium">Tutti i documenti sono firmati</p>
        </div>
        <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center relative z-10 backdrop-blur-md border border-white/10">
          <span className="material-symbols-outlined text-3xl">folder_zip</span>
        </div>
        <div className="absolute -right-6 -bottom-6 size-32 bg-[#4CAF50]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Archivio 2023</h3>
            <button 
              onClick={() => handleDownload('Tutto l\'archivio 2023')}
              className="text-[10px] font-bold text-[#4CAF50] uppercase tracking-wider flex items-center gap-1 active:opacity-60"
            >
              <span className="material-symbols-outlined text-sm">download_for_offline</span>
              Scarica Tutto
            </button>
          </div>
          
          <div className="space-y-4">
            {docs2023.map((doc, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all active:scale-[0.98]">
                <div className={`size-12 flex items-center justify-center rounded-2xl ${doc.color} shadow-sm border border-gray-50`}>
                  <span className="material-symbols-outlined text-2xl">{doc.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800 truncate">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px] text-gray-400 font-mono font-medium">{doc.amount}</p>
                    <span className="text-[8px] bg-gray-50 px-1.5 py-0.5 rounded text-gray-400 uppercase font-black">PDF</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload(doc.title)}
                  disabled={downloading === doc.title}
                  className={`size-10 flex items-center justify-center rounded-full transition-all ${
                    downloading === doc.title 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-[#4CAF50]/10 text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white active:scale-90 shadow-sm'
                  }`}
                >
                  {downloading === doc.title ? (
                    <span className="size-4 border-2 border-gray-300 border-t-[#4CAF50] rounded-full animate-spin"></span>
                  ) : (
                    <span className="material-symbols-outlined">download</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Years Placeholder */}
        <div className="opacity-60 grayscale-[50%]">
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Archivio 2022</h3>
            <span className="text-[9px] font-bold text-gray-300 uppercase italic">Sola Consultazione</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center gap-2">
             <span className="material-symbols-outlined text-gray-200 text-4xl">cloud_done</span>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Documenti Archiviati</p>
             <button className="text-blue-500 text-[10px] font-bold uppercase underline">Richiedi Accesso</button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-5 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4 items-start">
        <div className="size-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
          <span className="material-symbols-outlined">info</span>
        </div>
        <div>
          <p className="text-xs font-bold text-blue-900">Nota sulla Sicurezza</p>
          <p className="text-[10px] text-blue-700 mt-1 leading-relaxed">
            I documenti scaricati sono protetti da password. Utilizza il tuo codice fiscale (maiuscolo) per aprire i file PDF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Documents;
