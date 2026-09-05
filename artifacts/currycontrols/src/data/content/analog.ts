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
];
