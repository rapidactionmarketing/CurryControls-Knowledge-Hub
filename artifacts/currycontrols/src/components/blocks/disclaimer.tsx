import { DISCLAIMERS } from '@/data/site';

type Kind = keyof typeof DISCLAIMERS;

/** Reusable disclaimer text, kept in one place so the wording never drifts. */
export function Disclaimer({ kind, className = '' }: { kind: Kind; className?: string }) {
  return (
    <p
      className={`text-[0.78rem] leading-5 text-[hsl(var(--ink-2))] ${className}`}
      data-testid={`disclaimer-${kind}`}
    >
      {DISCLAIMERS[kind]}
    </p>
  );
}

/** Boxed variant for the foot of an article. */
export function DisclaimerBox({ kinds }: { kinds: Kind[] }) {
  return (
    <aside className="mt-10 space-y-2 rounded border border-[hsl(var(--rule))] bg-[hsl(var(--surface))] p-4">
      {kinds.map((kind) => (
        <Disclaimer key={kind} kind={kind} />
      ))}
    </aside>
  );
}
