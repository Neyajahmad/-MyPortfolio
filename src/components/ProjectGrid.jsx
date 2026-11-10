import React, { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { cn } from './Container';

/**
 * Filterable grid of project cards.
 * `limit` caps how many cards show until the visitor expands the list.
 */
export function ProjectGrid({ projects, limit }) {
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );
  const [active, setActive] = useState('All');
  const [expanded, setExpanded] = useState(false);

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);
  const canCollapse = limit && filtered.length > limit;
  const visible = canCollapse && !expanded ? filtered.slice(0, limit) : filtered;

  const counts = useMemo(() => {
    const c = { All: projects.length };
    projects.forEach((p) => { c[p.category] = (c[p.category] || 0) + 1; });
    return c;
  }, [projects]);

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {/* Filters */}
      <div role="tablist" aria-label="Filter projects" className="-mx-1 flex flex-wrap gap-2">
        <LayoutGroup id="project-filters">
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => { setActive(cat); setExpanded(false); }}
                className={cn(
                  'relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-300',
                  isActive ? 'text-background' : 'text-text/60 hover:text-text'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-text"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  {cat}
                  <span className={cn('ml-1.5 font-mono', isActive ? 'text-background/60' : 'text-text/30')}>
                    {counts[cat]}
                  </span>
                </span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-y-16">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {canCollapse && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-text/15 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-text transition-all duration-300 hover:border-text hover:bg-text hover:text-background"
          >
            {expanded ? 'Show less' : `Show all ${filtered.length} projects`}
          </button>
        </div>
      )}
    </div>
  );
}
