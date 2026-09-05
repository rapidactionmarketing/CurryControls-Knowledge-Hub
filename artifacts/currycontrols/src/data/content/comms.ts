import type { Entry } from '../content-types';

export const COMMS_ENTRIES: Entry[] = [
  {
    path: '/controls/plc-systems/communications/modbus-rtu',
    kind: 'reference',
    title: 'Modbus RTU',
    summary:
      'Serial Modbus over RS-485: function codes, register addressing, the off-by-one that catches everyone, and the physical layer details that decide whether a bus is stable.',
    answer:
      'Modbus RTU is a serial master/slave protocol, normally carried on RS-485, in which a single master polls addressed slave devices for register data. Messages are binary with a CRC-16 check and are delimited by a silent interval of at least 3.5 character times. Its simplicity is why it is everywhere, and its lack of built-in diagnostics is why intermittent problems take patience to find.',
    keyPoints: [
      'One master, up to 247 addressed slaves, one transaction at a time.',
      'Register documentation ambiguity is the most common integration problem: 40001 versus offset 0.',
      'Termination at both physical ends, and bias somewhere, are required for a stable bus.',
      'Every device on the segment must match baud rate, data bits, parity, and stop bits.',
      'There is no built-in security. Anything reachable can be read and written.',
    ],
    published: '2026-03-30',
    updated: '2026-07-21',
    readingTime: 10,
    tags: ['Communications', 'Modbus', 'PLC'],
    blocks: [
      { t: 'h2', text: 'How a transaction works' },
      {
        t: 'p',
        text: 'The master sends a request containing a slave address, a function code, a starting register, a quantity, and a CRC. The addressed slave, and only that slave, responds with the same address, the same function code, the data, and its own CRC. Every other device on the bus stays silent. Nothing happens without the master initiating it.',
      },
      {
        t: 'p',
        text: 'That single-conversation model is why a device that answers slowly slows the whole bus, and why one device that transmits when it should not can make an entire segment appear broken.',
      },
      { t: 'h2', text: 'Function codes you will actually use' },
      {
        t: 'table',
        head: ['Code', 'Name', 'Operates on'],
        rows: [
          ['01', 'Read Coils', 'Discrete outputs, read/write bits'],
          ['02', 'Read Discrete Inputs', 'Discrete inputs, read-only bits'],
          ['03', 'Read Holding Registers', '16-bit read/write registers — by far the most used'],
          ['04', 'Read Input Registers', '16-bit read-only registers'],
          ['05', 'Write Single Coil', 'One output bit'],
          ['06', 'Write Single Register', 'One 16-bit register'],
          ['15', 'Write Multiple Coils', 'A block of output bits'],
          ['16', 'Write Multiple Registers', 'A block of 16-bit registers'],
        ],
      },
      { t: 'h2', text: 'The addressing problem' },
      {
        t: 'p',
        text: 'This causes more wasted hours than every other Modbus issue combined. Two conventions describe the same register and documentation rarely says which is in use.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Traditional data model addressing', def: 'Holding registers are numbered from 40001. A device manual saying "flow rate is at 40010" is using this convention.' },
          { term: 'Protocol addressing', def: 'The number actually placed on the wire, starting at 0. Register 40010 in the traditional model is protocol address 9.' },
        ],
      },
      {
        t: 'code',
        lang: 'text',
        caption: 'The conversion, and the two errors it produces',
        code: `Traditional 40001  ->  protocol address 0
Traditional 40010  ->  protocol address 9
Traditional 4xxxx  ->  protocol address (xxxx - 1)

Off by exactly one register  -> you configured 40010 as address 10
Reading 40001 as address 40001 -> illegal data address exception

If a value is close but consistently belongs to the neighboring
point in the device map, you are off by one.`,
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Prove the map before you write logic',
        text: 'Use a Modbus test utility to read the device directly before configuring the PLC. Ten minutes with a known-good tool tells you the addressing convention, the byte order, and the data types with certainty, and it separates a device problem from a controller configuration problem.',
      },
      { t: 'h2', text: 'Data types and byte order' },
      {
        t: 'p',
        text: 'Modbus defines 16-bit registers and nothing larger. A 32-bit float or a 32-bit integer is carried in two consecutive registers, and the standard does not specify the order in which those registers appear. Vendors differ, and some devices are configurable.',
      },
      {
        t: 'table',
        head: ['Arrangement', 'Also called', 'Symptom if wrong'],
        rows: [
          ['Big-endian, high word first', 'ABCD', 'Correct on many devices'],
          ['Little-endian, low word first', 'CDAB', 'Value is wildly wrong or reads as a tiny number'],
          ['Byte-swapped', 'BADC', 'Value looks like noise'],
          ['Full reverse', 'DCBA', 'Value looks like noise'],
        ],
      },
      {
        t: 'p',
        text: 'A practical test: read a value you know, such as a flow rate the device displays locally. If it reads as a huge number, a near-zero number, or nonsense, try swapping the word order first. The correct combination becomes obvious immediately.',
      },
      { t: 'h2', text: 'The physical layer' },
      {
        t: 'p',
        text: 'RS-485 is a differential pair, and most intermittent Modbus problems are physical rather than protocol.',
      },
      {
        t: 'ul',
        items: [
          'Daisy chain the devices. RS-485 is a bus, not a star. Long stubs off a trunk cause reflections.',
          'Terminate both physical ends, typically 120 ohms. Terminate only the ends, not every device.',
          'Bias the idle line somewhere on the segment, usually at the master. Without bias, an idle line floats and receivers see noise as data.',
          'Use twisted shielded pair rated for RS-485, and ground the shield at one end.',
          'Connect the signal common. Many installations skip this and work until the ground potential difference grows.',
          'Verify polarity. A and B reversed at one device produces silence from that device only.',
          'Keep it away from drive output conductors. This is the leading cause of a bus that works until a pump starts.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'One misconfigured device breaks the whole segment',
        text: 'Two devices sharing an address will both answer and corrupt each other. A device at the wrong baud rate will transmit garbage that collides with valid traffic. If a whole bus is unreliable, disconnect everything and add devices back one at a time. It is faster than it sounds and it always finds the culprit.',
      },
      { t: 'h2', text: 'Exception responses' },
      {
        t: 'table',
        head: ['Code', 'Meaning', 'Usually means'],
        rows: [
          ['01', 'Illegal function', 'The device does not support that function code'],
          ['02', 'Illegal data address', 'Wrong register, or a block that runs past the end of the map'],
          ['03', 'Illegal data value', 'A value outside what the register accepts'],
          ['04', 'Slave device failure', 'An internal error in the device'],
          ['06', 'Slave device busy', 'Device is processing; retry'],
        ],
      },
      {
        t: 'p',
        text: 'An exception is good news compared with silence. It proves the device heard you, the wiring is correct, the address is right, and the framing is valid. Only the content of the request is wrong, which is a much smaller problem than a bus that does not answer at all.',
      },
      { t: 'h2', text: 'Timing and polling' },
      {
        t: 'p',
        text: 'Frames are delimited by silence: a gap of at least 3.5 character times marks the end of a message, and a gap of more than 1.5 character times inside a message invalidates it. This is why a gateway or a USB serial converter that introduces latency can break RTU framing even though the bytes all arrive.',
      },
      {
        t: 'ul',
        items: [
          'Poll no faster than the device can answer. Many field devices need tens of milliseconds per response.',
          'Read contiguous blocks rather than individual registers. One read of twenty registers is far cheaper than twenty reads.',
          'Set the response timeout longer than the slowest device, then set retries deliberately rather than leaving a default.',
          'Count and trend communication errors per device. A device at a 2% error rate today is a failure next month.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'There is no security in Modbus',
        text: 'The protocol has no authentication, no authorization, and no encryption. Anything that can reach the bus can read every register and write to any writable one. Treat Modbus segments as trusted-network-only, and do not expose a Modbus TCP device to a network you do not control.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between Modbus RTU and Modbus ASCII?',
        a: 'RTU sends binary data with a CRC-16 and relies on silent intervals for framing. ASCII sends hexadecimal characters with a start and end delimiter and an LRC check. ASCII is more tolerant of latency but roughly half as efficient. RTU is far more common.',
      },
      {
        q: 'How many devices can be on one RS-485 segment?',
        a: 'The protocol addresses up to 247 slaves. The electrical limit is typically 32 standard unit loads on a segment, though many modern transceivers present a fraction of a unit load and allow more. Practically, keep segments small; a bus with forty devices is slow and hard to diagnose.',
      },
      {
        q: 'Why does my device respond intermittently?',
        a: 'In order of likelihood: missing or incorrect termination, missing bias, no signal common, cable routed near drive output conductors, a timeout shorter than the device response time, and polling faster than the device can answer.',
      },
      {
        q: 'Can I have two masters on a Modbus RTU bus?',
        a: 'Not on the same segment. Modbus RTU is single-master by design. Two masters will transmit over each other. If two systems need the data, use a gateway or a data concentrator that presents itself as a slave to both.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/modbus-tcp',
      '/controls/plc-systems/communications/serial-communications',
      '/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline',
      '/how-to/plc-how-to/configure-modbus',
    ],
  },

  {
    path: '/controls/plc-systems/communications/modbus-tcp',
    kind: 'reference',
    title: 'Modbus TCP',
    summary:
      'Modbus over Ethernet: what the MBAP header changes, why the CRC disappears, how the unit identifier works, and what does not get easier just because it is on Ethernet.',
    answer:
      'Modbus TCP carries Modbus requests over an Ethernet TCP connection on port 502. The application data is identical to Modbus RTU, but the serial framing and CRC are replaced by a seven-byte MBAP header and TCP handles delivery and integrity. Multiple masters can talk to one device simultaneously over separate connections, which is the main practical advantage over serial.',
    keyPoints: [
      'Same function codes and register model as RTU; only the transport changes.',
      'TCP port 502. The CRC is gone because TCP provides integrity.',
      'The unit identifier matters when a gateway fronts serial devices; otherwise it is often 255 or 1.',
      'Multiple clients can poll one server concurrently, unlike single-master serial.',
      'Register addressing ambiguity and word order are exactly as troublesome as on serial.',
    ],
    published: '2026-04-08',
    updated: '2026-07-28',
    readingTime: 8,
    tags: ['Communications', 'Modbus', 'Ethernet', 'PLC'],
    blocks: [
      { t: 'h2', text: 'What changes and what does not' },
      {
        t: 'p',
        text: 'The part of the message that carries meaning, the function code, the register address, the quantity, and the data, is unchanged. What changes is the envelope around it.',
      },
      {
        t: 'table',
        head: ['Element', 'Modbus RTU', 'Modbus TCP'],
        rows: [
          ['Transport', 'RS-485 or RS-232 serial', 'Ethernet, TCP port 502'],
          ['Framing', 'Silent interval of 3.5 character times', 'MBAP header with a length field'],
          ['Error checking', 'CRC-16 in the message', 'Handled by TCP'],
          ['Addressing', 'Slave address 1-247', 'IP address, plus a unit identifier'],
          ['Concurrency', 'One master, one transaction at a time', 'Multiple clients, multiple outstanding transactions'],
          ['Typical speed', '9600 to 115200 baud', '100 Mbps or better'],
        ],
      },
      { t: 'h2', text: 'The MBAP header' },
      {
        t: 'p',
        text: 'Seven bytes precede every Modbus TCP request and response.',
      },
      {
        t: 'dl',
        items: [
          { term: 'Transaction identifier (2 bytes)', def: 'Echoed by the server so a client can match a response to its request. This is what allows several outstanding transactions at once.' },
          { term: 'Protocol identifier (2 bytes)', def: 'Zero for Modbus.' },
          { term: 'Length (2 bytes)', def: 'Byte count of what follows. This replaces the silent-interval framing of RTU.' },
          { term: 'Unit identifier (1 byte)', def: 'Identifies the target when a gateway sits in front of serial devices. For a native Ethernet device it is frequently 255 or 1, and some devices ignore it entirely.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The unit identifier is where gateway integrations fail',
        text: 'When a Modbus TCP to RTU gateway fronts several serial slaves, the unit identifier selects which one. Set it to the serial slave address, not to 1 or 255. A gateway that returns a timeout for every register while the serial devices are demonstrably healthy is almost always a unit identifier problem.',
      },
      { t: 'h2', text: 'What Ethernet actually buys you' },
      {
        t: 'ul',
        items: [
          'Speed. Reading several hundred registers is effectively instantaneous rather than a measurable delay.',
          'Concurrency. A PLC and a SCADA system can poll the same device at the same time without a gateway arbitrating.',
          'Distance and infrastructure. It uses the network you already have, including fiber between buildings.',
          'Better diagnostics. Switch port counters, packet captures, and connection state are all available, none of which exist on a serial bus.',
        ],
      },
      { t: 'h2', text: 'What it does not fix' },
      {
        t: 'ol',
        items: [
          'Register addressing ambiguity. The 40001 versus offset-0 problem is identical.',
          'Word and byte order for 32-bit values. Identical, and just as undocumented.',
          'Device slowness. A device with a slow internal scan is slow regardless of transport.',
          'Security. Modbus TCP has no authentication or encryption, and now it is reachable from anything routable to it, which is strictly worse.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Modbus TCP on a routable network is an exposure',
        text: 'Any host that can reach port 502 can read every register and write to any writable one, with no credentials. Keep Modbus TCP inside a segmented control network, restrict it with firewall rules to the specific clients that need it, and never expose it to a corporate network or the internet.',
      },
      { t: 'h2', text: 'Diagnosing it' },
      {
        t: 'steps',
        items: [
          { title: 'Prove IP connectivity', text: 'Ping the device. If it does not answer, this is a network problem, not a Modbus problem, and everything below is wasted effort until it is fixed.' },
          { title: 'Prove the port is open', text: 'Attempt a TCP connection to port 502. A refused connection means the service is not running or is on a different port. A timeout usually means a firewall or a routing problem.' },
          { title: 'Read with an independent tool', text: 'Use a Modbus client utility from a laptop. If it reads correctly and the PLC does not, the problem is in the controller configuration, not the device.' },
          { title: 'Check the unit identifier', text: 'Particularly with a gateway. Try the serial slave address, then 1, then 255.' },
          { title: 'Capture packets if it is still unclear', text: 'A capture on port 502 shows the exact request, the exact response, and any exception code. This turns speculation into fact faster than any other step.' },
          { title: 'Watch connection count', text: 'Some devices support only a small number of simultaneous TCP connections. A client that opens a new connection per poll and never closes cleanly will exhaust them, and the symptom is a device that works for hours and then refuses everything.' },
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Connection exhaustion looks like a device failure',
        text: 'A device that stops answering after a period of normal operation, and recovers after a power cycle, is often out of TCP connections. Check how many the device supports and whether every client is closing connections properly.',
      },
    ],
    faqs: [
      {
        q: 'What port does Modbus TCP use?',
        a: 'TCP port 502 by default. Some devices allow it to be changed, and some vendors additionally offer Modbus over a secure transport on a different port.',
      },
      {
        q: 'Do I need a CRC in Modbus TCP?',
        a: 'No. TCP provides error detection and retransmission, so the Modbus CRC is omitted. Sending a request with an RTU CRC appended to a TCP connection produces an error, which is a common mistake when adapting serial code.',
      },
      {
        q: 'What unit identifier should I use?',
        a: 'For a native Ethernet device, try 1 or 255; many ignore the field. For a gateway fronting serial devices, use the serial slave address of the target device. This is the correct answer far more often than people expect.',
      },
      {
        q: 'Can Modbus TCP and Modbus RTU coexist?',
        a: 'Yes, with a gateway. It presents a TCP server on the Ethernet side and acts as the single serial master on the RS-485 side, using the unit identifier to select the slave. This is extremely common in retrofits.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/modbus-rtu',
      '/controls/plc-systems/communications/gateways',
      '/cybersecurity/network-segmentation/zones-and-conduits',
      '/troubleshooting/communications-troubleshooting/device-times-out',
    ],
  },
  {
    path: '/controls/plc-systems/communications/ethernet-ip',
    kind: 'reference',
    title: 'EtherNet/IP',
    summary:
      'How EtherNet/IP moves control data: CIP over standard Ethernet, implicit I/O connections on a requested packet interval, explicit messaging, producer and consumer tags, and what the network has to provide.',
    answer:
      'EtherNet/IP carries the Common Industrial Protocol (CIP) over standard Ethernet and TCP/IP. It has two kinds of traffic: implicit I/O connections, where a controller and a device exchange data continuously on a fixed schedule called the requested packet interval, and explicit messages, where a request is sent and a reply comes back. The switches, the addressing, and the connection budget of the controller all have to be designed for it, because a missed packet interval is a lost connection and a lost connection is faulted I/O.',
    keyPoints: [
      'Implicit connections are scheduled, UDP-based, and time-critical; explicit messages are on-demand and TCP-based.',
      'The requested packet interval sets how often data is exchanged, and the connection times out after a few missed intervals.',
      'Every I/O connection consumes a connection from a finite budget in the controller and in the communication module.',
      'Multicast implicit traffic needs switches that manage it, or it floods every port.',
      'Produced and consumed tags exchange data between controllers with the same mechanism, and the same limits.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Communications', 'Ethernet', 'Networking', 'PLC'],
    blocks: [
      { t: 'h2', text: 'What it is' },
      {
        t: 'p',
        text: 'EtherNet/IP is an open protocol managed by ODVA, and the IP stands for Industrial Protocol, not Internet Protocol. It puts CIP, the same object model used by DeviceNet and ControlNet, on top of ordinary Ethernet, TCP, and UDP. Standard switches carry it, standard cable carries it, and a laptop with a packet capture tool can read it. That accessibility is its main advantage and, from a security point of view, its main problem.',
      },
      { t: 'h2', text: 'Two kinds of traffic' },
      {
        t: 'dl',
        items: [
          { term: 'Implicit, or I/O, messaging', def: 'A connection is opened between a controller and a device, a remote I/O adapter, a drive, a valve manifold, and both sides then send their data at a fixed interval without being asked. It runs over UDP, it is scheduled, and it is what the controller uses to read inputs and write outputs. The connection is a Class 1 connection in CIP terms.' },
          { term: 'Explicit messaging', def: 'A request and a response: read a parameter from a drive, write a setpoint to another controller, fetch a device identity. It runs over TCP, it is unscheduled, and it is used for configuration, diagnostics, and data that does not need to arrive every few milliseconds. A message instruction in the program is an explicit message.' },
        ],
      },
      { t: 'h2', text: 'The requested packet interval' },
      {
        t: 'p',
        text: 'Every implicit connection has a requested packet interval, the RPI, which is how often the two sides exchange data. Two milliseconds for a fast drive, twenty for a remote rack of discrete I/O, a hundred or more for something slow. The connection has a timeout of a small multiple of the RPI, and if that many packets are missed the connection drops: the device goes to its fault state and the controller sees a connection fault. A network that delays packets by tens of milliseconds, from a congested switch or a wireless hop, drops connections that the same network would happily carry as explicit messages.',
      },
      {
        t: 'p',
        text: 'The RPI is also a load. A rack at 10 ms produces a hundred packets a second in each direction, and a controller with forty such connections is handling thousands of packets a second in its communication module. Setting every RPI to the fastest value available is how a network that should have been quiet becomes one that drops connections.',
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'Set the RPI from the process, not from the default',
        text: 'A wet well level does not need to be read every 10 ms. A drive speed reference might. Give each connection the slowest RPI the process tolerates, and the controller, the switches, and the troubleshooter will all have an easier life.',
      },
      { t: 'h2', text: 'Connections are a budget' },
      {
        t: 'p',
        text: 'A controller supports a stated number of CIP connections, and so does each communication module, and each implicit connection uses one or more of them. Remote racks, drives, HMIs, message instructions, produced and consumed tags, and every SCADA server polling the controller all draw from the same pool. A system that works with three devices and fails when the fourth is added has usually run out of connections, and the symptom is a device that will not connect rather than an error that says why. The controller diagnostics show the count in use.',
      },
      { t: 'h2', text: 'Unicast, multicast, and the switch' },
      {
        t: 'p',
        text: 'Implicit connections can be unicast, from the producer to one consumer, or multicast, where the producer sends once and every interested consumer receives it. Multicast is efficient when several controllers consume the same data and troublesome otherwise, because a switch that does not manage multicast forwards it to every port, and every device on the network then receives every I/O packet. Managed switches with IGMP snooping and a querier confine the multicast to the ports that asked for it. Newer devices default to unicast, which sidesteps the problem for most installations.',
      },
      {
        t: 'table',
        caption: 'What the network needs to provide',
        head: ['Requirement', 'Why', 'What goes wrong without it'],
        rows: [
          ['Managed switches', 'IGMP snooping, port diagnostics, VLANs', 'Multicast floods and no visibility'],
          ['Full duplex, fixed or correctly negotiated', 'Collisions delay scheduled packets', 'Duplex mismatch drops connections intermittently'],
          ['Segmentation from IT traffic', 'A backup or a broadcast storm delays I/O', 'Connections drop during office network events'],
          ['Static addressing or reserved DHCP', 'A device that changes address is a lost device', 'I/O faults after a power cycle'],
          ['Cable and connectors rated for the environment', 'Vibration and moisture', 'Intermittent link, intermittent I/O'],
        ],
      },
      { t: 'h2', text: 'Produced and consumed tags' },
      {
        t: 'p',
        text: 'Controllers exchange data with each other by the same implicit mechanism: one controller produces a tag, another consumes it, on an RPI. It is the cleanest way to share a few dozen values between controllers and it carries the same connection and timeout behavior as I/O. The consumed data arrives with a connection status the program should check, because a consumed tag from a controller that has gone off line holds its last value and looks perfectly healthy.',
      },
      { t: 'h2', text: 'Security' },
      {
        t: 'p',
        text: 'Base EtherNet/IP has no authentication and no encryption. Anything that can reach the controller on the network can read tags, write tags, and change the mode. CIP Security adds certificates and encryption on devices that support it, and the practical protections for everything else are network segmentation, firewalls that permit only the specific conversations, and the keyswitch. The cybersecurity section covers the architecture.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between implicit and explicit messaging?',
        a: 'Implicit messaging is a scheduled, continuous exchange of I/O data on a connection with a fixed interval; it is how a controller reads and writes a remote device. Explicit messaging is a request and a reply, used for parameters, diagnostics, and occasional data.',
      },
      {
        q: 'What RPI should I use?',
        a: 'The slowest the process tolerates. A few milliseconds for motion and fast drives, ten to twenty for discrete I/O in a machine, fifty to a hundred or more for a slow process. Faster RPIs load the controller and the network for no benefit.',
      },
      {
        q: 'Why does a device connect on the bench and not in the plant?',
        a: 'Usually the network: a duplex mismatch, unmanaged multicast, an address conflict, or a switch that delays scheduled packets long enough to time out the connection. Occasionally the controller is out of connections.',
      },
      {
        q: 'Do I need managed switches?',
        a: 'For any network with implicit I/O on it, yes. Managed switches provide IGMP snooping for multicast, port diagnostics for troubleshooting, and VLANs for segmentation. Unmanaged switches work until the first multicast device or the first problem.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/modbus-tcp',
      '/controls/plc-systems/communications/remote-i-o',
      '/troubleshooting/network-troubleshooting/ethernet-device-drops-offline',
      '/cybersecurity/ot-security/purdue-model',
      '/controls/plc-systems/plc-fundamentals/plc-architecture',
    ],
  },
  {
    path: '/controls/plc-systems/communications/dnp3',
    kind: 'reference',
    title: 'DNP3',
    summary:
      'The protocol built for utility telemetry: master and outstation, static and event data classes, unsolicited reporting, time-stamped events, and why it suits slow links that Modbus does not.',
    answer:
      'DNP3, standardized as IEEE 1815, is the protocol utilities use between a SCADA master and remote outstations. Unlike Modbus, it lets the outstation report changes as time-stamped events, on its own initiative, so a master over a slow radio or cellular link learns what happened and when without polling every point every cycle. It defines the data types, the event classes, the polling model, and, in its secure authentication extension, how the two ends prove who they are.',
    keyPoints: [
      'The master polls; the outstation answers, and can also send unsolicited events when something changes.',
      'Class 0 is a snapshot of everything; classes 1, 2, and 3 are events queued by priority since the last poll.',
      'Events carry the outstation timestamp, so a sequence of events survives a slow link and arrives in order.',
      'DNP3 runs over serial links and over TCP, and the same point map works on both.',
      'Secure Authentication adds cryptographic proof of identity; without it the protocol trusts whoever is on the wire.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Communications', 'Telemetry', 'SCADA', 'Water'],
    blocks: [
      { t: 'h2', text: 'Why it exists' },
      {
        t: 'p',
        text: 'A distribution utility has hundreds of remote sites on radio links that carry a few kilobits per second. Polling every point at every site every few seconds is impossible on that bandwidth, and a protocol that can only answer questions cannot tell the master that a breaker tripped between polls, or when. DNP3 was written for that problem: let the outstation keep a queue of what changed, with timestamps, and hand it over efficiently when the master asks or when the change is urgent enough to send unasked.',
      },
      {
        t: 'p',
        text: 'Water and wastewater SCADA inherited it from the electric utilities for the same reasons. A lift station on a licensed radio channel, reporting pump starts and high level alarms to a master at the plant, is the case the protocol was made for.',
      },
      { t: 'h2', text: 'Master and outstation' },
      {
        t: 'p',
        text: 'The master is the SCADA host or a data concentrator. The outstation is the RTU or the PLC at the remote site. The master initiates: it polls for data, sends controls, and sets time. The outstation responds, and may also initiate an unsolicited response when configured to. Each outstation has an address, each master has an address, and a message carries both, which lets one channel serve many outstations and lets an outstation refuse a master it does not know.',
      },
      { t: 'h2', text: 'Static data and events' },
      {
        t: 'dl',
        items: [
          { term: 'Static data, class 0', def: 'The current value of every point: binary inputs, analog inputs, counters, binary and analog outputs. An integrity poll requests class 0 and gets the whole picture. It is expensive on a slow link and it is done at startup and at a long interval.' },
          { term: 'Event data, classes 1, 2, and 3', def: 'When a point changes by more than its configured deadband, or a binary point changes state, the outstation queues an event with the value and its timestamp. Each point is assigned a class, so that a high level alarm can be class 1 and a slowly drifting temperature class 3. The master polls the classes at different rates, and gets only what changed.' },
          { term: 'Unsolicited responses', def: 'For events that cannot wait for the next poll, the outstation sends them without being asked. The master acknowledges. Which classes are unsolicited, and how long the outstation waits to group events before sending, is configured per outstation.' },
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        title: 'The timestamp is the point',
        text: 'A pump that started and stopped between two polls is invisible to a polling protocol. In DNP3 both transitions are events with the outstation clock on them, and the sequence of events at the master shows what happened in the order it happened, even if the link was down for an hour. Keep the outstation clocks synchronized from the master, or the sequence is meaningless.',
      },
      { t: 'h2', text: 'Controls' },
      {
        t: 'p',
        text: 'Outputs are operated with a select-before-operate sequence: the master selects the point, the outstation confirms, the master operates, the outstation acts and confirms. Two round trips, and a misdelivered or corrupted operate cannot move the wrong point. Direct operate skips the select for points where the extra safety is not needed. Pulse controls, with on and off durations, are part of the protocol, which is why a remote breaker or a pump start can be commanded without the master managing the timing.',
      },
      { t: 'h2', text: 'Transport' },
      {
        t: 'p',
        text: 'DNP3 was written for serial links and it still runs over RS-232 and RS-485 to radios and modems. It also runs over TCP and UDP on Ethernet and cellular, on port 20000 by convention, with the same messages inside. A migration from radio to cellular is often a transport change and nothing else at the application level. The link layer has its own addressing and error checking, which is part of why it works on noisy channels that would corrupt Modbus frames.',
      },
      { t: 'h2', text: 'Interoperability and the device profile' },
      {
        t: 'p',
        text: 'Two DNP3 devices can both be compliant and still not talk, because the protocol allows many optional features. Each device publishes a device profile that says which it supports: which data types, which variations, whether it does unsolicited, what time synchronization method it uses. Comparing the outstation profile against the master profile before purchase is the difference between an afternoon of configuration and a month of finger pointing. The subset levels, one through four, are a shorthand for what a device supports.',
      },
      { t: 'h2', text: 'Security' },
      {
        t: 'p',
        text: 'Base DNP3 has no authentication. Anyone who can reach the channel can send a control. DNP3 Secure Authentication, version five in the current standard, adds a challenge and response with shared keys or certificates so the outstation can prove a control came from its master. It is supported by most current RTUs and masters and it is rarely turned on. On a cellular link that terminates on a public network, it should be, along with the VPN the cellular pages describe.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between DNP3 and Modbus?',
        a: 'Modbus is a question and answer protocol with no timestamps and no events; the master learns only what it polls, when it polls. DNP3 lets the outstation queue time-stamped events and send them unasked, which is what a slow, shared, or intermittent link needs. Modbus is simpler; DNP3 is built for telemetry.',
      },
      {
        q: 'What is an integrity poll?',
        a: 'A request for class 0, the current value of every point, plus the queued events of the other classes. It gives the master a complete, consistent picture. It is done at startup, after a communication outage, and at a long interval, because it is expensive on a slow link.',
      },
      {
        q: 'Why do my events arrive with the wrong times?',
        a: 'The outstation clock is wrong. Events carry the outstation timestamp. The master has to set the time on the outstation regularly using the protocol time synchronization, and the outstation has to keep it between syncs.',
      },
      {
        q: 'Does DNP3 run over Ethernet?',
        a: 'Yes, over TCP or UDP, on port 20000 by convention, with the same application messages as the serial version. Radio, cellular, fiber, and leased lines all carry it.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/modbus-rtu',
      '/controls/plc-systems/communications/serial-communications',
      '/controls/plc-systems/communications/gateways',
      '/troubleshooting/radio-troubleshooting/remote-site-stops-communicating',
      '/cybersecurity/water-wastewater-cybersecurity/utility-threat-landscape',
    ],
  },
  {
    path: '/controls/plc-systems/communications/opc-ua',
    kind: 'reference',
    title: 'OPC UA',
    summary:
      'What OPC UA is for, how its information model, security, and transports differ from OPC Classic, where it belongs in a plant, and what to check before relying on it.',
    answer:
      'OPC UA, IEC 62541, is a platform-independent standard for exchanging data between control systems and everything above them. A server exposes an address space of typed nodes, a client browses it, reads and writes values, subscribes to changes, and receives alarms and history, all over a secured channel with certificates for both ends. It replaced OPC Classic, which depended on Windows DCOM, and it is the usual answer to how SCADA, historians, and enterprise systems reach controller data without a vendor driver for each.',
    keyPoints: [
      'A server publishes an address space; a client browses, reads, writes, and subscribes. Both sides are software, not a protocol on a wire.',
      'Security is built in: certificates identify both ends, and sessions can be signed and encrypted.',
      'Subscriptions deliver changes at a publishing interval, which is efficient; polling every value is not.',
      'It is an integration protocol, not an I/O protocol. Controllers still talk to their I/O by other means.',
      'Every server has limits on sessions, subscriptions, and monitored items, and every client should be configured within them.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 8,
    tags: ['Communications', 'SCADA', 'Networking', 'Cybersecurity'],
    blocks: [
      { t: 'h2', text: 'From Classic to UA' },
      {
        t: 'p',
        text: 'OPC Classic, from the 1990s, gave SCADA a standard way to read controller data through a vendor server, and it tied that to Microsoft COM and DCOM. DCOM across a network meant Windows security configuration that nobody got right, firewalls that could not be used, and no path to anything that was not Windows. OPC UA was written to keep the idea and drop the dependency: a defined information model, a defined set of services, its own transport, and security as a first-class part of the design.',
      },
      { t: 'h2', text: 'The information model' },
      {
        t: 'p',
        text: 'A UA server exposes an address space: a graph of nodes, each with a type, attributes, and references to other nodes. A tag is a variable node with a value, a data type, and a timestamp. A piece of equipment can be an object node with variables and methods under it. Types can be defined, so that every pump in a plant exposes the same structure, and companion specifications define standard models for drives, instruments, and whole industries.',
      },
      {
        t: 'p',
        text: 'A client discovers what is there by browsing, which is the difference in practice: connecting to a UA server and seeing the controller tags with their names, types, and engineering units, instead of configuring register addresses one by one from a spreadsheet.',
      },
      { t: 'h2', text: 'What a client does' },
      {
        t: 'dl',
        items: [
          { term: 'Read and write', def: 'Values, with their status and timestamp. A write is refused if the client lacks permission or the node is read-only.' },
          { term: 'Subscribe', def: 'The client creates a subscription with a publishing interval and adds monitored items with sampling intervals and deadbands. The server sends what changed. This is how a SCADA host watches ten thousand tags without polling ten thousand tags.' },
          { term: 'Alarms and conditions', def: 'A defined model for alarm states, acknowledgment, and shelving, so an alarm raised in the controller appears with the same semantics in every client.' },
          { term: 'Historical access', def: 'Reading past values and aggregates from a server that stores them, which is how a historian can be a UA server to the systems above it.' },
          { term: 'Methods', def: 'Calling a function the server exposes, with arguments and a result, for things that are actions rather than values.' },
        ],
      },
      { t: 'h2', text: 'Security' },
      {
        t: 'p',
        text: 'Every UA application has a certificate, and a connection is established only when each end trusts the other’s certificate, either explicitly in a trust list or through a certificate authority. The session can then be signed, so messages cannot be altered, and encrypted, so they cannot be read. User authentication is layered on top: anonymous, username and password, or a user certificate, each mapped to permissions on the server. The first time a client connects, its certificate appears in the server’s rejected list, and an administrator moves it to trusted. That step is where most first connections stall, and it is doing exactly what it should.',
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Security mode None exists for testing, not for plants',
        text: 'A server offering the None security policy and anonymous access is readable and writable by anything that can reach its port. It is a convenient setting during commissioning and a liability afterward. Turn it off before the system goes into service, and put the server behind the same segmentation as the controllers.',
      },
      { t: 'h2', text: 'Where it fits' },
      {
        t: 'p',
        text: 'UA is the connection between the control layer and the layers above it: SCADA to controllers that embed a UA server, historians to SCADA, MES and analytics to historians, and, through a gateway or a data diode, the enterprise to a read-only view of the plant. It is not an I/O protocol; a controller talks to its remote racks and drives by EtherNet/IP, PROFINET, or Modbus, and exposes the result through UA. Many modern controllers embed a UA server directly; older ones are served by a gateway that speaks their native protocol on one side and UA on the other.',
      },
      {
        t: 'table',
        caption: 'Transports and where they are used',
        head: ['Transport', 'Port by convention', 'Use'],
        rows: [
          ['opc.tcp, binary encoding', '4840', 'Plant floor to SCADA and historian; the efficient default'],
          ['HTTPS', '443', 'Across boundaries where only web ports are open'],
          ['PubSub over MQTT or UDP', 'Varies', 'Publishing to many consumers, cloud and analytics; newer and less uniformly supported'],
        ],
      },
      { t: 'h2', text: 'Limits and load' },
      {
        t: 'p',
        text: 'A UA server in a controller shares the processor with the control program. It has limits on sessions, subscriptions, monitored items, and sampling rate, and a client that asks for ten thousand items at a 100 ms sampling interval will either be refused or will slow the scan. Configure the client within the server limits, set sampling intervals from what the data actually needs, and use deadbands on monitored items so that noise does not become traffic. The server diagnostics show the load, and they should be checked after any new client is added.',
      },
    ],
    faqs: [
      {
        q: 'Is OPC UA a replacement for Modbus or EtherNet/IP?',
        a: 'No. Those are how controllers talk to devices and each other. OPC UA is how software above the controllers reads and writes their data with a common model and built-in security. A plant uses both.',
      },
      {
        q: 'Why will my client not connect to the server?',
        a: 'Almost always certificates. The server has not trusted the client certificate, or the client has not trusted the server’s, or the security policy the client asked for is not enabled on the server. Look in the rejected certificates folder on each side.',
      },
      {
        q: 'What is the difference between polling and subscribing?',
        a: 'Polling reads every value at an interval whether it changed or not. A subscription asks the server to send only what changed, at a publishing interval, with sampling and deadband per item. Subscriptions scale; polling does not.',
      },
      {
        q: 'Does OPC UA work across a firewall?',
        a: 'Yes. It uses a single defined port, 4840 by convention for the binary transport, and can also use HTTPS, so a firewall rule can permit exactly the connection needed. That is one of the main reasons it replaced OPC Classic.',
      },
    ],
    related: [
      '/controls/scada-hmi/scada-fundamentals/what-is-scada',
      '/controls/plc-systems/communications/gateways',
      '/controls/plc-systems/communications/ethernet-ip',
      '/cybersecurity/ot-security/purdue-model',
      '/cybersecurity/ot-security/ot-vs-it-security',
    ],
  },
  {
    path: '/controls/plc-systems/communications/serial-communications',
    kind: 'reference',
    title: 'Serial Communications',
    summary:
      'RS-232, RS-422, and RS-485 in practice: which is which, cable and distance, termination, biasing, the common reference wire everyone leaves off, and the settings that have to match at both ends.',
    answer:
      'RS-232 is a point-to-point link between two devices over a few tens of feet. RS-422 and RS-485 are differential links over twisted pair that run thousands of feet and, in the case of RS-485, connect many devices on one bus. A serial link works when both ends agree on the electrical standard, the baud rate, the data bits, parity, and stop bits, and when the bus is wired as a chain, terminated at its ends, biased so it idles in a known state, and given a common reference. Most serial faults are one of those things missing.',
    keyPoints: [
      'RS-232 is single-ended and short; RS-422 and RS-485 are differential and long, and 485 is the one that supports many devices on one pair.',
      'A 485 bus is a daisy chain with a 120 ohm terminator at each end, never a star and never terminated in the middle.',
      'Biasing resistors hold the bus in a defined idle state; without them receivers see noise as data between messages.',
      'Run the signal common between devices. Two wires is a myth that works until the ground potentials differ.',
      'Baud, data bits, parity, and stop bits must match exactly at every device on the link.',
    ],
    published: '2026-09-05',
    updated: '2026-09-05',
    readingTime: 9,
    tags: ['Communications', 'Modbus', 'Signals', 'Networking'],
    blocks: [
      { t: 'h2', text: 'Three standards' },
      {
        t: 'table',
        caption: 'The electrical standards',
        head: ['Standard', 'Signalling', 'Devices', 'Practical distance', 'Typical use'],
        rows: [
          ['RS-232', 'Single-ended, voltage referenced to ground', 'Two', 'Up to about 50 ft at moderate rates', 'A laptop to a controller, a controller to a modem or radio'],
          ['RS-422', 'Differential, separate transmit and receive pairs', 'One driver, up to ten receivers', 'Up to about 4,000 ft', 'Point-to-point over distance, some multidrop'],
          ['RS-485', 'Differential, one pair shared half duplex, or two pairs full duplex', 'Up to 32 unit loads, more with low-load transceivers', 'Up to about 4,000 ft at low baud rates', 'Modbus RTU multidrop, drives, meters, and instruments on one bus'],
        ],
      },
      {
        t: 'p',
        text: 'RS-232 sends a voltage on one wire referenced to a ground wire, and noise on the ground appears as signal, which is why it is short. RS-422 and RS-485 send the signal as the difference between two wires of a twisted pair; noise that couples into both wires equally cancels, which is why they are long. RS-485 lets many transceivers share the pair by tri-stating their drivers when they are not talking, which is why it is the bus for multidrop and why it needs care.',
      },
      { t: 'h2', text: 'Wiring an RS-485 bus' },
      {
        t: 'steps',
        items: [
          { title: 'Daisy chain.', text: 'The cable runs from device to device in one line. Each device is on the line, not at the end of a branch. A star, or a long stub to a device, reflects signals and corrupts them at higher rates.' },
          { title: 'Terminate the ends.', text: 'A 120 ohm resistor across the pair at each physical end of the chain, matching the cable impedance, and nowhere else. Many devices have a switch or a jumper for it; count the terminators on the bus and make sure there are exactly two.' },
          { title: 'Bias the bus.', text: 'When no driver is active the pair floats, and receivers interpret the noise as random data. Pull-up and pull-down resistors on one device, often enabled by a jumper on the master or the converter, hold the pair in the idle state. One set of bias resistors per bus, not one per device.' },
          { title: 'Run the common.', text: 'Differential signalling tolerates some ground potential difference between devices, but not an unlimited one. A third conductor connecting the signal commons keeps every transceiver within its common-mode range. Shield is not common; use a conductor.' },
          { title: 'Use the right cable.', text: 'Twisted pair, shielded, with a characteristic impedance around 120 ohms, rated for the environment. Instrument cable meant for 4 to 20 mA is often the wrong impedance and works only at short lengths.' },
          { title: 'Ground the shield at one end.', text: 'Usually the master or panel end. Grounded at both ends it carries ground current through the shield and couples noise into the pair it is protecting.' },
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A and B mean different things to different manufacturers',
        text: 'The RS-485 standard names the lines A and B, and manufacturers disagree about which is the non-inverting line. A device labelled A and B wired to another device labelled A and B may be reversed. If a link that should work does nothing at all, swap the pair at one end before doing anything else. A reversed pair is the most common serial fault in existence.',
      },
      { t: 'h2', text: 'The settings' },
      {
        t: 'p',
        text: 'Every device on a serial link has to agree on the baud rate, the number of data bits, the parity, and the number of stop bits, written as, for example, 9600 8N1. One device at even parity on a bus of no-parity devices sees every frame as an error. The protocol on top, usually Modbus RTU, has its own requirements: Modbus RTU specifies 8 data bits and expects even parity by default, though most devices allow none with two stop bits. The settings on a bus are documented on the network drawing beside each device, and a new device is set to match them before it is connected.',
      },
      { t: 'h2', text: 'Half duplex and turnaround' },
      {
        t: 'p',
        text: 'A two-wire RS-485 bus is half duplex: only one device drives at a time. The master sends, releases the bus, and the addressed slave replies after a short delay. Converters and radio modems that need to switch between transmitting and receiving add turnaround time, and a master with a response timeout shorter than the round trip through them declares a device dead that is answering fine. The Modbus RTU page covers the framing and timing; the device-times-out troubleshooting page covers the symptom.',
      },
      { t: 'h2', text: 'Converters and isolation' },
      {
        t: 'p',
        text: 'A converter between RS-232 and RS-485, or between USB and RS-485, is a transceiver in a box, and it has the same needs: correct polarity, termination if it is at the end, and biasing if it is the master. Isolated converters break the ground path between the two sides, which protects the port from a ground potential difference and from the surge that a lightning strike puts on a long field cable. On any bus that leaves the building, an isolated port at the panel end is cheap insurance.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Serial cable that leaves the building carries the outside in',
        text: 'A copper serial line to a remote well or a tank site is a lightning path into the panel. Surge protection on the line at both ends, isolation at the port, and fiber or radio instead of copper where the run is long are the protections. The grounding and surge pages cover the practice.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between RS-422 and RS-485?',
        a: 'Both are differential over twisted pair. RS-422 has one driver and up to ten receivers on separate transmit and receive pairs, so it is point-to-point or one-to-many. RS-485 allows many drivers on a shared pair, each tri-stating when silent, so it is a true multidrop bus.',
      },
      {
        q: 'How many devices can I put on an RS-485 bus?',
        a: 'The standard allows 32 unit loads. Modern transceivers present a fraction of a unit load, so 64, 128, or 256 devices are possible depending on the devices. Modbus RTU addressing allows 247. Cable length and baud rate limit it further in practice.',
      },
      {
        q: 'Do I really need termination resistors?',
        a: 'At 9600 baud on a short bus, a link often works without them. As length and speed rise, reflections from unterminated ends corrupt frames intermittently, which is the hardest kind of fault to find. Terminate the two ends and only the two ends, every time.',
      },
      {
        q: 'Why does the bus work with two devices and fail when I add a third?',
        a: 'Usually a third terminator, a wiring star created by the branch to the new device, a duplicate address, or a device with different settings. Occasionally the new device pulls the bus with its own bias resistors fighting the master’s.',
      },
    ],
    related: [
      '/controls/plc-systems/communications/modbus-rtu',
      '/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline',
      '/troubleshooting/communications-troubleshooting/device-times-out',
      '/controls/plc-systems/communications/gateways',
      '/controls/instrumentation/signals/ground-loops',
    ],
  },
];
