import {
  MOTOR_FLC_3PH,
  MOTOR_VOLTAGE_INDEX,
  largestOcpdNotExceeding,
  nextStandardOcpd,
} from '../reference-data';
import { fmt, num, pct, str, type Calculator, type FieldOption } from '../calc-types';

const hpOptions: FieldOption[] = Object.keys(MOTOR_FLC_3PH).map((hp) => ({
  value: hp,
  label: `${hp} hp`,
}));

const motorVoltageOptions: FieldOption[] = [
  { value: '200', label: '200 V' },
  { value: '208', label: '208 V' },
  { value: '230', label: '230 V' },
  { value: '460', label: '460 V' },
  { value: '575', label: '575 V' },
];

export const PANEL_CALCULATORS: Calculator[] = [
  {
    slug: 'motor-branch-circuit',
    title: 'Motor Branch Circuit Sizing',
    category: 'Control Panels',
    summary:
      'Conductor, overload, short-circuit protection, and disconnect sizing for a three-phase motor branch circuit, from the code full-load current rather than the nameplate.',
    answer:
      'A motor branch circuit is sized from the full-load current in NEC Table 430.250, not from the motor nameplate. Conductors are sized at 125% of that value, the short-circuit and ground-fault device is sized from the Table 430.52 percentage for the device type, and the disconnect is rated at least 115% of the full-load current. Overload protection is the one element sized from the nameplate.',
    keywords: ['motor', 'branch circuit', '430.52', 'FLC', 'overload', 'breaker sizing'],
    fields: [
      { kind: 'select', key: 'hp', label: 'Motor horsepower', options: hpOptions, default: '10' },
      { kind: 'select', key: 'voltage', label: 'System voltage', options: motorVoltageOptions, default: '460' },
      {
        kind: 'number',
        key: 'flcOverride',
        label: 'Full-load current override',
        unit: 'A',
        default: 0,
        min: 0,
        help: 'Leave at zero to use the Table 430.250 value. Enter your own figure if your code book differs, and always confirm the value used below.',
      },
      {
        kind: 'select',
        key: 'device',
        label: 'Short-circuit protective device',
        options: [
          { value: 'inverse', label: 'Inverse time circuit breaker (250%)' },
          { value: 'dual', label: 'Dual-element time-delay fuse (175%)' },
          { value: 'nontime', label: 'Non-time-delay fuse (300%)' },
          { value: 'instantaneous', label: 'Instantaneous trip breaker (800%)' },
        ],
        default: 'inverse',
      },
      {
        kind: 'number',
        key: 'nameplate',
        label: 'Nameplate full-load amperes',
        unit: 'A',
        default: 13.5,
        min: 0,
        help: 'Overload protection is sized from the nameplate, not from the code table.',
      },
      {
        kind: 'select',
        key: 'serviceFactor',
        label: 'Service factor / temperature rise',
        options: [
          { value: '125', label: 'SF 1.15 or greater, or 40 C rise (125%)' },
          { value: '115', label: 'All other motors (115%)' },
        ],
        default: '125',
      },
    ],
    run: (v) => {
      const hp = str(v.hp, '10');
      const voltage = str(v.voltage, '460');
      const row = MOTOR_FLC_3PH[hp];
      const index = MOTOR_VOLTAGE_INDEX[voltage];
      if (!row || index === undefined) return { outputs: [], error: 'Select a horsepower and voltage.' };

      const tableFlc = row[index];
      const override = num(v.flcOverride, 0);
      const flc = override > 0 ? override : tableFlc;
      const usingOverride = override > 0;

      const device = str(v.device, 'inverse');
      const percentages: Record<string, number> = {
        inverse: 250,
        dual: 175,
        nontime: 300,
        instantaneous: 800,
      };
      const deviceLabels: Record<string, string> = {
        inverse: 'Inverse time circuit breaker',
        dual: 'Dual-element time-delay fuse',
        nontime: 'Non-time-delay fuse',
        instantaneous: 'Instantaneous trip breaker',
      };
      const percent = percentages[device] ?? 250;

      const conductorAmps = flc * 1.25;
      const scgfRaw = flc * (percent / 100);
      const scgfStandard = largestOcpdNotExceeding(scgfRaw);
      const scgfNextUp = nextStandardOcpd(scgfRaw);
      const disconnect = flc * 1.15;

      const nameplate = num(v.nameplate, 0);
      const overloadPct = Number(str(v.serviceFactor, '125'));
      const overload = nameplate > 0 ? nameplate * (overloadPct / 100) : 0;

      return {
        outputs: [
          {
            label: 'Full-load current used',
            value: fmt(flc, 1),
            unit: 'A',
            emphasis: true,
            note: usingOverride
              ? 'Your override. The Table 430.250 value is shown below for comparison.'
              : `Table 430.250, ${hp} hp at ${voltage} V. Confirm against your own code book.`,
          },
          ...(usingOverride
            ? [{ label: 'Table 430.250 value', value: `${fmt(tableFlc, 1)} A`, note: 'Differs from your override' }]
            : []),
          {
            label: 'Minimum conductor ampacity',
            value: fmt(conductorAmps, 1),
            unit: 'A',
            emphasis: true,
            note: '125% of full-load current, per 430.22',
          },
          {
            label: `${deviceLabels[device]} maximum`,
            value: `${scgfStandard} A`,
            note: `${percent}% of ${fmt(flc, 1)} A is ${fmt(scgfRaw, 1)} A. Largest standard size not exceeding that is ${scgfStandard} A.`,
          },
          {
            label: 'Next standard size up',
            value: `${scgfNextUp} A`,
            note: '430.52(C)(1) Exception 1 permits the next higher standard size when the calculated value does not correspond to a standard rating.',
          },
          { label: 'Minimum disconnect rating', value: fmt(disconnect, 1), unit: 'A', note: '115% of full-load current, per 430.110' },
          ...(overload > 0
            ? [
                {
                  label: 'Overload device maximum',
                  value: fmt(overload, 2),
                  unit: 'A',
                  note: `${overloadPct}% of the ${fmt(nameplate, 1)} A nameplate, per 430.32`,
                },
              ]
            : []),
        ],
        steps: [
          `Full-load current = ${fmt(flc, 1)} A ${usingOverride ? '(your override)' : '(Table 430.250)'}`,
          `Conductor = ${fmt(flc, 1)} x 1.25 = ${fmt(conductorAmps, 1)} A minimum ampacity`,
          `Short-circuit device = ${fmt(flc, 1)} x ${percent}% = ${fmt(scgfRaw, 1)} A, standard size ${scgfStandard} A`,
          `Disconnect = ${fmt(flc, 1)} x 1.15 = ${fmt(disconnect, 1)} A`,
          ...(overload > 0
            ? [`Overload = ${fmt(nameplate, 1)} A nameplate x ${overloadPct}% = ${fmt(overload, 2)} A`]
            : []),
        ],
        warnings: [
          'Overload protection is sized from the motor nameplate current. Everything else is sized from the code table value. Mixing the two up is the most common error in motor circuit sizing.',
          'The Table 430.52 percentages shown are the general values for a squirrel-cage AC motor. Design B energy-efficient motors, wound-rotor motors, direct-current motors, and synchronous motors use different percentages.',
          'If the motor will not start on the calculated device, 430.52(C)(1) Exception 2 permits specific increases. That is a documented exception, not a free hand to increase the size.',
          'Conductor ampacity still has to survive ambient temperature correction and the adjustment for conductor count, and cannot exceed the termination temperature rating.',
          'This covers a single motor on a branch circuit. Feeders serving several motors, and circuits with additional loads, follow different rules in 430 Part IV.',
        ],
      };
    },
    formulas: [
      { expr: 'Conductor ampacity = FLC x 1.25' },
      { expr: 'Short-circuit device = FLC x Table 430.52 percentage' },
      { expr: 'Disconnect = FLC x 1.15' },
      { expr: 'Overload = nameplate FLA x 1.15 or 1.25' },
    ],
    assumptions: [
      'Single continuous-duty three-phase squirrel-cage motor on its own branch circuit.',
      'Full-load current from Table 430.250 as commonly published. Verify against your adopted edition.',
      'Does not apply the Design B energy-efficient motor percentages or the wound-rotor, DC, and synchronous motor rows.',
      'Does not size feeders, tap conductors, or circuits with combined loads.',
    ],
    standards: ['NFPA 70 (NEC) Article 430, Table 430.250, Table 430.52, 430.22, 430.32, 430.110'],
    related: ['/controls/control-panels/pump-panels/lead-lag', '/controls/control-panels/panel-design/ul-508a'],
    relatedCalculators: ['conductor-ampacity', 'transformer-sizing', 'three-phase-power'],
    faqs: [
      {
        q: 'Why does the code use a table value instead of the nameplate?',
        a: 'So that conductors and protective devices are sized consistently and are not undersized when a motor is later replaced with one of the same horsepower but a different nameplate current. Overload protection is the exception and uses the nameplate, because it is protecting that specific motor.',
      },
      {
        q: 'Can I round the breaker up to the next standard size?',
        a: '430.52(C)(1) Exception 1 permits the next higher standard rating when the calculated value does not correspond to a standard size. Going beyond that requires one of the specific exceptions, and only when the motor will not start.',
      },
    ],
  },

  {
    slug: 'transformer-sizing',
    title: 'Transformer Sizing and Full-Load Current',
    category: 'Control Panels',
    summary:
      'Primary and secondary full-load current for a transformer, plus the approximate available fault current at the secondary from the impedance.',
    answer:
      'Transformer full-load current is the kVA rating multiplied by 1000, divided by the voltage, and divided again by 1.732 for a three-phase transformer. Approximate available fault current at the secondary is the secondary full-load current divided by the per-unit impedance, which assumes an infinite primary source and therefore gives a conservatively high figure.',
    keywords: ['transformer', 'kVA', 'full load current', 'fault current', 'impedance', 'SCCR'],
    fields: [
      { kind: 'select', key: 'phase', label: 'Transformer', options: [
        { value: '3', label: 'Three phase' },
        { value: '1', label: 'Single phase' },
      ], default: '3' },
      { kind: 'number', key: 'kva', label: 'Transformer rating', unit: 'kVA', default: 45, min: 0.05 },
      { kind: 'number', key: 'primary', label: 'Primary voltage', unit: 'V', default: 480, min: 1 },
      { kind: 'number', key: 'secondary', label: 'Secondary voltage', unit: 'V', default: 208, min: 1 },
      {
        kind: 'number',
        key: 'impedance',
        label: 'Nameplate impedance',
        unit: '%',
        default: 5,
        min: 0.5,
        max: 20,
        step: 0.1,
        help: 'From the transformer nameplate. A lower impedance produces a higher available fault current.',
      },
    ],
    run: (v) => {
      const phase = str(v.phase, '3');
      const kva = num(v.kva);
      const primary = num(v.primary);
      const secondary = num(v.secondary);
      const impedance = num(v.impedance, 5);

      if (kva <= 0 || primary <= 0 || secondary <= 0) {
        return { outputs: [], error: 'Rating and both voltages must be greater than zero.' };
      }
      if (impedance <= 0) return { outputs: [], error: 'Impedance must be greater than zero.' };

      const constant = phase === '3' ? Math.sqrt(3) : 1;
      const primaryFla = (kva * 1000) / (constant * primary);
      const secondaryFla = (kva * 1000) / (constant * secondary);
      const faultCurrent = secondaryFla / (impedance / 100);

      return {
        outputs: [
          { label: 'Primary full-load current', value: fmt(primaryFla, 1), unit: 'A', emphasis: true },
          { label: 'Secondary full-load current', value: fmt(secondaryFla, 1), unit: 'A', emphasis: true },
          {
            label: 'Approximate available fault current at the secondary',
            value: fmt(faultCurrent, 0),
            unit: 'A',
            status: 'caution',
            note: 'Assumes an infinite primary source, so the real figure will be lower. Use it as a conservative upper bound for SCCR, not as a study result.',
          },
          {
            label: 'Approximate fault current',
            value: fmt(faultCurrent / 1000, 1),
            unit: 'kA',
          },
        ],
        steps: [
          `Constant = ${phase === '3' ? '1.732 (three phase)' : '1 (single phase)'}`,
          `Primary FLA = ${fmt(kva, 2)} kVA x 1000 / (${fmt(constant, 3)} x ${fmt(primary, 0)} V) = ${fmt(primaryFla, 1)} A`,
          `Secondary FLA = ${fmt(kva, 2)} kVA x 1000 / (${fmt(constant, 3)} x ${fmt(secondary, 0)} V) = ${fmt(secondaryFla, 1)} A`,
          `Fault current = ${fmt(secondaryFla, 1)} A / ${fmt(impedance / 100, 4)} = ${fmt(faultCurrent, 0)} A`,
        ],
        warnings: [
          'The fault current figure assumes an infinite primary source and ignores primary and conductor impedance. It is deliberately conservative. A real short-circuit study accounts for the utility contribution, conductor impedance, and motor contribution, and produces a lower number.',
          'Do not use this figure to justify a panel short-circuit current rating without a proper study. NEC 409.110 requires the panel to be marked with an SCCR, and 110.24 requires the available fault current at the service to be documented.',
          'Transformer secondary conductor and overcurrent protection rules are in Article 450 and 240.21(C), and are not covered here.',
        ],
      };
    },
    formulas: [
      { expr: 'FLA = (kVA x 1000) / (1.732 x V)  for three phase' },
      { expr: 'FLA = (kVA x 1000) / V  for single phase' },
      { expr: 'I_fault = FLA_secondary / (%Z / 100)' },
    ],
    assumptions: [
      'Fault current assumes an infinite primary source, which overstates the real value.',
      'Ignores conductor impedance between the transformer and the point of interest.',
      'Ignores motor contribution to fault current, which adds to the total during the first cycles.',
    ],
    standards: ['NFPA 70 (NEC) Article 450, 240.21(C), 110.24, 409.110'],
    related: ['/controls/control-panels/panel-design/sccr'],
    relatedCalculators: ['motor-branch-circuit', 'three-phase-power'],
    faqs: [
      {
        q: 'Is this a short-circuit study?',
        a: 'No. It is a conservative first-pass estimate. A study accounts for the utility source, conductor impedance, and motor contribution, and is what an engineer seals when one is required.',
      },
      {
        q: 'Why does lower impedance mean higher fault current?',
        a: 'Impedance is what limits current during a fault. A 4% transformer lets through more fault current than a 6% transformer of the same rating, which is why the nameplate impedance matters for equipment ratings.',
      },
    ],
  },

  {
    slug: 'enclosure-heat-load',
    title: 'Control Panel Heat Load and Temperature Rise',
    category: 'Control Panels',
    summary:
      'Internal temperature rise for a control enclosure from component heat, solar gain, and enclosure surface area, with the cooling shortfall if any.',
    answer:
      'Enclosure temperature rise is the total internal heat load divided by the product of the effective surface area and the heat transfer coefficient. For a painted steel enclosure in still air, a coefficient of roughly 5.5 watts per square metre per degree C is commonly used. Solar gain on an outdoor enclosure is frequently the largest single term and is regularly left out.',
    keywords: ['enclosure', 'heat load', 'panel cooling', 'temperature rise', 'thermal'],
    fields: [
      { kind: 'number', key: 'height', label: 'Enclosure height', unit: 'in', default: 36, min: 4 },
      { kind: 'number', key: 'width', label: 'Enclosure width', unit: 'in', default: 30, min: 4 },
      { kind: 'number', key: 'depth', label: 'Enclosure depth', unit: 'in', default: 12, min: 3 },
      {
        kind: 'select',
        key: 'mounting',
        label: 'Mounting',
        options: [
          { value: 'wall', label: 'Wall mounted (back not effective)' },
          { value: 'free', label: 'Free standing (all six surfaces)' },
        ],
        default: 'wall',
      },
      { kind: 'number', key: 'watts', label: 'Internal heat load', unit: 'W', default: 250, min: 0, help: 'Sum the dissipation of every component from its datasheet. Drives and power supplies dominate.' },
      { kind: 'number', key: 'solar', label: 'Solar gain', unit: 'W', default: 0, min: 0, help: 'Outdoor enclosures in direct sun. Often larger than the component load.' },
      { kind: 'number', key: 'ambient', label: 'Maximum ambient', unit: 'C', default: 35, min: -20, max: 60 },
      { kind: 'number', key: 'maxInternal', label: 'Maximum allowable internal temperature', unit: 'C', default: 50, min: 20, max: 80, help: 'Usually set by the lowest-rated component, often the controller or a drive.' },
      { kind: 'number', key: 'coefficient', label: 'Heat transfer coefficient', unit: 'W/m2/C', default: 5.5, min: 1, max: 20, step: 0.1, help: 'About 5.5 for painted steel in still air. Use the enclosure manufacturer figure where you have it.' },
    ],
    run: (v) => {
      const h = num(v.height) * 0.0254;
      const w = num(v.width) * 0.0254;
      const d = num(v.depth) * 0.0254;
      const mounting = str(v.mounting, 'wall');
      const watts = num(v.watts, 0);
      const solar = num(v.solar, 0);
      const ambient = num(v.ambient, 35);
      const maxInternal = num(v.maxInternal, 50);
      const coefficient = num(v.coefficient, 5.5);

      if (h <= 0 || w <= 0 || d <= 0) return { outputs: [], error: 'Enclosure dimensions must be greater than zero.' };
      if (maxInternal <= ambient) {
        return { outputs: [], error: 'The allowable internal temperature must be above the ambient temperature.' };
      }

      // Wall mounted: the back surface transfers almost nothing.
      const area =
        mounting === 'free'
          ? 2 * (h * w + h * d + w * d)
          : 2 * (h * d + w * d) + h * w + w * d;
      const areaFt2 = area * 10.7639;

      const totalWatts = watts + solar;
      const rise = totalWatts / (area * coefficient);
      const internal = ambient + rise;
      const allowableRise = maxInternal - ambient;
      const capacity = area * coefficient * allowableRise;
      const shortfall = totalWatts - capacity;

      const ok = internal <= maxInternal;

      return {
        outputs: [
          {
            label: 'Predicted internal temperature',
            value: fmt(internal, 1),
            unit: 'C',
            emphasis: true,
            status: ok ? 'ok' : 'over',
            note: `${fmt(ambient, 0)} C ambient plus ${fmt(rise, 1)} C rise`,
          },
          { label: 'Temperature rise', value: fmt(rise, 1), unit: 'C' },
          { label: 'Effective surface area', value: fmt(area, 3), unit: 'm2', note: `${fmt(areaFt2, 1)} sq ft` },
          { label: 'Passive dissipation available', value: fmt(capacity, 0), unit: 'W', note: `At a ${fmt(allowableRise, 1)} C allowable rise` },
          {
            label: shortfall > 0 ? 'Cooling required' : 'Passive margin',
            value: fmt(Math.abs(shortfall), 0),
            unit: 'W',
            status: shortfall > 0 ? 'over' : 'ok',
            note:
              shortfall > 0
                ? 'The enclosure cannot shed this passively. A filtered fan, a vortex cooler, or an air conditioner is needed.'
                : 'Passive dissipation is sufficient at the stated conditions.',
          },
          { label: 'Predicted internal temperature', value: fmt(internal * 1.8 + 32, 1), unit: 'F' },
        ],
        steps: [
          `Effective area = ${fmt(area, 3)} m2 (${fmt(areaFt2, 1)} sq ft), ${mounting === 'free' ? 'all six surfaces' : 'back surface excluded'}`,
          `Total heat = ${fmt(watts, 0)} W components + ${fmt(solar, 0)} W solar = ${fmt(totalWatts, 0)} W`,
          `Rise = ${fmt(totalWatts, 0)} W / (${fmt(area, 3)} m2 x ${fmt(coefficient, 1)} W/m2/C) = ${fmt(rise, 1)} C`,
          `Internal = ${fmt(ambient, 0)} C + ${fmt(rise, 1)} C = ${fmt(internal, 1)} C`,
        ],
        warnings: [
          'The heat transfer coefficient depends on the enclosure material, finish, and airflow. Stainless steel and unpainted surfaces perform differently from painted steel, and the manufacturer figure should be used where available.',
          'Solar gain on an outdoor enclosure is often the dominant term. A sunshield changes the answer substantially.',
          'This is a steady-state estimate for natural convection. It does not model internal hot spots, and a drive can be far above the average internal temperature at its own heatsink.',
          'Power supplies and drives derate above their reference ambient. Check the derating curve at the predicted internal temperature, not at the outdoor ambient.',
          ...(ok ? [] : ['The predicted internal temperature exceeds what you entered as allowable. Add cooling, increase the enclosure size, or reduce the heat load.']),
        ],
      };
    },
    formulas: [
      {
        expr: 'dT = Q / (A x k)',
        where: [
          'dT — temperature rise above ambient, degrees C',
          'Q — total internal heat load in watts, including solar gain',
          'A — effective surface area in square metres',
          'k — heat transfer coefficient, about 5.5 W/m2/C for painted steel in still air',
        ],
      },
    ],
    assumptions: [
      'Natural convection with no forced air, no vents, and no active cooling.',
      'Wall mounting treats the back surface as ineffective, which is the conservative assumption.',
      'Steady state. Does not model warm-up, internal hot spots, or stratification.',
      'The default coefficient is a commonly used figure for painted steel and is not specific to any product.',
    ],
    related: ['/controls/control-panels/panel-design/heat-calculations', '/controls/control-panels/panel-design/enclosure-selection'],
    relatedCalculators: ['dc-power-supply-load', 'motor-branch-circuit'],
    faqs: [
      {
        q: 'Where do I get the heat load figure?',
        a: 'From the datasheet of every component that dissipates power. Drives, power supplies, and transformers dominate. For a power supply, the dissipation is the delivered load multiplied by (1 divided by efficiency, minus 1).',
      },
      {
        q: 'How much solar gain should I assume?',
        a: 'It depends on orientation, latitude, colour, and whether there is a sunshield. Enclosure manufacturers publish figures for their products, and those should be used rather than a generic number.',
      },
    ],
  },

  {
    slug: 'dc-power-supply-load',
    title: 'DC Power Supply Load Budget',
    category: 'Control Panels',
    summary:
      'Total 24 VDC load from controller, I/O, transmitters, relays, and network gear, with headroom applied and the heat the supply adds to the enclosure.',
    answer:
      'Size a control power supply by totalling the steady-state current of every load at the supply voltage, adding the largest expected simultaneous inrush, applying at least 25% headroom, and then derating for the actual maximum temperature inside the enclosure. Undersized supplies cause intermittent controller resets that are very hard to diagnose.',
    keywords: ['power supply', '24 VDC', 'load budget', 'panel', 'sizing'],
    fields: [
      { kind: 'number', key: 'voltage', label: 'Supply voltage', unit: 'V', default: 24, min: 5 },
      { kind: 'number', key: 'controller', label: 'Controller and I/O', unit: 'mA', default: 900, min: 0 },
      { kind: 'number', key: 'transmitters', label: 'Loop-powered transmitters', default: 6, min: 0, help: 'Counted at 22 mA each, slightly above full scale, to cover fault currents.' },
      { kind: 'number', key: 'relayCount', label: 'Relays energized at once', default: 8, min: 0 },
      { kind: 'number', key: 'relayCurrent', label: 'Current per relay coil', unit: 'mA', default: 25, min: 0 },
      { kind: 'number', key: 'network', label: 'Switch, radio, and modem', unit: 'mA', default: 900, min: 0 },
      { kind: 'number', key: 'misc', label: 'Everything else', unit: 'mA', default: 150, min: 0 },
      { kind: 'number', key: 'headroom', label: 'Headroom', unit: '%', default: 25, min: 0, max: 200, step: 5 },
      { kind: 'number', key: 'efficiency', label: 'Supply efficiency', unit: '%', default: 88, min: 50, max: 99, step: 1 },
    ],
    run: (v) => {
      const voltage = num(v.voltage, 24);
      const controller = num(v.controller, 0);
      const transmitters = Math.max(0, Math.round(num(v.transmitters, 0)));
      const relayCount = Math.max(0, Math.round(num(v.relayCount, 0)));
      const relayCurrent = num(v.relayCurrent, 0);
      const network = num(v.network, 0);
      const misc = num(v.misc, 0);
      const headroom = num(v.headroom, 25);
      const efficiency = num(v.efficiency, 88) / 100;

      const transmitterMa = transmitters * 22;
      const relayMa = relayCount * relayCurrent;
      const totalMa = controller + transmitterMa + relayMa + network + misc;
      const totalA = totalMa / 1000;
      const withHeadroom = totalA * (1 + headroom / 100);

      const outputWatts = totalA * voltage;
      const heatWatts = outputWatts * (1 / efficiency - 1);

      const catalogSizes = [1, 1.3, 2, 2.5, 3.8, 5, 10, 20, 40];
      const recommended = catalogSizes.find((size) => size >= withHeadroom);

      return {
        outputs: [
          { label: 'Steady-state load', value: fmt(totalA, 3), unit: 'A', emphasis: true, note: `${fmt(totalMa, 0)} mA` },
          { label: `With ${fmt(headroom, 0)}% headroom`, value: fmt(withHeadroom, 3), unit: 'A', emphasis: true },
          {
            label: 'Next common catalog size',
            value: recommended ? `${recommended} A` : 'Above 40 A',
            note: 'Common catalog ratings. Confirm against the products you actually buy.',
          },
          { label: 'Delivered power', value: fmt(outputWatts, 1), unit: 'W' },
          {
            label: 'Heat the supply adds to the enclosure',
            value: fmt(heatWatts, 1),
            unit: 'W',
            note: `At ${fmt(efficiency * 100, 0)}% efficiency. Add this to the enclosure heat load.`,
          },
        ],
        steps: [
          `Controller and I/O: ${fmt(controller, 0)} mA`,
          `Transmitters: ${transmitters} x 22 mA = ${fmt(transmitterMa, 0)} mA`,
          `Relays: ${relayCount} x ${fmt(relayCurrent, 0)} mA = ${fmt(relayMa, 0)} mA`,
          `Network gear: ${fmt(network, 0)} mA`,
          `Other: ${fmt(misc, 0)} mA`,
          `Total = ${fmt(totalMa, 0)} mA = ${fmt(totalA, 3)} A`,
          `With headroom = ${fmt(totalA, 3)} x ${fmt(1 + headroom / 100, 2)} = ${fmt(withHeadroom, 3)} A`,
        ],
        warnings: [
          'This is steady state only. Relay and contactor coils, capacitive input filters, and switch-mode devices all draw far more at the instant they energize, and a supply that is adequate in steady state can drop out of regulation on a simultaneous energization.',
          'Power supply ratings derate above their reference ambient. Check the derating curve at the temperature inside the enclosure, not at the outdoor ambient.',
          'Distribute the output through individually protected branches. A single supply feeding twenty devices through one terminal turns a shorted field wire into a dead panel.',
          'Consider separating controller power from field device power so a field short cannot take down the processor.',
        ],
      };
    },
    formulas: [
      { expr: 'Rating >= total steady-state current x (1 + headroom)' },
      { expr: 'Heat = delivered watts x (1 / efficiency - 1)' },
    ],
    assumptions: [
      'Loop-powered transmitters are counted at 22 mA each, slightly above full scale, to cover NAMUR fault currents.',
      'Steady state only. Inrush is not modelled.',
      'Catalog sizes shown are common ratings and are not specific to any manufacturer.',
    ],
    related: ['/controls/control-panels/panel-components/panel-power-supplies', '/how-to/panel-how-to/size-a-power-supply'],
    relatedCalculators: ['enclosure-heat-load', 'ohms-law'],
    faqs: [
      {
        q: 'How much headroom is enough?',
        a: 'At least 25% above the calculated steady-state load, and more where spare I/O capacity exists. The step to the next catalog size is usually cheap compared with diagnosing an intermittent brownout later.',
      },
      {
        q: 'Why 22 mA per transmitter and not 20?',
        a: 'A transmitter driving a NAMUR fault current draws slightly more than full scale, and some devices draw more still under alarm conditions. Counting 22 mA removes a small systematic underestimate at no cost.',
      },
    ],
  },

  {
    slug: 'ups-battery-runtime',
    title: 'UPS and Battery Runtime',
    category: 'Control Panels',
    summary:
      'How long a battery will carry a control load, from capacity, voltage, depth of discharge, and inverter efficiency.',
    answer:
      'Runtime is battery capacity in amp-hours multiplied by nominal voltage, multiplied by the usable depth of discharge and the conversion efficiency, divided by the load in watts. Real runtime is shorter than this figure because capacity falls at high discharge rates, an effect described by Peukert law.',
    keywords: ['UPS', 'battery', 'runtime', 'backup power', 'amp hour'],
    fields: [
      { kind: 'number', key: 'capacity', label: 'Battery capacity', unit: 'Ah', default: 7.2, min: 0.1, step: 0.1 },
      { kind: 'number', key: 'batteryVolts', label: 'Battery nominal voltage', unit: 'V', default: 24, min: 1 },
      { kind: 'number', key: 'load', label: 'Load', unit: 'W', default: 45, min: 0.1 },
      { kind: 'number', key: 'dod', label: 'Usable depth of discharge', unit: '%', default: 80, min: 10, max: 100, step: 5, help: 'Discharging a lead-acid battery deeper than about 50 to 80% shortens its life considerably.' },
      { kind: 'number', key: 'efficiency', label: 'Conversion efficiency', unit: '%', default: 90, min: 50, max: 100, step: 1 },
      { kind: 'number', key: 'derate', label: 'Age and temperature derate', unit: '%', default: 20, min: 0, max: 60, step: 5, help: 'Capacity falls with age and in cold conditions. 20% is a common planning allowance.' },
    ],
    run: (v) => {
      const capacity = num(v.capacity);
      const batteryVolts = num(v.batteryVolts);
      const load = num(v.load);
      const dod = num(v.dod, 80) / 100;
      const efficiency = num(v.efficiency, 90) / 100;
      const derate = num(v.derate, 20) / 100;

      if (capacity <= 0 || batteryVolts <= 0 || load <= 0) {
        return { outputs: [], error: 'Capacity, voltage, and load must all be greater than zero.' };
      }

      const nominalWh = capacity * batteryVolts;
      const usableWh = nominalWh * dod * efficiency * (1 - derate);
      const hours = usableWh / load;
      const dischargeAmps = load / (batteryVolts * efficiency);

      return {
        outputs: [
          {
            label: 'Estimated runtime',
            value: hours >= 1 ? `${fmt(hours, 2)} h` : `${fmt(hours * 60, 0)} min`,
            emphasis: true,
            note: `${fmt(hours * 60, 0)} minutes`,
          },
          { label: 'Nominal battery energy', value: fmt(nominalWh, 1), unit: 'Wh' },
          { label: 'Usable energy after all factors', value: fmt(usableWh, 1), unit: 'Wh' },
          { label: 'Discharge current', value: fmt(dischargeAmps, 2), unit: 'A' },
          {
            label: 'Discharge rate',
            value: `C/${fmt(capacity / dischargeAmps, 1)}`,
            status: capacity / dischargeAmps < 5 ? 'caution' : 'neutral',
            note:
              capacity / dischargeAmps < 5
                ? 'A fast discharge. Real capacity will be noticeably below the rating.'
                : 'A moderate discharge rate.',
          },
        ],
        steps: [
          `Nominal energy = ${fmt(capacity, 2)} Ah x ${fmt(batteryVolts, 0)} V = ${fmt(nominalWh, 1)} Wh`,
          `Usable = ${fmt(nominalWh, 1)} x ${fmt(dod, 2)} depth x ${fmt(efficiency, 2)} efficiency x ${fmt(1 - derate, 2)} derate = ${fmt(usableWh, 1)} Wh`,
          `Runtime = ${fmt(usableWh, 1)} Wh / ${fmt(load, 1)} W = ${fmt(hours, 2)} h`,
        ],
        warnings: [
          'Battery capacity ratings are stated at a slow discharge rate, usually 20 hours. At a faster rate the usable capacity is lower, an effect described by Peukert law that this simple calculation does not model.',
          'Cold reduces capacity substantially. A battery in an unheated outdoor enclosure in winter delivers far less than its rating.',
          'Capacity falls throughout the battery life. Size for end of life, not for a new battery, and test the actual runtime rather than assuming it.',
          'A runtime calculation is not a substitute for a load test. Test the real system before you rely on it.',
        ],
      };
    },
    formulas: [
      {
        expr: 'Runtime = (Ah x V x DoD x efficiency x (1 - derate)) / load watts',
        where: ['DoD — usable depth of discharge as a fraction'],
      },
    ],
    assumptions: [
      'Constant load throughout the discharge.',
      'Does not model Peukert capacity loss at high discharge rates.',
      'Does not model temperature effects beyond the flat derate you enter.',
    ],
    related: ['/controls/control-panels/panel-components/ups'],
    relatedCalculators: ['dc-power-supply-load'],
    faqs: [
      {
        q: 'Why is my real runtime shorter than this?',
        a: 'Three reasons usually: the capacity rating assumes a slow discharge and yours is faster, the battery has aged, or it is cold. Test the actual runtime under real conditions rather than trusting any calculation.',
      },
      {
        q: 'What should I back up at a remote site?',
        a: 'Often just the controller and the communication path, long enough to report the outage and ride through a brief interruption. Backing the whole panel including drives is a much larger and usually unnecessary battery.',
      },
    ],
  },
];
