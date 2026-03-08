import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MenuCursor — A soft spotlight glow cursor that only lives inside FullscreenMenu.
 *
 * Props:
 *   isHoveringItem — boolean: set to true while mouse is over a nav link
 */
export function MenuCursor({ isHoveringItem }) {
  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);

  // Spring physics — smooth, slightly lag behind the mouse
  const x = useSpring(rawX, { stiffness: 120, damping: 20, restDelta: 0.01 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20, restDelta: 0.01 });

  // Attach mouse tracking to the window while the menu is open
  React.useEffect(() => {
    const handleMove = (e) => {
      rawX.set(e.clientX - 110); // offset to center the 220px circle
      rawY.set(e.clientY - 110);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [rawX, rawY]);

  return (
    <motion.div
      style={{ x, y }}
      animate={{
        scale: isHoveringItem ? 1.3 : 1,
        opacity: isHoveringItem ? 0.9 : 0.6,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 pointer-events-none z-[200] will-change-transform"
    >
      {/* Outer glow blob */}
      <div
        className="w-[220px] h-[220px] rounded-full"
        style={{
          filter: 'blur(40px)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.35), rgba(255,255,255,0.1), transparent)',
        }}
      />

      {/* Optional inner label — scales with hover */}
      {isHoveringItem && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className="text-white text-xs font-semibold uppercase tracking-[0.3em] drop-shadow"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.9)' }}
          >
            OPEN
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
