import React from 'react';
import { motion } from 'framer-motion';
import { Container, cn } from './Container';

export function Section({ id, children, className, dark = false }) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32 w-full",
        dark ? "bg-text text-background" : "bg-background text-text",
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
