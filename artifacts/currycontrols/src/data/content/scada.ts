import type { Entry } from '../content-types';

export const SCADA_ENTRIES: Entry[] = [
  {
    path: '/controls/scada-hmi/scada-fundamentals/what-is-scada',
    kind: 'reference',
    title: 'What Is SCADA?',
    summary:
      'Supervisory control and data acquisition: the layer that collects data from controllers across a system, presents it to operators, records it, and lets them intervene.',
    answer:
      'SCADA stands for supervisory control and data acquisition. It is the software and communication layer that gathers data from PLCs and RTUs spread across a plant or a service area, displays it to operators, records it to a historian, raises alarms, and allows an operator to change setpoints or command equipment. SCADA supervises; the controllers do the actual real-time control.',
    keyPoints: [
      'SCADA supervises and records. The PLC or RTU performs the control.',
      'A plant must be able to run, at least safely, when SCADA is down.',
      'The core pieces are a data server, operator clients, a historian, and an alarm subsystem.',
      'In water and wastewater the communication path to remote sites is usually the hardest part.',
      'Redundancy protects visibility and history, not the control itself.',
    ],
    published: '2026-02-10',
    updated: '2026-08-04',
    readingTime: 9,
    tags: ['SCADA', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'The division of labor' },
      {
        t: 'p',
        text: 'This is the point people get wrong most often, and it has real consequences. The PLC at a lift station starts and stops the pumps. It does that from its own logic, using its own level input, on its own scan. SCADA watches. It shows an operator the wet well level, records it, alarms if it goes high, and lets the operator change a setpoint or take a pump out of service.',
      },
      {
        t: 'p',
        text: 'If the radio path fails, the lift station keeps pumping. The utility loses visibility, alarming, and history, which is serious, but sewage does not back up because a server rebooted. Any design where a communication loss stops the process should be treated as a defect unless there is a specific, documented reason for it.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Control logic in SCADA is a liability',
        text: 'It is tempting to put a pump alternation sequence or a chemical dose calculation in a SCADA script because it is faster to write there. Then the server patches on a Tuesday night and the plant behaves differently. Control belongs in the controller. Supervisory functions that can tolerate an outage belong in SCADA.',
      },
      { t: 'h2', text: 'What a SCADA system is made of' },
      {
        t: 'dl',
        items: [
          { term: 'I/O or data server', def: 'Polls controllers and remote sites, maintains the current value of every tag, and serves those values to everything else. This is the piece that most affects perceived system health.' },
          { term: 'Operator clients', def: 'The displays operators work from, whether a dedicated workstation, a thin client, or a browser session.' },
          { term: 'Historian', def: 'Stores values over time so you can trend last night, compare this month to last, and produce regulatory reports.' },
          { term: 'Alarm subsystem', def: 'Evaluates conditions, maintains alarm state, records acknowledgement, and hands off to notification.' },
          { term: 'Notification', def: 'Callout, SMS, email, or voice for the alarms that need someone at 2 a.m. Often a separate product.' },
          { term: 'Communication front end', def: 'The drivers and hardware that reach controllers over Ethernet, serial, radio, or cellular. In a distributed utility this is where most of the engineering effort goes.' },
        ],
      },
      { t: 'h2', text: 'Tags, quality, and why "bad quality" matters' },
      {
        t: 'p',
        text: 'A SCADA tag carries more than a number. It carries a quality indicator that says whether the value can be trusted, and a timestamp saying when it was last confirmed.',
      },
      {
        t: 'p',
        text: 'This distinction is the difference between a display that misleads and one that tells the truth. When a remote site stops answering, its last known level does not become wrong, it becomes stale. A well-built display shows that value greyed, hatched, or marked, so an operator does not make a decision on a number from forty minutes ago believing it is live.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Frozen values are the classic trap',
        text: 'If a graphic shows a plausible level that has not changed in an hour, check quality before you check the process. A value that is stale but rendered normally has caused more bad operating decisions than almost any other display defect.',
      },
      { t: 'h2', text: 'Architecture in a water or wastewater utility' },
      {
        t: 'p',
        text: 'A typical municipal system has a plant with a substantial local control network and dozens or hundreds of remote sites reached over licensed radio, cellular, or fiber. The plant side looks like a normal industrial network. The remote side is where the interesting constraints live: limited bandwidth, high latency, intermittent paths, and sites you cannot drive to quickly.',
      },
      {
        t: 'ul',
        items: [
          'Poll rates must respect the path. Polling forty radio sites every second will not work and does not help.',
          'Report-by-exception protocols like DNP3 fit constrained links far better than continuous polling.',
          'Timestamping at the remote site preserves event order when a path drops and recovers.',
          'Store-and-forward at the RTU means an outage costs you visibility, not history.',
        ],
      },
      { t: 'h2', text: 'Redundancy: what it does and does not buy' },
      {
        t: 'p',
        text: 'Redundant SCADA servers protect against losing the supervisory layer. They do not make the process more reliable, because the process is not being controlled there. Understanding that keeps the money in the right place: a redundant server pair is worthwhile for a utility that depends on continuous visibility and history, but it is not a substitute for controllers that ride through a communication failure on their own.',
      },
      {
        t: 'p',
        text: 'Redundancy also has to be tested. A failover that has never been exercised is a hypothesis. Schedule a real switchover during a controlled window, watch what happens to alarms, history continuity, and client reconnection, and write down what actually occurred.',
      },
      { t: 'h2', text: 'Terms that overlap' },
      {
        t: 'dl',
        items: [
          { term: 'SCADA', def: 'Supervisory layer over geographically distributed or plant-wide equipment, with emphasis on data acquisition, history, and alarming.' },
          { term: 'HMI', def: 'The operator interface itself. A local HMI panel on a skid is an HMI without being SCADA. SCADA includes HMI as one part.' },
          { term: 'DCS', def: 'Distributed control system. Historically an integrated control and supervisory product for continuous process plants, with control and interface designed together. The functional boundary with a modern PLC-and-SCADA system has narrowed considerably.' },
          { term: 'Historian', def: 'The time-series database. Sometimes bundled with SCADA, sometimes a separate product serving several systems.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does SCADA control the plant?',
        a: 'Not directly. Controllers execute the control logic. SCADA supervises: it displays, records, alarms, and lets an operator adjust setpoints or issue commands that the controller then acts on.',
      },
      {
        q: 'What happens if the SCADA server fails?',
        a: 'In a correctly designed system, the process keeps running on controller logic while you lose visibility, alarming, and history. If equipment stops when SCADA stops, control logic that belongs in the controller is living in the wrong place.',
      },
      {
        q: 'How often should SCADA poll a remote site?',
        a: 'Fast enough that an operator can act on a change, slow enough that the communication path stays healthy. For a lift station on licensed radio, every fifteen to sixty seconds for analog values with immediate reporting of alarms and state changes is typical.',
      },
      {
        q: 'What is the difference between SCADA and a historian?',
        a: 'SCADA maintains current values and operator interaction. A historian stores values over time and answers questions about the past. They are frequently sold together but they solve different problems, and history requirements should be specified separately.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/scada-troubleshooting/frozen-values',
    ],
  },

  {
    path: '/controls/scada-hmi/alarm-management/isa-18-2',
    kind: 'reference',
    title: 'ISA-18.2 Alarm Management',
    summary:
      'The lifecycle standard for alarm systems, the rate targets that define a workable system, and why alarm rationalization is the step nobody wants to fund.',
    answer:
      'ISA-18.2 is the standard for alarm system management in the process industries. It defines an alarm as an audible or visible indication of an abnormal condition that requires a timely operator response, and it lays out a lifecycle from philosophy through identification, rationalization, design, implementation, operation, monitoring, and management of change. Its central premise is that an alarm without a defined operator response is not an alarm.',
    keyPoints: [
      'If there is no action an operator can take, it is information, not an alarm.',
      'Every alarm needs a documented cause, consequence, response, and time available to respond.',
      'A widely cited target is fewer than about 150 alarms per operator per day in steady operation.',
      'Alarm floods during an upset are the failure mode that hurts most, and they are designed in.',
      'Rationalization is the step that produces the benefit, and the step most often skipped.',
    ],
    published: '2026-03-22',
    updated: '2026-08-15',
    readingTime: 10,
    tags: ['SCADA', 'Alarms', 'ISA', 'Standards'],
    blocks: [
      { t: 'h2', text: 'The definition does the heavy lifting' },
      {
        t: 'p',
        text: 'ISA-18.2 defines an alarm as an indication of an abnormal condition requiring a timely operator response. Every word narrows it. Abnormal excludes normal state changes. Requiring a response excludes anything nobody acts on. Timely excludes conditions that can wait for the morning.',
      },
      {
        t: 'p',
        text: 'Apply that test honestly to an existing system and most of the alarm list fails it. A pump running is not abnormal. A valve reaching commanded position is not abnormal. A daily report completing is not an alarm. These belong in event logs and status displays, and moving them there is most of the work of fixing an alarm system.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The real cost of a bad alarm system',
        text: 'Operators do not consciously decide to ignore alarms. Under a constant stream of nuisance annunciations, everyone learns to acknowledge without reading. The system still records that alarms were acknowledged. It just stops functioning as a means of directing attention, and no one notices until the day it mattered.',
      },
      { t: 'h2', text: 'The lifecycle' },
      {
        t: 'steps',
        items: [
          { title: 'Philosophy', text: 'The governing document. Defines what qualifies as an alarm at this facility, how priorities are assigned, what the annunciation and acknowledgement conventions are, and who may change an alarm. Without it, every later decision is arbitrary.' },
          { title: 'Identification', text: 'Collecting candidate alarms from P&IDs, hazard reviews, incident history, and operator experience.' },
          { title: 'Rationalization', text: 'The core step. Each candidate is tested against the philosophy. For those that survive, you document cause, consequence of no action, the specific corrective action, the time available to respond, and the resulting priority.' },
          { title: 'Detailed design', text: 'Setpoints, deadbands, on-delays, priorities, and how the alarm presents on the HMI.' },
          { title: 'Implementation', text: 'Configuration in the controller and SCADA, plus operator training on what changed and why.' },
          { title: 'Operation and maintenance', text: 'Running the system, including shelving and suppression used as designed rather than improvised.' },
          { title: 'Monitoring and assessment', text: 'Measuring alarm rates, finding the bad actors, and reporting. This is what tells you whether any of the earlier work held.' },
          { title: 'Management of change', text: 'A defined path for adding, removing, or retuning an alarm. Without it a rationalized system drifts back within a year or two.' },
        ],
      },
      { t: 'h2', text: 'Rate targets' },
      {
        t: 'p',
        text: 'The commonly used performance targets originate in EEMUA 191 and are referenced in ISA-18.2 practice. They describe a system an operator can actually work with.',
      },
      {
        t: 'table',
        caption: 'Widely used alarm rate targets per operating position',
        head: ['Metric', 'Target', 'Interpretation'],
        rows: [
          ['Average alarms per hour', 'About 6', 'Roughly one every ten minutes in steady operation'],
          ['Average alarms per day', 'About 150 or fewer', 'Manageable across a shift'],
          ['Peak alarms in 10 minutes', '10 or fewer', 'Above this, an operator falls behind'],
          ['Time in flood condition', 'Under 1%', 'A flood is more than 10 alarms in 10 minutes'],
          ['Contribution of top 10 alarms', 'Under 5% of total', 'A higher figure means a handful of bad actors dominate'],
          ['Standing or stale alarms', 'Very few', 'An alarm active for days is furniture, not information'],
        ],
      },
      {
        t: 'p',
        text: 'Measure before you improve. Nearly every system that has never been assessed is dominated by a small number of bad actors, and fixing ten tags often cuts the total rate by more than half. That is the cheapest work available in alarm management.',
      },
      { t: 'h2', text: 'Priority means response, not importance' },
      {
        t: 'p',
        text: 'Priority should be derived from the consequence of no action and the time available to respond. Assigning priority by how important the equipment feels produces a system where every alarm is high priority, which is the same as having no priorities.',
      },
      {
        t: 'table',
        head: ['Priority', 'Typical basis', 'Share of total alarms'],
        rows: [
          ['Critical / Emergency', 'Severe consequence, minutes to respond', 'About 5%'],
          ['High', 'Significant consequence, limited time', 'About 15%'],
          ['Medium', 'Moderate consequence, time available', 'About 80% combined with low'],
          ['Low / Journal', 'Minor or informational, log only', 'Included above'],
        ],
      },
      { t: 'h2', text: 'Techniques that reduce noise' },
      {
        t: 'dl',
        items: [
          { term: 'Deadband', def: 'The alarm clears at a value offset from where it activated, so a measurement sitting on the threshold does not chatter. Set it wider than the normal noise on the signal.' },
          { term: 'On-delay', def: 'The condition must persist before it annunciates. A few seconds removes an enormous number of transient alarms without hiding anything real.' },
          { term: 'State-based suppression', def: 'Alarms that only make sense in a given operating state are suppressed in others. A low discharge pressure alarm on a stopped pump is noise by design.' },
          { term: 'Shelving', def: 'An operator temporarily silences a known nuisance alarm, with an automatic expiry and a visible record. Controlled and reversible, unlike quietly disabling it.' },
          { term: 'First-out and cause grouping', def: 'When one failure produces twenty consequential alarms, present the initiating one prominently rather than all twenty equally.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Suppression is not the same as deletion',
        text: 'Suppression is a designed, documented, state-based behavior with a defined reason. Deleting an alarm because it is annoying removes protection nobody will notice is gone. Every suppression rule should be traceable to a rationalization record.',
      },
      { t: 'h2', text: 'Alarm floods' },
      {
        t: 'p',
        text: 'A flood is more than about ten alarms in ten minutes at one operating position. It typically follows a single event: a power dip, a communication failure, or a plant trip that cascades. The operator most needs clarity at exactly the moment the system provides the least.',
      },
      {
        t: 'p',
        text: 'Floods are designed in, not accidental, and they are addressed at design time. Suppress the consequential alarms that a known initiating event always produces. Group by cause. Give the operator a display that shows the initiating condition rather than a scrolling list. In a distributed utility, a single radio failure producing one hundred and forty communication alarms is a design problem worth a day of engineering.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between an alarm and an event?',
        a: 'An alarm requires a timely operator response. An event is recorded but requires nothing. A pump starting is an event. A pump failing to start when commanded is an alarm.',
      },
      {
        q: 'How many alarms should a system have?',
        a: 'The standard sets rates, not counts. A large plant may have thousands of configured alarms and still be well within rate targets, because most are rarely active. A small plant with forty alarms can be unusable if six of them chatter constantly.',
      },
      {
        q: 'Is ISA-18.2 mandatory?',
        a: 'It is a consensus standard, not a regulation, and it is not generally mandated for municipal water and wastewater. It is widely treated as good practice, and it is often referenced in specifications. Where a regulator or insurer asks how alarms are managed, this is the framework they expect to hear about.',
      },
      {
        q: 'Where do I start on an existing system nobody has ever rationalized?',
        a: 'Measure for thirty days. Rank alarms by frequency. Take the top ten and address each one by fixing the underlying cause, adding a delay or deadband, changing the setpoint, or reclassifying it as an event. That work alone typically removes most of the volume, and it builds the case for funding a full rationalization.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/plc-systems/programming/alarms',
    ],
  },

  {
    path: '/controls/scada-hmi/hmi-design/high-performance-hmi',
    kind: 'reference',
    title: 'High Performance HMI Design',
    summary:
      'Grey backgrounds, reserved color, and displays designed to make abnormal conditions obvious rather than to look impressive in a demo.',
    answer:
      'High performance HMI is a design approach where operator displays are built to make abnormal conditions immediately obvious. Backgrounds are low-contrast grey, process elements are drawn in muted outline, and saturated color is reserved almost entirely for alarms and abnormal states. It is codified in ISA-101 and stands in contrast to the photorealistic, heavily colored graphics that dominated early SCADA.',
    keyPoints: [
      'Color carries meaning. If everything is colored, color means nothing.',
      'Grey backgrounds with muted process elements make an abnormal condition jump out.',
      'Analog values benefit from context: a bar with limits beats a bare number.',
      'Hierarchical displays let an operator move from plant overview to detail predictably.',
      'The test is whether a new operator can identify the abnormal item in a few seconds.',
    ],
    published: '2026-04-02',
    updated: '2026-07-24',
    readingTime: 8,
    tags: ['HMI', 'SCADA', 'ISA', 'Design'],
    blocks: [
      { t: 'h2', text: 'The problem it solves' },
      {
        t: 'p',
        text: 'Early SCADA graphics were built to impress. Three-dimensional tanks, green running pumps, blue pipes with animated flow, red where something was off. In a demonstration this looks like a control system. At 3 a.m. during an upset, an operator has to find the one abnormal item on a screen where everything is already vividly colored, and the search takes far longer than anyone estimates.',
      },
      {
        t: 'p',
        text: 'High performance HMI inverts the design. The normal state is deliberately quiet. Anything that draws the eye is doing so because it needs attention.',
      },
      { t: 'h2', text: 'Core principles' },
      {
        t: 'dl',
        items: [
          { term: 'Low-contrast grey background', def: 'A mid-grey field rather than black or white. It reduces eye strain over a twelve-hour shift and gives both light and dark elements room to stand out.' },
          { term: 'Reserved color', def: 'Saturated color is used almost exclusively for abnormal conditions and alarm priority. Running equipment is a subtle outline change, not a green fill.' },
          { term: 'Depiction over decoration', def: 'Flat, two-dimensional shapes. No bevels, gradients, or photorealistic vessels. They add nothing an operator uses and cost visual bandwidth.' },
          { term: 'Analog context', def: 'A number alone tells you the value. A number with a bar showing the normal operating range and the alarm limits tells you whether to care.' },
          { term: 'Consistent layout', def: 'The same information in the same place on every display. An operator should not have to search for where a pump status lives on this particular screen.' },
          { term: 'Deliberate hierarchy', def: 'Level 1 plant overview, level 2 process area, level 3 equipment detail, level 4 diagnostics. Navigation between them is predictable and always available.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The five-second test',
        text: 'Show an operator display to someone who does not run the plant, put one item into an abnormal state, and ask them to point at it. If it takes longer than about five seconds, the display is doing too much decoration and not enough signaling.',
      },
      { t: 'h2', text: 'A workable color convention' },
      {
        t: 'table',
        head: ['Meaning', 'Treatment', 'Notes'],
        rows: [
          ['Normal running', 'Dark outline, light fill, no saturated color', 'Status is legible without being loud'],
          ['Normal stopped', 'Same shape, lighter fill or hatched', 'Distinguishable at a glance without color'],
          ['Critical alarm', 'Saturated red, usually with a shape indicator', 'Reserved exclusively for this'],
          ['High priority alarm', 'Saturated amber or orange', 'Reserved exclusively for this'],
          ['Low priority alarm', 'Yellow, lower emphasis', 'Reserved exclusively for this'],
          ['Bad or stale data', 'Hatching, greying, or an explicit marker', 'Must never look like a live value'],
          ['Operator command in progress', 'Brief distinct treatment', 'Confirms the system heard the command'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Do not rely on color alone',
        text: 'Roughly one in twelve men has some form of color vision deficiency, and red-green confusion is the most common. Pair every color-coded state with a shape, a symbol, a border, or text. This is both an accessibility requirement and better design for everyone at 3 a.m.',
      },
      { t: 'h2', text: 'Displays for a water utility' },
      {
        t: 'p',
        text: 'A municipal utility has a specific shape of problem: many similar remote sites, a plant, and a small number of operators covering all of it.',
      },
      {
        t: 'ul',
        items: [
          'Build one standard lift station display and reuse it for every station. Operators learn one layout instead of sixty.',
          'The overview should answer the only question that matters on a callout: which sites are in trouble right now.',
          'Show communication health explicitly. A station that has not reported is a different problem from a station reporting a high level.',
          'Put pump run hours and start counts where they are visible. This is how maintenance planning actually happens.',
          'Trend wet well level directly on the station display. The shape of the last few hours tells an experienced operator more than any single number.',
        ],
      },
      { t: 'h2', text: 'Retrofitting an existing system' },
      {
        t: 'p',
        text: 'Rebuilding every graphic at once is rarely fundable, and it disorients operators. A staged approach works better.',
      },
      {
        t: 'ol',
        items: [
          'Write a short style guide first, even one page. Without it, the second display will not match the first.',
          'Fix color misuse before layout. Removing saturated color from normal states is the highest-value change and the cheapest.',
          'Add analog context to the values operators actually watch, starting with levels and pressures.',
          'Build a genuine overview display if none exists. Most systems do not have one.',
          'Convert area displays one at a time, with operator review at each step.',
          'Involve the people who run the plant at night, not only the day shift. They see different problems.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is ISA-101 required?',
        a: 'No. It is a consensus standard describing a lifecycle for HMI design. It is often cited in specifications and is treated as good practice, but it is not a regulation for municipal water and wastewater.',
      },
      {
        q: 'Will operators accept grey screens?',
        a: 'Usually yes, once they have worked a shift on them, and the objection almost always comes before the trial rather than after. Involving operators in the design and converting one area first makes the difference between adoption and resistance.',
      },
      {
        q: 'Should running pumps be green?',
        a: 'Under this approach, no. Green fill on every running pump spends your most attention-grabbing resource on the most common and least interesting state. Use a subtle outline or fill difference for running, and keep saturated color for conditions that need action.',
      },
      {
        q: 'How many displays should a system have?',
        a: 'As few as will cover the plant with a clear hierarchy. Large numbers of near-duplicate displays are a symptom of missing reusable templates, and they multiply the cost of every future change.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/scada-hmi/hmi-design/situational-awareness',
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/hmi-design/faceplates',
    ],
  },
  {
    path: '/controls/scada-hmi/hmi-design/isa-101',
    kind: 'reference',
    title: 'ISA-101: Human Machine Interfaces',
    summary:
      'What the ISA-101 standard for human machine interfaces covers, its lifecycle from philosophy to maintenance, the display hierarchy, and what adopting it changes on a project.',
    answer:
      'ISA-101, formally ANSI/ISA-101.01, is the standard for human machine interfaces in process automation. It does not prescribe how a screen should look. It prescribes a lifecycle: write an HMI philosophy, derive a style guide and a toolkit from it, design displays in a hierarchy against that guide, and manage changes to all of it. The result is an HMI that is consistent, that supports situational awareness, and that can be tested against a document rather than an opinion.',
    keyPoints: [
      'ISA-101 is a lifecycle and management standard, not a style sheet; the style comes from the philosophy the owner writes.',
      'Philosophy, style guide, and toolkit are the three documents everything else is built from and tested against.',
      'Displays are organized in a hierarchy: overview, unit, detail, and diagnostic, each with a defined purpose.',
      'Color is reserved for abnormal conditions; the normal state is quiet, which is what makes the abnormal visible.',
      'Management of change applies to the HMI the same way it applies to the process, because an inconsistent screen is a hazard.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['SCADA', 'HMI', 'ISA', 'Standards', 'Design'],
    blocks: [
      { t: 'h2', text: 'What the standard is' },
      {
        t: 'p',
        text: 'ANSI/ISA-101.01, Human Machine Interfaces for Process Automation Systems, was published in 2015 by the International Society of Automation. It grew out of decades of incident investigations in which the operator interface was a contributing cause: alarms buried in color, critical values indistinguishable from routine ones, screens that differed from unit to unit so that an operator moving between them had to relearn the conventions. The standard is the process industry answer to that history.',
      },
      {
        t: 'p',
        text: 'It is deliberately not a style guide. It does not say that a pump must be a certain shape or that a running motor must be green. It says that the owner must decide those things, write them down, apply them everywhere, and control changes to them. The design guidance it does give, on hierarchy, on the use of color, on what an overview display is for, is guidance toward writing that document well.',
      },
      { t: 'h2', text: 'The lifecycle' },
      {
        t: 'p',
        text: 'The standard organizes HMI work into stages, each producing something the next stage uses.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Philosophy.', text: 'The owner states the principles: what the HMI is for, who uses it, how abnormal situations are shown, how alarms are presented, what the display hierarchy is. This is a short document with a long life; it outlasts any one project and any one platform.' },
          { title: 'Style guide.', text: 'The philosophy made specific: the colors and what each means, the fonts, the symbols, the layout grid, the navigation model, the way a value is shown with its units and limits. Everything a designer needs to build a screen that looks like every other screen.' },
          { title: 'Toolkit.', text: 'The style guide made reusable: the library of faceplates, symbols, and templates in the actual SCADA platform, built once and used on every display so that consistency is automatic rather than disciplined.' },
          { title: 'Design.', text: 'The displays for a specific system, built from the toolkit, organized in the hierarchy, and reviewed against the style guide and against the operating tasks they support.' },
          { title: 'Implementation and testing.', text: 'The displays are built, and they are tested against the design and the style guide, with operators, before they go into service.' },
          { title: 'Operation and maintenance.', text: 'The HMI is used, and every change to it goes through management of change so that the consistency that was designed in is not eroded one screen at a time.' },
        ],
      },
      { t: 'h2', text: 'The display hierarchy' },
      {
        t: 'p',
        text: 'The standard describes displays in levels, each answering a different question for the operator. The levels are the part of ISA-101 most people have heard of, and they are the part most often implemented without the philosophy behind them.',
      },
      {
        t: 'table',
        caption: 'Display levels and what each is for',
        head: ['Level', 'Name', 'Question it answers', 'What is on it'],
        rows: [
          ['1', 'Overview', 'Is the whole plant, or my area of it, all right?', 'Key performance values, abnormal indications, and nothing that is fine. Designed to be glanced at.'],
          ['2', 'Unit or process', 'What is this unit doing and what needs attention?', 'The process at working detail: values, states, trends, and the controls used routinely.'],
          ['3', 'Detail', 'What exactly is happening with this equipment or loop?', 'A single loop, drive, or piece of equipment with every parameter and control.'],
          ['4', 'Diagnostic', 'Why is it doing that?', 'Interlock status, first-out indication, device diagnostics, and communication health.'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The overview is the hardest display to design and the one most often skipped',
        text: 'An overview that shows everything is a level 2 display with small fonts. A real overview shows what an operator needs to know that something needs attention, and leaves the rest to the level below. Deciding what to leave off is the design work.',
      },
      { t: 'h2', text: 'What it changes on a project' },
      {
        t: 'p',
        text: 'Adopting the standard moves decisions earlier and moves them to the owner. On a project run without it, the integrator builds screens in whatever style the platform defaults to and the owner reacts to them at FAT. On a project run with it, the owner has a philosophy and a style guide before the integrator starts, the integrator builds the toolkit or uses the owner’s existing one, and FAT compares the displays to a document. Arguments about color happen once, in the style guide, instead of on every screen.',
      },
      {
        t: 'dl',
        items: [
          { term: 'For the owner', def: 'A style guide is an asset that carries across projects and vendors. Every new screen looks like the existing ones, and a new operator learns one set of conventions.' },
          { term: 'For the integrator', def: 'A clear acceptance criterion. A display either matches the guide or it does not. The toolkit also makes screen development faster after the first project.' },
          { term: 'For the operator', def: 'Consistency and a quiet normal state, so that the abnormal stands out and the same thing means the same thing on every display.' },
        ],
      },
      { t: 'h2', text: 'Relation to high performance HMI and ISA-18.2' },
      {
        t: 'p',
        text: 'High performance HMI is a design approach, documented by several authors and consultancies, built on the same principles the standard codifies: a gray normal state, color reserved for abnormal, analog indication of values against their ranges, and a strict hierarchy. ISA-101 is the standard that makes those principles auditable through the lifecycle and the documents. A high performance HMI style guide is one legitimate answer to the philosophy the standard asks for.',
      },
      {
        t: 'p',
        text: 'ISA-18.2 covers alarm management and the two are written to work together. The alarm philosophy under 18.2 and the HMI philosophy under 101 are companion documents, and how alarms are presented on the displays is where they meet.',
      },
      { t: 'h2', text: 'Starting without a philosophy' },
      {
        t: 'p',
        text: 'Most utilities and plants do not have an HMI philosophy, and the first project that adopts the standard has to write one. It does not need to be long. A few pages that settle the purpose of the HMI, the display hierarchy, the meaning of color, the treatment of alarms, and the rules for change will carry a style guide. Writing it before the screens exist is the whole point; writing it afterward describes what was built rather than what was intended.',
      },
    ],
    faqs: [
      {
        q: 'Does ISA-101 require gray screens?',
        a: 'No. It requires the owner to decide how normal and abnormal states are shown and to apply that consistently. The gray background with color reserved for abnormal conditions is the common answer because it works, but the standard prescribes the decision, not the color.',
      },
      {
        q: 'Is ISA-101 mandatory?',
        a: 'It is a consensus standard, not a regulation. It becomes mandatory on a project when the owner specifies it, which is increasingly common in water, wastewater, and process specifications.',
      },
      {
        q: 'What is an HMI philosophy document?',
        a: 'The short document, owned by the plant or utility, that states the principles the HMI is built on: purpose, users, hierarchy, use of color, alarm presentation, and change control. The style guide and the toolkit are derived from it.',
      },
      {
        q: 'How does ISA-101 relate to ISA-18.2?',
        a: 'ISA-18.2 covers alarm management and ISA-101 covers the interface. They share the lifecycle model and are meant to be applied together; how alarms appear on the displays is where the two philosophies meet.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/scada-fundamentals/what-is-scada',
      '/engineering-library/standards/isa',
    ],
  },
  {
    path: '/controls/scada-hmi/scada-fundamentals/scada-architecture',
    kind: 'reference',
    title: 'SCADA Architecture',
    summary:
      'The parts of a SCADA system and how data moves between them: I/O servers, the tag database, clients, the historian, the alarm server, and the topologies from a single panel PC to a redundant, distributed plant.',
    answer:
      'A SCADA system is a set of services with data flowing between them. I/O servers poll the controllers through drivers and fill a real-time tag database; the alarm server watches the tags against limits; the historian records them; and clients present displays that read the tags and write commands back. Those services can all run on one machine at a small site or be split across redundant servers and thin clients at a plant, and the architecture is chosen from how much the site can afford to lose when something fails.',
    keyPoints: [
      'Every SCADA platform has the same five jobs: talk to controllers, hold live tags, alarm, historize, and display; the differences are in how they are packaged.',
      'Data flows controller to driver to tag database to client; a fault at any hop looks like frozen values downstream.',
      'A single machine is fine until it is the only copy of the configuration and the history.',
      'Clients should hold no configuration of their own; a display that works only on one machine is a liability.',
      'Where the servers sit on the network, and what can reach them from outside, is a security architecture decision as much as a SCADA one.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'Design', 'Networking', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'The services' },
      {
        t: 'dl',
        items: [
          { term: 'I/O server, or driver host', def: 'Runs the protocol drivers that talk to controllers, RTUs, drives, and meters over Ethernet, serial, and radio. It polls on scan groups, or receives unsolicited data on protocols that support it, and writes the results into the tag database. It is where communication diagnostics live.' },
          { term: 'Tag database, or runtime', def: 'The real-time image of the plant: every tag with its value, quality, and timestamp. Everything else reads from it and writes to it. It also runs scripts, calculations, and derived tags.' },
          { term: 'Alarm server', def: 'Evaluates tags against limits and states, manages alarm state and acknowledgment, applies priorities, shelving, and suppression, and feeds the alarm displays and the notification system.' },
          { term: 'Historian', def: 'Stores tag values over time, compressed, and answers queries for trends and reports. On small systems it is a module of the runtime; on large ones a separate product on its own server.' },
          { term: 'Clients', def: 'The displays. Thick clients run the display engine locally and connect to the servers; thin and web clients render displays served from a server in a browser or a lightweight viewer. Operators, engineers, and managers get different clients with different permissions.' },
          { term: 'Supporting services', def: 'Reporting, notification by phone or text, remote access gateways, and integrations to maintenance, billing, or laboratory systems.' },
        ],
      },
      { t: 'h2', text: 'The data path' },
      {
        t: 'p',
        text: 'A level in a wet well becomes a number on an operator screen by a chain of steps, and knowing the chain is most of troubleshooting. The transmitter drives 4 to 20 mA into the controller input. The controller scales it and holds it in a tag. The I/O server polls the controller on its scan interval and writes the value, with a quality and a timestamp, into the tag database. The alarm server compares it against the high level limit. The historian stores it when it changes by more than its deadband. The client subscribes to the tag and paints it. A frozen value on the screen is a failure at one of those hops, and each hop has its own diagnostics.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Polling is the default and it is not free',
        text: 'An I/O server polling a hundred controllers every second over a shared radio channel is asking for a hundred replies a second on a channel that carries a few. Scan intervals are set per group of tags from how fast each needs to update, and protocols with unsolicited reporting, DNP3 above all, exist so that the remote sites can speak when something changes instead of being asked constantly.',
      },
      { t: 'h2', text: 'Topologies' },
      {
        t: 'table',
        caption: 'From one machine to a plant',
        head: ['Topology', 'What runs where', 'Suits', 'What it loses when it fails'],
        rows: [
          ['Standalone', 'Every service and the client on one PC, often a panel PC in the control room', 'A single station or a small plant', 'Everything: control view, alarms, and history, until the PC is rebuilt'],
          ['Server and clients', 'Services on one server; clients on operator workstations and remote PCs', 'A plant with several operator positions', 'The server is still a single point of failure, but clients can be replaced in minutes'],
          ['Redundant servers', 'Two servers, one active and one standby, synchronizing tags, alarms, and history; clients fail over automatically', 'A plant that cannot be blind for an hour', 'Very little, if failover is tested; the redundancy page covers what it does not cover'],
          ['Distributed', 'I/O servers at remote sites or plants, a central runtime and historian, clients everywhere', 'A utility with several plants and many remote sites', 'A site keeps polling locally when the link to the center is down, and catches up after'],
        ],
      },
      { t: 'h2', text: 'Clients' },
      {
        t: 'p',
        text: 'A client should be interchangeable. Any client, on any machine, with the right credentials, shows the same displays from the same server, and replacing a failed operator workstation is a matter of installing the client and pointing it at the server. The failure mode to design out is the workstation that has displays, scripts, or driver configuration of its own that exist nowhere else. Thin and web clients make this natural; thick clients need the discipline of keeping every display on the server and deploying from there.',
      },
      { t: 'h2', text: 'Where it sits on the network' },
      {
        t: 'p',
        text: 'The SCADA servers talk to the controllers on the control network and to clients, the historian, and the enterprise on networks above it. In the Purdue model they sit at level 2 and 3, with a firewall between them and the controllers below and a demilitarized zone between them and the business network above. Remote access, for an on-call operator or a vendor, comes in through that DMZ, never straight to the servers. Anything that can reach the SCADA server can, in most platforms, write to any controller it is connected to, so the network around it is part of the design and the cybersecurity section covers it.',
      },
      { t: 'h2', text: 'Virtualization and time' },
      {
        t: 'p',
        text: 'Modern SCADA servers are usually virtual machines on a host in a rack, which makes redundancy, backup, and rebuilding far easier than on a dedicated PC in a panel. It also means the host, its storage, and its network are now part of the control system and have to be maintained as such. Time synchronization across everything, servers, clients, controllers, and RTUs, from one reliable source, is the small architectural detail that decides whether the alarm log and the historian agree about when something happened.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between SCADA and HMI?',
        a: 'The HMI is the display the operator uses. SCADA is the whole system behind it: communication with the controllers, the live tag database, alarming, and history, of which the HMI is the visible part. A panel touchscreen is an HMI; a plant control room runs SCADA.',
      },
      {
        q: 'Do I need a separate historian?',
        a: 'A small system does fine with the historian built into the SCADA platform. A plant that keeps years of high-resolution data, serves it to reports and analytics, and cannot afford to lose it wants a dedicated historian on its own server with its own backup.',
      },
      {
        q: 'Should clients be thick or thin?',
        a: 'Thin and web clients keep every display on the server and make workstations interchangeable, which is what you want. Thick clients are needed where a platform requires them or where local performance matters, and then the displays still belong on the server.',
      },
      {
        q: 'Can the SCADA server be a virtual machine?',
        a: 'Yes, and it usually should be. Snapshots, backups, and failover are all easier. The host and its storage become part of the control system and need the same care and the same network placement.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/what-is-scada',
      '/controls/scada-hmi/scada-fundamentals/historians',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
      '/cybersecurity/ot-security/purdue-model',
      '/troubleshooting/scada-troubleshooting/values-frozen-on-screen',
    ],
  },
  {
    path: '/controls/scada-hmi/scada-fundamentals/historians',
    kind: 'reference',
    title: 'Historians',
    summary:
      'What a process historian does that a database does not, how data gets into it, how compression and retrieval work, how to size and keep it, and the settings that quietly throw data away.',
    answer:
      'A historian is a time-series store built for process data: millions of values per day, written continuously, read back as trends and aggregates over any period. It collects from the SCADA tag database or straight from controllers, compresses each tag with a deadband so that noise is not stored, and answers queries by interpolating or aggregating between the samples it kept. The two decisions that matter are what to collect and how hard to compress, and both are easy to get wrong in the direction of losing detail nobody can get back.',
    keyPoints: [
      'A historian stores changes, not samples: a value is written when it moves more than its deadband, and a flat line costs almost nothing.',
      'What is not collected is gone forever; collect more than seems necessary and compress it sensibly.',
      'Compression deadbands set too wide turn a real oscillation into a straight line in the record.',
      'Retrieval interpolates between stored points; a trend is a reconstruction, and the raw points are the truth.',
      'Back it up, keep it on its own storage, and decide how long data lives before the disk decides for you.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['SCADA', 'Design', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'Why not a database' },
      {
        t: 'p',
        text: 'A relational database stores rows and is designed for transactions. A plant produces a value for every tag every second, ten thousand tags, forever, and the questions asked of the data are about time: what did this look like last Tuesday, what was the average over the shift, when did it first exceed the limit. A historian is a store optimized for that: append-only writes, compression designed for signals, indexes by time, and retrieval that understands interpolation and aggregation. Most also present the data through SQL for the tools that expect it, which is the subject of the SQL integration page.',
      },
      { t: 'h2', text: 'Getting data in' },
      {
        t: 'dl',
        items: [
          { term: 'From the SCADA tag database', def: 'The usual path. The historian subscribes to tags in the runtime and records them as they change. Simple, and it means the historian sees what SCADA sees, including its scan intervals and its outages.' },
          { term: 'Directly from controllers', def: 'A collector reads the controllers itself, by OPC UA or a native driver. It survives a SCADA outage, it can run faster than the SCADA scan, and it is a second load on the controller communications.' },
          { term: 'Store and forward', def: 'A collector at a remote site buffers data when the link to the central historian is down and sends it when the link returns, so that the record has no gap. On any site connected over radio or cellular this is the feature that decides whether the history is trustworthy.' },
          { term: 'Manual and laboratory data', def: 'Values entered by hand, from a lab result or a meter reading, with the time they apply to. A historian that accepts these lets the plant keep one record instead of a spreadsheet beside it.' },
        ],
      },
      { t: 'h2', text: 'Compression' },
      {
        t: 'p',
        text: 'A historian that stored every value of every tag every second would fill any disk. Instead each tag has a deadband: a new value is stored only when it differs from the last stored value by more than the deadband, with a maximum interval so that a stable value is still written occasionally. More sophisticated schemes store a point only when the signal leaves a corridor projected from the last stored points, which reconstructs a slope from two points instead of twenty. Either way the principle is the same: store what changed, reconstruct the rest.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Compression is the setting that destroys evidence',
        text: 'A pressure that oscillates plus or minus 2 psi around setpoint is a hunting control loop. With a compression deadband of 3 psi it is recorded as a flat line, and the loop tuning problem is invisible in the history that was meant to reveal it. Set the deadband below the smallest real movement that matters, per tag, and revisit it when a trend looks too smooth to be true.',
      },
      { t: 'h2', text: 'Getting data out' },
      {
        t: 'p',
        text: 'A trend over a week of a tag stored on change has points at irregular intervals. The historian answers a request for evenly spaced values by interpolating between stored points, and answers a request for an average, a minimum, or a total by aggregating them with time weighting. That is fine and it is fast, and it is worth knowing that a trend drawn at one-minute resolution from data compressed at ten minutes is a reconstruction that never saw the minutes between. When the question is what exactly happened at 03:14, ask for the raw stored values, not the interpolated ones.',
      },
      { t: 'h2', text: 'What to collect' },
      {
        t: 'ul',
        items: [
          'Every analog measurement, every setpoint, every controller output, and every equipment run status, at a deadband suited to each.',
          'Every alarm and every operator action, with timestamps, in the event record beside the values.',
          'Communication status per controller, so that gaps in the data can be told apart from flat process.',
          'Calculated values that a report will need, such as daily totals, computed once and stored rather than recomputed from raw data each time.',
          'More than seems necessary. Storage is cheap; a value that was not collected during the event nobody predicted is expensive.',
        ],
      },
      { t: 'h2', text: 'Keeping it' },
      {
        t: 'p',
        text: 'The historian lives on its own storage with its own backup, because it is the record of the plant and, for a utility, part of the regulatory record. Retention is decided in advance: full resolution for a period, aggregated beyond it, or full resolution forever if the storage allows, which it increasingly does. Clock synchronization across every source is what makes the timestamps mean anything; a controller five minutes fast produces a history in which effects precede their causes. And someone owns it: tags added to SCADA are added to the historian, deadbands are reviewed, and the backup is tested by restoring it.',
      },
    ],
    faqs: [
      {
        q: 'How much data does a historian store?',
        a: 'Far less than the raw rate suggests, because it stores changes. A stable tag might store a few points an hour; a noisy one a few a second. Ten thousand tags at typical plant rates come to a few gigabytes a year on most platforms, which is why full-resolution retention for many years is now normal.',
      },
      {
        q: 'Why does my trend look smoother than the live value?',
        a: 'Compression. The historian stored only values that moved more than the deadband, and the trend interpolates between them. If detail that matters is missing, the deadband on that tag is too wide.',
      },
      {
        q: 'Should the historian collect from SCADA or from the PLCs directly?',
        a: 'From SCADA is simpler and adequate for most sites. Direct collection survives a SCADA outage and can run faster, at the cost of a second polling load on the controllers. Large plants often do both for different tags.',
      },
      {
        q: 'What is store and forward?',
        a: 'A collector at a remote site buffering data while the link to the central historian is down, then sending it when the link returns, so the history has no gap. Essential on radio and cellular sites.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
      '/controls/scada-hmi/historian-data/compression',
      '/controls/scada-hmi/historian-data/trending',
      '/calculators/historian-storage',
      '/troubleshooting/scada-troubleshooting/trend-gaps',
    ],
  },
  {
    path: '/controls/scada-hmi/scada-fundamentals/redundancy',
    kind: 'reference',
    title: 'SCADA Redundancy',
    summary:
      'What redundant SCADA servers protect against and what they do not, how failover works for tags, alarms, history, and clients, the network and controller layers beneath it, and why an untested failover is not redundancy.',
    answer:
      'Redundancy is a second copy of a service that takes over when the first fails: a standby SCADA server synchronized with the active one, a second I/O server polling the same controllers, dual network paths, and sometimes a second controller. It protects against hardware failure and lets maintenance happen without a blind plant. It does not protect against a bad configuration, a bad network design, or an operator error, all of which replicate to the standby faithfully. A failover that has never been tested under load has not been shown to work.',
    keyPoints: [
      'Server redundancy synchronizes tags, alarm states, and history so a client sees no difference when the standby takes over.',
      'Clients must fail over automatically, and the operator should see a status change, not a blank screen.',
      'History collected during the switch is the part most often lost; store and forward and historian merging cover it.',
      'The network under the servers needs its own redundancy or the servers fail together.',
      'Test failover on a schedule, under normal load, and read the alarm and history record afterward for gaps.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['SCADA', 'Design', 'Networking'],
    blocks: [
      { t: 'h2', text: 'What can be made redundant' },
      {
        t: 'dl',
        items: [
          { term: 'SCADA servers', def: 'A pair, primary and standby, running the same configuration. The primary serves clients and polls controllers; the standby mirrors tags, alarm states, and acknowledgments, and takes over when the primary stops answering. Some platforms run both active with clients balanced between them.' },
          { term: 'I/O servers', def: 'Two driver hosts polling the same controllers, one active and one watching, or both polling with the runtime taking whichever answers. This protects the communication path independently of the runtime.' },
          { term: 'Historians', def: 'A pair collecting in parallel, or one collecting with a mirrored copy, with a merge process that fills gaps in one from the other after an outage.' },
          { term: 'Networks', def: 'Dual network cards on each server, dual switches, and a ring or redundant-path protocol on the control network, so that a cable or a switch failure does not isolate a server that is otherwise healthy.' },
          { term: 'Controllers', def: 'Redundant processors, covered on the PLC architecture page. The SCADA servers see one controller address and the controllers handle the switch between themselves.' },
        ],
      },
      { t: 'h2', text: 'How failover happens' },
      {
        t: 'p',
        text: 'The standby watches the primary with a heartbeat. When the heartbeat stops for longer than a configured time, the standby declares itself active, starts polling the controllers, starts serving clients, and starts writing history. Clients that were connected to the primary detect the loss and reconnect to the standby, which takes a few seconds and should show the operator a status change rather than a frozen or blank display. When the primary returns, it either resumes as primary, which means a second switch, or becomes the standby, which most sites prefer.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Both servers active at once is worse than neither',
        text: 'If the heartbeat path fails while both servers are healthy, each may decide the other is dead and both become active, polling the controllers twice, serving different clients different states, and writing conflicting history. The heartbeat needs its own path, ideally a direct cable between the servers as well as the network, and the platform’s rules for resolving the split have to be understood and configured.',
      },
      { t: 'h2', text: 'What gets lost' },
      {
        t: 'table',
        caption: 'The gaps a failover can leave',
        head: ['What', 'Risk during the switch', 'Protection'],
        rows: [
          ['Live tag values', 'A few seconds of no updates', 'Clients show stale quality briefly; acceptable'],
          ['Alarm states and acknowledgments', 'An alarm that occurred during the switch, or an acknowledgment that did not replicate', 'Alarm synchronization between servers, and controllers that latch alarms until acknowledged'],
          ['History', 'Values that occurred while neither server was collecting', 'Store and forward at the collectors, historian merging afterward'],
          ['Operator writes', 'A setpoint written to the primary as it died', 'The client confirms the write from the controller, not from the server'],
          ['Scripts and calculations', 'A script mid-execution on the failed server', 'Scripts written to be restartable and idempotent'],
        ],
      },
      { t: 'h2', text: 'What redundancy does not protect' },
      {
        t: 'ul',
        items: [
          'A wrong configuration. The standby has the same displays, the same tag mistakes, and the same alarm limits. Redundancy replicates errors perfectly.',
          'A network that both servers share. A broadcast storm, a duplicate address, or a failed core switch takes both.',
          'A power supply both servers share. Separate circuits and separate UPSs, or the redundancy is theoretical.',
          'A physical event. Two servers in the same rack in the same room flood, burn, and lose air conditioning together.',
          'An intrusion. An attacker on the network reaches both servers, and a ransomware event encrypts both.',
        ],
      },
      { t: 'h2', text: 'Testing' },
      {
        t: 'p',
        text: 'A redundant pair that has never failed over is a pair with an unknown failover. Pull the network cable from the primary during a normal shift, with a person watching each client, and time how long until every client is back. Then read the alarm log and the historian for the period and look for the gap. Then fail back. Do it on a schedule, after every configuration change to the pair, and after every platform update. Most redundancy failures are discovered during the outage that the redundancy was bought for, because nobody had tried it since commissioning.',
      },
      { t: 'h2', text: 'Is it worth it' },
      {
        t: 'p',
        text: 'A redundant pair roughly doubles the server licensing, the hardware, and the configuration effort, and it adds the synchronization and the testing as permanent tasks. For a plant where a blind hour means an overflow, a permit violation, or a safety event, it is cheap. For a small system with a good backup and a spare PC that can be restored in an hour, the backup and the spare may be the better investment. The question is what an outage costs, not whether redundancy is available.',
      },
    ],
    faqs: [
      {
        q: 'How long does a SCADA failover take?',
        a: 'Typically a few seconds to a few tens of seconds, set by the heartbeat timeout and the client reconnection time. During it, clients show stale values and then reconnect. The time is configurable and it is a trade against false failovers on a busy network.',
      },
      {
        q: 'Does redundancy protect against ransomware?',
        a: 'No. Both servers are on the same network and are encrypted together. Offline backups, network segmentation, and access control protect against that; redundancy protects against hardware failure.',
      },
      {
        q: 'Do I need redundant I/O servers as well as redundant SCADA servers?',
        a: 'If the drivers run on the SCADA servers, the pair already covers them. If the I/O servers are separate machines, they need their own pair or the communication path is a single point of failure behind a redundant runtime.',
      },
      {
        q: 'How often should failover be tested?',
        a: 'On a schedule, quarterly or better, and after every change to the pair or the platform. A test under normal load with a person watching each client, followed by a check of the alarm log and historian for gaps.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
      '/controls/scada-hmi/scada-fundamentals/historians',
      '/controls/plc-systems/plc-fundamentals/plc-architecture',
      '/troubleshooting/scada-troubleshooting/client-cannot-connect',
      '/cybersecurity/ot-security/purdue-model',
    ],
  },
  {
    path: '/controls/scada-hmi/alarm-management/alarm-philosophy',
    kind: 'reference',
    title: 'The Alarm Philosophy',
    summary:
      'The document that decides what is allowed to be an alarm: the definition, the criteria, the priorities and their meaning, the performance targets, the handling rules, and who owns it. Under ISA-18.2 it comes first.',
    answer:
      'An alarm philosophy is the short document a plant writes before rationalizing, configuring, or auditing any alarm. It states what an alarm is, an abnormal condition that requires an operator to act, and what is not, states the criteria a condition must meet, defines the priorities and how they are assigned from consequence and time to respond, sets the performance targets the system will be measured against, and lays out the rules for shelving, suppression, and change. Everything else in alarm management is checked against it.',
    keyPoints: [
      'An alarm requires operator action. A condition with no action is a status, an event, or a log entry, not an alarm.',
      'Priority is assigned from consequence and time to respond, using a matrix in the philosophy, not from how loud someone argued for it.',
      'The philosophy sets numeric targets: alarms per operator per hour, priority distribution, and standing alarm counts.',
      'It fixes the rules for shelving, designed suppression, and out-of-service alarms so those tools are used and not abused.',
      'It is owned by operations, it is short, and it outlives the SCADA platform it was written for.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'Alarms', 'ISA', 'Documentation', 'Design'],
    blocks: [
      { t: 'h2', text: 'Why a document, not a setting' },
      {
        t: 'p',
        text: 'Alarm systems go bad one alarm at a time. A commissioning engineer alarms every diagnostic bit. A supervisor asks for an alarm on a pump start. A vendor package arrives with two hundred alarms preconfigured. Five years on the operator sees a thousand alarms a shift and acknowledges them in blocks without reading them, and the one that mattered is in the block. No setting prevents that. A written definition of what an alarm is, applied to every proposed alarm by someone with the authority to say no, is the only thing that does. ISA-18.2 puts the philosophy at the start of the lifecycle for that reason.',
      },
      { t: 'h2', text: 'What it contains' },
      {
        t: 'ol',
        items: [
          'Purpose and scope: what systems and what sites the philosophy governs, and who must follow it.',
          'The definition of an alarm and the criteria a condition must meet to become one.',
          'The priority levels, what each means to the operator, and the matrix that assigns one from consequence and time to respond.',
          'The alarm classes, for alarms with regulatory, safety, or environmental significance that carry extra requirements for testing and record keeping.',
          'Performance targets and how they are measured.',
          'How alarms are presented: the HMI conventions, sounds, colors, and the alarm summary, in agreement with the HMI philosophy.',
          'The rules for shelving, designed suppression, and out-of-service alarms.',
          'Roles: who may propose, approve, change, and remove an alarm, and how changes are recorded.',
          'How the system is monitored and audited, and how often the philosophy itself is reviewed.',
        ],
      },
      { t: 'h2', text: 'The criteria' },
      {
        t: 'p',
        text: 'The test every proposed alarm has to pass is stated in a few lines and applied without exception.',
      },
      {
        t: 'dl',
        items: [
          { term: 'It requires an operator response', def: 'There is a specific action the operator takes when it occurs. If the answer to what the operator does is nothing, or watch it, it is not an alarm.' },
          { term: 'The response prevents or mitigates a consequence', def: 'Acting matters. A condition that resolves itself, or whose consequence is unaffected by anything the operator can do, is an event.' },
          { term: 'It is unique', def: 'It is not already indicated by another alarm. A high level alarm and a high level float alarm and a pump overload that all announce one overflow are one alarm and two nuisances.' },
          { term: 'It is timely', def: 'It arrives with enough time for the response to work, and not so early that it is ignored as premature.' },
          { term: 'It has a defined limit and a defined deadband or delay', def: 'So that it does not chatter and so that its meaning is stable.' },
        ],
      },
      { t: 'h2', text: 'Priority' },
      {
        t: 'p',
        text: 'Priority tells the operator which of several alarms to deal with first. It is assigned from two things: the consequence of not responding, in categories the plant defines for safety, environment, equipment, and production, and the time available to respond before the consequence. A matrix in the philosophy maps each combination to a priority, and every alarm is assigned by that matrix during rationalization. Three priorities, sometimes four, are the norm. More than that and the operator cannot tell them apart.',
      },
      {
        t: 'table',
        caption: 'A typical priority matrix, illustrative',
        head: ['Time to respond', 'Minor consequence', 'Serious consequence', 'Severe consequence'],
        rows: [
          ['More than 30 minutes', 'Low', 'Low', 'Medium'],
          ['10 to 30 minutes', 'Low', 'Medium', 'High'],
          ['Less than 10 minutes', 'Medium', 'High', 'High'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Most alarms should be low priority',
        text: 'The commonly used distribution target is around 80 percent low, 15 percent medium, and 5 percent high. A system in which half the alarms are high priority has no priorities. If rationalization produces that distribution, the matrix or its inputs are being applied too generously.',
      },
      { t: 'h2', text: 'Performance targets' },
      {
        t: 'p',
        text: 'The philosophy states what an acceptable alarm load is, so that the system can be measured against it. The benchmarks in ISA-18.2 and EEMUA 191 are the usual reference: on the order of one alarm per ten minutes per operator in steady operation as a manageable load, with more than that becoming demanding and several times that unacceptable; a small number of standing alarms; no alarm floods, defined as more than ten alarms in ten minutes; and a bounded number of chattering alarms. The point is not the exact numbers. It is that the numbers exist, are measured monthly, and drive the rationalization of whatever is producing the load.',
      },
      { t: 'h2', text: 'The handling rules' },
      {
        t: 'dl',
        items: [
          { term: 'Shelving', def: 'An operator temporarily removing an alarm from view for a bounded time, with the shelving visible and logged. The philosophy sets the maximum duration, who may shelve which priorities, and that shelved alarms return automatically.' },
          { term: 'Designed suppression', def: 'Alarms suppressed by logic because they are meaningless in a plant state, a low flow alarm on a pump that is off. Designed during rationalization, documented, and not available to the operator to change.' },
          { term: 'Out of service', def: 'An alarm removed for maintenance of the instrument, by authorization, with a record and a return date.' },
          { term: 'Change', def: 'Any change to a limit, priority, or the existence of an alarm goes through the management of change process the philosophy defines, with the rationalization record updated.' },
        ],
      },
      { t: 'h2', text: 'Writing it' },
      {
        t: 'p',
        text: 'The philosophy is short, ten to twenty pages for most plants, written in the plant’s own words, owned by operations rather than by the integrator, and approved by whoever is accountable for the plant. It refers to the HMI philosophy and the control narratives rather than repeating them. It is reviewed on a schedule and whenever the plant changes. And it is applied: the first rationalization workshop after it is written is where it either becomes the way the plant works or becomes a document on a shelf.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between an alarm and an event?',
        a: 'An alarm requires an operator to do something. An event is something worth recording, a pump start, a mode change, a setpoint change, that requires no action. Events go in the log; alarms go in the alarm summary. Confusing the two is how alarm summaries fill up.',
      },
      {
        q: 'How many alarm priorities should we have?',
        a: 'Three is the usual answer, occasionally four with a diagnostic or urgent level. More than that and the operator cannot rank them at a glance, which defeats the purpose.',
      },
      {
        q: 'Who writes the alarm philosophy?',
        a: 'Operations, with engineering and the integrator contributing, and the plant’s management approving it. It is the plant’s statement of how it will run, and an integrator-written philosophy that operations did not shape is rarely followed.',
      },
      {
        q: 'How does the philosophy relate to ISA-18.2?',
        a: 'ISA-18.2 defines the alarm management lifecycle and puts the philosophy at its start. The philosophy is the plant’s document; the standard is the framework that says what it should contain and what comes after it.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/rationalization',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/plc-systems/programming/alarms',
    ],
  },
  {
    path: '/controls/scada-hmi/alarm-management/alarm-priority',
    kind: 'reference',
    title: 'Alarm Priority',
    summary:
      'How to assign alarm priorities that operators trust: a consequence-and-time matrix, three or four levels, the target distribution from ISA-18.2 and EEMUA 191, and the mistakes that make every alarm high.',
    answer:
      'Alarm priority tells the operator which alarm to act on first. It is assigned from two things: the severity of the consequence if no action is taken, and the time available to act. A small matrix of those two produces three or four priorities. ISA-18.2 and EEMUA 191 recommend a distribution of roughly 80 percent low, 15 percent medium, and 5 percent high, so that a high-priority alarm is rare and always means something.',
    keyPoints: [
      'Priority is about the consequence of not acting and the time to act, not about how important the equipment feels.',
      'Three priorities, or four with a critical level, is all an operator can use.',
      'Aim for about 80/15/5 low/medium/high across the configured alarms.',
      'Priority is set once, in rationalization, with the consequence written down.',
      'If everything is high, nothing is.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Alarms', 'SCADA', 'ISA', 'Design'],
    blocks: [
      { t: 'h2', text: 'What priority is for' },
      {
        t: 'p',
        text: 'When two alarms arrive at once, the operator needs to know which to act on first. That is the only job of alarm priority. It is not a measure of how expensive the equipment is, how loudly a supervisor argued for it, or how embarrassing the failure would be. It is a ranking of urgency, and it only works if it is assigned consistently across every alarm in the system by a method that can be explained.',
      },
      {
        t: 'p',
        text: 'Priority also drives presentation. The alarm summary sorts by it, the HMI color and sound depend on it, and in a utility with paging or callout, priority is often one of the inputs that decides whether an alarm wakes someone at 2 a.m. or waits for the morning shift. Getting priority wrong in either direction has consequences: a low priority on a chlorine leak is obviously wrong, but a high priority on a communication hiccup trains operators to ignore high priority alarms.',
      },
      { t: 'h2', text: 'The two questions' },
      {
        t: 'p',
        text: 'ISA-18.2 defines priority as a function of the severity of consequence and the time available for response. Both are judged assuming the operator does nothing: what happens, how bad is it, and how long until it happens.',
      },
      {
        t: 'table',
        caption: 'A priority matrix',
        head: ['Time to respond', 'Minor consequence', 'Major consequence', 'Severe consequence'],
        rows: [
          ['More than 30 minutes', 'Low', 'Low', 'Medium'],
          ['5 to 30 minutes', 'Low', 'Medium', 'High'],
          ['Less than 5 minutes', 'Medium', 'High', 'High'],
        ],
      },
      {
        t: 'p',
        text: 'The matrix itself is chosen by the utility, and the words minor, major, and severe are defined in the alarm philosophy against categories that matter to the site: personnel safety, public health, environmental release, regulatory violation, equipment damage, and cost. A minor consequence might be an equipment repair under a set amount or a brief loss of a non-critical measurement. A severe one is an injury, a sanitary sewer overflow, a treatment violation, or a loss of the ability to supply water. Once the definitions exist, two people rationalizing the same alarm arrive at the same priority, which is the test.',
      },
      { t: 'h2', text: 'How many levels' },
      {
        t: 'p',
        text: 'Three is the common answer: low, medium, high. Some sites add a fourth, critical or emergency, reserved for a handful of alarms with an immediate safety consequence: a gas detector, a fire alarm, an emergency stop. Beyond four, operators cannot keep the distinctions straight, and the extra levels get used as a way to avoid deciding.',
      },
      {
        t: 'p',
        text: 'Diagnostic and maintenance notifications that do not require operator action are not alarms at all under ISA-18.2, and should not occupy a priority. Route them to a maintenance list or an event log. A lot of the pressure to add priority levels comes from trying to fit things that are not alarms into the alarm system.',
      },
      { t: 'h2', text: 'Distribution' },
      {
        t: 'p',
        text: 'The published guidance from EEMUA 191, carried into ISA-18.2, is a target distribution of about 80 percent low, 15 percent medium, and 5 percent high priority across the configured alarms, with under 1 percent in a critical level where one exists. The numbers are not magic. They express the idea that a high-priority alarm should be uncommon enough that it commands attention every time.',
      },
      {
        t: 'p',
        text: 'A system where 40 percent of alarms are high has not been rationalized; it has been configured by whoever was most worried at the time. The fix is not to demote alarms arbitrarily until the numbers fit but to run each one through the matrix. The distribution then falls out, and if it is still top-heavy the consequence definitions probably need tightening.',
      },
      {
        t: 'table',
        head: ['Priority', 'Target share', 'Operator expectation', 'Example at a water utility'],
        rows: [
          ['Critical (optional)', 'Under 1%', 'Drop everything; immediate action, possibly evacuate', 'Chlorine gas detection, fire, emergency stop actuated'],
          ['High', 'About 5%', 'Act now, ahead of anything else on the screen', 'Lift station high level, disinfection residual out of range at the point of entry, plant loss of power'],
          ['Medium', 'About 15%', 'Act within minutes, after any high', 'Pump failed to start with the standby available, tank level approaching low, communication lost to a remote site'],
          ['Low', 'About 80%', 'Act when convenient within the shift', 'Filter run time due for backwash, analyzer calibration due, a single flow meter reading suspect'],
        ],
      },
      { t: 'h2', text: 'Common mistakes' },
      {
        t: 'dl',
        items: [
          { term: 'Priority by equipment', def: 'Everything on the high-service pumps is high because the pumps are important. The pumps are important; the alarm about a bearing temperature rising slowly is not urgent.' },
          { term: 'Priority by who asked', def: 'A supervisor wants to be sure the alarm is noticed, so it is set high. Priority is the answer to the matrix, and the way to be sure an alarm is noticed is to have few high alarms.' },
          { term: 'Priority to control notification', def: 'An alarm is set high so it pages someone. If the notification system needs a separate criterion, give it one. Coupling the two forces the wrong priority on alarms that need a page but are not urgent, and the reverse.' },
          { term: 'Same priority for the pre-alarm and the alarm', def: 'High level and high-high level on a tank are two alarms with different times to respond. The first is medium, the second is high. Giving both high makes the first one noise.' },
          { term: 'Priority never revisited', def: 'A priority assigned at commissioning under commissioning conditions stays for twenty years. Rationalization is periodic, and the alarm history shows which priorities are wrong.' },
        ],
      },
      { t: 'h2', text: 'Priority in presentation' },
      {
        t: 'p',
        text: 'Once assigned, priority should be visible the same way everywhere. ISA-101 and the high-performance HMI practice give each priority a distinct color and, where used, a distinct sound, and reserve those colors for alarms only. The alarm summary sorts by priority and then by time. The alarm indication on a process display uses the priority color and shape. A pager or callout system uses the priority as one input to its escalation rules. When priority looks different on different screens, the operator has to translate, and translation under stress fails.',
      },
    ],
    faqs: [
      {
        q: 'Should communication failure alarms be high priority?',
        a: 'Usually medium. Losing communication to a lift station means losing visibility, which needs attention within minutes, but the station keeps pumping on its own controls and the consequence of a short outage is small. It becomes high if the site cannot run without SCADA, which is a design problem to fix rather than a priority to raise.',
      },
      {
        q: 'Can the same alarm have different priorities at different times?',
        a: 'ISA-18.2 allows state-based priority, where the priority depends on the operating mode. It is useful in batch and process plants and rarely needed in water and wastewater. If the same alarm seems to need two priorities, it is often two alarms, or the time to respond has been misjudged.',
      },
      {
        q: 'What priority do I give an alarm I cannot classify?',
        a: 'Ask what happens if nobody responds for an hour. If the honest answer is nothing much, it is low, or it is not an alarm and belongs in the event log. Inability to name a consequence is itself the answer.',
      },
      {
        q: 'How do I fix a system where most alarms are already high?',
        a: 'Start with the alarm history. The most frequent alarms are the first candidates, because they are the ones operators have learned to ignore. Rationalize those, then work through the rest by area. Reducing the high priority count to the target takes months at most sites and is worth it every time.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/controls/scada-hmi/alarm-management/rationalization',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/scada-hmi/hmi-design/isa-101',
    ],
  },
  {
    path: '/controls/scada-hmi/alarm-management/rationalization',
    kind: 'reference',
    title: 'Alarm Rationalization',
    summary:
      'The meeting where every alarm earns its place: who attends, what is decided for each alarm, how to document it in a master alarm database, and how to run it at a utility that cannot spare a week.',
    answer:
      'Alarm rationalization is the systematic review of every configured alarm against the alarm philosophy. For each one, a small team decides whether it is a real alarm, what its cause and consequence are, what the operator is expected to do, what its setpoint and priority should be, and records the result in a master alarm database. It is how a system gets from thousands of nuisance alarms to a set operators trust.',
    keyPoints: [
      'Every alarm must have a defined operator action. If there is nothing to do, it is not an alarm.',
      'The team is an operator, a process or controls engineer, and a facilitator. Two hours at a time, not two weeks.',
      'Record cause, consequence, action, time to respond, setpoint, priority, and classification for every alarm.',
      'The master alarm database is the record. SCADA configuration must match it, not the other way around.',
      'Start with the ten most frequent alarms. That is where the noise is.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Alarms', 'SCADA', 'ISA', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'What rationalization is' },
      {
        t: 'p',
        text: 'Rationalization is the stage in the ISA-18.2 lifecycle where the alarm philosophy is applied to actual alarms, one at a time. It answers, for every configured alarm, whether the alarm should exist and, if so, what it means and what it demands. Without it, an alarm system is whatever accumulated: the defaults every tag came with, the alarms added after each incident, the ones a contractor thought were sensible in 2009.',
      },
      {
        t: 'p',
        text: 'The output is a master alarm database, a record of every alarm and the decisions made about it. That record is what makes the alarm system maintainable. When someone asks why a setpoint is where it is, or whether an alarm can be removed, the answer is written down.',
      },
      { t: 'h2', text: 'The questions asked of each alarm' },
      {
        t: 'table',
        head: ['Question', 'What is recorded', 'Why it matters'],
        rows: [
          ['Is it an alarm?', 'Whether it meets the philosophy definition: an abnormal condition requiring operator action', 'Anything with no operator action is an event or a maintenance notification and leaves the alarm system.'],
          ['What causes it?', 'The likely process or equipment causes', 'Guides the operator response and shows whether the alarm duplicates another.'],
          ['What is the consequence?', 'What happens if no one acts, in the philosophy categories', 'Drives the priority and justifies the alarm.'],
          ['What must the operator do?', 'The specific corrective action', 'The single most important entry. An alarm the operator can do nothing about is not an alarm.'],
          ['How long do they have?', 'Time available to respond before the consequence', 'Drives the priority together with the consequence.'],
          ['What is the setpoint?', 'The value and the basis for it: a limit, a permit, a curve, an operating envelope', 'A setpoint with a basis survives; one without is changed whenever it annoys.'],
          ['What priority?', 'From the matrix in the philosophy', 'Consistency across the system.'],
          ['What class?', 'Safety, environmental, regulatory, or general; determines testing and change control', 'A regulatory alarm cannot be changed by an operator at a keyboard.'],
          ['Deadband, on-delay, off-delay?', 'Values that prevent chattering', 'Most nuisance alarms are cured here.'],
          ['Suppression or shelving rules?', 'When the alarm is expected and should not annunciate', 'A pump-stopped alarm on a pump that was commanded to stop is designed suppression.'],
        ],
      },
      { t: 'h2', text: 'Who is in the room' },
      {
        t: 'p',
        text: 'Rationalization is a small-group activity. The essential people are an experienced operator who knows what the alarm looks like in practice and what they actually do about it, an engineer who knows the process and the control system, and a facilitator who keeps the pace and writes things down. A maintenance representative is valuable for equipment alarms. Managers are welcome to set the philosophy and to approve the result; they slow the sessions down if they attend them.',
      },
      {
        t: 'p',
        text: 'Sessions run about two hours. Longer than that, decisions get worse. A practiced team gets through 20 to 40 alarms an hour once the philosophy is settled, more where alarms are similar, such as the same set on each of thirty lift stations, which can be rationalized as a template and then checked for exceptions.',
      },
      { t: 'h2', text: 'Running it at a small utility' },
      {
        t: 'p',
        text: 'A utility with two operators and no engineer on staff cannot follow the full program as written for a refinery. It can still rationalize. The shortcut that works is to start with the alarm history.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Pull the last three months of alarms', text: 'Count occurrences per alarm tag. Ten tags usually account for half the total. Those ten are the first session.' },
          { title: 'Fix the bad actors', text: 'Most are chattering on a noisy signal, standing because a piece of equipment is out of service, or duplicating another alarm. Deadband, delays, and suppression rules cure most; a few are deleted.' },
          { title: 'Rationalize the high-priority alarms', text: 'Every alarm currently marked high gets the full set of questions. This is where the priority distribution is fixed.' },
          { title: 'Template the repeated sites', text: 'Rationalize one lift station completely, then apply the result to the others and review only the differences.' },
          { title: 'Work through the rest by area', text: 'One process area per session, on a schedule. It takes months, and the alarm system improves every session.' },
          { title: 'Keep the database current', text: 'Every new alarm goes through the questions before it is configured. Every change to a setpoint or a priority updates the record. The database is the configuration authority.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The operator action test',
        text: 'For every alarm, ask the operator to say out loud what they would do when it comes in. If the answer is to acknowledge it, or to call someone without knowing why, the alarm either needs a defined response or does not belong. This one question removes more alarms than any other.',
      },
      { t: 'h2', text: 'The master alarm database' },
      {
        t: 'p',
        text: 'The database can be a spreadsheet, a table in the SCADA system, or a commercial alarm management package. What matters is that it holds one row per alarm with the answers above, that it is under change control, and that it is periodically compared with what is actually configured in SCADA. Drift between the two is normal and is found by an audit, not by an incident. Commercial tools automate the comparison and push approved settings to the SCADA system; a spreadsheet and a quarterly check achieve the same thing at small scale.',
      },
      { t: 'h2', text: 'After rationalization' },
      {
        t: 'p',
        text: 'Rationalization is not the end of the lifecycle. The rationalized alarms are configured, operators are trained on the changes, and the system is monitored: alarm rate per operator per hour, the ten most frequent alarms, standing alarms, the priority distribution. Those metrics identify the alarms that need to go back through the questions. ISA-18.2 gives the targets, and the alarm floods page covers what to look for when the rate spikes.',
      },
    ],
    faqs: [
      {
        q: 'How long does rationalization take?',
        a: 'Rough planning numbers are 20 to 40 alarms per hour of session time once the philosophy is settled, with templated sites going much faster. A plant with 2,000 configured alarms is a few hundred hours spread over several months. A utility with a SCADA system built from defaults often finds that a third of the alarms are removed outright.',
      },
      {
        q: 'Do we need an alarm philosophy first?',
        a: 'Yes, at least a short one: the definition of an alarm, the consequence categories, the priority matrix, and the rules for classification. Rationalizing without it produces inconsistent decisions, and the first sessions become arguments about principles instead of alarms. A philosophy for a utility can be ten pages.',
      },
      {
        q: 'What do we do with alarms the operator cannot act on but management wants?',
        a: 'Route them somewhere other than the operator alarm list: a maintenance notification queue, an email report, an event log. The information is kept; the operator is not interrupted by it. If management insists it be an operator alarm, the operator action must be defined, and the action cannot be to call management.',
      },
      {
        q: 'Should we buy software for this?',
        a: 'Alarm management software helps with the analysis, the database, and enforcement, and pays for itself at a plant with thousands of alarms. At a small utility, a spreadsheet, the SCADA alarm history export, and a disciplined process do the same job. Buy the software when the spreadsheet stops being maintainable.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/scada-hmi/alarm-management/notification',
    ],
  },
  {
    path: '/controls/scada-hmi/alarm-management/alarm-floods',
    kind: 'reference',
    title: 'Alarm Floods',
    summary:
      'What an alarm flood is, why it happens at exactly the wrong moment, the ISA-18.2 rate targets, and the design measures that keep a power failure or a communication loss from burying the one alarm that matters.',
    answer:
      'An alarm flood is a period when alarms arrive faster than an operator can read them. ISA-18.2 defines it as more than ten alarms in ten minutes for one operator and sets a target of under one percent of time in flood. Floods follow upsets such as a power failure or a communication loss, when a single cause triggers hundreds of consequential alarms. They are prevented by state-based suppression, first-out logic, quality gating, and rationalization of the alarms that make up the flood.',
    keyPoints: [
      'Ten alarms in ten minutes per operator is the ISA-18.2 flood threshold. Target under one percent of time in flood.',
      'Floods are caused by one event with many symptoms. Suppress the symptoms, alarm the event.',
      'A communication loss must produce one alarm, not one per tag.',
      'Loss of power at a site is one alarm. The forty things that stopped are consequences.',
      'Analyze floods from the history. The same few causes account for most of them.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Alarms', 'SCADA', 'ISA', 'Design'],
    blocks: [
      { t: 'h2', text: 'What a flood is' },
      {
        t: 'p',
        text: 'A flood is a burst of alarms that exceeds what an operator can process. ISA-18.2 draws the line at more than ten alarms in any ten-minute period for a single operator position, and sets a performance target that the system be in flood less than one percent of the time. Its companion metric is the average rate: about one alarm per ten minutes is very likely acceptable, two per ten minutes is the most that is manageable, and more than that in steady operation means the alarm system is not doing its job.',
      },
      {
        t: 'p',
        text: 'The problem with a flood is not the count. It is that the one alarm that matters is somewhere in the two hundred that arrived with it. Every major incident investigation that touches alarm systems finds the same thing: the alarm that would have told the operator what was happening was on the screen, and the operator did not see it because it was one line among many.',
      },
      { t: 'h2', text: 'Why floods happen' },
      {
        t: 'p',
        text: 'Floods are caused by one event with many symptoms. The alarm system was configured tag by tag, so each symptom got its own alarm, and when the event occurs they all fire together.',
      },
      {
        t: 'table',
        head: ['Triggering event', 'What floods', 'The alarm that should exist'],
        rows: [
          ['Communication loss to a remote site', 'Every tag at the site goes bad quality, and each may alarm; every derived alarm at the site fires', 'One alarm: site communication failed'],
          ['Loss of power at a plant or site', 'Every motor stops, every drive faults, every analyzer alarms, every level starts moving', 'One alarm: site power lost, with the consequential alarms suppressed while it stands'],
          ['SCADA server failover', 'Every tag re-initializes; alarms that depend on quality or on a stale value fire', 'One event: failover occurred, and no alarms from initialization'],
          ['A pump trips', 'Pump fault, pump failed to run, low flow, low pressure, high level downstream, low level upstream, and every alarm that depends on flow', 'The pump fault, and the process alarms the operator must still act on, with a short delay so the first-out is clear'],
          ['A planned shutdown or maintenance', 'Every alarm that expects the equipment to be running', 'None; the alarms are suppressed by the equipment state or shelved by the operator'],
          ['Instrument failure on a shared signal', 'Every alarm derived from the measurement fires and clears as the signal swings', 'One alarm: signal failed, with derived alarms inhibited on bad quality'],
        ],
      },
      { t: 'h2', text: 'Design measures' },
      {
        t: 'dl',
        items: [
          { term: 'State-based suppression', def: 'An alarm is inhibited when the process state makes it expected. A low flow alarm on a pump that is commanded off is suppressed by the pump state. A low pressure alarm on a system in maintenance mode is suppressed by the mode. This is designed suppression, documented in rationalization, not an operator hiding an alarm.' },
          { term: 'Quality gating', def: 'An alarm derived from a measurement is inhibited when the measurement has bad quality, and the bad quality itself is alarmed once. A tag that goes bad on communication loss must not also generate high, low, and rate alarms on whatever value it froze at.' },
          { term: 'Consequential alarm suppression', def: 'When a defined parent event is active, such as site power lost, its defined child alarms are suppressed and shown in a separate list. The operator sees the cause and can drill into the consequences if they want them.' },
          { term: 'First-out', def: 'When several related alarms occur within a short window, the first is flagged as the initiating event. Common on motor and drive protection, where the first trip explains the rest.' },
          { term: 'Delays and deadbands', def: 'A few seconds of on-delay on alarms that respond to the same disturbance lets the initiating alarm arrive first and prevents transient alarms during a switchover.' },
          { term: 'Communication alarm design', def: 'One alarm per communication path, generated by the driver or the poll status, with all tag-level alarms on that path inhibited on loss. This is the single most effective flood prevention at a utility with many remote sites.' },
          { term: 'Eclipsing', def: 'A high-high alarm eclipses the high alarm on the same tag, so the operator sees one line, not two.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Suppression must be visible',
        text: 'Every suppressed alarm is listed somewhere the operator can see it, with the reason. A suppression that is invisible is a disabled alarm, and disabled alarms are how a real condition goes unnoticed for months. ISA-18.2 requires that suppressed alarms be identifiable and that suppression be a designed, documented function.',
      },
      { t: 'h2', text: 'Analyzing floods' },
      {
        t: 'p',
        text: 'The alarm history identifies floods after the fact, and the analysis is straightforward: find every ten-minute window with more than ten alarms, list the alarms in each, and find the initiating event. At most sites a handful of event types account for nearly all floods, and each has a design fix from the list above. Commercial alarm management software does this analysis automatically; a spreadsheet on the history export does it well enough.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Export the alarm history', text: 'Three to six months, with tag, priority, timestamp, and state.' },
          { title: 'Find the flood windows', text: 'Rolling ten-minute counts per operator position. Mark every window over ten.' },
          { title: 'Group by cause', text: 'For each flood, identify the first alarm and the event behind it. Floods cluster into a few causes.' },
          { title: 'Count the contributors', text: 'Within each cause, which alarms appear every time? Those are the consequential alarms to suppress or remove.' },
          { title: 'Fix the top cause first', text: 'Implement the suppression or the single parent alarm, then re-measure. Repeat.' },
        ],
      },
      { t: 'h2', text: 'During a flood' },
      {
        t: 'p',
        text: 'Design reduces floods; it does not eliminate them. The alarm summary should let the operator filter by priority so that in a flood they see only high alarms, and it should offer a view grouped by area or by parent event. Operators are trained that in a flood the first action is to filter, the second is to find the cause, and acknowledging everything to clear the screen is never the answer, because it discards the information the flood contains.',
      },
    ],
    faqs: [
      {
        q: 'Is ten alarms in ten minutes really the limit?',
        a: 'It is the ISA-18.2 definition of a flood, derived from what an operator can reasonably read and understand. Operators can physically acknowledge far more, which is exactly the problem: acknowledgment rate is not comprehension rate. The number is per operator position, so a control room with two operators has two thresholds.',
      },
      {
        q: 'Our SCADA system generates an alarm for every tag when a site goes offline. How do we fix it?',
        a: 'Generate a single communication alarm from the poll status of that site and configure the tag alarms to be inhibited on bad quality. Most SCADA platforms have both features; some need the inhibit built in the alarm expression. It is one afternoon of configuration per platform and removes the most common flood at a utility.',
      },
      {
        q: 'Is suppression the same as shelving?',
        a: 'No. Suppression is designed into the system based on process state and documented in rationalization. Shelving is an operator temporarily removing a nuisance alarm from view for a set time, after which it returns. Both are legitimate and both are visible; disabling an alarm silently is neither.',
      },
      {
        q: 'What about a flood of alarms from a real emergency?',
        a: 'A real emergency produces real alarms, and some floods are unavoidable. The design goal is that the operator can still find the cause: high priority filtering, first-out flags, and consequential suppression all work during a real event as well as a nuisance one. The rationalized alarm list also matters here: if only five percent of alarms are high, filtering to high shows a short list.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/alarm-management/rationalization',
      '/troubleshooting/scada-troubleshooting/tag-shows-bad-quality',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
    ],
  },
  {
    path: '/controls/scada-hmi/alarm-management/notification',
    kind: 'reference',
    title: 'Alarm Notification and Callout',
    summary:
      'Getting the alarm to the person on call when no one is watching the screen: notification paths, escalation, acknowledgment from the field, which alarms qualify, and the failure modes that leave a station in high level with nobody paged.',
    answer:
      'Alarm notification sends selected alarms to people who are not at the SCADA screen, by voice call, text message, app, or radio, following an on-call schedule with escalation if no one acknowledges. It should be driven by a separate notification rule set rather than by priority alone, tested on a schedule, and monitored for its own health, because a silent notification server is indistinguishable from a quiet night.',
    keyPoints: [
      'Notification is its own rule set: which alarms, to whom, by what path, with what escalation.',
      'Voice and text through a dialer or a notification service; email is not a notification path for urgent alarms.',
      'Escalate on no acknowledgment. The schedule is data, and operators must be able to change it.',
      'Monitor the notifier. A heartbeat test every shift is the minimum.',
      'Two independent paths for the critical sites: the notifier and an autodialer at the site.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Alarms', 'SCADA', 'Telemetry', 'Design'],
    blocks: [
      { t: 'h2', text: 'Why utilities depend on it' },
      {
        t: 'p',
        text: 'Most water and wastewater systems are not staffed around the clock. The plant may have an operator on the day shift and nobody at night; the lift stations and tanks never have anyone. The alarm system works only if the alarm gets to a person who can act, which means the notification layer is not an accessory to the alarm system at a utility. It is the alarm system for most hours of the week.',
      },
      {
        t: 'p',
        text: 'That makes the notification path a piece of critical infrastructure with its own design questions: what gets sent, to whom, how, how it is confirmed, what happens when nobody answers, and how the utility knows the whole chain still works.',
      },
      { t: 'h2', text: 'What gets sent' },
      {
        t: 'p',
        text: 'Not every alarm should page anyone. The temptation is to tie notification to priority, so every high alarm calls out, and that is a reasonable start. But the two are not the same. A high-priority alarm at a staffed plant during the day needs no call; a medium alarm at a remote site at 3 a.m. may. The notification rule set is a separate set of decisions recorded during rationalization: for each alarm, whether it notifies, under what conditions, and to which group.',
      },
      {
        t: 'table',
        head: ['Rule', 'Example', 'Note'],
        rows: [
          ['By priority and time', 'High alarms always notify; medium alarms notify only when the plant is unstaffed', 'Requires a staffed or unstaffed state the operators set, or a schedule'],
          ['By site', 'Every alarm from an unstaffed remote site notifies the collection system on-call group', 'Simple and common; relies on the alarms at those sites being rationalized so the group is not flooded'],
          ['By class', 'Regulatory and safety alarms notify a supervisor in addition to the operator', 'Supports permit obligations and reporting timelines'],
          ['By consequence type', 'Alarms that can lead to an overflow notify with a shorter escalation interval', 'Matches the response time computed for the high-level float'],
          ['Never', 'Low priority and maintenance notifications go to a morning report', 'Keeps the on-call phone quiet enough that a call means something'],
        ],
      },
      { t: 'h2', text: 'Paths' },
      {
        t: 'dl',
        items: [
          { term: 'Voice call', def: 'A dialer or a notification service calls the phone, reads the alarm, and takes an acknowledgment by keypress. It wakes people up, which is the point. It works on any phone.' },
          { term: 'Text message', def: 'Fast and cheap, with the alarm text visible later. Delivery is not guaranteed and a sleeping person may not hear it. Good as the first attempt with voice as the escalation, or in parallel.' },
          { term: 'Mobile application', def: 'Push notification with acknowledgment, often with a view of the alarm summary and trends. Depends on a data connection and on the application being installed and permitted to interrupt.' },
          { term: 'Email', def: 'Useful for reports and low-priority information. Not a notification path for anything urgent, because nobody is woken by email and delivery timing is uncontrolled.' },
          { term: 'Radio and pager', def: 'Still in use where cellular coverage is poor. Paging networks have shrunk; check coverage before relying on one.' },
          { term: 'Site autodialer', def: 'A dialer at the remote site, on its own line or cellular modem, triggered by hardwired inputs such as the high-level float and power failure. Independent of SCADA, so it is the second path when the SCADA radio or the server is what failed.' },
        ],
      },
      { t: 'h2', text: 'Escalation and acknowledgment' },
      {
        t: 'p',
        text: 'A notification that no one acknowledges must go somewhere else. The usual structure is a call list per group: primary on-call, then secondary, then a supervisor, with a set interval between attempts. Acknowledgment from the field, by keypress on a voice call, by reply to a text, or in the application, stops the escalation and is logged. Acknowledging the notification is not the same as acknowledging the alarm in SCADA, and the two should be kept distinct: the operator acknowledged that they know, and the alarm remains until the condition clears.',
      },
      {
        t: 'p',
        text: 'Escalation intervals come from the response time of the consequence. An overflow with ten minutes of storage cannot wait five minutes per call attempt through three people. For those alarms the notifier calls the primary and secondary together, or the interval is short and the list is long.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The schedule is data, so make it editable',
        text: 'The on-call schedule changes weekly and shifts get swapped at short notice. If changing it requires an engineer, it will be wrong, and the notifier will call someone on vacation while the actual on-call operator sleeps. Operators and supervisors should be able to change the schedule themselves, and the notifier should show who is on call now on the main SCADA screen.',
      },
      { t: 'h2', text: 'Monitoring the notifier' },
      {
        t: 'p',
        text: 'A notification server that has quietly stopped looks exactly like a quiet night. The failure is discovered when a station overflows and nobody was called. The notifier therefore needs to be watched as carefully as any other critical system.',
      },
      {
        t: 'ul',
        items: [
          'A heartbeat test: a scheduled test notification every shift or every day that an operator must acknowledge, with an alarm if it is not delivered or not acknowledged.',
          'Health of the notifier itself as a SCADA alarm: service running, modem or service connection up, license valid, queue empty.',
          'A watchdog between SCADA and the notifier, in both directions, so a stalled link is alarmed by whichever side is still alive.',
          'Redundancy for the critical sites: a site autodialer on independent power and an independent line, tested on the same schedule as the high-level float.',
          'A log of every notification and its outcome, reviewed after every callout and monthly for patterns.',
        ],
      },
      { t: 'h2', text: 'Configuration mistakes' },
      {
        t: 'table',
        head: ['Mistake', 'What happens', 'Fix'],
        rows: [
          ['Every alarm notifies', 'The on-call phone rings all night; operators turn it off or ignore it', 'Rationalize; notify by rule, not by default'],
          ['Notification tied only to priority', 'Alarms that need a call at night do not get one; alarms that do not need a call do', 'Separate notification rules with a staffed-state condition'],
          ['Single path through the SCADA server', 'A server, network, or radio failure silences every site at once', 'Autodialers at critical sites; notifier health alarms'],
          ['Escalation to voicemail', 'The call is counted as delivered when voicemail picks up', 'Require a keypress acknowledgment; configure the dialer to treat voicemail as no answer'],
          ['Schedule maintained by one person', 'Wrong person called on any week that person is away', 'Operator-editable schedule shown on the HMI'],
          ['No test', 'Notifier failure discovered by an incident', 'Daily heartbeat with acknowledgment'],
        ],
      },
    ],
    faqs: [
      {
        q: 'Should the notifier be part of the SCADA platform or a separate product?',
        a: 'Either works. Built-in notification is convenient and reads the alarm database directly. A separate product is easier to make independent of the SCADA server, and some are built for this with their own hardware and lines. The independence argument favors separate for the critical path, but a built-in notifier with a well-tested site autodialer as the second path is a common and reasonable design.',
      },
      {
        q: 'How many people should be on the escalation list?',
        a: 'At least three: primary, secondary, and a supervisor, so that one missed call and one unavailable person still leave someone. For alarms with very short response times, call the first two at once.',
      },
      {
        q: 'Can operators acknowledge alarms from their phone?',
        a: 'Most applications allow it. Whether they should depends on the alarm class. Acknowledging the notification is always appropriate; acknowledging the SCADA alarm remotely is appropriate if the operator has enough information on the phone to make the decision the acknowledgment implies. Regulatory and safety alarms often require acknowledgment at the console.',
      },
      {
        q: 'What about cellular coverage at the on-call person\'s home?',
        a: 'Check it, for every person on the list. A voice call to a landline is still the most reliable path for someone who lives outside coverage, and the notifier should allow a different path per person.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/alarm-management/rationalization',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/water-wastewater/wastewater-systems/lift-stations/high-level',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
    ],
  },
];
