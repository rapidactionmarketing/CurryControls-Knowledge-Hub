/**
 * Controls and automation glossary.
 *
 * Each term gets its own page. Definitional queries are a large share of how
 * people arrive at a subject like this, and a short, accurate, self-contained
 * definition is also the passage an answer engine will quote.
 */

export type GlossaryTerm = {
  slug: string;
  term: string;
  /** Expanded form of an acronym, where the term is one. */
  expansion?: string;
  /** Other names people search for. Fed into the search index. */
  aliases?: string[];
  category: GlossaryCategory;
  /** One or two sentences. Must stand alone out of context. */
  short: string;
  /** A little more depth. One or two short paragraphs. */
  body: string[];
  /** Other glossary slugs. */
  seeAlso?: string[];
  /** Knowledge-base paths that cover this properly. */
  related?: string[];
};

export type GlossaryCategory =
  | 'PLC & Programming'
  | 'Signals & Analog'
  | 'Instrumentation'
  | 'SCADA & HMI'
  | 'Control Panels'
  | 'Networking'
  | 'Water & Wastewater'
  | 'Cybersecurity'
  | 'Standards';

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  'PLC & Programming',
  'Signals & Analog',
  'Instrumentation',
  'SCADA & HMI',
  'Control Panels',
  'Networking',
  'Water & Wastewater',
  'Cybersecurity',
  'Standards',
];

const T = (t: GlossaryTerm): GlossaryTerm => t;

export const GLOSSARY: GlossaryTerm[] = [
  /* ---------------------------- PLC & programming --------------------------- */
  T({
    slug: 'plc',
    term: 'PLC',
    expansion: 'Programmable Logic Controller',
    aliases: ['programmable logic controller', 'programmable controller'],
    category: 'PLC & Programming',
    short:
      'A ruggedized industrial computer that reads field inputs, solves a control program, and drives outputs on a repeating, deterministic cycle.',
    body: [
      'A PLC is built for predictability and uptime rather than raw speed. It runs a fixed scan, tolerates heat, vibration, and electrical noise, and is expected to run for years without a restart.',
      'It replaced racks of hardwired relay logic, which is why its programming languages and much of its vocabulary still borrow from relay drawings.',
    ],
    seeAlso: ['pac', 'rtu', 'scan-time', 'ladder-logic'],
    related: ['/controls/plc-systems/plc-fundamentals/what-is-a-plc'],
  }),
  T({
    slug: 'pac',
    term: 'PAC',
    expansion: 'Programmable Automation Controller',
    category: 'PLC & Programming',
    short:
      'A vendor term for a higher-end controller with more memory, structured data types, and better handling of motion or batch. Functionally it is still a PLC.',
    body: [
      'The boundary between PLC and PAC is marketing rather than engineering. Anything sold as a PAC executes a scan-based control program against field I/O in the same way a PLC does.',
    ],
    seeAlso: ['plc', 'rtu'],
  }),
  T({
    slug: 'rtu',
    term: 'RTU',
    expansion: 'Remote Terminal Unit',
    category: 'PLC & Programming',
    short:
      'A controller at a remote site, optimized for low power, a wide temperature range, and reporting over a constrained link such as radio or cellular.',
    body: [
      'In water and wastewater, most lift station RTUs are simply small PLCs in a remote panel. What makes them an RTU is the role and the communication constraints, not a different kind of hardware.',
    ],
    seeAlso: ['plc', 'dnp3', 'report-by-exception'],
    related: ['/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations'],
  }),
  T({
    slug: 'scan-time',
    term: 'Scan time',
    aliases: ['scan cycle', 'sweep time'],
    category: 'PLC & Programming',
    short:
      'How long a PLC takes to complete one full cycle of reading inputs, solving the program, writing outputs, and housekeeping.',
    body: [
      'Typical values run from a few milliseconds to a few tens of milliseconds. What matters is not the number itself but whether it is stable and comfortably under the watchdog setting.',
      'Scan time sets a floor on response: a field contact cannot affect an output faster than roughly one to two scans plus input filter and output switching time.',
    ],
    seeAlso: ['watchdog', 'plc', 'task'],
    related: ['/controls/plc-systems/plc-fundamentals/scan-cycle'],
  }),
  T({
    slug: 'watchdog',
    term: 'Watchdog',
    category: 'PLC & Programming',
    short:
      'A timer that faults the processor when a scan takes longer than its configured limit, on the assumption that the program has stopped making progress.',
    body: [
      'A watchdog fault says the program did not finish, which is a very different problem from a program that finished with the wrong answer. Usual causes are an unbounded loop, a routine calling itself, or a message instruction blocked on a device that stopped answering.',
    ],
    seeAlso: ['scan-time'],
    related: ['/controls/plc-systems/plc-fundamentals/watchdog'],
  }),
  T({
    slug: 'ladder-logic',
    term: 'Ladder logic',
    expansion: 'Ladder Diagram (LD)',
    aliases: ['ladder diagram', 'relay ladder logic'],
    category: 'PLC & Programming',
    short:
      'A graphical PLC programming language drawn to resemble relay ladder diagrams, where a rung energizes its output when a continuous path of true conditions exists across it.',
    body: [
      'Contacts in series form a logical AND and parallel branches form an OR, so the visual layout of a rung is a direct picture of the boolean expression behind it.',
      'It remains the dominant language in water, wastewater, and most discrete manufacturing, largely because maintenance staff can read it online while the process runs.',
    ],
    seeAlso: ['rung', 'coil', 'contact', 'iec-61131-3'],
    related: ['/controls/plc-systems/programming/ladder-logic'],
  }),
  T({
    slug: 'rung',
    term: 'Rung',
    category: 'PLC & Programming',
    short:
      'One horizontal line of ladder logic: input conditions on the left, an output on the right, read left to right.',
    body: [
      'Rungs solve top to bottom in a single pass, so a bit set on an early rung is already set when a later rung examines it, while a bit set later will not be seen until the next scan.',
    ],
    seeAlso: ['ladder-logic', 'coil', 'contact'],
  }),
  T({
    slug: 'contact',
    term: 'Contact',
    aliases: ['examine if closed', 'examine if open', 'XIC', 'XIO'],
    category: 'PLC & Programming',
    short:
      'A ladder instruction that tests a memory bit. Examine-if-closed is true when the bit is on; examine-if-open is true when it is off.',
    body: [
      'A contact in a program is not a contact in the field. Whether the bit is on depends on how the device is wired and whether the field contact is normally open or normally closed, and confusing the two is a common commissioning error.',
    ],
    seeAlso: ['coil', 'rung', 'ladder-logic'],
  }),
  T({
    slug: 'coil',
    term: 'Coil',
    category: 'PLC & Programming',
    short:
      'A ladder output instruction that sets a bit on while its rung is true and off when the rung goes false.',
    body: [
      'Writing the same coil address from more than one rung is a common defect: the last rung solved wins, and the resulting behavior confuses everyone including the author.',
    ],
    seeAlso: ['contact', 'latch', 'rung'],
  }),
  T({
    slug: 'latch',
    term: 'Latch and unlatch',
    aliases: ['set reset', 'OTL', 'OTU'],
    category: 'PLC & Programming',
    short:
      'Instructions that set or reset a bit and hold that state when the rung goes false, unlike an ordinary coil.',
    body: [
      'Powerful and easy to misuse. Every latch needs a clearly identified unlatch, or the bit becomes a state nobody can clear without going online.',
    ],
    seeAlso: ['coil', 'retentive-memory'],
  }),
  T({
    slug: 'one-shot',
    term: 'One-shot',
    aliases: ['ONS', 'OSR', 'rising edge'],
    category: 'PLC & Programming',
    short:
      'An instruction that is true for exactly one scan when its condition transitions from false to true.',
    body: [
      'Needed any time an action should happen once per event rather than continuously: incrementing a counter, triggering a message, or capturing a value at the moment something occurred.',
    ],
    seeAlso: ['scan-time', 'rung'],
  }),
  T({
    slug: 'interlock',
    term: 'Interlock',
    category: 'PLC & Programming',
    short:
      'A condition that stops or prevents operation whenever it is present, including while equipment is already running.',
    body: [
      'Distinct from a permissive, which is only checked at the start request. Anything protecting people must be implemented in a hardwired safety circuit or a rated safety controller, not in standard PLC logic.',
    ],
    seeAlso: ['permissive'],
    related: ['/controls/plc-systems/programming/interlocks'],
  }),
  T({
    slug: 'permissive',
    term: 'Permissive',
    category: 'PLC & Programming',
    short: 'A condition that must be satisfied before equipment is allowed to start.',
    body: [
      'Checked at the start transition rather than continuously. A permissive that is also enforced while running is really an interlock, and it is worth deciding which you mean before writing the logic.',
    ],
    seeAlso: ['interlock'],
    related: ['/controls/plc-systems/programming/permissives'],
  }),
  T({
    slug: 'retentive-memory',
    term: 'Retentive memory',
    category: 'PLC & Programming',
    short:
      'Controller memory that keeps its value through a power cycle, as opposed to memory that clears on startup.',
    body: [
      'Alternation state, run-hour totals, and batch counts all belong in retentive memory. Leaving pump alternation non-retentive means every power blip resets the station to the same lead pump, and over years that pump takes far more wear.',
    ],
    seeAlso: ['latch', 'tag'],
  }),
  T({
    slug: 'tag',
    term: 'Tag',
    category: 'PLC & Programming',
    short:
      'A named reference to a value in a controller or SCADA system, such as Pump_1_Run_Cmd.',
    body: [
      'Naming a tag for what it is rather than where it is wired is what makes a program survive a rewire. Tag naming conventions are one of the cheapest quality decisions on a project.',
    ],
    seeAlso: ['tag-quality', 'scada'],
  }),
  T({
    slug: 'task',
    term: 'Task',
    category: 'PLC & Programming',
    short:
      'A scheduling container in a controller. A continuous task runs whenever the processor is free; a periodic task runs on a fixed interval; an event task runs on a trigger.',
    body: [
      'Periodic tasks are how a PID loop gets a consistent execution rate. Schedule one too aggressively and it starves the continuous task, or overlaps itself and faults the controller.',
    ],
    seeAlso: ['scan-time', 'pid'],
  }),
  T({
    slug: 'iec-61131-3',
    term: 'IEC 61131-3',
    category: 'Standards',
    short:
      'The international standard defining the PLC programming languages: ladder diagram, function block diagram, structured text, sequential function chart, and instruction list.',
    body: [
      'It also defines common elements such as data types and program organization units. Vendor implementations differ enough that portability between platforms is partial at best.',
    ],
    seeAlso: ['ladder-logic', 'structured-text', 'function-block-diagram'],
    related: ['/controls/plc-systems/programming/iec-61131-3'],
  }),
  T({
    slug: 'structured-text',
    term: 'Structured text',
    expansion: 'ST',
    category: 'PLC & Programming',
    short:
      'A high-level, Pascal-like PLC programming language defined by IEC 61131-3, suited to math, loops, and string handling.',
    body: [
      'Most mature programs mix it with ladder: ladder for the interlocks and device control that maintenance must read online, structured text for the calculations underneath.',
    ],
    seeAlso: ['ladder-logic', 'iec-61131-3'],
  }),
  T({
    slug: 'function-block-diagram',
    term: 'Function block diagram',
    expansion: 'FBD',
    category: 'PLC & Programming',
    short:
      'A graphical PLC language where blocks representing functions are wired together by signal flow.',
    body: [
      'Well suited to continuous control and signal processing, where a PID block, a filter, and a scaling block wired in sequence read more naturally than the equivalent ladder.',
    ],
    seeAlso: ['iec-61131-3', 'pid'],
  }),
  T({
    slug: 'sequential-function-chart',
    term: 'Sequential function chart',
    expansion: 'SFC',
    category: 'PLC & Programming',
    short:
      'A graphical PLC language that expresses a process as steps and the transitions between them.',
    body: [
      'A natural fit for batch and startup sequences, where the state and the condition to advance are the things an operator actually needs to see.',
    ],
    seeAlso: ['iec-61131-3', 'state-machine'],
  }),
  T({
    slug: 'state-machine',
    term: 'State machine',
    category: 'PLC & Programming',
    short:
      'A control structure with explicit named states and defined transitions, rather than a tangle of interlocking conditions.',
    body: [
      'Writing a sequence as explicit states makes it possible to display the current state on the HMI, which turns "the system is stuck" into "it is waiting in step 4 for discharge pressure".',
    ],
    seeAlso: ['sequential-function-chart', 'interlock'],
  }),
  /* ---------------------------- Signals & analog ---------------------------- */
  T({
    slug: '4-20-ma',
    term: '4-20 mA',
    aliases: ['current loop', 'analog loop', '4 to 20 milliamp'],
    category: 'Signals & Analog',
    short:
      'The standard analog signal in process control: a current between 4 and 20 milliamps, where 4 mA is 0% of the calibrated range and 20 mA is 100%.',
    body: [
      'Current is used because it is constant everywhere in a series loop, so wire resistance does not change the reading the way it changes a voltage signal.',
      'The 4 mA live zero is what makes a broken wire detectable: 0 mA is not a valid measurement, so it means the loop is open.',
    ],
    seeAlso: ['live-zero', 'loop-powered', 'namur-ne-43', 'hart', 'compliance-voltage'],
    related: ['/controls/plc-systems/analog-control/4-20-ma'],
  }),
  T({
    slug: 'live-zero',
    term: 'Live zero',
    category: 'Signals & Analog',
    short:
      'A signal scheme where the bottom of the range is a non-zero value, so a genuine zero reading is distinguishable from a dead circuit.',
    body: [
      'In a 4-20 mA loop the live zero is 4 mA. Without it, an empty tank and a cut wire would look identical to the receiving device.',
    ],
    seeAlso: ['4-20-ma', 'namur-ne-43'],
  }),
  T({
    slug: 'loop-powered',
    term: 'Loop powered',
    aliases: ['two-wire transmitter'],
    category: 'Signals & Analog',
    short:
      'A transmitter that draws its operating power from the same two wires that carry its 4-20 mA signal, normally from a 24 VDC supply.',
    body: [
      'Because it never receives more than the minimum signal current, a loop-powered device has to run on less than 4 mA. Three-wire and four-wire devices take separate power because they need more than that.',
    ],
    seeAlso: ['4-20-ma', 'compliance-voltage'],
  }),
  T({
    slug: 'compliance-voltage',
    term: 'Compliance voltage',
    aliases: ['lift-off voltage'],
    category: 'Signals & Analog',
    short:
      'The minimum voltage a two-wire transmitter needs across its own terminals to operate. Whatever the supply provides above it is available to drive current through the rest of the loop.',
    body: [
      'Maximum loop resistance is the supply voltage minus the compliance voltage, divided by 0.020 amps. Run out of headroom and the loop tracks correctly at low readings but clips near full scale.',
    ],
    seeAlso: ['4-20-ma', 'loop-powered'],
  }),
  T({
    slug: 'namur-ne-43',
    term: 'NAMUR NE 43',
    category: 'Standards',
    short:
      'A recommendation defining how a transmitter signals a fault: by driving its output outside the measurement range, below 3.6 mA or above 21 mA.',
    body: [
      'This turns a sensor diagnostic into something a controller can act on. A radar transmitter that has lost echo can report 3.5 mA rather than a plausible level of zero.',
      'The fail direction is configurable and should be chosen deliberately, because failing low and failing high have very different consequences on a wet well.',
    ],
    seeAlso: ['4-20-ma', 'live-zero', 'signal-validation'],
  }),
  T({
    slug: 'hart',
    term: 'HART',
    expansion: 'Highway Addressable Remote Transducer',
    category: 'Signals & Analog',
    short:
      'A digital protocol superimposed on a 4-20 mA loop, carrying device configuration, diagnostics, and secondary variables without disturbing the analog value.',
    body: [
      'Because the digital signal averages to zero current, a HART transmitter delivers a conventional analog reading to the PLC and a digital channel to a handheld communicator at the same time.',
      'It needs a minimum loop resistance, typically around 230 ohms, which the standard 250 ohm input satisfies.',
    ],
    seeAlso: ['4-20-ma'],
    related: ['/controls/instrumentation/signals/hart'],
  }),
  T({
    slug: 'span',
    term: 'Span',
    category: 'Signals & Analog',
    short:
      'The difference between the upper and lower range values of an instrument. A transmitter ranged 0 to 25 feet has a span of 25 feet.',
    body: [
      'A span error shows as a reading that is correct at zero and increasingly wrong toward full scale, which is why checking a loop only at zero hides half the possible errors.',
    ],
    seeAlso: ['zero', 'scaling', 'turndown'],
  }),
  T({
    slug: 'zero',
    term: 'Zero',
    aliases: ['lower range value', 'suppressed zero'],
    category: 'Signals & Analog',
    short: 'The measured value an instrument reports at the bottom of its calibrated range.',
    body: [
      'A suppressed zero simply means the lower range value is not zero, such as a transmitter ranged 2 to 27 feet. The scaling arithmetic handles it, but leaving the low constant at zero produces a constant error equal to the suppression.',
    ],
    seeAlso: ['span', 'scaling'],
  }),
  T({
    slug: 'raw-counts',
    term: 'Raw counts',
    category: 'Signals & Analog',
    short:
      'The integer an analog input module produces from its analog-to-digital converter, before scaling into engineering units.',
    body: [
      'The value is arbitrary and module-specific. There is no universal count range, so it should be read from the manual and then confirmed by injecting a known current.',
    ],
    seeAlso: ['scaling', 'engineering-units'],
    related: ['/controls/plc-systems/analog-control/raw-counts'],
  }),
  T({
    slug: 'scaling',
    term: 'Scaling',
    category: 'Signals & Analog',
    short:
      'Converting a raw analog count into an engineering unit with a linear map from the card range to the transmitter calibrated range.',
    body: [
      'Three things must agree: the transmitter calibrated range, the analog card range configuration, and the constants in the program. Nearly every scaling problem is a mismatch between them.',
    ],
    seeAlso: ['raw-counts', 'engineering-units', 'square-root-extraction'],
    related: ['/controls/plc-systems/analog-control/scaling'],
  }),
  T({
    slug: 'engineering-units',
    term: 'Engineering units',
    expansion: 'EU',
    category: 'Signals & Analog',
    short:
      'The physical units a scaled value carries, such as feet of level, psi, or gallons per minute.',
    body: [
      'Recording the units on the loop sheet and in the instrument list, not only in the program, is what stops a future re-range from quietly corrupting every reading.',
    ],
    seeAlso: ['scaling', 'raw-counts'],
  }),
  T({
    slug: 'square-root-extraction',
    term: 'Square root extraction',
    category: 'Signals & Analog',
    short:
      'Taking the square root of a differential pressure signal to obtain flow, because the differential is proportional to the square of flow.',
    body: [
      'The classic error is applying it twice, once in the transmitter and again in the PLC. The reading is then wrong everywhere except at zero and full scale, which is exactly where people check.',
    ],
    seeAlso: ['scaling', 'low-flow-cutoff'],
  }),
  T({
    slug: 'low-flow-cutoff',
    term: 'Low flow cutoff',
    category: 'Signals & Analog',
    short:
      'A threshold below which a flow reading is forced to zero, to stop noise near the bottom of the range accumulating into a totalizer.',
    body: [
      'Necessary with square root extraction, which amplifies noise badly near zero. Without it, a still pipe reports a wandering trickle and the totalizer records flow that never happened.',
    ],
    seeAlso: ['square-root-extraction'],
  }),
  T({
    slug: 'pid',
    term: 'PID',
    expansion: 'Proportional-Integral-Derivative',
    category: 'Signals & Analog',
    short:
      'A control algorithm that adjusts an output based on the size of the current error, the accumulated error over time, and the rate the error is changing.',
    body: [
      'Proportional reacts to how far off you are; integral reacts to how long you have been off and removes the residual offset; derivative adds damping and amplifies noise.',
      'Most pump and pressure loops in water and wastewater run well on proportional and integral only.',
    ],
    seeAlso: ['setpoint', 'process-variable', 'integral-windup', 'bumpless-transfer'],
    related: ['/controls/plc-systems/analog-control/pid'],
  }),
  T({
    slug: 'setpoint',
    term: 'Setpoint',
    expansion: 'SP',
    category: 'Signals & Analog',
    short: 'The value a control loop is trying to hold the process at.',
    body: ['The difference between the setpoint and the process variable is the error the controller acts on.'],
    seeAlso: ['pid', 'process-variable'],
  }),
  T({
    slug: 'process-variable',
    term: 'Process variable',
    expansion: 'PV',
    category: 'Signals & Analog',
    short: 'The measured value a control loop is regulating, such as discharge pressure or wet well level.',
    body: ['No set of tuning constants compensates for a bad process variable, so the measurement is checked before the tuning.'],
    seeAlso: ['pid', 'setpoint'],
  }),
  T({
    slug: 'integral-windup',
    term: 'Integral windup',
    aliases: ['reset windup'],
    category: 'Signals & Analog',
    short:
      'The condition where a PID output is saturated but the integral term keeps accumulating, so the loop massively overshoots when the process finally responds.',
    body: [
      'Typical of a pump asked to hold pressure against a closed valve. Anti-windup, realistic output limits, and holding the integral when the loop is not in control all prevent it.',
    ],
    seeAlso: ['pid', 'bumpless-transfer'],
  }),
  T({
    slug: 'bumpless-transfer',
    term: 'Bumpless transfer',
    category: 'Signals & Analog',
    short:
      'Switching a loop from manual to automatic without the output jumping, by having the controller pick up from the current output value.',
    body: [
      'Without it, operators learn that automatic mode is dangerous and leave every loop in manual. A station where all loops sit in manual usually has this problem or windup, not a tuning problem.',
    ],
    seeAlso: ['pid', 'integral-windup'],
  }),
  T({
    slug: 'deadband',
    term: 'Deadband',
    aliases: ['hysteresis'],
    category: 'Signals & Analog',
    short:
      'A gap between the value that activates something and the value that deactivates it, so a measurement sitting on the threshold does not chatter.',
    body: [
      'Set it wider than the normal noise on the signal. The same idea, applied to alarms, removes an enormous share of nuisance annunciations.',
    ],
    seeAlso: ['alarm-rationalization', 'pid'],
    related: ['/controls/plc-systems/analog-control/deadband'],
  }),
  T({
    slug: 'signal-validation',
    term: 'Signal validation',
    category: 'Signals & Analog',
    short:
      'Logic that checks whether an analog reading can be trusted, using out-of-range, frozen-value, and rate-of-change tests.',
    body: [
      'The dangerous failure is not a reading of zero, it is a believable reading that happens to be wrong. Validation catches those and lets the controller hold the last good value and alarm rather than act on bad data.',
    ],
    seeAlso: ['namur-ne-43', 'tag-quality'],
    related: ['/controls/plc-systems/analog-control/signal-validation'],
  }),
  T({
    slug: 'ground-loop',
    term: 'Ground loop',
    category: 'Signals & Analog',
    short:
      'An error caused by a signal circuit being connected to earth at more than one point, where the potential difference drives current through the signal wiring.',
    body: [
      'Shows up as noise, drift, or an offset that changes when nearby equipment runs. The fix is a single ground reference per circuit, or a signal isolator where a second ground cannot be removed.',
      'A required protective equipment ground is never lifted to solve a signal problem.',
    ],
    seeAlso: ['signal-isolator', 'shielded-twisted-pair'],
    related: ['/controls/instrumentation/signals/ground-loops'],
  }),
  T({
    slug: 'signal-isolator',
    term: 'Signal isolator',
    aliases: ['loop isolator'],
    category: 'Signals & Analog',
    short:
      'A device that passes a 4-20 mA value across an optical or transformer barrier, so the input and output sides share no conductive path.',
    body: [
      'The standard answer where a second ground cannot be removed: a transmitter bonded to a grounded pipe, or a signal arriving from another building.',
    ],
    seeAlso: ['ground-loop'],
  }),
  T({
    slug: 'shielded-twisted-pair',
    term: 'Shielded twisted pair',
    category: 'Signals & Analog',
    short:
      'Instrument cable where the conductors are twisted together and wrapped in a shield, grounded at one end only.',
    body: [
      'The twist rejects magnetically coupled noise and the shield handles capacitive coupling. Grounding the shield at both ends creates the ground loop it was meant to prevent.',
    ],
    seeAlso: ['ground-loop', 'signal-isolator'],
  }),
  /* ----------------------------- Instrumentation ---------------------------- */
  T({
    slug: 'transmitter',
    term: 'Transmitter',
    category: 'Instrumentation',
    short:
      'A field device that measures a process variable and converts it into a standard signal, most often 4-20 mA.',
    body: [
      'A transducer converts one form of energy into another; a transmitter packages that with the electronics needed to produce a calibrated, transmittable signal.',
    ],
    seeAlso: ['4-20-ma', 'turndown', 'calibration'],
  }),
  T({
    slug: 'turndown',
    term: 'Turndown',
    aliases: ['rangeability'],
    category: 'Instrumentation',
    short:
      'The ratio between the largest and smallest measurement an instrument can make within its stated accuracy.',
    body: [
      'A meter with 10:1 turndown sized for 1000 gpm is not trustworthy below 100 gpm. Sizing on velocity rather than on pipe size is what keeps a meter inside its usable range.',
    ],
    seeAlso: ['span', 'magnetic-flowmeter'],
  }),
  T({
    slug: 'calibration',
    term: 'Calibration',
    category: 'Instrumentation',
    short:
      'Comparing an instrument against a known reference and, where necessary, adjusting it so it reads correctly across its range.',
    body: [
      'Checking at zero alone hides span errors. A minimum of three points, including the midpoint, catches both offset and span problems in about a minute.',
    ],
    seeAlso: ['loop-check', 'span', 'zero'],
    related: ['/controls/instrumentation/calibration/calibration-procedures'],
  }),
  T({
    slug: 'loop-check',
    term: 'Loop check',
    category: 'Instrumentation',
    short:
      'A test that proves a signal path works end to end, from the field device through the wiring and input card to the value the operator sees.',
    body: [
      'Injecting known currents tests everything downstream of the transmitter. Measuring the transmitter output tests everything upstream. Doing both separately tells you which half owns a problem.',
    ],
    seeAlso: ['calibration', '4-20-ma'],
    related: ['/how-to/instrumentation-how-to/test-a-4-20-ma-loop'],
  }),
  T({
    slug: 'magnetic-flowmeter',
    term: 'Magnetic flowmeter',
    aliases: ['mag meter', 'electromagnetic flowmeter'],
    category: 'Instrumentation',
    short:
      'A flowmeter that applies a magnetic field across the pipe and measures the voltage the moving conductive liquid induces, following Faraday law of induction.',
    body: [
      'No moving parts and no obstruction in the bore, which suits wastewater and slurries. It requires a conductive liquid, a completely full pipe, and grounding rings to give the measurement its reference.',
    ],
    seeAlso: ['turndown', 'ground-loop'],
    related: ['/controls/instrumentation/flow/magnetic-flowmeters'],
  }),
  T({
    slug: 'guided-wave-radar',
    term: 'Guided wave radar',
    expansion: 'GWR',
    category: 'Instrumentation',
    short:
      'A level measurement that sends a radar signal down a probe rather than through open space, concentrating the energy along the probe.',
    body: [
      'Handles low-reflectivity liquids, turbulence, foam, and narrow spaces that defeat non-contact radar. The trade-off is a probe in the liquid, which collects rag and grease in municipal wastewater.',
    ],
    seeAlso: ['radar-level', 'wet-well'],
  }),
  T({
    slug: 'radar-level',
    term: 'Radar level',
    category: 'Instrumentation',
    short:
      'Level measurement that times a microwave signal reflected from the liquid surface and subtracts the distance from a configured reference height.',
    body: [
      'Unaffected by air temperature, humidity, and most vapor, which is why it holds calibration in a wet well where ultrasonic drifts. Most field problems are mounting position and false echoes rather than the instrument.',
    ],
    seeAlso: ['guided-wave-radar', 'false-echo', 'wet-well'],
    related: ['/controls/instrumentation/level/radar-level'],
  }),
  T({
    slug: 'false-echo',
    term: 'False echo',
    category: 'Instrumentation',
    short:
      'A reflection a level instrument receives from something that is not the liquid surface, such as a ladder, a pipe, or a bracket.',
    body: [
      'The classic symptom is a level that reads correctly through most of its range and then locks onto a fixed value. An echo mapping scan with the vessel empty teaches the instrument to ignore the fixed reflections.',
    ],
    seeAlso: ['radar-level'],
  }),
  T({
    slug: 'ph',
    term: 'pH',
    category: 'Instrumentation',
    short:
      'A measure of how acidic or alkaline a solution is, on a logarithmic scale where 7 is neutral.',
    body: [
      'A pH electrode is a consumable with a finite life, drifts as it ages, and needs regular buffer calibration. Treating it as a set-and-forget instrument is the usual cause of a chemical feed system nobody trusts.',
    ],
    seeAlso: ['orp', 'calibration'],
  }),
  T({
    slug: 'orp',
    term: 'ORP',
    expansion: 'Oxidation-Reduction Potential',
    category: 'Instrumentation',
    short:
      'A millivolt measurement of a solution tendency to oxidize or reduce, used in disinfection control to indicate oxidant activity.',
    body: [
      'ORP responds to oxidant activity rather than concentration, so it is not a substitute for a chlorine residual analyzer where a specific residual must be demonstrated.',
    ],
    seeAlso: ['ph'],
  }),
  T({
    slug: 'turbidity',
    term: 'Turbidity',
    category: 'Instrumentation',
    short:
      'A measure of water cloudiness caused by suspended particles, reported in nephelometric turbidity units.',
    body: [
      'A regulated performance measure for filtration in drinking water treatment, which makes the instrument a compliance device rather than only a process indicator.',
    ],
    seeAlso: ['ph'],
  }),

  /* ------------------------------ SCADA & HMI ------------------------------- */
  T({
    slug: 'scada',
    term: 'SCADA',
    expansion: 'Supervisory Control and Data Acquisition',
    category: 'SCADA & HMI',
    short:
      'The layer that collects data from controllers across a plant or service area, presents it to operators, records it, raises alarms, and allows intervention.',
    body: [
      'SCADA supervises; the PLCs and RTUs perform the real-time control. In a correctly designed system, losing SCADA costs visibility, alarming, and history, but the process keeps running.',
    ],
    seeAlso: ['historian', 'tag-quality', 'hmi', 'rtu'],
    related: ['/controls/scada-hmi/scada-fundamentals/what-is-scada'],
  }),
  T({
    slug: 'hmi',
    term: 'HMI',
    expansion: 'Human-Machine Interface',
    category: 'SCADA & HMI',
    short: 'The operator interface itself: the displays a person runs the plant from.',
    body: [
      'A local panel on a skid is an HMI without being SCADA. SCADA includes HMI as one part alongside data acquisition, history, and alarming.',
    ],
    seeAlso: ['scada', 'high-performance-hmi', 'faceplate'],
  }),
  T({
    slug: 'high-performance-hmi',
    term: 'High performance HMI',
    category: 'SCADA & HMI',
    short:
      'A design approach where displays are built to make abnormal conditions immediately obvious: grey backgrounds, muted process elements, and saturated color reserved for alarms.',
    body: [
      'The test is whether someone who does not run the plant can point at the one abnormal item within about five seconds.',
    ],
    seeAlso: ['hmi', 'isa-101', 'situational-awareness'],
    related: ['/controls/scada-hmi/hmi-design/high-performance-hmi'],
  }),
  T({
    slug: 'situational-awareness',
    term: 'Situational awareness',
    category: 'SCADA & HMI',
    short:
      'An operator understanding of what the plant is doing now, how it got there, and what is about to happen.',
    body: [
      'Displays support it by showing analog values in context, with the normal operating range and alarm limits visible, rather than as bare numbers.',
    ],
    seeAlso: ['high-performance-hmi', 'hmi'],
  }),
  T({
    slug: 'faceplate',
    term: 'Faceplate',
    category: 'SCADA & HMI',
    short:
      'A reusable pop-up on an HMI showing the full detail and controls for one device, opened from its symbol on a process display.',
    body: [
      'Building one faceplate per device type and reusing it means operators learn one layout, and a change is made once rather than on sixty graphics.',
    ],
    seeAlso: ['hmi', 'high-performance-hmi'],
  }),
  T({
    slug: 'historian',
    term: 'Historian',
    category: 'SCADA & HMI',
    short:
      'A time-series database that stores process values over time so they can be trended, compared, and reported on.',
    body: [
      'SCADA maintains current values and operator interaction; a historian answers questions about the past. They are often sold together but solve different problems and should be specified separately.',
    ],
    seeAlso: ['scada', 'compression'],
    related: ['/controls/scada-hmi/historian-data/historian-architecture'],
  }),
  T({
    slug: 'compression',
    term: 'Compression',
    aliases: ['deadband compression', 'swinging door'],
    category: 'SCADA & HMI',
    short:
      'A historian technique that stores a value only when it changes by more than a configured amount, rather than at every scan.',
    body: [
      'Set too aggressively, it erases the short excursions that matter most in an investigation. The setting is a data-retention decision, not just a storage one.',
    ],
    seeAlso: ['historian', 'deadband'],
  }),
  T({
    slug: 'tag-quality',
    term: 'Tag quality',
    aliases: ['bad quality', 'data quality'],
    category: 'SCADA & HMI',
    short:
      'An indicator on a SCADA value saying whether it can be trusted, alongside the value itself and a timestamp.',
    body: [
      'When a remote site stops answering, its last known level does not become wrong, it becomes stale. A display that renders a stale value normally has caused more bad operating decisions than almost any other defect.',
    ],
    seeAlso: ['scada', 'signal-validation'],
    related: ['/controls/scada-hmi/scada-troubleshooting/bad-quality'],
  }),
  T({
    slug: 'alarm-rationalization',
    term: 'Alarm rationalization',
    category: 'SCADA & HMI',
    short:
      'The step in the alarm management lifecycle where each candidate alarm is tested against the philosophy and given a documented cause, consequence, corrective action, response time, and priority.',
    body: [
      'The step that produces the benefit, and the step most often skipped. Applied honestly, most of an existing alarm list turns out to be information rather than alarms.',
    ],
    seeAlso: ['isa-18-2', 'alarm-flood', 'shelving'],
    related: ['/controls/scada-hmi/alarm-management/rationalization'],
  }),
  T({
    slug: 'alarm-flood',
    term: 'Alarm flood',
    category: 'SCADA & HMI',
    short:
      'More than about ten alarms in ten minutes at one operating position, usually following a single initiating event that cascades.',
    body: [
      'Floods are designed in rather than accidental, and they are addressed at design time by suppressing the consequential alarms a known event always produces and presenting the initiating one.',
    ],
    seeAlso: ['alarm-rationalization', 'isa-18-2', 'shelving'],
    related: ['/controls/scada-hmi/alarm-management/alarm-floods'],
  }),
  T({
    slug: 'shelving',
    term: 'Shelving',
    category: 'SCADA & HMI',
    short:
      'An operator temporarily silencing a known nuisance alarm, with an automatic expiry and a visible record.',
    body: [
      'Controlled and reversible, unlike quietly disabling an alarm. Suppression, by contrast, is a designed state-based behavior defined at rationalization.',
    ],
    seeAlso: ['alarm-rationalization', 'isa-18-2'],
  }),
  T({
    slug: 'report-by-exception',
    term: 'Report by exception',
    expansion: 'RBE',
    category: 'SCADA & HMI',
    short:
      'A reporting scheme where a remote device sends data only when a value changes beyond a threshold, rather than answering continuous polls.',
    body: [
      'Fits constrained links such as licensed radio far better than polling, and it is one reason DNP3 is common in utility telemetry.',
    ],
    seeAlso: ['dnp3', 'rtu', 'poll-rate'],
  }),
  T({
    slug: 'poll-rate',
    term: 'Poll rate',
    category: 'SCADA & HMI',
    short: 'How often a SCADA system requests data from a device or remote site.',
    body: [
      'Fast enough that an operator can act on a change, slow enough that the communication path stays healthy. Polling forty radio sites every second does not work and does not help.',
    ],
    seeAlso: ['report-by-exception', 'scada'],
  }),
  /* ------------------------------ Control panels ---------------------------- */
  T({
    slug: 'ul-508a',
    term: 'UL 508A',
    category: 'Standards',
    short:
      'The United States safety standard for the construction of industrial control panels, covering component selection, spacing, conductor sizing, marking, and enclosure suitability.',
    body: [
      'It says nothing about whether the control scheme is correct. A panel can be flawlessly listed and still start the wrong pump.',
      'The label is applied by a shop holding the listing, so a field modification made outside that program can invalidate it.',
    ],
    seeAlso: ['sccr', 'nema-rating', 'ul-698a'],
    related: ['/controls/control-panels/panel-design/ul-508a'],
  }),
  T({
    slug: 'ul-698a',
    term: 'UL 698A',
    category: 'Standards',
    short:
      'The standard for industrial control panels serving hazardous locations, where the panel provides intrinsically safe field circuits.',
    body: [
      'It brings its own requirements for barriers, circuit segregation, and documentation beyond what UL 508A covers.',
    ],
    seeAlso: ['ul-508a'],
  }),
  T({
    slug: 'sccr',
    term: 'SCCR',
    expansion: 'Short-Circuit Current Rating',
    category: 'Control Panels',
    short:
      'The maximum available fault current a control panel can safely withstand, determined by its weakest power-circuit component and required on the panel label.',
    body: [
      'NEC 409.110 requires the marking, and the panel must not be installed where available fault current exceeds it. A panel carrying a default 5 kA rating downstream of a large transformer is both a hazard and a failed inspection.',
    ],
    seeAlso: ['ul-508a', 'nema-rating'],
    related: ['/controls/control-panels/panel-design/sccr'],
  }),
  T({
    slug: 'nema-rating',
    term: 'Enclosure type rating',
    aliases: ['NEMA rating', 'NEMA 4X', 'Type 4X'],
    category: 'Control Panels',
    short:
      'A classification describing what an enclosure protects against: Type 1 indoor, Type 12 dust and dripping liquid, Type 3R rain, Type 4 hosedown, Type 4X adding corrosion resistance.',
    body: [
      'In wastewater, hydrogen sulfide attacks painted steel, so 316 stainless in a Type 4X rating is routinely the cheaper decision over the life of a lift station.',
    ],
    seeAlso: ['ul-508a', 'heat-load'],
  }),
  T({
    slug: 'heat-load',
    term: 'Panel heat load',
    category: 'Control Panels',
    short:
      'The total heat dissipated inside an enclosure, which must be shed through its surface or by active cooling to keep components within their ratings.',
    body: [
      'Solar gain on an outdoor enclosure is often the dominant term and is regularly forgotten. Power supplies derate above their reference ambient, so a calculation done at 25 degrees can fail in August.',
    ],
    seeAlso: ['nema-rating', 'power-supply'],
    related: ['/controls/control-panels/panel-design/heat-calculations'],
  }),
  T({
    slug: 'power-supply',
    term: 'Control power supply',
    category: 'Control Panels',
    short:
      'The panel component converting incoming power to the DC voltage, usually 24 V, that the controller, I/O, and field devices run on.',
    body: [
      'Size it on total steady-state load plus the largest simultaneous inrush, add at least 25% headroom, then derate for the real maximum ambient. An undersized supply produces intermittent resets that are very hard to diagnose.',
    ],
    seeAlso: ['heat-load', 'ups'],
    related: ['/how-to/panel-how-to/size-a-power-supply'],
  }),
  T({
    slug: 'ups',
    term: 'UPS',
    expansion: 'Uninterruptible Power Supply',
    category: 'Control Panels',
    short:
      'A battery-backed supply that carries a load through a power interruption. In control panels this is often a 24 VDC module rather than an AC unit.',
    body: [
      'At an unattended remote site, holding the controller and the radio up long enough to report the outage is frequently worth more than backing the whole panel.',
    ],
    seeAlso: ['power-supply'],
  }),
  T({
    slug: 'vfd',
    term: 'VFD',
    expansion: 'Variable Frequency Drive',
    aliases: ['variable speed drive', 'VSD', 'inverter'],
    category: 'Control Panels',
    short:
      'A drive that varies motor speed by varying the frequency and voltage supplied to it.',
    body: [
      'Allows a pump to modulate rather than cycle, at the cost of heat, harmonics, and a maintenance item at an unattended site. Its switching output is also the most common source of induced noise on nearby instrument cable.',
    ],
    seeAlso: ['soft-starter', 'ground-loop', 'motor-overload'],
  }),
  T({
    slug: 'soft-starter',
    term: 'Soft starter',
    category: 'Control Panels',
    short:
      'A device that ramps motor voltage on starting to limit inrush current and mechanical shock, without providing continuous speed control.',
    body: [
      'A middle option where across-the-line starting is too harsh on the pump or the electrical service but variable speed is not needed.',
    ],
    seeAlso: ['vfd', 'motor-overload'],
  }),
  T({
    slug: 'hoa',
    term: 'HOA',
    expansion: 'Hand-Off-Auto',
    category: 'Control Panels',
    short:
      'A selector switch giving an operator direct manual control of a device, disabling it entirely, or passing control to the controller.',
    body: [
      'Hand must work when the controller does not. Bringing the Auto position back to the PLC as an input stops the controller reporting a start failure for a pump running perfectly well in hand.',
    ],
    seeAlso: ['motor-overload', 'lead-lag'],
    related: ['/controls/control-panels/pump-panels/hoa'],
  }),
  T({
    slug: 'motor-overload',
    term: 'Motor overload',
    category: 'Control Panels',
    short:
      'A protective device that trips when motor current stays above its rating long enough to threaten the windings.',
    body: [
      'Automatic reset on an overload trip is a mistake: the condition clearing means the overload cooled, not that the problem was fixed. Manual reset and a visible alarm are the correct treatment.',
    ],
    seeAlso: ['hoa', 'interlock', 'vfd'],
  }),
  T({
    slug: 'spd',
    term: 'Surge protective device',
    expansion: 'SPD',
    aliases: ['surge suppressor', 'TVSS'],
    category: 'Control Panels',
    short:
      'A device that diverts transient overvoltage to ground, protecting equipment from lightning and switching surges.',
    body: [
      'At a remote site, protection belongs on incoming power, on the antenna lead, and on signal circuits leaving the building. Replaceable modules matter, because a device that has absorbed a strike has done its job and needs changing.',
    ],
    seeAlso: ['ground-loop', 'nema-rating'],
  }),
  T({
    slug: 'interposing-relay',
    term: 'Interposing relay',
    category: 'Control Panels',
    short:
      'A relay placed between a PLC output and a load, so the controller switches a small coil rather than the load itself.',
    body: [
      'Provides isolation, allows a low-current output to control a larger load, and makes the failure a cheap replaceable part rather than an output card.',
    ],
    seeAlso: ['power-supply'],
  }),

  /* -------------------------------- Networking ------------------------------ */
  T({
    slug: 'modbus',
    term: 'Modbus',
    category: 'Networking',
    short:
      'A simple, widely implemented industrial protocol in which a master reads and writes registers on addressed slave devices.',
    body: [
      'Its simplicity is why it is everywhere, and its lack of built-in diagnostics and security is why intermittent problems take patience and why it must stay on a trusted network.',
    ],
    seeAlso: ['modbus-rtu', 'modbus-tcp', 'rs-485'],
  }),
  T({
    slug: 'modbus-rtu',
    term: 'Modbus RTU',
    category: 'Networking',
    short:
      'Serial Modbus, normally over RS-485, with binary messages, a CRC-16 check, and frames delimited by a silent interval of at least 3.5 character times.',
    body: [
      'One master, up to 247 addressed slaves, one transaction at a time. Most intermittent faults are physical: missing termination, missing bias, no signal common, or cable routed beside drive output conductors.',
    ],
    seeAlso: ['modbus', 'modbus-tcp', 'rs-485', 'register-addressing'],
    related: ['/controls/plc-systems/communications/modbus-rtu'],
  }),
  T({
    slug: 'modbus-tcp',
    term: 'Modbus TCP',
    category: 'Networking',
    short:
      'Modbus carried over an Ethernet TCP connection on port 502, with a seven-byte MBAP header replacing the serial framing and CRC.',
    body: [
      'Multiple clients can poll one device at once, unlike single-master serial. Register addressing ambiguity and 32-bit word order remain exactly as troublesome as they are on serial.',
    ],
    seeAlso: ['modbus', 'modbus-rtu', 'register-addressing'],
    related: ['/controls/plc-systems/communications/modbus-tcp'],
  }),
  T({
    slug: 'register-addressing',
    term: 'Register addressing',
    aliases: ['40001', 'offset zero'],
    category: 'Networking',
    short:
      'The two conventions for naming a Modbus register: the traditional data model numbering that starts holding registers at 40001, and the protocol address that goes on the wire starting at 0.',
    body: [
      'Traditional 40010 is protocol address 9. If a value is close but consistently belongs to the neighboring point in the map, you are off by one.',
    ],
    seeAlso: ['modbus-rtu', 'modbus-tcp'],
  }),
  T({
    slug: 'rs-485',
    term: 'RS-485',
    category: 'Networking',
    short:
      'A differential serial signalling standard used as the physical layer for Modbus RTU and other industrial buses.',
    body: [
      'It is a bus, not a star: devices are daisy chained, both physical ends are terminated at about 120 ohms, bias exists somewhere on the segment, and a signal common ties the references together.',
    ],
    seeAlso: ['modbus-rtu', 'termination'],
  }),
  T({
    slug: 'termination',
    term: 'Termination',
    category: 'Networking',
    short:
      'A resistor at each physical end of a bus that matches the cable impedance and absorbs the signal, preventing reflections.',
    body: [
      'With the bus powered down, measuring roughly 60 ohms across the pair indicates two 120 ohm terminators, which is correct. Around 120 means only one, and an open reading means none.',
    ],
    seeAlso: ['rs-485', 'modbus-rtu'],
  }),
  T({
    slug: 'ethernet-ip',
    term: 'EtherNet/IP',
    category: 'Networking',
    short:
      'An industrial protocol carrying the Common Industrial Protocol over standard Ethernet, using implicit messaging for cyclic I/O and explicit messaging for on-demand data.',
    body: [
      'Implicit I/O uses multicast, so a network without IGMP snooping and a querier can flood every port. The symptom is widespread intermittent trouble that worsens as devices are added.',
    ],
    seeAlso: ['igmp-snooping', 'rpi'],
    related: ['/controls/plc-systems/communications/ethernet-ip'],
  }),
  T({
    slug: 'rpi',
    term: 'RPI',
    expansion: 'Requested Packet Interval',
    category: 'Networking',
    short:
      'How often an EtherNet/IP connection exchanges cyclic I/O data between a controller and a device.',
    body: [
      'Setting it far faster than the process needs consumes controller connections and network bandwidth for no benefit. Match it to how quickly the data actually changes.',
    ],
    seeAlso: ['ethernet-ip'],
  }),
  T({
    slug: 'dnp3',
    term: 'DNP3',
    expansion: 'Distributed Network Protocol 3',
    category: 'Networking',
    short:
      'A protocol built for utility telemetry, with unsolicited reporting, time-stamped events, and tolerance of constrained and intermittent links.',
    body: [
      'Time-stamping at the remote site preserves event order when a radio path drops and recovers, which is why it suits distributed water and wastewater systems.',
    ],
    seeAlso: ['report-by-exception', 'rtu'],
    related: ['/controls/plc-systems/communications/dnp3'],
  }),
  T({
    slug: 'opc-ua',
    term: 'OPC UA',
    expansion: 'OPC Unified Architecture',
    category: 'Networking',
    short:
      'A platform-independent industrial data exchange standard with a structured information model and built-in security.',
    body: [
      'Unlike Modbus, it carries meaning alongside values, so a client can discover what a device offers rather than being handed a register map in a PDF.',
    ],
    seeAlso: ['modbus-tcp'],
    related: ['/controls/plc-systems/communications/opc-ua'],
  }),
  T({
    slug: 'vlan',
    term: 'VLAN',
    expansion: 'Virtual Local Area Network',
    category: 'Networking',
    short:
      'A logical network segment on a managed switch, separating traffic that shares the same physical infrastructure.',
    body: [
      'The usual first step in segmenting a control network. Segmentation only holds if routing between VLANs is controlled rather than open.',
    ],
    seeAlso: ['managed-switch', 'zones-and-conduits', 'purdue-model'],
  }),
  T({
    slug: 'managed-switch',
    term: 'Managed switch',
    category: 'Networking',
    short:
      'An Ethernet switch that can be configured and monitored, supporting VLANs, spanning tree, IGMP snooping, and per-port statistics.',
    body: [
      'Port counters are the fastest route to diagnosing an intermittent device: late collisions mean a duplex mismatch, CRC errors mean cabling or noise, and repeated link transitions mean a physical or power problem.',
    ],
    seeAlso: ['vlan', 'duplex-mismatch', 'igmp-snooping'],
  }),
  T({
    slug: 'duplex-mismatch',
    term: 'Duplex mismatch',
    category: 'Networking',
    short:
      'A fault where one end of an Ethernet link runs half duplex and the other full, almost always because one end auto-negotiates against a hard-set partner.',
    body: [
      'The link comes up and light traffic passes, then it degrades badly under load. Late collisions on a full-duplex port are essentially diagnostic of it.',
    ],
    seeAlso: ['managed-switch'],
    related: ['/troubleshooting/network-troubleshooting/ethernet-device-drops-offline'],
  }),
  T({
    slug: 'igmp-snooping',
    term: 'IGMP snooping',
    category: 'Networking',
    short:
      'A switch feature that learns which ports want a given multicast stream and forwards it only there, instead of flooding every port.',
    body: [
      'Required on any network carrying EtherNet/IP implicit messaging, along with a querier somewhere on the segment.',
    ],
    seeAlso: ['ethernet-ip', 'managed-switch'],
  }),
  /* --------------------------- Water & wastewater --------------------------- */
  T({
    slug: 'lift-station',
    term: 'Lift station',
    aliases: ['pump station', 'sewage pumping station'],
    category: 'Water & Wastewater',
    short:
      'A facility that collects wastewater in a wet well and pumps it up to a higher gravity line or into a force main, where topography stops gravity flow working.',
    body: [
      'A duplex station has two pumps, each sized to handle peak flow alone, so the station keeps working when one is out of service. A mid-size utility may own dozens or hundreds of them, unattended.',
    ],
    seeAlso: ['wet-well', 'force-main', 'lead-lag', 'sso'],
    related: ['/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations'],
  }),
  T({
    slug: 'wet-well',
    term: 'Wet well',
    category: 'Water & Wastewater',
    short:
      'The chamber at a lift station that collects incoming wastewater and from which the pumps draw.',
    body: [
      'A permit-required confined space. Hydrogen sulfide is heavier than air, accumulates at the bottom, and rapidly deadens the sense of smell, so the absence of odor is not evidence of safety.',
    ],
    seeAlso: ['lift-station', 'septicity', 'radar-level'],
    related: ['/water-wastewater/wastewater-systems/lift-stations/wet-well-control'],
  }),
  T({
    slug: 'septicity',
    term: 'Septicity',
    category: 'Water & Wastewater',
    short:
      'The anaerobic condition wastewater reaches when held too long, generating hydrogen sulfide that corrodes concrete and metal and creates odor and safety hazards.',
    body: [
      'A control decision as much as a process one. Setpoints that keep a wet well full for hours to minimize pump starts trade a pump maintenance cost for a corrosion cost that is usually larger.',
    ],
    seeAlso: ['wet-well', 'lift-station'],
  }),
  T({
    slug: 'force-main',
    term: 'Force main',
    category: 'Water & Wastewater',
    short:
      'A pressurized pipe carrying wastewater from a lift station to a discharge point, as opposed to a gravity sewer.',
    body: [
      'Pump runs must be long enough to reach scour velocity, or solids settle in the main. This is one of the constraints that argues for a wider wet well level band.',
    ],
    seeAlso: ['lift-station', 'wet-well', 'tdh'],
  }),
  T({
    slug: 'lead-lag',
    term: 'Lead/lag',
    category: 'Water & Wastewater',
    short:
      'A pump control scheme where one pump is designated to start first and another starts when the first cannot keep up.',
    body: [
      'Alternation swaps the roles so wear is shared. A failed pump must drop out of the rotation automatically, not merely raise an alarm.',
    ],
    seeAlso: ['alternation', 'lift-station', 'hoa'],
    related: ['/controls/control-panels/pump-panels/lead-lag'],
  }),
  T({
    slug: 'alternation',
    term: 'Alternation',
    category: 'Water & Wastewater',
    short:
      'Rotating which pump takes the lead role, so run time and starts are shared rather than accumulating on one machine.',
    body: [
      'Alternating each cycle is the common default for a duplex station. The state belongs in retentive memory, or every power blip resets the station to the same lead pump.',
    ],
    seeAlso: ['lead-lag', 'retentive-memory'],
  }),
  T({
    slug: 'tdh',
    term: 'TDH',
    expansion: 'Total Dynamic Head',
    category: 'Water & Wastewater',
    short:
      'The total pressure a pump must develop, combining static lift with friction losses through the piping at a given flow.',
    body: [
      'Where the system curve crosses the pump curve is where the pump actually operates, which is often not where anyone assumed when the station was designed.',
    ],
    seeAlso: ['npsh', 'cavitation', 'force-main'],
  }),
  T({
    slug: 'npsh',
    term: 'NPSH',
    expansion: 'Net Positive Suction Head',
    category: 'Water & Wastewater',
    short:
      'The suction-side pressure available to a pump above the vapor pressure of the liquid. Available NPSH must exceed the pump required NPSH.',
    body: [
      'Where it does not, the liquid vaporizes at the impeller eye and the pump cavitates. On a wet well this is one reason the low-level cutoff is not negotiable.',
    ],
    seeAlso: ['cavitation', 'tdh'],
  }),
  T({
    slug: 'cavitation',
    term: 'Cavitation',
    category: 'Water & Wastewater',
    short:
      'Vapor bubbles forming and collapsing inside a pump because suction pressure fell below the vapor pressure of the liquid.',
    body: [
      'It sounds like gravel in the pump and it erodes the impeller. The usual causes are running the wet well too low, a blocked suction, or a pump operating far from its design point.',
    ],
    seeAlso: ['npsh', 'tdh'],
  }),
  T({
    slug: 'high-service-pump',
    term: 'High service pump',
    category: 'Water & Wastewater',
    short:
      'A pump that takes treated water from ground storage and delivers it into the distribution system at pressure.',
    body: [
      'Usually controlled to hold discharge pressure, which makes it one of the few genuinely fast control loops in a water plant.',
    ],
    seeAlso: ['tdh', 'pid'],
    related: ['/water-wastewater/water-systems/water-pumping/pressure-control'],
  }),
  T({
    slug: 'ras-was',
    term: 'RAS and WAS',
    expansion: 'Return and Waste Activated Sludge',
    category: 'Water & Wastewater',
    short:
      'Return activated sludge is recycled from the clarifier back to the aeration basin to maintain the biological population; waste activated sludge is removed to control it.',
    body: [
      'RAS and WAS rates are the primary levers an operator has over the biological process, which makes their flow measurement and control genuinely consequential.',
    ],
    seeAlso: ['mlss'],
    related: ['/water-wastewater/wastewater-systems/wastewater-treatment/ras-was'],
  }),
  T({
    slug: 'mlss',
    term: 'MLSS',
    expansion: 'Mixed Liquor Suspended Solids',
    category: 'Water & Wastewater',
    short:
      'The concentration of suspended solids in an aeration basin, a primary indicator of the biological population in an activated sludge process.',
    body: [
      'Trended against RAS and WAS rates, it is how an operator tells whether the process is being pushed or starved.',
    ],
    seeAlso: ['ras-was'],
  }),
  T({
    slug: 'reverse-osmosis',
    term: 'Reverse osmosis',
    expansion: 'RO',
    category: 'Water & Wastewater',
    short:
      'A membrane process that forces water through a semi-permeable membrane under pressure, leaving dissolved salts behind in a concentrate stream.',
    body: [
      'Control revolves around feed pressure, recovery, differential pressure across the stages, and the cleaning cycle. Rising differential pressure at constant flow is the classic fouling signature.',
    ],
    seeAlso: ['cip'],
    related: ['/water-wastewater/water-systems/membrane-treatment/reverse-osmosis'],
  }),
  T({
    slug: 'cip',
    term: 'CIP',
    expansion: 'Clean In Place',
    category: 'Water & Wastewater',
    short:
      'A cleaning sequence that circulates chemical solution through equipment without dismantling it, used on membranes and process piping.',
    body: [
      'A natural fit for sequential function chart or an explicit state machine, because the operator needs to see which step the sequence is waiting in.',
    ],
    seeAlso: ['reverse-osmosis', 'sequential-function-chart'],
  }),
  T({
    slug: 'sso',
    term: 'SSO',
    expansion: 'Sanitary Sewer Overflow',
    category: 'Water & Wastewater',
    short:
      'A discharge of untreated wastewater from a collection system before it reaches the treatment plant, with regulatory reporting consequences.',
    body: [
      'The failure mode a lift station control system exists to prevent, which is why independent float backup and failure-to-pump detection matter more than elegance.',
    ],
    seeAlso: ['lift-station', 'wet-well'],
  }),

  /* ------------------------------ Cybersecurity ----------------------------- */
  T({
    slug: 'ot',
    term: 'OT',
    expansion: 'Operational Technology',
    category: 'Cybersecurity',
    short:
      'The hardware and software that monitors and controls physical processes and equipment, as distinct from the information technology that runs a business.',
    body: [
      'The priority order inverts from IT: safety first, then availability and integrity, with confidentiality last. That changes which security controls fit.',
    ],
    seeAlso: ['ics', 'purdue-model', 'iec-62443'],
    related: ['/cybersecurity/ot-security/ot-vs-it-security'],
  }),
  T({
    slug: 'ics',
    term: 'ICS',
    expansion: 'Industrial Control System',
    category: 'Cybersecurity',
    short:
      'The general term for the combined control equipment running an industrial process, including PLCs, SCADA, and the networks between them.',
    body: [
      'Used interchangeably with OT in most security writing, though ICS refers to the systems and OT to the wider technology domain.',
    ],
    seeAlso: ['ot', 'scada', 'plc'],
  }),
  T({
    slug: 'purdue-model',
    term: 'Purdue model',
    category: 'Cybersecurity',
    short:
      'A reference architecture organizing industrial systems into levels, from field devices at Level 0 through control and supervisory layers to enterprise networks at Level 5.',
    body: [
      'Its practical value is defining where boundaries belong, particularly the demilitarized zone between operations and business networks.',
    ],
    seeAlso: ['dmz', 'zones-and-conduits', 'ot'],
    related: ['/cybersecurity/ot-security/purdue-model'],
  }),
  T({
    slug: 'dmz',
    term: 'DMZ',
    expansion: 'Demilitarized Zone',
    category: 'Cybersecurity',
    short:
      'A network segment between the control and business networks where data is exchanged without either side connecting directly to the other.',
    body: [
      'Design the flows so the more trusted side initiates outward: an OT historian pushing to a DMZ replica needs no inbound rule into the control network at all.',
    ],
    seeAlso: ['purdue-model', 'zones-and-conduits'],
    related: ['/cybersecurity/network-segmentation/dmz-design'],
  }),
  T({
    slug: 'zones-and-conduits',
    term: 'Zones and conduits',
    category: 'Cybersecurity',
    short:
      'The IEC 62443 model of grouping assets with similar security requirements into zones and controlling every communication path, or conduit, between them.',
    body: [
      'A remote lift station is a zone with a defined conduit back to the plant. Preventing site-to-site communication means one compromised station does not reach the rest of the collection system.',
    ],
    seeAlso: ['iec-62443', 'purdue-model', 'vlan'],
    related: ['/cybersecurity/network-segmentation/zones-and-conduits'],
  }),
  T({
    slug: 'iec-62443',
    term: 'IEC 62443',
    aliases: ['ISA/IEC 62443', 'ISA-99'],
    category: 'Standards',
    short:
      'The international series of standards for security of industrial automation and control systems, covering programs, system design, and component requirements.',
    body: [
      'Its zones-and-conduits model is the flexible successor to strict Purdue layering, and its security levels give a way to state how strong a control needs to be.',
    ],
    seeAlso: ['zones-and-conduits', 'ot'],
    related: ['/cybersecurity/ot-security/iec-62443'],
  }),
  T({
    slug: 'defense-in-depth',
    term: 'Defense in depth',
    category: 'Cybersecurity',
    short:
      'Layering independent controls so that no single failure exposes the system, rather than relying on one strong perimeter.',
    body: [
      'In OT it usually means segmentation, controlled remote access, hardened devices, monitoring, tested backups, and a practiced manual operating procedure, in that order of practical value.',
    ],
    seeAlso: ['zones-and-conduits', 'air-gap'],
  }),
  T({
    slug: 'air-gap',
    term: 'Air gap',
    category: 'Cybersecurity',
    short:
      'A claimed complete physical separation between a control network and any other network.',
    body: [
      'Genuine air gaps are rare and often less secure in practice than a segmented architecture, because data still moves by USB drive and vendors still need remote support, only now without controls around either.',
    ],
    seeAlso: ['defense-in-depth', 'dmz'],
  }),

  /* -------------------------------- Standards ------------------------------- */
  T({
    slug: 'isa-5-1',
    term: 'ISA-5.1',
    category: 'Standards',
    short:
      'The instrumentation symbology standard, defining the tag bubbles, line types, and identification letters used on P&IDs.',
    body: [
      'It is why an instrument bubble reading LIT-101 is understood as a level indicating transmitter, loop 101, anywhere in the industry.',
    ],
    seeAlso: ['pid-drawing'],
    related: ['/engineering-library/standards/isa'],
  }),
  T({
    slug: 'pid-drawing',
    term: 'P&ID',
    expansion: 'Piping and Instrumentation Diagram',
    aliases: ['P and ID'],
    category: 'Standards',
    short:
      'The drawing showing process equipment, piping, instrumentation, and control loops, and the primary reference for how a plant is meant to work.',
    body: [
      'Not to be confused with PID control. The P&ID is where instrument tags, control loops, and interlocks are first defined for a project.',
    ],
    seeAlso: ['isa-5-1', 'pid', 'control-narrative'],
    related: ['/engineering-library/drawings/p-and-id-drawings'],
  }),
  T({
    slug: 'isa-18-2',
    term: 'ISA-18.2',
    category: 'Standards',
    short:
      'The alarm management standard for the process industries, defining an alarm as an indication of an abnormal condition requiring a timely operator response, and setting out a lifecycle from philosophy through monitoring.',
    body: [
      'Its central premise is that an alarm without a defined operator response is not an alarm. Widely used rate targets, from EEMUA 191, put a workable system at roughly six alarms per hour per operator.',
    ],
    seeAlso: ['alarm-rationalization', 'alarm-flood', 'shelving'],
    related: ['/controls/scada-hmi/alarm-management/isa-18-2'],
  }),
  T({
    slug: 'isa-101',
    term: 'ISA-101',
    category: 'Standards',
    short:
      'The human-machine interface standard, covering the lifecycle of operator display design including style guides and consistency.',
    body: [
      'Frequently cited in specifications alongside the high performance HMI approach it supports.',
    ],
    seeAlso: ['high-performance-hmi', 'hmi'],
    related: ['/controls/scada-hmi/hmi-design/isa-101'],
  }),
  T({
    slug: 'nfpa-70e',
    term: 'NFPA 70E',
    category: 'Standards',
    short:
      'The standard for electrical safety in the workplace, covering safe work practices, risk assessment, and personal protective equipment for energized work.',
    body: [
      'Distinct from NFPA 70, the National Electrical Code, which governs installation. 70E governs how people work on what 70 installed.',
    ],
    seeAlso: ['ul-508a'],
    related: ['/engineering-library/standards/nfpa'],
  }),
  T({
    slug: 'control-narrative',
    term: 'Control narrative',
    aliases: ['sequence of operation'],
    category: 'Standards',
    short:
      'The document describing what a control system does: the setpoints, the sequences, the interlocks, and the failure behavior, in words rather than code.',
    body: [
      'It is what the owner will hold the integrator to, and the reference a technician reads years later when the behavior stops making sense. Writing it before the code is what makes the code reviewable.',
    ],
    seeAlso: ['pid-drawing', 'interlock'],
    related: ['/engineering-library/control-documentation/control-narratives'],
  }),
  T({
    slug: 'awia',
    term: 'AWIA',
    expansion: "America's Water Infrastructure Act",
    category: 'Standards',
    short:
      'United States legislation requiring community water systems above a certain population served to conduct risk and resilience assessments and maintain emergency response plans.',
    body: [
      'Cybersecurity falls within that scope. Confirm the current requirements and deadlines that apply to your system with your state primacy agency rather than relying on a summary.',
    ],
    seeAlso: ['ot', 'defense-in-depth'],
    related: ['/cybersecurity/water-wastewater-cybersecurity/awia-requirements'],
  }),
];

/* ------------------------------------------------------------------ *
 * Derived lookups
 * ------------------------------------------------------------------ */

export const GLOSSARY_BY_SLUG: Record<string, GlossaryTerm> = Object.fromEntries(
  GLOSSARY.map((term) => [term.slug, term]),
);

/** Alphabetical, ignoring case. */
export const GLOSSARY_ALPHABETICAL: GlossaryTerm[] = [...GLOSSARY].sort((a, b) =>
  a.term.localeCompare(b.term, 'en', { numeric: true, sensitivity: 'base' }),
);

/** First character for the A-Z jump list. Anything non-alphabetic groups under a hash. */
export function glossaryInitial(term: GlossaryTerm): string {
  const first = term.term.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
}

export const GLOSSARY_INITIALS: string[] = [
  ...new Set(GLOSSARY_ALPHABETICAL.map(glossaryInitial)),
].sort();

export function glossaryByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY_ALPHABETICAL.filter((term) => term.category === category);
}

export function glossaryPath(slug: string): string {
  return `/glossary/${slug}`;
}
