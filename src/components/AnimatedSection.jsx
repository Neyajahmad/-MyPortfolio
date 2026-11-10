import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function AnimatedSection({ children, className = "", id }) {
  const ref = useRef(null);

  // Track the section's position within the viewport
  // "start 95%" -> section top crosses 95% of viewport height (enters from bottom)
  // "end 5%" -> section bottom crosses 5% of viewport height (leaves from top)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 5%"]
  });

  // Apply a spring to smooth out the scroll progress
  // This gives the exact cinematic lag (approx 0.8s) the user requested when scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Define transition stops:
  // 0.0 - 0.15: Entering the screen from the bottom
  // 0.15 - 0.85: Fully in view
  // 0.85 - 1.0: Leaving the screen from the top

  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [60, 0, 0, -40]
  );
  
  return (
    <motion.div
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className={`w-full will-change-[transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
}
