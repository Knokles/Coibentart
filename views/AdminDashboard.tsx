
import React from 'react';
import { Screen } from '../types';

const AdminDashboard: React.FC<{ onNavigate: (s: Screen) => void }> = ({ onNavigate }) => {
  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in duration-500 overflow-y-auto no-scrollbar pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Admin</h2>
          <p className="text-xs text-gray-500 font-medium">Monitoraggio globale Coibentart</p>
        </div>
        <button className="flex size-10 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm text-slate-600 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>
      
      {/* Top Level Summary Cards Grid */}
      <section className="grid grid-cols-2 gap-4">
        {[
          { label: 'Forza Lavoro', val: '24', icon: 'badge', color: 'text-emerald-600 bg-emerald-50', sub: 'In servizio ora' },
          { label: 'Siti Attivi', val: '8', icon: 'foundation', color: 'text-blue-600 bg-blue-50', sub: 'Cantieri aperti' },
          { label: 'Richieste', val: '12', icon: 'pending_actions', color: 'text-orange-600 bg-orange-50', sub: 'Ferie in attesa' },
          { label: 'Alert GPS', val: '3', icon: 'wrong_location', color: 'text-rose-600 bg-rose-50', sub: 'Fuori raggio' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 group active:bg-gray-50 transition-colors">
            <div className={`size-10 flex items-center justify-center rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-800">{stat.val}</p>
              <p className="text-[11px] font-bold text-slate-700">{stat.label}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Overtime & Workload Analysis */}
      <section className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-400">monitoring</span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Analisi Straordinari</h3>
          </div>
          <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-bold">+12% vs Sett. Scorsa</span>
        </div>
        
        <div className="flex items-end justify-between h-20 gap-3 relative z-10">
          {[30, 55, 40, 85, 45, 65, 50].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className={`w-full rounded-t-md transition-all duration-1000 ${i === 3 ? 'bg-orange-400' : 'bg-white/20 hover:bg-white/40'}`} 
                style={{ height: `${h}%` }}
              ></div>
              <span className="text-[8px] font-medium text-gray-500">{['L', 'M', 'M', 'G', 'V', 'S', 'D'][i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
          <p className="text-xs text-gray-400">Totale settimanale accumulato</p>
          <p className="text-lg font-bold">142.5h</p>
        </div>
        {/* Background decorative circles */}
        <div className="absolute -top-10 -right-10 size-40 bg-[#4CAF50]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Project Completion Cards */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-base font-bold text-slate-800">Avanzamento Progetti</h3>
          <button className="text-[#4CAF50] text-[10px] font-bold uppercase tracking-widest">Dettaglio</button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Milano Hub - Settore A', progress: 85, icon: 'location_city', color: 'bg-emerald-500', trend: 'In orario' },
            { name: 'Residenza Sole - Facciate', progress: 42, icon: 'bungalow', color: 'bg-blue-500', trend: 'Rallentato' },
            { name: 'Sede Coibentart - Uffici', progress: 95, icon: 'corporate_fare', color: 'bg-amber-500', trend: 'Quasi pronto' }
          ].map((project, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center text-slate-400 border border-gray-100">
                <span className="material-symbols-outlined">{project.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-800">{project.name}</span>
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                    project.trend === 'In orario' ? 'bg-emerald-50 text-emerald-600' : 
                    project.trend === 'Rallentato' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  }`}>{project.trend}</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${project.color} transition-all duration-1000 ease-out`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] font-medium text-gray-400">Completamento</span>
                  <span className="text-[10px] font-bold text-slate-700">{project.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Performers Table Card */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-base font-bold text-slate-800">Performance Squadre</h3>
          <span className="material-symbols-outlined text-gray-400 text-sm">stars</span>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Team Leader</th>
                  <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Efficienza</th>
                  <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Marco Rossi', score: '9.8', trend: 'arrow_upward', color: 'text-emerald-500', img: 'https://picsum.photos/seed/m/100/100' },
                  { name: 'Andrea Bianchi', score: '9.2', trend: 'trending_flat', color: 'text-blue-500', img: 'https://picsum.photos/seed/a/100/100' },
                  { name: 'Giuseppe Neri', score: '8.5', trend: 'arrow_upward', color: 'text-emerald-500', img: 'https://picsum.photos/seed/g/100/100' },
                ].map((emp, i) => (
                  <tr key={i} className="active:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={emp.img} className="size-8 rounded-full border border-gray-100" alt="" />
                        <span className="text-xs font-bold text-slate-800">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                         <span className="size-1.5 bg-[#4CAF50] rounded-full"></span>
                         <span className="text-[11px] font-black text-slate-700">{emp.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`material-symbols-outlined text-lg ${emp.color}`}>{emp.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full py-4 text-center text-[10px] font-bold text-[#4CAF50] border-t border-gray-50 uppercase tracking-[0.2em] active:bg-gray-50">
            Esporta Report Completo
          </button>
        </div>
      </section>

      {/* Activity Timeline Card */}
      <section>
        <h3 className="text-base font-bold text-slate-800 mb-4 px-1">Log Attività Recenti</h3>
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-6 relative">
          <div className="absolute left-7 top-10 bottom-10 w-px bg-gray-100"></div>
          {[
            { name: 'Marco Rossi', action: 'Timbratura Entrata', time: '08:30 AM', site: 'Milano Hub', icon: 'login', color: 'bg-emerald-100 text-emerald-600' },
            { name: 'Andrea Bianchi', action: 'Timbratura Entrata', time: '08:15 AM', site: 'Milano Hub', icon: 'login', color: 'bg-emerald-100 text-emerald-600' },
            { name: 'Luca Verdi', action: 'Richiesta Ferie', time: '10:45 AM', site: 'Backoffice', icon: 'event', color: 'bg-blue-100 text-blue-600' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 relative z-10">
              <div className={`size-8 flex items-center justify-center rounded-full ${item.color} shadow-sm border-2 border-white`}>
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold text-slate-800">{item.name}</p>
                  <span className="text-[9px] font-medium text-gray-400">{item.time}</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">{item.action} presso <span className="font-bold text-[#4CAF50]">{item.site}</span></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
