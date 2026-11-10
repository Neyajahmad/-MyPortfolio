import React from 'react';
import { Container } from '../components/Container';
import { ProjectGrid } from '../components/ProjectGrid';
import { SectionHeader } from '../components/SectionHeader';
import { projects } from '../data/mockData';

export function Projects() {
  return (
    <section id="projects" className="w-full scroll-mt-32 border-t border-text/10 bg-background py-24 md:py-32">
      <Container>
        <SectionHeader
          index="01"
          eyebrow="Selected Work"
          title="Projects"
          description="Full stack platforms, Android apps and interfaces. Open any project for the problem, the build and the results."
          className="mb-12 md:mb-16"
        />

        <ProjectGrid projects={projects} limit={6} />
      </Container>
    </section>
  );
}
