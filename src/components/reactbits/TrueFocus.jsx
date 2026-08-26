import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TrueFocus({
  sentence = 'English Surge Mastery',
  manualMode = false,
  blurAmount = 4,
  borderColor = '#6366f1',
  glowColor = 'rgba(99, 102, 241, 0.4)',
  animationDuration = 0.4,
  pauseBetweenAnimations = 1,
}) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex gap-3 justify-center items-center flex-wrap py-2"
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="relative font-bold cursor-pointer text-xl md:text-3xl transition-all duration-300 select-none px-2 py-1"
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.45,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute pointer-events-none rounded-md"
        animate={{
          x: focusRect.x - 4,
          y: focusRect.y - 2,
          width: focusRect.width + 8,
          height: focusRect.height + 4,
          opacity: currentIndex !== null ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: 'easeInOut',
        }}
      >
        <span
          className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
        <span
          className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
        <span
          className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
      </motion.div>
    </div>
  );
}
