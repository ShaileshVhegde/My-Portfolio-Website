"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";
import { Cpu, Lock, ChevronRight, ArrowDown } from "lucide-react";
import { LinkedInLogo, GitHubLogo, InstagramLogo, GmailLogo } from "../ui/BrandLogos";

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
function MagneticButton({ children, className, href, onClick }: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
  const [isCoreHovered, setIsCoreHovered] = useState(false);
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

          {/* RIGHT: High Performance Optimized Social Orbit System */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="flex flex-col items-center justify-center relative h-[350px] md:h-[500px] lg:h-[600px] w-full will-change-transform"
          >
            {/* Ambient Background Glow (Optimized) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative flex items-center justify-center w-full h-full max-w-[300px] md:max-w-[500px] lg:max-w-none">
              {/* Radial Glow Trails (Optimized Rotation) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full border border-cyan-500/10 w-[110%] aspect-square max-w-[450px] will-change-transform"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full border border-blue-500/10 border-dashed w-[85%] aspect-square max-w-[350px] will-change-transform"
              />
              
              {/* Central AI Core / DevSecOps Hub */}
              <motion.div
                onMouseEnter={() => setIsCoreHovered(true)}
                onMouseLeave={() => setIsCoreHovered(false)}
                whileHover={{ scale: 1.05 }}
                className="relative z-30 group cursor-pointer will-change-transform"
              >
                <motion.div
                  animate={{ 
                    boxShadow: isCoreHovered 
                      ? "0 0 80px rgba(6,182,212,0.6)" 
                      : "0 0 30px rgba(6,182,212,0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 flex items-center justify-center bg-gradient-to-br from-surface to-charcoal border-2 border-cyan-400/50 rounded-full backdrop-blur-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse" />
                  <div className="absolute inset-2 border border-white/5 rounded-full animate-[spin_8s_linear_infinite]" />
                  <Cpu className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                  
                  {/* Internal scanlines effect (Optimized) */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-10">
                    <div className="w-full h-1 bg-cyan-500 animate-[scan_1.5s_linear_infinite]" />
                  </div>
                </motion.div>
                
                {/* Core Label */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
                  <p className="font-mono text-[8px] lg:text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase">Control_Hub_v2.0</p>
                  <p className="font-mono text-[6px] lg:text-[8px] text-slate-500 tracking-widest mt-1">AI_CORE_ACTIVE</p>
                </div>
              </motion.div>

              {/* Orbiting Social Media Nodes (High-Performance CSS Rotation + Framer Motion) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="relative w-[85%] aspect-square max-w-[350px] will-change-transform"
                >
                  {[
                    { name: "LinkedIn", icon: LinkedInLogo, color: "#0077b5", link: personalInfo.socials.linkedin, angle: 0 },
                    { name: "GitHub", icon: GitHubLogo, color: "#ffffff", link: personalInfo.socials.github, angle: 90 },
                    { name: "Instagram", icon: InstagramLogo, color: "#E4405F", link: personalInfo.socials.instagram, angle: 180 },
                    { name: "Gmail", icon: GmailLogo, color: "#EA4335", link: `mailto:${personalInfo.email}`, angle: 270 },
                  ].map((social) => (
                    <div
                      key={social.name}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                      style={{ transform: `rotate(${social.angle}deg)` }}
                    >
                      <motion.a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        animate={{
                          rotate: -360,
                          scale: isCoreHovered ? 1.1 : 1,
                        }}
                        transition={{
                          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                          scale: { duration: 0.2 }
                        }}
                        whileHover={{ scale: 1.25, filter: "brightness(1.2)" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center justify-center group"
                      >
                        <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-2xl bg-surface/90 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-200 group-hover:border-cyan-500/50 will-change-transform">
                          <div 
                            className={`absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-40 ${isCoreHovered ? 'opacity-20' : ''}`}
                            style={{ backgroundColor: social.color }}
                          />
                          <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 relative z-10">
                            <social.icon />
                          </div>
                        </div>
                        <motion.span 
                          className="mt-2 font-mono text-[8px] lg:text-[10px] text-white/60 tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          {social.name}
                        </motion.span>
                      </motion.a>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Decorative data streams (Lightweight) */}
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-cyan-500/5 animate-[pulse_4s_linear_infinite]"
                  style={{ 
                    width: `${60 + i * 20}%`, 
                    maxWidth: 200 + i * 100, 
                    aspectRatio: '1/1',
                    animationDelay: `${i * 2}s`
                  }}
                />
              ))}
            </div>

            {/* System Statistics Dashboard (Static Layout) */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4 lg:gap-6 z-40">
              {[
                { label: "LINK_STATUS", value: "ESTABLISHED", color: "text-green-400" },
                { label: "SIGNAL_STRENGTH", value: "MAX", color: "text-cyan-400" },
                { label: "UPTIME", value: "100%", color: "text-blue-400" },
              ].map((stat, si) => (
                <div key={stat.label} className="text-center bg-surface/40 backdrop-blur-md px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-white/5 shadow-lg">
                  <p className="font-mono text-[6px] lg:text-[8px] text-slate-500 font-bold tracking-widest mb-1">{stat.label}</p>
                  <p className={`font-mono text-[8px] lg:text-[10px] font-black ${stat.color} tracking-wider`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
