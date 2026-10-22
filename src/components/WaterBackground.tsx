import React, { useEffect, useRef } from 'react';

interface WaterBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobbleSpeed: number;
  wobbleDistance: number;
  wobbleOffset: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export const WaterBackground: React.FC<WaterBackgroundProps> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    // Initialize bubbles / water light particles
    const bubbleCount = Math.min(36, Math.floor((width * height) / 25000) + 16);
    const bubbles: Bubble[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      const radius = 2 + Math.random() * 5.5;
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseRadius: radius,
        speedY: 0.25 + Math.random() * 0.65,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0.15 + Math.random() * 0.45,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleDistance: 10 + Math.random() * 20,
        wobbleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Interactive ripples
    const ripples: Ripple[] = [];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        if (ripples.length < 10) {
          ripples.push({
            x,
            y,
            radius: 4,
            maxRadius: 60 + Math.random() * 40,
            opacity: 0.5,
            speed: 1.2 + Math.random() * 0.8,
          });
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let time = 0;

    const render = () => {
      if (isVisible) {
        time += 0.018;
        ctx.clearRect(0, 0, width, height);

        // 1. Draw animated water flow wave caustics
        // Multiple sine waves representing moving water currents
        const waveCount = 3;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const wavePhase = time * (0.8 + w * 0.4) + w * 1.5;
          const amplitude = 12 + w * 7;
          const wavelength = 240 + w * 90;
          const baseHeight = 50 + w * 30;

          ctx.moveTo(0, 0);
          for (let x = 0; x <= width; x += 15) {
            const waveY =
              baseHeight +
              Math.sin(x / wavelength + wavePhase) * amplitude +
              Math.cos((x / (wavelength * 0.7)) - wavePhase * 0.5) * (amplitude * 0.5);
            ctx.lineTo(x, waveY);
          }
          ctx.lineTo(width, 0);
          ctx.closePath();

          // Soft translucent water gradient for each wave
          const waveGrad = ctx.createLinearGradient(0, 0, 0, baseHeight + amplitude * 1.5);
          if (w === 0) {
            waveGrad.addColorStop(0, 'rgba(6, 182, 212, 0.12)'); // cyan-500
            waveGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
          } else if (w === 1) {
            waveGrad.addColorStop(0, 'rgba(56, 189, 248, 0.09)'); // sky-400
            waveGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
          } else {
            waveGrad.addColorStop(0, 'rgba(20, 184, 166, 0.07)'); // teal-500
            waveGrad.addColorStop(1, 'rgba(20, 184, 166, 0.0)');
          }
          ctx.fillStyle = waveGrad;
          ctx.fill();
        }

        // 2. Mid-section horizontal ambient water swells (slow undulating bands)
        for (let b = 1; b <= 2; b++) {
          const swellY = (height / 3) * b;
          const swellGrad = ctx.createRadialGradient(
            width * (0.5 + 0.3 * Math.sin(time * 0.4 + b)),
            swellY + Math.cos(time * 0.5 + b) * 40,
            20,
            width * (0.5 + 0.3 * Math.sin(time * 0.4 + b)),
            swellY + Math.cos(time * 0.5 + b) * 40,
            width * 0.45
          );
          swellGrad.addColorStop(0, 'rgba(14, 165, 233, 0.07)');
          swellGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.03)');
          swellGrad.addColorStop(1, 'rgba(2, 24, 43, 0.0)');

          ctx.fillStyle = swellGrad;
          ctx.fillRect(0, swellY - 180, width, 360);
        }

        // 3. Draw moving translucent water bubbles / light droplets
        for (let i = 0; i < bubbles.length; i++) {
          const b = bubbles[i];
          b.y -= b.speedY;
          b.x += Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * 0.5 + b.speedX;

          // Wrap bubbles around smoothly
          if (b.y < -20) {
            b.y = height + 20;
            b.x = Math.random() * width;
          }
          if (b.x < -20) b.x = width + 20;
          if (b.x > width + 20) b.x = -20;

          // Draw bubble with luminous highlight
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

          const bubbleGrad = ctx.createRadialGradient(
            b.x - b.radius * 0.3,
            b.y - b.radius * 0.3,
            b.radius * 0.1,
            b.x,
            b.y,
            b.radius
          );
          bubbleGrad.addColorStop(0, `rgba(255, 255, 255, ${b.opacity * 0.95})`);
          bubbleGrad.addColorStop(0.4, `rgba(165, 243, 252, ${b.opacity * 0.7})`);
          bubbleGrad.addColorStop(0.85, `rgba(6, 182, 212, ${b.opacity * 0.3})`);
          bubbleGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

          ctx.fillStyle = bubbleGrad;
          ctx.fill();

          // Delicate specular bubble edge
          ctx.strokeStyle = `rgba(224, 242, 254, ${b.opacity * 0.5})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // 4. Draw interactive water ripples
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += rip.speed;
          rip.opacity -= 0.012;

          if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
            ripples.splice(r, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(103, 232, 249, ${rip.opacity * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Second inner echo ripple ring
          if (rip.radius > 15) {
            ctx.beginPath();
            ctx.arc(rip.x, rip.y, rip.radius - 12, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${rip.opacity * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-b from-[#02182b] via-[#052b46] via-[#083a5e] to-[#011422] text-zinc-100 ${className}`}
    >
      {/* Pristine Top Water Transition Line (gentle luminous water meniscus right under the hero) */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-cyan-400/30 via-sky-300/80 via-white/90 via-sky-300/80 to-cyan-400/30 shadow-[0_2px_12px_rgba(34,211,238,0.5)] z-20 pointer-events-none" />

      {/* Subtle top water surface caustic glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-500/15 via-sky-500/5 to-transparent pointer-events-none z-10" />

      {/* Floating Animated Canvas for liquid movement */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      />

      {/* Content wrapper with relative positioning above canvas */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
