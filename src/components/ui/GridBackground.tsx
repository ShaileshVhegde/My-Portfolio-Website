"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouse = { x: -1000, y: -1000 };
    let animFrame = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse = { x: e.clientX, y: e.clientY }; });

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellSize = 64;
      const cols = Math.ceil(canvas.width / cellSize) + 1;
      const rows = Math.ceil(canvas.height / cellSize) + 1;

      // Draw grid lines with cursor proximity glow
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellSize;
          const y = j * cellSize;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          const glow = Math.max(0, 1 - dist / maxDist);

          // Horizontal line
          if (j < rows) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            const baseAlpha = 0.06 + glow * 0.25;
            ctx.strokeStyle = `rgba(6,182,212,${baseAlpha})`;
            ctx.lineWidth = glow > 0.3 ? 0.8 : 0.3;
            ctx.stroke();
          }

          // Vertical line
          if (i < cols) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            const baseAlpha = 0.06 + glow * 0.25;
            ctx.strokeStyle = `rgba(6,182,212,${baseAlpha})`;
            ctx.lineWidth = glow > 0.3 ? 0.8 : 0.3;
            ctx.stroke();
          }

          // Glowing intersection dots near cursor
          if (glow > 0.4) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5 * glow, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6,182,212,${glow * 0.8})`;
            ctx.shadowBlur = 8 * glow;
            ctx.shadowColor = "rgba(6,182,212,0.8)";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Animated scan line
      const scanY = ((time * 60) % (canvas.height + 100)) - 50;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, "rgba(6,182,212,0)");
      scanGrad.addColorStop(0.5, "rgba(6,182,212,0.04)");
      scanGrad.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, canvas.width, 60);

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020508]">
      {/* Reactive canvas grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient top glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-cyan-900/30 blur-[140px] rounded-full"
      />

      {/* Bottom right electric glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[700px] h-[500px] bg-blue-900/20 blur-[160px] rounded-full"
      />

      {/* Left purple glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 -left-40 w-[500px] h-[600px] bg-purple-900/15 blur-[150px] rounded-full"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,5,8,0.7)_100%)]" />
    </div>
  );
}
