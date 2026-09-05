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
  {
    path: '/controls/scada-hmi/hmi-design/faceplates',
    kind: 'reference',
    title: 'HMI Faceplates',
    summary:
      'The pop-up that controls one device: what a pump, valve, or loop faceplate must show, the mode and command layout, interlock and permissive display, security by role, and building faceplates from a standard object so every device behaves the same.',
    answer:
      'A faceplate is the pop-up window that opens when an operator selects a device on a process display. It shows that device state, mode, setpoints, and diagnostics, and it carries the commands the operator may give. Good faceplates are built once per device type from a standard object, laid out identically, show why a device is not doing what it was told, and expose commands according to the user role. The process display shows the situation; the faceplate is where the operator acts.',
    keyPoints: [
      'One faceplate design per device type, instantiated for every device. Consistency is the feature.',
      'Show the mode, the command, the feedback, and the disagreement between them.',
      'Show the interlocks and permissives by name, with the one that is holding the device highlighted.',
      'Commands respect the user role and confirm anything with consequences.',
      'Everything on the faceplate comes from the controller. The faceplate does not contain logic.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['HMI', 'SCADA', 'Design', 'ISA'],
    blocks: [
      { t: 'h2', text: 'What a faceplate is for' },
      {
        t: 'p',
        text: 'A process display is built to show the state of the process at a glance, and ISA-101 practice keeps it uncluttered: a pump is a symbol with a status, not a panel of buttons. When the operator needs to act on that pump, or to see why it is not running, they select it and a faceplate opens. The faceplate is the detailed view and the control surface for one device. It holds everything the display leaves out.',
      },
      {
        t: 'p',
        text: 'Because it is opened for one device at a time and every device of a type gets the same one, the faceplate is where consistency pays off most. An operator who has learned the pump faceplate has learned every pump in the plant. That is achievable only if the faceplate is built once, as a standard object tied to a standard controller block, and never customized per device.',
      },
      { t: 'h2', text: 'What a pump faceplate shows' },
      {
        t: 'table',
        head: ['Element', 'Content', 'Note'],
        rows: [
          ['Header', 'Tag, description, and a navigation link to the process display it lives on', 'Same position on every faceplate'],
          ['Mode', 'Hand, Off, Auto from the local HOA; Manual or Auto in the controller; Local or Remote where the device has it', 'Show what the physical switch says and what the controller is doing; they are not the same thing'],
          ['Command and feedback', 'Commanded state, running feedback, and a visible disagreement indicator when they differ beyond the proof time', 'The disagreement is the diagnostic operators use most'],
          ['Process values', 'Speed reference and actual speed, motor current, run hours, starts today', 'Numbers with units, and a trend link on each'],
          ['Interlocks and permissives', 'Each by name, with status, and the first one that is holding the device highlighted', 'Without this the operator calls someone to ask why the pump will not start'],
          ['Alarms', 'Active alarms on this device with priority, and an acknowledge control', 'Linked to the alarm summary filtered to the device'],
          ['Commands', 'Start, Stop, Auto, Manual, setpoint entry, reset', 'Visible or enabled by role; confirmation on Start, Stop, and mode change'],
          ['Diagnostics', 'Fault code from the drive or starter, seal-leak, thermal, last fault time', 'A second tab where space is tight'],
        ],
      },
      { t: 'h2', text: 'Layout rules' },
      {
        t: 'ul',
        items: [
          'Same size, same position of every element, on every faceplate for a device type, and the same zones across device types: header top, status upper left, commands lower right. The operator eye goes to the same place for the same thing.',
          'Status in text and shape, not color alone. Running, Stopped, Faulted as words; the color is the reinforcement, and it follows the ISA-101 palette used on the displays.',
          'Commands are buttons that look like buttons, distinct from status indicators, and inactive commands are visibly disabled with the reason available on hover or in a short note.',
          'Setpoint entry shows the current value, the engineering units, and the allowed range, and rejects out-of-range entry with a message rather than clamping silently.',
          'A trend button on each process value, opening a pre-configured trend of that value with the related ones: level and speed together, pressure and flow together.',
          'A single close control in the same corner every time, and no more than two tabs.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Why the interlock list matters more than it looks',
        text: 'The most common radio call from a plant operator to a controls engineer is that the pump will not start and nobody knows why. A faceplate that lists the permissives and interlocks by name and highlights the one that is false answers the call before it is made. It costs a few tags per device in the controller block and it pays for itself in the first month.',
      },
      { t: 'h2', text: 'Modes and what they mean' },
      {
        t: 'p',
        text: 'Mode confusion is the most common cause of a faceplate command doing nothing. The physical HOA switch at the panel decides whether the controller has authority at all. The controller mode decides whether the automatic sequence or the operator is issuing the command. A local/remote selector at a drive or a packaged system adds a third layer. The faceplate shows all three separately and plainly, so that an operator who presses Start on a pump whose HOA is in OFF sees that the switch is in OFF, rather than a button that appears to do nothing.',
      },
      {
        t: 'table',
        head: ['Layer', 'Where it lives', 'Faceplate shows'],
        rows: [
          ['HOA', 'Physical switch at the panel', 'HAND, OFF, or AUTO as read by the controller input; grayed commands when not AUTO'],
          ['Controller mode', 'Program, per device', 'AUTO (sequence in control) or MANUAL (operator in control); the toggle command'],
          ['Local or remote', 'Drive keypad, packaged system panel', 'Local or remote; grayed commands when local'],
          ['Out of service', 'Program flag set by the operator', 'A visible banner; removes the device from rotation and suppresses its alarms by design'],
        ],
      },
      { t: 'h2', text: 'Security and confirmation' },
      {
        t: 'p',
        text: 'Faceplate commands are permitted by user role. A viewer sees status and no commands. An operator sees and may issue operating commands. A supervisor may change setpoints outside the operator range and reset latched faults. An engineer may change tuning and configuration. The roles come from the SCADA security model, and the faceplate simply hides or disables what the current user may not do. Commands with consequences, a start, a stop, a mode change, a setpoint change beyond a threshold, ask for confirmation, and the confirmation dialog names the device and the action so that a misdirected click is caught. Every command is logged with the user, the time, and the device.',
      },
      { t: 'h2', text: 'Building from a standard' },
      {
        t: 'steps',
        items: [
          { title: 'Define the controller block first', text: 'The pump control block in the PLC owns the logic and publishes a status structure. The faceplate is a view of that structure. If the block does not expose a value, the faceplate cannot show it, and the answer is to add it to the block, never to compute it in the HMI.' },
          { title: 'Design one faceplate per block type', text: 'Pump, valve, analog loop, analyzer, sequence. Lay it out with the rules above and review it with operators before it is instantiated.' },
          { title: 'Instantiate by tag', text: 'Each device is an instance of the faceplate bound to its block by a tag prefix or a structure reference. No per-device edits.' },
          { title: 'Test one, then all', text: 'Test the faceplate fully on one device, including every command in every mode and every role. Then spot-check the instances for binding errors.' },
          { title: 'Version it with the block', text: 'A change to the block that adds a status member is a change to the faceplate. Keep the two in step and record the version on both.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Should the faceplate contain any logic?',
        a: 'No. The controller decides whether a command is allowed and what happens; the faceplate sends the request and shows the result. Logic in the HMI diverges from the controller over time, is invisible from the panel, and does not run when the HMI is down.',
      },
      {
        q: 'How much should be on the faceplate versus the display?',
        a: 'The display shows what the operator needs to see to know the state of the process without opening anything. The faceplate holds everything about one device. If operators are opening faceplates just to check a value, that value belongs on the display; if the display is crowded with per-device detail, it belongs on the faceplate.',
      },
      {
        q: 'Can vendors supply faceplates?',
        a: 'Most SCADA platforms and many integrators supply library objects with matching controller blocks and faceplates, and they are a good starting point. Adopt one library per site rather than mixing, and adjust the layout to the site standard once, before instantiating.',
      },
      {
        q: 'What about a device with no controller block, like a packaged system?',
        a: 'Build a faceplate against the status the package exposes over its network interface, and keep the mode layers honest: if the package is in local, the faceplate says so and disables commands. A faceplate that pretends to control a package that is not listening trains operators to distrust all of them.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/plc-systems/programming/function-block-diagram',
      '/controls/control-panels/pump-panels/hoa',
      '/controls/plc-systems/programming/interlocks',
      '/controls/scada-hmi/alarm-management/alarm-priority',
    ],
  },
  {
    path: '/controls/scada-hmi/hmi-design/trends',
    kind: 'reference',
    title: 'Trends on the HMI',
    summary:
      'Trend displays that answer questions: embedded sparklines on process displays, pre-configured trend groups, the axes and time spans that make a trend readable, and the difference between a trend for operating and a trend for investigating.',
    answer:
      'A trend on an HMI shows how a value has changed over time, and it is the tool operators use to see where the process is heading rather than where it is. Good trend design puts small embedded trends on the process displays for the values that matter, provides pre-built trend groups that put related values together on sensible axes, and offers an ad hoc trend tool for investigation. Time spans, scales, and colors are chosen for the question each trend answers, and every trend is fed by the historian, not by the display.',
    keyPoints: [
      'An embedded trend on the display shows direction. A number shows only position.',
      'Group related values: the level with the pump speed, the pressure with the flow, the residual with the dose.',
      'Fixed scales on operating trends, autoscale on investigation trends. Say which on the trend.',
      'Time span follows the process: minutes for pressure, hours for a wet well, days for a tank.',
      'Trends read from the historian. A display that trends from its own buffer loses the past when it closes.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['HMI', 'SCADA', 'Design'],
    blocks: [
      { t: 'h2', text: 'Two kinds of trend' },
      {
        t: 'p',
        text: 'An operating trend lives on a process display or a faceplate and answers one question continuously: is this value where it should be, and which way is it moving. It is small, its scale is fixed to the normal operating range, and its time span is short enough that the recent movement fills it. An investigation trend is opened to find out what happened: several values, a longer span, adjustable scales, cursors, and the ability to scroll back through history. Both are needed, and confusing them produces either an operating display cluttered with full trend windows, or a trend tool that shows so much that nothing can be read.',
      },
      { t: 'h2', text: 'Embedded trends' },
      {
        t: 'p',
        text: 'ISA-101 and the high-performance HMI practice put small trends directly on the process display for the handful of values that decide how the process is doing: the wet well level, the clearwell level, the discharge pressure, the chlorine residual. A number tells the operator where the value is; the sparkline beside it tells them where it has been for the last hour and whether it is climbing. That is the difference between seeing a problem forming and seeing an alarm.',
      },
      {
        t: 'ul',
        items: [
          'Fixed vertical scale set to the normal operating range, with the alarm limits shown as lines, so that the shape of the trace means the same thing every time.',
          'A fixed time span, typically 30 minutes to a few hours depending on the process, that fills the width with recent history.',
          'One value per embedded trend, or two closely related ones in distinct line weights. Not four.',
          'Gray or muted trace colors consistent with the display palette; the alarm limit lines in the alarm colors only.',
          'The current value as a number beside the trend, with units.',
          'A click that opens the full investigation trend for that value and its group.',
        ],
      },
      { t: 'h2', text: 'Trend groups' },
      {
        t: 'p',
        text: 'Values are understood in relation to each other. A level trend with the pump run status and speed overlaid shows why the level did what it did. A pressure trend alone shows a dip; with flow, it shows whether the dip was demand or a pump. Pre-configured trend groups, built by someone who knows the process and opened with one click from the display or the faceplate, are the most used trend feature in a plant, and they are worth the time to design.',
      },
      {
        t: 'table',
        head: ['Group', 'Values', 'Typical span'],
        rows: [
          ['Lift station', 'Wet well level; pump 1 and pump 2 run status as bands; pump speed; motor current', '4 hours'],
          ['Distribution pressure', 'Zone pressure; setpoint; pump speed; station flow; tank level', '8 hours'],
          ['Disinfection', 'Chlorine residual at the point of entry; dose setpoint; feeder output; plant flow; pH', '24 hours'],
          ['Filter', 'Effluent turbidity; head loss; flow; run time since backwash', '72 hours'],
          ['Tank', 'Level; inflow; outflow; time of day', '7 days'],
          ['Communications', 'Poll success rate per site; latency; retries', '24 hours'],
        ],
      },
      { t: 'h2', text: 'Axes, scales, and spans' },
      {
        t: 'dl',
        items: [
          { term: 'Vertical scale', def: 'Fixed for operating trends so the shape is comparable; autoscale for investigation with the scale visible. Values with different units get their own axes, and no more than two axes on one chart before it becomes unreadable.' },
          { term: 'Digital states', def: 'Run status, valve position, mode: shown as bands or a stepped trace at the bottom, not as a line that pretends to be analog.' },
          { term: 'Time span', def: 'Chosen from how fast the value changes and how far back the operator needs to see. Pressure and flow in minutes to hours; wet well level in hours; tank level and residual in a day; filter runs in days.' },
          { term: 'Sampling', def: 'The trend reads the historian at whatever the historian stored. A trend that appears smooth at 5-second data and stepped at 1-minute data is showing the historian configuration, not the process.' },
          { term: 'Time axis', def: 'Absolute time with the date where the span crosses midnight; a live mode that scrolls and a frozen mode that does not.' },
          { term: 'Cursors', def: 'Two cursors on the investigation trend, reading the value of every trace at each and the difference between them. This is how a drawdown rate or a dose response time is read.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Overlay yesterday',
        text: 'A trend that overlays the same value from 24 hours ago, or the same weekday last week, turns a daily pattern into a comparison. A wet well that is filling faster than yesterday at this hour, or a residual that is lower than last Tuesday, is visible at a glance. Many platforms support it directly; where they do not, a historian query can build it.',
      },
      { t: 'h2', text: 'Trends and the historian' },
      {
        t: 'p',
        text: 'Every trend should read from the historian, so that the same data is available on every client, so that history is available back as far as the historian keeps it, and so that a trend opened on a client that was just started shows the past. A display that trends from its own in-memory buffer shows a blank chart on open and forgets everything on close. The historian configuration, its collection rates and its compression, decides what a trend can show; the trending design and the historian design are the same exercise.',
      },
      { t: 'h2', text: 'Common mistakes' },
      {
        t: 'ul',
        items: [
          'Autoscaled operating trends, so that a tiny fluctuation fills the chart and looks like an event.',
          'Rainbow traces. Five bright colors on one chart, none of them meaning anything.',
          'Trend spans set for commissioning and never changed: a 5-minute window on a value that moves over hours.',
          'No trend groups, so every investigation starts with building a trend from scratch and the operator does not bother.',
          'Digital states plotted as analog lines from 0 to 1 on the same axis as a level in feet.',
          'A historian collecting at one minute for a pressure loop that oscillates at 20 seconds, so the trend shows aliasing instead of the oscillation.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How many embedded trends should a display have?',
        a: 'The high-performance HMI practice suggests a handful on an overview display, for the values that define the state of the process. More than six and the display is a trend page; fewer and the operator has no sense of direction. Area displays can carry more, one per key loop.',
      },
      {
        q: 'Should trend colors match the alarm colors?',
        a: 'No. Traces are in neutral colors; the alarm colors are reserved for alarm limit lines and for alarm indication. A red trace on a normal value teaches operators that red does not mean alarm.',
      },
      {
        q: 'What sampling rate does the historian need for trends?',
        a: 'Fast enough to show the fastest behavior the operator needs to see. Pressure and flow loops with a drive commonly need one to five second data; levels and residuals are fine at 10 to 60 seconds. Exception or deadband collection stores the changes rather than every sample, and the trend interpolates between them.',
      },
      {
        q: 'Can operators build their own trends?',
        a: 'They should be able to, in an ad hoc trend tool, and the useful ones should be promoted to trend groups by whoever maintains the HMI. The ad hoc tool is where investigation happens; the groups are the ones everyone uses.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/scada-hmi/scada-fundamentals/historians',
      '/controls/scada-hmi/hmi-design/faceplates',
      '/troubleshooting/scada-troubleshooting/values-frozen-on-screen',
    ],
  },
  {
    path: '/controls/scada-hmi/hmi-design/alarm-indication',
    kind: 'reference',
    title: 'Alarm Indication on the HMI',
    summary:
      'How an alarm looks and sounds on the operator screen: the ISA-101 and ISA-18.2 rules for color, shape, and blink, the alarm banner and summary, acknowledgment behavior, navigation to the alarm, and indication that survives colorblindness and a noisy control room.',
    answer:
      'Alarm indication is the set of visual and audible cues that tell the operator an alarm exists, its priority, and its acknowledgment state. ISA-101 practice reserves a small set of colors for alarms and uses them nowhere else, pairs each with a shape or a symbol so priority is not conveyed by color alone, blinks only unacknowledged alarms, and shows alarms both at the point on the display where the problem is and in a banner and summary that are visible from every screen. The indication is driven by the alarm state from the controller and ends only when the alarm is acknowledged and the condition clears.',
    keyPoints: [
      'Alarm colors are reserved. Nothing else on the HMI uses them.',
      'Priority is shown by color and by shape or symbol, so a colorblind operator sees the same thing.',
      'Blink means unacknowledged. Steady means acknowledged and still active. Gone means cleared.',
      'The alarm is indicated where the problem is on the display, in the banner, and in the summary.',
      'One click from the indication to the device and to the alarm summary filtered to it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['HMI', 'Alarms', 'ISA', 'Design'],
    blocks: [
      { t: 'h2', text: 'What the indication must do' },
      {
        t: 'p',
        text: 'The operator has to notice that an alarm exists, know how urgent it is, find where it is, and know whether they have already seen it. Those four jobs are done by different cues, and an indication that does one of them at the expense of the others fails. A display in which everything abnormal is bright red gets the first job done and none of the others; a display in which an alarm is a small gray line in a list gets the fourth done and not the first.',
      },
      {
        t: 'p',
        text: 'ISA-101 sets out the presentation rules and ISA-18.2 sets out the alarm states and the transitions the operator drives. Together they produce a consistent indication scheme that a utility can adopt as-is.',
      },
      { t: 'h2', text: 'Color and shape' },
      {
        t: 'table',
        head: ['Priority', 'Color', 'Shape or symbol', 'Sound'],
        rows: [
          ['Critical (where used)', 'Red', 'Filled square or a distinct symbol, priority number 1', 'Distinct continuous tone until acknowledged'],
          ['High', 'Red', 'Filled square, priority number 1 or 2', 'Distinct tone'],
          ['Medium', 'Yellow or amber', 'Filled triangle, priority number 2 or 3', 'A different tone, or a chime'],
          ['Low', 'Blue or magenta', 'Filled circle, priority number 3 or 4', 'None, or a soft chime'],
          ['Diagnostic, not an alarm', 'Gray or the muted display palette', 'Small symbol', 'None'],
        ],
      },
      {
        t: 'p',
        text: 'The exact colors are chosen by the site and recorded in the HMI style guide; what matters is that the same color always means the same priority, that the colors appear nowhere else on the displays, and that a shape and a number accompany each so that the priority is readable without the color. Red for a running pump, yellow for a piping line, and green for anything at all are how alarm colors lose their meaning.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Gray displays make alarms visible',
        text: 'The reason high-performance HMI displays are gray and muted is that an alarm indication in color then stands out from across the room. On a display with bright colors everywhere, an alarm is one more bright thing. The alarm indication scheme depends on the display palette being quiet.',
      },
      { t: 'h2', text: 'States and blink' },
      {
        t: 'p',
        text: 'ISA-18.2 defines the alarm states the indication has to show. The operator needs to distinguish a new alarm from one they have already acknowledged, and an alarm that has cleared but was never acknowledged from one that is gone.',
      },
      {
        t: 'table',
        head: ['State', 'Condition', 'Acknowledged', 'Indication'],
        rows: [
          ['Normal', 'Clear', 'Not applicable', 'No indication'],
          ['Unacknowledged alarm', 'Active', 'No', 'Priority color and symbol, blinking; audible'],
          ['Acknowledged alarm', 'Active', 'Yes', 'Priority color and symbol, steady; audible silenced'],
          ['Return to normal, unacknowledged', 'Clear', 'No', 'Symbol in outline or with a distinct marker, highlighted in the summary, until acknowledged'],
          ['Shelved', 'Any', 'Any', 'Removed from the active list; shown in the shelved list with a timer'],
          ['Suppressed by design', 'Any', 'Any', 'Not annunciated; shown in the suppressed list with the reason'],
          ['Out of service', 'Any', 'Any', 'Not annunciated; shown on the device with a clear out-of-service marker'],
        ],
      },
      {
        t: 'p',
        text: 'Blinking is reserved for the unacknowledged state. A blinking indication that continues after acknowledgment, or a steady one for a new alarm, breaks the meaning. Blink rate is moderate, around one cycle per second, and nothing else on the display blinks.',
      },
      { t: 'h2', text: 'Where the alarm appears' },
      {
        t: 'dl',
        items: [
          { term: 'On the process display', def: 'At the device or the value that is in alarm: the symbol beside the number, the device outline, or a marker at the point on the display. The operator sees where the problem is without reading text.' },
          { term: 'In the alarm banner', def: 'A strip visible on every display, showing the most recent or the highest priority unacknowledged alarms, with priority color, symbol, time, tag, and message. Clicking an entry navigates to the display that contains the device.' },
          { term: 'In the alarm summary', def: 'The full list, sorted by priority then time, filterable by area and priority, with acknowledge controls. The banner leads to the summary; the summary leads to the device.' },
          { term: 'On the navigation', def: 'An indicator on the menu or the navigation buttons for each area, showing the highest priority active alarm in that area, so an operator on the water plant display knows the collection system has a high alarm.' },
          { term: 'Audibly', def: 'A tone per priority, silenced by acknowledgment or by a silence button that does not acknowledge, re-sounding for each new alarm.' },
        ],
      },
      { t: 'h2', text: 'Acknowledgment and navigation' },
      {
        t: 'p',
        text: 'Acknowledgment says an operator has seen the alarm. It is done from the summary, from the banner, or from the device faceplate, and it is logged with the user and the time. Acknowledging clears the blink and silences the tone; it does not remove the alarm, which stays indicated until the condition clears. Acknowledge-all is a function to be cautious with: in a flood it is how the one alarm that mattered is acknowledged unread, and many sites restrict it or require a confirmation. From any indication, one click reaches the device faceplate and one click reaches the summary filtered to the device or area, so that acting on an alarm never requires knowing where to look.',
      },
      { t: 'h2', text: 'Testing the indication' },
      {
        t: 'ul',
        items: [
          'Drive an alarm of each priority and confirm the color, the symbol, the blink, the tone, the banner entry, the summary entry, and the display marker.',
          'Acknowledge each and confirm the blink stops, the tone stops, and the indication remains until the condition clears.',
          'Clear a condition without acknowledging and confirm the return-to-normal state is shown until acknowledged.',
          'View the displays in grayscale, or with a colorblindness simulator, and confirm priority is still readable.',
          'Stand at the back of the control room with the display at normal brightness and confirm a high alarm is visible.',
          'Confirm nothing but alarms uses the alarm colors, and nothing but unacknowledged alarms blinks.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why not use green for normal and red for alarm?',
        a: 'Because then red and green are everywhere, and an alarm is one red thing among many. Normal is shown in the muted display palette so that the alarm colors stand out. Green, in particular, is avoided as a status color on high-performance displays because it competes with the alarm palette and because red-green is the most common form of colorblindness.',
      },
      {
        q: 'Should the alarm banner be on every screen?',
        a: 'Yes. An operator on any display must see that a new alarm exists and its priority. The banner is small, a few lines, and it is the same on every display. The summary is the full list on its own display.',
      },
      {
        q: 'What about alarms on remote client screens and phones?',
        a: 'The same states and the same priority scheme, with whatever the device can render. A phone notification carries the priority in words and the message; the acknowledgment from the phone is logged like any other, if the site permits it.',
      },
      {
        q: 'How do I show a device that is out of service?',
        a: 'With a clear marker on the device symbol and on its faceplate, a distinct entry in the out-of-service list, and its alarms suppressed by that state. The marker must be obvious enough that an operator does not expect the device to respond, and the list must be reviewed so devices do not stay out of service by neglect.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/scada-hmi/hmi-design/faceplates',
    ],
  },
  {
    path: '/controls/scada-hmi/hmi-design/navigation',
    kind: 'reference',
    title: 'HMI Navigation',
    summary:
      'How operators move through the displays: the display hierarchy from overview to detail, a fixed navigation bar with area alarm indication, one-click paths from an alarm to the device, the rules that keep any display within two clicks, and what to leave out.',
    answer:
      'HMI navigation is the structure and the controls that let an operator reach any display in the system quickly and predictably. ISA-101 practice organizes displays in a hierarchy of overview, area, unit, and detail levels, provides a navigation bar that is identical on every display and shows the alarm state of each area, and adds context links from alarms, devices, and values to the displays that explain them. The goal is that any display is reachable in two clicks and that an operator always knows where they are.',
    keyPoints: [
      'Four levels: overview, area, unit, detail. Every display has a place in the hierarchy.',
      'The navigation bar is identical on every display and carries the area alarm indicators.',
      'Two clicks to anywhere. Three is a design failure.',
      'Every alarm, device, and value links to the display that explains it.',
      'Fewer displays, well organized, beat many displays with everything on them.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['HMI', 'SCADA', 'Design', 'ISA'],
    blocks: [
      { t: 'h2', text: 'The hierarchy' },
      {
        t: 'p',
        text: 'ISA-101 describes displays in levels, and the levels are what make navigation possible. Without them, a system of eighty displays is a maze; with them, it is a tree the operator can hold in their head.',
      },
      {
        t: 'table',
        head: ['Level', 'Purpose', 'Content', 'Example'],
        rows: [
          ['1, Overview', 'The state of the whole system at a glance; the display that is up when nothing is happening', 'Key values with embedded trends, area alarm indicators, high-level status; very little control', 'The utility: plant, distribution, collection, each as a block with its health'],
          ['2, Area', 'The state of one area and the control that area needs', 'The process in that area as a simplified diagram, the important values, the devices with status', 'The water plant; the lift stations; the distribution system'],
          ['3, Unit', 'One process unit or one site, with everything needed to operate it', 'The unit diagram, its devices, its loops, its sequence status', 'Filter 3; lift station 12; the high service pump station'],
          ['4, Detail', 'One device, loop, or sequence in full', 'Faceplates, loop detail, sequence step lists, diagnostics', 'Pump P-3 faceplate; the backwash sequence display; the chlorine loop detail'],
        ],
      },
      {
        t: 'p',
        text: 'An operator lives on level 2 and 3 displays, glances at level 1, and opens level 4 when acting or investigating. Every display is assigned to exactly one level and one branch of the tree, and the navigation bar reflects that tree.',
      },
      { t: 'h2', text: 'The navigation bar' },
      {
        t: 'p',
        text: 'A strip in the same place on every display, containing a button for each area and, on area displays, a row for the units in that area. Each button carries the highest priority active alarm in its area as a small indicator, in the alarm color and symbol, so that an operator on any display sees that another area has an alarm. The bar also holds the fixed utilities: the alarm summary, the trend tool, the alarm banner, the user login, and a home button that returns to the overview.',
      },
      {
        t: 'ul',
        items: [
          'Same position, same size, same order on every display. A bar that moves or changes teaches operators to look for it instead of at the process.',
          'The current location highlighted, and the path shown: Overview, Water Plant, Filters, Filter 3.',
          'One click to any area from any display, two clicks to any unit. Detail displays open as pop-ups over the unit display, so the unit context is not lost.',
          'The alarm indicator on each area button is the highest priority unacknowledged alarm in the area; it clears when the alarms are acknowledged and follows the same blink rule.',
          'No more than about eight area buttons; a system with more areas groups them.',
        ],
      },
      { t: 'h2', text: 'Context navigation' },
      {
        t: 'p',
        text: 'The bar gets the operator to a place; context links get them to the thing. Every alarm entry in the banner and the summary links to the display that contains the device, and to the device faceplate. Every device symbol opens its faceplate. Every value with a trend link opens its trend group. A faceplate has a link back to the display it lives on. A sequence status shows the current step and links to the step display. These links are what make two clicks to anywhere true in practice: the operator rarely uses the bar to find a problem, because the problem finds them and links them to itself.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Test navigation from the alarm',
        text: 'For each alarm in the master alarm database, start at the overview, note the alarm in the banner, and count the clicks to the device faceplate. If any path is more than two, either the link is missing or the display hierarchy has a hole. This test takes an afternoon and it finds most navigation problems.',
      },
      { t: 'h2', text: 'What to leave out' },
      {
        t: 'dl',
        items: [
          { term: 'Duplicate paths', def: 'A device that appears on three displays with three different faceplate bindings is three places for a mistake. A device lives on one unit display; other displays show its status and link to it.' },
          { term: 'Deep menus', def: 'A drop-down menu with sub-menus adds clicks and hides the alarm indication. The bar is flat.' },
          { term: 'Hidden navigation', def: 'Clicking on an unlabeled region of a diagram to go somewhere. Navigation controls look like navigation controls.' },
          { term: 'Popup chains', def: 'A faceplate that opens a detail that opens a diagnostic that opens a trend. Two levels of popup at most, with a clear close on each.' },
          { term: 'Per-client differences', def: 'Every client, in the control room, at the plant, and remote, uses the same navigation. An operator who moves between them should not relearn.' },
          { term: 'Screens nobody uses', def: 'A display that has not been opened in a year, as the SCADA usage log shows, is either merged into another or removed. Every display costs maintenance.' },
        ],
      },
      { t: 'h2', text: 'Multiple monitors and remote clients' },
      {
        t: 'p',
        text: 'A control room with several monitors commonly fixes the overview on one, the alarm summary on another, and uses the rest for area and unit displays. The navigation bar behaves the same on each, and a display opened from an alarm opens on the monitor the operator is working on, not on a fixed one. Remote and mobile clients get the same hierarchy with the layout adapted to the screen; what they do not get is a different structure. An operator who knows the plant HMI knows the phone client.',
      },
    ],
    faqs: [
      {
        q: 'How many displays should a utility SCADA system have?',
        a: 'As few as the hierarchy needs. A mid-size utility often lands at one overview, three to five area displays, a unit display per plant process and one per remote site type with a site selector, and the detail displays that the faceplates and sequences generate. Fifty well-structured displays serve better than two hundred accumulated ones.',
      },
      {
        q: 'Should the overview have any control on it?',
        a: 'Very little. The overview is for seeing; control happens on unit displays and faceplates. A start button on the overview is a start button an operator can press while looking at the wrong thing.',
      },
      {
        q: 'Where does the alarm summary live in the hierarchy?',
        a: 'Outside it, as a utility display reachable from the bar on every screen. It is a view across all areas and does not belong to one.',
      },
      {
        q: 'How do I handle a system with many identical remote sites?',
        a: 'One unit display template with a site selector, so the operator picks a station and the display binds to it. The alarm link from the banner opens the template bound to the station in alarm. This is far better than eighty copies of a display that diverge over time.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/hmi-design/alarm-indication',
      '/controls/scada-hmi/hmi-design/faceplates',
      '/controls/scada-hmi/hmi-design/trends',
    ],
  },
  {
    path: '/controls/scada-hmi/historian-data/historian-architecture',
    kind: 'reference',
    title: 'Historian Architecture',
    summary:
      'How process history is collected, stored, and served: the collector, the archive, and the client layers, where the historian sits relative to SCADA and the DMZ, single-server and tiered designs for a utility, the store-and-forward buffer that survives outages, and the sizing that decides how many years fit on a disk.',
    answer:
      'A historian is a time-series database built for process data, with a collector that reads tags from SCADA or directly from controllers, an archive that stores the values compactly by time, and a server that answers queries from trends, reports, and analysis tools. In a utility it usually runs on the SCADA server or beside it in the control zone, replicates to a read-only copy in the DMZ for business users, buffers data locally at collectors so an outage does not lose history, and is sized by tag count, collection rate, and retention. The architecture decides whether the data is complete, whether it is available where people need it, and whether it survives the server it lives on.',
    keyPoints: [
      'Three layers: collectors that read, an archive that stores, a server that answers queries.',
      'Collect at the source. A historian fed only through SCADA inherits every SCADA gap.',
      'Store-and-forward at every collector, so an outage delays data instead of losing it.',
      'One historian in the control zone; a replica in the DMZ for everyone else.',
      'Size it by tags, rate, and retention, and plan the archive for years, not months.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'Design', 'Networking', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'The three layers' },
      {
        t: 'dl',
        items: [
          { term: 'Collectors', def: 'Software that reads values from a source and sends them to the archive: an OPC or a native driver reading the SCADA tag database, a driver reading controllers directly, a calculation engine producing derived tags, a manual entry interface for lab results. Each collector runs where it can see its source and buffers what it reads until the archive acknowledges it.' },
          { term: 'The archive', def: 'The time-series store: for each tag, a sequence of timestamp, value, and quality, compressed and indexed by time. Not a general relational database, although some historians sit on one; the access pattern, append at the end and read ranges by time, is what the store is built for.' },
          { term: 'The server', def: 'The service that answers queries: raw values in a range, interpolated or sampled values at an interval, aggregates such as averages and totals, and event frames. Trend clients, reports, spreadsheets, and analysis tools all talk to it, and it is the layer that is exposed to users.' },
        ],
      },
      { t: 'h2', text: 'Where it sits' },
      {
        t: 'p',
        text: 'In the Purdue and zone models the historian is a control zone system, because it reads from controllers and SCADA and because its data is operational. Business users need the data too, and they do not get into the control zone to read it. The standard arrangement is a primary historian in the control zone collecting everything, and a replica or a relay in the industrial DMZ that the primary pushes data to, which the business network reads. The DMZ copy is read-only, holds whatever subset the business needs, and can be rebuilt from the primary. The push is outbound from the control zone, never a pull from the DMZ, and the DMZ design page explains why.',
      },
      {
        t: 'table',
        head: ['Design', 'Where the pieces run', 'Fits', 'Watch for'],
        rows: [
          ['Historian on the SCADA server', 'Collector, archive, and server on the same machine as SCADA', 'Small utilities; a single-server SCADA', 'One machine to lose; disk and CPU shared with SCADA; a SCADA rebuild must restore the archive too'],
          ['Dedicated historian server', 'Collectors on the SCADA servers; archive and server on their own machine', 'Mid-size utilities; redundant SCADA', 'The archive machine needs its own backup and its own redundancy decision'],
          ['Tiered', 'Site historians at plants collecting locally; a central historian aggregating', 'Multi-plant utilities; sites with intermittent links', 'Two configurations to maintain; tag naming consistent across tiers'],
          ['Cloud or hosted tier', 'The control zone historian pushes to a hosted service for analytics and business access', 'Utilities wanting analytics without building it', 'Outbound only; the control zone keeps the authoritative copy; what the contract says about data ownership'],
        ],
      },
      { t: 'h2', text: 'Collecting at the source' },
      {
        t: 'p',
        text: 'A historian can collect from the SCADA tag database, which is convenient, because every tag is already there with its description and scaling. It inherits every gap SCADA has: a driver outage, a SCADA server failover, a tag that SCADA polls slowly, a value SCADA clamps or rounds. For the tags that matter most, compliance values, flow totals, and anything analyzed later, a collector reading the controller directly, with its own poll and its own buffer, is more complete. Many utilities collect the bulk through SCADA and the critical few at the source; the data collection page covers rates and deadbands.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Store-and-forward is not optional',
        text: 'A collector that sends values to the archive and discards them if the archive does not answer loses data on every network hiccup, server restart, and failover. Every collector buffers locally, to disk, for at least as long as the longest outage the design anticipates, and forwards when the archive is back. The buffer size is a design parameter and is tested by stopping the archive and confirming the data arrives afterward.',
      },
      { t: 'h2', text: 'Redundancy and backup' },
      {
        t: 'p',
        text: 'The historian archive is the utility memory: the compliance record, the trend that explains an incident, the year of data behind a capacity decision. Its redundancy decision is separate from the SCADA redundancy decision. Options range from a single server with nightly backups of the archive files, which loses a day on a disk failure, through a mirrored pair of historians fed by the same collectors, to the tiered design where the central historian is the backup for each site. Whatever the choice, the archive files are on the backup list, the backup is restored on a test schedule, and the restore is timed.',
      },
      { t: 'h2', text: 'Sizing' },
      {
        t: 'p',
        text: 'The archive grows by the number of values stored per day, which is the tag count times the rate at which each tag changes enough to be stored, times the bytes per value after compression. A utility with 5,000 tags, most on deadband collection storing a few values a minute, stores on the order of a few hundred megabytes a day and a hundred gigabytes a year, which fits on ordinary disks for a decade. The numbers move fast with collection rate: 5,000 tags at one-second full collection is fifty times that. The design sets the rate per tag from what the value is for, keeps the compliance tags at the rate the rule requires, and plans the disk for the retention policy plus growth.',
      },
    ],
    faqs: [
      {
        q: 'Do we need a historian if SCADA keeps trends?',
        a: 'SCADA trend buffers are usually short, a few days to a few weeks, on the SCADA server, in a format only SCADA reads. A historian keeps years, serves reports and spreadsheets, survives the SCADA server, and is where compliance records live. Any utility that reports to a regulator from its data needs one, and most SCADA platforms include one.',
      },
      {
        q: 'Should the historian collect from the PLCs or from SCADA?',
        a: 'From SCADA for the bulk, because the tags are already named and scaled there. From the controllers directly for the tags where completeness matters, so a SCADA problem does not become a data gap. Direct collection adds a driver connection to each controller; count it against the controller connection limits.',
      },
      {
        q: 'How do business users get the data?',
        a: 'From the DMZ replica, through the historian client tools, a web portal, or a spreadsheet add-in that queries the DMZ server. Never by a connection into the control zone, and never by the SCADA client on an office computer.',
      },
      {
        q: 'What happens to the historian when the SCADA server is rebuilt?',
        a: 'If the historian is on the SCADA server, its archive is restored from backup as part of the rebuild, and every collector has been buffering in the meantime. If it is on its own server, nothing happens to it, and the collectors on the rebuilt SCADA server reconnect. The second answer is the reason for the dedicated server.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/historians',
      '/controls/scada-hmi/historian-data/data-collection',
      '/controls/scada-hmi/historian-data/compression',
      '/cybersecurity/network-segmentation/dmz-design',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
      '/cybersecurity/backups/what-to-back-up',
    ],
  },
  {
    path: '/controls/scada-hmi/historian-data/data-collection',
    kind: 'reference',
    title: 'Historian Data Collection',
    summary:
      'Deciding what the historian stores and how often: polled versus exception collection, the deadband per tag, rates for control loops, levels, totals, and compliance values, timestamps at the source, quality codes, calculated tags, and the tag list review that keeps a historian from filling with noise and missing what matters.',
    answer:
      'Historian data collection is configured per tag: the source, the collection mode, the rate or the deadband, and how the timestamp and quality are handled. Fast-changing control values are collected at a rate matched to the loop; slow values on a deadband that stores a new point only when the value moves; compliance values at the interval the rule requires regardless of change; and digital states on every change. The timestamp comes from the source where the source has a clock, quality is stored with every value so a gap is a gap and not a zero, and the tag list is reviewed on a schedule against what the trends and the reports actually use.',
    keyPoints: [
      'Configure per tag, from what the value is for. One rate for everything is wrong for most of them.',
      'Deadband collection stores changes; polled collection stores samples. Use both, deliberately.',
      'Compliance values are collected at the required interval whether or not they changed.',
      'Quality is stored with the value. A gap must read as a gap, never as zero or as the last value.',
      'Review the tag list against the trends and reports. Add what is missing, and stop collecting what nobody reads.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'Design', 'Documentation', 'Analog'],
    blocks: [
      { t: 'h2', text: 'Two collection modes' },
      {
        t: 'dl',
        items: [
          { term: 'Polled or periodic', def: 'The collector samples the value at a fixed interval and stores every sample. Simple, predictable, and the right mode for a compliance value that must exist at every interval. Wasteful for a value that does not move: a tank level sampled every second stores 86,400 nearly identical points a day.' },
          { term: 'Exception or deadband', def: 'The collector watches the value and stores a new point when it changes by more than a deadband from the last stored point. A steady value stores nothing; a moving one stores every meaningful step. Efficient, and the mode most tags use. Its risk is a deadband set so wide that real movement is lost, or so narrow that noise is stored.' },
          { term: 'Hybrid', def: 'Deadband with a maximum interval, so a steady value still stores a point every few minutes as proof of life. The usual configuration.' },
        ],
      },
      { t: 'h2', text: 'Rates and deadbands by value type' },
      {
        t: 'table',
        head: ['Value', 'Mode', 'Rate or deadband', 'Why'],
        rows: [
          ['Pressure or flow in a control loop', 'Polled, or deadband with a small band', '1 to 5 s', 'Loop tuning and oscillation analysis need the dynamics'],
          ['Wet well or tank level', 'Deadband with a maximum interval', 'A fraction of an inch; a maximum interval of a minute', 'Cycles and rates of change matter; the value moves slowly'],
          ['Chlorine residual, turbidity, pH', 'Polled at the compliance interval, plus deadband', 'Every 15 minutes for compliance; deadband between for the trend', 'The rule requires a value at the interval regardless of change'],
          ['Flow totals', 'Polled', 'Every minute or every hour, plus a daily snapshot', 'Totals are read at fixed times; a missing sample breaks the arithmetic'],
          ['Motor current, speed, power', 'Deadband', 'A percent of range', 'Wear trends and clog detection'],
          ['Digital states: run, fault, mode, valve position', 'Every change', 'No deadband', 'Events; every transition is a fact'],
          ['Alarm states', 'Every change', 'Through the alarm journal', 'Alarm analysis needs every event'],
          ['Setpoints and tuning', 'Every change', 'No deadband', 'Who changed what and when; rarely changes'],
          ['Communication status, poll success', 'Every change plus a periodic', 'A minute', 'Telemetry health'],
          ['Weather, rain gauge', 'Polled', 'Every minute for rain; every 15 minutes otherwise', 'Correlation with inflow'],
        ],
      },
      { t: 'h2', text: 'Timestamps' },
      {
        t: 'p',
        text: 'A value has a time at which it was true, and the historian stores that time. Where the source has a synchronized clock, a controller or an RTU with time, the timestamp travels with the value and the historian keeps it, so a value that was buffered through an outage lands at the time it happened, not the time it arrived. Where the source has no clock, the collector timestamps it on receipt, and the collection latency is the error. Every clock in the system, controllers, SCADA servers, historian, is synchronized to one time source. A historian with values timestamped by three unsynchronized clocks cannot say which of two events came first.',
      },
      { t: 'h2', text: 'Quality' },
      {
        t: 'p',
        text: 'Every stored value carries a quality: good, bad, uncertain, with a reason. When the driver loses the device, the collector stores a bad-quality marker at the time of the loss, and the trend shows a gap. When the device returns, a good value resumes. A historian that stores the last good value through an outage, or a zero, produces a trend that shows a steady level while the station was unreachable, and the report that comes from it is wrong. Collectors are configured to store quality transitions, trend clients draw gaps for bad quality, and reports exclude or flag bad-quality intervals.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A flat line is not a steady process',
        text: 'The most common historian misreading is a flat trend interpreted as a stable value when it is a frozen tag, a lost connection, or a collector that stopped. Quality markers make the gap visible. A trend of a wet well level that has not moved an inch in six hours is either a dry station or a dead collector, and the quality says which.',
      },
      { t: 'h2', text: 'Calculated tags' },
      {
        t: 'p',
        text: 'Historians compute derived values from stored ones: a daily flow total from a rate, a pump run time from the run status, a starts count, a specific capacity from level and flow, a CT from residual and flow, a rolling average. Calculations run in the historian rather than the controller when they are for reporting rather than control, when they need history to compute, or when the controller has no spare capacity. Each calculation is documented as a tag with its formula and its inputs, so that a report reader can trace a number to its sources.',
      },
      { t: 'h2', text: 'The tag list review' },
      {
        t: 'steps',
        items: [
          { title: 'Export the collection configuration', text: 'Every tag with its mode, rate, deadband, and source.' },
          { title: 'Compare with what is used', text: 'The historian usage log, the trend groups, the reports, and the compliance list. A tag collected at one second that no trend or report reads is a candidate for a slower rate or removal; a value that operators keep asking for and cannot find is a candidate to add.' },
          { title: 'Check the deadbands against the trends', text: 'A trend that looks stepped is a deadband too wide; one that is fuzzy is a deadband narrower than the noise.' },
          { title: 'Check the compliance tags', text: 'Every value the permit requires is collected at or faster than the required interval, in polled mode, with quality.' },
          { title: 'Check the gaps', text: 'The bad-quality intervals over the period, by tag, and their causes. A tag with frequent gaps has a collection or a communication problem.' },
          { title: 'Record the changes', text: 'The collection configuration is a document under change control; the review updates it.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'What deadband should I use?',
        a: 'Larger than the measurement noise and smaller than the change that matters. For a level in feet with an inch of noise, a deadband of a couple of inches stores the cycles and ignores the ripple. Look at the raw trend, note the noise band, and set the deadband above it. Then look at the stored trend and confirm nothing meaningful is missing.',
      },
      {
        q: 'Should I collect everything at one second and sort it out later?',
        a: 'No. The archive fills with noise, the trends of slow values become unreadable without resampling, and the queries slow down. Collect each tag for its purpose. Storage is cheap, but a historian that stores fifty times more than it needs is harder to back up, to replicate, and to query.',
      },
      {
        q: 'How do I know the historian is collecting?',
        a: 'A collector status tag per collector, alarmed, and a daily check that the compliance tags have values at every interval. A calculated tag that counts stored points per hour for a critical tag, alarmed when it drops, catches a stalled collector before the monthly report does.',
      },
      {
        q: 'What about data from the lab and manual readings?',
        a: 'Manual entry tags in the historian, with the sample time as the timestamp and the person as an attribute, so that lab results sit beside the online values on the same trend. Many historians provide a manual entry interface; where they do not, a spreadsheet import on a schedule does the job.',
      },
    ],
    related: [
      '/controls/scada-hmi/historian-data/historian-architecture',
      '/controls/scada-hmi/historian-data/compression',
      '/controls/scada-hmi/hmi-design/trends',
      '/controls/scada-hmi/scada-fundamentals/historians',
      '/troubleshooting/scada-troubleshooting/values-frozen-on-screen',
    ],
  },
  {
    path: '/controls/scada-hmi/historian-data/compression',
    kind: 'reference',
    title: 'Historian Compression',
    summary:
      'How historians store years of data on a disk: exception deadbands at the collector, swinging door compression at the archive, what each discards and what it keeps, the settings that turn a trend into a staircase, lossless alternatives, and how to check that the compressed data still tells the truth.',
    answer:
      'Historian compression reduces stored data by keeping only the points needed to reconstruct the signal within a tolerance: an exception deadband at the collector drops values that have not moved, and a swinging door algorithm at the archive drops values that lie on a straight line between kept points, within a compression deviation. Both are lossy by design, the loss is the deviation setting, and a deviation set wider than the process detail turns a trend into a sequence of straight segments. Modern storage makes aggressive compression unnecessary for most utilities; the settings are chosen per tag from what the trend must show, and checked by comparing raw and stored data on the tags that matter.',
    keyPoints: [
      'Two stages: exception at the collector, compression at the archive. Each has a deviation setting.',
      'Swinging door keeps the points that a straight line cannot predict within the deviation.',
      'The deviation is the loss. Set it below the detail the trend must show.',
      'Storage is cheap now. Aggressive compression solves a problem most utilities no longer have.',
      'Verify by trending raw against stored on a critical tag. If they differ visibly, the setting is wrong.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['SCADA', 'Design', 'Analog'],
    blocks: [
      { t: 'h2', text: 'Why compress at all' },
      {
        t: 'p',
        text: 'Historians were designed when disk was expensive and a plant had tens of thousands of tags. Storing every sample of every tag was impossible; storing only what was needed to redraw the signal was the solution, and the algorithms that do it are still in every historian. Disk is now cheap and a utility has thousands of tags, not hundreds of thousands, so the pressure is gone. What remains is that compression, well set, produces a cleaner archive and faster queries, and, badly set, produces a record that has lost the thing someone will later need to see. The settings deserve the same attention as the collection rates.',
      },
      { t: 'h2', text: 'Exception and compression' },
      {
        t: 'table',
        head: ['Stage', 'Where', 'Rule', 'Setting', 'What it removes'],
        rows: [
          ['Exception', 'At the collector, before sending', 'Send a value only if it differs from the last sent value by more than the exception deviation, or if the maximum time has passed', 'Exception deviation and maximum interval', 'Repeats of the same value; noise within the deviation'],
          ['Compression', 'At the archive, before storing', 'Store a value only if a straight line from the last stored point cannot pass within the compression deviation of every value since; the swinging door', 'Compression deviation and maximum interval', 'Points that lie on a straight trend within the deviation'],
        ],
      },
      {
        t: 'p',
        text: 'The two work together: exception thins the stream from the source, compression thins it again at the archive. Typical guidance sets the exception deviation to a little more than the measurement noise and the compression deviation to about twice the exception deviation. Both have a maximum interval, so that a perfectly steady value still stores a point periodically.',
      },
      { t: 'h2', text: 'Swinging door' },
      {
        t: 'p',
        text: 'The compression algorithm most historians use is swinging door trending. When a value arrives, the archive asks whether a single straight line could be drawn from the last stored point through all the values received since, staying within the compression deviation of each. If yes, the newest value is held as a candidate and nothing is stored. If no, the previous candidate is stored as a new anchor and the line starts again from it. The result is a set of stored points from which the original signal can be reconstructed by straight-line interpolation within the deviation, and the count of stored points depends on how often the signal changes direction, not on how often it was sampled.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'What is lost is the shape between anchors',
        text: 'Swinging door preserves the values at the anchors and guarantees the interpolated line stays within the deviation of every original value. It does not preserve the fine shape: a small oscillation within the deviation band disappears, a brief spike narrower than the band may be reduced, and a curve becomes a chord. For a level trend that is fine. For a pressure loop being tuned, where the oscillation is the signal, it is not, and the deviation for that tag is set to zero or the tag is exempted.',
      },
      { t: 'h2', text: 'Settings by tag' },
      {
        t: 'table',
        head: ['Tag', 'Exception', 'Compression', 'Note'],
        rows: [
          ['Control loop PV, during tuning or analysis', 'Small, at the noise level', 'Zero, or off', 'The dynamics are the point'],
          ['Level', 'A fraction of an inch', 'An inch or so', 'The cycles survive; the ripple does not'],
          ['Compliance analyzer value', 'Small', 'Zero or very small', 'The record should be the measurement, not a reconstruction'],
          ['Flow rate', 'A percent of range', 'Two percent', 'Totals come from a separate totalizer tag, not from integrating compressed rate'],
          ['Motor current', 'A percent of range', 'Two percent', 'Wear trends are slow'],
          ['Digital states', 'None', 'None', 'Every transition is stored'],
          ['Setpoints', 'None', 'None', 'Every change is stored'],
          ['Totalizers', 'None', 'None', 'A total is a fact at a time; never compress'],
        ],
      },
      { t: 'h2', text: 'The staircase and the flat line' },
      {
        t: 'p',
        text: 'Two symptoms say the settings are wrong. A trend that looks like a staircase, flat segments joined by steps, has an exception deviation wider than the movement of the value; the historian only stored the value when it had moved a whole step. A trend that is a straight line across hours while the value was moving has a compression deviation wider than the movement. Both are found by trending the live value from SCADA beside the stored value from the historian on the same chart. The live one is the truth; the stored one should match it as closely as the deviation allows.',
      },
      { t: 'h2', text: 'Lossless and modern alternatives' },
      {
        t: 'p',
        text: 'Some historians and time-series databases now offer lossless compression, encoding the raw samples compactly without discarding any, at storage costs that are acceptable for utility tag counts. Where the platform offers it, a utility can store every sample of its critical tags losslessly and use deviation compression only on the bulk. The choice is per tag, and the compliance and the control analysis tags are the first candidates for lossless.',
      },
    ],
    faqs: [
      {
        q: 'What compression deviation should I use?',
        a: 'For most analog tags, about twice the exception deviation, which is itself a little above the noise: for a level with an inch of noise, an exception of one and a half inches and a compression of three. Then trend live against stored and adjust. For anything analyzed later, tighter, down to zero.',
      },
      {
        q: 'Does compression affect totals and averages?',
        a: 'Averages and totals computed from compressed data are approximations within the deviation, which is usually fine for a daily average level and not fine for a billing or a compliance total. Totals come from a totalizer tag in the controller stored uncompressed, never from integrating a compressed rate.',
      },
      {
        q: 'Can I turn compression off?',
        a: 'Yes, for a tag or for the archive, and with modern storage many utilities do for their critical tags. The archive grows faster and queries return more points; the platform documentation gives the storage estimate. A middle path is a small deviation, which removes the noise and little else.',
      },
      {
        q: 'Why does the historian trend not match the SCADA trend?',
        a: 'The historian is showing compressed data and the SCADA buffer is showing raw samples, or the two are drawn at different sampling. A visible difference on a value that matters means the deviation is too wide; a small smoothing on a noisy value is expected.',
      },
    ],
    related: [
      '/controls/scada-hmi/historian-data/data-collection',
      '/controls/scada-hmi/historian-data/historian-architecture',
      '/controls/scada-hmi/hmi-design/trends',
      '/controls/plc-systems/analog-control/deadband',
      '/controls/plc-systems/analog-control/filtering',
    ],
  },
  {
    path: '/controls/scada-hmi/historian-data/reporting',
    kind: 'reference',
    title: 'Reporting from the Historian',
    summary:
      'Turning history into the reports a utility must produce: the monthly operating report, compliance reports for the regulator, daily operator summaries, pump run and energy reports, the calculations behind daily minimums, maximums, and totals, handling bad quality and gaps, and building reports once so they run every month without an engineer.',
    answer:
      'Historian reporting produces the daily, monthly, and compliance documents a utility owes its regulator and its management from the data the historian holds: totals from totalizer tags, daily minimums and maximums and averages from continuous values, run hours and starts from digital states, and compliance values at required intervals with any gaps flagged. Reports are built once as templates against a documented tag list, scheduled to run automatically, reviewed by an operator before submission, and archived with the data behind them. The calculations and the treatment of bad quality are written down, because a compliance number has to be defensible.',
    keyPoints: [
      'Every report number traces to a tag, a calculation, and a time window that are written down.',
      'Totals come from totalizers; averages and extremes come from continuous values with quality respected.',
      'Gaps are reported as gaps, with the reason, never filled silently.',
      'Build the report as a template that runs on a schedule. A report that needs an engineer each month will be late.',
      'An operator reviews and signs before a compliance report leaves the utility.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'Documentation', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'The reports a utility makes' },
      {
        t: 'table',
        head: ['Report', 'Content', 'Frequency', 'Reader'],
        rows: [
          ['Daily operating summary', 'Flows, levels, residuals, chemical usage, pump run times, alarms, for the previous day', 'Daily, automatic, at shift start', 'Operators and the superintendent'],
          ['Monthly operating report', 'Daily values for the month in the form the regulator prescribes: flows, treatment parameters, chemical feeds, with monthly totals, averages, and extremes', 'Monthly', 'The regulator; management'],
          ['Compliance reports', 'The specific values the permit requires at the specific intervals: turbidity, residual, CT, discharge parameters, with exceedances and gaps', 'Monthly, or as the permit says', 'The regulator'],
          ['Pump and equipment reports', 'Run hours, starts, energy, capacity trends per pump; alternation balance', 'Monthly', 'Maintenance'],
          ['Energy report', 'Power and energy by facility and by pump, with cost where tariffs are known', 'Monthly', 'Management'],
          ['Alarm reports', 'Alarm rates, the most frequent alarms, standing alarms, floods', 'Weekly or monthly', 'The alarm management review'],
          ['Event and incident reports', 'The trend and event record for a period, for an investigation', 'On demand', 'The engineer; the regulator when asked'],
        ],
      },
      { t: 'h2', text: 'The calculations' },
      {
        t: 'dl',
        items: [
          { term: 'Totals', def: 'From a totalizer tag in the controller, stored uncompressed, read at the report boundaries: the value at midnight minus the value at the previous midnight, with rollover handled. Never from integrating a stored flow rate, which is compressed and gapped.' },
          { term: 'Daily minimum, maximum, and average', def: 'From the continuous tag over the day, using only good-quality values, with the count of good samples reported beside the result. A daily minimum residual from a day with a six-hour gap is a minimum of eighteen hours and the report says so.' },
          { term: 'Values at an interval', def: 'For compliance tags collected at the required interval: the value at each interval, or the interval marked missing. The historian interpolates by default on many queries; compliance queries ask for the actual sample.' },
          { term: 'Run hours and starts', def: 'From the digital run status: the sum of on durations, and the count of off-to-on transitions, in the period. A state that was on at the boundary is split correctly.' },
          { term: 'Exceedances', def: 'Each interval where a value was above or below a permit limit, with the duration and the peak. Counted, listed, and matched to the alarm journal.' },
          { term: 'Chemical usage', def: 'From day tank levels and deliveries, or from feeder totalizers, with strength corrections where the dose depends on it.' },
        ],
      },
      { t: 'h2', text: 'Bad quality and gaps' },
      {
        t: 'p',
        text: 'A report that fills a gap with the last value, with zero, or with an interpolation, without saying so, produces a compliance record that is wrong in a way an inspector can find. The rule is that a gap is reported as a gap: the interval is marked missing, the reason is given where known, a collector outage, a communication loss, an instrument out of service for calibration, and the statistic that depends on it is computed from what remains and labeled with the coverage. The permit usually says what a missing interval means and what must be done; the report follows it.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Interpolation is not data',
        text: 'Historian query tools interpolate between stored points by default, which is right for a trend and wrong for a compliance report. A query for the residual at 02:15 returns a value on the line between the points at 02:00 and 02:30 even if the analyzer was offline at 02:15. Compliance reports query actual samples with quality, and the report template says so in its documentation.',
      },
      { t: 'h2', text: 'Building a report once' },
      {
        t: 'steps',
        items: [
          { title: 'Write the specification', text: 'Each number on the report: the tag, the calculation, the time window, the quality rule, the units and rounding, and the source of the permit requirement where there is one. This page is the report documentation and it goes with the template.' },
          { title: 'Build the template', text: 'In the historian reporting tool, a spreadsheet with the historian add-in, or a reporting package, against the specification. Tags by name, not by copying values.' },
          { title: 'Test against a known period', text: 'Run the report for a past month and compare every number with the previous method or a hand calculation. Differences are explained before the template is trusted.' },
          { title: 'Schedule it', text: 'Automatic generation on the schedule, to a folder and an email, with the operator review step before anything is submitted.' },
          { title: 'Version it', text: 'The template is a document under change control. A tag renamed in SCADA breaks it, and the change process catches that.' },
          { title: 'Archive it', text: 'Every generated report is kept with the period it covers, alongside the calibration records and the data, for the retention period.' },
        ],
      },
      { t: 'h2', text: 'Review and sign-off' },
      {
        t: 'p',
        text: 'A compliance report is a statement by the utility. An operator or the operator in charge reads it before submission, checks the numbers that look wrong against the trend, notes the gaps and their reasons, and signs. Automatic generation removes the transcription errors that used to fill these reports; it does not remove the need for someone who understands the plant to look at the result. A report that says the residual was zero for a day because a collector stopped should be caught at review, not at the regulator.',
      },
    ],
    faqs: [
      {
        q: 'Can the regulator accept a report generated from the historian?',
        a: 'Yes, in the form the regulator prescribes, and increasingly by electronic submission. What the regulator expects is that the numbers are traceable, that gaps are reported as the rules require, and that the instruments behind them are calibrated and verified with records. The historian report is easier to defend than a handwritten log if the specification exists.',
      },
      {
        q: 'Our daily average residual from the historian differs from the operator log. Why?',
        a: 'The log records grab samples or readings at shift times; the historian averages every good sample over the day. Both are right and they answer different questions. The permit says which it wants. If it wants the continuous average, the historian; if it wants readings at times, the report takes samples at those times.',
      },
      {
        q: 'How should exceedances be counted?',
        a: 'The permit defines the limit, the averaging period, and what counts as an exceedance. The report implements that definition exactly, in the specification, and counts from the historian data at the permit interval. An alarm count from SCADA is not the same thing, because alarm setpoints usually sit below the limit.',
      },
      {
        q: 'What if a tag was renamed and the report shows blanks?',
        a: 'The template references the old name. The change process for SCADA tag renames includes the report templates; when it is missed, the fix is the template, and the blanks for the period are recovered by re-running the report after the fix, since the data was collected under the new name.',
      },
    ],
    related: [
      '/controls/scada-hmi/historian-data/data-collection',
      '/controls/scada-hmi/historian-data/historian-architecture',
      '/controls/scada-hmi/historian-data/compression',
      '/controls/instrumentation/calibration/calibration-documentation',
      '/controls/instrumentation/analytical/turbidity',
      '/controls/scada-hmi/alarm-management/rationalization',
    ],
  },
  {
    path: '/controls/scada-hmi/scada-fundamentals/servers',
    kind: 'reference',
    title: 'SCADA Servers',
    summary:
      'What the servers in a SCADA system do and what a utility should expect of them: the I/O, alarm, historian, and client roles, physical versus virtual, redundancy, sizing, placement, backup, patching, licensing, and monitoring.',
    answer:
      'A SCADA system runs on one or more servers that poll the controllers, evaluate alarms, store history, and serve displays to clients, with the roles combined on one machine in a small system and separated on several in a larger one. Servers are increasingly virtual machines on a hypervisor, which simplifies backup and hardware replacement, and critical systems run redundant pairs with automatic failover. They are sized by tag count, poll rate, client count, and history retention, placed in the supervisory zone with any web or remote access function in a DMZ, kept in a cooled room on a UPS, backed up as both an image and an application export, patched on a schedule, and monitored for disk, memory, service health, and time synchronization.',
    keyPoints: [
      'Four roles: talk to the controllers, evaluate alarms, keep history, serve displays. Combine or split them by size.',
      'Virtual machines are the norm now; the hypervisor host and its storage are the hardware to worry about.',
      'Redundancy is a pair with automatic failover and a client that follows; test the failover, not just the hardware.',
      'Size for tags, poll rate, clients, and retention, with headroom for the next expansion.',
      'Supervisory zone for the servers, DMZ for anything a remote user touches, a cooled room and a UPS for all of it.',
      'Back up the image and the application export; patch on a schedule; monitor disk, memory, services, and time.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['SCADA', 'Design', 'Cybersecurity', 'Networking', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'The roles' },
      {
        t: 'table',
        head: ['Role', 'What it does', 'Notes'],
        rows: [
          ['I/O or tag server', 'Polls controllers and devices through drivers or OPC, holds the current value and quality of every tag, and serves them to everything else', 'Poll load and driver licenses live here; the first thing to size'],
          ['Alarm server', 'Evaluates alarm conditions, manages alarm states and acknowledgments, journals alarm events, drives notification', 'Often the same process as the tag server on small systems'],
          ['Historian', 'Stores time-series data with compression and serves trends and reports', 'Disk and retention are the sizing items; can be a separate product'],
          ['Client or web server', 'Serves displays to thin and web clients, runs scripts and reports', 'Client count and script load; the one a remote user connects to, so it belongs in a DMZ when exposed'],
          ['Database', 'Relational storage for alarm journals, audit trails, configuration, and reports', 'Backed up with the application; a database that fills the disk stops the system'],
          ['Supporting services', 'Time synchronization, directory and authentication, remote access gateway, backup', 'Utilities that the SCADA depends on but that are not SCADA'],
        ],
      },
      { t: 'h2', text: 'Physical or virtual' },
      {
        t: 'p',
        text: 'A physical server per role was the design for years and still exists in small systems and in vendor packages. Most new systems run each server as a virtual machine on one or two hypervisor hosts. The advantages are real: a virtual machine is backed up as a file, restored to different hardware in minutes, snapshotted before a patch, and moved between hosts for maintenance. The costs are that the hosts and their shared storage become the critical hardware, that the hypervisor needs its own patching and skills, and that a single host running everything is a single point of failure dressed up as several servers. Two hosts with the redundant pair split between them, on separate storage or with replication, is the arrangement that keeps the redundancy real.',
      },
      { t: 'h2', text: 'Redundancy' },
      {
        t: 'p',
        text: 'A redundant pair runs the same configuration on two servers; one is active, the other is standby and synchronized, and the clients switch to the standby when the active fails. The details differ by product: some pairs both poll the controllers, some have the standby poll only after failover, some synchronize alarm acknowledgments and some do not. Whatever the product does, the test is to pull the power on the active server during normal operation and watch: clients reconnect within the time the philosophy allows, alarms continue with their states intact, the historian has no gap or a gap that is backfilled, and when the failed server returns it resynchronizes without taking over. Redundancy that was configured and never tested is a second server.',
      },
      { t: 'h2', text: 'Sizing' },
      {
        t: 'ul',
        items: [
          'Tags: the number of points polled, which sets memory, driver load, and license tier. Count the tags in the controllers, not the ones on the screens.',
          'Poll rate: how often each device is read. A thousand tags at one second is a different load from ten thousand at ten seconds, and radio-linked sites poll slowly by necessity.',
          'Clients: each connected client adds display rendering and script load on the client server.',
          'History: tags historized, rate, compression, and retention decide disk. Estimate bytes per sample times samples per day times days, then double it.',
          'Headroom: the next plant expansion, the next ten lift stations, and the tag growth that every upgrade brings. Fifty percent spare is not extravagant.',
        ],
      },
      { t: 'h2', text: 'Placement' },
      {
        t: 'p',
        text: 'The servers belong in the supervisory zone of the network, behind the firewall that separates them from the controllers, with the controllers reachable only through the rules that the polling needs. Anything a user outside the control room touches, a web server, a remote access gateway, a reporting portal, sits in a DMZ so that a compromised remote session reaches the DMZ and not the servers. Physically, they belong in a room with cooling, a UPS sized for the generator start time, clean power, restricted access, and no water pipes overhead, which rules out most plant floor panels and many electrical rooms. A server in a panel next to a drive lives a short and unreliable life.',
      },
      { t: 'h2', text: 'Care and feeding' },
      {
        t: 'dl',
        items: [
          { term: 'Backup', def: 'An image of the virtual machine or the disk, on a schedule, kept off the server and off site, plus an export of the application configuration in the vendor format, so that the project can be restored on a new version of the software. Test a restore once a year.' },
          { term: 'Patching', def: 'Operating system and application patches on a schedule, after the vendor has qualified them, applied to the standby first, with a snapshot before each and a rollback plan.' },
          { term: 'Licensing', def: 'Tag counts, client counts, driver and historian licenses, and the keys or dongles that unlock them. Keep the license files and activation records with the backup; a restored server with no license is a restored server that will not start.' },
          { term: 'Monitoring', def: 'Disk space, memory, CPU, service status, poll success rate, historian queue depth, backup completion, and time synchronization, alarmed to the same place as process alarms. A full disk is the most common cause of a dead SCADA server, and it announces itself for weeks.' },
          { term: 'Lifecycle', def: 'Hardware replaced on a five to seven year cycle, operating systems before they leave support, and the application on the vendor supported versions. A server that cannot be patched is a security finding and an availability risk.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The server nobody owns',
        text: 'A SCADA server is a computer, and computers need someone responsible for backups, patches, disk space, and lifecycle. In many utilities that person is nobody, because the IT department does not touch control systems and the operations staff do not run servers. Name the owner, write the schedule, and put the monitoring alarms where they will be seen.',
      },
    ],
    faqs: [
      {
        q: 'Can a small utility run everything on one server?',
        a: 'Yes, and many do: one machine polling a handful of sites, evaluating alarms, keeping history, and serving two clients. Make it a virtual machine so that it can be backed up and restored easily, put it on a UPS in a decent room, and keep a tested restore. Redundancy comes when the cost of an outage justifies it.',
      },
      {
        q: 'Should the historian be on the same server as the SCADA?',
        a: 'On small systems, yes. On larger ones the historian is separated because its disk and query load interferes with polling and alarms, and because the historian is what reporting and outside users access, which is better done away from the server that controls the plant.',
      },
      {
        q: 'How long should the UPS run?',
        a: 'Long enough for the generator to start and stabilize, with margin, and long enough for a clean shutdown if the generator does not. Fifteen to thirty minutes is common. The UPS also feeds the network switches, the firewall, and the time server; a server with power and no network is not much use.',
      },
      {
        q: 'What does time synchronization have to do with servers?',
        a: 'Every alarm, event, and history sample carries a timestamp, and clients, servers, controllers, and the historian have to agree on the time or the records cannot be compared. One time source, usually a GPS-disciplined or network time server, synchronizes all of them, and a server that drifts is alarmed.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
      '/controls/scada-hmi/scada-fundamentals/clients',
      '/controls/scada-hmi/historian-data/historian-architecture',
      '/cybersecurity/network-segmentation/dmz-design',
      '/cybersecurity/backups/what-to-back-up',
    ],
  },
  {
    path: '/controls/scada-hmi/scada-fundamentals/clients',
    kind: 'reference',
    title: 'SCADA Clients',
    summary:
      'The workstations, browsers, and mobile devices operators use to see and control the system: thick, thin, web, and mobile clients, roles and permissions, where control is allowed from, workstation design, session policy, licensing, and failover behavior.',
    answer:
      'A SCADA client is the software and the screen through which an operator watches and controls the process. Thick clients run the full runtime on a workstation and are the control room standard; thin and web clients render displays served by a server and cost less to deploy and maintain; mobile clients give supervisors and on-call staff a view and limited acknowledgment. Every client authenticates a user with a role that decides what can be seen and what can be commanded, control is permitted only from clients in the control room or a defined location, operator workstations are dedicated and locked down, sessions time out, and clients are configured to follow a redundant server pair automatically. The count and type of clients is a licensing and a security decision as much as a convenience.',
    keyPoints: [
      'Thick client for the control room, web client for everywhere else, mobile for view and acknowledgment only.',
      'A user, a role, and a location decide what a client can do; control from outside the control room needs a deliberate exception.',
      'Operator workstations are dedicated to SCADA: no email, no browsing, kiosk mode, no local administrator.',
      'Individual logins with a shared operator view; a shift change is a login, and the audit trail shows who did what.',
      'Clients follow the redundant pair automatically, and the operator is told which server is active.',
      'Every client is a license and an attack surface; count both.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'HMI', 'Cybersecurity', 'Design', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'Client types' },
      {
        t: 'table',
        head: ['Type', 'How it works', 'Best for', 'Watch out for'],
        rows: [
          ['Thick client', 'The full SCADA runtime installed on a workstation, connected to the servers', 'Control room operator stations; full performance, full control', 'Software to install, patch, and license on every machine'],
          ['Thin client', 'A terminal that displays a session running on a server', 'Plant floor and office stations where nothing should be installed locally', 'Server load per session; the terminal server is a critical machine'],
          ['Web client', 'A browser renders displays served by a web server', 'Supervisors, offices, remote view, mobile devices', 'Browser security; which functions the web client is allowed; the web server sits in a DMZ when exposed'],
          ['Mobile app', 'A vendor app or a mobile-formatted web display', 'On-call staff: view, alarm acknowledgment, notification', 'Control from a phone is a policy question with a default answer of no'],
          ['Panel HMI', 'A local operator interface on a panel, sometimes a SCADA client, sometimes its own device', 'Local operation at the equipment', 'Consistency with the SCADA displays; who can do what from the panel'],
        ],
      },
      { t: 'h2', text: 'Users, roles, and location' },
      {
        t: 'p',
        text: 'Every client session belongs to a logged-in user with a role. A viewer sees and cannot command. An operator commands the equipment the role covers. A supervisor changes setpoints outside operator limits, shelves alarms, and bypasses permissives. An engineer changes configuration. Those roles are defined once in the philosophy and applied by the platform. The location of the client is a second dimension: a control room client with an operator logged in can command; the same operator on a web client in a truck should not, unless the utility has decided that remote operation is acceptable, in which case the conditions are written down. Most platforms can restrict control by client station as well as by user, and both should be used.',
      },
      { t: 'h2', text: 'The operator workstation' },
      {
        t: 'ul',
        items: [
          'Dedicated to SCADA: no email, no web browsing, no document editing. A workstation that does other things gets malware from other things.',
          'Locked down: the operator account cannot install software, change network settings, or reach the file system; the SCADA client starts at boot and fills the screens; a kiosk configuration.',
          'Individual logins: each operator logs in with their own credentials at shift change, so the audit trail names a person. A shared operator account defeats the audit trail and the incident investigation.',
          'Screens: two to four monitors arranged by the display hierarchy, with the overview always visible and alarms always visible, at a size and distance that the text is readable from the chair.',
          'Hardware: a business-class or industrial workstation on the UPS, with spares, and a replacement plan; a client that fails on a Sunday night should be replaceable by the operator with a spare and a checklist.',
          'Audible alarm: a horn or a speaker driven by the client or by a separate annunciator, with the acknowledgment on the client.',
        ],
      },
      { t: 'h2', text: 'Sessions and failover' },
      {
        t: 'p',
        text: 'Sessions time out after inactivity, to a view-only state rather than a logout in the control room, so that a screen is never left commanding under a departed operator and a returning operator is never locked out of the overview. Clients are configured with both servers of a redundant pair and switch automatically when the active server fails; the operator sees a brief indication and the displays continue. The switch is tested as part of the failover test, from every client type, because a thick client that follows and a web client that hangs is a common finding. Display of which server is active belongs on every client.',
      },
      { t: 'h2', text: 'Licensing and count' },
      {
        t: 'p',
        text: 'Clients are licensed by concurrent connection, by named installation, or by type, and the count is easy to exceed when web clients are cheap to add. The count is also a security decision: every client is a machine that can reach the SCADA servers, and a web client in a manager office extends the SCADA network into the office. Decide who needs a client, of which type, with which role and from where, write it down, and revisit it when someone asks for one more.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'View-only by default',
        text: 'The safest client is one that cannot command anything, and most people who ask for SCADA access need only to see. Give the office, the phone, and the engineer at home a view-only client, and keep control in the control room and at the equipment. Anyone who needs more explains why, and the answer is recorded in the access list.',
      },
    ],
    faqs: [
      {
        q: 'Should operators have individual logins or a shared operator account?',
        a: 'Individual logins. The audit trail, the alarm acknowledgment record, and the incident investigation all depend on knowing who was at the console. A shared account is convenient for exactly as long as nothing goes wrong. Make the login quick, with a badge or a short credential, and make the session time out to view-only rather than locking the screen.',
      },
      {
        q: 'Is a web client as good as a thick client?',
        a: 'For viewing and for many operator functions on modern platforms, yes. For the control room, a thick client still gives the most predictable performance, the most complete function set, and the fewest dependencies. Use the thick client where control happens and web clients everywhere else.',
      },
      {
        q: 'Can an on-call operator control from a phone?',
        a: 'The platform can allow it; the question is whether the utility should. Acknowledging an alarm and viewing the system from a phone is reasonable. Starting a pump from a phone at 3 a.m., with no view of the site and a screen the size of a hand, is a risk the utility must consciously accept, in writing, with the conditions. Most do not.',
      },
      {
        q: 'What happens on the client when the server fails over?',
        a: 'A correctly configured client reconnects to the standby within seconds, shows a message, and continues with the same displays; alarm states and acknowledgments carry over on platforms that synchronize them. A client that shows stale data with no indication is the dangerous case; every platform can show communication status on the display, and it should be on every one.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/servers',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
      '/controls/scada-hmi/hmi-design/navigation',
      '/cybersecurity/remote-access/jump-hosts',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
    ],
  },
  {
    path: '/controls/scada-hmi/scada-fundamentals/alarm-servers',
    kind: 'reference',
    title: 'Alarm Servers',
    summary:
      'The part of SCADA that turns a condition into an alarm and manages its life: where detection happens, the alarm state machine, priority, deadband and delays, acknowledgment across clients, the journal, notification, redundancy, timestamps, and flood behavior.',
    answer:
      'The alarm server evaluates alarm conditions, or receives them already evaluated from the controller, and manages each alarm through its states: normal, unacknowledged, acknowledged, returned to normal but unacknowledged, shelved, suppressed by design, and out of service. It applies priority, deadband, and on and off delays, propagates acknowledgment to every client, writes every transition to a journal with a timestamp, and hands alarms to the notification system. In a redundant pair the alarm states and acknowledgments are synchronized, timestamps come from the source where the controller supports it, and under a flood the server buffers rather than drops. It also produces the measures an alarm philosophy calls for: alarm rate, standing alarms, chattering alarms, and the most frequent alarms.',
    keyPoints: [
      'Detect in the controller where possible; the server manages the alarm, the controller decides that the condition exists.',
      'The alarm state machine has more than on and off; shelved, suppressed, and out of service are states with rules.',
      'Deadband and delay belong to every analog alarm; without them the alarm chatters.',
      'An acknowledgment on one client is an acknowledgment everywhere, and it is journaled with the user.',
      'Timestamps from the source are better than timestamps from the server; sequence of events depends on it.',
      'The alarm server produces the alarm rate and the bad actor list; if it cannot, the philosophy cannot be measured.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['SCADA', 'Alarms', 'ISA', 'Design', 'Standards'],
    blocks: [
      { t: 'h2', text: 'Where the alarm is detected' },
      {
        t: 'p',
        text: 'An alarm condition can be evaluated in the controller, which compares the value with the limit and sets a bit, or in the SCADA server, which compares the value it polled with a limit configured on the tag. Detection in the controller is preferred for anything that matters: the controller sees every scan, not every poll, it keeps working when the SCADA is down, and the same bit that raises the alarm can drive interlocks. Detection in the server is acceptable for advisory alarms and for legacy devices that expose only values, and it is where analog limits on historian-only tags usually live. Either way, the server manages the alarm from the moment the condition is true, and the philosophy records where each alarm is detected.',
      },
      { t: 'h2', text: 'The state machine' },
      {
        t: 'table',
        caption: 'The states defined in ISA-18.2; platform names vary',
        head: ['State', 'Meaning', 'Leaves by'],
        rows: [
          ['Normal', 'Condition false, no unacknowledged history', 'Condition becomes true'],
          ['Unacknowledged alarm', 'Condition true, operator has not acknowledged', 'Acknowledgment, or condition clears'],
          ['Acknowledged alarm', 'Condition true, acknowledged; still displayed as active', 'Condition clears'],
          ['Returned to normal, unacknowledged', 'Condition cleared before acknowledgment; shown so the operator knows it happened', 'Acknowledgment'],
          ['Shelved', 'Operator has temporarily removed it from the display, with a time limit', 'Timer expires or operator unshelves'],
          ['Suppressed by design', 'Logic has determined the alarm is not meaningful in the current state', 'Logic condition ends'],
          ['Out of service', 'Removed for maintenance by an authorized person, with a record', 'Returned to service by procedure'],
        ],
      },
      {
        t: 'p',
        text: 'Latched alarms stay in the acknowledged state until reset even after the condition clears, which fits alarms whose cause must be investigated. Momentary alarms clear when the condition does. A platform that supports only on, off, and acknowledged can approximate the rest with logic and tags, but the reporting and the operator view suffer.',
      },
      { t: 'h2', text: 'Priority, deadband, delays' },
      {
        t: 'ul',
        items: [
          'Priority is assigned per alarm from the philosophy, by consequence and time to respond, and the server displays, sorts, and colors by it. Three or four levels; the philosophy says which.',
          'Deadband on analog alarms: the alarm sets at the limit and clears only after the value has moved back by the deadband, so a value hovering at the limit does not chatter.',
          'On delay: the condition must persist for a time before the alarm is raised, which filters transients. Off delay: the condition must be clear for a time before the alarm clears, which stops rapid cycling.',
          'Time-based deadband and delay values are part of the alarm record and the rationalization, not a tuning knob left to whoever is bothered by the noise.',
        ],
      },
      { t: 'h2', text: 'Acknowledgment and the journal' },
      {
        t: 'p',
        text: 'An acknowledgment means an operator has seen the alarm and taken responsibility. It happens on one client and must appear on every client, including the standby server clients, immediately. The journal records every transition: raised, acknowledged, cleared, shelved, unshelved, suppressed, out of service, returned, with the timestamp, the value, the priority, the user, and the client station. The journal is the record used for incident investigation and for the alarm performance reports, and it is kept in a database that is backed up and that does not fill the disk when a flood produces a hundred thousand entries in an hour.',
      },
      { t: 'h2', text: 'Timestamps and sequence' },
      {
        t: 'p',
        text: 'The time on an alarm entry can be when the controller detected the condition or when the server noticed the bit. On a polled system those differ by up to a poll interval, and on a radio-polled site by minutes. Protocols that carry source timestamps, DNP3 and OPC UA among them, let the server record when the event actually happened, which is what a sequence of events analysis after a trip needs. Where the protocol does not, the server timestamp is what there is, and the philosophy notes the uncertainty. All of it depends on synchronized clocks.',
      },
      { t: 'h2', text: 'Redundancy and floods' },
      {
        t: 'p',
        text: 'In a redundant pair, both servers must have the same alarm states, and an acknowledgment on the active server must reach the standby before a failover, or operators see alarms come back unacknowledged after a switch. Products handle this differently; the failover test checks it explicitly. Under a flood, the server receives events faster than it can journal or display them; it must buffer and catch up, keep the priority sorting working, and never silently drop. The alarm display design and the flood suppression logic reduce the flood, but the server has to survive one.',
      },
      { t: 'h2', text: 'What the server should report' },
      {
        t: 'table',
        head: ['Measure', 'Target from the philosophy', 'Use'],
        rows: [
          ['Average alarm rate per operator', 'A handful per hour; about one per ten minutes is the common target', 'Whether the system is manageable'],
          ['Peak rate and flood periods', 'Rarely more than ten in ten minutes', 'Flood identification and suppression design'],
          ['Standing alarms', 'Few, and each explained', 'Alarms that have become wallpaper'],
          ['Chattering and fleeting alarms', 'None', 'Deadband and delay fixes'],
          ['Most frequent alarms', 'A short list that changes as it is worked', 'The bad actor list for rationalization'],
          ['Shelved, suppressed, out of service counts', 'Small, reviewed each shift', 'Alarms not being seen'],
          ['Priority distribution', 'Mostly low, some medium, few high', 'Whether priorities mean anything'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Ask the vendor for the reports',
        text: 'Every serious SCADA platform can produce these measures from its journal, natively or with a report. Ask for them at selection, configure them at commissioning, and put the weekly report in front of the operations supervisor. An alarm server that cannot tell you its alarm rate cannot be improved.',
      },
    ],
    faqs: [
      {
        q: 'Should analog alarm limits be in the controller or on the SCADA tag?',
        a: 'In the controller, as a rule, with the limits as setpoints that the SCADA can display and, with the right role, change. The controller then alarms every scan and can interlock on the same condition. Limits on the SCADA tag are acceptable for advisory alarms and for data that only the SCADA sees.',
      },
      {
        q: 'Why does an alarm come back unacknowledged after a server failover?',
        a: 'The acknowledgment did not reach the standby before the switch, or the platform does not synchronize acknowledgments at all. Check the product documentation and the failover test. Where synchronization is not available, a short journal review after any failover is the workaround, and the finding goes on the upgrade list.',
      },
      {
        q: 'What is the difference between a shelved and a suppressed alarm?',
        a: 'Shelving is an operator action, temporary, with a timer, for an alarm that is a nuisance right now. Suppression by design is logic, automatic, based on plant state, for an alarm that is meaningless in that state. Both keep the alarm off the display; both are listed and reviewed; neither is a permanent fix for a bad alarm.',
      },
      {
        q: 'How long should the alarm journal be kept?',
        a: 'Long enough for incident investigation and performance trending, and as long as any regulatory requirement says. A year online and longer in archive is common. The journal is small compared with the historian and there is little reason to discard it early.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/scada-hmi/alarm-management/notification',
      '/controls/scada-hmi/alarm-management/shelving',
    ],
  },
  {
    path: '/controls/scada-hmi/scada-fundamentals/scada-communications',
    kind: 'reference',
    title: 'SCADA Communications',
    summary:
      'How SCADA servers talk to controllers and the field: polling and report by exception, the protocols and what each is for, media from plant Ethernet to radio and cellular, poll rate arithmetic, timeouts and quality, time sync, store and forward, and security.',
    answer:
      'SCADA communications carry values from the controllers to the servers and commands back, by polling on a schedule or by devices reporting changes as they happen. The protocol is chosen for the job: Modbus for simple devices, DNP3 for telemetry with events and timestamps, EtherNet/IP and vendor protocols for plant controllers, OPC UA and MQTT for server-to-server and cloud paths. The medium ranges from plant Ethernet and fiber to licensed and unlicensed radio, cellular, and leased circuits, each with its own bandwidth, latency, and reliability that set the poll rate. Every link has a timeout and retry policy that turns a lost response into a communication alarm and marks the data bad rather than stale, time is synchronized across the link, remote sites buffer data while the link is down, and each path is secured according to what it crosses.',
    keyPoints: [
      'Polling asks; report by exception tells. Slow links want exceptions with timestamps, which is what DNP3 was built for.',
      'Match the protocol to the job: Modbus for devices, DNP3 for telemetry, vendor protocols in the plant, OPC UA and MQTT between servers.',
      'The medium sets the poll rate: the arithmetic of bytes per poll, devices, and bandwidth decides what is possible.',
      'Timeouts and retries convert a silent device into a communication alarm and bad-quality data; stale data that looks good is the failure to avoid.',
      'Remote sites keep their own history while the link is down and backfill it when the link returns.',
      'Every path that leaves the building is encrypted or private; Modbus and plain DNP3 carry nothing of their own.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['SCADA', 'Communications', 'Telemetry', 'Networking', 'Modbus'],
    blocks: [
      { t: 'h2', text: 'Polling and report by exception' },
      {
        t: 'p',
        text: 'In a polled system the server asks each device for its data on a schedule, and the device answers. The load on the link is the same whether anything changed or not, the latency of a change is up to one poll interval, and the poll interval is set by how many devices share the link and how fast it is. In a report by exception system the device sends a message when a value changes by more than a deadband or a state changes, with a timestamp, and the server polls only occasionally to confirm the device is alive and to fetch anything it missed. The link carries only changes, latency is the transmission time, and events arrive with the time they happened. Plant networks with plenty of bandwidth poll; radio and cellular telemetry benefits from exceptions, and DNP3 is the protocol that does it well.',
      },
      { t: 'h2', text: 'Protocols' },
      {
        t: 'table',
        head: ['Protocol', 'Where it fits', 'Strengths', 'Limits'],
        rows: [
          ['Modbus RTU and TCP', 'Drives, meters, analyzers, small controllers', 'Universal, simple, cheap to implement', 'No timestamps, no events, no security; polled only'],
          ['DNP3', 'Telemetry to remote sites over radio and cellular', 'Events with timestamps, unsolicited reporting, time sync, buffering, secure authentication option', 'More to configure; not native on every controller'],
          ['EtherNet/IP, and other vendor protocols', 'Plant controllers of that vendor', 'Native tags, high performance on Ethernet', 'Vendor-specific; bandwidth hungry on slow links'],
          ['OPC UA', 'Server to server, controller to server on modern equipment', 'Standard data model, built-in security, subscriptions', 'Newer; not on legacy devices'],
          ['MQTT with Sparkplug', 'Publish and subscribe to a broker; cloud and enterprise paths', 'Efficient on poor links, report by exception by design, one-to-many', 'Needs a broker; the control path is indirect'],
          ['OPC DA and legacy drivers', 'Older systems', 'Everything supported something', 'Windows dependencies, difficult security, being retired'],
        ],
      },
      { t: 'h2', text: 'Media' },
      {
        t: 'table',
        head: ['Medium', 'Typical use', 'Character'],
        rows: [
          ['Plant Ethernet and fiber', 'Inside the plant and between buildings', 'Fast, reliable, cheap per bit; the polling rate is limited by the devices, not the link'],
          ['Licensed radio', 'Remote sites within line of sight, tens of miles', 'Reliable, low latency, low throughput, owned by the utility, licensed frequency protects it'],
          ['Unlicensed spread spectrum radio', 'Remote sites, shorter range', 'Cheaper, higher throughput, shared spectrum and interference risk'],
          ['Cellular', 'Remote sites anywhere with coverage', 'Good throughput, variable latency, monthly cost, carrier dependency, needs encryption'],
          ['Leased line and private carrier circuits', 'Legacy telemetry and critical links', 'Reliable, expensive, disappearing as carriers retire copper'],
          ['Satellite', 'Sites with nothing else', 'High latency, cost, weather; last resort'],
        ],
      },
      { t: 'h2', text: 'The arithmetic of a poll cycle' },
      {
        t: 'p',
        text: 'On a shared serial or radio channel the server polls one device at a time, and the cycle time is the sum of every poll. Each poll takes the time to send the request, the time for the device to respond, and the time for the response to come back, plus the turnaround overhead of the radio.',
      },
      {
        t: 'formula',
        expr: 'T_cycle ≈ N × (T_request + T_turnaround + T_response + T_retry × P_fail)',
        where: [
          'N = devices on the channel',
          'T_request, T_response = bytes divided by the channel data rate, including protocol overhead',
          'T_turnaround = radio keying and settling time, often tens to hundreds of milliseconds',
          'T_retry × P_fail = the average time lost to retries at the failure rate of the link',
        ],
      },
      {
        t: 'p',
        text: 'Twenty sites on a 9,600 bit per second radio channel with 200 bytes per exchange and 100 milliseconds of turnaround gives a cycle near ten seconds with no retries, and longer as retries appear. That is the update rate every site gets, and doubling the site count doubles it. Report by exception, a faster channel, or a second channel are the ways out. On Ethernet the same arithmetic applies to each device rather than the channel: a controller that takes 50 milliseconds to answer a request cannot be polled every 20 milliseconds, no matter how fast the network is.',
      },
      { t: 'h2', text: 'Timeouts, retries, and quality' },
      {
        t: 'p',
        text: 'When a device does not answer, the server waits for the timeout, tries again up to the retry count, and then declares the device offline, raises a communication alarm, and marks the data from that device with bad quality. The timeout is longer than the slowest normal response, including radio turnaround, and shorter than the poll interval; the retries are few. What must not happen is the server continuing to show the last value as if it were current: stale data with good quality has started pumps against empty wells. Every display shows communication status, every control loop that uses a remote value checks its quality, and the communication alarm is a real alarm with a priority.',
      },
      { t: 'h2', text: 'Time and store and forward' },
      {
        t: 'p',
        text: 'Events from remote sites are useful only if their timestamps agree with everyone else. DNP3 and OPC UA carry time synchronization from the server to the device; plant controllers on Ethernet use network time. A remote controller with a buffer keeps events and history samples while the link is down and delivers them when it returns, with their original timestamps, so that the historian shows what happened during the outage rather than a gap. That buffering is configured at the controller and at the server, and it is tested by disconnecting the radio for an hour and checking the trend afterward.',
      },
      { t: 'h2', text: 'Security by path' },
      {
        t: 'ul',
        items: [
          'Inside the plant: the control network is segmented and the polling crosses a firewall with rules for the specific devices, ports, and direction.',
          'Radio: licensed radio is private but not secret; modern radios encrypt, and the configuration turns it on. Unlicensed radio is encrypted without exception.',
          'Cellular: a private network or VPN tunnel from each modem to the utility, never a public address on a modem, and never a controller reachable from the internet.',
          'Server to server and cloud: OPC UA with certificates, MQTT with TLS and authentication, through a DMZ.',
          'Modbus and DNP3 without secure authentication carry no protection of their own; the path around them provides it.',
        ],
      },
      { t: 'h2', text: 'Diagnostics' },
      {
        t: 'p',
        text: 'The server keeps statistics per device and per channel: polls sent, responses received, timeouts, retries, average and maximum response time, and the time of the last good response. Those numbers are historized and alarmed like process data: a site whose success rate has fallen from 99 to 90 percent is a radio path or an antenna problem that will become an outage, and a response time creeping up on an Ethernet device is a controller that is overloaded or a switch that is dropping. The communication diagnostic display, showing every site with its status and its statistics, is the first display opened when anything remote misbehaves.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Two paths to the sites that matter',
        text: 'A lift station that overflows when telemetry is lost deserves two paths: radio and cellular, or two radios on different frequencies, with the server failing over between them. The cost of the second modem is small; the cost of the overflow is not. The local control at the site still has to work with no path at all.',
      },
    ],
    faqs: [
      {
        q: 'Modbus or DNP3 for a lift station over radio?',
        a: 'DNP3 if the controller supports it well: it reports changes with timestamps, buffers while the radio is down, and synchronizes time. Modbus works and is simpler, and it is what many small controllers offer; with Modbus the poll interval sets the latency and there is no history during an outage unless the controller keeps its own.',
      },
      {
        q: 'How fast should remote sites be polled?',
        a: 'As fast as the channel allows after the arithmetic, and as slow as the process permits. A lift station that changes over minutes is fine at a 30-second update; a pressure zone with surge concerns wants seconds. Poll critical values faster than the rest, use exceptions where the protocol supports them, and never let the poll cycle exceed the time in which a lost site becomes a problem.',
      },
      {
        q: 'The site shows good data but the values never change. Is the link working?',
        a: 'Probably not. The server is displaying the last received values without marking them stale, which is a configuration failure at the server or the driver. Check the communication statistics for that site; the time of last good response will tell you. Then fix the quality handling so that the display goes bad when the link does.',
      },
      {
        q: 'Can cellular be the primary path for telemetry?',
        a: 'Yes, and increasingly it is, with private carrier networks or VPNs, static private addressing, and modems the utility manages. The risks are coverage, carrier outages, and monthly cost, and the mitigations are a second path for critical sites and local control that does not need the link.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/dnp3',
      '/controls/plc-systems/communications/modbus-tcp',
      '/controls/plc-systems/communications/opc-ua',
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
      '/troubleshooting/communications-troubleshooting/device-times-out',
      '/how-to/scada-how-to/diagnose-bad-quality',
    ],
  },
  {
    path: '/controls/scada-hmi/hmi-design/colors',
    kind: 'reference',
    title: 'Color in HMI Design',
    summary:
      'How color is used on a high performance HMI: a gray palette for normal operation so that color means something, alarm colors reserved by priority, equipment state by fill and text rather than red and green, color-blind safe choices, and the palette table.',
    answer:
      'On a well-designed HMI, color is information, not decoration: the background and the normal process depiction are grays, so that the few colors on the screen are the things that need attention. Alarm colors are assigned by priority in the alarm philosophy and used for nothing else, equipment running and stopped states are shown by fill contrast and a text label rather than green and red, bad quality and manual mode have their own distinct indications, and every color choice is paired with a shape, a text, or a position cue so that operators who cannot distinguish the colors still get the message. All of it is written in a style guide with a palette table that every display follows.',
    keyPoints: [
      'Gray for normal. If everything is colored, nothing stands out.',
      'Alarm colors by priority, from the philosophy, used only for alarms.',
      'Running and stopped by fill and text, not green and red; red is an alarm color.',
      'Every color has a second cue: a shape, a label, a border, a position. Color-blind operators exist in every utility.',
      'One palette table in the style guide; the display that deviates is wrong, however pretty.',
      'Consistency across displays, sites, and years matters more than any single choice.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['HMI', 'SCADA', 'Design', 'ISA', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'Why gray' },
      {
        t: 'p',
        text: 'The purpose of a control display is to let an operator see what is abnormal quickly. A display that draws every pipe in blue, every running pump in bright green, every tank in cyan, and every heading in red has spent its colors on things that are normal, and the one thing that is wrong is one colored object among a hundred. A display drawn in grays, with process lines in mid gray, equipment outlines in dark gray, and text in near black, is calm when the plant is calm. An alarm colored red or yellow on that display is the only saturated color on the screen and the eye goes to it without searching. That is the reasoning behind the high performance HMI palette, and it is the single most effective change a utility can make to its displays.',
      },
      { t: 'h2', text: 'A palette' },
      {
        t: 'table',
        caption: 'An example; the alarm colors and the number of priorities come from the alarm philosophy',
        head: ['Element', 'Color', 'Second cue'],
        rows: [
          ['Display background', 'Light or medium gray', 'None needed'],
          ['Process lines and vessels', 'Mid gray, thin', 'Line weight for the main flow path'],
          ['Text and values', 'Near black', 'Font size by importance'],
          ['Equipment running', 'Light fill, or white, with the outline', 'Text: RUN, and a state label on the faceplate'],
          ['Equipment stopped', 'Dark gray fill', 'Text: STOP or OFF'],
          ['Equipment in manual or local', 'A distinct marker, often a small tag or border in a reserved color', 'Text: HAND, LOCAL, MAN'],
          ['Highest priority alarm', 'Red', 'A symbol such as a filled triangle, and the priority number'],
          ['High priority alarm', 'Orange or amber', 'A different symbol, and the priority number'],
          ['Medium priority alarm', 'Yellow', 'A different symbol'],
          ['Low priority or advisory', 'Blue or cyan, muted', 'A different symbol'],
          ['Bad quality or communication lost', 'Magenta, or a hatched fill, with the value replaced by a marker', 'The value itself shows a symbol, never a stale number'],
          ['Interlocked or permissive blocked', 'A reserved marker color on the device', 'A symbol and a faceplate entry'],
          ['Selected or focused item', 'A thin highlight border', 'Border only'],
        ],
      },
      { t: 'h2', text: 'Running and stopped' },
      {
        t: 'p',
        text: 'Green for running and red for stopped is the convention from panel pilot lights, and it fails on a display for two reasons. Red is the color that must mean the highest alarm, and a screen full of stopped pumps in red is a screen full of false alarms. And green and red are the two colors that the most common color vision deficiency cannot tell apart. On the display, a running device is a light or white fill and a stopped one a dark fill, with a text label on or beside the symbol; the contrast is visible to everyone and leaves the alarm colors alone. A plant that is not ready to give up its pilot light colors can at least keep red off the running and stopped states and use the alarm colors only for alarms.',
      },
      { t: 'h2', text: 'Color vision' },
      {
        t: 'p',
        text: 'Roughly one man in twelve has a color vision deficiency, most commonly a weakness in distinguishing red from green, and a utility with a few dozen operators has some. A display that conveys state only by color is unreadable to them, and they will not always say so. The rule is that every color carries a second cue: an alarm has a shape and a number as well as a color, a state has a text label as well as a fill, a bad value has a symbol as well as magenta. Testing a display in a grayscale rendering, or with a color-blindness simulator, shows whether the cues are enough.',
      },
      { t: 'h2', text: 'Consistency' },
      {
        t: 'p',
        text: 'Whatever the palette, it is applied the same way on every display, at every site, by every integrator, for the life of the system. A pump that is drawn one way in the plant and another way at the lift stations, or an alarm color that means high at one site and medium at another, makes the operator translate, and translation under stress is where errors happen. The style guide holds the palette table, the symbol library, and the rules, and it is a deliverable that every project uses. A system with three generations of displays in three styles is due for a style guide and a migration.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Legacy displays',
        text: 'Converting a system of old bright displays all at once is rarely possible. A workable path is to write the style guide, build the overview display new in the new style, convert each detail display as it is touched for another reason, and keep the alarm colors consistent between old and new from the first day. Operators adapt quickly when the overview is the first display they see.',
      },
    ],
    faqs: [
      {
        q: 'Operators like the colors. Why change?',
        a: 'Because the purpose of the display is to make the abnormal obvious, and the evidence from process industries is that gray displays with reserved alarm colors let operators detect and respond to abnormal conditions faster and with fewer errors. The preference for color fades after a few shifts with a calm display; the first time an operator spots a problem across the room, the argument is over.',
      },
      {
        q: 'Which colors go with which priority?',
        a: 'The alarm philosophy decides, and the platform implements it. A common assignment is red for the highest priority, orange or amber for high, yellow for medium, and blue or cyan for low. The colors must not be used for anything else on the display, and each must come with a distinct symbol.',
      },
      {
        q: 'How do I show a value that is bad quality?',
        a: 'Replace the number with a marker such as dashes or a question mark, color the field magenta or hatch it, and show the same marker on any trend or bar that uses the value. A stale number in a normal color is the worst outcome, because the operator will believe it.',
      },
      {
        q: 'What about the colors on the physical panel?',
        a: 'Panel pilot lights follow their own conventions and standards, with green often meaning running and red meaning stopped or fault depending on the site standard. The HMI does not need to match the panel; it needs to be consistent with itself. Where an operator uses both, a note in the style guide about the difference is worth writing.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/scada-hmi/hmi-design/alarm-indication',
      '/controls/scada-hmi/hmi-design/faceplates',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/hmi-design/situational-awareness',
    ],
  },
  {
    path: '/controls/scada-hmi/hmi-design/situational-awareness',
    kind: 'reference',
    title: 'Situational Awareness',
    summary:
      'Designing displays so an operator knows what is happening, what it means, and what comes next: the three levels of awareness, the display hierarchy, analog indicators with normal ranges, embedded trends, time-to-limit predictions, and a test for any display.',
    answer:
      'Situational awareness is the operator perceiving the state of the system, understanding what it means, and projecting where it is going, and displays are designed to support all three. An overview display shows the whole system on one screen with key values as analog indicators against their normal ranges, so deviation is visible at a glance; unit displays show a process area with embedded trends so that direction and rate are visible; detail and diagnostic displays support action. Predictions such as time to a tank limit at the current rate, and alarm information shown in context on the display rather than only in a list, turn data into awareness. A display is tested by whether an operator can say in seconds whether anything is wrong, what, and how long they have.',
    keyPoints: [
      'Perceive, understand, project: a display supports all three or it is a data page.',
      'Overview on one screen, always visible: the state of everything, values against normal ranges, no clutter.',
      'Analog indicators with a normal band show deviation faster than any number.',
      'Embedded trends show direction and rate; a number shows neither.',
      'Time to limit at the current rate is the projection the operator needs and rarely gets.',
      'Alarms in context on the display, not only in the list; the operator should see where the problem is.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['HMI', 'SCADA', 'Design', 'ISA', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'Three levels' },
      {
        t: 'dl',
        items: [
          { term: 'Perception', def: 'The operator sees the current state: which pumps run, what the levels and pressures are, which alarms are active. Most displays stop here, with numbers and symbols.' },
          { term: 'Comprehension', def: 'The operator understands what the state means: the level is high for this time of day, the pressure is falling faster than usual, two stations are running lag pumps at once. This needs context: normal ranges, history, relationships.' },
          { term: 'Projection', def: 'The operator anticipates what will happen: the wet well will reach the overflow in twenty minutes at this inflow, the chlorine day tank will run out before the next delivery. This needs rates and calculations, and a display that shows them.' },
        ],
      },
      { t: 'h2', text: 'The display hierarchy' },
      {
        t: 'table',
        head: ['Level', 'Purpose', 'Content', 'Rule'],
        rows: [
          ['1 Overview', 'The whole system at a glance; is anything wrong', 'Key values as indicators against normal ranges, equipment states in summary, alarm counts by area, communication status', 'One screen, always visible, no navigation needed to see it'],
          ['2 Unit or area', 'Operate a process area', 'Process depiction, values with embedded trends, equipment with states, area alarms in place', 'The display an operator lives on during a shift'],
          ['3 Detail', 'Act on one piece of equipment or loop', 'Faceplates, setpoints, permissives and interlocks, modes, detailed trends', 'Opened from level 2, closed when done'],
          ['4 Diagnostic', 'Understand a problem', 'Communication statistics, controller health, alarm history, calibration data', 'For technicians and engineers as much as operators'],
        ],
      },
      { t: 'h2', text: 'Overview design' },
      {
        t: 'p',
        text: 'The overview is the display that gives awareness, and it is the hardest to design because it must show everything and nothing extra. For a water utility it typically shows each pressure zone with its pressure and tank level as indicators, each plant with its production rate and its key quality values, each lift station with its level and pump states, and the communication status of every site, all on one screen. Every value is drawn as an analog indicator: a bar or a dial with the normal operating band shaded, so that a value inside the band is visibly normal and a value outside it is visibly not, before the operator reads the number. The overview does not show pipes, valves, or a map with icons; it shows the state of the system in a form that can be scanned in seconds.',
      },
      { t: 'h2', text: 'Showing more than a number' },
      {
        t: 'ul',
        items: [
          'Analog indicator with a normal range: a bar with the band shaded, the alarm limits marked, and the current value as a pointer. Deviation from normal is visible at any distance.',
          'Embedded trend: a small trend of the last hour beside a key value, so that a level that is rising is seen to be rising. Sparklines cost little screen space.',
          'Rate of change: shown as a number or an arrow where it matters, such as tank level in feet per hour.',
          'Time to limit: computed from the level, the limit, and the rate: time to overflow, time to empty, time to low pressure. The single most useful projection on a water display.',
          'Deviation from expected: the value compared with the same time yesterday, or with a schedule, for demand and flow.',
          'Group summaries: the number of stations on lag pumps, the number of sites with communication faults, the count of active alarms by priority in each area.',
        ],
      },
      { t: 'h2', text: 'Alarms in context' },
      {
        t: 'p',
        text: 'An alarm list tells the operator that something is wrong; the display should show where. The device or the value in alarm carries its alarm color and symbol on the overview and on the unit display, so that a glance at the screen locates the problem without reading the list. Alarm counts by area on the overview point the operator to the right unit display. The alarm list remains, always visible on its own screen or a band, sorted by priority, and it is the acknowledgment tool; the displays are the awareness tool, and both are needed.',
      },
      { t: 'h2', text: 'Testing a display' },
      {
        t: 'steps',
        items: [
          { title: 'The five-second test', text: 'Show the display to an operator for five seconds and ask whether anything is wrong. If they cannot say, the abnormal is not visible enough or the normal is too visible.' },
          { title: 'The what and where test', text: 'Ask what is wrong and where. The answer should come from the display, not from opening something else.' },
          { title: 'The how long test', text: 'Ask how long they have before it matters. If the display does not show a rate or a time to limit, they are guessing.' },
          { title: 'The clutter test', text: 'Cover each element in turn and ask whether the display lost anything an operator needs. Remove what it did not.' },
          { title: 'The consistency test', text: 'Compare with the other displays in the system: the same value drawn the same way, the same colors, the same symbols, the same navigation.' },
          { title: 'The color test', text: 'View it in grayscale. Everything that mattered should still be readable.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Build the overview with the operators',
        text: 'The people who will use the overview know what they look at first when they come on shift and what they wish they could see. Draw it on paper with them, iterate, and only then build it. The overview built by an engineer alone shows what the engineer thinks matters.',
      },
    ],
    faqs: [
      {
        q: 'Is a map with site icons a good overview?',
        a: 'It is good for finding a site and poor for awareness: icons that change color show only whether a site is in alarm, and the map space is spent on geography rather than on state. Use a map as a navigation aid or on a wall display; make the overview a set of indicators that shows the state of each site, not its location.',
      },
      {
        q: 'How many values belong on an overview?',
        a: 'As many as can be drawn as indicators and scanned in a few seconds, which on one screen is a few dozen. Choose the ones an operator checks first on arrival and the ones whose deviation matters most. Everything else lives on the unit displays.',
      },
      {
        q: 'How is time to limit calculated?',
        a: 'From the current value, the limit, and the rate of change over a recent window: the remaining distance divided by the rate. Filter the rate so that noise does not make the prediction jump, show it only when the rate is toward the limit, and cap the display at a maximum so that a slow approach reads as more than an hour rather than as a meaningless large number.',
      },
      {
        q: 'What about the operator who prefers the old displays?',
        a: 'Keep the old displays available for a transition period and put the new overview on the main screen. Most operators come to rely on the overview within a few shifts because it saves them clicking. Involve them in the design and the transition is short.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/scada-hmi/hmi-design/navigation',
      '/controls/scada-hmi/hmi-design/trends',
      '/controls/scada-hmi/hmi-design/colors',
      '/controls/scada-hmi/hmi-design/alarm-indication',
    ],
  },
  {
    path: '/controls/scada-hmi/alarm-management/shelving',
    kind: 'reference',
    title: 'Alarm Shelving',
    summary:
      'The operator tool for temporarily silencing a nuisance alarm: what shelving is and is not, the rules a philosophy sets, who may shelve what and for how long, automatic unshelving, the shelved list, the record, and how to implement it on any platform.',
    answer:
      'Shelving lets an operator remove an alarm from the active display for a limited time, after which it returns automatically, so that a chattering or currently irrelevant alarm does not bury the ones that matter. It is an operator action, distinct from suppression by design, which is automatic logic, and from out of service, which is a maintenance state with a procedure. A philosophy sets the maximum shelve duration, commonly a shift, which priorities may be shelved by which roles, which alarms may never be shelved, and how the shelved list is displayed and reviewed. Every shelve is recorded with the user, the time, and the reason, the shelved count is reported, and an alarm that is shelved repeatedly is a candidate for rationalization, not for a longer shelf.',
    keyPoints: [
      'Shelving is temporary, operator-initiated, and time-limited; it is not a fix for a bad alarm.',
      'The philosophy sets the maximum duration, who can shelve which priority, and what can never be shelved.',
      'Automatic unshelving at the time limit is what makes shelving safe; without it, shelving is deletion.',
      'The shelved list is visible on every operator station and reviewed at every shift change.',
      'Every shelve is logged with the user and reason; repeated shelving of one alarm goes to rationalization.',
      'Platforms without native shelving can implement it with a timer and a tag, with the same rules.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Alarms', 'SCADA', 'ISA', 'HMI', 'Standards'],
    blocks: [
      { t: 'h2', text: 'What shelving is for' },
      {
        t: 'p',
        text: 'An alarm that is technically valid can still be useless at the moment: a low flow alarm on a pump that a crew is working on, a level alarm chattering because a float is being replaced, a communication alarm on a site whose radio is known to be down until Tuesday. Left on the display, it takes attention from every alarm that arrives after it and trains the operator to ignore the list. Shelving removes it for a while, with the promise that it will come back on its own. The concept comes from the alarm management standard and is built into most modern platforms; its value lies in the rules around it.',
      },
      { t: 'h2', text: 'Shelving, suppression, out of service' },
      {
        t: 'table',
        head: ['', 'Shelving', 'Suppression by design', 'Out of service'],
        rows: [
          ['Initiated by', 'Operator', 'Logic, from plant state', 'Maintenance or engineering, by procedure'],
          ['Duration', 'Time-limited, automatic return', 'As long as the state lasts', 'Until returned to service by procedure'],
          ['Reason', 'Nuisance right now', 'Alarm meaningless in this state', 'Equipment or instrument under maintenance'],
          ['Approval', 'Role-based, by priority', 'Designed and documented in rationalization', 'Permit or work order, with a record'],
          ['Display', 'Shelved list', 'Suppressed list', 'Out of service list'],
          ['Review', 'Each shift', 'Periodic audit of the logic', 'Return to service checklist'],
        ],
      },
      { t: 'h2', text: 'The rules' },
      {
        t: 'ul',
        items: [
          'Maximum duration: commonly one shift, eight to twelve hours; some philosophies allow shorter defaults with a supervisor extension. The alarm unshelves itself at the limit, whatever its state.',
          'Who may shelve what: operators may shelve low and medium priority alarms; high priority alarms need a supervisor; the highest priority and any safety-related alarm cannot be shelved by anyone.',
          'Reason required: a short text or a pick list. A shelve with no reason is not allowed by the platform configuration.',
          'Visible: the shelved list on every operator station, with the time remaining, and a count on the overview.',
          'Reviewed: at shift handover, every shelved alarm is discussed and either unshelved or re-shelved by the incoming shift with its own record.',
          'Limited repetition: an alarm shelved more than a set number of times in a month is reported for rationalization.',
        ],
      },
      { t: 'h2', text: 'When an alarm is shelved' },
      {
        t: 'p',
        text: 'The alarm leaves the active display and stops annunciating. Its condition is still evaluated, its state is still journaled, and on most platforms a change of state while shelved is recorded so that the history is complete. When the shelf expires or the operator unshelves it, the alarm reappears in whatever state it is in at that moment: if the condition is still true, it appears as an unacknowledged alarm and annunciates. The operator who shelved it may be off shift by then, which is why the shelved list is reviewed at handover.',
      },
      { t: 'h2', text: 'Implementation' },
      {
        t: 'p',
        text: 'Platforms with native shelving provide the button, the timer, the list, the role checks, and the journal entries, and the configuration is a matter of setting the durations and the permissions from the philosophy. Platforms without it can approximate it: a shelve tag per alarm set by a supervisor-level button, a timer that clears the tag, display logic that hides the alarm while the tag is set, a display that lists every set tag with its remaining time, and an event log entry when the tag is set and cleared. The rules are the same; what is lost is the standard reporting, which has to be built by hand.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Shelving is not rationalization',
        text: 'An alarm that is shelved every day is a bad alarm, and shelving it is the operator working around a design problem. The shelving report is one of the best inputs to rationalization: the alarms most often shelved are the ones whose limits, deadbands, delays, or existence need attention. Fix the alarm, and the shelf empties itself.',
      },
    ],
    faqs: [
      {
        q: 'Why limit how long an alarm can be shelved?',
        a: 'Because an alarm shelved indefinitely is an alarm that has been deleted without anyone deciding to delete it. The time limit forces the alarm back in front of an operator, who decides again whether it is still a nuisance. If the underlying problem takes days, the alarm goes out of service by procedure, with a record and a return checklist, which is a different thing.',
      },
      {
        q: 'Should the highest priority alarms be shelvable?',
        a: 'No. The highest priority is reserved for alarms with severe consequences and short response times, and an operator should never have the option of hiding one. If such an alarm is chattering, that is an urgent maintenance problem, and the maintenance procedure with its out-of-service record is the tool.',
      },
      {
        q: 'What should happen to a shelved alarm at shift change?',
        a: 'It is on the handover list. The incoming operator sees it, hears why it was shelved, and either unshelves it or re-shelves it under their own name with the reason. Nothing shelved by a departing operator should silently continue into the next shift.',
      },
      {
        q: 'How is a shelved alarm different from an acknowledged one?',
        a: 'An acknowledged alarm stays on the display in the acknowledged state and is visible as an active problem; a shelved alarm is removed from the display for a time. Acknowledgment says the operator has seen it; shelving says the operator does not want to see it for a while.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/suppression',
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/controls/scada-hmi/alarm-management/rationalization',
      '/controls/scada-hmi/scada-fundamentals/alarm-servers',
      '/controls/scada-hmi/alarm-management/alarm-floods',
    ],
  },
  {
    path: '/controls/scada-hmi/alarm-management/suppression',
    kind: 'reference',
    title: 'Alarm Suppression',
    summary:
      'Suppressing alarms by design: state-based logic that removes alarms that mean nothing in the current state, parent-child logic that stops a flood at its source, out-of-service suppression for maintenance, the rules that keep it safe, and how to test it.',
    answer:
      'Suppression by design uses logic to keep an alarm off the display when the plant state makes it meaningless: a low flow alarm while the pump is stopped, a low pressure alarm on a station that is out of service, every alarm from a site whose communication link is down except the communication alarm itself. It is designed during rationalization, documented per alarm, implemented in the controller or the SCADA, listed on a display so that suppressed alarms are visible as suppressed, and tested so that an alarm returns when the suppressing state ends. Out-of-service suppression for maintenance is a separate mechanism with a permit, a record, and a return-to-service check. Suppression that is undocumented, untested, or stuck is how a real alarm disappears, and every philosophy has rules against it.',
    keyPoints: [
      'Suppress an alarm only when the plant state makes it meaningless, and say so in the rationalization record.',
      'Parent-child and first-out logic stop a flood at its source: one communication alarm, not fifty.',
      'A suppressed alarm is still evaluated, still journaled, and listed as suppressed on a display.',
      'Suppression logic is tested like an interlock: does the alarm return when the state ends.',
      'Out of service is a procedure, not a checkbox: permit, record, return-to-service check.',
      'A suppression that never releases is a deleted alarm; audit the suppressed list for the ones that have been there for months.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Alarms', 'SCADA', 'ISA', 'PLC', 'Standards'],
    blocks: [
      { t: 'h2', text: 'State-based alarming' },
      {
        t: 'p',
        text: 'Most nuisance alarms are valid alarms in the wrong state. A pump that is stopped has no flow, and a low flow alarm on it is not information. A lift station taken out of service for a rebuild has low level, no pumps available, and no communication, and every one of those alarms is expected. State-based alarming makes the alarm condition include the state: low flow and pump running for a delay; low pressure and station in service; the alarm is suppressed, automatically, while the state says it should be. The logic belongs in the rationalization record for each alarm, with the state it depends on, and it is implemented where the alarm is detected, which is usually the controller.',
      },
      {
        t: 'table',
        caption: 'Common state-based suppressions in a water utility; each one is a rationalization decision',
        head: ['Alarm', 'Suppressed when', 'Why'],
        rows: [
          ['Low flow, low discharge pressure on a pump', 'Pump stopped, and for a delay after start', 'No flow is expected'],
          ['Fail to start', 'Pump not in AUTO, or no start commanded', 'Only meaningful for a commanded start'],
          ['Low level in a wet well', 'Station in a pump-down or cleaning mode', 'Operator is draining it on purpose'],
          ['Analyzer alarms', 'Sample flow lost, analyzer in calibration', 'The value is not a measurement'],
          ['All alarms at a remote site except communication', 'Communication to the site lost', 'They are consequences of the one alarm'],
          ['Drive fault alarms', 'Drive control power off for maintenance', 'Expected'],
          ['Process alarms in a treatment train', 'Train shut down or in a defined off state', 'Expected while off; alarms return on startup with a delay'],
        ],
      },
      { t: 'h2', text: 'Floods: parent and child, first out' },
      {
        t: 'p',
        text: 'A single event can produce dozens of alarms: a lost radio link brings bad quality on every tag from the site, a tripped feeder breaker stops every pump in a station, a plant shutdown takes every process value out of range. The operator needs the one alarm that says what happened and not the fifty that say what followed. Parent-child suppression ties each consequential alarm to the causal one: while the communication alarm is active, the site alarms are suppressed; while the feeder alarm is active, the pump fail alarms are. First-out logic in a trip sequence records which alarm came first and presents that one with the rest grouped under it. Both are designed from the flood analysis, which looks at the alarm journal for the events that produced the largest bursts.',
      },
      { t: 'h2', text: 'Out of service' },
      {
        t: 'p',
        text: 'A transmitter being calibrated, a pump being rebuilt, a site being rewired: the alarms from that equipment will be nonsense for days, and shelving is too short. Out of service is the state for that. It is entered by an authorized person under a work order or permit, recorded with the equipment, the alarms affected, the person, and the expected return, listed on a display, and reviewed on a schedule. Returning to service is a checklist: the equipment is back, the alarms are re-enabled, and someone confirms that each alarm is in the state it should be. A piece of equipment forgotten in out of service is the most common way a plant runs for a year without an alarm it thought it had.',
      },
      { t: 'h2', text: 'Rules' },
      {
        t: 'ul',
        items: [
          'Documented: every suppression in the rationalization record, with the state, the logic, and the reason.',
          'Visible: a suppressed alarm list on the operator stations, with the reason for each, and a count on the overview.',
          'Still evaluated: the condition continues to be evaluated and journaled while suppressed, so the history is complete and the return is immediate.',
          'Returns: when the suppressing state ends, the alarm is active if its condition is true. A delay after the state change avoids a flood on startup; it is a designed delay, not an afterthought.',
          'Tested: at commissioning and after any change, each suppression is forced on and off and the alarm behavior confirmed, the same way an interlock is tested.',
          'Audited: the suppressed list is reviewed periodically for alarms suppressed longer than their state should last; a stuck state bit suppresses forever.',
          'Never for the highest priority: safety-related and highest priority alarms are not suppressed by design except by parent-child logic that is itself reviewed.',
        ],
      },
      { t: 'h2', text: 'Designing the logic' },
      {
        t: 'steps',
        items: [
          { title: 'Start from the journal', text: 'Find the alarms that occur most, the floods, and the standing alarms. Each is a candidate for a state condition or a parent-child relationship.' },
          { title: 'Name the state', text: 'For each candidate, the plant state in which the alarm is meaningless: pump stopped, site out of service, communication lost, train shut down. If no such state exists, the alarm needs a different fix.' },
          { title: 'Write the condition', text: 'The alarm condition including the state and the delays, in the form that will be coded. Low flow alarm = flow below limit AND pump running AND run time greater than 30 seconds.' },
          { title: 'Decide where it lives', text: 'In the controller where the alarm is detected there; in the SCADA for server-evaluated alarms and for parent-child logic across sites.' },
          { title: 'Record it', text: 'In the rationalization record for the alarm, with the reason and the date.' },
          { title: 'Implement and test', text: 'Code it, then force each state and confirm the alarm suppresses and returns, with the delay.' },
          { title: 'Review', text: 'After a month, look at the journal again: the alarm rate should have fallen, and nothing should have been missed.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The suppression that hid the alarm',
        text: 'Every utility that has investigated an incident has found an alarm that would have warned them and did not, because it was suppressed by a state bit that was wrong, an out-of-service entry nobody closed, or a comment in the code from years ago. Suppression is a powerful tool with a failure mode of silence. The lists, the audits, and the tests are what keep it safe.',
      },
    ],
    faqs: [
      {
        q: 'Is suppression the same as raising the alarm limit?',
        a: 'No. Raising a limit changes when the alarm occurs; suppression changes whether it is shown in a given state. An alarm that chatters because its limit is set at a normal operating value needs a new limit or a deadband from rationalization, not suppression.',
      },
      {
        q: 'Where should the suppression logic live?',
        a: 'With the alarm detection, which is usually the controller: the state bits are there, the logic runs every scan, and the alarm bit sent to the SCADA already includes the state. Parent-child suppression across sites, such as communication loss, lives in the SCADA because that is where the parent alarm is known.',
      },
      {
        q: 'How do I keep a suppressed alarm from being forgotten?',
        a: 'List it. A display of every suppressed alarm with its reason and its duration, a count on the overview, and a periodic review of anything suppressed longer than expected. Out-of-service entries carry an expected return date and are reviewed against it.',
      },
      {
        q: 'Can the operator suppress an alarm?',
        a: 'The operator shelves, for a limited time. Suppression by design is engineering, decided in rationalization and changed through the change process. Out of service is a maintenance action under a permit. Keeping the three separate is what keeps each one safe.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/shelving',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/scada-hmi/alarm-management/rationalization',
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/scada-fundamentals/alarm-servers',
    ],
  },
  {
    path: '/controls/scada-hmi/historian-data/trending',
    kind: 'reference',
    title: 'Trending',
    summary:
      'Using historian trends to understand a process and diagnose a problem: pens that belong together, scaling and time ranges, raw versus averaged data and what compression hides, overlays and cursors, event markers, and the patterns that point at each cause.',
    answer:
      'A trend is the historian made visible, and reading one well is a core skill for anyone who runs or troubleshoots a process. Trends are built from pens that belong together, such as level with pump states, pressure with flow, and residual with dose, each scaled to a fixed engineering range rather than auto-scaled, over a time range long enough to show the pattern and short enough to show the detail. Raw samples show what happened; averaged data hides the fast events; compression settings decide what was stored in the first place. Overlays of yesterday against today, cursors for reading values at a moment, and alarm and event markers on the time axis turn a curve into an explanation, and the patterns of cycling, drift, steps, and noise each point at a class of cause.',
    keyPoints: [
      'Pens that belong together: the cause and the effect on one trend, not one value alone.',
      'Fixed scales in engineering units; auto-scale turns a flat line into a mountain range.',
      'Know what the historian stored: compression and averaging decide what the trend can show.',
      'The time range is chosen for the question: hours for a control problem, weeks for drift, a year for seasonality.',
      'Alarm and event markers on the time axis explain the curve.',
      'Cycling, drift, steps, and noise are different problems; the trend shape is the first diagnosis.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'Documentation', 'Troubleshooting', 'HMI', 'Control'],
    blocks: [
      { t: 'h2', text: 'Building a trend that says something' },
      {
        t: 'ul',
        items: [
          'Pens together: a wet well level with the pump run states below it shows cycling and lag response in one picture; a level alone shows a sawtooth with no explanation. Pressure with flow, chlorine residual with the dose and the flow, dissolved oxygen with air flow and blower speed, tank level with the pumps that fill it.',
          'Fixed scales: each pen scaled to its engineering range or a sensible fixed span, so that the same trend looks the same tomorrow. Auto-scaling stretches a tenth of a psi of noise to fill the screen and makes a stable process look wild.',
          'Stacked or overlaid: overlay pens with related magnitudes; stack pens with different units or discrete states so they do not obscure each other.',
          'Time range for the question: a control loop problem in an hour or two, a diurnal pattern in a day or a week, drift in a month, seasonality in a year.',
          'Discrete states as step lines, analog values as lines, and bad quality shown as a gap or a marker rather than a line drawn through nothing.',
          'Saved trend groups for the questions that recur, named for what they answer, on the display where they are needed.',
        ],
      },
      { t: 'h2', text: 'What was stored' },
      {
        t: 'p',
        text: 'A trend can only show what the historian kept. A tag historized on change with a deadband of one percent will not show a fluctuation smaller than that; it will show a straight line between the samples that exceeded it. A tag stored as a one-minute average will not show a five-second pressure transient; it will show a slightly lower minute. Compression that discards points along a straight line shows a straight line through a period that may have wandered within the tolerance. When a trend looks too smooth, too steppy, or shows nothing where something happened, the first question is how the tag is collected and compressed, and the answer is in the historian configuration. For diagnosis of a fast event, look at the raw samples and, if the tag is averaged, at a faster-collected tag or the controller itself.',
      },
      { t: 'h2', text: 'Reading the shape' },
      {
        t: 'table',
        head: ['Pattern', 'What it looks like', 'Likely causes'],
        rows: [
          ['Cycling', 'A regular oscillation, sawtooth or sinusoid', 'On-off control between limits, which is normal; PID tuned too aggressively; a control valve with stiction; two controllers fighting'],
          ['Drift', 'A slow steady change over hours or days with no process reason', 'Sensor fouling, a wet leg filling, a reference shifting, a slow leak, temperature effect'],
          ['Step', 'A sudden change to a new steady value', 'A setpoint or configuration change, a range change, a pump or valve state change, a calibration, an instrument replaced'],
          ['Noise', 'Rapid small variation with no pattern', 'Electrical interference, air in a line, a turbulent measurement point, a damping setting removed'],
          ['Flat line', 'No variation at all', 'A frozen value from lost communication, a failed transmitter, a tag no longer collected, or a filter so heavy it hides everything'],
          ['Spikes', 'Single samples far from the rest', 'Radio interference, a keyed radio, a power event, a communication glitch, a sample collected during a transition'],
          ['Daily pattern', 'A curve that repeats each 24 hours', 'Demand, temperature, a schedule; normal, and the baseline for spotting a change'],
        ],
      },
      { t: 'h2', text: 'Cursors, overlays, and markers' },
      {
        t: 'p',
        text: 'A cursor reads the value of every pen at one instant and is how a trend becomes a number: the level when the pump started, the pressure when the alarm came in. Two cursors give a difference and a duration: the fill rate between two levels, the run time of a pump. An overlay puts the same tag from a previous day or week on the same axes, which is the fastest way to see that today is different, and by how much. Alarm and event markers on the time axis, with the alarm journal and the operator action log, connect the curve to what people and the system did: the setpoint change that started the oscillation, the acknowledgment that came ten minutes after the alarm.',
      },
      { t: 'h2', text: 'Habits' },
      {
        t: 'ul',
        items: [
          'Look at the trend before touching the process. Ten minutes on a trend saves an hour of adjusting.',
          'Widen the time range before concluding. A problem that started yesterday looks different from one that has been growing for a month.',
          'Check the pen that did not change. A pressure that fell while the flow stayed constant tells a different story from one where both fell.',
          'Note the sample rate and the compression on any trend used for a decision.',
          'Export the data for anything that will be argued about; a screenshot cannot be re-analyzed.',
          'Build the trend group once and save it; the next person with the same question should not have to rebuild it.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The trend that explains the alarm',
        text: 'Give every alarm on the display a link to a trend of its tag with the related pens over the last few hours. An operator who can see that the level has been rising for forty minutes at a steady rate responds differently from one who sees only a high level alarm. It is the cheapest awareness feature a system can have.',
      },
    ],
    faqs: [
      {
        q: 'Why does my trend show a straight line through a period when I know the value moved?',
        a: 'The historian compression or deadband discarded the samples because they stayed within the tolerance, and the trend draws a line between the samples it kept. Tighten the deadband for that tag if the detail matters, and look at the controller or a faster-collected tag for the past event.',
      },
      {
        q: 'How long a time range should I use to diagnose a control loop?',
        a: 'A few cycles of whatever the loop is doing: for a loop cycling every five minutes, an hour; for a wet well filling and draining every twenty minutes, a couple of hours. Long enough to see the pattern repeat, short enough to see the shape of each cycle. Then widen it to see when the pattern started.',
      },
      {
        q: 'Should trends on the operator display use the historian or the live data?',
        a: 'The historian for anything longer than a few minutes, so that the trend survives a display change and matches what was stored. Live buffers on the client are fine for a short real-time trend on a faceplate, and they disappear when the display closes.',
      },
      {
        q: 'What is the best way to compare two similar sites?',
        a: 'The same trend group with the tags of each site, at the same fixed scales and time range, side by side or overlaid. Differences in cycle time, run time, or pressure profile between two stations that should be alike point at a problem at one of them.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/trends',
      '/controls/scada-hmi/historian-data/compression',
      '/controls/scada-hmi/historian-data/data-collection',
      '/controls/scada-hmi/historian-data/reporting',
      '/controls/scada-hmi/scada-fundamentals/historians',
      '/troubleshooting/scada-troubleshooting/values-frozen-on-screen',
    ],
  },
];
