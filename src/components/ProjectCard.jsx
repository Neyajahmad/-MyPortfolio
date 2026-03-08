import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectActions } from './ProjectActions';

export function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-[560px] rounded-2xl overflow-hidden bg-text/5 cursor-crosshair">
        
        {/* Animated Image Layer */}
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'brightness(0.8)' : 'brightness(1)',
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Interactive Hover Pill Layer */}
        <ProjectActions project={project} isHovered={isHovered} />

        {/* Text Details (Always visible below or inside the card layout) */}
        <div className="absolute top-0 left-0 w-full p-8 bg-gradient-to-b from-black/60 to-transparent flex flex-col pointer-events-none">
           <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-md line-clamp-2">
             {project.title.split(' – ')[0]}
           </h3>
           <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-white/80 mt-2 font-medium">
             {project.techStack.slice(0, 3).join(' \u2022 ')}
           </div>
        </div>

      </div>
    </motion.div>
  );
}
