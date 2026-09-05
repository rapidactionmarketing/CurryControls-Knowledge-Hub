import type { Entry } from '../content-types';

export const HOWTO_ENTRIES: Entry[] = [
  {
    path: '/how-to/plc-how-to/scale-a-4-20-ma-input',
    kind: 'howto',
    title: 'How to Scale a 4-20 mA Input in a PLC',
    summary:
      'Turn raw analog counts into engineering units, verify at three points, and add the validity checks that stop a failed transmitter from producing a believable number.',
    answer:
      'To scale a 4-20 mA input, find the raw counts your analog card reports at 4 mA and 20 mA, get the transmitter calibrated range, then apply EU = (Raw − Raw_min) ÷ (Raw_max − Raw_min) × (EU_max − EU_min) + EU_min. Verify by injecting 4, 12, and 20 mA and confirming the scaled value reads the bottom, middle, and top of the calibrated range.',
    keyPoints: [
      'You need three facts: card counts at 4 and 20 mA, and the transmitter calibrated range.',
      'Verify at 50%, not just at zero. A span error is invisible at the bottom of the range.',
      'Clamp the result and flag out-of-range values instead of scaling a fault into a plausible number.',
      'Record the calibrated range on the loop sheet so the next person can find it.',
    ],
    supplies: [
      'Loop calibrator or a milliamp source',
      'The analog module manual, for the raw count range',
      'The transmitter configuration or its calibration record',
      'Programming software with online monitoring',
      'The loop sheet or instrument list for this point',
    ],
    published: '2026-02-14',
    updated: '2026-08-12',
    readingTime: 7,
    tags: ['PLC', 'Analog', 'How-To'],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Before you start',
        text: 'Injecting current into a live loop drives the control system with a value you chose. Notify operations, put any affected control loop in manual, and confirm nothing will start or stop as a result of the values you are about to send.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          {
            title: 'Confirm the analog card range configuration',
            text: 'Check whether the channel is configured for 4-20 mA or 0-20 mA. A channel set for 0-20 mA reading a 4-20 mA transmitter reads 25% high at zero, and the error shrinks toward full scale, which looks exactly like calibration drift. Fix this before doing anything else.',
          },
          {
            title: 'Find the raw counts at 4 mA and 20 mA',
            text: 'Read the module manual, then verify it. Inject 4.00 mA and record the raw value online. Inject 20.00 mA and record it. Do not assume 0 and 32767; modules vary widely and some report offset ranges.',
          },
          {
            title: 'Get the transmitter calibrated range',
            text: 'Read it from the transmitter display, a HART communicator, or the calibration record. Do not take it from the drawing, because re-ranging in the field is common and drawings are rarely updated.',
          },
          {
            title: 'Write the scaling',
            text: 'Apply the linear formula. Use a floating point result. If your platform has a scaling instruction, use it, but confirm what its parameters mean because vendors differ in whether they take input range or a slope and offset.',
          },
          {
            title: 'Verify at three points',
            text: 'Inject 4 mA and confirm the bottom of the range. Inject 12 mA and confirm exactly the midpoint. Inject 20 mA and confirm the top. The midpoint check is the one that catches span errors, and it is the one people skip.',
          },
          {
            title: 'Add validity checking',
            text: 'Test the raw value against the NAMUR fault thresholds and set a separate fault bit. Clamp the scaled result to the calibrated range. Hold the last good value when faulted, and make the held state visible.',
          },
          {
            title: 'Restore and document',
            text: 'Remove the calibrator, confirm the live reading is sensible, return the loop to automatic, and record the calibrated range and the raw endpoints on the loop sheet.',
          },
        ],
      },
      { t: 'h2', text: 'The arithmetic' },
      {
        t: 'formula',
        expr: 'EU = (Raw − Raw_min) ÷ (Raw_max − Raw_min) × (EU_max − EU_min) + EU_min',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Structured text implementation with validity handling',
        code: `(* Constants for this point *)
RAW_MIN   := 0.0;        (* counts at 4 mA  *)
RAW_MAX   := 32767.0;    (* counts at 20 mA *)
EU_MIN    := 0.0;        (* ft at 4 mA  *)
EU_MAX    := 25.0;       (* ft at 20 mA *)
RAW_FAULT_LO := -1638.0; (* about 3.2 mA  *)
RAW_FAULT_HI := 34406.0; (* about 21 mA   *)

Level_Fault := (Raw < RAW_FAULT_LO) OR (Raw > RAW_FAULT_HI);

IF NOT Level_Fault THEN
    Level := (Raw - RAW_MIN) / (RAW_MAX - RAW_MIN)
             * (EU_MAX - EU_MIN) + EU_MIN;

    (* clamp so downstream logic never sees the impossible *)
    IF Level < EU_MIN THEN Level := EU_MIN; END_IF;
    IF Level > EU_MAX THEN Level := EU_MAX; END_IF;

    Level_Good := Level;   (* remember the last trustworthy value *)
ELSE
    Level := Level_Good;   (* hold, and flag it as held on the HMI *)
END_IF;`,
      },
      { t: 'h2', text: 'Verification table' },
      {
        t: 'table',
        caption: 'Expected values for a 0-25 ft range on a 0-32767 count card',
        head: ['Inject', 'Expected raw', 'Expected engineering value', 'Percent'],
        rows: [
          ['4.00 mA', '0', '0.0 ft', '0%'],
          ['8.00 mA', '8192', '6.25 ft', '25%'],
          ['12.00 mA', '16384', '12.5 ft', '50%'],
          ['16.00 mA', '24575', '18.75 ft', '75%'],
          ['20.00 mA', '32767', '25.0 ft', '100%'],
        ],
      },
      { t: 'h2', text: 'If the numbers do not match' },
      {
        t: 'table',
        head: ['What you see', 'Cause', 'Fix'],
        rows: [
          ['Reads 25% high at 4 mA, correct at 20 mA', 'Card configured for 0-20 mA', 'Change the channel range configuration'],
          ['Correct at 4 mA, wrong at 20 mA', 'Span mismatch between transmitter and program', 'Compare the transmitter upper range value to EU_MAX'],
          ['Constant offset across the whole range', 'EU_MIN wrong, often a suppressed zero', 'Set EU_MIN to the actual lower range value'],
          ['Result is an integer that jumps', 'Integer math truncating the division', 'Do the arithmetic in floating point'],
          ['Value negative at true zero', 'Transmitter slightly below 4 mA', 'Clamp, and check the transmitter zero'],
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I use the built-in scaling instruction or write the math?',
        a: 'Either works. The built-in instruction is fine if you understand its parameters, which differ between platforms. Writing the arithmetic explicitly makes the constants visible to whoever opens the program next, which has real maintenance value.',
      },
      {
        q: 'What raw value corresponds to 4 mA on my card?',
        a: 'Read the module manual and then verify by injection. There is no universal answer, and assuming one is the most common cause of a scaling error.',
      },
      {
        q: 'Do I need to clamp the output?',
        a: 'Yes. Without clamping, a transmitter at 3.9 mA produces a slightly negative level and a fault at 21.5 mA produces a level above the top of the well. Downstream logic will act on both.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/scaling',
      '/controls/plc-systems/analog-control/4-20-ma',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/controls/plc-systems/analog-control/signal-validation',
    ],
  },

  {
    path: '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
    kind: 'howto',
    title: 'How to Test a 4-20 mA Loop',
    summary:
      'Prove a current loop end to end with a meter and a calibrator, without interrupting a process you were not authorized to interrupt.',
    answer:
      'Test a 4-20 mA loop by first measuring non-intrusively, reading voltage across the known input resistor, where 1.000 V across 250 ohms equals 4 mA and 5.000 V equals 20 mA. If you need the transmitter output directly, break the loop and insert a meter in series on milliamps. To test the receiving end, disconnect the transmitter and inject known currents with a calibrator.',
    keyPoints: [
      'Measure voltage across the sense resistor first; it interrupts nothing.',
      'A series milliamp measurement opens the loop and the receiver will see a fault.',
      'Injecting current tests the receiving half; measuring tests the sending half.',
      'Do both halves separately and you will know which side owns the problem.',
      'Always tell operations before you drive a control input with a value you invented.',
    ],
    supplies: [
      'Digital multimeter with a milliamp range',
      'Loop calibrator, source and measure',
      'The loop sheet or wiring diagram for this circuit',
      'HART communicator if the transmitter supports it',
      'Small screwdriver and a way to safely land a lifted conductor',
    ],
    published: '2026-03-18',
    updated: '2026-08-06',
    readingTime: 8,
    tags: ['Instrumentation', 'How-To', '4-20 mA', 'Troubleshooting'],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Get permission first',
        text: 'Breaking a loop makes the control system see 0 mA. Injecting current makes it see whatever you chose. Either can start a pump, close a valve, or trip an alarm. Notify operations, put affected loops in manual, and confirm what the logic does with the values you are about to send.',
      },
      { t: 'h2', text: 'Method 1: measure without interrupting' },
      {
        t: 'steps',
        items: [
          {
            title: 'Identify the sense resistor',
            text: 'Most analog inputs present a known resistance, commonly 250 ohms. Some panels include a dedicated test resistor. Confirm the value from the module documentation rather than assuming.',
          },
          {
            title: 'Measure DC volts across it',
            text: 'Set the meter to DC volts and place the leads across the resistor or the input terminals. Nothing is interrupted and the process is unaffected.',
          },
          {
            title: 'Convert to current',
            text: 'Divide voltage by resistance. Across 250 ohms, 1.000 V is 4 mA, 3.000 V is 12 mA, and 5.000 V is 20 mA.',
          },
          {
            title: 'Compare against the HMI',
            text: 'Convert your measured current to a percentage of span and compare it against what the HMI shows. If they agree, the scaling is right and any error is upstream at the transmitter or in the field.',
          },
        ],
      },
      {
        t: 'formula',
        expr: 'I (mA) = V_measured ÷ R_sense × 1000',
        where: ['V_measured — volts across the sense resistor', 'R_sense — resistance in ohms, commonly 250'],
      },
      { t: 'h2', text: 'Method 2: series measurement of the actual loop current' },
      {
        t: 'steps',
        items: [
          {
            title: 'Prepare',
            text: 'Confirm the loop is in manual or otherwise safe to interrupt. Set the meter to DC milliamps and move the red lead to the milliamp jack. Verify the meter fuse is good, because a blown milliamp fuse reads zero and will send you chasing a fault that does not exist.',
          },
          {
            title: 'Use test jacks if the transmitter has them',
            text: 'Many transmitters include test terminals that insert the meter without opening the loop. Use them when available; this is the whole reason they exist.',
          },
          {
            title: 'Otherwise break the loop and insert the meter',
            text: 'Lift one conductor at a terminal, place the meter in series between the lifted wire and the terminal, and restore the circuit through the meter. Reading current in parallel across a live loop will blow the meter fuse and may damage the meter.',
          },
          {
            title: 'Read and compare',
            text: 'The measured current is what the transmitter is sending. Compare it against the transmitter local display and against the HMI value. Any disagreement now tells you exactly which segment owns the problem.',
          },
          {
            title: 'Restore carefully',
            text: 'Remove the meter, restore the conductor, torque the terminal, and confirm the reading returns to normal before you leave the panel.',
          },
        ],
      },
      { t: 'h2', text: 'Method 3: inject to test the receiving side' },
      {
        t: 'p',
        text: 'Disconnect the transmitter, connect a loop calibrator in source mode in its place, and drive known currents. This isolates everything downstream of the transmitter: the wiring, the input card, the scaling, and the display.',
      },
      {
        t: 'table',
        caption: 'Injection check on a 0-25 ft range',
        head: ['Inject', 'Expected percent', 'Expected HMI value'],
        rows: [
          ['4.00 mA', '0%', '0.0 ft'],
          ['8.00 mA', '25%', '6.25 ft'],
          ['12.00 mA', '50%', '12.5 ft'],
          ['16.00 mA', '75%', '18.75 ft'],
          ['20.00 mA', '100%', '25.0 ft'],
          ['3.5 mA', 'Below range', 'Fault indication, not a level'],
          ['21.5 mA', 'Above range', 'Fault indication, not a level'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Test the fault values too',
        text: 'Most people inject 4, 12, and 20 and stop. Inject 3.5 and 21.5 as well and confirm the logic flags a fault rather than scaling them into believable numbers. This is the check that proves your validity logic works, and it takes an extra minute.',
      },
      { t: 'h2', text: 'Reading the results' },
      {
        t: 'table',
        head: ['Transmitter output', 'PLC raw value', 'Conclusion'],
        rows: [
          ['Correct', 'Correct, HMI wrong', 'Scaling or display configuration'],
          ['Correct', 'Wrong', 'Wiring, input card, or channel configuration'],
          ['Wrong', 'Matches the wrong value', 'Transmitter calibration or process connection'],
          ['0 mA', '0 mA', 'Open loop: supply, wiring, or a dead transmitter'],
          ['Correct at low, clipped at high', 'Same', 'Insufficient loop voltage for total resistance'],
          ['Injection reads correctly at all points', 'Same', 'Receiving side is fine; the problem is the transmitter or the process'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'A HART communicator often shortens this considerably',
        text: 'If the transmitter is HART capable, a communicator reads its configured range, its current process value, its output current, and its diagnostics without touching a wire. On a stubborn loop that is frequently a two-minute answer to a two-hour problem.',
      },
    ],
    faqs: [
      {
        q: 'Can I measure loop current without breaking the loop?',
        a: 'Yes, in two ways: measure voltage across the known sense resistor and calculate, or use a true milliamp clamp meter. Transmitter test jacks also insert a meter without opening the circuit.',
      },
      {
        q: 'Why does my meter read zero when the loop is clearly working?',
        a: 'Check the meter fuse on the milliamp range first. A blown fuse reads zero and looks exactly like an open loop. Also confirm the red lead is in the milliamp jack, not the volts jack.',
      },
      {
        q: 'What if the reading is correct at the panel but the HMI is wrong?',
        a: 'The field and the input card are fine. The problem is scaling in the controller or configuration in the SCADA system. Check the card range setting first, then the scaling constants, then the SCADA tag.',
      },
      {
        q: 'How do I test a loop-powered transmitter on the bench?',
        a: 'Supply 24 VDC through a 250 ohm resistor in series with the transmitter, then measure voltage across the resistor to read current. That is a complete loop simulator built from two parts.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/4-20-ma',
      '/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable',
      '/controls/instrumentation/calibration/loop-checks',
      '/how-to/plc-how-to/scale-a-4-20-ma-input',
    ],
  },

  {
    path: '/how-to/plc-how-to/program-lead-lag-pumps',
    kind: 'howto',
    title: 'How to Program Lead/Lag Pump Control',
    summary:
      'Build duplex pump control with alternation, failure detection, minimum run and off timers, and an operator override that survives a restart.',
    answer:
      'Program lead/lag pump control by separating four concerns: determining which pumps are available, selecting the lead from the available set using your alternation rule, applying level setpoints to decide how many pumps should run, and protecting the motors with minimum run and minimum off timers. Keeping these separate makes the logic readable and makes failure handling straightforward.',
    keyPoints: [
      'Separate availability, lead selection, demand, and motor protection into distinct logic sections.',
      'A faulted pump must drop out of the rotation automatically.',
      'Store alternation state in retentive memory or it resets on every power blip.',
      'Bring the Auto position of each HOA switch into the controller.',
      'Alarm distinctly when the station is down to one available pump.',
    ],
    supplies: [
      'The control narrative or sequence of operation for the station',
      'Wet well dimensions and pump capacity data',
      'Motor nameplate data for the starts-per-hour limit',
      'PLC programming software with online access',
      'A way to simulate level, either forcing or a calibrator on the input',
    ],
    published: '2026-05-27',
    updated: '2026-08-24',
    readingTime: 10,
    tags: ['PLC', 'How-To', 'Pumps', 'Wastewater'],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Testing starts real equipment',
        text: 'Forcing values or changing setpoints on a live station will start and stop pumps. Coordinate with operations, confirm the wet well can tolerate what you are about to do, and know how to return to the previous state quickly. Where possible, test on a bench or in a simulator first.',
      },
      { t: 'h2', text: 'Structure the logic in four parts' },
      {
        t: 'p',
        text: 'The most common problem with pump control code is that these four concerns get tangled into one long chain of conditions that nobody can safely modify. Keep them separate and each becomes obvious.',
      },
      {
        t: 'ol',
        items: [
          'Availability: which pumps could run right now.',
          'Lead selection: which available pump has the lead role.',
          'Demand: how many pumps the level says should be running.',
          'Motor protection: minimum run, minimum off, and start staggering.',
        ],
      },
      { t: 'h2', text: 'Step 1: availability' },
      {
        t: 'code',
        lang: 'text',
        caption: 'Availability is the foundation everything else rests on',
        code: `Available_1 := HOA_1_Auto
               AND NOT Fault_1
               AND NOT Overload_1
               AND NOT Seal_Fail_1
               AND NOT Maint_Lockout_1
               AND Phase_Monitor_OK;

Available_2 := (same conditions for pump 2)

Pumps_Available := BOOL_TO_INT(Available_1) + BOOL_TO_INT(Available_2);

No_Redundancy := (Pumps_Available = 1);
Station_Down  := (Pumps_Available = 0);`,
      },
      {
        t: 'p',
        text: 'HOA_1_Auto is a real input from the selector switch, not an assumption. Without it the controller will keep commanding a pump that an operator deliberately took out of service, and will report it as failed to start.',
      },
      { t: 'h2', text: 'Step 2: lead selection' },
      {
        t: 'code',
        lang: 'text',
        caption: 'Alternate on cycle completion, respecting availability',
        code: `(* Advance alternation when the station finishes a cycle *)
IF All_Pumps_Stopped AND NOT All_Pumps_Stopped_Last THEN
    Alt_Select := NOT Alt_Select;      (* retentive memory *)
END_IF;

(* Availability overrides alternation *)
IF Available_1 AND Available_2 THEN
    Lead_Is_Pump_1 := NOT Alt_Select;
ELSIF Available_1 THEN
    Lead_Is_Pump_1 := TRUE;
ELSIF Available_2 THEN
    Lead_Is_Pump_1 := FALSE;
END_IF;`,
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Alt_Select must be retentive',
        text: 'If the alternation bit lives in non-retentive memory, every power interruption resets the station to the same lead pump. Over years that pump accumulates substantially more starts and run hours than the other, which is precisely what alternation was meant to prevent.',
      },
      { t: 'h2', text: 'Step 3: demand from level' },
      {
        t: 'code',
        lang: 'text',
        caption: 'How many pumps the wet well is asking for',
        code: `IF Level_Bad THEN
    Pumps_Called := Float_Backup_Demand;   (* fall back to floats *)
ELSE
    IF Level >= Lag_Start_SP THEN
        Pumps_Called := 2;
    ELSIF Level >= Lead_Start_SP THEN
        Pumps_Called := 1;
    ELSIF Level <= All_Stop_SP THEN
        Pumps_Called := 0;
    END_IF;                                (* otherwise hold *)
END_IF;

IF Level <= Low_Level_Cutoff THEN
    Pumps_Called := 0;                     (* dry run protection wins *)
    Alarm_Low_Level := TRUE;
END_IF;`,
      },
      {
        t: 'p',
        text: 'Note that the middle band holds the current call rather than changing it. That is the hysteresis that keeps the station from cycling on every small level fluctuation, and it is why the conditions are written as thresholds rather than as a simple comparison.',
      },
      { t: 'h2', text: 'Step 4: motor protection' },
      {
        t: 'code',
        lang: 'text',
        caption: 'Timers that keep the motors alive',
        code: `(* A running pump cannot stop before minimum run elapses,
   unless a protective condition demands it *)
Min_Run_Timer_1(IN := Run_Cmd_1, PT := T#90s);
Can_Stop_1 := Min_Run_Timer_1.Q OR Low_Level_Cutoff OR NOT Available_1;

(* A stopped pump cannot restart until minimum off elapses *)
Min_Off_Timer_1(IN := NOT Run_Cmd_1, PT := T#120s);
Can_Start_1 := Min_Off_Timer_1.Q AND Available_1;

(* Stagger the lag start so the service does not see two inrushes *)
Lag_Delay(IN := (Pumps_Called >= 2), PT := T#5s);
Lag_Permitted := Lag_Delay.Q;`,
      },
      {
        t: 'p',
        text: 'Set the minimum run time from the motor starts-per-hour rating and the wet well geometry, not from a habit. If the level band cannot produce a run that long at the lowest expected inflow, the band is too narrow and no timer will fix it.',
      },
      { t: 'h2', text: 'Failure detection' },
      {
        t: 'code',
        lang: 'text',
        caption: 'Two failure modes: will not start, and runs without pumping',
        code: `(* Failed to start: commanded but no run confirmation *)
Start_Fail_Timer_1(IN := Run_Cmd_1 AND NOT Run_Status_1, PT := T#5s);
IF Start_Fail_Timer_1.Q THEN
    Fault_1 := TRUE;                       (* latched, manual reset *)
    Alarm_Pump_1_Failed_To_Start := TRUE;
END_IF;

(* Runs but does not pump: level is not falling while running *)
No_Pump_Timer(IN := Any_Pump_Running AND (Level >= Level_5min_ago - 0.1),
              PT := T#300s);
IF No_Pump_Timer.Q THEN
    Alarm_Pump_Running_No_Flow := TRUE;    (* rag bound, air lock,
                                              closed valve, wrong rotation *)
END_IF;`,
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The second check is the valuable one',
        text: 'Failure to start is easy and every program has it. A pump that runs happily while the wet well fills is the failure that actually causes overflows, and comparatively few programs detect it. Comparing level change against run status costs a handful of rungs.',
      },
      { t: 'h2', text: 'Test before you leave' },
      {
        t: 'ul',
        items: [
          'Raise simulated level through lead start, lag start, and back to all stop. Confirm each transition.',
          'Confirm alternation swaps the lead after a completed cycle, and that it survives a controller power cycle.',
          'Fault one pump and confirm the other takes lead immediately and the no-redundancy alarm appears.',
          'Fault both and confirm the station-down alarm escalates.',
          'Take one HOA to Hand and confirm the controller stops calling it and does not report a start failure.',
          'Drive the level input to a fault current and confirm the station falls back to float control and alarms.',
          'Verify minimum run and minimum off by attempting to violate them.',
          'Record the setpoints and timer values in the control narrative before you drive away.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should alternation happen on start or on stop?',
        a: 'On cycle completion, meaning when all pumps stop. Alternating at start means the roles change mid-cycle when the lag pump joins, which produces confusing behavior and uneven wear.',
      },
      {
        q: 'What if both pumps are called and one fails?',
        a: 'The remaining available pump should keep running and the failed one should drop out of the rotation. Alarm the failure and the loss of redundancy separately, because they need different responses.',
      },
      {
        q: 'How long should minimum run time be?',
        a: 'Long enough that the motor stays within its starts-per-hour rating at the worst case, which is the lowest inflow. Ninety seconds to several minutes is common for municipal lift stations. Calculate it from the wet well volume and pump capacity rather than guessing.',
      },
      {
        q: 'Do I need lead/lag logic if the panel has a mechanical alternator?',
        a: 'A mechanical or dedicated alternator will run the station, but the utility cannot see the alternation state, cannot see run hours per pump, and cannot change the strategy without a site visit. Any station on SCADA is better served with the logic in the controller.',
      },
    ],
    related: [
      '/controls/control-panels/pump-panels/lead-lag',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/controls/plc-systems/programming/interlocks',
    ],
  },

  {
    path: '/how-to/panel-how-to/size-a-power-supply',
    kind: 'howto',
    title: 'How to Size a Control Panel Power Supply',
    summary:
      'Add up the real load, account for inrush and simultaneity, add headroom, and check the heat you just added to the enclosure.',
    answer:
      'Size a control panel power supply by totaling the steady-state current of every load at the supply voltage, adding the largest expected simultaneous inrush, applying a headroom factor of at least 25%, and then verifying the resulting heat dissipation against the enclosure thermal budget. Undersized supplies produce intermittent faults that are extremely difficult to diagnose.',
    keyPoints: [
      'Total steady-state load first, from real datasheets rather than estimates.',
      'Inrush from relays, contactors, and capacitive inputs can far exceed steady-state draw.',
      'Add at least 25% headroom, more if future expansion is expected.',
      'Derate for the actual maximum ambient temperature in the enclosure.',
      'Every watt the supply is inefficient by becomes heat inside the panel.',
    ],
    supplies: [
      'Bill of material for the panel with datasheets',
      'PLC and I/O module current draw figures at the relevant backplane voltage',
      'Field device current requirements, including loop-powered transmitters',
      'Maximum expected ambient temperature at the installation',
      'Enclosure dimensions for the thermal check',
    ],
    published: '2026-06-16',
    updated: '2026-08-14',
    readingTime: 7,
    tags: ['Panels', 'How-To', 'Power', 'Design'],
    blocks: [
      { t: 'h2', text: 'Step 1: total the steady-state load' },
      {
        t: 'p',
        text: 'List every device drawing from the supply and its current at the supply voltage. Use datasheet values. Estimating from experience is where the error enters, because the devices that surprise you are the ones you did not think to list.',
      },
      {
        t: 'table',
        caption: 'A representative 24 VDC load list for a lift station panel',
        head: ['Load', 'Quantity', 'Each', 'Total'],
        rows: [
          ['PLC processor', '1', '350 mA', '350 mA'],
          ['Digital input module', '2', '80 mA', '160 mA'],
          ['Digital output module', '2', '120 mA', '240 mA'],
          ['Analog input module', '1', '150 mA', '150 mA'],
          ['Loop-powered transmitters', '3', '22 mA', '66 mA'],
          ['Interposing relays, energized', '8', '25 mA', '200 mA'],
          ['Ethernet switch', '1', '400 mA', '400 mA'],
          ['Cellular modem', '1', '500 mA', '500 mA'],
          ['Panel light and misc', '—', '—', '150 mA'],
          ['Steady-state total', '', '', 'about 2.22 A'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Count loop-powered transmitters at 22 mA, not 20',
        text: 'A transmitter driving a NAMUR fault current draws slightly more than full scale, and some devices draw more still under alarm conditions. Using 22 mA per loop costs nothing in the calculation and removes a small systematic underestimate.',
      },
      { t: 'h2', text: 'Step 2: account for inrush' },
      {
        t: 'p',
        text: 'Steady-state is not the worst case. Relay and contactor coils, capacitive input filters, and switch-mode devices all draw substantially more current at the instant they energize. A supply that is adequate in steady state can drop out of regulation on a simultaneous energization, and the resulting symptom is a controller that resets occasionally for no visible reason.',
      },
      {
        t: 'ul',
        items: [
          'Identify loads that energize together. A sequence step that pulls in six relays at once is a single simultaneous event.',
          'Use the inrush figure from the datasheet where given; several times steady-state is common.',
          'Check whether the supply specifies a peak or surge capability and for how long. Many supplies tolerate a brief overload well beyond their continuous rating.',
          'Stagger energization in logic where a large simultaneous inrush is unavoidable. A few hundred milliseconds of separation costs nothing.',
        ],
      },
      { t: 'h2', text: 'Step 3: apply headroom' },
      {
        t: 'formula',
        expr: 'Supply_Rating ≥ Steady_State_Total × 1.25',
        where: [
          'Use 1.25 as a minimum',
          'Use 1.5 or more where spare I/O slots exist or expansion is anticipated',
        ],
      },
      {
        t: 'p',
        text: 'With a 2.22 A steady-state total, 25% headroom calls for at least 2.8 A, so a 5 A supply is the sensible catalog choice and leaves genuine room for the field devices that always get added later. The cost difference between a 3 A and a 5 A supply is small compared to a return visit.',
      },
      { t: 'h2', text: 'Step 4: derate for temperature' },
      {
        t: 'p',
        text: 'Power supply ratings are stated at a reference ambient temperature and derate above it. An outdoor panel in Florida sun can reach internal temperatures far above the rating point, and a supply rated 5 A at 25 degrees Celsius may be rated considerably less at 55.',
      },
      {
        t: 'ol',
        items: [
          'Find the maximum ambient at the installation, including solar gain for outdoor enclosures.',
          'Add the internal temperature rise from the enclosure heat calculation.',
          'Read the derating curve in the supply datasheet at that temperature.',
          'Confirm the derated rating still exceeds your load plus headroom. If not, choose a larger supply, a higher-temperature-rated one, or add cooling.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Derating is where most sizing errors survive review',
        text: 'A calculation done at 25 degrees looks fine on paper and fails in August. Outdoor panels are the common case. Do the thermal check as part of supply selection, not as a separate exercise nobody gets to.',
      },
      { t: 'h2', text: 'Step 5: check the heat you added' },
      {
        t: 'p',
        text: 'A supply is not perfectly efficient, and the difference becomes heat inside the enclosure you just sized it for.',
      },
      {
        t: 'formula',
        expr: 'Heat_Watts = Output_Watts × (1 ÷ Efficiency − 1)',
        where: [
          'Output_Watts — actual delivered load, not the supply rating',
          'Efficiency — from the datasheet, typically 0.85 to 0.93',
        ],
      },
      {
        t: 'p',
        text: 'At 2.22 A and 24 V the output is about 53 W. At 88% efficiency the supply dissipates roughly 7 W into the enclosure. That is modest on its own and worth adding to the panel heat total alongside the drives and the controller.',
      },
      { t: 'h2', text: 'Redundancy and backup' },
      {
        t: 'dl',
        items: [
          { term: 'Redundant supplies', def: 'Two supplies through a redundancy module so either can carry the full load. Worth it at unattended critical sites where a supply failure means a truck roll and a station offline.' },
          { term: 'DC UPS', def: 'A 24 VDC uninterruptible module with a battery, holding the controller and communications through a power interruption so the site can report the outage. Frequently more valuable than a full AC UPS at a remote station.' },
          { term: 'Separate control and field supplies', def: 'Keeping the controller on its own supply, separate from field device power, means a field short does not take down the processor. This is cheap insurance and it also simplifies troubleshooting enormously.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Fuse the branches',
        text: 'A single supply feeding twenty devices through one terminal is a diagnostic nightmare and a single point of failure. Distribute through individually protected branches so a shorted field device drops one circuit rather than the whole panel, and so a technician can isolate by pulling one fuse.',
      },
    ],
    faqs: [
      {
        q: 'How much headroom should a control power supply have?',
        a: 'At least 25% above the calculated steady-state load, and more where spare I/O capacity exists. The step to the next catalog size is usually inexpensive relative to the cost of diagnosing an intermittent brownout later.',
      },
      {
        q: 'What are the symptoms of an undersized supply?',
        a: 'Intermittent controller resets, communication modules dropping out, analog readings shifting when relays energize, and faults that cluster around specific sequence steps. All of these look like other problems, which is why they take so long to find.',
      },
      {
        q: 'Should the PLC and field devices share a supply?',
        a: 'Preferably not. Separating them means a shorted field wire does not take down the processor, and it makes fault isolation far quicker. Where a single supply is used, distribute through individually protected branches.',
      },
      {
        q: 'Do I need to derate for altitude?',
        a: 'Above roughly 2000 metres, yes, because reduced air density lowers convective cooling. Check the datasheet. For most water and wastewater work in low-lying areas this is not a factor, but it matters for mountain installations.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/panel-power-supplies',
      '/controls/control-panels/panel-design/heat-calculations',
      '/controls/control-panels/plc-panels/plc-power',
      '/troubleshooting/control-panel-troubleshooting/no-control-power-in-panel',
    ],
  },
  {
    path: '/how-to/plc-how-to/create-a-pid-loop',
    kind: 'howto',
    title: 'How to Create a PID Loop in a PLC',
    summary:
      'Set up a PID instruction from scratch: scale the PV and CV, pick the action, set the execution rate, configure limits and anti-windup, tune conservatively, and test the manual and auto transitions before it controls anything.',
    answer:
      'To create a PID loop, scale the process variable into engineering units and the output into the range the final element expects, set the controller action so an increase in output moves the process variable the right way, execute the instruction at a fixed interval matched to the process, set output limits with anti-windup, initialize in manual with bumpless transfer, then tune starting with proportional only and add integral slowly.',
    keyPoints: [
      'Scale first. A PID loop on raw counts has gains nobody can interpret.',
      'Get the action right before anything else. A loop with the wrong action runs to a limit.',
      'Execute at a fixed interval, in a periodic task, not in the main scan.',
      'Set output limits and anti-windup, or integral will wind up during every start.',
      'Start in manual. Tune proportional first, then integral. Leave derivative off unless there is a reason.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['PLC', 'PID', 'How-To', 'Programming'],
    supplies: [
      'The control narrative or a one-line description of what the loop holds and with what',
      'The transmitter calibrated range and the final element range (drive speed, valve position)',
      'Programming software with online monitoring and a trend',
      'A simulated PV or a process that can be run safely in manual',
      'The platform PID instruction manual, for its gain units and equation form',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Before you start',
        text: 'A PID loop drives a pump, a valve, or a chemical feeder. Until the loop is proven, it runs in manual with the output limited to a safe range, operations is told what is being tested, and a hand on the stop is available. A loop with the wrong action runs the output to its limit in seconds.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Define the loop on paper', text: 'Write one sentence: hold X at setpoint by moving Y. Wet well level at 4.0 ft by pump speed. Discharge pressure at 65 psi by pump speed. Chlorine residual at 1.5 mg/L by feeder stroke. If the sentence is hard to write, the loop is not ready to be built.' },
          { title: 'Scale the process variable', text: 'Convert the analog input to engineering units before it reaches the PID instruction, using the transmitter calibrated range. Record the range in the instruction comments. Some platforms expect the PV in engineering units; others expect it in percent of range. Check which, and match it.' },
          { title: 'Scale the output', text: 'Decide the CV range: 0 to 100 percent is conventional. Map it to the final element in a separate scaling instruction: percent to drive speed reference counts, or percent to valve position. Keep the PID output in percent so that gains are meaningful across loops.' },
          { title: 'Set the controller action', text: 'Direct action: output increases when PV rises above setpoint. Reverse action: output decreases when PV rises. Level control with a pump that empties the well is direct: level up, speed up. Pressure control with a pump that raises pressure is reverse: pressure up, speed down. Get this right before tuning; a wrong action cannot be tuned.' },
          { title: 'Choose the execution interval', text: 'Run the instruction in a periodic task at a fixed interval, typically 100 to 500 ms for pressure and flow, 1 to 5 s for level and residual. The interval must be consistent, because the integral and derivative terms depend on it. Do not run PID in the continuous task where scan time varies.' },
          { title: 'Set output limits and anti-windup', text: 'Clamp the CV between the minimum and maximum the final element can use: a drive minimum speed of 40 percent, a valve minimum of 5 percent. Enable the instruction anti-reset-windup so integral stops accumulating at a limit. Without this the loop overshoots badly after every period at a limit.' },
          { title: 'Configure manual mode and bumpless transfer', text: 'Provide a manual mode where the operator sets the CV directly. When the loop switches to auto, the instruction initializes its integral so that the output does not jump. Most instructions do this if the manual CV is written to the instruction output while in manual; confirm it in the manual.' },
          { title: 'Handle a bad PV', text: 'If the PV signal fails, the loop must not chase it. Use the signal validation flags: on bad PV, force the loop to manual at the last good output or a safe fixed output, and alarm. Test this by pulling the input wire on the bench.' },
          { title: 'Set initial tuning', text: 'Start with proportional only: a gain that produces a visible but modest response, often 1.0 in dimensionless units or its equivalent in the platform gain units. Integral off, or a very long reset time. Derivative off.' },
          { title: 'Test in manual', text: 'With the loop in manual, step the output and watch the PV. Confirm the direction, note the dead time and how long the PV takes to settle. Those two numbers guide the tuning: integral time roughly equal to the process time constant, and a gain that does not amplify the dead time into oscillation.' },
          { title: 'Switch to auto and tune', text: 'Switch to auto at a setpoint near the current PV. Make a small setpoint change. Raise gain until the response is brisk without sustained oscillation, then back off by a third. Add integral until offset is removed in a reasonable time without overshoot. Trend PV, SP, and CV together throughout.' },
          { title: 'Document', text: 'Record the final gains, the action, the execution interval, the limits, and the date, in the program and on the loop sheet. The next person will need the reasons, not just the numbers.' },
        ],
      },
      { t: 'h2', text: 'Gain units differ by platform' },
      {
        t: 'p',
        text: 'Every platform expresses PID tuning differently. Some use proportional gain, some proportional band, which is 100 divided by gain. Integral may be in repeats per minute, minutes per repeat, or seconds. Some instructions use the independent equation, where each term has its own gain; others use the dependent, or ISA, form, where the controller gain multiplies all three terms. Moving tuning values between platforms without converting them is a common way to build a loop that oscillates or never moves.',
      },
      {
        t: 'table',
        head: ['Parameter', 'Common forms', 'Conversion'],
        rows: [
          ['Proportional', 'Gain Kc; proportional band PB in percent', 'Kc = 100 / PB'],
          ['Integral', 'Reset time Ti in minutes or seconds per repeat; reset rate in repeats per minute', 'Repeats per minute = 1 / Ti in minutes'],
          ['Derivative', 'Rate time Td in minutes or seconds', 'Usually zero'],
          ['Equation', 'Dependent (ISA): CV = Kc × (e + (1/Ti) ∫e dt + Td de/dt). Independent: CV = Kp e + Ki ∫e dt + Kd de/dt', 'Ki = Kc / Ti and Kd = Kc × Td'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Leave derivative off',
        text: 'Derivative reacts to noise and to measurement steps, and most water and wastewater loops are slow enough that it adds nothing. Use it only on a loop with a clean, filtered PV and a demonstrated need, such as a fast pressure loop, and only after the loop works without it.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'A setpoint step in either direction is followed without sustained oscillation and settles within a few process time constants.',
          'Switching between manual and auto does not bump the output.',
          'Holding the output at a limit for a minute and then releasing does not produce a large overshoot.',
          'Pulling the PV signal forces the loop to the defined safe state and raises the alarm.',
          'The tuning and configuration are recorded in the program and on the loop sheet.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should the PID run in the PLC or in the drive?',
        a: 'Most drives include a PID controller, and for a single pump on a single pressure or level loop it can work well. Running it in the PLC keeps the tuning, the limits, the failure handling, and the alarming in one place, visible on SCADA, and consistent across loops. Use the drive PID for a standalone application; use the PLC for anything with more than one pump or any interaction with the rest of the process.',
      },
      {
        q: 'How do I know whether my loop is direct or reverse acting?',
        a: 'Ask what happens to the process variable when the output increases. If PV rises, the loop must reduce output when PV is above setpoint: reverse acting. If PV falls when output increases, as with a pump emptying a wet well, the loop must increase output when PV is above setpoint: direct acting. Platforms name these differently; test in manual to be certain.',
      },
      {
        q: 'What execution rate should I use?',
        a: 'Fast enough that the loop sees changes as they happen and slow enough that noise does not dominate. Ten to twenty executions per process time constant is a reasonable rule. A wet well that takes ten minutes to move a foot does not need a 50 ms loop, and running it that fast only amplifies noise through the derivative and integral terms.',
      },
      {
        q: 'The loop oscillates slowly. What is wrong?',
        a: 'Slow oscillation with a period of several process time constants is usually too much integral, or gain too high on a loop with long dead time. Reduce integral first. Fast oscillation is usually gain. A loop that oscillates in manual is not a tuning problem at all; it is the process or a valve with stiction.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/pid',
      '/controls/plc-systems/analog-control/scaling',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/plc-systems/plc-fundamentals/tasks',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/how-to/plc-how-to/scale-a-4-20-ma-input',
    ],
  },
  {
    path: '/how-to/plc-how-to/add-an-alarm',
    kind: 'howto',
    title: 'How to Add an Alarm',
    summary:
      'From a request to a working alarm: define it against the philosophy, build the condition in the PLC with deadband and delays, configure the SCADA alarm with priority and message, test it end to end, and record it in the master alarm database.',
    answer:
      'Adding an alarm properly means deciding first whether it is an alarm at all, then defining its setpoint, deadband, delay, priority, and operator action, building the detection in the controller so the condition is evaluated close to the process, configuring the SCADA alarm record with a message that says what to do, testing it from the field to the operator screen and any notification path, and recording it in the master alarm database.',
    keyPoints: [
      'Answer the rationalization questions before configuring anything.',
      'Detect in the controller, present in SCADA. The condition must exist when SCADA is down.',
      'Deadband and delay are part of the alarm, not an afterthought.',
      'The message tells the operator what happened and what to do.',
      'Test from the field, and record the alarm in the database with its basis.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Alarms', 'PLC', 'SCADA', 'How-To'],
    supplies: [
      'The alarm philosophy and the priority matrix',
      'The master alarm database, or the spreadsheet standing in for it',
      'PLC programming software and SCADA configuration access',
      'A way to drive the condition: a calibrator, a simulated value, or a controlled process change',
      'Access to the notification system configuration if the alarm will call out',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'note',
        title: 'Before you start',
        text: 'Every alarm added to a system is one more thing the operator must read. An alarm that does not need an operator action is an event or a maintenance notification, and it goes somewhere else. Start with the questions, not the configuration.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Answer the rationalization questions', text: 'What condition, what causes it, what happens if no one acts, what the operator must do, how long they have, what class it belongs to. If there is no operator action, stop here and configure an event instead. Write the answers down; they go in the database at the end.' },
          { title: 'Set the setpoint and its basis', text: 'Choose the value from something defensible: a permit limit less a margin, a manufacturer limit, the operating envelope from a trend, a physical constraint. Record the basis. For a pre-alarm and alarm pair, set both here with different times to respond.' },
          { title: 'Set the deadband', text: 'The amount the value must recover past the setpoint before the alarm clears. Typically 1 to 5 percent of range, larger on a noisy signal. Without it, a value sitting at the setpoint generates an alarm every few seconds.' },
          { title: 'Set the delays', text: 'An on-delay so a transient does not alarm: seconds for a pressure, tens of seconds for a level, longer for a slow analyzer. An off-delay if the alarm should not clear on a brief recovery. Delays are tuning values and are recorded with the alarm.' },
          { title: 'Assign priority', text: 'From the matrix, using the consequence and time to respond decided in step 1. Not from how important the equipment is.' },
          { title: 'Build the detection in the controller', text: 'Compare the value to the setpoint with the deadband, through the on-delay timer, and gate it on the signal being valid: a bad-quality input must not generate a process alarm, but must generate its own. Latch the result into a dedicated alarm bit with a clear name. Add any state-based suppression from step 1: the low flow alarm is inhibited when the pump is commanded off.' },
          { title: 'Add acknowledgment handling if the platform needs it', text: 'Some systems acknowledge in SCADA only; others carry an acknowledge bit back to the controller for local indication or a horn. Build what the site standard requires, and nothing more.' },
          { title: 'Configure the SCADA alarm', text: 'Create the alarm record on the alarm bit: priority, area or group, and the message. The message states the equipment, the condition, and the action in a form that reads at a glance. Set the notification rule if the alarm calls out.' },
          { title: 'Test end to end', text: 'Drive the real condition where it is safe, or inject the signal at the field terminals. Confirm the alarm appears with the correct priority and message, that the on-delay holds, that the deadband works on recovery, that acknowledgment behaves, that suppression inhibits it when it should, and that the notification path delivers it to the on-call phone. Test the bad-quality case by disconnecting the input.' },
          { title: 'Record it', text: 'Enter the alarm in the master alarm database with every answer from step 1 and every setting from steps 2 to 8. Update the loop sheet or the I/O list. Tell the operators, and add the new alarm to the training record.' },
        ],
      },
      { t: 'h2', text: 'What the message should say' },
      {
        t: 'table',
        head: ['Poor', 'Better', 'Why'],
        rows: [
          ['LT-101 HI', 'LS-12 wet well level high. Verify pumps running; dispatch if level rising.', 'Names the place, the condition, and the action'],
          ['Pump fault', 'P-2 fault: check drive display for fault code, reset if clear, alternate to P-1.', 'Tells the operator where to look and what to do next'],
          ['Comm fail', 'Communication lost to LS-12. Station on local control. Check radio if not restored in 15 min.', 'States the consequence and the time to respond'],
          ['Alarm', 'Never acceptable', 'A message that says nothing is worse than no alarm'],
        ],
      },
      { t: 'h2', text: 'Where alarms should be detected' },
      {
        t: 'p',
        text: 'Detecting the alarm in the controller, rather than as a SCADA limit on a tag, is the general rule. The controller evaluates the condition every scan with the real value, it can gate the alarm on signal quality and process state, it keeps working when SCADA or communications are down, and the same bit can drive a local horn or a hardwired dialer. SCADA limit alarms are acceptable for information alarms on values that exist only in SCADA, such as a calculated total, and for quick temporary alarms during commissioning. They should not be the permanent home of a process alarm.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not copy the alarm from the tag next to it',
        text: 'Duplicating an existing alarm record and changing the tag name copies its setpoint, deadband, priority, and message from a different device. Half the wrong-priority and wrong-message alarms in a system got there this way. Build each alarm from its own answers.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'The alarm appears on the operator screen and in the summary with the intended priority and message when the condition is driven from the field.',
          'The on-delay and deadband behave as configured on both edges.',
          'A bad-quality input produces the signal alarm and not the process alarm.',
          'State-based suppression inhibits and releases correctly.',
          'The notification path delivers and escalates as configured.',
          'The master alarm database has the complete record.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I just set a high limit on the SCADA tag?',
        a: 'For a temporary or information-only alarm, yes. For a process alarm, no: it depends on SCADA being up and the poll being current, it cannot be gated on process state without more configuration, and it does not exist for the local panel or a hardwired dialer. Build it in the controller and present it in SCADA.',
      },
      {
        q: 'How much deadband is right?',
        a: 'Enough that normal noise on the signal cannot re-trigger the alarm after it clears. Look at the trend: the peak-to-peak noise at steady state is the minimum. Two to five percent of range is typical; less on a very clean signal, more on a turbulent level.',
      },
      {
        q: 'Should a new alarm call out?',
        a: 'Only if the rationalization answer says it needs a response when the site is unstaffed and within the time available. Adding notification to every new alarm is how on-call phones end up ignored. Notification is a separate decision recorded with the alarm.',
      },
      {
        q: 'Who approves a new alarm?',
        a: 'The alarm philosophy says. At many utilities, operations approves any new alarm and its priority, and a regulatory or safety class alarm requires a documented change record. A new alarm added at a keyboard without approval is a change that bypasses the system the philosophy set up.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/rationalization',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/alarm-management/alarm-floods',
      '/controls/scada-hmi/alarm-management/notification',
      '/controls/plc-systems/analog-control/deadband',
      '/controls/plc-systems/analog-control/signal-validation',
    ],
  },
  {
    path: '/how-to/instrumentation-how-to/calibrate-a-pressure-transmitter',
    kind: 'howto',
    title: 'How to Calibrate a Pressure Transmitter',
    summary:
      'A five-point calibration with a pressure source and a reference: isolate and vent, record as-found, decide whether to adjust, trim the sensor and the output separately, verify as-left, and record it so the next calibration means something.',
    answer:
      'To calibrate a pressure transmitter, isolate it from the process and vent it, apply zero and a series of known pressures from a calibrator while reading the output current, and compare each to the expected 4-20 mA value. Record the as-found data. If the error exceeds the tolerance, perform a sensor trim against the reference pressures and, separately, a current output trim against a reference meter, then repeat the five points as-left and record both sets.',
    keyPoints: [
      'As-found before any adjustment. That record is the value of the calibration.',
      'Sensor trim and output trim are different adjustments. Do not use one to correct the other.',
      'A zero check in place is not a calibration. It catches drift but not span error.',
      'Tolerance comes from the loop, not the transmitter data sheet. Decide it before you start.',
      'Return the transmitter to service in the right valve sequence, or the first reading after calibration is wrong.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Instrumentation', 'How-To', '4-20 mA', 'Commissioning'],
    supplies: [
      'A pressure calibrator or hand pump with a reference gauge at least four times more accurate than the tolerance',
      'A loop calibrator or precision milliammeter to read the output',
      'A HART communicator or the platform software, for trims on a smart transmitter',
      'The transmitter calibrated range and the loop tolerance from the instrument list or loop sheet',
      'The calibration form, paper or electronic',
      'Fittings and a bleed for the impulse line or manifold',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Before you start',
        text: 'Isolating a transmitter removes a measurement from the control system. Tell operations, put any loop that uses it in manual, and confirm nothing will start, stop, or alarm as a result. Bleed process pressure safely: chemical lines need the right protective equipment, and a blocked-in line on a hot day can be at more pressure than expected.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Gather the facts', text: 'Calibrated range, for example 0 to 100 psig. Expected output at each test point: 4 mA at 0, 8 at 25, 12 at 50, 16 at 75, 20 at 100 psig. Tolerance for the loop, typically 0.25 to 1 percent of span for utility service. Check the calibrator range and accuracy against these.' },
          { title: 'Isolate and vent', text: 'Close the process isolation valve. Open the vent or the manifold drain to release the line pressure. On a differential transmitter, open the equalizer first, then the drains. Confirm zero pressure at the transmitter before connecting anything.' },
          { title: 'Connect the calibrator and the meter', text: 'Pressure source to the transmitter high side. Milliammeter in series with the loop, or the loop calibrator in measure mode across the test jacks. Let the transmitter and calibrator sit for a few minutes to reach the same temperature.' },
          { title: 'Record as-found at five points', text: 'Apply 0, 25, 50, 75, and 100 percent of range going up, then 75, 50, 25, and 0 coming down. Record the applied pressure from the reference and the output current at each point. The down points show hysteresis. Do not adjust anything yet.' },
          { title: 'Decide whether to adjust', text: 'Compare each point with the expected current. If every point is within tolerance, the transmitter passes as-found and nothing is adjusted: record it and return to service. Adjusting a transmitter that is in tolerance adds error rather than removing it.' },
          { title: 'Trim the sensor if needed', text: 'On a smart transmitter, the sensor trim corrects what the transmitter measures. Use the communicator: a zero trim at true zero pressure, then a lower and upper sensor trim at reference pressures near the ends of the range. On an analog transmitter, adjust the zero and span potentiometers in turn, rechecking each after adjusting the other.' },
          { title: 'Trim the output if needed', text: 'The output trim corrects the digital-to-analog conversion: the transmitter is told to send exactly 4 mA and 20 mA, the meter reading is entered, and the transmitter corrects itself. This is separate from the sensor trim. If the sensor reads right in the communicator but the current is off, the output trim is the adjustment, not the sensor.' },
          { title: 'Record as-left at five points', text: 'Repeat the up-and-down series and record every point. Both as-found and as-left go on the form. Confirm every as-left point is within tolerance.' },
          { title: 'Return to service', text: 'Remove the calibrator, close the vent, and open the isolation valve slowly. On a differential transmitter, open the high side isolation, then close the equalizer, then open the low side. Check for leaks. Confirm the reading agrees with a local gauge or the process expectation and that the loop in the control system reads correctly.' },
          { title: 'Complete the record', text: 'Date, technician, transmitter tag and serial, calibrator identification and its calibration due date, as-found and as-left data, tolerance, pass or fail, and any adjustment made. Return the loop to auto and tell operations.' },
        ],
      },
      { t: 'h2', text: 'Sensor trim versus output trim' },
      {
        t: 'table',
        head: ['Symptom', 'Adjustment', 'Not this'],
        rows: [
          ['Communicator shows the transmitter measuring the wrong pressure', 'Sensor trim', 'Output trim, which would leave the digital value wrong for HART readers'],
          ['Communicator shows the right pressure but the loop current is off', 'Output trim at 4 and 20 mA', 'Sensor trim, which would corrupt a correct measurement'],
          ['Right pressure and right current, but the PLC reads wrong', 'PLC scaling or the input card', 'Any transmitter adjustment'],
          ['Zero is off, span is right', 'Zero trim only', 'A full re-trim that moves the span too'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Re-ranging is not calibrating',
        text: 'Changing the range of a smart transmitter from the communicator changes what 4 and 20 mA represent. It does not check or correct the sensor. A transmitter can be re-ranged perfectly and still read 2 percent wrong. Range changes go on the loop sheet and in the PLC scaling; calibration is the five-point check.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'As-found and as-left data at five points, up and down, both on the form.',
          'Every as-left point within the loop tolerance.',
          'The control system displays the correct value with the transmitter back in service.',
          'The valve sequence was completed and there are no leaks.',
          'The calibrator used was itself in calibration.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How often should a pressure transmitter be calibrated?',
        a: 'On the schedule the utility sets, based on the criticality of the loop and the history of the transmitter. Annually is common; compliance measurements may require more. The as-found records tell you: a transmitter that is always in tolerance at twelve months can go longer, one that drifts needs a shorter interval or replacement.',
      },
      {
        q: 'Can I calibrate in place without isolating?',
        a: 'A zero check can sometimes be done by equalizing a differential transmitter or, with the process at a known state, comparing to a reference gauge. It catches zero drift. It does not check span, and it is not a calibration for the record.',
      },
      {
        q: 'What accuracy does the calibrator need?',
        a: 'The reference should be at least four times more accurate than the tolerance being checked, and ten times is better. For a 0.5 percent loop tolerance, a 0.1 percent reference is adequate and a 0.05 percent reference is comfortable. A calibrator that has not itself been calibrated is not a reference.',
      },
      {
        q: 'The transmitter passed calibration but the PLC still reads wrong. Why?',
        a: 'The problem is downstream: the input card range, the PLC scaling, or the calibrated range in the PLC not matching the one in the transmitter. Inject a known current at the panel terminals and follow the value through the scaling.',
      },
    ],
    related: [
      '/controls/instrumentation/pressure/pressure-transmitters',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/controls/instrumentation/signals/hart',
      '/how-to/plc-how-to/scale-a-4-20-ma-input',
      '/controls/instrumentation/signals/4-20-ma-signals',
    ],
  },
  {
    path: '/how-to/instrumentation-how-to/diagnose-ground-loops',
    kind: 'howto',
    title: 'How to Diagnose a Ground Loop',
    summary:
      'Prove that a noisy or offset analog signal is a ground loop, find the second ground, and fix it the right way: remove the extra ground, isolate the signal, or correct the shield termination. With the measurements that make the diagnosis certain.',
    answer:
      'To diagnose a ground loop, confirm the symptom correlates with load or with a specific piece of equipment, measure the AC and DC voltage between the two ends of the signal circuit reference, then break the suspected second ground path and watch the symptom disappear. The fix is to remove the extra ground where it can be removed, and to install a signal isolator where the second ground is inherent, such as a grounded sensor or a transmitter with a grounded case.',
    keyPoints: [
      'A ground loop needs two grounds and a path between them. Find both.',
      'Measure voltage between the grounds. More than a few hundred millivolts is suspicious.',
      'The proof is lifting one ground and watching the symptom vanish. Do it deliberately, not by accident.',
      'Shields grounded at both ends are the usual second path.',
      'When the second ground cannot be removed, isolate the signal.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Instrumentation', 'Grounding', 'How-To', 'Signals', 'Troubleshooting'],
    supplies: [
      'A true-RMS multimeter with AC and DC voltage ranges down to millivolts',
      'A clamp meter that reads AC current on a single conductor, ideally down to milliamps',
      'The loop drawings or the wiring diagram showing shield and ground terminations',
      'A loop calibrator for substitution tests',
      'A signal isolator of the right type on hand, if a fix is expected on the same visit',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Before you start',
        text: 'Lifting a ground is a deliberate test on a signal circuit, never on an equipment grounding conductor. The equipment ground on a panel, a motor, or an enclosure stays connected at all times. If a test requires disconnecting a conductor that might be carrying fault current or that bonds a chassis, stop and involve a qualified electrician.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Characterize the symptom', text: 'A ground loop produces a signal offset that changes with load, a 60 Hz hum on the signal, or noise that appears when a specific motor or drive runs. Trend the signal against equipment run status. A reading that is offset by a constant amount that does not change with load is more likely a scaling or calibration problem.' },
          { title: 'Identify the reference points', text: 'Find where the signal circuit is referenced to ground at the panel end: the negative of the loop power supply, the input card common, or the instrument ground bar. Then find every other place the circuit could touch ground: the transmitter case, a grounded sensor element, the cable shield at the field end, a junction box, a conduit body where a cable is damaged.' },
          { title: 'Measure the voltage between grounds', text: 'With the circuit intact, measure AC and DC volts between the panel signal ground and the field ground, using long leads if necessary. A few tens of millivolts is normal. Several hundred millivolts, or volts, is a potential difference that will drive current through any path between them.' },
          { title: 'Measure current in the shield', text: 'Clamp the shield drain wire alone. Any measurable AC current in a shield means it is grounded at both ends or is touching ground somewhere. A shield should carry no current.' },
          { title: 'Lift the suspected second ground', text: 'With the loop in manual and operations informed, disconnect the field end of the shield, or lift the transmitter from its grounded mount with an insulating adapter, or disconnect whatever the drawing shows as the second reference. Watch the signal. If the noise or offset vanishes, the diagnosis is made. Reconnect and confirm it returns.' },
          { title: 'Substitute the transmitter', text: 'If lifting the shield changes nothing, disconnect the transmitter and inject a fixed current with the calibrator at the field end. A clean signal now means the transmitter or its mounting provides the second ground: a case-grounded transmitter, a grounded sensor, or moisture in the head.' },
          { title: 'Check the panel end', text: 'Confirm the shield is landed on the instrument ground bar and not on a terminal that is also the equipment ground for a drive or a starter. Confirm the loop supply negative is grounded at one point. Look for a second supply feeding the same loop from another panel.' },
          { title: 'Fix it', text: 'Remove the extra ground where it is not needed: re-terminate the shield at one end only, insulate the transmitter mount, repair a damaged cable. Where the second ground is inherent, install a loop isolator between the field device and the input. Where the shield must be grounded at both ends for high-frequency noise, ground one end solidly and the other through a capacitor, as the platform grounding guide describes.' },
          { title: 'Verify under load', text: 'Reproduce the condition that showed the symptom: run the drive, start the motor, wait for the load that correlated with the offset. A fix tested with the plant quiet has not been tested.' },
          { title: 'Record it', text: 'Note the second ground that was found, the fix, and the measured voltages before and after, on the loop sheet. Ground loops recur when the next person re-grounds the shield to be safe.' },
        ],
      },
      { t: 'h2', text: 'Reading the measurements' },
      {
        t: 'table',
        head: ['Measurement', 'Normal', 'Suspicious', 'Meaning'],
        rows: [
          ['AC volts between panel signal ground and field ground', 'Under 50 mV', 'Over 500 mV, or varying with load', 'A potential difference exists to drive loop current'],
          ['DC volts between the same points', 'Near zero', 'Over 100 mV', 'A DC offset that adds directly to the signal at the input'],
          ['AC current in the shield', 'Zero', 'Any', 'The shield is grounded at more than one point'],
          ['Signal change when the shield field end is lifted', 'None', 'Noise or offset disappears', 'The shield was the second ground path'],
          ['Signal change with the transmitter replaced by a calibrator', 'None', 'Noise or offset disappears', 'The transmitter or its mounting is grounded'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A ground loop and a missing ground are different problems',
        text: 'Noise on a signal can also come from a panel or a field device that has no ground at all, so that its reference floats and picks up whatever is nearby. The measurements distinguish them: a ground loop shows current in a path that should carry none; a missing ground shows a large, unstable voltage between a device and earth. The fix for one makes the other worse.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'The symptom is reproduced, then eliminated by the fix, then confirmed absent under the load that produced it.',
          'Voltage between the grounds is measured before and after and recorded.',
          'The shield is grounded at exactly one documented end, or the two-end scheme is deliberate and recorded.',
          'Equipment grounds were never lifted.',
          'The loop sheet records the fix.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does grounding the shield at both ends cause a problem?',
        a: 'The two ground points are at slightly different potentials, and the shield connects them, so current flows in the shield. That current induces a voltage into the signal pair and, if the shield shares any part of the signal return, adds directly to the signal. One ground means no path for the current.',
      },
      {
        q: 'Where should the shield be grounded?',
        a: 'At the panel end, on the instrument ground bar, is the usual practice for 4-20 mA and other low-frequency signals. The field end is insulated. Some platforms and some high-frequency applications call for grounding both ends or for a hybrid capacitor ground; follow the platform grounding guide when it says so and document it.',
      },
      {
        q: 'Can an isolator fix every ground loop?',
        a: 'An isolator breaks the galvanic path between the field side and the panel side, which eliminates the loop as far as the signal is concerned. It does not fix a damaged cable, a wet junction box, or a floating reference, and it adds a device that needs power and can fail. Use it when the second ground is inherent to the field device.',
      },
      {
        q: 'The signal is fine on the bench and noisy in the field. Is that a ground loop?',
        a: 'Possibly, and it is the classic pattern: on the bench there is only one ground. It can also be induced noise from cable routing near drive conductors, which needs no second ground. The shield current measurement and the lift test tell them apart.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/ground-loops',
      '/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/controls/instrumentation/signals/hart',
    ],
  },
];
