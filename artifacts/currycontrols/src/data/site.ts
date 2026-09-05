/**
 * Central site configuration. Everything user-facing that repeats across the
 * site lives here so copy can be changed in one place.
 */

export const SITE = {
  name: 'CurryControls.com',
  shortName: 'CurryControls',
  tagline: 'Controls & Automation Knowledge Hub',
  url: 'https://www.currycontrols.com',
  description:
    'An independent controls and automation knowledge hub covering PLCs, SCADA, instrumentation, control panels, industrial networking, OT cybersecurity, and water and wastewater control systems.',
  locale: 'en_US',
  founded: '2026',
} as const;

/**
 * Eric Sullivan's direct contact information for CurryControls.com.
 * This is NOT a Curry Controls Company number and NOT a General Control
 * Systems number. See OWNERSHIP_NOTICE below.
 */
export const CONTACT = {
  person: 'Eric Sullivan',
  phoneDisplay: '863-698-8266',
  phoneHref: 'tel:8636988266',
  phoneE164: '+18636988266',
  role: 'Owner, CurryControls.com',
  attribution:
    "Direct contact for CurryControls.com. This is Eric Sullivan's personal contact information.",
} as const;

export const OWNERSHIP_NOTICE = {
  heading: 'ABOUT CURRYCONTROLS.COM',
  paragraphs: [
    'CurryControls.com is currently owned and maintained by Eric Sullivan.',
    'Eric Sullivan is not affiliated with Curry Controls Company. Eric previously worked with Curry Controls Company and left the company in 2021. He is currently employed by General Control Systems, Inc.',
    'General Control Systems, Inc. is a separate company and is not affiliated with Curry Controls Company.',
  ],
  buttonLabel: 'ACCEPT & CONTINUE',
  footnote: 'This notice is informational. It is not an agreement or a waiver.',
  storageKey: 'curryNoticeAccepted',
} as const;

export const DISCLAIMERS = {
  endorsement:
    'References to manufacturers, software platforms, products, companies, or organizations are provided for informational purposes and do not imply sponsorship, endorsement, or affiliation unless specifically stated.',
  engineering:
    'Content on this site is general technical reference information. It is not engineering advice for a specific installation. Always follow the applicable codes, standards, manufacturer documentation, and your own site safety procedures. Verify against the equipment in front of you before you act.',
  safety:
    'Work on energized industrial equipment carries risk of injury or death. Follow NFPA 70E, your employer’s electrical safety program, and lockout/tagout procedures. Nothing here replaces qualified supervision.',
  independence:
    'CurryControls.com is independently owned by Eric Sullivan and is not affiliated with Curry Controls Company.',
  projects: 'A Personal Project of Eric Sullivan',
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
