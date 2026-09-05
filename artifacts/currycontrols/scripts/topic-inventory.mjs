/**
 * Writes docs/research/topic-inventory.{md,json} from the built site data.
 *
 * The inventory is the hand-off document for outside research: every page the
 * navigation tree defines, with its status. `placeholder` pages are the
 * research targets. Sections whose pages the router renders itself (about,
 * projects, article category listings) are marked `bespoke` so nobody writes
 * an article for a contact page.
 *
 * Run after `pnpm run build`: node scripts/topic-inventory.mjs
 */
import { writeFileSync, readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const here = resolve(import.meta.dirname);
const appRoot = resolve(here, '..');
const outDir = resolve(appRoot, '../../docs/research');
mkdirSync(outDir, { recursive: true });

const m = await import(resolve(appRoot, 'dist/server/entry-server.js'));
const { NAV_SECTIONS, ENTRIES, GLOSSARY, CALCULATORS, TABLES, PROJECTS, SITE } = m.seoData;
const written = new Map(ENTRIES.map((e) => [e.path, e]));

/** Sections the router renders from its own components rather than from entries. */
const BESPOKE_SECTIONS = new Set(['about', 'tools-projects', 'articles']);

// Tags and kinds come from the source files; the SEO projection does not carry them.
const meta = new Map();
const contentDir = resolve(appRoot, 'src/data/content');
for (const f of readdirSync(contentDir)) {
  const src = readFileSync(resolve(contentDir, f), 'utf8');
  for (const blk of src.split(/\n  \{\n/).slice(1)) {
    const path = blk.match(/^\s*path: '([^']+)'/m)?.[1];
    if (!path) continue;
    meta.set(path, {
      kind: blk.match(/^\s*kind: '([^']+)'/m)?.[1] ?? '',
      tags: [...(blk.match(/^\s*tags: \[([^\]]*)\]/m)?.[1] ?? '').matchAll(/'([^']+)'/g)].map((x) => x[1]),
      updated: blk.match(/^\s*updated: '([^']+)'/m)?.[1] ?? '',
    });
  }
}

const nodes = [];
function walk(node, parentPath, depth, section) {
  const path = node.externalUrl ? null : `${parentPath}/${node.slug}`;
  const kids = node.children ?? [];
  let status;
  if (node.externalUrl) status = 'external';
  else if (written.has(path)) status = 'written';
  else if (kids.length) status = 'hub';
  else status = BESPOKE_SECTIONS.has(section) ? 'bespoke' : 'placeholder';
  nodes.push({ section, path: path ?? node.externalUrl, title: node.title, depth, status, summary: node.summary ?? null, keywords: node.keywords ?? [], featured: !!node.featured });
  for (const k of kids) walk(k, path, depth + 1, section);
}
for (const s of NAV_SECTIONS) {
  nodes.push({ section: s.slug, path: `/${s.slug}`, title: s.title, depth: 0, status: 'section', summary: s.summary ?? s.blurb ?? null, keywords: s.keywords ?? [], featured: false });
  for (const k of s.children) walk(k, `/${s.slug}`, 1, s.slug);
}

const tagCounts = new Map();
for (const { tags } of meta.values()) for (const t of tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);

const count = (st) => nodes.filter((n) => n.status === st).length;
const inventory = {
  generated: new Date().toISOString().slice(0, 10),
  site: SITE.url,
  counts: { taxonomyNodes: nodes.length, written: count('written'), hubs: count('hub'), placeholders: count('placeholder'), bespoke: count('bespoke'), glossary: GLOSSARY.length, calculators: CALCULATORS.length, tables: TABLES.length },
  sections: NAV_SECTIONS.map((s) => ({ slug: s.slug, title: s.title, blurb: s.blurb, nodes: nodes.filter((n) => n.section === s.slug) })),
  entries: ENTRIES.map((e) => ({ path: e.path, title: e.title, kind: meta.get(e.path)?.kind ?? '', tags: meta.get(e.path)?.tags ?? [], updated: meta.get(e.path)?.updated ?? e.updated ?? '' })),
  glossary: GLOSSARY.map((g) => ({ slug: g.slug, term: g.term, category: g.category })),
  calculators: CALCULATORS.map((c) => ({ slug: c.slug, title: c.title, category: c.category })),
  tables: TABLES.map((t) => ({ slug: t.slug, title: t.title, category: t.category })),
  projects: PROJECTS.map((p) => ({ slug: p.slug, name: p.name ?? p.title ?? p.slug })),
  tags: [...tagCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([tag, count]) => ({ tag, count })),
};
writeFileSync(resolve(outDir, 'topic-inventory.json'), JSON.stringify(inventory, null, 2) + '\n');

const c = inventory.counts;
let md = `# CurryControls.com topic inventory\n\nGenerated ${inventory.generated} from the site's navigation data. Every path below is a real URL on ${SITE.url}. Regenerate with \`pnpm --filter @workspace/currycontrols run inventory\` after a build.\n\n`;
md += `| | Count |\n|---|---|\n| Taxonomy nodes | ${c.taxonomyNodes} |\n| Pages with a written article | ${c.written} |\n| Hub (index) pages | ${c.hubs} |\n| **Placeholder pages that need an article** | **${c.placeholders}** |\n| Bespoke pages (rendered by the site itself) | ${c.bespoke} |\n| Glossary terms | ${c.glossary} |\n| Calculators | ${c.calculators} |\n| Reference tables | ${c.tables} |\n\n`;
md += `**How to read this.** \`NEEDS CONTENT\` is a page that exists, is linked from the menus, and has no article yet. Those are the research targets. \`WRITTEN\` already has an article; research there should extend or correct, not replace. \`hub\` is an index page generated from its children. \`bespoke\` is rendered by the site's own code (about, projects, article listings) and needs no article. The one-line summary under a title, where present, fixes that page's scope.\n`;
for (const s of inventory.sections) {
  const sec = s.nodes.filter((n) => n.status !== 'section');
  const need = sec.filter((n) => n.status === 'placeholder').length;
  md += `\n## ${s.title}  \`/${s.slug}\`\n\n${s.blurb}\n\n${sec.length} pages, **${need} need content**.\n\n`;
  for (const n of sec) {
    const indent = '  '.repeat(Math.max(0, n.depth - 1));
    const tag = n.status === 'placeholder' ? '`NEEDS CONTENT`' : n.status === 'written' ? '`WRITTEN`' : `\`${n.status}\``;
    md += `${indent}- ${n.title} ${tag} \`${n.path}\`${n.summary ? `\n${indent}  ${n.summary}` : ''}\n`;
  }
}
md += `\n\n## Existing articles (${inventory.entries.length})\n\n| Path | Title | Kind | Updated |\n|---|---|---|---|\n`;
for (const e of inventory.entries) md += `| \`${e.path}\` | ${e.title} | ${e.kind} | ${e.updated} |\n`;
md += `\n## Tags in use\n\nReuse these before inventing new ones.\n\n${inventory.tags.map((t) => `${t.tag} (${t.count})`).join(', ')}\n`;
md += `\n## Calculators (${inventory.calculators.length})\n\n`;
for (const x of inventory.calculators) md += `- ${x.title} \`/calculators/${x.slug}\` (${x.category})\n`;
md += `\n## Reference tables (${inventory.tables.length})\n\n`;
for (const x of inventory.tables) md += `- ${x.title} \`/tables/${x.slug}\`\n`;
md += `\n## Glossary (${inventory.glossary.length} terms)\n\n`;
const byCat = {};
for (const g of inventory.glossary) (byCat[g.category] ??= []).push(g.term);
for (const [cat, terms] of Object.entries(byCat)) md += `**${cat}:** ${terms.join(', ')}\n\n`;
writeFileSync(resolve(outDir, 'topic-inventory.md'), md);

console.log(`[inventory] ${c.placeholders} pages need content, ${c.written} written, ${c.hubs} hubs, ${c.bespoke} bespoke; written to docs/research`);
console.log('[inventory] needs content by section: ' + inventory.sections.map((s) => `${s.slug}=${s.nodes.filter((n) => n.status === 'placeholder').length}`).join('  '));
