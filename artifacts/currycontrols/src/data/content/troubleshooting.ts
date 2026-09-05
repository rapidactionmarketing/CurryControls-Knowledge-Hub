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
    tags: ['Troubleshooting', 'Instrumentation', '4-20 mA', 'Signals'],
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
    tags: ['Troubleshooting', 'Modbus', 'Communications'],
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
    tags: ['Troubleshooting', 'Networking', 'Ethernet'],
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
  {
    path: '/troubleshooting/plc-troubleshooting/processor-faulted',
    kind: 'troubleshooting',
    title: 'Processor Faulted',
    summary:
      'A PLC with its fault light on and no logic running. How to read what it is telling you, the causes in order of likelihood, and how to restart it without repeating the fault.',
    answer:
      'A faulted processor has stopped executing logic on purpose, driven its outputs to their configured fault state, and recorded a fault code that says why. Read the code before doing anything else; it names the cause, and often the routine and the instruction. The usual causes are a watchdog timeout, a missing or wrong I/O module, a program error such as an array index out of range, a power dip, or a lost memory backup. Clearing the fault without fixing the cause restarts the clock on the next one.',
    symptom:
      'The fault indicator on the processor is lit or flashing red, the run light is off, the HMI shows stale values or a communication loss, and equipment has gone to whatever state its outputs fault to.',
    keyPoints: [
      'The fault code is the diagnosis. Read it from the programming software or the front panel display before clearing anything.',
      'A recoverable fault can be cleared and the processor returned to run; an unrecoverable one needs a power cycle or a download.',
      'Look at what changed: a module replaced, an online edit, a power event, or a new device on the network.',
      'Outputs went to their configured fault state, and the process is wherever that left it. Deal with the process first.',
      'A fault that recurs at intervals is usually a watchdog or a communication timeout, and the interval is a clue.',
    ],
    causes: [
      { cause: 'Watchdog timeout from a scan that ran too long', check: 'The fault code names the watchdog. Look for a loop in logic, a large copy or search instruction, or a message instruction that blocks. The watchdog fault page covers it.' },
      { cause: 'I/O module missing, wrong type, or failed', check: 'The I/O light flashes and the fault code names a slot or a connection. Compare the chassis against the I/O configuration. A module swapped for a different part number faults the processor on some platforms.' },
      { cause: 'Remote rack or network connection lost', check: 'The connection to a remote rack, a drive, or a distributed I/O block is configured to fault the processor when it drops. Check the network light on the adapter and the switch port.' },
      { cause: 'Program error', check: 'An array index out of range, a jump to a missing label, or an arithmetic overflow on platforms that fault on it. The code gives the routine and rung. Look at what data drove it there.' },
      { cause: 'Power dip or brownout', check: 'The fault log shows a power-up event, and other equipment on the same feed logged it too. Check the panel supply and whether the controller has any backup.' },
      { cause: 'Memory backup lost', check: 'The battery or energy storage light is on. The program may be gone entirely, and the processor is faulted because it has nothing to run. Restore from the nonvolatile card or a download.' },
      { cause: 'Firmware mismatch after a replacement', check: 'A replacement processor or module with a different firmware revision than the project expects. The fault code or the software connection dialog says so.' },
      { cause: 'Hardware failure', check: 'Repeated unrecoverable faults with no other cause, especially after heat or a lightning event. Swap the processor.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Troubleshooting', 'PLC'],
    blocks: [
      { t: 'h2', text: 'Before anything else' },
      {
        t: 'p',
        text: 'The process is wherever the fault left it. Outputs went to hold, off, or a defined value depending on how each was configured, and that may have left a pump running or a valve closed. Put the equipment in a safe state by hand if it needs it, and only then start on the controller. The fault will still be there.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Equipment can move when the fault clears',
        text: 'When the processor returns to run, every output takes the state the logic commands on the first scan. A pump that was called for before the fault starts. Clear a fault only with the equipment in a state where that is acceptable and with anyone near it warned.',
      },
      { t: 'h2', text: 'Read the fault' },
      {
        t: 'steps',
        items: [
          { title: 'Note the lights.', text: 'Fault flashing or solid, run off, I/O flashing or solid, battery lit or not. Photograph the front of the processor. That pattern is the first evidence and it is lost the moment someone cycles power.' },
          { title: 'Connect and read the fault code.', text: 'The programming software shows the fault type, the code, and usually the routine and instruction. Some processors show the code on a front display. Write it down verbatim.' },
          { title: 'Read the fault log.', text: 'Most platforms keep a log of the last several faults with timestamps. A pattern in the log, the same fault every few hours, or a fault at the same time each day, points at a cause the single code does not.' },
          { title: 'Ask what changed.', text: 'A module replaced, an online edit, a new device on the network, a power event, a storm. The fault almost always follows a change, and the change is usually known to someone.' },
        ],
      },
      { t: 'h2', text: 'Match the code to the cause' },
      {
        t: 'table',
        caption: 'Reading the fault',
        head: ['What the code or lights say', 'Likely cause', 'Where to look'],
        rows: [
          ['Watchdog, scan time, or task overlap', 'A scan ran too long', 'A loop, a large instruction, a blocking message; the watchdog fault page'],
          ['I/O fault with a slot number', 'Module missing, wrong, or failed', 'The chassis and the I/O configuration'],
          ['I/O fault with a connection or node', 'Remote rack or device connection lost', 'The network link lights and the switch'],
          ['Program fault with a routine and rung', 'Array index, missing label, overflow', 'The data that drove the instruction there'],
          ['Power-up or power loss in the log', 'Brownout or outage', 'The panel supply and backup'],
          ['Memory or battery', 'Retention lost, program possibly gone', 'The backup card and the last download'],
          ['Firmware or revision', 'Mismatch after a replacement', 'The firmware revision against the project'],
        ],
      },
      { t: 'h2', text: 'Clear and restart' },
      {
        t: 'p',
        text: 'A recoverable fault is cleared from the software or by cycling the keyswitch from program to run. If the cause has not been fixed, the processor faults again, sometimes within one scan, which is itself useful information. An unrecoverable fault needs a power cycle, and if the program did not survive it, a download from the last saved project or a restore from the nonvolatile card.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Know which copy of the program is current before you download',
        text: 'If online edits were made since the last save and the processor lost its memory, the saved project is out of date. A download restores the old logic and the site runs on it without anyone noticing. Upload from a healthy processor regularly, and keep the saved project current.',
      },
      { t: 'h2', text: 'When it keeps happening' },
      {
        t: 'p',
        text: 'A processor that faults every few days with the same code is not faulting at random. Faults that arrive at the same time of day follow a scheduled load, a backup, or a report that stalls a communication task. Faults that follow storms are power or lightning. Faults that follow a technician visit are online edits. The fault log with timestamps, laid beside the operations log, usually names it.',
      },
    ],
    faqs: [
      {
        q: 'Can I just clear the fault and put it back in run?',
        a: 'You can, and it is often the right first move to get the process running, provided the equipment is in a state where outputs coming back is safe. But clear it having read and recorded the code, because if the cause is still there the fault comes back and you have lost the evidence.',
      },
      {
        q: 'What is the difference between a recoverable and an unrecoverable fault?',
        a: 'A recoverable fault can be cleared and the processor returned to run without a power cycle. An unrecoverable fault needs a power cycle, and sometimes a download, because the processor cannot trust its own state.',
      },
      {
        q: 'The processor faulted after I replaced an I/O module. Why?',
        a: 'The replacement is a different part number or revision than the I/O configuration expects, or it was inserted with the chassis powered on a platform that does not allow it. Match the part number exactly, or update the configuration and download.',
      },
      {
        q: 'Why do the outputs behave strangely when the processor is faulted?',
        a: 'They are at their configured fault state, which is set per module or per channel: hold last state, turn off, or go to a value. That configuration is a design decision and it may not be what the process needs. Review it.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/cpu',
      '/controls/plc-systems/plc-fundamentals/watchdog',
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/troubleshooting/plc-troubleshooting/retentive-data-lost',
      '/troubleshooting/power-troubleshooting/loss-of-control-voltage',
    ],
  },
  {
    path: '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
    kind: 'troubleshooting',
    title: 'Outputs Not Energizing',
    summary:
      'The program says the output is on and the equipment is not running. Where the signal gets lost between the output image and the field device, and how to find the point in a few measurements.',
    answer:
      'Between the bit in the program and the load in the field there is a chain: the logic, the output image, the module, the module fuse and field power, the wiring, the interposing relay, and the load itself. Find where the chain breaks by working from the panel outward: is the rung true, is the output bit on, is the module indicator lit, is there voltage at the module terminal, is there voltage at the relay coil and at the load. The break is between the last good measurement and the first bad one.',
    symptom:
      'A motor, valve, light, or solenoid does not operate when the program calls for it. The output may show on in the software, on the module indicator, or neither.',
    keyPoints: [
      'Confirm the rung is actually true and the output bit is on before touching hardware; a false rung is the most common cause.',
      'The module indicator lit with no voltage at the terminal means a blown module fuse or no field power to that common.',
      'Voltage at the module terminal and none at the load means wiring or the interposing relay.',
      'A forced output, or the processor in program mode, overrides the logic and looks like a failure.',
      'A remote rack with a lost connection holds its outputs at their fault state no matter what the program says.',
    ],
    causes: [
      { cause: 'The rung is not true', check: 'Look at the rung online. A permissive, an interlock, or a mode selector that is not satisfied is the usual reason. The output bit is off, and the module is doing what it was told.' },
      { cause: 'Output forced off, or a force table active', check: 'The software shows forces installed. A force left from commissioning holds the output regardless of logic.' },
      { cause: 'Processor not in run', check: 'The run light is off. In program or test mode outputs are not written. Check the keyswitch and the mode.' },
      { cause: 'Blown fuse on the output module or group', check: 'The module indicator is lit but there is no voltage at the terminal. Many modules have a fuse per group and a blown-fuse indicator. Find why it blew before replacing it.' },
      { cause: 'No field power to the output common', check: 'The output group has no supply on its common, because a branch fuse opened or the field supply is off. Measure the common against DC negative.' },
      { cause: 'Interposing relay not pulling in', check: 'Voltage at the relay coil and no click. A failed coil, a wrong voltage relay, or a relay base with a bent pin.' },
      { cause: 'Wiring open between the panel and the load', check: 'Voltage at the panel terminal and none at the load. A broken wire, a loose terminal, or a disconnect in the path.' },
      { cause: 'Remote I/O connection lost', check: 'The outputs on a remote rack sit at their fault state while the connection is down. The I/O light flashes and the connection shows faulted.' },
      { cause: 'The load itself', check: 'Voltage at the load and no operation. An open coil, a tripped overload, a motor starter with its own problem. The controller has done its job.' },
      { cause: 'Output module failed', check: 'The bit is on, the indicator may or may not be lit, and there is no output. Move the load to a spare point; if it works there the module point is dead.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Troubleshooting', 'PLC'],
    blocks: [
      { t: 'h2', text: 'Work outward from the bit' },
      {
        t: 'p',
        text: 'The most efficient order is the order of the signal: program, module, wiring, load. Each step is one look or one measurement, and each one halves the problem.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Is the rung true?', text: 'Go online and look at the rung that drives the output. If any condition on it is false, the output is off by design, and the problem is upstream of the output entirely. Find which condition and why.' },
          { title: 'Is the output bit on?', text: 'If the rung is true and the bit is off, look for a force, a second rung writing the same bit later in the scan, or a mode that is not writing outputs. The last rung to write a bit wins.' },
          { title: 'Is the module indicator lit?', text: 'The LED on the module point follows the output image. Lit means the processor delivered the command to the module. Not lit with the bit on means a module, backplane, or connection problem.' },
          { title: 'Is there voltage at the module terminal?', text: 'Measure between the output terminal and the return for that group. Indicator lit and no voltage means the group fuse or the field supply to that common.' },
          { title: 'Is there voltage at the interposing relay coil, and does it pull in?', text: 'Voltage present and no click is the relay. Voltage absent is the wire between the module and the relay.' },
          { title: 'Is there voltage at the load?', text: 'Measure at the starter coil, the solenoid, or the lamp. Voltage present and no action is the load or its own protection, and the controller is not the problem.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Measuring live outputs',
        text: 'Output commons carry the field voltage, which may be 120 VAC on a relay module. Measure with the appropriate meter category and personal protective equipment, and do not bridge a terminal with a probe to make a load operate. If something needs to be operated for a test, do it from the program or from hand mode.',
      },
      { t: 'h2', text: 'The fuse blew for a reason' },
      {
        t: 'p',
        text: 'A blown output fuse is a symptom. The usual reasons are a shorted coil, a shorted field cable, a load that draws more than the module point can supply, or an inductive load without suppression that has been pitting contacts until one welded. Replacing the fuse without finding the cause blows the new one, sometimes on the first switch. Measure the load resistance and check the wiring insulation before powering it again.',
      },
      { t: 'h2', text: 'Two ways the program can fool you' },
      {
        t: 'dl',
        items: [
          { term: 'Duplicate outputs', def: 'The same output bit written by two rungs. The last one in the scan decides, and the first one, the one being looked at, is true and apparently ignored. Search the program for every reference to the bit.' },
          { term: 'Forces', def: 'A force installed on an output overrides the logic silently. Most software shows a force indicator on the status bar, and it is easy to miss. Check for installed forces early, and remove the ones left over from commissioning.' },
        ],
      },
      { t: 'h2', text: 'Remote and distributed I/O' },
      {
        t: 'p',
        text: 'When the output is on a remote rack or a distributed block, one more thing can be wrong: the connection. A remote adapter that has lost its connection to the processor holds its outputs at their configured fault state and ignores the program until the connection returns. The processor may or may not fault, depending on how the connection is configured. The I/O status light, the connection status in the software, and the link light on the adapter tell the story.',
      },
    ],
    faqs: [
      {
        q: 'The output shows on in the program but the light on the module is off. What does that mean?',
        a: 'The processor is not delivering the output image to the module: a force, a mode that is not writing outputs, a lost remote connection, or a failed module or backplane slot. Check forces and mode first, then the I/O status.',
      },
      {
        q: 'The module light is on but there is no voltage at the terminal.',
        a: 'The module fuse for that group is open or the field supply to that group common is missing. Measure the common against the supply return, then check the group fuse and the branch fuse feeding it.',
      },
      {
        q: 'Why would a new fuse blow immediately?',
        a: 'The fault that blew the first one is still there: a shorted coil or cable, an overloaded point, or an unsuppressed inductive load that has damaged the output. Measure the load and the wiring before replacing the fuse again.',
      },
      {
        q: 'Can a PLC output drive a motor starter coil directly?',
        a: 'Some can, within the point rating, but it is poor practice. An interposing relay keeps the coil current and voltage off the module, provides isolation, and fails cheaply. Most panels use one.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/io-systems',
      '/troubleshooting/plc-troubleshooting/inputs-not-reading',
      '/troubleshooting/plc-troubleshooting/logic-not-executing-as-expected',
      '/troubleshooting/control-panel-troubleshooting/fuse-blows-repeatedly',
      '/troubleshooting/pump-troubleshooting/pump-will-not-start',
    ],
  },
  {
    path: '/troubleshooting/plc-troubleshooting/inputs-not-reading',
    kind: 'troubleshooting',
    title: 'Inputs Not Reading',
    summary:
      'A switch closes in the field and the program never sees it. How the wetting voltage, the common, sinking and sourcing, and the wiring each lose the signal, and how to find which one did.',
    answer:
      'A discrete input reads when the field contact lets the wetting voltage through to the module and the module has a common to return it to. The input fails to read when the contact does not close, the wire is open, the wetting voltage or common is missing, the module and the device disagree about sinking and sourcing, or the module point is dead. Measure at the field device, at the panel terminal, and at the module, and the break is between the last place the voltage was present and the first place it was not.',
    symptom:
      'A float, limit switch, pressure switch, or auxiliary contact operates in the field but the input bit in the program stays off, the module indicator stays dark, or both.',
    keyPoints: [
      'Confirm the field device is actually operating with a meter at its terminals; a stuck float is not a controller problem.',
      'The module indicator follows the voltage at the terminal. Dark with the contact closed means no voltage arrived.',
      'No wetting voltage on the field side, or a missing common, takes out a whole group at once.',
      'A sink and source mismatch reads never, or always, and looks like a dead module.',
      'The program can filter, invert, or force the input; check those before condemning hardware.',
    ],
    causes: [
      { cause: 'The field device is not operating', check: 'Measure across the device contacts with it in both states. A float hung on a cable or a limit switch out of adjustment never closes.' },
      { cause: 'Open wire between the device and the panel', check: 'Voltage at the device with the contact closed and none at the panel terminal. Ring the conductors out with the circuit isolated.' },
      { cause: 'Missing wetting voltage', check: 'No voltage on the supply side of the field contact. A branch fuse for the field supply has opened, or the supply is off. Usually a group of inputs fails together.' },
      { cause: 'Missing or open common', check: 'Voltage reaches the input terminal and the indicator stays dark. Measure between the terminal and the module common; if the common is missing the module cannot complete the circuit.' },
      { cause: 'Sink and source mismatch', check: 'A sensor or a wiring change that connects the input to the wrong polarity. The input never reads, or reads constantly. Compare the wiring against the module datasheet diagram.' },
      { cause: 'Input filter time too long', check: 'A short pulse from a fast contact or a flow switch is filtered out. Check the module input filter setting against the pulse width.' },
      { cause: 'Forced or inverted in the program', check: 'A force on the input, or logic that reads the bit with the wrong instruction for the wiring convention. The bit may be on and the program still not act on it.' },
      { cause: 'Wrong address or mapping', check: 'The wire is on point 7 and the program reads point 6. Compare the drawing, the terminal, and the tag.' },
      { cause: 'Remote rack connection lost', check: 'Inputs on a disconnected rack are stale. The I/O status light and the connection status show it.' },
      { cause: 'Module point failed', check: 'Voltage at the terminal, common good, indicator dark. Move the wire to a spare point; if it reads there the point is dead.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Troubleshooting', 'PLC'],
    blocks: [
      { t: 'h2', text: 'Start at the device' },
      {
        t: 'p',
        text: 'The temptation is to start at the software. Start at the field device, because a float that has hung up on a cable, a limit switch that has been knocked out of adjustment, or a pressure switch with a plugged sensing line produces exactly the same symptom as a dead input module, and it is far more common. Operate the device by hand where that is safe, and measure across its contacts.',
      },
      {
        t: 'steps',
        items: [
          { title: 'Measure at the device.', text: 'Across the contact terminals. Wetting voltage present with the contact open, near zero with it closed, means the device and its supply are fine and the problem is toward the panel. Nothing across the contacts in either state means no wetting voltage is reaching the device.' },
          { title: 'Measure at the panel terminal.', text: 'Between the input terminal and the module common. Voltage that appears when the device closes means the wire is good. Voltage missing means an open wire or a missing supply.' },
          { title: 'Check the common.', text: 'Between the module common terminal and the supply return. A missing common takes out every point on that group, and it is the cause that gets found last because nobody measures it.' },
          { title: 'Watch the module indicator.', text: 'Lit when voltage is at the terminal and the common is present. Lit indicator and an off bit is a program, mapping, force, or connection problem, not a wiring problem.' },
          { title: 'Look at the bit online.', text: 'If the bit follows the indicator, the hardware is doing its job and the logic is the question. If the bit does not follow the indicator, check forces, the I/O configuration, and the address.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'A whole group failing is a supply or common problem',
        text: 'One input failing is a device, a wire, or a point. Eight or sixteen failing together is the wetting voltage or the common for that group. Look at the group fuse and the common terminal before anything else.',
      },
      { t: 'h2', text: 'Sinking and sourcing' },
      {
        t: 'p',
        text: 'A sinking input expects the field device to connect it to the positive supply; a sourcing input expects the device to connect it to the return. Two-wire contacts do not care, but three-wire sensors do, and so does any wiring that was drawn for one convention and installed for the other. The symptom of a mismatch is an input that never turns on, or one that is on all the time, with everything measuring plausibly. The module datasheet has the diagram, and the fix is to wire to it.',
      },
      { t: 'h2', text: 'The program side' },
      {
        t: 'dl',
        items: [
          { term: 'Wiring convention', def: 'A fail-safe contact wired normally closed reads as a bit that is on in the normal state. Logic written as if the bit were normally off inverts the meaning. Agree the convention on the drawing and read the bit accordingly.' },
          { term: 'Filter time', def: 'Discrete input modules filter short pulses to reject noise. A filter set for milliseconds swallows a pulse from a fast switch. Check the filter against the pulse width of the device.' },
          { term: 'Forces', def: 'A force on an input holds the bit regardless of the terminal. Check for installed forces early.' },
          { term: 'Addressing', def: 'The tag points at a slot and a point. A module moved to another slot, or a wire landed one terminal over, puts the signal somewhere the program is not looking.' },
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Input terminals are live',
        text: 'Input modules at 120 VAC carry line voltage at every terminal that has a closed contact, whatever mode the processor is in. Isolate the field supply before working on the wiring, and measure with the meter and the protection the voltage calls for.',
      },
    ],
    faqs: [
      {
        q: 'The module light is on but the program bit is off. What is wrong?',
        a: 'The module sees the voltage and the processor is not reading the module, or is reading it and something in the program is masking it: a force, a wrong address, a remote connection that is stale, or logic that reads the bit with the wrong instruction for the wiring convention. Check those in that order.',
      },
      {
        q: 'Why did a whole group of inputs stop reading at once?',
        a: 'The wetting voltage or the common for that group is gone. A branch fuse for the field supply has opened, or the common terminal has come loose. One point failing is a device or a wire; a group is a supply.',
      },
      {
        q: 'What is a wetting voltage?',
        a: 'The voltage that a closed field contact lets through to the input module. It comes from a supply in the panel, 24 VDC or 120 VAC depending on the module, and without it a closed contact delivers nothing to the input.',
      },
      {
        q: 'Can I test an input by shorting the terminal to the supply?',
        a: 'Jumpering the input terminal to the wetting supply, with the field wire lifted, is a legitimate way to prove the module point, provided the voltage and the polarity are right for the module and the circuit is one where making that input true is safe. Know what the input does in the program first.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/io-systems',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
      '/troubleshooting/plc-troubleshooting/logic-not-executing-as-expected',
      '/controls/instrumentation/level/wet-well-level',
      '/troubleshooting/power-troubleshooting/loss-of-control-voltage',
    ],
  },
  {
    path: '/troubleshooting/plc-troubleshooting/program-will-not-download',
    kind: 'troubleshooting',
    title: 'Program Will Not Download',
    summary:
      'The software refuses to download, or the download starts and fails. The version, path, mode, memory, and protection problems behind it, and the order to check them in.',
    answer:
      'A download fails for one of a handful of reasons: the software cannot reach the processor, the processor is in run mode with the key preventing a download, the project was built for a different processor type or firmware revision, the program is larger than the memory, the processor is protected, or the connection drops partway through. The error message names the category more often than people give it credit for. Read it, check the path and the mode, then the revisions, then the memory.',
    symptom:
      'The download command is greyed out, the software reports that it cannot connect or that the controller is the wrong type or revision, the download begins and stops with an error, or it completes and the processor faults immediately.',
    keyPoints: [
      'A download is refused in run mode unless the key or the mode permits it; the mode is the first thing to check.',
      'The project targets a processor type and a firmware revision, and both must match the hardware in the chassis.',
      'The communication path has to reach the processor: right driver, right address, right slot, on a network the laptop can actually see.',
      'A processor that faults immediately after a download is usually an I/O configuration that does not match the chassis.',
      'Downloading replaces what is running. Upload first if there is any doubt about which copy is current.',
    ],
    causes: [
      { cause: 'Processor in run mode with the key in run', check: 'The download option is unavailable or refused. Turn the key to remote or program, or set program mode from the software if the key is in remote.' },
      { cause: 'No communication path', check: 'The software cannot connect at all. Check the cable, the link light, the laptop address on the right subnet, the driver, and the slot number in the path.' },
      { cause: 'Wrong processor type in the project', check: 'The error names a type mismatch. The project was created for a different controller. Change the controller type in the project properties, and review what that changes.' },
      { cause: 'Firmware revision mismatch', check: 'The error names a revision. The processor firmware is older or newer than the project. Flash the processor to the project revision, or change the project revision, according to what the site standard says.' },
      { cause: 'Program too large for memory', check: 'The download starts and fails with a memory error, or the software warns before starting. Reduce the program, or the data table, or use a processor with more memory.' },
      { cause: 'Processor protected', check: 'A password, a source protection scheme, or a security authority that the laptop is not part of. The error says so; the owner of the credentials is the fix.' },
      { cause: 'Connection drops during the download', check: 'A poor Ethernet link, a wireless connection, or a serial cable with a marginal connector. Use a wired link directly to the processor for downloads.' },
      { cause: 'Download succeeds and the processor faults', check: 'The I/O configuration in the project does not match the chassis. Compare the configured modules and revisions against what is installed.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Troubleshooting', 'PLC', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Before you download at all' },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A download replaces the running program',
        text: 'If anyone has made online edits since the project on the laptop was saved, the download erases them and the site runs the older logic. Upload from the processor first and compare, or confirm with whoever last worked on it. And a download in program mode stops the process: the outputs go to their configured state for as long as it takes. Plan it.',
      },
      { t: 'h2', text: 'Work through it in order' },
      {
        t: 'steps',
        items: [
          { title: 'Can the software see the processor?', text: 'Browse the network from the software. If the processor does not appear, the problem is the path: cable, link light, the laptop address and subnet, the driver configuration, or a firewall on the laptop. A processor you cannot browse to cannot be downloaded to.' },
          { title: 'What mode is it in?', text: 'Run with the key in run refuses downloads on most platforms. Remote lets the software change the mode. Program accepts a download. The key position at the panel decides which of these is available from the laptop.' },
          { title: 'Does the project match the hardware?', text: 'Open the project properties and compare the controller type and the firmware revision against what is written on the processor and shown when browsing. A mismatch in either is refused, and the message says which.' },
          { title: 'Is there room?', text: 'The software reports the program and data sizes and the processor reports its capacity. A program at the limit fails partway through.' },
          { title: 'Is it protected?', text: 'Passwords, source protection, and security authorities all refuse downloads from a laptop that lacks the credentials. The message names it. Do not try to work around it; find the credentials.' },
          { title: 'Is the link stable?', text: 'A download over a wireless bridge or a marginal serial cable fails partway. Plug in directly to the processor for the download.' },
        ],
      },
      { t: 'h2', text: 'Revisions' },
      {
        t: 'p',
        text: 'The project file, the programming software, and the processor firmware each carry a major revision, and the three have to agree. The usual way this goes wrong is a replacement processor from stock carrying a different firmware than the one it replaced, or a laptop with a newer software version that has silently upgraded the project. The site standard should say which revision the site runs on and the rack drawing should record it, so that the choice between flashing the processor and changing the project is made deliberately rather than at two in the morning.',
      },
      { t: 'h2', text: 'The download that works and then faults' },
      {
        t: 'p',
        text: 'A download that completes and leaves the processor faulted with an I/O error is almost always a configuration mismatch: a module in the project that is not in the chassis, a module in the chassis of a different part number than the project expects, or a remote connection to something that is not there. Compare the I/O tree in the project against the physical chassis slot by slot. On platforms that check module revisions, a compatible newer module can still be refused by a configuration set to exact match.',
      },
      { t: 'h2', text: 'Afterward' },
      {
        t: 'p',
        text: 'Verify the processor is in run, the I/O light is solid, and the process has resumed. Save the project with a note of what changed and where the copy lives. A download is a change to the plant, and the next person needs to know it happened.',
      },
    ],
    faqs: [
      {
        q: 'Why is the download option greyed out?',
        a: 'The software is not connected to a processor that will accept one. Either there is no connection, or the processor is in run with the key in run. Connect, then change the mode.',
      },
      {
        q: 'The software says the controller is the wrong revision. Should I flash it?',
        a: 'Only if the site standard says that revision is the target. Flashing changes the processor firmware for everything that runs on it. The alternative is to change the project revision to match the processor, which may be the right answer if the processor is the one that was already running the plant.',
      },
      {
        q: 'Can I download while the plant is running?',
        a: 'A full download requires program mode, which stops logic and drives outputs to their configured state for the duration. Online edits change logic while running and are the tool for small changes. A full download is planned with the process in a state that can tolerate the stop.',
      },
      {
        q: 'Should I upload before I download?',
        a: 'Yes, whenever there is any doubt that the saved project is current. Online edits made since the last save exist only in the processor, and a download erases them.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/cpu',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
      '/controls/plc-systems/programming/program-organization',
      '/troubleshooting/plc-troubleshooting/retentive-data-lost',
    ],
  },
];
