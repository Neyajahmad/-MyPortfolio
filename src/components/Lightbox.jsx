import React, { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

/**
 * Full-screen image viewer. `index` is the open image (null = closed).
 * Esc closes, arrow keys move between images.
 */
export function Lightbox({ images, index, onClose, onChange, alt }) {
  const open = index !== null && index !== undefined;
  const many = images.length > 1;
  const lenis = useLenis();

  const step = useCallback(
    (dir) => onChange((index + dir + images.length) % images.length),
    [index, images.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (many && e.key === 'ArrowRight') step(1);
      if (many && e.key === 'ArrowLeft') step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, many, step, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} screenshot ${index + 1} of ${images.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md md:p-12"
          onClick={onClose}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${alt} screenshot ${index + 1}`}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            <X size={20} />
          </button>

          {many && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
              >
                <ChevronRight size={22} />
              </button>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-white/60">
                {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
