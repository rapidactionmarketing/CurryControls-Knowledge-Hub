import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { CornerDownLeft, ExternalLink, Search as SearchIcon, X } from 'lucide-react';
import { CONTACT } from '@/data/site';
import { trackSearch, trackSearchResultOpen } from '@/lib/analytics';
import {
  POPULAR_SEARCHES,
  SEARCH_PLACEHOLDER,
  search,
  type SearchResult,
} from '@/lib/search';

/**
 * Global search dialog.
 *
 * Opened from the header, or from anywhere with the "/" shortcut. Arrow keys
 * move through results, Enter opens the highlighted one, and Enter on an
 * empty selection runs a full search page for the query.
 */
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo<SearchResult[]>(() => (query.trim() ? search(query, 'all', 12) : []), [query]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Record the settled query rather than every keystroke, so the dashboard
  // shows what people meant to look for.
  useEffect(() => {
    const term = query.trim();
    if (!open || term.length < 3) return;
    const id = setTimeout(() => {
      trackSearch(term, results.length, window.location.pathname);
    }, 900);
    return () => clearTimeout(id);
  }, [query, results.length, open]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  if (!open) return null;

  const go = (result: SearchResult) => {
    trackSearchResultOpen(result.path, window.location.pathname);
    onClose();
    if (result.external) window.open(result.external, '_blank', 'noopener,noreferrer');
    else setLocation(result.path);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const chosen = results[active];
      if (chosen) go(chosen);
      else if (query.trim()) {
        onClose();
        setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] bg-[hsl(var(--navy))]/55 px-4 pt-[8vh] backdrop-blur-[2px]"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search CurryControls.com"
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-md bg-white shadow-2xl"
        data-testid="search-dialog"
      >
        <div className="flex items-center gap-3 border-b border-[hsl(var(--rule))] px-4">
          <SearchIcon size={18} className="shrink-0 text-[hsl(var(--ink-2))]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={SEARCH_PLACEHOLDER}
            className="w-full border-0 bg-transparent py-3.5 text-[0.95rem] outline-none placeholder:text-[hsl(var(--ink-2))]/70"
            aria-label="Search"
            aria-controls="search-results"
            data-testid="input-search-dialog"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1.5 text-[hsl(var(--ink-2))] hover:bg-[hsl(var(--surface))]"
            aria-label="Close search"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[58vh] overflow-y-auto overscroll-contain">
          {query.trim() === '' ? (
            <div className="px-4 py-5">
              <p className="cc-eyebrow mb-3">Common searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="cc-tag cc-tag-accent hover:border-[hsl(var(--accent-blue))]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-[0.9rem] text-[hsl(var(--ink-2))]">
              No results for “{query}”. Try a broader term, or{' '}
              <a href={CONTACT.phoneHref} data-phone-placement="search-no-results" className="cc-link">
                call Eric at 863-698-8266
              </a>
              .
            </div>
          ) : (
            <ul id="search-results" ref={listRef} role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <li key={result.path}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    data-index={index}
                    data-testid={`search-result-${index}`}
                    onPointerEnter={() => setActive(index)}
                    onClick={() => go(result)}
                    className={`flex w-full items-start gap-3 px-4 py-2.5 text-left ${
                      index === active ? 'bg-[hsl(var(--surface))]' : ''
                    }`}
                  >
                    <span className="mt-0.5 min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[hsl(var(--navy))]">{result.title}</span>
                        <span className="cc-tag">{result.kindLabel}</span>
                        {result.external && (
                          <ExternalLink size={11} className="text-[hsl(var(--ink-2))]" aria-hidden="true" />
                        )}
                      </span>
                      {result.context && (
                        <span className="mt-0.5 block truncate text-[0.72rem] text-[hsl(var(--ink-2))]/80">
                          {result.context}
                        </span>
                      )}
                      <span className="mt-1 block line-clamp-2 text-[0.82rem] leading-5 text-[hsl(var(--ink-2))]">
                        {result.summary}
                      </span>
                    </span>
                    {index === active && (
                      <CornerDownLeft
                        size={14}
                        className="mt-1 shrink-0 text-[hsl(var(--ink-2))]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[hsl(var(--rule))] bg-[hsl(var(--surface))] px-4 py-2 text-[0.7rem] text-[hsl(var(--ink-2))]">
          <span>
            <kbd className="cc-mono rounded border border-[hsl(var(--rule))] bg-white px-1">↑</kbd>{' '}
            <kbd className="cc-mono rounded border border-[hsl(var(--rule))] bg-white px-1">↓</kbd> to
            navigate · <kbd className="cc-mono rounded border border-[hsl(var(--rule))] bg-white px-1">Enter</kbd>{' '}
            to open · <kbd className="cc-mono rounded border border-[hsl(var(--rule))] bg-white px-1">Esc</kbd> to
            close
          </span>
          {query.trim() && (
            <button
              type="button"
              className="font-semibold text-[hsl(var(--accent-blue))]"
              onClick={() => {
                onClose();
                setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
              }}
            >
              See all results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Registers the global "/" shortcut. Ignores the keypress while the user is
 * typing in a field so it never steals input.
 */
export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;
      if (typing) return;

      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        onOpen();
      } else if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpen();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onOpen]);
}
