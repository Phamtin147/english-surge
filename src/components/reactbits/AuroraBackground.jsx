import React from 'react';
import BlinkingSquares from './BlinkingSquares';

export default function AuroraBackground({ children, className = '', showRadialGradient = true }) {
  return (
    <div className={`relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden ${className}`}>
      {/* Blinking Squares Cyberpunk Background - Single Pure Neon Purple */}
      <BlinkingSquares
        gridSize={12}
        squareSizeRatio={0.38}
        color="#a855f7"
        direction="right"
        fadeStart={0.15}
        fadeEnd={0.95}
        falloff={1.15}
        minBrightness={0.05}
        twinkleSpeed={0.75}
        twinkleStrength={0.88}
        mouseRadius={140}
      />

      {/* Subtle deep ambient glow behind the squares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
