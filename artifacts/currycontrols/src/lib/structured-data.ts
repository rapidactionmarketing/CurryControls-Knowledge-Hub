/**
 * JSON-LD builders.
 *
 * Structured data is the machine-readable half of this site's answer-engine
 * and generative-engine optimization: it states, in a form crawlers and
 * language models consume directly, what each page is, who wrote it, what
 * question it answers, and where it sits in the taxonomy.
 */

import { CONTACT, SITE } from '@/data/site';
import type { Entry } from '@/data/content';
import type { NavEntry } from '@/data/nav-index';
import { describe } from '@/data/nav-index';
import type { Project } from '@/data/projects';

export type JsonLd = Record<string, unknown>;

const PERSON_ID = `${SITE.url}/about/eric-sullivan#person`;
const SITE_ID = `${SITE.url}/#website`;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path === '/' ? '/' : path}`;
}

/**
 * The Person entity. Deliberately states only what is factually true about
 * Eric Sullivan's relationship to this site — no employer branding, and no
 * implication of corporate succession.
 */
export function personSchema(): JsonLd {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: CONTACT.person,
    url: absoluteUrl('/about/eric-sullivan'),
    telephone: CONTACT.phoneE164,
    jobTitle: 'Controls and Automation Professional',
    knowsAbout: [
      'Programmable Logic Controllers',
      'SCADA Systems',
      'Industrial Instrumentation',
      'Control Panel Design',
      'Water and Wastewater Treatment Controls',
      'Industrial Networking',
      'Operational Technology Security',
    ],
    owns: {
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: SITE.name,
      url: SITE.url,
    },
  };
}

/** WebSite entity, including the search action for sitelinks search boxes. */
export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    alternateName: SITE.tagline,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': PERSON_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): JsonLd | null {
  if (faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

/**
 * TechArticle for reference and article content, HowTo for procedures.
 * HowTo uses the entry's `steps` block if it has one.
 */
export function contentSchema(entry: Entry): JsonLd {
  const base = {
    headline: entry.title,
    name: entry.title,
    description: entry.answer,
    abstract: entry.summary,
    url: absoluteUrl(entry.path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(entry.path) },
    datePublished: entry.published,
    dateModified: entry.updated,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en-US',
    keywords: entry.tags.join(', '),
    isAccessibleForFree: true,
    timeRequired: `PT${entry.readingTime}M`,
  };

  if (entry.kind === 'howto') {
    const steps = entry.blocks.find((block) => block.t === 'steps');
    return {
      '@type': 'HowTo',
      ...base,
      ...(entry.supplies?.length
        ? { supply: entry.supplies.map((s) => ({ '@type': 'HowToSupply', name: s })) }
        : {}),
      ...(steps && steps.t === 'steps'
        ? {
            step: steps.items.map((item, index) => ({
              '@type': 'HowToStep',
              position: index + 1,
              name: item.title,
              text: item.text,
              url: `${absoluteUrl(entry.path)}#step-${index + 1}`,
            })),
          }
        : {}),
    };
  }

  return {
    '@type': 'TechArticle',
    ...base,
    articleSection: entry.tags[0] ?? 'Controls',
    proficiencyLevel: 'Expert',
    ...(entry.kind === 'troubleshooting' && entry.symptom
      ? { about: { '@type': 'Thing', name: entry.symptom } }
      : {}),
  };
}

/** CollectionPage for a taxonomy node, listing the topics beneath it. */
export function collectionSchema(nav: NavEntry, children: NavEntry[]): JsonLd {
  return {
    '@type': 'CollectionPage',
    name: nav.node.title,
    description: describe(nav),
    url: absoluteUrl(nav.path),
    isPartOf: { '@id': SITE_ID },
    inLanguage: 'en-US',
    ...(children.length > 0
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: children.length,
            itemListElement: children.map((child, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: child.node.title,
              url: absoluteUrl(child.path),
            })),
          },
        }
      : {}),
  };
}

export function projectSchema(project: Project): JsonLd {
  return {
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.summary,
    applicationCategory: 'BusinessApplication',
    url: project.externalUrl || absoluteUrl(`/tools-projects/eric-sullivans-personal-projects/${project.slug}`),
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    // Availability is stated only through the status text; no offer is
    // implied for a project that is not released.
    ...(project.status === 'Available' ? {} : { releaseNotes: `Status: ${project.status}` }),
  };
}

export function contactPageSchema(): JsonLd {
  return {
    '@type': 'ContactPage',
    name: `Contact ${CONTACT.person}`,
    url: absoluteUrl('/contact'),
    description: `Contact ${CONTACT.person} about CurryControls.com, a controls or automation topic, or one of his personal projects. Phone ${CONTACT.phoneDisplay}.`,
    isPartOf: { '@id': SITE_ID },
    mainEntity: { '@id': PERSON_ID },
  };
}

/** Wraps entities into a single graph document. */
export function graph(...nodes: (JsonLd | null | undefined)[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter((node): node is JsonLd => Boolean(node)),
  });
}
