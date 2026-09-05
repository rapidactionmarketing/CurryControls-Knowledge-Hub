import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown, ExternalLink, Phone, X } from 'lucide-react';
import { NAV_SECTIONS, type NavNode } from '@/data/navigation';
import { label } from '@/data/nav-index';
import { hasContent } from '@/data/content';
import { CONTACT } from '@/data/site';
import { Icon } from '@/components/icon';

/**
 * Mobile navigation drawer with nested accordions.
 *
 * Mirrors the desktop mega menu from the same data, at arbitrary depth. Each
 * branch is a disclosure button with aria-expanded and aria-controls; each
 * branch also carries a direct link to its own hub page so a parent topic is
 * reachable without expanding it.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="cc-drawer cc-mobile-only"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="cc-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        data-testid="mobile-nav"
      >
        <div className="flex items-center justify-between border-b border-[hsl(var(--rule))] px-4 py-3">
          <div>
            <div className="cc-mono text-[0.78rem] font-bold tracking-tight text-[hsl(var(--navy))]">
              CURRYCONTROLS.COM
            </div>
            <div className="text-[0.68rem] text-[hsl(var(--ink-2))]">
              Controls &amp; Automation Knowledge Hub
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="cc-btn cc-btn-ghost -mr-2 p-2"
            aria-label="Close navigation"
            data-testid="button-close-nav"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <a
          href={CONTACT.phoneHref}
          data-phone-placement="mobile-nav"
          className="flex items-center gap-3 bg-[hsl(var(--navy))] px-4 py-3 text-white"
          data-testid="link-phone-mobile-nav"
        >
          <span className="grid size-8 place-items-center rounded-full bg-white/12 ring-1 ring-white/25">
            <Phone size={15} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[0.68rem] uppercase tracking-wider text-white/70">
              Call {CONTACT.person}
            </span>
            <span className="cc-phone">{CONTACT.phoneDisplay}</span>
          </span>
        </a>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 pb-24" aria-label="Site navigation">
          {NAV_SECTIONS.map((section) => (
            <AccordionNode
              key={section.slug}
              node={section}
              path={`/${section.slug}`}
              depth={0}
              icon={section.icon}
              onNavigate={onClose}
            />
          ))}

          <Link
            href="/contact"
            onClick={onClose}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded border border-[hsl(var(--rule))] py-2.5 font-semibold text-[hsl(var(--navy))]"
          >
            Contact Eric Sullivan
          </Link>
        </nav>
      </div>
    </div>
  );
}

function AccordionNode({
  node,
  path,
  depth,
  icon,
  onNavigate,
}: {
  node: NavNode;
  path: string;
  depth: number;
  icon?: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const children = node.children ?? [];
  const panelId = `mnav${path.replace(/\//g, '-')}`;

  if (children.length === 0) {
    if (node.externalUrl) {
      return (
        <a
          href={node.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cc-acc-leaf"
          onClick={onNavigate}
        >
          {label(node)}
          <ExternalLink size={11} className="ml-1 inline" aria-hidden="true" />
        </a>
      );
    }
    return (
      <Link href={path} className="cc-acc-leaf" onClick={onNavigate}>
        {label(node)}
        {hasContent(path) && (
          <span
            className="ml-1.5 inline-block size-1.5 rounded-full bg-[hsl(var(--teal))] align-middle"
            role="img"
            aria-label="Has a written guide"
          />
        )}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 border-b border-[hsl(var(--rule))]">
        <Link
          href={path}
          onClick={onNavigate}
          className="flex-1 py-3 text-left font-semibold text-[hsl(var(--navy))]"
          style={{ fontSize: depth === 0 ? '0.95rem' : '0.875rem' }}
        >
          {depth === 0 && icon && (
            <Icon name={icon} size={15} className="mr-2 inline text-[hsl(var(--accent-blue))]" />
          )}
          {label(node)}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.title}`}
          className="shrink-0 rounded p-2 text-[hsl(var(--ink-2))]"
          data-testid={`accordion-toggle-${node.slug}`}
        >
          <ChevronDown
            size={17}
            aria-hidden="true"
            className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'}
          />
        </button>
      </div>

      <div id={panelId} hidden={!expanded} className="ml-3 border-l border-[hsl(var(--rule))] pl-3">
        {children.map((child) => (
          <AccordionNode
            key={child.slug}
            node={child}
            path={`${path}/${child.slug}`}
            depth={depth + 1}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
