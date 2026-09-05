/**
 * Renders every indexable route to static HTML.
 *
 * The site is a single-page app, so without this step a crawler that does not
 * execute JavaScript would receive an empty document. Each generated file
 * carries the page's real content, title, meta description, canonical URL,
 * social cards, and JSON-LD. The client bundle then hydrates over it.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, '..');
const outDir = resolve(appRoot, 'dist/public');

const server = await import(resolve(appRoot, 'dist/server/entry-server.js'));
const { render, PRERENDER_PATHS, seoData } = server;
const { SITE } = seoData;

const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');

const escape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function headFor(head, path) {
  if (!head) return '';
  const title = head.title === SITE.name ? head.title : `${head.title} | ${SITE.name}`;
  const canonical = `${SITE.url}${path === '/' ? '/' : path}`;
  const robots = head.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(head.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${robots}" />`,
    head.keywords?.length ? `<meta name="keywords" content="${escape(head.keywords.join(', '))}" />` : '',
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(head.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="${head.type ?? 'website'}" />`,
    `<meta property="og:site_name" content="${escape(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(head.description)}" />`,
    head.type === 'article' && head.publishedTime
      ? `<meta property="article:published_time" content="${head.publishedTime}" />`
      : '',
    head.type === 'article' && head.modifiedTime
      ? `<meta property="article:modified_time" content="${head.modifiedTime}" />`
      : '',
    head.type === 'article' ? `<meta property="article:author" content="Eric Sullivan" />` : '',
    head.jsonLd
      ? `<script type="application/ld+json" id="cc-json-ld">${head.jsonLd.replace(/</g, '\\u003c')}</script>`
      : '',
  ].filter(Boolean);

  return tags.join('\n    ');
}

let written = 0;
const failures = [];

for (const path of PRERENDER_PATHS) {
  try {
    const { html, head } = await render(path);

    // Strip the development defaults so each page carries exactly one of each
    // tag, then inject the head this route actually needs.
    let page = template
      .replace(/[ \t]*<!--[\s\S]*?-->\n?/g, '')
      .replace(/[ \t]*<title>[\s\S]*?<\/title>\n?/, '')
      .replace(/[ \t]*<meta name="description"[^>]*>\n?/, '')
      .replace(/[ \t]*<meta name="robots"[^>]*>\n?/, '')
      .replace(/[ \t]*<meta name="keywords"[^>]*>\n?/, '')
      .replace(/[ \t]*<link rel="canonical"[^>]*>\n?/, '')
      .replace(/[ \t]*<meta property="og:[^>]*>\n?/g, '')
      .replace(/[ \t]*<meta name="twitter:[^>]*>\n?/g, '')
      .replace('</head>', `  ${headFor(head, path)}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const target =
      path === '/' ? resolve(outDir, 'index.html') : resolve(outDir, `.${path}`, 'index.html');
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, page);
    written += 1;
  } catch (error) {
    failures.push(`${path}: ${error?.message ?? error}`);
  }
}

console.log(`[prerender] ${written} of ${PRERENDER_PATHS.length} routes rendered to static HTML`);
if (failures.length > 0) {
  console.error(`[prerender] ${failures.length} route(s) failed:`);
  for (const failure of failures.slice(0, 20)) console.error(`  - ${failure}`);
  process.exit(1);
}
