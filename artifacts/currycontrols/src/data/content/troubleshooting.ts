import type { Entry } from '../content-types';

export const TROUBLESHOOTING_ENTRIES: Entry[] = [
  {
    path: '/troubleshooting/instrumentation-troubleshooting/4-20-ma-signal-unstable',
    kind: 'troubleshooting',
    title: '4-20 mA Signal Is Unstable',
    summary:
      'An analog reading that will not settle. How to separate a genuine process swing from induced noise, a ground loop, or a loop running out of voltage.',
    answer:
      'An unstable 4-20 mA reading is usually one of four things: a genuine process fluctuation, induced electrical noise from nearby drives or motors, a ground loop from the circuit being earthed at more than one point, or insufficient loop voltage for the total loop resistance. Determine which by observing whether the instability correlates with equipment operation and whether it appears at the transmitter or only at the panel.',
    symptom:
      'The analog value on the HMI moves continuously, jumps erratically, or wanders slowly without a corresponding change in the process.',
    keyPoints: [
      'First establish whether the process itself is actually moving.',
      'Noise that correlates with a drive running points to induced interference or a ground loop.',
      'Measure at the transmitter and at the panel to locate which segment is adding the instability.',
      'Instability only near full scale suggests insufficient loop voltage.',
      'Filtering in the controller hides the symptom and should be the last step, not the first.',
    ],
    causes: [
      { cause: 'The process is genuinely fluctuating', check: 'Compare against a local gauge or a second measurement. A pump cycling or turbulence at a probe produces real movement.' },
      { cause: 'Induced noise from a VFD or motor cable', check: 'Observe whether the instability starts when a drive runs. Check signal cable routing and separation from drive output conductors.' },
      { cause: 'Ground loop', check: 'Measure AC voltage between the panel ground and the field device ground. Confirm the cable shield is grounded at one end only.' },
      { cause: 'Insufficient loop voltage', check: 'Calculate total loop resistance against supply voltage and transmitter compliance. Instability or clipping near 20 mA is the signature.' },
      { cause: 'Loose or corroded terminal', check: 'Inspect and re-torque every termination in the loop. Flex the cable at each termination while watching the reading.' },
      { cause: 'Failing transmitter or power supply', check: 'Substitute a loop calibrator for the transmitter. If the reading stabilizes, the transmitter is the source.' },
      { cause: 'Turbulence or installation position', check: 'For flow and level, check whether the sensing point sees a disturbed flow profile or a falling stream.' },
      { cause: 'Analog card channel fault', check: 'Move the loop to a spare channel and observe. This isolates the input hardware in two minutes.' },
    ],
    published: '2026-04-21',
    updated: '2026-08-23',
    readingTime: 8,
    tags: ['Troubleshooting', 'Instrumentation', '4-20 mA', 'Noise'],
    blocks: [
      { t: 'h2', text: 'Start by characterizing the instability' },
      {
        t: 'p',
        text: 'Before touching a wire, describe what the signal is doing. The shape of the instability narrows the cause more than any single measurement will.',
      },
      {
        t: 'table',
        head: ['What it looks like', 'Points toward'],
        rows: [
          ['Fast, small, constant fuzz', 'Induced electrical noise'],
          ['Large jumps that coincide with a motor start', 'Ground loop or severe induced noise'],
          ['Slow wandering over minutes', 'Genuine process movement, or a thermal effect'],
          ['Steady until the reading approaches full scale', 'Insufficient loop voltage'],
          ['Intermittent dropouts to zero', 'Loose termination or an intermittent open'],
          ['Stepped movement rather than smooth', 'Poor resolution, or heavy filtering already applied'],
          ['Only unstable in wet weather', 'Moisture in a junction box or conduit'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Trend it before you drive out',
        text: 'A five-minute trend from the historian, overlaid with the run status of nearby drives and pumps, frequently identifies the cause before anyone opens a panel. If the noise appears exactly when a drive starts and vanishes when it stops, you already know what you are looking for.',
      },
      { t: 'h2', text: 'Diagnostic procedure' },
      {
        t: 'steps',
        items: [
          {
            title: 'Confirm the process is not actually moving',
            text: 'Check a local gauge, a sight glass, or a second instrument. It sounds obvious and it is regularly the answer, particularly on discharge pressure with a pump cycling or on a level probe near an inflow stream.',
          },
          {
            title: 'Correlate with equipment operation',
            text: 'Note whether the instability starts and stops with a specific drive, pump, or blower. This one observation separates electrical interference from everything else.',
          },
          {
            title: 'Measure at the panel non-intrusively',
            text: 'Read voltage across the input sense resistor. If it is unstable here, the instability is real on the wire and you continue outward. If it is stable here while the HMI is not, the problem is in scaling, filtering, or the SCADA tag.',
          },
          {
            title: 'Measure at the transmitter',
            text: 'Use test jacks or a series measurement at the transmitter. Stable at the transmitter and unstable at the panel means the cable run is picking up the disturbance. Unstable at both means the transmitter or the process is the source.',
          },
          {
            title: 'Substitute a calibrator',
            text: 'Disconnect the transmitter and inject a fixed 12 mA. If the panel reading is now rock steady, the transmitter or the process is responsible. If it is still unstable, the wiring, the card, or a ground problem owns it.',
          },
          {
            title: 'Check grounding',
            text: 'Verify the shield is grounded at exactly one end. Measure AC voltage between the two ground references. More than a few hundred millivolts is worth pursuing.',
          },
          {
            title: 'Check loop voltage headroom',
            text: 'Calculate maximum allowable loop resistance from supply voltage and transmitter compliance voltage, and compare against the actual total. Marginal headroom produces instability that gets worse as the signal rises.',
          },
          {
            title: 'Move to a spare channel',
            text: 'If everything above is clean, move the loop to a different analog input. A failing channel is uncommon but not rare, and this test is quick and conclusive.',
          },
        ],
      },
      { t: 'h2', text: 'Common mistakes' },
      {
        t: 'ul',
        items: [
          'Adding filtering in the PLC first. It makes the display look better and hides a genuine fault that will get worse.',
          'Replacing the transmitter before proving the transmitter is the source. It is the most expensive step and frequently the wrong one.',
          'Grounding the shield at both ends "to make sure it is grounded". This creates the ground loop you are trying to eliminate.',
          'Testing with the drive stopped and declaring the problem solved. Reproduce the condition before believing a fix.',
          'Ignoring a small persistent instability. A signal that has become slightly noisy over months is often a termination that is slowly failing.',
        ],
      },
      { t: 'h2', text: 'Fixes, in order of preference' },
      {
        t: 'ol',
        items: [
          'Correct the actual cause: re-route the cable, re-terminate the connection, fix the shield grounding, or raise the loop supply voltage.',
          'Add a signal isolator where a second ground cannot be removed.',
          'Improve the installation: separate the signal cable from drive output conductors, use proper twisted shielded pair, and add distance where possible.',
          'Move the sensing point if turbulence or installation position is the cause.',
          'Only then, apply modest filtering in the controller, and document that you did and why.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Filtering a real problem is how a small fault becomes an outage',
        text: 'A loop that needed 8 seconds of filtering to look acceptable is telling you something. In six months it will need 30 seconds, and then it will fail. Record any filter you add and what the signal looked like before it, so the next person understands what they are looking at.',
      },
    ],
    faqs: [
      {
        q: 'Why does my analog signal only get noisy when a pump runs?',
        a: 'Either the drive output cable is coupling into the signal cable, or the motor current is exciting a ground loop. Check cable routing and separation first, then shield grounding, then add an isolator if the second ground cannot be removed.',
      },
      {
        q: 'How much filtering is acceptable?',
        a: 'Enough to remove measurement noise without hiding a real process change the control loop needs to see. On a wet well level a few seconds is usually harmless. On a pressure loop controlling a pump, heavy filtering will destabilize the control.',
      },
      {
        q: 'Can a bad power supply cause an unstable analog signal?',
        a: 'Yes. A loop supply with excessive ripple or one operating near its current limit puts that variation directly into the loop. Measure the supply output with a meter on AC volts to check for ripple, and confirm it is not overloaded.',
      },
      {
        q: 'The reading is stable at the panel but jumps on the HMI. What now?',
        a: 'The field is fine. Look at the controller scaling, any filtering, the update rate between controller and SCADA, and the SCADA tag configuration. A slow poll rate showing a fast-changing value can look like instability that is not there.',
      },
    ],
    related: [
      '/controls/plc-systems/analog-control/4-20-ma',
      '/controls/instrumentation/signals/ground-loops',
      '/how-to/instrumentation-how-to/test-a-4-20-ma-loop',
      '/troubleshooting/noise-interference/vfd-noise-on-analog-signals',
    ],
  },

  {
    path: '/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline',
    kind: 'troubleshooting',
    title: 'Modbus Device Intermittently Offline',
    summary:
      'A device that answers most of the time. Termination, bias, timing, and the physical layer details that produce a bus which almost works.',
    answer:
      'A Modbus device that drops out intermittently is usually a physical layer problem rather than a configuration problem, because a wrong configuration fails consistently. The most frequent causes are missing or incorrect RS-485 termination, missing bias, no signal common, cable routed near variable frequency drive output conductors, and a response timeout shorter than the device actually needs.',
    symptom:
      'A Modbus device communicates normally for a period and then times out, recovers on its own, and the pattern repeats without an obvious trigger.',
    keyPoints: [
      'Consistent failure means configuration. Intermittent failure means physical layer or timing.',
      'Terminate both physical ends of an RS-485 segment, and only the ends.',
      'Bias must exist somewhere on the segment or an idle line floats into noise.',
      'A missing signal common works until ground potential difference grows.',
      'Trend the error rate per device; a rising rate predicts a hard failure.',
    ],
    causes: [
      { cause: 'Missing or incorrect termination', check: 'Confirm 120 ohm termination at both physical ends of the segment only. Measure resistance across the pair with the bus powered down: roughly 60 ohms indicates two terminators present.' },
      { cause: 'No bias on the segment', check: 'Confirm bias resistors are enabled at one point, usually the master. Without bias the idle line floats and receivers interpret noise as data.' },
      { cause: 'Signal common not connected', check: 'Verify a common conductor between devices. Many installations omit it and work until ground potential difference grows.' },
      { cause: 'Cable near drive output conductors', check: 'Trace the routing. Shared conduit or tray with VFD output cable is a leading cause of a bus that fails only when a drive runs.' },
      { cause: 'Response timeout too short', check: 'Compare the configured timeout against the device actual response time. Some field devices need tens or hundreds of milliseconds.' },
      { cause: 'Polling faster than the device can answer', check: 'Reduce the poll rate and observe whether the error rate falls.' },
      { cause: 'Duplicate slave address', check: 'Two devices at the same address answer together and corrupt each other. Disconnect devices one at a time.' },
      { cause: 'Marginal or failing transceiver', check: 'The device drops out with increasing frequency over weeks. Substitute or move it to another position on the bus.' },
      { cause: 'Star topology or long stubs', check: 'RS-485 is a bus. Stubs off the trunk cause reflections that get worse at higher baud rates.' },
      { cause: 'Loose termination in a junction box', check: 'Flex the cable at each termination while monitoring communication errors.' },
    ],
    published: '2026-05-12',
    updated: '2026-08-21',
    readingTime: 9,
    tags: ['Troubleshooting', 'Modbus', 'Serial', 'Communications'],
    blocks: [
      { t: 'h2', text: 'What intermittent tells you' },
      {
        t: 'p',
        text: 'This is the most useful single deduction available. A wrong slave address, a wrong baud rate, a wrong register, or a wrong parity setting does not work sometimes. It never works. If a device communicates successfully at all, the address, the serial parameters, and the register map are correct.',
      },
      {
        t: 'p',
        text: 'That leaves the physical layer and timing. It is a much smaller search space than it feels like when you are standing in front of a panel at a remote site.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Get the error counters first',
        text: 'Most Modbus masters expose per-device statistics: successful transactions, timeouts, CRC errors, and exception responses. The distribution tells you a great deal. CRC errors point to noise or reflections. Timeouts point to a device not answering or answering too slowly. Exceptions mean the device heard you and objected to the request.',
      },
      { t: 'h2', text: 'The physical layer, in the order that finds problems fastest' },
      {
        t: 'steps',
        items: [
          {
            title: 'Check termination',
            text: 'With the bus powered down, measure resistance across the A and B pair. Roughly 60 ohms means two 120 ohm terminators are present, which is correct. Around 120 ohms means only one, and an open reading means none. Several devices with termination switches left on will read much lower.',
          },
          {
            title: 'Check bias',
            text: 'Confirm bias is enabled at exactly one point on the segment, normally the master or a dedicated bias network. Without it an idle bus floats between logic states and receivers see noise as start bits.',
          },
          {
            title: 'Verify the signal common',
            text: 'RS-485 is differential but not immune to common-mode voltage. Devices need a shared reference within the transceiver common-mode range. Confirm the third conductor exists and is landed.',
          },
          {
            title: 'Inspect the topology',
            text: 'Trace the actual wiring rather than the drawing. Look for a star arrangement, long stubs, or a device T-tapped in the middle of a run with several feet of drop.',
          },
          {
            title: 'Check routing against noise sources',
            text: 'Look for shared conduit or cable tray with drive output conductors. Check whether failures correlate with a drive running. This correlation alone frequently solves the case.',
          },
          {
            title: 'Flex the terminations',
            text: 'While monitoring the error count, gently move the cable at each termination and junction. An intermittent connection often reveals itself immediately.',
          },
        ],
      },
      { t: 'h2', text: 'Timing' },
      {
        t: 'p',
        text: 'Modbus RTU frames are delimited by silence, so timing is part of the protocol rather than an implementation detail. Two settings matter more than the rest.',
      },
      {
        t: 'ul',
        items: [
          'Response timeout: must exceed the slowest response the device produces under load. A device that normally answers in 20 ms may take 200 ms while performing an internal calculation.',
          'Inter-frame delay: the master must respect the required silence between transactions. A master that transmits too quickly after a response can collide with a slow device still finishing.',
          'Retries: set deliberately. Too few and a single noise event marks a device offline; too many and the whole bus stalls waiting on one device.',
          'Poll rate: reading a device every 100 ms because you can is not a reason to. Match the poll rate to how fast the value actually changes.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Serial converters and gateways can break framing',
        text: 'A USB-to-serial converter or a network serial server that buffers data can introduce enough latency to violate the inter-frame silence requirements. All the bytes arrive, but the framing is wrong and the master sees CRC errors. If a bus works with a direct serial port and fails through a converter, this is why.',
      },
      { t: 'h2', text: 'Isolating a single bad device' },
      {
        t: 'p',
        text: 'When the whole bus is unreliable and no single device stands out, bisect it. Disconnect half the devices and observe. If the remaining half is stable, the problem is in the disconnected half. Repeat. This takes fifteen minutes and it always converges, which is more than can be said for staring at a wiring diagram.',
      },
      { t: 'h2', text: 'What good looks like' },
      {
        t: 'table',
        head: ['Metric', 'Healthy', 'Investigate'],
        rows: [
          ['Timeout rate per device', 'Effectively zero', 'Any sustained rate above about 1%'],
          ['CRC errors', 'Zero', 'Any recurring CRC errors indicate noise or reflections'],
          ['Response time', 'Stable and well under the timeout', 'Rising average, or occasional long outliers'],
          ['Error correlation with equipment', 'None', 'Errors clustering around drive starts'],
          ['Trend over weeks', 'Flat', 'Slowly rising error rate predicts a hard failure'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Record the error rate as a SCADA point',
        text: 'Communication statistics are usually available in the master and rarely historized. Bringing per-device error counts into SCADA turns intermittent communication problems from an argument into a trend, and it lets you see a bus degrading before it fails.',
      },
    ],
    faqs: [
      {
        q: 'How do I know if termination is correct?',
        a: 'Power down the bus and measure resistance across the A and B pair. Approximately 60 ohms indicates two 120 ohm terminators, which is correct for a properly terminated segment. Higher suggests one or none; much lower suggests several devices have termination enabled.',
      },
      {
        q: 'Do I need the signal common on RS-485?',
        a: 'Yes, in practice. The differential pair carries the data but every transceiver has a common-mode voltage limit. Without a shared reference, ground potential difference between devices can exceed it, and the bus works until it does not.',
      },
      {
        q: 'Why does the bus fail only when a pump starts?',
        a: 'Because the drive output cable is coupling into the communication cable, or the motor current is shifting ground potential between devices. Check routing and separation first, then the signal common, then consider an isolated repeater.',
      },
      {
        q: 'Should I lower the baud rate?',
        a: 'It can help as a diagnostic and sometimes as a workaround, because lower rates tolerate reflections and marginal cabling better. Treat a bus that only works at a reduced rate as an installation defect to be corrected, not as a solution.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/modbus-rtu',
      '/controls/plc-systems/communications/serial-communications',
      '/troubleshooting/noise-interference/cable-routing-problems',
      '/troubleshooting/communications-troubleshooting/device-times-out',
    ],
  },

  {
    path: '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
    kind: 'troubleshooting',
    title: 'Ethernet Device Drops Offline',
    summary:
      'An industrial Ethernet device that disappears and comes back. Duplex mismatch, cabling, spanning tree, and the switch counters that identify it in minutes.',
    answer:
      'An industrial Ethernet device that intermittently drops offline is most often caused by a duplex mismatch, a marginal cable or connector, a spanning tree topology change, a duplicate IP address, or a power problem at the device. Managed switch port statistics identify the cause quickly: errors and late collisions indicate duplex mismatch, CRC errors indicate cabling, and repeated link transitions indicate a physical or power problem.',
    symptom:
      'A PLC, drive, or remote I/O device on Ethernet loses communication for seconds or minutes, then recovers without intervention.',
    keyPoints: [
      'Managed switch port counters answer this faster than any other single step.',
      'Late collisions on a full-duplex link mean a duplex mismatch, every time.',
      'CRC and alignment errors point at the cable, the connector, or noise.',
      'Repeated link up and down events point at physical connection or device power.',
      'A duplicate IP address produces intermittent, confusing symptoms on both devices.',
    ],
    causes: [
      { cause: 'Duplex mismatch', check: 'One end auto-negotiating, the other hard-set. Look for late collisions and FCS errors on the port.' },
      { cause: 'Marginal cable or connector', check: 'Check CRC and alignment error counters. Inspect the connector, verify the cable is not run beyond 100 metres, and confirm it is not damaged.' },
      { cause: 'Spanning tree topology change', check: 'Review switch logs for topology change notifications. A redundant path reconverging drops traffic briefly.' },
      { cause: 'Duplicate IP address', check: 'Look for ARP conflict messages. Disconnect the suspect device and ping its address; a response means something else is using it.' },
      { cause: 'Power problem at the device', check: 'Repeated link up and down with no error counters usually means the device is losing power or resetting.' },
      { cause: 'Broadcast or multicast storm', check: 'Check port utilization and broadcast counters. EtherNet/IP implicit messaging without IGMP snooping can flood a network.' },
      { cause: 'Switch port failure', check: 'Move the device to a different port. Fast, conclusive, and often overlooked.' },
      { cause: 'Fiber loss or dirty connector', check: 'On a fiber uplink, measure optical power against the receiver sensitivity and clean the connectors.' },
      { cause: 'Overloaded device connection limit', check: 'Some controllers support limited concurrent connections. Excess polling clients exhaust them.' },
      { cause: 'Noise coupling into copper', check: 'Cable in a tray with drive output conductors. Correlate drops with drive operation.' },
    ],
    published: '2026-06-30',
    updated: '2026-08-16',
    readingTime: 9,
    tags: ['Troubleshooting', 'Networking', 'Ethernet', 'Industrial Networks'],
    blocks: [
      { t: 'h2', text: 'Read the switch counters first' },
      {
        t: 'p',
        text: 'If the device is on a managed switch, the port statistics will usually tell you what is wrong before you touch anything. This is the single strongest argument for managed switches in an industrial network, and it is why an unmanaged switch on a critical path is a false economy.',
      },
      {
        t: 'table',
        caption: 'Reading port counters',
        head: ['Counter increasing', 'Means', 'Do this'],
        rows: [
          ['Late collisions', 'Duplex mismatch. This is essentially diagnostic.', 'Set both ends the same: auto on both, or hard-set on both'],
          ['FCS / CRC errors', 'Corrupted frames from cabling or noise', 'Inspect and test the cable; check routing away from drive cables'],
          ['Alignment errors', 'Physical layer problem', 'Same as CRC errors'],
          ['Runts or giants', 'Malformed frames, often from a failing NIC', 'Substitute the device or its port'],
          ['Link flaps', 'Physical connection or device power', 'Check the connector, then the device power supply'],
          ['Broadcast rate high', 'Storm, loop, or missing IGMP snooping', 'Check spanning tree state and multicast configuration'],
          ['Discards on a full port', 'Congestion', 'Check whether the port is genuinely saturated'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Late collisions on full duplex are conclusive',
        text: 'A properly negotiated full-duplex link cannot have collisions at all. If a port is reporting late collisions, one end is running half duplex and the other full. This single counter identifies a problem that otherwise presents as random slowness and intermittent drops.',
      },
      { t: 'h2', text: 'The duplex mismatch trap' },
      {
        t: 'p',
        text: 'It arises when one end is set to auto-negotiate and the other is hard-configured. The auto end cannot detect duplex without a negotiating partner, so it defaults to half duplex while the fixed end runs full. The link comes up, small amounts of traffic pass fine, and under load it degrades badly.',
      },
      {
        t: 'p',
        text: 'The symptom set is distinctive: the device works when idle, fails under load, and the failures do not correlate with anything obvious. Set both ends to auto-negotiate, or hard-set both ends identically. Never mix the two, which is exactly what a well-intentioned "let me lock this down to 100 full" change produces.',
      },
      { t: 'h2', text: 'Diagnostic procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Establish the pattern', text: 'How long is it offline, how often, and does it correlate with anything? A drop every time a large motor starts is a different problem from a drop every forty minutes.' },
          { title: 'Check the switch port counters', text: 'Look at errors, collisions, and link flap history. This is where the answer usually is.' },
          { title: 'Verify speed and duplex on both ends', text: 'Confirm the negotiated result, not just the configuration, and confirm both ends agree.' },
          { title: 'Check for duplicate IP', text: 'Look for ARP conflict entries in switch or device logs. Disconnect the device and ping its address; a reply identifies the conflict immediately.' },
          { title: 'Move to a different port', text: 'Isolates a failing switch port in about a minute.' },
          { title: 'Substitute the cable', text: 'A known-good patch cable eliminates the most common physical cause. Do not skip this because the cable "was fine yesterday".' },
          { title: 'Check device power', text: 'Link flaps with no error counters usually mean the device is resetting. Check the power supply loading and any shared circuit.' },
          { title: 'Review spanning tree', text: 'A ring or redundant path reconverging causes brief loss across the network. Check for topology change events and confirm the design is what you think it is.' },
          { title: 'Capture packets if needed', text: 'A mirror port and a capture during a drop shows exactly what stopped and in which direction, which ends most disputes about where the fault lies.' },
        ],
      },
      { t: 'h2', text: 'Industrial-specific causes' },
      {
        t: 'dl',
        items: [
          { term: 'EtherNet/IP multicast', def: 'Implicit I/O messaging uses multicast. Without IGMP snooping and a querier, multicast floods every port and can saturate a network. The symptom is widespread intermittent trouble that worsens as devices are added.' },
          { term: 'Connection limits', def: 'Controllers support a finite number of concurrent connections. A SCADA system, an engineering workstation, and several HMIs polling one controller can exhaust them, and new connections are refused.' },
          { term: 'Ring redundancy protocols', def: 'Device-level ring and similar protocols recover quickly but a misconfigured ring, or a ring with a device that does not participate correctly, produces recurring topology events.' },
          { term: 'Fiber degradation', def: 'A fiber link that worked at installation can degrade from a dirty or damaged connector. Measure received optical power and compare against the receiver sensitivity, with margin.' },
          { term: 'Environmental', def: 'Panel temperature, vibration loosening an RJ45, and moisture in an outdoor enclosure all produce genuinely intermittent physical faults that no configuration change will fix.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Do not build a loop while troubleshooting',
        text: 'Patching a second cable between two switches to "test redundancy" without spanning tree correctly configured creates a broadcast storm that takes down the entire network in seconds. Confirm the spanning tree design before adding any redundant path.',
      },
      { t: 'h2', text: 'What to fix permanently' },
      {
        t: 'ul',
        items: [
          'Standardize on auto-negotiation everywhere, and document any exception with a reason.',
          'Use managed switches on any path that matters, and actually collect their statistics into SCADA.',
          'Enable IGMP snooping with a querier where EtherNet/IP implicit messaging is used.',
          'Keep Ethernet out of trays and conduits carrying drive output conductors.',
          'Use industrial-rated connectors and cable in panels subject to vibration.',
          'Document the network with a real drawing, including VLANs, spanning tree roles, and uplinks.',
          'Alarm on switch port link state for critical devices, so a flap is visible rather than inferred.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What causes late collisions on a full-duplex link?',
        a: 'A duplex mismatch. One end is running half duplex, almost always because it is auto-negotiating against a hard-set partner. Set both ends the same way.',
      },
      {
        q: 'How do I find a duplicate IP address?',
        a: 'Look for ARP conflict messages in device or switch logs. The simplest field test is to disconnect the suspect device and ping its address. If something answers, another device is using it.',
      },
      {
        q: 'Should I hard-set speed and duplex on industrial devices?',
        a: 'Only if both ends are hard-set identically and it is documented. Auto-negotiation on both ends is reliable on modern equipment and avoids the mismatch that causes most of these problems.',
      },
      {
        q: 'Why does my network fail when I add more devices?',
        a: 'On an EtherNet/IP network, usually multicast flooding without IGMP snooping. It can also be controller connection limits, or a genuinely saturated uplink. Check switch port utilization and multicast rates.',
      },
    ],
    related: [
      '/troubleshooting/network-troubleshooting/switch-port-errors-incrementing',
      '/troubleshooting/network-troubleshooting/duplicate-ip-address',
      '/how-to/network-how-to/troubleshoot-ethernet',
      '/controls/plc-systems/communications/ethernet-ip',
    ],
  },
];
