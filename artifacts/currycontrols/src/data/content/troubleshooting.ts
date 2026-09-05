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
  {
    path: '/troubleshooting/plc-troubleshooting/logic-not-executing-as-expected',
    kind: 'troubleshooting',
    title: 'Logic Not Executing As Expected',
    summary:
      'The rung looks right and the plant does something else. The scan-order, duplicate-output, unscheduled-routine, and data-type traps behind it, and how to find which one you are in.',
    answer:
      'When logic that reads correctly does the wrong thing, the program is usually doing exactly what it says, in an order or a context the reader did not see. The last rung to write a bit wins; a routine that is never called never runs; a force overrides the rung; a comparison of two floats for equality never comes true; and an instruction that looks like the one you meant behaves differently. Find the discrepancy by watching the rung online, then searching for every other place that touches the same tag.',
    symptom:
      'A rung shows true online but the equipment does not respond, or the equipment responds when the rung is false, or a value in the program is not what the arithmetic should produce, or a change made to the program has no visible effect.',
    keyPoints: [
      'Search every reference to the output tag. A second rung writing it later in the scan overrides the one you are looking at.',
      'Confirm the routine is actually called and its task is actually scheduled. Logic that is not scanned does nothing, however correct.',
      'Check for forces and for online edits that were never assembled.',
      'Float equality, integer overflow, and mismatched data types produce results that look like logic errors.',
      'The instruction is not always the one it looks like: latch against output, one-shot rising against falling, retentive timer against on-delay.',
    ],
    causes: [
      { cause: 'Duplicate destructive outputs', check: 'Cross reference the tag. Two OTE instructions on one bit leave it in the state of the last one scanned. The first rung appears true and ignored.' },
      { cause: 'Routine not called, or task not scheduled', check: 'Find the jump to the routine and confirm its rung is true. Confirm the program containing it is scheduled in a running task and not inhibited.' },
      { cause: 'Forces installed', check: 'The software shows forces enabled. A force on the input or the output makes the rung irrelevant.' },
      { cause: 'Online edit pending', check: 'An edit that was accepted but not assembled or tested is not executing. The rung shows the edit; the controller runs the old logic.' },
      { cause: 'Scan order', check: 'A value written late in the scan is read early in the next one. Logic that expects a value set by a later rung to be current in an earlier rung is one scan behind.' },
      { cause: 'Float compared for equality', check: 'Two REALs that should be equal differ in the last digit and the equals instruction never fires. Compare with a tolerance.' },
      { cause: 'Integer overflow or truncation', check: 'An INT that rolled past 32,767, or a REAL copied into an INT and truncated. Watch the value online through the arithmetic.' },
      { cause: 'Wrong instruction', check: 'A latch where an output was intended holds forever. A one-shot on the wrong edge fires at the wrong time. A retentive timer never resets. Read the instruction help, not the symbol.' },
      { cause: 'Indirect address pointing elsewhere', check: 'An array index or a pointer that is not the value assumed. Watch the index online.' },
      { cause: 'Alias or mapping to the wrong tag', check: 'The tag in the rung is an alias for a different base tag than expected, or the I/O mapping moved with a module.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Troubleshooting', 'PLC', 'Programming'],
    blocks: [
      { t: 'h2', text: 'Watch it, do not read it' },
      {
        t: 'p',
        text: 'Reading logic on a screen and reasoning about what it should do is where the trouble started. Go online and watch the rung execute: which instructions are true, what the values are, and whether the output changes when the rung does. The controller does not do what the logic looks like; it does what the logic is, in the order it is scanned, with the data it has at that moment. Watching shows that; reading does not.',
      },
      { t: 'h2', text: 'The scan is the first suspect' },
      {
        t: 'p',
        text: 'A controller writes outputs at the end of the scan, so if two rungs write the same bit, only the last one matters. This is the single most common cause of a rung that is true and apparently ignored, and the fix is a cross reference: find every instruction that writes the tag. A bit written by an output instruction in one routine and cleared by a move or a clear in another, or written in two routines that were both copied from a template, is a bit whose state depends on scan order alone.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Cross reference before you edit',
        text: 'The cross reference tool lists every instruction that reads or writes a tag, with its routine and rung. Run it on the output tag first, then on each input to the rung. Most logic mysteries end there, before a single edit is made.',
      },
      { t: 'h2', text: 'Is it even running?' },
      {
        t: 'p',
        text: 'A routine executes only when something calls it. A routine created and never given a jump, a jump on a rung whose condition is never true, or a program placed in a task that is inhibited or was never scheduled, contains logic that is correct, visible, and dead. Online, a routine that is not being scanned shows no live values, or shows them frozen, and that is the tell. Confirm the call chain from the main routine down before trusting anything inside.',
      },
      { t: 'h2', text: 'Data that lies' },
      {
        t: 'dl',
        items: [
          { term: 'Float equality', def: 'A setpoint of 6.0 entered from the HMI and a level of 6.0 calculated from counts are not the same thirty-two bits. An equals instruction between them is false. Use a greater-than-or-equal with a deadband, or compare within a tolerance.' },
          { term: 'Integer overflow', def: 'An INT that counts past 32,767 becomes negative. Arithmetic that overflows sets a status flag on most platforms and produces a wrong number that the logic then acts on.' },
          { term: 'Truncation', def: 'A REAL moved into an INT loses its fraction, and on some platforms rounds while on others it truncates. A calculation done in integers divides and drops the remainder.' },
          { term: 'Stale data', def: 'A value from a communication instruction or a consumed tag that stopped updating holds its last value. The logic acts on a number that was true an hour ago.' },
        ],
      },
      { t: 'h2', text: 'The instruction that is not the one you meant' },
      {
        t: 'p',
        text: 'Ladder symbols are compact and several of them look alike. An output latch holds the bit until an unlatch clears it, and looks almost like an output. A one-shot rising fires on the false-to-true transition; the falling version fires on the other, and both look like a contact. A retentive timer keeps its accumulated value when its rung goes false and needs a reset instruction; an on-delay timer resets itself. A negated output is on when the rung is false. When a rung behaves oddly, open the instruction help and read what the instruction actually does before assuming the logic around it is wrong.',
      },
      { t: 'h2', text: 'After an edit that did nothing' },
      {
        t: 'p',
        text: 'A change that has no effect is either not executing or is being overridden. Online edits go through accept, test, and assemble on most platforms, and an edit that was accepted and never assembled shows in the editor and does not run. A download to the wrong controller, or a save without a download, leaves the plant on the old program. Confirm the controller is running the program you think it is by comparing the project against the controller.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Testing logic on a running plant moves equipment',
        text: 'Toggling a bit to see what happens, or forcing an output to prove a rung, starts pumps and moves valves. Test with the equipment in hand or locked out where the result could hurt someone, and remove every force before leaving.',
      },
    ],
    faqs: [
      {
        q: 'The rung is true online but the output does not turn on. Why?',
        a: 'Almost always another rung writing the same output later in the scan. Cross reference the output tag. If nothing else writes it, check for a force, then for the routine not actually being scanned.',
      },
      {
        q: 'Why does my equals comparison never work on a level setpoint?',
        a: 'Because the two floating point values differ in the last bit and are never exactly equal. Compare with a tolerance, or use greater than or equal and less than or equal with a deadband.',
      },
      {
        q: 'I made an online edit and nothing changed.',
        a: 'The edit is accepted but not assembled, so the controller still runs the old rung. Or the edit is in a routine that is not called. Or the edit was made to a project that was never downloaded. Check each in that order.',
      },
      {
        q: 'What is a destructive output?',
        a: 'An instruction that unconditionally writes a bit every scan, such as a standard output coil. Two of them on the same bit fight, and the last one scanned wins. Use one output per bit and combine the conditions on its rung.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/scan-cycle',
      '/controls/plc-systems/programming/ladder-logic',
      '/controls/plc-systems/plc-fundamentals/memory',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
      '/controls/plc-systems/programming/program-organization',
    ],
  },
  {
    path: '/troubleshooting/plc-troubleshooting/retentive-data-lost',
    kind: 'troubleshooting',
    title: 'Retentive Data Lost',
    summary:
      'The plant came back from a power cycle with zero setpoints, zero totals, and the wrong pump as lead. Which backup failed, which restore overwrote what, and how to get the data back and keep it.',
    answer:
      'Retained data is lost when the backup that holds it fails, or when something writes over it. A dead battery or a discharged energy storage module leaves nothing after an outage; a download loads the values saved in the project; a memory card set to load on power-up restores the day it was written. Recover from the most recent upload of the controller, then find which of those happened, because the same cause will do it again at the next outage.',
    symptom:
      'After a power cycle, a download, or a processor replacement, setpoints read zero or default, totalizers and run hours have reset, alternation starts from the first pump, and operators are re-entering values from memory.',
    keyPoints: [
      'A low battery indicator that was lit for months is the usual story. Check it first and check the battery date.',
      'A download replaces the data table with the values in the project file. If the project is old, so are the values.',
      'A nonvolatile card configured to load on power-up restores whatever it held, however stale.',
      'Recovery is from the last upload; if there is none, the values come from operator memory and the narrative.',
      'Prevent the next one: replace the battery on schedule, upload after every change, and hold setpoints in SCADA as a second copy.',
    ],
    causes: [
      { cause: 'Battery dead', check: 'The battery indicator is lit, and the battery date on the module or in the log is years old. A power cycle with a dead battery clears the retained data.' },
      { cause: 'Energy storage module discharged', check: 'The controller was unpowered for longer than the module holds, days to weeks, or the module has aged and holds less than it did.' },
      { cause: 'Download from a stale project', check: 'Someone downloaded. The project file on the laptop carried the tag values from the day it was saved.' },
      { cause: 'Memory card restore', check: 'The card is set to load on power-up, and it was written at commissioning. Everything since then is gone after every power cycle.' },
      { cause: 'Processor replaced or firmware updated', check: 'A new processor has an empty data table, and a firmware update clears it on most platforms. Was an upload taken first?' },
      { cause: 'Tags not retentive', check: 'On a platform where retention is per tag or per area, the tags were never marked. This shows up at the first real power cycle after commissioning.' },
      { cause: 'First-scan logic clearing values', check: 'A routine on the first-scan bit that initializes tags, written for commissioning and left in. It runs on every power-up.' },
      { cause: 'Corrupted memory', check: 'A fault code naming memory, after a lightning event or a hardware failure. The data is gone and the processor may be suspect.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Troubleshooting', 'PLC'],
    blocks: [
      { t: 'h2', text: 'Get the plant running first' },
      {
        t: 'p',
        text: 'A plant with zero setpoints is a plant that is not controlling. Before finding the cause, restore operation: load the last upload if there is one, or enter the setpoints from the control narrative and the operators, and check every one against its range before putting anything in auto. Totals and run hours can be reconstructed later from the historian; setpoints cannot wait.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Zero is not a safe setpoint',
        text: 'A lead start level of zero starts the pumps continuously; a high level alarm of zero alarms continuously and gets silenced; a chemical dose setpoint of zero stops the dose. Put equipment in hand until the setpoints are back, and confirm each value before returning it to auto.',
      },
      { t: 'h2', text: 'Which one was it' },
      {
        t: 'steps',
        items: [
          { title: 'Look at the battery indicator and the fault log.', text: 'A lit battery light, a low battery entry in the log, or a battery date years past its replacement interval settles it.' },
          { title: 'Ask what happened just before.', text: 'A power outage, a download, a processor swap, a firmware update, a card inserted. Each has its own signature, and someone knows.' },
          { title: 'Check the memory card setting.', text: 'If a card is installed, read its load configuration and the date it was written. A card set to load on power-up with an old date is the cause, and it will be the cause again.' },
          { title: 'Compare the values you have to what was lost.', text: 'Values reset to the project defaults point to a download or a card. Values reset to zero point to a lost data table.' },
          { title: 'Check retention configuration.', text: 'On platforms that mark retention per tag or area, confirm the lost tags were marked. If not, the data was never retained and this was the first power cycle to show it.' },
        ],
      },
      { t: 'h2', text: 'Recovering the data' },
      {
        t: 'dl',
        items: [
          { term: 'From an upload', def: 'The best case. An upload taken from the running controller, with its data table, restores everything to the moment it was taken. Restore it and reconcile the setpoints changed since.' },
          { term: 'From SCADA', def: 'Setpoints entered from the HMI are often stored in the SCADA database as well as the controller, and the historian holds the last value of every logged tag. Read them back from there.' },
          { term: 'From the narrative and the operators', def: 'The control narrative lists initial setpoints; the operators know what they changed and why. Slower, and it works.' },
          { term: 'Totals and run hours', def: 'Reconstruct from the historian, from the last report, or from the equipment’s own hour meters. Note the date of the reset on the record so that a future reviewer understands the step in the trend.' },
        ],
      },
      { t: 'h2', text: 'Keeping it from happening again' },
      {
        t: 'ul',
        items: [
          'Replace the battery on a schedule, with the controller powered, and write the date on it and on the rack drawing. Alarm the low battery bit in SCADA so it cannot be ignored.',
          'Upload the controller, including the data table, after every change and on a schedule, and keep the copies somewhere that is not in the panel.',
          'Set the memory card to load only on a lost memory, not on every power-up, and rewrite it after every change if it is relied on at all.',
          'Before any download, upload first and compare. Before any processor swap or firmware update, upload first.',
          'Hold setpoints in SCADA as well, and write them back to the controller on first scan or on operator command, so that a controller that comes up empty is refilled from the host.',
          'Remove commissioning initialization logic from the first-scan routine, or guard it so it runs once and never again.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I get the setpoints back after the battery died?',
        a: 'From the last upload of the controller, from the SCADA database or historian, or from the control narrative and the operators. The controller itself has nothing to give back.',
      },
      {
        q: 'Why did a download reset my setpoints?',
        a: 'A download writes the whole project, including the tag values saved in the project file, and those are the values from the day it was saved. Upload before you download, and either merge the current values into the project or restore them afterward.',
      },
      {
        q: 'How do I know if my controller has a battery or a capacitor module?',
        a: 'From the processor manual and the module on the front of it. Newer processors mostly use an energy storage module with no replacement; older ones use a lithium battery with a replacement interval. Either way the controller reports its status.',
      },
      {
        q: 'Should setpoints be stored in SCADA as well as the PLC?',
        a: 'Yes. The controller is the authority while running, and SCADA is the backup that refills it after a loss. Write-back on first scan or on an operator command, with the operator confirming, is the usual arrangement.',
      },
    ],
    related: [
      '/controls/plc-systems/plc-fundamentals/retentive-memory',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
      '/troubleshooting/plc-troubleshooting/program-will-not-download',
      '/controls/plc-systems/plc-fundamentals/cpu',
    ],
  },
  {
    path: '/troubleshooting/scada-troubleshooting/values-frozen-on-screen',
    kind: 'troubleshooting',
    title: 'Values Frozen On Screen',
    summary:
      'The HMI shows numbers that are not changing while the plant runs. Whether the controller, the communication driver, the tag server, or the display stopped, and the order to check them in.',
    answer:
      'A frozen value is a value that has stopped updating somewhere between the field and the pixel. Work back along the path: is the controller in run and scanning, is the communication driver connected to it, is the tag server updating the tag, is the client connected to the server, is the display bound to the tag at all. The tag quality and timestamp, which every SCADA platform records, tell you at which link the update stopped.',
    symptom:
      'Values on one or more displays stay constant while the process is known to be changing. Alarms may not be arriving. The values may be plausible, which is what makes the symptom dangerous.',
    keyPoints: [
      'Check the tag timestamp and quality first; they say when the value last updated and whether the driver considers it good.',
      'If every tag from one controller is frozen, the communication link or the controller is the problem, not the display.',
      'If every tag on every controller is frozen, the tag server or the client connection stopped.',
      'If one tag is frozen and its neighbors update, the tag is misconfigured, bound wrong, or the controller value really is static.',
      'A controller in program mode or faulted delivers values that never change and reports a healthy connection.',
    ],
    causes: [
      { cause: 'Controller faulted or in program mode', check: 'The connection is up and the values are static because the controller is not scanning. Look at the processor lights and the SCADA driver status.' },
      { cause: 'Communication driver disconnected', check: 'Driver diagnostics show the device off line or timing out. Every tag from that device is stale with bad quality.' },
      { cause: 'Tag server or service stopped', check: 'Every tag from every device is stale. The SCADA runtime or the OPC server has stopped or hung. The service status on the server shows it.' },
      { cause: 'Client lost its connection to the server', check: 'On a client and server architecture the display is running but not receiving updates. Other clients update normally. The client connection status shows it.' },
      { cause: 'License expired or limit reached', check: 'Some platforms stop updating tags, or stop accepting new connections, when the license lapses or the tag count exceeds it. A message on the server says so.' },
      { cause: 'Scan class or polling disabled', check: 'A tag group set to a slow rate, or a scan class paused, or a device disabled in the driver. Tags in other groups update.' },
      { cause: 'Display bound to a static tag or the wrong tag', check: 'One value on one display never updates while the same tag on another display does. The display object is bound to a memory tag, a constant, or the wrong name.' },
      { cause: 'Duplicate IP address or device address', check: 'Two devices answering the same address, so the driver reads an unrelated device that happens to return constant data, or alternates between two.' },
      { cause: 'The value really is static', check: 'A flow of zero at night, a tank at its overflow, a controller holding a bad-quality input. Confirm from the field before chasing SCADA.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Troubleshooting', 'SCADA', 'Communications'],
    blocks: [
      { t: 'h2', text: 'Frozen is worse than blank' },
      {
        t: 'p',
        text: 'A display that shows nothing gets a phone call. A display that shows a plausible level from an hour ago gets trusted, and the operator makes decisions on it until something floods. Most SCADA platforms can show stale data differently, greyed, hatched, or flagged with the quality, and the first fix on a system where this has happened once is to turn that on so that frozen never looks like live again.',
      },
      { t: 'h2', text: 'Locate the break' },
      {
        t: 'steps',
        items: [
          { title: 'Read the timestamp and the quality.', text: 'Every tag carries the time it last updated and a quality from the driver. A tag with a timestamp from an hour ago and bad quality tells you the driver stopped getting it; a current timestamp with good quality on a value that is not changing tells you the value is not changing.' },
          { title: 'Find the scope.', text: 'One tag, all the tags from one controller, or every tag on the system. One tag is the tag configuration. One controller is the link or the controller. Everything is the server or the client.' },
          { title: 'Check the controller.', text: 'Run light on, no fault, I/O light solid. A faulted controller answers the driver perfectly well with values that never change.' },
          { title: 'Check the driver.', text: 'The driver diagnostics show each device connected or failed, with error counts and the last good read. A device in a failed state, or one with a rising timeout count, is the break.' },
          { title: 'Check the server and the client.', text: 'Service running, license valid, tag count within limits, and, on a client, the connection to the server up. A client showing a disconnected banner is a client that has been ignored.' },
          { title: 'Check the display binding.', text: 'For a single frozen object, open the display in the designer and read the tag it is bound to. Compare with the tag browser and the controller.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Compare with the controller directly',
        text: 'Go online to the controller with the programming software and watch the tag there. If it changes in the controller and not in SCADA, the problem is between them. If it is static in the controller, SCADA is reporting the truth and the fault is upstream, in the field or the program.',
      },
      { t: 'h2', text: 'The link' },
      {
        t: 'p',
        text: 'The connection between the driver and the controller is where most freezes happen. A radio path that faded, a switch that rebooted, a cellular modem that lost registration, a controller Ethernet port that hung, an address conflict. The driver retries, gives up, and marks the device failed; some drivers mark it and some just stop updating. The network and radio troubleshooting pages cover the physical causes; from the SCADA side, the driver diagnostics say which device and since when.',
      },
      { t: 'h2', text: 'After it comes back' },
      {
        t: 'p',
        text: 'When the updates resume, look at the alarm summary and the historian for the gap. Alarms that occurred during the freeze may have been missed or may arrive all at once; events in the controller that a DNP3 outstation would have buffered are gone on a polled protocol. Note the outage in the log with its start, its end, and its cause, and if the cause was a link, watch the driver counters for the next week.',
      },
    ],
    faqs: [
      {
        q: 'How can I tell whether the controller or SCADA is the problem?',
        a: 'Watch the tag in the controller with the programming software. If it changes there and not on the screen, the path between them is broken. If it is static there too, the controller or the field is the problem and SCADA is showing the truth.',
      },
      {
        q: 'Why does the driver show connected but the values do not update?',
        a: 'The controller is answering but not scanning: faulted or in program mode. Or the tag is in a scan group that is disabled or set to a very slow rate. Or the value genuinely is not changing.',
      },
      {
        q: 'Why did every screen freeze at once?',
        a: 'The tag server or the SCADA runtime stopped, the license lapsed, or the client lost the server. Check the service on the server and the connection banner on the client.',
      },
      {
        q: 'How do I make stale data obvious to operators?',
        a: 'Use the platform feature that displays bad or stale quality differently, and put a communication status indicator for each controller on the overview display. Frozen data that looks live is the failure to design out.',
      },
    ],
    related: [
      '/troubleshooting/scada-troubleshooting/tag-shows-bad-quality',
      '/troubleshooting/plc-troubleshooting/processor-faulted',
      '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
      '/troubleshooting/radio-troubleshooting/remote-site-stops-communicating',
      '/controls/scada-hmi/scada-fundamentals/what-is-scada',
    ],
  },
  {
    path: '/troubleshooting/scada-troubleshooting/tag-shows-bad-quality',
    kind: 'troubleshooting',
    title: 'Tag Shows Bad Quality',
    summary:
      'A tag flagged bad or uncertain by the driver. What the quality codes mean, the difference between a device that is not answering and an address that does not exist, and how to clear each.',
    answer:
      'Quality is the driver’s statement about whether it trusts the value. Bad quality with a not-connected substatus means the driver cannot reach the device. Bad quality with a configuration error means the device answered and refused: the address is out of range, the data type does not fit the register, or the tag no longer exists in the controller. Uncertain means the value is old or was substituted. Read the substatus; it splits the problem in half before any measurement is made.',
    symptom:
      'One tag, a group of tags, or every tag from a device displays with a bad or uncertain quality indicator, shows a question mark or a hatch pattern, or reads a default value while the driver reports an error.',
    keyPoints: [
      'Bad quality is a category, not a diagnosis; the substatus says whether it is the link, the address, or the data type.',
      'All tags from a device bad means the connection; some tags bad means those addresses.',
      'A register beyond what the device has, or a float requested at a register that holds an integer, comes back bad with a configuration error.',
      'A tag renamed or deleted in the controller after a download is bad in SCADA until SCADA is updated.',
      'Uncertain quality usually means the last value is being held past its update interval.',
    ],
    causes: [
      { cause: 'Device not reachable', check: 'Every tag from the device is bad, substatus not connected or communication failure. The driver diagnostics show timeouts. Ping the device and check the link.' },
      { cause: 'Address out of range', check: 'Specific tags are bad with an illegal address or configuration error. The device does not have that register or that point. Compare the address against the device map.' },
      { cause: 'Data type mismatch', check: 'The tag is configured as a float or a string at an address the device serves as an integer, or the byte order is wrong. Read the raw registers and compare.' },
      { cause: 'Tag missing in the controller', check: 'On tag-based controllers, the tag was renamed, deleted, or its scope changed. The driver cannot find it. Compare the SCADA tag list to the controller.' },
      { cause: 'Access denied', check: 'A controller or server security setting refuses the driver, or refuses writes. The driver log names it.' },
      { cause: 'Device busy or connection limit', check: 'Intermittent bad quality across many tags when other clients connect. The device has run out of connections or is overloaded by the poll rate.' },
      { cause: 'Scan group too fast for the link', check: 'Tags flip between good and bad as polls time out on a slow radio or cellular link. Lengthen the timeout and slow the group.' },
      { cause: 'Value held stale', check: 'Uncertain quality with an old timestamp. The driver is holding the last value because the update failed and the configuration says to hold.' },
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 7,
    tags: ['Troubleshooting', 'SCADA', 'Communications', 'Modbus'],
    blocks: [
      { t: 'h2', text: 'What quality is' },
      {
        t: 'p',
        text: 'Every value that comes through an OPC or a native driver carries a quality: good, bad, or uncertain, with a substatus that says why. It is the driver telling the display and the historian how much to trust the number, and it is the reason a well-built display shows a hatched box instead of a stale level. Reading the quality, not just the value, is the whole of the diagnosis at the SCADA end.',
      },
      {
        t: 'table',
        caption: 'Reading the quality',
        head: ['Quality', 'Substatus', 'Meaning', 'Where to look'],
        rows: [
          ['Bad', 'Not connected, communication failure', 'The driver cannot reach the device', 'The link, the device, the address on the network'],
          ['Bad', 'Configuration error, illegal address', 'The device answered and refused the request', 'The tag address against the device register map'],
          ['Bad', 'Device failure', 'The device reported an internal fault', 'The device itself'],
          ['Bad', 'Not found', 'No such tag in the controller', 'The controller tag list after the last download'],
          ['Uncertain', 'Last usable value', 'The update failed and the driver is holding the old value', 'The link, and the hold configuration'],
          ['Uncertain', 'Sub-normal, sensor not accurate', 'The device says the value is questionable', 'The instrument and the controller validation'],
          ['Good', 'Local override', 'The value is forced in SCADA', 'Who forced it and why'],
        ],
      },
      { t: 'h2', text: 'Scope first' },
      {
        t: 'p',
        text: 'Before anything else, note how many tags are bad. Every tag from a device is a connection problem, and the address of every tag is irrelevant. Some tags from a device, with others good, is an address or type problem on those tags, and the connection is fine. One tag is that tag. The scope halves the work before a single setting is opened.',
      },
      { t: 'h2', text: 'Address and type' },
      {
        t: 'p',
        text: 'A Modbus device serves a defined set of registers, and a request for one outside the set comes back with an exception, which the driver reports as bad. A device with holding registers 40001 through 40100 refuses a read of 40101. A float occupies two registers and a request that starts on the second half of one reads garbage or is refused. Byte and word order within a float differ between devices, and a wrong order produces a plausible wrong number with good quality, which is worse. The register map in the device manual, read with the offset convention of the driver in mind, settles all of it. The Modbus pages on this site cover the offset problem.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Read the raw registers',
        text: 'Most drivers and most Modbus test tools can read a block of registers as plain integers. Read the block that the bad tag sits in. If the registers come back, the address exists and the problem is the data type or the offset. If the block is refused, the address does not exist on that device.',
      },
      { t: 'h2', text: 'Tag-based controllers' },
      {
        t: 'p',
        text: 'On a controller addressed by tag names, SCADA asks for the tag by name and the controller looks it up. A tag renamed, moved into a program scope, or deleted in the last download no longer exists under the old name, and every SCADA reference to it goes bad at once, with a not-found or similar substatus. The fix is to update the SCADA tag, and the prevention is to treat a tag rename as a change to SCADA as well as to the controller.',
      },
      { t: 'h2', text: 'Intermittent bad' },
      {
        t: 'p',
        text: 'Quality that flickers between good and bad on a slow link is a poll that sometimes times out. The driver asks, the radio takes longer than the timeout, the driver marks it bad, the answer arrives, the next poll succeeds. Lengthen the timeout to cover the real round trip, slow the scan group so the link is not saturated, and reduce the number of separate requests by grouping contiguous addresses. The device-times-out page covers the link side.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between bad and uncertain quality?',
        a: 'Bad means the driver has no trustworthy value: the device is unreachable or refused the request. Uncertain means the driver has a value it does not fully trust, usually the last good one held past its update time, or one the device flagged as questionable.',
      },
      {
        q: 'Why is one tag bad when the rest from the same device are good?',
        a: 'That tag’s address does not exist on the device, or its data type does not match what the register holds. The connection is fine. Check the address against the register map and the type against what the device serves.',
      },
      {
        q: 'All my tags went bad after a PLC download. Why?',
        a: 'Tags were renamed, moved to a different scope, or deleted in the new program, or the download changed the controller path. Compare the SCADA tag list to the controller’s and update the references.',
      },
      {
        q: 'Can a value be wrong with good quality?',
        a: 'Yes. A float read with the wrong word order, or an integer read from the wrong register, returns a number the driver has no reason to doubt. Good quality means the transaction succeeded, not that the mapping is right.',
      },
    ],
    related: [
      '/troubleshooting/scada-troubleshooting/values-frozen-on-screen',
      '/troubleshooting/communications-troubleshooting/wrong-register-data',
      '/troubleshooting/communications-troubleshooting/device-times-out',
      '/controls/plc-systems/communications/modbus-tcp',
      '/controls/plc-systems/communications/opc-ua',
    ],
  },
  {
    path: '/troubleshooting/pump-troubleshooting/pump-will-not-start',
    kind: 'troubleshooting',
    title: 'Pump Will Not Start',
    summary:
      'A pump that is called and does nothing. The order to check: permissives and mode, control power, the starter or drive, the motor circuit, and the pump itself, with the measurements that settle each one in minutes.',
    answer:
      'A pump that will not start is stopped by one of five things, checked in order: the controller is not calling it (mode, permissives, interlocks, or a latched fault), the control circuit is open (control power, stop circuit, overload contact, safety devices), the starter or drive is not closing (coil, contactor, drive fault or enable), the power circuit is open (breaker, fuses, phase loss, disconnect), or the motor or pump is mechanically stuck. Work from the controller outward and confirm each stage with a measurement, not an assumption.',
    keyPoints: [
      'Establish first whether the pump starts in HAND. That splits the problem in half.',
      'A pump that starts in HAND but not in AUTO is a controller or permissive problem.',
      'A pump that starts in neither is a control circuit, starter, drive, power, or mechanical problem.',
      'Follow the control circuit with a meter from the source to the coil. The open is where the voltage stops.',
      'A humming motor that does not turn is a mechanical or single-phase problem. Stop trying.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Troubleshooting', 'Pumps', 'Panels', 'Control'],
    symptom:
      'The pump is commanded to run, from the HOA in HAND or from the controller in AUTO, and the motor does not turn. There may be a fault indication, or nothing at all.',
    causes: [
      { cause: 'Not in AUTO, or a permissive is not met', check: 'HOA position on the panel and the HMI; permissive and interlock status in the controller. A phase monitor, a seal-leak input, a low-level cutoff, or a lockout bit will all hold the call off.' },
      { cause: 'Latched fault in the controller or the drive', check: 'Fault history in the program and on the drive display. Reset only after reading the fault.' },
      { cause: 'Control power lost or the control circuit open', check: 'Voltage at the control transformer secondary, then at each device in series to the starter coil: stop button, overload contact, seal-leak relay, thermal switch, HOA contact.' },
      { cause: 'Overload relay tripped', check: 'Trip indicator or reset button on the overload. Note the cause before resetting; a tripped overload had a reason.' },
      { cause: 'Starter coil or contactor failed', check: 'Voltage at the coil terminals when called. Coil energized and contactor not pulling in means the contactor; no coil voltage means the circuit ahead of it.' },
      { cause: 'Drive not enabled, faulted, or not receiving the run command', check: 'Drive display: fault code, enable input status, run command source, speed reference. A drive with the enable open shows ready and never runs.' },
      { cause: 'Power circuit open: breaker, fuses, disconnect, phase loss', check: 'Voltage on all three phases at the line side and the load side of the starter or drive. One blown fuse gives single phasing: hum and no rotation, or a trip.' },
      { cause: 'Motor winding or cable fault', check: 'Insulation resistance test on the motor and cable with power locked out and the drive disconnected. Low insulation resistance or an open phase.' },
      { cause: 'Pump or motor mechanically seized', check: 'With power locked out, try to turn the shaft or impeller by hand. Rags, a bearing, or a jammed impeller. Submersibles are pulled for this.' },
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Locked out means locked out',
        text: 'Anything past the starter or drive output is done with the power locked out and verified absent. Motor terminal boxes, wet well pulls, and impeller checks are not done live. Control circuit measurements are done live by a qualified person with the appropriate protective equipment, and a submersible pump in a wet well is a confined space problem before it is a pump problem.',
      },
      { t: 'h2', text: 'The first test' },
      {
        t: 'p',
        text: 'Put the HOA switch in HAND. If the pump starts, everything from the starter to the motor to the pump is working, and the problem is in the automatic call: the controller, its inputs, its permissives, or the wiring between the controller output and the starter. If the pump does not start in HAND either, the controller is not the problem, and the fault is in the control circuit, the starter or drive, the power circuit, or the machine. This one action halves the search, and it takes ten seconds.',
      },
      { t: 'h2', text: 'Starts in HAND, not in AUTO' },
      {
        t: 'steps',
        items: [
          { title: 'Check the call', text: 'Is the controller actually calling the pump? Look at the output bit and the physical output indicator. If the bit is off, the problem is upstream in the logic: the level or pressure has not reached the start point, a minimum off time is running, the pump is not the current lead, or a permissive is false.' },
          { title: 'Read the permissives and interlocks', text: 'Most programs show them on a pump faceplate or a status screen. A phase monitor healthy contact, a seal-leak input, a high motor temperature input, a low-level cutoff, a remote lockout from SCADA, and an alternator state that holds this pump out of rotation are the usual holds.' },
          { title: 'Check the failed-to-prove latch', text: 'If the pump was called earlier and did not prove, the program may have latched a failure and removed the pump from the rotation. The latch needs a reset after the cause is found.' },
          { title: 'Follow the output to the starter', text: 'If the output bit is on, measure at the output terminal, then at the interposing relay if there is one, then at the AUTO contact of the HOA, then at the coil. The voltage stops where the open is.' },
          { title: 'Check the drive command source', text: 'On a drive, the run command may come from a digital input or over a network. Confirm the drive sees the command: a status word or an input indicator on the display.' },
        ],
      },
      { t: 'h2', text: 'Starts in neither' },
      {
        t: 'steps',
        items: [
          { title: 'Look at the indicators', text: 'A fault light, a tripped overload, a drive fault code, a phase monitor indicator, or a breaker handle in the tripped position. Read before resetting. A fault code that is cleared without being recorded is a fault that will come back unexplained.' },
          { title: 'Confirm control power', text: 'Measure the control transformer secondary. No control power means a blown control fuse, a tripped control breaker, or a lost primary. A blown control fuse has a cause: a shorted coil, a wet device, or a wiring fault.' },
          { title: 'Walk the control circuit', text: 'Starting at the control power source, measure at each device in series toward the coil: the stop circuit, the overload auxiliary contact, the seal-leak and thermal relay contacts, the HOA HAND contact. Where the voltage disappears is the open device.' },
          { title: 'Check the coil and the contactor', text: 'Voltage at the coil with the circuit made and no pull-in: the coil is open or the contactor is mechanically jammed. Contactor pulls in and the motor does nothing: the problem is in the power circuit or the motor.' },
          { title: 'Check the power circuit', text: 'All three phases on the line side of the starter or drive, then the load side with the contactor closed. A missing phase on the line side is a fuse, a breaker pole, or the utility. A missing phase on the load side with the contactor closed is a burned contact.' },
          { title: 'Check the drive', text: 'A drive that will not run shows why on its display. Enable input open, safe torque off active, DC bus undervoltage, a stored fault, or a parameter set that expects the run command from somewhere else are all common. Reset a fault only after recording it.' },
          { title: 'Check the motor and pump', text: 'With power locked out and verified: insulation resistance of the motor and cable, continuity of each phase, and whether the shaft turns freely. A submersible is pulled to check the impeller. Rags around the impeller are the most common mechanical cause at a lift station.' },
        ],
      },
      { t: 'h2', text: 'What the motor sound tells you' },
      {
        t: 'table',
        head: ['Observation', 'Likely cause'],
        rows: [
          ['Silent, contactor does not pull in', 'Control circuit open or coil failed'],
          ['Contactor pulls in, motor silent', 'Power circuit open on the load side, or motor cable open'],
          ['Loud hum, no rotation, trips in seconds', 'Single phasing from a blown fuse or burned contact, or a seized pump'],
          ['Starts and immediately trips the overload', 'Locked rotor from rags or a bearing, or a wrong overload setting'],
          ['Drive runs, motor does not turn', 'Motor cable open, drive output phase lost, or the drive at zero speed reference'],
          ['Starts, runs, stops after a set time', 'Failed-to-prove logic timing out on a missing run confirmation; check the auxiliary contact'],
        ],
      },
      { t: 'h2', text: 'Common mistakes' },
      {
        t: 'ul',
        items: [
          'Resetting the overload or the drive fault and walking away. The overload tripped because the motor drew too much current; find out why.',
          'Replacing the contactor when the coil circuit is open. Measure at the coil first.',
          'Not checking the HAND position, and spending an hour in the program on a blown control fuse.',
          'Assuming the phase monitor is faulty because all three phases read on a meter. Phase monitors also trip on reversal, imbalance, and undervoltage, and a meter does not show sequence.',
          'Pulling a submersible pump before checking the panel. It is the most expensive step and often unnecessary.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The pump starts in HAND and the controller output is on, but it will not run in AUTO. What is left?',
        a: 'The path between the controller output and the starter in the AUTO position: the output module channel, an interposing relay, the AUTO contact of the HOA, and the wiring. Measure at each. An output channel can be on in the program and dead on the terminal.',
      },
      {
        q: 'The overload trips every time I reset it. Should I raise the setting?',
        a: 'No. The overload is set from the motor nameplate full-load current, and a motor that trips a correctly set overload is drawing more than it should: locked rotor, rags, a failing bearing, single phasing, or a wrong voltage. Raising the setting turns a tripped overload into a burned motor.',
      },
      {
        q: 'How do I know whether the drive is receiving the run command?',
        a: 'The drive status display or the keypad shows the state of the digital inputs and, on a networked drive, the command word. If the drive shows ready and no run command, the problem is the source of the command. If it shows the run command and does not run, look at the enable, safe torque off, and fault status.',
      },
      {
        q: 'What causes a pump to fail to start only occasionally?',
        a: 'A marginal control circuit: a corroded HOA contact, an overload auxiliary that is intermittent, a loose terminal, a coil at the low end of its voltage tolerance on a long control run, or a float contact that only sometimes closes. Catch it with a trend of the call and the run confirmation, and measure while it is failing.',
      },
    ],
    related: [
      '/controls/control-panels/pump-panels/hoa',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/controls/plc-systems/programming/interlocks',
      '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
      '/troubleshooting/vfd-troubleshooting/drive-will-not-start-in-auto',
    ],
  },
  {
    path: '/troubleshooting/pump-troubleshooting/pump-runs-but-no-flow',
    kind: 'troubleshooting',
    title: 'Pump Runs But No Flow',
    summary:
      'The motor turns and nothing moves. How to tell a clogged impeller from an air-bound pump, a closed valve, a stuck check, a broken coupling, or reverse rotation, using motor current and discharge pressure before pulling anything.',
    answer:
      'A pump that runs without moving water is either unable to move water or unable to move it into the discharge: a rag-bound or worn impeller, an air-bound or unprimed pump, reverse rotation, a broken shaft or coupling, a closed or failed discharge valve, a stuck check valve, or a blocked suction. Motor current and discharge pressure together separate the causes: high current and low pressure is a clog, low current and low pressure is air or a broken drive train, normal current and high pressure is a closed discharge.',
    keyPoints: [
      'Read the motor current first. It says more than any other single measurement.',
      'High current, no flow: something is in the impeller. Low current, no flow: the pump is moving air or nothing is connected to the motor.',
      'Normal current, high discharge pressure, no flow: the discharge is closed.',
      'Check rotation on any pump that was recently reconnected. Reverse rotation moves a little water badly.',
      'A check valve stuck shut looks exactly like a closed valve. A check valve stuck open sends the flow back.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 10,
    tags: ['Troubleshooting', 'Pumps', 'Lift Stations', 'Wastewater'],
    symptom:
      'The pump run status is on, the motor is turning, and the wet well or tank level does not respond. Flow reads zero or low, or the level rises with the pump running.',
    causes: [
      { cause: 'Impeller clogged with rags or debris', check: 'Motor current high, often near or above full-load, discharge pressure low, vibration. Pull and clear. At a lift station this is the first suspect.' },
      { cause: 'Impeller worn or wear ring clearance excessive', check: 'Current normal to low, flow gradually declining over months, drawdown rate slower than the record. Compare with the original drawdown test.' },
      { cause: 'Pump air-bound or lost prime', check: 'Current well below normal, discharge pressure near zero, pump quiet or gurgling. Vent the volute; check for a leaking suction line or low submergence.' },
      { cause: 'Reverse rotation', check: 'Current somewhat below normal, small flow, low pressure. Bump the motor and observe rotation, or check phase sequence after any reconnection.' },
      { cause: 'Broken coupling, shaft, or impeller key', check: 'Motor current at no-load level, no pressure, no vibration change. Motor turns, pump does not. Lock out and inspect.' },
      { cause: 'Discharge valve closed or failed', check: 'Current normal or slightly low, discharge pressure at shutoff head. Check valve position at the valve, not on the HMI.' },
      { cause: 'Check valve stuck closed', check: 'Same signature as a closed discharge valve. Isolate and inspect the check.' },
      { cause: 'Check valve stuck open on the other pump', check: 'Pump appears to run normally; the water recirculates through the idle pump back into the well. Feel the idle pump discharge for flow; watch the level.' },
      { cause: 'Suction blocked or screen fouled', check: 'Current low, cavitation noise, low discharge pressure, suction gauge reading very low.' },
      { cause: 'Force main or discharge line blocked', check: 'Pressure at shutoff head across all pumps on the line. A force main problem affects every station on it.' },
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'Pulling a pump is confined space and rigging work',
        text: 'A submersible pump comes out on its guide rails with a hoist, from the hatch, without entry. Rags and debris in a wet well contain everything that goes down a drain. Lock out the pump before touching the impeller; a pump that is called while a hand is in the volute will start.',
      },
      { t: 'h2', text: 'Read the instruments before pulling anything' },
      {
        t: 'p',
        text: 'Two measurements, motor current and discharge pressure, identify the cause of most no-flow conditions from the panel. Motor current is proportional to the work the pump is doing. A pump moving water draws its normal current; a pump grinding on rags draws more; a pump spinning in air or disconnected from its motor draws less. Discharge pressure says whether the pump is producing head. A pump producing shutoff head into a closed discharge reads high; a pump producing nothing reads low.',
      },
      {
        t: 'table',
        head: ['Motor current', 'Discharge pressure', 'Points toward'],
        rows: [
          ['High', 'Low', 'Clogged impeller; something jammed in the pump'],
          ['Low', 'Low or zero', 'Air-bound, lost prime, reverse rotation, or broken coupling'],
          ['Normal or slightly low', 'High, at shutoff head', 'Closed discharge valve, stuck check valve, or blocked force main'],
          ['Normal', 'Normal', 'Water is moving somewhere: recirculation through another check valve, a bypass open, or the level signal is wrong'],
          ['Slowly declining over months', 'Slowly declining', 'Wear: impeller, wear rings, or a slowly closing valve'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Check the level measurement before the pump',
        text: 'A level that does not respond to a pump that is actually pumping is the same symptom. Compare the transmitter reading with a tape or a visual through the hatch. A fouled transducer reading a fixed level has sent many crews to pull a healthy pump.',
      },
      { t: 'h2', text: 'Diagnostic procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Confirm the pump is actually running', text: 'Run confirmation from the starter auxiliary, and motor current above zero. An output that is on with no current is a pump that is not running, and a different page.' },
          { title: 'Compare current to the nameplate and to history', text: 'The nameplate full-load current is the ceiling. The trend from last month is the baseline. Note whether the current is high, normal, or low, and whether it is steady or fluctuating.' },
          { title: 'Read discharge pressure', text: 'At the gauge on the discharge, or the transmitter if there is one. Compare with the pump curve shutoff head and with normal operating pressure.' },
          { title: 'Check the level reading', text: 'Against a tape or a visual. If the level is actually falling, the pump is pumping and the measurement is the problem.' },
          { title: 'Check valve positions at the valve', text: 'Discharge isolation valve open, by the stem or the handwheel. Check valve arm or indicator, where fitted, showing open with the pump running.' },
          { title: 'Feel for recirculation', text: 'With one pump running, the idle pump discharge piping should be still and its check valve closed. Flow or vibration in the idle pump discharge means its check valve is passing and the running pump is pumping in a circle.' },
          { title: 'Check rotation', text: 'If the pump has been reconnected, replaced, or the panel has been worked on, bump the motor and observe rotation against the arrow, or check the phase sequence. Submersibles can be checked by the direction of kick at start.' },
          { title: 'Vent the pump', text: 'On a dry-pit or self-priming pump, open the vent and see whether air comes out. Check the suction line for leaks and the submergence of the intake.' },
          { title: 'Lock out and inspect', text: 'Pull the submersible or open the volute. Clear the impeller. Check the coupling, the shaft, and the impeller key. Measure wear ring clearance if the flow has been declining.' },
          { title: 'Check the force main', text: 'If more than one pump or station on the same line shows shutoff head, the line itself is blocked, air-locked at a high point, or a valve on it is closed. Check the air release valves.' },
        ],
      },
      { t: 'h2', text: 'After clearing a clog' },
      {
        t: 'p',
        text: 'A pump that clogged once will clog again. Record the event and the run time since the last clog. A station where one pump clogs repeatedly and the other does not usually has an impeller difference, a worn wear ring on one pump letting rags in, or a rotation problem. A station where both clog has a wipes problem in the collection system, and the answers are a different impeller design, a grinder or a screen, and public education about what goes down the toilet. Motor current trending with an alarm at a set percentage above normal catches the next clog before the well reaches high level.',
      },
      { t: 'h2', text: 'Common mistakes' },
      {
        t: 'ul',
        items: [
          'Pulling the pump before reading the current. A closed valve and a clogged impeller are told apart from the panel.',
          'Trusting the HMI valve position. The indicator shows what the limit switch says, not where the disc is.',
          'Ignoring reverse rotation after a motor replacement. Every three-phase reconnection is a rotation check.',
          'Resetting a high-current trip and restarting into the same rags until the motor is damaged.',
          'Not checking the other pump for a passing check valve when one pump seems weak.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The pump moves water in HAND but not in AUTO. Is that a pump problem?',
        a: 'No. If the pump moves water at all, the pump is fine. In AUTO it is running for a shorter time, at a different speed, or with a different valve state. Look at the drive speed reference in AUTO, the minimum run time, and any valve that is sequenced with the pump.',
      },
      {
        q: 'How do I know whether the impeller is worn out?',
        a: 'Compare the drawdown rate with the commissioning record at the same level band and the same number of pumps. A pump delivering 70 percent of its original flow at normal current and normal pressure has lost capacity to wear. Wear ring clearance measured at the next pull confirms it.',
      },
      {
        q: 'Can a variable speed pump run without flow?',
        a: 'Yes, if the speed is below the point where the pump develops enough head to open the check valve against the force main static head. A drive minimum speed set too low, or a speed reference stuck low, gives a running pump moving nothing. Raise the minimum speed above the point where flow begins, which is found from the curve or by test.',
      },
      {
        q: 'What causes a station to reach high level with both pumps showing running?',
        a: 'Both pumps clogged, which happens in a wipes event; a blocked or closed force main; or a level transmitter reading low with the pumps having shut off long ago. Motor current and discharge pressure on both pumps answer it.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/high-level',
      '/water-wastewater/wastewater-systems/lift-stations/duplex-lift-stations',
      '/troubleshooting/pump-troubleshooting/pump-will-not-start',
      '/controls/instrumentation/level/wet-well-level',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
    ],
  },
  {
    path: '/troubleshooting/pump-troubleshooting/pump-short-cycles',
    kind: 'troubleshooting',
    title: 'Pump Short Cycles',
    summary:
      'A pump that starts and stops far more often than it should: the control band, the level signal, a leaking check valve, a waterlogged pressure tank, a lag pump doing the lead job, and the starts-per-hour limit that makes short cycling a motor killer.',
    answer:
      'Short cycling is a pump starting and stopping more often than its motor rating allows, typically more than six to ten starts per hour. In a level-controlled station it comes from a control band that is too narrow, a level signal that is noisy or wrong, a check valve that lets the discharge drain back, or an inflow that happens to sit near half the pump capacity. In a pressure system it comes from a waterlogged tank, a narrow pressure band, or a leak. Trend the level or pressure with the run status and the cycle shows its cause.',
    keyPoints: [
      'Count starts per hour and compare with the motor rating. That is the definition of the problem.',
      'Trend level or pressure against run status. The shape of the cycle names the cause.',
      'A check valve that leaks back turns a normal band into a short cycle after every stop.',
      'A noisy level signal at the stop setpoint restarts the pump on noise. Deadband and delay cure it.',
      'Widening the band is the fix for a band problem and a cover-up for everything else.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Troubleshooting', 'Pumps', 'Lift Stations', 'Control'],
    symptom:
      'Run cycles are short, sometimes seconds, and starts per hour exceed the motor rating. Starters or drives run hot, the motor trips on overload, or the pump fails early.',
    causes: [
      { cause: 'Control band too narrow', check: 'Distance between start and stop setpoints against the cycle volume calculation. Symptom: regular, short, evenly spaced cycles at all inflows.' },
      { cause: 'Level signal noisy at the stop setpoint', check: 'Trend the raw level: the pump stops, level jitters back above start, pump restarts within seconds. Turbulence, a transducer near the inflow, or no deadband in the logic.' },
      { cause: 'Check valve leaking back', check: 'Level rises quickly after each stop with no inflow, or discharge pressure drops to zero at stop. Listen at the check valve; watch the idle pump discharge for reverse flow.' },
      { cause: 'Inflow near half the capacity of one pump', check: 'Cycles are short only at a particular inflow. This is the physics of the cycle volume, not a fault, unless the band is too narrow for the rating.' },
      { cause: 'Lag pump starting on every cycle', check: 'Lag-on setpoint too close to lead-on, or the lag called on a timer. Both pumps cycle together.' },
      { cause: 'Minimum run and off timers missing or too short', check: 'Program: no minimum run time, no minimum off time, or values in the low seconds.' },
      { cause: 'Waterlogged pressure tank or failed bladder', check: 'Pressure system: pump cycles every few seconds under a small demand. Tank precharge and drawdown test.' },
      { cause: 'Pressure band too narrow, or a leak on the system', check: 'Pressure system: pump starts with no demand. Check for leaks, relief valves passing, and the cut-in and cut-out spread.' },
      { cause: 'Level transmitter range or scaling wrong', check: 'The controller sees a smaller change than the well actually moves, so the band is smaller than intended. Compare the reading against a tape at two levels.' },
      { cause: 'Low-level cutoff or float stopping the pump early', check: 'The pump stops above the stop setpoint. Check which condition actually stopped it in the program.' },
    ],
    blocks: [
      { t: 'h2', text: 'Why it matters' },
      {
        t: 'p',
        text: 'Every start heats the motor windings with locked-rotor current, and every start hammers the check valve, the force main, and the starter contacts. Motors are rated for a number of starts per hour, commonly six to ten for submersible wastewater pumps and fewer for large motors, and a pump exceeding that rating fails early in ways that look unrelated: a burned winding, a broken shaft, a cracked check valve, a welded contactor. Short cycling is usually discovered from the starts counter or a run-hours report, not from the process, which keeps working right up until the motor does not.',
      },
      {
        t: 'formula',
        expr: 'Starts per hour ≈ 60 × Q / (4 × V)',
        where: [
          'Q = pump capacity, in gallons per minute',
          'V = volume between the stop and start setpoints, in gallons',
          'The worst case for a constant-speed pump, at an inflow equal to half the pump capacity',
        ],
      },
      {
        t: 'p',
        text: 'That worst case is the physics: at an inflow of half the pump capacity, the well fills as slowly as it empties and the cycle is shortest. A station that short cycles only near that inflow has a band problem. A station that short cycles at every inflow has something else.',
      },
      { t: 'h2', text: 'Read the trend' },
      {
        t: 'p',
        text: 'A trend of level or pressure with the pump run status overlaid, at a resolution of a second or better, identifies most causes without a site visit.',
      },
      {
        t: 'table',
        head: ['Trend shape', 'Cause'],
        rows: [
          ['Short, regular sawtooth at all inflows; level moves the full band each cycle', 'Band too narrow for the pump capacity'],
          ['Pump stops; level jumps back above the start setpoint within a second or two; restart', 'Noise at the stop setpoint, no deadband or delay'],
          ['Pump stops; level rises fast for a few seconds then slows to the inflow rate', 'Check valve draining the discharge back into the well'],
          ['Both pumps start within seconds of each other on every cycle', 'Lag setpoint too close to lead, or lag on a timer'],
          ['Level barely moves; pump cycles anyway', 'Level scaling wrong, or the pump stopping on a different condition'],
          ['Pressure rises to cut-out almost instantly on start, falls to cut-in almost instantly on stop', 'Waterlogged tank or no tank'],
        ],
      },
      { t: 'h2', text: 'Diagnostic procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Count the starts', text: 'From the controller counter, the drive, or the run status trend. Compare with the motor manufacturer rating. Note whether the count is high all day or only at certain hours.' },
          { title: 'Trend at high resolution', text: 'Level or pressure and run status, one-second samples, over several cycles. Match the shape to the table above.' },
          { title: 'Check the setpoints', text: 'Start and stop in the controller against the design record. Compute the cycle volume and the worst-case starts per hour. If the band gives more starts than the rating at half capacity, the band is the cause, whatever else is true.' },
          { title: 'Check the level signal', text: 'Filter and deadband on the level input. The raw value against the filtered value at the stop point. Compare the reading with a tape at two levels to catch a scaling error.' },
          { title: 'Check the timers', text: 'Minimum run time and minimum off time in the program. Absent or under 30 seconds is a finding.' },
          { title: 'Check the check valve', text: 'With the pump just stopped, watch the discharge pressure and the level. Listen at the valve. A passing check valve drains the discharge column back into the well and refills the band from the top.' },
          { title: 'Check the lag logic', text: 'Lag-on setpoint relative to lead-on; whether the lag is called on level or on a timer; whether the alternation swaps roles mid-cycle.' },
          { title: 'For a pressure system, test the tank', text: 'Isolate the tank, drain it, and check the precharge against the cut-in pressure. A tank at zero precharge or with a ruptured bladder gives no drawdown and the pump cycles on every faucet.' },
        ],
      },
      { t: 'h2', text: 'Fixes' },
      {
        t: 'ol',
        items: [
          'Fix the actual cause first: replace or repair a passing check valve, correct the level scaling, add deadband and a short delay at the stop setpoint, recharge or replace the pressure tank.',
          'Add minimum run and minimum off timers if they are missing. A minute is a reasonable minimum off time at most stations.',
          'Widen the band where the calculation says it is too narrow, within the septicity and submergence limits of the well.',
          'Move the lag-on setpoint up, and call the lag on run time or rate of rise rather than a fixed timer.',
          'On a variable speed station, raise the minimum speed above the no-flow point and consider level PID control so the pump runs continuously at low inflow.',
          'Alarm on starts per hour above the rating so the next occurrence is caught.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Widening the band hides a check valve',
        text: 'A passing check valve refills the band every cycle. Widening the band reduces the starts and leaves a check valve draining the force main into the well on every stop, which also pumps the same water twice. Look at the trend after every stop before touching a setpoint.',
      },
    ],
    faqs: [
      {
        q: 'How many starts per hour is too many?',
        a: 'The motor manufacturer sets it, and for submersible wastewater pumps it is commonly six to ten. Large motors and motors on across-the-line starters allow fewer. A drive with a soft start allows more, because each start heats the motor less. The number is on the motor data sheet, and if it is not, ask.',
      },
      {
        q: 'Why does the station only short cycle at night?',
        a: 'At night the inflow is lowest, so the well takes longest to refill, and the run is the same length as always. If the cycle looks short it is because the run is short: the band is narrow. Where the inflow at some hour happens to be near half the pump capacity, that is the worst-case cycle from the formula.',
      },
      {
        q: 'Should I add a delay to the stop, or to the start?',
        a: 'A short off-delay at the stop setpoint prevents restarts on noise. A minimum off time after a stop prevents the next start regardless of level and is the direct protection for the motor. Use both; keep the minimum off time short enough that a real rise in level is not held off dangerously.',
      },
      {
        q: 'The pump short cycles only with the VFD in AUTO. Why?',
        a: 'The drive is probably running at a speed too low to move water against the static head, so the level rises with the pump running and the logic stops and starts it around the stop setpoint. Raise the minimum speed, or check that the speed reference in AUTO is what the program intends.',
      },
    ],
    related: [
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-lead-lag',
      '/water-wastewater/wastewater-systems/lift-stations/wet-well-control',
      '/controls/plc-systems/analog-control/deadband',
      '/controls/plc-systems/analog-control/filtering',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
      '/water-wastewater/wastewater-systems/lift-stations/lift-station-alternation',
    ],
  },
  {
    path: '/troubleshooting/vfd-troubleshooting/drive-will-not-start-in-auto',
    kind: 'troubleshooting',
    title: 'Drive Will Not Start in AUTO',
    summary:
      'The drive runs from the keypad or in HAND but not from the controller. The command source, the enable and safe torque off inputs, the speed reference, and the network control word, checked in the order that finds the problem fastest.',
    answer:
      'A drive that runs locally but not in AUTO is not receiving a valid start command, a valid speed reference, or both, from the automatic source. Check the drive command source parameter, confirm the drive sees the run input or the network control word, confirm the enable and safe torque off inputs are made in AUTO, confirm the speed reference is above the minimum, and confirm nothing in the drive is waiting for a reset. The drive display shows every one of these.',
    keyPoints: [
      'The drive display shows the command source, the input states, the reference, and the fault. Read it before opening the program.',
      'A drive can be ready, commanded, and enabled, and still not run on a zero speed reference.',
      'Safe torque off and the enable input are separate from the run command and are often wired through a relay the controller does not know about.',
      'On a networked drive, the control word must be exactly what the drive expects, including the switch-on sequence.',
      'If the drive ran in AUTO last week, look for what changed: a parameter reset, a swapped drive, a program download.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Troubleshooting', 'VFD', 'Pumps', 'Control'],
    symptom:
      'With the HOA in AUTO and the controller calling the pump, the drive shows ready and does not run, or runs at zero speed. In HAND or from the keypad it runs normally.',
    causes: [
      { cause: 'Command source set to keypad or terminal only', check: 'Drive parameter for the start command source in the AUTO or remote mode. A replaced or reset drive defaults to keypad.' },
      { cause: 'Run input not reaching the drive', check: 'Digital input status on the drive display while the controller calls. Follow the controller output through the interposing relay and the HOA AUTO contact to the drive terminal.' },
      { cause: 'Enable or safe torque off input open', check: 'Both inputs on the display. Commonly wired through the HOA, a seal-leak relay, or a safety relay, and made in HAND by a different path than in AUTO.' },
      { cause: 'Speed reference at zero or below minimum', check: 'Reference value on the display. Analog reference wiring, scaling in the controller, or a network reference of zero. Some drives will not start below a minimum reference.' },
      { cause: 'Reference source set to the wrong input', check: 'Drive parameter for the reference source in AUTO. An analog reference wired to input 2 while the drive reads input 1 gives zero.' },
      { cause: 'Network control word wrong or connection not established', check: 'Drive network status; the control word being sent; the drive state machine. A drive that requires a specific enable sequence in the control word stays in ready.' },
      { cause: 'Fault not reset, or a warning that blocks start', check: 'Fault and warning list on the display. Some conditions show as warnings and still block a start.' },
      { cause: 'Wrong drive parameter set after replacement', check: 'Compare the parameter list with the backup. A replaced drive that ran on defaults for a day is the classic cause.' },
      { cause: 'Run permissive in the drive not met', check: 'Some drives have a separate run permissive or external interlock input. Check every input the drive lists as required.' },
      { cause: 'Controller not actually calling', check: 'Output bit, output terminal, and the permissives in the program. Covered under the pump-will-not-start page; confirm before working on the drive.' },
    ],
    blocks: [
      {
        t: 'callout',
        kind: 'safety',
        title: 'A drive that is ready can start',
        text: 'A drive in AUTO with a valid command source will start the moment the missing input is made, including when that input is made by a test. Keep hands and tools clear of the machine, tell operations, and be sure the process can accept the pump starting before closing anything.',
      },
      { t: 'h2', text: 'Read the display first' },
      {
        t: 'p',
        text: 'Every drive shows on its keypad, or through its software, the state of each digital input, the active command source, the active reference source and value, the enable and safe torque off status, and any fault or warning. That is the diagnostic list. Five minutes with the display usually finds the cause; an hour in the controller program usually does not, because the program is doing what it was told and the drive is not receiving it.',
      },
      {
        t: 'table',
        head: ['Display shows', 'Meaning', 'Look at'],
        rows: [
          ['Ready, no run command', 'The drive is not seeing a start from the active source', 'Command source parameter; run input state; controller output path'],
          ['Run command present, not running, enable or STO off', 'A hardwired input the run command does not control is open', 'Enable and safe torque off wiring through the HOA and safety relays'],
          ['Running, 0 Hz', 'Commanded and enabled, with a zero reference', 'Reference source parameter; analog reference wiring; controller scaling; network reference'],
          ['Not ready, or a warning', 'A condition the drive treats as a block', 'Warning list; DC bus voltage; motor overtemperature input; external fault input'],
          ['Fault', 'A latched fault', 'Fault code and history; reset only after reading'],
          ['Network: not connected or timeout', 'The network command is not arriving', 'Network status LEDs; controller connection status; control word'],
        ],
      },
      { t: 'h2', text: 'Diagnostic procedure' },
      {
        t: 'steps',
        items: [
          { title: 'Confirm the controller is calling', text: 'Output bit on, output terminal live, and the permissives true. If the controller is not calling, this is not a drive problem.' },
          { title: 'Check the command source', text: 'The drive parameter that selects where the start command comes from in AUTO: a terminal input, a network, or the keypad. A drive replaced or reset to defaults usually reverts to keypad. Set it to the intended source.' },
          { title: 'Check the run input', text: 'On the display, watch the input the run command is wired to while the controller calls. If it does not change, follow the wire: output module, interposing relay, HOA AUTO contact, drive terminal. If the input changes and the drive does not run, move on.' },
          { title: 'Check enable and safe torque off', text: 'Both must be made. They are often wired through the HOA switch in a way that makes them in HAND and expects the controller to make them in AUTO through a relay that was never wired, or through a seal-leak or safety relay that has dropped out.' },
          { title: 'Check the reference', text: 'The reference value on the display. If it is zero: the reference source parameter, the analog input the reference is wired to, the controller output that drives it, and the scaling. If the drive has a minimum frequency and the reference is below it, some drives will not start.' },
          { title: 'Check the network', text: 'On a networked drive, confirm the connection is established, the control word matches the drive state machine requirements, and the reference is in the expected units. A control word that never sends the switch-on step leaves the drive in ready forever.' },
          { title: 'Check faults and warnings', text: 'Read the list. Reset after recording. If the fault returns immediately, the drive is telling you something the run command cannot override.' },
          { title: 'Compare parameters to the backup', text: 'If the drive was replaced, serviced, or reset, load the saved parameter set or compare line by line. Command source, reference source, input functions, and minimum frequency are the parameters that matter here.' },
        ],
      },
      { t: 'h2', text: 'The HAND path and the AUTO path are different circuits' },
      {
        t: 'p',
        text: 'The reason a drive runs in HAND and not in AUTO is almost always that HAND makes something that AUTO does not. In HAND the HOA switch may close the run input, the enable input, and select a keypad or preset reference all at once. In AUTO the run input comes from the controller, the enable is expected from somewhere else, and the reference is an analog or network value from the controller. A panel where the enable was wired through the HAND contact only, or where the AUTO reference was never connected, works perfectly in HAND and never in AUTO. Compare the two paths on the drawing.',
      },
      { t: 'h2', text: 'Common mistakes' },
      {
        t: 'ul',
        items: [
          'Downloading a program change before checking the drive display. The program was not the thing that changed.',
          'Resetting the drive to factory defaults to clear a problem, which sets the command source to keypad.',
          'Assuming the enable is part of the run command. It is a separate input on most drives and a separate safety circuit on many.',
          'Reading the reference in the controller and not on the drive. The controller can send 60 Hz to an analog output that goes to the wrong terminal.',
          'Replacing the drive when a parameter was wrong. The new drive arrives with defaults and the same symptom.',
        ],
      },
    ],
    faqs: [
      {
        q: 'The drive shows the run command and the reference, and still will not run. What is left?',
        a: 'Enable, safe torque off, an external fault or interlock input, a warning that blocks start such as motor overtemperature, or a drive that requires a rising edge on the run command and is seeing a level. Check every input the drive lists as required, and check whether the drive expects two-wire or three-wire control.',
      },
      {
        q: 'How do I tell whether the drive uses two-wire or three-wire control?',
        a: 'Two-wire control runs while the run input is held closed. Three-wire control starts on a momentary start input and stops on a normally closed stop input. A controller output wired as a maintained contact to a drive configured for three-wire control gives one start and then nothing, or nothing at all if the stop input is open.',
      },
      {
        q: 'The drive ran in AUTO yesterday. What changed?',
        a: 'Something. A parameter reset or a swapped drive, a program download that changed an output or a scaling, a relay that failed, a seal-leak or safety relay that dropped out, a network connection lost. The drive display and the change log narrow it. The most common answer is a drive that was replaced and configured for HAND operation only, because that was what was tested.',
      },
      {
        q: 'Should the drive enable be controlled by the PLC?',
        a: 'It is usually hardwired through the HOA and the safety devices, so that the drive is enabled whenever the pump is in HAND or AUTO and disabled in OFF and on a safety trip, independent of the controller. Wire it that way, document it, and do not route it through a controller output unless the design calls for it.',
      },
    ],
    related: [
      '/troubleshooting/pump-troubleshooting/pump-will-not-start',
      '/controls/control-panels/pump-panels/hoa',
      '/troubleshooting/plc-troubleshooting/outputs-not-energizing',
      '/controls/plc-systems/communications/ethernet-ip',
      '/water-wastewater/water-systems/water-pumping/pressure-control',
    ],
  },
];
