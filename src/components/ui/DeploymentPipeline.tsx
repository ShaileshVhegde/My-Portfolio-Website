"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const nodes = [
  { id: "hero", label: "SOURCE", sublabel: "Commit & Code", offset: "10%" },
  { id: "about", label: "BUILD", sublabel: "Infrastructure", offset: "28%" },
  { id: "skills", label: "SECURITY", sublabel: "Scan & Audit", offset: "46%" },
  { id: "projects", label: "INTEGRATION", sublabel: "Deployment", offset: "64%" },
  { id: "certifications", label: "VALIDATION", sublabel: "Compliance", offset: "82%" },
  { id: "contact", label: "RELEASE", sublabel: "Production", offset: "95%" },
];

export default function DeploymentPipeline() {
  const [activeNode, setActiveNode] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Progress bar scroll sync
    const progressST = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    // Section-based active node tracking
    const triggers = nodes.map((node, i) => {
      return ScrollTrigger.create({
        trigger: `#${node.id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveNode(i);
          }
        },
      });
    });

    return () => {
      progressST.kill();
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      className="fixed bottom-0 left-0 w-full h-24 z-[100] hidden lg:block pointer-events-none"
    >
      {/* Cinematic Console Background */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/60 to-transparent backdrop-blur-[1px]" />
      
      {/* Decorative Scanline for the bar */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

      {/* Main Pipeline Track */}
      <div className="absolute bottom-12 left-[10%] right-[10%] h-[1px] bg-white/5 overflow-visible">
        {/* Dynamic Progress Line */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isPast = scrollProgress * 100 >= parseFloat(node.offset);
          const isActive = activeNode === i;
          
          return (
            <div 
              key={node.id} 
              className="absolute top-1/2 -translate-y-1/2" 
              style={{ left: node.offset }}
            >
              {/* Connection Pings */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 3.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-cyan-400/30 rounded-full"
                  />
                )}
              </AnimatePresence>

              {/* Node Visual - Square with rotation */}
              <motion.div
                animate={{ 
                  scale: isActive ? 1.4 : 1,
                  rotate: isPast ? 45 : 0,
                  backgroundColor: isPast ? "#22d3ee" : "rgba(255,255,255,0.02)",
                  borderColor: isPast ? "#22d3ee" : "rgba(255,255,255,0.1)",
                  boxShadow: isActive ? "0 0 15px rgba(34,211,238,0.5)" : "none"
                }}
                className="w-2.5 h-2.5 border transition-all duration-700 relative z-20 flex items-center justify-center"
              >
                 {isActive && (
                   <motion.div 
                     animate={{ opacity: [0.2, 1, 0.2] }}
                     transition={{ duration: 1, repeat: Infinity }}
                     className="w-1 h-1 bg-white rounded-full"
                   />
                 )}
              </motion.div>

              {/* Node Label & Metadata */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <motion.span
                  animate={{ 
                    color: isPast ? "#22d3ee" : "rgba(255,255,255,0.2)",
                    opacity: isPast ? 1 : 0.3,
                    y: isActive ? 0 : 2
                  }}
                  className="font-mono text-[9px] font-black tracking-[0.2em] whitespace-nowrap"
                >
                  {node.label}
                </motion.span>
                <motion.span
                  animate={{ 
                    opacity: isActive ? 0.6 : 0,
                    y: isActive ? 0 : 4,
                    scale: isActive ? 1 : 0.8
                  }}
                  className="font-mono text-[7px] text-blue-400 uppercase tracking-tighter transition-all duration-500"
                >
                  {node.sublabel}
                </motion.span>
              </div>

              {/* Active Pointer Line (Points Up to Section) */}
              <motion.div
                animate={{ 
                  height: isActive ? 20 : 0,
                  opacity: isActive ? 0.4 : 0
                }}
                className="absolute -top-[22px] left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-t from-cyan-400 to-transparent"
              />
            </div>
          );
        })}

        {/* Data Stream Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                left: ["-10%", "110%"],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 4 + i * 1.5, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 2,
                times: [0, 0.5, 1]
              }}
              className="absolute top-1/2 -translate-y-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            />
          ))}
        </div>
      </div>

      {/* Terminal Telemetry (Bottom Edges) */}
      <div className="absolute bottom-5 left-10 right-10 flex justify-between items-end">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-mono text-cyan-500/30 tracking-[0.3em] uppercase">Security Level</span>
            <span className="text-[8px] font-mono text-cyan-400/60">CLEARANCE_P5</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
            <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            <span className="tracking-tighter uppercase opacity-60">System Synchronized</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-mono text-blue-500/40 tracking-[0.3em] uppercase">Pipeline Integrity</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1 border border-white/10 ${scrollProgress > i * 0.2 ? "bg-cyan-500" : "bg-transparent"}`} 
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] font-mono text-white/60 tabular-nums">
            LOAD: {Math.round(scrollProgress * 100)}% COMPLETE
          </span>
        </div>
      </div>
    </div>
  );
}
