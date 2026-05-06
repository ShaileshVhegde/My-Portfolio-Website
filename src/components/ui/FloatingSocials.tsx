"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";
import { LinkedInLogo, GitHubLogo, InstagramLogo, GmailLogo } from './BrandLogos';

const socials = [
  { 
    name: "Instagram", 
    icon: InstagramLogo, 
    color: "#E4405F", 
    link: personalInfo.socials.instagram 
  },
  { 
    name: "LinkedIn", 
    icon: LinkedInLogo, 
    color: "#0077b5", 
    link: personalInfo.socials.linkedin 
  },
  { 
    name: "GitHub", 
    icon: GitHubLogo, 
    color: "#ffffff", 
    link: personalInfo.socials.github 
  },
  { 
    name: "Gmail", 
    icon: GmailLogo, 
    color: "#EA4335", 
    link: `mailto:${personalInfo.email}` 
  },
];

export default function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center pl-4 pointer-events-none">
      <div className="flex items-center pointer-events-auto">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 30px rgba(6,182,212,0.6)",
            transition: { duration: 0.2 } 
          }}
          whileTap={{ scale: 0.9 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)] border-2 border-white/20 z-10 will-change-transform"
        >
          <motion.div
            animate={{
              rotate: isOpen ? 45 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="text-white text-3xl font-bold"
          >
            +
          </motion.div>
          <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/10 pointer-events-none" />
          <div className="absolute inset-[-4px] rounded-full border border-cyan-500/20 animate-[spin_6s_linear_infinite]" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -30, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="flex items-center gap-4 ml-4 will-change-transform"
            >
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: -10 }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -4,
                    transition: { duration: 0.15 }
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    delay: index * 0.04,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 backdrop-blur-md border border-white/20 shadow-xl transition-all relative group will-change-transform"
                >
                  <div className="h-6 w-6 relative z-10">
                    <social.icon />
                  </div>
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-150"
                    style={{ backgroundColor: social.color }}
                  />
                  <span className="absolute bottom-full mb-3 px-2 py-1 bg-charcoal text-[10px] text-white font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none border border-white/10 shadow-2xl">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
