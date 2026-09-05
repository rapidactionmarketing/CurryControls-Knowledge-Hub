import type { StoredEvent, StoreKind } from "./analytics-store";

/**
 * Turns raw events into the dashboard summary.
 *
 * Shared by both storage backends so the numbers are identical whichever one
 * is active.
 */

type Count = { key: string; label?: string; count: number };
type SearchTerm = { query: string; count: number; zeroResultCount: number };

export type Summary = {
  storage: StoreKind;
  rangeDays: number;
  generatedAt: string;
  totals: {
    pageviews: number;
    sessions: number;
    phoneClicks: number;
    searches: number;
    contactSubmits: number;
    outboundClicks: number;
  };
  daily: { date: string; pageviews: number; sessions: number; phoneClicks: number }[];
  topPages: Count[];
  topSearches: SearchTerm[];
  unansweredSearches: SearchTerm[];
  phoneClicksByPlacement: Count[];
  topReferrers: Count[];
  outboundClicks: Count[];
  webVitals: { metric: string; p75: number; samples: number }[];
};

function topN(counts: Map<string, { label?: string; count: number }>, n: number): Count[] {
  return [...counts.entries()]
    .map(([key, v]) => ({ key, ...(v.label ? { label: v.label } : {}), count: v.count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, n);
}

function bump(
  map: Map<string, { label?: string; count: number }>,
  key: string,
  label?: string,
): void {
  const existing = map.get(key);
  if (existing) {
    existing.count += 1;
    if (label && !existing.label) existing.label = label;
  } else {
    map.set(key, { ...(label ? { label } : {}), count: 1 });
  }
}

/** 75th percentile, the threshold Core Web Vitals are assessed against. */
function p75(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.75) - 1);
  return Math.round((sorted[Math.max(index, 0)] ?? 0) * 1000) / 1000;
}

export function summarize(
  events: StoredEvent[],
  rangeDays: number,
  storage: StoreKind,
): Summary {
  const totals = {
    pageviews: 0,
    sessions: 0,
    phoneClicks: 0,
    searches: 0,
    contactSubmits: 0,
    outboundClicks: 0,
  };

  const sessions = new Set<string>();
  const pages = new Map<string, { label?: string; count: number }>();
  const placements = new Map<string, { label?: string; count: number }>();
  const referrers = new Map<string, { label?: string; count: number }>();
  const outbound = new Map<string, { label?: string; count: number }>();
  const searches = new Map<string, SearchTerm>();
  const vitals = new Map<string, number[]>();
  const daily = new Map<string, { pageviews: number; sessions: number; phoneClicks: number }>();

  // Seed every day in the window so a gap shows as zero rather than vanishing.
  const today = new Date();
  for (let i = rangeDays - 1; i >= 0; i -= 1) {
    const date = new Date(today.getTime() - i * 86_400_000).toISOString().slice(0, 10);
    daily.set(date, { pageviews: 0, sessions: 0, phoneClicks: 0 });
  }

  for (const event of events) {
    const day = event.occurredAt.toISOString().slice(0, 10);
    const bucket = daily.get(day) ?? { pageviews: 0, sessions: 0, phoneClicks: 0 };
    daily.set(day, bucket);

    if (event.isNewSession) {
      sessions.add(event.sessionId);
      bucket.sessions += 1;
    }

    switch (event.type) {
      case "pageview": {
        totals.pageviews += 1;
        bucket.pageviews += 1;
        bump(pages, event.path, event.title);
        if (event.referrer) bump(referrers, event.referrer);
        break;
      }
      case "phone_click": {
        totals.phoneClicks += 1;
        bucket.phoneClicks += 1;
        bump(placements, event.label ?? "unknown");
        break;
      }
      case "contact_submit":
        totals.contactSubmits += 1;
        break;
      case "outbound_click":
        totals.outboundClicks += 1;
        bump(outbound, event.label ?? "unknown");
        break;
      case "search": {
        totals.searches += 1;
        const query = (event.query ?? "").trim().toLowerCase();
        if (!query) break;
        const term = searches.get(query) ?? { query, count: 0, zeroResultCount: 0 };
        term.count += 1;
        // value carries the result count, so zero means the site had no answer.
        if (event.value === 0) term.zeroResultCount += 1;
        searches.set(query, term);
        break;
      }
      case "web_vital": {
        if (!event.label || typeof event.value !== "number") break;
        const samples = vitals.get(event.label) ?? [];
        samples.push(event.value);
        vitals.set(event.label, samples);
        break;
      }
      default:
        break;
    }
  }

  totals.sessions = sessions.size;

  const allSearches = [...searches.values()].sort(
    (a, b) => b.count - a.count || a.query.localeCompare(b.query),
  );

  return {
    storage,
    rangeDays,
    generatedAt: new Date().toISOString(),
    totals,
    daily: [...daily.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, v]) => ({ date, ...v })),
    topPages: topN(pages, 25),
    topSearches: allSearches.slice(0, 25),
    // The most useful list on the dashboard: what people looked for and did
    // not find, which is the content backlog in priority order.
    unansweredSearches: allSearches
      .filter((term) => term.zeroResultCount > 0)
      .sort((a, b) => b.zeroResultCount - a.zeroResultCount)
      .slice(0, 25),
    phoneClicksByPlacement: topN(placements, 20),
    topReferrers: topN(referrers, 20),
    outboundClicks: topN(outbound, 20),
    webVitals: [...vitals.entries()]
      .map(([metric, values]) => ({ metric, p75: p75(values), samples: values.length }))
      .sort((a, b) => a.metric.localeCompare(b.metric)),
  };
}
