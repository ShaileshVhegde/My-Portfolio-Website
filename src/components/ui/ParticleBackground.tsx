"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(6,182,212,", "rgba(59,130,246,", "rgba(34,197,94,", "rgba(139,92,246,"];

    // Spawn ambient floating particles
    const spawnAmbient = () => {
      if (particlesRef.current.length < 60) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: 0,
          maxLife: 200 + Math.random() * 300,
          size: 1 + Math.random() * 2,
          color,
        });
      }
    };

    // Spawn cursor trail particles
    const spawnTrail = (x: number, y: number) => {
      if (particlesRef.current.length < 120) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 0,
          maxLife: 30 + Math.random() * 40,
          size: 1 + Math.random() * 2.5,
          color,
        });
      }
    };

    let lastMouse = { x: -1000, y: -1000 };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      if (Math.sqrt(dx * dx + dy * dy) > 5) {
        spawnTrail(e.clientX, e.clientY);
        lastMouse = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnAmbient();

      // Draw node connections near mouse
      const nearby = particlesRef.current.filter((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        return Math.sqrt(dx * dx + dy * dy) < 150;
      });
      nearby.forEach((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = (1 - dist / 150) * 0.3;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });

      // Connect nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.2
          ? lifeRatio / 0.2
          : lifeRatio > 0.8
          ? (1 - lifeRatio) / 0.2
          : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha * 0.7})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `${p.color}0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        return p.life < p.maxLife;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
