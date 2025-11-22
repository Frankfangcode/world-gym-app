export type Tab = 'home' | 'map' | 'workout' | 'history' | 'profile';

export type MachineStatus = 'available' | 'busy' | 'maintenance';

export type MachineType = 'treadmill' | 'dumbbell' | 'machine' | 'cardio' | 'rack' | 'bench' | 'stretch';

export interface Machine {
  id: string;
  name: string;
  type: MachineType;
  status: MachineStatus;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  floor: number;
  targetMuscle?: string;
}

export interface WorkoutSet {
  id: number;
  reps: number;
  weight: number;
  rest: string;
  completed: boolean;
}

export interface HeatmapZone {
  id: string;
  label: string;
  intensity: 'low' | 'medium' | 'high' | 'none';
  path: string; // SVG path data
}

export interface MapZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  borderColor: string;
}