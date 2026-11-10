import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

/** Shown for any address that doesn't match a page. */
export function NotFound() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="flex min-h-screen w-full max-w-[87.5rem] flex-col justify-center px-6 pb-24 pt-40 md:px-12 lg:px-20">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="font-display text-xs uppercase tracking-[0.25em] text-terracotta"
      >
        Error 404
      </motion.span>

      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-display text-[28vw] font-medium leading-[0.9] tracking-tight text-text md:text-[16rem]"
        >
          404<span className="text-terracotta">.</span>
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease }}
        className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <p className="max-w-md text-lg font-light text-text/60">
          This page doesn't exist or has moved. Let's get you back to the work.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:bg-terracotta"
          >
            Back home
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/projects"
            className="flex items-center gap-2 rounded-full border border-text/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-text transition-colors hover:border-terracotta hover:text-terracotta"
          >
            All projects
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
