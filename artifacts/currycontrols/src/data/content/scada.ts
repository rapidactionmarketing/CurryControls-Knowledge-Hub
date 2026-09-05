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
];
