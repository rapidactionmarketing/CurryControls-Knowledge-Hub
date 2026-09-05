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
];
