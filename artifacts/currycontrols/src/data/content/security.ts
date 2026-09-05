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
    tags: ['Cybersecurity'],
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
    tags: ['Cybersecurity', 'Fundamentals', 'Networking'],
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
    tags: ['Cybersecurity', 'Water', 'Wastewater'],
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
  {
    path: '/cybersecurity/ot-security/iec-62443',
    kind: 'reference',
    title: 'IEC 62443',
    summary:
      'The international standard series for industrial automation and control system security: how it is organized, what security levels and foundational requirements mean, and how a utility or integrator actually uses it.',
    answer:
      'IEC 62443 is a series of standards for securing industrial automation and control systems. It splits responsibility among asset owners, integrators, and product suppliers, organizes a system into zones and conduits, and rates protection with security levels 1 through 4 against seven foundational requirements. For most utilities the useful parts are 2-1 for the security program, 3-2 for risk assessment and zoning, and 3-3 for system requirements at a chosen security level.',
    keyPoints: [
      'The series is organized by role: asset owner, system integrator, product supplier.',
      'Security levels 1 to 4 describe the attacker the system must resist, from accidental to well-resourced and persistent.',
      'Seven foundational requirements define what a zone at a given level must be able to do.',
      'Parts 3-2 and 3-3 are the working documents for zoning a system and specifying it.',
      'It is a framework for specification and assessment, not a checklist, and most utilities will target SL 2.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Cybersecurity', 'Standards', 'ISA'],
    blocks: [
      { t: 'h2', text: 'What the series is' },
      {
        t: 'p',
        text: 'IEC 62443 began as ISA-99 and is maintained jointly by the ISA99 committee and IEC Technical Committee 65. It is the one standard series written specifically for industrial automation and control systems, as opposed to IT frameworks adapted to them. Its central ideas are that security is a shared responsibility among the people who own, build, and supply a system; that a system should be divided into zones connected by controlled conduits; and that the amount of protection should be chosen deliberately, by level, rather than applied uniformly.',
      },
      {
        t: 'p',
        text: 'The documents are purchased, not free, which shapes how they are used. Most practitioners work from a few parts and from the derived guidance published by ISA, government agencies, and vendors. Knowing the structure is what makes that guidance intelligible.',
      },
      { t: 'h2', text: 'How the series is organized' },
      {
        t: 'table',
        head: ['Part', 'Audience', 'What it covers'],
        rows: [
          ['62443-1-1', 'Everyone', 'Terminology, concepts, and models. Defines zones, conduits, security levels, and the foundational requirements.'],
          ['62443-2-1', 'Asset owner', 'Requirements for an IACS security program: policies, organization, risk management, and the management system that keeps it alive.'],
          ['62443-2-4', 'Integrator and service provider', 'Security requirements for the people who design, install, and maintain systems. The part to reference in an integration contract.'],
          ['62443-3-2', 'Asset owner and integrator', 'Security risk assessment and system design: partitioning the system into zones and conduits and assigning a target security level to each.'],
          ['62443-3-3', 'Asset owner and integrator', 'System security requirements and security levels. The seven foundational requirements broken into specific requirements and enhancements for each level.'],
          ['62443-4-1', 'Product supplier', 'Secure product development lifecycle requirements for the vendor.'],
          ['62443-4-2', 'Product supplier', 'Technical security requirements for individual components: controllers, HMIs, network devices, software.'],
        ],
      },
      { t: 'h2', text: 'Security levels' },
      {
        t: 'p',
        text: 'A security level describes the capability of the adversary the system is meant to resist. The scale is about intent and resources, not about a specific technology.',
      },
      {
        t: 'table',
        head: ['Level', 'Protects against', 'In practice'],
        rows: [
          ['SL 0', 'No specific requirement', 'A zone with nothing worth protecting, which is rare in a control system.'],
          ['SL 1', 'Casual or coincidental violation', 'Mistakes, curious employees, a misconfigured laptop. Basic access control and hygiene.'],
          ['SL 2', 'Intentional violation using simple means, low resources, generic skills, low motivation', 'An opportunistic attacker with public tools. The realistic target for most water and wastewater systems.'],
          ['SL 3', 'Intentional violation using sophisticated means, moderate resources, IACS-specific skills, moderate motivation', 'A capable, targeted attacker. Appropriate for critical zones at large utilities and for systems that have been specifically threatened.'],
          ['SL 4', 'Intentional violation using sophisticated means, extended resources, IACS-specific skills, high motivation', 'A well-resourced, persistent adversary. Rarely a realistic target for an entire system; sometimes chosen for one small critical zone.'],
        ],
      },
      {
        t: 'p',
        text: 'Three flavors of level are used. The target level, SL-T, is what the risk assessment says a zone needs. The capability level, SL-C, is what a component or system can provide when configured correctly. The achieved level, SL-A, is what the installed and operated system actually delivers. The gap between SL-T and SL-A is the work list.',
      },
      { t: 'h2', text: 'The seven foundational requirements' },
      {
        t: 'p',
        text: 'Part 3-3 defines what a zone at each level must be able to do under seven headings. Each foundational requirement expands into numbered system requirements, with requirement enhancements that apply at higher levels.',
      },
      {
        t: 'dl',
        items: [
          { term: 'FR 1, Identification and authentication control', def: 'Know who and what is on the system. Unique accounts for people, authenticated devices and software, managed credentials.' },
          { term: 'FR 2, Use control', def: 'Once identified, limit what each user, device, and process may do. Roles, least privilege, session control, and the physical keyswitch on a controller.' },
          { term: 'FR 3, System integrity', def: 'Prevent unauthorized change and detect it when it happens. Program integrity, firmware validation, malware protection, and change detection.' },
          { term: 'FR 4, Data confidentiality', def: 'Protect information that must not be disclosed, in transit and at rest. In a control system this is often credentials and configuration rather than process values.' },
          { term: 'FR 5, Restricted data flow', def: 'Segment the system so that data flows only where it is supposed to. This is where zones and conduits are enforced: firewalls, one-way links, and network isolation.' },
          { term: 'FR 6, Timely response to events', def: 'Log, monitor, and alert so that an incident is noticed and can be investigated. Audit logs, time synchronization, and someone who reads them.' },
          { term: 'FR 7, Resource availability', def: 'Keep the system running under attack or failure. Denial of service resilience, backups, redundancy, and the ability to operate manually.' },
        ],
      },
      {
        t: 'p',
        text: 'Read as a list, the seven requirements are also a reasonable outline for a utility security program even without a formal assessment. Nearly every practical control a small utility would put in place maps to one of them.',
      },
      { t: 'h2', text: 'Zones and conduits' },
      {
        t: 'p',
        text: 'Part 3-2 asks the asset owner to divide the system into zones, groups of assets that share security requirements, and conduits, the communication paths between zones. Each zone gets a target security level from a risk assessment, and each conduit is inventoried with its protocols, direction, and protection. The Purdue model provides the usual starting shape; the zone model is the refinement that says which boundaries actually need enforcement. The zones and conduits page walks through a worked example for a water utility.',
      },
      { t: 'h2', text: 'How a utility uses it' },
      {
        t: 'p',
        text: 'Very few utilities need to read every part. A practical path uses the series in this order.',
      },
      {
        t: 'ol',
        items: [
          'Use the concepts in 1-1 to get the vocabulary straight: zones, conduits, security levels, roles. This makes the rest of the guidance readable.',
          'Use 3-2 to inventory assets, draw zones and conduits, and assign a target level to each zone. For most utilities the answer is SL 2 for control zones and SL 1 for less critical ones, with SL 3 considered only for a specific zone that warrants it.',
          'Use 3-3 as the requirements list for each zone at its target level, both to specify new systems and to assess existing ones. The gap analysis is the work plan.',
          'Use 2-1 to build the program around the technical work: policies, responsibilities, training, and the review cycle that keeps the assessment current.',
          'Cite 2-4 in contracts with integrators and service providers, and ask product suppliers about 4-1 and 4-2 conformance when buying components.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Certification',
        text: 'ISASecure and similar schemes certify products against 4-1 and 4-2 and systems against 3-3. A certified component has a documented capability level; it does not deliver that level unless it is installed and configured as the certification assumes. Certification is evidence for the SL-C column, never for SL-A.',
      },
      { t: 'h2', text: 'Where it fits with other frameworks' },
      {
        t: 'p',
        text: 'The NIST Cybersecurity Framework organizes a program around functions such as identify, protect, detect, respond, and recover, and is technology-neutral. IEC 62443 is the control-system-specific standard that says what protect actually means for a controller network. The two are complementary: many utilities use the NIST framework, or the water sector guidance built on it, for the program and 62443 for the technical requirements. Regulatory requirements, including the risk and resilience assessments under the America\'s Water Infrastructure Act, do not mandate 62443 but are satisfied more easily by a utility that has done a 3-2 style assessment.',
      },
    ],
    faqs: [
      {
        q: 'Do I have to buy the standards to use them?',
        a: 'To cite specific requirement numbers in a contract or an assessment, yes, the relevant parts should be purchased. To apply the concepts, the freely available quick-start guides and summaries from ISA and the agencies cover zones, conduits, levels, and the foundational requirements well enough to start.',
      },
      {
        q: 'What security level should a water utility target?',
        a: 'SL 2 for the control zones is the common answer, meaning the system should resist an opportunistic attacker using public tools. A large utility with a specific threat profile may target SL 3 for its most critical zone. SL 4 across a whole system is neither achievable nor necessary for almost anyone.',
      },
      {
        q: 'Is 62443 compliance a thing I can claim?',
        a: 'A system can be assessed against 3-3 at a target level, and a product can be certified against 4-2. Claiming that a utility is 62443 compliant without saying which parts, which zones, and which level is a marketing statement rather than a technical one.',
      },
      {
        q: 'How does 62443 relate to the Purdue model?',
        a: 'Purdue is a reference architecture that describes levels of a control hierarchy. 62443 uses it as the starting shape for zoning but does not require it. The zones and conduits model is more flexible and is what 62443 actually assesses.',
      },
    ],
    related: [
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/ot-security/purdue-model',
      '/cybersecurity/ot-security/ot-vs-it-security',
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
    ],
  },
  {
    path: '/cybersecurity/network-segmentation/zones-and-conduits',
    kind: 'reference',
    title: 'Zones and Conduits',
    summary:
      'The IEC 62443 way to segment a control system: grouping assets into zones with a shared security level, inventorying every conduit between them, and turning the drawing into firewall rules. With a worked water utility example.',
    answer:
      'A zone is a group of assets that share the same security requirements; a conduit is a communication path between two zones. Segmenting by zones and conduits means listing every asset, grouping by function and criticality, assigning each zone a target security level, and then documenting every conduit with its protocols, direction, and the device that enforces it. The conduit list becomes the firewall rule set, and the drawing becomes the record.',
    keyPoints: [
      'Zones are drawn from function, criticality, and ownership, not from IP subnets.',
      'Every conduit is documented: endpoints, protocol, direction, initiator, enforcement.',
      'The conduit table is the firewall rule set. If a flow is not in the table, it is not allowed.',
      'Each remote site is its own zone. The radio or cellular link is a conduit.',
      'The undocumented conduit, usually a vendor modem or a dual-homed laptop, is where the drawing is wrong.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 12,
    tags: ['Cybersecurity', 'Networking', 'Design', 'Standards'],
    blocks: [
      { t: 'h2', text: 'The two words' },
      {
        t: 'p',
        text: 'IEC 62443 describes a control system as zones connected by conduits. A zone is a grouping of physical or logical assets that share common security requirements. A conduit is a logical grouping of communication channels between zones that share the same security requirements. The definitions are deliberately about requirements rather than about networks: two devices on the same switch can be in different zones if they need different protection, and two sites a hundred miles apart can be in the same zone if they do not.',
      },
      {
        t: 'p',
        text: 'In practice zones do usually end up mapped onto network segments, because a network boundary is how the requirement gets enforced. But the design goes in the order requirement first, network second. Drawing zones from the existing subnets is the most common mistake, and it produces a drawing that documents what happens to exist rather than what should.',
      },
      { t: 'h2', text: 'Drawing the zones' },
      {
        t: 'steps',
        items: [
          { title: 'Start from the asset inventory', text: 'Every controller, HMI, server, workstation, network device, radio, modem, and instrument with a network address. A zone drawing built from memory misses the things that matter.' },
          { title: 'Group by function', text: 'Assets that do the same job together: the SCADA servers, the plant PLCs, the engineering workstations, the historian. Then by physical location, because a remote site cannot share enforcement with the plant.' },
          { title: 'Separate by criticality', text: 'Within a function, split out anything whose compromise has a different consequence. A chlorine feed controller and a lighting controller are both PLCs; they are not the same zone.' },
          { title: 'Separate by ownership and trust', text: 'Anything managed by someone else, a vendor-maintained package system, a leased radio network, a shared municipal network, gets its own zone or is treated as outside.' },
          { title: 'Assign a target security level', text: 'From the risk assessment, per zone. Most control zones land at SL 2. The zone containing the most consequential process gets the closest look.' },
          { title: 'Check the boundaries', text: 'Every place a line crosses a zone edge is a conduit and needs an enforcement point. If a boundary cannot be enforced, either merge the zones and protect them at the higher level, or move the enforcement to where it can be done.' },
        ],
      },
      { t: 'h2', text: 'A worked example' },
      {
        t: 'p',
        text: 'A mid-size water and wastewater utility with one treatment plant, a SCADA system, a dozen remote sites, and an office network might partition itself like this.',
      },
      {
        t: 'table',
        head: ['Zone', 'Contents', 'Target level', 'Notes'],
        rows: [
          ['Enterprise', 'Office workstations, email, billing, internet', 'Outside the IACS', 'Treated as untrusted from the control side, whatever the IT department does inside it.'],
          ['Industrial DMZ', 'Historian replica, remote access jump host, patch and antivirus relays, reporting server', 'SL 2', 'The only zone that talks to both enterprise and control. Nothing in control talks directly to enterprise.'],
          ['SCADA servers', 'SCADA server pair, primary historian, alarm and notification server, domain controller for the control domain', 'SL 2', 'Operator workstations may be here or in their own zone if they are in a different physical area.'],
          ['Plant control', 'Plant PLCs, local HMIs, plant control switches', 'SL 2', 'Split into two zones if the plant has a process whose loss is much worse than the others, such as disinfection.'],
          ['Engineering', 'Engineering workstations with programming software, program backups', 'SL 2', 'Often a separate zone because it is the one place that can change controller programs.'],
          ['Remote sites', 'Lift station and well site RTUs and PLCs, each site separately', 'SL 1 or SL 2', 'One zone per site. A compromised site should not reach another site.'],
          ['Vendor package systems', 'A membrane skid or a generator controller with its own network', 'Per assessment', 'A zone with a single conduit to plant control, and no conduit anywhere else.'],
        ],
      },
      {
        t: 'p',
        text: 'The conduits between those zones are then listed one at a time. The table is long in real systems; the extract below shows the shape.',
      },
      {
        t: 'table',
        caption: 'Conduit inventory extract',
        head: ['From', 'To', 'Protocol and port', 'Initiator', 'Enforced by'],
        rows: [
          ['SCADA servers', 'Plant control', 'EtherNet/IP, TCP 44818 and UDP 2222', 'SCADA servers', 'Plant firewall, rule 12'],
          ['SCADA servers', 'Remote sites', 'DNP3, TCP 20000', 'SCADA servers, with unsolicited responses from sites', 'Telemetry router ACL and per-site firewall'],
          ['Plant control', 'SCADA servers', 'None initiated from plant control', 'None', 'Plant firewall default deny'],
          ['SCADA servers', 'Industrial DMZ', 'Historian replication, on the port the vendor documents', 'SCADA servers, outbound only', 'DMZ firewall, rule 3'],
          ['Enterprise', 'Industrial DMZ', 'HTTPS to reporting server, TCP 443', 'Enterprise clients', 'DMZ firewall, rule 7'],
          ['Industrial DMZ', 'SCADA servers', 'RDP from jump host, TCP 3389', 'Jump host only, after MFA', 'DMZ firewall, rule 9, time-limited'],
          ['Engineering', 'Plant control', 'Programming protocols per controller family', 'Engineering workstations', 'Plant firewall, rule 15, logged'],
          ['Anything', 'Anything else', 'None', 'None', 'Default deny on every boundary'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Direction matters more than protocol',
        text: 'The most valuable column is the initiator. A conduit that lets the SCADA server poll a PLC is very different from one that lets the PLC open connections to the server, even on the same port. Write down who starts the conversation, and configure the firewall to allow only that. The push-not-pull rule across the DMZ comes directly from this.',
      },
      { t: 'h2', text: 'From the table to the firewall' },
      {
        t: 'p',
        text: 'Each row in the conduit table becomes one or more firewall rules, and the rule number goes back into the table. This is what makes the drawing maintainable: when a rule is questioned a year later, the table says which conduit it serves and why. A rule with no conduit is removed. A conduit with no rule is a finding. The discipline is that the table is the source and the firewall is the implementation, not the other way around.',
      },
      { t: 'h2', text: 'Remote sites' },
      {
        t: 'p',
        text: 'Utilities have many small zones and few large ones. Each lift station, well, and tank site is its own zone because a site is physically accessible to anyone with a bolt cutter, its enclosure may have a cellular modem in it, and its compromise should stop at the fence. The conduit from each site to the SCADA servers is the telemetry link, and it is enforced at the site by a small firewall or router access list that allows the SCADA protocol to the master and nothing else, and at the plant by the telemetry router that refuses site-to-site traffic.',
      },
      { t: 'h2', text: 'The conduits nobody drew' },
      {
        t: 'p',
        text: 'When a zone drawing is checked against the network, the discrepancies are almost always conduits that exist without being documented. Look for these.',
      },
      {
        t: 'ul',
        items: [
          'A cellular modem installed by a vendor for support, with the vendor holding the credentials, plugged into the control network.',
          'A laptop with wireless enabled that is also cabled into a control switch, bridging enterprise and control.',
          'A historian or reporting connection that was set up as a pull from the enterprise side because it was easier.',
          'A managed switch with its management interface on the control VLAN and a default password.',
          'A printer, a camera system, or an HVAC controller sharing the control network because a port was free.',
          'A remote desktop tool on the SCADA server that reaches the internet directly.',
        ],
      },
      {
        t: 'p',
        text: 'Each of these is either brought into the table and enforced, or removed. Leaving one off the drawing does not make it go away; it makes the drawing wrong.',
      },
    ],
    faqs: [
      {
        q: 'How many zones is too many?',
        a: 'A zone should have a reason to exist: a distinct requirement, a distinct location, or a distinct owner. If two zones have identical requirements and share an enforcement point, merge them. Utilities typically end with a handful of plant zones plus one per remote site, which sounds like many, but each site zone is the same template.',
      },
      {
        q: 'Can a VLAN be a zone boundary?',
        a: 'A VLAN separates traffic; it does not enforce a requirement unless something between the VLANs filters traffic. A VLAN boundary with a firewall or an access list at the inter-VLAN router is an enforceable zone boundary. A VLAN alone is an organizational convenience.',
      },
      {
        q: 'What security level do conduits get?',
        a: 'A conduit inherits the requirements of the zones it connects and needs enough protection to keep the higher-level zone at its level. A conduit between an SL 2 zone and the enterprise needs enforcement that resists an SL 2 attacker coming from the enterprise side.',
      },
      {
        q: 'Who maintains the zone drawing?',
        a: 'The same person or group that owns the control network configuration, and it is reviewed whenever a device is added, a firewall rule changes, or a vendor connection is installed. It belongs with the network drawing and the asset inventory as one set of documents that describe the same system.',
      },
    ],
    related: [
      '/cybersecurity/ot-security/iec-62443',
      '/cybersecurity/ot-security/purdue-model',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
      '/controls/plc-systems/communications/dnp3',
    ],
  },
  {
    path: '/cybersecurity/remote-access/vendor-remote-access',
    kind: 'reference',
    title: 'Vendor Remote Access',
    summary:
      'Integrators and equipment vendors need to get in. How to let them without leaving a permanent door open: utility-controlled sessions, named accounts, MFA, a jump host, session recording, and what to do about the modem you did not know was there.',
    answer:
      'Vendor remote access should be enabled by the utility for a specific session, to a specific system, by a named person with multi-factor authentication, through a jump host that logs and preferably records the session, and then disabled. Persistent vendor connections, shared accounts, consumer remote-desktop tools on SCADA servers, and vendor-installed modems are the patterns that have led to incidents, and each is replaced by a control in this design.',
    keyPoints: [
      'The utility enables the session and disables it. Access is never standing.',
      'Named accounts per person at the vendor, with MFA, and removal when they leave.',
      'All vendor sessions land on a jump host in the DMZ and go no further than the system in the ticket.',
      'Record or at least log every session. The recording is how a change is traced later.',
      'Find and remove vendor-installed modems and remote tools. They are the access path you do not control.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Cybersecurity', 'SCADA', 'Networking'],
    blocks: [
      { t: 'h2', text: 'Why this deserves its own page' },
      {
        t: 'p',
        text: 'Every utility has people outside it who legitimately need to reach the control system: the integrator who built the SCADA system, the pump vendor who supports the drives, the membrane supplier who monitors the skid, the radio vendor. Their access is useful and often written into a support contract. It is also, repeatedly, the path by which control systems have been compromised, because vendor access tends to be set up once for convenience and never looked at again.',
      },
      {
        t: 'p',
        text: 'A widely reported 2021 incident at a Florida water treatment plant involved a remote desktop tool with a shared password on a SCADA workstation. Whoever was ultimately responsible for what happened that day, the lesson stood on its own: shared credentials on a consumer remote tool with no session control is not vendor access. It is an open door with a vendor standing near it.',
      },
      { t: 'h2', text: 'The patterns that go wrong' },
      {
        t: 'table',
        head: ['Pattern', 'Why it is common', 'What goes wrong'],
        rows: [
          ['Consumer remote desktop tool on the SCADA server', 'Free, easy, works through any firewall', 'Reaches the internet directly from the control zone; shared password; no record of who connected; software the utility cannot patch or audit'],
          ['Vendor-installed cellular modem', 'The vendor needed support access and the utility network was inconvenient', 'A conduit the utility did not draw, with credentials the utility does not hold, on a device that is never updated'],
          ['Shared vendor account', 'One login for the whole support desk', 'No accountability; the password outlives every employee who knew it; cannot be revoked for one person'],
          ['Standing VPN for the vendor', 'Set up during commissioning and left on', 'The vendor network becomes part of the utility attack surface; a compromised vendor laptop is inside'],
          ['Direct access to controllers', 'The vendor connects straight to the PLC from wherever they are', 'No jump host, no logging, and the vendor laptop is now on the control network with whatever it carries'],
        ],
      },
      { t: 'h2', text: 'The design' },
      {
        t: 'p',
        text: 'The controls below fit together. Each one addresses a specific failure in the table above.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Utility-initiated access', text: 'The vendor requests a session, by phone, email, or ticket. A utility employee enables the access, whether by turning on the VPN account, opening the firewall rule for a time window, or physically connecting something. When the work is done the access is disabled. The default state is off.' },
          { title: 'Named accounts with MFA', text: 'Each vendor employee who may connect has their own account, tied to their name, with multi-factor authentication. The vendor notifies the utility when someone leaves and the account is removed. No account is shared.' },
          { title: 'A jump host in the DMZ', text: 'The vendor session terminates on a hardened jump host in the industrial DMZ, not on a SCADA server or a PLC. From the jump host, a second connection is made to the target system, using the tools installed on the jump host. The vendor laptop never touches the control network.' },
          { title: 'Least reach', text: 'The firewall between the jump host and the control zone allows the jump host to reach only the system named in the ticket, for the duration of the session. Reaching one PLC does not mean reaching all of them.' },
          { title: 'Session recording and logging', text: 'The jump host logs the connection, and where possible records the session as video or a keystroke log. Every change made by a vendor is then traceable. The recording is also what proves a vendor did not do something.' },
          { title: 'Utility oversight', text: 'An operator watches the session on the HMI, or at least is present and knows what the vendor intends to do. A vendor changing a controller program on a live process is a change with operational consequences, not just a security event.' },
          { title: 'Documented change', text: 'What the vendor did goes into the change log, with the program backup taken before and after. Vendor work is the most common source of undocumented changes.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The operator switch',
        text: 'A physical key switch or a labeled HMI button that enables vendor access, with a timer that turns it off after a set period, is a well-liked implementation of utility-initiated access. It is visible, it is under the control of the person on shift, and it cannot be left on by accident because it turns itself off.',
      },
      { t: 'h2', text: 'Contracts and expectations' },
      {
        t: 'p',
        text: 'Access arrangements outlive the people who set them up, so the terms belong in the support contract, not in an email. Useful clauses cover named-account provisioning and removal, the notification the vendor must give before connecting, the systems the vendor may access, the utility right to monitor and record sessions, the vendor responsibility for the security of the connecting laptop, and the requirement that no vendor-supplied remote access device or software be installed without the utility writing it into the conduit inventory. IEC 62443-2-4 is the reference for what to ask of an integrator or service provider.',
      },
      { t: 'h2', text: 'Finding the access you did not authorize' },
      {
        t: 'p',
        text: 'Existing systems accumulate access paths. Before the design above means anything, the old paths have to be found and closed.',
      },
      {
        t: 'ul',
        items: [
          'Walk every panel and enclosure for cellular modems, DSL modems, and radios that are not on the network drawing. Follow every cable that leaves a control switch.',
          'List the software on every SCADA server and workstation and remove remote desktop tools that are not part of the designed path.',
          'Review the firewall rules and the VPN accounts for anything belonging to a vendor, and for anything with no owner.',
          'Ask each vendor how they currently connect. The answer is often surprising to both parties.',
          'Check the controllers for web servers and services with default credentials that a vendor enabled for convenience.',
        ],
      },
      { t: 'h2', text: 'Vendors that need continuous access' },
      {
        t: 'p',
        text: 'Some arrangements are legitimately continuous: a membrane vendor monitoring skid performance, a drive vendor collecting diagnostics, a cloud analytics service. Handle these as one-way data flows out of the control zone through the DMZ, using a data diode or a strictly outbound connection, so the vendor receives data but cannot reach in. Any capability to change something on site stays behind the session-based access described above. Monitoring and control are different conduits, and only one of them needs to exist all the time.',
      },
    ],
    faqs: [
      {
        q: 'The vendor says their remote tool is secure. Is that enough?',
        a: 'The tool may well be secure. The question is whether the utility controls the session: who connects, when, to what, with what record. A secure tool that the vendor can use at any time without the utility knowing fails on every one of those. Use the vendor tool if it fits, but only through the utility jump host and the utility switch.',
      },
      {
        q: 'How do we handle an emergency at 2 a.m. when no one is at the plant?',
        a: 'The on-call operator enables the access remotely through the same path that operators use, which is itself MFA-protected and logged. An emergency is the case where a recorded session matters most, not the case where the controls are skipped.',
      },
      {
        q: 'Should the integrator have a permanent account?',
        a: 'A permanent named account with MFA that is disabled between sessions is reasonable and avoids re-provisioning every time. Permanent access, meaning the account can connect at any time without the utility enabling it, is not.',
      },
      {
        q: 'What about the vendor connecting on site with their laptop?',
        a: 'On-site access still goes through the utility. The vendor laptop connects to a designated engineering port or to the jump host, not to an arbitrary control switch, and the same logging applies. A laptop that has been on other customer networks is not less risky because its owner is standing in the room.',
      },
    ],
    related: [
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/ot-security/purdue-model',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/ot-security/iec-62443',
    ],
  },
  {
    path: '/cybersecurity/plc-security/controller-hardening',
    kind: 'reference',
    title: 'Controller Hardening',
    summary:
      'What can be locked down on a PLC or RTU: keyswitch and mode, credentials, unused services, access lists, firmware, and the engineering workstation that is the real target.',
    answer:
      'Hardening a controller means removing every capability an attacker could use that the process does not need: leave the keyswitch in RUN, protect the project and the controller with credentials, disable the web server, FTP, Telnet, and default SNMP communities, restrict which addresses may connect where the controller supports it, keep firmware current on a tested schedule, and treat the engineering workstation as part of the controller. For controllers that offer none of this, the network around them provides the protection.',
    keyPoints: [
      'A PLC is only as secure as the laptop that can program it.',
      'Keyswitch in RUN, mode changes alarmed, program changes detected.',
      'Disable every service the process does not use. Most ship enabled.',
      'Where the controller cannot protect itself, the firewall in front of it must.',
      'Write the program so that bad data and unexpected commands are caught in logic.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 12,
    tags: ['Cybersecurity', 'PLC', 'Programming'],
    blocks: [
      { t: 'h2', text: 'What a controller can and cannot do' },
      {
        t: 'p',
        text: 'Programmable controllers were designed to be easy to reach. Their protocols assume a trusted network, many of them accept a program download from anyone who can send the right packets, and a controller from fifteen years ago may have no concept of a user at all. Newer platforms add real controls: signed firmware, authenticated protocols, role-based access, and integrity checks. Hardening is the work of using whatever the controller has, and surrounding it with network controls for whatever it lacks.',
      },
      {
        t: 'p',
        text: 'The controller is also not the most likely target. The engineering workstation that holds the programming software and the project files can change any controller it reaches, and it is a Windows machine with a browser. Hardening that starts at the controller and forgets the workstation has locked the vault and left the key on the counter.',
      },
      { t: 'h2', text: 'Hardening measures' },
      {
        t: 'table',
        head: ['Measure', 'What it does', 'Notes'],
        rows: [
          ['Keyswitch in RUN', 'Prevents program download and mode change from the network on controllers with a physical switch', 'The single most effective control on a legacy controller. Remote mode change is convenient exactly when it should not be possible.'],
          ['Controller access credentials', 'Requires authentication to connect, view, or modify', 'Named users where the platform supports them; otherwise a strong controller password held by the utility, not the vendor.'],
          ['Project and source protection', 'Prevents an attacker who obtains the project file from reading or modifying it', 'Protect the file, and keep the unprotected master in the engineering backup store, not on the laptop.'],
          ['Disable unused services', 'Closes the web server, FTP, Telnet, SNMP, email, and vendor discovery protocols that ship enabled', 'Each one is a login prompt or a data leak. Turn off what the process does not use; document what stays on and why.'],
          ['Change default credentials', 'Removes the passwords printed in the manual', 'Web servers, SNMP community strings, and embedded switches all ship with defaults.'],
          ['Access control lists', 'Restricts which addresses can reach the controller, or which can write', 'Available on many current controllers and on managed switches in front of older ones.'],
          ['Authenticated protocols', 'Uses the secure variants where both ends support them', 'CIP Security, OPC UA with certificates, DNP3 secure authentication. Requires the SCADA side to support it too.'],
          ['Firmware currency', 'Removes known vulnerabilities', 'On a tested schedule, with the program backed up, during a planned outage. Firmware is never updated on a live process on a whim.'],
          ['Remove unused logic and tags', 'Reduces what an attacker can influence and what an operator can misread', 'Old test routines and forcing blocks are a favorite place to hide a change.'],
          ['Physical protection', 'Locks the enclosure and the port', 'A controller with the door open in an unlocked building is reachable by anyone with a laptop, whatever the network says.'],
        ],
      },
      { t: 'h2', text: 'Mode and change monitoring' },
      {
        t: 'p',
        text: 'Two things about a controller are worth alarming in SCADA at all times: its mode, and whether its program has changed. A controller that leaves RUN when no one is scheduled to work on it, or whose program checksum changes, is either being maintained without a change record or is under attack, and both deserve a call. Most platforms expose mode, a program checksum or change counter, and the time of last edit as readable status. Log them, alarm on change, and compare the checksum to the last approved backup.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The keyswitch is not obsolete',
        text: 'On many controllers the physical keyswitch is the only control that cannot be defeated from the network. Leaving it in REMOTE so that programmers do not have to drive to the site trades that protection for convenience. If remote programming is genuinely needed, do it through the vendor remote access design with the switch turned by a person on site for the session, and return it to RUN after.',
      },
      { t: 'h2', text: 'Programming for security' },
      {
        t: 'p',
        text: 'Hardening is not only configuration. How the program is written determines what an attacker who reaches the controller, or the HMI that writes to it, can actually cause. The community-maintained Top 20 Secure PLC Coding Practices collects the useful ones; the following apply to almost every water and wastewater program.',
      },
      {
        t: 'ul',
        items: [
          'Validate every input and every written setpoint against a physical range. A chemical feed setpoint of ten times the maximum is rejected in logic, not obeyed.',
          'Keep operational logic in the controller, not the HMI. The HMI writes a setpoint or a command; the controller decides whether to act on it and enforces the limits and interlocks itself.',
          'Restrict HMI writes to a defined set of tags. Nothing outside the command and setpoint list is writable from the network, and the program does not read commands from tags that are not on the list.',
          'Use plausibility checks between related signals: a pump that shows running with zero current, a flow with the valve closed, a level that changes faster than the well can. Alarm the disagreement.',
          'Alarm on mode change, on program change, on a hard stop, and on a restart. Count restarts and alarm the count.',
          'Do not leave forces, test bits, or simulation modes in a production program. If a simulation mode is needed, make it visible on every HMI screen while active.',
          'Log significant events in the controller with timestamps, not only in SCADA, so an investigation has a record that survives the SCADA server.',
          'Fail to a safe state on loss of communication. The controller runs the process on its own; a lost HMI does not leave a valve where an attacker left it.',
        ],
      },
      { t: 'h2', text: 'Controllers with no security' },
      {
        t: 'p',
        text: 'A large share of the installed base cannot be hardened much: no credentials, no services to disable, a protocol that accepts any command. The controls for these are around the controller.',
      },
      {
        t: 'ol',
        items: [
          'A firewall or a managed switch with an access list directly in front of the controller, allowing the SCADA master and the engineering zone only, on the protocol ports only.',
          'Deep packet inspection on the conduit where it is available, so that the firewall can allow reads and block writes or program downloads from anything other than the engineering workstation.',
          'Keyswitch in RUN, which most of these controllers do have.',
          'A program integrity check from the engineering side: a scheduled upload compared with the approved backup.',
          'A replacement plan. A controller that cannot be secured and cannot be isolated is a risk with a date on it.',
        ],
      },
      { t: 'h2', text: 'The engineering workstation' },
      {
        t: 'p',
        text: 'The machine that programs the controllers is the most powerful device on the control network. It should be a dedicated machine, never the same laptop used for email and the web, in its own zone with a logged conduit to the control zone, with its own named accounts and MFA, with the programming software kept current, with removable media controlled, and with the project files backed up to a store the workstation cannot silently overwrite. An integrator laptop that programs many customers is a shared conduit between all of them; the on-site access rules on the vendor remote access page apply to it.',
      },
    ],
    faqs: [
      {
        q: 'Does hardening risk breaking the process?',
        a: 'Some measures do, which is why each one is tested. Disabling a service that the HMI was quietly using, or enabling an access list that omits the historian, stops data. Do the work on a documented plan during a maintenance window, one controller at a time, with the program backed up and a rollback ready. Keyswitch to RUN and default password changes are safe on any working system.',
      },
      {
        q: 'Should firmware always be current?',
        a: 'Current within a tested schedule. A firmware update on a controller is a change to a running process and can change behavior; it goes through the same testing and outage planning as a program change. What is not acceptable is a controller on a firmware version with a known remotely exploitable vulnerability and no compensating control in front of it.',
      },
      {
        q: 'Is the controller password enough?',
        a: 'No. It is one layer, and on many platforms it protects the project file more than the controller. The network access list and the keyswitch are the layers that stop an attacker who never had the file.',
      },
      {
        q: 'Where do I start on a system with two hundred controllers?',
        a: 'With the inventory: which controllers, which firmware, which services, which mode. Then keyswitches to RUN and default credentials changed everywhere, because those are cheap and safe. Then the network access lists on the conduits, starting with the zones the risk assessment ranked highest.',
      },
    ],
    related: [
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/ot-security/iec-62443',
      '/controls/plc-systems/plc-fundamentals/cpu',
      '/controls/plc-systems/plc-fundamentals/memory',
      '/controls/plc-systems/analog-control/signal-validation',
    ],
  },
  {
    path: '/cybersecurity/network-segmentation/dmz-design',
    kind: 'reference',
    title: 'Industrial DMZ Design',
    summary:
      'The buffer zone between the business network and the control system: what goes in it, the no-direct-path rule, push-not-pull data flows, the firewall pair, and the services a utility actually needs to place there.',
    answer:
      'An industrial demilitarized zone is a network segment between the enterprise network and the control network in which every service that both sides need to reach is placed, so that no connection ever passes directly from one to the other. Data leaves the control zone by being pushed to a replica in the DMZ, remote access lands on a jump host in the DMZ, and patches and antivirus updates are staged in the DMZ. Two firewalls, or one with strict zone rules, enforce that the DMZ is the only thing either side talks to.',
    keyPoints: [
      'No connection crosses from enterprise to control or back. Everything terminates in the DMZ.',
      'Data is pushed out of the control zone to a DMZ replica; the enterprise reads the replica.',
      'Remote access lands on a DMZ jump host. The vendor never reaches the control zone directly.',
      'The DMZ holds servers the utility can rebuild. Nothing in it is needed to run the plant.',
      'Default deny on both firewalls, with a short, documented rule list per conduit.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Cybersecurity', 'Networking', 'Design', 'SCADA'],
    blocks: [
      { t: 'h2', text: 'Why a DMZ' },
      {
        t: 'p',
        text: 'A utility wants to see plant data on the business network, wants engineers and vendors to reach the control system from outside, and wants patches and antivirus signatures to arrive at the SCADA servers. Each of those is a connection between the enterprise network, which is exposed to email, the web, and every laptop that joins it, and the control network, which runs the plant. Allowing those connections directly means an attacker who gets into the enterprise network is one firewall rule away from the PLCs.',
      },
      {
        t: 'p',
        text: 'The DMZ breaks that path. It is a third network between the two, holding the services both sides need, with a firewall boundary on each side. The enterprise talks to the DMZ. The control zone talks to the DMZ. Neither talks to the other. An attacker who compromises a DMZ server has reached a server the utility can rebuild in an afternoon, and still has a second firewall between them and the plant.',
      },
      { t: 'h2', text: 'What goes in it' },
      {
        t: 'table',
        head: ['Service', 'Purpose', 'Direction of data'],
        rows: [
          ['Historian replica or data collector', 'Enterprise users and reporting tools read plant data here', 'Control pushes to the replica; enterprise reads the replica'],
          ['Remote access jump host', 'Every external session lands here, then opens a second session inward', 'Enterprise or VPN to the jump host; jump host to control on approved conduits'],
          ['Patch and update staging server', 'Windows updates, antivirus definitions, vendor patches downloaded here and pulled by control-zone servers', 'Enterprise or internet to the staging server; control pulls from it on a schedule'],
          ['Reporting and dashboard server', 'Web reports for management, compliance reports, alarm summaries', 'Reads the replica; serves enterprise browsers'],
          ['File transfer server', 'Program backups out, vendor files in, with scanning', 'Both, through the transfer server, never directly'],
          ['Time server', 'A single NTP source for control, synchronized from outside', 'Control reads time from the DMZ; DMZ reads from a trusted external source'],
          ['Domain controller replica, where the control zone has its own domain', 'Authentication for DMZ hosts without exposing the control domain', 'Replication from the control domain controller, outbound only'],
        ],
      },
      {
        t: 'p',
        text: 'The test for whether something belongs in the DMZ is whether both sides need it. A service only the control zone uses stays in the control zone. A service only the enterprise uses stays there. The DMZ is not a place to put things that did not fit elsewhere.',
      },
      { t: 'h2', text: 'The rules' },
      {
        t: 'dl',
        items: [
          { term: 'No direct path', def: 'No firewall rule permits a connection from any enterprise address to any control address, or the reverse, on any port. Every exception someone requests is met by placing a service in the DMZ instead.' },
          { term: 'Push out, never pull in', def: 'Data leaves the control zone because a control-zone server initiates a connection outward to the DMZ replica. The DMZ never initiates a connection into the control zone to fetch data. A rule that allows the DMZ to open connections inward is a rule an attacker in the DMZ can use.' },
          { term: 'Different protocols on each side', def: 'Where practical, the protocol between control and DMZ differs from the protocol between DMZ and enterprise. A historian replicates by its own protocol inward; enterprise users read it by HTTPS or SQL. An attacker cannot ride one protocol end to end.' },
          { term: 'Default deny', def: 'Both boundaries deny everything not explicitly listed. The rule list for each boundary is short, each rule names its conduit, and the list is reviewed on a schedule.' },
          { term: 'Hardened and disposable', def: 'DMZ hosts are patched first, run only their service, have host firewalls, and are backed up so they can be rebuilt. Nothing in the DMZ is required for the plant to run.' },
          { term: 'Logged', def: 'Both firewalls log denied and permitted connections to a log server, and someone reads the denials.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The jump host is the DMZ service most likely to be attacked',
        text: 'It is reachable from outside by design and it can reach the control zone by design. Harden it beyond the others: multi-factor authentication, no local internet access, session recording, a minimal tool set, and firewall rules that let it reach only the specific control hosts on the specific ports named in the access procedure.',
      },
      { t: 'h2', text: 'Firewall arrangement' },
      {
        t: 'p',
        text: 'The classic arrangement uses two physical firewalls, one between enterprise and DMZ and one between DMZ and control, ideally from different vendors so that a vulnerability in one does not open both. Many utilities use a single firewall with three interfaces and a strict zone policy instead, which is acceptable if the rules are written as if there were two devices and no rule references enterprise and control in the same line. The single-firewall design has one management plane to protect and one device to fail; the two-firewall design costs more and needs two sets of rules maintained. Either is far better than no DMZ.',
      },
      { t: 'h2', text: 'A utility-sized DMZ' },
      {
        t: 'p',
        text: 'A small utility does not need a rack of DMZ servers. One well-specified server, or two virtual machines on a small host, can carry the historian replica, the jump host, and the patch staging role, with the firewall rules separating them. What it must not do is skip the DMZ because it is small: the enterprise-to-control direct connection is the same risk at a 5 MGD plant as at a 50 MGD plant, and the incidents in the water sector have been at small utilities more often than large ones.',
      },
      { t: 'h2', text: 'Common failures' },
      {
        t: 'ul',
        items: [
          'A historian configured to pull from the control zone because that was the default in the setup wizard.',
          'A rule added for a vendor "temporarily" that allows enterprise to control on one port, still present five years later.',
          'The jump host with a browser, an email client, and internet access, because a vendor wanted to download something.',
          'A DMZ server joined to the enterprise domain, so an enterprise domain compromise owns the DMZ.',
          'Operator workstations on the enterprise network with the SCADA client installed, reaching the SCADA server through a permitted rule.',
          'Antivirus and patch servers in the DMZ with a rule that lets them push into the control zone on a management port, which is a pull-in rule under another name.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can operators view SCADA from the enterprise network?',
        a: 'They can view a read-only replica or a web report served from the DMZ. Running the full SCADA client on an enterprise workstation connected to the control-zone server is the direct path the DMZ exists to prevent. Where remote operation is genuinely required, it goes through the jump host with the same controls as vendor access.',
      },
      {
        q: 'Does the DMZ need its own domain?',
        a: 'It should not be part of the enterprise domain, and it should not expose the control domain directly. Common answers are local accounts on DMZ hosts, a small DMZ domain, or a read-only replica of the control domain controller placed in the DMZ. The wrong answer is joining DMZ hosts to the enterprise domain.',
      },
      {
        q: 'Is a data diode better than a DMZ?',
        a: 'A diode enforces one-way flow physically and is the strongest form of the push-out rule for data leaving the control zone. It does not provide the inbound services a DMZ does: remote access, patch staging, file transfer. Utilities with a diode still have a DMZ for those, or have decided not to allow them at all.',
      },
      {
        q: 'Where does the cellular telemetry network connect?',
        a: 'Remote site telemetry over cellular is a conduit into the control zone from a carrier network, and it terminates on a telemetry router or VPN concentrator that belongs to the control zone boundary, not to the DMZ. It is treated as its own conduit with its own rules: only the SCADA protocol, only from the site addresses, only to the master.',
      },
    ],
    related: [
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/ot-security/purdue-model',
      '/cybersecurity/remote-access/jump-hosts',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/controls/scada-hmi/scada-fundamentals/historians',
    ],
  },
  {
    path: '/cybersecurity/remote-access/jump-hosts',
    kind: 'reference',
    title: 'Jump Hosts',
    summary:
      'The one machine every remote session must pass through: what a jump host is, how it is hardened, what it may reach, session recording, the tools it carries, and why a vendor laptop never gets past it.',
    answer:
      'A jump host is a hardened server in the industrial DMZ that every remote session terminates on before a second, separately authenticated connection is opened to a control-zone system. It carries the engineering and remote desktop tools needed for the work, records sessions, requires multi-factor authentication, has no path to the internet, and is permitted by the firewall to reach only the specific control hosts named in the access procedure. The remote user works on the jump host; their own machine never touches the control network.',
    keyPoints: [
      'Two hops, two authentications: outside to the jump host, jump host to the target.',
      'The remote machine never connects to the control zone. Only the jump host does.',
      'Firewall rules from the jump host into control name specific hosts and ports, per session where possible.',
      'Record every session. The recording is the change record and the evidence.',
      'A jump host with a browser and internet access is a workstation, not a jump host.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Cybersecurity', 'Networking', 'SCADA'],
    blocks: [
      { t: 'h2', text: 'What it does' },
      {
        t: 'p',
        text: 'Remote access to a control system has two problems. The first is that the machine connecting from outside is unknown: a vendor laptop that has been on other networks, a home computer, a phone. The second is that whatever it connects to becomes reachable by whatever is on that machine. The jump host solves both by being the only thing outside connections can reach, and by being a machine the utility owns, hardens, and watches.',
      },
      {
        t: 'p',
        text: 'The remote user authenticates to the jump host, with multi-factor authentication, and gets a desktop or a shell on it. From there they open a second connection to the target system, authenticating again with an account on that system. Everything they do happens on the jump host with the tools installed there. Their own machine sends keystrokes and receives screen images and nothing else. Files move only through a controlled transfer path with scanning, never by drag and drop into the session.',
      },
      { t: 'h2', text: 'Hardening' },
      {
        t: 'table',
        head: ['Control', 'What it means on the jump host'],
        rows: [
          ['Minimal build', 'The operating system with only the roles the jump host needs: remote desktop services or a shell, the engineering tools, the session recorder. No browser, no email client, no office suite.'],
          ['No internet', 'Firewall rules deny the jump host any path to the internet. Updates arrive through the patch staging server.'],
          ['Multi-factor authentication', 'Every login to the jump host, without exception, including administrators.'],
          ['Named accounts', 'One account per person, with the vendor company and the individual identifiable. No shared accounts. Disabled between sessions where the access model calls for it.'],
          ['Least reach', 'Firewall rules from the jump host into the control zone permit only the hosts and ports required. Where possible, rules are enabled per session and disabled after.'],
          ['Session recording', 'Video or keystroke recording of every session, stored outside the jump host, retained on a schedule.'],
          ['Logging', 'Logins, failures, connections opened inward, and file transfers, sent to a log server the jump host cannot alter.'],
          ['Patched first', 'The jump host is the most exposed control-related system and is patched on the enterprise schedule, not the control schedule.'],
          ['Clipboard and drive redirection off', 'The remote desktop session does not map the remote drives, clipboard, or printers into the jump host.'],
          ['Idle timeout and session limits', 'Sessions end after inactivity and after a maximum duration; a forgotten session is a door left open.'],
        ],
      },
      { t: 'h2', text: 'The tools on it' },
      {
        t: 'p',
        text: 'A jump host carries what remote work needs: the PLC programming software for the controller families on site, the SCADA configuration client, a remote desktop client, a terminal emulator, and the vendor tools for drives and analyzers. Each is installed and licensed by the utility, kept current, and configured with the project files fetched from the engineering backup store rather than stored on the jump host permanently. A jump host that accumulates project files becomes the place an attacker would look for them.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'One jump host per purpose',
        text: 'Where the budget allows, separate the vendor jump host from the one utility staff use, and separate both from the one that carries administrative access to servers. Compromise of the vendor host then does not carry the utility administrator credentials with it. A small utility with one jump host achieves some of this with separate accounts and separate firewall rules per group.',
      },
      { t: 'h2', text: 'Reaching the target' },
      {
        t: 'p',
        text: 'From the jump host, the second connection uses the protocol the target expects: remote desktop to a SCADA server, the programming protocol to a controller, HTTPS to a device web page. The firewall between the DMZ and the control zone allows the jump host, and only the jump host, to open those connections, and only to the targets listed. A vendor supporting the membrane skid gets a rule to the skid controller; they do not get a rule to the plant PLCs. When the access procedure enables rules per session, the rule for that target is turned on by the utility for the session and turned off after.',
      },
      { t: 'h2', text: 'Alternatives and adjuncts' },
      {
        t: 'dl',
        items: [
          { term: 'Privileged access management platforms', def: 'Commercial products that combine the jump host, credential vaulting, session recording, and approval workflow into one system. The jump host concept is inside them; they add credential injection so the remote user never learns the target password.' },
          { term: 'Browser-based remote access gateways', def: 'Present the target desktop in a browser through a gateway in the DMZ. The gateway is the jump host; the same hardening applies.' },
          { term: 'VPN directly into the control zone', def: 'What the jump host replaces. A VPN that lands a remote laptop on the control network makes that laptop a control-zone device. A VPN that lands on the DMZ and then requires the jump host is the intended design.' },
          { term: 'Vendor cloud remote access tools', def: 'A cloud relay that both the site and the vendor connect to outbound. Acceptable only if the site side terminates on a jump host with the same controls; unacceptable if the relay agent runs on a SCADA server or a PLC gateway with direct control-zone reach.' },
        ],
      },
      { t: 'h2', text: 'Operating it' },
      {
        t: 'ul',
        items: [
          'Review the session log weekly and after every vendor visit. Who connected, when, to what, for how long.',
          'Review the firewall rules from the jump host quarterly. Remove any rule whose conduit no longer exists.',
          'Test the recording. A recorder that has silently stopped is discovered when the recording is needed.',
          'Rebuild the jump host from a known image on a schedule or after any suspected compromise. It holds no data worth keeping.',
          'Alarm on failed logins above a threshold and on any login outside an approved session window.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a jump host necessary if we have a VPN?',
        a: 'A VPN authenticates the connection and encrypts it; it does not stop the remote machine from being what it is. The jump host is what keeps that machine off the control network. Use the VPN to reach the DMZ and the jump host to go further.',
      },
      {
        q: 'Can the jump host be a virtual machine?',
        a: 'Yes, and it usually is. A virtual machine on a DMZ host is easy to snapshot, rebuild, and isolate. It must not be on the same hypervisor as control-zone servers unless the hypervisor and its management network are themselves treated as control-zone assets.',
      },
      {
        q: 'How do vendors move files in?',
        a: 'Through a transfer server in the DMZ with malware scanning, or through a utility-controlled file share the jump host can read. Not by remote desktop drive mapping, and not by email to an operator who copies it onto a SCADA server on a USB stick.',
      },
      {
        q: 'What about emergency access when the jump host is down?',
        a: 'A second jump host, or a documented break-glass procedure with physical presence at the site. The wrong answer is a standing bypass rule for emergencies, which is a standing bypass rule.',
      },
    ],
    related: [
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/network-segmentation/dmz-design',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/ot-security/purdue-model',
    ],
  },
  {
    path: '/cybersecurity/backups/plc-program-backups',
    kind: 'reference',
    title: 'PLC Program Backups',
    summary:
      'What a complete controller backup contains, how often to take one, where to keep it, why the upload from the running controller is not the master, and the verification that turns a folder of files into a recovery plan.',
    answer:
      'A PLC program backup is the complete set of files needed to restore a controller to its current state: the project with comments and documentation, the firmware version, the configuration of every module and communication card, the retentive data and setpoints, and the parameters of attached devices. It is taken after every change and on a schedule, stored in at least two places including one offline, compared with the running controller to detect drift, and proven by an actual restore to a spare controller.',
    keyPoints: [
      'The backup is the project file with its comments, not the upload from the controller.',
      'Firmware version, module configuration, setpoints, and device parameters are part of it.',
      'Take one after every change, and compare on a schedule to catch changes nobody recorded.',
      'Two copies, one offline. A backup on the engineering laptop is one theft from gone.',
      'Restore one to a spare controller once a year. That is the test that matters.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Cybersecurity', 'PLC', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'What a backup is for' },
      {
        t: 'p',
        text: 'A controller fails, is destroyed by lightning, is ransomed, or is quietly modified. In every case the utility needs to put a known-good program back on a controller, quickly, with confidence that it is the right one. The backup is what makes that possible. It is also the reference against which the running controller is compared to find changes that were never recorded, which makes it a security control as much as a maintenance record.',
      },
      { t: 'h2', text: 'What a complete backup contains' },
      {
        t: 'table',
        head: ['Item', 'Why it is needed', 'Where it is often missed'],
        rows: [
          ['Project file with comments, tag descriptions, and documentation', 'The program someone can read and maintain', 'An upload from the controller without the offline project loses comments on many platforms'],
          ['Firmware version of the processor and every module', 'A project built for one firmware may not download to another; a replacement controller must be flashed to match', 'Recorded nowhere; discovered when the download fails'],
          ['Hardware configuration: rack, modules, communication cards, network settings', 'A restore onto a replacement needs the same configuration', 'Usually in the project; IP addresses and switch settings often are not'],
          ['Retentive data: setpoints, tuning, calibration factors, totalizer values', 'The program without its setpoints runs the plant wrong', 'Not part of the program file on most platforms; needs a separate export'],
          ['Attached device parameters: drives, analyzers, HMIs, radios', 'A restored controller talking to devices on defaults does not run the plant', 'Each device has its own backup tool and format'],
          ['The programming software version and any license files', 'A ten-year-old project may need a ten-year-old tool', 'The installer is gone from the vendor site; keep the media'],
          ['The as-built drawings and the control narrative', 'Context for the program', 'Stored somewhere else, if at all'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The upload is not the master',
        text: 'On many platforms, uploading from the running controller recovers the logic but not the comments, the tag descriptions, or the program documentation, and on some it recovers only a compiled image. The master is the offline project file that was downloaded, kept in step with what is running. Uploading is what you do to check the controller against the master, or when the master is lost.',
      },
      { t: 'h2', text: 'When to take one' },
      {
        t: 'ul',
        items: [
          'After every change, before the engineer leaves the site. The change record references the backup.',
          'On a schedule regardless of changes, monthly at most sites, to catch changes made without a record and to prove the process still works.',
          'Before any firmware update, any hardware replacement, and any vendor visit.',
          'Before and after commissioning of anything that touches the controller.',
        ],
      },
      { t: 'h2', text: 'Where to keep it' },
      {
        t: 'p',
        text: 'At least two copies in two places, one of which is offline or otherwise unreachable from the network where ransomware would run. A common arrangement is a version-controlled repository on a server in the engineering zone, a copy pushed to the DMZ file server for the enterprise backup system to collect, and a periodic export to removable media stored in a locked cabinet. The engineering laptop is a working copy, never the only copy; laptops are lost, stolen, and reimaged.',
      },
      {
        t: 'p',
        text: 'Version control, whether a purpose-built tool for controller projects or a general-purpose repository, records who changed what and when, keeps every previous version, and makes the comparison between versions easy. The purpose-built tools also automate the upload-and-compare against the running controller, which is the change detection function.',
      },
      { t: 'h2', text: 'Comparison and change detection' },
      {
        t: 'p',
        text: 'A backup that is compared against the running controller on a schedule finds two things: changes that were made and not recorded, and changes that were made by someone who should not have. Both are findings. The comparison uses the platform compare tool or the version control product, and the result is either identical, or a list of differences that each need an explanation. An unexplained difference is treated as an incident until it is explained. The controller mode, its program checksum, and its last-edit timestamp are also readable status values that the SCADA system can alarm on between comparisons.',
      },
      { t: 'h2', text: 'Proving it' },
      {
        t: 'steps',
        items: [
          { title: 'Pick a controller and a spare', text: 'A spare processor of the same model, on the bench, with the modules or a simulator.' },
          { title: 'Flash the firmware', text: 'To the version recorded in the backup. Note how long it took to find the firmware file.' },
          { title: 'Download the project', text: 'From the backup store, not from a laptop. Note any error and any prompt the person did not expect.' },
          { title: 'Load the retentive data and the device parameters', text: 'The setpoints, the drive parameters, the HMI project. Note anything that was missing from the backup.' },
          { title: 'Verify', text: 'Compare the restored controller with the running one. Identical is the goal; every difference is a gap in the backup.' },
          { title: 'Record and fix', text: 'Time taken, gaps found, gaps closed. Repeat annually and after any change to the process.' },
        ],
      },
      {
        t: 'p',
        text: 'A restore test finds the firmware file that was never saved, the license that expired, the software version that no longer installs on a current laptop, and the setpoint export that nobody did. Each of those is cheap to fix on the bench and very expensive to discover during an outage.',
      },
    ],
    faqs: [
      {
        q: 'How long should old versions be kept?',
        a: 'Indefinitely, for controller projects. Storage is cheap and a five-year-old version answers questions about when a behavior changed. Version control keeps them without effort.',
      },
      {
        q: 'Should the backup be encrypted?',
        a: 'The offline and off-site copies, yes, because they are portable. The working repository is protected by the engineering zone controls and access permissions. Whatever is encrypted, the key is stored where the restore team can get it without the systems that were lost.',
      },
      {
        q: 'What about controllers with no offline project, only the running program?',
        a: 'Upload it now, save it as the master, and document that comments are missing. Rebuild the documentation over time as people touch it. A program with no backup at all is the highest priority item in the backup program.',
      },
      {
        q: 'Who is allowed to restore a program to a controller?',
        a: 'The change management process says: a named person, with a change record, with the program verified against the backup store, with operations informed. A restore is a program download, and a program download to a running process is a change with consequences whatever its reason.',
      },
    ],
    related: [
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/controls/plc-systems/plc-fundamentals/memory',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/troubleshooting/plc-troubleshooting/program-will-not-download',
      '/engineering-library/control-documentation/control-narratives',
    ],
  },
  {
    path: '/cybersecurity/passwords-credentials/default-credentials',
    kind: 'reference',
    title: 'Default Credentials',
    summary:
      'The passwords printed in the manual: where they hide in a control system, why they are the first thing an attacker tries, how to find every one on site, and the procedure for changing them without locking yourself out.',
    answer:
      'Default credentials are the factory usernames and passwords that ship on controllers, HMIs, switches, radios, drives, analyzers, and cameras, and they are published in every manual and collected in public lists. They are the most common way into a control system that is reachable at all. Removing them means inventorying every device with a login, changing each default with the new credential recorded in a managed store, verifying the change, and making the check part of commissioning so that new and replaced devices do not reintroduce them.',
    keyPoints: [
      'Every device with a web page, a console, or a protocol login shipped with a default. Assume it is still there.',
      'Public lists index default credentials by vendor and model. An attacker does not need to guess.',
      'Change them one device at a time, record the new credential in the store first, and verify before leaving.',
      'Network switches, radios, and embedded web servers are the ones inventories miss.',
      'Add the check to the commissioning checklist so a replaced device does not arrive with its defaults.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'Networking', 'Commissioning'],
    blocks: [
      { t: 'h2', text: 'Why they matter' },
      {
        t: 'p',
        text: 'An attacker who reaches a device login page has two choices: try to exploit a vulnerability, or type the default. The default works often enough that it is tried first. Public databases list default credentials by vendor and model, scanning tools test for them automatically, and the exposure surveys of internet-reachable control devices find the same defaults year after year. A device on a control network with its default password is not protected by that password; it is protected only by whatever keeps the attacker off the network, and that is one layer where two were intended.',
      },
      { t: 'h2', text: 'Where they hide' },
      {
        t: 'table',
        head: ['Device', 'Typical default login', 'Note'],
        rows: [
          ['Managed Ethernet switches', 'Web and console management with a well-known admin account', 'Often installed by the electrical contractor and never touched; the management interface is on the control VLAN'],
          ['Serial and cellular radios', 'Web configuration page', 'Vendor-installed; the same password across the whole fleet'],
          ['PLC and RTU web servers', 'Diagnostic and configuration pages enabled by default', 'Disable the server if unused; change the password if used'],
          ['HMI panels', 'Runtime login levels with default passwords, and a maintenance or engineering level', 'The engineering level often has a documented default that lets a user exit the runtime to the operating system'],
          ['Drives and soft starters', 'Keypad parameter lock codes and network web pages', 'Rarely changed; a lock code of zero is the default on many'],
          ['Analyzers and smart instruments', 'Configuration menus and web interfaces', 'Also HART and other protocols with write protection off'],
          ['SCADA software', 'Built-in administrator accounts and default project users', 'The installation guide lists them'],
          ['Windows and Linux servers', 'Local administrator, service accounts created by installers', 'Vendor installers create accounts with documented passwords'],
          ['Cameras, UPS cards, environmental monitors, power meters', 'Web management', 'Every one has a network card and a login; most inventories miss them'],
          ['SNMP community strings', 'Public and private on nearly every network device', 'A read-write community string is a password to the device configuration'],
        ],
      },
      { t: 'h2', text: 'Finding every one' },
      {
        t: 'steps',
        items: [
          { title: 'Start from the asset inventory', text: 'Every device with a network address, and every device with a keypad or console login even without one. If the inventory does not exist, this is the reason to build it.' },
          { title: 'Add the devices inventories miss', text: 'Walk the panels. Switches, radios, cellular modems, UPS network cards, camera systems, power meters, and anything with an RJ-45 port.' },
          { title: 'Identify the login surfaces on each', text: 'Web page, console, SSH or Telnet, SNMP, vendor protocol, keypad lock. A single device may have four.' },
          { title: 'Check each against the default', text: 'Log in with the documented default. If it works, the device is on the list.' },
          { title: 'Rank the list', text: 'Devices reachable from outside the control zone first, then network infrastructure, then controllers and servers, then the rest.' },
        ],
      },
      { t: 'h2', text: 'Changing them' },
      {
        t: 'p',
        text: 'Changing a password on a device that runs a process is a change, and the risk of locking yourself out is real. The procedure is deliberate.',
      },
      {
        t: 'ol',
        items: [
          'Decide the new credential according to the password policy: unique per device, long, recorded in the credential store before it is set on the device.',
          'Confirm the recovery method for that device: a physical reset, a console port, a master password, a vendor procedure. Know it before changing anything.',
          'Change the credential, then log out and log back in with the new one. Do not trust the change until the new login has worked.',
          'Where the device supports named users, create them and disable the default account rather than only changing its password. A disabled account cannot be guessed.',
          'Change the SNMP community strings, or disable SNMP, on every network device. Treat a read-write community string as an administrator password.',
          'Record the change: device, date, person, the store entry, and the recovery method. Not the password itself, anywhere but the store.',
          'Update the anything that used the old credential: a SCADA driver that logs into a device, a monitoring tool that polls it, a backup script.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Fleet devices get unique credentials, managed',
        text: 'Forty radios with the same password are one leaked password from an open fleet. Unique credentials per device are manageable only with a credential store, which is why the store comes before the change. A spreadsheet on a shared drive is not a credential store.',
      },
      { t: 'h2', text: 'Keeping them changed' },
      {
        t: 'ul',
        items: [
          'Add a default credential check to the commissioning checklist for every new and replaced device. A replaced switch arrives with its defaults.',
          'Include the check in the periodic vulnerability review: scan for known defaults with a tool, on a schedule, from inside the control network.',
          'Write the requirement into integrator and vendor contracts: no device is handed over with a default credential, and the credentials are delivered to the utility store.',
          'When a person who knew credentials leaves, rotate what they knew. Named accounts make this a short list; shared credentials make it everything.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The device only has one account and no way to disable it. What then?',
        a: 'Change its password, restrict which addresses can reach the device with a firewall or an access list, disable the interface if it is not needed, and record the limitation. Many older devices are in this category, and network restriction is the compensating control.',
      },
      {
        q: 'What if changing the password could break the SCADA connection?',
        a: 'It might, if the SCADA driver or a monitoring tool logs into the device with that credential. Find those dependencies first from the driver configuration, schedule the change with operations, and update the dependent configuration in the same window with a rollback ready.',
      },
      {
        q: 'Is a lock code on a drive keypad worth setting?',
        a: 'Yes, where the drive is in a location people other than trained staff can reach, and always on the network web interface. A keypad lock prevents a casual or mistaken parameter change; the network credential prevents a remote one.',
      },
      {
        q: 'How do we handle vendor default accounts in SCADA software?',
        a: 'Rename or disable the built-in administrator where the product allows, set a long unique password where it does not, and create named accounts for every person. Vendors document their built-in accounts; treat that documentation as a list of what an attacker knows.',
      },
    ],
    related: [
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
      '/cybersecurity/ot-security/iec-62443',
    ],
  },
  {
    path: '/cybersecurity/water-wastewater-cybersecurity/small-utility-priorities',
    kind: 'reference',
    title: 'Small Utility Cybersecurity Priorities',
    summary:
      'What a utility with a few operators and no IT department should do first: the ten measures that remove most of the risk for the least money and time, in the order to do them, with what each one costs, what it prevents, and how to know it is done.',
    answer:
      'A small water or wastewater utility removes most of its cyber risk with ten measures: know what is connected, get every control device off the internet, remove default and shared passwords, put multi-factor authentication on remote access, back up the controller programs and SCADA offline and test a restore, keep the ability to run manually, separate the control network from the office network, keep vendor access under utility control, log in with named accounts, and write down who to call. None requires a security team; all require someone to own them.',
    keyPoints: [
      'Ten measures, in order. The first five take a week and remove most of the exposure.',
      'An internet-reachable PLC or HMI is the single worst finding. Fix it first, today.',
      'Backups that have never been restored are not backups.',
      'Manual operation is a security control. Practice it.',
      'Every measure needs an owner and a date, not a policy document.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Cybersecurity', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'Why small utilities first' },
      {
        t: 'p',
        text: 'The publicly reported incidents at water systems have disproportionately involved small utilities: a plant with a remote access tool and a shared password, a system with an HMI reachable from the internet, a utility whose SCADA was ransomed with no offline backup. Small utilities are not targeted because they are valuable; they are found because they are reachable, by scans that cover the whole internet and try the defaults. The defenses that stop those attacks are cheap, and the reason they are missing is that nobody owned them, not that nobody could afford them.',
      },
      {
        t: 'p',
        text: 'This page is the order of work for a utility with one to a handful of operators, no IT staff, and a contractor or an integrator on call. Each measure names what it prevents, roughly what it costs, and how to know it is finished.',
      },
      { t: 'h2', text: 'The ten' },
      {
        t: 'steps',
        items: [
          { title: 'Know what is connected', text: 'Walk every panel and list every device with a network cable, a radio, or a modem: controllers, HMIs, switches, radios, cellular modems, cameras, remote access boxes. Follow every cable that leaves a control switch. Cost: a day with a clipboard. Done when: a list exists with the device, its location, its address, and who put it there.' },
          { title: 'Get everything off the internet', text: 'Check every device on the list for a path to the internet: a public IP, a port forward on the office router, a cellular modem with a public address, a remote access tool that calls out. Remove each one. Cost: hours, plus a router configuration. Done when: an external scan of the utility public addresses finds no control devices, and every remote access path is one the utility deliberately built.' },
          { title: 'Remove default and shared passwords', text: 'Every device on the list, every SCADA account, every remote tool. Unique per device, recorded in a password manager the utility controls. Cost: a few days. Done when: no device answers to the manual default and no account is shared by name.' },
          { title: 'Multi-factor authentication on every remote path', text: 'The VPN, the remote desktop gateway, the SCADA mobile application, the vendor access. Cost: a VPN or a gateway that supports it, often already owned, and an authenticator on each phone. Done when: no one can reach the control system from outside with only a password.' },
          { title: 'Back up and test a restore', text: 'Controller programs with firmware versions, SCADA project and historian, drive parameters, network device configurations, to an external drive kept unplugged and a second copy off site. Restore one controller program to a spare and one SCADA project to a test machine. Cost: a drive, a day, an annual repeat. Done when: the restore worked and the date is written down.' },
          { title: 'Keep the plant running by hand', text: 'Confirm the pumps run in HAND, the chemical feeds have manual settings, the lift stations pump on floats, and the operators have done it recently. Write the procedure. Cost: an exercise on a quiet day. Done when: the utility has run for a shift without SCADA on purpose.' },
          { title: 'Separate control from office', text: 'The SCADA server, the HMIs, and the controllers on their own network or VLAN with a firewall between them and the office computers that browse and receive email. Cost: a firewall and a day of an integrator or a contractor. Done when: an office computer cannot reach a controller address.' },
          { title: 'Control vendor access', text: 'No standing vendor connection. A utility employee turns access on for a session and off after, through the MFA path. Vendor-installed modems removed. Cost: a conversation with each vendor and a contract clause. Done when: the utility can name every way a vendor can connect and each one is off by default.' },
          { title: 'Named accounts and logs', text: 'Every person has their own SCADA and Windows account; the operator account is not shared; logins and changes are logged and the log is kept. Cost: SCADA configuration. Done when: an action in the system can be traced to a person.' },
          { title: 'Write down who to call', text: 'A one-page plan: who decides to disconnect, who runs the plant by hand, who to call at the state, at the vendor, at the integrator, and at the agencies that help utilities, with phone numbers, on paper, in the control room. Cost: an afternoon. Done when: the page exists and the people on it know they are on it.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Five days of work stops most attacks',
        text: 'The first five measures, the inventory, the internet check, the passwords, MFA, and a tested backup, are the ones that would have prevented nearly every publicly reported small utility incident. They cost days, not budgets. Do them before anything else, including before any assessment that will take months to tell you to do them.',
      },
      { t: 'h2', text: 'What each one prevents' },
      {
        t: 'table',
        head: ['Measure', 'Prevents', 'The incident it comes from'],
        rows: [
          ['Inventory', 'Not knowing the modem is there', 'Every investigation finds a device nobody knew about'],
          ['Off the internet', 'Opportunistic scanning and default logins from anywhere', 'HMIs found by internet scans and logged into with defaults'],
          ['Passwords', 'The default in the manual, the password everyone knows', 'A remote tool with a shared password and a changed setpoint'],
          ['MFA', 'A stolen or guessed password being enough', 'VPN credentials from a phishing email'],
          ['Tested backup', 'Ransomware ending the plant', 'SCADA ransomed and rebuilt from nothing over weeks'],
          ['Manual operation', 'A compromised SCADA becoming a compromised process', 'Plants that kept treating water while the SCADA was down'],
          ['Segmentation', 'Office malware reaching the controllers', 'Ransomware that spread from an office PC to the HMI'],
          ['Vendor access control', 'A vendor compromise becoming the utility compromise', 'Integrator remote access used by an attacker'],
          ['Named accounts', 'Not knowing who did it', 'Investigations that could not tell an insider from an intruder'],
          ['The call list', 'Losing hours deciding who decides', 'Slow responses while the process ran unattended'],
        ],
      },
      { t: 'h2', text: 'After the ten' },
      {
        t: 'p',
        text: 'A utility that has done the ten has a program, whether or not it is called one. The next steps are the ones the larger frameworks describe: a risk assessment that ranks what is left, a zone and conduit drawing, a jump host in a DMZ, firewall rule review, patching on a schedule, change detection on the controllers, and the incident response plan that the one-page call list grows into. The America\'s Water Infrastructure Act risk and resilience assessment, where it applies, and the free assessments and tools from the federal agencies that support the water sector are the natural framework for that next stage, and a utility arriving at them with the ten done will find most of the findings already closed.',
      },
      { t: 'h2', text: 'Who does it' },
      {
        t: 'p',
        text: 'Every measure on the list needs a person, and at a small utility that person is usually the operator in charge or the superintendent, with an integrator or a contractor for the network work. The measures are assigned with a date, reviewed at a monthly meeting that takes fifteen minutes, and repeated on their schedule: the inventory annually, the backup restore annually, the manual operation exercise annually, the password review when someone leaves. A binder in the control room with the inventory, the backup log, the call list, and the dates is the whole program document, and it is enough.',
      },
    ],
    faqs: [
      {
        q: 'We have never had a problem. Why now?',
        a: 'Because the scans that find reachable control systems run continuously and the incidents at utilities like yours are public. The measures cost days and prevent the outcomes that have already happened elsewhere. Not having had a problem is the situation every utility in the incident reports was in the day before.',
      },
      {
        q: 'We cannot afford a firewall or a security consultant.',
        a: 'The first five measures need neither. A small industrial firewall costs less than a pump repair, and the state, the sector associations, and the federal agencies offer free assessments, training, and in some cases funding. The expensive part of cybersecurity is the incident.',
      },
      {
        q: 'Our integrator handles all of this.',
        a: 'Ask them to show you: the inventory, the backup restore date, how they connect and how it is turned off, and who has the passwords. A good integrator will have answers and will welcome the utility owning the list. An integrator who is the only one who knows is a single point of failure the utility should not accept.',
      },
      {
        q: 'What about our office network and email?',
        a: 'They matter, and phishing is the usual way in, but this page is about the control system. The office side gets the same basics from its own provider: patches, MFA, backups, and training. The segmentation measure is what keeps an office problem from becoming a plant problem.',
      },
    ],
    related: [
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/cybersecurity/backups/plc-program-backups',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/ot-security/iec-62443',
    ],
  },
  {
    path: '/cybersecurity/ot-security/risk-assessment',
    kind: 'reference',
    title: 'OT Risk Assessment',
    summary:
      'Ranking what could go wrong in a control system and what it would cost: the consequence-first method for utilities, the assets and scenarios to list, likelihood without pretending to know it, the risk matrix, and turning the ranked list into a work plan.',
    answer:
      'An operational technology risk assessment lists the consequences a utility cannot accept, identifies the control system assets and scenarios that could produce them, estimates how likely each scenario is given the current controls, and ranks the results so that the utility spends its effort on the risks that matter. It is consequence-first: the question is what happens to the process, the public, and the environment, not which vulnerability is newest. The output is a ranked list of risks with an owner and a treatment for each, reviewed on a schedule and after any change.',
    keyPoints: [
      'Start from consequences: overflow, loss of supply, a treatment violation, an injury. Work back to the assets that could cause them.',
      'A scenario is an asset, a cause, and a consequence. Assess scenarios, not devices.',
      'Likelihood is a judgment. Express it in bands, from the current controls, and say why.',
      'The matrix ranks; it does not decide. The utility decides what it will tolerate.',
      'The deliverable is a work plan with owners, not a report.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Cybersecurity', 'Standards', 'Design', 'Water'],
    blocks: [
      { t: 'h2', text: 'What the assessment is for' },
      {
        t: 'p',
        text: 'A utility has limited people, time, and money for cybersecurity, and a long list of things it could do. The risk assessment is how it chooses. It asks, for each way the control system could be misused or fail, what would happen and how likely it is, and it ranks the answers so the measures that address the worst realistic outcomes come first. Done well, it is a few days of structured conversation among the people who run the plant, and it produces a work plan. Done badly, it is a consultant report with a hundred findings of equal weight that nobody reads twice.',
      },
      {
        t: 'p',
        text: 'The frameworks agree on the shape. IEC 62443-3-2 describes a zone-based risk assessment that assigns target security levels; the NIST framework calls for identifying and prioritizing risk; the water sector risk and resilience assessments required under federal law include cyber risk in the same structure as physical and natural hazards. The method below fits all of them and is sized for a utility.',
      },
      { t: 'h2', text: 'Consequence first' },
      {
        t: 'p',
        text: 'The assessment starts with what the utility cannot accept. That list is short and the people who run the plant already know it.',
      },
      {
        t: 'table',
        head: ['Consequence category', 'Examples', 'Typical severity bands'],
        rows: [
          ['Public health', 'Under-disinfected water reaching customers; a chemical overfeed; a cross connection from negative pressure', 'Severe for any confirmed exposure; major for a boil water notice'],
          ['Environmental', 'A sanitary sewer overflow; a treatment plant bypass; a chemical release', 'Severe for a large or repeated release; major for a reportable one'],
          ['Loss of service', 'A zone without pressure; a plant unable to produce; a lift station down for a day', 'Major for loss of supply; moderate for reduced pressure'],
          ['Safety', 'A chlorine gas release; an operator injured by equipment starting unexpectedly', 'Severe for any injury'],
          ['Regulatory and financial', 'A permit violation; fines; recovery costs; a ransom', 'Moderate to major'],
          ['Reputation', 'Public loss of confidence', 'Follows the others'],
        ],
      },
      {
        t: 'p',
        text: 'Each category gets a severity scale with three to five bands and a definition for each band in terms the utility uses. Those definitions are what make two people assess the same scenario the same way.',
      },
      { t: 'h2', text: 'Assets and scenarios' },
      {
        t: 'steps',
        items: [
          { title: 'List the assets', text: 'From the asset inventory: controllers, HMIs, servers, network devices, remote access paths, instruments that a controller trusts, packaged systems. Group them into zones if the zone drawing exists; if it does not, the assessment is where it gets drawn.' },
          { title: 'Write the scenarios', text: 'For each consequence, the ways the control system could produce it: a setpoint changed on the chlorine feed by someone with SCADA access; a lift station controller with its program erased; a ransomware infection on the SCADA server; a vendor laptop introducing malware; a radio network jammed; an insider with shared credentials. A scenario names the asset, the cause, and the consequence. Twenty to fifty scenarios cover a utility.' },
          { title: 'Note the existing controls', text: 'For each scenario, what currently prevents it or limits it: the firewall, the float backup, the manual operation, the keyswitch, the MFA, the backup. The controls are what the likelihood judgment is made against.' },
          { title: 'Judge the likelihood', text: 'In bands: rare, unlikely, possible, likely, almost certain, with a definition for each, given the current controls. A scenario that requires physical access to a locked site by a skilled attacker is unlikely; one that requires typing a default password into an internet-reachable HMI is likely. Write the reasoning beside the band; it is what will be argued later.' },
          { title: 'Judge the consequence', text: 'The worst credible outcome of the scenario, in the severity bands, considering the controls that limit consequence: the float backup that keeps a station pumping even with a dead controller reduces the consequence of the controller scenario from overflow to loss of visibility.' },
          { title: 'Place it on the matrix', text: 'Likelihood against consequence gives a risk band: low, medium, high, very high. The matrix is agreed before the scenarios are assessed so that the ranking is not adjusted to fit.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The float backup is a risk treatment',
        text: 'Much of what reduces cyber risk at a utility is not cyber at all. A lift station that pumps on floats when the controller is dead, a plant that can be run by hand, a chemical feed with a hardwired maximum, an altitude valve on the tank: each one caps the consequence of a whole family of scenarios. The assessment should credit them, and the work plan should include them where they are missing.',
      },
      { t: 'h2', text: 'The matrix' },
      {
        t: 'table',
        head: ['Likelihood', 'Minor', 'Moderate', 'Major', 'Severe'],
        rows: [
          ['Almost certain', 'Medium', 'High', 'Very high', 'Very high'],
          ['Likely', 'Medium', 'High', 'High', 'Very high'],
          ['Possible', 'Low', 'Medium', 'High', 'Very high'],
          ['Unlikely', 'Low', 'Low', 'Medium', 'High'],
          ['Rare', 'Low', 'Low', 'Medium', 'Medium'],
        ],
      },
      {
        t: 'p',
        text: 'The utility decides which bands it will not tolerate and must treat, which it will treat as resources allow, and which it accepts. Very high and high are treated; medium is scheduled; low is accepted and recorded. That decision is the risk appetite, it is made by the people accountable for the utility, and it is written down.',
      },
      { t: 'h2', text: 'From the ranked list to the work plan' },
      {
        t: 'p',
        text: 'Each scenario in the treat bands gets a treatment: a control that reduces likelihood, a control that limits consequence, or both, with a cost, an owner, and a date. Treatments that address many scenarios at once, such as getting devices off the internet, MFA on remote access, and tested backups, rank first because they move the most scenarios down the matrix for the least effort. The plan is the deliverable; the assessment report is its appendix. Progress is reviewed on a schedule, the scenarios are re-assessed after each treatment lands, and the whole assessment is repeated when the system changes materially and at least every few years.',
      },
      { t: 'h2', text: 'Keeping it honest' },
      {
        t: 'ul',
        items: [
          'Involve the operators. They know which scenarios are real and which controls actually work at three in the morning.',
          'Use the incident record. Scenarios that have happened, at this utility or at others like it, are not rare.',
          'Resist the vulnerability list. A scanner output of two hundred findings is an input to a few scenarios, not two hundred risks.',
          'Do not rate down to fit the budget. A high risk that the utility cannot afford to treat this year is recorded as high and accepted with a date, not re-scored as medium.',
          'Write the reasoning. A band without a reason cannot be defended or updated.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does an assessment take at a small utility?',
        a: 'Two or three working sessions of a few hours each with the operator in charge, the superintendent, and the integrator or the person who maintains the network, plus a day to write it up. The asset inventory takes longer if it does not exist, and it is the first thing to do.',
      },
      {
        q: 'Do we need a consultant?',
        a: 'A facilitator who has done it before helps with the structure and the scenario list and keeps the sessions moving. The judgments about consequence and likelihood belong to the utility, and an assessment done entirely by an outside party without the operators in the room misses the controls that matter and overrates the ones that do not.',
      },
      {
        q: 'How does this relate to the federally required risk and resilience assessment?',
        a: 'The water sector assessment covers all hazards, including cyber, for utilities above the size thresholds, and the method here produces the cyber portion in a form that fits it. A utility that has done a consequence-first OT assessment has the cyber scenarios, the controls, and the ranked list that the broader assessment asks for.',
      },
      {
        q: 'What if likelihood is unknowable?',
        a: 'It usually is, precisely. The bands are a judgment about how easy and how attractive the scenario is given the controls in place, and the reasoning is recorded. The ranking is robust to that uncertainty because the treatments that matter most, the ones that move many scenarios, are the same under any reasonable judgment.',
      },
    ],
    related: [
      '/cybersecurity/ot-security/iec-62443',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/water-wastewater-cybersecurity/small-utility-priorities',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
    ],
  },
  {
    path: '/cybersecurity/backups/what-to-back-up',
    kind: 'reference',
    title: 'What to Back Up in a Control System',
    summary:
      'What a utility must be able to restore after a failure or attack: controller programs and firmware, SCADA and historian, HMI panels, drive and instrument parameters, network configurations, licenses, installers, and documentation, and how often each changes.',
    answer:
      'A control system backup covers everything needed to rebuild the system from bare hardware: controller projects with firmware versions and retentive data, SCADA and historian servers as images and as exported projects, HMI panel projects, drive and analyzer parameters, switch, firewall, and radio configurations, software installers and license files, credentials in a managed store, and the drawings and narratives that explain it all. Each item has a change frequency that sets its backup interval, at least one copy offline, and a restore that has been tested.',
    keyPoints: [
      'If it has a configuration, it needs a backup. Switches, radios, drives, and analyzers included.',
      'A server image and an exported project are different backups. Take both.',
      'Installers and license files are part of the backup. A project file with no software to open it is not restorable.',
      'Set the interval from how often it changes: after every change, and on a schedule regardless.',
      'One copy offline, one copy off site, one restore test a year.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Cybersecurity', 'Documentation', 'SCADA', 'PLC'],
    blocks: [
      { t: 'h2', text: 'The test' },
      {
        t: 'p',
        text: 'The question that defines the list is simple: if this device or this server were destroyed tonight, what would be needed to put a working replacement in service tomorrow? Everything in that answer is on the backup list. Utilities that have rebuilt after ransomware or a lightning strike report the same discoveries: the controller program was backed up but not the firmware version, the SCADA project but not the license, the historian but not the driver configuration, the drive parameters not at all. The list below is the answer for a typical utility.',
      },
      { t: 'h2', text: 'The inventory' },
      {
        t: 'table',
        head: ['Item', 'What it contains', 'Changes', 'Interval'],
        rows: [
          ['Controller projects', 'The program with comments, the I/O configuration, tags, and the firmware version', 'With every program change', 'After each change; monthly compare and backup'],
          ['Controller retentive data', 'Setpoints, tuning, calibration factors, totalizers, alternator states', 'Continuously in operation', 'Weekly export where the platform allows; at minimum before and after any change'],
          ['SCADA server image', 'The operating system, the SCADA software, drivers, and configuration as a restorable disk image', 'With patches and configuration', 'Monthly, and before any update'],
          ['SCADA project export', 'Displays, tags, alarms, scripts, users, and reports as the platform export', 'With every configuration change', 'After each change; weekly'],
          ['Historian data', 'The archive of process data', 'Continuously', 'Daily incremental; the retention policy sets how far back'],
          ['Historian configuration', 'Tag collection lists, compression settings, calculations', 'Occasionally', 'With the SCADA project'],
          ['HMI panel projects', 'The runtime project for each local panel', 'Occasionally', 'After each change; the panel file and the development file'],
          ['Drive parameters', 'Every parameter of every drive and soft starter', 'Rarely after commissioning', 'At commissioning, after any change, and annually'],
          ['Instrument and analyzer configurations', 'Ranges, trims, calibration data, analyzer settings', 'At calibration', 'With the calibration record'],
          ['Network device configurations', 'Switch, router, firewall, and radio configurations, including VLANs, rules, and addressing', 'Occasionally', 'After each change; quarterly'],
          ['Gateway and protocol converter configurations', 'The mapping tables', 'Occasionally', 'After each change'],
          ['Software installers and licenses', 'The exact versions of the programming software, the SCADA software, drivers, and the license files and activation records', 'With each version', 'When acquired; kept forever'],
          ['Credentials', 'Every device and account password, in a managed store with its own backup', 'When changed', 'The store handles it; export a sealed copy off site'],
          ['Documentation', 'Drawings, I/O list, instrument list, narratives, network drawing, register maps', 'With each change', 'With the project record'],
          ['Server and workstation builds', 'How each machine was built: partitions, drivers, settings, the steps', 'Rarely', 'A build document, updated when the build changes'],
        ],
      },
      { t: 'h2', text: 'Two kinds of server backup' },
      {
        t: 'p',
        text: 'A SCADA server needs both an image and an export. The image restores the whole machine, operating system and all, onto the same or similar hardware in an hour, and it is the fastest path back after a disk failure or a ransomware event. The export restores the SCADA configuration onto a freshly built machine of any generation, which is what is needed when the old hardware is gone or the image will not boot on new hardware. The image is taken by a backup tool on a schedule; the export is taken from the SCADA software after each change. A utility that has only images discovers after five years that the image will not restore onto anything it can buy.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Backups the ransomware can reach are not backups',
        text: 'Ransomware encrypts every drive and share it can reach, including the backup drive that is always plugged in and the network share where the backups live. At least one copy of every backup is offline: an external drive unplugged and locked up, media at another site, or a cloud store with immutable retention that the utility credentials cannot delete. The offline copy is the one that rebuilds the plant.',
      },
      { t: 'h2', text: 'Where the copies live' },
      {
        t: 'dl',
        items: [
          { term: 'The working copy', def: 'On the engineering workstation or the SCADA server, where the software uses it. Convenient, and the first thing lost.' },
          { term: 'The repository', def: 'A version-controlled store on a server in the engineering zone, holding every version of every project and configuration with who changed it and when. The reference copy.' },
          { term: 'The offline copy', def: 'An external drive or media, written on a schedule, unplugged, and stored in a locked cabinet. Rotated so that two generations exist.' },
          { term: 'The off-site copy', def: 'A second offline copy at another utility facility, or an immutable cloud store. Protects against fire, flood, and theft at the plant.' },
        ],
      },
      { t: 'h2', text: 'The restore test' },
      {
        t: 'p',
        text: 'A backup that has never been restored is an assumption. Once a year, restore a controller program to a spare controller, a SCADA export to a test machine, a drive parameter set to a spare drive, and a switch configuration to a spare switch, and time each one. The test finds the missing firmware file, the expired license, the installer that no longer runs on a current operating system, the export that was taken from the wrong project. Each finding is fixed and the test is repeated. The record of the test, with the dates and the times, is what an auditor asks for and what the utility relies on the day the plant is dark.',
      },
      { t: 'h2', text: 'Ownership' },
      {
        t: 'p',
        text: 'Every item on the list has a person who takes the backup and a person who checks that it was taken. At a small utility that is one person and their supervisor, with a checklist on the wall. At a larger one it is a schedule in the maintenance system with a work order per backup. The failure mode is the same at any size: the backup was somebody\'s job until they left, and nobody picked it up. The list, the schedule, and the owner are the program.',
      },
    ],
    faqs: [
      {
        q: 'How long should backups be kept?',
        a: 'Configuration backups, every version, forever; they are small and a five-year-old version answers questions. Server images, a few generations. Historian data, per the retention policy the regulator and the utility set, often years for compliance data. Credentials, current plus the last, in the store.',
      },
      {
        q: 'Should the backups be encrypted?',
        a: 'The off-site and cloud copies, yes, with the key stored where the restore team can reach it without the systems that were lost. The offline drive in a locked cabinet is protected by the lock; encrypting it too is reasonable if the key management is real.',
      },
      {
        q: 'What about the vendor packaged systems?',
        a: 'A membrane skid, a generator controller, an on-site generation system: each has a controller and an HMI with configurations the vendor may consider proprietary. The contract requires that the utility receives a backup at handover and after every vendor change, in a form the vendor can restore, and the utility keeps it with the rest.',
      },
      {
        q: 'Can the integrator keep the backups for us?',
        a: 'The integrator keeping a copy is good; the integrator keeping the only copy is not. The utility owns the system and holds its own backups, and the integrator copy is the off-site one. An integrator who goes out of business, loses a laptop, or ends the relationship takes the only copy with them.',
      },
    ],
    related: [
      '/cybersecurity/backups/plc-program-backups',
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/water-wastewater-cybersecurity/small-utility-priorities',
      '/controls/scada-hmi/scada-fundamentals/historians',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
    ],
  },
  {
    path: '/cybersecurity/incident-response/ot-incident-response-plan',
    kind: 'reference',
    title: 'OT Incident Response Plan',
    summary:
      'The plan for the day the control system is not trusted: who decides, the triggers, the first hour, isolating without stopping treatment, running by hand, preserving evidence, who to notify and when, recovery from backups, and the exercise that makes it real.',
    answer:
      'An operational technology incident response plan says what a utility does when its control system may be compromised: who has the authority to disconnect and to declare an incident, what triggers the plan, how the plant keeps treating water while the SCADA is isolated, who is called and in what order, how evidence is preserved for the investigation, how systems are rebuilt from trusted backups, and how the utility returns to normal. It is short, it is on paper, and it has been exercised with the people named in it.',
    keyPoints: [
      'Decide in advance who can disconnect the control system. Hesitation is the expensive part.',
      'Treatment continues by hand. The plan says how, and the operators have practiced it.',
      'Isolate, do not power off. A machine turned off loses the evidence of what happened.',
      'The call list is on paper in the control room, with the state, the agencies, the vendor, and the integrator.',
      'Exercise it once a year with a scenario. A plan that has not been walked through is a document.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Cybersecurity', 'Water', 'Wastewater', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'Why a separate OT plan' },
      {
        t: 'p',
        text: 'A utility may already have an IT incident plan from its municipal or corporate parent, and it will say to isolate the affected machines, preserve evidence, and call the security team. On a control system those instructions collide with the process: isolating the SCADA server blinds the operators, powering off a controller stops a pump, and the security team does not know what a lift station is. The OT plan is written for that collision. Its first objective is safe and compliant treatment; its second is containing the compromise; its third is investigation and recovery. When they conflict, the plan says which wins and who decides.',
      },
      { t: 'h2', text: 'The structure' },
      {
        t: 'dl',
        items: [
          { term: 'Authority', def: 'By name and role: who may declare an incident, who may order the control system isolated from every external connection, who may order a return to manual operation, who speaks to the regulator and the public. The operator on shift has the authority to isolate and go manual without waiting for anyone, because the plan says so.' },
          { term: 'Triggers', def: 'The observations that start the plan: a setpoint or a program that changed without a record, an unknown login or remote session, ransomware on any utility machine, a vendor reporting a compromise, an agency advisory naming the utility equipment, a process behaving in a way that has no physical explanation. Any operator can call a trigger; the plan says who they call.' },
          { term: 'The first hour', def: 'The ordered actions below.' },
          { term: 'Manual operation', def: 'The procedure for running each process without SCADA, by reference to the manual operation procedures, with the staffing needed and the limits: how long the plant can run this way, what compliance sampling changes.' },
          { term: 'Communications', def: 'The call list, the order, the scripts for the regulator and the public, and the rule that nobody speaks outside the utility except the named spokesperson.' },
          { term: 'Evidence', def: 'What to preserve and how: logs, images, the physical devices, the timeline the operators write as it happens.' },
          { term: 'Recovery', def: 'How trusted systems are rebuilt from offline backups, verified, and returned to service in order, with the criteria for trusting them again.' },
          { term: 'After', def: 'The review, the report, the changes to the plan and the system, and the notification of anyone who must be told.' },
        ],
      },
      { t: 'h2', text: 'The first hour' },
      {
        t: 'steps',
        items: [
          { title: 'Keep treating', text: 'Confirm the process is safe: residuals, levels, pressures, from local instruments if the SCADA is suspect. Put critical loops in manual or local control. Send operators to unattended sites that cannot be trusted remotely.' },
          { title: 'Isolate', text: 'Disconnect the control network from the office network and the internet at the firewall: pull the cable or disable the interface. Disable every remote access path. Do not power off servers or controllers; a powered device keeps its memory and its logs.' },
          { title: 'Declare and call', text: 'The person with authority declares the incident. The first calls go to the people who will run the plant and the people who will investigate: the superintendent, the integrator, the agency contact. The regulator is called within the time the permit or the state requires, which may be hours.' },
          { title: 'Start the timeline', text: 'One person writes down, with times, everything observed and everything done, on paper. It is the most valuable document of the incident and it cannot be reconstructed later.' },
          { title: 'Preserve', text: 'Leave the affected machines running and isolated. Photograph screens. Do not log in and poke around; every action changes the evidence. If a machine must be taken out of service, image it first if anyone present can, or set it aside powered off and untouched.' },
          { title: 'Check the controllers', text: 'Compare the running programs against the trusted backups on the engineering workstation, offline. A changed program is isolated and replaced from backup only after the comparison is recorded. Check keyswitch positions and set them to RUN.' },
          { title: 'Assess the process', text: 'With the process in manual, walk through what an attacker could have changed: setpoints, alarm limits, chemical feed rates, valve positions. Verify each against the last known good values and against physical readings.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not power off, do not wipe, do not reconnect',
        text: 'The three instincts under pressure are to turn the machine off, to reinstall it clean, and to plug it back in once it seems fine. Each destroys evidence or lets the compromise back in. The plan says to isolate and preserve, to rebuild from offline backups onto clean hardware, and to reconnect only when the investigation says the path in is closed.',
      },
      { t: 'h2', text: 'Who to call' },
      {
        t: 'table',
        head: ['Who', 'When', 'Why'],
        rows: [
          ['The operator in charge and the superintendent', 'Immediately', 'Authority, staffing, and decisions'],
          ['The integrator or the control system contractor', 'Within the hour', 'They know the system and hold the backups'],
          ['The state drinking water or wastewater program', 'Within the notification window in the permit or the state rule', 'Regulatory requirement; they also coordinate help'],
          ['The federal agencies that support the water sector and national cybersecurity', 'Same day', 'Free incident assistance, forensics, and the reporting that helps other utilities'],
          ['Law enforcement', 'When the incident is criminal, which most intrusions are', 'Investigation and evidence'],
          ['The insurer', 'Per the policy, often within a day', 'Coverage conditions'],
          ['Vendors of affected products', 'When their product is involved', 'Firmware, forensics, and advisories'],
          ['The public', 'When service or water quality is affected, through the spokesperson', 'Trust and compliance'],
        ],
      },
      {
        t: 'p',
        text: 'The list, with names and numbers, is on paper in the control room and in the superintendent vehicle, because the incident may take the systems that hold it.',
      },
      { t: 'h2', text: 'Recovery' },
      {
        t: 'p',
        text: 'Recovery rebuilds the control system from trusted sources onto hardware that is known clean. SCADA servers are rebuilt from the offline image or from a fresh install and the offline project export, never from the compromised machine. Controllers are verified against the offline program backup and reloaded where they differ. Network devices are restored from configuration backups after their firmware is verified. Every credential is changed. The path the attacker used is closed before anything is reconnected, and the reconnection is staged: controllers to SCADA first, with monitoring, then the historian, then remote access last and only through the MFA path. The order, the criteria for each step, and who signs off are in the plan.',
      },
      { t: 'h2', text: 'The exercise' },
      {
        t: 'p',
        text: 'Once a year, the people named in the plan sit at a table with a scenario: a Monday morning, the SCADA screens show a ransom note, the lift stations are reporting normally. They walk through the plan in order, out loud, with the paper copy, and someone writes down every point where the plan did not say what to do or the people did not know how. The gaps become changes. The exercise takes two hours and it is the difference between a plan and a binder.',
      },
    ],
    faqs: [
      {
        q: 'How long should the plan be?',
        a: 'Short enough to read under stress: a few pages for the authority, the triggers, the first hour, and the call list, with the manual operation procedures and the recovery details as appendices. A fifty-page plan is not opened during an incident.',
      },
      {
        q: 'Who should have the authority to disconnect?',
        a: 'The operator on shift, for the control network from the outside world, because waiting for a manager while an attacker is active is the worst outcome. Broader decisions, such as taking a plant to full manual for days or notifying the public, sit with the superintendent or the director. The plan names both.',
      },
      {
        q: 'What if we are not sure it is an incident?',
        a: 'Treat it as one until it is shown not to be. Isolating the control network and going to manual for a few hours costs an inconvenient shift. Not doing so when it was real costs the plant. The plan lowers the threshold for calling a trigger on purpose.',
      },
      {
        q: 'Do we need to report an incident that did no harm?',
        a: 'Usually yes, to the state and often to the federal agencies, under the utility permit and the reporting rules that apply, and it is worth doing regardless: the agencies use reports to warn other utilities, and their assistance is free. The plan lists what must be reported, to whom, and by when.',
      },
    ],
    related: [
      '/cybersecurity/water-wastewater-cybersecurity/small-utility-priorities',
      '/cybersecurity/backups/what-to-back-up',
      '/cybersecurity/backups/plc-program-backups',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
      '/cybersecurity/plc-security/controller-hardening',
    ],
  },
  {
    path: '/cybersecurity/firewalls/industrial-firewalls',
    kind: 'reference',
    title: 'Industrial Firewalls',
    summary:
      'Firewalls built for control networks: how they differ from office firewalls, where they belong in a utility network, transparent versus routed modes, Modbus and DNP3 awareness, logging, and the ruggedized units that protect one controller or a remote site.',
    answer:
      'An industrial firewall is a packet-filtering device hardened for a control environment: DIN-rail or rack mounting, 24 V DC power, an extended temperature range, no fans, a long product life, and rule sets that understand industrial protocols so that a rule can permit Modbus reads and deny Modbus writes. They sit at the boundaries between zones, at the DMZ edges, in front of individual controllers that cannot protect themselves, and at remote sites on the telemetry link, in transparent mode where the network cannot be re-addressed and routed mode where it can. They are managed like any network device, with backed-up configurations, named accounts, and logs that someone reads.',
    keyPoints: [
      'Industrial firewalls are ruggedized, protocol-aware, and built to be installed in a panel and left for a decade.',
      'They enforce zone boundaries: DMZ edges, between plant zones, in front of legacy controllers, and at remote sites.',
      'Transparent mode filters without changing addresses; routed mode separates subnets. Both have their place.',
      'Protocol awareness lets a rule allow reads and block writes or program downloads.',
      'A firewall nobody manages is a switch. Configuration backup, accounts, updates, and log review are the job.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Cybersecurity', 'Networking', 'Panels'],
    blocks: [
      { t: 'h2', text: 'What is different about an industrial firewall' },
      {
        t: 'table',
        head: ['Property', 'Industrial firewall', 'Office or data center firewall'],
        rows: [
          ['Form', 'DIN-rail or small rack unit, 24 V DC, fanless, wide temperature range, vibration rated', 'Rack unit, AC power, fans, controlled environment'],
          ['Lifecycle', 'Ten years or more of support; firmware maintained for the installed base', 'Three to five years; frequent model changes'],
          ['Protocols', 'Deep packet inspection for Modbus, DNP3, EtherNet/IP, OPC UA, and others; rules by function code and register', 'Web, email, and enterprise application awareness'],
          ['Modes', 'Transparent bridge or routed, often both; some act as a Layer 2 filter with no IP address of their own', 'Routed, with NAT and VPN as the norm'],
          ['Throughput', 'Modest; control traffic is small', 'High; designed for internet-scale traffic'],
          ['Management', 'Local web page, a central management tool, or a controller-vendor ecosystem', 'Enterprise management platforms'],
          ['Failure mode', 'Configurable: fail closed, or fail open where the process cannot tolerate a stop', 'Fail closed'],
        ],
      },
      {
        t: 'p',
        text: 'The office firewall at the enterprise edge stays where it is. Industrial firewalls are for the boundaries inside and around the control system, where a device in a panel at a lift station has to survive the panel and the traffic is a few Modbus polls a second.',
      },
      { t: 'h2', text: 'Where they go' },
      {
        t: 'dl',
        items: [
          { term: 'The DMZ boundaries', def: 'The two boundaries of the industrial DMZ, enterprise to DMZ and DMZ to control, are firewalls. The enterprise side may be the enterprise firewall; the control side is usually an industrial unit or a control-network-owned enterprise-class unit. The DMZ design page covers the rules.' },
          { term: 'Between plant zones', def: 'Where the zone drawing puts a boundary that must be enforced: between the SCADA server zone and the plant control zone, between the engineering zone and the controllers, around a vendor package.' },
          { term: 'In front of a legacy controller', def: 'A single small firewall on the controller network port, allowing only the SCADA master and the engineering workstation on the protocol ports, with writes and downloads restricted. The compensating control for a controller with no security of its own.' },
          { term: 'At a remote site', def: 'Between the telemetry radio or cellular modem and the site controller, allowing only the SCADA protocol from the master and blocking everything else, including site-to-site traffic. Often built into the cellular router.' },
          { term: 'Around a cellular or vendor connection', def: 'Wherever a link the utility does not fully control enters the network.' },
        ],
      },
      { t: 'h2', text: 'Transparent or routed' },
      {
        t: 'p',
        text: 'A transparent firewall bridges two network segments at Layer 2 and filters the frames passing through it; the devices on both sides keep their addresses and do not know the firewall exists. It is installed by cutting a cable, which makes it the practical choice for protecting an existing controller or a segment that cannot be re-addressed. A routed firewall separates two subnets and forwards between them according to its rules; it is the choice at a zone boundary that the network design already treats as a separate subnet, and it can also do NAT and VPN. Many industrial units do either, and a utility network commonly has both: routed at the zone boundaries, transparent in front of individual devices.',
      },
      { t: 'h2', text: 'Protocol awareness' },
      {
        t: 'p',
        text: 'A conventional firewall rule permits or denies by address and port. Modbus TCP is port 502; a rule that permits port 502 permits every Modbus function, including writes to holding registers and coils. An industrial firewall with deep packet inspection reads the Modbus function code and register range inside the packet, so the rule can say: permit function codes 3 and 4, reads, from the SCADA server to this controller for registers 0 to 999, and deny everything else. The same applies to DNP3 function codes, EtherNet/IP services, and controller programming protocols, so that a program download is permitted only from the engineering workstation and only when a session is enabled. This is the capability that turns a firewall from a fence into a policy.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Fail open is a deliberate choice',
        text: 'Some industrial firewalls can be configured to pass all traffic if they fail, so that a firewall failure does not stop the process. That choice trades security for availability and it is made in the design, documented on the drawing, and alarmed when it occurs. The default is fail closed, and the process is designed to survive the loss of the connection the firewall protects, as it must survive any communication loss.',
      },
      { t: 'h2', text: 'Managing them' },
      {
        t: 'ul',
        items: [
          'Configuration backed up after every change and stored with the other network configurations.',
          'Named administrator accounts, MFA where the device supports it, default credentials removed, and the management interface reachable only from the engineering zone.',
          'Firmware updated on a schedule, tested on a spare, because a firewall vulnerability is a hole in the boundary.',
          'Rules documented against the conduit table, each with its conduit and its reason, reviewed on a schedule.',
          'Logs sent to a log server, with denied traffic reviewed and permitted traffic sampled.',
          'A spare on the shelf with the configuration loaded, because a failed firewall at a remote site is a site without telemetry.',
          'On the network drawing, with its addresses, its mode, and its rule set reference.',
        ],
      },
      { t: 'h2', text: 'Selecting one' },
      {
        t: 'p',
        text: 'The choice is driven by where it goes: a DIN-rail unit with two or four ports for a panel or a remote site, a rack unit with more ports and higher throughput for a zone boundary or the DMZ. The protocol support must cover what the conduit carries, the management must fit how the utility manages its other network devices, and the vendor must have a record of supporting the product for the life of the panel it goes in. Controller vendors offer firewalls integrated with their programming ecosystems, network vendors offer general industrial units, and both work; a utility standardizes on one or two so that its staff and its spares cover them.',
      },
    ],
    faqs: [
      {
        q: 'Do we need a firewall in front of every PLC?',
        a: 'In front of the ones that cannot protect themselves and that matter: controllers with no authentication on a network that other things can reach. A plant with all its controllers in one zone behind a zone firewall, with no other devices in that zone, may not need per-device firewalls. A controller sharing a network with workstations or vendor equipment does.',
      },
      {
        q: 'Can the cellular router at a remote site be the firewall?',
        a: 'Most industrial cellular routers include a stateful firewall and VPN, and at a small site that is the firewall. Configure it: allow the SCADA protocol from the master only, deny everything else inbound, VPN to the utility concentrator, no management from the cellular side, default credentials changed, and the configuration backed up.',
      },
      {
        q: 'What throughput do we need?',
        a: 'Very little. A lift station generates kilobits per second; a plant control zone generates a few megabits. Industrial firewalls are rated in the hundreds of megabits and the constraint is never throughput. Port count, mode, protocol support, and environment are the constraints.',
      },
      {
        q: 'Should the firewall be the same brand as the controllers?',
        a: 'Not necessarily. A controller vendor firewall integrates with that vendor tools and understands that vendor protocols well; a network vendor unit understands more protocols and fits a mixed plant. The zone firewalls and the DMZ firewalls are often better from a network vendor, and the per-controller units from either. Mixing vendors at the two DMZ boundaries is a deliberate practice.',
      },
    ],
    related: [
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/network-segmentation/dmz-design',
      '/cybersecurity/firewalls/firewall-rule-design',
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/remote-access/jump-hosts',
      '/cybersecurity/backups/what-to-back-up',
    ],
  },
  {
    path: '/cybersecurity/firewalls/firewall-rule-design',
    kind: 'reference',
    title: 'Firewall Rule Design',
    summary:
      'Writing the rule set for a control network boundary: default deny, one rule per conduit with its reason, hosts not subnets, protocol and port and function, direction and initiator, logging on every rule, and the review that removes forgotten rules.',
    answer:
      'A firewall rule set for a control network boundary starts from default deny and adds one rule per documented conduit, each naming the source hosts, the destination hosts, the protocol and port, the direction, and the reason, with logging enabled and a reference to the conduit table. Rules are specific: a host, not a subnet; a port and where possible a function code, not any; one direction. The set is ordered so that the specific rules are readable, tested by confirming that what should pass passes and what should not does not, and reviewed on a schedule so that a temporary rule does not become permanent.',
    keyPoints: [
      'Default deny at the end. Everything not explicitly permitted is dropped and logged.',
      'One rule per conduit, with the conduit reference and the reason in the rule description.',
      'Specific: host to host, port, direction, and function where the firewall understands the protocol.',
      'Log everything. A rule that does not log cannot be reviewed.',
      'Review quarterly. Remove rules whose conduit is gone and rules that have never matched.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Cybersecurity', 'Networking', 'Design', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'Start from the conduit table' },
      {
        t: 'p',
        text: 'The zones and conduits drawing lists every communication path that crosses a boundary: from where, to where, what protocol, who initiates. The firewall rule set at that boundary is the implementation of that list and nothing else. Every rule traces to a conduit row; every conduit row that crosses this firewall has a rule. That correspondence is what makes the rule set reviewable a year later, and it is lost the moment a rule is added because someone needed something to work and the conduit table was not updated.',
      },
      { t: 'h2', text: 'The anatomy of a rule' },
      {
        t: 'table',
        head: ['Field', 'Content', 'Rule of thumb'],
        rows: [
          ['Name or description', 'The conduit reference and the purpose: C-12 SCADA to plant PLCs, EtherNet/IP polling', 'A rule without a reason is removed at the next review'],
          ['Source', 'The specific hosts that initiate: the two SCADA servers by address', 'Never a whole subnet where the hosts are known; an object group for a set of hosts'],
          ['Destination', 'The specific hosts that receive: the plant PLCs by address', 'The same'],
          ['Service', 'Protocol and port: TCP 44818 and UDP 2222 for EtherNet/IP; TCP 502 for Modbus; TCP 20000 for DNP3', 'Only the ports the conduit uses; never any'],
          ['Application or function', 'Where the firewall inspects the protocol: Modbus function codes 3 and 4 only; DNP3 read only; no program download', 'Use it wherever the firewall supports it; it is the difference between reads and writes'],
          ['Direction', 'From source zone to destination zone; the reply is handled by state tracking', 'One direction per rule; a second rule for the reverse only if a conduit exists'],
          ['Action', 'Permit or deny', 'Deny rules above the default deny only for exceptions worth logging separately'],
          ['Logging', 'On', 'Every rule, permit and deny'],
          ['Schedule', 'Always, or a time window for maintenance conduits', 'Vendor access rules enabled per session, not on a schedule'],
        ],
      },
      { t: 'h2', text: 'The order' },
      {
        t: 'p',
        text: 'Firewalls evaluate rules top to bottom and act on the first match, so the order is the logic. A readable set follows a convention.',
      },
      {
        t: 'ol',
        items: [
          'Management rules first: who may reach the firewall itself, from the engineering zone only.',
          'Explicit denies for things that must never pass, logged separately so they are seen: any traffic from the enterprise to a controller address, for instance.',
          'The conduit rules, grouped by source zone, each with its conduit reference.',
          'Infrastructure rules: time synchronization, logging, and the few services the zones share, each specific.',
          'Default deny, logged, as the last rule. Even where the firewall denies by default, the explicit rule is there so the log shows what was dropped.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Any is the most dangerous word in a rule set',
        text: 'A source of any, a destination of any, or a service of any turns a rule into a hole. A rule with any in two of the three fields is a rule that permits nearly everything through the boundary. The review looks for any first, and every instance either becomes specific or is justified in writing.',
      },
      { t: 'h2', text: 'The conduits that need care' },
      {
        t: 'dl',
        items: [
          { term: 'SCADA to controllers', def: 'From the SCADA servers to each controller on the protocol ports, with function restrictions where the firewall can apply them. Controllers do not initiate to SCADA except for unsolicited DNP3 responses, which the state tracking handles, or for report-by-exception designs, which get their own rule.' },
          { term: 'Engineering to controllers', def: 'From the engineering workstations only, on the programming protocol ports, logged, and where the firewall supports it, enabled for a session rather than always on.' },
          { term: 'Historian replication', def: 'From the control zone historian outbound to the DMZ replica, on the replication port, never the reverse.' },
          { term: 'Remote access', def: 'From the jump host to the specific target hosts, on the specific ports, per session.' },
          { term: 'Patch and antivirus', def: 'From the control zone servers outbound to the DMZ staging server to pull updates; the staging server never pushes in.' },
          { term: 'Time', def: 'From control zone hosts to the DMZ time server on UDP 123, outbound; or a time source inside the control zone.' },
          { term: 'Telemetry from remote sites', def: 'From each site address to the SCADA master on the SCADA protocol, and the reverse for polling; never site to site.' },
          { term: 'Vendor packages', def: 'From the plant controller or SCADA to the package controller on the agreed port, and nothing from the package outward.' },
        ],
      },
      { t: 'h2', text: 'Testing a rule set' },
      {
        t: 'steps',
        items: [
          { title: 'Confirm the permitted conduits', text: 'From a host in each source zone, connect to the destination on the permitted port, and confirm the connection and the function. A SCADA driver polling successfully is the test for its rule.' },
          { title: 'Confirm the denials', text: 'From the same host, attempt the connections that must fail: a write where only reads are permitted, a controller address from the enterprise, a program download from the SCADA server. Each must fail and each must appear in the log.' },
          { title: 'Confirm the direction', text: 'Attempt a connection in the reverse direction of a one-way conduit: from a controller to the SCADA server on an unrelated port, from the DMZ into the control zone. It must fail.' },
          { title: 'Confirm the logging', text: 'Every test attempt, permitted and denied, is in the log server with the rule name.' },
          { title: 'Confirm the fail mode', text: 'Power the firewall off, or disconnect it, and confirm the behavior matches the design: fail closed, with the process continuing on its own, or the deliberate fail open, alarmed.' },
          { title: 'Record the test', text: 'The rule set version, the tests, and the results, with the conduit table revision.' },
        ],
      },
      { t: 'h2', text: 'Reviewing' },
      {
        t: 'p',
        text: 'A rule set drifts: a rule added for a commissioning tool, a rule widened to make a vendor connection work, a rule whose conduit was removed when a device was retired. The quarterly review walks every rule against the conduit table and the hit counters. A rule with no conduit is removed. A rule that has not matched in a year is a candidate for removal, after confirming it is not a rarely used maintenance path. A rule with any in it is made specific or justified. The review is recorded, and the rule set version is bumped.',
      },
    ],
    faqs: [
      {
        q: 'How many rules should a control network boundary have?',
        a: 'As many as there are conduits, which for a utility zone boundary is typically a dozen to a few dozen. A rule set with hundreds of rules at a control boundary has accumulated rules that nobody removed, and the review is overdue.',
      },
      {
        q: 'Should the reply traffic have its own rule?',
        a: 'No. A stateful firewall tracks the connection the permitted rule created and passes the reply automatically. A separate reverse rule opens a path in the other direction that the conduit does not need. The exception is UDP-based protocols where the firewall cannot track state, and even then the reverse rule is as narrow as the forward one.',
      },
      {
        q: 'What about a rule for ping?',
        a: 'A limited ICMP echo rule from the engineering zone to the control zone helps troubleshooting and is low risk. ICMP from the enterprise into the control zone is not permitted; a device that can be pinged can be found.',
      },
      {
        q: 'Can the SCADA server reach the internet for licensing or updates?',
        a: 'Not directly. Licensing traffic goes to a DMZ relay or is handled offline; updates come from the DMZ staging server. A control zone server with a rule to the internet is a control zone server on the internet.',
      },
    ],
    related: [
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/firewalls/industrial-firewalls',
      '/cybersecurity/network-segmentation/dmz-design',
      '/cybersecurity/remote-access/jump-hosts',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/how-to/plc-how-to/configure-modbus',
    ],
  },
  {
    path: '/cybersecurity/plc-security/mode-switch-and-keyswitch',
    kind: 'reference',
    title: 'Controller Mode Switch and Keyswitch',
    summary:
      'The physical switch on the front of a controller: what RUN, REMOTE, and PROGRAM mean, why most controllers are left in REMOTE and why that matters, a policy for a utility, how mode is monitored and alarmed, and what to do on platforms with no keyswitch.',
    answer:
      'The keyswitch on a controller selects who may change its mode: RUN executes the program and refuses remote mode changes and downloads; PROGRAM stops execution and permits programming; REMOTE lets the programming software choose, from anywhere on the network. A controller left in REMOTE can be stopped or reprogrammed by anyone who reaches it with the software, which is the reason a utility policy keeps controllers in RUN except during a change made on site or through an approved session, monitors the mode as a SCADA tag, and alarms on any change. Controllers without a keyswitch get the equivalent protection from their software security features and from the network.',
    keyPoints: [
      'RUN means the network cannot change the mode or the program. REMOTE means it can.',
      'The keyswitch is the one control an attacker on the network cannot defeat.',
      'Policy: RUN except during an approved change, with the key removed and kept.',
      'Monitor the mode in SCADA and alarm on every change. A mode change is an event with a name attached.',
      'No keyswitch: use the platform security to lock the mode and the network to limit who can reach it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'PLC', 'Programming'],
    blocks: [
      { t: 'h2', text: 'What the switch does' },
      {
        t: 'table',
        head: ['Position', 'Program execution', 'Remote mode change', 'Program download', 'Online edits'],
        rows: [
          ['RUN', 'Running', 'Refused', 'Refused on most platforms', 'Refused or restricted'],
          ['REMOTE', 'As last set by software: run or program', 'Permitted from the programming software', 'Permitted', 'Permitted'],
          ['PROGRAM', 'Stopped; outputs to their program-mode state', 'Refused', 'Permitted', 'Not applicable'],
        ],
      },
      {
        t: 'p',
        text: 'The details vary by platform: some allow online edits in RUN with the switch in RUN, some refuse any change, some have a fourth position or a software-configurable equivalent. The controller manual is the reference. The principle is the same everywhere: RUN takes the mode and the program away from the network, and REMOTE gives them to it.',
      },
      { t: 'h2', text: 'Why controllers are left in REMOTE' },
      {
        t: 'p',
        text: 'REMOTE is convenient. A programmer at a desk, or a vendor at home, can put a controller into program mode, download, and return it to run without driving to the site. Integrators commission systems in REMOTE and leave them there; utilities find the convenience useful and never change it. The result is a control system in which every controller can be stopped or reprogrammed by anyone who reaches the network with the software, which includes an attacker who has reached the network with the software. Publicly reported incidents at industrial sites have included controllers put into program mode remotely. The keyswitch in RUN would have prevented each one, at the cost of a drive to the site.',
      },
      { t: 'h2', text: 'The policy' },
      {
        t: 'steps',
        items: [
          { title: 'Default RUN', text: 'Every controller with a keyswitch is in RUN during normal operation. The key is removed and kept in a controlled place, not left in the switch.' },
          { title: 'Change on site or through an approved session', text: 'A program change requires a person at the controller to turn the switch to REMOTE or PROGRAM for the duration of the change, under the change management procedure, and to return it to RUN after. Where remote programming is genuinely needed, the switch is turned by a person on site for a session that is approved, logged, and time-limited, with the remote access through the jump host.' },
          { title: 'Monitor the mode', text: 'The controller mode is a status the program can read on most platforms, or that SCADA can read through the driver. It is a SCADA tag, trended, and alarmed on any change from RUN, at a priority that gets attention.' },
          { title: 'Alarm the unexpected', text: 'A mode change that does not correspond to an approved change record is treated as an incident: the controller is compared with its backup and the program integrity is checked.' },
          { title: 'Audit', text: 'A periodic walk of the panels to confirm every switch is in RUN and every key is accounted for, and a periodic check of the mode tags.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'REMOTE at a remote site is the worst case',
        text: 'A lift station controller in REMOTE, reachable over a radio or cellular network, is a controller anyone who reaches that network can stop. Remote sites are the hardest to visit and the most tempting to leave in REMOTE. They are also the sites where a stopped controller becomes an overflow. The policy applies there first.',
      },
      { t: 'h2', text: 'Platforms without a keyswitch' },
      {
        t: 'p',
        text: 'Many compact controllers, and some larger ones, have no physical switch; the mode is set by software, and the protection has to come from elsewhere.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Platform security features', def: 'Controller passwords, user accounts with roles, a software mode lock, and on newer platforms a security mode that requires authentication for any mode change or download. Enable them; they are off by default.' },
          { term: 'Network restriction', def: 'A firewall or an access list in front of the controller that permits the programming protocol only from the engineering workstation, and only when a session is enabled. Where the firewall understands the protocol, deny the mode change and download functions except from that source.' },
          { term: 'Program integrity monitoring', def: 'Detect a change after the fact: the program checksum and the last edit time read into SCADA and alarmed, and a scheduled compare against the backup.' },
          { term: 'Physical', def: 'A locked panel and a locked building, so that a local connection requires a key.' },
          { term: 'Replacement', def: 'A controller that runs a critical process, has no keyswitch, no software security, and cannot be isolated is a controller to replace on a schedule.' },
        ],
      },
      { t: 'h2', text: 'What to monitor' },
      {
        t: 'ul',
        items: [
          'Controller mode, per controller, as a tag, alarmed on change from RUN.',
          'Program checksum or change counter, alarmed on change.',
          'Last edit timestamp, compared with the change log.',
          'Controller restart and hard fault events, counted and alarmed.',
          'Programming protocol connections at the firewall, logged, with the source address.',
          'The keyswitch position where the platform exposes it separately from the mode.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Our integrator says they need REMOTE to support us. What do we do?',
        a: 'Provide remote support through the vendor access design: a session enabled by the utility, through the jump host, with the keyswitch turned to REMOTE by a person on site for that session and returned to RUN after. It costs a phone call and a short drive per change, and it is what stops the same path being used by someone who is not the integrator.',
      },
      {
        q: 'Does RUN prevent online edits?',
        a: 'On most platforms RUN refuses remote mode changes and downloads; some still permit online edits from the software. The manual says. Where online edits are permitted in RUN, the platform security features and the network restriction cover them, and the program change detection catches them.',
      },
      {
        q: 'What happens to the outputs when someone turns the switch to PROGRAM?',
        a: 'The controller stops executing and the outputs go to their program-mode state, off on most platforms, hold on some configurations. On a lift station that is a stopped pump; on a chemical feed it is a stopped feeder. The float backup and the manual operation procedures are what carry the process through, and the mode alarm is what gets someone to the site.',
      },
      {
        q: 'Should the key be removed from the switch?',
        a: 'Yes. A key in the switch is a switch anyone can turn. The keys are kept by the utility, tracked, and issued for a change. Keys for a controller family are often identical, so a key from one panel opens all of them, which is one more reason the network and the monitoring matter too.',
      },
    ],
    related: [
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/plc-security/program-integrity',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/controls/plc-systems/plc-troubleshooting/plc-will-not-run',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/cybersecurity/backups/plc-program-backups',
    ],
  },
  {
    path: '/cybersecurity/plc-security/program-integrity',
    kind: 'reference',
    title: 'Controller Program Integrity',
    summary:
      'Knowing that the program in the controller is the one that was approved: checksums and change counters, the scheduled compare against the trusted backup, signed and protected projects, what an unexplained difference means, and making the check routine.',
    answer:
      'Program integrity is the assurance that the logic running in a controller is the logic the utility approved and nothing else. It is maintained by keeping a trusted master copy of every program under version control, reading the controller program checksum or change counter into SCADA and alarming on change, comparing the running program against the master on a schedule with the platform compare tool, and treating any difference that has no change record as an incident until it is explained. Platform features such as project signing, source protection, and audit logs support it; the discipline of the compare is what makes it real.',
    keyPoints: [
      'A trusted master under version control is the reference. Without it there is nothing to compare against.',
      'Read the checksum and the last-edit time into SCADA and alarm on change. That is continuous detection.',
      'Compare the running program with the master on a schedule. That is periodic verification.',
      'Every difference has a change record or it is an incident.',
      'Platform security features help, but the compare is the control.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'PLC', 'Documentation', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Why integrity is its own concern' },
      {
        t: 'p',
        text: 'A controller runs whatever program it holds. A change to that program, whether by a well-meaning technician at midnight, a vendor on a support call, an integrator who forgot to record it, or an attacker, changes how the process behaves, and none of those changes leave a mark that an operator sees. The setpoints look the same, the screens look the same, and the pump starts a foot later or the chemical feed has a new maximum. Program integrity is the practice of knowing, at any time, whether the program in the controller is the one that was approved, and of finding out quickly when it is not.',
      },
      { t: 'h2', text: 'The master' },
      {
        t: 'p',
        text: 'Integrity starts with a trusted copy: the project file as last approved, with its comments and documentation, in a version-controlled store that records who changed it and when, backed up offline. The PLC program backups page covers building that store. A utility that has only the program in the controller has nothing to compare against, and its first step is to upload, review, and establish the master.',
      },
      { t: 'h2', text: 'Continuous detection' },
      {
        t: 'p',
        text: 'Most controllers expose values that change when the program changes: a program checksum, a change counter, a last-edit timestamp, and on some platforms a user identity for the last edit. Read them into SCADA as tags. Trend them. Alarm when they change. A checksum that changes at 2 a.m. on a Sunday with no change record is an alarm that names the controller and the time, and it is the fastest detection a utility can have. The controller mode and its restart count are read alongside, because a program change usually involves a mode change, and a program corruption often involves a restart.',
      },
      {
        t: 'table',
        head: ['Signal', 'What it shows', 'Alarm on'],
        rows: [
          ['Program checksum or signature', 'Any change to the program', 'Any change'],
          ['Change counter', 'The number of edits since the program was loaded', 'Any increment'],
          ['Last edit timestamp', 'When the last change was made', 'A change; compare with the change log'],
          ['Last edit user, where available', 'Who the platform believes made it', 'A user not on the approved list'],
          ['Controller mode', 'RUN, REMOTE, or PROGRAM', 'Any change from RUN'],
          ['Restart and fault counters', 'Power cycles, hard faults, watchdog events', 'Any increment'],
          ['Force count', 'Active forces on I/O', 'Any nonzero value outside a maintenance window'],
        ],
      },
      { t: 'h2', text: 'Periodic verification' },
      {
        t: 'p',
        text: 'The checksum says the program changed; the compare says what changed. On a schedule, monthly at most utilities and more often for critical controllers, the running program is uploaded and compared with the master using the platform compare tool or a version control product built for controllers. The result is either identical, which is recorded, or a list of differences, each of which is matched to a change record. A difference with a record is a master that needs updating. A difference without a record is an incident: the change is reviewed rung by rung, the process is checked for its effect, and the program is restored from the master if the change was not approved.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Comments do not survive the upload',
        text: 'On many platforms the upload from the controller recovers the logic but not the comments and the documentation, so a compare between an upload and the master shows every comment as a difference. The compare tools filter that; the reviewer compares logic. Where the platform stores the full project in the controller, the compare is exact and the comments are checked too.',
      },
      { t: 'h2', text: 'Platform features that support integrity' },
      {
        t: 'dl',
        items: [
          { term: 'Project signing', def: 'A digital signature on the project file, verified on download, so that a modified file is rejected. Available on newer platforms.' },
          { term: 'Source protection', def: 'Encryption or locking of routines so that the logic cannot be read or edited without the key. Protects the intellectual property and prevents casual edits; does not prevent a download of a different project.' },
          { term: 'Controller audit log', def: 'A log in the controller of mode changes, downloads, edits, and forces, with time and identity where the platform has users. Read it into SCADA or review it on a schedule.' },
          { term: 'Change detection in the programming software', def: 'A compare on every connection, with a warning if the controller differs from the open project. Useful for the programmer; not a substitute for the scheduled compare.' },
          { term: 'Controller security mode', def: 'A mode on newer platforms that requires authentication for downloads and mode changes and that logs them. Enable it where the platform offers it.' },
        ],
      },
      { t: 'h2', text: 'Building it into the routine' },
      {
        t: 'steps',
        items: [
          { title: 'Establish the master', text: 'Upload, review, document, and commit every controller program to the version-controlled store. Record the checksum.' },
          { title: 'Add the tags', text: 'Checksum, change counter, last edit time, mode, restarts, and forces for every controller, into SCADA, trended, alarmed.' },
          { title: 'Write the change procedure', text: 'Every program change updates the master, records the new checksum, and is logged with who, when, and why. The alarm on the checksum change is acknowledged against the record.' },
          { title: 'Schedule the compare', text: 'Monthly for every controller, weekly for the critical ones, with the result recorded.' },
          { title: 'Define the incident response', text: 'What happens on an unexplained difference: who is called, the process check, the restore decision, and the investigation of how the change was made.' },
          { title: 'Review', text: 'Quarterly: every alarm, every compare, every unexplained difference and its resolution.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'The checksum changes every time someone goes online. Why?',
        a: 'On some platforms an online session that changes nothing still updates a timestamp or a counter; on others the checksum is stable unless the logic changes. Learn which values on your platform change only with the logic, and alarm on those. The audit log, where available, distinguishes an online session from an edit.',
      },
      {
        q: 'What if the program in the controller is better than the master?',
        a: 'That is common on a system where the integrator made a fix on site and the master was never updated. The compare finds it; the review confirms the change is wanted; the master is updated and the change is recorded after the fact. The integrity process is how the master catches up, not a reason to distrust the fix.',
      },
      {
        q: 'Can an attacker change the program and restore the checksum?',
        a: 'A checksum is not a cryptographic signature and a capable attacker with controller access could in principle craft a program with the same value on some platforms. The scheduled compare against the master catches what the checksum misses, the network controls and the keyswitch make the access itself hard, and platforms with signed projects close the gap. Layers, as always.',
      },
      {
        q: 'How long does the monthly compare take?',
        a: 'A few minutes per controller with the platform tool, longer with a manual review of differences. A version control product for controllers automates the upload and compare on a schedule and reports only the differences, which makes weekly compares of a hundred controllers practical.',
      },
    ],
    related: [
      '/cybersecurity/backups/plc-program-backups',
      '/cybersecurity/plc-security/mode-switch-and-keyswitch',
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/incident-response/ot-incident-response-plan',
      '/controls/plc-systems/plc-fundamentals/memory',
      '/cybersecurity/remote-access/vendor-remote-access',
    ],
  },
  {
    path: '/cybersecurity/scada-security/server-hardening',
    kind: 'reference',
    title: 'Server Hardening',
    summary:
      'Reducing what an attacker can do with a SCADA server: a baseline from the vendor guide and a benchmark, unused services removed, the host firewall on, application allowlisting, controlled media, separate administrator accounts, and logs sent off the box.',
    answer:
      'Hardening a SCADA server means configuring it so that only what the SCADA needs is present and reachable: unneeded services, roles, and protocols removed or disabled, the host firewall allowing only the ports the application uses from the addresses that need them, application allowlisting so that only approved executables run, removable media controlled, administrative rights separated from daily accounts and from the accounts the application runs under, remote desktop limited to the jump host, logs forwarded to a collector, time synchronized, and antivirus with the exclusions the vendor specifies. The configuration is written down as a baseline derived from the vendor hardening guide and a benchmark such as the CIS benchmarks, applied to every server of that role, tested with the application, and audited against the baseline on a schedule.',
    keyPoints: [
      'Start from the vendor hardening guide; it says what the application needs, which is what the benchmark cannot know.',
      'Remove what is not used: services, roles, protocols, features, sample files, and accounts.',
      'Host firewall on, with rules for the application ports from the specific addresses that need them.',
      'Application allowlisting is the single strongest control on a server whose software never changes.',
      'Separate accounts: daily, administrative, and service, none of them shared and none with more than they need.',
      'A baseline document and an annual audit against it; hardening decays with every change.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Cybersecurity', 'SCADA', 'Standards', 'Documentation', 'Design'],
    blocks: [
      { t: 'h2', text: 'Why servers and not only firewalls' },
      {
        t: 'p',
        text: 'A firewall decides who can reach the server; hardening decides what they can do once they do. A phishing email opened on an engineering workstation, a contractor laptop on the control network, or a vulnerability in a service that was never needed each get past the firewall. On a hardened server the attacker then finds no unnecessary service to exploit, no ability to run their tools because they are not on the allowlist, no local administrator rights on the account they landed in, and logs of what they tried on a collector they cannot reach. Hardening is what limits the damage when the perimeter has already failed, which it will.',
      },
      { t: 'h2', text: 'The controls' },
      {
        t: 'table',
        head: ['Control', 'What it does', 'Notes'],
        rows: [
          ['Baseline from the vendor guide and a benchmark', 'Defines the configuration for the role', 'Vendor guide first; benchmark settings that break the application are documented exceptions'],
          ['Minimal installation', 'No roles, features, or services beyond what the application needs', 'No web server, no file sharing, no print spooler, no media features unless required'],
          ['Legacy protocols disabled', 'Removes attack surface', 'Older file sharing versions, name resolution broadcasts, and similar are common footholds'],
          ['Host firewall', 'Only the application ports, from the client, controller, and historian addresses', 'Default deny inbound; outbound restricted where the platform allows'],
          ['Application allowlisting', 'Only approved executables and scripts run', 'Audit mode first to build the list; then enforce; the SCADA vendor usually publishes guidance'],
          ['Antivirus with vendor exclusions', 'Detects known malware', 'Exclusions for the application directories and database files per the vendor; updates from an internal server'],
          ['Removable media control', 'Blocks or restricts USB storage', 'A dedicated scanning station for files that must come in'],
          ['Account separation', 'Daily, administrative, service, and vendor accounts distinct', 'No daily use of administrator accounts; service accounts with minimum rights and no interactive login'],
          ['Remote access limited', 'Remote desktop only from the jump host, with multi-factor upstream', 'Never directly from the office or the internet'],
          ['Logging forwarded', 'Security and application logs to a collector off the server', 'An attacker on the server cannot erase what has already left'],
          ['Time synchronization', 'Logs and certificates depend on it', 'From the control network time source'],
          ['Firmware and boot protection', 'BIOS or UEFI password, secure boot where supported', 'Prevents booting other media'],
          ['Screen lock and session policy', 'Locks unattended sessions', 'Operator consoles use view-only timeout instead, so the display is never lost'],
          ['No internet, no email, no browsing', 'Removes the most common infection paths', 'Vendor licensing and updates through a controlled path'],
        ],
      },
      { t: 'h2', text: 'Applying it' },
      {
        t: 'steps',
        items: [
          { title: 'Get the vendor guide', text: 'Every major SCADA vendor publishes a hardening or security guide for its product: required ports, services, accounts, antivirus exclusions, allowlisting guidance, and unsupported settings. It is the starting point.' },
          { title: 'Choose a benchmark', text: 'A recognized configuration benchmark for the operating system, applied at a level appropriate to a control server, with each setting that conflicts with the vendor guide recorded as an exception with its reason.' },
          { title: 'Build the baseline', text: 'The combined configuration as a document or a configuration script: services, features, firewall rules, policies, accounts, logging, allowlist.' },
          { title: 'Apply to a test system', text: 'A virtual machine with the application installed. Run the application through its functions: polling, alarms, history, clients, reports, failover. Fix what the baseline broke, and record it.' },
          { title: 'Apply to production', text: 'One server at a time in a redundant pair, with a snapshot or backup before, and the application tested after.' },
          { title: 'Enable allowlisting last', text: 'In audit mode for weeks to capture every executable the application and its maintenance use, then in enforcement. Keep the process for adding an approved executable when the vendor issues an update.' },
          { title: 'Document and schedule the audit', text: 'The baseline, the exceptions, the date applied, and an annual check that the configuration still matches; drift happens with every troubleshooting session.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Test before enforcing',
        text: 'Application allowlisting, a restrictive host firewall, and a disabled service can each stop the SCADA in a way that looks like a failure of something else. Apply hardening on a test system with the application exercised, then on the standby server of a pair, then on the active one. A hardening change that is applied to the only server in the middle of a shift is how hardening gets a bad reputation.',
      },
      { t: 'h2', text: 'Keeping it hardened' },
      {
        t: 'p',
        text: 'Servers drift. A vendor engineer enables a service to troubleshoot and does not disable it; an update turns a feature back on; a firewall rule is opened for a test. The baseline is only as good as the last time someone compared the server with it. A configuration audit, by a script that reports differences or by a checklist walked once a year, catches the drift, and the change management process records every deliberate departure so that the audit can tell drift from decision.',
      },
    ],
    faqs: [
      {
        q: 'Will hardening break the SCADA?',
        a: 'It can, which is why the vendor guide exists and the test system comes first. Applied per the vendor guidance and tested, hardening is routine on every major platform. The failures come from applying a generic benchmark blindly to a production server.',
      },
      {
        q: 'Is antivirus enough without allowlisting?',
        a: 'No. Antivirus catches known malware and misses new and targeted tools; allowlisting stops anything that is not approved, known or not. A SCADA server runs the same few programs for years, which makes it the ideal candidate for allowlisting. Use both.',
      },
      {
        q: 'How do vendor updates work under allowlisting?',
        a: 'The update is approved through change management, the new executables are added to the allowlist, or the allowlisting tool trusts the vendor signature, and the update is applied. The process is written down once and followed each time; it adds an hour to an update and is worth it.',
      },
      {
        q: 'What about the operator consoles?',
        a: 'They are hardened too, with the same approach and a kiosk configuration: the client starts at boot, the operator has no access to the operating system, removable media is blocked, and the session times out to view-only rather than locking. Consoles are the machines most people touch and deserve the same attention as the servers.',
      },
    ],
    related: [
      '/cybersecurity/scada-security/patch-management',
      '/cybersecurity/scada-security/user-accounts-and-roles',
      '/cybersecurity/plc-security/controller-hardening',
      '/cybersecurity/remote-access/jump-hosts',
      '/controls/scada-hmi/scada-fundamentals/servers',
      '/cybersecurity/scada-security/third-party-software',
    ],
  },
  {
    path: '/cybersecurity/scada-security/user-accounts-and-roles',
    kind: 'reference',
    title: 'User Accounts and Roles',
    summary:
      'Who can do what on the SCADA and how it is enforced: roles from view-only to administrator and their permission matrix, individual accounts including the operator console, service and vendor accounts, same-day offboarding, and the quarterly review.',
    answer:
      'A SCADA system enforces least privilege through roles: view-only, operator, supervisor, engineer, and administrator, each with a written set of permissions for what it can see, acknowledge, command, change, and configure, plus service accounts for the application processes and vendor accounts that are disabled until a session is arranged. Every person has an individual account so that the audit trail names them, the operator console reaches a view-only state without a login and requires an operator login for control, accounts live in a directory dedicated to the control system or in local accounts on a small system rather than the corporate domain, access is removed the day a person leaves, the account list is reviewed each quarter, and logins and privileged actions are logged to a collector.',
    keyPoints: [
      'Roles are a written permission matrix; the platform implements the matrix, not the other way round.',
      'Individual accounts for every person, including operators; the console auto-logs into view-only, not into control.',
      'Service accounts run the application with minimum rights and no interactive login; vendor accounts are disabled between sessions.',
      'The control system has its own directory or local accounts; the corporate domain is not extended onto it.',
      'Offboarding is same-day, and it includes every device the person knew a password for.',
      'Quarterly review of every account against the staff list; logins and privileged actions logged off the box.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Cybersecurity', 'SCADA', 'Documentation', 'Standards', 'HMI'],
    blocks: [
      { t: 'h2', text: 'The roles' },
      {
        t: 'table',
        head: ['Role', 'Can', 'Cannot', 'Who'],
        rows: [
          ['View-only', 'See displays, trends, alarm lists', 'Acknowledge, command, change anything', 'Managers, office staff, the auto-login state of a console'],
          ['Operator', 'Acknowledge alarms, start and stop equipment, change setpoints within operator limits, shelve low and medium alarms', 'Change limits, bypass permissives, edit configuration', 'Certified operators on shift'],
          ['Supervisor', 'Everything an operator can, plus setpoints beyond operator limits, alarm shelving at higher priority, permissive bypasses, out-of-service entries', 'Edit displays, tags, or logic', 'Shift supervisors, chief operators'],
          ['Engineer', 'Configure tags, displays, alarms, historian, and communications; download to controllers', 'Administer the operating system or user accounts', 'Control engineers, the integrator under a change record'],
          ['Administrator', 'Operating system, user accounts, backups, patching, security configuration', 'Used for daily operation', 'Named system administrators, used only for administration'],
          ['Service', 'What the application process needs: read tags, write history, run reports', 'Interactive login', 'The SCADA services, the historian collector, the database connection'],
          ['Vendor', 'The role the session needs, usually engineer', 'Anything when no session is arranged; the account is disabled', 'Integrators and vendors, enabled per session and disabled after'],
        ],
      },
      {
        t: 'p',
        text: 'The matrix is written first, as a table of roles against actions, and agreed by operations, engineering, and management. The platform then implements it with its own role and security mechanisms, which differ by product but can express this matrix on every serious platform. A matrix that exists only in the platform configuration cannot be reviewed by anyone who does not administer the platform.',
      },
      { t: 'h2', text: 'Individual accounts and the console' },
      {
        t: 'p',
        text: 'Accountability requires that every action is attributed to a person, which requires that every person has an account. Operator consoles are the place where this usually fails: a shared operator account logged in for years because logging in and out at shift change was inconvenient. The workable design is a console that starts automatically into a view-only state, with all displays visible and nothing commandable, and an operator login, by badge, PIN, or a short password, that unlocks control for that person and times back out to view-only after inactivity. The displays are never lost, control is never anonymous, and shift change takes seconds.',
      },
      { t: 'h2', text: 'Where accounts live' },
      {
        t: 'p',
        text: 'A large system uses a directory dedicated to the control system, with its own domain controllers on the control network or in the DMZ, so that the corporate directory and its compromise cannot reach the SCADA and the SCADA does not depend on the corporate network to authenticate. A small system uses local accounts on each machine, managed by a procedure, which is acceptable for a handful of machines and becomes unmanageable beyond that. What is not acceptable is joining SCADA servers to the corporate domain, which puts the control system inside every phishing campaign the office receives and makes the corporate helpdesk an administrator of the water plant.',
      },
      { t: 'h2', text: 'Lifecycle' },
      {
        t: 'steps',
        items: [
          { title: 'Onboarding', text: 'A request naming the person, the role, and the systems, approved by the responsible manager. The account is created in the role, no more, and the person signs the acceptable use policy.' },
          { title: 'Role change', text: 'A request, an approval, and a change; a person promoted to supervisor gets the supervisor role and loses nothing they should not have had.' },
          { title: 'Offboarding', text: 'The same day: the SCADA account disabled, the directory account disabled, remote access revoked, and every shared device password the person knew rotated. A checklist, run by someone who is told about departures.' },
          { title: 'Vendor sessions', text: 'The vendor account enabled for the session, with the scope and the time recorded, and disabled when the session ends. Never left enabled for convenience.' },
          { title: 'Quarterly review', text: 'The account list against the staff list and the vendor list, with the manager confirming each one. Accounts not confirmed are disabled.' },
        ],
      },
      { t: 'h2', text: 'Logging' },
      {
        t: 'ul',
        items: [
          'Every login and logout, successful and failed, with the account and the station.',
          'Every control action, setpoint change, alarm acknowledgment and shelve, with the account.',
          'Every configuration change and controller download, with the account.',
          'Every account creation, role change, and disable, with the administrator who did it.',
          'All of it forwarded to a collector off the server, retained per the security policy, and reviewed on a schedule for failed logins, logins at odd hours, and privileged actions.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Lockout and availability',
        text: 'A lockout policy that disables an account after a few failed attempts is standard in the office and dangerous on an operator console: an attacker, or a mistyped password at 3 a.m., locks the operator out of control during an emergency. Consoles keep the view-only state always available, use a login method that is hard to mistype, and alarm on repeated failures rather than locking the operator out. Administrative and remote accounts keep the lockout.',
      },
    ],
    faqs: [
      {
        q: 'Operators say individual logins slow them down. What works?',
        a: 'A badge reader or a short PIN at the console, a view-only state that is always there so nothing is hidden while logging in, and a timeout that returns to view-only rather than locking the screen. Most operators accept individual logins once the login takes two seconds and the displays never disappear.',
      },
      {
        q: 'Should the integrator have a permanent engineer account?',
        a: 'A named account for each integrator engineer, disabled between engagements and enabled for a defined session under a change record. A permanent, always-enabled integrator account is a shared account with a long list of people who once knew the password.',
      },
      {
        q: 'Can the corporate IT department manage SCADA accounts?',
        a: 'They can run the dedicated control system directory if the utility decides that, with the control system owner approving every account and role. What they should not do is extend the corporate domain onto the control network or apply corporate policies, such as lockouts and forced password changes, to operator consoles without the control system owner agreeing.',
      },
      {
        q: 'How many administrators should there be?',
        a: 'As few as can cover vacations and emergencies, usually two or three, each with a named administrative account used only for administration and a separate daily account. An administrator account that is used to browse displays is an administrator session waiting to be hijacked.',
      },
    ],
    related: [
      '/cybersecurity/passwords-credentials/shared-account-problems',
      '/cybersecurity/passwords-credentials/password-policy-for-ot',
      '/controls/scada-hmi/scada-fundamentals/clients',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/scada-security/server-hardening',
      '/cybersecurity/passwords-credentials/default-credentials',
    ],
  },
  {
    path: '/cybersecurity/scada-security/patch-management',
    kind: 'reference',
    title: 'Patch Management',
    summary:
      'Applying updates to SCADA servers and clients without breaking the plant: vendor qualification, a monthly cycle with a test system, priority from the exposed edge inward, backups and rollback, emergency patches, and handling software that cannot be patched.',
    answer:
      'Patch management for a control system is a monthly cycle: the operating system and application updates are released, the SCADA vendor publishes which of them are qualified for its product, the qualified updates are applied to a test system with the application exercised, and then to production in a maintenance window, one server of a redundant pair at a time, with a backup or snapshot before each and a rollback plan. Priority runs from the most exposed machines inward: anything in the DMZ or reachable remotely first, then servers, then clients, with controllers and network devices on their own firmware cycle. Actively exploited vulnerabilities get an emergency path with the same test and backup steps compressed. Software that cannot be patched is isolated, allowlisted, and scheduled for replacement, and a record shows the patch state of every machine.',
    keyPoints: [
      'Monthly cycle: release, vendor qualification, test system, maintenance window, production one machine at a time.',
      'The vendor qualification list is the gate; an unqualified patch on a SCADA server is a gamble with the plant.',
      'Edge first: DMZ and remote-reachable machines, then servers, then clients. Controllers have their own firmware process.',
      'Backup or snapshot before every patch, rollback plan written, application tested after.',
      'Exploited vulnerabilities get an emergency path, compressed but not skipped.',
      'Unpatchable systems are isolated, allowlisted, and on a replacement plan, not ignored.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Cybersecurity', 'SCADA', 'Standards', 'Documentation', 'Engineering'],
    blocks: [
      { t: 'h2', text: 'Why control systems lag' },
      {
        t: 'p',
        text: 'An office computer installs updates overnight and reboots; if something breaks, the user calls the helpdesk. A SCADA server that installs an update and reboots at 2 a.m. drops every operator display; if the update breaks the application, the plant runs blind until someone rebuilds it. Vendors of SCADA software respond by testing each operating system update against their product and publishing the list of qualified updates, usually within weeks of release. Utilities respond by turning off automatic updates and running a deliberate cycle. The lag is a few weeks, which is acceptable; the lag becoming years, which is common, is not.',
      },
      { t: 'h2', text: 'The cycle' },
      {
        t: 'steps',
        items: [
          { title: 'Collect', text: 'Operating system updates, application updates, and third-party software updates released this month, and the vendor qualification notices for each product in the system.' },
          { title: 'Assess', text: 'Which apply to which machines, which are qualified, and which address vulnerabilities that are exposed on this system. Anything actively exploited and exposed goes to the emergency path.' },
          { title: 'Test', text: 'Apply the qualified set to the test system, a virtual copy of a server and a client, and exercise the application: polling, alarms, history, displays, reports, failover, remote access. A day of soak.' },
          { title: 'Schedule', text: 'A maintenance window agreed with operations, with the redundant pair patched one at a time and the clients patched while a second client remains available.' },
          { title: 'Back up', text: 'Snapshot or image of each machine before it is patched, and confirmation that the backup can be restored.' },
          { title: 'Apply', text: 'Standby server first; fail over; confirm; then the former active. Clients one at a time. Reboot as required, in the window.' },
          { title: 'Verify', text: 'The application check after each machine, and a look at the logs the next day for errors that appeared.' },
          { title: 'Record', text: 'Machine, updates applied, date, who, result, and any exception with its compensating control and its review date.' },
        ],
      },
      { t: 'h2', text: 'Priority' },
      {
        t: 'table',
        head: ['Tier', 'Machines', 'Why first', 'Cadence'],
        rows: [
          ['1', 'DMZ servers, remote access gateways, jump hosts, anything reachable from outside the control zone', 'They face the attackers', 'Within days of qualification; emergency within hours'],
          ['2', 'SCADA servers, historian, database, domain controllers for the control system', 'They run the plant and hold the records', 'Monthly, in the window'],
          ['3', 'Operator consoles, engineering workstations', 'Many hands touch them; they reach the servers', 'Monthly, rolling'],
          ['4', 'Network equipment firmware: switches, firewalls, radios', 'Exposure varies; firewalls are tier 1 when internet-facing', 'Quarterly or on advisory'],
          ['5', 'Controllers, remote units, drives, instruments', 'Firmware updates change behavior; tested and scheduled separately', 'On advisory and at planned outages; see firmware management'],
        ],
      },
      { t: 'h2', text: 'The emergency path' },
      {
        t: 'p',
        text: 'When a vulnerability is being exploited in the wild and the system is exposed to it, waiting for the monthly window is the wrong risk. The emergency path runs the same steps in a day: the vendor qualification checked or the vendor asked, a quick test on the test system, a backup, and the patch applied to the exposed machines first. Where the patch is not yet qualified, the compensating control is applied immediately instead: the vulnerable service disabled, a firewall rule added, the machine isolated, and the patch follows when it is qualified. The decision and its reasoning are recorded either way.',
      },
      { t: 'h2', text: 'What cannot be patched' },
      {
        t: 'p',
        text: 'Every utility has some: an HMI on an operating system out of support, a historian version the vendor no longer updates, a device whose firmware was last released a decade ago. They are not ignored; they are managed. Isolate the machine in its own segment with firewall rules that allow only what it must do; enforce application allowlisting so nothing new runs; remove it from any remote access path; monitor it; and put it on a replacement plan with a date. The record lists each one with its compensating controls, and the review each year asks whether the date has arrived.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Automatic updates on a control server',
        text: 'An operating system that updates and reboots itself on its own schedule will one day reboot the active SCADA server during an event, or install an update the vendor has not qualified. Automatic updates are disabled on every control system machine, and updates arrive through the cycle. That also means the cycle has to actually run; a server with automatic updates disabled and no cycle is a server that is never patched.',
      },
      { t: 'h2', text: 'Antivirus definitions' },
      {
        t: 'p',
        text: 'Antivirus signature updates are the one thing that does update daily, and they arrive through an internal update server in the DMZ that pulls from the vendor and serves the control network, so that no control machine talks to the internet. The same DMZ server distributes operating system updates once they are approved, which gives the cycle a delivery mechanism that does not involve a USB drive.',
      },
    ],
    faqs: [
      {
        q: 'The vendor qualification takes weeks. Are we exposed in the meantime?',
        a: 'The exposure depends on whether the vulnerability is reachable on the system. Most operating system vulnerabilities require network access to a service that a hardened, segmented server does not expose, and a few weeks of lag is acceptable. For the ones that are exposed and exploited, the emergency path and the compensating controls exist.',
      },
      {
        q: 'Can we skip a month?',
        a: 'A month skipped is two months of updates next time, tested and applied together, which is harder to troubleshoot and longer in the window. Skip only for a reason, and record it. A cycle that skips often is a cycle that has stopped.',
      },
      {
        q: 'What is a test system for a small utility?',
        a: 'A virtual machine with a copy of the SCADA server, and one with a client, on a spare host or even on the production hypervisor with restricted networking. The vendor license usually allows a test copy. Without one, the standby server of a redundant pair is the test system, which is acceptable with a snapshot; a single production server with no test system is patched with a backup and a prayer.',
      },
      {
        q: 'Who approves the patch?',
        a: 'The control system owner, on the recommendation of whoever runs the cycle, in the change management process. The approval is a record that says what was applied and why, which is what the auditor and the incident investigator will ask for.',
      },
    ],
    related: [
      '/cybersecurity/vulnerability-management/risk-based-patching',
      '/cybersecurity/scada-security/server-hardening',
      '/cybersecurity/plc-security/firmware-management',
      '/cybersecurity/vulnerability-management/compensating-controls',
      '/cybersecurity/backups/scada-backups',
      '/cybersecurity/change-detection/change-management-for-ot',
    ],
  },
  {
    path: '/cybersecurity/scada-security/historian-security',
    kind: 'reference',
    title: 'Historian Security',
    summary:
      'The historian is the most connected server in a control system and the most exposed: giving the office, reports, and the cloud the data they need without a path to the plant, with a collector in the control zone, a replica in the DMZ, and one-way flow.',
    answer:
      'The historian is where everyone outside the control room wants to connect, which makes it the natural bridge for an attacker from the office to the plant. The design that prevents that is two historians: one in the control zone that collects from the controllers and the SCADA, and a replica in the DMZ that receives data one way from it and serves the office, the reports, and any cloud connection. Nothing in the office connects to the control zone historian, the DMZ replica cannot write back, accounts on the replica are read-only, the data path from control zone to DMZ is a one-way replication or a unidirectional gateway where the risk warrants it, and the archives on both are protected, backed up, and logged as the regulatory records they are.',
    keyPoints: [
      'The historian is the server the office needs, which makes it the server the attacker wants.',
      'Two historians: collect in the control zone, serve from a replica in the DMZ.',
      'Data flows one way, control zone to DMZ; the replica cannot write back and the office cannot reach the collector.',
      'Read-only accounts for everyone who reads; the collector service account has the minimum rights to write.',
      'Archives are regulatory records: access controlled, backed up off site, and audited.',
      'Cloud and enterprise connections attach to the DMZ replica through a broker or a gateway, never to the collector.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Cybersecurity', 'SCADA', 'Networking', 'Documentation', 'Design'],
    blocks: [
      { t: 'h2', text: 'The exposure' },
      {
        t: 'table',
        head: ['Who wants historian data', 'Typical connection', 'Risk if connected to the control zone historian'],
        rows: [
          ['Managers and office staff', 'Trend and dashboard clients on office computers', 'Every office computer becomes a path into the control zone'],
          ['Reporting and compliance', 'Report servers, spreadsheets with database connections', 'Credentials in spreadsheets; report servers reachable from the office'],
          ['Maintenance and laboratory systems', 'Database connections, scheduled exports', 'Enterprise systems with their own vulnerabilities reaching inward'],
          ['Cloud analytics and vendor services', 'Internet connections from the historian', 'The control zone historian talking to the internet'],
          ['Regulators and consultants', 'Exports, occasionally remote access', 'Remote access to a control zone server'],
        ],
      },
      { t: 'h2', text: 'The design' },
      {
        t: 'p',
        text: 'The collecting historian lives in the control zone, or in the supervisory zone beside the SCADA servers, and collects from the controllers and the SCADA tag server. It is reached only by control zone clients and by the replication process. A second historian in the DMZ receives the data from the first through a one-way replication configured in the historian product, or through a unidirectional gateway or data diode where the utility has decided that the risk justifies hardware enforcement. The DMZ historian serves everything outside: office trend clients, report servers, database connectors, and the connection to any cloud service, which itself goes out through the DMZ. The firewall permits the replication from inside to the DMZ on its ports, permits the office to reach the DMZ historian, and permits nothing from the DMZ or the office into the control zone.',
      },
      { t: 'h2', text: 'Accounts and access' },
      {
        t: 'ul',
        items: [
          'The collector service account on the control zone historian has rights to write history and nothing else, with no interactive login.',
          'The replication account has rights to read from the collector and write to the replica, and nothing else.',
          'Every reader on the replica has a read-only account, individual where the product allows and otherwise a role with no write rights; report servers and connectors use service accounts that are read-only.',
          'Engineering configuration of the historian is done from the control zone with an engineer account, not from the office.',
          'Web interfaces of the historian are enabled on the replica only, with encryption and authentication, and disabled on the collector.',
          'Vendor connectors and cloud agents run on the replica or on a separate DMZ host, never on the collector.',
        ],
      },
      { t: 'h2', text: 'Archives as records' },
      {
        t: 'p',
        text: 'The archive files hold years of compliance measurements, and their integrity matters as much as their confidentiality. Access to the archive directories is restricted to the historian service and the backup process; administrators reach them through change management. The archives are backed up on a schedule, off the server and off site, with the backups themselves protected. Deletion and modification of archives are logged, and the historian audit log, where the product has one, is forwarded to the log collector. A retention policy says how long the records are kept, and a periodic export in a plain format provides a record that does not depend on the historian software at all.',
      },
      { t: 'h2', text: 'Cloud and enterprise' },
      {
        t: 'p',
        text: 'A utility that sends data to a cloud analytics service, a regional operations platform, or an enterprise data lake does so from the DMZ, one way, through a broker or a gateway that publishes what has been selected and accepts nothing back into the control zone. Any inbound value from those systems, such as a demand forecast or an optimization setpoint, arrives in the DMZ, is validated, and is written to a designated SCADA tag by a controlled process, never directly to a controller. The connection uses encryption and certificates, the credentials live on the DMZ host, and the outbound firewall rule is specific to the destination.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'One historian is a trade-off',
        text: 'A small utility that cannot run two historians can put its one historian in the DMZ, collecting from the control zone through the firewall on the collection ports only, with the office reading it there. That exposes the historian more than the two-historian design and still keeps every office connection out of the control zone. What is not acceptable is a historian in the control zone with office clients connected to it.',
      },
    ],
    faqs: [
      {
        q: 'Is a data diode necessary?',
        a: 'For most water utilities a software replication through a firewall with one-way rules is proportionate. A unidirectional gateway is chosen where the consequences justify hardware enforcement, where a regulator or an insurer expects it, or where the utility wants to eliminate the possibility of a firewall misconfiguration. The two-historian design is the same either way; the diode replaces the firewall rule on that one path.',
      },
      {
        q: 'The reporting tool needs to write calculated results back. Where do they go?',
        a: 'Into the DMZ historian or a DMZ database, where the office and the reports can read them. If a calculated value must reach the SCADA for display, a controlled process in the control zone reads it from the DMZ through a one-way pull, validates it, and writes it to a designated tag. Nothing in the DMZ pushes into the control zone.',
      },
      {
        q: 'What about the historian web interface that the vendor promotes?',
        a: 'It is convenient and it is a web server on a control system machine. Run it on the DMZ replica only, with encryption, authentication, and the same patching as any DMZ server; disable it on the collector.',
      },
      {
        q: 'How is historian access audited?',
        a: 'By the historian audit log where the product provides one, by the operating system logon logs on the historian servers, and by the firewall logs for the connections that reach them, all forwarded to the log collector and reviewed on a schedule for readers who should not be there and for configuration changes.',
      },
    ],
    related: [
      '/controls/scada-hmi/historian-data/historian-architecture',
      '/cybersecurity/network-segmentation/dmz-design',
      '/cybersecurity/network-segmentation/data-diodes',
      '/controls/scada-hmi/historian-data/sql-integration',
      '/controls/scada-hmi/historian-data/long-term-storage',
      '/cybersecurity/scada-security/user-accounts-and-roles',
    ],
  },
  {
    path: '/cybersecurity/scada-security/third-party-software',
    kind: 'reference',
    title: 'Third-Party Software',
    summary:
      'Everything on a control system machine that is not the SCADA: drivers, databases, runtimes, reporting tools, agents, remote support utilities. Why each is an attack surface, the inventory and approved list, rules for installs, and removing what is unused.',
    answer:
      'A SCADA server runs far more than the SCADA: communication drivers, OPC servers, a database engine, language runtimes, reporting and PDF tools, backup and antivirus agents, hypervisor tools, and often a remote support utility or a browser that nobody remembers installing. Each one is code that can be exploited, each has its own updates and its own habit of calling home, and each widens what an attacker can do. The control is an inventory of every installed product on every machine, an approved list of what is allowed for each role, a rule that nothing is installed outside change management, updates for third-party software inside the patch cycle, downloads verified against vendor signatures and hashes from vendor sources only, automatic updaters and telemetry disabled on the control network, and a periodic removal of anything not on the list.',
    keyPoints: [
      'The SCADA is a fraction of the code on the server; the rest needs the same attention.',
      'Inventory everything installed on every machine, then decide what is approved for each role.',
      'Nothing is installed outside change management, including by vendors during support sessions.',
      'Third-party updates are part of the patch cycle; automatic updaters and telemetry are disabled.',
      'Downloads come from the vendor, verified by signature or hash, through the DMZ, never on a USB drive from a laptop.',
      'Remove what is not used; a program that is not there cannot be exploited.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'SCADA', 'Documentation', 'Standards', 'Design'],
    blocks: [
      { t: 'h2', text: 'What is on the server' },
      {
        t: 'table',
        head: ['Category', 'Examples', 'Concern', 'Control'],
        rows: [
          ['Communication software', 'Protocol drivers, OPC servers, gateway software', 'Listens on the network; often old; parses untrusted data from devices', 'Vendor-supported versions; patched in the cycle; only the drivers in use installed'],
          ['Databases and runtimes', 'Database engines, language runtimes, frameworks', 'Large attack surface; frequent vulnerabilities; installed as dependencies and forgotten', 'Versions tracked; patched with vendor qualification; unneeded features disabled'],
          ['Reporting and office tools', 'Report engines, spreadsheet tools, PDF readers, browsers', 'Document-based attacks; browsers reach out', 'Installed only where a report is generated; browser removed from servers where possible'],
          ['Agents', 'Antivirus, backup, monitoring, hypervisor tools, management agents', 'Run with high privilege; talk to management servers', 'From the approved list; management servers in the DMZ; versions in the patch cycle'],
          ['Remote support tools', 'Screen sharing and remote control utilities', 'Outbound connections to the internet; a permanent door', 'Not permitted; remote access goes through the jump host'],
          ['Utilities', 'File transfer, compression, diagnostic, and configuration tools', 'Installed during troubleshooting and never removed', 'Removed after use or added to the approved list with a reason'],
          ['Vendor engineering tools', 'Controller programming software, device configuration tools', 'Powerful; licensed; sometimes require internet activation', 'On engineering workstations only; activation through a controlled path'],
        ],
      },
      { t: 'h2', text: 'Bringing it under control' },
      {
        t: 'steps',
        items: [
          { title: 'Inventory', text: 'Every installed program on every control system machine, with version and purpose, from the operating system inventory and a walk of each machine. Expect surprises.' },
          { title: 'Decide', text: 'For each machine role, the approved list: what is required, what is allowed, and what is removed. Every item on the list has a reason and an owner.' },
          { title: 'Remove', text: 'Uninstall everything not on the list, one machine at a time, with a backup first and the application tested after.' },
          { title: 'Enforce', text: 'Application allowlisting so that unlisted software cannot run even if installed, and administrative rights limited so that it cannot be installed casually.' },
          { title: 'Maintain', text: 'Third-party updates in the patch cycle with their own vendor checks; the inventory updated at every change; a quarterly comparison of what is installed against the list.' },
        ],
      },
      { t: 'h2', text: 'Rules' },
      {
        t: 'ul',
        items: [
          'No installation outside change management. That includes the vendor engineer who wants to install a diagnostic tool during a support session; the tool is approved or it is not installed.',
          'Downloads from the vendor site or the vendor portal, verified by the published hash or the code signature, transferred through the DMZ file transfer path, and scanned. Not from a search result, not from a laptop, not from a USB drive that was in a truck.',
          'Automatic updaters, telemetry, and license phone-home disabled or blocked at the firewall; updates come through the cycle. A control zone machine has nothing to say to the internet.',
          'No remote support utilities. The jump host with multi-factor authentication is the way in, for the vendor as much as for staff.',
          'Vendor engineering software on dedicated engineering workstations, not on servers or consoles.',
          'Licenses and installers kept with the backups, so a rebuild does not require a download under pressure.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The forgotten remote support tool',
        text: 'A remote control utility installed years ago by a vendor for a support session, still running as a service, still connecting to the vendor cloud, is one of the most common findings in a control system assessment. It is a permanent, unmonitored door that bypasses every firewall rule. Find them in the inventory, remove them, and replace them with the jump host.',
      },
      { t: 'h2', text: 'The supply chain' },
      {
        t: 'p',
        text: 'Software arrives from somewhere, and the somewhere matters. A driver package from a reseller website, an installer from a file sharing site because the vendor portal was slow, a firmware image emailed by a contractor: each is a chance to install something that is not what it claims. Vendor sources, signature and hash verification, and a controlled transfer path are how software enters the control zone. Where the vendor provides a software bill of materials, keep it with the inventory; when a vulnerability in a runtime or a library is announced, it says which products on the system contain it.',
      },
    ],
    faqs: [
      {
        q: 'The SCADA vendor installer put a database and a runtime on the server. Are those third-party?',
        a: 'Yes, and they are the most important ones. The vendor bundles them and qualifies updates for them; the utility patches them through the vendor guidance, tracks their versions, and disables the features the SCADA does not use. A vulnerability in the bundled database is a vulnerability in the SCADA server.',
      },
      {
        q: 'Do we need a browser on the engineering workstation?',
        a: 'Only if a vendor tool or a device configuration page requires one, and then a hardened browser that reaches only the control network, with no internet access. Servers and consoles do not need one at all.',
      },
      {
        q: 'How do vendor tools that require internet activation get activated?',
        a: 'Through an offline activation process, which most vendors provide, or on a machine in the DMZ set up for the purpose, or by a temporary, logged, specific firewall rule opened through change management and closed afterward. Not by giving the engineering workstation general internet access.',
      },
      {
        q: 'What is the minimum for a small utility?',
        a: 'A list of what is installed on each machine, a decision about what stays, removal of the rest, no remote support utilities, and third-party updates included whenever the operating system is patched. That takes a day and removes most of the exposure.',
      },
    ],
    related: [
      '/cybersecurity/scada-security/server-hardening',
      '/cybersecurity/scada-security/patch-management',
      '/cybersecurity/remote-access/jump-hosts',
      '/cybersecurity/asset-inventory/building-an-ot-asset-inventory',
      '/cybersecurity/change-detection/change-management-for-ot',
      '/cybersecurity/vulnerability-management/advisories-and-alerts',
    ],
  },
  {
    path: '/cybersecurity/passwords-credentials/shared-account-problems',
    kind: 'reference',
    title: 'Shared Account Problems',
    summary:
      'Why the shared operator login, the vendor account everyone knows, and the single PLC password are the weakest point in most utilities: no accountability, no offboarding, no detection. Containing what cannot be avoided and migrating the rest.',
    answer:
      'A shared account is one whose password is known to more than one person, and in most utilities that describes the operator console login, the integrator account, the SCADA administrator account, and the password on every controller, switch, and HMI. The problems are that no action can be attributed to a person, that an employee or contractor who leaves takes the password with them and it is never changed because changing it would break something, that misuse cannot be distinguished from use, and that every audit and every incident investigation ends at the shared account. The fix is individual accounts wherever the platform supports them, starting with the SCADA and the operating systems, with the console designed so that individual login is fast; and for the devices that support only one password, containment: unique passwords per device stored in a vault, rotation on every staff or contractor change, network restrictions on who can reach the device, and logging of who was given the password when.',
    keyPoints: [
      'A shared account gives every action the same name, which is no name.',
      'The password that everyone knows is the password that never changes, because changing it breaks things.',
      'Departed employees and finished contractors keep every shared password they were ever given.',
      'Individual accounts on the SCADA and the operating systems come first; they cover most actions and most audits.',
      'Devices with one password are contained: unique per device, vaulted, rotated on change, reachable only from the engineering zone.',
      'The migration succeeds when individual login is faster than the shared one was.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'SCADA', 'Documentation', 'Standards', 'PLC'],
    blocks: [
      { t: 'h2', text: 'Where shared accounts hide' },
      {
        t: 'table',
        head: ['Account', 'Why it is shared', 'What goes wrong'],
        rows: [
          ['Operator console login', 'Logging in at shift change was inconvenient; the display had to stay up', 'Every control action for a decade is attributed to OPERATOR'],
          ['SCADA administrator', 'Set up at installation, used by everyone who administers', 'Configuration changes with no author; the password is in the integrator project files'],
          ['Integrator or vendor account', 'One account for the firm, used by whichever engineer visits', 'Engineers who left the firm still know it; it is enabled permanently'],
          ['Controller, HMI, switch, and radio passwords', 'The device has one password', 'The same password on every device; known to every contractor who ever touched one'],
          ['Service accounts used interactively', 'Convenient for troubleshooting', 'A high-privilege account with a password that cannot be rotated without touching every service'],
          ['Remote access account', 'One VPN login for the on-call rotation', 'Nobody knows who connected at 2 a.m.'],
        ],
      },
      { t: 'h2', text: 'What it costs' },
      {
        t: 'ul',
        items: [
          'Accountability: the audit trail, the alarm acknowledgment record, and the incident timeline all say the same name. The question who did this cannot be answered.',
          'Offboarding: the checklist for a departing employee cannot include changing a password that fifteen people use and that is embedded in scripts and vendor documents, so it is not changed. Former staff and finished contractors retain access indefinitely.',
          'Detection: a login by an attacker with the shared password looks like a login by staff. There is no anomaly to detect.',
          'Compliance: every assessment, insurer questionnaire, and regulatory review asks about unique accounts, and the answer is no.',
          'Password quality: a password that many people must remember and type is short and simple, and it is written down near the console.',
        ],
      },
      { t: 'h2', text: 'Individual accounts first' },
      {
        t: 'p',
        text: 'The SCADA platform, the operating systems, the directory, and the remote access system all support individual accounts with roles, and they cover the actions that matter most: control, configuration, administration, and remote connection. Moving those to individual accounts is a project of a few weeks: define the roles, create the accounts, configure the console for view-only auto-login with a fast operator login, disable the shared accounts, and rotate the passwords on any that must remain for service use. Operators accept it when the login is a badge tap or a four-digit PIN and the displays never go away; they resist it when it is a twelve-character password typed on a screen that went blank.',
      },
      { t: 'h2', text: 'Containing the unavoidable' },
      {
        t: 'p',
        text: 'A controller with one password, a managed switch with a local admin account, a radio with a web login: these will be shared among the people who maintain them, because the device offers nothing else. The containment is to make sharing narrow and visible.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Unique per device', text: 'No two devices with the same password; a compromised password then opens one device, not the plant.' },
          { title: 'Vaulted', text: 'The passwords in a credential vault with individual access, so that who retrieved which password when is logged; that log is the accountability the device cannot provide.' },
          { title: 'Rotated on change', text: 'Every time a person who had access leaves, or a contractor engagement ends, the passwords they were given are changed. The vault log says which ones.' },
          { title: 'Reachable only from the engineering zone', text: 'Firewall rules and switch configuration so that the device management interface is reachable only from the engineering workstations, where individual logins already apply.' },
          { title: 'Logged where possible', text: 'Devices that support a syslog or an audit log send it to the collector; devices that support a central authentication server use it instead of local passwords.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The integrator account',
        text: 'The integrator needs access and the integrator has staff turnover. Give each integrator engineer a named account, disabled between engagements and enabled for a session under a change record, and rotate the device passwords the integrator used when the project ends. The integrator that objects to named accounts is the integrator whose former employees still have the utility passwords.',
      },
    ],
    faqs: [
      {
        q: 'Our operators share one login and it has worked for twenty years. What is the actual risk?',
        a: 'That nobody can say who did anything, that every former operator and every contractor still knows the password, and that an intruder who learns it is indistinguishable from staff. The risk has always been there; the difference now is that attackers are looking for water utilities, and a shared login is the first thing they try.',
      },
      {
        q: 'The PLC has one password. How is that not a shared account?',
        a: 'It is one, and it cannot be avoided on that device. The containment makes it narrow: unique to that controller, in the vault, rotated when people leave, and the controller reachable only from engineering workstations where the person logged in with their own account. The individual accountability is at the workstation and the vault, not the controller.',
      },
      {
        q: 'How do we rotate a password that is embedded in scripts and configurations?',
        a: 'Find every place it is used, which the inventory and a search of the project files reveal, move each use to a service account with the credential in the platform credential store rather than in the script, and then rotate. It is tedious once and routine afterward. A password that cannot be rotated is a permanent vulnerability with a known value.',
      },
      {
        q: 'Is a badge login on the console secure enough?',
        a: 'For unlocking operator control on a console that is physically inside the control room, a badge or a short PIN is proportionate: the control is physical access to the room plus the credential, and the goal is attribution and fast switching. Administrative and remote access keep strong passwords and multi-factor authentication.',
      },
    ],
    related: [
      '/cybersecurity/scada-security/user-accounts-and-roles',
      '/cybersecurity/passwords-credentials/password-policy-for-ot',
      '/cybersecurity/passwords-credentials/credential-storage',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/plc-security/controller-hardening',
    ],
  },
  {
    path: '/cybersecurity/passwords-credentials/password-policy-for-ot',
    kind: 'reference',
    title: 'Password Policy for OT',
    summary:
      'A password policy that fits a control system rather than an office: length over complexity, rotation on events, screening against breached lists, multi-factor authentication, no lockouts that take control from an operator, and unique vaulted device passwords.',
    answer:
      'Current guidance, including the federal digital identity guidelines, favors long passwords over complex ones, screening against lists of breached passwords, and changing passwords when there is a reason rather than on a schedule, and those principles apply to control systems with adjustments for availability. Operator consoles use a fast individual credential to unlock control with a view-only state that is always available and no lockout that could deny an operator the HMI; administrative accounts use long passphrases and multi-factor authentication; remote access requires multi-factor authentication without exception; service accounts use long random passwords stored in the platform credential store and rotated when the people who knew them leave; and devices with a single password get a unique, long, vaulted password per device, changed from the default at commissioning and rotated on every staff or contractor change.',
    keyPoints: [
      'Length beats complexity: a long passphrase is stronger and easier to remember than eight characters of symbols.',
      'Rotate on events, not on a calendar: a departure, a finished contract, a suspected compromise.',
      'Screen new passwords against breached lists; the common ones are the first an attacker tries.',
      'Multi-factor authentication for remote access and administration, always.',
      'No lockout on operator consoles; alarm on failed attempts instead, and keep view-only always available.',
      'Every device password unique, long, vaulted, and never the default.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'Standards', 'Documentation', 'SCADA', 'PLC'],
    blocks: [
      { t: 'h2', text: 'What changed in password guidance' },
      {
        t: 'p',
        text: 'For years policies demanded eight characters with uppercase, lowercase, digits, and symbols, changed every ninety days. The result was passwords like the current month with an exclamation mark, written on a note under the keyboard. The federal digital identity guidelines reversed that: length is what makes a password strong, forced periodic changes make passwords weaker by pushing people to predictable patterns, and the useful checks are a minimum length, screening against lists of passwords that have appeared in breaches, and a change when there is evidence of compromise. Control systems adopt those principles and add the availability constraint that an operator must never be locked away from the process.',
      },
      { t: 'h2', text: 'Policy by account class' },
      {
        t: 'table',
        head: ['Account class', 'Credential', 'Rotation', 'Multi-factor', 'Lockout'],
        rows: [
          ['Operator console unlock', 'Badge, PIN, or short password; individual', 'On departure or compromise', 'The control room itself is the second factor; none required at the console', 'None; alarm on repeated failures; view-only always available'],
          ['Supervisor and engineer', 'Passphrase of 14 characters or more; individual', 'On departure or compromise', 'Where the platform supports it; required for remote sessions', 'Short lockout with automatic release; view-only unaffected'],
          ['Administrator', 'Passphrase of 16 characters or more; individual, used only for administration', 'On departure or compromise', 'Required', 'Lockout with alert'],
          ['Remote access', 'Individual account', 'On departure or compromise', 'Required, no exceptions, including vendors', 'Lockout with alert'],
          ['Service accounts', 'Long random password, 20 characters or more, in the platform credential store', 'When a person who knew it leaves; on compromise', 'Not applicable', 'Not applicable; no interactive login'],
          ['Devices with one password', 'Unique per device, as long as the device allows, in the vault', 'On every departure or contractor change; on compromise', 'Not available; compensated by network restriction', 'Per the device'],
          ['Break-glass', 'Sealed envelope in a safe, or a vault emergency access', 'After every use', 'Physical access is the factor', 'None'],
        ],
      },
      { t: 'h2', text: 'Rules that apply everywhere' },
      {
        t: 'ul',
        items: [
          'No default passwords on anything, from the day it is commissioned. The default list is public.',
          'No password reuse between systems; the SCADA administrator password is not the switch password.',
          'No passwords in scripts, configuration files, project files, drawings, or spreadsheets; the credential store or the vault holds them.',
          'No password hints, no security questions, no email of passwords.',
          'New passwords screened against a breached password list where the platform supports it, and against a short list of obvious ones where it does not.',
          'Passwords are told to people in person or through the vault, never in email or a text message, and never on the phone to someone who called in.',
          'Every credential given to a contractor is recorded, and rotated when the engagement ends.',
        ],
      },
      { t: 'h2', text: 'Availability first at the console' },
      {
        t: 'p',
        text: 'An office policy that locks an account after five failed attempts protects a mailbox. Applied to an operator console it means a mistyped PIN during an overflow, or an attacker deliberately failing logins, takes control away from the operator when it is most needed. The console design keeps the displays and alarms visible without any login, requires an individual credential only to command, uses a credential that is hard to mistype, and raises an alarm to the supervisor on repeated failures instead of locking anyone out. Lockouts belong on administrative and remote accounts, where availability of the process does not depend on them.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Passphrases people can use',
        text: 'Four or five unrelated words are longer, stronger, and easier to remember than a string of symbols, and they can be typed. Give administrators and engineers that guidance, screen the result against the breached list, and drop the forced quarterly change. Passwords improve the moment the policy stops fighting the people who have to use them.',
      },
      { t: 'h2', text: 'Writing it down' },
      {
        t: 'p',
        text: 'The policy is a short document: the classes, the rules for each, the rotation triggers, where credentials are stored, who approves exceptions, and how the policy is enforced on each platform. It is approved by the utility, applied to the platforms through their settings, and reviewed when a platform changes or an incident shows a gap. A policy that is longer than a page is not read; one that does not exist is whatever the integrator set.',
      },
    ],
    faqs: [
      {
        q: 'The insurer or the auditor requires ninety-day password changes. What do we do?',
        a: 'Show them the current federal guidance, which recommends against forced periodic changes, and the policy that rotates on events and uses multi-factor authentication and breached-password screening. Most auditors accept a documented, current policy. If a requirement is contractual and immovable, apply it to administrative and remote accounts, and keep the operator console exempt for availability, with the reasoning recorded.',
      },
      {
        q: 'How long should a device password be?',
        a: 'As long as the device allows, which on some controllers is disappointingly short. Use the maximum, make it unique, vault it, and compensate for the device limits with network restrictions so that the password is not the only thing between the internet and the controller.',
      },
      {
        q: 'Should operators have multi-factor authentication?',
        a: 'At the console, the control room and its physical access are the second factor, and a fast individual credential is enough. For any operator function reached remotely, from home or a phone, multi-factor authentication is required like any other remote access.',
      },
      {
        q: 'What about the password on the HMI panel at a lift station?',
        a: 'A device password: unique to the site, vaulted, changed from the default at commissioning, and rotated when people change. The panel is also physically inside a locked enclosure at a fenced site, which is part of the control, and its management interface is not on the network for anyone to reach.',
      },
    ],
    related: [
      '/cybersecurity/passwords-credentials/shared-account-problems',
      '/cybersecurity/passwords-credentials/credential-storage',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/cybersecurity/remote-access/multi-factor-authentication',
      '/cybersecurity/scada-security/user-accounts-and-roles',
      '/cybersecurity/ot-security/security-program-basics',
    ],
  },
  {
    path: '/cybersecurity/passwords-credentials/credential-storage',
    kind: 'reference',
    title: 'Credential Storage',
    summary:
      'Where the passwords and keys of a control system are kept: a vault with individual access and a log, break-glass copies in a safe, platform credential stores for service accounts, and the places they must not be, from spreadsheets to project files.',
    answer:
      'Credentials for a control system live in a credential vault, a password manager built for teams or an enterprise secrets system, with an individual login for each person, access by role so that a technician sees the device passwords they maintain and not the administrator passwords, and a log of every retrieval. Service account credentials live in the platform credential stores that the SCADA and the operating system provide, not in scripts. A sealed break-glass copy of the administrative and vault recovery credentials is kept in a physical safe under a procedure. The vault is backed up off the network and the recovery is tested, so that the departure of the person who set it up does not lock the utility out. Credentials are removed from every other place they have accumulated: spreadsheets, sticky notes, drawings, controller project files, integrator archives, and email.',
    keyPoints: [
      'One vault, individual logins, role-based access, and a log of who retrieved what.',
      'Service account credentials in the platform credential store, never in a script or a configuration file.',
      'A sealed break-glass copy in a safe, with a procedure for opening it and a rotation after every use.',
      'The vault is backed up off the network, and recovery is practiced before the vault administrator leaves.',
      'Hunt down the copies: spreadsheets, notes, drawings, project files, integrator archives, email.',
      'Contractors get credentials through the vault, temporarily, and the credentials are rotated when they finish.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'Documentation', 'Standards', 'SCADA', 'PLC'],
    blocks: [
      { t: 'h2', text: 'Where credentials are found today' },
      {
        t: 'table',
        head: ['Place', 'Why it is there', 'Problem'],
        rows: [
          ['A spreadsheet on the shared drive', 'The integrator left one at commissioning; it was convenient', 'Readable by everyone with the drive, copied to laptops, emailed, never updated'],
          ['Sticky notes and the inside of the panel door', 'The console password had to be remembered by everyone', 'Visible to every visitor and every photograph'],
          ['Drawings and specifications', 'The device password was on the network drawing', 'Drawings are shared with bidders, contractors, and consultants'],
          ['Controller and HMI project files', 'The HMI project stores the SCADA password; the controller project stores the device password', 'Project files are backed up, emailed, and kept by every integrator who touched them'],
          ['Scripts and configuration files', 'A database password in a report script; a service password in a driver configuration', 'Anyone who reads the file has the credential; rotation breaks the script'],
          ['Email and text messages', 'A password was sent to a contractor in a hurry', 'Retained forever in mailboxes on both ends'],
          ['One person memory', 'The administrator knows them all', 'The administrator leaves, is ill, or is on vacation'],
        ],
      },
      { t: 'h2', text: 'The vault' },
      {
        t: 'p',
        text: 'A credential vault is a purpose-built store: encrypted, with individual accounts, groups or roles that decide which entries each person can see, an audit log of every view and change, sharing that does not involve copying the password into a message, and a way to store notes, keys, and certificates as well as passwords. Team password managers do this at a cost a small utility can afford; enterprise secrets systems do it at scale. Either is run on infrastructure the utility controls or in a service the utility has evaluated, with its own multi-factor authentication, and its master credentials are the most protected thing the utility owns.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Choose and set up', text: 'A vault product with team features, individual accounts, roles, an audit log, and an offline export for backup. Multi-factor authentication on every vault account.' },
          { title: 'Structure it', text: 'Folders or groups by system and site: SCADA, network, controllers by site, radios, vendors. Each entry with the device, the address, the account, the password, and the date it was last changed.' },
          { title: 'Load it', text: 'Every credential from every place it currently lives, changing each one as it is loaded if it has ever been shared widely.' },
          { title: 'Grant access', text: 'Each person sees what their role needs. Administrators see administrator entries; technicians see the devices they maintain; nobody sees everything except the two people who administer the vault.' },
          { title: 'Move service accounts', text: 'Credentials used by software into the platform credential stores, with the vault holding a copy for recovery.' },
          { title: 'Break-glass', text: 'The vault recovery credentials and the top administrative credentials printed, sealed, signed across the seal, dated, and locked in a safe with a log of who opens it. Rotated after any opening.' },
          { title: 'Back up', text: 'An encrypted export of the vault on a schedule, kept offline with the break-glass envelope, and a restore tested once.' },
          { title: 'Clean up', text: 'Delete the spreadsheet, shred the notes, remove passwords from drawings and project file comments, and ask the integrator to confirm they have removed them from their copies.' },
        ],
      },
      { t: 'h2', text: 'Service accounts and software' },
      {
        t: 'p',
        text: 'A report script that connects to the database, a driver that logs into a device, a collector that authenticates to the historian: each needs a credential, and the credential does not belong in the script. The SCADA platform, the operating system, and the database each provide a credential store or a managed account mechanism that keeps the secret out of the file and lets it be rotated in one place. Where an older product insists on a password in a configuration file, the file is protected by permissions so that only the service can read it, the password is unique to that use, and the fact is recorded in the vault entry so that rotation includes it.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The vault administrator leaves',
        text: 'A vault that only one person can administer is a vault the utility loses when that person leaves. Two administrators, the recovery credentials in the safe, the backup tested, and a written procedure for taking over are the minimum. The day a vault administrator gives notice, the recovery is rehearsed and the credentials they held are rotated.',
      },
      { t: 'h2', text: 'Contractors' },
      {
        t: 'p',
        text: 'An integrator or a vendor needs credentials for a project. They receive them through the vault, as a share to a named account with an expiry, or in person for devices, and the record shows what they were given. When the engagement ends, every credential they received is rotated, and the vault log makes the list. Credentials sent in an email to a contractor are in that contractor mailbox forever; credentials shared through the vault can be withdrawn.',
      },
    ],
    faqs: [
      {
        q: 'Is a cloud password manager acceptable for a water utility?',
        a: 'Reputable team password managers use end-to-end encryption so that the service cannot read the entries, and many utilities use them. The utility evaluates the product, enforces multi-factor authentication on it, keeps an offline encrypted export, and decides for itself whether the most sensitive credentials, such as the break-glass set, stay offline in the safe instead. A self-hosted vault avoids the question at the cost of running it.',
      },
      {
        q: 'What goes in the safe?',
        a: 'The vault recovery credentials, the top administrative credentials for the SCADA and the directory, the firewall administrator credentials, and anything else without which the system could not be recovered if the vault were lost, each in a sealed, signed, dated envelope, with a log of openings. Not every device password; the vault holds those.',
      },
      {
        q: 'The controller project file contains the HMI password in a comment. Does that matter?',
        a: 'Yes: the project file is backed up, emailed to the integrator, and kept for years by everyone who worked on it. Remove credentials from comments and descriptions, rotate the credential, and treat project files as sensitive documents from then on.',
      },
      {
        q: 'How do I hand a password to a technician in the field?',
        a: 'They retrieve it from the vault on their own device with their own login, which logs it. If the field has no connectivity, they retrieve it before leaving, and the vault entry is rotated on a schedule appropriate to how often it is retrieved. Reading it over the radio or texting it is not a method.',
      },
    ],
    related: [
      '/cybersecurity/passwords-credentials/password-policy-for-ot',
      '/cybersecurity/passwords-credentials/shared-account-problems',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/cybersecurity/backups/what-to-back-up',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/incident-response/ot-incident-response-plan',
    ],
  },
  {
    path: '/cybersecurity/ot-security/security-program-basics',
    kind: 'reference',
    title: 'Security Program Basics',
    summary:
      'What a control system security program is for a utility that has never had one: a named owner, an inventory, a risk assessment, a few policies, baseline controls, training, vendor rules, an exercised incident plan, and a first-year plan for a small staff.',
    answer:
      'A security program is not a product; it is a set of decisions and habits with a named owner. It starts with knowing what the utility has, an asset inventory, and what could go wrong, a risk assessment, and turns those into a few written policies for remote access, change management, backups, accounts, and incident response. It puts in place a baseline of controls that defeat the common attacks: segmentation with a firewall between the office and the plant, multi-factor authentication on remote access, no default or shared credentials, tested offline backups, logging, and patching. It trains staff, sets rules for vendors, writes and exercises an incident plan, and reviews itself every year against a framework such as the NIST Cybersecurity Framework, the sector performance goals published by the federal cybersecurity agency, or the IEC 62443 series, and against the water sector requirements such as the America\'s Water Infrastructure Act assessments.',
    keyPoints: [
      'A program is ownership, decisions, and habits; buy products for the gaps it identifies, not instead of it.',
      'Inventory and risk assessment first; you cannot protect what you have not listed or prioritize what you have not weighed.',
      'Five policies cover most of it: remote access, change management, backups, accounts, incident response.',
      'The baseline controls stop most attacks: segmentation, multi-factor remote access, no default or shared credentials, offline backups, logging, patching.',
      'Exercise the incident plan on a tabletop; a plan that has never been walked through is a document.',
      'An annual cycle: measure against a framework, fix the worst gaps, report to management, repeat.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Cybersecurity', 'Standards', 'Water', 'Documentation', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'What a program is' },
      {
        t: 'p',
        text: 'Utilities that have had an incident describe the same gaps afterward: nobody owned security, nobody knew what was connected, the backups were on the same network as the ransomware, the vendor had a permanent remote connection, and the plan for running the plant by hand existed only in the memory of an operator who had retired. A security program is the arrangement that closes those gaps and keeps them closed. It is small at a small utility, larger at a large one, and it is always the same shape: someone in charge, a picture of the system, a judgment about what matters most, a few rules everyone follows, controls that make the common attacks fail, people who know what to do, and a review that keeps it honest.',
      },
      { t: 'h2', text: 'The elements' },
      {
        t: 'table',
        head: ['Element', 'What it is', 'Minimum at a small utility'],
        rows: [
          ['Owner', 'A named person responsible for control system security, with the authority to decide and the ear of management', 'The operations manager or the control engineer, formally named'],
          ['Asset inventory', 'Every controller, computer, network device, radio, and connection, with what it is and where', 'A spreadsheet built by walking the sites, kept current'],
          ['Risk assessment', 'What could go wrong, how bad, how likely, ranked', 'A consequence-first list of a dozen scenarios, ranked, with owners'],
          ['Policies', 'Written rules for remote access, change management, backups, accounts, and incident response', 'One page each, approved by management'],
          ['Baseline controls', 'The technical measures that defeat the common attacks', 'The list in the next section, in priority order'],
          ['Training', 'Staff know the rules and the reasons; operators know the signs of an incident', 'An hour a year, plus a briefing at every change'],
          ['Vendor management', 'Rules for integrators and vendors: accounts, remote access, software, project files', 'A clause in every contract and a checklist at every engagement'],
          ['Incident response', 'A plan for the day the system is not trusted, and a manual operation procedure', 'A written plan, an exercise a year'],
          ['Review', 'An annual measurement against a framework, a report to management, and a plan for the year', 'A half-day with the framework checklist'],
        ],
      },
      { t: 'h2', text: 'The baseline controls' },
      {
        t: 'ul',
        items: [
          'Segmentation: a firewall between the office and the control network, with rules that allow only what is needed, and a DMZ for anything shared.',
          'Remote access: through a jump host with multi-factor authentication, individual accounts, sessions logged, vendor access enabled per session.',
          'Credentials: no defaults, no shared accounts where the platform supports individuals, unique device passwords in a vault.',
          'Backups: controller programs, SCADA, historian, and configurations backed up on a schedule, with a copy offline, and a restore tested.',
          'Logging: security and application logs from servers, firewalls, and network devices to a collector, reviewed on a schedule.',
          'Patching: a cycle for servers and clients, a firmware process for devices, compensating controls for what cannot be patched.',
          'Hardening: servers and consoles configured to a baseline, unused services removed, allowlisting where practical.',
          'Physical security: locked panels, locked rooms, intrusion alarms at remote sites.',
          'Manual operation: the plant can be run without the SCADA, and the operators have practiced it.',
        ],
      },
      { t: 'h2', text: 'Frameworks and requirements' },
      {
        t: 'table',
        head: ['Reference', 'What it offers', 'How a utility uses it'],
        rows: [
          ['NIST Cybersecurity Framework', 'A structure of functions from governance through recovery, with outcomes to assess against', 'The annual self-assessment and the language for reporting to management'],
          ['Federal cross-sector cybersecurity performance goals', 'A prioritized list of practical controls with cost and impact ratings', 'The starting checklist for the baseline; the water sector version maps them to utilities'],
          ['IEC 62443', 'The industrial automation security standard series: zones and conduits, security levels, requirements for owners, integrators, and products', 'The design reference for segmentation and for what to require of vendors'],
          ['America\'s Water Infrastructure Act', 'Requires community water systems above a size threshold to conduct a risk and resilience assessment and update an emergency response plan on a five-year cycle, including cybersecurity', 'The regulatory driver; the program provides the cybersecurity content'],
          ['Federal environmental agency and sector guidance', 'Checklists, assessment tools, and technical assistance for water utilities', 'Free help, a self-assessment tool, and the expectations a state regulator may inspect against'],
          ['State requirements', 'A growing number of states require cybersecurity assessments or specific controls for water systems', 'Check the state; some require attestation'],
        ],
      },
      { t: 'h2', text: 'A first year' },
      {
        t: 'steps',
        items: [
          { title: 'Quarter one', text: 'Name the owner. Build the inventory by visiting every site. Draw the network as it actually is. Find every remote connection, including the ones nobody remembers.' },
          { title: 'Quarter two', text: 'Run the consequence-first risk assessment. Change every default password. Remove or replace uncontrolled remote access with a jump host and multi-factor authentication. Start the backups and take a copy offline.' },
          { title: 'Quarter three', text: 'Put the firewall between the office and the plant, or fix its rules. Write the five policies. Set up logging to a collector. Start the patch cycle.' },
          { title: 'Quarter four', text: 'Write the incident response plan and the manual operation procedure. Run a tabletop exercise. Assess against the framework checklist, report to management, and plan next year.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Small utilities',
        text: 'The program at a utility with three operators and a part-time engineer is the same shape, done in a day here and a day there, with free tools and help from the state and the sector organizations. What it cannot be is nothing. The attacks that have hit water utilities have hit small ones, through the same shared password and the same permanent vendor connection the program removes in its first quarter.',
      },
    ],
    faqs: [
      {
        q: 'We have an IT security program. Does that cover the control system?',
        a: 'Rarely. Office security assumes patches can be applied at will, machines can be rebooted, and confidentiality matters most; control systems invert all three. The IT program is a resource and a partner; the control system program is owned by operations, uses the frameworks written for industrial systems, and sets its own priorities. The two coordinate at the firewall between them.',
      },
      {
        q: 'What is the first thing to fix?',
        a: 'Whatever gives an attacker on the internet a direct path to the plant: a modem with a public address, a remote desktop port forwarded through the office firewall, a vendor remote tool, a default password on anything reachable. The inventory finds them; removing them is the highest-value day of the year.',
      },
      {
        q: 'How do we show progress to the board?',
        a: 'With the framework assessment: a score or a maturity level per function this year against last year, the top risks and what was done about them, the incidents and exercises, and the plan and budget for next year. One page, once a year, in language a board member understands.',
      },
      {
        q: 'Do we need a consultant?',
        a: 'For the first assessment and for specialized work such as firewall design, often yes, and the state and the sector organizations offer free assistance to small systems. For running the program, no: the owner, the inventory, the policies, and the annual cycle are the utility\'s own work, and a program that only a consultant understands is not the utility\'s program.',
      },
    ],
    related: [
      '/cybersecurity/water-wastewater-cybersecurity/small-utility-priorities',
      '/cybersecurity/ot-security/risk-assessment',
      '/cybersecurity/ot-security/iec-62443',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
      '/cybersecurity/incident-response/ot-incident-response-plan',
      '/cybersecurity/ot-security/ot-vs-it-security',
    ],
  },
];
