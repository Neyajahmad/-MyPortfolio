import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
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

export function Skills() {
  return (
    <Section id="skills" className="border-t border-text/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="font-serif text-4xl md:text-5xl">Capabilities.</h2>
          <p className="mt-6 text-text/60 font-light leading-relaxed">
            A precise skill set curated for building efficient and scalable digital products.
          </p>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12 md:pl-12">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-6"
            >
              <h3 className="uppercase tracking-widest text-xs font-semibold text-text/50">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map(item => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 border border-text/20 px-4 py-2 rounded-full text-sm hover:border-text hover:bg-text hover:text-background transition-all duration-300 font-light cursor-default"
                  >
                    <span className="flex items-center flex-shrink-0">
                      <SkillIcon name={item} />
                    </span>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
