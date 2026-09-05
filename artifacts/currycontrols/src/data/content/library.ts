import type { Entry } from '../content-types';

/** Engineering Library: the documents a control system is designed, built, and handed over with. */
export const LIBRARY_ENTRIES: Entry[] = [
  {
    path: '/engineering-library/drawings/p-and-id-drawings',
    kind: 'reference',
    title: 'How to Read a P&ID',
    summary:
      'What a piping and instrumentation diagram shows, how ISA-5.1 tag bubbles and line types encode the control system, and how to trace a loop across sheets.',
    answer:
      'A piping and instrumentation diagram (P&ID) is the drawing that shows every pipe, vessel, valve, and instrument in a process and how they connect. Its instrument symbols follow ISA-5.1: a tag such as FT-101 names the measured variable and the function, the bubble shape says where the device lives, and the line style says how signals travel. Read it loop by loop, not left to right.',
    keyPoints: [
      'The tag letters follow ISA-5.1: the first letter is the measured variable, the rest are the functions performed.',
      'Bubble decoration says where a device is: field, control room panel, behind the panel, or in a shared control system.',
      'Line style distinguishes process piping from pneumatic, electrical, and software signals.',
      'A loop number ties a transmitter, its controller, and its final element together across sheets.',
      'Valve failure position, FC or FO, is on the drawing and it is a design decision, not a default.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Documentation', 'ISA', 'Instrumentation', 'Engineering'],
    blocks: [
      { t: 'h2', text: 'What a P&ID is for' },
      {
        t: 'p',
        text: 'A process flow diagram shows what the plant does. A P&ID shows how it is instrumented and controlled. Every pipe with its size and material, every vessel with its nozzles, every valve with its type and failure position, and every instrument with a tag number is on it. It is the drawing a controls engineer reads first, because the control philosophy is written into it: what is measured, what is controlled, and what closes when something goes wrong.',
      },
      {
        t: 'p',
        text: 'A P&ID is not a wiring diagram and not a layout. It does not tell you where a device physically sits or how it is terminated. It tells you what the device is, what loop it belongs to, and how it relates to the process. The loop sheets, the schematics, and the panel drawings are built from it.',
      },
      { t: 'h2', text: 'Reading a tag' },
      {
        t: 'p',
        text: 'Instrument tags follow ISA-5.1, Instrumentation Symbols and Identification. A tag has a letter code and a loop number. In FT-101 the letters say what the device is and the number says which loop it belongs to.',
      },
      {
        t: 'p',
        text: 'The first letter is the measured or initiating variable. The letters that follow describe functions, read in order. A modifier letter can qualify either part, which is where most confusion starts.',
      },
      {
        t: 'table',
        caption: 'First letters that appear on nearly every drawing',
        head: ['Letter', 'Measured variable', 'Example tag'],
        rows: [
          ['F', 'Flow', 'FT-101, flow transmitter'],
          ['L', 'Level', 'LSH-205, level switch high'],
          ['P', 'Pressure', 'PIT-310, pressure indicating transmitter'],
          ['T', 'Temperature', 'TE-402, temperature element'],
          ['A', 'Analysis', 'AIT-510, analyzer indicating transmitter, such as chlorine or pH'],
          ['H', 'Hand', 'HS-120, hand switch'],
          ['Z', 'Position', 'ZSC-118, position switch closed'],
          ['S', 'Speed', 'ST-130, speed transmitter'],
        ],
      },
      {
        t: 'table',
        caption: 'Succeeding letters, which describe function',
        head: ['Letter', 'Function', 'Meaning on the drawing'],
        rows: [
          ['T', 'Transmit', 'Converts the measurement to a signal the control system can read'],
          ['I', 'Indicate', 'Displays the value locally or on a screen'],
          ['C', 'Control', 'Performs automatic control'],
          ['S', 'Switch', 'Produces a discrete contact at a setpoint'],
          ['E', 'Element', 'The primary sensing element, such as a thermocouple or an orifice plate'],
          ['V', 'Valve', 'The final control element'],
          ['Y', 'Relay, compute, convert', 'A solenoid, an I/P converter, or a calculation'],
          ['A', 'Alarm', 'An annunciated condition'],
          ['H, L, HH, LL', 'High, low, high-high, low-low', 'Modifiers on switches and alarms'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The same letter means different things in different positions',
        text: 'A as a first letter is analysis. A as a succeeding letter is alarm. T first is temperature; T after is transmit. FT is a flow transmitter, TT is a temperature transmitter, and TAH is a temperature alarm high. Read the position, not just the letter.',
      },
      { t: 'h2', text: 'Reading the bubble' },
      {
        t: 'p',
        text: 'The shape around the tag says what kind of device it is, and the line through it says where it is. This is the part of the drawing that tells you whether a function lives in the field, on a panel, or in software.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Circle', def: 'A discrete instrument: a physical transmitter, switch, gauge, or single-loop controller.' },
          { term: 'Square with a circle inside', def: 'A function in a shared display and control system, which in most plants means the SCADA or DCS.' },
          { term: 'Hexagon', def: 'A computer function, used for calculations and software that are not part of the main control system.' },
          { term: 'Diamond inside a square', def: 'A function in a programmable logic controller.' },
          { term: 'No line through the symbol', def: 'Field mounted.' },
          { term: 'Solid horizontal line', def: 'Mounted on a control panel or in the control room, accessible to the operator.' },
          { term: 'Dashed horizontal line', def: 'Mounted behind the panel or otherwise not accessible to the operator.' },
          { term: 'Double horizontal line', def: 'Mounted on a local or auxiliary panel in the field.' },
        ],
      },
      { t: 'h2', text: 'Reading the lines' },
      {
        t: 'p',
        text: 'Process piping is drawn with a heavy solid line and carries a line number giving size, service, material, and often insulation. Everything else is a signal, and the line style says what kind.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Solid line', def: 'A process connection or a mechanical link.' },
          { term: 'Dashed line', def: 'An electrical signal, which in practice is a 4-20 mA loop, a discrete contact, or a control wire.' },
          { term: 'Line with double slashes', def: 'A pneumatic signal, usually 3-15 psi to a valve positioner.' },
          { term: 'Line with small circles', def: 'A software or data link inside the control system.' },
          { term: 'Line with an L shape repeated', def: 'A capillary tube, used on filled-system temperature and level instruments.' },
        ],
      },
      { t: 'h2', text: 'Tracing a loop' },
      {
        t: 'p',
        text: 'The loop number is the thread. Pick a transmitter, note its number, and find every other device with that number: the controller function in the SCADA bubble, the valve or drive it acts on, the switches that trip it, the alarms it raises. On a large drawing set the loop crosses sheets, and an off-page connector with a sheet reference carries it across. Follow the number, not the lines.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Start at the measurement.', text: 'Find the element and transmitter. Their tag tells you the variable and the loop number.' },
          { title: 'Find the controller.', text: 'Look for the same loop number with a C in the function letters, usually in a shared-display bubble. That is where the setpoint lives.' },
          { title: 'Find the final element.', text: 'The valve, drive, or motor the controller acts on. Note the failure position marked beside a valve: FC fails closed, FO fails open, FL fails last position.' },
          { title: 'Find the protection.', text: 'Switches and alarms carrying the same number with H, L, HH, or LL modifiers. These are interlocks and alarms and they will be in the control narrative.' },
          { title: 'Check the sheet references.', text: 'Off-page connectors carry the loop to other sheets. Follow every one before deciding you understand the loop.' },
        ],
      },
      { t: 'h2', text: 'What the drawing decides for you' },
      {
        t: 'p',
        text: 'Several controls decisions are already made on the P&ID and it is worth reading them deliberately. The failure position of every valve is a safety decision made by the process engineer, and the controls have to honor it. The location of a function, field or panel or control system, determines what hardware is needed and what happens on a communication failure. The presence of a switch alongside a transmitter, LSH beside LT, says the designer wanted hardwired protection independent of the software.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A P&ID that disagrees with the panel is a defect, not a curiosity',
        text: 'When the drawing shows a hardwired high-level switch and the panel only has a transmitter feeding a software alarm, the protection the designer intended does not exist. Raise it before startup, not after the overflow.',
      },
      { t: 'h2', text: 'Related documents' },
      {
        t: 'p',
        text: 'The P&ID is the parent of the instrument list, the I/O list, the loop sheets, and the control narrative. When it changes, all of them change. A drawing set where those documents do not agree with the P&ID is a set where somebody stopped maintaining one of them, and the P&ID is usually the one to trust.',
      },
    ],
    faqs: [
      {
        q: 'What does the number in an instrument tag mean?',
        a: 'It is the loop number. Every device that belongs to the same control loop carries the same number, which is how you trace a measurement to its controller and final element across a drawing set. Some plants prefix it with a unit or area number.',
      },
      {
        q: 'What is the difference between a P&ID and a PFD?',
        a: 'A process flow diagram (PFD) shows major equipment and main process streams with flows and conditions. A P&ID adds every line, valve, and instrument and the control scheme. The PFD explains the process; the P&ID specifies it.',
      },
      {
        q: 'What do FC and FO mean next to a valve?',
        a: 'Fail closed and fail open: the position the valve takes on loss of air or power. FL means fail last, meaning it stays where it was. The choice is a safety decision and the control system must respect it.',
      },
      {
        q: 'Which standard defines P&ID symbols?',
        a: 'ISA-5.1, Instrumentation Symbols and Identification, defines the tag letters, bubble shapes, and line types used on most P&IDs in North America. Many owners publish a legend sheet with their own additions, and the legend on the drawing set governs where it differs.',
      },
    ],
    related: [
      '/engineering-library/control-documentation/control-narratives',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/engineering-library/lists-and-schedules/instrument-lists',
      '/engineering-library/standards/isa',
    ],
  },
  {
    path: '/engineering-library/control-documentation/control-narratives',
    kind: 'reference',
    title: 'Control Narratives',
    summary:
      'What a control narrative is, what it must contain, how to write statements that can be tested, and how it drives programming, FAT, and the owner’s acceptance.',
    answer:
      'A control narrative is the plain-language document that says what a control system does: its modes, its normal operation, its setpoints, its interlocks and permissives, its alarms, and what it does when something fails. It is written before the program, tested against during FAT and SAT, and it is the document the owner holds the integrator to. Every sentence in it should be something a test can pass or fail.',
    keyPoints: [
      'The narrative describes behavior, not implementation: what happens, under what conditions, not which rung does it.',
      'Modes come first: hand, off, auto, local, remote, and what each one does and does not permit.',
      'Every interlock, permissive, and alarm is listed with its condition, its setpoint, its response, and how it resets.',
      'Failure behavior is stated explicitly: loss of signal, loss of communications, loss of power.',
      'If a statement cannot be turned into a test step, it is not finished.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Documentation', 'Engineering', 'Commissioning'],
    blocks: [
      { t: 'h2', text: 'What the narrative is and is not' },
      {
        t: 'p',
        text: 'The control narrative, also called a functional description or a description of operation, is the bridge between the process engineer who knows what the plant must do and the programmer who must make it do it. It is written in ordinary sentences, organized by system, and it describes behavior from the outside: when the wet well reaches the lead start level, the lead pump starts. It does not say how the logic is arranged.',
      },
      {
        t: 'p',
        text: 'That separation is the point. A narrative that describes rungs and tags is a program listing in prose, and nobody outside the programmer can review it. A narrative that describes behavior can be read by the operator who will run the plant, the engineer who designed the process, and the inspector who will witness the test, and each of them can say whether it is right.',
      },
      { t: 'h2', text: 'What it must contain' },
      {
        t: 'p',
        text: 'The structure below is what a complete narrative covers for each system or piece of equipment. The order matters less than the coverage; a missing section is a decision that will get made in the field by whoever is standing there.',
      },
      {
        t: 'ol',
        items: [
          'System overview: what the equipment is, what it does, and the instruments and final elements involved, by tag.',
          'Modes of operation: every selector position, hand, off, auto, local, remote, and exactly what is and is not permitted in each.',
          'Normal automatic operation: the sequence, the setpoints, the timers, and the conditions that move the system from one state to the next.',
          'Permissives: the conditions that must be true before something is allowed to start.',
          'Interlocks: the conditions that stop or prevent operation, whether they are hardwired or in software, and how each one resets.',
          'Alarms: every alarm, its condition, its setpoint and delay, its priority, and the response expected of the operator.',
          'Failure modes: what happens on loss of a signal, loss of communications, loss of power, and on return of each.',
          'Operator interface: what is displayed, what can be adjusted, and the range and limits of every adjustable value.',
          'Startup and shutdown: how the system is brought up from cold and taken down, and what state everything is left in.',
        ],
      },
      { t: 'h2', text: 'Writing statements that can be tested' },
      {
        t: 'p',
        text: 'The discipline that separates a useful narrative from a vague one is that every operational statement can be turned into a test step with an expected result. If a sentence cannot be tested, it is either an aspiration or it is hiding a decision.',
      },
      {
        t: 'table',
        caption: 'Vague statements and the testable versions of them',
        head: ['Vague', 'Testable'],
        rows: [
          ['The pump runs when the level is high.', 'In auto, when wet well level rises to the lead start setpoint (initial value 6.0 ft), the lead pump starts after a 5 second delay.'],
          ['The system alarms on high level.', 'When level exceeds the high level alarm setpoint (initial value 8.0 ft) for 10 seconds, a high priority alarm LAH-101 is annunciated. The alarm clears when level falls 0.5 ft below the setpoint.'],
          ['The pumps alternate.', 'On each stop of the lead pump in auto, the lead designation transfers to the other pump. Alternation can be disabled from the HMI, in which case P-1 remains lead.'],
          ['The system handles communication loss.', 'On loss of communication with SCADA for 30 seconds, the station continues in auto on local setpoints. Remote setpoint changes are ignored until communication is restored and the operator acknowledges the restoration.'],
          ['The VFD runs at the right speed.', 'In auto, the drive speed reference is the output of pressure controller PIC-201 (setpoint initial value 65 psi), limited to 40 to 100 percent.'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Give every setpoint an initial value and a range',
        text: 'A setpoint without an initial value gets invented at startup. A setpoint without a range gets set to something unsafe from the HMI. State both, and state who is allowed to change it.',
      },
      { t: 'h2', text: 'The modes section is where most disputes come from' },
      {
        t: 'p',
        text: 'Hand-off-auto sounds simple until someone asks what hand means. Does hand bypass the high level interlock? Does it bypass the motor overload? Can the operator put a pump in hand from the HMI or only at the panel? Does remote mean SCADA can start the pump, or only change setpoints? Every one of those questions has a defensible answer, and the wrong one is the one nobody wrote down. A good narrative states, for each mode, what the equipment does, which protections remain active, and where the command can come from.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Interlocks that protect people must not be bypassed by a mode',
        text: 'State which interlocks are safety interlocks and that they remain active in every mode including hand. Equipment-protection interlocks may be bypassed in hand by a deliberate design decision; safety interlocks may not, and the narrative should say so in those words.',
      },
      { t: 'h2', text: 'How the narrative is used' },
      {
        t: 'dl',
        items: [
          { term: 'Programming', def: 'The programmer builds the logic to satisfy the narrative and nothing else. Behavior that is not in the narrative is a question, not a feature.' },
          { term: 'HMI design', def: 'The operator interface section defines what screens must show and what values must be adjustable, which fixes the tag list for the HMI.' },
          { term: 'Factory acceptance test', def: 'The FAT procedure is the narrative rewritten as steps with expected results. A narrative that was written to be testable makes the FAT procedure almost mechanical to produce.' },
          { term: 'Site acceptance test', def: 'The same steps performed on real equipment, with the narrative as the reference for what correct looks like.' },
          { term: 'Operations and maintenance', def: 'Years later, the narrative is how a new operator learns what the system is supposed to do, and how a technician decides whether a behavior is a fault or a feature.' },
        ],
      },
      { t: 'h2', text: 'Keeping it alive' },
      {
        t: 'p',
        text: 'The narrative changes during design, during FAT, and during startup, and every change should go back into the document with a revision. A narrative that stops at issued-for-construction while the program keeps changing is a document that describes a plant that no longer exists. The final revision, issued as-built, belongs in the O&M manual beside the drawings and the program backup.',
      },
      {
        t: 'p',
        text: 'Where the narrative, the sequence of operations, and the cause and effect matrix all exist for the same system, they must agree. The narrative is the prose, the sequence is the ordered version of it, and the matrix is the tabulated interlocks and alarms. They are three views of one design, and the narrative is normally the one the others are checked against.',
      },
    ],
    faqs: [
      {
        q: 'Who writes the control narrative?',
        a: 'On most projects the design engineer writes the first issue as part of the specification, and the integrator revises it through programming and testing. On design-build work the integrator often writes it from the process description. Whoever writes it, the owner approves it, because it is the definition of what they are buying.',
      },
      {
        q: 'How is a control narrative different from a sequence of operations?',
        a: 'A sequence of operations is the ordered, step-by-step form: first this happens, then that. A narrative covers the same behavior but also describes modes, interlocks, alarms, and failure handling that are not sequential. Many projects use the term interchangeably, and what matters is the coverage, not the title.',
      },
      {
        q: 'How detailed should it be?',
        a: 'Detailed enough that two competent programmers working from it independently would produce systems that behave the same way. Setpoints, delays, ranges, and reset conditions are the details that get lost first, and they are the ones that matter.',
      },
      {
        q: 'Should the narrative reference tag numbers?',
        a: 'Yes. Behavior is described in words, but the instruments and equipment involved are identified by their P&ID tags so the narrative, the drawings, and the program all refer to the same things by the same names.',
      },
    ],
    related: [
      '/engineering-library/drawings/p-and-id-drawings',
      '/engineering-library/control-documentation/sequences-of-operation',
      '/engineering-library/control-documentation/cause-and-effect',
      '/engineering-library/checklists/fat',
      '/controls/plc-systems/programming/interlocks',
    ],
  },
];
