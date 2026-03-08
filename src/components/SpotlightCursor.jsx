import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

export function SpotlightCursor({ parentRef }) {
  const [isVisible, setIsVisible] = useState(false);

  // Raw tracked position
  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);

  // Smooth spring-following values
  const x = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.5 });

  const CURSOR_SIZE = 300;
  const OFFSET = CURSOR_SIZE / 2;

  useEffect(() => {
    const parent = parentRef?.current;
    if (!parent) return;

    const handleMouseMove = (e) => {
      rawX.set(e.clientX - OFFSET);
      rawY.set(e.clientY - OFFSET);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [parentRef, rawX, rawY, OFFSET]);

  // Don't show on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            x,
            y,
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            background: 'radial-gradient(circle, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.02) 60%, transparent 100%)',
            backdropFilter: 'blur(2px)',
          }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-multiply"
        />
      )}
    </AnimatePresence>
  );
}
