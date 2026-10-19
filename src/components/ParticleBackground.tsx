import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999, active: false };
    const particles: Particle[] = [];
    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let running = true;
    let connectionDist = 120;
    let connectionDistSq = connectionDist * connectionDist;
    let mouseDist = 140;
    let mouseDistSq = mouseDist * mouseDist;
    let cellSize = connectionDist;
    let cols = 1;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const particleCountFor = (w: number, h: number) => {
      if (prefersReducedMotion) return 0;
      const area = w * h;
      // Scale with viewport; keep counts low for smooth 60fps
      if (area < 500_000) return 35;
      if (area < 1_200_000) return 50;
      return 65;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      connectionDist = width < 768 ? 100 : 130;
      connectionDistSq = connectionDist * connectionDist;
      mouseDist = width < 768 ? 120 : 150;
      mouseDistSq = mouseDist * mouseDist;
      cellSize = connectionDist;
      cols = Math.max(1, Math.ceil(width / cellSize));

      const target = particleCountFor(width, height);
      while (particles.length < target) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.4 + 0.35,
        });
      }
      if (particles.length > target) particles.length = target;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibility);

    // Spatial hash: only check nearby cells for links (O(n) instead of O(n²))
    const buildGrid = () => {
      const grid = new Map<number, number[]>();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const key =
          ((p.y / cellSize) | 0) * cols + ((p.x / cellSize) | 0);
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }
      return grid;
    };

    const neighborOffsets = [
      0, 1, -1, cols, cols + 1, cols - 1, -cols, -cols + 1, -cols - 1,
    ];

    const draw = () => {
      if (!running) return;

      ctx.clearRect(0, 0, width, height);

      // Soft vignette wash so particles feel atmospheric
      const wash = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.7,
      );
      wash.addColorStop(0, 'rgba(99,102,241,0.04)');
      wash.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Soft wrap instead of bounce — less jitter
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseDistSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseDist) * 0.9;
            p.vx += (dx / dist) * force * 0.08;
            p.vy += (dy / dist) * force * 0.08;
          }
        }

        // Dampen so mouse push doesn't accelerate forever
        p.vx *= 0.99;
        p.vy *= 0.99;
        const speed = p.vx * p.vx + p.vy * p.vy;
        if (speed < 0.01) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        } else if (speed > 0.5) {
          const s = Math.sqrt(speed);
          p.vx = (p.vx / s) * 0.7;
          p.vy = (p.vy / s) * 0.7;
        }
      }

      const grid = buildGrid();

      // Connections — batch stroke style, squared distance
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const baseKey =
          ((a.y / cellSize) | 0) * cols + ((a.x / cellSize) | 0);

        for (const offset of neighborOffsets) {
          const bucket = grid.get(baseKey + offset);
          if (!bucket) continue;
          for (const j of bucket) {
            if (j <= i) continue;
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;
            if (distSq >= connectionDistSq) continue;
            const t = 1 - Math.sqrt(distSq) / connectionDist;
            ctx.strokeStyle = `rgba(129,140,248,${t * 0.45})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mdx = a.x - mouse.x;
          const mdy = a.y - mouse.y;
          const mdistSq = mdx * mdx + mdy * mdy;
          if (mdistSq < mouseDistSq) {
            const t = 1 - Math.sqrt(mdistSq) / mouseDist;
            ctx.strokeStyle = `rgba(199,210,254,${t * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Particles — one pass, soft glow via larger translucent disc
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha * 0.25})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165,180,252,${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
