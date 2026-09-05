import { useEffect, useMemo, useState } from 'react';
import { Link, useSearch } from 'wouter';
import { ExternalLink, Search as SearchIcon } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { ContactCta } from '@/components/blocks/contact-cta';
import {
  SCOPE_LABELS,
  SEARCH_PLACEHOLDER,
  POPULAR_SEARCHES,
  scopeCounts,
  search,
  type SearchScope,
} from '@/lib/search';
import { graph, personSchema, websiteSchema } from '@/lib/structured-data';

/** Full search results page, reachable directly and shareable as a URL. */
export function SearchPage() {
  const searchString = useSearch();
  const initial = new URLSearchParams(searchString).get('q') ?? '';
  const [query, setQuery] = useState(initial);
  const [scope, setScope] = useState<SearchScope>('all');

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  const results = useMemo(() => (query.trim() ? search(query, scope, 60) : []), [query, scope]);
  const counts = useMemo(() => (query.trim() ? scopeCounts(query) : null), [query]);

  return (
    <>
      <Seo
        title={query ? `Search: ${query}` : 'Search'}
        description="Search the CurryControls.com controls and automation knowledge hub across articles, how-to guides, troubleshooting, engineering references, water and wastewater systems, and projects."
        path="/search"
        noindex
        jsonLd={graph(websiteSchema(), personSchema())}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <h1 className="cc-h1">Search</h1>
          <div className="mt-4 flex max-w-2xl items-center gap-3 rounded border border-[hsl(var(--input))] bg-white px-4">
            <SearchIcon size={17} className="shrink-0 text-[hsl(var(--ink-2))]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={SEARCH_PLACEHOLDER}
              className="w-full border-0 bg-transparent py-3 outline-none"
              aria-label="Search the knowledge base"
              data-testid="input-search-page"
              autoFocus
            />
          </div>

          {counts && (
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter results">
              {SCOPE_LABELS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setScope(option.value)}
                  aria-pressed={scope === option.value}
                  className={`cc-tag ${scope === option.value ? 'cc-tag-accent border-[hsl(var(--accent-blue))]' : ''}`}
                  data-testid={`filter-${option.value}`}
                >
                  {option.label}
                  <span className="opacity-60">{counts[option.value]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="cc-container py-9">
        {!query.trim() ? (
          <div className="max-w-2xl">
            <p className="cc-lead">
              Search across articles, how-to guides, troubleshooting guides, engineering references,
              water and wastewater systems, and personal projects.
            </p>
            <p className="cc-eyebrow mt-7">Common searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button key={term} type="button" onClick={() => setQuery(term)} className="cc-tag cc-tag-accent">
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="max-w-2xl">
            <h2 className="cc-h2">No results for “{query}”</h2>
            <p className="cc-lead mt-2">
              Try a broader term, or a different spelling. If the topic is one this site has not
              covered yet, ask directly.
            </p>
            <div className="mt-6">
              <ContactCta />
            </div>
          </div>
        ) : (
          <>
            <p className="text-[0.86rem] text-[hsl(var(--ink-2))]" aria-live="polite">
              {results.length} {results.length === 1 ? 'result' : 'results'} for “{query}”
              {scope !== 'all' && ` in ${SCOPE_LABELS.find((s) => s.value === scope)?.label}`}
            </p>

            <ul className="mt-5 divide-y divide-[hsl(var(--rule))] border-y border-[hsl(var(--rule))]">
              {results.map((result) => (
                <li key={result.path} className="py-4">
                  {result.external ? (
                    <a
                      href={result.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <ResultBody result={result} external />
                    </a>
                  ) : (
                    <Link href={result.path} className="group block">
                      <ResultBody result={result} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

function ResultBody({
  result,
  external = false,
}: {
  result: ReturnType<typeof search>[number];
  external?: boolean;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
          {result.title}
        </span>
        <span className="cc-tag">{result.kindLabel}</span>
        {external && <ExternalLink size={12} className="text-[hsl(var(--ink-2))]" aria-hidden="true" />}
      </div>
      {result.context && (
        <p className="mt-0.5 text-[0.74rem] text-[hsl(var(--ink-2))]/80">{result.context}</p>
      )}
      <p className="mt-1.5 text-[0.88rem] leading-6 text-[hsl(var(--ink-2))]">{result.summary}</p>
      <p className="cc-mono mt-1.5 text-[0.72rem] text-[hsl(var(--accent-blue))]/70">
        {external ? result.external : `currycontrols.com${result.path}`}
      </p>
    </>
  );
}
