import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Check, Phone } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { ContactCta } from '@/components/blocks/contact-cta';
import { LegalBlocks, LegalSectionView } from '@/components/blocks/legal-blocks';
import { CONTACT, DISCLAIMERS, SITE } from '@/data/site';
import { ENTITY_LIST_AND, LEGAL } from '@/data/site-legal';
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

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="cc-h2 !mt-9">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
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

const UPDATED = 'September 2026';

/* ------------------------------------------------------------------ *
 * Privacy
 * ------------------------------------------------------------------ */

export function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy"
      description="What CurryControls.com collects, what it does not, and how to switch site analytics off. First-party and cookieless, with no advertising and no third-party trackers."
      path="/privacy"
      updated={UPDATED}
      intro="This site runs its own analytics, uses no advertising, and sets no tracking cookies. This page says exactly what is collected and how to turn it off."
    >
      <p data-testid="privacy-operator">
        {SITE.name} is independently operated by {CONTACT.person}. The short version: the site counts
        pages and clicks so it can be improved, it does so with its own software rather than a
        third-party service, and nothing it records can identify you.
      </p>
      <p>
        The analytics are run by {CONTACT.person} on this site's own server. No information collected
        by this site is shared with, operated by, or received by {ENTITY_LIST_AND}.
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
          'A flag recording that you have acknowledged the first-visit notice about ownership and technical information, so it is shown once per browser session.',
          'A flag if you dismiss the mobile call bar, so it stays dismissed for that session.',
          'Your analytics opt-out preference, if you set one.',
        ]}
      />
      <p>
        These are stored by your browser and are never transmitted. Clearing site data removes them.
      </p>

      <H2>The contact form</H2>
      <p>
        When you send a message through the contact form, the details you typed (your name, email
        address, and message, plus any company, phone, subject, or topic you chose to add) are sent
        to the site's message service, stored in a private message log, and emailed to{' '}
        {CONTACT.person}. That is the only reason they are collected, and they are used only to reply
        to you. The message service records nothing beyond what you typed: no IP address and no
        browser details. Messages are kept until Eric deletes them; ask and yours will be removed.
      </p>
      <p>
        Messages are contact with {CONTACT.person} regarding {SITE.name}, his personal projects, or
        technical topics. They are not forwarded to, or treated as requests to, his employer or any
        other company unless you ask for that.
      </p>
      <p>
        If the message service cannot be reached, the form composes the same message in your own
        email application instead, and you choose whether to send it.
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
 * Information & Calculator Disclaimer
 * ------------------------------------------------------------------ */

export function DisclaimerPage() {
  const disclaimer = LEGAL.disclaimer;
  return (
    <PolicyPage
      title={disclaimer.title}
      description={disclaimer.description}
      path={disclaimer.path}
      updated={UPDATED}
      intro="Everything on this site is reference information that you must independently verify before you rely on it. This page states the limits in full and applies to every page, calculator, table, example, and tool on the site."
    >
      <div data-testid="information-disclaimer">
        {disclaimer.sections.map((section) => (
          <LegalSectionView key={section.id} section={section} />
        ))}
      </div>

      <H2 id="ownership">Ownership and non-affiliation</H2>
      <p>{LEGAL.footer}</p>
      <p>
        <Link href={LEGAL.ownershipPage.path} className="cc-link font-semibold">
          Read the complete {LEGAL.ownershipPage.title.toLowerCase()} statement
        </Link>
        .
      </p>

      <H2 id="reporting">Reporting an error</H2>
      <p>
        If a calculator, a table, an example, or a page is wrong, that is worth knowing. Call{' '}
        {CONTACT.person} at {CONTACT.phoneDisplay} or use the{' '}
        <Link href="/contact" className="cc-link">
          contact page
        </Link>
        . See the{' '}
        <Link href="/editorial-standards" className="cc-link">
          editorial standards
        </Link>{' '}
        for how corrections are handled.
      </p>
      <p className="!mt-6">
        <a
          href={CONTACT.phoneHref}
          data-phone-placement="disclaimer"
          className="cc-btn cc-btn-outline"
          title={LEGAL.phoneLabel}
          aria-label={`${LEGAL.phoneLabel}, call ${CONTACT.phoneDisplay}`}
        >
          <Phone size={14} aria-hidden="true" />
          {CONTACT.phoneDisplay}
        </a>
      </p>
    </PolicyPage>
  );
}

/* ------------------------------------------------------------------ *
 * Terms of use
 * ------------------------------------------------------------------ */

export function TermsPage() {
  const notices = LEGAL.notices;
  return (
    <PolicyPage
      title="Terms of use"
      description={`The terms under which ${SITE.name} is provided: an independent technical reference site operated by ${CONTACT.person}, offered without warranty, with every piece of information to be independently verified before use.`}
      path="/terms"
      updated={UPDATED}
      intro="Plain terms for a technical reference site. The verification requirement and the limitation of liability are the parts that matter most; read those carefully."
    >
      <H2 id="identity">Website identity</H2>
      <p>{LEGAL.ownership.paragraphs[0]}</p>
      <p>{LEGAL.ownership.paragraphs[2]}</p>
      <p>
        {SITE.name} publishes general technical reference information about control systems,
        automation, instrumentation, and water and wastewater systems. It does not sell engineering
        services, and it is not the website of a systems integration company.
      </p>

      <H2 id="ownership">{LEGAL.ownership.heading}</H2>
      {LEGAL.ownership.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        <Link href={LEGAL.ownershipPage.path} className="cc-link font-semibold">
          This statement is also published on its own page
        </Link>
        .
      </p>

      <H2 id="informational-purpose">Informational purpose</H2>
      <p>{notices.referenceInformation}</p>
      <p>
        The full limits of use are set out in the{' '}
        <Link href={LEGAL.disclaimer.path} className="cc-link">
          {LEGAL.disclaimer.title}
        </Link>
        , which forms part of these terms.
      </p>

      <H2 id="no-professional-relationship">No professional relationship</H2>
      <p data-testid="terms-no-relationship">{notices.noProfessionalRelationship}</p>
      <p>
        Nothing on this site has been reviewed against your installation, your equipment, your
        process, or the conditions at your site. A qualified person who knows those things has to
        make the decision.
      </p>

      <H2 id="user-verification">User verification</H2>
      <p>
        You are responsible for independently verifying all information obtained from {SITE.name}{' '}
        before relying upon or applying it, against current codes, regulations, adopted standards,
        manufacturer documentation, project drawings and specifications, equipment ratings, site
        conditions, the requirements of the Authority Having Jurisdiction, owner and utility
        standards, employer procedures, and qualified engineering or professional judgment.
      </p>
      <p>{LEGAL.popup.technicalNotice.paragraphs[2]}</p>

      <H2 id="calculators">Calculators</H2>
      <p>{DISCLAIMERS.calculator}</p>
      <p>
        Every calculator on this site shows its formula, its assumptions, and its arithmetic so a
        result can be reproduced and checked. A result is a calculated reference result, never a
        determination that anything is correct, approved, compliant, or safe. Where a calculation
        affects safety, code compliance, regulatory compliance, equipment protection, engineering
        design, or process operation, the result should be independently reviewed by a qualified
        person familiar with the specific application.
      </p>

      <H2 id="programming-examples">Programming examples</H2>
      {notices.programmingExample.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <H2 id="codes-and-standards">Codes and standards</H2>
      {notices.codeStandard.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>{DISCLAIMERS.tables}</p>

      <H2 id="manufacturer-information">Manufacturer information</H2>
      {notices.manufacturer.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        Product, company, and standard names belong to their respective owners and are used here for
        identification only.
      </p>

      <H2 id="safety">Safety</H2>
      <LegalBlocks blocks={notices.safety.blocks} />

      <H2 id="external-links">External links</H2>
      <p>{notices.externalLinks}</p>

      <H2 id="personal-projects">Personal projects</H2>
      <p>{LEGAL.project.collection}</p>
      <p>
        No project should be understood to be available unless its stated status says so. Project
        descriptions describe the direction of development, not a statement that any feature is
        complete.
      </p>

      <H2 id="intellectual-property">Intellectual property</H2>
      <p>
        The original text, calculators, diagrams, and software tools written for {SITE.name} are
        published by {CONTACT.person}. You may read, link to, quote with attribution, and use them
        for your own reference, subject to the verification requirement above. Third-party
        trademarks, manufacturer and product names, standards and their content, quotations,
        open-source components, images, and licensed materials remain the property of their
        respective owners and appear here for identification, reference, or under their own terms.
        Nothing on this site is a claim to any third party's intellectual property.
      </p>

      <H2 id="limitation-of-liability">Limitation of liability</H2>
      {notices.useAtOwnRisk.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        The content, calculators, and tables are provided as they are, without warranty of any kind.
        Reasonable care goes into accuracy, and mistakes still happen. If you find one, say so and it
        will be corrected.
      </p>

      <H2 id="changes">Changes to the website</H2>
      <p>
        The website, its content, its calculators, and these terms may change at any time without
        notice. The date at the top of this page reflects the last revision of the terms. Continued
        use of the site after a change is use under the changed terms.
      </p>

      <H2 id="contact">Contact</H2>
      <p>{LEGAL.contact.paragraphs[0]}</p>
      <p>{LEGAL.contact.paragraphs[1]}</p>
      <p>
        Call {CONTACT.phoneDisplay} or use the{' '}
        <Link href="/contact" className="cc-link">
          contact page
        </Link>
        .
      </p>
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
      updated={UPDATED}
      intro="This site aims to meet WCAG 2.2 level AA. Here is what that means in practice, what is not there yet, and how to tell us about a problem."
    >
      <H2>What the site does</H2>
      <Bullets
        items={[
          'Semantic HTML throughout: real headings in order, real lists, real tables with header cells, and landmarks for the header, navigation, main content, and footer.',
          'Every interactive element is reachable and operable by keyboard, including the multi-level menus, the search dialog, the first-visit notice, and the mobile navigation drawer.',
          'A visible focus outline on every focusable element, and a skip link to the main content as the first item in the tab order.',
          'The mega menu and the mobile accordion expose their state with aria-expanded and aria-controls, and Escape closes them.',
          'Dialogs trap focus while open, are labelled, and return focus when dismissed. The first-visit notice is dismissed only by its button, never silently by Escape.',
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
        <a
          href={CONTACT.phoneHref}
          data-phone-placement="accessibility"
          className="cc-btn cc-btn-outline"
          title={LEGAL.phoneLabel}
          aria-label={`${LEGAL.phoneLabel}, call ${CONTACT.phoneDisplay}`}
        >
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
      description="How content on CurryControls.com is researched, sourced, written, reviewed, dated, and corrected, and what the site will not publish."
      path="/editorial-standards"
      updated={UPDATED}
      intro="The standards this site holds its technical content to, so you can judge how much weight to give it. None of them replaces your own verification."
    >
      <H2>Who is responsible</H2>
      <p data-testid="editorial-responsible">
        {CONTACT.person} independently manages {SITE.name} and is responsible for its editorial
        content. His career has covered electrical systems, industrial controls, automation, project
        management, PLC and SCADA systems, instrumentation, and water and wastewater control
        applications. Questions about any page go to him directly at {CONTACT.phoneDisplay}.
      </p>
      <p>
        The site is his personal project. Nothing on it is written, reviewed, or published on behalf
        of his former employer or his current employer.
      </p>

      <H2>Research methodology</H2>
      <Bullets
        items={[
          'Every page starts from the question a practitioner actually asks, and leads with a direct answer to it, then the key points, then the detail.',
          'Procedures are written to be worked through with the equipment in front of you, including what to verify before you leave the site.',
          'Troubleshooting is organised by observable symptom rather than by manufacturer or product, because that is how a fault presents in the field. Causes are listed as possibilities to check, never as a diagnosis.',
          'Where a value depends on the equipment, the page says to check the datasheet instead of inventing a number.',
        ]}
      />

      <H2>Primary sources</H2>
      <p>
        Where a code, a standard, or a manufacturer document governs, it is named on the page so you
        can go and read the source rather than take a summary on trust. The published document is
        the authority on its own content; this site is a guide to it, never a substitute for it.
      </p>

      <H2>Manufacturer documentation</H2>
      <p>
        Statements about how a product, platform, or protocol behaves are drawn from manufacturer
        documentation and field experience. Products, firmware, and software change. Verify every
        manufacturer-specific statement against the current documentation for the exact model and
        version in front of you before acting on it.
      </p>

      <H2>Standards references</H2>
      <p>
        Codes and standards are cited by name and, where it matters, by article, table, or clause.
        Editions are revised and adopted differently by jurisdiction, so a citation here is a pointer
        to the document, not a statement of what is in force at your site. The edition adopted where
        the work is performed governs.
      </p>

      <H2>Fact verification</H2>
      <p>
        Numerical values, formulas, and table data are checked against the published source before
        they are used, and the calculators show their arithmetic so a reader can repeat it. Checking
        reduces errors; it does not eliminate them, and no page on this site claims to be error-free.
      </p>

      <H2>Version-specific content</H2>
      <p>
        Where behaviour depends on a software version, a firmware version, a code edition, or a
        standard edition, the page says which one it describes. Content written for one version may
        not apply to another.
      </p>

      <H2>AI-assisted research and drafting</H2>
      <p>
        Some research, drafting, and editing on this site is assisted by AI tools working from the
        sources described above. Everything published is reviewed by {CONTACT.person} before it
        appears, and it is held to the same standards as anything written by hand. AI assistance
        does not change the requirement below: every technical statement on this site must be
        independently verified by the reader before it is relied upon.
      </p>

      <H2>What this site will not publish</H2>
      <Bullets
        items={[
          'Filler. A topic with no written reference says plainly that it has not been written yet, rather than being padded out to look complete.',
          'Invented specifics. Where a value depends on the equipment, the page says to check the datasheet instead of inventing a number.',
          'Fabricated testimonials, case studies, or credentials.',
          'Claims of sponsorship, endorsement, or affiliation that do not exist. Manufacturer, platform, and company names are used for identification only.',
          'Content written to rank rather than to be useful.',
        ]}
      />

      <H2>Dates and updates</H2>
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

      <H2>User verification</H2>
      <p>{LEGAL.popup.technicalNotice.paragraphs[2]}</p>
      <p>
        The{' '}
        <Link href={LEGAL.disclaimer.path} className="cc-link">
          {LEGAL.disclaimer.title}
        </Link>{' '}
        states the limits in full.
      </p>

      <H2>Independence</H2>
      <p>
        Nothing on this site is paid placement. There is no advertising, no sponsored content, and no
        affiliate arrangement. The personal projects section is clearly labelled as such on every
        page it appears, and it is kept below the technical content deliberately.
      </p>
      <p>{DISCLAIMERS.endorsement}</p>
      <p>{LEGAL.footer}</p>
    </PolicyPage>
  );
}
