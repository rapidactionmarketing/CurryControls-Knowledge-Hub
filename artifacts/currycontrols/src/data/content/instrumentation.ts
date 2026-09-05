import type { Entry } from '../content-types';

export const INSTRUMENTATION_ENTRIES: Entry[] = [
  {
    path: '/controls/instrumentation/signals/ground-loops',
    kind: 'reference',
    title: 'Ground Loops in Instrumentation',
    summary:
      'Two grounds at different potentials, one signal circuit between them, and a reading that will not sit still. How to find it and how to prevent it.',
    answer:
      'A ground loop occurs when a signal circuit is connected to earth at more than one point and those points sit at slightly different potentials. The difference drives current through the signal wiring, adding an error that typically appears as noise, drift, or an offset that changes when nearby equipment runs. The fix is to establish a single ground reference for each signal circuit.',
    keyPoints: [
      'Two earth connections at different potentials drive current through your signal path.',
      'Ground a cable shield at one end only, normally the panel end.',
      'Symptoms often correlate with a VFD, a large motor, or welding nearby.',
      'Isolators break the loop when you cannot remove the second ground.',
      'Never lift a protective equipment ground to fix a signal problem.',
    ],
    published: '2026-02-25',
    updated: '2026-08-08',
    readingTime: 8,
    tags: ['Instrumentation', 'Signals', 'Grounding', 'Noise'],
    blocks: [
      { t: 'h2', text: 'Why two grounds are a problem' },
      {
        t: 'p',
        text: 'Earth is not a single equipotential surface. The ground at a lift station two hundred feet from the plant is not at the same potential as the ground at the motor control center, and the difference varies with load, soil moisture, and whatever else is drawing current. It may be millivolts. During a fault or a large motor start it can be volts.',
      },
      {
        t: 'p',
        text: 'Connect a signal circuit to earth at both ends and you have created a conductive path between two points that disagree about what zero is. Current flows through the signal wiring to equalize them, and that current is superimposed on your measurement.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Why 4-20 mA resists this better than voltage',
        text: 'A current loop is far less vulnerable to ground loop error than a voltage signal, because the transmitter regulates current rather than presenting a voltage that a parallel path can corrupt. It is not immune. A large enough circulating current, or one coupled into the loop through a shield, still shows up.',
      },
      { t: 'h2', text: 'How to recognize one' },
      {
        t: 'table',
        head: ['Symptom', 'Points toward a ground loop when'],
        rows: [
          ['Reading noisy or wandering', 'Noise appears or worsens when a nearby drive or motor runs'],
          ['Fixed offset error', 'The instrument reads correctly on a bench but not when installed'],
          ['Error changes with weather', 'Wet soil changes ground resistance and shifts the reading'],
          ['Multiple loops affected at once', 'Several signals from the same remote panel misbehave together'],
          ['Improves when a wire is lifted', 'Disconnecting one end of a shield changes the reading'],
          ['Worse on long runs', 'Distant panels have the largest ground potential difference'],
        ],
      },
      { t: 'h2', text: 'Finding it' },
      {
        t: 'steps',
        items: [
          { title: 'Characterize when it happens', text: 'Trend the signal and correlate it against drive run status, motor starts, and time of day. A noise source that switches on and off is far easier to identify than one you observe only once.' },
          { title: 'Measure potential between grounds', text: 'With a meter on AC volts, measure between the panel ground bar and the ground at the far end of the circuit. Anything more than a few hundred millivolts is worth pursuing. Do this carefully and treat both points as potentially energized.' },
          { title: 'Look for the second ground', text: 'Trace the signal circuit end to end. Common culprits: shield landed at both ends, a transmitter case bonded to a grounded pipe while its signal common is also grounded, a surge protector referencing local ground, or a spare conductor bonded at a junction box.' },
          { title: 'Test by removing, not by adding', text: 'Lift the suspected second ground on the signal circuit and watch the reading. If it settles, you have found it. Never lift a protective equipment ground as part of this test.' },
          { title: 'Confirm the fix under load', text: 'The condition that caused the problem has to be running. A loop that is quiet with the drive stopped proves nothing.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Equipment grounding is not negotiable',
        text: 'The protective bonding that keeps enclosures and equipment at earth potential exists to prevent electrocution and to clear faults. It is never removed to solve a signal problem. If a required equipment ground is creating a ground loop, the answer is signal isolation, not disconnection.',
      },
      { t: 'h2', text: 'Preventing it in design' },
      {
        t: 'ul',
        items: [
          'Ground each cable shield at exactly one end, normally the panel end where the reference is established. Insulate and terminate the far end so it cannot contact anything.',
          'Establish a single signal reference point per panel, and land analog commons there rather than at scattered points.',
          'Keep instrument cable out of trays and conduits carrying drive output conductors. Cross at right angles where crossing is unavoidable.',
          'Use twisted shielded pair for analog signals. The twist rejects magnetically coupled noise; the shield handles capacitive coupling.',
          'Specify isolated analog input channels where the signal originates in a remote panel with its own ground system.',
          'Use signal isolators on any circuit crossing between separately grounded structures.',
        ],
      },
      { t: 'h2', text: 'Isolators' },
      {
        t: 'p',
        text: 'A loop isolator galvanically separates the input side from the output side, usually with an optical or transformer coupling, and passes the 4-20 mA value across without a shared conductive path. There is no ground loop because there is no continuous circuit.',
      },
      {
        t: 'p',
        text: 'Use one where the second ground cannot be removed: a transmitter bonded to a grounded process pipe, a signal arriving from another building, or equipment supplied by a vendor whose internal grounding you do not control. They are inexpensive relative to the time spent chasing an intermittent reading, and they should be on the standard bill of materials for any signal leaving the building.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Where to place the isolator',
        text: 'Put it in the panel that owns the control system, on the incoming side. That keeps the isolated barrier under your control, gives you a defined test point, and means a future change at the far end does not silently reintroduce the loop.',
      },
    ],
    faqs: [
      {
        q: 'Should a cable shield be grounded at one end or both?',
        a: 'One end, for analog instrumentation signals, normally the panel end. Grounding both ends creates exactly the path this article is about. High-frequency network cabling follows different rules; do not apply this guidance to Ethernet.',
      },
      {
        q: 'Which end should the shield be grounded at?',
        a: 'The end where the signal reference is established, which for a loop-powered transmitter is the panel supplying the loop. Be consistent across the site and document it, because mixed practice is worse than either convention.',
      },
      {
        q: 'Can a ground loop damage equipment?',
        a: 'Usually it degrades a reading rather than causing damage. During a fault or a lightning event, however, the same path can carry very large current and destroy analog inputs. Surge protection and isolation on circuits leaving a building are worthwhile for this reason.',
      },
      {
        q: 'How do I tell a ground loop from induced VFD noise?',
        a: 'They often occur together and both correlate with drive operation. Induced noise couples into the cable and responds to routing, distance, and shielding. A ground loop responds to how many points the circuit is earthed at. Lift one shield end: if the reading settles, it was a loop.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/signal-isolation',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/troubleshooting/noise-interference/vfd-noise-on-analog-signals',
      '/troubleshooting/grounding-troubleshooting/shield-grounded-at-both-ends',
    ],
  },

  {
    path: '/controls/instrumentation/level/radar-level',
    kind: 'reference',
    title: 'Radar Level Measurement',
    summary:
      'Non-contact and guided wave radar, why it handles a wet well better than most alternatives, and the installation details that decide whether it works.',
    answer:
      'Radar level transmitters measure distance by timing a microwave signal reflected from the liquid surface, then subtracting that distance from a configured tank height to report level. Because nothing touches the liquid and the measurement does not depend on air temperature, humidity, vapor, or foam density the way ultrasonic does, radar is the preferred technology for wet wells, chemical tanks, and any vessel with a difficult atmosphere.',
    keyPoints: [
      'Measures distance by time of flight, then converts to level using a configured reference height.',
      'Unaffected by air temperature, humidity, vapor, and most foam, unlike ultrasonic.',
      'Higher frequency gives a narrower beam, which matters in a narrow or obstructed wet well.',
      'Guided wave radar sends the signal down a probe and handles low-reflectivity liquids and turbulence.',
      'Most field problems are mounting position and false echoes, not the instrument.',
    ],
    published: '2026-03-11',
    updated: '2026-07-09',
    readingTime: 9,
    tags: ['Instrumentation', 'Level', 'Radar', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'How it works' },
      {
        t: 'p',
        text: 'The transmitter emits a microwave signal toward the liquid surface and measures how long the reflection takes to return, either by direct pulse timing or by frequency-modulated continuous wave, which sweeps a frequency range and derives distance from the frequency difference between transmitted and received signals.',
      },
      {
        t: 'p',
        text: 'That distance is subtracted from the configured distance to the bottom reference to yield level. This means the reference measurement, usually called the tank height or empty distance, is the single most important configuration value. Get it wrong and every reading is offset by exactly that error.',
      },
      {
        t: 'formula',
        expr: 'Level = Reference_Distance − Measured_Distance',
        where: [
          'Reference_Distance — configured distance from the sensor face to the zero level point',
          'Measured_Distance — the distance the instrument measures to the surface',
        ],
      },
      { t: 'h2', text: 'Why it beats ultrasonic in a wet well' },
      {
        t: 'p',
        text: 'Ultrasonic level uses sound, and the speed of sound in air varies with temperature and, to a lesser degree, humidity and gas composition. A wet well in July at the top and cooler at the surface is exactly the condition that makes an ultrasonic reading drift. Heavy vapor, condensation on the transducer face, and foam all degrade it further.',
      },
      {
        t: 'p',
        text: 'Radar is an electromagnetic measurement. Its propagation speed does not meaningfully change with air temperature or humidity, and vapor is largely transparent to it. That is why a station that gets recalibrated every spring on ultrasonic frequently stops needing attention after conversion to radar.',
      },
      {
        t: 'table',
        caption: 'Common wet well level technologies',
        head: ['Technology', 'Strengths', 'Weaknesses'],
        rows: [
          ['Non-contact radar', 'Unaffected by vapor and temperature; no contact with sewage', 'Cost; needs a clear mounting path; false echoes from obstructions'],
          ['Guided wave radar', 'Works on low-reflectivity liquids, turbulence, and narrow spaces', 'Probe is in the liquid and can collect rag and grease'],
          ['Ultrasonic', 'Lower cost; well understood', 'Drifts with temperature; degraded by foam, vapor, and condensation'],
          ['Submersible pressure', 'Simple; unaffected by surface conditions', 'In the liquid; vent tube can plug; grease fouling'],
          ['Bubbler', 'Tolerates very dirty service', 'Requires an air supply and maintenance'],
          ['Float switches', 'Simple, cheap, independent', 'Discrete only; rags foul them; used for backup, not measurement'],
        ],
      },
      { t: 'h2', text: 'Frequency and beam width' },
      {
        t: 'p',
        text: 'Radar transmitters are commonly available around 6 GHz, 26 GHz, and 80 GHz. Higher frequency with a given antenna size produces a narrower beam.',
      },
      {
        t: 'p',
        text: 'Beam width matters enormously in a wet well, which is typically a narrow concrete shaft with a ladder, pump discharge piping, guide rails, cabling, and a level float or two. A wide beam illuminates all of it and the transmitter has to distinguish the surface echo from the reflections off everything else. An 80 GHz instrument with a beam of a few degrees can often be mounted where a wider-beam unit would be unusable.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Mounting position decides success',
        text: 'Keep the beam clear of the ladder, guide rails, the incoming flow stream, and the wall. Do not mount in the center of a domed top, which focuses reflections. Do not mount directly above the inflow. Sketch the beam cone on the station drawing before drilling.',
      },
      { t: 'h2', text: 'False echoes and what to do about them' },
      {
        t: 'p',
        text: 'A false echo is a reflection from something that is not the liquid surface. The classic symptom is a level that reads correctly through most of its range and then locks onto a fixed value as the surface passes an obstruction.',
      },
      {
        t: 'ol',
        items: [
          'Move the instrument if you can. A relocation of eighteen inches often solves what hours of configuration cannot.',
          'Perform a false echo mapping or suppression scan with the vessel empty, so the instrument learns the fixed reflections and ignores them.',
          'Set the near-field blanking distance so reflections from the nozzle and mounting are excluded.',
          'Use a stilling well or a guided wave probe where the geometry is genuinely hostile.',
          'Verify across the full range, not just at one level. False echoes hide at specific distances.',
        ],
      },
      { t: 'h2', text: 'Guided wave radar' },
      {
        t: 'p',
        text: 'Guided wave radar sends the signal down a probe, either a single rod, a twin rod, or a coaxial element, which concentrates the energy along the probe instead of spreading it. Far more of the transmitted energy returns, so it works on low dielectric liquids that reflect poorly, in narrow spaces, and through turbulence and foam that defeat non-contact units.',
      },
      {
        t: 'p',
        text: 'The trade-off is that the probe is in the liquid. In municipal wastewater, rag and grease accumulation on a probe is a real maintenance item and is the main reason non-contact is usually preferred for raw wastewater wet wells. In a chemical day tank or a narrow standpipe, guided wave is often the better answer.',
      },
      { t: 'h2', text: 'Commissioning checklist' },
      {
        t: 'ul',
        items: [
          'Measure and record the actual distance from the sensor face to the zero reference. Do not take it from the drawing.',
          'Confirm the configured range matches the 4-20 mA scaling in the PLC. Three places must agree.',
          'Run a false echo scan with the well as empty as it can safely be made.',
          'Verify at a minimum of three points across the range against a physical measurement.',
          'Set the fail-safe direction deliberately and write it in the control narrative.',
          'Confirm the PLC treats a fault current as a fault rather than scaling it into a plausible level.',
          'Record the echo curve if the instrument supports it. It is the baseline for every future diagnosis.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Keep the independent high level float',
        text: 'A radar transmitter is a single device with a single failure mode that can report a plausible wrong value. A separate float switch wired directly to a high level alarm and, where appropriate, to a backup pump start gives the station a fallback that shares nothing with the transmitter. Do not delete it because the radar is good.',
      },
    ],
    faqs: [
      {
        q: 'Does foam affect radar level?',
        a: 'Light foam is usually transparent to radar and it measures the liquid beneath. Dense, wet foam can absorb enough energy to weaken the return. Guided wave radar handles heavy foam better than non-contact.',
      },
      {
        q: 'Why does my radar level freeze at one value?',
        a: 'Almost always a false echo. The instrument has locked onto a fixed reflection from a ladder, a pipe, a bracket, or a build-up on the wall. Run a false echo suppression scan with the vessel empty, and check the mounting position against obstructions.',
      },
      {
        q: 'Can radar measure through a plastic tank wall?',
        a: 'Sometimes, for some frequencies and materials, but it is not a general-purpose solution. It is sensitive to wall thickness and material, and it degrades unpredictably. Mount through a proper nozzle where the application matters.',
      },
      {
        q: 'What is the minimum measurable level?',
        a: 'Set by the near-field blanking distance, which excludes reflections from the antenna and nozzle. It is typically a few inches to a foot depending on the instrument. Account for it when you set the low level pump-off point.',
      },
    ],
    related: [
      '/controls/instrumentation/level/wet-well-level',
      '/controls/instrumentation/level/ultrasonic-level',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/troubleshooting/instrumentation-troubleshooting/level-reading-jumps',
    ],
  },

  {
    path: '/controls/instrumentation/flow/magnetic-flowmeters',
    kind: 'reference',
    title: 'Magnetic Flowmeters',
    summary:
      "Faraday's law applied to a pipe: how a mag meter works, the conductivity and full-pipe requirements, and why grounding decides whether it reads.",
    answer:
      "A magnetic flowmeter measures flow by applying a magnetic field across a pipe and measuring the voltage the moving conductive liquid induces, following Faraday's law of induction. It has no moving parts and no obstruction in the bore, so it handles wastewater and slurries well. It requires an electrically conductive liquid, a completely full pipe, and correct grounding to the fluid.",
    keyPoints: [
      'Induced voltage is proportional to velocity, so the meter reads velocity and computes flow from bore area.',
      'The liquid must be conductive, typically above roughly 5 microsiemens per centimeter.',
      'The pipe must be full. A partially full pipe produces a wrong reading, not an obvious failure.',
      'Grounding rings or grounding electrodes give the measurement its reference.',
      'No obstruction and no moving parts make it well suited to raw wastewater and sludge.',
    ],
    published: '2026-04-16',
    updated: '2026-08-01',
    readingTime: 8,
    tags: ['Instrumentation', 'Flow', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'The principle' },
      {
        t: 'p',
        text: "Coils on the meter body generate a magnetic field across the bore. As a conductive liquid moves through that field, it behaves like a conductor moving through a magnetic field and a voltage is induced perpendicular to both. Electrodes in contact with the liquid pick up that voltage, which is directly proportional to average velocity.",
      },
      {
        t: 'formula',
        expr: 'E = k × B × D × v',
        where: [
          'E — induced voltage measured at the electrodes',
          'k — a constant for the meter',
          'B — magnetic field strength',
          'D — internal pipe diameter',
          'v — average fluid velocity',
        ],
      },
      {
        t: 'p',
        text: 'Because B, D, and k are fixed for a given meter, the measured voltage is a direct function of velocity. Volumetric flow follows from velocity multiplied by the cross-sectional area of the bore, which is why the configured pipe size in the transmitter must match the meter body exactly.',
      },
      { t: 'h2', text: 'What it needs to work' },
      {
        t: 'dl',
        items: [
          { term: 'Conductive liquid', def: 'Water, wastewater, slurries, and most process liquids qualify. Typical minimum conductivity is around 5 microsiemens per centimeter, with some meters going lower. Hydrocarbons, oils, and deionized water generally do not work.' },
          { term: 'Full pipe', def: 'A partially full pipe exposes an electrode to air and produces an erroneous reading. Mount in a location that stays full: a vertical run with upward flow is ideal, and a low point in a horizontal run is acceptable.' },
          { term: 'Straight run', def: 'Typically five pipe diameters upstream and two or three downstream, though many modern meters need less. Elbows, valves, and pumps immediately upstream distort the velocity profile.' },
          { term: 'Grounding to the fluid', def: 'The measurement is a small voltage referenced to the liquid. Grounding rings, grounding electrodes, or a metallic grounded pipe on both sides establish that reference.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Grounding is the number one cause of mag meter problems',
        text: 'A meter installed between plastic or lined pipe sections with no grounding rings has no fluid reference and will read erratically, drift, or produce a large offset. This is a mistake made at installation and discovered months later. Confirm grounding rings are present and bonded before you look at anything else.',
      },
      { t: 'h2', text: 'Installation that works' },
      {
        t: 'ol',
        items: [
          'Choose a location that stays full at all flows, ideally a vertical run flowing upward.',
          'Respect the manufacturer straight-run requirement upstream and downstream.',
          'Do not install immediately downstream of a control valve or a pump discharge if it can be avoided.',
          'Install grounding rings on both ends unless the meter is between grounded metallic pipe and the manufacturer permits it.',
          'Bond the grounding rings to the meter body ground and to a good ground per the manufacturer instructions.',
          'Verify the flow direction arrow matches the actual flow.',
          'Confirm the configured pipe size and units in the transmitter match the physical meter.',
          'Keep the signal cable away from drive output conductors, and use the manufacturer cable where specified.',
        ],
      },
      { t: 'h2', text: 'Reading problems and where to look' },
      {
        t: 'table',
        head: ['Symptom', 'Common cause', 'Check'],
        rows: [
          ['Erratic or noisy reading', 'Grounding not established to the fluid', 'Grounding rings present and bonded'],
          ['Reads low consistently', 'Partially full pipe, or wrong configured pipe size', 'Installation elevation and transmitter configuration'],
          ['Reads flow at zero flow', 'Electrode coating, or a grounding problem', 'Inspect electrodes; verify at true no-flow with a closed valve'],
          ['Drifts over months', 'Electrode fouling from grease or scale', 'Clean electrodes; consider a meter with cleaning electrodes'],
          ['Reading jumps when a drive runs', 'Induced noise on the signal cable', 'Cable routing and separation from drive output conductors'],
          ['Totalizer disagrees with plant balance', 'Low flow cutoff set too high or too low', 'Compare configured cutoff against actual minimum flow'],
        ],
      },
      { t: 'h2', text: 'Choosing a size' },
      {
        t: 'p',
        text: 'Meters are sized on velocity, not on pipe size. The usual target is roughly 3 to 10 feet per second at normal flow. Too slow and the induced voltage is small relative to noise, which shows up as poor accuracy at low flow. Too fast accelerates liner and electrode wear, particularly with grit.',
      },
      {
        t: 'p',
        text: 'This is why a meter is often one size smaller than the pipe it sits in. A 12-inch line running well below design flow may need an 8-inch meter with reducers to keep velocity in a usable range. Check the actual operating flow range rather than the pipe size on the drawing.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Verify with a real reference before you trust the number',
        text: 'On a plant with a way to check, such as a drawdown test against a known wet well volume or a calibrated portable meter, verify at commissioning and record the result. A billing or regulatory flow measurement with no verification record is an argument waiting to happen.',
      },
    ],
    faqs: [
      {
        q: 'Can a magnetic flowmeter measure a partially full pipe?',
        a: 'A conventional one cannot; it will read low and give no obvious indication. Purpose-built partially-filled meters exist with additional electrodes for level, but for a standard mag meter, a full pipe is a requirement.',
      },
      {
        q: 'Do magnetic flowmeters work on drinking water?',
        a: 'Yes. Potable water is conductive enough. Verify the liner and electrode materials are approved for potable contact for your jurisdiction.',
      },
      {
        q: 'Why does my mag meter read flow when the pump is off?',
        a: 'Either there is genuine flow, such as backflow through a check valve, or the measurement has no proper ground reference. Close an isolation valve to establish true zero flow and observe. If it still reads, look at grounding and electrode condition.',
      },
      {
        q: 'How often should a mag meter be calibrated?',
        a: 'The electromagnetic measurement itself is stable and does not drift the way a mechanical meter does. Most utilities verify annually and clean electrodes as needed. Where the meter is used for billing or regulatory reporting, follow the requirement that applies to you.',
      },
    ],
    related: [
      '/controls/instrumentation/flow/flow-installation',
      '/controls/instrumentation/flow/flow-troubleshooting',
      '/controls/instrumentation/signals/ground-loops',
      '/how-to/instrumentation-how-to/troubleshoot-a-flowmeter',
    ],
  },
];
