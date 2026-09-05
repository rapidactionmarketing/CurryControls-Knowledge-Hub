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
  {
    path: '/engineering-library/control-documentation/sequences-of-operation',
    kind: 'reference',
    title: 'Sequences of Operation',
    summary:
      'Writing the ordered, step-by-step description of what a system does: states, transitions, timeouts, and the format that lets a programmer implement it and a tester verify it without interpretation.',
    answer:
      'A sequence of operation describes a system as an ordered set of steps, each with what happens in it, what condition moves to the next step, and what happens if that condition never comes. It is the part of the control narrative that is sequential, and it is written as numbered steps with explicit transitions so that the programmer builds the same state machine the tester checks. Startup, shutdown, backwash, and any batch process are sequences; continuous control is not.',
    keyPoints: [
      'A sequence is a list of states. Each state says what is on, what is off, and what condition leaves it.',
      'Every transition has a condition, and every condition has a timeout with a defined response.',
      'Write what the equipment does, not how the logic does it; the programmer chooses the implementation.',
      'A sequence that cannot be drawn as a diagram of boxes and arrows is not a sequence yet.',
      'Abnormal exits, stop, fault, and power loss, are steps too, and they are the ones that get left out.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Documentation', 'Engineering', 'Programming', 'Commissioning'],
    blocks: [
      { t: 'h2', text: 'What is sequential and what is not' },
      {
        t: 'p',
        text: 'A pressure loop holding a setpoint is continuous: it does the same thing every scan, and describing it is a matter of stating the loop, the setpoint, and the limits. Starting a plant is sequential: the intake valve opens, then the pump starts when the valve is proven open, then the discharge valve opens when pressure is established, then the chemical feed starts when flow is confirmed, and each step waits for the one before. Filter backwash, lift station pump-down with a flush cycle, generator transfer, and any process that goes through phases are sequences. The narrative describes both; the sequence of operation is the form the sequential parts take.',
      },
      { t: 'h2', text: 'The form' },
      {
        t: 'p',
        text: 'A sequence is written as numbered steps, and every step has the same four parts.',
      },
      {
        t: 'dl',
        items: [
          { term: 'The step name and number', def: 'A short name the HMI can display and the program can use as a state name: Step 3, Establish Flow.' },
          { term: 'What is commanded in the step', def: 'Every output that changes on entering the step, and the state of everything else, stated so that nothing is assumed.' },
          { term: 'The transition condition', def: 'The condition that moves to the next step: flow above 100 gpm for 10 seconds; valve open limit switch made; timer expired. Measurable, with tags and values.' },
          { term: 'The timeout and its response', def: 'How long the step waits for the transition before something else happens, and what that something is: alarm and hold, alarm and abort to a safe step, or retry.' },
        ],
      },
      {
        t: 'table',
        caption: 'A sequence written in the form: booster pump start',
        head: ['Step', 'Actions', 'Transition', 'Timeout'],
        rows: [
          ['1 Ready', 'All outputs off. Suction valve open limit made.', 'Start command in Auto and permissives satisfied', 'None; the sequence waits here'],
          ['2 Open discharge valve', 'Command discharge valve to open', 'Discharge valve open limit switch made', '30 s: alarm Valve Failed To Open, go to step 9'],
          ['3 Start pump', 'Start pump at minimum speed', 'Run feedback within 5 s and discharge pressure above 10 psi within 20 s', '20 s: alarm Pump Failed To Start, go to step 9'],
          ['4 Ramp', 'Release speed to the pressure controller', 'Pressure within 5 psi of setpoint', '120 s: alarm Failed To Reach Pressure, continue to step 5'],
          ['5 Run', 'Pressure control active', 'Stop command, or a trip condition', 'None'],
          ['6 Stop', 'Ramp pump to minimum speed', 'Speed at minimum', '30 s: continue'],
          ['7 Close valve', 'Stop pump; command discharge valve to close', 'Discharge valve closed limit made', '30 s: alarm Valve Failed To Close, continue'],
          ['8 Complete', 'Return to step 1', 'Immediate', 'None'],
          ['9 Abort', 'Stop pump; close discharge valve; hold', 'Operator reset', 'None; the sequence waits for a person'],
        ],
      },
      { t: 'h2', text: 'The rules' },
      {
        t: 'ul',
        items: [
          'One step at a time. If two things can happen in parallel, they are two sequences, or the step commands both and waits for both.',
          'Every transition is a measurable condition with a value and, where it matters, a duration. Not "when the pump is running" but "run feedback made for 5 seconds".',
          'Every wait has a timeout. A step that waits forever for a limit switch that never makes is a plant that hangs quietly.',
          'The abnormal exits are steps. Stop, emergency stop, trip, loss of communication, loss of power, and operator abort each land in a defined step with defined actions.',
          'Steps command outputs; they do not describe rungs. "Start the pump" is the sequence; how the start is implemented is the program.',
          'The step number is displayed on the HMI. An operator who can see "Step 3, waiting for discharge pressure" can help; one who sees "Starting" cannot.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Draw it first',
        text: 'Boxes for steps, arrows for transitions labelled with their conditions, and a separate arrow from every step for its timeout. If the drawing has an arrow with no label, a step with no way out, or a condition nobody can measure, the sequence is not finished. The drawing is also the state machine the programmer implements, in a sequential function chart or in ladder, one step bit at a time.',
      },
      { t: 'h2', text: 'Power loss and restart' },
      {
        t: 'p',
        text: 'The step the sequence was in when power failed is not the step it should resume in. The equipment has moved, the timers have not been counting, and the conditions that were true are not. A sequence defines where it goes on power-up, usually to the ready step or the abort step, and whether it restarts automatically or waits for a person. That decision belongs in the sequence, and it is tested at FAT by removing power in every step.',
      },
      { t: 'h2', text: 'Relation to the other documents' },
      {
        t: 'p',
        text: 'The control narrative holds the sequence, or refers to it, and adds the modes, the interlocks, and the alarms around it. The cause and effect matrix tabulates the trip conditions that force the abort step. The FAT procedure walks the sequence step by step, with each transition forced and each timeout allowed to expire. The program implements it as a state machine, and the HMI shows the step. When any of those disagree, the sequence document is normally the one they are reconciled to.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a sequence of operation and a control narrative?',
        a: 'The sequence is the ordered, step-by-step part: first this, then that, with the conditions between. The narrative is the whole description, including the sequence and also the modes, interlocks, alarms, and failure handling that are not sequential. On small systems the terms are used interchangeably.',
      },
      {
        q: 'How detailed should the steps be?',
        a: 'Detailed enough that two programmers working independently would build systems that behave identically, and that a tester can force every transition and expire every timeout. Tags, values, and durations on every transition.',
      },
      {
        q: 'Do I need a timeout on every step?',
        a: 'On every step that waits for something to happen, yes, with a stated response. Steps that wait for a command from a person can wait indefinitely, and the document says so.',
      },
      {
        q: 'How does a sequence become a program?',
        a: 'As a state machine: one active step at a time, each step setting its outputs, and transitions moving between them. A sequential function chart implements it directly; ladder does it with a step bit or a step number and the transitions as rungs. The state machines page covers the pattern.',
      },
    ],
    related: [
      '/engineering-library/control-documentation/control-narratives',
      '/engineering-library/control-documentation/cause-and-effect',
      '/controls/plc-systems/programming/state-machines',
      '/controls/plc-systems/programming/sequential-function-chart',
      '/engineering-library/checklists/fat',
    ],
  },
  {
    path: '/engineering-library/control-documentation/cause-and-effect',
    kind: 'reference',
    title: 'Cause and Effect Matrices',
    summary:
      'The table that lists every trip condition against every action it causes: how to build one, what goes in the cells, how it distinguishes hardwired from software protection, and how it becomes the test.',
    answer:
      'A cause and effect matrix has a row for every condition that must cause a protective action and a column for every action, with a mark in each cell where one causes the other. It is the most compact statement of a system’s interlocks and trips, it is how a reviewer confirms that a hazard has a response and a response has a cause, and it is the test procedure for the protection once the rows are numbered. It grew up in process safety and it is just as useful for a pump station.',
    keyPoints: [
      'Rows are causes: a measured condition with a tag, a limit, and a delay. Columns are effects: an action on a specific piece of equipment.',
      'A cell mark says this cause produces this effect; the matrix shows at a glance what trips what.',
      'Each row states whether the protection is hardwired, in the controller, or both, and how it resets.',
      'The matrix is the test: force each cause and confirm every marked effect, and no unmarked one.',
      'It documents interlocks that already exist as much as it designs new ones, and it finds the ones nobody wrote down.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Documentation', 'Engineering', 'Design', 'Commissioning'],
    blocks: [
      { t: 'h2', text: 'The shape of it' },
      {
        t: 'p',
        text: 'A cause and effect matrix is a grid. Down the left are the causes, one per row: high wet well level, low suction pressure, motor overload, seal failure, emergency stop, loss of communication. Across the top are the effects, one per column: stop pump 1, stop pump 2, start both pumps, close valve, alarm high priority, dial out. A mark in a cell means the cause on that row produces the effect in that column. An empty cell means it does not. The whole protective design of a system is visible on one sheet.',
      },
      {
        t: 'table',
        caption: 'A fragment for a duplex lift station',
        head: ['Cause', 'Tag and limit', 'Stop P1', 'Stop P2', 'Run both', 'Alarm', 'Type'],
        rows: [
          ['High high level', 'LSHH-101 float', '', '', 'X', 'X high', 'Hardwired and software'],
          ['Low low level', 'LSLL-101 float', 'X', 'X', '', 'X medium', 'Hardwired'],
          ['P1 overload', 'OL-P1 contact', 'X', '', '', 'X medium', 'Hardwired'],
          ['P1 seal failure', 'MSF-P1', '', '', '', 'X low', 'Software'],
          ['P1 high temperature', 'TSH-P1', 'X', '', '', 'X medium', 'Hardwired'],
          ['Emergency stop', 'HS-ES', 'X', 'X', '', 'X high', 'Hardwired'],
          ['Level transmitter bad', 'LT-101 quality', '', '', '', 'X medium', 'Software; control to floats'],
        ],
      },
      { t: 'h2', text: 'What goes in a row' },
      {
        t: 'dl',
        items: [
          { term: 'The cause', def: 'A named condition: high high level, not "level problem".' },
          { term: 'The initiating device', def: 'The tag of the switch, transmitter, or contact that detects it, and the limit and any delay that define it.' },
          { term: 'The type', def: 'Hardwired, meaning the action happens through relays and contacts without the controller; software, meaning the controller does it; or both, meaning the controller does it and the hardwired circuit backs it up. This column is the one that reviewers care about most.' },
          { term: 'The reset', def: 'Whether the effect clears when the cause clears, or latches until an operator resets it, and where the reset is.' },
          { term: 'The notes', def: 'Bypass provisions, testing intervals, and the reference to the narrative or the drawing.' },
        ],
      },
      { t: 'h2', text: 'Building it' },
      {
        t: 'steps',
        items: [
          { title: 'List the effects first.', text: 'Every protective action the system can take, per piece of equipment: stop, start, close, open, inhibit start, alarm at each priority, notify. These are the columns.' },
          { title: 'List the hazards.', text: 'From the process, the P&ID, and the equipment manuals: overflow, dry run, overpressure, overload, overheating, loss of a utility. Each becomes a cause row with its detecting device.' },
          { title: 'Fill the cells.', text: 'For each cause, mark every effect it must produce. Argue about the empty cells as much as the marked ones: a high level that does not start the second pump is a decision.' },
          { title: 'Assign the type.', text: 'Decide which rows are hardwired. Anything that protects a person, and anything that must work when the controller does not, is hardwired. The rest may be software.' },
          { title: 'Number the rows and columns.', text: 'The numbers are how the FAT procedure and the program comments refer to them.' },
          { title: 'Review it with operations.', text: 'The people who run the plant know the causes the designers did not list.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'The type column is where safety lives',
        text: 'A protection that exists only in software fails when the controller faults, when a module fails, when a program change breaks it, or when a force is left on. A row that protects a person, a high high level that prevents a flood, a low level that prevents a dry run of a pump someone is standing beside, is hardwired, and the matrix says so. Where a safety instrumented function is required, IEC 61511 governs and the matrix is the start of that work, not the end.',
      },
      { t: 'h2', text: 'Using it' },
      {
        t: 'p',
        text: 'The programmer implements each software row as an interlock, commented with the row number. The panel builder wires each hardwired row and marks the drawing with it. The FAT and SAT procedures test the matrix row by row: force the cause, confirm each marked effect happens and each unmarked one does not, clear the cause, confirm the reset behaves as the row says. When the plant changes, the matrix changes first and the program and the drawings follow. A matrix that is kept current is the fastest answer to the question a new operator asks most: what will this do if that happens.',
      },
      { t: 'h2', text: 'On an existing plant' },
      {
        t: 'p',
        text: 'Most plants have never had one. Building a matrix for an existing system means reading the program and the drawings and writing down what actually trips what, which is a day of work per panel and always turns up an interlock nobody remembered, a bypass that was never removed, or a protection that exists on the drawing and not in the panel. It is the single most useful document an integrator can produce for a plant they are about to modify.',
      },
    ],
    faqs: [
      {
        q: 'What is a cause and effect matrix used for?',
        a: 'To state, in one table, every condition that triggers a protective action and every action it triggers. It is the design record of the interlocks, the review tool for finding gaps, and the test procedure for proving them.',
      },
      {
        q: 'Is it only for safety systems?',
        a: 'It came from process safety, and it is equally useful for ordinary equipment protection in a pump station or a treatment plant. Any system with more than a handful of interlocks benefits from having them in one table.',
      },
      {
        q: 'How does it relate to the control narrative?',
        a: 'The narrative describes the interlocks in prose; the matrix tabulates them. They must agree, and the matrix is easier to check for completeness because an empty cell is visible in a way a missing sentence is not.',
      },
      {
        q: 'Should every row be hardwired?',
        a: 'No. Rows that protect people or that must work without the controller are hardwired. Equipment protection that can tolerate a controller fault is often software alone. The column that states which is the point of the exercise.',
      },
    ],
    related: [
      '/engineering-library/control-documentation/control-narratives',
      '/engineering-library/control-documentation/sequences-of-operation',
      '/controls/plc-systems/programming/interlocks',
      '/engineering-library/checklists/fat',
      '/engineering-library/drawings/p-and-id-drawings',
    ],
  },
  {
    path: '/engineering-library/checklists/fat',
    kind: 'reference',
    title: 'Factory Acceptance Testing',
    summary:
      'Testing a control system before it leaves the shop: what must exist before the test, how the procedure is built from the narrative and the matrix, how the field is simulated, what is witnessed, and what the punch list and the sign-off mean.',
    answer:
      'A factory acceptance test proves, in the shop, that the panel and the program do what the approved documents say, before either goes to the site where problems cost ten times as much to fix. It needs a finished panel, a finished program, an approved narrative and cause and effect matrix, and a procedure derived from them step by step. The field is simulated with switches, signal sources, and a simulation program, the owner witnesses, every deviation goes on a punch list, and the sign-off says the system is fit to ship, not that it is finished.',
    keyPoints: [
      'The FAT tests against documents. If the narrative is not approved, there is nothing to test against.',
      'The procedure is the narrative and the cause and effect matrix rewritten as steps with expected results.',
      'Every I/O point is exercised, every sequence is walked, every interlock is forced, and every alarm is raised and acknowledged.',
      'Failure modes are tested on purpose: pull the cable, fail the transmitter, kill the power.',
      'The punch list is the output. Nothing on it is fixed silently; each item is closed and re-tested.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Commissioning', 'Documentation', 'Engineering', 'Panels'],
    blocks: [
      { t: 'h2', text: 'Why test in the shop' },
      {
        t: 'p',
        text: 'A wiring error found on the shop floor is fixed in ten minutes with the panel open on a bench. The same error found at the site is found at three in the afternoon with a crane waiting, a contractor billing, and the old system already disconnected. A logic error found in the shop is a conversation; found at startup it is an overflow. The FAT exists to move the discovery of errors to the place where they are cheap, and it works only if it is a real test rather than a demonstration.',
      },
      { t: 'h2', text: 'Before the test' },
      {
        t: 'ul',
        items: [
          'The panel is complete, inspected against the drawings, and has passed its own shop checks: point-to-point wiring, insulation, and power-up.',
          'The program is complete against the narrative and has been checked by someone other than its author.',
          'The control narrative, the sequences, the cause and effect matrix, the I/O list, and the HMI displays are at an approved revision. Testing against a draft produces a punch list of arguments.',
          'The FAT procedure is written, reviewed by the owner, and issued, with a step for everything that will be tested and an expected result for every step.',
          'The simulation is built: switches and signal sources for the I/O, or a simulation program that stands in for the field, and the means to fail things on purpose.',
          'The witnesses are named and the schedule agreed. A FAT nobody from the owner attends is a shop test.',
        ],
      },
      { t: 'h2', text: 'What is tested' },
      {
        t: 'steps',
        items: [
          { title: 'Hardware inspection.', text: 'Against the drawings and the bill of materials: every component, its rating, its label, every wire number, the enclosure type and its markings, the SCCR label, and the UL listing mark if the panel is listed.' },
          { title: 'Power and distribution.', text: 'Power up in stages. Confirm every voltage at every distribution point, every fuse and breaker sized as drawn, and every supply within its load.' },
          { title: 'Every I/O point.', text: 'Each input driven from the simulation and observed in the program and on the HMI; each output commanded and observed at the terminal. Every point on the I/O list, with a checkmark against it.' },
          { title: 'Analog scaling.', text: 'Each analog input at 4, 12, and 20 mA, reading the expected engineering value; each analog output commanded to 0, 50, and 100 percent and measured.' },
          { title: 'Modes and sequences.', text: 'Hand, off, and auto for each piece of equipment behave as the narrative says. Each sequence walked step by step, each transition forced, each timeout allowed to expire and its response observed.' },
          { title: 'Interlocks and trips.', text: 'The cause and effect matrix row by row: force the cause, confirm the effects, confirm the reset.' },
          { title: 'Alarms.', text: 'Every alarm raised, seen on the HMI with the right priority and text, acknowledged, cleared. Notification to the dialer or the messaging system, if it is in scope.' },
          { title: 'HMI.', text: 'Every display, every navigation path, every adjustable value against its range, every permission level.' },
          { title: 'Communications.', text: 'To SCADA, to drives, to remote I/O, to whatever the panel talks to, with the real protocol and a simulated or real partner.' },
          { title: 'Failure modes.', text: 'Fail each transmitter out of range. Disconnect each communication link. Remove power and restore it in each state. Fault the processor. Observe the behavior the narrative specifies.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Test the things that are supposed to fail',
        text: 'A FAT that only shows the system working shows nothing about the day it does not. Pulling the network cable, driving a level transmitter to 3 mA, and cutting the power in the middle of a sequence are the steps that find the design decisions nobody made. Put them in the procedure.',
      },
      { t: 'h2', text: 'Simulation' },
      {
        t: 'p',
        text: 'The field is not in the shop, so something has to stand in for it. For a small panel, a box of toggle switches on the discrete inputs and a loop calibrator on the analog inputs is enough, and the outputs are watched at the terminals. For a larger system, a simulation routine in a second controller or in the same controller behind a simulation flag models the process well enough that a pump start raises a flow and a level falls as the pump runs, so that sequences can run end to end without a person clicking through each transition. The simulation is removed or disabled before shipment, and the removal is a step in the procedure.',
      },
      { t: 'h2', text: 'The record' },
      {
        t: 'p',
        text: 'Each step in the procedure is marked pass or fail, with the initials of the tester and the witness and the date. A failed step generates a punch list item with a number, a description, an owner, and a due date. Items are fixed and re-tested, and the re-test is recorded. At the end, the parties sign that the test was performed against the listed document revisions with the listed punch list open. A FAT sign-off with open items is normal; the sign-off says what those items are, and shipment proceeds or waits depending on them.',
      },
      { t: 'h2', text: 'What the FAT does not prove' },
      {
        t: 'p',
        text: 'It proves the panel and the program against the documents and against a simulated field. It does not prove the field wiring, the instruments, the real process dynamics, the real network, or the operators. Those are the site acceptance test. A system that passed its FAT and fails at site failed in one of those places, which is a useful thing to know at the site.',
      },
    ],
    faqs: [
      {
        q: 'Who writes the FAT procedure?',
        a: 'Usually the integrator, from the approved narrative and matrix, and the owner reviews it before the test. On some projects the owner’s engineer writes it. Either way it is issued before the test and followed during it.',
      },
      {
        q: 'Does the owner have to attend?',
        a: 'Someone who will accept the system should witness it. A FAT without the owner is a shop test, and the discoveries it makes are the integrator’s alone. Remote witnessing by video is common and workable for the logic and HMI portions.',
      },
      {
        q: 'What if the narrative is not approved yet?',
        a: 'Then the test cannot be against it, and any disagreement at the FAT becomes an argument about what was meant. Get the narrative approved first, even if it delays the FAT.',
      },
      {
        q: 'How long does a FAT take?',
        a: 'A day for a small pump panel, a week or more for a plant. The I/O check is mechanical and scales with the point count; the sequences and failure modes are where the time and the value are.',
      },
    ],
    related: [
      '/engineering-library/checklists/sat',
      '/engineering-library/control-documentation/control-narratives',
      '/engineering-library/control-documentation/cause-and-effect',
      '/engineering-library/checklists/commissioning',
      '/controls/control-panels/panel-design/ul-508a',
    ],
  },
  {
    path: '/engineering-library/checklists/sat',
    kind: 'reference',
    title: 'Site Acceptance Testing',
    summary:
      'Proving the installed system with the real field: loop checks first, then end-to-end I/O, real communications, sequences on real equipment, alarms to real recipients, and failure modes on the real network, with the record that becomes the as-built.',
    answer:
      'A site acceptance test repeats the essential parts of the factory test on the installed system with the real instruments, the real wiring, the real network, and the real process, and adds what the shop could not test: loop checks from the field device to the screen, equipment running under control, and the behavior of the whole thing when a real cable is pulled. It comes after installation and loop checks and before the plant is handed to operations, and its record, with the punch list closed, is the basis of acceptance.',
    keyPoints: [
      'Loop checks come first: every instrument proven from the field device to the HMI value before any sequence is attempted.',
      'The SAT runs the equipment for real. The simulation is gone and the process responds.',
      'Communications are tested on the real network with the real partners, including failover and loss.',
      'Alarms go to the real dialer, the real phones, and the real people, and the response is observed.',
      'The record closes the FAT punch list, opens the SAT punch list, and is the as-built reference.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Commissioning', 'Documentation', 'Engineering', 'Instrumentation'],
    blocks: [
      { t: 'h2', text: 'Where it sits' },
      {
        t: 'p',
        text: 'Installation puts the panel on the wall and the instruments on the pipe. Loop checks prove each wire and each instrument. The SAT proves the system: that the pieces work together under control, with the process moving. Commissioning and startup follow, when the plant is tuned and run into service, and some projects fold the SAT into them. The distinction worth keeping is that the SAT is a test against the documents with a record, and startup is running the plant.',
      },
      { t: 'h2', text: 'Prerequisites' },
      {
        t: 'ul',
        items: [
          'The FAT is complete and its punch list is closed or its open items are known and agreed.',
          'Installation is complete, inspected, and energized, with the electrical inspection passed.',
          'Loop checks are complete: every I/O point proven from the field device through the terminals to the controller and the HMI, with calibration records for every instrument.',
          'Field devices are commissioned: transmitters ranged, valves stroked, drives parameterized and bump tested for rotation.',
          'The network is installed and proven, with addresses assigned, switches configured, and radio paths surveyed.',
          'The SAT procedure is issued, derived from the FAT procedure with the shop-only steps removed and the site-only steps added.',
          'The process can be run. Water is available, the discharge has somewhere to go, and operations agree to the test.',
        ],
      },
      { t: 'h2', text: 'What is tested' },
      {
        t: 'steps',
        items: [
          { title: 'End-to-end I/O.', text: 'Each input from the actual field device: lift the float, block the limit switch, apply pressure to the transmitter. Each output to the actual device: the starter pulls in, the valve moves, the drive runs. The loop check proved the wire; this proves the device in the loop.' },
          { title: 'Analog calibration in the loop.', text: 'The value on the HMI against a reference at the instrument, at two or three points across the range, for every analog loop.' },
          { title: 'Equipment under control.', text: 'Each pump, valve, and drive in hand from the panel, then in auto from the controller, with the run feedback, the position feedback, and the interlocks observed.' },
          { title: 'Sequences on the real process.', text: 'Each sequence run with real flow, real level, and real pressure. Timeouts set from the shop are often wrong for the real equipment; this is where they are corrected.' },
          { title: 'Control loops.', text: 'Each PID loop closed on the real process, with a setpoint step and the response recorded. Initial tuning happens here, final tuning during startup.' },
          { title: 'Interlocks and trips on real devices.', text: 'The cause and effect matrix again, this time with the real float lifted and the real overload tripped where it can be done safely.' },
          { title: 'Alarms to real recipients.', text: 'Each alarm raised, seen on the real SCADA client, sent to the real dialer, received on the real phone by the person on the list.' },
          { title: 'Communications on the real network.', text: 'Every link, every partner, and then every failure: pull the cable, power down the switch, fail the primary server, drop the radio, and confirm the system and the record do what the narrative says.' },
          { title: 'Power failure.', text: 'Utility power removed, generator transfer if there is one, the controller and the communications riding through on their backup, and the restart behavior on restoration.' },
          { title: 'Operator use.', text: 'The people who will run the plant using the HMI to do what they will do, with the integrator watching and not helping.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'The SAT runs real equipment',
        text: 'Pumps start, valves move, and chemicals feed during the test, sometimes unexpectedly when an interlock is forced. Everyone on site knows a test is in progress, equipment that could hurt someone is watched or barricaded, and the person forcing a cause is in contact with the person at the equipment.',
      },
      { t: 'h2', text: 'What is different from the FAT' },
      {
        t: 'table',
        caption: 'Shop against site',
        head: ['Aspect', 'FAT', 'SAT'],
        rows: [
          ['Field devices', 'Simulated', 'Real'],
          ['Wiring', 'Panel only', 'Panel and field'],
          ['Process', 'Simulated or absent', 'Real, and it pushes back'],
          ['Network', 'A bench switch', 'The installed network, with its faults'],
          ['Alarms', 'On the HMI', 'To the people on the call list'],
          ['Timing', 'Shop estimates', 'Real equipment; timeouts get corrected'],
          ['Who is there', 'The integrator and a witness', 'The integrator, the owner, the contractor, and operations'],
        ],
      },
      { t: 'h2', text: 'The record' },
      {
        t: 'p',
        text: 'The SAT procedure is marked step by step as the FAT was, with tester and witness initials, and every deviation goes on the punch list. The calibration sheets, the loop check sheets, the tuning parameters, the setpoints as left, the network addresses, and the software backups taken at the end of the test are collected with it. Together they are the as-built record of the control system, and the narrative and the drawings are revised to match before they are issued as-built. The acceptance signature, when the punch list is closed, is the point at which the owner owns the system.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between a FAT and a SAT?',
        a: 'The FAT tests the panel and the program in the shop against a simulated field. The SAT tests the installed system with real instruments, real wiring, the real network, and the real process. The FAT finds design and build errors cheaply; the SAT finds installation and integration errors.',
      },
      {
        q: 'Do loop checks count as the SAT?',
        a: 'No. Loop checks prove each point individually and come before the SAT. The SAT proves the system as a whole: equipment under control, sequences, interlocks, alarms, and failures, with a record.',
      },
      {
        q: 'Who witnesses the SAT?',
        a: 'The owner, usually through their engineer, and operations, who will run the plant. Their observation of the operator-use portion is the most valuable review the HMI will get.',
      },
      {
        q: 'When is the system accepted?',
        a: 'When the SAT punch list is closed and the acceptance is signed. Some contracts add a performance period after startup before final acceptance, and the SAT record is what that period is measured against.',
      },
    ],
    related: [
      '/engineering-library/checklists/fat',
      '/engineering-library/checklists/commissioning',
      '/engineering-library/checklists/startup',
      '/controls/instrumentation/calibration/loop-checks',
      '/engineering-library/control-documentation/control-narratives',
    ],
  },
];
