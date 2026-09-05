/**
 * Calculator model.
 *
 * Every calculator is data plus a pure `run` function, so the page template,
 * the search index, and the structured data all read from one definition.
 *
 * Two rules hold across all of them, because these pages carry physical
 * consequences:
 *
 *   1. Show the work. Results include the intermediate steps and the table
 *      value used, so a qualified person can check the arithmetic rather than
 *      trust it.
 *   2. Never issue a verdict. A calculator reports what the arithmetic gives
 *      and what the reader must confirm. It does not approve an installation.
 */

export type CalcCategory =
  | 'Electrical'
  | 'Control Panels'
  | 'Instrumentation'
  | 'PLC & Data'
  | 'Networking'
  | 'Water & Wastewater'
  | 'Conversions';

export const CALC_CATEGORIES: CalcCategory[] = [
  'Electrical',
  'Control Panels',
  'Instrumentation',
  'PLC & Data',
  'Networking',
  'Water & Wastewater',
  'Conversions',
];

export type FieldOption = { value: string; label: string };

export type CalcField =
  | {
      kind: 'number';
      key: string;
      label: string;
      unit?: string;
      default: number;
      min?: number;
      max?: number;
      step?: number;
      help?: string;
    }
  | {
      kind: 'select';
      key: string;
      label: string;
      options: FieldOption[];
      default: string;
      help?: string;
    }
  | {
      kind: 'text';
      key: string;
      label: string;
      default: string;
      placeholder?: string;
      help?: string;
    };

export type CalcValues = Record<string, string | number>;

export type OutputStatus = 'neutral' | 'ok' | 'caution' | 'over';

export type CalcOutput = {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  /** Renders larger. Use for the one number the reader came for. */
  emphasis?: boolean;
  status?: OutputStatus;
};

export type CalcRun = {
  outputs: CalcOutput[];
  /** The arithmetic, shown so it can be checked rather than trusted. */
  steps?: string[];
  /** Conditions the reader must resolve before relying on the result. */
  warnings?: string[];
  /** Set when the inputs cannot produce a meaningful result. */
  error?: string;
};

export type Calculator = {
  slug: string;
  title: string;
  category: CalcCategory;
  /** Meta description and card blurb. */
  summary: string;
  /** Answer-first block. What this calculates and what governs the answer. */
  answer: string;
  keywords?: string[];
  fields: CalcField[];
  run: (values: CalcValues) => CalcRun;
  formulas?: { expr: string; where?: string[] }[];
  /** Every assumption baked into the arithmetic. Stated, never hidden. */
  assumptions: string[];
  /** Codes and standards that actually govern the result. */
  standards?: string[];
  /** Knowledge-base paths. */
  related?: string[];
  relatedCalculators?: string[];
  faqs?: { q: string; a: string }[];
  notes?: string[];
};

/* ------------------------------------------------------------------ *
 * Formatting helpers
 * ------------------------------------------------------------------ */

export function num(value: unknown, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function str(value: unknown, fallback = ''): string {
  return value === undefined || value === null ? fallback : String(value);
}

/** Fixed decimals with thousands separators. */
export function fmt(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Significant-figure formatting for values that span many orders of magnitude. */
export function sig(value: number, digits = 4): string {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '0';
  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  const decimals = Math.max(0, Math.min(10, digits - 1 - magnitude));
  return fmt(value, decimals);
}

export function pct(value: number, decimals = 2): string {
  return `${fmt(value, decimals)}%`;
}
