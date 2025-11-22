import React from 'react';
import { Home, Map, ScanLine, Calendar, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomTabProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomTab: React.FC<BottomTabProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'map', label: '地圖', icon: Map },
    { id: 'workout', label: '訓練', icon: ScanLine },
    { id: 'history', label: '紀錄', icon: Calendar },
    { id: 'profile', label: '個人', icon: User },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800/80 rounded-3xl px-4 py-3 flex justify-between items-center shadow-2xl shadow-black/80">
        {tabs.map((item) => {
          const isActive = currentTab === item.id;
          const isMain = item.id === 'workout';
          
          if (isMain) {
            return (
              <div key={item.id} className="relative -top-8 px-2">
                 <button
                    onClick={() => onTabChange(item.id)}
                    className={`
                        flex items-center justify-center 
                        w-16 h-16 rounded-2xl rotate-45
                        bg-wg-red text-white 
                        shadow-[0_0_25px_rgba(230,0,18,0.6)] 
                        border-[6px] border-slate-950
                        transition-all duration-300 
                        hover:scale-110 hover:shadow-[0_0_40px_rgba(230,0,18,0.8)] hover:rotate-[50deg]
                        active:scale-95
                    `}
                  >
                    <item.icon size={28} strokeWidth={2.5} className="-rotate-45" />
                  </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 relative group ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-slate-800 rounded-2xl scale-75 transition-transform" />
              )}
              
              <div className="relative z-10">
                  <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              {isActive && (
                 <div className="absolute -bottom-1 w-1 h-1 bg-wg-red rounded-full shadow-[0_0_8px_rgba(230,0,18,1)]" />
               )}
            </button>
          );
        })}
      </div>
    </div>
  );
};