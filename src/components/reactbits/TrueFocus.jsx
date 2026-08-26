import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TrueFocus({
  sentence = 'English Surge Mastery',
  manualMode = false,
  borderColor = '#818cf8',
  glowColor = 'rgba(99, 102, 241, 0.4)',
  animationDuration = 0.35,
  pauseBetweenAnimations = 1.8,
  className = '',
}) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto cycle active index
  useEffect(() => {
    if (!manualMode && words.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  return (
    <div className={`relative flex flex-nowrap justify-center items-center gap-1 sm:gap-2 md:gap-3 py-2 px-1 select-none whitespace-nowrap overflow-x-auto sm:overflow-visible scrollbar-none max-w-full ${className}`}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            onMouseEnter={() => setCurrentIndex(index)}
            className={`relative font-heading font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-tight transition-all duration-300 cursor-pointer px-2 sm:px-2.5 py-1 select-none whitespace-nowrap shrink-0 ${
              isActive
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-cyan-200 to-indigo-100 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                : 'text-slate-300 hover:text-white opacity-85 hover:opacity-100'
            }`}
          >
            {/* The Word text */}
            <span className="relative z-10">{word}</span>

            {/* Framer Motion Shared Layout Frame - 100% perfectly snapped to word */}
            {isActive && (
              <motion.div
                layoutId="true-focus-frame"
                className="absolute inset-0 -m-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 pointer-events-none z-0"
                style={{
                  boxShadow: `0 0 20px -3px ${glowColor}`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 32,
                }}
              >
                {/* 4 Neon Target Corners */}
                <span
                  className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 rounded-tl-[3px]"
                  style={{ borderColor, filter: `drop-shadow(0 0 6px ${borderColor})` }}
                />
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 rounded-tr-[3px]"
                  style={{ borderColor, filter: `drop-shadow(0 0 6px ${borderColor})` }}
                />
                <span
                  className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 rounded-bl-[3px]"
                  style={{ borderColor, filter: `drop-shadow(0 0 6px ${borderColor})` }}
                />
                <span
                  className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 rounded-br-[3px]"
                  style={{ borderColor, filter: `drop-shadow(0 0 6px ${borderColor})` }}
                />
              </motion.div>
            )}
          </span>
        );
      })}
    </div>
  );
}
