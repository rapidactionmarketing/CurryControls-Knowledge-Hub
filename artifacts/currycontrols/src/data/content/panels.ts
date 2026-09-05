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
];
