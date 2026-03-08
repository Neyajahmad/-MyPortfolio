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
    [80, 0, 0, -80]
  );
  
  const blurValue = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [10, 0, 0, 10]
  );
  
  // Create dynamic filter string
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  
  // Optional premium flair: slight pinch scale when at extreme edges
  const scale = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0.97, 1, 1, 0.97]
  );

  return (
    <motion.div
      id={id}
      ref={ref}
      style={{ opacity, y, filter, scale }}
      className={`w-full will-change-[transform,opacity,filter] ${className}`}
    >
      {children}
    </motion.div>
  );
}
