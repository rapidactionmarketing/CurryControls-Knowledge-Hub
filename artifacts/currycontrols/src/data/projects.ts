/**
 * Eric Sullivan's personal software projects.
 *
 * These are independent personal projects. They are not products of any
 * employer, and nothing here should be read as a claim that a project is
 * publicly available unless its status says so.
 */

export type ProjectStatus = 'Concept' | 'In Development' | 'Private Beta' | 'Beta' | 'Available';

export type Project = {
  slug: string;
  name: string;
  domain: string;
  externalUrl: string;
  category: string;
  status: ProjectStatus;
  tagline: string;
  summary: string;
  description: string[];
  features: string[];
  industryTags: string[];
  featured: boolean;
  icon: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'suiteplans',
    name: 'SuitePlans',
    domain: 'suiteplans.app',
    externalUrl: 'https://suiteplans.app',
    category: 'Engineering · Drawings · Estimating',
    status: 'In Development',
    featured: true,
    icon: 'DraftingCompass',
    tagline: 'Drawing review, markup, takeoff, and estimating in one workspace.',
    summary:
      'A cloud engineering drawing environment being built to combine drawing review, markup, takeoff, symbol libraries, control-system design, and estimating.',
    description: [
      'Most control-system estimating still happens across a PDF viewer, a spreadsheet, and a pile of markups that nobody can reconcile a week later. SuitePlans is an attempt to keep the drawing, the count, and the number in the same place.',
      'The work in progress covers drawing viewing and markup, symbol-based counting for control devices, takeoff that carries through to an estimate, and a place to keep the assumptions behind a number so the next person can see them.',
    ],
    features: [
      'Engineering drawing viewer and markup',
      'Symbol libraries for control and electrical devices',
      'Counted takeoff tied back to the drawing',
      'Estimating that carries takeoff quantities forward',
      'Control schematics and P&ID handling',
      'Project collaboration and revision comparison',
    ],
    industryTags: ['Controls', 'Electrical', 'Estimating', 'Engineering'],
  },
  {
    slug: 'suitebids',
    name: 'SuiteBids',
    domain: 'suitebids.ai',
    externalUrl: 'https://suitebids.ai',
    category: 'Estimating · Procurement',
    status: 'In Development',
    featured: true,
    icon: 'FileSearch',
    tagline: 'Find the work, read the scope, price it with the assumptions written down.',
    summary:
      'A platform under development for project discovery, bid document analysis, scope extraction, specification review, and opportunity management.',
    description: [
      'Bid packages are long, the scope that matters is scattered, and the specification section that changes the price is rarely the one anyone reads first. SuiteBids is being built around getting to that quickly.',
      'Current areas of work include opportunity discovery, extracting scope from bid documents, specification review, and keeping bid risk visible instead of buried.',
    ],
    features: [
      'Opportunity discovery and tracking',
      'Bid document and specification analysis',
      'Scope extraction from long packages',
      'Bid risk review',
      'Vendor and RFQ workflows',
      'Proposal development support',
    ],
    industryTags: ['Estimating', 'Procurement', 'Construction'],
  },
  {
    slug: 'keydocs',
    name: 'KeyDocs',
    domain: 'keydocs.app',
    externalUrl: 'https://keydocs.app',
    category: 'Document Intelligence',
    status: 'In Development',
    featured: true,
    icon: 'FolderSearch',
    tagline: 'The project documents that matter, findable when you need them.',
    summary:
      'A document application under development for organizing, searching, and understanding critical project and technical information.',
    description: [
      'Every project runs on a handful of documents that decide what gets built, and they are almost never where you left them. KeyDocs is focused on organizing that set and making it searchable.',
      'Work in progress covers technical document organization, search across a project set, specification management, and keeping track of which revision governs.',
    ],
    features: [
      'Technical document organization',
      'Search across a full project document set',
      'Specification management',
      'Drawing and document relationships',
      'Revision tracking',
      'Project knowledge management',
    ],
    industryTags: ['Documents', 'Engineering', 'Project Management'],
  },
  {
    slug: 'securelyfax',
    name: 'SecurelyFax',
    domain: 'securelyfax.com',
    externalUrl: 'https://securelyfax.com',
    category: 'Secure Communications',
    status: 'In Development',
    featured: false,
    icon: 'Send',
    tagline: 'Modern workflow for the places that still require a fax.',
    summary:
      'A communications project focused on modernizing workflows where fax-based transmission is still required.',
    description: [
      'Fax has not gone away in the industries that are required to use it. SecurelyFax is designed with secure document transmission and modern workflow usability in mind.',
      'No compliance, certification, or encryption claims are made for this project on this site.',
    ],
    features: [
      'Document transmission for fax-required workflows',
      'Modern interface over an old transport',
      'Transmission records and status',
    ],
    industryTags: ['Communications', 'Documents'],
  },
  {
    slug: 'prompt-alerts',
    name: 'Prompt Alerts',
    domain: 'Prompt Alerts',
    externalUrl: '',
    category: 'Monitoring · Notifications',
    status: 'Concept',
    featured: false,
    icon: 'BellRing',
    tagline: 'Scheduled checks that tell you when something changed.',
    summary:
      'A project concept for scheduled, prompt-driven monitoring that notifies when a watched condition changes.',
    description: [
      'An early concept for running a saved check on a schedule and getting notified only when the answer changes.',
    ],
    features: ['Scheduled checks', 'Change-based notification', 'Saved watch definitions'],
    industryTags: ['Monitoring', 'Productivity'],
  },
  {
    slug: 'dubbrain',
    name: 'DubBrain',
    domain: 'dubbrain.com',
    externalUrl: 'https://dubbrain.com',
    category: 'Knowledge · Content',
    status: 'In Development',
    featured: false,
    icon: 'BrainCircuit',
    tagline: 'A workspace for knowledge and content.',
    summary: 'A knowledge and content workspace under development.',
    description: [
      'A working space for collecting, organizing, and producing content from a body of accumulated knowledge.',
    ],
    features: ['Knowledge collection', 'Content workspace', 'Organized reference material'],
    industryTags: ['Knowledge', 'Content'],
  },
];

export const PROJECT_BY_SLUG: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p]),
);

export const STATUS_NOTE: Record<ProjectStatus, string> = {
  Concept: 'An idea being explored. Nothing is available to use.',
  'In Development': 'Actively being built. Not generally available.',
  'Private Beta': 'In limited testing with a small group.',
  Beta: 'In open testing. Expect rough edges.',
  Available: 'Available to use today.',
};
