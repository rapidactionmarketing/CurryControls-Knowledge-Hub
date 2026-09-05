import { Link } from 'wouter';
import { ExternalLink, Phone } from 'lucide-react';
import { CONTACT, DISCLAIMERS, SITE } from '@/data/site';
import { LEGAL } from '@/data/site-legal';
import { PROJECTS } from '@/data/projects';

const KNOWLEDGE_LINKS = [
  { href: '/controls', label: 'Controls' },
  { href: '/controls/plc-systems', label: 'PLC Systems' },
  { href: '/controls/scada-hmi', label: 'SCADA & HMI' },
  { href: '/controls/instrumentation', label: 'Instrumentation' },
  { href: '/controls/control-panels', label: 'Control Panels' },
  { href: '/water-wastewater', label: 'Water & Wastewater' },
  { href: '/cybersecurity', label: 'Cybersecurity' },
];

const RESOURCE_LINKS = [
  { href: '/troubleshooting', label: 'Troubleshooting' },
  { href: '/how-to', label: 'How-To Guides' },
  { href: '/engineering-library', label: 'Engineering Library' },
  { href: '/articles', label: 'Articles' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/tables', label: 'Reference Tables' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/faq', label: 'Questions & Answers' },
  { href: '/topics', label: 'Topics' },
  { href: '/search', label: 'Search' },
];

const SITE_LINKS = [
  { href: '/sitemap', label: 'Sitemap' },
  { href: LEGAL.disclaimer.path, label: 'Information Disclaimer' },
  { href: '/editorial-standards', label: 'Editorial Standards' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms of Use' },
];

const ABOUT_LINKS = [
  { href: '/about/site', label: 'About CurryControls.com' },
  { href: LEGAL.ownershipPage.path, label: LEGAL.ownershipPage.linkLabel },
  { href: '/about/eric-sullivan', label: 'About Eric Sullivan' },
  { href: '/tools-projects', label: 'Tools & Projects' },
  { href: '/contact', label: 'Contact Eric' },
];

export function SiteFooter() {
  return (
    <footer className="cc-no-print mt-auto border-t border-[hsl(var(--rule))] bg-[hsl(var(--navy))] text-white/80">
      <div className="cc-container py-12">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="cc-mono text-[1.02rem] font-bold tracking-tight text-white">
              CURRYCONTROLS.COM
            </div>
            <div className="mt-1 text-[0.8rem] text-white/65">
              Controls &amp; Automation Knowledge Hub
            </div>
            <p className="mt-4 max-w-sm text-[0.85rem] leading-6 text-white/70">
              An independent technical knowledge and project website registered and managed by{' '}
              {CONTACT.person}, covering control systems, automation, instrumentation, engineering,
              and the water and wastewater industry.
            </p>

            <div className="mt-5 rounded border border-white/15 p-3.5">
              <div className="text-[0.68rem] uppercase tracking-wider text-white/55">
                Questions? Contact
              </div>
              <div className="mt-0.5 text-[0.9rem] font-semibold text-white">{CONTACT.person}</div>
              <a
                href={CONTACT.phoneHref}
                data-phone-placement="footer"
                className="mt-1.5 inline-flex items-center gap-2"
                data-testid="link-phone-footer"
                title={LEGAL.phoneLabel}
                aria-label={`${LEGAL.phoneLabel}, ${CONTACT.phoneDisplay}`}
              >
                <Phone size={14} aria-hidden="true" />
                <span className="cc-phone">{CONTACT.phoneDisplay}</span>
              </a>
              <p className="mt-2 text-[0.72rem] leading-5 text-white/55">
                {CONTACT.person}'s contact information for {SITE.name} and his personal projects.
              </p>
            </div>
          </div>

          <FooterColumn title="Knowledge Base" links={KNOWLEDGE_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />

          <div>
            <FooterHeading>Personal Projects</FooterHeading>
            <ul className="space-y-1.5">
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/tools-projects/eric-sullivans-personal-projects/${project.slug}`}
                    className="text-[0.85rem] text-white/70 hover:text-white"
                  >
                    {project.name}
                  </Link>
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1.5 inline-block text-white/40 hover:text-white/80"
                      aria-label={`Visit ${project.domain}`}
                    >
                      <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.72rem] leading-5 text-white/50">{DISCLAIMERS.projects}</p>

            <div className="mt-6">
              <FooterHeading>About</FooterHeading>
              <ul className="space-y-1.5">
                {ABOUT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.85rem] text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <FooterHeading>Site</FooterHeading>
              <ul className="space-y-1.5">
                {SITE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.85rem] text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ownership and non-affiliation. Readable, not fine print. */}
        <div className="mt-10 border-t border-white/12 pt-6">
          <p className="max-w-4xl text-[0.86rem] leading-6.5 text-white/85" data-testid="footer-legal">
            {LEGAL.footer}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Legal and site information">
            {LEGAL.footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.8rem] font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 space-y-3 border-t border-white/12 pt-5 text-[0.78rem] leading-5.5 text-white/60">
          <p data-testid="footer-risk">
            {DISCLAIMERS.risk} {DISCLAIMERS.engineering}{' '}
            <Link href={LEGAL.disclaimer.path} className="cc-link">
              Read the Information &amp; Calculator Disclaimer.
            </Link>
          </p>
          <p data-testid="footer-manufacturers">{DISCLAIMERS.endorsement}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span>© {SITE.founded} {SITE.name}</span>
            <span className="cc-mono text-white/40">
              {CONTACT.person} · {CONTACT.phoneDisplay}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.11em] text-white">
      {children}
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[0.85rem] text-white/70 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
