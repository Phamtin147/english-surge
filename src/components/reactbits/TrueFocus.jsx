import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function TrueFocus({
  sentence = 'English Surge Mastery',
  manualMode = false,
  borderColor = '#6366f1',
  glowColor = 'rgba(99, 102, 241, 0.5)',
  animationDuration = 0.35,
  pauseBetweenAnimations = 1.8,
  className = '',
}) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ left: 0, top: 0, width: 0, height: 0, ready: false });

  // Update focus bounding box based on active word element offsets
  const updateFocusRect = useCallback((index) => {
    if (index === null || index === undefined || !wordRefs.current[index] || !containerRef.current) {
      return;
    }
    const el = wordRefs.current[index];
    setFocusRect({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      ready: true,
    });
  }, []);

  // Recalculate on index change
  useEffect(() => {
    updateFocusRect(currentIndex);
  }, [currentIndex, updateFocusRect]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => updateFocusRect(currentIndex);
    window.addEventListener('resize', handleResize);
    // Initial mount calculation after fonts load
    const timeout = setTimeout(() => updateFocusRect(currentIndex), 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [currentIndex, updateFocusRect]);

  // Auto cycling
  useEffect(() => {
    if (!manualMode && words.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap justify-center items-center gap-2 sm:gap-3.5 py-2 px-3 select-none ${className}`}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            onMouseEnter={() => setCurrentIndex(index)}
            className={`relative font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-300 cursor-pointer px-2 py-1 z-10 ${
              isActive
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-200 to-indigo-200 scale-105 drop-shadow-[0_0_15px_rgba(99,102,241,0.45)]'
                : 'text-slate-300 hover:text-white opacity-85 hover:opacity-100'
            }`}
          >
            {word}
          </span>
        );
      })}

      {/* Target Focus Frame & Glow */}
      {focusRect.ready && (
        <motion.div
          className="absolute pointer-events-none z-0 rounded-xl"
          animate={{
            x: focusRect.left - 4,
            y: focusRect.top - 2,
            width: focusRect.width + 8,
            height: focusRect.height + 4,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 30,
          }}
        >
          {/* Subtle background glow pill */}
          <div
            className="absolute inset-0 rounded-xl bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-xs"
            style={{
              boxShadow: `0 0 20px -3px ${glowColor}`,
            }}
          />

          {/* Corner brackets */}
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
    </div>
  );
}
