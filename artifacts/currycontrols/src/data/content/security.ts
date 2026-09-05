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
];
