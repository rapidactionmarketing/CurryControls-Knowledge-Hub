import { Link } from 'wouter';
import { Phone, SearchX } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { NAV_SECTIONS } from '@/data/navigation';
import { CONTACT } from '@/data/site';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist on CurryControls.com. Browse the knowledge base or search for the topic you need."
        path="/404"
        noindex
      />

      <div className="cc-container py-20">
        <div className="max-w-2xl">
          <span className="grid size-12 place-items-center rounded bg-[hsl(var(--surface))] text-[hsl(var(--ink-2))]">
            <SearchX size={24} aria-hidden="true" />
          </span>
          <p className="cc-eyebrow mt-5">404</p>
          <h1 className="cc-h1 mt-1.5">That page does not exist</h1>
          <p className="cc-lead mt-3">
            The link may be out of date, or the topic may not have been published yet. Start from a
            section below, use the search, or ask directly.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/" className="cc-btn cc-btn-primary">
              Go to the home page
            </Link>
            <Link href="/search" className="cc-btn cc-btn-outline">
              Search the knowledge base
            </Link>
            <a href={CONTACT.phoneHref} data-phone-placement="not-found" className="cc-btn cc-btn-outline">
              <Phone size={14} aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <h2 className="cc-h2 mt-12">Browse by section</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {NAV_SECTIONS.map((section) => (
              <li key={section.slug}>
                <Link href={`/${section.slug}`} className="cc-card block p-3.5">
                  <span className="font-semibold text-[hsl(var(--navy))]">{section.title}</span>
                  <span className="mt-0.5 block line-clamp-2 text-[0.82rem] leading-5 text-[hsl(var(--ink-2))]">
                    {section.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
