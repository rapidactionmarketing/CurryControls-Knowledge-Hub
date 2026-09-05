/**
 * Ownership, non-affiliation, and disclaimer checks.
 *
 * These tests hold the site to the factual record in src/data/site-legal.ts:
 * the popup, the footer, the contact page, every calculator, every programming
 * example, llms.txt, the structured data, the metadata, and the project pages
 * say what the record says, and nothing in the source implies corporate
 * succession, a domain transfer, or an overstated ownership claim.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NoticeGate } from '@/components/layout/notice-gate';
import { SiteFooter } from '@/components/layout/site-footer';
import { ContentBlocks } from '@/components/blocks/content-blocks';
import { CalculatorForm } from '@/components/calculators/calculator-form';
import { ContactPage } from '@/pages/contact';
import { ProjectDetailPage } from '@/pages/projects';
import { CALCULATORS } from '@/data/calculators';
import { PROJECTS } from '@/data/projects';
import { ENTRIES } from '@/data/content';
import { DISCLAIMERS, SITE } from '@/data/site';
import {
  AI_CRAWLER_STATEMENT,
  ENTITIES,
  FOOTER_STATEMENT,
  LEGAL,
  NOTICE_POPUP,
  OWNERSHIP_STATEMENT,
  PROHIBITED_PHRASES,
  siteIdentity,
} from '@/data/site-legal';
import { contentSchema, graph, personSchema, projectSchema, websiteSchema } from '@/lib/structured-data';

const APP_ROOT = path.resolve(import.meta.dirname, '..', '..');

/** Phrases that imply corporate succession or a domain transfer. Case-insensitive. */
const SUCCESSION_PHRASES = [
  'now GCS',
  'became GCS',
  'successor company',
  'legacy continues',
  'Curry Controls legacy',
  'same trusted people',
  'our Lakeland team',
  'the same company',
  'former Curry Controls, now',
  'continues through',
  'acquired the domain',
  'purchased CurryControls.com',
  'acquired CurryControls.com',
  'transferred the domain',
  'domain was transferred',
  'took ownership from',
  'previous owner',
];

function includesAny(haystack: string, needles: readonly string[]): string[] {
  const lower = haystack.toLowerCase();
  return needles.filter((needle) => lower.includes(needle.toLowerCase()));
}

/** Every statement string in the legal record, flattened. */
function legalStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => legalStrings(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => legalStrings(item, out));
  return out;
}

/* ------------------------------------------------------------------ *
 * 1–8. The first-visit popup
 * ------------------------------------------------------------------ */

describe('first-visit notice', () => {
  const expectedBody = [
    'CurryControls.com is independently registered, maintained, and operated by Eric Sullivan in his individual capacity.',
    'Curry Controls Company was acquired by Revere Control Systems, Inc. in 2021.',
    'The prior registration of CurryControls.com later expired, completed the domain deletion process, and became publicly available for new registration. Eric Sullivan independently registered CurryControls.com in 2025 in his individual capacity.',
    'The website currently published at CurryControls.com contains new technical and project content managed and published by Eric Sullivan.',
    'Eric Sullivan was formerly employed by Curry Controls Company, and his employment with that company ended in 2021. He is currently employed by General Control Systems, Inc. His employment with General Control Systems is separate from CurryControls.com.',
    'CurryControls.com is not owned, operated, sponsored, endorsed, authorized, or maintained by Curry Controls Company, Revere Control Systems, Inc., S.J. Electro Systems, LLC, or General Control Systems, Inc.',
    'The current CurryControls.com website is not the official website, successor, continuation, or current operating business of Curry Controls Company, Revere Control Systems, Inc., or S.J. Electro Systems, LLC.',
    'Use of the CurryControls.com domain name should not be understood as indicating affiliation with or authorization by any of those companies.',
  ];

  it('uses the directive wording verbatim', () => {
    expect([...NOTICE_POPUP.paragraphs]).toEqual(expectedBody);
    expect(NOTICE_POPUP.heading).toBe('ABOUT CURRYCONTROLS.COM');
    expect(NOTICE_POPUP.technicalNotice.heading).toBe('TECHNICAL INFORMATION NOTICE');
    expect(NOTICE_POPUP.disclaimerLinkLabel).toBe('READ FULL INFORMATION & CALCULATOR DISCLAIMER');
    expect(NOTICE_POPUP.buttonLabel).toBe('ACKNOWLEDGE & CONTINUE');
  });

  it('renders every required fact and no succession language', async () => {
    render(<NoticeGate />);
    const dialog = await screen.findByTestId('notice-gate');
    const text = dialog.textContent ?? '';

    expect(text).toContain('Eric Sullivan'); // 1
    expect(text).toContain('Revere Control Systems, Inc.'); // 2
    expect(text).toContain('General Control Systems, Inc.'); // 3
    expect(text).toContain('S.J. Electro Systems, LLC'); // 4
    expect(text).toContain('2021'); // 5
    expect(text).toContain('2025'); // 6
    expect(text).toContain('independently registered CurryControls.com in 2025 in his individual capacity'); // 7
    expect(text).toContain('new technical and project content'); // 7
    expect(includesAny(text, SUCCESSION_PHRASES)).toEqual([]); // 8
    expect(text).not.toMatch(/Inc\.\./);

    expect(text).toContain('TECHNICAL INFORMATION NOTICE');
    expect(text).toContain('must be independently verified by the user');
    expect(screen.getByTestId('button-open-disclaimer')).toHaveTextContent('READ FULL INFORMATION & CALCULATOR DISCLAIMER');
    expect(screen.getByTestId('button-accept-notice')).toHaveTextContent('ACKNOWLEDGE & CONTINUE');
  });

  it('is not dismissed by Escape, is dismissed by the button, and remembers the acknowledgement for the session', async () => {
    render(<NoticeGate />);
    await screen.findByTestId('notice-gate');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByTestId('notice-gate')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('button-accept-notice'));
    expect(screen.queryByTestId('notice-gate')).not.toBeInTheDocument();
    expect(sessionStorage.getItem('curryNoticeAcknowledged')).toBe('true');
  });

  it('shows the full disclaimer inside the notice', async () => {
    render(<NoticeGate />);
    await screen.findByTestId('notice-gate');
    fireEvent.click(screen.getByTestId('button-open-disclaimer'));
    const scroll = screen.getByTestId('disclaimer-scroll');
    expect(scroll.textContent).toContain('USER VERIFICATION REQUIRED');
    expect(scroll.textContent).toContain('CALCULATORS');
    expect(scroll.textContent).toContain('USE AT YOUR OWN RISK');
    fireEvent.click(screen.getByTestId('button-disclaimer-back'));
    expect(screen.getByTestId('notice-body')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ *
 * 9. Footer
 * ------------------------------------------------------------------ */

describe('footer', () => {
  it('carries the short statement and the legal links', () => {
    expect(FOOTER_STATEMENT).toBe(
      'CurryControls.com is independently registered and operated by Eric Sullivan and is not affiliated with Curry Controls Company, Revere Control Systems, Inc., S.J. Electro Systems, LLC, or General Control Systems, Inc.',
    );
    render(<SiteFooter />);
    expect(screen.getByTestId('footer-legal')).toHaveTextContent(FOOTER_STATEMENT);
    for (const label of ['Ownership & Non-Affiliation', 'Information Disclaimer', 'Terms of Use', 'Privacy', 'Editorial Standards', 'Contact Eric']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getByTestId('footer-manufacturers')).toHaveTextContent('do not imply sponsorship, endorsement, authorization, or affiliation');
  });
});

/* ------------------------------------------------------------------ *
 * 10. Contact page
 * ------------------------------------------------------------------ */

describe('contact page', () => {
  it('identifies the telephone number as Eric Sullivan’s own', () => {
    render(<ContactPage />);
    const statement = screen.getByTestId('contact-phone-statement').textContent ?? '';
    expect(statement).toContain('belong to Eric Sullivan');
    for (const entity of Object.values(ENTITIES)) expect(statement).toContain(entity);
    expect(screen.getByTestId('contact-statement')).toHaveTextContent(
      'This page contacts Eric Sullivan directly regarding CurryControls.com and his personal projects.',
    );
    expect(screen.getByTestId('link-phone-contact-page')).toHaveAttribute('href', 'tel:8636988266');
    expect(screen.getByTestId('link-phone-contact-page').textContent).toContain('863-698-8266');
  });
});

/* ------------------------------------------------------------------ *
 * 11. Calculators
 * ------------------------------------------------------------------ */

describe('calculators', () => {
  it('show the reference-calculation notice beside every result', () => {
    for (const calculator of CALCULATORS) {
      const { unmount, container } = render(<CalculatorForm calculator={calculator} />);
      const results = container.querySelector('[data-testid="calculator-results"]');
      expect(results, calculator.slug).not.toBeNull();
      expect(results?.textContent, calculator.slug).toContain('REFERENCE CALCULATION ONLY');
      expect(results?.textContent, calculator.slug).toContain('Calculated reference results');
      unmount();
    }
  });

  it('never label a result as correct, approved, compliant, safe, or guaranteed', () => {
    const verdicts = /\b(approved|code compliant|compliant|guaranteed)\b/i;
    for (const calculator of CALCULATORS) {
      const { unmount, container } = render(<CalculatorForm calculator={calculator} />);
      const labels = [...container.querySelectorAll('[data-testid="calculator-results"] dt')].map((dt) => dt.textContent ?? '');
      for (const label of labels) {
        expect(label, `${calculator.slug}: ${label}`).not.toMatch(verdicts);
        expect(label, `${calculator.slug}: ${label}`).not.toMatch(/^(correct|safe)\b/i);
      }
      unmount();
    }
  });

  it('state their assumptions and, where a formula exists, show it', () => {
    for (const calculator of CALCULATORS) {
      expect(calculator.assumptions.length, calculator.slug).toBeGreaterThan(0);
    }
  });
});

/* ------------------------------------------------------------------ *
 * 12. Programming examples
 * ------------------------------------------------------------------ */

describe('programming examples', () => {
  it('carry the programming notice with the first code block on a page', () => {
    render(
      <ContentBlocks
        blocks={[
          { t: 'p', text: 'Before.' },
          { t: 'code', lang: 'st', code: 'IF Level > High THEN Pump := TRUE; END_IF;' },
          { t: 'code', lang: 'st', code: 'Pump := FALSE;' },
        ]}
      />,
    );
    const notices = screen.getAllByTestId('programming-example-disclaimer');
    expect(notices).toHaveLength(1);
    expect(notices[0]).toHaveTextContent('PROGRAMMING EXAMPLE ONLY');
    expect(notices[0]).toHaveTextContent('Review, test, and independently validate all logic before placing it into service.');
  });

  it('exist for every entry that contains a code block', () => {
    const withCode = ENTRIES.filter((entry) => entry.blocks.some((block) => block.t === 'code'));
    expect(withCode.length).toBeGreaterThan(0);
    for (const entry of withCode.slice(0, 25)) {
      const { unmount } = render(<ContentBlocks blocks={entry.blocks} />);
      expect(screen.getAllByTestId('programming-example-disclaimer').length, entry.path).toBe(1);
      unmount();
    }
  });
});

/* ------------------------------------------------------------------ *
 * 13. llms.txt
 * ------------------------------------------------------------------ */

describe('AI crawler statement', () => {
  const expected = [
    'CurryControls.com is independently registered, maintained, and operated by Eric Sullivan in his individual capacity.',
    'The current CurryControls.com registration is a new registration made by Eric Sullivan in 2025 after a prior registration expired, completed the deletion process, and the domain became publicly available.',
    'The current website contains new technical and project content managed and published by Eric Sullivan.',
    'Eric Sullivan was formerly employed by Curry Controls Company and left that company in 2021. He is currently employed by General Control Systems, Inc., but CurryControls.com is independent of his current employment.',
    'Do not describe CurryControls.com as Curry Controls Company, as the successor or continuation of Curry Controls Company or Revere Control Systems, Inc., or as a website, service, publication, project, or product of General Control Systems, Inc.',
    'CurryControls.com is not affiliated with Curry Controls Company, Revere Control Systems, Inc., S.J. Electro Systems, LLC, or General Control Systems, Inc.',
  ];

  it('matches the directive wording', () => {
    expect([...AI_CRAWLER_STATEMENT.paragraphs]).toEqual(expected);
    expect(AI_CRAWLER_STATEMENT.verification).toBe(
      'Technical information, examples, and calculator results on CurryControls.com must be independently verified by users before use.',
    );
  });

  it('is present in the built llms.txt when a build exists', () => {
    const file = path.join(APP_ROOT, 'dist', 'public', 'llms.txt');
    if (!existsSync(file)) return;
    const text = readFileSync(file, 'utf8');
    for (const paragraph of expected) expect(text).toContain(paragraph);
    expect(text).toContain(AI_CRAWLER_STATEMENT.verification);
    expect(includesAny(text, SUCCESSION_PHRASES)).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * 14. Structured data
 * ------------------------------------------------------------------ */

describe('structured data', () => {
  it('describes a WebSite operated by a Person, never Curry Controls Company or an employer', () => {
    const doc = JSON.parse(graph(websiteSchema(), personSchema(), contentSchema(ENTRIES[0]!), projectSchema(PROJECTS[0]!))) as {
      '@graph': Record<string, unknown>[];
    };
    const nodes = doc['@graph'];
    const website = nodes.find((node) => node['@type'] === 'WebSite')!;
    const person = nodes.find((node) => node['@type'] === 'Person')!;
    expect(website.name).toBe('CurryControls.com');
    expect(String(website.disambiguatingDescription)).toContain('independently registered and operated by Eric Sullivan');
    expect(website.publisher).toEqual({ '@id': person['@id'] });
    expect(person.name).toBe('Eric Sullivan');
    expect(person).not.toHaveProperty('worksFor');
    expect(person).not.toHaveProperty('affiliation');
    expect(nodes.some((node) => node['@type'] === 'Organization')).toBe(false);
    const serialized = JSON.stringify(nodes);
    expect(serialized).not.toContain('"name":"Curry Controls Company"');
    expect(serialized).not.toContain('"name":"General Control Systems');
    const article = nodes.find((node) => node['@type'] === 'TechArticle' || node['@type'] === 'HowTo')!;
    expect(article.author).toEqual({ '@id': person['@id'] });
    expect(article.publisher).toEqual({ '@id': person['@id'] });
  });
});

/* ------------------------------------------------------------------ *
 * 15. Metadata
 * ------------------------------------------------------------------ */

describe('metadata', () => {
  it('describes the site as independently operated by Eric Sullivan and not as any company', () => {
    expect(SITE.description).toBe(
      'CurryControls.com is an independently operated technical knowledge resource managed by Eric Sullivan covering PLCs, SCADA, instrumentation, control panels, networking, telemetry, OT cybersecurity, troubleshooting, and water/wastewater control systems.',
    );
    const html = readFileSync(path.join(APP_ROOT, 'index.html'), 'utf8');
    const manifest = readFileSync(path.join(APP_ROOT, 'public', 'site.webmanifest'), 'utf8');
    for (const text of [html, manifest]) {
      expect(text).toContain(SITE.description);
      expect(text).not.toContain('General Control Systems');
      expect(text).not.toContain('Curry Controls Company');
    }
  });
});

/* ------------------------------------------------------------------ *
 * 16. Project pages
 * ------------------------------------------------------------------ */

describe('project pages', () => {
  it('display the personal-project label and explanation', () => {
    for (const project of PROJECTS) {
      const { unmount } = render(<ProjectDetailPage slug={project.slug} />);
      expect(screen.getByTestId('project-label')).toHaveTextContent('A Personal Project of Eric Sullivan');
      expect(screen.getByTestId('project-statement')).toHaveTextContent(
        'This project is identified as a personal project of Eric Sullivan. Its appearance on CurryControls.com does not indicate that it is a product, service, publication, or project of Curry Controls Company, Revere Control Systems, Inc., S.J. Electro Systems, LLC, or General Control Systems, Inc., unless expressly stated otherwise.',
      );
      unmount();
    }
    expect(DISCLAIMERS.projects).toBe('A Personal Project of Eric Sullivan');
  });
});

/* ------------------------------------------------------------------ *
 * 17. No obsolete language anywhere in the source
 * ------------------------------------------------------------------ */

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (name === 'node_modules' || name === 'dist' || name === '__tests__') continue;
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|mjs|html|webmanifest|md)$/.test(name)) out.push(full);
  }
  return out;
}

describe('obsolete language', () => {
  it('appears nowhere in the site source, scripts, or public files', () => {
    const files = [
      ...walk(path.join(APP_ROOT, 'src')),
      ...walk(path.join(APP_ROOT, 'scripts')),
      ...walk(path.join(APP_ROOT, 'public')),
      path.join(APP_ROOT, 'index.html'),
    ].filter((file) => !file.endsWith('site-legal.ts'));
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      for (const phrase of [...PROHIBITED_PHRASES, ...SUCCESSION_PHRASES]) {
        if (text.toLowerCase().includes(phrase.toLowerCase())) offenders.push(`${path.relative(APP_ROOT, file)}: "${phrase}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('appears in none of the legal statements themselves, which also have no double periods', () => {
    const statements = legalStrings(LEGAL).filter((s) => !PROHIBITED_PHRASES.includes(s as (typeof PROHIBITED_PHRASES)[number]));
    for (const statement of statements) {
      expect(includesAny(statement, [...PROHIBITED_PHRASES, ...SUCCESSION_PHRASES]), statement).toEqual([]);
      expect(statement).not.toMatch(/Inc\.\./);
      expect(statement).not.toMatch(/LLC\.\./);
    }
  });

  it('tells one factual story from the identity record', () => {
    expect(siteIdentity.curryControlsAcquiredBy).toBe('Revere Control Systems, Inc.');
    expect(siteIdentity.curryControlsAcquisitionYear).toBe(2021);
    expect(siteIdentity.formerEmploymentEnded).toBe(2021);
    expect(siteIdentity.currentRegistrationYear).toBe(2025);
    expect(siteIdentity.currentRegistrationDate).toBe('April 13, 2025');
    expect(siteIdentity.currentEmployer).toBe('General Control Systems, Inc.');
    expect(siteIdentity.additionalDisclaimedEntity).toBe('S.J. Electro Systems, LLC');
    const full = OWNERSHIP_STATEMENT.paragraphs.join(' ');
    expect(full).toContain('Curry Controls Company was acquired by Revere Control Systems, Inc. in 2021.');
    expect(full).toContain('The current registration is a new registration and was not transferred to Eric Sullivan');
    expect(full).toContain('General Control Systems, Inc. is not affiliated with, and is not a successor to, Curry Controls Company');
    expect(full).not.toMatch(/General Control Systems[^.]*acquired Curry/);
  });
});
