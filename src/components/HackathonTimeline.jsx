import React from 'react';
import { motion } from 'framer-motion';

export function HackathonTimeline({ events }) {
  return (
    <div className="flex flex-col border-l border-text/10 ml-4 md:ml-0 md:border-l-0">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative pl-8 md:pl-0 md:border-l md:border-text/10 md:ml-[20%] flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-16 group"
        >
          {/* Mobile Dot */}
          <div className="absolute left-[-5px] top-12 w-[10px] h-[10px] rounded-full bg-text md:hidden" />
          
          {/* Desktop Line connection (optional styling for editorial feel) */}
          <div className="hidden md:block absolute left-[-1px] top-0 bottom-0 w-[1px] bg-text/30 origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-in-out" />

          {/* Year */}
          <div className="md:w-32 md:-ml-[calc(8rem+48px)] flex-shrink-0 md:text-right">
            <span className="font-serif text-4xl md:text-6xl text-text/30 group-hover:text-terracotta transition-colors duration-500">
              {event.year}
            </span>
          </div>

          <div className="flex flex-col gap-4 max-w-2xl md:pl-12">
            <h3 className="font-serif text-2xl md:text-3xl">{event.title}</h3>
            {event.tag && (
              <span className="inline-flex items-center px-3 py-1 text-xs uppercase tracking-widest text-text border border-text/20 rounded-full w-max">
                {event.tag}
              </span>
            )}
            <p className="text-text/70 leading-relaxed font-light mt-2">
              {event.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
