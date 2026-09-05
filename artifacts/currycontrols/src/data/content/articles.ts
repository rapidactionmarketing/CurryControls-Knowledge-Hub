import type { Entry } from '../content-types';

/**
 * Long-form articles for the Articles section. Unlike the reference pages,
 * these argue a position from field experience. Each lives under one of the
 * /articles categories in the navigation tree and is tagged by subject so the
 * category pages, which select by tag, list it alongside the reference pages.
 */
export const ARTICLE_ENTRIES: Entry[] = [
  {
    path: '/articles/plc-articles/where-the-logic-should-live-controller-scada-or-relay',
    kind: 'article',
    title: 'Where the Logic Should Live: Controller, SCADA, or Relay',
    summary:
      'Every control decision has a home, and putting it in the wrong one is the root of most plants that are hard to operate. A rule for deciding what belongs in the controller, what belongs in SCADA, and what belongs in a relay.',
    answer:
      'Logic belongs in the controller when it protects equipment or the process, must work with SCADA down, or acts faster than a poll. It belongs in SCADA when it is about people: what to show, whom to call, how to record. It belongs in a relay only when it must work with the controller dead, which means backup and safety circuits. Everything else that ends up somewhere other than the controller was put there for convenience, and convenience is paid back at three in the morning.',
    keyPoints: [
      'The controller owns the process: interlocks, sequences, alarms conditions, and setpoint limits.',
      'SCADA owns the people: annunciation, notification, history, reports, and the screens.',
      'Relays own only what must survive a dead controller: backup float circuits and safety functions.',
      'A decision made in two places will disagree; decide once, in the controller, and let the others read it.',
      'The test for every piece of logic is what happens when the layer above it disappears.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'SCADA', 'Design', 'Control', 'Engineering'],
    blocks: [
      {
        t: 'p',
        text: 'Walk into a plant that is hard to run and the logic is scattered. The pump alternation is in a relay because the integrator ran out of time. The high level alarm is evaluated in SCADA because the screen builder found it easier. A permissive lives in a script on the historian server, and nobody knows why the filter will not start on Tuesdays. None of those decisions was unreasonable on the day it was made. Each one put a piece of the process where it was convenient rather than where it belonged, and the plant has been paying for it ever since.',
      },
      { t: 'h2', text: 'Three homes, three jobs' },
      {
        t: 'p',
        text: 'A control system has three places that can make a decision, and each is good at one kind of decision. The controller scans every few milliseconds, keeps running when the network is gone, and can act on its outputs directly. SCADA sees everything across the plant, talks to people, and keeps records. A relay does one thing with no software at all and does it whether or not anything else is alive. The rule that follows is simple to state: a decision goes to the lowest layer that can make it well, and the layers above it read the result rather than making it again.',
      },
      {
        t: 'table',
        head: ['Decision', 'Home', 'Why'],
        rows: [
          ['A pump may not start with the discharge valve closed', 'Controller', 'Protects equipment; must hold with SCADA down; acts on the output directly'],
          ['The wet well is high', 'Controller', 'Seen every scan; drives the lag pump and the alarm bit; survives a lost link'],
          ['Who gets called about the high wet well', 'SCADA', 'About people and rosters; the controller has no phone'],
          ['Setpoint limits an operator may not exceed', 'Controller', 'Enforced at the point of use; SCADA displays the limit and clamps for convenience'],
          ['Runtime per pump for the monthly report', 'SCADA or historian', 'A record, computed from status the controller provides'],
          ['The pumps run on floats when the controller faults', 'Relay', 'Must work with the controller dead'],
          ['Emergency stop', 'Relay', 'Must work with everything dead'],
          ['A filter backwash sequence', 'Controller', 'A process sequence with timing and interlocks'],
          ['Which screen opens when the alarm is clicked', 'SCADA', 'Presentation'],
        ],
      },
      { t: 'h2', text: 'The controller owns the process' },
      {
        t: 'p',
        text: 'Anything that decides what equipment does belongs in the controller. That includes the obvious, sequences and interlocks and level control, and the less obvious: alarm conditions, setpoint limits, and the mode logic that says whether a device is available. The reason is not that controllers are better computers. It is that the controller is the only layer that is guaranteed to be present when the equipment runs. A permissive evaluated in SCADA stops protecting the pump the moment the SCADA server reboots, and it protects the pump wrongly when the network is slow and the value on the server is a minute old. The same permissive in the controller sees the valve limit switch every scan and acts on the starter directly, and a SCADA outage changes nothing about how the pump behaves.',
      },
      {
        t: 'p',
        text: 'Alarm conditions are the case most often argued. It is tempting to set the high level limit in SCADA because SCADA has a nice alarm configuration screen and the limit is easy to change there. But the alarm condition is also what the controller uses to start the lag pump and to drive the local horn, and if SCADA evaluates it separately the two will disagree the first time someone changes one and not the other. The controller decides that the level is high, once, with a setpoint and a deadband and a delay that SCADA can read and, within limits, write. SCADA takes the bit and does what it is good at: shows it, prioritizes it, records it, and calls someone.',
      },
      { t: 'h2', text: 'SCADA owns the people' },
      {
        t: 'p',
        text: 'The things SCADA should decide are the things that involve people: which alarm is urgent enough to wake the on-call operator, how the plant overview is drawn, which report goes to the state each month, how long history is kept. None of those needs to work when the network is down, because with the network down there is nobody to show anything to. SCADA is also the right home for calculations that span the plant, such as a daily flow balance or a chemical inventory, because the controller in one building does not know what the controller in another is doing and should not have to.',
      },
      {
        t: 'p',
        text: 'What SCADA should not do is close a control loop or hold an interlock. A level loop running on a SCADA server is a loop that stops when the server patches, and an interlock in a SCADA script is an interlock that stops when the script errors. Both have happened at plants that later could not explain why the tank overflowed on the night of the Windows update.',
      },
      { t: 'h2', text: 'Relays own the dead-controller case' },
      {
        t: 'p',
        text: 'There was a time when relay logic was the control system, and some plants still carry the habit of solving problems with a relay because a relay is quick and the panel shop has a drawer of them. The discipline now is that a relay does logic only when the logic must work with the controller dead. That is the backup float circuit at a lift station, the emergency stop, a guard interlock, and a few monitoring relays that trip a starter directly. Everything else in relays is invisible to SCADA, undocumented after the first change, and the reason a pump runs when the program says it should not.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The backup circuit is the proof of the rule',
        text: 'A lift station keeps floats, a level relay, and an alternator relay so that the pumps run when the controller is gone. That circuit is relay logic on purpose, drawn, tested on a schedule, and the reason a controller-based station is acceptable at all. It is not a template for the rest of the panel.',
      },
      { t: 'h2', text: 'The cases that get argued' },
      {
        t: 'dl',
        items: [
          { term: 'Setpoint clamps', def: 'The controller enforces the limit, because it is the last line. SCADA also clamps the entry field so the operator gets a message instead of a silent rejection. Two clamps are fine when the controller is the authority and SCADA reads the limit from it.' },
          { term: 'Runtime alternation', def: 'In the controller, because it changes which pump starts, which is a process decision. SCADA displays the hours and lets an operator fix the lead, logged.' },
          { term: 'Communication loss', def: 'The controller detects a lost link with a watchdog and holds a safe state; SCADA raises one communication alarm and marks the data stale. Both layers act, but on their own concerns.' },
          { term: 'Chemical dose calculation', def: 'In the controller when the pump is paced by it, because the pump runs whether or not SCADA is up. The dose the operator enters comes through SCADA with limits.' },
          { term: 'Scheduling by time of day', def: 'The controller runs the schedule from its own clock, synchronized by SCADA. A schedule that only exists on the server stops when the server stops.' },
          { term: 'Totalizers', def: 'In the controller for the value the process uses, in the historian for the report. They should agree, and the controller total is the one that survives a historian gap.' },
        ],
      },
      { t: 'h2', text: 'How a plant drifts' },
      {
        t: 'p',
        text: 'Nobody designs logic into the wrong layer. It drifts there. An integrator under time pressure puts an interlock in a SCADA script because the controller program is locked for the day. A technician solves a nuisance trip with a relay because the programming laptop is at the other plant. A screen builder adds an alarm in SCADA because the alarm list came late. Each is a small, sensible shortcut, and the sum is a plant nobody can reason about. The defense is a written rule, in the design standard, that says where each kind of decision lives, and a review at every change that asks the question.',
      },
      { t: 'h2', text: 'The one question' },
      {
        t: 'p',
        text: 'For every piece of logic there is one test: what happens when the layer above disappears. If the answer is that the process misbehaves, the logic is too high. A permissive that vanishes with SCADA belongs in the controller. A backup that vanishes with the controller belongs in a relay. Ask the question at design, ask it at every change, and the plant stays one that a technician can understand at two in the morning with the drawing and a meter.',
      },
    ],
    faqs: [
      {
        q: 'The SCADA platform has a good scripting engine. Why not use it for control?',
        a: 'Because the script runs on a server that reboots, patches, fails over, and loses its connection, and none of those events should change how a pump behaves. Use the scripting for reports, calculations across the plant, and presentation.',
      },
      {
        q: 'Our controllers are small and the program is full. Can SCADA take some of the load?',
        a: 'Take the reporting and the calculations to SCADA, and buy a larger controller for the process. A controller that is too small for the interlocks is a controller to replace, not a reason to move the interlocks.',
      },
      {
        q: 'Is a smart relay or a safety relay a controller for this purpose?',
        a: 'A safety relay is a relay: it does one function without software and belongs to the dead-controller case. A programmable smart relay is a small controller and should be treated as one, with a program that is backed up and documented.',
      },
      {
        q: 'What about logic in a drive?',
        a: 'Drives can run PID and simple sequences, and the same rule applies: the drive is below the controller, so logic in it must be something that should work with the controller gone, such as a hardwired run at a preset speed in backup mode. Normal control comes from the controller.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/interlocks',
      '/controls/plc-systems/programming/alarms',
      '/controls/control-panels/plc-panels/relays',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/controls/plc-systems/programming/control-strategies',
    ],
  },
  {
    path: '/articles/scada-articles/what-a-small-utility-should-ask-before-buying-scada',
    kind: 'article',
    title: 'What a Small Utility Should Ask Before Buying SCADA',
    summary:
      'A utility with a plant, a few dozen remote sites, and two operators on call is buying a system it will live with for twenty years. The questions that decide whether it works out, and they are not about features: licensing, staffing, and the exit.',
    answer:
      'Before buying SCADA, a small utility should ask who will maintain it at two in the morning, what the licensing costs in year ten, whether the history and configuration can be exported, how it fails over, how operators reach it from home securely, and what leaving it would take. Feature lists all look alike; those six answers separate a system the utility runs from a system that runs the utility.',
    keyPoints: [
      'Buy the system your staff and your local integrators can maintain, not the one with the longest feature list.',
      'Model the licensing over the life of the system, including the second server, the clients, and the tags you will add.',
      'Insist on data portability: history and configuration exported in a standard form, tested before purchase.',
      'Redundancy, backups, and remote access are design decisions to settle before the purchase order, not after.',
      'Write the exit plan while nobody needs it; the vendor will not.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['SCADA', 'Design', 'Engineering', 'Cybersecurity', 'Water'],
    blocks: [
      {
        t: 'p',
        text: 'A SCADA purchase at a small utility is rarely a bad product. It is a good product bought for the wrong reasons: because the neighboring utility has it, because the integrator likes it, because the demonstration was impressive, because the first-year price was low. Twenty years later the utility is still on it, paying for it, and hoping the one person who understands it does not retire. The questions below are the ones that would have changed the decision, and none of them is on a feature comparison sheet.',
      },
      { t: 'h2', text: 'Who will maintain it' },
      {
        t: 'p',
        text: 'The honest first question is who fixes it when it breaks on a Saturday. If the answer is a vendor two states away, the utility is buying a support contract with a product attached. If the answer is a local integrator, ask how many of their people know the platform and what happens when the one who built the system leaves. If the answer is the utility staff, ask whether the platform can be learned by a good operator with a week of training, or whether it needs a programmer. A platform that a utility can maintain itself, with an integrator for the big changes, is worth more than one that does everything if only someone were there to make it.',
      },
      { t: 'h2', text: 'What it costs in year ten' },
      {
        t: 'table',
        head: ['Cost', 'What to ask', 'Why it matters'],
        rows: [
          ['Server license', 'Perpetual or subscription; what stops if the subscription lapses', 'A lapsed subscription that blanks the screens is a hostage situation'],
          ['Tag count', 'What counts as a tag; the cost of the next tier; the tags a new lift station adds', 'Utilities add sites; a tier boundary turns a lift station into a license upgrade'],
          ['Clients', 'Per seat, per concurrent user, or unlimited; web and mobile clients', 'Two operators, a supervisor, a phone, and a screen in the shop is five clients'],
          ['Redundancy', 'The second server license, and whether it is full price', 'Redundancy that costs double is redundancy that does not get bought'],
          ['Historian', 'Included or separate; licensed by tags, by data rate, or by retention', 'History is the part with regulatory value'],
          ['Drivers', 'Which controller and protocol drivers are included and which cost extra', 'The one driver you need is always the extra one'],
          ['Support and updates', 'Annual maintenance percentage and what it buys', 'Skipping maintenance strands the system on an old version'],
          ['Integrator time', 'Hours to add a site, a screen, a report', 'The largest cost over the life is labor'],
        ],
      },
      {
        t: 'p',
        text: 'Model all of it over ten years with the sites the utility expects to add. The cheapest first year is often the most expensive decade.',
      },
      { t: 'h2', text: 'Whether the data is yours' },
      {
        t: 'p',
        text: 'The history in the historian is the record of every permit parameter, every pump runtime, and every alarm. The configuration is the sum of years of engineering. Ask, before buying, for a demonstration of exporting both in a standard form, a comma-separated file of history and a readable export of the tag database and screens, and ask what it would take to import the history into another product. A vendor who cannot answer is a vendor who owns your data. Ask also where the data lives: on servers the utility owns, on a vendor cloud, or both, and what the contract says happens to it when the contract ends.',
      },
      { t: 'h2', text: 'How it fails' },
      {
        t: 'p',
        text: 'Servers fail, networks fail, and the utility is judged by what happens to the plant while they are down. Ask how the platform fails over, how long that takes, what the operator sees during it, and what it costs. Ask what the controllers do with the server gone, which is a question about the controller design as much as the SCADA, and whether the platform buffers history at the collectors so an outage leaves no gap. Ask what the backup consists of and ask for a restore to be demonstrated on a spare machine during the evaluation. A platform that has never been restored from backup has no backup.',
      },
      { t: 'h2', text: 'How operators reach it from home' },
      {
        t: 'p',
        text: 'Every small utility wants the on-call operator to see the plant from home, and every one of them will eventually be offered a shortcut: a web client exposed to the internet, a remote desktop tool on the server, a cellular router at a lift station with a public address. Ask the vendor how remote access is meant to work, and accept only an answer that includes a virtual private network with multi-factor authentication and a jump host in a demilitarized zone. Ask how vendor support connects, and require the same path with per-session enablement. The platform that makes secure remote access easy is the one that will be used securely.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The demonstration is not the plant',
        text: 'A demonstration runs on a laptop with one controller and no radio path. Ask to see the platform polling thirty sites over a real radio network, with a site failing, before believing anything about telemetry performance.',
      },
      { t: 'h2', text: 'What leaving would take' },
      {
        t: 'p',
        text: 'Nobody buying a system wants to think about leaving it, and that is exactly when to write the exit plan. It is a page: where the history is and how it exports, where the configuration is and what format it is in, which controller programs and drivers would need to change, and what the licensing says about termination. Writing it forces the questions above to be answered in the contract rather than discovered in year twelve. It also makes the vendor relationship healthier, because a customer who can leave is a customer who gets support.',
      },
      { t: 'h2', text: 'A short list for the evaluation' },
      {
        t: 'ol',
        items: [
          'Name the people who will maintain it and confirm they can, with training if needed.',
          'Get the ten-year cost with the expected growth, in writing.',
          'Export history and configuration during the evaluation and look at the files.',
          'Watch a failover and a restore from backup.',
          'See the remote access design and the vendor access procedure.',
          'Call two utilities of similar size that have run it for ten years, and ask what they would do differently.',
          'Write the exit plan and put it in the contract file.',
        ],
      },
      {
        t: 'p',
        text: 'None of this is about which platform is best. Several are excellent. It is about buying one for reasons that will still be true in twenty years.',
      },
    ],
    faqs: [
      {
        q: 'Should a small utility consider a hosted or cloud SCADA?',
        a: 'It can, with the same questions asked harder: where the data lives, what runs locally when the internet is down, how the field connection is secured, and what the contract says at termination. Local control must never depend on the cloud, and the security review is the decision.',
      },
      {
        q: 'How much should we budget for the integrator?',
        a: 'More than the software. Over the life of the system the labor to add sites, change screens, and build reports exceeds the license cost at most utilities. Choose a platform with an integrator base within driving distance and ask for hourly rates for routine changes.',
      },
      {
        q: 'Is unlimited licensing always better?',
        a: 'It removes the tag and client anxiety and it also removes the incentive to keep the system tidy. It is better for a utility that will grow and worse for one that will let a system sprawl without standards. The standards matter more than the license model.',
      },
      {
        q: 'We already own a platform we do not like. Replace it?',
        a: 'Ask the six questions of the current system first. If the answers are acceptable, the problem may be the implementation, not the platform, and a rebuild on the same product with standards is cheaper than a migration. If the answers are not acceptable, plan the migration with the exit plan you should have had.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-platforms/other-platforms',
      '/controls/scada-hmi/scada-fundamentals/redundancy',
      '/cybersecurity/remote-access/vpn-design',
      '/cybersecurity/backups/scada-backups',
      '/controls/scada-hmi/historian-data/long-term-storage',
      '/controls/scada-hmi/scada-platforms/vtscada',
    ],
  },
  {
    path: '/articles/water-articles/the-tank-level-trend-tells-the-whole-story',
    kind: 'article',
    title: 'The Tank Level Trend Tells the Whole Story',
    summary:
      'One trend, a storage tank level over a week, holds most of what an operator needs to know about a water system: demand, source capacity, leaks, pump health, water age, and why it deserves a permanent place on the main screen.',
    answer:
      'A storage tank level trend over several days shows the diurnal demand as the daily sawtooth, the source capacity as the slope of the fills, a leak or a main break as a fall that does not match the time of day, pump wear as fills that take longer each month, water age as how much of the tank actually cycles, and the control bands as the turning points. It is the single most informative trend in a water system, and it should be visible on the main screen every day.',
    keyPoints: [
      'The daily sawtooth is demand; its depth is how much of the tank turns over, which is water age.',
      'The fill slope is source capacity minus demand; a slope that flattens over months is a pump or a well losing capacity.',
      'A fall at the wrong time of day, or a floor that keeps dropping, is a leak, a break, or an open hydrant.',
      'The turning points are the control bands; a tank that never reaches the top has a source problem, one that never reaches the bottom is not turning over.',
      'Put the seven-day tank trend on the main screen, with fixed scales and the bands drawn on it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Level', 'SCADA', 'HMI', 'Pumps'],
    blocks: [
      {
        t: 'p',
        text: 'Ask an experienced water operator how the system is doing and they will look at one thing before they answer: the tank. Not the number, the trend. A week of storage tank level on one chart is a record of everything the system did, and reading it is a skill that takes an hour to learn and a career to refine. It is also the best argument for putting a trend, rather than a number, in the center of the main screen.',
      },
      { t: 'h2', text: 'The daily sawtooth' },
      {
        t: 'p',
        text: 'Over a normal day the tank falls through the morning as people wake, shower, and irrigate, flattens or rises in the middle of the day, falls again in the evening, and fills overnight when demand is low and the sources catch up. That sawtooth is the demand curve of the community drawn by the tank. Its depth, from the overnight peak to the evening trough, is the fraction of the tank that actually turns over each day, and that fraction is the water age. A tank that swings a fifth of its depth turns over in about five days; one that swings a twentieth is holding water for weeks, losing its disinfectant residual and warming in the sun. The control bands decide the swing, and the sawtooth is the evidence of whether they are set for turnover or for a comfortably full tank.',
      },
      { t: 'h2', text: 'The fill slope' },
      {
        t: 'p',
        text: 'When the sources are running and the tank is rising, the slope of the rise is the source capacity minus the demand at that hour. Overnight, with demand low, the slope is close to the source capacity itself. Watch that overnight slope month to month. A well pump that is wearing, a screen that is plugging, a booster whose impeller is eroding, or a source whose static level is falling all show up as a fill that takes a little longer than it did last season, long before any single night looks wrong. The comparison is the diagnosis, and a historian that keeps a year of tank level makes the comparison a matter of overlaying two weeks.',
      },
      {
        t: 'table',
        head: ['Shape', 'Reading', 'Look at'],
        rows: [
          ['Regular sawtooth, tank reaches the top every night', 'Normal; sources adequate', 'Turnover depth for water age'],
          ['Sawtooth deepening in summer, tank still reaches the top', 'Seasonal demand within capacity', 'Nothing; note the margin'],
          ['Tank no longer reaches the top on hot days', 'Sources at their limit', 'Source capacity, the schedule, a pump losing flow'],
          ['Fill slope flatter than last year at the same demand', 'A source losing capacity', 'Pump curve, well level, screens, valves'],
          ['Fall at two in the morning', 'Leak, main break, open hydrant, or a large night user', 'Night flow, pressure zones, the streets'],
          ['Floor lower each day with normal fills', 'A leak growing, or a demand the sources cannot meet', 'Night demand trend'],
          ['Flat line', 'Transmitter frozen, or nothing flowing either way', 'Instrument, then the valves'],
          ['Sawtooth with a jagged edge', 'Pumps cycling too often, or an altitude valve hunting', 'Control bands, starts per hour, the valve'],
          ['Level rising faster than any source could fill', 'Transmitter fault', 'Instrument'],
        ],
      },
      { t: 'h2', text: 'Leaks and breaks' },
      {
        t: 'p',
        text: 'The most valuable thing the tank trend does is find water that is leaving the system when nobody is using it. A fall in the small hours, when demand should be at its minimum, is water going somewhere: a main break, a hydrant left open, a service line failure, a large customer running at night, or an interconnection valve that is not closed. A floor that drops a little further each night while the fills look normal is a leak growing. Both are visible days before the complaint call, and both are the reason the trend deserves a fixed scale and an operator who looks at it with coffee every morning.',
      },
      { t: 'h2', text: 'Pump health' },
      {
        t: 'p',
        text: 'A fill that takes longer is the early sign; the trend also shows the pumps in the shape of the fill. A fill that starts fast and flattens is a well pulling down its water level. A fill that stops short with the pump still running is a pump that has lost its head, a valve that is not open, or a break between the pump and the tank. A fill that starts late every night is a level band that is too low or a pump that takes several tries to start. Each of those, matched against the pump run status drawn on the same chart, is a diagnosis without a site visit.',
      },
      { t: 'h2', text: 'The control bands' },
      {
        t: 'p',
        text: 'The turning points on the trend are the control settings made visible. The level at which the sources start and stop, the pressure a booster holds, the schedule that fills overnight: they draw the top and bottom of the sawtooth. A tank that never reaches the off level is a system where the sources cannot keep up or the schedule is too short; a tank that never falls to the lead-on level is one that is not turning over. Drawing the bands on the trend as horizontal lines makes the comparison instant, and an operator who sees the level bumping against a band knows which setting to look at.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Fixed scales, seven days, on the main screen',
        text: 'The tank trend earns its place on the main screen with a fixed scale from empty to overflow, the control bands drawn on it, seven days visible, and the source pump run status as a band along the bottom. Autoscaling hides the shape, a one-day window hides the trend, and a number hides everything.',
      },
      { t: 'h2', text: 'What the number cannot tell you' },
      {
        t: 'p',
        text: 'A tank level of 24.6 feet says the tank is fairly full. It does not say whether it was 26 feet at this time yesterday, whether it took an hour longer to fill last night, whether it fell at three in the morning, or whether it has been within a foot of full for a month and the water is old. The trend says all of that at a glance. A system that shows operators numbers and hides trends behind a menu is a system that finds its leaks by phone call.',
      },
    ],
    faqs: [
      {
        q: 'What if the system has several tanks?',
        a: 'A trend per tank, and one chart with all of them on the same scale for the overview. Tanks in the same pressure zone should move together; one that does not has a valve or a pump problem between it and the others.',
      },
      {
        q: 'How deep should the daily swing be?',
        a: 'Deep enough to turn the tank over in a few days while keeping the fire reserve and the outage reserve. The residual at the tank outlet is the check; if it is falling through the week, the swing is too shallow.',
      },
      {
        q: 'The trend is smooth but the water age is still high.',
        a: 'A smooth sawtooth that only uses the top few feet is the sign: the fill starts before much has left. Lower the lead-on level, deepen the swing, and consider a mixer if the tank stratifies.',
      },
      {
        q: 'Can the controller read the trend for me?',
        a: 'Partly. A rate-of-change alarm catches a fast fall and a transmitter fault, a night flow calculation catches a growing leak, and a fill-time calculation catches a source losing capacity. Those alarms are worth building; they still do not replace an operator who looks at the trend.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/storage/ground-storage-tanks',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/water-wastewater/water-systems/storage/pump-sequencing',
      '/how-to/scada-how-to/trend-data',
      '/controls/scada-hmi/hmi-design/trends',
      '/water-wastewater/water-systems/water-pumping/well-pumps',
    ],
  },
  {
    path: '/articles/wastewater-articles/the-lift-station-that-overflowed-with-everything-working',
    kind: 'article',
    title: 'The Lift Station That Overflowed With Everything Working',
    summary:
      'A composite of overflows that happen at well-built stations: every pump ran, every alarm fired, every device did what it was designed to do, and the handful of changes that break the chain.',
    answer:
      'Lift stations overflow with everything working when the design assumes each part will be watched: an alarm that reaches a screen nobody is looking at, a backup float circuit that was never tested, a level band that leaves no time between the high alarm and the overflow, a communication alarm with the same priority as a door switch, and a callout roster with a number that changed. Each part performed; the system had no path from a rising wet well to a person with time to act.',
    keyPoints: [
      'An alarm is not a response; the design has to name the person, the path, and the time they have.',
      'Backup circuits and callouts that are never tested do not exist.',
      'Level bands must leave response time between the high alarm and the overflow, in minutes, calculated from inflow.',
      'A communication loss at a critical station is an urgent alarm, not a nuisance.',
      'Storm mode, generator mode, and the second path are for the night this happens, and they are designed in daylight.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Wastewater', 'Lift Stations', 'Alarms', 'Design', 'Telemetry'],
    blocks: [
      {
        t: 'p',
        text: 'What follows is a composite. No single station did all of this, but every part of it has happened somewhere, and the stations it happened at were not badly built. They had modern controllers, telemetry, generators, and backup floats. They overflowed anyway, and the investigation afterward found nothing broken. That is the point: the failure was in the spaces between the parts.',
      },
      { t: 'h2', text: 'The night' },
      {
        t: 'p',
        text: 'Rain begins in the evening. By ten the inflow to a duplex station has doubled, and the level control does what it should: the lead pump runs longer each cycle, then the lag pump joins it. At eleven a power blink trips the utility feed for a few seconds, the transfer switch moves to the generator, and both pumps, called by the high level, start on the same second. The generator breaker trips on the inrush. The station is now on neither source. The controller, on its UPS, raises a power failure alarm and a high level alarm and sends both to SCADA over the radio.',
      },
      {
        t: 'p',
        text: 'At the plant, the alarms arrive on the screen. The operator on shift is in the headworks building dealing with the same storm. The alarm callout system dials the on-call phone for the power failure, a high priority alarm, and reaches a number that belonged to an operator who left in the spring. The high level alarm is configured at the same priority as the power failure; it dials the same number. Twenty minutes later the wet well is at the high float. The backup float circuit, which would run the pumps on floats if the controller were dead, does nothing, because the controller is not dead and the circuit only takes over when the controller watchdog drops. There is no power to run the pumps anyway. At midnight the station overflows into a creek.',
      },
      { t: 'h2', text: 'What worked' },
      {
        t: 'ul',
        items: [
          'The level control staged the pumps correctly.',
          'The transfer switch transferred.',
          'The controller stayed up on its UPS and generated every alarm it was designed to.',
          'The radio delivered every alarm.',
          'The callout system dialed the configured number.',
          'The backup float circuit was healthy and would have run the pumps if the controller had faulted and power had been present.',
        ],
      },
      { t: 'h2', text: 'What did not exist' },
      {
        t: 'dl',
        items: [
          { term: 'A staggered start on generator', def: 'The design allowed both pumps to start on the same scan when power returned. A few seconds of delay between them, or a rule that only the lead starts on the first scan after a transfer, keeps a generator that carries two pumps running from tripping on two starts.' },
          { term: 'A generator sized and tested for the worst case', def: 'The generator was sized for the running load and tested monthly with no load. A test under the actual start sequence would have tripped it in daylight.' },
          { term: 'A callout roster that was maintained', def: 'The roster had a number that nobody updated when an operator left, and no escalation to a second person when the first did not acknowledge.' },
          { term: 'Priorities that meant something', def: 'Power failure at a station with a generator is a high alarm; high level at a station with no power is urgent. Configured at the same priority, they dialed the same dead number in the same way.' },
          { term: 'Response time in the level bands', def: 'The high alarm sat a foot below the overflow. At the storm inflow, that foot was fifteen minutes. The band was set from the well geometry years earlier without asking how long it would give.' },
          { term: 'A second path', def: 'When the radio alarm reached a phone nobody answered, there was nothing else: no dialer at the site, no text message to a second person, no alarm on a screen someone was watching.' },
          { term: 'A backup that covers this case', def: 'The backup circuit covered a dead controller. It did not cover a live controller with no power, and nothing did.' },
        ],
      },
      { t: 'h2', text: 'The chain' },
      {
        t: 'p',
        text: 'Each item above is a small decision, and each was defensible when it was made. Together they form a chain: a design that assumed power would be there or the generator would carry it, an alarm system that assumed a person would answer, and a level band that assumed time. Break any link and the station does not overflow. The generator carries the load; or the operator is reached; or the high alarm comes early enough for a visit; or a second path reaches a second person. Reliability at a lift station is not the reliability of the parts. It is the number of independent ways the wet well can reach a person with time to act.',
      },
      { t: 'h2', text: 'Breaking the chain' },
      {
        t: 'steps',
        items: [
          { title: 'Calculate the response time', text: 'For each station, the volume between the high alarm and the overflow divided by the design storm inflow, in minutes. If it is less than the time it takes to get someone to the site, lower the high alarm or raise the overflow margin, and write the number on the drawing.' },
          { title: 'Stagger every start', text: 'On any return of power and on every transfer, one pump at a time with a delay, and on generator power the number of pumps allowed to start together limited to what the generator has been tested to carry.' },
          { title: 'Test the generator under the real sequence', text: 'A monthly test is a load test with the pumps started the way the controller starts them. A generator that trips in the test is fixed in the test.' },
          { title: 'Make the callout a maintained system', text: 'A roster that is reviewed when anyone leaves, an escalation to a second and third person, an acknowledgment that stops the escalation, and a monthly test call to every number on it.' },
          { title: 'Rationalize the priorities', text: 'High level at a station with no power, both pumps failed, and communication loss at a critical station are urgent. Everything else is lower. The urgent ones wake people and escalate; nothing else does.' },
          { title: 'Add a second path at critical stations', text: 'A cellular text alert from the site controller, an autodialer on the high float, or a second radio path, so that one dead phone number cannot be the whole story.' },
          { title: 'Cover the no-power case', text: 'A portable generator plan with a receptacle and a person who can be there within the response time; or a permanent generator tested under load; or storage that buys the time.' },
          { title: 'Test the backup circuit for the case it covers', text: 'Fault the controller with power present and watch the floats run the pumps. Then write down the cases it does not cover, so nobody assumes it does.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Every station has a night like this coming',
        text: 'The storm, the power blink, the wrong number, and the operator busy elsewhere will coincide eventually at every station in a system. The design question is not whether the parts work. It is whether, on that night, the rising wet well has more than one way to reach a person with time to act.',
      },
      { t: 'h2', text: 'Afterward' },
      {
        t: 'p',
        text: 'The investigation at a station like this finds nothing broken, and the temptation is to call it an act of weather and move on. The better outcome is a list like the one above, worked through at every station in the system, because the same chain exists everywhere the same design habits were used. The overflow that gets reported is the one that teaches; the ones that do not happen afterward are the ones that were designed out.',
      },
    ],
    faqs: [
      {
        q: 'Would a triplex station have prevented it?',
        a: 'Not with no power. A third pump helps when the pumps are the limit; here the limit was the generator and the callout. Redundancy in the pumps does nothing for a failure in the path to a person.',
      },
      {
        q: 'Is a cellular text alert reliable enough to count as a second path?',
        a: 'As a second path, yes: it is independent of the radio and the plant callout system, and independence is what a second path is for. As the only path, no, for the same reason a radio alone is not.',
      },
      {
        q: 'How much response time is enough?',
        a: 'The time it takes to get a person and a portable pump or generator to the site at night in bad weather, plus margin; often thirty to sixty minutes. If the wet well cannot provide it at storm inflow, the station needs storage, a permanent generator, or a lower high alarm with a different response.',
      },
      {
        q: 'Who owns the callout roster?',
        a: 'Someone named, with the roster on a review schedule and a test call procedure. A roster nobody owns is a list of numbers that used to work.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/high-level',
      '/water-wastewater/wastewater-systems/lift-stations/generator-operation',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-scada',
      '/controls/scada-hmi/alarm-management/notification',
      '/controls/scada-hmi/alarm-management/alarm-priority',
    ],
  },
  {
    path: '/articles/instrumentation-articles/calibration-is-a-program-not-an-event',
    kind: 'article',
    title: 'Calibration Is a Program, Not an Event',
    summary:
      'An instrument calibrated once at startup and again when someone complains is an instrument whose readings cannot be trusted in between. What a calibration program is, and how a small utility runs one without a full-time instrument technician.',
    answer:
      'A calibration program is a schedule, a procedure, a tolerance, and a record for every instrument that matters, run by named people. Its product is not adjusted instruments but as-found records: the evidence that every reading since the last check was within tolerance, and the drift history that sets the next interval. A utility that calibrates only when something looks wrong has readings it cannot defend and a permit it cannot prove.',
    keyPoints: [
      'The as-found reading is the product; it proves the data since the last calibration and sets the interval.',
      'Every instrument on the list has a tolerance, a procedure, a standard, an interval, and an owner.',
      'Intervals come from the drift record, not from a calendar habit; a stable instrument earns a longer one.',
      'Compliance instruments get the tightest tolerances and the traceable standards; a level in a wet well does not need either.',
      'A small utility runs the program with a spreadsheet, a calibrator, a few standards, and a technician who owns the list.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Instrumentation', 'Commissioning', 'Documentation', 'Standards', 'Water'],
    blocks: [
      {
        t: 'p',
        text: 'Most instruments in a water or wastewater plant were calibrated on the day they were installed. Some were calibrated again when an operator noticed the chlorine analyzer disagreeing with the bench, or when the state inspector asked. In between, the readings went into the historian, into the reports, and into control decisions, and nobody could say whether they were right. That is not a calibration program. It is a series of events, and the gap between events is where the trouble lives.',
      },
      { t: 'h2', text: 'What a program is' },
      {
        t: 'p',
        text: 'A calibration program is a list of instruments, each with five things attached: the tolerance the reading must hold, the procedure that checks it, the standard it is checked against, the interval between checks, and the person responsible. It is run on the schedule the intervals produce, it records the as-found and as-left readings every time, and it is reviewed once a year to adjust the intervals from what the records show. The list is not every instrument in the plant. It is the instruments whose readings matter: the ones the permit is built on, the ones the control loops use, and the ones whose failure would cost money or safety. A pressure gauge on a hose bib is not on the list. The effluent flowmeter is at the top of it.',
      },
      {
        t: 'table',
        head: ['Class', 'Examples', 'Tolerance', 'Interval to start', 'Standard'],
        rows: [
          ['Compliance', 'Effluent flow, residual chlorine, effluent pH, turbidity at the filters', 'Tight, per the permit and the method', 'Monthly or per the permit', 'Traceable, certified, in date'],
          ['Control', 'Wet well level, dissolved oxygen, chemical feed flow, discharge pressure', 'What the loop needs, often 1 to 2 percent of span', 'Quarterly to semiannual', 'Calibrated test instruments'],
          ['Monitoring', 'Tank levels, non-permit pressures, temperatures', 'Loose, 2 to 5 percent', 'Annual', 'Test instruments'],
          ['Indication only', 'Local gauges, sight glasses', 'Replace if wrong', 'On complaint', 'A comparison with a calibrated transmitter'],
        ],
      },
      { t: 'h2', text: 'The as-found reading is the product' },
      {
        t: 'p',
        text: 'The moment that matters in a calibration is before anyone touches the instrument. The as-found reading, compared with the standard, says whether the instrument was within tolerance, which means every reading it produced since the last check can be defended. If it was outside tolerance, the record says by how much and since when it is unknown, and the plant has a decision to make about the data in between. A calibration record that shows only the as-left reading proves that the instrument was right for a moment on one day. It proves nothing about the month before, and an inspector who knows the difference will ask.',
      },
      {
        t: 'p',
        text: 'The as-found record is also what sets the interval. An instrument that has been within a quarter of its tolerance at every quarterly check for two years can go to semiannual; one that arrives out of tolerance at every check needs a shorter interval, or a look at why it drifts, or replacement. Intervals set by habit are wrong in both directions: too short for the stable instruments, which wastes the technician, and too long for the drifters, which loses data.',
      },
      { t: 'h2', text: 'Adjusting is optional; recording is not' },
      {
        t: 'p',
        text: 'An instrument found within tolerance is left alone. Adjusting it adds the uncertainty of the standard and the technician to a reading that was already acceptable, and it erases the drift trend that would have told the plant when the sensor was aging. An instrument found outside tolerance is adjusted if the slope and offset stay within the healthy range the manufacturer states, and replaced if they do not. Either way, the record carries both numbers, the standard used with its lot and date, and the name.',
      },
      { t: 'h2', text: 'Standards and test equipment' },
      {
        t: 'p',
        text: 'A program is only as good as what it calibrates against. Buffers expire and absorb carbon dioxide; conductivity standards evaporate; chlorine standards decay in hours; a pressure calibrator has its own certificate with a date on it. The compliance instruments are checked against standards traceable to a national reference, in date, stored as the label says. Control and monitoring instruments can be checked against the plant test instruments, which are themselves calibrated on a schedule. A technician who calibrates the effluent pH electrode with a buffer that has been open since spring has calibrated it to an unknown number.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'What a small utility needs',
        text: 'A spreadsheet or a maintenance system with the instrument list and the intervals; a loop calibrator; a pressure calibrator; fresh pH, conductivity, and chlorine standards on a purchase schedule; a portable dissolved oxygen and turbidity meter that is itself calibrated; a template for the record; and one person who owns the list. That is the whole program for most plants under a few million gallons a day.',
      },
      { t: 'h2', text: 'Running it without a full-time technician' },
      {
        t: 'ul',
        items: [
          'Put the list and the schedule where the work orders come from, so a calibration is a work order like a pump inspection.',
          'Batch the work: all the analyzers on one day, all the pressures on another, so the standards are fresh and the technician is in the rhythm.',
          'Write the procedure for each instrument class once, one page, with the tolerance and the standard on it.',
          'Record on a template that has as-found, as-left, standard, lot, date, and name as required fields; a record with a blank as-found is not accepted.',
          'Review the records once a year: adjust intervals, retire instruments that drift, and add anything new.',
          'Keep the records where the permit records are, because that is where the inspector will look.',
        ],
      },
      { t: 'h2', text: 'The moment it pays' },
      {
        t: 'p',
        text: 'The program pays on the day someone challenges a number. A permit exceedance the utility believes was an instrument error; a customer complaint about a meter; an engineer questioning a flow total in a capacity study. With as-found records the utility can say exactly how good the number was and when it was last proven. Without them the utility can say it calibrated the instrument when it was installed, and that ends the conversation in the wrong direction.',
      },
    ],
    faqs: [
      {
        q: 'How many instruments should be on the list?',
        a: 'All of the compliance and control instruments, which at a small plant is a few dozen. Monitoring instruments go on with long intervals. Local gauges stay off; replace them when they disagree with the transmitter beside them.',
      },
      {
        q: 'Can operators do the calibrations?',
        a: 'Yes, with the written procedure, the right standards, and the template. Many small utilities have an operator who owns the program alongside their other duties. What does not work is a program with no owner.',
      },
      {
        q: 'Does the online analyzer need calibrating if we take laboratory samples anyway?',
        a: 'Yes: the analyzer runs the control and feeds the record between samples, and the laboratory samples are the verification. The calibration program uses the sample comparisons as the as-found record and adjusts the analyzer when the difference exceeds the tolerance.',
      },
      {
        q: 'What tolerance should a wet well level transmitter have?',
        a: 'Whatever the control needs: a few inches on a well with feet between the bands. Its calibration is a check against a tape at two levels, annually, with the record kept. It does not need a traceable standard; it needs to be checked.',
      },
    ],
    related: [
      '/controls/instrumentation/calibration/calibration-procedures',
      '/controls/instrumentation/calibration/calibration-documentation',
      '/controls/instrumentation/calibration/calibration-troubleshooting',
      '/engineering-library/checklists/calibration-checklist',
      '/controls/instrumentation/analytical/chlorine',
      '/water-wastewater/wastewater-systems/wastewater-treatment/effluent',
    ],
  },
  {
    path: '/articles/panels-articles/the-panel-you-can-troubleshoot-at-two-in-the-morning',
    kind: 'article',
    title: 'The Panel You Can Troubleshoot at Two in the Morning',
    summary:
      'Panels are designed for the day they are built and used for the nights they fail. The design choices that decide whether a technician with a flashlight and a meter can find the fault: labels and wire numbers, and the fuse that tells you it blew.',
    answer:
      'A panel that can be troubleshot at two in the morning has every wire numbered to a schematic in the door pocket, field wiring on labeled terminal strips with test points and fused loops, indicating fuse holders and status lights that show the state at the door, devices placed where a meter can reach them, and nothing that requires a laptop to read. None of it costs much on the day the panel is built; all of it is unobtainable afterward.',
    keyPoints: [
      'Every wire numbered, every terminal labeled, and the schematic that matches them in the door pocket.',
      'Field wiring on terminal strips with disconnect and test features, never landed straight on modules.',
      'Indicating fuse holders, power supply lights, relay indicators, and controller status visible with the door open.',
      'Component placement that a meter probe can reach and a flashlight can read.',
      'A panel that needs a laptop to diagnose is a panel diagnosed after the drive to get one.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Design', 'Troubleshooting', 'Documentation', 'UL 508A'],
    blocks: [
      {
        t: 'p',
        text: 'Every control panel has two lives. The first is the few weeks it spends being designed, built, and commissioned, in a shop with good light, by people who know it. The second is the ten or twenty years it spends in the field, opened at night by a technician who has never seen it, holding a flashlight in their teeth, trying to work out why the pump will not start. Panels are designed for the first life. The design choices below are the ones that make the second life survivable, and every one of them is cheap on the day the panel is built.',
      },
      { t: 'h2', text: 'The drawings, in the pocket, matching the panel' },
      {
        t: 'p',
        text: 'The single most valuable object in a panel at night is the schematic, and it is valuable only if it is there and it matches. A door pocket with the as-built schematic, the terminal schedule, and the network schedule, laminated or in a sleeve, turns a cabinet of wires into a diagram. A schematic in an office file cabinet across town is worth nothing at the site, and a schematic that does not match the panel because the last three changes were never drawn is worse than none, because it is believed. The panel standard says the drawings live in the pocket and every change updates them before the technician leaves.',
      },
      { t: 'h2', text: 'Wire numbers and terminals' },
      {
        t: 'p',
        text: 'A wire with a number at both ends that appears on the schematic can be followed with a meter in seconds. A wire with no number is traced by hand through a wireway, and a wire with a number that does not appear on the drawing is worse. The panel shop labels every conductor; the standard says the numbers follow the schematic sheet and line so that the number itself locates the drawing. Field wiring lands on terminal strips grouped by voltage and function, with the terminal number on the marker and in the schedule, and never directly on a module, because a module replacement should never disturb a field wire.',
      },
      {
        t: 'ul',
        items: [
          'Fused terminals on every instrument loop, so a loop can be isolated without lifting a wire.',
          'Disconnect or knife terminals on the loop negative, so a meter goes in series without a screwdriver.',
          'Test points on the terminals that accept meter probes.',
          'A fifth of every strip spare, labeled spare, so an added wire has a home instead of a splice.',
          'Multi-level terminals drawn as multi-level on the schematic, with the levels labeled.',
        ],
      },
      { t: 'h2', text: 'State visible at the door' },
      {
        t: 'p',
        text: 'The technician at night wants to know, before touching anything, what is on and what is not. Indicating fuse holders show the open fuse without pulling each one. Power supply lights show which supply is up. Relays with indicators show which coils are energized. The controller and every I/O module have status lights that the layout leaves visible, not hidden behind a wireway cover or a door-mounted device. A control voltage light on the door, a run light per pump, and a fault light per pump mean the first look answers the first questions. A panel where the state is only available in the software is a panel where the first hour is spent finding the laptop.',
      },
      {
        t: 'table',
        head: ['Question at the door', 'Answered by', 'Cost at build'],
        rows: [
          ['Is there control power', 'A pilot light on the door and an indicating fuse on the transformer secondary', 'Trivial'],
          ['Which fuse blew', 'Indicating fuse holders throughout', 'A few dollars per holder'],
          ['Is the 24 volt supply up', 'A supply status light and a monitoring contact wired to an input', 'Included with most supplies'],
          ['Is the controller running', 'Status lights visible with the door open', 'Layout'],
          ['Is the pump commanded, and is it running', 'A relay indicator and a run light from the starter feedback', 'Small'],
          ['What tripped', 'Overload and breaker indicators visible; fault reasons decoded on the screen', 'Small, plus program time'],
          ['Is the radio talking', 'Radio activity indicators visible; a link status light', 'Layout'],
        ],
      },
      { t: 'h2', text: 'Room for a meter' },
      {
        t: 'p',
        text: 'Panels are laid out to fit the components, and the technician arrives later to find the terminal they need is behind a wireway cover, below a transformer, or six inches from a live bus with no room for a probe. The layout standard leaves clearance in front of every terminal strip, keeps the wireway covers removable with the panel live, places the disconnect where it can be operated with the door closed, and puts the dead front over the power section so the control section can be worked on without exposure. A panel that has to be de-energized to measure a 24 volt loop is a panel where the measurement does not happen.',
      },
      { t: 'h2', text: 'Nothing that needs a laptop to read' },
      {
        t: 'p',
        text: 'Programmable devices are wonderful and their diagnostics are wonderful, and at two in the morning the laptop is at the office, its battery is flat, or the software on it is the wrong version. The design gives every essential diagnostic a physical indication or a screen at the panel: the controller fault on its light and on the touchscreen with the reason in words; the drive fault on the drive display; the network status on the switch lights. The laptop is for fixing, not for finding out.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The two in the morning test',
        text: 'Before a panel leaves the shop, someone who did not build it stands in front of it with the drawings from the pocket, a flashlight, and a meter, and is asked to find a simulated fault: a pulled fuse, a lifted wire, a tripped overload. If it takes more than a few minutes, the panel is not finished.',
      },
      { t: 'h2', text: 'The cost' },
      {
        t: 'p',
        text: 'Everything above adds a few percent to the price of a panel: indicating holders instead of plain ones, fused terminals on the loops, a few more terminals, a laminated drawing set, and a layout that respects clearance. Against the cost of one night with a station down and a technician guessing, the few percent is the best money in the project. The panels that get maintained well for twenty years are the panels that were built to be understood by strangers.',
      },
    ],
    faqs: [
      {
        q: 'Our panels were built years ago without any of this. Where do we start?',
        a: 'With the drawings and the labels. An afternoon per panel to verify the schematic against the wiring, number what is not numbered, and put a laminated set in the pocket is the highest return. Indicating fuse holders and fused loop terminals can follow at the next outage.',
      },
      {
        q: 'Do door indicators violate high-performance HMI thinking?',
        a: 'No. The screen follows the high-performance rules; the door shows physical state for the technician standing at the panel. They serve different people at different moments.',
      },
      {
        q: 'Is a touchscreen on the panel enough?',
        a: 'It helps, and it fails, and it depends on the controller being alive. Physical indication for control power, fuses, supplies, and pump status remains, because those are the things you need to know when the touchscreen is dark.',
      },
      {
        q: 'Who should do the two in the morning test?',
        a: 'The utility technician who will maintain the panel, at the factory acceptance test. It is the best training they will get on the panel and the best review the panel will get.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/terminals',
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/panel-troubleshooting/blown-fuses',
      '/how-to/panel-how-to/build-terminal-schedules',
      '/engineering-library/drawings/schematics',
      '/engineering-library/checklists/fat',
    ],
  },
  {
    path: '/articles/networking-articles/fiber-between-buildings-every-time',
    kind: 'article',
    title: 'Fiber Between Buildings, Every Time',
    summary:
      'The copper Ethernet cable between two buildings works on the day it is pulled and costs the plant a controller, a switch, and how to specify it so it stays simple.',
    answer:
      'A copper network cable between buildings connects two grounds that are never at the same potential, carries lightning into the panel, and picks up noise along its length. Fiber does none of that, because it has no conductor. For any link that leaves a building, crosses to a different ground, runs near power, or exceeds a hundred meters, fiber is the answer, and the small premium at installation is repaid the first time a storm or a ground fault would have destroyed something on copper.',
    keyPoints: [
      'Two buildings are two grounds; a copper link between them carries the difference and the surge.',
      'Fiber isolates completely and is immune to noise; it removes a whole class of failures rather than reducing them.',
      'The premium is small: media converters or fiber ports, a patch panel, and a cable that costs little more than the copper.',
      'Single-mode fiber for anything outdoors; a patch panel at each end; testing at acceptance; a fiber schedule.',
      'The exceptions are short runs in one building on one ground, and even those are candidates near drives.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Networking', 'Ethernet', 'Grounding', 'Design', 'Panels'],
    blocks: [
      {
        t: 'p',
        text: 'The pump building and the control building are sixty meters apart. There is a spare conduit. Copper Ethernet is rated to a hundred meters. The electrician pulls a shielded cable, the switches link at a gigabit, and the job is done by lunch. It works for a year. Then a summer storm puts a surge on the ground grid at the pump building, a few hundred volts appear between the two buildings for a millisecond, and the cheapest path between them is the shield of that cable and the Ethernet port of the controller at the far end. The controller is replaced. The cable is not, because nobody connected the two events.',
      },
      { t: 'h2', text: 'Two buildings are two grounds' },
      {
        t: 'p',
        text: 'Every building has its own grounding electrode, its own bonding, and its own share of the fault and lightning current flowing through the earth. The two are never at exactly the same potential, and during a fault or a strike the difference can be hundreds or thousands of volts for a moment. A conductor between the buildings, any conductor, becomes a path for that difference. A copper network cable is such a conductor twice over: its pairs and its shield. Transformers inside Ethernet ports isolate a few hundred volts of common-mode difference in normal service, which is why the link works on a quiet day. They do not survive the storm, and a shield bonded at both ends does not even wait for the storm; it carries a circulating current every day and injects noise into the pairs as it does.',
      },
      { t: 'h2', text: 'What fiber removes' },
      {
        t: 'table',
        head: ['Failure on copper', 'On fiber'],
        rows: [
          ['Ground potential difference between buildings', 'None; no conductor'],
          ['Surge from a strike carried into the panel', 'None on the link; the surge stays in the building it hit'],
          ['Noise coupled from power and drive cables in the same duct bank', 'None'],
          ['Shield current and the bonding argument at each end', 'None'],
          ['Hundred-meter distance limit', 'Kilometers on single-mode'],
          ['Corrosion of copper in a wet conduit', 'The cable is glass in a jacket'],
          ['Surge protectors at each end and their maintenance', 'Not needed on the link'],
        ],
      },
      {
        t: 'p',
        text: 'The point is not that fiber is more reliable in degree. It is that fiber removes the failure mechanisms entirely. There is no ground loop because there is no loop, no surge path because there is no path, and no coupled noise because nothing couples into glass. What remains are the connector cleanliness and the bend radius, which are handled at installation and stay handled.',
      },
      { t: 'h2', text: 'What it costs' },
      {
        t: 'p',
        text: 'A fiber link between two panels needs a cable, two patch panels or fiber terminals, patch cords, and either fiber ports on the switches or a media converter at each end. On a plant network with managed switches, the switches usually have fiber ports or transceiver slots already. The cable itself costs little more than a good shielded copper cable and often less than the armored copper that a wet conduit would need. The premium over copper is typically a few hundred dollars per link for the terminations and transceivers, and the labor of a competent termination. Against that: a controller Ethernet port, a switch, or a network module destroyed by one surge, a day of downtime, and the week that someone spent chasing analog noise that turned out to be a shield current.',
      },
      { t: 'h2', text: 'How to specify it' },
      {
        t: 'ul',
        items: [
          'Single-mode fiber for anything outdoors or between buildings; the transceivers cost a little more than multimode and the cable will never be the limit.',
          'An outdoor-rated, gel-free, loose-tube or armored cable for the conduit or the direct burial, with the strand count doubled for spares; twelve strands is the common minimum.',
          'A patch panel or a fiber terminal box at each end, in the panel or a separate enclosure, with the strands terminated on connectors of one type and one polish throughout the plant.',
          'Fiber ports on the switches where possible; industrial media converters where not, on the rail and the panel supply.',
          'Acceptance testing: inspection, loss with a light source and power meter in both directions, and a reflectometer trace, recorded in a fiber schedule.',
          'Labels on every strand at both ends and a fiber schedule in the engineering library.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The spare conduit is not a reason',
        text: 'The argument for copper is usually that the conduit is there and the copper is quick. The fiber goes in the same conduit, takes the same afternoon, and is still there in twenty years. The conduit being there is a reason to pull fiber.',
      },
      { t: 'h2', text: 'The exceptions' },
      {
        t: 'p',
        text: 'Copper is fine for short runs inside one building, from a switch to a device in the same room or the same panel lineup on one ground, kept away from power. It is fine for a patch cord. It is fine for the last few meters to a camera or an access point where power over Ethernet is wanted, from a switch in the same building. What copper is not fine for is anything that leaves the building, crosses between grounds, runs beside drive cables, or approaches a hundred meters. Those links are fiber, every time, and a plant standard that says so removes the lunchtime decision that costs a controller.',
      },
    ],
    faqs: [
      {
        q: 'What about a surge protector on each end of the copper?',
        a: 'It reduces the surge and does nothing for the ground loop, the noise, or the distance. Protectors on a copper link between buildings are a mitigation for a link that should not exist; fiber removes the problem they mitigate.',
      },
      {
        q: 'We have a fiber link and it keeps failing.',
        a: 'Almost always a dirty connector, a bend, or a transceiver, and all three are found in an afternoon with a scope and a power meter. A copper link between buildings fails for reasons that take a storm to reproduce.',
      },
      {
        q: 'Multimode or single-mode?',
        a: 'Single-mode for anything between buildings; the cable is cheap, the reach is unlimited for plant purposes, and the plant then has one fiber type. Multimode is acceptable inside a building where the existing plant is multimode.',
      },
      {
        q: 'Can we use wireless instead?',
        a: 'Wireless is also non-conductive and it is a fine second path. As the only path for a plant network it brings interference, weather, and security questions that fiber in a conduit does not. Between two buildings on one site with a conduit, fiber wins.',
      },
    ],
    related: [
      '/troubleshooting/grounding-troubleshooting/floating-reference-between-panels',
      '/controls/control-panels/plc-panels/isolation',
      '/how-to/network-how-to/test-fiber',
      '/troubleshooting/fiber-troubleshooting/dirty-or-damaged-connector',
      '/engineering-library/lists-schedules/fiber-schedules',
      '/controls/control-panels/panel-components/network-switches',
    ],
  },
  {
    path: '/articles/cybersecurity-articles/the-cellular-router-is-the-front-door',
    kind: 'article',
    title: 'The Cellular Router Is the Front Door',
    summary:
      'The most common way into a small utility control system is not a sophisticated attack on the plant firewall. It is a cellular router at a lift station with a public address and the password it shipped with. How these get installed, and the short list of.',
    answer:
      'A cellular router at a remote site is a door from the internet into the control network, and at many utilities it is the only one with no lock: a public address from the carrier, a default password, remote management enabled, and a direct path to the controller. Closing it means a private cellular network or a firewall that permits only a virtual private network in, a changed password, management disabled on the outside, the controller behind a firewall or a second port, and the router in the patch program.',
    keyPoints: [
      'A router with a public address and a default password is reachable and known to every scanner on the internet.',
      'The fix is a design: private addressing or a firewall in front, a tunnel for any inbound access, and no management from the outside.',
      'Every default credential on every router changed, and the router firmware in the patch program.',
      'The controller behind a firewall or on a separate port, so the router is not the control network.',
      'Inventory every cellular device the utility owns; the one nobody remembers is the one that is open.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Cybersecurity', 'Telemetry', 'Lift Stations', 'Networking', 'Design'],
    blocks: [
      {
        t: 'p',
        text: 'Ask how a small utility would get into its control system from outside and the answer is usually a description of the plant firewall and the virtual private network. Ask how an attacker would, and the honest answer is the cellular router at the lift station on the highway, installed three years ago by a contractor in an afternoon, with a public address from the carrier and the password printed on its label. It is not a hypothetical. It is the pattern in most of the public reports of intrusions at small water systems, and it is the easiest thing in the whole security program to fix.',
      },
      { t: 'h2', text: 'How it gets installed' },
      {
        t: 'p',
        text: 'A lift station needs telemetry. Radio has no path, or the utility has no radio system, so a cellular router goes in: a small box with a data plan, an Ethernet port to the controller, and an antenna on the mast. The contractor sets it up so the SCADA server can poll the station, which means the router needs to be reachable from the plant, which means it gets a public address from the carrier and a port forwarded to the controller. Remote management stays enabled because the contractor might need it. The password stays default because the router is at a lift station behind a locked door. Everything works, and the utility has a device on the public internet with a control protocol port open behind it.',
      },
      { t: 'h2', text: 'What the outside sees' },
      {
        t: 'table',
        head: ['Exposure', 'Consequence'],
        rows: [
          ['Public address, reachable from anywhere', 'The router is found by scanners within hours and listed in search engines for internet-connected devices'],
          ['Default or weak admin password', 'The router is owned by anyone who reads the label or the manual'],
          ['Management interface on the outside', 'The owner can change anything, including the port forwards'],
          ['Port forwarded to the controller', 'The control protocol is exposed; most controllers accept a write from anyone who can reach them'],
          ['No firmware updates', 'Published vulnerabilities in the router stay open for years'],
          ['Router bridged to the site network', 'The drives, the touchscreen, and any laptop plugged in at the site are reachable too'],
        ],
      },
      {
        t: 'p',
        text: 'None of that requires skill. It requires a search and a password from a manual. The reports of small water systems intruded through exactly this path involve attackers who changed a setpoint on a screen they found, not attackers who broke encryption.',
      },
      { t: 'h2', text: 'Closing the door' },
      {
        t: 'steps',
        items: [
          { title: 'Find them all', text: 'An inventory of every cellular router, modem, and gateway the utility owns, with its address, its carrier, its firmware, and who installed it. The one nobody remembers is the one that is open.' },
          { title: 'Take them off the public internet', text: 'A private cellular network from the carrier, in which the routers get private addresses reachable only from the plant through a tunnel the carrier terminates; or a firewall function on each router that drops every inbound connection except a virtual private network from the plant. Either way, nothing on the internet can reach the router or the controller directly.' },
          { title: 'Change every password', text: 'The admin password on every router to a unique strong one, recorded in the credential vault, and the default accounts removed where the router allows.' },
          { title: 'Disable management on the outside', text: 'The web and command interfaces reachable only from the tunnel or the site side. Remote management from the carrier network off.' },
          { title: 'Put the controller behind something', text: 'The router connects to a firewalled port, the controller second port, or a small industrial firewall, with rules that permit only the SCADA polling from the plant. The drives and the touchscreen never see the router.' },
          { title: 'Patch them', text: 'The router firmware in the same patch program as the servers, with the vendor advisories subscribed to.' },
          { title: 'Log and watch', text: 'The router logs to the plant where possible; the SCADA communication statistics watched for a site that starts talking to something else.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A locked panel door is not a security control',
        text: 'The router is behind a locked door and the attacker is on another continent. Physical security matters for other reasons; it does nothing for a device with a public address.',
      },
      { t: 'h2', text: 'Keeping the convenience' },
      {
        t: 'p',
        text: 'The reason the router was set up open was convenience: the contractor could reach it, the plant could poll it, and nobody had to configure a tunnel. All of that survives the fix. A private cellular network or a router-to-plant tunnel is configured once and then works exactly as the open setup did, from the plant side. The contractor reaches the router through the utility remote access path, with an account enabled for the session, which is also how they should reach everything else. The polling is unchanged. What changes is that the internet is no longer part of the control network.',
      },
      { t: 'h2', text: 'The same door elsewhere' },
      {
        t: 'p',
        text: 'Cellular routers are the common case, but the pattern repeats: a remote desktop tool installed on the SCADA server so the integrator can help, a port forward on the plant router for a vendor, a modem on a controller from the last decade, a wireless bridge with the default key. Each is a convenience for someone, each is a door, and the inventory that finds the routers finds these too. The rule that closes all of them is one sentence in the security policy: every path into the control system goes through the remote access design, and any path that does not is removed.',
      },
    ],
    faqs: [
      {
        q: 'Is a private cellular network expensive?',
        a: 'Carriers offer private addressing and tunnels to the plant for a modest monthly premium, and some utilities negotiate it into the data plan. Against the alternative, it is the cheapest security control available.',
      },
      {
        q: 'Our router has a firewall built in. Is that enough?',
        a: 'If it is configured to drop every inbound connection except the tunnel from the plant, management is off on the outside, the password is changed, and the firmware is current, yes. Shipped with defaults, no.',
      },
      {
        q: 'How do we know if a router has already been reached?',
        a: 'The router logs if it keeps any, unexpected configuration changes, port forwards nobody made, and setpoint changes at the site with no operator record. When in doubt, reset the router to a known configuration with a new password and put it behind the design above.',
      },
      {
        q: 'What about the SCADA polling itself over cellular?',
        a: 'Inside the tunnel, the polling is as private as the tunnel. Outside one, a control protocol over the internet is readable and writable by anyone in the path; the tunnel is not optional.',
      },
    ],
    related: [
      '/cybersecurity/network-segmentation/segmenting-a-remote-site',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/cybersecurity/remote-access/vpn-design',
      '/troubleshooting/cellular-troubleshooting/vpn-tunnel-drops',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-scada',
      '/how-to/scada-how-to/configure-remote-access',
    ],
  },
  {
    path: '/articles/troubleshooting-articles/measure-before-you-replace',
    kind: 'article',
    title: 'Measure Before You Replace',
    summary:
      'Parts-swapping is the most expensive way to troubleshoot and the most common. A method for controls faults that starts with a measurement, splits the problem in half at every step, and ends with a cause instead of a coincidence.',
    answer:
      'Troubleshooting a control fault well means measuring something before changing anything: the voltage at the terminal, the current in the loop, the state of the indicator, the error code in the log. Each measurement splits the possible causes in half, and a fault that had twenty candidates has one after five measurements. Replacing parts until it works finds coincidences, costs spares, and leaves the cause in place to come back.',
    keyPoints: [
      'The first act is a measurement, not a replacement; the measurement is what you are paid for.',
      'Split the problem: each check should rule out half the remaining causes.',
      'Work from the symptom toward the source, one interface at a time: field, terminal, module, program, screen.',
      'A part that fixed it may have been a coincidence; a cause that was measured is a fact.',
      'Record what was measured; the next fault on the same equipment starts from the record.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Troubleshooting', 'Instrumentation', 'PLC', 'Engineering', 'Commissioning'],
    blocks: [
      {
        t: 'p',
        text: 'The pump will not start. The technician replaces the starter, then the overload, then the relay, then the input module, and after two hours and four parts it starts. Nobody knows why, the four old parts go into a box marked suspect, and the station fails the same way a month later. This is not a story about a bad technician. It is a story about a method that most of the trade learned by watching, and it costs utilities more than any other single habit.',
      },
      { t: 'h2', text: 'Why swapping fails' },
      {
        t: 'p',
        text: 'Replacing a part answers one question: is this specific part the cause. It does not rule out anything else, it disturbs wiring that was fine, it consumes a spare that may be the last one, and when the fault is intermittent it produces false conclusions, because the fault goes away for a while whether or not the part was the cause. Worse, it teaches nothing. A fault found by measurement leaves the technician knowing the system better; a fault fixed by swapping leaves a box of suspect parts and a station that will do it again.',
      },
      { t: 'h2', text: 'The method' },
      {
        t: 'steps',
        items: [
          { title: 'State the symptom exactly', text: 'Not the pump will not start, but the run command is on at the controller output and the starter coil is not pulling in. The exact symptom already excludes half the system.' },
          { title: 'Ask what changed', text: 'Work done recently, weather, a power event, a new device. Most faults have a cause that arrived in the last week.' },
          { title: 'Read what the system already knows', text: 'Indicators on the panel, fault codes on the drive, the controller fault record, the alarm log, the trend of the value over the last day. This costs nothing and often ends the search.' },
          { title: 'Pick the measurement that splits the problem', text: 'Between the controller output and the starter coil there are a relay, a fuse, a terminal, and a wire. Measure at the middle: voltage at the relay contact. Present on both sides, the fault is downstream; present on one, the relay; absent on both, upstream.' },
          { title: 'Measure, then move', text: 'Each measurement moves the boundary. Keep going until the two sides of one interface disagree: voltage into a terminal and none out, current into a module and no count in the tag.' },
          { title: 'Confirm the cause', text: 'Before replacing, make the cause explain everything: the symptom, the intermittence, the timing, what changed. A cause that explains half is a coincidence.' },
          { title: 'Fix, verify, record', text: 'Replace or repair the one thing, prove the symptom is gone by the same measurement that found it, and write down what was measured and what was found.' },
        ],
      },
      { t: 'h2', text: 'Splitting in half' },
      {
        t: 'p',
        text: 'The power of the method is in the choice of measurement. A control circuit from an output module to a starter coil has perhaps eight places it can be broken. Measuring at each in order takes eight steps; measuring at the middle, then the middle of the half that failed, takes three. The habit is to look at the path, find its midpoint, and put the meter there. It applies to everything: a 4 to 20 milliamp loop is split at the panel terminal into field and panel; a communication failure is split at the switch into the controller side and the device side; a wrong reading on the screen is split at the controller tag into the field side and the SCADA side.',
      },
      {
        t: 'table',
        head: ['Symptom', 'First split', 'Measurement'],
        rows: [
          ['Output commanded, device not running', 'Panel wiring against field device', 'Voltage at the panel field terminal for that output'],
          ['Analog reads wrong on the screen', 'Field and module against scaling and SCADA', 'Raw count against loop current at the terminal'],
          ['Device not communicating', 'Link against message', 'Port link status; then a test poll from a laptop'],
          ['Controller faulted', 'Program against hardware and power', 'The fault code'],
          ['Relay chattering', 'Coil supply against input signal', 'Coil voltage during the chatter'],
          ['Fuse blown', 'Short against overload', 'Resistance to ground on the load side with the power off'],
        ],
      },
      { t: 'h2', text: 'Reading before measuring' },
      {
        t: 'p',
        text: 'Modern equipment reports on itself, and reading the report is the fastest measurement there is. A drive that tripped says why on its display. A controller keeps a fault record with the routine and the rung. A managed switch counts errors per port. A transmitter reports open loop and out of range. An hour of a technician tracing wires is often preceded by a fault code on a display that nobody read because the display was behind a door. Reading is measuring with the instrument the manufacturer built in.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Three tools and a record',
        text: 'A multimeter with a clamp for milliamps, a loop calibrator, and a laptop with the programming software cover almost every controls measurement. The fourth tool is the record: a page in the site log with the symptom, the measurements, the cause, and the fix. The next technician at the same fault starts from it instead of from nothing.',
      },
      { t: 'h2', text: 'When swapping is right' },
      {
        t: 'p',
        text: 'Substitution is a measurement when it is done as one: a known-good radio in place of a suspect one, with the signal reading before and after, answers a specific question. Replacing a fuse to see if it blows again, with the circuit sectioned first, answers a question. The difference between substitution and swapping is whether a question was asked. Swap a part to test a hypothesis you formed from a measurement; do not swap parts to form one.',
      },
      { t: 'h2', text: 'The intermittent fault' },
      {
        t: 'p',
        text: 'The fault that comes and goes is where swapping does the most damage, because anything replaced appears to fix it for a while. The method for an intermittent is to catch it in the act: a recording meter on the suspect supply, a trend on the tag with a fast sample, the port error counters cleared and watched, a wiggle test with the meter on the terminal. The measurement that shows the fault happening is the only one that counts, and it usually takes patience rather than parts.',
      },
    ],
    faqs: [
      {
        q: 'The measurement takes longer than swapping the relay.',
        a: 'One measurement takes a minute. The swap takes ten and answers less. Over a career, the technician who measures spends less time at faults, because the faults stop coming back.',
      },
      {
        q: 'What if I do not have a drawing?',
        a: 'The method still works: the interfaces are physical, terminal strips, module terminals, field devices, and the meter finds the disagreement between two sides of one of them. Then make the drawing, because the next fault deserves one.',
      },
      {
        q: 'How do I know when the cause is really found?',
        a: 'When it explains every observation including the ones that seemed unrelated, and when the fix verified by the same measurement removes the symptom. A cause that leaves a loose end is a partial answer.',
      },
      {
        q: 'Is it wrong to keep suspect parts?',
        a: 'It is wrong to keep them unlabeled. A part removed on suspicion goes on the bench, is tested, and is either returned to stock as good or discarded as bad, with a note. A box of maybes is a box of future faults.',
      },
    ],
    related: [
      '/engineering-library/checklists/troubleshooting-checklist',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
      '/troubleshooting/instrumentation-troubleshooting/transmitter-reads-wrong-value',
      '/how-to/plc-how-to/diagnose-read-write-communications',
      '/controls/control-panels/panel-troubleshooting/relay-problems',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
    ],
  },
  {
    path: '/articles/engineering-articles/the-control-narrative-is-the-contract',
    kind: 'article',
    title: 'The Control Narrative Is the Contract',
    summary:
      'Most control system disputes, delays, and disappointments trace to one missing document: a narrative that says, in plain language, and how it keeps paying after startup.',
    answer:
      'A control narrative is the plain-language description of what the control system does: every mode, every sequence, every interlock, every alarm, every setpoint with its limits, and what happens on every failure. Written and agreed before programming starts, it is the contract between the utility, the engineer, and the integrator, the specification the program is built to, the test plan for commissioning, and the operator manual afterward. Without it, the program is the specification, and nobody can read the program.',
    keyPoints: [
      'The narrative describes behavior in plain language: modes, sequences, interlocks, alarms, setpoints, and failure responses.',
      'It is written before the program and agreed by the utility, the engineer, and the integrator; then it is the contract.',
      'The commissioning test plan is the narrative turned into checks; a system passes when it does what the narrative says.',
      'After startup it is the operator manual and the document every change is made against.',
      'A narrative nobody maintains becomes fiction; it is revised with every change, like the drawings.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Engineering', 'Documentation', 'Design', 'Commissioning', 'Control'],
    blocks: [
      {
        t: 'p',
        text: 'The plant is finished, the integrator is gone, and the operators have a question: what does the filter do when the influent turbidity spikes? The engineer says the specification covered it. The integrator says they built what they were told. The specification says the filters shall be automatically controlled. The program says something, in two thousand rungs, that only the person who wrote it can read. The question goes unanswered until the next turbidity spike answers it. This is the failure mode of a project with no control narrative, and it is the commonest failure mode there is.',
      },
      { t: 'h2', text: 'What a narrative is' },
      {
        t: 'p',
        text: 'A control narrative, also called a functional description or a sequence of operations, is a document that says in ordinary language what the control system does, organized by process area and by piece of equipment. For a lift station it says: the station has two pumps, controlled by wet well level from a submersible transmitter, with floats as backup; in automatic, the lead pump starts at this level and stops at that one, the lag pump starts here; the lead alternates each cycle; a pump that fails to start within ten seconds of its command is faulted and the other is promoted; on loss of the level signal the station runs on floats and alarms; on loss of communication the station holds its setpoints and continues; these are the alarms, these are their priorities, these are the setpoints and the limits within which operators may change them. Ten pages for a lift station, a hundred for a plant, and every one of them readable by an operator.',
      },
      {
        t: 'table',
        head: ['Section', 'Contents'],
        rows: [
          ['Overview', 'What the process area does and what equipment it contains'],
          ['Modes', 'Automatic, manual, local, remote, maintenance; what each means and how they are selected'],
          ['Normal operation', 'The sequence or the loop in each mode, with setpoints named'],
          ['Interlocks and permissives', 'What prevents a start, what stops a running device, and what they depend on'],
          ['Alarms', 'Every alarm with its condition, priority, delay, and the operator action'],
          ['Setpoints', 'Every adjustable value with its default, its range, and who may change it'],
          ['Failure responses', 'Signal loss, communication loss, power loss, equipment fault; what the system does for each'],
          ['Startup and shutdown', 'The sequences and what the operator does'],
          ['Interfaces', 'What goes to SCADA and what comes from it; what other systems exchange'],
        ],
      },
      { t: 'h2', text: 'Why before the program' },
      {
        t: 'p',
        text: 'Writing the narrative first forces the questions that otherwise get answered by the programmer alone at eleven at night: what happens when the transmitter fails, which pump starts after a power outage, whether the operator may raise the high level alarm and how far. Those are utility decisions and process decisions, and the people who should make them are in the room when the narrative is reviewed and not when the rung is written. The integrator then builds to a document that everyone agreed, and every ambiguity resolved in the review is a change order that did not happen.',
      },
      { t: 'h2', text: 'The contract' },
      {
        t: 'p',
        text: 'Once agreed and signed, the narrative is what the integrator is obliged to deliver and what the utility is obliged to accept. The specification says the system shall be automatic; the narrative says what automatic means, and disputes about scope become questions of whether the narrative says so. It protects both sides. The integrator is not asked to build features that were never described, and the utility is not handed a program that does something nobody described. The engineer who writes a specification without a narrative has left the contract to be written by whoever writes the program.',
      },
      { t: 'h2', text: 'The test plan' },
      {
        t: 'p',
        text: 'Commissioning without a narrative is a demonstration: the integrator shows the system working and everyone nods. Commissioning with one is a test: every sentence in the narrative becomes a check, performed with the equipment, witnessed, and recorded. The lag pump starts at the lag level; the fault on a pump promotes the other; the loss of the transmitter puts the station on floats; the communication loss holds the setpoints. A system passes when it does what the narrative says, and the signed test record is the proof that it did.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'One sentence, one test',
        text: 'Write the narrative so that every sentence about behavior can be turned into a test with a pass or fail. If a sentence cannot be tested, it is not describing behavior, and it should be rewritten until it does.',
      },
      { t: 'h2', text: 'After startup' },
      {
        t: 'p',
        text: 'The narrative is the operator manual, because it says what the system does in the language operators use. It is the document a new engineer reads before opening the program. It is what every change is made against: a change request says which paragraph changes and how, the program is changed to match, the test is repeated for that paragraph, and the narrative is reissued. A plant that keeps its narrative current has a control system that can be understood without the person who built it. A plant that does not has a program and a rumor.',
      },
      { t: 'h2', text: 'Who writes it' },
      {
        t: 'p',
        text: 'The engineer of record drafts it, from the process design and the utility standards, because the engineer owns the design intent. The utility reviews it line by line, because the utility owns the operation and knows what the last system did wrong. The integrator reviews it for what can be built and what the platform does differently, and proposes the alternatives. All three sign it. An integrator asked to write the narrative for a system they are also building will write one that describes what they were going to build anyway, which is not nothing, but it is not a contract.',
      },
    ],
    faqs: [
      {
        q: 'How long should a narrative be?',
        a: 'As long as it takes to describe every behavior once, and no longer. A lift station is a few pages; a treatment plant is a chapter per process area. Length is not the measure; testability is.',
      },
      {
        q: 'We have a project starting next month with no narrative. What now?',
        a: 'Write one now, before programming, even a short one, and make its review the first milestone. A late narrative is far better than none, and the review will find the decisions nobody has made.',
      },
      {
        q: 'The integrator says the narrative is in the program comments.',
        a: 'Program comments describe the program; the narrative describes the behavior in language the utility can review and test against. The comments are welcome; they are not the contract.',
      },
      {
        q: 'Who keeps it current?',
        a: 'The utility, as the owner of the system, with the change procedure requiring a narrative revision for any change in behavior. The engineering library holds the current revision beside the drawings.',
      },
    ],
    related: [
      '/engineering-library/control-documentation/control-narratives',
      '/engineering-library/control-documentation/sequences-of-operation',
      '/engineering-library/control-documentation/functional-descriptions',
      '/engineering-library/checklists/commissioning',
      '/engineering-library/checklists/sat',
      '/engineering-library/control-documentation/cause-and-effect',
    ],
  },
  {
    path: '/articles/industry-articles/the-knowledge-that-leaves-with-the-retiring-technician',
    kind: 'article',
    title: 'The Knowledge That Leaves With the Retiring Technician',
    summary:
      'Water and wastewater utilities are losing the people who know how their control systems actually work, and a practical program for capturing it while there is still someone to ask.',
    answer:
      'When a long-serving controls technician retires, a utility loses the unwritten part of its control system: why the setpoint is where it is, which relay was added and what it bypasses, where the spare radio is, how to get the old software to talk to the old controller, and which alarms mean nothing. None of that was written because the person who knew it was always there. Capturing it takes a deliberate program of documentation, walk-throughs, and recorded explanations, started years before the retirement date.',
    keyPoints: [
      'The knowledge at risk is the reasons, the exceptions, and the workarounds; the drawings show what, not why.',
      'It was never written because it did not need to be while the person was present.',
      'Capture it with as-built verification, annotated drawings, recorded walk-throughs, and a written list of the things nobody else knows.',
      'Start years out; a two-week handover at the end captures almost nothing.',
      'The permanent fix is a system that does not depend on anyone: narratives, backups, standards, and a second person on everything.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Industry', 'Engineering', 'Documentation', 'Water', 'Wastewater'],
    blocks: [
      {
        t: 'p',
        text: 'Every utility has one. The technician who has been there twenty-five years, who knows which lift station has the relay that was added in 2009 and why, who can get the old programming software to run on the laptop nobody else can log into, who knows that the high level alarm at the west tank is a float that sticks and the one that matters is the transmitter. That person is retiring, and the industry is retiring them by the thousand. The control systems they maintained were built, in ways nobody quite intended, on the assumption that they would always be there.',
      },
      { t: 'h2', text: 'What is actually lost' },
      {
        t: 'p',
        text: 'The drawings show what is connected. The program shows what the logic does. What neither shows is why: why the lag pump starts a foot higher at station six than anywhere else, why the ferric feed is paced to raw water flow rather than influent, why the dissolved oxygen setpoint in basin two is lower, why the alarm from the generator at the plant is ignored on Tuesdays. Some of those reasons are good ones, decided in a meeting fifteen years ago. Some are workarounds for a problem that was fixed a decade later. Nobody can tell which without the person who was there, and a new engineer who removes the wrong one learns why the hard way.',
      },
      {
        t: 'table',
        head: ['Category', 'Examples', 'Where it lives now'],
        rows: [
          ['Reasons for settings', 'Setpoints, bands, delays, and the events that set them', 'Memory'],
          ['Undocumented changes', 'Relays added, wires moved, logic patched during an outage', 'The panel, unmarked; memory'],
          ['Workarounds', 'The valve that must be opened by hand first; the reset that needs two tries', 'Memory'],
          ['Tools and access', 'Old software versions, license keys, cables, passwords', 'A laptop, a drawer, memory'],
          ['Spares', 'Which shelf, which box, which ones are actually bad', 'Memory'],
          ['Vendor relationships', 'Who to call, who actually answers', 'A phone'],
          ['History', 'What failed before, how it was found, what fixed it', 'Memory'],
          ['Judgment', 'Which alarms matter; what normal looks like on each trend', 'Memory'],
        ],
      },
      { t: 'h2', text: 'Why it was never written' },
      {
        t: 'p',
        text: 'It was not negligence. Writing down why a setpoint is where it is takes time, and the utility never needed it written because the technician could be asked. Documentation systems reward the drawing that is required for the project and not the note that explains the exception made afterward. And a great deal of the knowledge is not the kind that fits on a form: it is the sense that the trend looks wrong today, built from thousands of days of looking. The person did not hoard it. The organization never built a place to put it.',
      },
      { t: 'h2', text: 'A capture program' },
      {
        t: 'steps',
        items: [
          { title: 'Start early', text: 'Three years before the expected retirement, not three weeks. Knowledge comes out in the course of work, not in an interview.' },
          { title: 'Verify the as-builts', text: 'Walk every panel with the technician and the drawings, and mark every difference. The relay that is not on the drawing gets drawn and gets a note that says why it exists.' },
          { title: 'Annotate the settings', text: 'Export every setpoint, band, delay, and alarm limit from every controller and SCADA, and go through them with the technician, writing the reason beside each one that has a story. The ones with no story are candidates for review.' },
          { title: 'Record the walk-throughs', text: 'A phone camera and a site visit. The technician explains each site as they would to a new hire: what it does, what fails, where things are. The video goes in the engineering library. It is imperfect and it is far better than nothing.' },
          { title: 'List the things nobody else knows', text: 'Ask directly: what would break if you were gone tomorrow. Software, passwords, cables, vendor contacts, the box of spares in the back of the truck. Write the list, then fix each item so that it is no longer true.' },
          { title: 'Pair them', text: 'A second person on every site visit and every change for the last years, so that the judgment transfers by practice. It is the only way the trend sense moves.' },
          { title: 'Fix the workarounds', text: 'Every workaround captured is a defect. Fix what can be fixed, so that the knowledge needed to operate the plant shrinks.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The exit interview is too late',
        text: 'A two-week handover at the end produces a binder that answers the questions the departing technician thought to ask themselves. The questions that matter are the ones that come up on a bad night a year later, and only a program run over years puts the answers where they can be found.',
      },
      { t: 'h2', text: 'The permanent fix' },
      {
        t: 'p',
        text: 'Capturing what one person knows is triage. The durable fix is a control system that does not depend on anyone: a control narrative that says what the system does and why, drawings that match the panels and are revised with every change, program backups with the software and licenses to use them, standards that make every site alike so there is less to know, a credential vault instead of a memory, and two people who can do every job. Utilities that have those find that the retirement is an event rather than a crisis. Utilities that do not are one retirement, or one accident, from a control system nobody understands.',
      },
      { t: 'h2', text: 'The other side' },
      {
        t: 'p',
        text: 'The technician who is leaving usually wants this to go well. They built the system, they are proud of it, and they know better than anyone what will happen if the knowledge goes with them. What they need is time set aside to do the capture instead of being asked to fit it around the work, a person to hand it to, and the sense that the organization values it. A utility that gives them that gets far more than a binder.',
      },
    ],
    faqs: [
      {
        q: 'We cannot afford a second person on everything.',
        a: 'A utility that cannot afford a second person can afford a narrative, verified drawings, backups, and a credential vault, which cover most of the risk. The second person is the remaining part, and a shared technician with a neighboring utility is one way small systems get there.',
      },
      {
        q: 'Can an integrator capture this instead?',
        a: 'An integrator can verify as-builts and write a narrative from the program, which is valuable. The reasons and the judgment come only from the person who has them, and the integrator would have to interview them anyway.',
      },
      {
        q: 'What if the technician already left?',
        a: 'Do the as-built verification and the settings review without them, treat every unexplained setting and relay as a question, and call them. Most retired technicians will spend an afternoon on the phone for the plant they built.',
      },
      {
        q: 'How do we know the capture worked?',
        a: 'Have the successor run a site alone for a month before the retirement and keep a list of every question they had to ask. Each question is a gap; fill them while the answer is still in the building.',
      },
    ],
    related: [
      '/engineering-library/control-documentation/control-narratives',
      '/cybersecurity/backups/plc-program-backups',
      '/controls/plc-systems/platforms/legacy-systems',
      '/engineering-library/drawings/schematics',
      '/cybersecurity/passwords-credentials/default-credentials',
      '/articles/engineering-articles/the-control-narrative-is-the-contract',
    ],
  },
  {
    path: '/articles/industry-articles/what-integrator-consolidation-means-for-a-small-utility',
    kind: 'article',
    title: 'What Integrator Consolidation Means for a Small Utility',
    summary:
      'The regional controls integrator that built a utility system over twenty years is being bought, merged, or closed, and how to stop depending on any single firm for the system it owns.',
    answer:
      'When a small utility depends on one integrator and that integrator is acquired or closes, the utility can lose its institutional knowledge, its programs and drawings, its response times, and its pricing in one transaction it was not party to. The protection is ownership: every program, drawing, narrative, license, and credential in the utility hands, standards that let any competent firm work on the system, and a relationship with more than one firm before it is needed.',
    keyPoints: [
      'Consolidation moves the people who know your system, the files that describe it, and the prices you pay, without asking you.',
      'Own everything: programs, source with comments, drawings, narratives, licenses, and credentials, in your own library, verified.',
      'Standards that any competent integrator can follow are what make the utility able to change firms.',
      'Keep a second firm familiar with the system before the first one changes hands.',
      'Contracts should say who owns the work product and how it is handed over; most do not.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Industry', 'Engineering', 'Documentation', 'Design', 'Water'],
    blocks: [
      {
        t: 'p',
        text: 'For twenty years a small utility had one integrator. The same two people built the plant SCADA, added every lift station, and answered the phone at night. Then the firm was bought by a larger one three states away. The two people stayed for a year and left. The new firm has a ticket system, a different platform it prefers, and a rate card. The utility still has its system, and for the first time it does not have anyone who knows it. Nothing about this is unusual. Consolidation among controls integrators has been steady for years, and small utilities feel it most because they were the customers most likely to depend on one firm.',
      },
      { t: 'h2', text: 'What changes' },
      {
        t: 'table',
        head: ['What the utility had', 'What consolidation can do to it'],
        rows: [
          ['Two people who knew the system', 'They leave, are reassigned, or are spread across a region'],
          ['Programs and drawings on the integrator server', 'Migrated, archived, or lost in the transition'],
          ['A phone number that was answered', 'A ticket queue with a service level'],
          ['Pricing based on a long relationship', 'A standard rate card and minimum charges'],
          ['A platform the integrator supported because the utility had it', 'A preferred platform the new firm proposes at the next upgrade'],
          ['Informal knowledge of the utility standards', 'Nothing; the new engineers have never seen the site'],
        ],
      },
      { t: 'h2', text: 'Own the work product' },
      {
        t: 'p',
        text: 'The first protection is to hold, in the utility engineering library, everything needed to maintain the system without the integrator: every controller program with the source and comments, at the version that is running, with the software and licenses to open it; every SCADA application backup and its license details; every drawing as built; every control narrative; every device configuration, switches and routers and radios included; and every credential, in a vault the utility controls. Then verify it: upload a program from a controller and compare it with the library copy, open the SCADA backup on a test machine, and check that the drawings match a panel. A library that has never been verified is a hope.',
      },
      {
        t: 'p',
        text: 'Most utilities discover the gaps when the integrator changes, which is the worst time. The way to discover them earlier is to make the handover a deliverable on every project, with the checklist above, and to ask the integrator for the current copies once a year. An integrator who will not hand over the programs of a system the utility paid for has told the utility something important.',
      },
      { t: 'h2', text: 'Standards make you portable' },
      {
        t: 'p',
        text: 'A system built to the integrator way is a system only that integrator can work on efficiently. A system built to utility standards, a tag naming convention, a panel standard, a site library of controller and SCADA templates, a network design, a narrative for every site, is a system any competent firm can pick up. The standards are the utility property, they are short, and they are the difference between changing integrators in a month and rebuilding in a year. Small utilities that lack the staff to write them can adopt a peer utility standard or have an engineer write one, and then require every project to follow it.',
      },
      { t: 'h2', text: 'Know two firms' },
      {
        t: 'p',
        text: 'The time to have a second integrator familiar with the system is before the first one changes. Give the second firm a small project, a lift station upgrade or a screen revision, so that they have been on site, seen the standards, and worked in the programs. The first firm may not love it, and a good one will understand it. When the acquisition letter arrives, the utility then has a choice instead of a dependency.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Put it in the contract',
        text: 'The services agreement with any integrator should say that all programs, drawings, configurations, and documentation produced for the utility are the utility property, are delivered in source form at each milestone, and are handed over in full on termination or change of control of the firm. Few agreements say this. Every one should.',
      },
      { t: 'h2', text: 'What consolidation can also bring' },
      {
        t: 'p',
        text: 'It is not all loss. A larger firm can bring deeper platform expertise, a bench when the local people are on vacation, cybersecurity capability a two-person shop never had, and formal processes that a small utility can lean on. The utility that owns its work product and has its standards can take those benefits on its own terms, because it is choosing a supplier rather than clinging to the only one that can read its programs. The utility that has neither takes whatever the new firm offers.',
      },
      { t: 'h2', text: 'A checklist for this year' },
      {
        t: 'ol',
        items: [
          'Get and verify current copies of every program, backup, drawing, and configuration.',
          'Put licenses and credentials in the utility name and in a utility vault.',
          'Write or adopt a standards document and make it part of every new project.',
          'Add the ownership and handover language to the next services agreement.',
          'Give a second firm a small project.',
          'Ask the current integrator, plainly, what their plans are; most will tell you.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Our integrator is a one-person firm. Is that riskier than a large one?',
        a: 'It is a different risk: illness or retirement instead of acquisition. The protections are the same, and the conversation about succession is easier to have with one person than with a corporation.',
      },
      {
        q: 'The new firm wants to migrate us to their preferred platform. Should we?',
        a: 'Only for the reasons a platform change would be right anyway: support life, staffing, cost over ten years, data portability. A migration proposed because the firm prefers the platform is a proposal to become dependent again.',
      },
      {
        q: 'Can we maintain the system ourselves instead?',
        a: 'Many small utilities do the routine work themselves with a technician who has the software and training, and keep an integrator for projects. Owning the work product and the standards is what makes that possible.',
      },
      {
        q: 'What if the old programs were never handed over and the firm is gone?',
        a: 'Upload what the controllers hold, which recovers logic and often names and comments; rebuild the documentation from the upload and the panels; and put the ownership language in every agreement from now on.',
      },
    ],
    related: [
      '/articles/industry-articles/the-knowledge-that-leaves-with-the-retiring-technician',
      '/cybersecurity/backups/plc-program-backups',
      '/controls/plc-systems/platforms/studio-5000',
      '/controls/plc-systems/platforms/control-expert',
      '/engineering-library/control-documentation/control-narratives',
      '/articles/scada-articles/what-a-small-utility-should-ask-before-buying-scada',
    ],
  },
];
