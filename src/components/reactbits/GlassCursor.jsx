import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function GlassCursor({
  size = 56,
  dotSize = 6,
  dotColor = '#a855f7', // Neon Purple
  blur = 6,
  border = 'rgba(255, 255, 255, 0.35)',
  glowColor = 'rgba(168, 85, 247, 0.3)',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth fluid trailing
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target;
      const isClickable =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  const currentSize = isHovered ? size * 1.35 : isClicking ? size * 0.8 : size;

  return (
    <>
      {/* SVG Chromatic Aberration & Refraction Filter */}
      <svg className="hidden">
        <defs>
          <filter id="glass-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Floating Glass Lens Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full select-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: currentSize,
          height: currentSize,
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
          border: `1px solid ${isHovered ? 'rgba(255, 255, 255, 0.5)' : border}`,
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.35), inset 0 0 16px rgba(255, 255, 255, 0.15), 0 0 20px -3px ${glowColor}`,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 320,
        }}
      >
        {/* Glass Refraction Specular Highlights */}
        <div className="absolute top-1.5 left-2 w-4 h-2 rounded-full bg-white/40 blur-[1px] rotate-[-25deg]" />
      </motion.div>

      {/* Center Micro Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full select-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          boxShadow: `0 0 10px ${dotColor}, 0 0 4px #ffffff`,
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovered ? 0.6 : 1,
          opacity: isHovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
