"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/projects";
import { GitMerge, Activity, Server, ExternalLink, Cpu, ShieldCheck } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import TiltCard from "@/components/ui/TiltCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-16 flex items-center space-x-4"
        >
          <GitMerge className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            Active_Deployments
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {projectsData.map((project, index) => (
            <TiltCard key={project.id}>
              <div className="group relative overflow-hidden bg-surface/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl will-change-transform">
                {/* Status Bar */}
                <div className="bg-white/10 border-b border-white/10 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className={`w-3.5 h-3.5 ${project.status === "Deployed" ? "text-green-500" : "text-yellow-500"} animate-pulse`} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      SYS_STATE: <span className={project.status === "Deployed" ? "text-green-400" : "text-yellow-400"}>{project.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-tighter">NODE_ID: {project.id.slice(0, 8)}</span>
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Left: Project Info */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-2">
                        <Cpu className="w-5 h-5 text-cyan-400/50" />
                        <span className="font-mono text-xs text-cyan-500 uppercase tracking-widest">{project.subtitle}</span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-6 group-hover:text-cyan-400 transition-colors tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-mono">
                        <span className="text-green-500/50 mr-2">$ cat readme.md</span>
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        {project.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start text-xs font-mono text-gray-300">
                            <ShieldCheck className="w-3.5 h-3.5 mr-2 mt-0.5 text-cyan-500 shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-200"
                        >
                          <FaGithub className="w-4 h-4" />
                          Repository
                        </motion.a>
                        {project.deploymentUrl !== "#" && (
                          <motion.a
                            href={project.deploymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex items-center gap-2 px-4 py-2 rounded bg-cyan-600 border border-cyan-500 text-white font-mono text-xs uppercase tracking-widest hover:bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-200"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live_Pipeline
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Right: Technical Stack Pipeline */}
                    <div className="lg:col-span-2 relative flex flex-col justify-center">
                      <div className="bg-surface border border-white/10 rounded-lg p-6 relative overflow-hidden h-full shadow-lg">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                          <Server className="w-24 h-24 text-cyan-500" />
                        </div>
                        
                        <h4 className="font-mono text-[10px] text-gray-500 mb-6 uppercase tracking-[0.25em] flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2" />
                          Stack_Analysis
                        </h4>

                        <div className="space-y-4 relative">
                          {/* Animated line behind nodes */}
                          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
                            <motion.div
                              animate={{ y: ["-100%", "200%"] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="w-full h-20 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
                            />
                          </div>

                          {project.techStack.map((tech, i) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                              className="flex items-center group/item will-change-transform"
                            >
                              <div className="relative z-10 w-6 h-6 rounded-md bg-black border border-white/10 flex items-center justify-center mr-4 group-hover/item:border-cyan-500 transition-colors duration-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                              </div>
                              <div className="flex-1 flex items-center">
                                <span className="font-mono text-xs text-gray-300 group-hover/item:text-white transition-colors duration-200">{tech}</span>
                                <div className="flex-1 h-px bg-white/5 mx-3" />
                                <div className="w-2 h-2 border border-white/20 rounded-full group-hover/item:bg-cyan-500/20" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative scanning line animation */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 overflow-hidden">
                   <motion.div 
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="w-full h-40 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                  />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
