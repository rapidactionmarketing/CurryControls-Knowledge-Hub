import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, FileText, ShieldCheck } from 'lucide-react';
import { LegalSectionView } from '@/components/blocks/legal-blocks';
import { INFORMATION_DISCLAIMER, NOTICE_POPUP } from '@/data/site-legal';

/**
 * First-visit notice: the ownership, registration, and non-affiliation
 * statement followed by the technical information notice, shown as a white
 * card over a dark navy overlay before the site is used.
 *
 * Every word comes from the legal record. The notice is informational: the
 * visitor reads it and acknowledges it with one button. A second view inside
 * the same dialog shows the full Information & Calculator Disclaimer, so it
 * can be read without leaving the notice.
 *
 * Shown once per browser session (sessionStorage). Escape never dismisses the
 * notice; inside the disclaimer view it returns to the notice. Focus stays
 * inside the dialog while it is open.
 */
export function NoticeGate() {
  const [ready, setReady] = useState(false);
  const [acknowledged, setAcknowledged] = useState(true);
  const [view, setView] = useState<'notice' | 'disclaimer'>('notice');

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NOTICE_POPUP.storageKey) === 'true';
    } catch {
      seen = false;
    }
    setAcknowledged(seen);
    setReady(true);
  }, []);

  const visible = ready && !acknowledged;

  // Scroll lock, focus trap, and Escape handling.
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Escape never bypasses the notice. Inside the disclaimer it goes back.
        event.preventDefault();
        if (view === 'disclaimer') setView('notice');
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ];
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
  }, [visible, view]);

  // Where focus lands as the views change. The notice view focuses the dialog
  // itself, at the top, so the heading is the first thing seen and read; the
  // button is one Tab away. The disclaimer view focuses its scroll region.
  useEffect(() => {
    if (!visible) return;
    if (view === 'disclaimer') {
      scrollRef.current?.focus({ preventScroll: true });
      return;
    }
    const panel = panelRef.current;
    if (panel) {
      panel.scrollTop = 0;
      panel.focus({ preventScroll: true });
    }
  }, [visible, view]);

  if (!visible) return null;

  const acknowledge = () => {
    try {
      sessionStorage.setItem(NOTICE_POPUP.storageKey, 'true');
    } catch {
      // If storage is unavailable, allow entry rather than trapping the visitor.
    }
    setAcknowledged(true);
  };

  const titleId = 'ownership-notice-title';

  return (
    <div className="cc-notice-backdrop">
      <div
        ref={panelRef}
        className="cc-notice p-6 sm:p-8 outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-testid="notice-gate"
        data-view={view}
      >
        {view === 'notice' ? (
          <>
            <div className="mb-5 flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--surface))] text-[hsl(var(--navy))] ring-1 ring-[hsl(var(--rule))]">
                <ShieldCheck size={19} aria-hidden="true" />
              </span>
              <div>
                <p className="cc-eyebrow">Please read before continuing</p>
                <h2 id={titleId} className="cc-h2 mt-1 text-[hsl(var(--navy))]">
                  {NOTICE_POPUP.heading}
                </h2>
              </div>
            </div>

            <div id="ownership-notice-body" className="space-y-3" data-testid="notice-body">
              {NOTICE_POPUP.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[0.92rem] leading-7 text-[hsl(var(--ink))]">
                  {paragraph}
                </p>
              ))}
            </div>

            <section
              className="mt-6 rounded border border-[hsl(var(--rule))] bg-[hsl(var(--surface))] p-4 sm:p-5"
              aria-labelledby="technical-notice-heading"
              data-testid="notice-technical"
            >
              <h3
                id="technical-notice-heading"
                className="cc-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[hsl(var(--navy))]"
              >
                {NOTICE_POPUP.technicalNotice.heading}
              </h3>
              {NOTICE_POPUP.technicalNotice.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-[0.875rem] leading-6.5 text-[hsl(var(--ink))]">
                  {paragraph}
                </p>
              ))}
              <button
                type="button"
                onClick={() => setView('disclaimer')}
                className="cc-btn cc-btn-outline mt-4"
                data-testid="button-open-disclaimer"
              >
                <FileText size={15} aria-hidden="true" />
                {NOTICE_POPUP.disclaimerLinkLabel}
              </button>
            </section>

            <div className="mt-5 flex flex-col gap-4 border-t border-[hsl(var(--rule))] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.78rem] leading-5 text-[hsl(var(--ink-2))]">{NOTICE_POPUP.footnote}</p>
              <button
                type="button"
                onClick={acknowledge}
                className="cc-btn cc-btn-primary w-full sm:w-auto"
                data-testid="button-accept-notice"
              >
                <Check size={16} aria-hidden="true" />
                {NOTICE_POPUP.buttonLabel}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--surface))] text-[hsl(var(--navy))] ring-1 ring-[hsl(var(--rule))]">
                <FileText size={19} aria-hidden="true" />
              </span>
              <div>
                <p className="cc-eyebrow">Full disclaimer</p>
                <h2 id={titleId} className="cc-h2 mt-1 text-[hsl(var(--navy))]">
                  {INFORMATION_DISCLAIMER.title}
                </h2>
              </div>
            </div>

            <div
              ref={scrollRef}
              tabIndex={0}
              className="cc-notice-scroll"
              aria-label={INFORMATION_DISCLAIMER.title}
              data-testid="disclaimer-scroll"
            >
              {INFORMATION_DISCLAIMER.sections.map((section) => (
                <LegalSectionView key={section.id} section={section} level={3} />
              ))}
              <p className="mt-4 text-[0.8rem] text-[hsl(var(--ink-2))]">
                This disclaimer is also published at {INFORMATION_DISCLAIMER.path} and is linked from every page.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setView('notice')}
                className="cc-btn cc-btn-outline w-full sm:w-auto"
                data-testid="button-disclaimer-back"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Back to the notice
              </button>
              <button
                type="button"
                onClick={acknowledge}
                className="cc-btn cc-btn-primary w-full sm:w-auto"
                data-testid="button-accept-notice-from-disclaimer"
              >
                <Check size={16} aria-hidden="true" />
                {NOTICE_POPUP.buttonLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
