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
  /** The modal's title, as it read on the original site. */
  title: 'Before you continue',
  /** Opening line, shown above the ownership statement. */
  intro:
    'Welcome to CurryControls.com, Eric Sullivan’s personal knowledge base for controls and automation. Please read the following before you continue.',
  paragraphs: [
    'CurryControls.com is independently owned and maintained by Eric Sullivan. It is his personal knowledge base containing technical notes, references, calculators, tools, and projects.',
    'This website is not affiliated with, sponsored by, endorsed by, or operated by Curry Controls Company.',
    'This website is also not affiliated with, sponsored by, endorsed by, or operated by General Control Systems, Inc. General Control Systems, Inc. is not affiliated with CurryControls.com. Nothing on this site represents the official views, materials, or services of either company.',
  ],
  disclaimerLinkLabel: 'Read the information disclaimer',
  acknowledgeLabel:
    'I have read the information disclaimer and understand that everything on this site is used at my own risk.',
  buttonLabel: 'ACCEPT & CONTINUE',
  /**
   * The original footnote also said the notice was not an agreement or
   * waiver. With a required acknowledgement of the disclaimer that clause
   * would contradict the checkbox beside it, so it is dropped.
   */
  footnote: 'This notice is informational.',
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
    'CurryControls.com is Eric Sullivan’s personal knowledge base. It is independently owned and is not affiliated with Curry Controls Company or General Control Systems, Inc.',
  projects: 'A Personal Project of Eric Sullivan',

  /** One line, used wherever there is room for only one: the notice, the footer, compact blocks. */
  risk:
    'Everything on this site, including the calculators and tools, is general reference information used entirely at your own risk.',

  /** The liability sentence, shown with every calculator and reference table. */
  liability:
    'To the fullest extent permitted by law, CurryControls.com, Eric Sullivan, and any contributors accept no responsibility or liability for any loss, damage, injury, system failure, business interruption, or other consequence arising from the use of, or reliance on, anything provided here.',

  /**
   * Shown on every calculator. Calculators are the highest-consequence
   * content on this site: a wrong conductor size or a wrong overcurrent
   * setting can start a fire or injure someone, so the limits are stated
   * plainly rather than buried.
   */
  calculator:
    'These calculators are estimating and checking aids, not design tools. Results are unverified, carry no warranty, and are not engineering advice for any specific installation. Every result must be independently checked by a qualified person against the applicable codes, standards, and manufacturer data before it is relied on. Do not use any result on this site as the sole basis for sizing, protecting, installing, or operating equipment.',

  /**
   * Shown on every reference table. Code tables are revised between editions
   * and adopted differently by jurisdiction, so the version in front of you is
   * the one that governs — never this page.
   */
  tables:
    'Reference tables here are reproduced for convenience and may not match the edition of the code or standard adopted in your jurisdiction. They are not a substitute for the published document. Verify every value against the current adopted edition and the manufacturer data for the specific product before using it in a design, an installation, or an inspection.',

  /** Reinforces that code compliance is determined by the AHJ, not by a website. */
  codeAuthority:
    'Code compliance is determined by the authority having jurisdiction and by the edition of the code adopted where the work is performed. Nothing on this site determines compliance, approves an installation, or substitutes for a design prepared and sealed by a qualified engineer where one is required.',
} as const;

/**
 * The site disclaimer, shown first on /disclaimer. Condensed from the owner's
 * wording without dropping any of its substance: reference purposes only, no
 * guarantee, the reader verifies, use at own risk, no liability.
 */
export const SITE_DISCLAIMER = {
  title: 'Disclaimer',
  paragraphs: [
    'Everything on CurryControls.com, including articles, calculations, examples, diagrams, and software tools, is provided for general educational and reference purposes only. Reasonable effort goes into accuracy, but nothing here is guaranteed to be accurate, complete, current, or suitable for any purpose, and calculators and tools may contain errors, assumptions, approximations, or omissions. None of it should be the sole basis for an engineering, design, safety, regulatory, financial, or operational decision.',
    'You are responsible for independently verifying all information and calculations against current codes, standards, project requirements, manufacturer documentation, and qualified professional judgment before applying them to any real system.',
    'Use of this website and its information is entirely at your own risk. To the fullest extent permitted by law, CurryControls.com, Eric Sullivan, and any contributors disclaim all responsibility and liability for any loss, damage, injury, system failure, business interruption, or other consequence arising from the use of, or reliance on, information or tools provided here.',
  ],
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
