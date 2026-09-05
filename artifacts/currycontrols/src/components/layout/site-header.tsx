import { useCallback, useState } from 'react';
import { Link } from 'wouter';
import { Menu, Phone, Search as SearchIcon } from 'lucide-react';
import { CONTACT } from '@/data/site';
import { SEARCH_PLACEHOLDER } from '@/lib/search';
import { MegaMenu } from './mega-menu';
import { MobileNav } from './mobile-nav';
import { UtilityBar } from './utility-bar';
import { SearchDialog, useSearchShortcut } from '@/components/search/search-dialog';

/**
 * Site identity, global search, multi-level navigation, and direct contact
 * access. Sticky, so the phone number and the menu stay reachable on long
 * technical pages.
 */
export function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSearchShortcut(openSearch);

  return (
    <>
      <div className="cc-sticky">
        <UtilityBar />

        <header className="cc-header" data-testid="site-header">
          <div className="cc-container flex h-[68px] items-center gap-4">
            <Link href="/" className="shrink-0" data-testid="link-home">
              <span className="cc-mono block text-[0.98rem] font-bold leading-tight tracking-tight text-[hsl(var(--navy))] sm:text-[1.08rem]">
                CURRYCONTROLS.COM
              </span>
              <span className="block text-[0.66rem] leading-tight tracking-wide text-[hsl(var(--ink-2))] sm:text-[0.7rem]">
                Controls &amp; Automation Knowledge Hub
              </span>
            </Link>

            <div className="flex-1" />

            <button
              type="button"
              onClick={openSearch}
              className="hidden w-full max-w-[300px] items-center gap-2 rounded border border-[hsl(var(--input))] px-3 py-2 text-left text-[0.84rem] text-[hsl(var(--ink-2))] hover:border-[hsl(var(--accent-blue))] xl:flex"
              data-testid="button-open-search"
              aria-label="Open search"
            >
              <SearchIcon size={15} aria-hidden="true" />
              <span className="flex-1 truncate">{SEARCH_PLACEHOLDER}</span>
              <kbd className="cc-mono rounded border border-[hsl(var(--rule))] bg-[hsl(var(--surface))] px-1.5 text-[0.7rem]">
                /
              </kbd>
            </button>

            <button
              type="button"
              onClick={openSearch}
              className="cc-btn cc-btn-ghost p-2 xl:hidden"
              aria-label="Open search"
              data-testid="button-open-search-compact"
            >
              <SearchIcon size={19} aria-hidden="true" />
            </button>

            <a
              href={CONTACT.phoneHref}
              data-phone-placement="header"
              className="cc-btn cc-btn-outline hidden lg:inline-flex"
              data-testid="link-phone-header"
            >
              <Phone size={14} aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={() => setNavOpen(true)}
              className="cc-btn cc-btn-ghost cc-mobile-only p-2"
              aria-label="Open navigation menu"
              aria-expanded={navOpen}
              data-testid="button-open-nav"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>

          <div className="cc-container cc-desktop-only relative border-t border-[hsl(var(--rule))]">
            <MegaMenu />
          </div>
        </header>
      </div>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
