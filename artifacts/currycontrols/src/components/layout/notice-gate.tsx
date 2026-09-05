import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, FileText, ShieldCheck } from 'lucide-react';
import { DISCLAIMERS, OWNERSHIP_NOTICE, SITE_DISCLAIMER } from '@/data/site';

/**
 * First-visit notice, in two views inside one dialog.
 *
 * View 1 is the ownership notice. It cannot be accepted until the reader has
 * opened the information disclaimer (view 2), scrolled it to the end, and then
 * ticked the acknowledgement. The gate is deliberate: the disclaimer is the
 * part that matters, and a button on its own lets it go unread.
 *
 * Shown once per browser session. Escape never dismisses the notice; inside
 * the disclaimer view it returns to the notice without marking the disclaimer
 * read. Content that fits without scrolling counts as read on open, so a tall
 * screen is never asked to scroll something that has no scrollbar.
 */
export function NoticeGate() {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const [view, setView] = useState<'notice' | 'disclaimer'>('notice');
  const [disclaimerRead, setDisclaimerRead] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

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

  // Scroll lock, focus trap, and Escape handling.
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (view === 'disclaimer') {
          event.preventDefault();
          setView('notice');
        }
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  // Where focus lands as the views change.
  useEffect(() => {
    if (!visible) return;
    if (view === 'disclaimer') scrollRef.current?.focus();
    else (disclaimerRead ? checkboxRef.current : openRef.current)?.focus();
  }, [visible, view, disclaimerRead]);

  const checkScrolled = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) setDisclaimerRead(true);
  }, []);

  useEffect(() => {
    if (!visible || view !== 'disclaimer') return;
    checkScrolled();
    window.addEventListener('resize', checkScrolled);
    return () => window.removeEventListener('resize', checkScrolled);
  }, [visible, view, checkScrolled]);

  if (!visible) return null;

  const canAccept = disclaimerRead && acknowledged;

  const accept = () => {
    if (!canAccept) return;
    try {
      sessionStorage.setItem(OWNERSHIP_NOTICE.storageKey, 'true');
    } catch {
      // If storage is unavailable, allow entry rather than trapping the visitor.
    }
    setAccepted(true);
  };

  const titleId = 'ownership-notice-title';

  return (
    <div className="cc-notice-backdrop">
      <div
        ref={panelRef}
        className="cc-notice p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="notice-gate"
        data-view={view}
      >
        {view === 'notice' ? (
          <>
            <div className="mb-5 flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                <ShieldCheck size={19} aria-hidden="true" />
              </span>
              <div>
                <p className="cc-eyebrow text-white/70">Important information</p>
                <h2 id={titleId} className="cc-h2 mt-1 text-white">
                  {OWNERSHIP_NOTICE.title}
                </h2>
              </div>
            </div>

            <p className="text-[0.95rem] leading-7 text-white" data-testid="notice-intro">
              {OWNERSHIP_NOTICE.intro}
            </p>

            <div id="ownership-notice-body" className="mt-4 space-y-3.5">
              {OWNERSHIP_NOTICE.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[0.925rem] leading-7 text-white/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-5 rounded border border-white/20 bg-white/5 p-4" data-testid="notice-risk">
              <p className="text-[0.875rem] leading-6 text-white/90">{DISCLAIMERS.risk}</p>
              <button
                ref={openRef}
                type="button"
                onClick={() => setView('disclaimer')}
                className="mt-3 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-white"
                data-testid="button-open-disclaimer"
              >
                <FileText size={15} aria-hidden="true" />
                <span className="underline underline-offset-2">{OWNERSHIP_NOTICE.disclaimerLinkLabel}</span>
                {disclaimerRead && (
                  <span className="inline-flex items-center gap-1 text-[0.78rem] font-normal text-white/70">
                    <Check size={13} aria-hidden="true" />
                    read
                  </span>
                )}
              </button>
            </div>

            <label
              className={`mt-5 flex items-start gap-3 ${disclaimerRead ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              data-testid="notice-acknowledge"
            >
              <input
                ref={checkboxRef}
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-white"
                checked={acknowledged}
                disabled={!disclaimerRead}
                onChange={(event) => setAcknowledged(event.target.checked)}
                aria-describedby="acknowledge-help"
                data-testid="checkbox-acknowledge"
              />
              <span className="text-[0.875rem] leading-6 text-white">{OWNERSHIP_NOTICE.acknowledgeLabel}</span>
            </label>
            <p
              id="acknowledge-help"
              className="mt-1.5 pl-7 text-[0.78rem] leading-5 text-white/65"
              data-testid="acknowledge-help"
              aria-live="polite"
            >
              {disclaimerRead
                ? 'Tick the box, then continue.'
                : 'Open the information disclaimer and read it to the end to enable this.'}
            </p>

            <div className="mt-5 border-t border-white/20 pt-5">
              <p className="text-[0.78rem] leading-5 text-white/65">{OWNERSHIP_NOTICE.footnote}</p>
              <button
                type="button"
                onClick={accept}
                disabled={!canAccept}
                className="cc-btn mt-4 w-full bg-white text-[hsl(var(--navy))] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                data-testid="button-accept-notice"
              >
                <Check size={16} aria-hidden="true" />
                {OWNERSHIP_NOTICE.buttonLabel}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                <FileText size={19} aria-hidden="true" />
              </span>
              <div>
                <p className="cc-eyebrow text-white/70">Information disclaimer</p>
                <h2 id={titleId} className="cc-h2 mt-1 text-white">
                  {SITE_DISCLAIMER.title}
                </h2>
              </div>
            </div>

            <div
              ref={scrollRef}
              tabIndex={0}
              onScroll={checkScrolled}
              className="cc-notice-scroll"
              aria-describedby="disclaimer-scroll-status"
              data-testid="disclaimer-scroll"
            >
              {SITE_DISCLAIMER.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              <h3>Calculators</h3>
              <p>{DISCLAIMERS.calculator}</p>
              <h3>Reference tables</h3>
              <p>{DISCLAIMERS.tables}</p>
              <h3>Code compliance</h3>
              <p>{DISCLAIMERS.codeAuthority}</p>
              <h3>Safety</h3>
              <p>{DISCLAIMERS.safety}</p>
              <h3>Manufacturers and standards</h3>
              <p>{DISCLAIMERS.endorsement}</p>
              <h3>Ownership</h3>
              <p>{DISCLAIMERS.independence}</p>
              <p data-testid="disclaimer-end">End of disclaimer.</p>
            </div>

            <p
              id="disclaimer-scroll-status"
              className="mt-3 text-[0.8rem] leading-5 text-white/70"
              aria-live="polite"
              data-testid="disclaimer-status"
            >
              {disclaimerRead ? 'You have reached the end.' : 'Scroll to the end to continue.'}
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setView('notice')}
                className="cc-btn w-full border border-white/30 text-white sm:w-auto"
                data-testid="button-disclaimer-back"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                disabled={!disclaimerRead}
                onClick={() => setView('notice')}
                className="cc-btn w-full bg-white text-[hsl(var(--navy))] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                data-testid="button-disclaimer-done"
              >
                <Check size={15} aria-hidden="true" />
                I have read this
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
