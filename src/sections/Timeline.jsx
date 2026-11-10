import React from 'react';
import { Section } from '../components/Section';
import { SectionHeader } from '../components/SectionHeader';
import { HackathonTimeline } from '../components/HackathonTimeline';
import { hackathons } from '../data/mockData';

export function Timeline() {
  return (
    <Section id="timeline" className="border-t border-text/10">
      <SectionHeader
        index="04"
        eyebrow="Hackathons"
        title="Impact & Recognition"
        description="Events where I pushed my limits and collaborated under pressure to build valuable solutions."
        className="mb-12 md:mb-20"
      />

      <HackathonTimeline events={hackathons} />
    </Section>
  );
}
