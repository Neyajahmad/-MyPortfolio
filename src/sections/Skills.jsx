import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { SectionHeader } from '../components/SectionHeader';
import { skills } from '../data/mockData';
import { Brain, BarChart2, Users } from 'lucide-react';

// Simple Icons CDN (https://simpleicons.org)
const techIcons = {
  'Java':          'https://cdn.simpleicons.org/openjdk',
  'JavaScript':    'https://cdn.simpleicons.org/javascript',
  'Python':        'https://cdn.simpleicons.org/python',
  'HTML':          'https://cdn.simpleicons.org/html5',
  'CSS':           'https://cdn.simpleicons.org/css',
  'Tailwind CSS':  'https://cdn.simpleicons.org/tailwindcss',
  'React':         'https://cdn.simpleicons.org/react',
  'Node.js':       'https://cdn.simpleicons.org/nodedotjs',
  'Express.js':    'https://cdn.simpleicons.org/express',
  'MongoDB':       'https://cdn.simpleicons.org/mongodb',
  'MySQL':         'https://cdn.simpleicons.org/mysql',
  'Git':           'https://cdn.simpleicons.org/git',
  'GitHub':        'https://cdn.simpleicons.org/github',
  'Android Studio':'https://cdn.simpleicons.org/androidstudio',
  'Docker':        'https://cdn.simpleicons.org/docker',
};

// Lucide icons for soft skills
const softIcons = {
  'Problem Solving':    <Brain size={14} strokeWidth={1.5} />,
  'Analytical Thinking': <BarChart2 size={14} strokeWidth={1.5} />,
  'Collaboration':      <Users size={14} strokeWidth={1.5} />,
};

function SkillIcon({ name }) {
  if (softIcons[name]) {
    return (
      <span className="opacity-60 flex items-center">
        {softIcons[name]}
      </span>
    );
  }
  if (techIcons[name]) {
    return (
      <img
        src={techIcons[name]}
        alt={name}
        width={14}
        height={14}
        className="opacity-70 object-contain flex-shrink-0"
        loading="lazy"
      />
    );
  }
  return null;
}

const ease = [0.16, 1, 0.3, 1];
const group = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
};

export function Skills() {
  return (
    <Section id="skills" className="border-t border-text/10">
      <SectionHeader
        index="03"
        eyebrow="Skills & Tools"
        title="Capabilities"
        description="A precise skill set curated for building efficient and scalable digital products."
        className="mb-14 md:mb-20"
      />

      <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items], idx) => (
          <div key={category} className="flex flex-col gap-5 border-t border-text/10 pt-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xs font-normal uppercase tracking-[0.2em] text-text/50">
                {category}
              </h3>
              <span className="font-mono text-xs text-terracotta">{String(idx + 1).padStart(2, '0')}</span>
            </div>
            <motion.ul
              variants={group}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-wrap gap-2.5"
            >
              {items.map((item) => (
                <motion.li
                  key={item}
                  variants={chip}
                  className="group flex cursor-default items-center gap-2 rounded-full border border-text/15 px-4 py-2 text-sm font-light transition-colors duration-300 hover:border-text hover:bg-text hover:text-background"
                >
                  <span className="flex flex-shrink-0 items-center grayscale transition-[filter] duration-300 group-hover:grayscale-0">
                    <SkillIcon name={item} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
