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
];
