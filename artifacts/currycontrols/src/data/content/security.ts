import type { Entry } from '../content-types';

export const SECURITY_ENTRIES: Entry[] = [
  {
    path: '/cybersecurity/ot-security/ot-vs-it-security',
    kind: 'reference',
    title: 'OT Security vs IT Security',
    summary:
      'Why the familiar security priorities invert on a plant floor, and what that changes about patching, scanning, authentication, and incident response.',
    answer:
      'In information technology, the usual priority order is confidentiality, then integrity, then availability. In operational technology it inverts: safety first, then availability and integrity, with confidentiality last. A control system that stops running can flood a neighborhood or injure someone, so controls that are routine in IT, such as automatic patching and active scanning, require far more caution in OT.',
    keyPoints: [
      'Safety and availability outrank confidentiality on a control network.',
      'Systems run for years without reboot, and patch windows may be annual or rarer.',
      'Active scanning can crash legacy control devices; passive discovery is preferred.',
      'Equipment lifecycle is fifteen to twenty-five years, so unsupported software is normal, not exceptional.',
      'Compensating controls carry most of the load where patching is impossible.',
    ],
    published: '2026-06-11',
    updated: '2026-08-26',
    readingTime: 8,
    tags: ['Cybersecurity', 'OT', 'ICS'],
    blocks: [
      { t: 'h2', text: 'The inversion' },
      {
        t: 'p',
        text: 'An IT team protecting a records system reasons about disclosure first. Losing confidentiality is the catastrophe; a server rebooting is an inconvenience. On a control network the calculation is different, because the system is connected to equipment that moves, heats, and pressurizes things in the physical world.',
      },
      {
        t: 'p',
        text: 'Nobody is much harmed by learning the wet well level at a lift station. A controller that stops responding during a storm event is a sanitary sewer overflow, a regulatory report, and a public health problem. Safety comes first, availability follows, and confidentiality is genuinely last for most process data.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'This is not an argument for weaker security',
        text: 'The inversion changes which controls fit, not how seriously security is taken. It rules out approaches that assume a system can be rebooted at will, and it rules in segmentation, access control, monitoring, and tested backups, which deliver most of the protection without risking the process.',
      },
      { t: 'h2', text: 'Practical differences' },
      {
        t: 'table',
        head: ['Topic', 'IT practice', 'OT reality'],
        rows: [
          ['Patching', 'Frequent, often automatic', 'Scheduled outages, vendor validation, sometimes annual or less'],
          ['Uptime expectation', 'Rebooting is routine', 'Years of continuous operation; a reboot is an event'],
          ['Equipment lifespan', 'Three to five years', 'Fifteen to twenty-five years'],
          ['Vulnerability scanning', 'Active scanning is standard', 'Active scanning has crashed production controllers; prefer passive'],
          ['Authentication', 'Individual accounts, MFA', 'Shared operator accounts are common and hard to remove safely'],
          ['Antivirus', 'Standard on endpoints', 'Often unsupported by the control vendor; may interfere with real-time operation'],
          ['Encryption', 'Broadly applied', 'Many control protocols have no encryption capability at all'],
          ['Incident response', 'Isolate and rebuild', 'Isolating may mean losing control of a physical process'],
        ],
      },
      { t: 'h2', text: 'What actually protects a control system' },
      {
        t: 'p',
        text: 'Where patching is constrained, the controls that carry the load are architectural and procedural rather than software updates.',
      },
      {
        t: 'ol',
        items: [
          'Segmentation. Separate the control network from the business network with a controlled boundary. This single measure prevents more incidents than any other.',
          'Controlled remote access. No direct inbound paths to control devices. Vendor access is brokered, authenticated with multi-factor, time-limited, and logged.',
          'Tested backups. Controller programs, HMI applications, server images, and network device configurations, stored offline, and restored on a test bench at least once so you know the restore works.',
          'Asset inventory. A current list of what is on the network, with firmware versions, so an advisory can be assessed in minutes rather than weeks.',
          'Removing default credentials. Still the most common finding in every assessment of every sector.',
          'Monitoring. Knowing what normal traffic looks like, so abnormal is visible.',
          'Physical security. A panel that anyone can open is not protected by any amount of network engineering.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not run an active scan on a control network without planning',
        text: 'Legacy controllers and field devices have been knocked offline by ordinary port scans and by protocol fuzzing built into standard vulnerability scanners. If a scan is required, do it in a maintenance window, on a test system first where possible, with the vendor informed and someone at the plant able to intervene.',
      },
      { t: 'h2', text: 'Where IT and OT have to meet' },
      {
        t: 'p',
        text: 'The most common organizational failure is not technical. It is an IT department applying enterprise policy to plant equipment without understanding the process, or an operations group treating the control network as nobody else business until something happens.',
      },
      {
        t: 'ul',
        items: [
          'IT usually owns the network expertise, the identity systems, and the monitoring tooling. Those are genuinely needed.',
          'Operations owns the process knowledge and the consequence of downtime. Only they can say what a control can safely do.',
          'The boundary between the networks needs a named owner, agreed rules, and a change process both sides follow.',
          'Every OT security decision should be able to answer one question: what happens to the process if this control fails or misfires?',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should OT and IT networks be completely separated?',
        a: 'Physically air-gapped networks are rare and often less secure in practice, because data still moves by USB drive and remote support still happens, just without controls. A segmented architecture with a controlled, monitored boundary is the realistic and generally recommended approach.',
      },
      {
        q: 'Can I run antivirus on an HMI or SCADA server?',
        a: 'Sometimes, and only with the control vendor guidance on exclusions and versions. Real-time process software has been disrupted by on-access scanning. Application allowlisting is often a better fit for a machine whose software set never changes.',
      },
      {
        q: 'How do we handle an unsupported operating system on a control workstation?',
        a: 'Treat it as unfixable and wrap it: strict segmentation, no internet path, no email or browsing, removable media controls, tight firewall rules, and monitoring. Then plan its replacement with a real budget line rather than an intention.',
      },
      {
        q: 'Who should own OT cybersecurity?',
        a: 'It has to be shared, with a single accountable owner named. The failure mode is a gap where IT assumes operations handles the plant network and operations assumes IT handles security. Write down who owns the boundary.',
      },
    ],
    related: [
      '/cybersecurity/ot-security/purdue-model',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/backups/what-to-back-up',
    ],
  },

  {
    path: '/cybersecurity/ot-security/purdue-model',
    kind: 'reference',
    title: 'The Purdue Model',
    summary:
      'The reference architecture most segmentation designs still start from: what each level contains, where the DMZ goes, and how it maps to a water utility.',
    answer:
      'The Purdue Enterprise Reference Architecture organizes industrial systems into levels, from field devices at Level 0 up through control, supervisory, site operations, and enterprise networks. Its practical value is that it defines where boundaries belong, particularly the demilitarized zone between operations and enterprise networks, which is the single most important segmentation boundary in most industrial sites.',
    keyPoints: [
      'Levels 0 to 3 are the control environment; Levels 4 and 5 are enterprise.',
      'The DMZ between Level 3 and Level 4 is where data is exchanged without direct connection.',
      'No enterprise host should ever connect straight to a controller.',
      'Modern architectures diverge from strict layering, but the boundaries still apply.',
      'A remote lift station is a small control zone, not an exception to the model.',
    ],
    published: '2026-06-24',
    updated: '2026-08-20',
    readingTime: 8,
    tags: ['Cybersecurity', 'Architecture', 'Segmentation', 'OT'],
    blocks: [
      { t: 'h2', text: 'The levels' },
      {
        t: 'table',
        head: ['Level', 'Contains', 'Water utility example'],
        rows: [
          ['0 — Process', 'Sensors, actuators, motors, valves', 'Level transmitter, pump motor, valve actuator'],
          ['1 — Basic control', 'PLCs, RTUs, safety controllers', 'Lift station PLC, plant controller'],
          ['2 — Supervisory', 'HMI, local SCADA, engineering workstations', 'Plant operator workstation, local HMI panel'],
          ['3 — Site operations', 'Historian, SCADA servers, domain services for OT', 'SCADA server pair, historian, OT domain controller'],
          ['3.5 — DMZ', 'Brokered data exchange, jump hosts, patch staging', 'Read-only historian replica, remote access broker'],
          ['4 — Site business', 'Plant business systems, email, file shares', 'Utility billing, work order system'],
          ['5 — Enterprise', 'Corporate IT, internet-facing services', 'City network, public web presence'],
        ],
      },
      { t: 'h2', text: 'Why the DMZ is the important part' },
      {
        t: 'p',
        text: 'Business users legitimately need process data. Operations legitimately needs to keep the control network isolated. The DMZ resolves this by giving both sides a place to meet without either crossing into the other.',
      },
      {
        t: 'p',
        text: 'A historian replica in the DMZ receives data pushed from the OT historian at Level 3. Business users query the replica. No enterprise host ever initiates a connection into the control network, and no control device is reachable from Level 4. If the replica is compromised, the attacker has a copy of process history rather than a path to a controller.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Push, do not pull, across the boundary',
        text: 'Design data flows so the more trusted side initiates the connection outward. An OT historian pushing to a DMZ replica means no inbound rule into the control network is required at all. A business system pulling directly from the OT historian requires exactly the inbound path you were trying to avoid.',
      },
      { t: 'h2', text: 'Where real systems diverge' },
      {
        t: 'p',
        text: 'The model was written before cloud services, remote telemetry over cellular, and vendors who expect outbound connections from their equipment. Strict layer-by-layer traversal is not how modern systems are built, and pretending otherwise leads to architectures that get bypassed in practice.',
      },
      {
        t: 'ul',
        items: [
          'A remote lift station is its own small zone at Levels 0 through 2, connecting back to Level 3 over a controlled path. It is not a violation of the model, it is an instance of it.',
          'Cellular-connected RTUs need a defined, encrypted, authenticated path to the SCADA system, terminating at a boundary you control rather than at a controller.',
          'Cloud historians and vendor telemetry belong at the DMZ or above, fed by a push from inside, never by opening an inbound path.',
          'Wireless of any kind is a boundary crossing and needs the same scrutiny as a firewall rule.',
        ],
      },
      { t: 'h2', text: 'Applying it to a utility with many remote sites' },
      {
        t: 'p',
        text: 'A collection system with eighty lift stations does not have one flat network with eighty controllers on it, or at least it should not.',
      },
      {
        t: 'ol',
        items: [
          'Treat each remote site as a zone with a defined conduit back to the plant, in the ISA/IEC 62443 sense.',
          'Terminate remote connections at a boundary device at the plant, not directly on the SCADA server and never on a controller.',
          'Restrict each site to the protocols and destinations it actually needs. A lift station RTU has no reason to reach anything but the SCADA front end.',
          'Prevent site-to-site communication entirely unless a specific requirement exists. One compromised station should not reach the other seventy-nine.',
          'Log and monitor the conduits. A station suddenly talking to something new is a signal worth having.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Flat networks scale the blast radius',
        text: 'If every remote site, every workstation, and every controller shares one broadcast domain and one address range, any single compromised device reaches everything. Segmentation is the difference between an incident at one lift station and an incident across an entire collection system.',
      },
    ],
    faqs: [
      {
        q: 'Is the Purdue model outdated?',
        a: 'The strict hierarchy is dated; the boundaries it identifies are not. Most current guidance still starts from these levels and then adapts for cloud, remote sites, and vendor connectivity. It remains the most widely shared vocabulary for discussing industrial network architecture.',
      },
      {
        q: 'Do I need a DMZ for a small utility?',
        a: 'You need the boundary. It may be a single firewall with a small DMZ segment holding one replica server rather than a large architecture. The principle that no business host connects directly to a control device applies at every size.',
      },
      {
        q: 'What is Level 3.5?',
        a: 'A commonly used informal name for the DMZ between site operations and business networks. It is not part of the original model but it is universally understood in industrial security discussions.',
      },
      {
        q: 'How does this relate to ISA/IEC 62443?',
        a: 'IEC 62443 uses zones and conduits, which is a more flexible way of expressing the same idea: group assets with similar security requirements into zones, and control every communication path between zones. The Purdue levels are a common starting point for defining those zones.',
      },
    ],
    related: [
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/network-segmentation/dmz-design',
      '/cybersecurity/ot-security/iec-62443',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
    ],
  },

  {
    path: '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
    kind: 'reference',
    title: 'Water and Wastewater Utility Threat Landscape',
    summary:
      'What has actually happened at water utilities, what those incidents had in common, and the small number of controls that would have prevented most of them.',
    answer:
      'Publicly reported incidents at water and wastewater utilities have overwhelmingly involved internet-exposed remote access, default or shared credentials, and unsupported software rather than sophisticated attacks. Small utilities are disproportionately affected because they have the same exposed technology as large ones with far less staff. The controls that address most of this are unglamorous: remove internet exposure, replace default credentials, segment, and test backups.',
    keyPoints: [
      'Most reported incidents traced to exposed remote access and weak credentials.',
      'Small systems face the same exposure with a fraction of the staff.',
      'Internet-reachable HMIs and controllers are found routinely on public scanning services.',
      'CISA, EPA, and AWWA publish free sector guidance and assessments.',
      'Manual operation procedures are a real and often overlooked control.',
    ],
    published: '2026-07-07',
    updated: '2026-08-28',
    readingTime: 8,
    tags: ['Cybersecurity', 'Water', 'Wastewater', 'Utilities'],
    blocks: [
      { t: 'h2', text: 'What the reported incidents have in common' },
      {
        t: 'p',
        text: 'Across publicly reported water sector incidents, a consistent pattern emerges, and it is not the one people expect. These have rarely been sophisticated campaigns against hardened targets. They have been opportunistic access to systems that were reachable from the internet and protected by credentials that were default, shared, or previously breached.',
      },
      {
        t: 'ul',
        items: [
          'Remote access reachable from the internet, often a remote desktop service or an HMI web interface.',
          'Default vendor credentials still in place, or a single shared password known to many people including former staff.',
          'No multi-factor authentication on any remote path.',
          'Flat networks where reaching one device meant reaching everything.',
          'Unsupported operating systems with no compensating controls around them.',
          'No monitoring, so intrusions were discovered by an outside party or by operators noticing odd equipment behavior.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Exposure is measurable, and it is public',
        text: 'Internet-wide scanning services continuously index reachable devices, including industrial protocols and HMI interfaces. Anyone can search them. If a utility HMI is reachable from the internet, it is already listed and it is already being probed. Determining whether that is true for your own systems is a defined, finishable piece of work.',
      },
      { t: 'h2', text: 'Why small utilities are disproportionately exposed' },
      {
        t: 'p',
        text: 'A system serving three thousand people runs the same PLCs, the same SCADA software, and the same cellular RTUs as one serving three hundred thousand. What differs is staff. A small utility may have no dedicated IT person, let alone anyone whose job includes OT security, and the integrator who built the system may be the only one who has ever logged into it.',
      },
      {
        t: 'p',
        text: 'That is why sector guidance emphasizes a short list of high-value actions rather than a comprehensive program. A small utility that does five things well is enormously better off than one that starts a framework it cannot staff.',
      },
      { t: 'h2', text: 'The short list' },
      {
        t: 'ol',
        items: [
          'Find and remove internet exposure. Inventory every device with a public path and eliminate it. Remote access should terminate at a VPN or a broker with multi-factor authentication, never directly on an HMI or a controller.',
          'Replace default and shared credentials. Inventory every account on every device, including the ones inside panels. Remove accounts belonging to people who have left.',
          'Require multi-factor authentication on all remote access, including vendor access.',
          'Segment the control network from everything else, with a controlled boundary and no direct path from business systems to controllers.',
          'Back up controller programs, HMI applications, and server images. Keep a copy offline. Restore one on a bench so you know it works.',
          'Write and practice manual operation procedures, so the plant can run if the control system is unavailable.',
          'Know who to call. Have contact information for your integrator, your state regulator, and the federal reporting path written down somewhere that does not depend on the network.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Manual operation is a cybersecurity control',
        text: 'A utility that can run its plant on local control while the SCADA system is rebuilt has converted a crisis into an inconvenience. Documenting and practicing manual operation costs almost nothing and is one of the highest-value preparations a small system can make.',
      },
      { t: 'h2', text: 'Where to get help' },
      {
        t: 'dl',
        items: [
          { term: 'CISA', def: 'Publishes advisories, free vulnerability scanning services, and sector-specific guidance for water and wastewater. The advisories are worth subscribing to because they name the specific equipment affected.' },
          { term: 'EPA', def: 'Provides cybersecurity guidance, assessment tools, and technical assistance for drinking water and wastewater systems.' },
          { term: 'AWWA', def: 'Publishes water sector cybersecurity guidance and an assessment tool aligned to sector needs.' },
          { term: 'WaterISAC', def: 'Sector information sharing, including threat notifications relevant to water and wastewater utilities.' },
          { term: 'State primacy agency', def: 'Often has technical assistance programs and, increasingly, expectations about cybersecurity as part of sanitary surveys.' },
        ],
      },
      {
        t: 'p',
        text: 'AWIA requires community water systems above a certain population served to conduct risk and resilience assessments and to maintain emergency response plans, and cybersecurity is part of that scope. Confirm the current requirements and deadlines applicable to your system with your primacy agency rather than relying on a summary.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not let a framework become the obstacle',
        text: 'Adopting a full security framework is worthwhile and is also a multi-year effort. It should not delay removing an internet-exposed HMI this week. Do the high-value items immediately and build the program around them afterward.',
      },
    ],
    faqs: [
      {
        q: 'Are small water systems really targeted?',
        a: 'Most reported incidents were not targeting a specific utility. They were opportunistic access to whatever was reachable and weakly protected. Being small offers no protection when the exposure is discoverable by automated scanning.',
      },
      {
        q: 'What is the single highest-value thing to do first?',
        a: 'Eliminate direct internet exposure of control systems, and put multi-factor authentication on every remote access path. That combination addresses the initial access method in the large majority of publicly reported water sector incidents.',
      },
      {
        q: 'Does cyber insurance cover a control system incident?',
        a: 'It depends entirely on the policy, and many policies have requirements or exclusions relating to remote access controls and multi-factor authentication. Read the policy with your broker before you need it.',
      },
      {
        q: 'Do we have to report an incident?',
        a: 'Reporting obligations vary by state, by system type, and by federal rule, and they have been changing. Confirm the current requirement with your state primacy agency and have the reporting path written down before an incident, not during one.',
      },
    ],
    related: [
      '/cybersecurity/water-wastewater-cybersecurity/cisa-resources',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/cybersecurity/incident-response/manual-operation-procedures',
    ],
  },
];
