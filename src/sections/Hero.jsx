import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { personalInfo, experience } from '../data/mockData';
import { CursorRing, InfoField, Scramble, SliceReveal } from '../components/Kinetic';
import { useScrollToId } from '../utils/useScrollToId';

// Rotating headline statements (one at a time, like a works index)
const STATEMENTS = [
  { lines: ['Build ideas', 'into reality'], sub: 'Explore my projects, experiments, and ideas.' },
  { lines: ['Full stack', 'developer'], sub: 'React · Node.js · Express · MongoDB' },
  { lines: ['Software', 'engineer'], sub: 'Building AI evaluation infrastructure' },
  { lines: ['Android', 'apps'], sub: 'Kotlin · MVVM · Firebase, live on Google Play' },
];
const INTERVAL = 3800;
const pad = (n) => String(n).padStart(2, '0');

/** Font size that fits the longest line into the headline area. */
function headlineSize(lines) {
  const longest = Math.max(...lines.map((l) => l.length));
  const rows = lines.length;
  const desktop = `min(${Math.min(10, 50 / (longest * 0.46)).toFixed(2)}vw, ${(52 / (rows * 0.92)).toFixed(2)}vh)`;
  const mobile = `min(${Math.min(22, 84 / (longest * 0.46)).toFixed(2)}vw, ${(28 / (rows * 0.92)).toFixed(2)}vh)`;
  return { '--fs-d': desktop, '--fs-m': mobile };
}

/**
 * Shrinks the headline (via --fit) until its longest line fits the headline
 * area. Re-measures on resize and once web fonts finish loading.
 */
function FitHeadline({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    // Found through the DOM: on first mount a parent's ref isn't attached yet
    const area = el?.closest('[data-fit-area]');
    if (!el || !area) return undefined;
    const fit = () => {
      el.style.setProperty('--fit', '1');
      const lines = el.querySelectorAll('[data-line]');
      const widest = Math.max(...[...lines].map((l) => l.scrollWidth));
      const room = area.clientWidth;
      if (widest > 0 && widest > room) el.style.setProperty('--fit', String((room / widest) * 0.98));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(area);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}

export function Hero() {
  const heroRef = useRef(null);
  const scrollToId = useScrollToId();
  const inView = useInView(heroRef, { amount: 0.3 });
  const [index, setIndex] = useState(0);
  const job = experience[0];
  const statement = STATEMENTS[index];

  // Advance the headline while the hero is on screen
  useEffect(() => {
    if (!inView) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % STATEMENTS.length), INTERVAL);
    return () => clearTimeout(id);
  }, [index, inView]);

  return (
    <section
      ref={heroRef}
      data-nav-dark=""
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-ink text-white"
    >
      <h1 className="sr-only">
        {personalInfo.name}, Software Engineer and Full Stack Developer
      </h1>

      {/* Minimal cursor: dot + trailing ring, becomes a badge over the headline */}
      <CursorRing areaRef={heroRef} />

      {/* Content sits on the same grid as the navbar (logo left, menu right) */}
      <div className="relative mx-auto h-full max-w-[87.5rem] px-6 md:px-12 lg:px-20">
      <div className="relative h-full">

      {/* Left info column */}
      <div className="absolute left-0 top-36 z-30 md:top-1/2 md:w-[30%] md:-translate-y-1/2 lg:w-[25%]">
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -left-5 top-0 h-full w-px origin-top bg-white/25"
        />
        <div className="flex flex-col gap-5 md:gap-6">
          <Scramble
            text={`PORTFOLIO  ${pad(index + 1)} / ${pad(STATEMENTS.length)}`}
            className="font-display text-sm tracking-[0.18em] text-white"
          />
          <InfoField label="Name" value={personalInfo.name} large />
          <InfoField label="Role" value={job.role} />
          <div className="hidden flex-col gap-5 md:flex md:gap-6">
            <InfoField label="Currently" value={`${job.company} · ${job.location.split(',')[0]}`} />
            <InfoField label="Focus" value="Full Stack · AI Infrastructure" />
          </div>

          {/* Statement progress */}
          <div className="hidden gap-1.5 pt-2 md:flex" role="tablist" aria-label="Headline">
            {STATEMENTS.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={s.lines.join(' ')}
                onClick={() => setIndex(i)}
                className="group relative h-4 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/20 transition-colors group-hover:bg-white/40" />
                <motion.span
                  key={i === index ? `on-${index}` : 'off'}
                  className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-white"
                  initial={{ scaleX: i < index ? 1 : 0 }}
                  animate={{ scaleX: i <= index ? 1 : 0 }}
                  transition={i === index ? { duration: INTERVAL / 1000, ease: 'linear' } : { duration: 0 }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToId('projects')}
            className="group mt-1 hidden w-max items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white md:inline-flex"
          >
            View projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Headline */}
      <button
        type="button"
        onClick={() => scrollToId('projects')}
        aria-label="View projects"
        data-cursor="View work"
        data-fit-area=""
        className="absolute bottom-[14%] left-0 right-0 top-[46%] z-10 cursor-pointer text-left md:bottom-[12%] md:left-[34%] md:right-[9%] md:top-[12%]"
      >
        <AnimatePresence>
          <motion.div
            key={index}
            style={headlineSize(statement.lines)}
            className="absolute inset-0 flex items-end md:items-center"
            exit={{ opacity: 0, x: 50, skewX: -8, transition: { duration: 0.3, ease: 'easeIn' } }}
          >
            <SliceReveal className="w-max max-w-full">
              <FitHeadline>
              <div aria-hidden="true">
                {statement.lines.map((line) => (
                  <span
                    key={line}
                    data-line
                    className="block w-max whitespace-nowrap font-display font-bold uppercase leading-[0.92] tracking-[-0.005em] [font-size:calc(var(--fs-m)*var(--fit,1))] md:[font-size:calc(var(--fs-d)*var(--fit,1))]"
                  >
                    {line}
                  </span>
                ))}
                <span className="mt-4 block w-0 min-w-full text-right font-display text-lg font-extralight leading-snug text-white/75 md:mt-5 md:text-[clamp(1.1rem,1.9vw,2rem)]">
                  {statement.sub}
                </span>
              </div>
              </FitHeadline>
            </SliceReveal>
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Right rail: section links + scroll cue */}
      <nav
        aria-label="Sections"
        className="absolute bottom-0 right-0 top-0 z-30 hidden w-10 flex-col items-center justify-between pt-40 md:flex"
      >
        <ul className="flex flex-col items-center gap-9">
          {[
            ['Works', 'projects'],
            ['Experience', 'experience'],
            ['Contact', 'contact'],
          ].map(([label, id], i) => (
            <li key={id}>
              <button
                onClick={() => scrollToId(id)}
                className={`block text-[11px] uppercase tracking-[0.22em] transition-colors [writing-mode:vertical-rl] hover:text-white ${
                  i === 0 ? 'font-semibold text-white' : 'text-white/55'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => scrollToId('projects')}
          className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block h-28 w-px overflow-hidden bg-white/20">
            <motion.span
              className="absolute left-0 top-0 block h-1/2 w-px bg-white"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile scroll cue */}
      <div className="absolute bottom-6 left-0 z-30 text-[10px] uppercase tracking-[0.3em] text-white/50 md:hidden">
        Scroll
      </div>
      </div>
      </div>
    </section>
  );
}
