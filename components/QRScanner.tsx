import React, { useEffect, useState } from 'react';
import { Scan, X } from 'lucide-react';

interface QRScannerProps {
  onScanComplete: () => void;
  onClose: () => void;
  label?: string;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScanComplete, onClose, label = "Scanning QR Code..." }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onScanComplete, 500);
          return 100;
        }
        return p + 2; 
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onScanComplete]);

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center animate-fade-in">
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Camera Viewfinder UI */}
      <div className="relative w-72 h-72 border-2 border-white/30 rounded-3xl flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-wg-red rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-wg-red rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-wg-red rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-wg-red rounded-br-xl"></div>
          
          {/* Scan Line */}
          <div className="absolute w-full h-1 bg-wg-red/50 shadow-[0_0_20px_rgba(230,0,18,0.8)] top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

          <Scan size={48} className="text-white/50 animate-pulse relative z-10" />
      </div>

      <div className="mt-10 text-center z-10 px-6">
          <h3 className="text-white font-bold text-2xl mb-2 tracking-tight">{label}</h3>
          <p className="text-slate-400 text-sm mb-8 font-mono">Align the machine QR code within the frame</p>
          
          <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto border border-slate-700">
              <div className="h-full bg-wg-red transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(230,0,18,0.8)]" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-wg-red font-mono mt-2">{progress}% ANALYZING</p>
      </div>

      <button onClick={onClose} className="absolute bottom-12 text-slate-500 flex items-center gap-2 hover:text-white z-10 px-6 py-2 rounded-full hover:bg-slate-900 transition-all">
          <X size={20} /> Cancel Scan
      </button>

      <style>{`
        @keyframes scan {
            0%, 100% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};