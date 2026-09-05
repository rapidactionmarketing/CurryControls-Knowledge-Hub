/**
 * Client-side search index.
 *
 * Built once at module load from the navigation tree, the written content
 * entries, and the project list. Scoring favours title matches over body
 * matches and prefers pages that have written content over taxonomy stubs,
 * so a search for "4-20 mA" surfaces the written reference before the ten
 * menu nodes that mention it.
 */

import { NAV_ENTRIES, describe, getEntry } from '@/data/nav-index';
import { ENTRIES, KIND_LABEL, type EntryKind } from '@/data/content';
import { PROJECTS } from '@/data/projects';

export type SearchScope =
  | 'all'
  | 'articles'
  | 'howto'
  | 'troubleshooting'
  | 'water'
  | 'engineering'
  | 'projects';

export type SearchRecord = {
  path: string;
  title: string;
  /** Breadcrumb-style context, e.g. "Controls › PLC Systems › Analog Control". */
  context: string;
  summary: string;
  /** Badge shown on the result row. */
  kindLabel: string;
  scopes: SearchScope[];
  /** Lowercased haystack. */
  haystack: string;
  /** Higher wins ties. Written content outranks taxonomy nodes. */
  weight: number;
  external?: string;
};

const SECTION_SCOPE: Record<string, SearchScope[]> = {
  controls: ['engineering'],
  'water-wastewater': ['water'],
  troubleshooting: ['troubleshooting'],
  'engineering-library': ['engineering'],
  cybersecurity: ['engineering'],
  'how-to': ['howto'],
  articles: ['articles'],
  'tools-projects': ['projects'],
  about: [],
};

const KIND_SCOPE: Record<EntryKind, SearchScope> = {
  article: 'articles',
  howto: 'howto',
  troubleshooting: 'troubleshooting',
  reference: 'articles',
};

function buildIndex(): SearchRecord[] {
  const records = new Map<string, SearchRecord>();

  for (const nav of NAV_ENTRIES) {
    const context = nav.trail.map((t) => t.node.title).join(' › ');
    const summary = describe(nav);
    const scopes: SearchScope[] = ['all', ...(SECTION_SCOPE[nav.section.slug] ?? [])];
    records.set(nav.path, {
      path: nav.path,
      title: nav.node.title,
      context,
      summary,
      kindLabel: nav.childPaths.length ? 'Section' : 'Topic',
      scopes,
      haystack: [
        nav.node.title,
        nav.node.menuLabel ?? '',
        context,
        summary,
        (nav.node.keywords ?? []).join(' '),
      ]
        .join(' ')
        .toLowerCase(),
      weight: nav.childPaths.length ? 2 : 1,
    });
  }

  // Written content overwrites the taxonomy stub at the same path, adding
  // its own text to the haystack and a much higher weight.
  for (const entry of ENTRIES) {
    const nav = getEntry(entry.path);
    const base = records.get(entry.path);
    const context = nav ? nav.trail.map((t) => t.node.title).join(' › ') : '';
    const scopes: SearchScope[] = ['all', KIND_SCOPE[entry.kind]];
    if (nav) scopes.push(...(SECTION_SCOPE[nav.section.slug] ?? []));
    records.set(entry.path, {
      path: entry.path,
      title: entry.title,
      context: context || base?.context || '',
      summary: entry.summary,
      kindLabel: KIND_LABEL[entry.kind],
      scopes: [...new Set(scopes)],
      haystack: [
        entry.title,
        context,
        entry.summary,
        entry.answer,
        entry.keyPoints.join(' '),
        entry.tags.join(' '),
        entry.symptom ?? '',
        (entry.faqs ?? []).map((f) => f.q).join(' '),
        base?.haystack ?? '',
      ]
        .join(' ')
        .toLowerCase(),
      weight: 10,
    });
  }

  for (const project of PROJECTS) {
    const path = `/tools-projects/eric-sullivans-personal-projects/${project.slug}`;
    records.set(path, {
      path,
      title: project.name,
      context: "Tools & Projects › Eric Sullivan's Personal Projects",
      summary: project.summary,
      kindLabel: 'Project',
      scopes: ['all', 'projects'],
      haystack: [
        project.name,
        project.domain,
        project.category,
        project.tagline,
        project.summary,
        project.features.join(' '),
        project.industryTags.join(' '),
      ]
        .join(' ')
        .toLowerCase(),
      weight: 6,
      external: project.externalUrl || undefined,
    });
  }

  records.set('/contact', {
    path: '/contact',
    title: 'Contact Eric Sullivan',
    context: 'CurryControls.com',
    summary: 'Reach Eric Sullivan directly at 863-698-8266, or send a message.',
    kindLabel: 'Page',
    scopes: ['all'],
    haystack: 'contact eric sullivan phone call 863-698-8266 message question help',
    weight: 8,
  });

  return [...records.values()];
}

export const SEARCH_INDEX: SearchRecord[] = buildIndex();

export type SearchResult = SearchRecord & { score: number };

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9.+-]+/)
    .map((t) => t.replace(/^[-.]+|[-.]+$/g, ''))
    .filter((t) => t.length > 0);
}

/**
 * Scores a record against the query tokens. Every token must appear
 * somewhere, so a two-word query narrows rather than widens.
 */
function score(record: SearchRecord, tokens: string[], raw: string): number {
  const title = record.title.toLowerCase();
  let total = 0;

  if (raw.length > 1) {
    if (title === raw) total += 800;
    else if (title.startsWith(raw)) total += 400;
    else if (title.includes(raw)) total += 220;
    else if (record.haystack.includes(raw)) total += 60;
  }

  for (const token of tokens) {
    if (!record.haystack.includes(token)) return 0;
    if (title === token) total += 200;
    else if (title.startsWith(token)) total += 90;
    else if (new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(title)) total += 70;
    else if (title.includes(token)) total += 40;
    else if (record.summary.toLowerCase().includes(token)) total += 18;
    else total += 6;
  }

  return total + record.weight;
}

export function search(query: string, scope: SearchScope = 'all', limit = 40): SearchResult[] {
  const raw = query.trim().toLowerCase();
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];
  for (const record of SEARCH_INDEX) {
    if (scope !== 'all' && !record.scopes.includes(scope)) continue;
    const s = score(record, tokens, raw);
    if (s > 0) results.push({ ...record, score: s });
  }

  results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return results.slice(0, limit);
}

/** Counts per scope for the result-page filter chips. */
export function scopeCounts(query: string): Record<SearchScope, number> {
  const counts: Record<SearchScope, number> = {
    all: 0,
    articles: 0,
    howto: 0,
    troubleshooting: 0,
    water: 0,
    engineering: 0,
    projects: 0,
  };
  for (const result of search(query, 'all', 1000)) {
    for (const scope of result.scopes) counts[scope] += 1;
  }
  return counts;
}

export const SCOPE_LABELS: { value: SearchScope; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'articles', label: 'Articles' },
  { value: 'howto', label: 'How-To' },
  { value: 'troubleshooting', label: 'Troubleshooting' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'water', label: 'Water/Wastewater' },
  { value: 'projects', label: 'Projects' },
];

export const SEARCH_PLACEHOLDER = 'Search PLC, SCADA, instrumentation, troubleshooting...';

/** Shown in the empty state of the search dialog. */
export const POPULAR_SEARCHES = [
  '4-20 mA',
  'lead/lag pumps',
  'wet well level',
  'Modbus',
  'alarm management',
  'UL 508A',
  'ground loop',
  'scan cycle',
];
