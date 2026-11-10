import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from './Container';

/*
 * Small kinetic-typography building blocks used by the two intro sections:
 * Scramble (text decodes from random glyphs), SliceReveal (title assembles from
 * offset horizontal slices) and CursorRing (a minimal custom cursor).
 */

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&$@[]{}<>/=+*';

/** Text that decodes from random glyphs whenever `text` changes or `play` turns on. */
export function Scramble({ text, play = true, duration = 700, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!play || reduce) {
      el.textContent = text;
      return undefined;
    }
    const chars = [...text];
    const reveal = chars.map((_, i) => (i / Math.max(chars.length, 1)) * duration * 0.6 + Math.random() * duration * 0.4);
    const start = performance.now();
    let raf;
    const frame = (now) => {
      const t = now - start;
      let out = '';
      for (let i = 0; i < chars.length; i += 1) {
        const c = chars[i];
        out += c === ' ' || t >= reveal[i] ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (t < duration) raf = requestAnimationFrame(frame);
      else el.textContent = text;
    };
    frame(start);
    return () => cancelAnimationFrame(raf);
  }, [text, play, duration, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" ref={ref} />
    </span>
  );
}

/** Label + scrambled value, used in the left info columns. */
export function InfoField({ label, value, play = true, large = false, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <div className="flex flex-col gap-1">
      <span className={cn('font-display text-[11px] font-light uppercase tracking-[0.18em]', dark ? 'text-text/40' : 'text-white/40')}>
        {label}
      </span>
      <Scramble
        text={value}
        play={play}
        className={cn(
          'leading-snug',
          large ? 'text-2xl font-normal md:text-[1.7rem]' : 'text-sm',
          dark ? 'text-text' : 'text-white'
        )}
      />
    </div>
  );
}

const stripes = (odd, h) =>
  `repeating-linear-gradient(to bottom, ${odd ? 'transparent' : '#000'} 0px, ${odd ? 'transparent' : '#000'} ${h}px, ${odd ? '#000' : 'transparent'} ${h}px, ${odd ? '#000' : 'transparent'} ${h * 2}px)`;

/**
 * Content that assembles from two sets of interleaved horizontal slices sliding
 * in from opposite sides, then settles into a clean, unmasked copy.
 */
export function SliceReveal({ children, play = true, delay = 0, stripe = 3, className }) {
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(false);

  if (reduce) {
    return (
      <motion.div className={className} initial={{ opacity: 0 }} animate={{ opacity: play ? 1 : 0 }} transition={{ duration: 0.5, delay }}>
        {children}
      </motion.div>
    );
  }

  const transition = {
    x: { duration: 0.85, times: [0, 0.35, 0.65, 1], ease: 'easeOut', delay },
    opacity: { duration: 0.25, delay },
  };
  const hidden = (from) => ({ opacity: 0, x: from });
  const shown = (from) => ({ opacity: 1, x: [from, -from * 0.35, from * 0.12, 0] });

  return (
    <div className={cn('relative', className)}>
      <motion.div
        style={settled ? undefined : { maskImage: stripes(false, stripe), WebkitMaskImage: stripes(false, stripe) }}
        initial={hidden(-64)}
        animate={play ? shown(-64) : hidden(-64)}
        transition={transition}
        onAnimationComplete={() => { if (play) setSettled(true); }}
      >
        {children}
      </motion.div>
      {!settled && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ maskImage: stripes(true, stripe), WebkitMaskImage: stripes(true, stripe) }}
          initial={hidden(64)}
          animate={play ? shown(64) : hidden(64)}
          transition={transition}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

/**
 * Minimal custom cursor for a section: a terracotta dot at the pointer and a
 * thin ring that trails it. Over links/buttons the ring grows; over any element
 * with data-cursor="Label" it becomes a solid terracotta badge with that label.
 * Desktop pointers only; the native cursor stays visible.
 */
export function CursorRing({ areaRef, tone = 'light' }) {
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState({ kind: 'idle', label: '' });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 });

  useEffect(() => {
    const el = areaRef.current;
    if (!el || isTouch) return undefined;
    const last = { cx: 0, cy: 0 };
    const place = () => {
      const r = el.getBoundingClientRect();
      x.set(last.cx - r.left);
      y.set(last.cy - r.top);
    };
    const read = (target) => {
      const labelled = target.closest?.('[data-cursor]');
      if (labelled && el.contains(labelled)) return { kind: 'label', label: labelled.getAttribute('data-cursor') };
      const interactive = target.closest?.('a, button');
      if (interactive && el.contains(interactive)) return { kind: 'hover', label: '' };
      return { kind: 'idle', label: '' };
    };
    const move = (e) => {
      last.cx = e.clientX;
      last.cy = e.clientY;
      place();
      const next = read(e.target);
      setMode((m) => (m.kind === next.kind && m.label === next.label ? m : next));
    };
    const enter = (e) => {
      move(e);
      rx.jump(x.get());
      ry.jump(y.get());
      setVisible(true);
    };
    const leave = () => setVisible(false);
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    window.addEventListener('scroll', place, { passive: true });
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
      window.removeEventListener('scroll', place);
    };
  }, [areaRef, isTouch, x, y, rx, ry]);

  if (isTouch) return null;

  const dark = tone === 'dark';
  const size = mode.kind === 'label' ? 104 : mode.kind === 'hover' ? 56 : 36;
  const ringColor = dark ? 'rgba(26,26,26,0.35)' : 'rgba(255,255,255,0.45)';

  return (
    <>
      {/* Trailing ring / label badge */}
      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        className="pointer-events-none absolute left-0 top-0 z-40"
      >
        <motion.div
          initial={false}
          animate={{
            width: size,
            height: size,
            opacity: visible ? 1 : 0,
            backgroundColor: mode.kind === 'label' ? 'rgba(199,106,74,1)' : 'rgba(199,106,74,0)',
            borderColor: mode.kind === 'label' ? 'rgba(199,106,74,1)' : ringColor,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        >
          <motion.span
            initial={false}
            animate={{ opacity: mode.kind === 'label' ? 1 : 0, scale: mode.kind === 'label' ? 1 : 0.6 }}
            transition={{ duration: 0.25 }}
            className="whitespace-nowrap font-display text-[11px] font-normal uppercase tracking-[0.18em] text-white"
          >
            {mode.label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Dot exactly at the pointer */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none absolute left-0 top-0 z-40"
      >
        <motion.div
          initial={false}
          animate={{ scale: visible && mode.kind !== 'label' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta"
        />
      </motion.div>
    </>
  );
}
