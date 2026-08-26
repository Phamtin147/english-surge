import React, { useRef, useEffect } from 'react';

export default function BlinkingSquares({
  gridSize = 48,
  squareSizeRatio = 0.55,
  color = '#a855f7', // Neon Purple / Violet
  secondaryColor = '#6366f1', // Indigo
  direction = 'right', // 'right', 'left', 'top', 'bottom', 'radial', 'diagonal'
  fadeStart = 0.2,
  fadeEnd = 1.0,
  falloff = 1.2,
  minBrightness = 0.08,
  twinkleSpeed = 1.4,
  twinkleStrength = 0.9,
  mouseRadius = 140,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let squares = [];
    const mouse = { x: -1000, y: -1000 };

    const parseColor = (hex) => {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map((x) => x + x).join('');
      const num = parseInt(c, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };

    const rgb1 = parseColor(color);
    const rgb2 = parseColor(secondaryColor);

    const initGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      squares = [];
      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;
      const actualSquareSize = gridSize * squareSizeRatio;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gridSize;
          const y = r * gridSize;

          // Calculate directional base density / visibility factor
          let norm = 0;
          if (direction === 'right') {
            norm = x / width;
          } else if (direction === 'left') {
            norm = 1 - x / width;
          } else if (direction === 'bottom') {
            norm = y / height;
          } else if (direction === 'top') {
            norm = 1 - y / height;
          } else if (direction === 'diagonal') {
            norm = (x / width + y / height) * 0.5;
          } else {
            // radial from center
            const dx = x - width / 2;
            const dy = y - height / 2;
            norm = Math.sqrt(dx * dx + dy * dy) / (width * 0.6);
          }

          // Falloff probability threshold
          const densityFactor = Math.pow(Math.max(0, Math.min(1, (norm - fadeStart) / (fadeEnd - fadeStart))), falloff);
          
          // Randomly spawn square based on density
          if (Math.random() < densityFactor * 0.85 + 0.05) {
            squares.push({
              x: x + (gridSize - actualSquareSize) / 2,
              y: y + (gridSize - actualSquareSize) / 2,
              size: actualSquareSize,
              phase: Math.random() * Math.PI * 2,
              speed: (0.5 + Math.random() * 0.8) * twinkleSpeed,
              baseAlpha: densityFactor,
              isSecondary: Math.random() > 0.7,
            });
          }
        }
      }
    };

    initGrid();

    let startTime = performance.now();

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];

        // Twinkle sinusoidal brightness variation
        const sineVal = Math.sin(elapsed * sq.speed * 2.5 + sq.phase);
        const twinkle = Math.pow((sineVal + 1) * 0.5, 2.0); // sharp twinkling peak

        let alpha = minBrightness + twinkle * twinkleStrength * sq.baseAlpha;

        // Mouse proximity boost
        const dx = mouse.x - (sq.x + sq.size / 2);
        const dy = mouse.y - (sq.y + sq.size / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const mouseFactor = 1 - dist / mouseRadius;
          alpha = Math.min(1.0, alpha + mouseFactor * 0.7);
        }

        if (alpha > 0.02) {
          const rgb = sq.isSecondary ? rgb2 : rgb1;
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

          // Draw rounded neon square
          const radius = Math.min(2.5, sq.size * 0.2);
          ctx.beginPath();
          ctx.roundRect(sq.x, sq.y, sq.size, sq.size, radius);
          ctx.fill();

          // Subtle neon glow when brightly twinkling or near mouse
          if (alpha > 0.6) {
            ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.8})`;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [gridSize, squareSizeRatio, color, secondaryColor, direction, fadeStart, fadeEnd, falloff, minBrightness, twinkleSpeed, twinkleStrength, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
