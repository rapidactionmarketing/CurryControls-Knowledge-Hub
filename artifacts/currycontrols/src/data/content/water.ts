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
    tags: ['Wastewater', 'Lift Stations', 'Pumps', 'Controls'],
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
];
