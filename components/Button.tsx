import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  fullWidth?: boolean;
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  fullWidth = false,
  glow = false,
  ...props 
}) => {
  const baseStyles = "px-4 py-3 rounded-2xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-wg-red text-white hover:bg-red-700",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-900",
    danger: "bg-slate-900 text-red-500 border border-red-900/50 hover:bg-red-950",
  };

  const glowEffect = glow && variant === 'primary' ? "shadow-[0_0_20px_rgba(230,0,18,0.4)] hover:shadow-[0_0_30px_rgba(230,0,18,0.6)]" : "";
  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${glowEffect} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};