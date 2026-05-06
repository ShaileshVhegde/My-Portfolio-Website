"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";
import {
  Fingerprint, CheckCircle2, ShieldAlert, Cpu,
  Network, Database, TrendingUp, ExternalLink,
} from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const systemStats = [
  { label: "Core Archetype", value: "Cloud Security Engineer", icon: Cpu,         color: "text-cyan-400",   bg: "bg-cyan-500/10",   hover: "group-hover/stat:bg-cyan-500 group-hover/stat:text-black" },
  { label: "System Uptime",  value: "2+ Years Experience",    icon: CheckCircle2, color: "text-green-400",  bg: "bg-green-500/10",  hover: "group-hover/stat:bg-green-500 group-hover/stat:text-black" },
  { label: "Network Access", value: "Level 4 Clearance",      icon: Network,      color: "text-purple-400", bg: "bg-purple-500/10", hover: "group-hover/stat:bg-purple-500 group-hover/stat:text-black" },
  { label: "Data Integrity", value: "99.9% Reliable",         icon: Database,     color: "text-blue-400",   bg: "bg-blue-500/10",   hover: "group-hover/stat:bg-blue-500 group-hover/stat:text-black" },
  { label: "Market Awareness",value: "Analytical Synergy",    icon: TrendingUp,   color: "text-yellow-400", bg: "bg-yellow-500/10", hover: "group-hover/stat:bg-yellow-500 group-hover/stat:text-black" },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-16 flex items-center space-x-4"
        >
          <Fingerprint className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            Identity_Verification
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/60 to-transparent ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Main Bio Terminal (2/3) ── */}
          <div className="lg:col-span-2">
            <TiltCard>
              <div className="h-full bg-surface/90 backdrop-blur-xl border border-white/20 rounded-xl p-6 md:p-10 relative overflow-hidden shadow-2xl will-change-transform">

                {/* Left glow strip */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent shadow-[4px_0_24px_rgba(6,182,212,0.5)]" />

                {/* Terminal chrome */}
                <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/10 pl-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 font-semibold tracking-widest uppercase">
                      ~/root/identity/profile.sys
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 font-bold animate-pulse tracking-tighter">
                    ● ACCESS_LEVEL: RESTRICTED
                  </span>
                </div>

                {/* Bio text */}
                <div className="pl-3 space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-mono text-sm md:text-base leading-relaxed text-slate-200"
                  >
                    <span className="text-cyan-400 font-black tracking-widest"># USER_MANIFESTO</span>
                    <p className="mt-4 first-letter:text-5xl first-letter:font-black first-letter:text-cyan-400 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                      {personalInfo.about}
                    </p>
                  </motion.div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pt-8 border-t border-white/10">
                    {systemStats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/15 shadow-lg hover:border-white/30 transition-all duration-200 group/stat cursor-default will-change-transform"
                      >
                        <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color} ${stat.hover} transition-all duration-200 flex-shrink-0`}>
                          <stat.icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5 truncate">{stat.label}</p>
                          <p className="font-mono text-[11px] font-black text-white uppercase tracking-tight truncate">{stat.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b border-cyan-500/30 pointer-events-none" />
              </div>
            </TiltCard>
          </div>

          {/* ── Side Panel (1/3) ── */}
          <div className="flex flex-col gap-6">

            {/* Education clearance */}
            <TiltCard>
              <div className="bg-surface/90 border border-white/20 rounded-xl p-7 relative overflow-hidden shadow-2xl will-change-transform backdrop-blur-xl">
                <h3 className="font-mono text-cyan-400 text-xs font-black tracking-[0.25em] mb-8 uppercase flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Educational_Clearance
                </h3>

                <div className="relative space-y-8">
                  {/* Timeline line */}
                  <div className="absolute left-[6px] top-1 bottom-1 w-[2px] bg-gradient-to-b from-cyan-500/80 via-cyan-500/30 to-transparent rounded-full" />

                  {personalInfo.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="relative pl-8 group/edu will-change-transform"
                    >
                      {/* Timeline node */}
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-cyan-500 border-2 border-background shadow-[0_0_12px_rgba(6,182,212,0.8)] group-hover/edu:scale-125 transition-transform duration-200" />

                      <p className="font-mono text-[10px] text-cyan-400 font-bold mb-1 uppercase tracking-tight">{edu.graduation}</p>
                      <h4 className="text-white font-black text-sm leading-snug group-hover/edu:text-cyan-400 transition-colors uppercase tracking-tight mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-slate-300 text-xs font-mono italic mb-2.5">{edu.institution}</p>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-500/10 border border-green-500/30">
                        <span className="text-[9px] font-mono text-green-400 uppercase font-black tracking-widest">
                          ✓ VALIDATED: {edu.score}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* Connect card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group block relative p-7 rounded-xl border border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 via-surface/95 to-surface/80 backdrop-blur-xl shadow-2xl hover:border-cyan-400 transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                    <Network className="w-8 h-8 text-cyan-400" />
                  </div>

                  <div>
                    <h4 className="font-mono text-sm font-black text-white uppercase tracking-widest mb-1.5 group-hover:text-cyan-400 transition-colors">
                      Connect to Node
                    </h4>
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      Peer-to-Peer · Encrypted Channel
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-black uppercase tracking-wider group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                    <span>Establish Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
