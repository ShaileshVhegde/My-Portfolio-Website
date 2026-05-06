"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero", label: "INIT", icon: "⬡" },
  { id: "about", label: "IDENT", icon: "◈" },
  { id: "skills", label: "SYS", icon: "⬢" },
  { id: "projects", label: "PIPE", icon: "◉" },
  { id: "certifications", label: "CERT", icon: "◆" },
  { id: "contact", label: "COMM", icon: "◎" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);

      // Determine active section
      const sections = navItems.map((n) => document.getElementById(n.id));
      let current = "hero";
      sections.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2"
          onMouseEnter={() => setShowLabels(true)}
          onMouseLeave={() => setShowLabels(false)}
        >
          {/* Vertical connector line */}
          <div className="absolute right-[11px] top-0 bottom-0 w-px bg-white/5 z-0" />

          {navItems.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <motion.div
                key={item.id}
                className="flex items-center gap-3 relative z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Label */}
                <AnimatePresence>
                  {showLabels && (
                    <motion.button
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onClick={() => scrollTo(item.id)}
                      className={`font-mono text-[10px] tracking-widest px-2 py-1 rounded-sm border transition-all ${
                        isActive
                          ? "text-cyan-400 border-cyan-500/50 bg-cyan-950/50"
                          : "text-gray-500 border-white/10 bg-black/40 hover:text-gray-300"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <button
                  onClick={() => scrollTo(item.id)}
                  className="relative group"
                  title={item.label}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.4 : 1,
                      backgroundColor: isActive ? "rgb(6,182,212)" : "rgba(255,255,255,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      boxShadow: isActive ? "0 0 12px rgba(6,182,212,0.8)" : "none",
                    }}
                  />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
