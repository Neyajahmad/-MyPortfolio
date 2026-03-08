import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/mockData';
import { Container } from '../components/Container';
import { ImageGallery } from '../components/ImageGallery';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SpotlightCursor } from '../components/SpotlightCursor';

export function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll on load
  }, [id]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.article 
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen pt-32 md:pt-48 pb-32 relative"
    >
      <SpotlightCursor parentRef={pageRef} />
      <Container>
        {/* Back Link Component */}
        <button 
          onClick={() => navigate(-1)}
          className="relative z-[120] inline-flex items-center gap-2 text-text/50 hover:text-text uppercase tracking-widest text-xs font-semibold pb-12 transition-colors mb-4 md:mb-12 group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Works
        </button>
        
        {/* Project Hero Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-24">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1]"
            >
              {project.title.split(' \u2013 ')[0]}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-text/60 font-light max-w-2xl leading-relaxed"
            >
              {project.description}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-4 text-sm tracking-wide shrink-0"
          >
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sag group border-b border-text/10 pb-2 w-max transition-colors">
                Live Site <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sage group w-max transition-colors">
                GitHub <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Dynamic Image Gallery */}
        <ImageGallery images={project.gallery || [project.image]} altText={project.title} />

        {/* Editorial Text Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mt-24 md:mt-40">
           {/* Left Sidebar Info */}
           <div className="lg:col-span-4 flex flex-col gap-12">
             {/* Tech Stack */}
             <div>
               <h3 className="uppercase tracking-widest text-xs font-semibold text-text/50 mb-6 border-b border-text/10 pb-4">Technologies</h3>
               <div className="flex flex-col gap-2 font-medium">
                 {project.techStack.map(tech => (
                   <span key={tech} className="text-text/80">{tech}</span>
                 ))}
               </div>
             </div>

             {/* Deployment info if available */}
             {project.deployment && (
                <div>
                  <h3 className="uppercase tracking-widest text-xs font-semibold text-text/50 mb-6 border-b border-text/10 pb-4">Deployment</h3>
                  <div className="flex flex-col gap-2 font-medium">
                    {Object.entries(project.deployment).map(([key, val]) => (
                      <span key={key} className="text-text/80 capitalize">{key}: <span className="font-light">{val}</span></span>
                    ))}
                  </div>
                </div>
             )}
           </div>

           {/* Core Case Study Columns */}
           <div className="lg:col-span-8 flex flex-col gap-20">
              
              {/* Problem/Solution split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-serif text-3xl mb-6">The Problem.</h3>
                  <p className="text-text/70 font-light leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <h3 className="font-serif text-3xl mb-6">The Solution.</h3>
                  <p className="text-text/70 font-light leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Core Features */}
              {project.features && (
                <div>
                  <h3 className="font-serif text-3xl mb-8">Key Features.</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex gap-4 items-start border-t border-text/10 pt-4">
                        <span className="text-xs font-mono text-terracotta mt-1">0{i + 1}</span>
                        <span className="text-text/80 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Workflow / Architecture */}
              {project.workflow && (
                <div>
                  <h3 className="font-serif text-3xl mb-8">System Workflow & Architecture.</h3>
                  <div className="flex flex-col gap-6 pl-6 border-l w-full border-text/10 relative">
                    {project.workflow.map((step, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-2 w-3 h-3 bg-background border border-terracotta rounded-full" />
                        <p className="text-text/80 font-light text-lg">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

           </div>
        </div>

      </Container>
    </motion.article>
  );
}
