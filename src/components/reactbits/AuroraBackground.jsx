import React from 'react';
import BlinkingSquares from './BlinkingSquares';

export default function AuroraBackground({ children, className = '', showRadialGradient = true }) {
  return (
    <div className={`relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden ${className}`}>
      {/* Blinking Squares Cyberpunk Background - Tiny Delicate Pixels */}
      <BlinkingSquares
        gridSize={20}
        squareSizeRatio={0.42}
        color="#c084fc"
        secondaryColor="#818cf8"
        direction="right"
        fadeStart={0.2}
        fadeEnd={0.95}
        falloff={1.1}
        minBrightness={0.06}
        twinkleSpeed={1.6}
        twinkleStrength={0.94}
        mouseRadius={130}
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
