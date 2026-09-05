/**
 * Derived lookups over the navigation tree.
 *
 * Everything here is computed once at module load so that routing,
 * breadcrumbs, related content, the search index, and the sitemap all agree
 * with the tree in navigation.ts without any duplicated lists.
 */

import { NAV_SECTIONS, type NavNode, type NavSection } from './navigation';

export type NavEntry = {
  node: NavNode;
  /** Absolute route path, e.g. `/controls/plc-systems/analog-control/4-20-ma`. */
  path: string;
  /** Root section this node belongs to. */
  section: NavSection;
  /** Ancestors from section down to the direct parent (excludes the node). */
  trail: NavEntry[];
  /** 0 for a section, 1 for its children, and so on. */
  depth: number;
  parentPath: string | null;
  childPaths: string[];
};

const entries: NavEntry[] = [];
const byPath = new Map<string, NavEntry>();

function walk(node: NavNode, section: NavSection, parent: NavEntry | null): NavEntry {
  const path = parent ? `${parent.path}/${node.slug}` : `/${node.slug}`;
  const entry: NavEntry = {
    node,
    path,
    section,
    trail: parent ? [...parent.trail, parent] : [],
    depth: parent ? parent.depth + 1 : 0,
    parentPath: parent ? parent.path : null,
    childPaths: [],
  };
  entries.push(entry);
  byPath.set(path, entry);
  for (const child of node.children ?? []) {
    entry.childPaths.push(walk(child, section, entry).path);
  }
  return entry;
}

for (const section of NAV_SECTIONS) walk(section, section, null);

/** Every node in the tree, in depth-first order. */
export const NAV_ENTRIES: NavEntry[] = entries;

/** Node lookup by absolute path. */
export function getEntry(path: string): NavEntry | undefined {
  return byPath.get(normalizePath(path));
}

export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const trimmed = path.split('?')[0]!.split('#')[0]!.replace(/\/+$/, '');
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export function getChildren(entry: NavEntry): NavEntry[] {
  return entry.childPaths.map((p) => byPath.get(p)!).filter(Boolean);
}

/** All descendants, depth-first, excluding the node itself. */
export function getDescendants(entry: NavEntry): NavEntry[] {
  const out: NavEntry[] = [];
  const visit = (e: NavEntry) => {
    for (const child of getChildren(e)) {
      out.push(child);
      visit(child);
    }
  };
  visit(entry);
  return out;
}

/** Leaf descendants only — the pages that hold actual content. */
export function getLeafDescendants(entry: NavEntry): NavEntry[] {
  return getDescendants(entry).filter((e) => e.childPaths.length === 0);
}

export function getSiblings(entry: NavEntry): NavEntry[] {
  if (!entry.parentPath) return NAV_ENTRIES.filter((e) => e.depth === 0);
  const parent = byPath.get(entry.parentPath);
  return parent ? getChildren(parent).filter((e) => e.path !== entry.path) : [];
}

/** Breadcrumb trail including the node itself. */
export function getBreadcrumbs(entry: NavEntry): NavEntry[] {
  return [...entry.trail, entry];
}

/** Count of pages beneath a node, used for menu and card counts. */
export function countDescendants(entry: NavEntry): number {
  return getDescendants(entry).length;
}

/** Menu label falls back to the full title. */
export function label(node: NavNode): string {
  return node.menuLabel ?? node.title;
}

/**
 * Distinct, honest one-line description for any node, used for hub-page
 * intros and meta descriptions when a node has no hand-written summary.
 */
export function describe(entry: NavEntry): string {
  if (entry.node.summary) return entry.node.summary;
  const parent = entry.parentPath ? byPath.get(entry.parentPath) : undefined;
  const context = parent && parent.depth > 0 ? `${parent.node.title}, ` : '';
  const children = entry.childPaths.length;
  if (children > 0) {
    return `${entry.node.title} in industrial control systems — ${context}covering ${children} topic ${
      children === 1 ? 'area' : 'areas'
    } in the CurryControls.com controls and automation knowledge hub.`;
  }
  return `${entry.node.title} — practical reference notes for controls engineers, integrators, and technicians working with ${
    parent ? parent.node.title.toLowerCase() : 'industrial control systems'
  }.`;
}

export const SECTION_PATHS = NAV_SECTIONS.map((s) => `/${s.slug}`);
