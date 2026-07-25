import React, { useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { EditorialHero } from '../sections/EditorialHero';
import { ScrollProjects } from '../components/ScrollProjects';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Skills } from '../sections/Skills';
import { Timeline } from '../sections/Timeline';
import { Education } from '../sections/Education';
import { Experience } from '../sections/Experience';
import { AnimatedSection } from '../components/AnimatedSection';

export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full">
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <EditorialHero />
      </AnimatedSection>
      
      {/* 400vh Sticky Scroll Presentation */}
      <ScrollProjects />

      {/* Breakout CTA for all projects */}
      <div className="w-full bg-[#f4f4f4] py-20 flex justify-center mix-blend-normal">
        <Link 
          to="/projects"
          className="group inline-flex items-center gap-4 bg-text text-background rounded-full px-8 py-4 font-semibold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
          View More Projects
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <AnimatedSection>
        <Experience />
      </AnimatedSection>
      <AnimatedSection>
        <Skills />
      </AnimatedSection>
      <AnimatedSection>
        <Timeline />
      </AnimatedSection>
      <AnimatedSection>
        <Education />
      </AnimatedSection>
    </main>
  );
}
