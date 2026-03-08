import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function FloatingImageCard({ src, width, top, left, right, bottom, delay, index, mouseX, mouseY }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Parse width string (e.g. "160px") to a larger number to meet the "at least 1200px equivalent visually" or just scale them up slightly
  // We'll multiply the base width by 1.25 to make them more prominent like Cosmos
  const numericalWidth = parseInt(width);
  const scaledWidth = `${numericalWidth * 1.25}px`;

  // Organic floating animation parameters based on index
  const floatDirection = index % 2 === 0 ? [-15, 15, -15] : [15, -15, 15];
  const floatDuration = 6 + (index % 4);

  // Static rotation for the organic scattered look
  const staticRotations = [-6, 4, -3, 5, -5, 3, -4, 6, -2, 2, -7, 7];
  const rotation = staticRotations[index % staticRotations.length];

  // Parallax calculations
  const parallaxStrength = 0.02 + (index % 3) * 0.01;
  const xOffset = mouseX * parallaxStrength;
  const yOffset = mouseY * parallaxStrength;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.8,
      }}
      transition={{ duration: 1, delay: delay * 0.5 }}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        width: scaledWidth,
        zIndex: 10
      }}
      className="will-change-[transform,opacity]"
    >
      <motion.div
        animate={{
          x: xOffset,
          y: floatDirection.map(y => y + yOffset)
        }}
        transition={{
          y: {
            duration: floatDuration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          },
          x: { type: 'spring', stiffness: 50, damping: 20 }
        }}
        style={{ rotate: rotation }}
        className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] group"
      >
        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          </div>
        )}

        {/* High Res Image */}
        <img
          src={src}
          alt="Portfolio Visual"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full object-cover brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
