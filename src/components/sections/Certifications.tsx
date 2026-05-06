"use client";

import { motion } from "framer-motion";
import { certificationsData, awardsData } from "@/data/certifications";
import { Award, ShieldCheck, Trophy, CheckCircle, ExternalLink, Cpu } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden border-t border-b border-white/10">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center justify-end space-x-4"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-l from-cyan-500/40 to-transparent" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase text-right">
            Security_Clearances
          </h2>
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications Grid */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-cyan-400" />
              <h3 className="font-mono text-cyan-400 text-sm tracking-[0.2em] uppercase">Professional_Certs</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((cert, i) => (
                <TiltCard key={i} glowColor="rgba(6,182,212,0.1)">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="h-full bg-surface/80 backdrop-blur-2xl p-5 rounded-lg border border-white/10 hover:border-cyan-500/40 transition-all group relative overflow-hidden shadow-2xl"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-0 right-0 p-2">
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      </motion.div>
                    </div>

                    <div className="mb-6">
                      <p className="font-mono text-[9px] text-cyan-500/60 uppercase tracking-widest mb-1">{cert.type}</p>
                      <h4 className="text-white text-sm font-bold leading-tight group-hover:text-cyan-400 transition-colors uppercase">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-mono tracking-tighter">{cert.issuer}</span>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/5 border border-cyan-500/10">
                           <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                           <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-widest">VALIDATED</span>
                        </div>
                      </div>
                    </div>

                    {/* Background Visual */}
                    <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Cpu className="w-16 h-16 text-cyan-500" />
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Awards & Achievements */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-5 h-5 text-green-400" />
              <h3 className="font-mono text-green-400 text-sm tracking-[0.2em] uppercase">System_Achievements</h3>
            </div>
            
            <div className="space-y-6">
              {awardsData.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex items-start gap-4 p-5 bg-surface/30 border-l-2 border-green-500/30 rounded-r-lg group-hover:border-green-500 group-hover:bg-surface/50 transition-all">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-green-500/30 transition-all">
                      <Trophy className="w-5 h-5 text-green-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-green-400 transition-colors">{award.title}</h4>
                        <span className="font-mono text-[10px] text-green-500/60 bg-white/5 px-2 py-0.5 rounded border border-white/5">FY_{award.year}</span>
                      </div>
                      <p className="text-gray-500 text-xs font-mono tracking-tighter uppercase">{award.event}</p>
                    </div>
                  </div>
                  
                  {/* Decorative line connector */}
                  <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* Achievement Footer Metric */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12 p-6 rounded-lg border border-dashed border-white/20 bg-surface/50 flex items-center justify-center text-center gap-8 shadow-inner"
            >
              <div>
                <p className="font-mono text-2xl font-black text-white">05+</p>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Major Badges</p>
              </div>
              <div className="w-px h-8 bg-white/5" />
              <div>
                <p className="font-mono text-2xl font-black text-white">100%</p>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Audit Pass</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
