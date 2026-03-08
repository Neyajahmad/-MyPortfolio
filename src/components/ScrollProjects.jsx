import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '../data/mockData';
import { ProjectActions } from './ProjectActions';

// Manually curated layout positions for up to 7 featured projects
// We map them across the screen organically to recreate Antonsson's scattered portfolio look.
const layoutConfig = [
  { left: '10%', top: '15%',  rotate: -6, appear: 0.0, disappear: 0.25 },
  { left: '55%', top: '25%',  rotate: 4,  appear: 0.1, disappear: 0.35 },
  { left: '5%',  top: '45%',  rotate: -3, appear: 0.2, disappear: 0.45 },
  { left: '45%', top: '60%',  rotate: 5,  appear: 0.3, disappear: 0.55 },
  { left: '20%', top: '10%',  rotate: -4, appear: 0.4, disappear: 0.65 },
  { left: '60%', top: '50%',  rotate: -5, appear: 0.5, disappear: 0.75 },
  { left: '15%', top: '65%',  rotate: 6,  appear: 0.6, disappear: 0.85 },
];

function ScrollProjectCard({ project, config, scrollYProgress }) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Define the opacity sequence
  const opacity = useTransform(
    scrollYProgress,
    [
      config.appear - 0.05, // Start fading in slightly before appear mark
      config.appear + 0.05, // Fully visible
      config.disappear - 0.05, // Start fading out
      config.disappear + 0.05 // Fully hidden
    ],
    [0, 1, 1, 0]
  );
  
  // Y-axis slide sequence (enter from bottom, leave to top)
  const y = useTransform(
    scrollYProgress,
    [
      config.appear - 0.05,
      config.appear + 0.05,
      config.disappear - 0.05,
      config.disappear + 0.05
    ],
    [100, 0, 0, -100]
  );

  // Scale sequence (slight pop-in effect)
  const scale = useTransform(
    scrollYProgress,
    [
      config.appear - 0.05,
      config.appear + 0.05,
      config.disappear - 0.05,
      config.disappear + 0.05
    ],
    [0.9, 1, 1, 0.9]
  );

  // Quick safety check: if we have more projects than config, fallback to center
  const left = config?.left || '35%';
  const top = config?.top || '35%';
  const staticRotation = config?.rotate || 0;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        top,
        opacity,
        y,
        scale,
        rotate: staticRotation,
        zIndex: Math.floor(config.appear * 100) // Layer newer cards on top naturally
      }}
      className="w-[85vw] max-w-[280px] md:max-w-[400px] lg:max-w-[450px] aspect-[4/5] rounded-2xl shadow-2xl overflow-hidden cursor-crosshair will-change-[transform,opacity]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full h-full group"
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
        
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover" 
        />

        {/* Action Pills */}
        <ProjectActions project={project} isHovered={isHovered} />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col pointer-events-none">
          <h3 className="font-serif text-lg md:text-2xl lg:text-3xl text-white drop-shadow-md leading-tight mb-2 line-clamp-2">
            {project.title.split(' \u2013 ')[0]}
          </h3>
          <div className="flex flex-wrap gap-2 text-[10px] md:text-xs uppercase tracking-widest text-white/80 font-medium">
            {project.techStack.slice(0, 3).join(' \u2022 ')}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ScrollProjects() {
  const containerRef = useRef(null);
  
  // Create a 400vh container. We take 7 projects to scrub through.
  const featuredProjects = projects.slice(0, 7);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Adding the premium spring easing the user requested
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      id="projects-scroll" 
      ref={containerRef} 
      className="relative w-full bg-[#f4f4f4] text-black"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Title - stays fixed in center while images fly over it */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-4">
          <h2 className="font-serif text-6xl md:text-8xl lg:text-[10rem] opacity-5 tracking-tighter text-center leading-none">
            All Projects
          </h2>
        </div>

        {/* Project Cards */}
        {featuredProjects.map((project, index) => {
          // Wrap around config if we somehow have more than 7, though we sliced it to 7
          const config = layoutConfig[index % layoutConfig.length];
          return (
            <ScrollProjectCard 
              key={project.id} 
              project={project} 
              config={config} 
              scrollYProgress={smoothProgress} 
            />
          );
        })}

      </div>
    </section>
  );
}
