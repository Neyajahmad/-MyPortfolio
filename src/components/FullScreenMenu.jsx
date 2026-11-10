import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuCursor } from './MenuCursor';
import { useScrollToId } from '../utils/useScrollToId';

export function FullScreenMenu({ isOpen, onClose }) {
  const [hoveringItem, setHoveringItem] = useState(false);
  const scrollToId = useScrollToId();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Close the menu, then glide to the section (or open the home page at it)
  const go = (e, href) => {
    e.preventDefault();
    onClose();
    const id = href.replace('#', '');
    setTimeout(() => {
      if (pathname !== '/') navigate('/', id ? { state: { scrollTo: id } } : undefined);
      else scrollToId(id);
    }, 450);
  };

  const menuLinks = [
    { name: 'HOME', href: '#' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
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
          className="fixed inset-0 z-[100] bg-ink text-background flex flex-col"
          // Hide native cursor while the spotlight is active
          style={{ cursor: 'none' }}
        >
          {/* Spotlight cursor: mounted inside; only tracks when menu is visible */}
          <MenuCursor isHoveringItem={hoveringItem} />

          {/* Top Bar spacer: Navbar logo shows through at z-[110] */}
          <div className="h-32 md:h-40 shrink-0" />

          {/* Menu Items */}
          {/* data-lenis-prevent: Lenis is paused while the menu is open and would otherwise swallow wheel/touch scrolling here */}
          <div data-lenis-prevent="" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 md:px-12 pb-12 pt-4 md:pt-8">
            <nav className="flex flex-col items-center md:items-end w-full gap-2 md:gap-4">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                  onMouseEnter={() => setHoveringItem(true)}
                  onMouseLeave={() => setHoveringItem(false)}
                  whileHover={{ scale: 1.02, x: -6 }}
                  className="font-serif font-bold uppercase leading-[0.85] tracking-tighter hover:italic transition-all duration-300 transform origin-right md:origin-right origin-center w-full text-center md:text-right"
                  style={{ fontSize: 'clamp(2.5rem, min(9vw, 7.5vh), 8rem)', cursor: 'none' }}
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
