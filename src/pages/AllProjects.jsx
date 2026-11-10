import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProjectGrid } from '../components/ProjectGrid';

/**
 * AllProjects: full, filterable archive of every project.
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
      <div className="w-full px-6 md:px-12 lg:px-20 pt-36 md:pt-44 pb-12 md:pb-16 border-b border-text/10">
        <div className="max-w-[87.5rem] mx-auto flex items-end justify-between gap-8">
          
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
      <div className="w-full px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-32">
        <div className="max-w-[87.5rem] mx-auto">
          <ProjectGrid projects={projects} />
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
