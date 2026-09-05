import { Link } from 'wouter';
import { ArrowRight, Calculator as CalcIcon } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { CalculatorDisclaimer } from '@/components/blocks/calculator-disclaimer';
import { CalculatorForm } from '@/components/calculators/calculator-form';
import { ContactCta } from '@/components/blocks/contact-cta';
import { FaqSection } from '@/components/blocks/faq-section';
import { Disclaimer } from '@/components/blocks/disclaimer';
import {
  CALCULATORS,
  CALCULATOR_BY_SLUG,
  POPULATED_CATEGORIES,
  calculatorPath,
  calculatorsByCategory,
} from '@/data/calculators';
import { REFERENCE_TABLES, tablePath, TABLE_BY_SLUG } from '@/data/tables';
import { getContent } from '@/data/content';
import { SITE } from '@/data/site';
import { describe, getEntry } from '@/data/nav-index';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  itemListSchema,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

export function CalculatorsIndexPage() {
  const trail = [{ name: 'Calculators', path: '/calculators' }];

  return (
    <>
      <Seo
        title="Controls and Automation Calculators"
        description={`${CALCULATORS.length} calculators for electrical, control panel, instrumentation, PLC, networking, and water and wastewater work. Each one shows its arithmetic and states what it does not account for.`}
        path="/calculators"
        keywords={[
          'electrical calculator',
          'voltage drop calculator',
          'ampacity calculator',
          '4-20 mA calculator',
          'pump calculator',
          'conduit fill',
        ]}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          itemListSchema(
            'Controls and Automation Calculators',
            '/calculators',
            CALCULATORS.map((c) => ({ name: c.title, path: calculatorPath(c.slug) })),
          ),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">Calculators</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            {CALCULATORS.length} calculators for the arithmetic that comes up on real jobs. Every one
            shows its work, names the table value it used, and states what it does not account for,
            so a qualified person can check it rather than trust it.
          </p>
          <div className="mt-6 max-w-3xl">
            <CalculatorDisclaimer />
          </div>
        </div>
      </header>

      <div className="cc-container py-10">
        {POPULATED_CATEGORIES.map((category) => {
          const items = calculatorsByCategory(category);
          return (
            <section key={category} className="mb-11" aria-labelledby={`cat-${category}`}>
              <h2 id={`cat-${category}`} className="cc-h2 border-b border-[hsl(var(--rule))] pb-2">
                {category}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((calculator) => (
                  <Link
                    key={calculator.slug}
                    href={calculatorPath(calculator.slug)}
                    className="cc-card group flex flex-col p-4"
                    data-testid={`calculator-card-${calculator.slug}`}
                  >
                    <span className="flex items-start gap-2">
                      <CalcIcon
                        size={15}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[hsl(var(--accent-blue))]"
                      />
                      <span className="font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
                        {calculator.title}
                      </span>
                    </span>
                    <span className="mt-2 flex-1 text-[0.84rem] leading-6 text-[hsl(var(--ink-2))]">
                      {calculator.summary}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mb-11" aria-labelledby="tables-heading">
          <h2 id="tables-heading" className="cc-h2 border-b border-[hsl(var(--rule))] pb-2">
            Reference tables
          </h2>
          <p className="mt-2 text-[0.9rem] text-[hsl(var(--ink-2))]">
            The lookup tables behind several of these calculators, published separately so the values
            can be read directly.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REFERENCE_TABLES.map((table) => (
              <li key={table.slug}>
                <Link href={tablePath(table.slug)} className="cc-card group flex h-full flex-col p-4">
                  <span className="font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
                    {table.title}
                  </span>
                  <span className="mt-1.5 flex-1 text-[0.84rem] leading-6 text-[hsl(var(--ink-2))]">
                    {table.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <ContactCta />
        <Disclaimer kind="engineering" className="mt-8" />
      </div>
    </>
  );
}

export function CalculatorPage({ slug }: { slug: string }) {
  const calculator = CALCULATOR_BY_SLUG[slug];
  if (!calculator) return null;

  const path = calculatorPath(calculator.slug);
  const trail = [
    { name: 'Calculators', path: '/calculators' },
    { name: calculator.title, path },
  ];

  const siblings = calculatorsByCategory(calculator.category).filter((c) => c.slug !== calculator.slug);
  const relatedCalcs = (calculator.relatedCalculators ?? [])
    .map((s) => CALCULATOR_BY_SLUG[s])
    .filter(Boolean);

  return (
    <>
      <Seo
        title={calculator.title}
        description={calculator.summary}
        path={path}
        keywords={calculator.keywords}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          {
            '@type': 'WebApplication',
            name: calculator.title,
            description: calculator.summary,
            url: `${SITE.url}${path}`,
            applicationCategory: 'EngineeringApplication',
            operatingSystem: 'Any modern web browser',
            browserRequirements: 'Requires JavaScript',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          breadcrumbSchema(trail),
          faqSchema(calculator.faqs ?? []),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-8">
          <Breadcrumbs trail={trail} />
          <p className="cc-eyebrow mt-4">{calculator.category}</p>
          <h1 className="cc-h1 mt-1">{calculator.title}</h1>
          <p className="cc-lead mt-3 max-w-3xl">{calculator.summary}</p>
        </div>
      </header>

      <div className="cc-container py-8">
        <div className="mb-7 max-w-4xl">
          <CalculatorDisclaimer />
        </div>

        <CalculatorForm calculator={calculator} />

        <div className="mt-12 grid gap-9 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 max-w-2xl">
            <section className="cc-answer p-5 sm:p-6" aria-labelledby="calc-answer-heading">
              <h2 id="calc-answer-heading" className="cc-eyebrow mb-2">
                How this is calculated
              </h2>
              <p className="text-[1rem] leading-7 text-[hsl(var(--ink))]">{calculator.answer}</p>
            </section>

            {calculator.formulas && calculator.formulas.length > 0 && (
              <section className="mt-8" aria-labelledby="formulas-heading">
                <h2 id="formulas-heading" className="cc-h2">
                  Formulas
                </h2>
                <div className="mt-3 space-y-4">
                  {calculator.formulas.map((formula) => (
                    <div key={formula.expr}>
                      <p className="cc-formula">{formula.expr}</p>
                      {formula.where && formula.where.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {formula.where.map((line) => (
                            <li key={line} className="cc-mono text-[0.78rem] text-[hsl(var(--ink-2))]">
                              {line}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {calculator.notes && calculator.notes.length > 0 && (
              <div className="cc-prose mt-8 space-y-4">
                {calculator.notes.map((note) => (
                  <p key={note} className="text-[0.975rem]">
                    {note}
                  </p>
                ))}
              </div>
            )}

            <section className="mt-8" aria-labelledby="assumptions-heading">
              <h2 id="assumptions-heading" className="cc-h2">
                Assumptions built into this calculator
              </h2>
              <ul className="mt-3 space-y-2">
                {calculator.assumptions.map((assumption) => (
                  <li key={assumption} className="flex gap-2.5 text-[0.94rem] leading-7">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent-blue))]"
                    />
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </section>

            {calculator.faqs && <FaqSection faqs={calculator.faqs} />}

            <div className="mt-10">
              <ContactCta />
            </div>

            <aside className="mt-8 space-y-2 rounded border border-[hsl(var(--rule))] bg-[hsl(var(--surface))] p-4">
              <Disclaimer kind="calculator" />
              <Disclaimer kind="codeAuthority" />
              <Disclaimer kind="engineering" />
            </aside>
          </div>

          <aside className="lg:sticky lg:top-[140px] lg:self-start">
            {calculator.standards && calculator.standards.length > 0 && (
              <div className="cc-card p-4">
                <p className="cc-eyebrow">Governed by</p>
                <ul className="mt-2 space-y-1.5">
                  {calculator.standards.map((standard) => (
                    <li key={standard} className="text-[0.82rem] leading-5.5 text-[hsl(var(--ink-2))]">
                      {standard}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.74rem] leading-4.5 text-[hsl(var(--ink-2))]">
                  The edition adopted where the work is performed governs, not this page.
                </p>
              </div>
            )}

            {relatedCalcs.length > 0 && (
              <div className="cc-card mt-4 p-4">
                <p className="cc-eyebrow">Related calculators</p>
                <ul className="mt-2 space-y-1.5">
                  {relatedCalcs.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={calculatorPath(other.slug)}
                        className="inline-flex items-start gap-1.5 text-[0.84rem] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {calculator.related && calculator.related.length > 0 && (
              <div className="cc-card mt-4 p-4">
                <p className="cc-eyebrow">Read the reference</p>
                <ul className="mt-2 space-y-2">
                  {calculator.related.map((refPath) => {
                    const nav = getEntry(refPath);
                    if (!nav) return null;
                    const entry = getContent(refPath);
                    return (
                      <li key={refPath}>
                        <Link href={refPath} className="group block">
                          <span className="block text-[0.84rem] font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
                            {entry ? entry.title : nav.node.title}
                          </span>
                          <span className="mt-0.5 block line-clamp-2 text-[0.76rem] leading-5 text-[hsl(var(--ink-2))]">
                            {entry ? entry.summary : describe(nav)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {siblings.length > 0 && (
              <div className="cc-card mt-4 p-4">
                <p className="cc-eyebrow">More {calculator.category.toLowerCase()} calculators</p>
                <ul className="mt-2 space-y-1.5">
                  {siblings.slice(0, 8).map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={calculatorPath(other.slug)}
                        className="text-[0.84rem] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/calculators"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[hsl(var(--accent-blue))]"
                >
                  All calculators
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Reference tables
 * ------------------------------------------------------------------ */

export function TablesIndexPage() {
  const trail = [{ name: 'Reference tables', path: '/tables' }];
  return (
    <>
      <Seo
        title="Reference Tables"
        description="Wire and ampacity tables, temperature and conductor derating factors, motor full-load current, conduit fill, PLC data type ranges, and unit conversions for controls work."
        path="/tables"
        keywords={['wire table', 'ampacity table', 'conduit fill table', 'motor FLA table', 'reference tables']}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          itemListSchema(
            'Reference Tables',
            '/tables',
            REFERENCE_TABLES.map((t) => ({ name: t.title, path: tablePath(t.slug) })),
          ),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">Reference tables</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            The lookup tables this site's calculators read from, published so the values can be seen
            directly. Each one states the document it comes from.
          </p>
          <div className="mt-6 max-w-3xl">
            <CalculatorDisclaimer variant="table" />
          </div>
        </div>
      </header>

      <div className="cc-container py-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REFERENCE_TABLES.map((table) => (
            <li key={table.slug}>
              <Link href={tablePath(table.slug)} className="cc-card group flex h-full flex-col p-4">
                <span className="cc-tag mb-2 self-start">{table.category}</span>
                <span className="font-semibold text-[hsl(var(--navy))] group-hover:text-[hsl(var(--accent-blue))]">
                  {table.title}
                </span>
                <span className="mt-1.5 flex-1 text-[0.84rem] leading-6 text-[hsl(var(--ink-2))]">
                  {table.summary}
                </span>
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

export function TablePage({ slug }: { slug: string }) {
  const table = TABLE_BY_SLUG[slug];
  if (!table) return null;

  const path = tablePath(table.slug);
  const trail = [
    { name: 'Reference tables', path: '/tables' },
    { name: table.title, path },
  ];

  return (
    <>
      <Seo
        title={table.title}
        description={table.summary}
        path={path}
        keywords={table.keywords}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          {
            '@type': 'Table',
            about: table.title,
            name: table.title,
            description: table.summary,
            url: `${SITE.url}${path}`,
          },
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-8">
          <Breadcrumbs trail={trail} />
          <p className="cc-eyebrow mt-4">{table.category}</p>
          <h1 className="cc-h1 mt-1">{table.title}</h1>
          <p className="cc-lead mt-3 max-w-3xl">{table.summary}</p>
        </div>
      </header>

      <div className="cc-container py-8">
        <div className="mb-7 max-w-4xl">
          <CalculatorDisclaimer variant="table" />
        </div>

        <div className="cc-card mb-6 max-w-4xl border-l-[3px] border-l-[hsl(var(--accent-blue))] p-4">
          <p className="cc-eyebrow">Source of these values</p>
          <p className="mt-1.5 text-[0.9rem] leading-6.5 text-[hsl(var(--ink))]">{table.basis}</p>
        </div>

        <div className="cc-table-wrap" data-testid="reference-table">
          <table className="cc-table">
            <thead>
              <tr>
                {table.head.map((heading) => (
                  <th key={heading} scope="col">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={cellIndex === 0 ? 'font-medium text-[hsl(var(--navy))]' : ''}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-9 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 max-w-2xl">
            <section className="cc-answer p-5" aria-labelledby="table-answer-heading">
              <h2 id="table-answer-heading" className="cc-eyebrow mb-2">
                In short
              </h2>
              <p className="text-[1rem] leading-7 text-[hsl(var(--ink))]">{table.answer}</p>
            </section>

            <section className="mt-8" aria-labelledby="table-notes-heading">
              <h2 id="table-notes-heading" className="cc-h2">
                Notes and limits
              </h2>
              <ul className="mt-3 space-y-2">
                {table.notes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-[0.94rem] leading-7">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent-blue))]"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10">
              <ContactCta />
            </div>

            <aside className="mt-8 space-y-2 rounded border border-[hsl(var(--rule))] bg-[hsl(var(--surface))] p-4">
              <Disclaimer kind="tables" />
              <Disclaimer kind="codeAuthority" />
            </aside>
          </div>

          <aside className="lg:sticky lg:top-[140px] lg:self-start">
            {table.relatedCalculators && table.relatedCalculators.length > 0 && (
              <div className="cc-card p-4">
                <p className="cc-eyebrow">Calculators using this</p>
                <ul className="mt-2 space-y-1.5">
                  {table.relatedCalculators.map((s) => {
                    const calculator = CALCULATOR_BY_SLUG[s];
                    if (!calculator) return null;
                    return (
                      <li key={s}>
                        <Link
                          href={calculatorPath(s)}
                          className="text-[0.84rem] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]"
                        >
                          {calculator.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="cc-card mt-4 p-4">
              <p className="cc-eyebrow">Other tables</p>
              <ul className="mt-2 space-y-1.5">
                {REFERENCE_TABLES.filter((t) => t.slug !== table.slug)
                  .slice(0, 10)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={tablePath(other.slug)}
                        className="text-[0.84rem] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
