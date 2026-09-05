import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircuitBoard,
  Clock3,
  Database,
  FileCode2,
  FileText,
  Filter,
  FlaskConical,
  Gauge,
  HardHat,
  Library,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare,
  X,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const OWNERSHIP_NOTICE =
  'CurryControls.com is currently owned and maintained by Eric Sullivan. Eric Sullivan is not affiliated with Curry Controls Company. Eric previously worked with Curry Controls Company and left the company in 2021. He is currently employed by General Control Systems, Inc. General Control Systems, Inc. is a separate company and is not affiliated with Curry Controls Company.';

const INFORMATIONAL_DISCLAIMER =
  'References to manufacturers, software platforms, products, companies, or organizations are provided for informational purposes and do not imply sponsorship, endorsement, or affiliation unless specifically stated.';

type IconType = typeof BookOpen;

const navItems = [
  { href: '/controls', label: 'Controls' },
  { href: '/water-wastewater', label: 'Water + wastewater' },
  { href: '/troubleshooting', label: 'Troubleshooting' },
  { href: '/engineering-library', label: 'Engineering library' },
  { href: '/tools-projects', label: 'Tools in progress' },
];

const topics: { title: string; description: string; href: string; icon: IconType; count: string }[] = [
  { title: 'PLC programming', description: 'Logic patterns, sequence design, and implementation notes.', href: '/controls', icon: CircuitBoard, count: '12 topic areas' },
  { title: 'SCADA + HMI', description: 'Operator experience, alarming, historian, and tag architecture.', href: '/controls', icon: SlidersHorizontal, count: '8 topic areas' },
  { title: 'Instrumentation', description: 'Signals, calibration, loops, and practical field checks.', href: '/controls', icon: Gauge, count: '9 topic areas' },
  { title: 'Electrical engineering', description: 'Panels, drawings, power distribution, and commissioning.', href: '/engineering-library', icon: Zap, count: '11 topic areas' },
  { title: 'Water + wastewater', description: 'Process context for lift stations, treatment, and utilities.', href: '/water-wastewater', icon: FlaskConical, count: '7 topic areas' },
  { title: 'Troubleshooting', description: 'A methodical starting point when a system is not behaving.', href: '/troubleshooting', icon: Wrench, count: 'Field reference' },
];

const articles = [
  { id: 'a-01', title: 'Controls reference notes are being assembled', category: 'Coming soon', type: 'Reference', date: 'In preparation', read: '—', description: 'A practical publishing series for the decisions that usually live in a commissioning notebook.' },
  { id: 'a-02', title: 'What belongs in a useful PLC project handoff?', category: 'Coming soon', type: 'Controls', date: 'In preparation', read: '—', description: 'A future field guide to the files, notes, and context that make a project maintainable after turnover.' },
  { id: 'a-03', title: 'Water and wastewater process context', category: 'Coming soon', type: 'Water + wastewater', date: 'In preparation', read: '—', description: 'An upcoming collection connecting process intent to the control decisions technicians see in the field.' },
  { id: 'a-04', title: 'A troubleshooting starting point for intermittent faults', category: 'Coming soon', type: 'Troubleshooting', date: 'In preparation', read: '—', description: 'A future structured approach for separating symptoms, evidence, and likely causes without guesswork.' },
  { id: 'a-05', title: 'Engineering library index', category: 'Coming soon', type: 'Library', date: 'In preparation', read: '—', description: 'The first index of reference material, terminology, standards, and project documentation patterns.' },
];

const projects = [
  { id: 'suiteplans', name: 'SuitePlans', eyebrow: 'Project 01', icon: FileCode2, summary: 'A planning workspace for organizing control-system scope, assumptions, and deliverables.', status: 'Under development', href: '/projects/suiteplans', detail: 'A structured place for the early decisions that are often scattered across markups, email, and field notes.' },
  { id: 'suitebids', name: 'SuiteBids', eyebrow: 'Project 02', icon: Database, summary: 'A future bid and estimate companion for technical scope review.', status: 'Early concept', href: '/projects/suitebids', detail: 'A supporting project focused on making technical bid review easier to inspect and revisit.' },
  { id: 'keydocs', name: 'KeyDocs', eyebrow: 'Project 03', icon: Library, summary: 'A document index concept for the drawings and records a project depends on.', status: 'Under development', href: '/projects/keydocs', detail: 'A future way to keep the important project documents close to the context where they are used.' },
  { id: 'securelyfax', name: 'SecurelyFax', eyebrow: 'Project 04', icon: ShieldCheck, summary: 'A secure document transmission concept for technical workflows.', status: 'Exploring', href: '/projects/securelyfax', detail: 'An early exploration into a focused utility for sending technical records with clear handling.' },
];

const projectBySlug = Object.fromEntries(projects.map((project) => [project.id, project]));

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'CurryControls.com | Controls & Automation Knowledge Hub',
    description: 'Practical reference material for control systems, PLCs, SCADA, instrumentation, industrial networking, and water and wastewater controls.',
  },
  '/controls': {
    title: 'Controls Knowledge Base | CurryControls.com',
    description: 'Explore practical controls topics spanning PLCs, SCADA, instrumentation, panels, networking, and OT cybersecurity.',
  },
  '/water-wastewater': {
    title: 'Water & Wastewater Controls | CurryControls.com',
    description: 'A growing technical reference for treatment plants, lift stations, pumping, telemetry, instrumentation, and utility controls.',
  },
  '/troubleshooting': {
    title: 'Control System Troubleshooting | CurryControls.com',
    description: 'A problem-oriented starting point for diagnosing PLC, instrumentation, networking, SCADA, and pump-control issues.',
  },
  '/engineering-library': {
    title: 'Engineering Library | CurryControls.com',
    description: 'An organized home for engineering references, diagrams, checklists, control narratives, and commissioning resources.',
  },
  '/tools-projects': {
    title: 'Tools & Projects Under Development | CurryControls.com',
    description: 'Independent software and technology projects being explored around engineering, estimating, documentation, and technical workflows.',
  },
  '/projects/suiteplans': {
    title: 'SuitePlans | CurryControls.com',
    description: 'A project note for SuitePlans, an early concept for organizing control-system planning and engineering workflows.',
  },
  '/projects/suitebids': {
    title: 'SuiteBids | CurryControls.com',
    description: 'A project note for SuiteBids, an early concept for technical bid review, estimating, and scope workflows.',
  },
  '/projects/keydocs': {
    title: 'KeyDocs | CurryControls.com',
    description: 'A project note for KeyDocs, an early concept for organizing project documents and technical information.',
  },
  '/projects/securelyfax': {
    title: 'SecurelyFax | CurryControls.com',
    description: 'A project note for SecurelyFax, an early concept for modern document transmission workflows.',
  },
  '/articles': {
    title: 'Technical Articles | CurryControls.com',
    description: 'A clear publishing queue for future controls, water, troubleshooting, engineering, and instrumentation reference content.',
  },
  '/about': {
    title: 'About CurryControls.com',
    description: 'Learn what CurryControls.com is, who maintains it, and how it is positioned as an independent technical information resource.',
  },
};

function SeoMetadata() {
  const [location] = useLocation();
  const pathname = location.split('?')[0] || '/';
  const metadata = pageMetadata[pathname] ?? {
    title: 'CurryControls.com | Technical Knowledge Hub',
    description: 'An independent technical resource for controls, automation, instrumentation, engineering, and water and wastewater systems.',
  };

  useEffect(() => {
    document.title = metadata.title;
    const canonicalUrl = `${window.location.origin}${pathname}`;
    const upsertMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    upsertMeta('meta[name="description"]', 'name', 'description', metadata.description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let schema = document.head.querySelector<HTMLScriptElement>('#currycontrols-site-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'currycontrols-site-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CurryControls.com',
      url: window.location.origin,
      description: metadata.description,
      maintainer: {
        '@type': 'Person',
        name: 'Eric Sullivan',
      },
    });
  }, [metadata.description, metadata.title, pathname]);

  return null;
}

function NoticeGate() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    try {
      setAccepted(sessionStorage.getItem('curryNoticeAccepted') === 'true');
    } catch {
      setAccepted(false);
    }
  }, []);

  if (accepted) return null;

  const accept = () => {
    try {
      sessionStorage.setItem('curryNoticeAccepted', 'true');
    } catch {
      // If storage is unavailable, the notice intentionally remains visible.
      return;
    }
    setAccepted(true);
  };

  return (
    <div className="cc-notice-backdrop" role="dialog" aria-modal="true" aria-labelledby="ownership-title">
      <div className="cc-notice rounded-xl p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <div className="cc-label mb-2">Important information</div>
            <h2 id="ownership-title" className="cc-display text-2xl font-bold tracking-tight text-[hsl(var(--primary))]">Before you continue</h2>
          </div>
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">
            <ShieldCheck size={19} aria-hidden="true" />
          </div>
        </div>
        <p className="text-[15px] leading-7 text-[hsl(var(--foreground))]">{OWNERSHIP_NOTICE}</p>
        <div className="mt-6 border-t border-[hsl(var(--border))] pt-5">
          <p className="text-xs leading-5 text-[hsl(var(--muted-foreground))]">This notice is informational. It is not an agreement or waiver.</p>
          <button data-testid="button-accept-notice" type="button" onClick={accept} className="cc-btn-primary mt-5 w-full sm:w-auto">
            <Check size={16} aria-hidden="true" /> ACCEPT &amp; CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    setLocation(query.trim() ? `/articles?search=${encodeURIComponent(query.trim())}` : '/articles');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/.94)] backdrop-blur">
      <div className="cc-container flex min-h-[72px] items-center justify-between gap-5">
        <Link data-testid="link-brand" href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="grid size-9 place-items-center rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            <TerminalSquare size={20} aria-hidden="true" />
          </div>
          <div>
            <div className="cc-display text-[17px] font-bold tracking-tight text-[hsl(var(--primary))]">CurryControls<span className="text-[hsl(var(--accent))]">.com</span></div>
            <div className="cc-mono text-[9px] uppercase text-[hsl(var(--muted-foreground))]">technical knowledge hub</div>
          </div>
        </Link>
        <nav className="cc-nav-links flex items-center gap-5" aria-label="Primary navigation">
          {navItems.slice(0, 4).map((item) => (
            <Link data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} key={item.href} href={item.href} className={`text-[13px] font-semibold transition-colors hover:text-[hsl(var(--accent))] ${location === item.href ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--muted-foreground))]'}`}>{item.label}</Link>
          ))}
          <Link data-testid="link-tools-projects" href="/tools-projects" className="cc-btn-outline px-3 py-2 text-xs">Tools in progress <ArrowRight size={14} /></Link>
        </nav>
        <div className="flex items-center gap-2">
          <form onSubmit={submitSearch} className="hidden items-center gap-2 lg:flex">
            <label className="sr-only" htmlFor="header-search">Search CurryControls</label>
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" aria-hidden="true" />
              <input data-testid="input-header-search" id="header-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reference..." className="cc-input w-44 py-2 pl-9 text-xs" />
            </div>
          </form>
          <button data-testid="button-mobile-menu" type="button" className="rounded-md p-2 text-[hsl(var(--primary))] lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] lg:hidden">
          <div className="cc-container py-4">
            <form onSubmit={submitSearch} className="mb-4 flex gap-2">
              <label className="sr-only" htmlFor="mobile-search">Search CurryControls</label>
              <input data-testid="input-mobile-search" id="mobile-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the hub..." className="cc-input text-sm" />
              <button data-testid="button-mobile-search" type="submit" className="cc-btn-primary px-3" aria-label="Search"><Search size={17} /></button>
            </form>
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {[...navItems, { href: '/articles', label: 'Articles' }, { href: '/about', label: 'About' }].map((item) => (
                <Link data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`} key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[hsl(var(--border))] py-3 text-sm font-semibold text-[hsl(var(--primary))]">{item.label}<ArrowRight size={15} className="float-right mt-0.5" /></Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
      <div className="cc-container grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="cc-display text-lg font-bold">CurryControls<span className="text-[hsl(var(--accent))]">.com</span></div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[hsl(var(--primary-foreground)/.7)]">A practical technical knowledge hub for controls, automation, instrumentation, electrical, and water/wastewater professionals.</p>
        </div>
        <div>
          <div className="cc-mono mb-3 text-[10px] uppercase text-[hsl(var(--accent))]">Explore</div>
          <div className="grid gap-2 text-sm text-[hsl(var(--primary-foreground)/.75)]">
            <Link data-testid="link-footer-controls" href="/controls" className="hover:text-[hsl(var(--primary-foreground))]">Controls</Link>
            <Link data-testid="link-footer-water" href="/water-wastewater" className="hover:text-[hsl(var(--primary-foreground))]">Water + wastewater</Link>
            <Link data-testid="link-footer-troubleshooting" href="/troubleshooting" className="hover:text-[hsl(var(--primary-foreground))]">Troubleshooting</Link>
            <Link data-testid="link-footer-library" href="/engineering-library" className="hover:text-[hsl(var(--primary-foreground))]">Engineering library</Link>
          </div>
        </div>
        <div>
          <div className="cc-mono mb-3 text-[10px] uppercase text-[hsl(var(--accent))]">Notes</div>
          <p className="text-xs leading-5 text-[hsl(var(--primary-foreground)/.62)]">{INFORMATIONAL_DISCLAIMER}</p>
        </div>
      </div>
      <div className="cc-container border-t border-[hsl(var(--primary-foreground)/.16)] py-5 text-xs text-[hsl(var(--primary-foreground)/.6)]">© 2026 CurryControls.com · Independent technical publishing project</div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="cc-page">
      <SeoMetadata />
      <Header />
      <main>{children}</main>
      <Footer />
      <NoticeGate />
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <div className="cc-label mb-3">{eyebrow}</div>
        <h2 className="cc-display text-3xl font-bold tracking-[-.03em] text-[hsl(var(--primary))] md:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-xl text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function SearchStrip() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocation(query.trim() ? `/articles?search=${encodeURIComponent(query.trim())}` : '/articles');
  };
  return (
    <div className="relative z-10 mx-auto -mt-8 w-[min(100%-28px,900px)] rounded-lg border border-[hsl(198_42%_63%)] bg-[hsl(var(--card))] p-3 shadow-[0_14px_34px_hsl(214_43%_15%/.12)] sm:p-4">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--accent))]" aria-hidden="true" />
          <label htmlFor="hero-search" className="sr-only">Search the technical reference</label>
          <input data-testid="input-hero-search" id="hero-search" value={query} onChange={(event) => setQuery(event.target.value)} className="cc-input h-12 pl-12 text-sm" placeholder="Search topics, terms, or field questions..." />
        </div>
        <button data-testid="button-hero-search" type="submit" className="cc-btn-primary h-12 px-6">Search reference <ArrowRight size={16} /></button>
      </form>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 px-1 text-[11px] text-[hsl(var(--muted-foreground))]"><span>Try:</span><button data-testid="button-search-suggestion-plc" type="button" onClick={() => setQuery('PLC programming')} className="cc-link">PLC programming</button><button data-testid="button-search-suggestion-alarming" type="button" onClick={() => setQuery('alarm management')} className="cc-link">alarm management</button><button data-testid="button-search-suggestion-instrumentation" type="button" onClick={() => setQuery('instrumentation')} className="cc-link">instrumentation</button></div>
    </div>
  );
}

function TopicCard({ topic }: { topic: typeof topics[number] }) {
  const Icon = topic.icon;
  return (
    <Link data-testid={`card-topic-${topic.title.toLowerCase().replaceAll(' ', '-')}`} href={topic.href} className="cc-card group block rounded-lg p-5">
      <div className="mb-7 flex items-start justify-between">
        <div className="grid size-10 place-items-center rounded-md bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Icon size={19} aria-hidden="true" /></div>
        <ArrowRight size={17} className="text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]" aria-hidden="true" />
      </div>
      <h3 className="cc-display text-lg font-bold text-[hsl(var(--primary))]">{topic.title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{topic.description}</p>
      <div className="cc-mono mt-5 text-[10px] uppercase text-[hsl(var(--accent))]">{topic.count}</div>
    </Link>
  );
}

function ArticleCard({ article, compact = false }: { article: typeof articles[number]; compact?: boolean }) {
  return (
    <div data-testid={`card-article-${article.id}`} className={`cc-card rounded-lg p-5 ${compact ? '' : 'md:p-6'}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="cc-tag">{article.category}</span>
        <span className="cc-mono text-[10px] text-[hsl(var(--muted-foreground))]">{article.date}</span>
      </div>
      <h3 className="cc-display mt-5 text-xl font-bold leading-snug text-[hsl(var(--primary))]">{article.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{article.description}</p>
      <div className="mt-6 flex items-center gap-3 text-[11px] text-[hsl(var(--muted-foreground))]"><span>{article.type}</span><span className="size-1 rounded-full bg-[hsl(var(--accent))]" /><span>{article.read} read</span><Clock3 size={14} className="ml-auto" aria-hidden="true" /></div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="cc-hero-wash relative overflow-hidden text-[hsl(var(--primary-foreground))]">
        <div className="absolute inset-0 opacity-[.1] cc-grid" />
        <div className="cc-container relative grid gap-12 py-20 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-28">
          <div className="cc-animate">
            <div className="cc-label mb-5 text-[hsl(190_70%_75%)]">Field reference / independent publishing</div>
            <h1 className="cc-display max-w-3xl text-5xl font-bold leading-[.98] tracking-[-.06em] md:text-7xl">Practical answers for systems that have to run.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[hsl(var(--primary-foreground)/.76)] md:text-lg">CurryControls.com is a technical knowledge hub for the people who design, program, commission, troubleshoot, and maintain industrial control systems.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link data-testid="link-explore-controls" href="/controls" className="cc-btn-primary bg-[hsl(var(--accent))] text-[hsl(var(--primary))] hover:bg-[hsl(196_79%_55%)]">Explore controls <ArrowRight size={16} /></Link><Link data-testid="link-about-hub" href="/about" className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--primary-foreground)/.3)] px-4 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground)/.08)]">About the hub</Link></div>
          </div>
          <div className="relative hidden min-h-[280px] md:block">
            <div className="absolute right-0 top-5 w-[min(100%,390px)] border border-[hsl(var(--primary-foreground)/.2)] bg-[hsl(var(--primary)/.25)] p-5 backdrop-blur-sm">
              <div className="cc-mono mb-8 flex items-center justify-between text-[10px] text-[hsl(190_70%_75%)]"><span>REFERENCE_SYSTEM</span><span>CC / 001</span></div>
              <div className="space-y-5">
                {['Context before code', 'Evidence before guesses', 'Notes that survive turnover'].map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-[hsl(var(--primary-foreground)/.15)] pb-4"><span className="cc-mono text-[10px] text-[hsl(190_70%_75%)]">0{index + 1}</span><span className="text-sm">{item}</span></div>)}
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs text-[hsl(var(--primary-foreground)/.65)]"><span className="size-2 rounded-full bg-[hsl(155_50%_60%)]" /> publishing system online</div>
            </div>
          </div>
        </div>
      </section>
      <SearchStrip />
      <section className="cc-section cc-container">
        <SectionHeading eyebrow="01 / Start here" title="A working index for controls people" description="Start with the system area you need, then follow the trail toward the details. The structure is intentionally broad enough for a real technical library to grow into." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{topics.map((topic) => <TopicCard key={topic.title} topic={topic} />)}</div>
      </section>
      <section className="border-y border-[hsl(var(--border))] bg-[hsl(196_43%_93%/.58)]">
        <div className="cc-container grid gap-10 py-16 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div><div className="cc-label mb-3">02 / Process context</div><h2 className="cc-display text-3xl font-bold tracking-[-.03em] text-[hsl(var(--primary))] md:text-4xl">Water and wastewater, with the process in view.</h2><p className="mt-4 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">Control decisions make more sense when they are tied to what the pumps, basins, valves, and instruments are trying to do.</p><Link data-testid="link-water-section" href="/water-wastewater" className="cc-link-arrow mt-6">Open water + wastewater <ArrowRight size={16} /></Link></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {['Lift stations', 'Treatment processes', 'Instrumentation'].map((item, index) => <div key={item} className="cc-card-static rounded-lg border border-[hsl(198_42%_72%)] bg-[hsl(var(--card))] p-5"><div className="cc-mono text-[10px] text-[hsl(var(--accent))]">0{index + 1}</div><h3 className="cc-display mt-12 text-base font-bold text-[hsl(var(--primary))]">{item}</h3><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Topic collection</p></div>)}
          </div>
        </div>
      </section>
      <section className="cc-section cc-container">
        <SectionHeading eyebrow="03 / Field method" title="When the system is not behaving" description="Troubleshooting content is being shaped around a repeatable habit: define the symptom, preserve the evidence, isolate the boundary, and change one thing at a time." action={<Link data-testid="link-troubleshooting-section" href="/troubleshooting" className="cc-link-arrow">Troubleshooting index <ArrowRight size={16} /></Link>} />
        <div className="grid gap-4 md:grid-cols-3">
          {['Observe', 'Separate', 'Verify'].map((item, index) => <div key={item} className="cc-card rounded-lg p-6"><div className="cc-mono text-[10px] text-[hsl(var(--accent))]">STEP 0{index + 1}</div><h3 className="cc-display mt-8 text-2xl font-bold text-[hsl(var(--primary))]">{item}</h3><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{['Write down what is actually happening before naming a cause.', 'Draw the line between field device, network, logic, and display.', 'Make the smallest safe test that can confirm or reject the idea.'][index]}</p></div>)}
        </div>
      </section>
      <section className="bg-[hsl(var(--primary))] py-16 text-[hsl(var(--primary-foreground))]">
        <div className="cc-container grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-end"><div><div className="cc-label mb-3 text-[hsl(190_70%_75%)]">04 / Engineering library</div><h2 className="cc-display text-3xl font-bold tracking-[-.03em] md:text-4xl">The reference shelf is still being built.</h2><p className="mt-4 max-w-md text-sm leading-7 text-[hsl(var(--primary-foreground)/.7)]">Terminology, project documentation patterns, field notes, and engineering context — organized for the moment you need a reliable place to begin.</p><Link data-testid="link-engineering-library" href="/engineering-library" className="cc-link-arrow mt-6 text-[hsl(190_70%_75%)]">Browse the library <ArrowRight size={16} /></Link></div><div className="grid gap-3 sm:grid-cols-2">{['Reference terminology', 'Panel + drawing notes', 'Commissioning records', 'Standards context'].map((item) => <div key={item} className="border border-[hsl(var(--primary-foreground)/.18)] p-4 text-sm text-[hsl(var(--primary-foreground)/.82)]"><BookOpen size={16} className="mb-8 text-[hsl(190_70%_75%)]" /><span>{item}</span></div>)}</div></div>
      </section>
      <section className="cc-section cc-container">
        <SectionHeading eyebrow="05 / Publishing queue" title="Technical content, carefully marked" description="Sample entries show the shape of the publishing system. They are placeholders until the underlying technical notes are ready." action={<Link data-testid="link-all-articles" href="/articles" className="cc-link-arrow">View all articles <ArrowRight size={16} /></Link>} />
        <div className="grid gap-4 lg:grid-cols-3">{articles.slice(0, 3).map((article) => <ArticleCard key={article.id} article={article} />)}</div>
      </section>
      <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))] py-16">
        <div className="cc-container"><SectionHeading eyebrow="06 / Supporting tools" title="Software projects under development" description="These projects support the work around technical publishing and project delivery. They are not the primary product of CurryControls.com." action={<Link data-testid="link-tools-section" href="/tools-projects" className="cc-link-arrow">See project notes <ArrowRight size={16} /></Link>} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{projects.map((project) => { const Icon = project.icon; return <Link data-testid={`card-project-${project.id}`} href={project.href} key={project.id} className="cc-card group rounded-lg p-5"><Icon size={19} className="text-[hsl(var(--accent))]" aria-hidden="true" /><div className="cc-mono mt-7 text-[10px] text-[hsl(var(--muted-foreground))]">{project.eyebrow}</div><h3 className="cc-display mt-2 text-lg font-bold text-[hsl(var(--primary))]">{project.name}</h3><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">{project.summary}</p><div className="mt-6 text-[10px] uppercase tracking-[.1em] text-[hsl(var(--accent))]">{project.status}</div></Link>; })}</div></div>
      </section>
      <section className="cc-section cc-container">
        <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center"><div><div className="cc-label mb-3">07 / Keep in touch</div><h2 className="cc-display text-3xl font-bold tracking-[-.03em] text-[hsl(var(--primary))]">A quiet newsletter for useful notes.</h2><p className="mt-4 max-w-lg text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">The newsletter is a placeholder for now. When publishing begins, it will be used for new reference notes and project updates — not a sales funnel.</p></div><div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5"><div className="cc-mono mb-3 text-[10px] text-[hsl(var(--accent))]">NEWSLETTER / NOT ACTIVE</div><div className="flex gap-2"><input data-testid="input-newsletter-email" type="email" placeholder="your@email.com" className="cc-input text-sm" disabled /><button data-testid="button-newsletter-submit" type="button" className="cc-btn-primary shrink-0 opacity-55" disabled>Notify me</button></div><p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">Signup will open when the first issue is ready.</p></div></div>
      </section>
      <section className="border-t border-[hsl(var(--border))] bg-[hsl(196_43%_93%/.6)] py-12"><div className="cc-container flex flex-col gap-4 md:flex-row md:items-start"><ShieldCheck size={22} className="shrink-0 text-[hsl(var(--accent))]" /><div><div className="cc-label mb-2">Independent ownership</div><p className="max-w-4xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">CurryControls.com is owned and maintained by Eric Sullivan. It is an independent technical publishing project and is not affiliated with Curry Controls Company or General Control Systems, Inc.</p><Link data-testid="link-about-ownership" href="/about" className="cc-link-arrow mt-4 text-sm">Read the full notice <ArrowRight size={15} /></Link></div></div></section>
    </>
  );
}

function PageIntro({ eyebrow, title, description, icon: Icon = BookOpen }: { eyebrow: string; title: string; description: string; icon?: IconType }) {
  return <section className="cc-hero-wash text-[hsl(var(--primary-foreground))]"><div className="cc-container grid gap-8 py-16 md:grid-cols-[1fr_220px] md:items-end md:py-20"><div><div className="cc-label mb-4 text-[hsl(190_70%_75%)]">{eyebrow}</div><h1 className="cc-display max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-.05em] md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[hsl(var(--primary-foreground)/.72)]">{description}</p></div><div className="hidden border border-[hsl(var(--primary-foreground)/.2)] p-5 md:block"><Icon size={27} className="text-[hsl(190_70%_75%)]" /><div className="cc-mono mt-12 text-[10px] text-[hsl(var(--primary-foreground)/.58)]">INDEX / ACTIVE</div></div></div></section>;
}

function TopicPage({ kind }: { kind: 'controls' | 'water' | 'troubleshooting' | 'library' }) {
  const config = {
    controls: { eyebrow: 'Controls / index', title: 'Controls engineering, from signal to sequence.', description: 'A growing map for PLC programmers, SCADA developers, instrumentation technicians, integrators, and the people who inherit their systems.', icon: CircuitBoard, items: ['PLC programming', 'SCADA + HMI', 'Instrumentation', 'Networks + communications', 'Panel + electrical', 'Commissioning'] },
    water: { eyebrow: 'Water + wastewater / index', title: 'Process context for the systems that keep utilities moving.', description: 'A place to connect pumps, valves, levels, flows, treatment steps, and control intent — without losing the practical field perspective.', icon: FlaskConical, items: ['Lift stations', 'Pump control', 'Level + flow measurement', 'Treatment process context', 'Alarming + remote sites', 'Startup + commissioning'] },
    troubleshooting: { eyebrow: 'Troubleshooting / method', title: 'A calmer way to start when something is wrong.', description: 'Troubleshooting notes will focus on observable symptoms, useful evidence, and safe isolation — not a list of guesses pretending to be a diagnosis.', icon: Wrench, items: ['Signal path checks', 'PLC logic symptoms', 'HMI + SCADA symptoms', 'Network boundaries', 'Instrument behavior', 'Startup handoff'] },
    library: { eyebrow: 'Engineering library / shelf', title: 'Reference material for the work around the work.', description: 'Terminology, documentation patterns, project records, and engineering context that help technical teams communicate clearly over the life of a system.', icon: Library, items: ['Terminology', 'Drawing + panel records', 'Project handoff', 'Commissioning records', 'Standards context', 'Field documentation'] },
  }[kind];
  return <><PageIntro eyebrow={config.eyebrow} title={config.title} description={config.description} icon={config.icon} /><section className="cc-section cc-container"><SectionHeading eyebrow="Browse the index" title="Choose a starting point" description="These are structured placeholders for the publishing system. Detailed notes will be added as they are reviewed and ready for release." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{config.items.map((item, index) => <div data-testid={`card-index-${kind}-${index}`} key={item} className="cc-card rounded-lg p-6"><div className="cc-mono text-[10px] text-[hsl(var(--accent))]">0{index + 1}</div><h2 className="cc-display mt-10 text-xl font-bold text-[hsl(var(--primary))]">{item}</h2><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Coming Soon — this reference area is being assembled with practical, reviewable material.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--accent))]">Coming Soon <Clock3 size={14} /></span></div>)}</div></section><section className="border-t border-[hsl(var(--border))] bg-[hsl(196_43%_93%/.55)] py-14"><div className="cc-container"><div className="max-w-2xl"><div className="cc-label mb-3">Publishing note</div><p className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">{INFORMATIONAL_DISCLAIMER}</p></div></div></section></>;
}

function ArticlesPage() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('search') ?? '');
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Controls', 'Water + wastewater', 'Troubleshooting', 'Library'];
  const filtered = useMemo(() => articles.filter((article) => (category === 'All' || article.type === category) && `${article.title} ${article.description} ${article.type}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <><PageIntro eyebrow="Articles / publishing queue" title="Technical content with a visible status." description="A straightforward index for notes, references, and field-oriented writing. Sample entries are clearly marked until real articles are ready." icon={FileText} /><section className="cc-section cc-container"><div className="mb-8 flex flex-col gap-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 md:flex-row md:items-center"><div className="relative flex-1"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" /><label className="sr-only" htmlFor="article-filter">Filter articles</label><input data-testid="input-article-filter" id="article-filter" value={query} onChange={(event) => setQuery(event.target.value)} className="cc-input pl-9 text-sm" placeholder="Filter the publishing queue..." /></div><div className="flex flex-wrap items-center gap-2"><Filter size={15} className="text-[hsl(var(--muted-foreground))]" aria-hidden="true" />{categories.map((item) => <button data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`} type="button" key={item} onClick={() => setCategory(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${category === item ? 'border-[hsl(var(--accent))] bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent))]'}`}>{item}</button>)}</div></div><div className="mb-5 flex items-center justify-between"><p data-testid="text-article-count" className="cc-mono text-[10px] uppercase text-[hsl(var(--muted-foreground))]">{filtered.length} entries shown</p><span className="text-xs text-[hsl(var(--muted-foreground))]">All sample entries: Coming Soon</span></div>{filtered.length ? <div className="grid gap-4 md:grid-cols-2">{filtered.map((article) => <ArticleCard key={article.id} article={article} />)}</div> : <div className="rounded-lg border border-dashed border-[hsl(var(--border))] p-12 text-center"><Search size={22} className="mx-auto text-[hsl(var(--accent))]" /><h2 className="cc-display mt-4 text-xl font-bold text-[hsl(var(--primary))]">No entries match that filter</h2><button data-testid="button-clear-article-filter" type="button" onClick={() => { setQuery(''); setCategory('All'); }} className="cc-btn-outline mt-5">Clear filters</button></div>}</section></>;
}

function ToolsProjectsPage() {
  return <><PageIntro eyebrow="Tools + projects / under development" title="Supporting tools, kept in their proper place." description="The technical knowledge hub comes first. These projects are separate, early-stage ideas intended to support planning, documents, bids, and technical workflows." icon={HardHat} /><section className="cc-section cc-container"><SectionHeading eyebrow="Project register" title="Four ideas in motion" description="Project pages describe direction and status only. No product claims, pricing, or release promises are being made." /><div className="grid gap-4 md:grid-cols-2">{projects.map((project) => { const Icon = project.icon; return <Link data-testid={`card-tools-${project.id}`} key={project.id} href={project.href} className="cc-card group rounded-lg p-6"><div className="flex items-start justify-between"><div className="grid size-11 place-items-center rounded-md bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Icon size={20} /></div><span className="cc-tag">{project.status}</span></div><h2 className="cc-display mt-8 text-2xl font-bold text-[hsl(var(--primary))]">{project.name}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-[hsl(var(--muted-foreground))]">{project.detail}</p><span className="cc-link-arrow mt-7 text-sm">Read project note <ArrowRight size={15} /></span></Link>; })}</div></section></>;
}

function ProjectPage({ slug }: { slug: string }) {
  const project = projectBySlug[slug] ?? projects[0];
  const Icon = project.icon;
  return <><PageIntro eyebrow={`${project.eyebrow} / ${project.status}`} title={project.name} description={project.detail} icon={Icon} /><section className="cc-section cc-container"><div className="grid gap-12 md:grid-cols-[1.15fr_.85fr]"><div><div className="cc-label mb-3">Project note</div><h2 className="cc-display text-3xl font-bold tracking-[-.03em] text-[hsl(var(--primary))]">An idea being shaped in public.</h2><p className="mt-5 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">This project is currently a presentation-first placeholder. It may evolve as the underlying workflow becomes clearer. The page exists to keep the idea visible without overstating its maturity.</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{['Purpose', 'Status', 'Availability'].map((item, index) => <div key={item} className="border-l-2 border-[hsl(var(--accent))] pl-4"><div className="cc-mono text-[10px] text-[hsl(var(--muted-foreground))]">{item}</div><div className="mt-2 text-sm font-semibold text-[hsl(var(--primary))]">{['Technical workflow support', project.status, 'Not available'][index]}</div></div>)}</div></div><div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(196_43%_93%/.6)] p-6"><Icon size={24} className="text-[hsl(var(--accent))]" /><div className="cc-mono mt-10 text-[10px] text-[hsl(var(--muted-foreground))]">CURRENT SCOPE</div><ul className="mt-4 space-y-3 text-sm leading-6 text-[hsl(var(--primary))]"><li className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-[hsl(var(--accent))]" />Direction is documented</li><li className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-[hsl(var(--accent))]" />No public release claim</li><li className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-[hsl(var(--accent))]" />Feedback can shape the next note</li></ul></div></div></section><section className="border-t border-[hsl(var(--border))] py-12"><div className="cc-container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="cc-label mb-2">Back to the register</div><p className="text-sm text-[hsl(var(--muted-foreground))]">See what else is being explored alongside the reference library.</p></div><Link data-testid="link-projects-register" href="/tools-projects" className="cc-btn-outline">All tools + projects <ArrowRight size={15} /></Link></div></section></>;
}

function AboutPage() {
  return <><PageIntro eyebrow="About / independent ownership" title="A technical reference should be honest about what it is." description="CurryControls.com is being built as a durable place for practical technical publishing — with clear boundaries around ownership, affiliation, and what is still only a placeholder." icon={ShieldCheck} /><section className="cc-section cc-container"><div className="grid gap-12 md:grid-cols-[1.05fr_.95fr]"><div><div className="cc-label mb-3">The short version</div><h2 className="cc-display text-3xl font-bold tracking-[-.03em] text-[hsl(var(--primary))]">Useful notes over noisy promises.</h2><p className="mt-5 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">The site is for controls engineers, PLC programmers, SCADA developers, instrumentation technicians, electrical engineers, integrators, panel builders, and water/wastewater professionals. Its primary product is technical content: clear context, careful terminology, and practical starting points.</p><p className="mt-4 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">The software project pages are supporting ideas under development. They are intentionally described modestly until there is something real to release.</p></div><div className="rounded-lg border border-[hsl(198_42%_72%)] bg-[hsl(196_43%_93%/.6)] p-6"><div className="cc-label mb-4">Ownership notice</div><p className="text-sm leading-7 text-[hsl(var(--primary))]">{OWNERSHIP_NOTICE}</p></div></div></section><section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))] py-14"><div className="cc-container grid gap-8 md:grid-cols-3">{[['01', 'Independent', 'Not a corporate sales site or advertising channel.'], ['02', 'Practical', 'Built around the questions that appear during design, startup, and maintenance.'], ['03', 'Long-term', 'A publishing structure meant to grow carefully rather than quickly.']].map(([num, title, copy]) => <div key={num} className="border-t-2 border-[hsl(var(--accent))] pt-4"><div className="cc-mono text-[10px] text-[hsl(var(--accent))]">{num}</div><h3 className="cc-display mt-5 text-xl font-bold text-[hsl(var(--primary))]">{title}</h3><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{copy}</p></div>)}</div></section><section className="cc-section cc-container"><div className="max-w-3xl"><div className="cc-label mb-3">Informational disclaimer</div><p className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">{INFORMATIONAL_DISCLAIMER}</p></div></section></>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Home} /><Route path="/controls"><TopicPage kind="controls" /></Route><Route path="/water-wastewater"><TopicPage kind="water" /></Route><Route path="/troubleshooting"><TopicPage kind="troubleshooting" /></Route><Route path="/engineering-library"><TopicPage kind="library" /></Route><Route path="/tools-projects" component={ToolsProjectsPage} /><Route path="/projects/suiteplans"><ProjectPage slug="suiteplans" /></Route><Route path="/projects/suitebids"><ProjectPage slug="suitebids" /></Route><Route path="/projects/keydocs"><ProjectPage slug="keydocs" /></Route><Route path="/projects/securelyfax"><ProjectPage slug="securelyfax" /></Route><Route path="/articles" component={ArticlesPage} /><Route path="/about" component={AboutPage} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><Shell><Router /></Shell><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;