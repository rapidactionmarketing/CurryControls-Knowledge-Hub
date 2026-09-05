---
name: Hosting.com shared deployment
description: CurryControls is hosted as a static Vite build in the Hosting.com cPanel addon-domain document root.
---

Hosting.com shared hosting is sufficient for CurryControls because the artifact is a static React/Vite build; the addon domain has its own document root, and client-side routing requires an `.htaccess` fallback.

**Why:** The account contains multiple hosted domains, so uploading to the account-level `public_html` directory can target the wrong site. The domain-specific directory is the safe deployment target.

**How to apply:** Confirm the addon domain’s document root before uploading. Use cPanel API token authentication, upload the built root files and `assets` directory there, and allow intended entry-file overwrites when publishing a new build.