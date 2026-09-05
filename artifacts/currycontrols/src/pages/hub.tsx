import { Link } from 'wouter';
import { ArrowRight, FileText } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { TopicCard } from '@/components/blocks/cards';
import { EntryCard } from '@/components/blocks/cards';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { Icon } from '@/components/icon';
import { getContent, hasContent } from '@/data/content';
import {
  countDescendants,
  describe,
  getBreadcrumbs,
  getChildren,
  getLeafDescendants,
  label,
  type NavEntry,
} from '@/data/nav-index';
import type { NavSection } from '@/data/navigation';
import {
  breadcrumbSchema,
  collectionSchema,
  graph,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

/**
 * Hub page for any node in the taxonomy that does not have a written entry.
 *
 * Renders the node's own children as browsable cards, surfaces any written
 * guides beneath it, and emits CollectionPage plus BreadcrumbList structured
 * data. This is what makes a 530-node menu resolve to 530 real pages rather
 * than a wall of dead links.
 */
export function HubPage({ nav }: { nav: NavEntry }) {
  const children = getChildren(nav);
  const trail = getBreadcrumbs(nav).map((crumb) => ({ name: crumb.node.title, path: crumb.path }));
  const section = nav.section as NavSection;
  const isSection = nav.depth === 0;

  // Written guides anywhere beneath this node.
  const guides = getLeafDescendants(nav)
    .filter((leaf) => hasContent(leaf.path))
    .map((leaf) => getContent(leaf.path)!)
    .sort((a, b) => b.updated.localeCompare(a.updated));

  const total = countDescendants(nav);
  const description = describe(nav);

  // A leaf with no written entry is a placeholder. It stays browsable and
  // linked, but it is not offered for indexing — thin pages help nobody.
  const isPlaceholder = children.length === 0 && guides.length === 0;

  return (
    <>
      <Seo
        title={isSection ? `${nav.node.title} — ${section.title} Knowledge Base` : nav.node.title}
        description={description.slice(0, 300)}
        path={nav.path}
        noindex={isPlaceholder}
        keywords={nav.node.keywords}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          collectionSchema(nav, children),
          breadcrumbSchema(trail),
        )}
      />

      <header className={isSection ? 'border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]' : 'border-b border-[hsl(var(--rule))]'}>
        <div className="cc-container py-8 sm:py-10">
          <Breadcrumbs trail={trail} />

          <div className="mt-5 flex items-start gap-4">
            {isSection && (
              <span className="hidden size-12 shrink-0 place-items-center rounded bg-white text-[hsl(var(--accent-blue))] ring-1 ring-[hsl(var(--rule))] sm:grid">
                <Icon name={section.icon} size={24} />
              </span>
            )}
            <div className="min-w-0">
              {!isSection && <p className="cc-eyebrow">{nav.trail.map((t) => t.node.title).join(' › ')}</p>}
              <h1 className="cc-h1 mt-1">{nav.node.title}</h1>
              <p className="cc-lead mt-3 max-w-3xl">
                {isSection ? section.blurb : description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {total > 0 && (
                  <span className="cc-tag">
                    {total} {total === 1 ? 'topic' : 'topics'}
                  </span>
                )}
                {guides.length > 0 && (
                  <span className="cc-tag cc-tag-accent">
                    {guides.length} written {guides.length === 1 ? 'guide' : 'guides'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="cc-container py-10">
        {guides.length > 0 && (
          <section aria-labelledby="guides-heading" className="mb-12">
            <h2 id="guides-heading" className="cc-h2">
              Written guides in this section
            </h2>
            <p className="mt-1.5 text-[0.9rem] text-[hsl(var(--ink-2))]">
              Full references, procedures, and diagnostic guides published under {nav.node.title}.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.slice(0, 6).map((entry) => (
                <EntryCard key={entry.path} entry={entry} />
              ))}
            </div>
          </section>
        )}

        {children.length > 0 ? (
          <section aria-labelledby="topics-heading">
            <h2 id="topics-heading" className="cc-h2">
              {isSection ? `Browse ${nav.node.title}` : 'Topics in this area'}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => (
                <TopicCard key={child.path} entry={child} icon={(child.node as { icon?: string }).icon} />
              ))}
            </div>

            {/* Deeper structure, so a visitor sees the full shape of the section. */}
            {children.some((child) => child.childPaths.length > 0) && (
              <div className="mt-10">
                <h2 className="cc-h2">Full contents</h2>
                <div className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                  {children
                    .filter((child) => child.childPaths.length > 0)
                    .map((child) => (
                      <div key={child.path}>
                        <Link
                          href={child.path}
                          className="cc-mega-col-title hover:text-[hsl(var(--accent-blue))]"
                        >
                          {label(child.node)}
                        </Link>
                        <ul className="mt-2 space-y-0.5">
                          {getChildren(child).map((grandchild) => (
                            <li key={grandchild.path}>
                              <Link href={grandchild.path} className="cc-mega-link">
                                {label(grandchild.node)}
                                {hasContent(grandchild.path) && (
                                  <span
                                    role="img"
                                    aria-label="Has a written guide"
                                    className="ml-1.5 inline-block size-1.5 rounded-full bg-[hsl(var(--teal))] align-middle"
                                  />
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <LeafPlaceholder nav={nav} />
        )}

        <div className="mt-12">
          <ContactCta />
        </div>

        <Disclaimer kind="endorsement" className="mt-8" />
      </div>
    </>
  );
}

/**
 * A leaf node with no written entry yet.
 *
 * This states plainly that the reference has not been written rather than
 * generating filler. Visitors get the taxonomy context, the neighbouring
 * topics, and a direct way to ask.
 */
function LeafPlaceholder({ nav }: { nav: NavEntry }) {
  const parent = nav.trail[nav.trail.length - 1];
  const siblings = parent ? getChildren(parent).filter((s) => s.path !== nav.path) : [];
  const written = siblings.filter((s) => hasContent(s.path));

  return (
    <section aria-labelledby="status-heading">
      <div className="cc-card p-6">
        <div className="flex items-center gap-2 text-[hsl(var(--ink-2))]">
          <FileText size={15} aria-hidden="true" />
          <span className="cc-eyebrow">Reference in preparation</span>
        </div>
        <h2 id="status-heading" className="cc-h2 mt-2">
          This reference has not been written yet
        </h2>
        <p className="mt-2.5 max-w-2xl text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">
          {nav.node.title} is part of the {nav.section.title} taxonomy and has a place in the
          knowledge base, but the full reference is still to be published. Rather than fill this page
          with generated text, it is left as a placeholder. If you need an answer on this topic now,
          call and ask.
        </p>
        <div className="mt-5">
          <ContactCta variant="inline" />
        </div>
      </div>

      {written.length > 0 && (
        <div className="mt-8">
          <h2 className="cc-h2">Published in {parent?.node.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {written.slice(0, 6).map((sibling) => (
              <EntryCard key={sibling.path} entry={getContent(sibling.path)!} />
            ))}
          </div>
        </div>
      )}

      {siblings.length > 0 && (
        <div className="mt-8">
          <h2 className="cc-h2">Other topics in {parent?.node.title}</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <li key={sibling.path}>
                <Link href={sibling.path} className="cc-mega-link">
                  {label(sibling.node)}
                </Link>
              </li>
            ))}
          </ul>
          {parent && (
            <Link
              href={parent.path}
              className="mt-5 inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-[hsl(var(--accent-blue))]"
            >
              Back to {parent.node.title}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
