/**
 * The route manifest.
 *
 * Shared by the sitemap generator and the prerender step so the two can never
 * disagree. Placeholder leaves — taxonomy nodes with no children and no
 * written entry — are deliberately excluded: they are browsable and linked,
 * but submitting hundreds of thin pages for indexing would hurt the site.
 */

import { NAV_ENTRIES } from '@/data/nav-index';
import { ENTRIES, getContent } from '@/data/content';
import { PROJECTS } from '@/data/projects';
import { getChildren, getEntry } from '@/data/nav-index';

export type RouteRecord = {
  path: string;
  /** Sitemap priority, 0.0 to 1.0. */
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly';
  /** ISO date, when known. */
  lastmod?: string;
};

function buildRoutes(): RouteRecord[] {
  const routes = new Map<string, RouteRecord>();
  const add = (record: RouteRecord) => {
    const existing = routes.get(record.path);
    if (!existing || record.priority > existing.priority) routes.set(record.path, record);
  };

  add({ path: '/', priority: 1.0, changefreq: 'weekly' });
  add({ path: '/contact', priority: 0.8, changefreq: 'monthly' });
  add({ path: '/about/site', priority: 0.6, changefreq: 'monthly' });
  add({ path: '/about/eric-sullivan', priority: 0.6, changefreq: 'monthly' });
  add({ path: '/tools-projects', priority: 0.7, changefreq: 'monthly' });

  for (const project of PROJECTS) {
    add({
      path: `/tools-projects/eric-sullivans-personal-projects/${project.slug}`,
      priority: 0.6,
      changefreq: 'monthly',
    });
  }

  add({ path: '/articles', priority: 0.8, changefreq: 'weekly' });
  const articlesRoot = getEntry('/articles');
  if (articlesRoot) {
    for (const category of getChildren(articlesRoot)) {
      add({ path: category.path, priority: 0.5, changefreq: 'weekly' });
    }
  }

  // Every branch node in the taxonomy is a real index page.
  for (const nav of NAV_ENTRIES) {
    if (nav.childPaths.length === 0) continue;
    if (nav.path.startsWith('/articles')) continue;
    if (nav.path.startsWith('/about')) continue;
    if (nav.path.startsWith('/tools-projects')) continue;
    add({
      path: nav.path,
      priority: nav.depth === 0 ? 0.9 : nav.depth === 1 ? 0.7 : 0.6,
      changefreq: 'weekly',
    });
  }

  // Written entries carry a real last-modified date.
  for (const entry of ENTRIES) {
    add({ path: entry.path, priority: 0.8, changefreq: 'monthly', lastmod: entry.updated });
  }

  return [...routes.values()].sort((a, b) => a.path.localeCompare(b.path));
}

export const ROUTES: RouteRecord[] = buildRoutes();

/** Paths that should be rendered to static HTML at build time. */
export const PRERENDER_PATHS: string[] = ROUTES.map((route) => route.path);

/** Every leaf placeholder, kept out of the sitemap but still linked in-site. */
export const PLACEHOLDER_PATHS: string[] = NAV_ENTRIES.filter(
  (nav) => nav.childPaths.length === 0 && !getContent(nav.path),
).map((nav) => nav.path);
