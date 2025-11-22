
import { Machine, WorkoutSet, MapZone } from './types';
import React from 'react';
import { Footprints, Dumbbell, Monitor, Activity, Box, Move, LayoutTemplate } from 'lucide-react';

// Define the colored zones from the reference image
export const MAP_ZONES: MapZone[] = [
  // Left Strip (Cardio) - Blue
  { id: 'z_cardio', label: '', x: 5, y: 5, width: 22, height: 55, color: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  
  // Bottom Left (Leg Machine) - Brown/Orange
  { id: 'z_legs', label: '腿部器械', x: 5, y: 62, width: 22, height: 20, color: 'bg-orange-700/20', borderColor: 'border-orange-600/30' },
  
  // Top Center (Dumbbells) - Blue
  { id: 'z_dumbbells', label: '啞鈴區', x: 30, y: 5, width: 35, height: 25, color: 'bg-blue-600/10', borderColor: 'border-blue-500/30' },
  
  // Top Right (Racks) - Green
  { id: 'z_racks', label: '', x: 68, y: 5, width: 27, height: 40, color: 'bg-emerald-600/10', borderColor: 'border-emerald-500/30' },
  
  // Center/Right (Machines) - Blue
  { id: 'z_machines', label: '器械區', x: 38, y: 38, width: 57, height: 44, color: 'bg-blue-900/20', borderColor: 'border-blue-500/20' },
  
  // Bottom Right (Stretch) - Green
  { id: 'z_stretch', label: '伸展區', x: 40, y: 84, width: 55, height: 15, color: 'bg-emerald-600/10', borderColor: 'border-emerald-500/30' },
];

export const MOCK_MACHINES: Machine[] = [
  // --- Left Column: Treadmills ---
  { id: 't1', name: '跑步機 01', type: 'treadmill', status: 'available', x: 16, y: 10, floor: 2, targetMuscle: 'Legs/Cardio' },
  { id: 't2', name: '跑步機 02', type: 'treadmill', status: 'busy', x: 16, y: 19, floor: 2, targetMuscle: 'Legs/Cardio' },
  { id: 't3', name: '跑步機 03', type: 'treadmill', status: 'available', x: 16, y: 28, floor: 2, targetMuscle: 'Legs/Cardio' },
  { id: 't4', name: '跑步機 04', type: 'treadmill', status: 'available', x: 16, y: 37, floor: 2, targetMuscle: 'Legs/Cardio' },
  { id: 't5', name: '跑步機 05', type: 'treadmill', status: 'maintenance', x: 16, y: 46, floor: 2, targetMuscle: 'Legs/Cardio' },
  { id: 't6', name: '跑步機 06', type: 'treadmill', status: 'busy', x: 16, y: 55, floor: 2, targetMuscle: 'Legs/Cardio' },

  // --- Bottom Left: Leg Machine ---
  { id: 'l1', name: '腿部推舉機', type: 'machine', status: 'available', x: 16, y: 72, floor: 2, targetMuscle: 'Quads' },

  // --- Top Center: Dumbbells & Benches ---
  { id: 'db_rack', name: '啞鈴架', type: 'dumbbell', status: 'available', x: 47, y: 9, floor: 2, targetMuscle: 'Full Body' },
  { id: 'b1', name: '臥推椅 1', type: 'bench', status: 'busy', x: 36, y: 20, floor: 2, targetMuscle: 'Chest' },
  { id: 'b2', name: '臥推椅 2', type: 'bench', status: 'available', x: 44, y: 20, floor: 2, targetMuscle: 'Chest' },
  { id: 'b3', name: '臥推椅 3', type: 'bench', status: 'available', x: 52, y: 20, floor: 2, targetMuscle: 'Chest' },
  { id: 'b4', name: '臥推椅 4', type: 'bench', status: 'busy', x: 60, y: 20, floor: 2, targetMuscle: 'Chest' },

  // --- Top Right: Power Racks ---
  { id: 'r1', name: '深蹲架 A', type: 'rack', status: 'busy', x: 81, y: 15, floor: 2, targetMuscle: 'Legs/Back' },
  { id: 'r2', name: '深蹲架 B', type: 'rack', status: 'available', x: 81, y: 32, floor: 2, targetMuscle: 'Legs/Back' },

  // --- Center/Right: Machines ---
  // Small one below dumbbells
  { id: 'm_small', name: '二頭肌訓練機', type: 'machine', status: 'available', x: 55, y: 45, floor: 2, targetMuscle: 'Biceps' },
  // Big one in center
  { id: 'm_center', name: '坐姿划船', type: 'machine', status: 'available', x: 55, y: 62, floor: 2, targetMuscle: 'Back' },
  // Right column
  { id: 'm_r1', name: '肩部推舉', type: 'machine', status: 'available', x: 85, y: 50, floor: 2, targetMuscle: 'Shoulders' },
  { id: 'm_r2', name: '蝴蝶機', type: 'machine', status: 'busy', x: 85, y: 65, floor: 2, targetMuscle: 'Chest' },
  { id: 'm_r3', name: '腹部訓練機', type: 'machine', status: 'available', x: 85, y: 80, floor: 2, targetMuscle: 'Abs' },

  // --- Bottom Right: Stretching ---
  { id: 's1', name: '瑜珈墊 A', type: 'stretch', status: 'available', x: 50, y: 90, floor: 2, targetMuscle: 'Stretch' },
  { id: 's2', name: '瑜珈墊 B', type: 'stretch', status: 'available', x: 65, y: 90, floor: 2, targetMuscle: 'Stretch' },
  { id: 's3', name: '瑜珈墊 C', type: 'stretch', status: 'busy', x: 80, y: 90, floor: 2, targetMuscle: 'Stretch' },
];

export const INITIAL_SETS: WorkoutSet[] = [
  { id: 1, reps: 12, weight: 20, rest: '01:00', completed: true },
  { id: 2, reps: 10, weight: 25, rest: '01:30', completed: true },
  { id: 3, reps: 8, weight: 30, rest: '02:00', completed: false },
];

// Helper to get icon based on type
export const getMachineIcon = (type: string, size = 20, className = "") => {
  switch (type) {
    case 'treadmill': return <Footprints size={size} className={className} />;
    case 'dumbbell': return <Dumbbell size={size} className={className} />;
    case 'cardio': return <Activity size={size} className={className} />;
    case 'rack': return <Box size={size} className={className} />;
    case 'bench': return <LayoutTemplate size={size} className={className} />;
    case 'stretch': return <Move size={size} className={className} />;
    default: return <Monitor size={size} className={className} />;
  }
};

export const MUSCLE_PATHS = {
  frontChest: "M35,35 Q50,40 65,35 L62,55 Q50,60 38,55 Z",
  frontAbs: "M40,60 Q50,60 60,60 L58,80 Q50,82 42,80 Z",
  backLats: "M30,35 Q50,30 70,35 L65,60 Q50,65 35,60 Z", 
  backTraps: "M40,20 L60,20 L55,30 L45,30 Z",
  shouldersLeft: "M20,35 Q30,30 35,35 L35,45 Q25,50 20,45 Z",
  shouldersRight: "M80,35 Q70,30 65,35 L65,45 Q75,50 80,45 Z",
};