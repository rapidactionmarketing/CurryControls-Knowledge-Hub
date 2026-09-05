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
];
