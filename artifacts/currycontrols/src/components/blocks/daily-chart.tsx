import { useId, useState } from 'react';
import type { AnalyticsDailyPoint } from '@workspace/api-client-react';

/**
 * One metric of daily activity, drawn as columns.
 *
 * Three metrics of very different magnitude share this dashboard, so they are
 * drawn as small multiples — one single-series chart each — rather than as
 * three series on one pair of axes. A single series needs no legend; the title
 * names it. The site's blues are too close to work as a categorical set, so
 * every facet uses the same hue and the heading carries the identity.
 */

const SERIES = 'hsl(var(--accent-blue))';
const SURFACE_GAP = 2;
const MAX_BAR = 24;

export function DailyChart({
  title,
  points,
  metric,
  format = (n: number) => n.toLocaleString('en-US'),
}: {
  title: string;
  points: AnalyticsDailyPoint[];
  metric: 'pageviews' | 'sessions' | 'phoneClicks';
  format?: (n: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const clipId = useId();

  const values = points.map((p) => Number(p[metric] ?? 0));
  const max = Math.max(1, ...values);
  const total = values.reduce((sum, v) => sum + v, 0);

  const height = 96;
  const width = 720;
  const slot = points.length > 0 ? width / points.length : width;
  const barWidth = Math.min(MAX_BAR, Math.max(2, slot - SURFACE_GAP));

  const active = hover !== null ? points[hover] : undefined;

  return (
    <figure className="cc-card m-0 p-4" data-testid={`daily-chart-${metric}`}>
      <figcaption className="flex items-baseline justify-between gap-3">
        <h3 className="text-[0.82rem] font-semibold text-[hsl(var(--navy))]">{title}</h3>
        <span className="cc-mono text-[0.78rem] text-[hsl(var(--ink-2))] tabular-nums">
          {format(total)} total
        </span>
      </figcaption>

      <div className="relative mt-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="block h-24 w-full"
          role="img"
          aria-label={`${title}: ${format(total)} across ${points.length} days`}
        >
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={width} height={height} />
            </clipPath>
          </defs>

          {/* Recessive hairline baseline. */}
          <line
            x1="0"
            y1={height - 0.5}
            x2={width}
            y2={height - 0.5}
            stroke="hsl(var(--rule))"
            strokeWidth="1"
          />

          <g clipPath={`url(#${clipId})`}>
            {points.map((point, index) => {
              const value = Number(point[metric] ?? 0);
              const barHeight = value === 0 ? 0 : Math.max(2, (value / max) * (height - 8));
              const x = index * slot + (slot - barWidth) / 2;
              return (
                <g key={point.date}>
                  {/* Full-height hit target, larger than the mark itself. */}
                  <rect
                    x={index * slot}
                    y={0}
                    width={slot}
                    height={height}
                    fill="transparent"
                    onPointerEnter={() => setHover(index)}
                    onPointerLeave={() => setHover((h) => (h === index ? null : h))}
                  />
                  {barHeight > 0 && (
                    <rect
                      x={x}
                      y={height - barHeight}
                      width={barWidth}
                      height={barHeight}
                      // Rounded data-end, square at the baseline.
                      rx={Math.min(4, barWidth / 2)}
                      fill={SERIES}
                      opacity={hover === null || hover === index ? 1 : 0.45}
                    />
                  )}
                  {barHeight > 0 && (
                    <rect
                      x={x}
                      y={height - Math.min(barHeight, 5)}
                      width={barWidth}
                      height={Math.min(barHeight, 5)}
                      fill={SERIES}
                      opacity={hover === null || hover === index ? 1 : 0.45}
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute -top-1 left-0 right-0 flex justify-center"
            aria-hidden="true"
          >
            <span className="cc-mono rounded border border-[hsl(var(--rule))] bg-white px-2 py-0.5 text-[0.7rem] text-[hsl(var(--navy))] shadow-sm tabular-nums">
              {active.date} · {format(Number(active[metric] ?? 0))}
            </span>
          </div>
        )}
      </div>

      <div className="mt-1.5 flex justify-between text-[0.68rem] text-[hsl(var(--ink-2))]">
        <span>{points[0]?.date ?? ''}</span>
        <span>{points[points.length - 1]?.date ?? ''}</span>
      </div>
    </figure>
  );
}
