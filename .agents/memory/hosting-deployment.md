---
name: Hosting.com shared deployment
description: CurryControls deploys to the Hosting.com cPanel addon-domain document root. The whole dist/public tree must be uploaded, not just the root files.
---

CurryControls is a **prerendered multi-page site**, not a single-page app. `pnpm --filter @workspace/currycontrols run build` runs four steps: the Vite client build, an SSR build, the SEO generator, and the prerenderer. The prerenderer writes one static HTML document per route as `<route>/index.html`, so the output tree currently holds 364 pages across 22 top-level directories.

**Upload the entire `artifacts/currycontrols/dist/public` tree with its directory structure intact.**

Uploading only the root files and `assets` ships 8 files and one folder, leaving 363 pages on the build machine. The site still appears to work, because the `.htaccess` fallback sends unmatched URLs to the root `index.html` and the client router renders the page. But every crawler then receives the homepage document at every URL, which discards the entire reason the site is prerendered, and each deep link hydrates homepage markup against a different page tree.

**Why the domain-specific directory:** the account hosts multiple domains, so uploading to the account-level `public_html` can target the wrong site. Confirm the addon domain's document root before uploading.

**Preferred: run the deploy script.** `pnpm --filter @workspace/currycontrols run deploy` builds, packages the whole tree, uploads it, extracts it server-side, and checks a deep URL afterward. It accepts the workspace's `HOSTING_COM_CPANEL_HOST`, `HOSTING_COM_CPANEL_USERNAME`, and `HOSTING_COM_CPANEL_API_TOKEN` secrets, with optional `CPANEL_*` aliases. The addon-domain document root defaults to `/home/<cPanel-user>/currycontrols.com`, and `SITE_URL` defaults to `https://currycontrols.com`. The archive is staged in the account home directory, never in the document root, and repeat uploads explicitly overwrite that temporary archive.

cPanel exposes no UAPI function for extraction, so the script uploads through UAPI `Fileman::upload_files` and extracts through the older cPanel API 2 `Fileman::fileop`. That pairing is deliberate, not an oversight.

**Manual fallback:** confirm the document root, then upload the full tree. The build is about 46 MB uncompressed and roughly 7 MB as a zip, so the practical route is to upload one archive and extract it in place rather than transferring files individually. Allow entry-file overwrites when publishing a new build.

**Do not delete `.htaccess`.** It passes real files and directories through untouched and falls back to `index.html` only for routes with no prerendered file, which is what the small number of non-prerendered placeholder routes need.

**Verify after every deploy** by viewing source on a deep URL such as `/calculators/voltage-drop`. The `<title>` must be that page's own title. If it shows the homepage title, the route directories did not upload.

## Contact form

The contact page posts to `POST /api/contact` on the API server (`artifacts/api-server`). The route stores the message first, then emails the owner, so a mail outage never loses a message. Storage is the `contact_messages` table when `DATABASE_URL` is set (created by `pnpm --filter @workspace/db run push`, which `scripts/post-merge.sh` runs on the deployment), otherwise an append-only JSONL file under `CONTACT_DATA_DIR` (default `.data/contact`). Only what the sender typed is stored: no IP address, no user agent.

**Email** goes out through the site's own mailbox over SMTP. Set these as Replit Secrets on the API deployment, never in the repository: `SMTP_HOST`, `SMTP_PORT` (465 implicit TLS, or 587 STARTTLS), `SMTP_USER` (the mailbox login, usually the full address), `SMTP_PASS`, `CONTACT_FROM` (defaults to `SMTP_USER`), `CONTACT_FROM_NAME` (optional), and `CONTACT_TO` (where the notification goes; comma-separated for several). Replies go to the sender because the notification carries their address as `Reply-To`. With `SMTP_HOST` or `CONTACT_TO` unset the mailer is disabled and messages are stored only; the API reports `delivery: "stored"` instead of `"emailed"`.

**API base for the static host.** On the Replit deployment `/api` is same-origin. The cPanel build has no API, so build it with `VITE_API_BASE_URL=https://<api deployment origin>` set; `src/lib/api-base.ts` prefixes every API request (contact form and analytics) with it. Without it the form falls back to composing an email in the visitor's mail application, which is also what happens whenever the service cannot be reached.

**Abuse controls:** a hidden honeypot field (`website`) that bots fill and people never see, an in-memory limit of five messages per ten minutes per hashed address, and server-side length caps on every field.
