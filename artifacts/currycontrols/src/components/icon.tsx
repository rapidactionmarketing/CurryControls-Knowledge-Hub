import {
  BellRing,
  Boxes,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  DraftingCompass,
  Droplet,
  Droplets,
  FileSearch,
  FolderSearch,
  Gauge,
  Info,
  Library,
  ListChecks,
  MonitorDot,
  Newspaper,
  PanelsTopLeft,
  Send,
  ShieldCheck,
  Waves,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icons are referenced by name in the navigation and project data so the data
 * layer stays free of React imports.
 */
const ICONS: Record<string, LucideIcon> = {
  BellRing,
  Boxes,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  DraftingCompass,
  Droplet,
  Droplets,
  FileSearch,
  FolderSearch,
  Gauge,
  Info,
  Library,
  ListChecks,
  MonitorDot,
  Newspaper,
  PanelsTopLeft,
  Send,
  ShieldCheck,
  Waves,
  Wrench,
};

export function Icon({
  name,
  size = 18,
  className,
  fallback = CircuitBoard,
}: {
  name?: string;
  size?: number;
  className?: string;
  fallback?: LucideIcon;
}) {
  const Component = (name && ICONS[name]) || fallback;
  return <Component size={size} className={className} aria-hidden="true" />;
}
