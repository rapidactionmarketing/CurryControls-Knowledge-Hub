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
];
