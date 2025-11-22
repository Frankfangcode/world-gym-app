
import React, { useState, useEffect } from 'react';
import { Bell, Navigation2, Dumbbell, ChevronRight, X, Target } from 'lucide-react';
import { Button } from './Button';

interface DashboardProps {
  onNavigateToMap: () => void;
  onPlanWorkout?: (muscle: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateToMap, onPlanWorkout }) => {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [occupancyCount, setOccupancyCount] = useState(5);
  const MAX_CAPACITY = 30;

  // Simulate dynamic occupancy
  useEffect(() => {
    const interval = setInterval(() => {
      setOccupancyCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const newValue = prev + change;
        // Keep it within a realistic range for this demo (e.g., 3 to 12 people)
        return Math.max(3, Math.min(newValue, 12));
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const occupancyPercent = Math.round((occupancyCount / MAX_CAPACITY) * 100);
  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (occupancyPercent / 100) * circumference;

  const handleMuscleSelect = (muscle: string) => {
    setShowPlanModal(false);
    if (onPlanWorkout) {
        onPlanWorkout(muscle);
    } else {
        onNavigateToMap();
    }
  };

  return (
    <div className="h-full w-full p-6 pt-12 flex flex-col gap-5 overflow-y-auto pb-32 bg-slate-950 relative">
      {/* Header */}
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <p className="text-slate-400 text-sm mb-1 font-medium">歡迎回來，澤享</p>
          <h1 className="text-2xl font-black tracking-tight text-wg-red flex items-center gap-2">
            智慧健身房
            <span className="text-[10px] bg-wg-red/10 text-wg-red px-1.5 py-0.5 rounded ml-1 font-bold border border-wg-red/20">TW-TP101</span>
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-colors relative flex-shrink-0">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-wg-red rounded-full border-2 border-slate-900"></span>
        </button>
      </div>

      {/* 1. Occupancy Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-lg flex-shrink-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-wg-neonYellow/5 blur-[60px] rounded-full pointer-events-none"></div>
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h3 className="text-slate-400 text-sm font-medium mb-3">當前館內人流</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-6xl font-mono font-bold text-white tracking-tighter">{occupancyCount}</span>
                <span className="text-slate-600 text-lg font-medium">/ {MAX_CAPACITY}</span>
            </div>
          </div>
          
          <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
              <circle 
                cx="50" cy="50" r="42" 
                fill="none" 
                stroke="#F59E0B" 
                strokeWidth="10" 
                strokeLinecap="round" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset}
                className="drop-shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-white font-bold text-xl font-mono tracking-tight">{occupancyPercent}%</span>
          </div>
        </div>
      </div>

      {/* 2. Last Workout Record */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-1 relative overflow-hidden group cursor-pointer hover:bg-slate-900 transition-colors flex-shrink-0">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
         <div className="p-5 flex justify-between items-center">
            <div>
                 <h3 className="text-slate-300 font-medium text-sm mb-1">上次訓練紀錄</h3>
                 <div className="flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-wg-red border border-slate-700 flex-shrink-0">
                        <Dumbbell size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-base">胸部推舉</h4>
                        <p className="text-slate-500 text-xs mt-0.5 font-mono">2025.11.16 • 45m</p>
                    </div>
                 </div>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-800 flex-shrink-0">
                <div className="text-right">
                    <span className="block text-lg font-mono font-bold text-white">24</span>
                    <span className="text-[10px] text-slate-500 uppercase">Sets</span>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={18} />
            </div>
         </div>
      </div>

      {/* 3. Zone Crowding Map */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex-shrink-0">
        <h3 className="text-slate-300 font-medium mb-4 text-sm px-1">各區域擁擠度地圖</h3>
        <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50">
                <div className="flex items-center gap-3">
                    <span className="text-slate-200 text-sm font-medium">有氧區 (跑步機)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-wg-neonYellow font-bold">中等</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-wg-neonYellow shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse"></div>
                </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50">
                <div className="flex items-center gap-3">
                    <span className="text-slate-200 text-sm font-medium">重訓 A 區 (胸/背)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-wg-neonRed font-bold">擁擠</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-wg-neonRed shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></div>
                </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50">
                <div className="flex items-center gap-3">
                    <span className="text-slate-200 text-sm font-medium">重訓 B 區 (腿部)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-wg-neonGreen font-bold">空閒</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-wg-neonGreen shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
                </div>
            </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-4">
          <Button onClick={() => setShowPlanModal(true)} fullWidth glow className="h-16 text-lg group relative overflow-hidden bg-wg-red hover:bg-red-600 border-none shadow-lg shadow-wg-red/20 rounded-3xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <span className="relative z-10 flex items-center justify-center gap-2 font-black tracking-wide">
              <Navigation2 size={22} className="group-hover:rotate-45 transition-transform duration-500" />
              規劃今日訓練路線
            </span>
          </Button>
      </div>

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center">
            <div className="bg-slate-900 w-full md:w-[400px] rounded-t-[32px] md:rounded-[32px] p-6 pb-32 md:pb-6 border border-slate-800 animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <Target className="text-wg-red" /> 選擇訓練部位
                    </h3>
                    <button onClick={() => setShowPlanModal(false)} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <p className="text-slate-400 text-sm mb-6">系統將為您自動規劃最有效率的路線。</p>
                <div className="grid grid-cols-2 gap-3">
                    {['Chest', 'Back', 'Legs', 'Full Body'].map((muscle) => (
                        <button 
                            key={muscle}
                            onClick={() => handleMuscleSelect(muscle)}
                            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-wg-red/50 hover:bg-slate-800 transition-all text-left group"
                        >
                            <span className="text-lg font-bold text-white block group-hover:text-wg-red transition-colors">{muscle}</span>
                            <span className="text-xs text-slate-500">Auto-Route</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
