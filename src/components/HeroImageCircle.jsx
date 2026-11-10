import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Local tech images: sharp, fast cycling
const images = [
  '/images/tech/code.png',
  '/images/tech/circuit.png',
  '/images/tech/keyboard.png',
  '/images/tech/ai-brain.png',
  '/images/tech/server.png',
  '/images/tech/mobile-ui.png',
  '/images/tech/monitor.png',
  '/images/tech/react.png',
];

export function HeroImageCircle({ className = "w-[80px] h-[80px] inline-block mx-4 -mb-6 align-middle" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Switch image precisely every 1 second
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rounded-full overflow-hidden shadow-2xl flex items-center justify-center relative bg-black ${className}`}>
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Tech image ${index}`}
          loading="lazy"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  );
}
