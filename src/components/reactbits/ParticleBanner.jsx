import React, { useRef, useEffect, useState } from 'react';

export default function ParticleBanner({
  height = 320,
  particleCount = 750,
  particleColor = '#818cf8',
  connectColor = 'rgba(99, 102, 241, 0.15)',
  connectDistance = 85,
  mouseRadius = 110,
  force = 12,
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
    const mouse = { x: null, y: null, radius: mouseRadius };

    const updateDimensions = () => {
      const width = container.offsetWidth;
      canvas.width = width;
      canvas.height = height;
      initParticles(width, height);
    };

    class Particle {
      constructor(x, y, isStaticShape = false) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.size = isStaticShape ? Math.random() * 2 + 1.5 : Math.random() * 2 + 1;
        this.isStaticShape = isStaticShape;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.friction = 0.92;
        this.spring = 0.05;
        this.color = isStaticShape ? '#a5b4fc' : (Math.random() > 0.5 ? '#818cf8' : '#38bdf8');
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update(width, height) {
        // Mouse repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius && distance > 0) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const forceStrength = (mouse.radius - distance) / mouse.radius;
            const repulsion = forceStrength * force;

            this.vx -= forceDirectionX * repulsion;
            this.vy -= forceDirectionY * repulsion;
          }
        }

        if (this.isStaticShape) {
          // Attract back to original shape coordinates
          const dxOrigin = this.originX - this.x;
          const dyOrigin = this.originY - this.y;
          this.vx += dxOrigin * this.spring;
          this.vy += dyOrigin * this.spring;
        } else {
          // Floating ambient particles wrap edges
          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const initParticles = (width, height) => {
      particles = [];

      // 1. Generate Center Lightning & Text Emblem shape in particle coordinates
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');

      // Draw Surge Logo & Text on offscreen canvas to sample
      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = '#ffffff';

      // Draw Center Lightning Bolt Shape
      const centerX = width / 2;
      const centerY = height / 2 - 15;
      const scale = Math.min(width / 600, 1.2);

      offCtx.save();
      offCtx.translate(centerX, centerY);
      offCtx.scale(scale, scale);

      // Lightning path
      offCtx.beginPath();
      offCtx.moveTo(0, -60);
      offCtx.lineTo(-45, 10);
      offCtx.lineTo(-5, 10);
      offCtx.lineTo(-20, 60);
      offCtx.lineTo(45, -10);
      offCtx.lineTo(5, -10);
      offCtx.closePath();
      offCtx.fill();

      // Bold text underneath
      offCtx.font = '900 24px Outfit, system-ui, sans-serif';
      offCtx.textAlign = 'center';
      offCtx.fillText('ENGLISH SURGE', 0, 95);
      offCtx.restore();

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const gap = width < 768 ? 5 : 4;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 120) {
            particles.push(new Particle(x, y, true));
          }
        }
      }

      // 2. Add floating ambient ambient particles filling the full width
      const ambientCount = Math.floor((width / 1200) * 120);
      for (let i = 0; i < ambientCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(new Particle(x, y, false));
      }

      setIsReady(true);
    };

    updateDimensions();

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with luminous threads
      for (let a = 0; a < particles.length; a += 2) {
        for (let b = a + 1; b < particles.length; b += 2) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            const alpha = (1 - dist / connectDistance) * 0.22;
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update all particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update(width, height);
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
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      updateDimensions();
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
  }, [height, particleCount, particleColor, connectColor, connectDistance, mouseRadius, force]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-slate-950 p-0 select-none shadow-2xl shadow-indigo-950/40 ${className}`}
      style={{ minHeight: `${height}px` }}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-indigo-500/10 via-transparent to-transparent" />

      {/* Full-width Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair relative z-10 transition-opacity duration-700"
        style={{ opacity: isReady ? 1 : 0, height: `${height}px` }}
      />

      {/* Floating Interactive Badge at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-md text-[11px] text-indigo-300 font-medium">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        <span>Rê chuột trên toàn dải Canvas để tán xạ các hạt Particle toàn màn hình!</span>
      </div>
    </div>
  );
}
