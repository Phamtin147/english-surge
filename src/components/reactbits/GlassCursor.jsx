import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function GlassCursor({
  size = 140, // Large refractive bubble lens
  refractionStrength = 24,
  chromaticAberration = true,
  glowRing = true,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Ultra-fluid spring tracking
  const springConfig = { damping: 26, stiffness: 300, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isClickable =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  const currentSize = isHovered ? size * 1.25 : size;

  return (
    <>
      {/* SVG Fisheye Refraction & Chromatic Aberration Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="glass-lens-refract" x="-50%" y="-50%" width="200%" height="200%">
            {/* Spherize / Fisheye Displacement Map */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={refractionStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {chromaticAberration && (
              <>
                <feColorMatrix
                  in="displaced"
                  type="matrix"
                  values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="red"
                />
                <feOffset in="red" dx="1.5" dy="0" result="redOffset" />
                <feColorMatrix
                  in="displaced"
                  type="matrix"
                  values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="green"
                />
                <feColorMatrix
                  in="displaced"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                  result="blue"
                />
                <feOffset in="blue" dx="-1.5" dy="0" result="blueOffset" />
                <feBlend in="redOffset" in2="green" mode="screen" result="rg" />
                <feBlend in="rg" in2="blueOffset" mode="screen" result="finalColor" />
              </>
            )}
          </filter>
        </defs>
      </svg>

      {/* 3D Glass Bubble / Optical Refraction Lens */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full select-none ${className}`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: currentSize,
          height: currentSize,
          // Refractive Fish-Eye Filter & Backdrop Distortion
          backdropFilter: 'url(#glass-lens-refract) blur(0.6px) saturate(140%)',
          WebkitBackdropFilter: 'url(#glass-lens-refract) blur(0.6px) saturate(140%)',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 65%, rgba(0,0,0,0.15) 100%)',
          // Luminous 3D Glass Caustic & Chromatic Rim
          border: '1.5px solid rgba(255, 255, 255, 0.45)',
          boxShadow: `
            inset 0 0 24px rgba(255, 255, 255, 0.35),
            inset 0 8px 16px rgba(255, 255, 255, 0.4),
            inset 0 -8px 16px rgba(0, 0, 0, 0.25),
            0 0 35px -5px rgba(56, 189, 248, 0.45),
            0 0 20px -2px rgba(236, 72, 153, 0.35),
            0 12px 30px rgba(0, 0, 0, 0.35)
          `,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
        }}
      >
        {/* Top 3D Specular Curved Reflection Highlight */}
        <div className="absolute top-2.5 left-4 right-4 h-6 rounded-full bg-gradient-to-b from-white/45 to-transparent blur-[1px] pointer-events-none" />

        {/* Bottom Caustic Rim Reflection */}
        <div className="absolute bottom-2 left-6 right-6 h-3 rounded-full bg-gradient-to-t from-cyan-300/30 to-transparent blur-[1px] pointer-events-none" />

        {/* Center Crosshair / Precision Aiming Point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] pointer-events-none" />
      </motion.div>
    </>
  );
}
