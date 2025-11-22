
import React, { useState } from 'react';
import { MUSCLE_PATHS } from '../constants';
import { Flame, Clock, TrendingUp, Calendar, ChevronLeft, ChevronRight, BarChart2, Layers } from 'lucide-react';

export const History: React.FC = () => {
  const [view, setView] = useState<'week' | 'month'>('week');

  // Mock Data for Weekly Chart (Mon-Sun)
  const weeklyVolume = [1200, 3400, 0, 4500, 2100, 5212, 1000]; 
  const maxVol = Math.max(...weeklyVolume);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="h-full w-full p-6 pt-12 overflow-y-auto pb-32 bg-slate-950">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h1 className="text-3xl font-black tracking-tight text-white">
          數據分析
        </h1>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${view === 'week' ? 'bg-wg-red text-white shadow' : 'text-slate-500 hover:text-white'}`}
            >
                週
            </button>
            <button 
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${view === 'month' ? 'bg-wg-red text-white shadow' : 'text-slate-500 hover:text-white'}`}
            >
                月
            </button>
        </div>
      </div>

      {/* Calendar Strip (Stylized) */}
      <div className="flex justify-between items-center mb-8 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex-shrink-0">
         <button className="text-slate-500 hover:text-white p-1"><ChevronLeft size={20} /></button>
         <div className="flex items-center gap-2 text-white font-bold font-mono text-sm md:text-base">
             <Calendar size={16} className="text-wg-red" />
             Nov 13 - Nov 19
         </div>
         <button className="text-slate-500 hover:text-white p-1"><ChevronRight size={20} /></button>
      </div>

      {/* Weekly Volume Chart */}
      <div className="mb-8 flex-shrink-0">
          <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-slate-300 font-bold flex items-center gap-2 text-sm">
                  <BarChart2 size={16} className="text-wg-neonGreen" /> 訓練總量 (kg)
              </h3>
              <span className="text-2xl font-black text-white font-mono">17,412</span>
          </div>
          
          <div className="h-40 flex items-end justify-between gap-2">
              {weeklyVolume.map((vol, idx) => {
                  const height = vol === 0 ? 4 : (vol / maxVol) * 100;
                  const isToday = idx === 5; // Saturday mocked as today
                  return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer min-w-[20px]">
                          <div className="relative w-full flex items-end justify-center h-full rounded-t-lg overflow-hidden">
                              <div 
                                style={{ height: `${height}%` }} 
                                className={`w-full max-w-[24px] rounded-t-md transition-all duration-500 relative ${isToday ? 'bg-wg-red shadow-[0_0_15px_rgba(230,0,18,0.5)]' : 'bg-slate-800 group-hover:bg-slate-700'}`}
                              >
                                  {/* Tooltip on Hover */}
                                  {vol > 0 && (
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                          {vol}kg
                                      </div>
                                  )}
                              </div>
                          </div>
                          <span className={`text-xs font-bold font-mono ${isToday ? 'text-white' : 'text-slate-600'}`}>
                              {days[idx]}
                          </span>
                      </div>
                  )
              })}
          </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 flex-shrink-0">
        <div className="bg-slate-900 p-4 md:p-5 rounded-3xl border border-slate-800 flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="absolute -right-2 -top-2 w-16 h-16 bg-wg-neonGreen/10 rounded-full blur-xl"></div>
            <TrendingUp className="text-wg-neonGreen relative z-10" size={24} />
            <div>
                <span className="text-2xl md:text-3xl font-black font-mono text-white tracking-tighter">1RM</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Bench Press Record</p>
                <p className="text-xs md:text-sm text-white font-bold mt-1">85kg <span className="text-wg-neonGreen text-xs">+2.5%</span></p>
            </div>
        </div>
        <div className="bg-slate-900 p-4 md:p-5 rounded-3xl border border-slate-800 flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="absolute -right-2 -top-2 w-16 h-16 bg-wg-neonYellow/10 rounded-full blur-xl"></div>
            <Clock className="text-wg-neonYellow relative z-10" size={24} />
            <div>
                <span className="text-2xl md:text-3xl font-black font-mono text-white tracking-tighter">4.2</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Hours / Week</p>
                <p className="text-xs md:text-sm text-white font-bold mt-1">Avg 42m/session</p>
            </div>
        </div>
      </div>

      {/* Heatmap Section (Enhanced) */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 relative overflow-hidden mb-8 flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold flex items-center gap-2 text-sm">
                 <Layers size={16} className="text-wg-red" /> 肌肉訓練熱力圖 (本週)
            </h3>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-8 relative z-10">
            {/* Front Body SVG */}
            <div className="relative w-24 md:w-28 h-40 md:h-44">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <g opacity="0.2" stroke="#475569" fill="none" strokeWidth="1">
                        <circle cx="50" cy="15" r="10" />
                        <path d="M50,25 L50,85" />
                        <path d="M20,35 L80,35" />
                        <path d="M35,85 L25,100 M65,85 L75,100" />
                    </g>
                    <path d={MUSCLE_PATHS.frontChest} fill="#E60012" className="opacity-90" />
                    <path d={MUSCLE_PATHS.frontAbs} fill="#334155" />
                    <path d={MUSCLE_PATHS.shouldersLeft} fill="#334155" />
                    <path d={MUSCLE_PATHS.shouldersRight} fill="#334155" />
                </svg>
                <div className="absolute bottom-0 w-full text-center text-[10px] text-slate-500 font-bold uppercase">Front</div>
            </div>

            {/* Back Body SVG */}
            <div className="relative w-24 md:w-28 h-40 md:h-44">
                 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <g opacity="0.2" stroke="#475569" fill="none" strokeWidth="1">
                        <circle cx="50" cy="15" r="10" />
                        <path d="M50,25 L50,85" />
                        <path d="M20,35 L80,35" />
                        <path d="M35,85 L25,100 M65,85 L75,100" />
                    </g>
                    <path d={MUSCLE_PATHS.backLats} fill="#7f1d1d" opacity="0.6" />
                    <path d={MUSCLE_PATHS.backTraps} fill="#334155" />
                </svg>
                <div className="absolute bottom-0 w-full text-center text-[10px] text-slate-500 font-bold uppercase">Back</div>
            </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div>
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 px-1">Recent Workouts</h3>
        <div className="space-y-3">
            <div className="flex justify-between p-4 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl border border-slate-800 items-center cursor-pointer group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center text-wg-red font-black text-lg font-mono border border-slate-800 group-hover:border-wg-red/50 transition-colors flex-shrink-0">
                        18
                    </div>
                    <div>
                        <div className="text-white font-bold line-clamp-1">胸與三頭肌</div>
                        <div className="text-slate-500 text-xs">Today • 51 min • 5212 kg</div>
                    </div>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:text-white flex-shrink-0" />
            </div>
            
            <div className="flex justify-between p-4 bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl border border-slate-800 items-center cursor-pointer group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500 font-black text-lg font-mono border border-slate-800 flex-shrink-0">
                        16
                    </div>
                    <div>
                        <div className="text-white font-bold line-clamp-1">腿部訓練</div>
                        <div className="text-slate-500 text-xs">Nov 16 • 65 min • 8420 kg</div>
                    </div>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:text-white flex-shrink-0" />
            </div>
        </div>
      </div>
    </div>
  );
};