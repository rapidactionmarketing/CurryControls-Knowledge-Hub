# CurryControls.com — Controls & Automation Knowledge Hub

An independent technical knowledge base for control systems, automation, instrumentation,
SCADA, PLCs, industrial networking, control panels, OT cybersecurity, and the water and
wastewater industry. Owned and maintained by Eric Sullivan.

## Run & Operate

- `pnpm --filter @workspace/currycontrols run dev` — run the site locally
- `pnpm --filter @workspace/api-server run dev` — run the API server that receives analytics (port 8080)
- `pnpm --filter @workspace/currycontrols run build` — client build, SSR build, SEO files, prerender
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate the API client and Zod schemas from `lib/api-spec/openapi.yaml`
- `PORT` and `BASE_PATH` are required by `vite.config.ts` (the Replit artifact sets both)
- The site needs the API server running for analytics. In dev, Vite proxies `/api` to
  `http://localhost:8080`; override with `API_ORIGIN`.

The build runs four stages in order. Skipping one leaves the published directory inconsistent:

1. `build:client` — the browser bundle into `dist/public`
2. `build:ssr` — `src/entry-server.tsx` into `dist/server`, used by the two scripts below
3. `build:seo` — `sitemap.xml`, `robots.txt`, and `llms.txt` from the route manifest
4. `prerender` — every indexable route rendered to static HTML

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Vite 7, React 19, Tailwind CSS v4, wouter for routing
- shadcn/ui primitives in `src/components/ui` (mostly unused; the site has its own components)
- Express 5 API server for analytics only. The site itself is fully static and works without it.
- Postgres via Drizzle when `DATABASE_URL` is set; a local JSONL file store otherwise.

## Where things live

Everything is under `artifacts/currycontrols`.

| Path | Purpose |
| --- | --- |
| `src/data/navigation.ts` | **The taxonomy.** 530 nodes, 5 levels. Source of truth for menus, routes, breadcrumbs, search, and the sitemap. |
| `src/data/nav-index.ts` | Derived lookups over the tree: paths, trails, children, descendants. |
| `src/data/content-types.ts` | The content block model. |
| `src/data/content/*.ts` | Written knowledge-base entries, keyed by taxonomy path. |
| `src/data/content.ts` | Content index and helpers. |
| `src/data/site.ts` | Site config, Eric Sullivan's contact details, ownership notice, disclaimers. |
| `src/data/projects.ts` | Personal projects. |
| `src/lib/routes.ts` | Route manifest shared by the sitemap generator and the prerenderer. |
| `src/lib/search.ts` | The client-side search index and scoring. |
| `src/lib/structured-data.ts` | JSON-LD builders. |
| `src/ssr-shell.tsx` | Route resolution and the page shell, shared by the app and the prerenderer. |
| `src/pages/hub.tsx` | Generic page for any taxonomy node without a written entry. |
| `src/pages/entry.tsx` | Template for reference, article, how-to, and troubleshooting entries. |
| `src/data/glossary.ts` | 125 glossary terms, one page each, with DefinedTerm structured data. |
| `src/lib/analytics.ts` | Cookieless client collector. Honors Do Not Track and Global Privacy Control. |
| `src/pages/analytics.tsx` | The dashboard, at `/analytics`. Noindex, not prerendered. |
| `src/pages/discovery.tsx` | HTML sitemap, topic hubs, and the questions-and-answers hub. |
| `src/pages/policies.tsx` | Privacy, terms, accessibility, editorial standards, and the disclaimer. |
| `src/data/calc-types.ts` | The calculator model: typed fields, a pure `run` function, assumptions. |
| `src/data/reference-data.ts` | **Safety-critical numeric tables.** Ampacity, derating factors, motor FLC, conduit areas. |
| `src/data/calculators/*.ts` | The 35 calculators, by discipline. |
| `src/data/tables.ts` | Reference table pages, each stating the document its values come from. |
| `src/components/blocks/calculator-disclaimer.tsx` | The disclaimer shown on every calculator and table. |
| `scripts/build-seo.mjs` | Generates `sitemap.xml`, `robots.txt`, `llms.txt`, `feed.xml`. |
| `scripts/prerender.mjs` | Renders every indexable route to static HTML. |
| `lib/api-spec/openapi.yaml` | The API contract. Edit here, then run codegen; never edit generated files. |
| `lib/db/src/schema/analytics.ts` | Drizzle schema for the analytics table. |
| `artifacts/api-server/src/lib/analytics-store.ts` | Storage layer: Postgres or file, chosen at startup. |
| `artifacts/api-server/src/lib/analytics-summary.ts` | Aggregation, shared by both backends so numbers match. |

## Architecture decisions

- **The taxonomy drives everything.** Adding a node to `navigation.ts` creates its page, its
  menu entry, its breadcrumbs, its search record, and its sitemap entry. No component
  hard-codes a nav item, and there is no per-route file for the 530 knowledge-base pages.
- **One route resolver, not hundreds of routes.** `ssr-shell.tsx` matches a handful of bespoke
  paths, then falls through to the taxonomy: a path with a written entry renders the article
  template, any other node renders its hub page.
- **Written content is structured blocks, not markup.** The renderer, the search index, and the
  JSON-LD generator all read the same `Entry` objects, so they cannot disagree.
- **Every page is prerendered to static HTML.** The site is a single-page app, so without this a
  crawler that does not execute JavaScript would receive an empty document. `Seo` captures head
  state during server rendering and `prerender.mjs` writes it into each file.
- **Placeholder leaves are `noindex` and excluded from the sitemap.** A taxonomy node with no
  children and no written entry says plainly that the reference is not written yet. Submitting
  hundreds of thin pages for indexing would hurt the site.
- **Analytics is first-party and identifier-free.** No cookies, no IP address, no third-party
  script, and a session id the browser discards when the tab closes. Do Not Track and Global
  Privacy Control switch collection off before anything is sent.
- **The analytics store is pluggable because no database is provisioned.** Postgres when
  `DATABASE_URL` exists, a per-day JSONL file otherwise. Both feed the same aggregator, so the
  dashboard reads identically either way; the dashboard footer says which is active.
- **The questions hub deliberately omits FAQPage structured data.** Each source page already owns
  the FAQPage entity for its own questions; duplicating them on the hub would put two competing
  entities in the graph for the same content.
- **Search relevance is scaled by record type.** A glossary term titled exactly "4-20 mA" would
  otherwise beat the full reference titled "4-20 mA Current Loops". The guide leads, then the
  troubleshooting guide, then the calculator, then the definition.
- **Calculators show their work and never issue a verdict.** Each returns the outputs, the
  arithmetic that produced them, and what it does not account for. Where one reads a code table it
  displays the value it used, so a disagreement with the reader's own code book is immediately
  visible rather than hidden inside an answer. This is a safety decision, not a style one.
- **Calculators compute during render from a pure function.** The prerendered HTML therefore
  contains a worked example with real numbers, which serves a reader without JavaScript and gives
  a crawler real content instead of an empty form.

## Product

- **Persistent contact bar.** Eric Sullivan's number, `863-698-8266`, sits above the header on
  every page as a `tel:` link, plus a compact mobile bar and a dismissible sticky call action.
- **Multi-level navigation.** A four-level desktop mega menu and a nested mobile accordion,
  both generated from the taxonomy, both keyboard operable and ARIA labelled.
- **Global search.** Indexes every taxonomy node, written entry, and project. `/` or `Ctrl/Cmd+K`
  opens it from anywhere; `/search?q=` is a shareable results page with scope filters.
- **Answer-first content.** Each written entry opens with a direct answer and key points, then
  the detail, then FAQs — for a reader scanning and for answer engines quoting.
- **Contact page** at `/contact` with a topic-tagged message form.
- **Glossary** at `/glossary`: 125 terms, one page each, for the definitional queries that dominate
  this subject.
- **Discovery pages**: an HTML sitemap that puts every deep node two clicks from home, topic hubs
  that cut across the taxonomy, and a questions-and-answers hub.
- **Trust pages**: privacy, terms, accessibility, and editorial standards.
- **Built-in analytics** at `/analytics`: traffic, top pages, phone-click conversions by placement,
  Core Web Vitals from real visits, and the searches that returned nothing, which is the content
  backlog in priority order.
- **35 calculators** at `/calculators`: electrical, control panel, instrumentation, PLC and data,
  networking, and water and wastewater process. Every one shows its arithmetic.
- **Reference tables** at `/tables`: conductor ampacity, derating factors, wire gauge, motor
  full-load current, conduit fill, overcurrent ratings, PLC data types, enclosure ratings, and
  unit conversions.

## User preferences

- The phone number is Eric Sullivan's personal contact for CurryControls.com. It must never be
  presented as a Curry Controls Company, Revere Control Systems, or General Control Systems number.
- CurryControls.com is owned by Eric Sullivan. Curry Controls Company was acquired by Revere Control
  Systems, Inc. in 2021, and this site is not associated with either company. Never imply corporate
  succession. The wording lives in `AFFILIATION` in `src/data/site.ts` (the notice, the About pages,
  the policies, the footer, the contact note, llms.txt, and the WebSite schema all render from it);
  never write a separate version.
- Every personal-project page must carry "A Personal Project of Eric Sullivan".
- Do not manufacture technical content to fill a page. An unwritten page says so.

## Gotchas

- **Custom CSS classes must stay inside `@layer components`.** Outside a layer they come last in
  the cascade and silently defeat Tailwind utilities, which once made `hidden lg:inline-flex`
  render on mobile and broke the whole mobile header.
- **The server and client component trees must stay identical.** `App` takes an optional
  `ssrPath`; the prerenderer renders the same tree main.tsx mounts. A tree that differs even by
  a null-rendering sibling shifts React's `useId` counters and causes a hydration mismatch.
- **Content entry paths must exist in the taxonomy.** An entry whose `path` has no matching node
  is unreachable. The `related` paths are checked the same way.
- **Run the whole build.** `build:seo` and `prerender` both import `dist/server/entry-server.js`,
  so a client-only build leaves stale or missing static HTML and SEO files.
- The desktop nav fits nine sections in a 1240px container only with the tightened `.cc-navlink`
  sizing and the shortened `menuLabel` values. Adding a tenth section needs a rethink.
- **Do not write `type: integer` in `openapi.yaml`.** Orval emits `z.int()` for it, which is Zod v4
  syntax, and the workspace pins Zod 3. Use `type: number`.
- **Provision Postgres for durable analytics.** The file store writes to instance-local disk, so it
  is not shared between instances and does not survive one being replaced. Set `DATABASE_URL`,
  run `pnpm --filter @workspace/db run push`, and restart the API server.
- **Every phone link needs a `data-phone-placement` attribute.** One delegated listener records
  phone and outbound clicks; a link without the attribute is recorded as "unlabelled".
- **The values in `reference-data.ts` are safety-critical.** A wrong ampacity or motor full-load
  current can lead to an undersized conductor. They are reproduced from published code tables and
  are not authoritative. Never change one without checking it against the code book, and never
  remove the verification language from a table page.
- **Verify calculator arithmetic against hand-computed values, not against the implementation.**
  There is a check script pattern for this: derive each expectation independently, then compare.
  Web search summaries are not a reliable source for tabular data — during this work a search
  returned 130 A for a 100 hp motor at 460 V where the code table says 124 A, and another
  conflated two adjacent rows.
- **Calculators must degrade safely.** A `run` function that cannot produce a meaningful answer
  returns an `error` rather than a number. The ampacity calculator refusing 14 AWG aluminum is the
  reference behaviour.

- **NEC tables are diameter-sourced and build-gated.** `src/data/nec-chapter9.ts` stores only diameters; every area is derived as pi/4 x d^2 and rounded the way the printed tables are. `scripts/validate-nec-tables.mjs` holds a separately recorded copy of the published areas, plus Table 310.16 ampacity, Table 430.250 motor full-load current and the 240.6(A) ratings, and `pnpm run build` runs it first so a bad edit cannot ship. Two independent recalls agreeing is the strongest check available in this environment; it is not a code book, and the adopted edition still governs. Known rounding boundary: IMC 2 in computes to 3.6305 and prints 3.631 where the book prints 3.630. Not covered: Table 5A compact-stranded conductors, RHW without its outer covering, HDPE, RTRC, and PVC Types A and EB.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
