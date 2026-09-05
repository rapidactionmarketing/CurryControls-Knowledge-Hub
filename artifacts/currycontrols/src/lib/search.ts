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
import { GLOSSARY, glossaryPath } from '@/data/glossary';

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
  /**
   * Multiplies the final relevance score.
   *
   * A glossary term titled exactly "4-20 mA" would otherwise beat the full
   * reference titled "4-20 mA Current Loops" on an exact-title match. On a
   * knowledge base the substantive guide should lead and the definition should
   * sit just beneath it, so record type scales relevance rather than only
   * breaking ties.
   */
  factor: number;
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

/** Standalone pages that are not taxonomy nodes but should still be findable. */
const SITE_PAGES = [
  {
    path: '/glossary',
    title: 'Controls and Automation Glossary',
    summary: 'Plain-language definitions of the terms used across control systems and automation.',
    keywords: 'glossary terms definitions dictionary meaning what is',
  },
  {
    path: '/faq',
    title: 'Questions and answers',
    summary: 'Every question the knowledge base answers, in one place.',
    keywords: 'faq questions answers common',
  },
  {
    path: '/topics',
    title: 'Topics',
    summary: 'Browse the knowledge base by subject, across the taxonomy.',
    keywords: 'topics tags subjects browse',
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    summary: 'Every page on the site in one list.',
    keywords: 'sitemap index all pages',
  },
  {
    path: '/editorial-standards',
    title: 'Editorial standards',
    summary: 'How content here is written, sourced, reviewed, dated, and corrected.',
    keywords: 'editorial standards accuracy corrections sourcing review',
  },
  {
    path: '/accessibility',
    title: 'Accessibility',
    summary: 'How the site is built for accessibility and how to report a barrier.',
    keywords: 'accessibility wcag screen reader keyboard contrast',
  },
  {
    path: '/privacy',
    title: 'Privacy',
    summary: 'What the site collects, what it does not, and how to opt out of analytics.',
    keywords: 'privacy analytics cookies tracking opt out data',
  },
  {
    path: '/terms',
    title: 'Terms of use',
    summary: 'The terms this technical reference is provided under.',
    keywords: 'terms conditions use legal disclaimer warranty',
  },
] as const;

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
      factor: nav.childPaths.length ? 0.45 : 0.4,
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
      factor: 1,
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
      factor: 0.6,
      external: project.externalUrl || undefined,
    });
  }

  // Glossary terms. Definitional queries are common, and a term page is often
  // the most direct answer the site can give.
  for (const term of GLOSSARY) {
    records.set(glossaryPath(term.slug), {
      path: glossaryPath(term.slug),
      title: term.term,
      context: `Glossary › ${term.category}`,
      summary: term.short,
      kindLabel: 'Definition',
      scopes: ['all', 'engineering'],
      haystack: [
        term.term,
        term.expansion ?? '',
        (term.aliases ?? []).join(' '),
        term.category,
        term.short,
        term.body.join(' '),
      ]
        .join(' ')
        .toLowerCase(),
      weight: 7,
      factor: 0.5,
    });
  }

  for (const page of SITE_PAGES) {
    records.set(page.path, {
      path: page.path,
      title: page.title,
      context: 'CurryControls.com',
      summary: page.summary,
      kindLabel: 'Page',
      scopes: ['all'],
      haystack: `${page.title} ${page.summary} ${page.keywords}`.toLowerCase(),
      weight: 5,
      factor: 0.6,
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
    factor: 0.7,
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

  return (total + record.weight) * record.factor;
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
