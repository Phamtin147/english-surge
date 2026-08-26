import React from 'react';

export default function AuroraBackground({ children, className = '', showRadialGradient = true }) {
  return (
    <div className={`relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden ${className}`}>
      {/* Background glowing orbs & mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {showRadialGradient && (
          <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent opacity-80" />
        )}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
