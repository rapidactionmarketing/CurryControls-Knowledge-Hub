import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { getContent, hasContent } from '@/data/content';
import { describe, getEntry, getSiblings, label, type NavEntry } from '@/data/nav-index';

/**
 * Related content.
 *
 * Combines the entry's hand-picked related paths with taxonomy siblings, so
 * every page has somewhere useful to go next even before anyone curates it.
 */
export function RelatedContent({
  current,
  explicit = [],
  title = 'Related topics',
  limit = 6,
}: {
  current: NavEntry;
  explicit?: string[];
  title?: string;
  limit?: number;
}) {
  const seen = new Set<string>([current.path]);
  const items: NavEntry[] = [];

  const push = (path: string) => {
    if (seen.has(path) || items.length >= limit) return;
    const nav = getEntry(path);
    if (!nav) return;
    seen.add(path);
    items.push(nav);
  };

  for (const path of explicit) push(path);
  // Siblings with written content first, then the rest.
  const siblings = getSiblings(current);
  for (const sibling of siblings.filter((s) => hasContent(s.path))) push(sibling.path);
  for (const sibling of siblings) push(sibling.path);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-12" data-testid="related-content">
      <h2 id="related-heading" className="cc-h2">
        {title}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const entry = getContent(item.path);
          return (
            <li key={item.path}>
              <Link href={item.path} className="cc-card group flex h-full gap-3 p-4">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
                    {entry ? entry.title : label(item.node)}
                  </span>
                  <span className="mt-1 block line-clamp-2 text-[0.82rem] leading-5.5 text-[hsl(var(--ink-2))]">
                    {entry ? entry.summary : describe(item)}
                  </span>
                </span>
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[hsl(var(--ink-2))]/40 group-hover:text-[hsl(var(--accent-blue))]"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
