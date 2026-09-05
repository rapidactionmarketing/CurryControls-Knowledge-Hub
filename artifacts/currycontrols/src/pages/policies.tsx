import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Check, Phone } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { ContactCta } from '@/components/blocks/contact-cta';
import { CONTACT, DISCLAIMERS, SITE } from '@/data/site';
import { analyticsStatus, hasOptedOut, setOptOut } from '@/lib/analytics';
import { breadcrumbSchema, graph, personSchema, websiteSchema } from '@/lib/structured-data';

/** Shared layout for the policy pages, which are prose with a stated review date. */
function PolicyPage({
  title,
  description,
  path,
  updated,
  intro,
  children,
}: {
  title: string;
  description: string;
  path: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  const trail = [{ name: title, path }];
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={graph(websiteSchema(), personSchema(), breadcrumbSchema(trail))}
      />
      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">{title}</h1>
          <p className="cc-lead mt-3 max-w-3xl">{intro}</p>
          <p className="cc-mono mt-4 text-[0.72rem] uppercase tracking-wider text-[hsl(var(--ink-2))]">
            Last updated {updated}
          </p>
        </div>
      </header>
      <div className="cc-container py-10">
        <div className="cc-prose max-w-2xl space-y-4">{children}</div>
        <div className="mt-12 max-w-2xl">
          <ContactCta variant="inline" />
        </div>
      </div>
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="cc-h2 !mt-9">{children}</h2>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[0.95rem] leading-7">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent-blue))]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ *
 * Privacy
 * ------------------------------------------------------------------ */

export function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy"
      description="What CurryControls.com collects, what it does not, and how to switch site analytics off. First-party and cookieless, with no advertising and no third-party trackers."
      path="/privacy"
      updated="September 2026"
      intro="This site runs its own analytics, uses no advertising, and sets no tracking cookies. This page says exactly what is collected and how to turn it off."
    >
      <p>
        {SITE.name} is operated by {CONTACT.person}. The short version: the site counts pages and
        clicks so it can be improved, it does so with its own software rather than a third-party
        service, and nothing it records can identify you.
      </p>

      <H2>What is collected</H2>
      <p>
        When you use the site, the browser sends a small batch of events to this site's own server.
        Each event may contain:
      </p>
      <Bullets
        items={[
          'The path of the page you are on, and its title.',
          'The origin of the site that referred you, if any. The path and query string of that referring URL are removed in your browser and never sent.',
          'A coarse viewport bucket: mobile, tablet, or desktop.',
          'Which contact link was used, when one is clicked, so it is possible to tell which placements are useful.',
          'Search text typed into the site search, and how many results it returned.',
          'The host of an external link when one is followed.',
          'Page performance measurements: how quickly the main content rendered, how much the layout shifted, and how responsive the page was.',
        ]}
      />

      <H2>What is not collected</H2>
      <Bullets
        items={[
          'No name, email address, or any other personal detail, unless you type one into the contact form yourself.',
          'No IP address. The server does not record one, and there is no log of visitor addresses in the analytics store.',
          'No cookies of any kind, and no advertising or cross-site identifier.',
          'No profile that persists between visits. The session identifier is a random value your browser discards when the tab closes, so a return visit is indistinguishable from a first visit.',
          'No third-party analytics, advertising, tag manager, or social tracking script. Nothing on this site reports to another company.',
        ]}
      />

      <H2>Your privacy signals are honored</H2>
      <p>
        If your browser sends the Do Not Track header or the Global Privacy Control signal, analytics
        is switched off entirely before anything is collected. You can also opt out here, which is
        stored as a single preference in your browser and nothing else.
      </p>
      <OptOutControl />

      <H2>What else the site stores in your browser</H2>
      <Bullets
        items={[
          'A flag recording that you have seen the ownership notice, so it is shown once per session.',
          'A flag if you dismiss the mobile call bar, so it stays dismissed for that session.',
          'Your analytics opt-out preference, if you set one.',
        ]}
      />
      <p>
        These are stored by your browser and are never transmitted. Clearing site data removes them.
      </p>

      <H2>The contact form</H2>
      <p>
        The contact form does not send anything to this website. It composes a message in your own
        email application, which you then choose to send or discard. Nothing you type into it is
        transmitted to or stored by this site.
      </p>

      <H2>Third-party requests</H2>
      <p>
        The site loads a web font from Google Fonts, which means your browser makes a request to
        Google's servers to fetch it. That is the only third-party request the site makes. If the
        font is unavailable the site falls back to fonts already on your device and looks slightly
        different but works identically.
      </p>

      <H2>How long data is kept</H2>
      <p>
        Analytics events are retained for up to roughly thirteen months and then deleted. Because
        nothing is identifying, there is no personal record to request or erase, but if you have a
        question about any of this, call or write.
      </p>

      <H2>Changes</H2>
      <p>
        If what is collected changes, this page changes with it and the date at the top is updated.
      </p>
    </PolicyPage>
  );
}

/** Opt-out toggle, reflecting the browser's own privacy signals. */
function OptOutControl() {
  const [status, setStatus] = useState<'on' | 'opted-out' | 'privacy-signal'>('on');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStatus(analyticsStatus());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (status === 'privacy-signal') {
    return (
      <div className="cc-card !mt-5 flex items-start gap-3 p-4" data-testid="analytics-opt-out">
        <Check size={17} className="mt-0.5 shrink-0 text-[hsl(var(--teal))]" aria-hidden="true" />
        <p className="text-[0.9rem] leading-6 text-[hsl(var(--ink-2))]">
          Your browser is sending a Do Not Track or Global Privacy Control signal, so analytics is
          already switched off for you. No preference is needed.
        </p>
      </div>
    );
  }

  const optedOut = status === 'opted-out';

  return (
    <div className="cc-card !mt-5 flex flex-wrap items-center justify-between gap-4 p-4" data-testid="analytics-opt-out">
      <p className="text-[0.9rem] leading-6 text-[hsl(var(--ink-2))]">
        {optedOut
          ? 'Analytics is switched off in this browser.'
          : 'Analytics is on. Nothing collected can identify you.'}
      </p>
      <button
        type="button"
        className="cc-btn cc-btn-outline"
        data-testid="button-toggle-analytics"
        onClick={() => {
          const next = !hasOptedOut();
          setOptOut(next);
          setStatus(next ? 'opted-out' : 'on');
        }}
      >
        {optedOut ? 'Turn analytics back on' : 'Opt out of analytics'}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Terms
 * ------------------------------------------------------------------ */

export function TermsPage() {
  return (
    <PolicyPage
      title="Terms of use"
      description="The terms under which CurryControls.com is provided: general technical reference information, offered without warranty, and not engineering advice for a specific installation."
      path="/terms"
      updated="September 2026"
      intro="Plain terms for a technical reference site. Read the engineering limitation carefully; it is the one that matters."
    >
      <H2>What this site is</H2>
      <p>
        {SITE.name} publishes general technical reference information about control systems,
        automation, instrumentation, and water and wastewater systems. It is independently owned and
        maintained by {CONTACT.person}. It does not sell engineering services, and it is not the
        website of a systems integration company.
      </p>

      <H2>This is not engineering advice</H2>
      <p>{DISCLAIMERS.engineering}</p>
      <p>
        Nothing here creates an engineering relationship, and nothing here should be relied on as the
        sole basis for a design, a modification, or a decision about equipment you are responsible
        for. The applicable codes, standards, and manufacturer documentation govern, and a qualified
        person familiar with the specific installation has to make the call.
      </p>

      <H2>Safety</H2>
      <p>{DISCLAIMERS.safety}</p>

      <H2>No warranty</H2>
      <p>
        The content is provided as it is, without warranty of any kind. Reasonable care goes into
        accuracy, and mistakes still happen. If you find one, say so and it will be corrected.
      </p>

      <H2>Trademarks and references</H2>
      <p>{DISCLAIMERS.endorsement}</p>
      <p>
        Product, company, and standard names belong to their respective owners and are used here for
        identification only.
      </p>

      <H2>External links</H2>
      <p>
        Links to other sites are provided for convenience. This site does not control them and is not
        responsible for their content.
      </p>

      <H2>Ownership and affiliation</H2>
      <p>{DISCLAIMERS.independence}</p>
      <p>
        {CONTACT.person} previously worked with Curry Controls Company and left the company in 2021.
        He is currently employed by General Control Systems, Inc. General Control Systems, Inc. is a
        separate company and is not affiliated with Curry Controls Company. Nothing on this site
        should be read as a claim of corporate succession.
      </p>

      <H2>Personal projects</H2>
      <p>
        The software projects listed on this site are personal projects of {CONTACT.person}. They are
        not products of any employer, and no project should be understood to be available unless its
        stated status says so.
      </p>

      <H2>Changes</H2>
      <p>These terms may change. The date at the top of this page reflects the last revision.</p>
    </PolicyPage>
  );
}

/* ------------------------------------------------------------------ *
 * Accessibility
 * ------------------------------------------------------------------ */

export function AccessibilityPage() {
  return (
    <PolicyPage
      title="Accessibility"
      description="How CurryControls.com is built for accessibility, what it currently does, its known limitations, and how to report a barrier."
      path="/accessibility"
      updated="September 2026"
      intro="This site aims to meet WCAG 2.2 level AA. Here is what that means in practice, what is not there yet, and how to tell us about a problem."
    >
      <H2>What the site does</H2>
      <Bullets
        items={[
          'Semantic HTML throughout: real headings in order, real lists, real tables with header cells, and landmarks for the header, navigation, main content, and footer.',
          'Every interactive element is reachable and operable by keyboard, including the multi-level menus, the search dialog, and the mobile navigation drawer.',
          'A visible focus outline on every focusable element, and a skip link to the main content as the first item in the tab order.',
          'The mega menu and the mobile accordion expose their state with aria-expanded and aria-controls, and Escape closes them.',
          'Dialogs trap focus while open, are labelled, and return focus when dismissed.',
          'Text and interface colours meet the WCAG AA contrast ratios against their backgrounds.',
          'Meaning is never carried by colour alone. Status is paired with an icon and a text label.',
          'Wide content such as tables and code blocks scrolls inside its own container, so the page itself never scrolls sideways.',
          'Animation is reduced to almost nothing when the operating system requests reduced motion.',
          'Text reflows and stays readable when zoomed, and the layout works down to a 320 pixel viewport.',
        ]}
      />

      <H2>Known limitations</H2>
      <Bullets
        items={[
          'The site has not yet been through a formal third-party accessibility audit. The statements above are based on its own testing.',
          'Some technical content depends on tables and code blocks. These are marked up correctly and scroll horizontally, but dense tabular data is inherently harder to consume with a screen reader.',
          'Diagrams and illustrations are being added over time; each will need a text description, and that work is ongoing rather than complete.',
        ]}
      />

      <H2>Telling us about a barrier</H2>
      <p>
        If something on this site is difficult or impossible to use, that is a defect worth fixing.
        Call {CONTACT.person} at {CONTACT.phoneDisplay}, or use the{' '}
        <Link href="/contact" className="cc-link">
          contact page
        </Link>
        . Describe the page and what happened, and it will be looked at.
      </p>
      <p className="!mt-6">
        <a href={CONTACT.phoneHref} data-phone-placement="accessibility" className="cc-btn cc-btn-outline">
          <Phone size={14} aria-hidden="true" />
          {CONTACT.phoneDisplay}
        </a>
      </p>
    </PolicyPage>
  );
}

/* ------------------------------------------------------------------ *
 * Editorial standards
 * ------------------------------------------------------------------ */

export function EditorialStandardsPage() {
  return (
    <PolicyPage
      title="Editorial standards"
      description="How content on CurryControls.com is written, sourced, reviewed, dated, and corrected, and what the site will not publish."
      path="/editorial-standards"
      updated="September 2026"
      intro="The standards this site holds its technical content to, so you can judge how much weight to give it."
    >
      <H2>Who is responsible</H2>
      <p>
        {CONTACT.person} owns {SITE.name} and is responsible for what it publishes. He has spent his
        career working in electrical systems, industrial controls, automation, project management,
        PLC and SCADA systems, instrumentation, and water and wastewater control applications.
        Questions about any page go to him directly at {CONTACT.phoneDisplay}.
      </p>

      <H2>How pages are written</H2>
      <Bullets
        items={[
          'Every page leads with a direct answer to the question it exists to answer, then the key points, then the detail. A reader looking up one fact should not have to read an essay to find it.',
          'Procedures are written to be worked through with the equipment in front of you, including what to verify before you leave the site.',
          'Troubleshooting is organised by observable symptom rather than by manufacturer or product, because that is how a fault presents in the field.',
          'Where a standard governs, it is named, so you can go and read the standard rather than take a summary on trust.',
          'Safety-relevant procedures carry an explicit safety notice. General reference pages carry the engineering limitation.',
        ]}
      />

      <H2>What this site will not publish</H2>
      <Bullets
        items={[
          'Filler. A topic with no written reference says plainly that it has not been written yet, rather than being padded out to look complete.',
          'Invented specifics. Where a value depends on the equipment, the page says to check the datasheet instead of inventing a number.',
          'Fabricated testimonials, case studies, or credentials.',
          'Claims of sponsorship, endorsement, or affiliation that do not exist. Manufacturer and platform names are used for identification only.',
          'Content written to rank rather than to be useful.',
        ]}
      />

      <H2>Dates and revisions</H2>
      <p>
        Every written page shows when it was first published and when it was last updated, and both
        dates are real. Reference material goes stale, standards are revised, and platforms change,
        so a page with an old update date should be treated with more caution than a recent one.
      </p>

      <H2>Corrections</H2>
      <p>
        If a page is wrong, it gets corrected rather than quietly removed, and the update date
        changes. Corrections that alter the substance of a recommendation are noted on the page.
        Reporting an error is genuinely welcome: call {CONTACT.phoneDisplay} or use the{' '}
        <Link href="/contact" className="cc-link">
          contact page
        </Link>
        .
      </p>

      <H2>Independence</H2>
      <p>
        Nothing on this site is paid placement. There is no advertising, no sponsored content, and no
        affiliate arrangement. The personal projects section is clearly labelled as such on every
        page it appears, and it is kept below the technical content deliberately.
      </p>
      <p>{DISCLAIMERS.endorsement}</p>
    </PolicyPage>
  );
}
