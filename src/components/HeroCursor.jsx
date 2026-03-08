import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroCursor({ parentRef }) {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // We rely on mouseenter to set this, but just in case it fires inside without enter
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    parent.addEventListener('mousemove', updateMousePosition);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Add interactivity to links and buttons within the hero section
    const handleLinkHover = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);
    
    const updateHoverListeners = () => {
      const interactiveElements = parent.querySelectorAll('a, button, input, [role="button"], .cursor-pointer');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
      return () => {
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleLinkHover);
          el.removeEventListener('mouseleave', handleLinkLeave);
        });
      };
    };

    let cleanupHoverListeners = updateHoverListeners();

    const observer = new MutationObserver(() => {
      cleanupHoverListeners();
      cleanupHoverListeners = updateHoverListeners();
    });
    
    observer.observe(parent, { childList: true, subtree: true });

    return () => {
      parent.removeEventListener('mousemove', updateMousePosition);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      cleanupHoverListeners();
      observer.disconnect();
    };
  }, [parentRef, isVisible]);

  // Base size of the large circular cursor
  const cursorSize = 150;
  // Shrink slightly when hovering over clickable elements to indicate interaction
  const activeSize = isHovering ? cursorSize * 0.6 : cursorSize;
  const offset = activeSize / 2;

  // We only render on desktop surfaces where fine pointer is available
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            width: activeSize,
            height: activeSize,
            x: mousePosition.x - offset,
            y: mousePosition.y - offset,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            width: { type: 'spring', stiffness: 300, damping: 25 },
            height: { type: 'spring', stiffness: 300, damping: 25 },
            x: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 },
            y: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }
          }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference bg-white"
          style={{ willChange: 'transform, width, height' }}
        />
      )}
    </AnimatePresence>
  );
}
