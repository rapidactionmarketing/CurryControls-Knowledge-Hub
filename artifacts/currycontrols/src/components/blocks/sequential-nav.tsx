import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAdjacent, label, type NavEntry } from '@/data/nav-index';
import { getContent } from '@/data/content';

/**
 * Previous and next through the taxonomy in reading order.
 *
 * A reader working through a subject gets a path forward, and the links form a
 * chain that reaches deep pages without depending on the menu.
 */
export function SequentialNav({ current }: { current: NavEntry }) {
  const { previous, next } = getAdjacent(current);
  if (!previous && !next) return null;

  const title = (entry: NavEntry) => getContent(entry.path)?.title ?? label(entry.node);

  return (
    <nav
      aria-label="Previous and next topic"
      className="mt-10 grid gap-3 border-t border-[hsl(var(--rule))] pt-6 sm:grid-cols-2"
      data-testid="sequential-nav"
    >
      {previous ? (
        <Link href={previous.path} className="cc-card group flex items-center gap-3 p-4">
          <ArrowLeft size={15} aria-hidden="true" className="shrink-0 text-[hsl(var(--ink-2))]/50" />
          <span className="min-w-0">
            <span className="cc-mono block text-[0.66rem] uppercase tracking-wider text-[hsl(var(--ink-2))]/70">
              Previous
            </span>
            <span className="block truncate font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
              {title(previous)}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link href={next.path} className="cc-card group flex items-center justify-end gap-3 p-4 text-right">
          <span className="min-w-0">
            <span className="cc-mono block text-[0.66rem] uppercase tracking-wider text-[hsl(var(--ink-2))]/70">
              Next
            </span>
            <span className="block truncate font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
              {title(next)}
            </span>
          </span>
          <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-[hsl(var(--ink-2))]/50" />
        </Link>
      )}
    </nav>
  );
}
