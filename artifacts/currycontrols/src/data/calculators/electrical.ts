import {
  AMPACITY_310_16,
  AWG_BY_LABEL,
  AWG_SIZES,
  EMT_AREA,
  K_FACTOR,
  MOTOR_FLC_3PH,
  MOTOR_VOLTAGE_INDEX,
  SMALL_CONDUCTOR_LIMIT,
  conductorAdjustment,
  largestOcpdNotExceeding,
  nextStandardOcpd,
  temperatureCorrection,
} from '../reference-data';
import { fmt, num, pct, sig, str, type Calculator, type FieldOption } from '../calc-types';

const awgOptions: FieldOption[] = AWG_SIZES.map((size) => ({ value: size.label, label: size.label }));
const materialOptions: FieldOption[] = [
  { value: 'copper', label: 'Copper' },
  { value: 'aluminum', label: 'Aluminum' },
];
const phaseOptions: FieldOption[] = [
  { value: '1', label: 'Single phase' },
  { value: '3', label: 'Three phase' },
];

/** 2 for single phase, sqrt(3) for three phase. */
const phaseConstant = (phase: string) => (phase === '3' ? Math.sqrt(3) : 2);

export const ELECTRICAL_CALCULATORS: Calculator[] = [
  {
    slug: 'voltage-drop',
    title: 'Voltage Drop Calculator',
    category: 'Electrical',
    summary:
      'Voltage drop over a conductor run, by wire size, material, distance, and load, using the circular-mil method. Shows the arithmetic so it can be checked.',
    answer:
      'Voltage drop is calculated as VD = (K x phase constant x current x one-way distance) / circular mils, where K is about 12.9 for copper and 21.2 for aluminum, and the phase constant is 2 for single phase or 1.732 for three phase. The NEC does not mandate a limit, but its informational notes reference roughly 3% on a branch circuit and 5% total including the feeder.',
    keywords: ['voltage drop', 'wire size', 'conductor', 'circular mil', 'K factor'],
    fields: [
      { kind: 'select', key: 'phase', label: 'System', options: phaseOptions, default: '3' },
      { kind: 'number', key: 'volts', label: 'System voltage', unit: 'V', default: 480, min: 1 },
      { kind: 'number', key: 'amps', label: 'Load current', unit: 'A', default: 40, min: 0.01 },
      { kind: 'number', key: 'distance', label: 'One-way distance', unit: 'ft', default: 250, min: 1 },
      { kind: 'select', key: 'size', label: 'Conductor size', options: awgOptions, default: '8' },
      { kind: 'select', key: 'material', label: 'Conductor material', options: materialOptions, default: 'copper' },
      {
        kind: 'number',
        key: 'limit',
        label: 'Voltage drop limit to check against',
        unit: '%',
        default: 3,
        min: 0.1,
        max: 25,
        step: 0.1,
        help: 'The NEC does not mandate a limit. 3% branch, 5% total is the figure most specifications use.',
      },
    ],
    run: (v) => {
      const phase = str(v.phase, '3');
      const volts = num(v.volts);
      const amps = num(v.amps);
      const distance = num(v.distance);
      const material = str(v.material, 'copper') as 'copper' | 'aluminum';
      const size = AWG_BY_LABEL[str(v.size)];
      const limit = num(v.limit, 3);

      if (!size) return { outputs: [], error: 'Select a conductor size.' };
      if (volts <= 0 || amps <= 0 || distance <= 0) {
        return { outputs: [], error: 'Voltage, current, and distance must all be greater than zero.' };
      }

      const k = K_FACTOR[material];
      const constant = phaseConstant(phase);
      const drop = (k * constant * amps * distance) / size.cmil;
      const dropPct = (drop / volts) * 100;
      const atLoad = volts - drop;
      const over = dropPct > limit;

      const requiredCmil = (k * constant * amps * distance) / (volts * (limit / 100));
      const suggestion = AWG_SIZES.find((candidate) => candidate.cmil >= requiredCmil);

      return {
        outputs: [
          { label: 'Voltage drop', value: fmt(drop, 2), unit: 'V', emphasis: true },
          {
            label: 'Voltage drop',
            value: pct(dropPct),
            status: over ? 'over' : 'ok',
            note: over ? `Above the ${fmt(limit, 1)}% you asked to check against` : `Within ${fmt(limit, 1)}%`,
          },
          { label: 'Voltage at the load', value: fmt(atLoad, 1), unit: 'V' },
          {
            label: 'Smallest size meeting the limit',
            value: suggestion ? suggestion.label : 'Larger than 1000 kcmil',
            note: suggestion
              ? `Needs at least ${fmt(requiredCmil, 0)} circular mils`
              : 'Consider parallel conductors or a higher system voltage',
          },
        ],
        steps: [
          `K = ${k} ohm-cmil/ft for ${material}`,
          `Phase constant = ${phase === '3' ? '1.732 (three phase)' : '2 (single phase)'}`,
          `Circular mils for ${size.label} = ${fmt(size.cmil, 0)}`,
          `VD = (${k} x ${fmt(constant, 3)} x ${fmt(amps, 1)} A x ${fmt(distance, 0)} ft) / ${fmt(size.cmil, 0)} = ${fmt(drop, 2)} V`,
          `%VD = ${fmt(drop, 2)} V / ${fmt(volts, 0)} V x 100 = ${pct(dropPct)}`,
        ],
        warnings: [
          'The circular-mil method uses a fixed K and ignores conductor reactance, power factor, and conductor operating temperature. On large conductors and low power factor loads it can understate the real drop; use an impedance-based method where that matters.',
          'Voltage drop does not determine conductor size on its own. The conductor must also satisfy ampacity, overcurrent protection, terminal temperature ratings, and short-circuit withstand.',
          ...(over ? ['This run exceeds the limit you entered. Motor starting current will make it worse than the steady-state figure shown.'] : []),
        ],
      };
    },
    formulas: [
      {
        expr: 'VD = (K x n x I x L) / CM',
        where: [
          'K — 12.9 for copper, 21.2 for aluminum (ohm-cmil/ft)',
          'n — 2 for single phase, 1.732 for three phase',
          'I — load current in amperes',
          'L — one-way circuit length in feet',
          'CM — conductor area in circular mils',
        ],
      },
    ],
    assumptions: [
      'Uses the circular-mil K method with K = 12.9 for copper and 21.2 for aluminum, values commonly cited for uncoated conductors at about 75 degrees C.',
      'Ignores conductor reactance. Results are least accurate on large conductors, long runs, and low power factor loads.',
      'Assumes a balanced load and a single conductor per phase.',
      'Distance is one way. The formula accounts for the return path.',
    ],
    standards: ['NFPA 70 (NEC) 210.19 and 215.2 informational notes on voltage drop'],
    related: ['/controls/control-panels/panel-design/nfpa-70', '/engineering-library/standards/nfpa'],
    relatedCalculators: ['wire-size-for-voltage-drop', 'conductor-ampacity'],
    faqs: [
      {
        q: 'Does the NEC limit voltage drop?',
        a: 'Not as a requirement in the general branch-circuit and feeder rules. Informational notes reference about 3% on a branch circuit and 5% total including the feeder, and most specifications adopt those figures as requirements. Some specific applications do carry mandatory limits.',
      },
      {
        q: 'Should I use one-way or round-trip distance?',
        a: 'One way. The phase constant in the formula accounts for the return path: 2 for single phase, 1.732 for three phase.',
      },
      {
        q: 'Why does my drop differ from the manufacturer figure?',
        a: 'The circular-mil method ignores reactance and assumes a fixed conductor temperature. Manufacturer and software calculations typically use conductor impedance from NEC Chapter 9 Table 9 at a stated power factor, which is more accurate on large conductors.',
      },
    ],
  },

  {
    slug: 'wire-size-for-voltage-drop',
    title: 'Wire Size Calculator for Voltage Drop',
    category: 'Electrical',
    summary:
      'The smallest conductor that keeps voltage drop within a chosen limit for a given load, distance, and system voltage, with the required circular mils shown.',
    answer:
      'To size a conductor for voltage drop, rearrange the drop formula for area: CM = (K x phase constant x current x one-way distance) / allowable volts dropped. Pick the smallest standard size whose circular mils meet or exceed that figure. The conductor must still separately satisfy ampacity, overcurrent protection, and terminal temperature limits.',
    keywords: ['wire size', 'conductor sizing', 'voltage drop', 'AWG'],
    fields: [
      { kind: 'select', key: 'phase', label: 'System', options: phaseOptions, default: '3' },
      { kind: 'number', key: 'volts', label: 'System voltage', unit: 'V', default: 480, min: 1 },
      { kind: 'number', key: 'amps', label: 'Load current', unit: 'A', default: 40, min: 0.01 },
      { kind: 'number', key: 'distance', label: 'One-way distance', unit: 'ft', default: 400, min: 1 },
      { kind: 'select', key: 'material', label: 'Conductor material', options: materialOptions, default: 'copper' },
      { kind: 'number', key: 'limit', label: 'Allowable voltage drop', unit: '%', default: 3, min: 0.1, max: 25, step: 0.1 },
    ],
    run: (v) => {
      const phase = str(v.phase, '3');
      const volts = num(v.volts);
      const amps = num(v.amps);
      const distance = num(v.distance);
      const material = str(v.material, 'copper') as 'copper' | 'aluminum';
      const limit = num(v.limit, 3);

      if (volts <= 0 || amps <= 0 || distance <= 0 || limit <= 0) {
        return { outputs: [], error: 'All inputs must be greater than zero.' };
      }

      const k = K_FACTOR[material];
      const constant = phaseConstant(phase);
      const allowableVolts = volts * (limit / 100);
      const requiredCmil = (k * constant * amps * distance) / allowableVolts;
      const chosen = AWG_SIZES.find((size) => size.cmil >= requiredCmil);
      const ampacityRow = chosen ? AMPACITY_310_16[material][chosen.label] : null;

      const actualDrop = chosen ? (k * constant * amps * distance) / chosen.cmil : Number.NaN;

      return {
        outputs: [
          {
            label: 'Smallest size for voltage drop',
            value: chosen ? chosen.label : 'Larger than 1000 kcmil',
            emphasis: true,
            note: chosen ? undefined : 'Consider parallel conductors, a shorter run, or a higher system voltage',
          },
          { label: 'Required conductor area', value: fmt(requiredCmil, 0), unit: 'cmil' },
          { label: 'Allowable drop', value: fmt(allowableVolts, 2), unit: 'V' },
          ...(chosen
            ? [
                { label: 'Actual drop at that size', value: fmt(actualDrop, 2), unit: 'V' },
                { label: 'Actual drop', value: pct((actualDrop / volts) * 100) },
                {
                  label: 'Table 310.16 ampacity at 75 C',
                  value: ampacityRow ? `${ampacityRow[1]} A` : 'Not listed',
                  note: 'Shown so you can confirm the size also satisfies ampacity. Verify against your code book.',
                  status: ampacityRow && ampacityRow[1] < amps ? ('over' as const) : ('neutral' as const),
                },
              ]
            : []),
        ],
        steps: [
          `Allowable drop = ${fmt(volts, 0)} V x ${fmt(limit, 1)}% = ${fmt(allowableVolts, 2)} V`,
          `CM required = (${k} x ${fmt(constant, 3)} x ${fmt(amps, 1)} A x ${fmt(distance, 0)} ft) / ${fmt(allowableVolts, 2)} V = ${fmt(requiredCmil, 0)} cmil`,
          chosen
            ? `Smallest standard size at or above ${fmt(requiredCmil, 0)} cmil is ${chosen.label} at ${fmt(chosen.cmil, 0)} cmil`
            : 'No single standard size up to 1000 kcmil meets that area',
        ],
        warnings: [
          'This sizes for voltage drop only. Ampacity, overcurrent protection, terminal temperature ratings, conduit fill, and short-circuit withstand are separate requirements and any of them can force a larger conductor.',
          ...(ampacityRow && ampacityRow[1] < amps
            ? ['The size chosen for voltage drop does not carry the load current at the 75 C column before any derating. Ampacity governs here, not voltage drop.']
            : []),
        ],
      };
    },
    formulas: [
      {
        expr: 'CM = (K x n x I x L) / V_allowable',
        where: [
          'CM — required conductor area in circular mils',
          'V_allowable — system voltage multiplied by the allowable drop percentage',
        ],
      },
    ],
    assumptions: [
      'Sizes for voltage drop alone. Every other conductor requirement is checked separately.',
      'Uses the circular-mil K method and ignores conductor reactance.',
      'Assumes one conductor per phase and a balanced load.',
    ],
    standards: ['NFPA 70 (NEC) Article 310 for ampacity, 210.19 and 215.2 notes for voltage drop'],
    relatedCalculators: ['voltage-drop', 'conductor-ampacity'],
    faqs: [
      {
        q: 'Why did the calculator pick a size larger than the ampacity table needs?',
        a: 'On a long run, voltage drop governs rather than ampacity. That is normal, and it is why remote lift stations and well sites often have conductors far larger than the load current alone would suggest.',
      },
    ],
  },

  {
    slug: 'conductor-ampacity',
    title: 'Conductor Ampacity with Derating',
    category: 'Electrical',
    summary:
      'Allowable ampacity after ambient temperature correction and the adjustment for more than three current-carrying conductors, with the small-conductor overcurrent limit applied.',
    answer:
      'Corrected ampacity is the Table 310.16 value for the conductor size and insulation rating, multiplied by the ambient temperature correction factor and by the adjustment factor for the number of current-carrying conductors in the raceway. The result is then limited by the temperature rating of the terminations, and for small conductors by the overcurrent limits in 240.4(D).',
    keywords: ['ampacity', 'derating', 'temperature correction', 'conduit fill', '310.16'],
    fields: [
      { kind: 'select', key: 'size', label: 'Conductor size', options: awgOptions, default: '10' },
      { kind: 'select', key: 'material', label: 'Conductor material', options: materialOptions, default: 'copper' },
      {
        kind: 'select',
        key: 'rating',
        label: 'Insulation temperature rating',
        options: [
          { value: '60', label: '60 C (TW, UF)' },
          { value: '75', label: '75 C (THW, THWN, XHHW)' },
          { value: '90', label: '90 C (THHN, THWN-2, XHHW-2)' },
        ],
        default: '90',
        help: 'The 90 C column is normally used only as a starting point for derating. Terminations are commonly rated 60 C or 75 C.',
      },
      {
        kind: 'select',
        key: 'termination',
        label: 'Termination temperature rating',
        options: [
          { value: '60', label: '60 C terminations' },
          { value: '75', label: '75 C terminations' },
        ],
        default: '75',
        help: 'Per 110.14(C), the final ampacity cannot exceed the value in the column matching the lowest-rated termination.',
      },
      { kind: 'number', key: 'ambient', label: 'Ambient temperature', unit: 'C', default: 40, min: -10, max: 85 },
      {
        kind: 'number',
        key: 'ccc',
        label: 'Current-carrying conductors in the raceway',
        default: 3,
        min: 1,
        max: 60,
        help: 'Neutrals carrying only unbalanced current and equipment grounding conductors are generally not counted.',
      },
      { kind: 'number', key: 'load', label: 'Load current to check against', unit: 'A', default: 24, min: 0 },
    ],
    run: (v) => {
      const sizeLabel = str(v.size);
      const material = str(v.material, 'copper') as 'copper' | 'aluminum';
      const rating = Number(str(v.rating, '90')) as 60 | 75 | 90;
      const termination = Number(str(v.termination, '75')) as 60 | 75;
      const ambient = num(v.ambient, 30);
      const ccc = Math.max(1, Math.round(num(v.ccc, 3)));
      const load = num(v.load, 0);

      const row = AMPACITY_310_16[material][sizeLabel];
      if (!row) {
        return { outputs: [], error: `${sizeLabel} is not listed for ${material} in Table 310.16.` };
      }

      const column = rating === 60 ? 0 : rating === 75 ? 1 : 2;
      const base = row[column];
      const correction = temperatureCorrection(ambient, rating);
      if (correction === null) {
        return {
          outputs: [],
          error: `A ${rating} C conductor has no listed correction factor at ${fmt(ambient, 0)} C ambient. A higher insulation rating is required.`,
        };
      }
      const adjustment = conductorAdjustment(ccc);
      const derated = base * correction * adjustment;

      const terminationLimit = row[termination === 60 ? 0 : 1];
      const finalAmpacity = Math.min(derated, terminationLimit);

      const smallLimit = SMALL_CONDUCTOR_LIMIT[material][sizeLabel];
      const ocpdCeiling = smallLimit ?? Number.POSITIVE_INFINITY;
      const maxOcpd = Math.min(largestOcpdNotExceeding(finalAmpacity), ocpdCeiling);

      const adequate = load > 0 ? finalAmpacity >= load : true;

      return {
        outputs: [
          {
            label: 'Ampacity after derating',
            value: fmt(derated, 1),
            unit: 'A',
            emphasis: true,
            note: `${base} A base x ${fmt(correction, 2)} temperature x ${fmt(adjustment, 2)} conductor count`,
          },
          {
            label: 'Usable ampacity',
            value: fmt(finalAmpacity, 1),
            unit: 'A',
            status: adequate ? 'ok' : 'over',
            note:
              finalAmpacity === terminationLimit && terminationLimit < derated
                ? `Limited by the ${termination} C termination column, not by derating`
                : 'Limited by derating',
          },
          {
            label: 'Table 310.16 value used',
            value: `${base} A`,
            note: `${material} ${sizeLabel}, ${rating} C column. Confirm this against your own code book.`,
          },
          { label: 'Ambient correction factor', value: fmt(correction, 2), note: `at ${fmt(ambient, 0)} C` },
          {
            label: 'Conductor count adjustment',
            value: fmt(adjustment, 2),
            note: `${ccc} current-carrying conductor${ccc === 1 ? '' : 's'}`,
          },
          {
            label: 'Largest standard overcurrent device',
            value: `${maxOcpd} A`,
            note: smallLimit ? `Capped at ${smallLimit} A by the 240.4(D) small conductor rule` : undefined,
          },
          ...(load > 0
            ? [
                {
                  label: 'Against your load',
                  value: adequate ? 'Ampacity is sufficient' : 'Ampacity is not sufficient',
                  status: adequate ? ('ok' as const) : ('over' as const),
                  note: `${fmt(load, 1)} A load against ${fmt(finalAmpacity, 1)} A usable`,
                },
              ]
            : []),
        ],
        steps: [
          `Base ampacity, Table 310.16, ${material} ${sizeLabel}, ${rating} C column = ${base} A`,
          `Ambient correction at ${fmt(ambient, 0)} C = ${fmt(correction, 2)}`,
          `Adjustment for ${ccc} current-carrying conductors = ${fmt(adjustment, 2)}`,
          `${base} x ${fmt(correction, 2)} x ${fmt(adjustment, 2)} = ${fmt(derated, 1)} A`,
          `Termination limit, ${termination} C column = ${terminationLimit} A`,
          `Usable ampacity = lesser of the two = ${fmt(finalAmpacity, 1)} A`,
        ],
        warnings: [
          'Starting from the 90 C column is permitted only for derating. The finished ampacity still cannot exceed the column matching the lowest-rated termination, which 110.14(C) requires you to identify from the equipment marking.',
          'Continuous loads generally require the conductor and the overcurrent device to be sized at 125% of the continuous load. That is not applied here.',
          'Which conductors count as current-carrying depends on the system. Harmonic-rich loads can make a shared neutral a current-carrying conductor.',
          ...(smallLimit ? [`240.4(D) caps the overcurrent device for ${material} ${sizeLabel} at ${smallLimit} A regardless of the calculated ampacity, with limited exceptions.`] : []),
        ],
      };
    },
    formulas: [
      {
        expr: 'I_allowable = I_table x F_temperature x F_conductors',
        where: [
          'I_table — Table 310.16 value at the insulation temperature column',
          'F_temperature — ambient correction from Table 310.15(B)(1)',
          'F_conductors — adjustment from Table 310.15(C)(1)',
        ],
      },
    ],
    assumptions: [
      'Uses Table 310.16, which covers not more than three current-carrying conductors in a raceway, cable, or earth at 30 degrees C ambient.',
      'Applies the termination temperature limit from 110.14(C) as a ceiling.',
      'Does not apply the 125% continuous load factor, motor rules, or any of the ampacity exceptions.',
      'Table values are reproduced for convenience and may not match your adopted edition.',
    ],
    standards: [
      'NFPA 70 (NEC) Table 310.16, Table 310.15(B)(1), Table 310.15(C)(1), 110.14(C), 240.4(D)',
    ],
    related: ['/controls/control-panels/panel-design/nfpa-70'],
    relatedCalculators: ['voltage-drop', 'conduit-fill', 'motor-branch-circuit'],
    faqs: [
      {
        q: 'Can I use the 90 C column?',
        a: 'You can start derating from it when the conductor is 90 C rated, but the finished ampacity still cannot exceed the column matching the lowest-rated termination in the circuit. Most equipment terminals are rated 60 C or 75 C.',
      },
      {
        q: 'Which conductors count as current-carrying?',
        a: 'Ungrounded conductors always count. Equipment grounding conductors do not. A neutral carrying only the unbalanced current of a multiwire branch circuit generally does not, but a neutral in a system with significant harmonic content does.',
      },
      {
        q: 'Do both correction and adjustment apply at once?',
        a: 'Yes. When the ambient differs from 30 degrees C and there are more than three current-carrying conductors, both factors multiply the table value.',
      },
    ],
  },

  {
    slug: 'conduit-fill',
    title: 'Conduit Fill Calculator',
    category: 'Electrical',
    summary:
      'Percentage fill for a conduit run from conductor count and size, checked against the 40, 31, and 53 percent limits, with the smallest conduit that fits.',
    answer:
      'Conduit fill is the total cross-sectional area of all conductors divided by the internal area of the conduit. The limits are 53% for one conductor, 31% for two, and 40% for three or more. Conductor and conduit areas come from NEC Chapter 9 Tables 5 and 4, and the areas used here are for THHN and THWN-2.',
    keywords: ['conduit fill', 'raceway fill', '40 percent', 'EMT', 'chapter 9'],
    fields: [
      { kind: 'select', key: 'size1', label: 'Conductor size, group 1', options: awgOptions, default: '12' },
      { kind: 'number', key: 'count1', label: 'How many, group 1', default: 4, min: 0, max: 200 },
      { kind: 'select', key: 'size2', label: 'Conductor size, group 2', options: awgOptions, default: '10' },
      { kind: 'number', key: 'count2', label: 'How many, group 2', default: 0, min: 0, max: 200 },
      { kind: 'select', key: 'size3', label: 'Conductor size, group 3', options: awgOptions, default: '8' },
      { kind: 'number', key: 'count3', label: 'How many, group 3', default: 0, min: 0, max: 200 },
      {
        kind: 'select',
        key: 'conduit',
        label: 'Conduit trade size to check',
        options: Object.keys(EMT_AREA).map((size) => ({ value: size, label: `${size} in EMT` })),
        default: '3/4',
      },
    ],
    run: (v) => {
      const groups = [1, 2, 3]
        .map((i) => ({
          size: AWG_BY_LABEL[str(v[`size${i}`])],
          count: Math.max(0, Math.round(num(v[`count${i}`], 0))),
        }))
        .filter((g) => g.size && g.count > 0);

      const totalCount = groups.reduce((sum, g) => sum + g.count, 0);
      if (totalCount === 0) return { outputs: [], error: 'Enter at least one conductor.' };

      const totalArea = groups.reduce((sum, g) => sum + g.size!.thhnArea * g.count, 0);
      const limitPct = totalCount === 1 ? 53 : totalCount === 2 ? 31 : 40;

      const conduitKey = str(v.conduit, '3/4');
      const conduit = EMT_AREA[conduitKey];
      if (!conduit) return { outputs: [], error: 'Select a conduit size.' };

      const fillPct = (totalArea / conduit.total) * 100;
      const within = fillPct <= limitPct;

      const smallest = Object.entries(EMT_AREA).find(
        ([, area]) => (totalArea / area.total) * 100 <= limitPct,
      );

      return {
        outputs: [
          {
            label: `Fill of ${conduitKey} in EMT`,
            value: pct(fillPct, 1),
            emphasis: true,
            status: within ? 'ok' : 'over',
            note: `Limit for ${totalCount} conductor${totalCount === 1 ? '' : 's'} is ${limitPct}%`,
          },
          { label: 'Total conductor area', value: fmt(totalArea, 4), unit: 'sq in' },
          { label: 'Conduit internal area', value: fmt(conduit.total, 4), unit: 'sq in' },
          { label: 'Area available at the limit', value: fmt(conduit.total * (limitPct / 100), 4), unit: 'sq in' },
          {
            label: 'Smallest EMT that fits',
            value: smallest ? `${smallest[0]} in` : 'Larger than 4 in',
            status: smallest ? 'ok' : 'over',
          },
        ],
        steps: [
          ...groups.map(
            (g) =>
              `${g.count} x ${g.size!.label} at ${fmt(g.size!.thhnArea, 4)} sq in = ${fmt(g.size!.thhnArea * g.count, 4)} sq in`,
          ),
          `Total conductor area = ${fmt(totalArea, 4)} sq in`,
          `Fill = ${fmt(totalArea, 4)} / ${fmt(conduit.total, 4)} x 100 = ${pct(fillPct, 1)}`,
          `Limit for ${totalCount} conductor${totalCount === 1 ? '' : 's'} = ${limitPct}%`,
        ],
        warnings: [
          'Conductor areas used here are for THHN and THWN-2. Other insulations have different areas, and using the wrong one changes the answer.',
          'Conduit areas here are for EMT. Rigid metal conduit, IMC, PVC, and flexible raceways have different internal areas.',
          'Fill is only one constraint. Conductor count also drives the ampacity adjustment factor, and a conduit that passes fill can still force conductors to be upsized.',
          'Nipples not over 24 inches long are permitted 60% fill under Chapter 9 Note 4. That is not applied here.',
          ...(within ? [] : ['This combination exceeds the fill limit for the conduit selected.']),
        ],
      };
    },
    formulas: [
      { expr: 'Fill % = (sum of conductor areas / conduit internal area) x 100' },
    ],
    assumptions: [
      'Conductor areas are the approximate values commonly published for THHN and THWN-2 in Chapter 9 Table 5.',
      'Conduit areas are the values commonly published for EMT in Chapter 9 Table 4.',
      'Applies the 53 / 31 / 40 percent limits from Chapter 9 Table 1 by conductor count.',
      'Does not handle nipples, mixed raceway types, or conductors of a type other than THHN and THWN-2.',
    ],
    standards: ['NFPA 70 (NEC) Chapter 9 Tables 1, 4, and 5'],
    relatedCalculators: ['conductor-ampacity'],
    faqs: [
      {
        q: 'Why is the limit 40% and not something higher?',
        a: 'The limits exist so conductors can be pulled without damage and so heat can escape. Chapter 9 Table 1 sets 53% for a single conductor, 31% for two, and 40% for three or more.',
      },
      {
        q: 'Does the equipment grounding conductor count toward fill?',
        a: 'Yes. Every conductor in the raceway counts toward fill, including grounding conductors, even though grounding conductors do not count toward the ampacity adjustment factor.',
      },
    ],
  },

  {
    slug: 'ohms-law',
    title: "Ohm's Law and Power Calculator",
    category: 'Electrical',
    summary:
      "Solve voltage, current, resistance, and power from any two known values, with the relationships used shown.",
    answer:
      "Ohm's law states that voltage equals current multiplied by resistance. Combined with the power relationship, any two of voltage, current, resistance, and power determine the other two: V = I x R, P = V x I, P = I squared x R, and P = V squared / R.",
    keywords: ["ohms law", 'power', 'voltage', 'current', 'resistance', 'watts'],
    fields: [
      { kind: 'number', key: 'volts', label: 'Voltage', unit: 'V', default: 24, min: 0, help: 'Leave any two fields at zero. Enter exactly two known values.' },
      { kind: 'number', key: 'amps', label: 'Current', unit: 'A', default: 0.5, min: 0 },
      { kind: 'number', key: 'ohms', label: 'Resistance', unit: 'ohm', default: 0, min: 0 },
      { kind: 'number', key: 'watts', label: 'Power', unit: 'W', default: 0, min: 0 },
    ],
    run: (v) => {
      let volts = num(v.volts);
      let amps = num(v.amps);
      let ohms = num(v.ohms);
      let watts = num(v.watts);

      const known = [volts, amps, ohms, watts].filter((x) => x > 0).length;
      if (known < 2) return { outputs: [], error: 'Enter exactly two values greater than zero.' };

      const steps: string[] = [];

      if (volts > 0 && amps > 0) {
        ohms = volts / amps;
        watts = volts * amps;
        steps.push(`R = V / I = ${fmt(volts, 3)} / ${fmt(amps, 4)} = ${sig(ohms)} ohm`);
        steps.push(`P = V x I = ${fmt(volts, 3)} x ${fmt(amps, 4)} = ${sig(watts)} W`);
      } else if (volts > 0 && ohms > 0) {
        amps = volts / ohms;
        watts = (volts * volts) / ohms;
        steps.push(`I = V / R = ${fmt(volts, 3)} / ${sig(ohms)} = ${sig(amps)} A`);
        steps.push(`P = V squared / R = ${sig(watts)} W`);
      } else if (volts > 0 && watts > 0) {
        amps = watts / volts;
        ohms = (volts * volts) / watts;
        steps.push(`I = P / V = ${sig(watts)} / ${fmt(volts, 3)} = ${sig(amps)} A`);
        steps.push(`R = V squared / P = ${sig(ohms)} ohm`);
      } else if (amps > 0 && ohms > 0) {
        volts = amps * ohms;
        watts = amps * amps * ohms;
        steps.push(`V = I x R = ${sig(amps)} x ${sig(ohms)} = ${sig(volts)} V`);
        steps.push(`P = I squared x R = ${sig(watts)} W`);
      } else if (amps > 0 && watts > 0) {
        volts = watts / amps;
        ohms = watts / (amps * amps);
        steps.push(`V = P / I = ${sig(watts)} / ${sig(amps)} = ${sig(volts)} V`);
        steps.push(`R = P / I squared = ${sig(ohms)} ohm`);
      } else {
        volts = Math.sqrt(watts * ohms);
        amps = Math.sqrt(watts / ohms);
        steps.push(`V = sqrt(P x R) = ${sig(volts)} V`);
        steps.push(`I = sqrt(P / R) = ${sig(amps)} A`);
      }

      return {
        outputs: [
          { label: 'Voltage', value: sig(volts), unit: 'V', emphasis: true },
          { label: 'Current', value: sig(amps), unit: 'A', emphasis: true },
          { label: 'Resistance', value: sig(ohms), unit: 'ohm' },
          { label: 'Power', value: sig(watts), unit: 'W' },
          { label: 'Current', value: sig(amps * 1000), unit: 'mA', note: 'Convenient for instrument loops' },
        ],
        steps,
        warnings: [
          known > 2
            ? 'More than two values were entered. The first valid pair was used, so check the result against what you intended.'
            : '',
          'This is the DC relationship. On AC circuits, reactance and power factor mean apparent power and real power differ, and current is not simply voltage divided by resistance.',
        ].filter(Boolean),
      };
    },
    formulas: [
      { expr: 'V = I x R' },
      { expr: 'P = V x I = I squared x R = V squared / R' },
    ],
    assumptions: [
      'Direct current, or an AC circuit that is purely resistive.',
      'Does not account for reactance, power factor, or harmonic content.',
    ],
    relatedCalculators: ['three-phase-power', 'dc-power-supply-load'],
    faqs: [
      {
        q: 'Why does this not match my AC circuit?',
        a: "Ohm's law in this form applies to resistance. On AC, inductance and capacitance add reactance, so the opposition to current is impedance rather than resistance, and real power is apparent power multiplied by power factor.",
      },
    ],
  },

  {
    slug: 'three-phase-power',
    title: 'Three-Phase Power Calculator',
    category: 'Electrical',
    summary:
      'Apparent, real, and reactive power from line voltage, line current, and power factor, or the current a given load will draw.',
    answer:
      'For a balanced three-phase load, apparent power in kVA equals 1.732 multiplied by line voltage, multiplied by line current, divided by 1000. Real power in kW is that figure multiplied by the power factor. Reactive power in kVAR is the square root of kVA squared minus kW squared.',
    keywords: ['three phase', 'kva', 'kw', 'power factor', 'kvar', 'apparent power'],
    fields: [
      { kind: 'select', key: 'phase', label: 'System', options: phaseOptions, default: '3' },
      { kind: 'number', key: 'volts', label: 'Line voltage', unit: 'V', default: 480, min: 1 },
      { kind: 'number', key: 'amps', label: 'Line current', unit: 'A', default: 65, min: 0.01 },
      { kind: 'number', key: 'pf', label: 'Power factor', default: 0.85, min: 0.05, max: 1, step: 0.01 },
      { kind: 'number', key: 'efficiency', label: 'Efficiency', unit: '%', default: 93, min: 10, max: 100, step: 0.5, help: 'Used to estimate mechanical output. Set to 100 to ignore.' },
    ],
    run: (v) => {
      const phase = str(v.phase, '3');
      const volts = num(v.volts);
      const amps = num(v.amps);
      const pf = num(v.pf, 0.85);
      const efficiency = num(v.efficiency, 100) / 100;

      if (volts <= 0 || amps <= 0) return { outputs: [], error: 'Voltage and current must be greater than zero.' };
      if (pf <= 0 || pf > 1) return { outputs: [], error: 'Power factor must be between 0 and 1.' };

      const constant = phase === '3' ? Math.sqrt(3) : 1;
      const kva = (constant * volts * amps) / 1000;
      const kw = kva * pf;
      const kvar = Math.sqrt(Math.max(0, kva * kva - kw * kw));
      const hp = (kw * efficiency * 1000) / 746;

      return {
        outputs: [
          { label: 'Apparent power', value: fmt(kva, 2), unit: 'kVA', emphasis: true },
          { label: 'Real power', value: fmt(kw, 2), unit: 'kW', emphasis: true },
          { label: 'Reactive power', value: fmt(kvar, 2), unit: 'kVAR' },
          { label: 'Real power', value: fmt(kw * 1000, 0), unit: 'W' },
          {
            label: 'Approximate mechanical output',
            value: fmt(hp, 2),
            unit: 'hp',
            note: `At ${fmt(efficiency * 100, 1)}% efficiency. A rough figure, not a motor rating.`,
          },
        ],
        steps: [
          `Constant = ${phase === '3' ? '1.732 (three phase)' : '1 (single phase)'}`,
          `kVA = ${fmt(constant, 3)} x ${fmt(volts, 0)} V x ${fmt(amps, 1)} A / 1000 = ${fmt(kva, 2)} kVA`,
          `kW = ${fmt(kva, 2)} kVA x ${fmt(pf, 2)} power factor = ${fmt(kw, 2)} kW`,
          `kVAR = sqrt(${fmt(kva, 2)} squared - ${fmt(kw, 2)} squared) = ${fmt(kvar, 2)} kVAR`,
        ],
        warnings: [
          'Assumes a balanced three-phase load. An unbalanced load needs to be evaluated per phase.',
          'Power factor varies with load. A motor at 30% load has a much worse power factor than the nameplate figure.',
          'The mechanical output figure is an estimate from electrical input and an assumed efficiency. It is not a substitute for the motor nameplate.',
        ],
      };
    },
    formulas: [
      { expr: 'kVA = (1.732 x V_line x I_line) / 1000' },
      { expr: 'kW = kVA x power factor' },
      { expr: 'kVAR = sqrt(kVA squared - kW squared)' },
    ],
    assumptions: [
      'Balanced three-phase load with sinusoidal waveforms.',
      'Line-to-line voltage and line current.',
      'Ignores harmonic distortion, which inflates apparent power on drive-heavy systems.',
    ],
    relatedCalculators: ['motor-branch-circuit', 'transformer-sizing', 'ohms-law'],
    faqs: [
      {
        q: 'Should I use line or phase voltage?',
        a: 'Line-to-line voltage with line current, which is what the 1.732 constant assumes and what you measure at the panel.',
      },
      {
        q: 'Why does my drive-fed motor not match this?',
        a: 'A variable frequency drive draws non-sinusoidal current. Harmonic content raises the apparent power without raising the real power, so displacement power factor and true power factor differ and this formula understates the loading.',
      },
    ],
  },
];
