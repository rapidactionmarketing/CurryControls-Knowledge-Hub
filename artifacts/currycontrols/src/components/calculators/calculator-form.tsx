import { useMemo, useState } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import type { CalcOutput, CalcValues, Calculator } from '@/data/calculators';
import { defaultValues } from '@/data/calculators';

/**
 * Interactive calculator.
 *
 * Computes during render from a pure function, so the prerendered HTML already
 * contains a worked example with real numbers. That is better for a reader who
 * arrives with JavaScript disabled and better for a crawler than an empty form.
 *
 * Results always show the arithmetic. These pages carry physical consequences,
 * so the reader must be able to check the work rather than trust the output.
 */
export function CalculatorForm({ calculator }: { calculator: Calculator }) {
  const initial = useMemo(() => defaultValues(calculator), [calculator]);
  const [values, setValues] = useState<CalcValues>(initial);

  const result = useMemo(() => {
    try {
      return calculator.run(values);
    } catch (error) {
      return {
        outputs: [],
        error: `That combination of inputs could not be calculated. ${
          error instanceof Error ? error.message : ''
        }`.trim(),
      };
    }
  }, [calculator, values]);

  const set = (key: string, value: string | number) =>
    setValues((current) => ({ ...current, [key]: value }));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]" data-testid="calculator">
      {/* Inputs */}
      <form
        className="cc-card h-fit p-5"
        onSubmit={(event) => event.preventDefault()}
        aria-label={`${calculator.title} inputs`}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="cc-eyebrow">Inputs</h2>
          <button
            type="button"
            onClick={() => setValues(initial)}
            className="inline-flex items-center gap-1.5 text-[0.76rem] font-semibold text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]"
            data-testid="calculator-reset"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Reset
          </button>
        </div>

        <div className="space-y-3.5">
          {calculator.fields.map((field) => {
            const id = `calc-${calculator.slug}-${field.key}`;
            return (
              <div key={field.key}>
                <label
                  htmlFor={id}
                  className="mb-1 block text-[0.8rem] font-semibold text-[hsl(var(--navy))]"
                >
                  {field.label}
                  {'unit' in field && field.unit ? (
                    <span className="ml-1.5 font-normal text-[hsl(var(--ink-2))]">({field.unit})</span>
                  ) : null}
                </label>

                {field.kind === 'select' ? (
                  <select
                    id={id}
                    className="cc-input"
                    value={String(values[field.key] ?? field.default)}
                    onChange={(event) => set(field.key, event.target.value)}
                    data-testid={`input-${field.key}`}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.kind === 'text' ? (
                  <input
                    id={id}
                    type="text"
                    className="cc-input"
                    value={String(values[field.key] ?? field.default)}
                    placeholder={field.placeholder}
                    onChange={(event) => set(field.key, event.target.value)}
                    data-testid={`input-${field.key}`}
                  />
                ) : (
                  <input
                    id={id}
                    type="number"
                    inputMode="decimal"
                    className="cc-input"
                    value={String(values[field.key] ?? field.default)}
                    min={field.min}
                    max={field.max}
                    step={field.step ?? 'any'}
                    onChange={(event) =>
                      set(field.key, event.target.value === '' ? '' : Number(event.target.value))
                    }
                    data-testid={`input-${field.key}`}
                  />
                )}

                {'help' in field && field.help ? (
                  <p className="mt-1 text-[0.74rem] leading-4.5 text-[hsl(var(--ink-2))]">{field.help}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </form>

      {/* Results */}
      <div className="min-w-0">
        {result.error ? (
          <div className="cc-callout p-5" data-kind="warning" data-testid="calculator-error">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} aria-hidden="true" className="text-[hsl(var(--navy))]" />
              <span className="cc-eyebrow">Cannot calculate</span>
            </div>
            <p className="mt-2 text-[0.9rem] leading-6.5 text-[hsl(var(--ink))]">{result.error}</p>
          </div>
        ) : null}

        {result.outputs.length > 0 && (
          <section aria-label="Results" data-testid="calculator-results">
            <h2 className="cc-eyebrow mb-3">Results</h2>
            <dl className="grid gap-2.5 sm:grid-cols-2">
              {result.outputs.map((output, index) => (
                <ResultTile key={`${output.label}-${index}`} output={output} />
              ))}
            </dl>
          </section>
        )}

        {result.steps && result.steps.length > 0 && (
          <section className="mt-6" aria-labelledby="calc-steps-heading">
            <h2 id="calc-steps-heading" className="cc-eyebrow mb-2">
              The arithmetic
            </h2>
            <ol className="cc-card space-y-1.5 p-4">
              {result.steps.map((step, index) => (
                <li key={index} className="cc-mono text-[0.78rem] leading-5 text-[hsl(var(--ink))]">
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {result.warnings && result.warnings.length > 0 && (
          <section className="mt-6" aria-labelledby="calc-warnings-heading">
            <h2 id="calc-warnings-heading" className="cc-eyebrow mb-2">
              What this does not account for
            </h2>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li
                  key={index}
                  className="flex gap-2.5 text-[0.86rem] leading-6 text-[hsl(var(--ink-2))]"
                >
                  <AlertTriangle
                    size={13}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[hsl(32_80%_44%)]"
                  />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function ResultTile({ output }: { output: CalcOutput }) {
  const statusColor =
    output.status === 'over'
      ? 'hsl(var(--destructive))'
      : output.status === 'caution'
        ? 'hsl(32 80% 40%)'
        : output.status === 'ok'
          ? 'hsl(var(--teal))'
          : 'hsl(var(--navy))';

  return (
    <div
      className={`cc-card p-3.5 ${output.emphasis ? 'border-[hsl(var(--accent-blue))]/40' : ''} ${
        output.status === 'over' ? 'border-[hsl(var(--destructive))]/40' : ''
      }`}
    >
      <dt className="text-[0.76rem] leading-4.5 text-[hsl(var(--ink-2))]">{output.label}</dt>
      <dd
        className={`mt-0.5 font-semibold leading-tight ${output.emphasis ? 'text-[1.3rem]' : 'text-[1.05rem]'}`}
        style={{ color: statusColor }}
      >
        {output.value}
        {output.unit ? (
          <span className="ml-1 text-[0.8rem] font-normal text-[hsl(var(--ink-2))]">{output.unit}</span>
        ) : null}
      </dd>
      {output.note ? (
        <p className="mt-1 text-[0.74rem] leading-4.5 text-[hsl(var(--ink-2))]">{output.note}</p>
      ) : null}
    </div>
  );
}
