import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../components/Container';
import { personalInfo } from '../data/mockData';
import { ArrowDown } from 'lucide-react';
import { HeroImageCircle } from '../components/HeroImageCircle';
import { ColorCursor } from '../components/ColorCursor';

export function EditorialHero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroRef = useRef(null);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-background text-text">
      <ColorCursor parentRef={heroRef} />
      <Container className="w-full relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end pb-20 pt-32">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 }}
           className="flex flex-col gap-4 max-w-3xl"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-text/60 tracking-[0.2em] uppercase text-sm md:text-base font-light"
          >
            {personalInfo.roleTitle}
          </motion.h2>
          <motion.h1 
            style={{ y, fontSize: 'clamp(3rem, 12vw, 10rem)' }}
            className="font-serif leading-[0.9] tracking-tighter mix-blend-difference mb-8"
          >
            {personalInfo.name.split(' ')[0]}<br className="hidden md:block"/> {personalInfo.name.split(' ')[1] || ''}
          </motion.h1>
          <motion.h2 className="hidden sm:block text-lg md:text-2xl lg:text-3xl font-light w-full md:w-2/3 leading-relaxed opacity-80 pl-2 md:pl-0 border-l border-text/20 md:border-none">
            {personalInfo.tagline}
          </motion.h2>

          {/* Editorial inline tagline with rotating image circle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-10 flex flex-col gap-1"
          >
            <div className="font-serif text-2xl md:text-4xl lg:text-5xl text-text/80 leading-tight tracking-tight">
              Where your ideas can run free.
            </div>
            <div className="font-serif text-2xl md:text-4xl lg:text-5xl text-text/80 leading-tight tracking-tight flex items-center flex-wrap gap-x-3">
              And code
              <HeroImageCircle className="w-12 h-12 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] inline-flex rounded-full overflow-hidden shadow-lg flex-shrink-0 align-middle" />
              evolves.
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 1, duration: 1 }}
           style={{ y }}
           className="hidden md:flex flex-col items-center gap-4 mt-12 md:mt-0"
        >
          <span className="uppercase text-[10px] tracking-widest font-bold rotate-90 translate-y-6 opacity-40">Scroll</span>
          <ArrowDown size={32} strokeWidth={1} className="animate-bounce opacity-40 mt-12" />
        </motion.div>
      </Container>
      
      {/* Background large typography noise */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none opacity-[0.03] flex justify-center overflow-hidden select-none z-0">
        <span className="font-serif whitespace-nowrap leading-none tracking-tighter" style={{ fontSize: 'clamp(8rem, 30vw, 28rem)' }}>
          PORTFOLIO
        </span>
      </div>


    </section>
  );
}
