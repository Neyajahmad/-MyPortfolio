import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

/**
 * ProjectRow — Single hoverable full-width project entry.
 * On hover, a floating image preview follows the mouse similar to the Ousmane Dembele site.
 */
function ProjectRow({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Mouse-following image preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-b border-text/10 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Hover fill from left */}
      <motion.div
        className="absolute inset-0 bg-text pointer-events-none z-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />

      {/* Row content */}
      <div
        className="relative z-10 flex items-center justify-between w-full py-6 md:py-8 px-0 cursor-pointer"
        onClick={() => project.id && navigate(`/project/${project.id}`)}
      >
        {/* Index + Title */}
        <div className="flex items-center gap-6 md:gap-12">
          <span
            className="text-xs font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? '#ffffff' : 'color-mix(in srgb, var(--color-text) 30%, transparent)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2
            className="font-serif text-2xl md:text-4xl lg:text-6xl transition-colors duration-300 leading-none"
            style={{ color: isHovered ? '#ffffff' : 'var(--color-text)' }}
          >
            {project.title.split(' \u2013 ')[0]}
          </h2>
        </div>

        {/* Tech Stack + Arrow */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          <span
            className="hidden md:block text-xs uppercase tracking-widest font-medium transition-colors duration-300"
            style={{ color: isHovered ? '#ffffff' : 'color-mix(in srgb, var(--color-text) 50%, transparent)' }}
          >
            {project.techStack.slice(0, 2).join(' · ')}
          </span>
          <span
            className="hidden sm:block text-xs uppercase tracking-widest font-medium transition-colors duration-300 opacity-60"
            style={{ color: isHovered ? '#ffffff' : 'var(--color-text)' }}
          >
            {project.subtitle || 'Web App'}
          </span>
          <ArrowUpRight
            size={20}
            className="transition-all duration-300"
            style={{ color: isHovered ? '#ffffff' : 'var(--color-text)' }}
          />
        </div>
      </div>

      {/* Mouse-following floating image preview — hidden on touch/mobile */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, scale: 0.6, rotate: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: springX,
              top: springY,
              translateX: '-50%',
              translateY: '-55%',
              pointerEvents: 'none',
              zIndex: 50
            }}
            className="hidden md:block w-48 md:w-72 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover brightness-95 contrast-110"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * AllProjects — Ousmane/Lucie Morel style editorial project list page.
 */
export function AllProjects() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen relative bg-background"
    >
      {/* Page Header */}
      <div className="w-full px-4 md:px-12 pt-36 md:pt-44 pb-12 md:pb-16 border-b border-text/10">
        <div className="max-w-[1400px] mx-auto flex items-end justify-between gap-8">
          
          <div className="flex flex-col gap-6">
            <button
              onClick={() => navigate('/')}
              className="relative z-[120] inline-flex items-center gap-2 text-text/50 hover:text-text uppercase tracking-widest text-xs font-semibold transition-colors group w-max cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-none">
              All Projects.
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:block text-text/50 font-light max-w-xs text-right leading-relaxed text-sm"
          >
            A complete archive of web applications, interfaces, and technical experiments.
          </motion.p>
        </div>
      </div>

      {/* Project List */}
      <div className="w-full px-4 md:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Large Footer Typography (Ousmane-style massive background text) */}
      <div className="w-full overflow-hidden pointer-events-none select-none">
        <p className="font-serif font-bold text-[12vw] md:text-[10vw] text-text/[0.04] tracking-tighter whitespace-nowrap px-4 md:px-12">
          Neyaj Ahmad Dev
        </p>
      </div>
    </motion.main>
  );
}
