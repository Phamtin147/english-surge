import React from 'react';

export default function ShinyText({ text, disabled = false, speed = 5, className = '' }) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text ${
        disabled
          ? 'text-slate-300'
          : 'text-transparent bg-[linear-gradient(110deg,#94a3b8,45%,#ffffff,55%,#94a3b8)] bg-[length:200%_100%] animate-shine'
      } ${className}`}
      style={{
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
