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
];
