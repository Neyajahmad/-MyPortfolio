import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { useLocation } from 'react-router-dom';

export function Navbar({ onMenuOpen, menuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Light text whenever the bar sits over a section marked data-nav-dark
      const overDark = [...document.querySelectorAll('[data-nav-dark]')].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 60 && r.bottom >= 60;
      });
      setIsOverDarkSection(overDark);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const barColor = (menuOpen || isOverDarkSection) ? 'bg-white' : 'bg-text';
  const textColor = (menuOpen || isOverDarkSection) ? 'text-white' : 'text-text';
  const bgColor = menuOpen
    ? 'bg-transparent'
    : isOverDarkSection
      ? 'bg-ink/60'
      : 'bg-background/90';

  return (
    <header
      className={`fixed top-0 w-full z-[110] transition-all duration-500 ${
        scrolled && !menuOpen ? `${bgColor} backdrop-blur-md py-4 shadow-sm` : 'bg-transparent py-6 md:py-12'
      }`}
    >
      <Container className="flex items-start justify-between">
        <a
          href="/"
          className={`font-serif text-xl md:text-2xl font-bold tracking-tight leading-tight uppercase flex flex-col transition-colors duration-500 ${textColor}`}
        >
          <span>NEYAJ</span>
          <span>AHMAD</span>
          <span>DEV</span>
        </a>

        {/* Animated hamburger ↔ X toggle */}
        <button
          className="relative flex justify-center items-center w-10 h-10 z-[120] focus:outline-none hover:opacity-70 transition-opacity duration-200"
          onClick={onMenuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {/* Top bar */}
          <motion.span
            className={`absolute w-8 h-[2px] rounded-full ${barColor} transition-colors duration-500`}
            animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          />
          {/* Bottom bar */}
          <motion.span
            className={`absolute w-8 h-[2px] rounded-full ${barColor} transition-colors duration-500`}
            animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          />
        </button>
      </Container>
    </header>
  );
}
