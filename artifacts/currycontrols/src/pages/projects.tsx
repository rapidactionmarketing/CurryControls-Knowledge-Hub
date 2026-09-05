import { Link } from 'wouter';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Seo } from '@/components/seo/seo';
import { Breadcrumbs } from '@/components/blocks/breadcrumbs';
import { ProjectCard, StatusBadge } from '@/components/blocks/cards';
import { ContactCta } from '@/components/blocks/contact-cta';
import { Disclaimer } from '@/components/blocks/disclaimer';
import { Icon } from '@/components/icon';
import { DISCLAIMERS } from '@/data/site';
import { LEGAL } from '@/data/site-legal';
import { PROJECTS, PROJECT_BY_SLUG, STATUS_NOTE, type Project } from '@/data/projects';
import {
  breadcrumbSchema,
  graph,
  personSchema,
  projectSchema,
  websiteSchema,
} from '@/lib/structured-data';

const BASE = '/tools-projects/eric-sullivans-personal-projects';

const ECOSYSTEM = [
  { stage: 'Project discovery', project: 'SuiteBids' },
  { stage: 'Bid and scope analysis', project: 'SuiteBids' },
  { stage: 'Engineering and drawings', project: 'SuitePlans' },
  { stage: 'Takeoff and estimating', project: 'SuitePlans' },
  { stage: 'Documentation', project: 'KeyDocs' },
  { stage: 'Secure transmission', project: 'SecurelyFax' },
  { stage: 'Knowledge management', project: 'CurryControls.com' },
];

export function ProjectsPage() {
  const trail = [
    { name: 'Tools & Projects', path: '/tools-projects' },
    { name: "Eric Sullivan's Personal Projects", path: BASE },
  ];

  return (
    <>
      <Seo
        title="Tools & Projects — Eric Sullivan's Personal Projects"
        description="SuitePlans, SuiteBids, KeyDocs, SecurelyFax, Prompt Alerts, and DubBrain: personal software projects developed independently by Eric Sullivan."
        path="/tools-projects"
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          breadcrumbSchema([{ name: 'Tools & Projects', path: '/tools-projects' }]),
          ...PROJECTS.map(projectSchema),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={[{ name: 'Tools & Projects', path: '/tools-projects' }]} />
          <p className="cc-eyebrow mt-4">Eric Sullivan's Personal Projects</p>
          <h1 className="cc-h1 mt-1.5">Tools &amp; Projects</h1>
          <p className="cc-lead mt-3 max-w-3xl">
            Software Eric Sullivan is building on his own time, around engineering, estimating,
            document management, communications, and technical workflows. These are personal
            projects. They are not products of any employer.
          </p>
          <p className="mt-4 inline-block rounded border border-[hsl(var(--accent-blue))]/35 bg-white px-3 py-1.5 text-[0.8rem] font-semibold text-[hsl(var(--accent-blue))]">
            {DISCLAIMERS.projects}
          </p>
          <p className="mt-3 max-w-3xl text-[0.86rem] leading-6 text-[hsl(var(--ink-2))]" data-testid="projects-statement">
            {LEGAL.project.collection}
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <section className="mt-14" aria-labelledby="ecosystem-heading">
          <p className="cc-eyebrow">The tool ecosystem</p>
          <h2 id="ecosystem-heading" className="cc-h2 mt-1.5">
            Related technical workflows
          </h2>
          <p className="cc-lead mt-2.5 max-w-3xl">
            These projects are being developed around related technical workflows and may
            increasingly share capabilities and integrations as they evolve. No integrations between
            them exist today.
          </p>

          <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM.map((step, index) => (
              <li key={step.stage} className="cc-card flex items-center gap-3 p-4">
                <span className="cc-mono grid size-7 shrink-0 place-items-center rounded-full bg-[hsl(var(--surface))] text-[0.72rem] font-bold text-[hsl(var(--navy))]">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.86rem] font-semibold text-[hsl(var(--navy))]">
                    {step.stage}
                  </span>
                  <span className="block truncate text-[0.76rem] text-[hsl(var(--ink-2))]">
                    {step.project}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="status-key-heading">
          <h2 id="status-key-heading" className="cc-h2">
            What the status labels mean
          </h2>
          <dl className="mt-4 divide-y divide-[hsl(var(--rule))] rounded border border-[hsl(var(--rule))]">
            {(Object.keys(STATUS_NOTE) as (keyof typeof STATUS_NOTE)[]).map((status) => (
              <div key={status} className="grid gap-2 p-4 sm:grid-cols-[160px_1fr] sm:gap-5">
                <dt>
                  <StatusBadge status={status} />
                </dt>
                <dd className="text-[0.88rem] text-[hsl(var(--ink-2))]">{STATUS_NOTE[status]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12">
          <ContactCta />
        </div>

        <Disclaimer kind="endorsement" className="mt-8" />
      </div>
    </>
  );
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const project = PROJECT_BY_SLUG[slug];
  if (!project) return null;

  const path = `${BASE}/${project.slug}`;
  const trail = [
    { name: 'Tools & Projects', path: '/tools-projects' },
    { name: "Eric Sullivan's Personal Projects", path: BASE },
    { name: project.name, path },
  ];

  return (
    <>
      <Seo
        title={`${project.name} — A Personal Project of Eric Sullivan`}
        description={project.summary}
        path={path}
        keywords={project.industryTags}
        jsonLd={graph(
          websiteSchema(),
          personSchema(),
          projectSchema(project),
          breadcrumbSchema(trail),
        )}
      />

      <header className="border-b border-[hsl(var(--rule))] bg-[hsl(var(--surface))]">
        <div className="cc-container py-9">
          <Breadcrumbs trail={trail} />

          <div className="mt-5 flex flex-wrap items-start gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded bg-white text-[hsl(var(--accent-blue))] ring-1 ring-[hsl(var(--rule))]">
              <Icon name={project.icon} size={26} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={project.status} />
                <span className="cc-tag">{project.category}</span>
              </div>
              <h1 className="cc-h1 mt-2.5">{project.name}</h1>
              <p className="cc-lead mt-2">{project.tagline}</p>
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cc-btn cc-btn-outline mt-4"
                  data-testid={`link-visit-${project.slug}`}
                >
                  Visit {project.domain}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <p className="mt-6 inline-block rounded border border-[hsl(var(--accent-blue))]/35 bg-white px-3 py-1.5 text-[0.8rem] font-semibold text-[hsl(var(--accent-blue))]" data-testid="project-label">
            {DISCLAIMERS.projects}
          </p>
          <p className="mt-3 max-w-3xl text-[0.86rem] leading-6 text-[hsl(var(--ink-2))]" data-testid="project-statement">
            {DISCLAIMERS.projectsExplanation}
          </p>
        </div>
      </header>

      <div className="cc-container py-10">
        <div className="grid gap-9 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 max-w-2xl">
            <div className="cc-prose space-y-4">
              {project.description.map((paragraph) => (
                <p key={paragraph} className="text-[0.975rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            <section className="mt-9" aria-labelledby="areas-heading">
              <h2 id="areas-heading" className="cc-h2">
                Areas of work
              </h2>
              <ul className="mt-4 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-[0.94rem] leading-7">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent-blue))]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.84rem] leading-6 text-[hsl(var(--ink-2))]">
                These describe the direction of development. They are not a statement that any
                feature is complete or available.
              </p>
            </section>

            <div className="mt-10">
              <ContactCta />
            </div>
          </div>

          <aside className="lg:sticky lg:top-[140px] lg:self-start">
            <div className="cc-card p-5">
              <p className="cc-eyebrow">Status</p>
              <p className="mt-2">
                <StatusBadge status={project.status} />
              </p>
              <p className="mt-2.5 text-[0.84rem] leading-6 text-[hsl(var(--ink-2))]">
                {STATUS_NOTE[project.status]}
              </p>

              <p className="cc-eyebrow mt-6">Category</p>
              <p className="mt-1.5 text-[0.88rem] text-[hsl(var(--ink-2))]">{project.category}</p>

              <p className="cc-eyebrow mt-6">Tags</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.industryTags.map((tag) => (
                  <span key={tag} className="cc-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="cc-card mt-4 p-5">
              <p className="cc-eyebrow">Other projects</p>
              <ul className="mt-2.5 space-y-1.5">
                {PROJECTS.filter((other) => other.slug !== project.slug).map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`${BASE}/${other.slug}`}
                      className="inline-flex items-center gap-1.5 text-[0.86rem] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--accent-blue))]"
                    >
                      {other.name}
                      <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Disclaimer kind="endorsement" className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}

export function isProjectSlug(slug: string): slug is Project['slug'] {
  return slug in PROJECT_BY_SLUG;
}
