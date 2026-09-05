import { renderToString } from 'react-dom/server';
import { ErrorBoundary } from '@/components/error-boundary';
import { ssrHead, type SeoProps } from '@/components/seo/seo';
import { ROUTES } from '@/lib/routes';
import { CONTACT, SITE } from '@/data/site';
import { LEGAL } from '@/data/site-legal';
import { ENTRIES } from '@/data/content';
import { NAV_SECTIONS } from '@/data/navigation';
import { PROJECTS } from '@/data/projects';
import { GLOSSARY } from '@/data/glossary';
import { CALCULATORS } from '@/data/calculators';
import { REFERENCE_TABLES } from '@/data/tables';

/**
 * Server entry used by the prerender build step.
 *
 * It renders exactly the tree main.tsx mounts, so the generated HTML hydrates
 * without a mismatch. Client-only pieces (the notice modal, the sticky call
 * bar) render nothing on their first pass on both sides.
 */
export type RenderResult = { html: string; head: SeoProps | null };

export async function render(url: string): Promise<RenderResult> {
  const { default: App } = await import('@/App');

  ssrHead.current = null;
  const html = renderToString(
    <ErrorBoundary>
      <App ssrPath={url} />
    </ErrorBoundary>,
  );

  return { html, head: ssrHead.current };
}

export { ROUTES, PRERENDER_PATHS, PLACEHOLDER_PATHS } from '@/lib/routes';
/* Exported so the calculator arithmetic can be verified against the built
 * bundle rather than against a separately resolved copy of the sources. */
export { CALCULATORS, CALCULATOR_BY_SLUG, defaultValues } from '@/data/calculators';
export { REFERENCE_TABLES } from '@/data/tables';

/** Data the build scripts need, exported from the bundle they already load. */
export const seoData = {
  ROUTES,
  SITE,
  CONTACT,
  LEGAL,
  NAV_SECTIONS,
  PROJECTS,
  CALCULATORS: CALCULATORS.map((c) => ({
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    category: c.category,
  })),
  TABLES: REFERENCE_TABLES.map((t) => ({
    slug: t.slug,
    title: t.title,
    summary: t.summary,
    basis: t.basis,
  })),
  GLOSSARY: GLOSSARY.map((term) => ({
    slug: term.slug,
    term: term.term,
    short: term.short,
    category: term.category,
  })),
  ENTRIES: ENTRIES.map((entry) => ({
    path: entry.path,
    title: entry.title,
    summary: entry.summary,
    kind: entry.kind,
    updated: entry.updated,
  })),
};
