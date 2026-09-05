---
name: Hosting.com shared deployment
description: CurryControls deploys to the Hosting.com cPanel addon-domain document root. The whole dist/public tree must be uploaded, not just the root files.
---

CurryControls is a **prerendered multi-page site**, not a single-page app. `pnpm --filter @workspace/currycontrols run build` runs four steps: the Vite client build, an SSR build, the SEO generator, and the prerenderer. The prerenderer writes one static HTML document per route as `<route>/index.html`, so the output tree currently holds 364 pages across 22 top-level directories.

**Upload the entire `artifacts/currycontrols/dist/public` tree with its directory structure intact.**

Uploading only the root files and `assets` ships 8 files and one folder, leaving 363 pages on the build machine. The site still appears to work, because the `.htaccess` fallback sends unmatched URLs to the root `index.html` and the client router renders the page. But every crawler then receives the homepage document at every URL, which discards the entire reason the site is prerendered, and each deep link hydrates homepage markup against a different page tree.

**Why the domain-specific directory:** the account hosts multiple domains, so uploading to the account-level `public_html` can target the wrong site. Confirm the addon domain's document root before uploading.

**How to apply:** confirm the document root, then upload the full tree. The build is about 46 MB uncompressed and roughly 7 MB as a zip, so the practical route is to upload one archive and extract it in place rather than transferring files individually. Allow entry-file overwrites when publishing a new build.

**Do not delete `.htaccess`.** It passes real files and directories through untouched and falls back to `index.html` only for routes with no prerendered file, which is what the small number of non-prerendered placeholder routes need.

**Verify after every deploy** by viewing source on a deep URL such as `/calculators/voltage-drop`. The `<title>` must be that page's own title. If it shows the homepage title, the route directories did not upload.
