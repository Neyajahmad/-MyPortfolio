import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { shortTitle } from '../utils/project';

const ease = [0.16, 1, 0.3, 1];

/**
 * Minimal project card: cover image, title, one-line subtitle and a few tech tags.
 * The whole card links to the project's detail page.
 */
export function ProjectCard({ project, index = 0 }) {
  const { pathname } = useLocation();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.05, ease }}
    >
      <Link
        to={`/project/${project.id}`}
        state={{ from: pathname }}
        className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-label={`${shortTitle(project.title)}, view project details`}
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-text/5 ring-1 ring-text/10">
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

          {/* Category pill */}
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-text/70 backdrop-blur-sm">
            {project.category}
          </span>

          {/* Arrow that slides in on hover */}
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-text opacity-0 shadow-lg transition-all duration-500 -translate-y-1 translate-x-1 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2 pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-2xl leading-tight text-text transition-colors duration-300 group-hover:text-terracotta">
              {shortTitle(project.title)}
            </h3>
            {project.year && (
              <span className="shrink-0 font-mono text-xs text-text/40">{project.year}</span>
            )}
          </div>
          <p className="text-sm font-light leading-relaxed text-text/60 line-clamp-1">
            {project.subtitle}
          </p>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-text/10 px-2.5 py-0.5 text-[11px] text-text/60"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}
