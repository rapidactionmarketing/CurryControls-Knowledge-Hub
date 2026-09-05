import { AlertTriangle, Info, Lightbulb, ShieldAlert } from 'lucide-react';
import { ProgrammingExampleDisclaimer } from '@/components/blocks/technical-notices';
import type { Block } from '@/data/content';

/** Stable heading id so the table of contents and deep links agree. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CALLOUT_META = {
  note: { icon: Info, label: 'Note' },
  tip: { icon: Lightbulb, label: 'Tip' },
  warning: { icon: AlertTriangle, label: 'Warning' },
  safety: { icon: ShieldAlert, label: 'Safety' },
} as const;

/** Renders the structured content blocks that make up an entry. */
export function ContentBlocks({ blocks }: { blocks: Block[] }) {
  const firstCodeIndex = blocks.findIndex((block) => block.t === 'code');
  let stepCounter = 0;

  return (
    <div className="cc-prose space-y-5">
      {blocks.map((block, index) => {
        switch (block.t) {
          case 'h2':
            return (
              <h2 key={index} id={headingId(block.text)} className="cc-h2 !mt-10 scroll-mt-32">
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={index} id={headingId(block.text)} className="cc-h3 !mt-7 scroll-mt-32">
                {block.text}
              </h3>
            );

          case 'p':
            return (
              <p key={index} className="text-[0.975rem]">
                {block.text}
              </p>
            );

          case 'ul':
            return (
              <ul key={index} className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.95rem] leading-7">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent-blue))]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={index} className="space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] leading-7">
                    <span className="cc-mono mt-0.5 shrink-0 text-[0.8rem] font-bold text-[hsl(var(--accent-blue))]">
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );

          case 'dl':
            return (
              <dl key={index} className="divide-y divide-[hsl(var(--rule))] rounded border border-[hsl(var(--rule))]">
                {block.items.map((item) => (
                  <div key={item.term} className="p-4 sm:grid sm:grid-cols-[minmax(150px,230px)_1fr] sm:gap-5">
                    <dt className="cc-mono text-[0.82rem] font-semibold text-[hsl(var(--navy))]">
                      {item.term}
                    </dt>
                    <dd className="mt-1 text-[0.9rem] leading-6 text-[hsl(var(--ink-2))] sm:mt-0">
                      {item.def}
                    </dd>
                  </div>
                ))}
              </dl>
            );

          case 'steps': {
            const start = stepCounter;
            stepCounter += block.items.length;
            return (
              <ol key={index} className="space-y-4">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={item.title}
                    id={`step-${start + itemIndex + 1}`}
                    className="cc-card scroll-mt-32 p-4 sm:p-5"
                  >
                    <div className="flex gap-3.5">
                      <span className="cc-mono grid size-7 shrink-0 place-items-center rounded-full bg-[hsl(var(--navy))] text-[0.75rem] font-bold text-white">
                        {start + itemIndex + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="cc-h3 text-[0.98rem]">{item.title}</h3>
                        <p className="mt-1.5 text-[0.9rem] leading-6.5 text-[hsl(var(--ink-2))]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            );
          }

          case 'table':
            return (
              <figure key={index}>
                <div className="cc-table-wrap">
                  <table className="cc-table">
                    <thead>
                      <tr>
                        {block.head.map((cell) => (
                          <th key={cell} scope="col">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-[0.78rem] text-[hsl(var(--ink-2))]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'callout': {
            const meta = CALLOUT_META[block.kind];
            const CalloutIcon = meta.icon;
            return (
              <aside key={index} className="cc-callout p-4 sm:p-5" data-kind={block.kind}>
                <div className="flex items-center gap-2">
                  <CalloutIcon size={15} aria-hidden="true" className="text-[hsl(var(--navy))]" />
                  <span className="cc-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[hsl(var(--navy))]">
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1.5 font-semibold text-[hsl(var(--navy))]">{block.title}</p>
                <p className="mt-1 text-[0.9rem] leading-6.5 text-[hsl(var(--ink))]">{block.text}</p>
              </aside>
            );
          }

          case 'code':
            return (
              <div key={index}>
                <figure>
                  {block.caption && (
                    <figcaption className="mb-1.5 text-[0.78rem] font-medium text-[hsl(var(--ink-2))]">
                      {block.caption}
                    </figcaption>
                  )}
                  <pre className="cc-code">
                    <code>{block.code}</code>
                  </pre>
                </figure>
                {/* The programming notice sits with the first example on the page. */}
                {index === firstCodeIndex && <ProgrammingExampleDisclaimer className="mt-3" />}
              </div>
            );

          case 'formula':
            return (
              <div key={index}>
                <p className="cc-formula">{block.expr}</p>
                {block.where && block.where.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {block.where.map((line) => (
                      <li key={line} className="cc-mono text-[0.78rem] text-[hsl(var(--ink-2))]">
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

/** Table of contents built from the h2 blocks of an entry. */
export function TableOfContents({ blocks }: { blocks: Block[] }) {
  const headings = blocks.filter((block): block is Extract<Block, { t: 'h2' }> => block.t === 'h2');
  if (headings.length < 3) return null;

  return (
    <nav aria-labelledby="toc-heading" className="cc-card cc-no-print p-4" data-testid="table-of-contents">
      <h2 id="toc-heading" className="cc-eyebrow mb-2.5">
        On this page
      </h2>
      <ol className="space-y-1.5">
        {headings.map((heading) => (
          <li key={heading.text}>
            <a
              href={`#${headingId(heading.text)}`}
              className="text-[0.85rem] leading-5 text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
