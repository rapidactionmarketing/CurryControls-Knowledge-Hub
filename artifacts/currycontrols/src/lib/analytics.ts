import type { AnalyticsEvent } from '@workspace/api-client-react';
import { apiUrl } from './api-base';

/**
 * First-party analytics collector.
 *
 * Cookieless and identifier-free. The only thing that persists is a random
 * session id in sessionStorage, which the browser discards when the tab
 * closes; nothing here can recognise a visitor across sessions. No IP address
 * is sent, and the server does not record one.
 *
 * Collection is off entirely when the browser sends Do Not Track or Global
 * Privacy Control, or when the visitor has opted out on the privacy page.
 */

const ENDPOINT = apiUrl('/api/analytics/events');
const SESSION_KEY = 'ccSessionId';
const OPT_OUT_KEY = 'ccAnalyticsOptOut';
const FLUSH_AFTER_MS = 4000;
const FLUSH_AT_COUNT = 12;
/** After this many consecutive delivery failures, stop trying for the session. */
const MAX_FAILURES = 3;

type QueuedEvent = AnalyticsEvent;

let queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let failures = 0;
let disabled = false;
let started = false;
let sessionId = '';
let isNewSession = false;

/* ------------------------------------------------------------------ *
 * Consent
 * ------------------------------------------------------------------ */

type Nav = Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string };

function signalsOptOut(): boolean {
  if (typeof navigator === 'undefined') return true;
  const nav = navigator as Nav;
  if (nav.globalPrivacyControl === true) return true;
  const dnt =
    nav.doNotTrack ??
    nav.msDoNotTrack ??
    (typeof window !== 'undefined' ? (window as { doNotTrack?: string }).doNotTrack : undefined);
  return dnt === '1' || dnt === 'yes';
}

export function hasOptedOut(): boolean {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setOptOut(value: boolean): void {
  try {
    if (value) localStorage.setItem(OPT_OUT_KEY, 'true');
    else localStorage.removeItem(OPT_OUT_KEY);
  } catch {
    // Nothing to do; the preference simply does not persist.
  }
  disabled = value || signalsOptOut();
  if (disabled) queue = [];
}

/** Why collection is on or off, shown on the privacy page. */
export function analyticsStatus(): 'on' | 'opted-out' | 'privacy-signal' {
  if (signalsOptOut()) return 'privacy-signal';
  if (hasOptedOut()) return 'opted-out';
  return 'on';
}

/* ------------------------------------------------------------------ *
 * Queue and delivery
 * ------------------------------------------------------------------ */

function ensureSession(): void {
  if (sessionId) return;
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) {
      sessionId = existing;
      return;
    }
  } catch {
    // sessionStorage can be unavailable; fall through to a memory-only id.
  }
  sessionId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  isNewSession = true;
  try {
    sessionStorage.setItem(SESSION_KEY, sessionId);
  } catch {
    // Memory-only session id is fine.
  }
}

function viewportBucket(): string {
  if (typeof window === 'undefined') return 'unknown';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/** Referrer origin only. Paths and query strings never leave the browser. */
function referrerOrigin(): string | undefined {
  if (typeof document === 'undefined' || !document.referrer) return undefined;
  try {
    const url = new URL(document.referrer);
    if (url.host === window.location.host) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

function flush(useBeacon = false): void {
  if (disabled || queue.length === 0 || failures >= MAX_FAILURES) return;

  const batch = { sessionId, events: queue.slice(0, 50) };
  queue = queue.slice(50);

  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  const body = JSON.stringify(batch);

  if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const ok = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
    if (!ok) failures += 1;
    return;
  }

  void fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  })
    .then((response) => {
      if (response.ok) failures = 0;
      else failures += 1;
    })
    .catch(() => {
      // The API server may not be running in a static preview. Give up
      // quietly rather than filling the console with failed requests.
      failures += 1;
    });
}

function track(event: QueuedEvent): void {
  if (disabled || failures >= MAX_FAILURES) return;
  ensureSession();

  queue.push(event);
  if (isNewSession) {
    event.newSession = true;
    isNewSession = false;
  }

  if (queue.length >= FLUSH_AT_COUNT) flush();
  else if (!timer) timer = setTimeout(() => flush(), FLUSH_AFTER_MS);
}

const now = () => Date.now();

/* ------------------------------------------------------------------ *
 * Public tracking calls
 * ------------------------------------------------------------------ */

export function trackPageview(path: string, title: string): void {
  const referrer = referrerOrigin();
  track({
    type: 'pageview',
    path,
    ts: now(),
    title,
    viewport: viewportBucket(),
    ...(referrer ? { referrer } : {}),
  });
}

/** `placement` says which phone link was used, so the useful ones are visible. */
export function trackPhoneClick(placement: string, path: string): void {
  track({ type: 'phone_click', path, ts: now(), label: placement });
}

/** `resultCount` of 0 marks a question the site could not answer. */
export function trackSearch(query: string, resultCount: number, path: string): void {
  track({ type: 'search', path, ts: now(), query, value: resultCount });
}

export function trackSearchResultOpen(destination: string, path: string): void {
  track({ type: 'search_result_open', path, ts: now(), label: destination });
}

export function trackOutbound(host: string, path: string): void {
  track({ type: 'outbound_click', path, ts: now(), label: host });
}

export function trackContactSubmit(topic: string, path: string): void {
  track({ type: 'contact_submit', path, ts: now(), label: topic || 'unspecified' });
}

/* ------------------------------------------------------------------ *
 * Automatic collection
 * ------------------------------------------------------------------ */

/**
 * Core Web Vitals, measured natively rather than by pulling in a library.
 *
 * These are a real ranking input, and field measurements from actual visitors
 * are the ones that count — a lab score says nothing about the technician
 * loading a page over cellular at a lift station.
 */
function observeWebVitals(): void {
  if (typeof PerformanceObserver === 'undefined') return;
  const path = window.location.pathname;

  const report = (metric: string, value: number) => {
    track({ type: 'web_vital', path, ts: now(), label: metric, value: Math.round(value * 1000) / 1000 });
  };

  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (navEntry) report('TTFB', navEntry.responseStart);
  } catch {
    // Not available in every browser.
  }

  // Largest Contentful Paint: report the last candidate when the page is hidden.
  let lcp = 0;
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) lcp = last.startTime;
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // Unsupported; skip the metric rather than failing.
  }

  // Cumulative Layout Shift: sum shifts that were not caused by user input.
  let cls = 0;
  try {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
      })[]) {
        if (!entry.hadRecentInput) cls += entry.value;
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Unsupported.
  }

  // Interaction to Next Paint, approximated by the worst interaction duration.
  let inp = 0;
  try {
    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & { duration: number })[]) {
        if (entry.duration > inp) inp = entry.duration;
      }
    });
    inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 40 } as PerformanceObserverInit);
  } catch {
    // Unsupported.
  }

  let reported = false;
  const finalize = () => {
    if (reported) return;
    reported = true;
    if (lcp > 0) report('LCP', lcp);
    report('CLS', cls);
    if (inp > 0) report('INP', inp);
    flush(true);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') finalize();
  });
  window.addEventListener('pagehide', finalize);
}

/**
 * One delegated click listener handles phone and outbound clicks, so no
 * component has to wire up an onClick. A phone link declares its placement
 * with `data-phone-placement`.
 */
function observeClicks(): void {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const path = window.location.pathname;

      if (href.startsWith('tel:')) {
        trackPhoneClick(anchor.getAttribute('data-phone-placement') ?? 'unlabelled', path);
        flush(true);
        return;
      }

      if (/^https?:/i.test(href)) {
        try {
          const url = new URL(href);
          if (url.host !== window.location.host) {
            trackOutbound(url.host, path);
            flush(true);
          }
        } catch {
          // Malformed href; nothing to record.
        }
      }
    },
    { capture: true },
  );
}

/** Starts collection. Safe to call more than once. */
export function initAnalytics(): void {
  if (started || typeof window === 'undefined') return;
  started = true;

  disabled = signalsOptOut() || hasOptedOut();
  if (disabled) return;

  ensureSession();
  observeClicks();
  observeWebVitals();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });
  window.addEventListener('pagehide', () => flush(true));
}

export function isAnalyticsActive(): boolean {
  return started && !disabled;
}
