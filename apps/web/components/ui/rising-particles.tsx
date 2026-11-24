'use client';

import React, { useEffect, useRef } from 'react';

export interface RisingParticlesProps {
  /** Number of particles floating on screen */
  particleCount?: number;
  /** Speed multiplier for upward drift */
  speed?: number;
  /** Minimum particle size in pixels */
  minSize?: number;
  /** Maximum particle size in pixels */
  maxSize?: number;
  /** Array of hex or rgba color strings for particles */
  particleColors?: string[];
  /** Whether to render a soft glowing aura around each particle */
  glow?: boolean;
  /** Blur radius multiplier for the halo */
  glowBlur?: number;
  /** Opacity factor for the glowing halo (lower = less bright halo) */
  haloOpacity?: number;
  /** Maximum horizontal sway range in pixels */
  swayAmplitude?: number;
  /** Whether opacity twinkles/pulses softly like a firefly */
  twinkle?: boolean;
  /** Interactive reaction to mouse movement */
  moveParticlesOnHover?: boolean;
  /** Radius around cursor that affects particles */
  hoverRadius?: number;
  /** Custom CSS classes for container */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

const DEFAULT_FIREFLY_COLORS = [
  '#facc15', // Sunny golden yellow
  '#f59e0b', // Warm amber
  '#fbbf24', // Amber gold
  '#f97316', // Warm firefly orange
  '#eab308', // Radiant yellow
  '#ea580c', // Deep amber orange
];

function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) || 245;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 158;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 11;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function RisingParticles({
  particleCount = 45,
  speed = 0.75,
  minSize = 1.8,
  maxSize = 4.2,
  particleColors = DEFAULT_FIREFLY_COLORS,
  glow = true,
  glowBlur = 2.2,
  haloOpacity = 0.22,
  swayAmplitude = 25,
  twinkle = true,
  moveParticlesOnHover = true,
  hoverRadius = 120,
  className = '',
  style,
}: RisingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let isVisible = true;

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const createParticle = (spawnAtBottom = false): Particle => {
      const color = particleColors[Math.floor(Math.random() * particleColors.length)] || '#22c55e';
      const size = minSize + Math.random() * (maxSize - minSize);
      const startX = Math.random() * (width || window.innerWidth);
      const startY = spawnAtBottom
        ? (height || window.innerHeight) + Math.random() * 30
        : Math.random() * (height || window.innerHeight);

      return {
        x: startX,
        y: startY,
        baseX: startX,
        size,
        speedY: (0.35 + Math.random() * 0.75) * speed,
        swaySpeed: 0.008 + Math.random() * 0.015,
        swayAmp: 10 + Math.random() * swayAmplitude,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.6,
        baseOpacity: 0.35 + Math.random() * 0.5,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        pulsePhase: Math.random() * Math.PI * 2,
        color,
      };
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(particleCount, Math.floor((width * height) / 18000) || particleCount);
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(false));
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        initParticles();
      }
    };

    let tick = 0;

    const render = () => {
      if (!isVisible) return;
      tick++;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Upward float
        p.y -= p.speedY;

        // 2. Horizontal gentle sine sway (organic firefly floating motion)
        p.swayOffset += p.swaySpeed;
        const targetX = p.baseX + Math.sin(p.swayOffset) * p.swayAmp;
        p.x += (targetX - p.x) * 0.1;

        // 3. Subtle mouse interaction (drifts gently away from pointer)
        if (moveParticlesOnHover && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < hoverRadius && dist > 0) {
            const force = (1 - dist / hoverRadius) * 2;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // 4. Firefly breathing / twinkle
        if (twinkle) {
          p.pulsePhase += p.pulseSpeed;
          p.opacity = Math.max(
            0.15,
            p.baseOpacity + Math.sin(p.pulsePhase) * 0.35
          );
        }

        // 5. Draw glowing particle
        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (glow) {
          // Subtle, delicate radial halo with reduced brightness
          const glowRadius = p.size * glowBlur;
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glowRadius
          );
          gradient.addColorStop(0, hexToRgba(p.color, haloOpacity));
          gradient.addColorStop(0.45, hexToRgba(p.color, haloOpacity * 0.35));
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Crisp luminous inner mote
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // 6. Recycle when floating out of top boundary
        if (p.y < -30) {
          particles[i] = createParticle(true);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [
    particleCount,
    speed,
    minSize,
    maxSize,
    particleColors,
    glow,
    glowBlur,
    haloOpacity,
    swayAmplitude,
    twinkle,
    moveParticlesOnHover,
    hoverRadius,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none overflow-hidden select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default RisingParticles;
