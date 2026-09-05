/**
 * Deploys the built site to cPanel shared hosting.
 *
 * The site prerenders one HTML document per route, so a deploy has to move
 * hundreds of directories. Uploading them individually would be hundreds of
 * API calls, so this ships a single archive and extracts it server-side.
 *
 * The archive is staged in the account home directory, never in the document
 * root, so it is never reachable over the web.
 *
 * cPanel has no UAPI function for extraction. Upload goes through UAPI
 * Fileman::upload_files and extraction through the older cPanel API 2
 * Fileman::fileop, which is the only interface that exposes it.
 *
 * Required environment (set these as Replit Secrets):
 *   CPANEL_HOST or HOSTING_COM_CPANEL_HOST
 *   CPANEL_USER or HOSTING_COM_CPANEL_USERNAME
 *   CPANEL_TOKEN or HOSTING_COM_CPANEL_API_TOKEN
 *   CPANEL_DOCROOT or HOSTING_COM_CPANEL_DOCROOT
 *
 * For this project, CPANEL_DOCROOT defaults to the CurryControls addon-domain
 * directory under the cPanel home directory when it is not set explicitly.
 * Optional:
 *   CPANEL_PORT     defaults to 2083
 *   CPANEL_STAGING  where to put the archive, defaults to the account home
 *   SITE_URL        public origin, enables the post-deploy check
 *
 * Usage: pnpm --filter @workspace/currycontrols run deploy [--skip-build]
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const here = resolve(import.meta.dirname);
const appRoot = resolve(here, '..');
const publicDir = resolve(appRoot, 'dist/public');
const archivePath = resolve(appRoot, 'dist/site.zip');

const skipBuild = process.argv.includes('--skip-build');

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`[deploy] missing required environment variable ${name}`);
    process.exit(1);
  }
  return value;
}

function firstValue(...names) {
  return names.map((name) => process.env[name]).find(Boolean);
}

function requiredAny(...names) {
  const value = firstValue(...names);
  if (!value) {
    console.error(`[deploy] missing required environment variable ${names.join(' or ')}`);
    process.exit(1);
  }
  return value;
}

const HOST = requiredAny('CPANEL_HOST', 'HOSTING_COM_CPANEL_HOST')
  .replace(/^https?:\/\//, '')
  .replace(/\/.*$/, '');
const USER = requiredAny('CPANEL_USER', 'HOSTING_COM_CPANEL_USERNAME');
const TOKEN = requiredAny('CPANEL_TOKEN', 'HOSTING_COM_CPANEL_API_TOKEN');
const DOMAIN = process.env['CPANEL_DOMAIN'] ?? 'currycontrols.com';
const DOCROOT = (
  firstValue('CPANEL_DOCROOT', 'HOSTING_COM_CPANEL_DOCROOT') ??
  `/home/${USER}/${DOMAIN}`
).replace(/\/+$/, '');
const PORT = process.env['CPANEL_PORT'] ?? '2083';
const SITE_URL = (process.env['SITE_URL'] ?? `https://${DOMAIN}`).replace(/\/+$/, '');

// cPanel home directories are /home/<user>. Staging the archive there keeps it
// out of the document root and needs no mkdir.
const STAGING =
  process.env['CPANEL_STAGING']?.replace(/\/+$/, '') ??
  (DOCROOT.match(/^(\/home\d*\/[^/]+)/)?.[1] ?? `/home/${USER}`);

const AUTH = { Authorization: `cpanel ${USER}:${TOKEN}` };
const base = `https://${HOST}:${PORT}`;

/** Wraps fetch so a DNS or TLS failure reports the host instead of a stack trace. */
async function call(url, init, what) {
  try {
    return await fetch(url, init);
  } catch (error) {
    console.error(`[deploy] could not reach ${HOST}:${PORT} while trying to ${what}.`);
    console.error(`[deploy] ${error.cause?.message ?? error.message}`);
    console.error('[deploy] Check CPANEL_HOST and CPANEL_PORT, and that the host allows API access.');
    process.exit(1);
  }
}

/* ------------------------------- build ---------------------------------- */

if (!skipBuild) {
  console.log('[deploy] building');
  execFileSync('pnpm', ['run', 'build'], {
    cwd: appRoot,
    stdio: 'inherit',
    env: { ...process.env, BASE_PATH: process.env['BASE_PATH'] ?? '/', PORT: process.env['PORT'] ?? '5173' },
  });
}

try {
  statSync(resolve(publicDir, 'index.html'));
} catch {
  console.error(`[deploy] no build found at ${publicDir}. Run without --skip-build.`);
  process.exit(1);
}

/* ------------------------------ package --------------------------------- */

rmSync(archivePath, { force: true });
console.log('[deploy] packaging');
// -r recurses, -q is quiet. Running from publicDir keeps archive paths relative
// to the document root, and zip includes dotfiles such as .htaccess.
execFileSync('zip', ['-rq', archivePath, '.'], { cwd: publicDir, stdio: 'inherit' });

const pages = execFileSync('sh', ['-c', `unzip -l ${archivePath} | grep -c 'index.html$'`])
  .toString()
  .trim();
const bytes = statSync(archivePath).size;
console.log(`[deploy] archive holds ${pages} pages, ${(bytes / 1048576).toFixed(1)} MB`);

if (Number(pages) < 2) {
  console.error('[deploy] archive contains almost no pages; the prerender step did not run. Aborting.');
  process.exit(1);
}

/* ------------------------------- upload --------------------------------- */

console.log(`[deploy] uploading to ${STAGING}`);
const form = new FormData();
form.set('dir', STAGING);
form.set('file-1', new Blob([readFileSync(archivePath)]), 'site.zip');

const uploadRes = await call(
  `${base}/execute/Fileman/upload_files`,
  { method: 'POST', headers: AUTH, body: form },
  'upload the archive',
);

if (!uploadRes.ok) {
  console.error(`[deploy] upload failed: HTTP ${uploadRes.status} ${uploadRes.statusText}`);
  console.error((await uploadRes.text()).slice(0, 500));
  process.exit(1);
}

const upload = await uploadRes.json();
if (upload.status !== 1) {
  console.error('[deploy] upload rejected:', upload.errors ?? upload);
  process.exit(1);
}

// Use the name the server reports rather than assuming, in case cPanel
// renamed the file to avoid clobbering an existing one.
const savedName = upload.data?.uploads?.[0]?.file ?? 'site.zip';
const remoteArchive = `${STAGING}/${savedName}`;
console.log(`[deploy] uploaded as ${remoteArchive}`);

/* ------------------------------- extract -------------------------------- */

console.log(`[deploy] extracting into ${DOCROOT}`);
const params = new URLSearchParams({
  'cpanel_jsonapi_user': USER,
  'cpanel_jsonapi_apiversion': '2',
  'cpanel_jsonapi_module': 'Fileman',
  'cpanel_jsonapi_func': 'fileop',
  op: 'extract',
  sourcefiles: remoteArchive,
  destfiles: DOCROOT,
  doubledecode: '0',
});

const extractRes = await call(`${base}/json-api/cpanel?${params}`, { headers: AUTH }, 'extract the archive');

if (!extractRes.ok) {
  console.error(`[deploy] extract failed: HTTP ${extractRes.status} ${extractRes.statusText}`);
  console.error((await extractRes.text()).slice(0, 500));
  process.exit(1);
}

const extract = await extractRes.json();
const result = extract.cpanelresult;
if (result?.error || result?.data?.[0]?.result === 0) {
  console.error('[deploy] extract rejected:', result?.error ?? result?.data?.[0]?.reason ?? result);
  process.exit(1);
}
console.log('[deploy] extracted');

/* ------------------------------- verify --------------------------------- */

if (!SITE_URL) {
  console.log('[deploy] done. Set SITE_URL to enable the post-deploy check.');
  process.exit(0);
}

// A deep route is the check that matters: it is the one that fails when the
// route directories do not land and the fallback serves the home page.
const probe = `${SITE_URL}/calculators/voltage-drop`;
console.log(`[deploy] checking ${probe}`);

try {
  const res = await fetch(probe, { redirect: 'follow' });
  const html = await res.text();
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '(none)';

  if (title.startsWith('Voltage Drop Calculator')) {
    console.log(`[deploy] verified. Deep routes are serving their own pages.`);
  } else {
    console.error(`[deploy] WARNING: expected the calculator title, got "${title}".`);
    console.error('[deploy] The route directories may not have extracted; the fallback is serving the home page.');
    process.exit(1);
  }
} catch (error) {
  console.error(`[deploy] could not reach ${probe}:`, error.message);
  console.error('[deploy] The upload and extract succeeded; check the site manually.');
}
