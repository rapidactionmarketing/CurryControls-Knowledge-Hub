import { fmt, num, sig, str, type Calculator } from '../calc-types';

export const NETWORK_CALCULATORS: Calculator[] = [
  {
    slug: 'ip-subnet',
    title: 'IP Subnet Calculator',
    category: 'Networking',
    summary:
      'Network address, broadcast, usable host range, and host count for an IPv4 address and prefix, with the notes that matter on a control network.',
    answer:
      'An IPv4 subnet is defined by an address and a prefix length. The prefix marks the network bits; the remaining bits address hosts. A /24 has 8 host bits, giving 256 addresses, of which 254 are usable because the all-zeros address identifies the network and the all-ones address is the broadcast.',
    keywords: ['subnet', 'CIDR', 'IP address', 'netmask', 'VLAN', 'network'],
    fields: [
      { kind: 'text', key: 'address', label: 'IP address', default: '192.168.10.45', placeholder: '10.20.30.40' },
      {
        kind: 'select',
        key: 'prefix',
        label: 'Prefix length',
        options: Array.from({ length: 25 }, (_, i) => {
          const bits = i + 8;
          const mask = [24, 16, 8, 0].map((shift) => ((0xffffffff << (32 - bits)) >>> shift) & 255).join('.');
          return { value: String(bits), label: `/${bits}  (${mask})` };
        }),
        default: '24',
      },
    ],
    run: (v) => {
      const address = str(v.address, '').trim();
      const prefix = Number(str(v.prefix, '24'));

      const octets = address.split('.');
      if (octets.length !== 4 || octets.some((o) => !/^\d{1,3}$/.test(o) || Number(o) > 255)) {
        return { outputs: [], error: 'Enter a valid IPv4 address, for example 192.168.10.45.' };
      }

      const toInt = (parts: number[]) => parts.reduce((acc, part) => (acc << 8) + part, 0) >>> 0;
      const toStr = (value: number) =>
        [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join('.');

      const ip = toInt(octets.map(Number));
      const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
      const network = (ip & mask) >>> 0;
      const broadcast = (network | (~mask >>> 0)) >>> 0;
      const hostBits = 32 - prefix;
      const total = 2 ** hostBits;
      const usable = hostBits <= 1 ? (hostBits === 1 ? 2 : 1) : total - 2;

      const firstHost = hostBits <= 1 ? network : (network + 1) >>> 0;
      const lastHost = hostBits <= 1 ? broadcast : (broadcast - 1) >>> 0;

      const first = Number(octets[0]);
      const isPrivate =
        first === 10 ||
        (first === 172 && Number(octets[1]) >= 16 && Number(octets[1]) <= 31) ||
        (first === 192 && Number(octets[1]) === 168);
      const isApipa = first === 169 && Number(octets[1]) === 254;

      return {
        outputs: [
          { label: 'Network address', value: toStr(network), emphasis: true },
          { label: 'Broadcast address', value: toStr(broadcast), emphasis: true },
          { label: 'Subnet mask', value: toStr(mask) },
          { label: 'Wildcard mask', value: toStr(~mask >>> 0) },
          { label: 'Usable host range', value: `${toStr(firstHost)} to ${toStr(lastHost)}` },
          { label: 'Usable hosts', value: usable.toLocaleString('en-US'), note: `${total.toLocaleString('en-US')} total addresses` },
          { label: 'CIDR notation', value: `${toStr(network)}/${prefix}` },
          {
            label: 'Address type',
            value: isApipa ? 'Link-local (APIPA)' : isPrivate ? 'Private (RFC 1918)' : 'Public or special use',
            status: isApipa ? 'over' : isPrivate ? 'ok' : 'caution',
            note: isApipa
              ? 'A 169.254 address means the device failed to get an address from DHCP and assigned its own.'
              : isPrivate
                ? undefined
                : 'Control networks should normally use private address space.',
          },
          {
            label: 'Address is the network or broadcast',
            value: ip === network ? 'Network address' : ip === broadcast ? 'Broadcast address' : 'Usable host address',
            status: ip === network || ip === broadcast ? 'caution' : 'ok',
          },
        ],
        steps: [
          `Address ${address} as 32 bits: ${ip.toString(2).padStart(32, '0').match(/.{8}/g)?.join('.')}`,
          `Mask /${prefix}: ${mask.toString(2).padStart(32, '0').match(/.{8}/g)?.join('.')}`,
          `Network = address AND mask = ${toStr(network)}`,
          `Broadcast = network OR inverted mask = ${toStr(broadcast)}`,
          `Host bits = 32 - ${prefix} = ${hostBits}, giving ${total.toLocaleString('en-US')} addresses`,
        ],
        warnings: [
          'A device answering on a 169.254 address did not get a DHCP lease. On a control network that usually means a static address was expected and never configured.',
          'Two devices with the same address produce intermittent, confusing symptoms on both. Check for ARP conflict messages before chasing anything else.',
          'Sizing a subnet generously is cheap; renumbering a live control network is not. Leave room for the devices that will be added later.',
        ],
      };
    },
    assumptions: [
      'IPv4 with classless addressing.',
      'Assumes the network and broadcast addresses are not usable for hosts, which holds on ordinary equipment.',
    ],
    related: ['/cybersecurity/network-segmentation/vlan-segmentation', '/how-to/network-how-to/assign-ip-addresses'],
    relatedCalculators: ['network-bandwidth', 'fiber-loss-budget'],
    faqs: [
      {
        q: 'How many hosts fit in a /24?',
        a: '254. There are 256 addresses, and the first is the network address while the last is the broadcast address.',
      },
      {
        q: 'What does a 169.254 address mean?',
        a: 'The device asked for a DHCP lease, did not get one, and assigned itself a link-local address. It will not communicate with anything on the intended subnet.',
      },
    ],
  },

  {
    slug: 'network-bandwidth',
    title: 'SCADA Polling Bandwidth',
    category: 'Networking',
    summary:
      'Bandwidth a polling scheme consumes across a set of remote sites, and whether the communication path can carry it.',
    answer:
      'Polling bandwidth is the number of sites multiplied by the bytes exchanged per poll, divided by the poll interval, converted to bits per second. On a constrained path such as licensed radio or a metered cellular plan, this figure decides whether the poll rate is achievable, and it is why report by exception suits distributed utilities better than continuous polling.',
    keywords: ['bandwidth', 'polling', 'SCADA', 'cellular', 'radio', 'data usage'],
    fields: [
      { kind: 'number', key: 'sites', label: 'Remote sites', default: 40, min: 1 },
      { kind: 'number', key: 'bytesPerPoll', label: 'Bytes exchanged per poll', default: 300, min: 1, help: 'Request plus response plus protocol overhead. TCP adds roughly 40 bytes per packet.' },
      { kind: 'number', key: 'interval', label: 'Poll interval', unit: 's', default: 30, min: 0.1, step: 0.1 },
      { kind: 'number', key: 'linkKbps', label: 'Available link speed', unit: 'kbps', default: 19.2, min: 0.1, step: 0.1, help: 'Licensed radio is often 9.6 to 19.2 kbps. Cellular is far higher but usually metered.' },
      { kind: 'number', key: 'usable', label: 'Usable fraction of the link', unit: '%', default: 50, min: 5, max: 100, step: 5, help: 'Protocol overhead, retries, and headroom. Designing to 100% of a link does not work.' },
    ],
    run: (v) => {
      const sites = num(v.sites, 1);
      const bytesPerPoll = num(v.bytesPerPoll, 1);
      const interval = num(v.interval, 1);
      const linkKbps = num(v.linkKbps, 1);
      const usable = num(v.usable, 50) / 100;

      if (interval <= 0) return { outputs: [], error: 'The poll interval must be greater than zero.' };

      const bytesPerSecond = (sites * bytesPerPoll) / interval;
      const bitsPerSecond = bytesPerSecond * 8;
      const kbps = bitsPerSecond / 1000;
      const capacity = linkKbps * usable;
      const utilization = (kbps / linkKbps) * 100;
      const fits = kbps <= capacity;

      const perDayBytes = bytesPerSecond * 86400;
      const perMonthGb = (perDayBytes * 30) / 1e9;

      const maxSites = Math.floor((capacity * 1000 * interval) / (8 * bytesPerPoll));

      return {
        outputs: [
          { label: 'Required bandwidth', value: fmt(kbps, 2), unit: 'kbps', emphasis: true },
          {
            label: 'Link utilization',
            value: `${fmt(utilization, 1)}%`,
            emphasis: true,
            status: fits ? (utilization > 35 ? 'caution' : 'ok') : 'over',
            note: `Against a ${fmt(linkKbps, 1)} kbps link with ${fmt(usable * 100, 0)}% usable`,
          },
          {
            label: 'Fits the link',
            value: fits ? 'Yes' : 'No',
            status: fits ? 'ok' : 'over',
            note: fits ? undefined : 'Slow the poll rate, reduce the data per poll, or move to report by exception.',
          },
          { label: 'Sites this link supports', value: String(Math.max(0, maxSites)), note: 'At this interval and payload size' },
          { label: 'Data per day', value: `${fmt(perDayBytes / 1e6, 1)} MB` },
          {
            label: 'Data per month',
            value: perMonthGb >= 1 ? `${fmt(perMonthGb, 2)} GB` : `${fmt(perMonthGb * 1000, 0)} MB`,
            note: 'Relevant on a metered cellular plan, per site if each has its own SIM.',
          },
          { label: 'Per site, per month', value: `${fmt((perMonthGb * 1000) / sites, 1)} MB` },
        ],
        steps: [
          `Bytes per second = ${fmt(sites, 0)} sites x ${fmt(bytesPerPoll, 0)} bytes / ${fmt(interval, 1)} s = ${fmt(bytesPerSecond, 1)} B/s`,
          `Bits per second = ${fmt(bytesPerSecond, 1)} x 8 = ${fmt(bitsPerSecond, 0)} bps = ${fmt(kbps, 2)} kbps`,
          `Usable capacity = ${fmt(linkKbps, 1)} kbps x ${fmt(usable * 100, 0)}% = ${fmt(capacity, 2)} kbps`,
        ],
        warnings: [
          'Designing to the full link speed does not work. Protocol overhead, retries, and contention mean a path is effectively full well below its nominal rate.',
          'Report by exception, where a site transmits only when a value changes beyond a threshold, uses a fraction of this bandwidth. It is why DNP3 suits distributed utilities better than continuous polling.',
          'Alarm and event bursts during an upset are far above the steady-state figure, and that is exactly when the path matters most.',
          'On cellular, the monthly figure drives cost. Keepalives, VPN overhead, and retries all add to it and are easy to overlook.',
        ],
      };
    },
    formulas: [
      { expr: 'kbps = (sites x bytes per poll / interval) x 8 / 1000' },
    ],
    assumptions: [
      'Uniform polling of every site at the same interval.',
      'Payload size includes protocol overhead, which you supply.',
      'Does not model retries, contention, or burst traffic.',
    ],
    related: ['/controls/scada-hmi/scada-fundamentals/scada-architecture', '/controls/plc-systems/communications/dnp3'],
    relatedCalculators: ['modbus-poll-time', 'data-size-converter', 'ip-subnet'],
    faqs: [
      {
        q: 'How fast should I poll a lift station?',
        a: 'Fast enough that an operator can act on a change, slow enough that the path stays healthy. Every fifteen to sixty seconds for analog values, with immediate reporting of alarms and state changes, is typical on licensed radio.',
      },
    ],
  },

  {
    slug: 'fiber-loss-budget',
    title: 'Fiber Optic Loss Budget',
    category: 'Networking',
    summary:
      'Optical loss across a fiber link from length, connectors, and splices, compared against the transceiver budget with the margin remaining.',
    answer:
      'A fiber loss budget compares the transceiver power budget, which is transmit power minus receiver sensitivity, against the total link loss from fiber attenuation, connectors, and splices. What is left is the margin, and a link commissioned with little margin fails as connectors age and get dirty.',
    keywords: ['fiber', 'loss budget', 'optical', 'dB', 'attenuation', 'link budget'],
    fields: [
      { kind: 'number', key: 'length', label: 'Fiber length', unit: 'km', default: 2, min: 0.001, step: 0.001 },
      {
        kind: 'select',
        key: 'fiberType',
        label: 'Fiber and wavelength',
        options: [
          { value: '3.0', label: 'Multimode 850 nm (3.0 dB/km)' },
          { value: '1.5', label: 'Multimode 1300 nm (1.5 dB/km)' },
          { value: '0.4', label: 'Single mode 1310 nm (0.4 dB/km)' },
          { value: '0.3', label: 'Single mode 1550 nm (0.3 dB/km)' },
        ],
        default: '0.4',
      },
      { kind: 'number', key: 'connectors', label: 'Connector pairs', default: 4, min: 0 },
      { kind: 'number', key: 'connectorLoss', label: 'Loss per connector pair', unit: 'dB', default: 0.75, min: 0, step: 0.05 },
      { kind: 'number', key: 'splices', label: 'Fusion splices', default: 2, min: 0 },
      { kind: 'number', key: 'spliceLoss', label: 'Loss per splice', unit: 'dB', default: 0.3, min: 0, step: 0.05 },
      { kind: 'number', key: 'txPower', label: 'Transmitter output power', unit: 'dBm', default: -8, step: 0.1 },
      { kind: 'number', key: 'rxSensitivity', label: 'Receiver sensitivity', unit: 'dBm', default: -24, step: 0.1 },
      { kind: 'number', key: 'reserve', label: 'Repair and ageing reserve', unit: 'dB', default: 3, min: 0, step: 0.5 },
    ],
    run: (v) => {
      const length = num(v.length, 1);
      const attenuation = Number(str(v.fiberType, '0.4'));
      const connectors = num(v.connectors, 0);
      const connectorLoss = num(v.connectorLoss, 0.75);
      const splices = num(v.splices, 0);
      const spliceLoss = num(v.spliceLoss, 0.3);
      const txPower = num(v.txPower, -8);
      const rxSensitivity = num(v.rxSensitivity, -24);
      const reserve = num(v.reserve, 3);

      const fiberLoss = length * attenuation;
      const connectorTotal = connectors * connectorLoss;
      const spliceTotal = splices * spliceLoss;
      const totalLoss = fiberLoss + connectorTotal + spliceTotal;

      const powerBudget = txPower - rxSensitivity;
      const margin = powerBudget - totalLoss - reserve;
      const receivedPower = txPower - totalLoss;

      const status = margin >= 3 ? 'ok' : margin >= 0 ? 'caution' : 'over';

      return {
        outputs: [
          { label: 'Total link loss', value: fmt(totalLoss, 2), unit: 'dB', emphasis: true },
          {
            label: 'Margin after reserve',
            value: fmt(margin, 2),
            unit: 'dB',
            emphasis: true,
            status,
            note:
              margin < 0
                ? 'The link does not close. It will not work reliably, if at all.'
                : margin < 3
                  ? 'Thin margin. A dirty connector will take this link down.'
                  : 'Healthy margin.',
          },
          { label: 'Transceiver power budget', value: fmt(powerBudget, 2), unit: 'dB', note: `${fmt(txPower, 1)} dBm transmit minus ${fmt(rxSensitivity, 1)} dBm sensitivity` },
          { label: 'Expected received power', value: fmt(receivedPower, 2), unit: 'dBm', status: receivedPower > rxSensitivity ? 'ok' : 'over' },
          { label: 'Fiber attenuation', value: fmt(fiberLoss, 2), unit: 'dB', note: `${fmt(length, 3)} km at ${attenuation} dB/km` },
          { label: 'Connector loss', value: fmt(connectorTotal, 2), unit: 'dB', note: `${fmt(connectors, 0)} pairs` },
          { label: 'Splice loss', value: fmt(spliceTotal, 2), unit: 'dB', note: `${fmt(splices, 0)} splices` },
        ],
        steps: [
          `Fiber = ${fmt(length, 3)} km x ${attenuation} dB/km = ${fmt(fiberLoss, 2)} dB`,
          `Connectors = ${fmt(connectors, 0)} x ${fmt(connectorLoss, 2)} dB = ${fmt(connectorTotal, 2)} dB`,
          `Splices = ${fmt(splices, 0)} x ${fmt(spliceLoss, 2)} dB = ${fmt(spliceTotal, 2)} dB`,
          `Total loss = ${fmt(totalLoss, 2)} dB`,
          `Power budget = ${fmt(txPower, 1)} - (${fmt(rxSensitivity, 1)}) = ${fmt(powerBudget, 2)} dB`,
          `Margin = ${fmt(powerBudget, 2)} - ${fmt(totalLoss, 2)} - ${fmt(reserve, 1)} reserve = ${fmt(margin, 2)} dB`,
        ],
        warnings: [
          'Measure the finished link rather than trusting a budget. An optical power meter and light source, or an OTDR, tell you what the link actually does.',
          'A dirty connector is the most common cause of a fiber link that worked at commissioning and fails later. Clean and inspect before replacing anything.',
          'Receivers also have a maximum input power. On a very short single-mode link the received power can be too high, which requires an attenuator.',
          'Attenuation figures here are typical values. Use the actual cable specification and the transceiver datasheet for a design.',
        ],
      };
    },
    formulas: [
      { expr: 'total loss = (km x dB/km) + (connectors x dB) + (splices x dB)' },
      { expr: 'margin = (Tx power - Rx sensitivity) - total loss - reserve' },
    ],
    assumptions: [
      'Typical attenuation figures rather than a specific cable specification.',
      'Does not check the receiver maximum input power, which matters on very short links.',
      'Does not model dispersion, which limits distance on long high-speed links.',
    ],
    related: ['/troubleshooting/fiber-troubleshooting/high-optical-loss', '/how-to/network-how-to/test-fiber'],
    relatedCalculators: ['ip-subnet', 'network-bandwidth'],
    faqs: [
      {
        q: 'How much margin should a fiber link have?',
        a: 'At least 3 dB beyond the repair and ageing reserve is a common target. A link commissioned with almost no margin will fail as connectors age and collect contamination.',
      },
      {
        q: 'Can a fiber link have too much power?',
        a: 'Yes. Receivers have a maximum input power as well as a sensitivity floor. On a very short single-mode run the receiver can be overdriven, and an inline attenuator is the fix.',
      },
    ],
  },
];
