import React, { useRef, useEffect, useState } from 'react';

export default function ParticleText({
  text = 'SURGE.',
  height = 300,
  particleSize = 2.4,
  particleGap = 4,
  mouseRadius = 110,
  colors = ['#38bdf8', '#ec4899', '#a855f7', '#34d399', '#818cf8'],
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let particles = [];
    const mouse = { x: -1000, y: -1000, radius: mouseRadius };

    class Particle {
      constructor(x, y, color) {
        this.x = x + (Math.random() - 0.5) * 50;
        this.y = y + (Math.random() - 0.5) * 50;
        this.originX = x;
        this.originY = y;
        this.size = particleSize;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.friction = 0.88;
        this.ease = 0.08;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Spherical shockwave repulsion around cursor
        const dxMouse = this.x - mouse.x;
        const dyMouse = this.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius && distMouse > 0) {
          const angle = Math.atan2(dyMouse, dxMouse);
          const force = (mouse.radius - distMouse);
          this.vx += Math.cos(angle) * force * 0.28;
          this.vy += Math.sin(angle) * force * 0.28;
        }

        // Spring return to original grid coordinate
        const dxOrigin = this.originX - this.x;
        const dyOrigin = this.originY - this.y;
        this.vx += dxOrigin * this.ease;
        this.vy += dyOrigin * this.ease;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      const width = container.offsetWidth;
      canvas.width = width;
      canvas.height = height;

      // Render text offscreen to sample pixel positions
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');

      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = '#ffffff';

      // Auto responsive font size
      const fontSize = Math.min(Math.floor(width / (text.length * 0.65)), 120);
      offCtx.font = `900 ${fontSize}px Outfit, Plus Jakarta Sans, system-ui, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      particles = [];
      const gap = particleGap;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            // Pick color along horizontal x axis or patterned
            const colorIdx = Math.floor((x / width) * colors.length) % colors.length;
            const color = colors[colorIdx];
            particles.push(new Particle(x, y, color));
          }
        }
      }

      setIsReady(true);
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [text, height, particleSize, particleGap, mouseRadius, colors]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-indigo-500/20 bg-slate-950 select-none shadow-2xl shadow-indigo-950/40 ${className}`}
      style={{ minHeight: `${height}px` }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair relative z-10 transition-opacity duration-700"
        style={{ opacity: isReady ? 1 : 0, height: `${height}px` }}
      />

      {/* Floating Interactive Badge at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md text-[11px] text-indigo-300 font-medium">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Rê chuột vào chữ để tạo sóng xung kích phân rã hạt Particle!</span>
      </div>
    </div>
  );
}
