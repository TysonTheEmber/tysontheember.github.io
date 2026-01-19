import {useEffect, useRef} from 'react';
import {useSettings} from '@site/src/contexts/SettingsContext';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  stretch: number;
  angle: number;
}

export default function GlobalSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const sparksRef = useRef<Spark[]>([]);
  const {sparksEnabled, animationPreference} = useSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on mobile devices for performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth < 768 ||
                     ('ontouchstart' in window) ||
                     (navigator.maxTouchPoints > 0);
    if (isMobile) return;

    const ctx = canvas.getContext('2d', {alpha: true});
    if (!ctx) return;

    // Set canvas size to cover entire viewport
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create spark particle on click
    const createSpark = (x: number, y: number): Spark => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 5.5;

      return {
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.2 + Math.random() * 1.6,
        opacity: 1,
        life: 0,
        maxLife: 28 + Math.random() * 18,
        stretch: 1,
        angle: 0,
      };
    };

    // Handle click events globally
    const handleClick = (event: MouseEvent) => {
      // Disable sparks if animations are reduced or disabled
      if (!sparksEnabled || animationPreference === 'reduced' || animationPreference === 'none') return;

      // Prevent runaway particle counts
      if (sparksRef.current.length > 140) return;

      const x = event.clientX;
      const y = event.clientY;

      // Create a handful of sparks at click location
      const sparkCount = 6 + Math.floor(Math.random() * 6);
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push(createSpark(x, y));
      }
    };

    document.addEventListener('click', handleClick);

    // Update spark
    const updateSpark = (spark: Spark) => {
      spark.life++;

      // Quick fade out for sparks
      spark.opacity = Math.max(0, 1 - spark.life / spark.maxLife);

      // Apply gravity to sparks
      spark.vy += 0.14;

      // Apply drag
      spark.vx *= 0.99;
      spark.vy *= 0.99;

      spark.x += spark.vx;
      spark.y += spark.vy;

      // Calculate angle and stretch for sparks
      const speed = Math.sqrt(spark.vx * spark.vx + spark.vy * spark.vy);
      spark.stretch = 1.2 + Math.min(speed * 0.45, 2);
      spark.angle = Math.atan2(spark.vy, spark.vx) + Math.PI / 2;
    };

    // Draw spark
    const drawSpark = (spark: Spark) => {
      ctx.save();

      // Translate and rotate based on velocity
      ctx.translate(spark.x, spark.y);
      ctx.rotate(spark.angle);

      const baseAlpha = spark.opacity;
      const glowRadius = spark.size * 2.2;
      const glowRadiusStretched = glowRadius * (spark.stretch * 1.6);
      const coreLength = glowRadiusStretched * 1.2;

      const gradient = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, glowRadius
      );

      // Bright, tight spark with a hot core and quick falloff (warmer/orange)
      gradient.addColorStop(0, `rgba(255, 245, 225, ${baseAlpha})`);
      gradient.addColorStop(0.15, `rgba(255, 225, 185, ${baseAlpha})`);
      gradient.addColorStop(0.35, `rgba(255, 195, 120, ${baseAlpha * 0.85})`);
      gradient.addColorStop(0.55, `rgba(255, 150, 70, ${baseAlpha * 0.55})`);
      gradient.addColorStop(0.7, `rgba(255, 110, 35, ${baseAlpha * 0.28})`);
      gradient.addColorStop(1, `rgba(235, 80, 10, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, glowRadius, glowRadiusStretched, 0, 0, Math.PI * 2);
      ctx.fill();

      // Crisp core streak for a sharper spark feel
      ctx.strokeStyle = `rgba(255, 220, 160, ${baseAlpha})`;
      ctx.lineWidth = Math.max(1, spark.size * 0.65);
      ctx.lineCap = 'round';
      ctx.shadowColor = `rgba(255, 190, 110, ${baseAlpha * 0.35})`;
      ctx.shadowBlur = spark.size * 1.6;
      ctx.beginPath();
      ctx.moveTo(0, -coreLength * 0.6);
      ctx.lineTo(0, coreLength * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const spark = sparksRef.current[i];
        updateSpark(spark);

        // Remove dead sparks
        if (spark.life >= spark.maxLife) {
          sparksRef.current.splice(i, 1);
        } else {
          drawSpark(spark);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sparksEnabled, animationPreference]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999999,
      }}
    />
  );
}
