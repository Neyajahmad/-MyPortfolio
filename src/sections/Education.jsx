import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { SectionHeader } from '../components/SectionHeader';
import { education } from '../data/mockData';

export function Education() {
  return (
    <Section id="education" className="border-t border-text/10 pb-32">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
        <div className="md:col-span-1">
          <div className="md:sticky md:top-32">
            <SectionHeader index="05" eyebrow="Academics" title="Education" layout="stack" />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-12">
          {education.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-2 pb-12 border-b border-text/10 last:border-0"
            >
              <h3 className="font-serif text-2xl md:text-3xl transition-colors duration-300 group-hover:text-terracotta">{edu.institution}</h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between text-text/60 font-light mt-2 gap-2">
                <span className="text-lg">{edu.degree}</span>
                <span className="font-display tracking-[0.12em] text-text/70">{edu.score}</span>
              </div>
              {edu.period && (
                <span className="text-sm font-light text-text/40 mt-1 uppercase tracking-widest">
                  {edu.period}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
