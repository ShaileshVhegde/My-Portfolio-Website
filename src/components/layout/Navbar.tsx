"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";
import { Terminal, Menu, X, ShieldCheck, Wifi } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "// INIT", href: "#hero", id: "hero" },
  { name: "// IDENTITY", href: "#about", id: "about" },
  { name: "// SKILLS", href: "#skills", id: "skills" },
  { name: "// PIPELINE", href: "#projects", id: "projects" },
  { name: "// CERTS", href: "#certifications", id: "certifications" },
  { name: "// MARKET", href: "#finance", id: "finance" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [time, setTime] = useState("");
  const lastScrollY = useRef(0);

  // Hover indicator for nav items
  const indicatorX = useMotionValue(0);
  const indicatorW = useMotionValue(0);
  const springX = useSpring(indicatorX, { stiffness: 400, damping: 35 });
  const springW = useSpring(indicatorW, { stiffness: 400, damping: 35 });

  useEffect(() => {
    // Clock
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: true }));
    tick();
    const timer = setInterval(tick, 1000);

    // Scroll behavior
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setScrollDir(y > lastScrollY.current ? "down" : "up");
      lastScrollY.current = y;

      // Active section detection
      const sections = navItems.map((n) => document.getElementById(n.id));
      let current = "hero";
      sections.forEach((section) => {
        if (!section) return;
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    indicatorX.set(rect.left - parentRect.left);
    indicatorW.set(rect.width);
  };

  const smoothScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <motion.header
      animate={{ y: scrollDir === "down" && scrolled ? -100 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-cyan-900/30 bg-black/80 backdrop-blur-xl py-2 shadow-[0_4px_30px_rgba(6,182,212,0.05)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#hero"
          onClick={() => smoothScrollTo("hero")}
          className="flex items-center space-x-2 group"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Terminal className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <span className="font-mono text-sm md:text-base font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
            {personalInfo.name.split(" ")[0]}
            <span className="text-cyan-400">.SYS</span>
          </span>
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-500"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center space-x-8 relative"
          onMouseLeave={() => { indicatorW.set(0); }}
        >
          {/* Sliding underline indicator */}
          <motion.div
            className="absolute -bottom-1 h-px bg-cyan-400 opacity-60"
            style={{ left: springX, width: springW }}
          />

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(item.id); }}
                onMouseEnter={handleNavHover}
                className={`font-mono text-xs tracking-widest relative transition-colors ${
                  isActive ? "text-cyan-400" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="navActiveBar"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-400"
                  />
                )}
              </a>
            );
          })}

          {/* Live system time */}
          <div className="flex items-center space-x-1 pl-4 border-l border-white/10">
            <Wifi className="w-3 h-3 text-green-500 animate-pulse" />
            <span className="font-mono text-[10px] text-green-400">{time}</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("contact"); }}
            className="relative px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-400 border border-cyan-500/40 rounded-sm overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-cyan-500/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ type: "tween", duration: 0.3 }}
            />
            <span className="relative z-10">Connect</span>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-gray-400 hover:text-white border border-white/10 p-2 rounded"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden bg-black/95 backdrop-blur-xl border-b border-cyan-900/30"
          >
            <div className="px-6 py-4 flex flex-col space-y-1">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); smoothScrollTo(item.id); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`font-mono text-sm py-3 border-b border-white/5 flex items-center justify-between transition-colors ${
                      isActive ? "text-cyan-400" : "text-gray-400"
                    }`}
                  >
                    {item.name}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
