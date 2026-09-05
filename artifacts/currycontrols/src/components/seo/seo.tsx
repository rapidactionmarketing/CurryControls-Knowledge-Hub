import { useEffect } from 'react';
import { SITE } from '@/data/site';
import { absoluteUrl } from '@/lib/structured-data';

export type SeoProps = {
  title: string;
  description: string;
  /** Absolute path, e.g. "/controls/plc-systems". */
  path: string;
  /** Serialized JSON-LD graph. */
  jsonLd?: string;
  /** Set on pages that should not be indexed, such as search results. */
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

const MANAGED = 'data-cc-seo';

/**
 * Head state captured during server rendering.
 *
 * The prerender step reads this after renderToString so that each generated
 * HTML file carries the correct title, description, canonical URL, social
 * cards, and JSON-LD without executing any JavaScript.
 */
export const ssrHead: { current: SeoProps | null } = { current: null };

function setMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    element.setAttribute(MANAGED, 'true');
    document.head.appendChild(element);
  }
  for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

/**
 * Head manager for a single-page app.
 *
 * Sets the title, description, canonical URL, robots directives, Open Graph
 * and Twitter cards, and the page's JSON-LD graph. The prerender step renders
 * each route to static HTML at build time, so crawlers that do not execute
 * JavaScript still receive fully formed metadata.
 */
export function Seo({
  title,
  description,
  path,
  jsonLd,
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords,
}: SeoProps) {
  const fullTitle = title === SITE.name ? title : `${title} | ${SITE.name}`;
  const canonical = absoluteUrl(path);

  if (typeof document === 'undefined') {
    ssrHead.current = {
      title,
      description,
      path,
      jsonLd,
      noindex,
      type,
      publishedTime,
      modifiedTime,
      keywords,
    };
  }

  useEffect(() => {
    document.title = fullTitle;

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('link[rel="canonical"]', { rel: 'canonical', href: canonical });
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    if (keywords?.length) {
      setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    } else {
      removeMeta('meta[name="keywords"]');
    }

    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE.name });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: SITE.locale });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });

    if (type === 'article' && publishedTime) {
      setMeta('meta[property="article:published_time"]', {
        property: 'article:published_time',
        content: publishedTime,
      });
      setMeta('meta[property="article:modified_time"]', {
        property: 'article:modified_time',
        content: modifiedTime ?? publishedTime,
      });
      setMeta('meta[property="article:author"]', {
        property: 'article:author',
        content: 'Eric Sullivan',
      });
    } else {
      removeMeta('meta[property="article:published_time"]');
      removeMeta('meta[property="article:modified_time"]');
      removeMeta('meta[property="article:author"]');
    }
  }, [fullTitle, description, canonical, noindex, type, publishedTime, modifiedTime, keywords]);

  useEffect(() => {
    const id = 'cc-json-ld';
    document.getElementById(id)?.remove();
    if (!jsonLd) return;

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = jsonLd;
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [jsonLd]);

  return null;
}
