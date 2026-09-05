/**
 * The site taxonomy.
 *
 * This tree is the single source of truth for the mega menu, the mobile
 * accordion, every knowledge-base route, breadcrumbs, the search index, and
 * the generated sitemap. Nothing about navigation is hard-coded in a
 * component — add a node here and the page, the menu entry, the breadcrumb
 * trail, the sitemap entry, and the search record all appear.
 *
 * The tree is deliberately deeper and wider than the content that exists
 * today. It is sized for a site of thousands of technical pages.
 */

export type NavNode = {
  /** URL segment, unique among siblings. */
  slug: string;
  /** Full title used as the page H1 and the menu label. */
  title: string;
  /** Shorter label when the full title is too long for a menu column. */
  menuLabel?: string;
  /** One-line description. Drives hub-page intros and meta descriptions. */
  summary?: string;
  /** Extra search terms that do not appear in the title. */
  keywords?: string[];
  /** Pin to the top of its parent's menu column. */
  featured?: boolean;
  /** Small label rendered beside the menu entry. */
  badge?: string;
  /** Renders as an outbound link instead of an internal route. */
  externalUrl?: string;
  /** Lucide icon name, resolved by the renderer. Used on prominent nodes. */
  icon?: string;
  children?: NavNode[];
};

export type NavSection = NavNode & {
  /** Short blurb shown in the mega-menu promo column. */
  blurb: string;
  /** Lucide icon name resolved by the menu renderer. */
  icon: string;

  /** How many columns the desktop mega menu should use. */
  columns?: 1 | 2 | 3 | 4;
  children: NavNode[];
};

const SLUG_OVERRIDES: Record<string, string> = {
  'I/O Systems': 'io-systems',
  'I/O Lists': 'io-lists',
  'Water & Wastewater': 'water-wastewater',
  'Tools & Projects': 'tools-projects',
  'SCADA & HMI': 'scada-hmi',
  'Historian & Data': 'historian-data',
  'Lists & Schedules': 'lists-schedules',
  'Noise & Interference': 'noise-interference',
  'Cause & Effect': 'cause-and-effect',
  'P&IDs': 'p-and-id-drawings',
  'Passwords & Credentials': 'passwords-credentials',
  'Pump Stations & Lift Stations': 'pump-and-lift-stations',
  'Water/Wastewater Cybersecurity': 'water-wastewater-cybersecurity',
  'What Is a PLC?': 'what-is-a-plc',
  'What Is SCADA?': 'what-is-scada',
  '4-20 mA': '4-20-ma',
};

export function slugify(input: string): string {
  const override = SLUG_OVERRIDES[input];
  if (override) return override;
  return input
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[/]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Leaf node. `n('Scan Cycle')` or `n('Scan Cycle', { summary: '...' })`. */
function n(title: string, extra: Partial<NavNode> = {}): NavNode {
  return { slug: slugify(title), title, ...extra };
}

/** Branch node. */
function g(title: string, children: NavNode[], extra: Partial<NavNode> = {}): NavNode {
  return { slug: slugify(title), title, children, ...extra };
}

/** Turns a list of plain titles into leaf nodes. */
function leaves(...titles: string[]): NavNode[] {
  return titles.map((t) => n(t));
}

/* ------------------------------------------------------------------ *
 * CONTROLS
 * ------------------------------------------------------------------ */

const CONTROLS: NavSection = {
  slug: 'controls',
  title: 'Controls',
  icon: 'CircuitBoard',
  columns: 4,
  blurb:
    'The core disciplines of an industrial control system: the logic solver, the operator interface, the field devices that measure the process, and the panel that ties them together.',
  summary:
    'PLC systems, SCADA and HMI, instrumentation, and control panels — architecture, programming, signals, communications, and field troubleshooting.',
  keywords: ['automation', 'industrial control system', 'ICS', 'integrator'],
  children: [
    g(
      'PLC Systems',
      [
        g(
          'PLC Fundamentals',
          [
            n('What Is a PLC?', {
              featured: true,
              summary:
                'A programmable logic controller is a ruggedized industrial computer that reads inputs, solves a control program, and drives outputs on a repeating deterministic cycle.',
              keywords: ['programmable logic controller', 'definition', 'basics'],
            }),
            n('PLC Architecture', { summary: 'How a rack, a backplane, a processor, and I/O modules fit together.' }),
            n('CPU', { summary: 'The processor module: memory, execution, diagnostics, and mode switches.' }),
            n('Power Supplies', { summary: 'Sizing and backing up the DC power that keeps a controller and its I/O alive.' }),
            n('I/O Systems', { summary: 'Discrete and analog modules, wiring topologies, and module diagnostics.' }),
            n('Memory', { summary: 'Data tables, tags, addressing, and how memory is organized in a controller.' }),
            n('Scan Cycle', {
              featured: true,
              summary:
                'Read inputs, solve logic, write outputs, housekeeping — and why scan order determines what your logic actually does.',
              keywords: ['sweep', 'scan time', 'deterministic'],
            }),
            n('Tasks', { summary: 'Continuous, periodic, and event tasks, and how priority affects execution.' }),
            n('Watchdog', { summary: 'The timer that faults a controller when a scan runs long.' }),
            n('Retentive Memory', { summary: 'What survives a power cycle, and how retentive data is backed up.' }),
          ],
          { summary: 'How a programmable logic controller is built and how it executes.' },
        ),
        g(
          'Programming',
          [
            n('Ladder Logic', {
              featured: true,
              summary: 'Rungs, contacts, coils, and the relay-logic conventions the language inherited.',
              keywords: ['LD', 'relay ladder logic', 'RLL'],
            }),
            n('Function Block Diagram', { keywords: ['FBD'] }),
            n('Structured Text', { keywords: ['ST', 'IEC text'] }),
            n('Sequential Function Chart', { keywords: ['SFC', 'grafcet'] }),
            n('IEC 61131-3', { summary: 'The standard that defines the five PLC programming languages and the common elements behind them.' }),
            n('Program Organization', { summary: 'Routines, program organization units, and structuring code someone else can maintain.' }),
            n('State Machines', { summary: 'Writing sequences as explicit states instead of tangled interlock chains.' }),
            n('Sequencers', { summary: 'Step-based control for repeatable batch and startup sequences.' }),
            n('Interlocks', {
              featured: true,
              summary: 'Conditions that stop or prevent an action, and where they belong in a program.',
            }),
            n('Permissives', { summary: 'Conditions that must be true before an action is allowed to start.' }),
            n('Alarms', { summary: 'Generating alarm conditions in the controller rather than in the graphics.' }),
            n('Control Strategies', { summary: 'Choosing between on/off, sequenced, cascade, and closed-loop control.' }),
          ],
          { summary: 'The five IEC languages and the structures that make a program maintainable.' },
        ),
        g(
          'Analog Control',
          [
            n('4-20 mA', {
              featured: true,
              summary:
                'The two-wire current loop that carries most process measurements, why current beats voltage over distance, and how to read one with a meter.',
              keywords: ['current loop', 'ma', 'analog signal', 'transmitter', 'loop powered'],
            }),
            n('Scaling', {
              featured: true,
              summary: 'Converting a raw analog count into an engineering unit the operator can act on.',
              keywords: ['span', 'zero', 'linear scaling'],
            }),
            n('Raw Counts', { summary: 'What the analog-to-digital converter actually hands your program.' }),
            n('Engineering Units', { summary: 'Choosing and documenting the units a tag carries.' }),
            n('PID', {
              featured: true,
              summary: 'Proportional, integral, and derivative control applied to pumps, valves, and pressure loops.',
              keywords: ['pid tuning', 'closed loop', 'controller', 'setpoint'],
            }),
            n('Filtering', { summary: 'Damping a noisy input without hiding a real process change.' }),
            n('Deadband', { summary: 'Preventing output chatter around a setpoint.' }),
            n('Signal Validation', { summary: 'Catching out-of-range, frozen, and failed analog inputs in logic.' }),
          ],
          { summary: 'Getting a field measurement into a controller and acting on it correctly.' },
        ),
        g(
          'Communications',
          [
            n('Modbus RTU', { featured: true, summary: 'Serial Modbus: registers, function codes, addressing, and the framing rules that trip people up.', keywords: ['rs-485', 'serial'] }),
            n('Modbus TCP', { featured: true, summary: 'Modbus over Ethernet, unit IDs, and what changes when you leave RS-485 behind.' }),
            n('EtherNet/IP', { summary: 'CIP over Ethernet: implicit I/O, explicit messaging, and RPI.', keywords: ['cip', 'rockwell', 'allen bradley'] }),
            n('DNP3', { summary: 'The utility protocol built for unsolicited reporting and time-stamped events.', keywords: ['scada protocol', 'outstation'] }),
            n('OPC UA', { summary: 'A modern, secure, platform-independent data exchange standard.', keywords: ['opc', 'ua', 'information model'] }),
            n('Serial Communications', { summary: 'RS-232, RS-422, RS-485, biasing, termination, and cable practice.' }),
            n('Gateways', { summary: 'Protocol converters, when they help, and the failure modes they add.' }),
            n('Remote I/O', { summary: 'Extending I/O to a remote panel or a remote site.' }),
          ],
          { summary: 'The protocols that move data between controllers, devices, and SCADA.' },
        ),
        g(
          'PLC Troubleshooting',
          leaves(
            'PLC Will Not Run',
            'I/O Not Updating',
            'Communication Failures',
            'Analog Signal Problems',
            'Program Faults',
            'Watchdog Faults',
            'Network Problems',
          ),
          { menuLabel: 'Troubleshooting', summary: 'Symptom-first diagnosis for a controller that is not behaving.' },
        ),
        g(
          'Platforms',
          [
            g('Schneider Electric', leaves('Modicon M340', 'Modicon M580', 'Control Expert', 'Unity Pro')),
            g('Rockwell Automation', leaves('ControlLogix', 'CompactLogix', 'Studio 5000')),
            n('Siemens'),
            n('AutomationDirect'),
            n('Legacy Systems', { summary: 'Keeping older controllers running and planning a migration.' }),
          ],
          { summary: 'Platform-specific notes. Vendor names are used for identification only.' },
        ),
      ],
      {
        icon: 'Cpu',
        summary: 'Architecture, programming, analog control, communications, and troubleshooting for programmable logic controllers.',
      },
    ),

    g(
      'SCADA & HMI',
      [
        g(
          'SCADA Fundamentals',
          [
            n('What Is SCADA?', {
              featured: true,
              summary: 'Supervisory control and data acquisition: the layer that watches, records, and lets an operator intervene.',
              keywords: ['supervisory control', 'data acquisition', 'definition'],
            }),
            n('SCADA Architecture', { summary: 'Servers, clients, historians, and the paths data takes to reach them.' }),
            ...leaves('Servers', 'Clients', 'Historians', 'Alarm Servers', 'SCADA Communications', 'Redundancy'),
          ],
          { summary: 'What a SCADA system is made of and how the pieces relate.' },
        ),
        g(
          'HMI Design',
          [
            n('ISA-101', { featured: true, summary: 'The human-machine interface standard: lifecycle, style guides, and design consistency.' }),
            n('High Performance HMI', {
              featured: true,
              summary: 'Grey backgrounds, reserved color, and displays built for detecting abnormal conditions rather than decoration.',
            }),
            ...leaves('Navigation', 'Colors', 'Alarm Indication', 'Situational Awareness', 'Faceplates', 'Trends'),
          ],
          { summary: 'Building operator displays people can actually run a plant from.' },
        ),
        g(
          'Alarm Management',
          [
            n('Alarm Philosophy', { summary: 'The document that decides what is allowed to become an alarm.' }),
            n('ISA-18.2', { featured: true, summary: 'The alarm management lifecycle standard, from philosophy through monitoring.' }),
            ...leaves('Alarm Priority', 'Rationalization', 'Shelving', 'Suppression', 'Alarm Floods', 'Notification'),
          ],
          { summary: 'Making an alarm system that operators trust instead of silence.' },
        ),
        g(
          'Historian & Data',
          leaves(
            'Historian Architecture',
            'Data Collection',
            'Compression',
            'Trending',
            'Reporting',
            'Long-Term Storage',
            'SQL Integration',
          ),
          { summary: 'Collecting, compressing, and retrieving process history.' },
        ),
        g('SCADA Platforms', [
          n('VTScada'), n('Ignition'), n('GE iFIX'), n('AVEVA'),
          n('Rockwell FactoryTalk'), n('Schneider SCADA'), n('Other Platforms'),
        ], { menuLabel: 'Platforms', summary: 'Platform notes. Vendor names are used for identification only.' }),
        g(
          'SCADA Troubleshooting',
          leaves(
            'Frozen Values',
            'Lost Communications',
            'Bad Quality',
            'Server Failure',
            'Client Problems',
            'Historian Problems',
            'Alarm Problems',
            'Time Synchronization',
          ),
          { menuLabel: 'Troubleshooting', summary: 'What to check when the screen stops matching the plant.' },
        ),
      ],
      { icon: 'MonitorDot', summary: 'Supervisory control, operator interface design, alarm management, and historian data.' },
    ),

    g(
      'Instrumentation',
      [
        g('Flow', [
          n('Magnetic Flowmeters', { featured: true, summary: 'How a mag meter works, where it fits, and the conductivity and grounding rules that decide whether it reads.' }),
          n('Ultrasonic Flow'), n('Differential Pressure Flow'), n('Open Channel Flow'),
          n('Flow Installation'), n('Flow Troubleshooting'),
        ], { summary: 'Measuring flow in pipes and open channels.' }),
        g('Level', [
          n('Radar Level', { featured: true, summary: 'Non-contact and guided-wave radar, and why it tolerates a wet well better than most alternatives.' }),
          n('Ultrasonic Level'), n('Hydrostatic Level'), n('Differential Pressure Level'), n('Floats'),
          n('Wet Well Level', { featured: true, summary: 'The measurement that runs a lift station, and the failure modes that flood one.' }),
          n('Level Troubleshooting'),
        ], { summary: 'Tank, wet well, and vessel level measurement.' }),
        g('Pressure', leaves('Pressure Transmitters', 'Differential Pressure', 'Pressure Installation', 'Impulse Lines', 'Pressure Calibration'), { summary: 'Gauge, absolute, and differential pressure measurement.' }),
        g('Analytical', leaves('pH', 'ORP', 'Chlorine', 'Turbidity', 'Conductivity', 'Dissolved Oxygen', 'Ammonia', 'Nitrate'), { summary: 'Water quality instrumentation and the maintenance it demands.' }),
        g('Signals', [
          n('4-20 mA Signals', { menuLabel: '4-20 mA', featured: true, summary: 'The current loop from the instrument side: wiring, power, and loop checks.' }),
          n('HART', { summary: 'Digital data riding on the 4-20 mA loop.' }),
          n('Pulse'), n('Frequency'), n('Digital Signals'), n('Signal Isolation'),
          n('Ground Loops', { featured: true, summary: 'Two grounds, one loop, and a reading that will not sit still.' }),
          n('Surge Protection'),
        ], { summary: 'What actually travels on the wire, and what corrupts it.' }),
        g('Calibration', leaves('Calibration Procedures', 'Loop Checks', 'Calibration Documentation', 'Calibration Troubleshooting'), { summary: 'Proving an instrument reads correctly and recording that you did.' }),
      ],
      { icon: 'Gauge', summary: 'Flow, level, pressure, and analytical measurement — selection, installation, signals, and calibration.' },
    ),

    g(
      'Control Panels',
      [
        g('Panel Design', [
          n('UL 508A', { featured: true, summary: 'The industrial control panel standard: what the listing covers and what the label requires.' }),
          n('UL 698A', { summary: 'Industrial control panels for hazardous locations.' }),
          n('NFPA 70', { summary: 'National Electrical Code requirements that reach into a control panel.' }),
          n('SCCR', { featured: true, summary: 'Short-circuit current rating: how it is determined and why the label number is not optional.' }),
          ...leaves('Enclosure Selection', 'Heat Calculations', 'Component Layout', 'Wireways', 'Terminals'),
        ], { summary: 'Designing a panel that passes inspection and survives the field.' }),
        g('PLC Panels', leaves('PLC Power', 'Panel I/O', 'Relays', 'Isolation', 'Panel Surge Protection', 'Panel Networking'), { summary: 'The control section of a panel around a programmable controller.' }),
        g('Pump Panels', [
          n('Duplex'), n('Triplex'),
          n('Lead/Lag', { featured: true, summary: 'Which pump runs first, when the second one joins, and how they trade places.' }),
          n('HOA', { summary: 'Hand-Off-Auto selector wiring and what the PLC should and should not see.' }),
          n('VFD'), n('Soft Starters'), n('Alternation'),
        ], { summary: 'Pump control panels for water, wastewater, and booster service.' }),
        g('Panel Components', leaves('Circuit Breakers', 'Fuses', 'Panel Power Supplies', 'Control Relays', 'Terminal Blocks', 'Surge Devices', 'UPS', 'Network Switches'), { summary: 'What goes in the enclosure and how to select it.' }),
        g('Panel Troubleshooting', leaves('No Control Power', 'Blown Fuses', 'Relay Problems', 'Ground Faults', 'Noise Problems', 'Failed Power Supplies', 'Panel PLC Faults'), { summary: 'Working a dead or misbehaving panel methodically.' }),
      ],
      { icon: 'PanelsTopLeft', summary: 'UL 508A design, pump and PLC panels, component selection, and panel troubleshooting.' },
    ),
  ],
};

/* ------------------------------------------------------------------ *
 * WATER & WASTEWATER
 * ------------------------------------------------------------------ */

const WATER: NavSection = {
  slug: 'water-wastewater',
  title: 'Water & Wastewater',
  menuLabel: 'Water/Wastewater',
  icon: 'Droplets',
  columns: 3,
  blurb:
    'Municipal water and wastewater is where most of this control work lands. Process context first, then the control strategy that serves it.',
  summary:
    'Control systems for water treatment, distribution, lift stations, wastewater treatment, and the pumping that moves it all.',
  keywords: ['municipal', 'utility', 'potable water', 'sewer', 'treatment plant'],
  children: [
    g(
      'Water Systems',
      [
        g('Water Treatment', leaves('Raw Water', 'Wells', 'Aeration', 'Filtration', 'Chemical Feed', 'Disinfection', 'Storage', 'High Service Pumping'), { summary: 'From the source to the distribution system, and the controls at each step.' }),
        g('Water Pumping', [
          n('Well Pumps'), n('High Service Pumps'), n('Booster Pumps'),
          n('VFD Control', { summary: 'Variable speed pumping and where it earns its cost.' }),
          n('Pressure Control', { featured: true, summary: 'Holding discharge pressure on a distribution system without hunting.' }),
          n('Flow Control'),
        ], { menuLabel: 'Pumping', summary: 'Moving potable water from the source to the tap.' }),
        g('Storage', [
          n('Ground Storage Tanks'), n('Elevated Tanks'),
          n('Tank Level Control', { featured: true, summary: 'Level-driven fill and draw control, and the setpoints that keep a tank turning over.' }),
          n('Pump Sequencing'),
        ], { summary: 'Ground and elevated storage, level control, and turnover.' }),
        g('Membrane Treatment', leaves('Reverse Osmosis', 'Nanofiltration', 'Membrane Control', 'CIP', 'Feed Pumps', 'Concentrate Systems'), { summary: 'RO and NF skids, their instrumentation, and their control sequences.' }),
      ],
      { icon: 'Droplet', summary: 'Potable water treatment, pumping, storage, and membrane systems.' },
    ),
    g(
      'Wastewater Systems',
      [
        g('Lift Stations', [
          n('Duplex Lift Stations', { featured: true, summary: 'The two-pump station that makes up most of a collection system, start to finish.' }),
          n('Triplex Lift Stations'),
          n('Wet Well Control', { featured: true, summary: 'Level setpoints, pump start and stop bands, and keeping the wet well from turning septic.' }),
          n('Lift Station Lead/Lag', { menuLabel: 'Lead/Lag' }),
          n('Lift Station Alternation', { menuLabel: 'Alternation' }),
          n('High Level'), n('Backup Control'), n('Generator Operation'),
          n('Lift Station SCADA', { menuLabel: 'SCADA', summary: 'Getting a remote station onto the SCADA system and keeping it there.' }),
        ], { summary: 'Collection system pump stations, the most common controls asset a utility owns.' }),
        g('Wastewater Treatment', leaves('Headworks', 'Aeration Control', 'Biological Treatment', 'Clarifiers', 'RAS/WAS', 'Chemical Systems', 'Effluent Disinfection', 'Effluent', 'Residuals'), { menuLabel: 'Treatment', summary: 'Plant processes and the control strategies that run them.' }),
        g('Wastewater Pump Control', [
          n('Constant Speed'), n('VFD Pump Control'),
          n('Level PID', { summary: 'Holding a wet well level with a variable speed pump instead of bang-bang control.' }),
          n('Station Flow Control'), n('Pump Sequencing Strategies'),
        ], { menuLabel: 'Pump Control', summary: 'How the pumps are actually commanded.' }),
      ],
      { icon: 'Waves', summary: 'Lift stations, treatment processes, and wastewater pump control.' },
    ),
  ],
};

/* ------------------------------------------------------------------ *
 * TROUBLESHOOTING — symptom-first
 * ------------------------------------------------------------------ */

const TROUBLESHOOTING: NavSection = {
  slug: 'troubleshooting',
  title: 'Troubleshooting',
  icon: 'Wrench',
  columns: 4,
  blurb:
    'Organized by symptom, not by product. Start with what you can observe, work through what to check first, and narrow it down without guessing.',
  summary:
    'Symptom-first diagnostic guides for PLCs, SCADA, instrumentation, networks, panels, VFDs, pumps, valves, radio, fiber, power, and grounding.',
  keywords: ['diagnose', 'fault', 'not working', 'intermittent', 'field service'],
  children: [
    g('PLC Troubleshooting', leaves('Processor Faulted', 'Outputs Not Energizing', 'Inputs Not Reading', 'Logic Not Executing As Expected', 'Program Will Not Download', 'Retentive Data Lost'), { menuLabel: 'PLC' }),
    g('SCADA Troubleshooting', leaves('Values Frozen On Screen', 'Tag Shows Bad Quality', 'Alarms Not Annunciating', 'Trend Gaps', 'Client Cannot Connect', 'Duplicate Or Missing History'), { menuLabel: 'SCADA' }),
    g('Instrumentation Troubleshooting', [
      n('4-20 mA Signal Unstable', { featured: true, summary: 'An analog reading that will not settle, and how to separate a process swing from a wiring problem.' }),
      n('Transmitter Reads Wrong Value'), n('Signal Pegged High Or Low'),
      n('Level Reading Jumps'), n('Analog Does Not Match Field Indicator'), n('Loop Powers Up But Reads Zero'),
    ], { menuLabel: 'Instrumentation' }),
    g('Communications Troubleshooting', [
      n('Modbus Device Intermittently Offline', { featured: true, summary: 'Framing, timing, addressing, and termination on a bus that mostly works.' }),
      n('Device Times Out'), n('Read Works But Write Fails'), n('Wrong Register Data'), n('Protocol Gateway Stops Passing Data'),
    ], { menuLabel: 'Communications' }),
    g('Network Troubleshooting', [
      n('Ethernet Device Drops Offline', { featured: true, summary: 'Duplex mismatch, cabling, spanning tree, and the switch counters that give it away.' }),
      n('Intermittent Packet Loss'), n('Cannot Ping Across VLANs'), n('Duplicate IP Address'), n('Switch Port Errors Incrementing'), n('Broadcast Storm'),
    ], { menuLabel: 'Networks' }),
    g('Control Panel Troubleshooting', leaves('No Control Power In Panel', 'Fuse Blows Repeatedly', 'Relay Chatter', 'Ground Fault Present', 'Panel Overheating', 'Nuisance Breaker Trips'), { menuLabel: 'Control Panels' }),
    g('VFD Troubleshooting', leaves('Drive Faults On Overcurrent', 'Drive Faults On Overvoltage', 'Motor Will Not Reach Speed', 'Drive Causes Instrument Noise', 'Drive Will Not Start In Auto', 'Drive Trips On Ground Fault'), { menuLabel: 'VFDs' }),
    g('Pump Troubleshooting', leaves('Pump Will Not Start', 'Pump Short Cycles', 'Pump Runs But No Flow', 'Pump Loses Prime', 'Seal Failure Alarm', 'Both Pumps Running Constantly'), { menuLabel: 'Pumps' }),
    g('Valve Troubleshooting', leaves('Valve Will Not Reach Position', 'Valve Hunting', 'Valve Slow To Respond', 'Position Feedback Wrong', 'Actuator Torque Fault'), { menuLabel: 'Valves' }),
    g('Radio Troubleshooting', leaves('Remote Site Stops Communicating', 'Intermittent Radio Path', 'High Retry Count', 'Poor Signal Margin', 'Interference On Channel'), { menuLabel: 'Radio' }),
    g('Fiber Troubleshooting', leaves('Fiber Link Down', 'High Optical Loss', 'Intermittent Fiber Link', 'Wrong Fiber Type Or Wavelength', 'Dirty Or Damaged Connector'), { menuLabel: 'Fiber' }),
    g('Cellular Troubleshooting', leaves('Cellular Modem Will Not Register', 'Frequent Reconnects', 'Data Plan Or APN Problems', 'VPN Tunnel Drops', 'Weak Cellular Signal'), { menuLabel: 'Cellular' }),
    g('Power Troubleshooting', leaves('Loss Of Control Voltage', 'Power Supply Failure', 'UPS Not Carrying Load', 'Voltage Sag On Motor Start', 'Generator Transfer Problems'), { menuLabel: 'Power' }),
    g('Grounding Troubleshooting', leaves('Ground Loop Symptoms', 'Floating Reference Between Panels', 'Shield Grounded At Both Ends', 'Missing Equipment Ground', 'High Neutral To Ground Voltage'), { menuLabel: 'Grounding' }),
    g('Noise & Interference', leaves('VFD Noise On Analog Signals', 'Radio Frequency Interference', 'Common Mode Noise', 'Cable Routing Problems', 'Unshielded Cable In A Noisy Run'), { menuLabel: 'Noise & Interference' }),
  ],
};

/* ------------------------------------------------------------------ *
 * ENGINEERING LIBRARY
 * ------------------------------------------------------------------ */

const LIBRARY: NavSection = {
  slug: 'engineering-library',
  title: 'Engineering Library',
  menuLabel: 'Engineering',
  icon: 'Library',
  columns: 3,
  blurb:
    'Reference material for the documents a control system is designed, built, and handed over with.',
  summary:
    'Drawings, lists and schedules, control narratives, checklists, and the standards that govern control system work.',
  keywords: ['reference', 'documents', 'deliverables', 'submittal'],
  children: [
    g('Drawings', [
      n('P&IDs', { featured: true, summary: 'Piping and instrumentation diagrams: how to read one and what the tag bubbles mean.' }),
      n('Schematics'), n('Wiring Diagrams'), n('Network Drawings'), n('Panel Layouts'),
    ], { summary: 'The drawing set a control system is built from.' }),
    g('Lists & Schedules', leaves('I/O Lists', 'Instrument Lists', 'Cable Schedules', 'Fiber Schedules', 'Network Schedules'), { summary: 'The tabular deliverables that keep a project consistent.' }),
    g('Control Documentation', [
      n('Control Narratives', { featured: true, summary: 'The document that says what the system does, in the words the owner will hold you to.' }),
      n('Sequences of Operation'), n('Cause & Effect'), n('Functional Descriptions'),
    ], { summary: 'Describing intended behavior before anyone writes code.' }),
    g('Checklists', leaves('Design Checklist', 'FAT', 'SAT', 'Startup', 'Commissioning', 'Calibration Checklist', 'Troubleshooting Checklist'), { summary: 'Repeatable checks for design, test, and turnover.' }),
    g('Standards', [
      n('ISA', { summary: 'ISA-5.1 symbology, ISA-18.2 alarms, ISA-101 HMI, ISA/IEC 62443 security.' }),
      n('IEC', { summary: 'IEC 61131-3 programming languages and related industrial standards.' }),
      n('NFPA', { summary: 'NFPA 70 (NEC) and NFPA 70E electrical safety in the workplace.' }),
      n('UL', { summary: 'UL 508A and UL 698A industrial control panel listings.' }),
      n('NIST'), n('CISA'), n('EPA'), n('AWWA'),
    ], { summary: 'The standards bodies whose documents govern this work.' }),
  ],
};

/* ------------------------------------------------------------------ *
 * CYBERSECURITY
 * ------------------------------------------------------------------ */

const CYBER: NavSection = {
  slug: 'cybersecurity',
  title: 'Cybersecurity',
  icon: 'ShieldCheck',
  columns: 3,
  blurb:
    'Operational technology security for control systems, written for the people who actually maintain them.',
  summary:
    'OT security fundamentals: segmentation, remote access, firewalls, controller and SCADA hardening, backups, and incident response.',
  keywords: ['OT', 'ICS security', 'IEC 62443', 'critical infrastructure'],
  children: [
    g('OT Security', [
      n('OT vs IT Security', { featured: true, summary: 'Why availability and safety outrank confidentiality on a plant floor, and what that changes.' }),
      n('Purdue Model', { featured: true, summary: 'The reference architecture that most segmentation designs still start from.' }),
      n('IEC 62443'), n('Risk Assessment'), n('Security Program Basics'),
    ], { summary: 'The fundamentals that everything else rests on.' }),
    g('Network Segmentation', leaves('Zones and Conduits', 'VLAN Segmentation', 'DMZ Design', 'Data Diodes', 'Segmenting A Remote Site'), { summary: 'Separating the control network from everything else.' }),
    g('Remote Access', leaves('Vendor Remote Access', 'VPN Design', 'Jump Hosts', 'Multi-Factor Authentication', 'Session Logging'), { summary: 'Letting people in without leaving the door open.' }),
    g('Firewalls', leaves('Industrial Firewalls', 'Firewall Rule Design', 'Deep Packet Inspection', 'Logging And Review'), { summary: 'Rules, placement, and review.' }),
    g('PLC Security', leaves('Controller Hardening', 'Mode Switch And Keyswitch', 'Firmware Management', 'Program Integrity', 'Disabling Unused Services'), { summary: 'Protecting the device that moves the equipment.' }),
    g('SCADA Security', leaves('Server Hardening', 'User Accounts And Roles', 'Patch Management', 'Historian Security', 'Third Party Software'), { summary: 'Hardening the supervisory layer.' }),
    g('Passwords & Credentials', leaves('Shared Account Problems', 'Password Policy For OT', 'Credential Storage', 'Default Credentials'), { summary: 'The most common finding in every OT assessment.' }),
    g('Backups', leaves('What To Back Up', 'PLC Program Backups', 'SCADA Backups', 'Backup Testing', 'Offline Copies'), { summary: 'The control that actually gets a plant back online.' }),
    g('Change Detection', leaves('Configuration Baselines', 'Program Change Detection', 'Change Management For OT'), { summary: 'Knowing when something moved.' }),
    g('Incident Response', leaves('OT Incident Response Plan', 'Isolating A Compromised System', 'Manual Operation Procedures', 'Recovery And Restoration', 'Reporting Requirements'), { summary: 'Planning for the day it happens.' }),
    g('Asset Inventory', leaves('Building An OT Asset Inventory', 'Passive Discovery', 'Documenting Firmware Versions'), { summary: 'You cannot protect what you have not listed.' }),
    g('Vulnerability Management', leaves('Advisories And Alerts', 'Risk-Based Patching', 'Compensating Controls'), { summary: 'Handling advisories on equipment you cannot reboot.' }),
    g('Water/Wastewater Cybersecurity', [
      n('Utility Threat Landscape', { featured: true, summary: 'What has actually happened at water utilities, and what those incidents had in common.' }),
      n('AWIA Requirements'), n('EPA Guidance'), n('CISA Resources'), n('Small Utility Priorities'),
    ], { summary: 'Sector-specific guidance for water and wastewater utilities.' }),
  ],
};

/* ------------------------------------------------------------------ *
 * HOW-TO
 * ------------------------------------------------------------------ */

const HOWTO: NavSection = {
  slug: 'how-to',
  title: 'How-To',
  icon: 'ListChecks',
  columns: 3,
  blurb:
    'Step-by-step procedures for the tasks that come up on real jobs. Each one is written to be worked through with the equipment in front of you.',
  summary:
    'Practical step-by-step guides for PLC, SCADA, instrumentation, control panel, and industrial network tasks.',
  keywords: ['procedure', 'steps', 'guide', 'walkthrough', 'tutorial'],
  children: [
    g('PLC How-To', [
      n('Scale a 4-20 mA Input', { featured: true, summary: 'Turn raw analog counts into engineering units, with the arithmetic worked out.' }),
      n('Program Lead/Lag Pumps', { featured: true, summary: 'Build duplex pump control with alternation, run-time balancing, and a failure fallback.' }),
      n('Build a Sequencer'),
      n('Configure Modbus', { summary: 'Set up a Modbus master and prove the poll is working.' }),
      n('Diagnose READ/WRITE Communications'),
      n('Create a PID Loop'),
      n('Add an Alarm'),
      n('Configure Remote I/O'),
    ]),
    g('SCADA How-To', leaves('Build a Tag', 'Configure Alarms', 'Trend Data', 'Configure Historian', 'Diagnose Bad Quality', 'Build Pump Graphics', 'Configure Remote Access')),
    g('Instrumentation How-To', [
      n('Calibrate a Pressure Transmitter'),
      n('Test a 4-20 mA Loop', { featured: true, summary: 'Prove a loop end to end with a meter and a calibrator, without lifting the wrong wire.' }),
      n('Diagnose Ground Loops'),
      n('Configure Radar Level'),
      n('Troubleshoot a Flowmeter'),
    ]),
    g('Panel How-To', [
      n('Size a Power Supply', { featured: true, summary: 'Add up the real load, add headroom, and account for inrush.' }),
      n('Select Surge Protection'),
      n('Size an Enclosure'),
      n('Calculate SCCR'),
      n('Build Terminal Schedules'),
      n('Design Grounding'),
    ]),
    g('Network How-To', leaves('Assign IP Addresses', 'Configure VLANs', 'Troubleshoot Ethernet', 'Test Fiber', 'Diagnose Packet Loss')),
  ],
};

/* ------------------------------------------------------------------ *
 * ARTICLES
 * ------------------------------------------------------------------ */

const ARTICLES: NavSection = {
  slug: 'articles',
  title: 'Articles',
  icon: 'Newspaper',
  columns: 2,
  blurb: 'Longer-form technical writing, published as it is finished and revised as field experience corrects it.',
  summary: 'Technical articles on controls, automation, instrumentation, water and wastewater systems, and OT security.',
  children: [
    n('Latest', { featured: true, summary: 'Everything published, newest first.' }),
    g('PLC Articles', [n('Where the Logic Should Live: Controller, SCADA, or Relay')], { menuLabel: 'PLC' }),
    g('SCADA Articles', [n('What a Small Utility Should Ask Before Buying SCADA')], { menuLabel: 'SCADA' }),
    g('Water Articles', [n('The Tank Level Trend Tells the Whole Story')], { menuLabel: 'Water' }),
    g('Wastewater Articles', [n('The Lift Station That Overflowed With Everything Working')], { menuLabel: 'Wastewater' }),
    g('Instrumentation Articles', [n('Calibration Is a Program, Not an Event')], { menuLabel: 'Instrumentation' }),
    g('Panels Articles', [n('The Panel You Can Troubleshoot at Two in the Morning')], { menuLabel: 'Panels' }),
    g('Networking Articles', [n('Fiber Between Buildings, Every Time')], { menuLabel: 'Networking' }),
    g('Cybersecurity Articles', [n('The Cellular Router Is the Front Door')], { menuLabel: 'Cybersecurity' }),
    g('Troubleshooting Articles', [n('Measure Before You Replace')], { menuLabel: 'Troubleshooting' }),
    g('Engineering Articles', [n('The Control Narrative Is the Contract')], { menuLabel: 'Engineering' }),
    g('Industry Articles', [n('The Knowledge That Leaves With the Retiring Technician'), n('What Integrator Consolidation Means for a Small Utility')], { menuLabel: 'Industry' }),
  ],
};

/* ------------------------------------------------------------------ *
 * TOOLS & PROJECTS
 * ------------------------------------------------------------------ */

const TOOLS: NavSection = {
  slug: 'tools-projects',
  title: 'Tools & Projects',
  menuLabel: 'Projects',
  icon: 'Boxes',
  columns: 2,
  blurb:
    "Software Eric Sullivan is building on his own time. These are personal projects, not products of any employer.",
  summary:
    "Eric Sullivan's personal software projects: SuitePlans, SuiteBids, KeyDocs, SecurelyFax, Prompt Alerts, and DubBrain.",
  keywords: ['software', 'apps', 'side projects'],
  children: [
    g("Eric Sullivan's Personal Projects", [
      n('SuitePlans', { featured: true, summary: 'Engineering drawing review, markup, takeoff, and estimating.' }),
      n('SuiteBids', { featured: true, summary: 'Bid discovery, scope extraction, and estimating assistance.' }),
      n('KeyDocs', { summary: 'Organizing and searching critical project documents.' }),
      n('SecurelyFax', { summary: 'Document transmission for workflows that still require fax.' }),
      n('Prompt Alerts', { summary: 'Scheduled prompt-driven monitoring and notifications.' }),
      n('DubBrain', { summary: 'A knowledge and content workspace.' }),
    ], { menuLabel: 'All Projects' }),
  ],
};

/* ------------------------------------------------------------------ *
 * ABOUT
 * ------------------------------------------------------------------ */

const ABOUT: NavSection = {
  slug: 'about',
  title: 'About',
  icon: 'Info',
  columns: 1,
  blurb: 'Who runs this site, and how to reach him.',
  summary: 'About CurryControls.com, about Eric Sullivan, and how to get in touch.',
  children: [
    n('About CurryControls.com', { slug: 'site', summary: 'What this site is, who owns it, and what it is not.' }),
    n('About Eric Sullivan', { slug: 'eric-sullivan', summary: 'Background in electrical systems, controls, and water and wastewater automation.' }),
    n('Personal Projects', { slug: 'personal-projects', summary: "Eric Sullivan's independent software projects." }),
    n('Contact Eric', { slug: 'contact-eric', summary: 'Reach Eric Sullivan directly at 863-698-8266.' }),
  ],
};

/* ------------------------------------------------------------------ *
 * Exported tree
 * ------------------------------------------------------------------ */

/**
 * Top-level bar destinations that are real pages rather than taxonomy
 * branches.
 *
 * The calculators and the reference tables are generated from their own data
 * files, not from this tree, so they have no branch to hang a mega-menu panel
 * on. They still belong in the primary navigation, so they are declared here
 * as direct links and the header renders them alongside the sections. `after`
 * names the section slug each link follows, keeping bar order a data concern
 * like everything else in this file.
 */
export type NavLink = {
  href: string;
  label: string;
  /** Slug of the section this link is placed after. */
  after: string;
  icon?: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/calculators', label: 'Calculators', after: 'engineering-library', icon: 'Calculator' },
];

export const NAV_SECTIONS: NavSection[] = [
  CONTROLS,
  WATER,
  TROUBLESHOOTING,
  LIBRARY,
  CYBER,
  HOWTO,
  ARTICLES,
  TOOLS,
  ABOUT,
];

/** Sections that make up the technical knowledge base, in reading order. */
export const KNOWLEDGE_SECTIONS: NavSection[] = [
  CONTROLS,
  WATER,
  TROUBLESHOOTING,
  HOWTO,
  LIBRARY,
  CYBER,
];
