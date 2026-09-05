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
  {
    path: '/controls/instrumentation/signals/hart',
    kind: 'reference',
    title: 'HART',
    summary:
      'Digital data riding on the 4-20 mA loop: how HART signaling works, what a handheld or a HART-enabled input can read, multidrop and burst modes, and the wiring conditions that make HART fail while the current loop keeps working.',
    answer:
      'HART, the Highway Addressable Remote Transducer protocol, superimposes a small frequency-shift-keyed digital signal on a standard 4-20 mA loop, using 1200 Hz and 2200 Hz tones that average to zero so the analog value is undisturbed. It lets a handheld communicator or a HART-capable input card read the device identity, secondary variables, diagnostics, and configuration while the loop keeps carrying the primary variable as current.',
    keyPoints: [
      'The analog 4-20 mA signal is unchanged; HART adds a small audio-frequency signal on top of it.',
      'A loop needs roughly 250 ohms of resistance for HART to work. Most input cards provide it; a bare milliammeter does not.',
      'HART gives identity, secondary variables, diagnostics, and configuration through a handheld or a HART-capable input card.',
      'Multidrop puts several devices on one pair at a fixed 4 mA each, trading the analog signal for the digital.',
      'Capacitance, filtering, and some isolators pass 4-20 mA and block HART.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Instrumentation', 'Signals', '4-20 mA', 'Communications'],
    blocks: [
      { t: 'h2', text: 'What HART is' },
      {
        t: 'p',
        text: 'HART is a digital protocol designed in the 1980s to run over the wiring that already existed for 4-20 mA instruments. It uses frequency-shift keying based on the Bell 202 modem standard: a 1200 Hz tone represents a 1 and a 2200 Hz tone a 0, superimposed on the loop current at an amplitude of about half a milliamp. The tones average to zero over any interval an analog input cares about, so the primary variable in the current is not disturbed. The data rate is 1200 bits per second, which sounds slow and is entirely adequate for what HART carries.',
      },
      {
        t: 'p',
        text: 'What it carries is everything about the device that the current cannot: the tag name, manufacturer, model, and serial number; the primary variable as a number with units, which is the same value the current represents; secondary, tertiary, and quaternary variables such as sensor temperature or a second measurement; device status and diagnostics; and read and write access to the configuration, including range, damping, units, and calibration trims.',
      },
      { t: 'h2', text: 'How it is used' },
      {
        t: 'dl',
        items: [
          { term: 'Handheld communicator', def: 'A field communicator clipped across the loop at any point, in the field or at the panel, to configure, range, trim, and diagnose the transmitter. This is the most common use, and for many plants the only one.' },
          { term: 'HART-capable analog input', def: 'An input card or a HART multiplexer that reads the digital data continuously while measuring the current. The controller then has the secondary variables and the device status as tags, and an asset management package can read the configuration of every device from the control room.' },
          { term: 'Loop-powered indicators and isolators', def: 'Devices in the loop that display the HART primary variable in engineering units without needing their own calibration, or that repeat the current and pass the HART signal through.' },
          { term: 'Multidrop', def: 'Several devices on one pair, fifteen in older revisions and more under HART 7, each at a fixed 4 mA and addressed digitally. The analog signal is given up, so multidrop is for slow measurements where update rate does not matter. Rare in water and wastewater.' },
          { term: 'Burst mode', def: 'A device configured to transmit its variables continuously without being polled, which speeds up reading by a host that supports it.' },
        ],
      },
      { t: 'h2', text: 'The wiring conditions' },
      {
        t: 'p',
        text: 'HART is a voltage signal developed across the loop resistance by the modulated current. It needs that resistance to exist, and it needs the path to pass audio frequencies.',
      },
      {
        t: 'table',
        head: ['Condition', 'Requirement', 'What goes wrong'],
        rows: [
          ['Loop resistance', 'At least about 250 ohms total (the specification minimum is 230), and no more than about 1100 ohms', 'Below the minimum the HART voltage is too small to be detected. Most input cards have a 250 ohm sense resistor and satisfy this; a transmitter on a bench with only a power supply and a milliammeter does not.'],
          ['Power supply', 'Enough voltage for the transmitter after the loop drop, and a supply that does not filter out the tones', 'A supply with heavy output capacitance can shunt the HART signal. Size the supply for the transmitter lift-off voltage plus the drop across the loop resistance at 22 mA.'],
          ['Cable', 'Twisted shielded pair, with the shield grounded at one end', 'Long unshielded runs pick up noise at audio frequencies; capacitance on very long runs attenuates the signal.'],
          ['Filtering and isolation', 'Any isolator, barrier, surge device, or filter in the loop must be HART-compatible', 'Devices designed only to pass DC will pass the current and remove the HART signal. The loop reads correctly and the handheld cannot connect.'],
          ['Analog input filtering', 'Input filtering on the card must not respond to the tones', 'Usually fine; some old cards show a slight flicker when HART is active.'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The 250 ohm resistor',
        text: 'When a handheld will not connect on the bench, the loop almost always has no resistance in it. Put a 250 ohm resistor in series and clip the communicator across the resistor. In a panel, clip across the input terminals of the analog card, where the sense resistor already provides it.',
      },
      { t: 'h2', text: 'What HART changes about maintenance' },
      {
        t: 'p',
        text: 'Before HART, ranging a transmitter meant potentiometers and a calibrator. With HART, range, damping, and units are set from the communicator, and a sensor trim corrects the measurement against a reference. That convenience has a hazard: a HART change is invisible to the control system unless the input card reads HART. A transmitter re-ranged in the field without the controller scaling being changed reads wrong in a way that looks plausible, and the loop check that would catch it is skipped because the change was small.',
      },
      {
        t: 'p',
        text: 'HART diagnostics are the other change. A transmitter that knows its sensor is failing, its electronics temperature is too high, or its configuration was changed can say so. If the input card reads HART, that status is a tag the controller can alarm on. If it does not, the information is available to whoever next connects a handheld, which may be years.',
      },
      { t: 'h2', text: 'HART and the controller' },
      {
        t: 'p',
        text: 'A HART-capable input card exposes more than the primary variable. Typical uses at a water plant are a second measurement from one device, such as sensor temperature from a pH loop or static pressure from a differential pressure flow transmitter; device status for alarming a failing instrument before it fails; and identification so that the asset database can be built from what is actually installed. Read HART variables at a slow rate, on the order of once a second per device, because the protocol is slow and polling many devices on a multiplexer takes time. The control loop runs on the current, not on the HART value.',
      },
    ],
    faqs: [
      {
        q: 'Does HART affect the accuracy of the 4-20 mA signal?',
        a: 'No, when the input is designed for it. The tones average to zero over a few milliseconds and the input filtering removes them. On an old or very fast input, a small flicker of a few counts can appear while HART is communicating; it disappears when the handheld is disconnected.',
      },
      {
        q: 'Can I use HART on a loop with a safety barrier?',
        a: 'If the barrier is rated for HART. Many are; some passive barriers with capacitive filtering attenuate the signal. Check the barrier data sheet for HART compatibility and the loop resistance including the barrier.',
      },
      {
        q: 'What is the difference between HART revisions?',
        a: 'HART 5 and 6 are the installed base; HART 7 added extended addressing, more device variables, and time stamping, and is what current devices support. Handhelds and hosts are backward compatible. WirelessHART carries the same commands over a mesh radio network and is a different physical layer entirely.',
      },
      {
        q: 'Is HART a replacement for a fieldbus?',
        a: 'It fills the same need at lower complexity: identity, diagnostics, and configuration over existing wiring. It does not replace the analog signal for control, and it does not provide the multi-variable speed of a true digital fieldbus. For a utility, HART on 4-20 mA is usually the right amount of digital.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/controls/plc-systems/analog-control/4-20-ma',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/controls/instrumentation/pressure/pressure-transmitters',
      '/controls/instrumentation/signals/ground-loops',
    ],
  },
  {
    path: '/controls/instrumentation/flow/differential-pressure-flow',
    kind: 'reference',
    title: 'Differential Pressure Flow Measurement',
    summary:
      'Orifice plates, venturis, and flow nozzles: the square-root relationship, why turndown is limited, where the square root is taken, impulse line rules, and when a DP element is still the right choice against a mag meter.',
    answer:
      'Differential pressure flow measurement places a restriction such as an orifice plate or a venturi in the pipe and measures the pressure drop across it. Flow is proportional to the square root of that differential, so the transmitter or the controller must take the square root, and the useful turndown is limited to about 4:1 or 5:1 before the low-end signal disappears into noise. It is robust, well understood, and inexpensive in large sizes, but the mag meter has replaced it for most conductive liquids.',
    keyPoints: [
      'Flow varies with the square root of differential pressure. Half the flow is a quarter of the DP.',
      'Turndown is about 4:1 for an orifice, better for a venturi with a good transmitter. Beyond that, the reading is noise.',
      'Take the square root once, in the transmitter or the controller, never in both.',
      'Impulse lines cause more DP flow problems than the element or the transmitter.',
      'Still the right choice for steam, gas, large pipes, and non-conductive liquids. A mag meter wins on most water.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Instrumentation', 'Flow', 'Analog', 'Fundamentals'],
    blocks: [
      { t: 'h2', text: 'How it works' },
      {
        t: 'p',
        text: 'Put a restriction in a pipe and the fluid speeds up to get through it. Speeding up costs pressure, so the pressure just downstream of the restriction is lower than just upstream. Bernoulli relates the two: the pressure difference is proportional to the square of the velocity, which means velocity, and therefore volumetric flow, is proportional to the square root of the differential pressure.',
      },
      {
        t: 'formula',
        expr: 'Q = K × √(ΔP / ρ)',
        where: [
          'Q = volumetric flow',
          'K = a constant for the element, pipe size, and units, from the flow calculation or the element data sheet',
          'ΔP = differential pressure across the element',
          'ρ = fluid density',
        ],
      },
      {
        t: 'p',
        text: 'The square root is the defining feature of the method and the source of most of its limits. At 100 percent flow the differential is 100 percent of range. At 50 percent flow it is 25 percent of range. At 25 percent flow it is about 6 percent, and at 10 percent flow it is 1 percent of range, which is inside the noise and drift of the transmitter. That is why DP flow turndown is quoted around 4:1 for an orifice plate: below a quarter of full-scale flow the measurement is unreliable.',
      },
      { t: 'h2', text: 'The primary elements' },
      {
        t: 'table',
        head: ['Element', 'Permanent pressure loss', 'Straight run needed', 'Where it is used'],
        rows: [
          ['Orifice plate', 'High, roughly 50 to 90 percent of the differential depending on the bore ratio', 'Long: 10 to 40 diameters upstream depending on the fitting, about 5 downstream', 'Steam, gas, clean liquids, anywhere cost and replaceability matter more than pumping energy'],
          ['Venturi', 'Low, roughly 10 to 20 percent of the differential', 'Shorter than an orifice', 'Large water lines, raw water and effluent, where pumping cost matters and the meter stays for decades'],
          ['Flow nozzle', 'Between the two', 'Similar to an orifice', 'High velocity steam and gas; erosive service where a plate would wear'],
          ['Averaging pitot tube', 'Very low', 'Similar to an orifice', 'Large ducts and pipes where an insertion element is the only practical option; low differentials'],
          ['Wedge and cone', 'Moderate', 'Short', 'Dirty liquids, slurries, and installations without straight run'],
        ],
      },
      { t: 'h2', text: 'The transmitter and the square root' },
      {
        t: 'p',
        text: 'The DP transmitter measures the differential, typically in inches of water column, and outputs 4-20 mA. The square root has to be taken somewhere. Transmitters can output a signal already proportional to flow, and controllers can take the square root of a linear DP signal. Do one or the other. A signal square-rooted twice reads right at zero and full scale and wrong everywhere between, and the error is subtle enough to survive commissioning.',
      },
      {
        t: 'p',
        text: 'Whichever device takes the square root, a low-flow cutoff is set below it. Near zero differential the square root function amplifies noise enormously: 0.1 percent of DP range is 3 percent of flow range. The cutoff forces flow to zero below a small differential, typically around 1 percent of DP range, and the totalizer stops counting noise.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Range the transmitter for the differential, not the flow',
        text: 'The DP range comes from the element sizing calculation: the differential at the design maximum flow. A transmitter ranged wider than that loses turndown; ranged narrower it clips. When a transmitter is replaced, the range is copied from the sizing sheet, not guessed from the old nameplate.',
      },
      { t: 'h2', text: 'Impulse lines' },
      {
        t: 'p',
        text: 'The two pressure taps connect to the transmitter through impulse lines, and those lines are where most DP flow measurements fail. The rules are few and they matter.',
      },
      {
        t: 'ul',
        items: [
          'Both lines must be full of the same fluid at the same temperature, so that their static heads cancel. A bubble in one line on liquid service, or condensate in one line on gas service, is a differential that has nothing to do with flow.',
          'On liquid service, taps on the side of the pipe or below the centerline, with lines sloping continuously down to the transmitter, so gas rises back to the pipe. On gas service, taps on top, lines sloping up, so liquid drains back.',
          'Lines are short, of equal length, and routed together. A line in the sun and one in the shade have different densities.',
          'A three-valve or five-valve manifold at the transmitter, so it can be zeroed with the equalizing valve open and both lines blocked, and vented or drained.',
          'On dirty water and wastewater, diaphragm seals or purged lines replace open impulse lines, or the element is chosen so that no impulse lines are needed.',
        ],
      },
      { t: 'h2', text: 'Installation and straight run' },
      {
        t: 'p',
        text: 'The element assumes a fully developed, symmetrical velocity profile. Elbows, valves, and pumps upstream distort it, and the distortion changes the differential for a given flow. The standards give required straight pipe lengths for each upstream fitting: for an orifice plate the requirement can reach 40 pipe diameters after a partially open valve and is rarely less than 10. Flow conditioners shorten the requirement. When the straight run is not available, the meter reads wrong by an amount that cannot be calibrated out because it depends on flow.',
      },
      { t: 'h2', text: 'Against the mag meter' },
      {
        t: 'p',
        text: 'For a conductive liquid, which includes all water and wastewater, the electromagnetic flowmeter has no pressure loss, no moving parts, full-bore turndown of 20:1 or more, a linear output, and no impulse lines. It has replaced the orifice plate for nearly all utility water flow. The DP element remains the right choice where the mag meter does not work: steam, gases, hydrocarbons, and non-conductive liquids. It also remains on large existing venturis, which are accurate, need no power, and last longer than the transmitters bolted to them.',
      },
    ],
    faqs: [
      {
        q: 'Why does my DP flowmeter read flow when the pump is off?',
        a: 'The impulse lines are not balanced: a bubble, a difference in temperature, or a line that has partially drained gives a standing differential. Open the equalizing valve and check the zero. If the zero is right with the manifold equalized and wrong when it is in service, the lines are the problem.',
      },
      {
        q: 'Can I extend the turndown with two transmitters?',
        a: 'Yes. A high-range and a low-range transmitter on the same taps, with the controller switching between them, gives 10:1 or better. Smart transmitters with very good low-end performance achieve some of this alone; a venturi with a modern transmitter can do 8:1 or 10:1.',
      },
      {
        q: 'The plate was replaced and the flow reads differently. Why?',
        a: 'The bore diameter, the plate thickness, the edge sharpness, and the orientation all matter. A plate installed backwards, with the bevel upstream, reads low by several percent. A plate with a rounded edge from erosion or a different bore from the sizing sheet changes the coefficient. Compare the new plate to the sizing sheet, not to the old plate.',
      },
      {
        q: 'Do I need to measure temperature and pressure too?',
        a: 'For liquids at steady temperature, no. For gases and steam, density changes with pressure and temperature, and the flow calculation must be compensated with both measurements, either in a multivariable transmitter or in the controller.',
      },
    ],
    related: [
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/controls/instrumentation/pressure/pressure-transmitters',
      '/controls/plc-systems/analog-control/scaling',
      '/controls/plc-systems/analog-control/filtering',
      '/controls/instrumentation/signals/4-20-ma-signals',
    ],
  },
  {
    path: '/controls/instrumentation/flow/open-channel-flow',
    kind: 'reference',
    title: 'Open Channel Flow Measurement',
    summary:
      'Flumes and weirs with a level sensor: how the head-discharge relationship works, Parshall flume and weir equations, where to put the sensor, submergence, and the errors that make a permit-reporting flow meter wrong.',
    answer:
      'Open channel flow is measured by placing a primary device, a flume or a weir, in the channel and measuring the liquid level upstream of it. The primary device has a known head-discharge relationship, so the level, called the head, converts to flow by an equation or a table. The level is measured by an ultrasonic, radar, or submerged pressure sensor at a specific point defined by the device, and the conversion is done in the flow meter or the controller.',
    keyPoints: [
      'Flow comes from level. The primary device makes the relationship known; the sensor measures the head.',
      'The head must be measured at the point the device defines, not wherever is convenient.',
      'A Parshall flume passes solids and tolerates some submergence; a weir is more accurate and traps solids.',
      'Submergence, approach turbulence, and a wrong zero are the three common errors.',
      'For a permit flow, calibrate the head measurement against a physical gauge and keep the records.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Instrumentation', 'Flow', 'Level', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'The principle' },
      {
        t: 'p',
        text: 'In a closed pipe, flow is velocity times area, and the area is known. In an open channel the depth changes with the flow, so both are unknown. The solution is a primary device: a structure of known shape placed in the channel that forces the flow through a control section where depth and flow have a fixed, calculable relationship. Measure the depth upstream of that section, called the head, and the relationship gives the flow.',
      },
      {
        t: 'p',
        text: 'Everything about open channel measurement follows from that. The primary device must be built to the standard dimensions so that the published relationship applies. The head must be measured where the standard says. The channel must deliver water to the device the way the standard assumes. When those three are true the measurement is good to a few percent, which is why flumes and weirs are the accepted method for permit flow at treatment plants.',
      },
      { t: 'h2', text: 'Flumes' },
      {
        t: 'p',
        text: 'A flume is a narrowing of the channel with a drop in the floor that accelerates the flow to critical depth. The Parshall flume is the standard in North American water and wastewater, available in throat widths from one inch to fifty feet, with published equations for each size.',
      },
      {
        t: 'formula',
        expr: 'Q = C × Hₐⁿ',
        where: [
          'Q = flow, in cubic feet per second',
          'Hₐ = head measured at the specified point in the converging section, in feet',
          'C and n = constants for the throat width. For a 6 inch Parshall flume, Q = 2.06 × Hₐ^1.58. For throat widths of 1 to 8 feet, Q = 4 × W × Hₐ^(1.522 × W^0.026) with W in feet',
        ],
      },
      {
        t: 'p',
        text: 'The head is measured at a point two-thirds of the converging section length upstream from the throat, on the sidewall, where the standard puts the staff gauge. A sensor over the throat or over the approach channel reads a different level and a wrong flow. On a prefabricated flume the measuring point is marked; on a cast-in-place flume it is in the drawings, and it is worth checking against the standard dimensions.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Free flow', def: 'Downstream water is low enough that it does not affect the head. The single upstream measurement is valid. Parshall flumes stay in free flow up to a submergence ratio, downstream depth over upstream head, of about 50 to 60 percent for the small sizes and 70 to 80 percent for larger ones.' },
          { term: 'Submerged flow', def: 'Downstream backs up into the throat. The single measurement reads high. A correction requires a second level measurement in the throat, which is possible but rarely done well. Keep the flume in free flow by design.' },
          { term: 'Palmer-Bowlus and other flumes', def: 'Flumes designed to sit in a round pipe or a manhole, with a flat throat, used where a Parshall would not fit. Lower accuracy, easier installation, and their own equations.' },
        ],
      },
      { t: 'h2', text: 'Weirs' },
      {
        t: 'p',
        text: 'A weir is a plate across the channel with a notch of known shape. Water pools behind it and spills over the notch, and the head above the notch bottom gives the flow. Weirs are more accurate than flumes when installed correctly and are simpler to build, but they trap solids and grease behind the plate, need a larger drop in the channel, and must have air under the falling water.',
      },
      {
        t: 'table',
        head: ['Weir', 'Equation (Q in cfs, H and L in feet)', 'Notes'],
        rows: [
          ['V-notch, 90°', 'Q = 2.49 × H^2.48', 'Best at low flows; the standard for small streams and plant effluent under a few cfs'],
          ['Rectangular, contracted', 'Q = 3.33 × (L − 0.2H) × H^1.5', 'L is the notch width; the contraction term accounts for the sides'],
          ['Rectangular, suppressed', 'Q = 3.33 × L × H^1.5', 'The notch spans the full channel width; the nappe must be ventilated'],
          ['Cipolletti, trapezoidal', 'Q = 3.367 × L × H^1.5', 'Sides slope 1 horizontal to 4 vertical to offset the contraction'],
        ],
      },
      {
        t: 'p',
        text: 'The head on a weir is measured upstream at a distance of at least four times the maximum head, where the water surface is level, not at the plate where the surface is already dropping toward the crest. The zero is the elevation of the notch bottom or crest, and it is set by measurement, not by assumption.',
      },
      { t: 'h2', text: 'Measuring the head' },
      {
        t: 'dl',
        items: [
          { term: 'Ultrasonic', def: 'The traditional choice: a transducer above the channel measuring the distance to the surface. Affected by temperature gradients, foam, and turbulence; needs its dead band above the highest water level; a sunshade helps.' },
          { term: 'Radar', def: 'The same geometry, less affected by temperature and vapor, and now the default for new installations.' },
          { term: 'Submerged pressure', def: 'A transducer in a stilling well or on the channel floor. Simple and unaffected by the air above, but it fouls and needs regular cleaning in wastewater.' },
          { term: 'Bubbler', def: 'A tube to the channel floor with a small air flow; the back pressure equals the head. Nothing electrical in the water, tolerant of grease and solids, and common at older plants.' },
          { term: 'Float in a stilling well', def: 'The reference method for calibration and the mechanism in older chart recorders. A stilling well connected to the channel at the measuring point damps waves.' },
        ],
      },
      {
        t: 'p',
        text: 'Whatever the sensor, the zero is the elevation of the flume floor at the measuring point or the weir crest, and the sensor is set to read zero head at that elevation. Check it against a staff gauge or a tape at commissioning and on a schedule. Every inch of zero error on a small flume is a flow error of several percent that is invisible in the trend.',
      },
      { t: 'h2', text: 'Where it goes wrong' },
      {
        t: 'table',
        head: ['Problem', 'Effect', 'Check'],
        rows: [
          ['Sensor at the wrong point', 'Systematic error at all flows', 'Measure the sensor location against the standard dimensions'],
          ['Zero set wrong', 'Large error at low flow, smaller at high flow', 'Staff gauge reading against the meter at several flows'],
          ['Submergence', 'Reads high; worse as downstream level rises', 'Compare downstream depth to the head; look for a level water surface through the throat'],
          ['Solids or grease behind a weir', 'Raises the apparent head; reads high', 'Inspect and clean; consider a flume'],
          ['Approach turbulence', 'Noisy head, unstable reading', 'Straight, uniform approach channel of at least ten channel widths; baffles upstream if needed'],
          ['Foam or floating debris', 'Ultrasonic and radar read the surface of the foam', 'Sunshade, foam control, or a submerged sensor'],
          ['Flume built to the wrong dimensions', 'Unknown coefficient', 'Field-measure the throat and converging section against the standard'],
        ],
      },
    ],
    faqs: [
      {
        q: 'Which is better for a wastewater plant, a flume or a weir?',
        a: 'A Parshall flume for raw wastewater and anywhere solids are present, because it is self-cleaning and tolerates some submergence. A V-notch or rectangular weir for clean effluent at low flow, where its accuracy is better and nothing collects behind it.',
      },
      {
        q: 'Can I calculate flow in the PLC instead of a flow meter?',
        a: 'Yes. Read the head from a level transmitter, apply the flume or weir equation with a low-head cutoff, and totalize. The dedicated open channel flow meter does the same thing with the equations built in and a certified totalizer, which matters for permit reporting.',
      },
      {
        q: 'How accurate is open channel flow?',
        a: 'A properly built and installed Parshall flume with a well-calibrated head measurement is within about 3 to 5 percent. A weir can reach 2 percent. In practice, errors in the head measurement and in the installation dominate, and a flume that has never been checked can be off by 10 percent or more.',
      },
      {
        q: 'How do I verify the flow meter for a permit?',
        a: 'Verify the head: compare the meter reading with a staff gauge at the measuring point at several flows, and record it. Then verify the conversion with a known head against the published table. A dye dilution or velocity-area test is the independent check where the primary device itself is in doubt.',
      },
    ],
    related: [
      '/controls/instrumentation/level/radar-level',
      '/controls/instrumentation/level/ultrasonic-level',
      '/controls/instrumentation/level/hydrostatic-level',
      '/controls/instrumentation/flow/magnetic-flowmeters',
      '/controls/plc-systems/analog-control/scaling',
    ],
  },
  {
    path: '/controls/instrumentation/analytical/chlorine',
    kind: 'reference',
    title: 'Chlorine Residual Analyzers',
    summary:
      'Amperometric and colorimetric residual analyzers: what each measures, free versus total chlorine, pH and flow dependence, sample line design, calibration against a DPD grab sample, and using the signal for feed control.',
    answer:
      'Chlorine residual analyzers continuously measure free or total chlorine in a sample stream, by an amperometric cell that produces a current proportional to chlorine, or by a colorimetric reaction that reproduces the DPD laboratory test. Amperometric analyzers are fast, continuous, and sensitive to pH, temperature, and sample flow; colorimetric analyzers are slower and use reagents but match the reference method directly. Either is only as good as its sample line and its calibration against a grab sample.',
    keyPoints: [
      'Free chlorine and total chlorine are different measurements. Know which one the permit and the process need.',
      'Amperometric cells depend on pH, temperature, and sample flow. Compensate or control all three.',
      'Colorimetric analyzers reproduce the DPD reference test and are the easiest to defend for reporting.',
      'The sample line is part of the analyzer: short, fast, flushed, and representative.',
      'Calibrate to a DPD grab sample taken at the analyzer, not to the value the analyzer used to read.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Instrumentation', 'Water', 'Wastewater', 'Analog'],
    blocks: [
      { t: 'h2', text: 'What is being measured' },
      {
        t: 'p',
        text: 'Chlorine added to water exists in several forms. Free chlorine is hypochlorous acid and hypochlorite ion, the forms that disinfect quickly. Combined chlorine is chlorine bound to ammonia as chloramines, which disinfects slowly and persists. Total chlorine is the sum. A drinking water system that chlorinates measures free chlorine; one that chloraminates measures total, and often monochloramine and free ammonia as well. A wastewater plant that chlorinates effluent containing ammonia forms chloramines and measures total chlorine, and if it dechlorinates, it measures the residual after dechlorination, which is near zero and is the hardest measurement of all.',
      },
      {
        t: 'p',
        text: 'The ratio of hypochlorous acid to hypochlorite depends on pH: at pH 7.5 they are roughly equal, at pH 6.5 hypochlorous acid dominates, and by pH 8.5 most of the free chlorine is hypochlorite. Disinfection effectiveness and, for some analyzers, the reading itself follow that ratio.',
      },
      { t: 'h2', text: 'Analyzer types' },
      {
        t: 'table',
        head: ['Type', 'How it works', 'Strengths', 'Limits'],
        rows: [
          ['Amperometric, bare electrode', 'Two or three electrodes in the flowing sample; chlorine is reduced at the cathode and the current is proportional to concentration', 'Continuous, fast, no reagents', 'Responds to hypochlorous acid, so the free chlorine reading depends on pH; needs constant sample flow; electrodes foul and need cleaning or a mechanical cleaning cell; some designs add a buffer reagent to remove the pH dependence'],
          ['Amperometric, membrane', 'The electrodes sit behind a membrane in an electrolyte; chlorine diffuses through', 'Less fouling, lower flow dependence, no reagents', 'Membrane and electrolyte are consumables; temperature compensation is essential; pH dependence remains for free chlorine unless the design is specific to it'],
          ['Colorimetric, DPD', 'Buffer and DPD reagent are added to a sample aliquot; the pink color is measured optically', 'Directly reproduces the reference method; independent of pH and flow; measures free or total by reagent choice', 'A reading every one to three minutes, not continuous; reagents to buy and replace; a small fluidic system to keep clean'],
          ['Older amperometric titration and iodometric cells', 'Reagent-based electrochemical variants', 'Established at existing plants', 'Higher maintenance; being replaced'],
        ],
      },
      { t: 'h2', text: 'The sample line' },
      {
        t: 'p',
        text: 'An analyzer measures what reaches it, and a poor sample system produces a good measurement of the wrong water. The sample line rules apply to every type.',
      },
      {
        t: 'ul',
        items: [
          'Take the sample from a representative point: after mixing is complete, at the location the residual is supposed to describe, such as the point of entry to distribution or the contact tank outlet.',
          'Keep it short and fast. Chlorine reacts with the tubing wall, biofilm, and anything in the water; a sample that spends ten minutes in a long line arrives with a lower residual than the pipe has. Aim for a lag of under a minute, with tubing velocity high enough to scour.',
          'Use opaque tubing. Sunlight through clear tubing grows algae and consumes chlorine.',
          'Provide a constant flow to an amperometric cell, with a flow regulator or a constant-head overflow, and alarm loss of sample flow. A cell with no flow reads low and the feed controller responds by overdosing.',
          'Filter grit where necessary but not so finely that the filter itself consumes chlorine, and flush the line on a schedule.',
          'Measure the sample flow and the sample temperature as signals where the analyzer offers them, and use them in the validation logic.',
        ],
      },
      { t: 'h2', text: 'Calibration' },
      {
        t: 'p',
        text: 'Analyzers are calibrated against the DPD reference test on a grab sample drawn at the analyzer sample point at the moment the analyzer reading is recorded. The DPD test itself has an uncertainty of a few hundredths of a milligram per liter at low residuals and worse if the reagent is old or the colorimeter is dirty, so a single comparison is not a calibration; a pattern of comparisons is.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Verify the reference', text: 'Fresh DPD reagent, a clean cell in the bench colorimeter, and a check standard if the utility has one.' },
          { title: 'Draw the grab at the analyzer', text: 'From the analyzer sample line or the same tap, at the same time as the analyzer reading is noted. A sample from a different point in the plant is not a calibration sample.' },
          { title: 'Compare, and decide whether to adjust', text: 'Small differences within the combined uncertainty are logged and not adjusted. Chasing every difference makes the analyzer follow the noise of the bench test.' },
          { title: 'Adjust the slope', text: 'When a consistent offset appears over several comparisons, adjust the analyzer calibration factor to the grab. Zero is checked separately on chlorine-free water.' },
          { title: 'Record it', text: 'Date, analyzer reading, grab result, reagent lot, and the adjustment made. For a compliance analyzer, this record is what an inspector reads.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Bench test frequency',
        text: 'Regulations and the utility permit set the minimum comparison frequency for a compliance analyzer, and daily is common. Beyond compliance, the comparison record is the only way to know when an analyzer is drifting, and the trend of analyzer minus grab is a more useful maintenance indicator than the analyzer reading itself.',
      },
      { t: 'h2', text: 'Using the signal for control' },
      {
        t: 'p',
        text: 'Residual control feeds chlorine to hold a residual setpoint at the analyzer. It is a slow loop with a large dead time: the sample travels from the injection point to the sample tap and through the sample line before the analyzer sees a change. Compound loop control, which combines flow-paced feedforward with residual feedback trim, handles this far better than residual feedback alone. The feedforward sets the dose from the flow; the residual controller adjusts it slowly. The validation logic must hold the last good dose or fall back to flow pacing alone when the analyzer signal is bad, out of range, or the sample flow is lost, and alarm.',
      },
      {
        t: 'p',
        text: 'Never let an analyzer that has lost its sample drive the feed. The reading falls toward zero, the controller raises the dose, and the plant sends high chlorine to distribution or to the river. Loss of sample flow is a hardwired interlock to the residual controller, not a suggestion.',
      },
      { t: 'h2', text: 'Low-level measurement after dechlorination' },
      {
        t: 'p',
        text: 'A wastewater plant that dechlorinates with sulfur dioxide or bisulfite must show near-zero residual in the effluent, often below the detection limit of the analyzer. The measurement is at the edge of what amperometric cells can do, and colorimetric analyzers with a low range are common here. Some plants control on sulfite residual instead, holding a small excess of dechlorination chemical, and use the chlorine analyzer as a limit alarm. Zero calibration on genuinely chlorine-free water, a clean sample system, and a realistic understanding of the detection limit matter more than any other factor in this measurement.',
      },
    ],
    faqs: [
      {
        q: 'Why does my amperometric analyzer read lower than the grab sample?',
        a: 'In order of likelihood: sample flow to the cell is low or unsteady; the electrodes are fouled; the sample pH has risen and the cell does not compensate for it; the cell temperature compensation is off; or the sample line is consuming chlorine before the cell. Check flow first, then clean the cell, then compare pH.',
      },
      {
        q: 'Free or total: which should the analyzer measure?',
        a: 'Whichever the process and the permit require, and it is worth confirming both. A chlorinating drinking water plant measures free. A chloraminating one measures total, and usually monochloramine. Chlorinated wastewater effluent measures total. Measuring free chlorine in a chloraminated system gives a small, meaningless number.',
      },
      {
        q: 'How long does a membrane cell last?',
        a: 'Membrane and electrolyte are typically replaced every few months, more often in warm or dirty water, and the electrode itself lasts years. Follow the manufacturer interval, and shorten it if the calibration drifts before the interval is reached.',
      },
      {
        q: 'Can I trust a colorimetric analyzer for compliance?',
        a: 'It runs the same chemistry as the reference method, which is the strongest argument for it, and many utilities use it for the compliance point. It still needs the grab comparison on the required schedule, reagent replacement on time, and a clean optical path.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/plc-systems/analog-control/pid',
      '/controls/plc-systems/analog-control/filtering',
      '/controls/scada-hmi/alarm-management/alarm-priority',
    ],
  },
  {
    path: '/controls/instrumentation/analytical/ph',
    kind: 'reference',
    title: 'pH Measurement',
    summary:
      'Glass electrodes, reference junctions, and why pH is the measurement that drifts: how the sensor works, temperature compensation, two-point buffer calibration, mounting rules, the failure modes of the reference, and using the signal for chemical feed control.',
    answer:
      'pH is measured by the voltage between a glass electrode, which develops a potential proportional to hydrogen ion activity, and a reference electrode that provides a stable potential through a porous junction. The signal is about 59 millivolts per pH unit at 25 °C and changes with temperature, so every measurement is temperature compensated. The sensor is calibrated against two buffers, drifts as the glass ages and the reference junction fouls or its electrolyte depletes, and is the most maintenance-intensive analytical measurement in a typical plant.',
    keyPoints: [
      'The measurement is a voltage: 59.16 mV per pH unit at 25 °C, zero at pH 7.',
      'The reference electrode is the usual failure. Fouled junctions and depleted electrolyte cause drift and slow response.',
      'Two-point calibration with fresh buffers, bracketing the process pH.',
      'Slope and offset from the calibration tell you the sensor condition. Track them.',
      'Temperature compensation corrects the electrode, not the chemistry. A pH at 10 °C is a different number at 25 °C.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Instrumentation', 'Water', 'Wastewater', 'Analog'],
    blocks: [
      { t: 'h2', text: 'How the sensor works' },
      {
        t: 'p',
        text: 'A pH sensor is a small battery whose voltage depends on the hydrogen ion activity of the solution. The glass electrode is a bulb of special glass that develops a potential across its surface in proportion to pH, and the reference electrode, usually silver and silver chloride in a potassium chloride electrolyte, provides a fixed potential against which the glass is measured. The two connect through the solution: the glass by its surface, the reference through a porous junction that lets ions pass while keeping the electrolyte in.',
      },
      {
        t: 'formula',
        expr: 'E = E₀ − (2.303 RT / F) × (pH − 7) ≈ −59.16 mV × (pH − 7) at 25 °C',
        where: [
          'E = measured voltage between the glass and reference electrodes',
          'E₀ = the sensor offset, ideally zero at pH 7',
          '2.303 RT / F = the Nernst slope, 59.16 mV per pH unit at 25 °C and 54.2 mV at 0 °C',
        ],
      },
      {
        t: 'p',
        text: 'The slope depends on absolute temperature, which is why every pH sensor has a temperature element and every transmitter compensates. The compensation corrects the electrode response to the temperature; it does not correct for the fact that the pH of the water itself changes with temperature. A sample at 10 °C measured correctly reads the pH at 10 °C.',
      },
      {
        t: 'p',
        text: 'The signal is tiny and its source impedance is very high, hundreds of megohms through the glass, which makes the measurement sensitive to moisture in connectors, cable length, and electrical noise. Modern sensors put a preamplifier in the sensor body or the cable head, and the transmitter is mounted close.',
      },
      { t: 'h2', text: 'Sensor types' },
      {
        t: 'table',
        head: ['Type', 'Reference design', 'Strength', 'Limit'],
        rows: [
          ['Combination, gel-filled', 'Sealed gel electrolyte, single or double junction', 'No maintenance of the electrolyte; inexpensive', 'Gel depletes and cannot be refilled; life of months to a year or two in process water'],
          ['Combination, refillable', 'Liquid electrolyte topped up through a fill port', 'Longer life; the junction can be flushed', 'Needs refilling; electrolyte leaks are a maintenance item'],
          ['Double junction', 'A second chamber between the reference and the process', 'Protects the reference from sulfide, ammonia, and heavy metals that poison silver chloride', 'The standard for wastewater'],
          ['Differential', 'A third electrode replaces the direct reference; both glass and reference are measured against it', 'Very tolerant of fouling and ground loops; long life', 'More expensive; specific to a manufacturer family'],
          ['Flat glass', 'A flat rather than bulb measuring surface', 'Resists coating and abrasion; easier to clean', 'Slightly slower response'],
        ],
      },
      { t: 'h2', text: 'Mounting and sample' },
      {
        t: 'ul',
        items: [
          'The glass must stay wet. A sensor that dries out is damaged, and one left in air over a weekend often does not recover.',
          'Flow past the sensor, but not turbulence that entrains air bubbles onto the glass. Insertion into a pipe with a flow of a foot or two per second, or a flow cell on a sample line, is typical.',
          'Mounting angle: bulb down, at least 15 degrees from horizontal, so bubbles in the reference do not sit on the junction.',
          'Temperature element in the same water, and the sensor and the process at the same temperature by the time the measurement is read.',
          'Away from injection points for acid, caustic, or chlorine, where the chemical is not yet mixed. A pH sensor at a caustic injection point reads the plume, not the water.',
          'Retractable or hot-tap assemblies where the sensor must be serviced without draining the line. On a wastewater channel, a submersible assembly on a swing arm that can be lifted to the walkway.',
        ],
      },
      { t: 'h2', text: 'Calibration' },
      {
        t: 'p',
        text: 'A pH sensor is calibrated in two buffers that bracket the process pH, commonly 7 and 4 for acidic service or 7 and 10 for alkaline, at a known temperature, with fresh buffers. The transmitter reads the voltage in each, computes the offset from the pH 7 reading and the slope from the pair, and stores them. The offset and slope are the health of the sensor.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Rinse and blot', text: 'Rinse the sensor in clean water and blot the glass; do not wipe it. Wiping a glass electrode charges it and takes minutes to settle.' },
          { title: 'First buffer, pH 7', text: 'Immerse, stir gently, wait for the reading to stabilize, typically 30 seconds to two minutes. A sensor that takes longer has a slow reference. Accept the reading in the transmitter.' },
          { title: 'Rinse, second buffer', text: 'Immerse in the second buffer, wait, accept. The transmitter computes the slope.' },
          { title: 'Read the diagnostics', text: 'Offset within about 30 mV of zero and slope between about 92 and 102 percent of theoretical is a healthy sensor. Offset drifting away from zero or slope falling toward 85 percent means the sensor is aging; below that, replace it.' },
          { title: 'Return to process and compare', text: 'Compare with a grab sample measured on a bench meter that was itself calibrated. Agreement within 0.1 to 0.2 pH is typical for process water.' },
          { title: 'Record', text: 'Buffers and lot, temperature, offset, slope, grab result, date, and technician. The trend of slope over time is the replacement schedule.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Fresh buffers, capped bottles',
        text: 'Buffer solutions change when exposed to air, pH 10 buffer especially, which absorbs carbon dioxide and falls. Use fresh buffer poured into a clean cup, discard it after use, keep the bottles capped, and check the expiration date. Calibrating to a bad buffer is calibrating to the wrong number.',
      },
      { t: 'h2', text: 'Why pH drifts' },
      {
        t: 'table',
        head: ['Cause', 'Symptom', 'Fix'],
        rows: [
          ['Reference junction fouled or coated', 'Slow response, drift, offset growing', 'Clean the junction; flush a refillable reference; replace a gel sensor'],
          ['Reference electrolyte depleted or contaminated', 'Offset growing, unstable reading', 'Refill; replace'],
          ['Reference poisoned by sulfide or ammonia', 'Offset shifts, dark junction', 'Double-junction sensor'],
          ['Glass coated with grease, biofilm, or scale', 'Slow response, low slope', 'Clean with detergent, or dilute acid for scale; a flat glass sensor; automatic cleaning'],
          ['Glass aged', 'Slope falling steadily over months', 'Replace; glass has a finite life'],
          ['Glass cracked', 'Reading jumps to near pH 7 and stops responding', 'Replace'],
          ['Moisture in the connector', 'Erratic reading, especially after rain', 'Dry and seal the connector; check the cable'],
          ['Ground loop or stray current', 'Reading shifts when a pump starts', 'Solution ground on the sensor; differential sensor; check the loop grounding'],
          ['Temperature element failed', 'Reading wrong by a fraction of a pH at temperatures away from 25 °C', 'Replace; check the compensation setting'],
        ],
      },
      { t: 'h2', text: 'Using pH for control' },
      {
        t: 'p',
        text: 'pH control is notoriously difficult because the relationship between chemical added and pH is a titration curve: nearly flat far from the endpoint and almost vertical near it. A feed loop tuned for one region of the curve is either sluggish or unstable in another. For water treatment, where pH is adjusted by a small amount for corrosion control or coagulation, flow-paced feedforward with slow pH trim and a modest dose range works well. For neutralization of a wide swing, staged reactors, characterized control that adapts the gain to the curve, or simply a large reaction volume are the usual answers. In every case the pH signal is validated: a sensor reading exactly 7.00 with no noise is often a cracked glass, not a neutral process, and the feed must not chase it.',
      },
    ],
    faqs: [
      {
        q: 'How often should a pH sensor be calibrated?',
        a: 'Weekly to monthly in process water, set by the drift observed. Compare with a grab sample more often than you calibrate, and calibrate when the comparison says to or on the schedule, whichever comes first. A sensor that needs calibration every few days is fouling or dying, and calibration is not the fix.',
      },
      {
        q: 'Why does the reading drift after calibration when the sensor goes back in the process?',
        a: 'The process is at a different temperature than the buffers, and the sensor needs minutes to equalize; or the junction is slow to re-establish contact after the buffers; or the process has a coating that the buffers washed off and that is now re-forming. Wait fifteen minutes before judging, then compare with a grab sample.',
      },
      {
        q: 'What is a solution ground and do I need one?',
        a: 'A third metal contact on the sensor that ties the process liquid to the transmitter reference, so that stray currents in the liquid flow through it rather than through the reference junction. It stabilizes the reading in tanks with pumps, mixers, or cathodic protection. Most process sensors have one; use it.',
      },
      {
        q: 'Is a differential sensor worth the cost?',
        a: 'In wastewater and dirty water, usually. It tolerates fouling that stops a conventional reference, its salt bridge is replaceable, and it is immune to the ground loop problems that plague conventional sensors in tanks with mixers. In clean water a good double-junction combination sensor does the job for less.',
      },
    ],
    related: [
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/signals/ground-loops',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/plc-systems/analog-control/pid',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/how-to/instrumentation-how-to/diagnose-ground-loops',
    ],
  },
  {
    path: '/controls/instrumentation/analytical/dissolved-oxygen',
    kind: 'reference',
    title: 'Dissolved Oxygen Measurement',
    summary:
      'Optical and membrane DO sensors for aeration control: how each measures, why optical has taken over, air calibration with pressure and salinity corrections, sensor placement in an aeration basin, fouling and cleaning, and the response time that limits the control loop.',
    answer:
      'Dissolved oxygen is measured in wastewater aeration basins by optical sensors, which read the fluorescence quenching of a coating by oxygen, or by older membrane-covered electrochemical sensors. Optical sensors need no membrane or electrolyte, drift little, and are calibrated in water-saturated air with corrections for barometric pressure and salinity. The measurement feeds aeration control, where the blower output or the valve position holds a DO setpoint, and it is only as good as the sensor placement and cleaning schedule in a basin that fouls everything put into it.',
    keyPoints: [
      'Optical sensors have replaced membrane sensors for aeration control: less drift, no electrolyte, longer intervals.',
      'Calibrate in water-saturated air, corrected for barometric pressure. A calibration at the wrong pressure is off by a few percent.',
      'Placement decides what the sensor sees. A basin is not uniform.',
      'Fouling is the failure mode. Wipers or air blast cleaning and a cleaning schedule are part of the design.',
      'Response time of a minute or more limits aeration control tuning. Tune the loop for the sensor, not the blower.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Instrumentation', 'Wastewater', 'Analog', 'Control'],
    blocks: [
      { t: 'h2', text: 'Why DO is measured' },
      {
        t: 'p',
        text: 'Aerobic biological treatment needs oxygen in the water for the bacteria that consume organic matter and oxidize ammonia. Too little and treatment suffers; too much and the blowers, which are typically the largest energy consumer at a wastewater plant, run harder than needed. Aeration control holds a dissolved oxygen setpoint, commonly around 2 mg/L in a conventional activated sludge basin and lower in processes that manage nitrogen, by modulating air supply. The DO measurement is the input to that loop and the largest lever on plant energy cost, which is why it deserves better than a sensor that was installed once and forgotten.',
      },
      { t: 'h2', text: 'Sensor types' },
      {
        t: 'table',
        head: ['Type', 'How it works', 'Strengths', 'Limits'],
        rows: [
          ['Optical, luminescent', 'A coating on the sensor tip fluoresces when illuminated by a blue LED; oxygen quenches the fluorescence, and the sensor measures the decay time or phase shift', 'No membrane or electrolyte; no oxygen consumption so no flow dependence; stable for months; calibration rarely needed', 'The sensor cap is a consumable, replaced yearly or so; response time of 30 to 90 seconds; fouling of the cap'],
          ['Galvanic membrane', 'Oxygen diffuses through a membrane and is reduced at a cathode, producing a current with no external voltage', 'Inexpensive; established', 'Consumes oxygen, so needs flow past the membrane; membrane and electrolyte replaced monthly to quarterly; drifts'],
          ['Polarographic membrane', 'Like galvanic, with an applied polarizing voltage', 'Fast response', 'Needs warm-up; the same membrane and electrolyte maintenance; drifts'],
        ],
      },
      {
        t: 'p',
        text: 'For continuous aeration control, optical sensors are now the default. Membrane sensors remain on portable meters and in older installations, and the maintenance they need is the reason many DO control loops were left in manual for years.',
      },
      { t: 'h2', text: 'Calibration' },
      {
        t: 'p',
        text: 'A DO sensor is calibrated at one point, in water-saturated air, where the oxygen partial pressure is known from the barometric pressure and the temperature. The sensor reads 100 percent saturation at that condition, and the transmitter converts to concentration using the temperature, the pressure, and the salinity of the process water.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Clean the sensor', text: 'Remove the cap guard, rinse, and clean the sensing surface as the manufacturer directs. Calibrating a fouled sensor stores the fouling as the calibration.' },
          { title: 'Place it in saturated air', text: 'In the calibration cup with a wet sponge, or held in air just above the water surface, out of direct sun, and let it equilibrate to the air temperature for several minutes.' },
          { title: 'Enter the barometric pressure', text: 'From a local barometer or the transmitter sensor, in the units the transmitter expects. Sea level is 760 mm Hg; a plant at 1,500 m elevation is near 635 mm Hg, and a calibration at the wrong value is wrong by the ratio.' },
          { title: 'Accept the calibration', text: 'The transmitter sets 100 percent saturation. Check the reported slope or gain against the healthy range in the manual.' },
          { title: 'Set salinity if needed', text: 'Fresh wastewater is near zero. Brackish or seawater processes need the value, which changes the concentration by several percent.' },
          { title: 'Verify in process', text: 'Compare with a calibrated portable meter in the same location at the same depth. Agreement within a few tenths of a mg/L is expected.' },
          { title: 'Record it', text: 'Date, pressure, temperature, slope, comparison, and cap age.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Zero calibration',
        text: 'A zero check in a sodium sulfite solution, which scavenges oxygen, confirms the sensor reads zero when there is no oxygen. Optical sensors rarely need it; membrane sensors should have it checked when the membrane is replaced. A sensor that does not read zero in sulfite has an air leak, a damaged membrane, or a failing cap.',
      },
      { t: 'h2', text: 'Placement in an aeration basin' },
      {
        t: 'p',
        text: 'An aeration basin is not uniform. DO is highest near the diffusers and at the surface, lowest in dead zones and near the inlet where the oxygen demand is greatest. A plug-flow basin has a DO profile along its length; a complete-mix basin still has gradients. The sensor location decides what the control loop sees, and it is chosen for the control objective.',
      },
      {
        t: 'ul',
        items: [
          'For control of a plug-flow basin, one sensor per control zone, at roughly two-thirds of the way through the zone, where the DO represents the zone rather than the inlet demand or the outlet recovery.',
          'Depth of 1 to 2 m below the surface, away from the surface layer that is aerated by contact with air, and away from a diffuser grid where a bubble plume reads high.',
          'On a rail or a swing arm that lets the sensor be lifted to the walkway for cleaning without a boat or a crane.',
          'Away from the inlet mixing zone and the return activated sludge entry, unless the objective is to measure there.',
          'Two sensors in a zone where the control matters most, so that a fouled sensor is detected by disagreement rather than by a process upset.',
        ],
      },
      { t: 'h2', text: 'Fouling and cleaning' },
      {
        t: 'p',
        text: 'Everything in an aeration basin grows a biofilm, and a coated DO sensor reads low, because the film consumes oxygen at the surface, and slowly. The control loop responds to the low reading by adding air, and the plant over-aerates until someone notices. Cleaning is therefore part of the design, not a maintenance afterthought.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Automatic cleaning', def: 'An air blast from the plant air supply, on a timer of every 15 to 60 minutes, or a mechanical wiper on the sensor face. Both extend the manual cleaning interval from days to weeks.' },
          { term: 'Manual cleaning', def: 'On a schedule, typically weekly to monthly depending on the basin, with a soft cloth and water, and a dilute acid for scale where the water is hard. Abrasives damage optical caps.' },
          { term: 'Cleaning detection', def: 'Trend the DO reading and its response to the cleaning cycle. A sensor whose reading jumps up after each cleaning was fouled before it; shorten the interval.' },
          { term: 'Cap and membrane replacement', def: 'Optical caps on the manufacturer interval, usually a year; membranes when the slope falls or the response slows.' },
        ],
      },
      { t: 'h2', text: 'Using DO for control' },
      {
        t: 'p',
        text: 'DO control is a slow loop with significant dead time. The sensor itself takes 30 to 90 seconds to respond, the basin takes minutes to change its DO after the air changes, and the blower or valve has its own dynamics. The controller is tuned for that: a slow proportional-integral loop with an execution interval of seconds to a minute, output limits that respect the blower minimum turndown and the diffuser minimum airflow, and a large deadband around setpoint so that the blower does not hunt. Cascade control, in which the DO loop sets an airflow setpoint that an inner flow loop holds, handles the blower and valve nonlinearities better than DO driving the blower directly. The DO signal is validated: a sensor reading that does not respond to an air change for several minutes, or a pair of sensors that disagree beyond a limit, drops the loop to a safe fixed airflow and alarms.',
      },
    ],
    faqs: [
      {
        q: 'What DO setpoint should we use?',
        a: 'What the process needs, which the plant operator and the process engineer decide from the treatment objectives and the basin configuration. Around 2 mg/L is the conventional activated sludge figure; nitrification may want more at the front of the basin and less at the end; processes with anoxic zones want near zero there. The control system holds the setpoint; it does not choose it.',
      },
      {
        q: 'Why does the DO read high near the surface and low at depth?',
        a: 'Surface water exchanges oxygen with the air and is also where bubbles from the diffusers collect; deeper water has had the oxygen consumed by the biomass. The sensor is placed at a depth that represents the mixed liquor the bacteria live in, which is why 1 to 2 m is the usual depth.',
      },
      {
        q: 'Can we skip cleaning with an optical sensor?',
        a: 'No. Optical sensors do not drift the way membrane sensors do, but they foul the same way. Automatic cleaning and a manual schedule remain necessary; the difference is that the optical sensor is otherwise maintenance-free between them.',
      },
      {
        q: 'How do we know the sensor is telling the truth?',
        a: 'A periodic comparison with a calibrated portable meter at the same spot and depth, a second sensor in the critical zone, and a trend that shows the reading responding to air changes within a couple of minutes. A DO that sits flat while the blowers change is not measuring the basin.',
      },
    ],
    related: [
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/analytical/ph',
      '/controls/plc-systems/analog-control/pid',
      '/controls/plc-systems/analog-control/signal-validation',
      '/how-to/plc-how-to/create-a-pid-loop',
    ],
  },
  {
    path: '/controls/instrumentation/analytical/turbidity',
    kind: 'reference',
    title: 'Turbidity Measurement',
    summary:
      'Nephelometric turbidimeters for filter effluent and raw water: how 90-degree scattering is measured, the methods and the NTU, low-range versus high-range instruments, bubbles and the debubbler, formazin calibration and verification standards, and the compliance record the instrument exists to produce.',
    answer:
      'Turbidity is the cloudiness of water caused by suspended particles, measured by shining a light through a sample and detecting the light scattered at 90 degrees. The result is reported in nephelometric turbidity units against a formazin standard. Online turbidimeters on individual filter effluents and on the combined filter effluent are compliance instruments at surface water treatment plants, so their calibration with primary standards, verification with secondary standards, and record-keeping are prescribed. The measurement is ruined by air bubbles, which is why every process turbidimeter has a bubble trap.',
    keyPoints: [
      'Turbidity is scattered light, not particle count. Two waters with the same NTU can have different particles.',
      'Filter effluent turbidimeters are compliance instruments. Their calibration and records are regulated.',
      'Bubbles read as turbidity. The debubbler and a slow, steady sample flow are essential.',
      'Calibrate with formazin or an approved primary standard; verify with a secondary standard on a schedule.',
      'Low-range instruments for filter effluent, high-range for raw water and backwash. One instrument does not cover both.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 11,
    tags: ['Instrumentation', 'Water', 'Analog', 'Standards'],
    blocks: [
      { t: 'h2', text: 'What is measured' },
      {
        t: 'p',
        text: 'Particles suspended in water scatter light. A nephelometer shines a beam through the sample and measures the intensity of light scattered at 90 degrees to the beam, which is the geometry that is most sensitive to small particles and least affected by color. The reading is compared with a suspension of formazin polymer of known concentration, and reported in nephelometric turbidity units. The regulatory methods define the light source and the detector geometry: EPA Method 180.1 uses a tungsten lamp, and the ISO 7027 method uses an infrared source, which reads differently in colored water. The method the state accepts decides the instrument.',
      },
      {
        t: 'p',
        text: 'Turbidity is not a measure of particle count, mass, or size. It is a proxy for them, adopted because it can be measured continuously and correlates with pathogen breakthrough through a filter. Combined filter effluent at or below 0.3 NTU in 95 percent of monthly measurements, and never above 1 NTU, is the surface water treatment rule requirement in the United States for conventional and direct filtration plants, and individual filter monitoring at 15-minute intervals is required as well. That is why the instruments exist and what their records serve.',
      },
      { t: 'h2', text: 'Instrument ranges' },
      {
        t: 'table',
        head: ['Application', 'Range', 'Instrument', 'Note'],
        rows: [
          ['Individual filter effluent', '0 to 1 or 0 to 10 NTU', 'Low-range process nephelometer, often with 0.001 NTU resolution', 'A compliance point; one per filter'],
          ['Combined filter effluent', '0 to 1 NTU', 'Low-range', 'The other compliance point'],
          ['Settled water', '0 to 10 or 0 to 100 NTU', 'Mid-range', 'Process control for coagulation'],
          ['Raw water', '0 to 1,000 NTU or higher', 'High-range or ratio instrument; surface-scatter designs for very high turbidity', 'Coagulant dosing and event detection'],
          ['Backwash waste', '0 to 1,000 NTU', 'High-range', 'Backwash endpoint'],
          ['Distribution', '0 to 10 NTU', 'Low or mid-range', 'Optional monitoring'],
        ],
      },
      { t: 'h2', text: 'The sample system' },
      {
        t: 'p',
        text: 'Most turbidimeter problems are sample problems. The instrument measures whatever reaches its cell.',
      },
      {
        t: 'ul',
        items: [
          'Sample flow: slow and steady, typically 250 to 750 mL per minute depending on the instrument, set with a flow regulator and never pulsing. A sample pump introduces bubbles; gravity or line pressure through a regulator is preferred.',
          'The bubble trap: every process turbidimeter has a chamber that lets entrained air rise out before the sample reaches the optical cell. It works only if the flow is slow enough and the trap is clean. Filter effluent under pressure, warm water, and supersaturated water all release bubbles.',
          'Sample line: short, opaque, no low points that collect sediment, and taken from a point that represents the stream: a pipe tap in the side, not the bottom where sediment moves or the top where air collects.',
          'Lag time: the sample takes time to travel from the tap to the cell. For individual filter monitoring at 15-minute intervals it rarely matters; for a turbidity spike alarm it does. Keep the line short.',
          'Cell cleaning: the optical surfaces coat with biofilm and scale. Weekly to monthly cleaning, more often on raw water, with the cleaning noted in the record.',
          'Drain: to a drain that cannot back up into the cell, with an air gap.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A bubble is a 0.3 NTU excursion',
        text: 'A stream of fine bubbles through the cell of a low-range turbidimeter reads as tenths of an NTU and looks exactly like a filter breakthrough. Before a compliance excursion is reported, or a filter is pulled from service, confirm the reading with a grab sample on a bench instrument and look at the sample for air. Then fix the sample system.',
      },
      { t: 'h2', text: 'Calibration and verification' },
      {
        t: 'p',
        text: 'Because the instruments are compliance devices, the regulations and the instrument methods specify how they are calibrated and how often they are checked. Calibration means adjusting the instrument to read correctly against a primary standard; verification means confirming, without adjusting, that it still does.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Primary standard', def: 'Formazin, prepared or purchased at a certified concentration, or an EPA-approved alternative such as a styrene divinylbenzene polymer suspension. Used for calibration, typically quarterly for process instruments and whenever verification fails.' },
          { term: 'Secondary standard', def: 'A sealed standard, often a gel or a solid, whose value was assigned by comparison against a primary standard on the same instrument. Used for verification, typically weekly, because it is convenient and stable.' },
          { term: 'Verification', def: 'Place the secondary standard, read, and compare with its assigned value within the tolerance the method or the state sets, usually a few percent or a fixed NTU at low range. Pass: record it. Fail: clean the instrument, verify again, and calibrate with the primary standard if it still fails.' },
          { term: 'Grab sample comparison', def: 'A bench turbidimeter reading on a grab sample drawn at the process instrument, on a schedule, as a check that the sample system is delivering what the process contains.' },
          { term: 'Records', def: 'Every calibration, verification, cleaning, and standard lot, with dates and initials, kept for the period the state requires. Inspectors read these before anything else.' },
        ],
      },
      {
        t: 'steps',
        items: [
          { title: 'Check the standard', text: 'In date, undisturbed, at room temperature, no bubbles or settling. A formazin dilution is prepared fresh; a sealed secondary is inverted gently if the instructions say so and never shaken.' },
          { title: 'Clean the cell and cuvette', text: 'Optical surfaces clean and dry on the outside, with no fingerprints. Oil the outside of a cuvette if the instrument method calls for it.' },
          { title: 'Calibrate at the points the instrument requires', text: 'A zero or a low point and one or more upscale points, in the order the transmitter menu prescribes. Let each reading stabilize.' },
          { title: 'Verify with the secondary', text: 'Immediately after calibration, read the secondary standard and record its value as the assigned value for future verifications on this instrument.' },
          { title: 'Return to sample and compare', text: 'Confirm the reading is stable and the bubble trap is working. Compare with a bench reading of a grab.' },
        ],
      },
      { t: 'h2', text: 'Using the signal' },
      {
        t: 'p',
        text: 'Individual filter effluent turbidity is trended at the interval the rule requires and alarmed at the rule limits with pre-alarms below them. A filter that trends upward through its run is approaching breakthrough, and the trend, together with head loss and run time, is a backwash trigger. Raw water turbidity drives coagulant dosing in plants with streaming current or feedforward control and is the earliest warning of a storm event reaching the intake. Backwash waste turbidity marks the end of the wash. None of these signals is a control input the plant can trust without the sample system and the verification record behind it.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between NTU, FNU, and FTU?',
        a: 'All three are formazin-based units. NTU is the term for the EPA 180.1 method with a white light source measured at 90 degrees. FNU is the ISO 7027 method with an infrared source, also at 90 degrees. FTU is an older generic term. The numbers are similar in clean water and diverge in colored water; use the unit and method the regulator accepts.',
      },
      {
        q: 'Why does the online reading differ from the bench reading?',
        a: 'Different instruments, different methods, a bubble in one or a dirty cell in the other, or the grab sample sat long enough for particles to settle. A consistent offset is investigated; a small random difference is normal. Keep the bench instrument calibrated and verified too, or the comparison means nothing.',
      },
      {
        q: 'How low can a process turbidimeter read reliably?',
        a: 'Modern low-range instruments resolve to 0.001 NTU and read reliably to a few hundredths, which is below the 0.1 NTU that many plants target. At that level, the sample system, stray light, and the cleanliness of the cell dominate; a reading of 0.02 NTU is only as good as the last cleaning.',
      },
      {
        q: 'Can turbidity be used to control filtration directly?',
        a: 'It is used as a backwash trigger and an alarm, and in some plants as a feedforward to coagulation. It is not used to modulate filter flow in real time, because a filter does not respond to a flow change quickly enough to control its own effluent turbidity, and because the compliance instrument should not be in a control loop that could push it around.',
      },
    ],
    related: [
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/analytical/ph',
      '/controls/plc-systems/analog-control/signal-validation',
      '/controls/scada-hmi/alarm-management/alarm-priority',
      '/controls/scada-hmi/hmi-design/trends',
    ],
  },
  {
    path: '/controls/instrumentation/signals/surge-protection',
    kind: 'reference',
    title: 'Surge Protection for Signal Circuits',
    summary:
      'Protecting 4-20 mA loops, discrete inputs, network cables, and radio feeds from lightning and switching surges: where surges enter, the device types and how they clamp, the grounding that makes them work, the resistance and capacitance they add, and where to put them at a remote site.',
    answer:
      'Signal surge protection places a clamping device on each conductor of a signal circuit where the circuit enters a panel, so that a surge from lightning or switching is diverted to ground before it reaches the transmitter, the input card, or the radio. Gas discharge tubes handle the energy, transient voltage suppressor diodes clamp fast and low, and hybrid devices combine them in stages. A protector works only through its ground connection, which must be short and bonded to the same ground as the equipment it protects, and it adds series resistance and capacitance the loop design must allow for.',
    keyPoints: [
      'Surges enter on every conductor that leaves the building: power, signal, network, antenna. Protect all of them or none of them is protected.',
      'A protector is a path to ground. A long ground lead makes it useless.',
      'Two-stage hybrid devices for signal loops: a gas tube for energy, a diode for speed.',
      'Every protector adds resistance and capacitance. Check the loop and the network for them.',
      'Protectors fail. Test or replace on a schedule, and use ones that indicate.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Instrumentation', 'Signals', 'Grounding', 'Telemetry'],
    blocks: [
      { t: 'h2', text: 'Where surges come from' },
      {
        t: 'p',
        text: 'A lightning strike does not have to hit the site. A strike a mile away raises the ground potential unevenly across the area and induces voltage in every long conductor, and a lift station with a transmitter in the wet well, a level cable in a conduit, a power service, a radio antenna on a mast, and a telephone line is a collection of long conductors tied to different points in the ground. The difference in potential between those points appears across whatever connects them: the input card, the radio, the transmitter. Switching surges from utility operations, motor starts, and capacitor banks are smaller and far more frequent, and they wear insulation and electronics down the same way.',
      },
      {
        t: 'p',
        text: 'The rule that follows is that a surge enters on any conductor that leaves the building or the panel, and that protecting the power service while leaving the signal cables and the antenna unprotected leaves the surge a path through the electronics from the unprotected side to the protected one.',
      },
      { t: 'h2', text: 'Device types' },
      {
        t: 'table',
        head: ['Device', 'How it works', 'Strength', 'Limit'],
        rows: [
          ['Gas discharge tube (GDT)', 'A sealed gap that arcs over at a few hundred volts and then conducts heavily', 'Handles very high energy; very low capacitance; long life', 'Slow to fire, so the voltage reaches hundreds of volts before it clamps; needs a second stage for electronics'],
          ['Metal oxide varistor (MOV)', 'A resistor whose resistance collapses above a threshold', 'High energy; inexpensive', 'Degrades with each surge; high capacitance; used on power circuits more than signal'],
          ['Transient voltage suppressor diode (TVS)', 'A silicon diode that clamps within nanoseconds at a precise voltage', 'Fast and precise; clamps low enough to protect a 24 V input', 'Limited energy; fails short when overwhelmed, which at least takes the circuit down safely'],
          ['Hybrid, multi-stage', 'A GDT on the line side, a series resistor or inductor, and a TVS on the equipment side', 'The GDT takes the energy while the resistor lets the TVS clamp first; the standard for signal loops', 'Adds series resistance, typically a few ohms to tens of ohms per conductor, and some capacitance'],
          ['Isolating transformer or optical isolator', 'Breaks the galvanic path entirely', 'Immune to ground potential difference', 'Not a surge protector as such; used with one, especially on network and serial links'],
        ],
      },
      { t: 'h2', text: 'Where to put them' },
      {
        t: 'dl',
        items: [
          { term: 'At the panel entry', def: 'On each conductor of each signal cable where it enters the panel, on a DIN rail or a terminal block designed for it, before the cable reaches the controller. The protector ground goes to the panel ground bar by the shortest possible lead.' },
          { term: 'At the field device', def: 'Transmitters in exposed locations, on tanks, on masts, or in wet wells, get a protector at the device as well, so that a surge induced on the cable is clamped at both ends. Many transmitters offer an integral surge option.' },
          { term: 'On the antenna feed', def: 'A coaxial surge protector at the point the feed enters the building, bonded to the site ground with a short strap. The mast is bonded to the same ground. Radios are the most frequent lightning casualty at remote sites and this is the reason.' },
          { term: 'On network cables between buildings', def: 'Copper Ethernet between buildings is protected at both ends, or, better, replaced with fiber, which does not conduct a surge at all.' },
          { term: 'On serial lines', def: 'RS-485 and RS-232 links that leave a panel, at both ends, with devices rated for the signal voltage and the data rate.' },
          { term: 'On power', def: 'A service entrance protector and a panel protector, because signal protection is defeated if the power side floats up.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The ground lead is the protector',
        text: 'A surge protector diverts current to ground. The voltage that appears across the protected equipment is the clamping voltage plus the voltage developed along the ground lead by the surge current, and a surge rising at kiloamps per microsecond develops hundreds of volts along a foot of wire. A protector with a long, looped ground lead protects nothing. Short, straight, heavy, and bonded to the same ground bar as the equipment it protects.',
      },
      { t: 'h2', text: 'Grounding that makes it work' },
      {
        t: 'p',
        text: 'Surge protection and grounding are one subject. Every protector, the panel ground bar, the equipment ground, the antenna mast, the service ground, and the transmitter case need to rise together when the ground rises, which means a single low-impedance ground system for the site: a ground ring or grid with rods, bonded to the service ground, to the mast, and to the panel, with the protectors landed on the bar that is bonded to it. Separate isolated grounds for instrumentation, a practice that is sometimes specified for noise reasons, are the opposite of what surge protection needs, and where both matter, the instrument ground bar is bonded to the site ground at one point and the shields are handled as the ground loop guidance describes.',
      },
      { t: 'h2', text: 'What protectors do to the loop' },
      {
        t: 'ul',
        items: [
          'Series resistance. A hybrid protector at each end of a 4-20 mA loop adds tens of ohms to the loop. Add it to the loop resistance calculation for the transmitter compliance voltage.',
          'Capacitance. Protectors on a HART loop or a serial line add capacitance that can attenuate the signal; use devices rated for the protocol.',
          'Leakage. A protector near its clamping voltage leaks current. On a 24 V loop, choose a clamp voltage with margin above the working voltage, commonly 30 to 36 V, so the protector does not conduct in normal operation.',
          'Failure modes. A TVS fails short and takes the loop to zero, which is detected. A GDT can fail open and stop protecting silently. Devices with a status indicator or a remote contact are worth the cost on critical loops.',
          'Bandwidth. Network protectors are rated for a data rate; a device meant for 10 Mb Ethernet degrades a gigabit link.',
        ],
      },
      { t: 'h2', text: 'Maintenance' },
      {
        t: 'p',
        text: 'Protectors are consumed by the surges they absorb. Plug-in devices with a status flag are inspected on the site visit schedule and after any lightning event, and replaced when flagged. Devices without indication are replaced on a schedule, every few years in a lightning-prone area, or tested with a protector tester where the utility has one. A site that has had its radio or its level transmitter replaced twice for lightning damage has a grounding or protection gap, not bad luck, and the investigation starts with the ground lead lengths and the bonding.',
      },
    ],
    faqs: [
      {
        q: 'Do I need surge protection on a 4-20 mA loop that stays inside the building?',
        a: 'Usually not, if the loop never leaves the structure and the building has a proper ground. A loop that goes to a transmitter on a tank outside, down a wet well, or through a buried conduit to another structure does, at both ends.',
      },
      {
        q: 'Is fiber the answer to network surge problems?',
        a: 'Between buildings, yes. Fiber conducts no current, so a ground potential difference between two structures does not appear across the switches. Copper between buildings is protected at both ends and still fails more often; fiber is usually the better investment at any site that has lost a switch to lightning.',
      },
      {
        q: 'Where does the protector for the wet well level transmitter go?',
        a: 'At the panel entry for the level cable, and at the transmitter where the transmitter offers it or where a junction box at the well top allows a protector. The wet well transmitter is at the bottom of a hole in the ground with a cable running to the panel, which is the classic lightning path.',
      },
      {
        q: 'Can surge protectors cause a ground loop?',
        a: 'A protector connects a conductor to ground only when clamping, so in normal operation it does not. A shield grounded at both ends through a protector ground, however, is still a shield grounded at both ends; keep the shield termination rules and use protectors that pass the shield through or ground it only at the panel end.',
      },
    ],
    related: [
      '/controls/instrumentation/signals/ground-loops',
      '/controls/instrumentation/signals/4-20-ma-signals',
      '/controls/instrumentation/signals/hart',
      '/how-to/instrumentation-how-to/diagnose-ground-loops',
      '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
      '/controls/instrumentation/level/hydrostatic-level',
    ],
  },
  {
    path: '/controls/instrumentation/calibration/loop-checks',
    kind: 'reference',
    title: 'Loop Checks',
    summary:
      'Proving every I/O point end to end before a system goes live: what a loop check is and is not, the three-point analog check, discrete and output checks, the two-person method with the sheet that records it, what to do with a point that fails, and why a loop check is not a calibration.',
    answer:
      'A loop check proves that one I/O point works from the field device to the operator screen: the right signal, on the right channel, with the right scaling, the right description, and the right alarm. For an analog input it is a three-point injection at the field end read at the HMI; for a discrete it is both states; for an output it is a command from the HMI confirmed at the device. Each point gets a signed sheet, every row of the I/O list gets a sheet, and the sheets are the record that commissioning stands on. A loop check confirms the path; calibration confirms the instrument, and the two are done separately.',
    keyPoints: [
      'One point, end to end, field to screen, with a sheet signed by the person in the field and the person at the screen.',
      'Analog: zero, mid, and full scale injected at the field terminals; the HMI reads the engineering value within tolerance.',
      'Discrete: both states, with the description and the alarm confirmed. Outputs: commanded from the HMI, confirmed at the device.',
      'A failed point is fixed and rechecked from the start, not patched at the screen.',
      'The instrument is calibrated first; the loop check assumes it and tests everything after it.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Commissioning', 'Instrumentation', '4-20 mA', 'Documentation'],
    blocks: [
      { t: 'h2', text: 'What a loop check proves' },
      {
        t: 'p',
        text: 'Between a transmitter and an operator screen there is a cable, a junction box, a terminal strip, a module channel, a controller tag, a scaling block, a driver, a SCADA tag, a display element, and an alarm configuration. Any of them can be wrong: the cable landed on the neighboring terminal, the channel configured for the wrong range, the scaling from a different instrument, the SCADA tag pointing at the wrong address, the description copied from the point above. The loop check exercises the whole chain at once, from the field device or its terminals to the screen, and it either reads right at every point or it does not. It is the most effective commissioning activity there is, per hour spent, and it is the one most often cut short.',
      },
      { t: 'h2', text: 'What it does not prove' },
      {
        t: 'p',
        text: 'A loop check injects a known signal at the field end and confirms it arrives correctly. It does not confirm that the transmitter produces the right signal for the process; that is calibration, done against a reference before the loop check, with its own record. A loop check on an uncalibrated transmitter proves a correct path for a wrong number. The order is: install, calibrate the instrument, then loop check the point.',
      },
      { t: 'h2', text: 'The method' },
      {
        t: 'steps',
        items: [
          { title: 'Prepare', text: 'The I/O list at its current revision, a loop check sheet per point, the calibrator, a radio or a phone between the field and the screen, and the process in a state where driving the point is safe: loops in manual, equipment locked out where an output could start it.' },
          { title: 'Identify the point', text: 'Tag, description, terminal numbers, module and channel, range and units, from the I/O list. Confirm the physical label on the terminal strip and the field device match.' },
          { title: 'Analog input: inject three points', text: 'Disconnect the transmitter at the field terminals, or use the knife disconnect and the test point, and inject 4, 12, and 20 mA with the calibrator. At the screen, the value reads the bottom, the middle, and the top of the calibrated range within the tolerance, usually a fraction of a percent of span. The raw count in the controller is noted at each point.' },
          { title: 'Analog input: check the failure states', text: 'Inject below 4 mA and above 20 mA, and open the loop. The controller flags under-range, over-range, and open loop, and the HMI shows bad quality rather than a plausible value.' },
          { title: 'Discrete input: both states', text: 'Operate the field device, or jumper at the field terminals where the device cannot be operated, for both states. The controller bit and the HMI indication follow, with the correct description and, where the point is an alarm, the alarm at its priority.' },
          { title: 'Analog output: command three points', text: 'From the HMI or the controller, command 0, 50, and 100 percent. The output current at the field terminals reads 4, 12, and 20 mA, and the device, a drive or a valve, responds where it is safe to let it.' },
          { title: 'Discrete output: both states', text: 'Command on and off. The output indicator, the relay, and the device respond, and the run feedback where there is one returns.' },
          { title: 'Confirm the metadata', text: 'Description, units, range, alarm limits and priority, and trend configuration on the HMI match the I/O list and the master alarm database.' },
          { title: 'Reconnect and confirm live', text: 'Reconnect the transmitter, close the disconnect, and confirm the live value is sensible against a local reading.' },
          { title: 'Sign the sheet', text: 'Both people sign, with the date, the readings at each point, and the result. The I/O list status is updated to loop-checked.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Every injection is a real signal to the controller',
        text: 'Injecting 20 mA on a wet well level tells the controller the well is full. Every loop that uses the point is in manual, every output that could respond is locked out or confirmed safe, and the person at the screen watches for anything that moves. The loop check plan says which points can be driven live and which need the process in a specific state.',
      },
      { t: 'h2', text: 'The sheet' },
      {
        t: 'table',
        head: ['Field', 'Content'],
        rows: [
          ['Tag and description', 'From the I/O list'],
          ['Type, range, units', 'AI, AO, DI, DO; the calibrated range and engineering units'],
          ['Location', 'Panel, terminal strip, terminals; module, slot, channel'],
          ['Injected or commanded values', 'For each test point: the input applied, the raw count, the engineering value at the controller, the value at the HMI'],
          ['Failure states', 'Under-range, over-range, open loop: the indication observed'],
          ['Metadata', 'Description, units, alarm limits, priority confirmed'],
          ['Result', 'Pass, or fail with the fault found and the fix'],
          ['Signatures', 'Field, screen, date'],
        ],
      },
      { t: 'h2', text: 'When a point fails' },
      {
        t: 'p',
        text: 'A failed point is diagnosed at the layer where the value stopped being right. A signal that reads correctly at the module indicator but wrong at the controller tag is a configuration or a mapping fault; one that reads wrong at the module is wiring. The point is fixed, and then the whole check is repeated from the beginning, not resumed from the step that failed, because the fix may have moved something else. A common finding is a pair of points swapped: two transmitters landed on each other terminals. Both are re-checked after the swap, and any point on the same cable or the same module is spot-checked too.',
      },
      { t: 'h2', text: 'Scale' },
      {
        t: 'p',
        text: 'Two people check 20 to 40 points a day when the field devices are near the panel, and fewer at a plant where the transmitter is a walk away. A treatment plant with 800 points is a month of loop checks for one team. The plan schedules it, staffs it, and does not let it be compressed into the last week before startup, because the points that get skipped are the ones that will be wrong on the day the plant depends on them.',
      },
    ],
    faqs: [
      {
        q: 'Can I loop check from the transmitter instead of injecting a signal?',
        a: 'Driving the transmitter itself, by applying pressure or changing a level, checks the instrument and the loop together, and it is the best test where it can be done safely. A HART simulate command that forces the transmitter output to a value tests the loop from the transmitter output. Injecting at the terminals tests the loop alone. Any of the three is a loop check; the sheet says which was used.',
      },
      {
        q: 'Is a two-point check enough?',
        a: 'No. Zero and full scale can both be right while the middle is wrong, which happens with a square root taken twice, a nonlinear scaling, or a wrong raw count range that crosses at the ends. Three points is the minimum; five on compliance loops.',
      },
      {
        q: 'Who should be at the screen?',
        a: 'Someone who can read the HMI and the controller online: the integrator engineer, or a utility staff member who has been shown how. The utility person is preferable, because the loop check is the utility learning its system, and the signature at the screen is the utility accepting the point.',
      },
      {
        q: 'What about network points from a drive or an analyzer?',
        a: 'They get a loop check too: the value on the device display is compared with the tag at the HMI at two or three operating points, the status and alarm bits are driven where they can be, and the sheet is signed. A network point that was mapped to the wrong register is as wrong as a miswired cable.',
      },
    ],
    related: [
      '/engineering-library/lists-schedules/io-lists',
      '/engineering-library/checklists/commissioning',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/how-to/plc-how-to/scale-a-4-20-ma-input',
      '/how-to/instrumentation-how-to/calibrate-a-pressure-transmitter',
      '/controls/control-panels/panel-components/terminal-blocks',
    ],
  },
  {
    path: '/controls/instrumentation/calibration/calibration-procedures',
    kind: 'reference',
    title: 'Calibration Procedures',
    summary:
      'How a utility calibrates its instruments consistently: the as-found and as-left discipline, tolerance from the loop rather than the data sheet, the reference standard and its traceability, the five-point check with hysteresis, adjusting only when needed, intervals set from history, and the procedure written once per instrument type.',
    answer:
      'A calibration procedure compares an instrument against a reference of known accuracy at several points across its range, records what it read before any adjustment, decides from a tolerance whether adjustment is needed, adjusts if so, records what it reads after, and files the result. The tolerance comes from what the loop needs, the reference is traceable and at least four times more accurate than the tolerance, the points include both directions to show hysteresis, and the interval is set from how the instrument has drifted in the past. Written once per instrument type and followed every time, the procedure is what makes a calibration record mean something.',
    keyPoints: [
      'As-found before touching anything. The as-found record is the reason to calibrate.',
      'Tolerance is what the loop needs, decided before the test, not the accuracy on the data sheet.',
      'The reference is traceable and at least four times better than the tolerance.',
      'Five points, up and down. Adjust only when a point is out of tolerance.',
      'Set the interval from the as-found history: extend it when the instrument passes, shorten it when it drifts.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Instrumentation', 'Commissioning', 'Documentation', 'Standards'],
    blocks: [
      { t: 'h2', text: 'Why a procedure' },
      {
        t: 'p',
        text: 'Calibration done differently by each technician produces records that cannot be compared: one adjusts every instrument to zero error, one checks two points, one uses a gauge that was last checked in the previous decade. The value of a calibration program is the history it builds, and the history is only useful if every entry was produced the same way. A procedure per instrument type, a page or two, followed by everyone, is the whole difference.',
      },
      { t: 'h2', text: 'The elements' },
      {
        t: 'dl',
        items: [
          { term: 'Tolerance', def: 'The maximum error acceptable for the loop the instrument serves, expressed as a percent of span or in engineering units. A wet well level for pump control may tolerate 1 percent; a compliance flow meter or a chlorine residual analyzer tolerates what the permit and the method allow. The tolerance is decided by the engineer and written on the instrument list before the first calibration. It is not the accuracy printed on the transmitter data sheet, which is what the instrument can do, not what the loop needs.' },
          { term: 'Reference standard', def: 'The calibrator, test gauge, or standard solution the instrument is compared against. It is traceable, meaning its own calibration is documented back to a national standard through an unbroken chain, and it is at least four times more accurate than the tolerance, ten times where practical. Its calibration due date is checked before use and recorded on the sheet.' },
          { term: 'Test points', def: 'Five points across the range, 0, 25, 50, 75, and 100 percent, applied increasing and then decreasing, so that hysteresis and linearity show. Three points for a simple loop where the procedure says so; more for a compliance instrument. Analyzers are calibrated at the points their method prescribes, usually one or two standards.' },
          { term: 'As-found', def: 'The readings at every point before any adjustment. This is the record of how the instrument had drifted since the last calibration, and it is what sets the interval and what a regulator reads.' },
          { term: 'The decision', def: 'If every as-found point is within tolerance, the instrument passes and is not adjusted. If any point is out, it is adjusted per the instrument procedure, zero and span or the sensor trim, and the points are repeated.' },
          { term: 'As-left', def: 'The readings after adjustment, or a copy of the as-found readings where no adjustment was made, with every point within tolerance.' },
          { term: 'The record', def: 'Tag, date, technician, reference standard and its due date, tolerance, as-found, as-left, adjustment made, pass or fail, and the next due date.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Do not adjust an instrument that passes',
        text: 'Adjusting a transmitter that is within tolerance moves it by the uncertainty of the reference and the technician, which is usually more than the error being removed. It also destroys the drift history, because the as-left is always zero. Check, record, and leave it alone unless it fails.',
      },
      { t: 'h2', text: 'A procedure by type' },
      {
        t: 'table',
        head: ['Instrument', 'Reference', 'Points', 'Notes'],
        rows: [
          ['Pressure transmitter', 'Pressure calibrator or deadweight tester; milliammeter for the output', 'Five, up and down', 'Isolate and vent; sensor trim and output trim separately; the pressure transmitter page'],
          ['Level transmitter, hydrostatic', 'Pressure calibrator or a known head of water', 'Five, up and down', 'Specific gravity in the calculation; vent tube on submersibles'],
          ['Level transmitter, radar or ultrasonic', 'Tape measure or a target at known distances', 'Two or three levels', 'Configuration verification more than calibration; the radar page'],
          ['Flow meter, magnetic', 'Manufacturer verification tool for the electronics; a volumetric or a comparison meter for the whole meter', 'Verification of coil and electrode values; two or three flows where a comparison is possible', 'Most mag meters are verified electronically and compared against a reference flow periodically'],
          ['Flow, differential pressure', 'Pressure calibrator on the DP transmitter', 'Five points on DP, checked through the square root', 'The element is inspected, not calibrated; the DP flow page'],
          ['Temperature', 'A dry block or a bath with a reference thermometer', 'Three points across the range', 'Immersion depth and stabilization time matter'],
          ['pH', 'Buffers, two points bracketing the process', 'Two', 'Slope and offset recorded; the pH page'],
          ['Chlorine residual', 'DPD grab sample on a calibrated bench instrument', 'One point at the process residual, zero on chlorine-free water', 'Compare before adjusting; the chlorine page'],
          ['Turbidity', 'Primary formazin standard for calibration; secondary sealed standard for verification', 'Per the instrument method', 'Compliance records; the turbidity page'],
          ['Analog input channel', 'Milliamp source at the panel terminals', 'Three or five', 'A card channel is calibrated like an instrument when the loop tolerance is tight'],
        ],
      },
      { t: 'h2', text: 'Setting the interval' },
      {
        t: 'p',
        text: 'An instrument that has passed as-found at every calibration for two years is not drifting, and its interval can be extended. One that fails every six months is drifting and its interval is shortened, or it is replaced. The starting interval is set from the manufacturer guidance and the criticality, commonly six months for compliance and control-critical instruments and a year for the rest, and the as-found history moves it. Regulatory instruments have minimum frequencies the permit sets, and those are the floor.',
      },
      { t: 'h2', text: 'The written procedure' },
      {
        t: 'ul',
        items: [
          'Scope: the instrument type and the tags it applies to.',
          'Safety: isolation, process notification, lockout, chemical handling.',
          'Equipment: the reference standard by type and the accuracy required.',
          'Preparation: how to isolate, vent, connect, and stabilize.',
          'Test points and the order.',
          'Tolerance and the decision rule.',
          'Adjustment method, by instrument model where it differs.',
          'Return to service and the live check.',
          'Record: the form and where it is filed.',
          'Revision and approval, so the procedure itself is under control.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What accuracy ratio between the reference and the instrument is required?',
        a: 'Four to one is the widely used minimum: the reference uncertainty is no more than a quarter of the tolerance being checked. Ten to one is comfortable. Below four to one, the reference error is a significant part of what is being measured, and the result cannot be trusted at the tolerance.',
      },
      {
        q: 'Do we need to send our calibrators out for calibration?',
        a: 'Yes, on a schedule, to a laboratory that provides a traceable certificate, typically annually. A calibrator with no current certificate is not a reference, and every calibration done with it is undermined. The certificate and the due date are part of the calibration record.',
      },
      {
        q: 'Can a calibration be done in place without isolating the instrument?',
        a: 'A comparison against a reference at the operating point can be done in place and is valuable as a check between calibrations. It does not exercise the range and it is not a calibration for the record unless the procedure for that instrument says a single-point comparison is acceptable, which is the case for some analyzers.',
      },
      {
        q: 'What do we do with an instrument that fails as-found badly?',
        a: 'Record the failure, adjust or replace it, and ask what the loop did with the wrong value between the last calibration and this one. A compliance instrument that was out of tolerance for months may require reporting; a control instrument may explain a process problem. The as-found record is what makes that question answerable.',
      },
    ],
    related: [
      '/how-to/instrumentation-how-to/calibrate-a-pressure-transmitter',
      '/controls/instrumentation/calibration/loop-checks',
      '/controls/instrumentation/analytical/chlorine',
      '/controls/instrumentation/analytical/turbidity',
      '/controls/instrumentation/pressure/pressure-transmitters',
      '/engineering-library/lists-schedules/instrument-lists',
    ],
  },
  {
    path: '/controls/instrumentation/calibration/calibration-documentation',
    kind: 'reference',
    title: 'Calibration Documentation',
    summary:
      'The records a calibration program produces and what each is for: the calibration certificate per event, the instrument history, the reference standard file, the schedule, the tolerance and interval register, and how the records are organized so a regulator, an auditor, or the next technician can find what they need.',
    answer:
      'Calibration documentation is the set of records that proves each instrument was checked against a traceable reference, shows what it read before and after, and supports the interval it is on. The core record is a calibration sheet per event with as-found and as-left data; around it sit the instrument history that collects those sheets by tag, the file of reference standard certificates, the schedule of what is due, and the register of tolerances and intervals. Organized by tag and kept for the retention period the permit requires, the records are what an inspector reads and what turns a calibration into evidence.',
    keyPoints: [
      'One sheet per calibration event, with as-found, as-left, the reference used, and signatures.',
      'A history per instrument, so the drift over years is visible on one page.',
      'The reference standard certificates, current, filed where the sheets that cite them can be tied to them.',
      'A schedule that shows what is due and what is overdue, reviewed monthly.',
      'Retention per the permit, often five years for compliance instruments, and the records findable by tag.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Instrumentation', 'Documentation', 'Standards', 'Commissioning'],
    blocks: [
      { t: 'h2', text: 'Why the records matter' },
      {
        t: 'p',
        text: 'A calibration that is not recorded did not happen, for any purpose that matters. The regulator asks for the records at an inspection; the compliance report cites the instruments the records cover; the engineer setting an interval reads the history; the technician replacing a transmitter reads the last sheet for the range and the tolerance. The instruments themselves are only half the program. The other half is a filing system that answers, for any tag and any date, what the instrument read and against what.',
      },
      { t: 'h2', text: 'The records' },
      {
        t: 'table',
        head: ['Record', 'Content', 'Produced', 'Used by'],
        rows: [
          ['Calibration sheet', 'Tag, date, technician, procedure reference, reference standard and its certificate, tolerance, as-found and as-left at every point, adjustment made, pass or fail, next due date, signatures', 'At every calibration event', 'The regulator; the history; the next technician'],
          ['Instrument history', 'Every sheet for the tag in order, with a summary of as-found error over time', 'Compiled from the sheets', 'Setting the interval; deciding on replacement; investigating a process problem'],
          ['Reference standard file', 'The calibration certificate for each calibrator, test gauge, and standard, with the due date', 'From the laboratory at each recalibration', 'Traceability; the sheet cites the certificate'],
          ['Tolerance and interval register', 'For each tag: the tolerance, the interval, the procedure, and the basis for each', 'By the engineer; revised as history accumulates', 'The technician; the scheduler; the auditor'],
          ['Schedule', 'Every tag with its last and next due dates, sorted by due date', 'From the register and the sheets', 'The supervisor, monthly'],
          ['Deviation and failure log', 'Instruments found out of tolerance, the period affected, the action taken, and any report made', 'When an as-found fails', 'Compliance reporting; the engineer'],
          ['Procedure set', 'The written procedures by instrument type, with revisions', 'By the engineer', 'Everyone; the auditor'],
        ],
      },
      { t: 'h2', text: 'The calibration sheet' },
      {
        t: 'p',
        text: 'The sheet is the primary record and it is designed to be complete on its own. A reader with the sheet and nothing else should know what instrument, what reference, what tolerance, what it read, what was done, and who did it. Common failings are a sheet that records only as-left, so drift cannot be seen; a sheet that names the calibrator but not its certificate, so traceability breaks; and a sheet with no tolerance, so pass or fail is a guess. A form, paper or electronic, with a field for each item, and a rule that a sheet with a blank field is not accepted, prevents all three.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Record the as-found even when nothing is adjusted',
        text: 'A sheet that says pass, no adjustment, with the as-found readings, is the most valuable entry in the history. It shows the instrument is stable and supports a longer interval. A sheet that says pass with no readings shows nothing.',
      },
      { t: 'h2', text: 'Organization' },
      {
        t: 'ul',
        items: [
          'By tag. Every record is filed under the instrument tag, and the tag is the tag on the instrument list, the P&ID, and the nameplate.',
          'In one system. A maintenance management system with a calibration module, a calibration management application, or a controlled folder structure with a spreadsheet index. Not three of them.',
          'With the reference standards linked. A sheet cites the calibrator serial number; the file has the certificate under that serial; the two are findable together.',
          'With retention set. The permit and the state rules set the minimum, often five years for compliance data and longer for some; the utility policy may keep everything.',
          'With access for the people who need it. The technician in the field can see the last sheet; the supervisor can see the schedule; the inspector can be handed a folder.',
          'Backed up. Calibration records are part of the control system backup list.',
        ],
      },
      { t: 'h2', text: 'For an inspection' },
      {
        t: 'p',
        text: 'An inspector asks for a compliance instrument by tag and expects to see, within minutes, the calibration sheets for the period, the reference standard certificate, the procedure, and the verification records between calibrations. A utility whose records are organized by tag in one place answers in minutes; one whose records are in a technician truck, a filing cabinet, and an email answers in days with gaps. The organization above is what the inspection tests.',
      },
      { t: 'h2', text: 'Electronic records' },
      {
        t: 'p',
        text: 'Calibration management software captures the sheet from a documenting calibrator, links it to the tag, files the certificate, computes the schedule, and produces the history and the reports. It is worth the cost at any utility with more than a few dozen instruments, and it is where the industry has gone. Whatever the tool, the records must be exportable in a form that survives the tool: a folder of PDFs by tag is readable in twenty years; a proprietary database whose vendor is gone is not.',
      },
    ],
    faqs: [
      {
        q: 'How long must calibration records be kept?',
        a: 'For compliance instruments, the period the permit or the state rule specifies, commonly five years and sometimes longer. For other instruments, as long as the instrument is in service and a period after, because the history is what supports the interval. Many utilities keep everything, since the records are small.',
      },
      {
        q: 'Do verification checks between calibrations need records?',
        a: 'Yes. A weekly secondary standard check on a turbidimeter, or a grab sample comparison on a residual analyzer, is recorded with the date, the reading, and the result. For compliance instruments those records are required; for others they are the evidence that the instrument is fine between calibrations.',
      },
      {
        q: 'What if a calibrator certificate expired before the calibration?',
        a: 'The calibration is questionable and is recorded as such. The calibrator is sent for calibration; if it comes back in tolerance, the calibrations it did in the interval are usually accepted with a note; if it does not, they are repeated. The prevention is the reference standard file with due dates reviewed monthly.',
      },
      {
        q: 'Who signs a calibration sheet?',
        a: 'The technician who did it, and where the procedure requires it, a reviewer. On compliance instruments a second signature is common. The signature is a statement that the procedure was followed and the readings are true, and it is what makes the sheet evidence.',
      },
    ],
    related: [
      '/controls/instrumentation/calibration/calibration-procedures',
      '/controls/instrumentation/calibration/loop-checks',
      '/engineering-library/lists-schedules/instrument-lists',
      '/controls/instrumentation/analytical/turbidity',
      '/cybersecurity/backups/what-to-back-up',
      '/how-to/instrumentation-how-to/calibrate-a-pressure-transmitter',
    ],
  },
  {
    path: '/controls/instrumentation/pressure/impulse-lines',
    kind: 'reference',
    title: 'Impulse Lines',
    summary:
      'The tubing between the process tap and the pressure or DP transmitter, and everything that goes wrong in it: slope and routing for liquid and gas, elevation head and how to correct for it, air and condensate, blocking and manifold valves, freezing, plugging on dirty service, and the diaphragm seal alternative.',
    answer:
      'An impulse line carries process pressure from the tap to the transmitter through a small tube, and it works only if the fluid in it is known and stable: full of liquid on liquid service, full of gas on gas service, with the same fluid at the same temperature in both legs of a differential transmitter. Lines slope so gas rises out of liquid legs and liquid drains out of gas legs, they are as short as practical, they have a manifold at the transmitter for isolation and zeroing, and where the process is dirty, freezing, or corrosive, they are replaced by diaphragm seals or purged. Most pressure and DP measurement problems are impulse line problems.',
    keyPoints: [
      'The line must be full of a known fluid. A bubble in a liquid leg or condensate in a gas leg is a false reading.',
      'Liquid service: taps at the side or below center, lines sloping down to the transmitter. Gas service: taps on top, lines sloping up.',
      'A transmitter above or below the tap reads the elevation head. Correct for it deliberately, once.',
      'A manifold at the transmitter: block, equalize, vent, drain. Zero with the equalizer open.',
      'Dirty, freezing, or corrosive service: diaphragm seals or a purge, not a longer line.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Instrumentation', 'Design', 'Water', 'Wastewater'],
    blocks: [
      { t: 'h2', text: 'What the line does' },
      {
        t: 'p',
        text: 'A pressure transmitter measures the pressure at its own sensing diaphragm. The impulse line connects that diaphragm to the process tap, so that the pressure at the tap appears at the transmitter. If the line is full of the process liquid, the transmitter reads the tap pressure plus or minus the head of that liquid column between the two elevations, a fixed offset. If the line contains something else, air in a water line or water in an air line, the offset is unknown and changes. Every impulse line rule is about keeping the line full of a known fluid at a known elevation.',
      },
      { t: 'h2', text: 'Routing by service' },
      {
        t: 'table',
        head: ['Service', 'Tap location', 'Line slope', 'Transmitter location', 'Why'],
        rows: [
          ['Liquid', 'Side of the pipe, or below the centerline; never the bottom, where sediment collects, nor the top, where gas collects', 'Continuously downward from the tap to the transmitter, at least 1 in 12', 'Below the tap', 'Gas bubbles rise back to the pipe; the line stays liquid-full'],
          ['Gas', 'Top of the pipe', 'Continuously upward from the tap to the transmitter', 'Above the tap', 'Condensate drains back to the pipe; the line stays gas-full'],
          ['Steam', 'Side of the pipe, with a condensate pot', 'Downward to the transmitter from the pot', 'Below the tap, with both legs filled to the same level', 'The line is filled with condensate at a fixed level so the transmitter sees a known head'],
          ['Dirty liquid, slurry, wastewater', 'Side, with a diaphragm seal at the tap, or a purge', 'Not applicable with a seal', 'Wherever convenient', 'Solids plug an open impulse line'],
        ],
      },
      {
        t: 'p',
        text: 'Where the ideal cannot be met, a liquid transmitter above the tap for instance, the line runs up to a high point with a vent, and the vent is used to bleed gas out at commissioning and on a schedule. It works, and it is a maintenance item; the ideal routing is not.',
      },
      { t: 'h2', text: 'Elevation head' },
      {
        t: 'p',
        text: 'A transmitter mounted below its tap on liquid service reads the tap pressure plus the head of the liquid column between them; mounted above, it reads minus that head. The offset is fixed and it is corrected once, by a zero elevation or suppression setting in the transmitter, or in the controller scaling, and it is recorded on the loop sheet so that the next calibration does not remove it.',
      },
      {
        t: 'formula',
        expr: 'Offset = h × SG × 0.433 psi per foot',
        where: [
          'h = vertical distance from the tap to the transmitter diaphragm, in feet, positive when the transmitter is below the tap',
          'SG = specific gravity of the fluid filling the line, 1.0 for water',
          '0.433 = psi per foot of water column',
        ],
      },
      {
        t: 'p',
        text: 'On a differential transmitter with both legs full of the same fluid and the transmitter at any elevation, the two heads cancel and no correction is needed; that is the reason both legs must be full of the same fluid at the same temperature. A leg that has partially drained or is warmer than the other has a different head, and the transmitter reads a differential that is not there.',
      },
      { t: 'h2', text: 'The manifold' },
      {
        t: 'dl',
        items: [
          { term: 'Two-valve, pressure', def: 'A block valve to isolate the transmitter from the process and a vent or drain to release the pressure and bleed the line. The minimum for a gauge pressure transmitter.' },
          { term: 'Three-valve, differential', def: 'Two block valves, one per leg, and an equalizing valve between the legs. Opening the equalizer with one block closed puts the same pressure on both sides for a zero check without removing the transmitter.' },
          { term: 'Five-valve, differential', def: 'Three-valve plus a vent or drain on each leg, for bleeding the legs and for calibration connections. The standard for DP flow.' },
          { term: 'Operation order', def: 'Into service on a DP: open the high-side block, close the equalizer, open the low-side block. Out of service: close the low-side block, open the equalizer, close the high-side block. The order prevents a full differential across the transmitter during the transition.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A zero check with the equalizer open still needs full legs',
        text: 'Opening the equalizer puts the same pressure on both sides and the transmitter should read zero. If the legs contain different fluids or one has a bubble, the transmitter reads the difference in head even with the equalizer open, and the zero is wrong. Bleed the legs first, then equalize, then zero.',
      },
      { t: 'h2', text: 'Problems and fixes' },
      {
        t: 'table',
        head: ['Problem', 'Symptom', 'Fix'],
        rows: [
          ['Gas in a liquid leg', 'Reading low or unstable; changes when the line is tapped; recovers after bleeding', 'Bleed; re-route to slope continuously; add a high-point vent if the route cannot slope'],
          ['Condensate in a gas leg', 'Reading high or drifting; worse in cold weather', 'Drain; re-route to slope up; add a drip leg and drain at the low point'],
          ['Unequal legs on a DP', 'Standing differential with no flow; zero shifts with temperature', 'Bleed both legs; route them together; insulate them together'],
          ['Plugged tap or line', 'Reading slow or frozen; does not respond to process changes', 'Rod out or blow down; on dirty service, a seal or a purge'],
          ['Frozen line', 'Reading frozen in winter, often at full scale or zero', 'Heat trace and insulate; move the transmitter to a heated enclosure; a seal with a fill fluid rated for the temperature'],
          ['Leak at a fitting', 'Reading low; wet fitting; on gas, hissing', 'Tighten or remake the fitting; check the tubing for damage'],
          ['Line too long', 'Slow response; more places for the other problems', 'Shorten; move the transmitter to the tap'],
          ['Wrong tap location', 'Reads sediment or gas; noisy in turbulence', 'Relocate the tap to the side of the pipe, away from elbows and pumps'],
        ],
      },
      { t: 'h2', text: 'Diaphragm seals and purges' },
      {
        t: 'p',
        text: 'Where the process would plug, corrode, freeze, or contaminate an open impulse line, the line is replaced by a diaphragm seal: a flexible diaphragm at the tap, a capillary filled with a stable fluid, and the transmitter reading the fill fluid pressure. The process never enters the line. Seals bring their own rules: the fill fluid has a temperature and a specific gravity that affect the zero, the capillary length adds response time, and a damaged diaphragm is a transmitter that reads wrong without leaking. Alternatively, a purge of clean water or air flows continuously through the line into the process, keeping it clear; the purge flow rate is regulated and the pressure drop across the purge is part of the reading. Wastewater pressure and DP measurements are seal or purge applications almost without exception.',
      },
    ],
    faqs: [
      {
        q: 'Why does my DP flow meter read a flow at zero flow?',
        a: 'The two legs are not balanced: a bubble in one, condensate in one, one leg warmer than the other, or one partially drained. Close both blocks, open the equalizer, and check the zero; if it is off with the equalizer open, bleed the legs and repeat.',
      },
      {
        q: 'How long can an impulse line be?',
        a: 'As short as the installation allows, and rarely more than a few meters. Every meter adds volume, temperature effects, places for gas to collect, and response time. If the transmitter cannot be near the tap, a diaphragm seal with a capillary or a remote-mounted transmitter with a short line at the tap is better than a long line.',
      },
      {
        q: 'Should impulse lines be insulated?',
        a: 'Where they can freeze, yes, with heat tracing; where the two legs of a DP could reach different temperatures from sun or a nearby heat source, yes, together in one insulation. On a plain gauge pressure line indoors on water, no.',
      },
      {
        q: 'Can I use a pressure transmitter on a wastewater force main with an impulse line?',
        a: 'Not an open one; it plugs within days. A diaphragm seal flush-mounted at the tap, or a transmitter with an integral flush diaphragm and a full-bore isolation valve, is the standard. The seal is chosen with a diaphragm material for the service and a fill fluid for the temperature.',
      },
    ],
    related: [
      '/controls/instrumentation/pressure/pressure-transmitters',
      '/controls/instrumentation/flow/differential-pressure-flow',
      '/how-to/instrumentation-how-to/calibrate-a-pressure-transmitter',
      '/troubleshooting/instrumentation-troubleshooting/transmitter-reads-wrong-value',
      '/controls/instrumentation/level/hydrostatic-level',
    ],
  },
];
