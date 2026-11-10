import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../components/Container';
import { personalInfo } from '../data/mockData';
import { HeroImageCircle } from '../components/HeroImageCircle';
import { CursorRing, InfoField, Scramble, SliceReveal } from '../components/Kinetic';

const ease = [0.16, 1, 0.3, 1];

/** A line that rises from behind a mask once `play` is true. */
function RiseLine({ children, play, delay = 0, className }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className || ''}`}>
      <motion.span
        className="flex flex-wrap items-center justify-end gap-x-[0.3em]"
        initial={{ y: '110%' }}
        animate={{ y: play ? 0 : '110%' }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function EditorialHero() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [first, ...rest] = personalInfo.name.split(' ');
  const last = rest.join(' ');

  // The name lines slide in opposite directions as the section scrolls away.
  // NEYAJ only moves right and AHMAD only moves left, so neither ever slides
  // into the info column.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const driftFirst = useTransform(scrollYProgress, [0.5, 1], reduce ? ['0%', '0%'] : ['0%', '8%'], { clamp: true });
  const driftLast = useTransform(scrollYProgress, [0.5, 1], reduce ? ['0%', '0%'] : ['0%', '-8%'], { clamp: true });

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[700px] items-center overflow-hidden bg-background text-text"
    >
      {/* Same minimal cursor as the hero, in dark ink for the light background */}
      <CursorRing areaRef={sectionRef} tone="dark" />

      <Container className="relative z-10 grid w-full grid-cols-1 gap-12 pb-12 pt-28 md:grid-cols-12 md:items-center md:gap-8">
        {/* Info column */}
        <div className="relative order-2 pl-5 md:order-1 md:col-span-4 lg:col-span-3">
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: inView ? 1 : 0 }}
            transition={{ duration: 1.1, ease }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-text/20"
          />
          <div className="flex flex-col gap-5 md:gap-6">
            <Scramble play={inView} text="ABOUT  01" className="font-display text-sm tracking-[0.18em] text-text" />
            <InfoField tone="dark" play={inView} label="Role" value={personalInfo.roleTitle} large />
            <InfoField tone="dark" play={inView} label="Based in" value="India" />
            <InfoField tone="dark" play={inView} label="Statement" value={personalInfo.tagline} />
          </div>
        </div>

        {/* Giant name + line */}
        <div className="order-1 md:order-2 md:col-span-8 lg:col-span-9">
          <h2 aria-label={personalInfo.name} className="font-display font-bold uppercase leading-[0.86] tracking-[-0.01em] [font-size:clamp(4.5rem,25vw,17rem)] md:[font-size:clamp(5rem,17.5vw,17rem)]">
            <motion.span style={{ x: driftFirst }} className="block" aria-hidden="true">
              <SliceReveal play={inView} className="w-max">
                <span className="block">{first}</span>
              </SliceReveal>
            </motion.span>
            <motion.span style={{ x: driftLast }} className="flex justify-end" aria-hidden="true">
              <SliceReveal play={inView} delay={0.15} className="w-max">
                <span className="block">{last}</span>
              </SliceReveal>
            </motion.span>
          </h2>

          <div className="mt-6 text-right font-display font-extralight leading-[1.15] text-text/80 [font-size:clamp(1.6rem,3.6vw,3.4rem)] md:mt-8">
            <RiseLine play={inView} delay={0.45}>Where your ideas can run free.</RiseLine>
            <RiseLine play={inView} delay={0.6}>
              And code
              <HeroImageCircle className="relative inline-flex h-[1.1em] w-[1.1em] flex-shrink-0 overflow-hidden rounded-full align-middle !shadow-none ring-1 ring-text/20" />
              evolves.
            </RiseLine>
          </div>
        </div>
      </Container>
    </section>
  );
}
