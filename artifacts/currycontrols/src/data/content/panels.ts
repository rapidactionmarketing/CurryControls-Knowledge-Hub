import type { Entry } from '../content-types';

export const PANEL_ENTRIES: Entry[] = [
  {
    path: '/controls/control-panels/panel-design/ul-508a',
    kind: 'reference',
    title: 'UL 508A Industrial Control Panels',
    summary:
      'What the listing actually covers, what has to appear on the label, and the requirements that most often cause a panel to fail inspection.',
    answer:
      'UL 508A is the safety standard for industrial control panels in the United States. A panel built by a shop holding the UL 508A listing and marked with the appropriate label has been constructed to that standard, with a documented short-circuit current rating, correct component selection and spacing, proper wire sizing and marking, and a bill of material of recognized components. Many jurisdictions and specifications require a listed panel.',
    keyPoints: [
      'UL 508A covers the construction of the panel, not the correctness of the control scheme.',
      'The label must carry a short-circuit current rating, and NEC 409.110 requires that marking.',
      'Component selection, spacing, wire sizing, and marking are all part of the standard.',
      'A listed shop applies the label; a panel assembled outside that program is not listed.',
      'Field modifications can invalidate the listing if made outside the shop program.',
    ],
    published: '2026-05-06',
    updated: '2026-08-25',
    readingTime: 9,
    tags: ['Panels', 'UL 508A', 'Standards', 'Design'],
    blocks: [
      { t: 'h2', text: 'What the standard covers' },
      {
        t: 'p',
        text: 'UL 508A is a construction standard. It addresses how a panel is built so that it is safe to install and operate: whether components are suitable and properly applied, whether spacings are adequate, whether conductors are sized and protected, whether the enclosure suits the environment, and whether the panel is marked so an installer knows what they are connecting to.',
      },
      {
        t: 'p',
        text: 'It says nothing about whether the control sequence is correct. A panel can be flawlessly listed and still start the wrong pump. Conversely, a beautifully engineered control scheme in an unlisted panel may not pass inspection. These are two separate quality requirements and both belong in a specification.',
      },
      { t: 'h2', text: 'What goes on the label' },
      {
        t: 'p',
        text: 'The nameplate is the part an inspector reads first. Requirements vary with the panel type, but an industrial control panel label generally carries the following.',
      },
      {
        t: 'table',
        head: ['Marking', 'Why it is there'],
        rows: [
          ['Manufacturer name and file number', 'Identifies the listed shop that built it'],
          ['Supply voltage, phase, and frequency', 'What the panel is designed to be fed from'],
          ['Full load current or ampacity', 'Sizing the feeder and upstream protection'],
          ['Short-circuit current rating (SCCR)', 'The available fault current the panel can safely withstand'],
          ['Enclosure type rating', 'The environment the enclosure is suited to'],
          ['Wiring space and conductor temperature rating', 'What the installer may land and how'],
          ['Number of supply circuits', 'Whether more than one source feeds the panel'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'SCCR is the most common inspection problem',
        text: 'NEC 409.110 requires an industrial control panel to be marked with its short-circuit current rating, and the installation must not be placed where available fault current exceeds it. A panel marked with a default 5 kA rating installed downstream of a large transformer is a genuine hazard and a failed inspection. Determine the available fault current before you build, not after.',
      },
      { t: 'h2', text: 'Requirements that trip people up' },
      {
        t: 'dl',
        items: [
          { term: 'Component recognition', def: 'Components in the power circuit generally must be listed or recognized and applied within their ratings. A device pulled from a drawer without documentation cannot go in a listed panel.' },
          { term: 'Wire sizing and type', def: 'Conductor ampacity has to suit the load and the overcurrent protection, at the correct temperature rating. Panel wire is normally rated for the enclosure temperature, and derating for bundling applies.' },
          { term: 'Wire marking and color', def: 'Conductors must be identified. Color conventions distinguish line, neutral, ground, and control, including separately derived and foreign voltage sources.' },
          { term: 'Spacings', def: 'Minimum clearance and creepage distances between uninsulated live parts and to the enclosure. Cramming a subpanel is where this gets violated.' },
          { term: 'Grounding and bonding', def: 'The enclosure, subpanel, and door must be bonded, with a proper equipment grounding terminal for the incoming feeder.' },
          { term: 'Foreign voltage warning', def: 'If a circuit remains energized when the main disconnect is open, the panel must be marked to say so. This is a common finding on panels with a separate UPS or generator control circuit.' },
          { term: 'Heat and enclosure rating', def: 'The internal heat load must be dissipated so components stay within their ratings. This is where the enclosure sizing calculation earns its keep.' },
        ],
      },
      { t: 'h2', text: 'Enclosure type and environment' },
      {
        t: 'p',
        text: 'Enclosure type ratings describe what the enclosure protects against, and the wrong choice is expensive to discover in service.',
      },
      {
        t: 'table',
        head: ['Type', 'Typical use', 'Notes'],
        rows: [
          ['Type 1', 'Indoor, clean, dry', 'General indoor use only'],
          ['Type 12', 'Indoor, dust and dripping liquid', 'Common for indoor plant areas'],
          ['Type 3R', 'Outdoor, rain and sleet', 'Not sealed against windblown dust'],
          ['Type 4', 'Indoor or outdoor, hosedown and windblown dust', 'Common for wash-down areas'],
          ['Type 4X', 'Type 4 plus corrosion resistance', 'The default for wastewater and coastal sites'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'In wastewater, specify 4X and stainless',
        text: 'Hydrogen sulfide in a collection system attacks painted steel, and a lift station panel that looked fine at turnover can be visibly corroding in three years. 316 stainless in a Type 4X rating costs more up front and is routinely the cheaper decision over the life of the station.',
      },
      { t: 'h2', text: 'Heat load' },
      {
        t: 'p',
        text: 'Every component in the enclosure dissipates heat, and a sealed enclosure has no way to shed it except through its surface. A panel full of drives in Florida sun is a thermal problem long before it is an electrical one.',
      },
      {
        t: 'ol',
        items: [
          'Total the heat dissipation of every component from the manufacturer data, in watts.',
          'Add solar gain for outdoor enclosures. This is often the dominant term and is regularly forgotten.',
          'Determine the maximum ambient temperature at the actual installation, not the design office.',
          'Calculate the enclosure surface area available for heat transfer.',
          'Compare the temperature rise against the lowest component rating in the panel, which is often the PLC or the drive.',
          'If the margin is thin, add a filtered fan, a vortex cooler, or an air conditioner, and account for the additional maintenance each brings.',
        ],
      },
      { t: 'h2', text: 'Keeping the listing valid' },
      {
        t: 'p',
        text: 'The label is applied by a shop operating under its own UL program, with the procedures and audits that go with it. That has practical consequences in the field.',
      },
      {
        t: 'ul',
        items: [
          'Adding a component in the field can invalidate the listing unless it is done under the shop program or with a field evaluation.',
          'Substituting a component for something with different ratings changes the panel SCCR, sometimes dramatically.',
          'Drilling the enclosure can compromise the type rating if the penetration is not properly sealed and rated.',
          'Keep the as-built drawings and the bill of material with the panel. Without them, a future modification cannot be evaluated.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'UL 698A is a different standard',
        text: 'UL 698A covers industrial control panels for hazardous locations, where the panel provides intrinsically safe field circuits. If your application involves a classified area, that is the standard, and it brings its own requirements for barriers, segregation, and documentation.',
      },
    ],
    faqs: [
      {
        q: 'Does every industrial control panel have to be UL 508A listed?',
        a: 'Not universally. Requirements depend on the authority having jurisdiction and the project specification. NEC 409.110 requires the SCCR marking on industrial control panels regardless. Many municipal specifications require the listing outright, and it is common practice for public work.',
      },
      {
        q: 'Can I build a UL 508A panel myself?',
        a: 'You can build to the standard, but you cannot apply the label unless your shop holds the listing and operates under the associated program with periodic audits. A panel built to the standard without the label is not a listed panel.',
      },
      {
        q: 'What is the default SCCR if nothing is calculated?',
        a: 'Panels frequently default to 5 kA, which is very low for anything fed from a substantial service. Determine the actual available fault current at the installation and design the panel to exceed it, using the supplement SB method or a high-fault-rated combination.',
      },
      {
        q: 'Does the listing cover the PLC program?',
        a: 'No. UL 508A is entirely about construction and safety. Program correctness, sequence of operation, and control performance are separate and belong in the functional specification and the factory acceptance test.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/sccr',
      '/controls/control-panels/panel-design/enclosure-selection',
      '/controls/control-panels/panel-design/heat-calculations',
      '/how-to/panel-how-to/calculate-sccr',
    ],
  },

  {
    path: '/controls/control-panels/pump-panels/lead-lag',
    kind: 'reference',
    title: 'Lead/Lag Pump Control',
    summary:
      'Which pump runs first, when the second joins, how they trade places, and the design decisions that determine whether a duplex station wears evenly.',
    answer:
      'Lead/lag control designates one pump as lead, which starts first, and another as lag, which starts when the lead cannot keep up. Alternation swaps those roles periodically so wear is shared. The core design decisions are what triggers the lag pump, how alternation is scheduled, and what happens when a pump fails, and all three should be written into the control narrative before any code is written.',
    keyPoints: [
      'Lead starts first; lag starts on a higher demand threshold or on a failure of the lead.',
      'Alternate on each cycle, on run hours, or on a schedule — each has different consequences.',
      'A failed pump must be removed from the rotation automatically, not just alarmed.',
      'Minimum run and minimum off timers protect motors from short cycling.',
      'Operators need a manual override that survives a controller restart.',
    ],
    published: '2026-04-28',
    updated: '2026-08-18',
    readingTime: 9,
    tags: ['Panels', 'Pumps', 'Wastewater', 'Control'],
    blocks: [
      { t: 'h2', text: 'The basic scheme' },
      {
        t: 'p',
        text: 'A duplex station has two pumps sized so that one can handle normal flow. In level-based control, the lead pump starts when the wet well reaches its start level and stops at the stop level. If inflow exceeds what the lead pump can move, the level continues to rise, and at a higher setpoint the lag pump joins it. Both run until the level falls to the stop point.',
      },
      {
        t: 'table',
        caption: 'Typical duplex wet well setpoints, bottom to top',
        head: ['Setpoint', 'Action', 'Notes'],
        rows: [
          ['Low level / dry run', 'Stop all pumps, alarm', 'Protects pumps from running dry'],
          ['All stop', 'Stop pumps', 'Above the low level cutoff and above the pump suction'],
          ['Lead start', 'Start lead pump', 'Set so the pump runs long enough to satisfy minimum run time'],
          ['Lag start', 'Start second pump', 'Inflow exceeds one pump capacity'],
          ['High level alarm', 'Alarm, notify', 'Independent float is good practice here'],
          ['High high / overflow', 'Alarm, emergency notification', 'Hardwired float, independent of the transmitter'],
        ],
      },
      { t: 'h2', text: 'Alternation strategies' },
      {
        t: 'dl',
        items: [
          { term: 'Alternate every cycle', def: 'Roles swap each time the station finishes a pumping cycle. Simple, predictable, and gives near-equal starts. The most common choice for a duplex station.' },
          { term: 'Alternate on run hours', def: 'The pump with fewer accumulated hours becomes lead. Balances run time rather than starts, which suits stations where cycles are very unequal in length. Requires the hour meters to be maintained and to survive a restart.' },
          { term: 'Alternate on a timer', def: 'Roles swap on a fixed schedule, such as weekly. Predictable for maintenance planning but can leave one pump idle for long stretches at a low-flow station.' },
          { term: 'Manual selection', def: 'An operator picks lead. Necessary as an override, and it should always be available, but it should not be the normal mode or one pump will accumulate all the wear.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Exercise the idle pump',
        text: 'At a low-flow station, alternation alone can still leave a pump sitting for weeks. A pump that never runs seizes, its seals dry out, and it fails the first time it is genuinely needed. Force a minimum run of the non-lead pump on a schedule, regardless of what alternation would otherwise do.',
      },
      { t: 'h2', text: 'Failure handling is the part that gets skipped' },
      {
        t: 'p',
        text: 'A control scheme that alternates cleanly and then hands the lead role to a pump that has been faulted for two days is worse than no alternation at all, because the station will not pump and the alarm looks like a level problem.',
      },
      {
        t: 'ol',
        items: [
          'Detect failure to start: if a pump is called and run confirmation does not appear within a few seconds, declare it failed.',
          'Remove a failed pump from the rotation immediately and promote the healthy one to lead.',
          'Alarm the failure distinctly. "Pump 1 failed to start" is actionable; "station high level" is a consequence.',
          'Do not auto-reset a motor protection trip. Require an operator acknowledgement.',
          'When only one pump remains available, say so on the display. Operators need to know the station has no redundancy tonight.',
          'If both pumps are unavailable, escalate immediately rather than waiting for a high level.',
        ],
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Failure-aware lead selection, in outline',
        code: `Available_1 = NOT Fault_1 AND NOT Maint_Lockout_1 AND HOA_1_in_Auto
Available_2 = NOT Fault_2 AND NOT Maint_Lockout_2 AND HOA_2_in_Auto

IF   Available_1 AND Available_2 THEN  Lead = Alternation_Selection
ELIF Available_1                 THEN  Lead = Pump_1,  Alarm "No redundancy"
ELIF Available_2                 THEN  Lead = Pump_2,  Alarm "No redundancy"
ELSE                                   Alarm "Station has no available pumps"

Lag = the other available pump, or none.`,
      },
      { t: 'h2', text: 'Protecting the motors' },
      {
        t: 'p',
        text: 'Short cycling destroys pump motors. Each start draws heavy inrush current and heats the windings, and motors are rated for a limited number of starts per hour, commonly in the range of six to ten for the sizes used at municipal lift stations. Check the motor nameplate and the manufacturer data for the actual figure.',
      },
      {
        t: 'ul',
        items: [
          'Minimum run timer: once started, a pump runs for a set period even if the level reaches the stop point, unless a protective interlock intervenes.',
          'Minimum off timer: a pump that stops cannot restart for a set period, allowing the motor to cool and the check valve to seat.',
          'Adequate level differential: the gap between start and stop levels must give a run long enough to satisfy minimum run time at the highest expected inflow.',
          'Stagger lag start: do not start both pumps within the same second. Sequence them so the electrical service does not see two inrush events together.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Narrow level bands cause short cycling',
        text: 'If the start and stop levels are close together, a station with modest inflow will start and stop repeatedly. The instinct to keep the wet well level tightly controlled is wrong here. A wider band means longer, less frequent runs, which is better for the pumps and for the collection system.',
      },
      { t: 'h2', text: 'HOA and where the PLC fits' },
      {
        t: 'p',
        text: 'The Hand-Off-Auto selector is the operator interface of last resort and it must work when the controller does not. Hand should start the pump through the starter regardless of PLC state. Auto passes control to the PLC. Off should positively prevent operation.',
      },
      {
        t: 'p',
        text: 'Bring the Auto position back to the PLC as an input. Without it, the controller does not know a pump has been taken out of automatic, will keep calling it, and will report a failure to start for a pump that is running perfectly well in hand. This single input eliminates a large share of nuisance alarms at pump stations.',
      },
      { t: 'h2', text: 'Variable speed changes the shape of the problem' },
      {
        t: 'p',
        text: 'With variable frequency drives, lead/lag becomes a capacity question rather than a purely discrete one. The lead pump modulates to hold a level or a flow, and the lag pump is added when the lead reaches maximum speed and cannot keep up. Both then typically run at a matched, reduced speed rather than one at full and one modulating.',
      },
      {
        t: 'p',
        text: 'The additional design points are minimum speed, which must stay above the point where the pump cannot overcome static head, and the delay before adding or dropping a pump, which prevents the station from cycling a pump on and off around the transition point.',
      },
    ],
    faqs: [
      {
        q: 'How often should pumps alternate?',
        a: 'For a duplex station, every cycle is the usual default and it produces the most even wear. Where cycles vary greatly in length, alternating on accumulated run hours balances wear better.',
      },
      {
        q: 'What triggers the lag pump?',
        a: 'Most commonly a higher wet well level, meaning the lead pump is not keeping up. It should also start on lead pump failure, and it may start on a high-level condition regardless of the normal sequence.',
      },
      {
        q: 'Should alternation survive a power failure?',
        a: 'Yes. Store the alternation state in retentive memory. Otherwise every power blip resets the station to pump 1 as lead, and over years that pump accumulates significantly more wear.',
      },
      {
        q: 'How many starts per hour is too many?',
        a: 'Check the motor nameplate and manufacturer data. For the submersible motors typical at municipal lift stations, six to ten starts per hour is a common limit. If your station exceeds that, widen the level band rather than accepting the cycling.',
      },
      {
        q: 'Should lead/lag logic live in the PLC or in a pump controller?',
        a: 'In the PLC for any station on SCADA. A dedicated pump controller is fine for a standalone station, but it puts the alternation state, the run hours, and the failure logic somewhere the utility cannot see or change.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/controls/control-panels/pump-panels/alternation',
      '/how-to/plc-how-to/program-lead-lag-pumps',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/sccr',
    kind: 'reference',
    title: 'Short-Circuit Current Rating (SCCR)',
    summary:
      'What a control panel’s short-circuit current rating means, how it is determined under UL 508A, why the NEC requires it on the label, and why the number is usually smaller than people expect.',
    answer:
      'The short-circuit current rating (SCCR) of an industrial control panel is the maximum fault current the assembly can withstand without creating a hazard, and it must be marked on the panel under NEC Article 409. It is determined by the lowest-rated component in the power circuit, following UL 508A Supplement SB. It is not the rating of the main breaker, and it must be equal to or greater than the available fault current where the panel is installed.',
    keyPoints: [
      'SCCR is a property of the whole assembly, set by its weakest power-circuit component, not by the main disconnect.',
      'NEC 409.110 requires the SCCR on the panel nameplate; NEC 110.10 requires it to be adequate for the available fault current at the installation.',
      'Components without a marked rating are assigned low default values under UL 508A Supplement SB, which drags the panel rating down.',
      'Raising the rating means changing components or using a tested combination, such as a current-limiting fuse or breaker protecting a listed downstream device.',
      'The available fault current at the site is the number the panel rating is compared against, and somebody has to calculate it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Panels', 'UL 508A', 'NEC', 'Design'],
    blocks: [
      { t: 'h2', text: 'What the rating means' },
      {
        t: 'p',
        text: 'When a bolted fault occurs downstream of a panel, the current that flows for the few cycles before a protective device clears it is limited only by the impedance of the utility, the transformer, and the conductors. At a small site that might be a few thousand amperes. Close to a large transformer it can be fifty thousand or more. Every component in the power path of the panel has to survive that current for those cycles without exploding, arcing to the enclosure, or welding closed.',
      },
      {
        t: 'p',
        text: 'The short-circuit current rating is the assembly-level statement of what the panel can survive. It is expressed in kiloamperes, symmetrical RMS, at a voltage. A panel marked 10 kA at 480 V has been evaluated to withstand a 10,000 A fault at that voltage. Installed where the available fault current is 22,000 A, it is a code violation and a hazard, regardless of what the main breaker is rated to interrupt.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'SCCR is not the interrupting rating',
        text: 'The interrupting rating is what a breaker or fuse can safely clear. The SCCR is what the entire assembly downstream of it can withstand while it does so. A 65 kA main breaker on a panel full of 5 kA components produces a 5 kA panel.',
      },
      { t: 'h2', text: 'What the code requires' },
      {
        t: 'p',
        text: 'NEC Article 409 covers industrial control panels. Section 409.110 requires the panel to be marked with its short-circuit current rating, based on one of the listed methods, of which UL 508A Supplement SB is the one panel shops use. Section 110.10 requires that the overcurrent protection, the impedance, and the component short-circuit current ratings be selected so that a fault can be cleared without extensive damage to the electrical equipment, which is the requirement that the panel rating be adequate for the installation.',
      },
      {
        t: 'p',
        text: 'Section 110.24 requires service equipment to be field marked with the maximum available fault current and the date it was calculated. That marking, or the calculation behind it, is where the number to compare against comes from. Industrial machinery panels are covered by NEC Article 670 and NFPA 79, which carry equivalent marking requirements.',
      },
      { t: 'h2', text: 'How the rating is determined' },
      {
        t: 'p',
        text: 'UL 508A Supplement SB gives the procedure. Reduced to its essentials: identify every component in the power circuit, find the short-circuit current rating of each, and the assembly rating is the lowest of them. The power circuit is everything from the incoming terminals through the disconnect, the branch protection, the contactors, overload relays, drives, terminal blocks, and the feeders to the loads. Control circuit components fed through a control transformer or a limited supply are generally excluded.',
      },
      {
        t: 'steps',
        items: [
          { title: 'List the power-circuit components.', text: 'Disconnect, main overcurrent device, power distribution blocks, branch breakers or fuse holders, contactors, overload relays, soft starters, drives, power terminal blocks, and busbars.' },
          { title: 'Find each rating.', text: 'From the component listing or datasheet. Many components carry a marked SCCR that depends on the type and size of the protective device ahead of them; a contactor might be 5 kA on its own and 65 kA when protected by a specified class of fuse.' },
          { title: 'Apply the default where nothing is marked.', text: 'Supplement SB assigns default ratings to unmarked components by category. The defaults are low, in the range of a few kiloamperes for most categories, and a single unmarked terminal block can set the whole panel to that value.' },
          { title: 'Take the lowest.', text: 'The assembly SCCR is the smallest rating in the list. It is common for a first pass to land at 5 kA because of one component.' },
          { title: 'Raise it where needed.', text: 'Replace the limiting component with a higher-rated one, or protect it with a device it is listed in combination with. Current-limiting fuses and breakers let a downstream component be rated at the combination value rather than its standalone value, but only for the exact combinations that were tested.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Combination ratings only apply to tested combinations',
        text: 'A contactor listed at 65 kA when protected by a class J fuse of a stated maximum size is not 65 kA behind a class RK5 fuse or behind a breaker. The listing specifies the protective device type and maximum rating, and using anything else returns the component to its standalone rating.',
      },
      { t: 'h2', text: 'Why the number is usually smaller than expected' },
      {
        t: 'p',
        text: 'People see a 65 kA breaker at the top of a panel and assume the panel is 65 kA. The breaker is; the panel is whatever the cheapest component in the power circuit is. Power distribution blocks, terminal blocks, and small drives are the usual culprits, and a general-purpose terminal block that was never evaluated for short circuit gets the default. A panel shop that does not do the calculation ships panels marked at the default, and a panel marked at the default is only legal at the small fraction of sites where the available fault current is that low.',
      },
      {
        t: 'table',
        caption: 'Where the rating typically gets set',
        head: ['Component', 'Typical situation', 'What raises it'],
        rows: [
          ['Power distribution block', 'Unmarked or marked at 10 kA', 'A block listed for higher SCCR, or a listed fuse combination'],
          ['Power terminal blocks', 'General-purpose blocks with the default rating', 'Blocks with a marked SCCR for the wire size used'],
          ['Contactor and overload', 'Low standalone rating, high combination rating', 'The specific fuse class or breaker the manufacturer tested with'],
          ['Variable frequency drive', 'Rated with a specified fuse type and size', 'Using exactly that fuse, on the line side'],
          ['Soft starter', 'Type 1 or type 2 coordination with a named fuse', 'Matching the coordination table in the listing'],
          ['Main disconnect', 'Usually fine on its own', 'Rarely the limit'],
        ],
      },
      { t: 'h2', text: 'Getting the available fault current' },
      {
        t: 'p',
        text: 'The panel rating is only meaningful against a number. The available fault current at the panel depends on the utility contribution, the transformer size and impedance, and the conductor length and size between the transformer and the panel. The utility will state its contribution at the service; the transformer nameplate gives the impedance; and a point-to-point calculation carries it down the feeders. Motors on the system contribute as well, briefly. The result is the number the panel rating must meet or exceed.',
      },
      {
        t: 'p',
        text: 'This calculation is engineering work and, where a stamp is required, it belongs to the engineer of record. A controls integrator should ask for it before designing the panel, because it is far cheaper to select 65 kA components at the start than to rebuild a 5 kA panel after inspection.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'An under-rated panel fails violently',
        text: 'A component subjected to a fault beyond its rating can rupture, arc across the enclosure, and eject molten metal. The rating exists to protect the people standing in front of the panel when a fault occurs. It is not a paperwork exercise.',
      },
    ],
    faqs: [
      {
        q: 'What SCCR do I need?',
        a: 'At least the available fault current at the point where the panel is installed, from the calculation described above. Where that number is not yet known, designing to a common commercial value such as 65 kA at 480 V avoids the problem on most sites, at some cost in component selection.',
      },
      {
        q: 'Does a 65 kA main breaker give the panel a 65 kA rating?',
        a: 'No. The breaker can interrupt 65 kA. The panel rating is the lowest rating of any power-circuit component behind that breaker, and it is often far lower unless the components were selected for it.',
      },
      {
        q: 'What is the default rating for unmarked components?',
        a: 'UL 508A Supplement SB assigns defaults by component category, and for most categories they are a few kiloamperes. Any panel that contains one unmarked power-circuit component ends up at that default. The exact values are in the supplement and should be read from the current edition.',
      },
      {
        q: 'Can the rating be raised after the panel is built?',
        a: 'Sometimes, by replacing the limiting component or adding current-limiting protection in a listed combination, and the label must then be corrected. If the panel is UL listed, the change has to be made under the listing program, not just in the field.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/ul-508a',
      '/engineering-library/standards/ul',
      '/engineering-library/standards/nfpa',
      '/controls/control-panels/power-distribution/overcurrent-protection',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/enclosure-selection',
    kind: 'reference',
    title: 'Enclosure Selection',
    summary:
      'Choosing the box: NEMA and UL 50 type ratings, materials for corrosive and outdoor sites, sizing for heat and wire bending space, and the details at the conduit entries and the door that decide whether the rating survives installation.',
    answer:
      'An enclosure is selected by the environment it will sit in, which fixes the type rating and the material; by what goes inside, which fixes the size through heat and wire bending space; and by who has to work in it, which fixes the mounting and the door. A Type 4X stainless or fiberglass enclosure for a lift station in the weather, a Type 12 painted steel enclosure for a plant control room, and a Type 1 for a clean indoor space are the usual answers, and every one of them is only as good as its conduit entries and its door seal.',
    keyPoints: [
      'The type rating describes what the enclosure keeps out; the material describes what it survives. Both are chosen from the site.',
      'Outdoor and wet well sites are Type 4X; corrosive atmospheres and sunlight push the choice between stainless and fiberglass.',
      'Size is set by the heat the contents produce and by the wire bending space the code requires at terminals, not by what fits.',
      'Every conduit entry, cable gland, and door-mounted device must carry the same rating or the enclosure does not.',
      'Plan the working space in front, the door swing, and how a technician gets to the back of the door.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Design', 'UL 508A', 'NEC'],
    blocks: [
      { t: 'h2', text: 'Type ratings' },
      {
        t: 'p',
        text: 'Enclosure types in North America are defined by NEMA 250 and UL 50, and the number on the label describes the environment the enclosure is built for. The types that appear in controls work are few.',
      },
      {
        t: 'table',
        caption: 'Enclosure types in common use',
        head: ['Type', 'Environment', 'Keeps out', 'Typical use'],
        rows: [
          ['1', 'Indoor, general purpose', 'Contact with the contents, falling dirt', 'Clean electrical rooms'],
          ['12', 'Indoor, industrial', 'Dust, dripping and splashing non-corrosive liquids', 'Plant floors and control rooms'],
          ['3R', 'Outdoor', 'Rain, sleet, and snow; not wind-driven dust', 'Meter and service enclosures, outdoor disconnects'],
          ['4', 'Indoor or outdoor', 'Windblown dust, rain, splashing and hose-directed water', 'Washdown areas, outdoor panels'],
          ['4X', 'Indoor or outdoor', 'Everything Type 4 does, plus corrosion', 'Lift stations, treatment plants, coastal and chemical sites'],
          ['13', 'Indoor', 'Dust, spraying water, oil, and non-corrosive coolant', 'Machine tools'],
          ['7 and 9', 'Hazardous locations', 'Contains an internal explosion, or excludes dust', 'Classified areas; the UL 698A page'],
        ],
      },
      {
        t: 'p',
        text: 'The rating is a property of the enclosure as tested with its door closed and its knockouts unused. It says nothing about what the installer does to it. A Type 4X enclosure with a general-purpose conduit fitting in the top, a hole drilled for a pilot light without a gasket, or a door held open by a cable, is a Type 1 enclosure with an expensive label.',
      },
      { t: 'h2', text: 'Material' },
      {
        t: 'dl',
        items: [
          { term: 'Painted carbon steel', def: 'The standard indoor enclosure. Strong, cheap, easy to modify, and it rusts wherever the paint is broken. Fine for Type 1 and Type 12; poor for anything wet or corrosive.' },
          { term: 'Stainless steel, 304 and 316', def: 'The standard for Type 4X. Grade 304 resists most plant environments; 316 resists chlorides, which matters near the coast, near hypochlorite, and in wastewater atmospheres with hydrogen sulfide. Heavy, expensive, and it reflects the sun, which helps.' },
          { term: 'Fiberglass reinforced polyester', def: 'Type 4X, immune to most chemicals, non-conductive, lighter than steel. Surface chalks and fades in sunlight, gaskets and hardware are the weak points, and it does not shield radio or electrical noise. The usual choice for a chemical feed panel.' },
          { term: 'Polycarbonate', def: 'Small Type 4X enclosures for a few components. Clear covers let a display be seen without opening the door. Limited size and limited load on the mounting panel.' },
          { term: 'Aluminum', def: 'Light, corrosion resistant in many environments, good for hazardous location housings. Attacked by some chemicals and by galvanic contact with dissimilar metals.' },
        ],
      },
      { t: 'h2', text: 'Size' },
      {
        t: 'p',
        text: 'The temptation is to size the enclosure to what fits. Two things set the size instead. The first is heat: every component dissipates power into the box, and the enclosure surface is what carries it out, so the surface area and the ambient decide whether the inside stays within the ratings of the components. The heat calculations page and the enclosure heat load calculator cover it, and a drive in a small box is the usual way to discover it. The second is wire bending space, which NEC Article 312 requires at every terminal, sized by the conductor and by whether the wire enters opposite the terminal or from the side. A panel with the incoming feeder terminated an inch from the wall is a panel the inspector rejects.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Leave a fifth of the panel empty',
        text: 'Twenty percent spare mounting space and spare terminal positions is a common rule. The first change order needs a relay, a terminal strip, and a surge device, and it needs them without a new enclosure.',
      },
      { t: 'h2', text: 'Outdoors' },
      {
        t: 'ul',
        items: [
          'A sun shield or a drip shield over the top and the sunny face. The sun is a heat source that can exceed the contents.',
          'A condensation heater with a thermostat, so that a cold night after a warm damp day does not leave water on the electronics.',
          'Conduit entries from below where possible, with rated fittings and drain fittings at the low points, so that water in the conduit does not run into the panel.',
          'A dead-front or inner door, so that the outer door can be opened for a display without exposing live parts to the weather and to people.',
          'Stainless or non-metallic hardware, hinges, and latches. Steel hinges on a stainless box are where the rust starts.',
          'Pedestal or wall mounting at a height that keeps the bottom above flood and snow, with the working space the code requires in front.',
        ],
      },
      { t: 'h2', text: 'Access and working space' },
      {
        t: 'p',
        text: 'NEC 110.26 requires working space in front of equipment that may need examination or adjustment while energized, typically three feet deep and the width of the equipment or thirty inches, whichever is greater, clear to the floor. The door must open fully into that space. Door-mounted devices need the back of the door reachable, which means the door cannot be against a wall when open. Free-standing enclosures need rear access or a design that puts everything at the front. These are drawn on the layout before the enclosure is ordered, because the wall it will hang on is usually not the wall the drawing assumed.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Working space is a safety requirement, not a convenience',
        text: 'The clearance in front of a live panel exists so that a person can work at it and get away from it. A pallet, a chemical tote, or a second panel installed in that space is a code violation and an arc flash hazard. Mark it on the floor.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between Type 4 and Type 4X?',
        a: 'Both keep out windblown dust, rain, and hose-directed water. Type 4X adds corrosion resistance, meaning stainless steel or a non-metallic material. Any wastewater, coastal, or chemical site is 4X.',
      },
      {
        q: 'Stainless or fiberglass for a lift station?',
        a: 'Either is Type 4X. Stainless, 316 for chloride and sulfide exposure, is stronger, shields radio noise, and lasts longest in the sun. Fiberglass is lighter, cheaper, and immune to most chemicals, and it chalks in sunlight and needs its gaskets watched. Both are common; the site chemistry and the budget decide.',
      },
      {
        q: 'How big should the enclosure be?',
        a: 'Big enough for the heat and the wire bending space, plus twenty percent spare. Run the heat calculation with the drives and supplies in it, check the bending space at the largest terminals against NEC Article 312, and then see what size that is.',
      },
      {
        q: 'Does a hole for a pushbutton void the rating?',
        a: 'It does if the device installed in it is not rated for the enclosure type or is not gasketed as the device manufacturer requires. Door-mounted devices for a Type 4X panel are Type 4X devices, installed to their instructions.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/heat-calculations',
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/panel-design/ul-508a',
      '/controls/control-panels/panel-design/ul-698a',
      '/calculators/enclosure-heat-load',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/heat-calculations',
    kind: 'reference',
    title: 'Enclosure Heat Calculations',
    summary:
      'Estimating the temperature inside a control panel from the power its contents dissipate and the surface that carries it out, what to do when the answer is too hot, and why drives change everything.',
    answer:
      'Everything in a panel that carries current turns some of it into heat, and the enclosure surface is the only thing carrying that heat out to the room. The temperature rise inside is the total heat divided by the product of the surface area and a heat transfer coefficient that depends on the enclosure material and the air around it. If the resulting inside temperature exceeds the rating of the most sensitive component, the panel needs a bigger enclosure, less inside it, or cooling. A variable frequency drive is the component that most often forces that decision.',
    keyPoints: [
      'Sum the heat: drive losses, power supplies, transformers, the controller, relays, and anything with a heatsink.',
      'Temperature rise is heat divided by surface area times a coefficient; the enclosure manufacturer publishes the coefficient.',
      'Compare the inside temperature to the lowest rating in the panel, usually the drive, the controller, or the UPS battery.',
      'Outdoors, add the sun. A dark enclosure in direct sun gains more from the sun than from its contents.',
      'The remedies in order: a larger enclosure, moving the drive out, ventilation, a heat exchanger, an air conditioner.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Design', 'VFD', 'Power'],
    blocks: [
      { t: 'h2', text: 'Where the heat comes from' },
      {
        t: 'table',
        caption: 'Heat sources in a typical panel',
        head: ['Component', 'Heat', 'Where to get the number'],
        rows: [
          ['Variable frequency drive', 'A few percent of the drive rating at full load, often the largest single source', 'The drive manual, as watts of loss at rated load'],
          ['Power supplies', 'The difference between input and output power, ten to fifteen percent of the load on a modern supply', 'The datasheet efficiency at the actual load'],
          ['Control transformer', 'Core and copper losses, a few percent of the rating', 'The transformer datasheet'],
          ['Controller and I/O', 'Backplane draw times voltage, a few watts to tens of watts', 'The platform power calculation'],
          ['Relays, contactors, starters', 'Coil power while energized, plus contact losses under load', 'The datasheets; count what is on at once'],
          ['Soft starters', 'Bypass contactors reduce it at speed; significant during starts', 'The manual'],
          ['Network switches, radios, HMIs', 'Their rated power, nearly all of it becomes heat', 'The datasheets'],
          ['Conductors and terminals', 'Resistive losses, usually small unless currents are large', 'Estimate from current and length'],
        ],
      },
      {
        t: 'p',
        text: 'Add them for the worst case that actually occurs: everything that runs at once, at the load it runs at, on the hottest day. A duplex pump panel with both drives at full speed on a summer afternoon is the case, not a quiet night in winter.',
      },
      { t: 'h2', text: 'The estimate' },
      {
        t: 'formula',
        expr: 'Temperature rise = Total heat / (Effective surface area x Heat transfer coefficient)',
        where: [
          'Total heat is the sum of the losses, in watts',
          'Effective surface area is the enclosure area that can shed heat: for a wall-mounted enclosure, the front, sides, top, and bottom, but not the back against the wall',
          'The heat transfer coefficient depends on the material and the airflow: on the order of 5 to 7 watts per square meter per degree Celsius for painted steel in still air, lower for non-metallic enclosures, and the enclosure manufacturer publishes the figure to use',
          'Inside temperature is the ambient plus the rise; compare it to the rating of the most sensitive component',
        ],
      },
      {
        t: 'p',
        text: 'The enclosure heat load calculator on this site does this arithmetic and shows the working. A worked example: a wall-mounted painted steel enclosure 36 by 30 by 12 inches has roughly 2.7 square meters of effective surface. Two small drives at 150 watts of loss each, a 100 watt power supply at 85 percent efficiency, a controller at 20 watts, and relays at 30 watts come to about 365 watts. At 6 watts per square meter per degree, the rise is about 23 degrees Celsius. In a 35 degree room that is 58 degrees inside, above the 50 degree rating of most drives and controllers, and the panel needs help.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The estimate is optimistic in every way that matters',
        text: 'It assumes the heat is spread evenly and the air inside circulates. In reality the drive heats the top of the panel and the corner it sits in, and the component above it sees more than the average. It assumes still air outside; a panel in an alcove or against another panel sheds less. And it assumes no sun. Treat the result as a lower bound and design with margin.',
      },
      { t: 'h2', text: 'Outdoors' },
      {
        t: 'p',
        text: 'Direct sunlight on an enclosure adds heat that has nothing to do with the contents, on the order of several hundred watts per square meter of exposed dark surface at midday, reduced sharply by a light color, a reflective finish, or a sun shield with an air gap. An outdoor panel is calculated with the solar gain added and the shield assumed, and then built with the shield, because the shield is the cheapest cooling there is.',
      },
      { t: 'h2', text: 'What to do when it is too hot' },
      {
        t: 'steps',
        items: [
          { title: 'Take the drives out.', text: 'Put drives in their own enclosure, or in a ventilated section separated from the controls, or use drives with through-panel heatsinks that put the heat outside. Removing the largest source is worth more than any cooler.' },
          { title: 'Make it bigger.', text: 'Surface area is the denominator. A taller enclosure of the same footprint sheds more and costs less than a cooling unit.' },
          { title: 'Ventilate, if the rating allows.', text: 'Filtered fans through louvers turn the enclosure into a Type 12 at best, and a Type 1 in practice once the filter is neglected. Never on a Type 4 or 4X enclosure that must stay sealed.' },
          { title: 'Fit a heat exchanger.', text: 'An air-to-air exchanger moves heat through a sealed core without exchanging air, keeping the rating. It cannot cool below ambient and its capacity is stated in watts per degree of difference.' },
          { title: 'Fit an air conditioner.', text: 'The only option that cools below ambient. It draws power, needs a condensate drain and a filter, has a compressor that fails, and it is what a drive panel in a Florida pump house usually ends up with.' },
          { title: 'Derate or reconsider.', text: 'A drive derated for temperature, or a smaller drive because the pump never runs at full load, may reduce the heat enough. Check the drive derating curve.' },
        ],
      },
      { t: 'h2', text: 'Cold' },
      {
        t: 'p',
        text: 'The same panel in winter has the opposite problem. Displays, batteries, and some electronics have minimum temperatures, and condensation forms when the inside cools below the dew point. A thermostatically controlled heater of a few tens of watts keeps a small panel above freezing and dry. Size it from the heat loss at the design low temperature by the same arithmetic in reverse.',
      },
    ],
    faqs: [
      {
        q: 'How do I calculate the temperature inside a control panel?',
        a: 'Sum the watts of heat from everything inside at the worst case, divide by the effective surface area of the enclosure times the heat transfer coefficient the enclosure manufacturer publishes, and add the ambient. The enclosure heat load calculator on this site does it.',
      },
      {
        q: 'How much heat does a VFD produce?',
        a: 'Typically a few percent of its rated power at full load, stated in the drive manual as watts of loss. A 25 horsepower drive can dissipate several hundred watts, which is why drives dominate the heat load of the panels they sit in.',
      },
      {
        q: 'Can I put a fan in a Type 4X enclosure?',
        a: 'Not without losing the rating. A fan needs an opening, and an opening admits water and dust. Use a heat exchanger or an air conditioner rated for the enclosure type, or move the heat source out.',
      },
      {
        q: 'What temperature can a PLC tolerate?',
        a: 'Most controllers and drives are rated to 50 or 60 degrees Celsius inside the enclosure, and some to less. Check the rating of every component and design to the lowest one, with margin for the hot corner near the drive.',
      },
    ],
    related: [
      '/calculators/enclosure-heat-load',
      '/controls/control-panels/panel-design/enclosure-selection',
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/pump-panels/vfd',
      '/troubleshooting/control-panel-troubleshooting/panel-overheating',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/component-layout',
    kind: 'reference',
    title: 'Component Layout',
    summary:
      'Arranging a panel so it is safe to work in, cool enough to run, quiet enough for its signals, and possible to modify: power and control separation, heat, wireways, terminals, and the working space rules.',
    answer:
      'A good layout keeps power and control apart, puts the heat where it can leave, keeps analog and network wiring away from drives and contactors, and leaves room to work and to grow. The incoming power and the disconnect at the top or the side where the feeder enters, drives and starters in their own region, the controller and its I/O well away from them, terminals along the bottom or the sides where field wiring arrives, and wireways between every row with space to spare. Draw it to scale before anything is mounted.',
    keyPoints: [
      'Separate power and control into regions with wireway between them, and keep field wiring off the control side until it reaches the terminals.',
      'Put drives and other heat sources where their heat rises out, not under the controller.',
      'Route analog and network cables in their own wireway, crossing power at right angles if they must cross at all.',
      'Terminals at the entry side, grouped by voltage and by field circuit, with spares.',
      'Leave twenty percent of the panel empty and every device reachable with the door open.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Design', 'UL 508A', 'Signals'],
    blocks: [
      { t: 'h2', text: 'Regions' },
      {
        t: 'p',
        text: 'The first decision is to divide the back panel into regions by function and voltage, and to keep them separated by wireway. A typical arrangement for a pump panel puts the incoming disconnect and the main protection at the top corner where the feeder arrives, the motor starters or drives across the top or down one side, the control transformer and the power supplies near them, the controller and its I/O in the middle or on the opposite side, and the terminal strips along the bottom and the entry side. The regions give a technician a map: power is here, control is there, the field lands along the bottom.',
      },
      {
        t: 'table',
        caption: 'Placing the parts',
        head: ['Component', 'Where', 'Why'],
        rows: [
          ['Disconnect and main breaker', 'Top, at the feeder entry, with the handle through the door', 'Shortest feeder run; the handle is where a person expects it'],
          ['Drives, soft starters, starters', 'Top or upper side, their own region', 'Heat rises out; keeps their noise and their line-side voltage away from control'],
          ['Control transformer, power supplies', 'Near the power region', 'They belong to the power distribution and they are warm'],
          ['Controller and I/O', 'Middle or lower, away from drives', 'Cooler, quieter, and the field wiring reaches it easily'],
          ['Network switch, radio, modem', 'Near the controller, away from drives', 'Short patch cables and less interference'],
          ['Terminal strips', 'Bottom and entry side', 'Field conduits enter from below; short runs from the field'],
          ['Surge protection', 'At the entry of what it protects', 'A surge device on a long lead is a surge device on a resistor'],
          ['Door-mounted devices', 'Front, in reach, grouped by function', 'Operators use them; wire them through a flexible loom at the hinge'],
        ],
      },
      { t: 'h2', text: 'Heat' },
      {
        t: 'p',
        text: 'Heat rises, so the heat sources go high and the components that dislike heat go low. A drive mounted above a controller pours warm air over the controller all day. Drives need the clearance above and below that their manuals specify for their own airflow, and side by side they need the spacing stated for adjacent drives. A panel where the heat calculation is marginal is a panel where layout matters most, and the calculation is done before the layout, not after.',
      },
      { t: 'h2', text: 'Noise' },
      {
        t: 'p',
        text: 'The output cables of a drive radiate high-frequency noise, and contactors and relay coils make sharp transients when they switch. Analog signal wiring, network cable, and communication cable pick both up. The layout keeps them apart: the drive and its cables in their region, the analog and network wiring in a separate wireway on the control side, and where a signal cable has to cross a power conductor, it crosses at a right angle and does not run parallel. Shields land on the ground bar at the control side. A well-laid-out panel needs no filters on its analog inputs; a badly laid-out one needs them and still reads noise.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Give the drive output cables their own conduit and their own side of the panel',
        text: 'Shielded drive cable from the drive to the motor, in a conduit that carries nothing else, leaving the panel on the power side. It is the single most effective noise measure in a pump panel, and it costs a conduit.',
      },
      { t: 'h2', text: 'Wireways and wiring' },
      {
        t: 'p',
        text: 'Wireway runs between every row of components and along every edge where wiring turns, sized so that it is no more than about half full when the panel leaves the shop, because it will be fuller later. Separate wireways, or a divided wireway, carry power and control. Wiring is color coded by function under the panel standard, UL 508A and the owner’s specification, so that a technician can tell a 120 VAC control wire from a 24 VDC one from a foreign voltage without a meter. Every wire is labeled at both ends with the number on the drawing.',
      },
      { t: 'h2', text: 'Terminals' },
      {
        t: 'p',
        text: 'The terminal strips are the interface between the panel and the field, and they are where the technician spends the most time. Group them by voltage, with barriers or space between groups, and by circuit within a group, in the order the drawing shows. Fused terminals for field circuits that need individual protection, disconnect terminals for loops that will be tested, and spare terminals of every type. Terminals for intrinsically safe circuits are blue and separated from everything else by the distance the barrier manufacturer requires. Label every terminal, and mount the strip where the field conductors reach it without crossing the control region.',
      },
      { t: 'h2', text: 'Working in it' },
      {
        t: 'ul',
        items: [
          'Every device is reachable with the door open and nothing removed. A relay behind a wireway cover behind a drive is a relay that never gets replaced.',
          'The back of the door is reachable when the door is open, with a loom long enough and a hinge clear of the wall.',
          'A dead-front covers live parts where operators will open the outer door to reach a display or a switch.',
          'Drawings, in a pocket on the door, current.',
          'The working space in front, per NEC 110.26, is marked on the layout and, once installed, on the floor.',
          'Twenty percent of the back panel and of every terminal strip is empty on the day it ships.',
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Layout is arc flash design',
        text: 'Where the incoming terminals sit, whether they are shrouded, and whether a person must reach past them to work on the controls decides the hazard a technician faces on every visit. Line-side terminals are covered, isolated at the top of the panel, and never behind or beside the control terminals that get worked on live.',
      },
    ],
    faqs: [
      {
        q: 'Where should the PLC go in a panel with VFDs?',
        a: 'As far from the drives as the panel allows, and below them, with wireway between. The drives heat and radiate noise; the controller and its analog inputs want neither.',
      },
      {
        q: 'Can power and control wiring share a wireway?',
        a: 'Not if the layout can avoid it. Separate wireways, or a divided one, keep the drive and contactor noise off the signal wiring and keep a technician from finding line voltage beside a 24 volt wire. Where they must cross, cross at a right angle.',
      },
      {
        q: 'How full should a wireway be?',
        a: 'About half when the panel ships. It will be fuller after every change order, and a wireway that is full on day one cannot take the next wire without the cover coming off for good.',
      },
      {
        q: 'How much spare space should a panel have?',
        a: 'Twenty percent of the back panel and of the terminal positions is the usual rule. It costs a slightly larger enclosure and it saves the next enclosure.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/enclosure-selection',
      '/controls/control-panels/panel-design/heat-calculations',
      '/controls/control-panels/panel-design/wireways',
      '/controls/control-panels/panel-design/terminals',
      '/controls/instrumentation/signals/ground-loops',
    ],
  },
  {
    path: '/controls/control-panels/pump-panels/hoa',
    kind: 'reference',
    title: 'Hand-Off-Auto Selectors',
    summary:
      'What each position of an HOA selector does, how it is wired into the starter circuit, which protections must survive Hand, what the controller should see, and the mistakes that let a pump run with nobody watching.',
    answer:
      'A Hand-Off-Auto selector decides who commands a pump. In Hand the operator runs it from the panel, bypassing the controller’s logic; in Off it cannot run; in Auto the controller runs it. The selector sits in the starter control circuit so that its authority is electrical, not software. Overloads and safety interlocks stay in the circuit in every position, the controller is told which position the selector is in, and Hand is for a person standing at the panel, not a way to leave a pump running unattended.',
    keyPoints: [
      'The selector is in the starter coil circuit, so Off is Off whatever the controller does.',
      'Hand bypasses the controller’s start logic and nothing else: overloads, motor protection, and safety interlocks remain.',
      'The controller gets an input for Auto, and preferably for Hand, so it knows what it is and is not controlling.',
      'A pump running in Hand with no level control is an overflow or a dry run waiting to happen; alarm it and time it.',
      'An HMI Hand is a software mode and is not the same thing; the physical selector still governs.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Panels', 'Pumps', 'Design', 'PLC'],
    blocks: [
      { t: 'h2', text: 'The three positions' },
      {
        t: 'dl',
          items: [
          { term: 'Hand', def: 'The selector connects the starter coil, through the protective devices, to control power. The pump runs as long as the selector is in Hand. The controller’s start command is out of the circuit.' },
          { term: 'Off', def: 'The coil circuit is open. Nothing starts the pump, from the panel or from the controller. Off is not a lockout, and it is not a substitute for one.' },
          { term: 'Auto', def: 'The coil circuit runs through the controller’s output relay. The pump runs when the controller commands it, through whatever logic, level control, alternation, and interlocks the program has.' },
        ],
      },
      { t: 'h2', text: 'The circuit' },
      {
        t: 'p',
        text: 'The selector sits in the 120 VAC control circuit of the starter or, for a drive, in the run command circuit. From control power, the circuit passes through the safety and protective devices that apply in every mode, then through the selector, and from the Auto contact through the controller’s output relay, to the coil. The overload relay contact, the motor protection, and any hardwired interlock that protects people or the pump itself are upstream of the selector, so that Hand cannot defeat them. The level float that starts the pump in a lift station is, by contrast, a control device, and Hand bypasses it on purpose.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Hand must not bypass what protects the pump or the person',
        text: 'Overload, motor over-temperature, seal failure where it trips the pump, and any interlock that exists for safety stay in the circuit in Hand. Hand bypasses the controller’s decisions about when to run, not the devices that decide whether it is safe to run. Draw the circuit so the difference is visible, and test it.',
      },
      { t: 'h2', text: 'What the controller should see' },
      {
        t: 'p',
        text: 'A controller that does not know a pump is in Hand reports it as failed to start when it is off, or as running unexpectedly when it is on, and its alternation and its runtime accounting go wrong. The selector should have a spare contact that closes in Auto, wired to a controller input, and preferably a second contact for Hand. With those, the program knows whether its command is in charge, can alarm when a pump has been out of Auto for longer than a set time, can accumulate runtime in Hand from the run feedback, and can skip a pump that is not available to it in the alternation sequence.',
      },
      {
        t: 'table',
        caption: 'Inputs from the pump circuit',
        head: ['Signal', 'Source', 'Used for'],
        rows: [
          ['In Auto', 'Selector contact', 'Whether the controller is in control; alternation availability; not-in-auto alarm'],
          ['In Hand', 'Selector contact', 'Distinguishing Hand from Off; Hand runtime alarm'],
          ['Running', 'Starter auxiliary contact or drive run status', 'Run confirmation, fail-to-start detection, runtime hours in every mode'],
          ['Overload tripped', 'Overload relay auxiliary contact', 'Fault alarm; taking the pump out of the alternation'],
        ],
      },
      { t: 'h2', text: 'Hand is not unattended operation' },
      {
        t: 'p',
        text: 'A pump in Hand runs until someone turns the selector, whatever the level does. In a lift station that is a dry well and a burned pump if the level falls, or, if Hand was used to force a pump on during a high level and then forgotten, nothing at all until the next high level, when the pump is already on and the second one is the only reserve. The program should alarm when a pump has been in Hand for more than a few minutes, and the operating procedure should say that Hand is for a person at the panel. Some designs add a timed Hand, which returns the selector circuit to Auto after a period, at the cost of the simplicity that makes the selector trustworthy.',
      },
      { t: 'h2', text: 'HMI modes and the physical selector' },
      {
        t: 'p',
        text: 'Modern systems add a software manual mode on the HMI: the operator commands the pump from the screen, through the controller, bypassing the automatic logic but not the controller. That is useful and it is a different thing. The physical selector in Auto is what lets the HMI command work at all; the physical selector in Hand or Off overrides the HMI entirely. The narrative names both modes and says which governs, and the HMI shows the physical selector position so that an operator is not commanding a pump that the panel has taken away from them.',
      },
      { t: 'h2', text: 'Two-position and drive-based variants' },
      {
        t: 'p',
        text: 'Some panels use a two-position Auto-Off selector with a separate momentary Hand pushbutton, so that Hand cannot be left on. Drives often carry their own Hand-Off-Auto on the keypad, which selects whether the drive takes its run and speed commands from the keypad or from the controller, and it is a second selector that the program must also know about, because a drive in keypad mode ignores the panel selector.',
      },
    ],
    faqs: [
      {
        q: 'Should the PLC be able to start a pump in Hand?',
        a: 'No. Hand is the operator’s mode and the controller is out of the coil circuit. The controller sees the run feedback and, ideally, the selector position, and it accounts for the pump but does not command it.',
      },
      {
        q: 'What stays active in Hand?',
        a: 'Everything that protects the motor or a person: overload, motor thermal protection, seal failure trip if it is configured as a trip, and safety interlocks. What Hand bypasses is the controller’s decision to run, including level control and alternation.',
      },
      {
        q: 'Do I need a PLC input for the selector position?',
        a: 'Yes, at least for Auto. Without it the controller cannot tell a pump that failed to start from one that is in Off, cannot alarm a pump left in Hand, and cannot manage alternation correctly.',
      },
      {
        q: 'Is Off the same as locked out?',
        a: 'No. Off opens the control circuit; the motor circuit is still energized and the selector can be turned by anyone. Lockout is the disconnect, opened and locked, per the site procedure.',
      },
    ],
    related: [
      '/controls/control-panels/pump-panels/lead-lag',
      '/controls/control-panels/pump-panels/alternation',
      '/controls/plc-systems/programming/interlocks',
      '/troubleshooting/vfd-troubleshooting/drive-will-not-start-in-auto',
      '/troubleshooting/pump-troubleshooting/pump-will-not-start',
    ],
  },
  {
    path: '/controls/control-panels/pump-panels/vfd',
    kind: 'reference',
    title: 'Variable Frequency Drives in Pump Panels',
    summary:
      'What a drive adds to a pump panel and what it costs: speed control, soft start, reduced inrush, and diagnostics against heat, harmonics, cable and motor stress, bypass, and the minimum speed below which a pump does no work.',
    answer:
      'A variable frequency drive in a pump panel converts fixed-frequency AC to a variable-frequency output, so pump speed follows a control signal instead of running at full speed. That gives level or pressure control, soft starting, lower starting current, and built-in motor protection and diagnostics, at the cost of heat in the enclosure, harmonic distortion, output cable and motor stresses, and a device that needs a bypass or a spare if the station cannot wait for a replacement.',
    keyPoints: [
      'A drive is a speed control, a soft starter, a motor protector, and a diagnostic device in one package.',
      'The affinity laws mean modest speed reductions save real energy, but only where the system has friction head to save.',
      'A pump below its minimum useful speed runs without moving water. Set the drive minimum from the curve.',
      'Drives make heat, harmonics, and voltage spikes at the motor. Each has a mitigation, and each costs money.',
      'Decide on bypass before the panel is built. Retrofit bypass is expensive.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['VFD', 'Panels', 'Pumps', 'Power'],
    blocks: [
      { t: 'h2', text: 'What the drive does' },
      {
        t: 'p',
        text: 'A variable frequency drive rectifies the incoming three-phase supply to DC, filters it on a capacitor bus, and inverts it back to AC at whatever frequency and voltage the control asks for, using pulse-width modulation. Motor speed follows frequency, so the pump runs at the speed the process needs. Along the way the drive ramps the motor up and down, limits current, monitors motor thermal state, and reports current, voltage, power, torque, and faults over a network or through its terminals.',
      },
      {
        t: 'p',
        text: 'For a pump the speed control is the point. A level loop holds a wet well at a setpoint by varying pump speed instead of cycling; a pressure loop holds distribution pressure without a pressure-reducing valve; a flow loop feeds a process at the rate it needs. The other benefits, soft starting and reduced inrush, matter at stations on weak power or on a generator.',
      },
      { t: 'h2', text: 'When a drive earns its cost' },
      {
        t: 'table',
        head: ['Condition', 'Drive value', 'Note'],
        rows: [
          ['High friction head, variable flow', 'High: energy saved roughly with the cube of speed on the friction portion', 'Force mains and long distribution mains'],
          ['Mostly static head', 'Low for energy: the pump must make the same head at any flow', 'Lift into an elevated tank; a drive saves little and may reduce efficiency'],
          ['Process needs steady flow or pressure', 'High for control quality', 'Membrane feed, filter effluent, chemical dilution water, distribution pressure zones'],
          ['Weak utility or generator power', 'High: soft start and reduced inrush', 'Rural lift stations, wells at the end of a long line'],
          ['Starts-per-hour limit reached', 'High: continuous running at reduced speed instead of cycling', 'Small wet wells, low nighttime inflow'],
          ['Simple duty with a large cycle volume', 'Low', 'A constant-speed starter does the job for less money and less heat'],
        ],
      },
      { t: 'h2', text: 'Minimum speed' },
      {
        t: 'p',
        text: 'A centrifugal pump develops head roughly with the square of speed. Below some speed it cannot produce enough head to open the check valve against the static head of the system, and it spins in the well doing nothing while the level rises. The drive minimum speed is set above that point, found from the pump curve at the static head or by test, and it is often in the range of 50 to 70 percent for a wastewater pump on a force main. Setting the minimum to the drive default of zero, or to a number that felt reasonable, is one of the most common commissioning errors in pump stations.',
      },
      {
        t: 'p',
        text: 'Running near minimum speed for long periods has its own problems: low velocity in the force main lets solids settle, and the pump operates far from its best efficiency point. A level PID loop with a minimum speed, and stop-and-restart logic for when inflow drops below what minimum speed moves, is the usual answer.',
      },
      { t: 'h2', text: 'What the drive costs' },
      {
        t: 'dl',
        items: [
          { term: 'Heat', def: 'A drive dissipates roughly 2 to 4 percent of its rating as heat, all of it inside the enclosure. A 50 hp drive at full load makes on the order of a kilowatt. That heat sets the enclosure size and cooling, as described on the heat calculations page, and it is why drives in outdoor enclosures in the sun fail early.' },
          { term: 'Harmonics', def: 'The rectifier draws current in pulses, distorting the supply. A single small drive rarely matters; a station with most of its load on drives can exceed the distortion limits in IEEE 519 and heat the transformer. Line reactors, DC bus chokes, and for larger installations active front ends or harmonic filters address it.' },
          { term: 'Output voltage spikes', def: 'The PWM output has fast edges that reflect at the motor terminals, especially on long cable runs, producing peaks that stress motor insulation. Inverter-duty motors, output reactors or dV/dt filters, and cable length limits from the drive manufacturer are the mitigations. Submersible pumps on long cables are the sensitive case.' },
          { term: 'Bearing currents', def: 'The common-mode voltage of the PWM output can discharge through motor bearings and pit them. Insulated bearings, shaft grounding rings, and common-mode chokes address it on larger motors.' },
          { term: 'Instrument noise', def: 'Output cables radiate. Signal cables routed with them pick it up. Shielded output cable, separation, and proper grounding of the shield at the drive prevent most of it.' },
          { term: 'A single point of failure', def: 'A failed starter is replaced from stock in an hour. A failed drive may be a week away. Bypass or a spare is a design decision.' },
        ],
      },
      { t: 'h2', text: 'Bypass' },
      {
        t: 'p',
        text: 'A bypass contactor arrangement lets the pump run across the line at full speed when the drive has failed. It costs a contactor pair, an interlock so the drive output and the bypass contactor can never close together, and a selector switch. In a duplex station with two drives, many utilities skip bypass and rely on the second pump plus a spare drive on the shelf. In a station with one pump, bypass is cheap insurance. The decision is easy at design and expensive after the panel is built.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Never close the bypass onto a running drive output',
        text: 'The drive output and the utility supply must never be connected to the motor at the same time. The bypass scheme interlocks the contactors mechanically and electrically, and the drive run command is removed before the bypass contactor is allowed to close. This interlock is tested at commissioning with the motor disconnected.',
      },
      { t: 'h2', text: 'Integration with the panel' },
      {
        t: 'ul',
        items: [
          'Control: run command and speed reference by hardwired inputs or by network. Network control gives full diagnostics; hardwired control keeps running when the network does not. Many panels use network for monitoring and hardwired for the run and the reference, or the reverse with a hardwired fallback.',
          'Feedback: running status, fault, current, and speed back to the controller. A drive that reports a run status from its own logic is a better proof than an auxiliary contact.',
          'Protection: the drive provides overload, overcurrent, phase loss, and ground fault protection for the motor. Upstream, the drive itself needs short-circuit protection that matches its listing, and the SCCR of the panel depends on it.',
          'Enable and safe torque off: hardwired through the HOA and any safety devices, independent of the controller.',
          'Parameters: backed up, printed, and kept with the panel drawings. A replacement drive is configured from that backup, not from memory.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need an inverter-duty motor?',
        a: 'For a new installation with a drive, yes; the cost difference is small and the insulation system is designed for the voltage peaks. For an existing motor being put on a drive, check the cable length against the drive manufacturer limits and consider an output filter. Submersible pumps are supplied by the pump manufacturer for drive duty, and the manufacturer specifies the cable and filter requirements.',
      },
      {
        q: 'How much energy will a drive save?',
        a: 'It depends entirely on the system curve. Where most of the head is friction, running at 80 percent speed uses roughly half the power. Where most of the head is static, the pump must still make the same head and the saving is small or negative because the pump leaves its efficient range. Plot the system curve before promising a payback.',
      },
      {
        q: 'Should the PID loop be in the drive or the PLC?',
        a: 'Drives include a PID controller and it works for a standalone pump. In a station with a PLC, the loop belongs in the PLC, where its tuning, limits, failure handling, and alarming are visible on SCADA and consistent with the rest of the program.',
      },
      {
        q: 'Why does the pump run but the level keeps rising with the drive at minimum speed?',
        a: 'The minimum speed is below the point where the pump develops enough head to move water into the force main. Raise the minimum speed until flow begins, with margin, and set the level control to stop the pump when inflow is below what minimum speed delivers.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/heat-calculations',
      '/controls/control-panels/pump-panels/hoa',
      '/controls/control-panels/pump-panels/soft-starters',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/troubleshooting/vfd-troubleshooting/drive-will-not-start-in-auto',
      '/how-to/plc-how-to/create-a-pid-loop',
      '/controls/control-panels/panel-design/sccr',
    ],
  },
  {
    path: '/controls/control-panels/pump-panels/soft-starters',
    kind: 'reference',
    title: 'Soft Starters',
    summary:
      'Reduced-voltage solid-state starters: how they ramp a motor, what they do for inrush, water hammer, and mechanical stress, where they beat a drive and where they do not, bypass contactors, and the settings that matter on a pump.',
    answer:
      'A soft starter uses thyristors to ramp the voltage applied to a motor during starting, reducing the inrush current and the mechanical and hydraulic shock of an across-the-line start, then runs the motor at full speed, usually through a bypass contactor. It provides no speed control. It is the right choice where the pump runs at one speed and the concern is starting: weak power, generator operation, water hammer on a long force main, or a starts-per-hour limit that a gentler start relaxes.',
    keyPoints: [
      'A soft starter controls the start and the stop. It does not control speed.',
      'Starting current drops from about six times full load to two or three times, with a longer ramp.',
      'A controlled stop is often the bigger benefit on a pump: no check valve slam, no water hammer.',
      'Bypass contactors take the thyristors out of circuit at full speed, which removes the heat and most of the failure modes.',
      'Set current limit and ramp time for the pump, and confirm the motor reaches full speed within its thermal limits.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Panels', 'Pumps', 'Power', 'Control'],
    blocks: [
      { t: 'h2', text: 'What it does' },
      {
        t: 'p',
        text: 'An across-the-line starter applies full voltage instantly. The motor draws locked-rotor current, typically six to eight times its full-load rating, for the second or two it takes to accelerate, and the pump accelerates the water column with it. A soft starter puts back-to-back thyristors in each phase and phases them on progressively, so the voltage ramps from an initial value to full over a set time. Torque follows the square of voltage, so the motor accelerates gently and the current peak is reduced to whatever the current limit setting allows, commonly 250 to 350 percent of full-load current.',
      },
      {
        t: 'p',
        text: 'Once the motor is at speed, most soft starters close an internal or external bypass contactor and the thyristors carry no current until the next start. On a stop command, the starter can ramp the voltage down over a set time, a soft stop, which lets the pump decelerate gradually and the check valve close slowly instead of slamming shut on a reversing column.',
      },
      { t: 'h2', text: 'Where a soft starter fits' },
      {
        t: 'table',
        head: ['Situation', 'Across-the-line', 'Soft starter', 'Drive'],
        rows: [
          ['Pump runs at one speed, strong supply, short force main', 'Adequate', 'Optional', 'Unnecessary'],
          ['Weak supply, voltage sag on start, generator', 'Poor', 'Good', 'Good'],
          ['Long force main, check valve slam, water hammer on stop', 'Poor', 'Good, with soft stop', 'Good'],
          ['Starts per hour near the motor limit', 'Poor', 'Better: less heating per start', 'Best: run continuously instead'],
          ['Level, pressure, or flow control needed', 'No', 'No', 'Yes'],
          ['Energy saving on a friction-dominated system', 'No', 'No', 'Yes'],
          ['Panel space, heat, and cost', 'Smallest', 'Small with bypass', 'Largest'],
          ['Harmonics and motor stress', 'None', 'None in run; brief distortion during the ramp', 'Present; mitigated at cost'],
        ],
      },
      {
        t: 'p',
        text: 'The soft starter sits between the two extremes. It fixes the starting problems for a fraction of the cost, heat, and complexity of a drive. It does nothing for a process that needs speed control, and a station that installs soft starters to save energy has been sold the wrong device.',
      },
      { t: 'h2', text: 'Settings that matter on a pump' },
      {
        t: 'dl',
        items: [
          { term: 'Initial voltage or torque', def: 'The starting point of the ramp, typically 30 to 50 percent. Too low and the motor sits without turning while it heats; too high and the start is nearly across the line.' },
          { term: 'Ramp time', def: 'Time from initial voltage to full, typically 5 to 20 seconds on a pump. Longer is gentler and heats the motor longer; the ramp must end with the motor at speed.' },
          { term: 'Current limit', def: 'The ceiling on starting current, commonly 300 percent of full-load amps. The starter holds voltage at whatever keeps current under the limit until the motor accelerates. On a weak supply this is the setting that stops the lights dimming.' },
          { term: 'Kick start', def: 'A brief pulse of higher voltage at the beginning to break a pump free of grit or a stiff seal, then the ramp. Useful on pumps that sit; unnecessary otherwise.' },
          { term: 'Soft stop time', def: 'The voltage ramp-down on stop, typically 5 to 30 seconds. Long enough that the check valve closes gently; short enough that the pump does not run below the speed that moves water for long, which matters with a large static head where the pump stops moving water early in the ramp.' },
          { term: 'Stall and thermal protection', def: 'The starter monitors current and time during the ramp and trips if the motor does not accelerate, and models motor thermal state across starts. Set from the motor data, not left at defaults.' },
          { term: 'Phase loss and imbalance', def: 'Built into most starters; confirm they are enabled and set.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The thermal budget',
        text: 'A soft start reduces peak current but extends the time the motor draws above full-load current. The heating per start is usually lower than across the line but not always, and a very long ramp at a high current limit can exceed it. Check the motor thermal limit curve against the starting profile, especially on large motors and high-inertia loads.',
      },
      { t: 'h2', text: 'Bypass' },
      {
        t: 'p',
        text: 'Thyristors dissipate on the order of a watt per amp per phase while conducting. A 100 amp starter without bypass makes a few hundred watts continuously, needs a heatsink and enclosure cooling, and has three semiconductors in the motor circuit around the clock. With a bypass contactor closed at full speed, the thyristors carry current only during the ramp, the heat drops to almost nothing in run, and a thyristor failure does not take the pump down until the next start. Most modern soft starters include the bypass internally. Specify it, and confirm the bypass is rated for the motor full-load current and the contactor duty.',
      },
      { t: 'h2', text: 'Integration with the panel' },
      {
        t: 'ul',
        items: [
          'Control: a run input and a stop input, with a run and a fault output back to the controller. Many starters also offer a network interface for current and diagnostics.',
          'Protection: the starter provides motor overload, phase loss, and stall protection. Short-circuit protection upstream is chosen to match the starter listing and the panel SCCR; semiconductor fuses are required for some ratings.',
          'HOA: the same as any starter. The soft starter is the starter; the HOA and the controller call it.',
          'Run confirmation: from the starter run output or the bypass contactor auxiliary, plus current where available. A starter in the ramp is not yet at speed; use the at-speed or bypass-closed signal for the proof where the logic cares.',
          'Parameters recorded on the drawings and in the commissioning record, as with a drive.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a soft starter control pump speed at all?',
        a: 'No. It controls voltage during start and stop; at any steady state the motor runs at full speed, or stalls. A soft starter held at reduced voltage in run is a motor heater. Speed control requires a drive.',
      },
      {
        q: 'Does a soft starter reduce starting current enough to run on a generator?',
        a: 'Usually. A generator sized for an across-the-line start must handle six times full-load current; with a soft starter at a 300 percent limit, the generator can be much smaller, or the same generator can start a larger pump. Check the generator manufacturer sizing for the starting profile.',
      },
      {
        q: 'Is soft stop always a good idea on a pump?',
        a: 'It is a good idea where check valve slam or water hammer is a problem. On a station with a large static head, a long soft stop has the pump running at a speed where it moves no water while still heating, so the stop time is set short and the check valve is chosen for the application. On a very short force main it may not be needed at all.',
      },
      {
        q: 'What fails on a soft starter?',
        a: 'Thyristors, usually from heat or a short-circuit event, and the bypass contactor, from ordinary contactor wear. Keep the starter cool and the enclosure clean. A starter with an internal bypass and correct upstream protection lasts as long as a contactor.',
      },
    ],
    related: [
      '/controls/control-panels/pump-panels/vfd',
      '/controls/control-panels/pump-panels/hoa',
      '/controls/control-panels/panel-design/sccr',
      '/controls/control-panels/panel-design/heat-calculations',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/troubleshooting/pump-troubleshooting/pump-will-not-start',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/circuit-breakers',
    kind: 'reference',
    title: 'Circuit Breakers in Control Panels',
    summary:
      'Miniature, molded-case, and supplementary protectors: what each is listed to do, how a trip curve is read, where the NEC and UL 508A set the rules, and how breaker choice drives the short-circuit current rating of the whole panel.',
    answer:
      'A circuit breaker in a control panel is chosen by what it is listed to protect, not only by its ampere rating. Molded-case and miniature circuit breakers listed to UL 489 provide branch circuit protection; supplementary protectors listed to UL 1077 do not and may only be used downstream of branch protection. The trip curve sets how the breaker responds to overload and to fault current, and the interrupting rating, together with any series rating, sets the short-circuit current rating of the panel.',
    keyPoints: [
      'UL 489 breakers protect branch circuits. UL 1077 supplementary protectors do not, whatever they look like.',
      'The ampere rating handles overload. The interrupting rating handles a fault. Both must be right.',
      'Trip curves B, C, and D on miniature breakers differ only in the instantaneous trip point.',
      'The panel SCCR is set by the weakest device, and breakers are usually where it is won or lost.',
      'A breaker feeding a drive or a transformer needs a curve that rides through inrush.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Panels', 'UL 508A', 'NEC', 'Power'],
    blocks: [
      { t: 'h2', text: 'Three devices that look alike' },
      {
        t: 'table',
        head: ['Device', 'Listing', 'What it may protect', 'Typical use'],
        rows: [
          ['Molded-case circuit breaker (MCCB)', 'UL 489', 'Branch circuits, feeders, and service equipment; may be the panel main', 'Panel main disconnect, motor branch circuits above the miniature range, feeders to sub-panels'],
          ['Miniature circuit breaker (MCB), UL 489 type', 'UL 489', 'Branch circuits, within its rating', 'Control transformer primaries, small motor branches, receptacles and lighting in the panel'],
          ['Supplementary protector', 'UL 1077', 'Only equipment already protected by an upstream branch circuit device; provides supplementary protection within a piece of equipment', '24 V DC distribution, individual instrument and PLC circuits, small control loads, all downstream of a UL 489 device or a fuse'],
        ],
      },
      {
        t: 'p',
        text: 'The supplementary protector is the one that causes trouble. It is a DIN-rail device that looks exactly like a miniature breaker, is often cheaper, and is sometimes sold on the same catalog page. It is not listed to protect a branch circuit, and UL 508A does not permit it where branch circuit protection is required. Used where it belongs, downstream of proper protection to subdivide a control circuit, it is a good device. Used as the only protection on a transformer primary or a motor circuit, it is a listing violation and a hazard.',
      },
      { t: 'h2', text: 'Ratings' },
      {
        t: 'dl',
        items: [
          { term: 'Ampere rating', def: 'The continuous current the breaker carries without tripping. Chosen from the conductor ampacity and the load, with the NEC rules for motor circuits allowing a higher rating than the conductor ampacity so the motor branch rides through starting.' },
          { term: 'Voltage rating', def: 'The system voltage the breaker is listed for, including whether it is rated for the grounded or ungrounded system and for DC where used on DC.' },
          { term: 'Interrupting rating', def: 'The maximum fault current the breaker can interrupt safely at its rated voltage. Common miniature breakers are 10 kA; molded-case breakers range from 10 kA to 200 kA. A breaker applied above its interrupting rating can fail to open, or fail violently.' },
          { term: 'Frame and trip unit', def: 'On molded-case breakers, the frame sets the physical size and maximum rating; the trip unit sets the actual rating and, on electronic trip units, the adjustable settings.' },
          { term: 'Poles', def: 'One, two, or three, with common trip matching the circuit. A three-phase motor circuit requires common trip on all three poles.' },
        ],
      },
      { t: 'h2', text: 'Trip curves' },
      {
        t: 'p',
        text: 'A breaker has two trip mechanisms. The thermal element responds to sustained overload with an inverse time characteristic: a small overload takes minutes, a large one takes seconds. The magnetic or instantaneous element responds to fault current with no intentional delay. The trip curve plots both against current, and for miniature breakers the curve letter names the instantaneous trip range.',
      },
      {
        t: 'table',
        head: ['Curve', 'Instantaneous trip', 'Use'],
        rows: [
          ['B', '3 to 5 times rated current', 'Resistive loads, long circuits where fault current is low, lighting and receptacles'],
          ['C', '5 to 10 times rated current', 'General purpose; control transformers with modest inrush, small motors, most control circuits'],
          ['D', '10 to 20 times rated current', 'High inrush: transformers, drives with large DC bus capacitors, motors with high starting current'],
        ],
      },
      {
        t: 'p',
        text: 'A C-curve breaker on a control transformer primary that trips at every power-up is not defective; the transformer inrush is above its instantaneous trip point, and a D-curve breaker or a time-delay fuse is the answer. The reverse error, a D-curve breaker on a long circuit with low available fault current, may never see enough current to trip instantaneously and clears a fault on the slow thermal element instead.',
      },
      { t: 'h2', text: 'Breakers and the panel SCCR' },
      {
        t: 'p',
        text: 'The short-circuit current rating of an industrial control panel under UL 508A Supplement SB is limited by the lowest-rated device in the power circuit, and the interrupting rating of a breaker is one of those numbers. A panel built with 10 kA miniature breakers has a 10 kA SCCR at best, whatever else is in it. Raising it means breakers with a higher interrupting rating, or a tested series combination in which an upstream breaker or fuse lets a downstream device be applied above its own rating, or current-limiting fuses ahead of the low-rated devices. The combinations must be published by the manufacturer; a series rating is never assumed. The SCCR page walks through the method.',
      },
      { t: 'h2', text: 'Selection notes' },
      {
        t: 'ul',
        items: [
          'Drives: the drive manufacturer publishes the required upstream protection and the SCCR that results. Use the listed combination. Many drives require specific breakers or semiconductor fuses to achieve their published rating.',
          'Control transformers: primary protection per NEC 450.3 and the transformer inrush; a D-curve breaker or a time-delay fuse. Secondary protection sized for the secondary conductor.',
          'DC distribution: a 24 V DC circuit is protected by a device rated for DC. Many miniature breakers are rated for DC at reduced voltage; supplementary protectors are the common choice downstream of the power supply, and electronic circuit protectors that trip faster than a switch-mode supply current-limits are the better one.',
          'Coordination: a fault on one branch should trip that branch, not the main. Selective coordination is a curve overlay exercise, and on small panels it is usually achieved by a large enough ratio between the main and the branches.',
          'Auxiliary contacts: a breaker feeding a critical circuit should report its state to the controller. Alarming a tripped breaker is cheaper than finding it at a site visit.',
          'Lockout: the main breaker in a panel is the disconnect that is locked out for service. It needs a lockable handle, and the panel needs to be arranged so it is the only source, or every source is identified.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Interrupting rating is not a place to save money',
        text: 'A breaker that is asked to interrupt more current than its rating may not open at all, and the arc can destroy the breaker and the panel and injure the person standing in front of it. Determine the available fault current at the panel, mark the SCCR on the panel, and never install a breaker whose interrupting rating is below the available fault current without a listed series combination that covers it.',
      },
    ],
    faqs: [
      {
        q: 'Can I use a supplementary protector on a transformer primary?',
        a: 'Not as the branch circuit protection. A UL 1077 device can be used to subdivide a circuit that already has branch protection upstream, so a supplementary protector on a transformer primary is acceptable only if a UL 489 breaker or a fuse ahead of it provides the protection the code requires, and the supplementary device is then redundant.',
      },
      {
        q: 'Why does the breaker on my drive trip at power-up?',
        a: 'The drive charges its DC bus capacitors at power-up and the inrush exceeds the breaker instantaneous trip. Most drives have a precharge circuit that limits it; if the breaker still trips, it is the wrong curve, the wrong rating, or not the device the drive manufacturer specified.',
      },
      {
        q: 'Fuse or breaker?',
        a: 'Fuses interrupt higher fault currents, limit current more effectively, and are less expensive for a high SCCR. Breakers are resettable, report their state, and are easier to operate. Many panels use both: current-limiting fuses at the main for the SCCR, breakers on the branches for operation.',
      },
      {
        q: 'How do I find the available fault current at my panel?',
        a: 'From the utility at the service, then calculated through the transformers and conductors to the panel. The utility provides the value at the service; a short-circuit calculation, done by the engineer or with the transformer impedance and conductor data, gives the value at the panel. The NEC requires the value to be marked on service equipment and the SCCR on industrial control panels.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/sccr',
      '/controls/control-panels/panel-design/ul-508a',
      '/controls/control-panels/panel-components/fuses',
      '/controls/control-panels/pump-panels/vfd',
      '/how-to/panel-how-to/size-a-power-supply',
      '/controls/control-panels/panel-design/component-layout',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/fuses',
    kind: 'reference',
    title: 'Fuses in Control Panels',
    summary:
      'Fuse classes, time-delay and fast-acting types, current limitation and what it does for the panel short-circuit rating, semiconductor fuses for drives, control circuit and DC fusing, and the habits that make a blown fuse a diagnosis instead of a mystery.',
    answer:
      'A fuse is a one-time overcurrent device whose class defines its physical form, voltage and interrupting rating, and current-limiting performance. Class J, CC, and RK current-limiting fuses interrupt up to 200 kA and limit the let-through current, which is how a control panel achieves a high short-circuit current rating with ordinary components downstream. Time-delay types ride through motor and transformer inrush; fast-acting and semiconductor types protect drives and electronics. A fuse is sized to the conductor and load, replaced only with the same class and rating, and its blowing is recorded as a symptom.',
    keyPoints: [
      'The class sets the form, the interrupting rating, and the let-through. Rejection features stop the wrong class fitting.',
      'Current-limiting fuses are the least expensive route to a high panel SCCR.',
      'Time-delay for motors and transformers; fast-acting for electronics; semiconductor for drives.',
      'Fuse the ungrounded conductor, and fuse DC with a DC-rated fuse.',
      'A fuse that blew had a reason. Replace it once; if it blows again, find the reason.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Panels', 'UL 508A', 'NEC', 'Power'],
    blocks: [
      { t: 'h2', text: 'Why fuses are still everywhere' },
      {
        t: 'p',
        text: 'A fuse is a calibrated link that melts on overcurrent. It has no mechanism, no springs, and no contacts to wear, which makes it the most reliable overcurrent device available, and the current-limiting types clear a fault so fast that the peak current is cut off before it reaches its prospective value. That last property, current limitation, is why fuses dominate at the top of a control panel: they protect everything downstream from a fault current the downstream devices could never interrupt on their own.',
      },
      {
        t: 'p',
        text: 'The price is that a fuse is used once. It cannot be reset, it does not report its state unless a blown-fuse indicator or a monitoring relay is added, and a technician without the right replacement in the truck leaves the station down. Those trade-offs decide where fuses go and where breakers go.',
      },
      { t: 'h2', text: 'Classes' },
      {
        t: 'table',
        head: ['Class', 'Voltage and interrupting rating', 'Character', 'Where it is used'],
        rows: [
          ['Class J', '600 V AC; 200 kA', 'Current-limiting; time-delay and fast-acting versions; rejection dimensions', 'Panel mains and motor branch circuits where a high SCCR is needed; feeders to drives'],
          ['Class CC', '600 V AC; 200 kA', 'Current-limiting; small, 13/32 by 1-1/2 in, with a rejection pin; time-delay and fast-acting', 'Control transformers, small motors, and control circuits up to 30 A; the workhorse of UL 508A panels'],
          ['Class RK1 and RK5', '250 and 600 V AC; 200 kA', 'Current-limiting with a rejection slot; RK1 limits more than RK5; RK5 is the common time-delay motor fuse', 'Disconnect switches, motor circuits, older panels; fits Class H holders unless rejection clips are used'],
          ['Class H and K', '250 and 600 V AC; 10 kA (H), up to 200 kA (K)', 'Not current-limiting (H); K is limiting but has no rejection feature', 'Legacy; H fuses hold a panel SCCR at 10 kA'],
          ['Class T', '300 and 600 V AC; 200 kA', 'Very fast, very compact, current-limiting', 'Where space is tight and current limitation matters'],
          ['Class L', '600 V AC; 200 kA; 601 A and up', 'Bolt-in, large', 'Large feeders and services'],
          ['Semiconductor (high speed)', 'Per manufacturer; very fast', 'Extremely low let-through energy', 'Drives and soft starters where the manufacturer requires them for the listed SCCR'],
          ['Midget and glass (supplementary)', 'Low', 'No branch circuit listing', 'Instrument and electronics protection downstream of branch protection only'],
        ],
      },
      {
        t: 'p',
        text: 'Rejection features matter. A Class J fuse will not fit an H holder and an H fuse will not fit a J holder, so a panel built with Class J holders cannot be downgraded by a replacement from the wrong bin. Class R holders with rejection clips accept only R fuses; the same holders without clips accept Class H, and a 10 kA fuse in a 200 kA position takes the panel SCCR down with it.',
      },
      { t: 'h2', text: 'Time-delay and fast-acting' },
      {
        t: 'p',
        text: 'A time-delay fuse carries a defined overload for a defined time, typically 500 percent for ten seconds, without opening. That rides through motor starting and transformer inrush while still clearing a fault quickly, and it is the type on nearly every motor and transformer circuit. A fast-acting fuse opens on a small overload in a fraction of a second and is used where the load has no inrush and the downstream device is sensitive: electronics, some rectifiers, and instrument circuits. A semiconductor fuse is faster still and is chosen by the let-through energy against what the drive or thyristor can survive.',
      },
      {
        t: 'table',
        head: ['Load', 'Fuse type', 'Sizing basis'],
        rows: [
          ['Motor branch circuit', 'Time-delay (Class J, CC, or RK5)', 'NEC 430.52: up to 175 percent of motor full-load current for time-delay fuses, with the next size up allowed if needed for starting'],
          ['Control transformer primary', 'Time-delay (Class CC common)', 'NEC 450.3 and the transformer inrush; commonly 125 to 300 percent of primary current depending on size'],
          ['Drive input', 'Class J, CC, or semiconductor as the drive manufacturer lists', 'The listed combination, for the published SCCR'],
          ['Control circuit', 'Class CC or a supplementary fuse', 'Conductor ampacity per UL 508A, and the smallest wire in the circuit'],
          ['24 V DC branches', 'DC-rated fuse or electronic protector', 'Load plus the wire, and the ability of the supply to clear it'],
          ['Instrument loops', 'Small fast-acting', 'A fraction of an amp; protects the wiring more than the device'],
        ],
      },
      { t: 'h2', text: 'Current limitation and the panel SCCR' },
      {
        t: 'p',
        text: 'A current-limiting fuse clears a large fault within the first quarter cycle, before the current reaches its peak, and the manufacturer publishes the peak let-through current for each fuse at each prospective fault level. UL 508A Supplement SB allows the SCCR of the power circuit downstream of a current-limiting fuse to be raised in defined cases, and allows tested series combinations of fuses with breakers, contactors, and overload relays to be applied at the fuse rating. In practice, a set of Class J fuses at the main is the least expensive way to get a control panel from a 5 or 10 kA rating to 65 or 100 kA, and it is the reason so many panels have fuses ahead of breakers.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Use the published combination',
        text: 'A series or let-through rating exists only where the manufacturer of the downstream device has tested and published it with that fuse class and size. The panel builder documents the combination in the SCCR calculation. Substituting a different class or a larger fuse breaks the rating, even if the fuse is physically interchangeable.',
      },
      { t: 'h2', text: 'Control and DC circuits' },
      {
        t: 'ul',
        items: [
          'Fuse the ungrounded conductor only. A fuse in the grounded conductor of a control circuit can open and leave the circuit energized through ground.',
          'The fuse protects the wire. A 1 A control circuit on 16 AWG wire can have a 10 A fuse under UL 508A; the wire, not the load, sets the maximum.',
          'DC fuses are rated for DC. An AC fuse on a 125 V DC circuit may not extinguish the arc. At 24 V DC most fuses are fine, but check the DC rating on anything above 60 V.',
          'A switch-mode power supply current-limits rather than delivering a large fault current, so a fuse downstream may never see enough current to open quickly. Electronic protectors that trip on a small overcurrent in milliseconds, or a supply with adequate peak current capability, are the answer on 24 V DC distribution.',
          'Blown-fuse indicators and fuse-monitoring relays on critical circuits bring the state to the controller. A blown control fuse at a remote station that reports itself is a phone call instead of an overflow.',
        ],
      },
      { t: 'h2', text: 'When a fuse blows' },
      {
        t: 'p',
        text: 'A fuse opens because the current through it exceeded its rating for longer than its curve allows. That is a fact about the circuit, not about the fuse. Replace it once, with the same class, rating, and type. If it opens again, the circuit has a fault, an overload, or a load with more inrush than the fuse was chosen for, and the fix is finding which, not a bigger fuse. Keep spares of every fuse in the panel, in the panel, with the fuse schedule on the drawing so the next person knows what goes where.',
      },
    ],
    faqs: [
      {
        q: 'Can I replace a Class J fuse with a Class RK5 of the same amperage?',
        a: 'They do not physically interchange, which is by design. Even where two classes fit the same holder, such as Class H in an unclipped Class R holder, the interrupting rating and let-through differ, and the panel SCCR calculation was done with the class on the drawing. Replace with the class specified.',
      },
      {
        q: 'Why does my panel have fuses and breakers both?',
        a: 'The fuses at the main provide the interrupting rating and the current limitation that give the panel its SCCR. The breakers on the branches give resettable, reportable protection for daily operation. It is a common and sensible arrangement.',
      },
      {
        q: 'Is a fuse holder with a blown-fuse light worth it?',
        a: 'On any circuit whose loss matters and is not otherwise alarmed, yes. The light shows the technician which fuse opened without pulling each one, and a version with a contact tells the controller. On a 24 V DC distribution block feeding a dozen loops, indicated fuses save an hour per event.',
      },
      {
        q: 'How do I size the fuse for a control transformer?',
        a: 'From the transformer nameplate primary current and the NEC 450.3 table, using a time-delay fuse to ride through the inrush, which can be 20 to 30 times rated current for the first half cycle on a small transformer. Most transformer manufacturers publish a fuse recommendation by kVA and voltage; use it, and use Class CC in a UL 508A panel.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/circuit-breakers',
      '/controls/control-panels/panel-design/sccr',
      '/controls/control-panels/panel-design/ul-508a',
      '/how-to/panel-how-to/size-a-power-supply',
      '/controls/plc-systems/plc-fundamentals/power-supplies',
      '/controls/control-panels/pump-panels/vfd',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/panel-power-supplies',
    kind: 'reference',
    title: 'Panel Power Supplies',
    summary:
      'The 24 V DC supply behind everything in a modern panel: sizing with real inrush and duty, single versus redundant with diode modules, how a switch-mode supply behaves under a short, distribution and fusing per branch, monitoring, and the failure modes that take out a whole panel at once.',
    answer:
      'A panel power supply converts the control voltage, usually 120 V AC, to 24 V DC for the controller, the I/O, the instruments, the relays, and the network devices. It is sized for the continuous load with margin and for the inrush of the devices it starts, distributed through fused branches so one fault does not drop everything, monitored so a failure is an alarm rather than a mystery, and made redundant with a diode module where the panel cannot be allowed to go dark. Because a switch-mode supply limits current rather than delivering a fault current, the fuses downstream are chosen to clear on what it can deliver.',
    keyPoints: [
      'Size for the continuous load plus 25 to 30 percent, and check the inrush of the largest devices against the supply peak rating.',
      'One supply feeds everything in most panels. That is a single point of failure; decide deliberately whether to accept it.',
      'Distribute through fused branches: controller, I/O, instruments, network, relays. A shorted float does not take the PLC down.',
      'A switch-mode supply current-limits on a short. Downstream protection must clear on that limited current.',
      'Monitor the DC OK contact and the output voltage. A supply dies slowly before it dies completely.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Panels', 'Power', 'PLC', 'Design'],
    blocks: [
      { t: 'h2', text: 'What the supply feeds' },
      {
        t: 'p',
        text: 'Almost everything in a modern control panel runs on 24 V DC: the controller and its I/O modules, the transmitters on loop power, the relays that interface to the starters, the network switches and radios, the HMI panel, and the indicator lights. The supply that produces that 24 V is therefore the one component whose failure stops all of them at once. It is a small box on a DIN rail that gets less attention than it deserves, and the panels that fail worst are the ones where it was chosen by catalog number without a load calculation.',
      },
      { t: 'h2', text: 'Sizing' },
      {
        t: 'steps',
        items: [
          { title: 'Add up the continuous load', text: 'Every device on the supply, from its data sheet, at its worst case: the controller with all modules, every loop-powered transmitter at 22 mA, every relay coil energized, every network device, the HMI at full backlight. The size-a-power-supply page walks through the arithmetic.' },
          { title: 'Add margin', text: '25 to 30 percent over the continuous load, for the devices that will be added and for the derating below.' },
          { title: 'Check inrush and peak', text: 'Some devices draw several times their running current at power-up: drives with 24 V control boards, some HMIs, solenoids, and capacitive loads. The supply must either carry the peak briefly or the devices must be staged. Supplies publish a peak current and a duration; compare them.' },
          { title: 'Derate for temperature', text: 'Supplies are rated at 40 or 50 °C and derate above. A panel that reaches 55 °C in summer needs a supply rated for more than the load at that temperature.' },
          { title: 'Choose the input', text: 'Single-phase 120 or 230 V AC, or 480 V for the three-phase supplies used in drive panels; a wide-range input tolerates the sags and swells a remote site sees.' },
          { title: 'Choose the protection and monitoring', text: 'A DC OK relay contact, an output voltage the controller can read, and a supply that is listed for the panel standard: UL 508 or UL 61010 as a power supply, with the SELV or class 2 output where the wiring method depends on it.' },
        ],
      },
      { t: 'h2', text: 'One supply or two' },
      {
        t: 'table',
        head: ['Arrangement', 'What it gives', 'What it costs', 'Where it fits'],
        rows: [
          ['Single supply', 'Simplicity; one device to fuse and monitor', 'A single point of failure for the panel', 'Lift stations and small panels with a float backup, where the process survives the panel going dark'],
          ['Two supplies with a redundancy module', 'Either supply carries the load; the diode module isolates a failed one; the DC OK contacts alarm which one', 'Two supplies, a module, and each supply sized for the whole load', 'Plant control panels, SCADA and network panels, anything where a dark panel stops the process'],
          ['Two supplies, split loads', 'The controller and the network on one, the instruments and relays on the other', 'Two supplies without a module; a failure still drops half the panel', 'A compromise; usually worse than true redundancy for the same money'],
          ['Supply plus a DC UPS or a battery module', 'The 24 V bus rides through an AC outage for minutes to hours', 'A battery to maintain', 'Remote sites where the controller and the radio must report the outage; SCADA panels'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Redundancy needs the module',
        text: 'Two supplies wired in parallel without a redundancy module share the load unevenly, and a supply that fails shorted pulls the other down with it. The module puts a diode, or an active equivalent, in series with each, so the bus is fed by whichever is alive. Each supply is sized for the full load, and each has its own AC feed and fuse, or the redundancy is only in the box.',
      },
      { t: 'h2', text: 'Distribution and fusing' },
      {
        t: 'p',
        text: 'A 24 V bus that feeds thirty devices from one terminal block, unfused, is a bus on which a shorted float cable in the wet well takes the controller, the radio, and every instrument down together. The supply output is distributed through branches, each fused or protected for its load and its wire, so that a fault is confined to the branch that has it and the rest of the panel keeps running.',
      },
      {
        t: 'ul',
        items: [
          'A branch for the controller and its I/O, so that nothing in the field can drop the processor.',
          'A branch for instrument loop power, often further split per loop or per group with indicated fuse blocks, so that a shorted transmitter drops one loop.',
          'A branch for relays and solenoids, which are the loads most likely to fail shorted.',
          'A branch for network devices and radios.',
          'A branch for the HMI.',
          'Protection sized for the branch wire and load, on the ungrounded conductor, with a blown-fuse indication or a status contact where the branch matters.',
        ],
      },
      { t: 'h2', text: 'How a switch-mode supply fails and clears' },
      {
        t: 'p',
        text: 'A transformer-rectifier supply delivers a large fault current into a short; a switch-mode supply does not. It limits its output current to a little above its rating, or it folds back, or it hiccups on and off, depending on the design. A 10 A supply feeding a short through a 10 A fuse may never blow the fuse: it delivers 11 A, the fuse holds, the bus voltage collapses, and every device on the bus resets. The branch protection has to clear on the current the supply can actually deliver. That means fuses well below the supply rating on each branch, so that the supply can deliver several times the branch fuse rating, or electronic circuit protectors that trip on a small overcurrent in milliseconds, or a supply with a defined peak current capability the fuses are chosen against. The supply data sheet gives the overload behavior; the branch fusing is designed from it.',
      },
      { t: 'h2', text: 'Monitoring' },
      {
        t: 'dl',
        items: [
          { term: 'DC OK contact', def: 'A relay contact in the supply that opens when the output is below tolerance, wired to a controller input and alarmed. On a redundant pair, one per supply, so the failed one is named.' },
          { term: 'Output voltage', def: 'The bus voltage on an analog input, trended. A supply that is aging reads low under load before it fails; a bus that sags when the relays pull in is undersized.' },
          { term: 'AC input status', def: 'A relay or a voltage monitor on the control power, so that a lost AC feed is distinguished from a failed supply.' },
          { term: 'Temperature', def: 'Panel temperature, because the supply is the component most affected by it.' },
          { term: 'Load current', def: 'Where the supply provides it or a shunt is fitted; the trend shows the load growing as devices are added.' },
        ],
      },
      { t: 'h2', text: 'Installation' },
      {
        t: 'ul',
        items: [
          'Mounted with the clearance the manufacturer requires for convection, vertically, away from the heat of drives and transformers, and not at the top of the enclosure where the hot air collects.',
          'Input from a fused or breaker-protected control circuit, on the ungrounded conductor.',
          'Output negative bonded to the panel ground at one point, where the design calls for a grounded DC system, and nowhere else.',
          'Output wiring sized for the current and the voltage drop; a long run to a remote rack at 24 V loses volts.',
          'A label with the output voltage and the branch schedule; a spare supply of the same model on the shelf.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does the whole panel reset when one solenoid shorts?',
        a: 'The bus is unfused or the fuse cannot clear on the current a switch-mode supply delivers. Distribute the output through branches with protection sized to trip on the limited current, and put the solenoids on their own branch.',
      },
      {
        q: 'Can I use one supply for the controller and the instruments?',
        a: 'Yes, and most panels do, through separate fused branches. Where the instruments are in a hazardous area through barriers, or where the instrument loops are especially noisy, a separate supply for the instruments is reasonable. What matters is that a fault on an instrument branch does not reach the controller.',
      },
      {
        q: 'How much margin is enough?',
        a: '25 to 30 percent over the calculated continuous load, after derating for the panel temperature. More if the panel is likely to grow. A supply running at 95 percent of its rating on a hot day has a short life and no room for the next float.',
      },
      {
        q: 'Should the 24 V negative be grounded?',
        a: 'Common practice is to bond the negative to the panel ground at one point, which gives a referenced system that is easier to troubleshoot and that lets ground faults be detected as shorts. Some designs float it deliberately for noise or for ground-fault tolerance, and then a ground fault detector is added. Either way, it is one decision, documented, applied at one point.',
      },
    ],
    related: [
      '/how-to/panel-how-to/size-a-power-supply',
      '/controls/plc-systems/plc-fundamentals/power-supplies',
      '/controls/control-panels/panel-components/fuses',
      '/controls/control-panels/panel-design/heat-calculations',
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/panel-components/circuit-breakers',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/control-relays',
    kind: 'reference',
    title: 'Control Relays',
    summary:
      'The interposing and logic relays in a control panel: why a controller output drives a relay instead of a starter coil, contact ratings and the difference between resistive and inductive loads, coil suppression, ice cube relays versus terminal relays versus solid-state, and the failure modes that make a relay the first suspect in a dead circuit.',
    answer:
      'Control relays in a panel interpose between the controller and the loads it commands, so that a small controller output drives a contact rated for the starter coil, the solenoid, or the 120 V circuit, and so that a fault on the load side stops at the relay instead of the output module. They are chosen by coil voltage, contact rating for the actual load type, and form factor, fitted with coil suppression to protect the output that drives them, and mounted on sockets that can be labeled and replaced. Their contacts wear and their coils fail, which is why they are on sockets and why the schematic gives each one a tag.',
    keyPoints: [
      'A controller output drives a relay coil; the relay contact drives the load. The output module is protected and the load can be any voltage.',
      'Rate the contact for the load type. An inductive load at 120 V AC needs far more than the resistive rating suggests.',
      'Suppress the coil: a diode on DC coils, an RC or varistor on AC coils. The output that drives it lives longer.',
      'Sockets with retention clips, labels on the socket and the relay, and a spare of every type in the panel.',
      'A relay is the first suspect when a circuit is dead. Test the coil and each contact before anything else.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Control', 'Design'],
    blocks: [
      { t: 'h2', text: 'Why interpose' },
      {
        t: 'p',
        text: 'A controller output module switches a small current at a fixed voltage: a few hundred milliamps at 24 V DC on a transistor output, or an amp or two on a relay output. A starter coil at 120 V AC draws an inrush of an amp or more and is inductive; a solenoid valve is worse; a pilot light circuit may be on a different voltage entirely. Driving those loads directly from the output module either exceeds its rating or exposes it to the transients the load produces. An interposing relay solves both: the module drives the relay coil, a small, clean, resistive-looking load with suppression; the relay contact drives whatever the load is, at whatever voltage, with a rating chosen for it. When the load side fails, shorts, or takes a surge, the relay is what is damaged, and a relay is a five-dollar plug-in part.',
      },
      {
        t: 'p',
        text: 'Relays also do logic that belongs outside the controller: the float backup path that must work when the controller is dead, the safety circuit that must not depend on software, the alternation in a station that has no controller. Those relays are on the schematic as logic, and the rules for them are the same.',
      },
      { t: 'h2', text: 'Types' },
      {
        t: 'table',
        head: ['Type', 'Description', 'Where it fits', 'Note'],
        rows: [
          ['General purpose plug-in (ice cube)', 'A cube relay in a socket, with two to four changeover contacts rated around 10 A resistive, coils in every common voltage', 'Interposing to starters and solenoids; panel logic', 'The workhorse; inexpensive, visible, replaceable in seconds'],
          ['Terminal block relay (slim)', 'A single-contact relay in a 6 mm terminal block footprint, often with an LED and a suppression diode built in', 'Interposing for many controller outputs in a dense panel', 'Saves space; contact ratings lower, typically 6 A resistive; the whole block is replaced'],
          ['Solid-state relay', 'A semiconductor switch with no moving contacts, optically isolated', 'High cycle counts, fast switching, no contact wear', 'Leaks a small current when off, so a light load may not turn off fully; needs a heat sink at higher currents; fails shorted'],
          ['Power relay or contactor', 'Larger contacts rated for motor and heater loads', 'Loads beyond the ice cube rating', 'Enters the power circuit and the SCCR calculation'],
          ['Safety relay', 'A force-guided contact relay or a safety module with monitored contacts', 'Emergency stop and safety circuits', 'Chosen by the safety function; not a general purpose relay with a different label'],
          ['Timing and specialty relays', 'On-delay, off-delay, alternating, latching, phase monitor', 'Functions kept outside the controller', 'Each has a configuration that is documented on the schematic'],
        ],
      },
      { t: 'h2', text: 'Contact ratings' },
      {
        t: 'p',
        text: 'A relay contact is rated for a current at a voltage for a load type, and the load type changes everything. A 10 A resistive rating on a general purpose relay may correspond to 3 or 4 A for an inductive AC load, less for a motor, and much less for a DC inductive load, which arcs on break because the current does not cross zero. The data sheet gives the ratings by category; the load is matched to the right one. A relay that is switching a starter coil with a 10 A resistive contact is fine; one switching a 2 A DC solenoid with the same contact is near its limit and will pit.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Resistive', def: 'Heaters, incandescent lamps after their inrush; the rating printed largest on the relay.' },
          { term: 'Inductive AC', def: 'Starter and contactor coils, AC solenoids; the current is lower and the break is manageable because the current crosses zero.' },
          { term: 'Inductive DC', def: 'DC solenoids and coils; the arc on break is the hardest duty a contact sees; suppression at the load and a derated contact.' },
          { term: 'Lamp and capacitive', def: 'LED drivers, power supplies, long cable runs; a high inrush at make that welds a light contact.' },
          { term: 'Low level', def: 'Signals into a controller input, milliamps at 24 V; needs a contact that stays clean, often gold-flashed, because a power contact that never carries enough current to clean itself oxidizes and goes open.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Suppress every coil',
        text: 'A relay coil stores energy in its magnetic field, and when the output that drives it opens, that energy appears as a voltage spike across the output. On a DC coil, a diode across the coil, cathode to positive, absorbs it; on an AC coil, an RC snubber or a varistor. Terminal block relays include it; ice cube sockets are available with it; where neither, it is added at the coil terminals. A transistor output driving unsuppressed coils fails early, and the failure looks like a bad output module.',
      },
      { t: 'h2', text: 'Installation' },
      {
        t: 'ul',
        items: [
          'Sockets on the DIN rail with retention clips, so vibration and a technician pulling a neighbor do not unseat the relay.',
          'A tag on the socket and on the relay, matching the schematic, so a replaced relay goes back in the right socket.',
          'Coils and contacts on the schematic with cross-references, and the coil voltage on the drawing.',
          'Relays grouped by function and by voltage, with the 120 V side segregated from the 24 V side per the panel wiring practice.',
          'LED indicators on the relays or the sockets, so the state is visible with the door open.',
          'A spare of each relay type in a labeled bag in the panel pocket.',
        ],
      },
      { t: 'h2', text: 'Failure and diagnosis' },
      {
        t: 'p',
        text: 'Relays fail in a few ways: a contact welds closed from an inrush or a short, a contact burns open from arcing, a coil opens from age or overvoltage, a coil shorts from moisture, and a socket contact loosens. Each has a signature. A welded contact is a load that will not turn off when the coil is de-energized. A burned contact is a load that will not turn on with the coil pulled in: the LED is lit, the armature has moved, and the contact resistance is open. An open coil is a relay that never pulls in with voltage at the coil terminals. The diagnosis is a meter at the coil terminals with the output commanded, then across each contact pair with the relay in each state, and it takes a minute. A relay that has failed once in a socket that has failed several times is telling you about the load or the socket, not the relay.',
      },
    ],
    faqs: [
      {
        q: 'Can I drive a starter coil directly from a relay output module?',
        a: 'Some relay output modules are rated for it, at 120 V AC and a couple of amps, and panels are built that way. The cost is that a shorted coil or a surge on the coil circuit damages the module, which is far more expensive and slower to replace than an interposing relay. Most panel standards interpose everything that leaves the panel or exceeds a small load.',
      },
      {
        q: 'Why did my controller output fail after a year?',
        a: 'An unsuppressed relay coil is the usual reason: the inductive kick each time the output opens degrades the transistor until it fails. Add suppression at every coil, and replace the module. The second reason is a load beyond the output rating, which the same fix addresses by interposing.',
      },
      {
        q: 'Solid-state or mechanical for a load that cycles constantly?',
        a: 'Solid-state, because a mechanical relay has a contact life of hundreds of thousands to a few million operations and a load that cycles every few seconds reaches that in months. Check the leakage current against the load: a small pilot light or a controller input can stay on from the leakage of a solid-state relay, and a bleed resistor or a mechanical relay is needed there.',
      },
      {
        q: 'Should relay logic still be used with a PLC in the panel?',
        a: 'For the functions that must work when the PLC does not: the float backup, the safety circuit, the hardwired high-level call. Those stay in relays by design. Everything else belongs in the program, where it is visible, documented, and changeable without rewiring.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/component-layout',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
      '/engineering-library/drawings/schematics',
      '/controls/control-panels/pump-panels/hoa',
      '/controls/plc-systems/plc-fundamentals/io-systems',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/terminal-blocks',
    kind: 'reference',
    title: 'Terminal Blocks',
    summary:
      'The point where field wiring meets the panel: screw, spring, and push-in terminals, ratings and the UL 1059 groups, fused and disconnect terminals for instrument loops, grounding terminals, multi-level blocks, jumpers and marking, and the layout that makes a loop check or a field change a five-minute job.',
    answer:
      'Terminal blocks are the listed connection points where every field conductor lands in a panel, arranged in strips by function and numbered from the drawings so that a wire can be found, tested, and disconnected without disturbing its neighbors. The clamping technology decides how a wire is landed and how it holds up to vibration; the rating decides the wire size and current; the block type provides fusing, a disconnect knife, or a test point where the circuit needs one; and the marking and the jumpering are what make the strip readable at loop check and ten years later.',
    keyPoints: [
      'Every field wire lands on a terminal. No field wire goes directly to a device.',
      'Strips by function and voltage, numbered per the panel standard, matching the schematic and the I/O list.',
      'Spring and push-in terminals hold better under vibration than screw terminals and need no retorque.',
      'Fused, disconnect, and test-point terminals on instrument loops make loop checks non-intrusive.',
      'Twenty percent spare terminals per strip, wired to nothing, labeled spare.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Design', 'UL 508A'],
    blocks: [
      { t: 'h2', text: 'The job' },
      {
        t: 'p',
        text: 'A field cable arrives at a panel carrying signals that were designed at a desk and wired by a different crew. The terminal strip is where those two worlds meet: the field side lands on the outer terminal, the panel side is wired to the inner, and the number on the block ties both to the drawing. Everything about terminal block practice serves that meeting: the technician at the panel must be able to find a signal by its number, measure it without lifting anything, disconnect the field from the panel for a test, and reconnect it, in the same place, without a wire falling into the tray.',
      },
      { t: 'h2', text: 'Clamping technologies' },
      {
        t: 'table',
        head: ['Type', 'How it holds', 'Strengths', 'Cautions'],
        rows: [
          ['Screw clamp', 'A screw drives a clamp onto the conductor or a ferrule', 'Familiar; accepts a range of sizes; visible connection', 'Needs the right torque; loosens under vibration and thermal cycling; retorque on a schedule'],
          ['Spring clamp (cage)', 'A spring holds the conductor against the current bar; a tool opens it', 'Vibration-proof; no torque; consistent', 'Needs the tool; a ferrule helps on fine strand'],
          ['Push-in', 'A solid or ferruled conductor pushes in and is held by a spring; a release button frees it', 'Fastest; vibration-proof', 'Fine-strand wire needs a ferrule; a release with a screwdriver on the wrong slot damages the block'],
          ['Insulation displacement', 'The block cuts through the insulation to contact the conductor', 'No stripping; very fast', 'One use per contact; specific wire sizes; rare in utility panels'],
          ['Stud and ring lug', 'A ring terminal under a nut', 'High current; power terminals', 'Torque and lock washers; the ground bar and the power distribution block'],
        ],
      },
      {
        t: 'p',
        text: 'Utility panels have moved toward spring and push-in terminals for control and signal wiring, because a lift station panel vibrates every time a pump starts and a screw terminal that was torqued at the factory is loose in five years. Screw terminals remain on power circuits and where the site standard requires them, with a retorque in the maintenance plan.',
      },
      { t: 'h2', text: 'Ratings and listing' },
      {
        t: 'p',
        text: 'A terminal block carries a voltage rating, a current rating, and a wire range, and it is listed to UL 1059 in a use group that says where it may be applied: Group B for industrial control and Group C for power circuits, among others. UL 508A requires listed blocks in the use group appropriate to the circuit, sized for the conductor, with the spacing the voltage requires between adjacent circuits of different voltage. A block rated 600 V and 30 A for 22 to 10 AWG covers most control wiring; power terminals are sized for the feeder. Blocks in the power circuit also carry an SCCR that enters the panel calculation.',
      },
      { t: 'h2', text: 'Block types for signals' },
      {
        t: 'dl',
        items: [
          { term: 'Feed-through', def: 'The basic two-terminal block; one conductor in, one out. Most of the strip.' },
          { term: 'Fused', def: 'A fuse holder in the block, with a blown-fuse indicator option, for an instrument loop or a small load; one fuse per loop means one loop lost per fault.' },
          { term: 'Disconnect (knife)', def: 'A lever that opens the circuit between the field side and the panel side, so a loop can be isolated for a test without lifting a wire. The standard block for analog inputs.' },
          { term: 'Test point', def: 'A socket for a meter probe, or a plug-in test adapter, on the block, so the loop current is measured without opening it. Combined with the knife on the better instrument blocks.' },
          { term: 'Ground', def: 'A block with a foot that bonds to the DIN rail, for shields and equipment grounds; identified by color. Shields land here at the panel end only.' },
          { term: 'Multi-level', def: 'Two or three tiers on one block, for a loop plus its shield, or a plus, minus, and ground per device. Denser, harder to read; label every tier.' },
          { term: 'Sensor and actuator blocks', def: 'Three or four levels with internal commons for a two-wire or three-wire device, so the device lands on one block with power and signal.' },
          { term: 'Barrier and isolator blocks', def: 'Intrinsic safety barriers or signal isolators in a terminal footprint, for loops that go to a hazardous area or that need isolation.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Knife disconnect and test point on every analog input',
        text: 'A loop check on a strip of plain feed-through terminals means lifting wires, which means a wire ends up in the wrong place. A knife disconnect with a test socket lets the technician isolate the transmitter, inject a signal from the panel side, and measure the loop current, without touching a screw. The extra cost per block is repaid at the first commissioning.',
      },
      { t: 'h2', text: 'Layout and marking' },
      {
        t: 'ul',
        items: [
          'Strips by function and by voltage: power, 120 V control, 24 V DC discrete inputs, discrete outputs, analog inputs, analog outputs, communications, shields and grounds. Never a 120 V circuit next to a 24 V signal on the same strip without a separator and the spacing the standard requires.',
          'Numbering per the panel standard, the same on the schematic, the wiring diagram, and the I/O list. A convention that encodes the module and channel in the terminal number lets the technician read the channel from the label.',
          'A marker on every terminal, machine-printed, and a strip label at the end with the strip name and its drawing reference.',
          'End plates and end clamps on every strip; separators between voltage groups; partition plates where the standard needs them.',
          'Jumpers for commons using the manufacturer bridging bars, not wire loops, so the common is visible and does not depend on a screw.',
          'Field wiring on the outer side toward the wireway, panel wiring on the inner side, so a field electrician never has to reach past panel wiring.',
          'Spare terminals, 20 percent per strip, labeled and empty.',
          'Wire markers on every conductor at the terminal, matching the schematic wire numbers.',
        ],
      },
      { t: 'h2', text: 'Ferrules' },
      {
        t: 'p',
        text: 'A ferrule is a crimped sleeve on a stranded conductor that turns it into a solid pin. It keeps strands from escaping the clamp, gives a consistent connection in spring and push-in terminals, and is standard in most panel shops. Ferrules are sized to the wire, crimped with the right tool, and insulated with the color code the shop uses. A stranded wire pushed bare into a push-in terminal, or a ferrule of the wrong size crimped with pliers, is the connection that fails intermittently on the coldest night of the year.',
      },
    ],
    faqs: [
      {
        q: 'Can I land two wires on one terminal?',
        a: 'Only if the block is rated for it and the wires are within the range for two conductors, usually with a twin ferrule for stranded wire. Most panel standards land one conductor per terminal side and use bridging bars for commons. Two wires under one screw is the connection most likely to be loose.',
      },
      {
        q: 'Do screw terminals really loosen?',
        a: 'Yes, under vibration and under thermal cycling that expands and contracts the copper. Panel maintenance programs include a retorque on power terminals for that reason. Spring and push-in terminals hold a constant force and do not need it, which is why they have taken over control wiring.',
      },
      {
        q: 'Where do shields land?',
        a: 'On ground terminals bonded to the rail at the panel end, and nowhere at the field end, for the reasons on the ground loop page. A multi-level block with a shield tier bonded to the rail, or a separate shield ground strip beside the analog strip, keeps them organized and visible.',
      },
      {
        q: 'What happens when a strip runs out of spares?',
        a: 'A new strip is added, on the drawing first, in the same numbering convention. A spare that has been used is relabeled and the I/O list updated. A panel where the spares are gone and wires are doubled under terminals has reached the point where the next change needs a panel modification, and the drawing should say so.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/panel-design/ul-508a',
      '/engineering-library/lists-schedules/io-lists',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/controls/instrumentation/signals/ground-loops',
      '/engineering-library/drawings/schematics',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/ups',
    kind: 'reference',
    title: 'UPS for Control Panels',
    summary:
      'Keeping the controller, the radio, and the SCADA server alive through an outage: AC and DC UPS types, what to put on the UPS and what not to, sizing for runtime and inrush, the battery as a maintenance item, the alarms a UPS must provide, and what happens when the UPS is the thing that fails.',
    answer:
      'A UPS in a control panel carries the loads that must survive a power interruption, typically the controller, the network and radio, the level transmitter, and the HMI, for long enough to ride through a generator transfer or to report the outage and shut down cleanly. Panel UPS units are either AC units feeding the control transformer side or DC units that back up the 24 V bus directly with a battery module, and the DC type suits most panels better. The UPS is sized for its load and its runtime, its battery is replaced on a schedule, and its status is alarmed, because a UPS with a dead battery is discovered by the outage it was bought for.',
    keyPoints: [
      'A UPS carries the loads that must report or ride through. Pumps, heaters, and drives are never on it.',
      'A 24 V DC UPS module on the control bus is simpler and more reliable than an AC unit for most panels.',
      'Size for runtime: long enough to cover the generator transfer, or to report the outage and shut down.',
      'The battery is a consumable. Replace on a schedule and alarm its condition.',
      'Alarm on-battery, low battery, battery fault, and UPS fault to the controller and SCADA.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Power', 'Telemetry', 'Design'],
    blocks: [
      { t: 'h2', text: 'What the UPS is for' },
      {
        t: 'p',
        text: 'When utility power fails at a site, two things need to keep working: the controller, so that it knows what happened and manages the restart, and the telemetry, so that SCADA learns of the outage and the operator is notified. At a site with a generator, the UPS carries those loads through the ten to twenty seconds between the utility failing and the transfer switch closing on the generator. At a site without one, the UPS carries them long enough to report the outage, the high level that follows, and the pump status, and then to shut down cleanly before the battery is exhausted. That is the whole job, and it is a small load for a short time, which is why panel UPS units are small.',
      },
      { t: 'h2', text: 'What goes on it' },
      {
        t: 'table',
        head: ['On the UPS', 'Not on the UPS', 'Why'],
        rows: [
          ['The controller and its I/O', 'Pumps, starters, drives', 'The controller must see the event; the loads that consume power are what the generator is for'],
          ['The network switch, the radio, the cellular modem', 'Panel heaters and fans', 'Reporting is the purpose; heating is not'],
          ['The level transmitter and the critical instruments', 'Lighting and receptacles', 'A controller with no level cannot report a high level'],
          ['The HMI, where an operator may be present', 'Chemical feed pumps', 'A feed pump on a UPS runs with no process flow'],
          ['The alarm dialer', 'Anything with an inrush the UPS cannot start', 'The dialer is the second reporting path'],
        ],
      },
      { t: 'h2', text: 'AC or DC' },
      {
        t: 'dl',
        items: [
          { term: 'AC UPS', def: 'A conventional unit with a battery, an inverter, and an AC output, feeding the control transformer or the panel receptacle circuit. It backs up everything downstream including AC loads, needs space and ventilation, and its inverter is another device to fail. Common in SCADA server rooms and where AC loads must ride through.' },
          { term: 'DC UPS module', def: 'A module on the 24 V DC bus between the power supply and the loads, with a battery module beside it. When the supply output disappears, the module switches the bus to the battery without interruption. It backs up only the 24 V loads, which in most panels are exactly the loads that matter, and it has no inverter. The common choice for a control panel.' },
          { term: 'Battery-backed power supply', def: 'A power supply with an integral charger and battery connection, doing the same job as the DC module in one device.' },
          { term: 'Solar and battery systems', def: 'At sites with no utility power, the battery is the primary source and the panel is designed as a DC system from the start; the sizing is for days, not minutes.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'A DC UPS cannot carry the drive control board',
        text: 'A drive that takes 24 V for its control electronics may be on the same bus, and a drive control board on a UPS during an outage sits ready and faults when its DC bus collapses. Put the drive control power on the unbacked side, or accept the fault and clear it on restart. What the UPS must never do is start a load it was not sized for.',
      },
      { t: 'h2', text: 'Sizing' },
      {
        t: 'steps',
        items: [
          { title: 'List the backed-up load', text: 'Every device that stays on the UPS side, at its continuous current: controller, I/O, switch, radio, transmitter, HMI, dialer. Typically a few amps at 24 V.' },
          { title: 'Decide the runtime', text: 'With a generator: the transfer time plus margin, a few minutes. Without: long enough to report the outage and the high level, run the radio through the operator response, and shut down; commonly 30 minutes to a few hours. The control narrative says.' },
          { title: 'Choose the battery', text: 'From the load, the runtime, and the manufacturer runtime curves, with derating for temperature and for the battery age at end of life, which is when it must still meet the runtime. A battery sized exactly for the runtime when new meets half of it at replacement time.' },
          { title: 'Check the inrush', text: 'The UPS must carry the peak current of the loads at switchover; a radio transmitting or an HMI backlight starting draws more than its average.' },
          { title: 'Plan the shutdown', text: 'The controller reads the UPS status and the battery level, records the state, sends the final alarms, and where the platform supports it, closes files or parks outputs before the battery dies. A controller that dies mid-write to nonvolatile memory can lose its program.' },
        ],
      },
      { t: 'h2', text: 'The battery' },
      {
        t: 'p',
        text: 'Sealed lead-acid batteries in a panel last three to five years in a temperate enclosure and far less in a hot one; every 10 °C above 25 °C roughly halves the life. Lithium battery modules last longer and tolerate temperature better at a higher price. Whatever the chemistry, the battery is replaced on a schedule before it fails, its date is written on it and in the maintenance system, and the UPS runs a periodic self-test that the controller alarms if it fails. A UPS that has been in a panel for eight years with its original battery is not a UPS.',
      },
      { t: 'h2', text: 'Monitoring' },
      {
        t: 'ul',
        items: [
          'On battery: the utility or the supply has failed and the UPS is carrying the load. Alarmed to SCADA as the outage indication.',
          'Low battery: the runtime is nearly gone. The controller executes its shutdown sequence.',
          'Battery fault or replace battery: the self-test failed or the battery is at end of life. A maintenance alarm.',
          'UPS fault or bypass: the UPS is not protecting the load. A maintenance alarm with priority.',
          'Battery voltage and temperature where the module provides them, trended.',
        ],
      },
      {
        t: 'p',
        text: 'The signals reach the controller as relay contacts or over a network interface; the DC modules typically offer both. They are on the I/O list, on the alarm list, and tested at commissioning by pulling the supply input and watching the sequence through to shutdown.',
      },
    ],
    faqs: [
      {
        q: 'Does a lift station need a UPS if it has a generator?',
        a: 'For the controller and the radio through the transfer, yes, unless the program is written for a clean restart and the utility accepts losing visibility of the event. A small DC module with a few minutes of battery is inexpensive and lets the controller manage the staggered restart, as the generator operation page describes.',
      },
      {
        q: 'How long a runtime is enough without a generator?',
        a: 'Long enough to report and to keep reporting until someone can respond, plus a clean shutdown. Thirty minutes covers the alarms; two hours covers a crew arriving with a portable generator and lets SCADA see the level the whole time. Longer runtimes are batteries and money; the narrative decides.',
      },
      {
        q: 'Why did the UPS fail during the outage it was installed for?',
        a: 'The battery was dead, and nobody knew because the self-test was not alarmed or the alarm was ignored. Batteries in panels fail quietly. The fix is the replacement schedule and the alarm to SCADA, tested by pulling the supply.',
      },
      {
        q: 'Can the SCADA server run on the same UPS as the panel?',
        a: 'A server is an AC load with a different runtime need and its own shutdown software; it gets its own AC UPS in the server room, sized for its load and for the time it takes to shut down or to run until the generator carries it. Panel DC modules and server UPS units are different products for different jobs.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/panel-power-supplies',
      '/water-wastewater/wastewater-systems/lift-stations/generator-operation',
      '/controls/plc-systems/plc-fundamentals/power-supplies',
      '/controls/scada-hmi/alarm-management/notification',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/controls/control-panels/panel-design/heat-calculations',
    ],
  },
  {
    path: '/controls/control-panels/panel-troubleshooting/noise-problems',
    kind: 'reference',
    title: 'Noise Problems',
    summary:
      'Electrical noise as a panel problem: the four ways it couples, the design features that keep it out, the sources people forget such as unsuppressed coils and unbonded doors, and the sequence for finding where noise gets into a panel that should be clean.',
    answer:
      'Noise reaches a control panel by conduction along wires that share a path, by capacitive coupling from fast voltage changes, by magnetic coupling from changing currents, and by radiation into wiring that acts as an antenna. A panel keeps it out with segregated wireways by signal class, a single ground bus with shields landed at one point, bonded doors and mounting plates, suppression on every relay and contactor coil, drives in their own section with shielded motor cable, and DC commons bonded once. When a panel is noisy, the search runs from the symptom to the coupling path: correlate the noise with a source, find where the source wiring and the victim wiring share a route or a ground, and fix that path rather than filtering the victim.',
    keyPoints: [
      'Four paths: conducted, capacitive, magnetic, radiated. Each has its own signature and its own fix.',
      'Segregation by class inside the panel matters as much as outside; the wireway is where most coupling happens.',
      'Unsuppressed coils are the most common noise source inside a panel and the cheapest to fix.',
      'One ground bus, shields at one point, DC common bonded once, doors and plates bonded: the panel grounding checklist.',
      'Drives belong in their own section, with shielded motor cable and their control wiring routed away from the motor leads.',
      'Find the coupling path and fix it; a filter on the victim hides the problem and leaves it for the next signal.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Panels', 'Signals', 'Grounding', 'Design', 'Troubleshooting'],
    blocks: [
      { t: 'h2', text: 'How noise gets in' },
      {
        t: 'table',
        head: ['Path', 'Mechanism', 'Signature', 'Defense'],
        rows: [
          ['Conducted', 'Noise current shares a conductor with the signal: a common, a ground, a power supply', 'Affects every circuit on the shared conductor; correlates with a load on that conductor', 'Separate commons and supplies, single-point grounding, filtered power'],
          ['Capacitive', 'Fast voltage change on a nearby conductor drives current through the capacitance between them', 'Affects high-impedance and voltage signals; worse with parallel length; drives and contactor arcs', 'Shields grounded at one end, separation, distance from drives'],
          ['Magnetic', 'Changing current in a nearby conductor induces voltage in a loop', 'Spikes on motor starts, hum near transformers and heavy conductors; shields do little', 'Twisted pair, separation, steel conduit, avoiding loops in wiring'],
          ['Radiated', 'Wiring acts as an antenna for radio frequency energy', 'Correlates with radios, modems, and antennas; steps rather than noise', 'Bonded enclosure, closed doors, shield bonded short at the entry, ferrites'],
        ],
      },
      { t: 'h2', text: 'What a quiet panel has' },
      {
        t: 'ul',
        items: [
          'Wireways segregated by class: low-level signal and communications in one, discrete control in another, power and motor wiring in a third, with drive output wiring in its own path. Where classes must cross, they cross at right angles.',
          'Input and output cards placed so that signal wiring reaches them without passing through the power section.',
          'One ground bus bonded to the enclosure and to the equipment ground, with a shield termination bar tied to it at one point, and every shield landed there and insulated at the field end.',
          'The DC supply common bonded to the ground bus once, at the supply, and nowhere else.',
          'Suppression on every relay and contactor coil: a diode across DC coils, an RC snubber or varistor across AC coils, fitted at the coil.',
          'Drives in a separate section or enclosure, with shielded motor cable bonded at both ends, a short ground strap, and the control wiring to the drive in shielded pair routed away from the motor leads.',
          'Doors, back plates, and sub-panels bonded to the enclosure with straps, not through the hinges or the paint.',
          'Antennas and radios outside the panel, or in their own section with the antenna cable routed out directly and a bonded surge protector at the entry.',
          'Control power from a transformer or filtered supply rather than shared with motor loads, and surge protection at the panel feed.',
        ],
      },
      { t: 'h2', text: 'The sources inside the panel' },
      {
        t: 'p',
        text: 'A panel can be wired perfectly and still be noisy because of what is in it. A relay coil that is de-energized without suppression produces a voltage spike of several hundred volts and a burst of radio frequency energy as the contact opens, and every time it happens the controller inputs on the same wireway see it. Contactors are worse. A drive without its motor cable shield bonded puts its common-mode current into the panel ground bus. A switching power supply with a failed filter capacitor puts its switching frequency on the DC bus that feeds every input. A radio inside the panel transmits into everything. Any of these produces symptoms that look like a field problem, and the fix is inside the panel.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Coil suppression',
        text: 'A diode across a DC coil, cathode to positive, clamps the spike at a volt and costs almost nothing. An RC snubber or a varistor across an AC coil does the same. Fit them at the coil, on the relay socket or the contactor terminals, not at the output card. Output cards with built-in suppression protect the card, not the wiring between the card and the coil, and the wiring is where the noise couples.',
      },
      { t: 'h2', text: 'Finding the path' },
      {
        t: 'steps',
        items: [
          { title: 'Characterize the symptom', text: 'Which signals, what the noise looks like, when it happens. A single signal points at its own wiring or a coupling path; several signals on one card point at the card common or the wireway; every signal in the panel points at the ground, the DC supply, or a strong source.' },
          { title: 'Correlate with a source', text: 'Trend the worst signal at a fast rate and operate suspected sources one at a time: a drive, a contactor, a radio, a heater. The one that moves the trend is the source.' },
          { title: 'Find where they meet', text: 'Trace the source wiring and the victim wiring through the panel. A shared wireway, a shared common, a shared ground point, a shared power supply: that is the coupling path.' },
          { title: 'Check the grounding', text: 'Ground bus bonded; shields on the bar and open at the far end; DC common bonded once; doors and plates strapped. A clamp meter on the ground conductors and the shields shows current where there should be none.' },
          { title: 'Check the sources for suppression', text: 'Every coil with a suppressor, the drive with its shield and strap, the power supply clean on a scope.' },
          { title: 'Fix the path', text: 'Reroute, suppress, bond, separate. Then trend again with the source operating. Filtering the victim is the last resort and gets written on the drawing as a compromise.' },
        ],
      },
      { t: 'h2', text: 'Two classic cases' },
      {
        t: 'dl',
        items: [
          { term: 'The controller that resets when the big contactor drops out', def: 'The contactor coil is on the same 120 VAC control circuit as the controller power supply, without suppression. The spike on coil de-energization dips the control voltage and the controller browns out. An RC snubber on the coil and a separate breaker for the controller supply fix it; a UPS for the controller is the second layer.' },
          { term: 'The level that steps when the pump starts', def: 'The level transmitter shield is landed on the field junction box and the panel, and the pump starting current changes the ground potential between them. The shield carries the difference, and the input sees it. Lifting the field end of the shield fixes the signal; correcting the ground path between the junction box and the panel prevents the next one.' },
        ],
      },
      { t: 'h2', text: 'Preventing it at design' },
      {
        t: 'p',
        text: 'The features that keep a panel quiet cost almost nothing when the panel is designed and a great deal afterward. The layout drawing shows wireways by class and places the cards accordingly; the bill of material includes coil suppressors, shield bars, bonding straps, and shielded drive cable; the specification tells the builder where shields terminate and where the DC common is bonded. A panel checkout before shipment verifies each item. A plant that gets those things in every panel spends its time on the process instead of on noise.',
      },
    ],
    faqs: [
      {
        q: 'The panel was quiet when it was built. What changed?',
        a: 'Usually a modification: a cable pulled through the nearest wireway, a relay added without a suppressor, a shield landed at a field box during a transmitter replacement, a radio installed inside the door. Panels accumulate noise with every change unless the rules are written down and followed.',
      },
      {
        q: 'Is a separate instrument ground a good idea?',
        a: 'A separate bar for shields and instrument commons, tied to the main panel ground at one point, is good practice; it keeps shield currents off the bus that carries everything else. A separate ground electrode for instruments, not bonded to the equipment ground, is a hazard and a noise source, and the code does not allow it.',
      },
      {
        q: 'How do I tell a noise problem from a bad input card?',
        a: 'Swap in a known-good card or move the loop to a spare channel. A card problem follows the card; a noise problem follows the wiring. Also look at whether the problem correlates with a source; card faults do not care what else is running.',
      },
      {
        q: 'Where do I put a drive if the panel has to hold one?',
        a: 'In its own section with a barrier, as far from the I/O as the enclosure allows, with the motor cable leaving directly through its own entry, a short ground strap to the bus, and its control wiring in shielded pair routed away from the motor terminals. Better still, in its own enclosure with a short shielded control cable between them.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/panel-components/control-relays',
      '/troubleshooting/noise-interference/cable-routing-problems',
      '/troubleshooting/vfd-troubleshooting/drive-causes-instrument-noise',
      '/troubleshooting/grounding-troubleshooting/shield-grounded-at-both-ends',
      '/troubleshooting/noise-interference/radio-frequency-interference',
    ],
  },
  {
    path: '/controls/control-panels/panel-troubleshooting/ground-faults',
    kind: 'reference',
    title: 'Ground Faults',
    summary:
      'Ground faults in and around control panels: what happens on grounded 120 VAC circuits, on grounded and ungrounded 24 VDC systems, and on drive outputs; where they hide, from chafed wire to flooded boxes; and the divide-and-conquer method that finds them.',
    answer:
      'A ground fault is an unintended connection between an energized conductor and ground. On a grounded 120 VAC control circuit it blows the fuse or trips the breaker immediately, which at least says where to look. On a grounded 24 VDC system a fault on the positive side blows a fuse; on an ungrounded system the first fault causes no symptom at all and the second one shorts the supply. A drive detects a fault on its output and trips. Faults hide where insulation meets metal or water: chafed wire at an enclosure edge, a pinched conductor under a cover, moisture in a float switch, a flooded conduit or junction box, a wet motor. They are found by dividing the circuit with fuses and disconnects until the fault is in one branch, and by insulation testing only after the electronics are disconnected.',
    keyPoints: [
      'Grounded circuit: the fault clears a fuse and announces itself. Ungrounded circuit: the first fault is silent, and a monitor is the only warning.',
      'Divide and conquer: pull fuses and disconnect branches until the fault is in one, then follow the wire.',
      'Water is the usual cause in the field: floats, junction boxes, conduits, motors. Chafing is the usual cause in the panel.',
      'Insulation testers destroy electronics; disconnect controllers, drives, and transmitters before applying test voltage.',
      'A ground fault that comes and goes with rain, level, or vibration is still a ground fault; find it before it becomes a short.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Panels', 'Power', 'Grounding', 'Troubleshooting', 'NEC'],
    blocks: [
      { t: 'h2', text: 'What happens depends on the system' },
      {
        t: 'table',
        head: ['System', 'Fault on', 'What happens', 'How you find out'],
        rows: [
          ['120 VAC control circuit, grounded neutral', 'Hot conductor', 'Fault current returns on the ground; fuse or breaker opens', 'Blown control fuse, tripped breaker, loss of control power'],
          ['24 VDC, common bonded to ground', 'Positive conductor', 'Fault current returns on the ground; supply fuse or branch fuse opens, or the supply current-limits', 'Blown DC fuse, supply in overload'],
          ['24 VDC, common bonded to ground', 'Common conductor', 'Nothing; the common is already at ground', 'Not visible; a second fault on a positive then shorts'],
          ['24 VDC, ungrounded', 'Either conductor', 'Nothing on the first fault; the system is now effectively grounded on that side', 'Ground fault monitor alarm, or a mysterious short when the second fault occurs'],
          ['Drive output', 'Motor lead or winding', 'Drive detects output current imbalance and trips on ground fault', 'Drive fault code'],
          ['480 V feeder to the panel', 'Phase conductor', 'Breaker trips on fault current or on ground fault protection where fitted', 'Tripped feeder breaker'],
        ],
      },
      { t: 'h2', text: 'Where they hide' },
      {
        t: 'dl',
        items: [
          { term: 'Enclosure edges and cutouts', def: 'A conductor pulled through a knockout without a bushing, or resting on a sharp edge, chafes through with vibration and thermal cycling. Look at every entry.' },
          { term: 'Under covers and mounting plates', def: 'A wire pinched when a wireway cover or a sub-panel was reinstalled. The fault appeared the day after the work.' },
          { term: 'Float switches and submersible devices', def: 'Cable jackets crack, seals fail, and water reaches the conductors. The fault comes and goes with level.' },
          { term: 'Junction boxes and conduits', def: 'Condensation and flooding fill boxes and low points in conduit; the fault follows the weather.' },
          { term: 'Motors and heaters', def: 'Winding insulation fails from age, heat, or moisture; a motor that has sat wet faults on the first start.' },
          { term: 'Solenoid valves and coils', def: 'Coil insulation breaks down, often after an overvoltage or from heat in a dead-headed valve.' },
          { term: 'Field devices with metal housings', def: 'A transmitter or switch whose wiring touches the housing inside the terminal compartment.' },
          { term: 'Temporary and abandoned wiring', def: 'A conductor left energized and capped, or not capped, in a box somebody forgot.' },
        ],
      },
      { t: 'h2', text: 'Finding a fault on a grounded circuit' },
      {
        t: 'steps',
        items: [
          { title: 'Confirm the fault', text: 'With the circuit de-energized and locked out, measure resistance from the faulted conductor to ground. A low reading confirms a fault; a normal reading with a blown fuse means an overload or a short between conductors instead.' },
          { title: 'Divide the circuit', text: 'Pull the fuses or open the disconnects that split the circuit into branches, and measure each branch to ground. The fault is in the branch that reads low. Keep dividing: field wiring from panel wiring, one device from the next, until one conductor between two points reads low.' },
          { title: 'Follow the conductor', text: 'Inspect the path of that conductor for the places above. Water and chafing account for most faults; look for them first.' },
          { title: 'Check the device at the end', text: 'Disconnect the device and measure it alone to ground. A coil, a float, a heater, or a motor that reads low is the fault.' },
          { title: 'Repair and verify', text: 'Replace the damaged cable or device, protect the path that caused the damage, and measure to ground again before restoring the fuse. Then energize with the branch isolated first.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Insulation testers and electronics',
        text: 'A megohmmeter applies 500 or 1000 volts. Controller I/O, drives, transmitters, power supplies, and surge protectors are destroyed by it. Disconnect every electronic device from the circuit under test, and lift the surge protectors, before applying test voltage. For circuits with electronics that cannot be disconnected, use a low-voltage ohmmeter, which finds a solid fault but may miss a marginal one.',
      },
      { t: 'h2', text: 'Finding a fault on an ungrounded DC system' },
      {
        t: 'p',
        text: 'An ungrounded 24 VDC system gives no fuse to follow. A ground fault monitor, which measures the resistance of each pole to ground continuously, alarms on the first fault and shows which pole. Without one, the fault is found by measuring the voltage from each pole to ground: on a healthy floating system both read some wandering intermediate value; with a fault on one pole, that pole reads near zero to ground and the other reads the full supply voltage. The faulted pole is then divided by pulling branch fuses one at a time and watching the reading return to normal. Intermittent faults are found by leaving the monitor in place and logging when it alarms against level, rain, and equipment operation.',
      },
      { t: 'h2', text: 'Drives and ground faults' },
      {
        t: 'p',
        text: 'A drive trips on ground fault when the sum of its three output currents is not zero, which means current is leaving through a path other than the motor leads. A real fault in the motor or cable is found by disconnecting the motor at its terminal box and testing the cable and the motor separately with an insulation tester. A nuisance trip comes from the leakage current of a long shielded motor cable, from an output filter, or from moisture in a motor that will clear when the motor is run warm; the drive manual describes the settings and the cable limits. A drive that trips on ground fault at the first start after a wet period, and runs after the motor is dried, has told you the motor needs attention.',
      },
      { t: 'h2', text: 'Preventing them' },
      {
        t: 'ul',
        items: [
          'Bushings on every knockout and grommets on every edge a conductor crosses.',
          'Conductors dressed away from covers and mounting plates, and covers checked for pinched wires before they are closed.',
          'Drains in low points of conduit and in junction boxes that can collect water; sealed fittings where the code requires them.',
          'Submersible cables inspected on a schedule and replaced when the jacket shows cracking.',
          'Ground fault monitors on ungrounded DC systems, with the alarm on the HMI.',
          'Insulation testing of motors and long cables on a schedule, trended, so the fault is predicted rather than found.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The control fuse blows only when it rains. What is that?',
        a: 'A ground fault in a field device or a junction box that fills with water. Divide the circuit during the rain, or measure each field branch to ground while it is wet, and expect to find a float switch cable, a box without a drain, or a conduit low point.',
      },
      {
        q: 'Should the 24 VDC common be grounded or not?',
        a: 'Either is permitted. Grounded systems make faults visible immediately by blowing a fuse and keep every signal at a known reference. Ungrounded systems tolerate a single fault and keep running, which some plants prefer for critical circuits, but only with a ground fault monitor and a policy of fixing the first fault promptly. Choose one for the plant and apply it consistently.',
      },
      {
        q: 'The insulation tester shows a low reading but the circuit works. Is it a fault?',
        a: 'A reading of a few megohms on a long field circuit with older cable is normal deterioration; a reading in the kilohms is a fault waiting for enough voltage or moisture to become a short. Trend the readings; a value that falls each year is the cable telling you when to replace it.',
      },
      {
        q: 'Can a ground fault on one circuit affect another?',
        a: 'On a grounded system the fault current returns through the ground conductors and can raise the potential of the grounding system enough to disturb instrument signals while it flows. On an ungrounded system a fault on one pole effectively grounds that pole for every circuit on the supply, and a second fault anywhere on the other pole shorts the whole supply. Both are reasons not to leave a known fault in place.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/fuses',
      '/controls/control-panels/panel-components/circuit-breakers',
      '/troubleshooting/vfd-troubleshooting/drive-trips-on-ground-fault',
      '/troubleshooting/grounding-troubleshooting/missing-equipment-ground',
      '/troubleshooting/grounding-troubleshooting/floating-reference-between-panels',
      '/controls/control-panels/panel-components/panel-power-supplies',
    ],
  },
  {
    path: '/controls/control-panels/panel-troubleshooting/no-control-power',
    kind: 'reference',
    title: 'No Control Power',
    summary:
      'The control power path from the disconnect to the last relay, and how to work along it when the panel is dead: transformer and fuses, control breaker, emergency stop and safety relay, DC supply and distribution, what trips them, and design that makes it easy.',
    answer:
      'Control power in a typical panel flows from the main disconnect through the control transformer primary fuses, the transformer, the secondary fuse, a control power breaker or switch, the emergency stop and safety relay contacts, and then to the control terminals and the DC power supply, whose output passes through its own breakers or fuses to the controller and the I/O. When the panel is dead, measure at each point in that order, from the source toward the loads, until the voltage disappears; the fault is between the last good point and the first dead one. Before replacing a fuse, find out why it opened, because a fuse that opened on a shorted coil or a ground fault will open again.',
    keyPoints: [
      'Follow the path from the source: disconnect, primary fuses, transformer, secondary fuse, control breaker, safety circuit, terminals, DC supply, DC distribution.',
      'Measure at each point in order; the fault is between the last live point and the first dead one.',
      'A fuse that opened had a reason. Find it before you replace the fuse, and replace it with the same type and rating.',
      'The emergency stop circuit and the safety relay are part of the path; a latched safety relay looks exactly like a dead panel.',
      'Control power lights, labeled fuses, and monitored supplies turn an hour of probing into a glance.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Panels', 'Power', 'Troubleshooting', 'Fundamentals', 'UL 508A'],
    blocks: [
      { t: 'h2', text: 'The path' },
      {
        t: 'table',
        head: ['Point', 'What is there', 'What fails here'],
        rows: [
          ['Feeder and main disconnect', 'The supply to the panel and the disconnect on the door', 'Feeder breaker tripped upstream, disconnect open, a lost phase on a three-phase supply'],
          ['Control transformer primary fuses', 'Small fuses ahead of the transformer, sized for its inrush', 'Open on transformer inrush after a brief outage, on a transformer fault, or from age'],
          ['Control transformer', 'Steps the supply down to 120 VAC for control', 'Shorted or open winding, usually after an overload or a surge'],
          ['Secondary fuse', 'Protects the 120 VAC control circuit', 'Opens on a shorted coil, a ground fault, or an overloaded circuit'],
          ['Control power breaker or switch', 'Turns control power on and off on the door', 'Tripped by the same faults; left off after service'],
          ['Emergency stop and safety relay', 'E-stop buttons, guard switches, and the relay that removes control power from the outputs', 'A pressed or stuck button, a broken wire in the loop, a safety relay that needs a reset, a failed relay'],
          ['Control terminals', 'Distribution to relays, pilot devices, and the DC supply', 'A loose terminal, a wire pulled out during work'],
          ['DC power supply', 'Converts 120 VAC to 24 VDC', 'Failed supply, supply in current limit from an overload, input fuse open'],
          ['DC distribution', 'Breakers or fuses feeding the controller, I/O, and field devices', 'Tripped by a field short or ground fault; a failed field device'],
        ],
      },
      { t: 'h2', text: 'Working along it' },
      {
        t: 'steps',
        items: [
          { title: 'Look before measuring', text: 'Pilot lights, the controller power light, the supply DC OK light, the safety relay status lights, the position of the control power breaker and the emergency stop buttons. The lights that are on tell you how far the power got.' },
          { title: 'Measure the supply', text: 'Line voltage at the disconnect load side. All phases on a three-phase supply; a lost phase can leave a single-phase control transformer dead while the panel looks powered.' },
          { title: 'Measure across the primary fuses', text: 'Voltage on the load side of each fuse. An open fuse shows supply voltage on its line side and nothing on its load side.' },
          { title: 'Measure the transformer secondary', text: 'The control voltage at the transformer terminals. Supply in and nothing out is a failed transformer; check the winding resistance with the power off.' },
          { title: 'Measure through the secondary fuse and the control breaker', text: 'Load side of each. A tripped breaker is a finding, not a fix.' },
          { title: 'Check the safety circuit', text: 'Voltage through the emergency stop chain and at the safety relay outputs. Reset the relay if it requires it and watch whether it holds; a relay that will not reset has an open in its input loop or a failed channel.' },
          { title: 'Measure at the control terminals', text: 'The distribution point for the 120 VAC control. Nothing here with everything upstream good is a loose or broken wire in between.' },
          { title: 'Measure the DC supply', text: 'Input voltage present, output voltage at the terminals. A supply with input and no output has failed or is in current limit; disconnect its load and see if the output returns.' },
          { title: 'Divide the DC distribution', text: 'Open each DC breaker or fuse and measure the load side. A tripped branch is a short or a ground fault downstream; find it before resetting.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Before replacing a fuse',
        text: 'A fuse opens because something drew more current than it should: a shorted coil, a ground fault in a field cable, a transformer that failed, or inrush the fuse was not sized for. Find that reason with the power off and a meter before installing a new fuse, and replace it with the same type, rating, and interrupting capacity. A larger fuse is not a repair; it is a fire in a panel.',
      },
      { t: 'h2', text: 'The things that trip it' },
      {
        t: 'ul',
        items: [
          'A shorted relay, contactor, or solenoid coil. Coils fail shorted after overheating or an overvoltage, and the secondary fuse opens the moment that coil is energized. A fuse that opens when a particular output turns on has found the coil.',
          'A ground fault in field wiring. A float switch cable in water, a chafed wire at a box, a wet junction box. The fuse opens when the field circuit is energized or when it rains.',
          'Inrush after a momentary outage. A control transformer re-energized while its core is magnetized draws a large inrush, and a primary fuse sized without margin opens. A time-delay fuse of the rating the transformer manufacturer specifies prevents it.',
          'An overloaded control circuit. Loads added over the years exceed the transformer or the fuse; the fuse opens under peak load and holds at other times.',
          'A failed DC supply. Output falls or disappears; the fan may still run. Supplies fail from heat and age, and a supply running near its rating in a hot panel fails first.',
          'A safety circuit open. An emergency stop pressed and not pulled out, a guard switch misaligned, a wire broken in the loop, a safety relay whose reset was not pressed after the loop was restored.',
          'A phase lost upstream. A three-phase panel with a control transformer on two of the phases loses control power when one of those phases is lost, while motors on the other phases may still run for a time.',
        ],
      },
      { t: 'h2', text: 'Design that makes it easy' },
      {
        t: 'p',
        text: 'The panel that takes two minutes to diagnose has a control power available light on the door, a light or contact on the DC supply that goes to the controller and the HMI, indicating fuse holders or blown-fuse indicators on the control fuses, a fuse and breaker schedule on the inside of the door that says what each one feeds and its rating, the emergency stop and safety relay status on the HMI, and every fuse and breaker labeled with the same number the drawing uses. It also has a spare fuse kit of the correct types clipped inside the door, so the technician who has found the cause can finish the repair. Panels are dead most often at the worst hour, and these details are what a good specification asks for.',
      },
      { t: 'h2', text: 'When the control power is present and the panel is still dead' },
      {
        t: 'p',
        text: 'The controller has power and no lights, the HMI is dark, the I/O rack is dead: the problem is downstream of the control power. A DC branch breaker tripped, a rack power supply failed, a controller in a fault state that looks like off, a backplane connector loose after service. The same method applies, one stage further along: measure at the input to each dead device, and the first one with power in and nothing out is the failure.',
      },
    ],
    faqs: [
      {
        q: 'The primary fuse blew and the new one blew immediately. What now?',
        a: 'The transformer or something on its secondary is faulted. Disconnect the secondary and try again with a new fuse; if it holds, the fault is in the control circuit, and you divide that. If it blows with the secondary open, the transformer has failed. Do not try a third fuse without finding out which.',
      },
      {
        q: 'The DC supply shows the output light but the voltage is low. Why?',
        a: 'The supply is in current limit: a load is drawing more than its rating, usually a short or a ground fault on a field circuit, or too many loads added over time. Disconnect the loads one at a time and watch the output recover. A supply whose output is low with no load has failed.',
      },
      {
        q: 'How do I tell a tripped safety relay from a failed one?',
        a: 'Check the input loop: with all emergency stops released and guards closed, the relay input indicators should show both channels satisfied. Press reset. A relay that resets and holds was tripped. A relay whose inputs show satisfied and that still will not reset, or resets and immediately drops, has failed or has a wiring fault on its reset or feedback circuit.',
      },
      {
        q: 'Why does the control power go out when the generator takes over?',
        a: 'Transfer causes a brief outage, and the control transformer draws inrush on re-energization that opens an undersized primary fuse; or the generator voltage or frequency during transfer is outside what the DC supply or an undervoltage relay accepts and something drops out. Time-delay primary fuses of the right rating and a UPS on the controller supply are the usual cures; look at the transfer sequence with a recording meter if it persists.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/fuses',
      '/controls/control-panels/panel-components/circuit-breakers',
      '/controls/control-panels/panel-components/panel-power-supplies',
      '/controls/control-panels/panel-components/ups',
      '/controls/control-panels/panel-troubleshooting/ground-faults',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/nfpa-70',
    kind: 'reference',
    title: 'NFPA 70 and the Control Panel',
    summary:
      'The National Electrical Code inside an industrial control panel: Article 409 and the listing it points to, the short-circuit current rating, overcurrent protection for control circuits, grounding and bonding, working space, and what an inspector asks.',
    answer:
      'NFPA 70, the National Electrical Code, governs the installation of the control panel and, through Article 409 and its reference to the UL 508A listing, most of what is inside it. The code cares that the panel carries a short-circuit current rating adequate for the available fault current where it is installed, that it is listed or field evaluated, that its supply conductors and overcurrent protection match its nameplate, that the control circuits inside follow the rules for their class, that it is grounded and bonded, and that there is working space in front of it. The panel builder meets the internal requirements through the listing; the installer meets the external ones; and the engineer who specifies the panel is responsible for the ratings, the nameplate, and the installation drawings that let both of them do that.',
    keyPoints: [
      'Article 409 covers industrial control panels and requires a nameplate with the short-circuit current rating and supply data.',
      'The short-circuit current rating must be at least the available fault current at the line terminals; the installer proves the second number.',
      'Control circuits follow Article 725 for class and wiring method, or Article 430 Part VI for motor control circuits.',
      'Grounding and bonding inside the panel follow Article 250; the enclosure, the doors with devices, and the subpanel are bonded.',
      'Working space and the disconnecting means are installation items that the panel design must not defeat.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['NEC', 'Panels', 'Standards', 'Design', 'UL 508A'],
    blocks: [
      { t: 'h2', text: 'Where the code reaches' },
      {
        t: 'table',
        head: ['Article', 'What it covers in a panel', 'Who meets it'],
        rows: [
          ['409', 'Industrial control panels: listing, nameplate, short-circuit current rating, conductor sizing, overcurrent protection', 'Builder and engineer'],
          ['110', 'Working space, marking, available fault current documentation, terminal and conductor ratings', 'Installer and engineer'],
          ['240', 'Overcurrent protection of the supply and, with 409 and 430, of the internal circuits', 'Builder and engineer'],
          ['250', 'Grounding and bonding of the enclosure and internal parts', 'Builder and installer'],
          ['430', 'Motor circuits, controllers, overload protection, disconnects, motor control circuits', 'Builder and engineer'],
          ['725', 'Class 1, 2, and 3 remote control and signaling circuits: power limits, wiring methods, separation', 'Builder and installer'],
          ['700, 701, 702', 'Emergency, legally required, and optional standby systems where the panel is part of one', 'Engineer'],
          ['500 to 516', 'Hazardous locations, with UL 698A for the panel', 'Engineer and builder'],
        ],
      },
      { t: 'h2', text: 'Article 409 and the listing' },
      {
        t: 'p',
        text: 'An industrial control panel is an assembly of two or more power circuit components, control circuit components, or both, with wiring and terminals, in an enclosure. Article 409 requires it to be marked with the supply voltage, phases, frequency, full-load current, the short-circuit current rating, and the enclosure type, and it permits the inspector to require a listing or a field evaluation. UL 508A is the listing standard, and building to it is how a panel shop demonstrates that the internal conductor sizing, overcurrent protection, spacing, component ratings, and the short-circuit current rating were done correctly. A panel that is not listed is not automatically non-compliant, but the inspector who asks for a field evaluation is within the code.',
      },
      { t: 'h2', text: 'Short-circuit current rating' },
      {
        t: 'p',
        text: 'The panel nameplate states the short-circuit current rating, the fault current the assembly can withstand. The code requires that the available fault current at the line terminals, which depends on the utility transformer and the conductors between it and the panel, not exceed that rating, and it requires the available fault current to be documented and marked at the service and at equipment. A panel rated 5 kA, the default for an unstudied assembly, installed on a 480 volt service with 30 kA available is a violation and a hazard. The engineer determines the available fault current and specifies a panel rating above it; the builder achieves the rating through the components and the current-limiting devices in the supply path.',
      },
      { t: 'h2', text: 'Control circuits' },
      {
        t: 'ul',
        items: [
          'Class 1 control circuits run at up to 600 volts with conductors sized and protected by the rules in Article 725 and the panel standard; they use standard wiring methods.',
          'Class 2 circuits are power limited by a listed source and can use lighter wiring methods and cables; 24 volt instrument and network circuits are often Class 2.',
          'Class 2 conductors are kept separate from power and Class 1 conductors unless the separation rules are met, which matters inside the panel and in the field conduits.',
          'Motor control circuits tapped from the motor branch circuit follow Article 430 Part VI for their overcurrent protection and are the reason a control transformer secondary is fused.',
        ],
      },
      { t: 'h2', text: 'Grounding and bonding' },
      {
        t: 'p',
        text: 'The enclosure is bonded to the equipment grounding conductor of the supply; the subpanel is bonded to the enclosure; a door carrying devices is bonded with a strap; the control transformer secondary is grounded on one side if it is a grounded control circuit; and the equipment grounding conductors for every outgoing circuit land on a bar bonded to the enclosure. A separate instrument ground bar is bonded to the same system; an isolated ground is still bonded, just by a controlled path. None of it is optional and none of it is done through paint.',
      },
      { t: 'h2', text: 'At the door' },
      {
        t: 'steps',
        items: [
          { title: 'Nameplate', text: 'Voltage, phases, frequency, full-load current, short-circuit current rating, enclosure type, and the listing mark or evaluation label.' },
          { title: 'Available fault current', text: 'The documented value at the panel, below the nameplate rating.' },
          { title: 'Disconnect', text: 'A disconnecting means in sight or lockable, rated for the load, with the door interlock if the panel has one.' },
          { title: 'Supply conductors', text: 'Sized for the full-load current and protected by the upstream device per the nameplate.' },
          { title: 'Working space', text: 'Clear depth, width, and height in front of the panel per Article 110 for the voltage.' },
          { title: 'Bonding', text: 'Enclosure, door, and subpanel bonded; grounding conductors landed.' },
          { title: 'Wiring methods', text: 'Conduit fill, conductor types, separation of classes, and the seals for a hazardous location.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Editions and amendments',
        text: 'The code is revised every three years and adopted by jurisdictions on their own schedule, with local amendments. The edition in force where the panel is installed, and the local amendments, govern. Confirm both before the design is final.',
      },
    ],
    faqs: [
      {
        q: 'Does every control panel need a UL listing?',
        a: 'The code requires the short-circuit current rating and the nameplate, and permits the authority to require a listing or field evaluation. In practice most jurisdictions expect a listed panel, and a listing avoids a field evaluation at the site. Build to the standard.',
      },
      {
        q: 'Who is responsible for the available fault current?',
        a: 'The installation side: the engineer of record or the installer documents the available fault current at the service and at the panel. The panel builder supplies the rating; the engineer must make sure the rating exceeds the available current.',
      },
      {
        q: 'Can 24 volt instrument wiring share a wireway with 120 volt control wiring?',
        a: 'Class 2 conductors are kept separate from Class 1 and power conductors unless the code separation conditions are met, and noise considerations argue for separation anyway. Separate wireways in the panel and separate conduits in the field.',
      },
      {
        q: 'Is a control panel a service disconnect?',
        a: 'Not unless it is built and listed as service equipment. A panel fed from a service needs the service disconnect upstream, or must itself carry a service-rated listing, which is a different design.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/ul-508a',
      '/controls/control-panels/panel-design/sccr',
      '/controls/control-panels/panel-design/ul-698a',
      '/engineering-library/standards/nfpa',
      '/how-to/panel-how-to/calculate-sccr',
      '/controls/control-panels/panel-troubleshooting/ground-faults',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/ul-698a',
    kind: 'reference',
    title: 'UL 698A',
    summary:
      'Industrial control panels for hazardous locations: what UL 698A adds to UL 508A, a panel in a classified area or a safe-area panel with intrinsically safe circuits, barriers and isolators, the control drawing, and where utilities meet classified areas.',
    answer:
      'UL 698A is the listing standard for industrial control panels that relate to hazardous locations, in two ways: a panel that is itself installed in a classified area, which must be built in an enclosure and with components suitable for that classification, and a panel in an unclassified area that contains intrinsically safe barriers or isolators for circuits that go into a classified area, which is by far the more common case in water and wastewater. The second kind is built to UL 508A for its ordinary parts, with the intrinsically safe apparatus, its separation from other circuits, its wiring, and its control drawing meeting the additional requirements. Wet wells, headworks, digesters, and chemical rooms are the classified locations of the industry, and the level transmitters, floats, and gas detectors in them are the circuits that pass through the barriers.',
    keyPoints: [
      'Two cases: a panel in a classified area, or a panel in a safe area with intrinsically safe circuits entering a classified area.',
      'Intrinsically safe barriers or isolators, their separation and wiring, and the control drawing are the additional requirements.',
      'Wet wells, headworks, digesters, and some chemical rooms are the classified areas of a water utility.',
      'Field wiring methods and seals at the boundary are installation requirements alongside the panel listing.',
      'The control drawing ties the barrier, the field device, and the cable parameters together and must be kept with the panel.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['UL 508A', 'Panels', 'Standards', 'Design', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'Two kinds of panel' },
      {
        t: 'table',
        head: ['Panel', 'Where', 'What the listing covers'],
        rows: [
          ['Panel in a classified location', 'Inside the Division 1 or 2 area', 'Enclosure and components suitable for the class, division, and group; purged, explosion-proof, or nonincendive as applicable'],
          ['Panel with intrinsically safe circuits', 'In an unclassified area, circuits into the classified area', 'The barriers or isolators, their mounting and separation, wiring identification, and the control drawing'],
        ],
      },
      {
        t: 'p',
        text: 'Almost every water and wastewater application is the second kind: the panel is in the electrical room or on the lift station pad, and the wet well is the classified area. The float switches, the level transmitter, and sometimes a gas detector are in the wet well, and their circuits pass through intrinsically safe barriers in the panel. The panel is a UL 508A panel with a UL 698A element.',
      },
      { t: 'h2', text: 'Intrinsic safety in the panel' },
      {
        t: 'dl',
        items: [
          { term: 'Barrier or isolator', def: 'A listed device that limits the energy delivered to the field circuit; Zener barriers need a high-integrity ground, galvanic isolators do not. The device is listed for the class, division, and group of the field area and has entity parameters.' },
          { term: 'Entity parameters', def: 'The maximum voltage, current, and power the barrier can deliver, and the capacitance and inductance it can tolerate, matched against the field device parameters and the cable. The match is the control drawing.' },
          { term: 'Separation', def: 'Intrinsically safe wiring is separated from non-intrinsically safe wiring by distance or a partition, kept in its own wireway, and identified, usually with light blue.' },
          { term: 'Grounding', def: 'Zener barriers require a dedicated ground path of low resistance to the system ground; the control drawing states it.' },
          { term: 'Control drawing', def: 'The document that lists the barrier, the field device, the cable limits, and the installation conditions; it is part of the panel and of the installation.' },
        ],
      },
      { t: 'h2', text: 'Where the classified areas are' },
      {
        t: 'table',
        head: ['Location', 'Typical classification', 'Note'],
        rows: [
          ['Wet well', 'Class I, Division 1 within the well; Division 2 around the hatch', 'NFPA 820 is the reference for wastewater facilities'],
          ['Headworks and screening rooms', 'Division 1 or 2 depending on ventilation', 'Ventilation rate changes the classification'],
          ['Digesters and gas handling', 'Division 1 near gas equipment', 'Methane'],
          ['Chemical rooms', 'Depends on the chemical', 'Corrosion is often the larger issue'],
          ['Water plant', 'Usually unclassified', 'Except for fuel, chlorine gas rooms have their own rules'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'NFPA 820',
        text: 'NFPA 820, the standard for fire protection in wastewater treatment and collection facilities, is where the classification of wet wells, headworks, and digester areas comes from. The area classification drawing for the plant should cite it, and the panel design follows the drawing.',
      },
      { t: 'h2', text: 'Installation side' },
      {
        t: 'ul',
        items: [
          'Conduit seals at the boundary of the classified area for the wiring methods that require them.',
          'Cable and conduit types suitable for the location.',
          'The field device listed or approved for the location and matched to the barrier on the control drawing.',
          'The cable capacitance and inductance within the control drawing limits, which for long runs means checking.',
          'A purge system, where a panel in a classified area uses one, with its alarms and interlocks.',
        ],
      },
      { t: 'h2', text: 'Habits' },
      {
        t: 'ul',
        items: [
          'Keep the control drawing in the panel pocket and in the engineering library.',
          'Replace a barrier only with the same model or one whose parameters are verified against the drawing.',
          'Do not add a non-intrinsically safe circuit to the intrinsically safe wireway, ever.',
          'Test the barrier ground periodically where Zener barriers are used.',
          'Treat a float switch replacement as an intrinsic safety change: same rating, same drawing.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I use a relay instead of a barrier for the floats?',
        a: 'Not for a circuit into a Division 1 wet well. The float circuit must be intrinsically safe, which means a listed barrier or isolator with a control drawing, or the float and its wiring must be otherwise suitable for the location. Intrinsically safe float relays exist and are listed as barriers.',
      },
      {
        q: 'Do I need UL 698A if the panel is outside the wet well?',
        a: 'If circuits from the panel enter the classified area through intrinsically safe barriers, the panel falls under UL 698A for that element. The panel shop that builds hazardous location panels carries that listing scope.',
      },
      {
        q: 'What about the level transmitter in the wet well?',
        a: 'A submersible or radar transmitter in a Division 1 wet well is either intrinsically safe through a barrier, or explosion-proof with the appropriate seals. Most designs use an intrinsically safe loop through a barrier or isolator with a control drawing.',
      },
      {
        q: 'Who classifies the area?',
        a: 'The engineer of record on the area classification drawing, using NFPA 820 and the code. The panel designer works from that drawing and does not classify areas.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/ul-508a',
      '/controls/control-panels/panel-design/nfpa-70',
      '/controls/instrumentation/level/floats',
      '/controls/instrumentation/level/wet-well-level',
      '/engineering-library/standards/ul',
      '/engineering-library/standards/nfpa',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/wireways',
    kind: 'reference',
    title: 'Wireways',
    summary:
      'Panel wireway design: fill limits and the space terminations need, separating power, control, and signal wiring, routing around heat and drives, sizing rules, the cases where wireway is the wrong choice, and the habits that keep a panel serviceable.',
    answer:
      'Wireway is the slotted plastic duct that organizes the wiring inside a panel, and its design decides whether the panel can be wired, tested, and modified without cutting anything. The rules are simple: fill it to no more than about half its cross-section so wires can be added and traced, size it for the conductors that will actually run through it plus the growth the panel will see, keep power, control, and signal wiring in separate ducts or at least separate sections, route it so that every terminal has a wireway within reach and the wire lengths are short, and keep it away from the heat of drives and transformers and the noise of drive output cables. Wireway that is too small, too full, or shared between drive power and instrument signals is where a panel becomes both unmaintainable and noisy.',
    keyPoints: [
      'Fill to about half; a full wireway cannot be traced, added to, or closed.',
      'Separate power, control, and signal wiring in separate wireways; drive output cables get their own path.',
      'Size from the conductor count and size with growth, not from what fits today.',
      'Every terminal strip has a wireway beside it; wires run from device to wireway to terminal, never across open space.',
      'Keep wireway out of the heat above transformers and drives and below the depth of the deepest component.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Panels', 'Design', 'UL 508A', 'Grounding', 'Signals'],
    blocks: [
      { t: 'h2', text: 'Fill and sizing' },
      {
        t: 'p',
        text: 'The conductor area in a wireway should not exceed about half of the internal cross-section, and less is better in a panel that will be modified. The area is computed from the number and size of conductors with insulation, and the sum is compared with the duct area. Growth of a quarter to a third is added at design. A common failing is a wireway sized for the schematic and then filled by the field wiring, the shield drains, the ferrules, and the slack, so that the cover will not close; the answer is a deeper or wider duct in the layout, not a hammer.',
      },
      {
        t: 'table',
        head: ['Nominal wireway', 'Internal area, roughly', 'Practical conductor count at half fill'],
        rows: [
          ['1 by 2 inch', 'About 1.7 square inches', 'Around 40 to 50 of 16 AWG, fewer with ferrules and shields'],
          ['1.5 by 3 inch', 'About 4 square inches', 'Around 100 of 16 AWG, or a mixed bundle of 14 and 12 AWG control'],
          ['2 by 3 inch', 'About 5.5 square inches', 'Power feeders to several starters, or a busy control section'],
          ['3 by 3 inch', 'About 8.5 square inches', 'Main power runs and large motor leads'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Compute it',
        text: 'The numbers above are for a sense of scale; the panel builder computes the fill from the conductor list and the manufacturer data for the duct. A layout drawing that states the fill for each duct is a sign of a panel that was designed rather than assembled.',
      },
      { t: 'h2', text: 'Separation' },
      {
        t: 'ul',
        items: [
          'Power wiring above 120 volts in its own wireway, with the drive output cables routed separately and as short as possible.',
          '120 volt control wiring in its own wireway, or separated from power by a partition.',
          '24 volt discrete, analog signal, and network wiring together only if they are all low voltage and none is a noise source; analog and network away from anything switched.',
          'Intrinsically safe wiring in a dedicated, identified wireway with the required separation.',
          'Crossings at right angles where separation cannot be maintained, with the crossing kept short.',
        ],
      },
      { t: 'h2', text: 'Routing' },
      {
        t: 'p',
        text: 'Wireway runs horizontally along the top and bottom of each row of components and vertically between columns, so that every device has a duct within a few inches of its terminals and every wire runs device to duct to terminal. Terminal strips have a duct alongside for the field wiring, sized for the field conductors, which are larger and stiffer than the panel wiring. The layout keeps ducts away from the top of transformers and drives, where the heat is, and clear of the depth of deep components so that the cover can be removed with the panel live. A duct that has to be removed to reach a device is a duct in the wrong place.',
      },
      { t: 'h2', text: 'Details that matter' },
      {
        t: 'dl',
        items: [
          { term: 'Fingers', def: 'The slots in the duct wall; the wire exits through the finger nearest the terminal, and fingers are broken out cleanly, never leaving sharp edges.' },
          { term: 'Covers', def: 'Covers stay on in a finished panel; a panel that ships with covers in a bag has a fill problem.' },
          { term: 'Radius', def: 'Duct corners and wire exits respect the conductor bend radius, especially for shielded and network cable.' },
          { term: 'Wire dressing', def: 'Wires enter the duct at right angles with a little slack, not pulled taut across the finger edge.' },
          { term: 'Labeling', def: 'Wire labels are placed where they can be read at the terminal, which means the label is outside the duct.' },
          { term: 'Shield drains', def: 'Shield drains are terminated at the ground bar close to where the cable enters, not run the length of the panel in the signal duct.' },
        ],
      },
      { t: 'h2', text: 'When not to use wireway' },
      {
        t: 'ul',
        items: [
          'Drive output cables of any size: route directly, short, and away from everything, in a shielded cable where the drive requires it.',
          'Large feeders: cable ties and standoffs, or a dedicated large duct.',
          'Fiber patch cords: a dedicated tray or a fiber management panel with radius control.',
          'Very small panels: point-to-point wiring with proper dressing can be cleaner than duct that fills the box.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can 24 volt instrument wiring and 120 volt control share a wireway?',
        a: 'They can be run together only where the code separation rules allow and the noise is acceptable, and in practice a shared duct makes the analog signals noisy. Separate ducts, or a partition, are the standard.',
      },
      {
        q: 'How much growth should I allow?',
        a: 'A quarter to a third of the fill at design, more on a panel for a plant that changes often. Spare terminals and spare I/O without spare wireway are wasted.',
      },
      {
        q: 'Metal or plastic wireway?',
        a: 'Plastic slotted duct for panel wiring, in a flame-rated grade. Metal wireway is an installation product for runs between enclosures and is not a substitute for panel duct.',
      },
      {
        q: 'The wireway is full and I need to add three wires.',
        a: 'Remove the cover, add the wires, and note in the change record that the duct is over fill; then plan a duct replacement at the next outage. Cutting the cover or leaving it off is how panels catch stray wires.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/panel-design/terminals',
      '/controls/control-panels/panel-troubleshooting/noise-problems',
      '/controls/control-panels/panel-design/heat-calculations',
      '/engineering-library/drawings/panel-layouts',
      '/troubleshooting/noise-interference/cable-routing-problems',
    ],
  },
  {
    path: '/controls/control-panels/panel-design/terminals',
    kind: 'reference',
    title: 'Terminals',
    summary:
      'Designing the terminal strips of a control panel: grouping by voltage and function, numbering that matches the drawings, fused and disconnect terminals for instrument loops, shield and ground terminals, spares, ferrules and torque, and the terminal schedule.',
    answer:
      'The terminal strips are where the panel meets the field, and their design decides how long every commissioning and every troubleshooting session takes. Terminals are grouped by voltage class and function, with power, 120 volt control, 24 volt discrete, analog, and network each on its own strip and each strip separated and labeled; every terminal carries a number that appears on the schematic and in the terminal schedule; instrument loops use fused or disconnect terminals so that a loop can be isolated and tested without lifting wires; shields land on their own terminals or a bar with a defined ground; and a fifth to a quarter of each strip is spare. The terminal schedule, which lists every terminal, its wire numbers, and what is on the other end, is the document that turns a cabinet of wires into something a technician can read.',
    keyPoints: [
      'Group strips by voltage class and function, and separate them physically and by label.',
      'Number terminals to match the schematic and the terminal schedule; the number is the address of the wire.',
      'Fused or disconnect terminals on instrument loops make testing possible without lifting wires.',
      'Shields land on dedicated terminals or a bar with one defined ground point.',
      'Reserve spares on every strip and record them in the schedule.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Panels', 'Design', 'Documentation', 'UL 508A', 'Commissioning'],
    blocks: [
      { t: 'h2', text: 'Grouping' },
      {
        t: 'table',
        head: ['Strip', 'Contents', 'Notes'],
        rows: [
          ['Power', 'Incoming supply, motor leads, and feeders', 'Sized for the conductors; barriers between phases where required; often power distribution blocks instead'],
          ['120 volt control', 'Control transformer secondary distribution, field switches, and 120 volt outputs', 'Fused terminals for branch distribution; a neutral bar if the circuit is grounded'],
          ['24 volt discrete', 'Field inputs and outputs at 24 volts', 'Two-level or three-level terminals save space; commons on the lower level'],
          ['Analog', 'Loop positive and negative, and the shield', 'Fused or disconnect terminals, one per loop, with shield terminals alongside'],
          ['Network and serial', 'Ethernet and fieldbus', 'Ethernet usually on patch panels or couplers rather than screw terminals; serial on shielded pairs'],
          ['Intrinsically safe', 'Barrier field side', 'Separate, identified, and spaced per the control drawing'],
          ['Ground', 'Equipment grounds and shield drains', 'Ground bars bonded to the enclosure; the instrument ground bar with its single bond'],
        ],
      },
      { t: 'h2', text: 'Numbering' },
      {
        t: 'p',
        text: 'Each terminal strip has a designation, typically the letters TB and a number or the voltage class, and each terminal a number within the strip. The schematic shows the strip and the terminal at every field connection, the wire number is on both ends of the wire, and the terminal schedule lists strip, terminal, wire number, device, and field destination. The convention is chosen once for the plant and used on every panel, so that a technician who knows one panel knows them all. Renumbering an existing panel is a project with a wire-by-wire check, and the reason to get it right at the start.',
      },
      { t: 'h2', text: 'Instrument loops' },
      {
        t: 'p',
        text: 'A 4 to 20 milliamp loop lands on a pair of terminals with the shield beside them. A fused terminal on the positive side protects the loop supply and gives a place to isolate the loop; a disconnect or knife terminal on the negative side gives a place to open the loop for a meter in series or to insert a signal source, without lifting a wire. Test points on the terminal accept meter probes. A panel with plain terminals for its loops is a panel where every loop check means a loosened screw, and every loosened screw is a future intermittent.',
      },
      { t: 'h2', text: 'Shields and grounds' },
      {
        t: 'ul',
        items: [
          'Shield drains land on shield terminals or a shield bar, not on a signal terminal or a random ground screw.',
          'The shield bar is bonded to the instrument ground bar, which is bonded to the enclosure ground at one point; the design drawing shows the point.',
          'The shield is grounded at one end only, which for panel-to-field cables is the panel end; the field end is insulated and folded back.',
          'Shield continuity through junction boxes is carried on a terminal, insulated from the box.',
        ],
      },
      { t: 'h2', text: 'Workmanship' },
      {
        t: 'dl',
        items: [
          { term: 'Ferrules', def: 'Stranded conductors get ferrules, crimped with the right tool, one conductor per ferrule unless a twin ferrule is used for a documented purpose.' },
          { term: 'One wire per terminal', def: 'Or two where the terminal is rated for it and the drawing shows it; jumpers use the terminal jumper bars, not extra wires.' },
          { term: 'Torque', def: 'Screw terminals torqued to the manufacturer value; spring terminals used where vibration or many connections argue for them.' },
          { term: 'Labels', def: 'Terminal markers on every terminal, strip designations on the end brackets, and wire labels readable at the terminal.' },
          { term: 'Spares', def: 'At least a fifth of each strip spare, labeled as spare in the schedule, and left empty.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The terminal schedule',
        text: 'A spreadsheet or a drawing sheet listing every terminal with its wire number, the device it serves, the field destination, and the cable. It is generated from the schematic, updated with every change, and kept in the panel pocket. Without it, every field wire is traced by hand.',
      },
    ],
    faqs: [
      {
        q: 'Screw or spring terminals?',
        a: 'Both are acceptable in a listed panel. Spring terminals are faster, vibration resistant, and need no torque check; screw terminals accept a wider range of conductors and are what many field electricians expect. Pick one per plant and use ferrules with either.',
      },
      {
        q: 'Where should the field wires land, on the terminal strip or directly on the I/O module?',
        a: 'On the terminal strip. Direct landing on a module saves terminals and costs every module replacement, every loop test, and every schematic that then has to show module terminals as field terminals.',
      },
      {
        q: 'How many spares?',
        a: 'A fifth to a quarter of each strip, plus a spare strip section in the wireway plan. Spares cost little at build and a great deal at retrofit.',
      },
      {
        q: 'Should I use multi-level terminals?',
        a: 'For discrete I/O, yes: a three-level terminal carries signal, common, and ground in one width, and the strip is a third the length. Label the levels and show them on the schematic; a three-level strip drawn as single terminals is a trap.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/terminal-blocks',
      '/controls/control-panels/panel-design/wireways',
      '/how-to/panel-how-to/build-terminal-schedules',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/engineering-library/drawings/schematics',
      '/controls/instrumentation/calibration/loop-checks',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/surge-devices',
    kind: 'reference',
    title: 'Surge Devices',
    summary:
      'Surge protective devices in a control panel: the types and where each belongs, the ratings that matter, supply protection, signal and network protection on conductors that leave the building, stage coordination, grounding, indication, and replacement.',
    answer:
      'A surge protective device diverts a transient, from lightning or from switching, to ground before it reaches the electronics, and it only works when it is close to what it protects, bonded to ground by a short straight conductor, and rated for the exposure. A control panel needs protection at the supply, where a Type 2 device at the panel entrance clamps what comes in on the power conductors; on every signal, serial, and network conductor that leaves the building or runs to a mast, where a two-stage signal protector clamps and then limits; and on the antenna feed of a radio, where a coaxial arrestor and a grounded mast carry the strike away. The devices are coordinated so that the one nearest the exposure takes most of the energy, and each has an indicator or a monitoring contact, because a surge device that has sacrificed itself protects nothing.',
    keyPoints: [
      'Protect three things: the power supply to the panel, every signal or network conductor that leaves the building, and the radio antenna feed.',
      'A surge device is only as good as its ground lead: short, straight, and bonded to the same ground as the equipment.',
      'Match the type and rating to the location: Type 1 or 2 at the entrance, signal-rated devices on loops, coaxial arrestors on antennas.',
      'Coordinate stages so that the upstream device takes the energy and the downstream device clamps the remainder.',
      'Monitor and replace: every device has an indicator or a contact, and a surge device that has failed is the site with no protection.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Power', 'Signals', 'Grounding', 'Telemetry'],
    blocks: [
      { t: 'h2', text: 'Types and locations' },
      {
        t: 'table',
        head: ['Where', 'Device', 'Notes'],
        rows: [
          ['Service entrance', 'Type 1 surge protective device', 'Installed by the electrical contractor at the service; takes the direct exposure'],
          ['Panel supply', 'Type 2 surge protective device at the panel entrance', 'After the disconnect, ahead of the control transformer and power supplies; sized for the voltage and the exposure'],
          ['Control transformer secondary and 24 volt supply', 'Type 3 or a low-voltage device', 'Optional third stage close to sensitive loads'],
          ['4 to 20 milliamp loops and discrete field circuits leaving the building', 'Two-stage signal protector, DIN rail or terminal type', 'Rated for the loop voltage; one per pair; located where the cable enters the panel'],
          ['Serial and fieldbus', 'Data line protector for the bus type', 'Rated for the signal level and the data rate; both ends of a long bus'],
          ['Ethernet leaving the building', 'Ethernet surge protector, or fiber instead', 'Fiber removes the problem; copper needs a protector rated for the data rate and power over Ethernet if used'],
          ['Radio antenna', 'Coaxial lightning arrestor at the entry', 'Bonded to the entrance ground; the mast grounded separately'],
        ],
      },
      { t: 'h2', text: 'Ratings' },
      {
        t: 'dl',
        items: [
          { term: 'Voltage rating', def: 'The nominal system voltage and the maximum continuous operating voltage; a device rated too low clamps on normal voltage and fails.' },
          { term: 'Voltage protection rating', def: 'The let-through voltage under the test surge; lower is better, and it should be below what the protected equipment survives.' },
          { term: 'Surge current rating', def: 'The energy the device can divert; higher for the entrance device, lower for downstream stages.' },
          { term: 'Short-circuit current rating', def: 'The device must be rated for the available fault current where it is installed, or protected by a fuse or breaker that is.' },
          { term: 'Signal device parameters', def: 'Working voltage, clamping voltage, series resistance, bandwidth, and whether it passes loop power; a signal protector with the wrong working voltage clamps the signal itself.' },
        ],
      },
      { t: 'h2', text: 'Grounding is the device' },
      {
        t: 'p',
        text: 'A transient of a few thousand amperes rising in a microsecond develops hundreds of volts across every foot of ground lead, so a surge device with a three foot lead lets most of the transient through. The lead is as short as the layout allows, straight without loops, in a conductor size the manufacturer specifies, and bonded to the same ground reference as the equipment being protected. The ground bar the device lands on is bonded to the enclosure and to the building grounding electrode system by a short path. Signal protectors mount on a grounded rail where the cable enters, with the field cable shield bonded at the same point, so that the surge on the shield and the surge on the conductors go to the same place.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A long ground lead is no protector',
        text: 'A surge device mounted in the middle of a panel with a ground lead run around the wireway to a bar on the far side is decoration. Mount it where the ground is, at the entrance, with the shortest lead the layout permits, and route the protected conductors so that they do not run beside the unprotected ones afterward.',
      },
      { t: 'h2', text: 'Coordination' },
      {
        t: 'p',
        text: 'Protection is staged: the entrance device takes the bulk of the energy and lets through a clamped remainder; the panel device clamps that remainder lower; a device at the load, if present, handles what is left. The stages need distance between them, which the conductor length provides, so that the upstream device conducts first. Two devices of the same rating mounted side by side do not share; one takes it all. The manufacturer data states the coordination distance, and the panel design uses it.',
      },
      { t: 'h2', text: 'Indication and replacement' },
      {
        t: 'ul',
        items: [
          'Every surge device has a visual indicator, and the ones that protect critical equipment have a monitoring contact wired to an alarm.',
          'Signal protectors on loops are checked during loop checks, since a failed one either opens the loop or leaves it unprotected.',
          'A site that took a lightning hit gets every surge device inspected, and the ones that clamped hard replaced.',
          'Spares for the common types on the shelf; the device that fails is the one on the path the next storm uses.',
        ],
      },
      { t: 'h2', text: 'Mistakes that leave a site unprotected' },
      {
        t: 'ul',
        items: [
          'A power surge device with no signal protection: the strike comes in on the level transmitter cable.',
          'Signal protectors on the loop but not on the shield or the field ground: the surge arrives on the shield.',
          'A radio arrestor bonded to a ground rod that is not bonded to the panel ground: the potential difference destroys the radio.',
          'A protector whose working voltage is below the loop supply, so it clamps the loop itself.',
          'A device that failed two storms ago and nobody looked at the indicator.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need surge protection inside the plant on loops that never leave the building?',
        a: 'Rarely for lightning, since the building bonding limits the exposure; sometimes for switching transients near large drives. The loops that leave the building, cross between buildings, or run to a mast are the ones that need it.',
      },
      {
        q: 'Fiber or a surge protector on the Ethernet link between buildings?',
        a: 'Fiber. It removes the conductor entirely and with it the surge, the ground loop, and the noise. A copper link between buildings with protectors at each end is a compromise for short runs where fiber is impractical.',
      },
      {
        q: 'Will a surge device protect against a direct strike on the antenna?',
        a: 'A coaxial arrestor with a properly grounded mast survives most strikes and protects the radio from most of them; a direct strike on a poorly grounded mast destroys the radio and often the panel. The mast ground, the arrestor, and the panel ground bonded together are the protection; the arrestor alone is not.',
      },
      {
        q: 'How do I know a surge device has failed?',
        a: 'The indicator window or light on the device, the monitoring contact if wired, or a loop that reads open. Devices that fail short trip their fuse; devices that fail open give no indication except an inspection, which is why the schedule includes one.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/surge-protection',
      '/how-to/panel-how-to/select-surge-protection',
      '/controls/control-panels/plc-panels/panel-surge-protection',
      '/troubleshooting/radio-troubleshooting/remote-site-stops-communicating',
      '/controls/instrumentation/signals/ground-loops',
      '/troubleshooting/grounding-troubleshooting/missing-equipment-ground',
    ],
  },
  {
    path: '/controls/control-panels/panel-components/network-switches',
    kind: 'reference',
    title: 'Network Switches',
    summary:
      'Selecting and installing the Ethernet switch in a control panel: managed against unmanaged, industrial ratings and DIN rail mounting, ports and media including fiber, ring protocols, power and grounding, and the configuration documented with the panel.',
    answer:
      'The network switch in a control panel is a piece of control equipment and is specified like one: industrially rated for the panel temperature, mounted on the rail with a 24 volt supply and a grounded chassis, with enough ports of the right media for the devices in the panel plus the uplinks plus spares, and managed where the network needs anything more than a link. A managed switch gives port diagnostics, virtual networks, ring redundancy, multicast filtering for remote I/O, port security, and an alarm contact, all of which a plant network uses; an unmanaged switch gives a link and nothing else, and belongs only in the smallest panel with no redundancy and no segmentation. Fiber ports for the uplinks that leave the building, a documented configuration backed up with the panel drawings, and a firmware version in the asset inventory complete the specification.',
    keyPoints: [
      'Managed switches for anything with redundancy, segmentation, remote I/O, or diagnostics; unmanaged only for the simplest isolated panel.',
      'Industrial rating for the panel temperature, DIN rail mounting, 24 volt supply, chassis grounded.',
      'Fiber uplinks for any link leaving the building; copper inside the panel and the room.',
      'Ring or redundancy protocols must match across every switch and device in the ring.',
      'The configuration is part of the panel documentation: backed up, versioned, and restorable.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Networking', 'Ethernet', 'Design', 'Cybersecurity'],
    blocks: [
      { t: 'h2', text: 'Managed or unmanaged' },
      {
        t: 'table',
        head: ['Capability', 'Unmanaged', 'Managed'],
        rows: [
          ['Port status and error counters', 'Link light only', 'Full counters per port'],
          ['Virtual networks', 'No', 'Yes'],
          ['Ring or redundancy protocols', 'No; a loop is a storm', 'Yes, with the matching protocol'],
          ['Multicast filtering for remote I/O', 'Floods every port', 'Group management and querier'],
          ['Port security, disabled ports', 'No', 'Yes'],
          ['Alarm contact and monitoring', 'No', 'Contact output and network management'],
          ['Configuration backup', 'Nothing to back up', 'Configuration file, versioned'],
          ['Where it belongs', 'A small isolated panel with a controller and a touchscreen', 'Everything else'],
        ],
      },
      { t: 'h2', text: 'Specification' },
      {
        t: 'dl',
        items: [
          { term: 'Environmental', def: 'Operating temperature covering the panel interior at summer maximum, which is above the room temperature; conformal coating for corrosive rooms; no fans.' },
          { term: 'Mounting and power', def: 'DIN rail, 24 volt DC from the panel supply, redundant power inputs where the switch supports them, an alarm contact for power loss.' },
          { term: 'Ports', def: 'Copper ports for the devices in the panel plus two spares; fiber ports or transceiver slots for uplinks; power over Ethernet where cameras or access points hang off the switch, with the power budget checked.' },
          { term: 'Media', def: 'Single-mode fiber for building-to-building; multimode acceptable inside a building; copper limited to 100 meters and never between grounds.' },
          { term: 'Protocols', def: 'The ring protocol used by the plant, spanning tree as the fallback, group management for multicast, time synchronization pass-through, and the management protocol the network monitor uses.' },
          { term: 'Security', def: 'Management on a dedicated network or virtual network, encrypted management access, unused ports disabled, port security where the design needs it, and a logged configuration.' },
          { term: 'Listing', def: 'Recognized or listed for use in the panel, with the ratings the panel standard requires.' },
        ],
      },
      { t: 'h2', text: 'In the panel' },
      {
        t: 'ul',
        items: [
          'Mounted where the patch cords reach the devices without crossing the power wireway; a small patch panel or couplers for the field cables.',
          'Chassis grounded to the panel ground bar; shielded copper cables bonded at the switch end.',
          'Fiber patch cords in a management tray or with radius protection, not in the wireway with the power conductors.',
          'Labels on every port matching the network schedule; a port label that says which device is on it saves a site visit.',
          'The alarm contact wired to a controller input and alarmed.',
        ],
      },
      { t: 'h2', text: 'Configuration' },
      {
        t: 'p',
        text: 'A managed switch has a configuration: addresses, virtual networks, port assignments, ring settings, multicast settings, management accounts, and logging. It is built from the network drawing and the network schedule, saved as a file, and stored with the panel documentation and in the backup set, so that a failed switch is replaced by loading the file into a spare. The firmware version is recorded in the asset inventory and updated through the patch process. Default accounts are removed, the management interface is on the management network only, and the configuration is compared with the file after any change.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The spare',
        text: 'A spare switch of the same model, with the plant base configuration loaded and a label saying so, is on the shelf. A switch failure is then a rail swap and a configuration load, not a night of building one from memory.',
      },
      { t: 'h2', text: 'Ring topologies' },
      {
        t: 'p',
        text: 'Panels at a plant are often linked in a ring of switches so that one cable failure does not isolate a panel. The ring works only when every switch runs the same ring protocol with the same settings, one is the manager, and no device in the ring lacks the protocol. The network drawing shows the ring, the ring status is monitored, and a break is alarmed and repaired, because a ring with one break is a line with no redundancy. Devices with two ports that support the ring protocol can be in the ring; devices that do not are connected to a switch port, not spliced into the ring.',
      },
    ],
    faqs: [
      {
        q: 'Can I use an office switch in a control panel?',
        a: 'It will work until it does not: it is rated for an office temperature, it has a fan or a wall adapter, and it is not listed for the panel. An industrial switch costs more and is a control component; use one.',
      },
      {
        q: 'How many spare ports?',
        a: 'Two at minimum, more on a panel that will grow. A switch with no spare ports is replaced the day a camera is added.',
      },
      {
        q: 'Do I need a managed switch in a lift station?',
        a: 'If the station has a controller, a drive on Ethernet, a touchscreen, and a radio, and the design segments the radio from the drives, yes. A station with a controller and a radio on a two-port controller may not need a switch at all.',
      },
      {
        q: 'Should the switch be on the UPS?',
        a: 'Yes, along with the controller and the radio; a switch that drops on a power blip takes the communications down while the controller rides through.',
      },
    ],
    related: [
      '/controls/control-panels/plc-panels/panel-networking',
      '/troubleshooting/network-troubleshooting/broadcast-storm',
      '/troubleshooting/network-troubleshooting/switch-port-errors-incrementing',
      '/cybersecurity/network-segmentation/vlan-segmentation',
      '/engineering-library/lists-schedules/network-schedules',
      '/controls/control-panels/panel-components/ups',
    ],
  },
  {
    path: '/controls/control-panels/panel-troubleshooting/blown-fuses',
    kind: 'reference',
    title: 'Blown Fuses',
    summary:
      'Working a blown fuse in a control panel: reading the circuit before replacing anything, fault against overload, finding a short by sectioning, the transformer and power supply cases, fuse types that must match, indicating holders, and replacement rules.',
    answer:
      'A fuse that blew did its job, and replacing it with the same rating and finding it blows again is the second half of a diagnosis, not a repair. The circuit the fuse protects, read from the schematic, tells you what could have drawn the current: a short to ground in the field wiring, a solenoid or a relay coil that has failed, a transformer with a shorted winding, a power supply with a shorted output, a device that was wired wrong during recent work, or a load that has grown past what the fuse was sized for. A meter across the open fuse with the circuit live shows whether the fault is still there; an ohmmeter with the circuit dead and sectioned, one branch at a time, finds where it is. The replacement is the same type, class, and rating as the drawing, because a larger fuse turns a protected circuit into an unprotected one.',
    keyPoints: [
      'Read the schematic for what the fuse protects before touching it; the circuit names the suspects.',
      'A fuse that blows immediately is a short; one that blows after minutes is an overload or a failing component.',
      'Section the circuit with the power off and an ohmmeter, one branch at a time, until the short is isolated.',
      'Replace with the same type, class, voltage, and current rating shown on the drawings; never larger.',
      'Indicating fuse holders and a monitored fuse alarm turn a blown fuse into a diagnosis instead of a mystery.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Troubleshooting', 'Power', 'NEC', 'UL 508A'],
    blocks: [
      { t: 'h2', text: 'Before replacing' },
      {
        t: 'steps',
        items: [
          { title: 'Identify the circuit', text: 'The fuse designation on the holder and the schematic sheet it protects: the control transformer secondary, a 24 volt branch, an output, a loop supply.' },
          { title: 'Ask what changed', text: 'Recent work, a new device, a storm, a wet junction box, a motor that failed. The event usually precedes the fuse.' },
          { title: 'Look', text: 'A fuse that blew violently has a darkened window and a fault; one that opened quietly had an overload. Scorched wiring, a hot coil, or water in a box in the same circuit is the answer.' },
          { title: 'Measure across the open fuse', text: 'With the circuit live and the fuse open, the voltage across the holder equals the supply if the circuit is complete downstream; the current a replacement would carry can be estimated with a clamp meter on a temporary jumper only under controlled conditions and by qualified staff. Most of the time, the ohmmeter route is safer.' },
          { title: 'Section', text: 'Power off, locked out. Disconnect the branches the fuse feeds at their terminals and measure resistance to ground and across the load on each. The branch with the short, or the coil reading a fraction of its rating, is the fault.' },
          { title: 'Fix, then replace', text: 'Repair the wiring, replace the failed device, dry the box, and only then fit a fuse of the correct rating and test.' },
        ],
      },
      { t: 'h2', text: 'Fault or overload' },
      {
        t: 'table',
        head: ['Behavior', 'Meaning', 'Look for'],
        rows: [
          ['Blows instantly on power-up', 'A short circuit', 'Ground fault in field wiring, a shorted coil, a wiring error, water'],
          ['Blows when a specific output energizes', 'A short in that branch', 'The solenoid, the cable, the junction box of that output'],
          ['Blows after minutes or hours', 'An overload or a component failing hot', 'A transformer or supply at its limit, a coil that has degraded, a load that grew'],
          ['Blows during a storm or a motor start', 'A transient or a sag that raised the current', 'Surge protection, a supply that saturates on sag, an undersized fuse'],
          ['Blows intermittently with nothing found', 'An intermittent short', 'A cable chafing on a conduit edge, a wet box that dries, a relay with a failing coil'],
        ],
      },
      { t: 'h2', text: 'The common cases' },
      {
        t: 'dl',
        items: [
          { term: 'Control transformer secondary fuse', def: 'The whole 120 volt control circuit is dead. A short anywhere on the secondary side, or a transformer overloaded by additions. Section by pulling the branch fuses, then the loads.' },
          { term: 'Transformer primary fuses', def: 'A shorted transformer winding or a secondary fault that the secondary fuse did not clear. Measure the transformer windings with the power off; a primary that reads very low is a failed transformer.' },
          { term: 'Power supply input fuse', def: 'A failed power supply or an overloaded one; the supply output shorted downstream. Measure the 24 volt bus resistance with the supply disconnected.' },
          { term: 'Output fuse', def: 'The field device or its wiring; solenoids in wet places and cables in corroded conduit are the usual answers.' },
          { term: 'Loop fuse', def: 'A grounded loop, a transmitter with a failed input stage, or a surge protector that failed short. Measure the loop resistance with the fuse out.' },
        ],
      },
      { t: 'h2', text: 'Replacement rules' },
      {
        t: 'ul',
        items: [
          'Same type, class, voltage rating, and current rating as the schematic and the panel component list; the listing depends on it.',
          'Time-delay where the drawing says time-delay; a fast fuse in a transformer primary blows on inrush and a time-delay fuse in an electronic circuit lets it burn.',
          'The interrupting rating adequate for the location; a glass fuse in a 480 volt circuit is a bomb.',
          'A supplemental fuse is not a branch circuit device; the class and the holder must match the drawing.',
          'Record the replacement and the cause in the maintenance log.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Never upsize',
        text: 'A fuse rated above the drawing value protects nothing downstream and can start a fire in the conductor it was sized for. If the fuse blows repeatedly at the rated value, the circuit has a fault or the design is overloaded, and either is fixed by engineering, not by a larger fuse.',
      },
      { t: 'h2', text: 'Designing for the next one' },
      {
        t: 'ul',
        items: [
          'Indicating fuse holders or blown-fuse indicators on every control fuse; a glance finds the open one.',
          'A fuse monitoring relay or the indicator contacts wired to a controller input and alarmed, so that SCADA reports a blown fuse before an operator finds a dead station.',
          'One fuse per output group rather than one for the whole panel, so that a shorted solenoid drops one group.',
          'Spare fuses of every type in the panel pocket, labeled, and replenished when used.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The new fuse blew as soon as I turned it on.',
        a: 'The short is still there. Power off, lock out, section the circuit with an ohmmeter, and find it. Fitting a third fuse finds nothing.',
      },
      {
        q: 'The fuse tests good but the circuit is dead.',
        a: 'A fuse can test good out of the holder and fail in it: a corroded holder, a cracked end cap, or a holder clip with no tension. Measure the voltage on both sides of the fuse in the holder under load.',
      },
      {
        q: 'Can I use a breaker instead of a fuse?',
        a: 'A supplementary protector or a breaker of the right type and rating can replace a fuse in many control circuits, as a design change with the drawings updated and the listing reviewed. It is not a field substitution.',
      },
      {
        q: 'Why did the fuse blow during a lightning storm and everything test fine afterward?',
        a: 'A surge came through the circuit and the fuse opened on the transient, or a surge protector clamped and drew the current. Check the surge devices; one of them may have sacrificed itself, and the loop it protected is now unprotected.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/fuses',
      '/troubleshooting/control-panel-troubleshooting/fuse-blows-repeatedly',
      '/controls/control-panels/panel-troubleshooting/no-control-power',
      '/controls/control-panels/panel-troubleshooting/ground-faults',
      '/controls/control-panels/panel-components/panel-power-supplies',
      '/controls/control-panels/panel-components/surge-devices',
    ],
  },
  {
    path: '/controls/control-panels/panel-troubleshooting/failed-power-supplies',
    kind: 'reference',
    title: 'Failed Power Supplies',
    summary:
      'Diagnosing the 24 volt supply in a control panel: dead, low, noisy, or cycling, a failed supply against an overloaded one, loads that grew, heat and capacitor aging, redundant supplies, sag on the input, and what to specify so the next failure is an alarm.',
    answer:
      'The 24 volt supply feeds the controller, the I/O, the instruments, the relays, the network switch, and the radio, so its failure looks like a dead panel or, worse, a panel that half works. It fails in four ways: completely dead, with no output and usually no indicator; low, delivering less than its rating under load; noisy, with ripple or oscillation that upsets analog inputs and communications; or cycling, shutting down on overload or overtemperature and restarting. Each has a measurement: the output voltage under load, the output current against the rating, the ripple on a scope or a meter that reads AC, and the input voltage during the failure. Most supplies that fail did so from heat and age, or because the load grew past the rating as devices were added over the years; the fix is a supply sized for the real load with margin, mounted where it can cool, with a monitored output and, where the panel matters, a redundant pair.',
    keyPoints: [
      'Measure output voltage under load, output current against the rating, and ripple; the three numbers classify the failure.',
      'A supply that cycles is overloaded or overheating, not necessarily failed.',
      'Loads grow: sum the actual current draw of everything on the bus before blaming the supply.',
      'Capacitors age with heat; a supply at the top of a hot panel has a short life.',
      'Specify monitoring, margin, and, for critical panels, a redundant pair with diode coupling.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Troubleshooting', 'Power', 'Design', 'PLC'],
    blocks: [
      { t: 'h2', text: 'Classify the failure' },
      {
        t: 'table',
        head: ['Measurement', 'Result', 'Meaning'],
        rows: [
          ['Input voltage at the supply terminals', 'Absent', 'The problem is upstream: fuse, breaker, transformer, wiring'],
          ['Input present, output voltage', 'Zero, indicator dark', 'The supply has failed, or its internal fuse opened on a downstream short'],
          ['Output voltage with the load disconnected', 'Normal', 'The supply works; the load is the problem, either a short or an overload'],
          ['Output voltage under load', 'Low, drooping', 'Overload, or a supply that has lost capacity with age'],
          ['Output current', 'At or above the rating', 'Overloaded; the load grew or a device is drawing fault current'],
          ['Ripple on the output', 'Well above the specification', 'Aging capacitors; the supply is failing and disturbing the analog signals'],
          ['Output cycling on and off', 'Every few seconds', 'Overload shutdown and restart, or thermal shutdown'],
          ['Input voltage during a motor start', 'Sags below the supply minimum', 'The supply drops out on sag; input problem, not supply'],
        ],
      },
      { t: 'h2', text: 'Working it' },
      {
        t: 'steps',
        items: [
          { title: 'Input', text: 'Voltage at the input terminals; if absent, work upstream: the fuse, the breaker, the transformer, the disconnect.' },
          { title: 'Output unloaded', text: 'Disconnect the output and measure. A dead supply with good input has failed; a supply that recovers when unloaded is overloaded or shorted downstream.' },
          { title: 'Sum the load', text: 'Add the nameplate draw of every device on the 24 volt bus, including the instruments powered from it and the relay coils, and compare with the rating. Then measure the actual current with a clamp meter.' },
          { title: 'Section the bus', text: 'With the supply disconnected, measure the bus resistance to find a short; with the supply connected, remove branches one at a time to find an overload.' },
          { title: 'Ripple and noise', text: 'A meter on AC volts across the output, or a scope; ripple above a few hundred millivolts on a supply rated for tens is a failing supply.' },
          { title: 'Temperature', text: 'The supply case temperature and the panel temperature at its location; a supply derates above its rated ambient and a hot supply fails young.' },
          { title: 'Input sag', text: 'A recording meter on the input during motor starts and generator transfers; a supply with a wide input range or a longer hold-up time survives what a narrow one does not.' },
        ],
      },
      { t: 'h2', text: 'Why supplies fail' },
      {
        t: 'dl',
        items: [
          { term: 'Heat', def: 'Electrolytic capacitors lose capacity with temperature; a supply mounted above a transformer or a drive, or in a panel in the sun without cooling, ages in a few years. Mount it low and clear, with the panel heat calculation done.' },
          { term: 'Load growth', def: 'A supply sized for the original panel with no margin, then loaded with a radio, a switch, a touchscreen, and six more instruments. Sum the load at every change.' },
          { term: 'Downstream shorts', def: 'A shorted field device or cable holds the supply in current limit or cycles it; the supply is fine and the field is not.' },
          { term: 'Input quality', def: 'Sags, surges, and generator transfers on a supply with narrow input tolerance; the supply drops out, restarts, and looks like it failed.' },
          { term: 'Age', def: 'A quality supply lasts a decade or more in a cool panel; one at its rated temperature for ten years is due.' },
        ],
      },
      { t: 'h2', text: 'Redundant supplies' },
      {
        t: 'p',
        text: 'Two supplies with their outputs combined through a redundancy module or diodes share the load and, when one fails, the other carries it. The arrangement needs each supply rated for the whole load, a monitoring contact on each so that a failed supply is alarmed rather than discovered when the second one fails, and inputs from separate breakers, and ideally separate sources, so that one upstream fault does not take both. Without the alarm, redundancy is a way to have a failed supply for years without knowing.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The monitoring contact',
        text: 'Almost every industrial supply has a relay contact that opens when the output is out of tolerance. Wire it to a controller input and alarm it. A panel that reports its own supply failure over SCADA is a panel that gets fixed before the process notices.',
      },
      { t: 'h2', text: 'Specifying the next one' },
      {
        t: 'ul',
        items: [
          'Rated for the measured load plus a third, at the panel maximum temperature with the derating applied.',
          'Wide input range and a hold-up time of at least twenty milliseconds where the site sees sags.',
          'A monitoring contact, wired and alarmed.',
          'Mounted low in the panel with the clearances the manufacturer specifies.',
          'Redundant pair with a redundancy module on panels whose failure stops the process or blinds the SCADA.',
          'A spare of the same model on the shelf.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The supply reads 24 volts but the controller keeps rebooting.',
        a: 'Measure under load during the reboot: the voltage may sag briefly when a load switches, or the ripple may be high. A supply near its limit holds the average voltage and loses it in transients. Reduce the load or replace the supply.',
      },
      {
        q: 'Can I add a second supply in parallel to get more current?',
        a: 'Only with supplies designed for parallel operation and a proper redundancy module or load-sharing setting, and each rated for what it will carry. Two supplies wired together without that fight each other.',
      },
      {
        q: 'The supply is hot to the touch. Is that a failure?',
        a: 'A supply near its rating is warm; one too hot to hold is overloaded, poorly ventilated, or in a hot panel. Measure the current and the ambient, and act before it fails.',
      },
      {
        q: 'Why does the supply fail only on generator power?',
        a: 'The generator waveform or frequency, or the voltage during load steps, is outside the supply input range. A supply with a wider input range, or a small UPS ahead of it, fixes it.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/panel-power-supplies',
      '/troubleshooting/power-troubleshooting/power-supply-failure',
      '/how-to/panel-how-to/size-a-power-supply',
      '/controls/control-panels/plc-panels/plc-power',
      '/controls/control-panels/panel-design/heat-calculations',
      '/troubleshooting/power-troubleshooting/voltage-sag-on-motor-start',
    ],
  },
  {
    path: '/controls/control-panels/panel-troubleshooting/panel-plc-faults',
    kind: 'reference',
    title: 'Panel PLC Faults',
    summary:
      'Working a controller fault from the panel side: reading the indicators before opening the software, faults caused by the panel rather than the program, power and grounding, I/O module and wiring faults, heat, loose connections, and the order of checks.',
    answer:
      'A controller that faults in a panel is often faulting because of the panel: a 24 volt supply that sags, a ground that floats, a module that overheated, a terminal that loosened, water that reached a module, or noise from a drive coupled into the backplane. The indicators on the controller and the modules say a great deal before the software is opened, and the fault record in the software says whether the fault is a program fault, an I/O fault, a power fault, or a hardware fault. The panel-side checks are the ones a technician can do with a meter and a thermometer: the supply voltage under load, the ground bond, the module temperatures, the torque of the power terminals, and the routing of drive cables. A fault that recurs after the program has been proven is a panel fault until the panel is proven.',
    keyPoints: [
      'Read the indicators on the controller and every module first; the pattern names the class of fault.',
      'The fault record in the software separates program, I/O, power, and hardware faults.',
      'Supply sag, floating ground, heat, loose terminals, and drive noise are the panel causes of controller faults.',
      'An I/O fault names a module and a slot; check the module, its power, its terminal block, and its field wiring in that order.',
      'A fault that recurs with a proven program is a panel problem; measure the panel.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Troubleshooting', 'PLC', 'Power', 'Grounding'],
    blocks: [
      { t: 'h2', text: 'Read the lights' },
      {
        t: 'table',
        head: ['Indicator pattern', 'Class', 'First check'],
        rows: [
          ['Controller run indicator off, fault indicator on', 'Major fault: program, hardware, or power', 'The fault record in the software'],
          ['Controller off, all modules dark', 'No power to the rack', 'The 24 volt or 120 volt supply to the rack and its fuse'],
          ['Controller on, one module fault indicator on', 'Module fault: hardware, configuration, or field', 'The module status in the software; the module power and field wiring'],
          ['Controller on, I/O fault indicator on', 'A module or a remote rack not responding', 'The I/O tree; the remote rack power and network'],
          ['Controller cycling between run and fault', 'Recurring fault: supply sag, watchdog, or an intermittent module', 'Supply voltage under load; the fault log times'],
          ['Everything normal, outputs not working', 'Output power or a field problem', 'The output module supply and fuses'],
          ['Communication indicators dark or erratic', 'Network or serial problem', 'The port status; the switch; the cable'],
        ],
      },
      { t: 'h2', text: 'Panel causes' },
      {
        t: 'dl',
        items: [
          { term: 'Supply sag', def: 'A 24 volt supply that dips below the controller minimum when a load switches or a motor starts; the controller resets or faults on power. Measure with a recording meter during the events.' },
          { term: 'Floating or noisy ground', def: 'A rack ground that is bonded through paint or a long lead, or a ground that carries drive current; analog inputs wander and communications fault. Measure the bond resistance and the voltage between the rack and the ground bar.' },
          { term: 'Heat', def: 'Modules derate and fault above their rated temperature; a panel without the heat calculation done, or with a failed fan, cooks the rack. Measure the temperature at the top of the rack.' },
          { term: 'Loose terminals', def: 'Vibration from a nearby pump or the panel door loosens power terminals and module terminal blocks; an intermittent fault that follows the vibration. Torque check.' },
          { term: 'Water', def: 'Condensation or a leaking conduit reaching a module; corrosion on the terminals, a module that faults in wet weather. Look for the water path.' },
          { term: 'Drive noise', def: 'A drive output cable routed beside the rack or the I/O wiring couples noise into the backplane and the inputs. Reroute, shield, and bond.' },
          { term: 'Wiring errors after work', def: 'A 120 volt wire landed on a 24 volt input, a field wire on the wrong terminal; the module faults or is destroyed. Compare with the drawing.' },
        ],
      },
      { t: 'h2', text: 'Order of checks' },
      {
        t: 'steps',
        items: [
          { title: 'Indicators', text: 'Controller and every module, before touching anything; photograph them.' },
          { title: 'Fault record', text: 'The fault type, code, and time from the software, and the fault log for recurrence.' },
          { title: 'Power', text: 'Supply voltage at the rack under load, the rack supply indicators, the fuses; a recording meter if the fault recurs.' },
          { title: 'Ground', text: 'Bond resistance from the rack to the ground bar, and voltage between them with the plant running.' },
          { title: 'Temperature', text: 'At the top of the rack and at the supply; compare with the module ratings.' },
          { title: 'The module', text: 'For an I/O fault: reseat, check the terminal block, check the field wiring against the drawing, substitute the spare.' },
          { title: 'Connections', text: 'Torque on power terminals, module terminal blocks, and the ground bond.' },
          { title: 'Routing', text: 'Drive cables and power wiring near the rack and the I/O wiring.' },
          { title: 'The program', text: 'Only when the panel has been proven, the fault record points at the program, or the fault is clearly a program fault by its code.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Before clearing the fault',
        text: 'Clearing a fault restarts the controller and its outputs. Know what the process will do when the outputs come back, tell the operators, and clear the fault with someone watching the equipment.',
      },
      { t: 'h2', text: 'I/O module faults' },
      {
        t: 'p',
        text: 'An I/O module fault names the module and the slot. The module may have failed, may be a different type from what the project expects, may have lost its field power, may have a channel with an open wire or a short, or may have been damaged by a wiring error or a surge. The software module status names the reason; the terminal block, the field power fuse, and the field wiring are checked in that order; and the spare module of the same part number and firmware proves the module. A module that fails repeatedly in one slot is a slot, a backplane, or a wiring problem, not a bad batch of modules.',
      },
    ],
    faqs: [
      {
        q: 'The controller faulted once during a storm and has been fine since.',
        a: 'A surge or a sag reached it. Check the surge devices, the supply hold-up, and the grounding; the next storm is the test. Log it and alarm on supply monitoring so the next one is seen.',
      },
      {
        q: 'Why does the fault clear when I reseat the module?',
        a: 'A connector with corrosion or a loose module retention, which reseating cleans temporarily. Inspect the connector, replace the module if the contacts are damaged, and check the panel for humidity and corrosive air.',
      },
      {
        q: 'How do I tell a program fault from a panel fault?',
        a: 'The fault code. Program faults name a routine and a rung; power and hardware faults name the supply, the module, or the backplane. A watchdog fault can be either and is worked from the task times.',
      },
      {
        q: 'Should the controller be on the UPS?',
        a: 'Yes, with the switch and the radio, so that the controller rides through sags and short outages and can report a power failure. The outputs may or may not be on the UPS depending on what the process should do without power.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-troubleshooting/plc-will-not-run',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
      '/controls/plc-systems/plc-troubleshooting/program-faults',
      '/controls/control-panels/plc-panels/plc-power',
      '/controls/control-panels/panel-troubleshooting/ground-faults',
      '/controls/control-panels/panel-design/heat-calculations',
    ],
  },
  {
    path: '/controls/control-panels/panel-troubleshooting/relay-problems',
    kind: 'reference',
    title: 'Relay Problems',
    summary:
      'Diagnosing control relays in a panel: contacts that do not make or that weld, coils that fail or chatter, drop-out on sag, interposing relays on controller outputs, loads that burn contacts, suppression, sockets, and replacing against fixing the cause.',
    answer:
      'A control relay fails at its contacts or its coil, and the failure usually has a cause outside the relay: a load beyond the contact rating, an inductive load without suppression that arcs the contacts on every operation, a coil supply that sags so the relay chatters, a socket with worn or corroded pins, heat, or simply the millions of operations a relay in a duty-cycling circuit accumulates. The diagnosis is a meter: coil voltage at the socket, contact voltage drop under load, and the load current against the rating. A relay that welded had an overload or an inrush; one that will not pull in has a coil, a socket, or a supply problem; one that chatters has a supply that dips or a sensor that bounces. Replacing the relay fixes the symptom; fixing the load, the suppression, or the supply fixes the problem.',
    keyPoints: [
      'Measure coil voltage at the socket, contact drop under load, and load current; the three numbers find the fault.',
      'Welded contacts had an overload or an inrush; check the load and the contact rating.',
      'Chatter is a coil supply that sags or a bouncing input, not usually the relay.',
      'Inductive loads need suppression across the coil or the contacts, or the contacts burn.',
      'Plug-in sockets fail with worn pins and corrosion; the relay tests good and the circuit does not work.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Panels', 'Troubleshooting', 'Control', 'Power', 'Design'],
    blocks: [
      { t: 'h2', text: 'Symptom to cause' },
      {
        t: 'table',
        head: ['Symptom', 'Likely cause', 'Check'],
        rows: [
          ['Relay does not pull in', 'No coil voltage, a failed coil, a bad socket', 'Coil voltage at the socket; coil resistance'],
          ['Pulls in, contact does not conduct', 'Burned or pitted contact, a socket pin', 'Voltage drop across the contact under load'],
          ['Contacts welded closed', 'Overload, inrush, or a short through the contact', 'Load current and inrush against the rating; what the contact switches'],
          ['Relay chatters or buzzes', 'Coil voltage low or dropping, AC coil on DC or the reverse, a bouncing input', 'Coil voltage during the event; the input signal'],
          ['Relay drops out briefly on motor start', 'Control voltage sag', 'Control voltage during starts; the transformer size'],
          ['Relay runs hot', 'Coil overvoltage, high ambient, or a relay operated continuously at its limit', 'Coil voltage against rating; the panel temperature'],
          ['Intermittent operation', 'Socket, loose wire, or a failing coil', 'Wiggle test with a meter on the coil and the contact'],
          ['Relay fails often in one position', 'The load on that contact', 'The load type and current; suppression'],
        ],
      },
      { t: 'h2', text: 'Contacts' },
      {
        t: 'p',
        text: 'A contact is rated for a current at a voltage with a load type, and an inductive or a capacitive load is not the resistive rating on the label. A solenoid or a contactor coil draws an inrush several times its running current and, when the contact opens, generates a voltage that arcs across the gap and erodes the metal. A lamp or a power supply draws a large inrush. A relay contact switching such loads at its resistive rating burns in months. The contact is rated for the actual load with margin, the load is suppressed, or an interposing contactor takes the load. A voltage drop across a closed contact of more than a few tenths of a volt under load is a contact that is failing.',
      },
      { t: 'h2', text: 'Coils' },
      {
        t: 'p',
        text: 'A coil pulls in at about 80 percent of its rated voltage and drops out somewhere around half, so a control voltage that sags during a motor start, or a 24 volt supply loaded past its rating, makes relays chatter or drop out. The measurement is the coil voltage at the socket during the event, with a recording meter if the event is brief. A coil that measures open has failed, usually from heat or a voltage surge; one that measures low resistance has shorted turns and will run hot and pull in weakly. An AC coil on a DC supply or a DC coil on AC buzzes, runs hot, and fails.',
      },
      { t: 'h2', text: 'Suppression' },
      {
        t: 'ul',
        items: [
          'A diode across a DC coil, cathode to positive, absorbs the turn-off spike and protects the contact or the controller output that drives it; it slows the drop-out slightly.',
          'A resistor and capacitor network or a varistor across an AC coil or across the contact that switches it.',
          'Suppression at the load coil, where the spike originates, rather than at the relay contact where it arrives.',
          'Suppressed relay sockets or relays with built-in suppression where a panel has many.',
        ],
      },
      { t: 'h2', text: 'Interposing relays' },
      {
        t: 'p',
        text: 'A controller output rated for a fraction of an ampere cannot switch a contactor coil or a solenoid reliably for long; an interposing relay takes the small controller output and switches the load with a rated contact. It also isolates the controller from field faults, and it is the part that fails instead of the output module. Interposing relays are specified for the load they switch, with suppression, in sockets that can be replaced without tools, and with a spare in the panel.',
      },
      { t: 'h2', text: 'Sockets' },
      {
        t: 'p',
        text: 'Plug-in relays live in sockets, and sockets fail: the spring contacts lose tension after many insertions, the pins corrode in a humid panel, a wire under a socket screw loosens. A relay that tests good on the bench and fails in the panel is a socket; the test is to measure at the socket terminals rather than at the relay, and to feel the retention when the relay is inserted. Sockets are replaced, not cleaned, and the relay retention clip is fitted.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Replace with the same relay',
        text: 'Coil voltage, contact arrangement, contact rating, and socket type are all on the drawing. A relay that fits the socket but has a different contact rating or coil voltage is a new fault waiting to happen. Same part number, or a documented substitution.',
      },
    ],
    faqs: [
      {
        q: 'The relay clicks but the pump does not start.',
        a: 'The coil works and a contact does not: measure the voltage across the contact with the coil energized. A drop equal to the supply means the contact is open, from burning, a socket pin, or a wire. Then look at what the contact feeds.',
      },
      {
        q: 'Why do the relays chatter when the big pump starts?',
        a: 'The control voltage sags below the coil holding voltage during the start. Measure it. The control transformer is undersized for the panel, the starting method is harsh, or the control circuit is fed from a source that dips. A larger transformer or a separate control source fixes it.',
      },
      {
        q: 'Can I use a solid-state relay instead?',
        a: 'For frequent switching of resistive or moderate inductive loads, a solid-state relay has no contacts to burn, and it needs a heat sink, leaks a small current when off, and fails short. It is a design decision with the drawing updated, not a field swap.',
      },
      {
        q: 'How long should a relay last?',
        a: 'Mechanically, millions of operations; electrically, tens of thousands to hundreds of thousands at rated load, and far fewer at an unsuppressed inductive load. A relay in a circuit that cycles every few seconds is a wear item on a schedule.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/control-relays',
      '/troubleshooting/control-panel-troubleshooting/relay-chatter',
      '/controls/control-panels/plc-panels/relays',
      '/troubleshooting/power-troubleshooting/voltage-sag-on-motor-start',
      '/controls/control-panels/panel-troubleshooting/no-control-power',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
    ],
  },
  {
    path: '/controls/control-panels/plc-panels/plc-power',
    kind: 'reference',
    title: 'PLC Power',
    summary:
      'Powering the controller section of a panel: the control transformer and 24 volt supplies, separating controller power from field I/O power, sizing with margin, the UPS and what rides through, protection and monitoring, the DC ground, and restart sequencing.',
    answer:
      'The controller section of a panel is powered in layers: a control transformer or a dedicated circuit provides 120 volts for the controller rack supply, the 24 volt supplies, and the 120 volt loads; one 24 volt supply powers the controller and its communications; a separate 24 volt supply powers the field I/O, so that a shorted field device cannot drop the controller; and a UPS carries the controller, the network, and the radio through sags and short outages while the outputs do whatever the process design says they should do without power. Each supply is sized for its measured load plus margin at the panel temperature, protected by its own fuse or breaker, monitored by a contact wired to an alarm, and its DC common is grounded at one point. The design decides in advance what restarts when power returns and in what order, because a panel that restarts every pump at once when the generator picks up is a panel that trips the generator.',
    keyPoints: [
      'Separate the controller supply from the field I/O supply; a field short must not reboot the controller.',
      'Size each supply for the measured load plus a third, derated for the panel temperature.',
      'Put the controller, the switch, and the radio on the UPS; decide deliberately what else rides through.',
      'Fuse or breaker each supply and each output group; monitor every supply with a contact wired to an alarm.',
      'Ground the 24 volt common at one point and document the restart behavior of every output.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'PLC', 'Power', 'Design', 'UL 508A'],
    blocks: [
      { t: 'h2', text: 'The layers' },
      {
        t: 'table',
        head: ['Layer', 'Feeds', 'Notes'],
        rows: [
          ['Panel disconnect and main protection', 'Everything', 'Rated for the panel full-load current and the available fault current'],
          ['Control transformer or dedicated 120 volt circuit', 'Rack supply, 24 volt supplies, 120 volt loads', 'Secondary fused; sized for the sum of the connected loads plus inrush'],
          ['UPS', 'Controller, network, radio, and selected 24 volt loads', 'Runtime sized for the outage the site must ride through; bypass for maintenance'],
          ['24 volt supply A', 'Controller rack, communication modules, touchscreen', 'Isolated from the field; monitored'],
          ['24 volt supply B', 'Field inputs, outputs, and instruments', 'Fused by group; monitored; sized for the field load'],
          ['Loop supplies', 'Analog transmitters where a separate loop supply is used', 'Or from supply B through fused terminals'],
          ['Output power', '120 volt or 24 volt to relays and solenoids', 'Fused by group; on or off the UPS by design'],
        ],
      },
      { t: 'h2', text: 'Separation' },
      {
        t: 'p',
        text: 'A field cable shorted by a backhoe, a solenoid with a failed coil, or a wet junction box will drop the supply it is on into current limit. If that supply is also the controller supply, the controller reboots, every output drops, and the process is in its fail state until someone finds the short. With the field on its own supply, the field fuse opens or the field supply limits, the controller stays up, reports the fault, and keeps the rest of the process running. The separation costs one supply and repays it on the first field fault.',
      },
      { t: 'h2', text: 'Sizing' },
      {
        t: 'formula',
        expr: 'I_supply ≥ (Σ I_loads × 1.33) ÷ D_temp',
        where: [
          'Σ I_loads = sum of the measured or nameplate currents of every device on that supply',
          '1.33 = margin for growth and inrush',
          'D_temp = derating factor at the panel maximum temperature from the supply data sheet',
        ],
      },
      {
        t: 'p',
        text: 'The load is the real load: the controller rack, each communication module, the touchscreen, the switch, the radio, each input and output at its worst case, each transmitter at 22 milliamps, each relay coil. It is summed at design and re-summed whenever a device is added, and the number is written on the drawing beside the supply. A supply at 90 percent of its rating in a hot panel is a supply that will fail in a few summers.',
      },
      { t: 'h2', text: 'The UPS' },
      {
        t: 'ul',
        items: [
          'On the UPS: the controller, the communication modules, the switch, the radio or modem, and the touchscreen, so that the site stays visible and reports the outage.',
          'Off the UPS by default: motor starters, most solenoids, and anything the process should not run without power; on the UPS by design: a valve that must close, an alarm dialer, a critical sample pump.',
          'Runtime for the longest outage the site must ride through before the generator starts or the site can be visited, plus margin.',
          'A maintenance bypass so the UPS can be replaced without a shutdown, and a battery replacement schedule.',
          'A power fail input to the controller from the UPS or a separate relay, so SCADA knows the site is on battery.',
        ],
      },
      { t: 'h2', text: 'Protection and monitoring' },
      {
        t: 'dl',
        items: [
          { term: 'Per supply', def: 'Input protection sized for the supply inrush; output protection at the supply or by fused terminals on each branch.' },
          { term: 'Per output group', def: 'Fused terminals or a small breaker per group of outputs, so a shorted solenoid drops a group.' },
          { term: 'Per loop', def: 'A fused terminal on each analog loop.' },
          { term: 'Monitoring', def: 'Every supply has a contact wired to a controller input; the UPS has its status contacts wired; all alarmed.' },
          { term: 'Indication', def: 'Indicating fuse holders and supply status lights so a technician sees the failed item at the door.' },
        ],
      },
      { t: 'h2', text: 'Grounding the DC' },
      {
        t: 'p',
        text: 'The 24 volt negative is bonded to the panel ground at one point, at the supply, so that the common is at ground potential and a positive-to-ground fault is a short that opens a fuse rather than a floating system that reads strange voltages. Two supplies feeding separate circuits each have their negative grounded at their own single point; supplies that are combined have one. A floating 24 volt system is used only when the design calls for it, with a ground fault monitor. The instrument ground bar and the shield bar tie to the same ground reference.',
      },
      { t: 'h2', text: 'Restart' },
      {
        t: 'p',
        text: 'When power returns, the controller boots in a few seconds, the outputs are off until the first scan, and then the logic decides. The design states, for every output, what it does on restart: pumps return to automatic and start by level with a staggered delay; a chemical feed waits for flow; a valve holds until commanded. The stagger keeps the generator from seeing every motor at once, and the documented behavior keeps the operators from being surprised.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Generator pickup',
        text: 'A lift station with two pumps, both called by a high level during the outage, both starting on the same scan when the generator takes the load, is the commonest way to trip a generator. A staggered start of a few seconds between pumps, and a level logic that does not call both on the first scan, is the fix.',
      },
    ],
    faqs: [
      {
        q: 'Can the controller and the I/O share one supply on a small panel?',
        a: 'They can, and many small panels do; the risk is a field short rebooting the controller. A second small supply costs little, and on any panel where the controller must stay up through a field fault, it is worth it.',
      },
      {
        q: 'How much UPS runtime?',
        a: 'Enough to bridge the generator start, or the time to visit a site with no generator, plus margin for the batteries aging. Thirty minutes is common for a plant panel; several hours for a remote site that must keep reporting.',
      },
      {
        q: 'Should the outputs be on the UPS?',
        a: 'Only the ones the process needs during an outage, decided one by one. A UPS that runs the pumps is a much larger UPS, and the generator is the right answer for that.',
      },
      {
        q: 'Why ground the 24 volt common?',
        a: 'So that faults are detectable and the system is at a known potential. A floating supply lets a single ground fault go unnoticed until a second one shorts the supply, and it lets noise ride the common. One bond, at the supply, on the drawing.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/panel-power-supplies',
      '/controls/control-panels/panel-components/ups',
      '/how-to/panel-how-to/size-a-power-supply',
      '/controls/control-panels/panel-troubleshooting/failed-power-supplies',
      '/controls/plc-systems/plc-fundamentals/power-supplies',
      '/water-wastewater/wastewater-systems/lift-stations/generator-operation',
    ],
  },
  {
    path: '/controls/control-panels/plc-panels/panel-i-o',
    kind: 'reference',
    title: 'Panel I/O',
    summary:
      'Arranging the I/O in a controller panel: module types for the field devices, sinking, sourcing, and isolated inputs, fused and relay outputs, the path from field terminal to module, spare capacity, and addressing that follows the I/O list.',
    answer:
      'The I/O section of a panel is designed from the I/O list outward: every field device is a point with a signal type, and the points are grouped by type into modules, assigned addresses that follow the list, wired from field terminals through the wireway to the module terminals, and documented on the schematic with the address at the terminal. The choices that matter are the module types, including whether inputs sink or source and whether channels are isolated; whether outputs are relay, transistor, or triac and how they are fused; how the field wiring reaches the module, directly from terminal strips or through a marshalling section; and how much spare capacity is built in. A panel whose I/O follows the list, with addresses on the terminals and a fifth of each module spare, is a panel that can be commissioned from the drawings and extended without a rebuild.',
    keyPoints: [
      'Design from the I/O list: every point has a type, a module, an address, and a terminal.',
      'Pick sinking or sourcing inputs to match the field devices and use isolated channels where grounds differ.',
      'Fuse outputs by group; use interposing relays for anything beyond the module contact rating.',
      'Wire field terminal to wireway to module, with the address at the terminal on the schematic.',
      'Leave a fifth of each module and a spare slot; allocate spares in the list, not in the field.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'PLC', 'Design', 'Signals', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'Module selection' },
      {
        t: 'table',
        head: ['Point type', 'Module', 'Choices'],
        rows: [
          ['Discrete input, 24 volt', 'DC input module', 'Sinking or sourcing to match the field; isolated channels for devices on other grounds; fast channels for pulses'],
          ['Discrete input, 120 volt', 'AC input module', 'Only where the field device is 120 volts; keep 120 volt inputs off DC modules'],
          ['Discrete output, low current', 'Transistor output module', 'Sourcing 24 volt DC; fast; for interposing relays and indicators'],
          ['Discrete output, higher current or AC', 'Relay output module, or transistor with interposing relays', 'Relay modules for mixed voltages; interposing relays for contactors and solenoids'],
          ['Analog input, 4 to 20 mA', 'Analog input module', 'Isolated channels where loops share nothing; resolution for the range; loop power from the module or a supply'],
          ['Analog input, RTD or thermocouple', 'Temperature module', 'Do not convert temperature to a loop just to use a current module'],
          ['Analog output', 'Analog output module', 'Current outputs for drives and valves; check the load resistance limit'],
          ['Pulse or frequency', 'High-speed counter module', 'Flowmeter pulses and energy meters'],
          ['Remote devices', 'Network module', 'Remote I/O, drives, and instruments over Ethernet rather than hardwired points'],
        ],
      },
      { t: 'h2', text: 'Sinking, sourcing, and isolation' },
      {
        t: 'p',
        text: 'A sourcing input expects the field device to connect it to the positive supply; a sinking input expects a connection to the common. A field device with a transistor output works one way or the other, and a module that mismatches it reads nothing. A dry contact works with either. The convention is chosen for the plant and stated on the drawings, and the exceptions are documented. Isolated channels, each with its own common, are used where field devices are powered from different supplies or sit on different grounds, such as a drive fault contact powered from the drive, and where one channel fault must not affect the others.',
      },
      { t: 'h2', text: 'Outputs' },
      {
        t: 'ul',
        items: [
          'Transistor outputs drive interposing relays, pilot lights, and 24 volt loads within their rating; they are fast and have no contacts to wear.',
          'Relay outputs switch small AC and DC loads directly and are convenient for mixed voltages; they wear and they are replaced as a module.',
          'Anything that draws more than the module rating, or is inductive, or is a motor starter coil, goes through an interposing relay.',
          'Outputs are fused by group, so a short takes out a group and not the module or the panel.',
          'Fail state is decided per output: what the module does when the controller faults or the network drops is a configuration, and the drawing says which.',
        ],
      },
      { t: 'h2', text: 'From the field to the module' },
      {
        t: 'p',
        text: 'Field cables land on terminal strips grouped by signal type. From the terminal strip, panel wiring runs through the wireway to the module terminal block, one conductor per point, labeled with the wire number and, at the terminal, the I/O address. The schematic shows the field device, the terminal, and the module channel with its address on one line. Marshalling, a separate terminal section where field wiring is cross-connected to module wiring, is used on large panels where the field cable arrangement does not match the module arrangement; on most water panels, direct terminal-to-module wiring with a good terminal layout is simpler and easier to trace.',
      },
      { t: 'h2', text: 'Addressing and spares' },
      {
        t: 'ul',
        items: [
          'Addresses are assigned in the I/O list before the panel is wired, grouped so that a device and its related points are on adjacent channels.',
          'A fifth of each module is spare, wired to spare terminals, and listed as spare in the I/O list.',
          'At least one spare slot in the rack, and space in the wireway and terminals for the modules that will fill it.',
          'The I/O list, the schematic, and the controller configuration agree, and the list is the master.',
          'Point descriptions in the controller match the I/O list; the technician in the software sees the same words as on the drawing.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'One convention',
        text: 'Sourcing inputs, transistor outputs through interposing relays, isolated analog inputs, fused terminals on loops, addresses on terminals, a fifth spare: written once as the plant standard and applied to every panel, so that every panel in the utility reads the same way.',
      },
    ],
    faqs: [
      {
        q: 'Why not wire the field cables straight to the module?',
        a: 'Because the module is then a terminal strip, every module replacement disturbs field wiring, every loop test needs a wire lifted, and the schematic has to show module terminals as field terminals. Terminal strips are cheap; a rewire is not.',
      },
      {
        q: 'When do I need isolated analog inputs?',
        a: 'When the loops are powered from different sources, when a transmitter is grounded at the field end, when a signal comes from another panel or a drive, and when a common-mode voltage between loops would otherwise appear as an error. On a plant panel, isolated inputs for everything are cheap insurance.',
      },
      {
        q: 'How many spares?',
        a: 'A fifth of each module type and a spare slot, plus the terminals and the wireway to use them. A panel with spare inputs and no spare terminals has no spare inputs.',
      },
      {
        q: 'Should the I/O be in the controller panel or in the field?',
        a: 'Points near the controller are hardwired; points across the plant are better served by a remote I/O rack over Ethernet or fiber, which saves conduit and copper and keeps long signal runs off the panel. The decision is on the network drawing.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/io-systems',
      '/engineering-library/lists-schedules/io-lists',
      '/controls/control-panels/panel-design/terminals',
      '/controls/control-panels/plc-panels/relays',
      '/controls/control-panels/plc-panels/isolation',
      '/controls/plc-systems/communications/remote-i-o',
    ],
  },
  {
    path: '/controls/control-panels/plc-panels/relays',
    kind: 'reference',
    title: 'Relays in the PLC Panel',
    summary:
      'The relays a controller panel needs and why: interposing relays between outputs and loads, input relays for high-voltage and remote signals, isolation and safety relays, monitoring relays, coil and contact selection, and keeping logic out of relays.',
    answer:
      'A controller panel still needs relays, for reasons that have nothing to do with logic: an interposing relay lets a small output module contact switch a contactor coil or a solenoid and protects the module from field faults; an input relay converts a 120 volt field signal or a signal from another panel into a clean dry contact for a 24 volt input; an isolation relay separates two grounds or two systems; a safety relay implements the emergency stop and the guard circuits that must not depend on the program; and monitoring relays watch phase loss, voltage, or a pump seal and give the controller a contact. What a controller panel does not need is logic in relays, the timing and sequencing that belong in the program, because relay logic is invisible to SCADA, undocumented after a decade, and the reason a pump runs when the program says it should not.',
    keyPoints: [
      'Interposing relays between output modules and any real load: contactor coils, solenoids, lamps beyond the module rating.',
      'Input relays for 120 volt signals and signals from other panels, so the input module sees a dry contact at its own voltage.',
      'Safety functions in safety relays, outside the program, wired to stop the equipment directly.',
      'Coil voltage, contact rating, and suppression specified per relay; sockets with retention and a spare on the door.',
      'No control logic in relays: the program owns timing, sequencing, and interlocks, and SCADA can see them.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Panels', 'PLC', 'Control', 'Design', 'Power'],
    blocks: [
      { t: 'h2', text: 'Kinds and purposes' },
      {
        t: 'table',
        head: ['Relay', 'Purpose', 'Typical specification'],
        rows: [
          ['Interposing output relay', 'Switch the load the output module cannot; isolate the module from field faults', '24 volt DC coil, contacts rated for the load with margin, suppressed, plug-in socket'],
          ['Input relay', 'Convert 120 volt or foreign signals to a dry contact', 'Coil at the field voltage, contact to the input module'],
          ['Isolation relay', 'Separate grounds or systems', 'Same as an input relay, with the isolation rating noted'],
          ['Safety relay', 'Emergency stop, guard, and safety interlocks', 'Listed safety relay with monitored inputs and dual-channel outputs; outside the program'],
          ['Monitoring relay', 'Phase loss, phase sequence, voltage, seal leak, motor thermal', 'Listed monitoring relay with a contact to the controller and, where required, a direct trip'],
          ['Timing relay', 'Only where a delay must exist without the controller: a backup float delay', 'Kept to the backup circuit; the program owns normal timing'],
          ['Alternator relay', 'Backup alternation when the controller is down', 'In the backup float circuit on lift stations'],
        ],
      },
      { t: 'h2', text: 'Interposing' },
      {
        t: 'p',
        text: 'An output module contact or transistor is rated for a fraction of an ampere at 24 volts, and the contactor coil it needs to pull in draws more than that with an inrush and an inductive kick. An interposing relay with a 24 volt coil on the output and a contact rated for the coil takes the load, and a field fault that would have burned the module burns a relay in a socket instead. The relay is suppressed, its coil current is within the output rating, and its contact rating exceeds the load with margin. On a panel with many outputs, slim relay modules with built-in suppression and pluggable bases save space and are replaced without tools.',
      },
      { t: 'h2', text: 'Input relays' },
      {
        t: 'p',
        text: 'A run feedback from a starter is a 120 volt signal; a fault contact from a drive is powered from the drive; a signal from another panel is on another ground. Landing any of them on a 24 volt input module is either impossible or a path for noise and faults. An input relay with a coil at the field voltage and a dry contact to the input module makes every input a clean 24 volt signal from a known source, at the cost of a relay per point. Modules with isolated 120 volt inputs are the alternative for a panel with many such signals.',
      },
      { t: 'h2', text: 'Safety' },
      {
        t: 'p',
        text: 'An emergency stop that depends on the program depends on the program being right, running, and not faulted. It must not. The emergency stop circuit runs through a listed safety relay that drops the contactors directly, with a contact to the controller so that the program knows and SCADA reports it. Guard switches, pull cords, and the stop functions on hazardous equipment follow the same rule, at the performance level the risk assessment requires. The program may prevent a restart; it does not implement the stop.',
      },
      { t: 'h2', text: 'What not to do with relays' },
      {
        t: 'ul',
        items: [
          'Timing a pump start with a relay because the program was inconvenient; the delay is invisible and undocumented.',
          'Sequencing with relay logic beside a controller that could do it.',
          'Interlocks in relays that the program does not see, so SCADA shows a pump available that a relay is holding off.',
          'A hand mode that bypasses the program through relays with no feedback to the controller.',
          'Relays added during troubleshooting and left in, unrecorded.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The backup circuit is the exception',
        text: 'A lift station keeps a backup float circuit with a level relay, an alternator relay, and a delay relay that run the pumps when the controller is down. That relay logic exists on purpose, is on the drawing, and is tested on a schedule; it is the one place relay logic belongs in a controller panel.',
      },
      { t: 'h2', text: 'Specifying' },
      {
        t: 'ul',
        items: [
          'Coil voltage matching the driving circuit, with the coil current within the output rating.',
          'Contact rating for the actual load type and current, with margin; AC and DC ratings differ.',
          'Suppression: a diode for DC coils, a network or varistor for AC.',
          'Sockets with retention clips and screw or spring terminals per the plant standard.',
          'Indicator on the relay so the technician sees the state at the door.',
          'A spare of each type in the panel pocket.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a relay output module drive a contactor coil directly?',
        a: 'Within its rating, with suppression, for small contactors, yes; for larger contactors and for anything the module rating does not comfortably cover, an interposing relay. The module is harder to replace than a relay in a socket.',
      },
      {
        q: 'Why put the emergency stop through a safety relay when the controller could stop everything?',
        a: 'Because the controller can be faulted, in program mode, or wrong. A safety relay is listed for the function, monitors its own circuit, and drops the power directly. The controller is told, not trusted.',
      },
      {
        q: 'How do I get rid of the relay logic in an old panel?',
        a: 'Document what it does first, one relay at a time, then implement each function in the program with SCADA visibility, test, and remove the relays with the drawing updated. Removing relay logic without documenting it removes functions nobody knew existed.',
      },
      {
        q: 'Slim relay modules or full-size plug-in relays?',
        a: 'Slim modules for interposing on many outputs, where space and built-in suppression matter; full-size relays for higher contact ratings, multiple contacts, and where the technicians expect them. Both are fine; one standard per plant.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/control-relays',
      '/controls/control-panels/panel-troubleshooting/relay-problems',
      '/controls/control-panels/plc-panels/panel-i-o',
      '/controls/control-panels/pump-panels/hoa',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/controls/plc-systems/programming/interlocks',
    ],
  },
  {
    path: '/controls/control-panels/plc-panels/isolation',
    kind: 'reference',
    title: 'Isolation',
    summary:
      'Isolating the controller from the field: why grounds differ and what that does to signals, signal isolators and isolated channels, isolation transformers and their limits, relays as isolation, fiber as the ultimate isolator, and when isolation is worth it.',
    answer:
      'Isolation breaks the electrical connection between two circuits while passing the signal, so that a difference in ground potential, a fault on one side, or a surge on one side does not appear on the other. A controller panel needs it wherever a signal crosses between grounds, comes from equipment with its own supply, travels between buildings, or must be protected from a fault on the other end: the analog input from a transmitter grounded at the tank, the signal from a drive with its own electronics, the run feedback from a starter on another panel, and every link that leaves the building. The tools are isolated I/O channels, signal isolators on analog loops, relays on discrete signals, isolation transformers on power, fiber on communications, and intrinsically safe barriers into hazardous areas. Isolation costs money per point and buys signals that read correctly and a controller that survives the field.',
    keyPoints: [
      'Two grounds are never at the same potential; a signal referenced to both carries the difference as error or noise.',
      'Isolate analog loops that cross grounds, come from drives, or leave the building, with an isolator or an isolated channel.',
      'Discrete signals from other panels or supplies go through relays or isolated inputs.',
      'Fiber isolates communications completely; use it between buildings and between grounds.',
      'Isolation transformers isolate power and limit surges but do not fix grounding; intrinsic safety barriers isolate for a different reason.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'PLC', 'Grounding', 'Signals', 'Design'],
    blocks: [
      { t: 'h2', text: 'Why grounds differ' },
      {
        t: 'p',
        text: 'Every ground rod, every building steel bond, and every panel ground bar sits at a slightly different potential, and the difference changes with load current, soil moisture, and faults. A signal circuit that is grounded at both ends, at the transmitter by its mounting and at the panel by its supply, has a loop through the earth, and the ground potential difference drives a current around it that adds to the signal. Between buildings the difference can be volts; during a lightning strike it can be thousands. Isolation removes the loop by leaving one side floating with respect to the other, and the signal is passed by magnetics, optics, or capacitors instead of by a shared conductor.',
      },
      { t: 'h2', text: 'Where to isolate' },
      {
        t: 'table',
        head: ['Signal', 'Risk without isolation', 'Method'],
        rows: [
          ['Analog loop from a grounded transmitter', 'Ground loop error, noise, offset', 'Isolated analog input channel, or a loop isolator at the panel'],
          ['Analog signal from a drive or a power meter', 'Common-mode voltage from the drive electronics; noise', 'Isolator, or an isolated channel; shielded cable'],
          ['Signal between panels or buildings', 'Ground potential difference, surge path', 'Isolator or isolated input; fiber for communications'],
          ['Discrete signal from another panel or supply', 'Voltage mismatch, fault path', 'Input relay, or an isolated input module channel'],
          ['Communications leaving the building', 'Surge and ground loop on copper', 'Fiber; or isolated serial converters and surge protection'],
          ['Panel power on a noisy or surge-prone supply', 'Noise and transients on the control power', 'Isolation transformer, or a UPS with isolation'],
          ['Circuits into a hazardous area', 'Ignition energy', 'Intrinsically safe barrier or galvanic isolator, with a control drawing'],
        ],
      },
      { t: 'h2', text: 'Signal isolators' },
      {
        t: 'p',
        text: 'A loop isolator takes a 4 to 20 milliamp input and produces an isolated 4 to 20 milliamp output, powered from the panel or from the loop, with the input and output circuits separated by a stated isolation voltage. It goes at the panel end of a loop that crosses grounds, where the panel supply can power it and the isolated side faces the controller. Isolators add a small error and a small delay, need a fused supply, and are one more device to fail, which is why isolated input channels on the module are preferred where the module offers them. Where a transmitter is powered from the field and the panel only reads it, an isolator is the standard answer.',
      },
      { t: 'h2', text: 'Isolated I/O channels' },
      {
        t: 'p',
        text: 'An isolated input module has a separate common per channel or per group, so each field circuit floats relative to the others and to the controller. It is the simplest isolation for analog inputs from mixed sources and for discrete inputs from other supplies, and it costs more per point than a non-isolated module. Non-isolated modules share a common and are fine when every loop on the module is powered from the panel and grounded at the panel; the moment one loop is grounded elsewhere, the shared common carries the difference into every channel.',
      },
      { t: 'h2', text: 'Transformers, relays, and fiber' },
      {
        t: 'dl',
        items: [
          { term: 'Isolation transformer', def: 'Separates the panel control power from the supply, blocks common-mode transients, and lets the secondary be grounded as a separately derived system at the panel. It does not remove a ground loop on a signal, and it is not a surge protector; it is one part of a clean control power design.' },
          { term: 'Relays', def: 'A relay coil and contact are isolated from each other; an input relay isolates a discrete signal completely, and an interposing relay isolates an output. Slow, and the right answer for discrete signals.' },
          { term: 'Fiber', def: 'No conductor, no ground loop, no surge path. Any communication link between buildings, between panels on different grounds, or to a mast is fiber. Media converters at each end need their own isolation from the copper side only where copper continues.' },
          { term: 'Intrinsic safety', def: 'Barriers and isolators into a hazardous area limit energy; galvanic isolators also isolate and need no special ground. The control drawing governs.' },
        ],
      },
      { t: 'h2', text: 'Deciding' },
      {
        t: 'ul',
        items: [
          'Isolate every signal that crosses between grounds, comes from a drive or a powered device, or leaves the building; do not debate those.',
          'Inside one panel, with every loop powered and grounded at the panel, non-isolated modules are fine.',
          'When in doubt on a plant panel, specify isolated analog modules; the cost per point is small against a commissioning week chasing offsets.',
          'Record the isolation on the drawing: which loops, which method, which side is grounded.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Ground once',
        text: 'Isolation works when one side of the isolated circuit is grounded and the other floats. A loop grounded at the transmitter and at the panel with an isolator in between still has the isolator doing its job; a loop grounded at the panel on both sides of the isolator does not. The drawing shows the single ground on each side.',
      },
    ],
    faqs: [
      {
        q: 'Do I need isolators if I use shielded cable?',
        a: 'The shield reduces coupled noise; it does not remove a ground loop in the signal conductors. A loop grounded at both ends needs isolation whatever the cable.',
      },
      {
        q: 'The analog reads fine most of the time and jumps when the big pump starts.',
        a: 'The ground potential difference rises with the fault or starting current and appears in the loop. That is a ground loop; isolate the loop and check the grounding.',
      },
      {
        q: 'Is an isolation transformer a surge protector?',
        a: 'It attenuates common-mode transients and blocks DC, and a shielded isolation transformer does more, but it does not clamp a surge on the line conductors. Surge protection is a separate device; both together make clean control power.',
      },
      {
        q: 'Can I isolate a signal at the field end instead of the panel?',
        a: 'Yes, with a field-powered isolator or an isolated transmitter output, and it is done where the panel end cannot be changed. The panel end is usually more convenient because power and access are there.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/ground-loops',
      '/how-to/instrumentation-how-to/diagnose-ground-loops',
      '/troubleshooting/grounding-troubleshooting/floating-reference-between-panels',
      '/controls/control-panels/plc-panels/panel-i-o',
      '/controls/control-panels/panel-design/ul-698a',
      '/troubleshooting/noise-interference/vfd-noise-on-analog-signals',
    ],
  },
  {
    path: '/controls/control-panels/plc-panels/panel-surge-protection',
    kind: 'reference',
    title: 'Panel Surge Protection',
    summary:
      'Surge protection of a controller panel as a system: a single entrance and the ground bar it lands on, staged protection on the power, protectors on every loop and data line that leaves the building, the radio feed, layout, and the checklist after a strike.',
    answer:
      'A controller panel at a lift station or a well is at the end of long conductors that act as antennas for lightning, and its protection is a design rather than a part: every conductor that enters the panel does so at one place, through a protector that lands on a ground bar bonded to the panel ground and the site electrode by a short conductor; the power is protected in stages from the entrance to the supplies; every 4 to 20 milliamp loop, every discrete circuit, and every copper data line that leaves the building has a protector at the entrance; the antenna feed has a coaxial arrestor bonded to the same bar; and the wiring inside the panel keeps the protected side away from the unprotected side so that the surge does not couple around the protector. A panel built that way survives most strikes with a few sacrificed protectors; a panel with one power protector in the middle and nothing on the level transmitter loses its controller on the first storm.',
    keyPoints: [
      'One entrance: every conductor enters the panel at one place and its protector lands on one ground bar.',
      'The ground bar is bonded to the panel ground and the site electrode system by a short, straight conductor.',
      'Stage the power protection; protect every loop, discrete circuit, and copper data line that leaves the building; protect the antenna feed.',
      'Keep protected and unprotected wiring apart inside the panel; a surge couples across a wireway.',
      'Monitor the protectors, inspect after every storm, and keep spares.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'PLC', 'Grounding', 'Telemetry', 'Design'],
    blocks: [
      { t: 'h2', text: 'The system' },
      {
        t: 'table',
        head: ['Path into the panel', 'Protector', 'Where it lands'],
        rows: [
          ['Power supply conductors', 'Type 2 device after the disconnect; a second stage at the 24 volt supplies where the exposure is severe', 'Entrance ground bar'],
          ['Level transmitter and other loops from the field', 'Two-stage loop protector per pair, rated above the loop supply voltage', 'Entrance ground bar, with the shield'],
          ['Floats and discrete field circuits', 'Discrete circuit protector per conductor pair or group', 'Entrance ground bar'],
          ['Drive and starter signals from other enclosures', 'Protector where the enclosure is on another ground or fed by a separate run', 'Entrance ground bar'],
          ['Serial or Ethernet copper leaving the building', 'Data line protector rated for the signal; or fiber', 'Entrance ground bar'],
          ['Antenna coax', 'Coaxial lightning arrestor', 'Entrance ground bar, with the mast grounded to the same electrode system'],
          ['Telephone or cellular antenna', 'The appropriate line or coaxial protector', 'Entrance ground bar'],
        ],
      },
      { t: 'h2', text: 'The entrance and the bar' },
      {
        t: 'p',
        text: 'The protectors are mounted where the conduits enter, on a rail or a plate with a ground bar behind it, and the field conductors go from the conduit to the protector before anything else. The bar is bonded to the panel ground bar and to the site grounding electrode system by a conductor as short and straight as the layout allows, in the size the protector manufacturer specifies or larger. The mast ground, the panel ground, and the service ground are bonded together at the site, because a surge that finds two grounds at different potentials goes through the equipment between them. At a remote site, a ground ring or multiple rods bonded together, tested to a documented resistance, is the foundation of the whole scheme.',
      },
      { t: 'h2', text: 'Layout' },
      {
        t: 'ul',
        items: [
          'Unprotected conductors run from the conduit to the protector by the shortest path and nowhere else.',
          'Protected conductors leave the protector on the other side and enter the panel wireway; they do not run parallel to the unprotected side.',
          'The protector ground lead goes straight to the bar; no loops, no sharing with signal conductors.',
          'Shields are bonded at the entrance bar, on the unprotected side, and continue on the protected side only if the design requires it.',
          'The antenna coax enters at the same place as everything else, through its arrestor on the same bar.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A protector in the wrong place',
        text: 'A loop protector mounted on the far side of the panel from the entrance, with the unprotected loop conductors running the length of the wireway to reach it, has already coupled the surge into every conductor in that wireway before it clamps. Protectors go at the entrance, and the entrance is one place.',
      },
      { t: 'h2', text: 'Staging the power' },
      {
        t: 'p',
        text: 'The service entrance device takes the bulk of the energy; the panel entrance device clamps what reaches the panel; a third stage at the 24 volt supplies or at the controller catches the remainder where the exposure is severe, such as a hilltop tank site. Each stage has a lower let-through than the one before, and the conductor length between stages gives the upstream device time to conduct first. The controller supply, the switch, and the radio behind a UPS with its own protection have four stages between them and the sky.',
      },
      { t: 'h2', text: 'After a strike' },
      {
        t: 'steps',
        items: [
          { title: 'Look at the indicators', text: 'Every protector with a window or a light; the ones that have sacrificed themselves are replaced.' },
          { title: 'Test the loops', text: 'Each loop for continuity and the protector for a short; a protector that failed short reads as a grounded loop.' },
          { title: 'Check the radio path', text: 'The arrestor, the coax, and the received signal against the record.' },
          { title: 'Check the grounds', text: 'The bonds at the bar and the electrode resistance; a strike can loosen a clamp or burn a conductor.' },
          { title: 'Look for the way in', text: 'A damaged device tells you which path the surge took, and that path gets a better protector or a better ground.' },
          { title: 'Record', text: 'The date, the damage, and the replacements, so that the site history shows which paths are weak.' },
        ],
      },
      { t: 'h2', text: 'Specification checklist' },
      {
        t: 'ul',
        items: [
          'A single entrance with a protector rail and a ground bar shown on the panel layout.',
          'The bonding conductor from the bar to the electrode system sized and routed on the drawing.',
          'A protector for every conductor that leaves the building, listed on the I/O list beside the point.',
          'Power protection staged, with the ratings on the one-line.',
          'Monitoring contacts wired and alarmed where the protector provides them.',
          'Spares of each type in the panel pocket and on the shelf.',
          'The site electrode system tested at commissioning and on a schedule.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The panel has a power surge protector already. Is the loop protection really needed?',
        a: 'The level transmitter cable in the wet well and the float cables are the antennas at a lift station, and the surge on them arrives at the input modules, not at the power supply. Loop and discrete protection at the entrance is what saves the controller.',
      },
      {
        q: 'Can I mount the protectors in the field junction box instead?',
        a: 'A protector in the field box protects the field device, and a second set at the panel protects the panel. Both are used on exposed sites; the panel entrance set is the one that is never omitted.',
      },
      {
        q: 'How good does the site ground need to be?',
        a: 'As low as the site allows and, more importantly, bonded: every ground at the site tied together. A single rod at high resistance with everything bonded to it is better than three excellent rods that are not bonded to each other.',
      },
      {
        q: 'Why does the radio keep dying while the controller survives?',
        a: 'The antenna feed is a direct path to the radio, and its arrestor or the mast ground is inadequate or not bonded to the panel ground. Bond the mast to the site electrode system, put the arrestor at the entrance on the bar, and check the coax for water.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/surge-devices',
      '/controls/instrumentation/signals/surge-protection',
      '/how-to/panel-how-to/select-surge-protection',
      '/troubleshooting/radio-troubleshooting/remote-site-stops-communicating',
      '/troubleshooting/grounding-troubleshooting/missing-equipment-ground',
      '/troubleshooting/grounding-troubleshooting/ground-loop-symptoms',
    ],
  },
  {
    path: '/controls/control-panels/plc-panels/panel-networking',
    kind: 'reference',
    title: 'Panel Networking',
    summary:
      'The network inside a controller panel: which networks exist and how they are kept apart, where the switch sits, copper patching and fiber entry, the radio or cellular router as a panel component, cable management, shield grounding, and labeling.',
    answer:
      'A controller panel usually carries more than one network: the control network that links the controller to SCADA and engineering, the device network for drives, instruments, and remote I/O, and sometimes a separate management network or a private I/O ring, and the panel design keeps them distinguishable and, where the design requires it, separate. The switch sits on the rail with its ports labeled against the network schedule, the copper cables from the field land on couplers or a small patch panel rather than being plugged straight into the switch, the fiber enters through a management tray with radius control and lands on a patch panel, the radio or cellular router is mounted as a panel component with its antenna feed through the surge entrance, and every cable carries a label at both ends. The result is a panel where a technician with the drawing can find any link, read its port status, and replace any cable without guessing.',
    keyPoints: [
      'Know which networks are in the panel and keep them separate by port, virtual network, or physical switch as the design requires.',
      'Field copper lands on couplers or a patch panel; field fiber lands on a fiber patch panel in a tray.',
      'The switch, the router, and the media converters are panel components: rail-mounted, on 24 volts, on the UPS, grounded, labeled.',
      'Network cables stay out of the power wireway; shields and switch chassis bond to the panel ground.',
      'Every port and cable is labeled against the network schedule, and the switch configuration is backed up with the panel drawings.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Panels', 'PLC', 'Networking', 'Ethernet', 'Design'],
    blocks: [
      { t: 'h2', text: 'The networks in a panel' },
      {
        t: 'table',
        head: ['Network', 'Members', 'Separation'],
        rows: [
          ['Control network', 'Controller, SCADA path, engineering access, touchscreen', 'Its own virtual network or switch; the firewall boundary is here'],
          ['Device network', 'Drives, instruments on Ethernet, remote I/O adapters', 'Separate virtual network or a second controller port; multicast handled'],
          ['Private I/O ring', 'Remote I/O drops on a ring protocol', 'Physically separate; nothing else on it'],
          ['Management', 'Switch management, network monitor', 'Its own virtual network where the switch supports it'],
          ['Telemetry', 'Radio or cellular router to the control network', 'Behind the site firewall or the controller second port'],
        ],
      },
      { t: 'h2', text: 'Placement' },
      {
        t: 'p',
        text: 'The switch mounts on the rail near the controller, away from the drives and the power section, with its ports facing the wireway that carries the network cables. Field copper enters through the surge entrance where it leaves the building, or directly where it does not, and lands on couplers or a patch panel; short patch cords then run to the switch, so that a field cable is never plugged directly into a switch port and a port change is a patch cord, not a field cable. Fiber enters through a tray or a small enclosure that controls the bend radius, lands on a fiber patch panel, and patch cords run to the transceivers. The radio or cellular router mounts as a panel component with its power from the UPS-backed supply, its Ethernet to the switch or the controller port, and its antenna coax through the arrestor at the surge entrance.',
      },
      { t: 'h2', text: 'Cables and grounding' },
      {
        t: 'ul',
        items: [
          'Network cables run in their own wireway or a separated section, never beside drive output cables or in the power wireway.',
          'Shielded copper is bonded at the switch end through a shielded connector or a shield clamp to the panel ground; the switch chassis is bonded to the same ground.',
          'Fiber patch cords are dressed with radius protection and never tie-wrapped tightly.',
          'Cable lengths are kept short and slack is stored in the tray, not coiled in the wireway.',
          'Cables are labeled at both ends with the link name from the network schedule; ports are labeled with the device they serve.',
        ],
      },
      { t: 'h2', text: 'Components' },
      {
        t: 'dl',
        items: [
          { term: 'Switch', def: 'Industrial, managed, rail-mounted, 24 volt, on the UPS, alarm contact wired, configuration backed up.' },
          { term: 'Media converters', def: 'Where a device has only copper and the link is fiber; industrial, rail-mounted, with link fault pass-through set deliberately.' },
          { term: 'Router or firewall', def: 'At the boundary between the site and the outside; a cellular router with its firewall, or a small industrial firewall ahead of the radio.' },
          { term: 'Patch panel and couplers', def: 'Rail-mounted couplers or a small patch panel for the copper; a fiber patch panel for the fiber.' },
          { term: 'Surge protection', def: 'Ethernet protectors on copper that leaves the building, or fiber instead; a coaxial arrestor on the antenna feed.' },
        ],
      },
      { t: 'h2', text: 'Documentation' },
      {
        t: 'p',
        text: 'The network drawing shows the switch, its ports, the devices, and the links with their media and their virtual network; the network schedule lists every address, every port, and every cable; the switch configuration file is stored with them. A panel whose network can be reconstructed from its drawings is a panel that can be repaired by someone who has never seen it. The labels on the ports and the cables are the drawing made physical.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Diagnosable at three in the morning',
        text: 'A technician at the panel with a flashlight should be able to see, without a laptop, which ports have link, which cable goes to the radio, and which goes to the drive. Port labels, cable labels, and link lights are the tools; a switch buried behind a wireway cover with unlabeled grey cables is the opposite.',
      },
    ],
    faqs: [
      {
        q: 'One switch or two?',
        a: 'One managed switch with virtual networks serves most panels. Two physical switches are used when the design requires physical separation, such as a private I/O ring, or when the control and device networks must not share hardware for security reasons.',
      },
      {
        q: 'Where does the cellular router go?',
        a: 'In the panel as a component, on the UPS-backed supply, with its antenna feed through the surge entrance and its Ethernet to the port the design assigns, usually the controller second port or a firewalled switch port. Not on a shelf with a wall adapter.',
      },
      {
        q: 'Can I plug the field cable straight into the switch?',
        a: 'It works, and it costs a patch cord. The problem is later: the field cable is stiff, it takes a bend it should not, the port is changed by unplugging a field cable, and the label is on the wrong thing. Couplers are cheap.',
      },
      {
        q: 'Does the panel network need a firewall?',
        a: 'Wherever the panel connects to something outside its zone: the radio, the cellular network, the plant business network. A remote site with a cellular router uses the router firewall; a plant panel on the control network relies on the plant boundary firewall. The zone drawing decides.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/network-switches',
      '/engineering-library/drawings/network-drawings',
      '/engineering-library/lists-schedules/network-schedules',
      '/cybersecurity/network-segmentation/segmenting-a-remote-site',
      '/troubleshooting/fiber-troubleshooting/dirty-or-damaged-connector',
      '/controls/control-panels/plc-panels/panel-surge-protection',
    ],
  },
  {
    path: '/controls/control-panels/pump-panels/duplex',
    kind: 'reference',
    title: 'Duplex Pump Panels',
    summary:
      'The duplex control panel: two pumps on one wet well and the sections every duplex panel contains, from power and starters through level control, alternation, hand-off-auto, alarms, and the backup float circuit to telemetry, with the failure responses.',
    answer:
      'A duplex panel controls two pumps on one wet well, alternating them so that both wear evenly and running both when one cannot keep up, and it is the most common control panel in a wastewater collection system. Every duplex panel has the same sections: a disconnect and power distribution with the short-circuit current rating, two motor starters or drives with overload protection, a level control that calls the pumps at set levels, an alternator that swaps the lead pump each cycle, hand-off-auto selection for each pump, seal and temperature protection for submersible pumps, a high level alarm with a local light and horn, a backup float circuit that runs the pumps if the primary level control or the controller fails, and a telemetry connection that reports it all. The design choice is whether the level control and alternation live in relays and a level controller or in a programmable controller; the details that matter are the ones that decide what happens when something fails.',
    keyPoints: [
      'Two starters or drives, one level control, one alternator, hand-off-auto per pump, seal and thermal protection, high level alarm, backup floats, telemetry.',
      'The backup float circuit runs the station without the controller; it is wired, tested, and on the drawing.',
      'Alternation swaps the lead each cycle; the lag pump starts when the lead cannot keep up.',
      'Every failure has a defined response: pump fault, level signal loss, controller fault, power loss, generator transfer.',
      'The panel is built to UL 508A with the short-circuit current rating, and to UL 698A if intrinsically safe circuits enter the wet well.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Panels', 'Pumps', 'Lift Stations', 'Design', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'Sections of a duplex panel' },
      {
        t: 'table',
        head: ['Section', 'Contents', 'Notes'],
        rows: [
          ['Power', 'Main disconnect, branch breakers, surge protective device, control transformer, phase monitor', 'Short-circuit current rating on the nameplate; generator receptacle and transfer where provided'],
          ['Starters', 'Two across-the-line starters, soft starters, or drives, with overloads', 'Sized for the motor; drives where flow control or soft starting is needed'],
          ['Level control', 'A level controller or the programmable controller reading a submersible transmitter or floats', 'Setpoints for lead on, lag on, all off, high alarm, low alarm'],
          ['Alternation', 'Alternator relay or controller logic', 'Alternates each cycle; manual lead selection; runtime alternation as an option'],
          ['Hand-off-auto', 'A selector per pump, with feedback to the controller', 'Hand runs the pump regardless of level, subject to the safeties the design keeps'],
          ['Pump protection', 'Seal leak and thermal switch relays, phase monitor, overload', 'Seal leak alarms; thermal and phase faults stop the pump'],
          ['Alarms', 'High level, pump fault, power fail, seal fail; a light and a horn with silence', 'Local annunciation for a passerby, and every alarm to telemetry'],
          ['Backup', 'Float switches through intrinsically safe relays driving the starters directly', 'Runs the station when the primary control fails; alternates with a backup alternator'],
          ['Telemetry', 'Controller, radio or cellular, switch, UPS', 'Runs, faults, levels, alarms, and remote control if allowed'],
          ['Wet well interface', 'Intrinsically safe barriers for floats and the transmitter', 'Control drawing in the panel'],
        ],
      },
      { t: 'h2', text: 'Level control' },
      {
        t: 'p',
        text: 'The level control calls the lead pump at the lead-on level, the lag pump at the lag-on level if the level keeps rising, and stops both at the off level, with the high level alarm above lag-on and a low level cutoff below off to protect the pumps from running dry. The levels are set from the wet well geometry: enough volume between off and lead-on to keep the starts per hour within the motor rating, and enough between lead-on and the high alarm for a response. A submersible pressure transmitter or a radar unit gives a continuous level for the controller; floats give discrete levels for a relay design and for the backup. The control narrative states the levels and they are on the drawing and in the controller.',
      },
      {
        t: 'formula',
        expr: 'Starts per hour ≈ Q_in ÷ (V_cycle) × 60 ÷ (1 + Q_in ÷ (Q_pump − Q_in))',
        where: [
          'Q_in = inflow rate at the condition being checked',
          'Q_pump = pump rate',
          'V_cycle = wet well volume between off and lead-on',
          'The worst case is inflow at half the pump rate; keep the result within the motor starts-per-hour rating',
        ],
      },
      { t: 'h2', text: 'Alternation and lag' },
      {
        t: 'p',
        text: 'The alternator swaps which pump is lead after each cycle, so that both accumulate similar runtime and both are proven each day. If the lead pump fails to start or trips, the alternator or the controller promotes the other pump immediately and raises an alarm. The lag pump starts when the level reaches lag-on, which happens when inflow exceeds one pump or the lead pump is not delivering; both then run until the off level. A manual lead selection lets an operator favor one pump when the other is suspect, and a runtime-based alternation, available in controller designs, balances hours rather than cycles.',
      },
      { t: 'h2', text: 'Backup' },
      {
        t: 'p',
        text: 'When the level transmitter fails, the controller faults, or the panel loses its control power to the controller section, the station must still pump. The backup circuit is a set of floats, typically off, lead-on, lag-on, and high, wired through intrinsically safe relays to a backup alternator and directly to the starter coils, so that the pumps run on floats with no controller in the path. It is selected automatically when the controller drops a watchdog relay, or manually with a selector, and it is tested on a schedule by simulating the failure. A duplex panel without a working backup circuit is a lift station that overflows when a transmitter fails.',
      },
      { t: 'h2', text: 'Failure responses' },
      {
        t: 'table',
        head: ['Failure', 'Response'],
        rows: [
          ['One pump faults', 'The other pump becomes lead; alarm; the fault latches until reset'],
          ['Level transmitter fails', 'The controller detects the bad signal and runs on floats; alarm'],
          ['Controller faults', 'The watchdog relay drops and the backup circuit takes the station; alarm through the dialer or the backup telemetry path'],
          ['High level', 'Both pumps called; local light and horn; alarm to telemetry; the high float independent of the transmitter'],
          ['Power fails', 'Alarm from the UPS-backed telemetry; the generator or a portable connection restores pumping'],
          ['Generator transfer', 'Staggered restart so both pumps do not start on the same second'],
          ['Seal leak', 'Alarm; the pump keeps running until the thermal or the operator stops it, by design'],
          ['Phase loss or reversal', 'The phase monitor stops the pumps and alarms'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The door',
        text: 'A duplex panel is opened at night by an operator with a flashlight. Run lights, fault lights, a level display, the hand-off-auto selectors, the alarm silence, and the backup selector belong on the inner door, labeled, so that the station can be understood and operated in hand without opening the dead front.',
      },
    ],
    faqs: [
      {
        q: 'Relay panel or controller panel?',
        a: 'A relay panel with a level controller is simple, cheap, and serviceable by any electrician; a controller panel adds runtime alternation, a continuous level, smarter alarms, and telemetry data. Most new stations use a small controller with a full relay backup; the backup is what makes the controller acceptable.',
      },
      {
        q: 'How many floats for the backup?',
        a: 'Four is typical: off, lead-on, lag-on, and high alarm. Some designs use three with a common off for both pumps. The high float is wired to the alarm independently of everything else.',
      },
      {
        q: 'Should hand mode bypass the safeties?',
        a: 'Hand bypasses the level control so the operator can pump down manually; it should not bypass the overload, the phase monitor, or the thermal switch. The low level cutoff in hand is a design decision; many designs keep it, and the drawing says which.',
      },
      {
        q: 'Do I need drives on a duplex station?',
        a: 'Only when the station needs flow control, a soft start for the electrical system or the force main, or energy savings from running at reduced speed. Across-the-line or soft starters serve most duplex stations, and drives add heat, harmonics, and complexity that must be designed for.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/controls/control-panels/pump-panels/lead-lag',
      '/controls/control-panels/pump-panels/alternation',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/controls/control-panels/pump-panels/hoa',
      '/controls/control-panels/panel-design/ul-698a',
    ],
  },
  {
    path: '/controls/control-panels/pump-panels/triplex',
    kind: 'reference',
    title: 'Triplex Pump Panels',
    summary:
      'The triplex control panel: three pumps on one wet well, the alternation schemes that keep three pumps evenly used, staging levels and standby logic, power, drives and their coordination, the backup circuit for three pumps, and what a duplex never decides.',
    answer:
      'A triplex panel controls three pumps, usually with two able to carry the peak flow and the third as standby, and it differs from a duplex panel in the questions it must answer: which pump is lead, which is lag, and which is standby on each cycle; how the roles rotate so that all three get similar hours and all three are proven; what happens when one pump is out of service, so that the remaining two behave as a duplex; and how the power system, the generator, and the force main tolerate two or three pumps starting. The sections are those of a duplex panel with one more starter, a three-position alternation scheme, staging levels for lead, lag, and standby, and a backup circuit that can run three pumps on floats. On larger stations the pumps are on drives, and the panel coordinates their speeds as well as their sequence.',
    keyPoints: [
      'Three roles on each cycle, lead, lag, and standby, rotated so that every pump runs and hours stay balanced.',
      'Staging levels for lead-on, lag-on, and standby-on, with the third pump usually reserved for peak or failure.',
      'When one pump is out of service, the logic becomes duplex automatically; the operator does not reconfigure anything.',
      'The power system, the generator, and the force main are checked for two and three pumps starting; starts are staggered.',
      'The backup circuit runs three pumps on floats with its own alternation, and it is tested.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Panels', 'Pumps', 'Lift Stations', 'Design', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'Roles and rotation' },
      {
        t: 'table',
        head: ['Scheme', 'How it rotates', 'When to use'],
        rows: [
          ['First on, first off', 'The pump that started first stops first; the next cycle starts with the next pump', 'The common scheme; balances starts and hours reasonably'],
          ['Lead rotates each cycle', 'Lead moves to the next pump after each cycle; lag and standby follow in order', 'Simple relay alternators and small controllers'],
          ['Runtime balancing', 'The pump with the fewest hours becomes lead at the next cycle', 'Controller designs; the best hour balance'],
          ['Fixed standby', 'Two pumps alternate as a duplex; the third is manual standby', 'Where the third pump is a different size or a spare kept dry'],
          ['Manual lead', 'The operator fixes the lead; the others rotate', 'Testing, or favoring a pump after repair'],
        ],
      },
      {
        t: 'p',
        text: 'Whatever the scheme, the rule is that every pump runs regularly, a pump that has not run for a set period is exercised, and a pump that is out of service, in off, or faulted is skipped without the operator touching the sequence. The controller tracks starts and hours per pump and SCADA trends them; a pump whose hours fall behind is a pump with a problem or a selector left in off.',
      },
      { t: 'h2', text: 'Staging' },
      {
        t: 'p',
        text: 'The lead pump starts at lead-on, the lag at lag-on, and the standby at standby-on, each level higher than the last, with all stopping at the off level or at staggered off levels that stop the last-started pump first. The volume between the levels sets the starts per hour for each role and the response time before the high alarm; a triplex station usually has the third pump reserved for peak inflow and for the failure of another, so standby-on sits just below the high alarm. Drives change the picture: a station on drives runs the lead at a speed that matches inflow, brings the lag in when the lead reaches full speed, and only then the standby, with the levels serving as the backstop.',
      },
      { t: 'h2', text: 'Power and starting' },
      {
        t: 'ul',
        items: [
          'The panel full-load current, the transformer, the generator, and the service are sized for all three pumps running where the design allows it, or the logic limits the number that can run.',
          'Starts are staggered by a few seconds so that two or three motors never start on the same instant, especially on generator power.',
          'Soft starters or drives on larger pumps to keep the inrush and the force main surge within limits.',
          'The short-circuit current rating accounts for the larger transformer that a triplex station usually has.',
          'Phase monitoring, surge protection, and the control transformer sized for three starters and the control section.',
        ],
      },
      { t: 'h2', text: 'Drives' },
      {
        t: 'p',
        text: 'A triplex station on drives coordinates speed and sequence: a level PID sets the speed of the running pumps, the lag is added when the lead is at maximum and the level still rises, the standby is added on the same rule, and pumps running together share the same speed reference so that none is throttled by the others. The minimum speed is set from the pump curve and the force main so that a pump always moves water, and a pump that runs at minimum speed for too long is stopped to let the level cycle. The panel needs the drive heat accounted for in the enclosure design, harmonic mitigation where the service requires it, and drive output cabling routed away from everything else.',
      },
      { t: 'h2', text: 'Backup' },
      {
        t: 'p',
        text: 'The backup circuit for three pumps is the duplex backup with a third stage: floats for off, lead-on, lag-on, standby-on, and high, through intrinsically safe relays and a three-position backup alternator to the starter coils. Some designs run only two pumps on backup, treating the third as manual; the drawing says which, and the choice is tested by simulating a controller failure at a high inflow. A triplex station with drives needs the drives to accept a hardwired run command and a preset speed in backup, or contactor bypasses that run the pumps across the line.',
      },
      { t: 'h2', text: 'Out of service' },
      {
        t: 'p',
        text: 'A pump in off, faulted, or locked out drops out of the rotation and the remaining two run as a duplex with their staging levels unchanged; the operator does not reconfigure anything, and SCADA shows which pump is out and why. The logic that handles it is tested by taking each pump out in turn during commissioning and watching the sequence. A station that needs its operator to move selectors when a pump fails is a station that overflows on a holiday.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Two are enough',
        text: 'A triplex station is designed so that two pumps carry the peak flow, because the third will be out of service some day. If the design needs all three for peak, the station is a triplex in name and a duplex with no standby in practice; the pump selection, not the panel, decides.',
      },
    ],
    faqs: [
      {
        q: 'Why not just run the lead and lag and leave the third as a spare?',
        a: 'Because a spare that never runs seizes, its seals dry, and its starter is unproven when it is needed. Rotating all three keeps each proven and balances the wear; the fixed standby scheme is used only when the third pump is genuinely different.',
      },
      {
        q: 'How do I balance hours when one pump is larger?',
        a: 'Mixed sizes complicate rotation; the usual approach is a fixed role for the different pump, such as a small jockey pump for low flows or the large pump as standby for peaks, with the two similar pumps alternating. The control narrative describes it.',
      },
      {
        q: 'Can all three pumps run at once?',
        a: 'Only if the power system, the force main, and the downstream system are designed for it. Many stations limit the logic to two running and use the third only when one of the two has failed; the design states the maximum and the reason.',
      },
      {
        q: 'Does the backup need all five floats?',
        a: 'A full backup for three pumps uses five; a backup that runs two pumps uses four. The high float is always independent. The decision depends on how the station is expected to behave with the controller down, and it is on the drawing.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/triplex-lift-stations',
      '/controls/control-panels/pump-panels/duplex',
      '/controls/control-panels/pump-panels/alternation',
      '/controls/control-panels/pump-panels/vfd',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
    ],
  },
  {
    path: '/controls/control-panels/pump-panels/alternation',
    kind: 'reference',
    title: 'Alternation',
    summary:
      'Pump alternation at the panel level: what it is for, the alternator relay against controller logic, schemes from alternate-every-cycle to runtime balancing, manual lead selection, skipping a failed pump, alternation in the backup circuit, and the tests.',
    answer:
      'Alternation decides which pump runs first on each cycle so that the pumps in a station share the work, each is proven regularly, and a failure of one is covered by the other without anyone at the panel. It is implemented either by an alternator relay, a small device that flips its output on each cycle and is wired between the level control and the starters, or by logic in the programmable controller, which can also balance runtime, skip a faulted pump, exercise an idle one, and report what it did. The rules are the same either way: the lead changes each cycle or by hours, a pump that is off, faulted, or locked out is skipped, a pump that returns rejoins the rotation, an operator can fix the lead for a reason and the fixing is visible, and the backup circuit alternates on its own when the controller is out. A station whose alternation has never been tested by faulting a pump has alternation on paper.',
    keyPoints: [
      'Alternation shares the work, proves each pump regularly, and covers a failure automatically.',
      'An alternator relay flips each cycle; controller logic can balance hours, skip faults, and report.',
      'A pump in off, faulted, or locked out is skipped without operator action, and rejoins when it returns.',
      'Manual lead selection is allowed, logged, and shown; it is the operator saying which pump to trust.',
      'The backup circuit has its own alternator; both are tested by faulting a pump.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Panels', 'Pumps', 'Control', 'Lift Stations', 'Design'],
    blocks: [
      { t: 'h2', text: 'Relay or controller' },
      {
        t: 'table',
        head: ['Capability', 'Alternator relay', 'Controller logic'],
        rows: [
          ['Alternate each cycle', 'Yes', 'Yes'],
          ['Balance by runtime', 'No', 'Yes'],
          ['Skip a faulted pump', 'Only with external wiring', 'Yes, from the fault and status inputs'],
          ['Exercise an idle pump', 'No', 'Yes, on a schedule'],
          ['Manual lead selection', 'A selector switch', 'A screen selection with logging'],
          ['Report the sequence', 'No', 'Yes, to SCADA'],
          ['Work with the controller down', 'Yes', 'No; the backup circuit needs its own relay'],
        ],
      },
      { t: 'h2', text: 'Schemes' },
      {
        t: 'dl',
        items: [
          { term: 'Alternate every cycle', def: 'The lead swaps after each pump-down. Simple, balanced in starts, roughly balanced in hours. The default for a duplex.' },
          { term: 'First on, first off', def: 'For three or more pumps: the pump that started first stops first and the rotation advances. Balances starts and hours across the group.' },
          { term: 'Runtime balancing', def: 'The pump with the fewest hours since the last balance is lead. Best hour balance; needs a controller; can be combined with a maximum consecutive starts rule so one pump does not do every short cycle.' },
          { term: 'Exercise', def: 'A pump that has not run for a set period, a day or a week, is started as lead at the next cycle regardless of the scheme, so that a standby is proven.' },
          { term: 'Fixed lead', def: 'The operator selects the lead for a reason: a pump under observation, a repair, a test. The selection is shown on the screen and logged, and the design decides whether it expires.' },
        ],
      },
      { t: 'h2', text: 'Faults and returns' },
      {
        t: 'p',
        text: 'A pump that faults during a cycle is removed from the rotation and the next pump takes over immediately, with an alarm; the fault latches until an operator resets it, because a pump that trips on overload should not restart on its own. A pump whose selector is in off is likewise skipped, and the controller alarms if it stays in off past a set time, since a selector left in off after maintenance is the commonest cause of a station running as a simplex. When the fault is reset or the selector returns to auto, the pump rejoins the rotation at the next cycle rather than starting at once, unless the level calls it. The logic is tested by faulting each pump in turn and watching the other take the station.',
      },
      { t: 'h2', text: 'Alternation in the backup' },
      {
        t: 'p',
        text: 'The backup float circuit has its own alternator relay wired between the floats and the starters, because the controller alternation is gone when the backup is in use. It alternates each cycle on the float inputs, and a pump fault in backup is handled by the overload dropping that starter, with the other pump still called by the floats. The backup alternator is tested with the controller alternation, on the same schedule, by selecting backup and running a cycle on floats.',
      },
      { t: 'h2', text: 'Testing' },
      {
        t: 'steps',
        items: [
          { title: 'Cycle test', text: 'Run several pump-downs and record which pump led each; the lead should change per the scheme.' },
          { title: 'Fault test', text: 'Trip or simulate a fault on the lead pump mid-cycle; the other pump takes over at once and the alarm arrives.' },
          { title: 'Off test', text: 'Put one selector in off; the station runs as a simplex on the other, with the alarm after the set time.' },
          { title: 'Return test', text: 'Reset the fault and return the selector; the pump rejoins at the next cycle.' },
          { title: 'Backup test', text: 'Select backup or simulate the controller failure; the floats run the station and the backup alternator changes the lead each cycle.' },
          { title: 'Record', text: 'The starts and hours per pump from SCADA over a month; the balance is the proof the scheme works.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Both pumps on one starter',
        text: 'A wiring error in an alternator circuit, or a welded alternator contact, can call both pumps on every cycle or neither. The cycle test with someone watching the starters is the only way it is found before the runtime records show one pump with all the hours.',
      },
    ],
    faqs: [
      {
        q: 'Alternate by cycle or by runtime?',
        a: 'By cycle for a simple station and a relay design; by runtime with a maximum consecutive starts rule where a controller is present and the pumps see very different cycle lengths. Either way, exercise the idle pump and skip the faulted one.',
      },
      {
        q: 'Should the operator be able to fix the lead?',
        a: 'Yes, for a reason, with the selection visible on the screen and logged. A fixed lead that nobody remembers setting is found when the other pump has not run for a year; the design either expires the selection or alarms on it.',
      },
      {
        q: 'What happens to alternation when the station is in hand?',
        a: 'Hand overrides alternation for that pump; the other pump stays in the rotation as the only automatic pump. The controller shows both states, and the alarm for a pump left in hand is set for a reasonable time.',
      },
      {
        q: 'How do I alternate pumps of different sizes?',
        a: 'You generally do not: the small pump takes a fixed role for low flows and the large one for peaks, or the two similar pumps alternate and the odd one is fixed standby. The control narrative describes the roles.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-alternation',
      '/controls/control-panels/pump-panels/lead-lag',
      '/how-to/plc-how-to/program-lead-lag-pumps',
      '/controls/control-panels/pump-panels/duplex',
      '/controls/control-panels/pump-panels/triplex',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
    ],
  },
];
