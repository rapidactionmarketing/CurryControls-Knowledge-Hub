import { Link } from 'wouter';
import { ArrowUpRight, Clock3, ExternalLink } from 'lucide-react';
import { KIND_LABEL, type Entry } from '@/data/content';
import { countDescendants, describe, label, type NavEntry } from '@/data/nav-index';
import type { Project } from '@/data/projects';
import { STATUS_NOTE } from '@/data/projects';
import { Icon } from '@/components/icon';

/** A taxonomy node rendered as a browsable card. */
export function TopicCard({ entry, icon }: { entry: NavEntry; icon?: string }) {
  const count = countDescendants(entry);

  return (
    <Link
      href={entry.path}
      className="cc-card group flex flex-col p-5"
      data-testid={`topic-card-${entry.node.slug}`}
    >
      {icon && (
        <span className="mb-3 grid size-9 place-items-center rounded bg-[hsl(var(--surface))] text-[hsl(var(--accent-blue))]">
          <Icon name={icon} size={18} />
        </span>
      )}
      <h3 className="cc-h3 flex items-start gap-1.5">
        <span>{label(entry.node)}</span>
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-[hsl(var(--ink-2))]/50 transition-colors group-hover:text-[hsl(var(--accent-blue))]"
        />
      </h3>
      <p className="mt-2 flex-1 text-[0.875rem] leading-6 text-[hsl(var(--ink-2))]">
        {describe(entry)}
      </p>
      {count > 0 && (
        <p className="cc-mono mt-3.5 text-[0.68rem] uppercase tracking-wider text-[hsl(var(--ink-2))]/70">
          {count} {count === 1 ? 'topic' : 'topics'}
        </p>
      )}
    </Link>
  );
}

/** A written entry rendered as a card. */
export function EntryCard({ entry, compact = false }: { entry: Entry; compact?: boolean }) {
  return (
    <Link
      href={entry.path}
      className="cc-card group flex flex-col p-5"
      data-testid={`entry-card-${entry.path}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="cc-tag cc-tag-accent">{KIND_LABEL[entry.kind]}</span>
        {entry.tags.slice(0, compact ? 1 : 2).map((tag) => (
          <span key={tag} className="cc-tag">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="cc-h3 mt-3 group-hover:text-[hsl(var(--accent-blue))]">{entry.title}</h3>
      {!compact && (
        <p className="mt-2 flex-1 text-[0.875rem] leading-6 text-[hsl(var(--ink-2))]">
          {entry.summary}
        </p>
      )}
      <p className="mt-3.5 flex items-center gap-3 text-[0.72rem] text-[hsl(var(--ink-2))]/80">
        <span className="inline-flex items-center gap-1">
          <Clock3 size={11} aria-hidden="true" />
          {entry.readingTime} min read
        </span>
        <span>Updated {formatDate(entry.updated)}</span>
      </p>
    </Link>
  );
}

/** A personal project rendered as a card. */
export function ProjectCard({ project }: { project: Project }) {
  const path = `/tools-projects/eric-sullivans-personal-projects/${project.slug}`;

  return (
    <article className="cc-card cc-card-hover flex flex-col p-5" data-testid={`project-card-${project.slug}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-9 place-items-center rounded bg-[hsl(var(--surface))] text-[hsl(var(--accent-blue))]">
          <Icon name={project.icon} size={18} />
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="cc-h3 mt-3.5">{project.name}</h3>
      <p className="cc-mono mt-0.5 text-[0.72rem] text-[hsl(var(--ink-2))]/80">{project.category}</p>
      <p className="mt-2.5 flex-1 text-[0.875rem] leading-6 text-[hsl(var(--ink-2))]">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link href={path} className="cc-btn cc-btn-outline text-[0.8rem]">
          Learn more
        </Link>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cc-btn cc-btn-ghost text-[0.8rem]"
          >
            {project.domain}
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span className="cc-tag" title={STATUS_NOTE[status]}>
      {status}
    </span>
  );
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
