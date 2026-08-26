import React from 'react';

export default function StarBorder({
  as: Component = 'button',
  className = '',
  color = '#6366f1',
  speed = '6s',
  children,
  ...rest
}) {
  return (
    <Component
      className={`relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-xl font-medium transition-all group ${className}`}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] rounded-full opacity-70 blur-[2px] transition-all group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${color} 10%, transparent 65%)`,
          animation: `star-border-rotate ${speed} linear infinite`,
        }}
      />
      <div className="relative w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center transition-all group-hover:bg-slate-900/90">
        {children}
      </div>
    </Component>
  );
}
