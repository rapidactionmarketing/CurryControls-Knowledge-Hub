/**
 * Central site configuration. Everything user-facing that repeats across the
 * site lives here so copy can be changed in one place.
 *
 * Every fact and statement about ownership, registration, non-affiliation,
 * employment, the telephone number, and the limits of the technical
 * information comes from `site-legal.ts`. The constants below only arrange
 * those values for the components that use them; they never restate them.
 */

import {
  CALCULATOR_RESULT_NOTICE,
  CODE_STANDARD_NOTICE,
  FOOTER_STATEMENT,
  MANUFACTURER_NOTICE,
  METADATA_STATEMENT,
  PHONE_STATEMENT,
  PROJECT_STATEMENT,
  REFERENCE_INFORMATION_NOTICE,
  REFERENCE_TABLE_NOTICE,
  SAFETY_SUMMARY,
  USE_AT_OWN_RISK,
  siteIdentity,
} from './site-legal';

export const SITE = {
  name: siteIdentity.domain,
  shortName: 'CurryControls',
  tagline: 'Controls & Automation Knowledge Hub',
  url: siteIdentity.siteUrl,
  /** The search-engine description. Derived from the legal record; never edited here. */
  description: METADATA_STATEMENT,
  locale: 'en_US',
  /** Copyright year shown in the footer. */
  founded: '2026',
} as const;

/**
 * Eric Sullivan's direct contact information for CurryControls.com and his
 * personal projects. It is not a telephone number of Curry Controls Company,
 * Revere Control Systems, Inc., S.J. Electro Systems, LLC, or General Control
 * Systems, Inc. The statement itself is PHONE_STATEMENT in site-legal.ts.
 */
export const CONTACT = {
  person: siteIdentity.currentRegistrant,
  phoneDisplay: siteIdentity.contactPhoneDisplay,
  phoneHref: siteIdentity.contactPhoneHref,
  phoneE164: siteIdentity.contactPhoneE164,
  role: `Registrant and operator, ${siteIdentity.domain}`,
  attribution: PHONE_STATEMENT,
} as const;

/**
 * Short disclaimers used inline across the site. Each is derived from the
 * corresponding statement in site-legal.ts so the wording cannot drift.
 */
export const DISCLAIMERS = {
  /** Manufacturers, products, standards organizations, and other organizations. */
  endorsement: MANUFACTURER_NOTICE.paragraphs.join(' '),
  /** General reference-information limitation. */
  engineering: REFERENCE_INFORMATION_NOTICE,
  /** Safety, in one paragraph. */
  safety: SAFETY_SUMMARY,
  /** The compact ownership and non-affiliation statement, verbatim from the footer statement. */
  independence: FOOTER_STATEMENT,
  /** The label on every personal project. */
  projects: PROJECT_STATEMENT.label,
  /** The explanation that accompanies the label. */
  projectsExplanation: PROJECT_STATEMENT.explanation,
  /** One line: use at your own risk. */
  risk: USE_AT_OWN_RISK.paragraphs[0],
  /** The limitation of liability sentence. */
  liability: USE_AT_OWN_RISK.paragraphs[1],
  /** Calculators in general, for the footer and the calculator page aside. */
  calculator: `Calculators on ${siteIdentity.domain} are reference, educational, estimating, and checking aids only. Results may contain assumptions, approximations, errors, or omissions and must be independently verified by the user before use against applicable codes, standards, manufacturer requirements, project requirements, and qualified professional judgment. Do not rely on a calculator result as the sole basis for design, equipment selection, programming, construction, safety, operation, or code compliance.`,
  /** The result-adjacent calculator notice, in one paragraph. */
  calculatorResult: CALCULATOR_RESULT_NOTICE.paragraphs.join(' '),
  /** Reference tables. */
  tables: REFERENCE_TABLE_NOTICE.paragraphs[0],
  /** Codes and standards. */
  codeAuthority: CODE_STANDARD_NOTICE.paragraphs.join(' '),
} as const;

/** Topic options shared by the contact page form and the contact CTA. */
export const CONTACT_TOPICS = [
  'PLC / Programming',
  'SCADA / HMI',
  'Instrumentation',
  'Control Panels',
  'Water / Wastewater',
  'Troubleshooting',
  'Networking',
  'Cybersecurity',
  'SuitePlans',
  'SuiteBids',
  'KeyDocs',
  'SecurelyFax',
  'Prompt Alerts',
  'DubBrain',
  'CurryControls.com',
  'Other',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];
