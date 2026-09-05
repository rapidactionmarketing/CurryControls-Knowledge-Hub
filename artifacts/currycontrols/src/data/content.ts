/**
 * Content index.
 *
 * Every entry is keyed by its navigation path. The router renders the article
 * template when a path has an entry here and the hub template when it does
 * not, so adding written content to a taxonomy node is a one-line change.
 */

import type { Entry, EntryKind } from './content-types';
import { PLC_ENTRIES } from './content/plc';
import { ANALOG_ENTRIES } from './content/analog';
import { SCADA_ENTRIES } from './content/scada';
import { INSTRUMENTATION_ENTRIES } from './content/instrumentation';
import { PANEL_ENTRIES } from './content/panels';
import { WATER_ENTRIES } from './content/water';
import { COMMS_ENTRIES } from './content/comms';
import { SECURITY_ENTRIES } from './content/security';
import { HOWTO_ENTRIES } from './content/howto';
import { TROUBLESHOOTING_ENTRIES } from './content/troubleshooting';
import { LIBRARY_ENTRIES } from './content/library';

export type { Entry, EntryKind, Block, Faq, CauseCheck } from './content-types';
export { KIND_LABEL } from './content-types';

export const ENTRIES: Entry[] = [
  ...PLC_ENTRIES,
  ...ANALOG_ENTRIES,
  ...COMMS_ENTRIES,
  ...SCADA_ENTRIES,
  ...INSTRUMENTATION_ENTRIES,
  ...PANEL_ENTRIES,
  ...WATER_ENTRIES,
  ...SECURITY_ENTRIES,
  ...HOWTO_ENTRIES,
  ...TROUBLESHOOTING_ENTRIES,
  ...LIBRARY_ENTRIES,
];

const byPath = new Map<string, Entry>(ENTRIES.map((e) => [e.path, e]));

export function getContent(path: string): Entry | undefined {
  return byPath.get(path);
}

export function hasContent(path: string): boolean {
  return byPath.has(path);
}

/** Newest first, by updated date. */
export const ENTRIES_BY_RECENCY: Entry[] = [...ENTRIES].sort((a, b) =>
  b.updated.localeCompare(a.updated),
);

export function entriesOfKind(kind: EntryKind): Entry[] {
  return ENTRIES_BY_RECENCY.filter((e) => e.kind === kind);
}

export function entriesWithTag(tag: string): Entry[] {
  const needle = tag.toLowerCase();
  return ENTRIES_BY_RECENCY.filter((e) =>
    e.tags.some((t) => t.toLowerCase() === needle),
  );
}

/** Every distinct tag, most used first. */
export const ALL_TAGS: { tag: string; count: number }[] = (() => {
  const counts = new Map<string, number>();
  for (const entry of ENTRIES) {
    for (const tag of entry.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
})();

/** Word count of an entry's prose, used for reading-time sanity checks. */
export function wordCount(entry: Entry): number {
  let text = `${entry.summary} ${entry.answer} ${entry.keyPoints.join(' ')}`;
  for (const block of entry.blocks) {
    switch (block.t) {
      case 'p':
      case 'h2':
      case 'h3':
        text += ` ${block.text}`;
        break;
      case 'ul':
      case 'ol':
        text += ` ${block.items.join(' ')}`;
        break;
      case 'dl':
        text += ` ${block.items.map((i) => `${i.term} ${i.def}`).join(' ')}`;
        break;
      case 'steps':
        text += ` ${block.items.map((i) => `${i.title} ${i.text}`).join(' ')}`;
        break;
      case 'table':
        text += ` ${block.head.join(' ')} ${block.rows.flat().join(' ')}`;
        break;
      case 'callout':
        text += ` ${block.title} ${block.text}`;
        break;
      default:
        break;
    }
  }
  for (const faq of entry.faqs ?? []) text += ` ${faq.q} ${faq.a}`;
  return text.trim().split(/\s+/).length;
}
