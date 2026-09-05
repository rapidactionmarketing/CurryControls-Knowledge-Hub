import type { Entry } from '../content-types';

export const PLC_ENTRIES: Entry[] = [
  {
    path: '/controls/plc-systems/plc-fundamentals/what-is-a-plc',
    kind: 'reference',
    title: 'What Is a PLC?',
    summary:
      'A programmable logic controller is a ruggedized industrial computer that reads field inputs, solves a control program, and drives outputs on a repeating, deterministic cycle.',
    answer:
      'A PLC (programmable logic controller) is an industrial computer built to control machinery and processes. It repeatedly reads the state of field inputs, solves a user-written control program, and writes results to outputs. Unlike a general-purpose computer it runs a fixed, predictable cycle, tolerates heat, vibration, and electrical noise, and is expected to run for years without a reboot.',
    keyPoints: [
      'A PLC executes a repeating cycle: read inputs, solve logic, write outputs.',
      'It is built for determinism and uptime, not raw computing speed.',
      'I/O modules connect it to real field devices at real field voltages.',
      'Programs are written in the IEC 61131-3 languages, most often ladder logic.',
      'It replaced racks of hardwired relays, and much of its vocabulary is inherited from them.',
    ],
    published: '2026-01-14',
    updated: '2026-08-22',
    readingTime: 8,
    tags: ['PLC', 'Fundamentals', 'Control'],
    blocks: [
      { t: 'h2', text: 'What a PLC actually does' },
      {
        t: 'p',
        text: 'Strip away the vendor differences and every programmable logic controller does the same four things over and over, thousands of times a minute. It captures the state of everything wired to its inputs. It solves the control program against that captured state. It writes the results to its outputs. Then it handles communications and diagnostics before starting again.',
      },
      {
        t: 'p',
        text: 'That repetition is the point. A PLC is not trying to be fast in the way a desktop computer is fast. It is trying to be predictable. If a level switch closes, you need to know the pump will start within a bounded, knowable amount of time, every time, whether the plant has been running for ten minutes or ten years.',
      },
      { t: 'h2', text: 'The physical parts' },
      {
        t: 'dl',
        items: [
          { term: 'Processor (CPU)', def: 'Holds the program and the data table, solves the logic, and manages communications. It also runs the diagnostics that fault the controller when something is wrong.' },
          { term: 'Power supply', def: 'Converts incoming line or 24 VDC power into the backplane power the modules need. Sizing it correctly is a common source of intermittent faults.' },
          { term: 'Chassis and backplane', def: 'The physical frame and the communication path between the processor and the modules. Some small controllers are a single sealed brick with no chassis at all.' },
          { term: 'Discrete I/O modules', def: 'Read on/off signals like a float switch or a run confirmation, and drive on/off outputs like a motor starter coil or a solenoid.' },
          { term: 'Analog I/O modules', def: 'Convert a continuous field signal such as a 4-20 mA level transmitter into a number the program can use, and convert numbers back into signals for devices like a valve positioner or a variable speed drive.' },
          { term: 'Communication modules', def: 'Move data to SCADA, to other controllers, and to field devices over Ethernet, serial, or a fieldbus.' },
        ],
      },
      { t: 'h2', text: 'Why not just use a PC?' },
      {
        t: 'p',
        text: 'People ask this constantly, and the honest answer has less to do with computing power than with everything around it. A PLC is designed to sit in an unconditioned enclosure next to a variable frequency drive, survive a nearby lightning strike through its surge protection, ride through a power blip, and start back up into a known state without anyone logging in.',
      },
      {
        t: 'table',
        caption: 'What separates a controller from a general-purpose computer',
        head: ['Characteristic', 'PLC', 'General-purpose PC'],
        rows: [
          ['Execution model', 'Fixed repeating scan', 'Preemptive multitasking'],
          ['Timing', 'Deterministic and measurable', 'Best-effort'],
          ['Startup', 'Returns to a defined state automatically', 'Requires an operating system boot'],
          ['Environment', 'Rated for heat, vibration, and electrical noise', 'Office conditions'],
          ['Field connection', 'Native I/O at field voltages', 'Requires external interface hardware'],
          ['Expected uptime', 'Years between restarts', 'Restarted routinely'],
        ],
      },
      { t: 'h2', text: 'Where the language comes from' },
      {
        t: 'p',
        text: 'Before controllers, machine logic was built from physical relays wired into panels. Changing the sequence meant rewiring. The first programmable controllers were sold on the promise that you could change the sequence by editing a program instead, and to make that sellable to the electricians who would maintain them, the programming language was drawn to look like the relay ladder drawings they already read.',
      },
      {
        t: 'p',
        text: 'That is why ladder logic still has rungs, contacts, and coils, and why an experienced technician can often follow a program they have never seen. It is also why terms like "normally open" and "seal-in" survive in software that has no relays anywhere in it.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Contacts in software are not contacts in the field',
        text: 'A normally-open contact in a program examines whether a bit is on. Whether that bit is on depends on how the field device is wired and whether the input is a normally-open or normally-closed contact. Confusing the two is one of the most common sources of logic that works on the bench and fails in the field.',
      },
      { t: 'h2', text: 'PLC, PAC, and RTU' },
      {
        t: 'p',
        text: 'You will hear three terms used for overlapping equipment, and the boundaries are marketing more than engineering.',
      },
      {
        t: 'dl',
        items: [
          { term: 'PLC', def: 'The general term. Any controller running a scan-based control program against field I/O.' },
          { term: 'PAC (programmable automation controller)', def: 'A vendor term for a higher-end controller with more memory, structured data types, and better handling of motion or batch. Functionally it is still a PLC.' },
          { term: 'RTU (remote terminal unit)', def: 'A controller at a remote site, usually optimized for low power, wide temperature range, and reporting over a limited communication path such as radio or cellular. In water and wastewater, most lift station RTUs are simply small PLCs in a remote panel.' },
        ],
      },
      { t: 'h2', text: 'What to learn next' },
      {
        t: 'p',
        text: 'The single most useful thing to understand after this is the scan cycle, because almost every confusing PLC behavior traces back to when in the scan something happened. After that, get comfortable with analog signals, because that is where the physical world becomes numbers and where most field problems live.',
      },
    ],
    faqs: [
      {
        q: 'What does PLC stand for?',
        a: 'Programmable logic controller. The name describes what it replaced: hardwired relay logic that could only be changed by rewiring, replaced by logic you can change by programming.',
      },
      {
        q: 'What is the difference between a PLC and a microcontroller?',
        a: 'A microcontroller is a chip. A PLC is a finished industrial product built around a processor, with rated I/O, a power supply, diagnostics, an environmental rating, and a standardized programming environment. You can build a controller from a microcontroller, but you would be rebuilding everything a PLC already provides.',
      },
      {
        q: 'Do I need to know how to program a PLC to work with one?',
        a: 'No, but you need to be able to read one. Technicians who can follow a rung and see which condition is holding a pump off resolve calls far faster than those who can only check voltages.',
      },
      {
        q: 'How long does a PLC last?',
        a: 'Processor and I/O hardware routinely runs fifteen to twenty-five years. The practical limits are usually spare parts availability, software that no longer runs on a supported operating system, and communication protocols the rest of the plant has moved past.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/analog-control/4-20-ma',
      '/controls/plc-systems/plc-fundamentals/io-systems',
    ],
  },

  {
    path: '/controls/plc-systems/plc-fundamentals/scan-cycle',
    kind: 'reference',
    title: 'The PLC Scan Cycle',
    summary:
      'Read inputs, solve logic, write outputs, housekeeping. Understanding scan order explains most PLC behavior that looks wrong at first glance.',
    answer:
      'The PLC scan cycle is the repeating sequence a controller executes: it copies input states into memory, solves the program top to bottom using that frozen copy, writes the resulting output states to the output modules, then handles communications and diagnostics. Scan time is how long one full pass takes, typically a few milliseconds. Logic sees inputs as they were at the start of the scan, not as they change during it.',
    keyPoints: [
      'Inputs are frozen into an image table at the start of the scan, so logic sees a consistent snapshot.',
      'Outputs are written at the end of the scan, not the instant a rung solves true.',
      'Rung order matters: a later rung sees the result of an earlier one in the same scan.',
      'A signal shorter than one scan can be missed entirely unless you latch it or use a high-speed input.',
      'The watchdog faults the processor if a scan runs longer than its configured limit.',
    ],
    published: '2026-01-20',
    updated: '2026-07-30',
    readingTime: 9,
    tags: ['PLC', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'The four phases' },
      {
        t: 'steps',
        items: [
          { title: 'Input scan', text: 'The processor reads every input module and copies the states into an area of memory usually called the input image table. From this moment until the next scan, the program sees this frozen copy. If a field contact changes state one microsecond later, the program will not know until the next scan.' },
          { title: 'Program scan', text: 'The controller solves the logic, normally from the first rung to the last, in order. Each instruction works against the input image table and against internal memory that other rungs may have already changed during this same pass.' },
          { title: 'Output scan', text: 'The output image table, which the program has been writing to, is copied out to the physical output modules. This is the moment a coil in software becomes 24 volts on a terminal.' },
          { title: 'Housekeeping', text: 'Communications are serviced, diagnostics run, memory is checked, and the watchdog is reset. Then the cycle repeats.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'This is why timing questions have a floor',
        text: 'If your scan time is 8 ms, the worst-case delay between a field contact closing and an output responding is roughly two scans plus the input filter and output switching time. No amount of clever programming gets below that floor. If you need faster, you need a high-speed input, an interrupt task, or hardware interlocking.',
      },
      { t: 'h2', text: 'Why rung order matters' },
      {
        t: 'p',
        text: 'Because the program solves top to bottom in a single pass, a bit set on rung 5 is already set when rung 60 examines it. A bit set on rung 60 will not be seen by rung 5 until the next scan. Most of the time this is invisible. It becomes very visible when someone reorders routines during a cleanup and a sequence that always worked starts taking an extra scan to advance.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Same two rungs, opposite behavior',
        code: `Order A                       Order B
  Rung 1: Start_PB --> Run       Rung 1: Run --> Pump_Out
  Rung 2: Run --> Pump_Out       Rung 2: Start_PB --> Run

Order A: pressing the button energizes Pump_Out in the SAME scan.
Order B: pressing the button energizes Pump_Out one scan LATER,
         because rung 1 examined Run before rung 2 set it.`,
      },
      { t: 'h2', text: 'Scan time and what moves it' },
      {
        t: 'p',
        text: 'Scan time is not a fixed number. It varies with how much of the program executes on a given pass, how much communication traffic is being serviced, and how much remote I/O has to be gathered. A controller that scans in 6 ms with everything idle may scan in 15 ms during a heavy SCADA poll.',
      },
      {
        t: 'table',
        head: ['What increases scan time', 'Typical impact', 'What to do about it'],
        rows: [
          ['Large amounts of always-executing logic', 'Proportional and predictable', 'Condition routines so unused sections do not execute'],
          ['Remote I/O over a network', 'Adds network update time, not just scan time', 'Match the requested packet interval to what the process actually needs'],
          ['Heavy message instructions', 'Bursty, can spike scan time', 'Stagger messages, trigger on change rather than every scan'],
          ['Large loop and array operations', 'Can be significant', 'Break work across scans or move to a slower periodic task'],
          ['Excessive SCADA polling', 'Shows up as housekeeping time', 'Poll on change of state where the protocol supports it'],
        ],
      },
      { t: 'h2', text: 'Tasks: when the simple model stops being enough' },
      {
        t: 'p',
        text: 'Modern controllers let you split a program into tasks. A continuous task runs whenever nothing else needs the processor. A periodic task runs on a fixed interval, such as every 50 ms, which is how you get a PID loop to execute at a consistent rate regardless of what the rest of the program is doing. An event task runs in response to a trigger.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Periodic tasks can starve the continuous task',
        text: 'If a periodic task takes 40 ms and is scheduled every 50 ms, only 10 ms per interval is left for everything else. Overlap a periodic task with itself and the controller will fault. Check task overlap counters before assuming a fast interval is free.',
      },
      { t: 'h2', text: 'Pulses shorter than a scan' },
      {
        t: 'p',
        text: 'A flow meter pulse, a fast limit switch, or a brief contact bounce can occur and clear entirely between two input scans. The program never sees it. This is not a defect; it is the direct consequence of sampling. If you need to count fast pulses, use a high-speed counter input, which counts in module hardware and hands the program a total. If you need to catch a brief event, latch it in the field device or use an input module with a latching feature.',
      },
      { t: 'h2', text: 'The watchdog' },
      {
        t: 'p',
        text: 'Each scan resets a watchdog timer. If a scan takes longer than the configured watchdog value, the processor faults and, in most configurations, drops its outputs to a safe state. The usual causes are an unbounded loop, a routine calling itself, or a message instruction waiting on a device that stopped answering. A watchdog fault is telling you the program did not finish, which is a very different problem from a program that finished with the wrong answer.',
      },
    ],
    faqs: [
      {
        q: 'What is a typical PLC scan time?',
        a: 'For a small to medium water or wastewater application, 5 to 20 milliseconds is typical. Large plant controllers with heavy communications may run 30 to 80 milliseconds. What matters is not the number itself but whether it is stable and comfortably under the watchdog setting.',
      },
      {
        q: 'Why did my output not turn on immediately when the input closed?',
        a: 'Because outputs are written at the end of the scan and inputs are read at the beginning. Depending on where in the scan the input actually changed, the response takes between one and two full scans plus input filter time and output device switching time.',
      },
      {
        q: 'Does putting logic in a subroutine make the scan faster?',
        a: 'Only if the subroutine is conditionally called and is often not called. Moving code into a routine that runs unconditionally every scan changes nothing except organization.',
      },
      {
        q: 'What causes a watchdog fault?',
        a: 'A scan that did not complete within the configured watchdog time. Look for loops without a bounded exit, recursive routine calls, a message instruction blocking on an unresponsive device, or an unexpectedly large array operation.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/what-is-a-plc',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/troubleshooting/plc-troubleshooting/logic-not-executing-as-expected',
    ],
  },

  {
    path: '/controls/plc-systems/programming/ladder-logic',
    kind: 'reference',
    title: 'Ladder Logic Fundamentals',
    summary:
      'Rungs, contacts, coils, and the relay conventions the language inherited — plus the patterns you will meet in almost every industrial program.',
    answer:
      'Ladder logic is a graphical PLC programming language drawn to resemble relay ladder diagrams. Each rung reads left to right: input conditions on the left, an output on the right. If a continuous path of true conditions exists across the rung, the output energizes. It is defined in IEC 61131-3 as Ladder Diagram (LD) and remains the most widely used language in industrial controls.',
    keyPoints: [
      'A rung is true when a continuous logical path exists from the left rail to the output.',
      'Series contacts are AND. Parallel branches are OR.',
      'Examine-if-closed tests whether a bit is on; examine-if-open tests whether it is off.',
      'The seal-in (latching) rung is the single most common pattern in industrial code.',
      'Readability is a real engineering requirement, because a technician will read this at 2 a.m.',
    ],
    published: '2026-02-03',
    updated: '2026-08-11',
    readingTime: 10,
    tags: ['PLC', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Reading a rung' },
      {
        t: 'p',
        text: 'Two vertical rails frame the program. Power, conceptually, flows from the left rail to the right. A rung is a horizontal path between them containing conditions and an output. If the conditions form an unbroken true path, the output on the right end energizes.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'A basic rung: run the pump when called and not faulted',
        code: `   Pump_Call    Pump_Fault                      Pump_Run
|-----] [---------]/[--------------------------( )----|
   (examine       (examine                    (output
    if closed)     if open)                     coil)

Reads as: if Pump_Call is ON and Pump_Fault is OFF, energize Pump_Run.`,
      },
      { t: 'h2', text: 'The instructions you will use constantly' },
      {
        t: 'dl',
        items: [
          { term: 'Examine if closed  -] [-', def: 'True when the referenced bit is on. Often called a normally-open contact, which is a description of the drawing, not of the field device.' },
          { term: 'Examine if open  -]/[-', def: 'True when the referenced bit is off.' },
          { term: 'Output coil  -( )-', def: 'Sets the bit on when the rung is true and off when it is false. Non-retentive.' },
          { term: 'Latch and unlatch  -(L)-  -(U)-', def: 'Set and reset a bit that holds its state when the rung goes false. Powerful and easy to misuse. Every latch needs a clearly identified unlatch.' },
          { term: 'Timers  TON / TOF / RTO', def: 'On-delay, off-delay, and retentive timers. TON is by far the most used, for start delays, failure-to-start windows, and debouncing.' },
          { term: 'Counters  CTU / CTD', def: 'Count up or down on a false-to-true transition. Used for pump starts, batch counts, and retry limits.' },
          { term: 'Comparison  EQU / GRT / LES / LIM', def: 'Compare values. The backbone of analog logic: level above start setpoint, pressure below alarm limit, and so on.' },
          { term: 'Move and math  MOV / ADD / SUB / MUL / DIV', def: 'Move and compute values. Scaling arithmetic usually lives here.' },
          { term: 'One-shot  ONS / OSR', def: 'True for exactly one scan on a false-to-true transition. Essential when you want an action to happen once, not every scan a condition is true.' },
        ],
      },
      { t: 'h2', text: 'Series, parallel, and the shape of logic' },
      {
        t: 'p',
        text: 'Contacts in series form a logical AND: every one must be true. Contacts in parallel form a logical OR: any one being true is enough. Almost all industrial logic is built from these two shapes, and the visual layout of a rung is a direct picture of the boolean expression behind it.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Parallel branch: any of three calls will start the pump',
        code: `   Hand_Call                                       Pump_Run
|-----] [----+------------------------------------( )----|
             |
   Auto_Call |
|-----] [----+
             |
   Remote_Call
|-----] [----+

Reads as: Hand_Call OR Auto_Call OR Remote_Call energizes Pump_Run.`,
      },
      { t: 'h2', text: 'The seal-in rung' },
      {
        t: 'p',
        text: 'This is the pattern you will see in nearly every program ever written. A momentary start button energizes an output, and a contact from that output is placed in parallel with the button so the rung stays true after the button is released. A normally-closed stop condition in series breaks the path.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Seal-in with a stop and a fault',
        code: `   Start_PB     Stop_PB      Fault                    Motor_Run
|-----] [-------]/[--------]/[--------+-------------( )----|
                                      |
   Motor_Run                          |
|-----] [-----------------------------+

Release Start_PB and the Motor_Run contact holds the rung true.
Stop_PB or Fault breaks the path and the output drops.`,
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'A stop in software is not a safety stop',
        text: 'A stop button examined in a program can only work if the processor is scanning, the input module is reading, and the output module is switching. Emergency stop and other safety functions must be implemented in hardwired safety circuits or a rated safety controller, per the applicable standards and your site risk assessment. Never rely on standard PLC logic for personnel protection.',
      },
      { t: 'h2', text: 'Writing ladder someone else can maintain' },
      {
        t: 'ul',
        items: [
          'Name tags for what they are, not where they are wired. Pump_1_Run_Cmd survives a rewire; N7:12/3 does not.',
          'One clear purpose per rung. Long rungs with five branches are impossible to troubleshoot online.',
          'Comment the intent, not the syntax. "Prevents restart until discharge pressure decays" is useful; "turns on the pump" is not.',
          'Group logic into routines that match how the plant is organized: one per pump, one per process area.',
          'Avoid duplicating the same output coil in more than one place. The last rung solved wins, and it will confuse everyone including you.',
          'Put interlocks in a consistent position so a technician can scan a program and see the conditions at a glance.',
        ],
      },
      { t: 'h2', text: 'When ladder is the wrong choice' },
      {
        t: 'p',
        text: 'Ladder is excellent for discrete interlocking and for logic that technicians must troubleshoot online. It is poor at math-heavy work, string handling, and complex looping. Structured text handles those cleanly. Most mature programs mix them: ladder for the interlocks and device control that maintenance needs to read, structured text for the calculations underneath.',
      },
    ],
    faqs: [
      {
        q: 'Is ladder logic still used?',
        a: 'Yes, heavily. It remains the dominant language in water, wastewater, and most discrete manufacturing, largely because the people who maintain these systems can read it online while the process is running.',
      },
      {
        q: 'What is the difference between a normally-open contact in the field and in the program?',
        a: 'A field contact is a physical device state. A program instruction examines a memory bit. If a normally-closed field contact is wired to an input, the input bit is on when the device is at rest. Whether you use examine-if-closed or examine-if-open in the program depends on what you want to detect, and getting it backwards is a very common commissioning error.',
      },
      {
        q: 'Why does my output flicker?',
        a: 'Usually because the same output address is written by more than one rung, or because the condition driving it is oscillating around a threshold with no deadband. Search the whole program for duplicate destructive writes to that address first.',
      },
      {
        q: 'What is a one-shot and when do I need one?',
        a: 'A one-shot is true for a single scan when its condition transitions from false to true. You need one any time an action should happen once per event rather than continuously: incrementing a counter, sending a message, or capturing a value at the moment something happened.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/interlocks',
      '/controls/plc-systems/programming/permissives',
      '/controls/plc-systems/programming/structured-text',
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
    ],
  },

  {
    path: '/controls/plc-systems/programming/interlocks',
    kind: 'reference',
    title: 'Interlocks and Permissives',
    summary:
      'A permissive lets you start. An interlock stops you. Confusing the two produces equipment that either will not run or will not protect itself.',
    answer:
      'A permissive is a condition that must be satisfied before equipment is allowed to start. An interlock is a condition that stops or prevents operation whenever it is present, including while running. Permissives are checked at the start transition; interlocks are checked continuously. Safety-rated protection belongs in hardwired circuits or a safety controller, not in standard PLC logic.',
    keyPoints: [
      'Permissive: checked to allow a start. Interlock: enforced continuously.',
      'A permissive that is also enforced while running is really an interlock — decide which you mean.',
      'Every interlock needs a defined reset behavior: automatic, manual, or latched until acknowledged.',
      'Operators need to see which specific condition is blocking, not just a generic "not ready".',
      'Personnel safety functions must be hardwired or in a rated safety system.',
    ],
    published: '2026-02-18',
    updated: '2026-06-27',
    readingTime: 7,
    tags: ['PLC', 'Programming', 'Design'],
    blocks: [
      { t: 'h2', text: 'The distinction that matters' },
      {
        t: 'p',
        text: 'Take a high service pump. A permissive might be that the suction valve is open and suction pressure is above minimum. Satisfy those and the operator may start the pump. An interlock might be that motor winding temperature is above limit, or the seal water flow switch has dropped out. Those stop the pump whenever they occur, whether it started ten seconds ago or has been running for six weeks.',
      },
      {
        t: 'table',
        head: ['', 'Permissive', 'Interlock'],
        rows: [
          ['Checked when', 'At the start request', 'Continuously'],
          ['Effect', 'Blocks the start', 'Stops or prevents operation'],
          ['Typical example', 'Suction valve open before pump start', 'High motor temperature'],
          ['If it clears', 'Start is allowed', 'Equipment may restart, depending on reset design'],
          ['Operator sees', '"Cannot start: suction valve closed"', '"Tripped: high motor temperature"'],
        ],
      },
      { t: 'h2', text: 'Reset behavior is a design decision, not a detail' },
      {
        t: 'p',
        text: 'When an interlock clears, what should happen? Three answers are all defensible, and the wrong one for the application causes real problems.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Automatic reset', def: 'Equipment restarts as soon as the condition clears. Appropriate for conditions that are self-correcting and where restarting is harmless, such as a low suction pressure that recovers. Dangerous where an unexpected restart could injure someone or damage equipment.' },
          { term: 'Manual reset', def: 'The condition must clear and an operator must acknowledge before a restart is allowed. Appropriate for anything indicating a real fault: motor overload, seal failure, high vibration.' },
          { term: 'Latched until investigated', def: 'The trip is held and recorded even after the condition clears, so that an intermittent fault leaves evidence. Essential for chasing the fault that only happens at 3 a.m.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Automatic reset on a motor protection trip is a mistake',
        text: 'If a motor tripped on overload, the condition clearing means the overload cooled down, not that the problem was fixed. Automatic reset will cycle a failing motor until something more expensive breaks. Use manual reset and make the trip visible.',
      },
      { t: 'h2', text: 'Tell the operator what is blocking' },
      {
        t: 'p',
        text: 'The most common complaint about interlock logic is not that it trips. It is that when equipment will not start, nobody can tell why. A single "Not Ready" bit is close to useless at 2 a.m.',
      },
      {
        t: 'p',
        text: 'Build the permissive chain so each condition has its own status bit, and expose a first-out or a list of unsatisfied conditions on the HMI. The cost is a few extra rungs. The benefit is that a technician who has never seen the plant can walk to the panel and read the answer.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Individual permissive bits feeding a summary',
        code: `Rung 1:  Suction_Valve_Open        --> Perm_1_Suction_Valve
Rung 2:  Suction_Press > Min_Press --> Perm_2_Suction_Press
Rung 3:  NOT Motor_Overload        --> Perm_3_Overload_Clear
Rung 4:  Control_Power_Healthy     --> Perm_4_Ctrl_Power

Rung 5:  Perm_1 AND Perm_2 AND Perm_3 AND Perm_4 --> Pump_Ready

The HMI shows all four bits. "Pump will not start" becomes a
two-second answer instead of a site visit.`,
      },
      { t: 'h2', text: 'Where interlocks should live' },
      {
        t: 'ul',
        items: [
          'Personnel safety: hardwired safety circuit or a rated safety controller. Not standard PLC logic, and not an HMI button.',
          'Equipment protection where a controller failure would be costly: hardwired in series with the starter coil, and also read by the PLC for indication and alarming.',
          'Process interlocks: PLC logic is appropriate. Document them in the control narrative.',
          'Convenience and sequencing: PLC logic, clearly separated from protective interlocks so nobody deletes the wrong rung during a change.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Read it back to the field',
        text: 'Where a protective interlock is hardwired, bring a contact of that circuit back into the PLC as an input. The logic then knows the same thing the hardware knows, the HMI can display it, and the historian records when it happened. This costs one input point and saves hours of diagnosis.',
      },
    ],
    faqs: [
      {
        q: 'Should interlocks be in the PLC or hardwired?',
        a: 'Both, for different purposes. Anything protecting people must be hardwired or in a rated safety system. Process interlocks belong in the PLC where they can be documented, alarmed, and historized. Critical equipment protection is often done in both, with the hardwired circuit as the enforcement and the PLC providing indication.',
      },
      {
        q: 'What is a first-out indication?',
        a: 'A record of which condition tripped first when several trip nearly simultaneously. Without it, a trip that cascades leaves you looking at five alarms with no way to tell which was the cause and which were the consequences.',
      },
      {
        q: 'Can a permissive be bypassed?',
        a: 'Sometimes it must be, for maintenance or commissioning. If you build a bypass, it should require a deliberate action, be visible on the HMI while active, be alarmed, be logged, and ideally time out on its own. A silent permanent bypass is how interlocks quietly stop existing.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/permissives',
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/programming/alarms',
      '/engineering-library/control-documentation/control-narratives',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/plc-architecture',
    kind: 'reference',
    title: 'PLC Architecture',
    summary:
      'How a programmable logic controller is physically organized: the chassis, backplane, processor, I/O modules, remote racks, and what those choices mean for wiring, expansion, and failure.',
    answer:
      'A PLC is built from a processor and I/O modules that communicate over a backplane inside a chassis, or as a single compact unit with I/O on board. Larger systems extend the backplane to remote racks over a network so that I/O can sit near the equipment. The architecture decides where wiring terminates, how the system grows, and what still runs when a piece fails, which is why it is chosen before any module is specified.',
    keyPoints: [
      'Modular controllers separate processor, power supply, and I/O into slots on a backplane; compact controllers fix them in one unit.',
      'The backplane carries power and data between modules, and a slot number is part of every I/O address.',
      'Remote I/O puts racks near the equipment and brings the data back over a network, trading wiring for a communication dependency.',
      'Expansion, spares, and heat are decided by the chassis size, and a full chassis is a costly place to discover you need one more module.',
      'What happens on a rack or network failure is an architecture decision, and it should be written down before it is tested.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Fundamentals', 'Design'],
    blocks: [
      { t: 'h2', text: 'Three shapes of controller' },
      {
        t: 'dl',
        items: [
          { term: 'Modular', def: 'A chassis with a backplane and slots. A power supply, a processor, and I/O or communication modules each occupy a slot. The chassis size sets the number of modules, and additional chassis can be added locally or remotely. This is the architecture of most plant and large station controllers.' },
          { term: 'Compact', def: 'The processor, power supply, and a fixed set of I/O in one housing, often with a few expansion modules that snap onto the side. Fewer parts, lower cost, and a hard ceiling on I/O. Most small lift stations, packaged systems, and machine controls use one.' },
          { term: 'Distributed', def: 'A processor with little or no local I/O, and I/O blocks placed around the plant on a network. The wiring runs a few feet to a nearby block instead of hundreds of feet to a central panel. The network becomes part of the control system, with everything that implies.' },
        ],
      },
      { t: 'h2', text: 'The backplane' },
      {
        t: 'p',
        text: 'The backplane is the printed circuit board at the back of the chassis that every module plugs into. It carries the regulated power from the power supply to the modules and it carries data between the processor and the modules. The processor reads every input module and writes every output module across the backplane on each scan, and the slot a module sits in is how the processor identifies it.',
      },
      {
        t: 'p',
        text: 'Two consequences follow. A module in the wrong slot is a different address, which is why moving modules around a chassis is a programming change and not just a hardware change. And the backplane has a power budget: each module draws a defined current from it, and a full chassis of high-draw modules can exceed what the power supply delivers, which shows up as intermittent module faults rather than a clear failure. The manufacturer publishes the draw of each module and the budget of each supply, and the sum is checked at design time.',
      },
      { t: 'h2', text: 'What lives in the slots' },
      {
        t: 'ul',
        items: [
          'The power supply, which on most modular platforms is a module or bolts to one end of the chassis, converts line voltage or 24 VDC to the backplane voltages.',
          'The processor, in a fixed slot on some platforms and any slot on others, holds the program and drives the backplane.',
          'Discrete input and output modules, in groups of 8, 16, or 32 points, at the field voltage the devices use.',
          'Analog input and output modules, in groups of 4 to 16 channels, for 4 to 20 mA, voltage, RTD, and thermocouple signals.',
          'Communication modules for Ethernet, serial, and fieldbus connections to SCADA, drives, and other controllers.',
          'Specialty modules for high-speed counting, motion, weighing, and safety, where the timing or the certification exceeds what the processor does over the backplane.',
        ],
      },
      { t: 'h2', text: 'Local, remote, and distributed I/O' },
      {
        t: 'p',
        text: 'When the I/O outgrows one chassis, or the equipment is far from the panel, the backplane is extended. Local expansion chassis connect with a short cable and behave like more slots. Remote racks connect over a network, EtherNet/IP, ControlNet, PROFINET, or a vendor scheme, and the processor exchanges I/O data with them on a schedule rather than on every scan.',
      },
      {
        t: 'table',
        caption: 'Where the I/O sits and what it costs',
        head: ['Arrangement', 'Wiring', 'Dependency', 'Typical use'],
        rows: [
          ['One chassis in one panel', 'Every field wire runs to the panel', 'None beyond the chassis', 'Small stations and machines'],
          ['Local expansion chassis', 'Same as above, more slots', 'The expansion cable', 'A panel that outgrew its chassis'],
          ['Remote racks over a network', 'Field wiring is short; a network cable is long', 'The network and its switches', 'A plant with several buildings or a long process line'],
          ['Distributed I/O blocks', 'Shortest wiring, blocks at the equipment', 'The network, and many small devices', 'Conveyors, packaging, and spread-out plants'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Remote I/O turns a wiring problem into a network problem',
        text: 'When a remote rack loses its connection, every input on it goes stale and every output on it goes to its configured fault state, at once. The behavior of the process in that moment is set by the output fault configuration and by what the program does with a rack that reports a connection fault. Both must be decided in design, written into the narrative, and tested at FAT by unplugging the cable.',
      },
      { t: 'h2', text: 'Redundancy' },
      {
        t: 'p',
        text: 'Where a controller stopping is not acceptable, platforms offer redundant processors: two processors, usually in separate chassis, one running and one synchronized and ready to take over within a scan or two when the primary fails. The I/O is on remote racks reachable by both. Redundancy is expensive, it adds its own failure modes, and it does not protect against a program error, which both processors will execute faithfully. It belongs where a stopped controller costs more than the redundancy does, which in water and wastewater usually means a large plant, not a lift station.',
      },
      { t: 'h2', text: 'Design decisions that follow from the architecture' },
      {
        t: 'ul',
        items: [
          'Spare slots. A chassis at capacity on day one has no room for the module that the first change order needs. Twenty percent spare slots and spare I/O points is a common rule.',
          'Heat. Modules dissipate power into the enclosure, and a chassis full of relay outputs and drives in the same enclosure needs a thermal calculation. The enclosure heat load calculator covers it.',
          'Grounding. The chassis is bonded to the panel ground, and analog signal shields land at a single point. The grounding pages cover the practice.',
          'Slot layout. Analog modules away from relay outputs and away from the power supply, and communication modules where their cables can be routed without crossing power wiring.',
          'Documentation. The rack layout drawing, with every slot, module part number, and address range, is the drawing a technician opens first at three in the morning.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a modular and a compact PLC?',
        a: 'A modular controller is a chassis with slots for separately chosen processor, power supply, and I/O modules, and it can grow by adding chassis. A compact controller has a fixed processor and I/O in one unit, with limited expansion. Compact costs less and modular scales.',
      },
      {
        q: 'What does the backplane do?',
        a: 'It carries power from the supply to every module and data between the processor and every module. The processor reads and writes all I/O across it each scan, and a module is addressed by the slot it occupies on it.',
      },
      {
        q: 'When should I use remote I/O?',
        a: 'When the field wiring back to a central panel would be longer and more expensive than a network cable and a remote rack, or when the equipment is in another building. Accept that the network then has to be designed, secured, and maintained as part of the control system.',
      },
      {
        q: 'Do I need a redundant processor?',
        a: 'Only where a stopped controller costs more than the redundancy, which is a large plant or a critical process, not a typical station. Redundancy does not protect against a program error, and the network and I/O still have to be designed so that both processors can reach them.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/what-is-a-plc',
      '/controls/plc-systems/plc-fundamentals/cpu',
      '/controls/plc-systems/plc-fundamentals/io-systems',
      '/controls/plc-systems/plc-fundamentals/power-supplies',
      '/calculators/enclosure-heat-load',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/cpu',
    kind: 'reference',
    title: 'The PLC Processor',
    summary:
      'What the processor module does on every scan, how its memory is organized, what the mode switch and status lights mean, and how it faults and recovers.',
    answer:
      'The processor, or CPU, holds the control program and the data table, solves the program against the current input image on every scan, and manages the backplane, communications, and diagnostics. Its mode switch decides whether it is running or being programmed, its status lights are the first diagnostic in the field, and when something goes wrong it faults in a defined way that leaves outputs in a known state rather than continuing with bad data.',
    keyPoints: [
      'The processor solves logic against a snapshot of inputs taken at the start of the scan, not against live signals.',
      'Program memory and data memory are separate; retentive data survives a power cycle only if the hardware provides for it.',
      'Run, program, and remote modes decide what can be changed and from where, and the keyswitch position is part of the security of the system.',
      'Status lights and the fault log are the first diagnostic; read them before connecting a laptop.',
      'A fault is a designed response: outputs go to their configured state and the fault code says why.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'What the processor does' },
      {
        t: 'p',
        text: 'Every scan the processor performs the same sequence: it copies the state of the input modules into the input image, solves the program top to bottom against that image, writes the resulting output image to the output modules, and then services communications and housekeeping. The scan cycle page covers the order and its consequences in detail. The processor is also the module that talks to the programming software, to SCADA, and to other controllers, and it runs the diagnostics that decide whether the system is healthy.',
      },
      {
        t: 'p',
        text: 'Processing speed matters less than most people expect. Scan time is dominated by the size of the program and the volume of I/O and communication, and a controller that scans in ten milliseconds is not noticeably better than one that scans in twenty for a pump station. Determinism matters more: the scan must complete within a bounded time, every time, and the watchdog enforces it.',
      },
      { t: 'h2', text: 'Memory' },
      {
        t: 'dl',
        items: [
          { term: 'Program memory', def: 'Holds the logic, the routines, and the configuration. Sized in kilobytes or megabytes depending on the platform, and a full program memory stops further downloads.' },
          { term: 'Data memory', def: 'Holds the data table: input and output images, timers, counters, integers, floats, strings, and the user-defined structures. This is what the program reads and writes and what SCADA reads.' },
          { term: 'Retentive memory', def: 'The portion of data memory that survives a power cycle, backed by a battery, a capacitor, or nonvolatile storage. Setpoints, totalizers, and run hours live here. What is retentive and how it is protected is a platform property covered on the retentive memory page.' },
          { term: 'Nonvolatile program storage', def: 'A memory card or internal flash that holds a copy of the program so that a controller that has lost its memory can restore itself on power-up. Whether it loads automatically, and whether it overwrites recent online edits, is a setting worth knowing.' },
        ],
      },
      { t: 'h2', text: 'Modes' },
      {
        t: 'p',
        text: 'The processor is always in one of a few modes, selected by a keyswitch on the module, by the programming software, or both. The names differ by vendor, but the behaviors are the same everywhere.',
      },
      {
        t: 'table',
        caption: 'Processor modes',
        head: ['Mode', 'Logic', 'Outputs', 'Downloads and edits'],
        rows: [
          ['Run', 'Executing', 'Controlled by the program', 'Not permitted, or online edits only, depending on the keyswitch'],
          ['Program', 'Stopped', 'Off or at their configured state', 'Permitted'],
          ['Remote', 'As selected by software', 'As selected', 'The software can change the mode; the key is not needed at the panel'],
          ['Test', 'Executing', 'Held off; the program runs but outputs are not written', 'Used to check logic without moving equipment'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The keyswitch is a security control',
        text: 'A processor left in remote mode can be stopped, reprogrammed, or set to program mode from anywhere on the network that can reach it. Leaving the key in run after commissioning, and removing it from the panel, is the cheapest protection a control system has against both mistakes and intrusion.',
      },
      { t: 'h2', text: 'Status lights' },
      {
        t: 'p',
        text: 'The lights on the front of the processor are the diagnostic that needs no software. Their exact set varies, but a technician arriving at a faulted panel should be able to read them before opening a laptop.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Run', def: 'Solid when the processor is executing logic. Off in program mode. Flashing usually means the processor is in run but a condition, such as a missing program, is preventing execution.' },
          { term: 'OK, or fault', def: 'Solid green when healthy. Flashing red usually means a recoverable fault; solid red an unrecoverable one. The manual for the platform gives the exact meanings.' },
          { term: 'I/O', def: 'Solid when every configured module and remote connection is present and healthy. Flashing when one or more is missing or faulted, which is the usual first sign of a remote rack losing its network.' },
          { term: 'Communication ports', def: 'Activity and link lights on the Ethernet and serial ports. A dark link light on a port that should be connected is a cable or switch problem, not a program problem.' },
          { term: 'Battery or energy storage', def: 'Lit when the retention backup is low or absent. It is the light that gets ignored until the day the power goes out and the setpoints go with it.' },
        ],
      },
      { t: 'h2', text: 'Faults' },
      {
        t: 'p',
        text: 'When the processor detects a condition it cannot safely continue through, it faults: it stops executing logic, drives outputs to their configured fault state, lights the fault indicator, and records a fault code with the routine and instruction where it happened. Faults are classified as recoverable, which can be cleared and the processor restarted, and unrecoverable, which need a power cycle or a download.',
      },
      {
        t: 'ul',
        items: [
          'Watchdog timeout, when a scan runs longer than the configured limit, usually from a loop in logic or a communication task that stalls.',
          'Program faults such as an array index out of range, a divide by zero on some platforms, or a jump to a missing label.',
          'I/O faults, when a configured module is missing, is the wrong type, or a remote connection has failed and the connection is set to fault the processor.',
          'Memory faults, from a failed battery, corrupted program storage, or a firmware mismatch after a module replacement.',
          'Power faults, from a brownout that dropped the backplane below its minimum, which can look like a random restart.',
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Know what the outputs do on a fault before it happens',
        text: 'Each output module is configured to hold last state, go off, or go to a defined value when the processor faults or the connection is lost. A pump that holds last state keeps running with no logic watching it. That configuration is a design decision for every output, and it is reviewed against the process, not left at the default.',
      },
      { t: 'h2', text: 'Firmware and replacement' },
      {
        t: 'p',
        text: 'The processor runs firmware, and the programming software, the project file, and the firmware have to be compatible with each other. A replacement processor from stock often carries a different firmware revision than the one it replaces, and the project will not download until they match. Recording the firmware revision on the rack drawing and keeping the matching software installed is what turns a processor replacement from a day into an hour.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between program mode and run mode?',
        a: 'In run mode the processor executes the program and controls outputs. In program mode it stops executing, outputs go off or to their configured state, and the program can be downloaded or changed. Remote mode lets the software choose between the two without the key.',
      },
      {
        q: 'Why does a faster processor not give a faster scan?',
        a: 'Because scan time is mostly the program size, the I/O count, and the communication load, not the clock speed of the processor. Halving the program does more for scan time than doubling the processor speed.',
      },
      {
        q: 'What does a flashing fault light mean?',
        a: 'On most platforms a flashing red fault light is a recoverable fault: the processor has stopped, a fault code is recorded, and the fault can be cleared from the software or the keyswitch once the cause is fixed. Solid red is usually unrecoverable and needs a power cycle or a download. Read the platform manual for the exact pattern.',
      },
      {
        q: 'Should the processor be left in remote mode?',
        a: 'Not after commissioning. Remote mode lets anyone with network access change the mode or download. Leave it in run, remove the key, and use remote mode only during work that needs it.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/controls/plc-systems/plc-fundamentals/plc-architecture',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/power-supplies',
    kind: 'reference',
    title: 'Control Power Supplies',
    summary:
      'Sizing the 24 VDC supplies that run a controller and its field devices, separating loads that should not share a supply, and keeping the controller alive through a power event.',
    answer:
      'A control panel usually has two kinds of DC power: the supply that feeds the controller backplane, and the supply that feeds the field devices, instruments, and relays. They are sized from the sum of their loads with margin for inrush and temperature, and they are kept separate so that a shorted field wire does not take the processor down with it. Backing up the controller supply with a UPS or a DC battery is what keeps the station reporting through the outage instead of going dark.',
    keyPoints: [
      'Sum the loads, add the inrush of anything with a coil or a capacitor, and leave at least 20 to 30 percent margin after temperature derating.',
      'Keep the controller and the field on separate supplies so a field fault cannot crash the processor.',
      'Every branch off a supply gets its own fuse or breaker, sized to open before the supply folds back and starves everything else.',
      'Ground the DC common at one point, and know where that point is.',
      'Decide what must keep running through an outage, and back up only that.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Panels', 'Power', 'Design'],
    blocks: [
      { t: 'h2', text: 'What the supply feeds' },
      {
        t: 'p',
        text: 'Almost everything in a modern panel runs on 24 VDC: the controller, the I/O modules through the backplane, the network switch, the loop-powered transmitters, the interposing relays, the pilot lights, the radio or cellular modem, and the touchscreen. A single supply can feed all of it in a small panel, and in a small panel it often does. That is the arrangement that produces the call where a shorted float switch cable took the whole station off line.',
      },
      { t: 'h2', text: 'Separating loads' },
      {
        t: 'p',
        text: 'The supplies in a panel are separated by what fails together. The controller and its backplane are the highest value load and the one that should never lose power because of something in the field. The field devices are the ones exposed to wet junction boxes, chafed cables, and technicians with meters.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Controller supply', def: 'Feeds the processor, the backplane, and usually the network switch and the HMI. Nothing that leaves the panel is on it.' },
          { term: 'Field and I/O supply', def: 'Feeds the input wetting voltage, the loop-powered transmitters, the interposing relay coils, and the solenoids. It is the one that trips.' },
          { term: 'Communication supply', def: 'On sites that report over radio or cellular, the modem and radio are often on their own backed-up supply so the station can report the outage that took everything else down.' },
        ],
      },
      { t: 'h2', text: 'Sizing' },
      {
        t: 'steps',
        items: [
          { title: 'List every load with its current.', text: 'From the datasheets: the backplane draw of the chassis, each transmitter at 20 mA plus HART margin, each relay coil, each pilot light, the switch, the HMI, and the radio. Use maximum values, not typical ones.' },
          { title: 'Add the inrush.', text: 'Relay coils, solenoids, and anything with a capacitor draw several times their running current for a moment at power-up. A supply that cannot cover the simultaneous inrush at power-up will fold back and the panel will not come up.' },
          { title: 'Derate for temperature.', text: 'A supply rated at its full output to 40 or 50 degrees C delivers less above that. A panel in the sun in summer is above it. Apply the derating curve from the datasheet at the enclosure design temperature.' },
          { title: 'Add margin.', text: 'Twenty to thirty percent above the derated total. The margin covers the loads that were not on the list and the ones added later.' },
          { title: 'Check the voltage at the far end.', text: 'A transmitter at the end of a long run sees the supply voltage minus the drop in the wire. The loop voltage budget on the 4-20 mA pages and the voltage drop calculator cover the arithmetic.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Two smaller supplies beat one large one',
        text: 'Two supplies, one for the controller and one for the field, cost little more than one supply of the combined rating, and they fail separately. The power supply sizing how-to on this site walks through a real panel.',
      },
      { t: 'h2', text: 'Protection' },
      {
        t: 'p',
        text: 'A DC supply into a short circuit does not blow a fuse the way a transformer does; most fold back their output current to a limit and sit there, dropping the voltage on everything they feed. Each branch off a supply therefore gets its own fuse or DC-rated breaker, sized so that a short on that branch opens the branch protection before the supply reaches its current limit. Fusing the field wiring separately from the panel wiring, and fusing each remote device group separately, keeps a field short from browning out the rest of the panel.',
      },
      {
        t: 'p',
        text: 'Electronic fused terminal blocks and DC circuit breakers with indication show which branch tripped from the front of the panel. A glass fuse in a holder shows nothing, and finding the open one in a row of twenty is a familiar way to spend an hour.',
      },
      { t: 'h2', text: 'Grounding the common' },
      {
        t: 'p',
        text: 'The negative side of the 24 VDC system is normally bonded to the panel ground at one point, which references every signal to a known potential and lets a ground fault on the positive side be detected. Bonding it at more than one point creates a ground loop between the bonds, and leaving it floating lets the whole system drift with whatever leakage exists. The one bond, its location, and whether the field supply shares it with the controller supply are decisions that belong on the drawings.',
      },
      { t: 'h2', text: 'Backup power' },
      {
        t: 'p',
        text: 'A station on utility power loses it several times a year. The question is what should keep working through the outage. The pumps will not, unless there is a generator. But the controller can, and the radio can, and that means the station can report that it is down, hold its retentive data cleanly, and restart without a technician.',
      },
      {
        t: 'dl',
        items: [
          { term: 'AC UPS ahead of the supplies', def: 'A small uninterruptible power supply feeding the DC supplies. Simple, and it also rides through the momentary dips that otherwise reboot the controller. The battery is lead-acid or lithium and needs replacing every few years.' },
          { term: 'DC UPS with a battery module', def: 'A 24 VDC supply with a battery on its output, so the DC bus itself is held up. No inverter, higher efficiency, and the battery is monitored by the module. The UPS runtime calculator sizes the battery.' },
          { term: 'Generator with a transfer switch', def: 'For the pumps. The controller still needs a UPS to cover the seconds between utility loss and generator transfer, which is exactly when the controller is needed to manage the restart.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'A backed-up panel is live with the disconnect open',
        text: 'A UPS or a battery module means the DC bus and everything on it stays energized after the panel disconnect is opened. Label it, and treat the DC side as live until the battery is disconnected. NFPA 70E applies to stored energy as much as to the incoming feed.',
      },
    ],
    faqs: [
      {
        q: 'How do I size a 24 VDC power supply for a PLC panel?',
        a: 'Sum the maximum current of every load, add inrush for coils and capacitive loads, derate for the enclosure temperature from the datasheet curve, then add 20 to 30 percent margin. The how-to on this site works an example, and the calculator does the arithmetic.',
      },
      {
        q: 'Should the PLC and the field devices share a power supply?',
        a: 'Not if the panel matters. A shorted field cable on a shared supply drops the voltage to the processor and crashes it. A separate controller supply keeps the processor running and reporting while the field branch fuse does its job.',
      },
      {
        q: 'Why does the panel not power up after a shutdown?',
        a: 'Usually inrush. Every relay, solenoid, and capacitor draws several times its running current at once on power-up, and a supply sized for the running load folds back and never comes up. Stagger the loads, or size for the inrush.',
      },
      {
        q: 'Where do I ground the 24 VDC common?',
        a: 'At one point, bonded to the panel ground, shown on the drawings. More than one bond makes a ground loop; no bond leaves the system floating.',
      },
    ],
    related: [
      '/how-to/panel-how-to/size-a-power-supply',
      '/calculators/dc-power-supply-load',
      '/calculators/ups-battery-runtime',
      '/controls/plc-systems/plc-fundamentals/plc-architecture',
      '/troubleshooting/power-troubleshooting/power-supply-failure',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/io-systems',
    kind: 'reference',
    title: 'PLC I/O Systems',
    summary:
      'Discrete and analog input and output modules, sinking and sourcing, relay and transistor outputs, wiring conventions, and the module diagnostics that find field faults from the panel.',
    answer:
      'I/O modules are where the controller meets real voltages and currents. Discrete inputs read on or off from switches and contacts at a wetting voltage; discrete outputs drive coils and lamps through relays, transistors, or triacs; analog inputs convert 4 to 20 mA or voltage signals to numbers, and analog outputs do the reverse. Choosing the module means matching its electrical type to the field device, and wiring it means respecting sink and source, commons, and isolation, because most field faults are wiring faults.',
    keyPoints: [
      'A discrete input needs a wetting voltage and a common; the module datasheet says which side sinks and which sources.',
      'Relay outputs switch anything but wear out; transistor outputs last but switch DC only and need suppression on coils.',
      'Analog inputs are current or voltage, single-ended or differential, and the choice decides how noise and ground potential affect the reading.',
      'Isolation between the field and the backplane is what keeps a field fault from reaching the processor.',
      'Module diagnostics, open wire, over-range, blown fuse, tell you from the panel what a meter would tell you in the field.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Fundamentals', 'Signals', 'Analog'],
    blocks: [
      { t: 'h2', text: 'Discrete inputs' },
      {
        t: 'p',
        text: 'A discrete input tells the program whether a circuit is closed. The field device, a float switch, a limit switch, a pressure switch, an auxiliary contact on a starter, closes a contact, and the module detects the voltage that the closed contact lets through. That voltage, called the wetting voltage, comes from a supply in the panel, and the module is designed for a specific one: 24 VDC in most new work, 120 VAC in older panels and in some motor control centers.',
      },
      {
        t: 'p',
        text: 'The words sinking and sourcing describe which way current flows through the module and are the most common cause of an input that never turns on. A sinking input expects the field device to connect it to the positive supply, and the module returns the current to common. A sourcing input supplies the positive itself and expects the field device to connect to common. Three-wire sensors with PNP or NPN outputs have to match. The module datasheet has a wiring diagram, and it is the drawing to follow, not the convention someone remembers.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Normally open in the program is not normally open in the field',
        text: 'A float switch wired normally closed, so that a broken wire looks like an alarm, is read by the program as a bit that is on in the normal condition. The examine-if-closed instruction on that bit is true when the float is not floating. The wiring convention and the program convention have to be agreed and documented, and a fail-safe wiring choice reversed in the program is a common cause of a lift station that alarms on nothing.',
      },
      { t: 'h2', text: 'Discrete outputs' },
      {
        t: 'table',
        caption: 'Output types',
        head: ['Type', 'Switches', 'Strengths', 'Limits'],
        rows: [
          ['Relay contact', 'AC or DC, up to a few amps', 'Isolated, tolerant of anything, easy to understand', 'Mechanical wear, slow, contacts pit on inductive loads without suppression'],
          ['Transistor', 'DC only, typically 24 V at 0.5 to 2 A', 'No wear, fast, fine for pilot lights and relay coils', 'Polarity matters, needs a flyback diode on coils, no AC'],
          ['Triac', 'AC only', 'No wear, quiet, fine for contactor coils', 'Leakage current can hold a small load on; no DC'],
        ],
      },
      {
        t: 'p',
        text: 'Whatever the module, the output rarely drives the final load directly. A motor starter coil, a valve actuator, or a heater is switched through an interposing relay in the panel, so that the load current and the load voltage never reach the module, and so that a shorted coil takes out a two dollar relay rather than a sixteen point card. The interposing relay also converts the module voltage to the load voltage, which is how a 24 VDC transistor output starts a 120 VAC coil.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Suppress every coil',
        text: 'A relay or solenoid coil produces a voltage spike when it is switched off. A flyback diode across a DC coil, or an RC snubber across an AC coil, absorbs it. Without suppression the spike erodes output contacts, upsets nearby analog signals, and shortens the life of transistor outputs. Many interposing relay sockets have the suppressor built in; confirm it is there.',
      },
      { t: 'h2', text: 'Analog inputs' },
      {
        t: 'p',
        text: 'An analog input converts a continuous signal into a number. The common signals are 4 to 20 mA current, 0 to 10 V, and the direct temperature inputs, RTD and thermocouple, which have their own module types. The module samples the signal, converts it with an analog to digital converter of a stated resolution, and presents the program with a count, which the scaling page turns into an engineering value.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Current inputs', def: 'A 250 ohm resistor, internal to the module or external, turns 4 to 20 mA into 1 to 5 V for the converter. Some channels supply loop power for two-wire transmitters; some only accept a signal. The 4-20 mA pages cover which is which and why connecting them wrong damages one of them.' },
          { term: 'Voltage inputs', def: 'Read the voltage directly. Sensitive to wire resistance and to noise, so they are used for short runs inside the panel and for devices that only offer a voltage output.' },
          { term: 'Single-ended and differential', def: 'A single-ended channel measures each signal against a shared common; a differential channel measures between its own two terminals. Differential inputs reject noise and ground potential differences that single-ended inputs read as signal. Where the field devices are far apart or grounded separately, differential is the safer choice.' },
          { term: 'Resolution', def: 'Twelve bits gives 4,096 counts across the range; sixteen bits gives 65,536. Twelve is enough for a level in a wet well; sixteen matters for a flow total or a chemical dose. The analog resolution calculator shows what each gives in engineering units.' },
        ],
      },
      { t: 'h2', text: 'Analog outputs' },
      {
        t: 'p',
        text: 'An analog output does the reverse, converting a number to 4 to 20 mA or 0 to 10 V for a drive speed reference, a valve positioner, or a chemical feed pump. The load it drives has a maximum resistance the output can push the current through, published on the datasheet, and a long run to a positioner can exceed it. The fault state of an analog output, hold or go to a value, is configured per channel and decides what the drive does when the processor stops.',
      },
      { t: 'h2', text: 'Isolation and commons' },
      {
        t: 'p',
        text: 'Modules isolate the field side from the backplane, usually optically, so that a field fault cannot reach the processor. Between points on the same module the isolation varies: some modules have one common for all sixteen points, some have a common per group of four or eight, and some isolate every channel. The grouping decides which field devices can share a supply and which cannot, and it is the reason two devices on different supplies cannot be wired to the same eight-point group.',
      },
      { t: 'h2', text: 'Diagnostics' },
      {
        t: 'p',
        text: 'Diagnostic modules report conditions that would otherwise take a meter and a trip to the field: an open wire on an input, an over-range or under-range on an analog channel, a blown output fuse, a short on an output, and a missing field supply. Each is available to the program as a status bit, and a program that alarms on them tells the operator that the level transmitter wire is broken rather than that the level is zero. The extra cost of a diagnostic module is paid back the first time it is needed.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Field voltage is present at the module with the processor stopped',
        text: 'Putting the processor in program mode turns the logic off; it does not remove the wetting voltage from the input terminals or the field supply from the output commons. A 120 VAC input module is live at its terminals as long as its supply is on. Isolate the field supply, not the processor, before working on the wiring.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between sinking and sourcing inputs?',
        a: 'Which direction current flows through the module. A sinking input is switched to the positive supply by the field device and returns current to common; a sourcing input supplies the positive and is switched to common. A three-wire sensor has to match: PNP sensors go with sinking inputs, NPN with sourcing, on most platforms. The datasheet diagram governs.',
      },
      {
        q: 'Should I use relay or transistor outputs?',
        a: 'Transistor outputs for DC loads that switch often, such as pilot lights and interposing relays, because they do not wear. Relay outputs where the load is AC, where isolation from the field matters, or where the load type is unknown. Either way, drive motor starters and solenoids through an interposing relay.',
      },
      {
        q: 'When do I need a differential analog input?',
        a: 'When the signal sources are grounded at different places or are far apart, when a drive is nearby, or when a single-ended channel is reading noise. A differential input measures between its own two terminals and ignores what the common is doing.',
      },
      {
        q: 'What is an interposing relay for?',
        a: 'It sits between the output module and the real load. It carries the load current and voltage that the module cannot, converts between the module voltage and the load voltage, and fails cheaply and separately from the module.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/4-20-ma',
      '/controls/plc-systems/analog-control/scaling',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/calculators/analog-resolution',
      '/troubleshooting/plc-troubleshooting/inputs-not-reading',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/memory',
    kind: 'reference',
    title: 'Controller Memory and Addressing',
    summary:
      'How a controller organizes its data: data tables and tags, the input and output images, the elementary data types and what they hold, and the naming discipline that keeps a program readable years later.',
    answer:
      'Controller data lives in a data table, addressed either by file and word on older platforms or by name on tag-based ones. Every value has a type that fixes its size and range: a BOOL is one bit, an INT sixteen bits, a DINT thirty-two, a REAL a thirty-two bit floating point number. The input and output images are the part of the table that mirrors the modules. Whether the address is N7:12 or Wetwell_Level_ft, the program is only maintainable if the names say what the data is and the types match what it holds.',
    keyPoints: [
      'Older platforms address data by file type and element; tag-based platforms address it by name, and the name is the documentation.',
      'The type sets the range: an INT stops at 32,767, a DINT at about 2.1 billion, and a REAL holds about seven significant digits.',
      'The input image is a copy of the modules taken at the start of the scan; the program never reads a module directly.',
      'Structures and arrays let one tag hold everything about a pump, and a user-defined type makes every pump the same.',
      'A naming convention agreed before programming starts is worth more than any amount of commenting afterward.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Fundamentals', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Two ways to name a memory location' },
      {
        t: 'dl',
        items: [
          { term: 'File-based addressing', def: 'The older scheme: memory is divided into files by type, and an address names the file and the element, such as an integer file element or a bit within a binary file word. The address is fixed by where the data physically sits, and a symbol or comment attached to it is the only clue to its meaning. Many controllers still in service use it, and their programs are read with the symbol table open in one hand.' },
          { term: 'Tag-based addressing', def: 'The current scheme: every value has a name chosen by the programmer, a type, and a description, and the controller manages where it sits. The program refers to the name, SCADA refers to the name, and the name carries the meaning. The discipline moves from remembering addresses to choosing names well.' },
          { term: 'Absolute addressing with symbols', def: 'Some platforms address memory areas directly, inputs, outputs, flags, and data blocks, and layer a symbolic name on top. In practice the symbol is used everywhere and the absolute address appears only in the hardware configuration.' },
        ],
      },
      { t: 'h2', text: 'Data types' },
      {
        t: 'table',
        caption: 'Elementary types and what they hold',
        head: ['Type', 'Size', 'Range', 'Used for'],
        rows: [
          ['BOOL', '1 bit', 'On or off', 'Contacts, coils, states, and alarms'],
          ['SINT', '8 bits', '-128 to 127', 'Rarely; some device data'],
          ['INT', '16 bits', '-32,768 to 32,767', 'Raw analog counts, older platforms, Modbus registers'],
          ['DINT', '32 bits', 'About plus or minus 2.1 billion', 'Counters, totals, timers, the default integer on modern platforms'],
          ['REAL', '32 bits', 'About seven significant digits, huge range', 'Engineering values, setpoints, calculated values'],
          ['LREAL', '64 bits', 'About fifteen significant digits', 'Accumulated totals where seven digits is not enough'],
          ['STRING', 'Varies', 'Text of a set maximum length', 'Messages, identifiers, and recipe names'],
          ['TIME, DATE', 'Varies', 'Durations and calendar values', 'Scheduling and event timestamps'],
        ],
      },
      {
        t: 'p',
        text: 'The type is not a formality. A flow total accumulated in an INT rolls over at 32,767 and reads negative. A total accumulated in a REAL stops incrementing once it reaches about sixteen million, because adding a small flow increment to a large float changes nothing in seven digits. The data type ranges table and the IEEE 754 calculator on this site cover both effects. Choose the type for the largest value and the finest increment the tag will ever see, not for the value on the day it is created.',
      },
      { t: 'h2', text: 'The images' },
      {
        t: 'p',
        text: 'The input image is a region of the data table that holds a copy of every input module, refreshed at the start of the scan. The output image holds what the program has decided every output should be, written to the modules at the end of the scan. The program reads and writes the images, never the modules, which is why an input cannot change halfway through a scan and why an output set and then cleared in the same scan never energizes. The scan cycle page covers the consequences.',
      },
      { t: 'h2', text: 'Structures, arrays, and user-defined types' },
      {
        t: 'p',
        text: 'A pump has a run command, a run feedback, a fault, an hours total, a start count, a hand-off-auto state, and half a dozen setpoints. As separate tags that is a dozen names per pump and a program that reads like a phone book. As a structure, a user-defined type named Pump with those members, each pump is one tag, every pump has the same members in the same order, and the logic that handles a pump can be written once and applied to each. Arrays do the same for a list of things of one kind, a hundred alarm bits or twelve level setpoints.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Define the type before the first pump, not after the fourth',
        text: 'Retrofitting a structure onto tags that already exist means renaming every reference in the program and in SCADA. Deciding what a pump, a valve, and an analog input look like as types is part of the design, done with the tag list and before the logic.',
      },
      { t: 'h2', text: 'Naming' },
      {
        t: 'p',
        text: 'A tag name is read by the programmer, the SCADA developer, the operator who sees it in an alarm, and the technician who finds it in a fault ten years on. It should say what the thing is, using the instrument tag from the P&ID where one exists, with a consistent structure and no abbreviations that only the author understands. Wetwell_Level_ft says more than LT101_PV, and LT101_Level_ft says the most, because it ties the tag to the drawing and states the unit.',
      },
      {
        t: 'ul',
        items: [
          'Use the P&ID tag as the root wherever the tag corresponds to an instrument or a piece of equipment.',
          'State the unit in the name of every engineering value, so that nobody has to guess whether Level is feet or percent.',
          'Keep one convention for the whole site, written down, and give it to every contractor.',
          'Fill the description field. It is what SCADA and the alarm summary display, and it is the only place a sentence fits.',
          'Never reuse a tag for a second purpose because it happened to be free.',
        ],
      },
      { t: 'h2', text: 'Memory that runs out' },
      {
        t: 'p',
        text: 'Program memory and data memory are finite, and both fill. A program that grows by copy and paste, a data table full of unused tags from an earlier version, and arrays sized for a plant twice this size all consume it. The controller reports the memory in use, and a project that is above about three quarters of the capacity is one that will fail to download after the next change. The remedy is housekeeping, or a larger processor, and the time to find out is before the change order, not during it.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between an INT and a DINT?',
        a: 'Size and range. An INT is sixteen bits and holds about plus or minus 32,000; a DINT is thirty-two bits and holds about plus or minus 2.1 billion. Modern platforms use DINT by default because the INT range is exceeded by an ordinary counter within weeks.',
      },
      {
        q: 'Why did my flow total stop increasing?',
        a: 'It is a REAL, and it has grown to the point where adding one increment does not change the number within its seven significant digits. Accumulate totals in a DINT with a fixed scale, or in an LREAL, and roll the total into a daily or monthly register.',
      },
      {
        q: 'What is a user-defined type?',
        a: 'A structure the programmer defines, with named members of various types, that then becomes a type like any other. A UDT for a pump, with its commands, statuses, and setpoints, makes every pump tag identical in shape and lets the pump logic be written once.',
      },
      {
        q: 'Does the program read inputs directly from the modules?',
        a: 'No. It reads the input image, a copy taken at the start of the scan, and writes the output image, which is sent to the modules at the end. That is what makes the scan deterministic, and it is why an input cannot change in the middle of a scan.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/controls/plc-systems/programming/program-organization',
      '/tables/plc-data-types',
      '/calculators/data-type-ranges',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/tasks',
    kind: 'reference',
    title: 'Tasks and Execution Priority',
    summary:
      'How a controller schedules its work: the continuous task, periodic tasks at a fixed rate, event tasks triggered by something happening, how priority preempts, and where each kind of logic belongs.',
    answer:
      'A modern controller does not run one scan; it runs tasks. The continuous task runs the main program over and over as fast as it can. Periodic tasks run at a fixed interval, preempting the continuous task at a set priority, which is where PID loops, fast counting, and anything that must run at a known rate belong. Event tasks run when something happens, an input changes or data arrives. Getting the assignment right is what makes a loop tune the same on a busy day as on a quiet one.',
    keyPoints: [
      'The continuous task runs whenever nothing of higher priority needs the processor, so its scan time varies with everything else.',
      'A periodic task runs on a fixed interval and its logic sees a constant time step, which is what closed-loop control needs.',
      'A higher priority task interrupts a lower one; a task that overruns its period is a fault waiting to happen.',
      'Put fast, timing-sensitive logic in short periodic tasks and everything else in the continuous task.',
      'Each task has its own watchdog, and the tasks together must fit within the processor time available.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['PLC', 'Fundamentals', 'Programming', 'PID'],
    blocks: [
      { t: 'h2', text: 'One scan is not enough' },
      {
        t: 'p',
        text: 'The simple picture of a controller is one program executed top to bottom in a loop. Small controllers still work that way, and it is fine for a lift station. But a program that handles a plant has logic that must run every 10 milliseconds beside logic that would be happy running every second, and running all of it at the rate the fastest piece needs wastes the processor. Tasks are how the controller runs different parts of the program at different rates with different urgency.',
      },
      { t: 'h2', text: 'The three kinds' },
      {
        t: 'dl',
        items: [
          { term: 'Continuous', def: 'Runs the programs assigned to it repeatedly, restarting as soon as it finishes, in whatever processor time the other tasks leave. Its scan time is whatever it happens to be, and it changes with communication load and with what the periodic tasks are doing. Most sequencing, interlocking, alarming, and general logic lives here.' },
          { term: 'Periodic', def: 'Runs at a fixed interval, 10 ms, 100 ms, 1 s, at a set priority. When the interval elapses, the controller suspends whatever lower-priority task is running, executes the periodic task, and resumes. Its logic sees a constant time between executions, which is what a PID instruction, a rate calculation, or a totalizer needs.' },
          { term: 'Event', def: 'Runs when a trigger occurs: a change of state on a designated input module, a consumed tag arriving from another controller, a motion event, or an instruction in another task. It is how the controller reacts to something within microseconds of it happening rather than at the next scan.' },
        ],
      },
      {
        t: 'p',
        text: 'The names and the details vary by platform. One vendor calls them tasks with programs inside them; another has a cyclic main block and cyclic interrupt blocks at fixed intervals; a third has a single scan with a high-speed interrupt routine. The behavior is the same everywhere: some logic runs on a fixed clock with priority, and the rest runs in the gaps.',
      },
      { t: 'h2', text: 'Priority and preemption' },
      {
        t: 'p',
        text: 'Each periodic and event task has a priority. A higher priority task interrupts a lower one wherever it is, even in the middle of a rung, runs to completion, and hands the processor back. Two tasks at the same priority take turns. The continuous task has the lowest priority of all. The practical rule is that the fastest task gets the highest priority, so that a 10 ms task is never held up by a 500 ms task that happened to be running.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Preemption can split a data update',
        text: 'A periodic task that interrupts the continuous task halfway through writing a structure sees half of the new values and half of the old. Where two tasks share data, copy it in one instruction at a defined point, or pass it through a single tag written atomically, so that a reader never sees a torn value.',
      },
      { t: 'h2', text: 'What goes where' },
      {
        t: 'table',
        caption: 'Assigning logic to tasks',
        head: ['Logic', 'Task', 'Why'],
        rows: [
          ['PID loops', 'Periodic, at the loop update rate', 'The integral and derivative terms assume a constant time step'],
          ['Flow totalizing and rate calculations', 'Periodic', 'A total accumulated on a variable scan is wrong by the scan variation'],
          ['High-speed counting or pulse handling', 'Event or fast periodic', 'A pulse shorter than the continuous scan is missed'],
          ['Sequencing, interlocks, alarms', 'Continuous', 'Tens of milliseconds of variation do not matter'],
          ['Communication and SCADA handling', 'Continuous or slow periodic', 'Neither fast nor time critical'],
          ['Safety-related logic', 'Not in the standard controller', 'A safety function belongs in a safety-rated controller or a hardwired circuit'],
        ],
      },
      { t: 'h2', text: 'Overlap and overrun' },
      {
        t: 'p',
        text: 'A periodic task that takes longer to execute than its interval has overrun: the next execution is due before this one has finished. The controller flags it, on most platforms as a task overlap counter, and depending on configuration either skips an execution or faults. An overrun is a design error: the task has too much logic for its interval, or a higher priority task is starving it. The fix is to move logic out of the task, lengthen its interval, or reconsider the priorities, and the task overlap counter is the diagnostic to watch after any change.',
      },
      {
        t: 'p',
        text: 'All the tasks together have to fit in the processor. If periodic tasks consume most of the available time, the continuous task starves, its scan time stretches to seconds, and the plant slows down without anything faulting. The controller reports the time consumed by each task, and keeping the total well under the capacity is part of the design.',
      },
      { t: 'h2', text: 'Watchdogs per task' },
      {
        t: 'p',
        text: 'Each task has its own watchdog, a maximum execution time after which the controller faults. The default is generous for the continuous task and tighter for periodic ones. A watchdog fault names the task, which is the first clue to where a loop or a blocking instruction lives. The watchdog page covers it.',
      },
    ],
    faqs: [
      {
        q: 'Should I put my PID loop in a periodic task?',
        a: 'Yes. The integral and derivative calculations assume a constant time between executions. In the continuous task that time varies with load, and the loop behaves differently on a busy scan than a quiet one. A periodic task at the loop update rate gives it the constant step it assumes.',
      },
      {
        q: 'What rate should a periodic task run at?',
        a: 'As slow as the logic in it allows. A pressure loop might need 50 to 100 ms; a level loop is fine at one second. Faster rates consume processor time and leave less for everything else.',
      },
      {
        q: 'What happens if a periodic task overruns?',
        a: 'The controller records an overlap, and skips or delays the next execution. It is a design error: too much logic for the interval, or starvation by a higher priority task. Move logic out or lengthen the interval.',
      },
      {
        q: 'Can safety logic go in a fast periodic task?',
        a: 'Speed is not the issue; integrity is. Logic that protects people belongs in a safety-rated controller or a hardwired circuit, where a single fault cannot defeat it, not in a task of the standard controller, however fast.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/controls/plc-systems/analog-control/pid',
      '/controls/plc-systems/programming/program-organization',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/watchdog',
    kind: 'reference',
    title: 'The Watchdog Timer',
    summary:
      'What the scan watchdog protects against, why it faults the controller instead of pausing it, what makes a scan run long, and why raising the limit is the wrong first response.',
    answer:
      'The watchdog is a timer the controller resets every scan. If a scan takes longer than the watchdog limit the timer expires and the controller faults, because a scan that has not finished is a controller that is not controlling. The usual causes are a loop that does not exit, a very large instruction, or a task starved by higher priority work. The right response is to find what made the scan long, not to lengthen the limit until the fault goes away.',
    keyPoints: [
      'A scan that overruns leaves outputs unwritten and inputs unread; the watchdog turns that silent condition into a fault.',
      'The limit is per task, defaults to hundreds of milliseconds, and should be set a little above the worst real scan time.',
      'Loops that iterate on data, large copies, string handling, and blocking instructions are the usual culprits.',
      'A watchdog fault names the task, and the maximum scan time diagnostic shows how close normal operation runs.',
      'A hardware watchdog inside the processor covers the firmware itself; the scan watchdog covers the program.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 6,
    tags: ['PLC', 'Fundamentals', 'Programming', 'Troubleshooting'],
    blocks: [
      { t: 'h2', text: 'Why a slow scan is dangerous' },
      {
        t: 'p',
        text: 'The controller writes outputs at the end of the scan and reads inputs at the start. While a scan is running, the outputs hold whatever the previous scan set them to and the inputs are ignored. A scan that takes a second instead of twenty milliseconds is a controller that has, for that second, stopped responding to the plant while giving every appearance of running. A scan that never finishes is a controller that has stopped entirely with its outputs frozen in mid-state. The watchdog exists so that neither condition can persist silently.',
      },
      { t: 'h2', text: 'How it works' },
      {
        t: 'p',
        text: 'The watchdog is a countdown timer set to a configured limit. The controller reloads it at the start of every scan, or every execution of a task on platforms with tasks. If the scan finishes, the timer is reloaded before it expires and nothing happens. If the scan is still running when the timer reaches zero, the controller declares a major fault, stops executing, drives outputs to their configured fault state, and records a watchdog fault against the task. The response is deliberate: a faulted controller with outputs in a known state is safer than a running controller nobody can trust.',
      },
      { t: 'h2', text: 'What makes a scan run long' },
      {
        t: 'ul',
        items: [
          'A loop in logic that does not exit: a backward jump whose exit condition never becomes true, or a FOR loop over an array whose length was set wrong.',
          'A very large instruction: a copy or a fill over a big array, a search through a long table, or string manipulation on every scan.',
          'A communication instruction that blocks rather than running in the background, on platforms where that is possible.',
          'A subroutine called far more often than intended, from inside a loop or from multiple places.',
          'Starvation: higher priority periodic tasks consuming most of the processor, so the continuous task barely runs and its scan stretches.',
          'A one-time event, a large data transfer or a program upload, that coincides with a heavy scan and pushes it over the limit once.',
        ],
      },
      { t: 'h2', text: 'Setting the limit' },
      {
        t: 'p',
        text: 'The controller reports the last and the maximum scan time of each task. Set the watchdog somewhat above the observed maximum under real conditions, with communications active and SCADA connected, so that normal variation never trips it and a genuine runaway trips it quickly. A limit of several seconds on a task that normally scans in twenty milliseconds means a runaway runs the plant blind for seconds before the fault. A limit one millisecond above the maximum trips on the first busy day.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Raising the watchdog to clear a fault hides the fault',
        text: 'A watchdog fault means the scan took longer than it should. Doubling the limit makes the fault go away and leaves the slow scan in place, where it delays every output and every alarm on every scan. Find the cause, fix it, and then set the limit from the corrected maximum.',
      },
      { t: 'h2', text: 'Finding the cause' },
      {
        t: 'steps',
        items: [
          { title: 'Read the fault.', text: 'It names the task and, on most platforms, records the scan time that tripped it. Note both.' },
          { title: 'Look at what changed.', text: 'A watchdog fault on a program that ran for years follows a change: an online edit, a new routine, a data array grown, a new SCADA client polling hard.' },
          { title: 'Check the maximum scan time.', text: 'If the maximum sits close to the limit in normal running, the program is heavy and the fault is a matter of time. If the maximum is far below the limit, something specific ran away.' },
          { title: 'Search for loops and large instructions.', text: 'Backward jumps, FOR loops, copies, searches, and string operations. Ask of each whether its size is bounded and whether it needs to run every scan.' },
          { title: 'Check the task load.', text: 'On a multitask controller, look at how much processor time the periodic tasks consume. A continuous task that gets ten percent of the processor scans slowly however small it is.' },
        ],
      },
      { t: 'h2', text: 'The other watchdog' },
      {
        t: 'p',
        text: 'Inside the processor there is a second, hardware watchdog that the firmware itself must service. If the firmware hangs, the hardware watchdog resets or faults the processor. It has no user setting and it is the reason a controller that has crashed completely still ends up in a defined fault state rather than a frozen one. When a processor faults with a hardware or firmware fault code and no program cause can be found, it is that watchdog that fired, and the processor is usually the problem.',
      },
    ],
    faqs: [
      {
        q: 'What does a watchdog fault mean?',
        a: 'A task took longer to execute than its configured limit, and the controller faulted rather than continue with outputs unwritten. The fault names the task. Look for a loop, a large instruction, or starvation by higher priority tasks.',
      },
      {
        q: 'Can I just increase the watchdog time?',
        a: 'You can, and it will clear the fault, and the slow scan that caused it will still be there delaying every output. Find and fix the cause first. Then set the limit from the corrected maximum scan time with some margin.',
      },
      {
        q: 'What is a reasonable watchdog setting?',
        a: 'A modest margin above the maximum scan time observed under full load. The default of a few hundred milliseconds on most platforms is reasonable for a continuous task that scans in tens of milliseconds. Periodic tasks get a limit related to their interval.',
      },
      {
        q: 'Why did the watchdog trip once and never again?',
        a: 'A one-time event, a large data transfer, an upload, or a burst of communication, coincided with a heavy scan. If the maximum scan time in normal running is close to the limit, it will happen again; if not, note it and watch the maximum.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/controls/plc-systems/plc-fundamentals/cpu',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
    ],
  },
  {
    path: '/controls/plc-systems/plc-fundamentals/retentive-memory',
    kind: 'reference',
    title: 'Retentive Memory',
    summary:
      'What survives a power cycle in a controller and what does not, how retention is backed up by battery, capacitor, or nonvolatile storage, what should be retentive, and how retained data gets lost.',
    answer:
      'Retentive memory is the data that keeps its value through a power cycle: setpoints, totals, run hours, and the state of anything that must resume where it left off. Whether a given tag is retentive depends on the platform, and what protects the retained data depends on the hardware: a lithium battery, an energy storage capacitor, or nonvolatile memory. The two failures that matter are a backup that has silently died, and a restore from a stale copy that quietly overwrites months of changes.',
    keyPoints: [
      'Platforms differ on what is retentive by default; find out for yours rather than assuming.',
      'A battery lasts a few years and warns before it dies; a capacitor module lasts the life of the controller but holds data only for days; a nonvolatile card holds it indefinitely.',
      'Setpoints, totalizers, run hours, and alternation state should be retentive; step numbers, commands in progress, and timers usually should not.',
      'A download loads the tag values saved in the project and overwrites what the controller had; upload first.',
      'First-scan logic decides what the plant does on power-up, and it should be written, not assumed.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Fundamentals', 'Programming'],
    blocks: [
      { t: 'h2', text: 'What is retained' },
      {
        t: 'p',
        text: 'The controller has the program and it has the data table, and at power-up it needs both. The program is held in nonvolatile memory or restored from a card on every platform. The data is another matter. Some platforms retain the entire data table, so every tag comes back with the value it had. Some retain only areas or files marked retentive, and everything else returns to zero. Some retain timers and counters only if a retentive instruction was used. The platform manual states the rule, and it is different enough between vendors that assuming it from a previous project is how a plant comes up with every setpoint at zero.',
      },
      { t: 'h2', text: 'What protects it' },
      {
        t: 'dl',
        items: [
          { term: 'Lithium battery', def: 'Holds up the memory when power is off. Lasts two to five years depending on the controller and how much of that time it spends without power. The controller warns when it is low, on a status light and in a status bit, and the warning is the most ignored indicator in the industry. Replace on a schedule, and replace with the controller powered so the memory is held during the swap.' },
          { term: 'Energy storage module', def: 'A capacitor bank that charges while the controller runs and powers the memory long enough to write it to nonvolatile storage when power fails. No maintenance and no replacement, at the cost of holding data only for days to weeks if the controller is left unpowered, and a module that has aged holds less.' },
          { term: 'Nonvolatile memory card', def: 'A removable card holding a copy of the program and, optionally, the data table. The controller can be set to load from it on power-up, on a corrupt memory, or never. It is the only protection that survives indefinitely without power, and it is also the one that can restore a copy months out of date.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A card set to load on power-up restores the day it was written',
        text: 'If the card was written at commissioning and the controller loads from it after a power cycle, every setpoint changed since commissioning is gone and every online edit since then is gone, and the plant runs on the commissioning program. Either rewrite the card after every change, or set it to load only when the memory is actually lost, and know which it is.',
      },
      { t: 'h2', text: 'What should be retentive' },
      {
        t: 'table',
        caption: 'Deciding what survives a power cycle',
        head: ['Data', 'Retentive?', 'Reason'],
        rows: [
          ['Setpoints and tuning constants', 'Yes', 'They are the configuration of the plant and re-entering them is slow and error prone'],
          ['Totalizers and run hours', 'Yes', 'A total that resets on every power cycle is not a total'],
          ['Lead and lag alternation state', 'Yes', 'Otherwise the same pump is lead after every outage'],
          ['Alarm acknowledgment and shelving', 'Usually', 'An operator who acknowledged an alarm should not have to do it again'],
          ['Sequence step number', 'Usually not', 'Resuming in the middle of a step with equipment in an unknown physical state is dangerous; restart from a safe step'],
          ['Commands in progress', 'No', 'A start command retained through an outage starts the pump on power-up with nobody expecting it'],
          ['Timers', 'Rarely', 'A retained timer resumes counting time that did not pass; make the decision per timer'],
          ['Hand-off-auto selections from the HMI', 'Decide', 'Retaining auto restarts the plant automatically on power-up; retaining off leaves it down until someone arrives; the narrative says which'],
        ],
      },
      { t: 'h2', text: 'First scan' },
      {
        t: 'p',
        text: 'Every controller exposes a first-scan bit, true for the first scan after power-up or after a transition to run. The logic that runs on it decides what the plant does: clear the commands in progress, reset the sequence to its safe step, validate the retained setpoints against their ranges, and decide whether equipment that was in auto restarts. Left unwritten, the plant does whatever the retained bits happen to say, which was correct at the moment the power failed and may not be correct ten minutes later with the wet well full and the operator on the road.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Automatic restart is a decision',
        text: 'Equipment that restarts on power-up without a person present can start with someone working on it, or start a sequence that expects conditions that no longer hold. Decide, per piece of equipment, whether it restarts automatically, and where the answer is yes, make sure the interlocks and the physical lockout procedures assume it will.',
      },
      { t: 'h2', text: 'How retained data gets lost' },
      {
        t: 'ul',
        items: [
          'The battery died, quietly, and the next power cycle found nothing to retain. The low battery indicator had been lit for months.',
          'The controller sat unpowered on a shelf or in a de-energized panel long enough for the energy storage module to discharge.',
          'A download loaded the project, and the project carried the tag values from the day it was saved, replacing the current ones.',
          'A memory card set to load on power-up restored an old copy.',
          'A firmware update or a processor replacement cleared the memory, and nobody had uploaded a current copy first.',
          'The tags were never retentive on a platform that requires them to be marked, and this was the first power cycle since commissioning.',
        ],
      },
      { t: 'h2', text: 'Keeping a copy' },
      {
        t: 'p',
        text: 'The defence against every one of those is a current copy: an upload from the running controller, including the data table, taken on a schedule and after every change, stored somewhere that is not in the panel. Setpoints can additionally be held in SCADA and written back to the controller on first scan, so that a controller that comes up with zeros gets its configuration back from the host. Both are cheap. Re-commissioning a plant from memory is not.',
      },
    ],
    faqs: [
      {
        q: 'What does retentive mean in a PLC?',
        a: 'That the value survives a power cycle. On some platforms every tag is retentive; on others only marked areas, files, or instructions are. The rest return to zero on power-up.',
      },
      {
        q: 'How long does a PLC battery last?',
        a: 'Two to five years depending on the model and how long the controller spends unpowered. The controller warns when it is low. Replace it on a schedule and with the controller powered, so the memory is held during the change.',
      },
      {
        q: 'Why did all my setpoints reset to zero?',
        a: 'The retention backup failed, a battery or a discharged energy storage module, or a download or a memory card restore replaced the current values with saved ones. Restore from the last upload, and then find out which happened so it does not recur.',
      },
      {
        q: 'Should the plant restart automatically after a power outage?',
        a: 'That is a decision per piece of equipment, written into the control narrative. Pumps in a lift station usually should. A chemical feed or a sequence that assumes a starting condition usually should not without checks. Either way, the first-scan logic implements the decision explicitly.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/memory',
      '/controls/plc-systems/plc-fundamentals/cpu',
      '/troubleshooting/plc-troubleshooting/retentive-data-lost',
      '/troubleshooting/plc-troubleshooting/program-will-not-download',
      '/controls/plc-systems/plc-fundamentals/power-supplies',
    ],
  },
  {
    path: '/controls/plc-systems/programming/iec-61131-3',
    kind: 'reference',
    title: 'IEC 61131-3',
    summary:
      'The standard behind PLC programming languages: the five languages, the common elements of data types, variables, and program organization units, what conformance actually means, and how the standard shows up in real platforms.',
    answer:
      'IEC 61131-3 is the international standard for programmable controller programming languages. It defines five languages: ladder diagram, function block diagram, structured text, instruction list, and sequential function chart, plus a common model of data types, variables, and program organization units (programs, function blocks, and functions) that all five share. Most modern controllers implement the standard to some degree, but conformance is partial and dialects differ, so a program does not move between vendors without work.',
    keyPoints: [
      'Five languages, one data model. Mix them within a project; pick each by the job.',
      'Program organization units: programs, function blocks with state, and functions without.',
      'Typed variables with declared scope replace raw addresses.',
      'Conformance is partial on nearly every platform, and dialects differ. Portability is a goal, not a fact.',
      'The standard is why a function block written well once can be reused across a plant.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Programming', 'Standards', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'What the standard covers' },
      {
        t: 'p',
        text: 'IEC 61131 is a family of standards for programmable controllers, and part 3 is the one programmers meet. First published in 1993 and revised since, it standardized what had been a different language on every controller: the syntax and semantics of the programming languages, the data types a program can declare, how variables are scoped and how they persist, and how a program is organized into reusable units. Its purpose was to let a programmer trained on one platform read another, and to let well-built code be reused.',
      },
      {
        t: 'p',
        text: 'What it does not cover is the hardware, the I/O addressing conventions, the communication protocols, or the engineering software. Those remain vendor territory, which is why two conformant controllers can still feel very different to work on.',
      },
      { t: 'h2', text: 'The five languages' },
      {
        t: 'table',
        head: ['Language', 'Form', 'Best for', 'Weak at'],
        rows: [
          ['Ladder Diagram (LD)', 'Graphical; rungs of contacts and coils resembling relay logic', 'Discrete interlocks, motor control, anything an electrician will troubleshoot online', 'Arithmetic, string handling, loops, and anything with more than a few branches'],
          ['Function Block Diagram (FBD)', 'Graphical; blocks with inputs and outputs wired together', 'Analog signal processing, PID loops, and data flow that reads left to right', 'Sequences and conditional branching'],
          ['Structured Text (ST)', 'Text; a Pascal-like language with IF, CASE, FOR, and assignments', 'Calculations, data manipulation, algorithms, state machines, anything with loops', 'Online troubleshooting by people who do not read code; discrete logic that is clearer as rungs'],
          ['Sequential Function Chart (SFC)', 'Graphical; steps and transitions', 'Batch and startup sequences with clearly defined states', 'Continuous control; sequences with many parallel branches become hard to follow'],
          ['Instruction List (IL)', 'Text; an assembler-like list of instructions', 'Very small controllers and legacy code', 'Readability. Deprecated in the third edition of the standard'],
        ],
      },
      {
        t: 'p',
        text: 'A project mixes them. A typical water plant program has ladder for the motor and valve control, function blocks or structured text for the analog processing and PID, structured text for the calculations and the more involved logic, and SFC where a real sequence exists. Choosing one language for everything, in either direction, makes some part of the program harder to read than it needs to be.',
      },
      { t: 'h2', text: 'The common elements' },
      {
        t: 'dl',
        items: [
          { term: 'Data types', def: 'BOOL, INT and DINT, REAL and LREAL, TIME, STRING, and the rest, with defined sizes and behavior. Derived types let a programmer declare a structure, an array, or an enumeration, so a pump can be one variable with all its members rather than forty separate tags.' },
          { term: 'Variables', def: 'Declared with a type and a scope: local to a unit, global to the project, or mapped to an input or output. The standard includes attributes for retentive variables that survive a power cycle and constants that cannot be written.' },
          { term: 'Programs', def: 'The top-level units, assigned to tasks and executed by the scheduler. A program owns its variables and calls function blocks and functions.' },
          { term: 'Function blocks', def: 'Units with internal state: a timer, a PID controller, a pump control block. Each instance keeps its own data, so one block definition serves every pump in the plant. Function blocks are the standard mechanism for reuse.' },
          { term: 'Functions', def: 'Units without state that return a value from their inputs, like a scaling function or a square root. Same inputs, same output, every time.' },
          { term: 'Tasks', def: 'Execution containers with a cycle time or a trigger, to which programs are assigned. The standard defines periodic and event tasks and priorities among them.' },
        ],
      },
      { t: 'h2', text: 'What conformance means' },
      {
        t: 'p',
        text: 'The standard defines a conformance model in which a vendor declares which features are implemented. Nearly every platform implements a subset and adds extensions, and the same feature can differ in detail: how a retentive variable is declared, what a timer instruction is called, how an array is indexed. A program written in structured text on one platform is much easier to move to another than a ladder program was in 1990, but it still needs editing, and the I/O mapping and communication configuration are rewritten from scratch.',
      },
      {
        t: 'p',
        text: 'Some platforms that predate the standard wrap it around an older model. Others were designed to it. A useful test is whether the platform lets you write a function block with a structured input, instantiate it a hundred times, and pass the structures around; that capability is what the standard was for, and it is where the differences between platforms show.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'PLCopen',
        text: 'PLCopen is the industry association that promotes the standard and publishes companion specifications: motion control function blocks, safety function blocks, an XML exchange format for programs, and guidance on structuring code. Its coding guidelines are a good starting point for a site programming standard.',
      },
      { t: 'h2', text: 'Why it matters for a utility' },
      {
        t: 'p',
        text: 'A utility rarely chooses a controller for its language conformance. The standard matters for a practical reason: a program written in the style the standard encourages, with typed variables, function blocks for each equipment type, and a program organization someone else can follow, costs less to maintain for twenty years than one written as thousands of rungs on raw addresses. The standard gives that style a vocabulary and a set of tools. Whether the integrator uses them is a specification question, and worth asking.',
      },
    ],
    faqs: [
      {
        q: 'Which language should I learn first?',
        a: 'Ladder, because it is what the installed base is written in and what most troubleshooting is done in. Structured text second, because it is where the calculations and the more capable logic live, and it transfers between platforms most easily. The other three are learned when a project needs them.',
      },
      {
        q: 'Is ladder logic obsolete?',
        a: 'No. It remains the best language for discrete control that maintenance staff troubleshoot online, because the state of every contact is visible in place. It is a poor language for arithmetic and data handling, and programs that force those into ladder are the ones that give it a bad name.',
      },
      {
        q: 'Can I move a program from one vendor to another?',
        a: 'Not without rewriting. Structured text and the logic structure move with editing; the I/O configuration, communications, and vendor-specific instructions are rebuilt. The PLCopen XML format helps with some tools, but the honest expectation is a re-implementation informed by the original.',
      },
      {
        q: 'Does the standard say anything about how to structure a program?',
        a: 'It provides the mechanisms, not the rules. Program organization, naming, and the discipline of one function block per equipment type are site standards, and the PLCopen guidelines are a good source for them.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/programming/structured-text',
      '/controls/plc-systems/programming/function-block-diagram',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/controls/plc-systems/plc-fundamentals/memory',
      '/controls/plc-systems/programming/state-machines',
    ],
  },
  {
    path: '/controls/plc-systems/programming/structured-text',
    kind: 'reference',
    title: 'Structured Text',
    summary:
      'The text language of IEC 61131-3: syntax, control structures, how it fits alongside ladder, the conventions that keep it readable for the next person, and the mistakes that make structured text a liability in a plant that troubleshoots online.',
    answer:
      'Structured text is the high-level text language defined by IEC 61131-3. It has assignments, IF and CASE branches, FOR and WHILE loops, and calls to functions and function blocks, and it is the right language for calculations, data handling, and logic with many conditions. It is harder to troubleshoot online than ladder, so in a water or wastewater program it is best used inside well-named function blocks that ladder calls, not as a replacement for the ladder an electrician expects to see.',
    keyPoints: [
      'Use it for arithmetic, data handling, state machines, and anything with a loop.',
      'Keep discrete motor and valve control in ladder where it is troubleshot online.',
      'One statement per line, named constants, and comments that say why, not what.',
      'Every IF that writes an output has an ELSE that writes it too, or the output holds its last value forever.',
      'A loop that can run long stalls the scan. Bound every loop.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['PLC', 'Programming', 'Standards'],
    blocks: [
      { t: 'h2', text: 'What it looks like' },
      {
        t: 'p',
        text: 'Structured text reads like Pascal. Statements end in semicolons, assignment is a colon-equals, comparisons produce booleans, and blocks are delimited by keywords rather than braces. The example computes a scaled analog value with clamping and a validity flag, which in ladder would take a dozen rungs and in structured text takes a dozen lines that read top to bottom.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Scaling with validity, in structured text',
        code: `(* Scale a 4-20 mA input to engineering units, with range checks. *)
Raw_Span := Raw_Max - Raw_Min;
IF Raw_Span > 0 THEN
    Level_ft := (Raw - Raw_Min) / Raw_Span * (EU_Max - EU_Min) + EU_Min;
ELSE
    Level_ft := EU_Min;            (* bad configuration: do not divide by zero *)
END_IF;

(* Under-range and over-range flags, with a small margin for calibration error. *)
Level_Under := Raw < (Raw_Min - Raw_Margin);
Level_Over  := Raw > (Raw_Max + Raw_Margin);
Level_OK    := NOT Level_Under AND NOT Level_Over AND Input_Card_OK;

(* Clamp the scaled value, but never let a clamped value look valid. *)
IF Level_ft < EU_Min THEN Level_ft := EU_Min; END_IF;
IF Level_ft > EU_Max THEN Level_ft := EU_Max; END_IF;`,
      },
      {
        t: 'p',
        text: 'Every element of the language is visible: comments in parentheses and asterisks, assignment, arithmetic, IF with ELSE, comparisons producing booleans, and named variables in place of addresses.',
      },
      { t: 'h2', text: 'Control structures' },
      {
        t: 'table',
        head: ['Structure', 'Use', 'Caution'],
        rows: [
          ['IF ... ELSIF ... ELSE ... END_IF', 'Conditional assignment', 'Without an ELSE, an output assigned only in the IF branch keeps its last value when the condition is false. Sometimes that is intended; usually it is a bug.'],
          ['CASE ... OF ... END_CASE', 'Selection on an integer or enumeration; the natural form of a state machine', 'Include an ELSE branch that handles an unexpected value, and write the state to a monitored tag.'],
          ['FOR ... TO ... DO ... END_FOR', 'Iterate over an array: scan all pumps, all zones, all alarms', 'The loop runs to completion inside one scan. A large or nested loop extends the scan time; a FOR loop in a fast task is a watchdog risk.'],
          ['WHILE ... DO ... END_WHILE and REPEAT ... UNTIL', 'Loop until a condition', 'A condition that never becomes true stalls the scan and trips the watchdog. Bound them with a counter, or avoid them in controller code.'],
          ['Function and function block calls', 'Call a scaling function, a PID block, a pump control block', 'Function block instances must be declared; calling one changes its stored state.'],
        ],
      },
      { t: 'h2', text: 'Where it belongs in a plant program' },
      {
        t: 'p',
        text: 'The question in a water or wastewater plant is not whether structured text is a good language; it is who will be standing in front of the panel at 2 a.m. An operator or an electrician troubleshooting online reads ladder: they see the contacts, the coils, and their states. Structured text shows them a page of code with values in the margin. That does not make structured text wrong; it makes it the wrong place for the logic they need to see.',
      },
      {
        t: 'ul',
        items: [
          'Discrete control of motors, valves, and interlocks in ladder, calling function blocks whose internals may be structured text.',
          'Analog scaling, validation, filtering, totalizing, and calculations in structured text inside function blocks.',
          'State machines and sequences in structured text with a CASE statement, with the current state and step description written to tags the HMI shows.',
          'Loops over arrays of equipment in structured text, never in ladder.',
          'Communication message handling, string building, and data packing in structured text.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Expose the state, not the code',
        text: 'A structured text block is opaque to the person at the panel unless it publishes what it is doing. Every block should write its current state, its active step, and the reason for any hold to tags with clear names, so the HMI and the online monitor show the answer without reading the code.',
      },
      { t: 'h2', text: 'Conventions that keep it maintainable' },
      {
        t: 'ol',
        items: [
          'One statement per line. A line with three assignments hides two of them.',
          'Named constants for every number that is not zero or one. A 0.85 in the middle of a calculation is a question nobody can answer in five years.',
          'Comments that explain intent and units. The code already says what it does.',
          'Consistent naming: prefix by equipment, suffix by type, no abbreviations that only the author understands.',
          'Every IF that writes an output has an ELSE that writes it too, unless the hold is deliberate and commented.',
          'No magic addresses. Every variable is declared with a type and a meaning; the I/O mapping is in one place.',
          'Short blocks. A block longer than a screen is two blocks.',
          'Unit tests where the platform allows simulation, and at minimum a documented set of input cases with expected outputs.',
        ],
      },
      { t: 'h2', text: 'Common mistakes' },
      {
        t: 'table',
        head: ['Mistake', 'Effect', 'Fix'],
        rows: [
          ['Output assigned only inside an IF', 'Output sticks at last value when the condition ends', 'Add the ELSE, or assign a default before the IF'],
          ['Integer division', 'Fractions truncated silently; 7 / 2 = 3', 'Convert to REAL before dividing'],
          ['Comparing REALs for equality', 'Almost never true', 'Compare against a tolerance'],
          ['Unbounded WHILE', 'Scan stalls; watchdog fault', 'Use FOR with a fixed bound, or a counter guard'],
          ['State held in a local variable that is not retentive', 'State resets on power cycle', 'Declare it retentive, or reinitialize deliberately on first scan'],
          ['Same output written from two places', 'Last write wins, and the first is invisible', 'One owner per output'],
          ['Logic that the HMI also does', 'Two behaviors that drift apart', 'Logic in the controller, display in the HMI'],
        ],
      },
    ],
    faqs: [
      {
        q: 'Is structured text faster than ladder?',
        a: 'Execution speed is similar on most platforms; the compiler produces comparable code. Structured text is faster to write for calculations and slower to troubleshoot for discrete logic. Choose by readability for the person who will maintain it, not by execution speed.',
      },
      {
        q: 'Can I write the whole program in structured text?',
        a: 'You can, and some integrators do. In a utility where operators and electricians troubleshoot online, an all-text program is a maintenance problem they will resent for the life of the plant. Keep the discrete control they look at in ladder.',
      },
      {
        q: 'How do I troubleshoot structured text online?',
        a: 'Most platforms show live values beside each variable and let you set a breakpoint or a watch. The better answer is to write the block so it publishes its state, step, and hold reasons to tags, and to troubleshoot from those on the HMI or the tag monitor.',
      },
      {
        q: 'Does structured text move between platforms?',
        a: 'Better than any other language in the standard. The core syntax is the same; timers, function block declarations, and vendor extensions differ. Expect editing, not a rewrite.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/iec-61131-3',
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/programming/state-machines',
      '/controls/plc-systems/analog-control/scaling',
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
    ],
  },
  {
    path: '/controls/plc-systems/programming/function-block-diagram',
    kind: 'reference',
    title: 'Function Block Diagram',
    summary:
      'The graphical data-flow language of IEC 61131-3: how blocks, pins, and wires work, execution order, where FBD beats ladder and structured text, building reusable equipment blocks, and the habits that keep a diagram readable.',
    answer:
      'Function block diagram is a graphical language in which blocks with input and output pins are wired together so that data flows from left to right. It is the natural language for analog signal processing, PID control, and any logic that reads as a chain of operations, and it is the usual host for reusable equipment blocks such as a pump or valve controller. Its weaknesses are sequences and branching, which are clearer in structured text or a sequential function chart.',
    keyPoints: [
      'Data flows left to right through wired blocks. Read a diagram the way the signal travels.',
      'Execution order follows the wiring, and feedback paths need an explicit rule.',
      'FBD is where analog processing, PID, and reusable equipment blocks live.',
      'A user-defined function block with a structured interface is the reuse mechanism.',
      'Keep one idea per sheet. A diagram that needs scrolling in two directions is two diagrams.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Programming', 'Standards', 'Analog'],
    blocks: [
      { t: 'h2', text: 'How it works' },
      {
        t: 'p',
        text: 'A function block diagram is a set of blocks, each with named input pins on the left and output pins on the right, connected by wires that carry values. A block executes when its inputs are available and produces its outputs; the next block along the wire consumes them. The diagram reads like a signal path: the raw input enters at the left, passes through scaling, filtering, and validation, feeds a PID controller, and leaves as a speed reference at the right.',
      },
      {
        t: 'p',
        text: 'Blocks can be standard instructions supplied by the platform, such as a timer, a comparator, or a PID, or user-defined function blocks written in any IEC language. A wire can carry any data type, including a structure, which is how a whole pump status travels from block to block as one connection.',
      },
      { t: 'h2', text: 'Execution order' },
      {
        t: 'p',
        text: 'In a text language the order of statements is explicit. In a diagram it is implied by the wiring, and the platform resolves it: blocks execute in an order that ensures each has its inputs before it runs, generally left to right and top to bottom where the wiring allows. That works until the diagram has a feedback loop, where the output of a block feeds back to an input of an earlier block. Then some value must come from the previous scan, and the platform either requires a marker on the feedback wire or picks one silently.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Mark every feedback wire',
        text: 'A feedback connection that the platform resolves silently can change execution order when a block is added elsewhere on the sheet, and the diagram behaves differently after an edit that looked unrelated. Where the platform provides a feedback marker or an explicit execution number, use it, and comment what the one-scan delay means for the logic.',
      },
      { t: 'h2', text: 'Where FBD fits' },
      {
        t: 'table',
        head: ['Job', 'FBD', 'Alternative'],
        rows: [
          ['Analog signal chain: scale, filter, validate, alarm', 'Excellent; the chain is visible', 'Structured text inside a block for the arithmetic'],
          ['PID control with feedforward, limits, and mode logic', 'Excellent; the PID block and its surroundings are one picture', 'A PID function block called from ladder'],
          ['Reusable equipment control: pump, valve, analyzer', 'Excellent as the host for a user-defined block', 'The same block called from ladder'],
          ['Discrete interlock chains and motor control', 'Adequate; boolean blocks work but read worse than rungs', 'Ladder'],
          ['Sequences and startup steps', 'Poor; state logic becomes a mesh of wires', 'Sequential function chart or a CASE in structured text'],
          ['Loops over arrays', 'Not possible directly', 'Structured text'],
          ['Calculations with many terms', 'Cluttered; a formula becomes a tree of blocks', 'Structured text'],
        ],
      },
      { t: 'h2', text: 'User-defined function blocks' },
      {
        t: 'p',
        text: 'The reason FBD carries so much of a modern program is the user-defined function block. A block called PumpControl is written once, with inputs for the call, the run feedback, the fault inputs, the HOA state, and the setpoints, and outputs for the run command, the status word, the alarms, and the run time. Every pump in the plant is an instance of that block, wired to its own I/O. When the failed-to-prove logic needs a change, it changes in one place and every pump gets it.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Define the interface', text: 'Inputs and outputs as structures where the platform supports it: one command structure in, one status structure out, plus the configuration parameters. A block with forty loose pins is hard to wire and harder to read.' },
          { title: 'Write the internals in the language that suits them', text: 'The interlock logic can be ladder; the timers and counters can be FBD; the state machine is structured text. The block hides which.' },
          { title: 'Publish the state', text: 'The block writes its mode, its active hold reason, its fault list, and its counters to the status structure, so the HMI faceplate and the online monitor show what it is doing without opening it.' },
          { title: 'Test it once, well', text: 'Simulate every input combination the block claims to handle, including the failure cases. That test is worth repeating on every revision, because every pump depends on it.' },
          { title: 'Version it', text: 'A block used a hundred times needs a version number in its description and a change record. A silent edit to a shared block is a change to a hundred pumps.' },
        ],
      },
      { t: 'h2', text: 'Keeping a diagram readable' },
      {
        t: 'ul',
        items: [
          'Signal enters at the left, leaves at the right, and does not double back.',
          'One idea per sheet: one loop, one pump, one analyzer. Cross-sheet connections use named tags, not wires that leave the page.',
          'Name every intermediate wire that carries something an operator or a troubleshooter would want to see. Unnamed wires cannot be trended.',
          'Align blocks in the order they execute and keep the wiring uncrossed where possible. A diagram that looks like a circuit board is not being read by anyone.',
          'Put constants in named parameters, not in literal pins scattered across the sheet.',
          'Comment the sheet with what it does and why, at the top, once.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is FBD the same as a function block?',
        a: 'No. A function block is a program organization unit with internal state, and it can be written in any of the five languages. Function block diagram is one of the languages, and it is the one most often used to wire function blocks together. The naming is confusing and the distinction matters when reading a specification.',
      },
      {
        q: 'Can I troubleshoot FBD online?',
        a: 'Yes, and it is one of its strengths for analog problems: the value on every wire is shown live, so a bad reading can be followed from the input pin through scaling and filtering to the point where it goes wrong. For discrete logic, ladder still shows the state of a contact more directly.',
      },
      {
        q: 'Why does the diagram behave differently after I added a block?',
        a: 'Execution order changed. The platform re-resolved the order when the wiring changed, and a feedback path that was reading last scan is now reading this scan, or the reverse. Mark feedback wires explicitly and check the execution numbers after any edit.',
      },
      {
        q: 'Should I build my own pump block or use the vendor library?',
        a: 'Vendor and integrator libraries exist for exactly this and are well tested. Use one where it matches the site standard and the HMI faceplates. Build your own when the library does something the site does not want, and then test it as carefully as the vendor did.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/iec-61131-3',
      '/controls/plc-systems/programming/structured-text',
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/analog-control/pid',
      '/controls/plc-systems/analog-control/signal-validation',
      '/how-to/plc-how-to/create-a-pid-loop',
    ],
  },
  {
    path: '/controls/plc-systems/programming/state-machines',
    kind: 'reference',
    title: 'State Machines in PLC Programs',
    summary:
      'Writing sequences as explicit states instead of tangled interlock chains: what a state is, how transitions are written, the pattern in structured text and in ladder, publishing the state to the HMI, and the failure handling every state machine needs.',
    answer:
      'A state machine writes a sequence as a set of named states, exactly one of which is active, with explicit transitions between them. Each state defines what the outputs do while it is active and what condition moves the machine to the next state. The pattern replaces the seal-in rungs and interlock chains that grow unmaintainable, makes the current step visible on the HMI, and forces the programmer to decide what happens on a fault, a stop, and a power loss in every state.',
    keyPoints: [
      'One state active at a time, held in one integer or enumeration.',
      'Outputs are decided by the state; transitions are decided by conditions. Keep the two apart.',
      'Every state has a way out on fault, on stop, and on timeout.',
      'Publish the state number and a description to the HMI. That is the troubleshooting tool.',
      'Decide what happens on power loss: restart, resume, or go to a safe state.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['PLC', 'Programming', 'Design', 'Control'],
    blocks: [
      { t: 'h2', text: 'The problem state machines solve' },
      {
        t: 'p',
        text: 'A backwash sequence, a generator transfer, a chemical batch, a well pump startup with its pump-to-waste period: each is a series of steps that depend on time and on conditions. Written as ladder with seal-in bits, each step is a rung that latches when the previous step is done and unlatches when its own completion is seen, plus the interlocks, plus the fault handling, plus the reset. By the twelfth step nobody can say with confidence which bits are set, and a fault mid-sequence leaves latches in a combination that was never tested.',
      },
      {
        t: 'p',
        text: 'A state machine replaces all of that with one variable, the current state, and a structure that makes each state explicit. The program can be in state 30, Combined Wash, and nothing else. What the outputs do in state 30 is written in one place. What moves the sequence to state 40 is written in one place. What happens in state 30 on a fault is written in one place. The HMI shows the number and the name.',
      },
      { t: 'h2', text: 'The structure' },
      {
        t: 'dl',
        items: [
          { term: 'State variable', def: 'An integer or enumeration, one per machine, retentive if the sequence must survive a power cycle. Numbered with gaps, 10, 20, 30, so a state can be inserted later without renumbering.' },
          { term: 'States', def: 'Each has a name, a description, and a purpose. Idle, Drain, Air Scour, Combined Wash, Rinse, Return to Service, Aborting, Fault. Idle and Fault always exist.' },
          { term: 'Outputs by state', def: 'What each output does in each state, written as a function of the state, not as a latch. In state 20 the air scour blower runs; in states where it should not, it does not. Because outputs are derived from state, they cannot be left on by a forgotten unlatch.' },
          { term: 'Transitions', def: 'The condition that moves from one state to the next: a timer expired, a level reached, a valve confirmed open, an operator acknowledgment. Written per state, and the only place the state variable is changed.' },
          { term: 'Timeouts', def: 'Each state that waits for something has a maximum time. A valve that does not confirm open in 60 seconds moves the machine to Fault, not to waiting forever.' },
          { term: 'Fault and abort paths', def: 'From any state, a fault condition goes to the Fault state, and a stop request goes to Aborting, which returns the equipment to a safe configuration and then to Idle. These transitions are written once, above the per-state logic.' },
        ],
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'A filter backwash sequence as a CASE statement',
        code: `(* Global exits: evaluated before the per-state logic, every scan. *)
IF Fault_Any THEN
    State := 900;                          (* Fault *)
ELSIF Stop_Request AND State > 0 AND State < 800 THEN
    State := 800;                          (* Aborting *)
END_IF;

CASE State OF
    0:   (* Idle *)
        IF Backwash_Request AND Permissives_OK THEN
            State := 10;  Step_Timer := T#0s;
        END_IF;

    10:  (* Close influent, drain to wash level *)
        IF Influent_Valve_Closed AND Level < Wash_Level THEN
            State := 20;  Step_Timer := T#0s;
        ELSIF Step_Timer > T#5m THEN
            State := 900;  Fault_Code := 10;
        END_IF;

    20:  (* Air scour *)
        IF Step_Timer > Air_Scour_Time THEN
            State := 30;  Step_Timer := T#0s;
        END_IF;

    30:  (* Combined air and water wash *)
        IF Step_Timer > Combined_Time THEN
            State := 40;  Step_Timer := T#0s;
        END_IF;

    40:  (* Water rinse until turbidity clears *)
        IF Wash_Turbidity < Rinse_Limit AND Step_Timer > Min_Rinse_Time THEN
            State := 50;  Step_Timer := T#0s;
        ELSIF Step_Timer > Max_Rinse_Time THEN
            State := 900;  Fault_Code := 40;
        END_IF;

    50:  (* Return to service *)
        IF Influent_Valve_Open AND Effluent_Valve_Open THEN
            State := 0;
        END_IF;

    800: (* Aborting: close wash valves, stop blower, then idle *)
        IF Wash_Valves_Closed AND NOT Blower_Running THEN
            State := 0;
        END_IF;

    900: (* Fault: hold safe until reset *)
        IF Fault_Reset AND NOT Fault_Any THEN
            State := 0;
        END_IF;
ELSE
    State := 900;  Fault_Code := 999;      (* unknown state *)
END_CASE;

(* Outputs derived from state. Nothing latches. *)
Air_Scour_Blower_Cmd := (State = 20) OR (State = 30);
Wash_Water_Valve_Cmd := (State = 30) OR (State = 40);
Influent_Valve_Cmd   := (State = 0) OR (State = 50);`,
      },
      {
        t: 'p',
        text: 'The shape is the whole lesson. Exits that apply everywhere are at the top. Each state changes the state variable and nothing else. Outputs are computed from the state at the bottom, so there is nothing to unlatch and nothing left on when the sequence leaves a state by any route. The ELSE catches a state value that should not exist, which happens after a program edit or a memory fault.',
      },
      { t: 'h2', text: 'The same pattern in ladder' },
      {
        t: 'p',
        text: 'Where the site standard requires ladder, the pattern survives. One integer holds the state. A rung per transition compares the state and the condition and moves a new value into the integer. A rung per output compares the state and drives the coil. It is more rungs than the CASE statement and it is still one variable, one place per transition, and outputs that follow the state. What it must not become is a set of seal-in bits with the state number added as decoration.',
      },
      { t: 'h2', text: 'Power loss and restart' },
      {
        t: 'p',
        text: 'The one decision a state machine forces that latch logic lets a programmer avoid is what happens on a power cycle. Three answers are common, and the control narrative picks one per sequence.',
      },
      {
        t: 'table',
        head: ['Behavior', 'How', 'Where it fits'],
        rows: [
          ['Restart from Idle', 'State variable not retentive, or first-scan logic sets it to 0', 'Sequences that are safe and cheap to start over: a pump startup, a valve exercise'],
          ['Resume where it stopped', 'State variable retentive; timers and step data retentive too', 'Long sequences where restarting wastes product or time: a batch, a long backwash; only if every state is safe to resume into'],
          ['Go to a safe state and wait', 'First-scan logic moves any active state to Aborting or a Hold state that needs an operator', 'Anything where resuming blind could be unsafe: chemical feeds, sequences with manual steps'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Test the restart on purpose',
        text: 'Cycle power in the middle of every state during commissioning, and watch what the machine does. The chosen behavior is only real if it has been seen. Retentive state with non-retentive timers, which resumes a state that then waits forever, is the classic mistake.',
      },
      { t: 'h2', text: 'Publishing the state' },
      {
        t: 'p',
        text: 'The state number is the single most useful troubleshooting tag in a sequence. Publish it, and publish a text description of the current state and the reason the machine is waiting: state 40, Rinse, waiting for turbidity below 5 NTU, 3:20 elapsed of 10:00 maximum. A sequence that says why it is waiting does not need someone to open the program. Log every state change with a timestamp to the historian; the record of when each step started and ended is the commissioning evidence and the maintenance history.',
      },
    ],
    faqs: [
      {
        q: 'Should I use a sequential function chart instead?',
        a: 'SFC is the graphical form of the same idea and some platforms implement it well. It excels at simple linear sequences and at showing the active step. It becomes hard to read with many exits and parallel branches, and online troubleshooting depends on the platform. A CASE statement in structured text is portable and explicit; SFC is a fine choice where the platform and the site are comfortable with it.',
      },
      {
        q: 'How do I handle two things happening at once?',
        a: 'Two state machines. A filter with a backwash sequence and a separate flow control loop is two machines that exchange status. Trying to express parallel activity inside one state machine produces the branching mesh that the pattern was meant to avoid.',
      },
      {
        q: 'Where do the interlocks go?',
        a: 'Permissives gate the transition out of Idle. Interlocks that must stop the sequence go into the fault condition and produce the transition to Fault from every state. Interlocks that protect a single output stay on that output, after the state logic, so an output the state calls for is still blocked when its interlock says so.',
      },
      {
        q: 'The sequence is stuck in a state. How do I find out why?',
        a: 'Read the published wait reason and the step timer. If the machine does not publish them, look at the transition condition for that state in the program and evaluate each term. The fix after the event is to add the wait reason so the next time does not need the program.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/structured-text',
      '/controls/plc-systems/programming/interlocks',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/engineering-library/control-documentation/sequences-of-operation',
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/plc-fundamentals/watchdog',
    ],
  },
  {
    path: '/controls/plc-systems/plc-troubleshooting/plc-will-not-run',
    kind: 'reference',
    title: 'PLC Will Not Run',
    summary:
      'A controller that stays in program mode, faults on every attempt to run, or will not power up: the mode switch, the major fault log, the power supply, the memory and battery, the firmware and program mismatch, and the I/O configuration errors that stop a processor, in the order that finds them.',
    answer:
      'A controller that will not run is held by its mode switch, is faulting on a condition the fault log names, has a program or firmware mismatch, has lost its program to a dead battery or memory failure, has an I/O configuration that does not match the hardware, or has a power supply problem. Read the status indicators and the fault log before anything else; they name the cause in most cases. Then check power, the keyswitch, the program integrity, the firmware, and the I/O configuration, in that order.',
    keyPoints: [
      'The fault log names the cause. Read it before resetting anything.',
      'A keyswitch in PROGRAM is the most common reason a controller does not run after service.',
      'A dead battery or a failed memory module leaves a controller with no program after a power cycle.',
      'A program built for one firmware will not run on another. Match them.',
      'An I/O module missing, wrong, or in the wrong slot faults a controller configured to require it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Troubleshooting', 'Power'],
    blocks: [
      { t: 'h2', text: 'Read the indicators' },
      {
        t: 'p',
        text: 'Every controller has a run indicator, a fault indicator, an I/O status, and a communication status on its face, and a fault log reachable from the programming software or the display. Together they say whether the controller has power, whether it has a program, whether it is trying to run, and why it stopped. Ten seconds with the indicators and the log usually replaces an hour of guessing.',
      },
      {
        t: 'table',
        head: ['Indicator state', 'Meaning', 'Look at'],
        rows: [
          ['No indicators lit', 'No power to the processor', 'Power supply output, fuses, the supply input, the chassis connections'],
          ['Power on, run off, fault off, mode PROGRAM', 'Held in program mode', 'The keyswitch; a remote mode change; a program download that ended in program mode'],
          ['Fault solid or flashing', 'A major fault stopped execution', 'The fault log: code, description, the routine and rung where it occurred'],
          ['Run on, I/O fault', 'Running with an I/O problem, or faulted on a required I/O connection', 'The I/O tree in the software: which module, what error'],
          ['Battery or memory indicator', 'Battery low or dead; the program may be lost on power loss', 'Battery date; the program presence after a power cycle'],
          ['A flashing pattern after power-up that never clears', 'Firmware or hardware fault', 'The manual pattern table; the firmware version'],
        ],
      },
      { t: 'h2', text: 'Diagnostic procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Confirm power', text: 'Measure the power supply output at the chassis or the processor terminals. Confirm the supply input and its fuse. A supply that starts and drops out under load is a supply problem, not a processor problem.' },
          { title: 'Check the keyswitch', text: 'PROGRAM holds the controller out of run and refuses a remote change. REMOTE allows the software to set the mode. RUN runs. After service the switch is often left in PROGRAM.' },
          { title: 'Read the fault log', text: 'Connect with the programming software and open the fault history. A major fault gives a type and a code: a watchdog timeout, a math fault such as a divide by zero or an array index out of range, an I/O connection fault on a required module, a program corruption, a power-up handler condition. The log points to the routine and the rung.' },
          { title: 'Clear the fault and try to run', text: 'If the fault is a one-time condition, clearing it and placing the controller in run may succeed. If it faults again immediately, the cause is persistent and the log shows the same code: fix the cause.' },
          { title: 'Check the program is present', text: 'A controller with no program after a power cycle shows no fault and no run; the software reports no project. The battery or the memory module failed, or the controller was never saved to nonvolatile memory. Load the backup, then fix the battery or the retention.' },
          { title: 'Check firmware against the program', text: 'The software reports the controller firmware revision and the revision the project was built for. A mismatch prevents download or run on most platforms. Flash the controller to the project revision, or convert the project, following the platform procedure and with a backup on hand.' },
          { title: 'Check the I/O configuration', text: 'The I/O tree shows every configured module and its status. A module missing, in a different slot, or a different catalog number than configured faults a controller that requires that connection. Match the hardware to the configuration, or change the configuration or the inhibit and required flags deliberately.' },
          { title: 'Check for a program fault that recurs', text: 'A math fault or an index fault recurs every scan until the logic is fixed. The fault log gives the rung. Fix the logic, or add a fault handler routine that catches it, clears it, and logs it, as the platform allows.' },
          { title: 'Check the watchdog', text: 'A watchdog fault means the scan exceeded the limit. A loop that does not terminate, a very large data operation, or a program grown past the watchdog setting. Fix the cause; raise the watchdog only if the scan is legitimately long.' },
          { title: 'Power cycle as a last step', text: 'After the cause is found. A power cycle before reading the log erases the evidence on some platforms.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not download to a controller you have not diagnosed',
        text: 'A controller that will not run and a laptop with a backup are a temptation. A download before the cause is known can overwrite a program that was fine, can fail on the firmware mismatch that was the actual problem, and can start a process whose I/O configuration is wrong. Diagnose, then download if the program is the cause.',
      },
      { t: 'h2', text: 'After it runs' },
      {
        t: 'ul',
        items: [
          'Confirm the outputs are what the process expects before returning the equipment to AUTO. A controller that has been down has stale retentive data and timers.',
          'Confirm the I/O tree is clean and every rack and module reports running.',
          'Confirm communications to SCADA are restored and the tags have good quality.',
          'Replace the battery if it was implicated, and record the date.',
          'Take a fresh backup, because the program in the controller is now the one that runs.',
          'Record the fault code, the cause, and the fix. Recurring faults are how a program tells you something.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The controller faults the moment I put it in run. What is it?',
        a: 'A persistent fault in the logic or the configuration: a math fault on the first scan, an I/O connection to a missing required module, or a power-up handler that faults deliberately. The fault log shows the code and the location on every attempt; fix that.',
      },
      {
        q: 'The controller ran for years and now will not run after a power outage. Why?',
        a: 'The battery or the nonvolatile memory. The program was held in battery-backed memory, the battery was dead, and the outage cleared it. Load the backup, replace the battery, and configure the controller to store the program to nonvolatile memory where the platform supports it.',
      },
      {
        q: 'Can I run the controller with a module inhibited?',
        a: 'Yes, where the platform allows a module to be inhibited or marked not required. The controller runs without that module and its points are unavailable. Do it deliberately, alarm it, and return the module to service as soon as possible; a plant running on an inhibited module is a plant with a missing set of I/O.',
      },
      {
        q: 'The fault log is empty and the controller will not run. What now?',
        a: 'Keyswitch, then program presence, then firmware. A controller with no program and no fault is waiting for a download. A controller in PROGRAM with a program and no fault is waiting for the switch.',
      },
    ],
    related: [
      '/troubleshooting/plc-troubleshooting/processor-faulted',
      '/troubleshooting/plc-troubleshooting/program-will-not-download',
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/controls/plc-systems/plc-fundamentals/memory',
      '/controls/plc-systems/plc-fundamentals/power-supplies',
      '/cybersecurity/backups/plc-program-backups',
    ],
  },
  {
    path: '/controls/plc-systems/plc-troubleshooting/i-o-not-updating',
    kind: 'reference',
    title: 'I/O Not Updating',
    summary:
      'Inputs that do not change and outputs that do not respond while the controller runs: the module and rack status, the inhibited and faulted connections, the input filter and the scan, the remote adapter link, the forced points, and the program that stopped writing the tag.',
    answer:
      'When the controller is running and a point does not update, either the module or the rack that holds it is faulted or inhibited, the point is forced, the program is no longer writing or reading the tag, the task that handles it is not executing, or the field wiring is not delivering the change. Check the I/O tree status first, then the force list, then whether the logic that touches the point is executing, then the module indicator against the terminal, and then the field.',
    keyPoints: [
      'The I/O tree in the software shows every module state. A faulted or inhibited module explains every point on it.',
      'Forces override the field and the logic. Check the force list before anything else.',
      'A point that is not updating may be a task that is not running or a routine that is not called.',
      'Compare the module indicator, the tag, and the terminal voltage. Where they disagree is the fault.',
      'Remote racks add the adapter connection to the list. Its status is a tag.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Troubleshooting', 'Communications'],
    blocks: [
      { t: 'h2', text: 'Where a point can stop' },
      {
        t: 'p',
        text: 'A discrete input passes from a field contact to a terminal, a module channel, the module data table, the controller input tag, and the logic that reads it. An output goes the other way. At each stage the value can stop being carried forward, and the diagnosis finds the stage. The fastest order is the one that checks the widest causes first: a module fault stops every point on the module, a force stops one point everywhere, and a wiring fault stops one point at the terminal.',
      },
      {
        t: 'table',
        head: ['Stage', 'What stops it', 'How to see it'],
        rows: [
          ['Module or rack', 'Faulted, inhibited, removed, or a failed adapter connection', 'The I/O tree status; the module indicators; the rack connection tag'],
          ['Force', 'A force installed on the point', 'The force list in the software; a force indicator on the controller'],
          ['Task or routine', 'The task not scheduled or the routine not called, so the logic never reads or writes the point', 'Task status; the routine with online monitoring showing no execution'],
          ['Program', 'The tag written from two places, an unconditional write, or an alias that points elsewhere', 'Cross-reference of the tag; online monitor of every write'],
          ['Module configuration', 'A filter time, a data format, or a channel disabled', 'The module properties in the I/O tree'],
          ['Terminal and field', 'Wiring, the field device, the loop power', 'Voltage at the terminal against the module indicator'],
        ],
      },
      { t: 'h2', text: 'Diagnostic procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Check the I/O tree', text: 'Online, open the controller I/O configuration. Every module shows a status: running, faulted with a code, inhibited, or not present. A faulted module explains all its points; the code says why: configuration mismatch, missing, communication lost, a channel fault on an analog module.' },
          { title: 'Check the forces', text: 'Open the force list. A forced input reads the forced value regardless of the field; a forced output holds regardless of the logic. Remove forces that should not be there, and find out who installed them.' },
          { title: 'Confirm the logic executes', text: 'Find every reference to the tag with the cross-reference tool. Open the routine online and confirm it is being scanned: the rung states update, or a scan counter increments. A routine that is not called, a task that is not scheduled, or a conditional jump that skips the section leaves the point untouched.' },
          { title: 'Check for competing writes', text: 'A tag written in two places holds the last write each scan, which can look like a point that never changes. The cross-reference shows every write; an unconditional output instruction in a later rung is the usual culprit.' },
          { title: 'Compare the indicator and the tag', text: 'For an input, the module channel indicator shows the field state; the tag should match. Indicator on, tag off: the module data is not reaching the tag, which is a module fault, a mapping error, or a task that is not updating. Indicator off with the field contact closed: the terminal or the wiring.' },
          { title: 'Measure at the terminal', text: 'Voltage at the input terminal with the field device operated. Present and the indicator off: the module channel or its common. Absent: the field wiring, the device, or the loop power.' },
          { title: 'For an output, follow it out', text: 'Tag on, module indicator on, terminal voltage present: the field. Tag on, indicator off: the module or the output enable. Tag never on: the logic.' },
          { title: 'For a remote rack, check the adapter', text: 'The connection status tag and the adapter indicators. A rack with a lost connection shows all its inputs frozen at the last value on some platforms and zero on others; the status tag says which is real.' },
          { title: 'Check the module configuration', text: 'Input filter time on a discrete module set so long that a short pulse is missed; a channel disabled; an analog channel set to the wrong range or format. Compare with the I/O list.' },
          { title: 'Fix, then verify through the chain', text: 'Operate the field device and watch the indicator, the tag, and the logic respond. Command the output and watch the tag, the indicator, and the device.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The three-point comparison',
        text: 'Module indicator, controller tag, terminal voltage. Any two that agree isolate the fault to the stage between them and the third. It takes a minute per point and it replaces most of the reasoning.',
      },
      { t: 'h2', text: 'Common causes by type' },
      {
        t: 'dl',
        items: [
          { term: 'Analog input frozen', def: 'A channel fault such as open wire or over-range that holds the last value on some modules, a module fault, or a HART or smart module in a configuration state. The channel status bits say which.' },
          { term: 'Discrete input never on', def: 'Wrong common: a sinking input wired to a sourcing device, or the module common not connected. Voltage at the terminal with no indicator is the signature.' },
          { term: 'Discrete output never on', def: 'Output power missing on the module: many output modules need a separate supply connection per group, and a blown fuse on that group kills the group.' },
          { term: 'Points on one module all frozen', def: 'The module faulted or was inhibited; on a remote rack, the adapter dropped.' },
          { term: 'Points update slowly', def: 'A remote rack with a long update interval, an input filter, or a task with a long period.' },
          { term: 'Points update, then stop after a download', def: 'The download changed the I/O configuration or the tag mapping; a module now faults on a configuration mismatch, or a tag alias moved.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'The module indicator follows the field but the tag does not. What is it?',
        a: 'The module data is not reaching the tag: a module fault that the tree shows, a mapping or alias error, a task that owns the module and is not running, or a force on the tag. The I/O tree and the force list answer it in a minute.',
      },
      {
        q: 'Everything on one remote rack froze at once. Why?',
        a: 'The adapter connection dropped: the network, the adapter power, or the adapter itself. The rack connection status tag is faulted, and the switch port shows the link state. On reconnection the points resume; the outputs went to their fault state in between.',
      },
      {
        q: 'A single output will not turn on and the tag is on. What is left?',
        a: 'The module output enable or power for that group, a blown output fuse, a failed channel, or the field circuit. Measure at the terminal: voltage present means the field; absent means the module or its supply.',
      },
      {
        q: 'Why do inputs work in the test rig and not in the panel?',
        a: 'Sinking versus sourcing, or the module common. The test rig was wired to suit the module; the panel wiring follows a drawing that assumed the other convention. Check the module manual for the common and the current direction, and the schematic for what was wired.',
      },
    ],
    related: [
      '/troubleshooting/plc-troubleshooting/inputs-not-reading',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
      '/controls/plc-systems/plc-fundamentals/io-systems',
      '/controls/plc-systems/communications/remote-i-o',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
    ],
  },
  {
    path: '/controls/plc-systems/programming/permissives',
    kind: 'reference',
    title: 'Permissives',
    summary:
      'The conditions that must be true before a device may start: how permissives differ from interlocks and trips, the list a pump or feeder usually needs, coding them so the HMI can say why a start was refused, and the rules for time delays and bypasses.',
    answer:
      'A permissive is a condition that must be true for a start command to be accepted; it is evaluated when the start is requested and does not by itself stop the device once it is running. An interlock is a condition that must stay true for the device to keep running, and a trip is a hardwired protection that acts without the controller. Good practice codes each permissive as its own named bit, combines them into a single ready bit, shows the list on the HMI so an operator can see which one is blocking, applies short time delays to conditions that flicker, and allows bypasses only where the functional description says so, with the bypass alarmed and logged.',
    keyPoints: [
      'Permissive: checked at the start. Interlock: enforced while running. Trip: hardwired, independent of the controller.',
      'One named bit per condition, combined into one ready bit; never a single anonymous rung of series contacts.',
      'The HMI shows every permissive with its state, so the answer to why it will not start is on the screen.',
      'Flickering conditions get a short on-delay; a level cutoff needs a deadband so it does not chatter at the threshold.',
      'A permissive that is also a run interlock is coded in both places, deliberately, not by accident.',
      'Bypasses only where the functional description allows, with an alarm while active and a record of who set it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Programming', 'Control', 'Pumps', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'Permissive, interlock, trip' },
      {
        t: 'p',
        text: 'The three words are used loosely in the field and precisely in a functional description. A permissive gates the start: if the wet well is below the low-level cutoff, the pump may not start. An interlock stops or prevents running as long as the condition exists: a seal-fail or a motor high-temperature signal stops a running pump and keeps it stopped. A trip is protection that works whether or not the controller is running: the motor overload relay, the emergency stop, the high-high level float that drops the starter coil. The distinction matters because the response differs. A permissive that goes false after the pump starts does not necessarily stop the pump; if it should, the condition also belongs in the interlock logic.',
      },
      {
        t: 'table',
        head: ['Type', 'When evaluated', 'Effect', 'Typical examples'],
        rows: [
          ['Permissive', 'At the moment of the start request', 'Start refused; no effect once running', 'Level above cutoff, drive ready, valve position, minimum off time elapsed, in AUTO'],
          ['Run interlock', 'Continuously while running', 'Device stopped and held off; usually latched with a reset', 'Seal fail, high temperature, low suction pressure after a delay, discharge valve failed to open'],
          ['Trip', 'Continuously, in hardware', 'Starter or drive de-energized regardless of controller', 'Overload relay, emergency stop, high-high float, drive fault contact'],
        ],
      },
      { t: 'h2', text: 'What a pump start usually needs' },
      {
        t: 'ul',
        items: [
          'Level: wet well or suction level above the low-level cutoff, with a deadband so the condition does not chatter.',
          'Drive or starter ready: no fault, control power present, the drive reporting ready, the starter not tripped.',
          'Selector: the hand-off-auto switch in AUTO for an automatic start; HAND starts bypass the automatic permissives by design and should still respect the trips.',
          'Valves: suction valve open by limit switch where one exists; discharge valve at the position the sequence expects.',
          'Anti-cycle: the minimum off time since the last stop has elapsed, and the starts-per-hour count is below the motor limit.',
          'Maintenance: no lockout tag in the system and no out-of-service flag on the HMI.',
          'Process: for a chemical feed pump, carrier water flow proven and the day tank not at low level.',
        ],
      },
      { t: 'h2', text: 'Coding pattern' },
      {
        t: 'p',
        text: 'Each permissive is its own bit with a name that says what it is. The bits are combined into one ready bit, and the start command is accepted only while the ready bit is true. Nothing else in the program looks at the individual bits except the HMI, which displays them. This pattern is the same in ladder, structured text, and function block; the structured text version is the shortest to read.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Structured text; ladder uses one rung per bit and one rung for the ready bit',
        code: `// Pump 1 start permissives, one bit each
P1_Perm_Level  := LT_101_PV > P1_LowLevelCutoff + P1_LevelDeadband;
P1_Perm_Drive  := VFD1_Ready AND NOT VFD1_Faulted;
P1_Perm_Valve  := ZSO_101;                 // suction valve open limit
P1_Perm_Seal   := NOT P1_SealFail;
P1_Perm_MinOff := P1_MinOffTimer.Q;        // minimum off time elapsed
P1_Perm_Auto   := P1_HOA_Auto;
P1_Perm_Maint  := NOT P1_OutOfService;

// One ready bit; the HMI shows the individual bits
P1_Ready := P1_Perm_Level AND P1_Perm_Drive AND P1_Perm_Valve
            AND P1_Perm_Seal AND P1_Perm_MinOff AND P1_Perm_Auto AND P1_Perm_Maint;

// Start accepted only while ready; run interlocks are handled separately
IF P1_AutoStartRequest AND P1_Ready THEN
    P1_RunCmd := TRUE;
END_IF;`,
      },
      {
        t: 'p',
        text: 'The level permissive uses the cutoff plus a deadband, so the pump can start only when the level is comfortably above the point where the interlock would stop it. Without that margin a pump starts, draws the level down through the cutoff on the first stroke, stops, and repeats.',
      },
      { t: 'h2', text: 'Time delays' },
      {
        t: 'p',
        text: 'Some conditions are true almost all the time and false for a moment: a pressure switch that bounces as a valve opens, a drive ready contact that drops for a scan as the drive changes state, a level reading that dips for one sample. A permissive built directly on such a signal refuses starts for no reason the operator can see. Give those conditions an on-delay of a second or two before they count as true. Do not delay the conditions that protect equipment, and do not delay the trips at all.',
      },
      { t: 'h2', text: 'On the HMI' },
      {
        t: 'p',
        text: 'The most useful thing a permissive list does is answer the question the operator asks at two in the morning: why will it not start. Put the list on the pump faceplate or a detail popup, one line per permissive with its current state, in the same words the functional description uses. The ready bit drives the start button availability. When a start is refused, the line that is false is the reason, and nobody needs to open the program.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Same list in the functional description',
        text: 'Write the permissive list in the functional description first, then code it, then build the HMI display from it. Three documents that agree word for word are the difference between a system that can be maintained and one that has to be reverse-engineered.',
      },
      { t: 'h2', text: 'Bypasses' },
      {
        t: 'p',
        text: 'A bypass lets a start proceed with a permissive false: a level bypass to pump a wet well down below the cutoff for cleaning, a valve position bypass when a limit switch has failed and the valve is verified open by hand. Bypasses exist because plants have to keep running, and they are dangerous because they get forgotten. Allow them only where the functional description names them, require a supervisor level login, alarm continuously while any bypass is active, log who set it and when, and clear them automatically on a time limit or on the next stop.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Never bypass a trip in software',
        text: 'A software bypass applies to software permissives and interlocks. The hardwired trips, the overload relay, the emergency stop, and the high-high float, are outside the controller on purpose, and a bypass built by jumpering them in the panel is a hazard, not a workaround.',
      },
    ],
    faqs: [
      {
        q: 'Should a permissive that goes false while running stop the pump?',
        a: 'Only if the functional description says so, and then it is coded as a run interlock as well. A drive ready contact that drops out while running should stop the pump; a minimum off time or an AUTO selector already satisfied at the start should not. Decide condition by condition and write it down.',
      },
      {
        q: 'Where does the anti-cycle timer belong?',
        a: 'In the permissives. The minimum off time and the starts-per-hour limit protect the motor from heating; they are conditions that must be true before a start and have nothing to do with a running pump. A permissive display that shows the remaining off time saves a lot of radio calls.',
      },
      {
        q: 'Should a HAND start respect the permissives?',
        a: 'A HAND start is the operator taking responsibility, so it usually bypasses the automatic permissives such as level and AUTO. It never bypasses the trips, and a plant may choose to keep a few protective conditions, such as seal fail, in force in HAND. Say which in the functional description; the HOA logic is where accidents are designed in.',
      },
      {
        q: 'How do I keep a long permissive list from being a maintenance burden?',
        a: 'Use a standard pump block with a fixed list of permissive bits, and leave the unused ones forced true with a configuration flag. Every pump then has the same list in the same order on the same faceplate, and a new pump is configured rather than programmed.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/interlocks',
      '/controls/plc-systems/programming/state-machines',
      '/controls/control-panels/pump-panels/hoa',
      '/how-to/plc-how-to/program-lead-lag-pumps',
      '/troubleshooting/pump-troubleshooting/pump-will-not-start',
      '/troubleshooting/vfd-troubleshooting/drive-will-not-start-in-auto',
    ],
  },
  {
    path: '/controls/plc-systems/programming/sequencers',
    kind: 'reference',
    title: 'Sequencers',
    summary:
      'Step-based control for operations that always run in the same order: backwash, pump and valve startup, batch makeup, membrane cleans. What every step needs, three ways to implement one, handling faults and power loss mid-sequence, and what the HMI shows.',
    answer:
      'A sequencer moves a piece of equipment through a fixed series of steps, each with the actions it performs, the condition that completes it, a timeout, and a defined response to a fault. It is implemented as an integer step number with a case structure, a drum or sequencer output instruction for fixed output patterns, or a sequential function chart where the platform supports it. Every step has a timeout with an alarm, transitions are driven by feedback rather than assumed, faults either hold the sequence or abort it to a safe state as the functional description decides, and after a power loss the sequence restarts from a recovery step that evaluates the plant rather than from wherever it was.',
    keyPoints: [
      'Fixed order, one active step, feedback-driven transitions: that is a sequencer. Arbitrary transitions are a state machine.',
      'Every step has a number, a name, actions, a completion condition, a timeout, and a fault response.',
      'Integer step and case structure runs on any platform and is the easiest to read in the field.',
      'Timeouts with alarms turn a stuck sequence into a diagnosed one: the alarm names the step and what it was waiting for.',
      'Hold keeps outputs and waits; abort drives outputs to a safe state. Decide per step, in the functional description.',
      'After a power loss the sequence goes to a recovery step, never straight back to the step it was in.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['PLC', 'Programming', 'Control', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'What a sequencer is for' },
      {
        t: 'p',
        text: 'Some operations always happen in the same order. A filter backwash closes the influent valve, drains to a level, air scours, washes, settles, filters to waste, and returns to service. A high-service pump start pre-lubricates, opens the suction valve, starts the motor, and opens the discharge valve slowly. A polymer batch fills to a level, adds neat polymer for a time, mixes, and ages. Each of these is a list of steps, and the controller code that runs them is a sequencer. The alternative, a tangle of timers and latches that happens to produce the right order, works until someone has to change step four.',
      },
      { t: 'h2', text: 'What every step needs' },
      {
        t: 'dl',
        items: [
          { term: 'Number and name', def: 'Numbered by tens so a step can be inserted later; named in the words the operators use. Step 30, Air Scour.' },
          { term: 'Actions', def: 'The outputs held while the step is active: valves open, blower running. Outputs not named are in their default state.' },
          { term: 'Completion condition', def: 'Feedback, not assumption: a valve limit switch, a level, a flow, an analyzer reading, or a timer where time is the only measure. A step that waits for a valve to open watches the open limit, not a five-second timer.' },
          { term: 'Timeout', def: 'The longest the step may take before something is wrong, with an alarm that names the step and the condition it was waiting for.' },
          { term: 'Fault response', def: 'Hold, abort, or retry, decided per step. A timeout on the drain step may hold and wait for the operator; a timeout on the discharge valve during a pump start aborts and stops the pump.' },
          { term: 'Manual advance', def: 'A supervisor-level button that forces the transition, for commissioning and for the day a limit switch is broken, logged when used.' },
        ],
      },
      { t: 'h2', text: 'Three ways to build one' },
      {
        t: 'table',
        head: ['Method', 'How it works', 'Best for', 'Watch out for'],
        rows: [
          ['Integer step with case structure', 'A step register holds the current step; a case statement or a set of equal-compare rungs runs the logic for that step and sets the next step number', 'Anything; readable on every platform; easy to add steps', 'Every write to the step register must be in one place, or two rungs fight over it'],
          ['Drum or sequencer output instruction', 'A table of output patterns indexed by step, advanced by time or by an event input', 'Fixed output patterns such as wash cycles and simple valve sequences', 'Conditions and timeouts live outside the instruction; harder to see what is waiting'],
          ['Sequential function chart', 'Graphical steps and transitions with actions attached; parallel branches supported', 'Long sequences with parallel paths, on platforms and with staff that know it', 'Not every platform has it; a field technician who has never seen one cannot troubleshoot it at 2 a.m.'],
        ],
      },
      { t: 'h2', text: 'Example: filter backwash' },
      {
        t: 'table',
        caption: 'Step times and setpoints come from the functional description and the plant; the structure is the point',
        head: ['Step', 'Actions', 'Completion', 'Timeout', 'On timeout'],
        rows: [
          ['0 Idle', 'Filter in service', 'Backwash request and permissives true', 'none', 'none'],
          ['10 Isolate', 'Close influent valve, close effluent valve', 'Both closed limits', '2 min', 'Abort, alarm valve'],
          ['20 Drain down', 'Open drain or waste valve', 'Level below air scour level', '30 min', 'Hold, alarm'],
          ['30 Air scour', 'Open air valve, start blower', 'Timer, typically a few minutes', 'timer + 1 min', 'Abort, alarm blower'],
          ['40 Air and water', 'Start wash pump at low rate with air', 'Timer', 'timer + 1 min', 'Abort'],
          ['50 Water wash', 'Stop blower, close air valve, wash pump to high rate', 'Timer, or waste turbidity below setpoint', 'timer + 2 min', 'Hold, alarm'],
          ['60 Settle', 'Stop wash pump, close wash valves', 'Closed limits, settle timer', '5 min', 'Alarm valve'],
          ['70 Filter to waste', 'Open influent, open waste valve', 'Effluent turbidity below setpoint', 'Per the plant', 'Hold, alarm'],
          ['80 Return', 'Close waste valve, open effluent valve', 'Effluent open limit', '2 min', 'Alarm valve'],
        ],
      },
      { t: 'h2', text: 'Coding pattern' },
      {
        t: 'code',
        lang: 'text',
        caption: 'Structured text case structure; each step owns its outputs, its transition, and its timeout',
        code: `CASE BW_Step OF
  10: (* Isolate *)
      FV_Influent_Close := TRUE;  FV_Effluent_Close := TRUE;
      IF ZSC_Influent AND ZSC_Effluent THEN BW_Step := 20; END_IF;
      IF BW_StepTimer.ET > T#2m THEN BW_Fault := TRUE; BW_Step := 900; END_IF;

  20: (* Drain down *)
      FV_Waste_Open := TRUE;
      IF LT_Filter_PV < BW_ScourLevel THEN BW_Step := 30; END_IF;
      IF BW_StepTimer.ET > T#30m THEN BW_Hold := TRUE; END_IF;  (* hold, alarm *)

  30: (* Air scour *)
      FV_Air_Open := TRUE;  Blower_RunCmd := TRUE;
      IF BW_StepTimer.ET > BW_ScourTime THEN BW_Step := 40; END_IF;

  (* ... *)

  900: (* Abort: safe state *)
      Blower_RunCmd := FALSE;  WashPump_RunCmd := FALSE;
      FV_Air_Open := FALSE;    FV_Waste_Open := FALSE;
      IF BW_Reset THEN BW_Fault := FALSE; BW_Step := 0; END_IF;
END_CASE;

(* Step timer restarts on any step change; step number written only inside the CASE *)`,
      },
      {
        t: 'p',
        text: 'Two disciplines keep this readable for years. The step number is written only inside the case structure, so there is exactly one place to look for how the sequence advances. And outputs are set inside the step that uses them and cleared in a common section that runs when the step changes, so a step cannot leave a valve open by forgetting to close it.',
      },
      { t: 'h2', text: 'Faults, holds, and power loss' },
      {
        t: 'p',
        text: 'A hold freezes the sequence in its current step with outputs as they are, and waits for an operator to resume, advance, or abort. It fits steps where waiting is safe, such as a drain that is slow because the waste line is restricted. An abort drives every output the sequence controls to a defined safe state and goes to an abort step that waits for a reset. It fits steps where waiting is not safe, such as a blower running against a closed valve. The functional description says which applies to each step; the code should not guess.',
      },
      {
        t: 'p',
        text: 'Power loss in the middle of a sequence is the case that gets forgotten. If the step number is retentive, the controller powers up in step 50 with the wash pump commanded to run and the valves in whatever positions they drifted to. If it is not retentive, the sequence restarts at idle with the filter half drained and the influent valve closed, and the filter sits there. The robust answer is a recovery step: on first scan, the sequence goes to a step that reads the valve positions and level, alarms that a sequence was interrupted, and either returns to idle safely or lets the operator choose where to resume.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Feedback, not time',
        text: 'A sequence that assumes a valve opened because five seconds passed will one day run a pump against a closed valve. Every transition that can be confirmed by a limit switch, a level, a flow, or a pressure is confirmed that way. Timers measure duration; they do not prove that anything happened.',
      },
      { t: 'h2', text: 'What the HMI shows' },
      {
        t: 'ul',
        items: [
          'The current step number and name, in the same words as the functional description.',
          'The step timer and the timeout, so a slow step is visible before it alarms.',
          'The condition the step is waiting for, as text: Waiting for influent valve closed limit.',
          'Start, hold, resume, abort, and the supervisor-level advance, each logged.',
          'The last completed sequence with its total time and any holds, and a trend of step durations over time; a wash that takes longer every week is telling you something.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a sequencer and a state machine?',
        a: 'A sequencer runs a fixed list of steps in order and returns to idle; the only branches are hold and abort. A state machine has a set of states with transitions in any direction, such as a pump that moves between stopped, starting, running, stopping, and failed. Use a sequencer for an operation with a beginning and an end, and a state machine for equipment that lives in modes.',
      },
      {
        q: 'Where do the step times come from?',
        a: 'From the functional description, which got them from the process designer, the equipment manufacturer, and the plant. Put them in setpoint registers with limits, editable from a supervisor screen, never as constants in the code. A wash duration that has to be changed by a programmer is a wash duration that never gets optimized.',
      },
      {
        q: 'Can two sequences run at the same time?',
        a: 'Two sequences on different equipment, yes; each has its own step register and code. Two filters backwashing at once is a process question, and usually the answer is a permissive that lets only one backwash run at a time because the wash supply and the waste handling are sized for one.',
      },
      {
        q: 'How do I test a sequence without running the plant?',
        a: 'With the outputs disabled or the equipment isolated, step through it with simulated feedback: force the limit switches and levels in the order the sequence expects, then in the wrong order, then not at all, and confirm every timeout and abort behaves. Then run it once for real with someone at the equipment. Sequences that were only tested on the happy path fail on the first unhappy one.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/state-machines',
      '/controls/plc-systems/programming/permissives',
      '/controls/plc-systems/programming/interlocks',
      '/controls/plc-systems/programming/structured-text',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/water-wastewater/water-systems/water-pumping/well-pumps',
    ],
  },
  {
    path: '/controls/plc-systems/programming/program-organization',
    kind: 'reference',
    title: 'Program Organization',
    summary:
      'Structuring a controller program so that someone else can maintain it: a layout that follows the plant, one routine per job, standard device blocks, I/O mapped in one place, a fixed execution order, naming that means something, and comments that say why.',
    answer:
      'A well-organized controller program mirrors the plant: a main routine that calls the others in a fixed order, an input mapping routine that copies physical inputs to named tags, a routine per process area or piece of equipment built from standard device blocks, separate routines for alarms and communications, control loops in a periodic task at a fixed rate, and an output mapping routine at the end. Tags are named by equipment and attribute, setpoints live in named registers rather than as constants, every rung or block has a comment that says what it is for, and a revision record inside the program says what changed and when. The test is whether a technician who has never seen the program can find the logic for one pump in under a minute.',
    keyPoints: [
      'Structure follows the plant: area, then equipment, then device. Nobody should have to search a 3,000-rung routine.',
      'Map physical I/O to named tags in one routine at the start and one at the end; the logic never touches an address.',
      'Standard device blocks for pumps, valves, and analyzers; every pump behaves the same and is configured, not programmed.',
      'Fixed execution order: inputs, logic, alarms, communications, outputs. A tag written after it is read costs a scan.',
      'Setpoints in named registers with limits, never constants in the code.',
      'Comments say why, tag descriptions say what, and a revision record inside the program says what changed.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['PLC', 'Programming', 'Documentation', 'Design', 'Engineering'],
    blocks: [
      { t: 'h2', text: 'The test' },
      {
        t: 'p',
        text: 'Hand the program to a technician who has never seen it, and ask them to find why pump 2 is not starting. If they open the program tree, see a routine named for the lift station, open it, find pump 2, and read a permissive list, the program is organized. If they scroll through one enormous routine searching for the output tag, it is not. Organization is not tidiness for its own sake; it is the property that makes a control system maintainable by someone other than the person who wrote it.',
      },
      { t: 'h2', text: 'The vocabulary by platform' },
      {
        t: 'table',
        caption: 'Different names for the same organizational tools',
        head: ['Concept', 'IEC 61131-3', 'Rockwell Logix', 'Schneider Control Expert', 'Siemens TIA Portal'],
        rows: [
          ['Scheduling unit', 'Task', 'Task (continuous, periodic, event)', 'Task (MAST, FAST, event)', 'Organization block (OB)'],
          ['Container of logic', 'Program', 'Program with routines', 'Section', 'Function (FC) or function block (FB)'],
          ['Reusable block with memory', 'Function block', 'Add-On Instruction', 'Derived function block (DFB)', 'Function block with instance data block'],
          ['Reusable block without memory', 'Function', 'Add-On Instruction without state', 'Elementary function', 'Function (FC)'],
          ['Structured data type', 'Structure', 'User-defined type (UDT)', 'Derived data type (DDT)', 'PLC data type (UDT)'],
          ['Global data', 'Global variables', 'Controller tags', 'Unlocated variables', 'Global data block (DB)'],
        ],
      },
      { t: 'h2', text: 'A layout that works' },
      {
        t: 'table',
        head: ['Routine or section', 'Purpose', 'Notes'],
        rows: [
          ['Main', 'Calls every other routine in a fixed order', 'Nothing else; a reader sees the whole program flow on one page'],
          ['FirstScan', 'Initialization after power up or download', 'Sequence recovery, default setpoints if lost, communication resets'],
          ['Inputs_Map', 'Copy physical inputs to named tags; scale analog inputs', 'The only place physical input addresses appear'],
          ['Area routines', 'One per process area: LiftStation, Filters, Chemical, Disinfection', 'Each built from device blocks; pump 2 lives in its area routine'],
          ['Loops', 'PID and other continuous control', 'In a periodic task at a fixed rate; never in the continuous task'],
          ['Alarms', 'Alarm conditions, delays, and acknowledgment handling', 'Every alarm in one place, in the order of the alarm list'],
          ['Comms', 'Messages to other controllers and devices, with status handling', 'Communication status bits feed signal validation in the area routines'],
          ['HMI', 'Handshakes, command pulses, and the tags the HMI writes', 'Commands from the HMI are consumed and cleared here'],
          ['Outputs_Map', 'Copy named output tags to physical outputs', 'The only place physical output addresses appear'],
          ['Diagnostics', 'Module status, scan time, battery, redundancy', 'Feeds the controller health alarms'],
        ],
      },
      { t: 'h2', text: 'Mapping I/O' },
      {
        t: 'p',
        text: 'The logic reads a tag named for the device, not a channel address. An input mapping routine at the start of the scan copies each physical input to its named tag and scales the analog ones; an output mapping routine at the end copies the named output tags to the physical channels. The cost is a few dozen rungs. The return is that a failed input card can be replaced by a spare in another slot by editing one routine, the program can be tested in simulation by disabling the mapping, and every rung in the logic reads in plain language.',
      },
      { t: 'h2', text: 'Standard device blocks' },
      {
        t: 'p',
        text: 'A plant has twelve pumps that all need the same things: a run command, running feedback, a fail-to-start timer, a fail-while-running check, run hours, start counts, permissives, interlocks, HOA handling, and an HMI faceplate. Written twelve times, the twelve copies drift apart until no two pumps behave alike. Written once as a device block and instanced twelve times, every pump behaves the same, a fix applies to all of them, and a new pump is an instance with a configuration. The same applies to valves, analyzers, and drives. The block interface becomes the vocabulary of the whole system: every pump has a Sts.Running, a Cmd.Start, and an Alm.FailToStart, and the HMI faceplate binds to them by name.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Parameters, not copies',
        text: 'When one pump is different, the difference is a parameter of the block, such as a fail-to-start delay or a flag that disables the seal-fail interlock, not a modified copy of the block. A block with a flag can be found; a modified copy cannot.',
      },
      { t: 'h2', text: 'Execution order' },
      {
        t: 'p',
        text: 'The controller executes the routines in the order the main routine calls them, once per scan. If the alarm routine reads a tag that the area routine writes, and the alarm routine runs first, the alarm sees the value from the previous scan. One scan late rarely matters, but a chain of such dependencies can add several scans of delay to a sequence and produce behavior that is hard to reproduce. Call the routines in the order data flows: inputs, area logic, loops, alarms, communications, HMI, outputs. And write each output from exactly one place; two rungs writing the same coil is the classic error, and the last one wins silently.',
      },
      { t: 'h2', text: 'Naming' },
      {
        t: 'p',
        text: 'A tag name says what equipment and what attribute: P_101_Run, LT_101_PV, FV_102_ZSO. Where the platform supports structures, the device tag is the structure and the attribute is the member: P_101.Sts.Running. Use the tag numbers from the drawings and the instrument list, so the field, the drawings, the program, and the HMI all use the same identifiers. Descriptions carry the words: Lift Station 1 Pump 1 Running. Setpoints are named tags with engineering units and limits, editable from the HMI: LS1_LeadStartLevel_ft, not a constant 8.5 in a compare instruction.',
      },
      { t: 'h2', text: 'Comments and revisions' },
      {
        t: 'p',
        text: 'A tag description says what a tag is. A rung or block comment says why the logic is the way it is: Delay is 15 s because the check valve slams if the pump stops with the discharge valve open. The reader can see what the rung does; the comment explains the intent, which is the thing that is lost when the author leaves. Keep a revision record inside the program, in a comment or a dedicated routine: date, who, what changed, and why, and export the project file to version control at every change so the history exists somewhere other than the laptop.',
      },
      { t: 'h2', text: 'Signs of a program that needs reorganizing' },
      {
        t: 'ul',
        items: [
          'One routine of thousands of rungs, or routines named Routine1 through Routine9.',
          'The same pump logic copied per pump with small, undocumented differences.',
          'Physical input and output addresses scattered through the logic.',
          'Constants in compare and math instructions where setpoints should be.',
          'Outputs written from more than one rung.',
          'No comments, or comments that restate the instruction: Turn on output.',
          'No record of what changed since the last time anyone looked.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How big should a routine be?',
        a: 'Small enough to read in one sitting and to describe in one sentence: this routine runs the filters. A routine that needs a table of contents is two routines. On most projects that is a few dozen to a couple of hundred rungs, and a device block instance counts as one rung.',
      },
      {
        q: 'Are device blocks worth it on a small system?',
        a: 'Yes, on anything with more than one pump. The block takes longer to write the first time than a few rungs of logic, and it pays back on the second pump, on the HMI faceplate that binds by name, and on every future change. Small systems grow.',
      },
      {
        q: 'Should loops really be in a periodic task?',
        a: 'Yes. A PID computes with an assumed sample time; in a continuous task that time varies with scan length and the loop tuning changes with it. A periodic task at 100 to 500 ms gives the loop a fixed sample time and predictable behavior. The same applies to totalizers and rate calculations.',
      },
      {
        q: 'What is the minimum for a program someone else can maintain?',
        a: 'A main routine that shows the flow, routines named for the plant areas, I/O mapped in one place, tags named from the drawings with descriptions, setpoints as named tags, a comment on every rung whose purpose is not obvious, and a revision record. That is a day of work on a program of any size, and it is the day that saves the most later.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/iec-61131-3',
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/programming/function-block-diagram',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/how-to/plc-how-to/program-lead-lag-pumps',
    ],
  },
  {
    path: '/controls/plc-systems/programming/control-strategies',
    kind: 'reference',
    title: 'Control Strategies',
    summary:
      'Choosing how a loop is controlled before choosing how to program it: on-off with deadband, staging, PID, ratio and feedforward, cascade, split range, and override, with the water and wastewater applications each fits and the questions that pick between them.',
    answer:
      'The control strategy is chosen by what the process needs and what the final control element can do. On-off control with a deadband fits a level held between two points by a fixed-speed pump. Staging fits several fixed units serving one demand. PID fits a variable held at a setpoint by a modulating element such as a drive or a control valve. Ratio and feedforward fit a dose that follows a measured flow. Cascade fits a slow variable that is best controlled by setting the setpoint of a faster inner loop. Override fits a loop that must respect a constraint on a second variable. The simplest strategy that meets the requirement is the right one, and combinations such as PID speed control with staging are normal.',
    keyPoints: [
      'Start from the process and the final control element, not from the instruction set.',
      'On-off with deadband is the right choice for a level between two points with a fixed-speed pump; do not add PID to it.',
      'PID needs a modulating element and a measurable variable that responds to it; otherwise it is decoration.',
      'Ratio and feedforward act on the disturbance before the error appears; feedback trims what they miss.',
      'Cascade only helps when the inner loop is several times faster than the outer, and the inner loop is tuned first.',
      'Every loop gets a documented fallback: what happens when the transmitter fails, and what the operator does in manual.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['PLC', 'Control', 'PID', 'Programming', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'The strategies' },
      {
        t: 'dl',
        items: [
          { term: 'On-off with deadband', def: 'The output is fully on above one threshold and fully off below another. The deadband between them sets the cycle time. Wet well pumping between start and stop levels, tank filling, a heater in a panel.' },
          { term: 'Staging', def: 'Several fixed-capacity units are started and stopped in turn to match demand: lead, lag, lag 2 pumps by level or pressure; blowers by air demand; compressors by receiver pressure. Alternation shares wear.' },
          { term: 'PID feedback', def: 'A modulating element is adjusted continuously to hold a measured variable at a setpoint: pump speed for discharge pressure, valve position for flow, blower speed for dissolved oxygen, chemical pump speed for residual.' },
          { term: 'Ratio', def: 'One flow is held in proportion to another: chemical feed paced to plant flow at a dose setpoint. The controller computes the feed rate from the flow and the dose; there may be no feedback at all.' },
          { term: 'Feedforward with feedback trim', def: 'A measured disturbance sets most of the output and a feedback loop corrects the remainder: flow-paced hypochlorite with the dose trimmed by a residual analyzer.' },
          { term: 'Cascade', def: 'The output of a slow outer loop is the setpoint of a fast inner loop: dissolved oxygen sets an air flow setpoint, and air flow controls the blower. Level sets a flow setpoint that controls a pump speed.' },
          { term: 'Split range', def: 'One controller drives two elements over different parts of its output: a small valve for the first half of the range and a large valve for the second, or heating below 50 percent and cooling above.' },
          { term: 'Override and selector', def: 'Two controllers compete for one element and a selector picks the safer output: pressure control overridden by a maximum flow, or a low-select so that a suction pressure limit takes over from discharge pressure control.' },
        ],
      },
      { t: 'h2', text: 'Choosing' },
      {
        t: 'steps',
        items: [
          { title: 'What does the process need?', text: 'A variable held between two limits, or held at a value? Between two limits is on-off or staging. At a value is modulating control of some kind.' },
          { title: 'What can the final control element do?', text: 'A fixed-speed pump can only run or stop; the strategy is on-off or staging no matter what the process would prefer. A drive, a control valve, or a metering pump can modulate; PID and its relatives become possible.' },
          { title: 'How does the variable respond?', text: 'Fast and direct, such as pressure to pump speed: PID alone. Slow with dead time, such as chlorine residual at a downstream sample point: feedforward or ratio does the bulk of the work and PID trims slowly.' },
          { title: 'Is there a measurable disturbance?', text: 'Plant flow, influent load, a tank being filled: measure it and feed it forward or use it as the ratio basis, rather than waiting for the error.' },
          { title: 'Is there a faster secondary variable?', text: 'If the element affects a fast variable that in turn affects the slow one, cascade: the fast inner loop rejects disturbances before the slow outer loop sees them.' },
          { title: 'Are there constraints?', text: 'A pressure that must not exceed a limit, a flow that must not fall below one: override control with a selector, and an alarm when the override is active.' },
          { title: 'What is the fallback?', text: 'Transmitter failure, communication loss, and manual operation: what does the loop do, and what does the operator do. Write it before writing the loop.' },
        ],
      },
      { t: 'h2', text: 'Applications' },
      {
        t: 'table',
        head: ['Application', 'Strategy', 'Why', 'Common mistake'],
        rows: [
          ['Lift station with fixed-speed pumps', 'On-off with lead-lag staging and alternation', 'Level between two points; the pumps cannot modulate', 'Adding a PID that has nothing to modulate'],
          ['Lift station with drives', 'PID on level to lead pump speed, staging when the lead is at maximum', 'Smoother flow to the plant and fewer starts', 'Running the drive at minimum speed for hours below the pump curve'],
          ['High service pumping', 'PID on discharge pressure to drive speed; staging by speed and pressure', 'Pressure held at a value; several pumps serve one demand', 'Staging on pressure alone, which fights the PID'],
          ['Hypochlorite feed', 'Ratio to plant flow with residual trim', 'Dose follows flow immediately; residual corrects slowly for demand', 'Pure residual feedback with a long sample lag, which oscillates'],
          ['Aeration dissolved oxygen', 'Cascade: DO sets air flow, air flow controls blower', 'DO responds slowly; air flow responds fast', 'DO directly to blower speed, which hunts'],
          ['Filter effluent', 'PID on filter level to effluent valve', 'Constant level keeps the head loss curve honest', 'Tuning too aggressively and cycling the valve'],
          ['Chemical day tank', 'On-off fill with deadband, high-high shutoff', 'Level between limits; a solenoid valve', 'Filling on a PID and hunting a solenoid'],
          ['Pressure with a flow limit', 'Override: low-select between pressure PID and flow limit PID', 'Pressure held unless flow would exceed the limit', 'Alarming on nothing, so nobody knows the override is active'],
        ],
      },
      { t: 'h2', text: 'Ratio and feedforward' },
      {
        t: 'p',
        text: 'For chemical feed the ratio calculation does most of the work. The feed rate is the plant flow times the dose setpoint, converted to the units of the feed pump and corrected for the strength of the chemical.',
      },
      {
        t: 'formula',
        expr: 'F = Q × D / (C × k)',
        where: [
          'F = chemical feed rate, in the units the feed pump uses',
          'Q = plant flow',
          'D = dose setpoint, in mg/L as the active chemical',
          'C = concentration of the chemical as supplied, as the same active chemical',
          'k = the unit conversion between flow times dose and feed rate',
        ],
      },
      {
        t: 'p',
        text: 'Feedback trim then adjusts the dose setpoint slowly from a residual analyzer. The trim loop is tuned gently, because the analyzer is downstream and reports the result minutes after the change. A common arrangement limits how far the trim can move the dose, so a failed analyzer cannot drive the dose to zero or to the maximum.',
      },
      { t: 'h2', text: 'Cascade' },
      {
        t: 'p',
        text: 'In a cascade the outer loop does not touch the equipment; it writes the setpoint of the inner loop, which does. The inner loop must be faster, several times faster as a rule, or the two loops interact and the result is worse than a single loop. Commission the inner loop first, with the outer loop in manual, and tune it to be fast and stable. Then close the outer loop and tune it slowly. If the inner loop is switched to manual or loses its transmitter, the outer loop must stop integrating, which the PID instruction on most platforms handles if the cascade is configured rather than improvised.',
      },
      { t: 'h2', text: 'Combining strategies' },
      {
        t: 'p',
        text: 'Real loops are usually combinations. A high service system holds pressure with PID on the lead pump speed, stages the lag pump when the lead has been at maximum speed for a time and pressure is still low, and destages when the lead has been at minimum for a time and pressure is high. The staging logic uses speed and time as its basis so that it cooperates with the PID rather than competing with it on pressure. An aeration system cascades DO to air flow, with a most-open-valve strategy setting the blower pressure setpoint so the blowers work no harder than the neediest zone requires. Each layer is a simple strategy; the design is in how they hand off.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Simplest that meets the requirement',
        text: 'A control strategy has to be understood by the operator who runs it, the technician who fixes it, and the engineer who changes it in ten years. On-off control that meets the requirement beats PID that meets it slightly better. Add complexity only for a reason you can write in the functional description.',
      },
      { t: 'h2', text: 'Fallbacks' },
      {
        t: 'ul',
        items: [
          'Transmitter failure: the loop holds its last output, goes to a safe fixed output, or switches to a backup measurement, and alarms. Never lets the failed value drive the output.',
          'Manual mode: the operator sets the output directly, with the setpoint tracking so the return to automatic is bumpless.',
          'Communication loss to a remote setpoint: hold the last setpoint, or revert to a local default, and alarm.',
          'Override active: an alarm that says which controller has the element, so a pressure that is not being held is explained.',
        ],
      },
    ],
    faqs: [
      {
        q: 'When is on-off control better than PID?',
        a: 'Whenever the final control element cannot modulate, and whenever the process only needs to stay between two limits. A wet well pumped by fixed-speed pumps, a tank filled by a solenoid valve, a heater: on-off with a suitable deadband is the correct design, not a compromise.',
      },
      {
        q: 'How do I combine drive speed control with staging pumps?',
        a: 'Let PID control the lead pump speed. Stage the lag pump when the lead has been at or near maximum speed for a set time and the controlled variable is still below setpoint; destage when the lead is at minimum for a set time and the variable is above. Base staging on speed and time, not on the variable alone, so the two mechanisms do not fight.',
      },
      {
        q: 'What is override control for?',
        a: 'Holding one variable at setpoint while respecting a limit on another. A discharge pressure loop with a low-select against a maximum flow controller keeps pressure until flow would exceed the limit, and then the flow controller takes the pump speed. Alarm when the override is active so operators know why the pressure is off.',
      },
      {
        q: 'Why tune the inner loop first in a cascade?',
        a: 'Because the outer loop sees the inner loop as part of its process. An inner loop that is slow or oscillating makes the outer loop impossible to tune, and any outer tuning done first becomes wrong the moment the inner loop is changed. Inner loop fast and stable, then outer loop slow.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/pid',
      '/controls/plc-systems/analog-control/deadband',
      '/how-to/plc-how-to/create-a-pid-loop',
      '/controls/control-panels/pump-panels/lead-lag',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/level-pid',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control',
    ],
  },
  {
    path: '/controls/plc-systems/programming/alarms',
    kind: 'reference',
    title: 'Alarms in the Controller',
    summary:
      'Generating alarm conditions in the controller rather than in the graphics: why the PLC should own the alarm state, a standard alarm block with setpoints, deadband, and delays, equipment alarms, and packing alarm bits for SCADA.',
    answer:
      'An alarm condition belongs in the controller because the controller is the one place that sees the process every scan, keeps running when the SCADA server or the network is down, and can act on the condition with an interlock or a shutdown at the same time it reports it. The SCADA system annunciates, prioritizes, records, and notifies, but the decision that a level is high or a pump has failed to start is made once, in logic, with a setpoint, a deadband, and a delay that are documented and adjustable. A standard alarm block applied to every analog and every discrete condition makes the behavior uniform and the list auditable, and packing the alarm bits into words gives SCADA a compact, reliable picture that survives a communication loss with a single bad-quality indication rather than a flood of stale alarms.',
    keyPoints: [
      'The controller decides the alarm state; SCADA annunciates it. One source of truth, and it works when the server does not.',
      'Every analog alarm has a setpoint, a deadband, and an on delay; every discrete alarm has a condition and a delay.',
      'Use one standard alarm block for the whole program so behavior and documentation are uniform.',
      'Fail-to-start, fail-to-stop, and rate-of-change alarms catch equipment problems that limit alarms miss.',
      'Pack alarm bits into words for SCADA, keep the controller alarm list matched to the alarm philosophy, and make setpoints adjustable from the screen with limits.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Programming', 'Alarms', 'SCADA', 'Standards'],
    blocks: [
      { t: 'h2', text: 'Why the controller' },
      {
        t: 'ul',
        items: [
          'It sees the value every scan, not every poll; a short excursion is caught.',
          'It keeps working when the SCADA server, the network, or the radio is down, and can drive a local horn, a dialer, or a shutdown.',
          'The same condition drives the interlock and the alarm, so they can never disagree.',
          'Setpoints and delays live in one place and are backed up with the program.',
          'SCADA receives a state, not a value to evaluate, so every client and every historian sees the same alarm at the same time.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'What stays in SCADA',
        text: 'Priority, annunciation, acknowledgment, shelving, notification, and the alarm record belong in the SCADA alarm server, where the operator interacts with them. The controller supplies the condition and, where the design needs it, a latched state that must be reset. Alarm philosophy work, the rationalization, and the priority assignment are done with both in view.',
      },
      { t: 'h2', text: 'A standard analog alarm block' },
      {
        t: 'table',
        head: ['Input', 'Purpose', 'Typical value'],
        rows: [
          ['PV', 'The engineering unit value being watched', 'The scaled tag'],
          ['HH, H, L, LL setpoints', 'The four limits', 'From the alarm philosophy; adjustable within limits'],
          ['Deadband', 'Hysteresis so the alarm does not chatter at the limit', '1 to 2 percent of span, or a process-based value'],
          ['On delay', 'How long the condition must persist before alarming', '2 to 30 seconds for most process alarms'],
          ['Off delay', 'How long it must clear before returning to normal', 'Often zero; used where the value oscillates'],
          ['Enable', 'Suppress by design during a known state, such as a pump starting', 'From the sequence logic'],
          ['Bad quality', 'Force the value alarms off and raise a separate instrument alarm', 'From signal validation'],
        ],
      },
      {
        t: 'table',
        head: ['Output', 'Meaning'],
        rows: [
          ['HH, H, L, LL active', 'The condition is true after delay and deadband'],
          ['Any alarm', 'Combined bit for interlocks and the screen'],
          ['Instrument fault', 'Bad quality, out of range, or open loop, separate from process alarms'],
        ],
      },
      { t: 'h2', text: 'Discrete and equipment alarms' },
      {
        t: 'dl',
        items: [
          { term: 'Fail to start', def: 'The run command is on and the run feedback is off after a delay long enough for the starter, typically 5 to 10 seconds. Latch it; it needs a person.' },
          { term: 'Fail to stop', def: 'The run command is off and the feedback stays on; a welded contactor or a wrong feedback wire. Latch it.' },
          { term: 'Unexpected running', def: 'Feedback on with no command; a hand switch, a bypass, or a wiring fault.' },
          { term: 'Discrepancy', def: 'A valve commanded open with the closed limit still made after the travel time.' },
          { term: 'Communication loss', def: 'A watchdog word from a remote site or a device stops changing; alarm after a delay and set the data bad.' },
          { term: 'Rate of change', def: 'A level rising faster than any pump combination can explain, or dropping faster than a single pump should pump; catches a burst main or a stuck valve before a limit does.' },
          { term: 'Stale value', def: 'An analog that has not changed by more than its noise for a period; a frozen transmitter or a held gateway value.' },
          { term: 'Runtime and starts', def: 'Starts per hour above the motor rating, or runtime without a stop beyond what the process should need.' },
        ],
      },
      { t: 'h2', text: 'Delays and deadbands' },
      {
        t: 'p',
        text: 'A delay filters transients: a level that wobbles past the high setpoint for one scan during a pump start is not an alarm. A deadband stops the alarm from setting and clearing repeatedly as the value hovers at the limit: the alarm sets at the setpoint and clears only when the value has moved back through the setpoint by the deadband. Both are values in the block, both are documented in the alarm list, and both come from the process, not from a habit. A chlorine residual alarm might need a two-minute delay and a deadband of a tenth of a milligram per liter; a wet well high alarm needs a few seconds and a few inches.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'The core of an analog high alarm: hysteresis, then a delay',
        code: `// Analog high alarm with deadband and on delay (structured text)
IF PV >= H_SP THEN
    HighCond := TRUE;
ELSIF PV < (H_SP - Deadband) THEN
    HighCond := FALSE;
END_IF;
HighTimer(IN := HighCond AND Enable AND NOT BadQuality, PT := OnDelay);
HighAlarm := HighTimer.Q;`,
      },
      { t: 'h2', text: 'Packing for SCADA' },
      {
        t: 'p',
        text: 'Alarm bits are packed into 16-bit or 32-bit words in a contiguous block, with the bit positions fixed in the alarm list, so that SCADA reads the whole alarm state of a site in one or two registers per poll. The SCADA alarm server maps each bit to an alarm with its priority and message. A communication loss then produces one bad-quality condition on the block rather than a flood of individual stale alarms, and adding an alarm is a bit assignment and a list entry rather than a new poll. Setpoints are exposed in a separate block of registers that SCADA can write, with the controller clamping each to a documented range.',
      },
      { t: 'h2', text: 'Keeping the list' },
      {
        t: 'ul',
        items: [
          'One alarm list, in the engineering library, with tag, condition, setpoint, deadband, delay, priority, consequence, and operator action.',
          'The controller block parameters are set from the list, and the SCADA alarm configuration is generated from or checked against it.',
          'Setpoint changes from the screen are logged with who and when; the list is updated when a change is made permanent.',
          'Alarm counts per shift and standing alarms are reviewed; an alarm nobody acts on is removed or re-rationalized.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should the alarm latch in the controller or in SCADA?',
        a: 'Process alarms follow the condition and are acknowledged in SCADA. Equipment alarms that need a person, such as fail to start, seal failure, or a discrepancy, latch in the controller and are reset from the screen or the panel after the cause is fixed, so that the equipment does not restart on its own.',
      },
      {
        q: 'How do I stop the alarm flood when communications are lost?',
        a: 'Package the site alarms in words and have SCADA treat the block quality as one condition: a communication alarm for the site, with the individual alarms held or marked stale rather than tripped. The controller keeps its own alarm state and the flood never happens.',
      },
      {
        q: 'Can operators change setpoints?',
        a: 'Within limits set by engineering and enforced by the controller, with the change logged. A high level setpoint can be moved within the range the wet well allows; it cannot be set above the overflow. The limits are in the alarm list.',
      },
      {
        q: 'What about alarms for conditions the controller cannot see, like a server disk filling?',
        a: 'Those are system alarms and belong in SCADA or the network monitor. The controller owns process and equipment alarms; SCADA owns its own health.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
      '/how-to/plc-how-to/add-an-alarm',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/plc-systems/programming/interlocks',
    ],
  },
  {
    path: '/controls/plc-systems/programming/sequential-function-chart',
    kind: 'reference',
    title: 'Sequential Function Chart',
    summary:
      'The IEC 61131-3 language for sequences: steps, transitions, actions and their qualifiers, alternative and simultaneous branches, where it fits in water and wastewater, and the rules that keep a chart from sticking in a step.',
    answer:
      'A sequential function chart describes a process as a series of steps connected by transitions: a step is active, its actions run, and when the transition condition below it becomes true the step deactivates and the next one activates. The chart is the natural language for anything that happens in order, such as a filter backwash, a membrane clean-in-place, a chemical batch, or a plant startup, because the chart on the screen is the sequence of operations from the narrative, and the operator can see which step the plant is in. The discipline that makes it reliable is the same as for any state machine: every step has an exit, a timeout, and an abort path; the chart starts in a known step on power-up or after a fault; and manual intervention takes the chart to a defined step rather than leaving it stranded.',
    keyPoints: [
      'Steps hold actions; transitions hold conditions; exactly one path is active in a simple chart.',
      'Action qualifiers say when the action runs: non-stored, set, reset, pulse, delayed, and time limited.',
      'Alternative branches choose one path; simultaneous branches run several and rejoin.',
      'Every step needs a timeout and an abort transition, and the chart needs a defined restart step.',
      'Use it for backwash, clean-in-place, batching, and startup sequences; keep continuous control in ladder or function blocks.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['PLC', 'Programming', 'Standards', 'Control', 'Water'],
    blocks: [
      { t: 'h2', text: 'The elements' },
      {
        t: 'dl',
        items: [
          { term: 'Initial step', def: 'The step active on first scan or after a reset; drawn with a double border. Usually an idle or ready state.' },
          { term: 'Step', def: 'A state of the sequence. It is active or not, has a step timer, and carries actions.' },
          { term: 'Transition', def: 'A boolean condition between two steps. When the step above is active and the condition is true, the step above deactivates and the step below activates on the next scan.' },
          { term: 'Action', def: 'Something done while the step is active, with a qualifier that says how: energize an output, set a value, call a routine.' },
          { term: 'Alternative branch', def: 'Several transitions under one step; the first true one is taken. Used for choices: pass or fail, manual or auto.' },
          { term: 'Simultaneous branch', def: 'Several steps activated together from one transition and rejoined by one transition that waits for all of them. Used for parallel activities.' },
          { term: 'Jump', def: 'A return to an earlier step, for loops and restarts.' },
        ],
      },
      {
        t: 'table',
        head: ['Qualifier', 'Name', 'Behavior'],
        rows: [
          ['N', 'Non-stored', 'Active while the step is active; the usual choice'],
          ['S', 'Set', 'Turned on when the step activates and stays on until reset by an R action elsewhere'],
          ['R', 'Reset', 'Turns off an action that was set'],
          ['P', 'Pulse', 'Executes once when the step activates'],
          ['D', 'Delayed', 'Starts after a delay from step activation, if the step is still active'],
          ['L', 'Limited', 'Active for a limited time from step activation'],
          ['P1, P0', 'Rising and falling pulse', 'Once on activation, once on deactivation'],
        ],
      },
      { t: 'h2', text: 'Where it fits' },
      {
        t: 'table',
        head: ['Sequence', 'Why a chart', 'Typical steps'],
        rows: [
          ['Filter backwash', 'Fixed order, timed steps, air and water phases, operator visibility', 'Drain, air scour, air and water, water wash, filter to waste, return to service'],
          ['Membrane clean-in-place', 'Chemical phases with temperatures and soaks', 'Flush, heat, chemical recirculation, soak, rinse, neutralize'],
          ['Chemical batching', 'Fill, mix, transfer in order with volumes', 'Charge water, charge chemical, mix, transfer, clean'],
          ['Plant startup', 'Permissives checked in order, equipment started in sequence', 'Check permissives, open valves, start pumps, ramp, confirm flows'],
          ['Generator test', 'Timed transfer and retransfer', 'Start, warm, transfer, run, retransfer, cool, stop'],
        ],
      },
      {
        t: 'p',
        text: 'Continuous control does not belong in a chart: level control, PID, and lead and lag pumping run every scan whether or not any sequence is active, and they live in ladder or function blocks. A chart that tries to control a level with steps becomes a state machine with hundreds of transitions. Use the chart for what happens in order and the other languages for what happens all the time.',
      },
      { t: 'h2', text: 'Design rules' },
      {
        t: 'steps',
        items: [
          { title: 'A defined start', text: 'The initial step is idle. Power-up, a processor fault recovery, and an operator reset all return to it, and the actions it runs put the equipment in a safe state.' },
          { title: 'An exit from every step', text: 'A transition that will become true when the step has done its work, and a timeout transition in parallel that takes the chart to a fault or hold step if it does not. A step with no timeout is where the chart will sit for a week.' },
          { title: 'An abort path', text: 'An emergency stop, a critical alarm, or an operator abort takes the chart from any step to a defined abort step, which shuts things down in the right order and then returns to idle.' },
          { title: 'Hold and resume', text: 'A hold step that pauses the sequence with equipment in a safe state, and a resume that returns to the held step, for interruptions such as a low chemical level.' },
          { title: 'Manual mode', text: 'When an operator takes a device to manual during a sequence, the chart either holds or is told, and the step it returns to is defined.' },
          { title: 'Step time on the screen', text: 'The active step, the time in it, and the transition it is waiting for are displayed. An operator who can see what the chart is waiting for can fix it.' },
          { title: 'Retentive state', text: 'Decide what the chart does after a power loss mid-sequence: restart from idle, or resume the held step after operator confirmation. Store the step if resuming.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Stuck steps',
        text: 'The commonest chart failure is a step whose transition never becomes true: a limit switch that did not make, a flow that did not reach setpoint, a timer that was never started. The sequence stops, the operators do not notice for an hour, and the process sits half done. Every transition that depends on the field has a timeout beside it.',
      },
      { t: 'h2', text: 'Vendor implementations' },
      {
        t: 'p',
        text: 'The chart language exists in every major platform under its own name and with its own details. Schneider Control Expert calls it SFC or Grafcet and supports the full qualifier set; Rockwell Studio 5000 provides SFC routines with actions written in structured text; Siemens provides S7-GRAPH as a separate option. Smaller platforms often lack it, and there the same design is built as a state machine in ladder with a step register, which is the same discipline in a different notation. The chart is documented against the sequence of operations in the control narrative, with each step and transition named the same in both.',
      },
    ],
    faqs: [
      {
        q: 'Ladder state machine or a chart?',
        a: 'A chart when the platform supports it and the sequence has more than a handful of steps or any branching; the chart is self-documenting and the step is visible. A ladder state machine with a step register when the platform lacks charts or the maintenance staff will not touch anything else. Both need the same exits, timeouts, and aborts.',
      },
      {
        q: 'Can two charts run at once?',
        a: 'Yes, and each should own its own equipment. Two charts that command the same valve will fight. A simultaneous branch inside one chart is the way to run parallel phases of one sequence; separate charts are for separate processes.',
      },
      {
        q: 'What happens on a download or an online edit?',
        a: 'Platform dependent, and dangerous. A chart may reset to its initial step or keep its active step. Plan edits for an idle sequence, and test what the platform does before relying on it.',
      },
      {
        q: 'How do I test a chart before startup?',
        a: 'With the transitions forced or simulated one at a time, watching the actions, then with timeouts shortened, then with each abort input. A chart that has never been aborted in testing will be aborted for the first time on a bad night.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/state-machines',
      '/controls/plc-systems/programming/sequencers',
      '/controls/plc-systems/programming/iec-61131-3',
      '/controls/plc-systems/programming/structured-text',
      '/engineering-library/control-documentation/sequences-of-operation',
      '/controls/plc-systems/programming/permissives',
    ],
  },
  {
    path: '/controls/plc-systems/plc-troubleshooting/analog-signal-problems',
    kind: 'reference',
    title: 'Analog Signal Problems',
    summary:
      'The controller side of a bad analog value: raw counts against the module range, channel diagnostics, scaling that does not match the transmitter, wiring by device type, noise and filtering, resolution, and a symptom table that points at the check.',
    answer:
      'When an analog value is wrong at the controller, the fault is in one of five places and the raw count says which: the field loop, the input module and its configuration, the scaling from counts to engineering units, the filtering and data handling in the program, or the value on its way to the screen. A raw count that matches the measured loop current means the loop and the module are fine and the problem is scaling or logic; a raw count that does not means the module, its range setting, or the wiring. Module channel diagnostics report open wire, under-range, and over-range directly, and reading them is faster than any meter. Most analog problems at the controller are configuration: a channel set for the wrong range, a scaling that assumes a different count span, or a data type that clips.',
    keyPoints: [
      'Compare the raw count with the measured loop current first; that comparison splits the problem in half.',
      'Read the channel diagnostics: open wire, under-range, over-range, and module fault are reported, not inferred.',
      'Scaling must use the exact count span of the module and the exact range of the transmitter.',
      'Two-wire, three-wire, and four-wire devices are wired differently to the same module; check the terminal drawing.',
      'Noise is addressed at the source and the shield before any filter in the program.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Troubleshooting', 'Analog', '4-20 mA', 'Signals'],
    blocks: [
      { t: 'h2', text: 'Symptom to check' },
      {
        t: 'table',
        head: ['Symptom at the controller', 'First check', 'Usual finding'],
        rows: [
          ['Value frozen at a rail', 'Channel status and loop current', 'Open loop, transmitter fault current, or a scaling clamp'],
          ['Value reads zero with the transmitter lit', 'Loop current through the input; channel mode', 'Input not in the loop, channel set for voltage, or a jumper'],
          ['Value offset by a constant', 'Transmitter zero and the scaling minimum', 'A range change, a datum, or a zero drift'],
          ['Value off by a proportion', 'Scaling maximum and the count span', 'Wrong count span or transmitter span'],
          ['Value jumps or is noisy', 'Raw count trend; shield and routing', 'Noise coupled into the loop; a ground loop; a loose terminal'],
          ['Value steps in coarse increments', 'Module resolution and data type', 'A 12-bit module on a wide range, or an integer scaled too coarsely'],
          ['Value lags the process', 'Filter settings, module filter, transmitter damping', 'Too much filtering in series'],
          ['Value good in the controller, wrong on the screen', 'The screen tag scaling and format', 'A second scaling or a wrong decimal place'],
          ['Whole module bad', 'Module status, power, and backplane', 'Module fault, lost 24 volt supply, or a firmware mismatch'],
        ],
      },
      { t: 'h2', text: 'Raw counts against current' },
      {
        t: 'p',
        text: 'The module converts the loop current to a count within a fixed span: 0 to 4095, 0 to 16383, 3277 to 16383, 4000 to 20000, or another depending on the module and its range setting. The count at 4 milliamps and the count at 20 milliamps are in the module manual, and a meter in the loop with the raw count on the screen gives two points that either fall on that line or do not. If they do, everything upstream of the count is right. If they do not, the channel range setting, the wiring, or the module is wrong, and no amount of scaling will fix it.',
      },
      {
        t: 'formula',
        expr: 'EU = EU_min + (Raw − Raw_min) × (EU_max − EU_min) ÷ (Raw_max − Raw_min)',
        where: [
          'EU = engineering value',
          'Raw = the count from the module',
          'Raw_min, Raw_max = the counts at 4 and 20 mA from the module manual, for the channel range in use',
          'EU_min, EU_max = the transmitter lower and upper range values',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Two points settle it',
        text: 'A loop calibrator at 4 and at 20 milliamps, with the raw count read at each, checks the module and the wiring; the scaled value read at each checks the scaling. Four numbers, two minutes, and the argument about which side is wrong is over.',
      },
      { t: 'h2', text: 'Channel diagnostics' },
      {
        t: 'p',
        text: 'Modern input modules report per channel whether the loop is open, whether the signal is below or above range, and whether the module itself is healthy, and they make those bits available in the controller. The program should use them: a channel with open wire or out-of-range drives a bad-quality flag on the tag, freezes or fails the value safely, and raises an instrument alarm, rather than letting a rail value flow into a control loop. A module that does not offer diagnostics is checked in logic by comparing the raw count with the limits of the live range.',
      },
      { t: 'h2', text: 'Wiring by device type' },
      {
        t: 'table',
        head: ['Device', 'Powered by', 'Wires to the module', 'Note'],
        rows: [
          ['Two-wire transmitter', 'The loop, from the module or an external supply', 'Two, in series with the input', 'Know whether the module sources loop power'],
          ['Three-wire device', 'External supply, common shared with signal', 'Supply, signal, common', 'Common must be the module common'],
          ['Four-wire transmitter', 'Its own supply; isolated output', 'Two signal wires to a passive input', 'Never wire to a loop-powering input'],
          ['Voltage output device', 'Its own supply', 'Signal and common to a voltage input', 'Or a current input with the channel set for voltage'],
        ],
      },
      { t: 'h2', text: 'Noise and filtering' },
      {
        t: 'ul',
        items: [
          'Shielded twisted pair, shield grounded at one end, usually the panel, and never at both.',
          'Analog cables separated from power and drive cables; crossings at right angles.',
          'The module input filter set for the application: a slower filter rejects more noise at the cost of response time.',
          'A program filter only after the wiring is right, and only as much as the loop needs; document its time constant.',
          'A signal that is noisy only when a drive runs is a drive noise problem; the fix is at the drive and the cable, not in the filter.',
        ],
      },
      { t: 'h2', text: 'Resolution and data types' },
      {
        t: 'p',
        text: 'A 12-bit module resolves a span into 4096 steps; on a 0 to 100 foot level that is a step of about a third of an inch, which is fine, and on a 0 to 500 psi transmitter used to control a 5 psi band it is not. A 16-bit module resolves 65,536 steps. The scaled value should be a floating point tag; an integer scaled value loses resolution to its scale factor and clips at its limits, and a rate calculation from an integer level tag is a staircase.',
      },
    ],
    faqs: [
      {
        q: 'The raw count is right and the engineering value is wrong.',
        a: 'The scaling parameters: the raw minimum and maximum for the channel range actually configured, and the engineering minimum and maximum from the instrument list. One of the four is stale, most often after a transmitter re-range or a module replacement with a different count span.',
      },
      {
        q: 'Why does the channel read a small value with nothing connected?',
        a: 'An open input on some modules floats to a small count rather than zero, and the under-range diagnostic is the reliable indication. Use the channel status, not the count, to detect an open loop.',
      },
      {
        q: 'Can a module channel be damaged by a wiring mistake?',
        a: 'Yes: 24 volts applied directly across a current input, a four-wire transmitter connected to a loop-powering input, or a lightning surge. A damaged channel reads a fixed count or a fault, and the module is replaced. A surge protector on loops that leave the building prevents the third case.',
      },
      {
        q: 'How much filtering is too much?',
        a: 'When the filtered value lags the process by more than the control loop or the alarm can tolerate. Transmitter damping, the module filter, and a program filter add up; a level loop with 30 seconds of combined lag hunts. Set one filter deliberately and leave the others at minimum.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/raw-counts',
      '/controls/plc-systems/analog-control/scaling',
      '/controls/plc-systems/analog-control/filtering',
      '/controls/plc-systems/analog-control/signal-validation',
      '/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable',
      '/troubleshooting/instrumentation-troubleshooting/loop-powers-up-but-reads-zero',
    ],
  },
  {
    path: '/controls/plc-systems/plc-troubleshooting/communication-failures',
    kind: 'reference',
    title: 'Communication Failures',
    summary:
      'What to read when a controller stops talking to a device, another controller, or SCADA: port and connection status, message error codes, timeouts and retries, addressing, limits, and the order of checks that separates controller, cable, device, and network.',
    answer:
      'A controller reports its communication problems in detail if anyone looks: each port has a status, each connection has a state, each message instruction returns an error code when it fails, and each protocol driver counts timeouts and retries. Reading those first tells you whether the controller cannot reach the medium at all, can reach it but gets no answer, or gets an answer it rejects, and each of those points at a different place: the port, cable, or switch; the device address, power, or path; or the message format, data type, or register map. The controller-side checks are cheap and they come before any site visit: the port status, the connection status, the last error code, the counters, and the configuration against the network schedule.',
    keyPoints: [
      'Port status, connection state, and the message error code are the first three things to read.',
      'No link is the port, the cable, or the switch; no answer is the address, the device, or the path; a rejected answer is the message or the map.',
      'Controllers have connection and message rate limits; exceeding them fails the newest messages first.',
      'Timeouts and retries are configured per message, and set too short they cause the failures they were meant to catch.',
      'Compare every address, port, and rate against the network schedule before touching hardware.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Troubleshooting', 'Communications', 'Modbus', 'Ethernet'],
    blocks: [
      { t: 'h2', text: 'Three kinds of failure' },
      {
        t: 'table',
        head: ['What the controller shows', 'Kind', 'Look at'],
        rows: [
          ['Port down, no link, no activity', 'Cannot reach the medium', 'Port configuration, cable, switch port, media converter, serial converter'],
          ['Link up, messages time out', 'No answer', 'Device address, device power and state, routing, firewall, a gateway in the path'],
          ['Answers arrive, message errors', 'Rejected exchange', 'Function code, register address and count, data type, protocol settings, unit identifier'],
          ['Works, then fails under load', 'Rate or connection limit', 'Message count and rate, connection count, the device capacity'],
          ['Works, fails intermittently', 'Marginal medium or timing', 'Cable, noise, timeout versus device response time, a duplicate address'],
        ],
      },
      { t: 'h2', text: 'What to read' },
      {
        t: 'dl',
        items: [
          { term: 'Port status', def: 'Link, speed, duplex, and errors on an Ethernet port; signal presence and framing errors on a serial port. The module status page or the port diagnostics.' },
          { term: 'Connection status', def: 'For connected protocols: the state of each connection, its error count, and the reason for the last drop.' },
          { term: 'Message error code', def: 'Each message instruction returns a code on failure that names the cause: timeout, connection refused, bad address, bad data, path not found. The controller manual lists them; log them in a tag so the last one is visible.' },
          { term: 'Counters', def: 'Timeouts, retries, and errors per message or per device, cleared and trended. A device with a rising retry count is failing before it fails.' },
          { term: 'Configuration', def: 'Addresses, ports, baud rate and parity, unit identifiers, timeouts, and retries, against the network schedule.' },
        ],
      },
      { t: 'h2', text: 'Serial links' },
      {
        t: 'ul',
        items: [
          'Baud rate, parity, data bits, and stop bits identical at both ends; a mismatch produces framing errors or silence.',
          'RS-485 polarity, termination at both ends of the bus only, and a bias where the driver needs it.',
          'One master on the bus; a second master collides with the first.',
          'Cable length and device count within the standard; a bus that grew past its limit fails at the far end first.',
          'A converter or radio in the path has its own settings and its own turnaround time; the message timeout must exceed it.',
        ],
      },
      { t: 'h2', text: 'Ethernet links' },
      {
        t: 'ul',
        items: [
          'Address, mask, and gateway on the controller against the schedule; a missing gateway stops everything off the local network.',
          'The switch port up, at the expected speed and duplex, with no errors.',
          'The device reachable from the controller network; a firewall or a virtual network boundary in the path needs a rule.',
          'The controller connection count against its limit; every SCADA client, historian, programming session, and message consumes connections.',
          'The message rate against what the device can answer; a small device polled by several masters drops requests.',
        ],
      },
      { t: 'h2', text: 'Timeouts and retries' },
      {
        t: 'p',
        text: 'A timeout shorter than the device response plus the medium latency fails good messages; a timeout too long makes a failure take minutes to notice. Set the timeout from the measured response time with margin: a local Ethernet device that answers in 10 milliseconds can have a 500 millisecond timeout; a radio path with a two second turnaround needs five seconds. Retries follow the same reasoning: one or two on a wired link, more on a radio, and never so many that the retries themselves saturate the medium. A message that fails after retries should set a communication alarm and mark its data bad, and the program should stop sending new requests to a device that is not answering until a probe succeeds.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Log the last error',
        text: 'Move the message error code into a tag with a timestamp every time it changes. When the operator reports that the site was offline at three in the morning, the code says whether it was a timeout, a refusal, or a path error, and the visit starts in the right place.',
      },
      { t: 'h2', text: 'The order of checks' },
      {
        t: 'steps',
        items: [
          { title: 'Scope', text: 'One device, several, or everything on a port. Everything on a port is the port or the medium; one device is that device or its message.' },
          { title: 'Controller side', text: 'Port status, connection state, the error code, and the counters.' },
          { title: 'Configuration', text: 'Every setting against the schedule, on both ends.' },
          { title: 'Medium', text: 'Cable, switch port, converter, radio, termination.' },
          { title: 'Device', text: 'Power, address, state, and a direct test with a laptop tool.' },
          { title: 'Message', text: 'Function, address, count, and type against the device map; a test message from the laptop that mirrors the controller message.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'The message instruction reports an error but the device answers a laptop tool.',
        a: 'The controller message differs from the tool message: a different function code, a different address convention, a data type or count the device rejects, or a unit identifier. Compare the two requests byte for byte with the driver diagnostics or a capture.',
      },
      {
        q: 'Communications fail only when the programming software is connected.',
        a: 'The programming session consumed the last available connection or the controller communication time budget. Raise the time slice for communications or reduce the connections; check the controller limits.',
      },
      {
        q: 'How do I tell a controller port failure from a switch port failure?',
        a: 'Swap the cable to a known-good switch port; then swap the cable. If the link comes up on another switch port, the switch port was the fault; if it never comes up, the controller port or the cable is.',
      },
      {
        q: 'Should the program keep polling a device that has failed?',
        a: 'Not at full rate. Back off to a slow probe, alarm, and mark the data bad. Continuous retries to a dead device waste the controller communication budget and delay every other message.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/serial-communications',
      '/controls/plc-systems/communications/modbus-tcp',
      '/controls/plc-systems/communications/ethernet-ip',
      '/troubleshooting/communications-troubleshooting/device-times-out',
      '/troubleshooting/communications-troubleshooting/wrong-register-data',
      '/controls/plc-systems/plc-troubleshooting/network-problems',
    ],
  },
  {
    path: '/controls/plc-systems/plc-troubleshooting/network-problems',
    kind: 'reference',
    title: 'Network Problems',
    summary:
      'The controller as a network device: addressing, duplicate addresses, link speed and duplex, connection limits, packet rate and storms, multicast for remote I/O, ring protocols, and time synchronization, with the diagnostics that show which is wrong.',
    answer:
      'A controller on an Ethernet network can fail as a network device in ways that have nothing to do with its program: a wrong address or mask, a duplicate address, a port negotiating to the wrong speed, a connection table that is full, a packet rate that overloads its network interface, a broadcast storm from a loop elsewhere, or a ring protocol that has not converged. The controller web page or diagnostic display reports most of these, the managed switch reports the rest, and between them the problem is located without a program change. The same diagnostics show when the controller is the cause of the problem for everyone else, which happens when its remote I/O multicast is flooding a network that does not filter it, or when too many clients are polling it.',
    keyPoints: [
      'Read the controller network diagnostics: address, link, connections in use, packet rate, and errors.',
      'A duplicate address takes a controller off the network intermittently; the switch address table finds the other device.',
      'Every SCADA client, historian, programming session, and messaging peer uses connections; the table fills.',
      'Packet rate above what the interface can process drops I/O connections first.',
      'Remote I/O multicast, ring protocols, and time synchronization each need the switches configured to match.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Troubleshooting', 'Networking', 'Ethernet', 'Communications'],
    blocks: [
      { t: 'h2', text: 'Where to look' },
      {
        t: 'table',
        head: ['Symptom', 'Controller diagnostic', 'Switch diagnostic', 'Usual cause'],
        rows: [
          ['Controller unreachable', 'Link state, address', 'Port state, address table', 'Wrong address or mask, cable, port down'],
          ['Intermittently unreachable', 'Duplicate address warning, link flaps', 'Address learned on two ports', 'Duplicate address or a marginal cable'],
          ['Clients refused', 'Connections in use at maximum', 'Nothing', 'Connection limit reached'],
          ['I/O connections dropping', 'Packet rate, missed packets', 'Port utilization, discards', 'Overloaded interface or congested link'],
          ['Everything slow at once', 'Packet rate very high', 'Broadcast rate, processor load', 'Broadcast storm from a loop'],
          ['Remote I/O flaky through a switch', 'Connection timeouts', 'Multicast flooding or blocked', 'Multicast filtering not configured'],
          ['Ring does not heal', 'Ring status, fault location', 'Ring protocol status', 'Ring protocol misconfigured or a second break'],
          ['Timestamps wrong', 'Time source status', 'Time protocol status', 'No time source, or a boundary blocking it'],
        ],
      },
      { t: 'h2', text: 'Addressing' },
      {
        t: 'p',
        text: 'A controller with a static address and no default gateway works on its own network and answers nothing beyond it, which is fine until a historian on another network needs it. A wrong mask makes it treat remote addresses as local, so it never sends them to the gateway. A duplicate address, from a laptop, a replacement device, or a cloned configuration, produces intermittent loss as the switches learn one device and then the other. The controller address, mask, and gateway are on the network schedule; the switch address table shows where each hardware address lives.',
      },
      { t: 'h2', text: 'Connections and rate' },
      {
        t: 'p',
        text: 'Every controller has a limit on simultaneous connections and on packets per second through its interface. The limit is shared by SCADA clients, historians, programming sessions, messaging between controllers, and remote I/O. When the connection table is full, the next client is refused; when the packet rate exceeds the interface capacity, I/O connections time out first because they are the most time sensitive. The controller diagnostics show connections in use and the packet rate, and the design keeps both below about three quarters of the limit. The usual growth is a second SCADA server, a historian added later, and a few laptops left connected.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Programming sessions count',
        text: 'A laptop with the programming software online is a connection and a stream of packets. Two engineers online with a SCADA server, a historian, and a redundant server pair can fill a small controller. Go offline when not editing.',
      },
      { t: 'h2', text: 'Remote I/O and multicast' },
      {
        t: 'p',
        text: 'Some remote I/O protocols use multicast for input data. On a network of unmanaged switches every port receives the multicast, which works until the traffic grows; on managed switches the multicast is either filtered with a group management protocol and a querier, or flooded. A switch configured to filter without a querier drops the traffic after a timeout, and the I/O connection fails a few minutes after every power cycle. The switches on an I/O network are configured to match the protocol, and unicast is used where the protocol offers it.',
      },
      { t: 'h2', text: 'Rings and redundancy' },
      {
        t: 'p',
        text: 'A ring of switches or devices heals a single break only when every device on the ring runs the same protocol with the same settings and one device is the supervisor. A device in the ring that does not participate breaks the protocol and turns the ring into a loop when the break is repaired, which is the broadcast storm. The controller diagnostics show the ring state and, for device-level rings, the location of a fault; the ring should be tested by breaking it during commissioning, and the fault alarmed, because a ring with an undetected break is a line waiting for its second break.',
      },
      { t: 'h2', text: 'Time' },
      {
        t: 'p',
        text: 'Controllers stamp alarms and events, and the stamps are only useful if the clock is right. A controller with no time source drifts minutes per month; one set by SCADA has whatever error the write path adds; one synchronized by a network time protocol is within milliseconds. Whichever is used, the source and its status are on the network schedule, the controller alarm on loss of synchronization is enabled, and the boundary firewall passes the time protocol.',
      },
    ],
    faqs: [
      {
        q: 'The controller web page says the address is right but nothing can reach it.',
        a: 'The mask or the gateway, the switch port, or a firewall between. Ping from a device on the same switch first; if that works, the problem is beyond the local network, and it is the mask, the gateway, or a rule.',
      },
      {
        q: 'I/O drops every few minutes after a switch was replaced.',
        a: 'The new switch is filtering multicast without a querier, or is not configured for the ring the old one was in. Configure the switch to match the I/O protocol and the ring.',
      },
      {
        q: 'How many connections is too many?',
        a: 'Above about three quarters of the controller limit at normal operation, because failover, maintenance sessions, and retries need the rest. The limit is in the controller specifications and the current count is on its diagnostics page.',
      },
      {
        q: 'Can the controller cause a broadcast storm?',
        a: 'It can cause a multicast flood on an unfiltered network, and a controller with two ports bridged internally can close a loop if both are cabled to the same switch without ring protection. A loop between switches is the usual storm source; the controller is a rarer one.',
      },
    ],
    related: [
      '/troubleshooting/network-troubleshooting/duplicate-ip-address',
      '/troubleshooting/network-troubleshooting/broadcast-storm',
      '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
      '/controls/plc-systems/communications/remote-i-o',
      '/how-to/network-how-to/assign-ip-addresses',
      '/controls/scada-hmi/scada-troubleshooting/time-synchronization',
    ],
  },
  {
    path: '/controls/plc-systems/plc-troubleshooting/program-faults',
    kind: 'reference',
    title: 'Program Faults',
    summary:
      'Faults the program causes: an index out of range, division by zero, an invalid indirect address, a missing routine, a type mismatch, or task overlap. Reading the fault record, what a fault handler should do, clearing safely, and logic that does not fault.',
    answer:
      'A program fault is the controller refusing to execute an instruction it cannot execute safely: an index outside an array, a pointer to memory that does not exist, a divide by zero on a platform that treats it as fatal, a call to a routine that is not there, or a task that could not finish before it was due to run again. The controller records the fault type, the code, the routine, and the rung or line, and either stops with a major fault or logs a minor one and continues, depending on the fault and the platform. The record is the diagnosis; the fault handler is the place to log it and decide whether to keep running; and the prevention is defensive logic that bounds every index, checks every divisor, and validates every value that comes from a screen or a network before using it.',
    keyPoints: [
      'The fault record names the type, the routine, and the rung; read it before clearing anything.',
      'Major faults stop the controller and its outputs; minor faults are logged and execution continues.',
      'A fault handler routine can clear recoverable faults and log them, but a handler that clears everything hides a program that is broken.',
      'Bounds checks on indexes, checks on divisors, and limits on values from screens and networks prevent most program faults.',
      'Task overlap is a program fault too: the task took longer than its period.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['PLC', 'Troubleshooting', 'Programming', 'Fundamentals', 'Control'],
    blocks: [
      { t: 'h2', text: 'The common ones' },
      {
        t: 'table',
        head: ['Fault', 'What happened', 'Typical cause', 'Prevention'],
        rows: [
          ['Array index out of range', 'An index addressed beyond the array bounds', 'An index from a screen, a counter that ran past, an off-by-one loop', 'Clamp or check the index before use'],
          ['Invalid indirect address', 'A pointer or an indexed address pointed outside memory', 'Uninitialized pointer, a computed address that overflowed', 'Validate computed addresses; avoid pointers where indexes will do'],
          ['Division by zero, overflow', 'Math produced a value the type cannot hold, or divided by zero', 'A flow total divided by a runtime of zero; an integer that overflowed', 'Check the divisor; use floating point for large values'],
          ['Missing routine or block', 'A call to a routine that does not exist', 'A routine deleted or renamed; a partial download', 'Verify the project before downloading'],
          ['Type mismatch', 'An instruction received a type it cannot use', 'A tag data type changed after the logic was written', 'Verify after any tag change'],
          ['Task overlap', 'A periodic task was triggered before its previous execution finished', 'Too much logic in the task, a loop, or communications load', 'Measure the task time; move logic; fix loops'],
          ['Watchdog', 'A task exceeded its watchdog time', 'As task overlap, or an infinite loop', 'See the watchdog article'],
          ['Stack or nesting', 'Subroutine calls nested too deep, often recursive', 'A routine that calls itself through another', 'Restructure the calls'],
        ],
      },
      { t: 'h2', text: 'Reading the record' },
      {
        t: 'steps',
        items: [
          { title: 'The fault type and code', text: 'Major or minor, with a code that the controller manual maps to a description.' },
          { title: 'The location', text: 'The program, routine, and rung or line where the instruction faulted.' },
          { title: 'The values', text: 'The index, the address, or the operands at the time; the fault record or the tags at fault time show them.' },
          { title: 'The history', text: 'Whether this fault has happened before, from the fault log or the controller event log; a fault that recurs on a schedule has a cause on that schedule.' },
          { title: 'The trigger', text: 'What changed: a download, an online edit, a screen entry, a network write, a new device.' },
        ],
      },
      { t: 'h2', text: 'Fault handlers' },
      {
        t: 'p',
        text: 'Most platforms provide a fault routine that runs when a major fault occurs, and if it clears the fault the controller continues. That is useful for a fault the program can genuinely recover from, such as a bad index from a screen entry, where the handler logs the fault, resets the offending value, and lets the scan continue rather than dropping every output in the plant. It is dangerous as a blanket: a handler that clears every fault turns a broken program into one that silently skips instructions, and the first sign is a process doing something nobody programmed. The handler should log every fault with its code and location to a tag, clear only the fault codes it was written for, and count; a fault that clears more than a few times an hour is escalated to a controlled stop and an alarm.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Clearing is not fixing',
        text: 'Clearing a major fault from the programming software restarts the controller with the fault still in the program. If the cause was a screen entry, it will fault again when someone enters it; if it was a computed index, it will fault when the computation repeats. Read the record, fix the logic, then clear.',
      },
      { t: 'h2', text: 'Writing logic that does not fault' },
      {
        t: 'ul',
        items: [
          'Every index that comes from a calculation, a screen, or a network is clamped to the array bounds before it is used.',
          'Every divisor is checked for zero, and the result of a zero check is a documented default, not a skipped calculation.',
          'Values written from screens and networks land in staging tags, are validated against limits, and are then copied to the working tags.',
          'Integer math that can overflow is done in floating point or checked for range; totals use 32-bit or floating point accumulators with documented rollover.',
          'Loops have a bounded iteration count and no path that fails to advance the index.',
          'Task periods are set from measured execution times with margin, and the measured time is trended.',
          'The project is verified, and a full download is preferred to an online edit for structural changes.',
        ],
      },
      { t: 'h2', text: 'After a fault at a running plant' },
      {
        t: 'p',
        text: 'A major fault drops the outputs, which means the pumps stopped or the valves went to their fail position, and the first job is the process: confirm what state it is in and whether local control or manual operation is holding it. Then the fault record is read and saved before anything is cleared, the cause is found in the logic, and the fix is tested offline where the platform allows. The controller is restarted with the operators aware of what the outputs will do on the first scan, which is the moment a poorly designed program restarts every pump at once.',
      },
    ],
    faqs: [
      {
        q: 'The controller faulted once a week for months and cleared itself. Is that a problem?',
        a: 'Yes. A fault handler is clearing a recurring program fault, and every occurrence skipped some logic. Read the fault log for the code and location and fix the cause; then make the handler count and alarm.',
      },
      {
        q: 'How do I find which screen entry caused an index fault?',
        a: 'The fault record gives the routine and rung, which names the array and the index tag; the index tag value at fault time, and the audit trail on the screen, name the entry. Then clamp the index and limit the screen field.',
      },
      {
        q: 'Can a communications write cause a program fault?',
        a: 'Yes, when the written value is used as an index, a divisor, or a pointer without validation. Every value that enters the controller from a network is treated as untrusted and validated before use, for safety and for security.',
      },
      {
        q: 'Should I raise the task period or fix the logic when tasks overlap?',
        a: 'Fix the logic if the overlap is new or the task time has grown; raise the period if the task genuinely needs the time and the process can tolerate the slower rate. Either way, measure first and document the decision.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-troubleshooting/watchdog-faults',
      '/controls/plc-systems/plc-troubleshooting/plc-will-not-run',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/controls/plc-systems/programming/program-organization',
      '/cybersecurity/plc-security/mode-switch-and-keyswitch',
    ],
  },
  {
    path: '/controls/plc-systems/plc-troubleshooting/watchdog-faults',
    kind: 'reference',
    title: 'Watchdog Faults',
    summary:
      'A task that did not finish in time: what the watchdog protects, why the scan grew, and how to fix it. Measuring task times, finding the loop or instruction that took the time, communications load, and when raising the watchdog is legitimate.',
    answer:
      'A watchdog fault means a task ran longer than the time the controller was told to allow it, and the controller faulted rather than let the process run on stale logic. The cause is always that the task took too long, and the reasons are a program that has grown, a loop that iterated more than intended, an instruction that is slow on that platform, such as a string or array operation on a large array, communications servicing that stole the processor, or a task period and watchdog set without margin when the program was small. The fix is to measure the task time, find what grew, and either make the logic cheaper, move it to a slower task, or, when the time is legitimately needed, raise the watchdog with the reason documented. Raising the watchdog without knowing why the task got slow is turning off the alarm.',
    keyPoints: [
      'The watchdog fault says the task exceeded its allowed time; the question is what took the time.',
      'Measure: last, maximum, and average task execution time from the controller diagnostics.',
      'Loops, large array and string operations, and indirect addressing are the usual slow instructions.',
      'Communications servicing competes with logic for the processor on many platforms.',
      'Raise the watchdog only with a measured reason and a documented margin; otherwise fix the logic.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['PLC', 'Troubleshooting', 'Fundamentals', 'Programming', 'Control'],
    blocks: [
      { t: 'h2', text: 'What it protects' },
      {
        t: 'p',
        text: 'The watchdog is a timer that the task must reset by finishing. If the task does not finish, something has gone wrong that the program cannot detect from inside: an infinite loop, a hardware fault, or a load the design never anticipated. Rather than keep the outputs in whatever state the last complete scan left them, while the logic that should be updating them is stuck, the controller faults and drops the outputs to their safe state. The fault is inconvenient; the alternative is a pump running with no logic watching it.',
      },
      { t: 'h2', text: 'Why the task got slow' },
      {
        t: 'table',
        head: ['Cause', 'How it shows', 'Fix'],
        rows: [
          ['Program growth', 'Task time creeping up over months of additions', 'Move logic to periodic tasks with longer periods; remove dead code'],
          ['A loop that runs long', 'Task time jumps when a condition is true', 'Bound the iteration count; check the exit condition'],
          ['Large array or string operations', 'Time spent in a few instructions', 'Process arrays in slices; avoid string handling in fast tasks'],
          ['Indirect addressing and computed indexes', 'Slow on some platforms', 'Direct addressing where the index is constant'],
          ['Communications load', 'Task time rises when SCADA or programming sessions connect', 'Raise the communication time slice deliberately, or reduce the clients'],
          ['Too many periodic tasks', 'Tasks preempting each other; the lowest priority starves', 'Rationalize task periods and priorities'],
          ['Firmware or hardware', 'Task time rises after an update or on one controller only', 'Check release notes; test the hardware'],
          ['A watchdog set too tight', 'Fault at the first busy moment with normal times close to the limit', 'Set the watchdog from measured maximum time with margin'],
        ],
      },
      { t: 'h2', text: 'Measuring' },
      {
        t: 'steps',
        items: [
          { title: 'Read the task times', text: 'The controller reports last, maximum, and often average execution time per task. Clear the maximum and watch it through a busy period.' },
          { title: 'Compare with the period and watchdog', text: 'A periodic task should finish well inside its period; a continuous task should scan within what the process needs. A maximum near the watchdog is the problem even before it faults.' },
          { title: 'Find the expensive routines', text: 'Some platforms report time per routine; where they do not, disable routines one at a time in a test or add timestamps at routine boundaries to a diagnostic tag.' },
          { title: 'Correlate', text: 'Task time against communications activity, against a sequence step, against an operator action, to catch the loop or the condition that triggers the growth.' },
          { title: 'Trend it', text: 'Move the maximum task time to a tag, historize it, and alarm at a fraction of the watchdog. A watchdog fault should never be the first warning.' },
        ],
      },
      {
        t: 'formula',
        expr: 'Watchdog ≥ T_max × 1.5, and T_max ≤ 0.6 × Period',
        where: [
          'T_max = measured maximum task execution time under load',
          'Period = the task period for a periodic task',
          'Margins are a starting point; document the values chosen',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Raising the watchdog',
        text: 'It is legitimate when the measured maximum task time is understood, the task genuinely needs it, and the process tolerates the resulting scan. It is not legitimate as a response to a fault whose cause is unknown, because the next fault is then a longer loop, and the outputs are running on a scan nobody chose.',
      },
      { t: 'h2', text: 'After the fault' },
      {
        t: 'p',
        text: 'The fault dropped the outputs, the process is in its fail state, and the restart puts every output back on the first scan according to the logic. Before clearing, read the fault record and the task times, note which task and how long, and look at what was happening. Then restart with operators ready for what starts. If the cause is not found, the controller runs with a task time trend and an alarm until it is; a fault that happened once will happen again, and the second time it should be caught before the watchdog does.',
      },
    ],
    faqs: [
      {
        q: 'The task time is normally 8 milliseconds and the watchdog is 500. How did it fault?',
        a: 'Something took 500 milliseconds once: a loop with a condition that let it run thousands of times, a string operation on a large array, or a communications burst on a platform that services communications inside the task. The maximum time and the fault record show which task; the correlation shows what triggered it.',
      },
      {
        q: 'Does a faster processor fix it?',
        a: 'It buys time, and it hides a loop that will still run away. Fix the logic first; upgrade when the program legitimately needs more capacity.',
      },
      {
        q: 'Should the fault handler clear a watchdog fault?',
        a: 'No. A watchdog fault means the program did not complete; clearing it and continuing means running with outputs that a stuck task may not have updated. Stop, alarm, and restart under control.',
      },
      {
        q: 'Why does the task time rise when the programming laptop connects?',
        a: 'The controller services the programming session from the same processor and, on many platforms, from a time slice inside the scan. Online monitoring of many tags, cross-reference searches, and uploads all add load. Go offline when not editing, and set the communication time slice deliberately.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/controls/plc-systems/plc-troubleshooting/program-faults',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
      '/controls/plc-systems/programming/program-organization',
    ],
  },
];
