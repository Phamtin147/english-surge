import React, { useRef, useEffect } from 'react';

export default function BlinkingSquares({
  gridSize = 12,
  squareSizeRatio = 0.38,
  color = '#a855f7', // Pure Uniform Neon Purple
  direction = 'right', // 'right', 'left', 'top', 'bottom', 'radial', 'diagonal'
  fadeStart = 0.15,
  fadeEnd = 0.95,
  falloff = 1.15,
  minBrightness = 0.05,
  twinkleSpeed = 0.75, // Smooth slow breathing speed
  twinkleStrength = 0.88,
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
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

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

    const rgb = parseColor(color);

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

          // Calculate directional base density
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
            const dx = x - width / 2;
            const dy = y - height / 2;
            norm = Math.sqrt(dx * dx + dy * dy) / (width * 0.6);
          }

          const densityFactor = Math.pow(Math.max(0, Math.min(1, (norm - fadeStart) / (fadeEnd - fadeStart))), falloff);
          
          if (Math.random() < densityFactor * 0.8 + 0.04) {
            squares.push({
              x: x + (gridSize - actualSquareSize) / 2,
              y: y + (gridSize - actualSquareSize) / 2,
              size: actualSquareSize,
              phase: Math.random() * Math.PI * 2,
              speed: (0.4 + Math.random() * 0.6) * twinkleSpeed,
              baseAlpha: densityFactor,
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

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];

        // Smooth sinusoidal breathing twinkle (slower & velvety)
        const sineVal = Math.sin(elapsed * sq.speed * 1.3 + sq.phase);
        const twinkle = (sineVal + 1.0) * 0.5;

        let alpha = minBrightness + twinkle * twinkleStrength * sq.baseAlpha;

        // Mouse proximity boost
        const dx = mouse.x - (sq.x + sq.size / 2);
        const dy = mouse.y - (sq.y + sq.size / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const mouseFactor = 1 - dist / mouseRadius;
          alpha = Math.min(1.0, alpha + mouseFactor * 0.65);
        }

        if (alpha > 0.02) {
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

          // Draw micro rounded square
          const radius = Math.min(1.5, sq.size * 0.25);
          ctx.beginPath();
          ctx.roundRect(sq.x, sq.y, sq.size, sq.size, radius);
          ctx.fill();

          if (alpha > 0.65) {
            ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.6})`;
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
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
  }, [gridSize, squareSizeRatio, color, direction, fadeStart, fadeEnd, falloff, minBrightness, twinkleSpeed, twinkleStrength, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
