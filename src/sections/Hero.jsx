import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FloatingImages } from '../components/FloatingImages';
import { HeroCursor } from '../components/HeroCursor';
import { ParticleTrailCursor } from '../components/ParticleTrailCursor';

export function Hero() {
  const heroRef = useRef(null);

  const handleScrollClick = () => {
    const projectsSection = document.getElementById('projects-scroll');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0B0B0B] text-white"
    >
      <HeroCursor parentRef={heroRef} />
      <ParticleTrailCursor parentRef={heroRef} />
      
      {/* Background Floating Gallery with Parallax */}
      <FloatingImages />

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl pt-12">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-center pb-8"
        >
          <h1 
            className="font-serif font-bold tracking-tight mb-8 drop-shadow-2xl" 
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.05' }}
          >
            Build Ideas<br/>
            Into Reality
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-white/70 max-w-2xl mb-12 drop-shadow-md">
            Explore my projects, experiments, and ideas.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollClick}
            className="bg-white text-black rounded-full px-8 py-4 font-semibold text-sm md:text-base tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 relative z-30"
          >
            View Projects
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle fade out at the bottom to transition to the white content below if needed */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none z-10" />
    </section>
  );
}

