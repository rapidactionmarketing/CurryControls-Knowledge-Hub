import { useEffect } from 'react';
import { Redirect, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { getEntry, normalizePath } from '@/data/nav-index';
import { getContent } from '@/data/content';
import { PROJECT_BY_SLUG } from '@/data/projects';
import { HomePage } from '@/pages/home';
import { HubPage } from '@/pages/hub';
import { EntryPage } from '@/pages/entry';
import { SearchPage } from '@/pages/search';
import { ContactPage } from '@/pages/contact';
import { ArticlesPage, isArticleCategory } from '@/pages/articles';
import { ProjectDetailPage, ProjectsPage } from '@/pages/projects';
import { AboutEricPage, AboutSitePage, OwnershipPage } from '@/pages/about';
import { AnalyticsPage } from '@/pages/analytics';
import { GlossaryIndexPage, GlossaryTermPage, isGlossarySlug } from '@/pages/glossary';
import { FaqHubPage, SiteMapPage, TopicPage, TopicsIndexPage, isTagSlug } from '@/pages/discovery';
import {
  AccessibilityPage,
  DisclaimerPage,
  EditorialStandardsPage,
  PrivacyPage,
  TermsPage,
} from '@/pages/policies';
import {
  CalculatorPage,
  CalculatorsIndexPage,
  TablePage,
  TablesIndexPage,
} from '@/pages/calculators';
import { isCalculatorSlug } from '@/data/calculators';
import { isTableSlug } from '@/data/tables';
import NotFound from '@/pages/not-found';

const PROJECTS_BASE = '/tools-projects/eric-sullivans-personal-projects';

/**
 * Route resolution.
 *
 * Rather than declaring hundreds of routes, the taxonomy resolves the path:
 * a node with a written entry renders the article template, and any other
 * node renders its hub page. A handful of paths need bespoke pages and are
 * matched first.
 */
export function Routes() {
  const [location] = useLocation();
  const path = normalizePath(location);

  if (path === '/') return <HomePage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/search') return <SearchPage />;
  if (path === '/analytics') return <AnalyticsPage />;

  // Reference and discovery pages, deliberately at the site root: short URLs
  // and two clicks from anywhere via the footer.
  if (path === '/glossary') return <GlossaryIndexPage />;
  if (path.startsWith('/glossary/')) {
    const slug = path.slice('/glossary/'.length);
    if (isGlossarySlug(slug)) return <GlossaryTermPage slug={slug} />;
  }
  if (path === '/sitemap') return <SiteMapPage />;
  if (path === '/faq') return <FaqHubPage />;
  if (path === '/topics') return <TopicsIndexPage />;
  if (path.startsWith('/topics/')) {
    const slug = path.slice('/topics/'.length);
    if (isTagSlug(slug)) return <TopicPage slug={slug} />;
  }

  // Calculators and the reference tables behind them.
  if (path === '/calculators') return <CalculatorsIndexPage />;
  if (path.startsWith('/calculators/')) {
    const slug = path.slice('/calculators/'.length);
    if (isCalculatorSlug(slug)) return <CalculatorPage slug={slug} />;
  }
  if (path === '/tables') return <TablesIndexPage />;
  if (path.startsWith('/tables/')) {
    const slug = path.slice('/tables/'.length);
    if (isTableSlug(slug)) return <TablePage slug={slug} />;
  }

  if (path === '/disclaimer') return <DisclaimerPage />;
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/terms') return <TermsPage />;
  if (path === '/accessibility') return <AccessibilityPage />;
  if (path === '/editorial-standards') return <EditorialStandardsPage />;

  if (path === '/about/site') return <AboutSitePage />;
  if (path === '/about/ownership') return <OwnershipPage />;
  if (path === '/about/eric-sullivan') return <AboutEricPage />;
  if (path === '/about/personal-projects') return <Redirect to="/tools-projects" replace />;
  if (path === '/about/contact-eric') return <Redirect to="/contact" replace />;

  if (path === '/tools-projects' || path === PROJECTS_BASE) return <ProjectsPage />;
  if (path.startsWith(`${PROJECTS_BASE}/`)) {
    const slug = path.slice(PROJECTS_BASE.length + 1);
    if (slug in PROJECT_BY_SLUG) return <ProjectDetailPage slug={slug} />;
  }

  if (path === '/articles') return <ArticlesPage />;
  if (path.startsWith('/articles/')) {
    const slug = path.slice('/articles/'.length);
    if (isArticleCategory(slug)) return <ArticlesPage categorySlug={slug} />;
  }

  const nav = getEntry(path);
  if (!nav) return <NotFound />;

  const entry = getContent(path);
  if (entry) return <EntryPage entry={entry} nav={nav} />;
  return <HubPage nav={nav} />;
}

/** Header, routed main region, and footer. Shared by the app and the prerenderer. */
export function Shell() {
  const [location] = useLocation();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <a href="#main" className="cc-skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <ErrorBoundary resetKey={location}>
          <Routes />
        </ErrorBoundary>
      </main>
      <SiteFooter />
      {/* Reserves space so the sticky call bar never covers the last row of content. */}
      <div className="h-14 cc-mobile-only" aria-hidden="true" />
    </div>
  );
}

/** Puts a new page at the top after client-side navigation. */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  return null;
}
