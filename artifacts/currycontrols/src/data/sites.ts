/**
 * Eric Sullivan's other sites.
 *
 * Each is a separate site on its own domain. They are listed here so the
 * header can offer them, grouped by subject. A site is linked only once it
 * is `live`; until then it is shown as coming soon and carries no anchor, so
 * no page on this site ever links to a parked domain.
 *
 * Flip `live` to true when a site is published. Nothing else needs to change.
 */
export type SisterSite = {
  domain: string;
  name: string;
  /** One short line: what the site is about. */
  topic: string;
  group: SiteGroup;
  live: boolean;
};

export type SiteGroup =
  | 'Systems Integration'
  | 'SCADA & HMI'
  | 'Instrumentation'
  | 'RTU & Telemetry'
  | 'Control Panels'
  | 'Cybersecurity'
  | 'Fiber & Networks'
  | 'Security Systems';

export const SITE_GROUPS: SiteGroup[] = [
  'Systems Integration',
  'SCADA & HMI',
  'Instrumentation',
  'RTU & Telemetry',
  'Control Panels',
  'Cybersecurity',
  'Fiber & Networks',
  'Security Systems',
];

const s = (domain: string, name: string, topic: string, group: SiteGroup, live = false): SisterSite => ({
  domain,
  name,
  topic,
  group,
  live,
});

export const SITES: SisterSite[] = [
  s('controlintegrator.com', 'Control Integrator', 'The practice of control systems integration.', 'Systems Integration'),
  s('controlintegrators.com', 'Control Integrators', 'Integration firms, roles, and how projects are delivered.', 'Systems Integration'),
  s('controlsystems.co', 'Control Systems', 'Control system fundamentals across industries.', 'Systems Integration'),
  s('systemsintegrator.co', 'Systems Integrator', 'What a systems integrator does and how to work with one.', 'Systems Integration'),
  s('automatedelectric.co', 'Automated Electric', 'Industrial electrical work for automated systems.', 'Systems Integration'),

  s('scadaautomation.com', 'SCADA Automation', 'SCADA architecture, platforms, and automation.', 'SCADA & HMI'),
  s('scadaengineering.com', 'SCADA Engineering', 'Engineering SCADA systems from specification to acceptance.', 'SCADA & HMI'),
  s('scadasystems.co', 'SCADA Systems', 'SCADA system components and how they fit together.', 'SCADA & HMI'),
  s('smartscada.com', 'Smart SCADA', 'Modern SCADA: historians, analytics, and remote operations.', 'SCADA & HMI'),
  s('hmiprogramming.com', 'HMI Programming', 'Designing and programming operator interfaces.', 'SCADA & HMI'),

  s('instrumentationdepot.com', 'Instrumentation Depot', 'Instrument types, selection, and specification.', 'Instrumentation'),
  s('instrumenttechnicians.com', 'Instrument Technicians', 'Calibration, loop checks, and the technician trade.', 'Instrumentation'),
  s('instrumenttechs.com', 'Instrument Techs', 'Field procedures and reference for instrument techs.', 'Instrumentation'),

  s('rtusolutions.com', 'RTU Solutions', 'Remote terminal units for distributed sites.', 'RTU & Telemetry'),
  s('rtuweb.com', 'RTU Web', 'RTU configuration, programming, and communications.', 'RTU & Telemetry'),
  s('telemetryengineering.com', 'Telemetry Engineering', 'Radio, cellular, and network telemetry design.', 'RTU & Telemetry'),
  s('telemetryintegrators.com', 'Telemetry Integrators', 'Integrating telemetry into SCADA.', 'RTU & Telemetry'),

  s('plccontrolpanels.com', 'PLC Control Panels', 'Designing and building PLC control panels.', 'Control Panels'),
  s('panelengineering.com', 'Panel Engineering', 'Panel design: layout, power, heat, and ratings.', 'Control Panels'),
  s('panelmanufacturing.com', 'Panel Manufacturing', 'Panel fabrication, wiring, and listing.', 'Control Panels'),

  s('cybersecurityintegrator.com', 'Cybersecurity Integrator', 'OT cybersecurity for control systems.', 'Cybersecurity'),

  s('fiberopticconnection.com', 'Fiber Optic Connection', 'Fiber optics for industrial networks.', 'Fiber & Networks'),

  s('securitysystemintegrator.com', 'Security System Integrator', 'Physical security systems integration.', 'Security Systems'),
];

export const LIVE_SITES: SisterSite[] = SITES.filter((site) => site.live);

export function sitesInGroup(group: SiteGroup): SisterSite[] {
  return SITES.filter((site) => site.group === group);
}
