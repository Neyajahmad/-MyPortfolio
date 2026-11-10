import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Scramble } from './Kinetic';
import { cn } from './Container';

const ease = [0.16, 1, 0.3, 1];

/**
 * Shared section header: numbered label that decodes in, a heading whose words
 * rise from a mask (ending in the terracotta dot) and an optional description.
 *
 * layout: 'row' (heading left, description right) or 'stack'
 * tone:   'light' (cream sections) or 'dark' (ink sections)
 * size:   'lg' (default) or 'xl'
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  layout = 'row',
  tone = 'light',
  size = 'lg',
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dark = tone === 'dark';
  const words = title.split(' ');

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-6',
        layout === 'row' && 'md:flex-row md:items-end md:justify-between md:gap-12',
        className
      )}
    >
      <div>
        <div className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.2em]">
          <span className="text-terracotta">{index}</span>
          <motion.span
            aria-hidden="true"
            className={cn('h-px w-10 origin-left', dark ? 'bg-background/30' : 'bg-text/25')}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease }}
          />
          <Scramble play={inView} text={eyebrow} className={dark ? 'text-background/60' : 'text-text/60'} />
        </div>

        <h2
          aria-label={title}
          className={cn(
            'mt-5 font-serif leading-[1.02] tracking-tight',
            size === 'xl' ? 'text-6xl md:text-8xl' : 'text-5xl md:text-7xl'
          )}
        >
          {words.map((word, i) => (
            <span key={i} aria-hidden="true" className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom last:mr-0">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: inView ? 0 : '110%' }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}
              >
                {word}
                {i === words.length - 1 && <span className="text-terracotta">.</span>}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className={cn(
            'max-w-sm text-base font-light leading-relaxed md:text-lg',
            dark ? 'text-background/60' : 'text-text/60'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
