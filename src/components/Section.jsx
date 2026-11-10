import React from 'react';
import { motion } from 'framer-motion';
import { Container, cn } from './Container';

export function Section({ id, children, className, dark = false }) {
  return (
    <section
      id={id}
      data-nav-dark={dark ? '' : undefined}
      className={cn(
        "py-24 md:py-32 w-full",
        dark ? "bg-ink text-background" : "bg-background text-text",
        className
      )}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
