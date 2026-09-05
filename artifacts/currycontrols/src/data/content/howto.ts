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
  {
    path: '/how-to/plc-how-to/configure-modbus',
    kind: 'howto',
    title: 'How to Configure a Modbus Connection',
    summary:
      'Set up a Modbus RTU or TCP link between a controller and a device: get the register map, match the physical and protocol settings, build the reads and writes, handle data types and the addressing offset, and verify with a protocol tool before trusting a value.',
    answer:
      'To configure a Modbus connection, get the register map from the device manual, set the physical layer (serial parameters and wiring for RTU, IP address and port 502 for TCP), set the unit identifier, build read requests that cover the registers you need in as few polls as possible, decode the data types the device uses, resolve the one-based versus zero-based addressing offset, add a write for each command, and verify every value against the device display with a Modbus test tool before the controller uses it.',
    keyPoints: [
      'The register map is the specification. Nothing works without it.',
      'Function code, address, and count per request; group registers to minimize polls.',
      'Resolve the addressing offset once, on the first register, and apply it to all.',
      'Decode data types deliberately: 16-bit, 32-bit with word order, floats, scaled integers, bit fields.',
      'Verify with a protocol tool against the device display, then set poll rate and timeout for the link.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Modbus', 'PLC', 'Communications', 'How-To'],
    supplies: [
      'The device manual with its Modbus register map and communication settings',
      'A Modbus master test tool on a laptop, serial or TCP as appropriate',
      'For RTU: an RS-485 adapter, shielded twisted pair, and termination resistors',
      'For TCP: the IP addressing plan and access to the switch',
      'The controller programming software and its Modbus configuration or instruction manual',
      'A signal list of the values and commands the controller needs from the device',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'note',
        title: 'Before you start',
        text: 'A Modbus write changes a setpoint or a command on a live device. Configure and verify reads first, with the device in a state where a wrong write cannot start anything, and test writes to a harmless register before the real ones. Tell operations what device is being connected.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Get the register map', text: 'From the device manual, the section usually called Modbus register map, holding registers, or communication. It lists each value with its register number or address, function code or register type, data type, scaling, and read-write access. Print it; you will annotate it.' },
          { title: 'Decide what the controller needs', text: 'From the signal list: the process values to read, the status words, the commands and setpoints to write. Mark them on the map. Do not read the whole map; read what is needed, grouped.' },
          { title: 'Set the physical layer', text: 'RTU: baud rate, data bits, parity, and stop bits identical on both ends, commonly 9600 or 19200, 8, none or even, 1. Two-wire RS-485 with A to A and B to B, a signal common, and 120 ohm termination at both ends of the bus only. TCP: a static IP on the device in the control subnet, port 502 unless the manual says otherwise, and a switch port it can reach.' },
          { title: 'Set the unit identifier', text: 'RTU: the slave address, unique on the bus, 1 to 247. TCP: the unit ID, often 1 or 255, and required by gateways that front several serial devices. The manual says what the device expects.' },
          { title: 'Resolve the addressing offset', text: 'Modbus addresses on the wire are zero-based; register maps are often written one-based, and some use the traditional 40001 style for holding registers. Pick the first register, read it with the test tool at the documented number and at the number minus one, and see which returns the value the display shows. Apply that offset to every register in the map.' },
          { title: 'Build the read requests', text: 'Group contiguous registers into single requests of up to 125 holding registers or 2000 coils. A device that reports ten values in registers 100 to 119 is one request, not ten. Separate requests for different register types: coils and discrete inputs with function codes 1 and 2, input registers with 4, holding registers with 3.' },
          { title: 'Decode the data types', text: 'From the map: a 16-bit signed or unsigned integer, a 32-bit integer or float in two registers with the word order the device uses, a scaled integer with a documented multiplier, a bit-packed status word. Configure the controller conversion for each and note it on the map. Word order is the item most often wrong on 32-bit values.' },
          { title: 'Build the writes', text: 'One request per command or setpoint, with function code 6 or 16 for holding registers and 5 or 15 for coils, written only on change or on operator action, never every scan. Confirm the device accepts the function code; some accept only 16 even for a single register.' },
          { title: 'Verify with the test tool', text: 'Before the controller is involved, read every configured register with the test tool and compare with the device display or a known state. Change a value on the device and confirm the register changes. Write a harmless register and confirm it took.' },
          { title: 'Configure the controller', text: 'Enter the same requests in the controller Modbus configuration or instructions, with the poll rate, the timeout, and the retry count. Map the results to tags with descriptive names and the decoded engineering units.' },
          { title: 'Verify from the controller', text: 'Compare every tag with the device display. Confirm the communication status tag goes bad when the cable is pulled and good when it is restored. Confirm the controller logic treats a bad status as bad data, not as zero.' },
          { title: 'Record', text: 'The annotated register map, the serial or IP settings, the unit ID, the request list with function codes and addresses, the data type decoding, the poll rate and timeout, and the date, in the project documentation and on the network drawing.' },
        ],
      },
      { t: 'h2', text: 'Poll rate and timeout' },
      {
        t: 'table',
        head: ['Setting', 'Typical value', 'Note'],
        rows: [
          ['Poll rate', '500 ms to 5 s per device', 'As slow as the process allows; a serial bus with many devices shares the time, and each request takes tens of milliseconds at 9600 baud'],
          ['Timeout', '1 s serial, 1 to 3 s TCP', 'Longer than the slowest device response including a radio hop; shorter than the poll rate'],
          ['Retries', '2 or 3', 'A device declared offline after retries fail, with a communication alarm'],
          ['Inter-frame delay', '3.5 character times minimum on RTU', 'Some devices need more; a device that answers the previous request while the next is sent corrupts both'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'One request too many',
        text: 'A Modbus device usually returns an exception, illegal data address, if a request includes one register it does not have. A request for registers 100 to 120 on a device that stops at 119 fails entirely, and every value in it goes bad. Build requests from the map, and when a request fails, check its last register first.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'Every configured register reads correctly against the device display with the test tool and from the controller.',
          'A 32-bit value reads correctly at a value that would reveal a word order error, such as one above 65535.',
          'Each write changes the intended value on the device and nothing else.',
          'Pulling the cable produces a communication alarm within the timeout and retry period, and reconnecting clears it.',
          'The controller uses the communication status to invalidate the data.',
          'The register map annotations and the settings are in the project record.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The device returns values but they are wrong. What is the most likely cause?',
        a: 'The addressing offset, the word order on 32-bit values, or a scaling factor from the map that was not applied. Read a register whose value you know from the display, and work through those three in that order.',
      },
      {
        q: 'The device does not answer at all. Where do I start?',
        a: 'On RTU: serial settings, A and B polarity, the unit address, and termination. Swap A and B and try again before anything else. On TCP: ping the device, then confirm port 502 with the test tool, then the unit ID. A gateway in front of a serial device often needs the unit ID of the serial device, not 1.',
      },
      {
        q: 'How many devices can share an RS-485 bus?',
        a: 'Electrically, 32 unit loads without a repeater, and more with modern low-load transceivers. Practically, the poll time per device times the device count sets the update rate, and a bus of a dozen devices at 9600 baud updates each every few seconds. Use a second port or a higher baud rate before it gets slow.',
      },
      {
        q: 'Should the controller be the master or the device?',
        a: 'The controller is the master and the device is the slave in nearly every case; the controller polls and writes. A device that must initiate, such as one that reports on exception, is not Modbus in the usual sense and needs a different protocol.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/modbus-rtu',
      '/controls/plc-systems/communications/modbus-tcp',
      '/controls/plc-systems/communications/serial-communications',
      '/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline',
      '/controls/plc-systems/analog-control/signal-validation',
    ],
  },
  {
    path: '/how-to/scada-how-to/diagnose-bad-quality',
    kind: 'howto',
    title: 'How to Diagnose a Bad Quality Tag',
    summary:
      'Trace a bad quality indication from the SCADA screen back to its source: the tag configuration, the driver and device connection, the controller tag, and the field signal, using the diagnostics each layer provides, and separate a stale value from a bad one.',
    answer:
      'To diagnose a bad quality tag, first read the quality code and the driver diagnostics to learn which layer is reporting it, then work outward: confirm the tag address and data type match the controller, confirm the driver connection to the device is up and polling, confirm the controller tag exists and holds a value, and only then look at the field signal. Most bad quality is a communication or configuration fault, not an instrument fault, and the quality code says which.',
    keyPoints: [
      'Read the quality code first. It names the layer that failed.',
      'One tag bad with the others good is configuration. All tags on a device bad is communication.',
      'Check the driver diagnostics before touching the controller or the field.',
      'A frozen good value and a bad value are different problems with different causes.',
      'Fix the cause, then confirm the quality returns and the value moves.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['SCADA', 'Troubleshooting', 'How-To', 'Communications'],
    supplies: [
      'SCADA configuration access and the driver diagnostic tool',
      'The tag database export or the tag configuration screen',
      'The controller programming software with online access',
      'The network drawing with device addresses',
      'A laptop that can ping and, for serial devices, a protocol test tool',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'note',
        title: 'Before you start',
        text: 'A tag with bad quality is telling the truth: the system does not know the value. Do not clear the indication by overriding the tag or forcing a value while the cause is unknown. Operations should treat the value as unknown until the quality is good again.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Read the quality code', text: 'Every platform carries a quality code with the value: an OPC-style code such as Bad, Bad Not Connected, Bad Config Error, Bad Device Failure, Uncertain, or a platform-specific equivalent. Find it on the tag detail or in the tag browser. Not Connected and Device Failure point to communication; Config Error and Bad Address point to the tag configuration; Uncertain points to a stale or clamped value.' },
          { title: 'Scope the failure', text: 'Look at the other tags from the same device and the same driver. All bad means the connection; one bad means that tag. Tags from other devices on the same driver bad too means the driver or the network segment.' },
          { title: 'Open the driver diagnostics', text: 'Every driver has a status view: connection state, poll counts, success and failure counters, last error, response time. A connection that shows failures climbing names the device. An error text such as timeout, connection refused, illegal address, or exception code narrows it.' },
          { title: 'For a connection problem, test the path', text: 'Ping the device from the SCADA server. If ping fails, the network drawing and the switch diagnostics are next: link light, VLAN, cable, the device power. If ping works and the driver cannot connect, check the port, the unit ID or slot number, and whether another master has the device connection count exhausted.' },
          { title: 'For a configuration problem, check the address', text: 'Compare the tag address in SCADA with the controller: tag name and case, program scope, array index, data type, and on register-based devices the register number and the addressing offset. A tag renamed in the controller and not in SCADA is the most common single cause.' },
          { title: 'Check the data type', text: 'A SCADA tag configured as an integer reading a controller REAL, or a 16-bit read of a 32-bit value, produces a bad or a nonsense value depending on the driver. Match them exactly.' },
          { title: 'Check the controller', text: 'Online with the controller, confirm the tag exists, holds a value, and is being updated by the program. A controller tag that is fine while SCADA shows bad confirms the problem is between them.' },
          { title: 'For an Uncertain or stale value, check the timestamp', text: 'A value with a timestamp that stopped advancing is stale: the driver stopped updating it, or the controller stopped writing it. Compare the tag timestamp with the current time and with the poll rate. A stale good value is a different failure from a bad one, and its causes are on the frozen values page.' },
          { title: 'Look at the field only when the layers above are clean', text: 'If the driver reads the controller and the controller tag is bad or out of range, the input channel and the field device are next: an input card fault, an open loop, an under-range signal. The controller has its own diagnostics for those, and they point to the channel.' },
          { title: 'Fix, confirm, record', text: 'Correct the cause. Confirm the quality returns to Good and that the value changes when the process changes. Record the cause and the fix; a bad quality that came from a tag rename will come from the next rename too.' },
        ],
      },
      { t: 'h2', text: 'Reading the quality code' },
      {
        t: 'table',
        head: ['Quality', 'Usual meaning', 'Look at'],
        rows: [
          ['Bad, Not Connected', 'The driver has no connection to the device', 'Network, device power, port, connection limits'],
          ['Bad, Device Failure', 'The device answered with an error or stopped answering', 'Driver diagnostics, device status, controller fault'],
          ['Bad, Config Error or Bad Address', 'The tag address does not exist on the device', 'Tag name, scope, index, register number, offset'],
          ['Bad, Data Type Mismatch', 'The address exists but the type does not match', 'Data type on both ends; 16 versus 32 bit'],
          ['Bad, Comm Failure after good', 'The connection was up and dropped', 'Intermittent network or serial; timeouts; retries'],
          ['Uncertain, Last Usable Value', 'The last good value is being shown because updates stopped', 'Timestamp; poll rate; the frozen values page'],
          ['Uncertain, Sensor Not Accurate or Out of Range', 'The controller flagged the input', 'The input channel and the field signal'],
          ['Good, Local Override', 'Someone forced the tag', 'The override list; remove it when the cause is fixed'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'One tag bad on a healthy device is almost always a name',
        text: 'When every other tag from a controller is good and one is bad, the tag was renamed, moved into a program scope, had its array size changed, or was deleted in the controller, and SCADA was not updated. Compare the address character by character; case matters on most platforms.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'The quality code on the tag is Good and the timestamp advances.',
          'The value changes when the process or the controller value changes.',
          'The driver diagnostics show a stable connection with failures no longer climbing.',
          'Any override or force used during diagnosis is removed.',
          'The cause and the fix are recorded, and the tag database is corrected if the cause was configuration.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does the tag show bad quality only sometimes?',
        a: 'Intermittent communication: a serial bus with a marginal device, a radio path with fades, a network with packet loss, or a timeout set too close to the device response time. The driver counters show the failure rate. Lengthen the timeout if it is the cause; fix the path if it is not.',
      },
      {
        q: 'Can bad quality come from the historian?',
        a: 'A trend that shows gaps or a bad marker reads the quality the historian stored, which came from the driver at the time. A live tag with good quality and a trend with bad quality means the problem was earlier and is now fixed, or the historian collection failed. Check both timestamps.',
      },
      {
        q: 'What should the display show when quality is bad?',
        a: 'The value in a distinct style with a visible bad quality indicator: an outline, a color from the reserved palette, a marker such as a question mark or an X, and no number that could be read as a real value. Displaying the last value as if it were live is the failure the quality code exists to prevent.',
      },
      {
        q: 'The controller has no fault and SCADA shows every tag bad. What is it?',
        a: 'The connection between them: the SCADA server network interface, the switch, a changed IP address, a firewall rule, a driver license or service that stopped, or the controller connection limit reached by another client. The driver diagnostics and a ping from the server narrow it in minutes.',
      },
    ],
    related: [
      '/troubleshooting/scada-troubleshooting/tag-shows-bad-quality',
      '/troubleshooting/scada-troubleshooting/values-frozen-on-screen',
      '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
      '/controls/plc-systems/communications/ethernet-ip',
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
    ],
  },
  {
    path: '/how-to/panel-how-to/calculate-sccr',
    kind: 'howto',
    title: 'How to Calculate a Panel SCCR',
    summary:
      'Determine the short-circuit current rating of a control panel by the UL 508A Supplement SB method: list every power circuit component, find each rating, apply published series combinations and current limiting, and mark the panel with the lowest result.',
    answer:
      'To calculate a panel short-circuit current rating, list every component in the power circuit from the incoming terminals to each load, find the SCCR or interrupting rating of each from its listing or the UL 508A default table, raise any that have a published series combination or current-limiting protection ahead of them, and take the lowest value as the panel SCCR. The result is marked on the panel nameplate and compared with the available fault current at the installation, which must not exceed it.',
    keyPoints: [
      'The panel SCCR is the lowest rating of any power circuit component, after allowed increases.',
      'Control circuit components do not count; power circuit components all do, including terminal blocks and wire.',
      'A component with no marked rating gets the UL 508A default, often 5 kA or less.',
      'Increases come only from published series combinations or listed current-limiting fuse let-through, never from reasoning.',
      'The marked SCCR must equal or exceed the available fault current at the panel. That is a code requirement.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Panels', 'UL 508A', 'NEC', 'How-To'],
    supplies: [
      'The panel drawings and bill of materials',
      'The data sheet or listing information for every power circuit component',
      'UL 508A, Supplement SB, or the panel shop worksheet based on it',
      'Manufacturer series combination tables and current-limiting fuse let-through data',
      'The available fault current at the installation, from the utility and a short-circuit calculation',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'warning',
        title: 'Before you start',
        text: 'An SCCR is a safety rating. A panel marked higher than its components can withstand may fail violently under fault, with arc flash consequences for the person in front of it. Follow the method exactly, use only published data, and have the result checked. When in doubt, the number is lower.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Identify the power circuit', text: 'Every component that carries current from the incoming terminals to a load: disconnect, fuses and breakers, terminal blocks, busbars and wire, contactors, overload relays, drives, soft starters, power supplies on the line side, transformers, and receptacles. The control circuit downstream of the control transformer or the power supply is excluded, provided it is protected as UL 508A requires.' },
          { title: 'Draw the branches', text: 'From the incoming terminals, trace each branch to its load. A component sees the fault current at its position, and the increases from a protective device apply only downstream of that device.' },
          { title: 'Find each component rating', text: 'From the component marking or data sheet: the SCCR for devices such as contactors, overloads, drives, and terminal blocks; the interrupting rating for fuses and breakers. Record the rating and the condition it applies under, which often names a specific fuse class or breaker ahead of it.' },
          { title: 'Apply defaults where nothing is marked', text: 'UL 508A Supplement SB Table SB4.1 gives default ratings for unmarked components: 5 kA for many contactors and overloads under a certain size, 10 kA for some, less for others. An unmarked terminal block or a receptacle takes the default too.' },
          { title: 'Apply series combinations', text: 'Where a manufacturer publishes a tested combination, such as this breaker or this fuse class ahead of this contactor and overload gives 65 kA, the downstream components take that rating in that combination only. Record the source. Combinations across manufacturers exist only if one of them tested and published them.' },
          { title: 'Apply current-limiting let-through', text: 'Where a listed current-limiting fuse or a current-limiting breaker with published let-through is ahead of a branch, Supplement SB allows the components downstream to be applied at the let-through current, under the conditions the supplement states, for components with an SCCR in the categories it allows. Use the peak let-through tables for the fuse at the available fault current. This is the most misapplied step; read the supplement conditions.' },
          { title: 'Handle drives and power conversion', text: 'A drive has its own SCCR that usually depends on a specific upstream protective device named in its listing. Use that device and that rating. A drive with a 5 kA marking and no listed combination limits the panel to 5 kA whatever else is done.' },
          { title: 'Handle the transformer branch', text: 'A control transformer primary is in the power circuit. Its primary protection and the transformer take the rating at their position; the secondary is a control circuit if it meets the control circuit rules.' },
          { title: 'Take the lowest', text: 'The panel SCCR is the lowest of every component rating after increases, across every branch. Write the table: component, rating, basis, and the resulting branch rating.' },
          { title: 'Compare with the available fault current', text: 'From the utility at the service and the short-circuit calculation through the transformers and conductors to the panel location. The panel SCCR must be equal to or greater than it. If not, the design changes: higher-rated components, a series combination, or current-limiting fuses at the main.' },
          { title: 'Mark and record', text: 'The SCCR on the panel nameplate as UL 508A and the NEC require, and the calculation table in the panel documentation. The table is what an inspector, and the next engineer, will ask for.' },
        ],
      },
      { t: 'h2', text: 'A worked example' },
      {
        t: 'table',
        head: ['Component', 'Marked rating', 'Basis for increase', 'Applied rating'],
        rows: [
          ['Main disconnect with Class J fuses, 100 A', '200 kA interrupting', 'None needed', '200 kA'],
          ['Power distribution block', '10 kA marked', 'Manufacturer table: 100 kA with Class J fuses up to 200 A ahead', '100 kA'],
          ['Branch breaker, pump 1, 30 A', '14 kA interrupting', 'Manufacturer series table with Class J main: 65 kA', '65 kA'],
          ['Contactor and overload, pump 1', '5 kA default', 'Manufacturer combination with the branch breaker: 65 kA', '65 kA'],
          ['Drive, pump 2, with Class J semiconductor fuses per drive listing', '100 kA with the listed fuses', 'As listed', '100 kA'],
          ['Terminal blocks, power', '10 kA marked', 'Let-through of Class J fuses at 65 kA available: 8 kA peak per table, within the supplement conditions', '65 kA'],
          ['Control transformer primary breaker, 3 A', '10 kA interrupting', 'No published combination', '10 kA'],
        ],
      },
      {
        t: 'p',
        text: 'The panel SCCR in this example is 10 kA, set by the control transformer primary breaker, which has no series rating. Replacing it with a Class CC fuse rated 200 kA raises the panel to 65 kA, limited then by the pump 1 breaker combination. One small breaker, chosen without thought, cost the panel its rating; that is the usual story.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Where the numbers come from',
        text: 'Every rating in the table has a source that can be produced: a component marking, a data sheet, a manufacturer series combination table, a fuse let-through table, or the Supplement SB default table. A rating that cannot be sourced is not a rating. Panel shops keep the sources with the calculation for exactly this reason.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'Every power circuit component appears in the table with a sourced rating.',
          'Every increase cites a published combination or let-through table and meets the supplement conditions.',
          'The panel SCCR is the lowest applied rating across all branches.',
          'The available fault current at the installation is documented and does not exceed the SCCR.',
          'The nameplate marking matches the calculation, and the calculation is in the panel documentation.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What SCCR do most utility panels need?',
        a: 'Whatever the available fault current at the panel is, which depends on the service transformer size and the distance. A small lift station on a pole-mounted transformer at the end of a long secondary may see under 10 kA; a panel next to a large plant transformer may see 40 kA or more. Get the number; do not assume it.',
      },
      {
        q: 'Can I raise the SCCR by putting current-limiting fuses at the main?',
        a: 'Often, and it is the usual method, but only for the component categories and conditions Supplement SB allows, using the fuse let-through at the available fault current, and not for every device. Drives and some devices require their own listed combination regardless of what is ahead of them.',
      },
      {
        q: 'Does the control circuit affect the SCCR?',
        a: 'Not if it is a control circuit as UL 508A defines it: fed through a control transformer or a power supply with the required protection, and used only for control. The components on it do not enter the calculation. A receptacle or a heater fed directly from the power circuit is in the power circuit.',
      },
      {
        q: 'Who is responsible for the SCCR?',
        a: 'The panel builder determines and marks it. The engineer or the installer determines the available fault current and confirms the panel rating is adequate at the installation. An inspector checks both. A panel with an adequate rating in the shop can be inadequate on a site with more fault current than assumed.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/sccr',
      '/controls/control-panels/panel-design/ul-508a',
      '/controls/control-panels/panel-components/circuit-breakers',
      '/controls/control-panels/panel-components/fuses',
      '/controls/control-panels/pump-panels/vfd',
    ],
  },
  {
    path: '/how-to/instrumentation-how-to/configure-radar-level',
    kind: 'howto',
    title: 'How to Configure a Radar Level Transmitter',
    summary:
      'Commission a non-contact radar on a wet well or tank: mount it, set the reference and range from measured elevations, map false echoes with the vessel empty, set damping and the output, and verify against a tape at two levels before the controller uses it.',
    answer:
      'To configure a radar level transmitter, mount it with a clear view of the surface away from walls, inflows, and obstructions, enter the distance from its reference point to the vessel bottom and the span you want as 4 to 20 mA, run a false echo mapping with the level as low as possible so the transmitter ignores fixed reflections, set damping for the application, confirm the output direction, and verify the reading against a tape measure at two levels. Record every setting and the elevations they were derived from.',
    keyPoints: [
      'The reference point is on the transmitter, and every distance is measured from it. Find it in the manual first.',
      'Range settings come from a tape measure, not from the drawing.',
      'Map false echoes with the well as empty as it will get. A map made at high level hides the obstructions below.',
      'Damping smooths the reading and delays it. A few seconds on a wet well; less on a fast process.',
      'Verify at two levels. A one-point check cannot find a span error.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Instrumentation', 'Level', 'How-To', 'Commissioning'],
    supplies: [
      'The transmitter manual, with the reference point drawing and the menu structure',
      'A HART communicator, the manufacturer software, or the local display',
      'A tape measure long enough to reach the bottom, with a weight',
      'A loop calibrator or milliammeter for the output check',
      'The instrument list with the intended range and the controller scaling',
      'The mounting hardware: a flange or bracket that places the antenna where it needs to be',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Before you start',
        text: 'A wet well is a confined space. Mounting and tape measurements are done from the hatch and the walkway, not from inside. Put the level control in manual or on float backup while the transmitter is configured, tell operations, and be aware that the pumps will respond to whatever value the transmitter sends once it is back in control.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Find the reference point', text: 'The manual shows where on the transmitter the measured distance starts: the flange face, the antenna tip, or a mark on the housing. Every range setting is a distance from that point. Getting this wrong offsets every reading by the difference.' },
          { title: 'Check the mounting', text: 'The antenna perpendicular to the surface, with a clear cone of view to the lowest level. Away from the wall by the distance the manual gives, away from the inflow stream and the pump discharge turbulence, and not above a ladder, a pump cable, a guide rail, or a float that swings through the beam. A nozzle or standpipe must be the size and length the manual allows, or the echo comes from the nozzle.' },
          { title: 'Measure the distances', text: 'With the tape, from the reference point to the vessel bottom or to the lowest point you want to measure. Note the elevation of the reference point against a site datum if elevations are used. Measure the current level at the same time, from the reference point to the surface.' },
          { title: 'Enter the empty and full distances', text: 'Empty distance, the distance from the reference point to the 4 mA point, usually the bottom or the low-level cutoff. Full distance, or span, the distance from the reference point to the 20 mA point, usually near the top of the range with margin below the antenna dead band. These two settings define the output. Copy them from the tape, and copy the resulting range to the instrument list and the controller scaling.' },
          { title: 'Set the application parameters', text: 'Medium type, liquid; vessel type, open or closed; surface condition, calm or turbulent; and for wastewater, the fast-changing or agitated surface option if offered. These tune the echo processing.' },
          { title: 'Run the false echo mapping', text: 'With the level as low as it can safely go, so that as much of the well as possible is in view, run the mapping function. The transmitter records the fixed echoes from the walls, the pumps, the rails, and the inflow pipe and ignores them thereafter. Mapping with the well full records nothing useful and leaves the obstructions below the surface unmapped.' },
          { title: 'Set damping', text: 'The time constant applied to the reading. Two to five seconds on a wet well smooths turbulence without hiding a real change. Less on a tank with fast fill and draw; more on a very turbulent surface. Damping delays every change by about its value, so keep it short enough for the control.' },
          { title: 'Set the output and failure behavior', text: 'Direction, 4 mA at empty and 20 mA at full unless the loop is designed otherwise. Failure current on lost echo, high or low per the site standard, so the controller can detect it. Echo-lost timeout, the seconds the transmitter holds the last value before declaring a fault.' },
          { title: 'Verify at two levels', text: 'At the current level, compare the transmitter reading with the tape. Then at a second level, after the pumps have moved the well or by pumping down deliberately, compare again. Both should agree within an inch or two. A consistent offset at both is the reference point; a difference that grows with level is the span or the empty distance.' },
          { title: 'Check the loop and the controller', text: 'Read the output current with the calibrator at the panel and confirm the controller shows the tape reading in engineering units. Confirm the low-level cutoff and the pump setpoints in the controller correspond to the elevations intended.' },
          { title: 'Record', text: 'Reference point location, empty and full distances, mapping level, damping, failure current, the two verification readings, and the date, on the loop sheet and the instrument list.' },
        ],
      },
      { t: 'h2', text: 'Settings that cause trouble' },
      {
        t: 'table',
        head: ['Setting', 'Symptom when wrong', 'Fix'],
        rows: [
          ['Empty distance from the drawing, not the tape', 'Constant offset at all levels', 'Measure and re-enter'],
          ['Mapping done at high level', 'Reading jumps to a fixed value as the well pumps down past an obstruction', 'Re-map at the lowest level'],
          ['Dead band ignored', 'Reading stuck at full when the surface rises near the antenna', 'Lower the 20 mA point below the dead band, or raise the transmitter'],
          ['Damping too long', 'Level lags; pumps overshoot the stop setpoint', 'Shorten damping; check the controller filter too'],
          ['Failure current same as a valid reading', 'Lost echo looks like a real level', 'Set failure current outside 4 to 20 mA and validate in the controller'],
          ['Nozzle too long or too narrow', 'Reading fixed at the nozzle end', 'Shorten the nozzle, use the correct antenna, or map it if the manual allows'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The two-point tape check is the whole verification',
        text: 'Radar transmitters are accurate to millimeters; almost every wrong reading in the field is a configuration distance or a mapping issue. Two tape readings at different levels, compared with the transmitter, find both. Do them every time the transmitter is touched.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'Transmitter reading agrees with the tape at two levels at least a foot apart.',
          'The controller displays the tape reading in engineering units.',
          'The reading follows a pump-down smoothly through the full range without jumps at obstructions.',
          'A blocked or lost echo produces the configured failure current and the controller alarms it.',
          'All settings and the measured distances are recorded on the loop sheet.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does the level jump to a fixed value part way through a pump-down?',
        a: 'An unmapped fixed echo, usually a pump, a rail, or the inflow pipe, that the transmitter starts tracking as the surface passes it. Re-run the false echo map with the level below the obstruction.',
      },
      {
        q: 'Can I configure the transmitter with the well full?',
        a: 'You can enter the distances and set the output, but you cannot map the false echoes usefully, and the two-point verification needs a second level. Enter the settings, then finish the mapping and the verification at low level, even if that means a return visit.',
      },
      {
        q: 'What about foam and grease on the wet well surface?',
        a: 'Radar reads the top of foam poorly and a grease mat inconsistently. Higher frequency radars with narrow beams do better; the application settings help; and where the surface is regularly covered, a submersible pressure transmitter as the second measurement with cross-checking in the controller is the practical answer.',
      },
      {
        q: 'Should the empty distance be the bottom of the well?',
        a: 'It should be the point you want to read as 4 mA, which is usually the bottom or a little above it, below the low-level cutoff. Setting it at the cutoff loses the ability to see the well below that level, which is useful for a dry-run diagnosis. Setting it far below the bottom wastes range.',
      },
    ],
    related: [
      '/controls/instrumentation/level/radar-level',
      '/controls/instrumentation/level/wet-well-level',
      '/how-to/plc-how-to/scale-a-4-20-ma-input',
      '/controls/plc-systems/analog-control/signal-validation',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
    ],
  },
  {
    path: '/how-to/network-how-to/assign-ip-addresses',
    kind: 'howto',
    title: 'How to Assign IP Addresses on a Control Network',
    summary:
      'Build an addressing plan before the first device is configured: one subnet per zone and site, a fixed block layout so an address says what the device is, static addresses on everything that controls a process, and a schedule that is kept current.',
    answer:
      'To assign IP addresses on a control network, choose a private range that will not collide with vendor defaults or home routers, give each site and each security zone its own /24 subnet, lay out fixed blocks inside every subnet for gateways, switches, controllers, I/O, instruments, servers, and laptops, assign static addresses to every device that takes part in control, record every address in an IP schedule with the device, MAC address, location, VLAN, and switch port, and verify with ping and the ARP table that no address is duplicated.',
    keyPoints: [
      'Plan the whole system first; a network addressed one device at a time cannot be segmented or routed later.',
      'One /24 per zone per site. The second and third octets say where and what; the last octet says which.',
      'Static addresses on controllers, I/O, drives, instruments, and servers. No DHCP pool on a control VLAN.',
      'Avoid 192.168.0.0/24 and 192.168.1.0/24; they collide with vendor defaults, cellular modems, and VPN clients.',
      'The IP schedule is part of the drawings. An address that is not on the schedule does not exist.',
      'Verify with ping and ARP from inside the subnet; a duplicate address shows up as two MAC addresses answering.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Networking', 'Ethernet', 'Design', 'Documentation', 'How-To'],
    supplies: [
      'The list of sites, zones, and every network device with its role',
      'The existing addresses of anything already installed, from the device displays or a network scan',
      'Access to the switch and firewall configuration',
      'The programming software for each controller and a laptop with an Ethernet port',
      'A spreadsheet or the project network schedule template',
      'Label material for the devices and the drawings',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'warning',
        title: 'Changing a live address',
        text: 'Changing the address of a running controller breaks every connection to it: the HMI, the historian, remote I/O, and peer controllers. Readdress during a planned outage, change the clients at the same time, and keep the old address written down until everything reconnects.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Inventory what exists', text: 'List every device that has or will have an address: controllers, I/O adapters, drives, instruments with Ethernet, switches, firewalls, radios, cellular modems, servers, HMIs, printers, cameras. Record the current address, mask, gateway, and MAC of anything already running. Read the address from the device itself, not from memory.' },
          { title: 'Choose the private range', text: 'Use the 10.0.0.0/8 range for anything larger than one panel. It gives 65,000 subnets and does not collide with the 192.168.x.x defaults used by vendor equipment, cellular modems, home routers, and VPN clients. Keep 192.168.x.x for temporary bench work and out-of-box device defaults only.' },
          { title: 'Assign a subnet per zone per site', text: 'Give each site a number and each security zone a number, and form the subnet as 10.SITE.ZONE.0/24. A plant with a control zone, a supervisory zone, and a management zone at site 5 uses 10.5.10.0, 10.5.20.0, and 10.5.99.0. Remote sites follow the same pattern with their own site number, so a site-to-site VPN can route without address translation.' },
          { title: 'Lay out fixed blocks inside every subnet', text: 'Reserve the same host ranges in every subnet, per the table below, so that the last octet identifies the device class anywhere in the system. A technician who sees 10.7.10.21 knows it is a controller at site 7 in the control zone without looking anything up.' },
          { title: 'Assign static addresses', text: 'Every controller, I/O adapter, drive, instrument, server, and switch gets a static address from its block. Set it in the device, set the mask to 255.255.255.0, and set the gateway only if the device must talk across subnets; a device with no gateway cannot be reached from another subnet, which is a feature for I/O and a fault for a server.' },
          { title: 'Handle the devices that insist on DHCP', text: 'A few devices ship with DHCP on and no way to set a static address until they get one. Use a DHCP reservation tied to the MAC on the management network for the first configuration, then set the static address. Do not leave a DHCP pool active on a control VLAN; an address that changes at lease renewal is an intermittent communication failure waiting to happen.' },
          { title: 'Set the switch and firewall interfaces', text: 'The firewall interface for each subnet takes .1, the gateway address. Switch management addresses go in the management subnet, not in the control subnet, so a switch is reachable only through the management VLAN.' },
          { title: 'Write the schedule', text: 'One row per address: address, hostname or tag, device model, MAC, location, VLAN, switch and port, and a note. Include the spare blocks so nobody invents an address. Put the schedule with the network drawing and revise both together.' },
          { title: 'Label', text: 'The address goes on the device label, on the network drawing, and in the switch port description. A controller whose address is visible on its label is diagnosed in seconds; one whose address is in a laptop somewhere is diagnosed in an hour.' },
          { title: 'Verify', text: 'From a laptop inside each subnet, ping every address on the schedule and confirm the ARP table shows one MAC per address. Ping every spare address and confirm nothing answers. Then check reachability across subnets only where the firewall rules intend it.' },
        ],
      },
      { t: 'h2', text: 'Block layout inside each /24' },
      {
        t: 'table',
        caption: 'A fixed layout that applies in every subnet at every site',
        head: ['Last octet', 'Use', 'Note'],
        rows: [
          ['.1', 'Gateway (firewall or router interface)', 'Same in every subnet'],
          ['.2 to .9', 'Switches and network infrastructure', 'Management addresses normally live in the management subnet; these are for switches that must be reachable locally'],
          ['.10 to .49', 'Controllers and PLC communication modules', 'Primary controller at .10 or .11, redundant partner adjacent'],
          ['.50 to .99', 'Remote I/O adapters and drives', 'In order of the drawing; adapter, then its drives'],
          ['.100 to .149', 'Instruments and analyzers with Ethernet', 'Match the loop number where possible'],
          ['.150 to .199', 'Servers, HMIs, historians, workstations', 'Redundant servers adjacent'],
          ['.200 to .239', 'Engineering laptops and temporary devices', 'Reserved addresses, not a pool'],
          ['.240 to .254', 'Spare', 'Never assigned without updating the schedule'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'When one /24 is not enough',
        text: 'A site with more than 40 controllers or more than 50 I/O adapters in one zone is unusual. Before enlarging the mask to /23, split the zone into two subnets by process area; a smaller broadcast domain contains a storm, a chatty device, or a loop to one area, and the firewall between areas becomes possible later.',
      },
      { t: 'h2', text: 'Checking for duplicates' },
      {
        t: 'p',
        text: 'A duplicate address is intermittent by nature: whichever device answered ARP last gets the traffic. Check from a laptop in the same subnet.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Windows commands to confirm which device holds an address',
        code: `ping 10.5.10.21
arp -a | findstr 10.5.10.21

REM one line with one MAC is correct
REM ping the address, unplug the device you think it is, ping again
REM if it still answers, something else has the address`,
      },
      {
        t: 'p',
        text: 'On a managed switch, the MAC address table shows the port for each MAC. Two MACs claiming one address show up in the switch log as an IP conflict on some platforms, and always show up as two different ports answering the same address over time.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'Every device on the schedule answers ping from inside its subnet with one MAC in the ARP table.',
          'No spare or unassigned address answers.',
          'Cross-subnet traffic works only where a firewall rule permits it, and fails everywhere else.',
          'The controller, HMI, historian, and I/O all reconnected after any readdressing.',
          'The schedule, the network drawing, the device labels, and the switch port descriptions agree.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why not just use 192.168.1.x like the vendor defaults?',
        a: 'Because everything else uses it too. A cellular modem, a laptop on a home network over VPN, a vendor tool, and a new device out of the box all default into 192.168.0.x or 192.168.1.x, and every one of them collides with a control network that lives there. A 10.x.x.x plan avoids every collision and gives room to number sites and zones.',
      },
      {
        q: 'Can two remote sites use the same subnet?',
        a: 'Only if they will never be connected. Two sites at 192.168.1.0/24 cannot be joined by a VPN or a central SCADA without address translation, which is confusing to troubleshoot. Give every site its own subnet from the start; it costs nothing.',
      },
      {
        q: 'Should the gateway be set on every device?',
        a: 'Set it where the device must communicate outside its subnet: servers, HMIs, controllers that report to a central SCADA. Leave it blank on remote I/O adapters, drives, and instruments that only talk to the local controller; without a gateway they cannot be reached from, or reach, another subnet even if a firewall rule is wrong.',
      },
      {
        q: 'What about IPv6?',
        a: 'Turn it off on control devices and workstations where the option exists, and do not plan around it. Control equipment overwhelmingly uses IPv4, and an IPv6 stack left enabled on a workstation is an unmanaged path that no firewall rule was written for.',
      },
    ],
    related: [
      '/how-to/network-how-to/configure-vlans',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/firewalls/firewall-rule-design',
      '/how-to/network-how-to/troubleshoot-ethernet',
      '/controls/plc-systems/communications/ethernet-ip',
    ],
  },
  {
    path: '/how-to/network-how-to/configure-vlans',
    kind: 'howto',
    title: 'How to Configure VLANs on a Control Network',
    summary:
      'Turn a zone plan into switch configuration: a VLAN per zone with its own subnet, access ports for devices, tagged trunks between switches, a native VLAN that carries nothing, a separate management VLAN, and routing between VLANs only through the firewall.',
    answer:
      'To configure VLANs on a control network, map each security zone to a VLAN ID and a subnet, create the VLANs on every switch, set each device port as an access port in the VLAN of its zone, set the links between switches and to the firewall as 802.1Q trunks that carry only the VLANs needed, move the native VLAN off VLAN 1 to an unused ID, put switch management in its own VLAN, configure the firewall as the gateway for every VLAN so that traffic between zones passes its rules, and verify that devices reach their own zone and cannot reach another without a rule.',
    keyPoints: [
      'A VLAN is a separate broadcast domain on shared switches; it is only a security boundary when a firewall sits between VLANs.',
      'One VLAN per zone, one subnet per VLAN, the same IDs at every site.',
      'Device ports are access ports. Only switch-to-switch and switch-to-firewall links are trunks, and trunks carry only the VLANs they need.',
      'Nothing lives on VLAN 1. Set the native VLAN on every trunk to an unused ID.',
      'Switch management goes in its own VLAN, reachable only from the engineering zone.',
      'Route between VLANs at the firewall, never on a layer 3 switch that bypasses it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Networking', 'Ethernet', 'Cybersecurity', 'Design', 'How-To'],
    supplies: [
      'The zone and conduit diagram with the VLAN ID and subnet for each zone',
      'The IP schedule with every device, its VLAN, switch, and port',
      'Console access to every managed switch and the firewall',
      'The switch vendor manual for the VLAN and trunk commands',
      'A laptop that can be moved between ports for testing',
      'A backup of every switch configuration before starting',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'warning',
        title: 'Changing a port VLAN on a live system',
        text: 'Moving a port to a new VLAN disconnects the device from everything it was talking to until its clients are moved and its address matches the new subnet. Do the work in an outage window, one zone at a time, with the console cable connected so a mistake on the management VLAN cannot lock you out of the switch.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Map zones to VLANs', text: 'Take the zone diagram and assign a VLAN ID and a subnet to each zone, using the same IDs at every site: VLAN 10 for the control zone, 20 for supervisory, 30 for remote I/O, 99 for switch management, for example. Write the plan as a table before touching a switch.' },
          { title: 'Back up every switch', text: 'Export the running configuration of every switch and the firewall to a file with the date. A VLAN change that goes wrong is undone by restoring the file, not by remembering what you typed.' },
          { title: 'Create the VLANs on every switch', text: 'Every switch that carries a VLAN must have it defined, including switches that only pass it through. Name each VLAN with its zone so the name shows in status displays.' },
          { title: 'Configure access ports', text: 'Each device port is an access port in the VLAN of its zone. Disable trunk negotiation on access ports; a device port that can be talked into becoming a trunk is a way into every VLAN. Add a port description with the device tag.' },
          { title: 'Configure trunks', text: 'Links between switches and to the firewall are 802.1Q trunks. Restrict each trunk to the VLANs it must carry; a trunk that carries everything by default lets a mistake on one switch reach every zone.' },
          { title: 'Move the native VLAN', text: 'Frames without a tag on a trunk land in the native VLAN, which is VLAN 1 by default on most switches. Set the native VLAN on every trunk to an unused ID such as 999, and put no ports in it, so untagged frames from a misconfigured device go nowhere.' },
          { title: 'Set up the management VLAN', text: 'Give each switch its management address in the management VLAN, remove the address from VLAN 1, and allow the management VLAN only on trunks that reach the engineering zone. Confirm you can still reach the switch before you disconnect the console cable.' },
          { title: 'Configure the firewall as gateway', text: 'Create a sub-interface on the firewall for each VLAN with the .1 address of that subnet, and write the rules that allow the intended conduits between zones. Devices in different VLANs can now talk only through those rules.' },
          { title: 'Move devices zone by zone', text: 'For each zone: readdress the devices if their subnet changed, move their ports, move their clients, and confirm communication returns before starting the next zone.' },
          { title: 'Verify and document', text: 'Test reachability within and between zones as described below. Save the configuration on every switch, export a fresh backup, and update the network drawing and IP schedule with the VLAN IDs and port assignments.' },
        ],
      },
      { t: 'h2', text: 'Example VLAN plan' },
      {
        t: 'table',
        caption: 'One site; the same IDs repeat at every other site with its own second octet',
        head: ['VLAN', 'Name', 'Subnet', 'Members'],
        rows: [
          ['10', 'CONTROL', '10.5.10.0/24', 'Controllers, local HMI panels'],
          ['20', 'SUPERVISORY', '10.5.20.0/24', 'SCADA servers, historian, operator workstations'],
          ['30', 'IO', '10.5.30.0/24', 'Remote I/O adapters, drives, Ethernet instruments'],
          ['40', 'DMZ', '10.5.40.0/24', 'Data relay, remote access jump host'],
          ['99', 'MGMT', '10.5.99.0/24', 'Switch and firewall management interfaces'],
          ['999', 'NATIVE', 'none', 'Native VLAN on trunks; no members'],
        ],
      },
      { t: 'h2', text: 'Example switch configuration' },
      {
        t: 'p',
        text: 'Command-line syntax varies by vendor, but the objects are the same everywhere: a VLAN database, access ports, trunks with an allowed list and a native VLAN, and a management interface. This example uses IOS-style syntax, which also applies to the industrial switches built on it.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Access port, trunk, and management interface',
        code: `vlan 10
 name CONTROL
vlan 30
 name IO
vlan 99
 name MGMT
vlan 999
 name NATIVE
!
interface GigabitEthernet1/0/5
 description PLC-101
 switchport mode access
 switchport access vlan 10
 switchport nonegotiate
 spanning-tree portfast
!
interface GigabitEthernet1/0/24
 description TRUNK-to-FW
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,20,30,40,99
!
interface Vlan99
 ip address 10.5.99.2 255.255.255.0
!
no interface Vlan1`,
      },
      {
        t: 'p',
        text: 'Switches configured through a web page use the same terms: a VLAN table, a port VLAN membership page with untagged for access and tagged for trunk, a PVID that is the native VLAN of a port, and a management VLAN setting.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Multicast on the I/O VLAN',
        text: 'Some remote I/O and drive connections use multicast. Enable IGMP snooping on the I/O VLAN and configure an IGMP querier on it, otherwise every switch floods the multicast to every port in the VLAN. This is a per-VLAN setting, and one more reason the I/O lives in its own VLAN.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'Every switch shows the same VLAN list, and each trunk shows the intended allowed VLANs and native VLAN.',
          'A laptop on an access port in VLAN 10 pings devices in VLAN 10 across the trunk between switches.',
          'The same laptop cannot ping a device in VLAN 20 or 30 unless a firewall rule permits it, and the firewall log shows the denied attempt.',
          'Switch management pages answer only from the engineering zone.',
          'Nothing has a port in VLAN 1 or in the native VLAN.',
          'All controller, HMI, historian, and I/O connections are restored, and the configuration is saved and backed up.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a VLAN a security boundary?',
        a: 'Only with a firewall between VLANs. Two VLANs on the same switch with no router between them cannot talk, which isolates them, but the moment a layer 3 switch or a router joins them the boundary is whatever that device enforces. Route between zones on the firewall, where rules and logs exist.',
      },
      {
        q: 'Why not use the layer 3 switch to route between VLANs? It is faster.',
        a: 'It is also unfiltered and unlogged unless access lists are written and maintained on it, which rarely happens. Control traffic between zones is small; a firewall handles it without difficulty. Reserve switch routing for cases where the firewall is the documented bottleneck, and then write the access lists.',
      },
      {
        q: 'What is the harm in using VLAN 1?',
        a: 'It is the default for every port and every trunk native VLAN, so a new switch, a reset switch, or a forgotten port lands in it, and management traffic on it mixes with anything untagged. Keeping VLAN 1 empty means those defaults land in a VLAN that connects to nothing.',
      },
      {
        q: 'How do I add a VLAN to an unmanaged switch?',
        a: 'You cannot. An unmanaged switch passes tagged frames without understanding them, which sometimes works between two managed switches, and puts every device on it in whatever VLAN its uplink port is assigned. Replace unmanaged switches in the path with managed ones before building VLANs.',
      },
    ],
    related: [
      '/how-to/network-how-to/assign-ip-addresses',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/cybersecurity/network-segmentation/dmz-design',
      '/cybersecurity/firewalls/firewall-rule-design',
      '/cybersecurity/firewalls/industrial-firewalls',
    ],
  },
  {
    path: '/how-to/network-how-to/troubleshoot-ethernet',
    kind: 'howto',
    title: 'How to Troubleshoot an Ethernet Connection',
    summary:
      'Work an Ethernet problem one layer at a time: link light and cable, then speed, duplex, and VLAN on the switch port, then address, mask, and gateway, then the application port through the firewall. Each layer has a one-minute test that rules it in or out.',
    answer:
      'To troubleshoot an Ethernet connection, establish what changed and whether one device or many are affected, check the link light and the switch port status and swap the cable, read the port speed, duplex, and error counters on the switch, confirm the port VLAN matches the device subnet, confirm the device address, mask, and gateway, ping from a laptop in the same subnet before testing across the firewall, check the ARP and MAC tables to see who is actually answering, test the application port with a TCP connection test, and record the cause when the connection is restored.',
    keyPoints: [
      'Bottom up: physical, then switch port, then addressing, then firewall and application. Do not skip a layer because it looks fine.',
      'The switch port counters tell the truth: CRC errors and late collisions mean a cable or a duplex mismatch, not a software problem.',
      'Test from inside the subnet first. A ping across the firewall tests three things at once and tells you nothing when it fails.',
      'A duplex mismatch works at low traffic and fails under load; force both ends or auto-negotiate both ends, never one of each.',
      'Ping proves the network path; only a connection to the application port proves the device will talk.',
      'Write down what changed, what you measured, and what fixed it; the next failure is usually the same one.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Networking', 'Ethernet', 'Troubleshooting', 'Communications', 'How-To'],
    supplies: [
      'A laptop with an Ethernet port, a known-good patch cable, and the switch console or management login',
      'The network drawing and IP schedule for the affected segment',
      'A cable tester or a spare cable of the right length',
      'The device manual for its Ethernet status indicators',
      'Access to the firewall log',
      'The controller or SCADA communication status display',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Working inside a live panel',
        text: 'Ethernet cables in a control panel run next to control power and sometimes next to drive output cables. Wear the PPE the panel label requires, and do not open a drive compartment to reach a switch without following the lockout procedure.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Define the failure', text: 'One device or many? Total or intermittent? Since when, and what changed just before: a firmware update, a new cable, a moved port, a firewall rule, a power event? A failure across many devices behind one switch or link points at that switch or link; a single device points at its cable, port, or configuration.' },
          { title: 'Check the physical layer', text: 'Look at the link light on the device and the port light on the switch. No light on either end means the cable, the port, or the device port is dead: swap in the known-good cable, then try another switch port. Fiber: confirm the transceiver type matches at both ends and the fibers are not swapped.' },
          { title: 'Read the switch port status', text: 'On the switch, show the port status: up or down, speed, duplex, VLAN, and the error counters. A port that is administratively down or error-disabled was turned off by a person or by a protection feature, and the log says which.' },
          { title: 'Check speed and duplex', text: 'Both ends should agree. Auto on one end and forced on the other produces a duplex mismatch: the auto end falls back to half duplex, and the port shows late collisions on the half side and CRC or alignment errors on the full side. Set both ends to auto-negotiate or both to the same forced setting.' },
          { title: 'Check the error counters over time', text: 'Clear the counters, wait ten minutes under normal traffic, and read them again. CRC and input errors that climb point at the cable, a connector, or noise coupled from a nearby drive cable. Output drops point at congestion. Zero errors with no communication means the problem is above the physical layer.' },
          { title: 'Confirm the VLAN', text: 'The port VLAN must match the subnet the device is addressed in. A device moved to another switch port on a different VLAN links fine and reaches nothing.' },
          { title: 'Confirm the device addressing', text: 'Read the address, mask, and gateway from the device itself. A mask of 255.255.0.0 on a device whose neighbors use 255.255.255.0, a gateway in the wrong subnet, or a duplicate address each produces a device that partly works.' },
          { title: 'Ping from inside the subnet', text: 'Put the laptop on an access port in the same VLAN with an address in the same subnet, and ping the device. Success here means the device, cable, port, and VLAN are good and the problem is routing or firewall. Failure here rules those out and keeps the search local.' },
          { title: 'Check who is answering', text: 'Look at the ARP table on the laptop after the ping and at the MAC address table on the switch. The MAC should be the device and the port should be the one on the drawing. A different MAC is a duplicate address; a different port is a mislabeled cable.' },
          { title: 'Test across the firewall', text: 'Now ping from the client that actually needs the device. If it fails while the local ping works, read the firewall log for the denied connection and check the gateway on both devices.' },
          { title: 'Test the application port', text: 'Ping success does not mean the protocol works. Test a TCP connection to the port the application uses, such as 502 for Modbus TCP or 44818 for EtherNet/IP. A refused or timed-out connection with a working ping is a service not running, a device connection limit, or a firewall rule that allows ping but not the port.' },
          { title: 'Restore and record', text: 'After the fix, watch the counters and the communication status for long enough to see the original failure would have recurred. Record the symptom, the measurements, the cause, and the fix on the work order and in the network notes.' },
        ],
      },
      { t: 'h2', text: 'Symptoms and where to look' },
      {
        t: 'table',
        head: ['Symptom', 'Most likely layer', 'First check'],
        rows: [
          ['No link light either end', 'Physical', 'Cable swap, then another switch port, then the device port'],
          ['Link light, no ping from same subnet', 'Port or addressing', 'Port VLAN, device address and mask, duplicate address'],
          ['Ping works locally, not from the client', 'Routing or firewall', 'Gateway on both ends, firewall log'],
          ['Ping works, protocol does not', 'Application', 'TCP test to the port, device connection count, service enabled'],
          ['Works then drops under load', 'Duplex mismatch or congestion', 'Late collisions, CRC errors, output drops on the port'],
          ['Drops when a drive runs', 'Noise', 'Cable routing next to drive output cable, shield bonding, CRC errors that track the drive'],
          ['Whole switch or area drops for seconds', 'Loop or spanning tree', 'Switch log for topology changes, a new cable between two switches, storm control counters'],
        ],
      },
      { t: 'h2', text: 'Useful commands' },
      {
        t: 'code',
        lang: 'text',
        caption: 'Windows and PowerShell on the laptop; IOS-style commands on the switch',
        code: `ipconfig /all
ping 10.5.10.21 -t
arp -a
tracert 10.5.10.21
Test-NetConnection 10.5.10.21 -Port 502

show interfaces status
show interfaces GigabitEthernet1/0/5
show mac address-table interface GigabitEthernet1/0/5
show logging | include 1/0/5
clear counters GigabitEthernet1/0/5`,
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Cables in drive panels',
        text: 'A patch cable that shares a wireway with a drive output cable picks up enough noise to produce CRC errors every time the drive runs. Route Ethernet away from drive output cables, cross them at right angles where they must meet, use shielded cable with metal connectors bonded at the switch, and keep the patch cable short.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'Link is up at the expected speed and duplex on both ends.',
          'Error counters do not increase over ten minutes of normal traffic, including with drives running.',
          'Ping from inside the subnet and from the client both succeed with no loss.',
          'The application connection is established and the communication status on the controller or SCADA is good.',
          'The cause is recorded and the drawing or schedule is corrected if it was wrong.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The link light is on but the switch shows the port down. How?',
        a: 'The device sees a carrier from the switch while the switch has the port administratively down, error-disabled, or in a state that stops forwarding. Read the switch port status and log; the port was disabled by configuration, by a security feature such as port security or BPDU guard, or by a loop protection feature.',
      },
      {
        q: 'Should I force 100 Mb full duplex on PLC ports?',
        a: 'Only if both ends are forced identically and the setting is documented. Modern equipment auto-negotiates reliably, and the classic failure is a forced switch port talking to an auto device, which negotiates to half duplex. Default to auto on both ends.',
      },
      {
        q: 'The device pings but its web page and its protocol both time out. What does that mean?',
        a: 'The network path is good and the device is not serving the port. Common causes: the service is disabled, the device has reached its connection limit and needs old connections to time out, the firmware crashed the TCP stack while ICMP still answers, or a firewall allows ICMP but not the port. Power cycle the device only after checking the firewall and connection count.',
      },
      {
        q: 'How do I find a loop?',
        a: 'A loop shows as every port on the switch flashing continuously, high CPU on the switch, and devices across the whole VLAN dropping. Look at the switch log for topology changes and the storm control counters, then find the cable that was added most recently between two switches or between two ports on the same switch. Enable spanning tree and loop protection so the next one is blocked instead of felt.',
      },
    ],
    related: [
      '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
      '/how-to/network-how-to/diagnose-packet-loss',
      '/troubleshooting/communications-troubleshooting/device-times-out',
      '/how-to/network-how-to/assign-ip-addresses',
      '/how-to/network-how-to/configure-vlans',
    ],
  },
  {
    path: '/how-to/network-how-to/diagnose-packet-loss',
    kind: 'howto',
    title: 'How to Diagnose Packet Loss',
    summary:
      'Find where and why frames are dropped: measure loss with a continuous ping, localize it hop by hop from both directions, read the port counters on the path, and match the pattern to its cause: a cable, a duplex mismatch, congestion, a loop, or a radio link.',
    answer:
      'To diagnose packet loss, confirm it with a continuous timestamped ping from a station near the affected device, then ping each hop along the path in turn to find the first segment that loses packets, ping from the far end back to confirm the segment, clear and read the error and drop counters on every switch port in that segment, and match the pattern of loss to its cause: random loss with CRC errors is a cable or noise, loss under load is congestion or a duplex mismatch, periodic bursts are a device or a scheduled job, brief total loss is a link flap or spanning tree, and loss behind a radio is the radio link.',
    keyPoints: [
      'Measure before you touch anything: a timestamped continuous ping gives the loss rate and the pattern.',
      'Localize by hop: the first hop that loses is where the problem is, and the far-end ping confirms it.',
      'Port counters name the layer: CRC errors are physical, output drops are congestion, both zero means the loss is beyond the switch.',
      'The pattern is the diagnosis. Random, under load, periodic, and burst each have a short list of causes.',
      'A controller that drops pings under load is often the controller, not the network; the protocol timeouts are the real measure.',
      'Zero loss over an hour, with counters not moving, is the finish line.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Networking', 'Ethernet', 'Troubleshooting', 'Telemetry', 'How-To'],
    supplies: [
      'A laptop that can be plugged into the switches along the path',
      'The network drawing with every switch, link, and radio on the path',
      'Management access to every switch on the path and to any radio or cellular modem',
      'The controller or SCADA communication status and timeout counters',
      'A spare patch cable and, for fiber, a light meter',
      'A text file or notebook for the ping logs and counter readings',
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'note',
        title: 'What ping does and does not tell you',
        text: 'Ping measures whether a small packet crosses the path and comes back. A control protocol that times out at one second can fail from delay that ping reports as success, and a busy controller can drop pings while its protocol works. Use ping to find where frames are lost, and use the protocol communication status to decide whether the problem is solved.',
      },
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Confirm and measure the loss', text: 'From a station as close to the affected device as practical, run a continuous ping with timestamps for at least fifteen minutes and save the output. Note the loss percentage and the pattern: single random drops, bursts, drops at regular intervals, or long outages.' },
          { title: 'Walk the path on the drawing', text: 'List every hop between the client and the device: switches, trunks, fiber links, radios, the firewall. Loss on a path can only come from a link, a switch, or the end device, so the list is the list of suspects.' },
          { title: 'Ping hop by hop', text: 'From the same station, ping the management address of each switch along the path in order, then the far device. The first target that shows loss marks the segment: the loss is between the last clean target and the first lossy one. If every switch is clean and only the device loses, it is the device, its cable, or its port.' },
          { title: 'Ping from the far end', text: 'Plug the laptop in beside the affected device and ping back toward the client. Loss that appears in both directions on the same segment confirms the segment. Loss in one direction only is often a duplex mismatch or a half-broken pair in one cable.' },
          { title: 'Read the counters on the segment', text: 'On both ports of the suspect link, clear the counters, wait ten minutes, and read input errors, CRC errors, output drops, and collisions. CRC and input errors are physical: cable, connector, transceiver, noise. Output drops are congestion. Late collisions are a duplex mismatch. Clean counters on a lossy segment point at a radio, a loop elsewhere flooding the VLAN, or the far device.' },
          { title: 'Check the radio or cellular link', text: 'If the segment includes a radio, read its received signal strength, signal-to-noise ratio, and error or retry counters on both ends, and compare with the values recorded at commissioning. Loss on a radio link that tracks weather, time of day, or a new obstruction is the link, not the network.' },
          { title: 'Check for a loop or a storm', text: 'Loss across a whole VLAN at once, switches with high CPU, and every port light solid are a loop or a broadcast storm. Read the switch logs for topology changes and the storm control counters, and find the new cable.' },
          { title: 'Check the end device', text: 'A controller that loses pings only when it is busy, and whose protocol connections stay good, is deprioritizing ICMP. A controller whose protocol connections also time out under load has too many clients or too fast a poll; count the connections and slow the polls.' },
          { title: 'Fix the cause, not the symptom', text: 'Replace the cable or transceiver, correct the duplex, enable IGMP snooping for multicast flooding, enable spanning tree and storm control for loops, realign or re-aim the antenna, isolate the chatty device, or spread the polls. Then repeat the measurement.' },
          { title: 'Verify and record', text: 'Run the continuous ping again for an hour with the counters cleared. Save the before and after ping logs and counter readings with the work order so the next person has a baseline.' },
        ],
      },
      { t: 'h2', text: 'Loss patterns and their causes' },
      {
        t: 'table',
        head: ['Pattern', 'Likely cause', 'Confirming evidence'],
        rows: [
          ['Random single drops, 1 to 5 percent', 'Cable, connector, transceiver, or noise', 'CRC and input errors climbing on one port; loss tracks a drive or a motor running'],
          ['Loss only under load', 'Duplex mismatch or congestion', 'Late collisions on one side; output drops on a trunk; loss disappears when polling is paused'],
          ['Drops at a regular interval', 'A scheduled job or a device with a periodic burst', 'Timestamps match a backup, a scan, a historian job, or a device that floods multicast on a timer'],
          ['Complete loss for 10 to 60 seconds, then recovery', 'Link flap or spanning tree reconvergence', 'Switch log shows the port going down and up or a topology change at the same time'],
          ['Loss to everything behind one link', 'That link: fiber, radio, cellular, or the trunk', 'Both ends of the link show it; devices on the near side are clean'],
          ['Loss to one device only', 'Its cable, port, or the device itself', 'Every switch on the path is clean; counters on its port or none at all'],
          ['Loss across a whole VLAN', 'Loop, broadcast storm, or multicast flood', 'Switch CPU high, storm control counters, all port lights solid, IGMP snooping off'],
        ],
      },
      { t: 'h2', text: 'Measuring' },
      {
        t: 'code',
        lang: 'text',
        caption: 'Continuous ping, per-hop loss, and port counters',
        code: `REM Windows: continuous ping, then per-hop loss
ping 10.5.10.21 -t
pathping 10.5.10.21

# Linux: 1000 pings at 200 ms, then per-hop loss
ping -c 1000 -i 0.2 10.5.10.21
mtr -r -c 200 10.5.10.21

# Switch: clear, wait, read
clear counters GigabitEthernet1/0/24
show interfaces GigabitEthernet1/0/24 | include error|drops|collision`,
      },
      {
        t: 'p',
        text: 'A ping with a large payload, near 1400 bytes, finds problems that a default 32-byte ping misses: a marginal cable drops long frames first, and a path with a mismatched maximum frame size drops them entirely. Run both sizes when the default ping looks clean and the protocol still times out.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Loss versus latency on radio and cellular',
        text: 'A cellular link normally shows latency of 50 to 200 milliseconds and occasional loss of a percent or two; a licensed radio link normally shows almost none. Compare the measurement with the baseline recorded at commissioning before calling either one a fault, and set poll timeouts on those links to several times the normal round trip so a normal delay is not counted as a lost poll.',
      },
      { t: 'h2', text: 'Verification' },
      {
        t: 'ul',
        items: [
          'A one-hour continuous ping shows zero loss on wired paths, or loss within the commissioning baseline on radio and cellular paths.',
          'CRC, input error, output drop, and collision counters on every port in the path stay at zero over the same hour.',
          'The controller and SCADA communication status stays good, and the timeout counters stop incrementing.',
          'The switch logs show no link flaps or topology changes during the test.',
          'The before and after measurements and the cause are recorded with the work order.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The switch counters are all zero but ping still loses packets. Where is the loss?',
        a: 'Somewhere the counters do not see: a radio link that retries silently, a firewall that rate-limits ICMP, an unmanaged switch in the path, or the end device dropping pings under load. Ping the far side of each of those in turn, and test with the protocol rather than ping if the end device is the suspect.',
      },
      {
        q: 'How much loss is acceptable?',
        a: 'On a wired control network, none; a switched Ethernet path with good cables delivers every frame. On radio and cellular, a percent or two is normal and the protocol timeouts and retries are designed for it. Anything above the commissioning baseline on any link is a fault to find.',
      },
      {
        q: 'Ping loss started after a firmware update on the controller. What changed?',
        a: 'Probably the priority the controller gives to ICMP, or the number of connections it accepts. Check the protocol communication status first; if it is good, the loss is a measurement artifact. If the protocol also fails, the update may have changed connection limits or the default port speed and duplex.',
      },
      {
        q: 'Can a bad cable on one device cause loss on other devices?',
        a: 'On a switched network, a bad cable affects only its own port, unless the errors are severe enough to flood the switch with malformed frames or the cable is a trunk. Loss on several devices at once points at a shared link, a loop, or a storm, not at one device cable.',
      },
    ],
    related: [
      '/how-to/network-how-to/troubleshoot-ethernet',
      '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
      '/troubleshooting/communications-troubleshooting/device-times-out',
      '/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline',
      '/how-to/scada-how-to/diagnose-bad-quality',
    ],
  },
  {
    path: '/how-to/plc-how-to/build-a-sequencer',
    kind: 'howto',
    title: 'How to Build a Sequencer',
    summary:
      'Build a step sequencer in a controller that will not stick, restart into the wrong step, or leave equipment half way: define the steps from the narrative, choose a step register, and test every path before the plant depends on it.',
    answer:
      'To build a sequencer, write the sequence as a numbered list of steps from the control narrative, each with what it does and what ends it; hold the current step in one integer register; write one rung or statement per transition that advances the register when the exit condition is true and the step timer has not expired, and one that sends it to a fault step when the timer expires; drive every output from the step number, never from the transition logic; add an idle step for power-up and reset, a hold step for pauses, and an abort path from every step; and test it by walking every transition, every timeout, and every abort with the equipment simulated, then live.',
    keyPoints: [
      'One integer register holds the step; every output is a function of that register.',
      'Every step has an exit condition and a timeout; the timeout goes to a fault step.',
      'Idle, hold, and abort steps are part of the design, not afterthoughts.',
      'Transitions change the step; they never drive outputs directly.',
      'Test every path, including the ones that should never happen, before the plant relies on it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['How-To', 'PLC', 'Programming', 'Control', 'Design'],
    supplies: [
      'The control narrative with the sequence of operations',
      'The I/O list for the equipment in the sequence',
      'The programming software for the controller and a test controller or emulator',
      'A step table: number, name, action, exit condition, timeout, abort behavior',
      'A screen or a watch table to display the step and the timers',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Write the step table', text: 'From the narrative: step number, name, what the step does, what ends it, how long it may take, and what happens on abort. Step 0 is idle. Include a fault step and a hold step. Get the operator to read it.' },
          { title: 'Choose the step register', text: 'One integer, retentive if the sequence must resume after a power loss, otherwise cleared to idle on first scan. Name it for the sequence.' },
          { title: 'Write the transitions', text: 'For each step, one rung: if step equals N and the exit condition is true, set step to N plus one, or to the branch target. One more rung: if step equals N and the step timer has expired, set step to the fault step and record which step timed out.' },
          { title: 'Write the abort', text: 'One rung: if the abort condition is true and the step is not idle or fault, set step to the abort step, which shuts things down in order and then returns to idle.' },
          { title: 'Drive the outputs', text: 'For each output, a rung that energizes it when the step register equals any of the steps that need it. Outputs are never set in the transition rungs.' },
          { title: 'Add hold and resume', text: 'A hold command sets a hold flag and stores the current step; the outputs that must drop during a hold are gated by the flag; resume restores the step.' },
          { title: 'Reset the step timer', text: 'A timer that runs while the step is unchanged and resets when the register changes; its preset is the timeout for the current step from a table or a case statement.' },
          { title: 'Show it', text: 'Step number and name, time in step, the transition being waited for, and the last fault step on a screen; the sequence is debuggable only if it is visible.' },
          { title: 'Test offline', text: 'On an emulator or a test controller with inputs simulated: every transition, every timeout, every abort, hold and resume from every step, and power loss in the middle.' },
          { title: 'Test live', text: 'With the equipment, with an operator watching each step, with the timeouts real; then with each failure induced.' },
        ],
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'The pattern: transitions change the step, outputs follow the step',
        code: `// Step register: SEQ_STEP
// Step 2: open inlet valve, wait for open limit, 30 s timeout
IF SEQ_STEP = 2 AND VALVE_OPEN_LS THEN SEQ_STEP := 3; END_IF;
IF SEQ_STEP = 2 AND STEP_TIMER.Q THEN FAULT_STEP := 2; SEQ_STEP := 99; END_IF;
// Output: inlet valve open command is a function of the step
VALVE_OPEN_CMD := (SEQ_STEP = 2) OR (SEQ_STEP = 3) OR (SEQ_STEP = 4);`,
      },
      { t: 'h2', text: 'Rules' },
      {
        t: 'ul',
        items: [
          'Never write the same output from two places.',
          'A step that waits on the field has a timeout; a step that only waits on a timer is a timer step.',
          'Branches use the same pattern with different targets; loops jump back to an earlier step with a loop counter and a limit.',
          'The fault step records which step failed and holds until reset; the abort step drives outputs to their safe state in order.',
          'Power-up goes to idle unless the design says resume, and resume requires an operator confirmation.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Use the chart if you have it',
        text: 'On a platform with sequential function charts, the chart is this pattern drawn: steps, transitions, and actions. The rules are the same, and the chart is the documentation. On a platform without it, the step register is the chart in ladder.',
      },
    ],
    faqs: [
      {
        q: 'How do I handle two things that must happen at once?',
        a: 'Either put both in the same step, since a step can drive several outputs, or run two sequencers with their own step registers and a handshake step in each. Two sequencers writing the same output is the error to avoid.',
      },
      {
        q: 'The sequence sticks in a step and nobody notices.',
        a: 'The step has no timeout, or the timeout is hours. Every step waiting on the field has a timeout measured in the time the field action should take plus margin, and the fault step alarms.',
      },
      {
        q: 'Should the sequence resume after a power loss?',
        a: 'For a backwash or a clean-in-place, usually restart from a safe step with operator confirmation; for a batch with chemistry in progress, resume the held step after confirmation. The narrative decides, and the step register is retentive only if resume is chosen.',
      },
      {
        q: 'How do I test a sequence without running the equipment?',
        a: 'On an emulator or a spare controller with the inputs forced or simulated by a test routine that mimics the field responses, walking every transition. Then live with each step confirmed by an operator.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/sequencers',
      '/controls/plc-systems/programming/sequential-function-chart',
      '/controls/plc-systems/programming/state-machines',
      '/engineering-library/control-documentation/sequences-of-operation',
      '/controls/plc-systems/programming/permissives',
      '/water-wastewater/water-systems/membrane-treatment/cip',
    ],
  },
  {
    path: '/how-to/plc-how-to/diagnose-read-write-communications',
    kind: 'howto',
    title: 'How to Diagnose Read and Write Communications',
    summary:
      'Diagnose a controller that cannot read from or write to a device: capture the exact request and response, classify the failure as no link, no answer, or a rejected exchange, read the error or exception code, compare with a test tool, and fix the port.',
    answer:
      'To diagnose read and write communications, first capture what is actually being sent and what comes back, from the driver diagnostics or a protocol analyzer, then classify: no link means the port or the cable; no answer means the address, the device, or the path; an answer with an error means the message or the register map; and a write that succeeds with no effect means the device overwrote or ignored it. Read the exception or status code, which names the refusal; reproduce the same request with a test tool on a laptop and compare byte for byte; then fix the one thing the evidence points at and retest before touching anything else.',
    keyPoints: [
      'Capture the request and the response before theorizing; the bytes settle most arguments.',
      'Classify: no link, no answer, rejected exchange, or accepted with no effect.',
      'The exception or status code is the diagnosis; log it in a tag.',
      'A test tool that reproduces the controller request separates the network from the message.',
      'Change one thing, retest, and record what fixed it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'Communications', 'Modbus', 'PLC', 'Troubleshooting'],
    supplies: [
      'The driver diagnostics on the controller or SCADA, and a protocol test tool on a laptop',
      'A protocol analyzer or port mirror for Ethernet; a serial tap or a converter with diagnostic indicators for RS-485',
      'The device register map for the installed model and firmware',
      'The network schedule with addresses, ports, unit identifiers, and serial settings',
      'A meter for serial signal levels and cable continuity',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Scope the failure', text: 'Reads only, writes only, or both; one device or all on the port; constant or intermittent; since when and what changed.' },
          { title: 'Check the link', text: 'Port status on the controller and the switch, link lights, serial activity indicators. No link: cable, port settings, converter, termination. Stop here if the link is down.' },
          { title: 'Capture', text: 'Enable the driver diagnostics or mirror the port and capture one failing exchange: the request bytes and the response, or the absence of one within the timeout.' },
          { title: 'Classify', text: 'No response: address, device, path, or timeout too short. Exception response: read the code. Good response with wrong data: the map or the interpretation. Write acknowledged but ineffective: the device logic or mode.' },
          { title: 'Read the code', text: 'Modbus exceptions 01 to 06, DNP3 internal indications, EtherNet/IP general status, OPC UA status codes; each names the refusal in the protocol specification and the device manual.' },
          { title: 'Reproduce with a tool', text: 'Send the same request from a laptop tool. If the tool succeeds, compare its request with the controller request byte by byte: function code, address, count, unit identifier, data type. If the tool fails the same way, the device or the path is the problem.' },
          { title: 'Test the path', text: 'Ping and a port test for Ethernet; signal levels and termination for serial; a gateway or firewall in between examined for drops.' },
          { title: 'Fix one thing', text: 'The address, the function code, the data type, the timeout, the device mode, the firewall rule, or the cable, whichever the evidence named. Retest with the capture running.' },
          { title: 'Record', text: 'The cause and the fix in the site record, and the error code tag left in place so the next failure is logged.' },
        ],
      },
      {
        t: 'table',
        head: ['Evidence', 'Points at', 'Fix'],
        rows: [
          ['Timeout on every message', 'Address, device off, path, or a driver with the wrong port', 'Verify the address and unit identifier; ping; check the device'],
          ['Timeout on writes only', 'A firewall or gateway dropping writes, or a device that does not answer writes', 'The security policy; the device write configuration'],
          ['Exception 01', 'Function code not supported', 'Use the function the device supports'],
          ['Exception 02', 'Register not valid or not writable', 'The map and the offset convention'],
          ['Exception 03', 'Data value or count invalid', 'Data type, word count, range'],
          ['Good response, wrong values', 'Offset, table, word order, type, scale', 'Read raw registers and match to the device display'],
          ['Write acknowledged, value reverts', 'Device logic writes the register or a local mode', 'Find the owner of the register'],
          ['Intermittent timeouts', 'Marginal link, noise, timeout too short, a duplicate address, a slow device', 'Retry statistics, cable, timeout from measured response'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Log the last error',
        text: 'Move the driver error code and a timestamp into tags on every change. A communication failure at night is then a code on the screen in the morning instead of a shrug.',
      },
    ],
    faqs: [
      {
        q: 'The device works with the laptop tool and not with the controller.',
        a: 'The two requests differ. Compare function code, starting address, register count, unit identifier, and data type; the controller driver often defaults to a multiple-register write or a zero-based address that the device does not accept.',
      },
      {
        q: 'Reads work and writes return exception 02.',
        a: 'The write targets a register that is read-only, does not exist, or sits in a different table than the read. The manual names the writable registers; the write address is corrected.',
      },
      {
        q: 'Everything worked until the firewall was installed.',
        a: 'The firewall is dropping the traffic, and possibly by design. Read the firewall log, confirm with the security owner what should cross, and write the rule for that traffic only.',
      },
      {
        q: 'How do I capture serial traffic?',
        a: 'A serial tap or a converter with a monitoring port between the controller and the bus, feeding a laptop with a serial analyzer; or the driver diagnostics on the controller if it offers a byte-level view. A meter on the bus shows signal presence and levels but not content.',
      },
    ],
    related: [
      '/troubleshooting/communications-troubleshooting/read-works-but-write-fails',
      '/troubleshooting/communications-troubleshooting/wrong-register-data',
      '/troubleshooting/communications-troubleshooting/device-times-out',
      '/controls/plc-systems/plc-troubleshooting/communication-failures',
      '/how-to/plc-how-to/configure-modbus',
      '/controls/plc-systems/communications/serial-communications',
    ],
  },
  {
    path: '/how-to/plc-how-to/configure-remote-i-o',
    kind: 'howto',
    title: 'How to Configure Remote I/O',
    summary:
      'Add a remote I/O rack to a controller over Ethernet: plan the network and addresses, set the adapter, and prove every point and the failure behavior before the rack goes into service.',
    answer:
      'To configure remote I/O, give the adapter a static address on the I/O network per the network schedule and set it by its switches, its web page, or the vendor tool; add the adapter and each module to the controller I/O configuration with the exact part numbers, revisions, and slot positions; set the requested packet interval to what the process needs and the network can carry, and choose unicast where the protocol allows it; configure the switches for the protocol, including multicast handling and any ring; download, confirm the connection comes up with no faults, map every point to its tag from the I/O list, and prove each point in the field. Then test the failure behavior: pull the cable and confirm the outputs go to their configured fail state and the controller reports the fault, and reconnect to confirm recovery.',
    keyPoints: [
      'Static address from the schedule, set at the adapter; the controller configuration must match part numbers, revisions, and slots exactly.',
      'Requested packet interval from the process need, not the minimum; unicast connections where available.',
      'Switches configured for the protocol: multicast filtering with a querier, or unicast; ring settings where a ring is used.',
      'Every point mapped from the I/O list and proven in the field; every output fail state set deliberately.',
      'Test the cable-pulled case and the recovery before the rack is trusted.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'PLC', 'Networking', 'Ethernet', 'Commissioning'],
    supplies: [
      'The network schedule with the I/O network addresses',
      'The I/O list with the rack, slot, and channel for every point',
      'The programming software at the version matching the controller, and the adapter configuration tool if separate',
      'The exact part numbers and firmware revisions of the adapter and the modules',
      'Managed switch access for the protocol settings',
      'A laptop on the I/O network for pinging and web pages',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Plan the network', text: 'The I/O network is separate from the SCADA network, by a second controller port, a virtual network, or a physical switch. Addresses come from the schedule; the adapter gets a static one.' },
          { title: 'Set the adapter address', text: 'By the rotary switches, the web page, or the vendor tool, per the manual. Power cycle if the adapter requires it. Ping it from a laptop on the I/O network.' },
          { title: 'Add the adapter to the controller', text: 'In the I/O configuration, add the adapter with its exact catalog number, revision, and address, on the correct controller port or communication module. Set the electronic keying to match the installed revision or to compatible, per the plant standard.' },
          { title: 'Add the modules', text: 'Each module in its slot with its exact catalog number and revision; the configuration for each channel: range, filter, fail state, diagnostics enabled.' },
          { title: 'Set the packet interval and connection', text: 'The requested packet interval from what the process needs: tens of milliseconds for discrete control, longer for analog monitoring. Unicast where the protocol and modules allow. The sum across all racks must fit the controller and the network capacity.' },
          { title: 'Configure the switches', text: 'For multicast connections, group management with a querier on the I/O network; for rings, the ring protocol on every switch in the ring and the adapter if it participates. Port speed and duplex matched.' },
          { title: 'Download and connect', text: 'Download the configuration. The adapter and every module should show connected with no faults in the I/O tree. A fault names the mismatch: keying, slot, revision, or address.' },
          { title: 'Map the points', text: 'From the I/O list, alias each input and output tag to its rack, slot, and channel, with the description from the list. Verify the count of points against the list.' },
          { title: 'Prove the points', text: 'Each input exercised in the field and seen in the tag; each output commanded and seen in the field; each analog checked at two points with a calibrator.' },
          { title: 'Test failure and recovery', text: 'Pull the I/O network cable: the controller reports the connection fault, the outputs go to their configured fail state, the alarm arrives. Reconnect: the connection re-establishes and the outputs follow the logic. Record the times.' },
        ],
      },
      {
        t: 'table',
        head: ['Setting', 'Where', 'Typical'],
        rows: [
          ['Adapter address', 'Adapter switches or tool', 'Static, from the schedule'],
          ['Electronic keying', 'Controller I/O configuration', 'Compatible module, or exact match per the standard'],
          ['Requested packet interval', 'Controller connection settings', '20 to 100 ms discrete; 100 to 500 ms analog'],
          ['Connection type', 'Controller connection settings', 'Unicast where available'],
          ['Output fail state', 'Module configuration', 'Off, hold last, or a value; per point from the design'],
          ['Multicast handling', 'Switches', 'Group management with querier, or unicast'],
          ['Ring protocol', 'Switches and ring-capable adapters', 'Per the network drawing'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Fail state is a design decision',
        text: 'An output that holds its last state when the network drops keeps a pump running with no logic watching it; an output that drops stops the process. Each output has a fail state chosen from the process consequence, written on the I/O list, and set in the module configuration.',
      },
    ],
    faqs: [
      {
        q: 'The adapter is pingable but the controller shows a connection fault.',
        a: 'The configuration does not match the hardware: a catalog number, a revision under exact keying, a slot, or a module the adapter does not see. The fault code in the I/O tree names it.',
      },
      {
        q: 'The connection drops every few minutes after a switch change.',
        a: 'Multicast filtering without a querier: the switch prunes the group after a timeout. Enable the querier on the I/O network or use unicast connections.',
      },
      {
        q: 'How fast should the packet interval be?',
        a: 'As slow as the process allows. A lift station rack at 50 milliseconds is fine; a plant with forty racks at 10 milliseconds saturates the controller. The controller reports the packet rate against its limit.',
      },
      {
        q: 'Can I add a module to a running rack?',
        a: 'Adding to the configuration usually needs a download or an online change that the platform supports; inserting the module under power depends on the hardware. Plan it as a change with the outputs of that rack considered.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/remote-i-o',
      '/controls/plc-systems/communications/ethernet-ip',
      '/controls/plc-systems/plc-troubleshooting/network-problems',
      '/how-to/network-how-to/assign-ip-addresses',
      '/controls/control-panels/panel-components/network-switches',
      '/engineering-library/lists-schedules/io-lists',
    ],
  },
  {
    path: '/how-to/scada-how-to/build-a-tag',
    kind: 'howto',
    title: 'How to Build a Tag',
    summary:
      'Create a SCADA tag that is correct, documented, and consistent with every other tag: name it by the convention, bind it to the right controller address or name, and verify it against the live value and the I/O list before it goes on a screen.',
    answer:
      'To build a tag, take its identity from the I/O list or the controller tag database, name it by the plant convention so that the name says the site, the equipment, and the parameter, bind it to the controller tag by name or to the register address with the right data type and word order, set the engineering units and, only if the controller does not already scale it, the scaling, write a description that a stranger would understand, apply the alarm limits and the history settings from the standard for that kind of tag, and verify it: the live value against the controller, the units against the I/O list, and the alarm against a forced condition. A tag built any other way is a tag that will be wrong somewhere for years.',
    keyPoints: [
      'The tag identity comes from the I/O list or the controller database, never invented at the screen.',
      'Name by the convention: site, equipment, parameter, with the suffix for the tag kind.',
      'Bind by controller tag name where the platform allows; by address with explicit data type and word order otherwise.',
      'Scale in the controller; the SCADA tag carries units and a description, not a second scaling.',
      'Apply the alarm and history standard for the tag class, then verify against the live value.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['How-To', 'SCADA', 'HMI', 'Documentation', 'Programming'],
    supplies: [
      'The I/O list or the controller tag export for the point',
      'The plant tag naming convention and the tag class standards for alarms and history',
      'The SCADA designer or tag editor with rights to create tags',
      'A live connection to the controller for verification',
      'The screen or template the tag will be used on',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Identify the point', text: 'From the I/O list or the controller tag database: what it is, its range and units, its controller tag or address, and its data type. If it is not on the list, it goes on the list first.' },
          { title: 'Name it', text: 'By the convention: for example site, equipment, parameter, and kind, such as LS12_P1_RUN or WTP_FIT101_PV. The name must sort with its siblings and tell a reader what it is without the description.' },
          { title: 'Bind it', text: 'To the controller tag by name on platforms that browse the controller, or to the register address with the function code or table, the data type, the word order for 32-bit values, and the unit identifier. Test the bind by reading the value.' },
          { title: 'Set the type and units', text: 'Boolean, integer, or float to match the source; engineering units as a label; no scaling if the controller already provides engineering units, and the exact controller scaling if it does not.' },
          { title: 'Describe it', text: 'A description a stranger would understand: Lift station 12, pump 1 running feedback. Not the tag name repeated.' },
          { title: 'Apply the class standard', text: 'For an analog process value: alarm limits from the alarm list, deadband, delay, history at the standard interval and deadband. For a discrete status: history on change. For a setpoint: write access by role, limits, audit. The standard says which; the tag gets it.' },
          { title: 'Group it', text: 'Into the folder, area, or structure the platform uses, so that security, alarm areas, and screens find it. On platforms with user-defined types, the tag is an instance member, not a loose tag.' },
          { title: 'Verify', text: 'Live value against the controller display; units and range against the I/O list; the alarm by forcing the condition; the history by trending it. Then put it on the screen.' },
          { title: 'Record', text: 'The tag export or the change log entry, so the tag database and the I/O list stay in step.' },
        ],
      },
      {
        t: 'table',
        head: ['Field', 'Comes from', 'Common mistake'],
        rows: [
          ['Name', 'Convention', 'Invented at the screen; inconsistent with siblings'],
          ['Address or binding', 'Controller database or map', 'Wrong table, offset by one, wrong word order'],
          ['Data type', 'Controller', 'Float bound as integer; signed as unsigned'],
          ['Units', 'I/O list', 'Missing, or different from the controller'],
          ['Scaling', 'Controller, ideally none in SCADA', 'Double scaling; a percent tag displayed as engineering'],
          ['Description', 'I/O list', 'Blank or the name repeated'],
          ['Alarms', 'Alarm list and class standard', 'Limits guessed; no deadband; wrong priority'],
          ['History', 'Class standard', 'Not historized; or historized at a rate that fills the disk'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Templates and types',
        text: 'On platforms with user-defined types or templates, build the type once with every field, alarm, and history setting for a pump, a valve, or a level, and instance it. A tag built from a type is consistent by construction; a loose tag is consistent by luck.',
      },
    ],
    faqs: [
      {
        q: 'Should the SCADA tag scale the raw value?',
        a: 'No, if the controller can scale it, which it can. The controller holds the engineering value in a float; SCADA displays it. Scaling in SCADA creates a second place for the range to be wrong.',
      },
      {
        q: 'What goes in the description?',
        a: 'What the point is, where, and in what units, in words: Clearwell level, feet above floor. The description appears in alarm messages and tag browsers and is what a new operator reads.',
      },
      {
        q: 'How do I keep tag names consistent across sites?',
        a: 'A written convention, a template per equipment class, and a review of every tag export against the convention before it goes live. Naming drift is the main reason screens from two integrators look like two plants.',
      },
      {
        q: 'The value shows on the screen but is wrong.',
        a: 'Check the binding: table, offset, data type, word order, and unit identifier; then the scaling in both places. Read the raw value at the controller and compare.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/scada-architecture',
      '/engineering-library/lists-schedules/io-lists',
      '/troubleshooting/communications-troubleshooting/wrong-register-data',
      '/controls/plc-systems/analog-control/engineering-units',
      '/how-to/scada-how-to/configure-alarms',
      '/how-to/scada-how-to/configure-historian',
    ],
  },
  {
    path: '/how-to/scada-how-to/configure-alarms',
    kind: 'howto',
    title: 'How to Configure Alarms',
    summary:
      'Configure alarms in the SCADA system from the alarm list: set the source, controller-generated or evaluated in SCADA, the limits and deadband and delay, and the notification; then test each alarm end to end and review the alarm rate after the first weeks.',
    answer:
      'To configure alarms, work from the rationalized alarm list, not from the tag browser: for each alarm, decide whether the condition comes from the controller as a bit or is evaluated in SCADA against limits, set the limits, deadband, and on delay the list specifies, assign the priority and write the message so that it names the equipment, the condition, and the action, put the alarm in the area that routes it to the right operators, configure acknowledgment, shelving, and suppression per the philosophy, and connect the notification roster for the priorities that call out. Test every alarm by forcing its condition and confirming the annunciation, the message, the log, and the callout, then watch the alarm rate and the standing alarms for a month and fix what the numbers show.',
    keyPoints: [
      'The alarm list is the input; an alarm not on the list is not configured.',
      'Prefer controller-generated conditions; SCADA-evaluated limits are for values the controller does not own.',
      'Every alarm has a priority, a deadband, a delay, a message with the action, and an area.',
      'Notification follows the priority and the roster; test the callout, not just the screen.',
      'Review rates and standing alarms after go-live; the configuration is not done until the numbers are acceptable.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'SCADA', 'Alarms', 'ISA', 'HMI'],
    supplies: [
      'The rationalized alarm list with priorities, limits, deadbands, delays, and operator actions',
      'The alarm philosophy document',
      'The SCADA alarm configuration tool and the notification system',
      'The on-call roster and contact details',
      'A way to force each condition: controller simulation or field test',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Start from the list', text: 'Each row of the alarm list becomes one alarm. If the list is missing or old, rationalize first; configuring from the tag browser produces the flood you are trying to avoid.' },
          { title: 'Choose the source', text: 'A controller alarm bit for anything the controller evaluates, which is most process and equipment alarms; a SCADA-evaluated limit for values the controller does not own, such as a server disk or a communication statistic.' },
          { title: 'Set the condition', text: 'For SCADA-evaluated alarms: the limits, the deadband, and the on and off delays from the list. For controller alarms: confirm the controller block has the same values.' },
          { title: 'Set the priority', text: 'From the list, using the philosophy scale, usually three or four levels. Priority drives color, sound, ordering, and notification; it is not decoration.' },
          { title: 'Write the message', text: 'Equipment, condition, and action: Lift station 12 wet well high level; check pumps and inflow. The message is what the operator reads at three in the morning.' },
          { title: 'Assign the area', text: 'The plant area or site that routes the alarm to the operators and screens responsible for it, and the group used for filtering.' },
          { title: 'Configure behavior', text: 'Acknowledgment required or not, shelving permitted and for how long, suppression by design state, and the alarm return-to-normal handling, per the philosophy.' },
          { title: 'Connect notification', text: 'The roster and escalation for the priorities that call out, with the delay before callout and the acknowledgment method.' },
          { title: 'Test each alarm', text: 'Force the condition: the alarm appears with the right priority, message, and area; the log records it; the callout arrives; the acknowledgment clears it; the return to normal behaves. Record the test.' },
          { title: 'Review after go-live', text: 'Alarms per operator per hour, the ten most frequent, standing alarms, and chattering alarms, weekly for the first month; fix limits, deadbands, and delays, and remove alarms nobody acts on.' },
        ],
      },
      {
        t: 'table',
        head: ['Setting', 'Source', 'Note'],
        rows: [
          ['Limit', 'Alarm list', 'Engineering units; matched in the controller block'],
          ['Deadband', 'Alarm list', 'Prevents chatter at the limit'],
          ['On delay', 'Alarm list', 'Filters transients; seconds to minutes by alarm'],
          ['Priority', 'Alarm list and philosophy', 'Drives notification'],
          ['Message', 'Written per alarm', 'Equipment, condition, action'],
          ['Area', 'Plant structure', 'Routing and filtering'],
          ['Shelving', 'Philosophy', 'Time limited; logged'],
          ['Notification', 'Roster', 'By priority; escalation'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Communication loss',
        text: 'A site that drops off must produce one communication alarm, not every alarm from the site going stale. Configure the site alarms to hold or to be marked bad on communication loss, and the communication alarm itself at the priority the site deserves.',
      },
    ],
    faqs: [
      {
        q: 'Controller alarm or SCADA alarm?',
        a: 'Controller for anything about the process or equipment: it is evaluated every scan, survives a SCADA outage, and drives interlocks. SCADA for the system health items the controller cannot see. Both appear in the same alarm system.',
      },
      {
        q: 'How many priorities?',
        a: 'Three or four: urgent, high, medium, low, or similar. More than four cannot be distinguished by an operator under load.',
      },
      {
        q: 'What alarm rate is acceptable?',
        a: 'The commonly cited targets are on the order of one or two alarms per operator per ten minutes on average, and a flood is more than ten in ten minutes. Rates above that mean rationalization was skipped or the limits are wrong.',
      },
      {
        q: 'Should every alarm call out?',
        a: 'No. Urgent and high call out per the roster; medium and low wait for the screen. A pager that goes off for a door open at noon is a pager that gets ignored at midnight.',
      },
    ],
    related: [
      '/controls/scada-hmi/alarm-management/isa-18-2',
      '/controls/scada-hmi/alarm-management/rationalization',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/alarm-management/notification',
      '/controls/plc-systems/programming/alarms',
      '/how-to/plc-how-to/add-an-alarm',
    ],
  },
  {
    path: '/how-to/scada-how-to/trend-data',
    kind: 'howto',
    title: 'How to Trend Data',
    summary:
      'Build trends that operators use: choose the tags that tell one story per trend, set scales and time spans that show the behavior, and make ad hoc trending fast enough that an operator reaches for it before a phone call.',
    answer:
      'To trend data, decide what question the trend answers and put on it only the tags that answer it, usually two to four, each with its own scale unless they share units and range; set a default time span that shows the behavior, hours for a wet well, days for a tank, minutes for a loop being tuned; take the data from the historian so that the trend has history when it opens and survives a client restart; give each pen a distinct color and a label with units; add the trends that every equipment class needs to its faceplate, level with pump runs, setpoint with process variable and output, flow with pressure; and make the ad hoc trend tool a keystroke away with a tag picker, because a trend that takes two minutes to build is a trend that does not get built.',
    keyPoints: [
      'One question per trend, two to four tags, each with a scale that shows its behavior.',
      'Historian-backed trends open with history and survive restarts; live buffers do not.',
      'A time span per trend from the process time constant: minutes, hours, or days.',
      'Standard trends on every faceplate: level with runs, setpoint with process variable and output, flow with pressure.',
      'Ad hoc trending must be fast; a tag picker and a saved-trend feature decide whether operators use it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['How-To', 'SCADA', 'HMI', 'Documentation', 'Design'],
    supplies: [
      'The list of tags with history enabled and their collection settings',
      'The SCADA trend tool and its configuration for historian access',
      'The equipment faceplates or templates the standard trends attach to',
      'A style guide for pen colors, line weights, and grid density',
      'Operator input on the questions they ask most',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Define the question', text: 'Is the pump keeping up; is the loop tuned; did the level cycle overnight; what happened at 2 a.m. The question chooses the tags and the span.' },
          { title: 'Pick the tags', text: 'The value and the things that explain it: level with pump run status, process variable with setpoint and controller output, flow with discharge pressure, chlorine residual with feed rate and flow. Two to four pens.' },
          { title: 'Confirm history', text: 'Each tag is historized at an interval and deadband fine enough for the question; a level trended at one-minute samples shows a pump cycle, at ten-minute samples it shows a line.' },
          { title: 'Set the scales', text: 'Each pen with a scale appropriate to it: fixed scales for values whose normal range is known, so that an operator recognizes abnormal at a glance; shared scales only for values in the same units and range. Discrete pens as bands at the bottom.' },
          { title: 'Set the span', text: 'A default from the process: minutes for loop tuning, four to eight hours for a wet well, twenty-four hours to seven days for a tank. Easy controls to change it.' },
          { title: 'Style the pens', text: 'Distinct colors that survive the screen and the operator, consistent across the plant: setpoint always one color, process variable always another. Labels with units. Grid light.' },
          { title: 'Attach the standard trends', text: 'The equipment faceplate has a trend tab with the pens for that class prebuilt: pump, valve, analog, loop, tank. Built once in the template.' },
          { title: 'Make ad hoc trending fast', text: 'A trend tool reachable from any screen, a tag picker that searches by description, drag from a value to the trend, and saved trends per user. The measure is seconds.' },
          { title: 'Review with operators', text: 'Sit with the operators and watch which trends they open and what they wish they had; adjust.' },
        ],
      },
      {
        t: 'table',
        head: ['Trend', 'Pens', 'Span', 'What it shows'],
        rows: [
          ['Wet well', 'Level, pump 1 run, pump 2 run, inflow if computed', '8 hours', 'Cycle time, pump capacity, inflow pattern'],
          ['Control loop', 'Process variable, setpoint, output', '30 minutes', 'Tuning, oscillation, saturation'],
          ['Tank', 'Level, fill sources running, demand flow', '3 days', 'Turnover, source adequacy, leaks'],
          ['Chlorine', 'Residual, feed rate, flow', '24 hours', 'Demand changes, feed problems'],
          ['Membrane train', 'Normalized permeate flow, differential pressure, salt passage', '90 days', 'Fouling and cleaning triggers'],
          ['Communication', 'Success rate, retries, signal', '7 days', 'A failing link'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Fixed scales',
        text: 'Autoscaling makes a flat line look like a mountain range and hides a real excursion in a wide range. Fixed scales from the normal operating range, with the alarm limits drawn as lines, let an operator see abnormal without reading a number.',
      },
    ],
    faqs: [
      {
        q: 'How many pens on one trend?',
        a: 'Two to four. Beyond that the chart is unreadable and the question is not one question. Build two trends.',
      },
      {
        q: 'Live trend or historian trend?',
        a: 'Historian. A live trend starts empty and forgets when the client closes; a historian trend opens with the past and is the same on every client.',
      },
      {
        q: 'Why does my trend show a straight line where the level cycled?',
        a: 'The history collection interval or deadband is too coarse for that tag, or the trend is decimating the samples. Check the collection settings for the tag and the trend sampling mode.',
      },
      {
        q: 'Should operators be able to save their own trends?',
        a: 'Yes. A saved trend per user or per shift is how operators build the views they actually use, and the good ones become the standard trends.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/trends',
      '/controls/scada-hmi/historian-data/trending',
      '/controls/scada-hmi/historian-data/data-collection',
      '/how-to/scada-how-to/configure-historian',
      '/troubleshooting/scada-troubleshooting/trend-gaps',
      '/controls/scada-hmi/hmi-design/faceplates',
    ],
  },
  {
    path: '/how-to/scada-how-to/configure-historian',
    kind: 'howto',
    title: 'How to Configure a Historian',
    summary:
      'Set up a process historian that collects what matters and keeps it: decide the tags and their classes, set collection intervals and deadbands per class, size the storage and the retention, and hand the operators a working trend on day one.',
    answer:
      'To configure a historian, start with a tag list grouped into classes, process values, equipment status, setpoints, and compliance tags, and give each class a collection rule: an interval and a deadband for analogs, on change for discretes, every change for setpoints and compliance values; size the storage from the expected sample rate and the retention the plant needs, which for compliance data is years; enable store-and-forward buffers at every collector with enough capacity for the longest outage; point every source, collector, and server at one time source; and then test by trending each class through a known event, retrieving a value from a week ago, and pulling a collector cable to prove the buffer. Back up the configuration and the archive files on the schedule, and give the operators a trend that works before the historian is declared done.',
    keyPoints: [
      'Classes of tags with collection rules per class; not every tag at one interval.',
      'Deadbands and intervals from the process: fine enough to see a cycle, coarse enough to fit the disk.',
      'Store-and-forward at every collector, sized for the longest outage.',
      'One time source for sources, collectors, and servers.',
      'Test collection, retrieval, and the buffer; back up the configuration and the archives.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'SCADA', 'Documentation', 'Design', 'Standards'],
    supplies: [
      'The tag list with a class for each tag',
      'The historian server with storage sized and the collectors installed',
      'The retention and compliance requirements from the permits and the plant',
      'A time source reachable by every component',
      'The backup system and a place for offline copies',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Classify the tags', text: 'Process analogs, equipment status, setpoints and commands, calculated values, compliance values, and system health. Each class gets a collection rule.' },
          { title: 'Set the collection rules', text: 'Analogs: a scan interval and a deadband so that a real change is stored and noise is not; a level at ten seconds with a small deadband, a tank at one minute. Discretes: on change. Setpoints: every change with the user. Compliance: fine interval, no compression beyond a tight deadband.' },
          { title: 'Size the storage', text: 'Estimate samples per day from the rules and the tag counts, multiply by the retention, and add margin; check the vendor sizing tool. Compliance data is retained for years; everything else per the plant policy.' },
          { title: 'Configure the collectors', text: 'Each collector with its sources, its tags, and its store-and-forward buffer sized for the longest outage at the collection rate; the buffer on disk, not memory.' },
          { title: 'Set the time', text: 'Every source, collector, and server on the same network time source; store in universal time and display local; alarm on time drift.' },
          { title: 'Set retention and archives', text: 'Archive files created ahead of need, retention per class, and an archive location with space monitoring and an alarm.' },
          { title: 'Build the calculations', text: 'Totals, daily values, normalized values, and runtimes computed in the historian or the controller and stored as tags, with the formula documented.' },
          { title: 'Test collection', text: 'Trend each class through a known event: a pump cycle, a setpoint change, a discrete transition. The samples should show what happened at the resolution expected.' },
          { title: 'Test retrieval and the buffer', text: 'Retrieve a value from a week ago through the trend tool and a report; pull a collector network cable for ten minutes, restore it, and confirm the gap fills.' },
          { title: 'Back up', text: 'Configuration export and archive files on the backup schedule with an offline copy; test a restore on a spare server.' },
          { title: 'Hand over', text: 'Operators get the standard trends and a report; engineers get the tag class rules and the sizing sheet in the engineering library.' },
        ],
      },
      {
        t: 'table',
        head: ['Class', 'Rule', 'Example'],
        rows: [
          ['Fast process analog', '5 to 10 s, small deadband', 'Wet well level, discharge pressure'],
          ['Slow process analog', '30 to 60 s, moderate deadband', 'Tank level, chlorine residual'],
          ['Equipment status', 'On change', 'Pump run, valve open'],
          ['Setpoint or command', 'Every change with user', 'Level setpoints, mode selections'],
          ['Compliance value', '1 to 5 min, minimal deadband, long retention', 'Effluent flow, residual, pH'],
          ['Calculated', 'Per calculation', 'Daily totals, runtime, normalized flow'],
          ['System health', '1 to 5 min', 'Communication success, disk space'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Compression is not free',
        text: 'A wide deadband saves disk and turns a slowly changing signal into a straight line. Compliance tags and anything used for tuning get tight deadbands; the disk is cheaper than the missing data.',
      },
    ],
    faqs: [
      {
        q: 'How much history should I keep?',
        a: 'Compliance data for the period the regulator requires plus margin, often five years or more; operational data for a year or two at full resolution and longer aggregated. Disk is cheap; data you deleted is gone.',
      },
      {
        q: 'Should the historian collect from the controllers or from SCADA?',
        a: 'From the controllers directly where the historian has drivers, so that a SCADA outage does not lose history; through the SCADA server where that is the only path. Either way, buffers at the collector.',
      },
      {
        q: 'The trend shows gaps after every server reboot.',
        a: 'No store-and-forward, or a buffer that is not enabled for those tags. Enable and size the buffer, and test it by pulling the cable.',
      },
      {
        q: 'Who owns the historian?',
        a: 'Someone named: a person who checks disk space, reviews the tag classes when tags are added, tests the restore, and updates the sizing. A historian without an owner fills its disk on a holiday.',
      },
    ],
    related: [
      '/controls/scada-hmi/historian-data/historian-architecture',
      '/controls/scada-hmi/historian-data/data-collection',
      '/controls/scada-hmi/historian-data/compression',
      '/controls/scada-hmi/historian-data/long-term-storage',
      '/troubleshooting/scada-troubleshooting/duplicate-or-missing-history',
      '/cybersecurity/backups/scada-backups',
    ],
  },
  {
    path: '/how-to/scada-how-to/build-pump-graphics',
    kind: 'howto',
    title: 'How to Build Pump Graphics',
    summary:
      'Build a pump symbol and faceplate that operators can read at a glance and use without error: a symbol that shows state by shape and a muted palette with color reserved for abnormal, and a test against the high-performance HMI principles before it is deployed.',
    answer:
      'To build pump graphics, design one pump symbol and one faceplate as a template bound to the pump structure in the controller, and instance it for every pump. The symbol shows running, stopped, faulted, and not available by shape and fill on a grey palette, with color only for abnormal states, the mode as a small indicator, and the tag as a label; it opens the faceplate on click. The faceplate shows the mode with the buttons to change it, the start and stop commands with confirmation where the philosophy requires it, the run feedback, the fault with its reason and a reset, runtime and starts, the interlock and permissive status with the first reason it is not available, and the alarms for the pump, plus a trend tab. Test it against the high-performance principles: can an operator see the abnormal pump from across the room, and can a new operator start a pump correctly on the first try.',
    keyPoints: [
      'One symbol and one faceplate, built as a template on the controller pump structure, instanced everywhere.',
      'State by shape and fill on grey; color reserved for abnormal; mode as a small indicator.',
      'The faceplate has mode, commands with confirmation, feedback, fault reason and reset, runtime, permissive status, alarms, and a trend.',
      'The first reason a pump is not available is shown in words; the operator should never guess.',
      'Test with operators against the high-performance HMI principles before deploying.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'HMI', 'SCADA', 'Pumps', 'Design'],
    supplies: [
      'The controller pump structure or the tag list for one pump: command, mode, feedback, fault word, runtime, starts, permissives',
      'The plant HMI style guide: palette, symbol library, fonts',
      'The SCADA designer with template or type support',
      'The alarm list entries for the pump class',
      'An operator to test with',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Define the pump data', text: 'From the controller structure: run command, run feedback, mode (auto, hand, off, remote), fault bits with reasons, available or permissive status with the first blocking reason, runtime, starts, speed if on a drive, current if measured, alarms.' },
          { title: 'Design the symbol states', text: 'Stopped: outlined, unfilled. Running: filled in a mid grey or the plant running fill. Faulted: a colored alarm indicator beside the symbol, not a red pump. Not available: an outline with a marker. Hand or local mode: a small mode letter. Speed as a small number or bar for drive pumps.' },
          { title: 'Build the symbol', text: 'A single graphic object with the states bound to the structure members, a tag label, and a click action that opens the faceplate with the instance passed in. Keep it small enough to fit the process overview.' },
          { title: 'Build the faceplate', text: 'Header with the tag and description; mode selector with the current mode highlighted; start and stop buttons enabled only when permitted, with a confirm step per the philosophy; run feedback and speed; fault reason in words with a reset button; runtime and starts; a permissive list with the first failed item highlighted; the active alarms for this pump; a trend tab with runs, level or pressure, and speed.' },
          { title: 'Bind by instance', text: 'The template binds to the structure by a parameter, so that the faceplate for pump 3 is the same object as for pump 1 with a different instance. No per-pump copies.' },
          { title: 'Apply security', text: 'Mode and command buttons enabled by role; setpoints on the faceplate with limits; every action logged with the user.' },
          { title: 'Follow the style guide', text: 'Grey background, muted normal states, alarm colors by priority only, one font, consistent placement. The pump looks like every other pump on every screen.' },
          { title: 'Test with an operator', text: 'Ask an operator to find the faulted pump on a full screen from two meters away, to start a pump in auto, to work out why a pump is not available, and to reset a fault. Fix what confuses them.' },
          { title: 'Deploy', text: 'Replace the pump symbols on every screen with instances of the template, and retire the old ones. Update the style guide with the new template.' },
        ],
      },
      {
        t: 'table',
        head: ['State', 'Symbol', 'Faceplate'],
        rows: [
          ['Stopped, available, auto', 'Outline, no fill, small A', 'Start enabled; permissives all satisfied'],
          ['Running, auto', 'Filled, small A, speed if drive', 'Stop enabled; feedback shown; runtime counting'],
          ['Running, hand', 'Filled, small H, hand indicator', 'Hand noted; auto command shown as not in control'],
          ['Faulted', 'Outline with priority-colored alarm marker', 'Fault reason in words; reset button; alarm listed'],
          ['Not available', 'Outline with a marker', 'First failed permissive highlighted; start disabled'],
          ['Communication bad', 'Symbol greyed with a quality marker', 'Values shown as bad; commands disabled'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Words, not codes',
        text: 'A fault word decoded to Overload tripped, and a permissive list that says Discharge valve not open, are what the faceplate exists for. A pump that shows Fault 3 has sent the operator to the drawing.',
      },
    ],
    faqs: [
      {
        q: 'Should a running pump be green?',
        a: 'Not on a high-performance screen. Running is normal, and normal is grey; green and red are reserved for states that need attention. A filled symbol reads as running from across the room without color.',
      },
      {
        q: 'How do I show a pump on a drive?',
        a: 'The same symbol with a small speed value or bar, and the faceplate with the speed reference, the actual speed, and the drive fault reason. A separate drive faceplate is opened from the pump faceplate for the drive details.',
      },
      {
        q: 'Where does the hand-off-auto selector on the panel appear?',
        a: 'As the mode indicator on the symbol and the mode display on the faceplate, read from the panel selector inputs. The faceplate cannot change a physical selector; it shows that the pump is not in remote control.',
      },
      {
        q: 'One template for every pump in the utility?',
        a: 'Yes, with parameters for the differences: drive or not, feedbacks available, current measured. One template means one behavior to learn and one place to fix.',
      },
    ],
    related: [
      '/controls/scada-hmi/hmi-design/high-performance-hmi',
      '/controls/scada-hmi/hmi-design/faceplates',
      '/controls/scada-hmi/hmi-design/colors',
      '/controls/scada-hmi/hmi-design/isa-101',
      '/controls/control-panels/pump-panels/hoa',
      '/how-to/scada-how-to/build-a-tag',
    ],
  },
  {
    path: '/how-to/scada-how-to/configure-remote-access',
    kind: 'howto',
    title: 'How to Configure Remote Access',
    summary:
      'Give operators and engineers a way into the SCADA system from outside that does not give it to anyone else: a virtual private network with multi-factor authentication terminating in a demilitarized zone, and a test that proves the path works and that the.',
    answer:
      'To configure remote access, terminate a virtual private network with multi-factor authentication at a firewall in a demilitarized zone, not on the control network; put a jump host in that zone as the only destination remote users can reach, running the SCADA client and the engineering tools; give each person a named account with the least role that does the job, view-only for most; log every session with a recording where the platform supports it; enable vendor access per request for a limited time with an escort; block every other path, including cellular routers with public addresses and desktop remote tools; and test it from outside: the authorized path works, an account without the second factor fails, a session from the jump host cannot reach anything but what it should, and the audit log shows all of it. Then review the accounts quarterly and remove the ones that have left.',
    keyPoints: [
      'A virtual private network with multi-factor authentication ending in a demilitarized zone; nothing terminates on the control network.',
      'A jump host is the only reachable destination; the SCADA client and the tools run there.',
      'Named accounts with least privilege; view-only by default; control for the few who need it.',
      'Session logging and, where possible, recording; vendor access per request with an escort and an expiry.',
      'Test the path and the blocks from outside, and review accounts on a schedule.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'Cybersecurity', 'SCADA', 'Networking', 'Standards'],
    supplies: [
      'A firewall with a virtual private network and a demilitarized zone interface',
      'A multi-factor authentication service',
      'A jump host, physical or virtual, hardened and patched, with the SCADA client and engineering tools',
      'The user list with roles from the security policy',
      'A laptop and a phone outside the plant network for testing',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Draw the path', text: 'Internet to the firewall virtual private network to the demilitarized zone to the jump host to the control network by the specific protocols the jump host needs. Nothing else. The drawing is the design and the test plan.' },
          { title: 'Configure the tunnel', text: 'A virtual private network on the firewall with strong encryption, certificate or key based, terminating in the demilitarized zone interface, with multi-factor authentication required for every user.' },
          { title: 'Build the jump host', text: 'A hardened machine in the demilitarized zone with the SCADA client and the engineering software, patched, with no local administrator for users, host firewall on, and session recording if available. Users log in with their named account and their second factor.' },
          { title: 'Write the firewall rules', text: 'Remote users to the jump host only, on the remote desktop protocol only. Jump host to the SCADA server on the client protocol; jump host to the engineering workstation or the controllers on the engineering protocols only where engineers need it. Deny everything else and log the denies.' },
          { title: 'Define the roles', text: 'View-only for operators who monitor from home, control for on-call operators who must act, engineering for the few who program, and a vendor role that is disabled by default. Map each to an account group.' },
          { title: 'Create accounts', text: 'Named accounts, no shared logins, in the directory with the multi-factor enrollment; the SCADA roles tied to the same identities; a removal process tied to departures.' },
          { title: 'Set up vendor access', text: 'A vendor account enabled per request by a named plant person for a set duration, with an escort watching the session, and disabled automatically afterward; every vendor session logged.' },
          { title: 'Block the bypasses', text: 'No cellular routers with public addresses, no desktop remote tools on control machines, no port forwards on the plant router, no modems on controllers. Scan for them and remove them.' },
          { title: 'Test from outside', text: 'The authorized user reaches the jump host and the SCADA client and can do their role and no more; a user without the second factor is refused; from the jump host, a ping or connection to anything outside the rules fails; the firewall log shows the denies; the session log shows the session.' },
          { title: 'Operate it', text: 'Quarterly account review, patching of the jump host and the firewall on the schedule, log review, and an annual test of the whole path.' },
        ],
      },
      {
        t: 'table',
        head: ['Layer', 'Control', 'Proves'],
        rows: [
          ['Tunnel', 'Virtual private network with multi-factor authentication', 'Only enrolled people get in'],
          ['Landing', 'Demilitarized zone, not the control network', 'A compromised tunnel lands outside the plant'],
          ['Destination', 'Jump host only', 'One hardened machine to defend'],
          ['Protocols', 'Firewall rules per role', 'A remote user cannot reach a controller directly'],
          ['Identity', 'Named accounts, least privilege', 'Accountability and limited damage'],
          ['Visibility', 'Session and firewall logs', 'Every action attributable'],
          ['Vendors', 'Per-session enablement with escort', 'No standing back doors'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The cellular router',
        text: 'The remote access system that is bypassed by a cellular router at a lift station with a public address and a default password protects nothing. Every path into the control system goes through this design or does not exist.',
      },
    ],
    faqs: [
      {
        q: 'Can operators use the SCADA web client from home directly?',
        a: 'Through the virtual private network and the demilitarized zone, yes; exposed to the internet, no, whatever the vendor says about its security. The web client is served from the demilitarized zone or reached through the jump host.',
      },
      {
        q: 'Why a jump host instead of connecting the client straight through the tunnel?',
        a: 'A laptop at home is not a hardened machine, and the tunnel would carry whatever is on it into the control network. The jump host is one machine the plant controls, patches, and records.',
      },
      {
        q: 'What about the integrator who needs to program controllers from their office?',
        a: 'The vendor role: enabled per request for a set time, through the same tunnel and jump host, with the engineering protocols permitted from the jump host to the specific controller, and a plant person watching. Standing vendor access is a back door.',
      },
      {
        q: 'How do I know the bypasses are gone?',
        a: 'An external scan of the plant public addresses, an inventory of every cellular device and modem, and a look at every router configuration for port forwards. Then a policy and a periodic repeat.',
      },
    ],
    related: [
      '/cybersecurity/remote-access/vpn-design',
      '/cybersecurity/remote-access/jump-hosts',
      '/cybersecurity/remote-access/multi-factor-authentication',
      '/cybersecurity/remote-access/vendor-remote-access',
      '/cybersecurity/remote-access/session-logging',
      '/cybersecurity/network-segmentation/dmz-design',
    ],
  },
  {
    path: '/how-to/instrumentation-how-to/troubleshoot-a-flowmeter',
    kind: 'howto',
    title: 'How to Troubleshoot a Flowmeter',
    summary:
      'Work a flowmeter that reads wrong, reads zero, or reads with the pipe still: confirm the pipe is full and the flow is real, check the installation against the meter requirements, and compare against an independent measurement before adjusting anything.',
    answer:
      'To troubleshoot a flowmeter, first establish what is true: is the pipe full, is there flow, and what does an independent measurement say, a second meter, a tank draw-down, or a pump curve; then check the installation, straight runs, orientation, full pipe, grounding, and electrode or transducer condition, because most wrong readings are installation; read the transmitter diagnostics, which report empty pipe, coating, signal strength, and electrode faults directly; verify the signal path to the controller with a simulated output; and then apply the meter-specific checks: electrodes and grounding rings for a magnetic meter, coupling and transducer alignment for an ultrasonic, impulse lines and zero for a differential pressure meter, and the level sensor datum and flume condition for an open channel meter. Adjust the calibration only after the installation and the signal are proven and the independent comparison shows a consistent error.',
    keyPoints: [
      'Establish the truth first: full pipe, real flow, and an independent measurement.',
      'Most wrong readings are installation: straight runs, orientation, full pipe, grounding.',
      'Read the transmitter diagnostics; they report the common faults directly.',
      'Prove the signal path with a simulated output before blaming the meter.',
      'Adjust the calibration last, and only against an independent measurement.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['How-To', 'Instrumentation', 'Flow', 'Troubleshooting', 'Commissioning'],
    supplies: [
      'The meter manual with the installation requirements and diagnostic codes',
      'A loop calibrator or the transmitter simulation function',
      'A meter for loop current and a clamp meter for pulse or frequency signals',
      'An independent flow reference: a second meter, a tank draw-down, or a clamp-on ultrasonic meter',
      'The commissioning record with the meter configuration and the last verification',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Define the symptom', text: 'Reads zero with flow, reads flow with none, reads high or low by a constant or a proportion, jumps or is noisy, or totalizes wrong. Since when, and what changed.' },
          { title: 'Establish the truth', text: 'Is the pipe full: a sight glass, a tap, or the empty-pipe diagnostic. Is there flow: a pump running, a valve open, a second meter. What does an independent measurement say: a tank draw-down over ten minutes, a clamp-on meter, or the pump curve at the measured pressure.' },
          { title: 'Check the installation', text: 'Straight pipe upstream and downstream per the meter type; orientation with the electrodes horizontal on a magnetic meter; the meter below the high point so it stays full; no air entrainment; grounding rings or straps on a magnetic meter in plastic or lined pipe; transducer spacing and coupling on an ultrasonic.' },
          { title: 'Read the diagnostics', text: 'The transmitter reports empty pipe, coating, low signal, electrode fault, coil fault, and configuration; a code names the problem. Note the configuration: range, pipe size, meter factor, damping, low flow cutoff, pulse scaling.' },
          { title: 'Verify the signal path', text: 'Simulate a known output at the transmitter and confirm the controller reads it; measure the loop current or the pulse rate with a meter. A path error is fixed at the controller, not at the meter.' },
          { title: 'Apply the meter-specific checks', text: 'See the table below for magnetic, ultrasonic, differential pressure, and open channel meters.' },
          { title: 'Compare', text: 'With the installation and the signal proven, run the independent comparison at two flows; a constant offset points at a zero, a proportional error at a span, a meter factor, or the pipe size setting.' },
          { title: 'Adjust', text: 'Only what the comparison justifies: a zero with the pipe full and still, a meter factor from the calibration certificate, the pipe size from the drawings. Record as-found and as-left.' },
          { title: 'Verify and document', text: 'Repeat the comparison; update the instrument record and the controller scaling if the range changed.' },
        ],
      },
      {
        t: 'table',
        head: ['Meter', 'Common causes', 'Checks'],
        rows: [
          ['Magnetic', 'Empty or partly full pipe; coated or fouled electrodes; missing grounding rings or straps; air bubbles; a coil fault; wrong pipe size or factor entered', 'Empty-pipe diagnostic; electrode resistance; grounding continuity; clean electrodes; verify configuration against the certificate'],
          ['Ultrasonic clamp-on or inline', 'Poor transducer coupling; wrong spacing; wrong pipe data; air or solids in the fluid; a transducer moved', 'Signal strength diagnostic; re-couple and re-space; verify pipe material, wall, and liner entries'],
          ['Differential pressure', 'Blocked or partly filled impulse lines; a zero shift; a leaking equalizing valve; wrong square-root handling; wrong orifice data', 'Blow down the lines; zero with the equalizer open; check the square root is applied once; verify the flow element data'],
          ['Open channel flume or weir', 'Level sensor datum wrong; submerged flume; debris or growth in the throat; a level sensor reading foam or a wall', 'Staff gauge against the sensor; downstream level; clean the flume; check the sensor aim and dead band'],
          ['Turbine or paddlewheel', 'Rotor fouled or worn; bearing drag; wrong K-factor; pulse input missing counts', 'Spin the rotor; verify the K-factor; check the counter input rate'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not calibrate an installation problem',
        text: 'A magnetic meter reading low because the pipe is a tenth empty can be adjusted to read right today and will read wrong tomorrow when the level changes. The installation is fixed first; the calibration adjustment is the last resort and needs an independent reference.',
      },
    ],
    faqs: [
      {
        q: 'The meter reads flow when the pump is off.',
        a: 'A magnetic meter with electrode noise or a grounding problem, a differential pressure meter with a zero shift, an ultrasonic meter with a signal problem, or a check valve leaking so there is real flow. Set the low flow cutoff appropriately, then check grounding and zero.',
      },
      {
        q: 'The meter reads exactly zero with the pump running.',
        a: 'The empty-pipe detection has triggered, the signal path is open, or the transmitter has faulted. Read the diagnostic, then measure the loop current.',
      },
      {
        q: 'How do I get an independent measurement without a second meter?',
        a: 'A tank or wet well draw-down: close the inlet, run the pump for a timed interval, compute the volume from the level change and the geometry. A clamp-on ultrasonic meter is the portable alternative.',
      },
      {
        q: 'The total is wrong but the rate looks right.',
        a: 'The pulse scaling or the totalizer in the controller, not the meter: check the volume per pulse, the counter input rate, and the rollover handling.',
      },
    ],
    related: [
      '/controls/instrumentation/flow/flow-troubleshooting',
      '/controls/instrumentation/flow/flow-installation',
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/controls/instrumentation/flow/differential-pressure-flow',
      '/controls/instrumentation/flow/open-channel-flow',
      '/controls/instrumentation/signals/pulse',
    ],
  },
  {
    path: '/how-to/panel-how-to/select-surge-protection',
    kind: 'howto',
    title: 'How to Select Surge Protection',
    summary:
      'Select the surge protective devices for a control panel and its field circuits: list every conductor that enters, classify its exposure, choose the device type and ratings for the power, the loops, and write it into the drawings and the I/O list.',
    answer:
      'To select surge protection, list every conductor that enters the panel, power, loops, discrete field circuits, serial and Ethernet lines, and antenna coax, and mark which ones leave the building, run to a mast, or come from another ground, because those are the exposed ones; for the power, choose a Type 2 device at the panel entrance rated for the system voltage with a surge current rating suited to the exposure and a short-circuit current rating for the location, with a Type 1 at the service if none exists; for each exposed loop or discrete circuit, a two-stage signal protector with a working voltage above the circuit voltage and a series resistance the loop can tolerate; for data lines, a protector rated for the signal type and data rate, or fiber instead; for the antenna, a coaxial arrestor for the frequency and power; then plan one entrance with a ground bar bonded by a short conductor, check the coordination distances between stages, specify indicators or contacts for monitoring, and put every device on the drawings and the I/O list beside the point it protects.',
    keyPoints: [
      'List every entering conductor and classify its exposure; leaving the building, a mast, or another ground means protect it.',
      'Power: Type 2 at the panel entrance with the right voltage, surge current, and short-circuit current rating; Type 1 at the service.',
      'Signals: a two-stage protector per exposed circuit with a working voltage above the circuit voltage; fiber instead of copper for data between buildings.',
      'One entrance, one ground bar, a short bond; coordination distance between stages.',
      'Monitoring contacts or indicators, and the devices on the drawings and the I/O list.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'Panels', 'Power', 'Signals', 'Grounding'],
    supplies: [
      'The panel schematic and the I/O list',
      'The site plan showing what leaves the building and where the mast and other buildings are',
      'The available fault current at the panel and the system voltage',
      'Manufacturer data for the candidate devices: ratings, let-through, series resistance, dimensions',
      'The grounding design or the electrode test results for the site',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'List the conductors', text: 'Every wire and cable that enters the enclosure, from the schematic and the I/O list: supply, each loop, each discrete field circuit, each serial and Ethernet cable, each coax.' },
          { title: 'Classify exposure', text: 'High: leaves the building, runs to a mast or a pole, or runs underground between structures. Medium: within the building but on another ground or near large switching loads. Low: within the panel room. High and medium get protection.' },
          { title: 'Select the power device', text: 'Type 2 at the panel entrance: nominal voltage and configuration matching the supply, a maximum continuous operating voltage above the highest expected supply voltage, a surge current rating for the exposure, a voltage protection rating low enough for the electronics, and a short-circuit current rating at or above the available fault current or a fuse that provides it. A Type 1 at the service entrance if the building lacks one. A third stage at the 24 volt supplies for severe exposure.' },
          { title: 'Select the signal devices', text: 'For each exposed loop: a two-stage protector with a working voltage above the loop supply, usually 30 volts for a 24 volt loop, a series resistance the loop budget tolerates, and a rated surge current for the exposure; DIN rail or terminal type. For discrete circuits: a protector for the circuit voltage per pair or group. For serial: a protector for the bus type. For Ethernet: a protector rated for the data rate and power over Ethernet if used, or, better, fiber.' },
          { title: 'Select the coaxial arrestor', text: 'For the antenna: rated for the frequency band, the transmitter power, the connector type, and the coax, with a gas discharge or a quarter-wave design as the radio vendor recommends.' },
          { title: 'Plan the entrance', text: 'One location where every conductor enters, a protector rail with a ground bar behind it, and a bonding conductor to the panel ground and the site electrode system as short and straight as the layout allows, sized per the device manufacturer.' },
          { title: 'Check coordination', text: 'The conductor length between the service device and the panel device, and between the panel device and any third stage, against the manufacturer coordination distance, so the upstream stage conducts first.' },
          { title: 'Specify monitoring', text: 'Indicators on every device and monitoring contacts wired to the controller for the power devices and the critical loops; the alarm on the list.' },
          { title: 'Document', text: 'Each device on the schematic, on the panel layout at the entrance, and on the I/O list beside the point; the bonding conductor on the grounding drawing; the spares on the parts list.' },
        ],
      },
      {
        t: 'table',
        head: ['Circuit', 'Device', 'Key ratings'],
        rows: [
          ['480 or 240 volt supply', 'Type 2 at the panel; Type 1 at the service', 'Voltage and configuration, surge current, voltage protection rating, short-circuit current rating'],
          ['120 volt control', 'Type 2 or 3 on the control transformer secondary', 'Voltage, voltage protection rating'],
          ['24 volt supply output', 'Low-voltage device at the supply', 'Working voltage above 28 volts'],
          ['4 to 20 mA loop leaving the building', 'Two-stage loop protector', 'Working voltage 30 volts, series resistance, surge current'],
          ['24 volt discrete field circuit', 'Discrete circuit protector', 'Working voltage, surge current'],
          ['RS-485 leaving the building', 'Data line protector', 'Working voltage, bandwidth, both ends'],
          ['Ethernet between buildings', 'Fiber; else Ethernet protector', 'Data rate, power over Ethernet'],
          ['Antenna coax', 'Coaxial arrestor', 'Frequency, power, connectors'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Working voltage',
        text: 'A loop protector with a 24 volt working voltage on a 24 volt loop clamps the loop itself whenever the supply is a little high. Choose the working voltage above the maximum normal circuit voltage with margin, and below what the input can survive.',
      },
    ],
    faqs: [
      {
        q: 'Do I need protection on loops that stay inside the plant?',
        a: 'Usually not for lightning if the building is bonded; consider it for loops near large drives or between buildings on separate grounds. Prioritize what leaves the building.',
      },
      {
        q: 'How do I pick the surge current rating?',
        a: 'From the exposure: higher for the service entrance and for remote sites on hills or with masts, lower for downstream stages. The manufacturer application guides give ranges by location; when in doubt, choose the higher rating at the entrance.',
      },
      {
        q: 'What series resistance can a loop tolerate?',
        a: 'The loop voltage budget: supply voltage minus the transmitter minimum minus the receiver drop minus the cable drop, divided by 20 milliamps, gives the ohms available; the protector resistance must fit within it with margin.',
      },
      {
        q: 'Can one device protect several loops?',
        a: 'Multi-channel protectors exist for groups of circuits at the same voltage, and they save space; each channel is still a device with its own ratings, and a failure in one channel is found only by testing that channel.',
      },
    ],
    related: [
      '/controls/control-panels/panel-components/surge-devices',
      '/controls/control-panels/plc-panels/panel-surge-protection',
      '/controls/instrumentation/signals/surge-protection',
      '/how-to/panel-how-to/design-grounding',
      '/controls/control-panels/panel-design/sccr',
      '/troubleshooting/radio-troubleshooting/remote-site-stops-communicating',
    ],
  },
  {
    path: '/how-to/panel-how-to/size-an-enclosure',
    kind: 'howto',
    title: 'How to Size an Enclosure',
    summary:
      'Size a control panel enclosure so that everything fits, cools, and can be worked on: lay out the components with their clearances and wireway, add the spare space the plant will need, and mounting before ordering.',
    answer:
      'To size an enclosure, start from the component list with the dimensions and clearances of every device, arrange them on a layout with power at the top or one side, control below, terminals at the bottom or the side where the field conduits arrive, and wireway between every row and column sized for its fill; add a quarter to a third of the area as spare, because the panel will grow; compute the heat load from the losses of every component and the solar and ambient conditions, and check that the enclosure surface can shed it within the allowed internal temperature, adding a fan, a heat exchanger, or an air conditioner where it cannot; choose the enclosure type for the environment, indoor, outdoor, washdown, or corrosive; then round up to the next standard size in height and width, check the depth against the deepest component plus the wireway and door devices, check the door swing and the mounting, and confirm the whole against the listing requirements for spacing.',
    keyPoints: [
      'Lay out every component with its clearances and the wireway before choosing a size.',
      'Add a quarter to a third spare area; a full panel on day one is a rebuild in year three.',
      'Compute the heat load and check the surface area; add cooling where the rise is too high.',
      'Choose the type rating for the location; round up to a standard size.',
      'Check depth, door swing, mounting, and listing spacing before ordering.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'Panels', 'Design', 'UL 508A', 'Power'],
    supplies: [
      'The component list with dimensions, clearances, and heat losses from the data sheets',
      'The panel layout drawing template',
      'The enclosure manufacturer catalog with standard sizes and thermal data',
      'The site conditions: ambient temperature range, sun exposure, indoor or outdoor, corrosive or washdown',
      'An enclosure heat load calculator or the manufacturer thermal software',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'List the components', text: 'Every device with its width, height, depth, mounting, required clearances from the data sheet and the listing standard, and its heat loss in watts.' },
          { title: 'Arrange the layout', text: 'Power section at the top or on one side, with the disconnect at the door handle height; drives and transformers where their heat rises away from electronics; the controller and I/O in the middle; terminals at the bottom or the side where conduits enter; the network and telemetry devices near the controller; wireway between every row and column.' },
          { title: 'Size the wireway', text: 'From the conductor count and size for each duct at half fill with growth; the duct dimensions become part of the layout.' },
          { title: 'Add spare', text: 'A quarter to a third of the mounting area empty, with wireway and terminals to use it; a spare rack slot; spare terminals.' },
          { title: 'Compute the heat load', text: 'Sum the component losses; add solar gain for an outdoor enclosure in the sun; take the maximum ambient. Compute the internal temperature rise for the enclosure surface area and material using the manufacturer method, and compare with the lowest component rating, often 40 to 50 degrees Celsius.' },
          { title: 'Decide the cooling', text: 'If the rise is acceptable, a sealed enclosure. If not: a filtered fan for clean indoor air, a heat exchanger for dirty or outdoor air, or an air conditioner for a hot location or a large load. A heater for condensation in cold or humid locations.' },
          { title: 'Choose the type', text: 'Type 12 indoors; Type 4 outdoors or washdown; Type 4X for corrosive or chemical rooms; Type 3R for outdoor with only rain protection; per the code and the site. Material accordingly: painted steel, stainless, or non-metallic.' },
          { title: 'Pick the size', text: 'The layout height and width rounded up to the next standard size, keeping the spare. Depth from the deepest component plus the wireway height plus the door-mounted devices, plus clearance.' },
          { title: 'Check the details', text: 'Door swing at the installation location; working space in front; conduit entry locations against the terminals; mounting, wall or free-standing or a leg kit; lifting; the sub-panel size for the mounting.' },
          { title: 'Check the listing', text: 'Spacings between live parts and the enclosure, between power and control, and around the disconnect, per the panel standard; the enclosure listed for the type.' },
        ],
      },
      {
        t: 'formula',
        expr: 'ΔT = P ÷ (k × A)',
        where: [
          'ΔT = internal temperature rise above ambient, °C',
          'P = total heat dissipated inside the enclosure, W',
          'A = effective enclosure surface area, m², per the manufacturer method for the mounting',
          'k = heat transfer coefficient, roughly 5.5 W/m²·°C for painted steel in still air; use the manufacturer value',
        ],
      },
      {
        t: 'table',
        head: ['Location', 'Type', 'Cooling usually needed'],
        rows: [
          ['Indoor control room', 'Type 12', 'Sealed or a filtered fan'],
          ['Indoor process area, wet', 'Type 4 or 4X', 'Sealed or a heat exchanger'],
          ['Outdoor, shaded', 'Type 4 or 3R', 'Heat exchanger; heater in winter'],
          ['Outdoor, in the sun', 'Type 4 with a sun shield', 'Air conditioner for drives; heater in winter'],
          ['Chemical room', 'Type 4X non-metallic or stainless', 'Sealed with a heat exchanger'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Drives change everything',
        text: 'A drive dissipates a few percent of its rating as heat, and a panel with three drives in the sun cannot be sealed. Put the drive losses in the calculation first; they usually decide the cooling and often the enclosure size.',
      },
    ],
    faqs: [
      {
        q: 'How much spare space?',
        a: 'A quarter to a third of the mounting area on a plant panel, more on a panel for a process that will change. Spare space costs a few inches of steel; a second enclosure costs a project.',
      },
      {
        q: 'Can I mount components on the door?',
        a: 'Operator devices, displays, and light devices, with the door bonded and the depth accounted for. Not heavy devices, and nothing that puts live parts within reach when the door opens without a dead front.',
      },
      {
        q: 'Fan or air conditioner?',
        a: 'A filtered fan where the ambient air is cool, clean, and dry enough to cool the panel; an air conditioner where it is not or where the load is large; a heat exchanger between. The heat calculation and the site conditions decide, and a fan in a dusty room is a filter maintenance program.',
      },
      {
        q: 'Why is the panel hotter than the calculation said?',
        a: 'A component loss underestimated, usually a drive or a power supply at load; a sun exposure not counted; a filter clogged; or a component mounted in the hot zone above a transformer. Measure the temperature at the top and the drive losses at load.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/enclosure-selection',
      '/controls/control-panels/panel-design/heat-calculations',
      '/controls/control-panels/panel-design/component-layout',
      '/controls/control-panels/panel-design/wireways',
      '/controls/control-panels/panel-design/ul-508a',
      '/troubleshooting/control-panel-troubleshooting/panel-overheating',
    ],
  },
  {
    path: '/how-to/panel-how-to/build-terminal-schedules',
    kind: 'howto',
    title: 'How to Build Terminal Schedules',
    summary:
      'Produce the terminal schedule that lets a technician find any wire: define the strips and their numbering, list every terminal with its wire numbers, the device and the field destination, and keep it current through every change.',
    answer:
      'To build a terminal schedule, define the terminal strips of the panel by voltage class and function with a designation and a numbering scheme, then list every terminal on every strip with the wire number on the panel side, the wire or cable and conductor on the field side, the device each connects to, and the field destination with its drawing reference; generate the list from the schematic with the drafting tool or a spreadsheet driven by the wire numbers, so that the schedule and the drawing cannot disagree; mark the spares; check it against the built panel terminal by terminal and against the field cables at pull-in; and put it in the panel pocket and the engineering library with a revision, updating it as part of every change rather than afterward.',
    keyPoints: [
      'Strips by voltage class and function, each with a designation and a numbering scheme fixed for the plant.',
      'Every terminal: panel wire number, field cable and conductor, device, destination, drawing reference.',
      'Generate from the schematic; a schedule typed by hand diverges from the drawing on the first change.',
      'Reconcile at panel checkout and at cable pull-in; mark spares explicitly.',
      'Revision controlled, in the panel pocket and the library, updated with every change.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['How-To', 'Panels', 'Documentation', 'Design', 'Commissioning'],
    supplies: [
      'The panel schematic with wire numbers and terminal designations',
      'The cable schedule and the I/O list',
      'The drafting tool report function, or a spreadsheet template with the schedule columns',
      'The plant numbering convention for strips, terminals, and wires',
      'Terminal markers and a label printer for the panel',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Define the strips', text: 'One per voltage class and function: power distribution, 120 volt control, 24 volt discrete inputs, 24 volt discrete outputs, analog, network, intrinsically safe, and grounds. Designate each, for example TB1 to TB8 or by function, per the plant convention.' },
          { title: 'Set the numbering', text: 'Terminals numbered sequentially within each strip; multi-level terminals with a level suffix; wire numbers by the plant convention, such as sheet and line, so that a wire number locates the schematic.' },
          { title: 'Assign the field connections', text: 'From the I/O list and the cable schedule: each field point lands on a pair or a group of terminals on the strip for its class, grouped by cable so that a cable lands on adjacent terminals, with shield terminals beside the analog pairs.' },
          { title: 'Draw it', text: 'On the schematic, every field connection shows the strip and terminal; the wire numbers on both sides. The drawing is the source.' },
          { title: 'Generate the schedule', text: 'The drafting tool report or a spreadsheet built from the wire list: strip, terminal, panel wire number, panel device and terminal, field cable and conductor, field device, destination drawing. Sort by strip and terminal.' },
          { title: 'Mark spares', text: 'Every unused terminal listed as SPARE; spare cable conductors listed against their cable and marked spare at both ends.' },
          { title: 'Check the panel', text: 'At panel checkout, walk every strip with the schedule: the marker, the wire number, and the destination match; corrections go back to the schematic first, then the schedule is regenerated.' },
          { title: 'Check the field', text: 'At cable pull-in and termination, each conductor landed per the schedule, and the schedule corrected for any field change with the reason.' },
          { title: 'Issue it', text: 'A revision number and date; a copy in the panel pocket, one in the engineering library with the schematic, and one with the commissioning records.' },
          { title: 'Maintain it', text: 'Every change to the panel starts with the schematic and ends with a regenerated schedule and a new pocket copy. A schedule that is not updated is a trap.' },
        ],
      },
      {
        t: 'table',
        head: ['Column', 'Content', 'Example'],
        rows: [
          ['Strip', 'Terminal strip designation', 'TB3 (24 VDC inputs)'],
          ['Terminal', 'Number and level', '14, 14L (lower level)'],
          ['Panel wire', 'Wire number on the panel side', '1234'],
          ['Panel device', 'Device and terminal it connects to', 'DI-1 slot 2 ch 6'],
          ['Field cable', 'Cable number and conductor', 'C-120 / 3 (black)'],
          ['Field device', 'Tag', 'LSH-101'],
          ['Destination', 'Location and drawing', 'Wet well JB-1, sheet E-12'],
          ['Notes', 'Shield, spare, fused, disconnect', 'Shield to SH bar'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Adjacent terminals per cable',
        text: 'A multi-conductor cable landed on scattered terminals is a pull-in nightmare and a troubleshooting one. Assign the terminals so that each cable lands on a contiguous block, spares included, and the schedule reads like the cable does.',
      },
    ],
    faqs: [
      {
        q: 'Spreadsheet or drafting tool report?',
        a: 'The drafting tool report where the schematic is drawn in a tool that tracks wires; it cannot disagree with the drawing. A spreadsheet driven from the wire list otherwise, with a discipline that the drawing changes first.',
      },
      {
        q: 'How do I number terminals on a multi-level block?',
        a: 'One number per position with a level suffix, upper, middle, lower, or U, M, L, and the schematic drawn to show the levels. A three-level strip drawn as flat terminals is where wiring errors come from.',
      },
      {
        q: 'What about junction boxes in the field?',
        a: 'Each junction box has its own schedule on the same pattern, with its cable in and cables out, and the panel schedule references the box and its terminal. The chain from panel to device is traceable through the schedules.',
      },
      {
        q: 'The panel shop wired it differently from the schedule.',
        a: 'Find out why; sometimes the layout forced it. Then the schematic is corrected to what was built, the schedule regenerated, and the panel re-marked if needed. Never two documents that disagree.',
      },
    ],
    related: [
      '/controls/control-panels/panel-design/terminals',
      '/controls/control-panels/panel-components/terminal-blocks',
      '/engineering-library/lists-schedules/cable-schedules',
      '/engineering-library/lists-schedules/io-lists',
      '/engineering-library/drawings/schematics',
      '/engineering-library/drawings/wiring-diagrams',
    ],
  },
  {
    path: '/how-to/panel-how-to/design-grounding',
    kind: 'howto',
    title: 'How to Design Panel Grounding',
    summary:
      'Design the grounding and bonding of a control panel and its site so that faults clear, signals are clean, and surges have a path: bond the enclosure and everything in it, and verify with measurements before the panel is energized.',
    answer:
      'To design panel grounding, start with the safety ground: the enclosure, the sub-panel, the doors with devices, and every metal part bonded together and to the equipment grounding conductor of the supply, with a ground bar for the field equipment grounding conductors; then add the reference grounds: an instrument ground bar for the 24 volt common and the shield drains, bonded to the enclosure ground at one point by a short conductor so that it is at ground potential without carrying fault or noise current, and a surge entrance bar bonded to the same point and to the site electrode system by the shortest path; make sure the site electrodes, the service ground, the mast ground, and the panel ground are all bonded together so that no two grounds at the site can be at different potentials; draw all of it on a grounding diagram with conductor sizes and the single bond points; and verify at commissioning with bond resistance and electrode resistance measurements, recorded.',
    keyPoints: [
      'Safety first: everything metal bonded and the equipment grounding conductors on a bar bonded to the supply ground.',
      'Reference grounds, the instrument bar and the shield bar, bonded to the safety ground at one point by a short conductor.',
      'The surge entrance bar bonded to the same point and to the site electrodes by the shortest path.',
      'All site electrodes bonded together: service, panel, mast, and any rods; no isolated grounds.',
      'A grounding diagram with sizes and bond points, verified by measurement at commissioning.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'Grounding', 'Panels', 'NEC', 'Signals'],
    supplies: [
      'The panel schematic and layout, and the site electrical one-line',
      'The electrical code articles on grounding and bonding, and the panel listing standard requirements',
      'The surge device manufacturer bonding requirements',
      'Ground bars, bonding jumpers, and lugs sized per the code',
      'A ground resistance tester and a low-resistance ohmmeter for verification',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Bond the enclosure', text: 'The enclosure body, the sub-panel, and each door carrying devices bonded together with bonding jumpers or straps, through paint-cutting hardware, and the enclosure bonded to the equipment grounding conductor of the supply at a lug sized per the code.' },
          { title: 'Provide the equipment ground bar', text: 'A bar bonded to the enclosure, with a terminal for every outgoing circuit equipment grounding conductor, sized for the largest conductor, near the power terminals.' },
          { title: 'Ground the control transformer secondary', text: 'One side of the 120 volt control circuit bonded to the enclosure at the transformer, per the design, so that a ground fault on the control circuit clears a fuse.' },
          { title: 'Ground the 24 volt common', text: 'The negative of the 24 volt supply bonded to the instrument ground bar; one bond per isolated supply; the bar bonded to the enclosure ground at one point with a short conductor.' },
          { title: 'Provide the instrument and shield bar', text: 'A bar, insulated from the enclosure and bonded to it at the single point, with terminals for the shield drains of every analog and communication cable, grounded at the panel end only.' },
          { title: 'Provide the surge entrance bar', text: 'At the conductor entrance, a bar the surge devices land on, bonded to the enclosure ground and to the site electrode system by the shortest, straightest conductor the layout permits, sized per the device manufacturer.' },
          { title: 'Bond the site', text: 'The service ground, the panel ground, the radio mast ground, any ground rods, and the building steel bonded together so that the site has one ground system. A separate rod for the radio is bonded to the rest; an isolated ground is prohibited.' },
          { title: 'Handle special cases', text: 'Intrinsically safe Zener barriers with their dedicated ground per the control drawing; drives with the motor cable shield bonded at both ends per the drive manual and the drive chassis bonded; isolated instrument grounds only where a design requires them, still bonded.' },
          { title: 'Draw it', text: 'A grounding diagram showing every bar, every bond, the single points, the conductor sizes, and the site electrodes; the drawing in the panel set.' },
          { title: 'Verify', text: 'At commissioning: bond resistance from the enclosure and each bar to the supply ground in the milliohm range with a low-resistance ohmmeter; site electrode resistance with a ground tester and the value recorded; no voltage between the instrument bar and the enclosure with the plant running; every shield grounded at one end only.' },
        ],
      },
      {
        t: 'table',
        head: ['Ground', 'Purpose', 'Bonded to', 'Rule'],
        rows: [
          ['Enclosure and equipment ground bar', 'Safety; fault clearing', 'Supply equipment grounding conductor', 'Everything metal; sized per the code'],
          ['Control circuit ground', 'Fault clearing on 120 volt control', 'Enclosure at the transformer', 'One side of the secondary'],
          ['Instrument ground bar', 'Reference for 24 volt common and shields', 'Enclosure at one point', 'Single bond; no fault current'],
          ['Shield bar', 'Shield drains', 'Instrument bar', 'Shields grounded at the panel end only'],
          ['Surge entrance bar', 'Surge current path', 'Enclosure ground and site electrodes', 'Shortest path; sized per the device'],
          ['Site electrode system', 'Earth reference and lightning', 'Service, panel, mast, rods, steel', 'All bonded together'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'One ground system',
        text: 'Two grounds at a site that are not bonded together will be at different potentials during a fault or a strike, and the difference appears across the equipment connected to both. The instrument ground is a reference bonded to the safety ground, not a separate earth.',
      },
    ],
    faqs: [
      {
        q: 'Should the instrument ground have its own rod?',
        a: 'No. A separate rod that is not bonded to the rest is an isolated ground and a hazard; the instrument ground is a bar bonded to the enclosure ground at one point. If a rod is installed for the instrument bar, it is bonded to the site electrode system too.',
      },
      {
        q: 'Where do the cable shields go?',
        a: 'On the shield bar at the panel end, with the field end insulated. A shield grounded at both ends carries ground loop current and noise into the signal.',
      },
      {
        q: 'How low should the electrode resistance be?',
        a: 'As low as the site allows, with the code and the surge device requirements as the reference; more important is that every electrode at the site is bonded together. Record the measured value and retest periodically.',
      },
      {
        q: 'The drive manual says bond the motor cable shield at both ends. Does that contradict the shield rule?',
        a: 'No. The drive output cable shield is a power circuit shield carrying high-frequency current back to the drive and is bonded at both ends per the drive manual. Signal shields are grounded at one end. Different circuits, different rules.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/ground-loops',
      '/troubleshooting/grounding-troubleshooting/missing-equipment-ground',
      '/troubleshooting/grounding-troubleshooting/shield-grounded-at-both-ends',
      '/controls/control-panels/plc-panels/panel-surge-protection',
      '/controls/control-panels/panel-design/nfpa-70',
      '/how-to/instrumentation-how-to/diagnose-ground-loops',
    ],
  },
  {
    path: '/how-to/network-how-to/test-fiber',
    kind: 'howto',
    title: 'How to Test Fiber',
    summary:
      'Test a fiber link at acceptance and at fault: inspect and clean every connector, measure end-to-end loss with a light source and power meter in both directions and at the operating wavelengths, and record everything with the fiber schedule.',
    answer:
      'To test fiber, inspect every connector end face with a scope and clean it until it is clean; set a reference on a light source and power meter through the launch cords; measure the loss of every strand in both directions at the wavelengths the link uses, and compare each with the budget computed from the fiber length, the connector count, and the splice count, with the margin the design requires; run an optical time domain reflectometer trace on each strand from each end with launch and receive cords so that the first and last connectors are visible, and read each event for its loss and reflection; then, with the transceivers installed, read their transmit and receive power and confirm the receive power sits within the module range with margin. Record the loss, the traces, and the power readings in the fiber schedule; they are the baseline every future fault is compared with.',
    keyPoints: [
      'Inspect and clean every connector before every mating and every test.',
      'Light source and power meter loss in both directions at the operating wavelengths, against the calculated budget.',
      'Reflectometer traces from both ends with launch and receive cords, each event read.',
      'Transceiver receive power within the module range with margin.',
      'Record the results in the fiber schedule as the baseline.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['How-To', 'Networking', 'Ethernet', 'Commissioning', 'Communications'],
    supplies: [
      'A fiber inspection scope and a cleaning kit: one-click cleaner, wipes, solvent, port cleaners',
      'A light source and optical power meter pair for the fiber type and wavelengths',
      'An optical time domain reflectometer with launch and receive cords of the same fiber type',
      'Reference-grade test cords matching the connector type and polish',
      'The fiber schedule with the strand count, lengths, connector and splice counts, and the loss budget',
      'Dust caps for every port and cord',
    ],
    blocks: [
      { t: 'h2', text: 'Procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Prepare', text: 'Confirm the fiber type, the connector type and polish, and the wavelengths from the schedule; confirm the test cords match; power off or disconnect transceivers on the link so the fiber is dark. Never look into a fiber.' },
          { title: 'Inspect and clean', text: 'Every connector in the link and on the test cords under the scope; dry clean, inspect, wet-then-dry clean if needed, inspect again. Cap everything not in use.' },
          { title: 'Set the reference', text: 'Connect the light source to the power meter through the launch cord, or the one-cord or two-cord reference method the standard specifies for the connector type, and zero the meter at each wavelength.' },
          { title: 'Measure loss', text: 'For each strand: source at one end, meter at the other, through the link, at each wavelength; record. Repeat from the other end. The two directions should agree within a few tenths of a decibel.' },
          { title: 'Compare with the budget', text: 'Expected loss equals fiber attenuation times length plus connector pairs times the allowance plus splices times the allowance. Measured loss within the budget passes; a strand above it has an event to find.' },
          { title: 'Run the reflectometer', text: 'From each end of each strand, with the launch cord before the first connector and the receive cord after the last, at each wavelength; set the range and pulse width for the link length. Save the traces.' },
          { title: 'Read the events', text: 'Each connector shows as a reflective event with a loss step; each fusion splice as a small step; a bend as a step without reflection; the end as a reflection. Any event with loss above its allowance is located and fixed, and the strand retested.' },
          { title: 'Check the transceivers', text: 'Install the modules, connect, and read transmit and receive power at both ends from the switch diagnostics. Receive power should sit within the module range with at least three decibels above sensitivity and below the overload level.' },
          { title: 'Record', text: 'Loss per strand per direction per wavelength, the traces, the transceiver readings, the connector inspection results, and the date, in the fiber schedule and the commissioning record.' },
          { title: 'At a fault', text: 'Repeat the loss and trace measurements and compare with the baseline; the event that changed is the fault.' },
        ],
      },
      {
        t: 'formula',
        expr: 'Budget (dB) = (α × L) + (n_c × 0.75) + (n_s × 0.3) + margin',
        where: [
          'α = fiber attenuation per kilometer at the wavelength; L = length in kilometers',
          'n_c = mated connector pairs; 0.75 dB is a common allowance, 0.5 with good connectors',
          'n_s = splices; 0.3 dB is a common allowance, 0.1 for good fusion splices',
          'margin = the design margin, typically 3 dB, for aging and repairs',
        ],
      },
      {
        t: 'table',
        head: ['Result', 'Meaning', 'Action'],
        rows: [
          ['Loss within budget both directions', 'Link healthy', 'Record as baseline'],
          ['Loss high, one direction', 'A connector or splice on that strand', 'Trace; find the event'],
          ['Loss high, both directions', 'Wrong fiber type, too many connectors, or a bad event', 'Trace; check the cord types'],
          ['Trace shows a large reflective event', 'A dirty, damaged, or mismatched connector', 'Inspect, clean, replace'],
          ['Trace shows a non-reflective step', 'A splice or a bend', 'Resplice or relieve the bend'],
          ['Receive power above the overload level', 'Link too short for the module', 'Fixed attenuator'],
          ['Receive power near sensitivity', 'No margin', 'Find the loss or fit a longer-reach module'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Launch and receive cords',
        text: 'Without a launch cord the reflectometer cannot see the first connector; without a receive cord it cannot see the last. Those two connectors are the most likely to be dirty, and a trace made without the cords misses them.',
      },
    ],
    faqs: [
      {
        q: 'Light source and power meter, or reflectometer, or both?',
        a: 'Both at acceptance: the light source and meter gives the accurate total loss, the reflectometer shows where the loss is and gives the baseline trace. At a fault the reflectometer finds the event; the meter confirms the repair.',
      },
      {
        q: 'Which wavelengths?',
        a: 'The ones the transceivers use, and both windows the fiber supports: 1310 and 1550 nanometers for single-mode, 850 and 1300 for multimode. A bend shows more at the longer wavelength.',
      },
      {
        q: 'The loss is fine but the link still errors.',
        a: 'Receive power above the overload level on a short link, a mismatched transceiver pair, or a reflective event close to the transmitter raising its noise. Read the transceiver diagnostics and check for a fixed attenuator need.',
      },
      {
        q: 'Can I test with the transceivers only?',
        a: 'The transceiver power readings are a useful check and the fastest troubleshooting step, but they do not give per-strand loss or event location, and their accuracy is a decibel or two. Acceptance testing uses the instruments.',
      },
    ],
    related: [
      '/troubleshooting/fiber-troubleshooting/high-optical-loss',
      '/troubleshooting/fiber-troubleshooting/dirty-or-damaged-connector',
      '/troubleshooting/fiber-troubleshooting/fiber-link-down',
      '/troubleshooting/fiber-troubleshooting/wrong-fiber-type-or-wavelength',
      '/engineering-library/lists-schedules/fiber-schedules',
      '/engineering-library/checklists/commissioning',
    ],
  },
];
