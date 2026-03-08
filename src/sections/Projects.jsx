import React from 'react';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/mockData';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Projects() {
  return (
    <Section id="projects" className="border-t border-text/10 pt-32">
      <div className="flex flex-col gap-8 mb-20 md:mb-32">
        <h2 className="font-serif text-5xl md:text-7xl">Selected Works.</h2>
        <p className="max-w-xl text-text/60 font-light leading-relaxed text-lg">
          A collection of digital platforms built with a focus on performance, architecture, and user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-20 flex justify-center w-full">
        <Link 
          to="/projects"
          className="group inline-flex items-center gap-4 bg-text text-background rounded-full px-8 py-4 font-semibold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
          View More Projects
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </Section>
  );
}
