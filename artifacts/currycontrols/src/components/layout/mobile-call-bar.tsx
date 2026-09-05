import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { MessageSquare, Phone, X } from 'lucide-react';
import { CONTACT } from '@/data/site';

const DISMISS_KEY = 'curryCallBarDismissed';

/**
 * Persistent mobile call action.
 *
 * Deliberately restrained: a single row at the bottom of the viewport, sized
 * so it does not obscure content, and dismissible for the session. Page
 * content reserves space for it so nothing is hidden behind it.
 */
export function MobileCallBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === 'true');
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // Dismissal simply does not persist if storage is unavailable.
    }
  };

  return (
    <div className="cc-call-bar cc-mobile-only cc-no-print" data-testid="mobile-call-bar">
      <div className="flex items-stretch gap-px">
        <a
          href={CONTACT.phoneHref}
          data-phone-placement="mobile-sticky-bar"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-white"
          data-testid="link-phone-sticky"
          aria-label={`Call Eric Sullivan at ${CONTACT.phoneDisplay}`}
        >
          <Phone size={16} aria-hidden="true" />
          <span className="text-[0.82rem] font-semibold uppercase tracking-wide">Call Eric</span>
          <span className="cc-mono text-[0.86rem] font-bold">{CONTACT.phoneDisplay}</span>
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-1.5 border-l border-white/15 px-4 text-white/85"
          aria-label="Contact Eric Sullivan"
        >
          <MessageSquare size={15} aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="flex items-center justify-center border-l border-white/15 px-3 text-white/60"
          aria-label="Dismiss the call bar"
          data-testid="button-dismiss-call-bar"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
