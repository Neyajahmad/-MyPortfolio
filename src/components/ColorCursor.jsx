import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

export function ColorCursor({ parentRef }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);

  const CURSOR_SIZE = 250;
  const OFFSET = CURSOR_SIZE / 2;

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);

  const x = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    const parent = parentRef?.current;
    if (!parent) return;

    const handleMouseMove = (e) => {
      rawX.set(e.clientX - OFFSET);
      rawY.set(e.clientY - OFFSET);
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleTextEnter = () => setIsHoveringText(true);
    const handleTextLeave = () => setIsHoveringText(false);

    const textEls = parent.querySelectorAll('h1, h2, h3, p, span, a, button');
    textEls.forEach(el => {
      el.addEventListener('mouseenter', handleTextEnter);
      el.addEventListener('mouseleave', handleTextLeave);
    });

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      textEls.forEach(el => {
        el.removeEventListener('mouseenter', handleTextEnter);
        el.removeEventListener('mouseleave', handleTextLeave);
      });
    };
  }, [parentRef, rawX, rawY, OFFSET]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isHoveringText ? 0.7 : 0.5,
            scale: isHoveringText ? 1.25 : 1,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            x,
            y,
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            background: 'radial-gradient(circle, rgba(255,120,120,0.55), rgba(255,200,100,0.45) 40%, rgba(100,180,255,0.35) 75%, transparent 100%)',
            filter: 'blur(40px)',
          }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[60]"
        />
      )}
    </AnimatePresence>
  );
}
