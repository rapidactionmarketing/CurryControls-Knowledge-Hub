import { Link } from 'wouter';
import { Phone } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { ProjectCard } from '@/components/blocks/cards';
import { CONTACT, OWNERSHIP_NOTICE, SITE } from '@/data/site';
import { PROJECTS } from '@/data/projects';
import { NAV_ENTRIES } from '@/data/nav-index';
import { ENTRIES } from '@/data/content';
import { breadcrumbSchema, graph, personSchema, websiteSchema } from '@/lib/structured-data';

export function AboutSitePage() {
  const trail = [
    { name: 'About', path: '/about' },
    { name: 'About CurryControls.com', path: '/about/site' },
  ];

  return (
    <>
      <Seo
        title="About CurryControls.com"
        description="CurryControls.com is independently owned and maintained by Eric Sullivan, and is not affiliated with Curry Controls Company. It is an independent technical resource for control systems and automation."
        path="/about/site"
        jsonLd={graph(websiteSchema(), personSchema(), breadcrumbSchema(trail))}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">{OWNERSHIP_NOTICE.heading}</h1>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="grid gap-9 lg:grid-cols-[1fr_300px]">
          <div className="cc-prose min-w-0 max-w-2xl space-y-4">
            <p className="text-[1.02rem] leading-7.5">
              CurryControls.com is independently owned and maintained by Eric Sullivan.
            </p>
            <p>
              Eric Sullivan previously worked with Curry Controls Company and left the company in
              2021. He is currently employed by General Control Systems, Inc.
            </p>
            <p>Eric Sullivan is not affiliated with Curry Controls Company.</p>
            <p>
              General Control Systems, Inc. is a separate company and is not affiliated with Curry
              Controls Company.
            </p>
            <p>
              CurryControls.com is being developed as an independent technical information resource
              focused on control systems, automation, instrumentation, engineering, and the water and
              wastewater industry.
            </p>

            <h2 className="cc-h2 !mt-9">What this site is</h2>
            <p>
              A technical knowledge base for the people who build, program, commission, and maintain
              industrial control systems. The intended audience is controls engineers, systems
              integrators, PLC programmers, SCADA developers, instrumentation technicians, electrical
              contractors, panel builders, water and wastewater operators, and the municipal staff who
              live with these systems every day.
            </p>
            <p>
              Content is organized as a deep taxonomy rather than a blog feed, because reference
              material is looked up rather than read in sequence. The navigation is designed now for
              a site of thousands of technical pages, so material added later has a place to go.
            </p>

            <h2 className="cc-h2 !mt-9">How the content is written</h2>
            <ul className="space-y-2">
              {[
                'Each page leads with a direct answer, then key points, then the detail.',
                'Procedures are written to be worked through with the equipment in front of you.',
                'Troubleshooting is organized by observable symptom rather than by product.',
                'Pages that have not been written yet say so, rather than being filled with generated text.',
                'Published and updated dates are shown, because reference material goes stale.',
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

            <h2 className="cc-h2 !mt-9">What this site is not</h2>
            <p>
              It is not the website of a systems integration company, it does not sell engineering
              services, and it is not the continuation, successor, affiliate, or current operating
              business of the former Curry Controls Company.
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
                <Stat label="Navigation depth" value="5 levels" />
              </dl>
            </div>

            <div className="cc-card mt-4 p-5">
              <p className="cc-eyebrow">Contact</p>
              <p className="mt-2 font-semibold text-[hsl(var(--navy))]">{CONTACT.person}</p>
              <a href={CONTACT.phoneHref} className="mt-2 inline-flex items-center gap-2 text-[hsl(var(--navy))]">
                <Phone size={15} aria-hidden="true" />
                <span className="cc-mono font-bold">{CONTACT.phoneDisplay}</span>
              </a>
            </div>

            <Disclaimer kind="independence" className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}

export function AboutEricPage() {
  const trail = [
    { name: 'About', path: '/about' },
    { name: 'About Eric Sullivan', path: '/about/eric-sullivan' },
  ];

  return (
    <>
      <Seo
        title="About Eric Sullivan"
        description="Eric Sullivan owns and maintains CurryControls.com. His background is in electrical systems, industrial controls, automation, project management, PLC and SCADA systems, instrumentation, and water and wastewater control applications."
        path="/about/eric-sullivan"
        jsonLd={graph(websiteSchema(), personSchema(), breadcrumbSchema(trail))}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />
          <h1 className="cc-h1 mt-4">About Eric Sullivan</h1>
          <p className="cc-lead mt-3 max-w-2xl">
            Owner and maintainer of {SITE.name}.
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="cc-prose max-w-2xl space-y-4">
          <p className="text-[1.02rem] leading-7.5">
            Eric Sullivan has spent his career working in electrical systems, industrial controls,
            automation, project management, PLC and SCADA systems, instrumentation, and water and
            wastewater control applications.
          </p>
          <p>
            CurryControls.com is his independent project: a place to put the practical knowledge that
            usually lives in commissioning notebooks, and to make it findable by the people who need
            it at two in the morning.
          </p>
          <p>
            Eric Sullivan previously worked with Curry Controls Company and left the company in 2021.
            He is currently employed by General Control Systems, Inc. He is not affiliated with Curry
            Controls Company, and General Control Systems, Inc. is a separate company that is not
            affiliated with Curry Controls Company.
          </p>

          <h2 className="cc-h2 !mt-9">Contact</h2>
          <p>
            The fastest way to reach Eric about anything on this site, a controls topic, or one of his
            personal projects is a direct call.
          </p>
          <a href={CONTACT.phoneHref} className="cc-btn cc-btn-primary !mt-4">
            <Phone size={15} aria-hidden="true" />
            <span>
              Call Eric · <span className="cc-mono font-bold">{CONTACT.phoneDisplay}</span>
            </span>
          </a>

          <h2 className="cc-h2 !mt-10">Personal projects</h2>
          <p>
            Eric develops software independently, outside of any employer. Every project page on this
            site is labelled as a personal project.
          </p>
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
