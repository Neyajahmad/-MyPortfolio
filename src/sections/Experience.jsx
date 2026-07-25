import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { experience } from '../data/mockData';

export function Experience() {
  return (
    <Section id="experience" className="border-t border-text/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div className="md:col-span-1">
          <h2 className="font-serif text-4xl md:text-5xl">Experience.</h2>
          <p className="mt-6 text-text/60 font-light leading-relaxed">
            Professional roles where I've applied and grown my engineering skills.
          </p>
        </div>

        <div className="md:col-span-2 flex flex-col gap-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-4 pb-12 border-b border-text/10 last:border-0"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="font-serif text-2xl md:text-3xl">{exp.role}</h3>
                <span className="text-sm font-light text-text/40 uppercase tracking-widest">
                  {exp.period}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-text/60 font-light">
                <span className="text-lg">{exp.company}</span>
                <span className="opacity-40">•</span>
                <span>{exp.type}</span>
              </div>

              <span className="text-sm font-light text-text/40 uppercase tracking-widest">
                {exp.location}
                {exp.mode ? ` • ${exp.mode}` : ''}
              </span>

              <ul className="flex flex-col gap-3 mt-4">
                {exp.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-xs font-mono text-terracotta mt-1">0{i + 1}</span>
                    <span className="text-text/80 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
