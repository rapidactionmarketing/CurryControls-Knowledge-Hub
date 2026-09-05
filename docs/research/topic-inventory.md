# CurryControls.com topic inventory

Generated 2026-09-05 from the site's navigation data. Every path below is a real URL on https://www.currycontrols.com. Regenerate with `pnpm --filter @workspace/currycontrols run inventory` after a build.

| | Count |
|---|---|
| Taxonomy nodes | 530 |
| Pages with a written article | 29 |
| Hub (index) pages | 77 |
| **Placeholder pages that need an article** | **393** |
| Bespoke pages (rendered by the site itself) | 22 |
| Glossary terms | 125 |
| Calculators | 35 |
| Reference tables | 12 |

**How to read this.** `NEEDS CONTENT` is a page that exists, is linked from the menus, and has no article yet. Those are the research targets. `WRITTEN` already has an article; research there should extend or correct, not replace. `hub` is an index page generated from its children. `bespoke` is rendered by the site's own code (about, projects, article listings) and needs no article. The one-line summary under a title, where present, fixes that page's scope.

## Controls  `/controls`

The core disciplines of an industrial control system: the logic solver, the operator interface, the field devices that measure the process, and the panel that ties them together.

205 pages, **159 need content**.

- PLC Systems `hub` `/controls/plc-systems`
  Architecture, programming, analog control, communications, and troubleshooting for programmable logic controllers.
  - PLC Fundamentals `hub` `/controls/plc-systems/plc-fundamentals`
    How a programmable logic controller is built and how it executes.
    - What Is a PLC? `WRITTEN` `/controls/plc-systems/plc-fundamentals/what-is-a-plc`
      A programmable logic controller is a ruggedized industrial computer that reads inputs, solves a control program, and drives outputs on a repeating deterministic cycle.
    - PLC Architecture `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/plc-architecture`
      How a rack, a backplane, a processor, and I/O modules fit together.
    - CPU `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/cpu`
      The processor module: memory, execution, diagnostics, and mode switches.
    - Power Supplies `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/power-supplies`
      Sizing and backing up the DC power that keeps a controller and its I/O alive.
    - I/O Systems `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/io-systems`
      Discrete and analog modules, wiring topologies, and module diagnostics.
    - Memory `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/memory`
      Data tables, tags, addressing, and how memory is organized in a controller.
    - Scan Cycle `WRITTEN` `/controls/plc-systems/plc-fundamentals/scan-cycle`
      Read inputs, solve logic, write outputs, housekeeping — and why scan order determines what your logic actually does.
    - Tasks `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/tasks`
      Continuous, periodic, and event tasks, and how priority affects execution.
    - Watchdog `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/watchdog`
      The timer that faults a controller when a scan runs long.
    - Retentive Memory `NEEDS CONTENT` `/controls/plc-systems/plc-fundamentals/retentive-memory`
      What survives a power cycle, and how retentive data is backed up.
  - Programming `hub` `/controls/plc-systems/programming`
    The five IEC languages and the structures that make a program maintainable.
    - Ladder Logic `WRITTEN` `/controls/plc-systems/programming/ladder-logic`
      Rungs, contacts, coils, and the relay-logic conventions the language inherited.
    - Function Block Diagram `NEEDS CONTENT` `/controls/plc-systems/programming/function-block-diagram`
    - Structured Text `NEEDS CONTENT` `/controls/plc-systems/programming/structured-text`
    - Sequential Function Chart `NEEDS CONTENT` `/controls/plc-systems/programming/sequential-function-chart`
    - IEC 61131-3 `NEEDS CONTENT` `/controls/plc-systems/programming/iec-61131-3`
      The standard that defines the five PLC programming languages and the common elements behind them.
    - Program Organization `NEEDS CONTENT` `/controls/plc-systems/programming/program-organization`
      Routines, program organization units, and structuring code someone else can maintain.
    - State Machines `NEEDS CONTENT` `/controls/plc-systems/programming/state-machines`
      Writing sequences as explicit states instead of tangled interlock chains.
    - Sequencers `NEEDS CONTENT` `/controls/plc-systems/programming/sequencers`
      Step-based control for repeatable batch and startup sequences.
    - Interlocks `WRITTEN` `/controls/plc-systems/programming/interlocks`
      Conditions that stop or prevent an action, and where they belong in a program.
    - Permissives `NEEDS CONTENT` `/controls/plc-systems/programming/permissives`
      Conditions that must be true before an action is allowed to start.
    - Alarms `NEEDS CONTENT` `/controls/plc-systems/programming/alarms`
      Generating alarm conditions in the controller rather than in the graphics.
    - Control Strategies `NEEDS CONTENT` `/controls/plc-systems/programming/control-strategies`
      Choosing between on/off, sequenced, cascade, and closed-loop control.
  - Analog Control `hub` `/controls/plc-systems/analog-control`
    Getting a field measurement into a controller and acting on it correctly.
    - 4-20 mA `WRITTEN` `/controls/plc-systems/analog-control/4-20-ma`
      The two-wire current loop that carries most process measurements, why current beats voltage over distance, and how to read one with a meter.
    - Scaling `WRITTEN` `/controls/plc-systems/analog-control/scaling`
      Converting a raw analog count into an engineering unit the operator can act on.
    - Raw Counts `NEEDS CONTENT` `/controls/plc-systems/analog-control/raw-counts`
      What the analog-to-digital converter actually hands your program.
    - Engineering Units `NEEDS CONTENT` `/controls/plc-systems/analog-control/engineering-units`
      Choosing and documenting the units a tag carries.
    - PID `WRITTEN` `/controls/plc-systems/analog-control/pid`
      Proportional, integral, and derivative control applied to pumps, valves, and pressure loops.
    - Filtering `NEEDS CONTENT` `/controls/plc-systems/analog-control/filtering`
      Damping a noisy input without hiding a real process change.
    - Deadband `NEEDS CONTENT` `/controls/plc-systems/analog-control/deadband`
      Preventing output chatter around a setpoint.
    - Signal Validation `NEEDS CONTENT` `/controls/plc-systems/analog-control/signal-validation`
      Catching out-of-range, frozen, and failed analog inputs in logic.
  - Communications `hub` `/controls/plc-systems/communications`
    The protocols that move data between controllers, devices, and SCADA.
    - Modbus RTU `WRITTEN` `/controls/plc-systems/communications/modbus-rtu`
      Serial Modbus: registers, function codes, addressing, and the framing rules that trip people up.
    - Modbus TCP `WRITTEN` `/controls/plc-systems/communications/modbus-tcp`
      Modbus over Ethernet, unit IDs, and what changes when you leave RS-485 behind.
    - EtherNet/IP `NEEDS CONTENT` `/controls/plc-systems/communications/ethernet-ip`
      CIP over Ethernet: implicit I/O, explicit messaging, and RPI.
    - DNP3 `NEEDS CONTENT` `/controls/plc-systems/communications/dnp3`
      The utility protocol built for unsolicited reporting and time-stamped events.
    - OPC UA `NEEDS CONTENT` `/controls/plc-systems/communications/opc-ua`
      A modern, secure, platform-independent data exchange standard.
    - Serial Communications `NEEDS CONTENT` `/controls/plc-systems/communications/serial-communications`
      RS-232, RS-422, RS-485, biasing, termination, and cable practice.
    - Gateways `NEEDS CONTENT` `/controls/plc-systems/communications/gateways`
      Protocol converters, when they help, and the failure modes they add.
    - Remote I/O `NEEDS CONTENT` `/controls/plc-systems/communications/remote-i-o`
      Extending I/O to a remote panel or a remote site.
  - PLC Troubleshooting `hub` `/controls/plc-systems/plc-troubleshooting`
    Symptom-first diagnosis for a controller that is not behaving.
    - PLC Will Not Run `NEEDS CONTENT` `/controls/plc-systems/plc-troubleshooting/plc-will-not-run`
    - I/O Not Updating `NEEDS CONTENT` `/controls/plc-systems/plc-troubleshooting/i-o-not-updating`
    - Communication Failures `NEEDS CONTENT` `/controls/plc-systems/plc-troubleshooting/communication-failures`
    - Analog Signal Problems `NEEDS CONTENT` `/controls/plc-systems/plc-troubleshooting/analog-signal-problems`
    - Program Faults `NEEDS CONTENT` `/controls/plc-systems/plc-troubleshooting/program-faults`
    - Watchdog Faults `NEEDS CONTENT` `/controls/plc-systems/plc-troubleshooting/watchdog-faults`
    - Network Problems `NEEDS CONTENT` `/controls/plc-systems/plc-troubleshooting/network-problems`
  - Platforms `hub` `/controls/plc-systems/platforms`
    Platform-specific notes. Vendor names are used for identification only.
    - Schneider Electric `hub` `/controls/plc-systems/platforms/schneider-electric`
      - Modicon M340 `NEEDS CONTENT` `/controls/plc-systems/platforms/schneider-electric/modicon-m340`
      - Modicon M580 `NEEDS CONTENT` `/controls/plc-systems/platforms/schneider-electric/modicon-m580`
      - Control Expert `NEEDS CONTENT` `/controls/plc-systems/platforms/schneider-electric/control-expert`
      - Unity Pro `NEEDS CONTENT` `/controls/plc-systems/platforms/schneider-electric/unity-pro`
    - Rockwell Automation `hub` `/controls/plc-systems/platforms/rockwell-automation`
      - ControlLogix `NEEDS CONTENT` `/controls/plc-systems/platforms/rockwell-automation/controllogix`
      - CompactLogix `NEEDS CONTENT` `/controls/plc-systems/platforms/rockwell-automation/compactlogix`
      - Studio 5000 `NEEDS CONTENT` `/controls/plc-systems/platforms/rockwell-automation/studio-5000`
    - Siemens `NEEDS CONTENT` `/controls/plc-systems/platforms/siemens`
    - AutomationDirect `NEEDS CONTENT` `/controls/plc-systems/platforms/automationdirect`
    - Legacy Systems `NEEDS CONTENT` `/controls/plc-systems/platforms/legacy-systems`
      Keeping older controllers running and planning a migration.
- SCADA & HMI `hub` `/controls/scada-hmi`
  Supervisory control, operator interface design, alarm management, and historian data.
  - SCADA Fundamentals `hub` `/controls/scada-hmi/scada-fundamentals`
    What a SCADA system is made of and how the pieces relate.
    - What Is SCADA? `WRITTEN` `/controls/scada-hmi/scada-fundamentals/what-is-scada`
      Supervisory control and data acquisition: the layer that watches, records, and lets an operator intervene.
    - SCADA Architecture `NEEDS CONTENT` `/controls/scada-hmi/scada-fundamentals/scada-architecture`
      Servers, clients, historians, and the paths data takes to reach them.
    - Servers `NEEDS CONTENT` `/controls/scada-hmi/scada-fundamentals/servers`
    - Clients `NEEDS CONTENT` `/controls/scada-hmi/scada-fundamentals/clients`
    - Historians `NEEDS CONTENT` `/controls/scada-hmi/scada-fundamentals/historians`
    - Alarm Servers `NEEDS CONTENT` `/controls/scada-hmi/scada-fundamentals/alarm-servers`
    - SCADA Communications `NEEDS CONTENT` `/controls/scada-hmi/scada-fundamentals/scada-communications`
    - Redundancy `NEEDS CONTENT` `/controls/scada-hmi/scada-fundamentals/redundancy`
  - HMI Design `hub` `/controls/scada-hmi/hmi-design`
    Building operator displays people can actually run a plant from.
    - ISA-101 `NEEDS CONTENT` `/controls/scada-hmi/hmi-design/isa-101`
      The human-machine interface standard: lifecycle, style guides, and design consistency.
    - High Performance HMI `WRITTEN` `/controls/scada-hmi/hmi-design/high-performance-hmi`
      Grey backgrounds, reserved color, and displays built for detecting abnormal conditions rather than decoration.
    - Navigation `NEEDS CONTENT` `/controls/scada-hmi/hmi-design/navigation`
    - Colors `NEEDS CONTENT` `/controls/scada-hmi/hmi-design/colors`
    - Alarm Indication `NEEDS CONTENT` `/controls/scada-hmi/hmi-design/alarm-indication`
    - Situational Awareness `NEEDS CONTENT` `/controls/scada-hmi/hmi-design/situational-awareness`
    - Faceplates `NEEDS CONTENT` `/controls/scada-hmi/hmi-design/faceplates`
    - Trends `NEEDS CONTENT` `/controls/scada-hmi/hmi-design/trends`
  - Alarm Management `hub` `/controls/scada-hmi/alarm-management`
    Making an alarm system that operators trust instead of silence.
    - Alarm Philosophy `NEEDS CONTENT` `/controls/scada-hmi/alarm-management/alarm-philosophy`
      The document that decides what is allowed to become an alarm.
    - ISA-18.2 `WRITTEN` `/controls/scada-hmi/alarm-management/isa-18-2`
      The alarm management lifecycle standard, from philosophy through monitoring.
    - Alarm Priority `NEEDS CONTENT` `/controls/scada-hmi/alarm-management/alarm-priority`
    - Rationalization `NEEDS CONTENT` `/controls/scada-hmi/alarm-management/rationalization`
    - Shelving `NEEDS CONTENT` `/controls/scada-hmi/alarm-management/shelving`
    - Suppression `NEEDS CONTENT` `/controls/scada-hmi/alarm-management/suppression`
    - Alarm Floods `NEEDS CONTENT` `/controls/scada-hmi/alarm-management/alarm-floods`
    - Notification `NEEDS CONTENT` `/controls/scada-hmi/alarm-management/notification`
  - Historian & Data `hub` `/controls/scada-hmi/historian-data`
    Collecting, compressing, and retrieving process history.
    - Historian Architecture `NEEDS CONTENT` `/controls/scada-hmi/historian-data/historian-architecture`
    - Data Collection `NEEDS CONTENT` `/controls/scada-hmi/historian-data/data-collection`
    - Compression `NEEDS CONTENT` `/controls/scada-hmi/historian-data/compression`
    - Trending `NEEDS CONTENT` `/controls/scada-hmi/historian-data/trending`
    - Reporting `NEEDS CONTENT` `/controls/scada-hmi/historian-data/reporting`
    - Long-Term Storage `NEEDS CONTENT` `/controls/scada-hmi/historian-data/long-term-storage`
    - SQL Integration `NEEDS CONTENT` `/controls/scada-hmi/historian-data/sql-integration`
  - SCADA Platforms `hub` `/controls/scada-hmi/scada-platforms`
    Platform notes. Vendor names are used for identification only.
    - VTScada `NEEDS CONTENT` `/controls/scada-hmi/scada-platforms/vtscada`
    - Ignition `NEEDS CONTENT` `/controls/scada-hmi/scada-platforms/ignition`
    - GE iFIX `NEEDS CONTENT` `/controls/scada-hmi/scada-platforms/ge-ifix`
    - AVEVA `NEEDS CONTENT` `/controls/scada-hmi/scada-platforms/aveva`
    - Rockwell FactoryTalk `NEEDS CONTENT` `/controls/scada-hmi/scada-platforms/rockwell-factorytalk`
    - Schneider SCADA `NEEDS CONTENT` `/controls/scada-hmi/scada-platforms/schneider-scada`
    - Other Platforms `NEEDS CONTENT` `/controls/scada-hmi/scada-platforms/other-platforms`
  - SCADA Troubleshooting `hub` `/controls/scada-hmi/scada-troubleshooting`
    What to check when the screen stops matching the plant.
    - Frozen Values `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/frozen-values`
    - Lost Communications `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/lost-communications`
    - Bad Quality `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/bad-quality`
    - Server Failure `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/server-failure`
    - Client Problems `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/client-problems`
    - Historian Problems `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/historian-problems`
    - Alarm Problems `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/alarm-problems`
    - Time Synchronization `NEEDS CONTENT` `/controls/scada-hmi/scada-troubleshooting/time-synchronization`
- Instrumentation `hub` `/controls/instrumentation`
  Flow, level, pressure, and analytical measurement — selection, installation, signals, and calibration.
  - Flow `hub` `/controls/instrumentation/flow`
    Measuring flow in pipes and open channels.
    - Magnetic Flowmeters `WRITTEN` `/controls/instrumentation/flow/magnetic-flowmeters`
      How a mag meter works, where it fits, and the conductivity and grounding rules that decide whether it reads.
    - Ultrasonic Flow `NEEDS CONTENT` `/controls/instrumentation/flow/ultrasonic-flow`
    - Differential Pressure Flow `NEEDS CONTENT` `/controls/instrumentation/flow/differential-pressure-flow`
    - Open Channel Flow `NEEDS CONTENT` `/controls/instrumentation/flow/open-channel-flow`
    - Flow Installation `NEEDS CONTENT` `/controls/instrumentation/flow/flow-installation`
    - Flow Troubleshooting `NEEDS CONTENT` `/controls/instrumentation/flow/flow-troubleshooting`
  - Level `hub` `/controls/instrumentation/level`
    Tank, wet well, and vessel level measurement.
    - Radar Level `WRITTEN` `/controls/instrumentation/level/radar-level`
      Non-contact and guided-wave radar, and why it tolerates a wet well better than most alternatives.
    - Ultrasonic Level `NEEDS CONTENT` `/controls/instrumentation/level/ultrasonic-level`
    - Hydrostatic Level `NEEDS CONTENT` `/controls/instrumentation/level/hydrostatic-level`
    - Differential Pressure Level `NEEDS CONTENT` `/controls/instrumentation/level/differential-pressure-level`
    - Floats `NEEDS CONTENT` `/controls/instrumentation/level/floats`
    - Wet Well Level `NEEDS CONTENT` `/controls/instrumentation/level/wet-well-level`
      The measurement that runs a lift station, and the failure modes that flood one.
    - Level Troubleshooting `NEEDS CONTENT` `/controls/instrumentation/level/level-troubleshooting`
  - Pressure `hub` `/controls/instrumentation/pressure`
    Gauge, absolute, and differential pressure measurement.
    - Pressure Transmitters `NEEDS CONTENT` `/controls/instrumentation/pressure/pressure-transmitters`
    - Differential Pressure `NEEDS CONTENT` `/controls/instrumentation/pressure/differential-pressure`
    - Pressure Installation `NEEDS CONTENT` `/controls/instrumentation/pressure/pressure-installation`
    - Impulse Lines `NEEDS CONTENT` `/controls/instrumentation/pressure/impulse-lines`
    - Pressure Calibration `NEEDS CONTENT` `/controls/instrumentation/pressure/pressure-calibration`
  - Analytical `hub` `/controls/instrumentation/analytical`
    Water quality instrumentation and the maintenance it demands.
    - pH `NEEDS CONTENT` `/controls/instrumentation/analytical/ph`
    - ORP `NEEDS CONTENT` `/controls/instrumentation/analytical/orp`
    - Chlorine `NEEDS CONTENT` `/controls/instrumentation/analytical/chlorine`
    - Turbidity `NEEDS CONTENT` `/controls/instrumentation/analytical/turbidity`
    - Conductivity `NEEDS CONTENT` `/controls/instrumentation/analytical/conductivity`
    - Dissolved Oxygen `NEEDS CONTENT` `/controls/instrumentation/analytical/dissolved-oxygen`
    - Ammonia `NEEDS CONTENT` `/controls/instrumentation/analytical/ammonia`
    - Nitrate `NEEDS CONTENT` `/controls/instrumentation/analytical/nitrate`
  - Signals `hub` `/controls/instrumentation/signals`
    What actually travels on the wire, and what corrupts it.
    - 4-20 mA Signals `NEEDS CONTENT` `/controls/instrumentation/signals/4-20-ma-signals`
      The current loop from the instrument side: wiring, power, and loop checks.
    - HART `NEEDS CONTENT` `/controls/instrumentation/signals/hart`
      Digital data riding on the 4-20 mA loop.
    - Pulse `NEEDS CONTENT` `/controls/instrumentation/signals/pulse`
    - Frequency `NEEDS CONTENT` `/controls/instrumentation/signals/frequency`
    - Digital Signals `NEEDS CONTENT` `/controls/instrumentation/signals/digital-signals`
    - Signal Isolation `NEEDS CONTENT` `/controls/instrumentation/signals/signal-isolation`
    - Ground Loops `WRITTEN` `/controls/instrumentation/signals/ground-loops`
      Two grounds, one loop, and a reading that will not sit still.
    - Surge Protection `NEEDS CONTENT` `/controls/instrumentation/signals/surge-protection`
  - Calibration `hub` `/controls/instrumentation/calibration`
    Proving an instrument reads correctly and recording that you did.
    - Calibration Procedures `NEEDS CONTENT` `/controls/instrumentation/calibration/calibration-procedures`
    - Loop Checks `NEEDS CONTENT` `/controls/instrumentation/calibration/loop-checks`
    - Calibration Documentation `NEEDS CONTENT` `/controls/instrumentation/calibration/calibration-documentation`
    - Calibration Troubleshooting `NEEDS CONTENT` `/controls/instrumentation/calibration/calibration-troubleshooting`
- Control Panels `hub` `/controls/control-panels`
  UL 508A design, pump and PLC panels, component selection, and panel troubleshooting.
  - Panel Design `hub` `/controls/control-panels/panel-design`
    Designing a panel that passes inspection and survives the field.
    - UL 508A `WRITTEN` `/controls/control-panels/panel-design/ul-508a`
      The industrial control panel standard: what the listing covers and what the label requires.
    - UL 698A `NEEDS CONTENT` `/controls/control-panels/panel-design/ul-698a`
      Industrial control panels for hazardous locations.
    - NFPA 70 `NEEDS CONTENT` `/controls/control-panels/panel-design/nfpa-70`
      National Electrical Code requirements that reach into a control panel.
    - SCCR `NEEDS CONTENT` `/controls/control-panels/panel-design/sccr`
      Short-circuit current rating: how it is determined and why the label number is not optional.
    - Enclosure Selection `NEEDS CONTENT` `/controls/control-panels/panel-design/enclosure-selection`
    - Heat Calculations `NEEDS CONTENT` `/controls/control-panels/panel-design/heat-calculations`
    - Component Layout `NEEDS CONTENT` `/controls/control-panels/panel-design/component-layout`
    - Wireways `NEEDS CONTENT` `/controls/control-panels/panel-design/wireways`
    - Terminals `NEEDS CONTENT` `/controls/control-panels/panel-design/terminals`
  - PLC Panels `hub` `/controls/control-panels/plc-panels`
    The control section of a panel around a programmable controller.
    - PLC Power `NEEDS CONTENT` `/controls/control-panels/plc-panels/plc-power`
    - Panel I/O `NEEDS CONTENT` `/controls/control-panels/plc-panels/panel-i-o`
    - Relays `NEEDS CONTENT` `/controls/control-panels/plc-panels/relays`
    - Isolation `NEEDS CONTENT` `/controls/control-panels/plc-panels/isolation`
    - Panel Surge Protection `NEEDS CONTENT` `/controls/control-panels/plc-panels/panel-surge-protection`
    - Panel Networking `NEEDS CONTENT` `/controls/control-panels/plc-panels/panel-networking`
  - Pump Panels `hub` `/controls/control-panels/pump-panels`
    Pump control panels for water, wastewater, and booster service.
    - Duplex `NEEDS CONTENT` `/controls/control-panels/pump-panels/duplex`
    - Triplex `NEEDS CONTENT` `/controls/control-panels/pump-panels/triplex`
    - Lead/Lag `WRITTEN` `/controls/control-panels/pump-panels/lead-lag`
      Which pump runs first, when the second one joins, and how they trade places.
    - HOA `NEEDS CONTENT` `/controls/control-panels/pump-panels/hoa`
      Hand-Off-Auto selector wiring and what the PLC should and should not see.
    - VFD `NEEDS CONTENT` `/controls/control-panels/pump-panels/vfd`
    - Soft Starters `NEEDS CONTENT` `/controls/control-panels/pump-panels/soft-starters`
    - Alternation `NEEDS CONTENT` `/controls/control-panels/pump-panels/alternation`
  - Panel Components `hub` `/controls/control-panels/panel-components`
    What goes in the enclosure and how to select it.
    - Circuit Breakers `NEEDS CONTENT` `/controls/control-panels/panel-components/circuit-breakers`
    - Fuses `NEEDS CONTENT` `/controls/control-panels/panel-components/fuses`
    - Panel Power Supplies `NEEDS CONTENT` `/controls/control-panels/panel-components/panel-power-supplies`
    - Control Relays `NEEDS CONTENT` `/controls/control-panels/panel-components/control-relays`
    - Terminal Blocks `NEEDS CONTENT` `/controls/control-panels/panel-components/terminal-blocks`
    - Surge Devices `NEEDS CONTENT` `/controls/control-panels/panel-components/surge-devices`
    - UPS `NEEDS CONTENT` `/controls/control-panels/panel-components/ups`
    - Network Switches `NEEDS CONTENT` `/controls/control-panels/panel-components/network-switches`
  - Panel Troubleshooting `hub` `/controls/control-panels/panel-troubleshooting`
    Working a dead or misbehaving panel methodically.
    - No Control Power `NEEDS CONTENT` `/controls/control-panels/panel-troubleshooting/no-control-power`
    - Blown Fuses `NEEDS CONTENT` `/controls/control-panels/panel-troubleshooting/blown-fuses`
    - Relay Problems `NEEDS CONTENT` `/controls/control-panels/panel-troubleshooting/relay-problems`
    - Ground Faults `NEEDS CONTENT` `/controls/control-panels/panel-troubleshooting/ground-faults`
    - Noise Problems `NEEDS CONTENT` `/controls/control-panels/panel-troubleshooting/noise-problems`
    - Failed Power Supplies `NEEDS CONTENT` `/controls/control-panels/panel-troubleshooting/failed-power-supplies`
    - Panel PLC Faults `NEEDS CONTENT` `/controls/control-panels/panel-troubleshooting/panel-plc-faults`

## Water & Wastewater  `/water-wastewater`

Municipal water and wastewater is where most of this control work lands. Process context first, then the control strategy that serves it.

56 pages, **45 need content**.

- Water Systems `hub` `/water-wastewater/water-systems`
  Potable water treatment, pumping, storage, and membrane systems.
  - Water Treatment `hub` `/water-wastewater/water-systems/water-treatment`
    From the source to the distribution system, and the controls at each step.
    - Raw Water `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/raw-water`
    - Wells `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/wells`
    - Aeration `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/aeration`
    - Filtration `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/filtration`
    - Chemical Feed `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/chemical-feed`
    - Disinfection `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/disinfection`
    - Storage `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/storage`
    - High Service Pumping `NEEDS CONTENT` `/water-wastewater/water-systems/water-treatment/high-service-pumping`
  - Water Pumping `hub` `/water-wastewater/water-systems/water-pumping`
    Moving potable water from the source to the tap.
    - Well Pumps `NEEDS CONTENT` `/water-wastewater/water-systems/water-pumping/well-pumps`
    - High Service Pumps `NEEDS CONTENT` `/water-wastewater/water-systems/water-pumping/high-service-pumps`
    - Booster Pumps `NEEDS CONTENT` `/water-wastewater/water-systems/water-pumping/booster-pumps`
    - VFD Control `NEEDS CONTENT` `/water-wastewater/water-systems/water-pumping/vfd-control`
      Variable speed pumping and where it earns its cost.
    - Pressure Control `NEEDS CONTENT` `/water-wastewater/water-systems/water-pumping/pressure-control`
      Holding discharge pressure on a distribution system without hunting.
    - Flow Control `NEEDS CONTENT` `/water-wastewater/water-systems/water-pumping/flow-control`
  - Storage `hub` `/water-wastewater/water-systems/storage`
    Ground and elevated storage, level control, and turnover.
    - Ground Storage Tanks `NEEDS CONTENT` `/water-wastewater/water-systems/storage/ground-storage-tanks`
    - Elevated Tanks `NEEDS CONTENT` `/water-wastewater/water-systems/storage/elevated-tanks`
    - Tank Level Control `NEEDS CONTENT` `/water-wastewater/water-systems/storage/tank-level-control`
      Level-driven fill and draw control, and the setpoints that keep a tank turning over.
    - Pump Sequencing `NEEDS CONTENT` `/water-wastewater/water-systems/storage/pump-sequencing`
  - Membrane Treatment `hub` `/water-wastewater/water-systems/membrane-treatment`
    RO and NF skids, their instrumentation, and their control sequences.
    - Reverse Osmosis `NEEDS CONTENT` `/water-wastewater/water-systems/membrane-treatment/reverse-osmosis`
    - Nanofiltration `NEEDS CONTENT` `/water-wastewater/water-systems/membrane-treatment/nanofiltration`
    - Membrane Control `NEEDS CONTENT` `/water-wastewater/water-systems/membrane-treatment/membrane-control`
    - CIP `NEEDS CONTENT` `/water-wastewater/water-systems/membrane-treatment/cip`
    - Feed Pumps `NEEDS CONTENT` `/water-wastewater/water-systems/membrane-treatment/feed-pumps`
    - Concentrate Systems `NEEDS CONTENT` `/water-wastewater/water-systems/membrane-treatment/concentrate-systems`
- Wastewater Systems `hub` `/water-wastewater/wastewater-systems`
  Lift stations, treatment processes, and wastewater pump control.
  - Lift Stations `hub` `/water-wastewater/wastewater-systems/lift-stations`
    Collection system pump stations, the most common controls asset a utility owns.
    - Duplex Lift Stations `WRITTEN` `/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations`
      The two-pump station that makes up most of a collection system, start to finish.
    - Triplex Lift Stations `NEEDS CONTENT` `/water-wastewater/wastewater-systems/lift-stations/triplex-lift-stations`
    - Wet Well Control `WRITTEN` `/water-wastewater/wastewater-systems/lift-stations/wet-well-control`
      Level setpoints, pump start and stop bands, and keeping the wet well from turning septic.
    - Lift Station Lead/Lag `NEEDS CONTENT` `/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag`
    - Lift Station Alternation `NEEDS CONTENT` `/water-wastewater/wastewater-systems/lift-stations/lift-station-alternation`
    - High Level `NEEDS CONTENT` `/water-wastewater/wastewater-systems/lift-stations/high-level`
    - Backup Control `NEEDS CONTENT` `/water-wastewater/wastewater-systems/lift-stations/backup-control`
    - Generator Operation `NEEDS CONTENT` `/water-wastewater/wastewater-systems/lift-stations/generator-operation`
    - Lift Station SCADA `NEEDS CONTENT` `/water-wastewater/wastewater-systems/lift-stations/lift-station-scada`
      Getting a remote station onto the SCADA system and keeping it there.
  - Wastewater Treatment `hub` `/water-wastewater/wastewater-systems/wastewater-treatment`
    Plant processes and the control strategies that run them.
    - Headworks `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/headworks`
    - Aeration Control `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/aeration-control`
    - Biological Treatment `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/biological-treatment`
    - Clarifiers `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/clarifiers`
    - RAS/WAS `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/ras-was`
    - Chemical Systems `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/chemical-systems`
    - Effluent Disinfection `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/effluent-disinfection`
    - Effluent `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/effluent`
    - Residuals `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-treatment/residuals`
  - Wastewater Pump Control `hub` `/water-wastewater/wastewater-systems/wastewater-pump-control`
    How the pumps are actually commanded.
    - Constant Speed `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-pump-control/constant-speed`
    - VFD Pump Control `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-pump-control/vfd-pump-control`
    - Level PID `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-pump-control/level-pid`
      Holding a wet well level with a variable speed pump instead of bang-bang control.
    - Station Flow Control `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-pump-control/station-flow-control`
    - Pump Sequencing Strategies `NEEDS CONTENT` `/water-wastewater/wastewater-systems/wastewater-pump-control/pump-sequencing-strategies`

## Troubleshooting  `/troubleshooting`

Organized by symptom, not by product. Start with what you can observe, work through what to check first, and narrow it down without guessing.

97 pages, **79 need content**.

- PLC Troubleshooting `hub` `/troubleshooting/plc-troubleshooting`
  - Processor Faulted `NEEDS CONTENT` `/troubleshooting/plc-troubleshooting/processor-faulted`
  - Outputs Not Energizing `NEEDS CONTENT` `/troubleshooting/plc-troubleshooting/outputs-not-energizing`
  - Inputs Not Reading `NEEDS CONTENT` `/troubleshooting/plc-troubleshooting/inputs-not-reading`
  - Logic Not Executing As Expected `NEEDS CONTENT` `/troubleshooting/plc-troubleshooting/logic-not-executing-as-expected`
  - Program Will Not Download `NEEDS CONTENT` `/troubleshooting/plc-troubleshooting/program-will-not-download`
  - Retentive Data Lost `NEEDS CONTENT` `/troubleshooting/plc-troubleshooting/retentive-data-lost`
- SCADA Troubleshooting `hub` `/troubleshooting/scada-troubleshooting`
  - Values Frozen On Screen `NEEDS CONTENT` `/troubleshooting/scada-troubleshooting/values-frozen-on-screen`
  - Tag Shows Bad Quality `NEEDS CONTENT` `/troubleshooting/scada-troubleshooting/tag-shows-bad-quality`
  - Alarms Not Annunciating `NEEDS CONTENT` `/troubleshooting/scada-troubleshooting/alarms-not-annunciating`
  - Trend Gaps `NEEDS CONTENT` `/troubleshooting/scada-troubleshooting/trend-gaps`
  - Client Cannot Connect `NEEDS CONTENT` `/troubleshooting/scada-troubleshooting/client-cannot-connect`
  - Duplicate Or Missing History `NEEDS CONTENT` `/troubleshooting/scada-troubleshooting/duplicate-or-missing-history`
- Instrumentation Troubleshooting `hub` `/troubleshooting/instrumentation-troubleshooting`
  - 4-20 mA Signal Unstable `WRITTEN` `/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable`
    An analog reading that will not settle, and how to separate a process swing from a wiring problem.
  - Transmitter Reads Wrong Value `NEEDS CONTENT` `/troubleshooting/instrumentation-troubleshooting/transmitter-reads-wrong-value`
  - Signal Pegged High Or Low `NEEDS CONTENT` `/troubleshooting/instrumentation-troubleshooting/signal-pegged-high-or-low`
  - Level Reading Jumps `NEEDS CONTENT` `/troubleshooting/instrumentation-troubleshooting/level-reading-jumps`
  - Analog Does Not Match Field Indicator `NEEDS CONTENT` `/troubleshooting/instrumentation-troubleshooting/analog-does-not-match-field-indicator`
  - Loop Powers Up But Reads Zero `NEEDS CONTENT` `/troubleshooting/instrumentation-troubleshooting/loop-powers-up-but-reads-zero`
- Communications Troubleshooting `hub` `/troubleshooting/communications-troubleshooting`
  - Modbus Device Intermittently Offline `WRITTEN` `/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline`
    Framing, timing, addressing, and termination on a bus that mostly works.
  - Device Times Out `NEEDS CONTENT` `/troubleshooting/communications-troubleshooting/device-times-out`
  - Read Works But Write Fails `NEEDS CONTENT` `/troubleshooting/communications-troubleshooting/read-works-but-write-fails`
  - Wrong Register Data `NEEDS CONTENT` `/troubleshooting/communications-troubleshooting/wrong-register-data`
  - Protocol Gateway Stops Passing Data `NEEDS CONTENT` `/troubleshooting/communications-troubleshooting/protocol-gateway-stops-passing-data`
- Network Troubleshooting `hub` `/troubleshooting/network-troubleshooting`
  - Ethernet Device Drops Offline `WRITTEN` `/troubleshooting/network-troubleshooting/ethernet-device-drops-offline`
    Duplex mismatch, cabling, spanning tree, and the switch counters that give it away.
  - Intermittent Packet Loss `NEEDS CONTENT` `/troubleshooting/network-troubleshooting/intermittent-packet-loss`
  - Cannot Ping Across VLANs `NEEDS CONTENT` `/troubleshooting/network-troubleshooting/cannot-ping-across-vlans`
  - Duplicate IP Address `NEEDS CONTENT` `/troubleshooting/network-troubleshooting/duplicate-ip-address`
  - Switch Port Errors Incrementing `NEEDS CONTENT` `/troubleshooting/network-troubleshooting/switch-port-errors-incrementing`
  - Broadcast Storm `NEEDS CONTENT` `/troubleshooting/network-troubleshooting/broadcast-storm`
- Control Panel Troubleshooting `hub` `/troubleshooting/control-panel-troubleshooting`
  - No Control Power In Panel `NEEDS CONTENT` `/troubleshooting/control-panel-troubleshooting/no-control-power-in-panel`
  - Fuse Blows Repeatedly `NEEDS CONTENT` `/troubleshooting/control-panel-troubleshooting/fuse-blows-repeatedly`
  - Relay Chatter `NEEDS CONTENT` `/troubleshooting/control-panel-troubleshooting/relay-chatter`
  - Ground Fault Present `NEEDS CONTENT` `/troubleshooting/control-panel-troubleshooting/ground-fault-present`
  - Panel Overheating `NEEDS CONTENT` `/troubleshooting/control-panel-troubleshooting/panel-overheating`
  - Nuisance Breaker Trips `NEEDS CONTENT` `/troubleshooting/control-panel-troubleshooting/nuisance-breaker-trips`
- VFD Troubleshooting `hub` `/troubleshooting/vfd-troubleshooting`
  - Drive Faults On Overcurrent `NEEDS CONTENT` `/troubleshooting/vfd-troubleshooting/drive-faults-on-overcurrent`
  - Drive Faults On Overvoltage `NEEDS CONTENT` `/troubleshooting/vfd-troubleshooting/drive-faults-on-overvoltage`
  - Motor Will Not Reach Speed `NEEDS CONTENT` `/troubleshooting/vfd-troubleshooting/motor-will-not-reach-speed`
  - Drive Causes Instrument Noise `NEEDS CONTENT` `/troubleshooting/vfd-troubleshooting/drive-causes-instrument-noise`
  - Drive Will Not Start In Auto `NEEDS CONTENT` `/troubleshooting/vfd-troubleshooting/drive-will-not-start-in-auto`
  - Drive Trips On Ground Fault `NEEDS CONTENT` `/troubleshooting/vfd-troubleshooting/drive-trips-on-ground-fault`
- Pump Troubleshooting `hub` `/troubleshooting/pump-troubleshooting`
  - Pump Will Not Start `NEEDS CONTENT` `/troubleshooting/pump-troubleshooting/pump-will-not-start`
  - Pump Short Cycles `NEEDS CONTENT` `/troubleshooting/pump-troubleshooting/pump-short-cycles`
  - Pump Runs But No Flow `NEEDS CONTENT` `/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow`
  - Pump Loses Prime `NEEDS CONTENT` `/troubleshooting/pump-troubleshooting/pump-loses-prime`
  - Seal Failure Alarm `NEEDS CONTENT` `/troubleshooting/pump-troubleshooting/seal-failure-alarm`
  - Both Pumps Running Constantly `NEEDS CONTENT` `/troubleshooting/pump-troubleshooting/both-pumps-running-constantly`
- Valve Troubleshooting `hub` `/troubleshooting/valve-troubleshooting`
  - Valve Will Not Reach Position `NEEDS CONTENT` `/troubleshooting/valve-troubleshooting/valve-will-not-reach-position`
  - Valve Hunting `NEEDS CONTENT` `/troubleshooting/valve-troubleshooting/valve-hunting`
  - Valve Slow To Respond `NEEDS CONTENT` `/troubleshooting/valve-troubleshooting/valve-slow-to-respond`
  - Position Feedback Wrong `NEEDS CONTENT` `/troubleshooting/valve-troubleshooting/position-feedback-wrong`
  - Actuator Torque Fault `NEEDS CONTENT` `/troubleshooting/valve-troubleshooting/actuator-torque-fault`
- Radio Troubleshooting `hub` `/troubleshooting/radio-troubleshooting`
  - Remote Site Stops Communicating `NEEDS CONTENT` `/troubleshooting/radio-troubleshooting/remote-site-stops-communicating`
  - Intermittent Radio Path `NEEDS CONTENT` `/troubleshooting/radio-troubleshooting/intermittent-radio-path`
  - High Retry Count `NEEDS CONTENT` `/troubleshooting/radio-troubleshooting/high-retry-count`
  - Poor Signal Margin `NEEDS CONTENT` `/troubleshooting/radio-troubleshooting/poor-signal-margin`
  - Interference On Channel `NEEDS CONTENT` `/troubleshooting/radio-troubleshooting/interference-on-channel`
- Fiber Troubleshooting `hub` `/troubleshooting/fiber-troubleshooting`
  - Fiber Link Down `NEEDS CONTENT` `/troubleshooting/fiber-troubleshooting/fiber-link-down`
  - High Optical Loss `NEEDS CONTENT` `/troubleshooting/fiber-troubleshooting/high-optical-loss`
  - Intermittent Fiber Link `NEEDS CONTENT` `/troubleshooting/fiber-troubleshooting/intermittent-fiber-link`
  - Wrong Fiber Type Or Wavelength `NEEDS CONTENT` `/troubleshooting/fiber-troubleshooting/wrong-fiber-type-or-wavelength`
  - Dirty Or Damaged Connector `NEEDS CONTENT` `/troubleshooting/fiber-troubleshooting/dirty-or-damaged-connector`
- Cellular Troubleshooting `hub` `/troubleshooting/cellular-troubleshooting`
  - Cellular Modem Will Not Register `NEEDS CONTENT` `/troubleshooting/cellular-troubleshooting/cellular-modem-will-not-register`
  - Frequent Reconnects `NEEDS CONTENT` `/troubleshooting/cellular-troubleshooting/frequent-reconnects`
  - Data Plan Or APN Problems `NEEDS CONTENT` `/troubleshooting/cellular-troubleshooting/data-plan-or-apn-problems`
  - VPN Tunnel Drops `NEEDS CONTENT` `/troubleshooting/cellular-troubleshooting/vpn-tunnel-drops`
  - Weak Cellular Signal `NEEDS CONTENT` `/troubleshooting/cellular-troubleshooting/weak-cellular-signal`
- Power Troubleshooting `hub` `/troubleshooting/power-troubleshooting`
  - Loss Of Control Voltage `NEEDS CONTENT` `/troubleshooting/power-troubleshooting/loss-of-control-voltage`
  - Power Supply Failure `NEEDS CONTENT` `/troubleshooting/power-troubleshooting/power-supply-failure`
  - UPS Not Carrying Load `NEEDS CONTENT` `/troubleshooting/power-troubleshooting/ups-not-carrying-load`
  - Voltage Sag On Motor Start `NEEDS CONTENT` `/troubleshooting/power-troubleshooting/voltage-sag-on-motor-start`
  - Generator Transfer Problems `NEEDS CONTENT` `/troubleshooting/power-troubleshooting/generator-transfer-problems`
- Grounding Troubleshooting `hub` `/troubleshooting/grounding-troubleshooting`
  - Ground Loop Symptoms `NEEDS CONTENT` `/troubleshooting/grounding-troubleshooting/ground-loop-symptoms`
  - Floating Reference Between Panels `NEEDS CONTENT` `/troubleshooting/grounding-troubleshooting/floating-reference-between-panels`
  - Shield Grounded At Both Ends `NEEDS CONTENT` `/troubleshooting/grounding-troubleshooting/shield-grounded-at-both-ends`
  - Missing Equipment Ground `NEEDS CONTENT` `/troubleshooting/grounding-troubleshooting/missing-equipment-ground`
  - High Neutral To Ground Voltage `NEEDS CONTENT` `/troubleshooting/grounding-troubleshooting/high-neutral-to-ground-voltage`
- Noise & Interference `hub` `/troubleshooting/noise-interference`
  - VFD Noise On Analog Signals `NEEDS CONTENT` `/troubleshooting/noise-interference/vfd-noise-on-analog-signals`
  - Radio Frequency Interference `NEEDS CONTENT` `/troubleshooting/noise-interference/radio-frequency-interference`
  - Common Mode Noise `NEEDS CONTENT` `/troubleshooting/noise-interference/common-mode-noise`
  - Cable Routing Problems `NEEDS CONTENT` `/troubleshooting/noise-interference/cable-routing-problems`
  - Unshielded Cable In A Noisy Run `NEEDS CONTENT` `/troubleshooting/noise-interference/unshielded-cable-in-a-noisy-run`

## Engineering Library  `/engineering-library`

Reference material for the documents a control system is designed, built, and handed over with.

34 pages, **29 need content**.

- Drawings `hub` `/engineering-library/drawings`
  The drawing set a control system is built from.
  - P&IDs `NEEDS CONTENT` `/engineering-library/drawings/p-and-id-drawings`
    Piping and instrumentation diagrams: how to read one and what the tag bubbles mean.
  - Schematics `NEEDS CONTENT` `/engineering-library/drawings/schematics`
  - Wiring Diagrams `NEEDS CONTENT` `/engineering-library/drawings/wiring-diagrams`
  - Network Drawings `NEEDS CONTENT` `/engineering-library/drawings/network-drawings`
  - Panel Layouts `NEEDS CONTENT` `/engineering-library/drawings/panel-layouts`
- Lists & Schedules `hub` `/engineering-library/lists-schedules`
  The tabular deliverables that keep a project consistent.
  - I/O Lists `NEEDS CONTENT` `/engineering-library/lists-schedules/io-lists`
  - Instrument Lists `NEEDS CONTENT` `/engineering-library/lists-schedules/instrument-lists`
  - Cable Schedules `NEEDS CONTENT` `/engineering-library/lists-schedules/cable-schedules`
  - Fiber Schedules `NEEDS CONTENT` `/engineering-library/lists-schedules/fiber-schedules`
  - Network Schedules `NEEDS CONTENT` `/engineering-library/lists-schedules/network-schedules`
- Control Documentation `hub` `/engineering-library/control-documentation`
  Describing intended behavior before anyone writes code.
  - Control Narratives `NEEDS CONTENT` `/engineering-library/control-documentation/control-narratives`
    The document that says what the system does, in the words the owner will hold you to.
  - Sequences of Operation `NEEDS CONTENT` `/engineering-library/control-documentation/sequences-of-operation`
  - Cause & Effect `NEEDS CONTENT` `/engineering-library/control-documentation/cause-and-effect`
  - Functional Descriptions `NEEDS CONTENT` `/engineering-library/control-documentation/functional-descriptions`
- Checklists `hub` `/engineering-library/checklists`
  Repeatable checks for design, test, and turnover.
  - Design Checklist `NEEDS CONTENT` `/engineering-library/checklists/design-checklist`
  - FAT `NEEDS CONTENT` `/engineering-library/checklists/fat`
  - SAT `NEEDS CONTENT` `/engineering-library/checklists/sat`
  - Startup `NEEDS CONTENT` `/engineering-library/checklists/startup`
  - Commissioning `NEEDS CONTENT` `/engineering-library/checklists/commissioning`
  - Calibration Checklist `NEEDS CONTENT` `/engineering-library/checklists/calibration-checklist`
  - Troubleshooting Checklist `NEEDS CONTENT` `/engineering-library/checklists/troubleshooting-checklist`
- Standards `hub` `/engineering-library/standards`
  The standards bodies whose documents govern this work.
  - ISA `NEEDS CONTENT` `/engineering-library/standards/isa`
    ISA-5.1 symbology, ISA-18.2 alarms, ISA-101 HMI, ISA/IEC 62443 security.
  - IEC `NEEDS CONTENT` `/engineering-library/standards/iec`
    IEC 61131-3 programming languages and related industrial standards.
  - NFPA `NEEDS CONTENT` `/engineering-library/standards/nfpa`
    NFPA 70 (NEC) and NFPA 70E electrical safety in the workplace.
  - UL `NEEDS CONTENT` `/engineering-library/standards/ul`
    UL 508A and UL 698A industrial control panel listings.
  - NIST `NEEDS CONTENT` `/engineering-library/standards/nist`
  - CISA `NEEDS CONTENT` `/engineering-library/standards/cisa`
  - EPA `NEEDS CONTENT` `/engineering-library/standards/epa`
  - AWWA `NEEDS CONTENT` `/engineering-library/standards/awwa`

## Cybersecurity  `/cybersecurity`

Operational technology security for control systems, written for the people who actually maintain them.

70 pages, **54 need content**.

- OT Security `hub` `/cybersecurity/ot-security`
  The fundamentals that everything else rests on.
  - OT vs IT Security `WRITTEN` `/cybersecurity/ot-security/ot-vs-it-security`
    Why availability and safety outrank confidentiality on a plant floor, and what that changes.
  - Purdue Model `WRITTEN` `/cybersecurity/ot-security/purdue-model`
    The reference architecture that most segmentation designs still start from.
  - IEC 62443 `NEEDS CONTENT` `/cybersecurity/ot-security/iec-62443`
  - Risk Assessment `NEEDS CONTENT` `/cybersecurity/ot-security/risk-assessment`
  - Security Program Basics `NEEDS CONTENT` `/cybersecurity/ot-security/security-program-basics`
- Network Segmentation `hub` `/cybersecurity/network-segmentation`
  Separating the control network from everything else.
  - Zones and Conduits `NEEDS CONTENT` `/cybersecurity/network-segmentation/zones-and-conduits`
  - VLAN Segmentation `NEEDS CONTENT` `/cybersecurity/network-segmentation/vlan-segmentation`
  - DMZ Design `NEEDS CONTENT` `/cybersecurity/network-segmentation/dmz-design`
  - Data Diodes `NEEDS CONTENT` `/cybersecurity/network-segmentation/data-diodes`
  - Segmenting A Remote Site `NEEDS CONTENT` `/cybersecurity/network-segmentation/segmenting-a-remote-site`
- Remote Access `hub` `/cybersecurity/remote-access`
  Letting people in without leaving the door open.
  - Vendor Remote Access `NEEDS CONTENT` `/cybersecurity/remote-access/vendor-remote-access`
  - VPN Design `NEEDS CONTENT` `/cybersecurity/remote-access/vpn-design`
  - Jump Hosts `NEEDS CONTENT` `/cybersecurity/remote-access/jump-hosts`
  - Multi-Factor Authentication `NEEDS CONTENT` `/cybersecurity/remote-access/multi-factor-authentication`
  - Session Logging `NEEDS CONTENT` `/cybersecurity/remote-access/session-logging`
- Firewalls `hub` `/cybersecurity/firewalls`
  Rules, placement, and review.
  - Industrial Firewalls `NEEDS CONTENT` `/cybersecurity/firewalls/industrial-firewalls`
  - Firewall Rule Design `NEEDS CONTENT` `/cybersecurity/firewalls/firewall-rule-design`
  - Deep Packet Inspection `NEEDS CONTENT` `/cybersecurity/firewalls/deep-packet-inspection`
  - Logging And Review `NEEDS CONTENT` `/cybersecurity/firewalls/logging-and-review`
- PLC Security `hub` `/cybersecurity/plc-security`
  Protecting the device that moves the equipment.
  - Controller Hardening `NEEDS CONTENT` `/cybersecurity/plc-security/controller-hardening`
  - Mode Switch And Keyswitch `NEEDS CONTENT` `/cybersecurity/plc-security/mode-switch-and-keyswitch`
  - Firmware Management `NEEDS CONTENT` `/cybersecurity/plc-security/firmware-management`
  - Program Integrity `NEEDS CONTENT` `/cybersecurity/plc-security/program-integrity`
  - Disabling Unused Services `NEEDS CONTENT` `/cybersecurity/plc-security/disabling-unused-services`
- SCADA Security `hub` `/cybersecurity/scada-security`
  Hardening the supervisory layer.
  - Server Hardening `NEEDS CONTENT` `/cybersecurity/scada-security/server-hardening`
  - User Accounts And Roles `NEEDS CONTENT` `/cybersecurity/scada-security/user-accounts-and-roles`
  - Patch Management `NEEDS CONTENT` `/cybersecurity/scada-security/patch-management`
  - Historian Security `NEEDS CONTENT` `/cybersecurity/scada-security/historian-security`
  - Third Party Software `NEEDS CONTENT` `/cybersecurity/scada-security/third-party-software`
- Passwords & Credentials `hub` `/cybersecurity/passwords-credentials`
  The most common finding in every OT assessment.
  - Shared Account Problems `NEEDS CONTENT` `/cybersecurity/passwords-credentials/shared-account-problems`
  - Password Policy For OT `NEEDS CONTENT` `/cybersecurity/passwords-credentials/password-policy-for-ot`
  - Credential Storage `NEEDS CONTENT` `/cybersecurity/passwords-credentials/credential-storage`
  - Default Credentials `NEEDS CONTENT` `/cybersecurity/passwords-credentials/default-credentials`
- Backups `hub` `/cybersecurity/backups`
  The control that actually gets a plant back online.
  - What To Back Up `NEEDS CONTENT` `/cybersecurity/backups/what-to-back-up`
  - PLC Program Backups `NEEDS CONTENT` `/cybersecurity/backups/plc-program-backups`
  - SCADA Backups `NEEDS CONTENT` `/cybersecurity/backups/scada-backups`
  - Backup Testing `NEEDS CONTENT` `/cybersecurity/backups/backup-testing`
  - Offline Copies `NEEDS CONTENT` `/cybersecurity/backups/offline-copies`
- Change Detection `hub` `/cybersecurity/change-detection`
  Knowing when something moved.
  - Configuration Baselines `NEEDS CONTENT` `/cybersecurity/change-detection/configuration-baselines`
  - Program Change Detection `NEEDS CONTENT` `/cybersecurity/change-detection/program-change-detection`
  - Change Management For OT `NEEDS CONTENT` `/cybersecurity/change-detection/change-management-for-ot`
- Incident Response `hub` `/cybersecurity/incident-response`
  Planning for the day it happens.
  - OT Incident Response Plan `NEEDS CONTENT` `/cybersecurity/incident-response/ot-incident-response-plan`
  - Isolating A Compromised System `NEEDS CONTENT` `/cybersecurity/incident-response/isolating-a-compromised-system`
  - Manual Operation Procedures `NEEDS CONTENT` `/cybersecurity/incident-response/manual-operation-procedures`
  - Recovery And Restoration `NEEDS CONTENT` `/cybersecurity/incident-response/recovery-and-restoration`
  - Reporting Requirements `NEEDS CONTENT` `/cybersecurity/incident-response/reporting-requirements`
- Asset Inventory `hub` `/cybersecurity/asset-inventory`
  You cannot protect what you have not listed.
  - Building An OT Asset Inventory `NEEDS CONTENT` `/cybersecurity/asset-inventory/building-an-ot-asset-inventory`
  - Passive Discovery `NEEDS CONTENT` `/cybersecurity/asset-inventory/passive-discovery`
  - Documenting Firmware Versions `NEEDS CONTENT` `/cybersecurity/asset-inventory/documenting-firmware-versions`
- Vulnerability Management `hub` `/cybersecurity/vulnerability-management`
  Handling advisories on equipment you cannot reboot.
  - Advisories And Alerts `NEEDS CONTENT` `/cybersecurity/vulnerability-management/advisories-and-alerts`
  - Risk-Based Patching `NEEDS CONTENT` `/cybersecurity/vulnerability-management/risk-based-patching`
  - Compensating Controls `NEEDS CONTENT` `/cybersecurity/vulnerability-management/compensating-controls`
- Water/Wastewater Cybersecurity `hub` `/cybersecurity/water-wastewater-cybersecurity`
  Sector-specific guidance for water and wastewater utilities.
  - Utility Threat Landscape `WRITTEN` `/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape`
    What has actually happened at water utilities, and what those incidents had in common.
  - AWIA Requirements `NEEDS CONTENT` `/cybersecurity/water-wastewater-cybersecurity/awia-requirements`
  - EPA Guidance `NEEDS CONTENT` `/cybersecurity/water-wastewater-cybersecurity/epa-guidance`
  - CISA Resources `NEEDS CONTENT` `/cybersecurity/water-wastewater-cybersecurity/cisa-resources`
  - Small Utility Priorities `NEEDS CONTENT` `/cybersecurity/water-wastewater-cybersecurity/small-utility-priorities`

## How-To  `/how-to`

Step-by-step procedures for the tasks that come up on real jobs. Each one is written to be worked through with the equipment in front of you.

36 pages, **27 need content**.

- PLC How-To `hub` `/how-to/plc-how-to`
  - Scale a 4-20 mA Input `WRITTEN` `/how-to/plc-how-to/scale-a-4-20-ma-input`
    Turn raw analog counts into engineering units, with the arithmetic worked out.
  - Program Lead/Lag Pumps `WRITTEN` `/how-to/plc-how-to/program-lead-lag-pumps`
    Build duplex pump control with alternation, run-time balancing, and a failure fallback.
  - Build a Sequencer `NEEDS CONTENT` `/how-to/plc-how-to/build-a-sequencer`
  - Configure Modbus `NEEDS CONTENT` `/how-to/plc-how-to/configure-modbus`
    Set up a Modbus master and prove the poll is working.
  - Diagnose READ/WRITE Communications `NEEDS CONTENT` `/how-to/plc-how-to/diagnose-read-write-communications`
  - Create a PID Loop `NEEDS CONTENT` `/how-to/plc-how-to/create-a-pid-loop`
  - Add an Alarm `NEEDS CONTENT` `/how-to/plc-how-to/add-an-alarm`
  - Configure Remote I/O `NEEDS CONTENT` `/how-to/plc-how-to/configure-remote-i-o`
- SCADA How-To `hub` `/how-to/scada-how-to`
  - Build a Tag `NEEDS CONTENT` `/how-to/scada-how-to/build-a-tag`
  - Configure Alarms `NEEDS CONTENT` `/how-to/scada-how-to/configure-alarms`
  - Trend Data `NEEDS CONTENT` `/how-to/scada-how-to/trend-data`
  - Configure Historian `NEEDS CONTENT` `/how-to/scada-how-to/configure-historian`
  - Diagnose Bad Quality `NEEDS CONTENT` `/how-to/scada-how-to/diagnose-bad-quality`
  - Build Pump Graphics `NEEDS CONTENT` `/how-to/scada-how-to/build-pump-graphics`
  - Configure Remote Access `NEEDS CONTENT` `/how-to/scada-how-to/configure-remote-access`
- Instrumentation How-To `hub` `/how-to/instrumentation-how-to`
  - Calibrate a Pressure Transmitter `NEEDS CONTENT` `/how-to/instrumentation-how-to/calibrate-a-pressure-transmitter`
  - Test a 4-20 mA Loop `WRITTEN` `/how-to/instrumentation-how-to/test-a-4-20-ma-loop`
    Prove a loop end to end with a meter and a calibrator, without lifting the wrong wire.
  - Diagnose Ground Loops `NEEDS CONTENT` `/how-to/instrumentation-how-to/diagnose-ground-loops`
  - Configure Radar Level `NEEDS CONTENT` `/how-to/instrumentation-how-to/configure-radar-level`
  - Troubleshoot a Flowmeter `NEEDS CONTENT` `/how-to/instrumentation-how-to/troubleshoot-a-flowmeter`
- Panel How-To `hub` `/how-to/panel-how-to`
  - Size a Power Supply `WRITTEN` `/how-to/panel-how-to/size-a-power-supply`
    Add up the real load, add headroom, and account for inrush.
  - Select Surge Protection `NEEDS CONTENT` `/how-to/panel-how-to/select-surge-protection`
  - Size an Enclosure `NEEDS CONTENT` `/how-to/panel-how-to/size-an-enclosure`
  - Calculate SCCR `NEEDS CONTENT` `/how-to/panel-how-to/calculate-sccr`
  - Build Terminal Schedules `NEEDS CONTENT` `/how-to/panel-how-to/build-terminal-schedules`
  - Design Grounding `NEEDS CONTENT` `/how-to/panel-how-to/design-grounding`
- Network How-To `hub` `/how-to/network-how-to`
  - Assign IP Addresses `NEEDS CONTENT` `/how-to/network-how-to/assign-ip-addresses`
  - Configure VLANs `NEEDS CONTENT` `/how-to/network-how-to/configure-vlans`
  - Troubleshoot Ethernet `NEEDS CONTENT` `/how-to/network-how-to/troubleshoot-ethernet`
  - Test Fiber `NEEDS CONTENT` `/how-to/network-how-to/test-fiber`
  - Diagnose Packet Loss `NEEDS CONTENT` `/how-to/network-how-to/diagnose-packet-loss`

## Articles  `/articles`

Longer-form technical writing, published as it is finished and revised as field experience corrects it.

12 pages, **0 need content**.

- Latest `bespoke` `/articles/latest`
  Everything published, newest first.
- PLC Articles `bespoke` `/articles/plc-articles`
- SCADA Articles `bespoke` `/articles/scada-articles`
- Water Articles `bespoke` `/articles/water-articles`
- Wastewater Articles `bespoke` `/articles/wastewater-articles`
- Instrumentation Articles `bespoke` `/articles/instrumentation-articles`
- Panels Articles `bespoke` `/articles/panels-articles`
- Networking Articles `bespoke` `/articles/networking-articles`
- Cybersecurity Articles `bespoke` `/articles/cybersecurity-articles`
- Troubleshooting Articles `bespoke` `/articles/troubleshooting-articles`
- Engineering Articles `bespoke` `/articles/engineering-articles`
- Industry Articles `bespoke` `/articles/industry-articles`

## Tools & Projects  `/tools-projects`

Software Eric Sullivan is building on his own time. These are personal projects, not products of any employer.

7 pages, **0 need content**.

- Eric Sullivan's Personal Projects `hub` `/tools-projects/eric-sullivans-personal-projects`
  - SuitePlans `bespoke` `/tools-projects/eric-sullivans-personal-projects/suiteplans`
    Engineering drawing review, markup, takeoff, and estimating.
  - SuiteBids `bespoke` `/tools-projects/eric-sullivans-personal-projects/suitebids`
    Bid discovery, scope extraction, and estimating assistance.
  - KeyDocs `bespoke` `/tools-projects/eric-sullivans-personal-projects/keydocs`
    Organizing and searching critical project documents.
  - SecurelyFax `bespoke` `/tools-projects/eric-sullivans-personal-projects/securelyfax`
    Document transmission for workflows that still require fax.
  - Prompt Alerts `bespoke` `/tools-projects/eric-sullivans-personal-projects/prompt-alerts`
    Scheduled prompt-driven monitoring and notifications.
  - DubBrain `bespoke` `/tools-projects/eric-sullivans-personal-projects/dubbrain`
    A knowledge and content workspace.

## About  `/about`

Who runs this site, and how to reach him.

4 pages, **0 need content**.

- About CurryControls.com `bespoke` `/about/site`
  What this site is, who owns it, and what it is not.
- About Eric Sullivan `bespoke` `/about/eric-sullivan`
  Background in electrical systems, controls, and water and wastewater automation.
- Personal Projects `bespoke` `/about/personal-projects`
  Eric Sullivan's independent software projects.
- Contact Eric `bespoke` `/about/contact-eric`
  Reach Eric Sullivan directly at 863-698-8266.


## Existing articles (29)

| Path | Title | Kind | Updated |
|---|---|---|---|
| `/controls/plc-systems/plc-fundamentals/what-is-a-plc` | What Is a PLC? | reference | 2026-08-22 |
| `/controls/plc-systems/plc-fundamentals/scan-cycle` | The PLC Scan Cycle | reference | 2026-07-30 |
| `/controls/plc-systems/programming/ladder-logic` | Ladder Logic Fundamentals | reference | 2026-08-11 |
| `/controls/plc-systems/programming/interlocks` | Interlocks and Permissives | reference | 2026-06-27 |
| `/controls/plc-systems/analog-control/4-20-ma` | 4-20 mA Current Loops | reference | 2026-08-29 |
| `/controls/plc-systems/analog-control/scaling` | Analog Scaling: Raw Counts to Engineering Units | reference | 2026-07-16 |
| `/controls/plc-systems/analog-control/pid` | PID Control for Pumps and Valves | reference | 2026-08-19 |
| `/controls/plc-systems/communications/modbus-rtu` | Modbus RTU | reference | 2026-07-21 |
| `/controls/plc-systems/communications/modbus-tcp` | Modbus TCP | reference | 2026-07-28 |
| `/controls/scada-hmi/scada-fundamentals/what-is-scada` | What Is SCADA? | reference | 2026-08-04 |
| `/controls/scada-hmi/alarm-management/isa-18-2` | ISA-18.2 Alarm Management | reference | 2026-08-15 |
| `/controls/scada-hmi/hmi-design/high-performance-hmi` | High Performance HMI Design | reference | 2026-07-24 |
| `/controls/instrumentation/signals/ground-loops` | Ground Loops in Instrumentation | reference | 2026-08-08 |
| `/controls/instrumentation/level/radar-level` | Radar Level Measurement | reference | 2026-07-09 |
| `/controls/instrumentation/flow/magnetic-flowmeters` | Magnetic Flowmeters | reference | 2026-08-01 |
| `/controls/control-panels/panel-design/ul-508a` | UL 508A Industrial Control Panels | reference | 2026-08-25 |
| `/controls/control-panels/pump-panels/lead-lag` | Lead/Lag Pump Control | reference | 2026-08-18 |
| `/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations` | Duplex Lift Station Controls | reference | 2026-08-27 |
| `/water-wastewater/wastewater-systems/lift-stations/wet-well-control` | Wet Well Level Control | reference | 2026-08-30 |
| `/cybersecurity/ot-security/ot-vs-it-security` | OT Security vs IT Security | reference | 2026-08-26 |
| `/cybersecurity/ot-security/purdue-model` | The Purdue Model | reference | 2026-08-20 |
| `/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape` | Water and Wastewater Utility Threat Landscape | reference | 2026-08-28 |
| `/how-to/plc-how-to/scale-a-4-20-ma-input` | How to Scale a 4-20 mA Input in a PLC | howto | 2026-08-12 |
| `/how-to/instrumentation-how-to/test-a-4-20-ma-loop` | How to Test a 4-20 mA Loop | howto | 2026-08-06 |
| `/how-to/plc-how-to/program-lead-lag-pumps` | How to Program Lead/Lag Pump Control | howto | 2026-08-24 |
| `/how-to/panel-how-to/size-a-power-supply` | How to Size a Control Panel Power Supply | howto | 2026-08-14 |
| `/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable` | 4-20 mA Signal Is Unstable | troubleshooting | 2026-08-23 |
| `/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline` | Modbus Device Intermittently Offline | troubleshooting | 2026-08-21 |
| `/troubleshooting/network-troubleshooting/ethernet-device-drops-offline` | Ethernet Device Drops Offline | troubleshooting | 2026-08-16 |

## Tags in use

Reuse these before inventing new ones.

PLC (9), Wastewater (7), Instrumentation (6), Analog (4), Design (4), How-To (4), Pumps (4), Troubleshooting (4), 4-20 mA (3), Communications (3), Control (3), Cybersecurity (3), Fundamentals (3), Modbus (3), Panels (3), Programming (3), SCADA (3), Controls (2), Ethernet (2), Level (2), Lift Stations (2), Noise (2), OT (2), Scaling (2), Serial (2), Signals (2), Standards (2), Water (2), Alarms (1), Architecture (1), Flow (1), Grounding (1), HMI (1), ICS (1), Industrial Networks (1), Interlocks (1), ISA-101 (1), ISA-18.2 (1), Ladder Logic (1), Networking (1), PID (1), Power (1), Radar (1), Scan Time (1), Segmentation (1), UL 508A (1), Utilities (1)

## Calculators (35)

- Voltage Drop Calculator `/calculators/voltage-drop` (Electrical)
- Wire Size Calculator for Voltage Drop `/calculators/wire-size-for-voltage-drop` (Electrical)
- Conductor Ampacity with Derating `/calculators/conductor-ampacity` (Electrical)
- Conduit Fill Calculator `/calculators/conduit-fill` (Electrical)
- Ohm's Law and Power Calculator `/calculators/ohms-law` (Electrical)
- Three-Phase Power Calculator `/calculators/three-phase-power` (Electrical)
- Motor Branch Circuit Sizing `/calculators/motor-branch-circuit` (Control Panels)
- Transformer Sizing and Full-Load Current `/calculators/transformer-sizing` (Control Panels)
- Control Panel Heat Load and Temperature Rise `/calculators/enclosure-heat-load` (Control Panels)
- DC Power Supply Load Budget `/calculators/dc-power-supply-load` (Control Panels)
- UPS and Battery Runtime `/calculators/ups-battery-runtime` (Control Panels)
- 4-20 mA Scaling Calculator `/calculators/4-20-ma-scaling` (Instrumentation)
- Analog Raw Counts to Engineering Units `/calculators/analog-raw-counts` (Instrumentation)
- 4-20 mA Loop Resistance Budget `/calculators/loop-resistance` (Instrumentation)
- Differential Pressure Flow and Square Root Extraction `/calculators/square-root-extraction` (Instrumentation)
- Analog Input Resolution `/calculators/analog-resolution` (Instrumentation)
- RTD Resistance and Temperature `/calculators/rtd-temperature` (Instrumentation)
- Number Base and Bit Converter `/calculators/number-base-converter` (PLC & Data)
- PLC Data Type Ranges `/calculators/data-type-ranges` (PLC & Data)
- IEEE 754 Floating Point Inspector `/calculators/ieee-754-float` (PLC & Data)
- Modbus Register Address Converter `/calculators/modbus-register-address` (PLC & Data)
- Modbus Serial Poll Time `/calculators/modbus-poll-time` (PLC & Data)
- Data Size Converter `/calculators/data-size-converter` (PLC & Data)
- Historian Storage Sizing `/calculators/historian-storage` (PLC & Data)
- IP Subnet Calculator `/calculators/ip-subnet` (Networking)
- SCADA Polling Bandwidth `/calculators/network-bandwidth` (Networking)
- Fiber Optic Loss Budget `/calculators/fiber-loss-budget` (Networking)
- Pump Horsepower and Total Dynamic Head `/calculators/pump-horsepower` (Water & Wastewater)
- Pump Affinity Laws `/calculators/pump-affinity-laws` (Water & Wastewater)
- Wet Well Volume and Pump Cycle Time `/calculators/wet-well-cycle` (Water & Wastewater)
- Tank and Basin Volume `/calculators/tank-volume` (Water & Wastewater)
- Flow Unit Converter `/calculators/flow-unit-converter` (Conversions)
- Chemical Dosing Calculator `/calculators/chemical-dosing` (Water & Wastewater)
- Detention Time Calculator `/calculators/detention-time` (Water & Wastewater)
- Pipe Velocity and Friction Loss `/calculators/pipe-friction-loss` (Water & Wastewater)

## Reference tables (12)

- Conductor Ampacity Table `/tables/conductor-ampacity`
- Ambient Temperature Correction Factors `/tables/temperature-correction-factors`
- Adjustment Factors for Conductor Count `/tables/conductor-adjustment-factors`
- Wire Gauge, Circular Mils, and Area `/tables/wire-gauge-table`
- Three-Phase Motor Full-Load Current `/tables/motor-full-load-current`
- Standard Overcurrent Device Ratings `/tables/standard-overcurrent-ratings`
- Conduit Internal Area by Type and Trade Size `/tables/conduit-fill-areas`
- Insulated Conductor Area by Insulation Type `/tables/conductor-insulation-areas`
- PLC Data Type Ranges `/tables/plc-data-types`
- 4-20 mA Signal Reference `/tables/4-20-ma-reference`
- Enclosure Type Ratings `/tables/enclosure-type-ratings`
- Controls Unit Conversion Reference `/tables/unit-conversions`

## Glossary (125 terms)

**PLC & Programming:** PLC, PAC, RTU, Scan time, Watchdog, Ladder logic, Rung, Contact, Coil, Latch and unlatch, One-shot, Interlock, Permissive, Retentive memory, Tag, Task, Structured text, Function block diagram, Sequential function chart, State machine

**Standards:** IEC 61131-3, NAMUR NE 43, UL 508A, UL 698A, IEC 62443, ISA-5.1, P&ID, ISA-18.2, ISA-101, NFPA 70E, Control narrative, AWIA

**Signals & Analog:** 4-20 mA, Live zero, Loop powered, Compliance voltage, HART, Span, Zero, Raw counts, Scaling, Engineering units, Square root extraction, Low flow cutoff, PID, Setpoint, Process variable, Integral windup, Bumpless transfer, Deadband, Signal validation, Ground loop, Signal isolator, Shielded twisted pair

**Instrumentation:** Transmitter, Turndown, Calibration, Loop check, Magnetic flowmeter, Guided wave radar, Radar level, False echo, pH, ORP, Turbidity

**SCADA & HMI:** SCADA, HMI, High performance HMI, Situational awareness, Faceplate, Historian, Compression, Tag quality, Alarm rationalization, Alarm flood, Shelving, Report by exception, Poll rate

**Control Panels:** SCCR, Enclosure type rating, Panel heat load, Control power supply, UPS, VFD, Soft starter, HOA, Motor overload, Surge protective device, Interposing relay

**Networking:** Modbus, Modbus RTU, Modbus TCP, Register addressing, RS-485, Termination, EtherNet/IP, RPI, DNP3, OPC UA, VLAN, Managed switch, Duplex mismatch, IGMP snooping

**Water & Wastewater:** Lift station, Wet well, Septicity, Force main, Lead/lag, Alternation, TDH, NPSH, Cavitation, High service pump, RAS and WAS, MLSS, Reverse osmosis, CIP, SSO

**Cybersecurity:** OT, ICS, Purdue model, DMZ, Zones and conduits, Defense in depth, Air gap

