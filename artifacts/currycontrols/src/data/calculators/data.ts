import { DATA_TYPES } from '../reference-data';
import { fmt, num, sig, str, type Calculator } from '../calc-types';

export const DATA_CALCULATORS: Calculator[] = [
  {
    slug: 'number-base-converter',
    title: 'Number Base and Bit Converter',
    category: 'PLC & Data',
    summary:
      'Convert between decimal, hexadecimal, binary, and octal, with the bit pattern shown and the two-complement signed interpretation for 16 and 32 bit words.',
    answer:
      'A value entered in any base converts to the others by parsing it to an integer and re-rendering it. In PLC work the signed interpretation matters: the same 16-bit pattern reads as 65535 unsigned and as -1 signed, which is why an analog value can appear as a large positive number in one tag and a negative number in another.',
    keywords: ['hex', 'binary', 'decimal', 'octal', 'bit', 'two complement', 'conversion'],
    fields: [
      {
        kind: 'select',
        key: 'base',
        label: 'Input base',
        options: [
          { value: '10', label: 'Decimal' },
          { value: '16', label: 'Hexadecimal' },
          { value: '2', label: 'Binary' },
          { value: '8', label: 'Octal' },
        ],
        default: '10',
      },
      { kind: 'text', key: 'value', label: 'Value', default: '16384', placeholder: 'e.g. 4000 or 1010' },
      {
        kind: 'select',
        key: 'width',
        label: 'Word width',
        options: [
          { value: '8', label: '8 bit (byte)' },
          { value: '16', label: '16 bit (word / INT)' },
          { value: '32', label: '32 bit (double word / DINT)' },
        ],
        default: '16',
      },
    ],
    run: (v) => {
      const base = Number(str(v.base, '10'));
      const raw = str(v.value, '').trim().replace(/^0x/i, '').replace(/^0b/i, '').replace(/[\s_]/g, '');
      const width = Number(str(v.width, '16'));

      if (!raw) return { outputs: [], error: 'Enter a value.' };

      const valid = { 10: /^\d+$/, 16: /^[0-9a-fA-F]+$/, 2: /^[01]+$/, 8: /^[0-7]+$/ }[base as 10 | 16 | 2 | 8];
      if (!valid?.test(raw)) {
        return { outputs: [], error: `That is not a valid base ${base} value.` };
      }

      const parsed = Number.parseInt(raw, base);
      if (!Number.isFinite(parsed)) return { outputs: [], error: 'That value could not be parsed.' };

      const max = 2 ** width;
      if (parsed >= max) {
        return {
          outputs: [],
          error: `${parsed.toLocaleString('en-US')} does not fit in ${width} bits. The largest unsigned value is ${(max - 1).toLocaleString('en-US')}.`,
        };
      }

      const unsigned = parsed >>> 0;
      const signBit = 2 ** (width - 1);
      const signed = unsigned >= signBit ? unsigned - max : unsigned;

      const binary = unsigned.toString(2).padStart(width, '0');
      const grouped = binary.match(/.{1,4}/g)?.join(' ') ?? binary;
      const hex = unsigned.toString(16).toUpperCase().padStart(width / 4, '0');

      const setBits: number[] = [];
      for (let i = 0; i < width; i += 1) {
        if ((unsigned >>> i) & 1) setBits.push(i);
      }

      return {
        outputs: [
          { label: 'Decimal (unsigned)', value: unsigned.toLocaleString('en-US'), emphasis: true },
          {
            label: 'Decimal (signed, two complement)',
            value: signed.toLocaleString('en-US'),
            emphasis: true,
            status: signed < 0 ? 'caution' : 'neutral',
            note: signed < 0 ? 'The high bit is set, so a signed tag reads this as negative.' : undefined,
          },
          { label: 'Hexadecimal', value: `0x${hex}` },
          { label: 'Binary', value: grouped },
          { label: 'Octal', value: unsigned.toString(8) },
          {
            label: 'Bits set',
            value: setBits.length > 0 ? setBits.join(', ') : 'none',
            note: 'Bit 0 is the least significant bit.',
          },
          { label: 'Percent of full scale', value: `${fmt((unsigned / (max - 1)) * 100, 3)}%`, note: `Against the ${width}-bit unsigned maximum` },
        ],
        steps: [
          `Parsed "${raw}" as base ${base} = ${unsigned.toLocaleString('en-US')} decimal`,
          `${width}-bit pattern: ${grouped}`,
          `Sign bit (bit ${width - 1}) is ${unsigned >= signBit ? 'set' : 'clear'}, so the signed value is ${signed.toLocaleString('en-US')}`,
        ],
        warnings: [
          'Whether a value reads as signed or unsigned depends on the data type of the tag, not on the bits. The same word is 65535 in a WORD and -1 in an INT.',
          'Bit numbering conventions differ between platforms. Some vendors number bits from the most significant end, and some number them within a word rather than within a double word.',
        ],
      };
    },
    assumptions: [
      'Two-complement representation for signed values, which is what every common PLC platform uses.',
      'Bit 0 is the least significant bit.',
    ],
    related: ['/controls/plc-systems/plc-fundamentals/memory'],
    relatedCalculators: ['data-type-ranges', 'ieee-754-float', 'modbus-register-address'],
    faqs: [
      {
        q: 'Why does my analog value show as negative?',
        a: 'The raw value has its high bit set and the tag is a signed integer. A 16-bit analog value above 32767 wraps to a negative number in an INT. Either the card range is misconfigured or the value belongs in a DINT.',
      },
    ],
  },

  {
    slug: 'data-type-ranges',
    title: 'PLC Data Type Ranges',
    category: 'PLC & Data',
    summary:
      'Value ranges for the IEC 61131-3 data types, with a check of whether a value fits and what it will do if it does not.',
    answer:
      'The IEC 61131-3 integer types are bounded by their bit width: an INT is 16-bit signed and holds -32,768 to 32,767, a DINT is 32-bit signed and holds about plus or minus 2.1 billion. A REAL is IEEE 754 single precision with roughly 7 significant decimal digits, which is why a large totalizer loses resolution when stored in one.',
    keywords: ['data type', 'INT', 'DINT', 'REAL', 'range', 'overflow', 'IEC 61131-3'],
    fields: [
      { kind: 'number', key: 'value', label: 'Value to check', default: 3000000, step: 1 },
    ],
    run: (v) => {
      const value = num(v.value, 0);

      const limits: { name: string; min: number; max: number; note?: string }[] = [
        { name: 'SINT (8-bit signed)', min: -128, max: 127 },
        { name: 'USINT / BYTE (8-bit unsigned)', min: 0, max: 255 },
        { name: 'INT (16-bit signed)', min: -32768, max: 32767 },
        { name: 'UINT / WORD (16-bit unsigned)', min: 0, max: 65535 },
        { name: 'DINT (32-bit signed)', min: -2147483648, max: 2147483647 },
        { name: 'UDINT / DWORD (32-bit unsigned)', min: 0, max: 4294967295 },
        { name: 'LINT (64-bit signed)', min: -9.223372036854776e18, max: 9.223372036854776e18 },
      ];

      const fits = limits.filter((limit) => value >= limit.min && value <= limit.max);
      const smallest = fits[0];

      // A REAL holds about 7 significant decimal digits before it starts rounding.
      const magnitude = Math.abs(value);
      const realExact = magnitude === 0 || magnitude < 16777216;
      const asFloat = Math.fround(value);

      return {
        outputs: [
          {
            label: 'Smallest type that holds this value',
            value: smallest ? smallest.name : 'Larger than a 64-bit signed integer',
            emphasis: true,
            status: smallest ? 'ok' : 'over',
          },
          {
            label: 'Fits in an INT',
            value: value >= -32768 && value <= 32767 ? 'Yes' : 'No',
            status: value >= -32768 && value <= 32767 ? 'ok' : 'over',
            note: value >= -32768 && value <= 32767 ? undefined : 'Will overflow and wrap in a 16-bit signed tag.',
          },
          {
            label: 'Fits in a DINT',
            value: value >= -2147483648 && value <= 2147483647 ? 'Yes' : 'No',
            status: value >= -2147483648 && value <= 2147483647 ? 'ok' : 'over',
          },
          {
            label: 'Exact in a REAL',
            value: realExact ? 'Yes' : 'No',
            status: realExact ? 'ok' : 'caution',
            note: realExact
              ? 'Below about 16.7 million, integers are exact in single precision.'
              : `Stored as ${asFloat.toLocaleString('en-US')}, an error of ${sig(Math.abs(asFloat - value), 4)}. Use a DINT or an LREAL for totalizers.`,
          },
          {
            label: 'Modbus registers needed',
            value:
              value >= -32768 && value <= 65535 ? '1 register (16 bit)' : '2 registers (32 bit)',
            note: 'Modbus registers are 16 bits. Anything larger spans two, and the word order matters.',
          },
        ],
        steps: [
          `Value = ${value.toLocaleString('en-US')}`,
          `Types that hold it: ${fits.length > 0 ? fits.map((f) => f.name.split(' ')[0]).join(', ') : 'none listed'}`,
          realExact
            ? 'Integers below 2^24 are represented exactly in IEEE 754 single precision'
            : `Single precision rounds this to ${asFloat.toLocaleString('en-US')}`,
        ],
        warnings: [
          'Integer overflow in a PLC does not usually raise an error. The value wraps silently, so a run-hour counter in an INT rolls over at 32,767 and starts counting from a large negative number.',
          'A REAL has about 7 significant decimal digits. A totalizer that reaches 10 million stops resolving single units, which shows up as a totalizer that appears to stall.',
          'Storing a 32-bit value across two Modbus registers requires both sides to agree on word order. There is no standard, and mismatched order produces values that look like noise.',
        ],
      };
    },
    notes: [
      'The table below lists the ranges for the common IEC 61131-3 types. Vendor implementations vary in which types they support and in what they call them.',
    ],
    assumptions: [
      'Two-complement signed integers and IEEE 754 floating point, which is what common PLC platforms use.',
      'Vendor-specific types and platform extensions are not covered.',
    ],
    standards: ['IEC 61131-3 for the elementary data types'],
    related: ['/controls/plc-systems/plc-fundamentals/memory', '/controls/plc-systems/programming/iec-61131-3'],
    relatedCalculators: ['number-base-converter', 'ieee-754-float'],
    faqs: [
      {
        q: 'Why did my run-hour counter go negative?',
        a: 'It overflowed a 16-bit signed integer. Above 32,767 the value wraps to -32,768 and counts up again. Use a DINT for anything that accumulates.',
      },
      {
        q: 'Should a totalizer be a REAL or a DINT?',
        a: 'A DINT, or a pair of values holding whole units and a remainder. A REAL loses single-unit resolution above about 16.7 million, which makes a large totalizer appear to stop advancing.',
      },
    ],
  },

  {
    slug: 'ieee-754-float',
    title: 'IEEE 754 Floating Point Inspector',
    category: 'PLC & Data',
    summary:
      'Convert between a floating point value and its raw 32-bit representation, showing sign, exponent, mantissa, and the two Modbus registers in either word order.',
    answer:
      'An IEEE 754 single precision value occupies 32 bits: one sign bit, eight exponent bits, and 23 mantissa bits. Across a Modbus link it spans two 16-bit registers, and because the standard does not define which register comes first, the same 32 bits read as a completely different number if the word order is wrong.',
    keywords: ['IEEE 754', 'float', 'REAL', 'word order', 'endianness', 'modbus float'],
    fields: [
      {
        kind: 'select',
        key: 'direction',
        label: 'Convert',
        options: [
          { value: 'float-to-hex', label: 'Float to raw bits' },
          { value: 'hex-to-float', label: 'Raw hex to float' },
        ],
        default: 'float-to-hex',
      },
      { kind: 'text', key: 'value', label: 'Value', default: '12.5', placeholder: '12.5 or 41480000' },
    ],
    run: (v) => {
      const direction = str(v.direction, 'float-to-hex');
      const raw = str(v.value, '').trim();
      if (!raw) return { outputs: [], error: 'Enter a value.' };

      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);

      if (direction === 'float-to-hex') {
        const parsed = Number.parseFloat(raw);
        if (!Number.isFinite(parsed)) return { outputs: [], error: 'That is not a valid number.' };
        view.setFloat32(0, parsed, false);
      } else {
        const clean = raw.replace(/^0x/i, '').replace(/[\s_]/g, '');
        if (!/^[0-9a-fA-F]{1,8}$/.test(clean)) {
          return { outputs: [], error: 'Enter up to 8 hexadecimal digits.' };
        }
        view.setUint32(0, Number.parseInt(clean.padStart(8, '0'), 16), false);
      }

      const bits = view.getUint32(0, false) >>> 0;
      const value = view.getFloat32(0, false);
      const binary = bits.toString(2).padStart(32, '0');
      const sign = binary[0];
      const exponent = binary.slice(1, 9);
      const mantissa = binary.slice(9);
      const exponentValue = Number.parseInt(exponent, 2);

      const highWord = (bits >>> 16) & 0xffff;
      const lowWord = bits & 0xffff;
      const hex = bits.toString(16).toUpperCase().padStart(8, '0');

      return {
        outputs: [
          { label: 'Value', value: Number.isFinite(value) ? String(value) : String(value), emphasis: true },
          { label: 'Raw hex', value: `0x${hex}`, emphasis: true },
          {
            label: 'Modbus registers, high word first',
            value: `${highWord}, ${lowWord}`,
            note: `0x${highWord.toString(16).toUpperCase().padStart(4, '0')}, 0x${lowWord.toString(16).toUpperCase().padStart(4, '0')} — often called big-endian or ABCD`,
          },
          {
            label: 'Modbus registers, low word first',
            value: `${lowWord}, ${highWord}`,
            note: 'Often called word-swapped or CDAB. Very common on field devices.',
          },
          { label: 'Sign bit', value: `${sign} (${sign === '0' ? 'positive' : 'negative'})` },
          {
            label: 'Exponent',
            value: `${exponent} (${exponentValue}, unbiased ${exponentValue - 127})`,
          },
          { label: 'Mantissa', value: mantissa },
          { label: 'Full bit pattern', value: `${sign} ${exponent} ${mantissa}` },
        ],
        steps: [
          `32-bit pattern: ${sign} ${exponent} ${mantissa}`,
          `High word (first 16 bits) = ${highWord}, low word = ${lowWord}`,
          `Value = ${value}`,
        ],
        warnings: [
          'Modbus does not define word order for 32-bit values. If a float reads as a huge number, a near-zero number, or nonsense, try swapping the word order before assuming the device is faulty.',
          'Some devices additionally swap bytes within each word, giving four possible arrangements. Read a value you already know, such as a flow rate shown on the device display, to identify which one applies.',
          'Single precision carries about 7 significant decimal digits. Values above roughly 16.7 million stop resolving single units.',
        ],
      };
    },
    formulas: [
      { expr: 'value = (-1)^sign x 1.mantissa x 2^(exponent - 127)' },
    ],
    assumptions: [
      'IEEE 754 single precision, 32 bits.',
      'Register values are shown for the two common word orders. Byte-swapped variants exist and are not enumerated.',
    ],
    related: ['/controls/plc-systems/communications/modbus-tcp', '/controls/plc-systems/communications/modbus-rtu'],
    relatedCalculators: ['modbus-register-address', 'number-base-converter', 'data-type-ranges'],
    faqs: [
      {
        q: 'My Modbus float reads as garbage. What is wrong?',
        a: 'Almost always word order. Swap the two 16-bit registers and read again. If it is still wrong, try swapping bytes within each word. Verify against a value the device displays locally.',
      },
    ],
  },

  {
    slug: 'modbus-register-address',
    title: 'Modbus Register Address Converter',
    category: 'PLC & Data',
    summary:
      'Convert between the traditional data model number such as 40001 and the protocol address that actually goes on the wire, with the function code shown.',
    answer:
      'Modbus documentation uses two conventions for the same register. The traditional data model numbers holding registers from 40001, while the protocol address that goes on the wire starts at 0. Traditional 40010 is protocol address 9. Being off by exactly one register is the single most common Modbus integration error.',
    keywords: ['modbus', 'register', '40001', 'offset', 'address', 'function code'],
    fields: [
      {
        kind: 'select',
        key: 'direction',
        label: 'Convert',
        options: [
          { value: 'traditional', label: 'Traditional data model number to protocol address' },
          { value: 'protocol', label: 'Protocol address to traditional number' },
        ],
        default: 'traditional',
      },
      { kind: 'number', key: 'value', label: 'Register', default: 40010, min: 0, step: 1 },
      {
        kind: 'select',
        key: 'table',
        label: 'Data table (for protocol to traditional)',
        options: [
          { value: '4', label: 'Holding registers (4x, read/write)' },
          { value: '3', label: 'Input registers (3x, read only)' },
          { value: '1', label: 'Coils (0x, read/write bits)' },
          { value: '2', label: 'Discrete inputs (1x, read only bits)' },
        ],
        default: '4',
      },
    ],
    run: (v) => {
      const direction = str(v.direction, 'traditional');
      const value = Math.round(num(v.value, 0));

      const tables: Record<string, { base: number; name: string; read: string; write: string }> = {
        '1': { base: 1, name: 'Coils (0x)', read: '01 Read Coils', write: '05 / 15 Write Coil(s)' },
        '2': { base: 10001, name: 'Discrete Inputs (1x)', read: '02 Read Discrete Inputs', write: 'read only' },
        '3': { base: 30001, name: 'Input Registers (3x)', read: '04 Read Input Registers', write: 'read only' },
        '4': { base: 40001, name: 'Holding Registers (4x)', read: '03 Read Holding Registers', write: '06 / 16 Write Register(s)' },
      };

      let traditional: number;
      let protocol: number;
      let table = tables[str(v.table, '4')]!;

      if (direction === 'traditional') {
        traditional = value;
        const detected =
          value >= 40001 ? tables['4']! : value >= 30001 ? tables['3']! : value >= 10001 ? tables['2']! : tables['1']!;
        table = detected;
        protocol = value - detected.base;
      } else {
        protocol = value;
        traditional = value + table.base;
      }

      if (protocol < 0 || protocol > 65535) {
        return {
          outputs: [],
          error: `That resolves to protocol address ${protocol}, which is outside the valid range of 0 to 65535.`,
        };
      }

      return {
        outputs: [
          { label: 'Protocol address (on the wire)', value: String(protocol), emphasis: true },
          { label: 'Traditional data model number', value: String(traditional), emphasis: true },
          { label: 'Data table', value: table.name },
          { label: 'Read function code', value: table.read },
          { label: 'Write function code', value: table.write },
          { label: 'Protocol address in hex', value: `0x${protocol.toString(16).toUpperCase().padStart(4, '0')}` },
          {
            label: 'Next register (for a 32-bit value)',
            value: `${protocol + 1} protocol, ${traditional + 1} traditional`,
            note: 'A 32-bit value occupies this register and the next one. Word order is not defined by the standard.',
          },
        ],
        steps: [
          `${table.name} base is ${table.base} in the traditional model`,
          direction === 'traditional'
            ? `Protocol address = ${traditional} - ${table.base} = ${protocol}`
            : `Traditional number = ${protocol} + ${table.base} = ${traditional}`,
        ],
        warnings: [
          'Device documentation frequently fails to say which convention it is using. If a value is close but consistently belongs to the neighbouring point in the map, you are off by one.',
          'Some devices document a base of 40000 rather than 40001, which shifts everything by one again. Prove the map with a Modbus test utility before writing controller logic.',
          'A 32-bit value spans two consecutive registers and the standard does not define which comes first. Read a known value to determine the order.',
        ],
      };
    },
    assumptions: [
      'The traditional data model bases of 1, 10001, 30001, and 40001.',
      'Does not cover devices that document a 40000 base or use vendor-specific addressing.',
    ],
    standards: ['Modbus application protocol specification'],
    related: ['/controls/plc-systems/communications/modbus-rtu', '/controls/plc-systems/communications/modbus-tcp'],
    relatedCalculators: ['ieee-754-float', 'modbus-poll-time', 'number-base-converter'],
    faqs: [
      {
        q: 'Is 40001 the same as address 0?',
        a: 'Yes, in the traditional data model. Holding registers are numbered from 40001 in documentation, while the address placed on the wire starts at 0.',
      },
      {
        q: 'What is an illegal data address exception?',
        a: 'Exception code 02. The device heard the request and understood it, but the register or the block extends past the end of its map. That is good news compared with silence, because it proves the wiring, address, and framing are all correct.',
      },
    ],
  },

  {
    slug: 'modbus-poll-time',
    title: 'Modbus Serial Poll Time',
    category: 'PLC & Data',
    summary:
      'How long a Modbus RTU transaction takes at a given baud rate, and how many devices a serial bus can poll within a required update period.',
    answer:
      'A Modbus RTU transaction takes the time to transmit the request, the device response time, the time to transmit the reply, and the required silent interval of at least 3.5 character times. At 9600 baud each character is about 1.15 milliseconds, so a bus with many devices can easily fail to meet a one-second update requirement.',
    keywords: ['modbus', 'poll time', 'baud rate', 'RS-485', 'scan', 'serial'],
    fields: [
      {
        kind: 'select',
        key: 'baud',
        label: 'Baud rate',
        options: [
          { value: '9600', label: '9600' },
          { value: '19200', label: '19200' },
          { value: '38400', label: '38400' },
          { value: '57600', label: '57600' },
          { value: '115200', label: '115200' },
        ],
        default: '9600',
      },
      { kind: 'number', key: 'registers', label: 'Registers read per request', default: 20, min: 1, max: 125 },
      { kind: 'number', key: 'devices', label: 'Devices on the bus', default: 8, min: 1, max: 100 },
      { kind: 'number', key: 'responseTime', label: 'Device response time', unit: 'ms', default: 20, min: 0, help: 'Time the device takes to answer. Field devices are often much slower than expected.' },
      { kind: 'number', key: 'required', label: 'Required update period', unit: 's', default: 1, min: 0.05, step: 0.05 },
    ],
    run: (v) => {
      const baud = Number(str(v.baud, '9600'));
      const registers = Math.round(num(v.registers, 20));
      const devices = Math.round(num(v.devices, 1));
      const responseTime = num(v.responseTime, 20);
      const required = num(v.required, 1);

      // 8 data bits plus start, parity and stop is 11 bits per character in the
      // usual Modbus RTU framing.
      const bitsPerChar = 11;
      const charMs = (bitsPerChar / baud) * 1000;

      const requestBytes = 8; // address, function, start hi/lo, count hi/lo, CRC hi/lo
      const responseBytes = 5 + registers * 2; // address, function, byte count, data, CRC
      const silentMs = charMs * 3.5;

      const perTransaction = requestBytes * charMs + responseTime + responseBytes * charMs + silentMs;
      const cycleMs = perTransaction * devices;
      const cycleS = cycleMs / 1000;
      const meets = cycleS <= required;
      const maxDevices = Math.floor((required * 1000) / perTransaction);

      return {
        outputs: [
          { label: 'Time per transaction', value: fmt(perTransaction, 1), unit: 'ms', emphasis: true },
          {
            label: 'Full poll cycle',
            value: cycleS >= 1 ? `${fmt(cycleS, 2)} s` : `${fmt(cycleMs, 0)} ms`,
            emphasis: true,
            status: meets ? 'ok' : 'over',
            note: `${devices} device${devices === 1 ? '' : 's'}`,
          },
          {
            label: 'Meets your update requirement',
            value: meets ? 'Yes' : 'No',
            status: meets ? 'ok' : 'over',
            note: `${fmt(cycleS, 2)} s cycle against a ${fmt(required, 2)} s requirement`,
          },
          {
            label: 'Devices that fit the requirement',
            value: String(Math.max(0, maxDevices)),
            note: 'At this baud rate, register count, and response time',
          },
          { label: 'Character time', value: fmt(charMs, 3), unit: 'ms', note: `${bitsPerChar} bits per character at ${baud} baud` },
          { label: 'Required silent interval', value: fmt(silentMs, 2), unit: 'ms', note: '3.5 character times' },
          { label: 'Response frame size', value: `${responseBytes} bytes`, note: `${registers} registers` },
        ],
        steps: [
          `Character time = ${bitsPerChar} bits / ${baud} baud = ${fmt(charMs, 3)} ms`,
          `Request = ${requestBytes} bytes x ${fmt(charMs, 3)} ms = ${fmt(requestBytes * charMs, 2)} ms`,
          `Response = ${responseBytes} bytes x ${fmt(charMs, 3)} ms = ${fmt(responseBytes * charMs, 2)} ms`,
          `Per transaction = request + ${fmt(responseTime, 0)} ms device time + response + ${fmt(silentMs, 2)} ms silence = ${fmt(perTransaction, 1)} ms`,
          `Cycle = ${fmt(perTransaction, 1)} ms x ${devices} devices = ${fmt(cycleMs, 0)} ms`,
        ],
        warnings: [
          'Device response time is usually the dominant term and is the one people guess at. Measure it rather than assuming, because field devices are often far slower than their datasheets suggest.',
          'This assumes no retries. A single timeout on a slow device can add its full timeout period to every cycle, which is why one marginal device slows an entire bus.',
          'Reading contiguous blocks is far cheaper than reading individual registers. One request for twenty registers costs a fraction of twenty separate requests.',
          'Polling faster than the process changes wastes bus capacity and increases the error rate without improving anything an operator can use.',
        ],
      };
    },
    formulas: [
      { expr: 'character time = 11 bits / baud rate' },
      { expr: 'transaction = request bytes + device response + reply bytes + 3.5 character silence' },
    ],
    assumptions: [
      '11 bits per character, the usual Modbus RTU framing with one start bit, eight data bits, parity, and one stop bit.',
      'Function code 03 with a contiguous block read.',
      'No retries, no collisions, and a healthy bus.',
    ],
    standards: ['Modbus over serial line specification'],
    related: ['/controls/plc-systems/communications/modbus-rtu', '/troubleshooting/communications-troubleshooting/modbus-device-intermittently-offline'],
    relatedCalculators: ['modbus-register-address', 'historian-storage'],
    faqs: [
      {
        q: 'Why is my Modbus bus so slow?',
        a: 'Usually device response time and per-register polling rather than the baud rate. Read contiguous blocks, measure the actual response time of each device, and check whether one slow device is timing out on every cycle.',
      },
    ],
  },

  {
    slug: 'data-size-converter',
    title: 'Data Size Converter',
    category: 'PLC & Data',
    summary:
      'Convert between bytes, kilobytes, megabytes, and gigabytes in both the decimal and binary conventions, which differ by a growing margin.',
    answer:
      'Storage is quoted in two conventions. Decimal units use powers of 1000, so a megabyte is 1,000,000 bytes. Binary units use powers of 1024, so a mebibyte is 1,048,576 bytes. The gap grows with size: a decimal terabyte is about 9% smaller than a tebibyte, which is why a drive sold as 1 TB shows as roughly 931 GB.',
    keywords: ['data size', 'bytes', 'megabyte', 'gibibyte', 'storage', 'conversion'],
    fields: [
      { kind: 'number', key: 'value', label: 'Amount', default: 1, min: 0, step: 0.001 },
      {
        kind: 'select',
        key: 'unit',
        label: 'Unit',
        options: [
          { value: 'B', label: 'Bytes' },
          { value: 'KB', label: 'Kilobytes (1000)' },
          { value: 'MB', label: 'Megabytes (1000)' },
          { value: 'GB', label: 'Gigabytes (1000)' },
          { value: 'TB', label: 'Terabytes (1000)' },
          { value: 'KiB', label: 'Kibibytes (1024)' },
          { value: 'MiB', label: 'Mebibytes (1024)' },
          { value: 'GiB', label: 'Gibibytes (1024)' },
          { value: 'TiB', label: 'Tebibytes (1024)' },
        ],
        default: 'GB',
      },
    ],
    run: (v) => {
      const value = num(v.value, 0);
      const unit = str(v.unit, 'GB');

      const factors: Record<string, number> = {
        B: 1,
        KB: 1e3,
        MB: 1e6,
        GB: 1e9,
        TB: 1e12,
        KiB: 1024,
        MiB: 1024 ** 2,
        GiB: 1024 ** 3,
        TiB: 1024 ** 4,
      };

      const bytes = value * (factors[unit] ?? 1);
      if (!Number.isFinite(bytes) || bytes < 0) return { outputs: [], error: 'Enter a value of zero or more.' };

      const bits = bytes * 8;

      return {
        outputs: [
          { label: 'Bytes', value: bytes.toLocaleString('en-US', { maximumFractionDigits: 0 }), emphasis: true },
          { label: 'Bits', value: bits.toLocaleString('en-US', { maximumFractionDigits: 0 }) },
          { label: 'Kilobytes (1000)', value: sig(bytes / 1e3, 6), unit: 'KB' },
          { label: 'Megabytes (1000)', value: sig(bytes / 1e6, 6), unit: 'MB' },
          { label: 'Gigabytes (1000)', value: sig(bytes / 1e9, 6), unit: 'GB' },
          { label: 'Terabytes (1000)', value: sig(bytes / 1e12, 6), unit: 'TB' },
          { label: 'Kibibytes (1024)', value: sig(bytes / 1024, 6), unit: 'KiB' },
          { label: 'Mebibytes (1024)', value: sig(bytes / 1024 ** 2, 6), unit: 'MiB' },
          { label: 'Gibibytes (1024)', value: sig(bytes / 1024 ** 3, 6), unit: 'GiB' },
          { label: 'Tebibytes (1024)', value: sig(bytes / 1024 ** 4, 6), unit: 'TiB' },
          {
            label: 'Modbus registers to hold this',
            value: Math.ceil(bytes / 2).toLocaleString('en-US'),
            note: 'At 2 bytes per 16-bit register',
          },
        ],
        steps: [`${fmt(value, 4)} ${unit} = ${bytes.toLocaleString('en-US', { maximumFractionDigits: 0 })} bytes`],
        warnings: [
          'Storage vendors quote decimal units and operating systems commonly report binary units, which is why a drive sold as 1 TB appears as about 931 GB.',
          'Network throughput is quoted in bits per second, not bytes. A 100 Mbps link moves at most about 12.5 megabytes per second before protocol overhead.',
        ],
      };
    },
    assumptions: ['Decimal units are powers of 1000 and binary units are powers of 1024, per IEC 80000-13.'],
    relatedCalculators: ['historian-storage', 'network-bandwidth'],
    faqs: [
      {
        q: 'Which convention should I use for a historian estimate?',
        a: 'Estimate in bytes, then convert once at the end. Mixing conventions midway through a sizing exercise is where the error creeps in.',
      },
    ],
  },

  {
    slug: 'historian-storage',
    title: 'Historian Storage Sizing',
    category: 'PLC & Data',
    summary:
      'Storage a process historian will consume from tag count, sample rate, retention, and compression, with the daily and annual growth.',
    answer:
      'Historian storage is tag count multiplied by samples per day, multiplied by bytes per sample, multiplied by retention days. Compression, which stores a value only when it changes by more than a configured deadband, typically reduces this substantially, but setting it aggressively erases the short excursions that matter most in an investigation.',
    keywords: ['historian', 'storage', 'sizing', 'SCADA', 'retention', 'compression'],
    fields: [
      { kind: 'number', key: 'tags', label: 'Tags being historized', default: 2000, min: 1 },
      { kind: 'number', key: 'intervalSec', label: 'Sample interval', unit: 's', default: 5, min: 0.1, step: 0.1 },
      { kind: 'number', key: 'bytesPerSample', label: 'Bytes per sample', default: 12, min: 1, help: 'Timestamp, value, and quality. Commonly 8 to 16 bytes depending on the product.' },
      { kind: 'number', key: 'retentionDays', label: 'Retention', unit: 'days', default: 1825, min: 1, help: '1825 days is five years, a common regulatory retention.' },
      { kind: 'number', key: 'compression', label: 'Compression ratio', default: 5, min: 1, max: 100, step: 0.5, help: 'How many raw samples are stored as one, on average. Highly process dependent.' },
      { kind: 'number', key: 'overhead', label: 'Index and overhead', unit: '%', default: 20, min: 0, max: 200, step: 5 },
    ],
    run: (v) => {
      const tags = num(v.tags, 1);
      const intervalSec = num(v.intervalSec, 5);
      const bytesPerSample = num(v.bytesPerSample, 12);
      const retentionDays = num(v.retentionDays, 365);
      const compression = Math.max(1, num(v.compression, 1));
      const overhead = num(v.overhead, 0) / 100;

      if (intervalSec <= 0) return { outputs: [], error: 'The sample interval must be greater than zero.' };

      const samplesPerTagPerDay = 86400 / intervalSec;
      const rawBytesPerDay = tags * samplesPerTagPerDay * bytesPerSample;
      const storedBytesPerDay = (rawBytesPerDay / compression) * (1 + overhead);
      const totalBytes = storedBytesPerDay * retentionDays;

      const gb = (b: number) => b / 1e9;

      return {
        outputs: [
          {
            label: 'Storage for the retention period',
            value: gb(totalBytes) >= 1000 ? `${fmt(gb(totalBytes) / 1000, 2)} TB` : `${fmt(gb(totalBytes), 1)} GB`,
            emphasis: true,
            note: `${fmt(retentionDays, 0)} days`,
          },
          { label: 'Per day', value: `${fmt(storedBytesPerDay / 1e6, 1)} MB`, emphasis: true },
          { label: 'Per year', value: `${fmt(gb(storedBytesPerDay * 365), 1)} GB` },
          { label: 'Raw data rate before compression', value: `${fmt(rawBytesPerDay / 1e6, 1)} MB per day` },
          { label: 'Samples per tag per day', value: fmt(samplesPerTagPerDay, 0) },
          { label: 'Total samples per day', value: (tags * samplesPerTagPerDay).toLocaleString('en-US', { maximumFractionDigits: 0 }) },
          {
            label: 'Sustained write rate',
            value: fmt((tags * samplesPerTagPerDay) / 86400, 0),
            unit: 'samples per second',
            note: 'Averaged. Bursts during an upset are far higher.',
          },
        ],
        steps: [
          `Samples per tag per day = 86400 s / ${fmt(intervalSec, 2)} s = ${fmt(samplesPerTagPerDay, 0)}`,
          `Raw per day = ${fmt(tags, 0)} tags x ${fmt(samplesPerTagPerDay, 0)} x ${fmt(bytesPerSample, 0)} bytes = ${fmt(rawBytesPerDay / 1e6, 1)} MB`,
          `After ${fmt(compression, 1)}:1 compression and ${fmt(overhead * 100, 0)}% overhead = ${fmt(storedBytesPerDay / 1e6, 1)} MB per day`,
          `Over ${fmt(retentionDays, 0)} days = ${fmt(gb(totalBytes), 1)} GB`,
        ],
        warnings: [
          'Compression ratio is highly process dependent and is the least reliable input here. A steady analog compresses well; a noisy one barely compresses at all. Measure it on a pilot rather than assuming.',
          'Set compression to protect the excursions that matter. Aggressive deadbands erase the short events an investigation depends on, and that loss is permanent.',
          'Size for burst write rate, not the average. During an upset, alarm and event traffic can be orders of magnitude above steady state.',
          'Backup, replication, and any archive copies multiply this figure. Plan for the total footprint rather than the primary store alone.',
        ],
      };
    },
    formulas: [
      { expr: 'bytes = tags x (86400 / interval) x bytes_per_sample x days / compression x (1 + overhead)' },
    ],
    assumptions: [
      'Uniform sample interval across all tags, which is rarely true in practice.',
      'A single flat compression ratio, where real historians compress each tag differently.',
      'Does not include backups, replicas, or archive copies.',
    ],
    related: ['/controls/scada-hmi/historian-data/historian-architecture', '/controls/scada-hmi/historian-data/compression'],
    relatedCalculators: ['data-size-converter', 'network-bandwidth'],
    faqs: [
      {
        q: 'What compression ratio should I assume?',
        a: 'Do not assume one. Historize a representative sample of real tags for a week and measure it. Ratios between 3:1 and 20:1 are all common depending on how noisy the process signals are.',
      },
    ],
  },
];
