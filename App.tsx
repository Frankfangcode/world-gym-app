import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { GymMap } from './components/GymMap';
import { ActiveWorkout } from './components/ActiveWorkout';
import { History } from './components/History';
import { Profile } from './components/Profile';
import { BottomTab } from './components/BottomTab';
import { QRScanner } from './components/QRScanner';
import { WorkoutSummary } from './components/WorkoutSummary';
import { Tab, Machine } from './types';
import { MOCK_MACHINES } from './constants';
import { Scan, Dumbbell } from 'lucide-react';
import { Button } from './components/Button';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  
  // Demo Flow State
  const [workoutQueue, setWorkoutQueue] = useState<Machine[]>([]);
  const [completedMachines, setCompletedMachines] = useState<Machine[]>([]);
  const [activeMachine, setActiveMachine] = useState<Machine | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanType, setScanType] = useState<'start' | 'finish'>('start');
  const [showSummary, setShowSummary] = useState(false);

  // Navigation Handlers
  const goToMap = () => setCurrentTab('map');
  
  // Called from Dashboard when user selects a body part to train
  const handlePlanWorkout = (muscleGroup: string) => {
    let machines: Machine[] = [];
    
    if (muscleGroup === 'Chest') {
        machines = MOCK_MACHINES.filter(m => m.targetMuscle === 'Chest' || m.type === 'bench');
    } else if (muscleGroup === 'Back') {
        machines = MOCK_MACHINES.filter(m => m.targetMuscle === 'Back' || m.targetMuscle === 'Legs/Back');
    } else if (muscleGroup === 'Legs') {
        machines = MOCK_MACHINES.filter(m => m.targetMuscle === 'Legs/Cardio' || m.targetMuscle === 'Quads' || m.targetMuscle === 'Legs/Back');
    } else {
        // Default mixed
        machines = [MOCK_MACHINES[0], MOCK_MACHINES[6], MOCK_MACHINES[8]];
    }
    
    // Sort/prioritize available ones or just take first 3 for demo
    const plan = machines.slice(0, 3);
    setWorkoutQueue(plan);
    setCompletedMachines([]);
    setCurrentTab('map');
  };

  // Called from GymMap when user clicks "Scan QR Code" on a machine
  const handleStartScan = (machine: Machine) => {
    setActiveMachine(machine);
    setScanType('start');
    setShowScanner(true);
  };

  const handleBlindScan = () => {
    setScanType('start');
    setShowScanner(true);
  };

  // Called from ActiveWorkout when user clicks "Finish"
  const handleFinishWorkout = () => {
    if (activeMachine) {
        const newCompleted = [...completedMachines, activeMachine];
        setCompletedMachines(newCompleted);
        
        // Remove from queue if it was there
        const newQueue = workoutQueue.filter(m => m.id !== activeMachine.id);
        setWorkoutQueue(newQueue);
        setActiveMachine(null);

        // Logic: If it was a planned workout (queue was active) and now empty, show summary
        // Otherwise just go back to the 'Scan' screen so user can scan next machine
        if (newQueue.length === 0 && workoutQueue.length > 0) {
            setShowSummary(true);
        }
    }
  };

  const onScanSuccess = () => {
    setShowScanner(false);
    
    if (scanType === 'start') {
        if (!activeMachine) {
             // Simulate detecting a machine from generic scan
             // For demo purposes, we select the Butterfly machine (Chest)
             const randomMachine = MOCK_MACHINES.find(m => m.id === 'm_r2') || MOCK_MACHINES[0];
             setActiveMachine(randomMachine);
        }
        // Enter Workout Mode
        setCurrentTab('workout');
    }
  };

  const onCloseSummary = () => {
    setShowSummary(false);
    setCompletedMachines([]);
    setWorkoutQueue([]);
    setCurrentTab('home');
  };

  // Render Content based on Tab
  const renderContent = () => {
    if (showSummary) {
        return <WorkoutSummary 
            duration="45:00" 
            totalWeight={12500} 
            machinesUsed={completedMachines} 
            onClose={onCloseSummary} 
        />;
    }

    switch (currentTab) {
      case 'home':
        return <Dashboard onNavigateToMap={goToMap} onPlanWorkout={handlePlanWorkout} />;
      case 'map':
        return (
            <GymMap 
                workoutQueue={workoutQueue}
                onStartScan={handleStartScan} 
            />
        );
      case 'workout':
        if (!activeMachine) {
            return (
                <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
                     {/* Background decoration */}
                     <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-wg-red/20 rounded-full blur-[100px] animate-pulse-fast"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-800/50 rounded-full blur-[80px]"></div>
                     </div>

                     <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-8 animate-slide-up">
                         <div className="text-center space-y-2">
                             <h2 className="text-3xl font-black text-white tracking-tight">準備訓練</h2>
                             <p className="text-slate-400 font-medium">掃描器材 QR Code 開始紀錄</p>
                         </div>

                         <button 
                            onClick={handleBlindScan}
                            className="group relative w-full aspect-square rounded-[48px] bg-gradient-to-b from-wg-red to-red-700 shadow-[0_20px_60px_rgba(220,38,38,0.4)] hover:shadow-[0_30px_80px_rgba(220,38,38,0.5)] transition-all duration-300 flex flex-col items-center justify-center border-t border-white/20 active:scale-95 active:shadow-none"
                         >
                             <div className="absolute inset-0 rounded-[48px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                             
                             {/* Animated Ring */}
                             <div className="absolute inset-0 rounded-[48px] border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>

                             <Scan size={96} strokeWidth={1.5} className="text-white mb-4 drop-shadow-lg group-hover:-translate-y-2 transition-transform duration-300" />
                             <span className="text-2xl font-black text-white tracking-wider drop-shadow-md">掃描器材</span>
                             <span className="text-white/60 text-sm font-bold mt-2 uppercase tracking-widest group-hover:text-white transition-colors">Tap to Scan</span>
                         </button>
                         
                         {completedMachines.length > 0 && (
                             <Button variant="ghost" onClick={() => setShowSummary(true)} className="text-slate-500 hover:text-white">
                                 結束本次運動 (已完成 {completedMachines.length} 項)
                             </Button>
                         )}
                     </div>
                </div>
            );
        }
        return <ActiveWorkout machine={activeMachine} onFinish={handleFinishWorkout} />;
      case 'history':
        return <History />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigateToMap={goToMap} onPlanWorkout={handlePlanWorkout} />;
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-slate-950 text-white font-sans flex flex-col relative overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 relative z-0 w-full overflow-hidden flex flex-col">
        {renderContent()}
      </main>

      {/* Scanner Overlay */}
      {showScanner && (
          <QRScanner 
            label={scanType === 'start' && activeMachine ? `Scanning ${activeMachine.name}` : "Scanning Machine QR"}
            onScanComplete={onScanSuccess}
            onClose={() => setShowScanner(false)}
          />
      )}

      {/* Bottom Navigation */}
      {(!activeMachine && !showSummary && !showScanner) && (
        <BottomTab currentTab={currentTab} onTabChange={setCurrentTab} />
      )}
    </div>
  );
}