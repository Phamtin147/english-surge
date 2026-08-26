import React, { useRef, useState, useEffect } from 'react';

export function ShaderBackground({
  color1 = '#7c3aed', // Purple
  color2 = '#c026d3', // Fuchsia / Magenta
  color3 = '#4f46e5', // Indigo
  className = '',
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[inherit] ${className}`}>
      {/* Deep Dark Base */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Billowing Rising Flame Layer 1 */}
      <div
        className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full blur-2xl opacity-60 mix-blend-screen animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
        }}
      />

      {/* Billowing Rising Flame Layer 2 */}
      <div
        className="absolute -bottom-16 right-10 w-64 h-64 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
          animationDelay: '1.5s',
        }}
      />

      {/* Billowing Rising Flame Layer 3 */}
      <div
        className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full blur-3xl opacity-35 mix-blend-screen animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${color3} 0%, transparent 70%)`,
          animationDelay: '3s',
        }}
      />

      {/* Flowing noise texture / vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-slate-950/70 to-slate-950/90" />
    </div>
  );
}

export default function ShaderCard({
  children,
  className = '',
  color1 = '#7c3aed',
  color2 = '#c026d3',
  color3 = '#4f46e5',
  hoverGlow = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isInside: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isInside: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isInside: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950 transition-all duration-300 ${
        mousePos.isInside && hoverGlow
          ? 'border-indigo-500/50 shadow-2xl shadow-indigo-950/70 scale-[1.01]'
          : 'shadow-xl'
      } ${className}`}
      {...props}
    >
      {/* Background Rising Flame Layers */}
      <ShaderBackground color1={color1} color2={color2} color3={color3} />

      {/* Interactive Mouse Torch / Ripple Flame Layer */}
      {mousePos.isInside && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 -inset-px z-0"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${color1}25, transparent 80%)`,
          }}
        />
      )}

      {/* Foreground Content */}
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
}
