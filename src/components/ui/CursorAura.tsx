"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorAura() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Outer aura follows with spring lag for smooth trailing
  const springX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    // Detect hover on interactive elements
    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);

    // Add hover detection for all interactive elements
    const interactiveEls = document.querySelectorAll("a, button, [data-magnetic]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Inner precise cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: rawX, y: rawY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            scale: clicked ? 0.5 : isHovering ? 2.5 : 1,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-3 h-3 rounded-full bg-white"
        />
      </motion.div>

      {/* Outer glowing aura ring */}
      <motion.div
        ref={auraRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            scale: clicked ? 0.8 : isHovering ? 1.8 : 1,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-10 h-10 rounded-full border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5),inset_0_0_10px_rgba(6,182,212,0.1)]"
        />
      </motion.div>

      {/* Click ripple */}
      {clicked && (
        <motion.div
          className="fixed top-0 left-0 z-[9997] pointer-events-none"
          style={{ x: rawX, y: rawY, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-10 h-10 rounded-full border border-cyan-400" />
        </motion.div>
      )}
    </>
  );
}
