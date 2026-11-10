import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { FullScreenMenu } from './components/FullScreenMenu';
import { Contact } from './sections/Contact';
import { Home } from './pages/Home';
import { AllProjects } from './pages/AllProjects';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Pauses smooth scrolling while an overlay is open. */
function LenisLock({ locked }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);
  return null;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Reset menu open on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Smooth scroll configuration & body lock when menu is open
  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const content = (
    <div className="bg-background min-h-screen font-sans selection:bg-text selection:text-background flex flex-col items-center">
      <Navbar onMenuOpen={() => setMenuOpen(prev => !prev)} menuOpen={menuOpen} />

      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <div className="w-full">
        <Contact />
      </div>
    </div>
  );

  if (prefersReducedMotion) return content;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <LenisLock locked={menuOpen} />
      {content}
    </ReactLenis>
  );
}

export default App;
