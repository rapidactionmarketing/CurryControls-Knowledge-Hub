/**
 * Where the site's API lives.
 *
 * On the Replit deployment the API server sits behind the same router as the
 * site, so `/api/...` is same-origin and VITE_API_BASE_URL stays unset. The
 * static build on the cPanel host has no API of its own, so that build is made
 * with VITE_API_BASE_URL set to the API server's public origin, and every
 * request from the site carries that prefix.
 */
const raw = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '';

export const API_BASE: string = raw.trim().replace(/\/+$/, '');

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
