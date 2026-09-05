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
];
