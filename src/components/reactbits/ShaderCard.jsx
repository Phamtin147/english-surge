import React, { useRef, useEffect, useState } from 'react';

export function ShaderBackground({
  color1 = '#7c3aed', // Purple
  color2 = '#c026d3', // Magenta / Electric Violet
  color3 = '#f43f5e', // Hot pink / Coral
  speed = 1.0,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 2D context has ZERO context limits in browsers (never crashes, never turns white)
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let startTime = performance.now();
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const parseRGB = (hex) => {
      let c = String(hex).replace('#', '');
      if (c.length === 3) c = c.split('').map((x) => x + x).join('');
      const num = parseInt(c, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };

    const rgb1 = parseRGB(color1);
    const rgb2 = parseRGB(color2);
    const rgb3 = parseRGB(color3);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(rect.width * dpr, 100);
      canvas.height = Math.max(rect.height * dpr, 100);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001 * speed;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Deep dark slate background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Procedural rising flame nodes (bottom-right biased)
      const numNodes = 7;
      for (let i = 0; i < numNodes; i++) {
        const offset = i * 0.9;
        const waveX = Math.sin(elapsed * 1.2 + offset) * 35 + Math.cos(elapsed * 0.8 + offset * 2) * 20;
        const waveY = ((elapsed * 55 + i * 45) % (height + 100)) - 50;

        // Position nodes starting from bottom and right
        const baseX = width * 0.65 + (i % 3) * 35 - 30;
        const baseY = height - waveY;

        let nodeX = baseX + waveX;
        let nodeY = baseY;

        // Mouse repulsion / attraction
        const dx = mouse.x - nodeX;
        const dy = mouse.y - nodeY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          nodeX -= (dx / dist) * force * 40;
          nodeY -= (dy / dist) * force * 40;
        }

        // Flame vertical dissipation radius
        const verticalFactor = Math.max(0, Math.min(1, (height - nodeY) / height));
        const radius = Math.max(30, (85 - i * 6) * (1 - verticalFactor * 0.45));
        const alpha = Math.max(0, (0.55 - verticalFactor * 0.35));

        const rgb = i % 2 === 0 ? rgb1 : (i % 3 === 0 ? rgb3 : rgb2);

        // Draw soft glowing flame plume
        const grad = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, radius);
        grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
        grad.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.45})`);
        grad.addColorStop(1, 'rgba(3, 7, 18, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Vignette gradient to keep typography 100% crisp
      const vigGrad = ctx.createLinearGradient(0, 0, 0, height);
      vigGrad.addColorStop(0, 'rgba(3, 7, 18, 0.82)');
      vigGrad.addColorStop(0.4, 'rgba(3, 7, 18, 0.45)');
      vigGrad.addColorStop(1, 'rgba(3, 7, 18, 0.25)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [color1, color2, color3, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[inherit] bg-slate-950 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

export default function ShaderCard({
  children,
  className = '',
  color1 = '#7c3aed',
  color2 = '#c026d3',
  color3 = '#f43f5e',
  speed = 1.0,
  hoverGlow = true,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950 transition-all duration-300 ${
        isHovered && hoverGlow
          ? 'border-indigo-400/60 shadow-2xl shadow-indigo-950/60 scale-[1.01]'
          : 'shadow-xl'
      } ${className}`}
      {...props}
    >
      <ShaderBackground color1={color1} color2={color2} color3={color3} speed={speed} />
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
}
