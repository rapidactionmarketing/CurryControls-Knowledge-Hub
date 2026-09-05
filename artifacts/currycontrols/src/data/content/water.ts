import type { Entry } from '../content-types';

export const WATER_ENTRIES: Entry[] = [
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
    kind: 'reference',
    title: 'Duplex Lift Station Controls',
    summary:
      'The two-pump station that makes up most of a collection system: what is in the panel, how the sequence works, what is monitored, and where these stations actually fail.',
    answer:
      'A duplex lift station uses two pumps in a wet well to move wastewater to a higher elevation or into a force main. Controls start the lead pump at a set level, add the lag pump if inflow exceeds one pump, stop both at a lower level, and alternate the lead role to share wear. A separate high-level float provides an alarm path independent of the level transmitter.',
    keyPoints: [
      'Two pumps, one wet well, level-based start and stop with alternation.',
      'A level transmitter provides control; an independent float provides backup alarm and start.',
      'Failure detection must remove a bad pump from rotation, not just raise an alarm.',
      'SCADA at a remote station is for visibility and history; the panel must run without it.',
      'Most failures are wet well level measurement, power, and communication, in that order.',
    ],
    published: '2026-05-19',
    updated: '2026-08-27',
    readingTime: 11,
    tags: ['Wastewater', 'Lift Stations', 'Pumps', 'Control'],
    blocks: [
      { t: 'h2', text: 'What the station is' },
      {
        t: 'p',
        text: 'Wastewater flows by gravity until the topography stops cooperating. At that point it collects in a wet well and gets pumped up to a higher gravity line or into a pressurized force main. A duplex station has two pumps, each sized to handle peak flow alone, so the station keeps working when one is out of service.',
      },
      {
        t: 'p',
        text: 'A mid-size utility may own dozens or hundreds of these. They are unattended, often in residential neighborhoods, and their failure mode is a sanitary sewer overflow with regulatory consequences. That combination is why lift station controls receive attention disproportionate to their apparent simplicity.',
      },
      { t: 'h2', text: 'What is in the panel' },
      {
        t: 'dl',
        items: [
          { term: 'Main disconnect and branch protection', def: 'Service disconnect, pump branch circuits, and control power.' },
          { term: 'Pump starters or drives', def: 'Across-the-line starters, soft starters, or variable frequency drives, with motor overload protection.' },
          { term: 'Controller', def: 'A small PLC or RTU running the sequence, or a dedicated pump controller at simpler stations.' },
          { term: 'Level input', def: 'A transmitter, usually radar or submersible pressure, providing continuous wet well level.' },
          { term: 'Backup floats', def: 'At minimum a high level float. Many stations also carry a redundant-off float and a lag-start float, hardwired so the station pumps even if the transmitter and PLC are both gone.' },
          { term: 'Seal and thermal monitoring', def: 'Seal failure and motor thermal inputs from each pump.' },
          { term: 'Phase and voltage monitoring', def: 'Detects phase loss, phase reversal, and undervoltage before a motor is damaged.' },
          { term: 'Communications', def: 'Radio, cellular, or fiber to SCADA, with an antenna and surge protection.' },
          { term: 'Intrusion and site inputs', def: 'Door switch, and at many stations generator status and transfer switch position.' },
          { term: 'Surge protection', def: 'On incoming power, on the antenna lead, and on signal circuits leaving the panel.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'The wet well is a confined space',
        text: 'Entry requires a permit, atmospheric testing, ventilation, and a trained attendant. Hydrogen sulfide is heavier than air, accumulates at the bottom, and rapidly deadens the sense of smell, so its absence is not evidence of safety. Design the controls so routine work does not require entry.',
      },
      { t: 'h2', text: 'The control sequence' },
      {
        t: 'steps',
        items: [
          { title: 'Level rises to lead start', text: 'The controller starts the pump currently designated lead. Minimum off time must have elapsed. Permissives are checked: pump in auto, no fault, phase monitor healthy.' },
          { title: 'Level continues rising to lag start', text: 'Inflow exceeds one pump. The lag pump starts, offset by a few seconds so the service does not see two inrush events together.' },
          { title: 'Level falls to all stop', text: 'Both pumps stop, subject to minimum run time. Alternation advances so the other pump leads the next cycle.' },
          { title: 'Low level cutoff', text: 'If level reaches the dry-run point, all pumps stop immediately regardless of any other condition and an alarm is raised.' },
          { title: 'High level', text: 'Alarm and notification. The independent float should be able to start pumps on its own path if the transmitter or the controller has failed.' },
        ],
      },
      { t: 'h2', text: 'Setting the levels' },
      {
        t: 'p',
        text: 'The setpoints are not arbitrary and the constraints pull in opposite directions.',
      },
      {
        t: 'table',
        head: ['Constraint', 'Pushes toward', 'Because'],
        rows: [
          ['Motor starts per hour limit', 'A wider level band', 'Longer runs, fewer starts'],
          ['Wet well detention time', 'A narrower band', 'Long detention turns the well septic and generates hydrogen sulfide'],
          ['Available wet well depth', 'A narrower band', 'Physical limits between the inlet invert and the pump suction'],
          ['Force main velocity', 'Longer runs', 'A run must be long enough to scour the force main'],
          ['Upstream gravity line', 'A lower high level', 'Backing water into the collection system is not acceptable'],
        ],
      },
      {
        t: 'p',
        text: 'The usual resolution is the widest band the physical well and the upstream system allow, checked against minimum run time at the lowest expected inflow and against detention time at that same low flow. A station that cycles every four minutes at 2 a.m. has a band that is too narrow, and its pumps will not reach their expected life.',
      },
      { t: 'h2', text: 'What to monitor and send to SCADA' },
      {
        t: 'ul',
        items: [
          'Wet well level, as a continuous value, trended.',
          'Pump run status, individually, from a run confirmation rather than only from the output command.',
          'Pump run hours and start counts, individually. This is the data maintenance planning actually uses.',
          'Pump fault, seal failure, and motor thermal, individually and distinctly.',
          'HOA position, so the system knows a pump has been taken out of automatic.',
          'High level and, if present, high-high or overflow.',
          'Phase monitor status, generator run, and transfer switch position.',
          'Intrusion, and a communication heartbeat that proves the path is alive rather than merely quiet.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Send run confirmation, not the output command',
        text: 'If SCADA displays the PLC output bit, it shows what the controller asked for. A pump with a tripped overload, an open disconnect, or a failed contactor will still show as running. Bring back an auxiliary contact or a current sensor and display that instead.',
      },
      { t: 'h2', text: 'Where these stations actually fail' },
      {
        t: 'table',
        head: ['Failure', 'Frequency', 'Practical mitigation'],
        rows: [
          ['Level measurement fouled or failed', 'Very common', 'Radar rather than ultrasonic, backup floats, validity checking in logic'],
          ['Rags binding a pump', 'Very common', 'Detect low run current, alarm on run without level drop'],
          ['Power loss', 'Common', 'Generator or a quick-connect receptacle, phase monitoring, alarm on loss'],
          ['Communication path down', 'Common', 'Heartbeat monitoring, local alarm autodialer as a fallback'],
          ['Control power supply failure', 'Occasional', 'Monitor the supply, keep a spare on the shelf'],
          ['Surge damage after a storm', 'Occasional', 'Surge protection on power, antenna, and signals; replaceable modules'],
          ['Corrosion in the panel', 'Slow and certain', '316 stainless Type 4X, sealed conduit entries, breathe-and-drain fittings'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A pump that runs but does not pump',
        text: 'A rag-bound or air-locked pump reports running while the level keeps climbing. If the logic only checks run status, everything looks fine until the high level alarm. Compare expected level change against actual: if a pump has run for several minutes and level has not fallen, alarm it as a failure to pump.',
      },
      { t: 'h2', text: 'Backup that does not share a failure mode' },
      {
        t: 'p',
        text: 'The value of a backup is exactly the extent to which it fails independently. A second level transmitter on the same power supply, the same input card, and the same controller adds much less than it appears to.',
      },
      {
        t: 'ol',
        items: [
          'A hardwired high level float that alarms without passing through the PLC.',
          'A float-based pump start path that operates if the transmitter fails, even if it runs the station crudely.',
          'A local audible and visual alarm at the site, for the neighbor who notices before SCADA does.',
          'An autodialer independent of the SCADA communication path at critical stations.',
          'A generator receptacle and a documented procedure, tested, not assumed.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why are floats still used when a level transmitter is installed?',
        a: 'Because they fail differently. A float is a mechanical switch on its own circuit that does not depend on the transmitter, the analog card, or the controller. When the primary measurement fails in a way that looks plausible, the float is what keeps the station from overflowing.',
      },
      {
        q: 'Should a lift station use variable frequency drives?',
        a: 'Sometimes. VFDs allow level to be held steadily and reduce starts, and they are valuable where the force main or the downstream plant benefits from a smooth flow. They add cost, heat, harmonics, and a maintenance item at an unattended site. Many utilities use across-the-line starters at typical stations and reserve drives for large or hydraulically sensitive ones.',
      },
      {
        q: 'How long can a station run without SCADA?',
        a: 'Indefinitely, if it is designed correctly. The panel controls the pumps. SCADA provides visibility, alarming, and history. Losing communication means the utility is blind, which matters a great deal, but it should never mean the station stops pumping.',
      },
      {
        q: 'What causes a high level alarm at a station that seems to be working?',
        a: 'In rough order of frequency: a rag-bound pump that is running without moving water, a level measurement reading low, an inflow event exceeding station capacity, a partially closed discharge valve, and a check valve stuck shut. Trend level against pump run status and the answer usually becomes obvious.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/controls/control-panels/pump-panels/lead-lag',
      '/controls/instrumentation/level/radar-level',
      '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
    ],
  },

  {
    path: '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
    kind: 'reference',
    title: 'Wet Well Level Control',
    summary:
      'The measurement that runs a lift station: choosing setpoints, protecting the pumps, validating the signal, and the failures that flood a station.',
    answer:
      'Wet well level control uses a continuous level measurement to start and stop pumps at defined setpoints. The band between start and stop must be wide enough to keep pump starts within the motor rating and narrow enough to avoid excessive detention time, which produces hydrogen sulfide. Signal validation and independent float backup are what keep a plausible-looking bad reading from causing an overflow.',
    keyPoints: [
      'The start-to-stop band trades pump starts against wet well detention time.',
      'Validate the level signal: out of range, frozen, and rate-of-change checks all catch real failures.',
      'A held last-good value must be visibly marked, never presented as live.',
      'Independent floats are the backup that does not share a failure mode with the transmitter.',
      'Trending level against pump run status diagnoses most station problems in under a minute.',
    ],
    published: '2026-06-02',
    updated: '2026-08-30',
    readingTime: 9,
    tags: ['Wastewater', 'Level', 'Lift Stations', 'Control'],
    blocks: [
      { t: 'h2', text: 'The band' },
      {
        t: 'p',
        text: 'Everything about wet well control follows from the vertical distance between where pumps start and where they stop. That band determines the volume moved per cycle, which determines run length, which determines both starts per hour and detention time.',
      },
      {
        t: 'formula',
        expr: 'Cycle_Volume = Wet_Well_Area × (Start_Level − Stop_Level)',
        where: [
          'Wet_Well_Area — plan area of the wet well',
          'Start_Level, Stop_Level — the control setpoints',
          'Cycle_Volume — volume moved per pumping cycle, ignoring inflow during the run',
        ],
      },
      {
        t: 'p',
        text: 'Run time is roughly that volume divided by the net pumping rate, which is pump capacity minus inflow. The worst case for short cycling is low inflow, because the well fills slowly but the pump empties the band just as fast as ever. The worst case for detention is also low inflow, because the well sits full between cycles. This is why setpoints should be checked against the lowest expected flow, typically the early morning minimum, rather than against design flow.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Septicity is a controls problem too',
        text: 'Wastewater held too long goes anaerobic and generates hydrogen sulfide, which corrodes concrete and metal downstream, creates odor complaints, and is a serious safety hazard. A control strategy that keeps the well full for hours to minimize starts has traded a pump maintenance cost for a corrosion and odor cost, and the second one is usually larger.',
      },
      { t: 'h2', text: 'Signal validation' },
      {
        t: 'p',
        text: 'The dangerous level failure is not one that reads zero. It is one that reads a believable number that happens to be wrong. Three checks in the controller catch most of these.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Range check', def: 'Compare the raw analog value against the NAMUR fault thresholds. Below 3.6 mA or above 21 mA is a device fault, not a level. Below the physical bottom or above the physical top of the well is also impossible and should be flagged.' },
          { term: 'Frozen value check', def: 'If the level has not changed by more than a small tolerance for longer than any real operating condition would allow, the reading is stale. A wet well level that has not moved in thirty minutes while a pump is running is not a level, it is a stuck reading.' },
          { term: 'Rate of change check', def: 'A wet well cannot change several feet in one scan. A jump beyond a physically possible rate is a signal fault or interference, and should be rejected rather than acted on.' },
        ],
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Validation logic in outline',
        code: `Raw_Fault    = Raw < Count_3p6mA  OR  Raw > Count_21mA
Range_Fault  = Level < Well_Bottom  OR  Level > Well_Top
Frozen_Fault = |Level - Level_30min_ago| < 0.05 ft  AND  Any_Pump_Running
Rate_Fault   = |Level - Level_last_scan| > Max_Physical_Rate

Level_Bad = Raw_Fault OR Range_Fault OR Frozen_Fault OR Rate_Fault

IF Level_Bad THEN
    Level_Used = Last_Good_Level      // held, and marked as held
    Control_Mode = Float_Backup
    Alarm "Wet well level signal fault"
ELSE
    Level_Used = Level
    Last_Good_Level = Level`,
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A held value must never look live',
        text: 'If the HMI shows a held last-good level in the same style as a live one, an operator will make decisions on it. Hatch it, grey it, or annotate it. The historian should also record that the value was held, so a later investigation can tell the difference.',
      },
      { t: 'h2', text: 'What to do when the level is bad' },
      {
        t: 'p',
        text: 'The correct fallback depends on the station, and it should be a documented decision in the control narrative rather than whatever the programmer chose that day.',
      },
      {
        t: 'ol',
        items: [
          'Fall back to float control. If the station has start and stop floats, use them. The station runs crudely but it runs.',
          'If only a high level float exists, use it to start pumps and run for a fixed timed period, then stop and wait for the float again.',
          'Alarm immediately and distinctly. "Level signal fault" must not be buried among level alarms.',
          'Never continue controlling on a value you have identified as invalid.',
          'Never simply stop pumping and wait for someone to notice. That guarantees an overflow.',
        ],
      },
      { t: 'h2', text: 'Variable speed level control' },
      {
        t: 'p',
        text: 'With drives, the station can hold a level rather than cycling between two. A PID loop modulates pump speed to keep the well near a target, adding the second pump when the first reaches maximum speed.',
      },
      {
        t: 'p',
        text: 'Two constraints matter. Minimum speed must stay above the point where the pump cannot overcome static head, or it spins without moving water. And a station that holds a constant level has constant detention rather than a full-to-empty cycle, so scour velocity in the force main has to be considered separately, often with a periodic forced high-speed run.',
      },
      { t: 'h2', text: 'Reading a level trend' },
      {
        t: 'p',
        text: 'Wet well level trended against pump run status is the single most useful diagnostic display a utility has. The shape tells you what is wrong before anyone drives to the site.',
      },
      {
        t: 'table',
        head: ['Trend shape', 'Means'],
        rows: [
          ['Sawtooth, consistent slope on both sides', 'Normal operation'],
          ['Level rises while a pump shows running', 'Rag bound, air locked, closed valve, or wrong rotation'],
          ['Very short cycles', 'Level band too narrow for current inflow'],
          ['Slow fill, fast empty, long flat top', 'Excessive detention; expect odor and corrosion complaints'],
          ['Flat line with pumps cycling', 'Level signal frozen; the station is running on something else'],
          ['Steps rather than a smooth slope', 'Poor analog resolution, or a noisy signal being filtered heavily'],
          ['Rising through the high level with both pumps running', 'Inflow exceeds station capacity, or both pumps are impaired'],
        ],
      },
    ],
    faqs: [
      {
        q: 'How wide should the level band be?',
        a: 'Wide enough that at the lowest expected inflow the pump still runs long enough to satisfy minimum run time and stay within its starts-per-hour rating, and narrow enough that detention time at that same low flow does not turn the well septic. Calculate both, then use the widest band that satisfies the detention limit.',
      },
      {
        q: 'What level technology is best for a wet well?',
        a: 'Non-contact radar is the usual answer for raw wastewater because nothing touches the liquid and it is unaffected by vapor and temperature. Submersible pressure transducers are common and less expensive but sit in the liquid and foul. Ultrasonic drifts with temperature and struggles with vapor and foam.',
      },
      {
        q: 'Do I still need floats with a good level transmitter?',
        a: 'Yes. The floats are not there because the transmitter is unreliable. They are there because they fail independently. A single measurement with a single path to the pumps has no fallback when it reports a wrong but plausible value.',
      },
      {
        q: 'Why does my station short cycle at night?',
        a: 'Because inflow is at its lowest, so the well takes a long time to fill and the pump empties the band just as fast as always. The run is short, and if the band is narrow the pump exceeds its starts-per-hour rating. Widen the band, subject to the detention time limit.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/controls/instrumentation/level/radar-level',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/control-panels/pump-panels/lead-lag',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-pumping/pressure-control',
    kind: 'reference',
    title: 'Distribution Pressure Control',
    summary:
      'How a booster or high service pump station holds discharge pressure with variable speed pumps, how pumps are staged, and what stops the system hunting.',
    answer:
      'Distribution pressure is held by running the pumps at whatever speed delivers the demand at the setpoint. A pressure transmitter on the discharge feeds a PID controller whose output is the speed reference for the lead pump; when the lead pump cannot hold pressure at full speed a lag pump is staged on, and when demand falls the pumps slow, destage, and eventually sleep. Hunting comes from a loop tuned too fast for the system, a transmitter in the wrong place, or staging without deadbands, and each has a specific fix.',
    keyPoints: [
      'The loop is discharge pressure to pump speed. The setpoint is the pressure the system needs at the point that matters, which is not always the pump discharge.',
      'Staging adds a pump on sustained full speed with low pressure, and removes one on sustained low speed with pressure held. Both need time delays and deadbands.',
      'Minimum speed is a pump protection limit, not a control decision; below it the pump does no useful work and heats the water.',
      'Sleep mode handles small night demand without cycling a large pump; a hydropneumatic tank or a small jockey pump carries the leakage.',
      'A pressure loop hunts when the controller is faster than the system, and the fix is slower tuning and a filtered measurement, not more logic.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Pumps', 'PID', 'Control', 'VFD'],
    blocks: [
      { t: 'h2', text: 'What the station is trying to do' },
      {
        t: 'p',
        text: 'A distribution system needs pressure in a band: high enough at the worst point for fire flow and for the customer on the hill, low enough that it does not burst old mains or blow past pressure reducing valves. Demand changes continuously, from the night minimum to the morning peak to a hydrant flow, and the pump station has to deliver whatever the demand is while the pressure stays put. Variable speed pumping is how that is done without a storage tank floating on the system.',
      },
      { t: 'h2', text: 'The basic loop' },
      {
        t: 'p',
        text: 'A pressure transmitter on the discharge header, downstream of the check valves, measures the controlled variable. A PID controller compares it with the setpoint and its output becomes the speed reference to the lead pump drive. Demand rises, pressure sags, the controller raises speed, the pump delivers more, pressure recovers. The loop is straightforward; most of the difficulty is in everything around it.',
      },
      {
        t: 'p',
        text: 'The setpoint is worth thinking about. Pressure at the pump discharge is easy to measure but it is not what the system needs; the system needs pressure at the critical point, which is the highest or most distant customer. Friction loss between the station and that point grows with flow, so a fixed discharge setpoint over-pressures the system at night and under-pressures it at the peak. Two approaches fix this: measure at the critical point over telemetry and control on that, or raise the discharge setpoint with flow using a curve that approximates the friction loss.',
      },
      { t: 'h2', text: 'Speed limits' },
      {
        t: 'dl',
        items: [
          { term: 'Minimum speed', def: 'Below some speed, usually around 40 to 60 percent depending on the pump curve and the static head, the pump cannot generate enough head to open the check valve and it churns water with no flow. That heats the water and the pump. The controller output is clamped at the minimum speed, and the sleep logic takes over below it.' },
          { term: 'Maximum speed', def: 'Normally 100 percent of the motor rated speed. Running above rated speed on a drive is possible but the power required rises with the cube of speed and the motor and pump are not rated for it without engineering review.' },
          { term: 'Ramp rates', def: 'The drive accelerates and decelerates at set rates. Too fast and every speed change is a pressure transient that the loop then chases. A few tens of seconds from minimum to maximum is common for distribution pumping.' },
        ],
      },
      { t: 'h2', text: 'Staging pumps' },
      {
        t: 'p',
        text: 'One pump covers a range of demand. Beyond it a second pump has to run, and the logic that adds and removes pumps is where most pressure stations misbehave.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Stage up.', text: 'When the lead pump has been at maximum speed for a set time and pressure is still below setpoint by a set margin, start the lag pump. Bring the lag pump up to a matching speed and then let the controller drive both together, or run the lead at full speed and control on the lag; each has advocates and both work when the transitions are managed.' },
          { title: 'Stage down.', text: 'When the running pumps have been at or near minimum speed for a set time with pressure at setpoint, stop one. Raise the speed of the remaining pump as the other stops so that pressure does not dip.' },
          { title: 'Alternate.', text: 'Rotate which pump is lead on each cycle or each day so that wear is shared and every pump is proven regularly.' },
          { title: 'Protect the transitions.', text: 'Delays on both stage decisions, a deadband between the stage up and stage down conditions, and a minimum run time on each pump. Without these the station adds and removes a pump every few minutes at the demand that sits on the boundary.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Stage on time and condition, never on pressure alone',
        text: 'A short pressure dip, from a hydrant opening or a valve closing, is not a reason to start a second pump. Require the condition to persist for a delay long enough that the loop has had a chance to respond first. The delay is usually a minute or more.',
      },
      { t: 'h2', text: 'Sleep and small demand' },
      {
        t: 'p',
        text: 'At night the demand may be less than the flow of one pump at minimum speed. The pump then runs at minimum, pressure rises above setpoint, and the loop has nowhere to go. The standard answer is a sleep mode: when the pump has been at minimum speed with pressure above setpoint for a delay, stop it, and restart when pressure falls to a wake setpoint. Something has to hold pressure while the pump is asleep. A hydropneumatic tank does it with stored air; a small jockey pump does it with a pump sized for the leakage. Without one or the other the main pump short cycles all night.',
      },
      { t: 'h2', text: 'Why pressure loops hunt' },
      {
        t: 'p',
        text: 'A hunting pressure loop swings above and below setpoint continuously, and the pump speed swings with it. It wears the drive, disturbs the system, and trips low and high pressure alarms. The causes are few and they are almost always in this list.',
      },
      {
        t: 'ul',
        items: [
          'Tuning too aggressive. Pressure responds to speed almost instantly, so a loop tuned like a slow temperature loop overshoots. Reduce gain, lengthen the integral time, and use no derivative unless there is a specific reason.',
          'Transmitter too close to the pump. Immediately downstream of the pump the pressure is turbulent and follows every speed change. Move the transmitter downstream of the check valves and a length of straight pipe, or filter the signal.',
          'Ramp rate faster than the loop. Every controller output change becomes a pressure step, which the controller then corrects. Slow the ramp.',
          'Staging without delays. The second pump starts on a dip, raises pressure, stops on the rise, and the cycle repeats. Add delays and deadbands.',
          'Integral windup at the speed limits. When the output is clamped at minimum or maximum the integral term keeps accumulating, and when the limit releases the controller overshoots. Use a controller with anti-windup, which every modern PLC PID instruction has, and confirm it is enabled.',
          'A pressure reducing valve or an altitude valve downstream fighting the station. Two controllers holding pressure at two points with overlapping ranges will oscillate against each other. Separate their setpoints.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Loss of the pressure signal must not run the pumps to full speed',
        text: 'If the transmitter fails low, the controller sees zero pressure and drives the pumps to maximum. Detect the failed signal, under 4 mA or over 20 mA, and on failure hold a safe fixed speed, switch to a backup transmitter, or stop, according to the narrative. A station that over-pressures a distribution system breaks mains.',
      },
      { t: 'h2', text: 'Constant speed stations' },
      {
        t: 'p',
        text: 'Not every station has drives. A constant speed station holds pressure in a band with pressure switches or a transmitter and setpoints, starting a pump when pressure falls to the low setpoint and stopping it at the high setpoint, with a hydropneumatic tank sized to keep the cycles per hour within the motor rating. The control is simpler and the pressure varies more. The staging, alternation, and signal failure rules are the same.',
      },
    ],
    faqs: [
      {
        q: 'Where should the pressure transmitter go?',
        a: 'On the discharge header downstream of the check valves and after a length of straight pipe, so it reads system pressure rather than pump turbulence. For the best control, a second transmitter at the critical point in the system over telemetry, used as the controlled variable or to adjust the setpoint.',
      },
      {
        q: 'What should the minimum speed be?',
        a: 'The speed at which the pump can just overcome the static head and open the check valve, with a margin. It comes from the pump curve and the system head, not from a default in the drive. Running below it does no useful work.',
      },
      {
        q: 'Why does my booster pump start and stop all night?',
        a: 'Night demand is below the flow of one pump at minimum speed and there is nothing to hold pressure while the pump rests. Add sleep logic with a hydropneumatic tank or a jockey pump, and set the wake pressure with enough deadband below the setpoint.',
      },
      {
        q: 'How do I tune a pressure loop?',
        a: 'Start with low gain and a long integral time, no derivative. Make a small setpoint step and watch the response. Increase gain until the response is brisk without overshoot, then shorten the integral time until the offset clears in a reasonable time. Pressure loops are fast; the tuning ends up gentler than most people expect.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/pid',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/controls/control-panels/pump-panels/lead-lag',
      '/calculators/pump-affinity-laws',
      '/controls/instrumentation/signals/4-20-ma-signals',
    ],
  },
  {
    path: '/water-wastewater/water-systems/storage/tank-level-control',
    kind: 'reference',
    title: 'Tank Level Control',
    summary:
      'How a storage tank is filled and drawn on level setpoints, how the setpoints are chosen to keep the water turning over, and what the station does when the tank stops talking.',
    answer:
      'A storage tank is controlled by starting the supply pumps when the level falls to a call-on setpoint and stopping them when it rises to a call-off setpoint. The band between them sets how much of the tank is used each cycle, and using enough of it is what keeps the water fresh. The tank level usually reaches the pump station over telemetry, so the design also has to say what the station does when that signal is late, frozen, or gone.',
    keyPoints: [
      'Fill and draw control is two setpoints and a deadband; the work is in choosing the setpoints, not the logic.',
      'A tank that stays nearly full does not turn over, and stale water loses disinfectant residual. Deliberate drawdown is a water quality control.',
      'Setpoints move with the season: deeper drawdown in summer for turnover, more reserve in winter and fire season.',
      'The level signal crosses telemetry, so a stale or lost value must be detected and the station must have a defined fallback.',
      'Overflow and low level are alarmed independently of control, and the overflow alarm should be a float, not the transmitter.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Level', 'Telemetry', 'Pumps', 'SCADA'],
    blocks: [
      { t: 'h2', text: 'What the tank is for' },
      {
        t: 'p',
        text: 'An elevated tank or a ground storage tank with a booster does three things. It stores water so that the source and the treatment can run steadily while demand swings. It holds pressure on the system by its elevation, so that the pumps do not have to. And it holds a reserve for fire flow and for outages. The control system has to keep it in the band that serves all three without letting the water sit long enough to go stale.',
      },
      { t: 'h2', text: 'Fill and draw' },
      {
        t: 'p',
        text: 'The control is a level comparison. When the tank level falls to the call-on setpoint the supply pumps start, or the well or the plant is asked for water. When it rises to the call-off setpoint they stop. Between the two the tank drains on demand. With more than one pump the same lead and lag structure used in a lift station applies, with the second pump called on at a lower level or after the first has run for a time without gaining.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Call-off, the top of the band', def: 'Set below the overflow with a margin for the pump to stop and the check valve to close. Near the top of the tank in winter for reserve, lower in summer for turnover.' },
          { term: 'Call-on, the bottom of the band', def: 'Set above the level that keeps fire reserve and keeps the pressure on the system acceptable. The gap to the call-off setpoint is the turnover each cycle.' },
          { term: 'Lag call-on', def: 'A level below the lead call-on at which a second pump joins, for days when one pump cannot keep up with demand.' },
          { term: 'Low level alarm and high level alarm', def: 'Outside the control band, alarmed regardless of what the control is doing.' },
        ],
      },
      { t: 'h2', text: 'Turnover and water quality' },
      {
        t: 'p',
        text: 'A tank that is kept full is a tank that is not used. If the band is a foot at the top of a forty foot tank, most of the water in it has been there for days or weeks, and chlorine residual decays with time and temperature. In summer, in a tank in the sun, the residual at the bottom can be gone. The remedy is to use the tank: set the band deep enough that a meaningful fraction of the volume is exchanged every cycle, and let the level cycle through it daily.',
      },
      {
        t: 'p',
        text: 'This is a deliberate trade against reserve. A deeper band means less water in the tank at the bottom of the cycle, and the low point has to stay above the fire reserve and the pressure floor. Many utilities run a summer band and a winter band and switch between them on a schedule or on water temperature, and some run a periodic deep drawdown to turn the tank over completely. The setpoints are an operational decision the control system should make easy to change from the HMI and log when changed.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Alarm on age, not just level',
        text: 'A tank that has not reached its call-on setpoint in some number of days is not turning over, whatever the level says. A simple timer on the last fill start, alarmed at a few days, catches the stale tank that a level alarm never would.',
      },
      { t: 'h2', text: 'Measuring the level' },
      {
        t: 'p',
        text: 'A pressure transducer at the base of the tank, on the inlet piping or in a tap on the shell, reads the hydrostatic head and is the most common tank level instrument. It is accessible, cheap, and unaffected by what is happening at the surface. Its reference is the transducer elevation, and it reads the static head only when there is no flow through the tap it is on, which is why it goes on a dead leg. A radar unit on the roof looking down at the surface is the alternative, immune to piping effects and accessible without draining anything, at more cost and more exposure to weather and ice.',
      },
      {
        t: 'p',
        text: 'Either way the overflow alarm should be a float or a conductivity probe at the overflow level, wired to the telemetry unit directly. A transducer that has drifted or a radar that has iced over will not report an overflow, and an overflow at an elevated tank is a lot of water on the ground and a headline.',
      },
      { t: 'h2', text: 'Telemetry and what happens without it' },
      {
        t: 'p',
        text: 'The tank and the pumps are rarely in the same place. The level is measured at the tank, sent by radio, cellular, or a leased circuit to the pump station or the SCADA host, and used there. The signal is late by the polling interval, and it goes missing when the radio path fades, the modem drops, or the tank site loses power. The control has to be designed for that.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Timestamp and validate the value.', text: 'Treat a value that has not updated within a few polling intervals as stale, and a value outside the physical range of the tank as bad. Do not control on a frozen number.' },
          { title: 'Define the fallback.', text: 'On a stale or bad level the station runs a defined program: pump on a schedule sized to typical demand, pump on local discharge pressure, or hold the last state for a limited time and then alarm. The control narrative says which, and the choice depends on whether an overflow or a dry tank is the worse outcome at that site.' },
          { title: 'Alarm the communication failure separately.', text: 'The operator needs to know the tank is not reporting before the tank is empty or overflowing, which is why the communication alarm is its own alarm with its own delay.' },
          { title: 'Recover cleanly.', text: 'When the signal returns, resume level control from the live value rather than acting on the whole history of missed updates at once.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A frozen level is the most dangerous failure',
        text: 'A level that stops updating just above the call-on setpoint leaves the pumps off while the tank drains, and a level frozen just below call-off leaves them on while the tank overflows. Neither looks like a fault on a screen that shows a plausible number. Detect staleness explicitly.',
      },
      { t: 'h2', text: 'Altitude valves and hydraulics' },
      {
        t: 'p',
        text: 'Where the tank floats on the system without a dedicated fill pump, an altitude valve on the tank inlet closes hydraulically when the tank is full and opens as it draws down, and the tank level is set by the system pressure rather than by a controller. The control system then monitors rather than controls, and the setpoints above become the alarm limits and the valve adjustment. Some systems combine the two, with a valve for overflow protection and a pump station controlled on level.',
      },
    ],
    faqs: [
      {
        q: 'How far should a storage tank be drawn down each day?',
        a: 'Enough that the water turns over in a few days at most, which for many tanks means using a quarter or more of the volume each cycle, while keeping the low point above the fire reserve and the pressure floor. It is a water quality decision the utility makes, and it usually changes with the season.',
      },
      {
        q: 'What should the pump station do if it loses the tank level signal?',
        a: 'Whatever the control narrative says, and it must say something: pump on a schedule, pump on local pressure, or hold and alarm. The one thing it must not do is keep controlling on the last value it received as if it were current.',
      },
      {
        q: 'Where should the level transducer be installed?',
        a: 'At the base of the tank on a dead leg where there is no flow past it, with its elevation recorded so the reading can be referenced to the tank floor. The overflow alarm should be a separate float or probe at the top, not derived from the transducer.',
      },
      {
        q: 'Why does the tank level drop when the pumps are running?',
        a: 'Demand on the system is higher than the pump output, which is normal at peak on a hot day. If it happens routinely, the lag pump setpoint is too low or the pumps are undersized for the demand. If the level reads lower only while the pumps run, the transducer is on a live line and reading a velocity effect rather than static head.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/controls/instrumentation/level/wet-well-level',
      '/controls/instrumentation/level/radar-level',
      '/calculators/tank-volume',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
    kind: 'reference',
    title: 'Lift Station Lead/Lag Control',
    summary:
      'How a duplex or triplex station decides when one pump is enough and when it is not: the setpoint ladder, cycle volume, the lag call, parallel pumping, and what to do when the lead pump fails.',
    answer:
      'Lead/lag control at a lift station starts the lead pump when wet well level reaches the lead-on setpoint, starts the lag pump if level keeps rising to the lag-on setpoint, and stops the pumps at the off setpoint. The setpoints are spaced to keep starts per hour within the pump rating, the lag call is delayed and staggered, and a pump that fails to prove is dropped from the sequence so the other pump takes its role immediately.',
    keyPoints: [
      'The setpoint ladder from the bottom up: low-level cutoff, all-off, lead-on, lag-on, high-level alarm, overflow.',
      'Cycle volume between all-off and lead-on sets the starts per hour. Size it from the pump rating, not by guess.',
      'Two pumps in parallel deliver less than twice one pump. The lag adds capacity, not double capacity.',
      'A lag call can come from level, from lead run time, or from rate of rise. Level alone is the minimum.',
      'When the lead fails to prove, the lag becomes the lead now, not at the next cycle.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 12,
    tags: ['Wastewater', 'Lift Stations', 'Pumps', 'Control'],
    blocks: [
      { t: 'h2', text: 'What lead/lag decides' },
      {
        t: 'p',
        text: 'A lift station with more than one pump has to answer two questions continuously: does the well need pumping, and does it need more than one pump. Lead/lag control is the logic that answers them. The lead pump handles normal inflow. The lag pump is called when inflow exceeds what the lead can move, and it is also the pump that takes over when the lead is out of service. Alternation, which decides which physical pump holds the lead role, is a separate function and is covered on its own page.',
      },
      {
        t: 'p',
        text: 'The panel-level view of lead/lag, including how it is built for pressure boosters and other duty-standby applications, is on the pump panel lead/lag page. This page is about the wet well: how the setpoints are chosen, how the lag call is made, and what parallel pumping actually delivers.',
      },
      { t: 'h2', text: 'The setpoint ladder' },
      {
        t: 'p',
        text: 'Every level setpoint in a lift station is an elevation in the wet well. Listing them from the bottom up keeps the relationships straight.',
      },
      {
        t: 'table',
        head: ['Setpoint', 'What happens', 'How it is placed'],
        rows: [
          ['Low-level cutoff', 'All pumps stop immediately and an alarm is raised.', 'Below the all-off level, at or above the minimum submergence the pump manufacturer requires. It protects the pump from running dry if the all-off setpoint is missed.'],
          ['All-off (stop)', 'Running pumps stop, subject to minimum run time.', 'High enough to keep the pump volute and, for submersibles, the motor cooling jacket covered. Pumping lower than the manufacturer allows draws air, loses prime, and overheats the motor.'],
          ['Lead-on', 'The lead pump starts.', 'Above all-off by the cycle volume, which is calculated from the starts-per-hour rating. This band is where the station spends most of its life.'],
          ['Lag-on', 'The lag pump starts.', 'Above lead-on by enough that ordinary daily peaks are handled by one pump. Typically one to two feet in a small station, more in a deep well.'],
          ['High-level alarm', 'Alarm, and at most stations a hardwired call to both pumps.', 'Below the invert of the lowest incoming sewer. Once the well surcharges into the collection system, upstream manholes and basements are at risk.'],
          ['Overflow', 'Wastewater leaves the system.', 'Not a setpoint, but the elevation everything else is measured against. Storage between high-level and overflow is the operator response time.'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Setpoints are elevations, so record them as elevations',
        text: 'A setpoint expressed only as a transmitter reading is lost the day the transmitter is replaced or remounted. Record each setpoint as an elevation or a depth from a fixed reference such as the top of the hatch, and record the transmitter zero against the same reference. The commissioning record should let the next person rebuild every setpoint with a tape measure.',
      },
      { t: 'h2', text: 'Sizing the lead-on band' },
      {
        t: 'p',
        text: 'The volume between all-off and lead-on is the cycle volume. It sets how often the lead pump starts, and pump motors are rated for a maximum number of starts per hour, commonly six to ten for submersible wastewater pumps and fewer for large motors. Too small a band and the motor exceeds its rating; too large and wastewater sits in the well long enough to go septic.',
      },
      {
        t: 'p',
        text: 'For a constant-speed pump, the shortest cycle occurs when inflow is exactly half the pump capacity: the well fills as slowly as it empties. That gives the classic sizing rule.',
      },
      {
        t: 'formula',
        expr: 'V = (T × Q) / 4',
        where: [
          'V = cycle volume between all-off and lead-on, in gallons',
          'T = minimum cycle time in minutes, which is 60 divided by the allowed starts per hour',
          'Q = pump capacity at the operating point, in gallons per minute',
        ],
      },
      {
        t: 'p',
        text: 'For a pump rated at six starts per hour, T is ten minutes. With a 500 gpm pump, the cycle volume is 1,250 gallons. In a six-foot-diameter well, which holds about 211 gallons per foot of depth, that is a band of just under six feet. In practice the well geometry is fixed and the calculation runs the other way: given the band the well can provide, the result is the number of starts to expect at the worst-case inflow, which is then compared with the motor rating.',
      },
      {
        t: 'p',
        text: 'Variable speed pumps change the arithmetic because the pump can slow to match inflow and run continuously. Even then, at very low inflow the pump reaches its minimum speed and the station cycles, so the same check applies using the capacity at minimum speed.',
      },
      { t: 'h2', text: 'Making the lag call' },
      {
        t: 'p',
        text: 'The lag-on setpoint is the minimum. A station that calls the lag only on level will always call it eventually, but a well with large storage can spend a long time between lead-on and lag-on with the lead pump losing ground slowly. Three conditions are commonly combined.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Level', def: 'Level reaches lag-on. This is the baseline and it must exist in every station, hardwired through a float if the station has one.' },
          { term: 'Lead run time', def: 'The lead has run longer than a set time, typically ten to twenty minutes, without level falling. Inflow is at or above one pump capacity, and waiting for level to climb another foot gains nothing.' },
          { term: 'Rate of rise', def: 'Level is rising faster than a set rate with the lead running. This catches storm inflow early. It needs a filtered level signal, or turbulence in the well will call the lag on noise.' },
        ],
      },
      {
        t: 'p',
        text: 'Whatever the condition, the lag start is delayed by a few seconds after the lead start so the two inrush currents do not coincide. On a generator this matters more: two motors starting together can exceed what the set can hold, and the transfer switch sequence is often the reason a station is in trouble in the first place.',
      },
      { t: 'h2', text: 'What two pumps actually deliver' },
      {
        t: 'p',
        text: 'The lag pump is often expected to double the station capacity. It does not. Two pumps in parallel each see a higher discharge head than one pump alone, because the force main friction loss rises with the square of flow. Each pump slides up its curve to a lower flow, and the combined flow lands somewhere between one and two times the single-pump flow. On a short force main with mostly static head the gain is close to double; on a long force main it can be as little as thirty percent.',
      },
      {
        t: 'p',
        text: 'This has two consequences for control. The lag call must come early enough to matter, because it buys less time than the pump nameplate suggests. And the capacity a station is credited with in a wet weather plan should come from the system curve, not from adding nameplates. A triplex station adds a third pump for redundancy and for the third-pump step on the system curve, which is smaller again.',
      },
      { t: 'h2', text: 'Stopping' },
      {
        t: 'p',
        text: 'Simple stations stop everything at all-off. A better sequence stops the lag first at an intermediate lag-off level and lets the lead finish the drawdown. This reduces the number of two-pump stops, keeps the discharge velocity in the force main more consistent, and puts the alternation event at a single-pump stop where it is unambiguous. Both stops are subject to the minimum run time.',
      },
      {
        t: 'p',
        text: 'Do not use a very short minimum run time as a protective device. If level is falling faster than expected the pump is doing its job. The minimum run time exists to stop a pump from being started and stopped repeatedly by a noisy level signal at the all-off point, and a few seconds to a minute is enough.',
      },
      { t: 'h2', text: 'When the lead fails' },
      {
        t: 'p',
        text: 'A pump is called and does not prove: no run confirmation from the starter auxiliary or the drive, an overload trip, a seal failure, a motor thermal switch, or a current that says the motor is spinning but nothing is being moved. The correct response is immediate. The lag pump takes the lead role now, the failed pump is removed from the rotation, and an alarm is raised. Waiting for level to climb to lag-on means the well rises for no reason while a healthy pump sits idle.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Call the lead', text: 'Energize the lead output. Start a fail-to-prove timer, typically three to ten seconds.' },
          { title: 'Check the proof', text: 'Run confirmation from the starter auxiliary contact or the drive running bit, and optionally current above a minimum. If the timer expires without proof, the pump is failed.' },
          { title: 'Promote the lag', text: 'Set the other pump as lead, call it, and repeat the proof check. Latch a pump-failed alarm on the first pump.' },
          { title: 'Hold the failure', text: 'Keep the failed pump out of rotation until the fault is reset locally or from SCADA by an operator who has looked at it. Automatic retry after a delay is reasonable for an overload that may be thermal, but not for a seal failure.' },
          { title: 'Alarm the loss of redundancy', text: 'A station running on one pump is one failure from an overflow. That state deserves its own alarm and its own priority.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Prove on running, not on the output',
        text: 'The output bit says the controller asked for the pump. The starter auxiliary contact says the contactor closed. Motor current says the motor is turning. Only current, or a flow or pressure signal, says water is moving. Use the best proof the station has, and never display the output as the run status on SCADA.',
      },
      { t: 'h2', text: 'What to trend' },
      {
        t: 'ul',
        items: [
          'Wet well level with pump run status overlaid. Every problem on this page shows up here first.',
          'Starts per hour per pump. Compare with the motor rating and with the original cycle volume calculation.',
          'Run time per cycle and drawdown rate. A slowing drawdown with the same level band means a fouled impeller, a closing check valve, or a rising force main head.',
          'Lag calls per day. A rising count with no change in flow means the lead pump is losing capacity.',
          'Motor current per pump. Rag-bound pumps draw high current and move little; air-bound pumps draw low current.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should the lag pump be a bigger pump?',
        a: 'Usually not. Identical pumps allow alternation, share spares, and behave predictably in parallel. Where a station sees a very wide flow range, one option is a small jockey pump for dry-weather flow and two larger pumps for wet weather; in that arrangement the jockey is always lead and the large pumps alternate between themselves.',
      },
      {
        q: 'How far above lead-on should lag-on be?',
        a: 'Far enough that ordinary daily peaks never reach it, and close enough that a wet weather event calls the lag before the well is most of the way to the high-level alarm. One to two feet is common. Look at a level trend over a dry month: the highest level the lead pump reached on its own is the floor for lag-on.',
      },
      {
        q: 'Why does my station call the lag pump every cycle?',
        a: 'Either the lead pump can no longer keep up, which is a capacity problem, or the lag-on setpoint is too close to lead-on. Trend the level with the run status. If level keeps rising with the lead running at normal current, look at the pump; if the lead is drawing high current, look for rags; if level rises normally but lag-on is barely above lead-on, fix the setpoints.',
      },
      {
        q: 'Is a hardwired lag float still needed with a PLC?',
        a: 'Yes. The float provides a lag call that does not depend on the transmitter, the analog input, or the processor. Wire it so that it can start the lag pump through the relay logic on its own, and also bring it into the PLC as an input so the controller knows the float has operated and can alarm the disagreement.',
      },
    ],
    related: [
      '/controls/control-panels/pump-panels/lead-lag',
      '/how-to/plc-how-to/program-lead-lag-pumps',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-alternation',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/controls/instrumentation/level/wet-well-level',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/lift-station-alternation',
    kind: 'reference',
    title: 'Lift Station Pump Alternation',
    summary:
      'Which pump leads, how the lead role rotates, what an alternator relay does, and why equal run hours are not always the goal. Includes the logic rules that keep alternation from causing trouble.',
    answer:
      'Alternation rotates the lead role among the pumps in a lift station so wear is shared and every pump is exercised. The rotation usually advances at the end of each pump cycle, only among pumps that are available in auto, and is stored in retentive memory so it survives a power cycle. It can be done by a dedicated alternator relay or in the PLC, and a selector switch lets the operator fix the lead when one pump needs to be favored or rested.',
    keyPoints: [
      'Alternate at the all-off event, never in the middle of a cycle.',
      'Only pumps that are available and in auto take part in the rotation.',
      'Store the lead designation in retentive memory so a power loss does not reset it.',
      'Equal run hours are common but not mandatory. Some utilities stagger wear deliberately.',
      'Uneven run hours on the SCADA report are the first sign alternation has quietly stopped working.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Wastewater', 'Lift Stations', 'Pumps', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Why the lead role rotates' },
      {
        t: 'p',
        text: 'If the same pump always led, it would accumulate most of the run hours while the other sat idle. The idle pump is the problem. Grit settles in its volute, its seal faces dry, its bearings take a set, and the first time it is needed in a storm it turns out not to work. Alternation makes both pumps run routinely, so a failure is found on an ordinary Tuesday instead of during the event the standby was bought for.',
      },
      {
        t: 'p',
        text: 'Sharing wear is the second reason and the one most people name first. Equal run hours mean the pumps age together, which simplifies maintenance planning, but it also means they reach the end of life together. Some utilities set the alternation ratio so one pump carries a larger share, for instance sixty percent, so that replacements fall in different budget years and the station never has two tired pumps at once. Either approach is defensible; the point is to choose it rather than inherit it.',
      },
      { t: 'h2', text: 'Alternation schemes' },
      {
        t: 'table',
        head: ['Scheme', 'How it works', 'Where it fits'],
        rows: [
          ['Alternate every cycle', 'The lead role advances each time the station reaches all-off.', 'The default for duplex and triplex stations with identical pumps.'],
          ['Alternate on time', 'The lead changes on a schedule, such as daily at a fixed hour, or after a set number of run hours.', 'Stations where cycles are very short or very long, or where an operator wants a predictable pattern.'],
          ['Run-hour balancing', 'The pump with the fewest hours is chosen as lead at each cycle.', 'Triplex and larger stations, and stations where a pump has been out of service and needs to catch up. Requires accurate run-hour accumulation.'],
          ['Fixed lead', 'One pump is always lead; the other is standby only.', 'Unequal pumps, a pump on a temporary repair, or a jockey pump arrangement. Exercise the standby on a schedule if it is fixed for long.'],
          ['First-on, first-off', 'When both pumps run, the one that started first stops first at lag-off.', 'A refinement that shares run time within a two-pump cycle, common in PLC implementations.'],
        ],
      },
      { t: 'h2', text: 'The rules that keep alternation safe' },
      {
        t: 'p',
        text: 'Alternation is simple in principle and produces surprising behavior when the edge cases are not handled. These rules cover the ones that matter.',
      },
      {
        t: 'ol',
        items: [
          'Advance the lead only at all-off, when no pump is running. Swapping roles while the lead is running turns a lag call into a confusing stop-and-start, and with both pumps running it can stop both.',
          'Skip any pump that is not available. Not in auto, faulted, locked out, or failed to prove all remove a pump from the rotation until it is available again. With one pump available, that pump is lead every cycle, and the loss of redundancy is alarmed.',
          'Keep the lead designation in retentive memory. A controller that boots with pump 1 as lead every time will favor pump 1 after every power event, and remote stations have many power events.',
          'Provide a manual override. A three-position selector, 1-2, ALT, 2-1, or an equivalent SCADA setting, lets an operator fix the lead while a pump is nursed along or after a repair. The override should be visible on the HMI and alarmed if left in place for more than a set period.',
          'Handle a lead pump that fails to prove by promoting the other pump immediately. This is covered under lead/lag; the alternation logic must not fight it by advancing the rotation back to the failed pump.',
          'Count starts and run hours per pump in the controller, not only in SCADA. The counts are the evidence that alternation is working.',
        ],
      },
      { t: 'h2', text: 'Alternator relays' },
      {
        t: 'p',
        text: 'Before PLCs, and still in many small stations, alternation is done by a dedicated alternator relay. The common form is an impulse or ratchet relay: each time its coil is pulsed by the all-off event, its contacts transfer, steering the lead-on float to the other starter. Solid-state duplex alternators combine the ratchet, the lead and lag float inputs, and sometimes a selector switch into one module.',
      },
      {
        t: 'p',
        text: 'Alternator relays are reliable and easy to understand at three in the morning, which is a real virtue. Their limits are that they know nothing about pump availability unless the panel is wired to skip a pump that is not in auto, and that a stuck ratchet gives one pump every cycle with no alarm. When a PLC is added to a station that already has an alternator, decide which one is in charge. Two alternators, one in relay logic and one in the program, will disagree.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Duplex alternation in structured text',
        code: `(* Advance the lead only at all-off, and only when both pumps can take it. *)
IF All_Off_Event AND P1_Available AND P2_Available AND Selector_Auto THEN
    Lead_Is_P2 := NOT Lead_Is_P2;          (* retentive bit *)
END_IF;

(* Selector overrides: 1-2 fixes P1 as lead, 2-1 fixes P2. *)
IF Selector_1_2 THEN Lead_Is_P2 := FALSE; END_IF;
IF Selector_2_1 THEN Lead_Is_P2 := TRUE;  END_IF;

(* A pump that is not available never leads. This rule wins over the selector. *)
IF NOT P1_Available THEN Lead_Is_P2 := TRUE;  END_IF;
IF NOT P2_Available THEN Lead_Is_P2 := FALSE; END_IF;

(* The lead answers the lead call; either pump answers the lag call. *)
P1_Call := P1_Available AND ((Lead_Call AND NOT Lead_Is_P2) OR Lag_Call);
P2_Call := P2_Available AND ((Lead_Call AND Lead_Is_P2) OR Lag_Call);`,
      },
      {
        t: 'p',
        text: 'The order of the three rule groups is deliberate. The availability rule comes last so that a selector left on a failed pump cannot leave the station with no lead. Lead_Is_P2 lives in retentive memory. All_Off_Event is a one-scan pulse generated when the last running pump stops, not the all-off level itself, so the toggle fires once per cycle.',
      },
      { t: 'h2', text: 'Triplex and larger stations' },
      {
        t: 'p',
        text: 'With three pumps the rotation is a sequence rather than a swap: lead, lag, and standby roles advance one step at each all-off event, so each pump takes each role in turn. Run-hour balancing becomes more attractive here because the standby role otherwise gets no hours at all during dry weather. The availability rule generalizes: build the ordered list of available pumps, then assign lead, lag, and second lag down the list from the current rotation point.',
      },
      { t: 'h2', text: 'When alternation stops working' },
      {
        t: 'p',
        text: 'Alternation fails silently. The station keeps pumping with one pump, and nobody notices until the run-hour report shows pump 1 at 4,000 hours and pump 2 at 900, or until pump 2 is finally called in a storm and does not start. Look for these causes.',
      },
      {
        t: 'table',
        head: ['Symptom', 'Likely cause', 'Check'],
        rows: [
          ['One pump has most of the hours', 'Selector left in a fixed position; other pump not in auto; alternator ratchet stuck; alternation advancing on a condition that never occurs', 'Selector position and HOA positions on site; alternator contacts; the all-off event bit in the program'],
          ['Lead changes mid-cycle', 'Alternation keyed to a level or timer event rather than all-off', 'Trend both run statuses against level; the swap shows as a stop-and-start'],
          ['Both pumps start together every cycle', 'Lag call not conditioned on the lead role, or lag-on setpoint at or below lead-on', 'Setpoints; the lag call logic'],
          ['Rotation resets after power loss', 'Lead bit not retentive', 'Controller memory configuration; test by cycling control power'],
          ['Pump 2 never runs, alarm never sounds', 'No unavailable-pump alarm, and pump 2 not in auto for months', 'Add the alarm; review HOA status on SCADA'],
        ],
      },
    ],
    faqs: [
      {
        q: 'Does alternation increase the number of starts?',
        a: 'No. The station starts the same number of times for a given inflow. Alternation divides those starts between the pumps instead of putting them all on one motor. Starts per pump roughly halve.',
      },
      {
        q: 'Should the alternator be in the PLC or a separate relay?',
        a: 'Put it in one place. A PLC gives availability logic, retentive memory, counters, and SCADA visibility. A relay alternator is simpler and works with the PLC removed, which matters in a float backup scheme. A common compromise is the PLC in charge normally, with the relay alternator active only in backup mode when the PLC watchdog has dropped out.',
      },
      {
        q: 'How do I alternate pumps that are different sizes?',
        a: 'Do not. Fix the small pump as lead, use the large pump for lag and as standby, and exercise the large pump on a schedule so it is proven. Alternating unequal pumps gives a station whose capacity and cycle times change every cycle.',
      },
      {
        q: 'The pumps are alternating but run hours are still uneven. Why?',
        a: 'Check whether one pump is consistently the lag. In a strict every-cycle scheme the lag role also alternates, but with a first-on, first-off stop sequence or a run-time based lag call, one pump can end up taking most of the two-pump time. Also check that one pump is not being held out of auto for part of each day by a maintenance routine.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/controls/control-panels/pump-panels/lead-lag',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/controls/control-panels/pump-panels/hoa',
      '/how-to/plc-how-to/program-lead-lag-pumps',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/high-level',
    kind: 'reference',
    title: 'Lift Station High Level',
    summary:
      'The alarm that stands between a lift station and an overflow: where the high-level float goes, what it must do on its own, how much response time the well provides, and how to diagnose a high level that should not be happening.',
    answer:
      'High level at a lift station is the wet well rising above the point the pumps should have held. It is detected by an independent float placed below the lowest incoming sewer invert, which raises a local and remote alarm and, at most stations, starts the pumps through a hardwired path that does not depend on the transmitter or the controller. The volume between the float and the overflow elevation, divided by inflow, is the time an operator has to respond.',
    keyPoints: [
      'The high-level float is independent of the level transmitter and the PLC. That independence is the entire point.',
      'Place the float below the lowest incoming invert. A surcharged well backs up into the collection system.',
      'High level should start the pumps on its own path, not only raise an alarm.',
      'Compute the response time from storage above the float and peak inflow, and set notification to match.',
      'A high level with pumps running is a capacity or pump problem. Without pumps running it is a control problem.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Wastewater', 'Lift Stations', 'Alarms', 'Level'],
    blocks: [
      { t: 'h2', text: 'What high level means' },
      {
        t: 'p',
        text: 'Every lift station has a level the pumps are supposed to hold the well below. When the well rises above it, something in the chain of measure, decide, and pump has failed, or inflow has exceeded what the station can move. High level is the alarm for that state. It is the most important single alarm at the station, because the next state after high level is a sanitary sewer overflow, which is a public health event, an environmental violation, and a reportable incident in most jurisdictions.',
      },
      {
        t: 'p',
        text: 'That importance is why high level gets its own sensor, its own wiring, and its own path to the pumps. Everything else at the station can share the transmitter and the controller. High level must not.',
      },
      { t: 'h2', text: 'The high-level float' },
      {
        t: 'p',
        text: 'A high-level float is a mechanical switch in a sealed body hung on its own cable at the elevation of the alarm. It is chosen over a transmitter setpoint for one reason: it fails differently. A transmitter can read low because of fouling, a bad zero, a failed analog card, or a controller that has stopped scanning, and each of those failures looks like a normal, calm well. The float does not know what the transmitter says. When wastewater lifts it, its contact closes.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Elevation', def: 'Below the invert of the lowest sewer entering the well, with enough margin that a wave in a turbulent well does not trip it. Above the lag-on setpoint by enough that the float is not touched in normal wet weather operation. If those two constraints cannot both be satisfied, the station has a design problem worth documenting.' },
          { term: 'Wiring', def: 'Its own circuit, on its own terminals, to a relay that drives the alarm and the pump backup path. Also into a PLC input so the controller knows the float has operated. The PLC input is a copy, never the only path.' },
          { term: 'Contact type', def: 'Normally open, closing on rise, is conventional for the pump call. For the alarm circuit, a normally closed contact that opens on rise gives a fail-safe indication if the cable is cut, at the cost of a nuisance alarm when it is. Many panels use a single normally open float and accept the trade-off; either is acceptable if it is documented and tested.' },
          { term: 'Mounting', def: 'Tethered from a bracket that can be reached from the hatch without entry, on a cable long enough to swing freely and short enough not to wrap the pump cables or the guide rails. A float that fouls in rags or hangs on the pump cable is the most common reason a high-level alarm fails to sound.' },
          { term: 'Testing', def: 'Lift it by hand from the hatch, monthly or on the utility schedule, and confirm the alarm reaches SCADA and the pumps are called. Log the test. A float that has not been tested in a year should be assumed not to work.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Float service is hatch work, not well entry',
        text: 'Hang and retrieve floats from above with the bracket and cable designed for it. Entering the well to reach a float requires a confined space permit, atmospheric testing, and an attendant. If the float cannot be serviced without entry, fix the mounting.',
      },
      { t: 'h2', text: 'What high level must do' },
      {
        t: 'p',
        text: 'Alarm is the minimum. The better answer is alarm and act.',
      },
      {
        t: 'ol',
        items: [
          'Sound the local alarm: a beacon and, where neighbors allow, a horn. A passerby or an operator driving past is a legitimate detection layer at a remote station.',
          'Call SCADA with a high priority alarm that pages someone. The alarm should be its own point, not derived from the transmitter level, so it survives a transmitter failure.',
          'Call the pumps. Through the backup relay logic, the float closes the pump call path for both pumps, subject only to the low-level cutoff float and the HOA switches in AUTO. If the controller is dead, the pumps run anyway.',
          'Notify by an independent path where one exists. An autodialer or a cellular alarm unit on its own power gives a second route when the SCADA radio or the site power is the thing that failed.',
        ],
      },
      {
        t: 'p',
        text: 'Do not delay the high-level alarm more than a second or two. A short debounce prevents a wave from tripping it; a long delay eats the response time the float was placed to provide.',
      },
      { t: 'h2', text: 'Response time' },
      {
        t: 'p',
        text: 'The float is an alarm, and an alarm is only useful if someone can act before the consequence. The time available is the storage above the float divided by the inflow rate.',
      },
      {
        t: 'formula',
        expr: 't = V / Q_in',
        where: [
          't = time from high-level alarm to overflow, in minutes',
          'V = wet well volume between the float elevation and the overflow elevation, in gallons, plus any surcharge storage in the incoming sewer the utility is willing to count',
          'Q_in = inflow rate, in gallons per minute, using the wet weather peak for the design case',
        ],
      },
      {
        t: 'p',
        text: 'A six-foot well with three feet between the float and the overflow holds about 630 gallons in that band. At a dry weather inflow of 50 gpm that is nearly thirteen minutes. At a wet weather peak of 400 gpm it is a minute and a half. The wet weather number is the one to design notification and response around. If the utility cannot get a crew to the station in that time, the answer is more storage, more pumping capacity, a permanent standby pump, or a generator with automatic transfer, and the high-level alarm history is what tells the utility which stations need it.',
      },
      { t: 'h2', text: 'Diagnosing a high level' },
      {
        t: 'p',
        text: 'Start with one question: were the pumps running?',
      },
      {
        t: 'table',
        head: ['Condition', 'Likely causes', 'What to look at'],
        rows: [
          ['Pumps running, level still rising', 'Inflow above station capacity from a storm or an upstream station; a rag-bound or worn pump moving little; a partially closed discharge valve; a stuck check valve; high force main pressure from a downstream problem', 'Motor current per pump against its normal value; drawdown rate on the trend; discharge pressure; valve positions; the other stations on the same force main'],
          ['Pumps not running, level rising', 'Transmitter reading low; controller stopped or faulted; pumps not in AUTO; phase monitor or overload lockout; control power lost; starter or drive faulted', 'The transmitter reading against a tape measure; controller status; HOA positions; fault indications on the starters or drives; control circuit voltage'],
          ['One pump running, the other will not start', 'Lag call not made; lag pump failed to prove; alternation or availability logic holding it out', 'Lag call bit and setpoint; run confirmation and fault history for the idle pump'],
          ['High level with the well visibly normal', 'Float hung up, fouled, or wired wrong; float tripped by turbulence; alarm point mapped to the wrong input', 'Lift and lower the float from the hatch; watch the input in the controller; check the cable for wrap'],
        ],
      },
      { t: 'h2', text: 'Inflow and infiltration' },
      {
        t: 'p',
        text: 'A station that reaches high level only in rain is telling the utility that the collection system is leaking in. Stormwater enters through cracked pipes, leaky manholes, and illegal roof and yard drain connections, and the station sees the whole of it. Trending level and pump run time against rainfall makes the pattern obvious. The fix is in the pipes, not the panel, but the station is where the evidence is collected, and a rate-of-rise lag call and an early high-level page are what get the utility through the storm in the meantime.',
      },
    ],
    faqs: [
      {
        q: 'Can the high-level alarm come from the level transmitter?',
        a: 'A high-level setpoint in the controller is useful and should exist, but it is not the high-level alarm. It shares every failure mode of the transmitter and the controller. The float is the alarm. If the transmitter and the float disagree, that disagreement is its own alarm and usually means the transmitter is wrong.',
      },
      {
        q: 'Should high level start the pumps or only alarm?',
        a: 'Start the pumps. The most common reason a station reaches high level is that the pumps were not called when they should have been. A float that only alarms leaves the pumps idle while someone drives to the site. The exception is a station where starting the pumps on a float could be unsafe, such as one with a known discharge problem, and that is a temporary condition, not a design.',
      },
      {
        q: 'How high can I let the well go before it counts as an overflow?',
        a: 'The overflow elevation is physical: the lowest point wastewater can leave the system, which may be a manhole lid upstream rather than the station itself. Surcharging the incoming sewer is not an overflow, but it backs up into laterals and basements, and in many utilities it is reportable on its own. Set the float so the well never surcharges the incoming sewer in normal failure cases.',
      },
      {
        q: 'How often should the high-level float be tested?',
        a: 'Monthly is common, and at least at every station visit. The test is a lift by hand from the hatch while someone confirms the alarm at SCADA and the pump call. Record it. The float is the one device in the station whose failure is invisible until the day it is needed.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/controls/instrumentation/level/floats',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/controls/scada-hmi/alarm-management/alarm-philosophy',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/backup-control',
    kind: 'reference',
    title: 'Lift Station Backup Control',
    summary:
      'How a lift station keeps pumping when the transmitter, the PLC, or the SCADA link is gone: float backup logic, the control transfer relay, redundant-off protection, and how to test it with the controller actually dead.',
    answer:
      'Backup control is the layer of a lift station panel that runs the pumps when the primary controller cannot. It is built from floats and relays: a backup-start or high-level float calls the pumps through relay contacts that parallel the controller outputs, a redundant-off float stops them, and a control transfer relay driven by the PLC watchdog hands control to the floats when the controller fails. It is simpler than the primary system by design and is proven by testing with the primary disabled.',
    keyPoints: [
      'Backup control must be simpler than, and independent of, what it backs up.',
      'A control transfer relay driven by the PLC watchdog is the cleanest hand-off between primary and backup.',
      'Backup mode needs its own low-level protection. A redundant-off float in the run path prevents dry running.',
      'Feed the backup relays from control power directly, not from the PLC 24 V supply.',
      'Backup that has never been tested with the PLC dead is a drawing, not a backup.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 12,
    tags: ['Wastewater', 'Lift Stations', 'Control', 'Panels', 'Design'],
    blocks: [
      { t: 'h2', text: 'What backup control is for' },
      {
        t: 'p',
        text: 'The primary control at a lift station is a level transmitter feeding a PLC or RTU that runs the lead/lag sequence. Each element in that chain can fail: the transmitter can foul or drift, the analog input can die, the processor can fault, the program can be corrupted by a download gone wrong, and the 24 V supply feeding all of them can quit. Backup control is the arrangement that keeps the well from overflowing while any of those is true.',
      },
      {
        t: 'p',
        text: 'The design principle is independence. Backup does not use the transmitter, does not depend on the processor, and ideally does not depend on the same power supply. It uses floats, which are switches, and relays, which are switches driven by switches. It is deliberately dumb, because a dumb system has few ways to fail and its failures are visible.',
      },
      { t: 'h2', text: 'The layers' },
      {
        t: 'table',
        caption: 'What fails and what covers it',
        head: ['Failure', 'What the station loses', 'What covers it'],
        rows: [
          ['Level transmitter fouled, drifted, or dead', 'Continuous level; the primary sequence acts on a wrong value', 'Signal validation in the PLC, then float operation through the PLC when it gives up on the transmitter'],
          ['Analog input card', 'Continuous level', 'Same: floats through the PLC if the processor is alive, through relays if it is not'],
          ['PLC processor faulted or powered off', 'The whole sequence', 'Control transfer relay drops out; floats run the pumps through relay logic'],
          ['PLC 24 V supply', 'Transmitter, inputs, processor', 'Relay logic on control transformer power, not on the PLC supply'],
          ['SCADA communications', 'Remote visibility and alarms', 'Nothing in the pump control depends on SCADA; local alarm and autodialer cover notification'],
          ['Site power', 'Everything', 'Generator and transfer switch; a power backup rather than a control backup, covered on its own page'],
          ['Both pumps', 'Pumping', 'Portable pump connection and bypass; a control matter only in that the panel must be able to run a portable pump'],
        ],
      },
      { t: 'h2', text: 'Float backup logic' },
      {
        t: 'p',
        text: 'The minimum float set for backup is three floats: a redundant-off float, a backup-start float, and the high-level float. Many stations add a lead-start float so that backup mode has its own lead and lag. The floats operate relays, and the relay contacts are wired in parallel with the controller outputs in the starter control circuits, so either the PLC or the floats can close the pump call.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Backup start', text: 'The backup-start float closes on rise and picks a start relay. Through the control transfer relay contacts, the start relay calls the pumps. A relay alternator can share the duty; without one, backup mode calls both pumps, which is acceptable for a mode that is supposed to be rare.' },
          { title: 'Seal-in', text: 'The start relay seals in through its own contact and the redundant-off float, so the pumps keep running as the level falls below the start float.' },
          { title: 'Backup stop', text: 'The redundant-off float opens on fall and drops the seal-in. The pumps stop. This float is set at or slightly above the primary all-off setpoint, and it is the only thing in backup mode that stops the pumps.' },
          { title: 'High level', text: 'The high-level float calls the pumps through the same path and raises the alarm, so it acts as a second backup start if the backup-start float has failed.' },
          { title: 'Low-level cutoff', text: 'Where the station has a separate low-level float, it opens the run path in every mode, primary and backup, so a controller fault and a float fault together still cannot run a pump dry.' },
        ],
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Backup run path, drawn as a ladder',
        code: `   CTR (PLC       Backup-Start                                       CR1
   healthy)       Float                                            Backup Run
|----]/[------+------] [------+---------------------------------------( )----|
|             |               |                                              |
|             |   CR1   Redundant-Off Float                                   |
|             +---] [------] [-+                                              |
|                 (seal-in: holds until the well is pumped down)              |

   CR1          HOA in AUTO    Low-Level Cutoff                       M1
|---] [----+-------] [--------------] [--------------------------------( )----|
|          |                                                                  |
|  PLC     |                                                                  |
| Out 1    |                                                                  |
|---] [----+                                                                  |
   (either the controller or the backup relay can call the pump)`,
      },
      {
        t: 'p',
        text: 'The high-level float is not shown; it parallels the backup-start float. The figure shows the two ideas that matter: the backup path is enabled only when the PLC is not healthy, and the backup path stops on a float that the PLC has nothing to do with.',
      },
      { t: 'h2', text: 'The control transfer relay' },
      {
        t: 'p',
        text: 'The cleanest way to hand control between primary and backup is a single relay driven by a PLC output that the program holds on while it is running correctly. The output is the watchdog. If the processor faults, stops scanning, loses power, or is put into program mode, the output drops, the relay de-energizes, and its contacts transfer the pump call path from the PLC outputs to the float relays.',
      },
      {
        t: 'p',
        text: 'Some designs leave the float path always enabled rather than transferring it, so the floats can call the pumps at any time in parallel with the PLC. That is simpler and it works, but it has a side effect: a float that trips during normal operation quietly overrides the sequence, the PLC does not know why the pumps are running, and a failed-closed float runs the pumps continuously until the redundant-off float stops them. With a transfer relay, the floats are read by the PLC as inputs during normal operation and alarmed if they disagree with the transmitter, and they only take charge when the PLC is gone.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Alarm the transfer',
        text: 'Bring the control transfer relay state back to SCADA through a path that does not need the PLC, such as an autodialer input or a spare RTU input. Backup mode is a station running with no continuous level, no history, and no lead/lag. It is a call-someone-now condition, even though the pumps are running.',
      },
      { t: 'h2', text: 'Power for the backup' },
      {
        t: 'p',
        text: 'Feed the backup relays and the floats from the panel control transformer, on their own fused circuit, not from the 24 V DC supply that feeds the PLC. If the PLC supply fails, the backup must not fail with it. Where the floats are intrinsically safe, the barrier or relay must also be on that circuit. If the entire control circuit is 24 V DC, use two supplies with the backup relays on the second, or at least a separate branch of the first with its own fuse, and record the shared failure as a known limitation.',
      },
      { t: 'h2', text: 'Testing backup control' },
      {
        t: 'p',
        text: 'A backup that has never taken over has not been proven. Test it at commissioning, after any change to the panel or the program, and annually.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Announce the test', text: 'Tell the SCADA operators, and make sure the well has room. The well will rise to the backup-start float during the test.' },
          { title: 'Confirm the starting state', text: 'Pumps in AUTO, PLC running, floats hanging free. Note the level.' },
          { title: 'Kill the primary', text: 'Put the PLC in program mode or pull its power. Confirm the control transfer relay drops and the backup-mode alarm reaches SCADA or the dialer.' },
          { title: 'Let the well rise', text: 'Or lift the backup-start float by hand from the hatch. Confirm the pumps start.' },
          { title: 'Let it pump down', text: 'Confirm the pumps stop on the redundant-off float and not before. Lower the float by hand if the well cannot be pumped that low during the test.' },
          { title: 'Test the high-level float', text: 'Lift it. Confirm the alarm and the pump call.' },
          { title: 'Restore the primary', text: 'Return the PLC to run mode. Confirm the transfer relay picks up, the backup relays drop out, the sequence resumes on the transmitter, and the alarms clear. Record the test with the date, the tester, and the levels observed.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Test the failure, not just the floats',
        text: 'Lifting floats with the PLC running proves the floats and the PLC inputs. It does not prove that the relays take over when the PLC is dead. The test that matters is the one where the controller is actually stopped.',
      },
    ],
    faqs: [
      {
        q: 'Is a second PLC better than floats for backup?',
        a: 'A second PLC needs a level signal, a program, and a power supply, so it shares more failure modes with the primary than floats do, and it has to be kept in step with every program change. It is the right answer for large stations where backup mode needs real lead/lag and alarming. For a typical duplex station, floats and relays give better independence for far less complexity.',
      },
      {
        q: 'Can the backup be a dedicated pump controller with its own floats?',
        a: 'Yes, and packaged float-backup controllers exist for exactly this. Treat them as relay logic in a box: check that they run on control transformer power, that they take over on a watchdog or transfer contact rather than fighting the PLC, and that they stop on a float you can test.',
      },
      {
        q: 'Should backup mode alternate the pumps?',
        a: 'It is nice to have and not necessary. Backup mode is a rare state that should end when someone arrives. A relay alternator in the backup path is inexpensive if the panel is being built; adding one to an existing panel is rarely worth the wiring change. Calling both pumps on the backup-start float is acceptable.',
      },
      {
        q: 'What if the transmitter fails but the PLC is fine?',
        a: 'That is the more common case, and it is handled in the PLC: the signal validation logic detects the bad signal, alarms it, and the program falls back to running the sequence on the float inputs it already reads. The relay backup is for the case where the PLC itself cannot do that.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/high-level',
      '/controls/instrumentation/level/floats',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/engineering-library/checklists/sat',
      '/controls/control-panels/pump-panels/hoa',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-pump-control/level-pid',
    kind: 'reference',
    title: 'Wet Well Level PID Control',
    summary:
      'Holding a wet well level with a variable speed pump instead of bang-bang control: the loop structure, the minimum speed floor, the stop and restart logic at low inflow, tuning for a slow integrating process, and where level PID is the wrong idea.',
    answer:
      'Wet well level PID control varies pump speed to hold the level at a setpoint, so the pump runs continuously at a speed that matches inflow instead of cycling between start and stop points. The loop is direct acting, runs slowly, and needs a minimum speed floor from the pump curve, a stop-and-restart rule for inflow below what minimum speed moves, and a hand-off to lead/lag when one pump at full speed cannot keep up. It suits stations on long force mains and downstream plants that want steady flow; it is the wrong choice where a tank gains nothing from it.',
    keyPoints: [
      'A wet well is an integrating process: the level keeps moving until pumping equals inflow. That changes the tuning.',
      'The controller output never goes below the minimum speed that moves water. The floor is from the pump curve, not the drive default.',
      'Below the minimum-speed flow the station must cycle. Design the stop and restart deliberately.',
      'Lead/lag still exists. PID controls the speed; staging logic decides how many pumps run.',
      'Direct acting: level up, speed up. Tune slow, with mostly proportional and a long integral.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Wastewater', 'Pumps', 'PID', 'VFD', 'Level'],
    blocks: [
      { t: 'h2', text: 'What level PID changes' },
      {
        t: 'p',
        text: 'With constant-speed pumps, a wet well is emptied in bursts: the level rises to lead-on, the pump runs at full capacity until all-off, and the level rises again. The force main sees flow at pump capacity or nothing. With a variable speed pump under level control, the controller holds the level near a setpoint by running the pump at whatever speed matches the inflow, so the discharge is continuous and roughly equal to what is coming in.',
      },
      {
        t: 'p',
        text: 'That steadiness is the reason to do it. A treatment plant fed by several pumped stations sees a smooth influent instead of a series of slugs, which helps every downstream process from screening to clarification. A long force main runs at a steadier velocity. A small wet well that would otherwise exceed its starts-per-hour rating runs one pump continuously. The cost is a drive per pump, its heat and complexity, and a control problem that is less obvious than it looks.',
      },
      { t: 'h2', text: 'Why the tuning is different' },
      {
        t: 'p',
        text: 'Most loops a utility tunes are self-regulating: change the pump speed on a pressure loop and the pressure settles at a new value. A wet well is not. If pumping is slightly less than inflow, the level rises, and keeps rising, without limit. If pumping is slightly more, the level falls until the well is empty. The level only stops moving when pumping exactly equals inflow. That is an integrating process, and it behaves differently under PID control.',
      },
      {
        t: 'ul',
        items: [
          'Proportional action does most of the work. A level above setpoint means speed up in proportion; the level itself is the accumulated error.',
          'Integral action must be weak, with a long reset time. Integral on an integrating process is a double integration, and too much of it produces slow, large oscillations of level that take hours to die out.',
          'Derivative is rarely useful. The level signal is noisy in a turbulent well and the process is slow.',
          'The loop can be tuned for a slow response with no harm. A level that drifts a foot above setpoint during a storm is not a problem; a pump speed that hunts up and down every minute is.',
          'A deadband around setpoint, where the controller holds its output, keeps the speed steady when the level is close enough and the signal is noisy.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'A level setpoint is a soft target',
        text: 'Unlike pressure or chlorine residual, the wet well level does not need to be held precisely. The purpose of the loop is a steady discharge, and a loop tuned tightly to hold level to the inch will chase every wave and defeat that purpose. Tune it loose, let the well do its job as a buffer, and judge it by how smooth the speed trend is.',
      },
      { t: 'h2', text: 'The loop structure' },
      {
        t: 'steps',
        items: [
          { title: 'Validate the level', text: 'The transmitter signal passes through range checks and a short filter before the controller sees it. On a bad signal the loop goes to a defined fallback: float-based operation at fixed speed, or manual at the last good speed, with an alarm.' },
          { title: 'Run the PID', text: 'Direct acting: as level rises above setpoint, output rises. Execution interval of one to five seconds. Output limited between the minimum speed and 100 percent.' },
          { title: 'Apply the minimum speed floor', text: 'The lowest output the loop may send is the speed at which the pump develops enough head to move water into the force main, from the pump curve at the static head plus margin. Below that the pump churns and the level rises anyway.' },
          { title: 'Decide on stop and restart', text: 'When the loop has been at minimum speed for a set time and the level is still falling, inflow is below the minimum-speed flow, and the pump stops. It restarts when the level reaches a restart setpoint above the control setpoint, and the loop resumes with its output initialized at minimum speed. This is a cycle, and the restart setpoint sets its volume; check the starts per hour as for any station.' },
          { title: 'Stage the lag', text: 'When the loop output has been at 100 percent for a set time and the level is above setpoint by a margin, or the level reaches the lag setpoint, the lag pump starts. Two pumps then run at a common speed from the same controller output, or the lead runs at full speed and the loop drives the lag. When the output falls below a stage-down threshold for a set time, the lag stops.' },
          { title: 'Keep the floats', text: 'The high-level float, the backup start, and the redundant-off float are wired as for any station. Level PID is the primary control; the backup control is unchanged.' },
        ],
      },
      { t: 'h2', text: 'Two pumps under PID' },
      {
        t: 'p',
        text: 'Running two pumps at the same variable speed from one controller output keeps both on the same point of their curves and shares the flow evenly. The transition is the delicate part: when the lag starts, the combined capacity jumps, and if the controller output is not adjusted the level drops fast and the loop overreacts. A common approach reduces the output at the moment the lag starts, to roughly what two pumps need to deliver the same flow one was delivering, then lets the loop trim. Stage-down does the reverse. Both transitions get a minimum time between staging events so the station does not add and remove a pump every few minutes.',
      },
      { t: 'h2', text: 'Where level PID is the wrong idea' },
      {
        t: 'table',
        head: ['Situation', 'Why PID does not help', 'What to do instead'],
        rows: [
          ['Large wet well, short force main, plant that does not care about slugs', 'Nothing gained from steady flow; the drive adds cost and heat', 'Constant-speed lead/lag with a well-sized band'],
          ['Mostly static head', 'Pump efficiency falls at reduced speed and the minimum speed is high; the usable speed range is narrow', 'Constant speed, or a soft starter for the starting problem'],
          ['Inflow usually below the minimum-speed flow', 'The station cycles anyway, now with a drive in the loop', 'Constant speed, or a smaller lead pump'],
          ['Force main shared with other stations', 'Steady low-velocity flow from one station lets solids settle; the line needs periodic scouring velocity', 'Level PID with a scheduled full-speed run, or constant speed'],
          ['Grit and rag-heavy influent', 'Low-speed operation clogs impellers faster', 'Periodic full-speed runs in the program, and a minimum speed set higher'],
        ],
      },
      { t: 'h2', text: 'Commissioning checks' },
      {
        t: 'ul',
        items: [
          'Find the actual minimum speed by test: reduce speed until flow stops, note it, add margin, and set the floor.',
          'Trend level, speed, and inflow estimate through a full day. The speed should move slowly with the diurnal pattern; if it saws, the loop is too tight.',
          'Force a low-inflow condition, or wait for one, and confirm the stop and restart logic cycles the pump correctly and the starts per hour are acceptable.',
          'Simulate a storm by raising the setpoint band, and confirm the lag stages in and out without a level excursion to the floats.',
          'Fail the level signal and confirm the fallback and the alarm.',
          'Record the tuning, the minimum speed, and the staging setpoints on the loop sheet.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What setpoint should I use?',
        a: 'Low enough that the well has room above it for a storm before the lag and the high-level float, high enough to keep the pump submerged with margin and, on stations with a large well, high enough that the detention time does not go septic. In practice a setpoint in the lower third of the operating band is common, with the restart setpoint above it and the lag setpoint above that.',
      },
      {
        q: 'Why does the level oscillate slowly over an hour?',
        a: 'Too much integral action on an integrating process. Lengthen the reset time substantially or remove integral entirely; the proportional term alone will hold the level within a band, and the well does not need zero offset.',
      },
      {
        q: 'Should the PID run in the drive?',
        a: 'It can for a single-pump station, and drive PID controllers work. In a duplex or triplex station with lead/lag and staging, the loop, the floor, the stop and restart, and the staging all belong together in the PLC, where they are visible and consistent.',
      },
      {
        q: 'How does level PID interact with the floats?',
        a: 'It does not; the floats are a separate layer. The backup-start and high-level floats call the pumps through the backup relay path and are read by the PLC as inputs; if the level transmitter fails, the program falls back to float operation at a fixed speed. The PID loop is the normal mode, not the safety net.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/controls/control-panels/pump-panels/vfd',
      '/controls/plc-systems/analog-control/pid',
      '/how-to/plc-how-to/create-a-pid-loop',
      '/troubleshooting/pump-troubleshooting/pump-short-cycles',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control',
    kind: 'reference',
    title: 'VFD Pump Control in Wastewater',
    summary:
      'The control modes for a variable speed wastewater pump: level control, flow pacing, fixed speed with soft start, and drawdown modes, plus the wastewater-specific rules: minimum speed, ragging at low speed, force main velocity, and the periodic full-speed run.',
    answer:
      'A variable frequency drive on a wastewater pump is run in one of a few modes: level PID to hold a wet well, flow control to deliver a set rate, or fixed speed with the drive used only for starting. Whichever mode, wastewater imposes rules a clean-water pump does not: a minimum speed high enough to move water and keep solids in suspension, a periodic full-speed run to scour the force main and clear the impeller, ragging protection built on motor current, and a design that keeps the floats and the backup path independent of the drive.',
    keyPoints: [
      'Pick the mode from what the downstream process needs: steady flow, a set rate, or just a gentle start.',
      'Wastewater minimum speed is set by force main velocity and ragging, not only by the pump curve.',
      'Schedule a full-speed run. Low speed all day leaves solids in the main and rags on the impeller.',
      'Use motor current from the drive for clog detection and a de-ragging routine.',
      'The drive is not the safety layer. Floats and relays still call the pumps when the drive or the PLC cannot.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Wastewater', 'Pumps', 'VFD', 'Control'],
    blocks: [
      { t: 'h2', text: 'The control modes' },
      {
        t: 'table',
        head: ['Mode', 'How it works', 'Where it fits', 'Watch for'],
        rows: [
          ['Level PID', 'Speed follows a level controller to hold the wet well at a setpoint', 'Stations feeding a plant or a long force main where steady flow matters', 'Integrating-process tuning; minimum speed; stop and restart at low inflow'],
          ['Flow control', 'Speed follows a flow controller to deliver a set rate, with level as an override', 'Stations that meter into a plant at a permitted or scheduled rate; equalization', 'The wet well still fills; level must override flow before the floats'],
          ['Fixed speed, drive for starting', 'The drive ramps to a fixed speed and runs there; level logic starts and stops as for constant speed', 'Stations that need soft start and inrush control but not speed control', 'The fixed speed is set from the curve, often below 60 Hz to trim an oversized pump'],
          ['Drawdown or pump-down', 'Full speed until the well is pumped to all-off, then stop; drive used for ramping and protection', 'Stations with grit or rags where full velocity every cycle is wanted', 'Same starts-per-hour arithmetic as constant speed'],
          ['Speed by inflow', 'Speed set from an inflow estimate, with level trim', 'Large stations with a good inflow measurement', 'Needs an inflow signal or a drawdown calculation'],
        ],
      },
      {
        t: 'p',
        text: 'A single station may combine them: level PID as the normal mode, a scheduled full-speed run each day, and a flow limit that caps the discharge into a plant during wet weather. The control narrative names the modes and the transitions between them.',
      },
      { t: 'h2', text: 'Minimum speed in wastewater' },
      {
        t: 'p',
        text: 'On a clean-water pump the minimum speed is the point where the pump develops enough head to open the check valve. On a wastewater pump it is usually higher, for two reasons that have nothing to do with the pump curve.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Force main velocity', def: 'Solids settle in a force main below about 2 feet per second, and a line that has settled needs 3 to 5 feet per second to scour. A pump running at a speed that gives 1.5 feet per second all day fills the main with grit until the head rises and the pump loses capacity. The minimum speed is chosen so that the velocity stays above the settling velocity, and where that is not possible at low inflow, the periodic full-speed run does the scouring.' },
          { term: 'Ragging', def: 'Rags wrap an impeller more easily at low speed, where the vane velocity is lower and the flow through the volute is gentle. Stations with a wipes problem run a higher minimum speed and use de-ragging routines.' },
        ],
      },
      {
        t: 'p',
        text: 'The practical floor is often 60 to 75 percent of full speed on a wastewater pump, against the 40 to 50 percent that a clean-water pump on the same curve might allow. That narrows the usable speed range and, at low inflow, means the station cycles; the level PID page covers the stop and restart logic.',
      },
      { t: 'h2', text: 'The full-speed run' },
      {
        t: 'p',
        text: 'A wastewater station on a drive should run at full speed on a schedule: once or twice a day, or on every cycle at low inflow, for long enough to turn over the force main volume. The run scours the line, clears grease from the wet well walls at the drawdown level, and gives the impeller a chance to shed rags. It is also the moment to take a drawdown measurement for the capacity trend. The program schedules it, or triggers it on a level cycle, and it is recorded so that a missed run is visible.',
      },
      { t: 'h2', text: 'Clog detection and de-ragging' },
      {
        t: 'p',
        text: 'A drive reports motor current, torque, and power continuously, and those are the earliest signs of a clog. A pump moving rags draws more current at a given speed than the same pump moving clean water. The program compares the current, or better the power against speed, with a baseline learned from clean operation, and raises a warning when the ratio climbs. Many drives include a pump-cleaning or de-ragging function: on a trigger, the drive runs the pump briefly in reverse, or cycles forward and reverse at low speed, to unwind material from the impeller. Where the pump manufacturer permits reverse rotation, the routine is triggered on the current signature, on a schedule, or on the start of every cycle at stations that clog often. A routine that runs and does not restore the current baseline is an alarm to pull the pump.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Reverse rotation is a pump manufacturer decision',
        text: 'Not every pump may be run in reverse, and some impellers, seals, and threaded connections are damaged by it. Enable a de-ragging routine only with the pump manufacturer statement that the pump tolerates it, and only with the parameters they specify.',
      },
      { t: 'h2', text: 'The drive and the safety layer' },
      {
        t: 'p',
        text: 'A drive adds capability and it adds a failure mode. The design rule does not change: the floats and the relay logic call the pumps when the transmitter, the PLC, or the drive itself cannot. With a drive, that means either a bypass contactor that the float logic can close, or a second pump on its own drive with its own float path, or a hardwired run command to the drive at a preset speed that the float relay can assert without the PLC. Whichever, the backup is tested with the PLC dead, as on the backup control page.',
      },
      { t: 'h2', text: 'Settings to record' },
      {
        t: 'ul',
        items: [
          'Minimum speed and the basis for it: curve, force main velocity, or ragging experience.',
          'Fixed speed, where used, and the reason it is below 60 Hz.',
          'Acceleration and deceleration ramps, chosen for the check valve and the force main.',
          'The full-speed run schedule and duration.',
          'The current or power baseline for clog detection and the warning threshold.',
          'De-ragging parameters and the manufacturer authorization.',
          'The staging setpoints and timers where more than one pump runs.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I run a wastewater pump at 30 Hz to save energy?',
        a: 'Rarely. At 30 Hz a typical wastewater pump makes a quarter of its rated head and will not open the check valve against the static head of most force mains; where it does, the velocity is too low to carry solids. Set the minimum from the curve and the velocity, and expect it to be much higher than the drive default.',
      },
      {
        q: 'Why does the pump clog more since the drive was installed?',
        a: 'Low-speed operation. The impeller runs at a speed where rags wrap easily and the force main velocity lets solids settle. Raise the minimum speed, add a daily full-speed run, and use the drive current to trigger a de-ragging routine or a pull before the well reaches high level.',
      },
      {
        q: 'Should the drive ramp be slow to prevent water hammer?',
        a: 'A deceleration ramp of 10 to 30 seconds lets the check valve close gently and the force main column slow down without a surge. Too slow a ramp keeps the pump running below the speed that moves water. Set it for the check valve and the line, and confirm the pump stops moving water only near the end of the ramp.',
      },
      {
        q: 'Do I need a flow meter for VFD pump control?',
        a: 'Not for level control, and not for fixed speed. Flow control needs a flow measurement or a calculation from speed and the pump curve. A flow meter on the discharge is worth having at any station large enough for a drive, because it gives the capacity trend and the inflow estimate, but it is not a prerequisite.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-pump-control/level-pid',
      '/controls/control-panels/pump-panels/vfd',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/controls/control-panels/pump-panels/soft-starters',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/triplex-lift-stations',
    kind: 'reference',
    title: 'Triplex Lift Station Controls',
    summary:
      'What changes when a station has three pumps: the lead, lag, and standby roles, rotation with three positions, the diminishing return of the third pump on the system curve, availability logic, and the power and panel arrangements that three pumps require.',
    answer:
      'A triplex lift station has three pumps in one wet well, assigned lead, lag, and standby roles that rotate. Two pumps meet the design peak flow and the third is redundancy, or all three are needed at peak and the station accepts reduced capacity with one out. The control sequence adds a third stage to lead/lag, a three-position rotation, and availability logic that reassigns roles when a pump is out of service. The third pump adds less capacity than the second because all three share one force main, and the electrical service, the generator, and the panel are sized for the starting of three motors in sequence.',
    keyPoints: [
      'Roles, not pumps: lead, lag, and standby rotate through all three.',
      'Decide at design whether the third pump is redundancy or capacity. The control sequence differs.',
      'Three pumps on one force main deliver far less than three times one pump.',
      'Availability logic assigns roles among the pumps that can run, and alarms when redundancy is lost.',
      'Starting sequence, generator sizing, and panel layout all scale with the third motor.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Wastewater', 'Lift Stations', 'Pumps', 'Control'],
    blocks: [
      { t: 'h2', text: 'Why three pumps' },
      {
        t: 'p',
        text: 'A duplex station has one pump sized for peak flow and one spare. When peak flow exceeds what one pump can move, or when the utility wants a spare while two pumps run, the station gets a third. Two philosophies exist and they produce different control sequences. In the first, two pumps carry the design peak and the third is standby: the station never needs all three, and losing one changes nothing about capacity. In the second, all three are needed at peak, and losing one means the station is short at the worst moment. The second is cheaper and is common at stations that grew into their flow; the control narrative should say which the station is, because the alarm priorities and the operator response depend on it.',
      },
      { t: 'h2', text: 'Roles and rotation' },
      {
        t: 'p',
        text: 'With three pumps the sequence has three roles. The lead starts first at lead-on. The lag starts at lag-on if level keeps rising. The standby, or second lag, starts at a third setpoint above that, or on a run-time or rate-of-rise call as for a duplex station. Rotation advances all three roles one position at each all-off event, so that over three cycles each pump has been lead, lag, and standby once.',
      },
      {
        t: 'table',
        head: ['Cycle', 'Lead', 'Lag', 'Standby'],
        rows: [
          ['1', 'P1', 'P2', 'P3'],
          ['2', 'P2', 'P3', 'P1'],
          ['3', 'P3', 'P1', 'P2'],
          ['4', 'P1', 'P2', 'P3'],
        ],
      },
      {
        t: 'p',
        text: 'In dry weather the standby pump never runs under this scheme, because the third setpoint is never reached. That is the reason run-hour balancing is more attractive on a triplex station: choosing the lead by lowest run hours pulls the third pump into rotation as lead every third cycle, and the standby role is only idle for the cycle it holds it. A weekly exercise run of whichever pump has not run is the simpler alternative.',
      },
      { t: 'h2', text: 'Availability' },
      {
        t: 'p',
        text: 'The availability rule from a duplex station generalizes. Build the ordered list of pumps that are in AUTO, not faulted, not locked out, and not failed to prove. Assign lead, lag, and standby down that list from the current rotation point. With two available, the station runs as a duplex and the loss of redundancy is alarmed. With one available, that pump is lead every cycle, and the alarm is higher priority because a second failure is an overflow. A pump that fails to prove while holding a role is dropped and the roles below it move up immediately, not at the next cycle.',
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'Role assignment with availability, in structured text',
        code: `(* Roles from availability and rotation. Rotation advances 0,1,2 at each all-off. *)
Avail_Count := 0;
FOR i := 1 TO 3 DO
    IF Pump[i].Available THEN
        Avail_Count := Avail_Count + 1;
        Avail_List[Avail_Count] := i;
    END_IF;
END_FOR;

(* Rotate the available list by the rotation pointer, then assign roles in order. *)
FOR r := 1 TO Avail_Count DO
    idx := ((r - 1 + Rotation) MOD Avail_Count) + 1;
    Role[Avail_List[idx]] := r;       (* 1 = lead, 2 = lag, 3 = standby *)
END_FOR;

Redundancy_Lost := Avail_Count < 3;
Station_Critical := Avail_Count < 2;`,
      },
      { t: 'h2', text: 'The third pump on the system curve' },
      {
        t: 'p',
        text: 'Three pumps discharging into one force main each see the head that the combined flow produces. The friction loss rises with the square of flow, so each added pump slides further up its curve and delivers less. A representative station might see 1,000 gpm with one pump, 1,600 with two, and 1,950 with three: the third pump adds about a third of what the first one did. On a long force main it can be less. That has two consequences. The station wet weather capacity comes from the system curve, not from three nameplates, and the third stage setpoint should be placed with the understanding that it buys less time than the second did. Where the third pump was bought for capacity rather than redundancy, the system curve is the check on whether it delivers it.',
      },
      { t: 'h2', text: 'Electrical and panel' },
      {
        t: 'ul',
        items: [
          'Starting: the three motors start in sequence with a delay between them, never together. On a generator the delay lets the set recover voltage and frequency between starts, and the generator is sized for two motors running when the third starts across the line, or for the reduced inrush of soft starters or drives.',
          'Service: the service and the main are sized for all three running, since on the day it matters they will be.',
          'Panel: three starters or drives, three HOAs, three sets of seal-leak and thermal monitoring, and a controller with the I/O for all of it, in an enclosure whose heat calculation includes three drives if drives are used.',
          'Backup: the float backup path calls pumps through relay logic as for a duplex station, usually calling two on the backup-start float and the third on the high-level float, subject to the redundant-off float.',
          'Force main: air release at high points and a check valve per pump; a common discharge header with isolation valves so any pump can be removed with the other two in service.',
        ],
      },
      { t: 'h2', text: 'What to trend and alarm' },
      {
        t: 'table',
        head: ['Signal', 'Why', 'Alarm'],
        rows: [
          ['Run hours per pump', 'Proves rotation and shows the standby is exercised', 'Imbalance beyond a set ratio'],
          ['Starts per hour per pump', 'Cycle sizing with three stages', 'Above the motor rating'],
          ['Available pump count', 'The redundancy state', 'Under 3 medium, under 2 high'],
          ['Third-stage calls per day', 'A rising count means the station is losing capacity or inflow is growing', 'Above a baseline'],
          ['Level with all three run statuses', 'Every sequence problem shows here', 'Standard level alarms plus the floats'],
          ['Motor current per pump', 'Clog and wear detection', 'Deviation from the baseline at a given speed'],
        ],
      },
    ],
    faqs: [
      {
        q: 'Should all three pumps be identical?',
        a: 'Yes, for rotation, spares, and predictable parallel operation. A station with two large pumps and one small jockey is a different design: the jockey is always lead and the large pumps alternate as lag and standby, and the rotation logic handles only two of them.',
      },
      {
        q: 'How far apart should the three level setpoints be?',
        a: 'Lead-on above all-off by the cycle volume, lag-on far enough above lead-on that daily peaks never reach it, and the third stage far enough above lag-on that it is reached only in wet weather, with the high-level float above that. In a shallow well the three setpoints get crowded, which is a reason to use run-time and rate-of-rise calls for the second and third stages instead of level alone.',
      },
      {
        q: 'Why does the third pump rarely run even in storms?',
        a: 'Either the third stage setpoint is above where the well ever reaches, which may be fine if two pumps handle the peak, or the third pump adds so little on the system curve that the level stops rising before it is called. Check the system curve and the trend from the last event; if the pump was bought for capacity, it may not be delivering it.',
      },
      {
        q: 'Is a triplex station better than a duplex with bigger pumps?',
        a: 'A triplex gives finer staging and true redundancy at peak; a duplex with larger pumps is simpler and cheaper. The choice depends on the flow range, the force main, and the consequence of being short at peak. A duplex sized for peak with variable speed pumps often covers the same range with less equipment.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-alternation',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/controls/control-panels/pump-panels/soft-starters',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/generator-operation',
    kind: 'reference',
    title: 'Lift Station Generator Operation',
    summary:
      'Standby power at a lift station: what the transfer switch does, how the controls ride through the transfer, staggered pump restarts, what SCADA should see, load testing, and the portable generator connection.',
    answer:
      'A lift station generator starts on utility failure, the automatic transfer switch moves the load to it after a short delay, and the pumps restart in a staggered sequence sized for what the generator can carry. The controls ride through the transfer on a UPS or by a defined restart, the generator status and transfer position are alarmed to SCADA, the set is exercised on a schedule under load, and stations without a permanent generator have a manual transfer switch and a receptacle for a portable set.',
    keyPoints: [
      'The transfer switch, not the generator, decides when the station is on standby power. Alarm both.',
      'Stagger pump starts on the generator. Two motors starting together can stall a set sized for the running load.',
      'The PLC rides through the outage on a UPS or restarts cleanly. Either is designed, never assumed.',
      'Exercise under load, not just a no-load run. A generator that starts is not a generator that pumps.',
      'Stations without a generator need a manual transfer switch, a receptacle, and a documented time to overflow.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Wastewater', 'Lift Stations', 'Power', 'Control'],
    blocks: [
      { t: 'h2', text: 'The sequence' },
      {
        t: 'steps',
        items: [
          { title: 'Utility fails', text: 'The transfer switch senses loss of voltage on the utility source, waits a short delay to ride through momentary dips, typically one to three seconds, then signals the generator to start.' },
          { title: 'Generator starts', text: 'The set cranks, runs up, and reaches rated voltage and frequency. Ten to fifteen seconds is typical for a diesel set; the transfer switch waits until the generator source is within limits.' },
          { title: 'Transfer to generator', text: 'The switch opens the utility contacts and closes the generator contacts. Where the switch is open-transition, the station is dark for a fraction of a second. Where it is closed-transition, which is rare at lift stations, the sources are briefly paralleled.' },
          { title: 'Loads return', text: 'Control power is restored, the PLC boots or resumes, and the pump sequence restarts. The pumps that were running before the outage are called again, staggered.' },
          { title: 'Utility returns', text: 'The switch senses utility voltage, waits a return delay of several minutes so a brief return does not cause a transfer back and forth, then retransfers. The generator runs unloaded for a cooldown period and stops.' },
        ],
      },
      {
        t: 'p',
        text: 'Every step has a timer, and every timer is a setting on the transfer switch or the generator controller that should be recorded. A retransfer delay that is too short causes repeated transfers during a flickering utility restoration; a start delay that is too long lets the well rise before the pumps come back.',
      },
      { t: 'h2', text: 'Starting pumps on a generator' },
      {
        t: 'p',
        text: 'A generator has a limited ability to supply the inrush current of a motor start. A set sized for the station running load will stall, or trip on underfrequency, if two motors start together or a large motor starts across the line without margin. The controls therefore stagger the restarts.',
      },
      {
        t: 'ul',
        items: [
          'After transfer, the PLC delays the first pump start a few seconds to let the generator settle, then starts the lead, waits for it to reach speed and for the generator to recover, and only then allows the lag if the level calls for it.',
          'The delay between starts on generator power is longer than on utility power, and the program knows which source it is on from the transfer switch position input.',
          'Soft starters and drives reduce the inrush and let a smaller generator start a larger pump; the generator manufacturer sizing tool accounts for the starting method.',
          'Loads that are not needed during an outage, such as heaters and receptacles, can be shed by the PLC or by the transfer switch load management when on generator.',
          'On a generator with limited capacity, the program may hold the station to one pump and accept a higher level until utility returns. That decision is in the control narrative and is alarmed.',
        ],
      },
      { t: 'h2', text: 'The controls during the transfer' },
      {
        t: 'p',
        text: 'Between the utility failing and the generator carrying the load, the station has no power for ten to twenty seconds. What the PLC and the instruments do during that gap is a design choice.',
      },
      {
        t: 'table',
        head: ['Approach', 'Behavior', 'Note'],
        rows: [
          ['UPS on control power', 'The PLC, the radio, and the level transmitter ride through; the program sees the transfer switch change state and manages the pump restarts; SCADA sees the whole event', 'The usual choice for a station with a permanent generator; the UPS needs to be sized for the transfer time plus margin, and its battery is a maintenance item'],
          ['Clean restart', 'The PLC boots when power returns, initializes from retentive memory, and restarts the sequence; the transfer is invisible to it except by the power-cycle event', 'Acceptable where the program handles a restart deliberately: alternation state retained, timers reset, outputs off until the sequence decides'],
          ['Float backup during the gap', 'Irrelevant during the gap, since there is no power; matters if the PLC does not come back', 'The float relay path is on control power and works as soon as the generator carries the load'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Test the restart',
        text: 'Kill the utility at the station during commissioning and at every annual test, with the well at a normal level, and watch the whole sequence: start delay, transfer, PLC recovery, staggered pump restarts, SCADA alarms, retransfer, and cooldown. A generator that has only been exercised at no load has never been proven to run the station.',
      },
      { t: 'h2', text: 'What SCADA should see' },
      {
        t: 'ul',
        items: [
          'Utility power available, from the transfer switch or a voltage monitor.',
          'Transfer switch position: normal or emergency. This is the alarm that says the station is on standby power.',
          'Generator running, from the set controller.',
          'Generator fault or fail to start, from the set controller, as a high priority alarm because the station is now on the utility clock with no backup.',
          'Fuel level, for diesel sets, with a low alarm that gives time for delivery.',
          'Battery charger and starting battery voltage, because a dead starting battery is the most common reason a generator does not start.',
          'Not in auto: the generator controller or the transfer switch left in a manual or off position after service.',
        ],
      },
      {
        t: 'p',
        text: 'Many generator controllers speak Modbus and provide all of this on one connection; the hardwired minimum is transfer position, generator running, and generator fault.',
      },
      { t: 'h2', text: 'Exercise and maintenance' },
      {
        t: 'p',
        text: 'Standby generators are run on a schedule so that they start when needed. A weekly or monthly no-load exercise proves starting, and a periodic exercise under load, either by transferring the station to the generator or by a load bank, proves the set can carry the pumps. Diesel sets exercised only at no load suffer wet stacking, where unburned fuel accumulates in the exhaust. The transfer switch usually provides the exercise timer, and the PLC can log the run and alarm a missed or failed exercise. Fuel age, battery condition, coolant heaters, and the transfer switch contacts are the maintenance items that decide whether the set works on the day.',
      },
      { t: 'h2', text: 'Stations without a permanent generator' },
      {
        t: 'p',
        text: 'Small stations often have no generator and rely on a portable set brought by the crew. The design then includes a manual transfer switch that isolates the utility and connects a generator receptacle, sized and labeled for the set the utility owns, and a documented time to overflow at typical and wet weather inflow, so the utility knows how long it has. The high-level alarm and the power failure alarm at such a station are what start the clock, and both must reach someone through a path that does not depend on station power: a cellular dialer with its own battery, or the SCADA radio on a UPS.',
      },
    ],
    faqs: [
      {
        q: 'Why did the station overflow with the generator running?',
        a: 'Usually one of three things: the generator ran but the transfer switch did not transfer, the pumps restarted together and the set stalled or tripped, or the PLC did not restart the sequence after the power cycle. The transfer position, the generator alarms, and the pump run statuses in the SCADA history show which. Each is found by a load test that was not done.',
      },
      {
        q: 'How big should the generator be?',
        a: 'For the running load of the pumps that must operate during an outage, plus the starting inrush of the largest pump with the others running, plus the station auxiliaries, using the generator manufacturer sizing tool with the actual starting method. A soft starter or a drive on the pumps can reduce the set size substantially. Sizing for all pumps starting together is the mistake that oversizes the set, and sizing for running load only is the mistake that stalls it.',
      },
      {
        q: 'Should the PLC be on a UPS?',
        a: 'At a station with a permanent generator, yes, sized for the transfer time and the radio, so the utility sees the event as it happens and the program controls the restart. Without a generator, a UPS keeps the alarms and the radio alive long enough to report the outage and the high level, which is the point.',
      },
      {
        q: 'What is the retransfer delay for?',
        a: 'A utility restoration is often unstable for the first minutes. The delay keeps the station on the generator until the utility has been steady for a set time, commonly five to thirty minutes, so the station is not transferred back and forth. It is set on the transfer switch and recorded.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/water-wastewater/wastewater-systems/lift-stations/high-level',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/controls/control-panels/pump-panels/soft-starters',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/controls/scada-hmi/alarm-management/notification',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-pumping/well-pumps',
    kind: 'reference',
    title: 'Well Pump Control',
    summary:
      'Controlling a groundwater well: submersible and line-shaft turbine pumps, the pump-to-waste start, drawdown and the low-water cutoff, cycling limits from the well and the aquifer, and what the controller monitors to protect a pump that cannot be seen.',
    answer:
      'A well pump lifts groundwater from a submersible or a line-shaft turbine pump set hundreds of feet down a casing, and its controls protect a pump that cannot be inspected: a low-water cutoff from a level probe or a transducer keeps it from pumping the well dry, a pump-to-waste period at each start discards the first minutes of turbid water, minimum run and off times respect the motor and the aquifer, and the controller monitors current, flow, and drawdown for the slow signs of a failing pump or a declining well.',
    keyPoints: [
      'The pump is at the bottom of a hole. Everything the controller knows comes from current, flow, pressure, and level.',
      'Low-water cutoff is the protection. A submersible run dry is destroyed in minutes.',
      'Pump to waste at start until turbidity and residual are acceptable, then to the system.',
      'Starts are expensive on a large submersible. The cycle is set by the tank, not the well.',
      'Trend drawdown and specific capacity. A well declines slowly, and the trend is the only warning.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Water', 'Pumps', 'Control', 'Level'],
    blocks: [
      { t: 'h2', text: 'What is down the hole' },
      {
        t: 'p',
        text: 'A production well is a cased hole to an aquifer, with a screen at the bottom where the water enters. The pump is either a submersible unit, a multistage centrifugal pump coupled to a sealed motor, both hanging on the drop pipe with the power cable strapped alongside, or a line-shaft vertical turbine, whose bowls are down the well and whose motor is at the surface, driving them through a shaft in the column. A check valve above the pump holds the column full when the pump stops. A sounding tube or a transducer measures the water level. At the surface: the discharge head, a flow meter, a pump-to-waste valve and line, a sample tap, chemical injection, and the panel.',
      },
      {
        t: 'p',
        text: 'None of it can be seen. A submersible pulled for inspection is a crane, a crew, and a day. The controls are designed on the assumption that the pump will be protected by what the panel can measure, and that its condition will be inferred from trends rather than observed.',
      },
      { t: 'h2', text: 'The start sequence' },
      {
        t: 'steps',
        items: [
          { title: 'Call', text: 'From the tank level, the system pressure, or a schedule, through the permissives: water level above the cutoff, no fault, HOA in AUTO, minimum off time elapsed.' },
          { title: 'Pump to waste', text: 'The pump starts with the discharge directed to waste through a valve, or with the to-system valve closed and the waste valve open. The first minutes of pumping carry sand, turbidity, and air from the column and the screen. The period is a timer, typically two to fifteen minutes, or a turbidity measurement, or both.' },
          { title: 'Transfer to the system', text: 'The to-system valve opens, then the waste valve closes, in an order that never dead-heads the pump. Chemical feed starts with the flow.' },
          { title: 'Run', text: 'At fixed speed, or under pressure or flow control with a drive. Current, flow, pressure, and level are monitored against their expected values.' },
          { title: 'Stop', text: 'On the stop call, subject to minimum run time. On a drive, a slow ramp down lets the check valve close gently and the column settle; on across-the-line, a slow-closing valve or a surge relief handles the column.' },
          { title: 'Minimum off', text: 'The pump does not restart for a set time, typically several minutes, so the motor cools and the aquifer recovers.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Never dead-head the pump',
        text: 'A well pump running against closed valves heats the water in the bowls and, on a submersible, the motor that the water is supposed to cool. The valve sequence at transfer opens the new path before closing the old, and the controller alarms and stops the pump if flow is not confirmed within a short time after start.',
      },
      { t: 'h2', text: 'Protections' },
      {
        t: 'table',
        head: ['Protection', 'Signal', 'Setting and note'],
        rows: [
          ['Low-water cutoff', 'A level transducer, a conductivity probe set above the pump intake, or an airline', 'Stops the pump when the pumping level nears the intake, with a restart above it after a delay. The single most important protection.'],
          ['Fail to prove flow', 'Flow meter or discharge pressure', 'Pump running and no flow within 30 to 60 seconds: stop and alarm. Catches a broken shaft, a dropped pump, an air lock, a closed valve.'],
          ['Overcurrent and undercurrent', 'Motor current from the starter or drive', 'High: a jammed or sanded pump, a failing motor. Low: a broken shaft or coupling, a pump running in air. Both against a baseline.'],
          ['Phase monitoring', 'Phase monitor relay', 'Loss, reversal, imbalance, and undervoltage; reversal on a submersible runs it backward and unscrews some couplings.'],
          ['Motor thermal', 'A thermal sensor where fitted, or a thermal model in the drive', 'Submersible motors depend on water flow past them for cooling; a thermal alarm at low flow is real.'],
          ['Insulation resistance', 'A periodic test with power off', 'A submersible cable and motor that trend downward are on the way out. Test on a schedule and trend it.'],
          ['Starts per hour', 'A counter in the controller', 'Large submersibles are limited to a handful of starts per hour and the cycle is designed around that.'],
        ],
      },
      { t: 'h2', text: 'Drawdown and the aquifer' },
      {
        t: 'p',
        text: 'When a well pump runs, the water level in the casing falls from the static level to a pumping level, and the difference is the drawdown. The flow divided by the drawdown is the specific capacity of the well, in gallons per minute per foot, and it is the health measurement of the well itself. As a screen clogs with mineral scale or biological growth, the drawdown at a given flow increases and the specific capacity falls, over months and years. A controller that records the static level before each start, the pumping level after a set run time, and the flow, produces the specific capacity trend, and that trend tells the utility when to rehabilitate the well before it can no longer meet demand.',
      },
      {
        t: 'p',
        text: 'The pumping level also sets the low-water cutoff margin. A well whose pumping level has fallen toward the pump intake is a well whose cutoff will start tripping, and the response is well rehabilitation, a lower pump setting, or a reduced flow, not a lower cutoff setpoint.',
      },
      { t: 'h2', text: 'Control modes' },
      {
        t: 'dl',
        items: [
          { term: 'Tank level', def: 'The common mode: the well fills a ground or elevated tank, starting at a low level and stopping at a high level, with the band set for the well cycling limits. The tank level control page covers the setpoints.' },
          { term: 'System pressure', def: 'A well pumping directly into distribution, with a hydropneumatic tank or a drive holding pressure. Cycling is the risk; the tank or the drive minimum speed manages it.' },
          { term: 'Flow control with a drive', def: 'The well delivers a set flow to a treatment process or blends with other sources. The drive minimum speed and the pump curve down the well set the range; a submersible at low speed loses cooling flow.' },
          { term: 'Schedule and rotation', def: 'Multiple wells run in rotation to share the drawdown across the well field and to exercise every pump. The rotation logic is the lead/lag logic with wells as the pumps.' },
        ],
      },
      { t: 'h2', text: 'What to trend' },
      {
        t: 'ul',
        items: [
          'Static level, pumping level, flow, and the calculated specific capacity, per run and over years.',
          'Motor current and power against flow, for a sanded pump or a worn stage.',
          'Run hours and starts, against the motor limits.',
          'Pump-to-waste duration and the turbidity at transfer, for a screen that is shedding more.',
          'Insulation resistance from each test, for the cable and motor.',
          'Discharge pressure at a fixed flow, for a check valve or a column leak.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why pump to waste at every start?',
        a: 'The first water out of a well after the pump has been off carries sand and sediment that settled in the column and the screen, and air from the column. Sending it to the system delivers turbid water and fouls meters and chemical feed. A few minutes to waste, until a turbidity reading or a timer says the water is clear, is standard practice, and some regulators require it.',
      },
      {
        q: 'How is a low-water cutoff set?',
        a: 'From the pump setting and the manufacturer minimum submergence: the pump intake depth, plus the submergence required for cooling and to prevent vortexing, is the cutoff level. The transducer or probe is placed there, with a restart level enough above it that the well has recovered before the pump runs again.',
      },
      {
        q: 'Should a well pump be on a drive?',
        a: 'When the well is the source for a process that needs a controlled flow, or when pressure must be held without a large tank, yes. For a well that fills a tank, a drive adds cost and heat for little benefit, and a submersible at reduced speed can lose the cooling flow past its motor. Fixed speed with a soft starter for the column surge is common.',
      },
      {
        q: 'What does a falling current with normal flow mean?',
        a: 'Usually a worn pump: the impellers and bowls have lost clearance, the pump does less work at the same speed, and the flow will follow the current down. A sudden drop with no flow is a broken shaft or a dropped pump. Compare with the baseline and the flow.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/controls/instrumentation/level/hydrostatic-level',
      '/controls/control-panels/pump-panels/soft-starters',
      '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/troubleshooting/pump-troubleshooting/pump-will-not-start',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-pumping/booster-pumps',
    kind: 'reference',
    title: 'Booster Pump Stations',
    summary:
      'Inline stations that raise pressure from one zone to another: suction pressure protection, discharge pressure control with drives, staging, the hydropneumatic tank alternative, surge and check valve behavior, and the interlocks that keep a booster from collapsing the zone it draws from.',
    answer:
      'A booster pump station takes water from a lower pressure zone or a tank and delivers it to a higher zone at a controlled pressure. Its controls hold discharge pressure with variable speed pumps staged to the demand, protect the suction side with a low suction pressure cutoff so the station cannot draw the lower zone below its minimum, manage the transitions so the higher zone sees no surge, and provide a bypass or a standby path for when the station stops. The suction interlock is the one that matters most and is most often set wrong.',
    keyPoints: [
      'Discharge pressure is the controlled variable. Suction pressure is the interlock that protects the zone behind the station.',
      'Low suction cutoff, with a delay and a restart pressure, before the lower zone drops below its minimum.',
      'Drives and staging as for any pressure station, with a check valve per pump and a bypass around the station.',
      'A hydropneumatic tank replaces the drive for very small stations and adds a cycle to manage.',
      'Trend suction and discharge together. The difference is the station; the suction alone is the zone.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Pumps', 'PID', 'VFD', 'Control'],
    blocks: [
      { t: 'h2', text: 'What the station does' },
      {
        t: 'p',
        text: 'Distribution systems are divided into pressure zones by elevation. Water reaches the higher zones through booster stations: pumps installed in the main, taking suction from the lower zone and discharging into the higher one, or from a ground storage tank into a zone above it. Unlike a plant high-service station, an inline booster has no reservoir of its own on the suction side; it is drawing from a pressurized main that other customers share. That is the defining control problem: the station can hold its discharge pressure perfectly while pulling the suction zone down to the point where customers behind it lose pressure and the main goes negative.',
      },
      { t: 'h2', text: 'Discharge control' },
      {
        t: 'p',
        text: 'The discharge side is a pressure control station, and the pressure control page covers the loop: a pressure transmitter downstream of the check valves, a drive on each pump, a PID loop holding setpoint, staging on output and time, a minimum speed, and a deadband. Booster-specific settings follow from the zone above. The setpoint may vary by time of day where the upper zone has a tank that fills at night, and the loop may be given a flow limit so that the station cannot deliver more than the upper zone main can take.',
      },
      { t: 'h2', text: 'Suction protection' },
      {
        t: 'p',
        text: 'The suction pressure transmitter is the most important instrument in the station. It protects the zone the station draws from and it protects the pumps from cavitation.',
      },
      {
        t: 'table',
        head: ['Function', 'Setting', 'Behavior'],
        rows: [
          ['Low suction pressure alarm', 'A few psi above the cutoff', 'Alarm to SCADA; the station keeps running'],
          ['Low suction pressure cutoff', 'The lower zone minimum pressure at the station, commonly around 20 psi where that is the required minimum at the customer, with margin for the elevation difference', 'After a short delay of a few seconds to ride through transients, the pumps stop or reduce speed to a minimum; the station does not restart until suction recovers to a restart pressure with a delay'],
          ['Suction pressure limiting', 'A second controller or an override', 'Instead of stopping, the station reduces speed to hold suction at the minimum, giving the upper zone what the lower can spare. Better than a cutoff where a stop would empty the upper zone'],
          ['Suction pressure high', 'Above the normal range', 'Indicates the lower zone is overpressured or a valve has changed; alarm only'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Negative pressure in a main is a contamination event',
        text: 'A booster that draws its suction main below atmospheric pressure can pull groundwater and whatever is in it through any leak or a cross connection into the drinking water. The low suction cutoff is a public health protection, not an equipment protection, and it is set with margin, tested at commissioning, and never bypassed to keep the upper zone supplied.',
      },
      { t: 'h2', text: 'Staging and transitions' },
      {
        t: 'p',
        text: 'Booster stations are often duplex or triplex with identical pumps on drives, staged on controller output and time as the pressure control page describes. The transitions get extra attention because both zones feel them: a pump starting across the line drops the suction pressure and spikes the discharge; a pump stopping abruptly lets the check valve slam and sends a surge into the upper zone. Drives with ramps, a slow-closing check valve or a surge anticipator on the discharge, and staging that changes the total output gently handle it. Where the station is the only supply to the upper zone, the staging logic keeps at least one pump running through every transition.',
      },
      { t: 'h2', text: 'The hydropneumatic alternative' },
      {
        t: 'p',
        text: 'A very small booster, a few homes on a hill, may use a fixed-speed pump and a hydropneumatic tank instead of a drive. The tank holds a cushion of air over the water; the pump runs to a cut-out pressure and stops, and the tank supplies demand until the cut-in pressure. The controls are a pressure switch or a transmitter with two setpoints, a starts-per-hour check against the tank drawdown, and an air charge maintenance routine. The waterlogged tank, where the air cushion has dissolved into the water and the pump short cycles, is the failure mode; a bladder tank or an air compressor with a level control prevents it.',
      },
      { t: 'h2', text: 'Bypass and standby' },
      {
        t: 'p',
        text: 'When the station stops, on power loss, on the suction cutoff, or for maintenance, the upper zone needs a path. A bypass line around the station with a check valve lets the lower zone pressure feed the upper zone at whatever the elevation difference allows, and a pressure-reducing valve in the bypass may be needed where the lower zone pressure is high. Where the upper zone has a tank, the tank carries the zone through the outage and the station restarts on tank level. Where it has neither, a generator and a spare pump are the standby, and the outage time to low pressure is calculated and known.',
      },
      { t: 'h2', text: 'Instrumentation and trending' },
      {
        t: 'ul',
        items: [
          'Suction pressure and discharge pressure, trended together. The difference is the station head; the suction trace alone shows what the station is doing to the lower zone.',
          'Station flow, for staging, for the flow limit, and for the zone demand record.',
          'Pump speeds and currents, for staging health and wear.',
          'Upper zone tank level where there is one, as the outer loop or the override.',
          'Starts per pump, cutoff events, and low suction alarms, as the record of whether the station is sized for the zone.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does the station keep tripping on low suction in the evening?',
        a: 'The lower zone cannot supply the station and its own customers at evening peak. The cutoff is doing its job. The fix is a larger main to the station, a tank on the suction side, a suction pressure limiting mode that reduces output rather than stopping, or a schedule that fills the upper zone tank before the peak.',
      },
      {
        q: 'Where should the discharge pressure transmitter be?',
        a: 'Downstream of the check valves and the station discharge valve, on the main leaving the station, so it reads what the zone sees and is not affected by which pump is running. A transmitter on an individual pump discharge reads that pump and confuses the staging.',
      },
      {
        q: 'Can the booster be controlled on the upper zone tank level instead of pressure?',
        a: 'Where the upper zone has a tank, the tank level is the natural outer loop: the station runs to fill the tank and the tank holds the zone pressure. Pressure control at the station is then a limit rather than the primary loop. Where there is no tank, pressure at the station is the only variable available.',
      },
      {
        q: 'How is the low suction cutoff tested?',
        a: 'At commissioning, by throttling the suction valve slowly with the pumps running until the transmitter reaches the cutoff, and confirming the pumps stop after the delay and restart after recovery. The transmitter is calibrated against a gauge first. The test is repeated on a schedule, because a bypassed cutoff is invisible until the day it matters.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/controls/control-panels/pump-panels/vfd',
      '/controls/instrumentation/pressure/pressure-transmitters',
      '/troubleshooting/pump-troubleshooting/pump-short-cycles',
      '/how-to/plc-how-to/create-a-pid-loop',
    ],
  },
  {
    path: '/water-wastewater/water-systems/storage/elevated-tanks',
    kind: 'reference',
    title: 'Elevated Tank Control',
    summary:
      'The tank on legs that sets the zone pressure: how level equals pressure, the operating band, the altitude valve and its telemetry, turnover for water quality, filling by pumps far away, freeze protection, and what the level signal does when the tank is holding the system together.',
    answer:
      'An elevated tank floats on the distribution system, so its level is the zone pressure and the zone pressure is its level. The controls run the supply pumps to hold the level in an operating band chosen for pressure, fire reserve, and turnover; an altitude valve or the pumps prevent overflow; the level is telemetered to the pumps that fill it, often miles away; and the level trend is the single best picture of what the zone is doing. Because the tank keeps the zone pressurized when everything else has failed, its level signal, its telemetry, and its overflow protection deserve redundancy.',
    keyPoints: [
      'Level is pressure: one foot of water is 0.433 psi at every customer below it.',
      'The operating band balances pressure at the top, fire reserve at the bottom, and turnover between them.',
      'Overflow protection is independent of the fill control: an altitude valve, a high-level float, or both.',
      'The level telemetry runs the pumps. Its loss is handled by a defined fallback, never by a frozen value.',
      'A tank that never drops does not turn over, and stale water is a water quality violation waiting to happen.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Water', 'Level', 'Telemetry', 'Control', 'SCADA'],
    blocks: [
      { t: 'h2', text: 'Why the tank is in charge' },
      {
        t: 'p',
        text: 'A tank on a tower, open to the distribution system, holds the zone at a pressure equal to the height of water in it above each customer. Pumps fill it; demand drains it; the pressure everyone sees is set by the water surface, not by any pump. That is the reason the tank exists: it decouples pressure from pumping, supplies peak demand and fire flow from storage, and keeps the zone pressurized through a power outage for as long as the water lasts. Every control decision about the zone starts from the tank level.',
      },
      { t: 'h2', text: 'The operating band' },
      {
        t: 'table',
        head: ['Level', 'What it means', 'Set by'],
        rows: [
          ['Overflow', 'Water leaves through the overflow pipe', 'The tank; the altitude valve or the high-level cutoff sits below it'],
          ['High level, pumps stop', 'The top of the normal band', 'Near the top of the bowl, with margin below the overflow; the zone pressure at this level is the maximum customers see'],
          ['Low level, pumps start', 'The bottom of the normal band', 'Deep enough that the daily cycle turns the water over; high enough that pressure and fire reserve are kept'],
          ['Fire reserve', 'The volume below the operating band held for fire flow', 'The fire flow requirement times its duration; the operating band sits above it'],
          ['Low-low', 'Pressure at the highest customer approaches the minimum', 'Alarm and emergency actions: additional sources, pressure zone valves'],
        ],
      },
      {
        t: 'p',
        text: 'The band is chosen on a drawing with the elevations of the tank and the highest and lowest customers, and it is checked against the pressure range the code and the utility allow. A tall tank with a deep band gives a wide pressure swing; a shallow band gives steady pressure and poor turnover. Utilities often run a deeper band in summer for turnover and a shallower one in winter for freeze protection, and the setpoints are seasonal parameters in the controller, not constants.',
      },
      { t: 'h2', text: 'Filling' },
      {
        t: 'p',
        text: 'The pumps that fill an elevated tank are rarely at the tank. They are at a plant, a well, or a booster station, sometimes miles away, and they run on the tank level received over telemetry. The tank level control page covers the setpoints and the fallback when the level signal is lost; the elevated tank adds the pressure consequences. A pump station running at full output into a zone whose tank is nearly full raises pressure above the band until the tank absorbs it, and a station that stops abruptly lets the zone pressure drop to the tank level in seconds. Filling is therefore done at a controlled rate, with the station output limited to what the zone main can carry, and the stop is ramped where the pumps have drives.',
      },
      { t: 'h2', text: 'Overflow protection' },
      {
        t: 'p',
        text: 'An elevated tank that overflows wastes water, damages the tower and the ground beneath it, and in cold weather builds ice on the structure. The fill control stops the pumps at the high level, and something independent of that control must stop the water if it fails.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Altitude valve', def: 'A hydraulic valve in the tank inlet that closes on the pressure of a full tank and opens as the tank drains. It works with no power and no telemetry. Its position is telemetered, because a closed altitude valve with pumps still running dead-heads the station and raises zone pressure.' },
          { term: 'High-level float or switch', def: 'A second level device on its own circuit that stops the pumps through the telemetry as a hardwired signal or a separate point, and alarms.' },
          { term: 'Pump station overpressure cutoff', def: 'A discharge pressure high limit at the pump station that stops the pumps when the zone pressure indicates a full tank and a closed valve. The last line.' },
          { term: 'Overflow detection', def: 'A switch in the overflow pipe or a flow indication that alarms an overflow in progress, so it is known within minutes rather than at the next drive-by.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Telemeter the altitude valve position',
        text: 'An altitude valve that has closed is doing its job and creating a new condition: the pump station is pumping into a closed system. Position feedback on the valve, sent with the level, lets the controller stop the pumps and the operator see why the tank is not filling. Without it, the symptoms are high pressure at the station and a level that has stopped rising, and the diagnosis takes a site visit.',
      },
      { t: 'h2', text: 'Water quality and turnover' },
      {
        t: 'p',
        text: 'Water in a tank ages. Chlorine residual decays, temperature stratifies in summer, and a tank that sits near full with a small daily draw can hold water for days or weeks, long enough to lose its residual and grow nitrifying bacteria in a chloraminated system. The operating band is the first tool: a band deep enough that the daily cycle exchanges a meaningful fraction of the volume. Mixing systems, inlet nozzles that induce circulation, and scheduled deep drawdowns are the others. The controller can compute the turnover from the level trend and the tank geometry and alarm when the average age exceeds a limit, which is a better indicator than the residual sample taken once a week at the base.',
      },
      { t: 'h2', text: 'Cold weather' },
      {
        t: 'p',
        text: 'An elevated tank in a cold climate ices from the surface and the riser. Turnover keeps the water moving; a shallower winter band keeps the surface high and the ice layer thin; heaters in the riser and the valve pit keep the pipes from freezing. The level transmitter, whether a pressure transducer at the base of the riser or a radar in the bowl, needs its own protection: a pressure transmitter in a heated pit, a radar with a sunshade and a heated antenna where ice forms on the surface. A frozen level signal in February is the classic elevated tank failure.',
      },
      { t: 'h2', text: 'The level signal' },
      {
        t: 'p',
        text: 'The tank level is usually measured as pressure at the base of the riser, which reads the height of water above it directly, and it is often the only measurement at the tank. The signal is transmitted to the pump station and SCADA by radio, cellular, or leased line, and everything about the zone depends on it.',
      },
      {
        t: 'ul',
        items: [
          'Two measurements where the tank is critical: a pressure transmitter at the base and a radar or a second transmitter, compared in the controller.',
          'A timestamp and a validity flag on the received level at the pump station, with the fallback on stale or bad data defined in the narrative: a fixed schedule, local discharge pressure control, or hold and alarm.',
          'A local indication at the tank site for the technician and for a manual comparison against a sight gauge or a tape at the hatch.',
          'The level trend on SCADA at the highest resolution the telemetry allows, with the pump run status from the filling station overlaid.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How full should the tank be kept?',
        a: 'In the operating band, which is chosen for pressure, fire reserve, and turnover, not as full as possible. A tank held near the top has the best pressure and the worst water age. Most utilities cycle through a band of several feet daily and set the band seasonally.',
      },
      {
        q: 'Why does the zone pressure swing through the day?',
        a: 'Because the tank level swings through the operating band, and pressure is level. A deep band gives a wide swing. If the swing is objectionable, the band is shallower, at the cost of turnover, or the zone gets a pressure-regulating arrangement for the affected customers.',
      },
      {
        q: 'What happens to the zone when the telemetry fails?',
        a: 'Whatever the fallback in the control narrative says. The pump station cannot see the tank, and it runs a defined program: a time-based schedule sized to average demand, control on its own discharge pressure with limits that approximate the tank band, or hold the last state for a limited time and alarm. The altitude valve and the high-level float protect the tank from overflow while the fallback runs.',
      },
      {
        q: 'Can the tank level be used to detect a main break?',
        a: 'Yes, and it is one of the better uses of the trend. A level that falls faster than the demand history at that hour, while the pumps run as usual, is water leaving the zone somewhere. A rate-of-fall alarm on the tank level, compared with a demand profile, catches large breaks before the phones ring.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/controls/instrumentation/level/hydrostatic-level',
      '/controls/instrumentation/level/radar-level',
      '/water-wastewater/water-systems/water-pumping/booster-pumps',
      '/controls/plc-systems/analog-control/signal-validation',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/disinfection',
    kind: 'reference',
    title: 'Disinfection Control',
    summary:
      'Controlling chlorine and chloramine dosing at a water plant: the CT concept and how contact time is credited, flow-paced and residual-trimmed feed, gas, hypochlorite, and on-site generation systems, the point-of-entry residual as the compliance measurement, and the interlocks that stop a feed system from over- or under-dosing.',
    answer:
      'Disinfection control feeds chlorine, or chlorine and ammonia for chloramination, at a dose that achieves the required CT, the product of residual concentration and contact time, and holds a target residual at the point of entry to distribution. The feed is paced to flow with a feedforward, trimmed by a residual analyzer feedback, and interlocked so that loss of flow, loss of sample, or an analyzer fault cannot drive the dose to an extreme. The residual analyzer at the point of entry is the compliance instrument, and the record it produces is what the regulator reads.',
    keyPoints: [
      'The regulatory requirement is CT: residual times contact time, credited by the contact tank geometry and the flow.',
      'Flow-paced feedforward does the work; residual feedback trims it slowly.',
      'Loss of sample flow to the analyzer is a hardwired interlock to the feed, not an alarm.',
      'Chloramination adds an ammonia feed and a ratio to hold. The order of addition and the ratio decide the chemistry.',
      'The point-of-entry residual and the CT calculation are compliance records. Log them at the required interval with validated data.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Water', 'Control', 'Instrumentation', 'PID'],
    blocks: [
      { t: 'h2', text: 'What is being controlled' },
      {
        t: 'p',
        text: 'Disinfection kills or inactivates pathogens by exposing them to a disinfectant residual for a period of time. The surface water treatment rules express the requirement as CT: the residual concentration in mg/L multiplied by the contact time in minutes, compared with a required CT that depends on the disinfectant, the temperature, the pH, and the log inactivation the plant must achieve. The control system feeds enough disinfectant to hold a residual at the end of the contact tank that, at the current flow through the tank, gives the required CT with margin, and then feeds whatever more is needed to hold a residual at the point of entry to distribution, so that the water carries a residual to the customers.',
      },
      {
        t: 'p',
        text: 'Two things about that are unusual for a control loop. The controlled variable is measured a long way downstream of the actuator, through a contact tank with a hydraulic residence time of tens of minutes, so the loop has an enormous dead time. And the compliance is a calculation, CT, that the controller can perform continuously from the residual, the flow, and the tank geometry, which makes the calculation itself a control system deliverable.',
      },
      { t: 'h2', text: 'CT in the controller' },
      {
        t: 'formula',
        expr: 'CT = C × T₁₀ = C × (V / Q) × (T₁₀ / T)',
        where: [
          'C = disinfectant residual at the contact tank outlet, in mg/L',
          'V = contact tank volume, in gallons',
          'Q = flow through the tank, in gallons per minute',
          'T₁₀ / T = the baffling factor of the tank, from a tracer study or the regulatory table, typically 0.1 for an unbaffled tank to 0.7 or better for a serpentine one',
          'CT is compared with the required CT for the temperature and pH from the regulatory tables',
        ],
      },
      {
        t: 'p',
        text: 'The controller computes CT continuously, compares it with the required CT for the current temperature and pH, and alarms when the margin falls below a limit. At low temperature the required CT rises; at high flow the contact time falls; a plant that runs near its CT limit in winter at peak flow is a plant that needs the calculation on the screen. The calculation also supports a residual setpoint that floats with flow and temperature, raising the residual when contact time is short and lowering it when it is long, which saves chemical and reduces disinfection byproducts.',
      },
      { t: 'h2', text: 'Feed control' },
      {
        t: 'steps',
        items: [
          { title: 'Flow pacing', text: 'The feedforward. The dose in mg/L times the flow gives the feed rate; the controller sets the feeder output from the flow and the dose setpoint. This alone holds the residual reasonably well when demand and water quality are steady.' },
          { title: 'Residual trim', text: 'A slow PID loop on the residual analyzer, adjusting the dose setpoint up or down within limits. Because of the contact tank dead time, the loop is tuned very slowly, with a long integral time and a small gain, and often with a sample-and-hold or a dead time compensator.' },
          { title: 'Demand compensation', text: 'Where the raw water chlorine demand varies, from turbidity, organics, or ammonia, a second analyzer at the injection point or a demand calculation from the raw water quality adjusts the feedforward before the residual loop sees the change.' },
          { title: 'Limits', text: 'A minimum and maximum dose, a maximum feeder output, and a rate-of-change limit, so that no combination of feedforward and trim can drive the feed to an extreme.' },
          { title: 'Manual and fallback', text: 'Manual dose entry for the operator, and a fallback to flow pacing at the last good dose when the residual analyzer is invalid.' },
        ],
      },
      { t: 'h2', text: 'Feed systems' },
      {
        t: 'table',
        head: ['System', 'How the dose is delivered', 'Control interface', 'Notes'],
        rows: [
          ['Chlorine gas', 'A vacuum regulator at the cylinder or container, an automatic gas feeder with a modulating valve, an ejector that draws the gas into carrier water', 'A 4-20 mA signal to the feeder valve; feed rate feedback from the rotameter transmitter', 'Leak detection, room ventilation interlocks, and cylinder changeover are part of the control scope; the ejector water supply is an interlock'],
          ['Sodium hypochlorite', 'A metering pump, diaphragm or peristaltic, from a bulk tank or day tank', 'Speed and stroke by 4-20 mA or a pulse signal; pump running and loss-of-prime feedback', 'Hypochlorite degrades with heat and time and off-gasses; the dose calculation uses the current strength, which is measured, and the pump loses prime on gas bubbles'],
          ['On-site generation', 'A brine electrolysis system producing dilute hypochlorite into a storage tank, fed to the process by metering pumps', 'The generator runs on tank level; the feed pumps as for hypochlorite', 'The generator is its own packaged control system; the feed control is the same as bulk hypochlorite at a known strength'],
          ['Chloramination', 'Chlorine as above plus an ammonia feed: aqueous ammonia or ammonium sulfate by metering pump', 'A ratio controller holds the chlorine-to-ammonia ratio, typically near 4 to 1 by weight, from the two feed rates', 'Order of addition and mixing decide whether monochloramine forms; free ammonia and monochloramine analyzers close the loop'],
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Chlorine gas',
        text: 'A chlorine gas feed room has leak detectors, ventilation, an emergency scrubber where required, and interlocks that stop the feed and alarm on a leak. Those interlocks are hardwired, tested on a schedule, and never bypassed for operational convenience. The control system integrates them; it does not replace them.',
      },
      { t: 'h2', text: 'Interlocks' },
      {
        t: 'ul',
        items: [
          'Loss of plant flow stops the feed. A feeder that runs with no flow delivers concentrated chemical into a stagnant pipe.',
          'Loss of sample flow to the residual analyzer drops the residual loop to manual at the last good dose and alarms. The analyzer reads low with no sample, and the loop would raise the dose without limit.',
          'Analyzer bad quality, out of range, or frozen does the same.',
          'Feeder fault, loss of prime, or loss of ejector water alarms and, where a standby feeder exists, transfers to it.',
          'A high residual at the point of entry above a limit alarms and, at a set higher limit, stops the feed.',
          'Day tank low level stops the feed and alarms before the pump runs dry.',
          'For chloramination, loss of either feed stops the other, because free chlorine without ammonia, or ammonia without chlorine, sent to a chloraminated system is a water quality event.',
        ],
      },
      { t: 'h2', text: 'The compliance record' },
      {
        t: 'p',
        text: 'The residual at the point of entry, the CT calculation, the temperature, and the pH are recorded at the interval the rule requires, commonly every 15 minutes for the residual with a daily minimum reported. The historian collects them from validated tags: a residual with bad quality or a lost sample is recorded as invalid, not as zero, and the report shows the gap and the reason. The residual analyzer at the point of entry is calibrated and verified against a grab sample on the schedule the chlorine analyzer page describes, and the calibration record sits beside the residual record.',
      },
    ],
    faqs: [
      {
        q: 'Why is the residual loop so slow to correct?',
        a: 'The contact tank. A dose change at the injection point reaches the outlet analyzer after the hydraulic residence time, which may be 30 minutes or more, and the loop cannot respond to what it has not seen. The feedforward on flow does the fast work; the residual loop adjusts the dose over hours. Tuning it faster produces a slow oscillation of the residual through the day.',
      },
      {
        q: 'What residual should we target at the point of entry?',
        a: 'Enough to satisfy the CT requirement at the contact tank outlet under the worst expected temperature and flow, plus enough to carry a detectable residual to the far end of distribution, and below the level that forms excessive disinfection byproducts or draws taste complaints. The utility sets it with its regulator; the control system holds it and records it.',
      },
      {
        q: 'Should the dose be controlled on the point-of-entry residual or the contact tank outlet residual?',
        a: 'The contact tank outlet residual is the CT measurement and the primary control point. The point-of-entry residual is the compliance measurement for distribution and may be trimmed by a second, downstream feed point where the plant has one. Controlling the single feed on the point-of-entry residual alone adds the clearwell residence time to the loop dead time and makes it worse.',
      },
      {
        q: 'How do we handle hypochlorite strength decay in the dose calculation?',
        a: 'Measure the strength when a delivery arrives and periodically after, enter it as a parameter, and let the controller compute the feed rate from the dose and the current strength. A controller that assumes 12.5 percent from a tank that has decayed to 9 percent under-doses by a quarter, and the residual loop chases it until it runs out of range.',
      },
    ],
    related: [
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/analytical/ph',
      '/controls/plc-systems/analog-control/pid',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/how-to/plc-how-to/create-a-pid-loop',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/aeration-control',
    kind: 'reference',
    title: 'Aeration Control',
    summary:
      'Controlling the largest energy user at a wastewater plant: the DO cascade to airflow, blower staging and turndown, most-open-valve pressure control across basins, ammonia-based aeration control, the instruments each strategy depends on, and the interlocks that keep blowers out of surge.',
    answer:
      'Aeration control modulates the air delivered to biological treatment basins to hold a dissolved oxygen setpoint, or an ammonia target, at the lowest blower energy that meets it. The standard structure is a cascade: a DO controller per zone sets an airflow setpoint, an airflow controller positions the zone valve, and a header pressure controller runs the blowers, with most-open-valve logic lowering the header pressure until one valve is nearly open. Blower staging, turndown limits, and surge protection sit underneath, and the whole scheme depends on DO and airflow instruments that are placed and cleaned correctly.',
    keyPoints: [
      'Cascade: DO sets airflow, airflow sets the valve, header pressure runs the blowers.',
      'Most-open-valve control lowers the header pressure to the minimum the basins need. That is where the energy is.',
      'Blowers have a turndown floor and a surge line. The control respects both or the blowers do.',
      'Ammonia-based control trims the DO setpoint to the load, saving air when the load is low.',
      'Every loop in the cascade is only as good as its sensor. Cleaning is part of the control strategy.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Wastewater', 'Control', 'PID', 'Instrumentation'],
    blocks: [
      { t: 'h2', text: 'Why aeration control matters' },
      {
        t: 'p',
        text: 'Blowers supplying air to activated sludge basins consume half or more of the electricity at a typical wastewater plant. The air is needed: the bacteria that oxidize organic matter and ammonia need dissolved oxygen, and too little means poor treatment. But the demand varies through the day and the year with the load, and a plant that runs its blowers at a fixed output supplies the peak demand all the time. Aeration control matches the air to the demand, which typically cuts blower energy by a quarter to a half, and it does so with a chain of loops and instruments that has to be designed as a whole.',
      },
      { t: 'h2', text: 'The cascade' },
      {
        t: 'steps',
        items: [
          { title: 'DO control per zone', text: 'A DO sensor in each aeration zone feeds a slow PID controller whose output is an airflow setpoint for that zone. The loop is slow, minutes, because the basin responds slowly and the sensor has a lag; the dissolved oxygen page covers the sensor placement and cleaning.' },
          { title: 'Airflow control per zone', text: 'An airflow meter on the drop pipe to each zone feeds a faster PID that positions the zone control valve to hold the airflow setpoint. This inner loop removes the nonlinearity of the valve and the effect of header pressure changes from the DO loop.' },
          { title: 'Header pressure control', text: 'A pressure transmitter on the main air header feeds a controller that sets the blower output, by guide vane, inlet valve, or speed, to hold a header pressure setpoint. The blowers deliver whatever the valves are taking.' },
          { title: 'Most-open-valve', text: 'The header pressure setpoint is not fixed. A supervisory routine watches the zone valve positions and lowers the pressure setpoint until the most-open valve is near a target, typically 80 to 90 percent open, and raises it when a valve reaches fully open. Lower header pressure is less blower work, and the routine keeps the pressure at the minimum that still lets every zone get its air.' },
          { title: 'Blower staging', text: 'When the running blowers reach their maximum, another is started; when they fall to their minimum turndown, one is stopped, with delays and a minimum time between staging events. The staging also respects which blowers are available and rotates them.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Why the cascade instead of DO straight to the blower',
        text: 'A DO controller driving the blower directly fights the other zones, cannot tell whether a valve or the blower should move, and is destabilized by every header pressure change. The cascade gives each loop one job at one speed: DO decides how much air, airflow delivers it, pressure supplies it. Each loop can be tuned and validated alone.',
      },
      { t: 'h2', text: 'Blowers' },
      {
        t: 'table',
        head: ['Blower type', 'Control method', 'Turndown', 'Surge'],
        rows: [
          ['Positive displacement (rotary lobe)', 'Speed with a drive', 'Wide, to about 25 to 40 percent', 'None; pressure rises with restriction instead'],
          ['Multistage centrifugal', 'Inlet throttling valve, or speed', 'Limited, typically to 50 to 60 percent', 'Yes; a surge line the control must stay above'],
          ['Single-stage integrally geared centrifugal', 'Inlet guide vanes and variable diffuser vanes', 'Good, to about 45 percent', 'Yes; the blower controller manages it'],
          ['High-speed turbo (air or magnetic bearing)', 'Speed', 'To about 40 to 50 percent', 'Yes; the package controller protects it'],
        ],
      },
      {
        t: 'p',
        text: 'Centrifugal blowers surge when the flow falls below a limit at a given pressure: the flow reverses momentarily, the machine shudders, and repeated surge damages it. The blower package controller enforces a surge line and will open a blow-off valve or shut down rather than cross it, which is the right behavior and which the plant control must anticipate. Staging down a blower before the running ones reach their turndown floor, and never asking the header pressure loop for a pressure the blowers cannot make at low flow, keeps the plant out of the surge protection.',
      },
      { t: 'h2', text: 'Ammonia-based aeration control' },
      {
        t: 'p',
        text: 'Holding a fixed DO setpoint aerates for the design load at all times. The actual oxygen demand follows the ammonia and organic load, which varies through the day, and a plant that nitrifies needs enough DO to finish ammonia oxidation and no more. Ammonia-based aeration control puts an ammonia analyzer at the end of the aerobic zone, or at a point along it, and uses it to trim the DO setpoint: when ammonia is low, the load is met and the DO setpoint drops toward a floor; when ammonia rises, the DO setpoint rises toward a ceiling. The ammonia loop is slower still, tens of minutes to hours, and it sits above the DO loop as another cascade level. The savings are real, often another 10 to 20 percent of blower energy, and the cost is an ammonia analyzer that needs the same care as any wet chemistry instrument.',
      },
      { t: 'h2', text: 'Instruments the scheme depends on' },
      {
        t: 'ul',
        items: [
          'DO sensors per zone, optical, with automatic cleaning, placed to represent the zone and checked against a portable meter.',
          'Airflow meters per zone, thermal mass or differential pressure, on straight pipe runs with the drop pipe geometry the meter needs, calibrated for the air temperature and pressure.',
          'Header pressure transmitter, with a range that resolves the fractions of a psi the most-open-valve logic moves it by.',
          'Zone valve position feedback, actual, from the actuator, not the command.',
          'Blower package status: running, available, output, inlet vane or speed position, surge state, from the package controller over a network.',
          'Ammonia analyzer where used, with its sample system and calibration schedule.',
          'Basin level and temperature, for the DO saturation correction and for the diffuser depth.',
        ],
      },
      { t: 'h2', text: 'Failure handling' },
      {
        t: 'dl',
        items: [
          { term: 'DO sensor invalid', def: 'The zone drops to a fixed airflow setpoint, the last good value or a configured default, and alarms. A DO reading stuck low would otherwise drive the zone to full air.' },
          { term: 'Airflow meter invalid', def: 'The zone valve holds position, or goes to a default, and the DO loop is suspended for the zone.' },
          { term: 'Header pressure invalid', def: 'The blowers hold their output, the staging is suspended, and the plant runs on the last known state until someone looks.' },
          { term: 'Blower fault', def: 'The staging logic removes it, starts the next available, and alarms. A plant with one blower short in summer is a plant that will fall behind on DO in the afternoon; the loss of standby is its own alarm.' },
          { term: 'Communication loss to the blower package', def: 'The blower keeps running on its own controller at its last setpoint; the plant alarms.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'What DO setpoint should the zones run?',
        a: 'Whatever the process engineer and the operators set for the treatment objective: commonly around 2 mg/L in a conventional nitrifying basin, lower at the end of the aerobic zone, near zero in anoxic zones. The control system holds and trims it; it does not choose it. Ammonia-based control lets the setpoint float within limits the operators set.',
      },
      {
        q: 'Why does the header pressure keep hunting?',
        a: 'The most-open-valve routine and the pressure loop are fighting, usually because the routine moves the setpoint too often or too far, or because the pressure loop is tuned too fast for the blower response. Slow the routine: small setpoint steps, long intervals, a deadband on the valve position target. Tune the pressure loop for the blower, not for the header.',
      },
      {
        q: 'Can I do aeration control without airflow meters?',
        a: 'DO directly to the valve position works on a single-zone basin and poorly on several zones sharing a header, because a valve move in one zone changes the pressure and the air to the others. Airflow meters make the zones independent. They are the instrument most often left out to save money and most often added later.',
      },
      {
        q: 'How much energy will aeration control save?',
        a: 'Plants moving from fixed blower output to DO cascade control commonly report 25 to 40 percent blower energy reduction, and ammonia-based control adds to it. The number depends on how far the load varies from the design and how much the blowers can turn down. A plant with blowers that cannot turn down below 60 percent saves less until the blowers are addressed.',
      },
    ],
    related: [
      '/controls/instrumentation/analytical/dissolved-oxygen',
      '/controls/plc-systems/analog-control/pid',
      '/how-to/plc-how-to/create-a-pid-loop',
      '/controls/plc-systems/analog-control/signal-validation',
      '/water-wastewater/wastewater-systems/wastewater-treatment/ras-was',
      '/controls/control-panels/pump-panels/vfd',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/headworks',
    kind: 'reference',
    title: 'Headworks Control',
    summary:
      'The first stop for raw wastewater: influent flow measurement, mechanical screens and their differential level control, grit removal, influent pumping where the plant needs it, the odor and hazardous atmosphere considerations that shape the electrical design, and what SCADA needs from the headworks.',
    answer:
      'The headworks receives raw wastewater, measures it, removes the material that would damage downstream equipment, and delivers it to treatment. Its controls run the screens on a differential level across the screen with a timed backup, run the grit removal on flow or on a schedule, pace the screenings and grit handling to the screens, and measure the influent flow that every downstream process and the permit depend on. The headworks is a wet, corrosive, and often classified hazardous location, and the instruments and panels are specified for it.',
    keyPoints: [
      'The influent flow meter is a compliance measurement and the pacing signal for the plant. It gets the best installation on site.',
      'Screens clean on differential level across the screen, with a timer as backup and a high differential alarm.',
      'Grit removal runs on flow or on a schedule; the grit pump and classifier are paced to it.',
      'Much of the headworks is a Class I, Division 1 or 2 location. Instruments, panels, and wiring are rated for it.',
      'The headworks is where a storm arrives first. Rate-of-rise alarms and bypass logic live here.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Wastewater', 'Control', 'Instrumentation', 'Flow'],
    blocks: [
      { t: 'h2', text: 'What the headworks does' },
      {
        t: 'p',
        text: 'Everything the collection system delivers arrives at the headworks: wastewater, rags, grit, wipes, sticks, the occasional bicycle. The headworks measures the flow, screens out the large material, settles out the grit, and passes the water on to primary or secondary treatment. Its equipment runs in the harshest environment on the plant, with hydrogen sulfide, moisture, and abrasive solids, and its failure sends the debris downstream into pumps, diffusers, and clarifier mechanisms. The controls are simple in concept and unforgiving in detail.',
      },
      { t: 'h2', text: 'Influent flow' },
      {
        t: 'p',
        text: 'The influent flow measurement is the number the plant runs on. It paces chemical feeds, it drives the flow-proportional sampling the permit requires, it is reported daily to the regulator, and it is the basis for the plant capacity rating. It is measured in an open channel with a Parshall flume and a level sensor, or in a pipe with a magnetic flowmeter where the influent is pumped, and either way it gets the best installation and the most frequent verification of any instrument on site. The open channel flow page covers the flume; the mag meter page covers the pipe. A second flow measurement, at the plant effluent or at the influent pump station, gives a cross-check that catches a fouled flume sensor before the monthly report does.',
      },
      { t: 'h2', text: 'Screens' },
      {
        t: 'p',
        text: 'Mechanical bar screens and fine screens remove material that would damage pumps and clog diffusers. A screen accumulates debris on its face, the water level upstream rises as the screen blinds, and the screen rake or brush cleans the face on a cycle. The control decides when to cycle.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Differential level', def: 'Level sensors upstream and downstream of the screen; the difference is the head loss through the accumulated debris. A cleaning cycle starts when the differential exceeds a setpoint, commonly a few inches, and runs until the differential drops or a set number of rake passes completes. The primary control.' },
          { term: 'Timer', def: 'A cycle on a fixed interval regardless of differential, so a screen with a failed level sensor still cleans, and so debris does not sit on the face during low flow and go septic.' },
          { term: 'Continuous during high flow', def: 'Above a flow or an upstream level setpoint, the screen runs continuously; a storm brings the debris of the whole collection system at once.' },
          { term: 'High differential alarm', def: 'A differential that keeps rising with the screen running means the screen cannot keep up, is jammed, or has failed. The alarm is high priority because the next event is the channel overflowing the screen or the bypass opening.' },
          { term: 'Bypass', def: 'A bypass channel with a coarse bar rack, opened manually or by a gate that lifts on high upstream level, so a failed screen does not back up the collection system. The bypass event is logged and, in most permits, reported.' },
        ],
      },
      {
        t: 'p',
        text: 'The screen drive has its own protection: a torque or current limit that stops the rake on a jam, an overload, and often a reverse-and-retry routine before it alarms. Screenings drop into a washer compactor or a conveyor that runs when the screen runs plus a lag time, and the compactor has its own jam detection.',
      },
      { t: 'h2', text: 'Grit removal' },
      {
        t: 'p',
        text: 'Grit, the sand and small dense solids that pass the screen, settles in a grit chamber, a vortex unit, or an aerated grit tank, and is pumped out to a classifier that separates it from the organics and dewaters it. The grit pump runs on a schedule, every hour for a few minutes, or on the flow, longer and more often at high flow when the grit load is higher. The classifier runs with the pump plus a lag. An aerated grit tank has an airflow setpoint that sets the roll velocity, high enough to keep organics in suspension and low enough to let grit settle, and it is adjusted with flow.',
      },
      { t: 'h2', text: 'Influent pumping' },
      {
        t: 'p',
        text: 'Plants below the collection system grade have an influent pump station at or before the headworks, and it is a lift station with the largest pumps in the utility, controlled as the lift station pages describe, with a wet well level loop, staging, and a backup path. Two headworks-specific points: the pumps are usually after the coarse screen so they are protected from the worst debris, and the station capacity and its high level alarm define the plant peak hydraulic capacity and the point at which a bypass or a storage basin comes into use.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Hazardous locations and hydrogen sulfide',
        text: 'Enclosed headworks spaces, screen channels, and wet wells are classified locations under NFPA 820, commonly Class I, Division 1 or 2, because of methane and hydrogen sulfide. Every instrument, motor, panel, and wiring method in those spaces is rated for the classification, and the panels that do not have to be there are placed outside it. Gas detection for hydrogen sulfide and combustible gas, with ventilation interlocks and alarms, is part of the headworks control scope, and it is a life safety system.',
      },
      { t: 'h2', text: 'Storm response' },
      {
        t: 'p',
        text: 'The headworks sees a storm before the rest of the plant. A rate-of-rise on the influent flow, a rising channel level, and the collection system lift stations calling their lag pumps all arrive together, and the headworks controls respond: screens to continuous cleaning, grit pumps to their high-flow schedule, influent pumps staged up, and the plant flow split logic that decides when flow above the treatment capacity goes to equalization or to a wet weather treatment path. The setpoints for those transitions are in the control narrative and are the most consequential numbers in the headworks program.',
      },
      { t: 'h2', text: 'What SCADA needs' },
      {
        t: 'ul',
        items: [
          'Influent flow, totalized daily, with the meter verification record.',
          'Screen differential level, cycle count, run time, and jam events.',
          'Grit pump and classifier run status and cycle counts.',
          'Influent pump station status as for any lift station.',
          'Gas detector readings and ventilation status, alarmed at high priority.',
          'Bypass gate position and bypass events, logged for reporting.',
          'Channel and wet well levels, with high alarms.',
          'Equipment availability: every device in the headworks with its HOA and fault.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does the screen cycle constantly at night?',
        a: 'The differential setpoint is too close to the head loss of a clean screen at low flow, the downstream level sensor is reading low, or debris is hanging on the face and never clearing. Check the two level sensors against a tape, raise the differential setpoint a little, and inspect the screen face and the rake.',
      },
      {
        q: 'How is the influent flume checked?',
        a: 'The head measurement is compared with a staff gauge at the measuring point on a schedule, and the flume dimensions are checked against the standard when there is any doubt. An independent flow measurement, such as a mag meter on the influent pump discharge or the effluent flow adjusted for plant use, gives a daily cross-check.',
      },
      {
        q: 'What runs the grit pump when the flow meter fails?',
        a: 'The schedule. Grit pumping on a fixed interval is the fallback for the flow-paced mode, and the program falls back automatically when the flow signal is invalid, with an alarm. The classifier follows the pump.',
      },
      {
        q: 'Can the headworks panels be inside the building?',
        a: 'Only if the room is unclassified or the panels are rated for the classification. The usual design puts the panels in an electrical room outside the classified boundary with intrinsically safe barriers or rated wiring methods for the instruments inside it. NFPA 820 and the electrical engineer set the boundary.',
      },
    ],
    related: [
      '/controls/instrumentation/flow/open-channel-flow',
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/water-wastewater/wastewater-systems/lift-stations/high-level',
      '/controls/instrumentation/level/radar-level',
      '/controls/control-panels/panel-design/enclosure-selection',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/clarifiers',
    kind: 'reference',
    title: 'Clarifier Control',
    summary:
      'Primary and secondary clarifiers from the control room: the mechanism drive and its torque protection, sludge blanket measurement and sludge withdrawal control, scum removal, the weir and the effluent turbidity, and the sludge blanket as the early warning for a secondary process losing its footing.',
    answer:
      'A clarifier is a settling tank with a slowly rotating mechanism that moves settled sludge to a hopper and skims floating scum from the surface. Its controls protect the mechanism with a torque monitor, withdraw sludge at a rate that keeps the blanket at a target depth, run the scum system on a cycle, and watch the effluent for the solids that escape when the blanket rises. In a secondary clarifier the sludge withdrawal is the return activated sludge flow, and the blanket depth is the earliest indication that the biological process is settling poorly.',
    keyPoints: [
      'The mechanism torque alarm and cutoff is the protection for the most expensive moving part in the tank.',
      'Measure the sludge blanket continuously. Everything else about clarifier control follows from it.',
      'Withdraw sludge to hold the blanket, not on a fixed schedule alone.',
      'A rising blanket with normal withdrawal is a process problem, not a clarifier problem.',
      'Effluent turbidity at the weir is the last line: solids over the weir are a permit problem in minutes.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Wastewater', 'Control', 'Level', 'Instrumentation'],
    blocks: [
      { t: 'h2', text: 'What a clarifier does' },
      {
        t: 'p',
        text: 'Wastewater enters a clarifier at the center or one end, slows down, and the solids settle while the clarified water flows over the effluent weir. A rotating mechanism with scraper blades or suction pipes moves the settled sludge to a hopper for withdrawal and a skimmer moves floating scum to a trough. Primary clarifiers ahead of biological treatment remove settleable solids from raw wastewater; secondary clarifiers after the aeration basin separate the biological floc from the treated water and return it to the process. The tank does the work; the controls keep the mechanism turning, the sludge moving, and the operator informed.',
      },
      { t: 'h2', text: 'The mechanism' },
      {
        t: 'dl',
        items: [
          { term: 'Drive', def: 'A gear motor turning the mechanism at a fraction of a revolution per minute, continuously. It runs whenever the tank is in service and stops only for maintenance; a stopped mechanism lets sludge build until it cannot restart.' },
          { term: 'Torque monitoring', def: 'A torque indicator on the drive, a load cell or a current-based measurement, with an alarm at a percentage of the design torque and a cutoff above it. Rising torque means sludge accumulating faster than it is withdrawn, a heavy blanket, ice, or an obstruction. The cutoff protects the drive and the mechanism from breaking; the alarm gives the operator time to increase withdrawal.' },
          { term: 'Overload and run confirmation', def: 'Motor overload as for any motor, and a run confirmation from the drive or a rotation sensor, so that a mechanism that has stopped is alarmed within minutes.' },
          { term: 'Freeze protection', def: 'In cold climates, a torque alarm in winter is often ice; heat tracing on the weirs and scum troughs and a note in the narrative about winter torque limits.' },
        ],
      },
      { t: 'h2', text: 'Sludge blanket and withdrawal' },
      {
        t: 'p',
        text: 'The sludge blanket is the interface between the settled sludge and the clear water above it. Its depth is the clarifier control variable. A blanket that rises toward the weir carries solids into the effluent; a blanket drawn too thin withdraws dilute sludge that wastes downstream capacity. A sludge blanket level sensor, ultrasonic or optical, on a mount that sweeps clear of the mechanism, measures it continuously and is the instrument that turns clarifier operation from guesswork into control.',
      },
      {
        t: 'table',
        head: ['Withdrawal mode', 'How it works', 'Where it fits'],
        rows: [
          ['Timed', 'The sludge pump or valve runs for a set time at a set interval', 'Primary clarifiers with steady loads; the fallback for the other modes'],
          ['Blanket level', 'Withdrawal increases when the blanket is above a target and decreases below it', 'Primary and secondary; needs a reliable blanket sensor'],
          ['Flow ratio (RAS)', 'Return sludge flow is a set percentage of plant influent flow', 'Secondary clarifiers; the common RAS mode, with the blanket as the trim or the alarm'],
          ['Concentration', 'Withdrawal adjusts to hold a sludge concentration measured by a suspended solids sensor on the withdrawal line', 'Primary sludge to thickening or digestion, where a consistent feed matters'],
        ],
      },
      {
        t: 'p',
        text: 'In a primary clarifier, the sludge pump usually runs on a timer trimmed by the blanket level, pumping thick sludge in short cycles so the sludge that goes to digestion is as concentrated as the pump can move. In a secondary clarifier the withdrawal is the return activated sludge, covered on the RAS and WAS page, and the blanket level is the check on whether the return rate is keeping up with the settling.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A rising blanket is a process alarm',
        text: 'In a secondary clarifier, a blanket that rises while the return sludge flow is normal means the sludge is settling poorly: filamentous bulking, denitrification lifting the floc, a hydraulic overload, or a process upset upstream. Increasing the return rate buys time; it does not fix it. The blanket alarm goes to the operator as a process alarm, and the response is in the biological treatment procedures.',
      },
      { t: 'h2', text: 'Scum' },
      {
        t: 'p',
        text: 'Floating material, grease and foam, collects on the surface and is moved by a surface skimmer to a scum trough or a beach, from which a scum pump or a tipping trough removes it. The skimmer runs with the mechanism; the scum removal runs on a cycle, a few times a day, or on a level in the scum well. Scum systems fail by plugging, and a scum pump that runs without pumping is detected by the same means as any pump: current and a run time without a level change.',
      },
      { t: 'h2', text: 'Effluent' },
      {
        t: 'p',
        text: 'The clarifier effluent weir is where the tank either succeeds or fails. A turbidity or suspended solids sensor in the effluent channel, one per clarifier or one on the combined effluent, shows solids carryover within minutes of it starting. In a secondary clarifier the effluent turbidity, the blanket level, and the return sludge flow, trended together, tell the whole story of a settling problem in the order it happened. The alarm on effluent turbidity is a high priority alarm in a plant with an effluent solids limit.',
      },
      { t: 'h2', text: 'What SCADA shows' },
      {
        t: 'ul',
        items: [
          'Mechanism running and torque, with the alarm and cutoff setpoints, per clarifier.',
          'Sludge blanket depth, trended, with the target and the alarm.',
          'Sludge withdrawal: pump status, flow where measured, cycle counts, and the mode.',
          'Return sludge flow and concentration on secondary units.',
          'Scum system status and cycles.',
          'Effluent turbidity per unit or combined.',
          'Weir level or tank level, for a tank going out of service or an overflow.',
          'Clarifier in service or out of service, with the flow split to the units in service.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How deep should the sludge blanket be?',
        a: 'Deep enough to withdraw concentrated sludge and shallow enough that solids never approach the weir; typical targets are a foot or two in a primary and a few feet in a secondary, well below the mid-depth of the tank, and the operators set it for the plant. The sensor and the trend let the operator see where the blanket is and hold it there.',
      },
      {
        q: 'Why does the torque alarm come in every morning?',
        a: 'The blanket has built overnight while the withdrawal was on its night schedule, or the mechanism is starting to drag on something. Trend the torque with the blanket level: if the torque follows the blanket, increase overnight withdrawal; if it rises independently, inspect the mechanism.',
      },
      {
        q: 'Can a clarifier run with the mechanism stopped?',
        a: 'For a short time, with sludge accumulating and no scum removal. A mechanism stopped for more than a few hours lets sludge settle into a mass the drive cannot move when it restarts, which is how mechanisms are broken. A stopped mechanism is an alarm that brings someone in.',
      },
      {
        q: 'One blanket sensor or several?',
        a: 'One per clarifier, on a sweep-clear mount, is the minimum that gives control. A second at a different radius shows whether the blanket is level or piled at the center, which matters on large tanks. A plant with no blanket sensor is operating its clarifiers on a core sampler and a guess.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-treatment/ras-was',
      '/controls/instrumentation/analytical/turbidity',
      '/water-wastewater/wastewater-systems/wastewater-treatment/aeration-control',
      '/controls/instrumentation/level/ultrasonic-level',
      '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/ras-was',
    kind: 'reference',
    title: 'RAS and WAS Control',
    summary:
      'Return and waste activated sludge: what each flow does for the process, RAS control by influent flow ratio or by blanket level, WAS control to a target sludge age or a target mixed liquor concentration, the flow and solids measurements each needs, and the pump and valve arrangements that make the setpoints achievable.',
    answer:
      'Return activated sludge carries settled biomass from the secondary clarifier back to the aeration basin so the process keeps its population; waste activated sludge removes the growth so the population stays at the intended age. RAS is usually controlled as a ratio to influent flow, commonly 50 to 100 percent, trimmed by the clarifier sludge blanket. WAS is controlled to hold a target solids retention time or a target mixed liquor suspended solids, from a daily calculation or a continuous solids measurement, and it is the setting that shapes the whole biological process. Both need a flow measurement, a way to modulate the pump or the valve, and a solids concentration where the calculation depends on it.',
    keyPoints: [
      'RAS keeps the biomass in the process. WAS sets how old the biomass is.',
      'RAS as a ratio to influent flow, trimmed on the clarifier blanket, is the standard control.',
      'WAS to a sludge age target is a slow loop: a daily calculation, a small adjustment, and patience.',
      'Both need flow meters. WAS also needs the solids concentration, measured or sampled.',
      'The operator sets the targets. The control system holds the flows and does the arithmetic.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Wastewater', 'Control', 'Pumps', 'Flow'],
    blocks: [
      { t: 'h2', text: 'The two flows' },
      {
        t: 'p',
        text: 'An activated sludge process is a population of microorganisms that eat what arrives in the wastewater. They are grown in the aeration basin, separated from the treated water in the secondary clarifier, and most of them are pumped back to the basin as return activated sludge so that the population is maintained. They also multiply, and a portion equal to the growth is removed as waste activated sludge to thickening and digestion, so that the population does not keep increasing. The rate of removal decides the average age of the population, the solids retention time, and the solids retention time decides what the process can do: a young sludge removes organic matter, an older one nitrifies, an older one still does more, at the cost of more air and more clarifier load.',
      },
      { t: 'h2', text: 'RAS control' },
      {
        t: 'table',
        head: ['Mode', 'How it works', 'Notes'],
        rows: [
          ['Constant flow', 'The RAS pumps run at a fixed rate set by the operator', 'Simple; over-returns at low flow and under-returns at peak; the fallback mode'],
          ['Influent flow ratio', 'RAS flow is held at a set percentage of plant influent flow, commonly 50 to 100 percent, by a flow controller on the RAS pumps or a valve', 'The standard; keeps the clarifier solids loading proportional and the blanket stable through the daily cycle'],
          ['Blanket level trim', 'The ratio is adjusted within limits to hold the clarifier sludge blanket at a target depth', 'The refinement; needs a blanket sensor per clarifier and a limit so the trim cannot run away'],
          ['Constant concentration', 'RAS flow adjusts to hold a RAS solids concentration', 'Less common; needs a solids sensor on the RAS line'],
        ],
      },
      {
        t: 'p',
        text: 'The RAS pumps are often on drives with a flow meter on the common RAS line or one per clarifier, and the controller holds the flow setpoint that the ratio produces. Where the pumps are constant speed, a modulating valve on each clarifier draw-off splits the flow, and the number of pumps running sets the total. The RAS flow split between clarifiers is proportional to their influent split, and a clarifier with a rising blanket gets more; the blanket trim per clarifier does that automatically where the piping allows it.',
      },
      { t: 'h2', text: 'WAS control' },
      {
        t: 'p',
        text: 'WAS is a small flow with a large effect. A plant wasting a few percent of its influent flow as thick sludge sets the sludge age of the whole process, and the effect of a change appears over days. The control is therefore a calculation and a slow adjustment, not a fast loop.',
      },
      {
        t: 'formula',
        expr: 'SRT = (V × MLSS) / (Q_WAS × X_WAS + Q_eff × X_eff)',
        where: [
          'SRT = solids retention time, or sludge age, in days',
          'V = aeration basin volume',
          'MLSS = mixed liquor suspended solids concentration in the basin',
          'Q_WAS and X_WAS = waste sludge flow and its solids concentration',
          'Q_eff and X_eff = effluent flow and its solids concentration, often small enough to neglect',
        ],
      },
      {
        t: 'dl',
        items: [
          { term: 'Target SRT', def: 'The operator sets the sludge age the process needs, for example 8 to 15 days for nitrification in a temperate plant. The controller computes the WAS flow that holds it from the basin volume, the MLSS, and the WAS concentration, and adjusts the WAS pump rate or run time daily. The MLSS and WAS concentration come from online solids sensors or from daily lab samples entered into the system.' },
          { term: 'Target MLSS', def: 'The operator sets a mixed liquor concentration; the controller wastes more when MLSS is above target and less below it. Simpler, and the common practice at plants without online solids measurement; it drifts with the influent load in a way the SRT method does not.' },
          { term: 'Constant WAS flow', def: 'A fixed daily wasting volume set by the operator from the weekly calculation. The fallback and the practice at many small plants.' },
          { term: 'Wasting from the mixed liquor', def: 'Wasting directly from the aeration basin instead of from the RAS line, which makes the WAS concentration equal to the MLSS and removes one measurement from the calculation, at the cost of a larger volume to thickening.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The WAS loop is slow on purpose',
        text: 'Sludge age is the average age of a population that turns over in days to weeks. A WAS change today shows in the process next week. The controller adjusts the wasting rate once a day by a small amount toward the target and never makes a large step; a large step, in either direction, is how a plant loses nitrification or fills a clarifier. The operator reviews the calculation daily and overrides it with judgment when the influent changes.',
      },
      { t: 'h2', text: 'Instruments' },
      {
        t: 'ul',
        items: [
          'RAS flow, by a magnetic flowmeter on the RAS line, total or per clarifier. Sludge is conductive and a mag meter reads it well; the meter is sized for the velocity that keeps it clean.',
          'WAS flow, by a mag meter on the WAS line, with a totalizer that is the wasting record.',
          'Sludge blanket level per clarifier for the RAS trim.',
          'MLSS by an online suspended solids sensor in the basin, cleaned automatically, and verified against lab samples; or lab samples entered daily.',
          'RAS and WAS solids concentration by a suspended solids sensor on the line, or lab samples.',
          'Influent flow, from the headworks, for the ratio.',
        ],
      },
      { t: 'h2', text: 'Pumps and valves' },
      {
        t: 'p',
        text: 'RAS pumps move a thick, ragging liquid at a moderate head, and they are usually non-clog centrifugal or screw pumps on drives. WAS pumps move a small flow of the same liquid, on a drive or on a timer, and they need the same clog and dry-run protection as any sludge pump. Where the RAS is split among clarifiers by valves, the valves are modulating with position feedback, and the control keeps every clarifier draw-off open enough that sludge never sits in a hopper long enough to go septic and rise. A clarifier whose RAS valve is closed while it is in service is a clarifier that will lose its blanket over the weir within hours.',
      },
    ],
    faqs: [
      {
        q: 'What RAS rate should we run?',
        a: 'The process engineer sets it from the settling characteristics and the clarifier design, typically 50 to 100 percent of influent flow, sometimes higher during poor settling. The control system holds the ratio the operators set and shows the blanket that results.',
      },
      {
        q: 'Why is the WAS calculation different from what the lab computes?',
        a: 'The inputs: the online solids sensor and the lab sample rarely agree exactly, and the calculation is sensitive to the WAS concentration. The controller calculation uses the values it is given, and the daily review compares them with the lab. When they diverge, the sensor is checked and the lab value is entered.',
      },
      {
        q: 'Can WAS be automated fully?',
        a: 'The calculation and the daily adjustment can, with the target SRT set by the operator and limits on the rate of change. Most plants keep the operator in the loop for the daily review, because the process changes in ways the calculation does not see: a temperature drop, a toxic slug, a change in the influent character. Full automation with limits and a daily report is reasonable at a plant with reliable online solids measurement.',
      },
      {
        q: 'What happens to RAS control when the influent flow meter fails?',
        a: 'The ratio has no basis and the controller falls back to a constant RAS flow at the last good value, with an alarm. The blanket trim continues if the blanket sensors are healthy. The influent meter is also the compliance flow, so its failure is already a high priority alarm.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-treatment/clarifiers',
      '/water-wastewater/wastewater-systems/wastewater-treatment/aeration-control',
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/controls/instrumentation/analytical/dissolved-oxygen',
      '/water-wastewater/wastewater-systems/wastewater-treatment/headworks',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/raw-water',
    kind: 'reference',
    title: 'Raw Water',
    summary:
      'Controlling the front of a surface water plant: intake and screens, low-lift pumping, the raw water flow that paces the whole plant, the online quality instruments that warn of a changing source, and the alarms and ramp limits that keep the train stable.',
    answer:
      'Raw water control sets the plant production rate and delivers it steadily: the low-lift pumps and a flow control valve or drive hold a raw water flow setpoint that comes from the clearwell level or a production schedule, and that flow is the master signal for chemical flow pacing downstream. Raw water turbidity, pH, temperature, and conductivity are monitored continuously because a change in the source is the earliest warning the plant gets, and screen differential, intake level, and gate positions protect the intake. Flow changes are ramped rather than stepped so that coagulation and filtration see a stable load.',
    keyPoints: [
      'Raw water flow is the plant flow; nearly every chemical feed and every filter loading is paced from it.',
      'The setpoint comes from the clearwell: falling level raises production, rising level lowers it, within ramp limits.',
      'Online raw turbidity, pH, temperature, and conductivity are the early warning; alarm on rate of change, not only on limits.',
      'Intake level, screen differential, and gate position protect the pumps and the structure.',
      'A treatment train likes steady flow; ramp changes over minutes and stage pumps with the flow controller, not against it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Flow', 'Instrumentation', 'Control', 'SCADA'],
    blocks: [
      { t: 'h2', text: 'What the raw water system does' },
      {
        t: 'p',
        text: 'A surface water plant draws from a river, lake, or reservoir through an intake structure, screens it, and pumps it to the head of the treatment process with low-lift pumps. The rate at which it does that is the plant production rate. Every process downstream is sized and paced for it: the coagulant dose is a ratio to it, the flocculation and sedimentation basins have detention times that depend on it, the filters have loading rates set by it, and the disinfection contact time is computed from it. Controlling raw water well means delivering the rate the plant needs, changing it slowly, and knowing what is in it.',
      },
      { t: 'h2', text: 'Flow control' },
      {
        t: 'p',
        text: 'The plant flow setpoint usually comes from finished water storage: the clearwell level, or the level of the distribution tanks that the clearwell feeds. Falling level calls for more production, rising level for less, within a band that keeps the plant running at a few discrete rates rather than hunting. Many plants run a production schedule instead, with operators setting a rate for the shift and the clearwell absorbing the difference. Either way, the raw water flow controller holds the setpoint with a control valve on the low-lift discharge, a drive on the pumps, or a combination, and the pumps stage up and down as the setpoint moves.',
      },
      {
        t: 'ul',
        items: [
          'Ramp the setpoint. A step of 20 percent in raw water flow hits the flocculators and filters at once and shows up as a turbidity spike an hour later. Ramp at a rate the process engineer sets, often a few percent per minute.',
          'Stage pumps by the controller output, not by flow alone. Start the lag pump when the lead is at maximum for a time and the flow is still below setpoint; stop it when the lead is at minimum for a time.',
          'Protect the minimum flow. Filters have a minimum rate below which they do not work well, and some chemical feeds have a minimum. The controller has a floor.',
          'Hold flow through a source change. Switching intake ports or wells changes the quality, not the rate; the flow controller keeps the plant steady while chemistry is adjusted.',
        ],
      },
      { t: 'h2', text: 'Instruments' },
      {
        t: 'table',
        head: ['Measurement', 'Where', 'Why'],
        rows: [
          ['Raw water flow', 'Low-lift discharge, magnetic meter', 'Plant flow; the pacing signal for chemical feed and the basis of every rate'],
          ['Intake or wet well level', 'Intake structure', 'Pump protection, screen submergence, and source level'],
          ['Screen differential', 'Across the traveling or bar screen', 'Screen cleaning and blockage alarm'],
          ['Turbidity', 'Raw water sample line', 'Source quality; coagulant dose adjustment; storm and turnover warning'],
          ['pH and alkalinity', 'Raw water sample', 'Coagulation chemistry; alkalinity is usually a lab test'],
          ['Temperature', 'Raw water', 'Coagulation and disinfection kinetics; seasonal changes'],
          ['Conductivity', 'Raw water', 'Source change, saltwater intrusion, and an easy continuous fingerprint'],
          ['Gate and valve positions', 'Intake ports and isolation', 'Which port is in service; interlocks'],
          ['Pump status, current, vibration', 'Low-lift pumps', 'Staging confirmation and protection'],
        ],
      },
      { t: 'h2', text: 'Watching the source' },
      {
        t: 'p',
        text: 'Raw water quality changes with storms, seasons, lake turnover, algae blooms, and upstream events, and the change usually arrives before anyone has seen it. The online instruments trend continuously on the SCADA system, and the useful alarms are on rate of change as well as on absolute value: turbidity that doubles in an hour is a storm plume arriving, whatever the number is. Operators respond by adjusting coagulant dose, changing intake ports where the structure allows drawing from a different depth, and slowing production so that the process has more time. A plant with several intake ports uses them deliberately: a deeper port during a bloom, a shallower one during turnover, and the port selection and its reason are recorded.',
      },
      { t: 'h2', text: 'Protecting the intake' },
      {
        t: 'ul',
        items: [
          'Low level: stop the pumps before they lose suction, and alarm early enough for the operator to reduce production first.',
          'Screen differential: clean on a differential or a timer; alarm on high differential and on screen drive failure. A blinded screen starves the pumps.',
          'Zebra mussel and biofouling control: chemical feed at the intake, paced to raw water flow, with feed failure alarms.',
          'Ice and frazil: intake heating or port changes in cold climates, with temperature as the trigger.',
          'Security: intrusion and door alarms on the intake structure, which is usually remote and unattended.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'One number for the plant',
        text: 'The raw water flow is used by so many downstream loops that a flowmeter fault is a plant-wide event: every flow-paced chemical feed follows it. Validate the raw water flow signal, alarm on bad quality, and give each chemical feed a fallback dose rate to hold when the pacing signal is bad, rather than letting it pace to zero or to a spike.',
      },
    ],
    faqs: [
      {
        q: 'Should the raw water flow follow the clearwell level automatically?',
        a: 'It can, with a slow controller and a ramp limit, and many plants do it. Others prefer the operator to set the rate for the shift so that the process is deliberately steady and the clearwell is allowed to swing. Either works; what does not work is a fast level loop that changes production every few minutes.',
      },
      {
        q: 'What is the earliest warning of a raw water quality event?',
        a: 'Usually turbidity rate of change, followed by conductivity for a source change and pH for an algae bloom. Upstream gauges and weather feeds, where available, come earlier still. Alarm on the rate and trend everything.',
      },
      {
        q: 'How much straight run does the raw water magnetic meter need?',
        a: 'The manufacturer figure, commonly five diameters upstream and two or three downstream, measured from the pump discharge or the nearest valve, and more after a pump. The raw water meter is the most important meter in the plant; give it a good installation and verify it against a clamp-on meter once a year.',
      },
      {
        q: 'What happens to chemical feed when the raw water pumps stop?',
        a: 'Every flow-paced feed should go to zero with the flow, and the feed pumps should be interlocked so that they cannot run without water flow. A feed pump that keeps dosing into a stopped pipe delivers a slug when flow resumes.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-treatment/chemical-feed',
      '/water-wastewater/water-systems/water-treatment/filtration',
      '/water-wastewater/water-systems/water-treatment/storage',
      '/controls/instrumentation/analytical/turbidity',
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/controls/plc-systems/programming/control-strategies',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/wells',
    kind: 'reference',
    title: 'Wells',
    summary:
      'Operating a wellfield as a water source: selecting and rotating wells, pump-to-waste on start, drawdown and specific capacity, wellhead chemical feed, blending for nitrate or arsenic, the telemetry a well needs, and the interlocks that protect the pump.',
    answer:
      'A groundwater system runs its wells by demand, usually from the level of a storage tank or a pressure setpoint, rotating among wells to share wear and to manage water quality and aquifer drawdown. Each well start typically pumps to waste for a period or until turbidity clears, then diverts to the system, with chlorine and any other treatment paced to the well flow. Well level is monitored to track drawdown and specific capacity and to protect the pump from running dry, and each well reports flow, pressure, level, residual, and pump status by telemetry, with interlocks for low level, low flow, and high turbidity and a minimum run time to limit cycling.',
    keyPoints: [
      'Wells run by tank level or pressure, in a rotation that shares hours and manages the aquifer.',
      'Pump to waste on every start until the water clears; then divert to the system with chemical feed paced to flow.',
      'Drawdown and specific capacity are the health record of a well; trend them from the level transmitter.',
      'Low level, low flow, and high turbidity interlocks protect the pump and the system.',
      'Blending is a ratio control problem: hold the mixed concentration below the limit with margin.',
      'A well is a remote site; telemetry, backup control, and a local fallback are part of the design.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Water', 'Pumps', 'Telemetry', 'Control', 'Instrumentation'],
    blocks: [
      { t: 'h2', text: 'Running the wellfield' },
      {
        t: 'p',
        text: 'A groundwater system has no raw water pumps and no intake; the wells are the source and the pumps together. Demand is met by starting wells, and the call to start usually comes from a storage tank level, from system pressure where there is no storage, or from a schedule. With several wells, the controller selects which to run by a rotation that equalizes run hours, by a priority list that favors the best water or the cheapest power, or by a combination, and it allows the operator to remove a well from the rotation for maintenance or a water quality problem. Wells with different water quality are run in combinations that keep the blended water within limits, which is a control function in its own right.',
      },
      { t: 'h2', text: 'The start sequence' },
      {
        t: 'steps',
        items: [
          { title: 'Call and permissives', text: 'Tank level below the start point or pressure below setpoint; the well in AUTO and available; minimum off time elapsed; well level above the low cutoff.' },
          { title: 'Start the pump to waste', text: 'The waste valve open and the system valve closed, so the first water goes to a drain or a pond. Submersible pumps start across the line or on a soft starter; drives are less common on wells but used where flow must be controlled.' },
          { title: 'Wait for clear water', text: 'A timer, commonly a few minutes, or a turbidity reading below setpoint, whichever the operating permit or the plant practice specifies. Sand and turbidity are highest at the start.' },
          { title: 'Divert to the system', text: 'Open the system valve, then close the waste valve, in that order so the pump is never dead-headed. Start chemical feed when flow to the system is proven.' },
          { title: 'Run and monitor', text: 'Flow, discharge pressure, well level, residual, and pump current. Stop on the tank high level or pressure high setpoint after the minimum run time.' },
          { title: 'Stop', text: 'Stop chemical feed, stop the pump, and allow the check valve to close; some installations close the system valve first to limit surge.' },
        ],
      },
      { t: 'h2', text: 'Level and specific capacity' },
      {
        t: 'p',
        text: 'The water level in the well drops when the pump starts, from the static level to a pumping level, and the difference is the drawdown. The flow divided by the drawdown is the specific capacity, in gallons per minute per foot, and it is the single best indicator of the condition of the well: a falling specific capacity means the screen is plugging, the aquifer is declining, or the pump is wearing. A submersible pressure transmitter hung in the well, or a bubbler airline, measures the level continuously; the controller computes drawdown and specific capacity at a fixed time after each start and trends them. A low level cutoff stops the pump before it breaks suction, with a delay so that the initial drawdown does not trip it.',
      },
      {
        t: 'formula',
        expr: 'Specific capacity = Q / (static level − pumping level)',
        where: [
          'Q = well flow in gallons per minute at the time of the level reading',
          'static level = depth to water with the pump off and the well recovered',
          'pumping level = depth to water at a fixed time after start, often 30 or 60 minutes',
        ],
      },
      { t: 'h2', text: 'Wellhead treatment' },
      {
        t: 'ul',
        items: [
          'Chlorination: hypochlorite paced to well flow, with a residual analyzer downstream of the contact main or the tank and an alarm on low residual. Groundwater rule requirements for virus inactivation set the contact time some systems must demonstrate.',
          'Fluoride: paced to flow, with a maximum feed limit, a day tank sized to make an overfeed impossible, and an alarm on high residual.',
          'Sequestering: polyphosphate for iron and manganese, paced to flow.',
          'Iron and manganese removal: aeration and filtration or oxidation and filtration at a central site, with the well flow steady enough for the filters.',
          'Corrosion control: orthophosphate or pH adjustment, paced to flow.',
          'All feeds interlocked with proven flow to the system, and none running during pump-to-waste unless the permit requires it.',
        ],
      },
      { t: 'h2', text: 'Blending' },
      {
        t: 'p',
        text: 'A well with nitrate or arsenic above the limit can often be used by blending it with cleaner wells so that the combined water meets the standard. The control holds the ratio of the high-concentration well flow to the total below a limit computed from the concentrations, with margin for measurement error and variation, and it prevents the high-concentration well from running alone. Flow from each well is measured, the ratio is computed continuously, and the blend is alarmed and the problem well stopped if the ratio is exceeded. Regulators generally expect the blend to be demonstrated by sampling at the point of entry, and the control records support that.',
      },
      { t: 'h2', text: 'Telemetry and protection' },
      {
        t: 'table',
        head: ['Point', 'Purpose'],
        rows: [
          ['Pump running, in AUTO, fault', 'Status and alarm'],
          ['Flow', 'Pacing, totalizing, blending, low-flow detection'],
          ['Discharge pressure', 'System pressure, dead-head detection, check valve failure'],
          ['Well level', 'Drawdown, specific capacity, low-level cutoff'],
          ['Chlorine residual', 'Treatment verification and alarm'],
          ['Turbidity where fitted', 'Pump-to-waste diversion and sand alarm'],
          ['Valve positions', 'Waste and system valves; sequence confirmation'],
          ['Motor current, power', 'Pump condition, power outage detection, energy'],
          ['Intrusion, power fail, communication status', 'Site security and telemetry health'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'When the telemetry drops',
        text: 'A well that starts only on a tank level received by radio stops starting when the radio fails. Give each well a local fallback: pressure control from a local transmitter, a time-based duty cycle, or a last-known-level hold with a timeout, and alarm the loss of communication so someone drives out. The fallback is written in the functional description and tested at commissioning.',
      },
    ],
    faqs: [
      {
        q: 'How long should a well pump to waste?',
        a: 'Long enough for the water to clear, which depends on the well. Many systems use a fixed time of a few minutes set from experience; a turbidity instrument makes it a measured condition and lets the time shrink for good wells. The permit or the state guidance may specify a minimum.',
      },
      {
        q: 'Why rotate wells rather than always run the best one?',
        a: 'Running one well continuously draws the aquifer down locally, wears one pump, and leaves the others idle where their pumps and screens deteriorate. Rotation shares the load and keeps every well proven. Priority within the rotation can still favor the best water or the lowest cost.',
      },
      {
        q: 'What does a sudden drop in specific capacity mean?',
        a: 'A change in the well or the pump rather than the aquifer, which changes slowly: a plugged screen, a broken column pipe or a failed check valve, a worn impeller, or a level transmitter that has moved. Compare flow, current, and pressure with the previous run; a broken column shows normal current and low flow.',
      },
      {
        q: 'Can a drive be used on a well pump?',
        a: 'Yes, where flow must be matched to demand or blended, and with attention to the motor and cable, since submersible motors have minimum speed and cooling requirements. Most wells run at full speed into storage, where a drive adds cost without benefit.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-pumping/well-pumps',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/water-wastewater/water-systems/water-treatment/disinfection',
      '/water-wastewater/water-systems/water-treatment/chemical-feed',
      '/controls/instrumentation/level/hydrostatic-level',
      '/controls/instrumentation/analytical/chlorine',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/aeration',
    kind: 'reference',
    title: 'Aeration',
    summary:
      'Aeration in drinking water treatment: stripping carbon dioxide, hydrogen sulfide, radon, and volatile organics, and oxidizing iron and manganese ahead of filtration. The aerator types, what each needs from the control system, the pH shift, and the interlocks.',
    answer:
      'Aeration in water treatment brings water and air into contact to remove dissolved gases and to oxidize dissolved iron and manganese into particles that filtration can remove. Cascade, tray, and spray aerators are passive and need only flow and level control; packed tower air strippers and diffused aeration use blowers and need air flow control, an interlock that stops water when air is lost, and monitoring of the pressure drop across the packing. Stripping carbon dioxide raises pH, which changes corrosion control and disinfection downstream, and oxidizing iron and manganese needs enough dissolved oxygen and contact time, so dissolved oxygen, pH, and the air-to-water ratio are the process variables that matter.',
    keyPoints: [
      'Two jobs: strip gases out, put oxygen in. Both need contact between air and water; the equipment sets how much control is involved.',
      'Passive aerators need flow and level; blowers need air flow control, an air-loss interlock, and packing pressure drop monitoring.',
      'Air-to-water ratio is the design variable for stripping; hold it as the water flow changes.',
      'Stripping carbon dioxide raises pH; plan the corrosion control and disinfection chemistry around the aerated water.',
      'Iron and manganese oxidation needs dissolved oxygen, time, and often pH; the filter downstream does the removal.',
      'Fouling of packing and trays by iron and biology shows up as rising pressure drop and falling performance.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Control', 'Instrumentation', 'Engineering', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'Why water is aerated' },
      {
        t: 'dl',
        items: [
          { term: 'Carbon dioxide', def: 'Groundwater often carries dissolved carbon dioxide that lowers pH and makes the water corrosive and hungry for lime or caustic. Stripping it raises pH and cuts chemical use.' },
          { term: 'Hydrogen sulfide', def: 'The rotten egg odor in some groundwater; stripped by aeration, though oxidation and chlorination may be needed to finish it and the off-gas needs to go somewhere.' },
          { term: 'Radon and volatile organics', def: 'Regulated contaminants removed by air stripping in packed towers with high air-to-water ratios; the off-gas may need treatment.' },
          { term: 'Methane', def: 'In some wells; stripped to prevent accumulation in structures.' },
          { term: 'Iron and manganese', def: 'Dissolved as reduced ions; oxygen from aeration oxidizes iron readily and manganese slowly, forming particles that filters remove. Manganese usually needs a chemical oxidant or a catalytic filter media as well.' },
          { term: 'Taste and odor', def: 'Some volatile taste and odor compounds are reduced by aeration; many are not.' },
        ],
      },
      { t: 'h2', text: 'Equipment and what it needs' },
      {
        t: 'table',
        head: ['Type', 'How it works', 'Control and instrumentation'],
        rows: [
          ['Cascade or step aerator', 'Water falls over steps or weirs in open air', 'Flow only; level in the receiving basin; freeze and algae considerations'],
          ['Tray aerator', 'Water drips through stacked perforated trays, often with coke or media', 'Flow; tray fouling by iron and biology; blower where forced draft'],
          ['Spray aerator', 'Nozzles spray water into the air over a basin', 'Flow and nozzle pressure; nozzle plugging; basin level'],
          ['Packed tower air stripper', 'Water flows down over packing, air is blown up countercurrent', 'Blower control, air flow, tower pressure drop, sump level, water-air interlock, off-gas'],
          ['Diffused aeration', 'Air bubbled through diffusers in a tank', 'Blower control, air flow, dissolved oxygen, diffuser back pressure'],
          ['Induced draft aerator', 'A fan draws air through a cascade or tray unit in a housing', 'Fan status and interlock; freeze protection'],
        ],
      },
      { t: 'h2', text: 'Air-to-water ratio' },
      {
        t: 'p',
        text: 'For stripping, the design quantity is the volume of air per volume of water, and it can range from a few to one for carbon dioxide to tens to one for volatile organics and radon. The blower is sized for the maximum water flow at the design ratio, and the control holds the ratio as water flow changes: a drive on the blower, or an inlet damper, controlled from an air flow measurement with a setpoint computed from the water flow. Running the full air flow at low water flow wastes energy and can flood or channel the packing; running too little air fails the treatment. The tower pressure drop across the packing, measured with a differential pressure transmitter, rises as the packing fouls with iron deposits or biological growth, and it is the maintenance indicator.',
      },
      { t: 'h2', text: 'Interlocks' },
      {
        t: 'ul',
        items: [
          'No water without air on a stripper: if the blower stops, the feed pump stops or the water is diverted, because water leaving a stripper that is not stripping is untreated water going to the clearwell.',
          'No air without water where the blower could overheat, on some designs.',
          'Sump or basin level: high stops the feed, low stops the transfer pump.',
          'Tower differential pressure high: alarm, then a reduced flow limit, then shutdown at the value the manufacturer gives.',
          'Blower discharge temperature and vibration on larger blowers.',
          'Off-gas treatment status where the stripper has one; a permit condition on some volatile organic installations.',
        ],
      },
      { t: 'h2', text: 'What happens downstream' },
      {
        t: 'p',
        text: 'Aerated water is different water. Stripping carbon dioxide raises pH, sometimes by a full unit, which changes the dose of any pH adjustment chemical, the effectiveness of chlorine, and the corrosion behavior in the distribution system. Oxygen added to groundwater that had none makes it more corrosive to iron mains and turns dissolved iron into particles that stain everything they touch until the filters remove them. Design the chemistry downstream for the aerated water, measure pH and dissolved oxygen after the aerator, and give the filters the detention time the oxidation reactions need. Manganese in particular is slow to oxidize with air alone and is usually handled with a chemical oxidant, a raised pH, or a catalytic media after the aerator.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Freeze and fouling',
        text: 'Open aerators in cold climates freeze; enclosures, heat, or a bypass in winter are design items. Every aerator that handles iron fouls: trays, packing, nozzles, and diffusers all need a cleaning schedule, and the pressure drop or the nozzle pressure tells you when. Put both on the maintenance calendar and the alarm list.',
      },
    ],
    faqs: [
      {
        q: 'Is aeration enough to remove iron and manganese?',
        a: 'For iron in most groundwater, aeration followed by detention and filtration works. Manganese oxidizes slowly with air unless the pH is high, and most plants use permanganate, chlorine, or a catalytic filter media to finish it. Aeration is the first step, not the whole process.',
      },
      {
        q: 'How much does aeration raise pH?',
        a: 'It depends on how much carbon dioxide the water carried; groundwater with a pH of 6.5 from dissolved carbon dioxide can come out of an aerator near 7.5 or higher. Measure it after the aerator and treat the aerated pH as the starting point for corrosion control.',
      },
      {
        q: 'What is the off-gas concern on a stripper?',
        a: 'Whatever was stripped is now in the air: hydrogen sulfide is an odor and a corrosion problem near the tower, radon and volatile organics may be regulated in the discharge, and methane is a safety issue in enclosed spaces. The air permit and the site layout decide whether the off-gas needs treatment or just a stack.',
      },
      {
        q: 'Can a stripper run at reduced water flow?',
        a: 'Yes, within the turndown of the packing and the distributor, with the air flow reduced to hold the ratio. Below the minimum wetting rate the packing channels and treatment falls off; the manufacturer gives the minimum, and the flow controller should not go below it.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-treatment/filtration',
      '/water-wastewater/water-systems/water-treatment/wells',
      '/water-wastewater/water-systems/water-treatment/chemical-feed',
      '/controls/instrumentation/analytical/dissolved-oxygen',
      '/controls/instrumentation/analytical/ph',
      '/controls/instrumentation/pressure/differential-pressure',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/filtration',
    kind: 'reference',
    title: 'Filtration',
    summary:
      'Controlling gravity and pressure filters: effluent rate and level control, head loss and turbidity on every filter, the backwash triggers and sequence, filter-to-waste and ripening, the turbidity rules that filter monitoring answers to, and the operator view.',
    answer:
      'A filter is controlled by holding its effluent rate or its water level with a modulating effluent valve, monitored by a head loss measurement and an individual turbidimeter on its effluent, and taken out of service for backwash when head loss, run time, or turbidity reaches its trigger. The backwash is a sequence of isolating, draining, air scouring where fitted, washing at rates that expand the bed, settling, and returning to service through a filter-to-waste period until the effluent turbidity is acceptable. Turbidity rules require continuous monitoring of each filter with recording at short intervals and define the values that trigger investigation, so the filter control system is also a compliance record.',
    keyPoints: [
      'Each filter has a rate or level controller on its effluent valve, a head loss transmitter, and its own turbidimeter.',
      'Backwash triggers: head loss, run time, or turbidity, whichever comes first, and the operator can call one.',
      'The backwash is a sequencer: isolate, drain, air scour, wash, settle, filter to waste, return.',
      'Filter to waste until the effluent turbidity is below the ripening setpoint; the first minutes after a wash are the worst.',
      'Individual filter turbidity, recorded every 15 minutes, is the compliance record; the control system keeps it.',
      'Only one filter washes at a time, and the plant flow is rebalanced across the filters that remain.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Water', 'Control', 'Instrumentation', 'Standards', 'PLC'],
    blocks: [
      { t: 'h2', text: 'What the filter does and what the controls do' },
      {
        t: 'p',
        text: 'A rapid gravity filter passes coagulated and settled water down through a bed of sand, anthracite, or both, and the bed captures the remaining particles. As it captures them the head loss through the bed rises, and eventually the filter either clogs or begins to pass particles, and it is backwashed. The control system has three jobs: hold each filter at the rate or level the plant needs while it runs, watch head loss and turbidity to decide when the run is over, and run the backwash sequence safely and repeatably. Pressure filters do the same in a closed vessel with pump-driven flow, with pressure and differential pressure in place of level and head loss.',
      },
      { t: 'h2', text: 'Rate and level control' },
      {
        t: 'table',
        head: ['Mode', 'How it works', 'Notes'],
        rows: [
          ['Constant rate, constant level', 'A level controller on the filter modulates the effluent valve to hold the water level; the influent flow is split evenly among filters by weirs or influent valves, so each filter runs at a constant rate', 'The common arrangement; the effluent valve opens gradually over the run as head loss grows'],
          ['Constant rate by flow', 'A flow controller on the effluent holds a rate setpoint, and the level rises over the run', 'Needs a flowmeter per filter; the level must be watched'],
          ['Declining rate', 'Effluent valves are fixed; flow declines as head loss grows; the level rises across the bank', 'Simple, few instruments, less control over individual filters'],
        ],
      },
      {
        t: 'p',
        text: 'In constant level control, the loop is slow and the valve is large, so the controller is tuned gently and the valve travel is limited to avoid cycling. Filter loading rate, in gallons per minute per square foot, is the number the process engineer cares about; the control system computes it from flow and filter area and displays it. When a filter is removed for backwash, the plant flow is redistributed among the others, and a rate-of-change limit keeps the remaining filters from taking a step that shakes particles loose.',
      },
      { t: 'h2', text: 'Head loss and turbidity' },
      {
        t: 'p',
        text: 'Head loss is the difference between the water level above the media and the pressure below it, measured by a differential pressure transmitter or by two level transmitters, and it is the fundamental indicator of a filter run. Clean bed head loss is a foot or two; terminal head loss, where the run ends, is set by the plant, often around eight feet on a gravity filter. Turbidity on each filter effluent, from an online turbidimeter with a sample flow that is itself monitored, is the measure of whether the filter is doing its job and the measure regulators watch. A filter whose turbidity rises before its head loss reaches the terminal value has broken through and is washed on turbidity.',
      },
      {
        t: 'table',
        head: ['Trigger', 'Typical setting', 'What it protects'],
        rows: [
          ['Terminal head loss', 'Around 6 to 10 feet of water on gravity filters', 'Media and underdrain; prevents air binding and a stalled filter'],
          ['Turbidity', 'Effluent above a setpoint such as 0.15 or 0.2 NTU for a sustained period', 'Water quality; breakthrough ends the run before the head loss does'],
          ['Run time', '24 to 96 hours depending on the plant', 'Biological growth and mudballs; a filter is washed on time even if it looks fine'],
          ['Operator call', 'Any time', 'Maintenance, unusual conditions'],
        ],
      },
      { t: 'h2', text: 'The backwash sequence' },
      {
        t: 'p',
        text: 'A backwash is a sequencer in the controller, with steps, transitions on feedback, timeouts, and a defined response to a fault. The sequence below is typical; the durations and rates come from the plant design and are setpoints on the HMI, not constants in the code.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Request and permissives', text: 'No other filter washing; wash water supply available at the tank level or pump; waste washwater capacity available; the filter effluent valve closed by the sequence.' },
          { title: 'Isolate', text: 'Close the influent valve and confirm; close the effluent valve and confirm.' },
          { title: 'Drain down', text: 'Open the drain or waste valve until the level falls to the air scour level, with a timeout.' },
          { title: 'Air scour', text: 'Start the blower and open the air valve for the design time; on some filters this is combined with a low-rate water wash.' },
          { title: 'Water wash', text: 'Stop the air, open the washwater valve, and ramp the wash rate to the design value that expands the bed by 20 to 30 percent; hold for the design time, or until the waste turbidity falls below a setpoint. Surface wash or a high-rate step where fitted.' },
          { title: 'Settle', text: 'Stop the wash, close the washwater and waste valves, and wait for the bed to settle.' },
          { title: 'Filter to waste', text: 'Open the influent valve, open the filter-to-waste valve, and run until the effluent turbidity falls below the ripening setpoint or the maximum time elapses.' },
          { title: 'Return to service', text: 'Close the filter-to-waste valve, open the effluent valve, and hand the filter back to its rate or level controller with a ramp.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Wash rate and media',
        text: 'Too high a wash rate carries media out of the filter to the waste channel; too low a rate does not clean it. The rate is controlled, ramped up gradually so the bed fluidizes without heaving, and corrected for water temperature where the plant does so, since cold water expands the bed more. A wash that starts at full rate through a closed or slow valve can lift the underdrain.',
      },
      { t: 'h2', text: 'Compliance monitoring' },
      {
        t: 'p',
        text: 'Under the surface water treatment rules in the United States, conventional plants monitor turbidity on the combined filter effluent at least every four hours with limits on the fraction of readings above set values, and they monitor each individual filter continuously with values recorded at least every 15 minutes. Readings above defined values on an individual filter for defined durations trigger reporting, a filter profile, a self-assessment, or a comprehensive performance evaluation. The control system is the recorder: it stores the individual filter turbidity at the required interval, flags the exceedances with the filter and the time, and keeps the record for the retention period. A turbidimeter with a lost sample flow or a failed instrument is a monitoring gap the system must alarm.',
      },
      { t: 'h2', text: 'The operator view' },
      {
        t: 'ul',
        items: [
          'A filter bank overview: each filter with its state, rate, level, head loss, turbidity, run time since wash, and volume since wash.',
          'A filter detail: the valves and their positions, the controller, the trends, the wash history, and the sequence step when washing.',
          'Backwash controls: start, hold, resume, abort, and the supervisor advance, with the current step, the step timer, and what the step is waiting for.',
          'Setpoints: terminal head loss, turbidity triggers, run time limit, wash rates and durations, filter-to-waste turbidity and time, all with limits.',
          'Reports: unit filter run volume per run, wash water used, turbidity compliance summaries, and exceedances.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why filter to waste after a backwash?',
        a: 'A freshly washed bed passes particles for the first minutes until it ripens, and the effluent turbidity spike after a wash is often the highest turbidity a filter produces all run. Sending that water to waste until the turbidimeter shows it has cleared keeps the spike out of the clearwell and out of the compliance record.',
      },
      {
        q: 'What is unit filter run volume and why track it?',
        a: 'The volume of water filtered per square foot of filter area between washes. It combines rate and run length into one number that says how productive a run was, and a falling value over months means the media, the coagulation, or the wash is deteriorating. Compute it from the flow total and the area at each wash and trend it.',
      },
      {
        q: 'Can two filters wash at once?',
        a: 'Usually not: the wash water supply and the waste handling are sized for one, and two filters out at once overloads the rest. The sequence permissive checks that no other wash is in progress and queues requests. A plant designed for two simultaneous washes says so in the functional description.',
      },
      {
        q: 'How is head loss measured on a filter?',
        a: 'With a differential pressure transmitter between the water above the media and the effluent below it, or by subtracting a pressure below the underdrain from the level above the bed. Either way it is the drop across the media, in feet of water, and it should read near the clean bed value right after a wash; a higher reading after a wash means the wash was inadequate or the taps are plugged.',
      },
    ],
    related: [
      '/controls/plc-systems/programming/sequencers',
      '/controls/instrumentation/analytical/turbidity',
      '/controls/instrumentation/pressure/differential-pressure',
      '/water-wastewater/water-systems/water-treatment/raw-water',
      '/water-wastewater/water-systems/water-treatment/storage',
      '/controls/plc-systems/programming/permissives',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/chemical-feed',
    kind: 'reference',
    title: 'Chemical Feed',
    summary:
      'Chemical feed from the control side: the chemicals and where they go, metering pumps and dry feeders, flow pacing with residual trim, the dose arithmetic, day tanks and drawdown tests, loss-of-feed detection, interlocks, and overfeed protection.',
    answer:
      'Chemical feed in a water plant is controlled by pacing each feeder to the flow it treats, at a dose set by the operator or trimmed by a downstream analyzer, with the feeder interlocked so that it cannot run without proven water flow. Metering pumps are controlled by speed and stroke, dry feeders by motor speed, and gas feeders by an automatic valve, each with a feedback that proves chemical is actually moving. Day tanks with level measurement, calibration columns for drawdown tests, and loss-of-feed alarms verify delivery, and overfeed protections such as maximum feed limits, day tank sizing, and high residual alarms guard the chemicals, fluoride above all, that can hurt people when overdosed.',
    keyPoints: [
      'Dose times flow is the feed rate; pace every feeder to the flow it treats and trim from the residual where one is measured.',
      'No feed without proven flow, and no flow without feed for disinfection: two interlocks that are not negotiable.',
      'Prove delivery: pump stroke feedback, a flow switch or pulse flowmeter, day tank level rate, and a drawdown test on a schedule.',
      'Day tanks sized so a full tank cannot overdose the plant at maximum feed, for fluoride especially.',
      'Fallback dose when the pacing flow signal is bad; never pace to zero or to a spike.',
      'The chemical, the concentration, and the units are on the loop sheet and the HMI; the math is where feed errors hide.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Water', 'Control', 'Instrumentation', 'Pumps', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'The chemicals' },
      {
        t: 'table',
        head: ['Chemical', 'Purpose', 'Usual feed point', 'Control basis'],
        rows: [
          ['Coagulant: alum, ferric, polyaluminum chloride', 'Particle removal', 'Rapid mix', 'Flow paced; dose from jar tests, streaming current, or raw turbidity'],
          ['Polymer', 'Flocculation and filter aid', 'Flocculation or filter influent', 'Flow paced'],
          ['Pre-oxidant: permanganate, chlorine dioxide, ozone', 'Iron, manganese, taste and odor, algae', 'Raw water or head of plant', 'Flow paced; residual or demand'],
          ['pH adjustment: lime, caustic, soda ash, carbon dioxide', 'Coagulation pH and corrosion control', 'Rapid mix and finished water', 'Flow paced with pH trim'],
          ['Disinfectant: hypochlorite, chlorine gas, chloramine', 'Disinfection and residual', 'Clearwell inlet, finished water', 'Flow paced with residual trim'],
          ['Fluoride', 'Dental health', 'Finished water', 'Flow paced; strict overfeed protection'],
          ['Corrosion inhibitor: orthophosphate', 'Lead and copper control', 'Finished water', 'Flow paced'],
          ['Powdered activated carbon', 'Taste, odor, organics', 'Raw water or rapid mix', 'Flow paced, often seasonal'],
        ],
      },
      { t: 'h2', text: 'Feeders and how they are controlled' },
      {
        t: 'dl',
        items: [
          { term: 'Diaphragm metering pump', def: 'Output is stroke length times stroke frequency. Stroke length is set manually or by a positioner; frequency is controlled by a 4-20 mA speed signal or a pulse input. Accurate at moderate turndown; loses accuracy at very short strokes.' },
          { term: 'Peristaltic pump', def: 'Output is proportional to speed, controlled by 4-20 mA. Tolerant of gas in the chemical, gentle on polymers, tube life is the maintenance item.' },
          { term: 'Gas chlorinator', def: 'A vacuum-operated feeder with an automatic valve positioned by a signal proportional to flow, and a residual analyzer trimming. Leak detection and ventilation are part of the installation.' },
          { term: 'Dry feeder', def: 'Volumetric feeders meter by screw speed; gravimetric feeders weigh the discharge and correct. Motor speed follows the flow-paced signal; a dissolver and a carrier water flow are interlocked.' },
          { term: 'Lime slaker', def: 'Dry lime fed to a slaker producing slurry, with slaker temperature and grit removal; slurry feed by pump or gravity.' },
        ],
      },
      { t: 'h2', text: 'The arithmetic' },
      {
        t: 'formula',
        expr: 'Feed, lb/day = Dose, mg/L × Flow, MGD × 8.34',
        where: [
          'Dose = the concentration of the chemical to be added, as the pure chemical',
          'Flow = the water flow being treated, in million gallons per day',
          '8.34 = pounds per gallon of water; the conversion that makes the units work',
        ],
      },
      {
        t: 'p',
        text: 'For a liquid chemical the pounds per day are divided by the pounds of active chemical per gallon of the solution as supplied, which comes from its density and its strength, to get gallons per day, and then converted to the pump units. Hypochlorite is the usual trap: it is bought as a percentage available chlorine by weight or by volume, it loses strength in storage, and a dose computed from the nominal strength drifts as the solution ages. Put the concentration on the HMI as an operator entry with a date, and confirm the delivered dose with a drawdown test and the residual.',
      },
      { t: 'h2', text: 'Control strategies' },
      {
        t: 'ul',
        items: [
          'Flow pacing: the feed rate follows the treated flow at a dose setpoint. The basis of every feed. The flow signal must be validated, and a fallback dose rate held when it is bad.',
          'Residual trim: a downstream analyzer adjusts the dose setpoint slowly, within limits, to hold a residual. Chlorine and pH are the usual cases. The trim is a slow outer loop; the pacing does the fast work.',
          'Manual dose: the operator sets the dose from a jar test or experience, and the pacing follows flow. Coagulant is usually run this way, sometimes with a streaming current monitor as a guide.',
          'Batch: polymer makeup and lime slaking are sequences that make a batch and then feed from it.',
        ],
      },
      { t: 'h2', text: 'Proving that chemical is moving' },
      {
        t: 'p',
        text: 'A metering pump that has lost prime, a plugged injection quill, an empty day tank, or a closed valve all leave the pump running and the plant untreated. Proof of feed comes from more than one source: a stroke or flow pulse from the pump, a flow switch or a small flowmeter on the discharge, the day tank level falling at the expected rate, and the residual analyzer downstream. A loss-of-feed alarm compares the expected and the proven, and for disinfection it is an interlock: no proven chlorine feed for a set time, and the plant is alarmed and, at the level the plant decides, the finished water pumps stop. A calibration column, a graduated cylinder on the pump suction, allows a drawdown test that measures actual pump output against the expected value; do it on a schedule and after every pump repair.',
      },
      { t: 'h2', text: 'Interlocks and overfeed protection' },
      {
        t: 'table',
        head: ['Protection', 'How', 'Applies to'],
        rows: [
          ['No feed without flow', 'Feeder enable requires the treated water flow above a minimum for a delay; feed stops when flow stops', 'Every chemical'],
          ['No flow without feed', 'Loss of disinfectant feed alarms and, after a delay, stops finished water delivery', 'Disinfection'],
          ['Maximum feed limit', 'The controller clamps the feed rate at a value that cannot exceed the maximum dose', 'Fluoride, chlorine, and any chemical with a health limit'],
          ['Day tank sizing', 'A day tank holds no more than one day of feed at maximum rate, so an overfeed is bounded', 'Fluoride especially; good practice for all'],
          ['High residual alarm and shutoff', 'Analyzer high alarm stops the feed', 'Fluoride, chlorine, pH chemicals'],
          ['Carrier water interlock', 'Feed only when carrier water flow is proven', 'Dry feeders, dissolvers, injection quills with carrier water'],
          ['Leak detection', 'Gas detection with alarm, ventilation, and feed shutoff', 'Chlorine gas, ammonia, chlorine dioxide'],
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Fluoride overfeed',
        text: 'Fluoride is the chemical that has hurt people through control failures. The protections are layered: a day tank that cannot hold enough to overdose, a feed rate limit in the controller, a flow-paced feed that stops with the flow, a residual analyzer with a high alarm and shutoff, and a daily lab check. Design and test all of them; a plant that relies on one has relied on the one that will fail.',
      },
      { t: 'h2', text: 'What the operator sees' },
      {
        t: 'ul',
        items: [
          'Per chemical: dose setpoint, computed feed rate, feeder output, proven feed status, day tank level and days remaining, residual where measured, and the concentration entered with its date.',
          'Alarms: loss of feed, day tank low, residual high and low, feeder fault, leak detection, carrier water lost.',
          'Trends: dose, residual, and flow together, so a residual excursion can be read against what the feed was doing.',
          'Totals: chemical used per day, which is also the inventory and the regulatory report.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why pace from flow rather than control from the residual alone?',
        a: 'Because the residual is measured downstream after a delay, and a controller that waits for the residual to move reacts late and overshoots. Flow pacing changes the feed the instant the flow changes; the residual loop then corrects slowly for demand changes. Residual-only control oscillates in most plants.',
      },
      {
        q: 'How do I know the pump is delivering what the controller thinks?',
        a: 'Drawdown test with a calibration column: isolate the day tank, let the pump draw from the column for a timed interval, and compute the output. Compare with the expected rate at that speed and stroke. Do it weekly for critical chemicals and after any repair, and record the results; the trend catches wear before the residual does.',
      },
      {
        q: 'What should the feed do if the flowmeter fails?',
        a: 'Hold a fallback: the last good feed rate, or a rate computed from a fixed assumed flow, with an alarm. Pacing from a failed signal reading zero stops disinfection; pacing from a failed signal reading full scale overdoses. Signal validation on the pacing flow is part of every feed loop.',
      },
      {
        q: 'Stroke or speed control on a diaphragm pump?',
        a: 'Speed for the automatic control, because it is linear and repeatable over a wide range. Set the stroke length so that the pump runs in the middle of its speed range at the normal dose, and leave it. Pumps controlled by stroke with a positioner exist, but speed control is simpler and more accurate.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-treatment/disinfection',
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/analytical/ph',
      '/controls/plc-systems/programming/control-strategies',
      '/water-wastewater/water-systems/water-treatment/raw-water',
      '/controls/plc-systems/analog-control/signal-validation',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/storage',
    kind: 'reference',
    title: 'Finished Water Storage',
    summary:
      'Storage inside the plant: the clearwell that provides contact time and high service suction, backwash supply tanks, and how their levels drive production and pumping. The contact time calculation and the minimum level it demands, water age, and alarms.',
    answer:
      'The clearwell holds finished water long enough for disinfection to be credited, buffers the difference between the production rate and the demand, and provides suction for the high service pumps. Its level therefore sets the plant production setpoint, has a minimum below which contact time is not met and the pumps are cut off, and has a maximum where production is reduced and the overflow alarms. Contact time is computed from the effective volume at the current level, the flow through the tank, and the baffling factor, and the control system displays it and alarms when it falls short. Backwash supply tanks and other in-plant storage are managed for availability, and all of them are watched for water age, mixing, and security.',
    keyPoints: [
      'The clearwell level is the plant production setpoint, the high service suction, and the disinfection contact volume at once.',
      'Contact time falls with level; the minimum operating level is a compliance setting, not just a pump protection.',
      'Low level cuts off the high service pumps and alarms; high level cuts production and alarms before the overflow.',
      'Compute and display the contact time continuously from level, flow, and the baffling factor.',
      'Water age and stratification are storage problems; turnover and mixing are the answers.',
      'Backwash supply is a separate availability check before a wash can start.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Level', 'Control', 'Standards', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'What the clearwell does' },
      {
        t: 'p',
        text: 'Finished water leaves the filters and enters the clearwell, where chlorine is added or has just been added, and where it sits long enough for the disinfectant to do its work before the water is pumped to the distribution system. The clearwell also lets the plant produce at a steady rate while the demand varies through the day, and it gives the high service pumps a suction supply. Those three jobs pull in different directions: contact time wants the tank full, buffering wants room to rise and fall, and the pumps want a level that never gets low. The control settings are the compromise, and they are written down.',
      },
      { t: 'h2', text: 'Contact time' },
      {
        t: 'p',
        text: 'Disinfection credit is computed as the disinfectant concentration at the clearwell outlet multiplied by the time the water spends in the tank, with the time taken as the time for the first ten percent of the water to pass through, which is the theoretical detention time reduced by a baffling factor that reflects how much short-circuiting the tank allows. A tank with no baffles has a small factor; a well-baffled serpentine tank has a large one. The required value depends on the pathogen, the temperature, and the pH, and comes from the regulatory tables.',
      },
      {
        t: 'formula',
        expr: 'CT = C × T₁₀ = C × (V_at_level × BF) / Q',
        where: [
          'C = disinfectant residual at the outlet of the contact volume, mg/L',
          'V_at_level = the volume of the clearwell at the current level',
          'BF = the baffling factor, from a tracer study or the regulatory default for the tank geometry',
          'Q = the flow through the clearwell, usually the high service pumping rate',
        ],
      },
      {
        t: 'p',
        text: 'The control system computes this continuously from the level transmitter, the flow, the residual analyzer, and the temperature and pH used to look up the required value, and it displays the ratio of achieved to required. The minimum operating level is the level at which the ratio reaches one at the maximum pumping rate; below it the plant is out of compliance, so the level low alarm and the high service cutoff are set at or above it, with the cutoff protecting compliance as well as the pumps.',
      },
      { t: 'h2', text: 'Level control' },
      {
        t: 'table',
        head: ['Level', 'Action'],
        rows: [
          ['High high', 'Alarm; stop or minimize production; overflow imminent'],
          ['High', 'Reduce the production setpoint; alarm if sustained'],
          ['Normal band', 'Production follows a slow level controller or a schedule; high service pumps run on demand'],
          ['Low', 'Increase production; alarm; contact time ratio displayed and approaching one'],
          ['Low low', 'High service pumps cut off; contact time not met below this level; alarm'],
        ],
      },
      {
        t: 'p',
        text: 'The production controller that follows level is slow and ramp-limited so that the treatment process sees gradual changes. The high service pumps do not follow the clearwell level at all; they follow the distribution system, and the clearwell absorbs the difference. That means the two controllers can fight: high demand drains the clearwell while production is still ramping. The band between the low and low-low levels is the buffer that gives production time to catch up, and it is sized from the maximum demand and the maximum ramp rate.',
      },
      { t: 'h2', text: 'Water age and mixing' },
      {
        t: 'p',
        text: 'Water that sits in storage loses disinfectant residual, warms, and can stratify, with the oldest water at the top of a tank that fills and drains from the bottom. In the clearwell that is managed by keeping the level cycling, by the inlet and outlet arrangement, and by mixing where the tank is large. The larger problem is in distribution storage, where tanks that stay full for reliability turn over slowly; that is covered on the storage tank pages. In the plant, the control system tracks a simple water age from the volume and the flow and alarms a residual at the clearwell outlet that falls below the setpoint.',
      },
      { t: 'h2', text: 'Other in-plant storage' },
      {
        t: 'ul',
        items: [
          'Backwash supply tank or elevated washwater tank: level measured, a minimum available volume for a full wash is a permissive for starting one, and refilling is sequenced so that it does not coincide with a wash.',
          'Waste washwater and equalization tanks: level for the return pumps and the recycle rate to the head of the plant, which is limited by the recycle rules.',
          'Chemical day tanks and bulk tanks: level, days remaining, low alarms, and secondary containment leak detection.',
          'Reclaim and reuse water tanks: level and the interlocks that keep them separate from finished water.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Security and integrity',
        text: 'Finished water storage is where contamination would be most direct. Hatch and vent intrusion alarms, locked access, screened vents and overflows, and periodic inspection are part of the storage design, and the alarms go to the same place as the process alarms. A clearwell hatch alarm at night is investigated, not acknowledged.',
      },
    ],
    faqs: [
      {
        q: 'Why does the high service pump cutoff level seem high?',
        a: 'Because it is set for contact time, not for pump suction. The level below which the clearwell cannot deliver the required contact time at the pumping rate is often several feet above the level where the pumps would lose suction. The cutoff is a compliance setting, and raising the pumping rate raises it.',
      },
      {
        q: 'How is the baffling factor determined?',
        a: 'By a tracer study, in which a tracer is injected at the inlet and its arrival at the outlet is measured to find the time for ten percent to pass, or by the regulatory default for the tank geometry, which is conservative. A tracer study usually earns a higher factor and more credit, and it has to be repeated if the tank is modified.',
      },
      {
        q: 'Should the clearwell be kept as full as possible?',
        a: 'For contact time, yes; for buffering and water age, no. Most plants run in a band in the upper part of the tank that keeps contact time comfortable and still cycles the level daily so that the water turns over. The band is a setpoint pair on the HMI, chosen from the contact time calculation and the daily demand pattern.',
      },
      {
        q: 'What happens if the level transmitter fails?',
        a: 'The contact time calculation, the production controller, and the pump cutoff all lose their input. Validate the signal, provide a second level measurement or backup floats at the critical levels, and define the fallback: production holds its last setpoint and the pumps continue only if a backup low-level switch is satisfied.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-treatment/disinfection',
      '/water-wastewater/water-systems/water-treatment/high-service-pumping',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/water-wastewater/water-systems/storage/elevated-tanks',
      '/controls/instrumentation/level/radar-level',
      '/controls/instrumentation/analytical/chlorine',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-treatment/high-service-pumping',
    kind: 'reference',
    title: 'High Service Pumping',
    summary:
      'Pumping finished water into distribution: the control modes of tank level, pressure, and flow, how they interact with the clearwell and contact time, staging and surge, the telemetry the station depends on and its fallback, energy scheduling, and the alarms.',
    answer:
      'High service pumping delivers finished water from the clearwell into the distribution system at the rate the system needs, controlled by the level of the distribution storage tanks where they exist, by discharge pressure where they do not, or by a flow setpoint into a transmission main, with pumps staged to meet demand and drives used where pressure or flow must be modulated. The station is bounded on the suction side by the clearwell level and the contact time it represents, and on the discharge side by the pressure limits of the system, and it depends on telemetry from remote tanks that must have a local fallback. Surge is managed by slow starts and stops, pump control valves, and relief, and energy cost is managed by filling tanks off peak within the constraints of water age.',
    keyPoints: [
      'Control from the system: tank level where there is storage, pressure where there is not, flow into a main where that is the job.',
      'The clearwell low level and the contact time bound the station on the suction side; distribution pressure limits bound it on the discharge side.',
      'Stage pumps on the controller output and time, not on the controlled variable alone.',
      'Loss of tank telemetry is a normal event; the fallback is local pressure or flow control with an alarm.',
      'Surge control is part of the sequence: slow ramps, control valves that open after the start and close before the stop.',
      'Off-peak tank filling saves energy up to the point where water age suffers.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Water', 'Pumps', 'Control', 'Telemetry', 'VFD'],
    blocks: [
      { t: 'h2', text: 'What the station controls' },
      {
        t: 'table',
        head: ['Mode', 'Controlled variable', 'When used', 'Notes'],
        rows: [
          ['Tank level', 'Level of a distribution storage tank, by telemetry', 'Systems with elevated or ground storage floating on the system', 'Pumps start at a low level and stop at a high level; the tank holds pressure; the simplest and most robust mode'],
          ['Pressure', 'Discharge pressure at the station or at a remote point', 'Systems without floating storage, or zones fed directly', 'A drive holds the pressure; staging adds pumps at high demand; needs surge attention'],
          ['Flow', 'Flow into a transmission main or to a wholesale customer', 'Transfers to another system or a remote tank far away', 'A drive or a control valve holds the flow; pressure is monitored as a limit'],
          ['Schedule', 'Time of day, with level or pressure as limits', 'Energy management', 'Fill tanks off peak; respect water age and minimum levels'],
        ],
      },
      { t: 'h2', text: 'The suction side' },
      {
        t: 'p',
        text: 'The high service pumps draw from the clearwell, and the clearwell has a minimum level that is set by disinfection contact time before it is set by pump suction. As the pumps run, the level falls unless production keeps up, and at the low-low level the pumps are cut off regardless of what the distribution system wants. That cutoff is the point where the plant would deliver water that has not been disinfected long enough, and the alarm before it is the operator warning to raise production or reduce pumping. Suction pressure or clearwell level is therefore an input to the station controller, not just a protection: as the level approaches the low alarm, the station reduces its output rather than waiting for the cutoff.',
      },
      { t: 'h2', text: 'The discharge side' },
      {
        t: 'p',
        text: 'The distribution system sets the limits. A minimum pressure at the customer, commonly 20 psi under all conditions and more under normal conditions, and a maximum pressure that the mains and the service lines tolerate. The station discharge pressure is measured and alarmed at both ends, and where the station feeds a zone directly, a remote pressure point tells the truth about what customers see. Tanks floating on the system hold the pressure between pump cycles, and the pump start and stop levels are chosen so that the pressure stays within limits at the tank elevation.',
      },
      { t: 'h2', text: 'Staging and drives' },
      {
        t: 'p',
        text: 'A station with several pumps starts them in turn as demand rises. In tank level mode the staging is by level: the lead pump starts at one level, the lag at a lower one, and they stop at higher levels in reverse order, with alternation to share hours. In pressure mode a drive on the lead pump holds the pressure, and the lag pump is started when the lead has been at maximum speed for a set time and pressure is still below setpoint, and stopped when the lead has been at minimum speed for a set time and pressure is above. That basis, speed and time rather than pressure alone, keeps the staging from fighting the drive. Minimum run and off times limit cycling, and a pump that fails to prove flow after a start is alarmed and the next one is started.',
      },
      { t: 'h2', text: 'Surge' },
      {
        t: 'p',
        text: 'Stopping a large pump suddenly against a long main produces a pressure wave that can break pipe and lift check valves off their seats. The sequence controls it: drives ramp down over tens of seconds before the pump stops; constant speed pumps start against a closed pump control valve that opens slowly after the start and close it slowly before the stop; surge relief valves and surge tanks handle the power failure case where no sequence is possible. The control system runs the valve sequence with position feedback and timeouts, and it alarms a check valve that slams or a control valve that fails to reach position.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Power failure',
        text: 'The sequence cannot run when the power fails, and every pump stops at once. Surge protection for that case is mechanical, sized by a surge analysis, and the control system only records what happened: pressures at the station and remote points, at a fast rate, for the engineer to review. Trend the discharge pressure at one-second resolution through every unplanned stop.',
      },
      { t: 'h2', text: 'Telemetry and fallback' },
      {
        t: 'p',
        text: 'Tank level mode depends on a level from a tank miles away, over radio, cellular, or leased line. The link fails, and the station has to keep the system supplied while it is down. The fallback is written in the functional description and tested: hold the last known level for a limited time, then switch to pressure control from the station transmitter, or to a time-based duty cycle derived from the demand pattern, with an alarm that says telemetry is lost and the fallback is active. When the link returns, the transition back is bumpless. A station without a fallback has a control system whose availability is that of the radio link.',
      },
      { t: 'h2', text: 'Energy' },
      {
        t: 'p',
        text: 'High service pumping is usually the largest electricity cost in a water utility. Filling the tanks during off-peak hours and letting them draw down during peak hours moves the energy to cheaper time, within the limits of the tank levels and the water age, and drives let the pumps run near their best efficiency point rather than throttled. The control system supports this with a schedule that biases the start and stop levels by time of day, a display of wire-to-water efficiency for each pump, and a report of energy per million gallons. The saving is real; the constraint is that a tank held low for energy reasons is a tank with less fire reserve and less contact for the level fallback.',
      },
      { t: 'h2', text: 'Alarms' },
      {
        t: 'ul',
        items: [
          'Clearwell low and low-low; contact time ratio below one.',
          'Discharge pressure high and low; remote pressure low.',
          'Pump fail to start, fail to prove flow, fail to stop; check valve or control valve failure.',
          'Tank level high and low; tank telemetry lost; fallback active.',
          'Motor and pump protection: overload, high vibration, high bearing or winding temperature, low suction pressure.',
          'Station power fail, generator status, and transfer switch position.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why not control high service pumps from the clearwell level?',
        a: 'Because the clearwell level says how much water the plant has, not how much the system needs. Pumping down the clearwell when the distribution tanks are full raises pressures and wastes energy; the pumps follow the system, and the clearwell level adjusts production instead. The clearwell only limits the pumps at its low level.',
      },
      {
        q: 'How should a station with both a drive and constant speed pumps be run?',
        a: 'The drive pump leads and holds the pressure or flow; the constant speed pumps stage in when the drive has been at maximum for a time and out when it has been at minimum. The drive then absorbs the difference between the fixed pump output and the demand. With alternation, the drive pump is usually kept as lead and the others alternate as lag.',
      },
      {
        q: 'What is a reasonable pump control valve timing?',
        a: 'Whatever the surge analysis says for the main, commonly tens of seconds to a couple of minutes of closing time before the pump stops. The valve opens after the pump reaches speed and closes before it stops, with the pump stop interlocked to the valve closed limit or a timer if the limit fails. The values are setpoints on the HMI, chosen by the engineer, not by trial.',
      },
      {
        q: 'Does off-peak filling risk water quality?',
        a: 'It can, if the tanks are held full for long periods or the schedule leaves them stagnant. Water age rises and residual falls. Set the schedule to cycle the tanks daily, monitor the residual at the tank, and let water quality override the energy schedule when it must.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-pumping/high-service-pumps',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/water-wastewater/water-systems/water-treatment/storage',
      '/water-wastewater/water-systems/storage/elevated-tanks',
      '/controls/plc-systems/programming/control-strategies',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-pumping/high-service-pumps',
    kind: 'reference',
    title: 'High Service Pumps',
    summary:
      'The pumps that carry finished water into distribution: types, the pump curve against the system curve, best efficiency point, the affinity laws and where a drive pays, parallel operation, valves, protection, and the efficiency monitoring that shows wear.',
    answer:
      'High service pumps are usually horizontal split case or vertical turbine centrifugal pumps taking suction from the clearwell and discharging into the distribution system, and they operate where their curve crosses the system curve, which moves as demand and tank levels change. Each pump is most efficient near its best efficiency point, and running far from it wastes energy and shortens life. A drive changes the curve according to the affinity laws, which is valuable where the system head is mostly friction and of limited value where it is mostly static, since below a certain speed the pump cannot overcome the static head at all. Pumps in parallel add flow at the same head, and dissimilar pumps have to be checked for the one that gets pushed off its curve. Pump control valves, check valves, isolation, and protection on vibration, temperature, seal water, and suction pressure complete the installation, and wire-to-water efficiency computed from flow, head, and power is the measure of pump condition.',
    keyPoints: [
      'The operating point is where the pump curve meets the system curve; both move, and the pump has to live everywhere they meet.',
      'Best efficiency point is the design target; a pump run far left or right of it vibrates, heats, and wears.',
      'Affinity laws: flow with speed, head with speed squared, power with speed cubed. Savings from a drive depend on how much of the head is friction.',
      'Static head sets a minimum useful speed; below it the pump delivers nothing and heats the water.',
      'Parallel pumps add flow at equal head; a smaller pump in parallel with a larger one can be forced to shutoff.',
      'Wire-to-water efficiency from flow, head, and power, trended per pump, is the wear indicator.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Pumps', 'Water', 'VFD', 'Engineering', 'Power'],
    blocks: [
      { t: 'h2', text: 'Types' },
      {
        t: 'table',
        head: ['Type', 'Arrangement', 'Where it fits'],
        rows: [
          ['Horizontal split case', 'Double suction impeller, motor beside the pump, flooded suction from the clearwell', 'The common high service pump; easy to maintain, efficient in large sizes'],
          ['Vertical turbine', 'Bowl assembly in a can or in the clearwell, motor above', 'Where suction lift or footprint rules; the clearwell can be the sump'],
          ['End suction', 'Single suction, close coupled or frame mounted', 'Smaller stations and booster duty'],
          ['Multistage', 'Several impellers in series', 'High head at moderate flow, such as feeding a high zone'],
        ],
      },
      { t: 'h2', text: 'Curves' },
      {
        t: 'p',
        text: 'The pump curve, from the manufacturer, gives head against flow at a fixed speed, with efficiency, power, and required net positive suction head drawn on the same axes. The system curve gives the head the system demands at each flow: a static part, which is the elevation difference between the clearwell and the tank or the pressure the system must be held at, and a friction part that rises with the square of the flow. The pump operates where the two curves cross. When a tank fills, the static head rises and the crossing moves left to lower flow; when demand rises and the tank falls, it moves right. When a second pump starts, the system curve is the same but the combined pump curve adds the flows at each head, and each pump moves left on its own curve.',
      },
      { t: 'h2', text: 'Best efficiency point' },
      {
        t: 'p',
        text: 'Every pump has one flow at which its efficiency peaks, and the manufacturer draws a preferred operating range around it, commonly from about 70 to 120 percent of that flow. Inside the range the pump is smooth. To the left, at low flow and high head, recirculation inside the impeller causes vibration, heating, and bearing and seal wear, and at shutoff the water in the casing heats rapidly. To the right, at high flow and low head, the required suction head rises and the pump cavitates. A pump selected for the system at its design point will spend hours at the edges of the range as tanks and demand move; the selection is checked across the whole range of system curves, not at one point.',
      },
      { t: 'h2', text: 'Affinity laws and drives' },
      {
        t: 'formula',
        expr: 'Q₂/Q₁ = N₂/N₁     H₂/H₁ = (N₂/N₁)²     P₂/P₁ = (N₂/N₁)³',
        where: [
          'Q = flow, H = head, P = power, N = speed',
          'The relations hold for the pump curve moving with speed; the system decides where on the new curve the pump runs',
        ],
      },
      {
        t: 'p',
        text: 'The power law is where drive savings come from: a pump slowed to 80 percent speed draws roughly half the power. But the flow it delivers depends on the system curve. Where the head is mostly friction, as in a long transmission main, slowing the pump reduces flow and head together along a curve that follows the system, and the saving is close to the affinity prediction. Where the head is mostly static, as in pumping into an elevated tank, the pump must produce the static head at any flow, and below the speed at which its shutoff head equals the static head it delivers nothing at all. Between that minimum speed and full speed the flow changes quickly and the saving is modest. The economic case for a drive on a high service pump depends on that ratio, and a system curve on the pump curve shows it in one glance.',
      },
      {
        t: 'formula',
        expr: 'Water horsepower = Q × H / 3960     Wire-to-water efficiency = Water horsepower / (Input kW × 1.341)',
        where: [
          'Q = flow in gallons per minute',
          'H = total head in feet, from suction and discharge pressure corrected for elevation and velocity',
          'Input kW = electrical power to the drive or the motor',
        ],
      },
      { t: 'h2', text: 'Parallel operation' },
      {
        t: 'p',
        text: 'Pumps in parallel deliver the sum of their flows at a common head. Identical pumps share the flow; each runs at the same point on its own curve. A smaller pump in parallel with a larger one delivers flow only when the system head is below its shutoff head; as the larger pump raises the head, the smaller one is pushed toward shutoff, where it heats and does nothing useful. The check on any parallel combination is to draw the combined curve against the system curve and confirm that every pump in the combination is within its range at every system condition. A drive pump in parallel with a constant speed pump has the same problem in reverse: at low speed the drive pump cannot reach the head the fixed pump produces, and it runs at shutoff until its speed rises.',
      },
      { t: 'h2', text: 'Valves and fittings' },
      {
        t: 'ul',
        items: [
          'Isolation valves on suction and discharge for maintenance.',
          'A check valve on the discharge, of a type chosen for the surge behavior of the main: a slow-closing swing check slams on a long main; a silent check or a controlled-closing valve does not.',
          'A pump control valve where surge requires it: opens after the pump starts, closes before it stops, on a controlled timing, with limit switches to the controller.',
          'A suction strainer where the clearwell can carry debris, with a differential alarm.',
          'Air release at the high point of the pump casing and at the discharge where air can collect.',
          'Pressure gauges and transmitters on suction and discharge, and a flowmeter on the station discharge or per pump.',
        ],
      },
      { t: 'h2', text: 'Protection' },
      {
        t: 'table',
        head: ['Condition', 'Detection', 'Response'],
        rows: [
          ['Low suction pressure or clearwell level', 'Transmitter, with a delay', 'Stop; protects against cavitation and dry running'],
          ['High discharge pressure', 'Transmitter', 'Stop or reduce speed; a closed valve downstream'],
          ['Fail to prove flow', 'Flowmeter or flow switch, after a start delay', 'Stop and alarm; start the next pump'],
          ['High vibration', 'Vibration switch or transmitter on the bearings', 'Alarm, then stop at the trip level'],
          ['High bearing or winding temperature', 'RTDs', 'Alarm, then stop'],
          ['Seal water loss on packed pumps', 'Flow switch', 'Alarm, stop after a delay'],
          ['Motor overload, phase loss', 'Overload relay, monitor relay', 'Trip in hardware'],
          ['Excessive starts', 'Counter in the controller', 'Block the next start until the interval has elapsed'],
        ],
      },
      { t: 'h2', text: 'Watching the pump wear' },
      {
        t: 'p',
        text: 'A worn impeller or wear ring delivers less head at a given flow and speed and uses more power for the water it moves. The control system can see it: compute the water horsepower from the flow and the head, divide by the input power, and trend the efficiency for each pump at comparable operating points. A pump whose efficiency has fallen by several points since commissioning is due for inspection, and a station that trends this schedules pump overhauls on evidence rather than on failure. The same data shows a pump running far from its best efficiency point most of the time, which is a selection or a staging problem worth fixing.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Check the whole range',
        text: 'Before accepting a pump, put every system curve on its curve: tank empty and full, one pump and all pumps, the transmission main new and aged. The pump has to be within its preferred range at every crossing that will happen in practice. Most high service pump problems were visible on that drawing before the pump was bought.',
      },
    ],
    faqs: [
      {
        q: 'Will a drive on the high service pump save energy?',
        a: 'It depends on the head. On a system where most of the head is friction, a drive saves a great deal by matching flow to demand at low speed. On a system pumping into a tank with a high static head, the pump has to run near full speed to deliver anything and the drive saves little beyond the soft start. Draw the system curve and decide from it.',
      },
      {
        q: 'How low can a drive pump run?',
        a: 'Down to the speed at which its shutoff head equals the static head, plus a margin so it actually delivers flow, and in any case above the minimum the motor and pump need for cooling and lubrication. On a high static head system that minimum can be 80 or 90 percent of full speed; the drive is then a soft starter with a narrow control range.',
      },
      {
        q: 'Why does the small pump in the station never seem to move water when the big one runs?',
        a: 'Because the big pump raises the system head above the small pump shutoff head, and the small pump is pushed off its curve. That combination should not run; the staging logic should either run the small pump alone or the big one alone, or the small pump needs to be replaced with a match.',
      },
      {
        q: 'What total head should I use for the efficiency calculation?',
        a: 'Discharge pressure minus suction pressure, converted to feet, corrected for the elevation difference between the two gauges and, where the suction and discharge pipes are different sizes, the difference in velocity head. Use the same taps every time so the trend is consistent.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-treatment/high-service-pumping',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/water-wastewater/water-systems/water-pumping/booster-pumps',
      '/controls/control-panels/pump-panels/vfd',
      '/controls/instrumentation/pressure/differential-pressure',
      '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-pumping/vfd-control',
    kind: 'reference',
    title: 'VFD Control for Water Pumping',
    summary:
      'Variable speed pumping and where it earns its cost: the affinity laws and how static head limits the savings, the minimum speed a pump can run, pressure, flow, and level control with a drive, and how to estimate the savings before buying.',
    answer:
      'A variable frequency drive lets a pump run at the speed the system needs instead of the speed the motor happens to have, and on a system with mostly friction head that saves a great deal of energy, because power falls with the cube of speed while flow falls only in proportion. On a system with mostly static head, a well lifting water to a tank or a booster feeding a hill, the pump must run near full speed to make any flow at all, and the savings shrink to the point where a constant speed pump with an alternation scheme may cost less to own. The control is a loop on pressure, flow, or level that sets the speed, bounded by a minimum speed below which the pump makes no useful flow and a maximum at the motor rating, with several drives sharing the load at equal speed when one is not enough. The drive brings its own needs: an inverter-rated motor, cable length limits or filters, harmonic mitigation on a weak service, and heat in the panel, all of which are part of the decision.',
    keyPoints: [
      'Savings come from friction head; static head forces the pump toward full speed and eats the savings.',
      'Minimum speed is set by the static head and the pump curve, not by the drive; below it the pump churns.',
      'Control on pressure, flow, or level with one loop setting the speed and limits on both ends.',
      'Run parallel pumps at the same speed; add a pump when the running ones reach maximum, remove one at minimum.',
      'Count the motor, the cable, the harmonics, and the panel heat in the cost before deciding.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Pumps', 'VFD', 'Control', 'Power'],
    blocks: [
      { t: 'h2', text: 'The affinity laws and their limit' },
      {
        t: 'formula',
        expr: 'Q₂ ÷ Q₁ = N₂ ÷ N₁;   H₂ ÷ H₁ = (N₂ ÷ N₁)²;   P₂ ÷ P₁ = (N₂ ÷ N₁)³',
        where: [
          'Q = flow, H = head, P = power, N = speed',
          'These describe one pump at two speeds on the same system curve; the system decides where the pump actually runs',
        ],
      },
      {
        t: 'p',
        text: 'The cube law is the promise: half speed, an eighth of the power. It holds when the system curve passes near the origin, which is a system of pipe friction with little elevation change. When the system has static head, the pump at reduced speed produces less head, and at some speed it produces exactly the static head and no flow. Between full speed and that point the pump runs on a steep part of its curve, its efficiency falls, and the power saving is a fraction of the cube law. The savings estimate must be made on the actual system curve with the actual duty profile, not on the affinity laws alone.',
      },
      {
        t: 'formula',
        expr: 'N_min ≈ N_rated × √(H_static ÷ H_shutoff)',
        where: [
          'N_min = the speed at which the pump just reaches the static head with no flow',
          'H_static = static head of the system',
          'H_shutoff = pump shutoff head at rated speed',
          'Practical minimum speed is somewhat above this so the pump delivers useful flow with acceptable efficiency',
        ],
      },
      {
        t: 'table',
        head: ['System', 'Static head share', 'Speed range with useful flow', 'Savings prospect'],
        rows: [
          ['Distribution booster on flat terrain', 'Low', 'Wide', 'Large; pressure control pays quickly'],
          ['Booster to an elevated zone', 'High', 'Narrow, near full speed', 'Small; consider constant speed with a pressure-reducing or alternation scheme'],
          ['Well pump to a ground tank', 'High', 'Narrow', 'Small; the drive mainly softens starts and trims flow'],
          ['High service pump to a system with storage', 'Moderate', 'Moderate', 'Moderate; depends on the storage and the demand profile'],
          ['Plant internal transfer', 'Low to moderate', 'Wide', 'Good; flow control replaces throttling'],
        ],
      },
      { t: 'h2', text: 'Control loops' },
      {
        t: 'dl',
        items: [
          { term: 'Pressure control', def: 'A pressure transmitter at the discharge or at a remote point sets the speed to hold a setpoint; the standard booster loop. A remote pressure transmitter, or a setpoint that rises with flow, compensates for friction so that the far end of the system sees constant pressure.' },
          { term: 'Flow control', def: 'A flowmeter sets the speed to hold a flow setpoint; used for transfer, filter feed, and flow-paced processes. Ramp limits prevent surges.' },
          { term: 'Level control', def: 'A tank or wet well level sets the speed so that inflow matches outflow, or the speed holds a level band; softer on the system than on and off pumping.' },
          { term: 'Limits', def: 'A minimum speed from the static head calculation, a maximum at the motor rating, a minimum flow or a no-flow detection that stops the pump at minimum speed, and a discharge pressure high limit.' },
        ],
      },
      { t: 'h2', text: 'Several pumps' },
      {
        t: 'p',
        text: 'When one pump at maximum speed cannot meet the demand, a second is started and both run at the same speed, because two pumps at different speeds on one header fight and the slower one delivers little. The loop then controls the common speed. When the pumps together fall to a speed where one could do the work, one is stopped, with hysteresis and minimum run and stop times so that the staging does not hunt. Each pump on its own drive is the flexible arrangement; one drive with constant speed pumps beside it is cheaper and works when the drive pump can span the gaps.',
      },
      { t: 'h2', text: 'What the drive brings with it' },
      {
        t: 'ul',
        items: [
          'An inverter-duty motor, or an existing motor checked for insulation and bearing suitability; a shaft grounding ring on larger motors.',
          'Cable length limits from the drive to the motor, or an output filter for long runs to a well or a remote pump.',
          'Harmonics on the supply; a line reactor or a low-harmonic drive where the service or the generator is weak.',
          'Heat in the panel, a few percent of the drive rating, in the enclosure heat calculation.',
          'A bypass contactor or a spare drive where the pump must run when the drive fails.',
          'Drive faults and diagnostics on the network, and a drive noise plan for the instrument wiring.',
        ],
      },
      { t: 'h2', text: 'Estimating before buying' },
      {
        t: 'steps',
        items: [
          { title: 'Get the duty profile', text: 'Flow against hours from the historian or a logger, for a year if possible.' },
          { title: 'Draw the system curve', text: 'Static head plus friction, from the hydraulic model or a field test at two flows.' },
          { title: 'Find the operating points', text: 'Pump speed and power at each flow in the profile on the actual curve.' },
          { title: 'Compare', text: 'Energy per year against the existing arrangement, including a throttling valve if one exists.' },
          { title: 'Add the costs', text: 'Drive, motor, filter, panel changes, harmonic mitigation, and maintenance; and the benefits beyond energy, soft starting, surge reduction, and process control.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Soft starting is a benefit on its own',
        text: 'Even where the energy case is weak, a drive that ramps a large pump up and down protects the force main and the check valves from surge and the electrical system from inrush. A soft starter does that at lower cost without the speed control; the choice depends on whether speed control is also wanted.',
      },
    ],
    faqs: [
      {
        q: 'Why does the pump vibrate and heat up at low speed?',
        a: 'Below the minimum speed the pump makes little or no flow and churns the water in its casing, heating it and running off its curve. Raise the minimum speed setting to where the pump delivers flow, and stop the pump instead of running it below that.',
      },
      {
        q: 'Should every pump have a drive?',
        a: 'Not necessarily. One drive pump for trimming with constant speed pumps for base load is a common and economical arrangement where the drive pump can cover the gaps between stages. Every pump on a drive gives the most flexibility and the most equipment.',
      },
      {
        q: 'How much energy will a drive save on a well?',
        a: 'Often little, because a well pump lifts against a large static head and must run near full speed. The drive earns its place on a well by soft starting, by trimming flow to a treatment rate, and by reducing water hammer, not by energy.',
      },
      {
        q: 'Can I retrofit a drive on an existing motor?',
        a: 'Often, with the motor checked for insulation class and bearing protection, the cable length considered, and a filter added if needed. Older motors and long cable runs are the cases that fail; the motor manufacturer guidance and a drive vendor review settle it.',
      },
    ],
    related: [
      '/controls/control-panels/pump-panels/vfd',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/water-wastewater/water-systems/water-pumping/flow-control',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control',
      '/troubleshooting/vfd-troubleshooting/motor-will-not-reach-speed',
      '/controls/plc-systems/analog-control/pid',
    ],
  },
  {
    path: '/water-wastewater/water-systems/water-pumping/flow-control',
    kind: 'reference',
    title: 'Flow Control in Water Pumping',
    summary:
      'Controlling the flow a pumping system delivers: speed against valves, flow-paced pumping to a treatment rate, the flow loop with its ramp limits and its meter placement, and the loop tuning that keeps a flow controller steady.',
    answer:
      'Flow control means making a pumping system deliver a rate that something else has chosen: a treatment plant that can accept so many gallons per minute, a filter train with a design loading, a chemical process that needs a steady flow to dose against, or a schedule that fills a tank overnight. The manipulated variable is pump speed where the pumps are on drives, or a control valve where they are not, and speed is preferred because throttling wastes the energy the pump put in. The loop is a flowmeter feeding a PID controller that sets the speed or the valve, with a ramp limit on the setpoint so that the system does not surge, with a meter located where the flow is fully developed and free of air, and with the staging of pumps handled by the same logic that handles it for pressure control. Above the loop sits the reason for the setpoint: a plant rate, a filter rate, a level, or a daily volume, and that is where most of the design attention belongs.',
    keyPoints: [
      'Control flow with speed where drives exist; throttle with a valve only where they do not.',
      'The flow loop needs a good meter, a ramp-limited setpoint, and a controller tuned slower than the pressure dynamics.',
      'The setpoint comes from the process: a treatment rate, a filter rate, a level, or a daily volume.',
      'Stage pumps on flow with hysteresis and minimum times, and split flow between trains with equal-percentage logic.',
      'Ramp rates protect the system from surge; check valves and pressure limits back them up.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Pumps', 'Flow', 'PID', 'Control'],
    blocks: [
      { t: 'h2', text: 'Speed or valve' },
      {
        t: 'table',
        head: ['Method', 'How', 'Energy', 'When'],
        rows: [
          ['Pump speed on a drive', 'The controller sets the drive speed', 'Efficient; the pump makes only the head the flow needs', 'Whenever drives exist or the case for them is made'],
          ['Control valve on the discharge', 'The controller throttles a valve; the pump runs at full speed', 'Wastes the throttled head as heat and noise', 'Constant speed pumps, small flows, or where a valve already exists'],
          ['Pump staging alone', 'Flow steps with the number of pumps', 'Efficient but coarse', 'Systems with storage that can absorb the steps'],
          ['Bypass or recirculation', 'Excess flow returned to the source', 'Wasteful', 'Minimum flow protection only'],
        ],
      },
      { t: 'h2', text: 'The loop' },
      {
        t: 'p',
        text: 'A flowmeter, a PID controller, and a drive or valve form a loop that is faster and more oscillatory than a level loop, because flow responds to speed in seconds. The controller is tuned with modest gain and a short integral time, with derivative off, and the setpoint is passed through a ramp so that a large change is applied over tens of seconds rather than at once. The output is limited between the minimum speed at which the pump makes useful flow and the maximum, and a change of the number of running pumps is accompanied by a bumpless adjustment of the speed so that the flow does not jump. Feedforward from a known disturbance, a filter going into backwash for example, keeps the loop from having to catch up.',
      },
      { t: 'h2', text: 'The meter' },
      {
        t: 'ul',
        items: [
          'Magnetic or ultrasonic on a full pipe with the straight runs the meter type needs; a meter in a fitting-crowded header reads noise.',
          'Downstream of the check valves and any air release, upstream of the first branch.',
          'Sized so the normal flow sits in the middle of its range; a meter oversized for a future flow reads poorly today.',
          'The signal filtered lightly in the transmitter and not again in the controller; excess damping makes the loop sluggish.',
          'A low-flow cutoff so that a stopped system reads zero rather than a drifting few gallons per minute.',
        ],
      },
      { t: 'h2', text: 'Where the setpoint comes from' },
      {
        t: 'dl',
        items: [
          { term: 'Treatment rate', def: 'The plant operator sets a rate the treatment train can handle; raw water pumps deliver it and the rate changes with chemical feed and clarifier loading. The setpoint is entered on the screen with limits.' },
          { term: 'Filter or membrane feed', def: 'Each train has a design loading; the feed flow is controlled per train, and the total is split between trains in service, equally or by capacity.' },
          { term: 'Level cascade', def: 'A tank or clearwell level controller outputs a flow setpoint to the pump flow loop; the level loop is slow, the flow loop fast, and the cascade keeps the level without the flow swinging.' },
          { term: 'Daily volume and schedule', def: 'A target volume by a set time, pumped at a rate computed from what remains and the hours left, often shifted into off-peak power periods; the flow loop makes the rate real.' },
          { term: 'Ratio', def: 'A flow held in proportion to another flow, for blending sources or for a sidestream.' },
        ],
      },
      {
        t: 'formula',
        expr: 'Q_setpoint = (V_target − V_delivered) ÷ t_remaining',
        where: [
          'V_target = the volume to deliver by the end of the window',
          'V_delivered = the volume delivered so far in the window',
          't_remaining = the time left in the window',
          'Bounded by the pump minimum and maximum flows; recomputed on an interval',
        ],
      },
      { t: 'h2', text: 'Surge and protection' },
      {
        t: 'ul',
        items: [
          'Ramp the speed on start and stop; a pump stopped at full speed slams the check valve and sends a wave down the main.',
          'A discharge pressure high limit that overrides the flow loop.',
          'A minimum flow detection that stops a pump rather than running it against a closed system.',
          'Check valves that close before reverse flow, and surge relief where the main is long or steep.',
          'A controlled stop on power loss where the drive and the process allow it, or a surge analysis where they do not.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Tune the flow loop with the pressure in view',
        text: 'A flow loop that is tuned aggressively will make pressure swing on a long main. Watch the discharge pressure while tuning, and accept a slower flow response if the pressure otherwise oscillates; the process upstream rarely needs the flow corrected in seconds.',
      },
    ],
    faqs: [
      {
        q: 'The flow oscillates a few percent all the time.',
        a: 'Too much controller gain for the loop, a noisy meter feeding it, or a drive speed reference with a coarse resolution. Reduce the gain, check the meter installation, and look at the drive reference scaling.',
      },
      {
        q: 'Can I control flow with a valve and a drive together?',
        a: 'Only with a defined split, such as the drive holding the flow and the valve fixed, or the valve holding a pressure while the drive holds flow. Two controllers on one flow fight.',
      },
      {
        q: 'How do I split flow between three filter trains?',
        a: 'A total flow setpoint divided by the trains in service, each train with its own flow loop on its own valve or feed, and the split adjusted by capacity or by run time. A train going into backwash drops out and the others pick up its share on the next calculation.',
      },
      {
        q: 'What ramp rate should I use?',
        a: 'Slow enough that the pressure at the far end of the main does not swing beyond a few psi on a setpoint change: tens of seconds from minimum to maximum on a short main, minutes on a long one. The surge analysis, if one exists, states it.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-pumping/vfd-control',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/water-wastewater/water-systems/water-treatment/raw-water',
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/controls/plc-systems/analog-control/pid',
      '/how-to/plc-how-to/create-a-pid-loop',
    ],
  },
  {
    path: '/water-wastewater/water-systems/storage/ground-storage-tanks',
    kind: 'reference',
    title: 'Ground Storage Tanks',
    summary:
      'Controls for ground storage tanks: level measurement and its datum, filling from wells and treatment by pump control or altitude valve, and the telemetry that ties the tank to the system.',
    answer:
      'A ground storage tank sits between supply and demand: wells or a treatment plant fill it, high service pumps draw from it, and its level is the variable that runs both. The controls are a level measurement referenced to a documented datum, a fill control that starts sources at a low band and stops them at a high band or throttles an altitude valve, a low level cutoff that protects the high service pumps from running dry, high level and overflow alarms that arrive before the overflow, and a telemetry link that gives the operators and the SCADA system the level and the alarms. Behind those basics are the concerns of a stored water: turnover so that the water does not age and lose its residual, a level cycle that exercises the full volume, mixing where stratification is a problem, and freeze protection in cold climates. The tank is also where a system finds out whether its sources and its pumps are matched, because a tank that trends down in summer says the sources cannot keep up.',
    keyPoints: [
      'Level to a documented datum, with a second independent high level switch for the overflow alarm.',
      'Fill by pump control on level bands or by an altitude valve; either way the bands come from the tank volume and the source capacity.',
      'Low level cutoff protects the high service pumps; an inhibit above it prevents restarts in a dying tank.',
      'Cycle the level through enough of the volume to turn the water over; a full tank is an old tank.',
      'Trend the level against time: a tank that loses ground reveals a source or a demand problem before anything else does.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Level', 'Control', 'Pumps', 'SCADA'],
    blocks: [
      { t: 'h2', text: 'Measurement' },
      {
        t: 'p',
        text: 'A submersible hydrostatic transmitter at the tank floor, a radar unit at the roof, or a pressure transmitter on the tank outlet reads the level, referenced to a datum that is written on the drawing, usually the tank floor. The transmitter range covers the full tank with margin above the overflow; the scaling in the controller matches the range; and a float switch or a second transmitter provides an independent high level alarm that does not depend on the primary. The level tag carries its unit and its datum in its description, because a level in feet above the floor and a level in feet above sea level are both feet.',
      },
      { t: 'h2', text: 'Filling' },
      {
        t: 'table',
        head: ['Method', 'How it works', 'Notes'],
        rows: [
          ['Pump control on level bands', 'Sources start at the lead-on level and stop at the off level; more sources at lower bands', 'The usual arrangement for wells and treated water pumps; bands sized for starts per hour and source capacity'],
          ['Altitude valve', 'A hydraulic valve on the inlet throttles or closes as the tank approaches full', 'Fills from a pressurized system without pump control; needs its own maintenance; a level signal still needed for telemetry'],
          ['Treatment plant flow', 'The plant produces at a rate set from the tank level trend', 'The tank level or its rate of change sets the plant production setpoint'],
          ['Timed or scheduled fill', 'Sources run in off-peak hours to reach a target level by morning', 'Combined with level bands as limits'],
        ],
      },
      {
        t: 'p',
        text: 'The bands are set from the tank geometry and the source capacity: the volume between off and lead-on decides how often the sources cycle and must keep starts per hour within the motor ratings, and the volume between lead-on and the low alarm decides how much time the operators have when a source fails. With several sources, they are staged at successive bands and alternated, and a source that fails is skipped. The bands are on the screen with limits and in the control narrative.',
      },
      { t: 'h2', text: 'Drawing from the tank' },
      {
        t: 'p',
        text: 'High service pumps take suction from the tank and stop when it is too low, at a level that keeps the suction submerged and the pumps within their net positive suction head. Above the cutoff is an inhibit level below which a pump that has stopped may not restart, so that the pumps do not cycle in a tank that is barely refilling. The low level alarm sits above the inhibit, with enough volume to act. Where the tank is the only storage, the low level condition also drives the demand side: a pressure setpoint reduction, a notice to large users, or a purchase from a neighbor, according to the plan.',
      },
      { t: 'h2', text: 'Alarms' },
      {
        t: 'ul',
        items: [
          'High level from the primary transmitter, and an independent high-high from a switch, both before the overflow.',
          'Low and low-low from the primary, with the cutoff below.',
          'Rate of change: filling faster than any source can fill is a transmitter fault; falling faster than demand can explain is a leak or a main break.',
          'Stale level: a level that has not moved in hours with pumps running is a failed transmitter or a frozen line.',
          'Communication loss from the tank site, with the fill sources holding a safe state.',
        ],
      },
      { t: 'h2', text: 'Turnover and age' },
      {
        t: 'p',
        text: 'Water in a tank loses its disinfectant residual with time and warms in summer, and a tank that is kept near full turns over only a small fraction of its volume each day. The control cycles the level through a deliberate range, deeper in summer, so that a meaningful fraction of the volume is replaced daily, and the operators track the calculated water age and the residual at the outlet. A mixing system, a jet or a mechanical mixer, is added where stratification or dead zones persist, with its own run logic and alarm. In cold climates the level cycle also breaks ice and the inlet and outlet arrangements keep the water moving; a tank left full and still in a hard freeze is a tank with an ice problem.',
      },
      {
        t: 'formula',
        expr: 'Turnover (days) ≈ V_tank ÷ V_cycled_per_day',
        where: [
          'V_tank = the operating volume of the tank',
          'V_cycled_per_day = the volume drawn and refilled each day, from the level cycle and the tank geometry',
          'Many utilities target a turnover of a few days; the residual trend says whether it is enough',
        ],
      },
      { t: 'h2', text: 'Telemetry' },
      {
        t: 'p',
        text: 'The tank level is often the most important single signal in a small system, and it travels by radio or cellular from a site with no staff. The design gives the tank site a reliable link with a watchdog, a battery-backed transmitter and radio, a local high level alarm that does not depend on the link, and a fill control that behaves safely when the link is lost: sources at a remote site run on their own local level signal where possible, or hold their last command for a limited time and then go to a safe state.',
      },
    ],
    faqs: [
      {
        q: 'Where should the fill sources get the level from?',
        a: 'From the tank transmitter over telemetry for normal control, with a local backup at the source if the link can fail: a pressure transmitter on the source discharge that infers the tank level, or a timed fill with limits. The narrative states the behavior on communication loss.',
      },
      {
        q: 'How deep should the level cycle be?',
        a: 'Deep enough to turn the water over in a few days while keeping enough storage for fire flow and outages: the two constraints set the band, and the residual at the outlet says whether the cycle is deep enough.',
      },
      {
        q: 'The tank overflowed with no high level alarm.',
        a: 'The primary transmitter failed high or was stuck, and there was no independent high level switch, or the switch was there and not alarmed. Add the independent switch, alarm it, and add a rate-of-change and stale-value check on the primary.',
      },
      {
        q: 'Can the same level control the wells and the high service pumps?',
        a: 'Yes: the wells fill on the upper bands and the high service pumps are protected by the lower ones, and both read the same transmitter with the independent switch as the safety. The bands are separated so that the two functions never fight.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/water-wastewater/water-systems/storage/elevated-tanks',
      '/water-wastewater/water-systems/storage/pump-sequencing',
      '/water-wastewater/water-systems/water-pumping/well-pumps',
      '/controls/instrumentation/level/hydrostatic-level',
      '/controls/instrumentation/level/radar-level',
    ],
  },
  {
    path: '/water-wastewater/water-systems/storage/pump-sequencing',
    kind: 'reference',
    title: 'Pump Sequencing for Storage',
    summary:
      'Sequencing the pumps that fill and draw from storage: staging on level bands, rotating wells and sources for even use and water quality, time-of-day and demand-based scheduling, and the records that show the sequence is doing its job.',
    answer:
      'Sequencing decides which pumps run, in what order, and when, to keep a tank within its band using the sources a system has. The basic form is staging on level: the first source starts at the lead-on level, the second at a lower band, and so on, with all stopping at the off level; the refinements are rotation so that each well or pump shares the duty and each is exercised, scheduling so that pumping happens in cheap power hours and the tank is full before the morning demand, minimum run and rest times so that no source short-cycles, staggered starts so the electrical system sees one motor at a time, and a failure logic that promotes the next source when one is unavailable. Where the sources differ, in capacity, in water quality, or in cost, the sequence also decides which to prefer, and the operators need to see the reasoning on the screen. The proof that it works is in the trends: level within band, hours balanced, starts within rating, and energy in the off-peak hours.',
    keyPoints: [
      'Stage on level bands sized from the tank volume, the source capacities, and the starts-per-hour limits.',
      'Rotate sources for even wear and exercise; prefer sources by cost or quality when the design says so.',
      'Schedule pumping into off-peak hours with the level bands as the limits and a full tank before peak demand.',
      'Minimum run, minimum rest, and staggered starts keep motors and the electrical system within limits.',
      'A failed or unavailable source is skipped automatically and alarmed; the sequence never waits for an operator.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Pumps', 'Level', 'Control', 'Design'],
    blocks: [
      { t: 'h2', text: 'Staging on level' },
      {
        t: 'table',
        head: ['Level band', 'Action', 'Sizing'],
        rows: [
          ['Off', 'All fill sources stop', 'Below the overflow with margin; above the level that keeps water moving'],
          ['Lead on', 'First source starts', 'Volume between off and lead-on sets the cycle frequency for one source'],
          ['Lag on', 'Second source starts', 'Below lead-on by a volume that gives the first source time to show it is winning or losing'],
          ['Third and more', 'Further sources start', 'Successively lower; each band gives the previous stage time'],
          ['Low alarm', 'Operator alerted', 'Enough volume above the pump cutoff for a response'],
          ['Low cutoff', 'Draw pumps stopped', 'Pump protection'],
        ],
      },
      {
        t: 'p',
        text: 'The bands can be fixed levels or a level PID output that stages pumps at output thresholds; the fixed bands are easier to understand at a lift station or a tank site and are what most systems use. Hysteresis between the on and off levels for each stage, and a minimum run time, stop a source from cycling on a level that hovers at its band.',
      },
      { t: 'h2', text: 'Rotation and preference' },
      {
        t: 'ul',
        items: [
          'Rotate the lead source each cycle or by run hours so that wells share the drawdown and pumps share the wear.',
          'Exercise a source that has not run for a set period, so that a standby well does not sit idle for a season.',
          'Prefer the cheaper or better-quality source by making it lead more often, with the reasoning on the screen.',
          'Hold a source out for water quality, a sanding well or one with a rising nitrate, by a selection that the sequence respects and alarms on after a set time.',
          'Blend sources by running them in proportion where the quality requires it, with the blend ratio as a setpoint.',
        ],
      },
      { t: 'h2', text: 'Scheduling' },
      {
        t: 'p',
        text: 'Power costs differ by hour, and demand differs by hour, and the tank is the buffer between them. A schedule lets the sequence pump the tank full during off-peak hours and hold the fill sources off during peak hours as long as the level stays above a reserve band; the level bands remain as the limits so that a hot day overrides the schedule. The schedule is a setpoint table on the screen, the reserve level is a limit the operators cannot set below the fire reserve, and the energy report shows how much pumping happened in each period.',
      },
      {
        t: 'formula',
        expr: 'Required fill rate = (L_target − L_now) × A_tank ÷ t_window',
        where: [
          'L_target = the level wanted at the end of the window',
          'L_now = the current level',
          'A_tank = the tank area, so that level times area is volume',
          't_window = the hours left in the off-peak window',
          'Compared with source capacities to decide how many to run',
        ],
      },
      { t: 'h2', text: 'Protecting the equipment' },
      {
        t: 'dl',
        items: [
          { term: 'Minimum run time', def: 'Once started, a source runs for a set minimum unless a fault or the high level stops it; well pumps in particular need minutes, not seconds.' },
          { term: 'Minimum rest time', def: 'Once stopped, a source waits before restarting; the motor rating for starts per hour sets it.' },
          { term: 'Staggered start', def: 'Sources called at the same time start seconds apart, and on generator power the stagger is longer.' },
          { term: 'Ramped start', def: 'Drives and soft starters ramp; across-the-line starts are staggered and the check valves and surge protection sized for them.' },
          { term: 'Drawdown limits', def: 'A well is not run below its safe drawdown; a level or a pressure in the well casing stops it and the sequence promotes the next source.' },
        ],
      },
      { t: 'h2', text: 'Failure handling' },
      {
        t: 'p',
        text: 'A source that fails to start, trips, is in off, or is locked out is skipped: the sequence promotes the next source at once, alarms, and holds the failed source out until it is reset. A level transmitter that fails is detected by its diagnostics and by rate-of-change checks, and the sequence falls back to a local level signal, a timed fill, or a safe state, according to the narrative. A communication loss between the tank and the sources is handled the same way. Every one of these is tested at commissioning by simulating the failure, and the response is in the control narrative.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Show the reasoning',
        text: 'A sequence that starts a well at two in the morning for reasons the operator cannot see is a sequence the operator will put in hand. The screen shows the level, the bands, the schedule state, the rotation order, which source is next and why, and which sources are held out. The trend of runs and hours per source is the report.',
      },
    ],
    faqs: [
      {
        q: 'How many sources should run at once?',
        a: 'As many as the level band calls for, limited by what the electrical system and the treatment can take; the design states the maximum and the sequence enforces it. Running one source longer beats running three sources in short cycles.',
      },
      {
        q: 'Should wells alternate or should the best well lead?',
        a: 'Both can be true: rotate for exercise and drawdown recovery, and weight the rotation toward the well with the best quality or lowest cost. A well never run is a well with a surprise in it.',
      },
      {
        q: 'The tank never reaches the off level in summer.',
        a: 'The sources cannot keep up with demand at the pumping hours allowed. Extend the schedule window, add a source to the stage, check that every source is actually producing its rated flow, and look at the demand for leaks or unusual users.',
      },
      {
        q: 'Where does the sequence live, in the tank site controller or the source controllers?',
        a: 'Usually in one controller with the level, the tank site or the plant, which sends run commands to the sources; each source keeps local protection and a fallback. A sequence split across several controllers with no master is hard to reason about.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/storage/ground-storage-tanks',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/water-wastewater/water-systems/water-pumping/well-pumps',
      '/water-wastewater/water-systems/water-treatment/wells',
      '/controls/control-panels/pump-panels/alternation',
      '/how-to/plc-how-to/program-lead-lag-pumps',
    ],
  },
  {
    path: '/water-wastewater/water-systems/membrane-treatment/reverse-osmosis',
    kind: 'reference',
    title: 'Reverse Osmosis',
    summary:
      'Reverse osmosis from the controls side: what the skid contains, the instruments that matter, the numbers an operator watches, recovery, rejection, normalized permeate flow, and the trends that say when the membranes need cleaning or replacement.',
    answer:
      'Reverse osmosis pushes water through a membrane under pressure so that the water passes and the dissolved salts mostly do not, and a municipal skid is a set of pressure vessels holding spiral-wound elements, a high-pressure feed pump on a drive, a concentrate valve, cartridge prefilters, and the chemical feeds that keep the membranes from scaling, fouling, or being oxidized. The controls read feed, interstage, concentrate, and permeate pressures, permeate and concentrate flows, feed and permeate conductivity, pH, temperature, and an oxidant check ahead of the membranes, and from them compute the recovery, the salt rejection, the normalized permeate flow, and the differential pressure that tell the operators how the membranes are doing. The skid runs a start sequence with a low-pressure flush and a pressure ramp, a steady state with permeate flow held by the pump speed and recovery held by the concentrate valve, and a shutdown with a flush; and it trips on high pressure, low feed pressure, high permeate conductivity, and oxidant breakthrough. The trends of the normalized values, not the raw ones, decide when to clean.',
    keyPoints: [
      'The skid: prefilters, high-pressure pump on a drive, pressure vessels in stages, concentrate valve, permeate, flush, and chemical feeds.',
      'Instruments: pressures at feed, interstage, concentrate, and permeate; permeate and concentrate flows; conductivities; pH; temperature; an oxidant check.',
      'Watch the normalized permeate flow, salt rejection, differential pressure, and recovery, corrected for temperature and pressure.',
      'Control permeate flow with pump speed and recovery with the concentrate valve; ramp pressure slowly on start.',
      'Trip on high pressure, low feed pressure, high permeate conductivity, and oxidant in the feed; flush on every stop.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Water', 'Instrumentation', 'Control', 'Pumps', 'Design'],
    blocks: [
      { t: 'h2', text: 'The skid' },
      {
        t: 'table',
        head: ['Element', 'Purpose', 'Control interest'],
        rows: [
          ['Cartridge prefilters', 'Remove particles that would foul the elements', 'Differential pressure; change at a limit'],
          ['Chemical feeds', 'Antiscalant against scale; acid for pH; bisulfite or activated carbon to remove chlorine', 'Flow-paced dosing; interlocked with feed flow; oxidant check downstream'],
          ['High-pressure feed pump', 'Provides the driving pressure', 'Drive speed sets permeate flow; ramp limits; low suction and high discharge protection'],
          ['Pressure vessels in stages', 'Hold the elements; the concentrate of one stage feeds the next', 'Pressures at each stage; differential pressure per stage'],
          ['Concentrate valve', 'Sets the concentrate flow and therefore the recovery', 'Position control from a recovery or concentrate flow loop'],
          ['Permeate line', 'Product water to stabilization and storage', 'Flow, conductivity, pressure; a divert valve for off-specification permeate'],
          ['Flush system', 'Displaces concentrate from the vessels at shutdown with permeate or low-pressure feed', 'Sequence step; flush volume and duration'],
          ['Interstage boost', 'On some skids, a pump between stages to balance flux', 'Speed control for the second stage'],
        ],
      },
      { t: 'h2', text: 'The numbers' },
      {
        t: 'formula',
        expr: 'Recovery (%) = Q_permeate ÷ Q_feed × 100 = Q_permeate ÷ (Q_permeate + Q_concentrate) × 100',
        where: [
          'Q_permeate = permeate flow',
          'Q_feed = feed flow',
          'Q_concentrate = concentrate flow',
          'Municipal brackish skids run roughly 75 to 85 percent; set by the scaling limit of the water',
        ],
      },
      {
        t: 'formula',
        expr: 'Rejection (%) = (1 − C_permeate ÷ C_feed) × 100',
        where: [
          'C = conductivity or a specific ion concentration',
          'Feed concentration is sometimes taken as the average of feed and concentrate to represent the membrane surface',
        ],
      },
      {
        t: 'p',
        text: 'Permeate flow depends on the net driving pressure and the temperature, so a raw permeate flow that falls in winter says nothing about the membranes. Normalization corrects the measured flow to a reference temperature and pressure using the manufacturer method, and the normalized permeate flow, the normalized salt passage, and the normalized differential pressure are the trends that reveal fouling, scaling, and damage. The calculation is done in the controller or the SCADA from the measured values and shown beside them.',
      },
      {
        t: 'table',
        head: ['Normalized trend', 'Change', 'Likely cause', 'Action'],
        rows: [
          ['Permeate flow', 'Down 10 to 15 percent from the clean baseline', 'Fouling or scaling', 'Clean in place'],
          ['Differential pressure', 'Up 10 to 15 percent', 'Fouling of the feed channel; biofouling; particulates', 'Clean in place; check pretreatment'],
          ['Salt passage', 'Up 5 to 10 percent', 'Scaling, oxidation damage, or a seal or element failure', 'Clean; probe the vessels; check the oxidant history'],
          ['Permeate flow up with salt passage up', 'Together', 'Membrane damage, usually oxidation or a failed seal', 'Probe and replace'],
        ],
      },
      { t: 'h2', text: 'Control loops' },
      {
        t: 'dl',
        items: [
          { term: 'Permeate flow', def: 'The feed pump speed holds a permeate flow setpoint, ramped slowly. The pressure follows from the membranes; a rising pressure at constant flow is the fouling trend.' },
          { term: 'Recovery', def: 'The concentrate valve holds a concentrate flow setpoint computed from the permeate flow and the recovery target, so that the recovery stays at the design value as the permeate flow changes.' },
          { term: 'Chemical dosing', def: 'Antiscalant and acid are flow-paced to the feed flow with a residual or pH trim; bisulfite is paced to the feed with the oxidant analyzer as the check.' },
          { term: 'Interstage boost', def: 'Where fitted, holds the second stage flux by a pressure or flow target.' },
          { term: 'Permeate quality', def: 'Permeate conductivity above a limit diverts the permeate to waste and alarms; sustained, it stops the skid.' },
        ],
      },
      { t: 'h2', text: 'Sequence' },
      {
        t: 'steps',
        items: [
          { title: 'Pre-start', text: 'Permissives: feed available, prefilter differential within limit, chemical feeds ready, oxidant analyzer healthy and reading zero, valves in position.' },
          { title: 'Low-pressure flush', text: 'Feed water at low pressure through the vessels to waste, displacing the flush water and purging air.' },
          { title: 'Ramp', text: 'The feed pump ramps at the manufacturer rate, often around ten psi per second or slower, to the operating point while the concentrate valve moves toward its running position; permeate to waste until conductivity is within limit.' },
          { title: 'Run', text: 'Flow and recovery loops in control; trends updated; alarms armed.' },
          { title: 'Shutdown', text: 'Ramp down, then flush with permeate or low-pressure feed to remove concentrate from the vessels so that scale does not form while idle.' },
          { title: 'Idle', text: 'A periodic flush during long standby; a preservation procedure for extended shutdowns.' },
        ],
      },
      { t: 'h2', text: 'Trips and alarms' },
      {
        t: 'ul',
        items: [
          'High feed or concentrate pressure: the element and vessel ratings.',
          'Low feed or suction pressure: pump protection and a sign of prefilter blinding.',
          'High permeate conductivity: divert, then stop.',
          'Oxidant detected in the feed: stop immediately; polyamide membranes are destroyed by chlorine.',
          'High or low pH at the feed: scaling or membrane damage.',
          'Low chemical feed or low antiscalant tank: stop before scaling begins.',
          'High differential pressure across a stage: fouling or a collapsed element.',
          'Excessive pressure ramp rate: a drive or valve fault.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Chlorine and polyamide',
        text: 'The membranes used in nearly every municipal skid are destroyed by free chlorine. The bisulfite feed or the carbon ahead of the membranes and the oxidant analyzer after it are the protection, and a skid that runs with the analyzer failed or bypassed is one upset from a set of ruined elements.',
      },
    ],
    faqs: [
      {
        q: 'Why normalize instead of alarming on the raw pressure?',
        a: 'Because the raw pressure rises in winter as the water gets colder and the membranes tighten, with no fouling at all. Normalized values remove the temperature and pressure effects and leave the membrane condition. Alarming on raw values produces cleaning in January and missed fouling in July.',
      },
      {
        q: 'What sets the recovery?',
        a: 'The scaling potential of the concentrate: as recovery rises, the concentrate becomes more saturated in sparingly soluble salts, and the antiscalant and pH control have limits. The membrane supplier projection sets the design recovery, and the controls hold it.',
      },
      {
        q: 'How often should a skid be cleaned?',
        a: 'When the normalized trends cross their limits, which on a well-pretreated brackish water may be a few times a year and on a difficult water monthly. Cleaning on a calendar cleans too early or too late.',
      },
      {
        q: 'Can the skid run at reduced flow?',
        a: 'Within the element limits: a minimum concentrate flow per vessel to avoid scaling and a minimum flux to keep the elements clean. The turndown is stated in the design; below it the skid stops rather than idling.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/membrane-treatment/membrane-control',
      '/water-wastewater/water-systems/membrane-treatment/cip',
      '/water-wastewater/water-systems/membrane-treatment/feed-pumps',
      '/water-wastewater/water-systems/membrane-treatment/concentrate-systems',
      '/controls/instrumentation/analytical/conductivity',
      '/controls/instrumentation/analytical/orp',
    ],
  },
  {
    path: '/water-wastewater/water-systems/membrane-treatment/nanofiltration',
    kind: 'reference',
    title: 'Nanofiltration',
    summary:
      'Nanofiltration from the controls side: how it differs from reverse osmosis in pressure, recovery, and what it removes, the softening and color removal applications where it dominates, and trends that are shared with reverse osmosis and the ones that differ.',
    answer:
      'Nanofiltration is a membrane process a step looser than reverse osmosis: it passes most monovalent ions and removes divalent ions, organics, color, and pathogens, at operating pressures a fraction of what reverse osmosis needs. Its municipal home is groundwater softening and the removal of color and disinfection byproduct precursors from organic-rich sources, often at recoveries higher than reverse osmosis achieves, and the limiting factor is almost always scaling by calcium carbonate and sulfate salts in the concentrate. The skid, the instruments, the loops, and the sequences are those of reverse osmosis at lower pressure: a feed pump on a drive, stages of vessels, a concentrate valve, antiscalant and acid feed, and the normalized trends. What differs is the emphasis: pH and antiscalant control decide the recovery, the permeate needs stabilization by degasification and pH adjustment before it is pipeable, and the permeate quality is judged on hardness and color rather than on conductivity alone.',
    keyPoints: [
      'Looser than reverse osmosis: removes hardness, organics, and color; passes most monovalent ions; runs at lower pressure.',
      'Recovery is set by scaling; antiscalant and pH control are the loops that protect it.',
      'Permeate stabilization, degasification, pH adjustment, and corrosion control follows the membranes and has its own controls.',
      'Instruments, sequences, normalization, and trips are shared with reverse osmosis.',
      'Quality is judged on hardness, color, and total organic carbon as well as conductivity.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Instrumentation', 'Control', 'Design', 'Standards'],
    blocks: [
      { t: 'h2', text: 'Compared with reverse osmosis' },
      {
        t: 'table',
        head: ['Aspect', 'Nanofiltration', 'Reverse osmosis'],
        rows: [
          ['Removes', 'Divalent ions, organics, color, pathogens; partial monovalent removal', 'Nearly all dissolved solids'],
          ['Operating pressure', 'Low; often well under 150 psi on groundwater', 'Higher; brackish water often 150 to 400 psi, seawater far more'],
          ['Typical recovery', 'High, often 80 to 90 percent on suitable water', 'Moderate, often 75 to 85 percent'],
          ['Limiting factor', 'Scaling by calcium carbonate and sulfates', 'Scaling and osmotic pressure'],
          ['Main uses', 'Softening, color and organics removal, disinfection byproduct precursor control', 'Desalination, total dissolved solids reduction, specific contaminants'],
          ['Permeate', 'Soft, low alkalinity, aggressive; needs stabilization', 'Very low dissolved solids; needs stabilization'],
        ],
      },
      { t: 'h2', text: 'Scaling control' },
      {
        t: 'p',
        text: 'As the feed is concentrated, calcium carbonate and the sulfates of calcium, barium, and strontium approach and exceed their solubility in the concentrate, and they precipitate on the last elements of the last stage. Antiscalant dosing keeps them in solution for the residence time of the water in the skid, acid dosing lowers the pH so that carbonate stays as bicarbonate, and the recovery is chosen so that the concentrate stays within what the chemicals can hold. The controls flow-pace the antiscalant to the feed flow and alarm on low dosing; control the feed pH to a setpoint with the acid feed and trip on high pH; and hold the recovery with the concentrate valve. The trend that catches scaling is a rising normalized differential pressure on the last stage with a rising salt passage, and the answer is a low pH clean and a review of the dosing.',
      },
      { t: 'h2', text: 'Permeate stabilization' },
      {
        t: 'p',
        text: 'Nanofiltration permeate has lost its hardness and much of its alkalinity, carries dissolved carbon dioxide from the acid feed, and may carry hydrogen sulfide from the groundwater; it will corrode pipe and stain fixtures until it is stabilized. Degasification strips the carbon dioxide and sulfide in a tower with a blower and a scrubber; caustic or lime raises the pH; a corrosion inhibitor is added; and in many plants a bypass of raw or partially treated water is blended back to restore some alkalinity and hardness. The controls for this section are a pH loop on the caustic feed, a blend ratio loop on the bypass, blower and scrubber sequences and interlocks, and the alarms on pH, sulfide odor control, and inhibitor feed. The finished water quality targets, pH, alkalinity, and a corrosion index, are the setpoints.',
      },
      { t: 'h2', text: 'What is shared with reverse osmosis' },
      {
        t: 'ul',
        items: [
          'The instruments: pressures per stage, permeate and concentrate flows, conductivities, pH, temperature, oxidant check.',
          'The loops: permeate flow by pump speed, recovery by concentrate valve, flow-paced dosing.',
          'The sequences: flush, ramp, run, flush; the cleaning sequences.',
          'Normalization of permeate flow, salt passage, and differential pressure, and the cleaning triggers.',
          'The trips: pressure, conductivity, oxidant, pH, chemical feed.',
        ],
      },
      { t: 'h2', text: 'Quality measurements' },
      {
        t: 'ul',
        items: [
          'Permeate conductivity for a continuous trend; less sensitive than on reverse osmosis because monovalent ions pass.',
          'Online or laboratory hardness on the permeate and the blended water; the softening target.',
          'Color and ultraviolet absorbance where color or organics removal is the purpose; total organic carbon by laboratory.',
          'pH, alkalinity, and a corrosion index on the finished water.',
          'Sulfide and odor at the degasifier where the groundwater carries it.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Bypass blending',
        text: 'Blending raw water around the membranes restores hardness and alkalinity and reduces the membrane capacity needed, and it also passes whatever the membranes would have removed. The blend ratio is a water quality decision made with the regulator in view, and the controls hold it with a flow ratio loop and alarm on deviation.',
      },
    ],
    faqs: [
      {
        q: 'Why nanofiltration instead of lime softening?',
        a: 'It removes organics and color as well as hardness, produces no lime sludge, and is easier to automate; it costs energy, membranes, chemicals, and a concentrate to dispose of. The choice is a treatment study; the controls are simpler for the membrane plant.',
      },
      {
        q: 'The last stage differential pressure keeps rising.',
        a: 'Scaling on the last elements, where the concentrate is most saturated. Check the antiscalant dose and the feed pH against the design, verify the recovery is not above design, and clean at low pH.',
      },
      {
        q: 'How aggressive is the permeate?',
        a: 'Aggressive enough to corrode iron and copper and to leach lead from old fittings; the stabilization section is not optional. The corrosion index of the finished water is a control target with limits.',
      },
      {
        q: 'Can a reverse osmosis skid be converted to nanofiltration?',
        a: 'The vessels and much of the piping are the same; the elements, the pump sizing, the recovery, and the chemical program change. The membrane supplier projection for the new elements decides the operating point.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/membrane-treatment/reverse-osmosis',
      '/water-wastewater/water-systems/membrane-treatment/membrane-control',
      '/water-wastewater/water-systems/membrane-treatment/cip',
      '/water-wastewater/water-systems/water-treatment/chemical-feed',
      '/controls/instrumentation/analytical/ph',
      '/controls/instrumentation/analytical/conductivity',
    ],
  },
  {
    path: '/water-wastewater/water-systems/membrane-treatment/membrane-control',
    kind: 'reference',
    title: 'Membrane Control',
    summary:
      'The control system of a membrane skid: the loops for permeate flow, recovery, and dosing, the permissives and trips, the start, run, flush, and shutdown sequences, and the data the operators and the membrane supplier need from the historian.',
    answer:
      'A membrane skid is controlled by a handful of loops, a sequence, a set of trips, and a set of calculations, and the quality of the plant depends on getting each of them right. The permeate flow loop sets the feed pump speed; the recovery loop sets the concentrate valve from the permeate flow and the recovery target; the dosing loops pace the antiscalant, acid, and dechlorination chemicals to the feed flow with analyzer trims; the sequence takes the skid through flush, ramp, run, and flush with permissives at each step; the trips stop the skid on pressure, conductivity, oxidant, pH, and chemical feed failures; and the normalization calculations turn the raw readings into the trends that say when to clean. Several trains share feed, chemicals, and permeate collection, so a plant controller coordinates which trains run, staggers their starts, and balances their production to the plant demand. The historian keeps the normalized trends and the operating conditions for the years the membranes live.',
    keyPoints: [
      'Four loops: permeate flow by pump speed, recovery by concentrate valve, dosing by feed flow with trims, and permeate quality by divert.',
      'A sequence with permissives at every step; a pressure ramp at the manufacturer rate; a flush on every shutdown.',
      'Trips on pressure, conductivity, oxidant, pH, and chemical feed, each latched and reset by a person.',
      'Normalization in the controller from measured values, shown beside the raw values, trended for the life of the membranes.',
      'Multi-train coordination: which trains run, staggered starts, production balanced to demand, shared systems interlocked.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Control', 'PID', 'Instrumentation', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Loops' },
      {
        t: 'table',
        head: ['Loop', 'Measured', 'Manipulated', 'Notes'],
        rows: [
          ['Permeate flow', 'Permeate flowmeter', 'Feed pump drive speed', 'Setpoint from the plant demand; ramp limited; output limited by pressure'],
          ['Recovery', 'Concentrate flowmeter', 'Concentrate control valve', 'Setpoint computed from permeate flow and recovery target; slow tuning'],
          ['Feed pH', 'pH after acid injection', 'Acid metering pump', 'Flow-paced with pH trim; high pH trip'],
          ['Antiscalant', 'Feed flow', 'Antiscalant metering pump', 'Pure flow pacing; low flow and low tank alarms; no analyzer'],
          ['Dechlorination', 'Feed flow and oxidant analyzer', 'Bisulfite metering pump', 'Flow-paced with a residual target; oxidant trip'],
          ['Permeate quality', 'Permeate conductivity', 'Divert valve', 'Divert above a limit; stop after a time'],
          ['Interstage boost', 'Second stage permeate flow or pressure', 'Boost pump speed', 'Where fitted'],
        ],
      },
      { t: 'h2', text: 'Sequence' },
      {
        t: 'steps',
        items: [
          { title: 'Ready', text: 'Permissives: feed pressure, prefilter differential, chemical tanks and pumps, oxidant analyzer healthy, valves in position, no unreset trips, train selected for automatic.' },
          { title: 'Flush to waste', text: 'Feed at low pressure through the vessels to waste for a set volume or time; the concentrate valve open; permeate to waste.' },
          { title: 'Ramp', text: 'Feed pump ramps at the set rate while the concentrate valve moves to its run position; pressure and flow rise together; permeate stays diverted until conductivity is within limit.' },
          { title: 'Run', text: 'Loops in automatic; trends live; the divert valve returns permeate to service.' },
          { title: 'Stop', text: 'Ramp down; concentrate valve opens; pump stops.' },
          { title: 'Flush', text: 'Permeate or low-pressure feed displaces concentrate from the vessels for a set volume; then the train is idle.' },
          { title: 'Idle', text: 'A periodic flush on a timer; a preservation procedure for long shutdowns; the train remains available.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The ramp rate',
        text: 'A pressure applied to the elements faster than the manufacturer allows telescopes them and damages the seals. The ramp is enforced by the controller, not by an operator, and a drive or valve fault that would exceed it stops the train.',
      },
      { t: 'h2', text: 'Trips and alarms' },
      {
        t: 'p',
        text: 'Trips stop the train and latch: high feed or concentrate pressure, low suction pressure, oxidant detected, high feed pH, low antiscalant flow, and sustained high permeate conductivity. Each is reset by a person after the cause is known. Alarms warn without stopping: prefilter differential approaching its limit, a normalized value approaching its cleaning trigger, a chemical tank low, a divert in progress. The design separates an instrument fault from a membrane problem where it can: a conductivity analyzer with a stale or out-of-range signal raises an instrument alarm and holds the last good divert state; an oxidant analyzer fault stops the train, because the risk is asymmetric.',
      },
      { t: 'h2', text: 'Normalization in the controller' },
      {
        t: 'p',
        text: 'The controller computes the normalized permeate flow, salt passage, and differential pressure every scan from the measured pressures, flows, conductivities, and temperature, using the membrane manufacturer method and a baseline recorded at commissioning after the first stabilization. The values are displayed beside the raw values, trended in the historian, and alarmed against the cleaning triggers. Doing the calculation in the controller rather than in a spreadsheet makes the trend continuous and the cleaning trigger an alarm rather than a monthly discovery. The baseline is re-established after a membrane replacement and recorded.',
      },
      { t: 'h2', text: 'Several trains' },
      {
        t: 'ul',
        items: [
          'A plant demand setpoint is divided among the trains in service, equally or by capacity; each train runs its permeate flow loop on its share.',
          'Trains start staggered so that the feed system, the chemicals, and the electrical system see one ramp at a time.',
          'Shared systems, the feed pumps, chemical feeds, and the permeate and concentrate headers, are interlocked to the trains that need them.',
          'Cleaning takes one train out of service while the others carry the demand; the cleaning skid is interlocked so that a train cannot be in service and in cleaning at once.',
          'Train selection rotates so that hours balance, with a train held out for cleaning or maintenance by selection.',
        ],
      },
      { t: 'h2', text: 'Data' },
      {
        t: 'ul',
        items: [
          'Every pressure, flow, conductivity, pH, and temperature at a resolution that captures the ramp and the run.',
          'The normalized values with their baseline.',
          'The sequence step and its duration; the trips and alarms with time stamps.',
          'Chemical usage and tank levels.',
          'Cleaning events with their conditions, for the membrane supplier and the warranty.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Why compute normalization in the controller?',
        a: 'So that the trend is continuous, the cleaning trigger is an alarm, and the calculation is done the same way every time by something that does not go on vacation. The spreadsheet remains a check.',
      },
      {
        q: 'How should the recovery loop be tuned?',
        a: 'Slowly. The concentrate valve loop interacts with the permeate flow loop, and a fast recovery loop makes both oscillate. Tune the flow loop first with the valve fixed, then the recovery loop slowly enough that the flow loop settles between its moves.',
      },
      {
        q: 'What happens when the oxidant analyzer fails?',
        a: 'The train stops. The membranes are the most expensive part of the plant and chlorine destroys them in hours; an analyzer fault is treated as chlorine present until proven otherwise. A redundant analyzer is the way to avoid nuisance stops.',
      },
      {
        q: 'Can operators change the recovery?',
        a: 'Within limits set from the membrane projection, with the change logged and the antiscalant and pH programs checked. A recovery above the projection scales the last stage within weeks.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/membrane-treatment/reverse-osmosis',
      '/water-wastewater/water-systems/membrane-treatment/nanofiltration',
      '/water-wastewater/water-systems/membrane-treatment/cip',
      '/controls/plc-systems/programming/sequential-function-chart',
      '/controls/plc-systems/analog-control/pid',
      '/controls/scada-hmi/historian-data/data-collection',
    ],
  },
  {
    path: '/water-wastewater/water-systems/membrane-treatment/cip',
    kind: 'reference',
    title: 'Clean-in-Place',
    summary:
      'Cleaning membranes in place: the triggers from the normalized trends, the low pH clean for scale and the high pH clean for organics and biofouling, the sequence of flush, heat, recirculate, soak, and rinse, and how automation makes cleaning repeatable.',
    answer:
      'Clean-in-place restores membranes that have fouled or scaled by circulating cleaning solutions through the vessels without removing the elements. A low pH solution, citric acid or a mineral acid, dissolves carbonate and metal scale; a high pH solution, caustic often with a surfactant or a chelant, removes organic foulants and biofilm; and the sequence for each is a flush, a fill and heat of the cleaning tank, a low-flow recirculation through the vessels, a soak, a further recirculation, and a rinse with permeate until the pH and conductivity return to normal. The cleaning skid is a tank with a heater, a pump on a drive, a cartridge filter, and instruments for temperature, pH, flow, and pressure; and the controls enforce the limits the elements can tolerate, temperature at or below the membrane maximum, pH within the range for each solution, flow at the cleaning rate per vessel, and pressure low. Automating the sequence makes every cleaning the same, records what was done, and keeps the operator away from hot chemicals.',
    keyPoints: [
      'Clean when the normalized permeate flow, differential pressure, or salt passage crosses its trigger, not on a calendar.',
      'Low pH for scale and metals; high pH for organics and biofilm; the order depends on what the trends say.',
      'Enforce temperature, pH, flow, and pressure limits in the controller; the elements have hard limits.',
      'Sequence: flush, fill and heat, recirculate, soak, recirculate, rinse to neutral; record all of it.',
      'Neutralize and dispose of the spent solution under the permit; interlock the cleaning skid against a train in service.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Water', 'Control', 'Programming', 'Instrumentation', 'Standards'],
    blocks: [
      { t: 'h2', text: 'When to clean' },
      {
        t: 'table',
        head: ['Trigger', 'Typical threshold', 'Cleaning'],
        rows: [
          ['Normalized permeate flow down', '10 to 15 percent below baseline', 'Depends on the foulant; often high pH first for organics, low pH for scale'],
          ['Normalized differential pressure up', '10 to 15 percent above baseline', 'High pH for biofouling and particulates; check pretreatment'],
          ['Normalized salt passage up', '5 to 10 percent above baseline', 'Low pH for scale; investigate damage if cleaning does not recover it'],
          ['Scheduled', 'Before a long shutdown or per the supplier', 'A preservation clean and a biocide where allowed'],
        ],
      },
      {
        t: 'p',
        text: 'Cleaning early, when the loss is small, recovers more and stresses the membranes less than cleaning late; cleaning too often wastes chemicals and membrane life. The triggers are alarms on the normalized trends, and the decision of which solution to use first comes from what the trends and the water say: scale on a groundwater plant, organics and biofilm on a surface water plant, both on many.',
      },
      { t: 'h2', text: 'The skid' },
      {
        t: 'table',
        head: ['Element', 'Purpose', 'Control'],
        rows: [
          ['Cleaning tank', 'Holds the solution; sized for the vessel and piping volume plus margin', 'Level; low level stops the pump'],
          ['Heater', 'Warms the solution to the cleaning temperature', 'Temperature loop with a high limit trip at the membrane maximum'],
          ['Cleaning pump on a drive', 'Circulates at the cleaning flow rate', 'Flow loop per stage; pressure limit'],
          ['Cartridge filter', 'Catches foulant removed from the membranes', 'Differential pressure alarm'],
          ['Instruments', 'Temperature, pH, conductivity, flow, pressure at the skid and at the vessel outlets', 'Limits and records'],
          ['Chemical addition', 'Acid, caustic, surfactant, chelant, biocide where used', 'Manual or dosed to a pH target; operator confirmation'],
          ['Valves', 'Isolate the train from service; route cleaning through each stage; return to the tank or to waste', 'Sequence with position feedback; interlocks'],
        ],
      },
      { t: 'h2', text: 'The sequence' },
      {
        t: 'steps',
        items: [
          { title: 'Isolate', text: 'The train is stopped and flushed, its feed and permeate isolated with valve position confirmed, and the cleaning connections opened. The train cannot be started while the cleaning valves are open.' },
          { title: 'Flush', text: 'Permeate through the vessels to waste to remove concentrate.' },
          { title: 'Prepare', text: 'Fill the tank with permeate, heat to the cleaning temperature, add the chemical to the pH target, and confirm the pH within the range for the solution.' },
          { title: 'Recirculate', text: 'Circulate through one stage at a time at the cleaning flow, low pressure, returning to the tank; the first minutes often go to waste as the darkest solution comes out.' },
          { title: 'Soak', text: 'Stop and let the solution stand for the soak time, with the heater holding temperature; longer for heavy fouling.' },
          { title: 'Recirculate again', text: 'A further circulation, watching the pH; a pH that drifts toward neutral means the solution is being consumed and is topped up.' },
          { title: 'Rinse', text: 'Drain the tank, then flush with permeate through each stage to waste until the outlet pH and conductivity return to the permeate values.' },
          { title: 'Second solution', text: 'Repeat with the other solution if the plan calls for it, with a full rinse between.' },
          { title: 'Return to service', text: 'Restore the valves, start the train with permeate to waste until conductivity is within limit, re-establish the normalized baseline, and record the results.' },
        ],
      },
      { t: 'h2', text: 'Limits the controller enforces' },
      {
        t: 'ul',
        items: [
          'Temperature at or below the element maximum, commonly around 45 degrees Celsius for polyamide, with a trip on the heater.',
          'pH within the range the element allows for each solution and temperature, with the range narrowing as temperature rises.',
          'Flow per vessel at the cleaning rate the supplier specifies, and the feed pressure kept low so that the cleaning removes foulant rather than pushing it through.',
          'Time limits on each step so that a stalled step alarms.',
          'Interlocks: no cleaning with the train in service, no heater with the tank low, no chemical addition without confirmation.',
        ],
      },
      { t: 'h2', text: 'Spent solution' },
      {
        t: 'p',
        text: 'The spent acid and caustic solutions and the rinse water go to a neutralization tank where they are mixed, adjusted to the discharge pH range with the opposite chemical, and released to the sewer or the disposal system under the permit, with the pH and volume recorded. The neutralization is its own small control loop and its own set of alarms, and it is the step most often skipped when cleaning is done by hand at the end of a long day.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Record the cleaning',
        text: 'Which solution, what pH and temperature, how long, what the normalized values were before and after, and what came out of the filter. The record is the membrane history the supplier asks for, the basis for adjusting the pretreatment, and the proof for the warranty.',
      },
    ],
    faqs: [
      {
        q: 'Low pH or high pH first?',
        a: 'What the foulant is decides: scale needs acid, organics need caustic, and where both are present the supplier usually recommends the high pH clean first so that the acid is not consumed by organics, then low pH. A wrong order wastes a cleaning; the trends and a sample of the foulant guide it.',
      },
      {
        q: 'The normalized flow did not recover after cleaning.',
        a: 'The wrong solution, too short a soak, too low a temperature, or a foulant that cleaning does not remove, such as silica or an oxidized membrane. Try the other solution with a longer soak, and if the flow still does not recover, probe the vessels and consider element replacement.',
      },
      {
        q: 'Can cleaning damage the membranes?',
        a: 'Yes: too high a temperature, pH outside the range, too high a pressure, or an incompatible chemical. The limits are in the element data sheet, and the controller enforces them so that a mistake at the chemical drum does not become a set of ruined elements.',
      },
      {
        q: 'How long does a cleaning take?',
        a: 'Several hours to most of a day for a train, longer for both solutions and heavy fouling. The plant design keeps enough trains that one can be out for a day without losing production.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/membrane-treatment/membrane-control',
      '/water-wastewater/water-systems/membrane-treatment/reverse-osmosis',
      '/water-wastewater/water-systems/membrane-treatment/nanofiltration',
      '/controls/plc-systems/programming/sequential-function-chart',
      '/controls/instrumentation/analytical/ph',
      '/engineering-library/control-documentation/sequences-of-operation',
    ],
  },
  {
    path: '/water-wastewater/water-systems/membrane-treatment/feed-pumps',
    kind: 'reference',
    title: 'Membrane Feed Pumps',
    summary:
      'The high-pressure feed pumps of a membrane plant: multistage centrifugal pumps on drives, the pressure ramp that protects the elements, suction protection and the cartridge filters ahead of them, and the maintenance that the trends point to.',
    answer:
      'The feed pump gives a membrane train its driving pressure, and it is almost always a multistage centrifugal pump on a variable frequency drive so that the pressure can be ramped gently and the permeate flow controlled by speed. The drive ramp is the first protection for the elements, limited to the rate the membrane supplier states; the suction is protected by a low-pressure switch or transmitter and by the cartridge filters ahead of the pump, whose differential pressure is watched; and the discharge is protected by a high-pressure trip at the vessel rating and by a minimum flow rule that stops the pump rather than letting it run against a closed concentrate valve. The pump serves the permeate flow loop, and its speed, its power, and its discharge pressure over time are the trends that show a fouling train and a wearing pump. Interstage boost pumps balance flux between stages on some designs; transfer and flush pumps move water at low pressure for the sequences. At the pressures involved, the mechanical seal, the coupling, the motor bearings, and the drive settings deserve more attention than on an ordinary water pump.',
    keyPoints: [
      'Multistage centrifugal on a drive; the drive ramp is the element protection and is enforced by the controller.',
      'Suction protection: cartridge filter differential, low suction pressure trip, and a suction pressure that keeps the pump within its net positive suction head.',
      'Discharge protection: high-pressure trip at the vessel rating; minimum flow rule; dead-head stop.',
      'Speed, power, and discharge pressure trends show fouling and pump wear.',
      'Seals, couplings, bearings, and drive settings are the maintenance items at high pressure.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Pumps', 'VFD', 'Control', 'Design'],
    blocks: [
      { t: 'h2', text: 'The pump and its drive' },
      {
        t: 'p',
        text: 'A multistage centrifugal pump, vertical or horizontal, develops the pressure a membrane needs at flows a municipal plant uses, and its curve is steep enough that speed control gives fine control of pressure and flow. The drive provides the ramp on start and stop, the speed for the permeate flow loop, torque and current limits, and the diagnostics. The drive is set with an acceleration time that keeps the pressure rise within the membrane limit across the whole speed range, a deceleration time that avoids surge in the piping, and a minimum speed below which the pump is stopped rather than run. The motor is inverter-duty, the cable length is within the drive limit or filtered, and the drive heat is in the enclosure calculation.',
      },
      {
        t: 'table',
        head: ['Protection', 'Device', 'Action'],
        rows: [
          ['Pressure ramp rate', 'Drive acceleration time; controller ramp on the flow setpoint', 'Enforced; a rate above the limit stops the train'],
          ['Low suction pressure', 'Transmitter or switch on the suction', 'Trip; prevents cavitation and a starved pump'],
          ['Cartridge filter blinding', 'Differential pressure across the filters', 'Alarm at the change point; trip at the limit'],
          ['High discharge pressure', 'Transmitter on the discharge', 'Trip at the vessel and element rating'],
          ['Minimum flow', 'Permeate plus concentrate flow', 'Stop below minimum; never run against a closed concentrate valve'],
          ['Overcurrent and overload', 'Drive', 'Drive trip with a code'],
          ['Seal leak or bearing temperature', 'Sensors on larger pumps', 'Alarm and stop'],
          ['Dry run', 'Suction pressure and flow', 'Stop'],
        ],
      },
      { t: 'h2', text: 'Serving the flow loop' },
      {
        t: 'p',
        text: 'The permeate flow loop sets the pump speed; the pressure follows from the membrane condition and the recovery. On a clean train the pump runs at a moderate speed; as the membranes foul the loop raises the speed to hold the flow, and the discharge pressure and the power rise. When the speed reaches maximum, the flow can no longer be held, and the train is due for cleaning regardless of the normalized trends. The trend of speed at constant flow, corrected for temperature, is a second view of the normalized permeate flow, and the drive power is a third.',
      },
      {
        t: 'formula',
        expr: 'P_hydraulic = Q × ΔP ÷ 1714',
        where: [
          'P_hydraulic = hydraulic power in horsepower',
          'Q = flow in gallons per minute',
          'ΔP = pressure rise across the pump in psi',
          'Motor power is higher by the pump and motor efficiencies; the drive reports the electrical power for the trend',
        ],
      },
      { t: 'h2', text: 'Other pumps on the skid' },
      {
        t: 'dl',
        items: [
          { term: 'Interstage boost', def: 'On designs that balance flux between stages, a smaller pump between stages raises the pressure to the second stage; controlled on a second-stage flow or pressure target and interlocked to the main pump.' },
          { term: 'Transfer and flush', def: 'Low-pressure pumps that move feed to the train for the flush and permeate for the shutdown flush; sequence-controlled with flow confirmation.' },
          { term: 'Cleaning pump', def: 'On the cleaning skid; a chemically resistant pump on a drive with its own flow loop and limits.' },
          { term: 'Permeate transfer', def: 'Moves permeate to stabilization and storage; controlled on level or flow.' },
        ],
      },
      { t: 'h2', text: 'Maintenance from the trends' },
      {
        t: 'ul',
        items: [
          'Power at constant flow and pressure rising over months: wear in the pump or the motor; check efficiency.',
          'Vibration rising: bearings, coupling, or cavitation; check the suction pressure.',
          'Seal leakage at high pressure: the mechanical seal, the shaft, and the flush plan.',
          'Drive faults on start: acceleration too fast for the pressure limit, or a suction problem at the start.',
          'Cartridge filter change interval shortening: the pretreatment, not the pump.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Never dead-head a feed pump',
        text: 'A multistage pump run against a closed concentrate valve with no permeate heats the water in the casing within minutes and damages the pump and the membranes. The minimum flow rule stops the pump; the valve position feedback is an interlock on the start.',
      },
    ],
    faqs: [
      {
        q: 'Why a drive instead of a throttling valve on the feed?',
        a: 'A throttling valve on a high-pressure pump wastes most of the power and cannot ramp the pressure gently. The drive gives the ramp, the flow control, the soft start, and the energy saving; on a membrane plant it is not a luxury.',
      },
      {
        q: 'What suction pressure do I need?',
        a: 'Enough to keep the pump above its net positive suction head requirement at the maximum flow and temperature, after the cartridge filters at their dirty differential. The transfer pump or the feed system provides it, and the low suction trip is set with margin above the requirement.',
      },
      {
        q: 'The drive trips on overcurrent during the ramp.',
        a: 'The ramp is too fast for the current limit, the concentrate valve is too closed at start so the pump sees high pressure early, or the pump is starting into a water-hammer condition. Slow the ramp, sequence the valve, and check the suction.',
      },
      {
        q: 'Should the feed pump be on the standby generator?',
        a: 'Only if the plant must produce during an outage and the generator can carry the pump and its inrush; the ramp helps. Otherwise the train shuts down safely on power loss and flushes when power returns, and the storage carries the demand.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/membrane-treatment/reverse-osmosis',
      '/water-wastewater/water-systems/membrane-treatment/membrane-control',
      '/water-wastewater/water-systems/water-pumping/vfd-control',
      '/controls/control-panels/pump-panels/vfd',
      '/troubleshooting/vfd-troubleshooting/drive-faults-on-overcurrent',
      '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
    ],
  },
  {
    path: '/water-wastewater/water-systems/membrane-treatment/concentrate-systems',
    kind: 'reference',
    title: 'Concentrate Systems',
    summary:
      'Handling the concentrate a membrane plant produces: the concentrate valve and the recovery it sets, flow and quality monitoring for the permit, the disposal routes, surface discharge, sewer, and the alarms and records a concentrate permit expects.',
    answer:
      'Every gallon of permeate leaves a fraction of a gallon of concentrate, carrying the salts and whatever else the membranes removed at several times the feed concentration, and the concentrate has to go somewhere the permit allows. The concentrate valve on the skid sets the concentrate flow and therefore the recovery, and it is the first control; after it, the concentrate is metered, monitored for conductivity and sometimes pH and other parameters, and routed to its disposal: a surface water outfall under a discharge permit, often with degasification or aeration and pH adjustment first; a sewer under an industrial discharge agreement; a deep injection well with its own pressure, flow, and annulus monitoring; evaporation ponds or, rarely, a zero liquid discharge process. Each route has flow limits, quality limits, and reporting requirements that become setpoints, alarms, and historian records, and the concentrate system is often where a membrane plant fails its permit rather than at the permeate.',
    keyPoints: [
      'The concentrate valve sets recovery; its position loop is slow and interacts with the permeate flow loop.',
      'Meter and monitor the concentrate: flow, conductivity, pH, and whatever the permit names, with the records kept.',
      'Disposal routes each have controls: outfall diffuser and pretreatment, sewer discharge agreement limits, injection well pressure and annulus, ponds and their levels.',
      'Degasification for sulfide and carbon dioxide, and pH adjustment, where the permit requires them before discharge.',
      'Alarm on flow and quality limits before they become permit exceedances; the historian is the compliance record.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Water', 'Control', 'Standards', 'Instrumentation', 'Design'],
    blocks: [
      { t: 'h2', text: 'At the skid' },
      {
        t: 'p',
        text: 'The concentrate leaves the last stage through a control valve that holds the concentrate flow at the value that gives the design recovery. The valve sees the highest pressure in the plant on one side and near atmospheric on the other, so it is a severe-service valve with cavitation control, and its position loop is tuned slowly so that it does not fight the permeate flow loop. A pressure sustaining valve or an orifice downstream may hold backpressure on the last stage. The concentrate flowmeter is the second half of the recovery calculation and is checked against the permeate meter and the feed meter, because a recovery calculated from a bad meter scales the last elements.',
      },
      { t: 'h2', text: 'Monitoring' },
      {
        t: 'table',
        head: ['Parameter', 'Why', 'Typical requirement'],
        rows: [
          ['Flow', 'Permit limit; mass balance; recovery', 'Continuous, totalized, reported'],
          ['Conductivity or total dissolved solids', 'Discharge limit; mass loading', 'Continuous with alarm; laboratory confirmation'],
          ['pH', 'Discharge range; corrosion in the disposal piping', 'Continuous where required; adjustment loop'],
          ['Dissolved oxygen, sulfide, or specific ions', 'Outfall permits on sensitive waters', 'Analyzers or laboratory per permit'],
          ['Temperature', 'Some permits', 'Continuous'],
          ['Radionuclides, metals, or other constituents', 'Where the source water carries them', 'Laboratory sampling on the permit schedule'],
        ],
      },
      { t: 'h2', text: 'Disposal routes' },
      {
        t: 'dl',
        items: [
          { term: 'Surface water outfall', def: 'Discharge to a river, estuary, or ocean through a diffuser under a permit that limits flow, salinity, pH, dissolved oxygen, and toxicity. Pretreatment often includes degasification to strip hydrogen sulfide and carbon dioxide, aeration to raise dissolved oxygen, and pH adjustment. The controls run the degasifier, the aeration, and the pH loop, and hold the discharge within its limits with alarms and a divert.' },
          { term: 'Sewer', def: 'Discharge to a wastewater collection system under an agreement that limits flow, total dissolved solids, and pH so that the treatment plant is not upset. The controls meter the flow, hold pH, and alarm on the agreement limits; a storage tank may buffer the discharge to off-peak hours for the treatment plant.' },
          { term: 'Deep well injection', def: 'Injection below the drinking water aquifers into a confined zone under a permit. The controls hold the injection pressure below the permit maximum, meter the flow, monitor the annulus pressure that proves the well casing is intact, and alarm on any deviation; a loss of annulus pressure or a rise in injection pressure stops injection and the plant.' },
          { term: 'Evaporation ponds', def: 'In dry climates; the controls are pond level, freeboard, and the transfer between ponds, with leak detection monitoring under the liner.' },
          { term: 'Zero liquid discharge', def: 'Evaporators and crystallizers that turn the concentrate into solids; an industrial process with its own control system, rare in municipal plants because of cost.' },
        ],
      },
      { t: 'h2', text: 'Injection wells' },
      {
        t: 'p',
        text: 'An injection well is a regulated structure with a tubing string inside a casing and a sealed annulus between them, and the annulus pressure is the proof that neither has leaked. The controls monitor the injection pressure at the wellhead against the permit maximum, the flow and its total, the annulus pressure against its allowed range, and the annulus fluid level or volume; a deviation alarms and, beyond limits, stops the injection pumps and the membrane trains that feed them. Mechanical integrity tests on the well schedule are recorded, and the historian keeps every reading for the permit reports. A concentrate storage tank between the plant and the well lets the trains run through a short well outage and lets injection be steady rather than following train starts.',
      },
      { t: 'h2', text: 'Alarms and records' },
      {
        t: 'ul',
        items: [
          'Flow above the permit limit or the disposal capacity: alarm, then reduce plant production.',
          'Quality outside the permit range: alarm, divert to storage where possible, then stop.',
          'Injection pressure or annulus deviation: alarm, then stop injection.',
          'Degasifier or aeration failure: alarm; discharge stops if the permit depends on it.',
          'Every parameter the permit names, historized at the resolution the permit implies, with the totalizers and the daily values reported from the historian.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The permit writes the control narrative',
        text: 'The concentrate permit or discharge agreement lists parameters, limits, monitoring frequencies, and reporting. Each becomes a tag, a setpoint, an alarm, and a report. Reading the permit before designing the concentrate controls saves the redesign.',
      },
    ],
    faqs: [
      {
        q: 'Why is the concentrate valve so hard on itself?',
        a: 'It drops the full membrane pressure to near atmospheric in one step, which cavitates and erodes an ordinary valve. Severe-service trim, staged pressure drop, or a valve plus an orifice are the answers, and the valve is on the maintenance schedule regardless.',
      },
      {
        q: 'Can I discharge the concentrate to the plant drain?',
        a: 'Only where the permit or the sewer agreement allows the flow and the salinity, which is rare for a plant of any size. The concentrate is a regulated discharge whatever pipe it enters.',
      },
      {
        q: 'The annulus pressure on the injection well is slowly falling.',
        a: 'A leak in the tubing or the packer, a temperature effect, or a slow loss through the annulus system. It is reported to the regulator per the permit and investigated with a mechanical integrity test; injection may have to stop. Never top up the annulus to hide the trend.',
      },
      {
        q: 'How much concentrate storage do I need?',
        a: 'Enough to ride through the longest expected disposal outage at full production, or to allow steady injection through train starts and stops, whichever is larger. The tank has level control, overflow alarms, and its own permit conditions.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/membrane-treatment/reverse-osmosis',
      '/water-wastewater/water-systems/membrane-treatment/membrane-control',
      '/water-wastewater/water-systems/membrane-treatment/nanofiltration',
      '/controls/instrumentation/analytical/conductivity',
      '/engineering-library/standards/epa',
      '/controls/scada-hmi/historian-data/reporting',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/lift-stations/lift-station-scada',
    kind: 'reference',
    title: 'Lift Station SCADA',
    summary:
      'Getting a remote station onto the SCADA system and keeping it there: which signals to bring back and which controls to allow, the telemetry path from licensed radio to cellular to fiber, and the maintenance that keeps the link up.',
    answer:
      'A lift station on SCADA is a station whose runs, faults, level, and alarms reach the operators within seconds, whose history shows when a pump is failing before it fails, and whose controls can be adjusted from the plant without a drive to the site, over a link that is monitored, secured, and maintained like the pumps. The design decides what comes back, which is more than the alarms; what can be sent, which is less than everything; how the data travels, licensed radio, unlicensed spread spectrum, cellular, or fiber, each with its own polling model; how the controller packages its data in a compact block with a watchdog word; how alarms are prioritized and who is called; and how the site is kept separate from everything it does not need to talk to. Commissioning proves each signal end to end, and keeping the station on SCADA is a matter of watching the communication statistics, the radio signal, and the alarm response, and fixing the first degradation rather than the eventual silence.',
    keyPoints: [
      'Bring back everything that describes the station: runs, faults, level, flow, power, generator, selector positions, seal and thermal, intrusion, and a watchdog.',
      'Allow only the controls that are safe from a distance: setpoints within limits, fault reset, and a supervised start; never a bypass of a safety.',
      'Pick the telemetry path for the site and poll it accordingly: radio by poll, cellular by exception or keepalive, fiber like a plant network.',
      'Design alarms with priorities and callouts; a station that pages on every event is a station nobody answers.',
      'Watch the link: communication statistics, signal strength, and retries trend down before the site goes silent.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Lift Stations', 'SCADA', 'Telemetry', 'Wastewater', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'What comes back' },
      {
        t: 'table',
        head: ['Signal', 'Type', 'Why'],
        rows: [
          ['Pump running, per pump', 'Discrete', 'Run status, runtime, starts per hour'],
          ['Pump fault, per pump', 'Discrete, latched', 'Overload, phase, thermal, seal; the reason is in the fault word'],
          ['Selector position, per pump', 'Discrete', 'A pump left in hand or off is the commonest hidden failure'],
          ['Wet well level', 'Analog', 'The process variable; the rate of change is the inflow'],
          ['Level setpoints', 'Analog, read and write', 'Lead on, lag on, off, high alarm'],
          ['Flow', 'Analog, where metered', 'Permit, capacity, and inflow and infiltration studies'],
          ['Pump current or power', 'Analog, where measured', 'A rising current at constant level is a ragging pump'],
          ['High level, from the independent float', 'Discrete', 'The overflow warning that does not depend on the transmitter'],
          ['Power fail, generator running, transfer switch position', 'Discrete', 'Outage response'],
          ['Intrusion, door open', 'Discrete', 'Security and safety'],
          ['Backup mode active', 'Discrete', 'The controller has handed the station to the floats'],
          ['Watchdog word', 'Integer', 'Changes every second; a stale word is a dead link or a dead controller'],
          ['Communication statistics', 'From the driver', 'Success rate, retries, signal strength'],
        ],
      },
      { t: 'h2', text: 'What can be sent' },
      {
        t: 'ul',
        items: [
          'Level setpoints within engineering limits enforced in the controller, with the change logged.',
          'A fault reset, which clears the latch only if the fault condition is gone.',
          'A supervised pump start or stop for a test, with a timeout that returns the pump to automatic.',
          'A lead pump selection, logged, with an expiry.',
          'Never: a bypass of a safety, a level cutoff override, or anything that leaves the station in a state that needs a person to restore.',
        ],
      },
      { t: 'h2', text: 'The path' },
      {
        t: 'table',
        head: ['Path', 'Polling model', 'Strengths', 'Watch for'],
        rows: [
          ['Licensed radio', 'Master polls each site in turn; slow but deterministic', 'No recurring cost, long range, owned', 'Path margin, antenna systems, interference, the license'],
          ['Unlicensed spread spectrum', 'Polled; faster data rates over shorter paths', 'No license, higher speed', 'Interference from others, foliage, range'],
          ['Cellular', 'Exception reporting or a keepalive; the site initiates or holds a tunnel', 'Anywhere with coverage; fast', 'Data plan, coverage, the carrier changing things, security of the public path'],
          ['Fiber or private Ethernet', 'Like a plant network', 'Fast, immune to weather', 'Cost; cuts by excavation'],
          ['Leased line or point-to-point microwave', 'Varies', 'Established', 'Aging equipment; cost'],
        ],
      },
      { t: 'h2', text: 'At the controller' },
      {
        t: 'p',
        text: 'The station controller packs its status into a contiguous block of registers: the discrete signals as bits in a few words, the analogs as integers or floats, the setpoints in a writable block, and the watchdog word. SCADA reads the block in one or two polls and writes the setpoint block when a change is made. Alarms are generated in the controller, so that a loss of communication produces one communication alarm rather than a flood of stale ones, and the controller holds its alarm state through the outage and reports it on reconnection. For cellular and any protocol that supports it, events with time stamps are buffered at the site and forwarded, so that a pump start during an outage is recorded at the right time.',
      },
      { t: 'h2', text: 'Alarms and callouts' },
      {
        t: 'dl',
        items: [
          { term: 'Priority', def: 'High level, both pumps failed, power fail without generator, and communication loss on a critical station are urgent; a single pump fault at a duplex is high; a selector in hand for an hour is medium; a door open is low outside business hours. The philosophy states it.' },
          { term: 'Callout', def: 'Urgent alarms go to the on-call phone with escalation; high alarms go to the on-call phone in business hours and escalate after a delay otherwise; the rest wait on the screen.' },
          { term: 'Delay and deadband', def: 'A level alarm needs a few seconds of persistence; a communication alarm needs a few missed polls on radio and a longer window on cellular.' },
          { term: 'Acknowledgment', def: 'Alarms are acknowledged in SCADA, logged with who and when, and reviewed weekly for standing alarms.' },
        ],
      },
      { t: 'h2', text: 'Trends that reveal a failing station' },
      {
        t: 'ul',
        items: [
          'Runtime per cycle increasing at constant inflow: a pump losing capacity, a ragged impeller, or a check valve leaking.',
          'Starts per hour rising: a level band that has drifted, a float sticking, or an inflow change.',
          'Current at constant level rising: ragging or a bearing.',
          'Level rate of fall during a pump run: the delivered flow; a change is a pump or force main problem.',
          'Communication success rate falling, retries rising, signal weakening: the link is failing before it fails.',
          'Inflow at night above the historical minimum: infiltration.',
        ],
      },
      { t: 'h2', text: 'Security at the site' },
      {
        t: 'p',
        text: 'The station is a remote door into the control system. A cellular router with a public address and a default password is the classic breach; the design puts the site behind a firewall or a private cellular network, reaches it through a virtual private network with strong authentication, segments the radio or router from the drives and the controller by a firewall or the controller second port, disables every service the site does not use, changes every default credential, and keeps the firmware in the patch program. Physical security, a locked panel with intrusion reporting, is part of it.',
      },
      { t: 'h2', text: 'Commissioning' },
      {
        t: 'steps',
        items: [
          { title: 'Point to point', text: 'Every discrete and analog signal exercised at the site and confirmed on the SCADA screen with its label, its units, and its alarm.' },
          { title: 'Setpoint writes', text: 'Each writable setpoint changed from SCADA, confirmed at the controller, and the limits tested.' },
          { title: 'Alarm test', text: 'Each alarm raised at the site, seen on the screen with the right priority, and the callout received.' },
          { title: 'Communication loss', text: 'The link broken; the communication alarm arrives; the station runs on its own; the link restored and the data, including buffered events, returns.' },
          { title: 'Power loss', text: 'The site power dropped; the power fail alarm arrives over the UPS-backed link; the generator sequence reported.' },
          { title: 'Backup mode', text: 'The controller failed or the transmitter disconnected; the backup floats run the station; SCADA shows backup active.' },
          { title: 'Record', text: 'The signal strength, the success rate, the configuration, and the screen captures in the site record.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Keeping it there',
        text: 'Communication statistics on a screen and in the historian, a monthly look at the signal and retry trends, an annual antenna and coax inspection, batteries in the UPS on a schedule, and the same treatment of the router firmware as of the controller program. The station that goes silent for a week was showing rising retries for a month.',
      },
    ],
    faqs: [
      {
        q: 'How many signals is too many for a radio site?',
        a: 'A packed block of a few dozen words carries everything above in one poll; the constraint is the poll cycle across all sites, not the size of one. Bring back what describes the station and pack it well.',
      },
      {
        q: 'Should operators be able to start a pump from SCADA?',
        a: 'A supervised start with a timeout, for testing, is reasonable at a station where the risk is understood; a continuous remote hand mode is not. The station must always return itself to automatic.',
      },
      {
        q: 'Radio or cellular for a new station?',
        a: 'Radio where the utility owns a system with a path to the site and no recurring cost; cellular where coverage is good, the site is beyond the radio system, and the security design is in place. Many utilities use cellular as the second path at critical stations.',
      },
      {
        q: 'Why does the station show a communication alarm every night?',
        a: 'A path that loses margin at night, from temperature inversion on a radio path or from carrier congestion on cellular, or a poll timeout set too short for the night conditions. The retry statistics by time of day name it.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/scada-communications',
      '/troubleshooting/radio-troubleshooting/remote-site-stops-communicating',
      '/troubleshooting/cellular-troubleshooting/frequent-reconnects',
      '/cybersecurity/network-segmentation/segmenting-a-remote-site',
      '/water-wastewater/wastewater-systems/lift-stations/backup-control',
      '/controls/scada-hmi/alarm-management/notification',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/biological-treatment',
    kind: 'reference',
    title: 'Biological Treatment',
    summary:
      'The biological process from the controls side: activated sludge and its common forms, conventional, extended aeration, oxidation ditch, sequencing batch reactor, and membrane bioreactor, and the alarms that give an operator time.',
    answer:
      'Biological treatment uses a population of microorganisms to consume the organic matter and the nitrogen in wastewater, and the controls exist to keep that population healthy and working: enough oxygen where it is needed and none where it is not, enough time in the system, the right amount of biomass, and the recycle streams that hold it all in balance. The forms differ in geometry and sequence, a conventional plant flows through zones, an oxidation ditch circulates, a sequencing batch reactor does everything in one tank by turns, a membrane bioreactor replaces the clarifier with membranes, but the variables are the same: dissolved oxygen, ammonia and nitrate, mixed liquor suspended solids, sludge age, and the return and waste sludge rates. The instruments that read them, the loops that act on them, and the sequences that time them are what a control system contributes; the process decisions, the sludge age target and the wasting plan, stay with the operators and the controls make them easy to carry out and hard to get wrong.',
    keyPoints: [
      'The controls hold oxygen, time, biomass, and recycle; the process forms differ in how those are arranged.',
      'Dissolved oxygen is the fast loop, ammonia and nitrate the slow ones, sludge age the slowest; each has its instrument and its cadence.',
      'Mixed liquor solids and sludge age are set by wasting, which the controls schedule and totalize from measured flow and solids.',
      'Cyclic processes, sequencing batch reactors and oxidation ditch cycles, are sequences with timers, level, and analyzers deciding the phases.',
      'Alarms are about trends: rising effluent ammonia, falling dissolved oxygen at full blower output, a rising sludge blanket.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Wastewater', 'Control', 'Instrumentation', 'Design', 'Standards'],
    blocks: [
      { t: 'h2', text: 'Forms and what the controls do' },
      {
        t: 'table',
        head: ['Form', 'Arrangement', 'What the controls run'],
        rows: [
          ['Conventional activated sludge', 'Aeration basins in series or zones, then clarifiers', 'Dissolved oxygen per zone, return and waste sludge, sometimes internal recycle'],
          ['Extended aeration', 'Long detention, low loading, often small plants', 'Dissolved oxygen, wasting schedule, simple sequences'],
          ['Oxidation ditch', 'A loop channel with surface or diffused aeration', 'Aerator on and off or speed cycles for anoxic and aerobic periods, dissolved oxygen, return and waste'],
          ['Sequencing batch reactor', 'One or more tanks that fill, react, settle, decant, and idle in turn', 'The phase sequence with timers, level, and analyzers; decanter control; wasting during settle or idle'],
          ['Membrane bioreactor', 'Aeration basins with membrane tanks instead of clarifiers', 'Dissolved oxygen, membrane permeate flow and transmembrane pressure, air scour, backpulse and cleaning sequences, wasting'],
          ['Biological nutrient removal', 'Anaerobic, anoxic, and aerobic zones with recycles', 'Zone dissolved oxygen, internal recycle on nitrate, return sludge, carbon and chemical feeds'],
        ],
      },
      { t: 'h2', text: 'The variables' },
      {
        t: 'dl',
        items: [
          { term: 'Dissolved oxygen', def: 'Held by aeration control at a setpoint per zone, often one to two milligrams per liter in aerobic zones and near zero in anoxic zones; the fast loop, in minutes. Too much wastes energy and can hurt nutrient removal; too little stops nitrification.' },
          { term: 'Ammonia and nitrate', def: 'Read at the end of the aerobic zone and in the anoxic zone; they say whether nitrification and denitrification are complete, and they set the dissolved oxygen setpoints and the internal recycle in advanced control. Slow loops, in tens of minutes.' },
          { term: 'Mixed liquor suspended solids', def: 'The biomass concentration, read by a suspended solids probe or by laboratory; held by the wasting rate. Changes over days.' },
          { term: 'Sludge age', def: 'The average time solids stay in the system, computed from the solids inventory and the solids wasted per day; the operator target that decides nitrification. Changes over weeks.' },
          { term: 'Return activated sludge', def: 'The flow from the clarifier underflow back to the basin, often a ratio of influent flow, holding the biomass in the system and the sludge blanket down.' },
          { term: 'Waste activated sludge', def: 'The flow removed to solids handling, scheduled and totalized to hit the sludge age target.' },
        ],
      },
      {
        t: 'formula',
        expr: 'SRT (days) = (V × MLSS) ÷ (Q_was × X_was + Q_eff × X_eff)',
        where: [
          'V = aeration volume; MLSS = mixed liquor suspended solids',
          'Q_was, X_was = waste sludge flow and its solids concentration',
          'Q_eff, X_eff = effluent flow and its solids; often small',
          'The controller computes it daily from measured flows and solids, and the wasting plan targets it',
        ],
      },
      { t: 'h2', text: 'Instruments' },
      {
        t: 'ul',
        items: [
          'Dissolved oxygen probes, optical, one per control zone, cleaned by air blast and verified against a portable meter.',
          'Ammonia and nitrate probes or analyzers at the zone ends where advanced control is used.',
          'Suspended solids probes in the mixed liquor and the return sludge, verified against laboratory results.',
          'Sludge blanket level in the clarifiers.',
          'Flow on influent, return sludge, waste sludge, and internal recycle.',
          'Oxidation-reduction potential in anoxic and anaerobic zones where the process is cyclic.',
          'Air flow per zone and blower power for the aeration loop.',
        ],
      },
      { t: 'h2', text: 'Sequences' },
      {
        t: 'p',
        text: 'A sequencing batch reactor runs a cycle of fill, react, settle, decant, and idle, with the phase changes driven by timers, by the tank level, and increasingly by analyzers that end the react phase when ammonia is gone and start decant when settling is complete. The sequence is a chart with a step for each phase, a timeout on each, a defined response to a high inflow that shortens the cycle, and a decanter that never opens with the mixers or the aeration running. An oxidation ditch cycles its aerators on and off, or between speeds, to alternate anoxic and aerobic periods, with the durations set by the dissolved oxygen and nitrate readings. A membrane bioreactor runs a permeate cycle with relaxation or backpulse and a maintenance clean on a schedule, all as sequences with interlocks on transmembrane pressure.',
      },
      { t: 'h2', text: 'Alarms' },
      {
        t: 'ul',
        items: [
          'Effluent or end-of-basin ammonia rising: nitrification failing; hours of warning.',
          'Dissolved oxygen below setpoint with blowers at maximum: a load beyond the air supply, a diffuser problem, or a toxic event.',
          'Dissolved oxygen high with blowers at minimum: over-aeration; a turndown limit or a diffuser or valve problem.',
          'Sludge blanket rising in the clarifier: return sludge too low, a settling problem, or a hydraulic overload.',
          'Mixed liquor solids drifting from target: the wasting plan is not being executed.',
          'A sequence step past its timeout: a stuck batch reactor.',
          'Membrane transmembrane pressure rising: fouling; clean before it is forced.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'The controls carry out the process plan',
        text: 'Sludge age targets, wasting plans, and dissolved oxygen setpoints are the operators and the process engineer speaking. The control system computes what they need, executes what they decide, records what happened, and alarms when the process drifts. It does not decide the sludge age.',
      },
    ],
    faqs: [
      {
        q: 'Can wasting be automated?',
        a: 'The execution can: a waste pump run on a schedule to a computed daily volume from the sludge age target and the measured solids, with the total displayed and the operator approving the target. Many plants do it; the target remains a human decision.',
      },
      {
        q: 'What ends the react phase in a sequencing batch reactor?',
        a: 'A timer in simple designs; an ammonia or dissolved oxygen profile in advanced ones, which ends the phase when nitrification is complete and saves aeration. The timer stays as the limit.',
      },
      {
        q: 'How many dissolved oxygen probes does a basin need?',
        a: 'One per zone that has its own air control, placed where the reading represents the zone, usually toward the end of it. Two probes in one zone give a check on each other at the cost of a second probe to clean.',
      },
      {
        q: 'Why does the ammonia rise every morning?',
        a: 'The morning load arrives faster than the aeration control ramps, or the dissolved oxygen setpoint is too low for the peak, or the sludge age is at the edge of what nitrification needs in the current temperature. The trend against the influent flow says which.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-treatment/aeration-control',
      '/water-wastewater/wastewater-systems/wastewater-treatment/ras-was',
      '/water-wastewater/wastewater-systems/wastewater-treatment/clarifiers',
      '/controls/instrumentation/analytical/dissolved-oxygen',
      '/controls/instrumentation/analytical/ammonia',
      '/controls/plc-systems/programming/sequential-function-chart',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/chemical-systems',
    kind: 'reference',
    title: 'Chemical Systems in Wastewater Treatment',
    summary:
      'The chemical feeds of a wastewater plant and their controls: coagulants for phosphorus, polymer for thickening and dewatering, hypochlorite and sulfite for disinfection and dechlorination, and the alarms that keep the plant in its permit.',
    answer:
      'A wastewater plant feeds chemicals at a dozen points, each with a purpose, a control mode, and a hazard: a coagulant such as ferric chloride or alum to precipitate phosphorus, a polymer to help sludge thicken and dewater, hypochlorite or chlorine to disinfect and sulfite to remove the residual, caustic, lime, or magnesium hydroxide to keep alkalinity for nitrification, a carbon source such as methanol or glycerin to drive denitrification, and chemicals for odor control. The controls set the feed rate by the mode that suits the point, manual, flow-paced to a plant flow, ratio to a solids loading, or trimmed by an analyzer reading downstream, and they run the metering pumps, watch the tank levels, verify the feed by calibration column drawdown, and alarm on loss of feed, low tank, high pressure, and containment leaks. Each chemical has its own interlocks, from the flammability of methanol to the incompatibility of hypochlorite and acid, and the control system is where those interlocks are enforced.',
    keyPoints: [
      'Every feed point has a purpose, a control mode, a metering pump, a tank level, a verification, and an alarm set.',
      'Flow pacing is the base; an analyzer trim closes the loop where a downstream measurement exists.',
      'Verify feed rate by drawdown on a calibration column, not by the pump display.',
      'Interlocks per chemical: no feed without plant flow, no pump with the tank empty, and the chemical-specific safety interlocks.',
      'Containment leak detection, low tank, and loss of feed are permit alarms as much as process alarms.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Wastewater', 'Control', 'Instrumentation', 'Standards', 'Design'],
    blocks: [
      { t: 'h2', text: 'The feeds' },
      {
        t: 'table',
        head: ['Chemical', 'Purpose', 'Usual control', 'Hazard to interlock'],
        rows: [
          ['Ferric chloride, ferric sulfate, alum', 'Phosphorus precipitation; odor control', 'Flow-paced with a phosphate analyzer trim, or a ratio to influent phosphorus', 'Corrosive; containment; pH depression consumes alkalinity'],
          ['Polymer', 'Thickening and dewatering conditioning', 'Ratio to sludge solids loading; trimmed by centrate quality or press performance', 'Slippery spills; make-down water interlock'],
          ['Sodium hypochlorite or chlorine gas', 'Disinfection', 'Flow-paced with residual trim and contact time', 'Gas leak detection and scrubber for chlorine; hypochlorite degrades and off-gasses; never near acid'],
          ['Sodium bisulfite or sulfur dioxide', 'Dechlorination', 'Flow-paced with ORP or residual analyzer trim', 'Sulfur dioxide gas; overdose depletes oxygen in the receiving water'],
          ['Caustic, lime, magnesium hydroxide', 'Alkalinity and pH for nitrification', 'pH or alkalinity feedback; flow pacing', 'Caustic burns; lime slurry lines plug; heat of dilution'],
          ['Methanol, glycerin, acetate', 'Carbon for denitrification', 'Ratio to nitrate load with a nitrate analyzer trim', 'Methanol is flammable and toxic; classified area, leak detection, no feed without flow'],
          ['Odor control chemicals', 'Sulfide control in collection and headworks', 'Flow-paced or scheduled; sulfide analyzer trim where present', 'Depends on the chemical; nitrate solutions and iron salts are common'],
        ],
      },
      { t: 'h2', text: 'Control modes' },
      {
        t: 'dl',
        items: [
          { term: 'Manual', def: 'The operator sets the pump speed or stroke. Acceptable for a steady feed and as a fallback; the setting is on the screen and logged.' },
          { term: 'Flow-paced', def: 'The feed rate follows the plant flow at a dose the operator sets in milligrams per liter; the controller computes the pump rate from the flow, the dose, and the chemical strength. The base mode for most feeds.' },
          { term: 'Ratio to a load', def: 'The feed follows a computed load, such as sludge solids per hour for polymer or nitrate mass for carbon, from flow and concentration measurements.' },
          { term: 'Analyzer trim', def: 'A downstream measurement, residual chlorine, phosphate, pH, nitrate, or ORP, adjusts the dose slowly to hold a target; the flow pacing does the fast work and the trim corrects the dose.' },
          { term: 'Feedback only', def: 'The analyzer sets the pump directly; used where flow is steady or the lag is short; prone to hunting where the lag is long.' },
        ],
      },
      {
        t: 'formula',
        expr: 'Pump rate (gph) = Q (MGD) × dose (mg/L) × 8.34 ÷ (strength (lb/gal) × 24)',
        where: [
          'Q = the flow the feed is paced to, million gallons per day',
          'dose = the target dose in milligrams per liter as delivered chemical',
          '8.34 = pounds per gallon of water',
          'strength = pounds of active chemical per gallon of solution, from the delivery certificate',
          'The controller does this arithmetic; the operator enters the dose and the strength',
        ],
      },
      { t: 'h2', text: 'Metering pumps and verification' },
      {
        t: 'p',
        text: 'Diaphragm and peristaltic metering pumps deliver a set volume per stroke or per revolution, controlled by speed or stroke length from the controller, with a pulse or analog feedback. Their delivered rate drifts with wear, suction conditions, and chemical off-gassing, so the rate is verified by drawing down a calibration column on the suction for a timed interval, at commissioning and on a schedule, and the calibration is entered in the controller. Loss of feed is detected by a flow switch or a pulse-per-stroke flow verification, and a pump running with no flow is alarmed and stopped. Suction and discharge pressures, back-pressure valves, pulsation dampeners, and degassing valves on hypochlorite are the mechanical parts the alarms watch.',
      },
      { t: 'h2', text: 'Tanks and containment' },
      {
        t: 'ul',
        items: [
          'Bulk tank level by radar or hydrostatic, with low and high alarms and a days-of-supply calculation from the feed rate.',
          'Day tank level and a fill sequence with a high level shutoff and an overflow alarm.',
          'Containment leak detection in each containment area, alarmed and, for the hazardous chemicals, interlocked to stop the transfer pumps.',
          'Delivery interlocks: a fill connection that cannot be opened to the wrong tank; a delivery permissive from the level.',
          'Gas detection where chlorine, sulfur dioxide, or methanol vapor could be present, with ventilation and scrubber interlocks and alarms to the plant and the callout.',
        ],
      },
      { t: 'h2', text: 'Alarms' },
      {
        t: 'table',
        head: ['Alarm', 'Meaning', 'Priority'],
        rows: [
          ['Loss of feed with plant flow present', 'The chemical is not reaching the process; a permit risk for disinfection and phosphorus', 'High'],
          ['Tank low', 'Days of supply below the reorder time', 'Medium; low-low is high'],
          ['Pump fault or high discharge pressure', 'A blocked line or a closed valve', 'High'],
          ['Containment leak', 'A spill', 'High; urgent for hazardous chemicals'],
          ['Gas detected', 'A leak of chlorine, sulfur dioxide, or a flammable', 'Urgent'],
          ['Analyzer out of range or stale', 'The trim is blind; the loop falls back to flow pacing', 'Medium'],
          ['Dose outside limits', 'A setting or a strength entry error', 'Medium'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Chemical strength and units',
        text: 'A hypochlorite delivery at a different strength, a polymer dilution changed, or a dose entered as pounds per day instead of milligrams per liter feeds the wrong amount for days. The strength is entered from the delivery certificate with the date, the dose has limits on the screen, and the calculated pump rate is shown beside the measured one so that a mismatch is visible.',
      },
    ],
    faqs: [
      {
        q: 'Flow pacing or feedback for hypochlorite?',
        a: 'Both: flow pacing follows the diurnal flow at once, and a residual analyzer trim corrects the dose slowly for demand changes. Feedback alone hunts through the contact time lag; flow pacing alone drifts with demand.',
      },
      {
        q: 'How often should metering pumps be verified?',
        a: 'At commissioning, after any maintenance, and on a schedule that the drift record sets, monthly for most and weekly for the permit-critical feeds. A pump display is a setting, not a measurement.',
      },
      {
        q: 'What interlocks does a methanol feed need?',
        a: 'Feed only with plant flow and with the nitrate load calling for it, a leak and vapor detection system in the storage and feed area with ventilation, classified electrical equipment, a low tank cutoff, a discharge pressure limit, and a shutdown on fire alarm. The fire code and the insurer have opinions; read them.',
      },
      {
        q: 'Why did the phosphorus rise with the coagulant feed running?',
        a: 'The feed was running and not delivering: a leaking pump, a plugged line, an off-gassed suction, or a strength change; or the dose was right for a lower load. Flow verification on the feed and a phosphate analyzer trend beside the feed rate find it.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-treatment/chemical-feed',
      '/water-wastewater/wastewater-systems/wastewater-treatment/effluent-disinfection',
      '/water-wastewater/wastewater-systems/wastewater-treatment/residuals',
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/analytical/orp',
      '/controls/instrumentation/analytical/ph',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/effluent-disinfection',
    kind: 'reference',
    title: 'Effluent Disinfection',
    summary:
      'Disinfecting the effluent and proving it: chlorination with contact time and residual control, dechlorination with sulfite controlled by ORP or a residual analyzer, ultraviolet systems with dose control from flow, and the records the discharge report needs.',
    answer:
      'Effluent disinfection is the last barrier before the receiving water and the one the permit watches most closely, and its controls have two jobs: deliver the dose and prove it. With chlorine, the dose is a residual held through a contact basin for a time set by the flow, controlled by flow pacing with an analyzer trim, and then removed by sulfite before discharge so that the residual limit at the outfall, often near zero, is met; the dechlorination is controlled to an ORP setpoint or a residual analyzer and is the loop most likely to trip a permit. With ultraviolet light, the dose is intensity times exposure, controlled by the number of lamp banks in service against the flow and the transmittance of the water, with the intensity sensors proving the lamps are delivering and a low-dose alarm that means a violation is in progress. Either way the analyzers are verified against grab samples, the redundancy covers a failed pump, lamp bank, or analyzer, and the historian holds the residual, the dose, and the flow at the resolution the report requires.',
    keyPoints: [
      'Chlorination: flow-paced dose with residual trim, contact time from the basin volume and the flow, dechlorination to the outfall limit.',
      'Ultraviolet: dose from intensity, transmittance, and flow; banks staged by flow; low-dose alarm is a violation in progress.',
      'The dechlorination loop, on ORP or a residual analyzer, is the one most likely to trip the permit; give it the best instrument.',
      'Verify every analyzer against grab samples on the permit schedule; a drifted analyzer is a false record.',
      'Redundancy for pumps, banks, and analyzers, and a defined response to each failure, including stopping discharge where the permit requires.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Wastewater', 'Control', 'Standards', 'Instrumentation', 'Alarms'],
    blocks: [
      { t: 'h2', text: 'Chlorination' },
      {
        t: 'p',
        text: 'Hypochlorite or chlorine gas is fed to the contact basin inlet at a dose that leaves the residual the permit and the pathogen kill require after the contact time, and the contact time is the basin volume divided by the flow, which falls at peak flow and rises at night. The feed is flow-paced to the effluent flow with a residual analyzer at the basin outlet trimming the dose. Contact time is monitored as a calculated value with a minimum alarm; at peak flow the design either has enough basin or raises the residual to compensate. The residual analyzer at the basin outlet is the process measurement; a second one at the outfall after dechlorination is the compliance measurement.',
      },
      {
        t: 'formula',
        expr: 'CT = C_residual × t_contact;   t_contact = V_basin × baffling factor ÷ Q',
        where: [
          'C_residual = chlorine residual at the basin outlet, mg/L',
          't_contact = contact time in minutes, from the basin volume, its hydraulic efficiency, and the flow',
          'The permit or the design states the required CT or the required residual and time',
        ],
      },
      { t: 'h2', text: 'Dechlorination' },
      {
        t: 'p',
        text: 'Sulfite, as sodium bisulfite or sulfur dioxide, reacts with the residual almost instantly, and the loop that controls it has to hit a target near zero with no measurement of what is left over. Two approaches are used: an ORP setpoint just below the knee where the chlorine disappears, found by titration at commissioning, and a residual analyzer with a low range that reads the last hundredth of a milligram per liter. Both are fed forward from the chlorine feed rate and the flow, since the sulfite needed is proportional to the chlorine that was added, and trimmed by the measurement. Overdosing sulfite consumes dissolved oxygen in the receiving water and is itself a permit issue; the feed has an upper limit. The outfall residual analyzer and a grab sample program are the proof.',
      },
      { t: 'h2', text: 'Ultraviolet' },
      {
        t: 'table',
        head: ['Element', 'Role', 'Control'],
        rows: [
          ['Lamp banks in channels', 'Deliver the ultraviolet intensity', 'Banks staged in and out by flow; lamps aged by hours'],
          ['Intensity sensors', 'Measure delivered intensity per bank', 'Low intensity alarm; lamp failure detection'],
          ['Transmittance analyzer', 'Measures how far ultraviolet penetrates the water', 'Dose calculation; low transmittance raises the banks needed'],
          ['Flowmeter', 'Exposure time', 'Dose calculation and bank staging'],
          ['Level control in the channel', 'Keeps lamps submerged and the water depth constant', 'Weir or level gate; low level alarm'],
          ['Sleeve cleaning', 'Keeps the quartz sleeves clear', 'Mechanical wiper cycles on a schedule; chemical cleaning when intensity falls'],
          ['Dose calculation', 'Intensity times exposure, corrected for transmittance', 'Held above the validated dose; low-dose alarm and, where required, discharge stop'],
        ],
      },
      {
        t: 'p',
        text: 'The validated dose comes from the manufacturer testing of the reactor and the permit accepts it as the disinfection proof, so the controller computes the delivered dose continuously from the measured intensity, transmittance, and flow and holds it above the validated value by adding banks as flow rises and transmittance falls. A dose below the validated value is a violation in progress and is alarmed as urgent; lamp aging, sleeve fouling, and a transmittance excursion from an upstream upset are the causes. Banks are alternated so that lamp hours balance, and the system starts banks ahead of the morning flow rise rather than behind it.',
      },
      { t: 'h2', text: 'Proving it' },
      {
        t: 'ul',
        items: [
          'Residual analyzers verified against grab samples by an approved method at the permit frequency, with the as-found record.',
          'Transmittance analyzer verified against a laboratory spectrophotometer.',
          'Intensity sensors calibrated against a reference sensor on the manufacturer schedule.',
          'Indicator organism samples on the permit schedule, with the disinfection record for the same period retrievable from the historian.',
          'Time synchronization across the analyzers, the controller, and the historian, so the record is coherent.',
        ],
      },
      { t: 'h2', text: 'Failures and responses' },
      {
        t: 'table',
        head: ['Failure', 'Response'],
        rows: [
          ['Chlorine feed lost', 'Standby pump starts; alarm; residual trend watched; if the residual falls below the limit, the permit clause on emergency discharge applies'],
          ['Residual analyzer failed or stale', 'Loop falls back to flow pacing at the last good dose; grab samples increase; alarm'],
          ['Sulfite feed lost', 'Standby pump; alarm; outfall residual watched; discharge diverted or stopped where the permit requires'],
          ['Ultraviolet bank failed', 'Another bank in; alarm; dose recalculated'],
          ['Low ultraviolet dose', 'All banks in; alarm urgent; discharge stopped or diverted where the permit requires'],
          ['Low transmittance from an upstream upset', 'Banks added; the upstream process alarmed; dose watched'],
          ['Power loss', 'Ultraviolet on generator where the permit requires continuous disinfection; chlorine pumps on the UPS or generator'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Records are the compliance',
        text: 'A residual that was fine and a historian gap that covers the hour a sample was taken is a violation in the eyes of the report. The disinfection tags are historized at short intervals, the collector buffers through outages, and the report is generated from the historian, not from a clipboard.',
      },
    ],
    faqs: [
      {
        q: 'ORP or a residual analyzer for dechlorination?',
        a: 'A low-range residual analyzer gives a number the permit understands and drifts less at the endpoint; ORP is cheaper, faster, and sensitive at the knee but reads a condition rather than a concentration. Many plants control on ORP or feed-forward and prove with the residual analyzer at the outfall.',
      },
      {
        q: 'How much contact time do I need?',
        a: 'What the permit or the design states, often on the order of fifteen to thirty minutes at peak flow for a given residual; the calculated contact time with the baffling factor is displayed and alarmed so that the operator sees it fall at peak flow.',
      },
      {
        q: 'The ultraviolet dose falls every afternoon.',
        a: 'Transmittance falls with an afternoon load, or flow rises past the staged banks, or the sleeves foul during the day. The transmittance and flow trends against the dose name it; the cure is earlier bank staging, a transmittance excursion investigation upstream, or a cleaning interval.',
      },
      {
        q: 'Can I run ultraviolet at a fixed number of banks?',
        a: 'At the cost of energy and lamp life at low flow, and of dose at high flow. Flow-paced staging with a margin is the standard; a fixed configuration is a fallback when the flowmeter or the transmittance analyzer fails.',
      },
    ],
    related: [
      '/water-wastewater/water-systems/water-treatment/disinfection',
      '/water-wastewater/wastewater-systems/wastewater-treatment/chemical-systems',
      '/water-wastewater/wastewater-systems/wastewater-treatment/effluent',
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/analytical/orp',
      '/controls/scada-hmi/historian-data/reporting',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/effluent',
    kind: 'reference',
    title: 'Effluent',
    summary:
      'Effluent from the controls side: the flow measurement the permit is built on, the composite samplers it paces, the parameters measured online, flow, pH, dissolved oxygen, residual, turbidity, and the data integrity that makes the record defensible.',
    answer:
      'The effluent is where a wastewater plant is judged, and its controls are as much about the record as the process. The effluent flowmeter, a flume or a magnetic meter, is the number every limit is calculated against and it is calibrated and verified on a schedule; the composite samplers are paced by that flow so that the laboratory sample represents the day; the online analyzers, pH, dissolved oxygen, chlorine residual, turbidity as a solids surrogate, and ammonia where the permit needs it, give continuous evidence and early warning; the outfall structure and any reuse or storage diversions are controlled by level and quality; effluent pumps, where the outfall needs them, run on wet well level with the same care as a lift station; and the discharge monitoring report is generated from the historian with the calibration and verification records that make each number defensible. The alarms at the effluent are the ones with regulatory consequence, and they are designed so that an operator has time to act and a record of having acted.',
    keyPoints: [
      'The effluent flowmeter is the basis of every limit; verify it and keep the record.',
      'Composite samplers are flow-paced from the effluent meter so the laboratory result represents the day.',
      'Online analyzers give continuous evidence and warning; grab samples give the compliance number.',
      'The discharge monitoring report comes from the historian with calibration records attached.',
      'Effluent alarms have regulatory consequence; design them with time to act and a log of the response.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Wastewater', 'Standards', 'Instrumentation', 'SCADA', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'Flow' },
      {
        t: 'p',
        text: 'A Parshall flume with an ultrasonic or radar level sensor, or a magnetic flowmeter on a full pipe, measures the effluent flow that the permit limits and every mass loading uses. The flume dimensions are certified, the level sensor is referenced to the flume floor and verified against a staff gauge, the meter is checked against a second method on a schedule, and the totalizer is the reported daily flow. A flow record with a gap is a report with an estimate in it, so the flow tags are historized at short intervals with a buffered collector and the meter is on the UPS.',
      },
      { t: 'h2', text: 'Samplers' },
      {
        t: 'p',
        text: 'Composite samplers draw a small volume each time a set volume of effluent passes, paced by pulses from the flowmeter, so that the composite represents the flow-weighted day; time-paced sampling is used only where the permit allows it. The controller sends the pacing pulses, the sampler reports its status and its sample count, and both are alarmed: a sampler that stopped at three in the morning is a missed sample day. Refrigeration temperature, bottle full, and sampler fault are the signals.',
      },
      { t: 'h2', text: 'Online parameters' },
      {
        t: 'table',
        head: ['Parameter', 'Instrument', 'Use'],
        rows: [
          ['Flow', 'Flume with level sensor, or magnetic meter', 'Permit basis; sampler pacing; loading calculations'],
          ['pH', 'Electrode', 'Permit range; alarm and process warning'],
          ['Dissolved oxygen', 'Optical probe', 'Permit minimum on some discharges; sulfite overdose indicator'],
          ['Chlorine residual', 'Amperometric or colorimetric analyzer', 'Permit maximum after dechlorination'],
          ['Turbidity or suspended solids', 'Nephelometer or solids probe', 'Surrogate for total suspended solids; clarifier warning'],
          ['Ammonia, nitrate, phosphate', 'Analyzers where the permit has nutrient limits', 'Continuous evidence; trim for upstream control'],
          ['Temperature', 'Sensor', 'Some permits'],
          ['Ultraviolet transmittance', 'Analyzer', 'Where ultraviolet disinfection is used'],
        ],
      },
      { t: 'h2', text: 'Outfall and diversions' },
      {
        t: 'ul',
        items: [
          'The outfall structure with its level, tide gate or flap valve status, and any flow-splitting to multiple outfalls.',
          'Reuse diversion: effluent meeting reuse quality is diverted to a reuse system on quality and demand, with the diversion valve position and the reuse flow metered and reported.',
          'Storage or equalization diversion for off-specification effluent where the permit allows it, on the quality alarms, with a return sequence.',
          'Emergency bypass structures with position monitoring and alarms; a bypass event is a reportable event.',
        ],
      },
      { t: 'h2', text: 'Effluent pumping' },
      {
        t: 'p',
        text: 'Where the receiving water is higher than the plant or the outfall is long, effluent pumps lift the flow from an effluent wet well. They run on level with lead and lag staging and alternation, often on drives to match the plant flow smoothly, with a high level alarm that is also a plant-wide alarm because a stopped effluent pump backs the plant up through the clarifiers. The pumps are on the generator, their check valves and surge protection sized for the outfall, and their flow is metered if the permit flowmeter is not downstream of them.',
      },
      { t: 'h2', text: 'The report' },
      {
        t: 'p',
        text: 'The discharge monitoring report is a table of daily and monthly values, flow totals, averages, maxima, and minima, for each permit parameter, with the laboratory results merged in. The historian produces the online values from the tags at the required times, the laboratory information system supplies the sample results, and a report tool assembles them with the calibration and verification records. A report built by hand from screen readings is slow and indefensible; one built from the historian is repeatable and auditable, provided the tag names, units, and time stamps are right and the calibration records are attached.',
      },
      { t: 'h2', text: 'Alarms with consequence' },
      {
        t: 'table',
        head: ['Alarm', 'Meaning', 'Response'],
        rows: [
          ['Flow above the permit or the hydraulic limit', 'A wet weather event or a meter fault', 'Verify the meter; activate the wet weather plan'],
          ['pH outside range', 'A chemical feed or an upstream upset', 'Check the feeds; a permit excursion if sustained'],
          ['Residual above limit', 'Dechlorination failed', 'Standby sulfite; divert if possible; report'],
          ['Dissolved oxygen low', 'Sulfite overdose or an aeration problem', 'Check the sulfite feed and the reaeration'],
          ['Turbidity high', 'Clarifier carryover', 'Check the sludge blanket and the return sludge'],
          ['Sampler fault', 'The sample day is at risk', 'Restart or a manual grab program'],
          ['Historian gap on an effluent tag', 'The record is at risk', 'Restore collection; document the gap'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Data integrity',
        text: 'Synchronized clocks on the analyzers, the controller, the sampler, and the historian; calibration records with as-found values; an audit trail on every setpoint and configuration change; and a historian that buffers through outages. The effluent record is evidence, and evidence has a chain of custody.',
      },
    ],
    faqs: [
      {
        q: 'Can the online analyzer value be reported instead of the laboratory sample?',
        a: 'Only where the permit says so for that parameter and the analyzer is an approved method with the required verification. Most permits take laboratory results on composite samples for the limits and use online values as evidence and warning.',
      },
      {
        q: 'The flume reading and the magnetic meter downstream disagree by 8 percent.',
        a: 'One of them is wrong: the flume level sensor datum or a submerged flume, or the magnetic meter installation. Verify the flume level against the staff gauge and the flume dimensions, and the meter against a volumetric check; the permit meter is the one that must be right.',
      },
      {
        q: 'What happens to the report when the historian was down for a day?',
        a: 'The day is reported from whatever record exists, the paper log or the sampler, and the gap is documented with the reason. Then the historian gets a buffered collector so that it does not happen twice.',
      },
      {
        q: 'Who should get the effluent alarms?',
        a: 'The operator on duty at the plant and, for the ones with regulatory consequence, the on-call supervisor through the callout system, with escalation. The alarm philosophy lists them by priority.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-treatment/effluent-disinfection',
      '/controls/instrumentation/flow/open-channel-flow',
      '/controls/instrumentation/analytical/turbidity',
      '/controls/scada-hmi/historian-data/reporting',
      '/controls/instrumentation/calibration/calibration-documentation',
      '/engineering-library/standards/epa',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-treatment/residuals',
    kind: 'reference',
    title: 'Residuals',
    summary:
      'Solids handling from the controls side: thickening by gravity, flotation, or drum, aerobic and anaerobic digestion with their temperature, mixing, and gas systems, dewatering by belt press, centrifuge, and the records that biosolids regulation requires.',
    answer:
      'Residuals are the solids a plant removes, primary sludge and waste activated sludge, and the process that turns them into something that can be hauled, thickened to reduce volume, digested to stabilize and reduce them, and dewatered to a cake. The controls run each step as a sequence with its loops and interlocks: a thickener on a feed schedule with a polymer dose paced to the solids loading and an underflow pumped on a blanket or a density target; a digester held at temperature with heat exchangers and mixed on a schedule, its gas collected, measured, and burned or flared with the safety systems of a fuel gas plant; a dewatering unit started in a sequence of conveyor, polymer, feed, and press with the polymer dose tuned to the cake solids and the centrate quality; and storage and hauling with levels, weights, and the records the biosolids regulations require. The measurements that make it controllable are solids concentration and flow, from which every loading is computed, and the trends of cake solids, polymer per dry ton, and digester volatile solids reduction are what the operators manage against.',
    keyPoints: [
      'Solids loading, flow times concentration, is the number every residuals loop is paced to; measure both.',
      'Thickening, digestion, and dewatering are each a sequence with interlocks; the polymer dose is paced to dry solids and trimmed on performance.',
      'Digesters are fuel gas plants: gas detection, pressure relief, flame arrestors, flares, and classified electrical equipment, all interlocked.',
      'Dewatering performance is judged on cake solids, capture, and polymer per dry ton, trended from the instruments and the laboratory.',
      'Biosolids records, quantities, pathogen and vector attraction reduction, and destinations, come from the historian and the hauling log.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Wastewater', 'Control', 'Instrumentation', 'Standards', 'Design'],
    blocks: [
      { t: 'h2', text: 'The train' },
      {
        t: 'table',
        head: ['Step', 'Equipment', 'What the controls run'],
        rows: [
          ['Thickening', 'Gravity thickener, dissolved air flotation, rotary drum, gravity belt', 'Feed pumps and schedule, polymer dose to loading, underflow or float removal on blanket or density, overflow quality'],
          ['Aerobic digestion', 'Aerated tanks, often at small plants', 'Aeration for dissolved oxygen and mixing, decant sequence, temperature, volatile solids record'],
          ['Anaerobic digestion', 'Heated, mixed tanks with gas handling', 'Feed schedule, temperature loop, mixing, gas pressure, gas flow, flare and boiler, safety systems'],
          ['Dewatering', 'Belt filter press, centrifuge, screw press', 'Start and stop sequence, feed and polymer pacing, machine variables such as belt speed or bowl differential, cake conveyor, washwater'],
          ['Storage and hauling', 'Cake hoppers, storage pads, liquid storage', 'Levels and weights, loadout sequence, truck records'],
          ['Sidestream', 'Centrate and filtrate return', 'Flow and load back to the plant; equalization to avoid an ammonia slug'],
        ],
      },
      { t: 'h2', text: 'Loading' },
      {
        t: 'formula',
        expr: 'Dry solids (lb/day) = Q (gpd) × TSS (mg/L) × 8.34 ÷ 1,000,000',
        where: [
          'Q = sludge flow in gallons per day',
          'TSS = total suspended solids in milligrams per liter, from a solids probe verified against the laboratory',
          'Polymer is dosed in pounds of active polymer per dry ton of solids; the controller computes it',
        ],
      },
      {
        t: 'p',
        text: 'Every residuals loop is paced to dry solids: the polymer pump follows the product of flow and concentration, the digester feed schedule is set in pounds per day of volatile solids, and the dewatering feed rate is set in dry solids per hour. A solids probe on the feed line, verified weekly against the laboratory, and a flowmeter on the same line are the instruments that make this possible; without them the dose follows the flow alone and the polymer use swings with every change in concentration.',
      },
      { t: 'h2', text: 'Digesters' },
      {
        t: 'p',
        text: 'An anaerobic digester is held at its temperature, mesophilic around 35 degrees Celsius in most plants, by circulating sludge through a heat exchanger with a boiler or a heat recovery source, controlled on the digester temperature with the exchanger outlet limited to avoid baking the sludge. It is mixed by gas, pumps, or mechanical mixers on a schedule or continuously; fed on a schedule that spreads the daily load; and its gas is collected at a low pressure held by the gas system, measured, and used in a boiler or an engine with the excess flared. The controls interlock the whole gas system: pressure relief and vacuum relief on the cover, flame arrestors, a flare with its own pilot and flame detection, gas detection in the building with ventilation interlocks, and classified electrical equipment. A digester upset shows first in the gas: falling production, rising carbon dioxide fraction, and a falling pH, and the trend of those with the volatile acids from the laboratory is the alarm.',
      },
      { t: 'h2', text: 'Dewatering' },
      {
        t: 'dl',
        items: [
          { term: 'Sequence', def: 'Conveyor and cake handling first, then washwater and belts or bowl, then polymer, then feed; on stop, feed off, polymer off, a flush, then the machine and the conveyor. Every step with feedback and a timeout.' },
          { term: 'Polymer', def: 'Made down from neat polymer or emulsion with a make-down system that has its own sequence, aged, and dosed in pounds per dry ton, paced to the feed solids loading and trimmed by the operator on cake solids and centrate quality.' },
          { term: 'Machine variables', def: 'Belt speed and tension, or bowl speed and differential, or screw speed and back pressure; set by the operator within limits, with torque, pressure, and vibration alarms and trips.' },
          { term: 'Performance', def: 'Cake solids from the laboratory, capture from feed and centrate solids, polymer per dry ton from the totals, and machine hours; trended so that a drifting performance is seen before the hauling costs rise.' },
        ],
      },
      { t: 'h2', text: 'Safety systems' },
      {
        t: 'ul',
        items: [
          'Gas detection for methane and hydrogen sulfide in digester buildings and galleries, with ventilation and equipment shutdown interlocks and alarms to the callout.',
          'Digester cover pressure and vacuum relief, level and cover position monitoring, and a foam detection where foaming is a risk.',
          'Flare flame detection, pilot supervision, and a purge sequence.',
          'Emergency stops on conveyors and presses; guards interlocked.',
          'Confined space and lockout considerations built into the sequence permissives where equipment can be entered.',
        ],
      },
      { t: 'h2', text: 'Records' },
      {
        t: 'p',
        text: 'Biosolids regulations require records of the quantities produced and hauled, the treatment achieved for pathogen and vector attraction reduction, the sampling results, and the destinations. The historian holds the digester temperature and detention, the volatile solids reduction inputs, the dewatering totals, and the hauling weights where a scale is integrated, and the report is built from them with the laboratory results. A digester temperature record with a gap on the day the pathogen reduction is claimed is a compliance problem, so the residuals tags get the same collection care as the effluent tags.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A digester is a gas plant',
        text: 'Methane in a building, a cover over pressure, a flare without flame supervision, or an unclassified light fixture in a gas gallery has each caused a serious accident. The safety systems are designed by people who design them, interlocked in a system that cannot be bypassed from a screen, and tested on a schedule.',
      },
    ],
    faqs: [
      {
        q: 'Can polymer dosing be closed-loop?',
        a: 'Partly: the dose is paced to dry solids automatically, and some plants trim it on centrate turbidity or a charge analyzer. Cake solids from the laboratory remain the final judge, and the operator adjusts the pounds per dry ton against them.',
      },
      {
        q: 'Why is the digester gas production falling?',
        a: 'Less feed, a temperature drop, a toxic load, or an acid buildup; the temperature and feed trends and the laboratory volatile acids and alkalinity say which. Falling gas with rising carbon dioxide and falling pH is an upset that needs feed reduction and possibly alkalinity addition.',
      },
      {
        q: 'How do I know the thickener is working?',
        a: 'Underflow concentration from the solids probe against the target, overflow suspended solids, and the blanket level; polymer per dry ton for a conditioned thickener. A rising overflow solids and a falling underflow concentration is a loaded or upset thickener.',
      },
      {
        q: 'What should be on the generator in the residuals area?',
        a: 'The digester gas safety systems, the ventilation, the flare, the heating circulation where a temperature drop would matter, and the gas detection. Dewatering can usually wait; the digester cannot be left without its safety systems.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-treatment/ras-was',
      '/water-wastewater/wastewater-systems/wastewater-treatment/chemical-systems',
      '/water-wastewater/wastewater-systems/wastewater-treatment/clarifiers',
      '/controls/plc-systems/programming/sequential-function-chart',
      '/controls/control-panels/panel-design/ul-698a',
      '/engineering-library/standards/epa',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-pump-control/constant-speed',
    kind: 'reference',
    title: 'Constant Speed Pump Control',
    summary:
      'On and off pumping with constant speed pumps: why it remains the right answer at most lift stations, the level bands and the wet well volume that set the cycle, starts per hour and motor limits, and the cases where variable speed is worth its cost.',
    answer:
      'Most lift stations run constant speed pumps on and off by level, and most of them should: a submersible pump at full speed moves the water, scours the force main, and clears itself of rags in a way that a pump at half speed does not, and the wet well provides the storage that makes on and off pumping smooth enough. The design sets the level bands from the wet well volume so that the pumps cycle within their starts-per-hour rating at the worst inflow, stages the lag pump for inflow beyond one pump, alternates the lead so that both pumps share the duty, and starts the motors across the line or with soft starters according to what the electrical service and the force main can take. The controls are simple and the simplicity is a virtue at a site visited once a month; the concerns are septicity in a wet well that sits too long between cycles, grease and solids that accumulate at the off level, surge on the force main from full-speed stops, and the electrical inrush of a large motor. Variable speed earns its place where flow must be matched to a downstream limit, where the force main or the electrical system cannot take the starts, or where the energy case is real.',
    keyPoints: [
      'On and off by level with the bands sized from the wet well volume and the starts-per-hour rating.',
      'Full-speed pumping scours the force main and clears rags; it is a feature, not a limitation.',
      'Alternate the lead and stage the lag; both pumps share the duty and both are proven daily.',
      'Soft starters where the inrush or the surge is a problem; across the line where it is not.',
      'Watch septicity, grease at the off level, surge on stop, and the starts count; these are the failure modes of constant speed.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Wastewater', 'Pumps', 'Lift Stations', 'Control', 'Level'],
    blocks: [
      { t: 'h2', text: 'The bands' },
      {
        t: 'p',
        text: 'The off level sits above the pump minimum submergence; the lead-on level sits above it by a volume that gives an acceptable cycle at the inflow that produces the most starts, which is an inflow of about half the pump capacity; the lag-on level sits higher by enough volume to let the lead pump prove itself before the second is called; the high alarm sits above that with time to respond; and the overflow is above everything with as much margin as the well provides. The bands are entered on the screen with limits, shown on the level display, and written in the control narrative.',
      },
      {
        t: 'formula',
        expr: 'Starts per hour (worst case) = 60 × Q_pump ÷ (4 × V_cycle)',
        where: [
          'Q_pump = pump capacity in gallons per minute',
          'V_cycle = wet well volume between the off and lead-on levels in gallons',
          'The worst case occurs at an inflow of half the pump capacity; keep the result within the motor rating, often 6 to 10 starts per hour for submersibles, and check the manufacturer value',
        ],
      },
      { t: 'h2', text: 'Starting' },
      {
        t: 'table',
        head: ['Method', 'Inrush', 'Force main', 'When'],
        rows: [
          ['Across the line', 'Six to eight times full load current', 'Full-speed start and stop; check valve slam and surge on long or steep mains', 'Small motors, short mains, a stiff electrical service'],
          ['Soft starter', 'Reduced to two or three times', 'Ramped start and, with a soft stop, a gentler check valve closure', 'Larger motors, generator power, mains that hammer'],
          ['Drive used as a soft starter', 'Low', 'Ramped both ways; can also match flow', 'Where a drive is justified for other reasons'],
        ],
      },
      {
        t: 'p',
        text: 'A soft stop matters more than a soft start on many force mains: a full-speed pump stopped by opening its contactor lets the column reverse and slam the check valve, and the pressure wave travels the main. Soft starters with a ramp-down, slow-closing check valves, and surge relief where the main is long address it. The generator sees the inrush too, and a staggered start with a soft starter is what lets a modest generator carry two pumps.',
      },
      { t: 'h2', text: 'Alternation and staging' },
      {
        t: 'p',
        text: 'The lead alternates each cycle so that both pumps run daily and wear evenly; the lag starts when the level reaches its band, which means inflow exceeds one pump or the lead is not delivering; and a pump that fails is skipped with the other promoted and an alarm raised. A triplex station adds a standby stage. All of this lives in a small controller with a relay backup on floats, or entirely in relays with an alternator on a simple station, and the logic is tested by faulting each pump.',
      },
      { t: 'h2', text: 'The concerns' },
      {
        t: 'dl',
        items: [
          { term: 'Septicity', def: 'Wastewater that sits in a wet well for hours at low inflow goes septic and produces sulfide, which corrodes concrete and smells. A minimum cycle frequency, achieved by a lower off level at night or a timed pump-down, keeps the detention within limits; the trade is starts.' },
          { term: 'Grease and solids', def: 'Fats and rags float and collect at the off level and on the walls. A periodic pump-down below the normal off level, to the minimum submergence, skims the accumulation into the force main; the sequence runs it on a schedule and never with the level control blind.' },
          { term: 'Surge', def: 'Full-speed stops on a long main; addressed by soft stops and valves as above.' },
          { term: 'Starts', def: 'A band that has drifted or a float that sticks raises the starts per hour past the motor rating and the motor fails hot; the starts count per pump is trended and alarmed.' },
          { term: 'Ragging', def: 'A pump that runs long with rising current is wrapped in rags; some controllers run a reverse or a repeated start sequence to clear it, and the current trend is the detection.' },
        ],
      },
      { t: 'h2', text: 'When variable speed earns its cost' },
      {
        t: 'ul',
        items: [
          'Flow must be limited to what a downstream plant or main can take.',
          'The force main or the electrical system cannot tolerate full-speed starts and stops even with soft starters.',
          'The station has enough friction head that the energy saving is real, which is rarer than the sales literature suggests.',
          'Two stations in series need to be matched so that the upper one does not flood the lower one.',
          'Even then, a periodic full-speed run to scour the main is part of the sequence.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Keep it simple, keep it proven',
        text: 'A constant speed duplex station with well-chosen bands, alternation, soft starters where needed, a backup float circuit, and a telemetry link is the most reliable thing in a collection system. The controls are a page of logic and a page of drawings, and a technician can read both at two in the morning.',
      },
    ],
    faqs: [
      {
        q: 'How low should the off level be?',
        a: 'At the minimum submergence the pump manufacturer specifies for continuous operation, so the pump does not draw air or lose cooling; a periodic skim cycle goes lower for a short time under supervision of the logic.',
      },
      {
        q: 'The pumps start ten times an hour on a rainy day.',
        a: 'The inflow is near half the pump capacity, which is the worst case, and the cycle volume is too small for it. Widen the band between off and lead-on if the well allows, or accept the starts for the duration if they are within the rating and rare.',
      },
      {
        q: 'Should the lag pump start on level or on time?',
        a: 'On level; time is a proxy that guesses. The lag band is set so that the lag comes in when the lead is genuinely not keeping up, and a lead that fails to start promotes the lag immediately regardless of level.',
      },
      {
        q: 'Do I need a soft starter on a 10 horsepower submersible?',
        a: 'Usually not for the motor or the service; possibly for the force main if it is long and the check valve slams. The surge symptoms, a banging valve and a pressure spike on the gauge at stop, decide.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/pump-sequencing-strategies',
      '/controls/control-panels/pump-panels/soft-starters',
      '/controls/control-panels/pump-panels/duplex',
      '/troubleshooting/pump-troubleshooting/pump-short-cycles',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-pump-control/station-flow-control',
    kind: 'reference',
    title: 'Station Flow Control',
    summary:
      'Controlling the flow a lift station sends downstream: why a station would limit or match its flow, the plant hydraulic limit, the force main capacity, equalization, and wet weather, and the alarms.',
    answer:
      'A lift station normally pumps whatever arrives, but there are reasons to control what it sends: a treatment plant that can only accept so much flow before its clarifiers wash out, a force main shared with other stations or near its capacity, a downstream station that floods when the upstream one runs both pumps, a wet weather plan that uses wet well and pipe storage to shave the peak, or an equalization strategy that sends flow to the plant at a steady rate. The control is a drive on the pumps with a flowmeter and a flow loop, or a level loop whose speed output is capped by a flow limit, or, on constant speed stations, a limit on how many pumps may run; without a meter, the flow is estimated from the pump curve, the speed, and the level rate of change. Stations in series are coordinated so that each sends what the next can take, the wet well is used deliberately as storage within the overflow margin, and the setpoints come from the plant over SCADA with local limits and a fallback when the link is down.',
    keyPoints: [
      'Control station flow when the plant, the force main, a downstream station, or a wet weather plan needs it; otherwise pump what arrives.',
      'Drive speed on a flowmeter is the direct method; a level loop with a flow cap is the usual compromise; a pump-count limit is the constant speed version.',
      'Estimate flow from the pump curve and the level rate of change where no meter exists, and say so on the screen.',
      'Coordinate stations in series so each sends what the next can take; use the wet wells as storage within the overflow margin.',
      'Setpoints come from the plant over SCADA with local limits and a defined fallback on communication loss.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Wastewater', 'Pumps', 'Flow', 'Control', 'VFD'],
    blocks: [
      { t: 'h2', text: 'Why limit the flow' },
      {
        t: 'table',
        head: ['Reason', 'What sets the limit', 'Who sets the setpoint'],
        rows: [
          ['Plant hydraulic capacity', 'Clarifier surface overflow rate, headworks capacity', 'The plant, over SCADA, by time or by plant state'],
          ['Force main capacity or sharing', 'Velocity and pressure limits; other stations on the main', 'The design; adjusted by a master controller'],
          ['Downstream station capacity', 'The downstream wet well and pumps', 'Coordination logic between the two stations'],
          ['Wet weather peak shaving', 'Storage in wet wells and interceptors within the overflow margin', 'The wet weather plan, activated by rainfall or plant flow'],
          ['Equalization', 'A steady rate to the plant for process stability', 'The plant, as a daily average with limits'],
        ],
      },
      { t: 'h2', text: 'Methods' },
      {
        t: 'dl',
        items: [
          { term: 'Flow loop on a drive', def: 'A magnetic flowmeter on the discharge, a PID loop setting the pump speed to a flow setpoint, with the level as a limit that overrides the flow when the well approaches the high alarm. The direct method; needs a meter and a drive per pump or a shared speed reference.' },
          { term: 'Level loop with a flow cap', def: 'The level PID sets the speed to hold the well in a band, and the speed is limited so that the flow does not exceed the cap; when the cap is active the level rises and the storage is used. The common arrangement.' },
          { term: 'Pump-count limit', def: 'On constant speed stations, a limit on how many pumps may run at once, with the level allowed to rise; crude, but it works within the overflow margin.' },
          { term: 'Staged setpoints', def: 'A schedule of flow limits by time of day or by plant state, sent from SCADA and applied within local limits.' },
        ],
      },
      { t: 'h2', text: 'Flow without a meter' },
      {
        t: 'p',
        text: 'Many stations have no flowmeter, and the flow can be estimated well enough for control from two sources: the pump curve with the measured speed and the discharge pressure, giving a flow per pump; and the wet well level rate of change with the inflow estimated from the fill rate before the pump started. The estimate is displayed as an estimate, used for the flow cap with margin, and checked against a drawdown test on a schedule. A meter is added where the flow must be reported or the cap must be exact.',
      },
      {
        t: 'formula',
        expr: 'Q_pump ≈ Q_in + A_well × (dL/dt)_pumping',
        where: [
          'Q_in = inflow, estimated from the level rise rate before the pump started times the well area',
          'A_well = wet well area',
          '(dL/dt)_pumping = the rate of level fall while pumping, negative in sign, taken as a magnitude here',
          'A drawdown test with a known volume calibrates the estimate',
        ],
      },
      { t: 'h2', text: 'Stations in series' },
      {
        t: 'p',
        text: 'When station A pumps into the gravity sewer that feeds station B, A running both pumps can exceed what B can pump, and B floods. The coordination logic gives A a flow cap derived from B state: full capacity when B is low, reduced when B is high, and a minimum that A can always send so that A does not overflow either. The link between them is SCADA or a direct radio, with a fallback on communication loss that lets A run on its level bands and alarms both. The wet wells of both are the storage the scheme uses, and the overflow margins of both are the limits.',
      },
      { t: 'h2', text: 'Setpoints from the plant' },
      {
        t: 'ul',
        items: [
          'The plant sends a flow setpoint or a cap to each station over SCADA; the station applies it within local engineering limits.',
          'A time schedule for equalization, with the daily volume watched so that no station falls behind.',
          'A wet weather mode that changes the caps and the level bands according to the plan, activated by the plant and shown at every station.',
          'On communication loss, the station holds the last setpoint for a limited time and then returns to its local bands; the fallback is on the narrative and the screen.',
        ],
      },
      { t: 'h2', text: 'Alarms' },
      {
        t: 'ul',
        items: [
          'Flow cap active for longer than the storage allows: the well is rising toward the alarm.',
          'High level with the cap active: the cap is released automatically and the plant is told.',
          'Flow estimate diverging from the drawdown test: the estimate needs recalibration or the pump is losing capacity.',
          'Communication loss with a cap in place: fallback active.',
          'Downstream station high while the upstream cap is at minimum: the storage is exhausted; the wet weather plan escalates.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The overflow margin is the limit',
        text: 'Every flow control scheme at a lift station uses the wet well as storage, and the storage ends at the overflow. The high level alarm releases every cap, the plan states how long each station can hold, and no setpoint from the plant can override the local high level logic.',
      },
    ],
    faqs: [
      {
        q: 'Does a flow cap require a drive?',
        a: 'A smooth cap does; a constant speed station can only limit the number of pumps running, which caps the flow in steps. Many wet weather plans use the pump-count limit at small stations and drives at the large ones.',
      },
      {
        q: 'How accurate is a flow estimate from the pump curve?',
        a: 'Within ten to twenty percent when the curve is current and the pressure is measured, worse as the pump wears. It serves a cap with margin and a trend; it does not serve a permit report.',
      },
      {
        q: 'What happens when the plant sends a cap and the link drops?',
        a: 'The station holds the cap for a set time, then reverts to its level bands with an alarm at both ends. The time is chosen so that a short outage does not disturb the plan and a long one does not flood the well.',
      },
      {
        q: 'Can the wet well be used as storage safely?',
        a: 'Within the margin between the normal high level and the overflow, for the duration the inflow allows, with the high level alarm as the release. The plan quantifies it per station; a station with little margin is not a storage site.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/level-pid',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/pump-sequencing-strategies',
      '/water-wastewater/wastewater-systems/lift-stations/high-level',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-scada',
      '/controls/instrumentation/flow/magnetic-flowmeters',
    ],
  },
  {
    path: '/water-wastewater/wastewater-systems/wastewater-pump-control/pump-sequencing-strategies',
    kind: 'reference',
    title: 'Pump Sequencing Strategies',
    summary:
      'The strategies for sequencing wastewater pumps: level bands with alternation, lead and lag and standby with runtime balancing, a drive lead with constant speed lag, pump-down against steady-flow operation, and how each strategy fails and recovers.',
    answer:
      'A sequencing strategy is the set of rules that decides which pumps run, at what speed, and when, and the right one for a station depends on what the station must do beyond moving water: keep the force main scoured, keep the wet well from going septic, keep grease from building up, keep starts within the motor rating, keep flow within a downstream limit, and survive a storm and a generator. The basic strategies are level bands with alternation for constant speed stations and a level loop with staging for drive stations; on top of them sit the routines that address the other concerns: a periodic full-speed run to scour the main, a skim cycle that draws the well down below the normal off level, an anti-ragging routine that reverses or restarts a pump whose current has risen, a minimum cycle frequency for septicity, a storm mode that changes the bands and the caps, and a generator mode that limits how many pumps start together. Each strategy has a failure and a recovery written into it, and each is tested by making the failure happen.',
    keyPoints: [
      'Level bands with alternation, or a level loop with staging, are the base; the routines on top address scouring, septicity, grease, ragging, storms, and generators.',
      'A drive lead with constant speed lag pumps is a common and economical mix; the lead trims and the lag pumps hard.',
      'Pump-down operation keeps the well low and the cycle short; steady-flow operation holds a level and matches inflow; each has its place.',
      'Every routine has a trigger, a limit, and a way to end; a skim cycle that cannot end is a dry-running pump.',
      'Each strategy carries its failure response: a failed pump, a bad level signal, a lost link, a lost power, and the test proves it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Wastewater', 'Pumps', 'Control', 'Lift Stations', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Base strategies' },
      {
        t: 'table',
        head: ['Strategy', 'How it works', 'Suits'],
        rows: [
          ['Level bands with alternation', 'Constant speed pumps on and off at fixed levels; the lead alternates each cycle', 'Most duplex and triplex stations'],
          ['Level loop with staging', 'A drive lead holds a level band by speed; lag pumps stage in at full speed or at the same speed when the lead is at maximum', 'Stations with drives, flow limits, or series coordination'],
          ['Drive lead, constant speed lag', 'One drive pump trims; the lag pumps run at full speed when called', 'Economical mix at medium stations'],
          ['First on, first off', 'For three or more pumps: the pump that started first stops first', 'Triplex and larger'],
          ['Runtime balancing', 'The pump with the fewest hours leads at the next cycle', 'Controller stations wanting balanced wear'],
        ],
      },
      { t: 'h2', text: 'Pump-down or steady-flow' },
      {
        t: 'p',
        text: 'Pump-down operation draws the well from lead-on to off on each cycle at full capacity, keeps the well low most of the time, keeps the detention short, and scours the main on every cycle; it is the natural mode of a constant speed station and it costs starts. Steady-flow operation holds the level in a band with a drive and sends a flow near the inflow, which is gentle on the main and the downstream plant and good for flow matching; it costs a periodic scouring run and, if the speed sits low, a ragging risk. Many drive stations run steady-flow by day and a pump-down cycle at intervals; the strategy is written down and the reasons with it.',
      },
      { t: 'h2', text: 'The routines' },
      {
        t: 'dl',
        items: [
          { term: 'Scouring run', def: 'On a drive station, a full-speed run of set duration at intervals, or whenever the average velocity in the main has been below the scouring velocity for a set time, to move settled solids. The velocity is computed from the flow and the main diameter; two feet per second is the usual target.' },
          { term: 'Skim cycle', def: 'A pump-down below the normal off level to the minimum submergence, on a schedule, to draw floating grease and rags into the pump; ends on level, on time, or on a current rise, whichever comes first, and never runs with the level signal in doubt.' },
          { term: 'Anti-ragging', def: 'When a pump current rises above its normal for the level, the routine stops the pump, optionally runs it in reverse for a few seconds where the drive and the pump allow it, and restarts; a set number of attempts, then a fault. The current trend is the detection.' },
          { term: 'Minimum cycle frequency', def: 'If the level has not reached lead-on within a set time, a pump runs the well down anyway to limit detention and septicity; the time comes from the sulfide and odor history.' },
          { term: 'Starts limiting', def: 'If starts per hour approach the motor rating, the bands widen automatically within limits and an alarm is raised; a stuck float or a drifting transmitter usually explains it.' },
          { term: 'Storm mode', def: 'On a plant or rainfall trigger, the bands and caps change to the wet weather plan values: more storage used, flow caps applied or released, the lag brought in later or sooner according to the plan.' },
          { term: 'Generator mode', def: 'On generator power, only one pump starts at a time with a stagger, the drive ramp lengthens, and the number of pumps allowed may drop to what the generator carries.' },
        ],
      },
      {
        t: 'formula',
        expr: 'v = Q ÷ A = Q (gpm) × 0.408 ÷ d² (inches)',
        where: [
          'v = velocity in feet per second in the force main',
          'Q = flow in gallons per minute',
          'd = force main inside diameter in inches',
          'A scouring velocity of about 2 feet per second is the usual minimum; the design states it',
        ],
      },
      { t: 'h2', text: 'Failure and recovery' },
      {
        t: 'table',
        head: ['Failure', 'Strategy response'],
        rows: [
          ['Pump fault', 'Promote the next pump at once; alarm; hold the failed pump out until reset'],
          ['Level transmitter bad', 'Fall back to floats through the backup circuit; alarm; suspend routines that depend on level accuracy'],
          ['Drive fault', 'Run the pump across the line through the bypass if fitted, or promote a constant speed pump; alarm'],
          ['Communication loss', 'Hold external setpoints for a set time, then local bands; alarm'],
          ['Power loss and return', 'Staggered restart in generator mode; routines resume after a delay'],
          ['Routine stuck', 'Every routine has a timeout that returns the station to base control and alarms'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Write it, show it, test it',
        text: 'The strategy is a section of the control narrative with the bands, the routines, their triggers and limits, and the failure responses. The screen shows which mode and which routine is active and why. Commissioning runs every routine and every failure, and the runtime and starts trends over the first months prove the strategy is doing what the narrative says.',
      },
    ],
    faqs: [
      {
        q: 'How often should a scouring run happen?',
        a: 'When the computed main velocity has been below the scouring value for a set period, often a few hours, or on a fixed interval where the flow is not computed. A main that is scoured on every pump-down cycle needs no separate routine.',
      },
      {
        q: 'Is reversing a pump to clear rags safe?',
        a: 'Only where the pump and drive manufacturers allow it, with a short duration and a limited number of attempts; many submersibles must not be reversed. Where it is not allowed, a stop and restart sequence often clears the impeller, and the current trend decides whether it worked.',
      },
      {
        q: 'Can the skim cycle run automatically at night?',
        a: 'Yes, on a schedule, with the level signal validated, the minimum submergence as the end point, a time limit, and a current rise as an abort. It is a routine that must be able to stop itself; a pump that runs dry because a skim cycle lost its level signal is the failure to design against.',
      },
      {
        q: 'Should a drive station ever run at full speed?',
        a: 'Regularly: for scouring, for the skim cycle, and whenever the inflow demands it. A drive station that never runs at full speed has a settling force main and a ragging pump within a season.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/wastewater-pump-control/constant-speed',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control',
      '/water-wastewater/wastewater-systems/wastewater-pump-control/station-flow-control',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-alternation',
      '/water-wastewater/wastewater-systems/lift-stations/generator-operation',
      '/controls/control-panels/pump-panels/alternation',
    ],
  },
];
