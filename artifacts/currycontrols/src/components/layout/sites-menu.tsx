import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ExternalLink, Globe } from 'lucide-react';
import { SITES, SITE_GROUPS, sitesInGroup } from '@/data/sites';

/**
 * "Other sites" dropdown in the utility bar.
 *
 * Rendered from the sites list. A live site is a link; one that is not yet
 * live is shown as coming soon with no anchor, so the header never points a
 * visitor or a crawler at a parked domain. Click to open, Escape or an
 * outside click to close.
 */
export function SitesMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const liveCount = SITES.filter((site) => site.live).length;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative" data-testid="sites-menu">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="sites-menu-panel"
        className="flex items-center gap-1.5 rounded px-1.5 py-1 text-[0.72rem] font-semibold uppercase tracking-wider text-white/85 hover:text-white"
        data-testid="button-sites-menu"
      >
        <Globe size={13} aria-hidden="true" />
        Sites
        <ChevronDown size={12} aria-hidden="true" className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>

      {open && (
        <div
          id="sites-menu-panel"
          role="region"
          aria-label="Other sites by Eric Sullivan"
          className="cc-sites-panel"
          data-testid="sites-menu-panel"
        >
          <p className="cc-eyebrow mb-1 text-white/70">Other sites by Eric Sullivan</p>
          <p className="mb-3 text-[0.78rem] leading-5 text-white/70">
            Separate, independently owned sites on related subjects.
            {liveCount === 0 ? ' None are published yet.' : ''}
          </p>
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {SITE_GROUPS.map((group) => (
              <div key={group}>
                <p className="cc-mono mb-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-white/55">{group}</p>
                <ul className="space-y-0.5">
                  {sitesInGroup(group).map((site) =>
                    site.live ? (
                      <li key={site.domain}>
                        <a
                          href={`https://${site.domain}/`}
                          rel="noopener"
                          className="cc-sites-link"
                          data-testid={`link-site-${site.domain}`}
                        >
                          <span className="font-semibold">{site.name}</span>
                          <ExternalLink size={11} aria-hidden="true" className="ml-1 inline opacity-70" />
                          <span className="block text-[0.74rem] text-white/60">{site.topic}</span>
                        </a>
                      </li>
                    ) : (
                      <li key={site.domain} className="cc-sites-soon" data-testid={`soon-site-${site.domain}`}>
                        <span className="font-semibold text-white/55">{site.name}</span>
                        <span className="ml-1.5 rounded bg-white/10 px-1 py-px text-[0.6rem] uppercase tracking-wider text-white/60">
                          coming soon
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
