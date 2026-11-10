import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/mockData';
import { Container } from '../components/Container';
import { SpotlightCursor } from '../components/SpotlightCursor';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { ScreensGallery } from '../components/ScreensGallery';
import { DeviceFrame } from '../components/DeviceFrame';
import { Lightbox } from '../components/Lightbox';
import { shortTitle } from '../utils/project';

const ease = [0.16, 1, 0.3, 1];

/** Title that rises word by word from behind a mask. */
function RevealTitle({ text }) {
  return (
    <h1 aria-label={text} className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden="true" className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** One numbered case-study section with a sticky label on wide screens. */
function Block({ num, label, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease }}
      className="grid grid-cols-1 gap-6 border-t border-text/10 pt-10 lg:grid-cols-12 lg:gap-16 md:pt-14"
    >
      <div className="lg:col-span-3">
        <div className="flex items-center gap-3 lg:sticky lg:top-36">
          <span className="font-mono text-xs text-terracotta">{num}</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-text/50">{label}</span>
        </div>
      </div>
      <div className="lg:col-span-9">
        {title && <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl">{title}</h2>}
        {children}
      </div>
    </motion.section>
  );
}

/** Workflow steps on a line that draws itself as you scroll. */
function Workflow({ steps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative pl-12">
      <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-text/10" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-3 left-[13px] top-3 w-px origin-top bg-terracotta"
      />
      {steps.map((step, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="relative pb-9 last:pb-0"
        >
          <motion.span
            initial={{ scale: 0.4, backgroundColor: '#F9F8F6', color: '#C76A4A' }}
            whileInView={{ scale: 1, backgroundColor: '#C76A4A', color: '#F9F8F6' }}
            viewport={{ once: true, margin: '-35% 0px -35% 0px' }}
            transition={{ duration: 0.5, ease }}
            className="absolute -left-12 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-terracotta font-mono text-[10px]"
          >
            {i + 1}
          </motion.span>
          <p className="pt-0.5 text-lg font-light leading-relaxed text-text/80">{step}</p>
        </motion.li>
      ))}
    </ol>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const pop = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

export function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [lightbox, setLightbox] = useState(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Return to the list the visitor came from: the All Projects page,
  // or the Projects section of the home page.
  const goBack = () => {
    if (from === '/projects') navigate('/projects');
    else navigate('/', { state: { scrollTo: 'projects' } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const images = project.gallery?.length ? project.gallery : [project.image];
  const title = shortTitle(project.title);
  const onPlayStore = project.live?.includes('play.google');

  const facts = [
    { label: 'Category', value: project.category },
    project.year && { label: 'Year', value: project.year },
    {
      label: 'Platform',
      value: project.deployment
        ? Object.values(project.deployment).join(' + ')
        : project.category === 'Android'
          ? onPlayStore ? 'Android · Play Store' : 'Android'
          : 'Web',
    },
    { label: 'Stack', value: `${project.techStack.length} technologies` },
  ].filter(Boolean);

  // Case-study sections, numbered in the order they appear
  const sections = [];
  if (project.problem || project.solution) sections.push('overview');
  if (project.highlights?.length) sections.push('highlights');
  if (project.features?.length) sections.push('features');
  if (project.workflow?.length) sections.push('workflow');
  sections.push('stack');
  if (images.length > 1) sections.push('screens');
  const num = (key) => String(sections.indexOf(key) + 1).padStart(2, '0');

  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        ref={pageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen w-full pb-32 pt-32 md:pt-44"
      >
        {/* Reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="fixed left-0 right-0 top-0 z-[130] h-[3px] origin-left bg-terracotta"
        />
        <SpotlightCursor parentRef={pageRef} />

        <Container>
          {/* Back */}
          <motion.button
            onClick={goBack}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="group relative z-[120] mb-10 inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text/50 transition-colors hover:text-text md:mb-14"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Works
          </motion.button>

          {/* Hero */}
          <header className="mb-14 flex flex-col gap-8 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-text/50"
            >
              <span className="font-mono text-terracotta">
                {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <span className="h-px w-8 bg-text/20" />
              <span>{project.subtitle}</span>
            </motion.div>

            <RevealTitle text={title} />

            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease }}
                className="max-w-2xl text-lg font-light leading-relaxed text-text/60 md:text-2xl"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease }}
                className="flex shrink-0 flex-wrap gap-3"
              >
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-text px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-background shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    {onPlayStore ? 'Google Play' : 'Live site'}
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-text/15 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-text transition-all duration-300 hover:-translate-y-0.5 hover:border-text"
                  >
                    <Github size={15} /> Source
                  </a>
                )}
              </motion.div>
            </div>
          </header>

          {/* Showcase */}
          <ProjectShowcase project={project} image={images[0]} onOpen={() => setLightbox(0)} />

          {/* Quick facts */}
          <motion.dl
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-text/10 md:mt-14 md:grid-cols-4"
          >
            {facts.map((f) => (
              <motion.div key={f.label} variants={pop} className="flex flex-col gap-1.5 bg-background p-5 md:p-7">
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-text/40">{f.label}</dt>
                <dd className="font-serif text-lg leading-snug md:text-2xl">{f.value}</dd>
              </motion.div>
            ))}
          </motion.dl>

          {/* Case study */}
          <div className="mt-24 flex flex-col gap-20 md:mt-36 md:gap-28">
            {sections.includes('overview') && (
              <Block num={num('overview')} label="Overview" title="Why it exists.">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[
                    { label: 'The problem', text: project.problem },
                    { label: 'The solution', text: project.solution },
                  ]
                    .filter((c) => c.text)
                    .map((c, i) => (
                      <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, delay: i * 0.12, ease }}
                        className={
                          i === 0
                            ? 'rounded-2xl border border-text/10 p-7 md:p-9'
                            : 'rounded-2xl bg-ink p-7 text-background md:p-9'
                        }
                      >
                        <span className={`text-xs font-semibold uppercase tracking-widest ${i === 0 ? 'text-text/40' : 'text-background/50'}`}>
                          {c.label}
                        </span>
                        <p className={`mt-4 text-lg font-light leading-relaxed ${i === 0 ? 'text-text/75' : 'text-background/85'}`}>
                          {c.text}
                        </p>
                      </motion.div>
                    ))}
                </div>
              </Block>
            )}

            {sections.includes('highlights') && (
              <Block num={num('highlights')} label="Highlights" title="Results and impact.">
                <ul className="flex flex-col">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, delay: i * 0.06, ease }}
                      className="group flex items-start gap-5 border-b border-text/10 py-5 first:border-t"
                    >
                      <span className="mt-1.5 font-mono text-xs text-terracotta">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-lg font-light leading-relaxed text-text/80 transition-transform duration-300 group-hover:translate-x-1">
                        {h}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Block>
            )}

            {sections.includes('features') && (
              <Block num={num('features')} label="Features" title="What it does.">
                <motion.ul
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      variants={pop}
                      className="group flex items-start gap-4 rounded-xl border border-text/10 bg-white/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:bg-white hover:shadow-[0_20px_40px_-25px_rgba(26,26,26,0.35)]"
                    >
                      <span className="mt-0.5 font-mono text-xs text-terracotta">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-light leading-relaxed text-text/80">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </Block>
            )}

            {sections.includes('workflow') && (
              <Block num={num('workflow')} label="How it works" title="From input to result.">
                <Workflow steps={project.workflow} />
              </Block>
            )}

            <Block num={num('stack')} label="Tech stack" title="Built with.">
              <motion.ul
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="flex flex-wrap gap-2.5"
              >
                {project.techStack.map((tech) => (
                  <motion.li
                    key={tech}
                    variants={pop}
                    className="rounded-full border border-text/15 px-5 py-2.5 text-sm text-text/80 transition-colors duration-300 hover:border-text hover:bg-text hover:text-background"
                  >
                    {tech}
                  </motion.li>
                ))}
              </motion.ul>
              {project.deployment && (
                <p className="mt-6 text-sm font-light text-text/50">
                  Deployed with{' '}
                  {Object.entries(project.deployment)
                    .map(([k, v]) => `${v} (${k})`)
                    .join(' and ')}
                  .
                </p>
              )}
            </Block>

            {sections.includes('screens') && (
              <Block num={num('screens')} label="Screens" title="A closer look.">
                <ScreensGallery project={project} images={images} onOpen={setLightbox} />
              </Block>
            )}
          </div>

          {/* Next project */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="mt-28 md:mt-40"
          >
            <Link
              to={`/project/${next.id}`}
              state={{ from }}
              className="group relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[28px] bg-ink p-8 text-background md:grid-cols-2 md:p-14"
            >
              <div className="relative z-10 flex flex-col gap-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-background/50">Next project</span>
                <span className="font-serif text-4xl leading-none transition-colors duration-300 group-hover:text-terracotta md:text-6xl">
                  {shortTitle(next.title)}
                </span>
                <span className="font-light text-background/60">{next.subtitle}</span>
                <span className="mt-4 inline-flex w-max items-center gap-3 rounded-full border border-background/20 px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300 group-hover:border-background group-hover:bg-background group-hover:text-text">
                  View project
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
              <div className="relative mx-auto w-full max-w-[420px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-[-2deg] md:ml-auto md:mr-0">
                <DeviceFrame src={next.image} alt="" plain className="shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]" />
              </div>
            </Link>
          </motion.div>
        </Container>

        <Lightbox
          images={images}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onChange={setLightbox}
          alt={title}
        />
      </motion.article>
    </MotionConfig>
  );
}
