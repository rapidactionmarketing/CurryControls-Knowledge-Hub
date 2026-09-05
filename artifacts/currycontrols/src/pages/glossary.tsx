import { Link } from 'wouter';
import { ArrowRight, BookA } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import {
  GLOSSARY,
  GLOSSARY_ALPHABETICAL,
  GLOSSARY_BY_SLUG,
  GLOSSARY_CATEGORIES,
  GLOSSARY_INITIALS,
  glossaryInitial,
  glossaryPath,
  type GlossaryTerm,
} from '@/data/glossary';
import { getContent } from '@/data/content';
import { describe, getEntry } from '@/data/nav-index';
import {
  breadcrumbSchema,
  definedTermSchema,
  definedTermSetSchema,
  graph,
  itemListSchema,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

/**
 * Glossary index.
 *
 * Definitional queries are a large share of how people find a subject like
 * this, so every term gets its own page and the index exists to make all of
 * them reachable in one hop.
 */
export function GlossaryIndexPage() {
  const trail = [{ name: 'Glossary', path: '/glossary' }];

  return (
    <>
      <Seo
        title="Controls and Automation Glossary"
        description={`Plain-language definitions of ${GLOSSARY.length} terms used in PLCs, SCADA, instrumentation, control panels, industrial networking, OT security, and water and wastewater control systems.`}
        path="/glossary"
        keywords={['controls glossary', 'automation terms', 'PLC terminology', 'SCADA definitions']}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          definedTermSetSchema(GLOSSARY.length),
          itemListSchema(
            'Controls and Automation Glossary',
            '/glossary',
            GLOSSARY_ALPHABETICAL.map((term) => ({ name: term.term, path: glossaryPath(term.slug) })),
          ),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">Controls and automation glossary</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            {GLOSSARY.length} terms from PLC programming, instrumentation, SCADA, control panels,
            industrial networking, OT security, and water and wastewater systems. Each definition
            stands on its own, and each links through to the reference material behind it.
          </p>

          <nav aria-label="Jump to letter" className="mt-6">
            <ul className="flex flex-wrap gap-1.5">
              {GLOSSARY_INITIALS.map((initial) => (
                <li key={initial}>
                  <a
                    href={`#letter-${initial === '#' ? 'other' : initial}`}
                    className="cc-mono inline-flex size-8 items-center justify-center rounded border border-[hsl(var(--rule))] bg-white text-[0.8rem] font-semibold text-[hsl(var(--navy))] hover:border-[hsl(var(--accent-blue))] hover:text-[hsl(var(--accent-blue))]"
                  >
                    {initial}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="cc-container py-10">
        <section aria-labelledby="by-category-heading" className="mb-12">
          <h2 id="by-category-heading" className="cc-h2">
            By subject
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GLOSSARY_CATEGORIES.map((category) => {
              const terms = GLOSSARY.filter((term) => term.category === category);
              if (terms.length === 0) return null;
              return (
                <div key={category} className="cc-card p-4">
                  <h3 className="cc-h3 text-[0.95rem]">{category}</h3>
                  <p className="cc-mono mt-0.5 text-[0.68rem] uppercase tracking-wider text-[hsl(var(--ink-2))]/70">
                    {terms.length} terms
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1">
                    {terms.map((term) => (
                      <li key={term.slug}>
                        <Link href={glossaryPath(term.slug)} className="cc-link text-[0.82rem] no-underline hover:underline">
                          {term.term}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="all-terms-heading">
          <h2 id="all-terms-heading" className="cc-h2">
            All terms
          </h2>
          {GLOSSARY_INITIALS.map((initial) => {
            const terms = GLOSSARY_ALPHABETICAL.filter((term) => glossaryInitial(term) === initial);
            return (
              <div key={initial} className="mt-8">
                <h3
                  id={`letter-${initial === '#' ? 'other' : initial}`}
                  className="cc-mono scroll-mt-32 border-b border-[hsl(var(--rule))] pb-1.5 text-[1.1rem] font-bold text-[hsl(var(--accent-blue))]"
                >
                  {initial}
                </h3>
                <dl className="mt-3 grid gap-x-8 gap-y-4 lg:grid-cols-2">
                  {terms.map((term) => (
                    <div key={term.slug}>
                      <dt>
                        <Link
                          href={glossaryPath(term.slug)}
                          className="font-semibold text-[hsl(var(--navy))] hover:text-[hsl(var(--accent-blue))]"
                        >
                          {term.term}
                        </Link>
                        {term.expansion && (
                          <span className="ml-2 text-[0.78rem] text-[hsl(var(--ink-2))]">
                            {term.expansion}
                          </span>
                        )}
                      </dt>
                      <dd className="mt-0.5 text-[0.86rem] leading-6 text-[hsl(var(--ink-2))]">
                        {term.short}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </section>

        <div className="mt-12">
          <ContactCta />
        </div>
        <Disclaimer kind="engineering" className="mt-8" />
      </div>
    </>
  );
}

/** A single glossary term. */
export function GlossaryTermPage({ slug }: { slug: string }) {
  const term = GLOSSARY_BY_SLUG[slug];
  if (!term) return null;

  const index = GLOSSARY_ALPHABETICAL.findIndex((t) => t.slug === slug);
  const previous = index > 0 ? GLOSSARY_ALPHABETICAL[index - 1] : undefined;
  const next = index < GLOSSARY_ALPHABETICAL.length - 1 ? GLOSSARY_ALPHABETICAL[index + 1] : undefined;

  const trail = [
    { name: 'Glossary', path: '/glossary' },
    { name: term.term, path: glossaryPath(term.slug) },
  ];

  return (
    <>
      <Seo
        title={`${term.term}${term.expansion ? ` (${term.expansion})` : ''} — Definition`}
        description={term.short}
        path={glossaryPath(term.slug)}
        keywords={[term.term, ...(term.aliases ?? []), term.category]}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          definedTermSchema(term),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <div className="mt-4 flex items-start gap-3">
            <span className="mt-1 hidden size-9 shrink-0 place-items-center rounded bg-white text-[hsl(var(--accent-blue))] ring-1 ring-[hsl(var(--rule))] sm:grid">
              <BookA size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="cc-eyebrow">{term.category}</p>
              <h1 className="cc-h1 mt-1">{term.term}</h1>
              {term.expansion && <p className="cc-lead mt-1.5">{term.expansion}</p>}
            </div>
          </div>
        </div>
      </header>

      <div className="cc-container py-9">
        <div className="max-w-2xl">
          <section className="cc-answer p-5 sm:p-6" aria-labelledby="definition-heading">
            <h2 id="definition-heading" className="cc-eyebrow mb-2">
              Definition
            </h2>
            <p className="text-[1rem] leading-7 text-[hsl(var(--ink))]">{term.short}</p>
          </section>

          <div className="cc-prose mt-6 space-y-4">
            {term.body.map((paragraph) => (
              <p key={paragraph} className="text-[0.975rem]">
                {paragraph}
              </p>
            ))}
          </div>

          {term.aliases && term.aliases.length > 0 && (
            <p className="mt-6 text-[0.84rem] text-[hsl(var(--ink-2))]">
              Also known as: {term.aliases.join(', ')}.
            </p>
          )}

          {term.related && term.related.length > 0 && (
            <section className="mt-9" aria-labelledby="read-more-heading">
              <h2 id="read-more-heading" className="cc-h2">
                Read more
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {term.related.map((path) => {
                  const nav = getEntry(path);
                  if (!nav) return null;
                  const entry = getContent(path);
                  return (
                    <li key={path}>
                      <Link href={path} className="cc-card group flex h-full gap-3 p-4">
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
                            {entry ? entry.title : nav.node.title}
                          </span>
                          <span className="mt-1 block line-clamp-2 text-[0.82rem] leading-5.5 text-[hsl(var(--ink-2))]">
                            {entry ? entry.summary : describe(nav)}
                          </span>
                        </span>
                        <ArrowRight size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[hsl(var(--ink-2))]/40" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {term.seeAlso && term.seeAlso.length > 0 && (
            <section className="mt-9" aria-labelledby="see-also-heading">
              <h2 id="see-also-heading" className="cc-h2">
                See also
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {term.seeAlso.map((other) => {
                  const linked: GlossaryTerm | undefined = GLOSSARY_BY_SLUG[other];
                  if (!linked) return null;
                  return (
                    <li key={other}>
                      <Link href={glossaryPath(other)} className="cc-tag cc-tag-accent">
                        {linked.term}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <nav
            aria-label="Glossary navigation"
            className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--rule))] pt-5"
          >
            {previous ? (
              <Link href={glossaryPath(previous.slug)} className="text-[0.86rem] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]">
                ← {previous.term}
              </Link>
            ) : (
              <span />
            )}
            <Link href="/glossary" className="cc-btn cc-btn-outline text-[0.8rem]">
              All terms
            </Link>
            {next ? (
              <Link href={glossaryPath(next.slug)} className="text-[0.86rem] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]">
                {next.term} →
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <div className="mt-10">
            <ContactCta variant="inline" />
          </div>
        </div>
      </div>
    </>
  );
}

export function isGlossarySlug(slug: string): boolean {
  return slug in GLOSSARY_BY_SLUG;
}
