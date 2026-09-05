import { Clock3, RefreshCw, Stethoscope } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { AnswerBlock } from '@/components/blocks/answer-block';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { ContentBlocks, TableOfContents } from '@/components/blocks/content-blocks';
import { ContactCta } from '@/components/blocks/contact-cta';
import { DisclaimerBox } from '@/components/blocks/disclaimer';
import { CodeStandardNotice, TroubleshootingNotice, referencesStandards } from '@/components/blocks/technical-notices';
import { FaqSection } from '@/components/blocks/faq-section';
import { RelatedContent } from '@/components/blocks/related-content';
import { SequentialNav } from '@/components/blocks/sequential-nav';
import { formatDate } from '@/components/blocks/cards';
import { KIND_LABEL, type Entry } from '@/data/content';
import { getBreadcrumbs, type NavEntry } from '@/data/nav-index';
import {
  breadcrumbSchema,
  contentSchema,
  faqSchema,
  graph,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

/**
 * Template for a written knowledge-base entry.
 *
 * Leads with the direct answer, then key points, then the body. That ordering
 * serves a reader scanning for a single fact and is also what an answer engine
 * quotes. Safety-relevant content carries the safety and engineering
 * disclaimers automatically.
 */
export function EntryPage({ entry, nav }: { entry: Entry; nav: NavEntry }) {
  const trail = getBreadcrumbs(nav).map((crumb) => ({ name: crumb.node.title, path: crumb.path }));
  const isTroubleshooting = entry.kind === 'troubleshooting';
  const needsSafety =
    entry.kind === 'howto' ||
    isTroubleshooting ||
    entry.blocks.some((block) => block.t === 'callout' && block.kind === 'safety');
  // The code and standard notice appears wherever a code or standard is cited.
  const citesStandards = referencesStandards(
    [entry.title, entry.summary, entry.answer, ...entry.tags, JSON.stringify(entry.blocks)].join(' '),
  );

  return (
    <>
      <Seo
        title={entry.title}
        description={entry.summary}
        path={entry.path}
        type="article"
        publishedTime={entry.published}
        modifiedTime={entry.updated}
        keywords={entry.tags}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          contentSchema(entry),
          breadcrumbSchema(trail),
          faqSchema(entry.faqs ?? []),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-8 sm:py-10">
          <Breadcrumbs trail={trail} />

          <div className="mt-5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="cc-tag cc-tag-accent">{KIND_LABEL[entry.kind]}</span>
              {entry.tags.map((tag) => (
                <span key={tag} className="cc-tag">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="cc-h1 mt-3.5">{entry.title}</h1>
            <p className="cc-lead mt-3">{entry.summary}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.78rem] text-[hsl(var(--ink-2))]">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={12} aria-hidden="true" />
                {entry.readingTime} min read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw size={12} aria-hidden="true" />
                Updated {formatDate(entry.updated)}
              </span>
              <span>Published {formatDate(entry.published)}</span>
              <span>By Eric Sullivan</span>
            </div>
          </div>
        </div>
      </header>

      <div className="cc-container py-9">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_252px]">
          <article className="min-w-0 max-w-3xl">
            {isTroubleshooting && entry.symptom && (
              <section className="cc-callout mb-6 p-5" data-kind="note" aria-labelledby="symptom-heading">
                <div className="flex items-center gap-2">
                  <Stethoscope size={15} aria-hidden="true" className="text-[hsl(var(--navy))]" />
                  <h2 id="symptom-heading" className="cc-eyebrow">
                    Symptom
                  </h2>
                </div>
                <p className="mt-1.5 text-[0.95rem] leading-7 text-[hsl(var(--ink))]">{entry.symptom}</p>
              </section>
            )}

            <AnswerBlock question={entry.title} answer={entry.answer} keyPoints={entry.keyPoints} />

            {entry.supplies && entry.supplies.length > 0 && (
              <section className="mt-8" aria-labelledby="supplies-heading">
                <h2 id="supplies-heading" className="cc-h2">
                  What you need
                </h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {entry.supplies.map((supply) => (
                    <li
                      key={supply}
                      className="rounded border border-[hsl(var(--rule))] px-3 py-2 text-[0.86rem] text-[hsl(var(--ink-2))]"
                    >
                      {supply}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {isTroubleshooting && entry.causes && entry.causes.length > 0 && (
              <section className="mt-9" aria-labelledby="causes-heading">
                <h2 id="causes-heading" className="cc-h2">
                  Possible causes and what to check
                </h2>
                <div className="cc-table-wrap mt-4">
                  <table className="cc-table">
                    <thead>
                      <tr>
                        <th scope="col">Possible cause</th>
                        <th scope="col">What to check</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.causes.map((cause) => (
                        <tr key={cause.cause}>
                          <td className="font-medium text-[hsl(var(--navy))]">{cause.cause}</td>
                          <td>{cause.check}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {isTroubleshooting && <TroubleshootingNotice className="mt-6" />}

            <div className="mt-9">
              <ContentBlocks blocks={entry.blocks} />
            </div>

            {citesStandards && <CodeStandardNotice className="mt-8" />}

            {entry.faqs && <FaqSection faqs={entry.faqs} />}

            <RelatedContent current={nav} explicit={entry.related} />

            <SequentialNav current={nav} />

            <div className="mt-10">
              <ContactCta />
            </div>

            <DisclaimerBox
              kinds={needsSafety ? ['safety', 'engineering', 'endorsement'] : ['engineering', 'endorsement']}
            />
          </article>

          <aside className="cc-no-print lg:sticky lg:top-[140px] lg:self-start">
            <TableOfContents blocks={entry.blocks} />
          </aside>
        </div>
      </div>
    </>
  );
}
