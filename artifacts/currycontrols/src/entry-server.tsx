import { renderToString } from 'react-dom/server';
import { ErrorBoundary } from '@/components/error-boundary';
import { ssrHead, type SeoProps } from '@/components/seo/seo';
import { ROUTES } from '@/lib/routes';
import { CONTACT, SITE } from '@/data/site';
import { ENTRIES } from '@/data/content';
import { NAV_SECTIONS } from '@/data/navigation';
import { PROJECTS } from '@/data/projects';
import { GLOSSARY } from '@/data/glossary';

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

/** Data the build scripts need, exported from the bundle they already load. */
export const seoData = {
  ROUTES,
  SITE,
  CONTACT,
  NAV_SECTIONS,
  PROJECTS,
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
