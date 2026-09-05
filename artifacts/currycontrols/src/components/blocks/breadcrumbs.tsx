import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by the page. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="cc-no-print" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[0.78rem] text-[hsl(var(--ink-2))]">
        <li className="flex items-center gap-1">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-[hsl(var(--accent-blue))]">
            <Home size={12} aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              <ChevronRight size={12} aria-hidden="true" className="text-[hsl(var(--ink-2))]/50" />
              {isLast ? (
                <span aria-current="page" className="font-medium text-[hsl(var(--navy))]">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-[hsl(var(--accent-blue))]">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
