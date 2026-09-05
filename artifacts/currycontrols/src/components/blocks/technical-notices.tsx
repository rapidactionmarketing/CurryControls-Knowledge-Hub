import { Link } from 'wouter';
import { AlertTriangle, BookOpen, Code2, Factory, Stethoscope, Table2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LEGAL } from '@/data/site-legal';

/**
 * The reusable technical notices. Each renders wording from the legal record
 * and links to the full Information & Calculator Disclaimer, so the notice a
 * reader sees beside a result, an example, or a table says exactly what the
 * disclaimer page says.
 */

function Notice({
  heading,
  paragraphs,
  icon: Icon,
  testid,
  className = '',
  compact = false,
}: {
  heading: string;
  paragraphs: readonly string[];
  icon: LucideIcon;
  testid: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <aside
      className={`cc-callout ${compact ? 'p-3.5' : 'p-4 sm:p-5'} ${className}`}
      data-kind="warning"
      role="note"
      aria-label={heading}
      data-testid={testid}
    >
      <div className="flex items-center gap-2">
        <Icon size={15} aria-hidden="true" className="shrink-0 text-[hsl(var(--navy))]" />
        <span className="cc-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[hsl(var(--navy))]">
          {heading}
        </span>
      </div>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className={`mt-2 ${compact ? 'text-[0.82rem] leading-6' : 'text-[0.88rem] leading-6.5'} text-[hsl(var(--ink))]`}>
          {paragraph}
        </p>
      ))}
      <p className="mt-2.5 text-[0.8rem]">
        <Link href={LEGAL.disclaimer.path} className="cc-link font-semibold">
          Full Information &amp; Calculator Disclaimer
        </Link>
      </p>
    </aside>
  );
}

/** Immediately adjacent to every calculator result. */
export function CalculatorResultDisclaimer({ className = '' }: { className?: string }) {
  return (
    <Notice
      heading={LEGAL.notices.calculatorResult.heading}
      paragraphs={LEGAL.notices.calculatorResult.paragraphs}
      icon={AlertTriangle}
      testid="calculator-result-disclaimer"
      className={className}
    />
  );
}

/** With every PLC, SCADA, HMI, RTU, networking, scripting, or software programming example. */
export function ProgrammingExampleDisclaimer({ className = '' }: { className?: string }) {
  return (
    <Notice
      heading={LEGAL.notices.programmingExample.heading}
      paragraphs={LEGAL.notices.programmingExample.paragraphs}
      icon={Code2}
      testid="programming-example-disclaimer"
      className={className}
      compact
    />
  );
}

/** On troubleshooting pages. */
export function TroubleshootingNotice({ className = '' }: { className?: string }) {
  return (
    <Notice
      heading={LEGAL.notices.troubleshooting.heading}
      paragraphs={LEGAL.notices.troubleshooting.paragraphs}
      icon={Stethoscope}
      testid="troubleshooting-notice"
      className={className}
      compact
    />
  );
}

/** On pages that reference codes or standards. */
export function CodeStandardNotice({ className = '' }: { className?: string }) {
  return (
    <Notice
      heading={LEGAL.notices.codeStandard.heading}
      paragraphs={LEGAL.notices.codeStandard.paragraphs}
      icon={BookOpen}
      testid="code-standard-notice"
      className={className}
      compact
    />
  );
}

/** On every reference table. */
export function ReferenceTableNotice({ className = '' }: { className?: string }) {
  return (
    <Notice
      heading={LEGAL.notices.referenceTable.heading}
      paragraphs={LEGAL.notices.referenceTable.paragraphs}
      icon={Table2}
      testid="reference-table-notice"
      className={className}
    />
  );
}

/** Wherever manufacturers, products, or organizations are named prominently. */
export function ManufacturerNotice({ className = '' }: { className?: string }) {
  return (
    <Notice
      heading={LEGAL.notices.manufacturer.heading}
      paragraphs={LEGAL.notices.manufacturer.paragraphs}
      icon={Factory}
      testid="manufacturer-notice"
      className={className}
      compact
    />
  );
}

/**
 * Detects a reference to a code or standard in page text, so the code and
 * standard notice appears wherever one is cited: NEC, NFPA, UL, ISA, IEC,
 * IEEE, NIST, CISA, EPA, AWWA, OSHA, and the like.
 */
export const STANDARDS_PATTERN =
  /\b(?:NEC|NFPA|UL(?:\s?\d{2,}|\s?(?:listed|listing|508A|698A))|ISA[-\s]?\d|ISA-\d|IEC[-\s]?\d|IEEE|NIST|CISA|EPA|AWWA|OSHA|ANSI|NEMA\s?\d)\b/;

export function referencesStandards(text: string): boolean {
  return STANDARDS_PATTERN.test(text);
}
