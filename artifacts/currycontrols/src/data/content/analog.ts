import type { Entry } from '../content-types';

export const ANALOG_ENTRIES: Entry[] = [
  {
    path: '/controls/plc-systems/analog-control/4-20-ma',
    kind: 'reference',
    title: '4-20 mA Current Loops',
    summary:
      'Why the industry standardized on current instead of voltage, how a two-wire loop is powered, what the live zero buys you, and how to read a loop with a meter.',
    answer:
      'A 4-20 mA current loop carries an analog process measurement as a current between 4 and 20 milliamps, where 4 mA is 0% of the calibrated range and 20 mA is 100%. Current is used because it does not degrade over long wire runs the way voltage does, and because 4 mA as the live zero lets the receiving device distinguish a genuine zero reading from a broken wire, which reads 0 mA.',
    keyPoints: [
      '4 mA = 0% of span, 20 mA = 100%. The 4 mA live zero is what makes a broken wire detectable.',
      'Current is constant everywhere in a series loop, so wire resistance does not change the reading.',
      'A two-wire transmitter is powered by the same pair that carries the signal, typically from 24 VDC.',
      'Loop resistance has a hard ceiling set by supply voltage and transmitter compliance voltage.',
      'Under NAMUR NE 43, a reading below 3.6 mA or above 21 mA signals a device fault, not a process value.',
    ],
    published: '2026-01-08',
    updated: '2026-08-29',
    readingTime: 12,
    tags: ['Analog', 'Instrumentation', '4-20 mA', 'Signals'],
    blocks: [
      { t: 'h2', text: 'Why current and not voltage' },
      {
        t: 'p',
        text: 'Run a 0-10 V signal 800 feet through 18 AWG wire in a wet vault and the voltage arriving at the panel is not the voltage the transmitter sent. Wire resistance and the receiving input impedance form a divider, and the reading drops. Add temperature change, a corroded splice, or a longer run than the drawing showed, and the error moves around.',
      },
      {
        t: 'p',
        text: 'Current does not behave that way. In a series circuit the current is the same at every point. The transmitter is a current regulator: it adjusts its own internal resistance to force exactly the current it intends through the loop, regardless of how much wire is in the way, right up until it runs out of voltage to do so. Add 400 feet of wire and the transmitter simply drops a little less across itself. The receiving device still sees the same milliamps.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The one thing current cannot fix',
        text: 'Immunity to wire resistance does not mean immunity to noise. A current loop is far more robust than a voltage signal, but induced noise from a nearby VFD cable will still show up on your reading. Cable routing, shielding, and single-point shield grounding still matter.',
      },
      { t: 'h2', text: 'The live zero' },
      {
        t: 'p',
        text: 'The choice of 4 mA rather than 0 mA for the bottom of the range is the quietly brilliant part of the standard. If 0% were 0 mA, a cut wire and a genuinely empty tank would look identical. With a live zero, 0 mA is not a valid measurement at all. It means the loop is open: a broken conductor, a failed transmitter, a tripped loop power supply, or a terminal that was never landed.',
      },
      {
        t: 'p',
        text: 'This is the single most useful diagnostic property of the standard, and it is worth building into your PLC logic explicitly rather than letting a 0 mA reading scale to 0 engineering units and quietly become a believable number.',
      },
      { t: 'h2', text: 'Two-wire, three-wire, four-wire' },
      {
        t: 'dl',
        items: [
          { term: 'Two-wire (loop powered)', def: 'The most common arrangement. One pair carries both power and signal. The transmitter draws its operating power from the loop, which is why it must function on less than 4 mA — it never gets more than the minimum signal current to run on. Requires an external supply, usually 24 VDC.' },
          { term: 'Three-wire', def: 'Separate power and signal share a common return. Used where the device needs more power than a loop can provide, such as some analyzers.' },
          { term: 'Four-wire', def: 'Fully separate power input and signal output. The device is line or 24 VDC powered and sources the 4-20 mA itself. Common on analyzers, flow computers, and larger instruments.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not power a loop twice',
        text: 'If a four-wire transmitter sources its own current and you also wire it to a loop-powered analog input that supplies 24 V, you have two sources fighting. Depending on the hardware you will get a wrong reading, a blown input, or a damaged transmitter output. Check whether your analog input card is a sinking or sourcing type before you land the wires.',
      },
      { t: 'h2', text: 'Loop resistance: the calculation people skip' },
      {
        t: 'p',
        text: 'A two-wire transmitter needs a minimum voltage across its own terminals to operate, called its compliance or lift-off voltage. Whatever the supply provides beyond that is available to drive current through everything else in the loop: the wire, the PLC input resistance, any indicators, any barriers.',
      },
      {
        t: 'formula',
        expr: 'R_max = (V_supply − V_transmitter_min) ÷ 0.020 A',
        where: [
          'R_max — total loop resistance the circuit can tolerate, in ohms',
          'V_supply — the loop power supply voltage',
          'V_transmitter_min — the transmitter minimum operating voltage from its datasheet, often 10 to 12 V',
          '0.020 A — worst case, because the voltage burden is highest at full scale',
        ],
      },
      {
        t: 'p',
        text: 'With a 24 V supply and a transmitter needing 11 V, you have 13 V to spend, which allows 650 ohms of total loop resistance. A 250 ohm PLC input leaves 400 ohms for wire and everything else — comfortable. Add a panel indicator at 100 ohms, a surge protector, and a long run, and comfortable becomes marginal. The symptom of running out of headroom is a loop that tracks correctly at low readings and clips or goes nonlinear near full scale.',
      },
      {
        t: 'table',
        caption: 'Signal conversion across a 250 ohm sense resistor',
        head: ['Current', 'Voltage across 250 Ω', 'Percent of span', 'Meaning'],
        rows: [
          ['0 mA', '0.00 V', '—', 'Open loop: broken wire, dead supply, failed transmitter'],
          ['3.6 mA', '0.90 V', '−2.5%', 'NAMUR NE 43 low fault indication'],
          ['4 mA', '1.00 V', '0%', 'Bottom of calibrated range'],
          ['8 mA', '2.00 V', '25%', ''],
          ['12 mA', '3.00 V', '50%', 'Convenient midpoint for a quick sanity check'],
          ['16 mA', '4.00 V', '75%', ''],
          ['20 mA', '5.00 V', '100%', 'Top of calibrated range'],
          ['21 mA', '5.25 V', '+6.25%', 'NAMUR NE 43 high fault indication'],
        ],
      },
      { t: 'h2', text: 'NAMUR NE 43 and what the out-of-range values mean' },
      {
        t: 'p',
        text: 'NAMUR NE 43 defines what a transmitter should do when it knows its measurement is not valid. Rather than reporting a plausible number, it drives the current outside the measurement range: below 3.6 mA or above 21 mA. Most modern transmitters let you configure which direction a fault drives.',
      },
      {
        t: 'p',
        text: 'This turns a sensor diagnostic into something your PLC can act on. A radar level transmitter that has lost echo can report 3.5 mA instead of a level of zero, and your logic can hold the last good value and alarm rather than starting a pump against an empty well.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Choose the fail direction deliberately',
        text: 'Fail-high and fail-low are not equivalent. On a wet well level, failing low can make the controller think the well is empty and stop pumping while it fills. Failing high can make it run pumps dry. Decide which failure the process tolerates better, configure it that way, and write it in the control narrative.',
      },
      { t: 'h2', text: 'Reading a loop with a meter' },
      {
        t: 'p',
        text: 'There are two ways to measure a loop, and one of them causes an outage if you do it wrong.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Series measurement — accurate, interrupts the loop', text: 'Set the meter to DC milliamps, break the loop, and insert the meter in series. You now read exactly what the transmitter is sending. The loop is open while you move the leads, so the receiving device sees 0 mA and may alarm or trip logic. Notify operations first, and put the affected control in manual.' },
          { title: 'Voltage across a known resistor — non-intrusive', text: 'Measure DC volts across the analog input sense resistor or a dedicated test resistor. With 250 ohms, 1.000 V is 4 mA and 5.000 V is 20 mA. Nothing is interrupted. This is the preferred method on a running process.' },
          { title: 'Loop test jacks and clamp meters', text: 'Many transmitters include test terminals that let a meter read the loop current without breaking it. A true milliamp clamp meter also works, at lower resolution. Both are worth having.' },
        ],
      },
      { t: 'h2', text: 'What the numbers tell you' },
      {
        t: 'table',
        head: ['Reading', 'Most likely causes', 'Check first'],
        rows: [
          ['0 mA', 'Open circuit anywhere in the loop', 'Loop power supply output, then the terminals at each end, then continuity'],
          ['Below 3.6 mA', 'Transmitter reporting a fault, or an under-ranged calibration', 'The transmitter display or HART diagnostics before touching wiring'],
          ['Exactly 4 mA and unmoving', 'Process genuinely at zero, or transmitter in a fixed-output test mode', 'Whether someone left the transmitter in loop test mode after commissioning'],
          ['Above 21 mA', 'Transmitter fault indication, or a second power source in the loop', 'Fault configuration, then confirm only one supply is present'],
          ['Correct at low readings, clipped high', 'Insufficient loop voltage for the total resistance', 'Total loop resistance against the R_max calculation'],
          ['Unstable, noisy', 'Induced noise, a ground loop, or a genuine process swing', 'Whether it is stable with the drive stopped, and shield grounding'],
        ],
      },
      { t: 'h2', text: 'HART on the same pair' },
      {
        t: 'p',
        text: 'HART superimposes a low-level frequency-shift-keyed digital signal on the same 4-20 mA loop. Because it averages to zero current, it does not disturb the analog reading, so a HART transmitter delivers a conventional analog value to the PLC and a digital channel to a handheld communicator or a HART-capable input card at the same time.',
      },
      {
        t: 'p',
        text: 'That digital channel carries the device tag, its calibrated range, its diagnostics, and often several secondary variables. On a stubborn loop it will frequently tell you in ten seconds what a meter takes an hour to narrow down. HART needs a minimum loop resistance, typically 230 ohms, to work — which the standard 250 ohm input satisfies.',
      },
    ],
    faqs: [
      {
        q: 'Why is 4 mA used instead of 0 mA for zero?',
        a: 'So that a genuine zero measurement is distinguishable from a failure. At 4 mA the loop is proven intact and the transmitter is powered. At 0 mA something is broken. A 0-20 mA scheme cannot tell those apart.',
      },
      {
        q: 'What is the maximum distance for a 4-20 mA signal?',
        a: 'Distance is limited by total loop resistance, not by a fixed length. Calculate available voltage divided by 0.020 amps to get the maximum resistance, subtract the receiver and any devices, and the remainder is your wire budget. In practice, several thousand feet of ordinary instrument cable is routinely fine.',
      },
      {
        q: 'Can I read a 4-20 mA signal with a voltage input?',
        a: 'Yes, by placing a precision resistor across the input. 250 ohms converts 4-20 mA to 1-5 V, and 500 ohms gives 2-10 V. Use a precision resistor with a low temperature coefficient, and include the resistor in your loop resistance budget.',
      },
      {
        q: 'Why does my analog signal jump when a VFD starts?',
        a: 'Almost always induced noise coupling into the signal cable, or a ground loop that the drive is exciting. Confirm the signal is quiet with the drive stopped, verify the cable shield is grounded at exactly one end, and check that the signal cable is not sharing a tray or conduit with drive output conductors.',
      },
      {
        q: 'What does it mean if the loop reads 21 mA or higher?',
        a: 'On a NAMUR-compliant transmitter it means the device has detected an internal fault or lost its measurement and is deliberately reporting out of range. Read the transmitter diagnostics rather than assuming the process is above full scale.',
      },
      {
        q: 'Should I use 4-20 mA or a digital protocol for new work?',
        a: 'Both have a place. 4-20 mA is simple, well understood by every technician, and fails in obvious ways. Digital protocols carry more data per device and less wire. A common approach is HART transmitters on 4-20 mA loops, which gives the robustness of analog with digital diagnostics available when you need them.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/scaling',
      '/controls/instrumentation/signals/ground-loops',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable',
    ],
  },

  {
    path: '/controls/plc-systems/analog-control/scaling',
    kind: 'reference',
    title: 'Analog Scaling: Raw Counts to Engineering Units',
    summary:
      'The arithmetic that turns an analog card reading into feet, psi, or gallons per minute — plus the range mismatches that silently corrupt it.',
    answer:
      'Analog scaling converts the raw integer an analog input card produces into a meaningful engineering unit using a linear mapping. The formula is EU = (Raw − Raw_min) ÷ (Raw_max − Raw_min) × (EU_max − EU_min) + EU_min. The critical requirement is that the card range, the transmitter calibrated range, and the scaling constants in the program all describe the same thing.',
    keyPoints: [
      'Scaling is a straight-line map from a raw count range to an engineering unit range.',
      'The transmitter range, the card range, and the program constants must agree or the reading is wrong.',
      'Document the calibrated range on the loop sheet, not only in the program.',
      'Clamp the output and flag out-of-range values instead of letting bad data look plausible.',
      'Square-root extraction is needed for differential pressure flow, and must be applied exactly once.',
    ],
    published: '2026-01-27',
    updated: '2026-07-16',
    readingTime: 8,
    tags: ['Analog', 'PLC', 'Programming'],
    blocks: [
      { t: 'h2', text: 'What the card gives you' },
      {
        t: 'p',
        text: 'An analog input module converts the current on the loop into a number using an analog-to-digital converter. The number itself is arbitrary and depends entirely on the module. A 16-bit card configured for 4-20 mA might present 0 to 32767, or 6242 to 31208, or engineering units directly if the card supports it. There is no universal value; read the module documentation and, better, verify it by injecting a known current.',
      },
      { t: 'h2', text: 'The linear scaling formula' },
      {
        t: 'formula',
        expr: 'EU = (Raw − Raw_min) ÷ (Raw_max − Raw_min) × (EU_max − EU_min) + EU_min',
        where: [
          'EU — the engineering unit result, for example feet of level',
          'Raw — the current value from the analog input',
          'Raw_min, Raw_max — the card counts corresponding to 4 mA and 20 mA',
          'EU_min, EU_max — the transmitter calibrated range, for example 0 and 25 feet',
        ],
      },
      {
        t: 'p',
        text: 'Worked example: a card producing 0 to 32767 counts across 4-20 mA, a radar transmitter calibrated 0 to 25.0 feet, and a present reading of 13107 counts.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Worked scaling calculation',
        code: `EU = (13107 - 0) / (32767 - 0) * (25.0 - 0.0) + 0.0
   = 0.4000 * 25.0
   = 10.0 feet

Sanity check: 13107 of 32767 counts is 40% of span.
40% of a 0-25 ft range is 10 ft, and 40% of 4-20 mA is 10.4 mA.
All three agree, so the scaling is right.`,
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Always check at 50%',
        text: 'Inject 12 mA and confirm the HMI reads exactly half of the calibrated range. Any error in span or offset shows up immediately, and it takes thirty seconds. Checking only at zero will hide a span error completely.',
      },
      { t: 'h2', text: 'The three ranges that must agree' },
      {
        t: 'p',
        text: 'Nearly every scaling problem is a mismatch between three separate places where a range is recorded.',
      },
      {
        t: 'ol',
        items: [
          'The transmitter calibrated range: what 4 mA and 20 mA actually mean at the device. A radar might be set 0-25 ft, or 0-30 ft, or 2-27 ft.',
          'The analog card range configuration: whether the module is set for 4-20 mA or 0-20 mA, and what count range it reports.',
          'The scaling constants in the PLC program: the numbers a programmer typed, often from a drawing rather than from the device.',
        ],
      },
      {
        t: 'p',
        text: 'When a level reads 20% high across the whole range and nobody can find a wiring fault, the usual answer is that someone re-ranged the transmitter in the field and did not update the program. This is why the calibrated range belongs on the loop sheet and in the instrument list, not only in code.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The 0-20 mA trap',
        text: 'If the card is configured for 0-20 mA but the loop is a 4-20 mA transmitter, the reading will be 25% high at zero and the error shrinks toward full scale. It looks like a calibration drift rather than a configuration error, and people chase it in the field for hours. Confirm the card range first.',
      },
      { t: 'h2', text: 'Clamping and validity' },
      {
        t: 'p',
        text: 'Raw scaling arithmetic will happily produce a level of negative four feet or a pressure of 340 psi on a 100 psi transmitter. Do not let those values into control logic.',
      },
      {
        t: 'ul',
        items: [
          'Clamp the scaled result to the calibrated range so downstream logic never sees a physically impossible number.',
          'Test the raw value against the NAMUR thresholds and set a separate fault bit when it is below 3.6 mA or above 21 mA equivalent counts.',
          'Hold the last good value when the input is faulted, and make the held state visible on the HMI so an operator knows they are looking at stale data.',
          'Alarm the fault. A silently held value is more dangerous than an obviously wrong one.',
        ],
      },
      { t: 'h2', text: 'Square root extraction' },
      {
        t: 'p',
        text: 'Differential pressure flow measurement produces a signal proportional to the square of flow. Getting flow requires taking the square root of the normalized signal before applying the flow range.',
      },
      {
        t: 'formula',
        expr: 'Flow = √( (Raw − Raw_min) ÷ (Raw_max − Raw_min) ) × Flow_max',
      },
      {
        t: 'p',
        text: 'The trap is applying it twice. Many transmitters can perform square root extraction internally. If the transmitter is set to linear output and the PLC extracts, that is correct. If the transmitter extracts and the PLC also extracts, the reading is wrong everywhere except at zero and full scale, which is exactly where people check. Decide where extraction happens, write it on the loop sheet, and verify at 50%.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Low-flow cutoff',
        text: 'Square root extraction amplifies noise badly near zero, because a tiny differential pressure becomes a large fraction of flow. Apply a low-flow cutoff, typically a few percent of span, below which flow is forced to zero. Without it, a still pipe will report a wandering trickle and totalizers will accumulate flow that never happened.',
      },
      { t: 'h2', text: 'Analog outputs scale the same way, backwards' },
      {
        t: 'p',
        text: 'An analog output takes an engineering value and produces counts. The arithmetic is the inverse of the input case. The thing people forget is the output range at the far end: a valve positioner calibrated 4-20 mA for 0-100% open behaves very differently from one calibrated for a split range of 4-12 mA. Confirm what the receiving device expects before assuming 20 mA means fully open.',
      },
    ],
    faqs: [
      {
        q: 'Why does my level read correctly at zero but wrong at full?',
        a: 'That is a span error, not an offset error. The two ranges disagree about what 20 mA means. Compare the transmitter calibrated upper range value against the EU_max constant in the program, and check the analog card is configured for 4-20 mA rather than 0-20 mA.',
      },
      {
        q: 'What raw count corresponds to 4 mA?',
        a: 'It depends entirely on the module and its configuration. Do not assume. Read the manual, then verify by injecting 4 mA with a calibrator and observing the raw value online.',
      },
      {
        q: 'Should scaling be done in the PLC or the SCADA system?',
        a: 'In the PLC. The controller makes the control decisions, so it needs the correct engineering value regardless of whether SCADA is running. Scaling in SCADA leads to two different numbers for the same measurement, which is a very hard problem to unwind later.',
      },
      {
        q: 'How do I handle a transmitter with a suppressed zero?',
        a: 'A transmitter ranged 2 to 27 feet simply means EU_min is 2 and EU_max is 27. The formula handles it without modification. The mistake is leaving EU_min at zero, which produces an error of exactly the suppression amount at every point.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/4-20-ma',
      '/controls/plc-systems/analog-control/engineering-units',
      '/controls/plc-systems/analog-control/signal-validation',
      '/how-to/plc-how-to/scale-a-4-20-ma-input',
    ],
  },

  {
    path: '/controls/plc-systems/analog-control/pid',
    kind: 'reference',
    title: 'PID Control for Pumps and Valves',
    summary:
      'What each term actually does, how to tune a loop on a real pump station, and the handful of mistakes that cause most of the oscillation people blame on tuning.',
    answer:
      'PID control continuously calculates the difference between a setpoint and a measurement, then adjusts an output to close that gap. The proportional term responds to the size of the current error, the integral term eliminates the steady-state offset that proportional alone leaves behind, and the derivative term responds to how fast the error is changing. Most pump and pressure loops in water and wastewater run well with proportional and integral only.',
    keyPoints: [
      'Proportional reacts to how far off you are. Integral reacts to how long you have been off.',
      'Derivative amplifies noise and is left off in most water and wastewater loops.',
      'Tune the process, not the number: know whether your loop is fast (pressure) or slow (level).',
      'Anti-windup and bumpless transfer are not optional extras on a real installation.',
      'Persistent oscillation is often a mechanical or measurement problem, not a tuning problem.',
    ],
    published: '2026-03-05',
    updated: '2026-08-19',
    readingTime: 11,
    tags: ['PID', 'Control', 'Pumps', 'Analog'],
    blocks: [
      { t: 'h2', text: 'What the three terms do' },
      {
        t: 'dl',
        items: [
          { term: 'Proportional (P)', def: 'Output contribution proportional to the present error. Larger gain means a stronger, faster response and a greater tendency to overshoot and oscillate. Proportional alone always leaves a residual offset, because zero error would mean zero output.' },
          { term: 'Integral (I)', def: 'Accumulates error over time and drives the residual offset to zero. This is what actually gets you to setpoint. Too much integral action makes the loop slow to settle and prone to overshoot after a disturbance.' },
          { term: 'Derivative (D)', def: 'Responds to the rate of change of the error, adding damping and anticipation. It also multiplies measurement noise, which is why it is usually zero on flow and pressure loops fed by real field transmitters.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Units are not standardized, and this causes real errors',
        text: 'Some platforms express proportional action as gain, others as proportional band, where band equals 100 divided by gain. Integral may be in repeats per minute or in minutes per repeat, which are reciprocals of each other. Copying tuning constants between platforms without converting is a reliable way to make a stable loop violent.',
      },
      { t: 'h2', text: 'Know your process before you touch a number' },
      {
        t: 'p',
        text: 'Loops fail far more often from a mismatch between tuning and process dynamics than from an arithmetically wrong constant.',
      },
      {
        t: 'table',
        head: ['Loop type', 'Speed', 'Typical starting approach'],
        rows: [
          ['Discharge pressure on a booster pump', 'Fast — seconds', 'Moderate gain, moderate integral, no derivative'],
          ['Flow control with a valve', 'Fast — seconds', 'Low gain, fast integral; flow signals are noisy'],
          ['Wet well or tank level', 'Slow — minutes', 'Low gain, slow integral; often averaging rather than tight control'],
          ['Chemical dose paced to flow', 'Feed-forward dominant', 'Flow pacing with trim, not pure feedback'],
          ['Temperature', 'Slow with dead time', 'Low gain, slow integral, derivative sometimes useful'],
        ],
      },
      {
        t: 'p',
        text: 'Level control deserves special mention because the instinct is wrong. Most wet well level loops do not want tight control. They want the level to drift within a band while flow out stays steady, which is easier on the pumps and the downstream process. Tuning a level loop as if it were a pressure loop produces a station that hunts constantly and wears out.',
      },
      { t: 'h2', text: 'A practical tuning procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Prepare and get permission', text: 'Confirm with operations that you may disturb the process. Know how to get back to manual instantly. Record the existing constants before changing anything, because the loop you are about to detune was at least running.' },
          { title: 'Verify the measurement first', text: 'Trend the process variable in manual at a fixed output. If it is noisy, drifting, or stepping, fix that before tuning. No set of constants compensates for a bad signal, and you will chase your tail for an afternoon.' },
          { title: 'Start with proportional only', text: 'Set integral to its minimum effect and derivative to zero. Increase gain until a small setpoint change produces a response that overshoots slightly and settles. If it oscillates continuously, halve the gain.' },
          { title: 'Add integral', text: 'Introduce integral action gradually until the residual offset disappears within an acceptable time. Too fast and you will see overshoot returning; back it off.' },
          { title: 'Test against a real disturbance', text: 'A setpoint step is not the same as the disturbance the loop actually faces. Start another pump, open a valve, let the plant do what it normally does, and watch how the loop recovers.' },
          { title: 'Document what you did', text: 'Record the final constants, the date, the operating conditions, and what the loop was doing before. The next person will need this, and so will you in eight months.' },
        ],
      },
      { t: 'h2', text: 'Integral windup' },
      {
        t: 'p',
        text: 'When the output is saturated at 100% and the error remains, the integral term keeps accumulating even though more output is impossible. When the process finally responds, that accumulated integral has to unwind before the output comes back, and the loop massively overshoots.',
      },
      {
        t: 'p',
        text: 'This is exactly what happens when a pump is called to hold pressure while a downstream valve is closed. The loop winds up for minutes. The valve opens and the pump slams to full speed and stays there far too long.',
      },
      {
        t: 'ul',
        items: [
          'Enable anti-windup, output clamping, or back-calculation in the instruction — the name varies by platform, but nearly every modern PID block has it.',
          'Set the output limits to the real usable range. If the drive cannot run below 30 Hz, tell the loop that.',
          'Hold or reset the integral when the loop is not in control: pump off, drive in local, valve in hand.',
        ],
      },
      { t: 'h2', text: 'Bumpless transfer' },
      {
        t: 'p',
        text: 'When a loop switches from manual to automatic, the controller must pick up from the current output rather than from whatever it last calculated. Without bumpless transfer, the output jumps the moment an operator hands control back, which teaches operators that automatic mode is dangerous and leaves the loop permanently in manual.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Watch for the loop that is always in manual',
        text: 'If you find a station where every loop sits in manual, do not assume the operators are being difficult. Something in the automatic behavior lost their trust: a bump on transfer, windup after a disturbance, or a setpoint that no longer suits the plant. Find that first, because retuning without fixing it changes nothing.',
      },
      { t: 'h2', text: 'When it is not a tuning problem' },
      {
        t: 'p',
        text: 'Before another round of constants, rule out these. All of them look like poor tuning on a trend.',
      },
      {
        t: 'table',
        head: ['Symptom', 'Likely cause', 'Check'],
        rows: [
          ['Steady oscillation at a fixed period', 'Valve stiction, or gain too high', 'Step the output in manual and watch whether the valve moves smoothly'],
          ['Output moves, process does not', 'Valve not stroking, drive in local, closed isolation valve', 'Trend output against actual position feedback'],
          ['Fast erratic output', 'Noise on the measurement amplified by gain or derivative', 'Trend the raw process variable in manual'],
          ['Loop wanders slowly and never settles', 'Integral far too slow, or an unmeasured disturbance', 'Look for another loop fighting the same process'],
          ['Overshoots badly after every disturbance', 'Integral windup', 'Confirm anti-windup is enabled and limits are realistic'],
          ['Two loops fighting', 'Interacting control, such as two pumps holding the same pressure', 'Take one to manual and see whether the other stabilizes'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Stiction is not a tuning problem',
        text: 'A sticking control valve produces a characteristic square or sawtooth oscillation that no set of constants will fix. Reducing gain only makes the cycle slower. If a step change in manual produces a delayed jump rather than a smooth move, the valve needs mechanical attention.',
      },
    ],
    faqs: [
      {
        q: 'Do I need the derivative term?',
        a: 'Usually not, in water and wastewater. Flow, pressure, and level signals carry enough noise that derivative action mostly amplifies it. Derivative earns its place on slow processes with real thermal or transport lag.',
      },
      {
        q: 'Why does my pressure loop oscillate only at low flow?',
        a: 'Process gain changes with operating point. A pump and a system curve are not linear, so tuning that suits high flow is often too aggressive at low flow. Tune at the worst-case condition, or use gain scheduling if the platform supports it.',
      },
      {
        q: 'Can I use one set of tuning constants for both pumps?',
        a: 'If the pumps and drives are identical and piped symmetrically, usually yes. Verify by running each individually and watching the response, because impellers wear at different rates and a station rarely stays symmetric.',
      },
      {
        q: 'What is the difference between proportional band and gain?',
        a: 'They are reciprocals scaled by 100: proportional band equals 100 divided by gain. A gain of 2 is a 50% proportional band. Increasing gain and decreasing proportional band mean the same thing, which is why copying a number between platforms without checking the convention can invert your intent.',
      },
      {
        q: 'Should the PID run in the PLC or in the drive?',
        a: 'In the PLC for anything the plant depends on. The controller has the full process picture, the interlocks, and the historian. A drive-resident PID is convenient for a standalone booster but leaves the control strategy invisible to SCADA and difficult to change.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/deadband',
      '/controls/plc-systems/analog-control/filtering',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/how-to/plc-how-to/create-a-pid-loop',
    ],
  },
  {
    path: '/controls/plc-systems/analog-control/raw-counts',
    kind: 'reference',
    title: 'Raw Counts',
    summary:
      'What an analog input module actually hands the program: the count range, where 4 mA and 20 mA fall in it, how under-range and over-range show up, and why the module manual is the only source that counts.',
    answer:
      'An analog input module converts the field signal to an integer, the raw count, and that integer is what the program receives. The span of counts and where the signal limits fall in it depend on the module and its configuration: a 12-bit module gives 0 to 4,095, a 16-bit module something like 0 to 32,767, and some platforms use their own nominal ranges. Scaling turns counts into engineering units, and it is only right if the counts at 4 mA and 20 mA are the ones the module actually produces, which is what the module manual states.',
    keyPoints: [
      'The count range is a property of the module and its configured input range, not of the signal.',
      'On a module configured for 4 to 20 mA the bottom of the range is 4 mA; on one configured for 0 to 20 mA it is 0 mA, and 4 mA lands a fifth of the way up.',
      'Under-range and over-range appear as counts beyond the nominal span, as clamped values, or as status bits, depending on the module.',
      'Twelve bits across 4 to 20 mA is about 0.004 mA per count; sixteen bits is sixteen times finer.',
      'Read the raw count online before scaling anything. It is the one number that cannot be argued with.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Analog', 'PLC', 'Signals', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'What the converter does' },
      {
        t: 'p',
        text: 'The analog to digital converter on an input module samples the voltage across its input resistor and expresses it as an integer. The number of bits in the converter sets how many distinct values it can produce: twelve bits gives 4,096, fourteen gives 16,384, sixteen gives 65,536. The module firmware maps that converter output onto a count range that the platform has standardized, and that count is what appears in the input image and in the tag.',
      },
      {
        t: 'p',
        text: 'The mapping is the part that varies. One platform presents a 4 to 20 mA signal as 0 to 32,767 with 4 mA at zero. Another presents 0 to 20 mA as 0 to 32,767, so 4 mA is at 6,553. A third uses a nominal range that ends at 27,648 with room above it for over-range. A fourth can be configured to deliver floating point engineering units directly, so the program never sees a count. None of these is wrong, and all of them break a scaling block written for one of the others.',
      },
      {
        t: 'table',
        caption: 'Common count conventions, as examples only',
        head: ['Convention', 'Counts at 4 mA', 'Counts at 20 mA', 'Where it is seen'],
        rows: [
          ['12-bit, 4 to 20 mA range', '0', '4,095', 'Older and smaller controllers'],
          ['12-bit, 0 to 20 mA range', '819', '4,095', 'Modules configured for the wider range'],
          ['16-bit signed, 4 to 20 mA range', '0', '32,767', 'Many modular platforms'],
          ['16-bit signed, 0 to 20 mA range', '6,553', '32,767', 'The same modules on the wider range'],
          ['Nominal 27,648 with over-range', '0', '27,648', 'Platforms that reserve counts above nominal for over-range'],
          ['Engineering units mode', 'n/a', 'n/a', 'The module scales in firmware and delivers a float'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The table above is illustrative. The module manual is authoritative.',
        text: 'The count at each end of the signal range is stated in the manual for the specific module and configuration. A scaling block copied from another project with a different module puts the wrong number in the tag, and it reads plausibly at mid-range, which is why it survives commissioning.',
      },
      { t: 'h2', text: 'What happens outside the range' },
      {
        t: 'p',
        text: 'A 4 to 20 mA transmitter signalling a fault drives the loop below 3.6 mA or above 21 mA, and a broken wire reads 0 mA. What the module does with a signal outside its nominal range is again a property of the module.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Counts continue beyond the span', def: 'The module reports a count below zero or above the nominal maximum, and the program can compare against thresholds. This is the most useful behavior, because 0 mA and 3.6 mA are distinguishable.' },
          { term: 'Counts clamp at the limits', def: 'Anything below 4 mA reads as the minimum count and anything above 20 mA as the maximum. A broken wire looks like an empty tank. Only the status bits distinguish them.' },
          { term: 'Status bits', def: 'Under-range, over-range, open wire, and channel fault bits in the module status words. These are the reliable indicators, and the program should read them rather than infer a fault from the count.' },
        ],
      },
      { t: 'h2', text: 'Resolution in the field' },
      {
        t: 'p',
        text: 'Across 16 mA of span, a 12-bit module resolves about 0.004 mA per count, which on a 0 to 20 foot level is about 0.005 feet, or a sixteenth of an inch. A 16-bit module resolves sixteen times finer. For a wet well level either is ample. For a flow total accumulated over a year, or a chemical dose in parts per million, the coarser resolution shows up as a steady error, and the finer module is worth its price. The analog resolution calculator on this site gives the engineering resolution for a given range and bit count.',
      },
      { t: 'h2', text: 'Reading the count online' },
      {
        t: 'p',
        text: 'When a scaled value is wrong, the raw count settles the argument. Read the input tag online, with the transmitter driven to 4, 12, and 20 mA by a calibrator or by its own simulation mode, and note the counts. Those three numbers, against the module manual, say whether the module is doing what the scaling assumes. If the counts are right and the scaled value is wrong, the scaling is wrong. If the counts are wrong, the loop or the module is, and no scaling will fix it.',
      },
    ],
    faqs: [
      {
        q: 'What is a raw count?',
        a: 'The integer an analog input module produces from the field signal, before any scaling. Its range depends on the module and its configuration, and the module manual states where the signal limits fall in it.',
      },
      {
        q: 'Why does my scaled value read wrong at the ends of the range but right in the middle?',
        a: 'The scaling assumes the wrong counts at 4 mA or 20 mA, typically because the module range is 0 to 20 mA and the scaling was written for 4 to 20 mA, or the other way round. Read the raw count at 4 and 20 mA and correct the scaling to match.',
      },
      {
        q: 'How do I tell a broken wire from a real zero?',
        a: 'On a module that reports counts below the 4 mA point, a broken wire reads far below the minimum. On a module that clamps, only the under-range or open-wire status bit tells you. Use the status bits either way; they are what the module provides for the purpose.',
      },
      {
        q: 'Should I use engineering units mode on the module?',
        a: 'It moves the scaling from the program into the module configuration, which is cleaner and removes a place for error, at the cost of making the configuration part of the documentation. Either is fine; doing both, scaling in the module and again in the program, is the mistake.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/scaling',
      '/controls/plc-systems/analog-control/4-20-ma',
      '/controls/plc-systems/analog-control/signal-validation',
      '/calculators/analog-raw-counts',
      '/calculators/analog-resolution',
    ],
  },
  {
    path: '/controls/plc-systems/analog-control/filtering',
    kind: 'reference',
    title: 'Filtering Analog Inputs',
    summary:
      'How to damp a noisy analog input in the controller without hiding a real process change: the first-order filter, the moving average, the median, where each belongs, and what never to filter.',
    answer:
      'A filter trades responsiveness for smoothness. A first-order low-pass filter, one line of arithmetic per scan, removes most of the fuzz on a measurement at the cost of a lag set by its time constant. Choose the time constant so that the lag is small compared to how fast the process can actually change, filter in one place only, and never filter a value used for a safety interlock or a fast alarm. If the signal needs heavy filtering to be usable, the wiring is the problem, not the arithmetic.',
    keyPoints: [
      'A first-order filter is y = y + a(x - y), and the smoothing constant a comes from the scan time and the time constant you want.',
      'The lag is the price. A filter that hides a two-second disturbance also delays a two-second real change.',
      'A median filter kills single-scan spikes without lag; a moving average smooths but delays; combine them for spiky, noisy signals.',
      'Filter once, in the controller or the module, and say where in the documentation.',
      'Interlocks, trips, and fast alarms read the unfiltered value.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Analog', 'PLC', 'Signals', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Why the signal is noisy' },
      {
        t: 'p',
        text: 'Before filtering anything, ask where the noise comes from. Induced noise from a drive cable, a ground loop, or a loop running out of voltage are wiring problems and the pages on those subjects fix them at the source. Turbulence at a level probe or pulsation at a pressure tap is real process movement that a filter legitimately smooths. A filter applied to a wiring problem hides the symptom and leaves the cause to get worse.',
      },
      { t: 'h2', text: 'The first-order filter' },
      {
        t: 'p',
        text: 'The workhorse is the exponential, or first-order low-pass, filter. Each scan the filtered value moves a fraction of the way from where it was toward the new reading.',
      },
      {
        t: 'formula',
        expr: 'y = y + a x (x - y)',
        where: [
          'x is the new raw reading this scan',
          'y is the filtered value, carried from the previous scan',
          'a is the smoothing constant between 0 and 1, computed as dt / (T + dt)',
          'dt is the scan or task period and T is the filter time constant, in the same units',
        ],
      },
      {
        t: 'p',
        text: 'The time constant T is the tuning knob. After a step change in the input, the filtered value reaches about 63 percent of the change in one time constant and about 95 percent in three. A time constant of two seconds means a real change is mostly visible after six seconds. Choose it from how fast the process can genuinely change, not from how smooth you want the trend to look.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Compute a from the task period, do not guess it',
        text: 'A smoothing constant of 0.1 means something different in a 10 ms task than in a 500 ms task. Put the time constant in a tag in seconds, compute a from the actual period each scan, and the filter behaves the same when someone later changes the task rate.',
      },
      { t: 'h2', text: 'Other filters' },
      {
        t: 'dl',
        items: [
          { term: 'Moving average', def: 'The mean of the last N readings. Smooths evenly, delays by about half the window, and costs N words of memory. It is what a chart recorder does, and it is fine for slow signals, but the first-order filter does the same job with less memory and a cleaner response.' },
          { term: 'Median', def: 'The middle value of the last three or five readings. A single-scan spike from a radio burst or a relay switching never makes it through, and there is almost no lag. It does nothing for continuous fuzz. Put it ahead of a first-order filter on a signal that has both spikes and noise.' },
          { term: 'Rate limit', def: 'Clamps how far the value can move per scan. Useful where a physical quantity cannot change faster than a known rate, dangerous where it can, because it hides a genuine fast event.' },
          { term: 'Module hardware filter', def: 'Most analog modules offer an input filter or an integration time, often set to reject 50 or 60 Hz. It is applied before the count reaches the program and it is the right place to handle mains-frequency pickup. It adds lag like any other filter, and it is easy to forget it is there.' },
        ],
      },
      { t: 'h2', text: 'Where to filter and where not to' },
      {
        t: 'table',
        caption: 'What reads the filtered value',
        head: ['Use', 'Filtered?', 'Why'],
        rows: [
          ['Operator display and trend', 'Yes', 'A steady number is easier to read and the lag does not matter'],
          ['PID measurement', 'Lightly', 'Noise in the measurement drives the output through the derivative and proportional terms; a small time constant helps, a large one destabilizes the loop'],
          ['Totalizer', 'Yes, lightly', 'Noise averages out over the total anyway, so a light filter changes little'],
          ['Level start and stop setpoints', 'Yes, with deadband', 'Prevents chatter around the setpoint; the deadband page covers the pairing'],
          ['High and low alarms', 'Depends on the alarm', 'A nuisance alarm from noise wants a filter or a delay; an alarm that must catch a fast event wants neither'],
          ['Safety interlock or trip', 'No', 'The lag delays the trip. Use the raw value and a hardwired device where the consequence is serious'],
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'A filtered value can hide the event the interlock exists for',
        text: 'A high pressure trip on a filtered signal fires late by the time constant. If the consequence of that delay is a burst pipe or a person hurt, the interlock reads the raw signal, and where the consequence is serious the trip is hardwired and not in the program at all.',
      },
      { t: 'h2', text: 'One filter, documented' },
      {
        t: 'p',
        text: 'The failure mode of filtering is not too little; it is too much, in too many places. The transmitter has a damping setting. The module has a hardware filter. The program has a first-order filter. The SCADA tag has a deadband and a smoothing option. Each was added by a different person to fix a symptom, and together they turn a real change into a slow drift that arrives a minute late. Decide where the filter lives, set the others to zero, and write the time constant into the narrative beside the tag.',
      },
    ],
    faqs: [
      {
        q: 'What time constant should I use?',
        a: 'Short enough that the lag is small compared with the fastest change the process can make, and long enough to remove the noise. A level in a wet well can take several seconds. A pressure loop on a pump takes a fraction of a second or none. Start small and lengthen only as far as needed.',
      },
      {
        q: 'Should I filter the input to a PID loop?',
        a: 'Lightly, if the measurement is noisy, because noise reaches the output through the proportional and derivative terms. A heavy filter adds lag inside the loop and makes it unstable. Fix the noise at the source first.',
      },
      {
        q: 'Where does the transmitter damping setting fit in?',
        a: 'It is a filter in the transmitter, applied before the signal leaves the field. It is one of the places a filter can live, and it should be the only one if it is used. Note it on the instrument data sheet.',
      },
      {
        q: 'How do I remove single spikes without adding lag?',
        a: 'A median filter over three or five readings. A single bad reading is never the middle value, so it never reaches the output, and the response to a real change is delayed by one or two scans only.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/deadband',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/plc-systems/analog-control/pid',
      '/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable',
      '/controls/instrumentation/signals/ground-loops',
    ],
  },
  {
    path: '/controls/plc-systems/analog-control/deadband',
    kind: 'reference',
    title: 'Deadband and Hysteresis',
    summary:
      'Why a single setpoint chatters, how a deadband turns it into a start point and a stop point, how wide to make it, and where deadbands belong in alarms, level control, and controller outputs.',
    answer:
      'A comparison against a single setpoint switches back and forth every scan while the measurement sits near it, because noise crosses the line in both directions. A deadband replaces the one line with two: the action turns on at one value and off at another, and the measurement has to travel the whole gap to change state. The gap is sized from the noise on the measurement, with margin, and from how often the equipment can tolerate switching.',
    keyPoints: [
      'One setpoint plus noise equals chatter. Two setpoints with a gap equals a decision that sticks.',
      'Size the gap at two to three times the peak-to-peak noise on the measurement, and wider if the equipment cannot switch often.',
      'Level control deadband is the pumping band: it sets cycles per hour and it is a design number, not a tuning afterthought.',
      'Alarms need deadband too, or they clear and re-alarm continuously at the limit.',
      'An output deadband on a controller stops a valve or a drive from working for nothing.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Analog', 'PLC', 'Programming', 'Control', 'Pumps'],
    blocks: [
      { t: 'h2', text: 'The problem' },
      {
        t: 'p',
        text: 'A rung that starts a pump when level is greater than six feet and stops it when level is not greater than six feet works perfectly on paper. In the well the level reads 5.98, 6.01, 5.99, 6.02 as the surface moves and the signal carries a little noise, and the pump starts and stops several times a second until the starter fails. The comparison is not wrong; the measurement is not a single number, and the logic treated it as one.',
      },
      { t: 'h2', text: 'Hysteresis' },
      {
        t: 'p',
        text: 'The fix is to make the on decision and the off decision different: start at 6.0 feet, stop at 4.5 feet. Once started, the level has to fall a foot and a half before the pump stops, and noise of a few hundredths cannot do that. The state depends on the history as well as the value, which is what hysteresis means, and every thermostat, pressure switch, and float switch has it built in mechanically. In a program it has to be written.',
      },
      {
        t: 'formula',
        expr: 'Start when PV >= Start setpoint; stop when PV <= Stop setpoint; otherwise hold the current state',
        where: [
          'PV is the measurement',
          'Start and Stop setpoints differ by the deadband',
          'The hold is a latched bit or a seal-in rung, not a comparison',
        ],
      },
      {
        t: 'p',
        text: 'The logic is a seal-in: the output latches on at the start condition and stays on until the stop condition. Written as two comparisons and a latch, it reads the same way to everyone who opens the program, which matters more than cleverness.',
      },
      { t: 'h2', text: 'How wide' },
      {
        t: 'p',
        text: 'The minimum deadband is set by the noise. Look at the measurement on a trend with the process steady and read the peak-to-peak movement; the deadband should be at least two or three times that, so that noise cannot cross both thresholds. Above the minimum, the deadband is set by the process and the equipment.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Level control', def: 'The band between start and stop is the storage used per cycle. Wider means fewer, longer runs; narrower means more cycles. Motor starters and pumps are rated for a number of starts per hour, and the wet well cycle calculator turns a band into a cycle time for a given inflow.' },
          { term: 'Pressure switching', def: 'A hydropneumatic tank and a constant speed pump switch on a pressure band, and the band with the tank volume sets the cycle rate. A band that is too narrow short-cycles the pump.' },
          { term: 'Temperature', def: 'Heaters and coolers with a deadband run in a band around setpoint. Thermal lag means the temperature keeps moving after the output switches, so the band the process actually sees is wider than the one in the program.' },
          { term: 'Alarms', def: 'An alarm at 8.0 feet that clears at 7.99 chatters in and out of alarm while the level sits near the limit, filling the log and training the operator to ignore it. Clear it at 7.5 feet, or after a time below the limit.' },
        ],
      },
      { t: 'h2', text: 'Deadband on a controller output' },
      {
        t: 'p',
        text: 'A PID loop with a small persistent error keeps nudging the valve or the drive, and the equipment wears for no benefit. An output deadband holds the output steady while the error is inside a small band around zero, and the loop only acts when the error is worth acting on. It is a separate thing from the setpoint deadband above, it is set in the loop configuration on most platforms, and it is sized from what movement the final element can actually make: a valve that cannot position closer than one percent gains nothing from being asked to move a tenth.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Deadband is not a substitute for a filter, and a filter is not a substitute for deadband',
        text: 'A filter smooths the measurement; a deadband decides when to act. A noisy signal with a wide deadband and no filter switches correctly but displays badly. A filtered signal with no deadband displays well and still chatters at the setpoint, just more slowly. Most control uses both, each doing its own job.',
      },
      { t: 'h2', text: 'In SCADA' },
      {
        t: 'p',
        text: 'SCADA tags have a deadband of their own: the change a value has to make before it is logged or transmitted. It exists to keep noise out of the historian and off the network, and it is the reason a trend from the historian looks smoother than the value in the controller. It is a logging decision, not a control one, and it should be documented separately, because a historian deadband set too wide discards the detail that a troubleshooter later needs.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between deadband and hysteresis?',
        a: 'Hysteresis is the behavior: the state depends on the direction the measurement came from. Deadband is the number: the gap between the value that turns something on and the value that turns it off. In practice the words are used interchangeably.',
      },
      {
        q: 'How do I pick the deadband for a lift station?',
        a: 'From the cycle rate. The band between lead start and stop, with the well area and the inflow, sets starts per hour, and the pump and starter ratings set the maximum. The wet well cycle calculator on this site does the arithmetic. The band also has to keep the stop level above the pump intake and the start level below the high alarm.',
      },
      {
        q: 'Why does my alarm keep going in and out?',
        a: 'The alarm sets and clears at the same value, and the measurement is sitting on it. Give the alarm a deadband, so it clears only after the value has moved a useful distance back, or a delay, so it clears only after the value has stayed back for a time.',
      },
      {
        q: 'Where do I put the deadband on a PID loop?',
        a: 'On the output, in the loop configuration, sized to the smallest movement the valve or drive can usefully make. Not on the setpoint, and not on the measurement, which is the filter’s job.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/filtering',
      '/controls/plc-systems/analog-control/pid',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/calculators/wet-well-cycle',
      '/controls/plc-systems/programming/alarms',
    ],
  },
  {
    path: '/controls/plc-systems/analog-control/signal-validation',
    kind: 'reference',
    title: 'Signal Validation',
    summary:
      'Catching a failed analog input in logic before it runs a pump on a dead transmitter: range checks, module status bits, frozen-value detection, rate checks, and what the program does with a bad value.',
    answer:
      'An analog input is validated by checking that it is within the range a healthy loop can produce, that the module reports the channel healthy, that it is changing when the process is, and that it is not moving faster than physics allows. When any check fails, the program marks the value bad, stops controlling on it, does something defined and safe, and alarms. A controller that keeps acting on a value it has no reason to trust is the most common way a good program does a bad thing.',
    keyPoints: [
      'Range check against the NAMUR fault bands: below 3.6 mA or above 21 mA is a transmitter fault, not a measurement.',
      'Use the module status bits. They report open wire, under-range, and over-range without any inference.',
      'A value that has not changed at all for a long time while the process runs is frozen, and frozen is bad.',
      'A rate-of-change check catches a spike or a step that the process could not physically produce.',
      'On bad: hold or substitute according to the narrative, stop the affected control, alarm, and carry the quality to SCADA.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Analog', 'PLC', 'Signals', 'Programming', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'What can go wrong with a good-looking number' },
      {
        t: 'p',
        text: 'A 4 to 20 mA input that reads 12.0 mA is a plausible value for almost anything. It is also what a shorted loop, a frozen transmitter, or a stuck analog input channel can read. The program compares it with a setpoint and acts, and nothing in the comparison knows the number is a lie. Validation is the set of checks that give the program a reason to trust a value, or a reason not to.',
      },
      { t: 'h2', text: 'The checks' },
      {
        t: 'dl',
        items: [
          { term: 'Range', def: 'A healthy loop reads between about 3.8 and 20.5 mA, allowing for calibration and over-range. Below 3.6 mA or above 21 mA is the NAMUR NE 43 fault band, which a transmitter uses on purpose to say it has failed, and 0 mA is a broken wire. Compare the raw count, before scaling, against the counts for those currents from the module manual.' },
          { term: 'Module status', def: 'Diagnostic modules set bits for open wire, under-range, over-range, and channel fault. They are direct evidence and they should be the first thing the validation logic reads.' },
          { term: 'Frozen value', def: 'A live measurement of a real process changes, if only in the last digit. A value that has been exactly the same for minutes while pumps run and flows vary is frozen: a failed transmitter, a stuck channel, or a stale value from a communication link. Detect it by comparing the current value with the value some time ago, with a tolerance and a time window chosen for the signal.' },
          { term: 'Rate of change', def: 'A tank cannot fill in a second. A value that jumps by more than the process could move in one scan is a spike or a step from an electrical event. Flag it, and treat the previous value as current until the next reading agrees.' },
          { term: 'Cross check', def: 'Where two measurements should agree, a transducer and a float, two flowmeters in series, a pressure and a level, disagreement beyond a tolerance is a fault in one of them. It is the strongest check and the one that requires the most thought about which to believe.' },
        ],
      },
      { t: 'h2', text: 'What to do when it fails' },
      {
        t: 'p',
        text: 'A bad flag is only useful if the program does something with it, and what it does is a design decision written into the control narrative for each loop.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Stop controlling on the value.', text: 'A PID loop reading a bad measurement goes to manual at its last output, or to a defined safe output. A level control on a bad level falls back to floats or to a timed cycle. The narrative says which.' },
          { title: 'Substitute or hold.', text: 'Some loops hold the last good value for a limited time. Some substitute a fixed value that puts the process in a safe state. Some stop. Holding forever is the one option that is never right, because the process moves on while the value does not.' },
          { title: 'Alarm.', text: 'An instrument-failure alarm, distinct from the process alarm, so the operator knows the tank is not reading rather than that the tank is empty. Priority according to what the loop controls.' },
          { title: 'Carry the quality.', text: 'Set the tag quality bad in SCADA, so the value displays as bad rather than as a plausible number, and so the historian records the gap rather than a flat line.' },
          { title: 'Recover deliberately.', text: 'When the checks pass again, hold for a settling time before trusting the value, and consider requiring an operator acknowledgment before automatic control resumes on a loop that matters.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Failure direction is a design choice',
        text: 'A transmitter can be configured to fail high or fail low. A level transmitter that fails low reads an empty well and stops the pumps, which is safe for the pumps and disastrous for the neighborhood. Choose the failure direction for each instrument so that the control response to the fault current is the safe one, and make sure the validation logic reacts to the fault before the control logic does.',
      },
      { t: 'h2', text: 'Keeping it maintainable' },
      {
        t: 'p',
        text: 'Validation written separately for every input becomes a program nobody can read. Write it once as a routine or a function block that takes the raw count, the status bits, the range limits, and the tolerances, and returns the value with a quality flag, and call it for every analog input. The tolerances then live in tags beside the instrument, documented with it, and a change to the method is made in one place.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Test it by failing the instrument',
        text: 'At FAT and again at startup, disconnect each analog input, drive it out of range with a calibrator, and hold it frozen. Watch the program do what the narrative says. A validation scheme that has never seen a failed signal has not been tested.',
      },
    ],
    faqs: [
      {
        q: 'What current means a transmitter has failed?',
        a: 'Under NAMUR NE 43, below 3.6 mA or above 21 mA, which most transmitters use deliberately to signal a diagnostic failure. A broken wire reads 0 mA. Anything between about 3.8 and 20.5 mA is a measurement, possibly a wrong one.',
      },
      {
        q: 'How long before a value counts as frozen?',
        a: 'Long enough that a healthy signal would certainly have changed, which depends on the signal. A wet well level changes within a minute or two. A tank level at night might not change for ten minutes. Set the window per signal and the tolerance to a little more than the noise.',
      },
      {
        q: 'Should the program hold the last good value?',
        a: 'For a short time, while the fault is confirmed and the operator is alerted. Not indefinitely. The process keeps moving while the value does not, and a stale value that looks current is the most dangerous kind.',
      },
      {
        q: 'Do I still need validation if the module has diagnostics?',
        a: 'Yes. The module catches open wires and out-of-range currents. It cannot tell that a transmitter is frozen at a plausible value or that it disagrees with the float beside it. The status bits are the first check, not the only one.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/raw-counts',
      '/controls/plc-systems/analog-control/filtering',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/controls/instrumentation/level/wet-well-level',
      '/troubleshooting/instrumentation-troubleshooting/signal-pegged-high-or-low',
    ],
  },
  {
    path: '/controls/plc-systems/analog-control/engineering-units',
    kind: 'reference',
    title: 'Engineering Units',
    summary:
      'Choosing and documenting the units a tag carries: where the unit is decided, how it flows from transmitter range to controller scaling to screen and historian, the conventions used in water and wastewater, and the mismatches that put a wrong number on screen.',
    answer:
      'An engineering unit is the physical unit a scaled value represents, and it has to be the same at every point where the value is used: the transmitter range, the controller scaling, the tag on the screen, the alarm setpoints, the historian, and the reports. The controller is the right place to convert raw counts into engineering units once, in a floating point tag, with the unit written into the tag description and the I/O list; everything downstream then displays and stores that value without converting again. Most unit problems are not conversions done wrong but conversions done twice, done in one place and not another, or done against a range that someone changed. The discipline is a single documented unit per tag, chosen from the plant conventions, applied in the controller, and carried unchanged to every consumer.',
    keyPoints: [
      'Convert to engineering units once, in the controller, into a floating point tag; every consumer uses that value.',
      'The unit is part of the tag definition: in the description, the I/O list, the screen, and the historian.',
      'Pick units from the plant conventions and keep them: gallons per minute or million gallons per day, feet or psi, not both for the same kind of tag.',
      'A transmitter range change is a unit change until the controller scaling is updated to match.',
      'Alarm setpoints, totalizers, and reports inherit the unit; a wrong unit at the tag is wrong everywhere.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['PLC', 'Analog', 'Engineering', 'Documentation', 'Water'],
    blocks: [
      { t: 'h2', text: 'Where the unit is decided' },
      {
        t: 'p',
        text: 'The unit starts at the instrument: a transmitter is ranged in a unit, and its 4 to 20 milliamps represents that range. The controller scales the raw count to the same range in the same unit, and from that point the value is a number with a meaning. The screen shows the unit next to the number, the alarm setpoints are entered in it, the historian stores it, and the report prints it. Each of those places can hold its own idea of the unit, which is why the unit has to be written down where every one of them can be checked against it: the tag description in the controller and the instrument entry in the I/O list.',
      },
      {
        t: 'table',
        head: ['Place', 'What it holds', 'Must match'],
        rows: [
          ['Transmitter', 'Lower and upper range values in a unit', 'The design range on the instrument list'],
          ['Controller scaling', 'Raw minimum and maximum to engineering minimum and maximum', 'The transmitter range and unit exactly'],
          ['Controller tag', 'The scaled floating point value; the unit in the description', 'The I/O list'],
          ['Screen', 'Value, format, and the unit label', 'The controller tag unit'],
          ['Alarm setpoints', 'Numbers entered by engineers and operators', 'The controller tag unit'],
          ['Historian', 'The value and a unit attribute', 'The controller tag unit'],
          ['Reports and totals', 'Sums, averages, and conversions for compliance', 'The historian unit; conversions documented'],
        ],
      },
      { t: 'h2', text: 'Conventions in water and wastewater' },
      {
        t: 'table',
        head: ['Measurement', 'Usual units', 'Notes'],
        rows: [
          ['Flow, pumps and pipes', 'gpm', 'Instantaneous rate on screens and in control logic'],
          ['Flow, plant and reporting', 'MGD', 'Daily and regulatory reporting; 1 MGD = 694.4 gpm'],
          ['Level, wells and tanks', 'ft', 'Above a documented datum, usually the tank floor or the wet well invert'],
          ['Pressure', 'psi', 'Distribution and pump discharge; convert to head only in hydraulic calculations'],
          ['Head', 'ft', '2.31 feet of water per psi for fresh water'],
          ['Chemical residuals and concentrations', 'mg/L', 'Chlorine, fluoride, phosphorus, ammonia'],
          ['Turbidity', 'NTU', 'Filter effluent and raw water'],
          ['pH', 'pH', 'Unitless on a 0 to 14 scale'],
          ['Dissolved oxygen', 'mg/L or percent saturation', 'Choose one for control; document it'],
          ['Speed', 'percent or Hz', 'Drive reference; percent is friendlier on screens'],
          ['Temperature', 'degrees F or C', 'One plant, one convention'],
          ['Volume', 'gal or MG', 'Totalizers; roll over documented'],
          ['Chemical feed', 'gph or lb/day', 'Match the pump and the dosing calculation'],
        ],
      },
      {
        t: 'formula',
        expr: 'MGD = gpm × 1440 ÷ 1,000,000',
        where: [
          'MGD = million gallons per day',
          'gpm = gallons per minute',
          '1440 = minutes per day',
        ],
      },
      {
        t: 'formula',
        expr: 'head (ft) = psi × 2.31 ÷ SG',
        where: [
          'head = feet of liquid column',
          'psi = gauge pressure',
          'SG = specific gravity, 1.0 for fresh water',
        ],
      },
      { t: 'h2', text: 'Convert once' },
      {
        t: 'p',
        text: 'The controller holds the raw count and produces one scaled value in engineering units, in a floating point tag, using the range from the instrument list. That tag is the value. Screens format it and label it but do not rescale it; the historian stores it as it is; reports convert it for presentation, with the conversion written into the report and not into the tag. A second scaling in the screen tag, a percent tag derived from an engineering tag and then displayed as if it were engineering, or a historian that stores the raw count and scales on retrieval are the ways the same measurement ends up with three values.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Range changes',
        text: 'When a transmitter is re-ranged, the controller scaling has to follow the same day, and the alarm setpoints, the screen ranges, the historian limits, and any calculation that assumed the old span have to be reviewed. A range change without the rest is a unit error that looks like a calibration problem.',
      },
      { t: 'h2', text: 'Documenting it' },
      {
        t: 'ul',
        items: [
          'The I/O list carries the range and unit for every analog point, and it is the reference the controller scaling is checked against.',
          'The tag description in the controller states the unit: Wet well level, ft above invert.',
          'Screen labels show the unit next to every value; a number without a unit is a guess.',
          'Historian tag attributes carry the unit so that reports and exports are labeled.',
          'Totalizer tags state the unit and the rollover value.',
          'Derived values state what they were derived from and how, especially conversions between rate and daily volume.',
        ],
      },
      { t: 'h2', text: 'Mistakes that recur' },
      {
        t: 'dl',
        items: [
          { term: 'Gallons per minute shown as million gallons per day', def: 'A rate tag labeled with a daily unit, or a daily total divided incorrectly. The report and the screen disagree by a factor of 694.' },
          { term: 'Pressure and head confused', def: 'A tank level in feet compared with a pressure setpoint in psi; a difference of 2.31 that looks like a calibration drift.' },
          { term: 'Gauge and absolute', def: 'A transmitter ranged in absolute pressure scaled as gauge; a constant offset of 14.7 psi at sea level.' },
          { term: 'Percent of range as engineering', def: 'A tag scaled 0 to 100 percent displayed with an engineering label; correct at the ends and wrong everywhere between if the range does not start at zero.' },
          { term: 'Level datum', def: 'A transmitter zeroed at its own elevation while the screen implies the tank floor; the level reads high or low by the mounting height.' },
          { term: 'Temperature scale', def: 'A Celsius transmitter on a Fahrenheit plant; alarms set in the wrong scale.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Should the controller work in percent and let the screen convert?',
        a: 'No. Percent hides the range and the unit, and every consumer then needs the range to make sense of the number. The controller scales to engineering units once; a percent value can be derived for a bar graph if a screen wants one.',
      },
      {
        q: 'Where do I convert gallons per minute to million gallons per day?',
        a: 'In the report or the daily totalizer calculation, documented as a conversion, not in the flow tag. The flow tag stays in the unit the instrument and the control logic use.',
      },
      {
        q: 'What data type should an engineering unit tag be?',
        a: 'A 32-bit floating point value. Integers scaled by ten or a hundred were a memory-saving habit on old controllers and now cause more errors than they save; a float carries the value and its precision without a hidden scale factor.',
      },
      {
        q: 'The transmitter is ranged in feet and the operators think in gallons. Which does the tag carry?',
        a: 'The measured unit, feet. A volume in gallons is a calculation from the tank geometry, done in the controller into a second tag with its own description. Both are real values; neither is the other relabeled.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/scaling',
      '/controls/plc-systems/analog-control/raw-counts',
      '/how-to/plc-how-to/scale-a-4-20-ma-input',
      '/engineering-library/lists-schedules/io-lists',
      '/troubleshooting/instrumentation-troubleshooting/analog-does-not-match-field-indicator',
      '/controls/scada-hmi/historian-data/reporting',
    ],
  },
];
