import React from 'react';
import { Section } from '../components/Section';
import { HackathonTimeline } from '../components/HackathonTimeline';
import { hackathons } from '../data/mockData';

export function Timeline() {
  return (
    <Section id="timeline" className="border-t border-text/10">
      <div className="w-full mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <h2 className="font-serif text-5xl md:text-7xl">Impact & Recognition.</h2>
        </div>
        <p className="max-w-md text-text/60 font-light leading-relaxed text-right md:text-left self-end">
          Events where I pushed my limits and collaborated under pressure to build valuable solutions.
        </p>
      </div>

      <HackathonTimeline events={hackathons} />
    </Section>
  );
}
