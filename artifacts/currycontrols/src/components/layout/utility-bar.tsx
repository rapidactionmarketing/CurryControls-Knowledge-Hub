import { Link } from 'wouter';
import { Phone } from 'lucide-react';
import { CONTACT } from '@/data/site';
import { SitesMenu } from './sites-menu';

/**
 * Permanent contact bar above the primary header.
 *
 * The phone number is Eric Sullivan's direct contact for CurryControls.com.
 * It is deliberately NOT presented as a Curry Controls Company, Revere
 * Control Systems, Inc., or General Control Systems, Inc. number; see
 * AFFILIATION in the site data.
 */
export function UtilityBar() {
  return (
    <div className="cc-utility cc-no-print" data-testid="utility-bar">
      <div className="cc-container flex h-11 items-center justify-between gap-4">
        {/* The site identity lives in the primary header directly below; repeating it
            here read as a double header. The bar carries the sites menu and contact. */}
        <div className="hidden items-center gap-3 md:flex">
          <SitesMenu />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:ml-auto sm:flex-none sm:justify-end">
          <span className="hidden text-[0.78rem] text-white/70 lg:inline">
            Need controls help?
          </span>
          <span className="hidden text-white/25 lg:inline">|</span>
          <span className="hidden text-[0.78rem] font-semibold text-white/90 sm:inline">
            {CONTACT.person}
          </span>

          <a
            href={CONTACT.phoneHref}
            data-phone-placement="utility-bar"
            className="group flex items-center gap-2 rounded px-1 py-1"
            data-testid="link-phone-utility"
            aria-label={`Call Eric Sullivan at ${CONTACT.phoneDisplay}`}
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/12 ring-1 ring-white/25">
              <Phone size={12} aria-hidden="true" />
            </span>
            <span className="sm:hidden text-[0.72rem] font-semibold uppercase tracking-wide text-white/75">
              Call Eric:
            </span>
            <span className="cc-phone">{CONTACT.phoneDisplay}</span>
          </a>

          <Link
            href="/contact"
            className="hidden rounded border border-white/25 px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-wider text-white/90 hover:border-white/60 hover:text-white md:inline-block"
            data-testid="link-contact-utility"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
