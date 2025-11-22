import React, { useState, useEffect } from 'react';
import { Machine, WorkoutSet } from '../types';
import { INITIAL_SETS, getMachineIcon } from '../constants';
import { Button } from './Button';
import { Check, Plus, BarChart3, Timer, StopCircle } from 'lucide-react';

interface ActiveWorkoutProps {
  machine: Machine;
  onFinish: () => void;
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ machine, onFinish }) => {
  const [seconds, setSeconds] = useState(0);
  const [sets, setSets] = useState<WorkoutSet[]>(INITIAL_SETS);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleSet = (id: number) => {
    setSets(sets.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const addSet = () => {
    const lastSet = sets[sets.length - 1];
    const newSet: WorkoutSet = {
        id: (lastSet?.id || 0) + 1,
        reps: lastSet?.reps || 10,
        weight: lastSet?.weight || 20,
        rest: '01:30',
        completed: false
    };
    setSets([...sets, newSet]);
  };

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col relative overflow-hidden animate-fade-in">
      {/* Top Bar */}
      <div className="p-6 flex justify-between items-start flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-wg-red flex-shrink-0">
                {getMachineIcon(machine.type, 24)}
            </div>
            <div>
                <h2 className="text-xl font-bold text-white line-clamp-1">{machine.name}</h2>
                <p className="text-wg-neonGreen text-xs flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-wg-neonGreen rounded-full inline-block"></span>
                    訓練時間全自動紀錄
                </p>
            </div>
        </div>
        <button className="text-slate-400 hover:text-white p-2">
            <BarChart3 size={24} />
        </button>
      </div>

      {/* Big Timer - Flexible Height */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center py-8 md:py-12 min-h-[180px]">
        <div className="relative">
            <h1 className="text-[clamp(4rem,15vw,6rem)] leading-none font-mono font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
                {formatTime(seconds)}
            </h1>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-500 text-sm uppercase tracking-widest">
                <Timer size={14} /> Duration
            </div>
        </div>
      </div>

      {/* Sets Table Container */}
      <div className="bg-slate-900 rounded-t-[40px] border-t border-slate-800 flex-1 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col min-h-0 relative z-10">
        
        {/* Table Header */}
        <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider font-bold py-4 px-6 border-b border-slate-800 bg-slate-900 rounded-t-[40px] sticky top-0 z-20">
            <span className="w-8 text-center">Set</span>
            <span className="w-16 text-center">Kg</span>
            <span className="w-16 text-center">Reps</span>
            <span className="w-16 text-center">Rest</span>
            <span className="w-8"></span>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-32">
            <div className="space-y-3">
                {sets.map((set, idx) => (
                    <div 
                        key={set.id} 
                        onClick={() => toggleSet(set.id)}
                        className={`flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer ${
                            set.completed 
                            ? 'bg-slate-950/50 border-slate-800 opacity-60' 
                            : 'bg-slate-800 border-slate-700 hover:border-wg-red/50'
                        }`}
                    >
                        <span className="w-8 text-center font-mono text-slate-400">{idx + 1}</span>
                        <span className="w-16 text-center font-mono font-bold text-xl">{set.weight}</span>
                        <span className="w-16 text-center font-mono font-bold text-xl">{set.reps}</span>
                        <span className="w-16 text-center font-mono text-slate-400">{set.rest}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                            set.completed ? 'bg-wg-neonGreen border-wg-neonGreen text-slate-950' : 'border-slate-600 text-transparent'
                        }`}>
                            <Check size={16} strokeWidth={4} />
                        </div>
                    </div>
                ))}

                <button 
                    onClick={addSet}
                    className="w-full py-4 rounded-2xl border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={20} /> 新增一組
                </button>
            </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-24 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-30">
          <Button variant="secondary" fullWidth onClick={onFinish} className="h-16 text-lg font-bold shadow-lg bg-slate-800 border-slate-700 text-white hover:bg-wg-red hover:border-wg-red transition-colors">
             <StopCircle className="mr-2" size={24} />
             結束訓練 (Finish)
          </Button>
      </div>
    </div>
  );
};