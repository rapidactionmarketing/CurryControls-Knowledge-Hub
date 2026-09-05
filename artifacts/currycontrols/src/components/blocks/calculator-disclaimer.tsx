import { Link } from 'wouter';
import { AlertTriangle } from 'lucide-react';
import { DISCLAIMERS } from '@/data/site';

/**
 * The disclaimer that appears on every calculator and every reference table.
 *
 * Deliberately prominent rather than a footnote. A wrong conductor size or a
 * wrong overcurrent setting has physical consequences, so the limits of these
 * pages are stated where they cannot be missed.
 */
export function CalculatorDisclaimer({
  variant = 'calculator',
  compact = false,
}: {
  variant?: 'calculator' | 'table';
  compact?: boolean;
}) {
  const text = variant === 'table' ? DISCLAIMERS.tables : DISCLAIMERS.calculator;

  if (compact) {
    return (
      <p
        className="mt-3 flex gap-2 text-[0.76rem] leading-5 text-[hsl(var(--ink-2))]"
        data-testid="calculator-disclaimer-compact"
      >
        <AlertTriangle size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-[hsl(32_80%_44%)]" />
        <span>
          Estimating aid only, used at your own risk. Verify every result against the applicable code and manufacturer data.{' '}
          <Link href="/disclaimer" className="cc-link">
            Full disclaimer
          </Link>
          .
        </span>
      </p>
    );
  }

  return (
    <aside
      className="cc-callout p-4 sm:p-5"
      data-kind="warning"
      role="note"
      aria-labelledby="calc-disclaimer-heading"
      data-testid="calculator-disclaimer"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={15} aria-hidden="true" className="text-[hsl(var(--navy))]" />
        <span
          id="calc-disclaimer-heading"
          className="cc-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[hsl(var(--navy))]"
        >
          Read before using {variant === 'table' ? 'this table' : 'this calculator'}
        </span>
      </div>
      <p className="mt-2 text-[0.88rem] leading-6.5 text-[hsl(var(--ink))]">{text}</p>
      <p className="mt-2 text-[0.88rem] leading-6.5 text-[hsl(var(--ink))]">{DISCLAIMERS.codeAuthority}</p>
      <p className="mt-2 text-[0.88rem] leading-6.5 text-[hsl(var(--ink))]" data-testid="calculator-liability">
        {DISCLAIMERS.risk} {DISCLAIMERS.liability}
      </p>
      <p className="mt-2.5 text-[0.8rem]">
        <Link href="/disclaimer" className="cc-link font-semibold">
          Full disclaimer and limits of use
        </Link>
      </p>
    </aside>
  );
}
