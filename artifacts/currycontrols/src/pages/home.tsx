import { useCallback, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Phone, Search as SearchIcon } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { EntryCard, ProjectCard, TopicCard } from '@/components/blocks/cards';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { Icon } from '@/components/icon';
import { SearchDialog } from '@/components/search/search-dialog';
import { CONTACT, SITE } from '@/data/site';
import { KNOWLEDGE_SECTIONS } from '@/data/navigation';
import { getEntry, getChildren, countDescendants } from '@/data/nav-index';
import { ENTRIES, ENTRIES_BY_RECENCY, entriesOfKind } from '@/data/content';
import { PROJECTS } from '@/data/projects';
import { NAV_ENTRIES } from '@/data/nav-index';
import { POPULAR_SEARCHES, SEARCH_PLACEHOLDER } from '@/lib/search';
import { graph, personSchema, websiteSchema } from '@/lib/structured-data';

const TOPIC_PATHS = [
  '/controls/plc-systems',
  '/controls/scada-hmi',
  '/controls/instrumentation',
  '/controls/control-panels',
  '/water-wastewater/water-systems',
  '/water-wastewater/wastewater-systems',
  '/cybersecurity/ot-security',
  '/engineering-library/drawings',
];

const TOPIC_ICONS: Record<string, string> = {
  '/controls/plc-systems': 'Cpu',
  '/controls/scada-hmi': 'MonitorDot',
  '/controls/instrumentation': 'Gauge',
  '/controls/control-panels': 'PanelsTopLeft',
  '/water-wastewater/water-systems': 'Droplet',
  '/water-wastewater/wastewater-systems': 'Waves',
  '/cybersecurity/ot-security': 'ShieldCheck',
  '/engineering-library/drawings': 'Library',
};

export function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);

  const topics = TOPIC_PATHS.map((path) => getEntry(path)).filter(Boolean) as NonNullable<
    ReturnType<typeof getEntry>
  >[];
  const howtos = entriesOfKind('howto').slice(0, 3);
  const diagnostics = entriesOfKind('troubleshooting').slice(0, 3);
  const latest = ENTRIES_BY_RECENCY.slice(0, 6);
  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const totalTopics = NAV_ENTRIES.length;

  return (
    <>
      <Seo
        title={SITE.name}
        description={SITE.description}
        path="/"
        jsonLd={graph(websiteSchema(), personSchema())}
        keywords={[
          'PLC',
          'SCADA',
          'instrumentation',
          'control panels',
          'water treatment controls',
          'wastewater controls',
          'industrial automation',
          'controls troubleshooting',
        ]}
      />

      {/* Hero */}
      <section className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--navy))] text-white">
        <div className="cc-container py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="cc-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/55">
              Independent technical resource
            </p>
            <h1 className="mt-3 text-[clamp(2rem,1.3rem+2.6vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.024em]">
              Control systems knowledge
            </h1>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-7 text-white/80">
              Practical information for industrial automation, PLCs, SCADA, instrumentation,
              networking, control panels, and water and wastewater systems.
            </p>
            <p className="mt-3 max-w-2xl text-[0.94rem] leading-7 text-white/60">
              CurryControls.com brings practical controls knowledge, engineering references,
              troubleshooting guides, and useful industry tools together in one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/controls" className="cc-btn bg-white text-[hsl(var(--navy))] hover:bg-white/90">
                Explore the knowledge base
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/troubleshooting"
                className="cc-btn border border-white/30 text-white hover:border-white/70"
              >
                Troubleshooting library
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="cc-btn border border-white/30 text-white hover:border-white/70"
                data-testid="link-phone-hero"
              >
                <Phone size={14} aria-hidden="true" />
                <span className="cc-mono font-bold">{CONTACT.phoneDisplay}</span>
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/12 pt-6">
              <Stat value={String(totalTopics)} label="Indexed topics" />
              <Stat value={String(ENTRIES.length)} label="Written guides" />
              <Stat value="9" label="Knowledge sections" />
              <Stat value="5" label="Levels of navigation" />
            </dl>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="cc-h3">Search the knowledge base</h2>
            <button
              type="button"
              onClick={openSearch}
              className="mt-3 flex w-full items-center gap-3 rounded border border-[hsl(var(--input))] bg-white px-4 py-3 text-left text-[0.92rem] text-[hsl(var(--ink-2))] hover:border-[hsl(var(--accent-blue))]"
              data-testid="button-open-search-home"
            >
              <SearchIcon size={17} aria-hidden="true" />
              <span className="flex-1 truncate">{SEARCH_PLACEHOLDER}</span>
              <kbd className="cc-mono hidden rounded border border-[hsl(var(--rule))] bg-[hsl(var(--surface))] px-1.5 text-[0.72rem] sm:block">
                /
              </kbd>
            </button>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCHES.slice(0, 6).map((term) => (
                <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="cc-tag">
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore control systems */}
      <section className="cc-section">
        <div className="cc-container">
          <SectionHeading
            eyebrow="Knowledge base"
            title="Explore control systems"
            description="Every area of the taxonomy resolves to a real page with its own breadcrumbs, related topics, and structured data."
            action={<SectionLink href="/controls" label="All controls topics" />}
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <TopicCard key={topic.path} entry={topic} icon={TOPIC_ICONS[topic.path]} />
            ))}
          </div>
        </div>
      </section>

      {/* Sections overview */}
      <section className="cc-section cc-surface border-y border-[hsl(var(--rule))]">
        <div className="cc-container">
          <SectionHeading
            eyebrow="Site structure"
            title="Built for a site of thousands of pages"
            description="The navigation is generated from a single structured taxonomy, five levels deep, so new content slots into the menu, the breadcrumbs, the search index, and the sitemap at once."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KNOWLEDGE_SECTIONS.map((section) => {
              const nav = getEntry(`/${section.slug}`)!;
              return (
                <Link key={section.slug} href={nav.path} className="cc-card group p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded bg-white text-[hsl(var(--accent-blue))] ring-1 ring-[hsl(var(--rule))]">
                      <Icon name={section.icon} size={18} />
                    </span>
                    <h3 className="cc-h3 group-hover:text-[hsl(var(--accent-blue))]">{section.title}</h3>
                  </div>
                  <p className="mt-3 text-[0.875rem] leading-6 text-[hsl(var(--ink-2))]">{section.blurb}</p>
                  <p className="cc-mono mt-3.5 flex flex-wrap gap-x-3 text-[0.68rem] uppercase tracking-wider text-[hsl(var(--ink-2))]/70">
                    <span>{countDescendants(nav)} topics</span>
                    <span>{getChildren(nav).length} areas</span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Troubleshooting + how-to */}
      <section className="cc-section">
        <div className="cc-container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Symptom first"
              title="Troubleshooting library"
              description="Organized by what you can observe, not by product. Symptom, likely causes, what to check first, then a diagnostic procedure."
              action={<SectionLink href="/troubleshooting" label="All troubleshooting" />}
            />
            <div className="mt-5 space-y-3">
              {diagnostics.map((entry) => (
                <EntryCard key={entry.path} entry={entry} compact />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Step by step"
              title="How-to guides"
              description="Procedures written to be worked through with the equipment in front of you, including what to verify before you leave."
              action={<SectionLink href="/how-to" label="All how-to guides" />}
            />
            <div className="mt-5 space-y-3">
              {howtos.map((entry) => (
                <EntryCard key={entry.path} entry={entry} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest technical content */}
      <section className="cc-section cc-surface border-y border-[hsl(var(--rule))]">
        <div className="cc-container">
          <SectionHeading
            eyebrow="Latest"
            title="Recently published and revised"
            description="Content is revised as field experience corrects it. Each entry carries its published and updated dates."
            action={<SectionLink href="/articles" label="All articles" />}
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((entry) => (
              <EntryCard key={entry.path} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="cc-section">
        <div className="cc-container">
          <SectionHeading
            eyebrow="Eric Sullivan's personal projects"
            title="Projects under development"
            description="Software Eric Sullivan is building on his own time. These are personal projects, not products of any employer, and nothing here is available unless its status says so."
            action={<SectionLink href="/tools-projects" label="All projects" />}
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Disclaimer kind="projects" className="mt-5 font-medium" />
        </div>
      </section>

      {/* About + contact */}
      <section className="cc-section cc-surface border-t border-[hsl(var(--rule))]">
        <div className="cc-container grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="cc-eyebrow">About</p>
            <h2 className="cc-h2 mt-1.5">About CurryControls.com</h2>
            <div className="mt-3 space-y-3 text-[0.94rem] leading-7 text-[hsl(var(--ink-2))]">
              <p>CurryControls.com is independently owned and maintained by Eric Sullivan.</p>
              <p>
                Eric Sullivan previously worked with Curry Controls Company and left the company in
                2021. He is currently employed by General Control Systems, Inc. Eric Sullivan is not
                affiliated with Curry Controls Company, and General Control Systems, Inc. is a
                separate company that is not affiliated with Curry Controls Company.
              </p>
              <p>
                This site is being developed as an independent technical information resource focused
                on control systems, automation, instrumentation, engineering, and the water and
                wastewater industry.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/about/site" className="cc-btn cc-btn-outline">
                About this site
              </Link>
              <Link href="/about/eric-sullivan" className="cc-btn cc-btn-outline">
                About Eric Sullivan
              </Link>
            </div>
          </div>
          <ContactCta />
        </div>
      </section>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="cc-mono text-[0.68rem] uppercase tracking-[0.13em] text-white/50">{label}</dt>
      <dd className="cc-mono mt-0.5 text-[1.35rem] font-bold text-white">{value}</dd>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="cc-eyebrow">{eyebrow}</p>
        <h2 className="cc-h2 mt-1.5">{title}</h2>
        {description && <p className="cc-lead mt-2.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function SectionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center gap-1.5 text-[0.86rem] font-semibold text-[hsl(var(--accent-blue))] hover:text-[hsl(var(--navy))]"
    >
      {label}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}
