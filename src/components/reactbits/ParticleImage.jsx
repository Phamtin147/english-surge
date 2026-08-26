import React, { useRef, useEffect, useState } from 'react';

export default function ParticleImage({
  imageSrc,
  width = 280,
  height = 280,
  particleSize = 2,
  gap = 3,
  mouseRadius = 60,
  force = 8,
  particleColor = '#818cf8',
  useOriginalColors = false,
  className = '',
}) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: mouseRadius };

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.color = color || particleColor;
        this.size = particleSize;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.88;
        this.spring = 0.08;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
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

        // Return to origin (spring physics)
        const dxOrigin = this.originX - this.x;
        const dyOrigin = this.originY - this.y;
        this.vx += dxOrigin * this.spring;
        this.vy += dyOrigin * this.spring;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const initParticles = (img) => {
      canvas.width = width;
      canvas.height = height;

      // Draw image to offscreen/canvas temporarily to sample pixels
      ctx.clearRect(0, 0, width, height);

      // Fit image centered
      const hRatio = width / img.width;
      const vRatio = height / img.height;
      const ratio = Math.min(hRatio, vRatio) * 0.85;
      const centerShiftX = (width - img.width * ratio) / 2;
      const centerShiftY = (height - img.height * ratio) / 2;

      ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);

      const imgData = ctx.getImageData(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);

      particles = [];
      const data = imgData.data;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 80) {
            let color = particleColor;
            if (useOriginalColors) {
              const r = data[index];
              const g = data[index + 1];
              const b = data[index + 2];
              color = `rgba(${r},${g},${b},${alpha / 255})`;
            }
            particles.push(new Particle(x, y, color));
          }
        }
      }
      setIsLoaded(true);
    };

    const image = new Image();
    image.crossOrigin = 'anonymous';

    // If no imageSrc provided, generate default SVG Surge lightning bolt
    if (!imageSrc) {
      const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#818cf8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
      const blob = new Blob([defaultSvg], { type: 'image/svg+xml' });
      image.src = URL.createObjectURL(blob);
    } else {
      image.src = imageSrc;
    }

    image.onload = () => {
      initParticles(image);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
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

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [imageSrc, width, height, particleSize, gap, mouseRadius, force, particleColor, useOriginalColors]);

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-crosshair transition-opacity duration-500"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  );
}
