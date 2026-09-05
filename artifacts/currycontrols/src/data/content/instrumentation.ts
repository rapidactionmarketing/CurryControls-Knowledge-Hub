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
    tags: ['Instrumentation', 'Signals', 'Grounding'],
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
    tags: ['Instrumentation', 'Level', 'Wastewater'],
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
  {
    path: '/controls/instrumentation/signals/4-20-ma-signals',
    kind: 'reference',
    title: '4-20 mA Signals from the Instrument Side',
    summary:
      'How a 4-20 mA current loop is powered and wired at the transmitter, why the loop resistance budget matters, and how to check a loop with a meter.',
    answer:
      'A 4-20 mA loop is a single series circuit: a DC supply, the transmitter, and the receiver input resistance, all carrying the same current. The transmitter regulates that current to represent the measurement, 4 mA at the bottom of the range and 20 mA at the top. It works because current is the same everywhere in a series loop, so wire resistance and distance do not change the reading, and a reading of 0 mA is unmistakably a broken wire.',
    keyPoints: [
      'The loop is one series circuit. Every device in it sees the same current, which is why distance does not affect accuracy.',
      'Live zero at 4 mA lets a loop-powered transmitter run on the signal current and makes a break, 0 mA, distinguishable from a real zero.',
      'A two-wire transmitter needs enough voltage left after the loop resistance drops; the supply, the input resistor, and the wire form a budget.',
      'A 250 ohm resistor turns the loop into 1 to 5 V, which is how most PLC inputs and most field checks actually read it.',
      'Fault currents outside 3.6 to 21 mA, per NAMUR NE 43, let the receiver tell a failed transmitter from a valid extreme reading.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Instrumentation', '4-20 mA', 'Signals', 'Analog'],
    blocks: [
      { t: 'h2', text: 'Why current and not voltage' },
      {
        t: 'p',
        text: 'A voltage signal loses some of itself in the wire. A 1 to 5 V signal sent down a long run arrives smaller than it left, by an amount that depends on the wire and the input, and the receiver cannot tell the difference between a lower measurement and a longer cable. Current does not have that problem. In a series loop the current at the transmitter is the current at the receiver, whatever the wire resistance, so the reading is the reading.',
      },
      {
        t: 'p',
        text: 'The range starts at 4 mA rather than zero for two reasons. A transmitter that has a few milliamps to run on can be powered by the signal itself, which is what makes two-wire instruments possible. And a loop that reads 0 mA is broken, not empty; a real minimum reads 4 mA. That live zero is the single most useful diagnostic property the standard has.',
      },
      { t: 'h2', text: 'The three parts of the loop' },
      {
        t: 'dl',
        items: [
          { term: 'The supply', def: 'A DC source, almost always 24 V, either a panel power supply or the internal supply of an input card. It provides the voltage that drives the current around the loop.' },
          { term: 'The transmitter', def: 'A variable resistance in effect. It throttles the current so that exactly 4 to 20 mA flows in proportion to the measurement, and it needs a minimum voltage across itself to do so, typically 10 to 12 V.' },
          { term: 'The receiver', def: 'The input resistance the current flows through, usually 250 ohms inside a PLC or SCADA input, sometimes a 250 ohm resistor added to a voltage input. The current produces a voltage across it, 1 V at 4 mA and 5 V at 20 mA, and that voltage is what the analog to digital converter actually measures.' },
        ],
      },
      { t: 'h2', text: 'Two-wire, three-wire, and four-wire' },
      {
        t: 'p',
        text: 'A two-wire transmitter is loop powered. The same pair carries the supply to the instrument and the signal back, and the instrument runs on the current it is regulating. It is the most common arrangement for pressure, level, and temperature transmitters because it is cheap to wire and intrinsically limits how much power can reach the field.',
      },
      {
        t: 'p',
        text: 'A four-wire transmitter has its own power connection, either 24 VDC or line voltage, and a separate signal pair on which it sources the 4 to 20 mA. Magnetic flowmeters, most analyzers, and anything with a heater or a display that needs real power are four-wire. The signal loop is then powered by the transmitter, not by the receiver, and connecting it to an input that also supplies loop power will damage one of them.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Know which end is supplying the loop before you wire it',
        text: 'A PLC analog input channel may be configured to source loop power for two-wire transmitters or to accept a signal from a self-powered four-wire device. Connecting a four-wire transmitter output to a sourcing input puts two supplies in series and the result is a damaged channel, a damaged transmitter, or both. Check the input card documentation and the transmitter wiring diagram first.',
      },
      { t: 'h2', text: 'The voltage budget' },
      {
        t: 'p',
        text: 'The supply voltage has to cover everything in the loop at 20 mA: the drop across the receiver, the drop in the wire, and the minimum the transmitter needs to operate. Whatever is left is the margin. The arithmetic is short and it is the single check that prevents a loop from working on the bench and failing in the field at full scale.',
      },
      {
        t: 'formula',
        expr: 'Maximum loop resistance = (Supply voltage - Transmitter minimum voltage) / 0.020 A',
        where: [
          'Supply voltage is the loop supply, commonly 24 V',
          'Transmitter minimum voltage is from the transmitter datasheet, commonly 10 to 12 V, higher when HART is used',
          'The result must exceed the receiver input resistance plus the round-trip wire resistance plus any isolators or indicators in the loop',
        ],
      },
      {
        t: 'p',
        text: 'With a 24 V supply and a transmitter that needs 12 V, the loop can carry 600 ohms. A 250 ohm input uses 250 of that. A loop-powered indicator in the field might use another 50 or 100. Long runs of small wire use the rest quickly, and the loop that read correctly at 4 mA will clamp somewhere below 20 mA at full scale because the transmitter can no longer push the current through the total resistance. The wire gauge table on this site gives resistance per foot for the arithmetic.',
      },
      { t: 'h2', text: 'Wiring and shielding' },
      {
        t: 'p',
        text: 'Use twisted, shielded pair. Twisting rejects magnetic pickup; the shield rejects capacitive pickup. Ground the shield at one end only, normally the panel end, and leave it insulated and floating at the instrument. A shield grounded at both ends becomes a conductor for the difference in ground potential between the two locations, and that current induces noise into the pair it was meant to protect.',
      },
      {
        t: 'p',
        text: 'Keep signal pairs away from power conductors, and particularly away from variable frequency drive output cables, which radiate high-frequency noise that a 4 to 20 mA loop will pick up as a jittery reading. Separate conduit or separate tray sections with distance between them is the remedy; a shield alone is not enough beside a drive cable.',
      },
      { t: 'h2', text: 'Fault signalling' },
      {
        t: 'p',
        text: 'The standard range leaves room above and below for the transmitter to say it has failed. NAMUR recommendation NE 43 defines the convention most transmitters follow: a failure is signalled by driving the loop below 3.6 mA or above 21 mA, and the valid measurement range, including a little over-range, stays inside 3.8 to 20.5 mA. A receiver that treats anything outside that window as a fault rather than a reading will not run a pump on a dead transmitter.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Configure the fault direction deliberately',
        text: 'Most transmitters let you choose whether a diagnostic failure drives the output high or low. Choose the direction that puts the process in the safe state when the control system reacts to it, and make the control system react to it. A fault current that lands inside the valid range is a lie.',
      },
      { t: 'h2', text: 'Checking a loop with a meter' },
      {
        t: 'steps',
        items: [
          { title: 'Read the current in series.', text: 'Break the loop at a convenient terminal, put a milliammeter in series, and read the current. It should be between 4 and 20 mA and should agree with the transmitter display and the control system reading. A clamp meter rated for DC milliamps reads it without breaking the loop.' },
          { title: 'Or read the voltage across the input resistor.', text: 'Measure across the 250 ohm receiver input. 1.000 V is 4 mA, 3.000 V is 12 mA, 5.000 V is 20 mA. This is the check that does not interrupt the loop and it is the one to use on a running process.' },
          { title: 'Check the voltage at the transmitter.', text: 'Measure across the transmitter terminals at full scale. If it is below the minimum on the datasheet, the loop is out of voltage budget and the reading will clamp.' },
          { title: 'Simulate.', text: 'Most transmitters can be commanded to output a fixed current from their configuration menu or a HART communicator. Drive 4, 12, and 20 mA and confirm the control system reads 0, 50, and 100 percent of range. Disagreement here is a scaling problem, not a loop problem.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Breaking a loop is a process action',
        text: 'Opening a loop drops the signal to 0 mA, which the control system may treat as a low reading, a fault, or a trip. Know what the loop drives before you open it, and put the loop or the equipment in a state where a 0 mA reading does no harm.',
      },
      { t: 'h2', text: 'HART on the same pair' },
      {
        t: 'p',
        text: 'HART superimposes a small digital signal on the 4 to 20 mA current, which lets a communicator or an asset management system read diagnostics and change configuration without disturbing the analog value. It needs at least 230 ohms in the loop to work, which a 250 ohm input provides, and it raises the transmitter minimum voltage slightly. A loop that has no resistance, such as one wired straight to a supply with the input bypassed, will carry the current fine and will not talk HART at all.',
      },
    ],
    faqs: [
      {
        q: 'Why is 4 mA the bottom of the range instead of 0 mA?',
        a: 'So the transmitter has current to run on and so a broken wire, which reads 0 mA, cannot be mistaken for a minimum reading, which reads 4 mA. The offset is called the live zero.',
      },
      {
        q: 'How far can a 4-20 mA signal run?',
        a: 'As far as the voltage budget allows. With a 24 V supply, a transmitter that needs 12 V, and a 250 ohm input, roughly 350 ohms of round-trip wire resistance is available, which is thousands of feet of 18 AWG. The limit is the arithmetic, not a fixed distance.',
      },
      {
        q: 'Can I put more than one receiver on a loop?',
        a: 'Yes, in series, as long as the total resistance stays inside the voltage budget. A loop-powered indicator, a chart recorder input, and a PLC input can share one loop. Devices must be in series, never in parallel; a parallel connection splits the current and both readings are wrong.',
      },
      {
        q: 'What does it mean when a loop reads 3.6 mA or 21.5 mA?',
        a: 'Almost always a transmitter fault signal under NAMUR NE 43. The instrument has detected a problem with itself or its sensor and is driving the loop out of the valid range on purpose. Read the transmitter diagnostics before trusting or replacing anything.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/4-20-ma',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/controls/plc-systems/analog-control/scaling',
      '/controls/instrumentation/signals/ground-loops',
      '/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable',
    ],
  },
  {
    path: '/controls/instrumentation/level/wet-well-level',
    kind: 'reference',
    title: 'Wet Well Level Measurement',
    summary:
      'How lift station wet well level is measured, which technology suits which well, the failure modes that flood a station, and why the high level float must stay hardwired.',
    answer:
      'Wet well level is the measurement that runs a lift station: it starts and stops the pumps and raises the alarms. Most stations use a submersible pressure transducer for the continuous level, with a non-contact ultrasonic or radar unit as the alternative where grease and rags foul the transducer. Whatever measures the level for control, an independent high level float wired to the alarm and to a pump start is what keeps the station from flooding when the transducer fails.',
    keyPoints: [
      'The continuous level signal drives lead, lag, and off setpoints; the floats are the backup, and both are needed.',
      'Submersible transducers are cheap and accurate but foul with grease and rags and must be hung where they can be pulled.',
      'Ultrasonic sensors lose their echo in foam and turbulence; radar tolerates both and has become the non-contact default.',
      'A high level float wired independently of the controller is the last line of defense and must not depend on the PLC.',
      'Most level failures are gradual: drift, fouling, and cable damage, which is why reading disagreement between the transducer and the floats is an alarm in itself.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Instrumentation', 'Level', 'Lift Stations', 'Wastewater', 'Pumps'],
    blocks: [
      { t: 'h2', text: 'What the measurement has to do' },
      {
        t: 'p',
        text: 'A lift station is a hole in the ground that fills with sewage and a set of pumps that empty it. The level in the well is the only variable the control system has. It decides when the lead pump starts, when the lag pump joins it, when they stop, when to alarm, and when to declare an emergency. Everything else in the station is downstream of getting that one number right.',
      },
      {
        t: 'p',
        text: 'The environment is as hostile as instrumentation gets. The liquid carries grease, rags, grit, and gas. Fat congeals on anything below the surface. Hydrogen sulfide attacks metal and electronics. Turbulence from the inflow and the pumps churns the surface, and foam forms on it. A level instrument in a wet well is not measuring a still tank of clean water, and the choice of technology follows from that.',
      },
      { t: 'h2', text: 'Submersible pressure transducers' },
      {
        t: 'p',
        text: 'The most common continuous level instrument in a lift station is a pressure transducer hung on its cable near the bottom of the well. It measures the hydrostatic pressure of the liquid above it, which is proportional to depth, and outputs 4 to 20 mA over a vented cable so that atmospheric pressure changes cancel. It is inexpensive, accurate within a fraction of an inch, and unaffected by foam, vapor, or what is floating on the surface.',
      },
      {
        t: 'p',
        text: 'Its weakness is that it is in the sewage. Grease builds up on the diaphragm and shifts the reading. Rags wrap the cable and the transducer. The vent tube in the cable clogs or takes on moisture, which shows up as a slow drift with the weather. And the cable itself is in the path of the pump intake and of anything that gets pulled out of the well. It has to be installed where it can be lifted for cleaning without entering the well, on a stainless cable or a rigid stilling tube, and it has to be cleaned on a schedule.',
      },
      { t: 'h2', text: 'Ultrasonic and radar' },
      {
        t: 'p',
        text: 'A non-contact instrument mounted at the top of the well measures the distance to the surface and subtracts it from the well depth. Nothing is in the liquid, so there is nothing to foul. Ultrasonic units have done this for decades and are still common; radar units have replaced them on new work because they solve the problems ultrasonics have in a wet well.',
      },
      {
        t: 'table',
        caption: 'Ultrasonic and radar in a wet well',
        head: ['Concern', 'Ultrasonic', 'Radar'],
        rows: [
          ['Foam on the surface', 'Absorbs the echo; reading is lost or false', 'Largely unaffected'],
          ['Turbulence and splashing', 'Scattered echo, noisy reading', 'Better, still benefits from a stilling location'],
          ['Vapor, temperature, and gas', 'Speed of sound changes; needs compensation', 'Unaffected'],
          ['Condensation on the sensor face', 'Attenuates the signal', 'Tolerated by most designs'],
          ['Blanking distance near the sensor', 'Significant dead zone at the top', 'Smaller dead zone'],
          ['Obstructions in the beam', 'Ladders, pipes, and cables cause false echoes', 'Same, narrower beam helps'],
          ['Cost', 'Lower', 'Higher, closing every year'],
        ],
      },
      {
        t: 'p',
        text: 'Either type has to be mounted where the beam sees liquid and nothing else, which in a small well with a ladder, a discharge pipe, and pump cables takes some care. Both need the well depth and the sensor height entered correctly at commissioning, and a wrong reference height is the most common reason a new non-contact instrument reads a foot off.',
      },
      { t: 'h2', text: 'Floats' },
      {
        t: 'p',
        text: 'Float switches are the oldest wet well instrument and they are still in every well, because they do something the continuous instruments cannot: they fail separately. A tilting float on a cable closes a contact at a fixed level. It does not drift, it does not need scaling, and it does not care about foam. It does hang up on cables and rags, and it can be dragged by the flow, which is why floats are mounted on a stainless bracket with weights and are kept apart from each other.',
      },
      {
        t: 'dl',
        items: [
          { term: 'High level alarm float', def: 'Set above the lag start level. Wired to the alarm dialer or telemetry and, in most designs, to force both pumps to run regardless of the controller. This is the float that matters.' },
          { term: 'Low level cutoff float', def: 'Set below the off level. Stops the pumps before they run dry when the transducer has failed high.' },
          { term: 'Backup pump control floats', def: 'Lead and lag start floats that take over pump control when the continuous level is declared bad, so the station keeps pumping on floats alone.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'The high level float does not go through the PLC',
        text: 'Wire the high level float to the alarm and to the pump start relays directly, so that a failed controller, a failed transducer, or a failed analog input still results in an alarm and running pumps. A high level float that is only an input to the program shares every failure the program has. Entering a wet well to service any of this is confined space work.',
      },
      { t: 'h2', text: 'Setpoints and how the level is used' },
      {
        t: 'p',
        text: 'The continuous level is compared against a set of setpoints in the controller: lead start, lag start, both stop, high level alarm, and low level alarm, in that order from the top down. The gap between start and stop is the pumping band, and it sets how often the pumps cycle. A wide band means fewer, longer runs and more storage used; a narrow band means short cycling and worn starters. The wet well control page covers the sequence and the wet well cycle calculator gives the cycle time for a given band and inflow.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Make the transducer prove itself against the floats',
        text: 'When the lead start float closes, the transducer should read at or above the lead start setpoint. When it does not, the two instruments disagree and one of them is wrong. Alarm on that disagreement. It catches a fouled transducer weeks before it would otherwise be noticed, which is usually during an overflow.',
      },
      { t: 'h2', text: 'Failure modes' },
      {
        t: 'ul',
        items: [
          'Transducer reads high and never falls: grease on the diaphragm or a clogged vent. The pumps run continuously or the low level float stops them. Clean the transducer.',
          'Transducer reads low and never rises: cable damaged or the transducer pulled out of the liquid by a rag. The pumps never start and the high level float saves the station. Check the cable and the reading against the floats.',
          'Slow drift over weeks: moisture in the vent tube or a failing sensor. Compare against a tape measurement from the hatch and recalibrate or replace.',
          'Ultrasonic loses echo during high inflow: foam or turbulence. The controller must treat a lost echo as a failed instrument and fall back to floats, not hold the last value.',
          'Float stuck up or down: rag or cable wrap. Found by the disagreement alarm or by a level that passes a float without it changing state.',
          'Reading correct at the well, wrong at the controller: a scaling error, a broken shield, or drive noise on the loop. The 4 to 20 mA pages cover the checks.',
        ],
      },
      { t: 'h2', text: 'Choosing for a specific well' },
      {
        t: 'p',
        text: 'A small station with a clean influent and a maintenance crew that visits monthly runs fine on a transducer and floats. A station with heavy grease, or one that cannot be visited often, is a candidate for radar as the primary with the transducer as the backup, so that the two technologies do not share a failure mode. Any station, whatever the primary, gets the high level float, hardwired, and a low level cutoff. The instrument that fails least in a wet well is the one that is not in the well, and the one that saves the station is the one that does not depend on anything else working.',
      },
    ],
    faqs: [
      {
        q: 'Which level sensor is best for a lift station?',
        a: 'A submersible pressure transducer for most stations, because it is accurate, cheap, and unaffected by foam, provided it can be pulled and cleaned. Radar where grease and rags make the transducer a maintenance problem. Floats alongside either, always.',
      },
      {
        q: 'Why do I need floats if I have a level transducer?',
        a: 'Because the transducer and the controller can both fail, and the floats fail differently. The high level float wired directly to the alarm and the pump starters keeps the station from overflowing when everything else has stopped working.',
      },
      {
        q: 'Why does my ultrasonic level sensor drop out when it rains?',
        a: 'High inflow makes turbulence and foam. Foam absorbs the ultrasonic pulse and the sensor loses its echo. The fix is either radar, which is not absorbed by foam, or a stilling arrangement that gives the sensor a calm patch of surface.',
      },
      {
        q: 'How often should a wet well transducer be cleaned?',
        a: 'On a schedule set by how fast it fouls at that station, which is learned from the disagreement between the transducer and the floats. Monthly is a common starting point in a greasy well; some clean wells go a year.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/controls/instrumentation/level/radar-level',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/calculators/wet-well-cycle',
    ],
  },
  {
    path: '/controls/instrumentation/level/hydrostatic-level',
    kind: 'reference',
    title: 'Hydrostatic Level Measurement',
    summary:
      'Measuring level from the pressure of the liquid above a sensor: submersible transducers, bubblers, and base-mounted transmitters, the density assumption behind all of them, venting, installation, and what makes them drift.',
    answer:
      'A hydrostatic level instrument measures the pressure at a point below the surface and converts it to the height of liquid above that point, using the liquid density. A submersible transducer hangs in the liquid; a bubbler pushes air through a tube and measures the back pressure; a base-mounted transmitter reads through a tap in the tank. All three depend on the density being what the calibration assumed, on the reference pressure being atmospheric, and on the sensor staying where it was installed.',
    keyPoints: [
      'Level equals pressure divided by density times gravity; a change in density is read as a change in level.',
      'A gauge sensor needs a vent to atmosphere, usually a tube in the cable, and a blocked or wet vent produces a slow drift.',
      'The reading is the height above the sensor, so the sensor elevation is part of the calibration and must be recorded.',
      'Bubblers keep the electronics out of the liquid at the cost of an air supply and a tube that can plug.',
      'Fouling, cable damage, and a shifted sensor are the failures; comparison with a tape or a float is the check.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Instrumentation', 'Level', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'The principle' },
      {
        t: 'p',
        text: 'The pressure at a depth in a liquid is the weight of the column above it. For water, every foot of depth adds about 0.433 psi, or every 2.31 feet adds one psi. A sensor at the bottom of a tank measuring 4.33 psi is under ten feet of water. The instrument does that arithmetic with a density it was told at calibration, and it is right as long as the liquid is what it was told.',
      },
      {
        t: 'formula',
        expr: 'Level = Pressure / (Density x g)',
        where: [
          'Level is the height of liquid above the sensor',
          'Pressure is the gauge pressure at the sensor, referenced to atmosphere',
          'Density is the liquid density, about 62.4 lb per cubic foot for water, and g is gravity',
          'For water in US units, level in feet is pressure in psi times 2.31',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Density is an assumption',
        text: 'A sludge holding tank at a specific gravity of 1.03 reads three percent low on an instrument calibrated for water. A chemical tank at 1.3 reads a quarter low. Brine, hypochlorite, ferric chloride, and settled sludge all differ from water, and temperature moves density a little too. Calibrate for the actual liquid and record the specific gravity used.',
      },
      { t: 'h2', text: 'Three ways to do it' },
      {
        t: 'dl',
        items: [
          { term: 'Submersible transducer', def: 'A sealed pressure sensor on a cable, lowered into the liquid and held at a fixed elevation. The cable carries the signal and a vent tube. It is the default in wet wells, tanks, and wells because it is cheap, accurate, and needs no tap in the vessel. Its weaknesses are that it is in the liquid, with everything that means for fouling, and that the cable is vulnerable.' },
          { term: 'Bubbler', def: 'A tube runs to a point near the bottom, and a small compressor or a plant air supply pushes air down it at a low, regulated flow. The pressure needed to push bubbles out of the end equals the head above it, and a pressure transmitter at the top of the tube, in the dry, reads it. Nothing electrical is in the liquid, which suits corrosive, hot, or classified locations. The costs are an air supply that must not fail and a tube that can plug or freeze.' },
          { term: 'Base-mounted transmitter', def: 'A pressure transmitter on a tap at the bottom of the tank or on the inlet piping, reading the static head. Accessible for calibration without draining and no cable in the liquid. It needs a tap, it reads velocity effects if the tap is on a live line, and it needs a diaphragm seal on liquids that would plug or attack it.' },
        ],
      },
      { t: 'h2', text: 'Venting and the reference' },
      {
        t: 'p',
        text: 'A gauge pressure sensor compares the process pressure with the atmosphere, and a submersible unit reaches the atmosphere through a small tube in its cable that ends in the junction box. If the tube is pinched, blocked with dirt, or has taken on water from condensation, the reference is no longer atmospheric, and the reading drifts with the weather and the temperature. The junction box gets a vented cap with a desiccant or a breather, the cable is not tie-wrapped so tightly that the tube closes, and a slow unexplained drift is checked at the vent first.',
      },
      {
        t: 'p',
        text: 'An absolute sensor avoids the vent by measuring against a sealed vacuum, and then needs a separate barometric measurement subtracted from it, either in the transmitter or in the controller. That trades a vent tube for a second instrument.',
      },
      { t: 'h2', text: 'Installation' },
      {
        t: 'steps',
        items: [
          { title: 'Fix the sensor elevation.', text: 'The instrument reads height above itself. Hang it on a stainless cable or a rigid pipe to a known elevation, record that elevation against the tank floor on the drawing, and enter it in the scaling so the reading is referenced to the floor, not to the sensor.' },
          { title: 'Keep it still.', text: 'A transducer that swings in the inflow or is dragged by the pump reads a moving elevation. A stilling tube or a weighted bracket holds it.' },
          { title: 'Make it retrievable.', text: 'It will need cleaning. Hang it from the hatch on a cable and a clip so that it can be lifted without anyone entering the well.' },
          { title: 'Protect the cable.', text: 'Away from the pump intakes, away from the ladder, in a conduit or a tube through the wall, with strain relief at the top and a drip loop at the junction box.' },
          { title: 'Locate the tap for a base-mounted unit on a dead leg.', text: 'Static head only. A tap on the inlet or discharge piping reads flow effects as level.' },
        ],
      },
      { t: 'h2', text: 'Failures and checks' },
      {
        t: 'table',
        caption: 'What goes wrong',
        head: ['Symptom', 'Likely cause', 'Check'],
        rows: [
          ['Reads high, slowly worsening', 'Grease or solids on the diaphragm', 'Lift and clean; compare with a tape'],
          ['Slow drift with the weather', 'Vent tube blocked or wet', 'Inspect the vent and the junction box'],
          ['Sudden offset', 'Sensor moved or cable slipped', 'Check the hanging point and the elevation'],
          ['Reads low or zero', 'Cable damaged or sensor pulled out of the liquid', 'Inspect the cable; measure the loop'],
          ['Correct at one level, wrong at another', 'Density or span wrong', 'Recalibrate against a tape at two levels'],
          ['Reads high while a pump runs', 'Tap on a live line or sensor in the intake flow', 'Relocate to a dead leg or a stilling tube'],
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Wet wells and tanks are confined spaces',
        text: 'Servicing a submersible transducer from inside the well is confined space entry with atmospheric hazards. Install so that the instrument comes out through the hatch, and follow the entry procedure when it does not.',
      },
    ],
    faqs: [
      {
        q: 'How does a submersible level transducer work?',
        a: 'It measures the pressure of the liquid above it, which is proportional to depth for a known density, and outputs 4 to 20 mA over a vented cable. Level above the sensor is the pressure divided by the liquid density.',
      },
      {
        q: 'Why does my level transducer drift with the weather?',
        a: 'The vent tube in the cable is blocked or wet, so the reference side is no longer at atmospheric pressure and the reading follows the barometer and the temperature. Inspect the vent and the junction box breather.',
      },
      {
        q: 'When should I use a bubbler instead of a transducer?',
        a: 'When nothing electrical should be in the liquid: corrosive chemicals, high temperature, a classified area, or a liquid that fouls diaphragms badly. Accept the air supply and the purge tube as the maintenance items in exchange.',
      },
      {
        q: 'Does the instrument need recalibrating for a different liquid?',
        a: 'Yes, if the density differs from what it was calibrated for. A specific gravity of 1.1 reads ten percent low on a water calibration. Enter the actual specific gravity, or calibrate against a measured level in the actual liquid.',
      },
    ],
    related: [
      '/controls/instrumentation/level/wet-well-level',
      '/controls/instrumentation/level/ultrasonic-level',
      '/controls/instrumentation/level/floats',
      '/water-wastewater/water-systems/storage/tank-level-control',
      '/controls/instrumentation/pressure/pressure-transmitters',
    ],
  },
  {
    path: '/controls/instrumentation/level/ultrasonic-level',
    kind: 'reference',
    title: 'Ultrasonic Level Measurement',
    summary:
      'Non-contact level by time of flight: how the sensor works, the blanking zone and beam angle, temperature compensation, the surfaces and vapors that defeat it, mounting rules, and what to do when it loses its echo.',
    answer:
      'An ultrasonic level sensor sends a pulse of sound from above the liquid, times the echo from the surface, and converts the time to a distance using the speed of sound, which it corrects for temperature. Level is the vessel height minus that distance. Nothing touches the liquid, which is its advantage; the sound has to cross whatever is above the liquid, which is its limit. Foam absorbs it, vapor and temperature layers bend it, obstructions reflect it, and the sensor cannot see anything closer than its blanking distance.',
    keyPoints: [
      'The sensor measures distance to the surface; the level is the reference height minus the distance, so the reference height is part of the setup.',
      'The speed of sound changes with air temperature, and the sensor compensates from its own temperature sensor, which is not the temperature of the air in the vessel.',
      'Foam, heavy vapor, and a turbulent surface weaken or scatter the echo; radar tolerates all three.',
      'The blanking zone near the sensor is a dead band, and the beam widens with distance, so mounting position decides what the sensor sees.',
      'Loss of echo is a fault the controller must treat as a bad signal, not as a level.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Instrumentation', 'Level', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'How it works' },
      {
        t: 'p',
        text: 'The transducer at the top of the vessel is both speaker and microphone. It emits a short burst of sound, in the tens of kilohertz, listens for the echo from the liquid surface, and measures the round-trip time. Distance is half the time multiplied by the speed of sound, about 1,125 feet per second in air at room temperature. Level is the distance from the sensor face to the vessel floor, entered at setup, minus the measured distance.',
      },
      {
        t: 'p',
        text: 'The speed of sound in air rises with temperature, by roughly 0.2 percent per degree Celsius, and a sensor that ignored that would read a level that changed with the weather. Every ultrasonic sensor carries a temperature sensor and corrects for it. The correction is for the temperature at the sensor, and in a vessel where the air near the surface is warmer or cooler than at the top, or where sunlight heats the sensor housing, the correction is off by the difference. That is a small error on a short range and a real one on a tall tank in the sun.',
      },
      { t: 'h2', text: 'Blanking and beam' },
      {
        t: 'p',
        text: 'After emitting a pulse the transducer rings for a moment and cannot hear, so an echo from a surface too close arrives while it is deaf. That distance, the blanking or dead zone, is typically a foot or two and is stated on the datasheet. The sensor must be mounted at least that far above the highest level it needs to measure. The pulse also spreads in a cone, several degrees wide, and anything inside the cone, a ladder, an inlet pipe, a wall at an angle, returns an echo the sensor may take for the surface. Mounting position is chosen so that the cone sees liquid and nothing else all the way down.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Mount it perpendicular, away from the wall, and clear of the inflow',
        text: 'The face must be parallel to the liquid surface, or the echo bounces away. It should sit far enough from the wall that the cone does not touch it, and away from where the inflow falls, which is both turbulent and a source of false echoes from the falling stream. On a conical bottom, the cone should not see the sloped section.',
      },
      { t: 'h2', text: 'What defeats it' },
      {
        t: 'table',
        caption: 'Conditions that weaken or lose the echo',
        head: ['Condition', 'Effect', 'Remedy'],
        rows: [
          ['Foam on the surface', 'Absorbs the pulse; weak or no echo', 'Radar, or a stilling well where the foam is excluded'],
          ['Heavy vapor or mist', 'Attenuates and scatters the sound', 'Radar, or a sensor with more power and a shorter range'],
          ['Temperature stratification', 'Speed of sound varies along the path; reading offset', 'Shade the sensor; radar on tall tanks'],
          ['Turbulence or agitation', 'Scattered echo, noisy reading', 'Stilling well; filtering; radar'],
          ['Condensation on the face', 'Attenuates the pulse', 'A self-cleaning or heated face; mounting angle for drainage'],
          ['Obstructions in the cone', 'False echoes at a fixed distance', 'Relocate, or map the false echo out in the sensor configuration'],
          ['Sloped or conical surfaces', 'Echo deflected away', 'Aim at flat liquid only'],
        ],
      },
      { t: 'h2', text: 'Loss of echo' },
      {
        t: 'p',
        text: 'When the sensor gets no usable echo it declares loss of echo, and what it outputs then is configurable: hold the last value, go to a fault current, or go to a preset. Holding the last value is the dangerous choice, because the control system sees a plausible level that stopped moving. The sensor should be set to signal a fault, and the controller should validate the signal and fall back to floats, as the signal validation and wet well level pages describe. A loss of echo that happens every time it rains, in a wet well, is foam from high inflow, and it is telling you the application wants radar.',
      },
      { t: 'h2', text: 'Setup and checks' },
      {
        t: 'steps',
        items: [
          { title: 'Enter the reference distance.', text: 'The distance from the sensor face to the vessel floor, or to whatever zero level means at that site, measured with a tape. This is the number that is most often entered wrong.' },
          { title: 'Set the range and the blanking.', text: 'The maximum level the sensor must read must be at least the blanking distance below the face. If it is not, move the sensor.' },
          { title: 'Map false echoes.', text: 'With the vessel empty or low, run the sensor’s echo mapping so that it learns fixed reflections from ladders and pipes and ignores them.' },
          { title: 'Verify at two levels.', text: 'Compare the reading against a tape or a known level near the bottom and near the top. A constant offset is the reference distance; a proportional error is the speed of sound or the temperature.' },
          { title: 'Configure the fault behavior.', text: 'Loss of echo to a fault current, and the controller validating it.' },
        ],
      },
      { t: 'h2', text: 'Where it fits' },
      {
        t: 'p',
        text: 'Ultrasonic sensors are inexpensive, easy to mount, and accurate to a fraction of a percent on a clean surface in still air. Clean water tanks, chemical day tanks with a calm surface, open channels with a flume for flow measurement, and dry bulk hoppers are good applications. Wet wells with foam and grease, digesters with heavy vapor, and tall outdoor tanks in the sun are the applications where radar has replaced it, and the radar level page covers why.',
      },
    ],
    faqs: [
      {
        q: 'What is the blanking distance on an ultrasonic level sensor?',
        a: 'The zone directly in front of the sensor, usually a foot or two, in which it cannot measure because it is still ringing from its own pulse. The maximum level must stay below the face by at least that distance.',
      },
      {
        q: 'Why does my ultrasonic sensor read wrong on hot days?',
        a: 'The speed of sound rises with temperature and the sensor compensates from its own temperature, which in the sun is not the temperature of the air in the vessel. Shade the sensor, or use radar, which does not depend on the speed of sound in air.',
      },
      {
        q: 'Ultrasonic or radar for a wet well?',
        a: 'Radar. Foam, turbulence, and vapor in a wet well are the three things ultrasonic handles worst. Ultrasonic remains a good choice for clean, calm liquids and for open-channel flow with a flume.',
      },
      {
        q: 'What should the sensor output on loss of echo?',
        a: 'A fault current that the controller recognizes as a bad signal, so that control falls back to floats or a defined safe action. Never a held last value, which looks like a level that stopped changing.',
      },
    ],
    related: [
      '/controls/instrumentation/level/radar-level',
      '/controls/instrumentation/level/wet-well-level',
      '/controls/instrumentation/level/hydrostatic-level',
      '/controls/instrumentation/flow/open-channel-flow',
      '/controls/plc-systems/analog-control/signal-validation',
    ],
  },
  {
    path: '/controls/instrumentation/level/floats',
    kind: 'reference',
    title: 'Float Switches',
    summary:
      'The oldest level instrument and still the one that saves a station: how tilt and stem floats work, the wiring conventions, mounting and spacing in a wet well, classified-area ratings, and how to use them alongside a continuous instrument.',
    answer:
      'A float switch is a contact that changes state when a float rises or falls past a fixed level. It needs no calibration, no scaling, and no electronics, and it fails separately from every continuous instrument in the well, which is why the high level alarm float is wired around the controller to the alarm and the pumps. Its enemies are rags and cables that hang it up, and its rules are simple: mount it where it cannot tangle, wire it fail-safe, rate it for the area, and test it by lifting it.',
    keyPoints: [
      'A float switch is a mechanical contact at a fixed level; it does not drift, but it can hang up.',
      'Wire critical floats normally closed so a broken wire reads as the alarm condition.',
      'The high level float goes directly to the alarm and to the pump start relays, independent of the controller.',
      'Mount floats on a stainless bracket, spaced and weighted, away from cables and the inflow.',
      'Wastewater wet wells are usually classified locations, and the float and its circuit must be rated for it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Instrumentation', 'Level', 'Lift Stations', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'Two kinds' },
      {
        t: 'dl',
        items: [
          { term: 'Tilt float', def: 'A sealed float on a cable with a switch inside that closes when the float tilts past horizontal. Hung on its cable from a bracket, weighted so that it pivots at a set level, it is the standard wet well float. The switching level is set by where the cable is clamped; the differential, the distance between switching up and switching down, is set by the free cable length below the clamp.' },
          { term: 'Stem or vertical float', def: 'A float that slides on a vertical rod and operates a switch at the top, or a magnet passing a reed switch in the stem. Compact and precise, used in day tanks, sumps, and vessels where there is no room to swing a tilt float, and vulnerable to solids that jam the float on the stem.' },
        ],
      },
      { t: 'h2', text: 'Contacts and wiring' },
      {
        t: 'p',
        text: 'A float has a contact that is either closed or open with the float down, and the choice of which decides what a broken wire means. A high level alarm float wired normally closed, opening when the level rises, produces the alarm when the float lifts and also when the cable breaks, the terminal loosens, or the fuse blows. Wired normally open, a broken wire silences the alarm forever. Critical floats are wired so that failure of the circuit produces the safe indication, and the program is written to read them that way. The convention is written on the drawing so that the next person does not reverse it.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'The high level float does not go through the controller',
        text: 'Wire it to the alarm dialer or telemetry and to the pump starter control circuit directly, through its own relay, so that a faulted processor, a failed input card, or a program error still produces an alarm and running pumps. It may also feed a controller input for indication, and that input is never the only path.',
      },
      { t: 'h2', text: 'Mounting' },
      {
        t: 'steps',
        items: [
          { title: 'Use a bracket.', text: 'A stainless steel bracket at the hatch, with the float cables clamped to it at the elevations the levels require, so that a float can be adjusted or replaced without entering the well.' },
          { title: 'Space them.', text: 'Floats swing. Two floats close enough to touch will tangle, and one held up by another reads a level that is not there. Stagger them and give each its arc.' },
          { title: 'Keep them clear.', text: 'Away from the pump cables, the discharge pipes, the ladder, and the inflow. A float that lands on a pipe as the level falls stays there.' },
          { title: 'Weight the cable.', text: 'A cable weight a set distance above the float sets the pivot point and keeps the float from being pushed around by the flow.' },
          { title: 'Route the cable.', text: 'Through the hatch to a junction box, with strain relief, and with a seal-off where the area classification requires one.' },
        ],
      },
      { t: 'h2', text: 'Classified areas' },
      {
        t: 'p',
        text: 'A wastewater wet well is a space where sewer gas collects, and under NFPA 820, the standard for fire protection in wastewater facilities, the wet well and the spaces around it are usually classified locations under NEC Article 500. That decides the float: an intrinsically safe float on an intrinsically safe barrier in the panel, or a float and a circuit rated for the division, and the conduit sealed at the boundary. A general-purpose float from a hardware store in a Class I, Division 1 wet well is a code violation and a hazard. Read the classification for the site before selecting anything that goes in the well.',
      },
      { t: 'h2', text: 'Using floats with a continuous instrument' },
      {
        t: 'table',
        caption: 'The floats in a wet well with a transducer',
        head: ['Float', 'Level', 'Function'],
        rows: [
          ['High level alarm', 'Above lag start', 'Alarm and force both pumps to run, independent of the controller'],
          ['Lag start backup', 'At or just above lag start', 'Starts the second pump when the controller or the transducer has failed'],
          ['Lead start backup', 'At or just above lead start', 'Starts the first pump on floats alone when the continuous level is bad'],
          ['Stop backup', 'At the stop level', 'Stops pumps on floats alone'],
          ['Low level cutoff', 'Below stop', 'Stops the pumps before they run dry when the transducer has failed high'],
        ],
      },
      {
        t: 'p',
        text: 'The controller uses the floats two ways: as the backup control when it has declared the continuous level bad, and as a check on the continuous level while it is good. A transducer reading below the lead start level while the lead start float is up is a disagreement, and it is alarmed. The wet well level page covers the arrangement in full.',
      },
      { t: 'h2', text: 'Testing' },
      {
        t: 'p',
        text: 'A float is tested by lifting it. Raise each float by its cable from the hatch, in order, and confirm the indication at the panel and the action it causes: the lead pump starts, the lag pump starts, the alarm dials out. Lower them and confirm the stop. Do it on a schedule and after any work in the well, and record the result. A float that has not been lifted in a year is a float whose state is unknown.',
      },
    ],
    faqs: [
      {
        q: 'Why use floats if there is a level transducer?',
        a: 'Because the transducer, the input card, and the controller can all fail, and floats fail differently. The high level float wired directly to the alarm and the pumps is what keeps the station from overflowing when everything else has stopped.',
      },
      {
        q: 'Should a float be wired normally open or normally closed?',
        a: 'For anything critical, so that a broken wire produces the safe indication. A high level alarm float is normally closed and opens on high level, so an open circuit alarms. Write the convention on the drawing and read the input accordingly in the program.',
      },
      {
        q: 'How far apart should wet well floats be?',
        a: 'Far enough that their swinging arcs do not overlap, staggered on the bracket so they do not hang in a line, and weighted so the flow does not push them together. A tangled pair reads levels that do not exist.',
      },
      {
        q: 'Do wet well floats need to be intrinsically safe?',
        a: 'Usually. NFPA 820 classifies most wastewater wet wells as hazardous locations, and the float and its circuit must be rated for the classification, typically through an intrinsically safe barrier in the panel. Check the classification for the specific site.',
      },
    ],
    related: [
      '/controls/instrumentation/level/wet-well-level',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/controls/instrumentation/level/hydrostatic-level',
      '/controls/plc-systems/plc-fundamentals/io-systems',
      '/controls/control-panels/panel-design/ul-698a',
    ],
  },
  {
    path: '/controls/instrumentation/pressure/pressure-transmitters',
    kind: 'reference',
    title: 'Pressure Transmitters',
    summary:
      'Gauge, absolute, and differential pressure transmitters: how they sense, how range, turndown, and accuracy specifications work, the process connection and its accessories, and the installation errors that show up as calibration problems.',
    answer:
      'A pressure transmitter senses pressure on a diaphragm, converts the deflection to an electrical signal, and outputs 4 to 20 mA scaled to its calibrated range. Gauge transmitters measure against atmosphere, absolute against vacuum, and differential between two connections. Selecting one means matching the reference, the range with margin for overpressure, the accuracy the loop needs, and the wetted materials to the fluid. Installing one means a connection that carries pressure without carrying pulsation, solids, or a column of liquid the calibration did not expect.',
    keyPoints: [
      'Gauge, absolute, or differential: the reference decides the instrument, and using the wrong one is an offset that no calibration removes.',
      'Range with turndown lets one transmitter be calibrated across a wide span, but accuracy specifications are usually a percent of span, and a narrow span on a wide-range unit is less accurate than it looks.',
      'Overpressure and burst ratings are separate from range; a water hammer that exceeds them ends the transmitter.',
      'A snubber tames pulsation, an isolation valve permits calibration, and a diaphragm seal keeps the process out of the sensor.',
      'A column of liquid between the tap and the transmitter is a pressure the transmitter reads; zero it out or account for it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Instrumentation', 'Water', 'Pumps', 'Signals'],
    blocks: [
      { t: 'h2', text: 'Three references' },
      {
        t: 'dl',
        items: [
          { term: 'Gauge', def: 'Measures relative to the atmosphere, through a vent in the housing. Reads zero with the process open to air. The right instrument for discharge pressure, system pressure, and most pump work.' },
          { term: 'Absolute', def: 'Measures relative to a sealed vacuum. Reads atmospheric pressure, about 14.7 psi at sea level, with the process open to air. Used for vacuum service, for barometric compensation, and where atmospheric changes would matter.' },
          { term: 'Differential', def: 'Measures the difference between a high side and a low side connection. Used for flow across an orifice or a venturi, for level in a closed tank, for filter loading, and for any measurement where the difference matters and the absolute value does not. It has a static pressure rating, the pressure both sides can carry together, which is separate from its differential range.' },
        ],
      },
      { t: 'h2', text: 'Sensing' },
      {
        t: 'p',
        text: 'The process pressure deflects an isolating diaphragm, the deflection is transferred through a fill fluid to a sensing element, and the element, piezoresistive or capacitance on most current designs, produces a signal the electronics linearize, compensate for temperature, and convert to 4 to 20 mA, usually with HART on the loop. The fill fluid matters in two places: it must not react with the process if the diaphragm fails, and its expansion with temperature is part of the temperature error on a diaphragm seal with a long capillary.',
      },
      { t: 'h2', text: 'Range, span, and turndown' },
      {
        t: 'p',
        text: 'A transmitter has an upper range limit, the most it can measure, and a calibrated span, the part of that range mapped onto 4 to 20 mA. Turndown is the ratio of the two: a 300 psi transmitter calibrated for 0 to 30 psi has a turndown of ten. Modern transmitters offer turndowns of a hundred or more, which lets one stocked unit serve many applications. The catch is in the accuracy specification.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Read whether accuracy is a percent of span or of the upper range limit',
        text: 'An accuracy of 0.1 percent of span on a 0 to 30 psi calibration is 0.03 psi. An accuracy of 0.1 percent of the upper range limit on the same unit is 0.3 psi, ten times worse, and it stays that size however narrow the span is turned down. Some datasheets state accuracy as a percent of span up to a turndown limit and degrade beyond it. Match the transmitter range to the application so that the turndown stays modest, and read the datasheet formula, not the headline number.',
      },
      { t: 'h2', text: 'Overpressure' },
      {
        t: 'p',
        text: 'Separate from the range are the overpressure limit, the pressure the transmitter can see without permanent damage, and the burst pressure, beyond which the housing fails. Water hammer from a valve slamming, a pump starting against a closed check, or a surge on a long force main produces short spikes well above operating pressure. A transmitter at the discharge of a pump station sees them regularly. Select the range so that the overpressure limit covers the spike, or fit a snubber to spread it, or both.',
      },
      { t: 'h2', text: 'The process connection' },
      {
        t: 'dl',
        items: [
          { term: 'Isolation valve', def: 'Between the tap and the transmitter, so that the transmitter can be removed or calibrated with the process live. A manifold with isolation, equalizing, and vent valves does the same for a differential unit.' },
          { term: 'Snubber', def: 'A restriction in the connection that damps pulsation from a positive displacement pump or a surge. It slows the response, which is the point, and it can plug.' },
          { term: 'Diaphragm seal', def: 'A second diaphragm at the process with a capillary to the transmitter, for fluids that would plug, corrode, or freeze in the connection: sludge, slurries, chemicals, hot fluids. Adds temperature error from the capillary fill and must be specified as a matched assembly.' },
          { term: 'Bleed or drain', def: 'To purge air from a liquid connection or condensate from a gas one before zeroing. A connection with trapped air reads wrong and reads differently as the air compresses.' },
          { term: 'Pressure gauge', def: 'A local gauge on the same connection gives a technician a reference without a calibrator, and shows the process pressure when the loop is dead.' },
        ],
      },
      { t: 'h2', text: 'Installation errors that look like calibration errors' },
      {
        t: 'ul',
        items: [
          'Elevation. A transmitter mounted below its tap on a liquid line reads the column of liquid in the connection as extra pressure, about 0.433 psi per foot of water. Mount at the tap elevation or zero the offset out after filling, and record that it was done.',
          'Trapped air in a liquid connection, or trapped liquid in a gas connection. Bleed before zeroing.',
          'A tap in turbulent flow, at an elbow, or in the pump discharge before the check valve. Reads a pressure that includes velocity effects and pulsation.',
          'A blocked snubber or a plugged connection. The transmitter reads a pressure that no longer follows the process, often plausibly.',
          'Temperature. The transmitter and its fill are rated for a range; a unit on a hot line or in direct sun outside it drifts.',
          'Vibration. A transmitter mounted on a vibrating pump reads noise and eventually fails. Mount on a bracket off the pump with a flexible connection.',
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Isolate and vent before opening a connection',
        text: 'A pressure connection holds the process pressure until it is isolated and vented, and a plugged connection can hold it after the isolation valve is closed. Vent through the bleed, confirm zero on the gauge, and treat a connection that will not vent as still pressurized.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between gauge and absolute pressure?',
        a: 'Gauge pressure is measured relative to the atmosphere and reads zero open to air. Absolute is measured relative to vacuum and reads about 14.7 psi open to air at sea level. Most pump and system measurements are gauge; vacuum and barometric work is absolute.',
      },
      {
        q: 'What does turndown mean on a pressure transmitter?',
        a: 'The ratio of the transmitter’s maximum range to the span it is calibrated for. A 300 psi unit calibrated for 30 psi has a turndown of ten. High turndown is convenient for stocking, and accuracy can degrade as it increases, depending on how the datasheet states accuracy.',
      },
      {
        q: 'Why does my pressure transmitter read a few psi with the line drained?',
        a: 'Usually the liquid column in the connection between the tap and the transmitter, if the transmitter is mounted below the tap, or trapped liquid. Bleed the connection and zero the transmitter with the connection at the condition it will run in.',
      },
      {
        q: 'Do I need a snubber?',
        a: 'On a connection that sees pulsation from a reciprocating pump or surges from valves and pump starts, yes. It protects the sensor from spikes and steadies the reading, at the cost of some response speed and a restriction that can plug.',
      },
    ],
    related: [
      '/controls/instrumentation/pressure/differential-pressure',
      '/controls/instrumentation/pressure/impulse-lines',
      '/controls/instrumentation/pressure/pressure-calibration',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/controls/instrumentation/signals/4-20-ma-signals',
    ],
  },
];
