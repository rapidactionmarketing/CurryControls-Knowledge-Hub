import { Sparkles } from 'lucide-react';

/**
 * Answer-first block.
 *
 * Every content page leads with a direct, self-contained answer to its core
 * question, followed by scannable key points. This serves a reader skimming
 * for a fact and it is the passage an answer engine is most likely to quote.
 */
export function AnswerBlock({
  question,
  answer,
  keyPoints,
}: {
  question: string;
  answer: string;
  keyPoints: string[];
}) {
  return (
    <section className="cc-answer p-5 sm:p-6" data-testid="answer-block" aria-labelledby="quick-answer">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={14} className="text-[hsl(var(--accent-blue))]" aria-hidden="true" />
        <h2 id="quick-answer" className="cc-eyebrow">
          The short answer
        </h2>
      </div>
      <p className="sr-only">{question}</p>
      <p className="text-[1rem] leading-7 text-[hsl(var(--ink))]">{answer}</p>

      {keyPoints.length > 0 && (
        <>
          <h3 className="mt-5 text-[0.72rem] font-bold uppercase tracking-[0.11em] text-[hsl(var(--navy))]">
            Key points
          </h3>
          <ul className="mt-2 space-y-1.5">
            {keyPoints.map((point) => (
              <li key={point} className="flex gap-2.5 text-[0.9rem] leading-6 text-[hsl(var(--ink))]">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent-blue))]"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
