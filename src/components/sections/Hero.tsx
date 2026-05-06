"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";
import { Cpu, Lock, ChevronRight, ArrowDown, Download } from "lucide-react";
import Image from "next/image";
// Typing effect hook
function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

// Magnetic button component
function MagneticButton({ children, className, href, onClick, download, target, rel }: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  download?: string | boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(e) => onClick?.(e)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={className}
      download={download}
      target={target}
      rel={rel}
    >
      {children}
    </motion.a>
  );
}

// Terminal log lines animation
const bootLines = [
  { text: "[ OK ] Loading identity matrix...", color: "text-green-400" },
  { text: "[ OK ] Cloud security protocols active", color: "text-green-400" },
  { text: "[ OK ] Financial intelligence analyzer ready", color: "text-cyan-400" },
  { text: "[ >> ] Awaiting operator input...", color: "text-yellow-400" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const typedRole = useTypingEffect(personalInfo.roles[roleIndex], 50);
  
  // Mouse parallax for hero visuals
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rx = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const ry = useTransform(mouseY, [-0.5, 0.5], ["-5deg", "5deg"]);

  useEffect(() => {
    // Boot sequence
    if (bootStep < bootLines.length) {
      const t = setTimeout(() => setBootStep((s) => s + 1), 400);
      return () => clearTimeout(t);
    }
  }, [bootStep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Main Content */}
          <div className="max-w-2xl">
            {/* Boot sequence terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex flex-col mb-8 p-3 rounded bg-surface/60 backdrop-blur-md border border-cyan-900/40 font-mono text-xs min-h-[80px] w-full max-w-sm shadow-xl"
            >
              {bootLines.slice(0, bootStep).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${line.color} leading-5`}
                >
                  {line.text}
                </motion.p>
              ))}
            </motion.div>

            {/* Main Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-none"
            >
              {personalInfo.name.split(" ")[0]}
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                {personalInfo.name.split(" ")[1]}
              </motion.span>
            </motion.h1>

            {/* Typing Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-10 mb-6 flex items-center"
            >
              <ChevronRight className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="font-mono text-lg md:text-2xl text-gray-200">
                {typedRole}
                <span className={`ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"} text-cyan-400`}>█</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-gray-400 max-w-lg text-sm md:text-base mb-10 leading-relaxed"
            >
              Architecting secure cloud infrastructure and intelligent deployment pipelines. 
              Bridging the gap between rapid development and{" "}
              <span className="text-cyan-400 font-mono">zero-trust security</span> models.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#projects"
                onClick={scrollToProjects}
                className="group px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-sm uppercase tracking-wider rounded transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]"
              >
                <Cpu className="w-4 h-4" />
                View Pipeline
              </MagneticButton>
              <MagneticButton
                href="#contact"
                onClick={scrollToContact}
                className="group px-6 py-3 border border-white/20 hover:border-cyan-500/50 bg-surface/50 hover:bg-surface text-gray-300 hover:text-white font-mono text-sm uppercase tracking-wider rounded transition-all flex items-center gap-2 shadow-lg"
              >
                <Lock className="w-4 h-4" />
                Establish Uplink
              </MagneticButton>
              <MagneticButton
                href="/ShaileshHegde.pdf"
                download="Shailesh_Hegde_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 font-mono text-sm uppercase tracking-wider rounded transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex items-center gap-3 text-gray-600"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4 text-cyan-500" />
              </motion.div>
              <span className="font-mono text-xs tracking-widest">SCROLL_TO_EXPLORE</span>
            </motion.div>
          </div>

          {/* RIGHT: High Performance Profile Image */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="flex flex-col items-center justify-center relative h-[350px] md:h-[500px] lg:h-[600px] w-full will-change-transform"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative flex items-center justify-center w-full h-full max-w-[280px] md:max-w-[380px] lg:max-w-[420px]">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-30 group will-change-transform w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:aspect-[3/4]"
              >
                {/* Decorative Tech Frame */}
                <div className="absolute inset-0 rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm -rotate-3 transition-transform duration-500 group-hover:rotate-0" />
                <div className="absolute inset-0 rounded-3xl border-2 border-purple-500/30 bg-gradient-to-tl from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rotate-3 transition-transform duration-500 group-hover:rotate-0" />
                
                {/* Image Container */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-surface shadow-[0_0_50px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_80px_rgba(6,182,212,0.3)] transition-all duration-500 flex items-center justify-center">
                  <Image
                    src="/IMG_20260330_205004_223.webp"
                    alt={`${personalInfo.name} Profile`}
                    fill
                    priority
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay scanlines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-50" />
                </div>
                
                {/* Corner Accents */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
              </motion.div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
