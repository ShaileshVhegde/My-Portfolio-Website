"use client";

import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  return (
    <div className={`relative group h-full transition-all duration-300`}>
      <motion.div
        className={`relative h-full bg-surface/80 backdrop-blur-md border border-white/15 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/25 hover:shadow-cyan-500/10 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  );
}
