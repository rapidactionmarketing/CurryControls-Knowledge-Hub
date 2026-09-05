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
];
