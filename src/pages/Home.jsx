import React, { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Hero } from '../sections/Hero';
import { EditorialHero } from '../sections/EditorialHero';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';
import { Timeline } from '../sections/Timeline';
import { Education } from '../sections/Education';
import { Experience } from '../sections/Experience';
import { AnimatedSection } from '../components/AnimatedSection';
import { layoutTop } from '../utils/useScrollToId';

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  // Read once on mount: clearing the state below must not re-trigger a scroll.
  const [scrollTarget] = useState(() => location.state?.scrollTo);

  useLayoutEffect(() => {
    const el = scrollTarget && document.getElementById(scrollTarget);
    if (el) {
      window.scrollTo({ top: layoutTop(el), behavior: 'instant' });
      // Clear the state so a page refresh starts from the top again
      navigate('.', { replace: true, state: null });
    } else {
      window.scrollTo(0, 0);
    }
  }, [scrollTarget, navigate]);

  return (
    <main className="w-full">
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <EditorialHero />
      </AnimatedSection>
      
      <Projects />

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
