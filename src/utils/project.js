export const shortTitle = (title) => title.trim();

/** Raster screenshots are small (640px), so they get a narrower frame than SVG covers. */
export const isRaster = (src = '') => /\.(png|jpe?g|webp)$/i.test(src);

/** Address shown in the fake browser bar. */
export function frameUrl(project) {
  try {
    if (project.live) return new URL(project.live).hostname;
    if (project.github) {
      const u = new URL(project.github);
      return u.hostname + u.pathname;
    }
  } catch {
    /* fall through */
  }
  return `${project.id}.app`;
}

/** Short status line for the project: where it can be seen. */
export function projectStatus(project) {
  if (project.live?.includes('play.google')) return { label: 'Available on', value: 'Google Play' };
  if (project.live) return { label: 'Status', value: 'Live demo' };
  if (project.github) return { label: 'Source', value: 'Open on GitHub' };
  return null;
}
