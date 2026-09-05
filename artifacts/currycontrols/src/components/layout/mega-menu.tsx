import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { NAV_SECTIONS, type NavNode, type NavSection } from '@/data/navigation';
import { countDescendants, getEntry, label } from '@/data/nav-index';
import { hasContent } from '@/data/content';
import { Icon } from '@/components/icon';

/**
 * Desktop multi-level mega menu.
 *
 * Rendered entirely from the navigation tree, so depth and breadth are a data
 * concern rather than a component concern. Supports hover and click, closes on
 * Escape and on outside click, and moves between top-level triggers with the
 * arrow keys.
 */
export function MegaMenu() {
  const [location] = useLocation();
  const [open, setOpen] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /**
   * Hover-opening is armed only once the pointer has actually moved since the
   * last navigation. Without this, arriving at a page by keyboard while the
   * cursor happens to rest on a trigger fires pointerenter from the layout
   * change alone, and a menu the reader never asked for covers the article.
   */
  const hoverArmed = useRef(false);

  const clearTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const close = useCallback(() => {
    clearTimer();
    setOpen(null);
    setPinned(false);
  }, []);

  // Any navigation closes the menu and disarms hover until the pointer moves.
  useEffect(() => {
    close();
    hoverArmed.current = false;
    const arm = () => {
      hoverArmed.current = true;
    };
    document.addEventListener('pointermove', arm, { once: true });
    return () => document.removeEventListener('pointermove', arm);
  }, [location, close]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const trigger = triggerRefs.current.get(open);
        close();
        trigger?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, close]);

  useEffect(() => clearTimer, []);

  const onTriggerKeyDown = (event: React.KeyboardEvent, index: number) => {
    const sections = NAV_SECTIONS;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = sections[(index + delta + sections.length) % sections.length]!;
      triggerRefs.current.get(next.slug)?.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(sections[index]!.slug);
      setPinned(true);
    }
  };

  return (
    <div ref={containerRef} className="cc-desktop-only relative">
      <nav aria-label="Main navigation" className="cc-navbar">
        <ul className="flex items-center gap-0.5">
          {NAV_SECTIONS.map((section, index) => {
            const isOpen = open === section.slug;
            const isCurrent = location === `/${section.slug}` || location.startsWith(`/${section.slug}/`);
            return (
              <li
                key={section.slug}
                onPointerEnter={() => {
                  if (pinned || !hoverArmed.current) return;
                  clearTimer();
                  hoverTimer.current = setTimeout(() => setOpen(section.slug), 90);
                }}
                onPointerLeave={() => {
                  if (pinned) return;
                  clearTimer();
                  hoverTimer.current = setTimeout(() => setOpen((c) => (c === section.slug ? null : c)), 180);
                }}
              >
                <button
                  type="button"
                  ref={(el) => {
                    if (el) triggerRefs.current.set(section.slug, el);
                    else triggerRefs.current.delete(section.slug);
                  }}
                  className="cc-navlink"
                  data-open={isOpen}
                  data-current={isCurrent}
                  data-testid={`nav-trigger-${section.slug}`}
                  aria-expanded={isOpen}
                  aria-controls={`mega-${section.slug}`}
                  aria-haspopup="true"
                  onClick={() => {
                    clearTimer();
                    if (isOpen && pinned) close();
                    else {
                      setOpen(section.slug);
                      setPinned(true);
                    }
                  }}
                  onKeyDown={(event) => onTriggerKeyDown(event, index)}
                >
                  {label(section)}
                  <ChevronDown
                    size={13}
                    aria-hidden="true"
                    className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {NAV_SECTIONS.map((section) => (
        <MegaPanel
          key={section.slug}
          section={section}
          open={open === section.slug}
          onPointerEnter={clearTimer}
          onPointerLeave={() => {
            if (pinned) return;
            hoverTimer.current = setTimeout(close, 180);
          }}
        />
      ))}
    </div>
  );
}

function MegaPanel({
  section,
  open,
  onPointerEnter,
  onPointerLeave,
}: {
  section: NavSection;
  open: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  const columns = section.columns ?? 4;
  const gridClass =
    columns === 1
      ? 'md:grid-cols-1'
      : columns === 2
        ? 'md:grid-cols-2'
        : columns === 3
          ? 'md:grid-cols-3'
          : 'md:grid-cols-4';

  return (
    <div
      id={`mega-${section.slug}`}
      className="cc-mega"
      hidden={!open}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      data-testid={`mega-panel-${section.slug}`}
    >
      <div className="cc-mega-scroll">
        <div className="cc-container grid gap-7 py-7 lg:grid-cols-[minmax(210px,240px)_1fr]">
          <div className="border-b border-[hsl(var(--rule))] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
            <div className="mb-2.5 flex items-center gap-2 text-[hsl(var(--accent-blue))]">
              <Icon name={section.icon} size={19} />
              <span className="cc-eyebrow">{section.title}</span>
            </div>
            <p className="text-[0.845rem] leading-6 text-[hsl(var(--ink-2))]">{section.blurb}</p>
            <Link
              href={`/${section.slug}`}
              className="mt-3.5 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[hsl(var(--accent-blue))] hover:text-[hsl(var(--navy))]"
            >
              Browse {section.title}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <p className="cc-mono mt-3 text-[0.68rem] uppercase tracking-wider text-[hsl(var(--ink-2))]/70">
              {countDescendants(getEntry(`/${section.slug}`)!)} topics
            </p>
          </div>

          <div className={`grid gap-x-7 gap-y-6 ${gridClass}`}>
            {section.children.map((child) => (
              <MegaColumn key={child.slug} node={child} basePath={`/${section.slug}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** One column: a level-2 node, its level-3 children, and any level-4 items. */
function MegaColumn({ node, basePath }: { node: NavNode; basePath: string }) {
  const path = `${basePath}/${node.slug}`;
  const children = node.children ?? [];

  return (
    <div>
      <Link href={path} className="cc-mega-col-title hover:text-[hsl(var(--accent-blue))]">
        {label(node)}
      </Link>
      {children.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {children.map((grandchild) => (
            <MegaItem key={grandchild.slug} node={grandchild} basePath={path} />
          ))}
        </ul>
      )}
    </div>
  );
}

function MegaItem({ node, basePath }: { node: NavNode; basePath: string }) {
  const path = `${basePath}/${node.slug}`;
  const children = node.children ?? [];
  const written = hasContent(path);

  return (
    <li>
      {node.externalUrl ? (
        <a href={node.externalUrl} target="_blank" rel="noopener noreferrer" className="cc-mega-link">
          {label(node)}
          <ExternalLink size={11} className="ml-1 inline" aria-hidden="true" />
        </a>
      ) : (
        <Link href={path} className="cc-mega-link">
          {label(node)}
          {written && (
            <span
              className="ml-1.5 inline-block size-1.5 rounded-full bg-[hsl(var(--teal))] align-middle"
              aria-label="Has a written guide"
              role="img"
            />
          )}
        </Link>
      )}
      {children.length > 0 && (
        <ul className="ml-3 border-l border-[hsl(var(--rule))] pl-2.5">
          {children.map((child) => (
            <li key={child.slug}>
              <Link href={`${path}/${child.slug}`} className="cc-mega-link text-[0.8rem]">
                {label(child)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
