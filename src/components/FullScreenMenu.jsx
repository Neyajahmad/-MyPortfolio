import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuCursor } from './MenuCursor';

export function FullScreenMenu({ isOpen, onClose }) {
  const [hoveringItem, setHoveringItem] = useState(false);

  const menuLinks = [
    { name: 'HOME', href: '#' },
    { name: 'PROJECTS', href: '#projects-scroll' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'HACKATHONS', href: '#timeline' },
    { name: 'ABOUT', href: '#education' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black text-background flex flex-col"
          // Hide native cursor while the spotlight is active
          style={{ cursor: 'none' }}
        >
          {/* Spotlight cursor — mounted inside; only tracks when menu is visible */}
          <MenuCursor isHoveringItem={hoveringItem} />

          {/* Top Bar spacer — Navbar logo shows through at z-[110] */}
          <div className="h-32 md:h-40 shrink-0" />

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12 pt-8 md:pt-16">
            <nav className="flex flex-col items-center md:items-end w-full gap-2 md:gap-4">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                  onMouseEnter={() => setHoveringItem(true)}
                  onMouseLeave={() => setHoveringItem(false)}
                  whileHover={{ scale: 1.02, x: -6 }}
                  className="font-serif font-bold uppercase leading-[0.85] tracking-tighter hover:italic transition-all duration-300 transform origin-right md:origin-right origin-center w-full text-center md:text-right"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', cursor: 'none' }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
