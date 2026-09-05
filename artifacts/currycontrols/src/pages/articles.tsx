import { Link } from 'wouter';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { EntryCard } from '@/components/blocks/cards';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { ENTRIES_BY_RECENCY, type Entry } from '@/data/content';
import { getChildren, getEntry, label } from '@/data/nav-index';
import {
  breadcrumbSchema,
  collectionSchema,
  graph,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

/**
 * Maps an /articles child slug to the tags that select its content. A single
 * category can draw on several tags because entries are tagged by subject
 * rather than by publication category.
 */
const CATEGORY_TAGS: Record<string, string[]> = {
  latest: [],
  'plc-articles': ['PLC'],
  'scada-articles': ['SCADA', 'HMI'],
  'water-articles': ['Water'],
  'wastewater-articles': ['Wastewater', 'Lift Stations'],
  'instrumentation-articles': ['Instrumentation'],
  'panels-articles': ['Panels'],
  'networking-articles': ['Networking', 'Ethernet', 'Industrial Networks', 'Communications'],
  'cybersecurity-articles': ['Cybersecurity', 'OT', 'ICS'],
  'troubleshooting-articles': ['Troubleshooting'],
  'engineering-articles': ['Design', 'Standards', 'Engineering'],
  'industry-articles': ['Utilities', 'Industry'],
};

function selectEntries(slug: string | null): Entry[] {
  if (!slug || slug === 'latest') return ENTRIES_BY_RECENCY;
  const tags = (CATEGORY_TAGS[slug] ?? []).map((tag) => tag.toLowerCase());
  if (tags.length === 0) return ENTRIES_BY_RECENCY;
  return ENTRIES_BY_RECENCY.filter((entry) =>
    entry.tags.some((tag) => tags.includes(tag.toLowerCase())),
  );
}

export function ArticlesPage({ categorySlug = null }: { categorySlug?: string | null }) {
  const root = getEntry('/articles')!;
  const categories = getChildren(root);
  const active = categorySlug ? getEntry(`/articles/${categorySlug}`) : null;
  const entries = selectEntries(categorySlug);

  const path = active ? active.path : '/articles';
  const title = active ? `${active.node.title} — Articles` : 'Articles';
  const trail = active
    ? [
        { name: 'Articles', path: '/articles' },
        { name: active.node.title, path: active.path },
      ]
    : [{ name: 'Articles', path: '/articles' }];

  return (
    <>
      <Seo
        title={title}
        description={
          active
            ? `${active.node.title} on CurryControls.com — technical writing on controls, automation, instrumentation, and water and wastewater systems.`
            : 'Technical articles, references, how-to guides, and troubleshooting guides on controls, automation, instrumentation, and water and wastewater systems.'
        }
        path={path}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          collectionSchema(active ?? root, active ? [] : categories),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">{active ? active.node.title : 'Articles'}</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            Longer-form technical writing, published as it is finished and revised as field
            experience corrects it. Every entry carries its published and updated dates.
          </p>

          <nav aria-label="Article categories" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link href="/articles" className={`cc-tag ${!active ? 'cc-tag-accent' : ''}`}>
                  All
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    href={category.path}
                    className={`cc-tag ${active?.path === category.path ? 'cc-tag-accent' : ''}`}
                  >
                    {label(category.node)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="cc-container py-10">
        <p className="text-[0.86rem] text-[hsl(var(--ink-2))]">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </p>

        {entries.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <EntryCard key={entry.path} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="cc-card mt-5 p-6">
            <h2 className="cc-h2">Nothing published in this category yet</h2>
            <p className="mt-2.5 max-w-2xl text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">
              This category exists in the taxonomy but has no entries yet. Rather than fill it with
              generated text, it is left empty until real content is written.
            </p>
            <Link href="/articles" className="cc-btn cc-btn-outline mt-4">
              See everything published
            </Link>
          </div>
        )}

        <div className="mt-12">
          <ContactCta />
        </div>

        <Disclaimer kind="engineering" className="mt-8" />
      </div>
    </>
  );
}

export function isArticleCategory(slug: string): boolean {
  return slug in CATEGORY_TAGS;
}
