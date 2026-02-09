
import React from 'react';

const AdminSiteDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="h-64 bg-slate-200 relative">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrIFjXXt_hFsy82zfRTSSekeH0zPTdu7iyCz07NPvb7p7Q32FopK1O_o31W_sBgkdlzqOlbOLg5ag-r7dCvUbE7ky4mKJ_mm_cKWDKGEEr4MZ3amxAkd3yY6KWlegoSLFEIsQHRz6GaLAz0ylbXQvRJQyU9ofXtW8j-o3JTgDhE7SEkguB6NKyNx8jcPOBIEtmV7RZhIVqZEPvH6O3PgGfyax3a8GPajiP_iQN8c7djDCLesKFEIKxpHpzx1vbFVRGv7eIlsoAG0g"
          className="w-full h-full object-cover opacity-60"
          alt="Site Map"
        />
        <button 
          onClick={onBack}
          className="absolute top-10 left-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="size-10 bg-[#4CAF50] text-white rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white animate-pulse">
            <span className="material-symbols-outlined text-sm">home_work</span>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 rounded-t-[2.5rem] -mt-10 relative z-10 p-6 shadow-[0_-8px_30px_rgb(0,0,0,0.1)]">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="size-1.5 bg-green-500 rounded-full"></span>
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">In Corso</span>
            </div>
            <h2 className="text-2xl font-bold">Cantiere: Milano Hub</h2>
            <p className="text-sm text-gray-400 mt-1">Via Dante 14, 20121 Milano (MI)</p>
          </div>
          <button className="bg-blue-50 text-blue-600 p-3 rounded-full">
            <span className="material-symbols-outlined">directions</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Presenze</p>
            <p className="text-xl font-bold">8 Operai</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Inizio Lavori</p>
            <p className="text-xl font-bold">07:30 AM</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Personale Attivo</h3>
          <span className="text-xs font-bold text-[#4CAF50]">Vedi tutti</span>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Marco Rossi', role: 'Caposquadra', time: '07:30', img: 'https://picsum.photos/seed/r/100/100' },
            { name: 'Andrea Bianchi', role: 'Operaio Spec.', time: '08:15', img: 'https://picsum.photos/seed/b/100/100' }
          ].map((user, i) => (
            <div key={i} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
              <img src={user.img} className="size-11 rounded-xl object-cover" alt="User" />
              <div className="flex-1">
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-[10px] text-gray-400">{user.role} • Entrato {user.time}</p>
              </div>
              <div className="bg-green-50 px-2 py-1 rounded text-[9px] font-bold text-green-600 border border-green-100">VERIFICATO</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Verifiche GPS</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[120px] aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden relative shadow-md">
                <img src={`https://picsum.photos/seed/site${i}/200/300`} className="w-full h-full object-cover" alt="Site Verification" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[9px] font-bold">08:16 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSiteDetail;
