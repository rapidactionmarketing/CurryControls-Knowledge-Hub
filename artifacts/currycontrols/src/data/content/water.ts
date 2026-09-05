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
];
