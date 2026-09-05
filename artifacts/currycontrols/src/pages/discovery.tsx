import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { EntryCard } from '@/components/blocks/cards';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { Icon } from '@/components/icon';
import { NAV_SECTIONS } from '@/data/navigation';
import { getChildren, getEntry, label } from '@/data/nav-index';
import { ALL_TAGS, ENTRIES_BY_RECENCY, entriesWithTag, hasContent } from '@/data/content';
import { GLOSSARY_ALPHABETICAL, glossaryPath } from '@/data/glossary';
import { CALCULATORS, calculatorPath } from '@/data/calculators';
import { REFERENCE_TABLES, tablePath } from '@/data/tables';
import { PROJECTS } from '@/data/projects';
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

/* ------------------------------------------------------------------ *
 * HTML sitemap
 * ------------------------------------------------------------------ */

const UTILITY_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'Calculators', path: '/calculators' },
  { name: 'Reference tables', path: '/tables' },
  { name: 'Glossary', path: '/glossary' },
  { name: 'Questions and answers', path: '/faq' },
  { name: 'Topics', path: '/topics' },
  { name: 'Contact Eric Sullivan', path: '/contact' },
  { name: 'About CurryControls.com', path: '/about/site' },
  { name: 'About Eric Sullivan', path: '/about/eric-sullivan' },
  { name: 'Tools & Projects', path: '/tools-projects' },
  { name: 'Disclaimer', path: '/disclaimer' },
  { name: 'Editorial standards', path: '/editorial-standards' },
  { name: 'Accessibility', path: '/accessibility' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Terms of use', path: '/terms' },
];

/**
 * Human-readable sitemap.
 *
 * The taxonomy is five levels deep, which would otherwise put the deepest
 * pages five clicks from the home page. Listing every node here puts all of
 * them two clicks away, for readers and crawlers alike.
 */
export function SiteMapPage() {
  const trail = [{ name: 'Sitemap', path: '/sitemap' }];

  return (
    <>
      <Seo
        title="Sitemap"
        description="Every page on CurryControls.com in one place: the full controls, water and wastewater, troubleshooting, how-to, engineering, and cybersecurity taxonomy, plus the glossary and site pages."
        path="/sitemap"
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          itemListSchema('Sitemap', '/sitemap', UTILITY_PAGES.map((p) => ({ name: p.name, path: p.path }))),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">Sitemap</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            Every page on the site. A dot marks a topic that has a written guide behind it.
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        {NAV_SECTIONS.map((section) => {
          const nav = getEntry(`/${section.slug}`)!;
          const children = getChildren(nav);
          return (
            <section key={section.slug} className="mb-12" aria-labelledby={`sm-${section.slug}`}>
              <div className="flex items-center gap-2.5 border-b border-[hsl(var(--rule))] pb-2">
                <Icon name={section.icon} size={17} className="text-[hsl(var(--accent-blue))]" />
                <h2 id={`sm-${section.slug}`} className="cc-h2 text-[1.15rem]">
                  <Link href={nav.path} className="hover:text-[hsl(var(--accent-blue))]">
                    {section.title}
                  </Link>
                </h2>
              </div>

              <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {children.map((child) => {
                  const grandchildren = getChildren(child);
                  return (
                    <div key={child.path}>
                      <Link href={child.path} className="cc-mega-col-title hover:text-[hsl(var(--accent-blue))]">
                        {label(child.node)}
                      </Link>
                      {grandchildren.length > 0 && (
                        <ul className="mt-1.5 space-y-0.5">
                          {grandchildren.map((grandchild) => (
                            <li key={grandchild.path}>
                              <SiteMapLink path={grandchild.path} name={label(grandchild.node)} />
                              {getChildren(grandchild).length > 0 && (
                                <ul className="ml-3 border-l border-[hsl(var(--rule))] pl-2.5">
                                  {getChildren(grandchild).map((leaf) => (
                                    <li key={leaf.path}>
                                      <SiteMapLink path={leaf.path} name={label(leaf.node)} small />
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="mb-12" aria-labelledby="sm-calculators">
          <div className="border-b border-[hsl(var(--rule))] pb-2">
            <h2 id="sm-calculators" className="cc-h2 text-[1.15rem]">
              <Link href="/calculators" className="hover:text-[hsl(var(--accent-blue))]">
                Calculators and reference tables
              </Link>
            </h2>
          </div>
          <ul className="mt-4 grid gap-x-8 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3">
            {CALCULATORS.map((calculator) => (
              <li key={calculator.slug}>
                <Link href={calculatorPath(calculator.slug)} className="cc-mega-link">
                  {calculator.title}
                </Link>
              </li>
            ))}
            {REFERENCE_TABLES.map((table) => (
              <li key={table.slug}>
                <Link href={tablePath(table.slug)} className="cc-mega-link">
                  {table.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="sm-glossary">
          <div className="border-b border-[hsl(var(--rule))] pb-2">
            <h2 id="sm-glossary" className="cc-h2 text-[1.15rem]">
              <Link href="/glossary" className="hover:text-[hsl(var(--accent-blue))]">
                Glossary
              </Link>
            </h2>
          </div>
          <ul className="mt-4 grid gap-x-8 gap-y-0.5 sm:grid-cols-3 lg:grid-cols-4">
            {GLOSSARY_ALPHABETICAL.map((term) => (
              <li key={term.slug}>
                <Link href={glossaryPath(term.slug)} className="cc-mega-link">
                  {term.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sm-site">
          <div className="border-b border-[hsl(var(--rule))] pb-2">
            <h2 id="sm-site" className="cc-h2 text-[1.15rem]">
              Site pages
            </h2>
          </div>
          <ul className="mt-4 grid gap-x-8 gap-y-0.5 sm:grid-cols-3 lg:grid-cols-4">
            {UTILITY_PAGES.map((page) => (
              <li key={page.path}>
                <Link href={page.path} className="cc-mega-link">
                  {page.name}
                </Link>
              </li>
            ))}
            {PROJECTS.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/tools-projects/eric-sullivans-personal-projects/${project.slug}`}
                  className="cc-mega-link"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Disclaimer kind="independence" className="mt-10" />
      </div>
    </>
  );
}

function SiteMapLink({ path, name, small = false }: { path: string; name: string; small?: boolean }) {
  return (
    <Link href={path} className={`cc-mega-link ${small ? 'text-[0.8rem]' : ''}`}>
      {name}
      {hasContent(path) && (
        <span
          role="img"
          aria-label="Has a written guide"
          className="ml-1.5 inline-block size-1.5 rounded-full bg-[hsl(var(--teal))] align-middle"
        />
      )}
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Topics
 * ------------------------------------------------------------------ */

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const TAG_BY_SLUG: Record<string, string> = Object.fromEntries(
  ALL_TAGS.map(({ tag }) => [tagSlug(tag), tag]),
);

export function isTagSlug(slug: string): boolean {
  return slug in TAG_BY_SLUG;
}

/**
 * Topic hubs.
 *
 * Tags cut across the taxonomy, so these pages connect a reference in Controls
 * to a procedure in How-To and a diagnostic in Troubleshooting that the tree
 * itself keeps several levels apart.
 */
export function TopicsIndexPage() {
  const trail = [{ name: 'Topics', path: '/topics' }];

  return (
    <>
      <Seo
        title="Topics"
        description="Browse CurryControls.com by topic. Each topic gathers the references, how-to procedures, and troubleshooting guides that share a subject, across the whole knowledge base."
        path="/topics"
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          itemListSchema(
            'Topics',
            '/topics',
            ALL_TAGS.map(({ tag }) => ({ name: tag, path: `/topics/${tagSlug(tag)}` })),
          ),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">Topics</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            The taxonomy organizes material by discipline. Topics cut across it, gathering the
            reference, the procedure, and the diagnostic guide that share a subject.
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_TAGS.map(({ tag, count }) => (
            <li key={tag}>
              <Link href={`/topics/${tagSlug(tag)}`} className="cc-card group flex items-center justify-between gap-3 p-4">
                <span>
                  <span className="block font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
                    {tag}
                  </span>
                  <span className="cc-mono text-[0.7rem] uppercase tracking-wider text-[hsl(var(--ink-2))]/70">
                    {count} {count === 1 ? 'guide' : 'guides'}
                  </span>
                </span>
                <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-[hsl(var(--ink-2))]/40" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <ContactCta />
        </div>
      </div>
    </>
  );
}

export function TopicPage({ slug }: { slug: string }) {
  const tag = TAG_BY_SLUG[slug];
  if (!tag) return null;

  const entries = entriesWithTag(tag);
  const trail = [
    { name: 'Topics', path: '/topics' },
    { name: tag, path: `/topics/${slug}` },
  ];

  return (
    <>
      <Seo
        title={`${tag} — Topic`}
        description={`Everything on CurryControls.com tagged ${tag}: ${entries.length} references, procedures, and troubleshooting guides across the controls and automation knowledge base.`}
        path={`/topics/${slug}`}
        keywords={[tag]}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          itemListSchema(
            `${tag} topic`,
            `/topics/${slug}`,
            entries.map((entry) => ({ name: entry.title, path: entry.path })),
          ),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <p className="cc-eyebrow mt-4">Topic</p>
          <h1 className="cc-h1 mt-1">{tag}</h1>
          <p className="cc-lead mt-3">
            {entries.length} {entries.length === 1 ? 'guide' : 'guides'} across the knowledge base.
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <EntryCard key={entry.path} entry={entry} />
          ))}
        </div>

        <section className="mt-12" aria-labelledby="other-topics-heading">
          <h2 id="other-topics-heading" className="cc-h2">
            Other topics
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {ALL_TAGS.filter((t) => t.tag !== tag).map(({ tag: other }) => (
              <li key={other}>
                <Link href={`/topics/${tagSlug(other)}`} className="cc-tag">
                  {other}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <ContactCta />
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Questions and answers
 * ------------------------------------------------------------------ */

/**
 * Every question the site answers, in one place.
 *
 * Deliberately does not emit FAQPage structured data: each source page already
 * owns the FAQPage entity for its own questions, and duplicating them here
 * would put two competing entities in the graph for the same content. This
 * page is declared as a collection instead.
 */
export function FaqHubPage() {
  const trail = [{ name: 'Questions and answers', path: '/faq' }];
  const withFaqs = ENTRIES_BY_RECENCY.filter((entry) => (entry.faqs?.length ?? 0) > 0);
  const total = withFaqs.reduce((sum, entry) => sum + (entry.faqs?.length ?? 0), 0);

  return (
    <>
      <Seo
        title="Questions and answers"
        description={`${total} direct answers to questions about PLCs, SCADA, instrumentation, control panels, industrial networking, OT security, and water and wastewater control systems.`}
        path="/faq"
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          itemListSchema(
            'Questions and answers',
            '/faq',
            withFaqs.map((entry) => ({ name: entry.title, path: entry.path })),
          ),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">Questions and answers</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            {total} questions answered across the knowledge base, grouped by the guide they come
            from. Each answer stands on its own; follow the link for the full reference behind it.
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <nav aria-label="Jump to a guide" className="cc-card mb-10 p-4">
          <p className="cc-eyebrow mb-2.5">Jump to</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {withFaqs.map((entry) => (
              <li key={entry.path}>
                <a href={`#faq-${entry.path.replace(/\//g, '-')}`} className="cc-link text-[0.84rem] no-underline hover:underline">
                  {entry.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {withFaqs.map((entry) => (
          <section
            key={entry.path}
            id={`faq-${entry.path.replace(/\//g, '-')}`}
            className="mb-11 scroll-mt-32"
            aria-labelledby={`h-${entry.path.replace(/\//g, '-')}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[hsl(var(--rule))] pb-2">
              <h2 id={`h-${entry.path.replace(/\//g, '-')}`} className="cc-h2 text-[1.15rem]">
                {entry.title}
              </h2>
              <Link href={entry.path} className="text-[0.82rem] font-semibold text-[hsl(var(--accent-blue))]">
                Read the guide →
              </Link>
            </div>
            <dl className="mt-4 divide-y divide-[hsl(var(--rule))]">
              {(entry.faqs ?? []).map((faq) => (
                <div key={faq.q} className="py-4">
                  <dt className="cc-h3 text-[0.98rem]">{faq.q}</dt>
                  <dd className="mt-1.5 text-[0.92rem] leading-7 text-[hsl(var(--ink-2))]">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <div className="mt-4">
          <ContactCta />
        </div>
        <Disclaimer kind="engineering" className="mt-8" />
      </div>
    </>
  );
}

