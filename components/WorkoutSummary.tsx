
import React, { useEffect, useState } from 'react';
import { CheckCircle2, Flame, Clock, Dumbbell, Share2, RotateCcw, Trophy, Calendar, ChevronRight, TrendingUp, Star, Layers } from 'lucide-react';
import { Button } from './Button';
import { Machine } from '../types';
import { MUSCLE_PATHS } from '../constants';

interface WorkoutSummaryProps {
  duration: string;
  totalWeight: number;
  machinesUsed: Machine[];
  onClose: () => void;
}

export const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ duration, totalWeight, machinesUsed, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  // Determine which muscles were hit based on machines used
  const activeMuscles = new Set(machinesUsed.map(m => m.targetMuscle));

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Confetti Effect (Simulated with CSS/particles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-2 h-2 bg-red-500 rounded-full animate-[fall_3s_linear_infinite]"></div>
          <div className="absolute top-[-10%] left-[50%] w-2 h-2 bg-blue-500 rounded-full animate-[fall_2.5s_linear_infinite_0.5s]"></div>
          <div className="absolute top-[-10%] left-[80%] w-2 h-2 bg-yellow-500 rounded-full animate-[fall_3.2s_linear_infinite_1s]"></div>
      </div>

      {/* Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-12 pb-64 scroll-smooth">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-wg-red/20 text-wg-red text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border border-wg-red/20">Mission Complete</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    太棒了，澤享！<br/>
                    <span className="text-slate-400 text-xl md:text-2xl font-medium">今日訓練目標達成</span>
                </h1>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-wg-neonGreen blur-xl opacity-40 rounded-full animate-pulse"></div>
                <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-wg-neonGreen flex items-center justify-center text-wg-neonGreen relative z-10 shadow-2xl">
                    <Trophy size={32} strokeWidth={2} className="fill-wg-neonGreen/20" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-wg-neonGreen text-slate-950 text-xs font-black px-2 py-0.5 rounded-full border-2 border-slate-900">
                    +50 XP
                </div>
            </div>
        </div>

        {/* Main Stats Card - Hero Section */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-[32px] p-1 border border-slate-700 relative overflow-hidden shadow-2xl mb-8 animate-fade-in group">
            {/* Animated Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-wg-red via-purple-500 to-blue-500 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            
            <div className="bg-slate-950/90 backdrop-blur-sm rounded-[30px] p-6 relative z-10 h-full">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Dumbbell size={12}/> Total Volume</div>
                        <div className="text-5xl font-black text-white font-mono tracking-tighter leading-none">
                            {(totalWeight / 1000).toFixed(1)}<span className="text-2xl text-wg-red ml-1">k</span>
                        </div>
                        <div className="text-slate-500 text-sm font-medium mt-1">kg lifted today</div>
                    </div>
                    <div className="text-right">
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center justify-end gap-1">Duration <Clock size={12}/></div>
                        <div className="text-3xl font-bold text-white font-mono">{duration}</div>
                        <div className="text-slate-500 text-sm font-medium mt-1">minutes</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center gap-1 group/stat hover:border-wg-red/30 transition-colors">
                        <Flame size={20} className="text-wg-neonRed mb-1 group-hover/stat:scale-110 transition-transform" fill="currentColor" fillOpacity={0.2} />
                        <div className="text-xl font-black text-white font-mono">320</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Kcal</div>
                    </div>
                    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center gap-1 group/stat hover:border-blue-500/30 transition-colors">
                        <CheckCircle2 size={20} className="text-blue-400 mb-1 group-hover/stat:scale-110 transition-transform" />
                        <div className="text-xl font-black text-white font-mono">{machinesUsed.length}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Exercises</div>
                    </div>
                    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center gap-1 group/stat hover:border-wg-neonYellow/30 transition-colors">
                        <Star size={20} className="text-wg-neonYellow mb-1 group-hover/stat:scale-110 transition-transform" fill="currentColor" fillOpacity={0.2} />
                        <div className="text-xl font-black text-white font-mono">3</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Records</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Muscle Analysis & Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Muscle Map */}
            <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-4 relative flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-full flex justify-between items-start mb-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Muscle Impact</span>
                    <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-full border border-slate-700">Upper Body Focus</span>
                </div>
                
                <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(230,0,18,0.3)]">
                        <g opacity="0.2" stroke="#475569" fill="none" strokeWidth="1">
                            <path d="M20,35 L80,35" />
                            <path d="M50,25 L50,85" />
                        </g>
                        <path d={MUSCLE_PATHS.frontChest} fill={machinesUsed.some(m => m.targetMuscle === 'Chest') ? '#E60012' : '#334155'} className="transition-colors duration-1000" />
                        <path d={MUSCLE_PATHS.shouldersLeft} fill={machinesUsed.some(m => m.targetMuscle === 'Shoulders') ? '#E60012' : '#334155'} className="transition-colors duration-1000" />
                        <path d={MUSCLE_PATHS.shouldersRight} fill={machinesUsed.some(m => m.targetMuscle === 'Shoulders') ? '#E60012' : '#334155'} className="transition-colors duration-1000" />
                        <path d={MUSCLE_PATHS.frontAbs} fill={machinesUsed.some(m => m.targetMuscle === 'Abs') ? '#E60012' : '#334155'} className="transition-colors duration-1000" />
                        <path d={MUSCLE_PATHS.backLats} fill={machinesUsed.some(m => m.targetMuscle === 'Back') ? '#E60012' : '#334155'} className="transition-colors duration-1000" />
                    </svg>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">Heatmap generated from {machinesUsed.length || 0} exercises</div>
            </div>

            {/* Achievements List */}
            <div className="flex flex-col gap-3">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700 flex items-center gap-4 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-20 h-full bg-wg-neonYellow/5 -skew-x-12 translate-x-10 group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="w-12 h-12 rounded-xl bg-wg-neonYellow/10 flex items-center justify-center text-wg-neonYellow shrink-0 border border-wg-neonYellow/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Trophy size={24} fill="currentColor" fillOpacity={0.3} />
                    </div>
                    <div>
                        <div className="text-white font-bold text-base flex items-center gap-2">
                            New Record
                            <span className="bg-wg-neonYellow text-black text-[9px] font-black px-1.5 py-0.5 rounded">NEW</span>
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5">Bench Press <span className="text-white font-mono">85kg</span> (Max)</div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700 flex items-center gap-4 relative overflow-hidden group">
                     <div className="absolute right-0 top-0 w-20 h-full bg-blue-500/5 -skew-x-12 translate-x-10 group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="text-white font-bold text-base">Top 5%</div>
                        <div className="text-slate-400 text-xs mt-0.5">More volume than average users</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Exercise List Breakdown */}
        <div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
                <Layers size={12} /> Session Breakdown
            </h3>
            <div className="space-y-3">
                {machinesUsed.length > 0 ? machinesUsed.map((m, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 group hover:border-slate-600 transition-all">
                        <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-xs font-bold border border-slate-800">{i+1}</span>
                            <div>
                                <div className="text-white font-bold text-sm group-hover:text-wg-red transition-colors">{m.name}</div>
                                <div className="text-slate-500 text-xs flex gap-2 items-center mt-0.5">
                                    <span className="bg-slate-800 px-1.5 rounded text-[10px] text-slate-400">{m.targetMuscle || 'General'}</span>
                                    <span>•</span>
                                    <span>3 Sets</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-wg-neonGreen rounded-full border border-wg-neonGreen/30 p-1">
                            <CheckCircle2 size={16} />
                        </div>
                    </div>
                )) : (
                    <div className="text-slate-500 text-sm text-center py-4 italic">No machine data recorded.</div>
                )}
            </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar - Increased Padding for Mobile */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-24 md:pb-10 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent z-30 flex flex-col gap-3 backdrop-blur-sm">
          <Button variant="primary" fullWidth glow onClick={onClose} className="h-14 text-lg font-bold rounded-2xl shadow-lg shadow-wg-red/20 group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2"><RotateCcw size={20} /> 完成並回到首頁</span>
          </Button>
          <Button variant="secondary" fullWidth className="h-14 text-lg font-bold rounded-2xl border-slate-700 bg-slate-900/80 backdrop-blur text-slate-300 hover:text-white hover:bg-slate-800">
              <Share2 size={20} /> 分享 Instagram 限動
          </Button>
      </div>

      <style>{`
        @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
