"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { ScanSearch } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

// Brand color map for popular tech
const brandColors: Record<string, string> = {
  "Python": "#3776AB",
  "JavaScript": "#F7DF1E",
  "React.js": "#61DAFB",
  "Next.js": "#ffffff",
  "Node.js": "#339933",
  "Express.js": "#888888",
  "MongoDB": "#47A248",
  "SQL": "#00758F",
  "PostgreSQL": "#4169E1",
  "AWS": "#FF9900",
  "Docker": "#2496ED",
  "Jenkins": "#D24939",
  "GitHub Actions": "#2088FF",
  "SonarQube": "#4E9BCD",
  "Trivy": "#1904DA",
  "Argo CD": "#EF7B4D",
  "Flask": "#ffffff",
  "Linux": "#FCC624",
  "Burp Suite": "#FF6633",
  "HTML5": "#E34F26",
  "CSS3": "#1572B6",
  "Tailwind CSS": "#06B6D4",
  "Vercel": "#ffffff",
  "Figma": "#F24E1E",
  "Git": "#F05032",
  "Prompt Engineering": "#8B5CF6",
  "IAM & RBAC": "#FF4F00",
  "Web Security": "#EF4444",
  "Stock Market Analysis": "#10B981",
  "Mutual Funds & ETFs": "#3B82F6",
  "Economic Indicators": "#F59E0B",
  "Global Markets": "#6366F1",
  "Financial Ratios": "#EC4899",
  "Gold Investment": "#FFD700",
};

// Glow color map
const glowColors: Record<string, string> = {
  "Python": "rgba(55,118,171,0.3)",
  "Docker": "rgba(36,150,237,0.3)",
  "AWS": "rgba(255,153,0,0.3)",
  "React.js": "rgba(97,218,251,0.3)",
  "JavaScript": "rgba(247,223,30,0.3)",
  "Linux": "rgba(252,198,36,0.3)",
  "Jenkins": "rgba(210,73,57,0.3)",
  "Stock Market Analysis": "rgba(16,185,129,0.3)",
  "Gold Investment": "rgba(255,215,0,0.3)",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative border-t border-b border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-16 flex items-center justify-end space-x-4"
        >
          <div className="flex-1 h-px bg-gradient-to-l from-cyan-500/40 to-transparent" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase text-right">
            System_Capabilities
          </h2>
          <ScanSearch className="w-8 h-8 text-cyan-400" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillsData.map((category, idx) => (
            <TiltCard
              key={category.category}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="h-full p-7 rounded-xl border border-white/20 bg-surface/90 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-200 relative overflow-hidden shadow-2xl will-change-transform"
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 + 0.2, duration: 0.4 }}
                />

                {/* Scan line on hover - Optimized animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-lg">
                  <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-16 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
                  />
                </div>

                {/* Category title */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-mono text-white text-base font-bold tracking-tight uppercase flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                    <span className="text-cyan-500">▸</span>
                    {category.category}
                  </h3>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 font-bold uppercase tracking-tighter">
                    {category.skills.length} modules
                  </span>
                </div>

                {/* Skills grid - Optimized for speed */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => {
                    const color = brandColors[skill.name] || "#94a3b8";
                    const glow = glowColors[skill.name] || "rgba(6,182,212,0.15)";
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-white/10 bg-white/5 cursor-default transition-colors duration-150 hover:bg-white/10 shadow-lg group/skill will-change-transform"
                        style={{
                          borderColor: color + '20'
                        }}
                        title={skill.name}
                      >
                        <skill.icon
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover/skill:rotate-12"
                          style={{ color }}
                          aria-hidden="true"
                        />
                        <span className="text-[13px] font-mono text-slate-100 font-medium whitespace-nowrap tracking-tight">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
