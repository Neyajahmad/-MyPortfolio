import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { DeviceFrame } from './DeviceFrame';
import { cn } from './Container';
import { frameUrl, isRaster, projectStatus } from '../utils/project';

// Glow colours come from the site palette (terracotta, sage, and a warm mix of the two)
const ACCENTS = {
  'Full Stack': '#C76A4A',
  Android: '#8A9A8B',
  Frontend: '#A9846A',
};

function FloatingChip({ className, y, delay = 0, label, value, dot }) {
  const reduce = useReducedMotion();
  return (
    <motion.div style={{ y }} className={cn('absolute z-20 hidden lg:block', className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col gap-0.5 rounded-2xl bg-white/85 px-4 py-3 shadow-[0_20px_40px_-15px_rgba(26,26,26,0.3)] ring-1 ring-black/5 backdrop-blur-md"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-text/40">{label}</span>
          <span className="flex items-center gap-2 text-sm font-medium text-text">
            {dot && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
            )}
            {value}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Hero showcase: the cover screenshot in a frame on a soft accent panel.
 * The frame tilts toward the cursor and flattens as it scrolls into view.
 */
export function ProjectShowcase({ project, image, onOpen }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const accent = ACCENTS[project.category] || '#C76A4A';
  const status = projectStatus(project);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollTilt = useTransform(scrollYProgress, [0.05, 0.42], reduce ? [0, 0] : [16, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [0.05, 0.42], reduce ? [1, 1] : [0.9, 1], { clamp: true });
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const chipA = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -90]);
  const chipB = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -140]);
  const chipC = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -60]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);

  // Cursor tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 140, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 140, damping: 18 });
  const rotateX = useTransform([scrollTilt, tiltX], ([a, b]) => a + b);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(10% 6% 10% 6% round 28px)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden rounded-[28px] bg-[#EEEAE4] px-5 py-14 sm:px-10 md:py-24 [perspective:1600px]"
    >
      {/* Backdrop: accent glow + fine grid */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, background: `radial-gradient(closest-side, ${accent}55, transparent)` }}
        className="pointer-events-none absolute -bottom-[10%] -top-[10%] left-[10%] right-[10%] rounded-full blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(26,26,26,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Floating info chips (desktop) */}
      <FloatingChip
        className="left-[5%] top-[16%]"
        y={chipA}
        delay={0.9}
        label="Built with"
        value={project.techStack.slice(0, 3).join(' · ')}
      />
      {status && (
        <FloatingChip
          className="bottom-[16%] right-[5%]"
          y={chipB}
          delay={1.05}
          label={status.label}
          value={status.value}
          dot={!!project.live}
        />
      )}
      {project.features?.length > 0 && (
        <FloatingChip
          className="bottom-[22%] left-[7%]"
          y={chipC}
          delay={1.2}
          label="Key features"
          value={`${project.features.length} shipped`}
        />
      )}

      {/* Frame */}
      <motion.div
        style={{ rotateX, rotateY: tiltY, y: frameY, scale, transformStyle: 'preserve-3d' }}
        className={cn('relative z-10 mx-auto w-full', isRaster(image) ? 'max-w-[560px]' : 'max-w-[940px]')}
      >
        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="group relative block w-full cursor-zoom-in rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4"
          aria-label="View screenshot full screen"
        >
          <DeviceFrame
            src={image}
            alt={`${project.title} screenshot`}
            url={frameUrl(project)}
            plain={project.category === 'Android'}
            eager
          />
          <span className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-2 rounded-full bg-text/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-background opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 size={12} /> View full screen
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
