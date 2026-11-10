import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionHeader } from '../components/SectionHeader';
import { experience } from '../data/mockData';

const ease = [0.16, 1, 0.3, 1];

function ExperienceEntry({ exp }) {
  return (
    <article className="flex flex-col gap-10">
      {/* Role header */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {exp.current && (
            <span className="inline-flex items-center gap-2 rounded-full bg-sage/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-text/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              Current
            </span>
          )}
          <span className="font-mono text-xs uppercase tracking-widest text-text/40">{exp.period}</span>
        </div>

        <h3 className="font-serif text-3xl leading-tight md:text-5xl">
          {exp.role} <span className="text-text/40">at</span> {exp.company}
        </h3>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-light text-text/60">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-text/40" /> {exp.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase size={14} className="text-text/40" /> {exp.type}{exp.mode ? ` · ${exp.mode}` : ''}
          </span>
        </div>

        {exp.summary && (
          <p className="max-w-2xl text-lg font-light leading-relaxed text-text/70">{exp.summary}</p>
        )}
      </header>

      {/* Impact numbers */}
      {exp.stats?.length > 0 && (
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-text/10 md:grid-cols-4">
          {exp.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="flex flex-col gap-1 border-text/10 p-5 md:p-6 [&:nth-child(odd)]:border-r md:[&:not(:last-child)]:border-r [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
            >
              <dt className="order-2 text-xs font-light leading-snug text-text/50">{s.label}</dt>
              <dd className="order-1 font-serif text-3xl text-terracotta md:text-4xl">{s.value}</dd>
            </motion.div>
          ))}
        </dl>
      )}

      {/* What I built */}
      <ol className="flex flex-col">
        {exp.highlights.map((h, i) => (
          <motion.li
            key={h.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-text/10 py-6 last:border-b md:grid-cols-[3.5rem_1fr]"
          >
            <span className="pt-1 font-mono text-xs text-terracotta">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2">
              <h4 className="font-sans text-base font-medium text-text md:text-lg">{h.title}</h4>
              <p className="font-light leading-relaxed text-text/65">{h.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Stack */}
      {exp.stack?.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-text/40">Tools &amp; Stack</span>
          <ul className="flex flex-wrap gap-2">
            {exp.stack.map((t) => (
              <li key={t} className="rounded-full border border-text/10 px-3 py-1 text-xs text-text/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="w-full scroll-mt-32 border-t border-text/10 bg-background py-24 text-text md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                index="02"
                eyebrow="Career"
                title="Experience"
                layout="stack"
                description="Shipping Python and Node.js services, Dockerised evaluation harnesses and the benchmarks behind LLM post-training."
              />
            </div>
          </div>

          <div className="flex flex-col gap-20 lg:col-span-8">
            {experience.map((exp) => (
              <ExperienceEntry key={`${exp.company}-${exp.role}`} exp={exp} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
