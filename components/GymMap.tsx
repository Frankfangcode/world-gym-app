
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_MACHINES, MAP_ZONES, getMachineIcon } from '../constants';
import { Machine, MachineType, MachineStatus } from '../types';
import { X, Scan, MapPin, Layers, Plus, Minus, RotateCcw, Navigation } from 'lucide-react';
import { Button } from './Button';

interface GymMapProps {
  workoutQueue?: Machine[];
  onMachineSelect?: (machine: Machine) => void; // Legacy prop, keeping for safety
  onStartScan: (machine: Machine) => void;
}

// --- Realistic SVG Machine Graphics ---
const MachineGraphic = ({ type, status, isSelected, isQueued, isNext }: { type: MachineType, status: MachineStatus, isSelected: boolean, isQueued?: boolean, isNext?: boolean }) => {
  let strokeColor = '#94a3b8'; // slate-400
  let fillColor = '#1e293b'; // slate-800
  let glowColor = 'transparent';

  if (isNext) {
     strokeColor = '#FFFFFF'; 
     fillColor = '#E60012'; // Active Red for Next Target
     glowColor = 'rgba(230, 0, 18, 0.6)';
  } else if (isQueued) {
     strokeColor = '#E60012'; // Queued but not next
     fillColor = 'rgba(230, 0, 18, 0.2)';
  } else if (status === 'available') {
    strokeColor = '#10B981'; 
    fillColor = 'rgba(16, 185, 129, 0.1)';
    glowColor = isSelected ? 'rgba(16, 185, 129, 0.4)' : 'transparent';
  } else if (status === 'busy') {
    strokeColor = '#EF4444'; 
    fillColor = 'rgba(239, 68, 68, 0.15)';
    glowColor = isSelected ? 'rgba(239, 68, 68, 0.4)' : 'transparent';
  } else {
    strokeColor = '#F59E0B'; 
    fillColor = 'rgba(245, 158, 11, 0.1)';
    glowColor = isSelected ? 'rgba(245, 158, 11, 0.4)' : 'transparent';
  }

  const commonProps = {
    stroke: strokeColor,
    fill: fillColor,
    strokeWidth: isNext ? 3 : 2,
    strokeLinecap: "round" as "round",
    strokeLinejoin: "round" as "round",
    className: "transition-all duration-300"
  };

  const glowFilter = (isSelected || isNext) ? `drop-shadow(0 0 8px ${glowColor})` : '';

  switch (type) {
    case 'treadmill':
      return (
        <svg viewBox="0 0 80 40" className="w-full h-full" style={{ filter: glowFilter }}>
            <rect x="2" y="5" width="76" height="30" rx="4" {...commonProps} />
            <path d="M15,5 L8,5 Q2,5 2,20 T8,35 L15,35" fill="none" stroke={strokeColor} strokeWidth="2" />
            <rect x="5" y="10" width="6" height="20" rx="1" fill={strokeColor} stroke="none" opacity="0.8" />
            <line x1="20" y1="5" x2="50" y2="5" stroke={strokeColor} strokeWidth="2" />
            <line x1="20" y1="35" x2="50" y2="35" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case 'rack': 
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full" style={{ filter: glowFilter }}>
            <rect x="2" y="2" width="8" height="8" fill={strokeColor} />
            <rect x="50" y="2" width="8" height="8" fill={strokeColor} />
            <rect x="2" y="50" width="8" height="8" fill={strokeColor} />
            <rect x="50" y="50" width="8" height="8" fill={strokeColor} />
            <rect x="2" y="2" width="56" height="56" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
            <line x1="0" y1="20" x2="60" y2="20" stroke={strokeColor} strokeWidth="3" />
            <rect x="20" y="15" width="20" height="40" rx="2" {...commonProps} strokeWidth="1.5" />
        </svg>
      );

    case 'bench':
      return (
        <svg viewBox="0 0 40 60" className="w-full h-full" style={{ filter: glowFilter }}>
            <rect x="10" y="15" width="20" height="40" rx="3" {...commonProps} />
            <rect x="10" y="2" width="20" height="10" rx="2" {...commonProps} />
        </svg>
      );

    case 'dumbbell':
      return (
        <svg viewBox="0 0 80 40" className="w-full h-full" style={{ filter: glowFilter }}>
            <rect x="2" y="5" width="76" height="30" rx="4" {...commonProps} fill="none" />
             {[10, 25, 40, 55, 70].map(cx => (
                <g key={cx}>
                    <circle cx={cx} cy="12" r="6" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                    <circle cx={cx} cy="28" r="6" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
                    <line x1={cx} y1="12" x2={cx} y2="28" stroke={strokeColor} strokeWidth="2" />
                </g>
            ))}
        </svg>
      );
    
    case 'machine':
      return (
        <svg viewBox="0 0 60 60" className="w-full h-full" style={{ filter: glowFilter }}>
            <rect x="15" y="25" width="30" height="25" rx="4" {...commonProps} />
            <rect x="15" y="5" width="30" height="15" rx="2" {...commonProps} />
            <path d="M5,20 Q10,40 15,40" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M55,20 Q50,40 45,40" fill="none" stroke={strokeColor} strokeWidth="2" />
            <circle cx="5" cy="20" r="3" fill={strokeColor} />
            <circle cx="55" cy="20" r="3" fill={strokeColor} />
        </svg>
      );

    case 'stretch':
      return (
         <svg viewBox="0 0 60 30" className="w-full h-full" style={{ filter: glowFilter }}>
             <rect x="2" y="2" width="56" height="26" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
         </svg>
      );

    default:
       return (
         <svg viewBox="0 0 50 50" className="w-full h-full" style={{ filter: glowFilter }}>
            <rect x="10" y="10" width="30" height="30" rx="4" {...commonProps} />
            <circle cx="25" cy="25" r="8" stroke={strokeColor} strokeWidth="2" fill="none" />
         </svg>
       );
  }
}

export const GymMap: React.FC<GymMapProps> = ({ workoutQueue = [], onMachineSelect, onStartScan }) => {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [activeFloor, setActiveFloor] = useState(2); 
  
  // Auto select next machine in queue logic
  useEffect(() => {
    if (workoutQueue.length > 0) {
        const nextMachine = workoutQueue[0];
        if (!selectedMachine) {
            setSelectedMachine(nextMachine);
        }
    }
  }, [workoutQueue]);
  
  // Pan & Zoom State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);

  const handleMachineClick = (machine: Machine) => {
    if (!isDragging) {
        setSelectedMachine(machine);
        if (onMachineSelect) onMachineSelect(machine);
    }
  };

  const filteredMachines = MOCK_MACHINES.filter(m => m.floor === activeFloor);

  // Zoom Handlers
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(false);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartRef.current) {
      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;
      if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
          setIsDragging(true);
      }
      setPosition({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    dragStartRef.current = null;
  };

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex flex-col">
      {/* 1. Header Info */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent pointer-events-none">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-1 flex items-center gap-2">
              {activeFloor}F 重訓區
            </h2>
            {workoutQueue.length > 0 ? (
                <p className="text-wg-red font-mono text-sm flex items-center gap-2 bg-wg-red/10 px-2 py-1 rounded-lg inline-block border border-wg-red/20 font-bold animate-pulse">
                   <Navigation size={12} /> 
                   路徑規劃模式: Next {workoutQueue[0].name}
                </p>
            ) : (
                <p className="text-wg-neonGreen font-mono text-sm flex items-center gap-2 bg-wg-neonGreen/10 px-2 py-1 rounded-lg inline-block border border-wg-neonGreen/20">
                   <MapPin size={12} /> 
                   擁擠程度: 舒適
                </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Controls */}
      <div className="absolute right-4 top-24 md:top-32 z-20 flex flex-col gap-6 pointer-events-auto">
        <div className="bg-slate-900/90 backdrop-blur border border-slate-700 p-1.5 rounded-2xl shadow-xl flex flex-col gap-1">
          {[3, 2, 1].map(f => (
            <button
              key={f}
              onClick={() => setActiveFloor(f)}
              className={`w-10 h-10 rounded-xl font-bold font-mono text-sm transition-all duration-300 flex items-center justify-center ${
                activeFloor === f
                  ? 'bg-wg-red text-white shadow-lg shadow-wg-red/40 scale-105'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              {f}F
            </button>
          ))}
          <div className="h-[1px] bg-slate-800 my-1 mx-2"></div>
          <button className="w-10 h-10 rounded-xl text-slate-500 flex items-center justify-center hover:text-wg-red transition-colors">
            <Layers size={18} />
          </button>
        </div>

        <div className="bg-slate-900/90 backdrop-blur border border-slate-700 p-1.5 rounded-2xl shadow-xl flex flex-col gap-1">
           <button onClick={handleZoomIn} className="w-10 h-10 rounded-xl text-slate-300 hover:bg-slate-800 flex items-center justify-center transition-colors">
               <Plus size={20} />
           </button>
           <button onClick={handleZoomOut} className="w-10 h-10 rounded-xl text-slate-300 hover:bg-slate-800 flex items-center justify-center transition-colors">
               <Minus size={20} />
           </button>
           <div className="h-[1px] bg-slate-800 my-1 mx-2"></div>
           <button onClick={handleReset} className="w-10 h-10 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors">
               <RotateCcw size={16} />
           </button>
        </div>
      </div>

      {/* 3. Main Map Viewport */}
      <div 
        className="flex-1 relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div 
            className="absolute inset-0 bg-[#020617] origin-center transition-transform duration-75 ease-linear will-change-transform"
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` 
            }}
        >
           <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
                 backgroundSize: '20px 20px',
                 width: '200%', height: '200%', left: '-50%', top: '-50%'
             }} 
           />

            <div className="relative w-full h-full">
                {activeFloor === 2 && MAP_ZONES.map(zone => (
                    <div 
                        key={zone.id}
                        style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.width}%`, height: `${zone.height}%` }}
                        className={`absolute border rounded-xl ${zone.color} ${zone.borderColor} backdrop-blur-[1px] flex items-center justify-center pointer-events-none transition-transform duration-300`}
                    >
                        {zone.label && (
                            <span className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest absolute bottom-2 right-2 whitespace-nowrap">
                                {zone.label}
                            </span>
                        )}
                    </div>
                ))}

                {activeFloor === 2 && (
                    <div className="absolute left-[5%] bottom-[2%] text-slate-500 font-bold text-xs flex flex-col items-center gap-1 opacity-50 pointer-events-none">
                        <div className="w-8 h-1 bg-slate-500"></div>
                        出入口
                    </div>
                )}

                {/* Machine Nodes */}
                <div className="relative w-full h-full z-10">
                {filteredMachines.map((machine) => {
                    const isSelected = selectedMachine?.id === machine.id;
                    const isNext = workoutQueue.length > 0 && workoutQueue[0].id === machine.id;
                    const isQueued = workoutQueue.some(m => m.id === machine.id);
                    
                    // Container sizing
                    let containerClass = '';
                    if (machine.type === 'treadmill' || machine.type === 'dumbbell') containerClass = 'w-20 h-10 md:w-28 md:h-14';
                    else if (machine.type === 'bench') containerClass = 'w-10 h-14 md:w-14 md:h-20';
                    else if (machine.type === 'rack') containerClass = 'w-14 h-14 md:w-20 md:h-20';
                    else if (machine.type === 'stretch') containerClass = 'w-14 h-8 md:w-20 md:h-12';
                    else containerClass = 'w-12 h-12 md:w-16 md:h-16';

                    const activeClass = (isSelected || isNext) ? `z-30 scale-110` : `hover:scale-105 z-10`;

                    return (
                    <button
                        key={machine.id}
                        onClick={(e) => { e.stopPropagation(); handleMachineClick(machine); }}
                        style={{ left: `${machine.x}%`, top: `${machine.y}%`, transform: 'translate(-50%, -50%)' }}
                        className={`absolute group flex items-center justify-center transition-transform duration-300 ease-out ${containerClass} ${activeClass}`}
                    >
                        <MachineGraphic 
                            type={machine.type} 
                            status={machine.status} 
                            isSelected={isSelected}
                            isQueued={isQueued}
                            isNext={isNext}
                        />
                        
                        {/* Next Indicator Label */}
                        {isNext && (
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-wg-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap animate-bounce shadow-[0_0_10px_rgba(230,0,18,0.6)] z-50 pointer-events-none">
                                 NEXT START
                             </div>
                        )}
                    </button>
                    );
                })}
                </div>
            </div>
        </div>
      </div>

      {/* 4. Bottom Sheet (Details) */}
      {selectedMachine && (
        <div className="absolute bottom-0 left-0 w-full z-40 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] pb-[env(safe-area-inset-bottom)] pointer-events-auto">
            <div className="mx-4 mb-24 md:mb-4 bg-[#0f172a] border border-slate-700 rounded-[32px] p-5 shadow-2xl relative overflow-hidden max-h-[60vh] overflow-y-auto">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-wg-red/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto mb-6"></div>

                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border bg-slate-900 flex-shrink-0 ${
                                selectedMachine.status === 'available' ? 'border-wg-neonGreen/30 text-wg-neonGreen' : 'border-wg-neonRed/30 text-wg-neonRed'
                            }`}>
                                {getMachineIcon(selectedMachine.type, 28)}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-1">{selectedMachine.name}</h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                                        selectedMachine.status === 'available' 
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${selectedMachine.status === 'available' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                                        {selectedMachine.status === 'available' ? '目前空閒' : '使用中'}
                                    </span>
                                    {workoutQueue.length > 0 && workoutQueue[0].id === selectedMachine.id && (
                                        <span className="text-wg-red text-xs font-bold uppercase border border-wg-red/30 px-2 py-1 rounded-full bg-wg-red/10">
                                            Recommended
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedMachine(null)}
                            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700 flex-shrink-0"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Alternative Machine Prompt if Busy */}
                    {selectedMachine.status === 'busy' && (
                        <div className="mb-4 p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                <RotateCcw size={14} />
                            </div>
                            <div>
                                <div className="text-white text-sm font-bold">建議替代器材</div>
                                <div className="text-slate-500 text-xs">器材 ID: {selectedMachine.id === 't2' ? 't3' : 'm_center'} (目前空閒)</div>
                            </div>
                            <Button variant="ghost" className="ml-auto text-xs py-1 px-3 h-8">View</Button>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                             <div className="text-slate-500 text-xs mb-1 font-medium uppercase tracking-wider">Target Muscle</div>
                             <div className="text-white font-bold text-base md:text-lg">{selectedMachine.targetMuscle || 'General'}</div>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                             <div className="text-slate-500 text-xs mb-1 font-medium uppercase tracking-wider">Est. Wait</div>
                             <div className="text-white font-bold text-base md:text-lg">{selectedMachine.status === 'available' ? '0 min' : '15 min'}</div>
                        </div>
                    </div>

                    <Button onClick={() => onStartScan(selectedMachine)} fullWidth glow className="h-14 text-lg bg-wg-red hover:bg-red-600 shadow-lg shadow-wg-red/20 border-0">
                        <Scan className="mr-2" size={20} />
                        Scan QR Code to Start
                    </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
