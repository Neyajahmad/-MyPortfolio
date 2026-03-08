import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProjectActions({ project, isHovered }) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <div className="bg-white rounded-full py-3 px-6 shadow-xl flex items-center gap-6 pointer-events-auto">
            
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black font-semibold uppercase tracking-widest text-xs hover:text-sag transition-colors flex items-center gap-1 group"
              >
                LIVE 
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}

            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black font-semibold uppercase tracking-widest text-xs hover:text-sage transition-colors flex items-center gap-1 group"
              >
                GITHUB
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}

            <Link 
              to={`/project/${project.id}`} 
              className="text-black font-semibold uppercase tracking-widest text-xs hover:text-terracotta transition-colors flex items-center gap-1 group border-l border-black/10 pl-6"
            >
              KNOW MORE
              <motion.span 
                className="inline-block ml-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                &rarr;
              </motion.span>
            </Link>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
