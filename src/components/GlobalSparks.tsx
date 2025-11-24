import {useEffect, useRef} from 'react';

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('GlobalSparks: Canvas ref not available');
      return;
    }

    const ctx = canvas.getContext('2d', {alpha: true});
    if (!ctx) {
      console.log('GlobalSparks: Could not get 2D context');
      return;
    }

    console.log('GlobalSparks: Initialized successfully');

    // Set canvas size to cover entire viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create spark particle on click
    const createSpark = (x: number, y: number): Spark => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 5;

      return {
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        opacity: 1,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        stretch: 1,
        angle: 0,
      };
    };

    // Handle click events globally
    const handleClick = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      console.log('GlobalSparks: Click detected at', x, y);

      // Create 8-15 sparks at click location
      const sparkCount = 8 + Math.floor(Math.random() * 8);
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push(createSpark(x, y));
      }
      console.log('GlobalSparks: Created', sparkCount, 'sparks. Total:', sparksRef.current.length);
    };

    document.addEventListener('click', handleClick);

    // Update spark
    const updateSpark = (spark: Spark) => {
      spark.life++;

      // Quick fade out for sparks
      spark.opacity = Math.max(0, 1 - spark.life / spark.maxLife);

      // Apply gravity to sparks
      spark.vy += 0.15;

      // Apply drag
      spark.vx *= 0.96;
      spark.vy *= 0.96;

      spark.x += spark.vx;
      spark.y += spark.vy;

      // Calculate angle and stretch for sparks
      const speed = Math.sqrt(spark.vx * spark.vx + spark.vy * spark.vy);
      spark.stretch = 1 + Math.min(speed * 0.3, 1.5);
      spark.angle = Math.atan2(spark.vy, spark.vx) + Math.PI / 2;
    };

    // Draw spark
    const drawSpark = (spark: Spark) => {
      ctx.save();

      // Translate and rotate based on velocity
      ctx.translate(spark.x, spark.y);
      ctx.rotate(spark.angle);

      const baseAlpha = spark.opacity;
      const glowRadius = spark.size * 3;
      const glowRadiusStretched = glowRadius * spark.stretch;

      const gradient = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, glowRadius
      );

      // Bright yellow-white spark
      gradient.addColorStop(0, `rgba(255, 255, 220, ${baseAlpha})`);
      gradient.addColorStop(0.2, `rgba(255, 240, 180, ${baseAlpha * 0.9})`);
      gradient.addColorStop(0.4, `rgba(255, 200, 100, ${baseAlpha * 0.7})`);
      gradient.addColorStop(0.6, `rgba(255, 160, 60, ${baseAlpha * 0.4})`);
      gradient.addColorStop(0.8, `rgba(255, 120, 30, ${baseAlpha * 0.2})`);
      gradient.addColorStop(1, `rgba(255, 80, 0, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, glowRadius, glowRadiusStretched, 0, 0, Math.PI * 2);
      ctx.fill();

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
  }, []);

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
        zIndex: 9999,
      }}
    />
  );
}
