import { useCallback } from 'react';
import { useLenis } from 'lenis/react';

/**
 * Document position of an element from layout alone (offsetTop chain), so
 * scroll-linked transforms such as entrance offsets don't skew the target.
 */
export function layoutTop(el) {
  let top = 0;
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
  return top;
}

/**
 * Smoothly scrolls to the element with the given id (or to the top for '').
 * Uses Lenis when it is running, native scrolling otherwise.
 * Returns false when the target is not on the current page.
 */
export function useScrollToId() {
  const lenis = useLenis();
  return useCallback(
    (id, { immediate = false } = {}) => {
      const el = id ? document.getElementById(id) : null;
      if (id && !el) return false;
      const top = el ? layoutTop(el) : 0;
      if (lenis) lenis.scrollTo(top, { immediate, duration: 1.4, force: true });
      else window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
      return true;
    },
    [lenis]
  );
}
