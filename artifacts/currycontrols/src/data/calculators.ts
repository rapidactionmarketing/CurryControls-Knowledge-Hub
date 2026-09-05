/**
 * Calculator index.
 *
 * Every calculator is a data definition plus a pure compute function, so the
 * page template, the search index, the sitemap, and the structured data all
 * read from one place.
 */

import { CALC_CATEGORIES, type CalcCategory, type Calculator } from './calc-types';
import { ELECTRICAL_CALCULATORS } from './calculators/electrical';
import { PANEL_CALCULATORS } from './calculators/panels';
import { INSTRUMENTATION_CALCULATORS } from './calculators/instrumentation';
import { DATA_CALCULATORS } from './calculators/data';
import { NETWORK_CALCULATORS } from './calculators/network';
import { PROCESS_CALCULATORS } from './calculators/process';

export type { Calculator, CalcCategory, CalcField, CalcValues, CalcRun, CalcOutput } from './calc-types';
export { CALC_CATEGORIES, num, str, fmt, sig, pct } from './calc-types';

export const CALCULATORS: Calculator[] = [
  ...ELECTRICAL_CALCULATORS,
  ...PANEL_CALCULATORS,
  ...INSTRUMENTATION_CALCULATORS,
  ...DATA_CALCULATORS,
  ...NETWORK_CALCULATORS,
  ...PROCESS_CALCULATORS,
];

export const CALCULATOR_BY_SLUG: Record<string, Calculator> = Object.fromEntries(
  CALCULATORS.map((calculator) => [calculator.slug, calculator]),
);

export function isCalculatorSlug(slug: string): boolean {
  return slug in CALCULATOR_BY_SLUG;
}

export function calculatorsByCategory(category: CalcCategory): Calculator[] {
  return CALCULATORS.filter((calculator) => calculator.category === category).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
}

/** Categories that actually contain calculators, in display order. */
export const POPULATED_CATEGORIES: CalcCategory[] = CALC_CATEGORIES.filter(
  (category) => CALCULATORS.some((calculator) => calculator.category === category),
);

export function calculatorPath(slug: string): string {
  return `/calculators/${slug}`;
}

/** Default values for a calculator, used to seed the form and the examples. */
export function defaultValues(calculator: Calculator): Record<string, string | number> {
  return Object.fromEntries(calculator.fields.map((field) => [field.key, field.default]));
}
