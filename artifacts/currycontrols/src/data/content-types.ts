/**
 * Content model.
 *
 * Entries are structured blocks rather than raw markup so that the renderer,
 * the search index, and the JSON-LD generator all read from the same source.
 * An entry's `path` must match a node in the navigation tree; the router
 * renders the article template for paths that have an entry and a hub page
 * for those that do not.
 */

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'dl'; items: { term: string; def: string }[] }
  | { t: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { t: 'callout'; kind: 'note' | 'tip' | 'warning' | 'safety'; title: string; text: string }
  | { t: 'code'; caption?: string; lang?: string; code: string }
  | { t: 'formula'; expr: string; where?: string[] }
  | { t: 'steps'; items: { title: string; text: string }[] };

export type Faq = { q: string; a: string };

/** Symptom / cause / check triple used by troubleshooting entries. */
export type CauseCheck = { cause: string; check: string };

export type EntryKind = 'reference' | 'article' | 'howto' | 'troubleshooting';

export type Entry = {
  /** Absolute path; must exist in the navigation tree. */
  path: string;
  kind: EntryKind;
  title: string;
  /** Meta description and card blurb. 140-165 characters reads best. */
  summary: string;
  /**
   * Answer-engine block. A direct, self-contained answer to the page's core
   * question in roughly 40-70 words. Rendered first on the page and used as
   * the `description` in structured data.
   */
  answer: string;
  /** Scannable takeaways. Rendered as a key-points list under the answer. */
  keyPoints: string[];
  published: string;
  updated: string;
  /** Minutes. */
  readingTime: number;
  tags: string[];
  blocks: Block[];
  faqs?: Faq[];
  /** Extra related paths beyond the automatic taxonomy siblings. */
  related?: string[];
  /** Troubleshooting only. */
  symptom?: string;
  causes?: CauseCheck[];
  /** How-to only: what you need before starting. */
  supplies?: string[];
};

export const KIND_LABEL: Record<EntryKind, string> = {
  reference: 'Reference',
  article: 'Article',
  howto: 'How-To',
  troubleshooting: 'Troubleshooting',
};
