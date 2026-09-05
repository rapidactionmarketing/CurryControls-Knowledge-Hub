import { Link } from 'wouter';
import { MessageSquare, Phone } from 'lucide-react';
import { CONTACT } from '@/data/site';

/**
 * Contact call to action.
 *
 * Used sparingly. The technical content is the purpose of this site, so this
 * appears at the end of long pages and on the section indexes, not repeatedly
 * inside articles.
 */
export function ContactCta({ variant = 'full' }: { variant?: 'full' | 'inline' }) {
  if (variant === 'inline') {
    return (
      <div
        className="cc-card flex flex-wrap items-center justify-between gap-4 p-4"
        data-testid="contact-cta-inline"
      >
        <p className="text-[0.9rem] text-[hsl(var(--ink-2))]">
          Have a controls question? Contact {CONTACT.person} directly.
        </p>
        <a href={CONTACT.phoneHref} className="cc-btn cc-btn-outline" data-testid="link-phone-cta-inline">
          <Phone size={14} aria-hidden="true" />
          {CONTACT.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <section
      className="cc-card border-[hsl(var(--rule))] bg-[hsl(var(--surface))] p-6 sm:p-8"
      data-testid="contact-cta"
      aria-labelledby="contact-cta-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-lg">
          <p className="cc-eyebrow">Direct contact</p>
          <h2 id="contact-cta-heading" className="cc-h2 mt-1.5">
            Have a controls question?
          </h2>
          <p className="mt-2.5 text-[0.94rem] leading-6.5 text-[hsl(var(--ink-2))]">
            Reach {CONTACT.person} directly about anything on this site, a controls or automation
            topic, or one of his personal projects.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a href={CONTACT.phoneHref} className="cc-btn cc-btn-primary" data-testid="link-phone-cta">
            <Phone size={15} aria-hidden="true" />
            <span>
              Call Eric · <span className="cc-mono font-bold">{CONTACT.phoneDisplay}</span>
            </span>
          </a>
          <Link href="/contact" className="cc-btn cc-btn-outline" data-testid="link-contact-cta">
            <MessageSquare size={15} aria-hidden="true" />
            Contact Eric
          </Link>
        </div>
      </div>
    </section>
  );
}
