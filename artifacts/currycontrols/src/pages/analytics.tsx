import { useState } from 'react';
import { AlertCircle, CheckCircle2, CircleDot, Database, HardDrive, RefreshCw } from 'lucide-react';
import { useGetAnalyticsSummary } from '@workspace/api-client-react';
import type { AnalyticsCount, AnalyticsSearchTerm } from '@workspace/api-client-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { DailyChart } from '@/components/blocks/daily-chart';

/**
 * First-party analytics dashboard.
 *
 * Reads the aggregate endpoint on the site's own API server. No third-party
 * script is involved, and nothing here can identify a visitor.
 */

const RANGES = [7, 30, 90] as const;

/** Core Web Vitals assessment thresholds, in milliseconds except CLS. */
const VITAL_THRESHOLDS: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: 'ms' },
  INP: { good: 200, poor: 500, unit: 'ms' },
  CLS: { good: 0.1, poor: 0.25, unit: '' },
  TTFB: { good: 800, poor: 1800, unit: 'ms' },
};

export function AnalyticsPage() {
  const [days, setDays] = useState<number>(30);
  const { data, isLoading, isError, refetch, isFetching } = useGetAnalyticsSummary({ days });

  return (
    <>
      <Seo
        title="Site analytics"
        description="First-party analytics for CurryControls.com."
        path="/analytics"
        noindex
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-8">
          <Breadcrumbs trail={[{ name: 'Site analytics', path: '/analytics' }]} />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="cc-h1">Site analytics</h1>
              <p className="cc-lead mt-2 max-w-2xl">
                First-party and cookieless. No third-party script, no advertising identifier, and
                no way to recognise a visitor between sessions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded border border-[hsl(var(--rule))] bg-white p-0.5" role="group" aria-label="Reporting window">
                {RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setDays(range)}
                    aria-pressed={days === range}
                    className={`rounded px-3 py-1.5 text-[0.8rem] font-semibold ${
                      days === range
                        ? 'bg-[hsl(var(--navy))] text-white'
                        : 'text-[hsl(var(--ink-2))] hover:bg-[hsl(var(--surface))]'
                    }`}
                    data-testid={`range-${range}`}
                  >
                    {range}d
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => void refetch()}
                className="cc-btn cc-btn-outline p-2"
                aria-label="Refresh"
              >
                <RefreshCw size={15} aria-hidden="true" className={isFetching ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="cc-container py-9">
        {isLoading ? (
          <p className="text-[0.9rem] text-[hsl(var(--ink-2))]">Loading…</p>
        ) : isError || !data ? (
          <div className="cc-card max-w-2xl p-6" data-testid="analytics-error">
            <div className="flex items-center gap-2 text-[hsl(var(--destructive))]">
              <AlertCircle size={17} aria-hidden="true" />
              <span className="cc-eyebrow">Not reachable</span>
            </div>
            <h2 className="cc-h2 mt-2">The analytics API did not respond</h2>
            <p className="mt-2.5 text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">
              Collection happens in the browser and delivery goes to this site's own API server at
              <code className="cc-mono mx-1 rounded bg-[hsl(var(--surface))] px-1">/api</code>.
              If the site is being served on its own, start the API server and reload.
            </p>
            <pre className="cc-code mt-4 text-[0.76rem]">
pnpm --filter @workspace/api-server run dev</pre>
          </div>
        ) : (
          <>
            <section aria-labelledby="totals-heading">
              <h2 id="totals-heading" className="sr-only">
                Totals
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <Stat label="Pageviews" value={data.totals.pageviews} />
                <Stat label="Sessions" value={data.totals.sessions} />
                <Stat label="Phone clicks" value={data.totals.phoneClicks} emphasis />
                <Stat label="Searches" value={data.totals.searches} />
                <Stat label="Messages started" value={data.totals.contactSubmits} emphasis />
                <Stat label="Outbound clicks" value={data.totals.outboundClicks} />
              </div>
            </section>

            <section className="mt-8" aria-labelledby="daily-heading">
              <h2 id="daily-heading" className="cc-h2">
                Daily activity
              </h2>
              <p className="mt-1.5 text-[0.86rem] text-[hsl(var(--ink-2))]">
                Three measures on very different scales, so each gets its own axis rather than
                sharing one.
              </p>
              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                <DailyChart title="Pageviews" points={data.daily} metric="pageviews" />
                <DailyChart title="Sessions" points={data.daily} metric="sessions" />
                <DailyChart title="Phone clicks" points={data.daily} metric="phoneClicks" />
              </div>
            </section>

            {data.unansweredSearches.length > 0 && (
              <section className="mt-10" aria-labelledby="unanswered-heading">
                <h2 id="unanswered-heading" className="cc-h2">
                  Searches that returned nothing
                </h2>
                <p className="mt-1.5 max-w-2xl text-[0.86rem] text-[hsl(var(--ink-2))]">
                  The most useful list here. Each row is a question a visitor brought to the site
                  that it could not answer, ranked by how often. This is the content backlog in
                  priority order.
                </p>
                <SearchTable rows={data.unansweredSearches} highlightZero />
              </section>
            )}

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <section aria-labelledby="pages-heading">
                <h2 id="pages-heading" className="cc-h2">
                  Top pages
                </h2>
                <CountTable rows={data.topPages} keyHeader="Page" showLabel />
              </section>

              <section aria-labelledby="placements-heading">
                <h2 id="placements-heading" className="cc-h2">
                  Phone clicks by placement
                </h2>
                <p className="mt-1.5 text-[0.86rem] text-[hsl(var(--ink-2))]">
                  Which contact link people actually use.
                </p>
                <CountTable rows={data.phoneClicksByPlacement} keyHeader="Placement" />
              </section>

              <section aria-labelledby="searches-heading">
                <h2 id="searches-heading" className="cc-h2">
                  Top searches
                </h2>
                <SearchTable rows={data.topSearches} />
              </section>

              <section aria-labelledby="referrers-heading">
                <h2 id="referrers-heading" className="cc-h2">
                  Referrers
                </h2>
                <p className="mt-1.5 text-[0.86rem] text-[hsl(var(--ink-2))]">
                  Origin only. Paths and query strings never leave the browser.
                </p>
                <CountTable rows={data.topReferrers} keyHeader="Origin" />
              </section>

              <section aria-labelledby="outbound-heading">
                <h2 id="outbound-heading" className="cc-h2">
                  Outbound clicks
                </h2>
                <CountTable rows={data.outboundClicks} keyHeader="Destination" />
              </section>

              <section aria-labelledby="vitals-heading">
                <h2 id="vitals-heading" className="cc-h2">
                  Core Web Vitals
                </h2>
                <p className="mt-1.5 text-[0.86rem] text-[hsl(var(--ink-2))]">
                  Measured on real visits, at the 75th percentile. These are a ranking input, and
                  field data is what counts.
                </p>
                {data.webVitals.length === 0 ? (
                  <Empty>No measurements in this window yet.</Empty>
                ) : (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {data.webVitals.map((vital) => (
                      <VitalTile key={vital.metric} metric={vital.metric} p75={vital.p75} samples={vital.samples} />
                    ))}
                  </div>
                )}
              </section>
            </div>

            <footer className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[hsl(var(--rule))] pt-5 text-[0.78rem] text-[hsl(var(--ink-2))]">
              <span className="inline-flex items-center gap-1.5">
                {data.storage === 'postgres' ? (
                  <Database size={13} aria-hidden="true" />
                ) : (
                  <HardDrive size={13} aria-hidden="true" />
                )}
                Storage: {data.storage}
                {data.storage === 'file' && (
                  <span className="ml-1">
                    — provision Postgres and set DATABASE_URL for durable, shared storage
                  </span>
                )}
              </span>
              <span>Window: {data.rangeDays} days</span>
              <span>Generated {new Date(data.generatedAt).toLocaleString()}</span>
            </footer>
          </>
        )}
      </div>
    </>
  );
}

function Stat({ label, value, emphasis = false }: { label: string; value: number; emphasis?: boolean }) {
  return (
    <div className={`cc-card p-4 ${emphasis ? 'border-[hsl(var(--accent-blue))]/40' : ''}`}>
      <div className="text-[0.78rem] text-[hsl(var(--ink-2))]">{label}</div>
      <div className="mt-1 text-[1.6rem] font-semibold leading-none text-[hsl(var(--navy))]">
        {value.toLocaleString('en-US')}
      </div>
    </div>
  );
}

function VitalTile({ metric, p75, samples }: { metric: string; p75: number; samples: number }) {
  const threshold = VITAL_THRESHOLDS[metric];
  const status = !threshold
    ? 'unknown'
    : p75 <= threshold.good
      ? 'good'
      : p75 <= threshold.poor
        ? 'needs-work'
        : 'poor';

  // Status is carried by an icon and a label as well as colour, never colour alone.
  const meta = {
    good: { color: '#0ca30c', Icon: CheckCircle2, text: 'Good' },
    'needs-work': { color: '#ec835a', Icon: CircleDot, text: 'Needs improvement' },
    poor: { color: '#d03b3b', Icon: AlertCircle, text: 'Poor' },
    unknown: { color: 'hsl(var(--ink-2))', Icon: CircleDot, text: 'No threshold' },
  }[status];

  const display =
    metric === 'CLS' ? p75.toFixed(3) : `${Math.round(p75).toLocaleString('en-US')} ${threshold?.unit ?? ''}`;

  return (
    <div className="cc-card p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="cc-mono text-[0.8rem] font-semibold text-[hsl(var(--navy))]">{metric}</span>
        <span className="inline-flex items-center gap-1.5 text-[0.74rem]" style={{ color: meta.color }}>
          <meta.Icon size={13} aria-hidden="true" />
          {meta.text}
        </span>
      </div>
      <div className="mt-1.5 text-[1.35rem] font-semibold leading-none text-[hsl(var(--navy))]">
        {display}
      </div>
      <div className="mt-1 text-[0.72rem] text-[hsl(var(--ink-2))] tabular-nums">
        {samples.toLocaleString('en-US')} {samples === 1 ? 'sample' : 'samples'}
      </div>
    </div>
  );
}

function CountTable({
  rows,
  keyHeader,
  showLabel = false,
}: {
  rows: AnalyticsCount[];
  keyHeader: string;
  showLabel?: boolean;
}) {
  if (rows.length === 0) return <Empty>Nothing recorded in this window yet.</Empty>;
  return (
    <div className="cc-table-wrap mt-4">
      <table className="cc-table">
        <thead>
          <tr>
            <th scope="col">{keyHeader}</th>
            <th scope="col" className="text-right">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>
                {showLabel && row.label ? (
                  <>
                    <span className="block font-medium text-[hsl(var(--navy))]">{row.label}</span>
                    <span className="cc-mono block text-[0.72rem] text-[hsl(var(--ink-2))]">{row.key}</span>
                  </>
                ) : (
                  <span className="cc-mono text-[0.82rem]">{row.key}</span>
                )}
              </td>
              <td className="text-right tabular-nums">{row.count.toLocaleString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SearchTable({
  rows,
  highlightZero = false,
}: {
  rows: AnalyticsSearchTerm[];
  highlightZero?: boolean;
}) {
  if (rows.length === 0) return <Empty>No searches in this window yet.</Empty>;
  return (
    <div className="cc-table-wrap mt-4">
      <table className="cc-table">
        <thead>
          <tr>
            <th scope="col">Query</th>
            <th scope="col" className="text-right">
              Searches
            </th>
            <th scope="col" className="text-right">
              {highlightZero ? 'With no result' : 'No result'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.query}>
              <td className="font-medium text-[hsl(var(--navy))]">{row.query}</td>
              <td className="text-right tabular-nums">{row.count.toLocaleString('en-US')}</td>
              <td className="text-right tabular-nums">
                {row.zeroResultCount > 0 ? row.zeroResultCount.toLocaleString('en-US') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded border border-dashed border-[hsl(var(--rule))] p-4 text-[0.86rem] text-[hsl(var(--ink-2))]">
      {children}
    </p>
  );
}
