import type { LegalBlock, LegalSection } from '@/data/site-legal';

/**
 * Renders the paragraph-and-list blocks that the legal record uses for the
 * disclaimer sections, so the disclaimer page and the first-visit notice show
 * the same content from the same data.
 */
export function LegalBlocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.t === 'p' ? (
          <p key={index}>{block.text}</p>
        ) : (
          <ul key={index} className="cc-legal-list">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

/** One section of the disclaimer, with its heading at the requested level. */
export function LegalSectionView({
  section,
  level = 2,
}: {
  section: LegalSection;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className="cc-legal-section">
      <Heading id={`${section.id}-heading`} className={level === 2 ? 'cc-h2' : 'cc-legal-h3'}>
        {section.heading}
      </Heading>
      <LegalBlocks blocks={section.blocks} />
    </section>
  );
}
