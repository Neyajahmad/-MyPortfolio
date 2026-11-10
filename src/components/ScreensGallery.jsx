import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { DeviceFrame } from './DeviceFrame';
import { frameUrl } from '../utils/project';

/** Horizontal, snap-scrolling strip of every screen. Click one to open it full screen. */
export function ScreensGallery({ project, images, onOpen }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-card]');
    track.scrollBy({ left: dir * ((card?.offsetWidth || 600) + 24), behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-6">
        <p className="font-light text-text/60">
          {images.length} screens. Scroll sideways or open one full screen.
        </p>
        <div className="hidden gap-2 md:flex">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              onClick={() => scrollBy(dir)}
              aria-label={dir < 0 ? 'Previous screens' : 'Next screens'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-text/15 transition-colors duration-300 hover:border-text hover:bg-text hover:text-background"
            >
              {dir < 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-5 -mb-10 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto scroll-smooth px-5 pb-14 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <motion.button
            key={src}
            data-card
            type="button"
            onClick={() => onOpen(i)}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative w-[85%] shrink-0 cursor-zoom-in snap-start text-left md:w-[62%] lg:w-[48%]"
            aria-label={`Open screen ${i + 1} full screen`}
          >
            <DeviceFrame
              src={src}
              alt={`${project.title} screen ${i + 1}`}
              url={frameUrl(project)}
              className="shadow-[0_18px_36px_-18px_rgba(26,26,26,0.4)] transition-shadow duration-500 group-hover:shadow-[0_28px_50px_-20px_rgba(26,26,26,0.5)]"
            />
            <span className="mt-4 flex items-center justify-between font-mono text-xs text-text/40">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span className="flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 size={12} /> Expand
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
