import type { Faq } from '@/data/content';

/**
 * FAQ section.
 *
 * Rendered as plain, always-visible question and answer pairs rather than a
 * collapsed accordion, so the text is present for readers and crawlers
 * without requiring interaction. The matching FAQPage JSON-LD is emitted by
 * the page that renders this.
 */
export function FaqSection({ faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-12" data-testid="faq-section">
      <h2 id="faq-heading" className="cc-h2">
        {title}
      </h2>
      <dl className="mt-4 divide-y divide-[hsl(var(--rule))] border-y border-[hsl(var(--rule))]">
        {faqs.map((faq) => (
          <div key={faq.q} className="py-5">
            <dt className="cc-h3 text-[1rem]">{faq.q}</dt>
            <dd className="mt-2 text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
