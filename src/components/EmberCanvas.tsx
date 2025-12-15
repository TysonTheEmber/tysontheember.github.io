import {useEffect, useRef} from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number;
  life: number;
  maxLife: number;
  layer: number;
  hue: number;
  swayOffset: number;
  swaySpeed: number;
  stretch: number;
  angle: number;
}

interface EmberCanvasProps {
  className?: string;
}

export default function EmberCanvas({className}: EmberCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const windRef = useRef({x: 0, y: 0, targetX: 0, targetY: 0});
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on mobile devices for performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth < 768 ||
                     ('ontouchstart' in window) ||
                     (navigator.maxTouchPoints > 0);
    if (isMobile) {
      console.log('EmberCanvas: Disabled on mobile device');
      return;
    }

    const ctx = canvas.getContext('2d', {alpha: true});
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      // Reset transform before scaling so repeated resizes don't compound scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simplified Perlin-like noise using sine waves
    const noise = (x: number, y: number): number => {
      return (
        Math.sin(x * 0.01 + y * 0.02) * 0.5 +
        Math.sin(x * 0.02 - y * 0.01) * 0.3 +
        Math.sin(x * 0.015 + y * 0.015) * 0.2
      );
    };

    // Create particle
    const createParticle = (): Particle => {
      const rect = canvas.getBoundingClientRect();
      const layer = Math.random();

      // Adjust size based on layer for depth effect
      let baseSize: number;
      if (layer < 0.33) {
        baseSize = 1.5 + Math.random() * 1.5; // Background: smaller
      } else if (layer < 0.66) {
        baseSize = 2.5 + Math.random() * 2; // Midground: medium
      } else {
        baseSize = 3.5 + Math.random() * 3; // Foreground: larger
      }

      return {
        x: Math.random() * rect.width,
        y: rect.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(0.3 + Math.random() * 0.3) * (0.3 + layer * 0.7),
        size: baseSize,
        baseSize: baseSize,
        opacity: 0,
        life: 0,
        maxLife: 400 + Math.random() * 300,
        layer: layer,
        hue: 15 + Math.random() * 10,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.012,
        stretch: 1,
        angle: 0,
      };
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        const particle = createParticle();
        particle.y = Math.random() * canvas.getBoundingClientRect().height;
        particle.life = Math.random() * particle.maxLife;
        particlesRef.current.push(particle);
      }
    };

    initParticles();

    // Update wind with smooth transitions
    const updateWind = (time: number) => {
      const wind = windRef.current;

      // Change wind target every 8-12 seconds
      if (time % 10000 < 16) {
        wind.targetX = (Math.random() - 0.5) * 2;
        wind.targetY = (Math.random() - 0.5) * 0.5;
      }

      // Smooth interpolation
      wind.x += (wind.targetX - wind.x) * 0.01;
      wind.y += (wind.targetY - wind.y) * 0.01;
    };

    // Update particle
    const updateParticle = (particle: Particle, time: number) => {
      const rect = canvas.getBoundingClientRect();

      particle.life++;

      // Fade in and out with size scaling
      if (particle.life < 20) {
        particle.opacity = particle.life / 20;
      } else if (particle.life > particle.maxLife - 30) {
        particle.opacity = (particle.maxLife - particle.life) / 30;
        // Shrink as particle dies
        const deathProgress = (particle.maxLife - particle.life) / 30;
        particle.size = particle.baseSize * deathProgress;
      } else {
        particle.opacity = 0.6 + Math.random() * 0.2;
        particle.size = particle.baseSize; // Maintain original size during normal life
      }

      // Apply turbulence using noise (stronger for background layers)
      const layerFactor = 1 - particle.layer * 0.3; // Background moves more
      const noiseValue = noise(particle.x + time * 0.05, particle.y + time * 0.025);
      const turbulenceX = noiseValue * 0.2 * layerFactor;
      const turbulenceY = Math.sin(time * 0.0005 + particle.swayOffset) * 0.1;

      // Apply wind force
      const wind = windRef.current;
      particle.vx += (wind.x * 0.02 + turbulenceX * 0.05) * layerFactor;
      particle.vy += (wind.y * 0.02 + turbulenceY * 0.02) * layerFactor;

      // Sway motion
      particle.x += Math.sin(time * particle.swaySpeed + particle.swayOffset) * 0.15 * layerFactor;

      // Apply velocity with drag
      particle.vx *= 0.99;
      particle.vy *= 0.997;

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Rising force (buoyancy)
      particle.vy -= 0.006;

      // Calculate stretch based on velocity (subtle motion blur effect)
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      particle.stretch = 1 + Math.min(speed * 0.5, 0.8); // Max stretch of 1.8x

      // Calculate angle based on velocity direction
      particle.angle = Math.atan2(particle.vy, particle.vx) + Math.PI / 2;

      // Reset if out of bounds or dead
      if (particle.y < -20 || particle.life >= particle.maxLife ||
          particle.x < -20 || particle.x > rect.width + 20) {
        const newParticle = createParticle();
        Object.assign(particle, newParticle);
      }
    };

    // Draw particle with realistic ember appearance
    const drawParticle = (particle: Particle) => {
      ctx.save();

      // Translate and rotate based on velocity
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);

      // Calculate alpha based on layer (foreground brighter)
      const baseAlpha = particle.opacity * (0.6 + particle.layer * 0.4);

      // Single smooth gradient from hot center to cool edge
      const glowRadius = particle.size * 3.5;
      const glowRadiusStretched = glowRadius * particle.stretch;

      const gradient = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, glowRadius
      );

      // Hot white-yellow center
      gradient.addColorStop(0, `rgba(255, 245, 215, ${baseAlpha})`);
      gradient.addColorStop(0.1, `rgba(255, 220, 180, ${baseAlpha * 0.95})`);
      gradient.addColorStop(0.25, `rgba(255, 180, 120, ${baseAlpha * 0.85})`);

      // Warm orange middle
      gradient.addColorStop(0.4, `rgba(255, 140, 70, ${baseAlpha * 0.7})`);
      gradient.addColorStop(0.55, `rgba(255, 100, 40, ${baseAlpha * 0.5})`);

      // Deep orange-red outer
      gradient.addColorStop(0.7, `rgba(235, 70, 25, ${baseAlpha * 0.3})`);
      gradient.addColorStop(0.82, `rgba(200, 50, 15, ${baseAlpha * 0.15})`);
      gradient.addColorStop(0.92, `rgba(160, 35, 10, ${baseAlpha * 0.05})`);
      gradient.addColorStop(1, `rgba(120, 20, 5, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, glowRadius, glowRadiusStretched, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = (timestamp: number) => {
      const rect = canvas.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current = timestamp;
      updateWind(timestamp);

      // Sort particles by layer for proper depth
      particlesRef.current.sort((a, b) => a.layer - b.layer);

      // Update and draw all particles
      for (const particle of particlesRef.current) {
        updateParticle(particle, timestamp);
        drawParticle(particle);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% + 4rem)',
        pointerEvents: 'none',
      }}
    />
  );
}
