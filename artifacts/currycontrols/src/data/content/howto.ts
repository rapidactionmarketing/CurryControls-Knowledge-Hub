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
];
