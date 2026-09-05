import { Link } from 'wouter';
import { ArrowRight, FileText, Phone } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { ProjectCard } from '@/components/blocks/cards';
import { CONTACT, SITE } from '@/data/site';
import { LEGAL } from '@/data/site-legal';
import { PROJECTS } from '@/data/projects';
import { NAV_ENTRIES } from '@/data/nav-index';
import { ENTRIES } from '@/data/content';
import {
  aboutPageSchema,
  breadcrumbSchema,
  graph,
  personSchema,
  websiteSchema,
} from '@/lib/structured-data';

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="cc-h2 !mt-9">
      {children}
    </h2>
  );
}

function Paragraphs({ items, lead = false }: { items: readonly string[]; lead?: boolean }) {
  return (
    <>
      {items.map((paragraph, index) => (
        <p key={paragraph} className={lead && index === 0 ? 'text-[1.02rem] leading-7.5' : undefined}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * About CurryControls.com
 * ------------------------------------------------------------------ */

export function AboutSitePage() {
  const path = '/about/site';
  const trail = [
    { name: 'About', path: '/about' },
    { name: 'About CurryControls.com', path },
  ];
  const ownership = LEGAL.ownership.paragraphs;

  return (
    <>
      <Seo
        title="About CurryControls.com"
        description={LEGAL.footer}
        path={path}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          aboutPageSchema('About CurryControls.com', path, LEGAL.footer),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">About CurryControls.com</h1>
          <p className="cc-lead mt-3 max-w-3xl">{LEGAL.purpose}</p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="grid gap-9 lg:grid-cols-[1fr_300px]">
          <div className="cc-prose min-w-0 max-w-2xl space-y-4">
            <H2 id="what-it-is">What CurryControls.com is</H2>
            <Paragraphs items={[ownership[0], ownership[2]]} lead />
            <p>
              The intended audience is controls engineers, systems integrators, PLC programmers, SCADA
              developers, instrumentation technicians, electrical contractors, panel builders, water
              and wastewater operators, and the municipal staff who live with these systems every
              day. Content is organized as a deep taxonomy rather than a blog feed, because reference
              material is looked up rather than read in sequence.
            </p>

            <H2 id="registration-history">Ownership and registration history</H2>
            <p>{LEGAL.registration.paragraphs[0]}</p>

            <H2 id="current-registration">Current domain registration</H2>
            <p>{LEGAL.registration.paragraphs[1]}</p>

            <H2 id="new-content">New site content</H2>
            <p>{ownership[2]}</p>

            <H2 id="curry-controls">Eric Sullivan and Curry Controls Company</H2>
            <p>{ownership[3]}</p>
            <p>{ownership[4]}</p>
            <p>{LEGAL.aboutEric.career}</p>

            <H2 id="current-employment">Eric Sullivan's current employment</H2>
            <p>{ownership[7]}</p>
            <p>{ownership[8]}</p>

            <H2 id="ownership">{LEGAL.ownership.heading}</H2>
            <Paragraphs items={ownership} />
            <p>
              <Link href={LEGAL.ownershipPage.path} className="cc-btn cc-btn-outline !mt-2">
                {LEGAL.ownershipPage.linkLabel}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </p>

            <H2 id="purpose">Purpose of this technical knowledge site</H2>
            <p>{LEGAL.purpose}</p>
            <ul className="space-y-2">
              {[
                'Each page leads with a direct answer, then key points, then the detail.',
                'Procedures are written to be worked through with the equipment in front of you.',
                'Troubleshooting is organized by observable symptom rather than by product.',
                'Every calculator shows its formula, its assumptions, and its arithmetic so a result can be reproduced and checked.',
                'Published and updated dates are shown, because reference material goes stale.',
                'Everything published here must be independently verified by the reader before it is relied upon.',
              ].map((point) => (
                <li key={point} className="flex gap-2.5 text-[0.95rem] leading-7">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent-blue))]"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <H2 id="personal-projects">Personal projects</H2>
            <p>{LEGAL.project.collection}</p>
            <p>
              <Link href="/tools-projects" className="cc-link font-semibold">
                See the personal projects
              </Link>
            </p>

            <H2 id="disclaimer">Information and calculator disclaimer</H2>
            <p>{LEGAL.popup.technicalNotice.paragraphs[2]}</p>
            <p>
              <Link href={LEGAL.disclaimer.path} className="cc-btn cc-btn-outline !mt-2">
                <FileText size={14} aria-hidden="true" />
                Read the full {LEGAL.disclaimer.title}
              </Link>
            </p>

            <div className="!mt-9">
              <ContactCta />
            </div>
          </div>

          <aside className="lg:sticky lg:top-[140px] lg:self-start">
            <div className="cc-card p-5">
              <p className="cc-eyebrow">At a glance</p>
              <dl className="mt-3 space-y-3">
                <Stat label="Indexed topics" value={String(NAV_ENTRIES.length)} />
                <Stat label="Written guides" value={String(ENTRIES.length)} />
                <Stat label="Knowledge sections" value="9" />
                <Stat label="Registered" value={String(LEGAL.identity.currentRegistrationYear)} />
              </dl>
            </div>

            <div className="cc-card mt-4 p-5">
              <p className="cc-eyebrow">Contact</p>
              <p className="mt-2 font-semibold text-[hsl(var(--navy))]">{CONTACT.person}</p>
              <a
                href={CONTACT.phoneHref}
                data-phone-placement="about-site"
                className="mt-2 inline-flex items-center gap-2 text-[hsl(var(--navy))]"
                title={LEGAL.phoneLabel}
                aria-label={`${LEGAL.phoneLabel}, ${CONTACT.phoneDisplay}`}
              >
                <Phone size={15} aria-hidden="true" />
                <span className="cc-mono font-bold">{CONTACT.phoneDisplay}</span>
              </a>
              <p className="mt-2 text-[0.76rem] leading-5 text-[hsl(var(--ink-2))]">{LEGAL.phone}</p>
            </div>

            <Disclaimer kind="independence" className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Ownership, Registration and Non-Affiliation
 * ------------------------------------------------------------------ */

export function OwnershipPage() {
  const path = LEGAL.ownershipPage.path;
  const trail = [
    { name: 'About', path: '/about' },
    { name: LEGAL.ownershipPage.linkLabel, path },
  ];

  return (
    <>
      <Seo
        title={LEGAL.ownershipPage.title}
        description={LEGAL.ownershipPage.description}
        path={path}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          aboutPageSchema(LEGAL.ownershipPage.title, path, LEGAL.footer),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">{LEGAL.ownershipPage.title}</h1>
          <p className="cc-lead mt-3 max-w-3xl">{LEGAL.ownershipPage.description}</p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="cc-prose max-w-2xl space-y-4" data-testid="ownership-statement">
          <Paragraphs items={LEGAL.ownership.paragraphs} lead />

          <H2 id="registration-history">{LEGAL.registration.heading}</H2>
          <Paragraphs items={LEGAL.registration.paragraphs} />

          <H2 id="telephone">The telephone number on this site</H2>
          <p>{LEGAL.phone}</p>

          <H2 id="personal-projects">Personal projects</H2>
          <p>{LEGAL.project.collection}</p>

          <H2 id="technical-information">Technical information</H2>
          <p>{LEGAL.popup.technicalNotice.paragraphs[2]}</p>
          <p>
            <Link href={LEGAL.disclaimer.path} className="cc-link font-semibold">
              Read the {LEGAL.disclaimer.title}
            </Link>
            . The{' '}
            <Link href="/terms" className="cc-link">
              terms of use
            </Link>{' '}
            and the{' '}
            <Link href="/privacy" className="cc-link">
              privacy notice
            </Link>{' '}
            also apply.
          </p>
        </div>

        <div className="mt-12 max-w-2xl">
          <ContactCta variant="inline" />
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * About Eric Sullivan
 * ------------------------------------------------------------------ */

export function AboutEricPage() {
  const path = '/about/eric-sullivan';
  const trail = [
    { name: 'About', path: '/about' },
    { name: 'About Eric Sullivan', path },
  ];

  return (
    <>
      <Seo
        title="About Eric Sullivan"
        description={`${LEGAL.aboutEric.paragraphs[1]} ${LEGAL.aboutEric.paragraphs[0]}`}
        path={path}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          aboutPageSchema('About Eric Sullivan', path, LEGAL.aboutEric.paragraphs[1]),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">About Eric Sullivan</h1>
          <p className="cc-lead mt-3 max-w-2xl">Registrant and operator of {SITE.name}.</p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="cc-prose max-w-2xl space-y-4" data-testid="about-eric">
          <Paragraphs items={LEGAL.aboutEric.paragraphs} lead />
          <p>{LEGAL.aboutEric.career}</p>
          <p>
            {SITE.name} is his independent project: a place to put the practical knowledge that
            usually lives in commissioning notebooks, and to make it findable by the people who need
            it at two in the morning.
          </p>

          <H2 id="ownership">Ownership and non-affiliation</H2>
          <p>{LEGAL.footer}</p>
          <p>
            <Link href={LEGAL.ownershipPage.path} className="cc-btn cc-btn-outline !mt-2">
              {LEGAL.ownershipPage.linkLabel}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>

          <H2 id="contact">Contact</H2>
          <p>
            The fastest way to reach Eric about anything on this site, a controls topic, or one of his
            personal projects is a direct call.
          </p>
          <a
            href={CONTACT.phoneHref}
            data-phone-placement="about-eric"
            className="cc-btn cc-btn-primary !mt-4"
            title={LEGAL.phoneLabel}
            aria-label={`${LEGAL.phoneLabel}, ${CONTACT.phoneDisplay}`}
          >
            <Phone size={15} aria-hidden="true" />
            <span>
              Call Eric · <span className="cc-mono font-bold">{CONTACT.phoneDisplay}</span>
            </span>
          </a>
          <p className="text-[0.82rem] leading-6 text-[hsl(var(--ink-2))]">{LEGAL.phone}</p>

          <H2 id="personal-projects">Personal projects</H2>
          <p>{LEGAL.project.collection}</p>
        </div>

        <div className="mt-6 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.filter((project) => project.featured).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link href="/tools-projects" className="cc-btn cc-btn-outline mt-5">
          All projects
        </Link>

        <div className="mt-12 max-w-2xl">
          <ContactCta />
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[hsl(var(--rule))] pb-2 last:border-0">
      <dt className="text-[0.82rem] text-[hsl(var(--ink-2))]">{label}</dt>
      <dd className="cc-mono font-bold text-[hsl(var(--navy))]">{value}</dd>
    </div>
  );
}
