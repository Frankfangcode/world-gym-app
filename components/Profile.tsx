
import React from 'react';
import { User, Settings, Award, ChevronRight, CreditCard, Zap, Crown, Target, LogOut } from 'lucide-react';
import { Button } from './Button';

export const Profile: React.FC = () => {
  return (
    <div className="h-full w-full bg-slate-950 p-6 pt-12 pb-32 overflow-y-auto">
      {/* Header Profile Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border-2 border-slate-500 flex items-center justify-center text-3xl font-bold text-slate-300">
            <User size={32} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-wg-red rounded-full border-4 border-slate-950 flex items-center justify-center text-white">
            <Crown size={14} fill="currentColor" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">澤享</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                <Crown size={10} className="fill-black" /> Gold Member
             </span>
             <span className="text-slate-500 text-xs font-mono">ID: WG-8821</span>
          </div>
        </div>
        <div className="ml-auto">
             <button className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                 <Settings size={20} />
             </button>
        </div>
      </div>

      {/* Membership Card (Virtual Pass) */}
      <div className="w-full aspect-[1.8] bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl mb-8 group flex-shrink-0">
         {/* Abstract Background */}
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
         <div className="absolute -right-10 -top-10 w-40 h-40 bg-wg-red/20 blur-[60px] rounded-full"></div>
         
         <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
             <div className="flex justify-between items-start">
                <div className="text-wg-red font-black italic text-2xl tracking-tighter">WORLD GYM</div>
                <div className="bg-slate-800/50 backdrop-blur p-2 rounded-lg border border-slate-700">
                    <CreditCard size={20} className="text-slate-300" />
                </div>
             </div>
             
             <div>
                 <div className="flex items-end justify-between mb-2">
                    <div>
                        <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Member Since</div>
                        <div className="text-white font-mono text-lg">2023.05.12</div>
                    </div>
                    <div className="text-right">
                        <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Status</div>
                        <div className="text-wg-neonGreen font-bold flex items-center justify-end gap-1">
                            <span className="w-2 h-2 rounded-full bg-wg-neonGreen animate-pulse"></span> Active
                        </div>
                    </div>
                 </div>
                 {/* Barcode Simulation */}
                 <div className="h-8 w-full bg-white/90 rounded mix-blend-screen opacity-80 flex items-center justify-between px-2 overflow-hidden">
                     {[...Array(40)].map((_,i) => (
                         <div key={i} className={`h-full bg-black w-[${Math.random() * 4 + 1}px]`}></div>
                     ))}
                 </div>
             </div>
         </div>
      </div>

      {/* Gamification Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8 flex-shrink-0">
          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                  <Zap size={40} />
              </div>
              <div className="text-4xl font-black text-white mb-1 font-mono">12</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                 <Zap size={12} className="text-wg-neonYellow fill-wg-neonYellow" /> Day Streak
              </div>
          </div>
          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                  <Award size={40} />
              </div>
              <div className="text-4xl font-black text-white mb-1 font-mono">Lvl.5</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                 <Award size={12} className="text-purple-400 fill-purple-400" /> Pro Lifter
              </div>
          </div>
      </div>

      {/* Menu List */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex-shrink-0">
          {[
            { icon: Target, label: '我的訓練計畫', sub: '5 active routines' },
            { icon: CreditCard, label: '訂閱與付款', sub: 'Next billing: 12/01' },
            { icon: Settings, label: 'App 設定', sub: 'Notifications, Dark Mode' },
          ].map((item, idx) => (
            <button key={idx} className="w-full p-5 flex items-center gap-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors text-left group">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-wg-red transition-colors flex-shrink-0">
                    <item.icon size={20} />
                </div>
                <div className="flex-1">
                    <div className="text-white font-bold">{item.label}</div>
                    <div className="text-slate-500 text-xs">{item.sub}</div>
                </div>
                <ChevronRight size={18} className="text-slate-600" />
            </button>
          ))}
      </div>
      
      <div className="mt-8">
          <Button variant="ghost" className="w-full text-slate-500 hover:text-red-500 hover:bg-red-950/30 gap-2">
              <LogOut size={18} /> 登出帳號
          </Button>
      </div>
    </div>
  );
};