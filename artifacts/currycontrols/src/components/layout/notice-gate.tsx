import { useEffect, useRef, useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { OWNERSHIP_NOTICE } from '@/data/site';

/**
 * Ownership and affiliation notice.
 *
 * Informational only — not an agreement, and deliberately not worded as one.
 * Shown once per browser session. Escape does not dismiss it; the button
 * must be used, and the button is keyboard reachable.
 */
export function NoticeGate() {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(OWNERSHIP_NOTICE.storageKey) === 'true';
    } catch {
      seen = false;
    }
    setAccepted(seen);
    setReady(true);
  }, []);

  const visible = ready && !accepted;

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    buttonRef.current?.focus();

    // Keep focus inside the notice. Escape intentionally does nothing.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('button, a[href]');
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [visible]);

  if (!visible) return null;

  const accept = () => {
    try {
      sessionStorage.setItem(OWNERSHIP_NOTICE.storageKey, 'true');
    } catch {
      // If storage is unavailable, allow entry rather than trapping the visitor.
    }
    setAccepted(true);
  };

  return (
    <div className="cc-notice-backdrop">
      <div
        ref={panelRef}
        className="cc-notice p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ownership-notice-title"
        aria-describedby="ownership-notice-body"
        data-testid="notice-gate"
      >
        <div className="mb-5 flex items-start gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--surface))] text-[hsl(var(--accent-blue))]">
            <ShieldCheck size={19} aria-hidden="true" />
          </span>
          <div>
            <p className="cc-eyebrow">Important information</p>
            <h2 id="ownership-notice-title" className="cc-h2 mt-1">
              {OWNERSHIP_NOTICE.title}
            </h2>
          </div>
        </div>

        <div id="ownership-notice-body" className="space-y-3.5">
          {OWNERSHIP_NOTICE.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[0.925rem] leading-7 text-[hsl(var(--ink))]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 border-t border-[hsl(var(--rule))] pt-5">
          <p className="text-[0.78rem] leading-5 text-[hsl(var(--ink-2))]">
            {OWNERSHIP_NOTICE.footnote}
          </p>
          <button
            ref={buttonRef}
            type="button"
            onClick={accept}
            className="cc-btn cc-btn-primary mt-4 w-full sm:w-auto"
            data-testid="button-accept-notice"
          >
            <Check size={16} aria-hidden="true" />
            {OWNERSHIP_NOTICE.buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
